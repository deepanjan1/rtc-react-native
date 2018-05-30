import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Modal
} from 'react-native';
import Header from '../components/Header';
import NavButton from '../components/NavButton';
import ReminderList from '../components/ReminderList';
import Button from 'apsl-react-native-button';
import CreateForm from '../components/CreateForm/CreateForm';
import EditForm from '../components/EditForm/EditForm';
import SyncContacts from '../components/SyncContacts/SyncContacts';
import * as Action from '../actions/actions';
import { connect } from 'react-redux';
import {
  createReminder,
  getReminders,
  removeReminder,
  shutOffGetReminders,
  updateReminder,
} from '../services/api';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  };

  state = {
    showCreateModal: false,
    showEditModal: false,
    showSyncContactModal: true,
  };

  componentDidMount() {
    this.unsubscribeGetReminders = getReminders((snapshot) => {
      try {
        this.props.watchReminderData();
      } catch (e) {
        console.log(e);
      }
    });
  }

  componentWillUnmount() {
    this.shutOffGetReminders();
  }

  render() {
    const { navigate } = this.props.navigation;
    const { reminders, activeReminder, selectedReminder } = this.props;
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
            <ReminderList
              reminders = { reminders }
              loadActiveReminder = { selectedReminder }
              showEditModal = { () => this.setState({ showEditModal: true }) }
            />
            <View style={ styles.center}>
              <TouchableHighlight
                onPress={ () => this.setState({ showCreateModal: true, }) }>
                <Text style={ styles.createButton }>
                  Create Reminder
                </Text>
              </TouchableHighlight>
            </View>
          </View>
          <SyncContacts
            showSyncContactModal={ this.state.showSyncContactModal }
            closeSyncContactModal={ () => this.setState({ showSyncContactModal: false, }) }
          />
          <CreateForm
            showCreateForm={ this.state.showCreateModal }
            closeCreateForm={ () => this.setState({ showCreateModal: false, }) }
            addReminder={ (reminder) => createReminder(reminder) }
          />
          <EditForm
            showEditForm={ this.state.showEditModal }
            closeEditForm={ () => this.setState({ showEditModal: false, }) }
            editReminder={ activeReminder }
            updateReminder={ (reminder) => updateReminder(reminder) }
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

mapStateToProps = (state) => (
  {
    reminders: state.reminders,
    activeReminder: state.activeReminder,
  }
);

mapDispatchToProps = (dispatch) => (
  ({
    watchReminderData: () => {
      dispatch(Action.watchReminderData());
    },

    selectedReminder: (reminder) => {
      dispatch(Action.selectedReminder(reminder));
    },
  })
);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
