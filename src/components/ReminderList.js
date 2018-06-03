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
import Moment from 'moment';
import { Icon } from 'react-native-elements';

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
                  <View style={ styles.nextReminderContainer }>
                    <Icon
                      name='date-range'
                      color='#1787fb'
                      iconStyle={ styles.icon }
                      size='20'
                      ></Icon>
                    <Text style={ styles.nextReminder }>
                      { item.date }
                    </Text>
                  </View>
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
    fontFamily: 'Roboto-Regular',
    fontSize: 20,
  },
  nextReminderContainer: {
    flexDirection: 'row',
    borderColor: '#e8e9ea',
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: '#edf1f2',
    width: '35%',
    alignItems: 'center',
    marginTop: 5,
    paddingTop: 2,
    paddingBottom: 2,
    justifyContent: 'center',
  },
  nextReminder: {
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
    color: '#5d5d5d',
  },
  icon: {
    marginRight: 2,
  },
});
