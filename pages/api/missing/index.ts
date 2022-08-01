import {
  where,
  getDocs,
  query,
  collection,
} from "firebase/firestore";
import { firebaseAdmin } from "../../../src/config/firebaseAdmin";

export default async (req, res) => {
  const db = firebaseAdmin.firestore();
  try {
    if (req.method === "GET") {
      const data = [];
      db.collection("reported_missing")
        .where("found", "==", false)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            data.push(doc.data());
          });
        });
      /* const q = query(
        collection(db, "reported_missing"),
        where("found", "==", false)
      ); */

      //const querySnapshot = await getDocs(q);
      //const docs = querySnapshot.docs.map((doc) => doc.data());

      res.status(200).json(data);
    }
    res.status(200).end();
  } catch (e) {
    res.status(400).end();
  }
};
