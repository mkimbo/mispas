import { AuthUser, getUserFromCookies } from "next-firebase-auth";
import initAuth from "../../utils/initAuth";
import { NextApiRequest, NextApiResponse } from "next";
import { firebaseAdmin } from "../../config/firebaseAdmin";
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = require("twilio")(accountSid, authToken);
const db = firebaseAdmin.firestore();
const auth = firebaseAdmin.auth();
initAuth();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let user: AuthUser;
  try {
    user = await getUserFromCookies({ req });
    if (!user) return res.status(403).json({ error: "Not authorized" });
    const { phoneNumber, otp } = req.body;

    const response = await twilioClient.verify.v2
      .services("VA7d5b858fb0469e1515d03c762977a9b0")
      .verificationChecks.create({ to: phoneNumber, code: otp });
    console.log(response.status, "verification status");
    if (response.status === "approved") {
      let data;
      data = {
        phoneNumber: {
          number: phoneNumber,
          verified: true,
        },
      };
      const docID = user.id;
      await db
        .collection("users")
        .doc(docID)
        .set(JSON.parse(JSON.stringify(data)), { merge: true });
      return res.status(200).json({ success: true });
    }

    return res.status(200).json({ success: true });
  } catch (e) {
    console.error(e);
  }
};

export default handler;
