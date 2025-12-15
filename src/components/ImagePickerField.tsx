import React, { useCallback } from 'react';
import { View, TouchableOpacity, Image, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { launchCamera, launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';
import { makeStyles, Text } from '@rneui/themed';
import { moderateScale, verticalScale } from 'react-native-size-matters';

type Props = {
  label?: string;
  value?: string;
  onChange: (uri: string) => void;
};

const ImagePickerField: React.FC<Props> = ({ label, value, onChange }) => {
  const styles = useStyles();

  const handleResponse = useCallback(
    (res: ImagePickerResponse) => {
      if (res.didCancel) return;
      if (res.errorCode) {
        Alert.alert('Image Picker', res.errorMessage || 'Unable to pick image');
        return;
      }
      const uri = res.assets?.[0]?.uri;
      if (uri) {
        onChange(uri);
      }
    },
    [onChange],
  );

  const openCamera = useCallback(async () => {
    await launchCamera(
      {
        mediaType: 'photo',
        quality: 0.7,
        cameraType: 'back',
      },
      handleResponse,
    );
  }, [handleResponse]);

  const openLibrary = useCallback(async () => {
    await launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.7,
      },
      handleResponse,
    );
  }, [handleResponse]);

  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TouchableOpacity style={styles.uploadBox} activeOpacity={0.85} onPress={openCamera}>
        {value ? (
          <Image source={{ uri: value }} style={styles.preview} />
        ) : (
          <>
            <Ionicons name="image-outline" size={22} color="#9E9E9E" />
            <Text style={styles.uploadText}>Upload Image</Text>
            <TouchableOpacity onPress={openLibrary} activeOpacity={0.8}>
              <Text style={styles.linkText}>Choose from gallery</Text>
            </TouchableOpacity>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    marginBottom: verticalScale(12),
  },
  label: {
    fontSize: moderateScale(14),
    color: '#6B7280',
    marginBottom: verticalScale(6),
  },
  uploadBox: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#BDBDBD',
    borderRadius: moderateScale(12),
    padding: moderateScale(16),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
    gap: verticalScale(6),
  },
  uploadText: {
    color: '#8A8A8A',
    fontSize: moderateScale(14),
    fontWeight: '500',
  },
  linkText: {
    color: '#10C8BB',
    fontSize: moderateScale(12),
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  preview: {
    width: moderateScale(120),
    height: moderateScale(120),
    borderRadius: moderateScale(10),
  },
}));

export default ImagePickerField;

