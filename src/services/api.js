import { initialize, setListener, pushData, removeData } from './firebase';

export const initApi = () => initialize();

export const getReminders = (updaterFn) => setListener('reminders', updaterFn);

export const createReminders = (reminder) => {
  if (Boolean(reminder)) {
    pushData('reminders', { reminder });
  }
};

export const syncContacts = (contacts) => {
  if (Boolean(contacts)) {
    pushData('contacts', { contacts });
  }
};

export const removeContacts = () => {
  removeData('contacts');
};
