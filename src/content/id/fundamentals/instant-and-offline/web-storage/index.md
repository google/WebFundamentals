project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2016-09-28 #}
{# wf_published_on: 2016-09-28 #}

# Ringkasan Web Storage {: .page-title }

{% include "web/_shared/contributors/mco.html" %}

Mekanisme storage yang tepat perlu dipilih, baik untuk storage perangkat lokal
maupun untuk storage server berbasis awan.  Mesin storage yang baik akan memastikan
informasi Anda disimpan secara meyakinkan, mengurangi bandwidth, dan meningkatkan
responsivitas. Strategi caching storage yang tepat merupakan blok pembangunan utama untuk
memungkinkan pengalaman web seluler. 

Artikel ini menyediakan fondasi ringkas untuk mengevaluasi layanan dan API
storage, setelah itu kami akan menyediakan tabel perbandingan dan beberapa
panduan umum. Tidak lama lagi, kami berencana menambahkan sumber daya untuk memahami
berbagai topik storage pilihan lebih jauh lagi.

## Taksonomi Storage

Mari kita mulai dengan memahami sebagian dimensi yang nanti bisa digunakan untuk
menganalisis storage data aplikasi web. Nanti, kita akan menggunakan kerangka kerja ini untuk menguraikan satu per satu dan mengevaluasi
berbagai opsi storage yang tersedia untuk developer web.

### Model Data

Model untuk menyimpan unit data menentukan cara menyusun data secara internal,
yang memengaruhi kemudahan penggunaan, biaya serta kinerja permintaan storage dan
pengambilan. 

* **Terstruktur: **Data yang disimpan dalam tabel dengan bidang-bidang yang telah
didefinisikan sebelumnya, sebagaimana umumnya
sistem manajemen database berbasis SQL, mendukung penggunaan kueri yang fleksibel dan dinamis, ketika beragam tipe kueri mungkin tidak dikenali secara a
priori. Contoh jelas datastore terstruktur adalah IndexedDB di
browser.

* **Kunci/Nilai:** Datastore Kunci/Nilai dan database NoSQL terkait, menawarkan
kemampuan menyimpan dan mengambil data tidak terstruktur yang diindeks dengan kunci unik.
Datastore Kunci/Nilai seperti tabel hash karena memungkinkan akses waktu-konstanta
ke data kabur yang telah diindeks. Contoh menonjol datastore kunci/nilai adalah
Cache API di browser dan Apache Cassandra di server.

* **Aliran Byte:** Model sederhana ini menyimpan data sebagai string byte kabur dengan
panjang bervariasi yang menyerahkan segala bentuk pengorganisasian internal
ke layer aplikasi. Model ini terutama bagus untuk sistem file dan blob data lainnya yang tersusun
secara hierarkis. Contoh menonjol dari datastore aliran byte antara lain
sistem file dan layanan cloud storage.

### Persistensi

Metode storage untuk aplikasi web bisa dianalisis sesuai dengan cakupan persistensi
yang dibuat untuk data.

* **Persistensi Sesi: **Data dalam kategori ini hanya disimpan selama
sesi web tunggal atau selama tab browser masih aktif. Contoh mekanisme storage
dengan persistensi sesi adalah Session Storage API.

* **Persistensi Perangkat:** Data dalam kategori ini dipertahankan di semua sesi dan
tab/jendela browser, dalam perangkat tertentu. Contoh mekanisme storage
dengan persistensi perangkat adalah Cache API.

* **Persistensi Global:** Data dalam kategori ini dipertahankan di semua sesi dan
perangkat. Dengan demikian, inilah bentuk persistensi data yang paling sempurna. Contoh
mekanisme storage dengan persistensi global adalah Google Cloud Storage.

### Dukungan Browser

Developer harus memilih API yang paling cocok dengan domain masalah mereka; akan tetapi,
mereka juga harus memperhitungkan kenyataan bahwa API yang telah distandardisasi dan
sudah mapan lebih disukai pada antarmuka khusus atau kepemilikan, karena
cenderung bertahan lebih lama dan didukung lebih luas. Mereka juga memperoleh
basis pengetahuan yang lebih luas dan ekosistem developer yang lebih kaya.

### Transaksi

Sering kali, suatu kumpulan operasi storage yang berkaitan dengan
harus berhasil atau gagal secara atomik. Sistem manajemen database umumnya mendukung
fitur ini dengan menggunakan model transaksi, di mana pembaruan yang berkaitan dapat
dikelompokkan ke dalam unit-unit arbitrer. Walaupun tidak selalu diperlukan, ini adala fitur yang praktis,
dan kadang-kadang esensial, di beberapa domain masalah.

### Sinkron/Asinkron

Sebagian API storage bersifat sinkronus dalam artian bahwa permintaan storage atau pengambilan
memblokir thread yang saat ini aktif hingga permintaan diselesaikan. Hal
ini sangat memberatkan di browser web, karena permintaan storage menggunakan
thread utama bersama UI. Karena alasan efisiensi dan kinerja,
API storage asinkronus lebih disukai.

## Perbandingan

Di bagian ini, kita mengamati API yang saat ini tersedia untuk para developer web
dan membandingkannya dengan berbagai dimensi yang dijelaskan di atas.

<table>
  <thead>
    <th>API</th>
    <th>Model 
Data</th>
    <th>Persistensi</th>
    <th>Dukungan
Browser</th>
    <th>Transaksi</th>
    <th>Sinkron/Asinkron</th>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://developer.mozilla.org/en-US/docs/Web/API/FileSystem">File system</a></td>
      <td>Aliran byte</td>
      <td>perangkat</td>
      <td><a href="http://caniuse.com/#feat=filesystem">52%</a></td>
      <td>Tidak</td>
      <td>Asinkron</td>
    </tr>
    <tr>
      <td><a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage">Local Storage</a></td>
      <td>kunci/nilai</td>
      <td>perangkat</td>
      <td><a href="http://caniuse.com/#feat=namevalue-storage">93%</a></td>
      <td>Tidak</td>
      <td>Sinkron</td>
    </tr>
    <tr>
      <td><a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage">Session Storage</a></td>
      <td>kunci/nilai</td>
      <td>sesi</td>
      <td><a href="http://caniuse.com/#feat=namevalue-storage">93%</a></td>
      <td>Tidak</td>
      <td>Sinkron</td>
    </tr>
    <tr>
      <td><a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies">Cookies</a></td>
      <td>terstruktur</td>
      <td>perangkat</td>
      <td>100%</td>
      <td>Tidak</td>
      <td>Sinkron</td>
    </tr>
    <tr>
      <td><a href="https://www.w3.org/TR/webdatabase/">WebSQL</a></td>
      <td>terstruktur</td>
      <td>perangkat</td>
      <td><a href="http://caniuse.com/#feat=sql-storage">77%</a></td>
      <td>Ya</td>
      <td>Asinkron</td>
    </tr>
    <tr>
      <td><a href="https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage">Cache</a></td>
      <td>kunci/nilai</td>
      <td>perangkat</td>
      <td><a href="http://caniuse.com/#feat=serviceworkers">60%</a></td>
      <td>Tidak</td>
      <td>Asinkron</td>
    </tr>
    <tr>
      <td><a href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API">IndexedDB</a></td>
      <td>hibrid</td>
      <td>perangkat</td>
      <td><a href="http://caniuse.com/#feat=indexeddb">83%</a></td>
      <td>Ya</td>
      <td>Asinkron</td>
    </tr>
    <tr>
      <td><a href="https://cloud.google.com/storage/">cloud storage</a></td>
      <td>aliran byte</td>
      <td>global</td>
      <td>100%</td>
      <td>Tidak</td>
      <td>Keduanya</td>
    </tr>
  <tbody>
</table>

Seperti disebutkan di atas, sebaiknya pilih API yang didukung luas di
sebanyak mungkin browser dan yang menawarkan model panggilan asinkronus, untuk memaksimalkan
interoperabilitas dengan UI. Kriteria ini dengan sendirinya membawa pada pilihan
teknologi berikut:

* Untuk kunci/nilai lokal perangkat, gunakan Cache API.

* Untuk storage terstruktur lokal perangkat: gunakan IndexedDB.

* Untuk storage aliran byte global: gunakan layanan Cloud Storage.

Kombinasi ini memenuhi kebutuhan storage dasar bagi banyak aplikasi web seluler.
Nantikan artikel mendatang yang akan membahas cara menangani pola storage
umum secara detail, bersama contoh kode penyerta.

## Men-debug storage di Chrome DevTools {: #devtools }

Periksalah dokumentasi berikut untuk mengetahui selengkapnya tentang penggunaan Chrome DevTools untuk
memeriksa dan men-debug API web storage yang Anda pilih. API yang tidak disebutkan
di sini berarti tidak didukung di DevTools atau tidak berlaku.

* [Local Storage](/web/tools/chrome-devtools/manage-data/local-storage#local-storage)
* [Session Storage](/web/tools/chrome-devtools/manage-data/local-storage#session-storage)
* [Cookie](/web/tools/chrome-devtools/manage-data/cookies)
* [Web SQL](/web/tools/chrome-devtools/manage-data/local-storage#web-sql)
* [Cache](/web/tools/chrome-devtools/progressive-web-apps#caches)
* [IndexedDB](/web/tools/chrome-devtools/manage-data/local-storage#indexeddb)

Jika Anda menggunakan beberapa API storage, periksalah fitur Clear Storage dari
DevTools. Fitur ini memungkinkan Anda mengosongkan beberapa storage
sekaligus dengan sekali klik tombol. Lihat [Kosongkan service worker, storage, database, dan
cache](/web/tools/chrome-devtools/manage-data/local-storage#clear-storage) untuk
informasi selengkapnya.

## Berikutnya ke mana…

Karena kini telah mengulas sebagian cara pikir yang relevan tentang mekanisme storage
dan membandingkan API yang paling populer dan layanan yang tersedia saat ini,
tidak lama lagi kami akan menambahkan materi lebih banyak untuk lebih mendalami satu atau beberapa topik
perhatian:

* [Saran Storage Offline untuk Progressive Web App](offline-for-pwa)

* Pola Storage Umum (segera hadir)

* Metode Storage Back-End yang Disarankan (segera hadir)

* Mendalami: IndexedDB (segera hadir)

* Mendalami: Cache API (segera hadir)

* Analisis Kerangka Kerja Storage Populer (segera hadir)


{# wf_devsite_translation #}
