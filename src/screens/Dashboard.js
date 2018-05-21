import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Modal } from 'react-native';
import Header from '../components/Header';
import NavButton from '../components/NavButton';
import ReminderList from '../components/ReminderList';
import Button from 'apsl-react-native-button';
import CreateForm from '../components/CreateForm/CreateForm';
import * as Action from '../actions/actions';
import { connect } from 'react-redux';
import { createReminders } from '../services/api';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  };

  state = {
    showModal: false,
  };

  render() {
    const { navigate } = this.props.navigation;
    const { setReminder, setReminderToDB } = this.props;
    return (
      <View style={ styles.container }>
          <View style={ styles.row }>
            <NavButton
              onPress={() => {
                console.log('Settings');
              }}
              text='Settings' />
          </View>
          <View style={ styles.subHeading }>
            <Text style={ styles.subHeadingText }>
              Below are your existing reminders.
            </Text>
          </View>
          <View style={ styles.reminderList }>
            <ReminderList />
            <View style={ styles.center}>
              <TouchableHighlight
                onPress={ () => this.setState({ showModal: true, }) }>
                <Text style={ styles.createButton }>
                  Create Reminder
                </Text>
              </TouchableHighlight>
            </View>
          </View>
          <CreateForm
            showCreateForm={ this.state.showModal }
            closeCreateForm={ () => this.setState({ showModal: false, }) }
            addReminder={ (reminder) => {
              setReminder(reminder);
              createReminders(reminder);
            }
          }
          />
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
    height: '80%',
  },
  modal: {
    marginTop: 22,
  },
  createButton: {
    backgroundColor: '#1a9bfc',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    color: 'white',
    fontSize: 15,
    fontWeight: '200',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

mapStateToProps = (state) => {
  return {
    reminder: state.reminder,
  };
};

mapDispatchToProps = (dispatch) => {
  return ({
    setReminder: (reminder) => {
      dispatch(Action.addReminder(reminder));
    },

    setReminderToDB: (reminder) => {
      dispatch(Action.addReminderToDB(reminder));
    },
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
