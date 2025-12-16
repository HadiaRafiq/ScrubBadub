import React, { useCallback, useState, useMemo } from 'react';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Controller, Control, FieldErrors, UseFormSetValue, useWatch } from 'react-hook-form';
import { Text, makeStyles } from '@rneui/themed';
import { moderateScale, verticalScale } from 'react-native-size-matters';

import Dropdown from '@/components/Dropdown';
import Input from '@/components/Input';
import LocationPicker, { LocationData } from '@/components/LocationPicker';
import { useForwardGeocode } from '@/hooks/useForwardGeocode';
import { ScrubSignUpForm } from '..';
import { SignUpStyles } from '../types';

type CountryOption = { label: string; value: string };

type Props = {
  styles: SignUpStyles;
  theme: any;
  control: Control<ScrubSignUpForm>;
  errors: FieldErrors<ScrubSignUpForm>;
  countryOptions: CountryOption[];
    setValue: UseFormSetValue<ScrubSignUpForm>;
};

const useLocalStyles = makeStyles(() => ({
    pinLocationLabelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: verticalScale(8),
    },
    pinLocationIcon: {
        marginLeft: moderateScale(4),
    },
    pinLocationInputContainer: {
        marginBottom: 0,
    },
    pinLocationButton: {
        width: moderateScale(32),
        height: moderateScale(32),
        borderRadius: moderateScale(16),
        backgroundColor: '#10B981',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

const StepAddress: React.FC<Props> = ({
    styles,
  control,
  errors,
  countryOptions,
    setValue,
}) => {
    const localStyles = useLocalStyles();
    const pinLocation = useWatch({ control, name: 'pinLocation' });
    const [isLocationPickerVisible, setIsLocationPickerVisible] = useState(false);
    const forwardGeocodeMutation = useForwardGeocode();

    // Parse existing location if available - memoize to prevent unnecessary re-renders
    const parsedLocation = useMemo(() => {
        if (!pinLocation) return undefined;
        const match = pinLocation.match(/\(([-\d.]+),\s*([-\d.]+)\)/);
        if (match) {
            return {
                latitude: parseFloat(match[1]),
                longitude: parseFloat(match[2]),
            };
        }
        return undefined;
    }, [pinLocation]);

    // Format location to display format
    const formatLocation = useCallback((latitude: number, longitude: number) => {
        return `Location (${latitude.toFixed(6)}, ${longitude.toFixed(6)})`;
    }, []);

    const handlePinLocationPress = useCallback(() => {
        setIsLocationPickerVisible(true);
    }, []);

    const handleLocationSelect = useCallback(
        (location: LocationData) => {
            const locationString = formatLocation(location.latitude, location.longitude);
            setValue('pinLocation', locationString, { shouldValidate: true });

            // Fill zipcode, city, and state if available from reverse geocoding
            if (location.zipCode) {
                setValue('postalCode', location.zipCode, { shouldValidate: true });
            }
            if (location.city) {
                setValue('city', location.city, { shouldValidate: true });
            }
            if (location.state) {
                setValue('state', location.state, { shouldValidate: true });
            }
        },
        [setValue, formatLocation],
    );

    const handleZipCodeBlur = useCallback(
        async (zipCode: string) => {
            // Only geocode if zipcode has value and is at least 5 characters
            if (!zipCode || zipCode.trim().length < 5) {
                return;
            }

            try {
                const result = await forwardGeocodeMutation.mutateAsync(zipCode.trim());

                // Auto-fill city, state, and pinLocation
                setValue('city', result.city, { shouldValidate: true });
                setValue('state', result.state, { shouldValidate: true });

                // Format coordinates same as LocationPicker
                const locationString = formatLocation(result.latitude, result.longitude);
                setValue('pinLocation', locationString, { shouldValidate: true });
            } catch (error) {
                // Error toast is already shown by the hook
                console.error('Forward geocoding failed:', error);
            }
        },
        [forwardGeocodeMutation, setValue, formatLocation],
    );

  return (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Address Information</Text>

          {/* Address Line */}
      <Controller
        control={control}
        name="address"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Address Line"
                placeholder="Enter your street address"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            errorMessage={errors.address?.message}
            containerStyle={styles.inputContainer}
          />
        )}
      />

          {/* Country */}
      <Controller
        control={control}
              name="country"
              render={({ field: { onChange, value } }) => (
                  <Dropdown
                      label="Country"
                      placeholder="Select Country"
                      data={countryOptions}
            value={value}
                      onChange={onChange}
                      labelField="label"
                      valueField="value"
                      errorMessage={errors.country?.message}
            containerStyle={styles.inputContainer}
          />
        )}
      />

          {/* Zip Code */}
      <Controller
        control={control}
              name="postalCode"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
                label="Zip Code"
                placeholder="Enter ZIP Code"
            value={value}
            onChangeText={onChange}
            onBlur={(e) => {
              onBlur(e);
              handleZipCodeBlur(value);
            }}
                errorMessage={errors.postalCode?.message}
            containerStyle={styles.inputContainer}
                keyboardType="numeric"
                rightIcon={
                  forwardGeocodeMutation.isPending ? (
                    <ActivityIndicator size="small" color="#10B981" />
                  ) : undefined
                }
          />
        )}
      />

          {/* City - Disabled, Auto-filled */}
      <Controller
        control={control}
              name="city"
              render={({ field: { value } }) => (
                  <Input
                      label="City"
                      placeholder="City"
            value={value}
                      editable={false}
                      errorMessage={errors.city?.message}
            containerStyle={styles.inputContainer}
          />
        )}
      />

          {/* State - Disabled, Auto-filled */}
      <Controller
        control={control}
              name="state"
              render={({ field: { value } }) => (
          <Input
                      label="State"
                      placeholder="State"
            value={value}
                      editable={false}
                      errorMessage={errors.state?.message}
            containerStyle={styles.inputContainer}
          />
        )}
      />

          {/* Pin Location */}
      <Controller
        control={control}
        name="pinLocation"
              render={({ field: { value } }) => (
                  <View style={styles.inputContainer}>
                      <View style={localStyles.pinLocationLabelContainer}>
                          <Text style={styles.label}>Pin Location</Text>
                          <Ionicons
                              name="location"
                              size={moderateScale(16)}
                              color="#EF4444"
                              style={localStyles.pinLocationIcon}
                          />
                          <Ionicons
                              name="help-circle-outline"
                              size={moderateScale(16)}
                              color="#EF4444"
                              style={localStyles.pinLocationIcon}
                          />
                      </View>
                      <Input
                          placeholder="Location (24.860700, 67.001100)"
                          value={value || ''}
                          editable={false}
                          errorMessage={errors.pinLocation?.message}
                          containerStyle={localStyles.pinLocationInputContainer}
                          rightIcon={
                              <TouchableOpacity onPress={handlePinLocationPress} activeOpacity={0.7}>
                                  <View style={localStyles.pinLocationButton}>
                                      <Ionicons name="locate" size={moderateScale(18)} color="#FFFFFF" />
                                  </View>
                              </TouchableOpacity>
                          }
                      />
                  </View>
        )}
      />

          {/* Location Picker Modal */}
          {isLocationPickerVisible && (
              <LocationPicker
                  isVisible={isLocationPickerVisible}
                  onClose={() => setIsLocationPickerVisible(false)}
                  onLocationSelect={handleLocationSelect}
                  initialLocation={parsedLocation}
              />
          )}
    </View>
  );
};

export default StepAddress;

