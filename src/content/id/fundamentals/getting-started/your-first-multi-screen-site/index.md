project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Web dapat diakses di perangkat yang beraneka ragam, dari ponsel layar kecil sampai televisi layar besar. Setiap perangkat memiliki kelebihan dan kekurangan masing-masing. Sebagai pengembang web, Anda diharapkan untuk mendukung penuh keberagaman perangkat ini.

{# wf_updated_on: 2013-12-31 #}
{# wf_published_on: 2013-12-31 #}

# Situs multi-device Anda yang Pertama {: .page-title }

{% include "_shared/contributors/paulkinlan.html" %}

<img src="images/finaloutput-2x.jpg" class="attempt-right" alt="berbagai macam perangkat menunjukkan hasil akhir proyek">


Menciptakan pengalaman multi-perangkat ini tidak sesulit yang diperkirakan. 
Dalam panduan ini, kita akan membangun sebuah halaman landing page untuk 
Web <a href='https://www.udacity.com/course/cs256'>CS256 Mobile Web
Development course</a> yang bekerja dengan baik di seluruh jenis perangkat yang berbeda.


Membangun untuk beberapa perangkat dengan kemampuan yang berbeda, 
ukuran layar dan metode interaksi yang berbeda bisa jadi tampak mengerikan, 
bahkan mungkin ada yang merasa mustahil.

Tidaklah sulit untuk membangun situs yang benar-benar responsif seperti yang Anda bayangkan, dan untuk meyakinkan
Anda, panduan ini akan membawa Anda melalui langkah-langkah yang dapat Anda gunakan untuk memulai. Kami telah membaginya menjadi dua
langkah sederhana:

1. Mendefinisikan arsitektur informasi (umumnya dikenal sebagai 'information architecture', disingkat IA) dan struktur halaman,
2. Menambah elemen desain untuk membuatnya responsif dan terlihat baik di semua perangkat.


## Buat konten dan strukturnya

Konten adalah aspek yang paling penting dari situs manapun. Mari kita desain konten terlebih dahulu dan tidak membiarkan desain yang mendikte konten. Dalam panduan ini, kita akan mengenali konten apa yang akan kita tampilkan pertama kali, membuat struktur halaman berdasarkan konten ini, dan kemudian menampilkan halaman dalam tata letak linear sederhana yang bekerja dengan baik pada viewport sempit dan lebar.


### Membuat struktur halaman

Kami telah mengidentifikasi kita membutuhkan:

1.  Suatu area yang melukiskan produk kita secara high-level untuk kursus "CS256: Pengembangan Mobile Web"
2.  Form untuk mengumpulkan informasi dari pengguna yang tertarik dengan produk kita
3.  Deskripsi secara lengkap dan video
4.  Gambararn produk ini beraksi
5.  Sebuah tabel data dengan informasi untuk mendukung pernyataan kita

### TL;DR {: .hide-from-toc }
- Menentukan konten yang akan Anda tampilkan pertama kali.
- Membuat sketsa Information Architecture (IA) untuk viewport layar sempit dan layar lebar.
- Membuat gambar kerangka dari halaman dengan konten tapi tanpa corak dari style.


Kita juga telah memiliki corat-coret arsitektur informasi dan tata letak untuk viewport
layar sempit dan layar lebar.


<img class="attempt-left" src="images/narrowviewport.png" alt="IA Viewport Sempit">
<img  class="attempt-right" src="images/wideviewport.png" alt="IA Viewport Lebar">
<div class="clearfix"></div>


Ini dapat dikonversi dengan mudah menjadi bagian-bagian kasar dari halaman kerangka yang
akan kita gunakan untuk kelanjutan proyek ini.

<pre class="prettyprint">
{% includecode adjust_indentation="auto"  content_path="web/fundamentals/getting-started/your-first-multi-screen-site/_code/addstructure.html" region_tag="structure" %}
</pre>

### Menambahkan konten ke halaman

Struktur dasar dari situs telah selesai. Kita tahu bagian kita butuhkan,
konten yang ditampilkan di bagian tersebut, dan di mana meletakkannya dalam 
arsitektur informasi secara keseluruhan. Kita sekarang dapat mulai membangun situs.


#### Membuat judul dan form

Judul dan formulir permintaan notifikasi adalah komponen penting dari
halaman kita. Komponen ini harus disajikan kepada pengguna segera.

Di judul, tambahkan teks sederhana yang menjelaskan isi kursus:

<pre class="prettyprint">
{% includecode adjust_indentation="auto"  content_path="web/fundamentals/getting-started/your-first-multi-screen-site/_code/addheadline.html" region_tag="headline" %}
</pre>

Kita juga perlu mengisikan formulir.
Formulir sederhana saja yang mengumpulkan nama, alamat email,
dan nomor telepon pengguna.

Semua form harus memiliki label dan placeholder agar memudahkan pengguna untuk
fokus, memahami apa yang harus diisi di dalamnya, dan juga membantu
alat aksesibilitas (accessibility tools) memahami struktur form. Atribut `name`
tidak hanya mengirimkan nilai form ke server, juga digunakan untuk memberikan 
petunjuk penting ke browser tentang bagaimana browser secara otomatis mengisi formulir bagi pengguna.

Kita akan menambahkan jenis semantik untuk membuatnya cepat dan sederhana bagi pengguna untuk dapat
memasukkan konten pada perangkat mobile. Misalnya, ketika harus memasukkan 
nomor telepon, pengguna harus disuguhkan dial pad.

<pre class="prettyprint">
{% includecode adjust_indentation="auto"  content_path="web/fundamentals/getting-started/your-first-multi-screen-site/_code/addform.html" region_tag="form" %}
</pre>

{# include shared/related_guides.liquid inline=true list=page.related-guides.create-amazing-forms #}

#### Buat Video dan ruang Informasi

Video dan ruang Informasi dari konten kita akan berisi informasi lebih mendalam.
Bagian ini akan memiliki daftar fitur produk dalam bentuk poin-poin dan juga akan berisi
placeholder video yang menunjukkan produk kita bisa dilihat oleh pengguna.

<pre class="prettyprint">
{% includecode adjust_indentation="auto"  content_path="web/fundamentals/getting-started/your-first-multi-screen-site/_code/addvideo.html" region_tag="section1" %}
</pre>

Video sering digunakan untuk menggambarkan konten dengan cara yang lebih interaktif dan
sering digunakan untuk menunjukkan demonstrasi produk atau konsep.

Dengan mengikuti best practice, Anda dapat dengan mudah mengintegrasikan video ke situs Anda:

* Tambahkan atribut `controls` untuk membuat pemutaran video menjadi lebih mudah.
* Tambahkan gambar `poster` untuk preview konten.
* Tambahkan beberapa elemen `<source>` berdasarkan format video yang didukung.
* Tambahkan teks alternatif untuk memfasilitasi pengguna untuk men-download video jika mereka tidak bisa memainkannya di window.

<pre class="prettyprint">
{% includecode adjust_indentation="auto"  content_path="web/fundamentals/getting-started/your-first-multi-screen-site/_code/addvideo.html" region_tag="video" %}
</pre>

{# include shared/related_guides.liquid inline=true list=page.related-guides.video #}

#### Membuat bagian gambar

Situs tanpa gambar sedikit membosankan. Ada dua jenis gambar:

*  Gambar konten &mdash; gambar yang in-line di dalam dokumen dan digunakan
   untuk menyampaikan informasi tambahan tentang konten.
*  Gambar Bercorak &mdash; gambar yang digunakan untuk membuat tampilan situs 
   lebih baik; biasanya berupa gambar latar belakang, pola dan gradien. Kita akan
   membahas ini di [artikel berikutnya](#).

Bagian gambar di halaman kita adalah kumpulan gambar konten.

Gambar konten sangat penting untuk menyampaikan pesan halaman. Bayangkan
gambar-gambar ini sebagai gambar yang digunakan dalam artikel koran. Gambar yang kita gunakan adalah
gambar dari para tutor pada proyek: Chris Wilson, Peter Lubbers dan Sean
Bennet.

<pre class="prettyprint">
{% includecode adjust_indentation="auto"  content_path="web/fundamentals/getting-started/your-first-multi-screen-site/_code/addimages.html" region_tag="images" %}
</pre>

Gambar diset agar meliputi 100% dari lebar layar. Setting ini bekerja
baik pada perangkat dengan viewport sempit, tapi kurang baik pada perangkat dengan
viewport lebar (seperti desktop). Kita akan membahas ini di bagian desain responsif.

{# include shared/related_guides.liquid inline=true list=page.related-guides.images #}

Banyak orang tidak memiliki kemampuan untuk melihat gambar dan sering menggunakan bantu
teknologi seperti pembaca layar yang akan mengenali data pada halaman dan
menyampaikan kepada pengguna secara lisan. Anda harus memastikan bahwa semua gambar konten Anda
memiliki tag `alt` deskriptif agar screen reader bisa membacanya untuk
pengguna.

Ketika menambahkan tag `alt` pastikan agar Anda menuliskan teks seringkas
mungkin tapi tetap bisa menjelaskan gambar sepenuhnya. Misalnya di demo kita hanya
menempelkan atributnya sebagai "Nama: Peran", ini menyajikan informasi yang cukup
kepada pengguna untuk memahami bahwa bagian ini adalah tentang penulis dan apa
tugas mereka.

#### Tambahkan Bagian tabulasi data

Bagian akhir dari panduan ini adalah tabel sederhana yang digunakan untuk menampilkan 
statistik produk.

Tabel sebaiknya hanya digunakan untuk data tabular, yaitu, matriks informasi.

<pre class="prettyprint">
{% includecode adjust_indentation="auto"  content_path="web/fundamentals/getting-started/your-first-multi-screen-site/_code/addtable.html" region_tag="section3" %}
</pre>

#### Tambahkan Footer

Kebanyakan situs perlu footer untuk menampilkan konten seperti Syarat dan Ketentuan,
penolakan, dan konten lain yang tidak dimaksudkan untuk berada di navigasi utama
atau di area konten utama halaman.

Di situs kita, kita hanya akan membuat placeholder footer sederhana.

<pre class="prettyprint">
{% includecode adjust_indentation="auto"  content_path="web/fundamentals/getting-started/your-first-multi-screen-site/_code/addcontent.html" region_tag="footer" %}
</pre>

### Ringkasan

Kita telah membuat garis besar situs dan juga telah mengidentifikasi semua struktur
elemen utama. Kita juga telah memastikan bahwa kita memiliki semua 
konten yang relevan tersedia untuk digunakan sesuai kebutuhan bisnis kita.


<img class="attempt-left" src="images/content.png" alt="Content">
<img  class="attempt-right" src="images/narrowsite.png" alt="">
<div class="clearfix"></div>


Anda akan melihat bahwa halaman masih tampak masih mengerikan sekarang; ini memang disengaja.
Konten adalah aspek yang paling penting dari situs apapun dan kita perlu memastikan telah
memiliki arsitektur informasi yang solid. Panduan ini telah memberi kita
dasar yang sangat baik untuk membangun. Kita akan mencorak konten kita dengan style di panduan berikutnya.



## Membuatnya responsif


Web bisa diakses di hampir semua perangkat dari ponsel layar kecil
sampai televisi layar besar. Setiap perangkat menyajikan manfaat dan keunikan tersendiri
beserta kendala-kendalanya. Sebagai pengembang web, Anda diharapkan untuk
mendukung semua jenis perangkat.


Kami membangun situs yang bisa digunakan di berbagai ukuran layar dan jenis perangkat. 
Dalam [Artikel sebelumnya](#), kita mendesain 
halaman Information Arsitektur dan membuat struktur dasar.
Dalam panduan ini, kita akan mengambil struktur dasar kita yang sudah berisi konten dan mengubahnya menjadi
halaman indah yang responsif di sejumlah besar ukuran layar.


<figure class="attempt-left">
  <img  src="images/content.png" alt="Content">
  <figcaption><a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/getting-started/your-first-multi-screen-site/content-without-styles.html"> Konten dan struktur </a></figcaption>
</figure>
<figure class="attempt-right">
  <img  src="images/narrowsite.png" alt="Designed site">
  <figcaption><a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/getting-started/your-first-multi-screen-site/content-with-styles.html"> Hasil Akhir Situs  </a> </figcaption>
</figure>
<div class="clearfix"></div>


Mengikuti prinsip pengembangan web Mobile First,
kita mulai mendesain untuk viewport sempit &mdash; mirip dengan ponsel &mdash;
dan membangun pengalaman pertama kita di sini.
Kemudian kita memperluasnya ke perangkat yang lebih besar.
Kita dapat melakukan ini dengan membuat viewport yang lebih luas dan
membuat suatu keputusan apakah desain dan tata letak sudah terlihat benar.

Sebelumnya kita telah menciptakan beberapa desain tingkat tinggi yang berbeda untuk membuat pertimbangan bagaimana konten 
harus ditampilkan. Sekarang kita perlu membuat halaman beradaptasi dengan beberapa layout yang berbeda.
Kita lakukan ini dengan cara membuat keputusan di mana menempatkan breakpoints kita &mdash; sebuah titik
di mana tata letak dan corak style berubah &mdash; didasarkan pada bagaimana konten bisa menyesuaikan diri dengan
ukuran layar.

### TL;DR {: .hide-from-toc }
- Selalu gunakan viewport.
- Selalu mulai dengan viewport sempit terlebih dahulu.
- Cari breakpoint yang tepat ketika Anda harus mengadaptasi konten.
- Buat visi tingkat-tinggi dari tata letak Anda di breakpoint utama.


### Tambahkan viewport

Bahkan untuk sekedar halaman biasa, Anda **harus** selalu menyertakan meta tag viewport.
Viewport adalah komponen paling penting yang Anda butuhkan untuk membangun pengalaman multi-perangkat.
Tanpa itu, situs Anda tidak akan bekerja dengan baik pada perangkat ponsel.

Viewport mengindikasikan ke browser bahwa halaman harus disesuaikan untuk pas dengan ukuran
layar. Ada banyak konfigurasi berbeda yang dapat Anda gunakan untuk
viewport Anda untuk mengontrol tampilan halaman. Sebagai default, kami sarankan:

<pre class="prettyprint">
{% includecode adjust_indentation="auto"  content_path="web/fundamentals/getting-started/your-first-multi-screen-site/_code/viewport.html" region_tag="viewport" %}
</pre>

Viewport berada di head dari dokumen dan hanya perlu dideklarasikan sekali saja.

{# include shared/related_guides.liquid inline=false list=page.related-guides.responsive #}

### Menrapkan style sederhana

Produk dan perusahaan kita sudah memiliki branding yang sangat spesifik dan panduan huruf juga telah disediakan
dalam panduan style.

#### Panduan Style

Panduan style adalah cara yang berguna untuk mendapatkan pemahaman tingkat tinggi dari representasi visual
halaman dan membantu Anda memastikan konsistensi di seluruh desain.

##### Warna

<div class="styles" style="font-family: monospace;">
  <div style="background-color: #39b1a4">#39b1a4</div>
  <div style="background-color: white">#ffffff</div>
  <div style="background-color: #f5f5f5">#f5f5f5</div>

  <div style="background-color: #e9e9e9">#e9e9e9</div>
  <div style="background-color: #dc4d38">#dc4d38</div>
</div>

#### Tambahkan gambar yang memiliki gaya

Dalam panduan sebelumnya, kita menambahkan gambar yang dinamakan "content images". Ini adalah
gambar yang penting bagi narasi produk kita. Gambar yang memiliki gaya
adalah gambar yang sebenarnya tidak diperlukan sebagai bagian dari isi inti tetapi menambahkan sensasi visual
atau membantu membimbing perhatian pengguna kepada bagian tertentu dari konten.

Contoh yang baik dari ini adalah gambar judul untuk konten 'above the fold'. 
Sering kali digunakan untuk menarik pengguna untuk membaca lebih lanjut tentang produk.


<img  src="images/narrowsite.png" alt="Situs yang dirancang" />


Gambar bisa sangat mudah dimasukkan. Dalam kasus kita, gambar tersebut akan menjadi latar belakang
untuk header dan kita akan menerapkannya melalui CSS sederhana.


    #headline {
      padding: 0.8em;
      color: white;
      font-family: Roboto, sans-serif;
      background-image: url(backgroundimage.jpg);
      background-size: cover;
    }
    

Kita telah memilih gambar latar belakang sederhana yang kabur sehingga tidak mengambil alih 
perhatian dari konten dan kita memasangnya untuk `menutup` seluruh elemen; dengan cara itu
gambar akan selalu terbentang sambil mempertahankan aspek rasio yang benar.

<div class="clearfix"></div>


### Tentukan breakpoint pertama Anda 

Desain mulai terlihat jelek pada lebar kira-kira 600px. Dalam kasus kita, panjang
garis berada di atas 10 kata (panjang membaca optimal) dan menjadi indikator
di mana kita ingin mengubahnya.

<video controls poster="images/firstbreakpoint.png" style="width: 100%;">
  <source src="videos/firstbreakpoint.mov" type="video/mov"></source>
  <source src="videos/firstbreakpoint.webm" type="video/webm"></source>
  <p>Sorry your browser doesn't support video.
     <a href="videos/firstbreakpoint.mov">Unduh video</a>.
  </p>
</video>

600px tampaknya menjadi angka yang baik untuk membuat breakpoint pertama kita karena akan memberi kita ruang lingkup
memposisikan ulang elemen agar sesuai dengan lebar layar. Kita bisa melakukan ini
menggunakan teknologi yang disebut [Media Queries](/web/fundamentals/design-and-ui/responsive/fundamentals/use-media-queries).


    @media (min-width: 600px) {
    
    }
    

Ada banyak ruang lebih pada layar yang lebih besar sehingga ada lebih banyak fleksibilitas bagaimana
konten akan ditampilkan.

Note: Anda tidak harus memindahkan semua elemen secara sekaligus, Anda bisa membuat penyesuaian kecil jika diperlukan.

Dalam konteks halaman produk kita, sepertinya kita perlu untuk:

*  Membatasi lebar maksimum desain.
*  Mengubah padding elemen dan mengurangi ukuran teks.
*  Memindahkan form agar mengambang in-line dengan konten heading.
*  Membuat video mengambang di sekitar konten.
*  Mengurangi ukuran gambar dan membiarkan gambar tampil di grid yang lebih bagus.


### Membatasi lebar maksimum desain

Kita telah memilih untuk hanya memiliki dua layout utama: viewport sempit dan
viewport lebar, yang menyederhanakan proses membangunnya.

Kita juga telah memutuskan untuk membuat bagian full-bleed pada viewport sempit yang
juga akan tampil full-bleed pada viewport lebar. Ini berarti kita harus membatasi
lebar maksimum layar sehingga teks dan paragraf tidak meluas ke satu baris
panjang, pada layar ultra lebar. Kita memilih ukuran 800px untuk ini.

Untuk mencapai hal ini, kita perlu membatasi lebar dan membuat elemen berada di tengah. Kita
perlu membuat container di sekitar setiap bagian utama dan menerapkan `margin:
auto`. Hal ini akan memungkinkan layar untuk tumbuh namun isinya tetap berpusat
pada ukuran maksimum 800px. 

Containernya berupa `div` sederhana di form berikut:

    <div class="container">...</div>

<pre class="prettyprint">
{% includecode adjust_indentation="auto"  content_path="web/fundamentals/getting-started/your-first-multi-screen-site/_code/constrainwidth.html" region_tag="containerhtml" %}
</pre>

<pre class="prettyprint">
{% includecode adjust_indentation="auto"  content_path="web/fundamentals/getting-started/your-first-multi-screen-site/_code/constrainwidth.html" region_tag="container" %}
</pre>

### Mengubah padding dan mengurangi ukuran teks

Pada viewport yang sempit, kita tidak memiliki banyak ruang untuk menampilkan konten sehingga
ukuran dan berat dari tipografi sering dikurangi secara drastis agar sesuai dengan
layar.
Dengan viewport yang lebih besar, kita perlu mempertimbangkan bahwa pengguna yang 
menggunakan layar besar cenderung melihat layar dari jarak yang lebih jauh. Untuk meningkatkan keterbacaan
konten, kita dapat meningkatkan ukuran dan berat tipografi dan juga bisa
mengubah padding untuk membuat daerah yang terpisah menjadi lebih menonjol.

Di halaman produk kita, kita akan meningkatkan padding bagian elemen dengan cara
mengaturnya untuk tetap berada pada nilai 5% dari lebar. Kita juga akan meningkatkan ukuran
header untuk masing-masing bagian.

<pre class="prettyprint">
{% includecode adjust_indentation="auto"  content_path="web/fundamentals/getting-started/your-first-multi-screen-site/_code/alterpadding.html" region_tag="padding" %}
</pre>

### Adaptasi elemen untuk viewport lebar

Viewport sempit kita tampil bertumpuk secara linear. Setiap bagian utama dan konten
di dalamnya ditampilkan dalam urutan dari atas ke bawah.

Viewport yang lebar memberi kita ruang ekstra yang bisa digunakan untuk menampilkan konten secara optimal
untuk layar itu. Untuk halaman produk kita, ini berarti bahwa menurut IA kita bisa:

*  Memindahkan form di sekitar informasi header.
*  Memposisikan video ke sebelah kanan dari poin kunci.
*  Menyusun gambar seperti ubin.
*  Memperluas table.

#### Elemen Form yang Terapung

Viewport yang sempit berarti kita memiliki ruang horisontal yang sempit untuk
meletakkan elemen pada layar.

Untuk membuat ruang layar horisontal lebih efektif untuk digunakan, kita perlu untuk membagi
aliran linear dari header dan memindahkan form dan daftar menjadi bersebelahan satu
sama lain.

<pre class="prettyprint">
{% includecode adjust_indentation="auto"  content_path="web/fundamentals/getting-started/your-first-multi-screen-site/_code/floattheform.html" region_tag="formfloat" %}
</pre>

<video controls poster="images/floatingform.png" style="width: 100%;">
  <source src="videos/floatingform.mov" type="video/mov"></source>
  <source src="videos/floatingform.webm" type="video/webm"></source>
  <p>Maaf, browser Anda tidak mendukung video.
     <a href="videos/floatingform.mov">Unduh video</a>.
  </p>
</video>

#### Elemen Video yang Terapung

Video dalam antarmuka viewport sempit dirancang untuk menjadi layar lebar penuh
dan diletakkan setelah daftar fitur kunci. Pada viewport lebar,
video akan memperbesar diri hingga terlalu besar dan terlihat salah ketika ditempatkan di samping
ke daftar fitur. 

Elemen video perlu dikeluarkan dari aliran vertikal pada viewport sempit
dan harus ditampilkan bersebelahan dengan daftar konten pada viewport lebar.


<pre class="prettyprint">
{% includecode adjust_indentation="auto"  content_path="web/fundamentals/getting-started/your-first-multi-screen-site/_code/floatthevideo.html" region_tag="floatvideo" %}
</pre>

#### Menyusun Gambar Seperti Ubin

Gambar pada viewport sempit (perangkat mobile kebanyakan) ditetapkan untuk
menjadi lebar penuh layar dan ditumpuk secara vertikal. Ini menyebabkan
tampilan pada viewport lebar menjadi kurang estetis.

Untuk membuat gambar terlihat benar pada viewport lebar, gambar-gambar akan di perbesar dengan skala 30%
dari lebar container dan ditata secara horizontal (dari pada vertikal di
viewport sempit). Kita juga akan menambahkan beberapa border radius dan box-shadow untuk membuat
gambar terlihat lebih memiliki daya tarik.


<img src="images/imageswide.png" style="width:100%">

<pre class="prettyprint">
{% includecode adjust_indentation="auto"  content_path="web/fundamentals/getting-started/your-first-multi-screen-site/_code/tiletheimages.html" region_tag="tileimages" %}
</pre>

#### Membuat gambar responsif ke DPI

Saat menggunakan gambar,
pertimbangkan ukuran viewport dan kepadatan layar.

Web sebelumnya dibangun untuk layar dengan kepadatan 96dpi. Dengan diperkenalkannya perangkat mobile,
kita melihat peningkatan besar dalam kepadatan pixel pada layar belum lagi
layar kelas Retina pada laptop. Dengan demikian, gambar yang dikodekan ke kepadatan 96dpi
sering tampak buruk pada perangkat hi-dpi.
Kita memiliki solusi yang belum diadopsi secara luas.
Untuk browser yang mendukung itu, Anda dapat menampilkan gambar kepadatan tinggi pada layar kepadatan tinggi.


    <img src="photo.png" srcset="photo@2x.png 2x">
    

{# include shared/related_guides.liquid inline=true list=page.related-guides.images #}

#### Table

Tabel sangat sulit untuk ditampilkan pada perangkat yang memiliki viewport yang sempit dan perlu
pertimbangan khusus.

Disarankan pada viewport sempit agar Anda mengubah table Anda dengan mengubah
setiap baris ke blok pasangan kunci-nilai (di mana kuncinya adalah header kolom, dan nilainya adalah nilai dari isi sel).
Untungnya, hal ini tidak terlalu sulit. Pertama, catat masing-masing elemen `td` dengan
judul yang sesuai sebagai atribut data. (Efeknya tidak akan terlihat
sampai kita menambahkan beberapa CSS.)

<pre class="prettyprint">
{% includecode adjust_indentation="auto"  content_path="web/fundamentals/getting-started/your-first-multi-screen-site/_code/updatingtablehtml.html" region_tag="table-tbody" %}
</pre>

Sekarang kita hanya perlu menambahkan CSS untuk menyembunyikan `thead` asli dan menampilkan
label `data-th` menggunakan `:before` pseudoelement. Hal ini akan mengakibatkan
pengalaman multi-perangkat yang bisa dilihat di video berikut.

<video controls poster="images/responsivetable.png" style="width: 100%;">
  <source src="videos/responsivetable.mov" type="video/mov"></source>
  <source src="videos/responsivetable.webm" type="video/webm"></source>
  <p>Maaf, browser Anda tidak mendukung video.
     <a href="videos/responsivetable.mov">Unduh video</a>.
  </p>
</video>

Di situs kita,
kita harus membuat breakpoint ekstra khusus untuk isi tabel.
Ketika Anda membangun untuk perangkat mobile dulu, sulit untuk membatalkan style yang telah diterapkan,
jadi kita menyalin CSS table untuk viewport sempit dari CSS untuk viewport lebar.
Ini memberi kita pembagian yang jelas dan konsisten.

<pre class="prettyprint">
{% includecode adjust_indentation="auto"  content_path="web/fundamentals/getting-started/your-first-multi-screen-site/_code/content-with-styles.html" region_tag="table-css" %}
</pre>

### Rangkuman

**SELAMAT** Pada saat Anda telah selesai membaca ini, Anda telah bisa menciptakan
halaman sederhana pertama yang bisa bekerja di berbagai macam perangkat,
faktor-bentuk, dan berbagai macam ukuran layar.

Jika Anda mengikuti panduan ini, Anda akan memiliki pemahaman awal yang baik:

1.  Membuat IA sederhana dan memahami konten Anda sebelum melakukan koding.
2.  Selalu mengatur viewport.
3.  Buat pengalaman dasar Anda dengan pendekatan mobile-first.
4.  Setelah Anda memiliki pengalaman mobile, tingkatkan lebar layar
   sampai terlihat tidak benar dan atur breakpoint Anda di sana.
5.  Lakukan iterasi.


Translated By: 
{% include "_shared/contributors/abdshomad.html" %}
