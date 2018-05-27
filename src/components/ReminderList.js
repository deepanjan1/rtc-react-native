import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { getReminders, removeReminder, shutOffGetReminders } from '../services/api';
import Swipeout from 'react-native-swipeout';

export default class ReminderList extends React.Component {

  constructor(props) {
    super(props);
    // swipeout buttons
    this.swipeoutButtons = [
      {
        text: 'Delete',
        backgroundColor: '#fc0d1c',
        type: 'delete',
        onPress: () => removeReminder(this.state.activeKey),
      },
      {
        text: 'Edit',
        backgroundColor: '#4482ea',
      },
    ];
  };

  state = {
    reminders: [],
    activeKey: '',
  };

  componentDidMount() {

    this.unsubscribeGetReminders = getReminders((snapshot) => {
      try {
        this.setState({
          reminders: Object.values(snapshot.val()),
        });
        console.log(this.state.reminders);
      } catch (e) {
        this.setState({
          reminders: [],
        });
        console.log(e);
      }
    });
  }

  componentWillUnmount() {
    this.shutOffGetReminders();
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
          <Swipeout
            right={this.swipeoutButtons}
            backgroundColor='white'
            onOpen={ () => this.setState({ activeKey: item.key }) }
            onClose={() => this.setState({ activeKey: '', }) }
            >
            <View style={ styles.container }>
              <Text style={ styles.name }>
                { item.name } - {
                  this.storeContact(item.frequency)
                }
              </Text>
              <Text style={ styles.nextReminder }>
                Next Reminder: { item.date }
              </Text>
            </View>
          </Swipeout>
        }
        keyExtractor={(item, index) => (`reminders-${index}`)}
        // scrollEnabled = { this.state.scrollEnabled }
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
