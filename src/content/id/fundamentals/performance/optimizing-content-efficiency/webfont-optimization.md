project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Tipografi adalah hal mendasar bagi terciptanya desain, branding, keterbacaan, dan aksesibilitas yang baik. Webfont memungkinkan semua hal di atas dan juga yang lainnya: teks dapat dipilih, ditelusuri, di-zoom, dan ramah untuk DPI yang tinggi, menyediakan rendering teks yang konsisten dan tajam apa pun ukuran dan resolusinya.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2014-09-19 #}

# Optimasi Font Web {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

Tipografi adalah hal mendasar bagi terciptanya desain, branding, keterbacaan, dan aksesibilitas yang baik. Webfont memungkinkan semua hal di atas dan juga yang lainnya: teks dapat dipilih, ditelusuri, di-zoom, dan ramah untuk DPI yang tinggi, menyediakan rendering teks yang konsisten dan tajam apa pun ukuran dan resolusinya. Webfont sangat penting bagi desain yang baik, UX, dan kinerja.

Optimalisasi webfont merupakan bagian penting dari strategi kinerja keseluruhan. Setiap font merupakan sumber daya tambahan, dan sebagian font mungkin memblokir rendering teks, namun karena laman menggunakan webfont tidak berarti bahwa laman harus merender lebih lambat. Sebaliknya, font yang dioptimalkan, dipadukan dengan strategi yang cermat mengenai cara webfont dimuat dan diterapkan pada laman akan dapat membantu mengurangi ukuran laman total, dan memperbaiki waktu rendering laman.


## Anatomi webfont

### TL;DR {: .hide-from-toc }
* Font Unicode dapat berisi ribuan glyph.
* Ada empat format font: WOFF2, WOFF, EOT, dan TTF.
* Sebagian format font membutuhkan penggunaan kompresi GZIP.


*Webfont* adalah sekumpulan glyph, dan masing-masing glyph merupakan bentuk vektor yang menggambarkan huruf atau simbol. Hasilnya, dua variabel sederhana menentukan file ukuran font tertentu: kompleksitas jalur vektor dari setiap glyph dan jumlah gylph dalam font tertentu. Misalnya, Open Sans, yang merupakan salah satu webfont terpopuler, mengandung 897 glyph, yang meliputi karakter Latin, Yunani, dan Cyrilic.

<img src="images/glyphs.png"  alt="Tabel glyph font">

Saat memilih font, penting untuk mempertimbangkan himpunan karakter apa yang didukung. Jika Anda perlu melokalkan materi laman Anda ke beberapa bahasa, Anda harus menggunakan font yang bisa menampilkan tampilan dan pengalaman yang konsisten ke pengguna. Misalnya, [jenis font Noto dari Google](https://www.google.com/get/noto/){: .external } bertujuan untuk mendukung semua bahasa dunia. Akan tetapi, ukuran total dari Noto dengan semua bahasa disertakan, menghasilkan unduhan 130 MB+ ZIP.

Jelaslah, menggunakan font pada web memerlukan rekayasa yang saksama guna memastikan bahwa tipografi tidak menghalangi kinerja. Syukurlah platform web menyediakan semua kenyamanan yang diperlukan, dan di bagian selanjutnya dari panduan ini memberikan pandangan langsung tentang cara terbaik memperoleh yang terbaik dari keduanya.

### Format webfront

Dewasa ini ada empat format kontainer font yang digunakan di web: [EOT](https://en.wikipedia.org/wiki/Embedded_OpenType), [TTF](https://en.wikipedia.org/wiki/TrueType), [WOFF](https://en.wikipedia.org/wiki/Web_Open_Font_Format), dan [WOFF2](https://www.w3.org/TR/WOFF2/){: .external }. Sayangnya meskipun terdapat berbagai pilihan yang luas, tidak ada satu format universal yang berfungsi di seluruh browser lama dan baru: EOT adalah [hanya IE](http://caniuse.com/#feat=eot), TTF memiliki [dukungan IE sebagian](http://caniuse.com/#search=ttf), WOFF menikmati dukungan terluas namun [tidak tersedia di beberapa browser lawas](http://caniuse.com/#feat=woff), dan dukungan WOFF 2.0 merupakan [karya yang masih terus dikembangkan untuk banyak browser](http://caniuse.com/#feat=woff2).

Jadi, apa arti semua ini bagi kita? Tidak ada satu format tunggal yang berfungsi di semua browser, yang berarti bahwa kita perlu menyerahkan beberapa format untuk menghasilkan pengalaman yang konsisten:

* Menyajikan varian WOFF 2.0 ke browser yang mendukungnya.
* Menyajikan varian WOFF ke sebagian besar browser.
* Menyajikan varian TTF ke browser Android lawas (di bawah 4.4).
* Menyajikan varian EOT ke browser IE lawas (di bawah IE9).

Note: Secara teknis, ada format kontainer lain, <a href='http://caniuse.com/svg-fonts'>kontainer font SVG</a>, namun IE dan Firefox tidak pernah mendukungnya, dan kini tidak digunakan lagi di Chrome. Dengan demikian, penggunaannya terbatas dan itu sengaja dihilangkan dalam panduan ini.

### Mengurangi ukuran font dengan kompresi

Font merupakan koleksi glyph, masing-masing dengan seperangkat jalur yang menjelaskan format huruf. Masing-masing glyph berbeda namun bagaimana pun juga mengandung informasi serupa yang bisa dikompresikan dengan GZIP, atau kompresor yang kompatibel: 

* Format EOT dan TTF tidak dikompresi secara default. Pastikan bahwa server Anda telah dikonfigurasikan untuk menerapkan [kompresi GZIP](/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer#text-compression-with-gzip) saat mengirimkan format ini.
* WOFF memiliki kompresi bawaan. Pastikan bahwa kompresor WOFF Anda menggunakan setelan kompresi optimal. 
* WOFF2 menggunakan algoritme pra-pemrosesan dan kompresi khusus untuk mencapai ~30% pengurangan ukuran file dibandingkan format lain. Untuk informasi selengkapnya, lihat [laporan evaluasi WOFF 2.0](http://www.w3.org/TR/WOFF20ER/){: .external }.

Terakhir, perlu diperhatikan bahwa sebagian format font mengandung metadata tambahan, misalnya informasi [petunjuk font](https://en.wikipedia.org/wiki/Font_hinting) dan [kerning](https://en.wikipedia.org/wiki/Kerning) mungkin tidak diperlukan di beberapa platform, yang memungkinkan optimalisasi ukuran file lebih lanjut. Lihatlah kompresor font Anda untuk opsi optimalisasi yang tersedia, dan jika Anda mengambil rute ini, pastikan bahwa Anda memiliki infrastruktur yang sesuai untuk menguji dan mengirimkan font yang telah dioptimalkan ini ke setiap browser. Misalnya, Google Fonts mempertahankan 30+ varian yang dioptimalkan untuk setiap font dan secara otomatis mendeteksi dan mengirimkan varian optimal untuk setiap platform dan browser.

Note: Pertimbangkan menggunakan <a href='http://en.wikipedia.org/wiki/Zopfli'>kompresi Zopfli</a> untuk format EOT, TTF, dan WOFF. Zopfli adalah kompresor kompatibel zlib yang menghasilkan pengurangan ukuran file sebesar ~5% lewat gzip.

## Mendefinisikan jenis font dengan @font-face

### TL;DR {: .hide-from-toc }
* Gunakan petunjuk <code>format()</code> untuk menetapkan format font.
* Subset font Unicode besar untuk meningkatkan kinerja. Gunakan subset rentang unicode dan berikan fallback subset manual untuk browser yang lebih lawas.
* Kurangi jumlah varian font gaya untuk meningkatkan kinerja rendering laman dan teks.


@font-face CSS at-rule memungkinkan Anda untuk mendefinisikan sumber daya lokasi font tertentu, karakteristik gayanya, dan titik kode Unicode yang harus digunakannya. Paduan deklarasi @font-face seperti itu dapat digunakan untuk mengonstruksikan "jenis font" yang akan digunakan browser untuk mengevaluasi sumber daya font mana yang harus diunduh dan diterapkan ke laman saat ini.

### Pemilihan format

Setiap deklarasi @font-face menyediakan nama jenis font, yang bertindak sebagai grup logis dari beberapa deklarasi, [properti font](http://www.w3.org/TR/css3-fonts/#font-prop-desc) seperti gaya, bobot, dan regangan, serta [deskriptor src](http://www.w3.org/TR/css3-fonts/#src-desc) yang menetapkan daftar lokasi prioritas untuk sumber daya font.


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


Pertama-tama, perhatikan bahwa contoh di atas menetapkan satu jenis _Awesome Font_ dengan dua gaya (normal dan _italic_). masing-masing yang mengarahkan ke seperangkat sumber daya font. Pada gilirannya, setiap deskriptor `src` mengandung daftar prioritas, 
yang dipisah koma dari varian sumber daya: 

* Direktif `local()` memungkinkan kita untuk mereferensikan, membuat, dan menggunakan font yang dipasang secara lokal.
* Direktif `url()` memungkinkan Anda untuk memuat font eksternal, dan dimungkinkan untuk petunjuk `format()` opsional yang mengindikasikan format dari font yang direferensikan oleh URL yang disediakan.


Note: Kecuali Anda mereferensikan salah satu dari font sistem default, pada praktiknya, pengguna jarang yang memasangnya secara lokal, terutama di perangkat seluler, tempat yang tidak mungkin untuk dipasang font tambahan. Hasilnya, Anda harus selalu menyediakan daftar lokasi font eksternal.

Ketika browser menentukan bahwa font diperlukan, browser menyatakan melalui daftar sumber daya yang diberikan dalam urutan yang ditetapkan serta mencoba memuat sumber daya yang sesuai. Misalnya, mengikuti contoh di atas:

1. Browser melakukan layout laman dan menentukan varian font yang dibutuhkan untuk merender teks khusus pada laman.
1. Untuk setiap font yang dibutuhkan pada browser, periksa apakah font tersedia secara lokal.
1. Jika file tidak tersedia secara lokal, browser akan menyatakan definisi eksternal:
    * Jika petunjuk format ada pada browser, periksa apakah petunjuk itu mendukungnya sebelum memulai unduhan. Jika browser tidak dapat mendukung petunjuk, browser akan melanjutkan ke yang berikutnya.
    * Jika tidak ada petunjuk format, browser akan mengunduh sumber daya.

Kombinasi direktif lokal dan eksternal dengan petunjuk format yang sesuai memungkinkan kita untuk menetapkan semua font yang tersedia dan membiarkan browser menangani yang tersisa. Browser menentukan sumber daya mana yang dibutuhkan dan akan memilih format yang optimal.

Note: Urutan varian font perlu dispesifikasikan. Browser akan memilih format pertama yang didukungnya. Karena itu, jika Anda ingin browser yang lebih baru menggunakan WOFF2, maka Anda harus menempatkan deklarasi WOFF2 di atas WOFF, dan seterusnya.

### Men-subset rentang unicode

Selain properti font seperti gaya, bobot, dan regangan, aturan 
@font-face memungkinkan kita untuk mendefinisikan seperangkat titik kode Unicode yang didukung oleh 
setiap sumber daya. Ini memungkinkan kita untuk memisahkan font Unicode besar ke dalam subset
yang lebih kecil (Misalnya, Latin, Cyrillic, Yunani) dan hanya mengunduh glyph yang dibutuhkan untuk merender teks pada laman tertentu.

[Deskriptor rentang unicode](http://www.w3.org/TR/css3-fonts/#descdef-unicode-range) memungkinkan Anda untuk menetapkan daftar yang berbatas koma dari nilai-nilai rentang, masing-masing dapat berupa salah satu dari tiga format berbeda:

* Titik kode tunggal (misalnya, U+416)
* Rentang interval (misalnya, U+400-4ff): mengindikasikan awal dan akhir titik kode dari sebuah rentang
* Rentang karakter pengganti (misalnya, U+4??): karakter '?' mengindikasikan digit heksadesimal

Misalnya, Anda dapat memisahkan jenis _Awesome Font_ ke dalam subset 
Latin dan Jepang, masing-masing akan diunduh oleh browser sesuai kebutuhan: 


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
    

Note: Subset rentang unicode terutama penting bagi bahasa-bahasa di Asia, yang memiliki jumlah glyph lebih banyak daripada bahasa Barat dan font "penuh" biasa sering kali diukur dalam megabyte, dan bukan puluhan kilobyte.

Penggunaan subset rentang unicode, dan file terpisah untuk setiap varian bergaya dari font memungkinkan kita untuk mendefinisikan jenis font komposit yang sama-sama lebih cepat dan lebih efisien untuk diunduh. Pengunjung hanya mengunduh varian dan subset yang diperlukan, dan tidak dipaksa mengunduh subset yang mungkin tidak pernah mereka lihat atau gunakan di laman. 

Dengan demikian, ada satu masalah kecil dengan rentang unicode: [belum semua browser 
mendukungnya](http://caniuse.com/#feat=font-unicode-range). Sebagian browser 
cukup mengabaikan petunjuk rentang unicode dan akan mengunduh semua varian, sementara 
browser lain tidak dapat memroses sama sekali deklarasi @font-face. Untuk menanganinya, kita perlu kembali ke "subset manual" untuk browser lawas.

Karena browser lawas tidak cukup cerdas untuk memilih hanya subset yang diperlukan dan tidak dapat mengonstruksikan font komposit, Anda harus kembali untuk menyediakan satu sumber daya font yang berisi semua subset yang diperlukan dan menyembunyikan yang lainnya dari browser. Misalnya, jika laman hanya menggunakan karakter Latin, maka Anda bisa melepaskan glyph lain dan menyediakan subset khusus itu sebagai sumber daya yang berdiri sendiri. 

1. **Bagaimana cara Anda menentukan subset yang diperlukan?** 
    * Jika browser mendukung subset rentang unicode, maka browser secara otomatis akan memilih subset yang tepat. Laman hanya perlu menyediakan file subset dan menetapkan rentang-unicode dalam aturan @font-face.
    * Jika browser tidak mendukung subset rentang unicode, maka laman harus menyembunyikan semua subset yang tidak perlu; yaitu, developer harus menyebutkan subset yang diperlukan.
1. **Bagaimana Anda menghasilkan subset font?**
    - Gunakan sumber-terbuka [alat (bantu) pyftsubset](https://github.com/behdad/fonttools/){: .external } untuk men-subset dan mengoptimalkan font Anda.
    - Beberapa layanan font memungkinkan subset manual lewat parameter kueri khusus, yang dapat Anda gunakan untuk menetapkan secara manual subset yang dibutuhkan untuk laman Anda. Lihat dokumentasi dari penyedia font Anda.


### Pemilihan dan sintesis font

Masing-masing jenis font terdiri dari beberapa varian bergaya (reguler, tebal, miring) dan beberapa bobot untuk setiap gaya, yang masing-masing dapat berisi bentuk glyph berbeda&mdash;Misalnya, spasi, ukuran berbeda, atau bentuk berbeda bersama. 

<img src="images/font-weights.png"  alt="Bobot font">

Misalnya, diagram di atas menggambarkan jenis font yang menawarkan tiga 
bobot ketebalan berbeda: 400 (reguler), 700 (tebal), dan 900 (ekstra tebal). Semua 
varian antara (diindikasikan dalam warna kelabu) otomatis dipetakan ke 
varian terdekat oleh browser. 



> Ketika bobot ditetapkan untuk yang tidak memiliki wajah, wajah dengan bobot di sekitar bobot digunakan. Secara umum, bobot tebal memetakan ke wajah dengan bobot lebih berat dan bobot lebih ringan.
>><a href="http://www.w3.org/TR/css3-fonts/#font-matching-algorithm">font CSS3 cocok dengan algoritme</a>



Logika serupa berlaku untuk varian _italic_. Desainer font mengontrol 
varian mana yang mereka akan produksi, dan kita mengontrol varian yang akan kita gunakan pada 
laman. Karena setiap varian merupakan unduhan berbeda, merupakan ide yang baik untuk menjaga 
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
    

Contoh di atas mendeklarasikan jenis _Awesome Font_ yang terdiri dari dua sumber daya glyph (U+000-5FF) namun menawarkan "bobot" berbeda: normal (400), dan tebal (700). Akan tetapi, apa yang terjadi jika salah satu aturan CSS kami menetapkan bobot font berbeda, atau menetapkan properti 
gaya-font ke miring?

* Jika font yang benar-benar sama tidak tersedia, browser akan mengganti dengan yang paling cocok terdekat.
* Jika tidak ditemukan gaya yang cocok (Misalnya, kita tidak mendeklarasikan varian miring apa pun dalam contoh di atas) maka browser akan mensintesiskan varian font-nya sendiri. 

<img src="images/font-synthesis.png"  alt="Sintesis font">


> Penulis juga harus menyadari bahwa pendekatan yang disintesis mungkin tidak cocok untuk skrip seperti Cyrillic, yang mana format miring sangat berbeda bentuknya. Selalu lebih baik untuk menggunakan font miring daripada mengandalkan versi sintetik.
> ><a href="http://www.w3.org/TR/css3-fonts/#propdef-font-style">gaya-font CSS3</a>


Contoh di atas menggambarkan perbedaan di antara hasil font aktual vs. disintesiskan untuk Open-Sans. Semua varian yang disintesiskan dihasilkan dari font 400-bobot. Seperti yang Anda bisa lihat, ada perbedaan yang mencolok dalam hasilnya. Detail mengenai cara menghasilkan varian tebal dan miring tidak ditetapkan. Oleh karena itu, hasilnya bervariasi dari browser ke browser, dan sangat bergantung pada font.

Note: Untuk konsistensi dan hasil visual terbaik, jangan mengandalkan sintesis font. Sebaliknya, minimalkan jumlah varian font yang digunakan dan tentukan lokasinya, sedemikian rupa sehingga browser bisa mengunduhnya saat digunakan pada laman. Dengan demikian, dalam sebagian kasus varian yang disintesiskan <a href='https://www.igvita.com/2014/09/16/optimizing-webfont-selection-and-synthesis/'>mungkin merupakan opsi yang layak</a>, namun gunakan secara hati-hati.

## Mengoptimalkan pemuatan dan rendering

### TL;DR {: .hide-from-toc }
* Permintaan font ditunda sampai pohon render dikonstruksikan, yang dapat mengakibatkan tertundanya rendering teks.
* Font Loading API memungkinkan Anda untuk mengimplementasikan pemuatan font khusus dan strategi rendering yang mengganti pemuatan font lazyload default.
* Penyisipan font memungkinkan Anda untuk mengganti pemuatan font lazyload default di browser yang lebih lawas.

Webfont "penuh" yang mencakup semua varian bergaya, yang mungkin tidak Anda perlukan, plus semua glyph, yang mungkin tidak akan terpakai, dapat dengan mudah menghasilkan unduhan multi-megabyte. Untuk menangani hal ini, aturan CSS @font-face secara spesifik dirancang untuk memungkinkan Anda memisahkan jenis font ke dalam sekumpulan sumber daya: subset unicode, varian gaya berbeda, dst. 

Mengingat deklarasi ini, browser menghitung subset yang diperlukan dan varian serta mengunduh set minimum yang diperlukan untuk merender teks, yang sangat nyaman. Namun, jika kita tidak berhati-hati, hal itu dapat pula menciptakan bottleneck kinerja dalam jalur rendering penting dan menunda rendering teks. 

### Webfonts dan jalur rendering penting

Pemuatan yang lambat dari font membawa implikasi tersembunyi penting yang mungkin menunda rendering: browser harus [mengonstruksikan pohon render](/web/fundamentals/performance/critical-rendering-path/render-tree-construction), yang bergantung pada pohon DOM dan CSSOM, sebelum mengetahui sumber daya font mana yang diperlukan untuk merender teks. Akibatnya, permintaan font tertunda setelah sumber daya penting lain, dan browser dapat diblokir dari merender teks sampai sumber daya diambil.

<img src="images/font-crp.png"  alt="Jalur rendering penting font">

1. Browser meminta dokumen HTML.
1. Browser mulai mem-parsing respons HTML dan mengkonstruksi DOM.
1. Browser menemukan CSS, JS dan sumber daya lainnya serta mengirimkan permintaan.
1. Browser mengkonstruksi CSSOM setelah semua materi CSS diterima dan menggabungkannya dengan pohon DOM untuk mengkonstruksikan pohon render.
    * Permintaan font dikirimkan setelah pohon render menunjukkan varian font mana yang dibutuhkan untuk merender teks yang ditentukan pada laman.
1. Browser melakukan layout dan menggambar materi ke layar.
    * Jika font belum tersedia, browser mungkin tidak merender piksel teks apa pun.
    * Setelah font tersedia, browser akan menggambar piksel teks.

"Balapan" antara penggambaran pertama pada materi laman, yang dapat dilakukan segera
setelah pohon render dibangun, dan permintaan untuk sumber daya font adalah yang
membuat "masalah teks kosong" tempat browser mungkin merender layout laman tetapi
menghilangkan setiap teks. Perilaku sebenarnya berbeda antar berbagai browser:

* Safari menunda rendering teks sampai unduhan font selesai.
* Chrome dan Firefox menunda rendering font hingga 3 detik, setelah keduanya menggunakan font fallback. Setelah unduhan font selesai, keduanya merender ulang teks dengan font yang diunduh.
* IE segera merender dengan font fallback jika font yang diminta belum tersedia, dan merender ulang setelah unduhan font selesai.

Ada argumentasi yang mendukung dan menentang strategi rendering berbeda. Sebagian orang merasa rendering ulang tidak menyenangkan, sementara yang lain lebih suka melihat hasilnya segera dan tidak keberatan untuk mengalirkan kembali laman setelah unduhan font selesai - kita tidak akan turut dalam argumentasi ini. Poin pentingnya adalah pemuatan yang lambat 
 mengurangi jumlah byte, namun juga berpotensi menunda rendering teks. Bagian berikutnya menjelaskan bagaimana Anda bisa mengoptimalkan perilaku ini.

### Mengoptimalkan rendering font dengan Font Loading API

[Font Loading API](http://dev.w3.org/csswg/css-font-loading/) menyediakan antarmuka skrip untuk mendefinisikan dan memanipulasi wajah font CSS, melacak kemajuan unduhannya, dan mengesampingkan perilaku lazyload default. Misalnya jika Anda merasa yakin bahwa varian font tertentu akan dibutuhkan, kita dapat mendefinisikannya dan memberi tahu browser untuk memulai sumber daya font:


    var font = new FontFace("Awesome Font", "url(/fonts/awesome.woff2)", {
      style: 'normal', unicodeRange: 'U+000-5FF', weight: '400'
    });
    
    font.load(); // don't wait for the render tree, initiate an immediate fetch!
    
    font.ready().then(function() {
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
    

Selanjutnya, karena kita dapat memeriksa status font (lewat metode [check()](http://dev.w3.org/csswg/css-font-loading/#font-face-set-check)) dan melacak kemajuan unduhannya, kita juga dapat mendefinisikan strategi khusus untuk merender teks pada laman kita: 

* Anda dapat menahan semua rendering teks hingga font tersedia.
* Anda dapat mengimplementasikan waktu tunggu khusus untuk setiap font.
* Anda bisa menggunakan font fallback untuk membuka blokir rendering dan menginjeksi gaya baru yang menggunakan font yang diinginkan setelah font tersedia.

Bagusnya, Anda bisa memadu-madankan strategi di atas untuk berbagai materi di laman. Misalnya, Anda bisa menunda rendering teks pada beberapa bagian sampai font tersedia, gunakan font fallback, lalu merender ulang setelah unduhan font selesai, menetapkan berbagai waktu tunggu, dan sebagainya. 

Note: Font Loading API masih <a href='http://caniuse.com/#feat=font-loading'> dalam development di beberapa browser</a>. Pertimbangkan menggunakan <a href='https://github.com/bramstein/fontloader'>FontLoader polyfill</a>, atau <a href='https://github.com/typekit/webfontloader'>pustaka webfontloader</a>, untuk memberikan fungsionalitas yang serupa, meski dengan overhead dependensi JavaScript tambahan.

### Mengoptimalkan rendering font dengan penyisipan

Alternatif sederhana untuk menggunakan Font Loading API untuk meniadakan "masalah teks kosong" adalah untuk menyisipkan materi font ke dalam style sheet CSS:

* Browser otomatis mengunduh, dengan prioritas tinggi, style sheet CSS dengan kueri media yang sesuai karena mengonstruksi CSSOM memang membutuhkannya.
* Menyisipkan data ke dalam style sheet CSS memaksa browser untuk mengunduh font dengan prioritas tinggi dan tanpa menunggu pohon render. Yaitu, ini bertindak sebagai pengganti manual pada perilaku lazyload default.

Strategi penyisipan tidak sama fleksibelnya dan tidak memungkinkan Anda untuk mendefinisikan waktu tunggu khusus atau strategi rendering untuk materi berbeda, namun hal itu merupakan solusi sederhana dan ampuh yang bekerja di seluruh browser. Untuk hasil terbaik, pisahkan font yang disisipkan ke dalam style sheet yang berdiri sendiri serta berikan umur maksimal yang panjang. Dengan demikian, ketika CSS diperbarui, Anda tidak memaksa pengunjung Anda untuk mengunduh kembali font. 

Note: Gunakan penyisipan secara selektif. Ingatlah bahwa alasan @font-face menggunakan perilaku lazyload adalah untuk menghindari unduhan varian font dan subset yang tidak perlu. Juga, meningkatkan ukuran CSS lewat penyisipan agresif akan berdampak negatif pada <a href='/web/fundamentals/performance/critical-rendering-path/'>jalur rendering penting</a>. Browser harus mengunduh semua CSS sebelum dapat mengonstruksikan CSSOM, membangun pohon render, dan materi laman render ke layar.

### Mengoptimalkan penggunaan kembali font dengan caching HTTP

Sumber daya font biasanya merupakan sumber daya statis yang tidak mengalami pembaruan berkala. Akibatnya, sumber daya ini biasanya cocok untuk yang masa kedaluwarsa umur yang panjang - pastikan Anda menetapkan baik [header ETag bersyarat](/web/fundamentals/performance/optimizing-content-efficiency/http-caching#validating-cached-responses-with-etags), dan [kebijakan Cache-Control yang optimal](/web/fundamentals/performance/optimizing-content-efficiency/http-caching#cache-control) untuk semua sumber daya font.
    
Tidak perlu menyimpan font di localStorage atau lewat mekanisme lain; masing-masing 
yang telah menetapkan penemuan kinerjanya. Cache HTTP browser, 
bersama dengan Font Loading API atau pustaka webfontloader, menyediakan 
mekanisme terbaik dan paling tangguh untuk menyampaikan sumber daya font ke browser.


## Daftar periksa optimalisasi

Berbeda dari yang banyak dipercaya, penggunaan webfont tidak perlu menunda laman atau berdampak negatif pada metrik kinerja lainnya. Penggunaan font yang dioptimalkan dengan baik dapat menghasilkan pengalaman pengguna keseluruhan yang lebih baik: branding yang hebat, keterbacaan yang lebih ditingkatkan, kegunaan, dan kemampuan dapat dicari, semuanya sembari mencapai solusi multiresolusi skalabel yang beradaptasi dengan baik pada format layar dan resolusi. Jangan takut menggunakan webfont! 

Dengan demikian, implementasi asli dapat mengakibatkan unduhan berjumlah besar dan penundaan yang tidak perlu. Anda perlu membantu browser dengan mengoptimalkan aset fontnya sendiri dan caranya diambil serta digunakan di laman Anda. 

* **Audit dan pantau penggunaan font Anda:** jangan gunakan terlalu banyak font di laman Anda, dan untuk setiap font, minimalkan jumlah varian yang digunakan. Ini akan membantu mencapai pengalaman yang lebih konsisten dan lebih cepat bagi pengguna.
* **Subset sumber daya font Anda:** banyak font dapat menjadi subset, atau dibagi menjadi beberapa rentang-unicode untuk menghasilkan hanya glyph yang diperlukan oleh laman tertentu. Ini mengurangi ukuran file dan meningkatkan kecepatan unduhan sumber daya. Akan tetapi, ketika mendefinisikan subset, berhati-hatilah untuk mengoptimalkan bagi font yang akan digunakan kembali. Misalnya, Anda tidak ingin mengunduh set karakter berbeda namun tumpang tindih pada setiap laman. Praktik yang baik adalah men-subset berdasarkan skrip: misalnya, Latin, Cyrillic, dan seterusnya.
* **Menyerahkan format font yang dioptimalkan ke setiap browser:** setiap font harus diberikan dalam format WOFF2, WOFF, EOT, dan TTF. Pastikan untuk menerapkan kompresi GZIP ke format EOT dan TTF, karena keduanya tidak dikompresikan secara default.
* **Tetapkan validasi ulang dan kebijakan caching yang optimal:** font adalah sumber daya statis yang jarang diperbarui. Pastikan bahwa server Anda menyajikan stempel waktu umur maksimal yang panjang, dan token validasi ulang, untuk mengizinkan penggunaan kembali waktu yang efisien dari berbagai laman berbeda.
* **Penggunaan Font Loading API untuk mengoptimalkan Jalur Rendering Penting:** perilaku pemuatan lambat default dapat mengakibatkan rendering teks yang tertunda. Font Loading API memungkinkan Anda untuk mengganti perilaku ini untuk font tertentu, dan menetapkan strategi rendering khusus dan waktu tunggu yang sesuai untuk berbagai materi pada laman. Untuk browser lawas yang tidak mendukung API, Anda bisa menggunakan pustaka JavaScript Web Front Loader atau menggunakan strategi penyisipan CSS.


{# wf_devsite_translation #}
