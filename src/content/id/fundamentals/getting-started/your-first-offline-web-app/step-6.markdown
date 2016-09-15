---
title: "Instal Site Asset"
translators:
  - abdshomad
---

Dengan service worker terdaftar, event "install" akan dipicu pada saat pertama kali pengguna mengunjungi halaman. Dalam event ini, Anda harus meng-cache semua aset yang diperlukan untuk aplikasi Anda.

Pertama tambahkan Cache Polyfill (ada dalam repo).
polyfill ini diperlukan karena Cache API belum sepenuhnya diterapkan di semua 
Browser (Chrome memiliki dukungan yang baik).

{% highlight javascript %}
importScripts('/cache-polyfill.js');
{% endhighlight %}

Sekarang tambahkan Event Listener untuk menginstal event.

{% highlight javascript %}
self.addEventListener('install', function(e) {
  e.waitUntil();
});
{% endhighlight %}

Kemudian pada fungsi Event Handler, buka objek cache. Objek cache 
akan digunakan nanti dalam codelab untuk memastikan bahwa setiap permintaan kita bisa 
mengembalikan versi data yang tersimpan di cache.

{% highlight javascript %}
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('airhorner').then(function(cache) {})
  );
});
{% endhighlight %}

Sekarang karena cache telah terbuka, Anda perlu mengisinya. Objek cache memiliki
metode yang disebut addAll (melalui polyfill). addAll akan mengambil daftar url,
secara otomatis mengambil mereka dari server dan menambahkannya ke cache.

{% highlight javascript %}
self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('airhorner').then(function(cache) {
     return cache.addAll([
       '/',
       '/index.html',
       '/index.html?homescreen=1',
       '/?homescreen=1',
       '/styles/main.css',
       '/scripts/main.min.js',
       '/sounds/airhorn.mp3'
     ]);
   })
 );
});
{% endhighlight %}

Jika salah satu dari file ini tidak ada atau gagal saat diambil, maka seluruh 
operasi `addAll` juga akan gagal. Aplikasi yang baik harus menangani kasus ini.

### Pertanyaan yang Sering Diajukan (Frequently Asked Questions)

* Dimana Polyfill berada?
    * [https://github.com/coonsta/cache-polyfill](https://github.com/coonsta/cache-polyfill) 
* Mengapa saya perlu Polyfill?
    * Saat ini Chrome dan browser lainnya belum sepenuhnya mendukung method addAll 
      (**catatan:** Chrome 46 akan mendukung)
* Mengapa harus ada ?homescreen=1
    * URL dengan parameter Query String diperlakukan sebagai URL tersendiri dan 
      perlu cache terpisah.
      

