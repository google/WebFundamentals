project_path: /web/_project.yaml 
book_path: /web/fundamentals/_book.yaml
description: Arsitektur shell aplikasi membuat UI Anda tetap lokal dan memuat konten secara dinamis tanpa mengorbankan kemampuan untuk dapat ditemukan dan ditautkan pada web. 

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-09-27 #}

# Model Shell Aplikasi {: .page-title }

{% include "web/_shared/contributors/addyosmani.html" %}

Arsitektur **shell aplikasi** (atau app shell) adalah satu cara untuk membangun
Progressive Web App yang bisa diandalkan dan langsung dimuat pada layar pengguna,
serupa dengan yang Anda lihat di aplikasi asli.

"Shell" aplikasi adalah HTML, CSS, dan JavaScript minimal yang diperlukan untuk menjalankan
antarmuka pengguna dan bila di-cache offline bisa menjamin **kinerja yang bagus, instan,
dan bisa diandalkan** pada pengguna saat kunjungan berulang. Ini berarti shell aplikasi
tidak dimuat dari jaringan setiap kali pengguna berkunjung. Hanya materi yang dibutuhkan
yang dimuat dari jaringan.

Untuk [aplikasi
laman-tunggal](https://en.wikipedia.org/wiki/Single-page_application) dengan
arsitektur yang sarat JavaScript, shell aplikasi menjadi pendekatan yang dianjurkan. Pendekatan
ini mengandalkan caching shell secara agresif (dengan menggunakan [service
worker](/web/fundamentals/primers/service-worker/)) untuk menjalankan
aplikasi. Berikutnya, konten dinamis dimuat untuk setiap laman menggunakan JavaScript. Shell
aplikasi berguna untuk menempatkan sebagian HTML awal ke layar dengan cepat tanpa
jaringan.

<img src="images/appshell.png" alt="Arsitektur Shell Aplikasi" />

Sisihkan yang lain, shell aplikasi serupa dengan bundel kode yang Anda
publikasikan ke toko aplikasi saat membangun aplikasi asli. Ini adalah kerangka
UI Anda dan komponen inti yang diperlukan aplikasi Anda agar berhasil, namun kemungkinan
tidak berisi data.

Note: Cobalah codelab [Progressive Web
App Pertama](https://codelabs.developers.google.com/codelabs/your-first-pwapp/#0)
untuk mempelajari cara merancang dan
mengimplementasikan shell aplikasi pertama Anda untuk aplikasi cuaca. Video [Pemuatan
Instan dengan model Shell Aplikasi](https://www.youtube.com/watch?v=QhUzmR8eZAo)
juga akan menjelaskan pola ini.

### Kapan menggunakan model shell aplikasi

Membangun PWA bukan berarti memulai dari nol. Jika Anda sedang membangun
aplikasi laman-tunggal yang modern, maka Anda barangkali menggunakan sesuatu yang serupa dengan shell aplikasi,
baik Anda menyebutnya demikian ataupun tidak. Detailnya mungkin sedikit bervariasi yang bergantung pada
pustaka atau kerangka kerja mana yang Anda gunakan, namun konsepnya sendiri
tidak memedulikan kerangka kerja.

Arsitektur shell aplikasi paling layak untuk aplikasi dan situs dengan
navigasi yang relatif tidak berubah namun materinya berubah. Sejumlah kerangka kerja dan pustaka
JavaScript modern sudah mendorong pemisahan logika aplikasi
dari materinya, sehingga membuat arsitektur ini lebih sederhana untuk diterapkan.
Untuk kelas situs web tertentu yang hanya memiliki materi statis, Anda tetap bisa
mengikuti model yang sama namun situs tersebut 100% shell aplikasi.

Untuk melihat cara Google membangun arsitektur shell aplikasi, perhatikan
[Membangun Google I/O 2016 Progressive Web App](/web/showcase/2016/iowa2016).
Aplikasi sungguhan ini dimulai dengan SPA untuk membuat PWA yang melakukan precache materi
dengan menggunakan service worker, memuat laman baru secara dinamis, melakukan transisi secara halus
antar tampilan, dan menggunakan kembali materi setelah pemuatan pertama.


### Manfaat {: #app-shell-benefits }

Manfaat arsitektur shell aplikasi dengan service worker antara lain:

* **Kinerja yang cepat secara konsisten dan bisa diandalkan**. Kunjungan berulang menjadi
sangat cepat sekali.  Aset statis dan UI (mis. HTML, JavaScript, gambar
dan CSS) disimpan ke cache pada kunjungan pertama sehingga akan dimuat seketika pada
kunjungan berulang. Materi _mungkin_ akan di-cache pada kunjungan pertama, namun
umumnya akan dimuat bila dibutuhkan.

* **Interaksi seperti-asli**. Dengan mengadopsi model shell aplikasi, Anda
bisa membuat pengalaman dengan interaksi dan navigasi instan seperti-aplikasi-asli,
lengkap dengan dukungan offline.

* **Penggunaan data yang ekonomis**. Desain untuk penggunaan data minimal dan bijaksanalah dalam
hal apa yang Anda cache karena pencantuman file yang tidak begitu penting (misalnya gambar besar yang
tidak ditampilkan pada setiap laman) mengakibatkan browser mengunduh
data lebih banyak daripada yang dibutuhkan. Walaupun data relatif murah di negara-negara
barat, tidak demikian halnya di negara-negara yang sedang berkembang di mana konektivitas
dan data adalah sesuatu yang mahal.

## Persyaratan {: #app-shell-requirements }

Shell aplikasi idealnya:

* Memuat dengan cepat
* Menggunakan data sekecil mungkin
* Menggunakan aset statis dari cache lokal
* Memisahkan materi dari navigasi
* Mengambil dan menampilkan materi laman tertentu (HTML, JSON, dll.)
* Opsional, meng-cache konten dinamis

Shell aplikasi menjaga UI Anda tetap lokal dan menarik konten secara dinamis melalui
API namun tidak mengorbankan kemampuan untuk dapat ditemukan dan ditautkan dari web. Saat
berikutnya pengguna mengakses aplikasi Anda, versi terbaru ditampilkan secara otomatis.
Tidak perlu mengunduh versi baru sebelum menggunakannya.

Note: Ekstensi audit [Lighthouse](https://github.com/googlechrome/lighthouse) bisa digunakan
untuk memverifikasi apakah PWA Anda yang menggunakan shell aplikasi telah
mencapai kinerja tinggi. [To the Lighthouse](https://www.youtube.com/watch?v=LZjQ25NRV-E)
adalah perbincangan yang menjelaskan cara mengoptimalkan PWA dengan menggunakan alat (bantu) ini.

## Membangun shell aplikasi Anda {: #building-your-app-shell }

Buat struktur aplikasi Anda agar ada tujuan jelas antara shell laman dan
konten dinamis. Secara umum, aplikasi Anda harus memuat shell yang sesederhana mungkin
namun menyertakan materi laman yang cukup berarti bersama unduhan pertama. Tentukan
keseimbangan yang tepat antara kecepatan dan kebaruan data untuk setiap
sumber data.

<figure>
  <img src="images/wikipedia.jpg"
    alt="Aplikasi Wikipedia offline menggunakan shell aplikasi bersama caching materi">
  <figcaption><a href="https://wiki-offline.jakearchibald.com/wiki/Rick_and_Morty">Aplikasi Wikipedia offline</a> dari Jake Archibald adalah contoh bagus PWA yang menggunakan model shell aplikasi. Aplikasi ini secara instan dimuat pada kunjungan berulang, namun secara dinamis mengambil materi menggunakan JS. Materi ini kemudian di-cache secara offline untuk kunjungan yang akan datang.
</figcaption>
</figure>

### Contoh HTML untuk shell aplikasi {: #example-html-for-appshell }

Contoh ini memisahkan infrastruktur aplikasi inti dan UI dari data.
Pemuatan pertama perlu sesederhana mungkin untuk menampilkan layout
laman saja begitu aplikasi web dibuka. Sebagian yang dimuat berasal dari
file indeks aplikasi Anda (inline DOM, gaya) dan selebihnya dimuat dari
stylesheet dan skrip eksternal.

Semua UI dan infrastruktur di-cache secara lokal menggunakan service worker sehingga
pada pemuatan selanjutnya, hanya data baru dan berubah yang diambil, daripada
harus memuat semuanya.

File `index.html` di direktori kerja Anda seharusnya terlihat seperti
kode berikut. Ini adalah subset materi sesungguhnya dan bukan
file indeks lengkap. Mari kita lihat apa materinya.

* HTML dan CSS untuk "kerangka" antarmuka pengguna Anda lengkap dengan
  placeholder materi dan navigasi.
* File eksternal JavaScript (app.js) untuk menangani navigasi dan logika UI serta
  kode untuk menampilkan entri blog diambil dari server dan disimpan
  secara lokal menggunakan mekanisme storage seperti IndexedDB.
* Manifes aplikasi web dan service worker loader untuk mengaktifkan kemampuan offline.

<div class="clearfix"></div>

    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Shell Aplikasi</title>
      <link rel="manifest" href="/manifest.json">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Shell Aplikasi</title>
      <link rel="stylesheet" type="text/css" href="styles/inline.css">
    </head>

    <body>
      <header class="header">
        <h1 class="header__title">Shell Aplikasi</h1>
      </header>
      
      <nav class="nav">
      ...
      </nav>
      
      <main class="main">
      ...
      </main>

      <div class="dialog-container">
      ...
      </div>

      <div class="loader">
        <!-- Show a spinner or placeholders for content -->
      </div>

      <script src="app.js" async></script>
      <script>
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
          // Registration was successful
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }).catch(function(err) {
          // registration failed :(
          console.log('ServiceWorker registration failed: ', err);
        });
      }
      </script>
    </body>
    </html>

<div class="clearfix"></div>


Note: Lihat [https://app-shell.appspot.com/](https://app-shell.appspot.com/) untuk
tampilan sesungguhnya dengan PWA sangat sederhana menggunakan shell aplikasi dan
rendering sisi-server untuk materi. Shell aplikasi bisa diimplementasikan dengan menggunakan sembarang pustaka atau
kerangka kerja seperti yang dibahas dalam pembahasan <a
href="https://www.youtube.com/watch?v=srdKq0DckXQ">Progressive Web Apps across
all frameworks</a>. Contoh tersedia menggunakan Polymer (<a
href="https://shop.polymer-project.org">Shop</a>) dan React (<a
href="https://github.com/insin/react-hn">ReactHN</a>,
<a
href="https://github.com/GoogleChrome/sw-precache/tree/master/app-shell-demo">iFixit</a>).
 

### Meng-cache shell aplikasi {: #app-shell-caching }

Shell aplikasi bisa di-cache menggunakan service worker yang ditulis secara manual
atau yang dihasilkan oleh service worker menggunakan alat (bantu) precache aset statis seperti
[sw-precache](https://github.com/googlechrome/sw-precache).

Note: Contoh disediakan untuk informasi umum dan tujuan ilustrasi
saja. Sumber daya sesungguhnya yang digunakan mungkin akan berbeda untuk
aplikasi Anda.

#### Meng-cache shell aplikasi secara manual

Di bawah ini adalah contoh kode service worker yang meng-cache sumber daya statis dari
shell aplikasi ke dalam [Cache API](https://developer.mozilla.org/en-US/docs/Web/API/Cache)
menggunakan kejadian `install` service worker:

    var cacheName = 'shell-content';
    var filesToCache = [
      '/css/styles.css',
      '/js/scripts.js',
      '/images/logo.svg',

      '/offline.html’,

      '/’,
    ];

    self.addEventListener('install', function(e) {
      console.log('[ServiceWorker] Install');
      e.waitUntil(
        caches.open(cacheName).then(function(cache) {
          console.log('[ServiceWorker] Caching app shell');
          return cache.addAll(filesToCache);
        })
      );
    });

#### Menggunakan sw-precache untuk meng-cache shell aplikasi

Service worker yang dihasilkan oleh sw-precache akan meng-cache dan menyajikan sumber daya
yang Anda konfigurasi sebagai bagian dari proses pembangunan. Anda bisa menyuruhnya meng-cache lebih dahulu setiap file
HTML, JavaScript, dan CSS yang membentuk shell aplikasi Anda. Segala sesuatunya akan
bekerja offline, dan dimuat cepat pada kunjungan selanjutnya tanpa upaya tambahan.

Inilah sebuah contoh dasar penggunaan sw-precache sebagai bagian dari proses pembangunan
[gulp](http://gulpjs.com):

    gulp.task('generate-service-worker', function(callback) {
      var path = require('path');
      var swPrecache = require('sw-precache');
      var rootDir = 'app';

      swPrecache.write(path.join(rootDir, 'service-worker.js'), {
        staticFileGlobs: [rootDir + '/**/*.{js,html,css,png,jpg,gif}'],
        stripPrefix: rootDir
      }, callback);
    });

Untuk mengetahui selengkapnya tentang caching aset statis, lihat codelab [Menambahkan Service Worker dengan
sw-precache](https://codelabs.developers.google.com/codelabs/sw-precache/index.html?index=..%2F..%2Findex#0).


Note: sw-precache berguna untuk caching sumber daya statis offline Anda. Untuk
sumber daya dinamis/waktu proses, kami menyarankan penggunaan pustaka gratis kami
[sw-toolbox](https://github.com/googlechrome/sw-toolbox).

## Kesimpulan {: #conclusion }

Shell aplikasi yang menggunakan Service worker adalah pola andal untuk caching offline
juga menawarkan keunggulan kinerja yang signifikan dalam bentuk pemuatan instan untuk
kunjungan berulang ke PWA Anda. Anda bisa meng-cache shell aplikasi supaya bekerja secara
offline dan mengisi materinya menggunakan JavaScript.

Pada kunjungan berulang, hal ini memungkinkan Anda menampilkan piksel yang memadai ke layar tanpa
perlu jaringan, sekalipun materi Anda pada akhirnya akan berasal dari jaringan.



{# wf_devsite_translation #}
