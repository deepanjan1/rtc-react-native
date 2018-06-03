import { getReminders, contactListener, currentUserListener } from '../services/api';
import AsyncStorage from 'react-native';
import { NavigationActions } from 'react-navigation';

export const actionTypes = {
  LOAD_REMINDERS: 'LOAD_REMINDERS',
  SELECTED_REMINDER: 'SELECTED_REMINDER',
  SYNC_CONTACTS: 'SYNC_CONTACTS',
  LOAD_USER: 'LOAD_USER',
};

// Reminder Stuff
export const watchReminderData = () => (
  (dispatch) => {
    getReminders((snapshot) => {
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
export const watchContactData = () => (
  (dispatch) => {
    contactListener((snapshot) => {
      try {
        dispatch(syncContacts(Object.values(snapshot.val())));
      } catch (error) {
        Object.values(snapshot.val()).forEach((element) => console.log('error: ' + element));
        dispatch(syncContacts([]));
      }
    });
  }
);

export const syncContacts = (contacts) => (
  {
    type: 'SYNC_CONTACTS',
    contacts: contacts[0].contacts,
  }
);

// User Stuff
export const watchUserData = () => (
  (dispatch) => {
    currentUserListener((user) => {
      if (user !== null) {
        console.log(user);
        dispatch(loadUser(user));
      } else {
        dispatch(NavigationActions.navigate({ routeName: 'Login' }));
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
