project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Periksa dan kelola storage, database, dan cache dari panel Application.

{# wf_updated_on: 2016-07-28 #}
{# wf_published_on: 2015-04-13 #}

# Periksa dan Kelola Storage, Database, dan Cache {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
Periksa dan kelola storage, database, dan cache dari panel
<strong>Application</strong>.


### TL;DR {: .hide-from-toc }
- Lihat dan edit penyimpanan lokal dan sesi.
- Periksa dan modifikasi database IndexedDB.
- Eksekusi pernyataan di database Web SQL.
- Tampilkan Cache Aplikasi dan Service Worker.
- Kosongkan semua storage, database, cache, dan service worker dengan sekali klik tombol.


## Penyimpanan lokal {:#local-storage}

Jika Anda menggunakan [penyimpanan lokal][ls] untuk menyimpan pasangan nilai-kunci (KVP), Anda bisa
memeriksa, mengubah, dan menghapus KVP ini dari panel **Local Storage**.

![panel local storage][ls-pane]

* Klik dua kali kunci atau nilai untuk mengedit nilainya.
* Klik dua kali sel kosong untuk menambahkan KVP baru.
* Klik KVP, lalu tekan tombol **delete**
  (![tombol delete][delete]{:.inline}) untuk menghapus KVP tersebut. Anda  bisa
  menghapus semua data penyimpanan lokal Anda dengan sekali klik tombol dari
  [panel **Clear storage**](#clear-storage).
* Jika Anda berinteraksi dengan laman sedemikian rupa sehingga membuat, menghapus, atau mengubah
 KVP, Anda tidak melihat perubahan tersebut diperbarui secara realtime. Klik tombol
  **refresh** (![tombol refresh][refresh]{:.inline}) untuk melihat perubahan.

[ls]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[ls-pane]: /web/tools/chrome-devtools/manage-data/imgs/local-storage.png
[refresh]: /web/tools/chrome-devtools/manage-data/imgs/refresh.png
[delete]: /web/tools/chrome-devtools/manage-data/imgs/delete.png

## Storage sesi {:#session-storage}

Panel **Session Storage** sama cara kerjanya dengan panel **Local Storage**.
 Lihat bagian [Penyimpanan lokal](#local-storage) di atas untuk mempelajari cara
menampilkan dan mengedit [storage sesi][ss].

[ss]: https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage

## IndexedDB {:#indexeddb}

Gunakan panel **IndexedDB** untuk memeriksa, mengubah, dan menghapus data IndexedDB.

Bila Anda meluaskan panel **IndexedDB**, tingkat pertama di bawahnya adalah
database. Jika terdapat beberapa database yang aktif, Anda akan melihat beberapa
entri. Di tangkapan layar berikut, hanya ada satu database aktif untuk laman.

![tab indexeddb][idb-tab]

Klik nama database untuk menampilkan asal keamanan, nama, dan versi
database itu.

![database indexeddb][idb-db]

Luaskan database untuk melihat pasangan nilai-kuncinya (KVP).

![pasangan nilai-kunci indexeddb][idb-kvps]

Gunakan tombol panah di sebelah bidang teks **Start from key** untuk berpindah antar
laman KVP.

Luaskan nilai dan klik dua kali untuk mengedit nilai itu.
Bila Anda menambahkan, memodifikasi, atau menghapus nilai, perubahan itu tidak akan diperbarui secara
realtime. Klik tombol **refresh** untuk memperbarui database.
![mengedit kvp indexeddb][idb-edit]

Masukkan kunci di bidang teks **Start from key** untuk memfilter semua kunci dengan
nilai yang lebih kecil darinya.

![kvps yang difilter][idb-filter]

Bila Anda menambahkan, memodifikasi, atau menghapus nilai, perubahan itu tidak akan diperbarui secara
realtime. Klik tombol **refresh** (![tombol refresh][refresh]{:.inline})
untuk memperbarui database.

Klik tombol **clear object store** (![clear object store][cos]{:.inline})
untuk menghapus semua data dari database Anda. Anda juga bisa melakukannya serta
membatalkan pendaftaran service worker dan membuang storage serta cache dengan
sekali klik dari [panel **Clear storage**](#clear-storage).

[idb-tab]: /web/tools/chrome-devtools/manage-data/imgs/idb-tab.png
[idb-db]: /web/tools/chrome-devtools/manage-data/imgs/idb-db.png
[idb-kvps]: /web/tools/chrome-devtools/manage-data/imgs/idb-kvps.png
[idb-edit]: /web/tools/chrome-devtools/manage-data/imgs/idb-edit.png
[idb-filter]: /web/tools/chrome-devtools/manage-data/imgs/idb-filter.png
[cos]: /web/tools/chrome-devtools/manage-data/imgs/clear-object-store.png

## Web SQL {:#web-sql}

Gunakan panel **Web SQL** untuk membuat kueri dan memodifikasi database Web SQL.

Klik nama database untuk membuka konsol database itu. Dari sini Anda bisa
mengeksekusi pernyataan pada database.

![konsol web sql][wsc]

Klik tabel database untuk menampilkan data tabel itu.

![tabel sql web][wst]

* Anda tidak bisa memperbarui nilai dari sini, tetapi Anda bisa melakukannya melalui konsol
  database (lihat di atas).
* Klik header kolom untuk mengurutkan tabel menurut kolomnya.
* Perubahan yang Anda buat pada tabel tidak akan memperbarui secara realtime. Klik tombol
  **refresh** (![tombol refresh][refresh]{:.inline}) untuk melihat
  pembaruan Anda.
* Masukkan daftar nama kolom yang dipisah spasi atau dipisah koma di bidang teks
  **Visible columns** untuk menampilkan kolom itu saja.

[wsc]: /web/tools/chrome-devtools/manage-data/imgs/web-sql-console.png
[wst]: /web/tools/chrome-devtools/manage-data/imgs/web-sql-table.png

## Application Cache {:#application-cache}

Gunakan panel **Application Cache** untuk memeriksa sumber daya dan aturan yang telah
dibuat melalui [Application Cache API][appcache-api].

![panel application cache][appcache]

Setiap baris menyatakan sebuah sumber daya.

Kolom **Type** akan memiliki salah satu dari nilai berikut:

* **Master**. Atribut `manifest` pada sumber daya mengindikasikan bahwa cache
  ini adalah masternya.
* **Explicit**. Sumber daya ini secara eksplisit ditampilkan di manifes.
* **Network**. Manifes menentukan bahwa sumber daya ini harus berasal dari
  jaringan.
* **Fallback**. URL di kolom **Resource** dicantumkan sebagai fallback
  untuk URL lain (tidak ditampilkan di DevTools).

Di bagian bawah tabel, terdapat ikon yang menunjukkan koneksi
jaringan Anda dan status cache aplikasi. Cache aplikasi
bisa memiliki status berikut:

* **IDLE**. Cache tidak memiliki perubahan baru.
* **CHECKING**. Manifes sedang diambil dan pembaruannya sedang diperiksa.
* **DOWNLOADING**. Sumber daya sedang ditambahkan ke cache.
* **UPDATEREADY**. Versi cache yang baru tersedia.
* **OBSOLETE**. Cache sudah dihapus.

[appcache-api]: https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache
[appcache]: /web/tools/chrome-devtools/manage-data/imgs/appcache.png

## Cache Service Worker {:#service-worker-caches}

Panel **Cache Storage** di panel **Aplikasi** memungkinkan Anda memeriksa,
mengubah, dan men-debug cache yang dibuat dengan API Cache (service worker). Lihat
panduan di bawah ini untuk bantuan selengkapnya.

{# include shared/related_guides.liquid inline=true list=page.related-guides.pwa #}

## Kosongkan service worker, storage, database, dan cache {:#clear-storage}

Kadang-kadang, Anda hanya perlu menghapus semua data untuk asal tertentu. Panel **Clear
Storage** di panel **Aplikasi** memungkinkan Anda secara selektif membatalkan pendaftaran
service worker, penyimpanan, dan cache. Untuk menghapus data, cukup aktifkan kotak centang
di samping komponen yang ingin Anda hapus, lalu klik **Clear site
data**. Aksi ini menghapus semua data dari asal yang dicantumkan dengan label
**Clear storage**.

![clear storage][clear]

[clear]: /web/tools/chrome-devtools/manage-data/imgs/clear-storage.png


{# wf_devsite_translation #}
