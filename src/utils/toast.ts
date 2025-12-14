import Toast from 'react-native-toast-message';

export const showErrorToast = (message: string, title = 'Error'): void => {
  Toast.show({
    type: 'error',
    text1: title,
    text2: message,
  });
};

export const showSuccessToast = (message: string, title = 'Success'): void => {
  Toast.show({
    type: 'success',
    text1: title,
    text2: message,
  });
};
