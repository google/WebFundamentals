project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Pengalaman offline lengkap, sinkronisasi latar belakang berkala, notifikasi push&mdash;fungsi yang biasanya memerlukan aplikasi yang sudah ada di perangkat&mdash;akan hadir di web. Service worker menyediakan fondasi teknis yang diperlukan oleh semua fitur ini.

{# wf_published_on: 2014-12-01 #}
{# wf_updated_on: 2020-07-24 #}
{# wf_blink_components: Blink>ServiceWorker #}

# Service Worker: Pengantar {: .page-title }

{% include "web/_shared/contributors/mattgaunt.html" %}

Pengalaman offline lengkap, sinkronisasi latar belakang berkala, notifikasi
push&mdash;fungsi yang biasanya memerlukan
aplikasi yang sudah ada di perangkat&mdash;akan hadir di web. Service worker menyediakan fondasi
teknis yang diperlukan oleh semua fitur ini.

## Apa yang dimaksud dengan service worker

Service worker adalah skrip yang dijalankan browser di latar belakang,
terpisah dari halaman web, yang membuka pintu ke berbagai fitur yang tidak memerlukan halaman
web atau interaksi pengguna. Saat ini, service worker sudah menyertakan berbagai fitur seperti
[notifikasi push](/web/updates/2015/03/push-notifications-on-the-open-web)
dan [sinkronisasi latar belakang](/web/updates/2015/12/background-sync). Di masa mendatang,
service worker mungkin mendukung fitur lainnya seperti sinkronisasi berkala atau geofencing.
Fitur inti yang dibahas dalam tutorial ini adalah kemampuan mencegat dan
menangani permintaan jaringan, termasuk mengelola cache
respons lewat program.

Yang membuat API ini menarik adalah karena memungkinkan Anda mendukungpengalaman
offline, yang memberikan developer kontrol penuh atas
pengalaman.

Sebelum service worker, ada satu API lain yang memberi pengguna pengalaman offline
di web, yang disebut
[AppCache](//www.html5rocks.com/en/tutorials/appcache/beginner/){: .external }.
Ada sejumlah masalah pada AppCache API yang dapat dihindari oleh service worker
.

Hal yang perlu diingat untuk service worker:

* Ini adalah [JavaScript Worker](//www.html5rocks.com/en/tutorials/workers/basics/){: .external },
  jadi tidak dapat mengakses DOM secara langsung. Melainkan, service worker dapat
  berkomunikasi dengan halaman yang dikontrolnya dengan merespons pesan yang dikirimkan lewat
  antarmuka [postMessage](https://html.spec.whatwg.org/multipage/workers.html#dom-worker-postmessage)
  dan halaman yang dapat memanipulasi DOM jika diperlukan.
* Service worker adalah proxy jaringan yang dapat diprogram, yang memungkinkan   Anda mengontrol cara
  menangani permintaan jaringan dari halaman.
* Service worker akan dihentikan jika tidak sedang digunakan, dan dimulai lagi saat diperlukan,
  jadi Anda tidak dapat mengandalkan keadaan global dalam pengendali `onfetch` dan
  `onmessage` service worker. Jika ada informasi yang perlu dipertahankan dan
  digunakan kembali saat memulai ulang, service worker memiliki akses ke
  [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).
* Service worker menggunakan promise secara luas, jadi jika Anda baru mengenal promise,
  sebaiknya berhenti membaca artikel ini dan lihat
  [Promise, pengantar](/web/fundamentals/getting-started/primers/promises).

## Siklus hidup service worker

Service worker memiliki siklus hidup yang sepenuhnya terpisah dari halaman web.

Untuk menginstal service worker bagi situs, Anda perlu mendaftarkannya, yang Anda lakukan
di JavaScript halaman. Mendaftarkan service worker akan menyebabkan browser
memulai langkah penginstalan service worker di latar belakang.

Biasanya selama langkah penginstalan, Anda perlu menyimpan cache beberapa aset statis. Jika
semua file berhasil disimpan dalam cache, maka service worker akan
terinstal. Jika ada file yang gagal didownload dan disimpan dalam cache, maka langkah penginstalan
akan gagal dan service worker tidak akan diaktifkan (yakni tidak akan diinstal). Jika
itu terjadi, jangan khawatir, coba lagi lain kali. Namun jika berhasil
diinstal, berarti aset statis sudah masuk cache.

Jika sudah terinstal, langkah aktivasi akan menyusul dan ini kesempatan
besar untuk menangani manajemen cache lama, yang akan kita bahas di
bagian pembaruan service worker.

Setelah langkah aktivasi, service worker akan mengontrol semua halaman yang berada
dalam cakupannya, meski halaman yang mendaftarkan service worker untuk
pertama kali tidak akan dikontrol hingga dimuat lagi. Setelah
dapat dikontrol, service worker akan berada dalam salah satu dari dua keadaan: yaitu service worker akan
dihentikan untuk menghemat memori, atau akan menangani peristiwa pengambilan dan pesan yang terjadi
saat permintaan jaringan atau pesan dibuat dari halaman Anda.

Di bawah ini versi siklus hidup service worker yang sangat disederhanakan saat
penginstalan yang pertama.

![siklus hidup service worker](images/sw-lifecycle.png)


## Prasyarat

### Dukungan browser

Opsi browser semakin banyak. Service worker didukung oleh Chrome, Firefox, dan
Opera. Microsoft Edge sekarang
[menunjukkan dukungan publik](https://developer.microsoft.com/en-us/microsoft-edge/status/serviceworker/).
Bahkan Safari telah memberikan [petunjuk development di masa mendatang](https://trac.webkit.org/wiki/FiveYearPlanFall2015).
Anda dapat mengikuti perkembangan semua browser di situs Jake Archibald
[is Serviceworker ready](https://jakearchibald.github.io/isserviceworkerready/){: .external }.

### Anda memerlukan HTTPS

Selama development, Anda dapat menggunakan service worker melalui `localhost`, namun
untuk menerapkannya di situs, Anda harus menyiapkan HTTPS di server.

Menggunakan service worker Anda dapat membajak koneksi, menirukan, dan memfilter
respons. Fitur hebat. Walaupun kemampuan ini akan digunakan untuk kebaikan, namun tidak demikian dengan
man-in-the-middle. Untuk menghindarinya, Anda hanya dapat mendaftarkan service
worker pada halaman yang ditayangkan melalui HTTPS, jadi kita tahu service worker yang diterima browser
belum dimodifikasi selama perjalanannya melalui jaringan.

[Halaman GitHub](https://pages.github.com/){: .external } ditayangkan melalui HTTPS, jadi
sangat cocok untuk meng-host demo.

Jika ingin menambahkan HTTPS ke server maka Anda harus mendapatkan sertifikat
TLS dan menyiapkannya untuk server. Hal ini berbeda-beda sesuai dengan penyiapannya,
jadi periksa dokumentasi server dan pastikan Anda membaca
[SSL config generator Mozilla](https://mozilla.github.io/server-side-tls/ssl-config-generator/)
untuk praktik terbaik.

## Mendaftarkan service worker

Untuk menginstal service worker Anda perlu memulai prosesnya dengan
**mendaftarkannya** di halaman. Pendaftaran ini akan memberi tahu browser tempat
file JavaScript service worker Anda berada.

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
          // Registration was successful
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
          // registration failed :(
          console.log('ServiceWorker registration failed: ', err);
        });
      });
    }

Kode ini memeriksa untuk mengetahui apakah API service worker tersedia, dan jika tersedia,
service worker di `/sw.js` telah terdaftar
[setelah halaman dimuat](/web/fundamentals/instant-and-offline/service-worker/registration).

Anda dapat menampilkan `register()` setiap kali halaman dimuat tanpa masalah; browser akan
mengetahui apakah service worker sudah terdaftar atau belum kemudian menangani
dengan semestinya.

Satu perbedaan kecil pada metode `register()` ini adalah lokasi
file service worker. Dalam hal ini Anda akan tahu apakah file service worker berada di root
domain. Ini berarti cakupan service worker adalah keseluruhan
asal. Dengan kata lain, service worker ini akan menerima peristiwa `fetch` untuk
semua yang ada di domain ini. Jika kita mendaftarkan file service worker di
`/example/sw.js`, service worker nanti hanya akan melihat peristiwa `fetch` untuk halaman
yang URL-nya dimulai dengan `/example/` (yakni `/example/page1/`, `/example/page2/`).

Kini Anda dapat memeriksa apakah service worker telah diaktifkan dengan masuk ke
`chrome://inspect/#service-workers` dan mencari situs Anda.

![Periksa service worker](images/sw-chrome-inspect.png)

Jika service worker telah diimplementasikan lebih dahulu, Anda juga dapat melihat detail service
worker melalui `chrome://serviceworker-internals`. Mungkin ini tetap
berguna, daripada cuma mempelajari siklus hidup service
worker, namun jangan kaget jika telah digantikan sepenuhnya oleh
`chrome://inspect/#service-workers` suatu saat nanti.

Mungkin Anda akan merasakan gunanya saat menguji service worker di jendela samaran, jadi
Anda dapat menutup dan membukanya kembali untuk mengetahui bahwa service worker sebelumnya tidak
memengaruhi jendela baru. Semua pendaftaran dan cache yang dibuat dalam
jendela samaran akan dihapus setelah jendela tersebut ditutup.


## Menginstal service worker

Setelah halaman terkontrol memulai proses pendaftaran, mari beralih ke
sudut pandang skrip service worker, yang menangani peristiwa `install`.

Untuk contoh paling dasar, Anda perlu mendefinisikan callback untuk peristiwa install
dan memutuskan file mana yang ingin Anda simpan dalam cache.

    self.addEventListener('install', function(event) {
      // Perform install steps
    });


Di dalam callback `install`, kita perlu mengambil langkah-langkah berikut:

1. Buka cache.
2. Simpan cache file.
3. Konfirmasi apakah semua aset yang diperlukan telah disimpan dalam cache atau tidak.

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


Di sini Anda dapat melihat kita menampilkan `caches.open()` dengan nama cache yang diinginkan, setelah itu
kita menampilkan `cache.addAll()` dan meneruskannya dalam array file. Ini adalah rantai
promise (`caches.open()` dan `cache.addAll()`). Metode `event.waitUntil()`
mengambil promise dan menggunakannya untuk mengetahui berapa lama waktu yang diperlukan penginstalan, dan apakah
berhasil atau tidak.

Jika semua file berhasil disimpan dalam cache, maka service worker akan
diinstal. Jika **ada** file yang gagal didownload, maka langkah penginstalan akan
gagal. Ini memungkinkan Anda untuk mengandalkan aset yang telah didefinisikan, namun
ini berarti Anda perlu berhati-hati dengan daftar file yang Anda putuskan untuk disimpan dalam cache pada
langkah pemasangan. Mendefinisikan daftar file yang panjang akan meningkatkan kemungkinan adanya
satu file yang mungkin gagal disimpan dalam cache, sehingga menyebabkan service worker tidak
diinstal.

Ini baru satu contoh, Anda dapat melakukan tugas lain dalam peristiwa `install` atau
sama sekali menghindari penyetelan event listener `install`.

## Menyimpan cache dan mengembalikan permintaan

Oleh karena sekarang telah menginstal service worker, Anda dapat
  mengembalikan salah satu respons yang telah disimpan dalam cache, bukan?

Setelah service worker diinstal dan pengguna membuka halaman berbeda
atau me-refresh, service worker akan mulai menerima peristiwa `fetch`, contohnya
terdapat di bawah.

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


Di sini kita mendefinisikan peristiwa `fetch` dan dalam `event.respondWith()`, kita
meneruskan sebuah promise dari `caches.match()`. Metode ini akan memperhatikan permintaan dan
mencari hasil yang disimpan dalam cache dari salah satu cache yang dibuat oleh service worker.

Jika ada respons yang cocok, kita menampilkan nilai yang disimpan dalam cache, jika tidak maka kita menampilkan
hasil tampilan ke `fetch`, yang akan melakukan permintaan jaringan dan mengembalikan
data jika ada sesuatu yang dapat diambil dari jaringan. Ini adalah contoh sederhana
dan menggunakan aset yang kita simpan di cache selama langkah pemasangan.

Jika ingin menyimpan permintaan baru secara kumulatif ke cache, kita dapat melakukannya dengan menangani
respons permintaan fetch, lalu menambahkannya ke cache, seperti di bawah.


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

1. Menambahkan callback ke `.then()` pada permintaan `fetch`.
2. Setelah mendapatkan respons, kita melakukan pemeriksaan berikut:
    1. Pastikan respons tersebut valid.
    2. Pastikan status pada respons adalah `200`.
    3. Pastikan tipe respons adalah **basic**, yang menandakan bahwa permintaan
       tersebut berasal dari kita. Ini berarti bahwa permintaan kepada aset pihak ketiga
       tidak disimpan dalam cache.
3. Jika kita meneruskan pemeriksaan, kita [meng-clone](https://fetch.spec.whatwg.org/#dom-response-clone)
   respons. Alasannya karena respons tersebut adalah
   [Stream](https://streams.spec.whatwg.org/){: .external }, bodinya hanya dapat dikonsumsi
   satu kali. Karena kita ingin menampilkan respons untuk digunakan browser, serta
   meneruskannya ke cache untuk digunakan, kita perlu membuat clone-nya agar dapat mengirimkan satu ke
   browser dan satu ke cache.

## Mengupdate service worker {: #update-a-service-worker }

Akan ada saatnya service worker perlu
diupdate. Jika saatnya tiba, Anda harus mengikuti langkah-langkah ini:

1. Update file JavaScript service worker. Jika pengguna membuka
   situs Anda, browser akan mencoba mendownload kembali file skrip yang mendefinisikan
   service worker di latar belakang. Jika ada perbedaan byte pada
   file service worker dibanding yang ada saat ini, maka akan dianggap
   _new_.
2. Service worker baru akan dimulai dan peristiwa `install` akan diaktifkan.
3. Sekarang service worker lama masih mengontrol halaman saat ini
   jadi service worker baru akan masuk status `waiting`.
4. Jika halaman situs yang saat ini terbuka ditutup, service worker
   lama akan dinonaktifkan dan service worker baru akan mengambil kontrol.
5. Setelah service worker baru mengambil kontrol, peristiwa `activate`-nya akan
   diaktifkan.

Satu tugas umum yang akan terjadi pada callback `activate` adalah pengelolaan cache.
Alasan melakukannya dalam callback `activate` adalah karena jika Anda
akan menghapus cache lama dalam langkah penginstalan, semua service worker lama,
yang mempertahankan kontrol semua halaman saat ini, akan tiba-tiba berhenti
menayangkan file dari cache tersebut.

Katakanlah kita memiliki satu cache yang disebut `'my-site-cache-v1'`, dan kita menemukan bahwa kita
ingin memisahkannya menjadi satu cache untuk halaman dan satu cache untuk entri blog.
Ini berarti pada langkah penginstalan kita membuat dua cache, `'pages-cache-v1'` dan
`'blog-posts-cache-v1'` serta pada langkah aktivasi kita ingin menghapus
`'my-site-cache-v1'` lama.

Kode berikut akan melakukannya dengan melakukan loop pada semua cache di
service worker dan menghapus cache yang tidak ditentukan dalam
daftar putih cache.


    self.addEventListener('activate', function(event) {

      var cacheAllowlist = ['pages-cache-v1', 'blog-posts-cache-v1'];

      event.waitUntil(
        caches.keys().then(function(cacheNames) {
          return Promise.all(
            cacheNames.map(function(cacheName) {
              if (cacheAllowlist.indexOf(cacheName) === -1) {
                return caches.delete(cacheName);
              }
            })
          );
        })
      );
    });

## Tantangan dan gotcha

Fitur ini benar-benar baru. Inilah kumpulan masalah yang
mengganggu. Semoga bagian ini dapat dihapus secepatnya, namun untuk sekarang
masalah ini cukup diperhatikan saja.


### Jika penginstalan gagal, berarti kami kurang baik menyampaikannya

Jika service worker didaftarkan, namun kemudian tidak muncul di `chrome://inspect/#service-workers`
atau `chrome://serviceworker-internals`, kemungkinan gagal
diinstal karena ada error yang ditampilkan, atau ada promise ditolak yang diteruskan ke
`event.waitUntil()`.

Untuk mengatasinya, buka `chrome://serviceworker-internals` dan centang "Open
DevTools window and pause JavaScript execution on service worker startup for
debugging", dan tempatkan pernyataan debugger di awal peristiwa penginstalan.
Artikel ini, serta
[Jeda pada saat pengecualian yang tidak diketahui](/web/tools/chrome-devtools/javascript/breakpoints),
akan mengungkapkan masalahnya.


### Default dari pengambilan()

#### Tidak ada kredensial secara default

Jika Anda menggunakan `fetch`, secara default, permintaan tidak akan berisi kredensial seperti
cookie. Jika Anda menginginkan kredensial, sebagai gantinya tampilkan:

    fetch(url, {
      credentials: 'include'
    })


Perilaku ini disengaja, dan dirasa lebih baik daripada default XHR
yang lebih kompleks dalam mengirim kredensial jika URL sama asalnya, namun jika tidak, akan
menghilangkannya. Perilaku pengambilan lebih seperti permintaan CORS lain,misalnya `<img
crossorigin>`, yang tidak pernah mengirim cookie kecuali Anda memilih untuk ikut serta dengan `<img
crossorigin="use-credentials">`.

#### Kegagalan non-CORS secara default

Secara default, mengambil resource dari URL pihak ketiga akan gagal jika tidak
mendukung CORS. Anda dapat menambahkan opsi `no-CORS` ke Permintaan untuk mengatasinya,
meski tindakan ini akan menyebabkan respons 'opaque', yaitu tidak dapat mengetahui
apakah respons berhasil atau tidak.

    cache.addAll(urlsToPrefetch.map(function(urlToPrefetch) {
      return new Request(urlToPrefetch, { mode: 'no-cors' });
    })).then(function() {
      console.log('All resources have been fetched and cached.');
    });


### Menangani gambar responsif

Atribut `srcset` atau elemen `<picture>` akan memilih aset gambar
paling sesuai pada waktu proses dan melakukan permintaan jaringan.

Untuk service worker, jika ingin menyimpan gambar dalam cache selama langkah penginstalan,
ada beberapa opsi:

1. Instal semua gambar yang akan diminta oleh atribut  `<picture>` dan `srcset`
.
2. Instal satu versi resolusi rendah dari gambar.
3. Instal satu versi resolusi tinggi dari gambar.

Secara realistis, opsi 2 atau 3 yang harus dipilih, karena mendownload semua
gambar akan memboroskan ruang penyimpanan.

Anggaplah Anda memilih versi resolusi rendah pada saat penginstalan dan ingin mencoba
serta mengambil gambar yang beresolusi lebih tinggi dari jaringan jika halaman telah dimuat, namun jika
gambar resolusi tinggi ternyata gagal, lakukan fallback ke versi resolusi rendah. Ini boleh saja dan
baik dilakukan, namun ada satu masalah.

Jika kita memiliki dua gambar berikut:

| Kepadatan Layar | Lebar | Tinggi |
| -------------- | ----- | ------ |
| 1x             | 400   | 400    |
| 2x             | 800   | 800    |

Dalam gambar `srcset`, kita memiliki beberapa markup seperti ini:


    <img src="image-src.png" srcset="image-src.png 1x, image-2x.png 2x" />


Jika kita menggunakan layar 2x, browser akan memilih untuk mendownload `image-2x.png`,
jika kita offline Anda dapat `.catch()` permintaan ini dan menampilkan `image-src.png`
jika disimpan dalam cache, namun browser menunggu gambar yang memperhitungkan
piksel ekstra pada layar 2x, jadi gambar akan muncul sebagai
200x200 CSS piksel, bukan 400x400 CSS piksel. Satu-satunya cara menyiasatinya adalah
menyetel tinggi dan lebar tetap pada gambar.


    <img src="image-src.png" srcset="image-src.png 1x, image-2x.png 2x"
     style="width:400px; height: 400px;" />


Untuk elemen `<picture>` yang digunakan pada art direction, ini menjadi sangat
sulit dan bergantung pada cara gambar dibuat dan digunakan,
namun Anda mungkin dapat menggunakan pendekatan serupa untuk srcset.

## Pelajari lebih lanjut

Ada daftar dokumentasi tentang service worker yang disimpan di
[https://jakearchibald.github.io/isserviceworkerready/resources](https://jakearchibald.github.io/isserviceworkerready/resources.html)
yang mungkin berguna bagi Anda.

## Mendapatkan bantuan

Jika Anda mengalami masalah, silakan posting pertanyaan di StackOverflow dan gunakan tag
'[service-worker](http://stackoverflow.com/questions/tagged/service-worker)'
agar kami dapat memantau masalah dan mencoba membantu sebaik-baiknya.

## Masukan {: #feedback }

{% include "web/_shared/helpful.html" %}
