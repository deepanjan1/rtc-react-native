import * as firebase from 'firebase';
import * as firebaseAPI from '../config/apiconfig';
// import firebaseui from 'firebaseui';

export const initialize = () => firebase.initializeApp({
  apiKey: firebaseAPI.apiKey,
  authDomain: firebaseAPI.authDomain,
  databaseURL: firebaseAPI.databaseURL,
  projectId: firebaseAPI.projectId,
  storageBucket: firebaseAPI.storageBucket,
  messagingSenderId: firebaseAPI.messagingSenderId,
});

export const setListener = (endpoint, updaterFn) => {
  return firebase.database().ref(endpoint).on('value', updaterFn);
  // return () => firebase.database().ref(endpoint).off();
};

export const setListenerOff = (endpoint) => {
  return () => firebase.database().ref(endpoint).off();
};

export const pushData = (endpoint, data) => {
  var updates = {};
  const dataKey = firebase.database().ref(endpoint).push().key;
  // console.log('dataKey: ' + dataKey);
  data.key = dataKey;
  updates[dataKey] = data;
  // return firebase.database().ref(endpoint).push().set(data);
  return firebase.database().ref(endpoint).update(updates);
};

export const writeData = (endpoint, data) => {
  return firebase.database().ref(endpoint).set(data);
};

export const removeData = (endpoint, key) => {
  return firebase.database().ref(endpoint).child(key).remove();
};

export const readData = (endpoint) => {
  return firebase.database().ref(endpoint).child('Deep').once('value');
};

// other end points besides "push" are "set" to override and "update"
// to update a specific entry
