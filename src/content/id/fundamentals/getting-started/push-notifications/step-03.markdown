---

title: "Get started with Service Worker"
description: "Add JavaScript to install a service worker"
translators:
  - abdshomad
---

Versi lengkap dari langkah ini ada di direktori completed/step3.

{% include shared/toc.liquid %}

## 1. Buat index.html

Dalam direktori _app_ Anda, buat file _index.html_ dan tambahkan 
kode berikut:

{% highlight html %}
<!DOCTYPE html>
<html>
<head>
  <title>Push Notification codelab</title>
</head>
<body>
  <h1>Push Notification codelab</h1>
  <p>Halaman ini harus diakses menggunakan HTTPS atau melalui localhost.</p>
  <script src="js/main.js"></script>
</body>
</html>
{% endhighlight %}

Buka _index.html_ secara lokal di Chrome dari localhost: URL lengkapnya berikut _http: //localhost/push-notifications/app/index.html_.

## 2. Tambahkan Service Worker

Dalam direktori _app_ Anda, buat file kosong bernama _sw.js_. Anda akan menambahkan kode
di file ini nanti.

Jangan khawatir jika Anda belum pernah menggunakan service worker sebelumnya. Anda tidak perlu tahu banyak tentang service worker untuk menyelesaikan codelab ini. script service worker berjalan di latar belakang untuk menangkap network request, menangani push notification dan melakukan tugas-tugas lainnya. Jika Anda ingin mengetahui lebih lanjut, lihat [Pengantar Service Worker](/web/fundamentals/primers/service-worker/).

Ketika push notification diterima, browser dapat menjalankan service worker di latar belakang untuk menangani push notification tanpa perlu membuka halaman web.

## 3. Mendaftarkan dan menginstal Service Worker

Dalam langkah ini Anda akan membuat file JavaScript _main.js_ yang digunakan di
_index.html_. Fil ini akan memberikan akses ke script service worker. Dalam direktori _app_ Anda, buat direktori _js_ dan tambahkan file bernama
_main.js_ di dalamnya dengan kode berikut:

{% highlight javascript %}
if ('serviceWorker' in navigator) {
 console.log('Service Worker di dukung');
 navigator.serviceWorker.register('sw.js').then(function(reg) {
   console.log(':^)', reg);
   // TODO
 }).catch(function(err) {
   console.log(':^(', err);
 });
}
{% endhighlight %}

Kode ini memeriksa apakah service worker didukung oleh browser Anda, kemudian mendaftarkan dan menginstal service worker yang Anda buat di _sw.js_ - yang belum bisa melakukan apa-apa (kosong!)

## 4. Cobalah dari localhost

Buka _index.html_ dari localhost dan buka DevTools Chrome untuk melihat
console.

Console harus terlihat seperti ini:

<img src="images/image01.png" width="965" height="901" alt="Halaman web Codelab terbuka di Chrome, menunjukkan ServiceWorkerRegistration di console DevTools" />

## 5. Cobalah serviceworker-internals

Halaman diagnostik _chrome://serviceworker-internals_ adalah tempat untuk
memeriksa bahwa service worker Anda bekerja:

<img src="images/image02.png" width="907" height="641" alt="Halaman diagnostik chrome:serviceworker-internals terbuka di Chrome" />

## 6. Tambahkan event listener untuk service worker Anda

Tambahkan kode berikut ke dalam _sw.js_:

{% highlight javascript %}
console.log('Started', self);
self.addEventListener('install', function(event) {
  self.skipWaiting();
  console.log('Ter-install', event);
});
self.addEventListener('activate', function(event) {
  console.log('Ter-aktifasi', event);
});
self.addEventListener('push', function(event) {
  console.log('Push Notification diterima', event);
  // TODO
});
{% endhighlight %}

Dalam service worker, `self` mengacu pada objek `ServiceWorkerGlobalScope`: service worker itu sendiri.

**TOP TIP!**

Secara default service worker lama akan tetap berjalan sampai semua tab yang menggunakannya ditutup atau di-unload. service worker yang baru akan tetap berada dalam keadaan `waiting`.

Ketika `skipWaiting()` dipanggil (seperti pada kode di atas) service worker akan melewatkan keadaan `waiting` dan segera mengaktifkan service worker yang baru.

Berguna untuk debugging!

Klik tombol **Inspect** pada _chrome di halaman _chrome://serviceworker-internals_. Anda akan melihat berikut:

<img src="images/image03.png" width="888" height="845" alt="Console Chrome DevTools console menunjukkan instalasi service worker dan mengaktifasi event" />

**Peringatan**: Jika ada kesalahan parsing kode service worker Anda, service worker tidak akan ter-instal dan pesan kesalahan akan dilemparkan pada event install.
Hal ini dapat mengakibatkan service worker secara misterius tidak terperbarui ketika Anda mengubah kode. Selalu ingat untuk memeriksa dan memvalidasi kode Anda ketika Anda mengubahnya!

