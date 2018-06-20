import Expo from 'expo';
import {
  storeLoginWithFacebook,
  userLoginStatus,
  userLogout,
} from './firebase';
import Alert from 'react-native';

export const loginWithFacebook = async() => {
  const { type, token } = await Expo.Facebook
  .logInWithReadPermissionsAsync('140333090089093', {
      permissions: ['public_profile', 'email'],
    });
  if (type === 'success') {
    // build credential and store within firebase
    await storeLoginWithFacebook(type, token);

    // Get the user's name using Facebook's Graph API
    // const response = await fetch(
    //   `https://graph.facebook.com/me?access_token=${token}`);
    // console.log(await response.json());
    // Alert.alert(
    //   'Logged in!',
    //   `Hi ${(await response.json()).name}!`,
    // );
  }
};

export const loadCurrentUser = async (loadUser) => {
  const user = await userLoginStatus();
  console.log('pre-if: ' + Boolean(await user));
  if (Boolean(user)) {
    console.log('post-if: ' + Boolean(user));
    console.log(user.displayName + ' is logged in!');
  } else {
    console.log('user not logged in');
    return null;
  }
};

export const logoutCurrentUser = () => {
  userLogout();
};
