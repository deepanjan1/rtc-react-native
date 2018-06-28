const functions = require('firebase-functions');
const admin = require('firebase-admin');
const Expo = require('expo-server-sdk');
var loadAllRemindersAndPermissions = require('../src/services/api');

admin.initializeApp();

// Create a new Expo SDK client
let expo = new Expo();

exports.daily_job =
  functions.pubsub.topic('daily-tick').onPublish((event) => {
    console.log('This job is run every day!');
    return (console.log('Hello!'));
  });

exports.sendReminders =
  functions.pubsub.topic('send-reminders').onPublish((event) => {
    console.log('send reminders is working');
    var object = loadAllRemindersAndPermissions();
    return typeof (object);
  });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
