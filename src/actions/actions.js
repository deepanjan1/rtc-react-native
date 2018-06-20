import { getReminders, contactListener, currentUserListener } from '../services/api';
import AsyncStorage from 'react-native';
import { NavigationActions } from 'react-navigation';

export const actionTypes = {
  LOAD_REMINDERS: 'LOAD_REMINDERS',
  SELECTED_REMINDER: 'SELECTED_REMINDER',
  SYNC_CONTACTS: 'SYNC_CONTACTS',
  LOAD_USER: 'LOAD_USER',
  LOGGED_IN: 'LOGGED_IN',
  LOGGED_OUT: 'LOGGED_OUT',
  REMOVE_USER: 'REMOVE_USER',
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

export const loadReminders = (reminders) => (dispatch) => (
  dispatch({
    type: 'LOAD_REMINDERS',
    reminders,
  })
);

export const selectedReminder = (reminder) => (dispatch) => (
  dispatch({
    type: 'SELECTED_REMINDER',
    reminder,
  })
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

export const syncContacts = (contacts) => (dispatch) => (
  dispatch({
      type: 'SYNC_CONTACTS',
      contacts: contacts,
    })
);

// User Stuff
export const watchUserData = () => (
  (dispatch) => {
    currentUserListener((user) => {
      if (user !== null) {
        console.log('from action creator: ' + user.displayName);
        dispatch(loadUser(user));
        dispatch(watchReminderData(user.uid));
        dispatch(watchContactData(user.uid));
      } else {
        console.log('from action creator: ' + user);
        dispatch(removeUser(user));
        dispatch(logOutUser(false));
        dispatch(NavigationActions.navigate({ routeName: 'Login' }));
      }
    });
  }
);

export const watchUserDataForLogin = () => (
  (dispatch) => {
    currentUserListener((user) => {
      if (user !== null) {
        dispatch(loadUser(user));
        dispatch(setLoggedInUser(true));
        dispatch(NavigationActions.navigate({ routeName: 'Dashboard' }));
      }
    });
  }
);

export const setLoggedInUser = (isLoggedIn) => (dispatch) => {
  dispatch({
    type: 'LOGGED_IN',
    isLoggedIn: isLoggedIn,
  });
};

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

export const logOutUser = (isLoggedIn) => (dispatch) => {
  dispatch({
    type: 'LOGGED_OUT',
    isLoggedIn,
  });
};

export const removeUser = (user) => (
  {
    type: 'REMOVE_USER',
    user,
  }
);
