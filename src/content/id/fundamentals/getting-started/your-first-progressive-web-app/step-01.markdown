---
title: "Arsitektur App Shell"
description: "Apa itu shell app dan bagaimana Anda mendesain aplikasi web dengan menggunakan model app shell?"
---

<p class="intro">
App Shell, adalah kombinasi HTML, CSS, dan JavaScript paling minimum yang diperlukan untuk 
menampilkan antarmuka pengguna sebuah Progressive Web App dan merupakan salah satu 
komponen yang menjamin kinerja yang bisa diandalkan. Pemuatan pertama harus 
sangat cepat, dan harus segera di-cache-kan. Ini berarti bahwa app shell tidak perlu 
dimuat setiap kali, bahkan hanya perlu mendapatkan konten yang diperlukan saja.
</p>

{% include shared/toc.liquid %}

Arsitektur App Shell memisahkan prasarana aplikasi inti dan antar muka dari data. 
Semua antar muka dan prasarana di-cache secara lokal menggunakan service worker 
sehingga pada pemuatan berikutnya, Progresif Web App hanya perlu mengambil data 
yang diperlukan saja, tanpa harus memuat ulang semuanya.

<figure>
  <img src="images/appshell.jpg" /> 
</figure>

Dengan kata lain, app shell mirip dengan buntalan kode yang akan Anda 
publikasikan ke app store pada saat mempublikasikan aplikasi native. 
App shell adalah komponen inti yang diperlukan agar aplikasi Anda bisa hidup, 
akan tapi kemungkinan besar belum berisi data.

## Mengapa menggunakan arsitektur app shell?

Menggunakan arsitektur app shell memungkinkan Anda memusatkan perhatian pada kecepatan, memberikan 
Progressive Web App fitur yang serupa dengan aplikasi native, yaitu: pemuatan instan dan 
update berkala, tanpa perlu proses publikasi ke app store.

## Mendesain app shell 

Langkah pertama adalah membagi-bagi desain ke dalam komponen inti. 

Tanya diri Anda:

* Apa yang harus tampil di layar secepatnya? 
* Apa saja komponen antar muka lain yang menjadi kunci jalannya aplikasi kita? 
* Apa sumber daya dukungan yang dibutuhkan untuk app shell? Misalnya gambar, 
JavaScript, CSS, dll.

Kita akan membuat aplikasi Cuaca sebagai aplikasi Progressive Web App pertama kita. 
Komponen utamanya terdiri dari:

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6-col">
    <ul>
      <li>Header dengan judul, dan tombol tambah/refresh</li>
      <li>Wadah untuk kartu perkiraan</li>
      <li>Template kartu perkiraan</li>
      <li>Sebuah kotak dialog untuk menambahkan kota baru</li>
      <li>Sebuah indikator pemuatan</li> 
    </ul>
  </div>
  <div class="mdl-cell mdl-cell--6-col">
    <img src="images/weather-ss.png">
  </div>
</div>

Ketika merancang sebuah aplikasi yang lebih kompleks, konten yang tidak diperlukan untuk 
pemuatan awal bisa dipesan nanti dan disimpan di cache terlebih dahulu untuk penggunaan berikutnya. Sebagai contoh, 
kita bisa menunda pemuatan dialog Tambah Kota sampai kita selsai menampilkan halaman awal, 
kemudian mencari waktu yang tepat saat aplikasi sedang tidak memproses tampilan (saat CPU menganggur).
