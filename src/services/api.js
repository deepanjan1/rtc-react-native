import {
  initialize,
  setListener,
  setListenerOff,
  pushData,
  removeData,
  writeData,
  readData
} from './firebase';

export const initApi = () => initialize();

export const getReminders = (updaterFn) => setListener('reminders', updaterFn);
export const shutOffGetReminders = () => setListenerOff('reminders');

export const createReminders = (reminder) => {
  if (Boolean(reminder)) {
    pushData('reminders/', reminder);
  }
};

export const syncContacts = (name, contacts) => {
  if (Boolean(contacts)) {
    writeData('contacts/' + name, { contacts });
  }
};

export const removeReminder = (key) => {
  if (Boolean(key)) {
    removeData('reminders/', key);
  }
};

// export const removeContacts = () => {
//   removeData('contacts');
// };

export const getContacts = () => readData('contacts');
