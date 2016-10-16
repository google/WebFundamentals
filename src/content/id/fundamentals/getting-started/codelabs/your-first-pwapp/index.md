project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Dalam codelab ini, Anda akan membangun sebuah Aplikasi Web Progresif (Progressive Web App), yang bisa dimuat dengan cepat, meskipun pada jaringan yang terputus-putus, memiliki ikon di halaman utama, dan termuat sebagai aplikasi layar penuh.

{# wf_updated_on: 2016-10-10T14:59:33Z #}
{# wf_published_on: 2016-01-01 #}


# Progressive Web App Anda yang Pertama {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}



## Pengenalan




[Progressive Web Apps](/web/progressive-web-apps) memberikan pengalaman terbaik
dari penggabungan teknologi web dan aplikasi. Teknologi ini memungkinkan
pengguna untuk bisa segera menggunakan aplikasi, seketika sejak saat kunjungan
pertama, tanpa perlu melakukan instalasi apa pun. Seiring dengan semakin
seringnya pengguna menggunakan aplikasi, kemampuan aplikasi akan menjadi
semakin efektif. Aplikasi termuat dengan cepat, bahkan pada jaringan yang 
terputus-putus, juga bisa mengirimkan *push notification* yang relevan, 
memiliki ikon pada layar utama dan memuat halaman layar penuh dengan level 
kenyamanan tertinggi.

### Apakah Progressive Web App itu?

Progressive Web App memiliki sifat:

* __Progressive__ - Berfungsi dengan baik untuk berbagai macam ragam pengguna,
terlepas dari pilihan browser karena aplikasi ini dibangun dengan perbaikan
secara bertahap sebagai prinsip utamanya.
* __Responsive__ - Cocok dengan berbagai macam perangkat: desktop, seluler,
tablet, atau apa pun berikutnya.
* __Connectivity independent__ - Disempurnakan dengan *service worker* agar
berfungsi secara offline pada jaringan berkualitas rendah.
* __App-like__ - Serasa benar-benar seperti aplikasi bagi pengguna dengan
interaksi app-style berkat penerapan model app shell.
* __Fresh__ - Selalu up-to-date, berkat proses pembaruan yang disediakan oleh
*service worker*.
* __Safe__ - Dilayani melalui HTTPS untuk mencegah pengintaian dan memastikan
konten tidak dirusak oleh peretas.
* __Discoverable__ - Bisa diidentifikasi sebagai "aplikasi" berkat manifest
W3C dan pendaftaran service worker memungkinkan mesin pencari untuk menemukan
aplikasi ini.
* __Re-engageable__ - Membuat pelanggan kembali berinteraksi melalui fitur
*push notification*.
* __Installable__ - Memungkinkan pengguna untuk "menyimpan" aplikasi yang
mereka anggap paling berguna di layar utama mereka tanpa harus melalui
kerumitan instalasi dari app store.
* __Linkable__ - Mudah berbagi melalui URL dan tidak memerlukan instalasi 
yang rumit.

Codelab ini akan memandu Anda untuk membuat sendiri Progressive Web App, 
termasuk memberikan pertimbangan desain, serta detail implementasinya untuk 
memastikan bahwa aplikasi Anda memenuhi prinsip-prinsip utama dari
Progressive Web App.

### Apa yang akan kita bangun?

### Apa yang akan Anda pelajari

* Bagaimana merancang dan membangun sebuah aplikasi dengan menggunakan metode
"app shell"
* Cara membuat aplikasi Anda berjalan offline
* Bagaimana cara menyimpan data untuk penggunaan offline pada penggunaan berikutnya

### Apa saja yang diperlukan?

* Chrome 52 atau lebih tinggi
*  [Web Server for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb), atau web server pilihan Anda sendiri
* Contoh kode
* Editor teks
* Pengetahuan dasar tentang HTML, CSS, JavaScript, dan Chrome DevTools

Codelab ini fokus pada Progressive Web Apps. Konsep dan blok kode yang tidak
relevan akan diabaikan dan disediakan untuk Anda agar bisa disalin dan tempel
(copy-paste) dengan mudah.


## Mulai Setup




### Unduh Kode

Klik tombol di bawah ini untuk mengunduh semua kode yang diperlukan untuk 
memulai codelab ini:

[](https://github.com/googlecodelabs/your-first-pwapp/archive/master.zip)

Ekstrak file zip yang diunduh ke folder (`your-first-pwapp-master`), yang 
berisi satu folder untuk setiap tahap di codelab ini, bersama dengan semua
resource lain yang akan Anda perlukan.

Folder `step-NN` berisi kondisi akhir yang diharapkan dari setiap tahap 
codelab ini. File-file ini berada di sana sebagai referensi. Kita akan 
melakukan semua pekerjaan koding di direktori `work`.

### Install dan pastikan web server bekerja

Meski pun Anda bebas untuk menggunakan web server Anda sendiri, codelab ini 
didesain menggunakan Chrome Web Server. Jika Anda belum menginstall aplikasi 
tersebut, Anda bisa menginstallnya dari Chrome Web Store. 

[](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb?hl=en)

Setelah menginstall Web Server di Chrome, klik shortcut Apps di kotak bookmark: 

![9efdf0d1258b78e4.png](img/9efdf0d1258b78e4.png)

Di layar berikutnya, klik di icon Web Server: 

![dc07bbc9fcfe7c5b.png](img/dc07bbc9fcfe7c5b.png)

Anda akan melihat dialog berikut, yang memungkinkan Anda untuk 
mengkonfigurasikan web server lokal Anda:

![433870360ad308d4.png](img/433870360ad308d4.png)

Klik tombol __choose folder__, dan pilih folder `work`. Langkah ini
membuat pekerjaan in-progress Anda akan dilayani dari URL yang disorot
di dialog web server (di bagian __Web Server URL(s)__).

Di bawah Options, klik checkbox "Automatically show index.html", seperti di 
bawah ini:

![39b4e0371e9703e6.png](img/39b4e0371e9703e6.png)

Kemudian hentikan dan jalankan ulang server dengan cara menggeser toggle yang
berlabel: "Web Server: STARTED" ke kiri, kemudian geser kembali ke kanan.

![daefd30e8a290df5.png](img/daefd30e8a290df5.png)

Sekarang, kunjungi situs kerja Anda di browser (dengan cara klik pada 
URL Web Server yang tersorot) dan Anda akan melihat sebuah halaman yang 
terlihat seperti di bawah ini: 

![aa64e93e8151b642.png](img/aa64e93e8151b642.png)

Sejauh ini, aplikasi ini masih belum melakukan sesuatu yang menarik, aplikasi 
kita hanya berisi kerangka minimal dengan spinner yang kita gunakan untuk 
memverifikasi bahwa web server sudah bisa digunakan. Kita akan menambahkan 
beberapa fungsi dan fitur UI pada langkah-langkah berikutnya.


## Merancang App Shell Anda




### Apa itu app shell?

App Shell, adalah kombinasi HTML, CSS, dan JavaScript paling minimum yang 
diperlukan untuk menampilkan antarmuka pengguna sebuah Progressive Web App 
dan merupakan salah satu komponen yang menjamin kinerja yang bisa diandalkan. 
Pemuatan pertama harus sangat cepat, dan harus segera di-cache-kan. 
"Cached" berarti bahwa file shell dimuat sekali saja melalui jaringan dan 
kemudian disimpan di perangkat secara lokal.
Berikutnya, setiap kali pengguna membuka aplikasi, file shell dimuat dari 
cache, sehingga menghasilkan pemuatan konten yang super cepat.
Ini berarti bahwa app shell tidak perlu dimuat setiap kali, bahkan hanya perlu 
mendapatkan konten yang diperlukan saja.

Arsitektur App Shell memisahkan infrastruktur aplikasi inti dan antar muka dari 
data. Semua antar muka dan infrastruktur di-cache-kan secara lokal menggunakan 
service worker sehingga pada pemuatan berikutnya, Progressive Web App hanya 
perlu mengambil data yang diperlukan saja, tanpa harus memuat ulang semuanya.

![156b5e3cc8373d55.png](img/156b5e3cc8373d55.png)

Dengan kata lain, app shell mirip dengan buntalan kode yang akan Anda 
publikasikan ke app store pada saat mempublikasikan aplikasi native. 
App shell adalah komponen inti yang diperlukan agar aplikasi Anda bisa hidup,
meskipun belum berisi data.

### Mengapa menggunakan arsitektur app shell?

Menggunakan arsitektur app shell memungkinkan Anda memusatkan perhatian pada 
kecepatan, memberikan Progressive Web App fitur yang serupa dengan aplikasi 
native, yaitu: pemuatan instan dan update berkala, tanpa perlu proses publikasi 
ke app store.

### Mendesain App Shell 

Langkah pertamanya adalah: membagi-bagi desain sampai ke komponen inti. 

Tanya diri Anda:

* Apa yang harus tampil di layar secepatnya? 
* Apa saja komponen antar muka lain yang menjadi kunci jalannya aplikasi? 
* Apa saja sumber daya dukungan yang dibutuhkan untuk app shell? Contoh: 
gambar, JavaScript, CSS, dll.

Kita akan membuat Aplikasi Cuaca sebagai aplikasi Progressive Web App pertama kita. 
Komponen utamanya terdiri dari:

Ketika merancang sebuah aplikasi yang lebih kompleks, konten yang tidak 
diperlukan untuk pemuatan awal bisa dimuat belakangan dan disimpan di cache 
terlebih dahulu untuk penggunaan berikutnya. Sebagai contoh, kita bisa menunda 
pemuatan dialog Tambah Kota sampai kita selesai menampilkan halaman awal, 
kemudian mencari waktu yang tepat saat aplikasi sedang tidak memproses tampilan 
(saat CPU menganggur) untuk memuat sisa resource yang akan ditampilakan nanti.


## Implementasikan App Shell Anda 





Ada beberapa cara untuk memulai proyek, dan kami menganjurkan untuk menggunakan 
Web Starter Kit. Namun, untuk saat ini, proyek ini dibuat sesederhana mungkin 
sehingga Anda bisa berkonsentrasi pada pembuatan Progressive Web Apps.
Oleh karena itu, kami menyediakan semua sumber daya yang Anda butuhkan untuk 
memulai.

### Buat HTML untuk App Shell

Sekarang, kita akan menambahkan komponen inti yang kita diskusikan di 
[Merancang App Shell](/web/fundamentals/getting-started/your-first-progressive-web-app/step-01).

Ingat, komponen pentingnya terdiri dari:

* Header dengan judul, dan tombol tambah/pembaruan
* Kontainer untuk kartu Prakiraan
* Sebuah template kartu Prakiraan
* Sebuah dialog untuk menambahkan kota baru
* Sebuah indikator pemuatan

File `index.html` yang berada di folder `work` Anda harus tampak seperti 
berikut (ini adalah sebagian dari konten sebenarnya, jangan salin kode ini ke 
dalam file Anda):

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

Perhatikan bahwa loader terlihat secara default. Hal ini bertujuan untuk 
memastikan bahwa pengguna melihat loader segera pada saat halaman ini dimuat, 
sehingga memberi mereka indikasi yang jelas bahwa konten tersebut sedang 
dimuat.

Untuk menghemat waktu, kami telah membuat stylesheet untuk Anda gunakan.

### Perhatikan kode JavaScript penting berikut

Sekarang, karena kita memiliki sebagian besar antar muka yang sudah siap, 
saatnya untuk memulai mengaitkan kode agar semuanya tersambung. 
Seperti bagian dari app shell lainnya, perhatikan apa saja kode yang diperlukan 
untuk tampilan utama dan apa saja kode yang bisa ditunda untuk dibuka pada 
saatnya nanti.

Direktori kerja Anda telah berisi kode aplikasi (`scripts/app.js`), di dalamnya Anda akan menemukan:

* Sebuah objek `app` yang berisi beberapa informasi utama yang diperlukan aplikasi.
* Event listener untuk semua tombol di header (`add/refresh`) dan pada dialog 
Tambah Kota (`add/cancel`).
* Sebuah method untuk menambah atau memperbarui kartu Prakiraan Cuaca 
(`app.updateForecastCard`).
* Sebuah method untuk mendapatkan data Perkiraan Cuaca terbaru dari 
Firebase Public Weather API (`app.getForecast`).
* Sebuah method untuk meng-iterasi kartu dan memanggil `app.getForecast` untuk 
mendapatkan data Prakiraan Cuaca (`app.updateForecasts`).
* Beberapa data palsu (`fakeForecast`) yang dapat digunakan untuk mempercepat 
pengujian tampilan.

### Pengujian

Sekarang, karena Anda telah menambahkan HTML inti, style dan JavaScript, 
saatnya untuk menguji aplikasi ini.

Untuk melihat bagaimana data cuaca palsu dirender, hilangkan tanda komentar 
pada baris berikut di bagian bawah file `index.html` Anda:

    <!--<script src="scripts/app.js" async></script>-->

Berikutnya, hilangkan tanda komentar pada baris berikut di bagian bawah file `app.js`:

    // app.updateForecastCard(initialWeatherForecast);

Muat ulang aplikasi Anda. Hasilnya harus tampil dengan baik (meskipun dengan 
data palsu, seperti yang Anda perhatikan pada data tanggalnya) kartu prakiraan
cuaca dengan spinner dinonaktifkan, seperti berikut:

![166c3b4982e4a0ad.png](img/166c3b4982e4a0ad.png)

[](https://weather-pwa-sample.firebaseapp.com/step-04/)

Setelah Anda mencoba dan memverifikasi bahwa aplikasi bisa bekerja seperti yang
diharapkan, Anda bisa menghapus panggilan ke `app.updateForecastCard`. 
Kita hanya perlu memastikan bahwa semuanya bekerja seperti yang diharapkan.


## Memulai dengan pemuatan pertama yang cepat



Progressive Web Apps harus dimuat dengan cepat dan dapat digunakan seketika. 
Pada saat ini, Aplikasi Cuaca telah bisa dimuat dengan cepat, akan tapi masih 
belum bisa digunakan, karena belum ada data. Kita bisa membuat permintaan AJAX 
untuk mendapatkan data, tapi hal ini akan mengakibatkan permintaan tambahan 
yang menjadikan pemuatan awal menjadi lebih lama. Oleh karena itu, berikan data 
sebenarnya pada pemuatan berikutnya.

### Suntikkan data Perkiraan Cuaca

Untuk Code Lab berikut, kita akan menyuntikkan data ramalan cuaca secara 
statis, namun dalam aplikasi aslinya, data Prakiraan Cuaca terbaru akan 
disuntikkan oleh server berdasarkan geolokasi alamat IP pengguna.

Kode sudah berisi data yang akan kita suntikkan. Yaitu `initialWeatherForecast` 
yang kita gunakan pada langkah sebelumnya.

### Membuat perbedaan saat aplikasi pertama kali dijalankan

Namun, bagaimana kita bisa mengetahui kapan waktu yang tepat untuk menampilkan 
informasi ini, yang bisa saja tidak relevan pada pemuatan berikutnya ketika 
aplikasi cuaca ditarik dari cache? Ketika pengguna memuat aplikasi pada 
kunjungan berikutnya, mereka mungkin telah berpindah kota, sehingga kita perlu 
memuat nama-nama kota tersebut, tidak selalu kota pertama yang sekarang 
mereka lihat.

Preferensi pengguna seperti daftar kota yang sering disinggahi pengguna harus 
disimpan secara lokal menggunakan IndexedDB atau mekanisme penyimpanan lokal 
lainnya. Untuk menyederhanakan contoh ini semaksimal mungkin, kami menggunakan 
`localStorage` yang tidak ideal untuk aplikasi sebenarnya, karena pada saat 
penulisan data menerapkan mekanisme penyimpanan synchronous, menghalangi proses 
lain, sehingga bisa berpotensi sangat lambat pada beberapa perangkat.

Pertama, mari kita menambahkan kode untuk menyimpan preferensi pengguna dalam 
`app.js`. Temukan komentar TODO di bawah ini di kode Anda.

```
  // TODO add saveSelectedCities function here
```

Dan tambahkan kode berikut di bawah komentar: 

```
  // Save list of cities to localStorage.
  app.saveSelectedCities = function() {
    var selectedCities = JSON.stringify(app.selectedCities);
    localStorage.selectedCities = selectedCities;
  };
```

Selanjutnya, mari kita menambahkan kode untuk memeriksa apakah pengguna 
berlangganan ke suatu kota dan menampilkannya, atau gunakan data yang 
disuntikkan. Temukan komentar TODO berikut:

```
  // TODO add startup code here
```

Dan tambahkan kode berikut di bawah komentar: 

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

Kode startup memeriksa apakah ada kota yang disimpan dalam penyimpanan lokal. 
Jika ada, maka kode akan mem-parsing data penyimpanan lokal dan kemudian 
menampilkan kartu prakiraan cuaca terhadap semua kota yang disimpan. 
Selain itu, kode startup hanya menggunakan perkiraan data palsu dan 
menyimpannya sebagai kota default.

### Simpan kota-kota yang dipilih

Akhirnya, Anda perlu mengubah handler tombol "add city" untuk menyimpan kota 
yang dipilih ke dalam penyimpanan lokal.

Update kode handler klik `butAddCity` agar sama dengan kode di bawah ini:

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

Penambahan barunya adalah inisialisasi `app.selectedCities` bila belum ada, 
dan pemanggilan ke `app.selectedCities.push()` dan `app.saveSelectedCities()`.

### Pengujian

* Saat pertama kali dijalankan, aplikasi Anda harus segera menampilkan 
Prakiraan Cuaca dari `InitialWeatherForecast`. 
* Tambahkan satu kota baru dan pastikan bahwa aplikasi menampilkan dua kartu.
* Refresh browser dan periksa bahwa aplikasi tetap menampilkan informasi 
terbaru dari dua kota yang dipilih.

[](https://weather-pwa-sample.firebaseapp.com/step-05/)


## Gunakan service worker untuk melakukan pre-cache terhadap App Shell




Progresif Web Apps harus cepat, dan bisa diinstall, bekerja pada saat online, 
offline, koneksi terputus-putus, dan juga pada saat mendapatkan koneksi yang 
sangat lambat. Untuk mencapainya, kita perlu menerapkan mekanisme cache 
terhadap app shell kita menggunakan service worker sehingga semua sumber daya 
yang diperlukan selalu tersedia dengan cepat dan bisa diandalkan.

Jika Anda belum terbiasa dengan service worker, Anda bisa memperoleh dasar 
pemahaman dengan membaca 
[Pengenalan Service Worker](/web/fundamentals/primers/service-worker/) tentang 
apa yang bisa mereka lakukan, siklus hidup, dan lainnya. Setelah Anda 
menyelesaikan codelab ini, pastikan untuk mempelajari codelab 
[Mendebug Service Worker](http://goo.gl/jhXCBy) untuk mendapatkan pemahaman 
lebih dalam tentang bagaimana bekerja dengan service worker. 

Fitur yang disediakan melalui service workder bisa dianggap sebagai 
penyempurnaan secara progresif, dan hanya ditambahkan saat didukung oleh 
browser. Misalnya, dengan service worker Anda bisa menyimpan app shell dan 
data untuk aplikasi Anda, sehingga file-file tersebut tersedia bahkan pada 
saat jaringan terputus-putus. Ketika service worker tidak didukung, kode 
offline tidak dipanggil, dan pengguna mendapatkan pengalaman seperti biasa. 
Penggunaan fitur pendeteksi untuk memberikan penyempurnaan secara progresif 
memiliki sedikit overhead dan dijamin tidak akan mengakibatkan kerusakan di 
browser lama yang tidak mendukung fitur itu.

### Daftarkan service worker jika memungkinkan

Langkah pertama untuk membuat aplikasi offline bekerja adalah dengan 
mendaftarkan service worker, script yang memungkinkan sebuah fungsi bekerja 
di belakang layar tanpa pengguna membuka halaman web.

Implementasinya memerlukan dua langkah sederhana:

1. Buat sebuah file JavaScript yang akan menjadi service worker
2. Kita minta pada browser untuk mendaftarkan file JavaScript sebagai 
service worker.

Pertama, kita perlu memeriksa apakah browser mendukung service worker, 
dan jika didukung, daftarkan service worker. Tambahkan kode berikut ke `app.js` 
(setelah komentar `// TODO add service worker code here`):

```
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }
```

### Memasukkan aset-aset situs ke dalam cache

Ketika service worker telah terdaftar, sebuah event `install` akan terpicu 
saat pertama kalinya pengguna mengunjungi halaman. Dalam event ini, kita akan 
meng-cache-kan semua aset yang dibutuhkan oleh aplikasi.

Ketika service worker diaktifkan, dia harus membuka objek dalam 
[caches](https://developer.mozilla.org/en-US/docs/Web/API/Cache) dan mengisinya 
dengan aset yang diperlukan untuk memuat App Shell. 
Buat file bernama `service-worker.js` di folder root aplikasi Anda 
(direktori `your-first-pwapp-master/work`). File ini harus hidup di root 
aplikasi karena ruang lingkup service worker didefinisikan oleh direktori di 
mana file berada. Tambahkan kode ini ke file `service-worker.js` baru Anda:

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

Pertama, kita perlu membuka cache dengan `cache.open()` dan memberi cache kita 
sebuah nama. Memberikan nama cache memungkinkan kita untuk membuat beberapa 
versi cache, atau memisahkan data dari App Shell sehingga kita dapat dengan 
mudah memperbarui satu file dengan tidak mempengaruhi file lainnya. 

Setelah cache terbuka, kita kemudian dapat memanggil `cache.addAll()`, dengan 
mengambil daftar URL, kemudian mengambil mereka dari server dan menambahkannya
ke dalam cache. Perlu diperhatikan bahwa fungsi `cache.addAll()` ini atomik, 
jika salah satu file gagal, keseluruhan langkah untuk memasukkan ke dalam cache 
akan gagal!

Baiklah, mari kita mulai belajar menggunakan DevTools untuk memahami dan 
mendebug service worker. Sebelum memuat ulang halaman Anda, buka DevTools, 
buka panel  __Service Worker__ di panel __Application__. Seharusnya 
terlihat seperti ini.

![ed4633f91ec1389f.png](img/ed4633f91ec1389f.png)

Bila Anda melihat halaman kosong seperti ini, itu berarti bahwa halaman yang 
sedang terbuka belum memiliki service worker yang terdaftar.

Sekarang, muat ulang halaman Anda. Panel Service Worker sekarang harus tampil 
seperti di bawah ini.

![bf15c2f18d7f945c.png](img/bf15c2f18d7f945c.png)

Ketika Anda melihat informasi seperti ini, itu berarti halaman telah memiliki 
service worker yang sudah berjalan.

OK, sekarang kita akan mengambil jalan singkat memutar dan menunjukkan beberapa 
kejutan yang mungkin Anda hadapi ketika mengembangkan service worker. Untuk 
menunjukkan, mari kita menambahkan event listener `activate` di bawah event 
listener `install` di file `serve-worker.js` Anda.

```
self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
});
```

Event `activate` dipicu pada saat service worker dimulai. 

Bukalah konsol DevTools dan muat ulang halaman tersebut, kemudian beralih ke 
panel Service Worker di panel Application dan klik inspect pada service worker 
yang diaktifkan. Anda berharap untuk melihat pesan `[ServiceWorker] Activate` 
dituliskan ke konsol, tapi itu tidak terjadi. Periksa panel Service Worker Anda 
dan Anda dapat melihat bahwa service workder baru (yang telah berisi event 
listener activate) tampak berada dalam keadaan "waiting".

![1f454b6807700695.png](img/1f454b6807700695.png)

Pada dasarnya, service worker yang lama masih terus mengontrol halaman selama 
ada tab yang terbuka di halaman. Jadi, Anda *bisa* menutup dan membuka kembali 
halaman atau tekan tombol __skipWaiting__, namun solusi jangka panjangnya 
adalah cukup dengan mengaktifkan checkbox __Update on Reload__ pada panel 
Service Worker dari DevTools. Ketika checkbox ini diaktifkan, service worker 
dipaksa untuk diperbarui setiap kali halaman dimuat ulang.

Aktifkan checkbox __update on reload__ sekarang dan muat ulang halaman tersebut 
untuk mengkonfirmasi bahwa service worker baru diaktifkan.

__Catatan:__ Anda mungkin melihat kesalahan dalam panel Service Worker dari 
panel Application mirip dengan yang di bawah, kesalahan ini bisa diabaikan 
secara __aman__. 

![b1728ef310c444f5.png](img/b1728ef310c444f5.png)

Itulah semua yang bisa dijelaskan mengenai pemeriksaan dan men-debug service 
worker di DevTools. Kami akan menunjukkan beberapa trik lagi nanti. Mari kita 
kembali ke membangun aplikasi Anda.

Mari kita perluas event listener `activate` untuk memuat beberapa logika untuk 
memperbarui cache. Perbarui kode Anda agar sama dengan kode di bawah ini.

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

Kode ini memastikan bahwa service worker Anda memperbarui cache setiap kali 
ada file app shell yang berubah. Agar bisa bekerja, Anda perlu menaikkan 
versi variable `cacheName` di bagian atas file service worker Anda.

Statement terakhir memperbaiki corner-case yang dapat Anda baca di bagian 
kotak informasi (opsional) di bawah.

Akhirnya, mari kita perbarui daftar file yang dibutuhkan untuk app shell. Di 
dalam array, kita perlu menyertakan semua file yang dibutuhkan aplikasi Anda, 
termasuk gambar, JavaScript, stylesheet, dll. Dekat bagian atas file 
`service-worker.js` Anda, gantikan `var filesToCache = [];` dengan kode di bawah ini:

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

Aplikasi kita belum bisa bekerja secara offline. Kita telah meng-cache-kan 
komponen-komponen app shell, tapi kita masih perlu memuat mereka dari cache 
lokal.

### Menyajikan app shell dari cache

Service worker memberikan kemampuan untuk menyadap request yang dibuat oleh 
Progressive Web App kita dan menangani mereka di dalam kode service worker. 
Kita bisa menentukan bagaimana menangani request ini dan mungkin sekali 
melayani response dari cache kita sendiri.

Sebagai contoh:

```
self.addEventListener('fetch', function(event) {
  // Do something interesting with the fetch here
});
```

Sekarang, mari kita layani app shell dari cache. Tambahkan kode berikut ke 
file `service-worker.js`:

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

Setelah mempelajari langkah-langkah di atas, kita mengetahui bahwa 
`caches.match()` akan mengevaluasi request web dan memicu event 
[fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), 
dan memeriksa untuk melihat apakah file yang diminta tersedia dalam cache. 
Kemudian merespon dengan versi dalam cache, atau menggunakan `fetch` untuk 
mendapatkan salinannya dari jaringan. `response` dikirimkan kembali ke halaman 
web dengan `e.respondWith()`.

### Pengujian

Aplikasi Anda sekarang bisa offline! Mari kita coba.

Muat ulang halaman Anda dan kemudian buka panel __Cache Storage__ pada panel 
__Application__ dari DevTools. Expand bagian ini dan Anda akan melihat nama 
dari app shell cache Anda tercantum di sisi kiri. Bila Anda klik pada 
app shell cache Anda, Anda dapat melihat semua resource yang saat ini telah 
dimasukkan ke dalam cache.

![ab9c361527825fac.png](img/ab9c361527825fac.png)

Sekarang, mari kita uji mode offline aplikasi kita. Kembali ke panel 
__Service Worker__ di  DevTools dan aktifkan checkbox __Offline__. 
Setelah mencentangnya, Anda akan melihat ikon peringatan kecil berwarna kuning 
di sebelah tab panel __Network__. Hal ini menunjukkan bahwa Anda sedang 
offline.

![7656372ff6c6a0f7.png](img/7656372ff6c6a0f7.png)

Muat ulang halaman Anda dan ... Berhasil! agaknya, paling tidak. Perhatikan 
bagaimana dia memuat data inisial (palsu) cuaca.

![8a959b48e233bc93.png](img/8a959b48e233bc93.png)

Periksa cabang `else` di `app.getForecast()` untuk memahami mengapa aplikasi 
ini mampu memuat data palsu.

Langkah berikutnya adalah memodifikasi aplikasi dan logika service worker 
untuk dapat meng-cache-kan data cuaca, dan mengembalikan data terbaru dari 
cache ketika aplikasi offline.

__Tip:__ Untuk memulai dengan data yang bersih dengan menghapus semua data 
yang tersimpan (localStorage, IndexedDB, file-file yang ada di cache) dan 
menghapus service worker yang ada, gunakan panel Clear storage di tab 
Application.

[](https://weather-pwa-sample.firebaseapp.com/step-06/)

### Waspadalah terhadap ujung kasus

Seperti disebutkan sebelumnya, kode ini __tidak boleh digunakan dalam aplikasi 
produksi__ karena banyaknya kasus yang belum tertangani.

#### Cache tergantung pada pemutakhiran kunci cache setiap kali ada perubahan

Sebagai contoh, metode cache ini menuntut Anda untuk memperbarui kunci cache 
setiap kali ada konten yang berubah, jika tidak, cache tidak akan kadaluarsa, 
dan konten lama yang akan disajikan. Jadi pastikan untuk mengubah kunci cache 
setiap kali ada perubahan selama Anda mengerjakan proyek Anda!

#### Menuntut semuanya di-download ulang setiap kali ada perubahan

Kelemahan lainnya adalah bahwa seluruh cache secara keseluruhan menjadi tidak 
valid dan perlu didownload ulang setiap kali ada perubahan file. Itu berarti 
memperbaiki satu kesalahan sederhana (ejaan satu karakter) akan membatalkan 
validitas cache dan membuat semua resource diunduh ulang. Sangat tidak efisien.

#### Cache browser dapat mencegah cache service worker dari pemutakhiran

Ada peringatan penting lainnya di sini. Request HTTPS haruslah dilakukan pada 
saat install handler masuk ke jaringan dan tidak mengembalikan response dari 
cache browser. Jika tidak, browser dapat mengembalikan cache versi sebelumnya, 
sehingga mengakibatkan cache service worker tidak pernah benar-benar terupdate!

#### Waspadalah terhadap strategi cache-first dalam produksi

aplikasi kita menggunakan strategi cache-first, yang mengembalikan salinan dari 
setiap konten cache tanpa melakukan permintaan melalui jaringan. Meskipun 
strategi cache-first ini mudah diimplementasikan, dia dapat menyebabkan 
kesulitan di kemudian hari. Pada saat salinan dari halaman awal dan script 
service worker di-cache-kan, sangatlah sulit untuk mengubah konfigurasi 
service worker (karena konfigurasi tersebut tergantung pada tempat dia 
didefinisikan), dan Anda bisa menemukan diri Anda men-deploy situs yang sangat 
sulit untuk diperbarui!

#### Bagaimana cara menghindari kasus ini?

Jadi bagaimana kita menghindari kasus ini? Gunakan library seperti 
[sw-precache](https://github.com/GoogleChrome/sw-precache), yang bisa 
menyediakan kontrol terhadap file-file yang akan habis masa berlakunya, 
memastikan agar request langsung masuk ke jaringan dan melakukan semua 
pekerjaan ini untuk Anda.

### Kiat untuk menguji service worker secara langsung

Men-debug service worker bisa menjadi sebuah tantangan tersendiri, apalagi 
bila melibatkan cache, bisa menjadi mimpi buruk bila ternyata cache tidak 
diperbarui seperti yang Anda harapkan. Jangan menyerah. Terdapat beberapa 
alat yang bisa digunakan untuk membuat hidup Anda jadi lebih mudah.

#### Mulai dengan Bersih

Dalam beberapa kasus, Anda mungkin menemukan diri Anda memuat data cache atau hal-hal yang tidak diperbarui seperti yang Anda harapkan. Untuk menghapus semua data yang tersimpan (localStoarge, data yang IndexedDB, file di dalam cache) dan menghapus service worker, gunakan panel Clear storage di tab Application.

Beberapa tip lainnya:

* Pada saat service worker di-unregister, dia mungkin akan tetap terdaftar 
sampai semua window browser yang menjalankannya ditutup.
* Jika aplikasi ini terbuka di beberapa window, service worker yang baru belum 
akan diterapkan sampai semua window di-reload dan di-update dengan 
service worker terbaru.
* Melakukan unregister terhadap service worker tidak akan menghapus cache, 
sehingga ada kemungkinan Anda masih akan mendapatkan data yang lama jika nama 
cache belum diubah.
* Jika service worker versi sebelumnya sudah pernah ada dan ada service worker 
baru yang didaftarkan, service worker yang baru belum akan mengambil kendali 
hingga halaman dimuat ulang (di-reload), kecuali jika Anda mengambil 
[kontrol langsung](https://github.com/GoogleChrome/samples/tree/gh-pages/service-worker/immediate-control). 



## Gunakan Service Worker untuk Meng-Cache-kan Data Aplikasi


Memilih [strategi caching](https://jakearchibald.com/2014/offline-cookbook/) 
yang tepat untuk data Anda sangat penting dan tergantung pada jenis data 
aplikasi Anda sajikan. Misalnya, data yang sensitif-waktu seperti cuaca atau 
harga saham harus selalu ditampilkan yang terbaru, realtime, sedangkan gambar 
avatar atau konten artikel dapat diperbarui lebih jarang. 

Strategi [cache-first-then-network](https://jakearchibald.com/2014/offline-cookbook/#cache-network-race) 
cocok untuk aplikasi kita. Dengan strategi ini, kita bisa mendapat data di 
layar secepat mungkin, kemudian memperbaruinya setelah jaringan mengembalikan
data terbaru. Dibandingkan dengan network-first-then-cache, pengguna tidak 
harus menunggu sampai 
[fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) time-out 
untuk mendapatkan data dari cache. 

Dengan strategi cache-first-then-network, kita perlu melemparkan dua request 
secara asynchronous, satu ke cache dan satu ke jaringan. Request ke jaringan 
tidak perlu banyak berubah, tapi kita perlu memodifikasi service worker untuk 
menyimpan response ke cache sebelum mengembalikannya ke browser.

Dalam kondisi normal, data dari cache yang akan dikembalikan, hampir seketika 
menyediakan aplikasi dengan data terbaru yang bisa digunakan. Kemudian, ketika
request ke jaringan mendapatkan response, aplikasi akan diperbarui menggunakan 
data terbaru dari jaringan.

### Menangkap network request dan memasukkan response-nya ke dalam cache 

Kita perlu memodifikasi service worker untuk menangkap request ke API cuaca 
dan menyimpan response ke dalam cache, sehingga kita dapat mengaksesnya nanti. 
Di strategi cache-first-then-network, kami mengharapkan network response 
menjadi 'sumber kebenaran', yang selalu menyediakan informasi terbaru. Jika
tidak bisa, tidak apa-apa bila gagal karena kita sudah mendapatkan data cache 
terbaru di aplikasi kita.

Pada kode service worker kita, mari tambahkan `dataCacheName` sehingga kita 
bisa memisahkan data aplikasi kita dari app shell. Ketika app shell diperbarui 
dan cache yang lebih tua dihapus, data kita tetap tak tersentuh, dan siap untuk 
pemuatan super cepat pada pemuatan berikutnya. 
Perlu diingat, jika di kemudian hari format data Anda berubah, Anda perlu cara 
untuk mengatasinya dan menjamin app shell dan konten tetap berada pada keadaan 
tersinkronisasi.

Tambahkan baris berikut ke atas file `service-worker.js` Anda:  

```
var dataCacheName = 'weatherData-v1';
```
Selanjutnya, perbarui event handler `activate` agar tidak menghapus data cache 
ketika membersihkan app shell cache.

```
if (key !== cacheName && key !== dataCacheName) {
```

terakhir, update event handler `fetch` untuk menangani permintaan ke API data 
secara terpisah dari permintaan lainnya.

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

Kode ini melakukan penyadapan request dan memeriksa apakah URL dimulai dengan 
alamat dari API cuaca. Jika betul, kita akan menggunakan 
[fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) untuk 
membuat request. Setelah respon dikembalikan, kode kita membuka cache, 
meng-kloning response, menyimpannya ke dalam cache dan akhirnya mengembalikan 
response terhadap request aslinya. 

Aplikasi kita belum akan bekerja secara offline. Kita telah menerapkan 
mekanisme caching dan pengambilan untuk app shell, tapi meskipun kita telah 
memasukkan data ke dalam cache, aplikasi belum memeriksa cache untuk melihat 
apakah ia memiliki data cuaca.

### Membuat request

Seperti disebutkan sebelumnya, aplikasi kita perlu memulai dua request secara 
asynchronous, satu ke cache dan satu ke jaringan. Aplikasi ini menggunakan 
objek `caches` yang tersedia di `window` untuk mengakses cache dan mengambil 
data terbaru. Ini adalah contoh yang sangat baik dari peningkatan progresif 
karena objek `caches` mungkin tersedia tidak di semua browser, dan jika tidak 
tersedia, request ke jaringan harus tetap bekerja.

Untuk melakukan hal ini, kita perlu:

1. Memeriksa apakah objek `caches` tersedia di objek global `window`.
2. Request data dari cache.
* Jika request ke server masih belum mendapatkan balasan, perbarui aplikasi 
dengan data dari cache.

3. Request data dari server.
* Simpan data untuk akses cepat nanti.
* Update aplikasi dengan data baru dari server.

#### Mendapatkan data dari cache

Selanjutnya, kita perlu memeriksa apakah objek `caches` ada dan meminta data 
terbaru darinya. Temukan komentar `TODO add cache logic here` di 
`app.getForecast()`, dan kemudian tambahkan kode berikut di bawah komentar ini.

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

Aplikasi cuaca kita sekarang membuat dua request secara asynchronous, satu 
dari cache dan satu melalui XHR. Jika ada data dalam cache, data tersebut 
akan dikembalikan dan di-render dengan sangat cepat (puluhan mikrodetik) 
dan memperbarui kartu jika XHR masih belum mengembalikan data. Kemudian, 
ketika XHR memberikan response, kartu akan diperbarui dengan data paling baru 
langsung dari API cuaca kita.  

Perhatikan bagaimana permintaan cache dan permintaan XHR kedua berakhir dengan 
panggilan untuk memperbarui kartu prakiraan cuaca. Bagaimana aplikasi tahu 
apakah dia menampilkan data terbaru? Ini ditangani dalam kode berikut dari 
`app.updateForecastCard`:

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
Setiap kali kartu diperbarui, aplikasi menyimpan timestamp dari data pada 
atribut tersembunyi pada kartu. Aplikasi ini hanya menjamin jika cap yang 
sudah ada pada kartu lebih baru daripada data yang dilewatkan ke fungsi.

### Pengujian

Aplikasi sekarang sudah benar-benar bisa berfungsi secara offline. Simpan 
beberapa kota dan tekan tombol refresh pada aplikasi untuk mendapatkan data 
cuaca terbaru, dan kemudian pergi offline dan kembali halaman tersebut.

Coba buka panel __Cache Storage__ pada panel __Application__ dari DevTools. 
Perluas bagian ini dan Anda akan melihat nama app shell Anda dan cache data 
yang tercantum di sisi kiri. Dengan membuka data, cache harus berisai data 
yang disimpan untuk setiap kota.

![cf095c2153306fa7.png](img/cf095c2153306fa7.png)

[](https://weather-pwa-sample.firebaseapp.com/step-07/)


## Dukungan Integrasi Native




Tak seorang pun suka ketika harus mengetikkan URL yang panjang di keyboard 
ponsel. Dengan fitur Add to Home Screen, pengguna bisa menambahkan link 
shortcut ke perangkat mereka seperti mereka akan menginstal aplikasi native 
dari App Store, tetapi dengan lebih sedikit kesulitan.

### Web App Install Banner dan Add to Homescreen untuk Chrome di Android

Web app install banner memberi Anda kemampuan untuk membuat pengguna Anda
menambahkan aplikasi web Anda ke layar utama mereka dengan cepat dan
mulus, sehingga mudah untuk memulai dan kembali ke aplikasi Anda. Menambahkan 
app install banner sangat mudah, dan Chrome menangani sebagian
dari beban pekerjaan untuk kemudahan Anda. Kita hanya perlu menyertakan file 
web app manifest dengan menyertakan beberapa rincian aplikasi.

Chrome kemudian menggunakan beberapa kriteria, termasuk penggunaan 
service worker, status SSL dan heuristik frekuensi kunjungan untuk menentukan 
kapan browser akan menampilkan banner Add to Home Screen. Sebagai
tambahan lain, pengguna bisa menambahkannya secara manual melalui menu 
"Add to Home Screen" dari Chrome.

#### Deklarasikan sebuah app manifest dengan file `manifest.json`

Web app manifest adalah file JSON sederhana yang memberi Anda, pengembang web,
kemampuan untuk mengontrol bagaimana aplikasi Anda muncul kepada pengguna di 
area yang mereka harapkan (misalnya layar awal ponsel), mengarahkan
kepada apa yang bisa dijalankan pengguna dan yang lebih penting lagi, bagaimana 
mereka menjalankannya.

Menggunakan web app manifest, aplikasi web Anda bisa:

* Memiliki tampilan yang berselera tinggi di layar utama Android
* Bisa dijalankankan dalam mode layar penuh pada Android tanpa tampilan URL
* Mengatur orientasi layar untuk tampilan yang lebih optimal
* Menentukan "splash screen" dan warna tema untuk situs
* Melacak apakah Anda menjalankan aplikasi dari layar utama atau dari alamat URL

Buatlah sebuah file denga nama `manifest.json` di folder `work` Anda dan 
salin/tempel (copy/paste) konten di bawah ini:

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

Manifest mendukung berbagai ikon, yang disiapkan untuk ukuran layar yang 
berbeda. Pada saat penulisan ini, Chrome dan Opera Mobile, satu-satunya 
browser yang mendukung web app manifest, jangan gunakan ukuran yang lebih 
kecil dari 192px.

Cara yang mudah untuk melacak bagaimana aplikasi ini dijalankan adalah 
dengan menambahkan query string ke parameter `start_url` dan kemudian 
menggunakan serangkaian analisis untuk melacak query string.
Jika Anda menggunakan metode ini, jangan lupa untuk memperbarui daftar file 
cache oleh App Shell untuk memastikan bahwa file dengan query string juga 
di-cache-kan.


#### Beritahu browser tentang file manifest Anda

Sekarang, tambahkan baris berikut ke bagian bawah dari element `<head>` di 
file `index.html`: 

```
<link rel="manifest" href="/manifest.json">
```

#### Cara Terbaik (Best Practice)

* Tempatkan link manifest pada semua halaman situs Anda, sehingga akan direview 
oleh Chrome pada saat pengguna melakukan kunjungan yang pertama, tidak peduli di 
halaman mana mereka berkunjung.
* `short_name` lebih disukai di Chrome dan akan digunakan jika ada mengalahkan 
field `name`.
* Tentukan kumpulan icon untuk layar dengan kepadatan yang berbeda-beda. Chrome 
akan mencoba untuk menggunakan ikon paling dekat dengan 48dp, misalnya, 96px 
pada perangkat 2x atau 144px untuk perangkat 3x.
* Jangan lupa untuk menyertakan ikon dengan ukuran yang masuk akal untuk 
splash screen dan jangan lupa untuk mengatur `background_color`.

Bacaan lebih lanjut:

[Penggunaan app install banner](/web/fundamentals/engage-and-retain/simplified-app-installs/)

### Menambahkan elemen Add to Homescreen untuk Safari di iOS

Dalam file `index.html` Anda, tambahkan konten berikut di bagian bawah dari 
elemen `<head>`:

```
  <!-- Add to home screen for Safari on iOS -->
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <meta name="apple-mobile-web-app-title" content="Weather PWA">
  <link rel="apple-touch-icon" href="images/icons/icon-152x152.png">
```

### Tile Icon untuk Windows

Di file `index.html`, tambahkan konten berikut di bagian bawah dari 
elemen `<head>`:

```
  <meta name="msapplication-TileImage" content="images/icons/icon-144x144.png">
  <meta name="msapplication-TileColor" content="#2F3BA2">
```

### Pengujian

Pada bagian ini kita akan menunjukkan beberapa cara untuk menguji web app 
manifest Anda.

Cara pertama adalah dengan menggunakan DevTools. Buka panel __Manifest__ pada 
panel __Application__. Jika Anda telah menambahkan informasi manifest dengan 
benar, Anda akan dapat melihatnya diparsing dan ditampilkan dalam format yang 
ramah-manusia di panel ini.

Anda juga dapat menguji fitur add to homescreen dari panel ini. Klik pada 
tombol __Add to homescreen__. Anda akan melihat pesan "add this site to your 
shelf" di bawah bar URL Anda, seperti pada gambar di bawah.

![cbfdd0302b611ab0.png](img/cbfdd0302b611ab0.png)

Ini adalah contoh tampilan desktop untuk fitur add to homescreen di mobile. 
Jika Anda berhasil memicu prompt ini pada desktop, maka Anda bisa yakin bahwa 
pengguna ponsel dapat menambahkan aplikasi ke perangkat mereka.

Cara kedua untuk mengujinya adalah melalui Web Server for Chrome. Dengan 
pendekatan ini, Anda mengekspos server pengembangan lokal Anda (di desktop 
atau laptop) ke komputer lain, dan kemudian Anda hanya mengakses aplikasi web 
progresif dari perangkat mobile yang sebenarnya.

Pada dialog konfigurasi Web Server for Chrome, pilih opsi `Accessible on local network`:

![81347b12f83e4291.png](img/81347b12f83e4291.png)

Alihkan Web Server ke `STOPPED` dan kembali ke `STARTED`. Anda akan melihat 
URL baru yang dapat digunakan untuk mengakses aplikasi Anda dari jarak jauh.

Sekarang, akses situs Anda dari perangkat mobile, menggunakan URL baru.

Anda akan melihat kesalahan service worker di konsol saat pengujian dengan 
cara ini karena service worker tidak dilayani melalui HTTPS.

Menggunakan Chrome dari perangkat Android, coba tambahkan aplikasi ke layar 
utama dan verifikasi bahwa layar peluncuran muncul dengan benar dan ikon yang 
tepat digunakan.

Pada Safari dan Internet Explorer, Anda juga dapat secara manual menambahkan 
aplikasi ke layar utama Anda.

[](https://weather-pwa-sample.firebaseapp.com/step-08/)


## Deploy ke hosting yang aman dan rayakan



Langkah terakhir adalah men-deploy aplikasi cuaca ke server yang mendukung 
HTTPS. Jika Anda belum memilikinya, pendekatan yang paling mudah (dan gratis) 
adalah dengan menggunakan hosting konten statis dari Firebase. Ini super mudah 
untuk digunakan, melayani konten melalui HTTPS dan didukung oleh CDN global.


### Kredit extra : minify dan inline CSS

Ada satu hal lagi yang harus Anda pertimbangkan, mengecilkan style kunci dan 
membuat mereka inline langsung ke `index.html`. 
[Page Speed ​​Insights](https://developers.google.com/speed) menganjurkan agar 
melayani konten yang terlipat di atas dalam 15k byte pertama dari permintaan. 

Lihatlah seberapa kecil permintaan awal yang bisa Anda dapatkan dengan 
mengubahnya menjadi inline. 

Bacaan lebih lanjut:  [PageSpeed Insight Rules](/speed/docs/insights/rules)

### Deploy ke Firebase

Jika Anda baru ke Firebase, Anda harus masuk menggunakan akun Google Anda dan 
menginstal beberapa alat sebelumnya.

1. Masuk ke Firebase dengan akun Google Anda di 
[https://www.firebase.com/signup/](https://www.firebase.com/signup/)
2. Install tools Firebase melalui npm: `npm install -g firebase-tools`

Setelah akun Anda dibuat dan Anda masuk, Anda siap untuk melakukan 
deploy!

1. Buat applikasi baru di  
[https://www.firebase.com/account/](https://www.firebase.com/account/)
2. Jika Anda belum masuk ke tools Firebase, perbarui credential Anda: 
`firebase login`
3. Inisialisasi aplikasi Anda, dan berikan direktori (mungkin `work`) tempat 
aplikasi lengkap Anda hidup: `firebase init`
4. Terakhir, deploy app ke Firebase: `firebase deploy`
5. Rayakan. Anda berhasil! Aplikasi Anda akan di-deploy ke domain: 
`https://YOUR-FIREBASE-APP.firebaseapp.com`

Bacaan lebih lanjut:  
[Panduan Firebase Hosting](https://www.firebase.com/docs/hosting/guide/)

### Pengujian

* Cobalah untuk menambahkan aplikasi ke layar utama Anda kemudian putus 
jaringan dan check apakah aplikasi bisa bekerja secara offline seperti yang diharapkan.

[](https://weather-pwa-sample.firebaseapp.com/final/)





## Menemukan masalah, atau memiliki umpan balik? {: .hide-from-toc }
Bantu kami melakukan laboratorium kode kita lebih baik dengan mengirimkan
[issue](https://github.com/googlecodelabs/your-first-pwapp/issues) hari ini. 
Dan terima kasih!