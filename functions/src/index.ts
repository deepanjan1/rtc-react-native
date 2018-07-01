// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
import * as functions from 'firebase-functions';

// The Firebase Admin SDK to access the Firebase Realtime Database.
import * as admin from 'firebase-admin';

admin.initializeApp();

var db = admin.database();
var refReminders = db.ref('reminders');
var refPermissions = db.ref('permissions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

export const dailyJob = functions.pubsub.topic('daily-tick').onPublish((event) => {
  var dailyReminderObject = [];

  // pulling reminder data
  refReminders.orderByChild('date').once('value', async (snapshot) => {
    console.log(snapshot.val());
    await snapshot.forEach((data) => {
      // user level
      let uid = data.key;
      let notificationToken;
      refPermissions.orderByKey().equalTo(uid).once('value', (permission) => {
        notificationToken = Promise.all(permission.val()[uid]['notificationToken']);
        console.log(notificationToken);
      })
      // let object;
      data.forEach((reminder) => {
        // reminder level
        console.log(reminder.val())
        dailyReminderObject.push(
          {
            'uid': uid,
            'name': reminder.val().name,
            'notificationToken': notificationToken,
          }
        );
        return false;
      })
      return false;
    });
    console.log(dailyReminderObject);
    });


  return dailyReminderObject;
});

// export const dailyJob =
//   functions.pubsub.topic('daily-tick').onPublish((event) => {
//     var dailyReminderObject = [];
//
//     // pulling reminder data
//     refReminders.orderByChild('date').once('value', (snapshot) => {
//         // pulling all reminders
//         console.log(snapshot.val());
//         snapshot.forEach((data) => {
//           // user level
//           console.log('uid: ' + data.key);
//           const uid = data.key;
//           const object = {};
//           data.forEach((item) => {
//             // reminder level
//             object['uid'] = uid;
//             object['name'] = item.val().name;
//             dailyReminderObject.push(object);
//             console.log(item.val().name);
//           });
//         });
//       }).then(() => {
//         console.log(dailyReminderObject);
//       });
//
//     return dailyReminderObject;
//   });

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   refReminders.orderByChild('date').on('value', function (snapshot) {
//       // pulling all reminders
//       console.log(snapshot.val());
//       snapshot.forEach(function (data) {
//         // user level
//         console.log('uid: ' + data.key);
//         data.forEach(function (item) {
//           // reminder level
//           console.log(item.val().name);
//         });
//       });
//     });
//   response.send('Firebase is working');
// });
