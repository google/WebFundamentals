project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Kebanyakan browser dan perangkat memiliki akses ke lokasi geografis pengguna. Pelajari cara menggunakan lokasi pengguna di situs dan aplikasi Anda.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2014-01-01 #}

# Lokasi Pengguna {: .page-title }

{% include "web/_shared/contributors/paulkinlan.html" %}

Geolocation API memungkinkan Anda menemukan, dengan persetujuan pengguna, lokasi pengguna tersebut. Anda bisa menggunakan fungsionalitas ini untuk hal-hal seperti memandu pengguna ke tujuan mereka dan memberi geotag pada materi buatan pengguna; misalnya, menandai tempat pengambilan foto.

Geolocation API juga memungkinkan Anda mengetahui di mana pengguna berada
dan mengikutinya saat mereka bergerak, selalu dengan persetujuan pengguna (dan hanya saat laman dibuka). Ini 
menciptakan banyak kasus penggunaan yang menarik, misalnya mengintegrasikan dengan sistem backend untuk menyiapkan urutan kumpulan jika pengguna dekat dengannya.

Anda perlu mengetahui banyak hal saat menggunakan Geolocation API. Panduan ini membimbing Anda melalui beberapa kasus penggunaan umum dan solusi.

Note: Sejak Chrome 50, [Geolocation API hanya bekerja pada konteks aman (HTTPS)](/web/updates/2016/04/geolocation-on-secure-contexts-only). Jika situs Anda ditampung pada asal yang tidak aman (misalnya `HTTP`), maka semua permintaan lokasi pengguna **tidak lagi** berfungsi.

### TL;DR {: .hide-from-toc }

* Gunakan geolokasi bila bermanfaat bagi pengguna.
* Mintalah izin sebagai respons jelas pada isyarat pengguna. 
* Gunakan deteksi fitur jika browser pengguna tidak mendukung geolokasi.
* Jangan sekadar mempelajari cara mengimplementasikan geolokasi; pelajari cara terbaik untuk menggunakan geolokasi.
* Uji geolokasi bersama situs Anda.

## Kapan menggunakan geolokasi

*  Menemukan posisi pengguna yang paling dekat dengan lokasi fisik tertentu untuk menyesuaikan 
   pengalaman pengguna.
*  Menyesuaikan informasi (seperti berita) sesuai lokasi pengguna.
*  Menampilkan posisi pengguna pada peta.
*  Memberi tag pada data yang dibuat dalam aplikasi Anda dengan lokasi pengguna 
   (yaitu, memberi geotag pada gambar).

## Minta izin secara bertanggung jawab

Penelitian pengguna terbaru [menunjukkan](http://static.googleusercontent.com/media/www.google.com/en/us/intl/ALL_ALL/think/multiscreen/pdf/multi-screen-moblie-whitepaper_research-studies.pdf)
bahwa pengguna tidak percaya dengan situs yang hanya meminta pengguna untuk memberikan posisi
mereka saat pemuatan laman. Jadi, apa praktik terbaiknya?

### Asumsikan pengguna tidak memberikan lokasi mereka.

Banyak pengguna tidak mau memberikan lokasi
mereka, sehingga Anda perlu mengadopsi gaya development defensif.

1.  Tangani semua kesalahan keluar dari geolocation API sehingga Anda bisa mengadaptasikan situs
    Anda untuk kondisi ini.
2.  Bersikaplah jelas dan eksplisit tentang mengapa Anda membutuhkan lokasi pengguna.
3.  Gunakan solusi fallback jika diperlukan.

### Gunakan fallback jika diperlukan geolokasi

Kami menyarankan agar situs atau aplikasi Anda tidak memerlukan
akses ke lokasi pengguna saat ini. Akan tetapi, jika situs atau aplikasi Anda
memerlukan lokasi pengguna saat ini, ada solusi pihak ketiga yang memungkinkan Anda memperoleh
tebakan terbaik untuk lokasi orang saat ini.

Solusi ini bekerja dengan melihat alamat IP pengguna dan memetakannya
ke alamat fisik yang terdaftar dengan database RIPE. Semua lokasi ini
sering kali tidak begitu akurat, biasanya memberi Anda posisi 
hub telekomunikasi atau menara BTS yang paling dekat dengan pengguna. Dalam banyak
kasus, bahkan mungkin tidak begitu akurat, terutama jika pengguna berada pada VPN
atau layanan proxy lainnya.

### Selalu meminta akses ke lokasi pada setiap isyarat pengguna

Pastikan pengguna memahami mengapa Anda meminta lokasi mereka, dan apa
manfaat yang mereka dapatkan. Memintanya secara langsung di beranda saat 
situs sedang memuat akan menjadikan pengalaman pengguna yang buruk.

<div class="attempt-left">
  <figure>
    <img src="images/sw-navigation-good.png">
    <figcaption class="success">
      <b>LAKUKAN</b>: Selalu minta akses ke lokasi berdasarkan isyarat pengguna.
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/sw-navigation-bad.png">
    <figcaption class="warning">
      <b>JANGAN</b>: Memintanya di laman beranda saat situs sedang dimuat; hal ini akan mengakibatkan pengalaman pengguna yang buruk.
    </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

Sebagai gantinya, berikan pengguna ajakan bertindak yang jelas atau indikasi bahwa
operasi akan memerlukan akses ke lokasi mereka. Pengguna kemudian bisa lebih mudah menghubungkan peringatan sistem untuk akses dengan aksi
yang baru saja dimulai.

### Berikan indikasi yang jelas bahwa sebuah aksi akan meminta lokasi mereka

[Dalam sebuah penelitian oleh tim Google AdWords](http://static.googleusercontent.com/media/www.google.com/en/us/intl/ALL_ALL/think/multiscreen/pdf/multi-screen-moblie-whitepaper_research-studies.pdf),
ketika pengguna diminta untuk memesan kamar hotel di Boston untuk konferensi mendatang
di sebuah situs hotel tertentu, mereka langsung dikonfirmasi untuk berbagi lokasi
GPS setelah mengetuk ajakan bertindak "Find and Book" di laman beranda.

Dalam beberapa kasus, pengguna menjadi frustrasi karena tidak memahami mengapa mereka
ditunjukkan hotel di San Francisco padahal mereka ingin memesan kamar di
Boston.

Pengalaman yang lebih baik adalah memastikan pengguna memahami mengapa Anda meminta
lokasi mereka. Tambahkan penanda yang dikenal baik dan sudah umum pada banyak
perangkat, seperti pengukur jarak, atau ajakan bertindak eksplisit seperti 
“Find Near Me”.

<div class="attempt-left">
  <figure>
    <img src="images/indication.png">
    <figcaption>
      Gunakan pengukur jarak
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/nearme.png">
    <figcaption>
      Ajakan bertindak spesifik untuk Find near me  
    </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

### Mendorong pengguna dengan halus agar memberikan izin ke lokasi mereka

Anda tidak memiliki akses ke apa pun yang sedang dilakukan pengguna. Anda mengetahui
dengan persis kapan pengguna tidak memperbolehkan akses ke lokasi mereka namun Anda tidak tahu
kapan mereka memberi Anda akses; Anda hanya mengetahui bahwa Anda memperoleh akses bila ada hasil
yang muncul.

Praktik yang baik adalah "menyenggol" pengguna untuk mengambil tindakan jika
Anda ingin mereka melakukan tindakan.

Kami merekomendasikan: 

1.  Siapkan timer yang akan terpicu setelah periode singkat;
    5 detik adalah nilai yang bagus.
2.  Jika Anda mendapatkan pesan kesalahan, tampilkan pesan kepada pengguna.
3.  Jika Anda mendapatkan respons positif, nonaktifkan timer dan proses hasilnya.
4.  Jika setelah waktu tunggu Anda tidak mendapat respons positif,
    tampilkan notifikasi kepada pengguna.
5.  Jika respons datang belakangan dan notifikasi masih ada,
    buang dari layar.

<div style="clear:both;"></div>

    button.onclick = function() {
      var startPos;
      var element = document.getElementById("nudge");

      var showNudgeBanner = function() {
        nudge.style.display = "block";
      };

      var hideNudgeBanner = function() {
        nudge.style.display = "none";
      };

      var nudgeTimeoutId = setTimeout(showNudgeBanner, 5000);

      var geoSuccess = function(position) {
        hideNudgeBanner();
        // We have the location, don't display banner
        clearTimeout(nudgeTimeoutId); 

        // Do magic with location
        startPos = position;
        document.getElementById('startLat').innerHTML = startPos.coords.latitude;
        document.getElementById('startLon').innerHTML = startPos.coords.longitude;
      };
      var geoError = function(error) {
        switch(error.code) {
          case error.TIMEOUT:
            // The user didn't accept the callout
            showNudgeBanner();
            break;
      };

      navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    };

## Dukungan browser

Mayoritas browser kini mendukung Geolocation API namun kebiasaan yang baik
adalah selalu memeriksa dukungan sebelum melakukan apa pun.

Anda bisa dengan mudah memeriksa kompatibilitas dengan melakukan pengujian keberadaan
objek geolokasi:

    // check for Geolocation support
    if (navigator.geolocation) {
      console.log('Geolocation is supported!');
    }
    else {
      console.log('Geolocation is not supported for this Browser/OS.');
    }


## Menentukan lokasi pengguna saat ini

Geolocation API menawarkan metode "satu-aksi" sederhana untuk memperoleh lokasi
pengguna: `getCurrentPosition()`. Panggilan ke metode ini akan secara asinkron
melaporkan lokasi pengguna saat ini.

    window.onload = function() {
      var startPos;
      var geoSuccess = function(position) {
        startPos = position;
        document.getElementById('startLat').innerHTML = startPos.coords.latitude;
        document.getElementById('startLon').innerHTML = startPos.coords.longitude;
      };
      navigator.geolocation.getCurrentPosition(geoSuccess);
    };


Jika ini adalah pertama kalinya sebuah aplikasi pada domain meminta
izin, browser biasanya akan memeriksa persetujuan pengguna. Bergantung pada
browser, mungkin juga terdapat preferensi untuk selalu memperbolehkan&mdash;atau melarang&mdash;pencarian izin, sehingga proses konfirmasi akan dilangkahi.

Bergantung pada perangkat lokasi yang digunakan browser Anda, objek posisi
mungkin sebenarnya berisi lebih banyak dari sekadar lintang dan bujur;
misalnya, mungkin meliputi ketinggian atau arah. Anda tidak bisa
mengetahui informasi tambahan apa yang digunakan sistem lokasi hingga
data benar-benar dikembalikan.

## Mengamati lokasi pengguna

Geolocation API memungkinkan Anda untuk mendapatkan lokasi pengguna (dengan persetujuan
pengguna) dengan panggilan tunggal ke `getCurrentPosition()`.  

Jika Anda ingin terus-menerus memantau lokasi pengguna, gunakan metode Geolocation
API, `watchPosition()`. Ini beroperasi dengan cara yang hampir sama dengan
`getCurrentPosition()`, namun akan terpicu beberapa kali sebagai perangkat lunak
pemosisian:

1.  Mendapatkan penguncian yang lebih akurat pada pengguna.
2.  Menentukan apakah posisi pengguna berubah.
 

    var watchId = navigator.geolocation.watchPosition(function(position) {
      document.getElementById('currentLat').innerHTML = position.coords.latitude;
      document.getElementById('currentLon').innerHTML = position.coords.longitude;
    });

### Kapan menggunakan geolokasi untuk mengamati lokasi pengguna

*  Anda tentunya ingin mendapatkan penguncian yang lebih akurat pada lokasi pengguna.
*  Aplikasi Anda harus melakukan pembaruan antarmuka pengguna berdasarkan informasi 
   lokasi yang baru.
*  Aplikasi Anda harus perlu memperbarui logika bisnis bila pengguna memasuki zona tertentu
   yang didefinisikan.


## Praktik terbaik saat menggunakan geolokasi

### Selalu membersihkan dan menghemat baterai

Mengamati perubahan geolokasi bukanlah operasi yang gratis. Walaupun
sistem operasi mungkin memperkenalkan fitur platform untuk memungkinkan aplikasi
menghubungkan ke subsistem geografis, Anda sebagai developer web, tidak tahu dukungan apa
yang dimiliki perangkat pengguna untuk memantau lokasi pengguna, dan selagi Anda mengamati
suatu posisi, Anda melibatkan perangkat dalam banyak pemrosesan ekstra.

Setelah Anda tidak perlu lagi melacak posisi pengguna, panggil `clearWatch` untuk menonaktifkan
sistem geolokasi.

###  Tangani kesalahan dengan cara halus

Sayangnya, tidak semua pencarian lokasi berhasil. Mungkin GPS tidak
bisa ditemukan atau pengguna tiba-tiba menonaktifkan pencarian lokasi. Jika terjadi kesalahan,
argumen opsional kedua untuk `getCurrentPosition()` akan dipanggil, sehingga Anda bisa memberi tahu pengguna di dalam callback:

    window.onload = function() {
      var startPos;
      var geoSuccess = function(position) {
        startPos = position;
        document.getElementById('startLat').innerHTML = startPos.coords.latitude;
        document.getElementById('startLon').innerHTML = startPos.coords.longitude;
      };
      var geoError = function(error) {
        console.log('Error occurred. Error code: ' + error.code);
        // error.code can be:
        //   0: unknown error
        //   1: permission denied
        //   2: position unavailable (error response from location provider)
        //   3: timed out
      };
      navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    };


### Kurangi kebutuhan untuk memulai perangkat keras geolokasi

Untuk banyak kasus penggunaan, Anda tidak membutuhkan lokasi terbaru pengguna;
Anda cuma perlu perkiraan kasar.

Gunakan properti opsional `maximumAge` untuk memberi tahu browser agar menggunakan
hasil geolokasi yang baru diperoleh. Hal ini tidak hanya mengembalikan lebih cepat jika pengguna telah
meminta data sebelumnya, namun juga mencegah browser memulai
antarmuka perangkat keras geolokasinya seperti triangulasi WiFi atau GPS.

    window.onload = function() {
      var startPos;
      var geoOptions = {
        maximumAge: 5 * 60 * 1000,
      }

      var geoSuccess = function(position) {
        startPos = position;
        document.getElementById('startLat').innerHTML = startPos.coords.latitude;
        document.getElementById('startLon').innerHTML = startPos.coords.longitude;
      };
      var geoError = function(error) {
        console.log('Error occurred. Error code: ' + error.code);
        // error.code can be:
        //   0: unknown error
        //   1: permission denied
        //   2: position unavailable (error response from location provider)
        //   3: timed out
      };

      navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
    };


### Jangan biarkan pengguna menunggu, atur waktu tunggu

Kecuali jika Anda telah menyetel waktu tunggu, permintaan posisi saat ini mungkin tidak akan pernah kembali.


    window.onload = function() {
      var startPos;
      var geoOptions = {
         timeout: 10 * 1000
      }

      var geoSuccess = function(position) {
        startPos = position;
        document.getElementById('startLat').innerHTML = startPos.coords.latitude;
        document.getElementById('startLon').innerHTML = startPos.coords.longitude;
      };
      var geoError = function(error) {
        console.log('Error occurred. Error code: ' + error.code);
        // error.code can be:
        //   0: unknown error
        //   1: permission denied
        //   2: position unavailable (error response from location provider)
        //   3: timed out
      };

      navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
    };


### Utamakan lokasi kasar daripada lokasi yang sangat detail

Jika Anda ingin menemukan toko terdekat dengan pengguna, kemungkinan Anda tidak membutuhkan
tingkat presisi 1 meter. API ini dirancang untuk memberikan lokasi 
kasar yang dikembalikan secepat mungkin.

Jika Anda membutuhkan presisi tingkat tinggi, boleh saja mengganti setelan default
dengan opsi `enableHighAccuracy`. Gunakan ini sesekali: hal ini lebih lambat
diatasi dan menggunakan baterai lebih banyak.

    window.onload = function() {
      var startPos;
      var geoOptions = {
        enableHighAccuracy: true
      }

      var geoSuccess = function(position) {
        startPos = position;
        document.getElementById('startLat').innerHTML = startPos.coords.latitude;
        document.getElementById('startLon').innerHTML = startPos.coords.longitude;
      };
      var geoError = function(error) {
        console.log('Error occurred. Error code: ' + error.code);
        // error.code can be:
        //   0: unknown error
        //   1: permission denied
        //   2: position unavailable (error response from location provider)
        //   3: timed out
      };

      navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
    };


## Emulasikan geolokasi dengan Chrome DevTools {: #devtools }

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/sensors-drawer.png" class="screenshot">
  </figure>
</div>

Setelah menyiapkan geolokasi, Anda perlu:

* Uji cara kerja aplikasi Anda di beberapa geolokasi berbeda.
* Verifikasi apakah aplikasi Anda mengalami degradasi secara halus bila geolokasi tidak tersedia.

Anda bisa melakukan keduanya dari Chrome DevTools.

[Buka Chrome DevTools](/web/tools/chrome-devtools/#open) kemudian
[buka Console Drawer](/web/tools/chrome-devtools/console/#open_as_drawer).

[Buka menu Console Drawer](/web/tools/chrome-devtools/settings#drawer-tabs)
dan klik opsi **Sensors** untuk menampilkan Sensors Drawer.

Dari sini Anda bisa mengganti lokasi ke kota besar preset,
memasukkan lokasi khusus, atau menonaktifkan geolokasi dengan menyetel penggantian
ke **Location unavailable**.


{# wf_devsite_translation #}
