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
import Settings from '../components/Settings/Settings';

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

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  };

  state = {
    showCreateModal: false,
    showEditModal: false,
    showSyncContactModal: false,
    showSettingsModal: false,
    error: {},
    contactsLoaded: false,
  };

  showContactModal = async (uid, contacts) => {
    if (uid && contacts && !this.state.contactsLoaded) {
      const status = await getPermission();
      if (status !== 'granted') {
        this.setState({
          showSyncContactModal: true,
          contactsLoaded: true,
        });
      } else {
        await loadContacts(uid, contacts);
        this.setState({ contactsLoaded: true, });
        console.log('Contacts Loading in Background');
      }
    }
  };

  componentDidMount = () => {
    this.unsubscribeCurrentUserListener = currentUserListener((snapshot) => {
      try {
        this.props.watchUserData();
      } catch (e) {
        this.setState({ error: e, });
      }
    });
  };

  componentWillUnmount() {
    // shutOffGetReminders(this.props.user.uid);
    // shutOffContactListener(this.props.user.uid);
    // currentUserListenerOff();
  }

  logOut = async () => {
    await logoutCurrentUser(); // remove from firebase
  };

  render() {
    const { navigate } = this.props.navigation;
    const {
      reminders,
      activeReminder,
      selectedReminder,
      contacts,
      user,
      isLoggedIn,
    } = this.props;
    this.showContactModal(user.uid, contacts);
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
              user = { user.uid }
            />
            <View
              style={ styles.horizontalRule }
            />
          </View>
          <View style={ styles.center}>
            <Icon
              name='menu'
              color='#c0c0c0'
              onPress={ () => this.setState({ showSettingsModal: true }) }
              >
            </Icon>
            <Button
              title='Create Reminder'
              buttonStyle={ styles.createButton }
              textStyle={ styles.createButtonText }
              onPress={ () => this.setState({ showCreateModal: true, }) }>
            </Button>
            <Icon
              name='menu'
              color='transparent'
              >
            </Icon>
          </View>
          <SyncContacts
            showSyncContactModal={ this.state.showSyncContactModal }
            closeSyncContactModal={ () => this.setState({ showSyncContactModal: false, }) }
            user = { user.uid }
            contacts = { contacts }
          />
          <CreateForm
            showCreateForm={ this.state.showCreateModal }
            closeCreateForm={ () => this.setState({ showCreateModal: false, }) }
            addReminder={ (reminder, uid) => createReminder(reminder, uid) }
            contacts={ contacts }
            user = { user.uid }
          />
          <EditForm
            showEditForm={ this.state.showEditModal }
            closeEditForm={ () => this.setState({ showEditModal: false, }) }
            editReminder={ activeReminder }
            updateReminder={ (reminder, uid) => updateReminder(reminder, uid) }
            user = { user.uid }
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

    selectedReminder: (reminder) => {
      dispatch(Action.selectedReminder(reminder));
    },

    watchUserData: () => {
      dispatch(Action.watchUserData());
    },

  })
);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
