import { Linking, Platform } from 'react-native';

export const numberPicker = (phoneNumber, modalFunction) => {
  if (phoneNumber.length > 1) {
    modalFunction();
  } else {
    this.message(phoneNumber);
  }
};

export const message = (phoneNumber) => {
  Platform.OS === 'ios' ?
  Linking.openURL('sms:' + phoneNumber +
  '&body=Hi! Are you around to catch up this week?') :
  Linking.openURL('sms:' + phoneNumber +
  '?body=Hi! Are you around to catch up this week?');
};
