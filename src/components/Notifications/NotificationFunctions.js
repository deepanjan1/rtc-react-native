import { Permissions, Notifications } from 'expo';
import { writeNotificationToken } from '../../services/api';

// import Expo from 'expo-server-sdk';

// function to ask for permission for Notifications
export const getExistingPermission = async (
  notificationToken,
  uid,
) => {
  const { status: existingStatus } = await Permissions.askAsync(
    Permissions.NOTIFICATIONS
  );
  if (existingStatus !== 'granted') {
    console.log('status not granted');
    return false;
  } else {
    let token = await Notifications.getExpoPushTokenAsync();
    /* compare to the firebase token; if it's the same, do nothing,
    if it's different, replace */
    console.log({ token });
    if (token === notificationToken) {
      console.log('existing token loaded');
      return true;
    } else {
      console.log('token is not loading, re-writing token to firebase');
      writeNotificationToken(uid, token);
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
  };

  if (finalStatus !== 'granted') {
    console.log('final status not granted: ' + finalStatus);
    return; // will load modal
  }

  // grab Notification permission token
  let token = await Notifications.getExpoPushTokenAsync();
  console.log(token);
  writeNotificationToken(uid, token);
};

//  Wire into Dashboard
