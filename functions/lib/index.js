"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require("firebase-functions");
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require("firebase-admin");
admin.initializeApp();
var db = admin.database();
var refReminders = db.ref('reminders');
var refPermissions = db.ref('permissions');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.dailyJob = functions.pubsub.topic('daily-tick').onPublish((event) => {
    var dailyReminderObject = [];
    // pulling reminder data
    refReminders.orderByChild('date').once('value', (snapshot) => __awaiter(this, void 0, void 0, function* () {
        console.log(snapshot.val());
        yield snapshot.forEach((data) => {
            // user level
            let uid = data.key;
            let notificationToken;
            refPermissions.orderByKey().equalTo(uid).once('value', (permission) => {
                notificationToken = Promise.all(permission.val()[uid]['notificationToken']);
                console.log(notificationToken);
            })
                .then(
            // let object;
            data.forEach((reminder) => {
                // reminder level
                console.log(reminder.val());
                dailyReminderObject.push({
                    'uid': uid,
                    'name': reminder.val().name,
                    'notificationToken': notificationToken,
                });
                return false;
            }));
            return false;
        });
        console.log(dailyReminderObject);
    }));
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
//# sourceMappingURL=index.js.map