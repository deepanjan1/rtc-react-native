import { getReminders } from '../services/api';
import AsyncStorage from 'react-native';

export const actionTypes = {
  LOAD_REMINDERS: 'LOAD_REMINDERS',
  SELECTED_REMINDER: 'SELECTED_REMINDER',
};

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
