---

title: "Buat konten dan strukturnya"
description: "Konten adalah aspek yang paling penting dari situs manapun. Dalam panduan ini, kami akan menunjukkan bagaimana Anda dapat dengan cepat merencanakan untuk membangun situs multi-perangkat pertama Anda."
translators:
  - abdshomad
related-guides:
  create-amazing-forms:
    -
      title: Membuat form yang mengagumkan
      href: fundamentals/design-and-ui/input/forms/
      section:
        id: user-input
        title: "Forms"
        href: fundamentals/design-and-ui/input/forms/
    -
      title: Memberikan label dan nama input dengan benar
      href: fundamentals/design-and-ui/input/forms/label-and-name-inputs
      section:
        id: user-input
        title: "Forms"
        href: fundamentals/design-and-ui/input/forms/
    -
      title: Pilih jenis input yang terbaik
      href: fundamentals/design-and-ui/input/forms/choose-the-best-input-type
      section:
        id: user-input
        title: "Forms"
        href: fundamentals/design-and-ui/input/forms/
  video:
    -
      title: Menggunakan video secara efektif
      href: fundamentals/design-and-ui/media/video/
      section:
        id: introduction-to-media
        title: "Video"
        href: fundamentals/design-and-ui/media/
    -
      title: Mengubah posisi awal
      href: fundamentals/design-and-ui/media/video/add-a-video#specify-a-start-and-end-time
      section:
        id: introduction-to-media
        title: "Video"
        href: fundamentals/design-and-ui/media/
    -
      title: Menyertakan gambar poster
      href: fundamentals/design-and-ui/media/video/add-a-video#include-a-poster-image
      section:
        id: introduction-to-media
        title: "Video"
        href: fundamentals/design-and-ui/media/
  images:
    -
      title: Menggunakan gambar secara efektif
      href: fundamentals/design-and-ui/media/images/
      section:
        id: introduction-to-media
        title: "Images"
        href: fundamentals/design-and-ui/media/
    -
      title:  Penggunaan gambar dan markup yang benar
      href: fundamentals/design-and-ui/media/images/images-in-markup
      section:
        id: introduction-to-media
        title: "Images"
        href: fundamentals/design-and-ui/media/
    -
      title: Optimisasi gambar
      href: fundamentals/performance/optimizing-content-efficiency/image-optimization
      section:
        id: introduction-to-media
        title: "Images"
        href: fundamentals/design-and-ui/media/
key-takeaways:
  content-critical:
    - Menentukan konten yang akan Anda tampilkan pertama kali.
    - Membuat sketsa Information Architecture (IA) untuk viewport layar sempit dan layar lebar.
    - Membuat gambar kerangka dari halaman dengan konten tapi tanpa corak dari style.
---

<p class="intro">
Konten adalah aspek yang paling penting dari situs manapun. Mari kita desain konten terlebih dahulu dan tidak membiarkan desain yang mendikte konten. Dalam panduan ini, kita akan mengenali konten apa yang akan kita tampilkan pertama kali, membuat struktur halaman berdasarkan konten ini, dan kemudian menampilkan halaman dalam tata letak linear sederhana yang bekerja dengan baik pada viewport sempit dan lebar.
</p>

{% include shared/toc.liquid %}

## Membuat struktur halaman

Kami telah mengidentifikasi kita membutuhkan:

1.  Suatu area yang melukiskan produk kita secara high-level untuk kursus "CS256: Pengembangan Mobile Web"
2.  Form untuk mengumpulkan informasi dari pengguna yang tertarik dengan produk kita
3.  Deskripsi secara lengkap dan video
4.  Gambararn produk ini beraksi
5.  Sebuah tabel data dengan informasi untuk mendukung pernyataan kita

{% include shared/takeaway.liquid list=page.key-takeaways.content-critical %}

Kita juga telah memiliki corat-coret arsitektur informasi dan tata letak untuk viewport
layar sempit dan layar lebar.

<div class="demo clear" style="background-color: white;">
  <img class="g-wide--1 g-medium--half" src="images/narrowviewport.png" alt="IA Viewport Sempit">
  <img  class="g-wide--2 g-wide--last g-medium--half g--last" src="images/wideviewport.png" alt="IA Viewport Lebar">
</div>

Ini dapat dikonversi dengan mudah menjadi bagian-bagian kasar dari halaman kerangka yang
akan kita gunakan untuk kelanjutan proyek ini.

{% include_code src=_code/addstructure.html snippet=structure %}

## Menambahkan konten ke halaman

Struktur dasar dari situs telah selesai. Kita tahu bagian kita butuhkan,
konten yang ditampilkan di bagian tersebut, dan di mana meletakkannya dalam 
arsitektur informasi secara keseluruhan. Kita sekarang dapat mulai membangun situs.

{% include shared/remember.liquid title="Catatan" inline="true" list=page.notes.styling %}

### Membuat judul dan form

Judul dan formulir permintaan notifikasi adalah komponen penting dari
halaman kita. Komponen ini harus disajikan kepada pengguna segera.

Di judul, tambahkan teks sederhana yang menjelaskan isi kursus:

{% include_code src=_code/addheadline.html snippet=headline %}

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

{% include_code src=_code/addform.html snippet=form %}

{% include shared/related_guides.liquid inline=true list=page.related-guides.create-amazing-forms %}

### Buat Video dan ruang Informasi

Video dan ruang Informasi dari konten kita akan berisi informasi lebih mendalam.
Bagian ini akan memiliki daftar fitur produk dalam bentuk poin-poin dan juga akan berisi
placeholder video yang menunjukkan produk kita bisa dilihat oleh pengguna.

{% include_code src=_code/addvideo.html snippet=section1 %}

Video sering digunakan untuk menggambarkan konten dengan cara yang lebih interaktif dan
sering digunakan untuk menunjukkan demonstrasi produk atau konsep.

Dengan mengikuti best practice, Anda dapat dengan mudah mengintegrasikan video ke situs Anda:

* Tambahkan atribut `controls` untuk membuat pemutaran video menjadi lebih mudah.
* Tambahkan gambar `poster` untuk preview konten.
* Tambahkan beberapa elemen `<source>` berdasarkan format video yang didukung.
* Tambahkan teks alternatif untuk memfasilitasi pengguna untuk men-download video jika mereka tidak bisa memainkannya di window.

{% include_code src=_code/addvideo.html snippet=video lang=html %}

{% include shared/related_guides.liquid inline=true list=page.related-guides.video %}

### Membuat bagian gambar

Situs tanpa gambar sedikit membosankan. Ada dua jenis gambar:

*  Gambar konten &mdash; gambar yang in-line di dalam dokumen dan digunakan
   untuk menyampaikan informasi tambahan tentang konten.
*  Gambar Bercorak &mdash; gambar yang digunakan untuk membuat tampilan situs 
   lebih baik; biasanya berupa gambar latar belakang, pola dan gradien. Kita akan
   membahas ini di [artikel berikutnya]({{page.nextPage.relative_url}}).

Bagian gambar di halaman kita adalah kumpulan gambar konten.

Gambar konten sangat penting untuk menyampaikan pesan halaman. Bayangkan
gambar-gambar ini sebagai gambar yang digunakan dalam artikel koran. Gambar yang kita gunakan adalah
gambar dari para tutor pada proyek: Chris Wilson, Peter Lubbers dan Sean
Bennet.

{% include_code src=_code/addimages.html snippet=images lang=html %}

Gambar diset agar meliputi 100% dari lebar layar. Setting ini bekerja
baik pada perangkat dengan viewport sempit, tapi kurang baik pada perangkat dengan
viewport lebar (seperti desktop). Kita akan membahas ini di bagian desain responsif.

{% include shared/related_guides.liquid inline=true list=page.related-guides.images %}

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

### Tambahkan Bagian tabulasi data

Bagian akhir dari panduan ini adalah tabel sederhana yang digunakan untuk menampilkan 
statistik produk.

Tabel sebaiknya hanya digunakan untuk data tabular, yaitu, matriks informasi.

{% include_code src=_code/addtable.html snippet=section3 %}

### Tambahkan Footer

Kebanyakan situs perlu footer untuk menampilkan konten seperti Syarat dan Ketentuan,
penolakan, dan konten lain yang tidak dimaksudkan untuk berada di navigasi utama
atau di area konten utama halaman.

Di situs kita, kita hanya akan membuat placeholder footer sederhana.

{% include_code src=_code/addcontent.html snippet=footer %}

## Ringkasan

Kita telah membuat garis besar situs dan juga telah mengidentifikasi semua struktur
elemen utama. Kita juga telah memastikan bahwa kita memiliki semua 
konten yang relevan tersedia untuk digunakan sesuai kebutuhan bisnis kita.

<div class="clear">
  <img class="g-wide--2 g-medium--half" src="images/content.png" alt="Content" style="max-width: 100%;">
  <img  class="g-wide--2 g-wide--last g-medium--half g--last" src="images/narrowsite.png" alt="" style="max-width: 100%;">
</div>

Anda akan melihat bahwa halaman masih tampak masih mengerikan sekarang; ini memang disengaja.
Konten adalah aspek yang paling penting dari situs apapun dan kita perlu memastikan telah
memiliki arsitektur informasi yang solid. Panduan ini telah memberi kita
dasar yang sangat baik untuk membangun. Kita akan mencorak konten kita dengan style di panduan berikutnya.
