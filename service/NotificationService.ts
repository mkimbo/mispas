import {
  getUsersWithinRadiusOfCase,
  sendAlertToUserDevices,
} from "../config/firebaseAdmin";
import { TNotificationInput } from "../utils/models";

export const sendNotifications = async ({
  center,
  radius,
  notification,
}: TNotificationInput) => {
  const radiusInM = radius ? radius * 1000 : 50 * 1000;
  const nearbyUsers = await getUsersWithinRadiusOfCase(radiusInM, center);
  if (!nearbyUsers.length) {
    return console.log(
      "Sorry, no users nearby! You can also share posters on social media!"
    );
  }
  const tokenData = nearbyUsers.map((user) => {
    return {
      token: user.data().notificationToken,
      userId: user.data().uid,
    };
  });

  const payload = {
    notification: {
      ...notification,
      click_action: `https://google.com/`, //use notification.click_action for the url
    },
  };
  console.log(tokenData, "tokenData", payload, "payload");
  const { successCount, failureCount } = await sendAlertToUserDevices(
    tokenData,
    payload
  );
  console.log(successCount, "successCount", failureCount, "tokensToRemove");
};
