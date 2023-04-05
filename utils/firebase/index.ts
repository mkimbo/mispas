import { initializeApp, getApps } from "firebase/app";
//import admin from "firebase-admin";
//import { cert } from "firebase-admin/app";
//import { getFirestore } from "firebase-admin/firestore";
//import { getStorage } from 'firebase-admin/storage';
//import * as admin from "firebase-admin";

import { getFirestore } from "firebase/firestore";
//import serviceAccount from "../../config/AdminSA.json";
//const sa = require("../../config/AdminSA.json");
import { firebaseConfig } from "../../config/firebase.config";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  getAuth,
  signInWithPhoneNumber,
  Auth,
  RecaptchaVerifier,
  AuthCredential,
  PhoneAuthProvider,
  //verify
} from "firebase/auth";
import { getMessaging } from "firebase/messaging";
import { addPhoneNumber } from "../axios";
//import firebase from "firebase/app";
//import { Auth } from "googleapis";
const environment = process.env.NODE_ENV || "development";
const firebaseApp =
  getApps().length === 1 ? getApps()[0] : initializeApp(firebaseConfig);
//firebase.initializeApp(firebaseConfig)

export const storage = getStorage(firebaseApp);
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);

export const messaging =
  environment !== "development" ? getMessaging(firebaseApp) : null;

export const uploadFileToCloud = async (file: File) => {
  try {
    const fileName = `${Date.now()}-${file.name}`;
    const storageRef = ref(storage, "files/" + fileName);
    const uploadTaskSnapshot = await uploadBytesResumable(storageRef, file);
    const downloadUrl = await getDownloadURL(uploadTaskSnapshot.ref);
    return downloadUrl;
  } catch (error) {
    console.log("error uploading to storage", error);
  }
};

export const sendVerificationCode = async (
  auth: Auth,
  phoneNumber: string,
  appVerifier: RecaptchaVerifier
) => {
  signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      // ...
    })
    .catch((error) => {
      // Error; SMS not sent
      // ...
    });
};

export const onSendCode = async (phoneNumber: string) => {
  // get captcha object
  const appVerifier = window.recaptchaVerifier;
  return signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      // addPhoneNumber({ phoneNumber, verified: false });
      return true;
    })
    .catch((error) => {
      // Error; SMS not sent
      if (window.recaptchaWidgetId) {
        window.grecaptcha.reset(window.recaptchaWidgetId);
      } else {
        window.recaptchaVerifier
          .render()
          .then(function (widgetId) {
            window.recaptchaWidgetId = widgetId;
            window.grecaptcha.reset(widgetId);
          })
          .catch((err) => {
            // ...
          });
      }
    });
};

/* export const onVerifyCode = async (enteredCode: string) => {
  let success = false;
  window.confirmationResult
    .confirm(enteredCode)
    .then((result) => {
      console.log(result, "success");
      addPhoneNumber({ verified: true }).then((result) => true);
      //console.log(result, "success");
      // ...
    })
    .catch((error) => false);
  return success;
}; */

export const onVerifyCode = async (enteredCode: string) => {
  try {
    const result = await window.confirmationResult.confirm(enteredCode);
    //await addPhoneNumber({ verified: true });
    return true;
  } catch (error) {
    return false;
  }
};
