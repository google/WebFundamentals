---
title: "Menangkap permintaan halaman web"
translators:
  - abdshomad
---

Salah satu atribut unik dari service worker adalah kemampuan untuk menangkap permintaan dari halaman web yang dikontrol oleh service worker dan memutuskan apa yang harus dilakukan terhadap mereka. Ini memberikan kita kemampuan untuk memuat aset yang cache di fase install.

Langkah pertamanya adalah menempelkan Event Handler untuk menarik event. Event ini
akan dipicu untuk setiap permintaan yang dibuat.

Tambahkan kode berikut untuk sw.js Anda yang akan mencatat log permintaan yang dibuat dari 
halaman induk.

{% highlight javascript %}
self.addEventListener('fetch', function(event) {
 console.log(event.request.url);
});
{% endhighlight %}

Sekarang buka Chrome DevTools untuk memeriksa service worker dan Anda akan melihat beberapa request.


<img src="images/image04.png" width="624" height="350" />

Sekarang kita tahu bahwa kita bisa mencatat semua request yang datang melalui app kita
dan kita perlu memutuskan apa yang harus dilakukan dengan request-request tersebut. Secara default, jika kita tidak melakukan
apa-apa, permintaan akan diteruskan ke jaringan dan response akan 
dikembalikan ke halaman web.

Untuk membuat aplikasi kita bisa berjalan secara offline, kita perlu menarik request dari cache 
jika tersedia di cache.


Mulailah dengan menambahkan metode `event.respondWith()`. Metode ini memberitahu browser untuk
mengevaluasi hasil dari event berikutnya. event ini perlu untuk diisi
dengan logika operasi sebelumnya.

{% highlight javascript %}
self.addEventListener('fetch', function(event) {
 console.log(event.request.url);
 
 event.respondWith( );
});
{% endhighlight %}
   
Tambahkan `caches.match(event.request)` sebagai berikut. Panggilan ini mengambil request web saat ini
yang memicu event fetch dan mencari data yang cocok dalam cache dengan 
permintaan sekarang (berdasarkan URL). 


{% highlight javascript %}
self.addEventListener('fetch', function(event) {
 console.log(event.request.url);
 event.respondWith(
   caches.match(event.request).then(function(response) { })
 );
});
{% endhighlight %}

Metode match mengembalikan Promise yang pasti terpenuhi bahkan saat file tersebut tidak ditemukan 
dalam cache, ini berarti bahwa kita memiliki pilihan tentang apa yang kita lakukan. Dalam kasus sederhana,
ketika file tersebut tidak ditemukan, kita hanya ingin mengambilnya dari jaringan dan 
mengembalikannya ke browser.

{% highlight javascript %}
self.addEventListener('fetch', function(event) {
 console.log(event.request.url);
 event.respondWith(
   caches.match(event.request).then(function(response) {
     return response || fetch(event.request);
   })
 );
});
{% endhighlight %}

Ini adalah kasus yang paling sederhana, ada banyak skenario caching lainnya. Sebagai contoh,
Anda bisa secara bertahap meng-cache semua response untuk request sebelumnya yang belum di-cache-kan, sehingga 
di masa depan mereka semua dikembalikan dari cache. 


