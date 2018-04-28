import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import CreateForm from '../components/CreateForm';

export default class CreateReminder extends React.Component {
  render () {
    return (
      <View>
        <CreateForm />
      </View>
    );
  }
}
