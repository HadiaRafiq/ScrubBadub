import { useMutation } from '@tanstack/react-query';
import Config from 'react-native-config';
import { forwardGeocode, ForwardGeocodeResult } from '@/utils/geocoding';
import { showErrorToast } from '@/utils/toast';

export const useForwardGeocode = () => {
  return useMutation<ForwardGeocodeResult, Error, string>({
    mutationFn: async (zipCode: string) => {
      const accessToken = Config.MAP_BOX_PUBLIC_ACCESS_TOKEN;
      if (!accessToken) {
        throw new Error('Mapbox configuration missing');
      }
      return forwardGeocode(zipCode, accessToken);
    },
    onError: (error: Error) => {
      const errorMessage =
        error.message || 'Unable to find location for this zipcode';
      showErrorToast(errorMessage, 'Geocoding Failed');
    },
  });
};
