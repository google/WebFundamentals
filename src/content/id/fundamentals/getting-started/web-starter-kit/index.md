project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Kadang-kadang bagian tersulit dari sebuah proyek adalah bagaimana memulainya. Web Starter Kit memberi Anda dasar yang kuat dengan berbagai peralatan untuk membantu Anda di sepanjang proses pembangunan.

{# wf_updated_on: 2016-09-20 #}
{# wf_published_on: 2014-07-16 #}

# Mulai situs Anda dengan Web Starter Kit {: .page-title }

{% include "_shared/contributors/mattgaunt.html" %}




Panduan ini membimbing Anda melalui proses membangun sebuah situs baru dengan Web
Starter Kit dan membantu Anda untuk memanfaatkan sebagian besar peralatan yang disediakan olehnya.

<img src="images/wsk-on-pixel-n5.png">

## Fase Development 

Selama development, ada tiga perintah yang akan Anda gunakan secara teratur: `gulp serve`, `gulp`, dan `gulp serve:dist`. Mari kita lihat bagaimana masing-masing memberikan kontribusi terhadap proses development. 


### Jalankan Server Lokal

Tugas pertama yang akan kita lakukan adalah: `$ gulp serve`.

Di permukaan, tugas ini terlihat sekedar memulai server HTTP lokal sehingga Anda dapat melihat situs Anda
di browser, tapi di belakang layar, sebenarnya ada beberapa alat tambahan yang dijalankan.

#### Pemuatan Ulang Secara Langsung (Live Reload)

Pemuatan Ulang Secara Langsung (Live Reload) menghilangkan penyegaran secara tradisional saat perubahan terjadi di 
editor, beralih ke browser, menekan CTRL-R, dan kemudian menunggu halaman
dimuat ulang.

Dengan Live Reload, Anda bisa membuat perubahan dalam editor Anda dan perubahannya segera terlihat
di browser yang memuat situs Anda.

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="JE-ejS8N3YI"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

#### Pengujian di Berbagai Macam Perangkat

Browser Sync membantu Anda menguji situs Anda di beberapa perangkat. Setiap penggulungan (scroll),
pengetukan (tap), atau penenakan keyboard akan diterapkan di browser lain yang terhubung.

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="RKKBIs_3svM"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Fitur ni hanya bekerja ketika Anda menjalankan situs Anda dengan `gulp serve`. Coba jalankan
`gulp serve`, buka URL di dua jendela browser berdampingan dan gulir
salah satu halaman.

#### Mengotomasikan Prefixing

Ketika menargetkan berbagai browser, Anda harus menggunakan vendor prefixes untuk
memastikan Anda dapat menggunakan fitur di masing-masing browser. Web Starter Kit mengotomatiskan semua
proses prefixing untuk Anda.

Contoh CSS kita (di bawah) tidak menerapkan vendor prefixes:

    .app-bar-container {
      display: flex;

      width: 100%;
      height: 60px;
      position: relative;

      flex-direction: row;

      margin: 0 auto;
    }

Proses build menjalankan CSS melalui autoprefixer yang akan menghasilkan 
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

#### Periksa Javascript Anda

JSHint adalah alat yang memindai kode JavaScript Anda untuk memeriksa masalah yang mungkin terjadi
dengan logika JavaScript Anda untuk [menerapkan coding best practices](http://www.jshint.com/docs/).

Alat ini berjalan setiap kali Anda membangun proyek atau, jika Anda menjalankan gulp server,
setiap kali Anda membuat perubahan di file JavaScript.

#### Mengkompilasi Sass Anda

Ketika Anda menjalankan perintah 'serve', setiap perubahan yang dibuat ke salah satu Sass
file dalam proyek Anda akan dikompilasi ke CSS dan diterapkan vendor prefix, setelah itu 
halaman akan dimuat ulang dengan Live Reload.

Bagi mereka yang baru mengenal Sass, proyek ini menggambarkan dirinya sebagai "CSS
extension language". Pada dasarnya Sass adalah CSS dengan beberapa fitur tambahan. Sebagai contoh,
Sass menambah dukungan variabel dan fungsi, yang membantu Anda menyusun CSS Anda
secara modular dan dapat digunakan ulang.

### Bangun Versi Akhir Situs Anda

Anda bisa membangun versi akhir dari situs Anda dengan perintah sederhana `gulp`. 
Perintah ini menjalankan beberapa tugas, dengan tambahan
tugas yang ditujukan untuk membuat pemuatan situs Anda lebih cepat dan lebih efisien.

Tugas utama yang dilakukan oleh build adalah:

#### Build Style

Pertama-tama, build akan mengkompilasi Sass dalam proyek Anda. Setelah Sass 
dikompilasi, Autoprefixer dijalankan terhadap semua CSS.

#### Memeriksa JavaScript Anda terhadap Masalah

Tahap build yang kedua adalah menjalankan JSHint terhadap JavaScript Anda.

#### Build Halaman HTML

Langkah selanjutnya adalah memeriksa file HTML Anda, mencari, menggabungkan
dan mengecilkan JavaScript. Setelah JavaScript ditangani, proses build
melakukan pengecilan ukuran halaman HTML.

Minification mengurangi jumlah karakter dalam file JavaScript akhir dengan
menghapus komentar atau karakter spasi yang tidak benar-benar diperlukan, serta
beberapa teknik lainnya. Proses ini akan mengurangi ukuran file akhir, mempercepat
pemuatan situs Anda.

Concatenation berarti menyisipkan isi dari beberapa file menjadi satu. Alasan
kami melakukan ini adalah agar browser cukup membuat satu permintaan ke server
daripada banyak permintaan, yang mana akan terasa lebih cepat bagi pengguna Anda.

Build block telah memiliki segala sesuatu yang diperlukan untuk mengelola file JavaScript mana yang akan kita kecilkan
dan gabungkan bersama-sama. Mari kita lihat sebuah contoh build block:

    <!-- build:js scripts/main.min.js -->
    <script src="scripts/example-1.js"></script>
    <script src="scripts/example-2.js"></script>
    <!-- endbuild -->

Sebuah build block tidak lebih dari sebuah format komentar khusus.
Semua file javascript Anda yang berada di antara build blok akan digabungkan
(concatenated) dan dikecilkan (minified) ke dalam satu file bernama main.min.js dan
hasil akhirnya akan menggantikan semua script ini dengan tag script:

    <script src="scripts/main.min.js"></script>

#### Optimalkan gambar-gambar

Untuk JPEG dan PNG, meta data dalam gambar dikeluarkan; karena tidak diperlukan
untuk me-render gambar. Meta data mencakup informasi seperti kamera yang digunakan
untuk mengambil foto.

Untuk SVGs, proses ini akan menghapus setiap atribut yang tidak diperlukan seperti whitespace dan 
komentar yang ada.

#### Menyalin Font

Tugas sederhana ini menyalin font kita dari aplikasi ke direktori build akhir.

#### Salin Setiap File dari Root Directory

Jika build menemukan file apapun di direktori root proyek, build akan menyalin
mereka semua ke direktori build akhir.

### Uji Build Akhir Anda

Sebelum Anda mendorong apa pun ke produksi, Anda perlu memastikan semuanya bekerja
seperti yang Anda harapkan. Perintah `gulp serve:dist` membangun versi akhir dari situs Anda,
memulai server, dan membuka browser untuk Anda. Ini **tidak memiliki Live Reload atau
Browser Sync**, ini cara yang dapat diandalkan untuk menguji situs Anda sebelum mendeploy nya.


## Set up Web Starter Kit


Web Starter Kit mengandalkan NodeJS, NPM, dan Sass untuk bekerja. Setelah mereka terinstal, Anda akan memiliki semua yang anda butuhkan untuk memulai menggunakan Web Starter Kit dalam proyek Anda.


### Install NodeJS, NPM, dan Sass

Ada tiga set alat yang Anda butuhkan untuk diinstall pada komputer Anda sebelum Anda dapat membangun
situs dengan Web Starter Kit: NodeJS, NPM, & Sass.

#### NodeJS & NPM

Web Starter Kit membangun memerlukan Node dan NPM. Node digunakan untuk menjalankan Gulp, task runner. 
NPM digunakan untuk men-download modul yang diperlukan untuk melakukan tugas-tugas tertentu
di Gulp.
Jika Anda tidak yakin apakah memiliki NodeJS dan NPM, periksa dengan membuka command prompt dan
menjalankan `node -v`. Jika Node merespon, periksa agar versinya sesuai dengan versi saat ini
di NodeJS.org.

Jika Anda tidak mendapatkan respon atau memiliki versi lama, maka bukalah NodeJS.org dan
klik pada tombol hijau besar Install. NPM akan terpasang dengan NodeJS
secara otomatis.

### Set Up Proyek Web Starter Kit Anda

Langkah pertama adalah mengunjungi [https://developers.google.com/web/tools/starter-kit/](/web/tools/starter-kit/)
dan download dan ekstrak zip. Ini akan menjadi dasar untuk proyek Anda. Ubahlah nama folder dan letakkan di tempat yang relevan pada mesin Anda. Selama sisa panduan ini kita akan menamakan foldernya dengan `my-project.`

Selanjutnya, Anda perlu menginstal dependensi lokal untuk Web Starter Kit. Buka
command prompt, ubah direktori ke folder proyek Anda dan jalankan script npm 
install berikut.

    cd my-project
    npm install
    npm install gulp -g

Itu saja! Anda sekarang memiliki segala yang dibutuhkan untuk menggunakan Gulp tools di Web Starter
Kit.

Note: Jika Anda melihat ada kesalahan permission atau akses seperti <code>EPERM </code> atau <code>EACCESS</code>, jangan gunakan <code>sudo</code> sebagai penyelesaian. Baca di <a href='https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md'>halaman ini</a> untuk mendapatkan solusi yang lebih mantap.

Bagian berikutnya dari buku ini mencakup bagaimana menggunakan Gulp, tetapi jika Anda ingin melihat
hasilnya, coba jalankan server lokal dengan mengetikkan `gulp serve`.

<img src="images/wsk-on-pixel-n5.png">


Translated By: 
{% include "_shared/contributors/abdshomad.html" %}

