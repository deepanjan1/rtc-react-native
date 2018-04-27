import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import Header from '../components/Header';
import NavButton from '../components/NavButton';
import { Permissions, Contacts } from 'expo';
import { syncContacts, removeContacts } from '../services/api';
import { StackNavigator } from 'react-navigation';
import PropTypes from 'prop-types';

class ShowButton extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    const button = this.props.buttonVisible;
    if (button === true) {
      return (
        <View>
          <NavButton
            text='Create Reminder'
            onPress={ this.props.navigate }
          />
        </View>
      );
    } else {
      return (
        <View>
        </View>
      );
    }
  }
}

ShowButton.propTypes = {
  buttonVisible: PropTypes.bool.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default class SyncContacts extends React.Component {
  constructor(props) {
    super(props);
    this.getPermission = this.getPermission.bind(this);
  };

  state = {
    contacts: [],
    buttonVisible: false,
  };

  getPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CONTACTS);
    if (status !== 'granted') {
      console.log('permission not granted');
    } else {
      removeContacts();
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
      syncContacts(this.state.contacts.response);
    };
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={ styles.container }>
        <TouchableHighlight
          onPress={ this.getPermission.bind(this) }>
          <View style={ styles.center }>
            <Text style={ styles.createButton }>
              Okay
            </Text>
          </View>
        </TouchableHighlight>
        <ShowButton
          buttonVisible={ this.state.buttonVisible }
          navigate={ navigate('CreateReminder') } />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subHeading: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  subHeadingText: {
    fontSize: 15,
    fontWeight: '200',
  },
  reminderList: {
    height: '80%',
  },
  modal: {
    marginTop: 22,
  },
  createButton: {
    backgroundColor: '#1a9bfc',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    color: 'white',
    fontSize: 15,
    fontWeight: '200',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
