project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Ada dua tipe spanduk pemasangan aplikasi: spanduk pemasangan aplikasi web dan spanduk pemasangan aplikasi asli. Keduanya memberi Anda kemampuan untuk memungkinkan pengguna dengan cepat dan mulus menambahkan aplikasi asli atau web Anda ke layar beranda tanpa meninggalkan browser.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2014-12-16 #}

# Spanduk Pemasangan Aplikasi Web {: .page-title }

{% include "web/_shared/contributors/mattgaunt.html" %}
{% include "web/_shared/contributors/paulkinlan.html" %}

<div class="attempt-right">
  <figure>
    <img src="images/add-to-home-screen.gif" alt="Spanduk pemasangan aplikasi web">
  </figure>
</div>

Ada dua tipe spanduk pemasangan aplikasi: spanduk pemasangan aplikasi **web** dan
spanduk pemasangan aplikasi [**asli**](native-app-install). Keduanya memungkinkan pengguna dengan cepat dan mulus menambahkan aplikasi asli atau web Anda ke layar beranda tanpa meninggalkan browser.

Mudah saja menambahkan spanduk pemasangan aplikasi; sebagian besar tugas berat tersebut 
ditangani Chrome. Anda perlu menyertakan file manifes aplikasi web di
situs bersama detail tentang aplikasi.

Chrome kemudian menggunakan serangkaian kriteria dan heuristik frekuensi kunjungan untuk
menentukan waktu yang tepat menampilkan spanduk. Baca terus untuk detail selengkapnya.

Note: Add to Homescreen (terkadang disingkat menjadi A2HS) adalah nama lain untuk Spanduk Pemasangan Aplikasi Web. Dua istilah itu setara.

### Apa kriterianya?

Chrome secara otomatis menampilkan spanduk bila aplikasi Anda memenuhi kriteria
berikut:

* Memiliki file [manifes aplikasi web](../web-app-manifest/) dengan:
    - sebuah `short_name` (digunakan di layar beranda)
    - sebuah `name` (digunakan di spanduk)
    - sebuah ikon png 144x144 (deklarasi ikon harus menyertakan tipe mime dari `image/png`)
    - sebuah `start_url` yang memuat
* Memiliki [service worker](/web/fundamentals/getting-started/primers/service-workers)
  yang terdaftar di situs Anda.
* Disajikan melalui [HTTPS](/web/fundamentals/security/encrypt-in-transit/why-https)
  (persyaratan untuk menggunakan service worker).
* Dikunjungi setidaknya dua kali, dengan jarak waktu setidaknya lima menit antar kunjungan.

Note: Spanduk Pemasangan Aplikasi Web adalah teknologi yang sedang berkembang. Kriteria untuk menampilkan spanduk pemasangan aplikasi dapat berubah di masa mendatang. Lihat [Apa, Sebenarnya, yang Menjadikan Sesuatu sebagai Progressive Web App?](https://infrequently.org/2016/09/what-exactly-makes-something-a-progressive-web-app/) untuk referensi kanonis (yang akan diperbarui dari waktu ke waktu) dan kriteria terbaru spanduk pemasangan aplikasi web.

### Menguji spanduk pemasangan aplikasi {: #test }

Setelah menyiapkan manifes aplikasi web, Anda perlu memvalidasi
apakah manifes telah didefinisikan dengan benar. Anda telah memperoleh dua pendekatan yang diinginkan. Yang satu
adalah manual, dan satu lagi adalah otomatis.

Untuk memicu spanduk pemasangan aplikasi secara manual:

1. Buka Chrome DevTools.
2. Masuk ke panel **Application**.
3. Masuk ke tab **Manifest**.
4. Klik **Add to homescreen**, yang disorot merah dalam tangkapan layar di bawah ini.

![Tombol Add to homescreen di DevTools](images/devtools-a2hs.png)

Lihat [Simulasikan kejadian
Add to Homescreen](/web/tools/chrome-devtools/progressive-web-apps#add-to-homescreen)
untuk bantuan selengkapnya.

Untuk pengujian otomatis spanduk pemasangan aplikasi Anda, gunakan Lighthouse. Lighthouse
adalah alat (bantu) pengauditan aplikasi web. Anda bisa menjalankannya sebagai Ekstensi Chrome atau sebagai
modul NPM. Untuk menguji aplikasi, Anda menyediakan laman khusus
untuk audit pada Lighthouse. Lighthouse menjalankan paket audit terhadap laman, kemudian
menyediakan hasil laman dalam laporan.

Dua paket audit Lighthouse di tangkapan layar di bawah ini menyatakan semua
pengujian yang dibutuhkan laman Anda untuk diteruskan guna menampilkan spanduk pemasangan aplikasi.

![Audit pemasangan aplikasi Lighthouse](images/lighthouse-a2hs.png)

Lihat [Audit Aplikasi Web dengan Lighthouse](/web/tools/lighthouse/) untuk memulai
Lighthouse.

## Kejadian spanduk pemasangan aplikasi

Chrome menyediakan mekanisme yang mudah untuk menentukan bagaimana pengguna menanggapi
spanduk pemasangan aplikasi dan bahkan membatalkan atau menundanya sampai waktu yang lebih tepat.

### Apakah pengguna memasang aplikasi?

Kejadian `beforeinstallprompt` mengembalikan promise yang disebut `userChoice` 
yang terselesaikan ketika pengguna beraksi pada prompt.  Promise 
mengembalikan sebuah objek dengan nilai `dismissed` pada atribut `outcome`
atau `accepted` jika pengguna menambahkan laman web ke layar beranda.

    window.addEventListener('beforeinstallprompt', function(e) {
      // beforeinstallprompt Event fired
      
      // e.userChoice will return a Promise. 
      // For more details read: https://developers.google.com/web/fundamentals/getting-started/primers/promises
      e.userChoice.then(function(choiceResult) {
        
        console.log(choiceResult.outcome);
        
        if(choiceResult.outcome == 'dismissed') {
          console.log('User cancelled home screen install');
        }
        else {
          console.log('User added to home screen');
        }
      });
    });
    

Ini adalah alat yang baik untuk mengetahui bagaimana pengguna berinteraksi dengan peringatan pemasangan
aplikasi.


### Menangguhkan atau membatalkan prompt

Chrome mengatur kapan memicu prompt, tapi untuk beberapa situs, ini mungkin 
tidak ideal. Anda bisa menunda prompt ke lain waktu ketika aplikasi digunakan atau 
bahkan membatalkannya. 

Ketika Chrome memutuskan untuk meminta pengguna memasang aplikasi, Anda 
bisa mencegah tindakan default tersebut dan menyimpan kejadian untuk digunakan di lain waktu. Kemudian ketika 
pengguna memiliki interaksi positif dengan situs, Anda bisa kembali memicu 
prompt dengan memanggil `prompt()` pada kejadian yang disimpan. 

This causes Chrome to show the banner and all the Promise attributes 
such as `userChoice` will be available to bind to so that you can understand 
what action the user took.
    
    var deferredPrompt;
    
    window.addEventListener('beforeinstallprompt', function(e) {
      console.log('beforeinstallprompt Event fired');
      e.preventDefault();
      
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      
      return false;
    });
    
    btnSave.addEventListener('click', function() {
      if(deferredPrompt !== undefined) {
        // The user has had a postive interaction with our app and Chrome
        // has tried to prompt previously, so let's show the prompt.
        deferredPrompt.prompt();
      
        // Follow what the user has done with the prompt.
        deferredPrompt.userChoice.then(function(choiceResult) {
      
          console.log(choiceResult.outcome);
          
          if(choiceResult.outcome == 'dismissed') {
            console.log('User cancelled home screen install');
          }
          else {
            console.log('User added to home screen');
          }
          
          // We no longer need the prompt.  Clear it up.
          deferredPrompt = null;
        });
      }
    });
    

Atau, Anda bisa membatalkan prompt dengan mencegah tindakan default.

    window.addEventListener('beforeinstallprompt', function(e) {
      console.log('beforeinstallprompt Event fired');
      e.preventDefault();
      return false;
    });
    
## Native app install banners

<div class="attempt-right">
  <figure>
     <img src="images/native-app-install-banner.gif" alt="Spanduk pemasangan aplikasi asli" style="max-height: 500px">
  </figure>
</div>

Spanduk pemasangan aplikasi asli serupa dengan [Spanduk pemasangan aplikasi web](.), namun
sebagai ganti menambahkan ke layar beranda, spanduk ini memungkinkan pengguna memasang aplikasi asli
tanpa meninggalkan situs Anda.

### Kriteria untuk menampilkan spanduk

Kriterianya serupa dengan spanduk pemasangan aplikasi web hanya saja membutuhkan
service worker. Situs Anda harus:

* Memiliki file [manifes aplikasi web](../web-app-manifest/) dengan:
  - sebuah `short_name`
  - sebuah `name` (digunakan di prompt spanduk)
  - sebuah ikon png 144x144, deklarasi ikon Anda harus menyertakan tipe MIME `image/png`
  - sebuah objek `related_applications` bersama informasi tentang aplikasi
* Disajikan melalui [HTTPS](/web/fundamentals/security/encrypt-in-transit/enable-https)
* Dikunjungi oleh pengguna dua kali, pada dua hari berbeda selama kursus
  dua minggu.

### Persyaratan manifes

Untuk mengintegrasikan ke dalam manifes, tambahkan larik `related_applications` bersama
platform `play` (untuk Google Play) dan App Id.


    "related_applications": [
      {
      "platform": "play",
      "id": "com.google.samples.apps.iosched"
      }
    ]
    

Jika Anda hanya ingin menawarkan pengguna kemampuan untuk memasang aplikasi
Android, dan tidak menampilkan spanduk pemasangan aplikasi web, maka tambahkan
`"prefer_related_applications": true`. Misalnya:


    "prefer_related_applications": true,
    "related_applications": [
      {
      "platform": "play",
      "id": "com.google.samples.apps.iosched"
      }
    ]


{# wf_devsite_translation #}
