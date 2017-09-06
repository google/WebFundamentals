project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Pustaka Service Worker.

{# wf_published_on: 2015-01-01 #}
{# wf_updated_on: 2016-11-07 #}

# Pustaka Service Worker {: .page-title }

Gunakan pustaka [service worker](/web/fundamentals/getting-started/primers/service-workers)
kami untuk menyederhanakan development Anda dengan menghilangkan kode boilerplate
service worker.

<figure class="attempt-right">
  <img src="/web/tools/images/tools-landing-page.gif">
  <figcaption>Ringkasan Pustaka Service Worker</figcaption>
</figure>

**sw-precache&mdash;**Mengintegrasikan dengan proses pembangunan untuk menghasilkan service
worker yang melakukan precache terhadap aset statis, misalnya, Shell
Aplikasi.

**sw-toolbox&mdash;**Mengimplementasikan pola caching waktu proses umum seperti konten
dinamis, panggilan API, dan sumber daya pihak ketiga semudah menulis README.

**sw-offline-google-analytics&mdash;**Menampung sementara dan mencoba ulang
permintaan analitik agar tidak hilang saat koneksi jaringan terputus.

<div class="clearfix"></div>

## Mengapa menggunakan pustaka service worker?

Anda condong pada keuntungan menambahkan service worker ke aplikasi web
—yang menukar ketidakpastian jaringan dengan janji pengalaman yang didukung
service worker cepat dan offline-dahulu. Namun untuk menulis service worker
Anda sendiri dari nol, Anda harus menyingkirkan beberapa tantangan:

* Precaching URL dengan mudah dan bisa diandalkan. 
* Meningkatkan string versi cache untuk memastikan bahwa sumber daya yang di-precache
  telah diperbarui.
* Mengimplementasikan strategi kedaluwarsa cache untuk menjelaskan ukuran cache
  atau usia entri.
* Membangun pola umum seperti waktu tunggu jaringan [lie-fi](http://www.urbandictionary.com/define.php?term=lie-fi)
  dan kode boilerplate.
* Merekam dan melaporkan data Google Analytics selama penggunaan offline.


Anda bisa mengatasi semua kekurangan ini dengan menggunakan pustaka service worker kami.


## Melakukan precache Service Worker 

[Melakukan precache Service Worker](https://github.com/GoogleChrome/sw-precache/) (`sw-precache`) adalah
modul untuk menghasilkan service worker yang melakukan
precache sumber daya. Modul ini bisa digunakan dalam skrip pembangunan yang berbasis JavaScript,
seperti skrip yang ditulis dengan [`gulp`](https://gulpjs.com/), modul ini juga menyediakan
[antarmuka baris perintah](https://github.com/GoogleChrome/sw-precache/#command-line-interface). Anda bisa menggunakan modul
ini secara langsung, atau jika suka, gunakan [pembungkus](https://github.com/GoogleChrome/sw-precache/#wrappers-and-starter-kits)
di sekeliling `sw-precache` untuk lingkungan pembangunan tertentu, seperti
[`webpack`](https://webpack.github.io/).

Modul ini bisa [digunakan bersama](https://github.com/GoogleChrome/sw-precache/blob/master/sw-precache-and-sw-toolbox.md) pustaka [`sw-toolbox`](https://github.com/GoogleChrome/sw-toolbox),
yang berfungsi dengan baik bila mengikuti [model konten dinamis + Shell Aplikasi](/web/fundamentals/architecture/app-shell).

Dokumentasi lengkap ada dalam [read me](https://github.com/GoogleChrome/sw-precache/blob/master/README.md),
dan [panduan memulai](https://github.com/GoogleChrome/sw-precache/blob/master/GettingStarted.md) 
menyediakan titik awal yang lebih cepat.

[Dapatkan sw-precache](https://github.com/GoogleChrome/sw-precache/){: .button .button-primary }

### Fitur

| Fitur | Rangkuman |
|---------|---------|
| Melakukan Precache Shell Anda | Shell aplikasi web—yaitu HTML, JavaScript, dan CSS inti—bisa disimpan ke cache terlebih dahulu saat pengguna mengunjungi laman Anda. |
| Integrasi Waktu-Pembangunan | Masukkan yang berikut ini dalam proses pembangunan Anda yang sudah ada: [Gulp](https://github.com/GoogleChrome/sw-precache/blob/master/demo/gulpfile.js), [Grunt](https://github.com/GoogleChrome/sw-precache/blob/master/demo/Gruntfile.js), atau [baris perintah](https://github.com/GoogleChrome/sw-precache#command-line-interface). |
| Selalu Terbaru | Perubahan pada versi Anda akan memperbarui skrip service worker. Pengguna akan mendapatkan pembaruan, namun Anda tidak harus secara manual membuat versi materi atau cache. |
| No Network, No Problem | Sumber daya statis Anda disajikan dari [cache terlebih dahulu](/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network), dengan cepat, ada atau tidak ada jaringan. |

## Service Worker Toolbox

[Service Worker Toolbox](https://github.com/GoogleChrome/sw-toolbox/) (`sw-toolbox`) menyediakan
beberapa helper sederhana untuk digunakan dalam membuat service worker Anda sendiri. Alat ini terutama
menyediakan pola cache umum dan
[pendekatan ekspresif](https://googlechrome.github.io/sw-toolbox/docs/master/tutorial-api#expressive-approach)
untuk menggunakan semua strategi itu bagi permintaan waktu proses. 

[Dapatkan sw-toolbox](https://github.com/GoogleChrome/sw-toolbox/){: .button .button-primary }

### Fitur

| Fitur | Rangkuman |
|---------|---------|
| Pembuatan Cache Waktu Proses | Cache sumber daya yang besar atau jarang digunakan, seperti gambar, pada waktu proses, saat pertama kali digunakan. |
| Fallback Offline | Muat gambar baru, respons API, atau konten dinamis lainnya dari jaringan saat online, namun mengembalikan ke placeholder yang di-cache saat offline. |
| Selamat Tinggal Lie-Fi Lie-Fi | Lawan [lie-fi](https://www.youtube.com/watch?v=oRcxExzWlc0) dengan secara otomatis melakukan fallback ke respons yang sudah di-cache bila jaringan terlalu lambat. |
| Hindari Penggelembungan Cache | Gambar dari bulan lalu tidak perlu di-cache selamanya. Penetapan kedaluwarsa cache yang paling jarang digunakan dan menurut usia membantu membebaskan ruang.|

## Google Analytics Offline

[Google Analytics Offline](https://github.com/GoogleChrome/sw-helpers/tree/master/packages/sw-offline-google-analytics) 
menampung sementara dan mencoba lagi permintaan analitik agar tidak hilang
bila koneksi jaringan terputus. Alat (bantu) ini mudah dipasang ke sistem pembangunan Anda menggunakan npm dan
mudah diimpor ke dalam skrip service worker. Konfigurasilah menggunakan
panggilan fungsi berparameter.

[Dapatkan sw-offline-google-analytics](https://github.com/GoogleChrome/sw-helpers/tree/master/packages/sw-offline-google-analytics){: .button .button-primary }

### Fitur

| Fitur | Rangkuman |
|---------|---------|
| Google Analytics Offline | Membuat penanganan pengambilan yang memastikan Google Analytics JavaScript tersedia offline. |
| Meng-cache Data untuk Sementara | Menampung permintaan analitik yang dibuat bila perangkat sedang offline dan mencobanya lagi di saat berikutnya service worker dimulai. |
| Nilai Balasan Khusus | Pasangan kunci/nilai yang akan ditambahkan ke balasan permintaan Google Analytics. Misalnya, Anda dapat menyetel dimensi khusus untuk menunjukkan bahwa permintaan telah dibalas. |
| Parameter Hit yang Dimodifikasi | Memungkinkan Anda memodifikasi parameter hit lewat program, misalnya untuk melacak waktu tempuh antara saat hit dicoba dan saat dibalas. |

## Ketahui Selengkapnya

### Artikel

[Memulai dengan sw-toolbox](http://deanhume.com/home/blogpost/getting-started-with-the-service-worker-toolbox/10134) oleh Dean Hume

[Menambahkan dukungan offline untuk membuat aplikasi reaksi menggunakan sw-precache](https://medium.com/dev-channel/create-react-pwa-7b69425ffa86#.nqsrshawm) oleh Jeffrey Posnick

Studi kasus [Service Worker di Produksi](/web/showcase/case-study/service-workers-iowa)
mengamati dari dekat mengenai cara menggunakan pustaka `sw-precache` dan `sw-toolbox` 
bersama-sama untuk menjalankan
[aplikasi web Google I/O 2015](https://events.google.com/io2015/).

### Codelab

[Menambahkan Service Worker dengan sw-precache](https://codelabs.developers.google.com/codelabs/sw-precache/index.html#0)

### Video

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="jCKZDTtUA2A"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Presentasi Jeff Posnick dari Chrome Dev Summit 2015,
_Instant Loading with Service Workers_, menjelaskan cara menggunakan
`sw-precache` secara efektif bersama `sw-toolbox` untuk membangun aplikasi web yang dimuat dengan cepat dan
bekerja secara offline.

[Slide](https://speakerdeck.com/jeffposnick/instant-loading-with-service-workers-chrome-dev-summit-15)

<div style="clear:both;"></div>

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="IIRj8DftkqE"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Matt Gaunt dan Addy Osmani menjelaskan bagaimana pustaka service worker kami bisa membantu
aplikasi web Anda langsung bekerja offline. Video ini menjelaskan 
`sw-precache` dan `sw-toolbox`.

<div style="clear:both;"></div>

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="gfHXekzD7p0"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Dalam episode Totally Tooling Mini-Tips ini, Matt dan Addy menyusuri
`sw-toolbox`.

<div style="clear:both;"></div>

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="Use459WBeWc"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Dari Google I/O 2016, Mat Scales menjelaskan berbagai pustaka dan alat yang hebat untuk membuat
aplikasi web progresif dimuat dengan cepat, bekerja bagus saat offline, dan meningkat secara progresif,
semuanya demi pengalaman pengguna yang lebih baik.


{# wf_devsite_translation #}
