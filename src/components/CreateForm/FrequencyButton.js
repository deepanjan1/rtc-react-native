import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import PropTypes from 'prop-types';

export default class FrequencyButton extends React.Component {
  createObject = () => {
    var element = [];
    this.props.frequencySelection.forEach((frequency) => {
        element.push(
          <TouchableHighlight
            onPress={() => this.props.onPressFunction(frequency) }

            underlayColor='transparent'>
            <Text style={ {
              fontFamily: 'Roboto-Regular',
              fontSize: 18,
              color: '#1787fb',
              marginTop: 10,
              marginBottom: 10,
            } }> { frequency } </Text>
          </TouchableHighlight>
        );
      });
    return (element);
  };

  render = () => (this.createObject());
}

FrequencyButton.propTypes = {
  frequencySelection: PropTypes.array.isRequired,
  onPressFunction: PropTypes.func.isRequired,
};

styles = StyleSheet.create({
  frequency: {
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
    color: '#1787fb',
    marginTop: 10,
    marginBottom: 10,
  },
});
