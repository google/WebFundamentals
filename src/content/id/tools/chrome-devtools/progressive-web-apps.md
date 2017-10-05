project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Gunakan panel Application untuk memeriksa, memodifikasi, dan men-debug manifes aplikasi web, service worker, dan cache service worker.

{# wf_updated_on: 2016-07-25 #}
{# wf_published_on: 2016-07-25 #}

# Men-debug Progressive Web App {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Gunakan panel <strong>Application</strong> untuk memeriksa, memodifikasi,
dan men-debug manifes aplikasi web, service worker, dan cache service worker.

Panduan Terkait: 

* [Progressive Web App](/web/progressive-web-apps)

Panduan ini hanya membahas fitur Progressive Web App dari panel
**Application**. Bila Anda sedang mencari bantuan untuk panel lainnya, lihat
bagian terakhir dari panduan ini, [Panduan
panel Application lainnya](#other).


### TL;DR {: .hide-from-toc }
- Gunakan panel <strong>App Manifest</strong> untuk memeriksa manifes aplikasi web Anda dan memicu kejadian Add to Homescreen.
- Gunakan panel <strong>Service Worker</strong> untuk segala macam tugas yang berkaitan dengan service worker, seperti mencabut pendaftaran atau memperbarui layanan, mengemulasikan kejadian push, beralih offline, atau menghentikan service worker.
- Tampilkan cache service worker Anda dari panel <strong>Cache Storage</strong>.
- Cabut pendaftaran service worker dan kosongkan semua penyimpanan dan cache dengan sekali klik tombol dari panel <strong>Clear Storage</strong>.


## Manifes aplikasi web {:#manifest}

Jika Anda menginginkan agar pengguna bisa menambahkan aplikasi ke layar beranda seluler mereka,
Anda membutuhkan manifes aplikasi web. Manifes mendefinisikan bagaimana aplikasi ditampilkan di
layar beranda, mengarahkan pengguna saat meluncurkan aplikasi dari layar beranda, dan seperti
apa aplikasi terlihat saat peluncuran.

Panduan Terkait:

* [Meningkatkan pengalaman pengguna dengan Manifes
  Aplikasi Web](/web/fundamentals/engage-and-retain/web-app-manifest)
* [Menggunakan Spanduk
  Pemasangan Aplikasi](/web/fundamentals/engage-and-retain/app-install-banners)

Setelah Anda menyiapkan manifes, Anda bisa menggunakan panel **Manifest** dari panel
**Application** untuk memeriksanya.

![panel manifest][manifest]

* Untuk melihat sumber manifes, klik tautan di bawah label **App Manifest**
  (`https://airhorner.com/manifest.json` dalam tangkapan layar di atas).
* Tekan tombol **Add to homescreen** untuk menyimulasikan kejadian
  Add to Homescreen. Lihat bagian berikutnya untuk informasi selengkapnya.
* Bagian **Identity** dan **Presentation** cuma menampilkan bidang-bidang dari
  sumber manifes dalam tampilan yang lebih ramah pengguna.
* Bagian **Icons** menampilkan semua ikon yang telah Anda tetapkan.

[manifest]: images/manifest.png

### Menyimulasikan kejadian Add to Homescreen {:#add-to-homescreen}

Sebuah aplikasi web hanya bisa ditambahkan ke homescreen ketika situs ini dikunjungi minimal
dua kali, dengan setidaknya lima menit antar kunjungan. Saat mengembangkan atau
men-debug alur kerja Add to Homescreen, kriteria ini bisa jadi tidak praktis.
Tombol **Add to homescreen** pada panel **App Manifest** memungkinkan Anda
menyimulasikan kejadian Add to Homescreen kapan saja Anda inginkan.

Anda bisa menguji fitur ini dengan [Google I/O 2016 progressive web
app](https://events.google.com/io2016/){: .external }, yang memiliki dukungan sesuai untuk Add to
Homescreen. Mengeklik **Add to Homescreen** saat aplikasi dibuka akan menyebabkan
Chrome menampilkan spanduk "add this site to your shelf", yang merupakan
padanan spanduk "add to homescreen" di desktop untuk perangkat seluler.

![menambahkan ke rak desktop][shelf]

**Tip**: Biarkan panel samping **Console** tetap terbuka saat menyimulasikan kejadian
Homescreen. Console akan memberi tahu apakah manifes Anda mengalami masalah dan mencatat log informasi
lainnya tentang daur hidup Add to Homescreen.

Fitur **Add to Homescreen** belum bisa menyimulasikan alur kerja untuk perangkat
seluler. Perhatikan bagaimana prompt "add to shelf" dipicu dalam
tangkapan layar di atas, walaupun DevTools dalam Device Mode. Namun, jika Anda bisa
berhasil menambahkan aplikasi ke rak desktop, maka aplikasi itu juga
akan bekerja untuk seluler.

Jika ingin menguji pengalaman seluler yang asli, Anda bisa
menghubungkan perangkat seluler sungguhan ke DevTools melalui [debug dari jauh][debug
dari jauh], kemudian klik tombol **Add to Homescreen** (di DevTools)
untuk memicu prompt "add to homescreen" di perangkat seluler yang terhubung.

[shelf]: images/io.png
[debug dari jauh]: /web/tools/chrome-devtools/debug/remote-debugging/remote-debugging

## Service worker {:#service-workers}

Service worker adalah teknologi fundamental di platform web masa depan. Mereka
adalah skrip yang dijalankan browser di latar belakang, terpisah dari laman web.
Skrip ini memungkinkan Anda mengakses berbagai fitur yang tidak memerlukan laman web atau interaksi
pengguna, seperti pemberitahuan push, sinkronisasi latar belakang, dan pengalaman offline.

Panduan Terkait:

* [Pengantar Service Worker](/web/fundamentals/primers/service-worker)
* [Pemberitahuan Push: Tepat Waktu, Relevan, dan
  Tepat](/web/fundamentals/engage-and-retain/push-notifications)

Panel **Service Workers** di panel **Application** adalah tempat utama di
DevTools untuk memeriksa dan men-debug service worker.

![panel service worker][sw]

* Jika service worker telah dipasang ke laman yang saat ini dibuka, maka Anda akan melihatnya
  tercantum di panel ini. Misalnya, dalam tangkapan layar di atas ada service
  worker yang dipasang untuk cakupan `https://events.google.com/io2016/`.
* Kotak centang **Offline** memasukkan DevTools ke mode offline. Ini sama dengan
  mode offline yang tersedia dari panel **Network**, atau
  opsi `Go offline` di [Menu Perintah][cm].
* Kotak centang **Update on reload** akan memaksa service worker
  diperbarui saat pemuatan setiap laman.
* Kotak centang **Bypass for network** akan melangkahi service worker dan memaksa
  browser pergi ke jaringan untuk mencari sumber daya yang diminta.
* Tombol **Update** melakukan pembaruan satu-kali untuk service
  worker yang ditetapkan.
* Tombol **Push** mengemulasikan pemberitahuan push tanpa payload (juga dikenal
  sebagai [tickle][tickle]).
* Tombol **Sync** mengemulasikan kejadian sinkronisasi latar belakang.
* Tombol **Unregister** mencabut pendaftaran service worker yang ditetapkan. Lihat
  [Clear storage](#clear-storage) untuk mengetahui cara mencabut pendaftaran service worker dan
  mengosongkan penyimpanan serta cache dengan sekali klik tombol.
* Baris **Source** memberi tahu Anda bila service worker yang saat ini dijalankan
  telah dipasang. Tautan tersebut adalah nama file sumber service worker. Mengeklik
  tautan akan mengirim Anda ke sumber service worker.
* Baris **Status** memberi tahu Anda status service worker. Nomor pada
  baris ini (`#1` dalam tangkapan layar di atas) menunjukkan berapa kali service
  worker telah diperbarui. Jika Anda mengaktifkan kotak centang **update on reload**
  Anda akan melihat bahwa nomor itu bertambah setiap kali laman dimuat. Di sebelah
  status, Anda akan melihat tombol **start** (jika service worker dihentikan) atau tombol
  **stop** (jika service worker sedang berjalan). Service worker
  dirancang untuk dihentikan dan dimulai oleh browser setiap saat. Menghentikan
  service worker Anda secara eksplisit menggunakan tombol **stop** bisa menyimulasikannya.
  Menghentikan service worker Anda adalah cara terbaik untuk menguji bagaimana kode
  Anda berperilaku ketika service worker mulai mencadangkan lagi. Itu sering kali
  memunculkan bug karena asumsi yang salah tentang keadaan global persisten.
* Baris **Clients** akan memberi tahu Anda asal cakupan
 service worker. Tombol **focus** umumnya berguna bila Anda telah mengaktifkan kotak centang
  **show all**. Bila kotak centang itu telah diaktifkan, semua service
  worker yang terdaftar akan dicantumkan. Jika Anda mengeklik tombol **focus** di sebelah service
  worker yang berjalan di tab yang berbeda, Chrome akan berfokus pada tab tersebut.

Bila service worker menyebabkan kesalahan, label baru yang disebut **Errors** akan
muncul.

![service worker dengan error][errors]

[sw]: images/sw.png
[cm]: /web/tools/chrome-devtools/settings#command-menu
[tickle]: /web/fundamentals/engage-and-retain/push-notifications/sending-messages#ways-to-send
[errors]: images/sw-error.png

## Cache service worker {:#caches}

Panel **Cache Storage** menyediakan daftar hanya-baca dari sumber daya yang
telah di-cache menggunakan (service worker) [Cache API][sw-cache].

![panel cache service worker][sw-cache-pane]

Perhatikan bahwa saat Anda pertama kali membuka cache dan menambahkan sumber daya kesitu, DevTools
mungkin tidak mendeteksi perubahan. Muat ulang laman dan Anda akan melihat cache.

Jika Anda punya dua atau beberapa cache yang terbuka, Anda akan melihat mereka tercantum di bawah menu tarik turun
**Cache Storage**.

![beberapa cache service worker][multiple-caches]

[sw-cache]: https://developer.mozilla.org/en-US/docs/Web/API/Cache
[sw-cache-pane]: images/sw-cache.png
[multiple-caches]: images/multiple-caches.png

## Clear storage {:#clear-storage}

Panel **Clear Storage** adalah fitur yang sangat berguna ketika
mengembangkan progressive web app. Panel ini memungkinkan Anda mencabut pendaftaran service worker
dan mengosongkan semua cache dan penyimpanan dengan sekali klik tombol. Lihat
bagian berikut untuk mengetahui selengkapnya.

Panduan Terkait:

* [Clear
  Storage](/web/tools/chrome-devtools/iterate/manage-data/local-storage#clear-storage)

## Panduan panel Application lainnya {:#other}

Lihat panduan di bawah ini untuk bantuan selengkapnya mengenai panel lain di panel
**Application**.

Panduan Terkait:

* [Memeriksa sumber daya laman](/web/tools/chrome-devtools/iterate/manage-data/page-resources)
* [Memeriksa dan mengelola penyimpanan lokal dan
  cache](/web/tools/chrome-devtools/iterate/manage-data/local-storage)


{# wf_devsite_translation #}
