//import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { firebaseAdmin } from "../../../src/config/firebaseAdmin";
import { nanoid } from "nanoid";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const db = firebaseAdmin.firestore();
  try {
    if (req.method === "POST") {
      const docID = nanoid();
      const data = req.body;
      // write to firebase db
      await db.collection("reported_missing").doc(docID).set(data);
      //await setDoc(doc(db, "reported_missing", docID), req.body);
      res.status(200).json({ id: docID });
    } else if (req.method === "PUT") {
      const docID = req.body.id as string;
      const data = req.body;
      //await setDoc(doc(db, "reported_missing", docID), req.body);
      await db
        .collection("reported_missing")
        .doc(docID)
        .set(data, { merge: true });
      res.status(200).json({ id: docID });
    }
    res.status(200).end();
  } catch (e) {
    console.log(e, "error");

    res.status(400).end();
  }
};
