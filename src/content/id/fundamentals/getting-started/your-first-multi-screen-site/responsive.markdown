---
title: "Membuatnya responsif"
description: "The web is accessible on a huge range of devices, from small-screen phones to big-screen televisions. Each device presents its own benefits and constraints. As a web developer, you are expected to support a full ranges of devices."
key-takeaways:
  make-responsive:
    - Selalu gunakan viewport.
    - Selalu mulai dengan viewport sempit terlebih dahulu.
    - Cari breakpoint yang tepat ketika Anda harus mengadaptasi konten.
    - Buat visi tingkat-tinggi dari tata letak Anda di breakpoint utama.
translators:
  - abdshomad
related-guides:
  responsive:
    -
      title: Mensetting viewport
      href: fundamentals/design-and-ui/responsive/fundamentals/set-the-viewport
      section:
        title: "Desain Web Responsive (Responsive Web design)"
        href: fundamentals/design-and-ui/responsive/fundamentals/set-the-viewport
    -
      title: Menyesuaikan ukuran konten ke viewport
      href: fundamentals/design-and-ui/responsive/fundamentals/size-content-to-the-viewport
      section:
        id: rwd-fundamentals
        title: "Desain Web Responsive (Responsive Web design)"
        href: fundamentals/design-and-ui/responsive/fundamentals/size-content-to-the-viewport
  first-break-point:
    -
      title: Menggunakan Media Queries
      href: fundamentals/design-and-ui/responsive/fundamentals/use-media-queries
      section:
        id: rwd-fundamentals
        title: "Desain Web Responsive (Responsive Web design)"
        href: fundamentals/design-and-ui/responsive/fundamentals/use-media-queries
    -
      title: Pola-Pola Tata Letak (Layout Patterns)
      href: fundamentals/design-and-ui/responsive/patterns/
      section:
        id: rwd-patterns
        title: "Pola-Pola Tata Letak (Layout Patterns)"
        href: fundamentals/design-and-ui/responsive/patterns/
    -
      title: Tata Letak Fluid Semuanya (Mostly Fluid layout)
      href: fundamentals/design-and-ui/responsive/patterns/mostly-fluid
      section:
        id: rwd-patterns
        title: "Desain Web Responsive (Responsive Web design)"
        href: fundamentals/design-and-ui/responsive/patterns/mostly-fluid
  images:
    -
      title: "Meningkatkan kualitas gambar dengan srcset untuk perangkat dengan DPI tinggi"
      href: fundamentals/design-and-ui/media/images/images-in-markup.html#enhance-imgs-with-srcset-for-high-dpi-devices
      section:
        id: images
        title: "Gambar"
        href: fundamentals/design-and-ui/media/images
    -
      title: "Menggunakan media queries untuk menyediakan pengendalian gambar dengan resolusi tinggi"
      href: fundamentals/design-and-ui/media/images/images-in-css.html#use-media-queries-for-conditional-image-loading-or-art-direction
      section:
        id: images
        title: "Gambar"
        href: fundamentals/design-and-ui/media/images
notes:
  styling:
    - Kami telah memilih beberapa set corak style yang mencakup warna, padding dan corak huruf yang sesuai pedoman merek.
  not-all-at-once:
    - Anda tidak harus memindahkan semua elemen secara sekaligus, Anda bisa membuat penyesuaian kecil jika diperlukan.
---

<p class="intro">
  Web bisa diakses di hampir semua perangkat dari ponsel layar kecil
  sampai televisi layar besar. Setiap perangkat menyajikan manfaat dan keunikan tersendiri
  beserta kendala-kendalanya. Sebagai pengembang web, Anda diharapkan untuk
  mendukung semua jenis perangkat.
</p>

{% include shared/toc.liquid %}

Kami membangun situs yang bisa digunakan di berbagai ukuran layar dan jenis perangkat. 
Dalam [Artikel sebelumnya]({{page.previousPage.relative_url}}), kita mendesain 
halaman Information Arsitektur dan membuat struktur dasar.
Dalam panduan ini, kita akan mengambil struktur dasar kita yang sudah berisi konten dan mengubahnya menjadi
halaman indah yang responsif di sejumlah besar ukuran layar.

<div class="mdl-grid">
  <figure class="mdl-cell mdl-cell--4-col mdl-cell--6-col-desktop">
    <img  src="images/content.png" alt="Content" style="max-width: 100%;">
    <figcaption>{% link_sample _code/content-without-styles.html %} Konten dan struktur {% endlink_sample %} </figcaption>
  </figure>
  <figure class="mdl-cell mdl-cell--4-col mdl-cell--6-col-desktop">
    <img  src="images/narrowsite.png" alt="Designed site" style="max-width: 100%;">
    <figcaption>{% link_sample _code/content-with-styles.html %} Hasil Akhir Situs  {% endlink_sample %} </figcaption>
  </figure>
</div>

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

{% include shared/takeaway.liquid list=page.key-takeaways.make-responsive %}

## Tambahkan viewport

Bahkan untuk sekedar halaman biasa, Anda **harus** selalu menyertakan meta tag viewport.
Viewport adalah komponen paling penting yang Anda butuhkan untuk membangun pengalaman multi-perangkat.
Tanpa itu, situs Anda tidak akan bekerja dengan baik pada perangkat ponsel.

Viewport mengindikasikan ke browser bahwa halaman harus disesuaikan untuk pas dengan ukuran
layar. Ada banyak konfigurasi berbeda yang dapat Anda gunakan untuk
viewport Anda untuk mengontrol tampilan halaman. Sebagai default, kami sarankan:

{% include_code src=_code/viewport.html snippet=viewport %}

Viewport berada di head dari dokumen dan hanya perlu dideklarasikan sekali saja.

{% include shared/related_guides.liquid inline=false list=page.related-guides.responsive %}

## Menrapkan style sederhana

Produk dan perusahaan kita sudah memiliki branding yang sangat spesifik dan panduan huruf juga telah disediakan
dalam panduan style.

### Panduan Style

Panduan style adalah cara yang berguna untuk mendapatkan pemahaman tingkat tinggi dari representasi visual
halaman dan membantu Anda memastikan konsistensi di seluruh desain.

#### Warna

<div class="styles" style="font-family: monospace;">
  <div style="background-color: #39b1a4">#39b1a4</div>
  <div style="background-color: white">#ffffff</div>
  <div style="background-color: #f5f5f5">#f5f5f5</div>

  <div style="background-color: #e9e9e9">#e9e9e9</div>
  <div style="background-color: #dc4d38">#dc4d38</div>
</div>

### Tambahkan gambar yang memiliki gaya

Dalam panduan sebelumnya, kita menambahkan gambar yang dinamakan "content images". Ini adalah
gambar yang penting bagi narasi produk kita. Gambar yang memiliki gaya
adalah gambar yang sebenarnya tidak diperlukan sebagai bagian dari isi inti tetapi menambahkan sensasi visual
atau membantu membimbing perhatian pengguna kepada bagian tertentu dari konten.

Contoh yang baik dari ini adalah gambar judul untuk konten 'above the fold'. 
Sering kali digunakan untuk menarik pengguna untuk membaca lebih lanjut tentang produk.

<div class="center">
  <img  src="images/narrowsite.png" alt="Situs yang dirancang" />
</div>

Gambar bisa sangat mudah dimasukkan. Dalam kasus kita, gambar tersebut akan menjadi latar belakang
untuk header dan kita akan menerapkannya melalui CSS sederhana.

{% highlight css %}
#headline {
  padding: 0.8em;
  color: white;
  font-family: Roboto, sans-serif;
  background-image: url(backgroundimage.jpg);
  background-size: cover;
}
{% endhighlight %}

Kita telah memilih gambar latar belakang sederhana yang kabur sehingga tidak mengambil alih 
perhatian dari konten dan kita memasangnya untuk `menutup` seluruh elemen; dengan cara itu
gambar akan selalu terbentang sambil mempertahankan aspek rasio yang benar.

<br style="clear: both;">

## Tentukan breakpoint pertama Anda 

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

{% highlight css %}
@media (min-width: 600px) {

}
{% endhighlight %}

Ada banyak ruang lebih pada layar yang lebih besar sehingga ada lebih banyak fleksibilitas bagaimana
konten akan ditampilkan.

TODO: Continue translation ... 

{% include shared/remember.liquid title="Note" list=page.notes.not-all-at-once %}

Dalam konteks halaman produk kita, sepertinya kita perlu untuk:

*  Membatasi lebar maksimum desain.
*  Mengubah padding elemen dan mengurangi ukuran teks.
*  Memindahkan form agar mengambang in-line dengan konten heading.
*  Membuat video mengambang di sekitar konten.
*  Mengurangi ukuran gambar dan membiarkan gambar tampil di grid yang lebih bagus.

{% include shared/related_guides.liquid inline=true list=page.related-guides.first-break-point %}

## Membatasi lebar maksimum desain

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

{% highlight html %}<div class="container">...</div>{% endhighlight %}

{% include_code src=_code/constrainwidth.html snippet=containerhtml lang=html %}

{% include_code src=_code/constrainwidth.html snippet=container lang=css %}

## Mengubah padding dan mengurangi ukuran teks

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

{% include_code src=_code/alterpadding.html snippet=padding lang=css %}

## Adaptasi elemen untuk viewport lebar

Viewport sempit kita tampil bertumpuk secara linear. Setiap bagian utama dan konten
di dalamnya ditampilkan dalam urutan dari atas ke bawah.

Viewport yang lebar memberi kita ruang ekstra yang bisa digunakan untuk menampilkan konten secara optimal
untuk layar itu. Untuk halaman produk kita, ini berarti bahwa menurut IA kita bisa:

*  Memindahkan form di sekitar informasi header.
*  Memposisikan video ke sebelah kanan dari poin kunci.
*  Menyusun gambar seperti ubin.
*  Memperluas table.

### Elemen Form yang Terapung

Viewport yang sempit berarti kita memiliki ruang horisontal yang sempit untuk
meletakkan elemen pada layar.

Untuk membuat ruang layar horisontal lebih efektif untuk digunakan, kita perlu untuk membagi
aliran linear dari header dan memindahkan form dan daftar menjadi bersebelahan satu
sama lain.

{% include_code src=_code/floattheform.html snippet=formfloat lang=css %}

<video controls poster="images/floatingform.png" style="width: 100%;">
  <source src="videos/floatingform.mov" type="video/mov"></source>
  <source src="videos/floatingform.webm" type="video/webm"></source>
  <p>Maaf, browser Anda tidak mendukung video.
     <a href="videos/floatingform.mov">Unduh video</a>.
  </p>
</video>

### Elemen Video yang Terapung

Video dalam antarmuka viewport sempit dirancang untuk menjadi layar lebar penuh
dan diletakkan setelah daftar fitur kunci. Pada viewport lebar,
video akan memperbesar diri hingga terlalu besar dan terlihat salah ketika ditempatkan di samping
ke daftar fitur. 

Elemen video perlu dikeluarkan dari aliran vertikal pada viewport sempit
dan harus ditampilkan bersebelahan dengan daftar konten pada viewport lebar.


{% include_code src=_code/floatthevideo.html snippet=floatvideo lang=css %}

### Menyusun Gambar Seperti Ubin

Gambar pada viewport sempit (perangkat mobile kebanyakan) ditetapkan untuk
menjadi lebar penuh layar dan ditumpuk secara vertikal. Ini menyebabkan
tampilan pada viewport lebar menjadi kurang estetis.

Untuk membuat gambar terlihat benar pada viewport lebar, gambar-gambar akan di perbesar dengan skala 30%
dari lebar container dan ditata secara horizontal (dari pada vertikal di
viewport sempit). Kita juga akan menambahkan beberapa border radius dan box-shadow untuk membuat
gambar terlihat lebih memiliki daya tarik.


<img src="images/imageswide.png" style="width:100%">

{% include_code src=_code/tiletheimages.html snippet=tileimages lang=css %}

### Membuat gambar responsif ke DPI

Saat menggunakan gambar,
pertimbangkan ukuran viewport dan kepadatan layar.

Web sebelumnya dibangun untuk layar dengan kepadatan 96dpi. Dengan diperkenalkannya perangkat mobile,
kita melihat peningkatan besar dalam kepadatan pixel pada layar belum lagi
layar kelas Retina pada laptop. Dengan demikian, gambar yang dikodekan ke kepadatan 96dpi
sering tampak buruk pada perangkat hi-dpi.
Kita memiliki solusi yang belum diadopsi secara luas.
Untuk browser yang mendukung itu, Anda dapat menampilkan gambar kepadatan tinggi pada layar kepadatan tinggi.

{% highlight html %}
<img src="photo.png" srcset="photo@2x.png 2x">
{% endhighlight %}

{% include shared/related_guides.liquid inline=true list=page.related-guides.images %}

### Table

Tabel sangat sulit untuk ditampilkan pada perangkat yang memiliki viewport yang sempit dan perlu
pertimbangan khusus.

Disarankan pada viewport sempit agar Anda mengubah table Anda dengan mengubah
setiap baris ke blok pasangan kunci-nilai (di mana kuncinya adalah header kolom, dan nilainya adalah nilai dari isi sel).
Untungnya, hal ini tidak terlalu sulit. Pertama, catat masing-masing elemen `td` dengan
judul yang sesuai sebagai atribut data. (Efeknya tidak akan terlihat
sampai kita menambahkan beberapa CSS.)

{% include_code src=_code/updatingtablehtml.html snippet=table-tbody lang=html %}

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

{% include_code src=_code/content-with-styles.html snippet=table-css lang=css %}

## Rangkuman

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
