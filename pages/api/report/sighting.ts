import { AuthUser, getUserFromCookies } from "next-firebase-auth";
import initAuth from "../../../utils/initAuth";
import { NextApiRequest, NextApiResponse } from "next";
import {
  firebaseAdmin,
  sendAlertToUserDevices,
} from "../../../config/firebaseAdmin";
const db = firebaseAdmin.firestore();
initAuth();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let user: AuthUser;
  try {
    user = await getUserFromCookies({ req });
    if (!user) return res.status(403).json({ error: "Not authorized" });
    if (req.method === "PUT") {
      const missingPersonID = req.body.personId as string;
      const data = req.body;
      const docRef = db.collection("reported_missing").doc(missingPersonID);
      const doc = await docRef.get();
      const caseOwnerId = doc.data().reporterId;
      await docRef.update({
        sightings: firebaseAdmin.firestore.FieldValue.arrayUnion(data),
      });
      res.status(200).json({ id: missingPersonID });
      const caseOwner = await db.collection("users").doc(caseOwnerId).get();
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
    // eslint-disable-next-line no-console
    console.error(e);
    res.status(400).end();
  }
};

export default handler;
