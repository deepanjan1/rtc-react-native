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
        dispatch(loadUser(user, true));
        dispatch(watchReminderData(user.uid));
        dispatch(watchContactData(user.uid));
        dispatch(NavigationActions.navigate({ routeName: 'Dashboard' }));
      } else {
        console.log(user);

        // dispatch(loadUser(user));
        dispatch(NavigationActions.navigate({ routeName: 'Login' }));
      }
    });
  }
);

export const loadUser = (user, isLoggedIn) => (
  {
    type: 'LOAD_USER',
    user: {
      name: user.displayName,
      uid: user.uid,
      email: user.email,
      photo: user.photoURL,
    },
    isLoggedIn: isLoggedIn,
  }
);
