import { Platform, Alert, Linking, PermissionsAndroid } from 'react-native';
import {
  launchImageLibrary,
  MediaType,
  Asset,
  ImagePickerResponse,
} from 'react-native-image-picker';

const requestGalleryPermission = async () => {
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
};

export const pickImage = (): Promise<Asset | null> => {
  return new Promise(async resolve => {
    const granted = await requestGalleryPermission();

    if (!granted) {
      Alert.alert(
        'Permission denied',
        'Please grant permission to access your gallery',
      );
      resolve(null);
      return;
    }

    launchImageLibrary(
      {
        mediaType: 'photo' as MediaType,
        quality: 0.8,
        includeBase64: true,
        selectionLimit: 1,
        includeExtra: true,
      },
      (result: ImagePickerResponse) => {
        if (result.didCancel) {
          resolve(null);
          return;
        }

        if (result.errorCode) {
          Alert.alert(
            'Image Picker',
            result.errorMessage || 'Unable to pick image',
          );
          resolve(null);
          return;
        }

        if (result.assets && result.assets.length > 0) {
          resolve(result.assets[0]);
          return;
        }

        resolve(null);
      },
    );
  });
};
