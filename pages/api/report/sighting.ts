import {
  firebaseAdmin,
  sendAlertToUserDevices,
} from "../../../src/config/firebaseAdmin";
import { NextApiRequest, NextApiResponse } from "next";
const db = firebaseAdmin.firestore();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "PUT") {
      const missingPersonID = req.body.personId as string;
      const data = req.body;
      const docRef = db
        .collection("reported_missing")
        .doc(missingPersonID);
      const doc = await docRef.get();
      const caseOwnerId = doc.data().reporterId;
      await docRef.update({
        sightings:
          firebaseAdmin.firestore.FieldValue.arrayUnion(data),
      });
      res.status(200).json({ id: missingPersonID });
      const caseOwner = await db
        .collection("users")
        .doc(caseOwnerId)
        .get();
      const payload = {
        notification: {
          title: "Sighting Alert",
          body: `A person you reported missing has been sighted at ${data?.sightingLocation}`,
          //icon: data.image,
          click_action: missingPersonID,
        },
      };
      const tokenData = [
        {
          token: caseOwner.data().notificationToken,
          userId: caseOwnerId,
        },
      ];
      await sendAlertToUserDevices(tokenData, payload);
    }
    res.status(200).end();
  } catch (e) {
    console.log(e, "error");

    res.status(400).end();
  }
};
