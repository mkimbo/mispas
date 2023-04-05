import React from "react";
import { Button } from "@mui/material";
import { useTranslation } from "../i18n";
import SubscribeIcon from "@mui/icons-material/FmdBad";
import axios from "axios";
//import useAuth from "../hook/auth";
import { getMessaging, getToken } from "firebase/messaging";
import localforage from "localforage";
import { useAuthUser } from "next-firebase-auth";
import { messaging } from "../utils/firebase";

type Props = {};

export default function AllowNotifications({}: Props) {
  const t = useTranslation();
  const authUser = useAuthUser();

  const handleSaveToken = async () => {
    if (authUser.email) {
      try {
        const status = await Notification.requestPermission();
        if (!status || status !== "granted") return;
        const fcm_token = await getToken(messaging);
        if (fcm_token) {
          console.log("FCM token: ", fcm_token);
          //setting FCM token in indexed db using localforage
          localforage.setItem("fcm_token", fcm_token);
          //Todo
          //set enabled to true in user object
          //setUser({ ...user, enabledNotifications: true });
        } else {
          return console.log("FCM token not found");
        }
        axios
          .put(`/api/create_user`, {
            notificationToken: fcm_token,
            uid: authUser.id,
            enabledNotifications: true,
          })
          .then(() => {
            console.log("Token saved");
          })
          .catch((err) => {
            console.log(err, "Error saving fcm token");
          });
      } catch (error) {
        console.log(error, "Error in Allowing Notifications");
      }
    } else {
      console.log("Please login to enable notifications");
    }
  };

  return (
    <Button
      onClick={handleSaveToken}
      variant="outlined"
      size="large"
      startIcon={<SubscribeIcon fontSize="small" />}
    >
      {t("Allow Notifications")}
    </Button>
  );
}
