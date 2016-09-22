---

title: "Aplikasi Web Offline Anda yang Pertama"
description: "Service worker adalah script yang berjalan di belakang layar, membuka kemungkinan untuk fungsi berjalan secara offline yang biasanya hanya dimungkinkan oleh aplikasi native. Pelajari cara mengintegrasikan service worker ke aplikasi yang sudah ada untuk membuatnya berjalan secara offline."
translators:
  - abdshomad
---
Dalam codelab ini, Anda akan belajar bagaimana mengintegrasikan service worker ke aplikasi yang sudah ada untuk membuatnya bekerja secara offline.

<img src="images/image00.png" width="624" height="409" />

Aplikasi ini dinamakan [Air
Horner](https://airhorner.com). Ia menggunakan Web API Audio untuk memainkan dan memanipulasi
suara airhorn, aplikasi ini mungkin merupakan salah satu aplikasi airhorn terbaik yang ada di pasar saat ini
(setidaknya menurut penulis codelab ini). Aplikasi ini sederhana
tetapi bisa mendemonstrasikan penggunaan service worker dengan baik.

Service worker adalah sebuah script yang dijalankan oleh browser Anda di belakang layar,
terpisah dari halaman web, membuka pintu untuk fitur tanpa halaman webnya dibuka
dan tanpa interaksi dengan pengguna. Di masa depan mencakup Push Message,
Background Sync, dan Geofencing, tapi fitur pertama yang akan diluncurkan adalah 
kemampuan untuk menangkap dan menangani network request, termasuk secara programatik
mengelola cache dari response.

Alasan mengapa service worker merupakan API yang menarik adalah karena service worker memungkinkan Anda untuk mendukung aplikasi web secara offline, 
memberikan pengembang kontrol penuh atas pengalaman pengguna 
menggunakan aplikasi.

### Apa yang akan Anda pelajari

* Bagaimana menambahkan service worker untuk proyek yang sudah ada.
* Gambaran singkat tentang waktu-hidup (lifecycle) service worker 
* Srategi caching offline sederhana

### Apa yang Anda butuhkan

* Chrome 44 atau di atasnya
* Pemahaman dasar tentang
  [Promise] (http://www.html5rocks.com/en/tutorials/es6/promises/)
* Contoh kode 
* Editor teks
* Python atau web server lokal sederhana
