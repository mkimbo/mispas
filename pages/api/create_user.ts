import { doc, getDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { firebaseAdmin } from "../../src/config/firebaseAdmin";
const geofire = require("geofire-common");
const db = firebaseAdmin.firestore();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      const data = req?.body;
      const docID = req?.body?.uid;
      console.log(docID, "req.body");
      await db
        .collection("users")
        .doc(docID)
        .set(JSON.parse(JSON.stringify(data)), { merge: true });
      const user = await db.collection("users").doc(docID).get();
      //await setDoc(doc(db, "reported_missing", docID), req.body);
      res.status(200).json({
        uid: docID,
        email: user.data().email,
        emailVerified: user.data().emailVerified,
        photoURL: user.data().photoURL,
        displayName: user.data().displayName,
        enabledLocation: user.data().enabledLocation,
        enabledNotifications: user.data().enabledNotifications,
      });
    } else if (req.method === "PUT") {
      const docID = req.body.uid;
      const data = req.body;
      //await setDoc(doc(db, "reported_missing", docID), req.body);
      await db
        .collection("users")
        .doc(docID)
        .set(data, { merge: true });
      const user = await db.collection("users").doc(docID).get();
      res.status(200).json({
        uid: docID,
        email: user.data().email,
        emailVerified: user.data().emailVerified,
        photoURL: user.data().photoURL,
        displayName: user.data().displayName,
        enabledLocation: user.data().enabledLocation,
        enabledNotifications: user.data().enabledNotifications,
      });
    }
    res.status(200).end();
  } catch (e) {
    console.log(e, "error");

    res.status(400).end();
  }
};
