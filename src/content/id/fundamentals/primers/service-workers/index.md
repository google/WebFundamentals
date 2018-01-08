project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Pengalaman offline lengkap, sinkronisasi latar belakang berkala, pemberitahuan push&mdash;fungsionalitas yang biasanya memerlukan aplikasi asli&mdash;akan hadir di web. Service worker menyediakan fondasi teknis yang diperlukan oleh semua fitur ini.

{# wf_published_on: 2014-12-01 #}
{# wf_updated_on: 2016-01-18 #}

# Service Worker: Pengantar {: .page-title }

{% include "web/_shared/contributors/mattgaunt.html" %}

Pengalaman offline lengkap, sinkronisasi latar belakang berkala, pemberitahuan
push&mdash;fungsionalitas yang biasanya memerlukan
aplikasi asli&mdash;akan hadir di web. Service worker menyediakan fondasi
teknis yang diperlukan oleh semua fitur ini.

## Apa yang dimaksud dengan service worker

Service worker adalah skrip yang dijalankan browser Anda di latar belakang,
terpisah dari laman web, yang membuka pintu ke berbagai fitur yang tidak memerlukan laman
web atau interaksi pengguna. Saat ini, service worker sudah menyertakan berbagai fitur seperti 
[pemberitahuan push](/web/updates/2015/03/push-notifications-on-the-open-web) 
dan [sinkronisasi latar belakang](/web/updates/2015/12/background-sync). Di masa mendatang, 
service worker akan mendukung hal-hal lainnya seperti sinkronisasi berkala atau geofencing.
Fitur inti yang didiskusikan dalam tutorial adalah kemampuan mencegat dan 
menangani permintaan jaringan, termasuk mengelola cache 
respons lewat program.

Yang membuat API ini menarik adalah karena memungkinkan Anda mendukung pengalaman
offline, yang memberikan developer kontrol penuh atas
pengalaman.

Sebelum service worker, ada satu API lain yang memberi pengguna pengalaman offline
di web, yang disebut [AppCache](//www.html5rocks.com/en/tutorials/appcache/beginner/){: .external }.
Masalah utama pada AppCache adalah [jumlah gotcha](http://alistapart.com/article/application-cache-is-a-douchebag) 
yang ada serta fakta bahwa meskipun desain bekerja dengan sangat baik untuk laman aplikasi 
web tunggal, namun ternyata tidak begitu baik untuk situs multi-laman. Service worker telah didesain untuk 
menghindari titik-titik menyulitkan yang sudah umum ini.

Hal yang perlu diingat untuk service worker:

* Inilah [JavaScript Worker](//www.html5rocks.com/en/tutorials/workers/basics/){: .external },
  jadi tidak bisa mengakses DOM secara langsung. Melainkan, service worker bisa 
  berkomunikasi dengan laman yang dikontrolnya dengan merespons pesan yang dikirimkan lewat 
  antarmuka [postMessage](https://html.spec.whatwg.org/multipage/workers.html#dom-worker-postmessage) 
  dan laman yang bisa memanipulasi DOM jika diperlukan.
* Service worker adalah proxy jaringan yang bisa diprogram, yang memungkinkan 
  Anda mengontrol cara menangani permintaan jaringan dari laman.
* Service worker akan dihentikan bila tidak sedang digunakan, dan dimulai lagi saat diperlukan, 
  jadi Anda tidak bisa mengandalkan keadaan global dalam penangan `onfetch` dan 
  `onmessage` service worker. Jika ada informasi yang perlu dipertahankan dan 
  digunakan kembali saat memulai kembali, service worker tidak memiliki akses ke 
  [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).
* Service worker banyak menggunakan promise, jadi jika Anda masih baru dalam hal promise, 
  sebaiknya berhenti dulu membaca tulisan ini dan baca 
  [Promise, sebuah pengantar](/web/fundamentals/getting-started/primers/promises).

## Daur hidup service worker

Service worker memiliki daur hidup yang sepenuhnya terpisah dari laman web Anda.

Untuk memasang service worker bagi situs Anda, Anda perlu mendaftarkannya, yang Anda lakukan
di JavaScript laman Anda. Mendaftarkan service worker akan menyebabkan browser
memulai langkah pemasangan service worker di latar belakang.

Biasanya selama langkah pemasangan, Anda perlu meng-cache beberapa aset statis. Jika
semua file berhasil di-cache, maka service worker akan
terpasang. Jika ada file yang gagal diunduh dan di-cache, maka langkah pemasangan
akan gagal dan service worker tidak akan diaktifkan (yakni tidak akan dipasang). Jika
itu terjadi, jangan khawatir, coba lagi lain kali. Namun jika berhasil
dipasang, berarti aset statis sudah masuk cache.

Bila kita telah memasang, langkah aktivasi akan menyusul dan ini kesempatan
besar untuk menangani manajemen cache lama, yang akan kita bahas di
bagian pembaruan service worker.

Setelah langkah aktivasi, service worker akan mengontrol semua laman yang berada
dalam cakupannya, walaupun laman yang mendaftarkan service worker untuk
pertama kali tidak akan dikontrol hingga ia dimuat lagi. Setelah service worker
bisa dikontrol, ia akan berada dalam salah satu dari dua keadaan: yaitu service worker akan
dihentikan untuk menghemat memori, atau ia akan menangani kejadian fetch dan pesan yang terjadi
saat permintaan jaringan atau pesan dibuat dari laman Anda.

Di bawah ini adalah versi daur hidup service worker yang sangat disederhanakan saat
pemasangannya yang pertama.

![daur hidup service worker](imgs/sw-lifecycle.png)


## Prasyarat

### Dukungan browser

Pilihan browser semakin banyak. Service worker didukung oleh Firefox dan
Opera. Microsoft Edge sekarang 
[menunjukkan dukungan publik](https://developer.microsoft.com/en-us/microsoft-edge/platform/status/serviceworker/).
Bahkan Safari telah memberikan [petunjuk development mendatang](https://trac.webkit.org/wiki/FiveYearPlanFall2015).
Anda bisa mengikuti perkembangan semua browser di situs Jake Archibald 
[is Serviceworker ready](https://jakearchibald.github.io/isserviceworkerready/){: .external }.


### Anda perlu HTTPS

Selama development, Anda akan bisa menggunakan service worker melalui `localhost`, namun
untuk mengimplementasikannya di situs, Anda perlu menyiapkan HTTPS di server.

Menggunakan service worker Anda bisa membajak koneksi, menirukan, dan memfilter
respons. Fitur hebat. Walaupun kemampuan ini akan digunakan untuk kebaikan, namun tidak demikian dengan
Man-in-the-Middle. Untuk menghindarinya, Anda hanya bisa mendaftarkan service
worker pada laman yang disajikan melalui HTTPS, jadi kita tahu service worker yang diterima browser
belum dimodifikasi selama perjalanannya melalui jaringan.

[Github Pages](https://pages.github.com/){: .external } disajikan melalui HTTPS, jadi inilah
tempat yang bagus untuk menjadi host demo.

Jika ingin menambahkan HTTPS ke server maka Anda perlu mendapatkan sertifikat TLS 
dan menyiapkannya untuk server. Hal ini berbeda-beda sesuai dengan penyiapannya, 
jadi periksalah dokumentasi server Anda dan pastikan memeriksa 
[Mozilla SSL Configuration Generator](https://mozilla.github.io/server-side-tls/ssl-config-generator/) 
untuk praktik terbaik.

## Mendaftarkan service worker

Untuk memasang service worker, Anda perlu mengawali prosesnya dengan
**mendaftarkannya** di laman Anda. Ini akan memberi tahu browser di mana
file JavaScript service worker Anda berada.

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
          // Registration was successful
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }).catch(function(err) {
          // registration failed :(
          console.log('ServiceWorker registration failed: ', err);
        });
      });
    }

Kode ini memeriksa untuk mengetahui apakah API service worker tersedia, dan jika tersedia,
berarti service worker di `/sw.js` telah terdaftar
[setelah laman dimuat](/web/fundamentals/instant-and-offline/service-worker/registration).

Anda bisa memanggil `register()` setiap kali laman dimuat tanpa masalah; browser akan
mengetahui apakah service worker sudah terdaftar atau belum kemudian menangani
dengan semestinya.

Satu perbedaan kecil pada metode `register()` ini adalah lokasi
file service worker. Dalam hal ini Anda akan tahu apakah file service worker berada di domain
 akar. Ini berarti cakupan service worker adalah keseluruhan
asal. Dengan kata lain, service worker ini akan menerima kejadian `fetch` untuk
apa saja yang ada di domain ini. Jika kita mendaftarkan file service worker di
`/example/sw.js`, service worker nanti hanya akan melihat kejadian `fetch` untuk laman
yang URL-nya dimulai dengan `/example/` (yakni `/example/page1/`, `/example/page2/`).

Kini Anda bisa memeriksa apakah service worker telah diaktifkan dengan masuk ke `chrome://inspect
/#service-workers` dan mencari situs Anda.

![Periksa service worker](imgs/sw-chrome-inspect.png)

Bila service worker telah diimplementasikan lebih dahulu, Anda juga bisa melihat detail service
worker melalui `chrome://serviceworker-internals`. Mungkin ini tetap
berguna, daripada cuma mempelajari tentang daur hidup service
worker, namun jangan kaget jika telah digantikan sepenuhnya oleh
`chrome://inspect/#service-workers` suatu saat nanti.

Mungkin Anda akan merasakan gunanya saat menguji service worker di jendela samaran, jadi
Anda bisa menutup dan membukanya kembali untuk mengetahui apakah service worker sebelumnya
memengaruhi jendela baru. Semua pendaftaran dan cache yang telah dibuat dalam
jendela samaran akan dihapus setelah jendela itu ditutup.


## Pasang service worker

Setelah laman terkontrol memulai proses pendaftaran, mari kita beralih ke
sudut pandang skrip service worker, yang menangani kejadian `install`.

Untuk contoh paling dasar, Anda perlu mendefinisikan callback untuk kejadian install
dan memutuskan file mana yang ingin Anda cache.

    self.addEventListener('install', function(event) {
      // Perform install steps
    });


Di dalam callback `install`, kita perlu mengambil langkah-langkah berikut:

1. Buka cache.
2. Cache file kita.
3. Konfirmasikan apakah semua aset yang diperlukan telah dimasukkan ke cache atau tidak.

<div style="clear:both;"></div>

    var CACHE_NAME = 'my-site-cache-v1';
    var urlsToCache = [
      '/',
      '/styles/main.css',
      '/script/main.js'
    ];

    self.addEventListener('install', function(event) {
      // Perform install steps
      event.waitUntil(
        caches.open(CACHE_NAME)
          .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
          })
      );
    });


Di sini Anda bisa melihat kita memanggil `caches.open()` dengan nama cache yang diinginkan, setelah itu
kita memanggil `cache.addAll()` dan meneruskannya dalam larik file kita. Ini adalah rantai
promise (`caches.open()` dan `cache.addAll()`). Metode `event.waitUntil()`
mengambil promise dan menggunakannya untuk mengetahui berapa lama waktu yang diperlukan pemasangan, dan apakah
berhasil.

Jika semua file berhasil di-cache, maka service worker akan
dipasang. Jika **ada** file yang gagal diunduh, maka langkah pemasangan akan
gagal. Ini memungkinkan Anda untuk mengandalkan aset yang telah didefinisikan, namun
ini berarti Anda perlu berhati-hati dengan daftar file yang Anda putuskan untuk di-cache dalam
langkah pemasangan. Mendefinisikan daftar file yang panjang akan meningkatkan kemungkinan adanya
satu file yang mungkin gagal di-cache, sehingga menyebabkan service worker Anda tidak
dipasang.

Ini baru satu contoh, Anda bisa melakukan tugas lain dalam kejadian `install` atau
menghindari penyetelan event listener `install` bersama-sama.

## Cache dan kembalikan permintaan

Oleh karena sekarang telah memasang service worker, Anda mungkin 
  ingin mengembalikan salah satu respons yang telah di-cache, bukan?

Setelah service worker dipasang dan pengguna menyusuri laman berbeda
atau menyegarkannya, service worker akan mulai menerima kejadian `fetch`, seperti contohnya
di bawah ini.

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


Di sini kita mendefinisikan kejadian `fetch` dan dalam `event.respondWith()`, kita
meneruskan sebuah promise dari `caches.match()`. Metode ini akan memperhatikan permintaan dan
mencari hasil yang telah disimpan sementara dari cache yang dibuat oleh service worker.

Jika kita memiliki respons yang cocok, kita akan mengembalikan nilai yang di-cache, jika tidak maka kita mengembalikan
hasil panggilan ke `fetch`, yang akan membuat permintaan jaringan dan mengembalikan
data jika ada sesuatu yang bisa diambil dari jaringan. Ini adalah contoh sederhana
dan menggunakan aset yang kita simpan di cache selama langkah pemasangan.

Jika ingin menyimpan permintaan baru secara kumulatif ke cache, kita bisa melakukannya dengan menangani
respons permintaan fetch kemudian menambahkannya ke cache, seperti di bawah ini.


    self.addEventListener('fetch', function(event) {
      event.respondWith(
        caches.match(event.request)
          .then(function(response) {
            // Cache hit - return response
            if (response) {
              return response;
            }

            // IMPORTANT: Clone the request. A request is a stream and
            // can only be consumed once. Since we are consuming this
            // once by cache and once by the browser for fetch, we need
            // to clone the response.
            var fetchRequest = event.request.clone();

            return fetch(fetchRequest).then(
              function(response) {
                // Check if we received a valid response
                if(!response || response.status !== 200 || response.type !== 'basic') {
                  return response;
                }

                // IMPORTANT: Clone the response. A response is a stream
                // and because we want the browser to consume the response
                // as well as the cache consuming the response, we need
                // to clone it so we have two streams.
                var responseToCache = response.clone();

                caches.open(CACHE_NAME)
                  .then(function(cache) {
                    cache.put(event.request, responseToCache);
                  });

                return response;
              }
            );
          })
        );
    });


Yang kita lakukan adalah:

1. Tambahkan callback ke `.then()` pada permintaan `fetch`.
2. Setelah mendapatkan respons, lakukan pemeriksaan berikut:

   1. Pastikan respons tersebut valid.
   2. Pastikan status pada respons adalah `200`.
   3. Pastikan tipe respons adalah **basic**, yang menunjukkan bahwa permintaan 
     itu berasal dari kita. Ini berarti permintaan ke aset pihak ketiga 
      juga tidak disimpan ke cache.
3. Jika lulus pemeriksaan, kita akan [duplikatkan](https://fetch.spec.whatwg.org/#dom-response-clone) 
   respons tersebut. Alasannya adalah karena respons tersebut adalah sebuah 
   [Stream](https://streams.spec.whatwg.org/){: .external }, body hanya bisa digunakan 
   satu kali. Oleh karena kita ingin mengembalikan respons untuk digunakan browser, serta 
   meneruskannya ke cache untuk digunakan, kita perlu membuat duplikatnya agar bisa mengirim satu ke 
   browser dan satu ke cache.

## Perbarui service worker {: #update-a-service-worker }

Akan tiba saatnya service worker perlu 
diperbarui. Bila saatnya tiba, Anda perlu mengikuti langkah-langkah ini:

1. Perbarui file JavaScript service worker. Bila pengguna mengunjungi
   situs Anda, browser akan mencoba mengunduh kembali file skrip yang mendefinisikan
   service worker di latar belakang. Jika ada perbedaan satu byte saja dalam 
   file service worker yang telah dibandingkan dengan yang saat ini dimiliki, maka akan dianggap file 
   _baru_.
2. Service worker yang baru akan dimulai dan kejadian `install` akan dipicu.
3. Pada titik ini, service worker lama tetap mengontrol laman saat ini 
   sehingga service worker baru akan beralih ke status `waiting`.
4. Bila laman terbuka pada situs saat ini ditutup, service 
   worker lama akan dimatikan dan service worker baru akan mengambil alih.
5. Setelah service worker mengambil alih, kejadian `activate`-nya akan 
   dipicu.

Satu tugas umum yang akan terjadi dalam callback `activate` adalah manajemen cache.
Alasan melakukannya dalam callback `activate` adalah karena jika Anda
akan mengosongkan cache lama dalam langkah pemasangan, semua service worker lama,
yang mempertahankan kontrol semua laman saat ini, akan tiba-tiba berhenti
melayani file dari cache itu.

Anggaplah kita memiliki satu cache bernama `'my-site-cache-v1'`, dan ternyata kita
ingin memecahnya menjadi satu cache untuk laman dan satu lagi untuk entri blog.
Berarti dalam langkah pemasangan kita akan membuat dua cache, `'pages-cache-v1'` dan
`'blog-posts-cache-v1'`, dan dalam langkah aktivasi kita ingin menghapus
`'my-site-cache-v1'` yang lama.

Kode berikut akan mengerjakannya dengan melakukan loop pada semua cache di
service worker dan menghapus semua cache yang tidak didefinisikan dalam
daftar putih cache tersebut.


    self.addEventListener('activate', function(event) {

      var cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1'];

      event.waitUntil(
        caches.keys().then(function(cacheNames) {
          return Promise.all(
            cacheNames.map(function(cacheName) {
              if (cacheWhitelist.indexOf(cacheName) === -1) {
                return caches.delete(cacheName);
              }
            })
          );
        })
      );
    });

## Tantangan dan gotcha

Hal ini benar-benar baru. Inilah kumpulan masalah yang 
mengganggu. Semoga bagian ini bisa dihapus secepatnya, namun untuk sekarang 
hal ini cukup diperhatikan saja.


### Jika pemasangan gagal, berarti kami tidak begitu bagus dalam memberi tahu Anda tentang hal ini

Jika service worker didaftarkan, namun kemudian tidak muncul di `chrome://inspect/#service-workers` 
atau `chrome://serviceworker-internals`, ia kemungkinan gagal
dipasang karena ada kesalahan yang dilontarkan, atau ada promise tolakan yang diteruskan ke
`event.waitUntil()`.

Untuk mengatasi hal ini, masuk ke `chrome://serviceworker-internals` dan centang "Open
DevTools window and pause JavaScript execution on service worker startup for
debugging", dan tempatkan pernyataan debugger di awal kejadian install.
Artikel ini, bersama <a href="/web/tools/chrome-devtools/javascript/add-breakpoints#exceptions">Berhenti sementara pada pengecualian yang tidak tertangkap</a>,
akan mengungkapkan masalahnya.


### Default dari fetch()

#### Tidak ada kredensial secara default

Bila menggunakan `fetch`, secara default, permintaan tidak akan berisi kredensial seperti 
cookie. Jika menginginkan kredensial, sebagai gantinya panggil:

    fetch(url, {
      credentials: 'include'
    })


Perilaku ini disengaja, dan dirasa lebih baik daripada default XHR
yang lebih kompleks pada pengiriman kredensial jika URL sama asalnya, namun jika tidak akan
menghilangkannya. Perilaku fetch lebih mirip permintaan CORS lain, misalnya `<img crossorigin>`, yang tidak pernah mengirimkan cookie kecuali jika Anda menyertakannya dengan `<img crossorigin="use-credentials">`.



#### Kegagalan non-CORS secara default

Secara default, mengambil sumber daya dari URL pihak ketiga akan gagal jika tidak
mendukung CORS. Anda bisa menambahkan sebuah opsi `no-CORS` ke Request untuk mengatasi hal ini,
walaupun ini akan menyebabkan respons 'opaque', yakni tidak bisa mengetahui
apakah respons berhasil atau tidak.

    cache.addAll(urlsToPrefetch.map(function(urlToPrefetch) {
      return new Request(urlToPrefetch, { mode: 'no-cors' });
    })).then(function() {
      console.log('All resources have been fetched and cached.');
    });


### Menangani gambar responsif

Atribut `srcset` atau elemen `<picture>` akan memilih aset gambar
paling sesuai pada waktu proses dan membuat permintaan jaringan.

Untuk service worker, jika ingin meng-cache gambar selama langkah pemasangan,
ada beberapa opsi:

1. Pasang semua gambar yang akan diminta oleh elemen `<picture>` dan atribut `srcset`.
2. Pasang versi gambar resolusi rendah.
3. Pasang satu versi gambar
resolusi tinggi.

Secara realistis, opsi 2 atau 3 yang harus dipilih, karena mengunduh semua
gambar akan memboroskan ruang penyimpanan.

Anggaplah versi resolusi rendah dipilih pada saat pemasangan dan ingin mencoba
serta mengambil gambar yang beresolusi lebih tinggi dari jaringan bila laman telah dimuat, namun jika
gambar resolusi tinggi ternyata gagal, beralih ke versi resolusi rendah. Ini boleh saja dan
baik dilakukan, tapi ada satu masalah.

Jika kita memiliki dua gambar berikut:

| Kepadatan Layar | Lebar | Tinggi |
| -------------- | ----- | ------ |
| 1x             | 400   | 400    |
| 2x             | 800   | 800    |

Dalam gambar `srcset`, kita memiliki beberapa markup seperti ini:


    <img src="image-src.png" srcset="image-src.png 1x, image-2x.png 2x" />


Jika kita berada di tampilan 2x, maka browser akan memilih mengunduh `image-2x.png`,
jika sedang offline Anda bisa `.catch()` permintaan ini dan mengembalikan `image-src.png`
sebagai gantinya jika telah di-cache, akan tetapi browser akan mengharapkan gambar yang
memperhitungkan piksel ekstra pada layar 2x, sehingga gambar akan muncul sebagai
200x200 piksel CSS sebagai ganti 400x400 piksel CSS. Satu-satunya jalan memutar adalah
mengatur tinggi dan lebar tetap pada gambar.


    <img src="image-src.png" srcset="image-src.png 1x, image-2x.png 2x"
     style="width:400px; height: 400px;" />


Untuk elemen `<picture>` yang sedang digunakan untuk tujuan seni, ini dianggap
lebih sulit dan akan sangat bergantung pada cara gambar dibuat dan digunakan,
namun pendekatan serupa mungkin bisa digunakan untuk srcset.

## Ketahui selengkapnya

Ada sederet dokumentasi mengenai service worker yang disimpan di 
[https://jakearchibald.github.io/isserviceworkerready/resources](https://jakearchibald.github.io/isserviceworkerready/resources.html)
yang mungkin berguna untuk Anda.

## Dapatkan bantuan

Jika Anda merasa buntu, poskan pertanyaan di Stackoverflow dan gunakan tag 
'[service-worker](http://stackoverflow.com/questions/tagged/service-worker)' 
agar kami bisa melacak masalah dan mencoba serta membantu sebisa mungkin.


{# wf_devsite_translation #}
