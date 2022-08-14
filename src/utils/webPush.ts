import "firebase/messaging";
import firebase from "firebase/app";
import { getApps, initializeApp } from "firebase/app";
import localforage from "localforage";
import { firebaseConfig } from "../config/firebase.config";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseCloudMessaging = {
  //checking whether token is available in indexed DB
  tokenInlocalforage: async () => {
    return localforage.getItem("fcm_token");
  },

  //initializing firebase app
  init: async function () {
    const app = !getApps().length
      ? initializeApp(firebaseConfig)
      : getApps()[0];
    try {
      const messaging = getMessaging(app);
      const tokenInLocalForage = await this.tokenInlocalforage();

      //if FCM token is already there just return the token
      if (tokenInLocalForage !== null) {
        return tokenInLocalForage;
      }

      //requesting notification permission from browser
      const status = await Notification.requestPermission();
      if (status && status === "granted") {
        //getting token from FCM
        const fcm_token = await getToken(messaging);
        if (fcm_token) {
          console.log("FCM token: ", fcm_token);
          //setting FCM token in indexed db using localforage
          localforage.setItem("fcm_token", fcm_token);
          //return the FCM token after saving it
          return fcm_token;
        }
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};
export { firebaseCloudMessaging };
