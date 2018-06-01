import { getReminders, contactListener } from '../services/api';
import AsyncStorage from 'react-native';

export const actionTypes = {
  LOAD_REMINDERS: 'LOAD_REMINDERS',
  SELECTED_REMINDER: 'SELECTED_REMINDER',
  SYNC_CONTACTS: 'SYNC_CONTACTS',
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
