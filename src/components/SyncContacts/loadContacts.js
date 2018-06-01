import { Permissions, Contacts } from 'expo';
import { initLoadContacts } from '../../services/api';

// going to create a listener to listen for contact updates and load
// contacts to state with a new reducer (contactReducer.js)

export const getPermission = async() => {
  const { status } = await Permissions.askAsync(Permissions.CONTACTS);
  return status;
};

export const loadContacts = async () => {
  const status = await getPermission();
  if (status !== 'granted') {
    console.log('permission not granted');
  } else {
    let contacts = await Contacts.getContactsAsync({
      fields: [
        Contacts.PHONE_NUMBERS,
        Contacts.EMAILS,
      ],
      pageSize: 4000,
      pageOffset: 0,
    });
    response = contacts.data;
    const user = 'Deep';
    initLoadContacts(user, response);
  };
};
