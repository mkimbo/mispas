import { firebaseAdmin } from "../../../src/config/firebaseAdmin";
import { nanoid } from "nanoid";
import { NextApiRequest, NextApiResponse } from "next";
import { sendNotifications } from "../../../src/service/NotificationService";
const db = firebaseAdmin.firestore();
type TNotification = {
  title: string;
  body: string;
  icon: string;
  click_action: string;
};
export type TNotificationInput = {
  center: number[];
  radius?: number;
  notification: TNotification;
};
export type TUserDevice = {
  token: string;
  userId: string;
};
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
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
    res.status(200).end();
  } catch (e) {
    console.log(e, "error");

    res.status(400).end();
  }
};
