import {
  getReminders,
  contactListener,
  currentUserListener,
  getPermissions,
} from '../services/api';
import { getExistingPermission } from '../components/Notifications/NotificationFunctions';
import { StackActions, NavigationActions } from 'react-navigation';
import _ from 'underscore';

export const actionTypes = {
  LOAD_REMINDERS: 'LOAD_REMINDERS',
  SELECTED_REMINDER: 'SELECTED_REMINDER',
  SYNC_CONTACTS: 'SYNC_CONTACTS',
  LOAD_USER: 'LOAD_USER',
  LOGGED_IN: 'LOGGED_IN',
  LOGGED_OUT: 'LOGGED_OUT',
  REMOVE_USER: 'REMOVE_USER',
  LOAD_NOTIFICATION_TOKEN: 'LOAD_NOTIFICATION_TOKEN',
  NOTIFICATION_MODAL_ON: 'NOTIFICATION_MODAL_ON',
  CLOSE_NOTIFICATION_MODAL: 'CLOSE_NOTIFICATION_MODAL',
};

// Reminder Stuff
export const watchReminderData = (uid) => (
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
export const watchContactData = (uid) => (
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

// Permissions stuff
watchPermissions = (uid) => (
  (dispatch) => {
    let path = uid + '/notificationToken';
    getPermissions(path, (snapshot) => {
      try {
        let notificationToken = Object.values([snapshot.val()])[0];
        getExistingPermission(
          notificationToken,
          uid,
          (bool) => dispatch(notificationModal(bool))
        );
        dispatch(loadNotificationToken(notificationToken));
      }
      catch (error) {
        console.log({ error });
      }
    });
  }
);

// User Stuff
export const watchUserData = () => (
  (dispatch) => {
    currentUserListener((user) => {
      if (!_.isEmpty(user)) {
        console.log('from action creator login: ' + user.displayName);
        dispatch(loadUser(user));
        dispatch(setLoggedInUser(true));
        dispatch(watchReminderData(user.uid));  //listener to pull reminder data
        dispatch(watchContactData(user.uid));  //listener to pull contact data
        dispatch(watchPermissions(user.uid));  //listener to pull notificationToken
      } else {
        dispatch(removeUser(user));
        dispatch(logOutUser(false));
        dispatch(NavigationActions.navigate({ routeName: 'Welcome' }));
      }
    });
  }
);

export const watchUserDataForLogin = () => (
  (dispatch) => {
    currentUserListener((user) => {
      if (!_.isEmpty(user)) {
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

export const loadNotificationToken = (notificationToken) => (
  {
    type: 'LOAD_NOTIFICATION_TOKEN',
    notificationToken,
  }
);

export const notificationModal = (notificationModal) => (
  {
    type: 'NOTIFICATION_MODAL_ON',
    notificationModal,
  }
);

export const closeNotificationModal = (bool) => (
  {
    type: 'CLOSE_NOTIFICATION_MODAL',
    notificationModal: bool,
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
