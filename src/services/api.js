import {
  initialize,
  setListener,
  setListenerOff,
  updateData,
  removeData,
  writeData,
  readData,
  createKey,
} from './firebase';

export const initApi = () => initialize();

// reminder listeners so reminders are automatically updated in UI when
// deleted, updated, or added in database
export const getReminders = (updaterFn) => setListener('reminders', updaterFn);
export const shutOffGetReminders = () => setListenerOff('reminders');

// contact listeners so contacts are automatically updated in UI when
// deleted, updated, or added in database
export const getContacts = (updaterFn) => setListener('contacts', updaterFn);
export const shutOffGetContacts = () => setListenerOff('contacts');

export const createReminder = (reminder) => {
  // creating a reminder and key and returning full reminder object
  // so I can save within redux store
  if (Boolean(reminder)) {
    var reminderWithKey = createKey('reminders/', reminder);
    updateData('reminders/', reminderWithKey);
  }
};

export const updateReminder = (reminder) => {
  // take in a reminder with updated values but same key and replace
  if (Boolean(reminder)) {
    updateData('reminders/', reminder);
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

// export const getContacts = () => readData('contacts');
