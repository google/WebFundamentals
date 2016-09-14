---

title: "Deploy ke Secure Host dan Rayakan!"
---

<p class="intro">
Langkah terakhir adalah men-deploy aplikasi cuaca ke server yang mendukung HTTPS. Jika
Anda belum memilikinya, pendekatan yang paling mudah (dan gratis) adalah dengan menggunakan
hosting konten statis dari Firebase. Ini super mudah untuk digunakan, melayani
konten melalui HTTPS dan didukung oleh CDN global.
</p>

{% include shared/toc.liquid %}

## Kredit extra : minify dan inline CSS

Ada satu hal lagi yang harus Anda pertimbangkan, mengecilkan style kunci dan 
membuat mereka inline langsung ke `index.html`. 
[Page Speed ​​Insights](https://developers.google.com/speed) menganjurkan agar melayani 
konten yang terlipat di atas dalam 15k byte pertama dari permintaan. 

Lihatlah seberapa kecil permintaan awal yang bisa Anda dapatkan dengan mengubahnya menjadi inline. 

**Bacaan lebih lanjut:** [PageSpeed Insight 
Rules](https://developers.google.com/speed/docs/insights/rules)

## Deploy ke Firebase
Jika Anda baru ke Firebase, Anda harus masuk menggunakan akun Google Anda dan menginstal beberapa 
alat sebelumnya.

1. Masuk ke Firebase dengan akun Google Anda di
   [https://firebase.google.com/](https://firebase.google.com/)
1. Install alat Firebase via npm:<br/>
   `npm install -g firebase-tools`

Setelah akun Anda dibuat dan Anda masuk, Anda siap untuk melakukan 
deploy!

1. Buatlah app baru di
   [https://console.firebase.google.com/](https://console.firebase.google.com/)
1. Jika Anda belum masuk ke alat Firebase, perbarui
   credential Anda:<br/>
   `firebase login`
1. Inisialisasi aplikasi Anda, dan memberikan direktori tempat aplikasi lengkap Anda
   hidup:<br/>
   `firebase init`
1. Terakhir, deploy app ke Firebase:<br/>
   `firebase deploy`
1. Rayakan. Anda berhasil! Aplikasi Anda akan di-deploy ke domain:<br/> 
   `https://YOUR-FIREBASE-APP.firebaseapp.com`

**Bacaan lebih lanjut:** [Firebase Hosting 
Guide](https://firebase.google.com/docs/hosting/)

## Pengujian

* Try adding the app to your home screen then disconnect the network and
verify the app works offline as expected.
* Cobalah untuk menambahkan aplikasi ke layar rumah Anda kemudian putus jaringan dan
check apakah aplikasi bisa bekerja secara offline seperti yang diharapkan.

<a href="https://weather-pwa-sample.firebaseapp.com/final/" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">Cobalah</a>
