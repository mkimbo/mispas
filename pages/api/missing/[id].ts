import { AuthUser, getUserFromCookies } from "next-firebase-auth";
import initAuth from "../../../utils/initAuth";
import { NextApiRequest, NextApiResponse } from "next";
import { firebaseAdmin } from "../../../config/firebaseAdmin";
const db = firebaseAdmin.firestore();
initAuth();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let user: AuthUser;
  try {
    user = await getUserFromCookies({ req });
    if (!user) return res.status(403).json({ error: "Not authorized" });
    const docID = req.query.id as string;
    const missingDoc = db.collection("reported_missing").doc(docID);
    if (!missingDoc) {
      res.status(404).json({ error: "Not Found" });
    } else {
      const snapShot = await missingDoc.get();
      const data = snapShot.data();

      res.status(200).json({ id: snapShot.id, ...data });
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    res.status(400).end();
  }
};

export default handler;
