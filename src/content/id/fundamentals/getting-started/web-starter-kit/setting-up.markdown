---

title: "Set up Web Starter Kit"
description: "Jika Anda baru mengetahui Web Starter Kit, panduan ini adalah untuk Anda. Panduan ini membimbing Anda untuk membuat Anda bangun dan berlari dengan Web Starter Kit secepat mungkin."

notes:
  nosudo: 
    - "Jika Anda melihat ada kesalahan permission atau akses seperti <code>EPERM </code> atau <code>EACCESS</code>, jangan gunakan <code>sudo</ code> sebagai penyelesaian. Baca di <a href='https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md'>halaman ini</a> untuk mendapatkan solusi yang lebih mantap".
translators:
  - abdshomad
---

<p class="intro">
  Web Starter Kit mengandalkan NodeJS, NPM, dan Sass untuk bekerja. Setelah mereka terinstal, Anda akan memiliki semua yang anda butuhkan untuk memulai menggunakan Web Starter Kit dalam proyek Anda.
</p>

{% include shared/toc.liquid %}

## Install NodeJS, NPM, dan Sass

Ada tiga set alat yang Anda butuhkan untuk diinstall pada komputer Anda sebelum Anda dapat membangun
situs dengan Web Starter Kit: NodeJS, NPM, & Sass.

### NodeJS & NPM

Web Starter Kit membangun memerlukan Node dan NPM. Node digunakan untuk menjalankan Gulp, task runner. 
NPM digunakan untuk men-download modul yang diperlukan untuk melakukan tugas-tugas tertentu
di Gulp.
Jika Anda tidak yakin apakah memiliki NodeJS dan NPM, periksa dengan membuka command prompt dan
menjalankan `node -v`. Jika Node merespon, periksa agar versinya sesuai dengan versi saat ini
di NodeJS.org.

Jika Anda tidak mendapatkan respon atau memiliki versi lama, maka bukalah NodeJS.org dan
klik pada tombol hijau besar Install. NPM akan terpasang dengan NodeJS
secara otomatis.

## Set Up Proyek Web Starter Kit Anda

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

{% include shared/remember.liquid title="Errors?" list=page.notes.nosudo %}

Bagian berikutnya dari buku ini mencakup bagaimana menggunakan Gulp, tetapi jika Anda ingin melihat
hasilnya, coba jalankan server lokal dengan mengetikkan `gulp serve`.

<img src="images/wsk-on-pixel-n5.png">

