import { getReminders } from '../services/api';
import AsyncStorage from 'react-native';

export const actionTypes = {
  LOAD_REMINDERS: 'LOAD_REMINDERS',
};

export const watchReminderData = () => (
  (dispatch) => {
    getReminders((snapshot) => {
      dispatch(loadReminders(Object.values(snapshot.val())));
    }, (error) => { dispatch(loadReminders([])); });
  }
);

export const loadReminders = (reminders) => (
  {
    type: 'LOAD_REMINDERS',
    reminders,
  }
);
