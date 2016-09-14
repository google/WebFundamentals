---

title: "Gunakan Service Worker untuk Meng-Cache-kan Data Aplikasi"
description: "Gunakan service worker untuk meng-cache-kan data aplikasi dalam progressive web app"
---

<p class="intro">
Memilih strategi caching yang tepat untuk data Anda sangat penting dan tergantung 
pada jenis data aplikasi Anda sajikan. Misalnya, data yang sensitif-waktu seperti
cuaca atau harga saham harus selalu ditampilkan yang terbaru, realtime, sedangkan gambar avatar atau 
konten artikel dapat diperbarui lebih jarang. 
</p>

{% include shared/toc.liquid %}

Strategi **cache first then network** cocok untuk aplikasi kita. Dengan strategi ini, kita bisa mendapat data 
di layar secepat mungkin, kemudian memperbaruinya setelah jaringan mengembalikan
data terbaru. Dibandingkan dengan **network first then cache**, pengguna
tidak harus menunggu sampai time-out untuk mendapatkan data dari cache. 

Dengan strategi **cache first then network**, kita perlu melemparkan dua request secara asynchronous, 
satu ke cache dan satu ke jaringan. Request ke jaringan 
tidak perlu banyak berubah, tapi kita perlu memodifikasi service worker untuk menyimpan response ke cache 
sebelum mengembalikannya ke browser.

Dalam keadaan normal, data dari cache yang akan dikembalikan, 
hampir seketika menyediakan aplikasi dengan data terbaru yang bisa digunakan. Kemudian, ketika
request ke jaringan mendapatkan response, aplikasi akan diperbarui menggunakan data terbaru dari 
jaringan.

## Menangkap network request dan memasukkan response-nya ke dalam cache 

Kita perlu memodifikasi service worker untuk menangkap request ke API cuaca 
dan menyimpan response ke dalam cache, sehingga kita dapat mengaksesnya nanti. Di
strategi **cache first then network**, kami mengharapkan network response menjadi 
'sumber kebenaran', yang selalu menyediakan informasi terbaru. Jika
tidak bisa, tidak apa-apa bila gagal karena kita sudah mendapatkan data cache terbaru 
di aplikasi kita.

Pada kode service worker kita, mari tambahkan `dataCacheName` sehingga kita dapat memisahkan 
data aplikasi kita dari app shell. Ketika app shell diperbarui dan 
cache yang lebih tua dihapus, data kita tetap tak tersentuh, dan siap untuk pemuatan super cepat pada pemuatan berikutnya. 
Perlu diingat, jika di kemudian hari format data Anda berubah, Anda perlu cara untuk 
mengatasinya dan menjamin app shell dan konten tetap berada pada keadaan tersinkronisasi.

Tambahkan baris berikut ke atas file `service-worker.js` Anda:  
{% highlight javascript %}
var dataCacheName = 'weatherData-v1';
{% endhighlight %}

Selanjutnya, kita perlu mengubah event handler `fetch` untuk menangani request ke API data 
terpisah dari request lainnya.

{% highlight javascript hl_lines="3 4 5 6" %}
self.addEventListener('fetch', function(e) {  
  console.log('[ServiceWorker] Fetch', e.request.url);  
  var dataUrl = 'https://publicdata-weather.firebaseio.com/';  
  if (e.request.url.indexOf(dataUrl) === 0) {  
    // Letakkan kode handler data di sini 
  } else {  
    e.respondWith(  
      caches.match(e.request).then(function(response) {  
        return response || fetch(e.request);  
      })  
    );  
  }  
});
{% endhighlight %}

Kode ini melakukan penyadapan request dan memeriksa apakah URL dimulai dengan alamat 
dari API cuaca. Jika betul, kita akan menggunakan `fetch` untuk membuat request. Setelah
respon dikembalikan, kode kita membuka cache, meng-kloning response, menyimpannya
ke dalam cache dan akhirnya mengembalikan response terhadap request aslinya. 


Selanjutnya, ganti `// Letakkan kode handler data di sini` dengan kode di bawah:

{% highlight javascript %}
e.respondWith(  
  fetch(e.request)  
    .then(function(response) {  
      return caches.open(dataCacheName).then(function(cache) {  
        cache.put(e.request.url, response.clone());  
        console.log('[ServiceWorker] Menarik & meng-cache data');  
        return response;  
      });  
    })  
);
{% endhighlight %}

Aplikasi kita belum akan bekerja secara offline. Kita telah menerapkan cache dan pengambilan
untuk app shell, tapi meskipun kita telah meng-cache data, kita masih bergantung 
pada jaringan.

## Membuat request

Seperti disebutkan sebelumnya, aplikasi kita perlu memulai dua request secara asynchronous, 
satu ke cache dan satu ke jaringan. Aplikasi ini menggunakan objek `caches`
yang tersedia di `window` untuk mengakses cache dan mengambil data terbaru. Ini adalah 
contoh yang sangat baik dari _(peningkatan progresif) progressive enhancement_ karena objek `caches` mungkin
tersedia tidak di semua browser, dan jika tidak tersedia, request ke jaringan harus tetap 
bekerja.

Untuk melakukan hal ini, kita perlu:

1. Memeriksa apakah objek `caches` tersedia di objek global `window`.
1. Request data dari cache.
    1. Jika request ke server masih belum mendapatkan balasan, perbarui aplikasi dengan 
       data dari cache.
1. Request data dari server.
    1. Simpan data untuk akses cepat nanti.
    1. Update aplikasi dengan data baru dari server.

Pertama, mari kita tambahkan flag yang akan kita gunakan untuk mencegah cache dari memperbarui aplikasi 
pada kasus yang jarang terjadi yaitu pada saat XHR merespon sebelum cache. Tambahkan `hasRequestPending:
FALSE` ke objek `app`. 

Selanjutnya, kita perlu memeriksa apakah objek `caches` ada dan meminta data terbaru 
darinya. Tambahkan kode berikut untuk `app.getForecast`, sebelum XHR dibuat:

{% highlight javascript %}
if ('caches' in window) {  
  caches.match(url).then(function(response) {  
    if (response) {  
      response.json().then(function(json) {  
        // Perbarui hanya jika XHR masih tertunda, jika tidak XHR 
        // telah mengembalikan data terbaru.  
        if (app.hasRequestPending) {  
          console.log('diperbarui dari cache');  
          json.key = key;  
          json.label = label;  
          app.updateForecastCard(json);  
        }  
      });  
    }  
  });  
}
{% endhighlight %}

Akhirnya, kita perlu memperbarui flag `app.hasRequestPending`. Sebelum membuat
XHR, tambahkan `app.hasRequestPending = true;` dan dalam response handler XHR, pas 
sebelum `app.updateForecastCard(response)`, set `app.hasRequestPending = false;`

Aplikasi cuaca kita sekarang membuat dua request secara asynchronous, satu dari cache 
dan satu melalui XHR. Jika ada data dalam cache, data tersebut akan dikembalikan dan di-render
dengan sangat cepat (puluhan mikrodetik) dan memperbarui kartu jika XHR masih 
belum mengembalikan data. Kemudian, ketika XHR memberikan response, kartu akan diperbarui dengan
data paling baru langsung dari API cuaca kita.  

Jika untuk beberapa alasan, XHR merespon lebih cepat dari cache, 
flag `hasRequestPending` akan mencegah cache dari menimpa data terbaru 
dari jaringan.

## Pengujian

* Di dalam console, Anda akan melihat dua event setiap kali Anda me-refresh, satu 
  menunjukkan data diambil dari cache, dan satu lagi diambil 
  dari jaringan.
* Aplikasi ini sudah bekerja sepenuhnya secara offline sekarang. Coba hentinkan server development Anda
  dan putuskan koneksi ke jaringan, kemudian jalankan aplikasi. Sekarang, app shell dan
  data, dua-duanya harus dilayani dari cache.

<a href="https://weather-pwa-sample.firebaseapp.com/step-07/" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">Cobalah</a>
