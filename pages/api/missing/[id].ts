import { doc, getDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { firebaseAdmin } from "../../../src/config/firebaseAdmin";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const docID = req.body.id as string;
  const db = firebaseAdmin.firestore();
  try {
    if (req.method === "GET") {
      const missingDoc = db.collection("reported_missing").doc(docID);
      //const missingDoc = doc(db, `reported_missing/${id}`);
      if (!missingDoc) {
        res.status(404).end();
      } else {
        const snapShot = await missingDoc.get();
        /* const snapShot = await getDoc(missingDoc);
        const data = snapShot.data(); */
        res.status(200).json(snapShot.data());
      }
    }
    res.status(200).end();
  } catch (e) {
    res.status(400).end();
  }
};
