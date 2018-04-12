import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';
import NavButton from '../components/NavButton';
import ReminderList from '../components/ReminderList';

export default class Dashboard extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={ styles.container }>
          <View style={ styles.row }>
            <NavButton consoleLog='Settings' />
            <NavButton consoleLog='Create Reminder' />
          </View>
          <View style={ styles.subHeading }>
            <Text style={ styles.subHeadingText }>
              Below are your existing reminders.
            </Text>
          </View>
          <View style={ styles.reminderList }>
            <ReminderList />
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subHeading: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  subHeadingText: {
    fontSize: 15,
    fontWeight: '200',
  },
  reminderList: {
    height: '100%',
  },
});
