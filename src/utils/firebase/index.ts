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

const firebaseApp =
  getApps().length === 1
    ? getApps()[0]
    : initializeApp(firebaseConfig);
//const app =
export const storage = getStorage(firebaseApp);
export const db = getFirestore(firebaseApp);

export const uploadFileToCloud = async (file: File) => {
  try {
    const fileName = `${Date.now()}-${file.name}`;
    const storageRef = ref(storage, "files/" + fileName);
    const uploadTaskSnapshot = await uploadBytesResumable(
      storageRef,
      file
    );
    const downloadUrl = await getDownloadURL(uploadTaskSnapshot.ref);
    return downloadUrl;
  } catch (error) {
    console.log("error uploading to storage", error);
  }
};
