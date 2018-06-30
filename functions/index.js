// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

var db = admin.database();
var refReminders = db.ref('reminders');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.dailyJob =
  functions.pubsub.topic('daily-tick').onPublish((event) => {
    var dailyReminderObject = [];

    // pulling reminder data
    refReminders.orderByChild('date').once('value', async function (snapshot) {
        // pulling all reminders
        console.log(snapshot.val());
        snapshot.forEach(function (data) {
          // user level
          console.log('uid: ' + data.key);
          const uid = data.key;
          const object = {};
          data.forEach(function (item) {
            // reminder level
            object.uid = uid;
            object.name = item.val().name;
            dailyReminderObject.push(object);
            console.log(item.val().name);
          });
        });
      }).then(function () {
        console.log(dailyReminderObject);
      });

    return dailyReminderObject;
  });

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
