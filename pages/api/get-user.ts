import { AuthUser, getUserFromCookies } from "next-firebase-auth";
import initAuth from "../../utils/initAuth";
import { NextApiRequest, NextApiResponse } from "next";
import { firebaseAdmin } from "../../config/firebaseAdmin";
const db = firebaseAdmin.firestore();
initAuth();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let user: AuthUser;
  try {
    user = await getUserFromCookies({ req });
    if (!user) return res.status(403).json({ error: "Not authorized" });
    const userID = user.id;
    console.log(user, "dataaaIDDDDDD");
    const docRef = db.collection("users").doc(userID);
    const doc = await docRef.get();
    const data = doc.data();
    console.log(data, "dataaa");
    return res.status(200).json(data);
    // save sessionInfo into db. You will need this to verify the SMS code
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
};

export default handler;
