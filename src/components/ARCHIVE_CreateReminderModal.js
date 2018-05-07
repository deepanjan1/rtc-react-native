import React from 'react';
import { StyleSheet, Text, View, Modal, TouchableHighlight } from 'react-native';
import NavButton from '../components/NavButton';
import PropTypes from 'prop-types';
import CreateForm from './CreateForm';

export default class CreateReminderModal extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={ styles.container }>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.modalVisible}
          style={ styles.modal }
          onRequestClose={ () => {
            alert('Modal has been closed.');
          }}

          presentationStyle='formSheet'>

            <View>
              <CreateForm />
            </View>

            <View style={ styles.center}>
              <TouchableHighlight
                onPress={() => {
                  this.props.setModalVisible(false);
                }}>

                <Text style={ styles.createButton }>
                  Cancel
                </Text>
              </TouchableHighlight>
            </View>
        </Modal>
      </View>
    );
  }
}

CreateReminderModal.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',

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
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 500,
  },
});
