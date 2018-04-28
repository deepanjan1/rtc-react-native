import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  FlatList,
} from 'react-native';
import Header from './Header';
import { Permissions, Contacts } from 'expo';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

export default class CreateForm extends React.Component {
  state = {
    contacts: [],
    text: '',
  };

  render() {
    return (
      <View>
        <View style={styles.container}>
          <FormLabel>Name</FormLabel>
          <FormInput onChangeText={ (e) =>
            this.setState({
              text: { e },
            })
            }
          />
          {/* <FlatList
            data={this.state.contacts.response}
            renderItem={({ item }) =>
              <View style={styles.contactSearch}>
                <Text>{item.name}</Text>
              </View>
            }
          /> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  contactSearch: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    fontSize: 20,
  },
});
