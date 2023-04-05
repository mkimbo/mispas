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
    const data = [];
    const docs = await db
      .collection("reported_missing")
      .where("found", "==", false)
      .get();
    docs.forEach((doc) => {
      const dataObj = doc.data();
      data.push({
        id: doc.id,
        ...dataObj,
      });
    });
    res.status(200).json(data);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    res.status(400).end();
  }
};

export default handler;
