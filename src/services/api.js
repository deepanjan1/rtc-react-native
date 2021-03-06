import {
  initialize,
  setListener,
  setListenerOff,
  setUserListener,
  setUserListenerOff,
  updateData,
  removeData,
  writeData,
  createKey,
  readData,
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
export const currentUserListenerOff = (updaterFn) => setUserListenerOff(updaterFn);

export const createReminder = (uid, reminder) => {
  // creating a reminder and key and returning full reminder object
  // so I can save within redux store
  if (Boolean(reminder)) {
    const endpoint = 'reminders/' + uid + '/';
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

export const loadAllRemindersAndPermissions = () => {
  readData('permissions');
  return (readData('reminders'));
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

// Permission Listener and modifier functions
export const getPermissions = (uid, updaterFn) =>
  setListener('permissions/' + uid, updaterFn);

export const shutOffGetPermissions = (uid) => setListenerOff('permissions/' + uid);

// write new notification token
export const writeNotificationToken = (uid, notificationToken) => {
  console.log('from firebase write: ' + notificationToken + 'for ' + uid);
  const endpoint = 'permissions/' + uid + '/notificationToken/';
  writeData(endpoint, notificationToken);
};
