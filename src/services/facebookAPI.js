import Expo from 'expo';
import { storeLoginWithFacebook } from './firebase';
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
    const response = await fetch(
      `https://graph.facebook.com/me?access_token=${token}`);
    console.log(await response.json());
    Alert.alert(
      'Logged in!',
      `Hi ${(await response.json()).name}!`,
    );
  }
};
