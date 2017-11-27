project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Beralih ke layar penuh.

{# wf_updated_on: 2017-10-06 #}
{# wf_published_on: 2016-10-01 #}

# Membuat Pengalaman Layar Penuh {: .page-title }

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="ZRqr5x73-ng"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Kita memiliki kemampuan untuk membuat aplikasi dan situs web layar penuh
yang mendalam, namun sebagaimana hal lain di web, ada dua cara untuk melakukannya.
Hal ini khususnya penting karena semakin banyak browser yang mendukung pengalaman "aplikasi web
terpasang" yang membuka layar penuh.

<div class="clearfix"></div>

## Menyajikan aplikasi atau situs Anda dalam layar penuh

Ada sejumlah cara yang bisa dipilih pengguna atau developer bisa mendapatkan aplikasi web dengan layar penuh.

* Mintalah browser membuka layar penuh sebagai respons terhadap isyarat pengguna.
* Pasang aplikasi ke layar beranda.
* Palsukan: sembunyikan bilah alamat secara otomatis.

### Mintalah browser membuka layar penuh sebagai respons terhadap isyarat pengguna

<a href="http://caniuse.com/#feat=fullscreen">Tidak semua platform sama</a>.
iOS Safari tidak memiliki API layar penuh, namun kita melakukannya di Chrome pada Android,
Firefox, dan IE 11+. Sebagian besar aplikasi yang Anda bangun akan menggunakan kombinasi
JS API dan pemilih CSS yang disediakan oleh spesifikasi layar penuh. JS API
utama yang perlu Anda perhatikan saat membangun pengalaman layar penuh adalah:

* `element.requestFullscreen()` (saat ini menjadi awalan di Chrome, Firefox, dan IE)
  menampilkan elemen dalam mode layar penuh.
* `document.exitFullscreen()` (saat ini menjadi awalan di Chrome, Firefox dan IE.
  Firefox menggunakan `cancelFullScreen()` sebagai gantinya) membatalkan mode layar penuh.
* `document.fullscreenElement` (saat ini menjadi awalan di Chrome, Firefox dan IE)
  mengembalikan true jika ada elemen dalam mode layar penuh.

Note: Anda akan melihat bahwa dalam versi berawalan ada banyak
      inkonsistensi di antara casing 'S' di layar. Ini janggal, namun
      inilah masalah yang terjadi pada spesifikasi saat ini.

Bila aplikasi Anda menggunakan layar penuh, Anda tidak lagi memiliki
kontrol UI yang tersedia pada browser. Ini mengubah cara interaksi pengguna dengan
pengalaman Anda. Mereka tidak memiliki kontrol navigasi standar seperti Maju
dan Mundur; mereka tidak memiliki pintu melarikan diri yang berupa tombol Segarkan.  Hal itu penting
disediakan untuk skenario ini.  Anda bisa menggunakan beberapa pemilih CSS untuk membantu Anda
mengubah gaya dan presentasi situs bila browser memasuki
mode layar penuh.

    <button id="goFS">Go fullscreen</button>
    <script>
      var goFS = document.getElementById("goFS");
      goFS.addEventListener("click", function() {
          document.body.requestFullscreen();
      }, false);
    </script>

Contoh di atas sedikit rumit; saya telah menyembunyikan semua kompleksitas seputar
penggunaan awalan vendor.

Note: Huh, awalan vendor memang merepotkan!

Kode sesungguhnya jauh lebih kompleks. <a
href="https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Using_full_screen_mode">Mozilla
telah membuat</a> skrip sangat berguna yang bisa Anda gunakan untuk beralih layar penuh.  Seperti
yang bisa Anda lihat, situasi awalan vendor kompleks dan
merepotkan dibandingkan API yang ditetapkan. Bahkan dengan kode yang sedikit disederhanakan
di bawah ini, masih saja kompleks.

    function toggleFullScreen() {
      var doc = window.document;
      var docEl = doc.documentElement;

      var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
      var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

      if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullScreen.call(docEl);
      }
      else {
        cancelFullScreen.call(doc);
      }
    }

Kita para developer web membenci kerumitan.  API abstrak tingkat tinggi yang bagus yang bisa Anda gunakan
adalah modul <a
href="https://github.com/sindresorhus/screenfull.js">Screenfull.js</a> dari <a href="http://sindresorhus.com/screenfull.js"/>Sindre Sorhus</a> yang
menyatukan dua JS API yang sedikit berbeda dan awalan vendor menjadi satu
API yang konsisten.

#### Tips API Layar Penuh

##### Membuat dokumen layar penuh

<figure class="attempt-right" style="max-width: 320px;">
  <img src="images/body.png">
  <figcaption>Gambar 1: Layar penuh di elemen body.</figcaption>
</figure>


Wajar bila berpikiran bahwa Anda membuat elemen body jadi layar penuh, namun jika Anda
sedang di mesin rendering berbasis WebKit atau Blink, Anda akan melihat bahwa ia memiliki efek ganjil berupa
penyusutan lebar tubuh ke ukuran yang sekecil mungkin yang akan berisi semua
materi. (Mozilla Gecko boleh juga.)

<div class="clearfix"></div>

<figure class="attempt-right" style="max-width: 320px;">
<img src="images/document.png" >
<figcaption>Gambar 2: Layar penuh di elemen document.</figcaption>
</figure>

Untuk memperbaikinya, gunakan elemen document sebagai ganti elemen body:

    document.documentElement.requestFullscreen();



<div class="clearfix"></div>


##### Membuat elemen video layar penuh

Untuk membuat elemen video layar penuh persis sama dengan membuat
elemen lain layar penuh. Anda panggil metode `requestFullscreen` pada
elemen video.

    <video id=videoElement></video>
    <button id="goFS">Go Fullscreen</button>
    <script>
      var goFS = document.getElementById("goFS");
      goFS.addEventListener("click", function() {
          var videoElement = document.getElementById("videoElement");
          videoElement.requestFullscreen();
      }, false);
    </script>

Jika elemen `<video>` Anda belum didefinisikan atribut kontrolnya,
tidak ada cara bagi pengguna untuk mengontrol video setelah di layar penuh. Cara
yang disarankan untuk melakukannya adalah memiliki kontainer dasar yang membungkus video dan
kontrol yang Anda inginkan untuk dilihat pengguna.

    <div id="container">
      <video></video>
      <div>
        <button>Play</button>
        <button>Stop</button>
        <button id="goFS">Go fullscreen</button>
      </div>
    </div>
    <script>
      var goFS = document.getElementById("goFS");
      goFS.addEventListener("click", function() {
          var container = document.getElementById("container");
          container.requestFullscreen();
      }, false);
    </script>

Ini akan memberi Anda fleksibilitas lebih besar karena Anda bisa mengombinasikan objek
kontainer dengan pemilih semu CSS (misalnya untuk menyembunyikan tombol "goFS".)

    <style>
      #goFS:-webkit-full-screen #goFS {
        display: none;
      }
      #goFS:-moz-full-screen #goFS {
        display: none;
      }
      #goFS:-ms-fullscreen #goFS {
        display: none;
      }
      #goFS:fullscreen #goFS {
        display: none;
      }
    </style>

Dengan pola ini, Anda bisa mendeteksi kapan layar penuh dijalankan dan mengadaptasikan
antarmuka pengguna dengan semestinya, misalnya:

* Dengan menyediakan tautan kembali ke laman mulai
* Dengan menyediakan mekanisme untuk menutup dialog atau bergerak mundur


### Meluncurkan laman layar penuh dari layar beranda

Tidak bisa meluncurkan laman web layar penuh saat pengguna membukanya.
Vendor browser sangat mengetahui bahwa pengalaman layar penuh pada setiap pemuatan laman
sangatlah mengganggu, karena itu diperlukan isyarat pengguna untuk memasuki layar penuh.
Walaupun vendor memperbolehkan pengguna "memasang" aplikasi, dan tindakan memasang merupakan
pertanda ke sistem operasi bahwa pengguna ingin meluncurkan sebagai aplikasi pada
platform tersebut.

Di seluruh platform seluler utama sangatlah mudah mengimplementasikan menggunakan
tag meta, atau file manifes seperti berikut.

#### iOS

Sejak peluncuran iPhone, pengguna dapat memasang Aplikasi Web ke
layar beranda dan meluncurkannya sebagai aplikasi web layar penuh.

    <meta name="apple-mobile-web-app-capable" content="yes">

> Jika materi disetel ke yes, aplikasi web akan dijalankan dalam mode layar penuh;
> jika tidak maka tidak dluncurkan dalam layar penuh. Perilaku default adalah menggunakan Safari untuk menampilkan
> materi web. Anda bisa menentukan apakah laman web ditampilkan dalam mode layar penuh atau tidak
> dengan menggunakan properti JavaScript Boolean hanya-baca window.navigator.standalone.
> <a href="https://developer.apple.com/library/safari/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html">Apple</a>

#### Chrome untuk Android

Tim Chrome baru saja mengimplementasikan sebuah fitur yang memberi tahu browser untuk
meluncurkan laman dalam layar penuh bila pengguna telah menambahkannya ke layar beranda.  Ini serupa
dengan model Safari iOS.

    <meta name="mobile-web-app-capable" content="yes">

> Anda bisa menyiapkan aplikasi web agar menambahkan ikon pintasan aplikasi ke
> layar beranda perangkat, dan agar aplikasi diluncurkan dalam "mode aplikasi" layar penuh dengan menggunakan
> item menu "Add to Home screen" di Chrome untuk Android.
>  <a href="https://developers.chrome.com/multidevice/android/installtohomescreen">Google Chrome</a>

Opsi yang lebih baik untuk menggunakan Manifes Aplikasi Web.

#### Manifes Aplikasi Web (Chrome, Opera, Firefox, Samsung)

[Manifes untuk aplikasi web](/web/fundamentals/web-app-manifest)
adalah file JSON sederhana yang memberi Anda, sebagai
developer, kemampuan mengontrol bagaimana aplikasi Anda muncul pada pengguna di berbagai area
yang mereka harapkan untuk melihat aplikasi (misalnya layar beranda seluler), mengarahkan
apa yang bisa diluncurkan pengguna dan, yang lebih penting, cara mereka meluncurkannya. Di masa mendatang,
manifes akan memberi Anda kontrol lebih besar atas aplikasi, namun untuk saat ini
kita cuma memfokuskan pada cara meluncurkan aplikasi Anda. Khususnya:

1. Memberi tahu browser tentang manifes Anda
2. Menjelaskan cara meluncurkan

Setelah Anda membuat manifes dan ditampung pada situs, Anda tinggal
menambahkan sebuah tag tautan dari semua laman yang mencakup aplikasi Anda, seperti berikut:

    <link rel="manifest" href="/manifest.json">

Chrome telah mendukung Manifes sejak versi 38 untuk Android (Oktober 2014)
dan ini memberi Anda kontrol atas cara menampilkan aplikasi web bila dipasang
ke layar beranda (lewat properti `short_name`, `name`, dan `icons`) dan cara
meluncurkannya bila pengguna mengeklik ikon peluncuran (lewat `start_url`,
`display` dan `orientation`).

Manifes contoh ditampilkan di bawah ini. Ini tidak menampilkan semua hal yang bisa dilakukan di
manifes.

    {
      "short_name": "Kinlan's Amaze App",
      "name": "Kinlan's Amazing Application ++",
      "icons": [
        {
          "src": "launcher-icon-4x.png",
          "sizes": "192x192",
          "type": "image/png"
        }
      ],
      "start_url": "/index.html",
      "display": "standalone",
      "orientation": "landscape"
    }

Fitur ini sepenuhnya progresif dan memungkinkan Anda membuat pengalaman yang lebih baik dan lebih
terintegrasi untuk pengguna browser yang mendukung fitur ini.

Bila pengguna menambahkan situs atau aplikasi Anda ke layar beranda, berarti ada maksud dari
pengguna untuk memperlakukannya seperti aplikasi. Ini berarti Anda harus berusaha mengarahkan pengguna ke
fungsionalitas aplikasi Anda, bukan laman landas produk. Misalnya,
jika pengguna diharuskan masuk ke aplikasi Anda, maka itu merupakan laman yang bagus
untuk diluncurkan.

##### Aplikasi utilitas

Mayoritas aplikasi utilitas akan langsung merasakan manfaatnya. Untuk aplikasi itu
Anda mungkin ingin meluncurkannya secara mandiri persis seperti aplikasi lainnya
di platform seluler. Untuk memberi tahu aplikasi agar diluncurkan secara mandiri, tambahkan
Manifes Aplikasi Web ini:

    "display": "standalone"

##### Game

Mayoritas game akan merasakan langsung manfaat manifes. Mayoritas
game ingin meluncurkan layar penuh dan memaksakan
orientasi tertentu.

Jika Anda mengembangkan penggulir vertikal atau game seperti Flappy Birds maka Anda
kemungkinan besar ingin game Anda selalu dalam mode potret.

    "display": "fullscreen",
    "orientation": "portrait"

Di sisi lain, jika Anda membangun puzzler atau game seperti X-Com, maka Anda
barangkali ingin agar game selalu menggunakan orientasi lanskap.

    "display": "fullscreen",
    "orientation": "landscape"

##### Situs berita

Situs berita pada umumnya merupakan pengalaman berbasis materi murni. Sebagian besar developer
secara alami tidak akan berpikir menambahkan manifes ke situs berita.  Manifes
akan memungkinkan Anda mendefinisikan apa yang akan diluncurkan (laman depan situs berita Anda) dan
cara meluncurkannya (layar penuh atau berupa tab browser biasa).

Pilihan tergantung Anda dan bagaimana menurut Anda akses ke pengalaman yang
disukai pengguna Anda. Jika ingin situs Anda menyuruh semua chrome browser melakukan
seperti apa yang Anda harapkan untuk situs tersebut, Anda bisa menyetel tampilan ke `browser`.

    "display": "browser"

Jika Anda ingin situs berita terasa seperti mayoritas aplikasi berita-sentris memperlakukan
pengalamannya sebagai aplikasi dan membuang semua chrome seperti-web dari UI, Anda bisa
melakukannya dengan menyetel tampilan ke `standalone`.

    "display": "standalone"

### Palsukan: sembunyikan bilah alamat secara otomatis

Anda bisa "memalsukan layar penuh" dengan menyembunyikan secara otomatis bilah alamat seperti berikut:

    window.scrollTo(0,1);

Perhatian: Saya memberi tahu Anda sebagai teman. Ini benar adanya. Ini adalah
         cara pintas. Jangan gunakan. &mdash; Paul

Ini adalah metode yang sangat sederhana, laman dimuat dan bilah browser disuruh
menyingkir. Sayangnya, hal ini tidak terstandardisasi dan tidak
didukung dengan baik. Anda juga harus mengatasi banyak quirks.

Misalnya, browser sering kali memulihkan posisi pada laman bila pengguna
mengarah kembali ke laman tersebut. Penggunaan `window.scrollTo` akan menggantikannya, sehingga mengganggu
pengguna. Untuk mengatasinya, Anda harus menyimpan posisi terakhir di
localStorage, dan menangani kasus ekstrem (misalnya, jika pengguna membuka
laman di beberapa jendela sekaligus).

## Panduan UX

Bila Anda sedang membangun situs yang memanfaatkan layar penuh, ada
sejumlah perubahan potensial pada pengalaman pengguna yang perlu Anda ketahui
agar dapat membangun layanan yang akan disukai pengguna Anda.

### Jangan mengandalkan kontrol navigasi

iOS tidak memiliki tombol kembali perangkat keras atau isyarat untuk menyegarkan. Karena itu Anda harus
memastikan bahwa pengguna bisa menyusuri aplikasi tanpa menjadi terkunci di dalamnya.

Anda bisa mendeteksi dengan mudah apakah menjalankan dalam mode layar penuh atau mode terpasang
pada semua platform utama.

#### iOS

Di iOS, Anda bisa menggunakan boolean `navigator.standalone` untuk mengetahui apakah pengguna
meluncurkan dari layar beranda atau tidak.

    if(navigator.standalone == true) {
      // My app is installed and therefore fullscreen
    }

#### Manifes Aplikasi Web (Chrome, Opera, Samsung)

Saat meluncurkan sebagai aplikasi terpasang, Chrome tidak dijalankan dalam
pengalaman layar penuh sesungguhnya sehingga `document.fullscreenElement` mengembalikan null dan pemilih CSS
tidak bekerja.

Bila pengguna meminta layar penuh lewat isyarat di situs Anda, API layar penuh
standar akan tersedia, termasuk pemilih semu CSS yang memungkinkan Anda
mengadaptasikan UI untuk bereaksi terhadap keadaan layar penuh seperti berikut

    selector:-webkit-full-screen {
      display: block; // displays the element only when in fullscreen
    }

    selector {
      display: none; // hides the element when not in fullscreen mode
    }

Jika pengguna meluncurkan situs Anda dari layar beranda, kueri media `display-mode` akan
disetel ke apa yang telah didefinisikan dalam Manifes Aplikasi Web. Jika berupa
layar penuh murni, maka menjadi:

    @media (display-mode: fullscreen) {

    }

Jika pengguna meluncurkan aplikasi dalam mode mandiri, kueri media `display-mode`
akan menjadi `standalone`:

    @media (display-mode: standalone) {

    }


#### Firefox

Bila pengguna meminta layar penuh lewat situs Anda atau pengguna meluncurkan
aplikasi dalam mode layar penuh, semua API layar penuh standar akan tersedia,
termasuk pemilih semu CSS yang memungkinkan Anda mengadaptasikan UI untuk
bereaksi terhadap keadaan layar penuh seperti berikut:

    selector:-moz-full-screen {
      display: block; // hides the element when not in fullscreen mode
    }

    selector {
      display: none; // hides the element when not in fullscreen mode
    }

#### Internet Explorer

Di IE, kelas semu CSS tidak memiliki tanda hubung, namun bekerja mirip dengan
Chrome dan Firefox.

    selector:-ms-fullscreen {
      display: block;
    }

    selector {
      display: none; // hides the element when not in fullscreen mode
    }

#### Spesifikasi

Ejaan dalam spesifikasi sama dengan sintaks yang digunakan oleh IE.

    selector:fullscreen {
      display: block;
    }

    selector {
      display: none; // hides the element when not in fullscreen mode
    }

### Pertahankan pengguna dalam pengalaman layar penuh

Kadang-kadang API layar penuh bisa sedikit bertele-tele. Vendor browser tidak ingin
mengunci pengguna di laman layar penuh sehingga mereka mengembangkan mekanisme untuk
meninggalkan layar penuh sesegera mungkin.  Ini berarti Anda tidak bisa membangun
situs web layar penuh yang mencakup beberapa laman sekaligus karena:

* Mengubah URL lewat program dengan menggunakan `window.location =
  "http://example.com"` akan keluar dari layar penuh.
* Pengguna yang mengeklik tautan eksternal di dalam laman Anda akan keluar dari layar penuh.
* Mengubah URL lewat `navigator.pushState` API juga akan mengeluarkan dari
  pengalaman layar penuh.

Anda memiliki dua opsi jika ingin mempertahankan pengguna dalam pengalaman layar penuh:

1. Gunakan mekanisme aplikasi web yang dapat dipasang untuk beralih ke layar penuh.
2. Kelola UI dan status aplikasi Anda dengan menggunakan fragmen # .

Dengan menggunakan #syntax untuk memperbarui URL (window.location = "#somestate"), dan
mendengarkan kejadian `window.onhashchange` Anda bisa menggunakan tumpukan riwayat
browser sendiri untuk mengelola perubahan dalam status aplikasi, memperbolehkan pengguna menggunakan
tombol kembali perangkat keras, atau menawarkan pengalaman tombol kembali terprogram yang sederhana
dengan menggunakan History API seperti berikut:

    window.history.go(-1);

### Biarkan pengguna memilih kapan beralih ke layar penuh

Tidak ada yang lebih mengganggu pengguna daripada situs web yang melakukan sesuatu yang
tidak diharapkan. Bila pengguna mengarahkan ke situs Anda, jangan mencoba dan menipu mereka ke dalam
layar penuh.

Jangan mencegat kejadian sentuh pertama dan memanggil `requestFullscreen()`.

1. Ini mengganggu.
2. Browser dapat memutuskan untuk mengonfirmasi pengguna pada suatu saat nanti tentang
   memperbolehkan aplikasi menggunakan layar penuh.

Jika Anda ingin meluncurkan aplikasi layar penuh, pikirkan penggunaan
pengalaman pemasangan untuk setiap platform.

### Jangan mengirimkan spam kepada pengguna untuk memasang aplikasi Anda ke layar beranda

Jika Anda berencana menawarkan pengalaman layar penuh lewat mekanisme aplikasi yang dipasang
pertimbangkan perasaan pengguna.

* Bersikaplah bijak. Gunakan spanduk atau footer untuk memberi tahu bahwa mereka bisa memasang
  aplikasi.
* Jika mereka menutup konfirmasi, jangan tampilkan lagi.
* Pada kunjungan pertama pengguna, mereka kemungkinan tidak ingin memasang aplikasi, kecuali jika
  mereka senang dengan layanan Anda. Pertimbangkan meminta konfirmasi mereka untuk memasang setelah
  interaksi yang positif di situs Anda.
* Jika pengguna mengunjungi situs Anda secara rutin dan mereka tidak memasang aplikasi, mereka
  kemungkinan tidak memasang aplikasi Anda di masa mendatang. Jangan mengirimkan spam kepada  mereka terus-menerus.

## Kesimpulan

Walaupun kita tidak memiliki API terstandardisasi dan diimplementasikan penuh, dengan menggunakan sebagian
panduan yang diberikan dalam artikel ini Anda bisa dengan mudah membangun pengalaman yang
memanfaatkan keseluruhan layar pengguna, tanpa bergantung pada klien.


{# wf_devsite_translation #}
