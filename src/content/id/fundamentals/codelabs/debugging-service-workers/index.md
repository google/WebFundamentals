project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Dalam codelab ini, Anda akan mempelajari cara men-debug service worker menggunakan panel Aplikasi DevTools yang baru. Anda juga akan mempelajari cara menyimulasikan pemberitahuan Push untuk memastikan bahwa langganan Anda disetel dengan benar.

{# wf_updated_on: 2016-10-19T18:28:32Z #}
{# wf_published_on: 2016-01-01 #}


# Men-debug Service Worker {: .page-title }

{% include "web/_shared/contributors/robdodson.html" %}



## Pengantar




Service Worker memberikan developer kemampuan luar biasa untuk menangani jaringan turun-naik dan membuat aplikasi web pertama yang benar-benar offline. Namun menjadi sebuah teknologi baru berarti ini kadang-kadang sulit di-debug, terutama saat kami menunggu alat kami mengejar ketertinggalan.

Codelab ini akan memandu Anda membuat Service Worker dasar dan menunjukkan cara menggunakan panel Application baru di Chrome DevTools untuk men-debug dan memeriksa worker.

### Apa yang akan kita bangun?

![6ffdd0864a80600.png](img/6ffdd0864a80600.png)

Dalam code lab ini, Anda akan bekerja dengan aplikasi web progresif yang sangat sederhana dan mempelajari teknik yang bisa digunakan dalam aplikasi Anda sendiri ketika mengalami masalah.

Karena code lab ini berfokus pada pembelajaran terhadap alat, jangan ragu untuk berhenti pada beberapa titik dan bereksperimen. Bermainlah dengan kode, segarkan laman, buka tab baru, dll. Cara terbaik untuk mempelajari alat debugging adalah dengan merusak sesuatu dan kemudian bekerja keras memperbaikinya.

### Apa yang akan Anda pelajari

* Cara memeriksa Service Worker dengan panel Application
* Cara mengeksplorasi Cache dan IndexedDB
* Cara menyimulasikan kondisi jaringan yang berbeda
* Cara menggunakan pernyataan debugger dan breakpoint untuk men-debug Service Worker
* Cara menyimulasikan kejadian Push

### Apa yang Anda butuhkan

* Chrome 52 atau di atasnya
* Pasang [Web Server for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb), atau gunakan server web pilihan Anda.
* Kode contoh
* Editor teks
* Pengetahuan dasar tentang HTML, CSS dan JavaScript

Codelab ini berfokus pada debugging Service Worker dan mengasumsikan beberapa pengetahuan dasar tentang bekerja dengan Service Worker. Beberapa konsep yang dipoles atau diblokir kodenya (misalnya gaya atau JavaScript yang tidak-relevan) disediakan bagi Anda cukup dengan salin dan tempel. Jika Anda baru dalam dunia Service Worker pastikan untuk [membaca API Primer](/web/fundamentals/primers/service-worker/) sebelum melanjutkan.


## Persiapan




### Mengunduh Kode

Anda bisa mengunduh semua kode untuk codelab ini, dengan mengeklik tombol berikut:

[Tautan](https://github.com/googlecodelabs/debugging-service-workers/archive/master.zip)

Mengekstrak file zip yang diunduh. Ini akan mengekstrak folder root (`debugging-service-workers-master`), yang berisi satu folder untuk setiap langkah codelab, bersama dengan semua sumber daya yang Anda butuhkan.

Folder `step-NN` berisi status akhir yang diinginkan dari setiap langkah codelab ini. Folder tersebut digunakan sebagai referensi. Kita akan melakukan semua pekerjaan pengkodean di direktori yang disebut `work`.

### Memasang dan memverifikasi server web

Meskipun Anda bebas menggunakan server web sendiri, codelab ini dirancang untuk bekerja dengan baik bersama Server Web Chrome. Jika Anda belum memasang aplikasi tersebut, Anda bisa memasangnya dari Toko Web Chrome.

[Tautan](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)

Setelah memasang aplikasi Web Server for Chrome, klik pada pintasan Apps di bilah bookmark: 

![9efdf0d1258b78e4.png](img/9efdf0d1258b78e4.png)

Pada jendela berikutnya, klik ikon Web Server: 

![dc07bbc9fcfe7c5b.png](img/dc07bbc9fcfe7c5b.png)

Berikutnya, Anda akan melihat dialog ini, yang memungkinkan Anda mengonfigurasi server web lokal:

![433870360ad308d4.png](img/433870360ad308d4.png)

Klik tombol __choose folder__, dan pilih folder `work`. Ini memungkinkan Anda untuk menyajikan pekerjaan yang sedang berlangsung melalui URL yang disorot dalam dialog server web (di bagian __Web Server URL(s)__).

Di bawah Options, centang kotak di sebelah "Automatically show index.html", seperti yang ditampilkan di bawah ini:

![8937a38abc57e3.png](img/8937a38abc57e3.png)

Kemudian berhenti dan restart server dengan menggeser toggle yang berlabel "Web Server: STARTED" ke kiri dan kemudian kembali ke kanan.

![daefd30e8a290df5.png](img/daefd30e8a290df5.png)

Sekarang kunjungi situs pekerjaan dalam browser web Anda (dengan mengeklik Web Server URL yang disorot) dan Anda akan melihat laman yang terlihat seperti ini:

![693305d127d9fe80.png](img/693305d127d9fe80.png)

Jelas sekali, aplikasi ini belum melakukan sesuatu yang menarik. Kita akan menambahkan fungsionalitas sehingga kita bisa memverifikasi bahwa ini bekerja secara offline di langkah berikutnya. 


## Memperkenalkan tab Application




### Memeriksa Manifes

Membangun Progressive Web App memerlukan perpaduan sejumlah teknologi inti yang berbeda, termasuk Service Worker dan Manifes Aplikasi Web, serta teknologi pendukung, seperti Cache Storage API, IndexedDB, dan Pemberitahuan Push. Untuk memberi kemudahan bagi developer agar mendapatkan tampilan yang terkoordinasi untuk setiap teknologi, Chrome DevTools telah memasukkan pemeriksa untuk masing-masing teknologi dalam panel Application yang baru.

* Buka Chrome DevTools dan klik pada tab yang bertuliskan __Application__.

![b380532368b4f56c.png](img/b380532368b4f56c.png)

Lihat di bilah sisi dan perhatikan bahwa __Manifest__ saat ini sedang disorot. Tampilan ini menunjukkan informasi penting yang berkaitan dengan file `manifest.json` seperti nama aplikasi, URL awal, ikon, dll.

Meskipun kita tidak akan membahasnya dalam codelab ini, perhatikan bahwa ada tombol __Add to homescreen__ yang bisa digunakan untuk menyimulasikan pengalaman menambahkan aplikasi ke homescreen pengguna.

![56508495a6cb6d8d.png](img/56508495a6cb6d8d.png)

### Memeriksa Service Worker

Di masa lalu, pemeriksaan Service Worker mengharuskan pembongkaran internal Chrome dan yang pasti bukanlah pengalaman pengguna yang paling ramah. Semua itu berubah dengan tab __Application__ yang baru!

* Klik pada item menu __Service Workers__ di bawah item __Manifest__ yang saat ini dipilih

![3dea544e6b44979d.png](img/3dea544e6b44979d.png)

Tampilan __Service Workers__ memberikan informasi tentang Service Worker yang aktif dalam posisinya saat ini. Di sepanjang baris atas ada serangkaian kotak centang.

* __Offline __- Akan menyimulasikan saat terputus dari jaringan. Hal ini berguna untuk dengan cepat memverifikasi bahwa penangan fetch Service Worker Anda bekerja dengan benar.
* __Update on reload__ - Akan memaksa Service Worker saat ini agar diganti oleh Service Worker baru (jika developer telah membuat pembaruan untuk `service-worker.js`). Biasanya browser akan menunggu sampai pengguna menutup semua tab yang berisi situs ini sebelum memperbarui ke Service Worker yang baru.
* __Bypass for network__ - Akan memaksa browser untuk mengabaikan Service Worker aktif dan mengambil sumber daya dari jaringan. Hal ini sangat berguna dalam situasi saat Anda ingin bekerja pada CSS atau JavaScript dan tidak perlu mengkhawatirkan tentang Service Worker yang secara tidak sengaja melakukan caching dan mengembalikan file lama.
* __Show all__ - Akan menampilkan daftar semua Service Worker aktif tidak peduli posisinya.

Di bawah ini Anda akan melihat informasi yang berkaitan dengan Service Worker yang aktif saat ini (jika ada). Salah satu bidang yang paling berguna adalah bidang __Status__, yang menunjukkan status Service Worker saat ini. Karena ini adalah pertama kalinya aplikasi dimulai, Service Worker berhasil dipasang dan diaktifkan, sehingga menampilkan lingkaran hijau untuk menunjukkan bahwa semuanya berjalan baik.

Perhatikan nomor ID di sebelah indikator status berwarna hijau. Itu adalah ID untuk Service Worker yang sedang aktif. Ingat atau tuliskan hal tersebut karena kami akan menggunakannya untuk perbandingan sebentar lagi.

* Dalam editor teks Anda, buka file `service-worker.js`

Kode untuk Service Worker saat ini cukup sederhana, hanya beberapa log konsol.

    self.addEventListener('install', function(event) {
      console.log('Service Worker installing.');
    });
    
    self.addEventListener('activate', function(event) {
      console.log('Service Worker activating.');  
    });

Jika Anda beralih lagi ke DevTools dan melihat di Konsol, Anda bisa melihat bahwa kedua log telah dihasilkan dengan sukses.

![5fcfd389f5357c09.png](img/5fcfd389f5357c09.png)

Mari kita memperbarui kode bagi `service-worker.js` untuk melihatnya melalui perubahan daur hidup.

* Lakukan pembaruan komentar di `service-worker.js` sehingga mereka berisi pesan baru

    self.addEventListener('install', function(event) {
      console.log('A *new* Service Worker is installing.');
    });
    
    self.addEventListener('activate', function(event) {
      console.log('Finally active. Ready to start serving content!');  
    });

* Segarkan laman dan buka konsol di DevTools

Konsol membuat log `A *new* Service Worker is installing.` namun tidak menunjukkan pesan ke-2 tentang Service Worker baru yang sedang aktif.

* Beralih ke tab Application di DevTools

Pada tab Application sekarang ada dua indikator status, masing-masing merepresentasikan status dua Service Worker kita.

![2e41dbf21437944c.png](img/2e41dbf21437944c.png)

Perhatikan ID Service Worker pertama. Itu harus cocok dengan ID Service Worker asli. Ketika Anda memasang Service Worker baru, worker sebelumnya tetap aktif sampai waktu berikutnya pengguna mengunjungi laman.

Indikator status kedua menunjukkan Service Worker baru yang kami edit. Sekarang Service Worker ini dalam status menunggu.

Cara termudah untuk memaksa Service Worker baru agar aktif adalah dengan tombol __skipWaiting__.

![7a60e9ceb2db0ad2.png](img/7a60e9ceb2db0ad2.png)

* Klik tombol skipWaiting dan kemudian beralih ke Konsol

Perhatikan bahwa sekarang konsol mencatat log pesan dari penangan kejadian `activate`

`Finally active. Ready to start serving content!`


## Menjelajahi cache




Mengelola sendiri cache file offline Anda dengan Service Worker adalah kekuatan super yang luar biasa. Panel __Application__ yang baru memiliki beberapa alat yang berguna untuk menjelajahi dan memodifikasi sumber daya tersimpan yang bisa sangat membantu selama waktu development.

### Menambahkan caching untuk Service Worker Anda

Sebelum bisa memeriksa cache, Anda harus menulis sedikit kode untuk menyimpan beberapa file. Pre-caching file selama fase pemasangan Service Worker adalah teknik yang berguna untuk menjamin bahwa sumber daya penting tersedia bagi pengguna jika mereka kebetulan sedang offline. Mari kita mulai dari sana.

* Sebelum memperbarui `service-worker.js`, buka panel __Application__ DevTools, masuk ke menu __Service Workers__, dan centang kotak yang bertuliskan __Update on reload__

![d4bcfb0983246797.png](img/d4bcfb0983246797.png)

Trik berguna ini akan memaksa laman untuk menggunakan Service Worker terbaru, sehingga Anda tidak perlu mengeklik pilihan __skipWaiting__ setiap kali Anda ingin membuat perubahan terhadap Service Worker.

* Berikutnya, perbarui kode dalam `service-worker.js` sehingga terlihat seperti ini

```
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  '/styles/main.css',
  '/scripts/main.js',
  '/images/smiley.svg'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );  
});

self.addEventListener('activate', function(event) {
  console.log('Finally active. Ready to start serving content!');  
});
```

* Segarkan laman

Anda mungkin melihat sebuah Kesalahan muncul pada panel Application. Ini terlihat menakutkan, namun mengeklik tombol __details__ memperlihatkan bahwa itu hanyalah panel __Application__ yang memberi tahu bahwa Service Worker Anda yang lama secara paksa diperbarui. Karena itu memang tujuannya, ini sepenuhnya AMAN, namun bisa menjadi peringatan yang berguna sehingga Anda tidak lupa menonaktifkan kotak centang ketika Anda selesai mengedit file `service-worker.js`.

![a039ca69d2179199.png](img/a039ca69d2179199.png)

### Memeriksa Penyimpanan Cache

Perhatikan bahwa item menu __Cache Storage__ di panel __Application__ sekarang memiliki tanda sisipan yang menunjukkan bahwa itu dapat diluaskan.

* Klik untuk meluaskan menu __Cache Storage__, lalu klik `my-site-cache-v1`

![af2b3981c63b1529.png](img/af2b3981c63b1529.png)

Di sini Anda bisa melihat semua file yang di-cache oleh Service Worker. Jika Anda perlu menghapus file dari cache, Anda bisa klik-kanan di atasnya dan pilih opsi __delete__ dari menu konteks. Demikian pula, Anda bisa menghapus seluruh cache dengan mengeklik-kanan pada `my-site-cache-v1` dan memilih delete.

![5c8fb8f7948066e6.png](img/5c8fb8f7948066e6.png)

### Membersihkan slate

Seperti yang mungkin Anda perhatikan, bersama dengan __Cache Storage__, ada sejumlah item menu lain yang berkaitan dengan sumber daya yang tersimpan, termasuk: Local Storage, Session Storage, IndexedDB, Web SQL, Cookies, dan Application Cache ("AppCache"). Memiliki kontrol granular dari masing-masing sumber daya ini dalam satu panel akan sangat berguna! Namun jika Anda berada dalam sebuah skenario di mana Anda ingin menghapus semua sumber daya yang tersimpan, pasti akan sangat melelahkan bila harus mengunjungi setiap item menu dan menghapus isinya. Sebagai gantinya, Anda bisa menggunakan opsi __Clear storage__ untuk membersihkan slate dalam satu gerakan (perhatikan bahwa ini juga akan membatalkan pendaftaran semua Service Worker).

* Pilih opsi menu __Clear storage__
* Klik tombol __Clear site data__ untuk menghapus semua sumber daya yang tersimpan

![59838a73a2ea2aaa.png](img/59838a73a2ea2aaa.png)

Jika Anda kembali dan mengeklik `my-site-cache-v1`, Anda sekarang akan melihat bahwa semua file yang tersimpan telah dihapus.

![317d24238f05e69c.png](img/317d24238f05e69c.png)

__Ada apa dengan roda gigi?__

Karena Service Worker mampu membuat permintaan jaringan sendiri, akan sangat berguna saat bisa mengidentifikasi lalu lintas jaringan yang berasal dari worker itu sendiri.

* Selagi `my-site-cache-v1` masih kosong, beralihlah ke panel Network
* Segarkan laman

Pada panel Network, Anda akan melihat serangkaian permintaan awal untuk file seperti `main.css`, diikuti oleh ronde permintaan kedua, dengan awalan ikon roda gigi, yang tampaknya mengambil aset yang sama.

![2ba393cf3d41e087.png](img/2ba393cf3d41e087.png)

Ikon roda gigi menandakan bahwa permintaan tersebut datang dari Service Worker itu sendiri. Secara khusus, ini adalah permintaan yang dibuat oleh penangan `install` Service Worker untuk mengisi cache offline.


## Menyimulasikan kondisi jaringan yang berbeda




Salah satu fitur luar biasa dari Service Worker adalah kemampuan mereka untuk menyajikan materi yang di-cache untuk pengguna bahkan ketika mereka offline. Untuk memverifikasi semuanya bekerja seperti yang direncanakan, mari kita menguji beberapa alat throttling jaringan yang disediakan Chrome.

### Menyajikan permintaan saat offline

Agar bisa menyajikan materi offline, Anda harus menambahkan penangan `fetch` untuk `service-worker.js` Anda

* Tambahkan kode berikut ke `service-worker.js` setelah penangan `activate`

```
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
```

* Beralihlah ke panel __Application__ dan verifikasi bahwa __Update on reload__ masih tercentang
* Segarkan laman untuk memasang Service Worker yang baru
* Hapus centang __Update on reload__
* Centang __Offline__

Panel __Application__ Anda akan terlihat seperti ini sekarang:

![873b58278064b627.png](img/873b58278064b627.png)

Perhatikan bahwa panel __Network__ sekarang memiliki tanda peringatan berwarna kuning untuk menunjukkan bahwa Anda sedang offline (dan untuk mengingatkan bahwa Anda harus menghapus centang pada kotak centang jika ingin melanjutkan pengembangan dengan jaringan).

Dengan penangan `fetch` sudah di tempatnya, dan aplikasi Anda disetel ke __Offline__, sekarang adalah momen yang menentukan. Segarkan laman dan jika semuanya berjalan dengan baik, Anda seharusnya tetap bisa melihat materi situs, meskipun tidak ada yang datang dari jaringan. Anda bisa beralih ke panel __Network__ untuk memverifikasi bahwa semua sumber daya yang disajikan berasal dari Cache Storage. Perhatikan pada kolom __Size__, diberitahukan bahwa sumber daya tersebut datang `(from Service Worker)`. Sinyal tersebut yang memberi tahu kita bahwa Service Worker mencegat permintaan, dan menyajikan respons dari cache bukannya mengakses jaringan.

![a6f485875ca088db.png](img/a6f485875ca088db.png)

Anda akan melihat bahwa ada permintaan yang gagal (seperti untuk Service Worker baru atau `manifest.json`). Hal tersebut bukanlah sebuah masalah dan bisa diperkirakan.

### Pengujian jaringan lambat atau naik-turun

Karena kita sebagai pengguna perangkat seluler mendapat banyak kualitas koneksi yang berbeda, kita terus bergerak di antara berbagai status konektivitas. Tidak hanya itu, ada banyak tempat di dunia yang kecepatan standar jaringannya adalah 3G dan 2G. Untuk memverifikasi bahwa aplikasi kita bekerja dengan baik untuk pengguna ini, kita harus menguji bahwa aplikasi tetap berkinerja tinggi bahkan pada koneksi lambat.

Untuk memulai, mari kita menyimulasikan bagaimana aplikasi akan berfungsi pada jaringan yang lambat ketika Service Worker tidak bekerja.

* Dari panel __Application__, hapus centang __Offline__
* Centang __Bypass for network__

![739dc5811e4aa937.png](img/739dc5811e4aa937.png)

Opsi __Bypass for network__ akan memberi tahu browser untuk melewati service worker saat dibutuhkan untuk membuat permintaan jaringan. Ini berarti tidak akan ada yang bisa datang dari Cache Storage, ini seperti jika kita sama sekali tidak memasang Service Worker.

* Berikutnya, beralih ke panel __Network__
* Gunakan menu tarik-turun __Network Throttle__ untuk menyetel kecepatan jaringan ke `Regular 2G`

Menu tarik-turun __Network Throttle__ terletak di bagian kanan atas panel __Network__, tepat di sebelah kotak centang __Offline__ pada panel __Network__. Secara default ini disetel ke `No throttling`.

![c59b54a853215598.png](img/c59b54a853215598.png)

* Dengan kecepatan disetel ke `Regular 2G`, segarkan laman

Perhatikan bahwa waktu respons meningkat tinggi! Sekarang setiap aset membutuhkan waktu beberapa ratus milidetik untuk diunduh.

![70e461338a0bb051.png](img/70e461338a0bb051.png)

Mari kita lihat bagaimana keadaan bisa berbeda bila Service Worker kembali diaktifkan.

* Dengan jaringan masih disetel ke `Regular 2G`, beralihlah kembali ke tab __Application__
* Hapus centang pada kotak centang __Bypass for network__
* Beralih kembali ke panel __Network__
* Segarkan laman

Sekarang waktu respons menjadi super cepat hanya beberapa milidetik per sumber daya. Untuk pengguna di jaringan lambat, ini adalah perbedaan seperti malam dan siang!

![f0f6d3b0a1b1f18d.png](img/f0f6d3b0a1b1f18d.png)


## Ingat, ini hanyalah JavaScript




Service Worker bisa terasa seperti keajaiban, namun pada dasarnya mereka hanyalah file JavaScript biasa. Ini berarti Anda bisa menggunakan alat yang ada seperti pernyataan `debugger` dan breakpoint untuk mendebug-nya.

### Bekerja dengan debugger

Banyak developer mengandalkan `console.log()` lama yang bagus ketika mereka memiliki masalah dengan aplikasi. Tapi ada alat (bantu) yang jauh lebih kuat yang tersedia di toolbox: `debugger`.

Menambahkan satu baris ini ke kode Anda akan menjeda eksekusi dan membuka panel __Sources__ di DevTools. Dari sini Anda bisa melangkah melalui fungsi, memeriksa objek, dan bahkan menggunakan konsol untuk menjalankan perintah terhadap cakupan saat ini. Ini sangat berguna terutama untuk men-debug Service Worker yang rewel.

Untuk mengujinya, mari kita men-debug penangan `install` kita.

* Tambahkan pernyataan `debugger` ke awal penangan `install` Anda di `service-worker.js`

```
self.addEventListener('install', function(event) {
  debugger;
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );  
});
```

* Dari panel __Application__, segarkan laman
* Klik pada __skipWaiting__ untuk mengaktifkan Service Worker baru
* Segarkan laman lagi untuk mengizinkan penangan `fetch` berjalan

Aplikasi akan menjeda eksekusi dan beralih panel ke __Sources__ dengan pernyataan `debugger` sekarang disorot di `service-worker.js`.

![d960b322c020d6cc.png](img/d960b322c020d6cc.png)

Ada banyak sekali alat berguna yang tersedia dalam tampilan ini. Salah satu alat (bantu) tersebut adalah pemeriksa __Scope__, yang memungkinkan kita melihat status objek sekarang dalam cakupan fungsi saat ini.

* Klik pada menu tarik-turun `event: ExtendableEvent`

![5116146f838a566.png](img/5116146f838a566.png)

Dari sini Anda bisa mempelajari segala macam informasi yang berguna tentang objek dalam-cakupan saat ini. Misalnya, melihat bidang `type` Anda bisa memverifikasi bahwa objek kejadian saat ini adalah untuk kejadian `install`.

### Menggunakan breakpoint sebagai gantinya

Bila Anda sudah memeriksa kode di panel __Sources__, Anda mungkin akan lebih mudah menyetel breakpoint, dibandingkan menambahkan pernyataan `debugger` ke file Anda yang sesungguhnya. Sebuah breakpoint mempunyai tujuan yang sama (membekukan eksekusi dan memungkinkan Anda memeriksa aplikasi) namun bisa disetel dari dalam DevTools.

Untuk menyetel breakpoint, Anda harus mengeklik nomor baris tempat Anda menginginkan aplikasi menghentikan eksekusi.

* Dari panel __Sources__, gulir bawah ke baris 25 dari `service-worker.js` dan klik pada nomor baris

![da7b5f76723ca525.png](img/da7b5f76723ca525.png)

Ini akan menyetel breakpoint pada awal penangan `fetch` sehingga Anda bisa memeriksa objek kejadiannya.

* Segarkan laman

Perhatikan bahwa, mirip dengan ketika Anda menggunakan pernyataan `debugger`, eksekusi kini berhenti pada baris dengan breakpoint. Ini berarti Anda sekarang bisa memeriksa objek `FetchEvent` yang melewati aplikasi Anda dan menentukan sumber daya yang diminta.

* Dalam pemeriksa __Scope__, luaskan objek `event`
* Luaskan objek `request`
* Perhatikan properti `url`

![f9b0c00237b4400d.png](img/f9b0c00237b4400d.png)

Anda bisa melihat bahwa `FetchEvent` meminta sumber daya pada `http://127.0.0.1:8887/`, yang merupakan `index.html` kita. Karena aplikasi menangani banyak permintaan `fetch`, Anda bisa meninggalkan breakpoint di tempatnya dan melanjutkan eksekusi. Ini akan memungkinkan Anda memeriksa setiap `FetchEvent` saat melewati aplikasi. Teknik yang sangat berguna untuk memeriksa dengan sangat detail semua permintaan dalam aplikasi Anda.

* Tekan tombol __Resume__ untuk mengizinkan eksekusi skrip dilanjutkan

![ce7b5e8df4e8bc07.png](img/ce7b5e8df4e8bc07.png)

Setelah beberapa saat, eksekusi akan berhenti sebentar pada breakpoint yang sama. Periksa properti `event.request.url` dan perhatikan bahwa itu sekarang menampilkan `http://127.0.0.1:8887/styles/main.css`. Anda bisa melanjutkan cara ini untuk melihatnya meminta `smiley.svg`, `main.js`, dan yang terakhir `manifest.json`.


## Menguji pemberitahuan Push




Pemberitahuan push adalah bagian penting dari menciptakan pengalaman yang menarik. Karena notifikasi memerlukan koordinasi antara server aplikasi, layanan pesan (seperti Google Cloud Messaging), dan Service Worker Anda, ada baiknya menguji Service Worker secara tersendiri terlebih dulu untuk memverifikasi bahwa itu telah disetel dengan benar.

### Menambahkan dukungan Push

Anda mungkin memerhatikan tombol di tengah aplikasi yang meminta pengguna untuk __Subscribe for Push Notifications__. Tombol ini sudah disambungkan untuk meminta izin pemberitahuan Push dari pengguna saat diklik.

![3e7f08f9d8c1fc5c.png](img/3e7f08f9d8c1fc5c.png)

Satu-satunya langkah yang tersisa adalah menambahkan dukungan untuk kejadian `push` ke `service-worker.js`.

* Buka `service-worker.js` dan tambahkan baris berikut setelah penangan `fetch`

```
self.addEventListener('push', function(event) {  
  var title = 'Yay a message.';  
  var body = 'We have received a push message.';  
  var icon = '/images/smiley.svg';  
  var tag = 'simple-push-example-tag';
  event.waitUntil(  
    self.registration.showNotification(title, {  
      body: body,  
      icon: icon,  
      tag: tag  
    })  
  );  
});
```

Dengan penangan sudah siap, sangat mudah untuk menyimulasikan kejadian Push.

* Buka panel __Application__
* Segarkan laman, ketika Anda melihat Service Worker baru memasuki fase `waiting`, klik tombol __skipWaiting__
* Klik tombol __Subscribe to Push Notifications__
* Menyetujui konfirmasi izin

![a8a8fa8d35b0667a.png](img/a8a8fa8d35b0667a.png)

* Terakhir, klik tombol __Push__, di sebelah __Update__ dan __Unregister__

![eacd4c5859f5f3ff.png](img/eacd4c5859f5f3ff.png)

Sekarang Anda bisa melihat pemberitahuan Push muncul di bagian kanan atas layar, yang memastikan bahwa Service Worker menangani kejadian `push` seperti yang diharapkan.

![b552ed129bc6cdf6.png](img/b552ed129bc6cdf6.png)

Kerja bagus!

Sekarang setelah Anda memiliki beberapa alat debugging dalam toolbox, Anda sudah mempunyai alat yang lengkap untuk memperbaiki setiap masalah yang muncul dalam proyek Anda. Satu-satunya yang tersisa bagi Anda adalah segera beraksi dan membangun Progressive Web App yang luar biasa!





## Menemukan masalah, atau memiliki masukan? {: .hide-from-toc }
Bantu kami menjadikan code lab lebih baik dengan mengirimkan 
[masalah](https://github.com/googlecodelabs/debugging-service-workers/issues) hari ini. Dan terima kasih!

{# wf_devsite_translation #}
