import React from 'react';
import { StyleSheet, Text, View, Modal } from 'react-native';
// import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import { MaterialIcons } from '@expo/vector-icons';

export default class ConfirmationModal extends React.Component {

  displayIcon = (action) => {
    switch (this.props.action) {

      case 'created':
        console.log('modal fired');
        return (
          <View style = { styles.container }>
            <MaterialIcons
              name='add-circle'
              color='#2abf40'
              size={ 25 }
              style={ { marginRight: 10, } }
            />
            <Text style={ styles.text }>Reminder Created!</Text>
          </View>
        );

      case 'deleted':
        return (
          <View style = { styles.container }>
            <MaterialIcons
              name='delete-forever'
              color='#c20828'
              size={ 25 }
              style={ { marginRight: 10, } }
            />
            <Text style={ styles.text }>Reminder Deleted!</Text>
          </View>
        );

      case 'edited':
        return (
          <View style = { styles.container }>
            <MaterialIcons
              name='edit'
              color='#2abf40'
              size={ 25 }
              style={ { marginRight: 10, } }
            />
            <Text style={ styles.text }>Reminder Edited!</Text>
          </View>
        );

      default:
        console.log('default fired');
        return (null);
    }
  };

  render = () => (
          <Modal
            visible={ this.props.confirmationModal }
            transparent={ true }
            animationType='fade'
            onBackdropPress={ this.props.closeConfirmationModal }
            onShow={ () => setTimeout(this.props.closeConfirmationModal, 1000) }
            >
            { this.displayIcon(this.props.action) }
          </Modal>
        );
}

ConfirmationModal.propTypes = {
  action: PropTypes.string.isRequired,
  confirmationModal: PropTypes.string.isRequired,
  closeConfirmationModal: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 40,
    marginLeft: 70,
    marginRight: 70,
    borderRadius: 15,
    height: '5%',
    shadowColor: 'grey',
    shadowRadius: 5,
    shadowOpacity: 0.5,
    shadowOffset: { width: 5, height: 5 },
  },
  text: {
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
  },
});
