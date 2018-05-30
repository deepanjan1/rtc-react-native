import { Permissions, Contacts } from 'expo';
import { syncContacts } from '../services/api';

// going to create a listener to listen for contact updates and load
// contacts to state with a new reducer (contactReducer.js)

export const getPermission = async () => {
  const { status } = await Permissions.askAsync(Permissions.CONTACTS);
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
    console.log({ status });
    response = contacts.data;
    this.setState({
      contacts: { response },
    });
    const user = 'Deep';
    syncContacts(user, this.state.contacts.response);
    if (this.state.contacts) {
      this.setState({
        buttonVisible: true,
      });
    }
  };
};
