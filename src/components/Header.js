import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

const Header = (props) => {
  return (
    <View>
      <Text style={ styles.headerText }>
        { props.title }
      </Text>
    </View>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Header;
