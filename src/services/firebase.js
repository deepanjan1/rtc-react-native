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

export const setListener = (endpoint, updaterFn) => {
  firebase.database().ref(endpoint).on('value', updaterFn);
  return () => firebase.database().ref(endpoint).off();
};

export const pushData = (endpoint, data) => {
  return firebase.database().ref(endpoint).push(data);
};

export const removeData = (endpoint) => {
  return firebase.database().ref(endpoint).remove();
};

// other end points besides "push" are "set" to override and "update"
// to update a specific entry
