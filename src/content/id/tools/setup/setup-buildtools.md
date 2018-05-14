project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Bangun situs multi-perangkat Anda dari nol. Pelajari cara mempercepat development dan membuat situs yang dimuat cepat bersama serangkaian alat proses pembangunan.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2014-09-24 #}

# Siapkan Alat Pembangunan Anda {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/mattgaunt.html" %}
Bangun situs multi-perangkat Anda dari nol. Pelajari cara mempercepat development dan membuat situs yang dimuat cepat bersama serangkaian alat proses pembangunan. Setiap situs harus memiliki versi development dan versi produksi.<br /><br />Versi development memiliki semua file HTML, CSS, JS dan file gambar yang membentuk situs Anda dalam format rapi yang akan membuat Anda senang menggunakannya.<br /><br />Versi produksi akan mengambil file-file ini, mengecilkannya, menyatukan / menggabungkannya dan mengoptimalkan berbagai file seperti gambar.

Developer web harus memikirkan jutaan hal sekaligus dan langkah pembangunan
adalah salah satu yang paling penting, namun yang paling rumit dimulai.  Anda
harus merencanakan semua tugas yang perlu diotomatisasi seperti: Kompresi
gambar, minifikasi CSS, penggabungan JavaScript, pengujian responsif,
pengujian unit, dan daftarnya terus berlanjut...

Ikuti panduan ini untuk mempelajari cara terbaik menyusun alur kerja sehingga
situs yang sudah Anda buat mengikuti semua praktik terbaik sejak
awal Anda memulainya.


### TL;DR {: .hide-from-toc }
- Alat proses pembangunan Anda harus mengoptimalkan kinerja; alat tersebut harus secara otomatis mengecilkan dan menggabungkan JavaScript, CSS, HTML, dan gambar.
- Gunakan alat seperti LiveReload agar proses development Anda lebih lancar.


Sebelum memulai pengkodean, Anda perlu mempertimbangkan cara mengoptimalkan dan membangun
versi produksi situs Anda. Dengan menyiapkan alur kerja ini dari awal
akan mencegah kejutan tidak menyenangkan di akhir proyek dan Anda bisa menambahkan alat
ke dalam alur kerja yang mempercepat development, yang melakukan tugas-tugas monoton
untuk Anda.

## Apa yang dimaksud dengan proses pembangunan?

Proses pembangunan adalah serangkaian tugas yang dijalankan pada file proyek Anda, yang mengompilasi
dan menguji kode selama development dan digunakan untuk membuat versi deployment
situs Anda.  Proses pembangunan sebaiknya bukan serangkaian tugas yang Anda jalankan di akhir
alur kerja development.

Alat yang paling populer untuk mengimplementasikan proses pembangunan adalah
[Gulp](http://gulpjs.com/){: .external } dan [Grunt](http://gruntjs.com/), keduanya adalah
alat baris perintah. Jika Anda belum memiliki pengalaman menggunakannya, gunakan Gulp, kami menggunakannya untuk
[Web Starter Kit](/web/tools/starter-kit/) dan menyarankan agar
Anda melakukan hal yang sama.

Ada beberapa alat yang memiliki GUI dan mungkin sedikit lebih mudah dipahami
namun kurang fleksibel.

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Platform yang Didukung &amp; Nama Alat (Bantu)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Supported Platforms">OS X / Windows</td>
      <td data-th="Gulp"><a href="http://alphapixels.com/prepros/">Prepros</a></td>
    </tr>
    <tr>
      <td data-th="Supported Platforms">OS X</td>
      <td data-th="Gulp"><a href="https://incident57.com/codekit/">CodeKit</a></td>
    </tr>
    <tr>
      <td data-th="Supported Platforms">OS X</td>
      <td data-th="Gulp"><a href="http://hammerformac.com/">HammerForMac</a></td>
    </tr>
  </tbody>
</table>


## Tugas apa yang sebaiknya ada dalam proses pembangunan?

Di bagian berikut ini, kita akan melihat tugas paling umum yang
sebaiknya Anda miliki dalam proses pembangunan dan tugas yang disarankan untuk Grunt dan Gulp.

Ini memerlukan banyak uji coba agar masing-masing bagian bisa disiapkan sesuai yang diinginkan
dan bisa menciutkan nyali jika Anda baru mengenal proses pembangunan.

Untuk contoh proses pembangunan yang baik, lihat [panduan memulai Web Starter
Kit](/web/fundamentals/getting-started/web-starter-kit/),
yang membahas cara menggunakan Web Starter Kit dan menjelaskan apa yang dilakukan setiap
perintah di file Gulp. Ini bisa digunakan sebagai cara cepat untuk persiapan, kemudian
Anda bisa membuat perubahan jika diperlukan.

Jika Anda ingin membuat proses pembangunan sendiri dan masih baru dengan Gulp
atau Grunt, panduan memulai cepat akan menjadi tempat terbaik untuk mulai memasang
dan menjalankan proses pembangunan Anda yang pertama:

* [Memulai Grunt](http://gruntjs.com/getting-started)
* [Memulai
  Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#getting-started)

### Gunakan penggabungan & minifikasi agar situs lebih cepat

Bagi mereka yang tidak familier dengan istilah penggabungan dan minifikasi,
penggabungan berarti menggabungkan beberapa file bersama-sama, yaitu menyalin dan
menempelkan sejumlah file menjadi satu. Alasan kami melakukannya adalah karena browser akan lebih
efisien mengambil sebuah file, daripada mengambil banyak file kecil.

Minifikasi adalah proses mengambil file dan mengurangi jumlah
karakter keseluruhan, tanpa mengubah cara kerja kode. Sebuah contoh yang bagus tentang hal ini adalah
membuang komentar, atau mengambil nama variabel panjang dan membuatnya lebih kecil. Ini
akan mengecilkan ukuran file, sehingga pengunduhan lebih cepat.

Gunakan modul berikut untuk minifikasi:

<table>
  <thead>
    <tr>
      <th data-th="Type of File">Tipe File</th>
      <th data-th="Gulp">Gulp</th>
      <th data-th="Grunt">Grunt</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Type of File">CSS</td>
      <td data-th="Gulp"><a href="https://github.com/ben-eb/gulp-csso">gulp-csso</a></td>
      <td data-th="Grunt"><a href="https://github.com/gruntjs/grunt-contrib-cssmin">grunt-contrib-cssmin</a></td>
    </tr>
    <tr>
      <td data-th="Type of File">JS</td>
      <td data-th="Gulp"><a href="https://github.com/terinjokes/gulp-uglify/">gulp-uglify</a></td>
      <td data-th="Grunt"><a href="https://github.com/gruntjs/grunt-contrib-uglify">grunt-contrib-uglify</a></td>
    </tr>
    <tr>
      <td data-th="Type of File">HTML</td>
      <td data-th="Gulp"><a href="https://www.npmjs.com/package/gulp-minify-html">gulp-minify-html</a></td>
      <td data-th="Grunt"><a href="https://github.com/gruntjs/grunt-contrib-htmlmin">grunt-contrib-htmlmin</a></td>
    </tr>
  </tbody>
</table>

Untuk penggabungan, gunakan yang berikut ini:

<table>
  <thead>
    <tr>
      <th data-th="Type of File">Tipe File</th>
      <th data-th="Gulp">Gulp</th>
      <th data-th="Grunt">Grunt</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Type of File">CSS (Sass)</td>
      <td data-th="Gulp"><a href="https://github.com/dlmanning/gulp-sass">gulp-sass</a> atau <a href="https://github.com/jonkemp/gulp-useref">gulp-useref</a></td>
      <td data-th="Grunt"><a href="https://github.com/gruntjs/grunt-contrib-sass">grunt-contrib-sass</a> atau <a href="https://github.com/yeoman/grunt-usemin">grunt-usemin</a></td>
    </tr>
    <tr>
      <td data-th="Type of File">JS</td>
      <td data-th="Gulp"><a href="https://github.com/jonkemp/gulp-useref">gulp-useref</a></td>
      <td data-th="Grunt"><a href="https://github.com/yeoman/grunt-usemin">grunt-usemin</a> atau <a href="https://github.com/fatso83/grunt-codekit">grunt-codekit</a></td>
    </tr>
  </tbody>
</table>

**Catatan**: Anda bisa menggunakan Sass dengan memanfaatkan fitur 'import' ([Lihat Web Starter
Kit untuk contohnya](https://github.com/google/web-starter-kit/blob/master/app/styles/main.scss)).

### Optimalkan gambar Anda

Optimalisasi gambar merupakan langkah penting untuk membantu mempercepat situs; Anda akan
terkejut dengan sejauh mana bisa memperkecil gambar tanpa kehilangan kualitas. Meta
data dibuang dari gambar karena tidak diperlukan browser untuk menampilkan
gambar, misalnya, informasi tentang kamera yang digunakan untuk mengambil foto.

Untuk mengoptimalkan gambar, Anda bisa menggunakan modul ini.

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Gulp &amp; Grunt</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Gulp"><a href="https://github.com/sindresorhus/gulp-imagemin">gulp-imagemin</a></td>
      <td data-th="Grunt"><a href="https://github.com/gruntjs/grunt-contrib-imagemin">grunt-contrib-imagemin</a></td>
    </tr>
  </tbody>
</table>

### Jangan sampai salah dengan awalan vendor

Kadang-kadang sedikit membosankan saat menyertakan semua awalan vendor untuk CSS
yang Anda gunakan. Gunakan auto-prefixer untuk menambahkan awalan yang perlu Anda
sertakan secara otomatis:

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Gulp vs Grunt</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Gulp"><a href="https://github.com/sindresorhus/gulp-autoprefixer">gulp-autoprefixer</a></td>
      <td data-th="Grunt"><a href="https://github.com/nDmitry/grunt-autoprefixer">grunt-autoprefixer</a></td>
    </tr>
  </tbody>
</table>

**Catatan**  
Jika suka, Anda bisa menambahkan [paket Sublime untuk menambahkan awalan secara otomatis](/web/tools/setup/setup-editor#autoprefixer).


### Jangan biarkan editor teks Anda memuat ulang secara live

Pemuatan ulang secara live akan memperbarui situs di browser setiap kali Anda membuat perubahan.
Setelah menggunakannya sekali, Anda tidak akan bisa melepaskannya lagi.

Web Starter Kit menggunakan browser-sync untuk dukungan Live Reload.

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Gulp vs Grunt</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Gulp"><a href="http://www.browsersync.io/docs/gulp/">browser-sync</a></td>
      <td data-th="Grunt"><a href="https://github.com/gruntjs/grunt-contrib-connect">grunt-contrib-connect</a> & <a href="https://github.com/gruntjs/grunt-contrib-watch">grunt-contrib-watch</a></td>
    </tr>
  </tbody>
</table>

Note: Jika Anda suka dengan gagasan Live Reloading, namun tidak ingin melakukan proses pembangunan, [Tulisan Addy Osmani pada HTML5Rocks](http://www.html5rocks.com/en/tutorials/tooling/synchronized-cross-device-testing/) membahas beragam alternatif (sebagian gratis dan sebagian berbayar).


{# wf_devsite_translation #}
