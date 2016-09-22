---
title: "Usability dan form factor"
description: "Pengguna ponsel senang dengan hal-hal kecil yang Anda lakukan bagi mereka untuk meningkatkan kenyamanan mereka."
translators:
  - abdshomad
---

<p class="intro">
Hibur pengguna ponsel Anda dengan hal-hal kecil yang meningkatkan kenyamanan mereka.
</p>

{% include shared/toc.liquid %}

## 19. Optimalkan seluruh situs Anda untuk ponsel

Gunakan [tata letak yang responsif](/web/fundamentals/design-and-ui/responsive/) 
yang mampu menyesuaikan diri berdasarkan pada ukuran layar dan kemampuan perangkat pengguna. 
Peserta penelitian menemukan bahwa situs dengan campuran desktop dan halaman yang dioptimalkan untuk seluler bahkan sulit untuk digunakan dibandingkan situs yang diperuntukkan khusus untuk desktop saja.

## 20. Jangan membuat pengguna melakukan pinch-to-zoom 

Pengguna merasa nyaman dengan menggulirkan layar secara vertikal, tapi tidak horizontal. Hindari elemen yang besar, dan lebarnya tetap. Gunakan [CSS media queries](/web/fundamentals/design-and-ui/responsive/fundamentals/use-media-queries) 
untuk menerapkan corak berbeda untuk layar yang berbeda. Jangan membuat konten yang hanya tampil baik pada [layar lebar](/web/fundamentals/design-and-ui/responsive/fundamentals/set-the-viewport) tertentu. 
Situs yang memaksa pengguna untuk menggulir secara horizontal [Google Mobile-Friendly Test](https://www.google.com/webmasters/tools/mobile-friendly/), yang bisa berdampak negatif terhadap peringkat pencarian.

## 21. Buat gambar produk bisa diperluas

Pelanggan ritel berharap situs membiarkan mereka [melihat closeups produk dengan resolusi tinggi](/web/fundamentals/design-and-ui/media/images/). Peserta penelitian frustrasi ketika mereka tidak dapat melihat apa yang mereka beli.

<div class="mdl-grid">
  <figure class="mdl-cell mdl-cell--6-col">
    <img src="images/sw-make-images-expandable-good.png">
    <figcaption class="wf-figcaption-good">Lakukan: Buatlah gambar produk yang bisa diperluas dan mudah untuk dilihat secara detail.</figcaption>
  </figure>
</div>

## 22. Beritahukan kepada pengguna orientasi layar mana yang terbaik

Peserta penelitian cenderung untuk tetap di orientasi layar yang sama sampai sesuatu mendorong mereka untuk beralih. Desainlah untuk orientasi landscape dan portrait, atau mendorong pengguna untuk beralih ke orientasi optimal. Pastikan bahwa calls-to-action penting dapat diselesaikan bahkan jika pengguna mengabaikan saran untuk beralih orientasi. 

<div class="mdl-grid">
  <figure class="mdl-cell mdl-cell--6-col">
    <img src="images/us-orientation.jpg">
    <figcaption class="wf-figcaption-good">Lakukan: Beritahu pengguna orientasi mana yang terbaik.</figcaption>
  </figure>
</div>

## 23. Pastikan pengguna Anda tetap di satu jendela penjelajah

Pengguna mungkin mengalami kesulitan beralih di antara jendela dan mungkin tidak dapat menemukan jalan mereka kembali ke situs. Hindari calls-to-action yang memulai jendela baru. Identifikasi setiap kasus yang mungkin menyebabkan pengguna melihat ke luar situs Anda dan menyediakan fitur untuk menjaga mereka di situs Anda. Misalnya, jika Anda menerima kupon, tawarkan mereka langsung di situs, daripada memaksa pengguna untuk mencari situs lain untuk melihat penawarannya.

<div class="mdl-grid">
  <figure class="mdl-cell mdl-cell--6-col">
    <img src="images/sw-single-browser-good.png">
    <figcaption class="wf-figcaption-good">Lakukan: Macy's menjaga penggunannya tetap berada di situs dengan cara menyediakan kupon di situs.</figcaption>
  </figure>
</div>

## 24. Hindari pelabelan 'full site' 

Ketika peserta penelitian melihat pilihan untuk 'full site' (yaitu situs desktop) dibandingkan 'situs mobile', mereka berfikir situs mobile miskin konten dan memilih 'full site', sehingga mengarahkan mereka ke situs desktop. 


## 25. Jelaskan mengapa Anda perlu lokasi pengguna

Pengguna harus selalu tahu mengapa Anda [meminta lokasi mereka] (/ web / fundamental / native-hardware / user-lokasi /). Peserta penelitian yang mencoba untuk memesan hotel di kota lain menjadi bingung ketika sebuah situs perjalanan mendeteksi lokasi mereka dan menawarkan hotel di kota mereka saat ini sebagai gantinya. Biarkan isian lokasi kosong secara default, dan biarkan pengguna memilih untuk mengisi secara sadar seperti "Cari Dekat Saya". 


<div class="mdl-grid">
  <figure class="mdl-cell mdl-cell--6-col">
    <img src="images/sw-navigation-good.png">
    <figcaption class="wf-figcaption-good">Lakukan: Mintalah ijin akses ke lokasi pada pengguna.</figcaption>
  </figure>
  <figure class="mdl-cell mdl-cell--6-col">
    <img src="images/sw-navigation-bad.png">
    <figcaption class="wf-figcaption-bad">Jangan lakukan: Tergesa-gesa meminta di halaman awal sehingga pemuatan situs akan menjadi terbebani dan pengguna merasakan pengalaman yang buruk.</figcaption>
  </figure>
</div>
