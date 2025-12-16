import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import Config from 'react-native-config';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button, makeStyles, Overlay, Text } from '@rneui/themed';
import Mapbox from '@rnmapbox/maps';

export interface LocationData {
  latitude: number;
  longitude: number;
  zipCode?: string;
  city?: string;
  state?: string;
}

type LocationPickerProps = {
  isVisible: boolean;
  onClose: () => void;
  onLocationSelect: (location: LocationData) => void;
  initialLocation?: { latitude: number; longitude: number };
};

const LocationPicker: React.FC<LocationPickerProps> = ({
  isVisible,
  onClose,
  onLocationSelect,
  initialLocation = { latitude: 39.8283, longitude: -98.5795 }, // Default to center of US
}) => {
  const styles = useStyles();
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const cameraRef = useRef<Mapbox.Camera>(null);

  // Only update selectedLocation when initialLocation actually changes (not on every render)
  useEffect(() => {
    if (initialLocation) {
      setSelectedLocation(prev => {
        // Only update if values actually changed
        if (
          prev.latitude !== initialLocation.latitude ||
          prev.longitude !== initialLocation.longitude
        ) {
          return initialLocation;
        }

        return prev;
      });
    }
  }, [initialLocation]);

  // Reverse geocode coordinates to get zipcode, city, and state
  const reverseGeocode = useCallback(
    async (
      latitude: number,
      longitude: number,
    ): Promise<{
      zipCode?: string;
      city?: string;
      state?: string;
    }> => {
      try {
        const accessToken = Config.MAP_BOX_PUBLIC_ACCESS_TOKEN;
        if (!accessToken) {
          console.warn('Mapbox access token not found');

          return {};
        }

        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${accessToken}&types=postcode,place,region&country=US`,
        );

        if (!response.ok) {
          throw new Error('Reverse geocoding failed');
        }

        const data = await response.json();

        let zipCode: string | undefined;
        let city: string | undefined;
        let state: string | undefined;

        // Extract zipcode, city, and state from geocoding results
        for (const feature of data.features || []) {
          const context = feature.context || [];
          const placeType = feature.place_type?.[0];

          // Get zipcode
          if (placeType === 'postcode' && !zipCode) {
            zipCode = feature.text || feature.properties?.postcode;
          }

          // Get city
          if (placeType === 'place' && !city) {
            city = feature.text;
          }

          // Get state
          for (const item of context) {
            if (item.id?.startsWith('region.') && !state) {
              state = item.text || item.short_code?.replace('US-', '');
            }
            if (item.id?.startsWith('place.') && !city) {
              city = item.text;
            }
            if (item.id?.startsWith('postcode.') && !zipCode) {
              zipCode = item.text;
            }
          }
        }

        return { zipCode, city, state };
      } catch (error) {
        console.error('Reverse geocoding error:', error);

        return {};
      }
    },
    [],
  );

  const handleConfirm = useCallback(async () => {
    // Reverse geocode to get zipcode, city, and state
    const locationData = await reverseGeocode(
      selectedLocation.latitude,
      selectedLocation.longitude,
    );

    onLocationSelect({
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
      ...locationData,
    });
    onClose();
  }, [selectedLocation, onLocationSelect, onClose, reverseGeocode]);

  // Handle map press to update selected location
  const handleMapPress = useCallback(
    (e: { geometry: { coordinates: [number, number] } }) => {
      const { geometry } = e;
      if (geometry && geometry.coordinates) {
        const [longitude, latitude] = geometry.coordinates;
        setSelectedLocation({ latitude, longitude });
      }
    },
    [],
  );

  // Update camera when location changes (only when user selects a new location, not on mount)
  useEffect(() => {
    if (cameraRef.current && isVisible) {
      cameraRef.current.setCamera({
        centerCoordinate: [
          selectedLocation.longitude,
          selectedLocation.latitude,
        ],
        zoomLevel: 15,
        animationDuration: 200,
      });
    }
  }, [selectedLocation.latitude, selectedLocation.longitude, isVisible]);

  return (
    <Overlay
      isVisible={isVisible}
      onBackdropPress={onClose}
      overlayStyle={styles.overlay}
      fullScreen
    >
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Select Location</Text>
          <Button
            type="clear"
            icon={
              <Ionicons name="close" size={moderateScale(24)} color="#000" />
            }
            onPress={onClose}
          />
        </View>

        {/* Map Container */}
        <View style={styles.mapContainer}>
          <Mapbox.MapView
            style={styles.map}
            onPress={handleMapPress}
            styleURL={Mapbox.StyleURL.Street}
            logoEnabled={false}
            attributionEnabled={false}
          >
            <Mapbox.Camera
              ref={cameraRef}
              zoomLevel={15}
              centerCoordinate={[
                selectedLocation.longitude,
                selectedLocation.latitude,
              ]}
              animationMode="flyTo"
              animationDuration={2000}
            />
            <Mapbox.PointAnnotation
              id="selectedLocation"
              coordinate={[
                selectedLocation.longitude,
                selectedLocation.latitude,
              ]}
            >
              <View style={styles.markerContainer}>
                <Ionicons
                  name="location"
                  size={moderateScale(30)}
                  color="#EF4444"
                />
              </View>
            </Mapbox.PointAnnotation>
          </Mapbox.MapView>
        </View>

        {/* Footer Actions */}
        <View style={styles.footer}>
          <Button
            title="Cancel"
            type="outline"
            onPress={onClose}
            containerStyle={styles.cancelButton}
          />
          <Button
            title="Confirm Location"
            onPress={handleConfirm}
            containerStyle={styles.confirmButton}
          />
        </View>
      </SafeAreaView>
    </Overlay>
  );
};

const useStyles = makeStyles(() => ({
  overlay: {
    padding: 0,
    margin: 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
    paddingVertical: verticalScale(16),
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: '#111827',
  },
  mapContainer: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  map: {
    flex: 1,
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  placeholderText: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#6B7280',
    marginTop: verticalScale(16),
  },
  placeholderSubtext: {
    fontSize: moderateScale(14),
    color: '#9CA3AF',
    marginTop: verticalScale(8),
    textAlign: 'center',
    paddingHorizontal: moderateScale(20),
  },
  coordinateText: {
    fontSize: moderateScale(12),
    color: '#6B7280',
    marginTop: verticalScale(4),
    fontFamily: 'monospace',
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: moderateScale(20),
    paddingVertical: verticalScale(16),
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: moderateScale(12),
  },
  cancelButton: {
    flex: 1,
  },
  confirmButton: {
    flex: 1,
  },
}));

export default LocationPicker;
