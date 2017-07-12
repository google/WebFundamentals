project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Anda telah melihat apa yang membuat notifikasi bagus. Sekarang mari kita lihat cara mengimplementasikannya.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-06-30 #}

# Menangani Pesan {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

<figure class="attempt-right">
  <img src="images/cc-good.png" alt="Contoh notifikasi.">
</figure>

Kembali ke [awal artikel ini](#anatomy), kami
menampilkan notifikasi yang terlihat seperti gambar ini dan kode yang menyertainya.

Meskipun kami sedikit menunjukkan kepada Anda tentang bagaimana ini dikodekan, kami sebenarnya tidak memberikan
informasi yang cukup supaya hal tersebut bisa menjadi berguna. Bagian ini akan membahas hal itu.

<div style="clear:both;"></div>

## Service worker, lagi

Mari kita bicarakan tentang service worker lagi. Penanganan pesan melibatkan kode yang
ada secara eksklusif di service worker. Jika Anda memerlukan sedikit latar belakang, inilah
[pengantar](/web/fundamentals/getting-started/primers/service-workers)
lagi. Kita juga memperoleh beberapa petunjuk bermanfaat untuk
[men-debug service worker](/web/tools/chrome-devtools/debug/progressive-web-apps/#service-workers)
menggunakan DevTools.

## Lebih banyak anatomi notifikasi {: #more-anatomy }

Ketika notifikasi diterima dari server, itu dicegat oleh service
worker menggunakan kejadian push. Struktur dasarnya adalah ini:


    self.addEventListener('push', event => {
      event.waitUntil(
        // Process the event and display a notification.
      );
    });


Di dalam `waitUntil()`, kita akan memanggil `showNotification()` pada
objek pendaftaran service worker.


    self.registration.showNotification(title, {
        body: 'Are you free tonight?',
        icon: 'images/joe.png',
        vibrate: [200, 100, 200, 100, 200, 100, 400],
        tag: 'request',
        actions: [
          { action: 'yes', title: 'Yes!', icon: 'images/thumb-up.png' },
          { action: 'no', title: 'No', icon: 'images/thumb-down.png' }
        ]
      })


Secara teknis, parameter yang diperlukan untuk `showNotification()` hanyalah title.
Dalam praktiknya, Anda harus menyertakan setidaknya body dan icon. Seperti yang bisa Anda
lihat, notifikasi memiliki beberapa opsi. Anda bisa menemukan
[daftar lengkapnya di MDN](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification).

Yang terakhir, kami akan memproses respons pengguna menggunakan metode `notificationclick` dan
`notificationclose`.


    self.addEventListener('notificationclick', event => {  
      // Do something with the event  
      event.notification.close();  
    });

    self.addEventListener('notificationclose', event => {  
      // Do something with the event  
    });


Segala sesuatu yang lain adalah penjabaran dari ide-ide dasar ini.

## Memilih untuk tidak menampilkan notifikasi {: #choosing-not-to-show }

Kadang adakalanya tidak perlu menampilkan notifikasi saat pesan
push diterima. Misalnya, jika aplikasi sudah dibuka dan materi
push sudah terlihat oleh pengguna.

Untungnya, service worker memiliki cara untuk menguji apakah aplikasi terbuka.
Service worker mendukung antarmuka yang disebut
[`clients`](https://developer.mozilla.org/en-US/docs/Web/API/Clients) adalah daftar
semua klien aktif yang dikontrol oleh service worker saat ini. Untuk mengetahui apakah
ada klien yang aktif, panggil `clients.length`. Jika properti ini mengembalikan `0`
maka akan menampilkan notifikasi. Atau, lakukan hal yang lain.

<pre class="prettyprint">
self.addEventListener('push', event => {
  const promiseChain = clients.matchAll()
  .then(clients => {
    <strong>let mustShowNotification = true;
    if (clients.length > 0) {
      for (let i = 0; i < clients.length; i++) {
        if (clients[i].visibilityState === 'visible') {
          mustShowNotification = false;
          return;
        }
      }
    }

    if (mustShowNotification) {
      // Show the notification.
      event.waitUntil(
        self.registration.showNotification('Push notification')
      );
    } else {
      // Send a message to the page to update the UI.
      console.log('The application is already open.');
    }</strong>
  });

  event.waitUntil(promiseChain);
});
</pre>

## Menyiapkan materi pesan {: #preparing-messages }

Seperti yang kami katakan sebelumnya, server Anda mengirimkan dua jenis pesan:

* Pesan dengan payload data.
* Pesan tanpa payload data, sering disebut tickle.

Penangan push Anda harus memperhitungkan keduanya. Untuk pesan tanpa payload
Anda perlu menyediakan pengalaman pengguna yang bagus dengan mendapatkan data sebelum memberi tahu
pengguna bahwa itu telah tersedia.

Mari mulai dengan penangan kejadian push dasar kita dengan panggilan ke
`event.waitUntil()`.  Metode ini hanya bisa mengambil promise atau sesuatu yang
menetapkan ke promise. Metode ini memperpanjang masa pakai kejadian `push` hingga
tugas tertentu selesai. Seperti yang segera Anda lihat, kita akan menahan
kejadian `push` hingga kita menampilkan notifikasi.

    self.addEventListener('push', event => {
      const promiseChain = someFunction();
      event.waitUntil(promiseChain);
    });

Berikutnya, jika Anda menemukan data dalam objek kejadian, ambillah.

<pre class="prettyprint">
self.addEventListener('push', event => {
  <strong>
  let data = null;
  if (event.data) {
    // We have data - lets use it
    data = event.data.json();
  }</strong>
  let promiseChain = someFunction(data);
  event.waitUntil(promiseChain);
});
</pre>


Jika tidak ada data dalam objek, panggil `fetch()` untuk mengambilnya dari server.
Jika tidak, cukup kembalikan datanya.

<pre class="prettyprint">
self.addEventListener('push', event => {
  <strong>let promiseChain;
  if (event.data) {
    // We have data - lets use it
    promiseChain = Promise.resolve(event.data.json());
  } else {
    promiseChain = fetch('/some/data/endpoint.json')
      .then(response => response.json());
  }</strong>

  promiseChain = promiseChain.then(data => {
      // Now we have data we can show a notification.
    });
  event.waitUntil(promiseChain);
});
</pre>

Dalam kedua kejadian tersebut, kita berakhir dengan sebuah objek JSON. Sekarang saatnya untuk menunjukkan
notifikasi kepada pengguna.

<pre class="prettyprint">
self.addEventListener('push', event => {
  <strong>let promiseChain;
  if (event.data) {
    // We have data - lets use it
    promiseChain = Promise.resolve(event.data.json());
  } else {
    promiseChain = fetch('/some/data/endpoint.json')
      .then(response => response.json());
  }</strong>

  promiseChain = promiseChain.then(data => {
      return self.registration.showNotification(data.title, {
        body: data.body,
        icon: (data.icon ? data.icon : '/images/icon-192x192.png'),
        vibrate: [200, 100, 200, 100, 200, 100, 400],
        tag: data.tag
      });
    });
  event.waitUntil(promiseChain);
});
</pre>

## Menggabungkan notifikasi serupa {: #combine-similar-notes }

<figure class="attempt-right">
  <img src="images/combined-notes-mobile.png" alt="Gabungkan pesan dari pengirim yang sama.">
</figure>

Terkadang ada gunanya juga menggabungkan beberapa notifikasi menjadi satu. Misalnya
, aplikasi jaringan sosial mungkin menghindari pesan pemberitahuan ke pengguna untuk setiap
pengeposan dari orang tertentu, dan karenanya, menggabungkan mereka.

Menggabungkan notifikasi serupa memiliki banyak komponen bergerak. Namun saya menganggap
nya sebagai elaborasi pada langkah-langkah berikut.

1. Sebuah pesan masuk di penangan kejadian `push`.
2. Anda memanggil `self.registration.getNotifications()` untuk mengetahui apakah ada
   notifikasi yang ingin digabungkan. Hal ini umumnya dilakukan dengan memeriksa tag
   notifikasi.
3. Terakhir, tampilkan notifikasi baru dengan memanggil `self.registration.showNotification()`
   untuk memastikan Anda menyetel parameter pemberitahuan ulang ke true di opsi (Lihat
   contoh di bawah ini).

Cari hal-hal ini selagi kita membahas contoh yang lain. Kita akan menganggap
Anda sudah menerima atau mengambil data pesan seperti yang dijelaskan dalam bagian
terakhir. Sekarang mari kita lihat apa yang harus dilakukan dengannya.

Mulailah dengan penangan kejadian push dasar. Metode `waitUntil()` mengembalikan
Promise yang ditetapkan ke data notifikasi.


    self.addEventListener('push', function(event) {
      const promiseChain = getData(event.data)
      .then(data => {
        // Do something with the data
      });
      event.waitUntil(promiseChain);
    });


Setelah kita memiliki data pesan, panggil `getNotifications()` dengan menggunakan `data.tag`.

<pre class="prettyprint">
self.addEventListener('push', function(event) {
  const promiseChain = getData(event.data)
  .then(data => {
    <strong>return self.registration.getNotifications({tag: data.tag});
  })
  .then(notifications => {
    //Do something with the notifications.
  })</strong>;
  event.waitUntil(promiseChain);
});
</pre>

Dalam contoh lainnya, kami sudah memberi contoh objek `options` tepat di panggilan ke
`showNotification()`. Untuk skenario ini, objek `options` perlu diubah
berdasarkan hasil `getNotifications()`, sehingga kita buat instance notifikasi objek
`options`.

Perhatikan bahwa kita juga telah memasang data notifikasi ke opsi
notifikasi. Kita melakukan ini untuk memastikan bahwa itu tersedia untuk `notificationclick`,
yang akan kita pelajari pada bagian berikutnya. Untuk memberi tahu browser bahwa kita menggabungkan
notifikasi, kita perlu menggunakan kembali `tag` dan menyetel `renotify` ke `true`. Keduanya disorot di bawah ini.

<pre class="prettyprint">
self.addEventListener('push', function(event) {
  const promiseChain = getData(event.data)
  .then(data => {
    <strong>return self.registration.getNotifications({tag: data.tag})
    .then(notifications => {
      var noteOptions = {
        body: data.body,
        icon: (data.icon ? data.icon : '/images/ic_flight_takeoff_black_24dp_2x.png'),
        vibrate: [200, 100, 200, 100, 200, 100, 400],
        <strong>tag: data.tag,</strong>
        data: data
    	};

      if (notifications.length > 0) {
        <strong>noteOptions.renotify = true;</strong>
        // Configure other options for combined notifications.
      }
    })</strong>;
  });
  event.waitUntil(promiseChain);
});
</pre>

Saat mengisi properti selebihnya untuk notifikasi baru, kita juga
menambahkan dua tombol aksi ke notifikasi. Yang satu
membuka aplikasi; yang lainnya menutup notifikasi tanpa
melakukan aksi. Tak satu pun dari tindakan ini yang ditangani oleh kejadian push. Kita akan melihatnya
di bagian berikutnya. Yang terakhir, menunjukkan notifikasi (baris 26).

<pre class="prettyprint">
self.addEventListener('push', function(event) {
  const promiseChain = getData(event.data)
  .then(data => {
    <strong>return self.registration.getNotifications({tag: data.tag})
    .then(notifications => {
      var noteOptions = {
        body: data.body,
        icon: (data.icon ? data.icon : '/images/ic_flight_takeoff_black_24dp_2x.png'),
        vibrate: [200, 100, 200, 100, 200, 100, 400],
        <strong>tag: data.tag,</strong>
        data: data
    	};

      if (notifications.length > 0) {
        data.title = "Flight Updates";
        noteOptions.body = "There are several updates regarding your flight, 5212 to Kansas City.";
        noteOptions.renotify = true;
        <strong>noteOptions.actions = [
          {action: 'view', title: 'View updates'},
          {action: 'notNow', title: 'Not now'}
        ];
      }

      return self.registration.showNotification(data.title, noteOptions);
    })</strong>;
  });
  event.waitUntil(promiseChain);
});
</pre>

## Masukkan tindakan pada notifikasi {: #notification-actions }

Kita sudah melihat contoh notifikasi dengan tindakan yang dibangun di dalamnya. Mari kita
lihat cara mengimplementasikan dan meresponsnya.

Ingatlah bahwa `showNotification()` menggunakan argumen opsi bersama satu atau beberapa
tindakan opsional.


    ServiceWorkerRegistration.showNotification(title, {  
      body: data.body,  
      icon: (data.icon ? data.icon : '/images/i_face_black_24dp_2x.png'),  
      vibrate: [200, 100, 200, 100, 200, 100, 400],  
      tag: data.tag,  
      actions: [  
        {action: 'change', title: 'Ask for reschedule'},  
        {action: 'confirm', title: 'Confirm'}  
      ],  
      data: data  
    })

<figure class="attempt-right">
  <img src="images/confirmation.png" alt="Sebuah notifikasi dengan tindakan.">
</figure>

Notifikasi mengatakan bahwa Stacey telah
mengkonfirmasi janji untuk jam 15:00. Penerima bisa merespons dengan
melakukan konfirmasi atau meminta agar janji bertemu dijadwal ulang. Untuk yang
terdahulu, kita mengirim pesan secara langsung ke server. Untuk yang belakangan, kita membuka
aplikasi ke antarmuka yang sesuai.

<div style="clear:both;"></div>

Pertama, mari kita tambahkan penangan kejadian `notificationclick` ke service worker. Selain itu,
tutuplah notifikasi.


    self.addEventListener('notificationclick', function(event) {  
      event.notification.close();  
      // Process the user action.  
    });


Berikutnya, kita perlu beberapa logika untuk mencari tahu di mana notifikasi di-klik. Apakah
pengguna mengeklik Confirm, Ask for Reschedule, atau tidak mengeklik?

<pre class="prettyprint">
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  <strong>if (event.action === 'confirm') {
    // Send the confirmation to the server.
  } else if (event.action === 'change') {
    // Open the application to a place where the user can reschedule.
  } else {
    // Just open the app.
  }</strong>
});
</pre>

Jika pengguna mengeklik Confirm, kita bisa mengirimkan itu langsung ke server
tanpa membuka aplikasi (baris 3 sampai 13). Perhatikan bahwa kita
mengembalikan kejadian `notificationclick` dengan segera setelah mengirim
konfirmasi ke server. Hal ini mencegah aplikasi dibuka.

<pre class="prettyprint">
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  <strong>if (event.action === 'confirm')
    var fetchOptions = {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: event.notification.data.confirmation_id
    };
    var confirmation = new Request('/back/end/system/confirm');
    event.waitUntil(fetch(confirmation, fetchOptions));
    return; // So we don't open the page when we don't need to.</strong>
  } else if (event.action === 'change') {
    // Open the application to a place where the user can reschedule.
  } else {
    // Just open the app.
  }
});
</pre>

Jika penerima mengeklik Ask for Reschedule, kita perlu membuka laman konfirmasi. Jika pengguna mengeklik selain tombol aksi, kita cukup membuka aplikasi.
Dalam kedua kasus, kita membuat URL yang sesuai.

<pre class="prettyprint">
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  if (event.action === 'confirm') {
    var fetchOptions = {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: event.notification.data.confirmation_id
    };
    var confirmation = new Request('/back/end/system/confirm');
    event.waitUntil(fetch(confirmation, fetchOptions));
    return; // So we don't open the page when we don't need to.
  <strong>} else if (event.action === 'change') {
    var appUrl = '/?confirmation_id=' +
      event.notification.data.confirmation_id + '#reschedule';
  } else {
    var appUrl = '/';
  }
  // Navigate to appUrl.</strong>
});
</pre>

Note: Untuk seterusnya, contoh kode semakin besar. Kita akan memotongnya untuk menghemat tempat. Namun, jangan khawatir. Kami akan menunjukkan semuanya di akhir.

Terlepas dari URL, kita akan memanggil `clients.matchAll()` untuk mendapatkan jendela klien yang bisa kita
telusuri.


    self.addEventListener('notificationclick', function(event) {
      // Content excerpted

      event.waitUntil(clients.matchAll({
        includeUncontrolled: true,
        type: 'window'
        })
      );
    });


Yang terakhir, kita harus mengambil jalur navigasi yang berbeda tergantung pada apakah
klien terbuka.

<pre class="prettyprint">
self.addEventListener('notificationclick', function(event) {
  // Content excerpted

  event.waitUntil(clients.matchAll({
    includeUncontrolled: true,
    type: 'window'
    <strong>}).then( activeClients => {
      if (activeClients.length > 0) {
        activeClients[0].navigate(appUrl);
        activeClients[0].focus();
      } else {
        clients.openWindow(appUrl);
      }</strong>
    })
  );
});
</pre>


Berikut keseluruhan penangan `notificationclick` dari awal hingga akhir.


    self.addEventListener('notificationclick', function(event) {
      event.notification.close();
      if (event.action === 'confirm') {
        var fetchOptions = {
          method: 'post',
          headers: new Headers({
            'Content-Type': 'application/json'
          }),
          body: event.notification.data.confirmation_id
        };
        var confirmation = new Request('/back/end/system/confirm');
        event.waitUntil(fetch(confirmation, fetchOptions));
        return; // So we don't open the page when we don't need to.
      } else if (event.action === 'change') {
        var appUrl = '?confirmation_id=' +
          event.notification.data.confirmation_id + '#reschedule';
      } else {
        var appUrl = '/';
      }

      event.waitUntil(clients.matchAll({
        includeUncontrolled: true,
        type: 'window'
        }).then( activeClients => {
          if (activeClients.length > 0) {
            activeClients[0].navigate(appUrl);
            activeClients[0].focus();
          } else {
            clients.openWindow(appUrl);
          }
        })
      );
    });


{# wf_devsite_translation #}
