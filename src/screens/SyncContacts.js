import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import { Permissions, Contacts } from 'expo';
import { syncContacts, removeContacts } from '../services/api';
import { StackNavigator } from 'react-navigation';
import PropTypes from 'prop-types';
import CreateForm from '../components/CreateForm/CreateForm';
import * as Actions from '../actions/actions';

class SyncContacts extends React.Component {
  constructor(props) {
    super(props);
    this.getPermission = this.getPermission.bind(this);
  };

  state = {
    buttonVisible: true,
    showModal: false,
  };

  getPermission = async () => {
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

  showButton = () => {
    if (this.state.buttonVisible) {
      return (
        <Button
          title='Create Reminder'
          // onPress={() => this.props.openFormModal(this.props.showModal)}
          onPress={() => this.setState({ showModal: true, })}
        />
      );
    }
  };

  render() {
    const { navigate } = this.props.navigation;
    const { currentContact } = this.props;
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
        <View>
          { this.showButton() }
        </View>
        <CreateForm
          showCreateForm={ this.state.showModal }
          closeCreateForm={ () => this.setState({ showModal: false, }) }
            // currentContact={ this.currentContact }
        />
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

mapStateToProps = (state) => {
  return {
    currentContact: state.contact,
  };
};

mapDispatchToProps = (dispatch) => {
  return ({
    setCurrentContact: (showModal) => {
      dispatch(Action.currentContact(showModal));
    },
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(SyncContacts);
