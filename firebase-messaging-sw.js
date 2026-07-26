// file: firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyCx4_E64FBUDyo4RzDDWMLklRlZMvMUlFM",
    authDomain: "gombleh-9dea6.firebaseapp.com",
    projectId: "gombleh-9dea6",
    storageBucket: "gombleh-9dea6.firebasestorage.app",
    messagingSenderId: "1034286098492",
    appId: "1:1034286098492:web:87c81098f5ad465e187b39"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Menangani pesan saat berjalan di background
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Menerima pesan background ', payload);
  const notificationTitle = payload.notification.title || 'Pesan Baru Gibah';
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'https://raw.githubusercontent.com/odinuios/Gombleh/refs/heads/main/icon.png'
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
