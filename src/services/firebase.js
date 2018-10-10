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

export const setUserListener = (updaterFn) => (
  firebase.auth().onAuthStateChanged(updaterFn)
);

export const setUserListenerOff = (updaterFn) => (
  firebase.auth().onAuthStateChanged(updaterFn).off()
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

export const removeAllData = () => (
  firebase.database().ref('contacts/').remove()
);

export const readData = (endpoint) => (
  firebase.database().ref(endpoint).once('value')
);

// other end points besides "push" are "set" to override and "update"
// to update a specific entry

// AUTHENTICATION MANAGEMENT //
export const storeLoginWithFacebook = async(type, token) => {
  if (type === 'success') {
    // Build Firebase credential with the Facebook access token.
    const credential = await firebase.auth.FacebookAuthProvider.credential(token);
    console.log({ credential });

    // Sign in with credential from the Facebook user.
    firebase.auth().signInWithCredential(credential).catch((error) => {
      console.log({ error });
      console.log('storing in firebase did not work');
    });
  }
};

export const storeLoginWithGoogle = async(type, token) => {
  if (type === 'success') {
    // Build Firebase credential with the Facebook access token.
    const credential = firebase.auth.GoogleAuthProvider.credential(token);
    // console.log({ credential });

    // Sign in with credential from the Google user.
    firebase.auth().signInAndRetrieveDataWithCredential(credential).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // console.log({ errorMessage });
      // The email of the user's account used.
      var email = error.email;

      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
    });
    userLoginStatus();

    // Sign in with credential from the Facebook user.
      // firebase.auth().signInWithCredential(credential.idToken).catch((error) => {
      //   console.log({ error });
      //   console.log('storing in firebase did not work');
      // });
  }
};

export const userLoginStatus = () => (
  firebase.auth().currentUser
);

export const userLogout = () => {
  firebase.auth().signOut();
  console.log('sign-out from firebase success');
};
