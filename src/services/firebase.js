import * as firebase from 'firebase';
import * as firebaseAPI from '../config/apiconfig';

export const initialize = () => firebase.initializeApp({
  apiKey: firebaseAPI.apiKey,
  authDomain: firebaseAPI.authDomain,
  databaseURL: firebaseAPI.databaseURL,
  projectId: firebaseAPI.projectId,
  storageBucket: firebaseAPI.storageBucket,
  messagingSenderId: firebaseAPI.messagingSenderId,
});

export const setListener = (endpoint, updaterFn) => (
  firebase.database().ref(endpoint).on('value', updaterFn)
);

export const setListenerOff = (endpoint) => (
  () => firebase.database().ref(endpoint).off()
);

export const updateData = (endpoint, data) => {
  var updates = {};
  if (Boolean(data.key)) {
    updates[data.key] = data;
  } else {
    updates = data;
  }

  return firebase.database().ref(endpoint).update(updates);
};

export const createKey = (endpoint, data) => {
  var updates = {};
  const dataKey = firebase.database().ref(endpoint).push().key;
  data.key = dataKey;
  return data;
};

export const writeData = (endpoint, data) => (
  firebase.database().ref(endpoint).set(data)
);

export const removeData = (endpoint, key) => (
  firebase.database().ref(endpoint).child(key).remove()
);

export const readData = (endpoint) => (
  firebase.database().ref(endpoint).child('Deep').once('value')
);

// other end points besides "push" are "set" to override and "update"
// to update a specific entry

// AUTHENTICATION MANAGEMENT //
export const storeLoginWithFacebook = async(type, token) => {
  if (type === 'success') {
    // Build Firebase credential with the Facebook access token.
    const credential = firebase.auth.FacebookAuthProvider.credential(token);
    console.log(credential);

    // Sign in with credential from the Facebook user.
    firebase.auth().signInWithCredential(credential).catch((error) => {
      console.log('storing in firebase did not work');
    });
  }
};

export const userLoginStatus = () => {
  var user = firebase.auth().currentUser;
  if (Boolean(user)) {
    return user;
  }
};
