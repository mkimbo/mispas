import { AuthUser, getUserFromCookies } from "next-firebase-auth";
import initAuth from "../../../utils/initAuth";
import { nanoid } from "nanoid";
import { NextApiRequest, NextApiResponse } from "next";
import { firebaseAdmin } from "../../../config/firebaseAdmin";
import { sendNotifications } from "../../../service/NotificationService";
const db = firebaseAdmin.firestore();
initAuth();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let user: AuthUser;
  try {
    user = await getUserFromCookies({ req });
    if (!user) return res.status(403).json({ error: "Not authorized" });
    if (req.method === "POST") {
      const docID = nanoid();
      const data = req.body;
      await db.collection("reported_missing").doc(docID).set(data);
      res.status(200).json({ id: docID });
      const center = [
        Number(data.lastSeenLocation.lat),
        Number(data.lastSeenLocation.lng),
      ];
      const notification = {
        title: data.fullname,
        body: "has just been reported missing in your area",
        icon: data.image,
        click_action: docID,
      };
      await sendNotifications({ center, notification });
    } else if (req.method === "PUT") {
      const docID = req.body.id as string;
      const data = req.body;
      await db
        .collection("reported_missing")
        .doc(docID)
        .set(data, { merge: true });
      res.status(200).json({ id: docID });
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    res.status(400).end();
  }
};

export default handler;
