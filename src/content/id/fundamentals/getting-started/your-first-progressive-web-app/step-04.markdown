---
title: "Gunakan Service Workers untuk melakukan Pre-cache App Shell"
description: "Gunakan service worker untuk menerapkan pre-cache app shell terhadap Progressive Web App."

notes:
  sw-intro: "Jika Anda belum terbiasa dengan service worker, Anda bisa memperoleh dasar pemahaman dengan membaca <a href='http://www.html5rocks.com/en/tutorials/service-worker/introduction/'>Pengenalan Service Worker</ a> tentang apa yang bisa mereka lakukan, siklus hidup dan batasan-batasannya."
  sw-https: "Service worker berfungsi hanya pada halaman yang diakses melalui HTTPS (<code> https://localhost</code> juga bisa digunakan untuk mempermudah pengujian). Untuk mempelajari tentang alasan di balik pembatasan ini, baca <a href='http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features'>Prefer Secure Origins For Powerful New Features</a> dari tim Chromium."
  not-production: "Kode di bawah ini <b>TIDAK BOLEH</b> digunakan dalam aplikasi sebenarnya, karena hanya menjelaskan kasus penggunaan paling mendasar sehingga mudah bagi Anda untuk terjebak ke dalam keadaan di mana app shell Anda tidak akan terbarui. Pastikan untuk meninjau bagian bawah yang membahas keterbatasan implementasi ini dan bagaimana menghindarinya."
  permutations: "Pastikan untuk menyertakan semua permutasi nama file, misalnya aplikasi kita disajikan dari <code>index.html</code>, tetapi juga bisa diakses sebagai <code>/</code> karena server mengirimkan <code>index.html</ code> ketika root folder diakses. Anda bisa menangani ini dalam method <code>fetch</code>, tetapi perlu kasus khusus yang mungkin jadi lebih rumit."
  bump-name: "Jika Anda tidak melihat <code>[ServiceWorker]</ code> menulis log di console, pastikan penulisan kode<code>cacheName</code> dan muat ulang halaman tersebut. Jika masih belum berhasil, lihat bagian Tips untuk pengujian service workers lebih lanjut."
---

<p class="intro">
Progresif Web Apps harus cepat, dan bisa diinstall, 
bekerja pada saat online, offline, koneksi terputus-putus, pun pada saat mendapatkan koneksi yang sangat lambat. Untuk mencapainya, 
kita perlu untuk menerapkan mekanisme cache app shell kita menggunakan service worker sehingga semua sumber daya yang diperlukan 
selalu tersedia dengan cepat dan bisa diandalkan.
</p>

{% include shared/toc.liquid %}

Jika Anda belum terbiasa dengan service worker, Anda bisa memperoleh dasar 
pemahaman dengan membaca 
[Pengenalan Service Worker](http://www.html5rocks.com/en/tutorials/service-worker/introduction/) 
tentang apa yang bisa mereka lakukan, siklus hidup dan batasan-batasannya.

Fitur yang disediakan melalui service workder bisa dianggap sebagai 
penyempurnaan secara progresif, dan hanya ditambahkan saat didukung oleh browser. Misalnya, dengan 
service worker Anda bisa menyimpan app shell dan data untuk aplikasi Anda, sehingga file-file tersebut 
tersedia bahkan pada saat jaringan terputus. Ketika service worker tidak didukung, 
kode offline tidak dipanggil, dan pengguna mendapatkan pengalaman seperti biasa. Penggunaan 
fitur pendeteksi untuk memberikan penyempurnaan secara progresif memiliki sedikit overhead dan 
dijamin tidak akan mengakibatkan kerusakan di browser lama yang tidak mendukung fitur itu.

{% include shared/remember.liquid list=page.notes.sw-https %}

## Daftarkan service workder jika memungkinkan

Langkah pertama untuk membuat aplikasi offline bekerja adalah dengan mendaftarkan service worker, 
script yang memungkinkan sebuah fungsi bekerja di belakang layar tanpa 
pengguna membuka halaman web.

Ini perlu dua langkah sederhana:

1. Buat sebuah file JavaScript yang akan menjadi service worker
1. Kita minta pada browser untuk mendaftarkan file JavaScript sebagai service worker.

Pertama, buat file kosong bernama `service-worker.js` di root folder aplikasi Anda. 
File `service-worker.js` ini harus berada di root folder aplikasi karena 
cakupan untuk service worker ditetapkan oleh direktori di mana file tersebut 
berada. 

Selanjutnya, kita perlu mengetahui apakah browser mendukung service worker, dan jika didukung, 
daftarkan service worker. Tambahkan kode berikut ke file `app.js`:  

{% highlight javascript %}
if('serviceWorker' in navigator) {  
  navigator.serviceWorker  
           .register('/service-worker.js')  
           .then(function() { console.log('Service Worker Terdaftar!'); });  
}
{% endhighlight %}

## Memasukkan aset-aset situs ke dalam cache

Ketika service worker telah terdaftar, sebuah event `install` akan terpicu saat pertama 
kalinya pengguna mengunjungi halaman. Dalam event ini, kita akan meng-cache 
semua aset yang dibutuhkan oleh aplikasi.

{% include shared/note.liquid list=page.notes.not-production %}

Ketika service worker diaktifkan, dia harus mencari objek dalam cache dan 
mengisinya dengan aset yang diperlukan untuk memuat App Shell. Tambahkan kode ini 
ke dalam file `service-worker.js` Anda:

{% highlight javascript %}
var cacheName = 'weatherPWA-step-5-1';  
var filesToCache = [];

self.addEventListener('install', function(e) {  
  console.log('[ServiceWorker] Proses instalasi');  
  e.waitUntil(  
    caches.open(cacheName).then(function(cache) {  
      console.log('[ServiceWorker] Melakukan caching terhadap app shell');  
      return cache.addAll(filesToCache);  
    })  
  );  
});
{% endhighlight %}

Pertama, kita perlu membuka cache dengan `cache.open()` dan memberikan nama cache. 
Menyediakan nama cache memungkinkan kita untuk membuat beberapa versi, atau memisahkan data dari 
App Shell sehingga kita dapat dengan mudah memperbarui satu file dengan tidak mempengaruhi file lainnya. 

Setelah cache terbuka, kita kemudian dapat memanggil `cache.addAll()`, dengan mengambil daftar 
URL, kemudian menarik mereka dari server dan menambahkannya ke dalam cache. 
Perlu diperhatikan bahwa fungsi `cache.addAll()` ini atomik, jika salah satu file gagal, keseluruhan 
langkah untuk memasukkan ke dalam cache akan gagal!

Pastikan untuk menghapus `cacheName` setiap kali Anda membuat perubahan pada service worker Anda untuk 
memastikan Anda selalu mendapatkan versi terbaru dari file tersebut dari cache. 
Sangat penting untuk membersihkan data dan isi cache yang tidak terpakai secara berkala. Tambahkan 
event listener ke event `activate` untuk mendapatkan semua kunci cache dan 
menghapus yang tidak terpakai:

{% highlight javascript %}
self.addEventListener('activate', function(e) {  
  console.log('[ServiceWorker] Proses aktifasi');  
  e.waitUntil(  
    caches.keys().then(function(keyList) {  
      return Promise.all(keyList.map(function(key) {  
        console.log('[ServiceWorker] Menghapus cache lama', key);  
        if (key !== cacheName) {  
          return caches.delete(key);  
        }  
      }));  
    })  
  );  
});
{% endhighlight %}

Akhirnya, mari kita memperbaharui daftar file yang dibutuhkan untuk app shell. Dalam 
array, kita perlu menyertakan semua file yang dibutuhkan aplikasi Anda, termasuk gambar, 
JavaScript, stylesheet, dll.   

{% highlight javascript %}
var filesToCache = [  
  '/',  
  '/index.html',  
  '/scripts/app.js',  
  '/styles/inline.css',  
  '/images/clear.png',  
  '/images/cloudy-scattered-showers.png',  
  '/images/cloudy.png',  
  '/images/fog.png',  
  '/images/ic_add_white_24px.svg',  
  '/images/ic_refresh_white_24px.svg',  
  '/images/partly-cloudy.png',  
  '/images/rain.png',  
  '/images/scattered-showers.png',  
  '/images/sleet.png',  
  '/images/snow.png',  
  '/images/thunderstorm.png',  
  '/images/wind.png'  
];
{% endhighlight %}

{% include shared/note.liquid list=page.notes.permutations %}

Aplikasi kita belum bisa bekerja secara offline. Kami telah meng-cache komponen-komponen app shell, 
tapi kita masih perlu memuat mereka dari cache lokal.

## Menyajikan app shell dari cache

Service worker menyediakan kemampuan untuk menyadap permintaan 
Progressive Web App kita dan menangani mereka di dalam kode service worker. Kita bisa 
menentukan bagaimana menangani permintaan ini dan mungkin sekali melayani 
response dari cache kita sendiri.

Sebagai contoh:

{% highlight javascript %}
self.addEventListener('fetch', function(event) {  
  // Lakukan sesuatu yang menarik dengan fetch di sini
});
{% endhighlight %}

Sekarang, mari kita layani app shell dari cache. Tambahkan kode berikut ke 
file `service-worker.js`:

{% highlight javascript %}
self.addEventListener('fetch', function(e) {  
  console.log('[ServiceWorker] Fetch', e.request.url);  
  e.respondWith(  
    caches.match(e.request).then(function(response) {  
      return response || fetch(e.request);  
    })  
  );  
});
{% endhighlight %}

Melangkah dari dalam, ke luar, `caches.match()` mengevaluasi permintaan web 
yang memicu event `fetch`, dan memeriksa untuk melihat apakah file yang diminta tersedia dalam cache. 
Kemudian merespon dengan versi dalam cache, atau menggunakan `fetch` untuk mendapatkan salinannya 
dari jaringan. `response` dikirimkan kembali ke halaman web dengan
`e.respondWith()`.

{% include shared/remember.liquid list=page.notes.bump-name %}

## Waspadalah terhadap ujung kasus

Seperti disebutkan sebelumnya, kode ini **tidak boleh digunakan dalam aplikasi produksi**
karena banyaknya kasus belum tertangani.

### Cache tergantung pada pemutakhiran kunci cache setiap kali ada perubahan

Sebagai contoh, metode cache ini menuntut Anda untuk memperbarui kunci cache setiap kali 
ada konten yang berubah, jika tidak, cache tidak akan kadaluarsa, dan konten yang lama 
disajikan. Jadi pastikan untuk mengubah kunci cache setiap kali ada perubahan 
selama Anda mengerjakan proyek Anda!

### Menuntut semuanya di-download ulang setiap kali ada perubahan

Kelemahan lainnya adalah bahwa seluruh cache secara keseluruhan menjadi tidak valid dan perlu 
didownload ulang setiap kali ada perubahan file. Itu berarti memperbaiki satu 
kesalahan sederhana (ejaan satu karakter) akan membatalkan validitas cache dan membuat semuanya 
diunduh ulang. Tidak bisa dibilang efisien.

### Cache browser dapat mencegah cache service worker dari pemutakhiran

Ada peringatan penting lainnya di sini. Request HTTPS 
haruslah dilakukan pada saat install handler masuk ke jaringan dan tidak mengembalikan 
response dari cache browser. Jika tidak, browser dapat mengembalikan 
cache versi sebelumnya, sehingga mengakibatkan cache service worker tidak pernah benar-benar terupdate!

### Waspadalah terhadap strategi cache-first dalam produksi

aplikasi kita menggunakan strategi cache-first, yang mengembalikan salinan dari setiap 
konten cache tanpa melakukan permintaan melalui jaringan. Meskipun 
strategi cache-first ini mudah diimplementasikan, dia dapat menyebabkan kesulitan di kemudian hari. Pada saat 
salinan dari halaman awal dan script service worker di-cache-kan, 
sangatlah sulit untuk mengubah konfigurasi service worker (karena konfigurasi 
tersebut tergantung pada tempat dia didefinisikan), dan Anda bisa menemukan diri Anda 
men-deploy situs yang sangat sulit untuk diperbarui!

### Bagaimana cara menghindari kasus ini?

Jadi bagaimana kita menghindari kasus ini? Gunakan library seperti 
[sw-precache](https://github.com/GoogleChrome/sw-precache), yang 
bisa menyediakan kontrol terhadap file-file yang akan habis masa berlakunya, memastikan agar request langsung masuk ke 
jaringan dan melakukan semua pekerjaan ini untuk Anda.

## Kiat untuk menguji service worker secara langsung

Men-debug service worker bisa menjadi sebuah tantangan tersendiri, apalagi bila melibatkan cache, 
bisa menjadi mimpi buruk bila ternyata cache tidak diperbarui seperti yang Anda harapkan. Jangan menyerah. 
Terdapat beberapa alat yang bisa digunakan untuk membuat hidup Anda jadi lebih mudah.

Beberapa tips:

* Pada saat service worker di-unregister, 
  dia mungkin akan tetap terdaftar sampai semua window browser yang menjalankannya ditutup.
* Jika aplikasi ini terbuka di beberapa window, service worker yang baru 
  belum akan diterapkan sampai semua window di-reload dan di-update dengan 
  service worker terbaru.
* Melakukan unregister terhadap service worker tidak akan menghapus cache, sehingga ada kemungkinan 
  Anda masih akan mendapatkan data yang lama jika nama cache belum diubah.
* Jika service worker versi sebelumnya sudah pernah ada dan ada service worker baru yang didaftarkan, 
  service worker yang baru belum akan mengambil kendali hingga halaman dimuat ulang (di-reload), kecuali jika Anda mengambil 
  [kontrol langsung](https://github.com/GoogleChrome/samples/tree/gh-pages/service-worker/immediate-control). 

### Sahabat terbaik Anda yang baru: chrome://serviceworker-internals

Halaman Service Worker Internals di Chrome (`chrome://serviceworker-internals`) adalah 
penolong Anda, memungkinkan Anda untuk menghentikan dan menghapus registrasi service worker yang sudah ada 
dan memulai lagi dari awal. Anda juga dapat menggunakan halaman ini untuk meluncurkan Developer Tools pada 
service worker, sehingga Anda bisa mengakses console service worker.

## Pengujian

* Buka Chrome DevTools dan klik tab resources untuk memastikan bahwa 
service worker telah terdaftar dengan benar dan sumber daya yang dibutuhkan telah dimasukkan ke dalam cache.
* Cobalah mengubah `cacheName` dan pastikan bahwa cache telah benar-benar diperbarui.

<a href="https://weather-pwa-sample.firebaseapp.com/step-06/" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">Cobalah</a>
