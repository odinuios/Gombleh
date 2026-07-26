importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js");

// Masukkan konfigurasi Firebase-mu di sini
firebase.initializeApp({
  apiKey: "AIzaSyCx4_E64FBUDyo4RzDDWMLklRlZMvMUlFM",
  authDomain: "gombleh-9dea6.firebaseapp.com",
  projectId: "gombleh-9dea6",
  storageBucket: "gombleh-9dea6.firebasestorage.app",
  messagingSenderId: "1034286098492",
  appId: "1:1034286098492:web:87c81098f5ad465e187b39"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Menerima pesan di background: ", payload);

  const data = payload.data || {};
  
  // Jika ini adalah event panggilan, gunakan pengaturan prioritas tertinggi (Native Web Push approach)
  if (data.type === 'call') {
    const notificationTitle = `Panggilan Masuk dari ${data.callerName}`;
    const notificationOptions = {
      body: data.callMode === 'video' ? 'Video Call Masuk...' : 'Panggilan Suara Masuk...',
      icon: '/icon.png', // Ganti dengan URL icon kamu
      vibrate: [200, 100, 200, 100, 200, 100, 200],
      requireInteraction: true, // Notifikasi tidak akan hilang sendiri
      actions: [
        { action: 'answer', title: 'Jawab' },
        { action: 'reject', title: 'Tolak' }
      ],
      data: {
        url: '/',
        callId: data.callId
      }
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
  }

  // Notifikasi pesan/invite biasa
  const notificationTitle = payload.notification?.title || "Pesan Baru";
  const notificationOptions = {
    body: payload.notification?.body || "Anda mendapat pesan baru.",
    icon: '/icon.png'
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Menangkap event klik dari aksi tombol pada notifikasi Push
self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  if (event.action === 'answer') {
    // Arahkan user ke halaman web/PWA untuk otomatis menjawab
    event.waitUntil(clients.openWindow('/?action=answer&callId=' + event.notification.data.callId));
  } else if (event.action === 'reject') {
    // (Opsional) Lakukan request ke backend / Firebase Function untuk mengupdate status di firestore
    console.log('Panggilan ditolak.');
  } else {
    // Klik area badan notifikasi biasa
    event.waitUntil(clients.openWindow(event.notification.data.url || '/'));
  }
});
