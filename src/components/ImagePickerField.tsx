import React, { useCallback } from 'react';
import {
  Alert,
  Image,
  Linking,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
  MediaType,
} from 'react-native-image-picker';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { makeStyles, Text } from '@rneui/themed';

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

  const requestGalleryPermission = useCallback(async () => {
    if (Platform.OS === 'android') {
      // Check Android version and request appropriate permission
      const androidVersion = Platform.Version;
      const permission =
        androidVersion >= 33
          ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
          : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

      // First check if permission is already granted
      const hasPermission = await PermissionsAndroid.check(permission);
      if (hasPermission) {
        return true;
      }

      // Request permission
      const granted = await PermissionsAndroid.request(permission);

      // If permission was denied and user selected "Don't ask again"
      if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        Alert.alert(
          'Permission Required',
          'Gallery permission is required to select images. Please enable it in app settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Open Settings',
              onPress: () => Linking.openSettings(),
            },
          ],
        );

        return false;
      }

      // If permission was denied but user can be asked again
      if (granted === PermissionsAndroid.RESULTS.DENIED) {
        Alert.alert(
          'Permission Denied',
          'Gallery permission is required to select images. Please grant permission when prompted.',
          [{ text: 'OK' }],
        );

        return false;
      }

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }

    return true;
  }, []);

  const pickImage = useCallback(async () => {
    const granted = await requestGalleryPermission();

    if (!granted) {
      Alert.alert(
        'Permission denied',
        'Please grant permission to access your gallery',
      );

      return null;
    }

    const result = await launchImageLibrary({
      mediaType: 'photo' as MediaType,
      quality: 0.8,
      includeBase64: true,
      selectionLimit: 1,
      includeExtra: true,
    });

    if (result?.assets && result.assets.length > 0) {
      return result.assets[0];
    }

    return null;
  }, [requestGalleryPermission]);

  const openLibrary = useCallback(async () => {
    const asset = await pickImage();
    if (asset?.uri) {
      onChange(asset.uri);
    }
  }, [pickImage, onChange]);

  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TouchableOpacity
        style={styles.uploadBox}
        activeOpacity={0.85}
        onPress={openCamera}
      >
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
