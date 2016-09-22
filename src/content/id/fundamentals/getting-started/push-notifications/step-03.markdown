---

title: "Get started with Service Worker"
description: "Add JavaScript to install a service worker"
---

A completed version of this step is in the completed/step3 directory.
Sebuah versi lengkap dari langkah ini adalah menyelesaikan / direktori step3.

{% include shared/toc.liquid %}

## 1. Buat index.html

In your _app_ directory, create the file _index.html_ and add the following
code:
Dalam direktori _app_ Anda, membuat _index.html_ berkas dan menambahkan 
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

Open _index.html_ locally in Chrome from localhost: the URL should be something like _http://localhost/push-notifications/app/index.html_.
Buka _index.html_ lokal di Chrome dari localhost: URL harus sesuatu seperti _http: //localhost/push-notifications/app/index.html_.

## 2. Tambahkan Service Worker

In your _app_ directory, create an empty file named _sw.js_. You'll add code
to this later.
Dalam direktori _app_ Anda, membuat file kosong bernama _sw.js_. Anda akan menambahkan kode
untuk ini nanti.

Don't worry if you haven't used service workers before. You won't need to know much about them to complete this codelab. Service workers are worker scripts that run in the background to intercept network requests, handle push messages and perform other tasks. If you want to find out more, take a look at [Introduction to Service Worker](/web/fundamentals/primers/service-worker/).
Jangan khawatir jika Anda belum pernah menggunakan pekerja layanan sebelumnya. Anda tidak perlu tahu banyak tentang mereka untuk menyelesaikan codelab ini. pekerja layanan skrip pekerja yang berjalan di latar belakang untuk mencegat permintaan jaringan, menangani pesan dorong dan melakukan tugas-tugas lainnya. Jika Anda ingin mengetahui lebih lanjut, lihat [Pengantar Layanan Pekerja] (/ web / fundamental / primer / layanan-pekerja /).

When a push message is received, the browser can run a service worker in the background to handle push messages without requiring a web page to be open.
Ketika pesan push diterima, browser dapat menjalankan pekerja layanan di latar belakang untuk menangani pesan dorong tanpa memerlukan sebuah halaman web untuk terbuka.

## 3. Register and install a Service Worker
## 3. Daftar dan menginstal Pekerja Layanan


In this step you create the _main.js_ JavaScript file referred to in
_index.html_. This in turn gives access to the service worker script.  In your _app_ directory, create a _js_ directory and add to it a file named
_main.js_ with the following code:
Dalam langkah ini Anda membuat _main.js_ JavaScript berkas dimaksud dalam
_index.html_. Hal ini pada gilirannya memberikan akses ke script pekerja layanan. Dalam direktori _app_ Anda, membuat direktori _js_ dan menambahkan untuk itu sebuah file bernama
_main.js_ dengan kode berikut:

{% highlight javascript %}
if ('serviceWorker' in navigator) {
 console.log('Service Worker didukung');
 navigator.serviceWorker.register('sw.js').then(function(reg) {
   console.log(':^)', reg);
   // TODO
 }).catch(function(err) {
   console.log(':^(', err);
 });
}
{% endhighlight %}

This code checks if service worker is supported by your browser, then registers and installs the service worker you created in _sw.js_ — which doesn't do anything (yet!)
Kode cek ini jika pekerja layanan didukung oleh browser Anda, kemudian register dan menginstal pekerja layanan Anda buat di _sw.js_ - (! belum) yang tidak melakukan apa-apa


## 4. Try it out from localhost
## 4. Cobalah dari localhost


Open _index.html_ from localhost and open Chrome DevTools to check the
console.
Terbuka _index.html_ dari localhost dan terbuka DevTools Chrome untuk memeriksa
menghibur.

It should look like this:
Seharusnya terlihat seperti ini:


<img src="images/image01.png" width="965" height="901" alt="Codelab web page open in Chrome, showing ServiceWorkerRegistration in DevTools console" />
<Img src = "images / image01.png" width = "965" height = "901" alt = "halaman web Codelab terbuka di Chrome, menunjukkan ServiceWorkerRegistration di DevTools console" />


## 5. Try out serviceworker-internals
## 5. Coba ServiceWorker-internal


The diagnostic page _chrome://serviceworker-internals_ is a good place to
check that your service workers are working:
Diagnostik Halaman _chrome: // ServiceWorker-internals_ adalah tempat yang baik untuk
memeriksa bahwa pekerja layanan Anda bekerja:

<img src="images/image02.png" width="907" height="641" alt="chrome:serviceworker-internals diagnostic page open in Chrome" />
<Img src = "images / image02.png" width = "907" height = "641" alt = "chrome: ServiceWorker-internal halaman diagnostik terbuka di Chrome" />


## 6. Add event listeners to your Service Worker
## 6. Tambahkan event pendengar untuk Pekerja Layanan Anda


Add the following code to _sw.js_:
Tambahkan kode berikut untuk _sw.js_:


{% highlight javascript %}
console.log('Mulai', self);
self.addEventListener('install', function(event) {
  self.skipWaiting();
  console.log('Ter-install', event);
});
self.addEventListener('activate', function(event) {
  console.log('Ter-aktifasi', event);
});
self.addEventListener('push', function(event) {
  console.log('Pesan Push Notification diterima', event);
  // TODO
});
{% endhighlight %}

In a service worker, `self` refers to the `ServiceWorkerGlobalScope` object: the service worker itself.
Dalam pekerja pelayanan, `self` mengacu pada` objek ServiceWorkerGlobalScope`: pekerja layanan itu sendiri.


**TOP TIP!**

By default an old service worker will stay running until all tabs that use it are closed or unloaded. A new service worker will remain in the `waiting` state.
Secara default pekerja layanan lama akan tetap berjalan sampai semua tab yang menggunakannya ditutup atau dibongkar. Seorang pekerja layanan baru akan tetap berada di `negara waiting`.


When `skipWaiting()` is called (as in the code above) the service worker will skip the waiting state and immediately activate.
Ketika `skipWaiting ()` disebut (seperti pada kode di atas) pekerja layanan akan melewatkan negara menunggu dan segera mengaktifkan.


Handy for debugging!
Berguna untuk debugging!


Click the **Inspect** button on the _chrome://serviceworker-internals_ page. You should see the following:
Klik ** Periksa ** tombol pada _chrome yang: // halaman ServiceWorker-internals_. Anda harus melihat berikut:


<img src="images/image03.png" width="888" height="845" alt="Chrome DevTools console showing service worker instal and activate events" />
<Img src = "images / image03.png" width = "888" height = "845" alt = "DevTools Chrome konsol menunjukkan instal pekerja layanan dan mengaktifkan acara" />


**Warning**: If there are errors parsing your service worker code, it won't be installed and an error will be thrown during the install event.
This can result in a service worker mysteriously not updating when you change the code. Always remember to check and validate your code when you change it!
** Peringatan **: Jika ada kesalahan parsing kode pekerja layanan Anda, itu tidak akan diinstal dan kesalahan akan dilemparkan saat instalasi acara.
Hal ini dapat mengakibatkan seorang pekerja layanan misterius tidak memperbarui ketika Anda mengubah kode. Selalu ingat untuk memeriksa dan memvalidasi kode Anda ketika Anda mengubahnya!
	