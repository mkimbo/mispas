importScripts(
  "https://www.gstatic.com/firebasejs/7.9.1/firebase-app.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/7.9.1/firebase-messaging.js"
);
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyCwydsAsfbSZHkCtPMNwhwxwR3Yb0k1MDk",
    authDomain: "mispas-8a699.firebaseapp.com",
    projectId: "mispas-8a699",
    storageBucket: "mispas-8a699.appspot.com",
    messagingSenderId: "74485160895",
    appId: "1:74485160895:web:8f6ab6de357efe0f7d9f0a",
    measurementId: "G-3LYJD197LR",
  });
}
firebase.messaging();

//background notifications will be received here
firebase.messaging().setBackgroundMessageHandler(async (message) => {
  if (Notification.permission === "granted") {
    if (navigator.serviceWorker)
      navigator.serviceWorker
        .getRegistration()
        .then(async function (reg) {
          if (reg)
            await reg.showNotification(message.notification.title, {
              body: message.notification.body,
              icon: "/icons/launcher-icon-4x.png",
            });
        });
  }
});

/* firebase.messaging().onBackgroundMessage(async (message) => {
  if (Notification.permission === "granted") {
    if (navigator.serviceWorker)
      navigator.serviceWorker
        .getRegistration()
        .then(async function (reg) {
          if (reg)
            await reg.showNotification(message.notification.title, {
              body: message.notification.body,
              icon: "/icons/launcher-icon-4x.png",
            });
        });
  }
}); */
