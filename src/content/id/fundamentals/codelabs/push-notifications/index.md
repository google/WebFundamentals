project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Dalam codelab ini, Anda akan mempelajari cara menambahkan pemberitahuan push ke aplikasi web.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-01-01 #}


# Menambahkan Pemberitahuan Push ke Aplikasi Web {: .page-title }

{% include "web/_shared/contributors/mattgaunt.html" %}



## Ringkasan




Perpesanan push menyediakan cara yang sederhana dan efektif untuk terhubung-kembali dengan pengguna dan di code lab ini Anda akan mempelajari cara menambahkan pemberitahuan push ke aplikasi web.

### Apa yang akan Anda pelajari

* Cara berlangganan dan berhenti berlangganan perpesanan push untuk pengguna
* Cara menangani pesan push masuk
* Cara menampilkan notifikasi
* Cara merespons klik notifikasi

### Apa yang Anda butuhkan

* Chrome 52 atau di atasnya
*  [Web Server for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb), atau server web pilihan Anda
* Editor teks
* Pengetahuan dasar tentang HTML, CSS, JavaScript, dan Chrome DevTools
* Kode contoh, lihat Persiapan


## Persiapan




### Unduh kode contoh

Anda bisa mendapatkan kode contoh untuk kode ini dengan mengunduh file zip di sini:

[Tautan](https://github.com/googlechrome/push-notifications/archive/master.zip)

atau dengan mengkloning git repo ini:

    git clone https://github.com/GoogleChrome/push-notifications.git

Jika Anda mengunduh sumber sebagai zip, mengekstraknya akan memberikan Anda folder root `push-notifications-master`.

### Memasang dan memverifikasi server web

Meskipun Anda bebas menggunakan server web sendiri, codelab ini dirancang untuk bekerja dengan baik bersama Server Web Chrome. Jika Anda belum memasang aplikasi tersebut, Anda bisa memasangnya dari Toko Web Chrome.

[Tautan](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)

Setelah memasang aplikasi Web Server for Chrome, klik pada pintasan Apps di bilah bookmark: 

![a80b29d5e878df22.png](img/a80b29d5e878df22.png)

Pada jendela berikutnya, klik ikon Web Server: 

![dc07bbc9fcfe7c5b.png](img/dc07bbc9fcfe7c5b.png)

Berikutnya, Anda akan melihat dialog ini, yang memungkinkan Anda mengonfigurasi server web lokal:

![433870360ad308d4.png](img/433870360ad308d4.png)

Klik tombol __choose folder__, dan pilih folder aplikasi. Ini memungkinkan Anda untuk menyajikan pekerjaan yang sedang berlangsung melalui URL yang disorot dalam dialog server web (di bagian __Web Server URL(s)__).

Di bawah Options, centang kotak di sebelah "Automatically show index.html", seperti yang ditampilkan di bawah ini:

![39b4e0371e9703e6.png](img/39b4e0371e9703e6.png)

Kemudian berhenti dan restart server dengan menggeser toggle yang berlabel "Web Server: STARTED" ke kiri dan kemudian kembali ke kanan.

![daefd30e8a290df5.png](img/daefd30e8a290df5.png)

Sekarang kunjungi situs dalam browser web Anda (dengan mengeklik Web Server URL yang disorot) dan Anda akan melihat laman yang terlihat seperti ini:

![4525ec369fc2ae47.png](img/4525ec369fc2ae47.png)

### Selalu memperbarui service worker

Selama development, ada baiknya memastikan service worker Anda selalu up to date dan memiliki perubahan terbaru.

Untuk menyetel ini di Chrome, buka DevTools (Klik kanan> Inspect) dan masuk ke panel __Application__, klik tab __Service Workers__ kemudian klik kotak centang __Update on Reload__. Ketika kotak centang ini diaktifkan, service worker dengan paksa diperbarui setiap kali laman dimuat ulang.

![6b698d7c7bbf1bc0.png](img/6b698d7c7bbf1bc0.png)


## Mendaftarkan Service Worker




Dalam direktori `app`, perhatikan bahwa Anda memiliki file kosong bernama `sw.js`. File ini akan menjadi service worker Anda, saat ini file itu kosong dan nanti kita akan menambahkan kode ke situ.

Pertama kita harus mendaftarkan file ini sebagai Service Worker.

Laman `app/index.html` memuat `scripts/main.js` dan itu terdapat dalam file JavaScript yang akan kita daftarkan service worker-nya.

Tambahkan kode berikut ke `scripts/main.js`:

```
if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log('Service Worker and Push is supported');

  navigator.serviceWorker.register('sw.js')
  .then(function(swReg) {
    console.log('Service Worker is registered', swReg);

    swRegistration = swReg;
  })
  .catch(function(error) {
    console.error('Service Worker Error', error);
  });
} else {
  console.warn('Push messaging is not supported');
  pushButton.textContent = 'Push Not Supported';
}
```

Kode ini memeriksa bila service worker dan perpesanan push didukung oleh browser saat ini dan jika memang didukung, itu mendaftarkan file `sw.js` kita.

#### Cobalah

Memeriksa perubahan dengan membuka URL __127.0.0.1:8887__ dalam browser.

Buka Chrome DevTools untuk memeriksa konsol bagi `Service Worker is registered`, seperti:

![de3ceca91043d278.png](img/de3ceca91043d278.png)

### Mendapatkan Kunci Server Aplikasi

Untuk bekerja dengan code lab ini Anda harus membuat beberapa kunci server aplikasi yang bisa kita lakukan dengan situs pendamping ini:  [https://web-push-codelab.appspot.com/](https://web-push-codelab.appspot.com/)

Di sini Anda bisa membuat pasangan kunci Publik dan Privat.

![a1304b99e7b981dd.png](img/a1304b99e7b981dd.png)

Menyalin kunci publik Anda ke `scripts/main.js` menggantikan nilai `<Your Public Key>`:

```
const applicationServerPublicKey = '<Your Public Key>';
```

Note: Anda sebaiknya tidak menaruh kunci privat di aplikasi web!


## Menginisialisasi Status




Pada saat ini tombol aplikasi web dinonaktifkan dan tidak bisa diklik. Hal ini karena akan lebih baik menonaktifkan tombol push secara default dan mengaktifkannya setelah Anda mengetahui bahwa push didukung dan bisa tahu apakah pengguna sedang berlangganan atau tidak.

Mari kita membuat dua fungsi dalam `scripts/main.js`, satu yang disebut `initialiseUI`, yang akan memeriksa apakah pengguna sedang berlangganan, dan satu lagi yang disebut `updateBtn` yang akan mengaktifkan tombol dan mengubah teks bila pengguna berlangganan maupun tidak.

Kita menginginkan fungsi `initialiseUI` terlihat seperti ini:

```
function initialiseUI() {
  // Set the initial subscription value
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    isSubscribed = !(subscription === null);

    if (isSubscribed) {
      console.log('User IS subscribed.');
    } else {
      console.log('User is NOT subscribed.');
    }

    updateBtn();
  });
}
```

Metode baru kami menggunakan `swRegistration` dari langkah sebelumnya dan memanggil `getSubscription()` pada `pushManager`. `getSubscription()` adalah metode yang mengembalikan promise yang diselesaikan dengan langganan aktif, jika ada, jika tidak maka akan mengembalikan `null`. Dengan ini kita bisa memeriksa apakah pengguna telah berlangganan atau tidak, menyetel beberapa status dan kemudian memanggil `updateBtn()` sehingga tombol dapat diaktifkan dengan beberapa teks yang membantu.

Tambahkan kode berikut untuk mengimplementasikan fungsi `updateBtn()`.

```
function updateBtn() {
  if (isSubscribed) {
    pushButton.textContent = 'Disable Push Messaging';
  } else {
    pushButton.textContent = 'Enable Push Messaging';
  }

  pushButton.disabled = false;
}
```

Fungsi ini hanya mengubah teks bergantung pada apakah pengguna berlangganan atau tidak dan kemudian mengaktifkan tombol.

Hal terakhir yang harus dilakukan adalah memanggil `initialiseUI()` ketika service worker sudah terdaftar.

```
navigator.serviceWorker.register('sw.js')
.then(function(swReg) {
  console.log('Service Worker is registered', swReg);

  swRegistration = swReg;
  initialiseUI();
})
```

#### Cobalah

Buka aplikasi web dan Anda akan melihat tombol ‘Enable Push Messaging' sekarang diaktifkan (Anda bisa mengeklik-nya) dan Anda akan melihat ‘User is NOT subscribed.' di konsol.

![15f6375617c11974.png](img/15f6375617c11974.png)

Ketika kita melangkah maju melalui code lab selanjutnya, Anda akan melihat perubahan teks tombol ketika pengguna berlangganan / berhenti-berlangganan.


## Buatlah pengguna berlangganan




Pada saat ini tombol ‘Enable Push Messaging' tidak berbuat terlalu banyak, jadi mari kita memperbaikinya.

Menambahkan listener klik ke tombol dalam fungsi `initialiseUI()`, seperti:

```
function initialiseUI() {
  pushButton.addEventListener('click', function() {
    pushButton.disabled = true;
    if (isSubscribed) {
      // TODO: Unsubscribe user
    } else {
      subscribeUser();
    }
  });

  // Set the initial subscription value
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    isSubscribed = !(subscription === null);

    updateSubscriptionOnServer(subscription);

    if (isSubscribed) {
      console.log('User IS subscribed.');
    } else {
      console.log('User is NOT subscribed.');
    }

    updateBtn();
  });
}
```

Ketika pengguna mengeklik tombol push, pertama kita menonaktifkan tombol hanya untuk memastikan pengguna tidak dapat mengeklik untuk kedua kalinya sementara kita berlangganan push karena itu membutuhkan beberapa saat.

Kemudian kita memanggil `subscribeUser()` ketika kita mengetahui bahwa pengguna saat ini tidak berlangganan, jadi salin dan tempelkan kode berikut ke `scripts/main.js`.

```
function subscribeUser() {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  })
  .then(function(subscription) {
    console.log('User is subscribed:', subscription);

    updateSubscriptionOnServer(subscription);

    isSubscribed = true;

    updateBtn();
  })
  .catch(function(err) {
    console.log('Failed to subscribe the user: ', err);
    updateBtn();
  });
}
```

Mari kita masuk lebih dalam untuk mengetahui apa yang dilakukan kode ini dan caranya membuat pengguna berlangganan perpesanan push.

Pertama kita mengambil kunci publik server aplikasi, yang merupakan basis 64 URL aman di-enkode, dan kami mengubahnya menjadi `UInt8Array` karena ini adalah masukan yang diharapkan dari panggilan berlangganan. Kami sudah memberikan Anda fungsi `urlB64ToUint8Array` di atas `scripts/main.js`.

Setelah mengkonversi nilai, kita memanggil metode `subscribe()` pada service worker `pushManager`, meneruskan kunci publik server aplikasi dan nilai `userVisibleOnly: true`.

```
const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
swRegistration.pushManager.subscribe({
  userVisibleOnly: true,
  applicationServerKey: applicationServerKey
})
```

Parameter `userVisibleOnly` pada dasarnya adalah sebuah pengakuan bahwa Anda akan menampilkan notifikasi setiap kali pesan push dikirim. Pada saat penulisan, nilai ini diperlukan dan harus true.

Memanggil `subscribe()` mengembalikan promise yang akan diselesaikan setelah langkah-langkah berikut:

1. Pengguna telah diberikan izin untuk menampilkan notifikasi.
2. Browser telah mengirimkan permintaan jaringan ke layanan push agar mendapatkan rincian untuk menghasilkan PushSubscription.

Promise `subscribe()` akan diselesaikan dengan `PushSubscription` jika langkah-langkah ini berhasil. Jika pengguna tidak memberikan izin atau jika ada masalah dalam langganan pengguna, promise akan menolak dengan kesalahan. Ini memberi kita rangkaian promise berikut di codelab:

```
swRegistration.pushManager.subscribe({
  userVisibleOnly: true,
  applicationServerKey: applicationServerKey
})
.then(function(subscription) {
  console.log('User is subscribed:', subscription);

  updateSubscriptionOnServer(subscription);

  isSubscribed = true;

  updateBtn();

})
.catch(function(err) {
  console.log('Failed to subscribe the user: ', err);
  updateBtn();
});
```

Dengan ini, kita mendapatkan langganan dan memperlakukan pengguna sebagai berlangganan atau kita menangkap kesalahan dan mencetaknya ke konsol. Dalam kedua skenario kita memanggil `updateBtn()` untuk memastikan tombol diaktifkan-kembali dan memiliki teks yang tepat.

Metode `updateSubscriptionOnServer` adalah metode yang dalam aplikasi sesungguhnya kita mengirim langganan ke backend, namun untuk codelab ini, kita akan mencetak langganan di UI kita yang akan memudahkan kita di kemudian hari. Tambahkan metode ini ke `scripts/main.js`:

```
function updateSubscriptionOnServer(subscription) {
  // TODO: Send subscription to application server

  const subscriptionJson = document.querySelector('.js-subscription-json');
  const subscriptionDetails =
    document.querySelector('.js-subscription-details');

  if (subscription) {
    subscriptionJson.textContent = JSON.stringify(subscription);
    subscriptionDetails.classList.remove('is-invisible');
  } else {
    subscriptionDetails.classList.add('is-invisible');
  }
}
```

#### Cobalah

Bila Anda kembali ke aplikasi web dan coba mengeklik tombol, Anda akan melihat konfirmasi izin seperti ini:

![227cea0abe03a5b4.png](img/227cea0abe03a5b4.png)

Jika Anda memberikan izin, Anda akan melihat konsol mencetak `User is subscribed:` dengan `PushSubscription`, teks tombol akan berubah menjadi ‘Disable Push Messaging' dan Anda bisa melihat langganan sebagai JSON di bagian bawah halaman.

![8fe2b1b110f87b34.png](img/8fe2b1b110f87b34.png)


## Menangani Izin Ditolak




Satu hal yang belum kita tangani adalah apa yang terjadi bila pengguna memblokir permintaan izin. Hal ini memerlukan beberapa pertimbangan khusus karena bila pengguna memblokir izin, aplikasi web kita tidak bisa menampilkan kembali konfirmasi izin dan tidak dapat membuat pengguna berlangganan, jadi kita setidaknya perlu menonaktifkan tombol push sehingga pengguna tahu bahwa itu tidak bisa digunakan.

Tempat yang tepat bagi kita untuk menangani skenario ini adalah dalam fungsi `updateBtn()`. Yang perlu kita lakukan hanyalah memeriksa nilai `Notification.permission`, seperti:

```
function updateBtn() {
  if (Notification.permission === 'denied') {
    pushButton.textContent = 'Push Messaging Blocked.';
    pushButton.disabled = true;
    updateSubscriptionOnServer(null);
    return;
  }

  if (isSubscribed) {
    pushButton.textContent = 'Disable Push Messaging';
  } else {
    pushButton.textContent = 'Enable Push Messaging';
  }

  pushButton.disabled = false;
}
```

Kita tahu bahwa jika izin tersebut `denied`, maka pengguna tidak bisa berlangganan dan tidak ada lagi yang bisa kita lakukan, jadi menonaktifkan tombol untuk hal yang baik adalah pendekatan terbaik.

#### Cobalah

Karena kita sudah memberikan izin untuk aplikasi web dari langkah sebelumnya, kita harus mengeklik __i__ dalam lingkaran di bilah URL dan mengubah izin notifikasi ke *Use global default (Ask)* .

![8775071d7fd66432.png](img/8775071d7fd66432.png)

Setelah Anda mengubah setelan ini, segarkan laman dan klik tombol *Enable Push Messaging* dan kali ini pilih *Block* pada dialog izin. Teks tombol sekarang akan bertuliskan *Push Messaging Blocked* dan dinonaktifkan.

![2b5314607196f4e1.png](img/2b5314607196f4e1.png)

Dengan perubahan ini, sekarang kita bisa membuat pengguna berlangganan dan kita mengatasi skenario izin yang mungkin.


## Menangani Kejadian Push




Sebelum kita membahas cara mengirim pesan push dari backend Anda, kita perlu mempertimbangkan apa yang sebenarnya akan terjadi ketika pengguna berlangganan menerima pesan push.

Saat kita memicu pesan push, browser menerima pesan push, menetapkan service worker yang diperlukan push sebelum mengaktifkan service worker dan mengirimkan kejadian push. Kita harus mendengarkan kejadian ini dan menunjukkan notifikasi sebagai hasilnya.

Tambahkan kode berikut ke file `sw.js` Anda:

```
self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = 'Push Codelab';
  const options = {
    body: 'Yay it works.',
    icon: 'images/icon.png',
    badge: 'images/badge.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
```

Mari melangkah melalui kode ini. Kita mendengarkan kejadian push di service worker dengan menambahkan event listener ke service worker, yaitu potongan kode ini:

```
self.addEventListener('push', ...... );
```

Kecuali Anda pernah memakai Web Workers sebelumnya, `self` mungkin adalah hal baru. `self` adalah referensi service worker itu sendiri, jadi kita menambahkan event listener ke service worker kita.

Ketika pesan push diterima, event listener akan diaktifkan, dan kita membuat notifikasi dengan memanggil `showNotification()` pada pendaftaran. `showNotification()` berharap `title` dan kita diberikan sebuah objek `options`. Di sini kita akan menyetel body pesan, ikon dan lencana dalam opsi (lencana hanya digunakan di Android pada saat penulisan).

```
const title = 'Push Codelab';
const options = {
  body: 'Yay it works.',
  icon: 'images/icon.png',
  badge: 'images/badge.png'
};
self.registration.showNotification(title, options);
```

Hal terakhir yang perlu dibahas pada kejadian push kita adalah `event.waitUntil()`. Metode ini mengambil promise dan browser akan menjaga service worker tetap aktif dan berjalan sampai promise yang diteruskan telah diselesaikan.

Agar kode di atas sedikit lebih mudah dipahami kita bisa menulis ulang seperti ini:

```
const notificationPromise = self.registration.showNotification(title, options);
event.waitUntil(notificationPromise);
```

Sekarang setelah kita melangkah masuk kejadian push, mari kita menguji kejadian push.

#### Cobalah

Dengan kejadian push kita di service worker, kita bisa menguji apa yang terjadi ketika pesan diterima dengan memicu kejadian push palsu menggunakan DevTools.

Pada aplikasi web Anda, ikutlah berlangganan perpesanan push, pastikan Anda mendapat *User IS subscribed* di konsol Anda, lalu buka panel *Application* dalam DevTools dan di bawah tab *Service Workers* klik pada tautan *Push* di bawah service worker Anda.

![2b089bdf10a8a945.png](img/2b089bdf10a8a945.png)

Setelah mengekliknya Anda akan mendapatkan notifikasi seperti ini:

![eee7f9133a97c1c4.png](img/eee7f9133a97c1c4.png)

Note: Jika langkah ini tidak berhasil, cobalah membatalkan pendaftaran service worker Anda, melalui tautan *Unregister* dalam panel Aplikasi DevTools, tunggu service worker dihentikan, kemudian muat ulang laman.


## Klik notifikasi




Jika Anda mengeklik salah satu notifikasi ini, Anda akan menyadari bahwa tidak ada yang terjadi. Kita bisa menangani klik notifikasi dengan mendengarkan kejadian `notificationclick` di service worker Anda.

Mulailah dengan menambahkan listener `notificationclick` di `sw.js` seperti:

```
self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  event.waitUntil(
    clients.openWindow('https://developers.google.com/web/')
  );
});
```

Ketika pengguna mengeklik notifikasi, event listener `notificationclick` akan dipanggil.

Dalam code lab ini, pertama-tama kita akan menutup notifikasi yang diklik dengan:

```
event.notification.close();
```

Kemudian kita membuka jendela / tab baru yang memuat url [developers.google.com](/web/), silakan mengubah ini :)

```
clients.openWindow('https://developers.google.com/web/')
```

Kita memanggil `event.waitUntil()` lagi untuk memastikan browser tidak menghentikan service worker sebelum jendela baru ditampilkan.

#### Cobalah

Cobalah memicu pesan push di DevTools lagi dan klik pada notifikasi. Sekarang Anda akan melihat notifikasi menutup dan membuka tab baru.


## Mengirim pesan push




Kita telah melihat bahwa aplikasi web kita mampu menampilkan notifikasi menggunakan DevTools dan melihat cara menutup notifikasi melalui klik, langkah berikutnya adalah mengirim pesan push yang sebenarnya.

Biasanya proses ini akan mengirimkan langganan dari laman web ke backend dan backend kemudian akan memicu pesan push dengan membuat panggilan API ke endpoint di langganan.

Ini di luar cakupan codelab ini, namun Anda bisa menggunakan situs pendamping ( [https://web-push-codelab.appspot.com/](https://web-push-codelab.appspot.com/)) bagi code lab ini untuk memicu pesan push yang sebenarnya. Salin dan tempel langganan di bagian bawah laman Anda:

![cf0e71f76cb79cc4.png](img/cf0e71f76cb79cc4.png)

Kemudian tempel ini ke situs pendamping di area teks *Subscription to Send To*:

![a12fbfdc08233592.png](img/a12fbfdc08233592.png)

Kemudian di bawah *Text to Send* Anda bisa menambahkan string yang ingin Anda kirim dengan pesan push dan terakhir klik tombol *Send Push Message*.

![2973c2b818ca9324.png](img/2973c2b818ca9324.png)

Anda kemudian akan menerima pesan push dan teks yang Anda sertakan akan dicetak ke konsol.

![75b1fedbfb7e0b99.png](img/75b1fedbfb7e0b99.png)

Ini akan memberikan Anda kesempatan untuk menguji proses mengirim dan menerima data serta memanipulasi notifikasi sebagai akibatnya.

Aplikasi pendamping sebenarnya hanyalah server simpul yang menggunakan [pustaka web-push](https://github.com/web-push-libs/web-push) untuk mengirim pesan. Anda pasti akan terbantu bila memeriksa [web-push-libs org di Github](https://github.com/web-push-libs/) untuk melihat apa pustaka yang tersedia untuk mengirim pesan push bagi Anda (ini menangani banyak detail mendalam tentang memicu pesan push).


## Menghentikan langganan pengguna




Satu hal yang tidak kita dapatkan adalah kemampuan untuk menghentikan langganan pengguna dari push. Untuk melakukan ini kita harus memanggil `unsubscribe()` pada `PushSubscription`.

Kembali pada file `scripts/main.js` kita, ubah listener klik `pushButton` di `initialiseUI()` sebagai berikut:

```
pushButton.addEventListener('click', function() {
  pushButton.disabled = true;
  if (isSubscribed) {
    unsubscribeUser();
  } else {
    subscribeUser();
  }
});
```

Perhatikan bahwa kita sekarang akan memanggil fungsi `unsubscribeUser()` baru. Dalam metode ini kita akan mendapatkan langganan aktif dan memanggil berhenti berlangganan di atasnya. Tambahkan kode berikut ke `scripts/main.js`:

```
function unsubscribeUser() {
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    if (subscription) {
      return subscription.unsubscribe();
    }
  })
  .catch(function(error) {
    console.log('Error unsubscribing', error);
  })
  .then(function() {
    updateSubscriptionOnServer(null);

    console.log('User is unsubscribed.');
    isSubscribed = false;

    updateBtn();
  });
}
```

Mari menjelajahi fungsi ini.

Pertama kita dapatkan langganan aktif dengan memanggil `getSubscription()`:

```
swRegistration.pushManager.getSubscription()
```

Ini mengembalikan promise yang diselesaikan dengan `PushSubscription` jika ada, jika tidak maka itu mengembalikan `null`. Jika ada langganan, kita memanggil `unsubscribe()` di atasnya, yang membuat `PushSubscription` menjadi tidak valid.

```
swRegistration.pushManager.getSubscription()
.then(function(subscription) {
  if (subscription) {
    // TODO: Tell application server to delete subscription
    return subscription.unsubscribe();
  }
})
.catch(function(error) {
  console.log('Error unsubscribing', error);
})
```

Memanggil `unsubscribe()` akan mengembalikan promise, karena itu memerlukan beberapa saat untuk diselesaikan, kita mengembalikan promise tersebut sehingga `then()` berikutnya dalam rangkaian menunggu `unsubscribe()` untuk diselesaikan. Kita juga menambahkan penangan tangkap apabila pemanggilan `unsubscribe()` menghasilkan kesalahan. Setelah ini kita bisa memperbarui UI.

```
.then(function() {
  updateSubscriptionOnServer(null);

  console.log('User is unsubscribed.');
  isSubscribed = false;

  updateBtn();
})
```

#### Cobalah

Anda seharusnya bisa menekan  *Enable Push Messaging*  /  *Disable Push Messaging*  di aplikasi web Anda dan log akan menunjukkan pengguna yang berlangganan dan berhenti berlangganan.

![33dd89c437c17c97.png](img/33dd89c437c17c97.png)


## Selesai




Selamat telah menyelesaikan codelab ini!

Code lab ini menunjukkan kepada Anda cara bangun dan berjalan dengan menambahkan push ke aplikasi web Anda. Jika Anda ingin mengetahui selengkapnya tentang apa yang bisa dilakukan notifikasi web,  [lihat dokumen ini](/web/fundamentals/engage-and-retain/push-notifications/). 

Jika Anda ingin menerapkan push pada situs, Anda mungkin tertarik untuk menambahkan dukungan bagi compliant browser lama / non-standar yang menggunakan GCM, [ketahui selengkapnya di sini](https://web-push-book.gauntface.com/chapter-06/01-non-standards-browsers/).

### Bacaan Lebih Lanjut

*  Dokumentasi [Pemberitahuan Push Web](/web/fundamentals/engage-and-retain/push-notifications/) pada Web__Fundamentals__
*  [Pustaka Web Push](https://github.com/web-push-libs/) - Pustaka Web Push termasuk Node.js, PHP, Java dan Python.

#### Entri blog terkait

*  [Enkripsi Payload Web Push](/web/updates/2016/03/web-push-encryption)
*  [Kunci Server Aplikasi dan Web Push](/web/updates/2016/07/web-push-interop-wins)
*  [Tindakan Notifikasi](/web/updates/2016/01/notification-actions)
*  [Ikon, Kejadian Tutup, Pemberitahuan-ulang Preferensi dan Stempel Waktu](/web/updates/2016/03/notifications)





## Menemukan masalah, atau memiliki masukan? {: .hide-from-toc }
Bantu kami menjadikan code lab lebih baik dengan mengirimkan 
[masalah](https://github.com/googlechrome/push-notifications/issues) hari ini. Dan terima kasih!

{# wf_devsite_translation #}
