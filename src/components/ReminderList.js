import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { getReminders } from '../services/api';

export default class ReminderList extends React.Component {

  state = {
    reminders: [],
  };

  componentDidMount() {
    this.unsubscribeGetReminders = getReminders((snapshot) => {
      this.setState({
        reminders: Object.values(snapshot.val()),
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribeGetReminders();
  }

  storeContact = nextDate => {
    switch (nextDate) {
      case 0:
        return ('Bi-Weekly');
      case 1:
        return ('Quarterly');
      case 2:
        return ('Bi-Annually');
      case 3:
        return ('Annually');
      default:
        return ('Error');
    }
  };

  render() {
    return (
      <FlatList
        data={this.state.reminders}
        renderItem={
          ({ item }) =>
          <View style={ styles.container }>
            <Text style={ styles.name }>
              { item.reminder.name } - {
                this.storeContact(item.reminder.frequency)
              }
            </Text>
            <Text style={ styles.nextReminder }>
              Next Reminder: { item.reminder.date }
            </Text>
          </View>
        }
        keyExtractor={(item, index) => (`reminders-${index}`)}
      />
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  nextReminder: {
    fontSize: 15,
    fontWeight: '200',
  },
});
