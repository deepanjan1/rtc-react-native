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
// Import Expo notification
const Expo = require("expo-server-sdk");
// Create a new expo client
let expo = new Expo();
// Create new Date Object
const getTodayDate = () => {
    var today = new Date();
    console.log({ today });
    var dd = today.getUTCDate();
    var mm = today.getUTCMonth() + 1; //January is 0!
    var yyyy = today.getUTCFullYear();
    let day;
    let month;
    if (dd < 10) {
        day = '0' + dd.toString();
    }
    else {
        day = dd.toString();
    }
    if (mm < 10) {
        month = '0' + mm.toString();
    }
    else {
        month = mm.toString();
    }
    var todayString = month + '/' + day + '/' + yyyy.toString();
    return todayString;
};
var today = getTodayDate();
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
    console.log(today);
    refReminders.orderByChild('date').once('value', (snapshot) => __awaiter(this, void 0, void 0, function* () {
        console.log(snapshot.val());
        yield snapshot.forEach((data) => {
            // user level
            let uid = data.key;
            let notificationToken;
            refPermissions.orderByKey().equalTo(uid).once('value', (permission) => {
                notificationToken = permission.val()[uid]['notificationToken'];
                // let object;
                console.log('notificationToken: ' + notificationToken);
                data.forEach((reminder) => {
                    // reminder level
                    console.log(reminder.val());
                    if (reminder.val().date == today) {
                        dailyReminderObject.push({
                            'uid': uid,
                            'name': reminder.val().name,
                            'notificationToken': notificationToken,
                        });
                    }
                    return false;
                });
                console.log({ dailyReminderObject });
                buildMessages(dailyReminderObject);
            });
            return false;
        });
    }));
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
        });
    }
    console.log({ messages });
    let chunks = expo.chunkPushNotifications(messages);
    (() => __awaiter(this, void 0, void 0, function* () {
        // Send the chunks to the Expo push notification service. There are
        // different strategies you could use. A simple one is to send one chunk at a
        // time, which nicely spreads the load out over time:
        for (let chunk of chunks) {
            try {
                let receipts = yield expo.sendPushNotificationsAsync(chunk);
                console.log({ receipts });
            }
            catch (error) {
                console.error({ error });
            }
        }
    }))();
};
//# sourceMappingURL=index.js.map