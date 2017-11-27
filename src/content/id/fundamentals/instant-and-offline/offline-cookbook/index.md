project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2017-10-06 #}
{# wf_published_on: 2014-12-09 #}

# Buku Petunjuk Offline {: .page-title }

{% include "web/_shared/contributors/jakearchibald.html" %}

Bila AppCache tiba pada waktunya, ia akan memberi kita sepasang pola untuk membuat
materi bekerja offline. Jika yang Anda butuhkan adalah pola, selamat,
Anda memenangkan undian AppCache (jackpot tetap tidak diklaim), namun sebagian dari kita
tetap berjubel di pojok
[bergoyang maju-mundur](http://alistapart.com/article/application-cache-is-a-douchebag).

Dengan [ServiceWorker][sw_primer] kita menyerah mencoba mengatasi offline, dan 
memberi developer komponen bergerak untuk mengatasinya sendiri. Ini memberi Anda 
kontrol atas proses cache dan cara menangani permintaan. Itu berarti Anda boleh
membuat pola sendiri. Mari kita lihat beberapa pola yang memungkinkan secara
terisolasi, namun dalam praktik Anda mungkin akan menggunakan banyak darinya secara bersama
bergantung pada URL & konteks.

Saat ini semua contoh kode bisa berfungsi di Chrome & Firefox, kecuali jika dinyatakan berbeda.
Untuk mendapatkan detail lengkap mengenai dukungan service worker, lihat ["Apakah Service Worker Siap?"][is_sw_ready].

Untuk demo sebagian pola ini yang bisa digunakan, lihat [Trained-to-thrill][ttt], 
dan [video ini](https://www.youtube.com/watch?v=px-J9Ghvcx4) 
yang menampilkan dampak kinerja.

## Mesin cache - kapan menyimpan sumber daya

[ServiceWorker][sw_primer] memungkinkan Anda menangani permintaan secara independen dari
caching, jadi kita akan melihatnya secara terpisah. Yang pertama, caching, kapan harus
melakukannya?

### Di pemasangan - sebagai dependensi {: #on-install-as-dependency }

<img src="images/cm-on-install-dep.png">

ServiceWorker memberi Anda kejadian `install`. Anda bisa menggunakannya untuk menyiapkan
berbagai hal yang harus sudah siap sebelum Anda menangani kejadian lainnya. Walaupun ini
terjadi, ServiceWorker Anda versi sebelumnya tetal berjalan &
menyajikan laman, jadi hal-hal yang Anda lakukan di sini tidak boleh mengganggunya.

**Ideal untuk:** CSS, gambar, font, JS, template… pokoknya apa saja yang
dianggap statis untuk "versi" itu untuk situs Anda.

Inilah hal-hal yang akan membuat situs Anda sama sekali tidak berfungsi jika sampai gagal
diambil, hal-hal yang akan dilakukan secara parsial oleh aplikasi asli yang setara
pada pengunduhan awal.

    self.addEventListener('install', function(event) {
      event.waitUntil(
        caches.open('mysite-static-v3').then(function(cache) {
          return cache.addAll([
            '/css/whatever-v3.css',
            '/css/imgs/sprites-v6.png',
            '/css/fonts/whatever-v8.woff',
            '/js/all-min-v4.js'
            // etc
          ]);
        })
      );
    });

`event.waitUntil` menggunakan promise untuk mendefinisikan lama & keberhasilan 
pemasangan. Jika promise ditolak, pemasangan dianggap gagal
dan ServiceWorker ini akan ditinggalkan (jika versi lama
berjalan, maka akan dibiarkan). `caches.open` dan `cache.addAll` mengembalikan 
promise. Jika ada sumber daya gagal diambil, pemanggilan `cache.addAll` akan
ditolak.

Di [trained-to-thrill][ttt] saya menggunakannya untuk
[cache aset statis](https://github.com/jakearchibald/trained-to-thrill/blob/3291dd40923346e3cc9c83ae527004d502e0464f/www/static/js-unmin/sw/index.js#L3).


### Di pemasangan - bukan sebagai dependensi {: #on-install-not }

<img src="images/cm-on-install-not.png">

Serupa dengan di atas, namun tidak akan menunda pemasangan selesai dan tidak akan menyebabkan
pemasangan gagal jika caching gagal.

**Ideal untuk:** Sumber daya lebih besar yang tidak langsung dibutuhkan, misalnya
aset untuk level game nanti.

    self.addEventListener('install', function(event) {
      event.waitUntil(
        caches.open('mygame-core-v1').then(function(cache) {
          cache.addAll(
            // levels 11-20
          );
          return cache.addAll(
            // core assets & levels 1-10
          );
        })
      );
    });

Kita tidak meneruskan promise `cache.addAll` untuk level 11-20 kembali ke 
`event.waitUntil`, jadi sekalipun gagal, game akan tetap bisa digunakan 
secara offline. Tentu saja, Anda nanti harus melayani bila semua level itu mungkin tidak ada
& mencoba kembali caching jika tidak ada.

ServiceWorker dapat dimatikan saat pengunduhan level 11-20 karena
kejadian penanganannya telah selesai, yang berarti ini tidak akan di-cache. Di masa mendatang, kami berencana
menambahkan API pengunduhan latar belakang untuk menangani kasus seperti ini, dan
pengunduhan yang lebih besar seperti film.

### Saat mengaktifkan {: #on-activate }

<img src="images/cm-on-activate.png">

**Ideal untuk:** Pembersihan & migrasi.

Setelah ServiceWorker baru dipasang & versi sebelumnya tidak sedang digunakan,
ServiceWorker baru ini akan diaktifkan, dan Anda mendapatkan kejadian `activate`. Karena versi lama
sudah tidak sesuai, inilah saat yang bagus untuk menangani migrasi skema di
IndexedDB serta menghapus cache yang tidak terpakai.

    self.addEventListener('activate', function(event) {
      event.waitUntil(
        caches.keys().then(function(cacheNames) {
          return Promise.all(
            cacheNames.filter(function(cacheName) {
              // Return true if you want to remove this cache,
              // but remember that caches are shared across
              // the whole origin
            }).map(function(cacheName) {
              return caches.delete(cacheName);
            })
          );
        })
      );
    });

Selama aktivasi, kejadian lain seperti `fetch` dimasukkan ke antrean, sehingga
aktivasi yang laman bisa berpotensi memblokir pemuatan laman. Pertahankan aktivasi Anda
seminim mungkin, gunakan hanya untuk hal-hal yang _tidak bisa_ dilakukan saat versi lama
aktif.

Di [trained-to-thrill][ttt] saya menggunakan ini untuk 
[membuang cache lama](https://github.com/jakearchibald/trained-to-thrill/blob/3291dd40923346e3cc9c83ae527004d502e0464f/www/static/js-unmin/sw/index.js#L17).

### Di interaksi pengguna {: #on-user-interaction }

<img src="images/cm-on-user-interaction.png">

**Ideal untuk:** Jika seluruh situs tidak bisa diambil secara offline, Anda bisa memungkinkan
pengguna untuk memilih materi yang ingin mereka gunakan secara offline. Mis. video mengenai
sesuatu seperti YouTube, artikel di Wikipedia, atau galeri khusus di Flickr.

Berikan pengguna tombol "Baca nanti" atau "Simpan untuk offline". Bila tombol ini
diklik, ambil yang Anda butuhkan dari jaringan & munculkan di cache.

    document.querySelector('.cache-article').addEventListener('click', function(event) {
      event.preventDefault();

      var id = this.dataset.articleId;
      caches.open('mysite-article-' + id).then(function(cache) {
        fetch('/get-article-urls?id=' + id).then(function(response) {
          // /get-article-urls returns a JSON-encoded array of
          // resource URLs that a given article depends on
          return response.json();
        }).then(function(urls) {
          cache.addAll(urls);
        });
      });
    });

[Caches API][caches_api] tersedia dari beberapa laman begitu pula service
worker, ini berarti Anda tidak perlu melibatkan service worker untuk menambahkan sesuatu
ke cache.


### Di respons jaringan {: #on-network-response }

<img src="images/cm-on-network-response.png">

**Ideal untuk:** Pembaruan sumber daya yang sering misalnya inbox pengguna, atau
materi artikel. Juga berguna untuk materi non-esensial seperti avatar,
namun perlu hati-hati.

Jika permintaan tidak cocok dengan apa pun di cache, ambil dari jaringan,
kirim ke laman & tambahkan ke cache pada waktu yang sama.

Jika Anda melakukannya untuk beragam URL, misalnya avatar, Anda perlu
berhati-hati agar tidak membuat storage dari asal Anda tidak membengkak — jika pengguna perlu
menggunakan kembali ruang disk, Anda tentu tidak ingin menjadi kandidat utama. Pastikan Anda
membuang item di cache yang tidak dibutuhkan lagi.

    self.addEventListener('fetch', function(event) {
      event.respondWith(
        caches.open('mysite-dynamic').then(function(cache) {
          return cache.match(event.request).then(function (response) {
            return response || fetch(event.request).then(function(response) {
              cache.put(event.request, response.clone());
              return response;
            });
          });
        })
      );
    });

Agar penggunaan memori efisien, Anda hanya bisa membaca isi respons/permintaan
sekali. Dalam kode di atas, 
[`.clone()`](https://fetch.spec.whatwg.org/#dom-request-clone) digunakan untuk membuat
salinan tambahan yang bisa dibaca secara terpisah.

Di [trained-to-thrill][ttt] saya menggunakan ini untuk
[cache gambar Flickr](https://github.com/jakearchibald/trained-to-thrill/blob/3291dd40923346e3cc9c83ae527004d502e0464f/www/static/js-unmin/sw/index.js#L109).

### Stale-while-revalidate {: #stale-while-revalidate }

<img src="images/cm-stale-while-revalidate.png">

**Ideal untuk:** Pembaruan sumber daya yang sering di mana memiliki
versi terbaru tidaklah esensial. Avatar bisa dimasukkan dalam kategori ini.

Gunakan ini jika tersedia versi yang di-cache, namun untuk yang berikutnya
ambil pembaruan.

    self.addEventListener('fetch', function(event) {
      event.respondWith(
        caches.open('mysite-dynamic').then(function(cache) {
          return cache.match(event.request).then(function(response) {
            var fetchPromise = fetch(event.request).then(function(networkResponse) {
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            })
            return response || fetchPromise;
          })
        })
      );
    });

Di HTTP ini sangat mirip dengan
[stale-while-revalidate](https://www.mnot.net/blog/2007/12/12/stale).

### Di pesan push {: #on-push-message }

<img src="images/cm-on-push.png">

[Push API](/web/fundamentals/push-notifications)
adalah fitur lain yang dibangun berbasis ServiceWorker. Ini memungkinkan
ServiceWorker dibangunkan untuk merespons pesan dari
layanan perpesanan OS. Ini terjadi bahkan bila pengguna tidak memiliki tab yang dibuka untuk
situs Anda, hanya ServiceWorker yang dibangunkan. Anda minta izin melakukannya
dari laman & pengguna akan dikonfirmasi.

**Ideal untuk:** Materi yang menyangkut notifikasi, misalnya pesan chat,
kabar berita terkini, atau email. Selain itu perubahan materi
yang tidak sering yang memanfaatkan sinkronisasi segera, seperti pembaruan agenda kerja
atau pengubahan kalender.

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="0i7YdSEQI1w"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Hasil akhir yang umum adalah notifikasi yang, bila diketuk,
akan membuka/memfokus laman yang relevan, namun memperbarui cache sebelum ini terjadi adalah
_amat sangat_ penting. Pengguna jelas online pada waktu menerima
pesan push, namun mungkin tidak demikian bila mereka akhirnya berinteraksi dengan
notifikasi tersebut, sehingga membuat materi ini tersedia secara offline adalah hal penting. Aplikasi
asli Twitter, yang untuk sebagian besar adalah contoh bagus bagi
offline-first, sedikit salah memahaminya.

Tanpa koneksi, Twitter akan gagal menyediakan materi yang menyangkut
pesan push. Mengetuknya tidak akan membuang notifikasi, sehingga membuat
pengguna kekurangan informasi dibandingkan sebelum mengetuk. Jangan lakukan ini!

<div style="clear:both;"></div>

Kode ini akan memperbarui cache sebelum menampilkan notifikasi:

    self.addEventListener('push', function(event) {
      if (event.data.text() == 'new-email') {
        event.waitUntil(
          caches.open('mysite-dynamic').then(function(cache) {
            return fetch('/inbox.json').then(function(response) {
              cache.put('/inbox.json', response.clone());
              return response.json();
            });
          }).then(function(emails) {
            registration.showNotification("New email", {
              body: "From " + emails[0].from.name
              tag: "new-email"
            });
          })
        );
      }
    });

    self.addEventListener('notificationclick', function(event) {
      if (event.notification.tag == 'new-email') {
        // Assume that all of the resources needed to render
        // /inbox/ have previously been cached, e.g. as part
        // of the install handler.
        new WindowClient('/inbox/');
      }
    });


### Di sinkronisasi latar belakang {: #on-background-sync }

<img src="images/cm-on-bg-sync.png">

Dogfood: Sinkronisasi latar belakang belum mendarat dengan stabil di Chrome.

[Sinkronisasi latar belakang](/web/updates/2015/12/background-sync)
adalah fitur lain yang dibangun berbasis
ServiceWorker. Ini memungkinkan Anda meminta sinkronisasi data latar belakang
yang hanya terjadi sekali, atau dengan interval (yang sangat heuristik). Ini terjadi bahkan
bila pengguna tidak memiliki tab yang dibuka untuk situs Anda, hanya ServiceWorker
yang dibangunkan. Anda minta izin melakukannya dari laman & pengguna
akan dikonfirmasi.

**Ideal untuk:** Pembaruan yang tidak urgen, khususnya yang terjadi secara rutin
yang membuat pesan push per pembaruan akan menjadi terlalu sering, misalnya kronologi
sosial atau artikel berita.

    self.addEventListener('sync', function(event) {
      if (event.id == 'update-leaderboard') {
        event.waitUntil(
          caches.open('mygame-dynamic').then(function(cache) {
            return cache.add('/leaderboard.json');
          })
        );
      }
    });


## Persistensi cache {: #cache-persistence }

Asal Anda akan diberi ruang bebas dalam jumlah tertentu untuk melakukan apa yang diinginkannya.
Ruang bebas itu digunakan bersama dengan semua storage asal: LocalStorage,
IndexedDB, Filesystem, dan tentunya Caches.

Jumlah yang Anda dapatkan tidak ditetapkan, jumlahnya berbeda-beda menurut
kondisi perangkat dan storage. Anda bisa mengetahui banyaknya lewat:

    navigator.storageQuota.queryInfo("temporary").then(function(info) {
      console.log(info.quota);
      // Result: <quota in bytes>
      console.log(info.usage);
      // Result: <used data in bytes>
    });

Akan tetapi, seperti halnya semua storage browser, browser bebas membuangnya
jika perangkat sedang mengalami tekanan storage. Sayangnya browser
tidak bisa membedakan antara film yang ingin diprioritaskan untuk disimpan,
dan game yang tidak begitu Anda pedulikan.

Untuk solusinya, ada API yang diusulkan,
[`requestPersistent`](https://storage.spec.whatwg.org/){: .external }:

    // From a page:
    navigator.storage.requestPersistent().then(function(granted) {
      if (granted) {
        // Hurrah, your data is here to stay!
      }
    });

Tentu saja, pengguna harus memberikan izin. Menjadikan pengguna sebagai bagian dari
alur ini merupakan hal penting, karena kita kini bisa mengharapkan mereka akan terkontrol pada penghapusan.
Jika perangkat mereka mulai kehabisan storage, dan pengosongan data non-esensial
tidak juga mengatasinya, pengguna akan mempertimbangkan item mana
yang akan dipertahankan dan dibuang.

Agar berfungsi, sistem operasi harus memperlakukan asal yang "tahan lama" sebagai
setara dengan aplikasi asli dalam memecah penggunaan storage, bukan
melaporkan browser sebagai item tunggal.


## Saran Penyajian - merespons permintaan {: #serving-suggestions }

Tidak penting berapa banyak cache Anda, ServiceWorker tidak akan menggunakan
kecuali jika Anda memberitahukan waktu & caranya. Inilah beberapa pola untuk
menangani permintaan:

### Hanya cache {: #cache-only }

<img src="images/ss-cache-only.png">

**Ideal untuk:** Apa saja yang dianggap statis untuk "versi" itu untuk situs Anda.
semua itu sudah harus di-cache di kejadian pemasangan, sehingga bila sudah ada di cache,
Anda bisa bergantung padanya.

    self.addEventListener('fetch', function(event) {
      // If a match isn't found in the cache, the response
      // will look like a connection error
      event.respondWith(caches.match(event.request));
    });

…walaupun Anda tidak perlu sering menangani hal ini secara spesifik,
[Cache, fallback ke jaringan](#cache-falling-back-to-network) akan membahasnya.

### Hanya jaringan {: #network-only }

<img src="images/ss-network-only.png">

**Ideal untuk:** Hal-hal yang tidak memiliki padanan offline, seperti
ping analitik, dan permintaan non-GET.

    self.addEventListener('fetch', function(event) {
      event.respondWith(fetch(event.request));
      // or simply don't call event.respondWith, which
      // will result in default browser behaviour
    });

…walaupun Anda tidak perlu sering menangani hal ini secara spesifik, 
[Cache, fallback ke jaringan](#cache-falling-back-to-network) akan membahasnya.

### Cache, fallback ke jaringan {: #cache-falling-back-to-network }

<img src="images/ss-falling-back-to-network.png">

**Ideal untuk:** Jika Anda sedang membangun offline-first, begini cara menangani
mayoritas permintaan. Pola lainnya akan menjadi pengecualian berdasarkan
permintaan yang masuk.

    self.addEventListener('fetch', function(event) {
      event.respondWith(
        caches.match(event.request).then(function(response) {
          return response || fetch(event.request);
        })
      );
    });

Ini memberi Anda perilaku "Hanya cache" untuk hal-hal yang ada di cache dan perilaku
"Hanya jaringan" untuk semua hal yang tidak di-cache (termasuk semua permintaannon-GET,
karena semua itu tidak bisa di-cache).

### Persaingan cache & jaringan {: #cache-and-network-race }

<img src="images/ss-cache-and-network-race.png">

**Ideal untuk:** Aset kecil bila Anda mengejar kinerja pada perangkat
yang memiliki akses disk lambat.

Dengan beberapa kombinasi hard drive lama, pemindai virus, dan koneksi
internet yang lebih cepat, mendapatkan sumber daya dari jaringan bisa lebih cepat daripada
masuk ke disk. Akan tetapi, masuk ke jaringan bila pengguna memiliki materi di
perangkat mereka bisa menjadi pemborosan data, jadi camkan hal ini baik-baik.

    // Promise.race is no good to us because it rejects if
    // a promise rejects before fulfilling. Let's make a proper
    // race function:
    function promiseAny(promises) {
      return new Promise((resolve, reject) => {
        // make sure promises are all promises
        promises = promises.map(p => Promise.resolve(p));
        // resolve this promise as soon as one resolves
        promises.forEach(p => p.then(resolve));
        // reject if all promises reject
        promises.reduce((a, b) => a.catch(() => b))
          .catch(() => reject(Error("All failed")));
      });
    };

    self.addEventListener('fetch', function(event) {
      event.respondWith(
        promiseAny([
          caches.match(event.request),
          fetch(event.request)
        ])
      );
    });


### Fallback jaringan ke cache {: #network-falling-back-to-cache }

<img src="images/ss-network-falling-back-to-cache.png">

**Ideal untuk:** Perbaikan cepat untuk sumber daya yang sering diperbarui, di luar
"versi" situs. Mis. artikel, avatar, kronologi media sosial,
papan skor game.

Ini berarti Anda memberi pengguna online materi terbaru, namun pengguna
offline akan mendapatkan versi lama dari cache. Jika permintaan jaringan berhasil, Anda akan
kemungkinan besar ingin [memperbarui entri cache](#on-network-response).

Akan tetapi, metode ini memiliki kelemahan. Jika pengguna memiliki koneksi yang terputus-putus atau lambat,
mereka nanti harus menunggu jaringan untuk gagal sebelum mendapatkan
materi yang bisa diterima dengan sempurna di perangkat mereka. Ini butuh waktu sangat
lama dan membuat pengalaman pengguna yang menjengkelkan. Lihat pola
berikutnya, [Cache kemudian jaringan](#cache-then-network), untuk solusi yang lebih baik.

    self.addEventListener('fetch', function(event) {
      event.respondWith(
        fetch(event.request).catch(function() {
          return caches.match(event.request);
        })
      );
    });

### Cache lalu jaringan {: #cache-then-network }

<img src="images/ss-cache-then-network.png">

**Ideal untuk:** Materi yang sering diperbarui. Mis. artikel, kronologi media
sosial, papan skor game.

Ini mengharuskan laman membuat dua permintaan, satu ke cache, satu ke
jaringan. Gagasannya adalah menampilkan data yang di-cache terlebih dahulu, kemudian memperbarui laman
bila/jika data jaringan sudah tiba.

Kadang-kadang Anda bisa tinggal mengganti data saat ini bila data baru telah tiba
(mis. papan skor game), namun hal itu bisa mengganggu pada potongan materi
yang lebih besar. Pada dasarnya, jangan "hilangkan" sesuatu yang mungkin sedang dibaca atau
berinteraksi dengan pengguna.

Twitter menambahkan materi baru di atas materi lama & menyesuaikan posisi
gulir sehingga menyela pengguna. Hal ini mungkin karena Twitter
umumnya menyimpan urutan yang kebanyakan bersifat linier ke materi. Saya menyalin pola ini untuk
[trained-to-thrill][ttt] guna menampilkan materi ke layar secepat
mungkin, namun tetap menampilkan materi terbaru setelah datanya tiba.

**Kode di laman:**

    var networkDataReceived = false;

    startSpinner();

    // fetch fresh data
    var networkUpdate = fetch('/data.json').then(function(response) {
      return response.json();
    }).then(function(data) {
      networkDataReceived = true;
      updatePage();
    });

    // fetch cached data
    caches.match('/data.json').then(function(response) {
      if (!response) throw Error("No data");
      return response.json();
    }).then(function(data) {
      // don't overwrite newer network data
      if (!networkDataReceived) {
        updatePage(data);
      }
    }).catch(function() {
      // we didn't get cached data, the network is our last hope:
      return networkUpdate;
    }).catch(showErrorMessage).then(stopSpinner);


**Kode di ServiceWorker:**

Kita selalu masuk ke jaringan & memperbarui cache sambil jalan.

    self.addEventListener('fetch', function(event) {
      event.respondWith(
        caches.open('mysite-dynamic').then(function(cache) {
          return fetch(event.request).then(function(response) {
            cache.put(event.request, response.clone());
            return response;
          });
        })
      );
    });

Note: Kode di atas tidak berfungsi di Chrome, karena kami mengekspos `fetch` dan `caches` ke laman ([tiket #1](https://code.google.com/p/chromium/issues/detail?id=436770), [tiket #2](https://code.google.com/p/chromium/issues/detail?id=439389)).

Di [trained-to-thrill][ttt] saya memperbaikinya dengan menggunakan
[XHR sebagai ganti pengambilan atau fetch](https://github.com/jakearchibald/trained-to-thrill/blob/3291dd40923346e3cc9c83ae527004d502e0464f/www/static/js-unmin/utils.js#L3),
dan menyalahgunakan header Accept untuk memberi tahu ServiceWorker tempat untuk mengambil 
hasilnya dari ([kode laman](https://github.com/jakearchibald/trained-to-thrill/blob/3291dd40923346e3cc9c83ae527004d502e0464f/www/static/js-unmin/index.js#L70),
[kode ServiceWorker](https://github.com/jakearchibald/trained-to-thrill/blob/3291dd40923346e3cc9c83ae527004d502e0464f/www/static/js-unmin/sw/index.js#L61)).

### Fallback generik {: #generic-fallback }

<img src="images/ss-generic-fallback.png">

Jika gagal menyajikan sesuatu dari cache dan/atau jaringan, Anda mungkin
perlu menyediakan fallback generik.

**Ideal untuk:** Gambar sekunder seperti avatar, permintaan POST yang gagal, dan
laman "Unavailable while offline".

    self.addEventListener('fetch', function(event) {
      event.respondWith(
        // Try the cache
        caches.match(event.request).then(function(response) {
          // Fall back to network
          return response || fetch(event.request);
        }).catch(function() {
          // If both fail, show a generic fallback:
          return caches.match('/offline.html');
          // However, in reality you'd have many different
          // fallbacks, depending on URL & headers.
          // Eg, a fallback silhouette image for avatars.
        })
      );
    });

Item tujuan fallback Anda mungkin berupa [dependensi pemasangan](#on-install-as-dependency).

Jika laman Anda mengeposkan email, ServiceWorker Anda mungkin akan melalkukan fallback ke
penyimpanan email di respons dan 'outbox' IDB yang memungkinkan laman mengetahui bahwa
pengiriman gagal namun data berhasil disimpan.

### Templating sisi-ServiceWorker {: #serviceworker-side-templating }

<img src="images/ss-sw-side-templating.png">

**Ideal untuk:** Laman tidak bisa membuat respons servernya di-cache.

[Rendering laman di server akan membuat semuanya jadi cepat](https://jakearchibald.com/2013/progressive-enhancement-is-faster/),
namun itu berarti menyertakan data keadaan yang mungkin tidak logis bila di cache,
mis. "Masuk sebagai…". Jika laman Anda dikontrol oleh ServiceWorker,
Anda mungkin malah memilih meminta data JSON bersama template,
dan merendernya.

    importScripts('templating-engine.js');

    self.addEventListener('fetch', function(event) {
      var requestURL = new URL(event.request);

      event.respondWith(
        Promise.all([
          caches.match('/article-template.html').then(function(response) {
            return response.text();
          }),
          caches.match(requestURL.path + '.json').then(function(response) {
            return response.json();
          })
        ]).then(function(responses) {
          var template = responses[0];
          var data = responses[1];

          return new Response(renderTemplate(template, data), {
            headers: {
              'Content-Type': 'text/html'
            }
          });
        })
      );
    });


## Menggabungkan semuanya

Anda tidak harus memilih salah satu metode ini, Anda mungkin akan menggunakan beberapa
di antaranya, bergantung pada URL permintaan. Misalnya,
[trained-to-thrill][ttt] menggunakan:

* [Cache di pemasangan](#on-install-as-dependency), untuk perilaku dan UI statis
* [Cache di respons jaringan](#on-network-response), untuk data dan gambar Flickr
* [Ambil dari cache, fallback ke jaringan](#cache-falling-back-to-network), untuk sebagian besar permintaan
* [Ambil dari cache, kemudian jaringan](#cache-then-network), untuk hasil penelusuran Flickr

Amati saja permintaan tersebut dan putuskan apa yang dilakukan:

    self.addEventListener('fetch', function(event) {
      // Parse the URL:
      var requestURL = new URL(event.request.url);

      // Handle requests to a particular host specifically
      if (requestURL.hostname == 'api.example.com') {
        event.respondWith(/* some combination of patterns */);
        return;
      }
      // Routing for local URLs
      if (requestURL.origin == location.origin) {
        // Handle article URLs
        if (/^\/article\//.test(requestURL.pathname)) {
          event.respondWith(/* some other combination of patterns */);
          return;
        }
        if (/\.webp$/.test(requestURL.pathname)) {
          event.respondWith(/* some other combination of patterns */);
          return;
        }
        if (request.method == 'POST') {
          event.respondWith(/* some other combination of patterns */);
          return;
        }
        if (/cheese/.test(requestURL.pathname)) {
          event.respondWith(
            new Response("Flagrant cheese error", {
              status: 512
            })
          );
          return;
        }
      }

      // A sensible default pattern
      event.respondWith(
        caches.match(event.request).then(function(response) {
          return response || fetch(event.request);
        })
      );
    });

…begitulah gambarannya.


### Ucapan terima kasih {: hide-from-toc }
…untuk ikon-ikon menarik:

* [Kode](http://thenounproject.com/term/code/17547/){: .external } oelh buzzyrobot
* [Kalender](http://thenounproject.com/term/calendar/4672/){: .external } oleh Scott Lewis
* [Jaringan](http://thenounproject.com/term/network/12676/){: .external } oleh Ben Rizzo
* [SD](http://thenounproject.com/term/sd-card/6185/) oleh Thomas Le Bas
* [CPU](http://thenounproject.com/term/cpu/72043/){: .external } oleh iconsmind.com
* [Bak Sampah](http://thenounproject.com/term/trash/20538/){: .external } oleh trasnik
* [Notifikasi](http://thenounproject.com/term/notification/32514/){: .external } oleh @daosme
* [Layout](http://thenounproject.com/term/layout/36872/){: .external } oleh Mister Pixel
* [Awan](http://thenounproject.com/term/cloud/2788/){: .external } oleh P.J. Onori

Dan terima kasih kepada [Jeff Posnick](https://twitter.com/jeffposnick) atas catching terhadap banyak kesalahan besar
sebelum saya mengelik "publish".

### Bacaan lebih lanjut
* [ServiceWorkers - sebuah Pengantar][sw_primer]
* [Is ServiceWorker ready?][is_sw_ready] - lacak status implementasi di semua browser utama
* [JavaScript Promises - sebuah Pengantar](/web/fundamentals/getting-started/primers/promises) - panduan untuk promise


[ttt]: https://jakearchibald.github.io/trained-to-thrill/
[is_sw_ready]: https://jakearchibald.github.io/isserviceworkerready/
[sw_primer]: /web/fundamentals/getting-started/primers/service-workers
[caches_api]: https://developer.mozilla.org/en-US/docs/Web/API/Cache


{# wf_devsite_translation #}
