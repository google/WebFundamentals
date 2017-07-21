project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Di codelab ini, Anda membangun Progressive Web App, yang dimuat dengan cepat, bahkan pada jaringan yang tidak stabil, memiliki ikon di layar beranda, dan dimuat dengan pengalaman tingkat atas selayar penuh.

{# wf_updated_on: 2017-01-05T16:32:36Z #}
{# wf_published_on: 2016-01-01 #}


# Progressive Web App Anda yang Pertama {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}



## Pengantar




[Progressive Web App](/web/progressive-web-apps) adalah pengalaman yang menggabungkan yang terbaik dari web dan yang terbaik dari aplikasi. Pengalaman ini bermanfaat untuk pengguna dari kunjungan pertamanya di tab browser, tanpa harus melakukan pemasangan. Pengguna secara progresif akan membangun hubungan dengan aplikasi, yang semakin lama semakin kuat. Aplikasi dimuat cepat, bahkan pada jaringan yang tidak stabil, mengirimkan pemberitahuan push yang relevan, memiliki ikon pada layar beranda, dan dimuat dengan pengalaman tingkat atas selayar penuh.

### Apa itu Progressive Web App?

Progressive Web App adalah:

* __Progresif__ - Bekerja untuk setiap pengguna, apa pun pilihan browser mereka karena dibangun dengan peningkatan progresif sebagai konsep intinya.
* __Responsif__ - Cocok dengan setiap faktor bentuk: perangkat desktop, seluler, tablet, atau apa saja yang muncul berikutnya.
* __Konektivitas independen__ - Disempurnakan dengan service worker agar bisa bekerja offline atau pada jaringan berkualitas-rendah.
* __Seperti-Aplikasi__ - Terasa seperti sebuah aplikasi untuk pengguna dengan interaksi dan navigasi bergaya-aplikasi karena mereka dibangun di atas model shell aplikasi.
* __Segar__ - Selalu terkini berkat proses pembaruan service worker.
* __Aman__ - Disediakan melalui HTTPS untuk mencegah snooping dan memastikan materi belum dirusak.
* __Dapat ditemukan__ - Dapat diidentifikasi sebagai "aplikasi" berkat manifes W3C dan cakupan registrasi service worker, yang memungkinkan mesin telusur untuk menemukannya.
* __Bisa dilibatkan-kembali__ - Kemudahan untuk dilibatkan-kembali dengan fitur seperti pemberitahuan push.
* __Dapat dipasang__ - Memungkinkan pengguna untuk "menyimpan" aplikasi yang mereka anggap paling berguna di layar beranda tanpa kerumitan toko aplikasi.
* __Bisa ditautkan__ - Dapat dengan mudah dibagikan melalui URL, tidak memerlukan pemasangan yang rumit.

Codelab ini akan memandu Anda untuk membuat Progressive Web App, termasuk pertimbangan desain, serta detail implementasi untuk memastikan bahwa aplikasi Anda memenuhi prinsip kunci dari Progressive Web App.

### Apa yang akan kita bangun?

Dalam codelab ini, Anda akan membangun aplikasi web Weather menggunakan teknik Progressive Web
App. Mari kita mengingat sifat dari Progressive Web App:

* **Progresif** - kita akan menggunakan peningkatan progresif ke seluruh proses.
* **Responsif** - kita akan memastikan itu cocok dengan setiap faktor bentuk.
* **Konektivitas** independen - kita akan meng-cache shell aplikasi dengan service worker.
* **Seperti-Aplikasi** - kita akan menggunakan interaksi bergaya-aplikasi untuk menambahkan kota dan segarkan data.
* **Segar** - kita akan meng-cache data terbaru dengan service worker.
* **Aman** - kita akan menerapkan aplikasi ke host yang mendukung HTTPS.
* **Dapat ditemukan dan dipasang** - kita akan menyertakan manifes sehingga memudahkan mesin telusur menemukan aplikasi kita.
* **Bisa ditautkan** - ini adalah web!

### Apa yang akan Anda pelajari

* Bagaimana merancang dan membangun sebuah aplikasi menggunakan metode "shell aplikasi"
* Cara membuat aplikasi Anda bekerja offline
* Cara menyimpan data untuk penggunaan offline nantinya

### Apa yang Anda butuhkan

* Chrome 52 atau di atasnya
*  [Web Server for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb), atau server web pilihan Anda
* [Kode contoh](https://github.com/googlecodelabs/your-first-pwapp/archive/master.zip)
* Editor teks
* Pengetahuan dasar tentang HTML, CSS, JavaScript, dan Chrome DevTools

Codelab ini berfokus pada Progressive Web App. Konsep dan blok kode yang tidak-relevan akan dipoles dan disediakan sehingga Anda cukup salin dan tempel.


## Persiapan




### Mengunduh Kode

Klik tombol berikut untuk mengunduh semua kode bagi codelab:

[Tautan](https://github.com/googlecodelabs/your-first-pwapp/archive/master.zip)

Mengekstrak file zip yang diunduh. Ini akan mengekstrak folder root (`your-first-pwapp-master`), yang berisi satu folder untuk setiap langkah codelab, bersama dengan semua sumber daya yang Anda butuhkan.

Folder `step-NN` berisi status akhir yang diinginkan dari setiap langkah codelab ini. Folder tersebut digunakan sebagai referensi. Kita akan melakukan semua pekerjaan pengkodean di direktori yang disebut `work`.

### Memasang dan memverifikasi server web

Meskipun Anda bebas menggunakan server web sendiri, codelab ini dirancang untuk bekerja dengan baik bersama Server Web Chrome. Jika Anda belum memasang aplikasi tersebut, Anda bisa memasangnya dari Toko Web Chrome.

[Tautan](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)

Setelah memasang aplikasi Web Server for Chrome, klik pada pintasan Apps di bilah bookmark: 

![9efdf0d1258b78e4.png](img/9efdf0d1258b78e4.png)

Pada jendela berikutnya, klik ikon Web Server: 

![dc07bbc9fcfe7c5b.png](img/dc07bbc9fcfe7c5b.png)

Berikutnya, Anda akan melihat dialog ini, yang memungkinkan Anda mengonfigurasi server web lokal:

![433870360ad308d4.png](img/433870360ad308d4.png)

Klik tombol __choose folder__, dan pilih folder `work`. Ini memungkinkan Anda untuk menyajikan pekerjaan yang sedang berlangsung melalui URL yang disorot dalam dialog server web (di bagian __Web Server URL(s)__).

Di bawah Options, centang kotak di sebelah "Automatically show index.html", seperti yang ditampilkan di bawah ini:

![39b4e0371e9703e6.png](img/39b4e0371e9703e6.png)

Kemudian berhenti dan restart server dengan menggeser toggle yang berlabel "Web Server: STARTED" ke kiri dan kemudian kembali ke kanan.

![daefd30e8a290df5.png](img/daefd30e8a290df5.png)

Sekarang kunjungi situs pekerjaan dalam browser web Anda (dengan mengeklik Web Server URL yang disorot) dan Anda akan melihat laman yang terlihat seperti ini:

![aa64e93e8151b642.png](img/aa64e93e8151b642.png)

Jelas, aplikasi ini belum melakukan sesuatu yang menarik - sejauh ini, hanya kerangka minimal dengan spinner yang kami gunakan untuk memverifikasi fungsionalitas server web Anda. Kami akan menambahkan fungsionalitas dan fitur UI dalam langkah-langkah berikutnya. 


## Arsitektur Shell Aplikasi Anda




### Apa yang dimaksud dengan shell aplikasi?

Shell aplikasi adalah HTML, CSS, dan JavaScript minimum yang diperlukan untuk menenagai antarmuka pengguna progressive web app dan merupakan salah satu komponen yang memastikan kinerja yang baik dan bisa diandalkan. Pemuatan pertama harus sangat cepat dan langsung di-cache. "Di-cache" berarti bahwa file shell dimuat setelah melalui jaringan dan kemudian disimpan ke perangkat lokal. Setiap kali pengguna membuka aplikasi, file shell dimuat dari cache perangkat lokal, yang menghasilkan waktu startup super cepat. 

Arsitektur shell aplikasi memisahkan infrastruktur aplikasi inti dan UI dari data. Semua UI dan infrastruktur di-cache secara lokal menggunakan service worker sehingga pada pemuatan berikutnya, Progressive Web App hanya perlu mengambil data yang dibutuhkan, alih-alih memuat semuanya.

![156b5e3cc8373d55.png](img/156b5e3cc8373d55.png)

Dengan kata lain, shell aplikasi serupa dengan bundel kode yang akan Anda publikasikan ke toko aplikasi ketika membuat aplikasi asli. Ini adalah komponen inti yang diperlukan untuk membangun aplikasi Anda dari dasar, namun kemungkinan tidak berisi data.

### Mengapa menggunakan arsitektur Shell Aplikasi?

Menggunakan arsitektur shell aplikasi memungkinkan Anda untuk fokus pada kecepatan, memberikan Progressive Web App properti yang mirip dengan aplikasi asli: pemuatan langsung dan pembaruan rutin, semua tanpa membutuhkan sebuah toko aplikasi.

### Mendesain Shell Aplikasi 

Langkah pertama adalah memecahkan desain hingga ke dalam komponen inti.

Tanyakan pada diri Anda:

* Apa yang harus segera ditampilkan di layar?
* Apa komponen UI lain yang merupakan kunci untuk aplikasi?
* Apa sumber daya pendukung yang dibutuhkan oleh shell aplikasi? Misalnya gambar, JavaScript, gaya, dll.

Kita akan membuat aplikasi Weather sebagai Progressive Web App yang pertama. Komponen utamanya terdiri dari:

* Header dengan judul, dan tombol add/refresh
* Kontainer untuk kartu prakiraan cuaca
* Template kartu prakiraan
* Kotak dialog untuk menambahkan kota baru
* Indikator pemuatan

Ketika mendesain aplikasi yang lebih kompleks, materi yang tidak diperlukan untuk pemuatan awal dapat diminta belakangan dan kemudian di-cache untuk penggunaan mendatang. Misalnya, kita bisa menunda pemuatan kotak dialog New City sampai kita selesai merender pengalaman pertama menjalankan dan tersedia beberapa siklus yang diam.


## Mengimplementasikan Shell Aplikasi Anda




Ada beberapa cara untuk memulai proyek, dan kami biasanya merekomendasikan untuk menggunakan Web Starter Kit. Namun, dalam kasus ini, agar proyek kita tetap sesederhana mungkin dan berkonsentrasi pada Progressive Web App, kami telah menyediakan semua sumber daya yang Anda butuhkan.

### Membuat HTML untuk Shell Aplikasi

Sekarang kita akan menambahkan komponen inti yang kita bahas dalam [Arsitektur Shell Aplikasi](/web/fundamentals/getting-started/your-first-progressive-web-app/step-01).

Ingat, komponen utama terdiri dari:

* Header dengan judul, dan tombol add/refresh
* Kontainer untuk kartu prakiraan cuaca
* Template kartu prakiraan
* Dialog untuk menambahkan kota baru
* Indikator pemuatan

File `index.html` yang sudah ada dalam direktori `work` harus terlihat seperti ini (ini adalah bagian dari materi sebenarnya, jangan menyalin kode ini ke dalam file Anda):

```
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Weather PWA</title>
  <link rel="stylesheet" type="text/css" href="styles/inline.css">
</head>
<body>
  <header class="header">
    <h1 class="header__title">Weather PWA</h1>
    <button id="butRefresh" class="headerButton"></button>
    <button id="butAdd" class="headerButton"></button>
  </header>

  <main class="main">
    <div class="card cardTemplate weather-forecast" hidden>
    . . .
    </div>
  </main>

  <div class="dialog-container">
  . . .
  </div>

  <div class="loader">
    <svg viewBox="0 0 32 32" width="32" height="32">
      <circle id="spinner" cx="16" cy="16" r="14" fill="none"></circle>
    </svg>
  </div>

  <!-- Insert link to app.js here -->
</body>
</html>
```

Perhatikan bahwa loader terlihat secara default. Ini memastikan bahwa pengguna melihat pemuat begitu laman dimuat, memberi mereka tanda yang jelas bahwa materi sedang memuat.

Untuk menghemat waktu, kami juga sudah membuat stylesheet yang bisa Anda gunakan.

### Memeriksa kunci kode aplikasi JavaScript

Sekarang kita memiliki sebagian besar UI yang siap, tiba saatnya menghubungkan kode untuk membuatnya berfungsi. Seperti seluruh shell aplikasi, kenali kodeapa yang diperlukan sebagai bagian dari pengalaman kunci dan apa yang bisa dimuat belakangan.

Direktori pekerjaan Anda juga sudah memuat kode aplikasi (`scripts/app.js`), di dalamnya Anda akan menemukan:

* Objek `app` yang berisi beberapa informasi kunci yang diperlukan untuk aplikasi.
* Event listener untuk semua tombol di header (`add/refresh`) dan pada dialog tambahkan kota (`add/cancel`).
* Metode untuk menambah atau memperbarui kartu prakiraan (`app.updateForecastCard`).
* Metode untuk mendapatkan data prakiraan cuaca terbaru dari Firebase Public Weather API (`app.getForecast`).
* Metode untuk melakukan iterasi kartu sekarang dan memanggil `app.getForecast` untuk mendapatkan data prakiraan terbaru (`app.updateForecasts`).
* Beberapa data palsu (`initialWeatherForecast`) bisa Anda gunakan untuk dengan cepat menguji bagaimana segala sesuatu di-render.

### Lakukan pengujian

Karena sekarang Anda telah mendapat HTML, gaya dan JavaScript inti, saatnya untuk menguji aplikasi.

Untuk melihat bagaimana data cuaca palsu dirender, hilangkan tanda komentar pada baris berikut di bagian bawah file `index.html` Anda:

    <!--<script src="scripts/app.js" async></script>-->

Berikutnya, hilangkan tanda komentar pada baris berikut di bagian bawah file `app.js` Anda:

    // app.updateForecastCard(initialWeatherForecast);

Muat ulang aplikasi Anda. Hasilnya akan menjadi kartu prakiraan yang terformat dengan baik (meskipun palsu, Anda bisa tahu dari tanggalnya) dengan spinner dinonaktifkan, seperti ini:

![166c3b4982e4a0ad.png](img/166c3b4982e4a0ad.png)

[Tautan](https://weather-pwa-sample.firebaseapp.com/step-04/)

Setelah Anda mencobanya dan memverifikasi bahwa itu bekerja sesuai harapan, Anda bisa membuang panggilan ke `app.updateForecastCard` dengan data palsu lagi. Kita hanya memerlukannya untuk memastikan bahwa semuanya bekerja sesuai harapan.


## Memulai dengan pemuatan pertama yang cepat




Progressive Web App harus mulai dengan cepat dan bisa langsung dipakai. Dengan kondisi saat ini, Aplikasi Weather kita dimulai dengan cepat, tapi tidak dapat digunakan. Tidak ada data. Kita bisa membuat permintaan AJAX untuk mendapatkan data tersebut, tapi itu akan mengakibatkan permintaan tambahan dan membuat muat awal lebih lama. Sebaiknya, berikan data real di pemuatan pertama.

### Memasukkan data prakiraan cuaca

Untuk code lab ini, kami menyimulasikan server memasukkan prakiraan cuaca langsung ke dalam JavaScript, namun dalam aplikasi produksi, data prakiraan cuaca terbaru akan dimasukkan oleh server berdasarkan geo-lokasi alamat IP pengguna.

Kode sudah berisi data yang akan kita masukkan. Ini adalah `initialWeatherForecast` yang kita gunakan pada langkah sebelumnya.

### Membedakan pertama kali dijalankan

Namun, bagaimana kita tahu kapan menampilkan informasi ini, yang mungkin tidak relevan pada pemuatan mendatang ketika aplikasi cuaca ditarik dari cache? Ketika pengguna memuat aplikasi pada kunjungan berikutnya, mereka mungkin telah berpindah kota, jadi kita harus memuat informasi untuk kota tersebut, tidak selalu kota pertama yang pernah mereka singgahi.

Preferensi pengguna, seperti daftar kota langganan pengguna, harus disimpan secara lokal menggunakan IndexedDB atau mekanisme penyimpanan cepat lainnya. Untuk menyederhanakan code lab ini semaksimal mungkin, kami menggunakan [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), yang tidak ideal untuk aplikasi produksi karena ini adalah mekanisme penyimpanan sinkron yang memblokir sehingga berpotensi sangat lambat pada beberapa perangkat.

Pertama, mari kita tambahkan kode yang diperlukan untuk menyimpan preferensi pengguna. Temukan komentar TODO berikut dalam kode Anda.

```
  // TODO add saveSelectedCities function here
```

Dan tambahkan kode berikut di bawah komentar.

```
  // Save list of cities to localStorage.
  app.saveSelectedCities = function() {
    var selectedCities = JSON.stringify(app.selectedCities);
    localStorage.selectedCities = selectedCities;
  };
```

Berikutnya, mari kita tambahkan kode startup untuk memeriksa apakah pengguna memiliki kota yang disimpan dan merender kota tersebut, atau menggunakan data yang dimasukkan. Temukan komentar berikut:

```
  // TODO add startup code here
```

Dan tambahkan kode berikut di bawah komentar ini.

```
/************************************************************************
   *
   * Code required to start the app
   *
   * NOTE: To simplify this codelab, we've used localStorage.
   *   localStorage is a synchronous API and has serious performance
   *   implications. It should not be used in production applications!
   *   Instead, check out IDB (https://www.npmjs.com/package/idb) or
   *   SimpleDB (https://gist.github.com/inexorabletash/c8069c042b734519680c)
   ************************************************************************/

  app.selectedCities = localStorage.selectedCities;
  if (app.selectedCities) {
    app.selectedCities = JSON.parse(app.selectedCities);
    app.selectedCities.forEach(function(city) {
      app.getForecast(city.key, city.label);
    });
  } else {
    /* The user is using the app for the first time, or the user has not
     * saved any cities, so show the user some fake data. A real app in this
     * scenario could guess the user's location via IP lookup and then inject
     * that data into the page.
     */
    app.updateForecastCard(initialWeatherForecast);
    app.selectedCities = [
      {key: initialWeatherForecast.key, label: initialWeatherForecast.label}
    ];
    app.saveSelectedCities();
  }
```

Kode startup memeriksa bila ada kota yang disimpan dalam penyimpanan lokal. Jika ada, itu akan mem-parse data penyimpanan lokal dan kemudian menampilkan kartu prakiraan untuk masing-masing kota yang disimpan. Jika tidak, kode startup akan menggunakan data prakiraan palsu dan menyimpannya sebagai kota default.

### Menyimpan kota yang dipilih

Yang terakhir, Anda harus mengubah penangan tombol "add city" untuk menyimpan kota yang dipilih ke penyimpanan lokal.

Perbarui penangan klik `butAddCity` Anda sehingga sesuai dengan kode berikut:

```
document.getElementById('butAddCity').addEventListener('click', function() {
    // Add the newly selected city
    var select = document.getElementById('selectCityToAdd');
    var selected = select.options[select.selectedIndex];
    var key = selected.value;
    var label = selected.textContent;
    if (!app.selectedCities) {
      app.selectedCities = [];
    }
    app.getForecast(key, label);
    app.selectedCities.push({key: key, label: label});
    app.saveSelectedCities();
    app.toggleAddDialog(false);
  });
```

Tambahan yang baru adalah inisialisasi `app.selectedCities` jika tidak terdapat hal tersebut, serta panggilan ke `app.selectedCities.push()` dan `app.saveSelectedCities()`.

### Lakukan pengujian

* Ketika pertama kali dijalankan, aplikasi Anda harus langsung menunjukkan pengguna prakiraan dari `initialWeatherForecast`.
* Tambahkan kota baru (dengan mengeklik ikon + di sudut kanan atas) dan verifikasi bahwa dua kartu ditampilkan.
* Segarkan browser dan verifikasi bahwa aplikasi memuat prakiraan dan menampilkan informasi terbaru.

[Tautan](https://weather-pwa-sample.firebaseapp.com/step-05/)


## Menggunakan service worker untuk melakukan precache Shell Aplikasi




Progressive Web App harus cepat, dan dapat dipasang, yang berarti bahwa mereka tetap berfungsi saat online, offline, dan pada koneksi yang lambat serta tidak stabil. Untuk mencapai ini, kita harus meng-cache shell aplikasi menggunakan service worker, sehingga selalu tersedia dengan cepat dan bisa diandalkan.

Jika Anda belum familier dengan service worker, Anda bisa mendapatkan pemahaman dasar dengan membaca [Pengantar Service Workers](/web/fundamentals/primers/service-worker/) tentang apa yang bisa mereka lakukan, bagaimana daur hidupnya dan lainnya. Setelah menyelesaikan code lab ini, pastikan untuk memeriksa [Men-debug Service Worker code lab](https://goo.gl/jhXCBy) untuk menilik secara lebih dalam tentang cara bekerja dengan service worker.

Fitur yang disediakan melalui service worker harus dianggap sebagai peningkatan progresif, dan hanya ditambahkan jika didukung oleh browser. Misalnya, dengan service worker Anda bisa meng-cache shell aplikasi dan data untuk aplikasi, sehingga mereka tersedia bahkan ketika tidak ada jaringan. Ketika service worker tidak didukung, kode offline tidak dipanggil, dan pengguna mendapatkan pengalaman dasar. Menggunakan deteksi fitur untuk memberikan peningkatan progresif membutuhkan overhead dan tidak akan masuk dalam browser lama yang tidak mendukung fitur tersebut.

### Mendaftarkan service worker jika tersedia

Langkah pertama agar aplikasi bisa bekerja secara offline adalah dengan mendaftarkan service worker, skrip yang memungkinkan fungsionalitas latar belakang tanpa membutuhkan laman web terbuka atau interaksi pengguna.

Ini membutuhkan dua langkah sederhana:

1. Perintahkan browser untuk mendaftarkan file JavaScript sebagai service worker.
2. Buat file JavaScript yang memuat service worker.

Pertama, kita harus memeriksa apakah browser mendukung service worker, dan jika mendukung, daftarkan service worker. Tambahkan kode berikut ke `app.js` (setelah komentar `// TODO add service worker code here`):

```
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }
```

### Meng-cache aset situs

Bila service worker telah terdaftar, kejadian pasang dipicu saat pengguna pertama kali mengunjungi laman. Dalam penangan kejadian ini, kita akan meng-cache semua aset yang dibutuhkan untuk aplikasi.

Ketika diaktifkan, service worker akan membuka objek [cache](https://developer.mozilla.org/en-US/docs/Web/API/Cache) dan mengisinya dengan aset yang diperlukan untuk memuat Shell Aplikasi. Buatlah file bernama `service-worker.js` di folder root aplikasi Anda (yang seharusnya direktori `your-first-pwapp-master/work`). File harus tinggal di root aplikasi karena cakupan untuk service worker didefinisikan oleh direktori tempat file berada. Tambahkan kode berikut ke file `service-worker.js` yang baru:

```
var cacheName = 'weatherPWA-step-6-1';
var filesToCache = [];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});
```

Pertama, kita harus membuka cache dengan `caches.open()` dan memberikan nama cache. Memberikan nama cache memungkinkan kita untuk memberikan file nama versi, atau data terpisah dari shell aplikasi sehingga kita bisa dengan mudah memperbarui suatu item tanpa memengaruhi yang lainnya.

Setelah cache terbuka, kita kemudian bisa memanggil `cache.addAll()`, yang membawa daftar URL, kemudian mengambilnya dari server dan menambahkan respons ke cache. Sayangnya, `cache.addAll()` bersifat atomis, jika salah satu file gagal, seluruh langkah cache akan gagal!

Baiklah, mari kita mulai mengakrabkan diri dengan bagaimana Anda bisa menggunakan DevTools untuk memahami dan men-debug service worker. Sebelum memuat ulang laman Anda, buka DevTools, masuk ke panel __Service Worker __pada panel __Application __. Terlihat seperti ini.

![ed4633f91ec1389f.png](img/ed4633f91ec1389f.png)

Ketika Anda melihat laman kosong seperti ini, berarti laman yang sedang terbuka tidak memiliki service worker yang terdaftar.

Sekarang, muat ulang laman Anda. Panel Service Worker sekarang terlihat seperti ini.

![bf15c2f18d7f945c.png](img/bf15c2f18d7f945c.png)

Ketika Anda melihat informasi seperti ini, berarti laman memiliki service worker aktif.

Oke, sekarang kita akan melakukan penjelajahan singkat dan menunjukkan kejutan yang mungkin Anda hadapi ketika mengembangkan service worker. Untuk menunjukkannya, mari kita tambahkan event listener `activate` di bawah event listener `install` dalam file `service-worker.js` Anda. 

```
self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
});
```

Kejadian `activate` diaktifkan saat service worker dijalankan.

Buka DevTools Console dan muat ulang laman, pindah ke panel Service Worker di panel Application dan klik inspect pada service worker yang diaktifkan. Anda mengira pesan `[ServiceWorker] Activate` dicatat ke konsol, namun itu tidak terjadi. Periksa panel Service Worker dan Anda bisa melihat bahwa service worker yang baru (termasuk event listener aktif) tampaknya berada dalam status "menunggu".

![1f454b6807700695.png](img/1f454b6807700695.png)

Pada dasarnya, service worker lama terus mengontrol laman selama ada tab yang terbuka pada laman. Jadi, Anda *bisa* menutup dan membuka kembali laman atau menekan tombol __skipWaiting __, namun solusi jangka panjangnya adalah dengan mengaktifkan kotak centang __Update on Reload __pada panel Service Worker DevTools. Ketika kotak centang ini diaktifkan, service worker dengan paksa diperbarui setiap kali laman dimuat ulang.

Aktifkan kotak centang __update on reload __ sekarang dan muat ulang laman tersebut untuk memastikan bahwa service worker baru telah diaktifkan.

__Catatan:__ Anda mungkin melihat pesan kesalahan dalam panel Service Worker dari panel Application mirip dengan yang terlihat di bawah, tetap __aman__ mengabaikan pesan kesalahan ini.

![b1728ef310c444f5.png](img/b1728ef310c444f5.png)

Itu semua untuk saat ini mengenai memeriksa dan men-debug service worker di DevTools. Kami akan menunjukkan kepada Anda beberapa trik lagi nanti. Mari kita kembali membangun aplikasi Anda.

Mari kita meluaskan event listener `activate` agar menyertakan beberapa logika untuk memperbarui cache. Perbarui kode Anda agar cocok dengan kode di bawah ini.

```
self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});
```

Kode ini memastikan bahwa service worker Anda memperbarui cache-nya setiap kali file shell aplikasi berubah. Agar bisa berfungsi, Anda harus menaikkan variabel `cacheName` di atas file service worker Anda.

Pernyataan terakhir memperbaiki kasus abnormal yang bisa Anda baca di informasi (opsional) kotak di bawah ini.

Yang terakhir, perbarui daftar file yang dibutuhkan untuk shell aplikasi. Dalam array, kita harus menyertakan semua file yang dibutuhkan aplikasi kita, termasuk gambar, JavaScript, stylesheet, dll. Dekat bagian atas file `service-worker.js` Anda, ganti `var filesToCache = [];` dengan kode di bawah ini:

```
var filesToCache = [
  '/',
  '/index.html',
  '/scripts/app.js',
  '/styles/inline.css',
  '/images/clear.png',
  '/images/cloudy-scattered-showers.png',
  '/images/cloudy.png',
  '/images/fog.png',
  '/images/ic_add_white_24px.svg',
  '/images/ic_refresh_white_24px.svg',
  '/images/partly-cloudy.png',
  '/images/rain.png',
  '/images/scattered-showers.png',
  '/images/sleet.png',
  '/images/snow.png',
  '/images/thunderstorm.png',
  '/images/wind.png'
];
```

Aplikasi kita belum sepenuhnya bekerja offline. Kita sudah meng-cache komponen shell aplikasi, namun kita masih harus memuatnya dari cache lokal.

### Menyediakan shell aplikasi dari cache

Service worker memberikan kemampuan untuk mencegat permintaan yang dilakukan dari Progressive Web App dan menanganinya dalam service worker. Ini berarti kita bisa menentukan bagaimana kita menangani suatu permintaan dan mungkin sekali menyediakan respons cache kita sendiri.

Misalnya:

```
self.addEventListener('fetch', function(event) {
  // Do something interesting with the fetch here
});
```

Sekarang mari kita sediakan shell aplikasi dari cache. Tambahkan kode berikut ke bagian bawah file `service-worker.js` Anda:

```
self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
```

Bergerak dari dalam ke luar, `caches.match()` mengevaluasi permintaan web yang memicu kejadian [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), dan memeriksa apakah itu tersedia dalam cache. Ini kemudian merespons dengan versi cache, atau menggunakan `fetch` untuk mendapatkan salinan dari jaringan. `response` dikembalikan ke laman web dengan `e.respondWith()`.

### Lakukan pengujian

Aplikasi Anda sekarang bisa-offline! Mari kita mencobanya.

Muat ulang laman Anda lalu buka panel __Cache Storage__ pada panel __Application__ dari DevTools. Luaskan bagian itu dan Anda akan melihat nama cache shell aplikasi Anda tercantum di sisi sebelah kiri. Bila Anda mengeklik pada cache shell aplikasi, Anda bisa melihat semua sumber daya yang saat ini telah di-cache.

![ab9c361527825fac.png](img/ab9c361527825fac.png)

Sekarang, mari kita menguji mode offline. Kembali ke panel __Service Worker__ dari DevTools dan aktifkan kotak centang __Offline__. Setelah mengaktifkannya, Anda akan melihat ikon peringatan kecil berwarna kuning di sebelah tab panel __Network__. Ini menunjukkan bahwa Anda offline.

![7656372ff6c6a0f7.png](img/7656372ff6c6a0f7.png)

Muat ulang laman Anda dan... itu bekerja! Paling tidak, sedikit bekerja. Perhatikan bagaimana itu memuat data cuaca (palsu) awal.

![8a959b48e233bc93.png](img/8a959b48e233bc93.png)

Periksa klausul `else` di `app.getForecast()` untuk memahami mengapa aplikasi ini mampu memuat data palsu.

Langkah berikutnya adalah memodifikasi logika aplikasi dan service worker agar bisa meng-cache data cuaca, dan mengembalikan data terbaru dari cache ketika aplikasi offline.

__Tip:__ Untuk memulai baru dan menghapus semua data yang tersimpan (localStoarge, data indexedDB, file cache) dan membuang service worker, gunakan panel Clear storage di tab Application.

[Tautan](https://weather-pwa-sample.firebaseapp.com/step-06/)

### Waspadalah terhadap kasus ekstrem

Seperti yang disebutkan sebelumnya, kode ini __tidak boleh digunakan dalam produksi__ karena banyaknya kasus ekstrem yang tidak tertangani.

#### Cache mengandalkan pembaruan kunci cache untuk setiap perubahan

Misalnya metode caching ini mengharuskan Anda untuk memperbarui kunci cache setiap kali materi berubah, jika tidak, cache tidak akan diperbarui, dan materi lama yang akan ditampilkan. Jadi pastikan untuk mengubah kunci cache bersama setiap perubahan saat Anda bekerja pada proyek Anda!

#### Mengharuskan semuanya diunduh ulang setiap terjadi perubahan

Kekurangan lainnya adalah bahwa seluruh cache dibuat tidak valid dan harus diunduh ulang setiap kali terjadi perubahan file. Ini berarti memperbaiki kesalahan ejaan karakter tunggal sederhana akan membuat cache tidak valid dan mengharuskan semuanya diunduh ulang. Tidak efisien.

#### Cache browser bisa menghalangi cache service worker melakukan pembaruan

Ada peringatan penting lain di sini. Sangat penting bahwa permintaan HTTPS yang dibuat saat penangan pemasangan langsung menuju jaringan dan tidak mengembalikan respons dari cache browser. Jika tidak, browser bisa mengembalikan versi cache yang lama, sehingga cache service worker tidak pernah diperbarui!

#### Waspadalah terhadap strategi cache-terlebih-dahulu dalam produksi

Aplikasi kita menggunakan strategi cache-terlebih-dahulu, yang mengakibatkan salinan dari setiap materi yang di-cache dikembalikan tanpa memperhatikan jaringan. Meskipun strategi cache-terlebih-dahulu mudah diimplementasikan, ini dapat menyebabkan masalah di masa mendatang. Setelah salinan dari laman host dan pendaftaran service worker di-cache, mengubah konfigurasi service worker bisa sangat sulit dilakukan (karena konfigurasi tergantung tempat itu didefinisikan), dan Anda bisa mendapati diri Anda menerapkan situs yang sangat sulit untuk diperbarui!

#### Bagaimana cara menghindari kasus ekstrem ini?

Jadi bagaimana kita menghindari kasus ekstrem ini? Gunakan pustaka seperti [sw-precache](https://github.com/GoogleChrome/sw-precache), yang memberikan kontrol presisi mengenai apa yang akan berakhir, memastikan permintaan langsung menuju jaringan dan melakukan semua kerja keras untuk Anda.

### Tip untuk menguji service worker aktif

Melakukan debug service worker bisa menjadi sebuah tantangan, dan ketika melibatkan caching, sesuatu bisa menjadi lebih buruk lagi jika cache tidak diperbarui saat Anda mengharapkannya. Anda bisa cepat frustrasi saat mengurusi daur hidup service worker khusus dan bug dalam kode Anda. Tapi jangan. Ada beberapa alat yang bisa Anda gunakan untuk memudahkan Anda.

#### Mulai Baru

Dalam beberapa kasus, Anda mungkin mengalami kejadian memuat data cache atau hal tersebut tidak diperbarui seperti yang Anda harapkan. Untuk menghapus semua data yang tersimpan (localStoarge, data indexedDB, file cache) dan membuang service worker, gunakan panel Clear storage di tab Application.

Beberapa tip lain:

* Setelah tidak terdaftar, service worker akan tetap tercantum sampai jendela browser yang memuatnya ditutup.
* Jika beberapa jendela dalam aplikasi Anda terbuka, service worker baru tidak akan berpengaruh hingga mereka semua dimuat ulang dan diperbarui ke service worker terbaru.
* Menghapus pendaftaran service worker tidak akan mengosongkan cache, sehingga ada kemungkinan Anda akan mendapatkan data lama jika nama cache tidak diubah.
* Jika service worker sudah ada dan service worker baru didaftarkan, service worker baru tidak akan mengambil kendali hingga laman dimuat ulang, kecuali jika Anda melakukan [kontrol langsung](https://github.com/GoogleChrome/samples/tree/gh-pages/service-worker/immediate-control).


## Menggunakan service worker untuk meng-cache data prakiraan




Memilih [strategi caching](https://jakearchibald.com/2014/offline-cookbook/) yang tepat untuk data adalah hal yang sangat penting dan bergantung pada tipe data yang diberikan aplikasi Anda. Misalnya, data sensitif-waktu seperti cuaca atau harga saham harus selalu terbaru, sedangkan gambar avatar untuk materi artikel bisa diperbarui lebih jarang.

Strategi [cache-dulu-lalu-jaringan](https://jakearchibald.com/2014/offline-cookbook/#cache-network-race) sangat ideal untuk aplikasi kita. Ini menampilkan data di layar secepat mungkin, kemudian memperbaruinya setelah jaringan mengembalikan data terbaru. Dibandingkan strategi jaringan-dulu-lalu-cache, pengguna tidak harus menunggu sampai [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) habis waktunya untuk mendapatkan data cache.

Cache-dulu-lalu-jaringan berarti kita harus memulai dua permintaan asinkron, satu ke cache dan satu ke jaringan. Permintaan jaringan dengan aplikasi tidak perlu banyak berubah, namun kita harus memodifikasi service worker untuk meng-cache respons sebelum mengembalikannya.

Dalam keadaan normal, data cache akan dikembalikan secara langsung dan menyediakan aplikasi dengan data terbaru yang bisa digunakan. Kemudian, ketika permintaan jaringan kembali, aplikasi akan diperbarui menggunakan data terbaru dari jaringan.

### Mencegat permintaan jaringan dan meng-cache respons

Kita harus memodifikasi service worker untuk mencegat permintaan ke weather API dan menyimpan responsnya dalam cache, sehingga kita bisa dengan mudah mengaksesnya di lain waktu. Dalam strategi cache-lalu-jaringan, kita mengharapkan respons jaringan sebagai 'sumber kebenaran', selalu menyediakan kita dengan informasi terbaru. Jika tidak bisa, tidak apa-apa karena kita sudah mengambil data cache terbaru dalam aplikasi kita.

Dalam service worker, tambahkan `dataCacheName` sehingga kita bisa memisahkan data aplikasi dari shell aplikasi. Ketika shell aplikasi diperbarui dan cache lama dibersihkan, data kita akan tetap tak tersentuh, sehingga siap untuk pemuatan super cepat. Perlu diingat, jika format data Anda berubah nantinya, Anda perlu cara untuk menanganinya dan memastikan shell aplikasi dan materi tetap tersinkronisasi.

Tambahkan baris berikut ke bagian atas file `service-worker.js` Anda:

```
var dataCacheName = 'weatherData-v1';
```

Berikutnya, perbarui penangan kejadian `activate` sehingga tidak menghapus cache data ketika membersihkan cache shell aplikasi.

```
if (key !== cacheName && key !== dataCacheName) {
```

Yang terakhir, perbarui penangan kejadian `fetch` untuk menangani permintaan ke data API secara terpisah dari permintaan lainnya.

```
self.addEventListener('fetch', function(e) {
  console.log('[Service Worker] Fetch', e.request.url);
  var dataUrl = 'https://query.yahooapis.com/v1/public/yql';
  if (e.request.url.indexOf(dataUrl) > -1) {
    /*
     * When the request URL contains dataUrl, the app is asking for fresh
     * weather data. In this case, the service worker always goes to the
     * network and then caches the response. This is called the "Cache then
     * network" strategy:
     * https://jakearchibald.com/2014/offline-cookbook/#cache-then-network
     */
    e.respondWith(
      caches.open(dataCacheName).then(function(cache) {
        return fetch(e.request).then(function(response){
          cache.put(e.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    /*
     * The app is asking for app shell files. In this scenario the app uses the
     * "Cache, falling back to the network" offline strategy:
     * https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
     */
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  }
});
```

Kode ini mencegat permintaan dan memeriksa apakah URL dimulai dengan alamat weather API. Jika benar, kita akan menggunakan [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) untuk membuat permintaan. Setelah respons dikembalikan, kode kita akan membuka cache, membuat duplikat respons, menyimpannya dalam cache, dan akhirnya mengembalikan respons ke pemohon asli.

Aplikasi kita belum dapat bekerja secara offline. Kita telah mengimplementasikan caching dan pengambilan untuk shell aplikasi, namun meskipun kami melakukan cache data, aplikasi belum memeriksa cache untuk melihat apakah ia memiliki data cuaca. 

### Membuat permintaan

Seperti telah disebutkan sebelumnya, aplikasi harus memulai dua permintaan asinkron, satu untuk cache dan satu untuk jaringan. Aplikasi menggunakan objek `caches` yang tersedia di `window` untuk mengakses cache dan mengambil data terbaru. Ini adalah contoh yang sangat baik dari penyempurnaan progresif karena objek `caches` mungkin tidak tersedia di semua browser, dan jika memang begitu, permintaan jaringan seharusnya tetap bekerja.

Untuk melakukan ini, kita harus:

1. Memeriksa apakah objek `caches` tersedia di objek `window` global.
2. Meminta data dari cache. 

* Jika permintaan server masih belum selesai, perbarui aplikasi dengan data cache.

3. Meminta data dari server.

* Menyimpan data untuk akses cepat nantinya.
* Memperbarui aplikasi dengan data baru dari server.

#### Mendapatkan data dari cache

Berikutnya, kita harus memeriksa apakah objek `caches` ada dan meminta data terbaru dari situ. Temukan komentar `TODO add cache logic here` di `app.getForecast()`, dan kemudian tambahkan kode berikut di bawah komentar.

```
    if ('caches' in window) {
      /*
       * Check if the service worker has already cached this city's weather
       * data. If the service worker has the data, then display the cached
       * data while the app fetches the latest data.
       */
      caches.match(url).then(function(response) {
        if (response) {
          response.json().then(function updateFromCache(json) {
            var results = json.query.results;
            results.key = key;
            results.label = label;
            results.created = json.query.created;
            app.updateForecastCard(results);
          });
        }
      });
    }
```

Aplikasi cuaca kita sekarang membuat dua permintaan data asinkron, satu dari `cache` dan satu melalui XHR. Jika terdapat data dalam cache, itu akan dikembalikan dan dirender dengan sangat cepat (puluhan milidetik) dan memperbarui kartu hanya jika XHR belum diselesaikan. Kemudian, ketika XHR merespons, kartu akan diperbarui dengan data terbaru langsung dari weather API.

Perhatikan bagaimana permintaan cache dan permintaan XHR berakhir dengan panggilan untuk memperbarui kartu prakiraan. Bagaimana aplikasi tahu bahwa itu menampilkan data terbaru? Ini ditangani dalam kode berikut dari `app.updateForecastCard`:

```
    var cardLastUpdatedElem = card.querySelector('.card-last-updated');
    var cardLastUpdated = cardLastUpdatedElem.textContent;
    if (cardLastUpdated) {
      cardLastUpdated = new Date(cardLastUpdated);
      // Bail if the card has more recent data then the data
      if (dataLastUpdated.getTime() < cardLastUpdated.getTime()) {
        return;
      }
    }
```

Setiap kali kartu diperbarui, aplikasi menyimpan stempel waktu dari data pada atribut tersembunyi dalam kartu. Aplikasi ini hanya terlepas jika stempel waktu yang ada pada kartu lebih baru daripada data yang diteruskan ke fungsi.

### Lakukan pengujian

Aplikasi seharusnya sudah berfungsi offline sepenuhnya sekarang. Simpan beberapa kota dan tekan tombol refresh pada aplikasi untuk mendapatkan data cuaca baru, kemudian masuk ke mode offline dan muat ulang halaman tersebut. 

Kemudian buka panel __Cache Storage__ pada panel __Application__ dari DevTools. Luaskan bagian itu dan Anda akan melihat nama shell aplikasi dan cache data tercantum di sisi sebelah kiri. Membuka data cache akan membuat data tersimpan untuk setiap kota.

![cf095c2153306fa7.png](img/cf095c2153306fa7.png)

[Tautan](https://weather-pwa-sample.firebaseapp.com/step-07/)


## Dukungan integrasi asli




Tak ada yang suka mengetikkan URL yang panjang di keyboard seluler jika memang tidak terpaksa. Dengan fitur Add to Home Screen, pengguna bisa memilih untuk menambahkan tautan pintasan ke perangkat seperti ketika mereka memasang aplikasi asli dari toko, namun dengan lebih mulus.

### Spanduk Pemasangan Aplikasi Web dan Add to Home Screen untuk Chrome pada Android

Spanduk pemasangan aplikasi web memberikan Anda kemampuan agar pengguna bisa dengan cepat dan mulus menambahkan aplikasi web ke layar beranda mereka, sehingga mudah dijalankan dan kembali ke aplikasi Anda. Sangat mudah menambahkan spanduk pemasangan aplikasi, karena sebagian besar tugas tersebut sudah ditangani Chrome. Kita hanya perlu memasukkan file manifes aplikasi web dengan detail tentang aplikasi tersebut.

Chrome kemudian menggunakan sejumlah kriteria seperti penggunaan service worker, status SSL dan heuristik frekuensi kunjungan untuk menentukan kapan spanduk akan ditampilkan. Selain itu, pengguna secara manual bisa menambahkannya melalui tombol menu "Add to Home Screen" di Chrome.

#### Mendeklarasikan manifes aplikasi dengan file `manifest.json`

Manifes aplikasi web adalah file JSON sederhana yang memberikan Anda, developer, kemampuan untuk mengontrol bagaimana aplikasi terlihat oleh pengguna di daerah yang mereka harap akan melihat aplikasi (misalnya, layar beranda seluler), mengarahkan apa yang bisa diluncurkan pengguna, dan yang lebih penting lagi adalah bagaimana mereka bisa meluncurkannya.

Dengan menggunakan manifes aplikasi web, aplikasi web Anda bisa:

* Memiliki kehadiran yang kaya di layar beranda Android pengguna
* Diluncurkan dalam mode layar penuh pada Android tanpa bilah URL
* Mengontrol orientasi layar untuk tampilan optimal
* Menetapkan "layar pembuka" pengalaman peluncuran dan warna tema untuk situs
* Melacak apakah diluncurkan dari layar beranda atau bilah URL

Membuat file bernama `manifest.json` di folder `work` Anda dan salin/tempel materi berikut:

```
{
  "name": "Weather",
  "short_name": "Weather",
  "icons": [{
    "src": "images/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png"
    }, {
      "src": "images/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    }, {
      "src": "images/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png"
    }, {
      "src": "images/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    }, {
      "src": "images/icons/icon-256x256.png",
      "sizes": "256x256",
      "type": "image/png"
    }],
  "start_url": "/index.html",
  "display": "standalone",
  "background_color": "#3E4EB8",
  "theme_color": "#2F3BA2"
}
```

Manifes mendukung berbagai ikon, ditujukan untuk ukuran layar yang berbeda. Pada saat penulisan ini, Chrome dan Opera Mobile, adalah satu-satunya browser yang mendukung manifes aplikasi web, tidak akan menggunakan apa pun yang lebih kecil dari 192 px.

Cara termudah untuk melacak bagaimana aplikasi diluncurkan adalah menambahkan string kueri ke parameter `start_url` dan kemudian menggunakan suite analytics untuk melacak string kueri. Jika Anda menggunakan metode ini, ingat untuk memperbarui daftar file yang di-cache dengan Shell Aplikasi untuk memastikan bahwa file dengan string kueri telah di-cache.

#### Memberi tahu browser tentang file manifes Anda

Sekarang tambahkan baris berikut ke bagian bawah elemen `<head>` dalam file `index.html` Anda: 

```
<link rel="manifest" href="/manifest.json">
```

#### Praktik Terbaik

* Tempatkan tautan manifes pada semua laman situs Anda, sehingga akan diambil oleh Chrome ketika pengguna melakukan kunjungan pertama, tidak peduli laman apa pun yang mereka kunjungi.
* `short_name` lebih disukai pada Chrome dan akan digunakan jika ada di atas bidang nama.
* Menetapkan set ikon untuk layar dengan kepadatan yang berbeda. Chrome akan mencoba menggunakan ikon yang paling mendekati 48 dp, misalnya, 96 px pada perangkat 2x atau 144 px untuk perangkat 3x.
* Ingatlah untuk memuat ikon dengan ukuran yang masuk akal untuk layar pembuka dan jangan lupa menyetel `background_color`.

Bacaan Lebih Lanjut:

[Menggunakan spanduk pemasangan aplikasi](/web/fundamentals/engage-and-retain/simplified-app-installs/)

### Elemen Add to Homescreen untuk Safari pada iOS

Dalam `index.html` Anda, tambahkan baris berikut ke bagian bawah elemen `<head>`:

```
  <!-- Add to home screen for Safari on iOS -->
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <meta name="apple-mobile-web-app-title" content="Weather PWA">
  <link rel="apple-touch-icon" href="images/icons/icon-152x152.png">
```

### Ikon Petak untuk Windows

Dalam `index.html` Anda, tambahkan baris berikut ke bagian bawah elemen `<head>`:

```
  <meta name="msapplication-TileImage" content="images/icons/icon-144x144.png">
  <meta name="msapplication-TileColor" content="#2F3BA2">
```

### Lakukan pengujian

Pada bagian ini kami akan menunjukkan beberapa cara untuk menguji manifes aplikasi web Anda.

Cara pertama adalah dengan DevTools. Buka panel __Manifest __pada panel __Application __. Jika Anda menambahkan informasi manifes dengan benar, Anda akan melihatnya di-parse dan ditampilkan dalam format yang mudah dipahami di panel ini.

Anda juga bisa menguji fitur add to homescreen dari panel ini. Klik tombol __Add to homescreen __. Anda akan melihat pesan "add this site to your shelf" di bawah bilah URL, seperti pada tangkapan layar di bawah ini.

![cbfdd0302b611ab0.png](img/cbfdd0302b611ab0.png)

Ini adalah fitur desktop yang serupa dengan add to homescreen pada seluler. Jika berhasil memicu peringatan ini pada desktop, maka Anda bisa memastikan bahwa pengguna seluler menambahkan aplikasi ke perangkat mereka.

Cara kedua adalah dengan mengujinya melalui Web Server for Chrome. Dengan pendekatan ini, Anda mengekspos server development lokal (pada desktop atau laptop) ke komputer lain, dan kemudian hanya mengakses progressive web app dari perangkat seluler yang sesungguhnya.

Pada dialog konfigurasi Web Server for Chrome, pilih opsi `Accessible on local network`:

![81347b12f83e4291.png](img/81347b12f83e4291.png)

Alihkan Web Server ke `STOPPED` dan kembali ke `STARTED`. Anda akan melihat URL baru yang bisa digunakan untuk mengakses aplikasi dari jarak jauh.

Sekarang, akses situs Anda dari perangkat seluler, menggunakan URL yang baru.

Anda akan melihat kesalahan service worker di konsol saat menguji dengan cara ini karena service worker tidak disajikan melalui HTTPS.

Menggunakan Chrome dari perangkat Android, coba tambahkan aplikasi ke layar beranda dan verifikasi bahwa layar peluncuran muncul dengan benar dan menggunakan ikon yang tepat.

Pada Safari dan Internet Explorer, Anda juga bisa secara manual menambahkan aplikasi ke layar beranda.

[Tautan](https://weather-pwa-sample.firebaseapp.com/step-08/)


## Menerapkan dalam host yang aman dan rayakan




Langkah terakhir adalah menerapkan aplikasi cuaca dalam server yang mendukung HTTPS. Jika Anda belum memilikinya, pendekatan yang sangat mudah (dan gratis) adalah menggunakan hosting materi statis dari Firebase. Sangat mudah digunakan, menyajikanmateri melalui HTTPS dan didukung oleh CDN global.

### Kredit tambahan: mengecilkan dan menyisipkan CSS

Ada satu hal lagi yang harus Anda pertimbangkan, mengecilkan penataan gaya kunci dan menyisipkannya langsung ke dalam `index.html`. [Page Speed Insights](/speed) merekomendasikan penyajian materi paro atas di permintaan 15.000 byte yang pertama.

Lihat seberapa kecil Anda bisa mendapatkan permintaan awal dengan segala sesuatu disisipkan.

Bacaan Lebih Lanjut: [PageSpeed Insight Rules](/speed/docs/insights/rules)

### Menerapkan ke Firebase

Jika Anda baru dalam dunia Firebase, Anda harus membuat akun dan memasang beberapa alat terlebih dahulu.

1. Buat akun Firebase di [https://firebase.google.com/console/](https://firebase.google.com/console/)
2. Pasang alat Firebase melalui npm: `npm install -g firebase-tools`

Setelah akun dibuat dan Anda telah masuk, Anda siap untuk menerapkan!

1. Buat aplikasi baru di [https://firebase.google.com/console/](https://firebase.google.com/console/)
2. Jika Anda belum masuk ke alat Firebase, perbarui kredensial Anda: `firebase login`
3. Inisialisasi aplikasi Anda, serta berikan direktori (kemungkinan besar `work`) tempat aplikasi berada setelah selesai: `firebase init`
4. Yang terakhir, terapkan aplikasi ke Firebase: `firebase deploy`
5. Rayakan. Selesai! Aplikasi Anda akan diterapkan ke domain: `https://YOUR-FIREBASE-APP.firebaseapp.com`

Bacaan lebih lanjut: [Panduan Hosting Firebase](https://www.firebase.com/docs/hosting/guide/)

### Lakukan pengujian

* Coba tambahkan aplikasi ke layar beranda Anda, kemudian putuskan jaringan dan lakukan verifikasi apakah aplikasi bekerja secara offline seperti yang diharapkan.

[Tautan](https://weather-pwa-sample.firebaseapp.com/final/)





## Menemukan masalah, atau memiliki masukan? {: .hide-from-toc }
Bantu kami menjadikan code lab lebih baik dengan mengirimkan 
[masalah](https://github.com/googlecodelabs/your-first-pwapp/issues) hari ini. Dan terima kasih!


{# wf_devsite_translation #}
