import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import { Icon, Button } from 'react-native-elements';

export default class SyncContacts extends React.Component {
  render = () => (
    <Modal
      isVisible={ this.props.showSyncContactModal }
      // onBackdropPress={ this.props.closeSyncContactModal }
      >
      <View style={ styles.container }>
        <View style={ styles.headerContainer }>
          <Text style={ styles.headerText }>To begin, sync your contacts!</Text>
        </View>
        <View style={ styles.buttonContainer }>
          <Button
            title='Sync My Contacts!'
            buttonStyle={ styles.button }
            onPress= { () => console.log('button pressed!') }>
          </Button>
        </View>
      </View>
    </Modal>
  );
}

SyncContacts.propTypes = {
  showSyncContactModal: PropTypes.bool.isRequired,
  closeSyncContactModal: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    container: {
      height: '30%',
      borderRadius: 15,
      backgroundColor: 'white',
    },
    headerContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    buttonContainer: {
      flex: 1,
    },
    button: {
      borderRadius: 15,
      backgroundColor: '#1787fb',
    },
  });
