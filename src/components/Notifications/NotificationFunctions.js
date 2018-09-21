import { Permissions, Notifications } from 'expo';
import { writeNotificationToken } from '../../services/api';

// import Expo from 'expo-server-sdk';

// function to ask for permission for Notifications
export const getExistingPermission = async (
  notificationToken,
  uid,
  modalFunc,
) => {
  const { status: existingStatus } = await Permissions.askAsync(
    Permissions.NOTIFICATIONS
  );
  console.log({ existingStatus });
  console.log({ uid });
  if (existingStatus !== 'granted') {
    console.log('status not granted');
    modalFunc(true);
    return false;
  } else {
    let token = await Notifications.getExpoPushTokenAsync();
    modalFunc(false);
    /* compare to the firebase token; if it's the same, do nothing,
    if it's different, replace */
    console.log({ token });
    console.log({ notificationToken });
    if (token === notificationToken) {
      console.log('existing token loaded');
      return true;
    } else {
      console.log('token is not loading, re-writing token to firebase');
      uid ? writeNotificationToken(uid, token) : console.log('userID is null');
      return true;
    }
  }
};

export const getPermissionNotifications = async (loadNotificationToken, uid) => {
  const { status: existingStatus } = await Permissions.askAsync(
    Permissions.NOTIFICATIONS
  );
  console.log(existingStatus);
  let finalStatus = existingStatus;

  // check if permissions have not already been granted for iOS
  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    console.log('existing status not granted: ' + status);
    finalStatus = status;
    return false;
  };

  if (finalStatus !== 'granted') {
    console.log('final status not granted: ' + finalStatus);
    return false; // will load modal
  }

  // grab Notification permission token
  let token = await Notifications.getExpoPushTokenAsync();
  uid ? writeNotificationToken(uid, token) : console.log('userID is null');
  return true;
};

//  Wire into Dashboard
