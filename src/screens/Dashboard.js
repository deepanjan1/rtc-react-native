import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Modal
} from 'react-native';
import { Button } from 'react-native-elements';
import ConfirmationModal from '../components/ConfirmationModal';
import ReminderList from '../components/ReminderList';
import CreateFormRevised from '../components/CreateForm/CreateFormRevised';
import EditForm from '../components/EditForm/EditForm';
import Settings from '../components/Settings/Settings';
import Notifications from '../components/Notifications/Notifications';
import {
  getExistingPermission
} from '../components/Notifications/NotificationFunctions';

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
  deleteAllContacts,
  currentUserListener,
  currentUserListenerOff,
} from '../services/api';
import {
  loadCurrentUser,
  logoutCurrentUser
} from '../services/facebookAPI';
import { NavigationActions } from 'react-navigation';
import { MaterialIcons } from '@expo/vector-icons';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  };

  state = {
    showCreateModal: false,
    showEditModal: false,
    showSyncContactModal: false,
    showSettingsModal: false,
    showNotificationsModal: false,
    error: {},
    contactsLoaded: false,
    confirmationModal: false,
    action: '',
  };

  componentDidMount = () => {
    this.unsubscribeCurrentUserListener = this.props.watchUserData();
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.notificationToken !== this.props.notificationToken) {
      if (!this.props.notificationToken) {
        this.setState({ showNotificationsModal: true });
      };
    };

    if (prevProps.contacts !== this.props.contacts) {
      if (this.props.contacts.length === 0) {
        this.setState({
          showSyncContactModal: true,
          contactsLoaded: false,
        });
      } else {
        loadContacts(this.props.uid, this.props.contacts);
        this.setState({ contactsLoaded: true, });
        console.log('Contacts Loading in Background');
      }
    }
  };

  componentWillUnmount() {
    if (this.unsubscribeCurrentUserListener) {
      this.unsubscribeCurrentUserListener();
    }
  }

  logOut = () => {
    logoutCurrentUser(); // remove from firebase
  };

  render() {
    const {
      reminders,
      activeReminder,
      selectedReminder,
      contacts,
      user,
      isLoggedIn,
      loadNotificationToken,
      notificationToken,
    } = this.props;
    return (
      <View style={ styles.container }>
          <View style={{ zIndex: 1, }}>
            <ConfirmationModal
              confirmationModal={ this.state.confirmationModal }
              action={ this.state.action }
              closeConfirmationModal={ () => this.setState({ confirmationModal: false, }) }
            />
          </View>
          <View
            style={ styles.horizontalRule }
          />
          <View style={ styles.reminderList }>
            <ReminderList
              reminders = { reminders }
              loadActiveReminder = { selectedReminder }
              showEditModal = { () => this.setState({ showEditModal: true }) }
              user = { user.uid }
              actionFunction = { () => setTimeout(() => this.setState(
                {
                  action: 'deleted',
                  confirmationModal: true,
                }
              ), 250) }
            />
          </View>
          <View
            style={ styles.horizontalRule }
          />
          <View style={ { marginTop: 10, } }>
            <View style={ styles.center}>
              <MaterialIcons
                name='menu'
                color='#c0c0c0'
                size={ 30 }
                onPress={ () => this.setState({ showSettingsModal: true }) }
              />
              <Button
                title='Create Reminder'
                buttonStyle={ styles.createButton }
                titleStyle={ styles.createButtonText }
                onPress={ () => this.setState({ showCreateModal: true, }) }>
              </Button>
              <MaterialIcons
                name='menu'
                color='transparent'
                size={ 30 }
                >
              </MaterialIcons>
            </View>
          </View>
          <SyncContacts
            showSyncContactModal={ this.state.showSyncContactModal }
            closeSyncContactModal={ () => this.setState({ showSyncContactModal: false, }) }
            user = { user.uid }
            contacts = { contacts }
          />
          <Notifications
            showNotificationsModal={ this.state.showNotificationsModal }
            closeNotificationsModal={ () => this.setState({ showNotificationsModal: false, }) }
            loadNotificationToken = { loadNotificationToken }
            uid =  { user.uid }
          />
          <CreateFormRevised
            showCreateForm={ this.state.showCreateModal }
            closeCreateForm={ () => this.setState({ showCreateModal: false, }) }
            addReminder={
              (uid, reminder) =>
              createReminder(uid, reminder)
            }
            contacts={ contacts }
            user = { user.uid }
            notificationToken={ notificationToken }
            actionFunction = { () => setTimeout(() => this.setState(
              {
                action: 'created',
                confirmationModal: true,
              }
            ), 500) }
            contactsLoaded = { this.state.contactsLoaded }
          />
          <EditForm
            showEditForm={ this.state.showEditModal }
            closeEditForm={ () => this.setState({ showEditModal: false, }) }
            editReminder={ activeReminder }
            updateReminder={ (reminder, uid) => updateReminder(reminder, uid) }
            user = { user.uid }
            actionFunction = { () => setTimeout(() => this.setState(
              {
                action: 'edited',
                confirmationModal: true,
              }
            ), 500) }
          />
          <Settings
            showSettingsModal = { this.state.showSettingsModal }
            closeSettingsModal = { () => this.setState({ showSettingsModal: false, }) }
            user = { user }
            logout = { () => {
                this.logOut();
                this.setState({ showSettingsModal: false, });
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
      elevation: 0,
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
});

mapStateToProps = (state) => (
  {
    reminders: state.reminder.reminders,
    activeReminder: state.reminder.activeReminder,
    contacts: state.contact.contacts,
    user: state.user.user,
    notificationToken: state.user.notificationToken,
    showNotificationsModal: state.user.notificationModal,
    isLoggedIn: state.user.isLoggedIn,
  }
);

mapDispatchToProps = (dispatch) => (
  ({
    removeUser: () => {
      dispatch(Action.removeUser());
    },

    logOutUser: () => {
      dispatch(Action.logOutUser());
    },

    loadNotificationToken: (notificationToken) => {
      dispatch(Action.loadNotificationToken(notificationToken));
    },

    selectedReminder: (reminder) => {
      dispatch(Action.selectedReminder(reminder));
    },

    watchUserData: () => {
      dispatch(Action.watchUserData());
    },

  })
);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
