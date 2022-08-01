import { doc, getDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { firebaseAdmin } from "../../src/config/firebaseAdmin";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const db = firebaseAdmin.firestore();
  try {
    if (req.method === "POST") {
      const data = req?.body;
      const docID = req?.body?.uid;
      console.log(docID, "req.body");
      await db
        .collection("visitors")
        .doc(docID)
        .set(JSON.parse(JSON.stringify(data)));
      //await setDoc(doc(db, "reported_missing", docID), req.body);
      //res.status(200).json({ id: docID });
      res.status(200);
    } else if (req.method === "PUT") {
      const docID = req.body.uid;
      const data = req.body;
      //await setDoc(doc(db, "reported_missing", docID), req.body);
      await db
        .collection("users")
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
