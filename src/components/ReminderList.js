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
                  <View style={ styles.nameContainer }>
                    <Text style={ styles.name }>
                      { item.name }
                    </Text>
                  </View>
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
                    <View style={ styles.gap } />
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

    // borderWidth: 1,
    // borderRadius: 10,
    // marginBottom: 10,
    // marginTop: 10,
    // borderColor: '#e8e9ea',
  },
  nameContainer: {
    marginBottom: 5,
  },
  name: {
    fontFamily: 'Roboto-Regular',
    fontSize: 20,
  },
  reminderDetails: {
    flexDirection: 'row',
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    marginTop: 5,
    alignItems: 'center',
    width: '70%',
  },
  frequencyContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    flex: 4,
    borderColor: '#e8e9ea',
    borderWidth: 1,
    borderRadius: 2.5,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    paddingTop: 2,
    paddingBottom: 2,
    paddingRight: 2,
    justifyContent: 'center',
  },
  gap: {
    alignSelf: 'stretch',
    flex: 1,
  },
  nextReminderContainer: {
    flexDirection: 'row',
    flex: 4,
    alignSelf: 'stretch',
    borderColor: '#e8e9ea',
    borderWidth: 1,
    borderRadius: 2.5,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    paddingTop: 2,
    paddingBottom: 2,
    paddingRight: 2,
    justifyContent: 'center',
  },
  nextReminder: {
    fontFamily: 'Roboto-Light',
    fontSize: 12,
    color: '#5d5d5d',
  },
  icon: {
    marginRight: 2,
  },
});
