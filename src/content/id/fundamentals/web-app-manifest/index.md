project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Manifes aplikasi web adalah file JSON yang memberikan Anda kemampuan untuk mengontrol bagaimana aplikasi web atau situs terlihat oleh pengguna di daerah yang mereka harap akan melihat aplikasi asli (misalnya, layar beranda perangkat), mengarahkan apa yang bisa diluncurkan pengguna, dan menentukan tampilannya pada saat peluncuran.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-02-11 #}

# Manifes Aplikasi Web {: .page-title }

{% include "web/_shared/contributors/mattgaunt.html" %}
{% include "web/_shared/contributors/paulkinlan.html" %}

[Manifes aplikasi web](https://developer.mozilla.org/en-US/docs/Web/Manifest) adalah file JSON sederhana yang memberikan Anda, developer, kemampuan untuk mengontrol bagaimana aplikasi terlihat oleh pengguna di daerah yang mereka harap akan melihat aplikasi (misalnya, layar beranda perangkat seluler), mengarahkan apa yang bisa diluncurkan pengguna, dan menentukan tampilannya pada saat peluncuran.

Manifes aplikasi web menyediakan kemampuan untuk menyimpan bookmark situs ke layar beranda perangkat. Ketika sebuah situs diluncurkan dengan cara ini: 

* Situs akan memiliki ikon dan nama yang unik sehingga pengguna bisa membedakannya dari situs yang lain.
* Situs akan menampilkan sesuatu kepada pengguna selagi sumber daya diunduh atau dipulihkan dari cache.
* Situs akan menyediakan karakteristik tampilan default ke browser untuk menghindari transisi yang terlalu mendadak bila sumber daya situs tersedia. 

Semua ini dilakukan melalui mekanisme sederhana dari metadata dalam file teks. Itulah manifes aplikasi web.

Note: Meskipun Anda bisa menggunakan manifes aplikasi web di situs mana pun, semua itu diperlukan untuk [aplikasi web progresif](/web/progressive-web-apps/).

### TL;DR {: .hide-from-toc }
- Membuat manifes dan menautkannya ke laman adalah proses sederhana.
- Kontrol apa yang dilihat pengguna saat meluncurkan dari layar beranda.
- Antara lain hal-hal seperti layar pembuka, warna tema, bahkan URL yang dibuka. 

## Buat manifes

Sebelum mendalami detail manifes aplikasi web, mari kita buat manifes
dasar dan menautkan laman web ke situ.

Anda bisa memanggil manifes kapan pun Anda membutuhkannya. Kebanyakan orang menggunakan `manifest.json`. Inilah contohnya:


    {
      "short_name": "AirHorner",
      "name": "Kinlan's AirHorner of Infamy",
      "icons": [
        {
          "src": "launcher-icon-1x.png",
          "type": "image/png",
          "sizes": "48x48"
        },
        {
          "src": "launcher-icon-2x.png",
          "type": "image/png",
          "sizes": "96x96"
        },
        {
          "src": "launcher-icon-4x.png",
          "type": "image/png",
          "sizes": "192x192"
        }
      ],
      "start_url": "index.html?launcher=true"
    }
    

Pastikan untuk menyertakan yang berikut ini: 

* Sebuah `short_name` untuk digunakan sebagai teks di layar beranda pengguna.  
* Sebuah `name` untuk digunakan di spanduk Pemasangan Aplikasi Web.  
  

## Beri tahu browser tentang manifes Anda

Bila telah membuat manifes dan sudah ada di situs Anda, tambahkan
tag `link` ke semua laman yang mencakup aplikasi web Anda, seperti berikut:


    <link rel="manifest" href="/manifest.json">
  
## Setel sebuah URL mulai

Jika Anda tidak menyediakan `start_url`, maka laman saat ini akan digunakan,
yang mungkin saja bukan yang diinginkan pengguna. Namun itu bukan satu-satunya alasan untuk
menyertakannya. Karena Anda sekarang bisa mendefinisikan cara meluncurkan aplikasi, tambahkan parameter string
kueri ke `start_url` yang menunjukkan cara meluncurkannya. 

    "start_url": "/?utm_source=homescreen"

Ini bisa berupa apa saja yang Anda inginkan; nilai yang kami gunakan memiliki keuntungan karena bermakna bagi Google Analytics.
 

## Sesuaikan berbagai ikon

<figure class="attempt-right">
  <img src="images/homescreen-icon.png" alt="Menambahkan ke Ikon Layar Utama">
  <figcaption>Menambahkan ke Ikon Layar Utama</figcaption>
</figure>

 Ketika pengguna menambahkan situs ke layar beranda mereka, Anda bisa menetapkan set ikon untuk digunakanbrowser. Anda bisa mendefinisikannya bersama tipe dan ukuran, seperti berikut:

<div style="clear:both;"></div>

    "icons": [{
        "src": "images/touch/icon-128x128.png",
        "type": "image/png",
        "sizes": "128x128"
      }, {
        "src": "images/touch/apple-touch-icon.png",
        "type": "image/png",
        "sizes": "152x152"
      }, {
        "src": "images/touch/ms-touch-icon-144x144-precomposed.png",
        "type": "image/png",
        "sizes": "144x144"
      }, {
        "src": "images/touch/chrome-touch-icon-192x192.png",
        "type": "image/png",
        "sizes": "192x192"
      }],
    

Note: Saat menyimpan sebuah ikon ke layar beranda, Chrome terlebih dahulu akan mencari ikon yang cocok dengan kepadatan tampilan dan mengubah ukurannya ke kepadatan layar 48 dp. Jika tidak ada yang ditemukan, Chrome akan menelusuri ikon yang paling cocok dengan karakteristik perangkat. Jika, karena alasan apa pun, Anda ingin spesifik dalam menargetkan ikon pada kepadatan piksel-tertentu, Anda bisa menggunakan anggota opsional <code>density</code>, yang mengambil sebuah angka. Bila Anda tidak mendeklarasikan kepadatan, nilai defaultnya adalah 1.0. Ini berarti "gunakan ikon ini untuk kepadatan layar 1.0 ke atas", itulah yang biasanya Anda inginkan.

## Tambahkan layar pembuka

<figure class="attempt-right">
  <img src="images/background-color.gif" alt="warna latar belakang">
  <figcaption>Warna latar belakang untuk layar peluncuran</figcaption>
</figure>

Ketika Anda menjalankan aplikasi web dari layar utama, sejumlah hal terjadi di belakang
layar:

1. Chrome dijalankan.
2. Renderer yang menampilkan laman dijalankan.
3. Situs Anda memuat dari jaringan (atau dari cache jika memiliki service worker).

Saat ini terjadi, layar menjadi putih dan seperti terhenti.
Hal ini sangat jelas jika Anda memuat laman web dari jaringan dan 
memerlukan waktu lebih dari satu atau dua detik untuk menampilkan materi di laman beranda.

Untuk menyediakan pengalaman pengguna yang lebih baik, Anda bisa mengganti layar putih dengan judul, warna, dan gambar. 

### Setel gambar dan judul

Jika mengikuti dari awal, berarti Anda sudah menyetel gambar dan judul. Chrome menduga gambar dan judul dari anggota manifes tertentu. Yang penting di sini adalah mengetahui secara spesifik. 

Gambar layar pembuka gambar digambar dari larik `icons`. Chrome memilih gambar yang paling mendekati 128dp untuk perangkat. Judul diambil langsung dari anggota `name`.

### Setel warna latar belakang 

Menetapkan warna latar belakang menggunakan properti `background_color`
 yang diberi nama dengan tepat. Chrome menggunakan warna ini begitu aplikasi web diluncurkan
dan warnanya akan tetap di layar hingga render pertama aplikasi web.

Untuk menyetel warna latar belakang, setel yang berikut ini di manifes Anda:


    "background_color": "#2196F3",
    

Sekarang, tidak ada layar putih yang muncul saat situs Anda diluncurkan dari layar beranda.

Nilai disarankan yang bagus untuk properti ini adalah warna latar belakang dari laman muat.  Penggunaan warna yang sama seperti pemuatan laman memungkinkan transisi mulus dari
layar pembuka ke laman beranda.

### Setel warna tema

Tetapkan warna tema menggunakan properti `theme_color`. Properti ini
menetapkan warna bilah alat. Untuk hal ini, kami juga menyarankan duplikasi warna
yang ada, khususnya `theme-color` `<meta>`.


## Setel gaya peluncuran

<figure class="attempt-right">
  <img src="images/manifest-display-options.png" alt="web-app-capable">
  <figcaption>Opsi Tampilan Manifes</figcaption>
</figure>

Menggunakan manifes aplikasi web untuk mengontrol tipe tampilan dan orientasi laman.

### Sesuaikan tipe tampilan

Anda bisa membuat aplikasi web menyembunyikan UI browser dengan menyetel tipe `display` ke `standalone`:


    "display": "standalone"
    

Jika menurut Anda pengguna akan lebih suka menampilkan laman sebagai situs normal dalam browser, Anda bisa menyetel tipe `display` ke `browser`:


    "display": "browser"
    
<div style="clear:both;"></div>

### Tetapkan orientasi awal laman

<figure class="attempt-right">
  <img src="images/manifest-orientation-options.png" alt="Opsi Orientasi Manifes Aplikasi Web">
  <figcaption>Opsi Orientasi Manifes Aplikasi Web</figcaption>
</figure>

Anda bisa memberlakukan orientasi khusus, yang menguntungkan aplikasi 
yang hanya berfungsi dalam satu orientasi, seperti game, misalnya. Gunakan ini 
secara selektif. Pengguna lebih suka memilih orientasi.


    "orientation": "landscape"

<div style="clear:both;"></div>
    

## Sediakan warna tema tingkat-situs

<figure class="attempt-right">
  <img src="images/theme-color.png" alt="warna latar belakang">
  <figcaption>Warna tema</figcaption>
</figure>

Chrome memperkenalkan konsep warna tema untuk situs Anda pada tahun 2014. Warna tema
merupakan petunjuk dari laman web yang memberi tahu browser tentang warna yang dipakai untuk mewarnai
[elemen UI seperti bilah alamat](/web/fundamentals/design-and-ux/browser-customization/).  

Tanpa manifes, Anda harus menentukan warna tema pada setiap laman, dan jika 
Anda memiliki situs yang besar atau situs lawas, membuat perubahan ke seluruh situs bukan pekerjaan yang mudah.

<div style="clear:both;"></div>

Tambahkan atribut `theme_color` ke manifes Anda, dan ketika situs tersebut diluncurkan
dari layar beranda setiap laman di domain, itu akan secara otomatis mendapatkan warna tema.



    "theme_color": "#2196F3"
    

<figure>
  <img src="images/manifest-display-options.png" alt="warna latar belakang">
  <figcaption>Warna tema seluruh situs</figcaption>
</figure>

## Uji manifes Anda {: #test }

Jika Anda ingin secara manual memverifikasi apakah manifes aplikasi web telah disiapkan dengan benar,
gunakan tab **Manifest** di panel **Application** pada Chrome DevTools.

![Tab Manifest pada Chrome DevTools](images/devtools-manifest.png)

Tab ini menyediakan versi properti manifes
yang mudah kita baca. Lihat [Manifes aplikasi
web](/web/tools/chrome-devtools/progressive-web-apps#manifest) pada
dokumen Chrome DevTools untuk informasi selengkapnya mengenai tab ini. Anda juga bisa
menyimulasikan kejadian Add to Homescreen dari sini. Lihat [Menguji spanduk pemasangan
aplikasi](/web/fundamentals/engage-and-retain/app-install-banners/#testing-the-app-install-banner)
untuk informasi selengkapnya mengenai topik ini.

Jika ingin pendekatan otomatis terhadap validasi manifes aplikasi web Anda,
lihat [Lighthouse](/web/tools/lighthouse/). Lighthouse adalah
alat (bantu) pengauditan aplikasi web yang Anda jalankan sebagai Ekstensi Chrome atau sebagai modul NPM. Anda menyediakan
URL pada Lighthouse, kemudian Lighthouse akan menjalankan paket audit terhadap laman itu, dan selanjutnya
menampilkan hasilnya di laporan. Audit Lighthouse yang terkait dengan manifes aplikasi web
antara lain akan memeriksa apakah:

* Aplikasi bisa ditambahkan ke layar beranda.
* Setelah ditambahkan, aplikasi akan diluncurkan bersama layar pembuka khusus.
* Warna bilah alamat browser akan disesuaikan.
* Aplikasi berada di HTTPS (prasyarat untuk Add to Homescreen).

## Informasi selengkapnya

Artikel ini memberikan pengenalan singkat untuk manifes aplikasi web, namun
ada banyak hal lain untuk dipelajari.

* Jika menggunakan manifes aplikasi web, Anda mungkin juga ingin
menyiapkan [spanduk pemasangan aplikasi](/web/fundamentals/engage-and-retain/app-install-banners/). 

* [Referensi lengkap](https://developer.mozilla.org/en-US/docs/Web/Manifest)
bagi manifes aplikasi web tersedia di Mozilla Developer Network.

* Jika ingin keterangan fitur dari teknisi yang menciptakan manifes aplikasi web,
Anda bisa membaca [spesifikasi W3C sesungguhnya](http://www.w3.org/TR/appmanifest/){: .external }.

Note: Jika Anda memperbarui file `manifest.json` di saat mendatang, perubahan itu tidak akan
diambil secara otomatis oleh pengguna kecuali jika aplikasi Anda ditambahkan kembali ke
layar berandanya.





{# wf_devsite_translation #}
