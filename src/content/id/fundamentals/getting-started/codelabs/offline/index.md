project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Pelajari cara mengintegrasikan service worker ke aplikasi yang ada untuk membuat aplikasi itu bekerja offline.

{# wf_updated_on: 2016-11-09T18:31:19Z #}
{# wf_published_on: 2016-01-01 #}


# Menambahkan Service Worker dan Offline ke Aplikasi Web Anda {: .page-title }

{% include "web/_shared/contributors/paulkinlan.html" %}



## Ringkasan



![9246b0abd8d860da.png](img/9246b0abd8d860da.png)

Dalam codelab ini, Anda mempelajari cara mengintegrasikan service worker ke aplikasi yang sudah ada agar aplikasi bisa bekerja secara offline. Aplikasi ini disebut  [AirHorner](https://airhorner.com). Klik terompet dan itu akan bersuara.

#### Apa yang akan Anda pelajari

* Cara menambahkan service worker dasar ke proyek yang sudah ada.
* Cara menyimulasikan mode offline dan memeriksa serta men-debug service worker dengan Chrome DevTools.
* Strategi caching offline sederhana.

#### Apa yang Anda butuhkan

* Chrome 52 atau di atasnya.
* Pemahaman dasar tentang  [Promises](/web/fundamentals/getting-started/primers/promises), Git, dan Chrome DevTools.
* Kode contoh.
* Editor teks.
* Server web lokal. Jika Anda ingin menggunakan server web yang dijelaskan dalam codelab ini, Anda harus memasang Python pada baris perintah.


## Mendapatkan kode contoh



Membuat duplikat repositori GitHub dari baris perintah melalui SSH:

    $ git clone git@github.com:GoogleChrome/airhorn.git

Atau HTTPS:

    $ git clone https://github.com/GoogleChrome/airhorn.git


## Menjalankan contoh aplikasi



Pertama, mari kita lihat seperti apa contoh aplikasi yang sudah selesai (petunjuk: itu menakjubkan). 

Pastikan Anda berada di cabang yang benar (final) dengan memeriksa cabang `master`.

    $ git checkout master

Jalankan situs dari server web lokal.  Anda bisa menggunakan setiap server web, namun untuk codelab selanjutnya kita akan berasumsi bahwa Anda menggunakan `SimpleHTTPServer` Python pada port 3000, sehingga aplikasi akan tersedia dari `localhost:3000`.

    $ cd app
    $ python -m SimpleHTTPServer 3000

Bukalah situs di Chrome. Anda akan melihat: ![9246b0abd8d860da.png](img/9246b0abd8d860da.png)


## Menguji aplikasi



Klik terompet. Itu akan bersuara.

Sekarang, Anda akan menyimulasikan secara offline menggunakan Chrome DevTools.

Buka DevTools, masuk ke panel __Application__, dan aktifkan kotak centang __Offline __. Dalam tangkapan layar di bawah, mouse diarahkan ke atas kotak centang. 

![479219dc5f6ea4eb.png](img/479219dc5f6ea4eb.png)

Setelah mengeklik kotak centang, perhatikan ikon peringatan (segitiga kuning dengan tanda seru) di sebelah tab panel __Network __. Ini menunjukkan bahwa Anda offline. 

Untuk membuktikan bahwa Anda offline, buka  [https://google.com](https://google.com). Anda akan melihat pesan kesalahan "there is no Internet connection" dari Chrome. 

Sekarang, kembali ke aplikasi Anda. Meskipun Anda offline, laman seharusnya masih bisa dimuat ulang sepenuhnya. Anda tetap bisa menggunakan terompet.

Alasan ini berfungsi offline adalah dasar dari codelab ini: dukungan offline dengan service worker.


## Membangun aplikasi starter



Anda sekarang akan membuang semua dukungan offline dari aplikasi dan Anda akan mempelajari cara menggunakan service worker untuk menambahkan dukungan offline kembali ke dalam aplikasi

Lihat versi "rusak" dari aplikasi yang tidak mengimplementasikan service worker.

    $ git checkout code-lab

Kembali ke panel __Application __DevTools dan nonaktifkan kotak centang __Offline __, sehingga Anda kembali online.

Jalankan halaman. Aplikasi akan bekerja sesuai harapan.

Sekarang, gunakan DevTools untuk menyimulasikan lagi mode offline (dengan mengaktifkan kotak centang __Offline __di panel __Application __). __Bersiaplah!__ Bila Anda tidak tahu banyak tentang service worker, Anda akan melihat beberapa perilaku yang tidak diharapkan.

Apa yang bisa Anda lihat? Nah, karena Anda offline dan karena versi aplikasi ini tidak memiliki service worker, Anda akan melihat pesan kesalahan khas "there is no Internet connection" dari Chrome.

Tapi yang Anda lihat adalah... aplikasi offline yang berfungsi secara penuh!

![9246b0abd8d860da.png](img/9246b0abd8d860da.png)

Apa yang terjadi? Nah, ingat bahwa ketika Anda memulai codelab ini, Anda mencoba versi aplikasi lengkap. Ketika Anda menjalankan versi itu, aplikasi sebenarnya memasang service worker. Sekarang service worker itu berjalan secara otomatis setiap kali Anda menjalankan aplikasi. Setelah service worker dipasang ke dalam cakupan seperti `localhost:3000` (Anda akan mengetahui selengkapnya tentang cakupan pada bagian berikutnya), service worker secara otomatis dijalankan setiap kali Anda mengakses cakupan tersebut, kecuali Anda menghapusnya secara terprogram atau manual. 

Untuk memperbaiki ini, masuk ke panel __Application __DevTools, klik tab __Service Workers __, kemudian klik tombol __Unregister __. Dalam tangkapan layar di bawah, mouse diarahkan ke atas tombol. 

![837b46360756810a.png](img/837b46360756810a.png)

Sekarang, sebelum memuat ulang situs, pastikan bahwa Anda masih menggunakan DevTools untuk menyimulasikan mode offline. Muat ulang laman tersebut, dan itu akan menampilkan pesan kesalahan "there is no Internet connection" seperti yang diduga.

![da11a350ed38ad2e.png](img/da11a350ed38ad2e.png)


## Mendaftarkan service worker pada situs



Sekarang saatnya menambahkan kembali dukungan offline ke aplikasi. Ini terdiri dari dua langkah:

1. Buat file JavaScript yang akan menjadi service worker.
2. Perintahkan browser untuk mendaftarkan file JavaScript sebagai "service worker".

Pertama, buat file kosong bernama `sw.js` dan tempatkan di folder `/app`. 

Sekarang buka `index.html` dan tambahkan kode berikut ke bagian bawah `<body>`.

```
<script>
if('serviceWorker' in navigator) {
  navigator.serviceWorker
           .register('/sw.js')
           .then(function() { console.log("Service Worker Registered"); });
}
</script>
```

Skrip akan memeriksa bila browser mendukung service worker. Jika memang mendukung, maka itu mendaftarkan file kita yang saat ini kosong `sw.js` sebagai service worker, kemudian melakukan log ke Konsol.

Sebelum menjalankan situs Anda lagi, kembali ke DevTools dan lihat tab __Service Workers __dari panel __Application __. Saat ini seharusnya itu kosong, yang berarti bahwa tidak ada service worker yang dipasang pada situs tersebut. 

![37d374c4b51d273.png](img/37d374c4b51d273.png)

Pastikan kotak centang __Offline __ di DevTools dinonaktifkan. Muat ulang lagi laman Anda. Saat laman memuat, Anda bisa melihat bahwa sebuah service worker telah didaftarkan.

![b9af9805d4535bd3.png](img/b9af9805d4535bd3.png)

Di sebelah label __Source __Anda bisa melihat tautan ke kode sumber dari service worker yang didaftarkan. 

![3519a5068bc773ea.png](img/3519a5068bc773ea.png)

Bila Anda ingin memeriksa service worker yang saat ini dipasang di laman, klik pada tautan. Ini akan menunjukkan kepada Anda kode sumber dari service worker di panel __Sources __ dari DevTools. Misalnya, klik sekarang pada tautan, dan Anda akan melihat file kosong. 

![dbc14cbb8ca35312.png](img/dbc14cbb8ca35312.png)


## Memasang aset situs



Dengan service worker telah didaftarkan, saat pertama kali pengguna membuka laman sebuah kejadian `install` dipicu. Kejadian ini adalah saat untuk meng-cache aset laman Anda.

Tambahkan kode berikut ke sw.js.

```
importScripts('/cache-polyfill.js');


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
```

Baris pertama menambahkan polyfill Cache. Polyfill ini sudah termasuk dalam repositori. Kita harus menggunakan polyfill karena Cache API belum sepenuhnya didukung di semua browser. Berikutnya adalah event listener `install`. Event listener `install` membuka objek `caches` dan kemudian mengisinya dengan daftar sumber daya yang ingin kita cache. Satu yang perlu diperhatikan dari operasi `addAll` adalah bahwa operasi ini bersifat semua atau tidak sama sekali. Bila salah satu file tidak ada atau gagal diambil, seluruh operasi `addAll` akan gagal. Aplikasi yang baik akan mengatasi skenario ini.

Langkah berikutnya adalah memprogram service worker kita untuk mengembalikan cegatan permintaan ke setiap sumber daya ini dan menggunakan objek `caches` untuk mengembalikan versi yang disimpan secara lokal dari masing-masing sumber daya.


## Mencegat permintaan laman web



Salah satu fitur yang kuat dari service worker adalah bahwa, setelah service worker mengontrol laman, itu bisa mencegat setiap permintaan yang dibuat laman dan memutuskan apa yang harus dilakukan dengan permintaan tersebut. Pada bagian ini Anda akan memprogram service worker untuk mencegat permintaan dan mengembalikan versi ter-cache dari aset, daripada masuk ke jaringan untuk mengambilnya.

Langkah pertama adalah menyematkan penangan kejadian untuk kejadian `fetch`. Kejadian ini dipicu untuk setiap permintaan yang dibuat.

Tambahkan kode berikut ke bagian bawah `sw.js` Anda untuk mencatat permintaan yang dibuat dari laman induk.

Mari kita menguji ini. __Bersiaplah!__ Anda akan melihat lebih banyak perilaku service worker yang tak terduga. 

Buka DevTools dan masuk ke panel __Application__. Kotak centang __Offline __seharusnya dinonaktifkan. Tekan tombol `Esc` untuk membuka laci __Console __di bagian bawah jendela DevTools. Jendela DevTools Anda akan terlihat mirip dengan tangkapan layar berikut:

![c96de824be6852d7.png](img/c96de824be6852d7.png)

Muat ulang laman Anda sekarang dan lihat lagi jendela DevTools. Kesatu, kita menduga akan melihat sekelompok permintaan di-log ke Konsol, namun itu tidak terjadi. Kedua, di panel __Service Worker __bisa kita lihat bahwa __Status __telah berubah:

![c7cfb6099e79d5aa.png](img/c7cfb6099e79d5aa.png)

Dalam __Status __ada sebuah service worker baru yang menunggu diaktifkan. Itu adalah service worker baru yang menyertakan perubahan yang baru saja kita buat. Jadi, untuk beberapa alasan, service worker lama yang kami pasang (yang hanya file kosong) masih mengontrol laman. Bila Anda mengeklik tautan `sw.js` di sebelah __Source __Anda bisa memverifikasi bahwa service worker lama masih berjalan. 

Untuk mengatasi ketidaknyamanan ini, aktifkan kotak centang __Update on reload__.

![26f2ae9a805bc69b.png](img/26f2ae9a805bc69b.png)

Ketika kotak centang ini diaktifkan, DevTools selalu memperbarui service worker setiap kali laman dimuat ulang. Hal ini sangat berguna ketika secara aktif mengembangkan service worker.

Muat ulang laman tersebut sekarang dan Anda bisa melihat bahwa sebuah service worker baru dipasang dan URL permintaan sedang di-log ke Konsol, seperti yang diharapkan.

![53c23650b131143a.png](img/53c23650b131143a.png)

Sekarang Anda perlu memutuskan apa yang harus dilakukan dengan semua permintaan itu. Secara default, jika Anda tidak melakukan apa-apa, permintaan akan diteruskan ke jaringan dan respons dikembalikan ke laman web.

Agar aplikasi Anda bekerja secara offline, Anda harus menarik permintaan dari cache, bila tersedia.

Perbarui event listener fetch agar cocok dengan kode di bawah ini.

Metode `event.respondWith()` memberi tahu browser untuk mengevaluasi hasil dari kejadian di masa mendatang. `caches.match(event.request)` mengambil permintaan web saat ini yang memicu kejadian fetch dan mencari dalam cache untuk sumber daya yang cocok. Pencocokan dilakukan dengan melihat string URL. Metode `match` mengembalikan promise yang terselesaikan bahkan jika file tersebut tidak ditemukan dalam cache. Ini berarti Anda mendapatkan pilihan tentang apa yang Anda lakukan. Dalam kasus sederhana, ketika file tidak ditemukan, Anda cukup `fetch` dari jaringan dan mengembalikannya ke browser.

Ini adalah skenario paling sederhana; ada banyak skenario caching lainnya. Misalnya, Anda bisa secara bertahap meng-cache semua respons untuk permintaan sebelumnya yang belum di-cache, sehingga di kemudian hari mereka semua bisa dikembalikan dari cache. 


## Selamat!



Anda sekarang memiliki dukungan offline. Muat ulang laman Anda saat masih online untuk memperbarui service worker ke versi terbaru, kemudian gunakan DevTools untuk masuk ke mode offline. Muat ulang lagi laman Anda, dan Anda akan memiliki air horn offline yang berfungsi secara penuh!

#### Apa yang sudah kita bahas

* Cara menambahkan service worker dasar ke proyek yang sudah ada.
* Cara menggunakan Chrome DevTools untuk menyimulasikan mode offline dan untuk memeriksa serta men-debug service worker.
* Strategi caching offline sederhana.

#### Langkah Berikutnya

* Pelajari cara mudah menambahkan  [dukungan offline dengan elemen offline Polymer](https://codelabs.developers.google.com/codelabs/sw-precache/index.html?index=..%2F..%2Findex#0)
* Jelajahi selengkapnya  [teknik caching lanjutan](https://jakearchibald.com/2014/offline-cookbook/)

#### Ketahui Selengkapnya

*  [Pengantar service worker](/web/fundamentals/primers/service-worker/)





## Menemukan masalah, atau memiliki masukan? {: .hide-from-toc }
Bantu kami menjadikan code lab lebih baik dengan mengirimkan 
[masalah](https://github.com/googlesamples/io2015-codelabs/issues) hari ini. Dan terima kasih!

{# wf_devsite_translation #}
