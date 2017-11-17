project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Web bisa diakses dari berbagai perangkat, dari ponsel berlayar-kecil hingga televisi berlayar-besar. Setiap perangkat memiliki keunggulan dan kekurangan masing-masing. Sebagai developer web, Anda diharapkan untuk mendukung semua perangkat.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2013-12-31 #}

# Situs Multi-Perangkat Anda yang Pertama {: .page-title }

Perhatian: Artikel ini sudah lama tidak diperbarui dan mungkin tidak sesuai lagi dengan keadaan sebenarnya. Sebaiknya periksa kursus gratis [Desain Web Responsif](https://www.udacity.com/course/responsive-web-design-fundamentals--ud893) di Udacity.

{% include "web/_shared/contributors/paulkinlan.html" %}

<img src="images/finaloutput-2x.jpg" alt="banyak perangkat menampilkan proyek akhir" class="attempt-right">

Menciptakan pengalaman multi-perangkat tidaklah sesulit yang dibayangkan.
Dalam panduan ini, kita akan membangun laman landas produk untuk 
[Kursus Development Web Seluler CS256](https://www.udacity.com/course/mobile-web-development--cs256)
yang berfungsi baik di berbagai tipe perangkat.

Membangun untuk beberapa perangkat dengan kemampuan yang berbeda, ukuran layar yang
sangat berbeda dan metode interaksi terlihat sangat sulit, jika tidak mau dibilang mustahil
untuk memulai.

Ini tidaklah sesulit membangun situs yang responsif sepenuhnya seperti yang Anda pikirkan, dan untuk
menunjukkannya, panduan ini akan membawa Anda melalui langkah-langkah yang bisa Anda gunakan untuk memulai.
Kami memecahnya menjadi dua langkah sederhana:

1.  Mendefinisikan arsitektur informasi (dikenal sebagai AI) dan struktur laman,
2.  Tambahkan elemen desain untuk membuatnya responsif dan terlihat bagus di semua perangkat.


## Membuat struktur dan materi

Materi adalah aspek yang paling penting dari setiap situs. Jadi mari kita mendesain untuk
materi dan tidak membiarkan desain mendikte materi. Dalam panduan ini, kita mengidentifikasi
materi yang dibutuhkan terlebih dulu, membuat struktur laman berdasarkan materi ini, dan
kemudian menampilkan laman tersebut dalam layout linear sederhana yang bekerja dengan baik pada tampilan sempit yang terlihat
maupun lebar.


### Membuat struktur laman

Kita telah mengidentifikasi yang dibutuhkan:

1. Suatu area yang menjelaskan tujuan "CS256: Development web seluler " produk kami pada tingkat tinggi
2.  Formulir untuk mengumpulkan informasi dari pengguna yang tertarik dengan produk kami
3.  Penjelasan mendetail dan video
4.  Gambar produk beraksi
5.  Tabel data dengan informasi untuk mendukung klaim

#### TL;DR {: .hide-from-toc }
- Mengetahui materi yang Anda butuhkan.
- Membuat sketsa Arsitektur Informasi (AI) untuk tampilan sempit dan lebar yang terlihat.
- Membuat tampilan kerangka laman dengan materi namun tanpa penataan gaya.

Kami juga datang dengan konsep garis besar arsitektur informasi dan layout untuk
tampilan yang terlihat sempit dan lebar.

<div class="attempt-left">
  <figure>
    <img src="images/narrowviewport.png" alt="AI Bidang Sempit Tampilan yang Terlihat">
    <figcaption>
      AI Tampilan Sempit yang terlihat
 </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/wideviewport.png" alt="AI Bidang Lebar Tampilan yang Terlihat">
    <figcaption>
      AI Tampilan Lebar yang terlihat
     </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

Ini bisa dikonversi dengan mudah menjadi bagian garis besar dari laman kerangka yang akan
kita gunakan untuk seluruh proyek ini.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addstructure.html" region_tag="structure" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/addstructure.html){: target="_blank" .external }

### Menambahkan materi ke laman

Struktur dasar dari situs sudah selesai. Kita tahu bagian yang kita butuhkan, materi
yang akan ditampilkan di bagian tersebut, dan di mana menempatkannya dalam arsitektur informasi
secara keseluruhan. Sekarang kita bisa mulai membangun situs.

Note: Kita akan menambahkan penataan gaya di lain waktu

### Membuat judul dan formulir

Judul dan formulir notifikasi permintaan adalah komponen penting dari
laman kita. Ini harus langsung ditampilkan ke pengguna.

Dalam judul, tambahkan teks sederhana untuk menjelaskan tujuan:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addheadline.html" region_tag="headline" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/addheadline.html){: target="_blank" .external }

Kita juga harus mengisi formulir.
Ini adalah formulir sederhana yang mengumpulkan nama, alamat email,
dan nomor ponsel pengguna.

Semua formulir harus memiliki label dan Placeholder agar memudahkan pengguna untuk
melihat elemen dengan jelas, memahami apa yang seharusnya masuk ke sana, dan juga membantu
alat aksesibilitas memahami struktur formulir.  Atribut name
tidak hanya mengirimkan nilai formulir ke server, namun juga digunakan untuk memberikan petunjuk
penting bagi browser tentang cara mengisi formulir secara otomatis untuk pengguna.

Kami akan menambahkan tipe semantik agar pengguna bisa
memasukkan materi pada perangkat seluler dengan cepat dan sederhana.  Misalnya, saat memasukkan nomor
telepon, pengguna sebaiknya hanya melihat tombol nomor telepon.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addform.html" region_tag="form" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/addform.html){: target="_blank" .external }

#### Membuat bagian Video dan Informasi

Bagian Video dan Informasi materi berisi sedikit lebih mendalam.
Bagian ini memiliki daftar berbutir dari fitur produk kita dan juga berisi
Placeholder video yang menunjukkan bahwa produk kita bekerja dengan baik untuk pengguna.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addvideo.html" region_tag="section1" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/addvideo.html){: target="_blank" .external }

Video sering digunakan untuk menjelaskan materi dengan cara yang lebih interaktif dan
sering digunakan untuk menunjukkan demonstrasi produk atau konsep.

Dengan mengikuti praktik terbaik, Anda bisa dengan mudah mengintegrasikan video ke situs Anda:

*  Tambahkan atribut `controls` untuk mempermudah pengguna memutar video.
*  Tambahkan gambar `poster` untuk memberi pengguna pratinjau materi.
*  Tambahkan beberapa elemen `<source>` berdasarkan format video yang didukung.
*  Tambahkan teks fall-back untuk membolehkan pengguna mengunduh video jika mereka tidak bisa memutarnya di jendela.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addvideo.html" region_tag="video" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/addvideo.html){: target="_blank" .external }

#### Membuat Bagian Gambar

Situs tanpa gambar bisa sedikit membosankan. Ada dua tipe gambar:

*  Gambar Materi &mdash; gambar yang berjajar dalam dokumen dan digunakan
   untuk menyampaikan informasi tambahan tentang materi.
*  Gambar Stylistic &mdash; gambar yang digunakan agar situs terlihat
   lebih bagus; sering kali ini adalah gambar latar belakang, pola dan gradien.  Kita akan
   membahasnya di [bagian berikutnya](#make-it-responsive).

Bagian Gambar di laman kita adalah kumpulan gambar materi.

Gambar Materi sangat penting untuk menyampaikan makna laman. Pikirkan mereka
seperti gambar yang digunakan dalam artikel koran.  Gambar yang kita gunakan adalah
gambar dari tutorial proyek:  Chris Wilson, Peter Lubbers dan Sean
Bennet.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addimages.html" region_tag="images" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/addimages.html){: target="_blank" .external }

Gambar diatur dalam skala 100% dari lebar layar. Ini bekerja
dengan baik pada perangkat dengan tampilan yang terlihat sempit, tapi kurang bagus pada perangkat dengan
tampilan yang terlihat lebar (seperti desktop).  Kita akan menanganinya di bagian
desain responsif.

Banyak orang tidak memiliki kemampuan untuk melihat gambar dan sering kali menggunakan teknologi
bantu seperti pembaca layar yang akan melakukan parse data pada laman dan
menyampaikannya ke pengguna secara lisan.  Anda harus memastikan bahwa semua gambar
materi Anda memiliki tag `alt` deskriptif sehingga pembaca layar bisa menyampaikannya ke
pengguna.

Ketika menambahkan tag `alt` pastikan bahwa Anda menjaga teks alt seringkas
mungkin untuk sepenuhnya menjelaskan gambar.  Misalnya, dalam demo kita hanya
memformat atribut menjadi "Name: Role", ini menyajikan informasi yang cukup
kepada pengguna untuk memahami bahwa bagian ini adalah tentang penulis dan apa
tugas mereka.

#### Menambahkan Bagian Data Ditabulasi

Bagian terakhir adalah tabel sederhana yang digunakan untuk menampilkan statistik produk tertentu
tentang suatu produk.

Tabel sebaiknya hanya digunakan untuk data tabular, misalnya, matriks informasi.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addtable.html" region_tag="section3" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/addtable.html){: target="_blank" .external }

#### Menambahkan Footer

Kebanyakan situs membutuhkan footer untuk menampilkan materi seperti Persyaratan dan Ketentuan,
penolakan, dan materi lain yang tidak dimaksudkan untuk berada di navigasi utama
atau di area materi utama suatu laman.

Di situs kita, kita akan membuat footer Placeholder sederhana.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addcontent.html" region_tag="footer" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/addcontent.html){: target="_blank" .external }

### Rangkuman

Kita telah membuat garis besar dari situs dan telah mengidentifikasi semua elemen struktur
utama.  Kita juga telah memastikan bahwa kita memiliki semua materi
relevan yang siap digunakan untuk memenuhi kebutuhan bisnis.

<div class="attempt-left">
  <figure>
    <img src="images/content.png" alt="Materi">
    <figcaption>
      <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/content-without-styles.html">Materi dan struktur</a>
    </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img  src="images/narrowsite.png" alt="Situs yang didesain" style="max-width: 100%;">
    <figcaption>
      <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/content-with-styles.html">Situs final</a>
    </figcaption>
  </figure>
</div>

Anda akan melihat bahwa laman terlihat jelek saat ini; ini disengaja.
Materi adalah aspek yang paling penting dari setiap situs dan kita harus memastikan bahwa kita
memiliki arsitektur informasi dan kepadatan yang solid serta baik. Panduan ini memberi kita
dasar yang sangat baik untuk membangun. Kita akan menata gaya materi kita di panduan berikutnya.



## Menjadikannya responsif {: #make-it-responsive }

Web bisa diakses pada berbagai perangkat, dari ponsel berlayar-kecil
hingga televisi berlayar-sangat besar. Setiap perangkat menghadirkan keunggulan
yang unik dan juga kekurangan. Sebagai developer web, Anda diharapkan untuk
mendukung semua jenis perangkat.


Kita membangun sebuah situs yang bekerja di berbagai ukuran layar dan jenis
perangkat. Kami sudah membuat Arsitektur Informasi laman dan menciptakan 
struktur dasar. Pada bagian ini, kita akan mengambil struktur dasar kita dengan
materi dan mengubahnya menjadi sebuah laman indah yang responsif untuk sebagian 
besar ukuran layar.

Mengikuti prinsip-prinsip development web Mobile First, kita memulai dengan 
tampilan sempit yang terlihat &mdash; mirip dengan telepon seluler &mdash; dan membangun untuk 
pengalaman tersebut terlebih dahulu. Kemudian kita menskalakan ke kelas perangkat yang lebih besar. Kita bisa melakukannya
dengan membuat tampilan lebih luas yang terlihat dan membuat pemanggilan penilaian tentang apakah
desain dan layout terlihat benar.

Sebelumnya kita telah membuat beberapa desain tingkat tinggi yang berbeda untuk menunjukkan bagaimana materi
harus ditampilkan. Sekarang kita harus membuat laman agar menyesuaikan dengan layout yang berbeda.
Kita melakukan ini dengan memutuskan lokasi penempatan breakpoint &mdash; titik
tempat layout dan gaya mengubah &mdash; berdasarkan pada apakah materi cocok dengan
ukuran layar.

### TL;DR {: .hide-from-toc }
- Selalu menggunakan tampilan yang terlihat.
- Selalu awali dengan bidang sempit tampilan yang terlihat terlebih dahulu dan kemudian diperbesar.
- Tentukan breakpoint ketika harus menyesuaikan materi.
- Buatlah visi tingkat-tinggi dari layout Anda di seluruh breakpoint utama.


### Menambahkan tampilan yang terlihat

Bahkan untuk laman dasar, Anda **harus** selalu menyertakan tag meta viewport.
Tampilan yang terlihat adalah komponen terpenting yang dibutuhkan untuk membangun pengalaman
multi-perangkat. Tanpa itu, situs Anda tidak akan bekerja dengan baik pada perangkat seluler.

Tampilan yang terlihat menyatakan kepada browser bahwa laman perlu diskalakan agar pas dengan
layar. Ada banyak konfigurasi berbeda yang bisa Anda tetapkan bagi
tampilan yang terlihat untuk mengontrol tampilan laman.  Sebagai defaultnya, kami menyarankan:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/viewport.html" region_tag="viewport" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/viewport.html){: target="_blank" .external }

Tampilan yang terlihat ada di kepala dokumen dan hanya perlu dideklarasikan sekali.

### Menerapkan gaya sederhana

Produk dan perusahaan kita telah memiliki panduan merek dan font yang sangat spesifik yang tersedia
dalam panduan gaya.

#### Panduan gaya

Panduan gaya adalah cara untuk mendapatkan pemahaman tingkat tinggi dari representasi visual
laman dan membantu Anda memastikan bahwa Anda konsisten di seluruh desain.

#### Warna

<div class="styles" style="font-family: monospace;">
  <div style="background-color: #39b1a4">#39b1a4</div>
  <div style="background-color: white">#ffffff</div>
  <div style="background-color: #f5f5f5">#f5f5f5</div>

  <div style="background-color: #e9e9e9">#e9e9e9</div>
  <div style="background-color: #dc4d38">#dc4d38</div>
</div>

#### Menambahkan gambar stylistic

<img  src="images/narrowsite.png" alt="Situs yang didesain"  class="attempt-right" />

Dalam panduan sebelumnya, kita menambahkan gambar yang disebut "materi gambar".  Ini adalah
gambar yang penting bagi narasi produk kita.  Gambar stylistic
adalah gambar yang tidak diperlukan sebagai bagian dari materi inti namun menambahkan hiasan visual
atau membantu memancing perhatian pengguna ke bagian materi tertentu.

Contoh yang bagus dari ini adalah gambar judul untuk 'paro atas' materi.  Hal ini
sering digunakan untuk menarik pengguna agar membaca lebih banyak tentang suatu produk.

Mereka sangat mudah untuk disertakan. Dalam kasus kita, itu akan menjadi latar belakang untuk
header dan kita akan menerapkannya melalui beberapa CSS sederhana.

<div style="clear:both;"></div>

    #headline {
      padding: 0.8em;
      color: white;
      font-family: Roboto, sans-serif;
      background-image: url(backgroundimage.jpg);
      background-size: cover;
    }
    

Kita memilih gambar latar sederhana yang memudar sehingga tidak mengambil fokus
dari materi dan kita menyetelnya untuk `cover` seluruh elemen; dengan demikian, materi akan
selalu merentang sembari mempertahankan aspek rasio yang tepat.


### Mengatur breakpoint pertama Anda

Desain mulai terlihat jelek di sekitar lebar 600px.  Dalam kasus kita, panjang
baris akan di atas 10 kata (panjang pembacaan optimal) dan di situlah
kita ingin mengubahnya.

<video controls poster="images/firstbreakpoint.png" style="width: 100%;">
  <source src="videos/firstbreakpoint.mov" type="video/mov"></source>
  <source src="videos/firstbreakpoint.webm" type="video/webm"></source>
  <p>Maaf browser Anda tidak mendukung video.
     <a href="videos/firstbreakpoint.mov">Mengunduh video</a>.
  </p>
</video>

600 px tampaknya adalah tempat yang bagus untuk membuat breakpoint pertama kita karena akan 
memberi kita cakupan untuk memosisikan ulang elemen agar mereka sesuai dengan layar.
Kita bisa melakukannya dengan menggunakan teknologi yang disebut [Kueri Media](/web/fundamentals/design-and-ux/responsive/fundamentals/use-media-queries).

    @media (min-width: 600px) {
    
    }
    
Ada lebih banyak ruang pada layar yang lebih besar sehingga ada lebih banyak fleksibilitas tentang bagaimana
materi ditampilkan.

Note: Anda tidak harus memindahkan semua elemen sekaligus, Anda bisa membuat penyesuaian lebih kecil jika diperlukan.

Dalam konteks laman produk, sepertinya kita
harus:

*  Membatasi lebar maksimum desain.
*  Mengubah padding elemen dan memperkecil ukuran teks.
*  Memindahkan formulir agar mengambang sejajar dengan materi judul.
*  Membuat video mengambang di sekitar materi.
*  Memperkecil ukuran gambar dan menampilkannya di grid yang lebih bagus.


### Membatasi lebar maksimum desain

Kita telah memilih untuk hanya memiliki dua layout utama: bidang sempit tampilan yang terlihat dan bidang lebar tampilan
yang terlihat, yang sangat menyederhanakan proses pembangunan kita.

Kita juga telah memutuskan untuk membuat bagian full-bleed pada bidang sempit tampilan yang terlihat yang
tetap full-bleed pada bidang lebar tampilan yang terlihat.  Ini berarti kita harus membatasi
lebar maksimum layar sehingga teks dan paragraf tidak merentang ke satu
baris panjang pada layar ultra lebar.  Kami telah menentukan titik ini
sekitar 800px.

Untuk mencapai hal ini, kita harus membatasi lebar dan pusat elemen.  Kita
harus membuat kontainer di sekitar setiap bagian utama dan menerapkan `margin:
auto`.  Ini memungkinkan layar untuk membesar namun materi tetap berpusat di tengah
dan berukuran maksimal 800px.

Kontainer akan menjadi `div` sederhana dalam formulir berikut:

    <div class="container">...</div>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/constrainwidth.html" region_tag="containerhtml" adjust_indentation="auto" %}
</pre>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/constrainwidth.html" region_tag="container" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/constrainwidth.html){: target="_blank" .external }

### Mengubah padding dan memperkecil ukuran teks

Pada bidang sempit tampilan yang terlihat, kita tidak memiliki banyak ruang untuk menampilkan materi sehingga
ukuran dan berat tipografi sering secara drastis dikurangi agar sesuai
layar.

Dengan bidang yang lebih besar dari tampilan yang terlihat, kita harus mempertimbangkan bahwa pengguna lebih sering menggunakan
layar yang lebih besar namun melihatnya dari jarak lebih jauh.  Untuk meningkatkan keterbacaan
materi, kita bisa meningkatkan ukuran dan berat tipografi dan kita juga dapat
mengubah padding agar area yang berbeda lebih menonjol.

Dalam laman produk, kita akan meningkatkan padding elemen bagian dengan
menyetelnya agar tetap berukuran 5% dari lebar.  Kita juga akan meningkatkan ukuran
header untuk masing-masing bagian.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/alterpadding.html" region_tag="padding" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/alterpadding.html){: target="_blank" .external }

### Menyesuaikan elemen untuk bidang lebar tampilan yang terlihat

Bidang sempit tampilan yang terlihat adalah tampilan yang ditumpuk linear.  Setiap bagian utama dan materi
di dalamnya ditampilkan dengan urutan dari atas ke bawah.

Bidang lebar tampilan yang terlihat memberi kita ruang ekstra yang bisa digunakan untuk menampilkan materi secara optimal
pada layar tersebut.  Untuk laman produk, ini berarti bahwa menurut AI kita bisa:

*  Memindahkan formulir di sekitar informasi judul.
*  Menempatkan video di sebelah kanan poin kunci.
*  Petak gambar.
*  Me-luaskan tabel.

#### Mengambangkan elemen Formulir

Bidang sempit tampilan yang terlihat berarti bahwa kita memiliki jauh lebih sedikit ruang horizontal yang tersedia bagi
kita untuk secara nyaman meletakkan elemen pada layar.

Agar penggunaan ruang layar horizontal lebih efektif, kita harus keluar dari
aliran linear header dan memindahkan formulir serta daftar sehingga menjadi
berdampingan.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/floattheform.html" region_tag="formfloat" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/floattheform.html){: target="_blank" .external }

<video controls poster="images/floatingform.png" style="width: 100%;">
  <source src="videos/floatingform.mov" type="video/mov"></source>
  <source src="videos/floatingform.webm" type="video/webm"></source>
  <p>Maaf browser Anda tidak mendukung video.
     <a href="videos/floatingform.mov">Mengunduh video</a>.
  </p>
</video>

#### Mengambangkan elemen Video

Video dalam antarmuka bidang sempit tampilan yang terlihat dirancang untuk bisa sepenuh lebar
layar dan diposisikan setelah daftar fitur kunci. Pada bidang lebar tampilan yang terlihat,
video akan diskalakan ke atas sehingga terlalu besar dan tampak salah ketika ditempatkan di sebelah
daftar fitur.

Elemen video harus dipindahkan dari aliran vertikal bidang sempit
tampilan yang terlihat dan sebaiknya ditampilkan berdampingan dengan daftar berbutir materi pada bidang lebar tampilan yang terlihat.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/floatthevideo.html" region_tag="floatvideo" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/floatthevideo.html){: target="_blank" .external }

#### Petak gambar

<img src="images/imageswide.png" class="attempt-right">

Gambar di antarmuka tampilan sempit yang terlihat (kebanyakan perangkat seluler) diatur menjadi
sepenuh lebar layar dan ditumpuk secara vertikal.  Ini tidak diskalakan dengan
benar pada bidang lebar tampilan yang terlihat.

Agar terlihat dengan benar pada bidang lebar tampilan yang terlihat, gambar diskalakan ke 30%
dari lebar kontainer dan ditata secara horizontal (bukan vertikal di
bidang sempit tampilan yang terlihat). Kita juga akan menambahkan beberapa radius batas dan kotak-bayangan
agar gambar terlihat lebih menarik.

<div style="clear:both;"></div>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/tiletheimages.html" region_tag="tileimages" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/tiletheimages.html){: target="_blank" .external }

#### Membuat gambar responsif terhadap DPI

Ketika menggunakan gambar, pertimbangkan ukuran tampilan yang terlihat dan kepadatan
tampilan.

Web dibuat untuk layar 96dpi.  Dengan diperkenalkannya perangkat seluler,
kita melihat peningkatan besar dalam kepadatan piksel layar, belum lagi
tampilan kelas Retina pada laptop.  Oleh karena itu, gambar yang dienkode ke 96dpi
terlihat mengerikan pada perangkat dengan dpi-tinggi.

Kami memiliki solusi yang belum digunakan secara luas. Untuk browser yang
mendukungnya, Anda bisa menampilkan gambar kepadatan tinggi pada layar kepadatan tinggi.


    <img src="photo.png" srcset="photo@2x.png 2x">
    

#### Tabel

Tabel sangat sulit ditampilkan dengan tepat pada perangkat yang memiliki bidang sempit tampilan yang terlihat dan memerlukan
perhitungan khusus.

Kami menyarankan pada tampilan sempit agar Anda mentransformasi tabel Anda dengan mengubah
setiap baris ke blok pasangan nilai-kunci (dengan kuncinya adalah apa yang
sebelumnya menjadi judul kolom, dan nilainya tetap nilai sel).
Untungnya, hal ini tidak terlalu sulit. Pertama, berikan keterangan setiap elemen `td` dengan
judul yang sesuai sebagai atribut data. (Efeknya tidak akan terlihat
sampai kita menambahkan beberapa CSS.)

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/updatingtablehtml.html" region_tag="table-tbody" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/updatingtablehtml.html){: target="_blank" .external }

Sekarang kita hanya perlu menambahkan CSS untuk menyembunyikan `thead` asli dan menunjukkan
label `data-th` menggunakan elemen semu `:before`. Hal ini akan mengakibatkan
pengalaman multi-perangkat seperti yang terlihat di video berikut ini.

<video controls poster="images/responsivetable.png" style="width: 100%;">
  <source src="videos/responsivetable.mov" type="video/mov"></source>
  <source src="videos/responsivetable.webm" type="video/webm"></source>
  <p>Maaf browser Anda tidak mendukung video.
     <a href="videos/responsivetable.mov">Mengunduh video</a>.
  </p>
</video>

Di situs, kita harus membuat breakpoint tambahan hanya untuk materi tabel.
Ketika Anda membangun bagi perangkat seluler terlebih dahulu, lebih sulit untuk mengurungkan gaya yang sudah diterapkan,
jadi kita harus membagi CSS tabel tampilan sempit yang terlihat dari css tampilan lebar yang terlihat.
Ini memberi kita jeda yang jelas dan konsisten.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/content-with-styles.html" region_tag="table-css" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/content-with-styles.html){: target="_blank" .external }

## Membungkus

Berhasil: Pada saat membaca ini, Anda sudah akan membuat
laman landas produk sederhana Anda yang pertama yang bekerja di berbagai macam perangkat,
faktor-bentuk, dan ukuran layar.

Jika mengikuti panduan ini, Anda akan memiliki langkah awal yang baik:

1.  Buat AI dasar dan pahami materi sebelum Anda membuat kode.
2.  Selalu menyetel tampilan yang terlihat.
3.  Buat pengalaman dasar Anda di sekitar pendekatan seluler-dahulu.
4.  Setelah Anda memiliki pengalaman seluler, tingkatkan lebar tampilan sampai terlihat tidak benar dan setel breakpoint di sana.
5.  Terus iterasi.


{# wf_devsite_translation #}
