---

title: "Progressive Web App Anda yang Pertama"
description: "Progressive Web Apps menciptakan pengalaman terbaik dari penggabungan web dan aplikasi. Dalam panduan langkah-demi-langkah ini, Anda akan dipandu untuk membangun *Progressive Web Apps* dan mempelajari dasar-dasar yang diperlukan untuk membangun Progressive Web Apps, termasuk mempelajari model *App Shell*, cara menggunakan *service workers* untuk menyimpan data aplikasi di *cache* dan lebih banyak lagi."
translators:
  - abdshomad
notes:
  devsummit-video: "Mencari yang lain? Saksikan Alex Russell berbicara tentang <a href='https://www.youtube.com/watch?v=MyQ8mtR9WxI'>Progressive Web Apps</a> dari episode Summit Dev Chrome 2015"
---

<p class="intro">
<a href="/web/progressive-web-apps">Progressive Web Apps</a> menciptakan pengalaman terbaik 
dari penggabungan web dan aplikasi. Teknologi ini memungkinkan pengguna untuk segera 
menggunakan aplikasi sejak saat kunjungan pertama, tanpa perlu melakukan instalasi apa pun. 
Seiring dengan semakin seringnya pengguna menggunakan aplikasi, kemampuan aplikasi akan menjadi 
lebih hebat dan lebih hebat lagi. Aplikasi termuat dengan cepat, bahkan pada jaringan yang terputus-putus, 
juga bisa mengirimkan *push notification* yang relevan, memiliki ikon pada layar awal 
dan memuat halaman layar penuh dengan level kenyamanan tertinggi.
</p>

{% include shared/toc.liquid %}

## Apakah Progressive Web App itu?

Progressive Web Apps adalah:

* **Progressive** - Berfungsi untuk setiap pengguna, terlepas dari pilihan browser karena aplikasi ini dibangun dengan perbaikan yang progresif sebagai prinsip utamanya.
* **Responsive** - Sesuai dengan berbagai macam alat: desktop, seluler, tablet, atau apa pun berikutnya.
* **Connectivity independent** - Disempurnakan dengan *service workers* agar berfungsi secara offline atau pada jaringan berkualitas rendah.
* **App-like** - Serasa benar-benar seperti aplikasi bagi pengguna dengan interaksi app-style berkat penerapan model app shell.
* **Fresh** - Selalu up-to-date terima kasih kepada proses pembaruan yang disediakan oleh *service worker*.
* **Safe** - Dilayani melalui HTTPS untuk mencegah pengintaian dan memastikan konten tidak dimodifikasi.
* **Discoverable** - Bisa diidentifikasi sebagai "aplikasi" berkat manifest W3C dan pendaftaran service worker memungkinkan mesin pencari untuk menemukan mereka.
* **Re-engageable** - Membuat pelanggan kembali melalui fitur *push notification*.
* **Installable** - Memungkinkan pengguna untuk "menyimpan" aplikasi yang mereka anggap paling berguna di layar awal mereka tanpa harus melalui kerumitan instalasi dari app store.
* **Linkable** - Mudah berbagi melalui URL dan tidak memerlukan instalasi yang rumit.

Panduan untuk memulai ini akan memandu Anda dalam membuat sendiri Progressive Web App, 
termasuk pertimbangan desain, serta rincian pelaksanaan untuk memastikan bahwa aplikasi Anda 
memenuhi prinsip-prinsip kunci dari Progressive Web App.

{% include shared/note.liquid list=page.notes.devsummit-video %}

## Apa yang akan kita bangun?

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6-col">
    <p>
      Dalam panduan untuk memulai ini, Anda akan membangun Aplikasi Web Cuaca 
      menggunakan teknik Progressive Web App.
    </p>
    <p>
      Mari kita tinjau ciri-ciri dari Progressive Web App:
      <ul>
        <li><b>Progresif</b> - kita akan menggunakan perbaikan bertahap</li>
        <li><b>Responsif</b> - kita akan memastikan cocok setiap bentuk layar</li>
        <li><b>Independen terhadap koneksi</b> - kita akan menyimpan dalam cache app shell dengan service worker.</li>
        <li><b>Seperti Aplikasi</b> - kita akan menggunakan interaksi app-style untuk menambahkan kota dan memperbarui data.</li>
        <li><b>Terbaru</b> - kita akan menyimpan ke dalam cache data terbaru dengan service worker.</li>
        <li><b>Aman</b> - kita akan mendeploy aplikasi ke hosting yang mendukung HTTPS.</li>
        <li><b>Mudah ditemukan dan mudah diinstal</b> - kita akan menggunakan manifest sehingga mudah bagi mesin pencari untuk menemukan aplikasi kita.</li>
        <li><b>dapat ditautkan</b> - ini aplikasi web, tentunya!</li>
      </ul>
    </p>
  </div>
  <div class="mdl-cell mdl-cell--6-col">
    <a href="https://weather-pwa-sample.firebaseapp.com/final/">
      <img src="images/weather-ss.png">
    </a>
    <p>
      <a href="https://weather-pwa-sample.firebaseapp.com/final/" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">Cobalah</a>
    </p>
  </div>
</div>

## Apa yang akan Anda pelajari

* Bagaimana merancang dan membangun sebuah aplikasi dengan menggunakan metode "app shell"
* Cara membuat aplikasi Anda berjalan offline
* Bagaimana cara menyimpan data untuk penggunaan offline pada pemuatan berikutnya

## topik yang dibahas

<ol>
{% for pageInSection in page.context.pages %}
  <li>
    <a href="{{pageInSection.relative_url }}">
      {{pageInSection.title}}
    </a>
  </li>
{% endfor %}
</ol>

## Apa yang akan anda butuhkan

* Chrome 47 atau di atasnya
* Pengetahuan tentang HTML, CSS dan JavaScript

Panduan untuk memulai ini difokuskan pada Progressive Web Apps. Beberapa konsep atau blok-kode akan 
dikaburkan (misalnya CSS atau JavaScript yang tidak relevan untuk panduan ini) atau 
disediakan untuk anda untuk langsung bisa di copy-paste.
