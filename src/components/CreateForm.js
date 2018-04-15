import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import Contacts from 'react-native-unified-contacts';

export default class CreateForm extends React.Component {
  state = {
    contacts: [],
  };

  componentDidMount() {
    let contacts = Contacts.getContacts((err, contacts) => {
        if (err) {
          return console.log('denied contact book access');
        } else {
          return contacts;
        }
      });

    this.setState({
      contacts: contacts,
    });
  };

  // getAllContacts = () => {
  //   console.log('we got here');
  //   // Contacts.getAll((err, contacts) => {
  //   //   if (err === 'denied') {
  //   //     return console.log('denied contact book access');
  //   //   } else {
  //   //     return contacts;
  //   //   }
  //   // });
  // };

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.input}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    height: 60,
    width: 200,
  },
  input: {
    fontSize: 20,
  },
});
