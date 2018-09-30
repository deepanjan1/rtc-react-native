import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import { MaterialIcons } from '@expo/vector-icons';
import { message } from './ReminderListFunctions';

export default class NumberPickerModal extends React.Component {
  render = () => (
    <Modal
      isVisible={ this.props.numberPickerModal }
      onBackdropPress={ this.props.closeModal }
      >
        <View style={ styles.numberPickerModal }>
          <View style={ styles.titleContainer }>
            <Text style={ styles.title }>
              Send a text and get in touch with { this.props.name }!
            </Text>
          </View>
          <View style={ styles.phoneListContainer }>
            <FlatList
              data={ this.props.phoneNumber }
              renderItem={({ item }) =>
              <View>
                <TouchableHighlight
                  onPress={ () => message(item.number) }
                  underlayColor='transparent'>
                    <View style={ styles.phoneNumberEntry }>
                      <MaterialIcons
                        name='sms'
                        size={30}
                        style={ styles.icon }
                      />
                      <Text style={ styles.label }>{ item.label }</Text>
                      <Text style={ styles.number }>{ item.number }</Text>
                    </View>
                </TouchableHighlight>
                <View
                  style={ { borderBottomWidth: 0.5, borderColor: '#c6cbcf' } }
                />
              </View>
              }
              keyExtractor={ (item) => item.id }
            />
          </View>
        </View>
    </Modal>
  );
};

NumberPickerModal.propTypes = {
  name: PropTypes.string.isRequired,
  phoneNumber: PropTypes.array.isRequired,
  numberPickerModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

styles = StyleSheet.create({
  numberPickerModal: {
    width: '100%',
    height: '35%',
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
    marginTop: 5,
    marginRight: 8,
    marginLeft: 8,
    flex: 1,
    justifyContent: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  subHeadingContainer: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
  },
  subHeading: {
    fontFamily: 'Roboto-Regular',
    textAlign: 'left',
    fontSize: 16,
  },
  phoneListContainer: {
    marginTop: 5,
    flex: 4,
  },
  phoneNumberEntry: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  number: {
    fontFamily: 'Roboto-Regular',
    textAlign: 'right',
    fontSize: 16,
    marginRight: 5,
  },
  label: {
    fontFamily: 'Roboto-Medium',
    textAlign: 'left',
    fontSize: 16,
    marginRight: 10,
  },
  icon: {
    marginRight: 5,
    color: '#1787fb',
  },
});
