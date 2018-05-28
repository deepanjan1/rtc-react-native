import {
  initialize,
  setListener,
  setListenerOff,
  pushData,
  removeData,
  writeData,
  readData,
  createKey,
} from './firebase';

export const initApi = () => initialize();

export const getReminders = (updaterFn) => setListener('reminders', updaterFn);
export const shutOffGetReminders = () => setListenerOff('reminders');

export const createReminder = (reminder) => {
  // creating a reminder and key and returning full reminder object
  // so I can save within redux store
  if (Boolean(reminder)) {
    var reminderWithKey = createKey('reminders/', reminder);
    pushData('reminders/', reminderWithKey);
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
