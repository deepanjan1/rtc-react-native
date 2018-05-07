import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import CreateForm from '../components/CreateForm/CreateForm';

export default class CreateReminder extends React.Component {
  render () {
    return (
      <View style={ styles.container }>
        <CreateForm />
      </View>
    );
  }
}

styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    height: '100%',
  },
});
