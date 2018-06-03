import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Modal
} from 'react-native';
import { Icon, Button } from 'react-native-elements';
import Header from '../components/Header';
import NavButton from '../components/NavButton';
import ReminderList from '../components/ReminderList';
import CreateForm from '../components/CreateForm/CreateForm';
import EditForm from '../components/EditForm/EditForm';

// Contact Stuff
import SyncContacts from '../components/SyncContacts/SyncContacts';
import {
  getPermission,
  loadContacts
} from '../components/SyncContacts/loadContacts';

import * as Action from '../actions/actions';
import { connect } from 'react-redux';
import {
  createReminder,
  getReminders,
  removeReminder,
  shutOffGetReminders,
  updateReminder,
  initLoadContacts,
  contactListener,
  shutOffContactListener,
} from '../services/api';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  };

  state = {
    showCreateModal: false,
    showEditModal: false,
    showSyncContactModal: false,
    error: {},
  };

  showContactModal = async () => {
    const status = await getPermission();
    if (status !== 'granted') {
      this.setState({
        showSyncContactModal: true,
      });
    } else {
      loadContacts();
      console.log('Contacts Loading in Background');
    }
  };

  componentDidMount() {
    this.showContactModal();
    this.unsubscribeGetReminders = getReminders((snapshot) => {
      try {
        this.props.watchReminderData();
      } catch (e) {
        this.setState({ error: e, });
        console.log(e);
      }
    });

    this.unsubscribeGetContacts = contactListener((snapshot) => {
      try {
        this.props.watchContactData();
      } catch (e) {
        this.setState({ error: e, });
        console.log(e);
      }
    });
  }

  componentWillUnmount() {
    shutOffGetReminders();
    shutOffContactListener();
  }

  render() {
    const { navigate } = this.props.navigation;
    const { reminders, activeReminder, selectedReminder, contacts } = this.props;
    return (
      <View style={ styles.container }>
          <View style={ styles.subHeading }>
            <Text style={ styles.subHeadingText }>
              Below are your existing reminders.
            </Text>
          </View>
          <View
            style={ styles.horizontalRule }
          />
          <View style={ styles.reminderList }>
            <ReminderList
              reminders = { reminders }
              loadActiveReminder = { selectedReminder }
              showEditModal = { () => this.setState({ showEditModal: true }) }
            />
            <View
              style={ styles.horizontalRule }
            />
          </View>
          <View style={ styles.center}>
            <Icon
              name='settings'
              color='#c0c0c0'
              >
            </Icon>
            <Button
              title='Create Reminder'
              buttonStyle={ styles.createButton }
              textStyle={ styles.createButtonText }
              onPress={ () => this.setState({ showCreateModal: true, }) }>
            </Button>
            <Icon
              name='settings'
              color='transparent'
              >
            </Icon>
          </View>
          <SyncContacts
            showSyncContactModal={ this.state.showSyncContactModal }
            closeSyncContactModal={ () => this.setState({ showSyncContactModal: false, }) }
          />
          <CreateForm
            showCreateForm={ this.state.showCreateModal }
            closeCreateForm={ () => this.setState({ showCreateModal: false, }) }
            addReminder={ (reminder) => createReminder(reminder) }
            contacts={ contacts }
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
    marginBottom: 10,
  },
  subHeadingText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
    color: '#5d5d5d',
  },
  reminderList: {
    height: '80%',
  },
  modal: {
    marginTop: 22,
  },
  createButton: {
      borderRadius: 25,
      backgroundColor: '#1787fb',
      width: '100%',
    },
  createButtonText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
  },
  center: {
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  horizontalRule: {
    borderTopColor: '#c0c0c0',
    borderTopWidth: 1,
  },
  modalComponents: {
    height: 0,
    width: 0,
  },
});

mapStateToProps = (state) => (
  {
    reminders: state.reminder.reminders,
    activeReminder: state.reminder.activeReminder,
    contacts: state.contact.contacts,
    user: state.user.user,
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

    watchContactData: () => {
      dispatch(Action.watchContactData());
    },
  })
);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
