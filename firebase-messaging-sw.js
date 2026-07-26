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

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Menerima pesan background ', payload);
    
    // Konfigurasi Default
    let notificationTitle = payload.data?.title || 'Pesan Baru Gibah';
    let notificationOptions = {
        body: payload.data?.body || 'Anda mendapat pemberitahuan baru.',
        icon: 'https://raw.githubusercontent.com/odinuios/Gombleh/refs/heads/main/icon.png',
        vibrate: [200, 100, 200], // Getar standar
        requireInteraction: false // Notifikasi bisa hilang sendiri
    };

    // Jika ini adalah panggilan telepon (Call)
    if (payload.data?.type === 'call') {
        notificationTitle = `📞 Panggilan dari ${payload.data.callerName}`;
        notificationOptions.body = 'Ketuk untuk menjawab panggilan...';
        notificationOptions.vibrate = [500, 1000, 500, 1000, 500, 1000]; // Getar panjang berulang
        notificationOptions.requireInteraction = true; // Notifikasi tidak hilang sampai diklik
        notificationOptions.tag = 'incoming_call'; // Agar notifikasi panggilan tidak menumpuk
    }

    self.registration.showNotification(notificationTitle, notificationOptions);
});

// Event ketika notifikasi di-klik di background
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
            if (clientList.length > 0) {
                let client = clientList[0];
                for (let i = 0; i < clientList.length; i++) {
                    if (clientList[i].focused) client = clientList[i];
                }
                return client.focus();
            }
            return clients.openWindow('/'); // Sesuaikan dengan URL root aplikasi Anda
        })
    );
});
