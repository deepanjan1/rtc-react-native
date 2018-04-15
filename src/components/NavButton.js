import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from 'apsl-react-native-button';
import PropTypes from 'prop-types';

export default class NavButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <Button
        style={ styles.button }
        textStyle={ styles.textStyle }
        onPress={ this.props.onPress}>
        { this.props.text }
      </Button>
    );
  }
}

NavButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1a9bfc',
    borderWidth: 0,
    width: 80,
  },
  textStyle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '200',
  },
});
