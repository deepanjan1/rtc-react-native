// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
import * as functions from 'firebase-functions';

// The Firebase Admin SDK to access the Firebase Realtime Database.
import * as admin from 'firebase-admin';

// Import Expo notification
import * as Expo from 'expo-server-sdk';

// Create a new expo client
let expo = new Expo();

// Create new Date Object
const getTodayDate = () => {
  var today = new Date();
  console.log({today});
  var dd = today.getUTCDate();
  var mm = today.getUTCMonth()+1; //January is 0!
  var yyyy = today.getUTCFullYear();
  let day;
  let month;

  if(dd<10) {
    day = '0'+dd.toString();
  } else {
    day = dd.toString();
  }

  if(mm<10) {
    month = '0'+mm.toString();
  } else {
    month = mm.toString();
  }
  var todayString = month + '/' + day + '/' + yyyy.toString();
  return todayString;
}

var today = getTodayDate();

admin.initializeApp();

var db = admin.database();
var refReminders = db.ref('reminders');
var refPermissions = db.ref('permissions');

// Runs a job daily to push notifications to phones for reminders
export const dailyJob = functions.pubsub.topic('daily-tick').onPublish((event) => {
  var dailyReminderObject = [];

  // pulling reminder data
  console.log(today);
  refReminders.orderByChild('date').once('value', async (snapshot) => {
    console.log(snapshot.val());
    await snapshot.forEach((data) => {
      // user level
      let uid = data.key;
      let notificationToken;
      refPermissions.orderByKey().equalTo(uid).once('value', (permission) => {
        notificationToken = permission.val()[uid]['notificationToken'];
        // let object;
        console.log('notificationToken: ' + notificationToken);
        data.forEach((reminder) => {
          // reminder level
          console.log(reminder.val())
          if (reminder.val().date == today) {
            dailyReminderObject.push(
              {
                'uid': uid,
                'name': reminder.val().name,
                'notificationToken': notificationToken,
              }
            );
          }
          return false;
        });
        console.log({dailyReminderObject});
        buildMessages(dailyReminderObject);
      });
      return false;
    });
    });
  // insert function for sending batch notifications
  return ('function works');
});

const buildMessages = (dailyReminderObject) => {
  let messages = [];
  const length = dailyReminderObject.length;
  for (var i = 0; i < length; i++) {
    messages.push({
      'to': dailyReminderObject[i].notificationToken,
      'sound': 'default',
      'body': 'Reach out to ' + dailyReminderObject[i].name,
    })
  }
  console.log({messages});
  let chunks = expo.chunkPushNotifications(messages);
  (async () => {
  // Send the chunks to the Expo push notification service. There are
  // different strategies you could use. A simple one is to send one chunk at a
  // time, which nicely spreads the load out over time:
    for (let chunk of chunks) {
      try {
        let receipts = await expo.sendPushNotificationsAsync(chunk);
        console.log({receipts});
      } catch (error) {
        console.error({error});
      }
    }
  })();
}

// check to see if streak is valid

export const streakValidator = functions.pubsub.topic('daily-tick').onPublish((event) => {
  var dailyReminderObject = [];
  // one day in milliseconds
  const one_day=1000*60*60*24;
  let dayDifference;
  // pulling reminder data
  console.log({today});
  refReminders.orderByChild('date').once('value', async (snapshot) => {
    await snapshot.forEach((data) => {

      // user level
      let uid = data.key;
      data.forEach((reminder) => {
        // reminder level
        if (reminder.val().streak > 0) {
          let reminderDate = new Date(reminder.val().date);
          let today = new Date();
          // console.log({reminderDate});
          console.log({today});
          if (reminderDate < today) {
            console.log({reminderDate});
            dayDifference = (today.getTime() - reminderDate.getTime())/one_day;
            if (dayDifference > 7) {
              refReminders.child(uid).child(reminder.val().key).update({
                'streak': 0,
              })
            }
          }
        }
        return true;
      });
      return false;
    });
    });
});
