import Expo from 'expo';
import {
  storeLoginWithFacebook,
  storeLoginWithGoogle,
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
  }
};

export const loginWithGoogle = async() => {
  try {
    const { type, accessToken } = await Expo.Google.logInAsync({
      iosClientId: '819008592100-qpb34tmehb38o0cs85rvf662os2rhjf2.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    });
    console.log({type});
    console.log({accessToken});
    if (type === 'success') {
      // build credential and store within firebase
      await storeLoginWithGoogle(type, accessToken);
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    return { error: true };
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
