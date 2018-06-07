import { getReminders, contactListener, currentUserListener } from '../services/api';
import AsyncStorage from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

export const actionTypes = {
  LOAD_REMINDERS: 'LOAD_REMINDERS',
  SELECTED_REMINDER: 'SELECTED_REMINDER',
  SYNC_CONTACTS: 'SYNC_CONTACTS',
  LOAD_USER: 'LOAD_USER',
};

// Reminder Stuff
watchReminderData = (uid) => (
  (dispatch) => {
    getReminders(uid, (snapshot) => {
      try {
        dispatch(loadReminders(Object.values(snapshot.val())));
      }
      catch (error) {
        dispatch(loadReminders([]));
      }
    });
  }
);

export const loadReminders = (reminders) => (
  {
    type: 'LOAD_REMINDERS',
    reminders,
  }
);

export const selectedReminder = (reminder) => (
  {
    type: 'SELECTED_REMINDER',
    reminder,
  }
);

// Contact Stuff
watchContactData = (uid) => (
  (dispatch) => {
    contactListener(uid, (snapshot) => {
      try {
        dispatch(syncContacts(Object.values(snapshot.val())));
      } catch (error) {
        dispatch(syncContacts([]));
      }
    });
  }
);

export const syncContacts = (contacts) => (
  {
    type: 'SYNC_CONTACTS',
    contacts: contacts,
  }
);

// User Stuff
export const watchUserData = () => (
  (dispatch) => {
    currentUserListener((user) => {
      if (user !== null) {
        console.log(user);
        dispatch(loadUser(user));
        dispatch(watchReminderData(user.uid));
        dispatch(watchContactData(user.uid));
      } else {
        console.log(user);
        dispatch(loadUser(user));
      }
    });
  }
);

export const loadUser = (user) => (
  {
    type: 'LOAD_USER',
    user: {
      name: user.displayName,
      uid: user.uid,
      email: user.email,
      photo: user.photoURL,
    },
  }
);
