import { initialize, setListener, pushData } from './firebase';

export const initApi = () => initialize();

export const getReminders = (updaterFn) => setListener('reminders', updaterFn);

export const createReminders = (reminder) => {
  if (Boolean(reminder)) {
    pushData('reminders', { reminder });
  }
};
