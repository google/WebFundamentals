---
title: "Mengimplementasikan App Shell"
description: "Bagaimana cara menggunakan App Shell dalam Progressive Web App?"
notes:
  learn-about-wsk: "Pelajari lebih lanjut tentang <a href='https://developers.google.com/web/tools/starter-kit/'>Web Starter Kit</a>"
  image-sprite: "Menentukan setiap ikon satu per satu mungkin terlihat kurang efisien dibandingkan dengan menggunakan sprite image. Kita akan meng-cache nanti sebagai bagian dari App Shell, memastikan agar ikon-ikon ini selalu tersedia, tanpa perlu membuat ulang permintaan ke web server."
  give-you: "Kami telah memberi Anda markup dan style untuk menghemat waktu Anda dan memastikan bahwa Anda memulai atas fondasi yang kokoh. Pada bagian berikutnya, Anda akan mendapatkan kesempatan untuk menulis kode Anda sendiri."
---

<p class="intro">
Ada beberapa cara untuk memulai proyek, dan kami 
menganjurkan untuk menggunakan Web Starter Kit. Namun, untuk saat ini, 
proyek kita dibuat sesederhana mungkin sehingga Anda bisa berkonsentrasi pada pembuatan Progressive Web Apps. 
Oleh karena itu, kami menyediakan semua sumber daya yang Anda butuhkan untuk memulai.

</p>

{% include shared/toc.liquid %}

## Unduh kode

Anda bisa [mengunduh semua kode Progressive Web App ini](pwa-weather.zip) 
dalam sebuah file ZIP agar lebih mudah digunakan. Setiap langkah dan seluruh sumber daya yang Anda butuhkan 
tersedia di ZIP. 

## Buat HTML untuk App Shell

Untuk memastikan bahwa kita bisa mulai sebersih mungkin, kita akan memulainya dengan 
sebuah file `index.html` yang benar-benar baru, kemudian menambahkan komponen inti yang sudah kita bahas di
[Arsitektur App Shell](step-01).

Ingat, komponen pentingnya terdiri dari:

* Header dengan judul, dan tombol tambah/pembaruan
* Kontainer untuk kartu Prakiraan
* Sebuah template kartu Prakiraan
* Sebuah dialog untuk menambahkan kota baru
* Sebuah indikator pemuatan

{% highlight html %}
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Aplikasi Cuaca</title>
  <!-- Insert link to styles.css here -->
</head>
<body>
  <header class="header">
    <h1 class="header__title">Aplikasi Cuaca</h1>
    <button id="butRefresh" class="headerButton"></button>
    <button id="butAdd" class="headerButton"></button>
  </header>

  <main class="main" hidden>
    <!-- Masukkan forecast-card.html di sini -->
  </main>

  <div class="dialog-container">
    <!-- Masukkan add-new-city-dialog.html di sini -->
  </div>

  <div class="loader">
    <svg viewBox="0 0 32 32" width="32" height="32">
      <circle id="spinner" cx="16" cy="16" r="14" fill="none"></circle>
    </svg>
  </div>

  <!-- Masukkan tautan ke app.js di sini -->
</body>
</html>
{% endhighlight %}

Perhatikan konten `main` yang `hidden` secara default dan loader `visible`. 
Hal ini bertujuan untuk memastikan agar pengguna melihat loader segera pada saat halaman ini dimuat, 
memberi mereka indikasi yang jelas bahwa konten tersebut sedang dimuat.


Selanjutnya, mari kita tambahkan kartu Prakiraan, dan dialog Tambahkan Kota Baru. 
Untuk menghemat waktu, kodenya sudah disediakan di direktori `resources`, 
agar Anda dapat menyalin dan menempelkannya ke tempat yang sesuai.


## Tambahkan style untuk komponen utama antar muka

Sekarang saatnya untuk menambahkan style utama. 
Untuk saat ini, mari kita tempatkan mereka ke dalam sebuah file CSS yang terpisah.

Pada file `index.html`, ganti `<!-- Masukkan tautan ke styles di sini -->` dengan: 
{% highlight html %} 
<link rel="stylesheet" type="text/css" href="styles/inline.css">
{% endhighlight %}

Untuk mempersingkat waktu, kami telah membuat 
[stylesheet](https://weather-pwa-sample.firebaseapp.com/styles/inline.css) 
untuk Anda gunakan. Hanya perlu beberapa menit untuk meninjau dan menyesuaikan untuk keperluan Anda.

{% include shared/note.liquid list=page.notes.image-sprite %}

## Uji segala sesuatunya dan lakukan penyesuaian

Sekarang adalah waktu yang tepat untuk menguji segala sesuatunya, 
lihat bagaimana tampilannya serta buat penyesuaian yang Anda inginkan. 
Pastikan untuk menguji perenderan kartu Prakiraan Anda dengan menghapus atribut `hidden` dari kontainer `main`, 
dan menambahkan beberapa data tiruan ke kartu.
 

{% include shared/remember.liquid list=page.notes.give-you %}

Aplikasi ini cukup responsif sekarang, tapi belum sempurna. 
Coba tambahkan style tambahan yang akan meningkatkan respon dan 
membuatnya benar-benar bersinar di berbagai perangkat. 
Juga, pertimbangkan apa yang dapat Anda lakukan untuk membuat cita rasa Anda sendiri.


## Tambahkan kode bootstrap JavaScript penting

Sekarang kita memiliki sebagian besar antar muka yang sudah siap, 
saatnya untuk memulai mengaitkan kode agar semuanya tersambung. 
Seperti bagian dari app shell lainnya, perhatikan apa saja kode 
yang diperlukan sebagai bagian dari tampilan utama dan apa yang bisa ditunda untuk dibuka pada saatnya nanti.


Dalam kode JavaScript kami, kami menyertakan:

* Sebuah objek `app` yang berisi beberapa informasi utama yang diperlukan aplikasi.
* Event listener untuk semua tombol di header (`tambah`/`perbarui`) 
  dan pada dialog Tambah Kota (`tambah`/`batalkan`).
* Sebuah method untuk menambah atau memperbarui kartu Prakiraan (`app.updateForecastCard`).
* Sebuah method untuk mendapatkan data Perkiraan Cuaca terbaru dari 
  Firebase Public API (`app.getForecast`).
* Sebuah method untuk meng-iterasi kartu dan memanggil `app.getForecast` untuk mendapatkan data 
  Prakiraan Cuaca (`app.updateForecasts`).
* Beberapa data tiruan (`fakeForecast`) yang dapat digunakan untuk mempercepat pengujian tampilan.

Tambahkan kode JavaScript

1. Salin `app.js` dari direktori `resources/step3` ke direktori `scripts` 
   dan namakan `app.js`
1. Di dalam file `index.html`, tambahkan tautan ke `app.js` yang baru dibuat.<br/>
   `<script src="/scripts/app.js"></script>`

## Pengujian

Karena sekarang Anda telah menambahkan HTML utama, style dan JavaScript, saatnya untuk menguji 
aplikasi ini. Meskipun belum banyak yang bisa dilakukan, pastikan aplikasi ini tidak menuliskan kesalahan 
di console.

Untuk melihat bagaimana data cuaca tiruan ditampilkan, tambahkan baris di bawah ini ke file `app.js` Anda
:  
`app.updateForecastCard(fakeForecast);`

<a href="https://weather-pwa-sample.firebaseapp.com/step-04/" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">Cobalah</a>
