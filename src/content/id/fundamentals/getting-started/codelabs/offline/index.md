project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Service worker adalah script yang berjalan di belakang layar, membuka kemungkinan untuk fungsi berjalan secara offline yang biasanya hanya dimungkinkan oleh aplikasi native. Pelajari cara mengintegrasikan service worker ke aplikasi yang sudah ada untuk membuatnya berjalan secara offline.

{# wf_updated_on: 2016-09-21 #}
{# wf_published_on: 2000-01-01 #}

# Aplikasi Web Offline Anda yang Pertama {: .page-title }

{% include "_shared/contributors/paulkinlan.html" %}


Dalam codelab ini, Anda akan belajar bagaimana mengintegrasikan service worker ke aplikasi yang sudah ada untuk membuatnya bekerja secara offline.

<img src="images/image00.png" width="624" height="409" />

Aplikasi ini dinamakan [Air
Horner](https://airhorner.com). Ia menggunakan Web API Audio untuk memainkan dan memanipulasi
suara airhorn, aplikasi ini mungkin merupakan salah satu aplikasi airhorn terbaik yang ada di pasar saat ini
(setidaknya menurut penulis codelab ini). Aplikasi ini sederhana
tetapi bisa mendemonstrasikan penggunaan service worker dengan baik.

Service worker adalah sebuah script yang dijalankan oleh browser Anda di belakang layar,
terpisah dari halaman web, membuka pintu untuk fitur tanpa halaman webnya dibuka
dan tanpa interaksi dengan pengguna. Di masa depan mencakup Push Message,
Background Sync, dan Geofencing, tapi fitur pertama yang akan diluncurkan adalah 
kemampuan untuk menangkap dan menangani network request, termasuk secara programatik
mengelola cache dari response.

Alasan mengapa service worker merupakan API yang menarik adalah karena service worker memungkinkan Anda untuk mendukung aplikasi web secara offline, 
memberikan pengembang kontrol penuh atas pengalaman pengguna 
menggunakan aplikasi.

#### Apa yang akan Anda pelajari

* Bagaimana menambahkan service worker untuk proyek yang sudah ada.
* Gambaran singkat tentang waktu-hidup (lifecycle) service worker 
* Srategi caching offline sederhana

#### Apa yang Anda butuhkan

* Chrome 44 atau di atasnya
* Pemahaman dasar tentang [Promise](http://www.html5rocks.com/en/tutorials/es6/promises/)
* Contoh kode 
* Editor teks
* Python atau web server lokal sederhana


## Get the sample code


Anda dapat mengunduh semua contoh kode ke komputer Anda ... 

[Unduh Zip](https://github.com/GoogleChrome/airhorn/archive/master.zip)

...atau clone repositori GitHub dari command line.


    $ git clone git@github.com:GoogleChrome/airhorn.git
    $ git clone https://github.com/GoogleChrome/airhorn.git
    

Repositori ini memiliki satu folder utama "app". Folder ini berisi aset statis (html, css dan javascript) yang akan Anda gunakan untuk proyek ini.




## Jalankan contoh app



Pertama, mari kita lihat aplikasi contoh versi lengkapnya terlihat seperti apa. Ikuti petunjuk ini untuk membangun dan mulai menguji aplikasi Airhorn.

Pastikan Anda berada di branch (final) yang benar dengan cara check out 
cabang master.


    $ git checkout master
    


Anda sekarang dapat menjalankan situs dengan menggunakan salah satu HTTP server favorit Anda atau dengan menggunakan 
Python. Perintah di bawah ini akan mmulai server di localhost.

    $ cd app
    $ python -m SimpleHTTPServer 3000


Buka situs di Chrome dan Anda akan melihat.

<img src="images/image01.png" width="624" height="382" />
  




## Pengujian aplikasi 



Pastikan speaker Anda hidup, kemudian klik klakson; aplikasi harus mengeluarkan suara.

<img src="images/image01.png" />

Sekarang matikan server (Ctrl-C di baris perintah). Ini mensimulasikan jaringan
akan offline. Kemudian muat ulang situs. Halaman harus sepenuhnya kembali dan Anda harus
tetap dapat menggunakan airhorn.

<img src="images/image01.png"  />  

Alasan mengapa aplikasi ini bisa bekerja secara offline adalah dasar dari codelab ini: dukungan offline 
dengan service worker.

Kita sekarang akan menghapus semua dukungan offline dan Anda akan belajar bagaimana 
menggunakan service worker offline dengan menambahkannya ke dalam aplikasi ini.




## Membangung aplikasi starter




Kembali ke baris perintah dan alihkan kode dari cabang `master` ke cabang `code-lab`:



    git checkout code-lab
    

Ini akan menghapus semua aset yang mendukung fungsionalitas offline sehingga Anda dapat menambahkan mereka kembali dengan mengikuti tutorial.

Selain itu, Anda perlu untuk unregister service worker. Di Chrome Anda dapat melakukan ini dengan mengunjungi `chrome://serviceworker-internals/` dan klik tombol **Unregister** di bawah URL yang tepat.

## Mendaftarkan Service Worker ke situs


Langkah pertama untuk membuat aplikasi berjalan secara offline adalah dengan mendaftarkan service worker, script yang memungkinkan fungsi latar belakang tanpa perlu ada halaman web yang terbuka atau interaksi pengguna.

Perlu dua langkah sederhana:

1. Buat file javascript yang akan menjadi service worker.
1. Beritahu browser untuk mendaftarkan file javascript sebagai "service worker".

Pertama, buat file kosong dengan nama `sw.js` dan tempatkan di folder `/app`. (Folder ini
adalah folder root untuk aplikasi). Anda perlu mengikuti ini karena ruang lingkup
service worker (serangkaian url di mana ServiceWorker bisa dimuat) 
didefinisikan oleh direktori di mana ia berada. Jika tidak berada pada direktori yang benar
maka ServiceWorker tidak akan berfungsi untuk aplikasi offline (ini berarti 
Anda tidak dapat menempatkannya di direktori script.)

Sekarang buka file `index.html` di folder /app dan tambahkan kode berikut di bagian paling bawah.


    <script>
    if('serviceWorker' in navigator) {
      navigator.serviceWorker
               .register('/sw.js')
               .then(function() { console.log("Service Worker Terdaftar!"); });
    }
    </script>
    

Kode di atas akan memeriksa apakah browser mendukung service worker dan bila didukung
service worker akan memanggil method register dan mengembalikan Promise. Setelah pendaftaran
selesai, browser akan memenuhi Promise dan memanggil fungsi di klausul
`.then()`. (Catatan: ini terjadi secara asynchronous.)

Mulailah server di localhost dan perhatikan perubahan situs berikutnya.


    $ cd app
    $ python -m SimpleHTTPServer 3000
    

Buka `chrome://serviceworker-internals/` di Chrome. Jendela ini akan menampilkan daftar
semua service worker yang terdaftar dan akan memungkinkan Anda untuk memeriksa Chrome DevTools 
sebelum service worker terinstal. Hal ini penting jika Anda ingin
mendebug fase `install` dari service worker.

<img src="images/image02.png" width="624" height="350" />  
Muatlah aplikasi web, buka DevTools Chrome dan jika berhasil, Anda akan melihat "Service Worker 
Terdaftar" di Chrome DevTools. Ini baru langkah pertama untuk mengintegrasikan 
service worker ke dalam aplikasi Anda. Kode ini belum membuat aplikasi Anda berjalan secara offline, tapi kita
sudah memulai perjalanan ke arah sana.

<img src="images/image03.png" width="624" height="350" />
  
#### Pertanyaan yang Sering Diajukan (Frequently Asked Questions)

**Mengapa service worker dijalankan di root? Mengapa saya tidak bisa menempatkannya dalam direktori `/scripts`?**

Untuk alasan keamanan, service worker hanya dapat mengontrol halaman yang 
berada pada direktori yang sama atau di bawahnya. Ini berarti bahwa jika Anda menempatkan
file service worker di direktori script, service worker hanya akan mampu 
mengkontrol file-file di dalam direktori /script dan bawahnya (/scripts/test/ 
sebagai contoh). Biasanya tidak mungkin halaman Anda hidup di sana.





## Instal Site Asset

Dengan service worker terdaftar, event "install" akan dipicu pada saat pertama kali pengguna mengunjungi halaman. Dalam event ini, Anda harus meng-cache semua aset yang diperlukan untuk aplikasi Anda.

Pertama tambahkan Cache Polyfill (ada dalam repo).
polyfill ini diperlukan karena Cache API belum sepenuhnya diterapkan di semua 
Browser (Chrome memiliki dukungan yang baik).


    importScripts('/cache-polyfill.js');
    

Sekarang tambahkan Event Listener untuk menginstal event.


    self.addEventListener('install', function(e) {
      e.waitUntil();
    });
    

Kemudian pada fungsi Event Handler, buka objek cache. Objek cache 
akan digunakan nanti dalam codelab untuk memastikan bahwa setiap permintaan kita bisa 
mengembalikan versi data yang tersimpan di cache.


    self.addEventListener('install', function(e) {
      e.waitUntil(
        caches.open('airhorner').then(function(cache) {})
      );
    });
    

Sekarang karena cache telah terbuka, Anda perlu mengisinya. Objek cache memiliki
metode yang disebut addAll (melalui polyfill). addAll akan mengambil daftar url,
secara otomatis mengambil mereka dari server dan menambahkannya ke cache.


    self.addEventListener('install', function(e) {
     e.waitUntil(
       caches.open('airhorner').then(function(cache) {
         return cache.addAll([
           '/',
           '/index.html',
           '/index.html?homescreen=1',
           '/?homescreen=1',
           '/styles/main.css',
           '/scripts/main.min.js',
           '/sounds/airhorn.mp3'
         ]);
       })
     );
    });
    

Jika salah satu dari file ini tidak ada atau gagal saat diambil, maka seluruh 
operasi `addAll` juga akan gagal. Aplikasi yang baik harus menangani kasus ini.

#### Pertanyaan yang Sering Diajukan (Frequently Asked Questions)

* Dimana Polyfill berada?
    * [https://github.com/coonsta/cache-polyfill](https://github.com/coonsta/cache-polyfill) 
* Mengapa saya perlu Polyfill?
    * Saat ini Chrome dan browser lainnya belum sepenuhnya mendukung method addAll 
      (**catatan:** Chrome 46 akan mendukung)
* Mengapa harus ada ?homescreen=1
    * URL dengan parameter Query String diperlakukan sebagai URL tersendiri dan 
      perlu cache terpisah.
      


## Menangkap permintaan halaman web

Salah satu atribut unik dari service worker adalah kemampuan untuk menangkap permintaan dari halaman web yang dikontrol oleh service worker dan memutuskan apa yang harus dilakukan terhadap mereka. Ini memberikan kita kemampuan untuk memuat aset yang cache di fase install.

Langkah pertamanya adalah menempelkan Event Handler untuk menarik event. Event ini
akan dipicu untuk setiap permintaan yang dibuat.

Tambahkan kode berikut untuk sw.js Anda yang akan mencatat log permintaan yang dibuat dari 
halaman induk.


    self.addEventListener('fetch', function(event) {
     console.log(event.request.url);
    });
    

Sekarang buka Chrome DevTools untuk memeriksa service worker dan Anda akan melihat beberapa request.


<img src="images/image04.png" width="624" height="350" />

Sekarang kita tahu bahwa kita bisa mencatat semua request yang datang melalui app kita
dan kita perlu memutuskan apa yang harus dilakukan dengan request-request tersebut. Secara default, jika kita tidak melakukan
apa-apa, permintaan akan diteruskan ke jaringan dan response akan 
dikembalikan ke halaman web.

Untuk membuat aplikasi kita bisa berjalan secara offline, kita perlu menarik request dari cache 
jika tersedia di cache.


Mulailah dengan menambahkan metode `event.respondWith()`. Metode ini memberitahu browser untuk
mengevaluasi hasil dari event berikutnya. event ini perlu untuk diisi
dengan logika operasi sebelumnya.


    self.addEventListener('fetch', function(event) {
     console.log(event.request.url);
     
     event.respondWith( );
    });
    
   
Tambahkan `caches.match(event.request)` sebagai berikut. Panggilan ini mengambil request web saat ini
yang memicu event fetch dan mencari data yang cocok dalam cache dengan 
permintaan sekarang (berdasarkan URL). 



    self.addEventListener('fetch', function(event) {
     console.log(event.request.url);
     event.respondWith(
       caches.match(event.request).then(function(response) { })
     );
    });
    

Metode match mengembalikan Promise yang pasti terpenuhi bahkan saat file tersebut tidak ditemukan 
dalam cache, ini berarti bahwa kita memiliki pilihan tentang apa yang kita lakukan. Dalam kasus sederhana,
ketika file tersebut tidak ditemukan, kita hanya ingin mengambilnya dari jaringan dan 
mengembalikannya ke browser.


    self.addEventListener('fetch', function(event) {
     console.log(event.request.url);
     event.respondWith(
       caches.match(event.request).then(function(response) {
         return response || fetch(event.request);
       })
     );
    });
    

Ini adalah kasus yang paling sederhana, ada banyak skenario caching lainnya. Sebagai contoh,
Anda bisa secara bertahap meng-cache semua response untuk request sebelumnya yang belum di-cache-kan, sehingga 
di masa depan mereka semua dikembalikan dari cache. 



## Selamat!

Bunyikan klakson dari aplikasi air horn. Anda sekarang memiliki aplikasi web yang dapat bekerja
offline. Jika semuanya diatur dengan benar, Anda akan melihat laporan debug
muncul di bagian log service worker Anda pada halaman
`chrome://serviceworker-internals/`.

Berikan uji fungsional dengan menghentikan server Python dari langkah 5. Tekan **Ctrl C**
untuk menghentikan server, kemudian refresh aplikasi airhorn sekarang dengan kondisi server tidak
berjalan lagi. Jika aplikasi masih bisa dimuat, service worker berfungsi dengan baik.

#### Apa yang kita sudah dibahas

* Menambahkan service worker dasar untuk aplikasi yang sudah ada sebelumnya.
* Gambaran singkat dari siklus hidup service worker
* Strategi offline caching sederhana

#### Langkah selanjutnya

* Gunakan Polymer Elements untuk membuat aplikasi offline jauh lebih mudah.
* Jelajahi lebih [teknik caching canggih](https://jakearchibald.com/2014/offline-cookbook/)

#### Daftar akun twitter untuk diikuti

* [Jake Archibald](https://twitter.com/jaffathecake)
* [Alex Russell](https://twitter.com/slightlylate)
* [Matt Gaunt](https://twitter.com/gauntface) 
* [Paul Kinlan](https://twitter.com/Paul_Kinlan)

#### Pelajari Lebih Lanjut

* [Pengenalan ke service worker](http://www.html5rocks.com/en/tutorials/service-worker/introduction/)
  

Translated By: 
{% include "_shared/contributors/abdshomad.html" %}
