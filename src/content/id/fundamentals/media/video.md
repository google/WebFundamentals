project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Pelajari tentang cara paling sederhana untuk menambahkan video ke situs Anda dan memastikan pengguna mendapatkan pengalaman terbaik pada perangkat apa pun.

{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2014-04-15 #}

# Video {: .page-title }

{% include "web/_shared/contributors/samdutton.html" %}

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="j5fYOYrsocs"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Pengguna suka dengan video; video sangat menyenangkan dan informatif. Pada perangkat seluler, video bisa
menjadi cara yang lebih mudah untuk mendapat informasi. Namun video menggunakan bandwidth dan mereka tidak
selalu bekerja dengan sama di setiap platform. Pengguna tidak suka menunggu video
dimuat; mereka tidak suka ketika mereka menekan play dan tidak ada yang terjadi. Baca terus untuk menemukan
cara paling sederhana menambahkan video ke situs Anda dan memastikan pengguna mendapatkan pengalaman
terbaik pada perangkat apa pun.


## Menambahkan video 

### TL;DR {: .hide-from-toc }
- Gunakan elemen `video` untuk memuat, melakukan decode, dan memutar video di situs Anda.
- Buat video dalam berbagai format untuk menjangkau berbagai platform seluler.
- Tentukan ukuran video dengan benar; pastikan mereka tidak meluap dari kontainernya.
- Aksesibilitas penting; tambahkan elemen `track` sebagai anak elemen `video`.


### Menambahkan elemen video

Menambahkan elemen `video` untuk memuat, melakukan decode, dan memutar video di situs Anda:

<video controls>
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.webm" type="video/webm">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4" type="video/mp4">
  <p>Browser ini tidak mendukung elemen video.</p>
</video>


    <video src="chrome.webm" type="video/webm">
        <p>Browser Anda tidak mendukung elemen video.</p>
    </video>
    

### Menetapkan beberapa format file

Tidak semua browser mendukung format video yang sama. Elemen `<source>` memperbolehkan 
Anda menentukan beberapa format sebagai fallback apabila browser pengguna 
tidak mendukung salah satunya.

Misalnya:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/media/_code/video-main.html" region_tag="sourcetypes" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/video-main.html){: target="_blank" .external }

Ketika browser melakukan parse tag `<source>`, atribut `type`
opsional digunakan untuk membantu memutuskan file mana yang diunduh dan dimainkan. Jika browser
mendukung `WebM`, bisa memainkan chrome.webm; jika tidak, ia akan mengecek apakah bisa
memainkan video MPEG-4.

Lihat [A Digital Media Primer for Geeks](//www.xiph.org/video/vid1.shtml)
untuk mengetahui selengkapnya tentang bagaimana video dan audio bekerja pada web.

Pendekatan ini memiliki beberapa keunggulan dibandingkan menyajikan HTML yang berbeda atau
pembuatan skrip sisi-server, terutama pada seluler:

* Developer bisa membuat daftar format dengan urutan sesuai keinginan.
* Peralihan sisi-klien bawaan mengurangi latensi; hanya satu permintaan yang dibuat untuk
  mendapatkan materi.
* Membiarkan browser memilih format akan lebih mudah, cepat, dan berpotensi
  lebih dapat diandalkan daripada menggunakan database dukungan sisi-server dengan deteksi agen-pengguna.
* Menentukan setiap tipe file sumber meningkatkan kinerja jaringan; browser bisa memilih
  sumber video tanpa harus mengunduh sebagian video untuk "menebak" formatnya.

Semua hal ini sangat penting dalam konteks seluler, dengan bandwidth
dan latensi berharga premium, serta kesabaran pengguna ada batasnya.
Belum lagi atribut tipe yang bisa memengaruhi kinerja ketika ada
beberapa sumber dengan tipe yang tidak didukung.

Dengan menggunakan alat developer browser seluler, bandingkan aktivitas jaringan [dengan atribut tipe](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/video-main.html){: target="_blank" .external } dan [tanpa atribut tipe](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/notype.html){: target="_blank" .external }.

Periksa juga header respons dalam alat developer browser Anda untuk 
[memastikan server melaporkan tipe MIME yang tepat](//developer.mozilla.org/en/docs/Properly_Configuring_Server_MIME_Types);
jika tidak, pemeriksaan tipe sumber video tidak akan bekerja.

### Menetapkan waktu mulai dan waktu berakhir

Hemat bandwidth dan buat situs Anda terasa lebih responsif: gunakan Media
Fragments API untuk menambahkan waktu mulai dan waktu berakhir ke elemen video.

<video controls>
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.webm#t=5,10" type="video/webm">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4#t=5,10" type="video/mp4">
  <p>Browser ini tidak mendukung elemen video.</p>
</video>

Untuk menambahkan fragmen media, Anda cukup menambahkan `#t=[start_time][,end_time]` ke
URL Media. Misalnya, untuk memutar video antara 5 hingga 10 detik,
tentukan:


    <source src="video/chrome.webm#t=5,10" type="video/webm">
    

Anda juga bisa menggunakan Media Fragments API untuk memberikan beberapa tampilan pada
video yang sama&ndash;seperti titik tanda dalam DVD&ndash;tanpa harus mengenkode dan
menyajikan beberapa file.


Perhatian: Hampir semua platform kecuali iOS mendukung Media Fragments API. Pastikan juga bahwa server Anda mendukung Permintaan Rentang. Secara default, hampir semua server mengaktifkan Permintaan Rentang, namun beberapa layanan hosting mungkin mematikannya.

Dengan menggunakan alat developer browser Anda, periksa `Accept-Ranges: bytes` di
header respons:

<img class="center" alt="Tangkapan layar Chrome DevTools: Accept-Ranges: bytes" src="images/Accept-Ranges-Chrome-Dev-Tools.png">

### Memasukkan gambar poster

Menambahkan atribut poster ke elemen `video` sehingga pengguna mengetahui
tentang materi tersebut segera setelah elemen dimuat, tanpa perlu mengunduh
video atau memulai pemutaran.


    <video poster="poster.jpg" ...>
      ...
    </video>
    

Poster juga bisa menjadi fallback jika `src` video rusak atau jika
format video yang disediakan tidak ada yang didukung. Satu-satunya kekurangan gambar poster adalah
permintaan file tambahan, yang memakan beberapa bandwidth dan membutuhkan
rendering. Untuk informasi selengkapnya, lihat [Optimalisasi gambar](/web/fundamentals/performance/optimizing-content-efficiency/image-optimization).

Berikut adalah perbandingan berdampingan dari video tanpa gambar poster dan dengan gambar poster&ndash;kami membuat gambar poster berwarna hitam putih untuk membuktikan itu bukan video:

<div class="attempt-left">
  <figure>
    <img alt="Tangkapan layar Android Chrome, potret: tanpa poster" src="images/Chrome-Android-video-no-poster.png">
    <figcaption>
      Tangkapan layar Android Chrome, potret: tanpa poster
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img alt="Tangkapan layar Android Chrome, potret: dengan poster" src="images/Chrome-Android-video-poster.png">
    <figcaption>
      Tangkapan layar Android Chrome, potret: dengan poster
     </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>


## Memberikan alternatif untuk platform lawas 

Tidak semua format video didukung pada semua platform. Periksa format
yang didukung pada platform utama dan pastikan video Anda berjalan di setiap
platform tersebut.


### Periksa format apa yang didukung {: #check-formats }

Gunakan `canPlayType()` untuk mengetahui format video yang didukung. Metode ini
mengambil argumen string yang terdiri dari `mime-type` serta codec opsional dan
mengembalikan salah satu nilai berikut:

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Mengembalikan nilai dan Keterangan</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Return value">(string kosong)</td>
      <td data-th="Description">Kontainer dan/atau codec tidak didukung.</td>
    </tr>
    <tr>
      <td data-th="Return value"><code>maybe</code></td>
      <td data-th="Description">
        Kontainer dan codec mungkin tidak didukung, tapi browser
        perlu mengunduh beberapa video untuk diperiksa.
      </td>
    </tr>
    <tr>
      <td data-th="Return value"><code>probably</code></td>
      <td data-th="Description">Format tampaknya didukung.
      </td>
    </tr>
  </tbody>
</table>

Berikut adalah beberapa contoh dari argumen `canPlayType()` dan nilai-nilai yang dikembalikan ketika
dijalankan di Chrome:

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Tipe dan Respons</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Type"><code>video/xyz</code></td>
      <td data-th="Response">(string kosong)</td>
    </tr>
    <tr>
      <td data-th="Type"><code>video/xyz; codecs="avc1.42E01E, mp4a.40.2"</code></td>
      <td data-th="Response">(string kosong)</td>
    </tr>
    <tr>
      <td data-th="Type"><code>video/xyz; codecs="nonsense, noise"</code></td>
      <td data-th="Response">(string kosong)</td>
    </tr>
    <tr>
      <td data-th="Type"><code>video/mp4; codecs="avc1.42E01E, mp4a.40.2"</code></td>
      <td data-th="Response"><code>probably</code></td>
    </tr>
    <tr>
      <td data-th="Type"><code>video/webm</code></td>
      <td data-th="Response"><code>maybe</code></td>
    </tr>
    <tr>
      <td data-th="Type"><code>video/webm; codecs="vp8, vorbis"</code></td>
      <td data-th="Response"><code>probably</code></td>
    </tr>
  </tbody>
</table>


### Membuat video dalam berbagai format

Ada banyak alat untuk membantu menyimpan video yang sama dalam format berbeda:

* Alat desktop: [FFmpeg](//ffmpeg.org/)
* Aplikasi GUI: [Miro](http://www.mirovideoconverter.com/),
  [HandBrake](//handbrake.fr/), [VLC](//www.videolan.org/)
* Layanan enkode/transkode online:
  [Zencoder](//en.wikipedia.org/wiki/Zencoder),
  [Amazon Elastic Encoder](//aws.amazon.com/elastictranscoder)

### Periksa format yang digunakan

Ingin mengetahui format video yang sesungguhnya dipilih browser?

Dalam JavaScript, gunakan properti `currentSrc` video untuk mengembalikan sumber yang digunakan.



## Mengubah ukuran video dengan tepat 

Saat berurusan dengan kebahagiaan pengguna, ukuran file adalah hal yang penting.


### TL;DR {: .hide-from-toc }
- Jangan menyajikan video dengan ukuran bingkai yang lebih besar atau kualitasnya lebih tinggi dari yang bisa ditangani platform.
- Jangan membuat durasi video lebih lama dari yang dibutuhkan.
- Video berdurasi panjang bisa menyebabkan ketersendatan dengan pengunduhan dan pencarian; beberapa browser mungkin harus menunggu sampai video diunduh sebelum memulai pemutaran.


### Memeriksa ukuran video

Ukuran bingkai video yang sebenarnya, seperti yang di-enkode, mungkin berbeda dengan dimensi elemen
video (sebagaimana gambar mungkin tidak ditampilkan menggunakan dimensi
yang sebenarnya).

Untuk memeriksa ukuran video yang di-enkode, gunakan elemen video `videoWidth`
dan properti `videoHeight`. `width` dan `height` mengembalikan dimensi
elemen video, yang mungkin telah diubah ukurannya menggunakan CSS atau atribut lebar dan
tinggi inline.

### Memastikan video tidak meluap dari kontainer

Ketika elemen video terlalu besar untuk tampilan yang terlihat, elemen tersebut mungkin meluap dari
kontainer, sehingga mustahil bagi pengguna untuk melihat materi atau menggunakan
kontrol.

<div class="attempt-left">
  <figure>
    <img alt="Tangkapan layar Android Chrome, potret: elemen video tanpa gaya meluap dari tampilan yang terlihat" src="images/Chrome-Android-portrait-video-unstyled.png">
    <figcaption>
      Tangkapan layar Android Chrome, potret: elemen video tanpa gaya meluap dari tampilan yang terlihat
    </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img alt="Tangkapan layar Android Chrome, lanskap: elemen video tanpa gaya meluap dari tampilan yang terlihat" src="images/Chrome-Android-landscape-video-unstyled.png">
    <figcaption>
      Tangkapan layar Android Chrome, lanskap: elemen video tanpa gaya meluap dari tampilan yang terlihat
    </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

Anda bisa mengontrol dimensi video menggunakan JavaScript atau CSS. Pustaka JavaScript
dan plugin seperti [FitVids](http://fitvidsjs.com/) memungkinkan untuk mempertahankan
ukuran dan rasio aspek yang tepat, bahkan untuk video Flash dari YouTube dan
sumber lainnya.

Gunakan [kueri media CSS](/web/fundamentals/design-and-ux/responsive/#css-media-queries) untuk menentukan ukuran elemen bergantung pada dimensi tampilan yang terlihat; `max-width: 100%` adalah temanmu.

Untuk materi media di iframes (seperti video YouTube), cobalah pendekatan
responsif (seperti yang [dikemukakan oleh John Surdakowski](http://avexdesigns.com/responsive-youtube-embed/)).


Perhatian: Jangan memaksakan perubahan ukuran elemen yang mengakibatkan rasio aspek berbeda dari video asli. Video yang gepeng atau membentang terlihat jelek.

**CSS:**

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/media/_code/responsive_embed.html" region_tag="styling" adjust_indentation="auto" %}
</pre>

**HTML:**

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/media/_code/responsive_embed.html" region_tag="markup" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/responsive_embed.html){: target="_blank" .external }

Bandingkan [contoh responsif](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/responsive_embed.html){: target="_blank" .external }
dengan [versi tidak responsif](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/unyt.html){: target="_blank" .external }.


## Menyesuaikan pemutar video

Platform yang berbeda menampilkan video dengan berbeda. Solusi seluler harus
mempertimbangkan orientasi perangkat. Gunakan Fullscreen API untuk mengontrol tampilan
layar penuh dari materi video.


### Bagaimana orientasi perangkat bekerja di berbagai perangkat

Orientasi perangkat bukanlah masalah bagi monitor desktop atau laptop, namun
sangat penting ketika mempertimbangkan desain laman web untuk perangkat seluler dan tablet.

Safari pada iPhone melakukan tugas yang baik untuk peralihan antara orientasi
potret dan lanskap:

<div class="attempt-left">
  <figure>
    <img  alt="Tangkapan layar dari video yang dimainkan di Safari pada iPhone, potret" src="images/iPhone-video-playing-portrait.png">
    <figcaption>Tangkapan layar dari video yang dimainkan di Safari pada iPhone, potret</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img alt="Tangkapan layar dari video yang dimainkan di Safari pada iPhone, lanskap" src="images/iPhone-video-playing-landscape.png">
    <figcaption>Tangkapan layar dari video yang dimainkan di Safari pada iPhone, lanskap</figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

Orientasi perangkat pada iPad dan Chrome di Android bisa bermasalah.
Misalnya, tanpa penyesuaian apa pun, video yang dimainkan di iPad dalam orientasi
lanskap terlihat seperti ini:

<img alt="Tangkapan layar video yang dimainkan di Safari pada iPad Retina, lanskap"
src="images/iPad-Retina-landscape-video-playing.png">

Mengatur `width: 100%` atau `max-width: 100%` video dengan CSS bisa mengatasi
banyak masalah layout orientasi perangkat. Anda juga mungkin ingin mempertimbangkan
alternatif layar penuh.

## Inline atau tampilan layar penuh

<img class="attempt-right" alt="Tangkapan layar elemen video pada iPhone, potret" src="images/iPhone-video-with-poster.png">

Platform yang berbeda menampilkan video dengan berbeda. Safari pada iPhone menampilkan
elemen video inline pada laman web, namun memutar video dalam mode layar penuh:

<div style="clear:both;"></div>

<img class="attempt-right" alt="Tangkapan layar video yang dimainkan di Chrome pada Android, potret" src="images/Chrome-Android-video-playing-portrait-3x5.png">

Pada Android, pengguna bisa meminta mode layar penuh dengan mengeklik
ikon fullscreen. Namun setelan default adalah memutar video inline:

<div style="clear:both;"></div>

<img class="attempt-right" alt="Tangkapan layar video yang dimainkan di Safari pada iPad Retina, lanskap" src="images/iPad-Retina-landscape-video-playing.png">

Safari pada iPad memutar video inline:

<div style="clear:both;"></div>

### Mengontrol tampilan materi layar penuh

Untuk platform yang tidak mengharuskan pemutaran video layar penuh, Fullscreen API
[didukung secara luas](http://caniuse.com/#feat=fullscreen). Gunakan API ini untuk mengontrol
tampilan layar penuh materi, atau laman.

Untuk menampilkan layar penuh sebuah elemen, seperti video:

    elem.requestFullScreen();
    

Untuk menampilkan layar penuh seluruh dokumen:

    document.body.requestFullScreen();
    

Anda juga bisa mendengarkan perubahan status layar penuh:

    video.addEventListener("fullscreenchange", handler);
    

Atau, periksa untuk melihat apakah elemen saat ini dalam mode layar penuh:

    console.log("In full screen mode: ", video.displayingFullscreen);
    

Anda juga bisa menggunakan kelas-semu `:fullscreen` CSS untuk mengubah cara
elemen ditampilkan dalam mode layar penuh.

<video autoplay muted loop class="attempt-right">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/fullscreen.webm" type="video/webm">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/fullscreen.mp4" type="video/mp4">
  <p>Browser ini tidak mendukung elemen video.</p>
</video>

Pada perangkat yang mendukung Fullscreen API, pertimbangkan untuk menggunakan gambar
kecil sebagai Placeholder untuk video:

Untuk melihatnya beraksi, silakan lihat [demo](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/fullscreen.html){: target="_blank" .external }.

Dogfood: `requestFullScreen()` mungkin berawalan vendor dan mungkin memerlukan kode tambahan untuk kompatibilitas penuh lintas browser.

<div style="clear:both;"></div>




## Masalah aksesibilitas

Aksesibilitas bukan sebuah fitur. Pengguna yang tidak bisa mendengar atau melihat tidak akan dapat merasakan pengalaman video sama sekali tanpa teks atau keterangan. Waktu yang diperlukan untuk menambahkan teks ke video jauh lebih sedikit dibandingkan dengan pengalaman buruk yang Anda berikan kepada pengguna. Menyediakan setidaknya pengalaman dasar untuk semua pengguna.


### Memasukkan teks video untuk meningkatkan aksesibilitas

<img class="attempt-right" alt="Tangkapan layar menunjukkan teks yang ditampilkan menggunakan elemen track di Chrome pada Android" src="images/Chrome-Android-track-landscape-5x3.jpg">

Untuk membuat media lebih mudah diakses di seluler, sertakan teks dan keterangan
menggunakan elemen track.

<div style="clear:both;"></div>

### Menambahkan elemen track

Sangat mudah untuk menambahkan teks ke video&ndash;cukup tambahkan elemen
track sebagai anak dari elemen video:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/media/_code/track.html" region_tag="track" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/track.html){: target="_blank" .external }

Atribut `src` elemen track memberikan lokasi file track.

## Menetapkan teks dalam file track

Sebuah file track terdiri dari "tanda" berwaktu dalam format WebVTT:

    WEBVTT

    00:00.000 --> 00:04.000
    Man sitting on a tree branch, using a laptop.

    00:05.000 --> 00:08.000
    The branch breaks, and he starts to fall.

    ...

Dogfood: Elemen track didukung pada Chrome untuk Android, iOS Safari, dan semua browser terbaru di desktop kecuali Firefox (lihat [caniuse.com/track](http://caniuse.com/track)). Juga ada beberapa polyfill yang tersedia. Kami merekomendasikan [Captionator](http://captionatorjs.com/){: .external }.




## Referensi Singkat

### Atribut elemen video

Untuk daftar lengkap atribut elemen video beserta definisinya, lihat 
[spesifikasi elemen video](//www.w3.org/TR/html5/embedded-content-0.html#the-video-element).

<table>
  <thead>
    <tr>
      <th>Atribut</th>
      <th>Ketersediaan</th>
      <th>Keterangan</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Attribute"><code>src</code></td>
      <td data-th="Availability">Semua browser.</td>
      <td data-th="Description">Alamat (URL) dari video.</td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>poster</code></td>
      <td data-th="Availability">Semua browser.</td>
      <td data-th="Description">Alamat (URL) file gambar yang ditunjukkan browser segera setelah elemen video ditampilkan tanpa mengunduh materi video.</td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>preload</code></td>
      <td data-th="Availability">Semua browser seluler mengesampingkan pramuat.</td>
      <td data-th="Description">Petunjuk bagi browser bahwa pramuat metadata (atau beberapa video) sebelum pemutaran memberikan kita keuntungan. Pilihannya adalah none, metadata, atau auto (lihat bagian <a href="#preload">Pramuat</a> untuk lebih lengkapnya). </td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>autoplay</code></td>
      <td data-th="Availability">Tidak didukung pada iPhone atau Android; didukung pada semua browser desktop, iPad, Firefox, dan Opera untuk Android.</td>
      <td data-th="Description">Memulai pengunduhan dan pemutaran sesegera mungkin (lihat bagian <a href="#autoplay">Autoplay</a> untuk lebih lengkapnya).</td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>loop</code></td>
      <td data-th="Availability">Semua browser.</td>
      <td data-th="Description">Mengulang-ulang video.</td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>controls</code></td>
      <td data-th="Availability">Semua browser.</td>
      <td data-th="Description">Menunjukan kontrol video default (play, pause, dll.).</td>
    </tr>
  </tbody>
</table>

### Autoplay {: #autoplay }

Pada desktop, `autoplay` memberitahukan browser agar mengunduh dan langsung memutar video. Pada iOS, dan Chrome untuk Android, `autoplay` tidak bekerja; pengguna harus mengetuk layar untuk memutar video.

Bahkan pada platform yang memungkinkan autoplay, Anda perlu mempertimbangkan apakah
sebuah keputusan yang bagus untuk mengaktifkannya:

* Penggunaan data bisa berefek berat.
* Meminta media untuk mengunduh dan memulai pemutaran tanpa bertanya terlebih dahulu, bisa
  menghambat bandwith dan CPU secara tak terduga, dan karenanya menghambat perenderan laman.
* Pengguna mungkin dalam suatu keadaan ketika pemutaran video atau audio akan mengganggunya.

Perilaku autoplay bisa dikonfigurasi di Android WebView melalui
[WebSettings API](//developer.android.com/reference/android/webkit/WebSettings.html#setMediaPlaybackRequiresUserGesture(boolean)).
Defaultnya adalah true namun aplikasi WebView dapat memilih untuk menonaktifkannya.

### Pramuat {: #preload }

Atribut `preload` menyediakan petunjuk ke browser tentang seberapa banyak
informasi atau materi yang di-pramuat.

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Nilai &amp; Keterangan</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Value"><code>none</code></td>
      <td data-th="Description">Pengguna mungkin tidak menonton video&ndash;tidak melakukan pramuat apa pun.</td>
    </tr>
    <tr>
      <td data-th="Value"><code>metadata</code></td>
      <td data-th="Description">Metadata (durasi, dimensi, track teks) harus di-pramuat, namun dengan video minimal.</td>
    </tr>
    <tr>
      <td data-th="Value"><code>auto</code></td>
      <td data-th="Description">Pengaturan agar mengunduh seluruh video secara langsung.</td>
    </tr>
  </tbody>
</table>

Atribut `preload` memiliki efek yang berbeda pada platform yang berbeda.
Misalnya, Chrome menyangga 25 detik video pada desktop, namun tanpa penyanggaan pada iOS atau
Android. Ini berarti bahwa pada perangkat seluler, kemungkinan ada penundaan permulaan pemutaran
yang tidak terjadi di desktop.
Lihat [laman pengujian Steve Souders](//stevesouders.com/tests/mediaevents.php)
untuk detail selengkapnya.

### JavaScript

[Artikel HTML5 Rocks Video](//www.html5rocks.com/en/tutorials/video/basics/#toc-javascript)
melakukan tugas hebat dalam meringkas properti, metode, dan kejadian JavaScript
yang bisa digunakan untuk mengontrol pemutaran video. Kami telah menyertakan materi tersebut di sini,
langsung memperbaruinya dengan mempertimbangkan kebutuhan spesifik untuk seluler yang relevan.

#### Properti

<table class="responsive">
  <thead>
    <tr>
    <th colspan="2">Properti &amp; Keterangan</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Property"><code>currentTime</code></td>
      <td data-th="Description">Mendapatkan atau menyetel posisi pemutaran dalam hitungan detik.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>volume</code></td>
      <td data-th="Description">Mendapatkan atau menyetel tingkat volume saat ini bagi video.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>muted</code></td>
      <td data-th="Description">Mendapatkan atau menyetel kebisuan audio.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>playbackRate</code></td>
      <td data-th="Description">Mendapatkan atau menyetel laju pemutaran; 1 adalah kecepatan normal maju.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>buffered</code></td>
      <td data-th="Description">Informasi tentang seberapa banyak video yang telah disangga dan siap diputar.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>currentSrc</code></td>
      <td data-th="Description">Alamat video yang sedang diputar.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>videoWidth</code></td>
      <td data-th="Description">Lebar video dalam piksel (yang mungkin berbeda dari lebar elemen video).</td>
    </tr>
    <tr>
      <td data-th="Property"><code>videoHeight</code></td>
      <td data-th="Description">Tinggi video dalam piksel (yang mungkin berbeda dari tinggi elemen video).</td>
    </tr>
  </tbody>
</table>

`playbackRate` ([lihat demo](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/scripted.html){: target="_blank" .external }) maupun `volume` tidak didukung pada perangkat seluler.

#### Metode

<table class="responsive">
  <thead>
    <tr>
    <th colspan="2">Metode &amp; Keterangan</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Method"><code>load()</code></td>
      <td data-th="Description">Memuat atau memuat ulang sumber video tanpa memulai pemutaran: misalnya, ketika src video diubah menggunakan JavaScript.</td>
    </tr>
    <tr>
      <td data-th="Method"><code>play()</code></td>
      <td data-th="Description">Memutar video dari lokasi saat ini.</td>
    </tr>
    <tr>
      <td data-th="Method"><code>pause()</code></td>
      <td data-th="Description">Menghentikan sementara video di lokasi yang sekarang.</td>
    </tr>
    <tr>
      <td data-th="Method"><code>canPlayType('format')</code></td>
      <td data-th="Description">Mencari tahu format yang didukung (lihat <a href="#check-formats"> Memeriksa format yang didukung</a>).</td>
    </tr>
  </tbody>
</table>

Pada perangkat selular (selain Opera pada Android) `play()` dan `pause()` tidak berfungsi
kecuali dipanggil sebagai respons terhadap aksi pengguna seperti mengeklik tombol: lihat 
[demo](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/scripted.html){: target="_blank" .external }.
(Demikian juga, Anda tidak bisa melakukan pemutaran materi seperti video YouTube
yang disematkan.)

#### Kejadian

Ini hanyalah subset dari kejadian media yang mungkin diaktifkan. Lihat
pada laman [Media events](//developer.mozilla.org/docs/Web/Guide/Events/Media_events)
di Mozilla Developer Network untuk daftar selengkapnya.

<table class="responsive">
  <thead>
  <tr>
    <th colspan="2">Kejadian &amp; Keterangan</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Event"><code>canplaythrough</code></td>
      <td data-th="Description">Diaktifkan ketika browser meyakini telah tersedia cukup data sehingga bisa memutar video seluruhnya tanpa interupsi.</td>
    </tr>
    <tr>
      <td data-th="Event"><code>ended</code></td>
      <td data-th="Description">Diaktifkan ketika video telah selesai diputar.</td>
    </tr>
    <tr>
      <td data-th="Event"><code>error</code></td>
      <td data-th="Description">Diaktifkan jika terjadi kesalahan.</td>
    </tr>
    <tr>
      <td data-th="Event"><code>playing</code></td>
      <td data-th="Description">Diaktifkan saat pertama kali video mulai diputar, setelah dihentikan sementara, atau ketika dihidupkan ulang.</td>
    </tr>
    <tr>
      <td data-th="Event"><code>progress</code></td>
      <td data-th="Description">Diaktifkan secara berkala untuk menunjukkan kemajuan unduhan.</td>
    </tr>
    <tr>
      <td data-th="Event"><code>waiting</code></td>
      <td data-th="Description">Diaktifkan bila sebuah aksi tertunda karena menunggu penyelesaian aksi yang lain.</td>
    </tr>
    <tr>
      <td data-th="Event"><code>loadedmetadata</code></td>
      <td data-th="Description">Diaktifkan bila browser selesai memuat metadata video: durasi, dimensi, dan track teks.</td>
    </tr>
  </tbody>
</table>




{# wf_devsite_translation #}
