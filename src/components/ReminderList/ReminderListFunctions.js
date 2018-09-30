import { Linking, Platform } from 'react-native';

export const numberPicker = (phoneNumber, modalFunction, addNumberModal) => {
  if (phoneNumber.length > 1) {
    modalFunction();
  } else if (phoneNumber.length == 1) {
    message(phoneNumber[0].number);
  } else {
    addNumberModal();
  }
};

export const message = (phoneNumber) => {
  Platform.OS === 'ios' ?
  Linking.openURL('sms:' + phoneNumber +
  '&body=Hi! Are you around to catch up this week?') :
  Linking.openURL('sms:' + phoneNumber +
  '?body=Hi! Are you around to catch up this week?');
};
