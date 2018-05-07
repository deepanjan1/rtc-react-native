import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';

export default class FrequencyButton extends React.Component {
  state = {
    selected: false,
  };

  buttonType = () => {
    if (this.state.selected) {
      return (
        <Button
          title={this.props.title}
          backgroundColor='#1a9bfc'
          borderRadius={ 10 }
          buttonStyle={ styles.pressedFrequencyButton }
          textStyle={ styles.pressedFrequencyButtonText }
          onPress={() => this.setState({ selected: !this.state.selected })}
        />
      );
    } else {
      return (
        <Button
          title={this.props.title}
          backgroundColor='#ffffff'
          borderRadius={ 10 }
          buttonStyle={ styles.frequencyButton }
          textStyle={ styles.frequencyButtonText }
          onPress={() => this.setState({ selected: !this.state.selected })}
        />
      );
    }
  };

  render() {
    return (
      <View>
        { this.buttonType() }
      </View>
    );
  }
}

FrequencyButton.propTypes = {
  title: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  frequencyButton: {
    padding: 2,
    width: 100,
    borderWidth: 1,
    borderColor: '#1a9bfc',
  },
  frequencyButtonText: {
    fontSize: 14,
    color: '#1a9bfc',
  },
  pressedFrequencyButton: {
    padding: 2,
    width: 100,
    borderWidth: 1,
    borderColor: '#1a9bfc',
  },
  pressedFrequencyButtonText: {
    fontSize: 14,
    color: '#ffffff',
  },
});
