project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Progressive Web Apps menciptakan pengalaman terbaik dari penggabungan web dan aplikasi. Dalam panduan langkah-demi-langkah ini, Anda akan dipandu untuk membangun *Progressive Web Apps* dan mempelajari dasar-dasar yang diperlukan untuk membangun Progressive Web Apps, termasuk mempelajari model *App Shell*, cara menggunakan *service workers* untuk menyimpan data aplikasi di *cache* dan lebih banyak lagi.

{# wf_updated_on: 2016-09-20 #}
{# wf_published_on: 2000-01-01 #}

# Progressive Web App Anda yang Pertama {: .page-title }

{% include "_shared/contributors/petelepage.html" %}

[Progressive Web Apps](/web/progressive-web-apps/) menciptakan pengalaman terbaik 
dari penggabungan web dan aplikasi. Teknologi ini memungkinkan pengguna untuk segera 
menggunakan aplikasi sejak saat kunjungan pertama, tanpa perlu melakukan instalasi apa pun. 
Seiring dengan semakin seringnya pengguna menggunakan aplikasi, kemampuan aplikasi akan menjadi 
lebih hebat dan lebih hebat lagi. Aplikasi termuat dengan cepat, bahkan pada jaringan yang terputus-putus, 
juga bisa mengirimkan *push notification* yang relevan, memiliki ikon pada layar awal 
dan memuat halaman layar penuh dengan level kenyamanan tertinggi.


### Apakah Progressive Web App itu?

Progressive Web Apps adalah:

* **Progressive** - Berfungsi untuk setiap pengguna, terlepas dari pilihan browser karena aplikasi ini dibangun dengan perbaikan yang progresif sebagai prinsip utamanya.
* **Responsive** - Sesuai dengan berbagai macam alat: desktop, seluler, tablet, atau apa pun berikutnya.
* **Connectivity independent** - Disempurnakan dengan *service workers* agar berfungsi secara offline atau pada jaringan berkualitas rendah.
* **App-like** - Serasa benar-benar seperti aplikasi bagi pengguna dengan interaksi app-style berkat penerapan model app shell.
* **Fresh** - Selalu up-to-date terima kasih kepada proses pembaruan yang disediakan oleh *service worker*.
* **Safe** - Dilayani melalui HTTPS untuk mencegah pengintaian dan memastikan konten tidak dimodifikasi.
* **Discoverable** - Bisa diidentifikasi sebagai "aplikasi" berkat manifest W3C dan pendaftaran service worker memungkinkan mesin pencari untuk menemukan mereka.
* **Re-engageable** - Membuat pelanggan kembali melalui fitur *push notification*.
* **Installable** - Memungkinkan pengguna untuk "menyimpan" aplikasi yang mereka anggap paling berguna di layar awal mereka tanpa harus melalui kerumitan instalasi dari app store.
* **Linkable** - Mudah berbagi melalui URL dan tidak memerlukan instalasi yang rumit.

Panduan untuk memulai ini akan memandu Anda dalam membuat sendiri Progressive Web App, 
termasuk pertimbangan desain, serta rincian pelaksanaan untuk memastikan bahwa aplikasi Anda 
memenuhi prinsip-prinsip kunci dari Progressive Web App.

Note: Mencari yang lain? Saksikan Alex Russell berbicara tentang <a href='https://www.youtube.com/watch?v=MyQ8mtR9WxI'>Progressive Web Apps</a> dari episode Summit Dev Chrome 2015

### Apa yang akan kita bangun?

<div class="attempt-right">
  <a href="https://weather-pwa-sample.firebaseapp.com/final/">
    <img src="images/weather-ss.png">
  </a>
  <p>
    <a href="https://weather-pwa-sample.firebaseapp.com/final/" >Cobalah</a>
  </p>
</div>

Dalam panduan untuk memulai ini, Anda akan membangun Aplikasi Web Cuaca 
menggunakan teknik Progressive Web App.

Mari kita tinjau ciri-ciri dari Progressive Web App:

* <b>Progresif</b> - kita akan menggunakan perbaikan bertahap
* <b>Responsif</b> - kita akan memastikan cocok setiap bentuk layar
* <b>Independen terhadap koneksi</b> - kita akan menyimpan dalam cache app shell dengan service worker.
* <b>Seperti Aplikasi</b> - kita akan menggunakan interaksi app-style untuk menambahkan kota dan memperbarui data.
* <b>Terbaru</b> - kita akan menyimpan ke dalam cache data terbaru dengan service worker.
* <b>Aman</b> - kita akan mendeploy aplikasi ke hosting yang mendukung HTTPS.
* <b>Mudah ditemukan dan mudah diinstal</b> - kita akan menggunakan manifest sehingga mudah bagi mesin pencari untuk menemukan aplikasi kita.
* <b>dapat ditautkan</b> - ini aplikasi web, tentunya!

<div class="clearfix"></div>


### Apa yang akan Anda pelajari

* Bagaimana merancang dan membangun sebuah aplikasi dengan menggunakan metode "app shell"
* Cara membuat aplikasi Anda berjalan offline
* Bagaimana cara menyimpan data untuk penggunaan offline pada pemuatan berikutnya

### Apa yang akan anda butuhkan

* Chrome 47 atau di atasnya
* Pengetahuan tentang HTML, CSS dan JavaScript

Panduan untuk memulai ini difokuskan pada Progressive Web Apps. Beberapa konsep atau blok-kode akan 
dikaburkan (misalnya CSS atau JavaScript yang tidak relevan untuk panduan ini) atau 
disediakan untuk anda untuk langsung bisa di copy-paste.


## Arsitektur App Shell


App Shell, adalah kombinasi HTML, CSS, dan JavaScript paling minimum yang diperlukan untuk 
menampilkan antarmuka pengguna sebuah Progressive Web App dan merupakan salah satu 
komponen yang menjamin kinerja yang bisa diandalkan. Pemuatan pertama harus 
sangat cepat, dan harus segera di-cache-kan. Ini berarti bahwa app shell tidak perlu 
dimuat setiap kali, bahkan hanya perlu mendapatkan konten yang diperlukan saja.


Arsitektur App Shell memisahkan prasarana aplikasi inti dan antar muka dari data. 
Semua antar muka dan prasarana di-cache secara lokal menggunakan service worker 
sehingga pada pemuatan berikutnya, Progresif Web App hanya perlu mengambil data 
yang diperlukan saja, tanpa harus memuat ulang semuanya.

<figure>
  <img src="images/appshell.jpg" /> 
</figure>

Dengan kata lain, app shell mirip dengan buntalan kode yang akan Anda 
publikasikan ke app store pada saat mempublikasikan aplikasi native. 
App shell adalah komponen inti yang diperlukan agar aplikasi Anda bisa hidup, 
akan tapi kemungkinan besar belum berisi data.

### Mengapa menggunakan arsitektur app shell?

Menggunakan arsitektur app shell memungkinkan Anda memusatkan perhatian pada kecepatan, memberikan 
Progressive Web App fitur yang serupa dengan aplikasi native, yaitu: pemuatan instan dan 
update berkala, tanpa perlu proses publikasi ke app store.

### Mendesain app shell 

Langkah pertama adalah membagi-bagi desain ke dalam komponen inti. 

Tanya diri Anda:

* Apa yang harus tampil di layar secepatnya? 
* Apa saja komponen antar muka lain yang menjadi kunci jalannya aplikasi kita? 
* Apa sumber daya dukungan yang dibutuhkan untuk app shell? Misalnya gambar, 
JavaScript, CSS, dll.

<img src="images/weather-ss.png" class="attempt-right">

Kita akan membuat aplikasi Cuaca sebagai aplikasi Progressive Web App pertama kita. 
Komponen utamanya terdiri dari:

* Header dengan judul, dan tombol tambah/refresh
* Wadah untuk kartu perkiraan
* Template kartu perkiraan
* Sebuah kotak dialog untuk menambahkan kota baru
* Sebuah indikator pemuatan


<div class="clearfix"></div>


Ketika merancang sebuah aplikasi yang lebih kompleks, konten yang tidak diperlukan untuk 
pemuatan awal bisa dipesan nanti dan disimpan di cache terlebih dahulu untuk penggunaan berikutnya. Sebagai contoh, 
kita bisa menunda pemuatan dialog Tambah Kota sampai kita selsai menampilkan halaman awal, 
kemudian mencari waktu yang tepat saat aplikasi sedang tidak memproses tampilan (saat CPU menganggur).


## Mengimplementasikan App Shell

Ada beberapa cara untuk memulai proyek, dan kami 
menganjurkan untuk menggunakan Web Starter Kit. Namun, untuk saat ini, 
proyek kita dibuat sesederhana mungkin sehingga Anda bisa berkonsentrasi pada pembuatan Progressive Web Apps. 
Oleh karena itu, kami menyediakan semua sumber daya yang Anda butuhkan untuk memulai.



### Unduh kode

Anda bisa [mengunduh semua kode Progressive Web App ini](pwa-weather.zip) 
dalam sebuah file ZIP agar lebih mudah digunakan. Setiap langkah dan seluruh sumber daya yang Anda butuhkan 
tersedia di ZIP. 

### Buat HTML untuk App Shell

Untuk memastikan bahwa kita bisa mulai sebersih mungkin, kita akan memulainya dengan 
sebuah file `index.html` yang benar-benar baru, kemudian menambahkan komponen inti yang sudah kita bahas di
[Arsitektur App Shell](step-01).

Ingat, komponen pentingnya terdiri dari:

* Header dengan judul, dan tombol tambah/pembaruan
* Kontainer untuk kartu Prakiraan
* Sebuah template kartu Prakiraan
* Sebuah dialog untuk menambahkan kota baru
* Sebuah indikator pemuatan


    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Aplikasi Cuaca</title>
      <!-- Insert link to styles.css here -->
    </head>
    <body>
      <header class="header">
        <h1 class="header__title">Aplikasi Cuaca</h1>
        <button id="butRefresh" class="headerButton"></button>
        <button id="butAdd" class="headerButton"></button>
      </header>
    
      <main class="main" hidden>
        <!-- Masukkan forecast-card.html di sini -->
      </main>
    
      <div class="dialog-container">
        <!-- Masukkan add-new-city-dialog.html di sini -->
      </div>
    
      <div class="loader">
        <svg viewBox="0 0 32 32" width="32" height="32">
          <circle id="spinner" cx="16" cy="16" r="14" fill="none"></circle>
        </svg>
      </div>
    
      <!-- Masukkan tautan ke app.js di sini -->
    </body>
    </html>
    

Perhatikan konten `main` yang `hidden` secara default dan loader `visible`. 
Hal ini bertujuan untuk memastikan agar pengguna melihat loader segera pada saat halaman ini dimuat, 
memberi mereka indikasi yang jelas bahwa konten tersebut sedang dimuat.


Selanjutnya, mari kita tambahkan kartu Prakiraan, dan dialog Tambahkan Kota Baru. 
Untuk menghemat waktu, kodenya sudah disediakan di direktori `resources`, 
agar Anda dapat menyalin dan menempelkannya ke tempat yang sesuai.


### Tambahkan style untuk komponen utama antar muka

Sekarang saatnya untuk menambahkan style utama. 
Untuk saat ini, mari kita tempatkan mereka ke dalam sebuah file CSS yang terpisah.

Pada file `index.html`, ganti `<!-- Masukkan tautan ke styles di sini -->` dengan: 

    <link rel="stylesheet" type="text/css" href="styles/inline.css">


Untuk mempersingkat waktu, kami telah membuat 
[stylesheet](https://weather-pwa-sample.firebaseapp.com/styles/inline.css) 
untuk Anda gunakan. Hanya perlu beberapa menit untuk meninjau dan menyesuaikan untuk keperluan Anda.

Note: Menentukan setiap ikon satu per satu mungkin terlihat kurang efisien dibandingkan dengan menggunakan sprite image. Kita akan meng-cache nanti sebagai bagian dari App Shell, memastikan agar ikon-ikon ini selalu tersedia, tanpa perlu membuat ulang permintaan ke web server.

### Uji segala sesuatunya dan lakukan penyesuaian

Sekarang adalah waktu yang tepat untuk menguji segala sesuatunya, 
lihat bagaimana tampilannya serta buat penyesuaian yang Anda inginkan. 
Pastikan untuk menguji perenderan kartu Prakiraan Anda dengan menghapus atribut `hidden` dari kontainer `main`, 
dan menambahkan beberapa data tiruan ke kartu.
 

Note: Kami telah memberi Anda markup dan style untuk menghemat waktu Anda dan memastikan bahwa Anda memulai atas fondasi yang kokoh. Pada bagian berikutnya, Anda akan mendapatkan kesempatan untuk menulis kode Anda sendiri.

Aplikasi ini cukup responsif sekarang, tapi belum sempurna. 
Coba tambahkan style tambahan yang akan meningkatkan respon dan 
membuatnya benar-benar bersinar di berbagai perangkat. 
Juga, pertimbangkan apa yang dapat Anda lakukan untuk membuat cita rasa Anda sendiri.


### Tambahkan kode bootstrap JavaScript penting

Sekarang kita memiliki sebagian besar antar muka yang sudah siap, 
saatnya untuk memulai mengaitkan kode agar semuanya tersambung. 
Seperti bagian dari app shell lainnya, perhatikan apa saja kode 
yang diperlukan sebagai bagian dari tampilan utama dan apa yang bisa ditunda untuk dibuka pada saatnya nanti.


Dalam kode JavaScript kami, kami menyertakan:

* Sebuah objek `app` yang berisi beberapa informasi utama yang diperlukan aplikasi.
* Event listener untuk semua tombol di header (`tambah`/`perbarui`) 
  dan pada dialog Tambah Kota (`tambah`/`batalkan`).
* Sebuah method untuk menambah atau memperbarui kartu Prakiraan (`app.updateForecastCard`).
* Sebuah method untuk mendapatkan data Perkiraan Cuaca terbaru dari 
  Firebase Public API (`app.getForecast`).
* Sebuah method untuk meng-iterasi kartu dan memanggil `app.getForecast` untuk mendapatkan data 
  Prakiraan Cuaca (`app.updateForecasts`).
* Beberapa data tiruan (`fakeForecast`) yang dapat digunakan untuk mempercepat pengujian tampilan.

Tambahkan kode JavaScript

1. Salin `app.js` dari direktori `resources/step3` ke direktori `scripts` 
   dan namakan `app.js`
1. Di dalam file `index.html`, tambahkan tautan ke `app.js` yang baru dibuat.<br/>
   `<script src="/scripts/app.js"></script>`

### Pengujian

Karena sekarang Anda telah menambahkan HTML utama, style dan JavaScript, saatnya untuk menguji 
aplikasi ini. Meskipun belum banyak yang bisa dilakukan, pastikan aplikasi ini tidak menuliskan kesalahan 
di console.

Untuk melihat bagaimana data cuaca tiruan ditampilkan, tambahkan baris di bawah ini ke file `app.js` Anda:  

  `app.updateForecastCard(fakeForecast);`

<a href="https://weather-pwa-sample.firebaseapp.com/step-04/" >Cobalah</a>


## Mulailah dengan Pemuatan Pertama yang Cepat

Progressive Web Apps harus dimuat dengan cepat dan dapat digunakan seketika. 
Pada saat ini, App Cuaca telah bisa dimulai dengan cepat, akan tapi masih belum bisa digunakan. 
Tidak ada data. Kita bisa membuat permintaan AJAX untuk mendapatkan data, 
tapi hal ini akan mengakibatkan permintaan tambahan dan menjadikan pemuatan awal menjadi lebih lama. 
Oleh karena itu, berikan data sebenarnya pada pemuatan pertama.



### Suntikkan data Perkiraan Cuaca

Untuk Code Lab berikut, kita akan menyuntikkan data ramalan cuaca secara statis, 
namun dalam aplikasi aslinya, data Prakiraan Cuaca terbaru akan disuntikkan oleh server 
berdasarkan geolokasi alamat IP pengguna.

Tambahkan kode berikut ke dalam ekspresi fungsi yang dijalankan:

 
    var initialWeatherForecast = {  
      key: 'newyork',  
      label: 'New York, NY',  
      currently: {  
        time: 1453489481,  
        summary: 'Clear',  
        icon: 'partly-cloudy-day',  
        temperature: 52.74,  
        apparentTemperature: 74.34,  
        precipProbability: 0.20,  
        humidity: 0.77,  
        windBearing: 125,  
        windSpeed: 1.52  
      },  
      daily: {  
        data: [  
          {icon: 'clear-day', temperatureMax: 55, temperatureMin: 34},  
          {icon: 'rain', temperatureMax: 55, temperatureMin: 34},  
          {icon: 'snow', temperatureMax: 55, temperatureMin: 34},  
          {icon: 'sleet', temperatureMax: 55, temperatureMin: 34},  
          {icon: 'fog', temperatureMax: 55, temperatureMin: 34},  
          {icon: 'wind', temperatureMax: 55, temperatureMin: 34},  
          {icon: 'partly-cloudy-day', temperatureMax: 55, temperatureMin: 34}  
        ]  
      }  
    };


Berikutnya, hapus data `fakeForecast` yang sebelumnya kita buat untuk pengujian karena kita 
sudah tidak memerlukannya lagi.

### Membuat perbedaan saat aplikasi pertama kali berlari

Namun, bagaimana kita mengetahui kapan waktu yang tepat untuk menampilkan informasi ini, yang bisa saja tidak relevan 
pada pemuatan berikutnya ketika aplikasi cuaca ditarik dari cache? Ketika pengguna 
akan memuat aplikasi pada kunjungan berikutnya, mereka mungkin telah berpindah kota, sehingga kita perlu untuk
memuat nama-nama kota tersebut, tidak selalu kota pertama yang sekarang mereka 
lihat.

Preferensi pengguna seperti daftar kota yang sering disinggahi pengguna harus disimpan 
secara lokal menggunakan IndexedDB atau mekanisme penyimpanan lokal lainnya. Untuk menyederhanakan contoh ini 
semaksimal mungkin, kami menggunakan `localStorage` yang tidak ideal untuk 
aplikasi sebenarnya, karena pada saat penulisan data menerapkan mekanisme penyimpanan synchronous, menghalangi proses lain, sehingga 
bisa berpotensi sangat lambat pada beberapa perangkat.

Note: Untuk kredit tambahan, gantikan implementasi <code>localStorage</code> dengan <a href='https://www.npmjs.com/package/idb'>idb</a>

Pertama, mari kita menambahkan kode untuk menyimpan preferensi pengguna dalam `app.js`: 


    // Menyimpan daftar kota ke localStorage, lihat catatan di bawah tentang localStorage.
    app.saveSelectedCities = function() {
      var selectedCities = JSON.stringify(app.selectedCities);
      // PENTING: Lihat catatan tentang penggunaan localStorage.
      localStorage.selectedCities = selectedCities;
    };
    

Selanjutnya, mari kita menambahkan kode untuk memeriksa apakah pengguna berlangganan ke suatu kota 
dan menampilkannya, atau gunakan data yang disuntikkan. Tambahkan kode berikut ke 
`app.js`:


    /****************************************************************************   
     *
     * Kode yang diperlukan untuk memulai aplikasi
     *
     * CATATAN: Untuk mempermudah panduan untuk memulai ini, kita menggunakan localStorage.
     *   localStorage adalah synchronous API dan kinerjamya yang sangat lambat.
     *   Tidak disarankan untuk digunakan dalam aplikasi sebenarnya!
     *   Sebaiknya, gunakan IDB (https://www.npmjs.com/package/idb) atau 
     *   SimpleDB (https://gist.github.com/inexorabletash/c8069c042b734519680c)
     *
     ****************************************************************************/
    
    app.selectedCities = localStorage.selectedCities;
    if (app.selectedCities) {
      app.selectedCities = JSON.parse(app.selectedCities);
      app.selectedCities.forEach(function(city) {
        app.getForecast(city.key, city.label);
      });
    } else {
      app.updateForecastCard(initialWeatherForecast);
      app.selectedCities = [
        {key: initialWeatherForecast.key, label: initialWeatherForecast.label}
      ];
      app.saveSelectedCities();
    }
    

Terakhir, jangan lupa untuk menyimpan daftar kota saat pengguna menambahkan dengan 
menuliskan: `app.saveSelectedCities();` ke event handler `butAddCity`.

### Pengujian

* Saat pertama kali dijalankan, aplikasi Anda harus segera menampilkan Prakiraan Cuaca 
  dari `InitialWeatherForecast`. 
* Tambahkan satu kota baru dan pastikan bahwa aplikasi menampilkan dua kartu. 
* Refresh browser dan periksa bahwa aplikasi menampilkan informasi 
  terbaru.

<a href="https://weather-pwa-sample.firebaseapp.com/step-05/" >Cobalah</a>


## Gunakan Service Workers untuk melakukan Pre-cache App Shell


Progresif Web Apps harus cepat, dan bisa diinstall, 
bekerja pada saat online, offline, koneksi terputus-putus, pun pada saat mendapatkan koneksi yang sangat lambat. Untuk mencapainya, 
kita perlu untuk menerapkan mekanisme cache app shell kita menggunakan service worker sehingga semua sumber daya yang diperlukan 
selalu tersedia dengan cepat dan bisa diandalkan.


Jika Anda belum terbiasa dengan service worker, Anda bisa memperoleh dasar 
pemahaman dengan membaca 
[Pengenalan Service Worker](http://www.html5rocks.com/en/tutorials/service-worker/introduction/) 
tentang apa yang bisa mereka lakukan, siklus hidup dan batasan-batasannya.

Fitur yang disediakan melalui service workder bisa dianggap sebagai 
penyempurnaan secara progresif, dan hanya ditambahkan saat didukung oleh browser. Misalnya, dengan 
service worker Anda bisa menyimpan app shell dan data untuk aplikasi Anda, sehingga file-file tersebut 
tersedia bahkan pada saat jaringan terputus. Ketika service worker tidak didukung, 
kode offline tidak dipanggil, dan pengguna mendapatkan pengalaman seperti biasa. Penggunaan 
fitur pendeteksi untuk memberikan penyempurnaan secara progresif memiliki sedikit overhead dan 
dijamin tidak akan mengakibatkan kerusakan di browser lama yang tidak mendukung fitur itu.

Note: Service worker berfungsi hanya pada halaman yang diakses melalui HTTPS (<code> https://localhost</code> juga bisa digunakan untuk mempermudah pengujian). Untuk mempelajari tentang alasan di balik pembatasan ini, baca <a href='http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features'>Prefer Secure Origins For Powerful New Features</a> dari tim Chromium.

### Daftarkan service workder jika memungkinkan

Langkah pertama untuk membuat aplikasi offline bekerja adalah dengan mendaftarkan service worker, 
script yang memungkinkan sebuah fungsi bekerja di belakang layar tanpa 
pengguna membuka halaman web.

Ini perlu dua langkah sederhana:

1. Buat sebuah file JavaScript yang akan menjadi service worker
1. Kita minta pada browser untuk mendaftarkan file JavaScript sebagai service worker.

Pertama, buat file kosong bernama `service-worker.js` di root folder aplikasi Anda. 
File `service-worker.js` ini harus berada di root folder aplikasi karena 
cakupan untuk service worker ditetapkan oleh direktori di mana file tersebut 
berada. 

Selanjutnya, kita perlu mengetahui apakah browser mendukung service worker, dan jika didukung, 
daftarkan service worker. Tambahkan kode berikut ke file `app.js`:  


    if('serviceWorker' in navigator) {  
      navigator.serviceWorker  
               .register('/service-worker.js')  
               .then(function() { console.log('Service Worker Terdaftar!'); });  
    }
    

### Memasukkan aset-aset situs ke dalam cache

Ketika service worker telah terdaftar, sebuah event `install` akan terpicu saat pertama 
kalinya pengguna mengunjungi halaman. Dalam event ini, kita akan meng-cache 
semua aset yang dibutuhkan oleh aplikasi.

Note: Kode di bawah ini <b>TIDAK BOLEH</b> digunakan dalam aplikasi sebenarnya, karena hanya menjelaskan kasus penggunaan paling mendasar sehingga mudah bagi Anda untuk terjebak ke dalam keadaan di mana app shell Anda tidak akan terbarui. Pastikan untuk meninjau bagian bawah yang membahas keterbatasan implementasi ini dan bagaimana menghindarinya.

Ketika service worker diaktifkan, dia harus mencari objek dalam cache dan 
mengisinya dengan aset yang diperlukan untuk memuat App Shell. Tambahkan kode ini 
ke dalam file `service-worker.js` Anda:


    var cacheName = 'weatherPWA-step-5-1';  
    var filesToCache = [];
    
    self.addEventListener('install', function(e) {  
      console.log('[ServiceWorker] Proses instalasi');  
      e.waitUntil(  
        caches.open(cacheName).then(function(cache) {  
          console.log('[ServiceWorker] Melakukan caching terhadap app shell');  
          return cache.addAll(filesToCache);  
        })  
      );  
    });
    

Pertama, kita perlu membuka cache dengan `cache.open()` dan memberikan nama cache. 
Menyediakan nama cache memungkinkan kita untuk membuat beberapa versi, atau memisahkan data dari 
App Shell sehingga kita dapat dengan mudah memperbarui satu file dengan tidak mempengaruhi file lainnya. 

Setelah cache terbuka, kita kemudian dapat memanggil `cache.addAll()`, dengan mengambil daftar 
URL, kemudian menarik mereka dari server dan menambahkannya ke dalam cache. 
Perlu diperhatikan bahwa fungsi `cache.addAll()` ini atomik, jika salah satu file gagal, keseluruhan 
langkah untuk memasukkan ke dalam cache akan gagal!

Pastikan untuk menghapus `cacheName` setiap kali Anda membuat perubahan pada service worker Anda untuk 
memastikan Anda selalu mendapatkan versi terbaru dari file tersebut dari cache. 
Sangat penting untuk membersihkan data dan isi cache yang tidak terpakai secara berkala. Tambahkan 
event listener ke event `activate` untuk mendapatkan semua kunci cache dan 
menghapus yang tidak terpakai:


    self.addEventListener('activate', function(e) {  
      console.log('[ServiceWorker] Proses aktifasi');  
      e.waitUntil(  
        caches.keys().then(function(keyList) {  
          return Promise.all(keyList.map(function(key) {  
            console.log('[ServiceWorker] Menghapus cache lama', key);  
            if (key !== cacheName) {  
              return caches.delete(key);  
            }  
          }));  
        })  
      );  
    });
    

Akhirnya, mari kita memperbaharui daftar file yang dibutuhkan untuk app shell. Dalam 
array, kita perlu menyertakan semua file yang dibutuhkan aplikasi Anda, termasuk gambar, 
JavaScript, stylesheet, dll.   


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
    

Note: Pastikan untuk menyertakan semua permutasi nama file, misalnya aplikasi kita disajikan dari <code>index.html</code>, tetapi juga bisa diakses sebagai <code>/</code> karena server mengirimkan <code>index.html</code> ketika root folder diakses. Anda bisa menangani ini dalam method <code>fetch</code>, tetapi perlu kasus khusus yang mungkin jadi lebih rumit.

Aplikasi kita belum bisa bekerja secara offline. Kami telah meng-cache komponen-komponen app shell, 
tapi kita masih perlu memuat mereka dari cache lokal.

### Menyajikan app shell dari cache

Service worker menyediakan kemampuan untuk menyadap permintaan 
Progressive Web App kita dan menangani mereka di dalam kode service worker. Kita bisa 
menentukan bagaimana menangani permintaan ini dan mungkin sekali melayani 
response dari cache kita sendiri.

Sebagai contoh:


    self.addEventListener('fetch', function(event) {  
      // Lakukan sesuatu yang menarik dengan fetch di sini
    });
    

Sekarang, mari kita layani app shell dari cache. Tambahkan kode berikut ke 
file `service-worker.js`:


    self.addEventListener('fetch', function(e) {  
      console.log('[ServiceWorker] Fetch', e.request.url);  
      e.respondWith(  
        caches.match(e.request).then(function(response) {  
          return response || fetch(e.request);  
        })  
      );  
    });
    

Melangkah dari dalam, ke luar, `caches.match()` mengevaluasi permintaan web 
yang memicu event `fetch`, dan memeriksa untuk melihat apakah file yang diminta tersedia dalam cache. 
Kemudian merespon dengan versi dalam cache, atau menggunakan `fetch` untuk mendapatkan salinannya 
dari jaringan. `response` dikirimkan kembali ke halaman web dengan
`e.respondWith()`.

Note: Jika Anda tidak melihat <code>[ServiceWorker]</code> menulis log di console, pastikan penulisan kode<code>cacheName</code> dan muat ulang halaman tersebut. Jika masih belum berhasil, lihat bagian Tips untuk pengujian service workers lebih lanjut.

### Waspadalah terhadap ujung kasus

Seperti disebutkan sebelumnya, kode ini **tidak boleh digunakan dalam aplikasi produksi**
karena banyaknya kasus belum tertangani.

#### Cache tergantung pada pemutakhiran kunci cache setiap kali ada perubahan

Sebagai contoh, metode cache ini menuntut Anda untuk memperbarui kunci cache setiap kali 
ada konten yang berubah, jika tidak, cache tidak akan kadaluarsa, dan konten yang lama 
disajikan. Jadi pastikan untuk mengubah kunci cache setiap kali ada perubahan 
selama Anda mengerjakan proyek Anda!

#### Menuntut semuanya di-download ulang setiap kali ada perubahan

Kelemahan lainnya adalah bahwa seluruh cache secara keseluruhan menjadi tidak valid dan perlu 
didownload ulang setiap kali ada perubahan file. Itu berarti memperbaiki satu 
kesalahan sederhana (ejaan satu karakter) akan membatalkan validitas cache dan membuat semuanya 
diunduh ulang. Tidak bisa dibilang efisien.

#### Cache browser dapat mencegah cache service worker dari pemutakhiran

Ada peringatan penting lainnya di sini. Request HTTPS 
haruslah dilakukan pada saat install handler masuk ke jaringan dan tidak mengembalikan 
response dari cache browser. Jika tidak, browser dapat mengembalikan 
cache versi sebelumnya, sehingga mengakibatkan cache service worker tidak pernah benar-benar terupdate!

#### Waspadalah terhadap strategi cache-first dalam produksi

aplikasi kita menggunakan strategi cache-first, yang mengembalikan salinan dari setiap 
konten cache tanpa melakukan permintaan melalui jaringan. Meskipun 
strategi cache-first ini mudah diimplementasikan, dia dapat menyebabkan kesulitan di kemudian hari. Pada saat 
salinan dari halaman awal dan script service worker di-cache-kan, 
sangatlah sulit untuk mengubah konfigurasi service worker (karena konfigurasi 
tersebut tergantung pada tempat dia didefinisikan), dan Anda bisa menemukan diri Anda 
men-deploy situs yang sangat sulit untuk diperbarui!

#### Bagaimana cara menghindari kasus ini?

Jadi bagaimana kita menghindari kasus ini? Gunakan library seperti 
[sw-precache](https://github.com/GoogleChrome/sw-precache), yang 
bisa menyediakan kontrol terhadap file-file yang akan habis masa berlakunya, memastikan agar request langsung masuk ke 
jaringan dan melakukan semua pekerjaan ini untuk Anda.

### Kiat untuk menguji service worker secara langsung

Men-debug service worker bisa menjadi sebuah tantangan tersendiri, apalagi bila melibatkan cache, 
bisa menjadi mimpi buruk bila ternyata cache tidak diperbarui seperti yang Anda harapkan. Jangan menyerah. 
Terdapat beberapa alat yang bisa digunakan untuk membuat hidup Anda jadi lebih mudah.

Beberapa tips:

* Pada saat service worker di-unregister, 
  dia mungkin akan tetap terdaftar sampai semua window browser yang menjalankannya ditutup.
* Jika aplikasi ini terbuka di beberapa window, service worker yang baru 
  belum akan diterapkan sampai semua window di-reload dan di-update dengan 
  service worker terbaru.
* Melakukan unregister terhadap service worker tidak akan menghapus cache, sehingga ada kemungkinan 
  Anda masih akan mendapatkan data yang lama jika nama cache belum diubah.
* Jika service worker versi sebelumnya sudah pernah ada dan ada service worker baru yang didaftarkan, 
  service worker yang baru belum akan mengambil kendali hingga halaman dimuat ulang (di-reload), kecuali jika Anda mengambil 
  [kontrol langsung](https://github.com/GoogleChrome/samples/tree/gh-pages/service-worker/immediate-control). 

#### Sahabat terbaik Anda yang baru: chrome://serviceworker-internals

Halaman Service Worker Internals di Chrome (`chrome://serviceworker-internals`) adalah 
penolong Anda, memungkinkan Anda untuk menghentikan dan menghapus registrasi service worker yang sudah ada 
dan memulai lagi dari awal. Anda juga dapat menggunakan halaman ini untuk meluncurkan Developer Tools pada 
service worker, sehingga Anda bisa mengakses console service worker.

### Pengujian

* Buka Chrome DevTools dan klik tab resources untuk memastikan bahwa 
service worker telah terdaftar dengan benar dan sumber daya yang dibutuhkan telah dimasukkan ke dalam cache.
* Cobalah mengubah `cacheName` dan pastikan bahwa cache telah benar-benar diperbarui.

<a href="https://weather-pwa-sample.firebaseapp.com/step-06/" >Cobalah</a>



## Gunakan Service Worker untuk Meng-Cache-kan Data Aplikasi


Memilih strategi caching yang tepat untuk data Anda sangat penting dan tergantung 
pada jenis data aplikasi Anda sajikan. Misalnya, data yang sensitif-waktu seperti
cuaca atau harga saham harus selalu ditampilkan yang terbaru, realtime, sedangkan gambar avatar atau 
konten artikel dapat diperbarui lebih jarang. 


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

### Menangkap network request dan memasukkan response-nya ke dalam cache 

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

    var dataCacheName = 'weatherData-v1';
    

Selanjutnya, kita perlu mengubah event handler `fetch` untuk menangani request ke API data 
terpisah dari request lainnya.


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


Kode ini melakukan penyadapan request dan memeriksa apakah URL dimulai dengan alamat 
dari API cuaca. Jika betul, kita akan menggunakan `fetch` untuk membuat request. Setelah
respon dikembalikan, kode kita membuka cache, meng-kloning response, menyimpannya
ke dalam cache dan akhirnya mengembalikan response terhadap request aslinya. 


Selanjutnya, ganti `// Letakkan kode handler data di sini` dengan kode di bawah:


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
    

Aplikasi kita belum akan bekerja secara offline. Kita telah menerapkan cache dan pengambilan
untuk app shell, tapi meskipun kita telah meng-cache data, kita masih bergantung 
pada jaringan.

### Membuat request

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

### Pengujian

* Di dalam console, Anda akan melihat dua event setiap kali Anda me-refresh, satu 
  menunjukkan data diambil dari cache, dan satu lagi diambil 
  dari jaringan.
* Aplikasi ini sudah bekerja sepenuhnya secara offline sekarang. Coba hentinkan server development Anda
  dan putuskan koneksi ke jaringan, kemudian jalankan aplikasi. Sekarang, app shell dan
  data, dua-duanya harus dilayani dari cache.

<a href="https://weather-pwa-sample.firebaseapp.com/step-07/" >Cobalah</a>



## Dukungan Integrasi Native

Tak seorang pun suka ketika harus mengetikkan URL yang panjang di keyboard ponsel.
Dengan fitur Add to Home Screen, pengguna bisa
menambahkan link shortcut ke perangkat mereka seperti mereka akan menginstal aplikasi native
dari App Store, tetapi dengan lebih sedikit kesulitan.


### Web App Install Banner dan Add to Homescreen untuk Chrome di Android

Web app install banner memberi Anda kemampuan untuk membuat pengguna Anda
menambahkan aplikasi web Anda ke layar awal mereka dengan cepat dan
mulus, sehingga mudah untuk memulai dan kembali ke aplikasi Anda. Menambahkan app install banner sangat mudah, dan Chrome menangani sebagian
dari beban pekerjaan untuk kemudahan Anda. Kita hanya perlu menyertakan file web app manifest
dengan menyertakan beberapa rincian aplikasi.


Chrome kemudian menggunakan beberapa kriteria, termasuk penggunaan service worker, status SSL
dan heuristik frekuensi kunjungan untuk menentukan kapan browser akan menampilkan banner Add to Home Screen. Sebagai
tambahan lain, pengguna bisa menambahkannya secara manual melalui menu "Add to Home Screen" dari
Chrome.

#### Deklarasikan sebuah app manifest dengan file manifest.json

Web app manifest adalah file JSON sederhana yang memberi Anda, pengembang web,
kemampuan untuk mengontrol bagaimana aplikasi Anda muncul kepada pengguna di area
yang mereka harapkan (misalnya layar awal ponsel), mengarahkan
kepada apa yang bisa dijalankan pengguna dan yang lebih penting lagi, bagaimana mereka menjalankannya.

Menggunakan web app manifest, aplikasi web Anda bisa:

* Memiliki tampilan yang berselera tinggi di layar awal Android
* Bisa dijalankankan dalam mode layar penuh pada Android tanpa tampilan URL
* Mengatur orientasi layar untuk tampilan yang lebih optimal
* Menentukan "splash screen" dan warna tema untuk situs
* Melacak apakah Anda menjalankan aplikasi dari layar awal atau dari alamat URL

<div class="clearfix"></div>

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
    

Cara yang mudah untuk melacak bagaimana aplikasi ini dijalankan adalah dengan menambahkan query string ke
parameter `start_url` dan kemudian menggunakan serangkaian analisis untuk melacak query string.
Jika Anda menggunakan metode ini, jangan lupa untuk memperbarui daftar file cache oleh App
Shell untuk memastikan bahwa file dengan query string juga di-cache-kan.

#### Beritahu browser tentang file manifest Anda

Tambahkan berikut ke `<head>` dari file `index.html` Anda:
`<link rel="manifest" href="/manifest.json">`

#### Praktek Terbaik (Best Practice)

* Tempatkan link manifest pada semua halaman situs Anda, sehingga akan direview oleh
  Chrome pada saat pengguna melakukan kunjungan yang pertama, tidak peduli di halaman mana mereka berkunjung.
* `short_name` lebih disukai di Chrome dan akan digunakan jika ada mengalahkan
  field `name`.
* Tentukan kumpulan icon untuk layar dengan kepadatan yang berbeda-beda. Chrome akan mencoba untuk menggunakan
  ikon paling dekat dengan 48dp, misalnya, 96px pada perangkat 2x atau 144px untuk
  perangkat 3x.
* Jangan lupa untuk menyertakan ikon dengan ukuran yang masuk akal untuk splash screen
  dan jangan lupa untuk mengatur `background_color`.


Bacaan lebih lanjut:
[Penggunaan app install banner](/web/fundamentals/engage-and-retain/simplified-app-installs/)

### Elemen Add to Homescreen untuk Safari di iOS

Dalam file `index.html` Anda, tambahkan yang berikut di bagian `<head>`:


    <!-- Add to home screen untuk Safari di iOS -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-mobile-web-app-title" content="Weather App">
    <link rel="apple-touch-icon" href="images/icons/icon-152x152.png">
    

### Tile Icon untuk Windows

Dalam file `index.html` Anda, tambahkan yang berikut di bagian `<head>`:


    <meta name="msapplication-TileImage" content="images/icons/icon-144x144.png">
    <meta name="msapplication-TileColor" content="#2F3BA2">
    

### Pengujian

* Coba tambahkan aplikasi ke layar awal di Chrome di Android dan pastikan
  layar peluncuran muncul dengan benar dan ikon yang tepat digunakan.
* Cek juga Safari dan Internet Explorer untuk memastikan ikon muncul dengan benar.

<a href="https://weather-pwa-sample.firebaseapp.com/final/" >Cobalah</a>



## Deploy ke Secure Host dan Rayakan!




Langkah terakhir adalah men-deploy aplikasi cuaca ke server yang mendukung HTTPS. Jika
Anda belum memilikinya, pendekatan yang paling mudah (dan gratis) adalah dengan menggunakan
hosting konten statis dari Firebase. Ini super mudah untuk digunakan, melayani
konten melalui HTTPS dan didukung oleh CDN global.


### Kredit extra : minify dan inline CSS

Ada satu hal lagi yang harus Anda pertimbangkan, mengecilkan style kunci dan 
membuat mereka inline langsung ke `index.html`. 
[Page Speed ​​Insights](https://developers.google.com/speed) menganjurkan agar melayani 
konten yang terlipat di atas dalam 15k byte pertama dari permintaan. 

Lihatlah seberapa kecil permintaan awal yang bisa Anda dapatkan dengan mengubahnya menjadi inline. 

**Bacaan lebih lanjut:** [PageSpeed Insight 
Rules](https://developers.google.com/speed/docs/insights/rules)

### Deploy ke Firebase
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

### Pengujian

* Cobalah untuk menambahkan aplikasi ke layar rumah Anda kemudian putus jaringan dan
check apakah aplikasi bisa bekerja secara offline seperti yang diharapkan.

<a href="https://weather-pwa-sample.firebaseapp.com/final/" >Cobalah</a>


Translated By: 
{% include "_shared/contributors/abdshomad.html" %}
