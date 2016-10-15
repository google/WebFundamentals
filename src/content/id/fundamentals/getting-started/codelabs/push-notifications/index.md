project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Dalam codelab ini, Anda akan belajar bagaimana menambahkan Push Notification ke dalam aplikasi web. Ini memungkinkan Anda untuk mengajak kembali pengguna dengan mengirimkan berita dan informasi tentang konten baru.

{# wf_updated_on: 2016-09-22 #}
{# wf_published_on: 2000-01-01 #}

# Aplikasi web pertama Anda dengan push notifications {: .page-title }

{% include "_shared/contributors/samdutton.html" %}



Note: Pastikan untuk mengunjungi [Push Notification](/web/fundamentals/engage-and-retain/push-notifications/) berisi penjelasan best practice dan rincian lebih lanjut tentang cara menggunakan Web Push Notifications.


<img src="images/image00.png" width="373" height="93" alt="Screenshot dari push notification" />

Dalam codelab ini, Anda akan belajar bagaimana menambahkan Push Notifications ke applikasi web.

Ini memungkinkan Anda untuk mengajak pengguna kembali dengan menyajikan berita dan informasi tentang
konten baru.

Anda juga akan mempelajari dasar-dasar tentang service worker.

### Yang akan Anda pelajari

* Dasar-dasar service worker: instalasi dan event handling
* Bagaimana menyiapkan akun Google Cloud Messaging (GCM) account
* Bagaimana menambahkan web manifest
* Teknik untuk meminta GCM mengirimkan notification ke web client
* Menampilkankan Notification 
* Penanganan klik Notification

### Apa yang akan anda butuhkan

* Chrome 42 atau lebih tinggi
* Pemahaman dasar tentang [git](https://git-scm.com/), dan [Chrome DevTools](/web/tools/chrome-devtools)
* Berpengalaman dengan [Promises](http://www.html5rocks.com/en/tutorials/es6/promises/) dan [service worker](http://www.html5rocks.com/en/tutorials/service-worker/introduction/) juga akan bermanfaat, tapi tidak menjadi keharusan
* Contoh kode
* Editor teks
* Window terminal untuk menjalankan alat baris perintah (command line tools)
* Python atau web lokal server sederhana (lihat di bawah)
project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Unduh contoh kodenya sebagai file .zip atau clone dari GitHub


## Dapatkan contoh code-nya


Anda bisa mengunduh semua contoh kode ke komputer Anda:

[Unduh file Zip](https://github.com/GoogleChrome/push-notifications/archive/master.zip)

...atau clone dari GitHub:


    $ git clone git@github.com:GoogleChrome/push-notifications.git
    

Perintah di atas akan membuat direktori **_push-notifications_** yang berisi kode lengkap untuk setiap langkah.

Buatlah kode Anda sendiri di direktori bernama **_app_**. Kita akan mengacu ke direktori ini untuk semua langkah di codelab ini.project_path: /web/_project.yaml


## Menjalankan web server lokal


**Menjalankan web server di localhost**

Untuk menyelesaikan codelab ini Anda akan perlu menjalankan web server lokal. Anda mungkin
sudah memiliki web server lokal sendiri untuk ini. Jika belum, buka window terminal,
arahkan ke direktori **_push-notifications_** yang Anda buat ketika Anda
mengunduh kode (pada langkah sebelumnya) dan jalankan perintah Python berikut untuk memulai server:


    $ python -m SimpleHTTPServer
    

Perintah di atas memulai web server pada port default HTTP. Arahkan browser Anda ke [localhost](http://localhost) untuk melihat daftar **_push-notifications_**.

Untuk melihat hasil pekerjaan Anda di direktori **_app_**, arahkan browser Anda ke [localhost/app](http://localhost/app). Untuk melihat contoh kode selengkapnya untuk setiap langkah, arahkan ke direktori di [localhost/completed](http://localhost/completed).

Jika Anda tidak memiliki Python, Anda bisa mendapatkannya [di sini](https://www.python.org/downloads/). Jika ada masalah menjalankan server, [cek](https://www.google.com/search?q=what+is+using+port) bahwa tidak ada layanan lain menggunakan port yang dipilih oleh SimpleHTTPServer.

Contoh baris perintah di codelab ini menggunakan bash shell.

Pengguna Windows perlu menggunakan perintah MS-DOS dari Command Prompt: periksa panduan ini untuk perintah bash/DOS yang setara. Sebagai alternatif, Anda bisa menggunakan lingkungan Cygwin.

 Atau, Anda bisa menggunakan web server lain seperti [XAMPP](https://www.apachefriends.org/index.html) atau [MAMP](https://www.mamp.info/en/).project_path: /web/_project.yaml


## Get started with Service Worker


Versi lengkap dari langkah ini ada di direktori completed/step3.


### 1. Buat index.html

Dalam direktori _app_ Anda, buat file _index.html_ dan tambahkan 
kode berikut:


    <!DOCTYPE html>
    <html>
    <head>
      <title>Push Notification codelab</title>
    </head>
    <body>
      <h1>Push Notification codelab</h1>
      <p>Halaman ini harus diakses menggunakan HTTPS atau melalui localhost.</p>
      <script src="js/main.js"></script>
    </body>
    </html>
    

Buka _index.html_ secara lokal di Chrome dari localhost: URL lengkapnya berikut _http: //localhost/push-notifications/app/index.html_.

### 2. Tambahkan Service Worker

Dalam direktori _app_ Anda, buat file kosong bernama _sw.js_. Anda akan menambahkan kode
di file ini nanti.

Jangan khawatir jika Anda belum pernah menggunakan service worker sebelumnya. Anda tidak perlu tahu banyak tentang service worker untuk menyelesaikan codelab ini. script service worker berjalan di latar belakang untuk menangkap network request, menangani push notification dan melakukan tugas-tugas lainnya. Jika Anda ingin mengetahui lebih lanjut, lihat [Pengantar Service Worker](/web/fundamentals/primers/service-worker/).

Ketika push notification diterima, browser dapat menjalankan service worker di latar belakang untuk menangani push notification tanpa perlu membuka halaman web.

### 3. Mendaftarkan dan menginstal Service Worker

Dalam langkah ini Anda akan membuat file JavaScript _main.js_ yang digunakan di
_index.html_. Fil ini akan memberikan akses ke script service worker. Dalam direktori _app_ Anda, buat direktori _js_ dan tambahkan file bernama
_main.js_ di dalamnya dengan kode berikut:


    if ('serviceWorker' in navigator) {
     console.log('Service Worker di dukung');
     navigator.serviceWorker.register('sw.js').then(function(reg) {
       console.log(':^)', reg);
       // TODO
     }).catch(function(err) {
       console.log(':^(', err);
     });
    }
    

Kode ini memeriksa apakah service worker didukung oleh browser Anda, kemudian mendaftarkan dan menginstal service worker yang Anda buat di _sw.js_ - yang belum bisa melakukan apa-apa (kosong!)

### 4. Cobalah dari localhost

Buka _index.html_ dari localhost dan buka DevTools Chrome untuk melihat
console.

Console harus terlihat seperti ini:

<img src="images/image01.png" width="965" height="901" alt="Halaman web Codelab terbuka di Chrome, menunjukkan ServiceWorkerRegistration di console DevTools" />

### 5. Cobalah serviceworker-internals

Halaman diagnostik _chrome://serviceworker-internals_ adalah tempat untuk
memeriksa bahwa service worker Anda bekerja:

<img src="images/image02.png" width="907" height="641" alt="Halaman diagnostik chrome:serviceworker-internals terbuka di Chrome" />

### 6. Tambahkan event listener untuk service worker Anda

Tambahkan kode berikut ke dalam _sw.js_:


    console.log('Started', self);
    self.addEventListener('install', function(event) {
      self.skipWaiting();
      console.log('Ter-install', event);
    });
    self.addEventListener('activate', function(event) {
      console.log('Ter-aktifasi', event);
    });
    self.addEventListener('push', function(event) {
      console.log('Push Notification diterima', event);
      // TODO
    });
    

Dalam service worker, `self` mengacu pada objek `ServiceWorkerGlobalScope`: service worker itu sendiri.

**TOP TIP!**

Secara default service worker lama akan tetap berjalan sampai semua tab yang menggunakannya ditutup atau di-unload. service worker yang baru akan tetap berada dalam keadaan `waiting`.

Ketika `skipWaiting()` dipanggil (seperti pada kode di atas) service worker akan melewatkan keadaan `waiting` dan segera mengaktifkan service worker yang baru.

Berguna untuk debugging!

Klik tombol **Inspect** pada _chrome di halaman _chrome://serviceworker-internals_. Anda akan melihat berikut:

<img src="images/image03.png" width="888" height="845" alt="Console Chrome DevTools console menunjukkan instalasi service worker dan mengaktifasi event" />

**Peringatan**: Jika ada kesalahan parsing kode service worker Anda, service worker tidak akan ter-instal dan pesan kesalahan akan dilemparkan pada event install.
Hal ini dapat mengakibatkan service worker secara misterius tidak terperbarui ketika Anda mengubah kode. Selalu ingat untuk memeriksa dan memvalidasi kode Anda ketika Anda mengubahnya!

## Buat proyek di Google Developers Console


Push notification dari aplikasi web membutuhkan layanan backend untuk menangani pesan.
Chrome saat ini menggunakan [Google Cloud Messaging](https://developers.google.com/cloud-messaging/) (GCM) untuk ini, untuk mempelajari lebih lanjut, silahkan mengacu ke [Web Push Protocol](https://datatracker.ietf.org/doc/draft-ietf-webpush-protocol/).

Browser lain bebas menggunakan layanan lainnya.

Untuk langkah ini, Anda perlu menyiapkan sebuah proyek di Google Developer Console.

**Meskipun ada banyak langkah di sini, jangan ditunda. Cukup mudah untuk membuat sebuah proyek!**


### 1. Buat sebuah proyek

Dari [Google Developers Console](https://console.developers.google.com)
buatlah sebuah proyek:

<img src="images/image04.png" width="907" height="845" alt="Screenshot halaman web: membuat proyek baru dari Google Developers Console" />

### 2. Pilih APIs untuk proyek

Dari **Use Google APIs**, pilih **Enable and manage APIs**:

<img src="images/image05.png" width="907" height="845" alt="Screenshot halaman web: pilih APIs dari Google Developers Console" />

Dari daftar **Google APIs** pilih **Google Cloud Messaging**:

<img src="images/image06.png" width="907" height="845" alt="Screenshot halaman web: pilih Google Cloud Messaging API" /> Jika API yang ditambahkan berhasil, Anda akan melihat halaman seperti ini:

<img src="images/image07.png" width="965" height="901" alt="Screenshot halaman web: Google Developers Console, Google Cloud Messaging enabled" />

### 3. Dapatkan credentials

Dari menu **API Manager**, pilih **Credentials**, klik tombol dropdown **Create
credentials** dan pilih **API key**:

<img src="images/image08.png" width="965" height="901" alt="Screenshot halaman web: menambahkan credential dari Google Developers Console" />

Klik tombol **Browser key**:

<img src="images/image09.png" width="907" height="822" alt="Screenshot halaman web: Klik tombol Browser key untuk memilih tipe API key baru di Google Developers Console" />

Berikan nama untuk key (terserah Anda!), tinggalkan field HTTP referrers kosong dan klik tombol **Create**:

<img src="images/image10.png" width="907" height="822" alt="Screenshot halaman web: klik tombol Create untuk membuat sebuah browser API key dari Google Developers Console" />

Simpan **API key** — Anda aka memerlukannya nanti:

<img src="images/image11.png" width="907" height="822" alt="Screenshot halaman web: Simpan API key untuk proyek Anda dari Google Developers Console" />

Dari halaman Home, simpan **Project Number** — Anda juga akan memerlukannya nanti:

<img src="images/image12.png" width="965" height="901" alt="Screenshot halaman web: Simpan Project Number untuk proyek Anda dari Google Developers Console" />

Selamat!

Sekarang Anda telah berhasil membuat sebuah proyek Google Cloud Messaging.

## Tambahkan sebuah manifest

Versi lengkap dari langkah ini ada di direktori completed/step5.

Manifest adalah sebuah file JSON yang menyediakan informasi tentang aplikasi web Anda, termasuk konfigurasi Push Notification.

### 1. Buat sebuah file manifest

Pada tingkat paling atas direktori _app_ Anda, buat file bernama
_manifest.json_ (Anda bisa memilih nama lain).

Sertakan kode berikut. Nilai _gcm\_sender\_id_ harus berisi
Project Number yang telah Anda simpan sebelumnya:


    {
      "name": "Push Notifications codelab",
      "gcm_sender_id": "593836075156"
    }
    

Ada beberapa banyak fungsi web manifest, seperti pengaturan ikon aplikasi dan memungkinkan Add to Home Screen di ponsel.

Pelajari lebih lanjut dari artikel Dasar-dasar Web [Installable Web Apps](/web/updates/2014/11/Support-for-installable-web-apps-with-webapp-manifest-in-chrome-38-for-Android).

### 2. Tunjukkan pada browser di mana menemukan file manifest untuk aplikasi web Anda

Tambahkan baris berikut ke elemen head dalam file _index.html_ yang Anda buat sebelumnya:


    <link rel="manifest" href="manifest.json">
    
## Subscribe to Push Notifications

Versi lengkap dari langkah ini ada di direktori completed/step6.

### 1. Tambakan kode untuk berlangganan (subscription)

Ganti komentar TODO dalam file _main.js_ yang Anda buat sebelumnya agar terlihat seperti ini:


    if ('serviceWorker' in navigator) {
        console.log('Service Worker didukung');
        navigator.serviceWorker.register('sw.js').then(function(reg) {
            console.log(':^)', reg);
            reg.pushManager.subscribe({
                userVisibleOnly: true
            }).then(function(sub) {
                console.log('endpoint:', sub.endpoint);
            });
        }).catch(function(error) {
            console.log(':^(', error);
        });
    }
    

Kode ini menggunakan objek `pushManager` milik `ServiceWorkerRegistration` untuk berlangganan pesan dari gcm\_sender\_id yang Anda tambahkan ke manifest.

Anda harus memberikan argumen `{userVisibleOnly: true}` ke method subscribe(). Kode ini akan memberitahu browser bahwa pemberitahuan akan selalu ditampilkan ketika Push Message diterima. Saat ini, menjadi kewajiban untuk menunjukkan pemberitahuan.

### 2. Cobalah dari localhost

Bukan _index.html_ dari localhost dan buka Chrome DevTools untuk memeriksa console.

Anda akan melihat sesuatu seperti ini:

<img src="images/image13.png" width="888" height="590" alt="Screenshot halaman web: dialog ijin untuk Push Notification" />

**Penting**: Chrome saat ini tidak mendukung Push API di Incognito Mode.
Jika Anda ingin mengatur ulang preferensi izin push notification setiap saat,
klik ikon halaman di sebelah kiri URL:

<img src="images/image14.png" width="713" height="672"  alt="Screenshot halaman web: Ijin pengaturan dialog Push Notification" />

### 3. Dapatkan subscription ID

Dari Chrome DevTools, klik kanan nilai `endpoint` dan pilih **Copy Link Address** untuk menyalin nilai, yang akan terlihat seperti ini:

_https://android.googleapis.com/gcm/send/**APA91bGdUldXgd4Eu9MD0qNmGd0K6fu0UvhhNGL9FipYzisrRWbc-qsXpKbxocgSXm7lQuaEOwsJcEWWadNYTyqN8OTMrvNA94shns\_BfgFH14wmYw67KZGHsAg74sm1\_H7MF2qoyRCwr6AsbTf5n7Cgp7ZqsBZwl8IXGovAuknubr5gaJWBnDc**_

Simpan subscription ID, yang merupakan bagian terakhir dari URL,
disorot di sini dalam huruf tebal.

Anda akan menggunakan nilai ini kemudian untuk memberitahu Google Cloud Messaging ke mana mengirim
pesan.

<img src="images/image15.png" width="774" height="932" alt="Screenshot halaman web: Console Chrome DevTools menunjukkan nilai endpoint Push Notification" />


## Kirim request dari command line GCM untuk mendorong pesan Push Notification {: .page-title }


Seperti yang Anda lihat sebelumnya, Chrome menggunakan Google Cloud Messaging (GCM) untuk push
messaging.

Agar bisa GCM mendorong notification ke klien web Anda, Anda perlu mengirim GCM sebuah
permintaan yang berisi:

* **public API key** yang Anda buat sebelumnya, yang terlihat seperti ini:<br>
  <br>
  _AIzaSyAc2e8MeZHA5NfhPANea01wnyeQD7uVY0c_<br>
  <br>
  GCM akan mencocokkan dengan Project Number yang Anda dapatkan dari Google Developer
  Console untuk digunakan sebagai nilai `gcm_sender_id` di manifest.

* **Content-Type header** yang sesuai, seperti `application/json`.

* Array dari **subscription ID**, yang masing-masing sesuai dengan 
  aplikasi klien masing-masing. Kode ini adalah bagian terakhir dari subscription endpoint URL, dan terlihat
  seperti ini: <br>
  <br>
  _APA91bHMaA-R0eZrPisZCGfwwd7z1EzL7P7Q7cyocVkxBU3nXWed1cQYCYvF
  glMHIJ40kn-jZENQ62UFgg5QnEcqwB5dFZ-AmNZjATO8QObGp0p1S6Rq2tcCu
  UibjnyaS0UF1gIM1mPeM25MdZdNVLG3dM6ZSfxV8itpihroEN5ANj9A26RU2Uw_

Untuk situs atau aplikasi yang sebenarnya, Anda perlu mengatur sebuah layanan untuk berinteraksi
dengan GCM dari server Anda. (Ada beberapa contoh kode untuk melakukan hal itu di
[Push Notifications pada Open 
Web](/web/updates/2015/03/push-notifications-on-the-open-web).) Untuk codelab ini, Anda dapat mengirim permintaan dari terminal atau dari aplikasi yang berjalan di browser.

Anda dapat mengirim permintaan ke GCM menggunakan utilitas cURL.

Jika Anda belum pernah menggunakan cURL sebelumnya, Anda mungkin bisa mempelajarinya di tautan berikut:

* [Panduan Memulai](http://ethanmick.com/getting-started-with-curl)
* [Dokumentasi Referensi](http://curl.haxx.se/docs/manpage.html)

Perintah cURL untuk mengirim permintaan ke GCM untuk mengeluarkan Push Message terlihat seperti
ini:
_curl --header "Authorization: key=**&lt;PUBLIC\_API\_KEY&gt;**" --header "Content-Type: application/json" https://android.googleapis.com/gcm/send -d "{\"registration\_ids\":[\"**&lt;SUBSCRIPTION\_ID&gt;**\"]}"_

 Mari kita lihat aksinya...

### 1. Membuat permintaan ke GCM

Dari terminal Anda, jalankan perintah cURL di bawah - tetapi pastikan untuk menggunakan 
API key dan subscription ID yang Anda buat sebelumnya:


    curl --header "Authorization: key=XXXXXXXXXXXX" --header "Content-Type: application/json" https://android.googleapis.com/gcm/send -d "{\"registration_ids\":[\"fs...Tw:APA...SzXha\"]}"
    

### 2. Periksa response

Jika semuanya berjalan baik, Anda akan melihat response seperti ini di terminal:

<img src="images/image16.png" width="890" height="551" alt="Screenshot terminal BASH: response sukses terhadap request cURL ke GCM untuk mengirimkan sebuah Push Message" />

Jika ada kesalahan otorisasi, periksa nilai Authorization key. Jika response menunjukkan kesalahan pendaftaran yang tidak valid, periksa subscription ID yang Anda gunakan.

### 3. Pemeriksaan lebih lanjut

Lihat ke _chrome://serviceworker-internals_. Pastikan Anda melihat sesuatu
seperti ini:

<img src="images/image17.png" width="1547" height="492" alt="Screenshot Chrome DevTools:  Push Message diterima" />

Cobalah meminta pemberitahuan untuk dua endpoint yang berbeda dengan membuka aplikasi di Chrome Canary bersamaan dengan Chrome.

Pastikan untuk menempatkan escaped quote untuk masing-masing subscription ID.

### 4. Cobalah mengubah window focus

Coba tutup atau pindah fokus dari tab browser yang menjalankan 
aplikasi Anda. Pastikan Anda melihat pemberitahuan seperti ini:

<img src="images/image18.png" width="373" height="109" alt="Screenshot Push Notification: 'Situs ini telah diperbarui di latar belakang'" />

**Penting**: Setiap klien yang berlangganan ke Push Messaging akan memiliki subscription ID sendiri. Jika Anda mengirim permintaan ke GCM untuk mengirimkan pemberitahuan, ingat untuk menyertakan subscription ID untuk semua klien yang ingin Anda kirim pesan! Jika Anda membangun setiap langkah dari codelab ini secara terpisah, setiap langkah akan mewakili endpoint yang berbeda dan karena itu memiliki subscription ID yang berbeda.project_path: /web/_project.yaml


## Mengirimkan permintaan Push Notification menggunakan XHR (Ajax)


Cara lain untuk membuat permintaan ke GCM agar mengirimkan Push Notification adalah melalui XHR.

Kami meninggalkan ini sebagai latihan bagi pembaca!
**Petunjuk**: Anda mungkin ingin melihat pada demo di [simple-push-demo.appspot.com](https://simple-push-demo.appspot.com).



## Menampilkan notification 

Versi lengkap dari langkah ini ada di direktori completed/step9.

Dalam langkah ini Anda akan menambahkan kode untuk push handler Anda di service worker untuk menampilkan
pemberitahuan.

### 1. Tambahkan kode showNotification()

Perbarui _sw.js_ agar terlihat seperti di bawah ini, dengan menggantikan komentar _TODO_ :


    console.log('Dimulai', self);
    self.addEventListener('install', function(event) {
      self.skipWaiting();
      console.log('Ter-install', event);
    });
    self.addEventListener('activate', function(event) {
      console.log('Ter-aktifasi', event);
    });
    self.addEventListener('push', function(event) {
      console.log('Push Message', event);
      var title = 'Push Message';
      event.waitUntil(
        self.registration.showNotification(title, {
          body: 'The Message',
          icon: 'images/icon.png',
          tag: 'my-tag'
        }));
    });
    // TODO
    

Method `event.waitUntil()` mengambil Promise dan memperpanjang masa hidup event handler sampai, dalam hal ini, Promise yang dikembalikan oleh `showNotification()` terpenuhi.

Satu pemberitahuan akan ditampilkan untuk setiap nilai tag: jika Push Message baru diterima, pemberitahuan lama akan diganti. Untuk menampilkan beberapa pemberitahuan, gunakan nilai tag yang berbeda untuk setiap panggilan ke showNotification(), atau jangan gunakan tag sama sekali.

### 2. Buat permintaan ke GCM untuk mengirim pemberitahuan

Jalankan perintah cURL atau permintaan XHR dari langkah-langkah sebelumnya.

Pastikan Anda melihat pemberitahuan seperti ini:

<img src="images/image19.png" width="394" height="114" alt="Screenshot dari Push Notification" />


## Menangani klik di notification



Versi lengkap dari langkah ini ada di direktori completed/step10.

Dalam langkah ini Anda akan menambahkan kode untuk mengaktifkan aksi (seperti menavigasi ke halaman web) saat pengguna mengklik notification.

Tambahkan kode berikut ke _sw.js_, menggantikan komentar _TODO_ dari langkah 
6:


    self.addEventListener('notificationclick', function(event) {
        console.log('Notification click: tag ', event.notification.tag);
        event.notification.close();
        var url = 'https://youtu.be/gYMkEMCHtJ4';
        event.waitUntil(
            clients.matchAll({
                type: 'window'
            })
            .then(function(windowClients) {
                for (var i = 0; i < windowClients.length; i++) {
                    var client = windowClients[i];
                    if (client.url === url && 'focus' in client) {
                        return client.focus();
                    }
                }
                if (clients.openWindow) {
                    return clients.openWindow(url);
                }
            })
        );
    });
    

Kode ini memantau klik di notification, kemudian membuka halaman web - dalam contoh ini, video YouTube.

Kode ini memeriksa semua window klien yang menjalankan service worker ini: jika URL yang diminta sudah terbuka di tab, fokus ke tab tersebut - jika tidak, buka tab baru.

**CATATAN**: Android [tidak menutup notification](https://crbug.com/463146) ketika Anda meng-klik notification.

Oleh karena itu, kita memerlukan kode `event.notification.close();`.

## Berhenti berlangganan dari notification


Versi lengkap dari langkah ini ada di direktori completed/step11.

**CUKUP SUDAH BERMAIN DENGAN PESAN:^)!**

Bagaimana Anda memperbolehkan pengguna untuk berhenti berlangganan dan berlangganan ulang?
Sederhana: klien berhenti berlangganan dari notifikasi dengan memanggil method `unsubscribe()`
pada objek `PushSubscription`.
Dalam aplikasi yang sebenarnya, Anda juga akan perlu menghapus data langganan klien yang berhenti berlangganan dari server Anda, untuk menghindari mengirimkan pemberitahuan yang tidak diinginkan.

### 1. Tambahkan tombol Berlangganan/Berhenti Berlangganan

Di file _index.html_ yang Anda buat sebelumnya, tambahkan  tombol sehingga kode terlihat seperti ini:


    <!DOCTYPE html>
    <html>
    <head>
      <title>Push Notification codelab</title>
      <link rel="manifest" href="manifest.json">
    </head>
    <body>
      <h1>Push Notification codelab</h1>
      <p>Halaman ini harus diakses menggunakan HTTPS atau melalui localhost.</p>
      <button disabled>Berlangganan</button>
      <script src="js/main.js"></script>
    </body>
    </html>
    

### 2. Tambahkan fungsionalitas berlangganan/berhenti ke _main.js_

Ubah kode _main.js_ agar terlihat seperti di bawah ini:


    var reg;
    var sub;
    var isSubscribed = false;
    var subscribeButton = document.querySelector('button');
    if ('serviceWorker' in navigator) {
      console.log('Service Worker didukung');
      navigator.serviceWorker.register('sw.js').then(function() {
        return navigator.serviceWorker.ready;
      }).then(function(serviceWorkerRegistration) {
        reg = serviceWorkerRegistration;
        subscribeButton.disabled = false;
        console.log('Service Worker siap :^)', reg);
      }).catch(function(error) {
        console.log('Service Worker Error :^(', error);
      });
    }
    subscribeButton.addEventListener('click', function() {
      if (isSubscribed) {
        unsubscribe();
      } else {
        subscribe();
      }
    });
    function subscribe() {
      reg.pushManager.subscribe({userVisibleOnly: true}).
      then(function(pushSubscription){
        sub = pushSubscription;
        console.log('Terdaftar! Endpoint:', sub.endpoint);
        subscribeButton.textContent = 'Berhenti Terdaftar';
        isSubscribed = true;
      });
    }
    function unsubscribe() {
      sub.unsubscribe().then(function(event) {
        subscribeButton.textContent = 'Daftar';
        console.log('Berhenti Terdaftar!', event);
        isSubscribed = false;
      }).catch(function(error) {
        console.log('Error berhenti terdaftar', error);
        subscribeButton.textContent = 'Subscribe';
      });
    }
    

Dalam kode ini, Anda menetapkan nilai objek ServiceWorkerRegistration ketika service worker menginstal, yang kemudian digunakan dalam fungsi subscribe() untuk berlangganan ke Push Messaging.

Fungsi `subscribe()` menciptakan objek `PushSubscription` **sub** yang dapat digunakan oleh fungsi `unsubscribe()`.

Ingat: klien mendapat ID pendaftaran baru setiap kali berlangganan ulang, sehingga Anda perlu menyesuaikan permintaan ke GCM.


## Selamat!



Santai dulu. Anda telah membangun sebuah aplikasi web yang memungkinkan Push Notifications!

Pastikan untuk melihat ke [Push Notification](/web/fundamentals/engage-and-retain/push-notifications/) untuk mendapatkan best practice dan rincian lebih lanjut tentang cara menggunakan Web Push Notifications.


### Pertanyaan yang Sering Diajukan (Frequently Asked Questions)

* **Service worker saya tidak ter-update!**<br>
Anda yakin? Periksa tab source di _chrome://serviceworker-internals_. Jika service worker
benar-benar tidak ter-update, restart Chrome.

* **Saya telah mencoba semuanya, tapi service worker saya masih tidak ter-update:^|**<br>
Apakah Anda memeriksa dan memvalidasi kode Anda? Jika kode service worker Anda tidak dapat
di-parsing, dia tidak akan bisa ter-instal.

* **Request saya ke GCM gagal**<br>
Periksa project Anda di [console.developers.google.com](https://console.developers.google.com/). Pastikan bahwa _gcm\_sender\_id_ cocok dengan Project Number dan nilai Authorization
key cocok dengan API key. Pastikan Anda mencarinya di projek yang benar!

* **Request ke GCM berjalan, tapi event push tidak bisa diterima**<br>
Periksa subscription ID dari console untuk _main.js_. Apakah subscription
ID ada dalam array ID untuk request Anda dengan benar? Pastikan Anda telah meng-enable-kan
Messaging API di 
[console.developers.google.com](https://console.developers.google.com/).

* **Saya menemukan yang tidak saya fahami**<br>
Cobalah untuk menggunakan Chrome Canary: yang memberikan pesan error lebih informatif tentang
kesalahan di service worker.

* **Saya tidak bisa melihat log console untuk event di service worker saya**<br>
Anda hanya akan mendapatkan event install dan activate pada saat pertama kalinya Anda menggunakan
service worker atau pada saat kode berubah. Event yang dimulai hanya akan dijalankan 
sekali untuk setiap session service worker.

* **Bagaimana dengan Firefox?**<br>
[Pada Firefox
42](https://groups.google.com/forum/#!topic/mozilla.dev.platform/BL6TrHN73dY) Push API sudah on secara default.

### Apa yang telah kita bahas

* Instal service worker dan menangani event
* Set up akun Google Cloud Messaging (GCM)
* Menambahkan web manifest
* Mengaktifkan service worker untuk menangani event Push Message
* Mengirimkan permintaan ke GCM melalui cURL atau XHR
* Menampilkan notification
* Menangani klik di notification

### Langkah Berikutnya

* Service worker codelab (jika Anda belum melakukannya!)

### Menyelam Lebih Dalam

* [Dokumentasi Web Push Notification](/web/fundamentals/engage-and-retain/push-notifications/)
* [Menggunakan VAPID dan Web Push Protocol](/web/updates/2016/07/web-push-interop-wins)
* [Dokumentasi Google Cloud Messaging](https://developers.google.com/cloud-messaging/)
* [Panduan Android Material Design Notifications](https://www.google.com/design/spec/patterns/notifications.html)


Translated By: 
{% include "_shared/contributors/abdshomad.html" %}
