---

title: "Menampilkan notification"
description: "Tambahkan kode untuk push handler Anda di service worker untuk menampilkan notification."
translators:
  - abdshomad
---

{% include shared/toc.liquid %}

Versi lengkap dari langkah ini ada di direktori completed/step9.

Dalam langkah ini Anda akan menambahkan kode untuk push handler Anda di service worker untuk menampilkan
pemberitahuan.

## 1. Tambahkan kode showNotification()

Perbarui _sw.js_ agar terlihat seperti di bawah ini, dengan menggantikan komentar _TODO_ :

{% highlight javascript %}
console.log('Dimulai', self);
self.addEventListener('install', function(event) {
  self.skipWaiting();
  console.log('Ter-install', event);
});
self.addEventListener('activate', function(event) {
  console.log('Ter-aktifasi', event);
});
self.addEventListener('push', function(event) {
  console.log('Push Message', event);
  var title = 'Push Message';
  event.waitUntil(
    self.registration.showNotification(title, {
      body: 'The Message',
      icon: 'images/icon.png',
      tag: 'my-tag'
    }));
});
// TODO
{% endhighlight %}

Method `event.waitUntil()` mengambil Promise dan memperpanjang masa hidup event handler sampai, dalam hal ini, Promise yang dikembalikan oleh `showNotification()` terpenuhi.

Satu pemberitahuan akan ditampilkan untuk setiap nilai tag: jika Push Message baru diterima, pemberitahuan lama akan diganti. Untuk menampilkan beberapa pemberitahuan, gunakan nilai tag yang berbeda untuk setiap panggilan ke showNotification(), atau jangan gunakan tag sama sekali.

## 2. Buat permintaan ke GCM untuk mengirim pemberitahuan

Jalankan perintah cURL atau permintaan XHR dari langkah-langkah sebelumnya.

Pastikan Anda melihat pemberitahuan seperti ini:

<img src="images/image19.png" width="394" height="114" alt="Screenshot dari Push Notification" />
