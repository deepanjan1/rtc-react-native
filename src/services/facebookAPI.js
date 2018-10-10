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
    const { type, idToken } = await Expo.Google.logInAsync({
      iosClientId: '819008592100-f5jlfhd9mgdr6266vcqhqdeofbmk5hd2.apps.googleusercontent.com',
      androidClientId: '819008592100-9ahcr3iu0gg3k020j7lcd2n8umag9ccu.apps.googleusercontent.com',
      iosStandaloneAppClientId:
      '819008592100-6o8g7tf2cbepm29i3nnv98f65p71kr65.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    });
    if (type === 'success') {
      // build credential and store within firebase
      // console.log({type});
      // console.log({accessToken});
      await storeLoginWithGoogle(type, idToken);
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
