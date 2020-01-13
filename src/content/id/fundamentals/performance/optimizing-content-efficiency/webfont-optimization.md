project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Tipografi adalah hal mendasar bagi terciptanya desain, branding, keterbacaan, dan aksesibilitas yang baik. Webfont memungkinkan semua hal di atas dan juga yang lainnya: teks dapat dipilih, ditelusuri, di-zoom, dan ramah untuk DPI yang tinggi, menyediakan rendering teks yang konsisten dan tajam apa pun ukuran dan resolusinya.

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2014-09-19 #}
{# wf_blink_components: Blink>CSS #}

# Optimasi Font Web {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

Tipografi adalah hal mendasar bagi terciptanya desain, branding, keterbacaan, dan aksesibilitas yang baik. Webfont memungkinkan
semua hal di atas dan juga yang lainnya: teks dapat dipilih, ditelusuri, di-zoom, dan ramah untuk DPI yang tinggi,
menyediakan rendering teks yang konsisten dan tajam apa pun ukuran dan resolusinya. Webfont
sangat penting bagi desain yang baik, UX, dan kinerja.

Optimalisasi webfont merupakan bagian penting dari strategi kinerja keseluruhan. Setiap font merupakan
resource tambahan, dan sebagian font mungkin memblokir rendering teks, namun karena halaman
menggunakan webfont tidak berarti halaman tersebut harus merender lebih lambat. Sebaliknya, font yang dioptimalkan, dipadukan
dengan strategi yang cermat mengenai cara webfont dimuat dan diterapkan pada halaman akan dapat
membantu mengurangi ukuran halaman total, dan memperbaiki waktu rendering halaman.


## Anatomi webfont

### TL;DR {: .hide-from-toc }
* Font Unicode dapat berisi ribuan glyph.
* Ada empat format font: WOFF2, WOFF, EOT, dan TTF.
* Sebagian format font membutuhkan penggunaan kompresi.


*Webfont* adalah sekumpulan glyph, dan masing-masing glyph merupakan bentuk vektor yang menggambarkan huruf atau
simbol. Hasilnya, dua variabel sederhana menentukan file ukuran font tertentu: kompleksitas
jalur vektor dari setiap glyph dan jumlah gylph dalam font tertentu. Misalnya
, Open Sans, yang merupakan salah satu webfont terpopuler, mengandung 897 glyph, yang meliputi karakter
Latin, Yunani, dan Cyrilic.

<img src="images/glyphs.png"  alt="Tabel glyph font">

Saat memilih font, penting untuk mempertimbangkan himpunan karakter apa yang didukung. Jika Anda perlu
melokalkan materi halaman Anda ke beberapa bahasa, Anda harus menggunakan font yang bisa menghadirkan
tampilan dan pengalaman yang konsisten ke pengguna. Sebagai contoh, [jenis font Noto dari
Google](https://www.google.com/get/noto/){: .external } bertujuan mendukung semua bahasa di dunia.
Akan tetapi, ukuran total dari Noto, dengan semua bahasa disertakan, menghasilkan download
sebesar 1,1GB+ ZIP.

Jadi jelas, menggunakan font pada web memerlukan rekayasa yang saksama guna memastikan bahwa tipografi tidak
menghalangi kinerja. Beruntungnya, platform web menyediakan semua kenyamanan yang diperlukan, dan di bagian selanjutnya
dari panduan ini memberikan pandangan langsung tentang cara terbaik memperoleh yang terbaik dari keduanya.

### Format webfront

Saat ini ada empat format kontainer font yang digunakan di web:
[EOT](https://en.wikipedia.org/wiki/Embedded_OpenType),
[TTF](https://en.wikipedia.org/wiki/TrueType),
[WOFF](https://en.wikipedia.org/wiki/Web_Open_Font_Format), dan
[WOFF2](https://www.w3.org/TR/WOFF2/){: .external }. Sayangnya meskipun terdapat berbagai
pilihan yang luas, tidak ada satu format universal yang berfungsi di seluruh browser lama dan baru: EOT
[hanya untuk IE](http://caniuse.com/#feat=eot), TTF [mendukung
sebagian IE](http://caniuse.com/#search=ttf), WOFF memiliki dukungan terluas tetapi [tidak tersedia di
beberapa browser lama](http://caniuse.com/#feat=woff), dan dukungan WOFF 2.0 [karya yang masih terus dikembangkan
untuk banyak browser](http://caniuse.com/#feat=woff2).

Jadi, apa arti semua ini bagi kita? Tidak ada satu format tunggal yang berfungsi di semua browser, yang berarti
bahwa kita perlu menyerahkan beberapa format untuk menghasilkan pengalaman yang konsisten:

* Menyajikan varian WOFF 2.0 ke browser yang mendukungnya.
* Menyajikan varian WOFF ke sebagian besar browser.
* Menyajikan varian TTF ke browser Android lawas (di bawah 4.4).
* Menyajikan varian EOT ke browser IE lawas (di bawah IE9).

Note: Secara teknis, ada format kontainer lain, <a href='http://caniuse.com/svg-fonts'>kontainer font
SVG</a>, tetapi IE dan Firefox tidak pernah mendukungnya, dan kini tidak digunakan lagi di Chrome. Dengan
demikian, penggunaannya terbatas dan itu sengaja dihilangkan dalam panduan ini.

### Mengurangi ukuran font dengan kompresi

Font merupakan koleksi glyph, masing-masing dengan seperangkat jalur yang menjelaskan format huruf. Masing-masing
glyph berbeda namun bagaimana pun juga mengandung informasi serupa yang bisa
dikompresikan dengan GZIP, atau kompresor yang kompatibel:

* Format EOT dan TTF tidak dikompresi secara default. Pastikan server Anda telah dikonfigurasikan untuk
menerapkan [kompresi GZIP](/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer#text-compression-with-gzip)
saat mengirimkan format ini.
* WOFF memiliki kompresi bawaan. Pastikan bahwa kompresor WOFF Anda menggunakan setelan
kompresi optimal.
* WOFF2 menggunakan algoritme pra-pemrosesan dan kompresi khusus untuk mencapai ~30% pengurangan ukuran file
dibandingkan format lain. Untuk informasi selengkapnya, lihat
[laporan evaluasi WOFF 2.0](http://www.w3.org/TR/WOFF20ER/){: .external }.

Terakhir, perlu diperhatikan bahwa sebagian format font mengandung metadata tambahan, misalnya informasi [petunjuk
font](https://en.wikipedia.org/wiki/Font_hinting) dan
[kerning](https://en.wikipedia.org/wiki/Kerning) mungkin tidak diperlukan di beberapa
platform, yang memungkinkan optimalisasi ukuran file lebih lanjut. Lihatlah kompresor font Anda untuk opsi optimalisasi yang
tersedia, dan jika Anda mengambil rute ini, pastikan bahwa Anda memiliki infrastruktur
yang sesuai untuk menguji dan mengirimkan font yang telah dioptimalkan ini ke setiap browser. Misalnya, [Google
Fonts](https://fonts.google.com/) mempertahankan 30+ varian yang dioptimalkan untuk setiap font dan secara otomatis
mendeteksi dan mengirimkan varian optimal untuk setiap platform dan browser.

Note: Pertimbangkan menggunakan <a href='http://en.wikipedia.org/wiki/Zopfli'>kompresi Zopfli</a> untuk format
EOT, TTF, dan WOFF. Zopfli adalah kompresor kompatibel zlib yang menghasilkan pengurangan
ukuran file sebesar ~5% melalui gzip.

## Menentukan jenis font dengan @font-face

### TL;DR {: .hide-from-toc }
* Gunakan petunjuk `format()` untuk menetapkan format font.
* Subset font Unicode besar untuk meningkatkan kinerja. Gunakan subset rentang unicode dan berikan fallback
subset manual untuk browser yang lebih lawas.
* Kurangi jumlah varian font gaya untuk meningkatkan kinerja rendering halaman dan teks.


`@font-face` CSS at-rule memungkinkan Anda untuk mendefinisikan sumber daya lokasi font tertentu, karakteristik gayanya,
dan titik kode Unicode yang harus digunakannya. Paduan deklarasi @font-face seperti itu
`dapat digunakan untuk mengonstruksikan "jenis font" yang akan digunakan browser untuk
mengevaluasi sumber daya font mana yang harus didownload dan diterapkan ke halaman saat ini.

### Pemilihan format

Setiap deklarasi `@font-face` menyediakan nama jenis font, yang bertindak sebagai grup logis dari beberapa
deklarasi, [properti font](http://www.w3.org/TR/css3-fonts/#font-prop-desc) seperti gaya,
bobot, dan regangan, serta [deskriptor src](http://www.w3.org/TR/css3-fonts/#src-desc),
yang menetapkan daftar lokasi prioritas untuk resource font.


    @font-face {
      font-family: 'Awesome Font';
      font-style: normal;
      font-weight: 400;
      src: local('Awesome Font'),
           url('/fonts/awesome.woff2') format('woff2'),
           url('/fonts/awesome.woff') format('woff'),
           url('/fonts/awesome.ttf') format('truetype'),
           url('/fonts/awesome.eot') format('embedded-opentype');
    }

    @font-face {
      font-family: 'Awesome Font';
      font-style: italic;
      font-weight: 400;
      src: local('Awesome Font Italic'),
           url('/fonts/awesome-i.woff2') format('woff2'),
           url('/fonts/awesome-i.woff') format('woff'),
           url('/fonts/awesome-i.ttf') format('truetype'),
           url('/fonts/awesome-i.eot') format('embedded-opentype');
    }


Pertama-tama, perhatikan bahwa contoh di atas menetapkan satu jenis _Awesome Font_ dengan dua gaya (normal
dan _italic_). masing-masing yang mengarahkan ke seperangkat resource font. Pada gilirannya, setiap deskriptor `src`
mengandung daftar prioritas, yang dipisah koma dari varian resource:

* Direktif `local()` memungkinkan kita untuk mereferensikan, membuat, dan menggunakan font yang dipasang secara lokal.
* Direktif `url()` memungkinkan Anda untuk memuat font eksternal, dan dimungkinkan untuk petunjuk
`format()` opsional yang mengindikasikan format dari font yang direferensikan oleh URL yang disediakan.


Note: Kecuali Anda mereferensikan salah satu dari font sistem default, pengguna jarang yang
menginstalnya secara lokal, terutama di perangkat seluler, tempat yang tidak mungkin untuk "menginstal"
font tambahan. Anda harus selalu memulai dengan entri `local()` "untuk berjaga-jaga", lalu memberikan
daftar `url()` entri.

Ketika browser menentukan bahwa font diperlukan, browser menyatakan melalui daftar
resource yang diberikan dalam urutan yang ditetapkan serta mencoba memuat resource yang sesuai. Misalnya, mengikuti contoh
di atas:

1. Browser melakukan layout halaman dan menentukan varian font mana yang diperlukan untuk merender
teks tertentu di halaman itu.
1. Untuk setiap font yang diperlukan, browser akan memeriksa apakah font tersedia lokal.
1. Jika font tidak tersedia lokal, browser akan mengiterasi definisi eksternal:
    * Jika petunjuk format ada pada browser, periksa apakah petunjuk itu mendukungnya sebelum memulai
      download. Jika browser tidak dapat mendukung petunjuk, browser akan melanjutkan ke yang berikutnya.
    * Jika tidak ada petunjuk format, browser akan mendowload resource.

Kombinasi direktif lokal dan eksternal dengan petunjuk format yang sesuai memungkinkan kita untuk menetapkan
semua font yang tersedia dan membiarkan browser menangani yang tersisa. Browser menentukan resource
mana yang dibutuhkan dan akan memilih format yang optimal.

Note: Urutan varian font perlu dispesifikasikan. Browser akan memilih format pertama yang
didukungnya. Karena itu, jika Anda ingin browser yang lebih baru menggunakan WOFF2, maka Anda harus menempatkan deklarasi
WOFF2 di atas WOFF, dan seterusnya.

### Men-subset rentang unicode

Selain properti font seperti gaya, bobot, dan regangan, aturan
`@font-face` memungkinkan kita untuk mendefinisikan seperangkat titik kode Unicode yang didukung oleh
setiap resource. Ini memungkinkan kita untuk memisahkan font Unicode besar ke dalam subset
yang lebih kecil (Misalnya, Latin, Cyrillic, Yunani) dan hanya mengunduh glyph
yang dibutuhkan untuk merender teks pada halaman tertentu.

[Deskriptor rentang unicode](http://www.w3.org/TR/css3-fonts/#descdef-unicode-range) memungkinkan Anda untuk
menetapkan daftar yang berbatas koma dari nilai-nilai rentang, masing-masing dapat berupa salah satu dari tiga format
berbeda:

* Poin kode tunggal (misalnya, `U+416`)
* Rentang interval (misalnya, `U+400-4ff`): menunjukkan poin kode mulai dan berhenti dari suatu rentang
* Rentang karakter pengganti (misalnya, `U+4??`): `?` karakter menunjukkan digit heksadesimal

Misalnya, Anda dapat memisahkan jenis _Awesome Font_ ke dalam subset
Latin dan Jepang, masing-masing akan didownload oleh browser sesuai kebutuhan:


    @font-face {
      font-family: 'Awesome Font';
      font-style: normal;
      font-weight: 400;
      src: local('Awesome Font'),
           url('/fonts/awesome-l.woff2') format('woff2'),
           url('/fonts/awesome-l.woff') format('woff'),
           url('/fonts/awesome-l.ttf') format('truetype'),
           url('/fonts/awesome-l.eot') format('embedded-opentype');
      unicode-range: U+000-5FF; /* Latin glyphs */
    }

    @font-face {
      font-family: 'Awesome Font';
      font-style: normal;
      font-weight: 400;
      src: local('Awesome Font'),
           url('/fonts/awesome-jp.woff2') format('woff2'),
           url('/fonts/awesome-jp.woff') format('woff'),
           url('/fonts/awesome-jp.ttf') format('truetype'),
           url('/fonts/awesome-jp.eot') format('embedded-opentype');
      unicode-range: U+3000-9FFF, U+ff??; /* Japanese glyphs */
    }


Note: Subset rentang unicode terutama penting bagi bahasa-bahasa di Asia, yang memiliki jumlah
glyph lebih banyak daripada bahasa Barat dan font "penuh" biasa sering kali diukur dalam
megabyte, dan bukan puluhan kilobyte.

Penggunaan subset rentang unicode, dan file terpisah untuk setiap varian bergaya dari font memungkinkan
Anda untuk mendefinisikan jenis font komposit yang sama-sama lebih cepat dan lebih efisien untuk didownload. Pengunjung
hanya mengunduh varian dan subset yang diperlukan, dan tidak dipaksa mendownload subset yang mungkin tidak pernah
mereka lihat atau gunakan di halaman.

Dengan demikian, ada satu masalah kecil dengan rentang unicode: [belum semua browser
mendukungnya](http://caniuse.com/#feat=font-unicode-range). Sebagian browser
cukup mengabaikan petunjuk rentang unicode dan akan mendownload semua varian, sementara
browser lain tidak dapat memproses sama sekali deklarasi `@font-face`. Untuk menanganinya, kita perlu
kembali ke "subset manual" untuk browser lawas.

Karena browser lawas tidak cukup cerdas untuk memilih hanya subset yang diperlukan dan tidak dapat mengonstruksikan
font komposit, Anda harus kembali untuk menyediakan satu resource font yang berisi semua subset yang
diperlukan dan menyembunyikan yang lainnya dari browser. Misalnya, jika halaman hanya menggunakan karakter
Latin, maka Anda bisa melepaskan glyph lain dan menyediakan subset khusus itu sebagai resource
yang berdiri sendiri.

1. **Bagaimana cara Anda menentukan subset yang diperlukan?**
    * Jika browser mendukung subset rentang unicode, maka browser secara otomatis akan memilih subset yang
      tepat. Halaman hanya perlu menyediakan file subset dan menetapkan rentang-unicode dalam
      aturan `@font-face`.
    * Jika browser tidak mendukung subset rentang unicode, maka halaman harus menyembunyikan semua
      subset yang tidak perlu; yaitu, developer harus menetapkan subset yang diperlukan.
1. **Bagaimana Anda menghasilkan subset font**
    - Gunakan sumber-terbuka [fitur pyftsubset](https://github.com/behdad/fonttools/){: .external } untuk
    men-subset dan mengoptimalkan font Anda.
    - Beberapa layanan font memungkinkan subset manual lewat parameter kueri khusus, yang dapat Anda gunakan untuk
    menetapkan secara manual subset yang dibutuhkan untuk halaman Anda. Lihat dokumentasi dari penyedia
    font Anda.


### Pemilihan dan sintesis font

Masing-masing jenis font terdiri dari beberapa varian bergaya (reguler, tebal, miring) dan beberapa bobot untuk setiap
gaya, yang masing-masing dapat berisi bentuk glyph berbeda&mdash;misalnya
, spasi, ukuran berbeda, atau bentuk berbeda bersama.

<img src="images/font-weights.png"  alt="Bobot font">

Misalnya, diagram di atas menggambarkan jenis font yang menawarkan tiga
bobot ketebalan berbeda: 400 (reguler), 700 (tebal), dan 900 (ekstra tebal). Semua
varian antara (diindikasikan dalam warna kelabu) otomatis dipetakan ke
varian terdekat oleh browser.



> Ketika bobot ditetapkan untuk yang tidak memiliki wajah, wajah dengan bobot di sekitar bobot digunakan. Secara
umum, bobot tebal memetakan ke wajah dengan bobot lebih berat dan bobot
lebih ringan.
> > <a href="http://www.w3.org/TR/css3-fonts/#font-matching-algorithm">Algoritme pencocokan
font CSS3</a>



Logika serupa berlaku untuk varian _italic_. Desainer font mengontrol
varian mana yang mereka akan produksi, dan Anda mengontrol varian yang akan digunakan pada
halaman. Karena setiap varian merupakan hasil download terpisah, merupakan ide yang baik untuk menjaga
jumlah varian tetap kecil. Misalnya, Anda dapat mendefinisikan dua varian tebal bagi jenis
_Awesome Font_:


    @font-face {
      font-family: 'Awesome Font';
      font-style: normal;
      font-weight: 400;
      src: local('Awesome Font'),
           url('/fonts/awesome-l.woff2') format('woff2'),
           url('/fonts/awesome-l.woff') format('woff'),
           url('/fonts/awesome-l.ttf') format('truetype'),
           url('/fonts/awesome-l.eot') format('embedded-opentype');
      unicode-range: U+000-5FF; /* Latin glyphs */
    }

    @font-face {
      font-family: 'Awesome Font';
      font-style: normal;
      font-weight: 700;
      src: local('Awesome Font'),
           url('/fonts/awesome-l-700.woff2') format('woff2'),
           url('/fonts/awesome-l-700.woff') format('woff'),
           url('/fonts/awesome-l-700.ttf') format('truetype'),
           url('/fonts/awesome-l-700.eot') format('embedded-opentype');
      unicode-range: U+000-5FF; /* Latin glyphs */
    }


Contoh di atas mendeklarasikan jenis _Awesome Font_ yang terdiri
dari dua resource glyph (`U+000-5FF`) namun menawarkan "bobot" berbeda: normal (400), dan tebal
(700). Akan tetapi, apa yang terjadi jika salah satu aturan CSS Anda menetapkan bobot font berbeda, atau
menetapkan properti gaya-font menjadi miring?

- Jika font yang benar-benar sama tidak tersedia, browser akan menggantinya dengan yang paling cocok.
- Jika tidak ditemukan gaya yang cocok (misalnya, varian miring sama sekali tidak disebutkan dalam contoh
di atas) maka browser akan mensintesiskan varian font-nya sendiri.

<img src="images/font-synthesis.png"  alt="Sintesis font">


Perhatian: Penulis juga harus menyadari bahwa pendekatan yang disintesis mungkin tidak cocok untuk skrip seperti
Cyrillic, yang mana format miring sangat berbeda bentuknya. Untuk keakuratan yang memadai dalam skrip tersebut,
gunakan font miring aktual.

Contoh di atas menggambarkan perbedaan di antara hasil font aktual vs. font yang disintesiskan untuk
Open Sans. Semua varian yang disintesiskan dihasilkan dari font yang berbobot 400. Seperti yang Anda bisa lihat,
ada perbedaan yang mencolok dalam hasilnya. Detail mengenai cara menghasilkan varian tebal dan miring
tidak ditetapkan. Oleh karena itu, hasilnya bervariasi dari browser ke browser, dan sangat
bergantung pada font.

Note: Untuk konsistensi dan hasil visual terbaik, jangan mengandalkan sintesis font. Sebaliknya, minimalkan
jumlah varian font yang digunakan dan tentukan lokasinya, sedemikian rupa sehingga browser bisa mendownloadnya
saat digunakan pada halaman. Dengan demikian, dalam sebagian kasus varian yang disintesiskan <a
href='https://www.igvita.com/2014/09/16/optimizing-webfont-selection-and-synthesis/'>mungkin merupakan opsi
yang layak</a>, namun gunakan secara hati-hati.

## Mengoptimalkan pemuatan dan rendering

### TL;DR {: .hide-from-toc }
* Secara default, permintaan font ditunda sampai pohon render dikonstruksikan,
yang dapat mengakibatkan tertundanya rendering teks.
* `<link rel="preload">`, properti `font-display` CSS, dan Font Loading
API memberikan sarana pendukung yang diperlukan untuk menerapkan strategi pemuatan dan rendering font kustom
, mengganti perilaku default.


Webfont "penuh" yang mencakup semua varian bergaya, yang mungkin tidak Anda perlukan, plus semua glyph,
yang mungkin tidak akan terpakai, dapat dengan mudah menghasilkan download multi-megabyte. Untuk menangani hal ini, aturan CSS
`@font-face` secara spesifik dirancang untuk memungkinkan Anda memisahkan jenis font ke dalam
sekumpulan resource: subset unicode, varian gaya berbeda, dst.

Mengingat deklarasi ini, browser menghitung subset yang diperlukan dan varian serta mendownload set minimum yang
diperlukan untuk merender teks, yang sangat nyaman. Namun, jika Anda tidak
berhati-hati, hal itu dapat pula menciptakan bottleneck kinerja dalam jalur rendering penting dan menunda
rendering teks.

### Perilaku default

Pemuatan yang lambat dari font membawa implikasi tersembunyi penting yang mungkin menunda rendering: browser
harus [mengonstruksikan
pohon render](/web/fundamentals/performance/critical-rendering-path/render-tree-construction), yang bergantung
pada pohon DOM dan CSSOM, sebelum mengetahui resource font mana yang diperlukan untuk
merender teks. Akibatnya, permintaan font tertunda setelah resource penting lain, dan browser
dapat diblokir dari merender teks sampai resource diambil.

<img src="images/font-crp.png"  alt="Jalur rendering penting font">

1. Permintaan browser meminta dokumen HTML.
1. Browser mulai mengurai respons HTML dan mengonstruksikan DOM.
1. Browser menemukan CSS, JS, dan resource lainnya serta mengirimkan permintaan.
1. Browser mengonstruksikan CSSOM setelah semua konten CSS diterima dan memadukannya dengan
pohon DOM untuk mengonstruksikan pohon render.
    - Permintaan font dikirimkan setelah pohon render menunjukkan varian font mana yang dibutuhkan untuk
    merender teks yang ditentukan pada halaman.
1. Browser melakukan layout dan menggambar konten ke layar.
    - Jika font belum tersedia, browser mungkin tidak merender piksel teks apa pun.
    - Setelah font tersedia, browser akan menggambar piksel teks.

"Balapan" antara penggambaran pertama pada konten halaman, yang dapat dilakukan segera
setelah pohon render dibangun, dan permintaan untuk resource font adalah yang
membuat "masalah teks kosong" tempat browser mungkin merender layout laman tetapi
menghilangkan setiap teks.

Bagian selanjutnya menjelaskan sejumlah opsi untuk menyesuaikan perilaku default ini.

### Pramuat resource Webfont

Jika ada kemungkinan besar bahwa halaman Anda akan membutuhkan Webfont tertentu yang dihosting
pada URL yang Anda ketahui sebelumnya, Anda dapat memanfaatkan fitur platform web
baru: [`<link rel="preload">`](/web/fundamentals/performance/resource-prioritization).

Itu memungkinkan Anda menyertakan elemen di HTML Anda, biasanya sebagai bagian dari
`<head>`, yang akan memicu permintaan untuk Webfont di awal jalur render
penting, tanpa harus menunggu CSSOM dibuat.

`<link rel="preload">` menayangkan sebagai "petunjuk" ke browser bahwa resource yang diberikan
akan segera dibutuhkan, tetapi tidak memberi tahu browser *bagaimana* cara menggunakannya.
Anda perlu menggunakan pramuat bersamaan dengan definisi `@font-face`
CSS yang sesuai untuk memberi tahu browser apa yang harus dilakukan dengan URL Webfont yang diberikan.

```html
<head>
  <!-- Other tags... -->
  <link rel="preload" href="/fonts/awesome-l.woff2" as="font">
</head>
```

```css
@font-face {
  font-family: 'Awesome Font';
  font-style: normal;
  font-weight: 400;
  src: local('Awesome Font'),
       url('/fonts/awesome-l.woff2') format('woff2'), /* will be preloaded */
       url('/fonts/awesome-l.woff') format('woff'),
       url('/fonts/awesome-l.ttf') format('truetype'),
       url('/fonts/awesome-l.eot') format('embedded-opentype');
  unicode-range: U+000-5FF; /* Latin glyphs */
}
```

Tidak semua browser [mendukung `<link rel="preload">`](https://caniuse.com/#feat=link-rel-preload),
dan pada browser tersebut, `<link rel="preload">` hanya akan diabaikan. Akan tetapi, setiap
browser yang mendukung pramuat juga mendukung WOFF2, jadi Anda harus selalu melakukan pramuat dengan
format itu.

Perhatian: Menggunakan `<link rel="preload">` akan membuat permintaan
tanpa syarat dan prioritas tinggi untuk URL Webfont, terlepas dari apakah URL itu
benar-benar diperlukan pada halaman. Jika ada peluang yang paling mungkin bahwa salinan jarak jauh dari
Webfont tidak diperlukan—misalnya, karena definisi `@font-face` termasuk
entri `local()` untuk font umum seperti Roboto—maka menggunakan
`<link rel="preload">` akan menghasilkan permintaan yang sia-sia. Beberapa browser akan
menampilkan peringatan di Developer Tools Console ketika resource dipramuat
tetapi tidak benar-benar digunakan.

### Sesuaikan penundaan rendering teks

Sementara pramuat memungkinkan Webfont akan tersedia saat
konten halaman dirender, itu tidak memberikan jaminan. Anda masih perlu mempertimbangkan
bagaimana browser berperilaku ketika merender teks yang menggunakan `font-family` yang
masih belum tersedia.

#### Perilaku browser

"Balapan" antara penggambaran pertama pada konten halaman, yang dapat dilakukan segera
setelah pohon render dibangun, dan permintaan untuk resource font adalah yang
membuat "masalah teks kosong" tempat browser mungkin merender layout laman tetapi
menghilangkan setiap teks. Sebagian besar browser menerapkan batas waktu tunggu maksimum yang akan ditunggu
Webfont untuk mendownload, setelah itu font pengganti akan digunakan. Sayangnya,
browser berbeda pada implementasinya:

<table>
  <thead>
    <tr>
      <th data-th="Browser">Browser</th>
      <th data-th="Timeout">Waktu tunggu</th>
      <th data-th="Fallback">Pengganti</th>
      <th data-th="Swap">Tukar</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Browser">
        <strong>Chrome 35+</strong>
      </td>
      <td data-th="Timeout">
        3 detik
      </td>
      <td data-th="Fallback">
        Ya
      </td>
      <td data-th="Swap">
        Ya
      </td>
    </tr>
    <tr>
      <td data-th="Browser">
        <strong>Opera</strong>
      </td>
      <td data-th="Timeout">
        3 detik
      </td>
      <td data-th="Fallback">
        Ya
      </td>
      <td data-th="Swap">
        Ya
      </td>
    </tr>
    <tr>
      <td data-th="Browser">
        <strong>Firefox</strong>
      </td>
      <td data-th="Timeout">
        3 detik
      </td>
      <td data-th="Fallback">
        Ya
      </td>
      <td data-th="Swap">
        Ya
      </td>
    </tr>
    <tr>
      <td data-th="Browser">
        <strong>Internet Explorer</strong>
      </td>
      <td data-th="Timeout">
        0 detik
      </td>
      <td data-th="Fallback">
        Ya
      </td>
      <td data-th="Swap">
        Ya
      </td>
    </tr>
    <tr>
      <td data-th="Browser">
        <strong>Safari</strong>
      </td>
      <td data-th="Timeout">
        Tidak ada waktu tunggu
      </td>
      <td data-th="Fallback">
        T/A
      </td>
      <td data-th="Swap">
        T/A
      </td>
    </tr>
  </tbody>
</table>

- Chrome dan Firefox memiliki waktu tunggu tiga detik setelah teks ditampilkan
dengan font pengganti. Jika font berhasil didownload, maka akhirnya penukaran
terjadi dan teks dirender ulang dengan font yang dimaksud.
- Internet Explorer tidak memiliki waktu tunggu yang mengakibatkan rendering
teks langsung. Jika font yang diminta belum tersedia, font pengganti akan digunakan, dan
teks dirender ulang nanti setelah font yang diminta tersedia.
- Safari tidak memiliki perilaku waktu tunggu (atau setidaknya tidak ada yang melebihi waktu tunggu jaringan
dasar).

Untuk memastikan konsistensi bergerak maju, CSS Working Group telah mengusulkan deskriptor
`@font-face` baru,
[`font-display`](https://drafts.csswg.org/css-fonts-4/#font-display-desc), dan
properti terkait untuk mengendalikan bagaimana font yang dapat didownload merender sebelum
dimuat.

#### Timeline tampilan font

Serupa dengan perilaku waktu tunggu font yang ada yang diterapkan beberapa browser pada
saat ini, `font-display` membagi masa pakai download font menjadi tiga periode
utama:

1. Periode pertama adalah **periode pemblokiran font**. Selama periode ini, jika
bentuk font tidak dimuat, elemen apa pun yang mencoba menggunakannya harus melakukan rendering
dengan bentuk font pengganti yang tidak terlihat. Jika bentuk font berhasil dimuat selama
periode pemblokiran, maka bentuk font akan digunakan secara normal.
2. **Periode penukaran font** terjadi segera setelah periode pemblokiran font. Selama
periode ini, jika bentuk font tidak dimuat, elemen apa pun yang mencoba menggunakannya
harus merender dengan bentuk font pengganti. Jika bentuk font berhasil
dimuat selama periode penukaran, maka bentuk font akan digunakan secara normal.
3. **Periode kegagalan font** terjadi segera setelah
periode pertukaran font. Jika bentuk font belum dimuat saat periode ini dimulai,
maka ditandai sebagai gagal memuat, menyebabkan penggantian font normal. Kalau tidak, bentuk
font digunakan secara normal.

Memahami periode-periode ini berarti Anda dapat menggunakan `font-display` untuk memutuskan bagaimana
font Anda harus dirender bergantung pada apakah atau kapan itu didownload.

#### Menggunakan tampilan font

Untuk bekerja dengan properti `font-display`, tambahkan aturan `@font-face` Anda:

```css
@font-face {
  font-family: 'Awesome Font';
  font-style: normal;
  font-weight: 400;
  font-display: auto; /* or block, swap, fallback, optional */
  src: local('Awesome Font'),
       url('/fonts/awesome-l.woff2') format('woff2'), /* will be preloaded */
       url('/fonts/awesome-l.woff') format('woff'),
       url('/fonts/awesome-l.ttf') format('truetype'),
       url('/fonts/awesome-l.eot') format('embedded-opentype');
  unicode-range: U+000-5FF; /* Latin glyphs */
}
```

`font-display` saat ini mendukung rentang nilai berikut:
`auto | block | swap | fallback | optional`.

- **`auto`** menggunakan strategi tampilan font apa pun yang digunakan agen pengguna. Sebagian besar browser
saat ini memiliki strategi default yang mirip dengan `block`.

- **`block`** memberikan bentuk font sebuah periode pemblokiran singkat (3d direkomendasikan dalam kebanyakan kasus)
dan periode penukaran tak terbatas. Dengan kata lain, browser menggambar teks "tidak terlihat"
terlebih dahulu jika font tidak dimuat, tetapi menukar bentuk font segera setelah
dimuat. Untuk melakukannya, browser membuat bentuk font anonim dengan metrik
yang serupa dengan font yang dipilih tetapi dengan semua glyph yang tidak mengandung "tinta".
Nilai ini hanya boleh digunakan jika rendering teks dalam jenis huruf tertentu
diperlukan agar halaman dapat digunakan.

- **`swap`** memberikan bentuk font sebuah periode pemblokiran nol detik dan periode penukaran tak terbatas.
Ini berarti browser segera menggambar teks dengan penggantian jika bentuk font
tidak dimuat, tetapi menukar bentuk font segera setelah dimuat. Serupa dengan `block`,
nilai ini hanya boleh digunakan ketika merender teks dalam font tertentu merupakan hal
penting untuk halaman, tetapi rendering dalam font apa pun masih akan mendapatkan pesan
yang benar di seluruh halaman. Teks logo adalah kandidat yang bagus untuk **penukaran** karena menampilkan
nama perusahaan menggunakan pengganti yang masuk akal akan membuat pesan tersebar tetapi Anda
nantinya akan menggunakan jenis huruf resmi.

- **`fallback`** memberikan bentuk font sebuah periode blok yang sangat sedikit (100ms atau kurang
direkomendasikan dalam kebanyakan kasus) dan periode penukaran singkat (disarankan tiga detik
dalam kebanyakan kasus). Dengan kata lain, bentuk font dirender dengan pengganti
terlebih dahulu jika font tidak dimuat, tetapi font tersebut ditukar segera setelah dimuat. Namun,
jika terlalu banyak waktu berlalu, pengganti akan digunakan untuk sisa waktu
halaman. `fallback` adalah kandidat yang bagus untuk hal-hal seperti isi teks di mana Anda
ingin pengguna agar segera membaca secepat mungkin dan tidak ingin mengganggu
pengalaman mereka dengan menggeser teks saat font baru dimuat.

- **`optional`** memberikan bentuk font sebuah periode pemblokiran yang sangat sedikit (100ms atau kurang
direkomendasikan dalam kebanyakan kasus) dan periode penukaran nol detik. Serupa dengan `fallback`,
ini adalah pilihan yang baik saat font yang didownload lebih dari "bagus untuk dimiliki"
tapi tidak penting bagi pengalaman. Nilai `optional` menyerahkannya ke
browser untuk memutuskan apakah akan memulai download font, yang mungkin memilih untuk tidak
dilakukan atau mungkin melakukannya sebagai prioritas rendah bergantung pada apa yang menurut browser
terbaik bagi pengguna. Ini bisa bermanfaat dalam situasi ketika pengguna berada pada
koneksi lemah dan menarik font ke bawah mungkin bukan penggunaan resource terbaik.

`font-display` sedang [menerapkan](https://caniuse.com/#feat=css-font-rendering-controls)
di banyak browser modern. Anda dapat mengharapkan konsistensi dalam perilaku
browser karena browser diterapkan secara luas.


### Font Loading API

Digunakan bersama-sama, `<link rel="preload">` dan `font-display` CSS memberi developer
kendali penuh atas pemuatan font dan rendering, tanpa menambahkan
banyak hal. Tetapi jika Anda memerlukan penyesuaian tambahan, dan bersedia mengeluarkan biaya tambahan
seperti yang dijelaskan di atas dengan menjalankan JavaScript, ada opsi lain.

[Font Loading API](https://www.w3.org/TR/css-font-loading/) menyediakan antarmuka skrip untuk
menentukan dan memanipulasi bentuk font CSS, melacak kemajuan hasil download, dan mengesampingkan perilaku default
lazyload. Misalnya, jika Anda yakin bahwa varian font tertentu diperlukan, Anda dapat
menetapkannya dan memberi tahu browser untuk memulai pengambilan resource font segera:


    var font = new FontFace("Awesome Font", "url(/fonts/awesome.woff2)", {
      style: 'normal', unicodeRange: 'U+000-5FF', weight: '400'
    });

    // don't wait for the render tree, initiate an immediate fetch!
    font.load().then(function() {
      // apply the font (which may re-render text and cause a page reflow)
      // after the font has finished downloading
      document.fonts.add(font);
      document.body.style.fontFamily = "Awesome Font, serif";

      // OR... by default the content is hidden,
      // and it's rendered after the font is available
      var content = document.getElementById("content");
      content.style.visibility = "visible";

      // OR... apply your own render strategy here...
    });


Selanjutnya, karena Anda dapat memeriksa status font (melalui metode
[periksa()](https://www.w3.org/TR/css-font-loading/#font-face-set-check)) dan melacak
kemajuan downloadnya, Anda juga dapat mendefinisikan strategi khusus untuk merender teks pada halaman Anda:

- Anda dapat menahan semua rendering teks hingga font tersedia.
- Anda dapat menerapkan waktu tunggu khusus untuk setiap font.
- Anda dapat menggunakan pengganti font untuk membuka blokir render dan memasukkan gaya baru yang menggunakan font
yang diinginkan setelah font tersedia.

Yang terbaik dari semuanya, Anda juga dapat mencampur dan mencocokkan strategi di atas untuk berbagai konten pada halaman. Misalnya
, Anda dapat menunda rendering teks pada beberapa bagian sampai font tersedia, gunakan font
pengganti, dan kemudian render ulang setelah download font selesai, tentukan waktu tunggu yang berbeda, dan
seterusnya.

Note: Font Loading API masih <a href='http://caniuse.com/#feat=font-loading'>dalam
pengembangan di beberapa browser</a>. Pertimbangkan untuk menggunakan <a
href='https://github.com/bramstein/fontloader'>FontLoader polyfill</a> atau <a
href='https://github.com/typekit/webfontloader'>library webfontloader</a> untuk memberikan fungsionalitas
yang serupa, walaupun dengan overhead yang lebih banyak dari ketergantungan JavaScript tambahan.

### Caching yang tepat adalah suatu keharusan

Resource font biasanya merupakan resource statis yang tidak sering diupdate. Akibatnya, resource ini
biasanya cocok untuk yang masa kedaluwarsa umur yang panjang - pastikan Anda menetapkan baik [header
ETag bersyarat](/web/fundamentals/performance/optimizing-content-efficiency/http-caching#validating-cached-responses-with-etags),
dan [kebijakan
Cache-Control yang optimal](/web/fundamentals/performance/optimizing-content-efficiency/http-caching#cache-control) untuk
semua resource font.

Jika aplikasi web Anda menggunakan [pekerja layanan](/web/fundamentals/primers/service-workers/),
menyajikan resource font dengan strategi [strategi
cache-first](/web/fundamentals/instant-and-offline/offline-cookbook/#cache-then-network)
sesuai untuk sebagian besar kasus penggunaan.

Anda tidak boleh menyimpan font menggunakan
[`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
atau [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API);
setiap font memiliki masalah kinerja sendiri. Cache HTTP browser
memberikan mekanisme terbaik dan paling tangguh untuk mengirimkan resource font ke
browser.


## Checklist optimisasi

Berbeda dari yang banyak dipercaya, penggunaan font web tidak perlu menunda halaman atau
berdampak negatif pada metrik kinerja lainnya. Penggunaan font yang dioptimalkan dengan baik dapat menghasilkan
pengalaman pengguna keseluruhan yang lebih baik: branding yang hebat, keterbacaan yang lebih ditingkatkan, kegunaan, dan kemampuan dapat dicari,
semuanya sembari mencapai solusi multiresolusi skalabel yang beradaptasi dengan baik pada format layar dan
resolusi. Jangan takut untuk menggunakan font web.

Dengan demikian, implementasi asli dapat mengakibatkan hasil download berjumlah besar dan penundaan yang tidak perlu. Anda perlu membantu
browser dengan mengoptimalkan aset fontnya sendiri dan caranya diambil serta digunakan di halaman
Anda.

- **Audit dan monitor penggunaan font Anda:** jangan gunakan terlalu banyak font pada halaman Anda, dan untuk setiap font,
minimalkan jumlah varian yang digunakan. Ini akan membantu mencapai pengalaman yang lebih konsisten dan lebih cepat
bagi pengguna.
- **Subset resource font Anda:** banyak font dapat menjadi subset, atau dibagi menjadi beberapa rentang-unicode untuk
menghasilkan hanya glyph yang diperlukan oleh halaman tertentu. Ini mengurangi ukuran file dan meningkatkan
kecepatan download resource. Akan tetapi, ketika menetapkan subset, berhati-hatilah untuk mengoptimalkan bagi font
yang akan digunakan kembali. Misalnya, jangan mendownload kumpulan karakter yang berbeda namun tumpang tindih pada setiap halaman. Praktik
yang baik adalah untuk men-subset berdasarkan script: misalnya, Latin, Cyrillic, dan sebagainya.
- **Menyerahkan format font yang dioptimalkan ke setiap browser:** setiap font harus diberikan dalam format
WOFF2, WOFF, EOT, dan TTF. Pastikan untuk menerapkan kompresi GZIP ke format EOT dan TTF, karena tidak
dikompresi secara default.
- **Memberikan prioritas ke `local()` dalam daftar `src` Anda:** mencatat `local('Font Name')` terlebih dahulu dalam daftar
`src` Anda memastikan bahwa permintaan HTTP tidak dibuat untuk font yang sudah diinstal.
- **Menyesuaikan pemuatan dan rendering font menggunakan `<link rel="preload">`, `font-display`, atau Font
Loading API:** perilaku lazyloading default dapat menyebabkan rendering teks yang tertunda. Fitur
platform web ini memungkinkan Anda untuk mengganti perilaku ini bagi font tertentu, dan untuk menentukan rendering khusus
dan strategi waktu tunggu untuk konten yang berbeda pada halaman.
- **Menentukan validasi ulang dan kebijakan caching yang optimal:** font adalah resource statis yang
jarang diupdate. Pastikan bahwa server Anda menyajikan stempel waktu umur maksimal yang panjang, dan
token validasi ulang, untuk mengizinkan penggunaan kembali waktu yang efisien dari berbagai halaman berbeda. Jika menggunakan pekerja
layanan, strategi cache-first merupakan hal yang tepat.

* Artikel ini berisi kontribusi dari [Monica Dinculescu](https://meowni.ca/posts/web-fonts/),
[Rob Dodson](/web/updates/2016/02/font-display), dan Jeff Posnick.*

## Masukan {: #feedback }

{% include "web/_shared/helpful.html" %}
