import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SectionList,
  TouchableHighlight
} from 'react-native';
import PropTypes from 'prop-types';
import { removeReminder } from '../services/api';
import Swipeout from 'react-native-swipeout';
import Moment from 'moment';
import { Icon, Button } from 'react-native-elements';
import _ from 'underscore';

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

  sortRemindersByDate = (reminders) => {
    const today = new Date();

    // sorting reminders by date
    var sortedReminders = reminders.sort((a, b) =>
      (new Date(b.date) - new Date(a.date))
    );

    var groupedReminder = _.groupBy(sortedReminders, (reminder) => (
      new Date(reminder.date).getTime() < today.getTime()
    ));

    if (!groupedReminder['true']) {
      groupedReminder['true'] = [];
    } else if (!groupedReminder['false']) {
      groupedReminder['false'] = [];
    }

    return groupedReminder;
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

  sectionHeaders = (upcomingReminders, pastReminders) => {
    const overrideRenderItem = ({ item, index, section }) =>
      <Swipeout
        right={this.swipeoutButtons}
        backgroundColor='white'
        onOpen={ () => this.setState({ activeKey: item.key, index: index, }) }
        onClose={() => this.setState({ activeKey: '', index: null, }) }
        autoClose
        key={ index }
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
                  color='#d7322d'
                  iconStyle={ styles.icon }
                  size={ 20 }
                />
                <Text style={ styles.nextReminder }>
                  { item.date }
                </Text>
              </View>
              <View style={ styles.gap } />
              <Button
                icon={
                  <Icon
                    name='check-circle'
                    color='#ffffff'
                  />
                }
                title='Contacted'
                buttonStyle={ styles.doneButtonStyle }
                textStyle={ styles.doneButtonStyleTitle }
              />
            </View>
          </View>
        </TouchableHighlight>
      </Swipeout>;

    if (!_.isEmpty(upcomingReminders) && !_.isEmpty(pastReminders)) {
      return (
        [
          {
            title: 'People You Need to Reach Out To',
            data: upcomingReminders,
            renderItem: overrideRenderItem,
          }, {
            title: 'Upcoming Reach Outs',
            data: pastReminders,
          },
        ]
      );
    } else if (_.isEmpty(pastReminders)) {
      return (
        [
          {
            title: 'Upcoming Reminders',
            data: upcomingReminders,
          },
        ]
      );
    } else {
      return (
        [
          {
            title: 'Past Reminders',
            data: pastReminders,
          },
        ]
      );
    }
  };

  render() {
    const { reminders } = this.props;
    const upcomingReminders = this.sortRemindersByDate(reminders)['true'];
    const pastReminders = this.sortRemindersByDate(reminders)['false'];
    return (
        <SectionList
          sections={ this.sectionHeaders(upcomingReminders, pastReminders) }
          renderItem={
            ({ item, index, section }) =>
              <Swipeout
                right={this.swipeoutButtons}
                backgroundColor='white'
                onOpen={ () => this.setState({ activeKey: item.key, index: index, }) }
                onClose={() => this.setState({ activeKey: '', index: null, }) }
                autoClose
                key={ index }
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
                    <View style={ styles.reminderDetailsUpcoming }>
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
                      <View style={ styles.gap } />
                    </View>
                  </View>
                </TouchableHighlight>
              </Swipeout>
          }
          renderSectionHeader={({ section: { title } }) => (
            <Text style={ styles.sectionHeader }>{ title }</Text>
          )}
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
  sectionHeader: {
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
    padding: 10,
    backgroundColor: '#f5f5f5',
    color: '#5d5d5d',
  },
  nameContainer: {
    marginBottom: 5,
    flexDirection: 'row',
  },
  name: {
    fontFamily: 'Roboto-Regular',
    fontSize: 20,
    flex: 3,
  },
  doneButtonStyle: {
    padding: 5,
    borderRadius: 2.5,
    backgroundColor: '#138b94',
  },
  doneButtonStyleTitle: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
  },
  reminderDetails: {
    flexDirection: 'row',
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    marginTop: 5,
    alignItems: 'center',
    width: '100%',
  },
  reminderDetailsUpcoming: {
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
