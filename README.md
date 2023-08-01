
# Headless Demo App

This is a demo app that is built using [Novu's headless notification center](https://docs.novu.co/notification-center/headless/headless-service/).

It showcases some of the features available. For a full reference of all the features available, please see [this API reference](https://docs.novu.co/notification-center/headless/api-reference/).
## Demo

![gif to showcase Headless Demo app](https://res.cloudinary.com/dxc6bnman/image/upload/v1690895916/guides/output_htwncc.gif)


## Run locally:
This repo has two parts:
- frontend, and
- backend

To run this app locally, you just need to:
1. Clone this repo.
2. Install all the required packages for frontend as well as backend using `npm install`.
3. Supply your `NOVU_API_KEY` and `SUSBSCRIBER_ID`. You can obtain both of them from the settings menu in [Novu's web dashboard](https://web.novu.co/settings).
4. In the backend, you'll need to create a subscriber first before sending notifications to that subscriber. It has been done in the `novu.js` file in the `novu` directory in backend. 
5. To run both the backend as well as the frontend, navigate to the respective directory by using `cd frontend` or `cd backend` and run `npm start` in the root of the directory.

## APIs consumed:
In this demo app, the following APIs have been consumed:

- **initializeSession**: Like the name suggests, this API initialises the session. This is a must before one can use any other API listed in [this API reference](https://docs.novu.co/notification-center/headless/api-reference/).

- fetchNotifications: This API fetches all the notification for a subscriber. This runs when the notification bell is clicked on the UI.

- markNotificationsAsRead: This API marks a notification as read. This is essential to differentiate the read and unread notifications on the UI. 

- removeNotification: This API deletes the notification from the list of notifications sent to the subscriber. If a subscriber has many notifications and one is deleted, then that notifications vanishes from their UI and the remaining notifications are shown.

- markNotificationsAsRead: This is quite straight-forward. This just marks all the notifications as 'read' for a subscriber. 

--- 

## Note: 
The above listed APIs are just some of the many available with the Novu headless notification center. You can check the full list [here](https://docs.novu.co/notification-center/headless/api-reference/).

