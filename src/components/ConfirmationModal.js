import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { MaterialIcons } from '@expo/vector-icons';

export default class ConfirmationModal extends React.Component {
  componentDidUpdate = (prevProps) => {
    if (prevProps.confirmationModal != this.props.confirmationModal) {
      setTimeout(this.props.closeConfirmationModal, 1000);
    }
  };

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
            <View style ={ { backgroundColor: 'white', } }>
              { this.props.confirmationModal ? this.displayIcon(this.props.action) : null }
            </View>
        );
}

ConfirmationModal.propTypes = {
  action: PropTypes.string.isRequired,
  confirmationModal: PropTypes.bool.isRequired,
  closeConfirmationModal: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 10,
    marginLeft: 70,
    marginRight: 70,
    borderRadius: 15,
    height: 45,
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
