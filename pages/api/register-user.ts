import { AuthUser, getUserFromCookies } from "next-firebase-auth";
import initAuth from "../../utils/initAuth";
import { NextApiRequest, NextApiResponse } from "next";
import { firebaseAdmin } from "../../config/firebaseAdmin";
import { google } from "googleapis";
const db = firebaseAdmin.firestore();
const auth = firebaseAdmin.auth();
initAuth();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let user: AuthUser;
  try {
    user = await getUserFromCookies({ req });
    if (!user) return res.status(403).json({ error: "Not authorized" });
    const data = req?.body;
    const docID = req?.body?.id;
    console.log(data, "req.body");
    await db
      .collection("users")
      .doc(docID)
      .set(JSON.parse(JSON.stringify(data)), { merge: true });

    return res.status(200).json({ success: true });
    // save sessionInfo into db. You will need this to verify the SMS code
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
};

export default handler;
