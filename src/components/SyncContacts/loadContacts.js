import { Permissions, Contacts } from 'expo';
import { initLoadContacts, updateContacts } from '../../services/api';

// going to create a listener to listen for contact updates and load
// contacts to state with a new reducer (contactReducer.js)

export const getPermission = async() => {
  const { status } = await Permissions.askAsync(Permissions.CONTACTS);
  return status;
};

export const loadContacts = async (uid, stateContacts) => {
  const status = await getPermission();
  if (status !== 'granted') {
    console.log('permission not granted');
  } else {
    let contacts = await Contacts.getContactsAsync();
    response = contacts.data;
    if (stateContacts.length > 0) {
      updateContacts(uid, response);
    } else {
      initLoadContacts(uid, response);
    }
  };
};

export const exactMatchContact = async (contactID) => {
  const status = await getPermission();
  if (status !== 'granted') {
    console.log('permission not granted');
    return null;
  } else {
    console.log('pre-pull: ' + contactID);
    const contact = await Contacts.getContactByIdAsync(contactID);
    if (contact) {
      console.log(contact);
    } else {
      console.log(contactID);
    }
  };
};
