project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml


{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2014-05-06 #}

# Optimalisasi Gambar {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

Gambar sering menjadi sumber besarnya byte yang diunduh pada laman web dan juga sering kali menempati sejumlah besar ruang visual. Hasilnya, pengoptimalan gambar bisa menghasilkan beberapa penghematan byte terbesar dan meningkatkan kinerja situs web Anda: semakin sedikit byte yang harus diunduh browser, semakin sedikit persaingan untuk bandwidth klien dan lebih cepat browser mengunduh dan merender materi yang bermanfaat pada layar.

Optimalisasi gambar adalah seni dan juga sains: seni karena tidak ada satu jawaban pasti mengenai cara terbaik mengompresi satu gambar, dan sains karena ada banyak teknik yang cukup berkembang dan algoritme yang dapat mengurangi ukuran sebuah gambar secara signifikan. Menemukan setelan yang optimal untuk gambar Anda membutuhkan analisis yang cermat di banyak dimensi: kemampuan format, materi data yang dienkodekan, kualitas, dimensi piksel, dan lainnya.

## Meniadakan dan mengganti gambar

### TL;DR {: .hide-from-toc }
- Menghilangkan sumber daya gambar yang tidak perlu
- Memanfaatkan efek CSS3 jika memungkinkan
- Menggunakan font web daripada melakukan enkode teks dalam gambar


Pertanyaan yang pertama kali harus diajukan kepada diri sendiri apakah sebuah gambar, faktanya, diperlukan untuk mencapai efek yang Anda cari. Desain yang baik itu sederhana dan akan selalu menghasilkan kinerja terbaik. Jika Anda dapat meniadakan sumber daya gambar, yang sering kali membutuhkan sejumlah besar byte yang relatif terhadap HTML, CSS, JavaScript dan aset lainnya pada laman, maka hal itu selalu menjadi strategi optimalisasi terbaik. Dengan demikian, sebuah gambar yang ditempatkan dengan baik mengomunikasikan lebih banyak informasi daripada ribuan gambar, jadi terserah Anda untuk menemukan keseimbangan tersebut.

Berikutnya, Anda harus mempertimbangkan terlebih dahulu jika ada teknologi alternatif yang bisa mencapai hasil yang diinginkan, namun dengan cara yang lebih efisien:

* **Efek CSS** (gradasi, bayangan, dsb.) dan animasi CSS dapat digunakan untuk menghasilkan aset yang tidak tergantung pada resolusi yang selalu tampak tajam di setiap resolusi dan tingkat zoom, sering kali dalam byte yang lebih kecil daripada yang diperlukan oleh sebuah file gambar.
* **Font web** mengakibatkan penggunaan tipe desain yang indah sembari mempertahankan kemampuan untuk memilih, mencari, dan mengubah ukuran teks - sebuah peningkatan yang signifikan dalam kegunaan.

Jika Anda pernah mengenkodekan teks dalam sebuah aset gambar, berhentilah dan pertimbangkan kembali. Tipografi yang hebat sangat penting bagi desain yang baik, branding, dan keterbacaan, namun teks dalam gambar menghasilkan pengalaman pengguna yang buruk: teks tidak dapat dipilih, tidak dapat di-zoom, tidak dapat diakses, dan tidak cocok untuk perangkat ber-DPI tinggi. Penggunaan font web memerlukan [seperangkat optimalisasinya sendiri](https://www.igvita.com/2014/01/31/optimizing-web-font-rendering-performance/), namun penggunaan ini menjawab semua kekhawatiran ini dan selalu menjadi pilihan yang lebih baik untuk menampilkan teks.


## Gambar vektor vs. gambar bitmap

### TL;DR {: .hide-from-toc }
- Gambar vektor ideal untuk gambar yang terdiri dari bentuk-bentuk geometrik
- Gambar vektor tidak tergantung pada zoom dan resolusi
- Gambar bitmap harus digunakan untuk layar kompleks yang memiliki banyak bentuk dan detail yang tidak beraturan


Setelah Anda menentukan bahwa sebuah gambar memang faktanya merupakan format yang optimal untuk mencapai hasil yang diinginkan, pilihan penting berikutnya adalah untuk memilih format yang sesuai:

<div class="attempt-left">
  <figure>
    <img src="images/vector-zoom.png" alt="Gambar vektor yang diperbesar">
    <figcaption>Gambar vektor yang diperbesar</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/raster-zoom.png" alt="Gambar bitmap yang diperbesar">
    <figcaption>Gambar bitmap yang diperbesar</figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

* [Grafik vektor](https://en.wikipedia.org/wiki/Vector_graphics) menggunakan garis, titik, dan bentuk jamak untuk merepresentasikan sebuah gambar.
* [Grafis bitmap](https://en.wikipedia.org/wiki/Raster_graphics) merepresentasikan sebuah gambar dengan mengenkodekan setiap nilai dari setiap piksel di dalam grid berbentuk persegi panjang.

Setiap format memiliki kelebihan dan kekurangannya sendiri. Format vektor idealnya cocok untuk gambar yang terdiri dari bentuk geometris sederhana (misalnya logo, teks, ikon, dan seterusnya), dan memberikan hasil yang tajam di setiap setelan resolusi dan zoom, sehingga membuatnya menjadi format yang ideal untuk layar resolusi tinggi dan aset yang perlu ditampilkan pada beragam ukuran.

Akan tetapi, format vektor tidak cukup bila adegannya rumit (misalnya foto): jumlah markup SVG untuk menjelaskan semua bentuk menjadi terlalu tinggi dan keluarannya mungkin masih belum terlihat "fotorealistik". Bila itu yang terjadi, di situlah waktunya Anda harus menggunakan format gambar bitmap seperti GIF, PNG, JPEG atau salah satu format gambar yang lebih baru seperti JPEG-XR dan WebP.

Gambar bitmap tidak memiliki properti indah yang tidak tergantung pada resolusi atau zoom - ketika Anda menaikkan skala sebuah gambar bitmap, Anda akan melihat gambar yang kasar dan buram. Hasilnya, Anda mungkin harus menyimpan lebih dari satu versi gambar bitmap dengan resolusi yang bervariasi untuk menyajikan pengalaman yang optimal bagi pengguna.


## Implikasi layar resolusi tinggi

### TL;DR {: .hide-from-toc }
- Layar resolusi tinggi memiliki beberapa piksel perangkat per piksel CSS
- Gambar resolusi tinggi membutuhkan jumlah piksel dan byte yang jauh lebih tinggi
- Teknik optimalisasi gambarnya sama berapa pun resolusinya


Saat kita berbicara tentang piksel gambar, kita harus membedakan antara berbagai jenis piksel: Piksel CSS dan piksel perangkat. Satu piksel CSS tunggal dapat berisi banyak piksel perangkat - misalnya satu piksel CSS mungkin berkaitan secara langsung dengan satu piksel perangkat, atau mungkin didukung oleh banyak piksel perangkat. Apa maksudnya? Jadi semakin banyak pikselnya, semakin halus detail materi yang ditampilkan pada layar.

<img src="images/css-vs-device-pixels.png"  alt="Piksel CSS vs piksel perangkat">

Layar DPI Tinggi (HiDPI) memproduksi hasil yang indah, namun ada satu kompromi yang jelas dibutuhkan: aset gambar kita membutuhkan lebih banyak detail untuk memanfaatkan hitungan piksel perangkat yang lebih tinggi. Kabar gembiranya, gambar vektor idealnya cocok untuk tugas ini, karena bisa di-render berapa pun resolusinya dengan hasil tajam - kita mungkin harus mengeluarkan biaya pemrosesan lebih tinggi untuk merender detail yang lebih halus, namun aset yang mendasari masih tetap sama dan bebas dari resolusi.

Di lain pihak, gambar bitmap memunculkan tantangan yang jauh lebih besar karena gambar ini mengenkode data gambar atas dasar per piksel. Oleh karena itu, semakin besar jumlah piksel, semakin besar ukuran file dari gambar bitmap. Misalnya, anggap perbedaan antara aset foto yang ditampilkan pada aset foto yang ditampilkan pada piksel 100x100 (CSS):

<table>
<thead>
  <tr>
    <th>Resolusi layar</th>
    <th>Total piksel</th>
    <th>Ukuran file tidak terkompresi (4 byte per piksel)</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="resolution">1x</td>
  <td data-th="total pixels">100 x 100 = 10.000</td>
  <td data-th="filesize">40.000 byte</td>
</tr>
<tr>
  <td data-th="resolution">2x</td>
  <td data-th="total pixels">100 x 100 x 4 = 40.000</td>
  <td data-th="filesize">160.000 byte</td>
</tr>
<tr>
  <td data-th="resolution">3x</td>
  <td data-th="total pixels">100 x 100 x 9 = 90.000</td>
  <td data-th="filesize">360.000 byte</td>
</tr>
</tbody>
</table>

Bila kita menggandakan resolusi layar fisik, jumlah total piksel akan bertambah empat kali lipat: dua kali jumlah piksel horizontal, lalu kalikan dengan dua kali jumlah piksel vertikal. Karena itu, "2x" layar tidak hanya berlipat dua kali, namun berlipat empat dari piksel yang diperlukan!

Jadi pada praktiknya seperti apa? Layar resolusi tinggi memungkinkan kita menghasilkan gambar yang indah, yang bisa jadi merupakan fitur produk yang hebat. Akan tetapi, layar resolusi tinggi juga membutuhkan gambar resolusi tinggi: pilihlah sedapat mungkin gambar vektor karena gambar ini bebas dari resolusi dan selalu menghasilkan gambar yang tajam, dan jika gambar bitmap diperlukan, berikan dan optimalkan beberapa variasi setiap gambar dengan bantuan [`srcset` dan `picture`](/web/fundamentals/design-and-ux/media/images#images-in-markup).

## Mengoptimalkan gambar vektor

### TL;DR {: .hide-from-toc }
- SVG adalah format gambar berbasis XML
- File SVG harus dikecilkan untuk mengurangi ukurannya
- File SVG harus dikompresikan dengan GZIP


Semua browser modern mendukung Scalable Vector Graphics (SVG), yang merupakan format gambar berbasis XML untuk grafis dua dimensi: kita bisa menyematkan markup SVG secara langsung pada laman, atau sebagai sumber daya eksternal. Pada gilirannya, sebuah file SVG dapat dibuat oleh sebagian besar perangkat lunak menggambar berbasis vektor, atau dengan tangan dan secara langsung dalam editor teks favorit Anda.


    <?xml version="1.0" encoding="utf-8"?>
    <!-- Generator: Adobe Illustrator 17.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
    <svg version="1.2" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
       x="0px" y="0px" viewBox="0 0 612 792" xml:space="preserve">
    <g id="XMLID_1_">
      <g>
        <circle fill="red" stroke="black" stroke-width="2" stroke-miterlimit="10" cx="50" cy="50" r="40"/>
      </g>
    </g>
    </svg>
    

Contoh di atas merender satu bentuk lingkaran sederhana dengan garis luar hitam dan latar belakang merah dan diekspor dari Adobe Illustrator. Seperti yang bisa Anda lihat, gambar ini mengandung banyak metadata seperti informasi layer, komentar, dan namespace XML yang sering kali tidak diperlukan untuk merender aset dalam browser. Hasilnya, ada baiknya mengecilkan file SVG dengan menjalankan alat seperti [svgo](https://github.com/svg/svgo).

Yang terjadi di sini, svgo mengurangi ukuran file SVG di atas yang dihasilkan oleh Illustrator sebesar 58%, menguranginya dari 470 menjadi 199 byte. Selanjutnya, karena SVG merupakan format berbasis XML, kita juga dapat menerapkan kompresi GZIP untuk mengurangi ukuran transfernya - pastikan server Anda telah dikonfigurasikan untuk mengompresi aset SVG!


## Mengoptimalkan gambar bitmap

### TL;DR {: .hide-from-toc }
- Gambar bitmap adalah grid yang terdiri dari piksel
- Setiap piksel mengenkode informasi warna dan transparansi
- Kompresor gambar menggunakan berbagai variasi teknik untuk mengurangi jumlah bits per piksel yang diperlukan untuk mengurangi ukuran gambar


Gambar bitmap cuma grid 2 dimensi dari "piksel" individual - misalnya, gambar 100x100 piksel adalah rangkaian 10.000 piksel. Pada gilirannya, setiap piksel menyimpan nilai "[RGBA](https://en.wikipedia.org/wiki/RGBA_color_space)": saluran merah (R), saluran hijau (G), saluran biru (B), dan saluran (A) alfa (transparansi).

Secara internal, browser mengalokasikan 256 nilai (corak) untuk setiap saluran, yang diterjemahkan menjadi 8 bit per saluran (2 ^ 8 = 256), dan 4 byte per piksel (4 saluran x 8 bit = 32 bit = 4 byte). Hasilnya, jika kita tahu dimensi dari grid kita bisa menghitung ukuran file dengan mudah:

* Gambar 100 x 100px terdiri dari 10.000 piksel
* 10.000 piksel x 4 byte = 40.000 byte
* 40.000 byte / 1024 = 39 KB

Note: Sebagai cadangan, format gambar apa pun yang digunakan untuk mentransfer data dari server ke klien, bila gambar dienkode oleh browser, setiap piksel selalu menempati memori sebesar 4 byte. Ini bisa menjadi batasan penting untuk gambar besar dan perangkat yang tidak memiliki banyak ketersediaan memori - misalnya, perangkat seluler kelas bawah.

<table>
<thead>
  <tr>
    <th>Dimensi</th>
    <th>Piksel</th>
    <th>Ukuran file</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="dimensions">100 x 100</td>
  <td data-th="pixels">10.000</td>
  <td data-th="file size">39 KB</td>
</tr>
<tr>
  <td data-th="dimensions">200 x 200</td>
  <td data-th="pixels">40.000</td>
  <td data-th="file size">156 KB</td>
</tr>
<tr>
  <td data-th="dimensions">300 x 300</td>
  <td data-th="pixels">90.000</td>
  <td data-th="file size">351 KB</td>
</tr>
<tr>
  <td data-th="dimensions">500 x 500</td>
  <td data-th="pixels">250.000</td>
  <td data-th="file size">977 KB</td>
</tr>
<tr>
  <td data-th="dimensions">800 x 800</td>
  <td data-th="pixels">640.000</td>
  <td data-th="file size">2.500 KB</td>
</tr>
</tbody>
</table>

39 KB untuk sebuah gambar berukuran 100x100 piksel mungkin tampak tidak terlalu besar, namun ukuran file dengan cepat bertambah besar untuk gambar yang lebih besar dan membuat aset gambar menjadi lambat dan mahal untuk diunduh. Untungnya yang telah kami jelaskan sejauh ini adalah format gambar yang "tidak dikompresi". Apa yang dapat kita lakukan untuk mengurangi ukuran file gambar?

Satu strategi sederhana adalah mengurangi "kedalaman bit" dari gambar dari 8 bit per saluran menjadi palet warna yang lebih kecil: 8 bit per saluran memberi kita 256 nilai per saluran dan total 16.777.216 (2563) warna. Bagaimana jika kita mengurangi palet menjadi 256 warna? Maka kita hanya akan membutuhkan 8 bit secara total untuk saluran RGB dan segera menyimpan dua byte per piksel -- yaitu 50% penghematan kompresi atas 4 byte asli per format piksel!

<img src="images/artifacts.png"  alt="Artefak kompresi">

Note: Kiri ke kanan (PNG): 32-bit (16 juta warna), 7-bit (128 warna), 5-bit (32 warna). Gambar kompleks dengan transisi gradasi warna (gradasi, langit, dll.) membutuhkan palet warna lebih besar untuk menghindari artefak visual seperti langit yang pecah dalam aset 5 bit. Di sisi lain, jika gambar hanya menggunakan sedikit warna, maka palet besar hanya akan membuang-buang bit yang berharga!

Berikutnya, setelah mengoptimalkan data yang tersimpan dalam setiap piksel, kita bisa menjadi lebih cerdas dan juga melihat piksel terdekat: ternyata, banyak gambar, dan terutama foto, yang memiliki banyak piksel terdekat dengan warna serupa - misalnya langit, tekstur berulang, dan seterusnya. Dengan memanfaatkan informasi ini, kompresor dapat menerapkan "[enkode delta](https://en.wikipedia.org/wiki/Delta_encoding)" yang daripada menyimpan masing-masing nilai untuk setiap piksel, kita bisa menyimpan selisih antara piksel di sekitarnya: jika piksel yang terdekat sama, maka deltanya adalah "nol" dan kita hanya perlu menyimpan satu bit! Namun kita tidak perlu berhenti di situ...

Mata manusia memiliki tingkat sensitivitas yang berbeda terhadap warna yang berbeda: kita dapat mengoptimalkan enkode warna kita untuk diperhitungkan dengan mengurangi atau menambah palet bagi warna tersebut.
Piksel "Di Sekitar" membentuk dua grid dimensi, yang artinya bahwa setiap piksel memiliki beberapa tetangga: kita bisa menggunakan fakta ini untuk lebih menyempurnakan enkode delta.
Daripada hanya melihat tetangga terdekat di setiap piksel, kita dapat melihat blok piksel terdekat yang lebih besar dan mengenkode blok berbeda dengan setelan berbeda. Dan seterusnya...

Seperti yang bisa Anda lihat, optimalisasi gambar menjadi semakin rumit (atau menyenangkan, tergantung cara Anda melihatnya), dan terus menjadi bidang penelitian di kalangan akademisi dan komersial. Gambar menempati banyak byte dan mengembangkan teknik kompresi gambar yang lebih baik akan sangat bermanfaat! Jika Anda penasaran untuk mempelajari lebih lanjut, buka [laman Wikipedia](https://en.wikipedia.org/wiki/Image_compression), atau lihat [dokumen resmi teknik kompresi WebP](/speed/webp/docs/compression) untuk melihat contohnya secara langsung.

Jadi sekali lagi, ini semuanya sangat menyenangkan, namun juga sangat akademik: bagaimana hal itu bisa membantu kita mengoptimalkan gambar dalam laman kita? Kita tidak berada dalam posisi untuk menemukan teknik kompresi yang baru, namun kita harus memahami bentuk masalahnya: Piksel RGBA, kedalaman bit, dan berbagai teknik optimalisasi. Semua konsep ini penting untuk dipahami dan diingat sebelum kita terjun ke dalam diskusi mengenai berbagai variasi format gambar bitmap.


## Kompresi gambar lossless vs lossy

### TL;DR {: .hide-from-toc }
- Karena cara kerja mata kita, gambar paling cocok untuk melakukan kompresi lossy
- Optimalisasi gambar merupakan fungsi dari kompresi melalui kompresi lossy dan lossless
- Perbedaan dalam format gambar karena perbedaan dalam cara dan algoritme lossy dan lossless yang digunakan untuk mengoptimalkan gambar.
- Tidak ada format atau "setelan kualitas" terbaik untuk semua gambar: setiap kombinasi kompresor dan materi gambar tertentu akan menghasilkan keluaran unik.


Untuk data jenis tertentu, seperti kode sumber untuk sebuah laman, atau file yang dapat dieksekusi, kompresor harus tidak boleh mengubah atau menghilangkan setiap informasi asli: satu bit data yang hilang atau salah saja dapat mengubah seluruh arti materi file, atau lebih buruk lagi, merusaknya secara keseluruhan. Untuk beberapa jenis data, seperti gambar, audio, dan video, menghasilkan "perkiraan" representasi data asli mungkin dapat diterima secara wajar.

Sebenarnya, karena cara kerja mata, kita sering kali bisa menghindari pembuangan banyak informasi tentang setiap piksel untuk mengurangi ukuran file gambar - misalnya, mata kita memiliki sensitivitas berbeda terhadap warna berbeda, artinya kita bisa menggunakan lebih sedikit bit untuk mengenkode sebagian warna. Hasilnya, sebuah pipeline proses optimalisasi gambar tipikal akan terdiri dari dua langkah tingkat tinggi:

1. Gambar diproses dengan filter "[lossy](https://en.wikipedia.org/wiki/Lossy_compression)" yang meniadakan beberapa data piksel
1. Gambar diproses dengan filter "[lossless](https://en.wikipedia.org/wiki/Lossless_compression)" yang mengompresi data piksel

**Langkah pertama adalah opsional, dan algoritme sebenarnya akan bergantung pada format gambar tertentu, namun masih perlu dipahami bahwa setiap gambar bisa melalui langkah kompresi lossy untuk mengurangi ukurannya.** Faktanya, perbedaan antara berbagai format gambar, seperti GIF, PNG, JPEG, dan lainnya adalah kombinasi algoritme spesifik yang digunakan (atau dihilangkan) ketika menerapkan langkah lossy dan lossless.

Jadi apa konfigurasi optimalisasi lossy dan lossless yang "optimal"? Jawabannya bergantung pada materi gambar dan kriteria Anda sendiri seperti kompensasi antara ukuran gambar dan artefak yang diperkenalkan oleh kompresi lossy: dalam beberapa hal Anda mungkin ingin melewatkan optimalisasi lossy untuk mengomunikasikan detail yang rumit dengan sepenuhnya mengikuti keasliannya, dan dalam hal lainnya Anda dapat menerapkan optimalisasi lossy agresif untuk mengurangi ukuran file dari aset gambar.  Di sinilah pertimbangan Anda dan konteks perlu digunakan - tidak ada setelan yang berlaku umum.

<img src="images/save-for-web.png" class="attempt-right" alt="Simpan untuk web">

Sebagai contoh langsung, saat menggunakan format lossy seperti JPEG, kompresor biasanya akan mengekspos setelan "kualitas" yang dapat disesuaikan (misalnya, slider kualitas yang disediakan oleh fungsionalitas "Save for Web" di Adobe Photoshop), yang biasanya berupa angka antara 1 dan 100 yang mengontrol cara kerja bagian dalam dari kumpulan algoritme lossy dan lossless tertentu. Untuk hasil yang terbaik, lakukan eksperimen pada beberapa setelan kualitas untuk gambar Anda, dan jangan takut untuk menurunkan kualitas - hasil visualnya sering kali sangat bagus dan penghematan ukuran filenya bisa cukup besar.

Note: Perhatikan, tingkat kualitas untuk berbagai format gambar tidak dapat dibandingkan secara langsung karena perbedaan algoritme yang digunakan untuk mengenkode gambar: kualitas 90 JPEG akan memberikan hasil yang jauh berbeda dari kualitas 90 WebP. Sebenarnya, bahkan tingkat kualitas untuk format gambar sama mungkin menghasilkan keluaran berbeda yang kentara berdasarkan implementasi kompresor!


## Memilih format gambar yang tepat

### TL;DR {: .hide-from-toc }
- Mulai dengan memilih format universal yang tepat: GIF, PNG, JPEG
- Lakukan eksperimen dan pilih setelan terbaik untuk setiap format: kualitas, ukuran palet, dll.
- Pertimbangkan untuk menambahkan WebP dan aset JPEG XR untuk klien modern.


Selain algoritme kompresi lossy dan lossless yang berbeda, format gambar berbeda mendukung fitur seperti animasi dan saluran transparansi (alfa). Hasilnya, pilihan "format yang tepat" untuk gambar tertentu merupakan paduan dari hasil visual yang diinginkan dengan persyaratan fungsional.


<table>
<thead>
  <tr>
    <th>Format</th>
    <th>Transparansi</th>
    <th>Animasi</th>
    <th>Browser</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="format"><a href="http://en.wikipedia.org/wiki/Graphics_Interchange_Format">GIF</a></td>
  <td data-th="transparency">Ya</td>
  <td data-th="animation">Ya</td>
  <td data-th="browser">Semua</td>
</tr>
<tr>
  <td data-th="format"><a href="http://en.wikipedia.org/wiki/Portable_Network_Graphics">PNG</a></td>
  <td data-th="transparency">Ya</td>
  <td data-th="animation">Tidak</td>
  <td data-th="browser">Semua</td>
</tr>
<tr>
  <td data-th="format"><a href="http://en.wikipedia.org/wiki/JPEG">JPEG</a></td>
  <td data-th="transparency">Tidak</td>
  <td data-th="animation">Tidak</td>
  <td data-th="browser">Semua</td>
</tr>
<tr>
  <td data-th="format"><a href="http://en.wikipedia.org/wiki/JPEG_XR">JPEG XR</a></td>
  <td data-th="transparency">Ya</td>
  <td data-th="animation">Ya</td>
  <td data-th="browser">IE</td>
</tr>
<tr>
  <td data-th="format"><a href="http://en.wikipedia.org/wiki/WebP">WebP</a></td>
  <td data-th="transparency">Ya</td>
  <td data-th="animation">Ya</td>
  <td data-th="browser">Chrome, Opera, Android</td>
</tr>
</tbody>
</table>

Ada tiga format gambar yang didukung secara universal: GIF, PNG, dan JPEG. Selain dari format ini, sebagian browser juga mendukung format yang lebih baru seperti WebP dan JPEG XR, yang menawarkan kompresi keseluruhan lebih baik dan fitur lebih banyak. Jadi, format manakah yang harus Anda gunakan?

<img src="images/format-tree.png"  alt="Simpan untuk web">

1. **Apakah Anda butuh animasi? Jika demikian, GIF adalah satu-satunya pilihan universal.**
    * GIF membatasi palet warna maksimal hingga 256 warna, sehingga merupakan pilihan yang buruk bagi sebagian besar gambar. Selanjutnya, PNG-8 menghasilkan kompresi lebih baik untuk gambar dengan palet kecil. Hasilnya, GIF merupakan jawaban yang tepat hanya ketika animasi diperlukan.
1. **Apakah Anda perlu mempertahankan detail yang halus dengan resolusi tertinggi? Gunakan PNG.**
    * PNG tidak berlaku untuk setiap algoritme kompresi lossy di luar pilihan ukuran palet warna. Hasilnya, gambar yang berkualitas tertinggi, namun dampaknya adalah ukuran file yang lebih tinggi daripada format lainnya. Gunakanlah dengan bijak.
    * Jika aset gambar berisi citra yang terdiri dari bentuk-bentuk geometrik, pertimbangkan untuk mengonversikannya menjadi format vektor (SVG)!
    * Jika aset gambar mengandung teks, hentikan, dan pertimbangkan kembali. Teks dalam gambar tidak dapat dipilih, dicari, atau "dapat di-zoom". Jika Anda harus menghasilkan tampilan khusus (untuk branding atau alasan lain), gunakan font web saja.
1. **Apakah Anda mengoptimalkan foto, tangkapan layar, atau aset gambar serupa? Gunakan JPEG.**
    * JPEG menggunakan paduan optimalisasi lossy dan lossless untuk mengurangi ukuran file dari aset gambar. Cobalah beberapa tingkat kualitas JPEG untuk menemukan kompensasi kualitas terbaik vs. ukuran file untuk aset Anda.

Terakhir, setelah Anda menentukan format gambar yang optimal dan setelannya untuk setiap aset Anda, pertimbangkan untuk menambahkan varian tambahan yang dienkodekan dalam WebP dan JPEG XR. Kedua format ini baru, dan sayangnya tidak (belum) didukung secara universal oleh semua browser, namun keduanya bisa memberikan penghematan signifikan untuk klien yang lebih baru - misalnya, rata-rata WebP menghasilkan [penurunan ukuran file sebesar 30%](/speed/webp/docs/webp_study) dibandingkan gambar JPEG yang setara.

Karena baik WebP maupun JPEG XR tidak didukung secara universal, Anda harus menambahkan logika tambahan ke aplikasi atau server Anda untuk melayani sumber daya yang sesuai:

* Sebagian CDN menyediakan optimalisasi gambar sebagai layanan, termasuk penyerahan JPEG XR dan WebP.
* Sebagian alat sumber terbuka (misalnya, PageSpeed untuk Apache atau Nginx) mengotomatiskan optimalisasi, konversi, dan penyajian aset yang sesuai.
* Anda bisa menambah logika aplikasi tambahan untuk mendeteksi klien, memeriksa format mana yang didukung, dan menyajikan format gambar terbaik dari yang ada.

Terakhir, perhatikan bahwa jika Anda menggunakan Webview untuk merender materi dalam aplikasi asli, maka Anda memiliki kendali penuh atas klien dan dapat menggunakan WebP secara eksklusif! Facebook, Google, dan banyak lagi yang lainnya memakai WebP untuk menayangkan semua gambar mereka di dalam aplikasi - penghematannya benar-benar bermanfaat. Untuk mengetahui selengkapnya tentang WebP, lihat presentasi [WebP: Deploying Faster, Smaller, and More Beautiful Images](https://www.youtube.com/watch?v=pS8udLMOOaE) dari Google I/O 2013.


## Alat dan penyempurnaan parameter

Tidak ada satu pun format gambar yang sempurna, alat, atau seperangkat parameter optimalisasi yang bisa diterapkan ke semua gambar. Untuk mendapatkan hasil terbaik, Anda harus memilih format dan setelan bergantung pada materi dari gambar, dan visualnya serta persyaratan teknis lainnya.

<table>
<thead>
  <tr>
    <th>Alat</th>
    <th>Keterangan</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="tool"><a href="http://www.lcdf.org/gifsicle/">gifsicle</a></td>
  <td data-th="description">membuat dan mengoptimalkan gambar GIF</td>
</tr>
<tr>
  <td data-th="tool"><a href="http://jpegclub.org/jpegtran/">jpegtran</a></td>
  <td data-th="description">mengoptimalkan gambar JPEG</td>
</tr>
<tr>
  <td data-th="tool"><a href="http://optipng.sourceforge.net/">optipng</a></td>
  <td data-th="description">optimalisasi PNG lossless</td>
</tr>
<tr>
  <td data-th="tool"><a href="http://pngquant.org/">pngquant</a></td>
  <td data-th="description">optimalisasi PNG lossy</td>
</tr>
</tbody>
</table>


Jangan takut untuk bereksperimen dengan parameter dari setiap kompresor. Turunkan kualitas, lihat tampilannya, lalu, rapikan, dan ulangi. Setelah menemukan satu set setelan yang baik, Anda dapat menerapkannya ke gambar serupa pada situs, namun jangan anggap semua gambar harus dikompresikan dengan setelan yang sama.


## Menghasilkan aset gambar yang diubah skalanya

### TL;DR {: .hide-from-toc }
- Mencapai aset berskala adalah salah satu optimalisasi paling sederhana dan efektif
- Perhatikan dengan cermat aset besar karena hasilnya adalah overhead yang tinggi
- Kurangi jumlah piksel yang tidak perlu dengan menyesuaikan skala gambar dengan ukuran gambarnya


Optimalisasi gambar pada akhirnya terdari dua kriteria: mengoptimalkan jumlah byte yang digunakan untuk mengenkode setiap piksel gambar, dan mengoptimalkan jumlah total piksel: ukuran file gambar hanyalah jumlah total piksel dikalikan jumlah byte yang digunakan untuk mengenkode setiap piksel. Tidak kurang, tidak lebih.

<img src="images/resized-image.png" class="attempt-right" alt="Gambar yang diubah ukurannya">

Hasilnya, salah satu teknik optimalisasi gambar paling sederhana dan efektif adalah memastikan bahwa kita tidak memberikan piksel tambahan lagi selain dari yang diperlukan untuk menampilkan aset pada ukuran yang diinginkan dalam browser. Terdengar sederhana bukan? Sayangnya, kebanyakan laman gagal dalam ujian ini untuk mayoritas aset gambarnya: biasanya, laman menerjunkan aset yang lebih besar dan mengandalkan browser untuk mengubah skalanya - yang juga akan menghabiskan lebih banyak sumber daya CPU - dan menampilkannya pada resolusi lebih rendah.

Note: Mengarahkan kursor ke atas elemen gambar dalam Chrome DevTools akan memunculkan ukuran "alami" dan "tampilan" dari aset gambar. Dalam contoh di atas, gambar 300x260 piksel diunduh namun kemudian skalanya diturunkan (245x212) di klien saat ditampilkan.

Overhead penyampaian piksel yang tak perlu - hanya untuk browser mengubah skala gambar untuk Anda, berarti hilangnya kesempatan besar untuk mengurangi dan mengoptimalkan jumlah byte yang diperlukan untuk merender laman. Selanjutnya, perhatikan bahwa mengubah ukuran tidak hanya memfungsikan pengurangan jumlah piksel gambar, namun juga tentang ukuran alaminya.

<table>
<thead>
  <tr>
    <th>Resolusi layar</th>
    <th>Ukuran alami</th>
    <th>Ukuran tampilan (CSS px)</th>
    <th>Piksel yang tidak perlu</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="resolution">1x</td>
  <td data-th="natural">110 x 110</td>
  <td data-th="display">100 x 100</td>
  <td data-th="overhead">110 x 110 - 100 x 100 = 2.100</td>
</tr>
<tr>
  <td data-th="resolution">1x</td>
  <td data-th="natural">410 x 410</td>
  <td data-th="display">400 x 400</td>
  <td data-th="overhead">410 x 410 - 400 x 400 = 8.100</td>
</tr>
<tr>
  <td data-th="resolution">1x</td>
  <td data-th="natural">810 x 810</td>
  <td data-th="display">800 x 800</td>
  <td data-th="overhead">810 x 810 - 800 x 800 = 16.100</td>
</tr>
<tr>
  <td data-th="resolution">2x</td>
  <td data-th="natural">220 x 220</td>
  <td data-th="display">100 x 100</td>
  <td data-th="overhead">210 x 210 - (2 x 100) x (2 x 100) = 8.400</td>
</tr>
<tr>
  <td data-th="resolution">2x</td>
  <td data-th="natural">820 x 820</td>
  <td data-th="display">400 x 400</td>
  <td data-th="overhead">820 x 820 - (2 x 400) x (2 x 400) = 32.400</td>
</tr>
<tr>
  <td data-th="resolution">2x</td>
  <td data-th="natural">1.620 x 1.620</td>
  <td data-th="display">800 x 800</td>
  <td data-th="overhead">1.620 x 1.620 - (2 x 800) x (2 x 800) = 64.400</td>
</tr>
</tbody>
</table>

Perhatikan bahwa dalam semua contoh di atas, ukuran tampilan "hanya 10 CSS piksel lebih kecil" daripada aset yang diperlukan untuk setiap resolusi layar. Akan tetapi jumlah piksel tambahan, dan overhead-nya yang terkait, semakin cepat meningkat seiring meningkatnya dimensi tampilan gambar! Hasilnya, meski Anda mungkin tidak dapat menjamin bahwa setiap aset tunggal disajikan pada ukuran tampilannya secara persis, **Anda harus memastikan bahwa jumlah piksel yang tidak diperlukan jumlahnya minimal, dan bahwa aset besar Anda secara khusus disampaikan sedekat mungkin ke ukuran tampilannya.**

## Daftar periksa optimalisasi gambar

Optimalisasi gambar adalah seni dan juga sains: seni karena tidak ada satu jawaban pasti mengenai cara terbaik mengompresi satu gambar, dan sains karena ada banyak teknik yang cukup berkembang dan algoritme yang dapat membantu mengurangi ukuran sebuah gambar secara signifikan.

Beberapa tip dan teknik untuk diingat saat Anda mengoptimalkan gambar:

* **Pilih format vektor:** gambar vektor tidak tergantung pada resolusi dan skala, sehingga gambar vektor sangat cocok untuk lingkungan dengan berbagai jenis perangkat dan resolusi tinggi.
* **Kecilkan dan kompresikan aset SVG:** Markup XML yang dihasilkan oleh kebanyakan aplikasi gambar sering kali mengandung metadata yang tidak perlu yang bisa dibuang; pastikan bahwa server telah dikonfigurasikan untuk menerapkan kompresi GZIP untuk aset SVG.
* **Pilih format gambar bitmap terbaik:** tentukan persyaratan fungsional Anda dan pilih yang paling cocok untuk aset tertentu.
* **Lakukan eksperimen dengan setelan kualitas yang optimal untuk format bitmap:** jangan takut untuk menurunkan setelan "kualitas", hasilnya sering kali sangat bagus dan penghematan byte-nya signifikan.
* **Buang metadata gambar yang tidak perlu:** banyak gambar bitmap mengandung metadata yang tidak perlu mengenai aset: informasi geografi, informasi kamera, dst. Gunakan alat yang sesuai untuk mengurai data ini.
* **Sajikan gambar berskala:** ubah ukuran gambar pada server dan pastikan bahwa ukuran "tampilan" sedekat mungkin dengan ukuran gambar "alami". Perhatikan dengan cermat khususnya gambar berukuran besar, karena merupakan faktor overhead terbesar saat diubah ukurannya.
* **Otomatiskan, otomatiskan, otomatiskan:** investasikan pada alat otomatis dan prasarana yang akan memastikan bahwa semua aset gambar Anda dioptimalkan.


{# wf_devsite_translation #}
