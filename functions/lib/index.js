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
var refContacts = db.ref('contacts');
// Runs a job daily to push notifications to phones for reminders
exports.dailyJob = functions.pubsub.topic('daily-tick').onPublish((event) => {
    var dailyReminderObject = [];
    // pulling reminder data
    refReminders.orderByChild('date').once('value', (snapshot) => __awaiter(this, void 0, void 0, function* () {
        // console.log(snapshot.val());
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
                // reseting array for another batch
                dailyReminderObject = [];
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
            'title': 'Remember to call ' + dailyReminderObject[i].name,
            'body': 'Reach out within a week to create or add to your streak!',
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
/* This function checks to see first pull any reminders that have a streak going
and are due to being reached out to, and also are outside of the 7 day period.
If a reminder is outside of the 7 day period, the streak counter is reset */
exports.streakValidator = functions.pubsub.topic('daily-tick').onPublish((event) => {
    var dailyReminderObject = [];
    // one day in milliseconds
    const one_day = 1000 * 60 * 60 * 24;
    let dayDifference;
    // pulling reminder data
    console.log({ today });
    refReminders.orderByChild('date').once('value', (snapshot) => __awaiter(this, void 0, void 0, function* () {
        yield snapshot.forEach((data) => {
            // user level
            let uid = data.key;
            data.forEach((reminder) => {
                // reminder level
                if (reminder.val().streak > 0) {
                    let reminderDate = new Date(reminder.val().date);
                    let today = new Date();
                    if (reminderDate < today) {
                        console.log({ reminderDate });
                        dayDifference = (today.getTime() - reminderDate.getTime()) / one_day;
                        if (dayDifference > 7) {
                            refReminders.child(uid).child(reminder.val().key).update({
                                'streak': 0,
                            });
                        }
                    }
                }
                return true;
            });
            return false;
        });
    }));
});
/* Function will send a push notification 48 hours prior to the 7 day window */
exports.followUpNotification = functions.pubsub.topic('daily-tick').onPublish((event) => {
    var followUpReminder = [];
    // one day in milliseconds
    const one_day = 1000 * 60 * 60 * 24;
    let dayDifference;
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
                    let reminderDate = new Date(reminder.val().date);
                    let today = new Date();
                    if (reminderDate < today) {
                        dayDifference = Math.floor((today.getTime() - reminderDate.getTime()) / one_day);
                        if (dayDifference == 2) {
                            followUpReminder.push({
                                'uid': uid,
                                'name': reminder.val().name,
                                'notificationToken': notificationToken,
                            });
                        }
                    }
                    return false;
                });
                console.log({ followUpReminder });
                buildFollowUpMessages(followUpReminder);
                // reseting array for another batch
                followUpReminder = [];
            });
            return false;
        });
    }));
    // insert function for sending batch notifications
    return ('function works');
});
const buildFollowUpMessages = (followUpReminder) => {
    let messages = [];
    const length = followUpReminder.length;
    for (var i = 0; i < length; i++) {
        messages.push({
            'to': followUpReminder[i].notificationToken,
            'sound': 'default',
            'title': "Don't forget to reach out to " + followUpReminder[i].name,
            'body': 'You have 2 days left to keep your streak alive!',
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