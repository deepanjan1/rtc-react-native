import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight
} from 'react-native';
import PropTypes from 'prop-types';
import { removeReminder } from '../services/api';
import Swipeout from 'react-native-swipeout';

export default class ReminderList extends React.Component {

  constructor(props) {
    super(props);
    this.removeReminder = removeReminder.bind(this);

    // swipeout buttons
    this.swipeoutButtons = [
      {
        text: 'Delete',
        backgroundColor: '#fc0d1c',
        type: 'delete',
        onPress: () => {
          removeReminder(this.state.activeKey); // remove from database
        },
      },
    ];
  };

  state = {
    activeKey: '',
    index: null,
  };

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
        data={this.props.reminders}
        renderItem={
          ({ item, index }) =>
            <Swipeout
              right={this.swipeoutButtons}
              backgroundColor='white'
              onOpen={ () => this.setState({ activeKey: item.key, index: index, }) }
              onClose={() => this.setState({ activeKey: '', index: null, }) }
              autoClose
              >
              <TouchableHighlight
                onPress={ () => {
                  this.props.loadActiveReminder(item);
                  this.props.showEditModal();
                } }
                
                underlayColor='transparent'
                >
                <View style={ styles.container }>
                  <Text style={ styles.name }>
                    { item.name }
                  </Text>
                  <Text style={ styles.nextReminder }>
                    Frequency:  { this.storeContact(item.frequency) }
                  </Text>
                  <Text style={ styles.nextReminder }>
                    Next Reminder: { item.date }
                  </Text>
                </View>
              </TouchableHighlight>
            </Swipeout>
        }
        keyExtractor={(item, index) => (`reminders-${index}`)}
      />
      );
  }
}

ReminderList.propTypes = {
  reminders: PropTypes.array.isRequired,
  loadActiveReminder: PropTypes.func.isRequired,
  showEditModal: PropTypes.func.isRequired,
};

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
    color: '#5d5d5d',
  },
});
