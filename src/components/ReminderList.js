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
import { removeReminder, updateReminder } from '../services/api';
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

  convertFreqtoMill = (frequency) => {
    switch (frequency) {
      case 0:
        return (1209600000);
      case 1:
        return (7776000000);
      case 2:
        return (15552000000);
      case 3:
        return (31104000000);
    }
  };

  dateFormat = (date) => {
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!
    var yyyy = date.getFullYear();
    let day;
    let month;

    if (dd < 10) {
      day = '0' + dd.toString();
    } else {
      day = dd.toString();
    }

    if (mm < 10) {
      month = '0' + mm.toString();
    } else {
      month = mm.toString();
    }

    var dateString = month + '/' + day + '/' + yyyy.toString();
    return dateString;
  };

  calcNextReminder = (date, frequency) => {
    dateObject = new Date(date);
    delta = this.convertFreqtoMill(frequency);
    dateObject = new Date(dateObject.getTime() + delta);
    dateInString = this.dateFormat(dateObject);
    return dateInString;
  };

  showStreak = (streakNumber) => {
    if (streakNumber > 0) {
      return (
        <View style={ styles.streakNumberContainer }>
          <View style={ styles.streakIconContainer }>
            <Text style={ styles.streakNumber }>{ streakNumber + 'x'}</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={ styles.streakNumberContainer }>
          <View style={ styles.emptyStreakIconContainer }>
            <Icon
              name='phone'
              color='transparent'
              iconStyle={ styles.icon }
              size={ 20 }
            />
          </View>
        </View>
      );
    }
  };

  // function to delineate array by date and custom formatting
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
              { this.showStreak(item.streak) }
            </View>
            <Button
              title='Contacted'
              buttonStyle={ styles.completedButtonContainer }
              titleStyle={ styles.doneButtonStyleTitle }
              onPress={ () => {
                item.streak += 1;
                item.date = this.calcNextReminder(item.date, item.frequency);
                console.log('new date: ' + item.date);
                updateReminder(this.props.user, item);
              } }

            />
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
            title: 'Upcoming Reminders',
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
                      <View style={ styles.gap } />
                      { this.showStreak(item.streak) }
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
    padding: 15,
    marginBottom: 5,
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#e8e9ea',
    borderRadius: 20,
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
  doneButtonStyleTitle: {
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
    color: '#ffffff',
  },
  completedButtonContainer: {
    fontFamily: 'Roboto-Regular',
    flexDirection: 'row',
    alignSelf: 'stretch',
    borderRadius: 25,
    backgroundColor: '#2abf40',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
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
    margin: 5,
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
    margin: 5,
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
  streakNumberContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    width: 45,
  },
  streakIconContainer: {
    flexDirection: 'row',
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: '#e78e54',
    alignItems: 'center',
    padding: 4,
    justifyContent: 'center',
  },
  emptyStreakIconContainer: {
    flexDirection: 'row',
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: 'transparent',
    alignItems: 'center',
    padding: 4,
    justifyContent: 'center',
  },
  streakNumber: {
    fontFamily: 'Roboto-Medium',
    fontSize: 12,
    color: '#ffffff',
  },
});
