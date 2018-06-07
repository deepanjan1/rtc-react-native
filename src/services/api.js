import {
  initialize,
  setListener,
  setListenerOff,
  setUserListener,
  updateData,
  removeData,
  writeData,
  readData,
  createKey,
  removeAllData,
} from './firebase';

export const initApi = () => initialize();

// reminder listeners so reminders are automatically updated in UI when
// deleted, updated, or added in database (PULL FUNCTION)
export const getReminders = (uid, updaterFn) => setListener('reminders/' + uid, updaterFn);
export const shutOffGetReminders = (uid) => setListenerOff('reminders/' + uid);

// contact listeners so contacts are automatically updated in UI when
// deleted, updated, or added in database (PULL FUNCTION)
export const contactListener = (uid, updaterFn) => setListener('contacts/' + uid, updaterFn);
export const shutOffContactListener = (uid) => setListenerOff('contacts/' + uid);

export const currentUserListener = (updaterFn) => setUserListener(updaterFn);

export const createReminder = (uid, reminder) => {
  // creating a reminder and key and returning full reminder object
  // so I can save within redux store
  if (Boolean(reminder)) {
    const endpoint = 'reminders/' + uid + '/';
    console.log(endpoint);
    var reminderWithKey = createKey(endpoint, reminder);
    updateData(endpoint, reminderWithKey);
  }
};

export const updateReminder = (uid, reminder) => {
  // take in a reminder with updated values but same key and replace
  if (Boolean(reminder)) {
    const endpoint = 'reminders/' + uid + '/';
    updateData(endpoint, reminder);
  }
};

export const initLoadContacts = (uid, contacts) => {
  if (Boolean(contacts && uid)) {
    console.log('initLoadContacts ' + uid);
    writeData('contacts/' + uid, contacts);
  }
};

export const updateContacts = (uid, contacts) => {
  if (Boolean(contacts && uid)) {
    const endpoint = 'contacts/' + uid;
    console.log('updating contacts: ' + uid);
    updateData(endpoint, contacts);
  }
};

export const removeReminder = (uid, key) => {
  const endpoint = 'reminders/' + uid + '/';
  if (Boolean(key)) {
    removeData(endpoint, key);
  }
};

export const deleteAllContacts = () => {
  removeAllData();
};

// export const getContacts = () => readData('contacts');
