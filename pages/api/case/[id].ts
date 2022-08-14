import { doc, getDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { firebaseAdmin } from "../../../src/config/firebaseAdmin";

const db = firebaseAdmin.firestore();
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const docID = req.query.id as string;
  try {
    if (req.method === "GET") {
      const missingDoc = await db
        .collection("reported_missing")
        .doc(docID)
        .get();
      if (!missingDoc) {
        res.status(404).end();
      } else {
        res.status(200).json({
          id: missingDoc.id,
          ...missingDoc.data(),
        });
      }
    }
    res.status(200).end();
  } catch (e) {
    res.status(400).end();
  }
};
