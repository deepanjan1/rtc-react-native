const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.daily_job =
  functions.pubsub.topic('daily-tick').onPublish((event) => {
    console.log('This job is run every day!');
    return (console.log('Hello!'));
  });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
