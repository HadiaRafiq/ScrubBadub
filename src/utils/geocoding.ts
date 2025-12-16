export interface ForwardGeocodeResult {
  latitude: number;
  longitude: number;
  city: string;
  state: string;
}

export const isValidUSZipCode = (zipCode: string): boolean => {
  const zipRegex = /^\d{5}(-\d{4})?$/;

  return zipRegex.test(zipCode.trim());
};

export const forwardGeocode = async (
  zipCode: string,
  accessToken: string,
): Promise<ForwardGeocodeResult> => {
  if (!accessToken) {
    throw new Error('Mapbox access token not configured');
  }

  if (!isValidUSZipCode(zipCode)) {
    throw new Error('Invalid US zipcode format');
  }

  const cleanZipCode = zipCode.trim();

  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        cleanZipCode,
      )}.json?access_token=${accessToken}&country=US&types=postcode&limit=1`,
    );

    if (!response.ok) {
      throw new Error('Forward geocoding request failed');
    }

    const data = await response.json();

    if (!data.features || data.features.length === 0) {
      throw new Error('No results found for this zipcode');
    }

    const [feature] = data.features;
    const [longitude, latitude] = feature.center;

    let city: string | undefined;
    let state: string | undefined;

    // Parse context array for city and state
    for (const item of feature.context || []) {
      if (item.id?.startsWith('place.') && !city) {
        city = item.text;
      }
      if (item.id?.startsWith('region.') && !state) {
        state = item.short_code?.replace('US-', '') || item.text;
      }
    }

    if (!city || !state || !latitude || !longitude) {
      throw new Error('Incomplete location data received');
    }

    return {
      latitude,
      longitude,
      city,
      state,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to geocode zipcode');
  }
};
