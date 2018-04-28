import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import NavButton from './NavButton';
import { StackNavigator } from 'react-navigation';
import PropTypes from 'prop-types';

export default class ShowButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnTap = this.handleOnTap.bind(this);
  };

  handleOnTap() {
    this.props.onTap('CreateReminder');
  }

  render() {
    const button = this.props.buttonVisible;
    if (button === true) {
      return (
        <View>
          <NavButton
            text='Create Reminder'
            onPress={ this.handleOnTap }
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
  onTap: PropTypes.func.isRequired,
};
