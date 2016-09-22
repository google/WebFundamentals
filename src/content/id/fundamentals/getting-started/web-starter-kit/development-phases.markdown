---
title: "Fase Development"
description: "Setiap pengembang akan melalui berbagai tahapan selama pengembangan proyek. Web Starter Kit membuat Anda lebih produktif dan menyederhanakan berbagai kesulitan dalam setiap tahap."
translators:
  - abdshomad
---

<p class="intro">
Selama development, ada tiga perintah yang akan Anda gunakan secara teratur: `gulp serve`, `gulp`, dan `gulp serve:dist`. Mari kita lihat bagaimana masing-masing memberikan kontribusi terhadap proses development. </p>

{% include shared/toc.liquid %}

## Jalankan Server Lokal

Tugas pertama yang akan kita lakukan adalah: `$ gulp serve`.

Di permukaan, tugas ini terlihat sekedar memulai server HTTP lokal sehingga Anda dapat melihat situs Anda
di browser, tapi di belakang layar, sebenarnya ada beberapa alat tambahan yang dijalankan.

### Pemuatan Ulang Secara Langsung (Live Reload)

Pemuatan Ulang Secara Langsung (Live Reload) menghilangkan penyegaran secara tradisional saat perubahan terjadi di 
editor, beralih ke browser, menekan CTRL-R, dan kemudian menunggu halaman
dimuat ulang.

Dengan Live Reload, Anda bisa membuat perubahan dalam editor Anda dan perubahannya segera terlihat
di browser yang memuat situs Anda.

{% ytvideo JE-ejS8N3YI %}

### Pengujian di Berbagai Macam Perangkat

Browser Sync membantu Anda menguji situs Anda di beberapa perangkat. Setiap penggulungan (scroll),
pengetukan (tap), atau penenakan keyboard akan diterapkan di browser lain yang terhubung.

{% ytvideo RKKBIs_3svM %}

Fitur ni hanya bekerja ketika Anda menjalankan situs Anda dengan `gulp serve`. Coba jalankan
`gulp serve`, buka URL di dua jendela browser berdampingan dan gulir
salah satu halaman.

### Mengotomasikan Prefixing

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

### Periksa Javascript Anda

JSHint adalah alat yang memindai kode JavaScript Anda untuk memeriksa masalah yang mungkin terjadi
dengan logika JavaScript Anda untuk [menerapkan coding best practices](http://www.jshint.com/docs/).

Alat ini berjalan setiap kali Anda membangun proyek atau, jika Anda menjalankan gulp server,
setiap kali Anda membuat perubahan di file JavaScript.

### Mengkompilasi Sass Anda

Ketika Anda menjalankan perintah 'serve', setiap perubahan yang dibuat ke salah satu Sass
file dalam proyek Anda akan dikompilasi ke CSS dan diterapkan vendor prefix, setelah itu 
halaman akan dimuat ulang dengan Live Reload.

Bagi mereka yang baru mengenal Sass, proyek ini menggambarkan dirinya sebagai "CSS
extension language". Pada dasarnya Sass adalah CSS dengan beberapa fitur tambahan. Sebagai contoh,
Sass menambah dukungan variabel dan fungsi, yang membantu Anda menyusun CSS Anda
secara modular dan dapat digunakan ulang.

## Bangun Versi Akhir Situs Anda

Anda bisa membangun versi akhir dari situs Anda dengan perintah sederhana `gulp`. 
Perintah ini menjalankan beberapa tugas, dengan tambahan
tugas yang ditujukan untuk membuat pemuatan situs Anda lebih cepat dan lebih efisien.

Tugas utama yang dilakukan oleh build adalah:

### Build Style

Pertama-tama, build akan mengkompilasi Sass dalam proyek Anda. Setelah Sass 
dikompilasi, Autoprefixer dijalankan terhadap semua CSS.

### Memeriksa JavaScript Anda terhadap Masalah

Tahap build yang kedua adalah menjalankan JSHint terhadap JavaScript Anda.

### Build Halaman HTML

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

### Optimalkan gambar-gambar

Untuk JPEG dan PNG, meta data dalam gambar dikeluarkan; karena tidak diperlukan
untuk me-render gambar. Meta data mencakup informasi seperti kamera yang digunakan
untuk mengambil foto.

Untuk SVGs, proses ini akan menghapus setiap atribut yang tidak diperlukan seperti whitespace dan 
komentar yang ada.

### Menyalin Font

Tugas sederhana ini menyalin font kita dari aplikasi ke direktori build akhir.

### Salin Setiap File dari Root Directory

Jika build menemukan file apapun di direktori root proyek, build akan menyalin
mereka semua ke direktori build akhir.

## Uji Build Akhir Anda

Sebelum Anda mendorong apa pun ke produksi, Anda perlu memastikan semuanya bekerja
seperti yang Anda harapkan. Perintah `gulp serve:dist` membangun versi akhir dari situs Anda,
memulai server, dan membuka browser untuk Anda. Ini **tidak memiliki Live Reload atau
Browser Sync**, ini cara yang dapat diandalkan untuk menguji situs Anda sebelum mendeploy nya.

