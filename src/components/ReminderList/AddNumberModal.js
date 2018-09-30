import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Keyboard,
} from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import { Input, Button } from 'react-native-elements';
import { message } from './ReminderListFunctions';

export default class AddNumberModal extends React.Component {
  state = {
    number: '',
    label: 'mobile',
  };

  render = () => (
    <Modal
      isVisible={ this.props.addNumberModal }
      onBackdropPress={ this.props.closeModal }
      >
        <View style={ styles.container }>
          <View style={ styles.titleContainer }>
            <Text style={ styles.title }>
              You don't have a number saved for { this.props.name }. You can add one!
            </Text>
          </View>
          <View style={ styles.phoneListContainer }>
            <View style={styles.inputField}>
              <View style={ styles.cellLabel }>
                <Text style={styles.label}>Label:</Text>
              </View>
              <View style={ styles.cellInput }>
                <Input
                  inputStyle = { styles.input }
                  containerStyle = { styles.inputContainer }
                  value={ this.state.label }
                  onChangeText={ (text) => {
                    this.setState({ label: text });
                  } }
                />
              </View>
            </View>
            <View style={styles.inputField}>
              <View style={ styles.cellLabel }>
                <Text style={styles.label}>Number:</Text>
              </View>
              <View style={ styles.cellInput }>
                <Input
                  inputStyle = { styles.input }
                  containerStyle = { styles.inputContainer }
                  keyboardType='phone-pad'
                  placeholder='Phone number'
                  value={ this.state.number }
                  onChangeText={ (text) => {
                    this.setState({ number: text });
                  } }
                />
              </View>
            </View>
            <Button
              title='Save Phone Number'
              buttonStyle={ styles.saveButton }
              textStyle={ styles.saveButtonText }
              onPress={ async () => {
                let phoneNumber = [];
                phoneNumber.push({
                  label: this.state.label,
                  number: this.state.number,
                });
                this.props.reminder.phoneNumber = phoneNumber;
                this.props.updateReminder(this.props.user, this.props.reminder);
                this.props.closeModal();
              } }
            />
          </View>
        </View>
    </Modal>
  );
}

AddNumberModal.propTypes = {
  addNumberModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  user: PropTypes.string,
  reminder: PropTypes.object.isRequired,
  updateReminder: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '30%',
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  title: {
    fontFamily: 'Roboto-Medium',
    textAlign: 'center',
    fontSize: 18,
  },
  titleContainer: {
    marginTop: 10,
    marginRight: 8,
    marginLeft: 8,
    flex: 1,
    justifyContent: 'center',
  },
  phoneListContainer: {
    margin: 5,
    flex: 4,
    width: '80%',
    alignItems: 'center',
  },
  inputContainer: {
    backgroundColor: '#ffffff',
    margin: 5,
  },
  input: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: '#000000',
    backgroundColor: '#ffffff',
  },
  saveButton: {
      marginTop: 20,
      marginBottom: 10,
      borderRadius: 25,
      backgroundColor: '#1787fb',
      width: '100%',
      elevation: 0,
    },
  saveButtonText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cellLabel: {
    flex: 1,
  },
  cellInput: {
    flex: 3,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },
});
