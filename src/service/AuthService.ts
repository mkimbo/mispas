import { getApp, initializeApp, getApps } from "firebase/app";
import {
  signInWithPopup,
  getAuth,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  UserCredential,
  User,
} from "firebase/auth";
import { firebaseConfig } from "../config/firebase.config";
import axios from "axios";
interface IAuthService {
  auth: (firebaseApp) => Promise<UserCredential>;
}

class AuthService {
  protected auth: any;
  constructor(firebaseApp) {
    this.auth = getAuth(firebaseApp);
  }

  waitForUser(callback) {
    return onAuthStateChanged(this.auth, (userCred) => {
      callback(userCred);
    });
  }

  async loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider())
      .then((userCred: UserCredential) => {
        const saveUser = async (user: User) => {
          const response = await axios.post(
            "/api/create_user",
            userCred.user
          );
        };
        saveUser(userCred.user);
        return {
          user: userCred.user,
        };
      })
      .catch((error: Error) => {
        return {
          error: error.message,
        };
      });
  }
  async logout() {
    await signOut(this.auth);
  }
}

export default new AuthService(
  getApps().length ? getApp() : initializeApp(firebaseConfig)
);
