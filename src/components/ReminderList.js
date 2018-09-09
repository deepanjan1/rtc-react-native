import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SectionList,
  TouchableHighlight,
  Image,
  Linking,
} from 'react-native';
import PropTypes from 'prop-types';
import { removeReminder, updateReminder } from '../services/api';
import Swipeable from 'react-native-swipeable';
import Moment from 'moment';
import { Icon, Button } from 'react-native-elements';
import { SimpleLineIcons, FontAwesome, Entypo, MaterialIcons } from '@expo/vector-icons';
import { RNSlidingButton, SlideDirection } from 'rn-sliding-button';
import _ from 'underscore';
import { exactMatchContact } from './SyncContacts/loadContacts';

export default class ReminderList extends React.Component {

  constructor(props) {
    super(props);
    this.removeReminder = removeReminder.bind(this);
    this.today = new Date();
    this.one_day = 1000 * 60 * 60 * 24;
    this.upcomingReminders = [];
    this.pastReminders = [];

    // swipeout buttons
    this.swipeable = null;
    this.swipeableButtons = [
      <TouchableHighlight
        onPress={() => {
          this.swipeable.recenter();
          removeReminder(this.props.user, this.state.activeKey); // remove from database
          this.props.actionFunction();
        }}

        underlayColor='white'
        >
        <View style={{
          justifyContent: 'center',
          height: '100%',
          alignItems: 'flex-start',
          paddingLeft: 25,
        }}>
          <View
            style={{
              backgroundColor: '#c20828',
              padding: 10,
              borderRadius: 23,
            }}>
            <MaterialIcons
              name='delete'
              color='white'
              size={ 30 }
            />
          </View>
        </View>
      </TouchableHighlight>,
    ];
  };

  state = {
    activeKey: '',
    index: null,
    isSwiping: false,
  };

  handleScroll = () => {
    const { currentlyOpenSwipeable } = this.state;

    if (currentlyOpenSwipeable) {
      currentlyOpenSwipeable.recenter();
    }
  };

  sortRemindersByDate = (reminders) => {

    // sorting reminders by date
    var sortedReminders = reminders.sort((a, b) =>
      (new Date(b.date) - new Date(a.date))
    );

    var groupedReminder = _.groupBy(sortedReminders, (reminder) => (
      new Date(reminder.date).getTime() < this.today.getTime()
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
      case 'Every Two Weeks':
        return ('Bi-Weekly');
      case 'Every Month':
        return ('Monthly');
      case 'Quarterly':
        return ('Quarterly');
      case 'Every Two Months':
        return ('Bi-Monthly');
      case 'Twice a Year':
        return ('Semi-Annual');
      case 'Once a Year':
        return ('Annually');
      default:
        return ('Error');
    }
  };

  convertFreqtoMill = (frequency) => {
    switch (frequency) {
      case 'Every Two Weeks':
        return (1209600000);
      case 'Every Month':
        return (2592000000);
      case 'Every Two Months':
        return (5184000000);
      case 'Quarterly':
        return (7776000000);
      case 'Twice a Year':
        return (15552000000);
      case 'Once a Year':
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

  showStreak = (streakNumber, date) => {
    let reminderDate = new Date(date);
    const dayDifference = (this.today.getTime() - reminderDate.getTime()) / this.one_day;

    if (streakNumber > 0 && dayDifference < 5) {
      return (
        <View style={ styles.streakNumberContainer }>
          <View style={ styles.streakIconContainerBlue }>
            <Image
              style={{ width: 40, height: 55, }}
              // resizeMethod='contain'
              source={require('../assets/images/medal.png')}
            />
            <Text style={ styles.streakNumber }>{ streakNumber + 'x'}</Text>
          </View>
        </View>
      );
    } else if (streakNumber > 0 && dayDifference >= 5 && dayDifference <= 6) {
      return (
        <View style={ styles.streakNumberContainer }>
          <Image
            style={{ width: 40, height: 55, }}
            // resizeMethod='contain'
            source={require('../assets/images/medal.png')}
          />
          <Text style={ styles.streakNumber }>{ streakNumber + 'x'}</Text>
        </View>
      );
    } else if (streakNumber > 0 && dayDifference > 6) {
      return (
        <View style={ styles.streakNumberContainer }>
          <Image
            style={{ width: 40, height: 55, }}
            // resizeMethod='contain'
            source={require('../assets/images/medal.png')}
          />
          <Text style={ styles.streakNumber }>{ streakNumber + 'x'}</Text>
        </View>
      );
    } else {
      return (
        <View style={ styles.streakNumberContainer }>
          <View style={ styles.emptyStreakIconContainer } />
        </View>
      );
    }
  };

  // function to delineate array by date and custom formatting
  sectionHeaders = (upcomingReminders, pastReminders) => {
    const overrideRenderItem = ({ item, index, section }) =>
      <Swipeable
        rightButtons={ this.swipeableButtons }
        onRef={ref => this.swipeable = ref}
        onSwipeStart={ () => this.setState({ isSwiping: true }) }
        onSwipeRelease={ () => this.setState({
          activeKey: '',
          index: null,
          isSwiping: false,
        }) }
        onSwipeComplete={ () => this.setState({ activeKey: item.key, index: index, }) }
        rightButtonWidth={ 100 }
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
                  <Text style={ styles.nextReminder }>
                    { this.storeContact(item.frequency) }
                  </Text>
                  <MaterialIcons
                    name='cached'
                    color='#1787fb'
                    iconStyle={ styles.icon }
                    size={ 30 }
                  />
                </View>
                <View style={ styles.gap } />
                { this.showStreak(item.streak, item.date) }
                <View style={ styles.gap } />
                <View style={ styles.nextReminderContainer }>
                  <Text style={ styles.nextReminder }>
                    { item.date }
                  </Text>
                  <MaterialIcons
                    name='date-range'
                    color='#1787fb'
                    iconStyle={ styles.icon }
                    size={ 30 }
                  />
                </View>
              </View>
              <View style={ styles.reminderActions }>
                  {/* <View style={ {
                    backgroundColor: '#1787fb',
                    borderRadius: 20,
                    width: 40,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 30,
                  } }>
                  <Entypo
                    name='message'
                    color='#ffffff'
                    size={ 30 }
                    onPress={ () => {
                      Linking.openURL('sms:');
                    } }

                  />
                  </View> */}
                  <View style={ { alignItems: 'center' } }>
                    <Text style={ styles.doneButtonStyleTitle }>
                      Mark As Contacted
                    </Text>
                    <FontAwesome
                      name='check-circle'
                      color='#2abf40'
                      size={ 60 }
                      onPress={ () => {
                        console.log(item.streak);
                        item.streak += 1;
                        item.date = this.calcNextReminder(item.date, item.frequency);
                        console.log('new date: ' + item.date);
                        console.log('streak: ' + item.streak);
                        updateReminder(this.props.user, item);
                      } }

                    />
                  </View>
                  {/* <View style={ {
                    backgroundColor: '#1787fb',
                    borderRadius: 20,
                    width: 40,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 30,
                  } }>
                    <FontAwesome
                      name='phone'
                      color='#ffffff'
                      size={ 30 }
                      onPress={ () => {
                        exactMatchContact(item.personID);
                      } }

                    />
                  </View> */}
              </View>
            </View>
          </TouchableHighlight>
      </Swipeable>;

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
            title: 'People You Need to Reach Out To',
            data: upcomingReminders,
            renderItem: overrideRenderItem,
          },
        ]
      );
    } else if (_.isEmpty(upcomingReminders)) {
      return (
        [
          {
            title: 'Upcoming Reach Outs',
            data: pastReminders,
          },
        ]
      );
    }
  };

  render() {
    this.upcomingReminders = this.sortRemindersByDate(this.props.reminders)['true'];
    this.pastReminders = this.sortRemindersByDate(this.props.reminders)['false'];
    if (this.props.reminders.length !== 0) {
      return (
          <SectionList
            sections={ this.sectionHeaders(this.upcomingReminders, this.pastReminders) }
            scrollEnabled={!this.state.isSwiping}
            renderItem={
              ({ item, index, section }) =>
                <Swipeable
                  rightButtons={ this.swipeableButtons }
                  onRef={ref => this.swipeable = ref}
                  onSwipeStart={ () => this.setState({ isSwiping: true }) }
                  onSwipeRelease={ () => this.setState({
                    activeKey: '',
                    index: null,
                    isSwiping: false,
                  }) }
                  onSwipeComplete={ () => this.setState({ activeKey: item.key, index: index, }) }
                  rightButtonWidth={ 100 }
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
                          <Text style={ styles.nextReminder }>
                            { this.storeContact(item.frequency) }
                          </Text>
                          <MaterialIcons
                            name='cached'
                            color='#1787fb'
                            iconStyle={ styles.icon }
                            size={ 30 }
                          />
                        </View>
                        <View style={ styles.gap } />
                        { this.showStreak(item.streak, item.date) }
                        <View style={ styles.gap } />
                        <View style={ styles.nextReminderContainer }>
                          <Text style={ styles.nextReminder }>
                            { item.date }
                          </Text>
                          <MaterialIcons
                            name='date-range'
                            color='#1787fb'
                            iconStyle={ styles.icon }
                            size={ 30 }
                          />
                        </View>
                      </View>
                    </View>
                  </TouchableHighlight>
                </Swipeable>
            }
            renderSectionHeader={({ section: { title } }) => (
              <Text style={ styles.sectionHeader }>{ title }</Text>
            )}
            keyExtractor={(item) => (`reminders-${item.key}`)}
          />
          );
    } else {
      return (
        <View style={ styles.firstTimeContainer }>
          <View style = { { flex: 1, } } />
          <View style = { { flex: 1, justifyContent: 'center', } }>
            <Text style={ styles.questionHeader }>
              Who do you want to remember to reach out to on a regular basis?
            </Text>
          </View>
          <View style = { {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
          } }>
            <Text style={ styles.directive }>
              To get started, click on the button below!
            </Text>
            <MaterialIcons
              name='keyboard-arrow-down'
              color='#e78e54'
              iconStyle={ {
                marginTop: 20,
                marginBottom: 0,
              } }
              size={ 40 }
            />
          </View>
        </View>
      );
    }
  }
}

ReminderList.propTypes = {
  reminders: PropTypes.array.isRequired,
  loadActiveReminder: PropTypes.func.isRequired,
  showEditModal: PropTypes.func.isRequired,
  user: PropTypes.string,
  actionFunction: PropTypes.func.isRequired,
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
  firstTimeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  questionHeader: {
    fontFamily: 'Roboto-Regular',
    fontSize: 25,
    textAlign: 'center',
  },
  directive: {
    fontFamily: 'Roboto-Regular',
    fontSize: 20,
    color: 'grey',
    textAlign: 'center',
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
    textAlign: 'center',
    fontSize: 25,
    flex: 3,
  },
  doneButtonStyleTitle: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#5d5d5d',
    textAlign: 'center',
  },
  completedButton: {
    fontFamily: 'Roboto-Regular',
    flexDirection: 'row',
    alignSelf: 'stretch',
    borderRadius: 25,
    borderColor: '#1787fb',
    borderWidth: 1,
    backgroundColor: 'transparent',
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
  reminderActions: {
    marginTop: 30,
    // alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  frequencyContainer: {
    alignSelf: 'stretch',
    flex: 4,
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
    flex: 4,
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingTop: 2,
    paddingBottom: 2,
    paddingRight: 2,
    margin: 5,
    justifyContent: 'center',
  },
  nextReminder: {
    fontFamily: 'Roboto-Light',
    fontSize: 18,
  },
  icon: {
    margin: 2,
  },
  streakNumberContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: 60,
  },
  streakIconContainerBlue: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakIconContainerYellow: {
    flexDirection: 'row',
    backgroundColor: '#e78e54',
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakIconContainerRed: {
    flexDirection: 'row',
    backgroundColor: '#c20828',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStreakIconContainer: {
    flexDirection: 'row',
    height: 55,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'transparent',
    alignItems: 'center',
    padding: 4,
    justifyContent: 'center',
  },
  streakNumber: {
    fontFamily: 'Roboto-Light',
    fontSize: 15,
    position: 'absolute',
    paddingTop: 15,
  },
});
