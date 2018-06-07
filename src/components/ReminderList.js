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
          removeReminder(this.props.user, this.state.activeKey); // remove from database
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
                  <View style={ styles.reminderDetails }>
                    <View style={ styles.frequencyContainer }>
                      <Icon
                        name='cached'
                        color='#1787fb'
                        iconStyle={ styles.icon }
                        size={ 20 }
                      />
                      <Text style={ styles.nextReminder }>
                        { this.storeContact(item.frequency) }
                      </Text>
                    </View>
                    <View style={ styles.nextReminderContainer }>
                      <Icon
                        name='date-range'
                        color='#1787fb'
                        iconStyle={ styles.icon }
                        size={ 20 }
                      />
                      <Text style={ styles.nextReminder }>
                        { item.date }
                      </Text>
                    </View>
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
  user: PropTypes.string.isRequired,
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
  reminderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    alignItems: 'center',
    width: '60%',
  },
  frequencyContainer: {
    flexDirection: 'row',
    borderColor: '#e8e9ea',
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: '#edf1f2',
    alignItems: 'center',
    paddingTop: 2,
    paddingBottom: 2,
    justifyContent: 'center',
  },
  nextReminderContainer: {
    flexDirection: 'row',
    borderColor: '#e8e9ea',
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: '#edf1f2',
    alignItems: 'center',
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
