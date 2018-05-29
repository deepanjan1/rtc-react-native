import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  FormLabel,
  FormInput,
  FormValidationMessage
} from 'react-native-elements';
import PropTypes from 'prop-types';

export default class RestOfPerson extends React.Component {
  constructor(props) {
    super(props);
    this.phoneNumber = this.prop.phoneNumber;
    this.showForm = this.prop.showForm;
    this.email = this.prop.email;
  }

  render() {
    if (this.showForm && this.email && this.phoneNumber) {
      return (
        <View>
          <FormLabel>Email</FormLabel>
          <FormInput
            value={ this.email }
            clearButtonMode='always'
            inputStyle={{ width: '100%' }}
            keyboardType='email-address'
          />
          <FormLabel>Phone</FormLabel>
          <FormInput
            value={ this.phoneNumbers }
            clearButtonMode='always'
            inputStyle={{ width: '100%' }}
            dataDetectorTypes='phoneNumber'
            keyboardType='phone-pad'
          />
        </View>
      );
    } else if (this.showForm && this.email) {
      return (
        <View>
          <FormLabel>Email</FormLabel>
          <FormInput
            value={ this.email }
            clearButtonMode='always'
            inputStyle={{ width: '100%' }}
            keyboardType='email-address'
          />
          <FormLabel>Phone</FormLabel>
          <FormInput
            clearButtonMode='always'
            inputStyle={{ width: '100%' }}
            dataDetectorTypes='phoneNumber'
            keyboardType='phone-pad'
          />
        </View>
      );
    } else if (this.showForm && this.phoneNumber) {
      return (
        <View>
          <FormLabel>Email</FormLabel>
          <FormInput
            clearButtonMode='always'
            inputStyle={{ width: '100%' }}
            keyboardType='email-address'
          />
          <FormLabel>Phone</FormLabel>
          <FormInput
            value={ this.phoneNumbers }
            dataDetectorTypes='phoneNumber'
            keyboardType='phone-pad'
          />
        </View>
      );
    }
  }
}

RestOfPerson.propTypes = {
  showForm: PropTypes.bool.isRequired,
  phoneNumber: PropTypes.string,
  email: PropTypes.email,
};
