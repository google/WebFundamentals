project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2014-12-09 #}
{# wf_blink_components: N/A #}

# Cookbook Offline {: .page-title }

{% include "web/_shared/contributors/jakearchibald.html" %}

Jika AppCache tiba di lokasi, ini akan memberi kita beberapa pola untuk membuat
konten berfungsi offline. Jika pola tersebut memang yang Anda butuhkan, selamat,
Anda memenangi undian AppCache (jackpot tidak diklaim), namun sebagian dari kita
tetap berjubel di pojok
[bergoyang maju-mundur](http://alistapart.com/article/application-cache-is-a-douchebag).

Dengan [ServiceWorker][sw_primer] kami menyerah mencoba mengatasi offline, dan
memberi developer suku cadang untuk mengatasinya sendiri. Ini memberi Anda
kontrol atas proses cache dan cara menangani permintaan. Ini artinya Anda harus
membuat pola sendiri. Mari kita lihat beberapa kemungkinan pola secara
terpisah, namun pada praktiknya Anda kemungkinan akan menggunakan banyak pola tersebut sekaligus
bergantung pada URL & konteks.

Semua contoh kode saat ini berfungsi di Chrome & Firefox, kecuali disebutkan lain.
Untuk detail selengkapnya tentang dukungan service worker, lihat ["Apakah Service Worker Siap?"][is_sw_ready].

Untuk demo beberapa pola ini yang dapat digunakan, lihat [Trained-to-thrill][ttt],
dan [video ini](https://www.youtube.com/watch?v=px-J9Ghvcx4)
yang menampilkan dampak performa.

## Mesin cache - kapan menyimpan resource

[ServiceWorker][sw_primer] memungkinkan Anda menangani permintaan secara independen dari
caching, jadi kami akan melihatnya secara terpisah. Yang pertama, caching, kapan harus
melakukannya?

### Saat menginstal - sebagai dependensi {: #on-install-as-dependency }

<img src="images/cm-on-install-dep.png">

ServiceWorker memberi Anda peristiwa `install`. Anda dapat menggunakannya untuk menyiapkan
berbagai item yang harus sudah siap sebelum Anda menangani peristiwa lainnya. Saat ini
terjadi, ServiceWorker versi sebelumnya tetap berjalan &
menayangkan halaman, jadi tindakan yang Anda lakukan di sini tidak boleh mengganggunya.

**Ideal untuk:** CSS, gambar, font, JS, template… apa pun yang Anda
anggap statis untuk "versi" situs Anda tersebut.

Inilah item yang akan membuat situs Anda sama sekali tidak berfungsi jika sampai
gagal diambil, item yang dijadikan oleh aplikasi native yang setara sebagai bagian dari
download awal.

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

`event.waitUntil` menggunakan promise untuk menentukan durasi & keberhasilan
penginstalan. Jika promise ditolak, penginstalan dianggap gagal
dan ServiceWorker ini akan ditinggalkan (jika versi lama
berjalan, maka akan dibiarkan). `caches.open` dan `cache.addAll` menampilkan
promise. Jika ada resource tersebut yang gagal diambil, pemanggilan `cache.addAll` akan
ditolak.

Saat [trained-to-thrill][ttt] saya menggunakan ini untuk
[menyimpan cache aset statis](https://github.com/jakearchibald/trained-to-thrill/blob/3291dd40923346e3cc9c83ae527004d502e0464f/www/static/js-unmin/sw/index.js#L3).


### Saat menginstal - bukan sebagai dependensi {: #on-install-not }

<img src="images/cm-on-install-not.png">

Serupa dengan di atas, namun tidak akan menunda diselesaikannya penginstalan dan tidak akan menyebabkan
penginstalan gagal jika caching gagal.

**Ideal untuk:** Resource lebih besar yang tidak langsung diperlukan, seperti
aset untuk level game selanjutnya.

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

Kami tidak meneruskan promise `cache.addAll` untuk level 11-20 kembali ke
`event.waitUntil`, jadi meski ini gagal, game akan tetap tersedia
offline. Tentu saja, Anda harus mengantisipasi kemungkinan tidak adanya
level tersebut & mencoba lagi caching jika tidak ada.

ServiceWorker dapat dimatikan saat level 11-20 didownload karena
peristiwa penanganannya telah selesai, yang berarti ini tidak akan disimpan sebagai cache. Di masa mendatang, kami berencana
menambahkan API download latar belakang untuk menangani kasus seperti ini, dan
download yang lebih besar seperti film.

### Saat mengaktifkan {: #on-activate }

<img src="images/cm-on-activate.png">

**Ideal untuk:** Pembersihan & migrasi.

Setelah ServiceWorker baru diinstal & versi sebelumnya tidak sedang digunakan,
ServiceWorker baru tersebut diaktifkan, dan Anda mendapatkan peristiwa `activate`. Karena
versi lama sudah tidak sesuai, inilah saat yang tepat untuk menangani migrasi skema di
IndexedDB serta menghapus cache yang tidak digunakan.

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

Selama proses aktivasi, peristiwa lain seperti `fetch` dimasukkan ke antrean, sehingga
aktivasi yang lama dapat berpotensi memblokir pemuatan halaman. Pertahankan proses aktivasi
sesingkat mungkin, gunakan hanya untuk you _couldn't_ do saat
versi lama aktif.

Saat [trained-to-thrill][ttt] saya menggunakan ini untuk
[menghapus cache lama](https://github.com/jakearchibald/trained-to-thrill/blob/3291dd40923346e3cc9c83ae527004d502e0464f/www/static/js-unmin/sw/index.js#L17).

### Saat interaksi pengguna {: #on-user-interaction }

<img src="images/cm-on-user-interaction.png">

**Ideal untuk:** Jika seluruh situs tidak dapat diambil secara offline, Anda dapat mengizinkan
pengguna memilih konten yang diinginkan pengguna tersedia secara offline. Mis. video mengenai
sesuatu seperti YouTube, artikel di Wikipedia, atau galeri khusus di Flickr.

Berikan tombol "Baca nanti" atau "Simpan untuk offline". Jika tombol ini
diklik, mengambil yang Anda butuhkan dari jaringan & memunculkannya di cache.

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

[Caches API][caches_api] tersedia dari halaman begitu pula service
worker, ini berarti Anda tidak perlu melibatkan service worker untuk menambahkan item
ke cache.


### Saat respons jaringan {: #on-network-response }

<img src="images/cm-on-network-response.png">

**Ideal untuk:** Memperbarui resource secara berkala, seperti kotak masuk pengguna atau
konten artikel. Juga berguna untuk konten non-esensial seperti avatar,
namun perlu hati-hati.

Jika permintaan tidak cocok dengan item di cache, ambil dari jaringan,
kirimkan ke halaman & tambahkan ke cache pada waktu yang sama.

Jika Anda melakukannya untuk beragam URL, seperti avatar, Anda perlu
berhati-hati agar tidak membuat penyimpanan asal Anda menjadi terlalu besar — jika pengguna perlu
menggunakan kembali ruang disk, Anda tentu tidak ingin menjadi kandidat utama. Pastikan Anda
menghapus item di cache yang tidak diperlukan lagi.

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

Agar penggunaan memori efisien, Anda hanya dapat membaca isi respons/permintaan
satu kali. Dalam kode di atas,
[`.clone()`](https://fetch.spec.whatwg.org/#dom-request-clone) digunakan untuk 
membuat salinan tambahan yang bisa dibaca secara terpisah.

Saat [trained-to-thrill][ttt] saya menggunakan ini untuk menyimpan
[cache gambar Flickr](https://github.com/jakearchibald/trained-to-thrill/blob/3291dd40923346e3cc9c83ae527004d502e0464f/www/static/js-unmin/sw/index.js#L109).

### Stale-while-revalidate {: #stale-while-revalidate }

<img src="images/cm-stale-while-revalidate.png">

**Ideal untuk:** Memperbarui resource secara berkala jika
versi terbaru tidak esensial untuk didapatkan. Avatar dapat dimasukkan dalam kategori ini.

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

Ini sangat mirip dengan HTTP's
[stale-while-revalidate](https://www.mnot.net/blog/2007/12/12/stale).

### Di pesan push {: #on-push-message }

<img src="images/cm-on-push.png">

[Push API](/web/fundamentals/push-notifications)
adalah fitur lain yang dibuat selain ServiceWorker. Ini memungkinkan
ServiceWorker diaktifkan untuk merespons pesan dari
layanan messaging OS. Ini terjadi bahkan jika pengguna tidak memiliki tab yang dibuka untuk
situs Anda, hanya ServiceWorker yang diaktifkan. Anda meminta izin melakukannya
dari halaman & pengguna akan ditanyai.

**Ideal untuk:** Konten yang berkaitan dengan notifikasi, seperti pesan
chat, artikel berita terbaru, atau email. Selain itu perubahan konten
yang tidak sering yang memanfaatkan sinkronisasi langsung, seperti pembaruan agenda kerja
atau pengubahan kalender.

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="0i7YdSEQI1w"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Hasil akhir umum adalah notifikasi yang, jika di-tap,
akan membuka/memfokuskan halaman yang relevan, namun memperbarui cache sebelum ini terjadi adalah
_extremely_ important. Pengguna jelas online pada saat menerima
pesan push, namun mungkin tidak demikian jika pengguna pada akhirnya berinteraksi dengan
notifikasi tersebut, jadi membuat konten ini tersedia secara offline adalah penting. Aplikasi
native Twitter, yang untuk sebagian besarnya adalah contoh bagus bagi
offline-first, sedikit salah memahaminya.

Tanpa koneksi, Twitter gagal menyediakan konten yang berkaitan dengan
pesan push. Menge-tapnya tidak akan menghapus notifikasi, sehingga membuat
pengguna kekurangan informasi dibandingkan sebelum menge-tap. Jangan lakukan ini!

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


### Saat sinkronisasi latar belakang {: #on-background-sync }

<img src="images/cm-on-bg-sync.png">

[Sinkronisasi latar belakang](/web/updates/2015/12/background-sync)
adalah fitur lain yang dibuat selain
ServiceWorker. Ini memungkinkan Anda meminta sinkronisasi data latar belakang
yang hanya terjadi sekali, atau dengan interval (yang sangat heuristik). Ini terjadi bahkan
jika pengguna tidak memiliki tab yang dibuka untuk situs Anda, hanya ServiceWorker
yang diaktifkan. Anda meminta izin melakukannya dari halaman & pengguna
akan ditanyai.

**Ideal for:** Pembaruan yang tidak mendesak, khususnya yang terjadi secara rutin
yang membuat pesan push per pembaruan akan menjadi terlalu sering, seperti kronologi
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
Ruang bebas itu digunakan bersama dengan semua penyimpanan asal: LocalStorage,
IndexedDB, Filesystem, dan tentunya Caches.

Jumlah yang Anda dapatkan tidak ditetapkan, jumlahnya berbeda-beda menurut
kondisi perangkat dan penyimpanan. Anda dapat mengetahui banyaknya melalui:

    navigator.storageQuota.queryInfo("temporary").then(function(info) {
      console.log(info.quota);
      // Result: <quota in bytes>
      console.log(info.usage);
      // Result: <used data in bytes>
    });

Akan tetapi, seperti halnya semua penyimpanan browser, browser bebas menghapusnya
jika perangkat mengalami tekanan penyimpanan. Sayangnya, browser
tidak dapat membedakan antara film yang Anda prioritaskan untuk disimpan,
dan game yang tidak penting bagi Anda.

Untuk solusinya, ada API yang diusulkan,
[`requestPersistent`](https://storage.spec.whatwg.org/){: .external }:

    // From a page:
    navigator.storage.requestPersistent().then(function(granted) {
      if (granted) {
        // Hurrah, your data is here to stay!
      }
    });

Tentu saja, pengguna harus memberikan izin. Sangat penting untuk menjadikan pengguna sebagai bagian dari
alur ini, karena kami sekarang dapat meminta pengguna mengontrol penghapusan.
Jika perangkat mengalami tekanan penyimpanan, dan menghapus
data non-esensial tidak dapat mengatasinya, pengguna harus memutuskan item mana yang akan
disimpan dan dihapus.

Agar berfungsi, sistem operasi harus memperlakukan asal yang "tahan lama" sebagai
setara dengan aplikasi native dalam uraian penggunaan penyimpanan, bukan
melaporkan browser sebagai satu item.


## Saran Penyajian - merespons permintaan {: #serving-suggestions }

Tidak penting berapa banyak cache Anda, ServiceWorker tidak akan menggunakan
cache kecuali jika Anda memberitahukan waktu & caranya. Berikut ini beberapa pola untuk
menangani permintaan:

### Hanya cache {: #cache-only }

<img src="images/ss-cache-only.png">

**Ideal untuk:** Apa pun yang Anda anggap statis untuk "versi" situs Anda tersebut.
Anda harus menyimpan cache item tersebut di peristiwa penginstalan, jadi Anda dapat mengandalkannya
di sana.

    self.addEventListener('fetch', function(event) {
      // If a match isn't found in the cache, the response
      // will look like a connection error
      event.respondWith(caches.match(event.request));
    });

…Anda tidak perlu sering menangani kasus ini secara spesifik, namun
[Cache, fallback ke jaringan](#cache-falling-back-to-network) akan mencakupnya.

### Hanya jaringan {: #network-only }

<img src="images/ss-network-only.png">

**Ideal untuk:** Item yang tidak memiliki padanan offline, seperti
ping analitik, dan permintaan non-GET.

    self.addEventListener('fetch', function(event) {
      event.respondWith(fetch(event.request));
      // or simply don't call event.respondWith, which
      // will result in default browser behaviour
    });

…Anda tidak perlu sering menangani kasus ini secara spesifik, namun
[Cache, fallback ke jaringan](#cache-falling-back-to-network) akan mencakupnya.

### Cache, fallback ke jaringan {: #cache-falling-back-to-network }

<img src="images/ss-falling-back-to-network.png">

**Ideal untuk:** Jika Anda sedang membuat offline-first, begini cara menangani
mayoritas permintaan. Pola lainnya akan menjadi pengecualian berdasarkan
permintaan yang masuk.

    self.addEventListener('fetch', function(event) {
      event.respondWith(
        caches.match(event.request).then(function(response) {
          return response || fetch(event.request);
        })
      );
    });

Ini memberi Anda perilaku "Hanya cache" untuk item yang ada di cache dan perilaku
"Hanya jaringan" untuk semua item yang tidak di-cache (termasuk semua permintaan non-GET,
karena semua itu tidak dapat di-cache).

### Persaingan cache & jaringan {: #cache-and-network-race }

<img src="images/ss-cache-and-network-race.png">

**Ideal for:** Aset kecil jika Anda mengejar performa pada perangkat
yang memiliki akses disk lambat.

Dengan beberapa kombinasi hard drive lama, pemindai virus, dan koneksi
internet yang lebih cepat, mendapatkan resource dari jaringan bisa lebih cepat daripada
masuk ke disk. Akan tetapi, masuk ke jaringan jika pengguna memiliki konten di
perangkatnya dapat menjadi pemborosan data, jadi ini perlu diingat baik-baik.

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

Ini artinya Anda memberikan konten terbaru kepada pengguna, namun pengguna
offline mendapatkan versi lama dari cache. Jika permintaan jaringan berhasil, Anda
kemungkinan besar ingin [memperbarui entri cache](#on-network-response).

Akan tetapi, metode ini memiliki kelemahan. Jika memiliki koneksi yang terputus-putus atau lambat,
pengguna harus menunggu jaringan untuk gagal sebelum mendapatkan
konten yang dapat diterima dengan sempurna di perangkatnya. Ini butuh waktu sangat
lama dan membuat pengalaman pengguna yang merepotkan. Lihat pola
berikutnya, [Cache kemudian jaringan](#cache-then-network), untuk solusi yang lebih baik.

    self.addEventListener('fetch', function(event) {
      event.respondWith(
        fetch(event.request).catch(function() {
          return caches.match(event.request);
        })
      );
    });

### Cache kemudian jaringan {: #cache-then-network }

<img src="images/ss-cache-then-network.png">

**Ideal untuk:** Konten yang sering diperbarui. Mis. artikel, kronologi media
sosial, papan peringkat game.

Ini mengharuskan halaman membuat dua permintaan, satu ke cache, satu ke
jaringan. Dasar pemikirannya adalah menampilkan data yang di-cache terlebih dahulu, lalu memperbarui halaman
saat/jika data jaringan telah tiba.

Kadang Anda dapat hanya menggantikan data saat ini jika data baru telah tiba
(mis., papan peringkat game), namun ini dapat mengganggu dengan konten
lebih besar. Pada dasarnya, jangan "hilangkan" sesuatu yang mungkin sedang dibaca atau
berinteraksi dengan pengguna.

Twitter menambahkan konten baru di atas konten lama & menyesuaikan posisi
scroll sehingga pengguna tidak terganggu. Hal ini mungkin karena Twitter
umumnya menyimpan urutan yang kebanyakan bersifat linier ke konten. Saya menyalin pola ini untuk
[trained-to-thrill][ttt] guna menampilkan konten ke layar secepat
mungkin, namun tetap menampilkan konten terbaru setelah datanya tiba.

**Kode di halaman:**

    var networkDataReceived = false;

    startSpinner();

    // fetch fresh data
    var networkUpdate = fetch('/data.json').then(function(response) {
      return response.json();
    }).then(function(data) {
      networkDataReceived = true;
      updatePage(data);
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

Kami selalu masuk ke jaringan & memperbarui cache sambil jalan.

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


Di [trained-to-thrill][ttt] saya mengatasinya dengan menggunakan
[XHR sebagai ganti pengambilan](https://github.com/jakearchibald/trained-to-thrill/blob/3291dd40923346e3cc9c83ae527004d502e0464f/www/static/js-unmin/utils.js#L3),
dan menyalahgunakan header Accept untuk memberi tahu ServiceWorker tempat untuk mengambil
hasilnya dari ([kode halaman](https://github.com/jakearchibald/trained-to-thrill/blob/3291dd40923346e3cc9c83ae527004d502e0464f/www/static/js-unmin/index.js#L70),
[kode ServiceWorker](https://github.com/jakearchibald/trained-to-thrill/blob/3291dd40923346e3cc9c83ae527004d502e0464f/www/static/js-unmin/sw/index.js#L61)).

### Fallback generik {: #generic-fallback }

<img src="images/ss-generic-fallback.png">

Jika gagal menayangkan item dari cache dan/atau jaringan, Anda mungkin
perlu menyediakan fallback generik.

**Ideal untuk:** Gambar sekunder seperti avatar, permintaan POST yang gagal,
halaman "Tidak tersedia saat offline".

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

Item tujuan fallback Anda mungkin berupa [dependensi penginstalan](#on-install-as-dependency).

Jika halaman memposting email, ServiceWorker mungkin melakukan fallback ke
penyimpanan email di 'outbox' IDB dan merespons dengan memberi tahu halaman bahwa
pengiriman gagal namun data berhasil disimpan.

### Pembuatan template sisi-ServiceWorker {: #serviceworker-side-templating }

<img src="images/ss-sw-side-templating.png">

**Ideal untuk:** Halaman yang respons servernya tidak dapat di-cache.

[Merender halaman di server akan membuat semuanya menjadi cepat](https://jakearchibald.com/2013/progressive-enhancement-is-faster/),
namun itu berarti menyertakan data keadaan yang mungkin tidak logis dalam cache,
mis. "Login sebagai…". Jika halaman dikontrol oleh ServiceWorker,
Anda mungkin malah memilih meminta data JSON beserta template,
dan merendernya.

    importScripts('templating-engine.js');

    self.addEventListener('fetch', function(event) {
      var requestURL = new URL(event.request.url);

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

* [Cache di install](#on-install-as-dependency), untuk UI statis dan perilaku
* [Cache di respons jaringan](#on-network-response), untuk gambar dan data Flickr
* [Ambil dari cache, fallback ke jaringan](#cache-falling-back-to-network), untuk sebagian besar permintaan
* [Ambil dari cache, kemudian jaringan](#cache-then-network), untuk hasil penelusuran Flickr

Amati saja permintaan tersebut dan putuskan tindakan yang harus dilakukan:

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

## Masukan {: .hide-from-toc }

{% include "web/_shared/helpful.html" %}

<div class="clearfix"></div>

### Ucapan terima kasih {: hide-from-toc }
…untuk semua ikon yang menarik:

* [Kode](http://thenounproject.com/term/code/17547/){: .external } oleh buzzyrobot
* [Kalender](http://thenounproject.com/term/calendar/4672/){: .external } oleh Scott Lewis
* [Jaringan oleh](http://thenounproject.com/term/network/12676/){: .external } Ben Rizzo
* [SD](http://thenounproject.com/term/sd-card/6185/) oleh Thomas Le Bas
* [CPU](http://thenounproject.com/term/cpu/72043/){: .external } oleh iconsmind.com
* [Sampah](http://thenounproject.com/term/trash/20538/){: .external } oleh trasnik
* [Notifikasi](http://thenounproject.com/term/notification/32514/){: .external } oleh @daosme
* [Tata letak](http://thenounproject.com/term/layout/36872/){: .external } oleh Mister Pixel
* [Cloud](http://thenounproject.com/term/cloud/2788/){: .external } oleh P.J. Onori

Dan terima kasih kepada [Jeff Posnick](https://twitter.com/jeffposnick) karena memerhatikan banyak error besar
sebelum saya mengklik "publish".

### Bacaan lebih lanjut
* [ServiceWorkers - an Introduction][sw_primer]
* [Is ServiceWorker ready?][is_sw_ready] - track the implementation status across the main browsers
* [JavaScript Promises - an Introduction](/web/fundamentals/getting-started/primers/promises) - guide to promises


[ttt]: https://jakearchibald.github.io/trained-to-thrill/
[is_sw_ready]: https://jakearchibald.github.io/isserviceworkerready/
[sw_primer]: /web/fundamentals/getting-started/primers/service-workers
[caches_api]: https://developer.mozilla.org/en-US/docs/Web/API/Cache

## Masukan {: #feedback }

{% include "web/_shared/helpful.html" %}
