project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Web Starter Kit adalah boilerplate dan alat (bantu) development multi-perangkat

{# wf_published_on: 2015-01-01 #}
{# wf_updated_on: 2016-09-12 #}

# Web Starter Kit {: .page-title }

[Unduh Web Starter Kit (beta)](https://github.com/google/web-starter-kit/releases/latest){: .button .button-primary }

## Apa yang dimaksud dengan Web Starter Kit?

[Web Starter Kit](https://github.com/google/web-starter-kit) adalah boilerplate dogmatis bagi development web. Alat untuk membangun pengalaman yang bagus di berbagai perangkat dan [berorientasi kinerja](#web-performance). Untuk membantu Anda tetap produktif, ikuti praktik terbaik yang dijelaskan secara singkat dalam [Dasar-dasar Web](/web/fundamentals/) Google. Titik mulai yang tepat bagi para profesional dan pendatang baru dalam industri ini.

### Fitur

| Fitur                                | Rangkuman                                                                                                                                                                                                                                                     |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Boilerplate responsif | Boilerplate responsif dioptimalkan untuk web multilayar. Didukung oleh [Material Design Lite](http://getmdl.io).  Gratis menggunakannya atau bersih sama sekali lewat [basic.html](https://github.com/google/web-starter-kit/blob/master/app/basic.html).                          |
| Dukungan Sass                           | Kompilasi [Sass](http://sass-lang.com/) menjadi CSS dengan mudah, dengan menyediakan dukungan untuk berbagai variabel, mixin, dan sebagainya. (Jalankan `gulp serve` atau `gulp` untuk produksi)                                                                                                      |
| Optimalisasi kinerja               | Kecilkan dan satukan JavaScript, CSS, HTML serta gambar agar laman Anda tetap rapi. (Jalankan `gulp` untuk membuat versi proyek yang dioptimalkan ke `/dist`)                                                                                                |
| Pemeriksaan Statis atas Kode               | Pemeriksaan statis atas kode JavaScript dilakukan menggunakan [ESLint](http://eslint.org) - sebuah alat (bantu) pemeriksaan statis yang dapat disertakan dalam mengidentifikasi dan melaporkan pola di JavaScript. Web Starter Kit menggunakan ESLint dengan [eslint-config-google](https://github.com/google/eslint-config-google), yang berusaha mengikuti panduan gaya JavaScript Google.                                                                                                |
| ES2015 lewat Babel 6.0                   | Dukungan ES2015 opsional yang menggunakan [Babel](https://babeljs.io/){: .external }. Untuk memungkinkan dukungan ES2015, buang baris `"only": "gulpfile.babel.js",` dalam file [.babelrc](https://github.com/google/web-starter-kit/blob/master/.babelrc). Kode sumber ES2015 secara otomatis akan transkompilasi ke ES5 untuk mendapatkan dukungan browser yang luas.  |
| Built-in HTTP Server                   | Server bawaan untuk pratinjau situs Anda secara lokal sambil mengembangkan dan mengulang                                                                                                                                                                            |
| Pemuatan Ulang Browser Langsung                 | Muat ulang browser seketika setiap kali perubahan dibuat, tanpa memerlukan ekstensi. (Jalankan `gulp serve` dan edit file Anda)                                                                                                                           |
| Sinkronisasi Lintas-Perangkat           | Sinkronkan klik, guliran, formulir, dan pemuatan ulang langsung di berbagai perangkat sekaligus saat Anda mengedit proyek. Didukung oleh [BrowserSync](http://browsersync.io). (Jalankan `gulp serve` dan buka IP yang disediakan pada perangkat lain di jaringan Anda)                       |
| Dukungan offline                     | Berkat integrasi [Service Worker](/web/fundamentals/getting-started/primers/service-workers) [pre-caching](https://github.com/google/web-starter-kit/blob/master/gulpfile.babel.js#L226), situs yang menerapkan `dist` ke domain HTTPS akan menikmati dukungan offline. Hal ini dimungkinkan oleh [sw-precache](https://github.com/GoogleChrome/sw-precache/).                                                                                                                                              |
| PageSpeed Insights                     | Metrik kinerja web yang menampilkan seberapa bagus kinerja situs Anda di perangkat seluler dan desktop (Jalankan `gulp pagespeed`)                                                                                                                                                    |

## Quickstart

[Unduh](https://github.com/google/web-starter-kit/releases/latest) kit
atau klon [repositori](https://github.com/google/web-starter-kit) dan bangun
apa yang disertakan dalam direktori `app`.

Ada dua titik mulai HTML, dari situ Anda bisa memilih:

- `index.html` - titik mulai default yang berisi layout Desain Material.
- `basic.html` - tanpa layout, namun tetap menyertakan praktik terbaik seluler minimal kami

Pastikan memeriksa dengan teliti [dokumen pemasangan](https://github.com/google/web-starter-kit/blob/master/docs/install.md) untuk memverifikasi apakah lingkungan Anda sudah siap menjalankan WSK.
Setelah memverifikasi bahwa sistem Anda bisa menjalankan WSK, periksalah [perintah-perintah](https://github.com/google/web-starter-kit/blob/master/docs/commands.md) yang tersedia untuk memulai.

## Kinerja Web

Web Starter Kit berusaha langsung memberi Anda titik mulai yang berkinerja tinggi. [Skor](http://www.webpagetest.org/result/151201_VW_XYC/){: .external } Web Page Test median kami untuk template default memiliki [Speed Index](https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/metrics/speed-index) sebesar ~1100 (yang ideal 1000) dan Speed Index kunjungan berulang sebesar ~550 berkat pra-cache Service Worker. 

## Dukungan Browser

Saat ini, secara resmi kami bermaksud mendukung dua versi terbaru dari browser berikut:

* Chrome
* Edge
* Firefox
* Safari
* Opera
* Internet Explorer 9+

Ini bukan berarti bahwa Web Starter Kit tidak bisa digunakan di browser yang lebih tua dari yang tersebut di atas, melainkan bahwa yang akan menjadi fokus kami adalah memastikan layout bekerja dengan bagus di semua browser yang disebutkan di atas.

## Pemecahan Masalah

Jika Anda mengalami masalah selama pemasangan atau menjalankan alat, periksalah panduan [Pemecahan Masalah](https://github.com/google/web-starter-kit/wiki/Troubleshooting) kami, kemudian buka [masalah](https://github.com/google/web-starter-kit/issues). Dengan senang hati kami akan diskusikan cara mengatasinya.

## Opsi Boilerplate-saja

Jika Anda lebih suka tidak menggunakan salah satu alat (bantu) kami, hapus file berikut dari proyek: `package.json`, `gulpfile.babel.js`, `.jshintrc` dan `.travis.yml`. Kini Anda aman menggunakan boilerplate bersama sistem-versi alternatif atau tanpa sistem-versi sama sekali jika Anda memilih demikian.

## Dokumentasi dan Resep

* [Apendiks File](https://github.com/google/web-starter-kit/blob/master/docs/file-appendix.md) - Apakah yang dilakukan beragam file di sini?
* [Menggunakan Sass dari Material Design Lite](https://github.com/google/web-starter-kit/blob/master/docs/mdl-sass.md) - cara membuat Sass MDL bisa digunakan bersama WSK
* [Panduan implementasi](https://github.com/google/web-starter-kit/blob/master/docs/deploy.md) - tersedia untuk Firebase, Google App Engine, dan layanan lainnya.
* [Resep Gulp](https://github.com/gulpjs/gulp/tree/master/docs/recipes) - direktori resep resmi Gulp menyertakan daftar lengkap panduan untuk beragam alur kerja yang bisa Anda tambahkan ke proyek.

## Inspirasi

Inspirasi Web Starter Kit berasal dari [Mobile HTML5 Boilerplate](https://html5boilerplate.com/mobile/){: .external } dan [generator-gulp-webapp](https://github.com/yeoman/generator-webapp) Yeoman, dengan masukan dari para kontributor terhadap kedua proyek selama development. [FAQ](https://github.com/google/web-starter-kit/wiki/FAQ) kami berusaha menjawab pertanyaan umum yang diajukan tentang proyek.


## Ketahui Selengkapnya

Untuk mengetahui selengkapnya, lihat kode, kirimkan masalah, atau ikut serta, periksalah
repo Git kami di [https://github.com/google/web-starter-kit](https://github.com/google/web-starter-kit)


{# wf_devsite_translation #}
