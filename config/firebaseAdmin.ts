import * as firebaseAdmin from "firebase-admin";
//import { TUserDevice } from "../../pages/api/report/missing";

// get this JSON from the Firebase board
// you can also store the values in environment variables
import serviceAccount from "./AdminSA.json";
import { TUserDevice } from "../utils/models";

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(
      serviceAccount as firebaseAdmin.ServiceAccount
    ),
  });
}
const geofire = require("geofire-common");
const db = firebaseAdmin.firestore();

const getUsersWithinRadiusOfCase = async (
  radiusInM: number,
  caseLocation: number[]
) => {
  const bounds = geofire.geohashQueryBounds(caseLocation, radiusInM);
  const promises = [];
  for (const b of bounds) {
    const q = db
      .collection("users")
      .orderBy("_geoloc.geohash")
      .startAt(b[0])
      .endAt(b[1]);

    promises.push(q.get());
  }
  //console.log(promises, "query promises");
  return Promise.all(promises).then((snapshots) => {
    const matchingDocs = [];

    for (const snap of snapshots) {
      for (const doc of snap.docs) {
        const lat = doc.get("_geoloc.lat");
        const lng = doc.get("_geoloc.lng");
        // filter out a few false positives due to GeoHash accuracy
        const distanceInKm = geofire.distanceBetween([lat, lng], caseLocation);
        const distanceInM = distanceInKm * 1000;
        if (distanceInM <= radiusInM) {
          matchingDocs.push(doc);
        }
      }
    }

    return matchingDocs;
  });
};

const sendAlertToUserDevices = async (
  userDevices: TUserDevice[],
  payload: any
) => {
  const tokensToRemove: Promise<any>[] = [];
  let successCount = 0;
  let failureCount = 0;
  for (const device of userDevices) {
    const response = await firebaseAdmin
      .messaging()
      .sendToDevice(device.token, payload);
    console.log(response, "response");
    successCount += response.successCount;
    failureCount += response.failureCount;
    const errormsg = response.results[0].error
      ? response.results[0].error.message
      : null;
    const errorcode = response.results[0].error
      ? response.results[0].error.code
      : null;
    // For each message check if there was an error.
    if (errorcode) {
      console.error(
        "Failure sending notification to",
        device.userId,
        errorcode,
        errormsg
      );
      // Cleanup the tokens who are not registered anymore.
      if (
        errorcode === "messaging/invalid-registration-token" ||
        errorcode === "messaging/registration-token-not-registered"
      ) {
        tokensToRemove.push(
          db.collection("users").doc(device.userId).update({
            notificationToken: null,
            enabledNotifications: false,
          })
        );
      }
    }
  }
  // Remove devices which are not registered anymore.
  await Promise.all(tokensToRemove);
  return { successCount, failureCount };
};

export { firebaseAdmin, getUsersWithinRadiusOfCase, sendAlertToUserDevices };
