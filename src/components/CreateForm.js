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
import SearchList from './SearchList';
import { Permissions, Contacts } from 'expo';
import {
  FormLabel,
  FormInput,
  FormValidationMessage
} from 'react-native-elements';
import { getContacts } from '../services/api';

export default class CreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.filterItems = this.filterItems.bind(this);
  }

  state = {
    contacts: [],
    searchText: '',
    filteredContacts: [],
    visible: true,
    person: {},
    showForm: false,
  };

  onPress = (person) => {
    this.setState({
      visible: false,
      person: person,
      showForm: true,
    });
  };

  componentDidMount() {
    getContacts().then((snapshot) => {
      this.setState({
        contacts: Object.values(snapshot.val())[0],
        filteredContacts: Object.values(snapshot.val())[0],
      });
    });
  }

  filterItems = (e) => {
    this.setState({
      searchText: { e },
    });

    var text = this.state.searchText.e;
    try {
      var filteredContacts = this.state.contacts.filter((el) =>
        el.firstName.toLowerCase().indexOf(text.toLowerCase()) > -1
      );
      this.setState({
        filteredContacts: filteredContacts,
      });
    } catch (err) {
      console.log('Undefined text');
    }
  };

  onFocus = () => {
    this.setState({
      visible: true,
      showForm: false,
    });
  };

  restOfForm = () => {
    if (this.state.showForm
      &&
      this.state.person.emails
      &&
      this.state.person.phoneNumbers) {
      return (
        <View>
          <FormLabel>Email</FormLabel>
          <FormInput
            value={ this.state.person.emails[0].email }
            clearButtonMode='always'
            inputStyle={{ width: '100%' }}
          />
          <FormLabel>Phone</FormLabel>
          <FormInput
            value={ this.state.person.phoneNumbers[0].number }
            clearButtonMode='always'
            inputStyle={{ width: '100%' }}
          />
        </View>
      );
    } else if (this.state.showForm
      &&
      this.state.person.emails) {
      return (
        <View>
          <FormLabel>Email</FormLabel>
          <FormInput
            value={ this.state.person.emails[0].email }
            clearButtonMode='always'
            inputStyle={{ width: '100%' }}
          />
          <FormLabel>Phone</FormLabel>
          <FormInput
            clearButtonMode='always'
            inputStyle={{ width: '100%' }}
          />
        </View>
      );
    } else if (this.state.showForm && this.state.person.phone) {
      return (
        <View>
          <FormLabel>Email</FormLabel>
          <FormInput
            clearButtonMode='always'
            inputStyle={{ width: '100%' }}
          />
          <FormLabel>Phone</FormLabel>
          <FormInput
            value={ this.state.person.phoneNumbers[0].number }
          />
        </View>
      );
    }
  };

  render() {
    return (
      <View>
        <View style={styles.container}>
          <FormLabel>Name</FormLabel>
          <FormInput
            onChangeText={ this.filterItems.bind(this) }
            value={ this.state.person.name }
            clearButtonMode='always'
            inputStyle={{ width: '100%' }}
            onFocus={this.onFocus}
          />
          <View>
            { this.restOfForm() }
          </View>
          <SearchList
            filteredContacts={ this.state.filteredContacts }
            visible={ this.state.visible }
            onPress={ this.onPress }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  input: {
    fontSize: 20,
  },
});
