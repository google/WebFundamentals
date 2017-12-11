project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Pelajari cara menyimpan data secara lokal untuk waktu respons dan dukungan offline yang ditingkatkan.

{# wf_updated_on: 2016-09-29 #}
{# wf_published_on: 2016-09-29 #}

# Storage Offline untuk Progressive Web App {: .page-title }

{% include "web/_shared/contributors/addyosmani.html" %}
{% include "web/_shared/contributors/mco.html" %}

<figure class="attempt-right">
  <img src="images/pwa-in-devtools.jpg" alt="PWA di DevTools">
  <figcaption>
    <a href="https://pokedex.org" class="external">Pokedex</a>
    Progressive Web App menggunakan IndexedDB untuk keadaan aplikasi dan dataset Pokemon
    sedangkan Cache API digunakan untuk sumber daya yang bisa dialamatkan URL.
  </figcaption>
</figure>

Koneksi Internet bisa turun-naik atau tidak ada saat di perjalanan, yang merupakan sebab
dukungan offline dan kinerja yang bisa diandalkan menjadi fitur umum di [aplikasi
web progresif](/web/progressive-web-apps/). Bahkan di
lingkungan nirkabel yang sempurna, penggunaan yang bijak atas caching dan teknik storage
lainnya bisa meningkatkan pengalaman pengguna secara mendasar. Dalam entri blog ini, kita akan
merangkum beberapa ide seputar storage data offline untuk PWA — memikirkan payload JSON,
gambar dan data statis umum yang diambil untuk menyediakan pengalaman yang *bermakna*
secara offline.

<div class="clearfix"></div>

## Saran

Mari kita langsung ke pokok masalah dengan saran umum untuk menyimpan data
secara offline:

* Untuk sumber daya yang bisa dialamatkan URL, gunakan [**Cache API**](https://davidwalsh.name/cache)
  (bagian dari [service worker](/web/fundamentals/primers/service-worker/)).
* Untuk semua data lainnya, gunakan [**IndexedDB**](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
  (dengan pembungkus [Promises](/web/fundamentals/getting-started/primers/promises)).

Inilah dasar pemikirannya:

Kedua API asinkron (IndexedDB adalah berbasis kejadian dan Cache API berbasis
Promise). Keduanya juga dapat digunakan bersama [web worker, jendela, dan service
worker](https://nolanlawson.github.io/html5workertest/). IndexedDB
tersedia [di mana saja](http://caniuse.com/#feat=indexeddb). Service
Worker (dan Cache API)
[kini tersedia](https://jakearchibald.github.io/isserviceworkerready/) di Chrome,
Firefox, Opera dan sedang dalam development untuk Edge. Pembungkus Promise untuk
IndexedDB menyembunyikan sebagian mesin andal namun kompleks
(mis. transaksi, penetapan versi skema) yang disertakan bersama pustaka IndexedDB.
 IndexedDB akan mendukung
[pengamat](https://github.com/WICG/indexed-db-observers), yang memungkinkan
sinkronisasi mudah antar tab.

Safari 10 telah
[memperbaiki banyak bug yang sudah berjalan lama di IndexedDB](https://gist.github.com/nolanlawson/08eb857c6b17a30c1b26)
dalam Tech Previews terbaru mereka. CATATAN:  Sebagian orang mengalami masalah stabilitas
pada IndexedDB dan PouchDB di Safari 10 serta mengalami sedikit
kelambatan. Sebelum dilakukan banyak riset di sini, mileage Anda mungkin bervariasi.
Lakukanlah pengujian dan laporkan bug browser agar orang-orang @webkit dan paa penulis pustaka OSS
terkait bisa melihatnya. LocalForage, PouchDB, YDN dan Lovefield
menggunakan WebSQL di Safari secara default (karena tidak ada cara efisien untuk
pengujian fitur bagi IndexedDB yang rusak). Berarti pustaka-pustaka ini akan berfungsi di
Safari 10 tanpa upaya ekstra (cuma tidak menggunakan IndexedDB secara langsung).

Untuk PWA, Anda meng-cache sumber daya statis, menulis shell aplikasi
(file JS/CSS/HTML) dengan menggunakan Cache API dan mengisi data laman offline dari
IndexedDB. Dukungan debug bagi IndexedDB kini tersedia di
[Chrome](/web/tools/chrome-devtools/iterate/manage-data/local-storage)
(tab Application),
Opera, [Firefox](https://developer.mozilla.org/en-US/docs/Tools/Storage_Inspector)
(Storage Inspector) dan Safari (lhat tab Storage).

## Bagaimana dengan mekanisme storage lainnya?

Web Storage (mis. LocalStorage dan SessionStorage) bersifat sinkron, tidak memiliki dukungan Web
Worker dan dibatasi ukuran serta tipenya (hanya string). Cookie [menggunakannya](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies) namun
bersifat sinkron, tidak memiliki dukungan web worker, juga dibatasi ukurannya.
WebSQL tidak memiliki dukungan browser yang luas dan penggunaannya tidak disarankan.
File System API tidak didukung di browser selain Chrome. [File
API](https://developer.mozilla.org/en-US/docs/Web/API/File) sedang
ditingkatkan di
[File and Directory Entries API](https://wicg.github.io/entries-api/)
dan spesifikasi [File API](https://w3c.github.io/FileAPI/) namun belum ada
yang cukup matang atau terstandar untuk mendorong adopsi secara luas.

## Berapa banyak yang bisa saya simpan?

<table>
  <thead>
    <th>Browser</th>
    <th>Batas</th>
  </thead>
  <tbody>
    <tr>
      <td>Chrome</td>
      <td>&lt;6% dari ruang bebas</td>
    </tr>
    <tr>
      <td>Firebox</td>
      <td>&lt;10% dari ruang bebas</td>
    </tr>
    <tr>
      <td>Safari</td>
      <td>&lt;50 MB</td>
    </tr>
    <tr>
      <td>IE10</td>
      <td>&lt;250 MB</td>
    </tr>
  <tbody>
</table>

Di Chrome dan Opera, storage Anda adalah per titik asal (bukan per API). Kedua
mekanisme storage akan menyimpan data hingga
[kuota](http://www.html5rocks.com/en/tutorials/offline/quota-research/) browser
tercapai. Aplikasi bisa memeriksa banyaknya kuota yang sedang digunakan dengan [Quota Management
API](https://developer.mozilla.org/en-US/docs/Web/API/StorageQuota). Di Chrome,
aplikasi bisa menggunakan hingga 6% dari
ruang bebas di disk. Di Firefox, aplikasi bisa menggunakan hingga 10% dari ruang bebas di disk, namun akan
mengkonfirmasi pengguna untuk permintaan storage lebih jauh setelah menyimpan data 50 MB. Di Safari
versi seluler, aplikasi bisa menggunakan hingga 50 MB maks, sedangkan Safari versi desktop memungkinkan
storage tak terbatas (dan mengonfirmasi setelah 5 MB). IE10+ maksimal 250 MB dan akan mengonfirmasi pengguna
saat 10 MB. PouchDB [melacak](https://pouchdb.com/faq.html#data_limits) perilaku storage
IDB.

## Bagaimana saya bisa tahu berapa banyak ruang storage yang digunakan aplikasi saya?

Di Chrome, [Quota Management API](https://www.w3.org/TR/quota-api/) memungkinkan
Anda melakukan kueri terhadap ukuran ruang storage yang saat ini digunakan dan berapa banyak yang tersedia
untuk aplikasi. [Storage Quota Estimate
API](https://www.chromestatus.com/features/5630353511284736) yang lebih baru mencoba membuatnya
lebih mudah lagi untuk mengetahui banyaknya kuota yang digunakan titik asal dengan dukungan untuk
Promises.

## Bagaimana cara kerja penggusuran cache?

<table>
  <thead>
    <th>Browser</th>
    <th>Kebijakan Penggusuran</th>
  </thead>
  <tbody>
    <tr>
      <td>Chrome</td>
      <td>LRU setelah Chrome kehabisan ruang</td>
    </tr>
    <tr>
      <td>Firebox</td>
      <td>LRU jika disk sudah penuh</td>
    </tr>
    <tr>
      <td>Safari</td>
      <td>Tanpa penggusuran</td>
    </tr>
    <tr>
      <td>Edge</td>
      <td>Tanpa penggusuran</td>
    </tr>
  <tbody>
</table>

Titik asal diberi sejumlah ruang untuk digunakan sesukanya. Ruang kosong ini
digunakan bersama oleh semua bentuk storage asal (IndexedDB, Cache API,
localStorage, dll). Jumlah yang diberikan tidak ditetapkan dan akan bervariasi, bergantung pada
kondisi perangkat dan storage.

Bila web storage tinggal sedikit, UA akan mengosongkan storage agar ruang tersedia. Hal ini
bisa mengganggu daya respons offline sehinngga spesifikasi
[Storage](https://storage.spec.whatwg.org/) yang baru-baru ini diperbarui mendefinisikan strategi "persisten", dan
“upaya terbaik”, dengan “upaya terbaik” sebagai default. “Upaya terbaik”
berarti storage bisa dikosongkan tanpa menyela pengguna, namun kurang
tahan lama untuk data jangka panjang dan/atau data kritis. IndexedDB dan Cache API keduanya
termasuk dalam kategori “upaya terbaik” saat ini.

Storage "persisten" tidak secara otomatis dikosongkan bila tinggal sedikit. Pengguna
perlu mengosongkan storage ini secara manual (lewat setelan browser). Chrome sedang
bereksperimen dengan dukungan untuk [Storage
Persisten](/web/updates/2016/06/persistent-storage)
pada percobaan asal, dan berita terbaru mengatakan penyediaannya akan bersama
[Chrome
55](https://groups.google.com/a/chromium.org/d/msg/blink-dev/5Sihi1iAXYc/wnvNDFIPAQAJ).

## Pekerjaan storage offline saat ini dan akan datang

Jika tertarik dengan storage offline, upaya di bawah ini
layak disimak.

* [Storage Tahan Lama](https://storage.spec.whatwg.org/): melindungi storage dari
kebijakan pengosongan oleh agen-pengguna.

* [Indexed Database API 2.0](https://w3c.github.io/IndexedDB/): manajemen
data kunci-nilai.

* [IndexedDB
versi Promise](https://github.com/inexorabletash/indexeddb-promises):
dukungan asli untuk IndexedDB versi Promise.

* [IndexedDB Observer](https://github.com/WICG/indexed-db-observers): observasi
IndexedDB asli tanpa perlu pembungkus untuk database.

* [Async Cookies API](https://github.com/bsittler/async-cookies-api): API
cookie JavaScript asinkron untuk dokumen dan worker.

* [Quota Management API](https://www.w3.org/TR/quota-api/): memeriksa banyaknya
kuota yang digunakan oleh aplikasi/titik asal.

* [file yang bisa ditulis](https://github.com/WICG/writable-files): memungkinkan situs
berinteraksi dengan file lokal secara lebih sempurna.

* [Pengunduhan direktori](https://github.com/drufball/directory-download): memungkinkan
situs mengunduh direktori tanpa file .zip.

* [File and Directory Entries API](https://wicg.github.io/entries-api/):
dukungan untuk pengunggahan file dan direktori dengan cara seret-dan-letakkan.

* Dukungan untuk [Async Cookies
API](https://github.com/WICG/async-cookies-api) sedang dirancang saat ini
bersama polyfill yang sedang dikerjakan.

* Debug IndexedDB saat ini tidak didukung di Edge (akan tetapi, dimungkinkan men
debug JetDB yang mendasarinya) — berikan suara Anda
[di sini](https://wpdev.uservoice.com/forums/257854-microsoft-edge-developer/suggestions/6517763-indexeddb-explorer-in-dev-tools)
untuk dukungan bawaan.

* Walaupun [gagasan](https://github.com/slightlyoff/async-local-storage) untuk
LocalStorage asinkron dahulu telah dimulai, fokus saat ini adalah tentang mendapatkan
[IndexedDB 2.0](https://w3c.github.io/IndexedDB/) dalam keadaan bagus.

* Proposal [file yang bisa ditulis](https://github.com/WICG/writable-files) mungkin
pada akhirnya akan memberi kita solusi pelacakan standar yang lebih baik untuk
interaksi file lokal secara mulus.

* Untuk aplikasi yang memerlukan storage lebih persisten, lihat pekerjaan yang sedang berlangsung pada
[Storage Tahan Lama](https://storage.spec.whatwg.org/).

Storage offline bukanlah keajaiban dan pemahaman atas API yang mendasarinya
akan berguna dalam membantu Anda memanfaatkan sebaik mungkin apa yang sekarang tersedia.
Bila Anda lebih suka menggunakan API ini secara langsung atau menggunakannya bersama pustaka
abstraksi, sisihkan waktu untuk mempelajari opsi Anda.

Semoga panduan ini akan membantu Anda menciptakan pengalaman offline yang membuat
PWA Anda bersinar! ✨

### Bacaan latar belakang

* [State of Offline Storage
APIs](https://docs.google.com/presentation/d/11CJnf77N45qPFAhASwnfRNeEMJfR-E_x05v1Z6Rh5HA/edit)
oleh Joshua Bell

* [Browser Database
Comparison](http://nolanlawson.github.io/database-comparison/) oleh Nolan Lawson

* [IndexedDB, WebSQL, LocalStorage — What Blocks the
DOM?](https://nolanlawson.com/2015/09/29/indexeddb-websql-localstorage-what-blocks-the-dom/)

* [How to Think about Databases (riset
Pokedex)](https://nolanlawson.com/2016/02/08/how-to-think-about-databases/)

* [Which APIs are Supported in Web Workers and Service
Workers?](https://nolanlawson.github.io/html5workertest/)

###Sumber daya berguna

* [sw-toolbox](https://github.com/GoogleChrome/sw-toolbox) (offline-caching
untuk permintaan dinamis/waktu proses)

* [sw-precache](https://github.com/GoogleChrome/sw-precache) (melakukan precache
offline untuk shell aplikasi/aset statis)

* Pengguna Webpack bisa menggunakan secara langsung plugin di atas atau
[plugin offline](https://github.com/NekR/offline-plugin)

### Pustaka-pustaka IndexedDB layak untuk diperiksa

* [localForage](https://github.com/localForage/localForage)(~8 KB, Promise, dukungan
browser lawas yang bagus)

* [Dexie](http://dexie.org/) (~16 KB, Promise, kueri kompleks, dan indeks
sekunder)

* [PouchDB](https://pouchdb.com/) (~45 KB (mendukung [versi
khusus](https://pouchdb.com/2016/06/06/introducing-pouchdb-custom-builds.html)),
sinkronisasi)

* [Lovefield](https://github.com/google/lovefield) (relasional)

* [LokiJS](http://lokijs.org/#/) (di-memori)

* [ydn-db](https://github.com/yathit/ydn-db) (mirip dexie, digunakan bersama WebSQL)

**Terima kasih untuk Nolan Lawson, Joshua Bell (yang mengerjakan Open Web Storage dan
[BlinkOn talk](https://docs.google.com/presentation/d/11CJnf77N45qPFAhASwnfRNeEMJfR-E_x05v1Z6Rh5HA/edit)
banyak mengilhami artikel ini), Jake Archibald, Dru Knox, dan pihak lainnya atas
karya mereka sebelumnya di bidang web storage.**



{# wf_devsite_translation #}
