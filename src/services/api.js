import {
  initialize,
  setListener,
  pushData,
  removeData,
  writeData,
  readData
} from './firebase';

export const initApi = () => initialize();

export const getReminders = (updaterFn) => setListener('reminders', updaterFn);

export const createReminders = (reminder) => {
  if (Boolean(reminder)) {
    pushData('reminders', { reminder });
  }
};

export const syncContacts = (name, contacts) => {
  if (Boolean(contacts)) {
    // pushData('contacts/', { contacts });
    writeData('contacts/' + name, { contacts });
  }
};

export const removeContacts = () => {
  removeData('contacts');
};

export const getContacts = () => readData('contacts');
