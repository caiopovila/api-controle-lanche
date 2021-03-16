import * as webpush from 'web-push';

import { config } from "dotenv";

config();

const publicVapidKey = process.env.PUSH_PUBLIC_KEY;
const privateVapidKey = process.env.PUSH_PRIVATE_KEY;

webpush.setVapidDetails('mailto:caiopovila@hotmail.com', publicVapidKey, privateVapidKey);

export const notification = (req, res) => {
  const allSubscriptions = [
    req.body
  ]

  console.log('Total subscriptions', allSubscriptions.length);

  const notificationPayload = {
      "notification": {
          "title": "Angular News",
          "body": "Newsletter Available!",
          "icon": "assets/main-page-logo-small-hat.png",
          "vibrate": [100, 50, 100],
          "data": {
              "dateOfArrival": Date.now(),
              "primaryKey": 1
          },
          "actions": [{
              "action": "explore",
              "title": "Go to the site"
          }]
      }
  };

  Promise.all(allSubscriptions.map((sub: any) => webpush.sendNotification(
      sub, JSON.stringify(notificationPayload) )))
      .then(() => res.status(200).json({message: 'Newsletter sent successfully.'}))
      .catch(err => {
          console.error("Error sending notification, reason: ", err);
          res.sendStatus(500);
    });
};