project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Kadang-kadang bagian tersulit dari sebuah proyek baru adalah memulainya. Web Starter Kit memberikan Anda dasar yang kuat dengan berbagai alat untuk membantu Anda selama proses development.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2014-07-16 #}

# Memulai Situs Anda dengan Web Starter Kit {: .page-title }

Perhatian: Artikel ini sudah lama tidak diperbarui dan mungkin tidak sesuai lagi dengan keadaan sebenarnya. Pastikan untuk memeriksa [dokumentasi](https://github.com/google/web-starter-kit/) Web Starter Kit untuk detail terbaru.

{% include "web/_shared/contributors/mattgaunt.html" %}

<img src="images/wsk-on-pixel-n5.png" class="attempt-right">

Panduan ini membantu Anda melalui proses membangun sebuah situs baru dengan Web
Starter Kit dan membantu memaksimalkan kegunaan dari alat yang disediakan.

<div style="clear:both;"></div>

## Fase development

Ketika development, ada tiga perintah yang akan Anda gunakan secara reguler: `gulp serve`, `gulp`, dan `gulp serve:dist`. Mari kita lihat bagaimana masing-masing perintah tersebut memberikan kontribusi terhadap proses development.


### Memulai Server Lokal

Tugas pertama yang akan kita lihat adalah: `$ gulp serve`.

Tampak dari luarnya, tugas ini memulai server HTTP lokal sehingga Anda bisa melihat situs Anda
di browser, namun ada beberapa alat tambahan yang bekerja di belakang layar.

#### Live Reload

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="JE-ejS8N3YI"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Live reload menghilangkan ritual segarkan tradisional saat membuat perubahan dalam
editor, beralih ke browser, menekan CTRL-R, dan kemudian menunggu laman untuk
muat ulang.

Dengan Live Reload, Anda bisa membuat perubahan dalam editor dan melihatnya langsung
berefek ke browser dengan situs terbuka.


#### Pengujian di Berbagai Perangkat

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="RKKBIs_3svM"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Browser Sync membantu Anda untuk menguji situs di berbagai perangkat. Setiap gulir,
ketukan, atau penekanan keyboard akan dibagikan bersama di browser yang terhubung.

Ini hanya akan bekerja ketika Anda menjalankan situs dengan `gulp serve`. Cobalah dengan menjalankan
`gulp serve`, buka URL tersebut di dua jendela browser berdampingan dan gulir
salah satu laman.

<div style="clear:both;"></div>

#### Pembuatan Awalan Otomatis

Ketika menargetkan berbagai macam browser, Anda harus menggunakan awalan vendor untuk
memastikan Anda bisa menggunakan fitur-fitur di semua browser tersebut. Web Starter Kit mengotomatiskan semua
pembuatan awalan.

CSS contoh kami (di bawah) tidak menyertakan awalan vendor:

    .app-bar-container {
      display: flex;

      width: 100%;
      height: 60px;
      position: relative;

      flex-direction: row;

      margin: 0 auto;
    }

Proses pembangunan menjalankan CSS melalui autoprefixer yang menghasilkan
keluaran akhir di bawah ini:

    .app-bar-container {
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;

      width: 100%;
      height: 60px;
      position: relative;

      -webkit-flex-direction: row;
          -ms-flex-direction: row;
              flex-direction: row;

      margin: 0 auto;
    }

#### Memeriksa JavaScript Anda

JSHint adalah alat (bantu) yang memindai kode JavaScript Anda untuk memeriksa masalah
dengan logika JavaScript yang mungkin muncul dan [memberlakukan praktik terbaik pengkodean](//www.jshint.com/docs/){: .external }.

Alat ini berjalan setiap kali Anda membangun proyek atau, jika Anda menjalankan server gulp,
setiap kali Anda membuat perubahan ke file JavaScript.

#### Mengompilasi Sass Anda

Ketika Anda menjalankan perintah layani, setiap perubahan yang dibuat ke file
Sass dalam proyek Anda akan dikompilasi ke dalam CSS dan diberi awalan, setelah itu, laman
Anda akan dimuat ulang dengan Live Reload.

Bagi mereka yang baru dengan Sass, proyek ini menjelaskan dirinya sebagai "bahasa ekstensi
CSS". Pada dasarnya, ini adalah CSS dengan beberapa fitur tambahan. Misalnya,
itu menambahkan dukungan untuk variabel dan fungsi, yang membantu Anda menyusun CSS
secara modular dan dapat digunakan kembali.

### Membangun Versi Produksi Situs Anda

Anda bisa membangun versi siap produksi dari sebuah situs dengan perintah `gulp`
sederhana. Perintah ini menjalankan beberapa tugas yang telah kita lihat, dengan tugas
tambahan yang ditujukan agar situs Anda dimuat lebih cepat dan lebih efisien.

Tugas utama yang dilakukan versi produksi adalah:

#### Membangun Gaya

Pertama, versi akan mengompilasi Sass dalam proyek Anda. Setelah Sass
dikompilasi, Autoprefixer akan dijalankan di atas semua CSS.

#### Memeriksa masalah pada JavaScript Anda

Langkah versi kedua adalah menjalankan JSHint di atas JavaScript Anda.

#### Membangun Laman HTML

Langkah berikutnya adalah memeriksa file HTML Anda, mencari blok versi untuk menyambungkan
dan mengecilkan JavaScript. Setelah JavaScript beres, proses pembangunan
akan mengecilkan laman HTML.

Minifikasi mengurangi jumlah karakter dalam file JavaScript akhir dengan
menghapus komentar atau karakter ruang yang tidak benar-benar diperlukan, serta
beberapa teknik lainnya. Hal ini mengurangi ukuran file akhir, mempercepat waktu muat situs
Anda.

Penyambungan berarti menyisipkan materi dari beberapa file menjadi satu. Alasan
kita melakukan ini adalah agar browser cukup membuat satu permintaan ke
server, sehingga lebih cepat bagi pengguna.

Blok versi memiliki segala yang dibutuhkan untuk mengelola file JavaScript yang kita kecilkan
dan sambungkan bersama. Mari kita lihat blok versi contoh:

    <!-- build:js scripts/main.min.js -->
    <script src="scripts/example-1.js"></script>
    <script src="scripts/example-2.js"></script>
    <!-- endbuild -->

Sebuah blok versi tidak lebih dari komentar yang diformat secara khusus.
Semua file javascript Anda di antara blok versi akan disatukan
(concatenated) dan dikecilkan ke dalam sebuah file yang bernama main.min.js dan
versi akhir akan menggantikan skrip ini dengan tag skrip:

    <script src="scripts/main.min.js"></script>

#### Mengoptimalkan aset gambar

Untuk file JPEG dan PNG, meta data dalam gambar akan dikeluarkan; itu tidak diperlukan
untuk merender gambar. Meta data memuat informasi seperti kamera yang digunakan
untuk mengambil foto.

Untuk SVG, itu akan menghapus setiap atribut atau spasi yang tidak diperlukan dan
komentar yang ada.

#### Menyalin Font

Tugas sederhana ini menyalin font dari aplikasi ke direktori versi akhir.

#### Menyalin File dari Direktori Akar

Jika versi menemukan file dalam direktori akat proyek, itu akan menyalinnya
ke build akhir juga.

### Menguji Versi Produksi Anda

Sebelum Anda mendorong sesuatu ke versi produksi, Anda harus memastikan semuanya bekerja
seperti yang diharapkan. Perintah `gulp serve:dist` membuat versi produksi dari situs,
memulai server, dan membuka browser untuk Anda. Ini **tidak memiliki Live Reload atau
Browser Sync**, namun cara ini dapat diandalkan untuk menguji situs Anda sebelum menerapkannya.


## Menyiapkan Web Starter Kit


Web Starter Kit bergantung pada NodeJS, NPM, dan Sass untuk bekerja. Setelah ini terpasang, Anda akan memiliki semua yang dibutuhkan untuk mulai menggunakan Web Starter Kit dalam proyek Anda.


### Memasang Dependensi Satu Kali

Ada dua perangkat alat yang harus terpasang pada komputer sebelum Anda bisa membangun
situs dengan Web Starter Kit: NodeJS dan NPM, & Sass.

#### NodeJS & NPM

Alat versi Web Starter Kit membutuhkan Node dan NPM. Node digunakan untuk menjalankan Gulp,
eksekutor tugas. NPM digunakan untuk mengunduh modul yang diperlukan untuk melakukan tugas tertentu
di Gulp.

Jika Anda tidak yakin apakah memiliki NodeJS dan NPM, silakan periksa dengan membuka baris perintah dan
menjalankan `node -v`. Jika Node merespons, periksa versi yang cocok dengan versi saat ini
pada NodeJS.org.

Jika Anda tidak mendapatkan respons atau menggunakan versi lama, masuk ke NodeJS.org dan
klik tombol Install besar berwarna hijau. NPM akan dipasang dengan NodeJS
secara otomatis.

### Menyiapkan Proyek Web Starter Kit Anda

Langkah pertama adalah masuk ke [/web/tools/starter-kit/](/web/tools/starter-kit/)
dan mengunduh serta mengekstrak file zip. Ini akan menjadi dasar proyek Anda, jadi ubah nama folder dan letakkan di tempat yang relevan pada komputer Anda. Untuk seterusnya dalam panduan ini, kita akan menyebutnya folder `my-project.`

Berikutnya, Anda harus memasang dependensi lokal untuk Web Starter Kit. Buka
command prompt, ubah direktori ke folder proyek Anda dan jalankan skrip pasang
NPM berikut.

    cd my-project
    npm install
    npm install gulp -g

Sudah selesai! Sekarang Anda memiliki semua yang dibutuhkan untuk menggunakan alat Gulp di Web Starter
Kit.


Note: Jika Anda melihat kesalahan izin atau akses seperti <code>EPERM</code> atau <code>EACCESS</code>, jangan gunakan <code>sudo</code> sebagai solusi. Periksa <a href='https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md'>laman ini</a> untuk solusi yang lebih andal.

<!--
The next section of this guide covers how to use Gulp, but if you want to see
how things look, try running the local server by typing `gulp serve`.
-->
<img src="images/wsk-on-pixel-n5.png">


{# wf_devsite_translation #}
