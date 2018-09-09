import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import { Icon, Button } from 'react-native-elements';
import { loadContacts } from './loadContacts';

export default class SyncContacts extends React.Component {
  render = () => (
    <Modal
      isVisible={ this.props.showSyncContactModal }
      animationIn='fadeIn'
      animationInTiming={200}
      animationOut='fadeOut'
      animationOutTiming={200}
      >
      <View style={ styles.container }>
        <View style={ styles.headerContainer }>
          <Text style={ styles.headerText }>To begin, sync your contacts!</Text>
        </View>
        <View style={ styles.descriptionContainer }>
          <Text style={ styles.descriptionText }>
            We use your contacts so you can easily create your reminders.
            Don't worry, we never reach out to your contacts!
          </Text>
        </View>
        <View style={ styles.buttonContainer }>
          <Button
            title='Sync My Contacts!'
            buttonStyle={ styles.button }
            onPress= { () =>
              {
                loadContacts(this.props.user, this.props.contacts);
                this.props.closeSyncContactModal();
              }
            }>
          </Button>
        </View>
      </View>
    </Modal>
  );
}

SyncContacts.propTypes = {
  showSyncContactModal: PropTypes.bool.isRequired,
  closeSyncContactModal: PropTypes.func.isRequired,
  user: PropTypes.string,
  contacts: PropTypes.array,
};

const styles = StyleSheet.create({
    container: {
      height: '30%',
      borderRadius: 15,
      backgroundColor: 'white',
      padding: 10,
    },
    headerContainer: {
      flex: 1,
      margin: 10,
      alignItems: 'center',
    },
    headerText: {
      fontSize: 20,
      fontFamily: 'Roboto-Bold',
      textAlign: 'center',
    },
    descriptionContainer: {
      justifyContent: 'flex-start',
      flex: 2,
    },
    descriptionText: {
      fontSize: 15,
      fontFamily: 'Roboto-Light',
      justifyContent: 'center',
      textAlign: 'center',
    },
    buttonContainer: {
      flex: 1,
      margin: 10,
    },
    button: {
      borderRadius: 15,
      backgroundColor: '#1787fb',
    },
  });
