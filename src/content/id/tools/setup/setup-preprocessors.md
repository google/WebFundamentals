project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Pelajari cara menyiapkan praprosesor CSS & JS untuk membantu Anda menyusun kode secara lebih efisien.

{# wf_updated_on: 2015-08-03 #}
{# wf_published_on: 2015-08-03 #}

# Menyiapkan Praprosesor CSS dan JS {: .page-title }

{% include "web/_shared/contributors/pbakaus.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

Praprosesor CSS seperti Sass, serta praprosesor dan transpiler JS bisa sangat mempercepat proses development Anda bila digunakan dengan benar. Pelajari cara menyiapkannya.


### TL;DR {: .hide-from-toc }
- Praprosesor memungkinkan Anda menggunakan fitur di CSS dan JavaScript yang secara bawaan tidak didukung oleh browser Anda, misalnya, variabel CSS.
- Jika Anda menggunakan praprosesor CSS, petakan file sumber asli Anda ke keluaran yang dirender menggunakan Source Maps.
- Pastikan server web Anda bisa menyajikan Source Maps.
- Gunakan praprosesor yang didukung untuk menghasilkan Source Maps secara otomatis.


## Apa yang dimaksud praprosesor?

Praprosesor mengambil file sumber sementara dan mengonversinya ke dalam sesuatu yang dipahami browser. 

Dengan CSS sebagai keluarannya, praprosesor digunakan untuk menambahkan fitur yang awalnya tidak ada: Variabel CSS, Penyarangan, dan sebagainya. Contoh utama dalam kategori ini adalah [Sass](http://sass-lang.com/), [Less](http://lesscss.org/){: .external } dan [Stylus](https://learnboost.github.io/stylus/).

Dengan JavaScript sebagai keluaran, alat tersebut mengonversi (mengompilasi) dari bahasa yang sama sekali berbeda atau mengonversi (mentranspilasi) superset atau standar bahasa baru menjadi standar yang masih berlaku saat ini. Contoh utama dalam kategori ini adalah [CoffeeScript](http://coffeescript.org/){: .external } dan ES6 (melalui [Babel](https://babeljs.io/)).

## Men-debug dan mengedit materi yang dipraproses

Segera setelah Anda berada di browser dan menggunakan DevTools untuk [mengedit CSS Anda](/web/tools/chrome-devtools/inspect-styles/edit-styles) atau men-debug JavaScript Anda, satu masalah akan mengemuka: apa yang Anda lihat tidak merefleksikan sumber Anda dan tidak begitu membantu memperbaiki masalah.

Untuk mengakalinya, sebagian besar praprosesor modern mendukung sebuah fitur yang bernama <b>Source Maps</b>.

### Apa yang dimaksud Source Maps?

Source map adalah format pemetaan berbasis JSON yang membuat hubungan antara file bidang mini dengan sumbernya. Saat Anda membuat versi untuk produksi, bersama dengan minifikasi dan kombinasi file JavaScript, Anda akan menghasilkan source map yang menyimpan informasi tentang file asli Anda.

### Cara kerja Source Maps

Untuk setiap file CSS yang dihasilkannya, sebuah praprosesor CSS menghasilkan file source map (.map) selain CSS yang dikompilasi. File source map adalah file JSON yang mendefinisikan pemetaan antara setiap deklarasi CSS yang dihasilkan dengan baris file sumber yang sesuai.

Setiap file CSS mengandung anotasi yang menentukan URL file source map-nya, yang disematkan ke dalam komentar khusus di baris terakhir file:

    /*# sourceMappingURL=<url> */

Misalnya, sebut saja ada file sumber Sass bernama **styles.scss**.

    %$textSize: 26px;
    $fontColor: red;
    $bgColor: whitesmoke;
    h2 {
        font-size: $textSize;
        color: $fontColor;
        background: $bgColor;
    }

Sass akan menghasilkan file CSS, **styles.css**, bersama dengan anotasi sourceMappingURL:

    h2 {
      font-size: 26px;
      color: red;
      background-color: whitesmoke;
    }
    /*# sourceMappingURL=styles.css.map */

Berikut ini contoh file source map:

    {
      "version": "3",
      "mappings":"AAKA,EAAG;EACC,SAAS,EANF,IAAI;EAOX,KAAK"
      "sources": ["sass/styles.scss"],
      "file": "styles.css"
    }

## Memverifikasi apakah server web bisa menyajikan Source Maps

Beberapa server web, seperti Google App Engine, membutuhkan konfigurasi eksplisit untuk setiap jenis file yang disajikan. Dalam hal ini, Source Map Anda harus disajikan dengan jenis MIME `application/json`, tetapi Chrome sebenarnya [menerima semua jenis materi](https://stackoverflow.com/questions/19911929/what-mime-type-should-i-use-for-source-map-files), misalnya `application/octet-stream`.

### Bonus: Pembuatan source map melalui header khusus 

Jika Anda tidak menginginkan komentar tambahan di file Anda, gunakan bidang header HTTP di file JavaScript yang diminifikasi untuk memberi tahu DevTools tempat menemukan source map. Ini memerlukan konfigurasi atau penyesuaian server web Anda dan berada di luar cakupan dokumen ini.

    X-SourceMap: /path/to/file.js.map

Seperti komentar, ini akan memberi tahu DevTools dan alat lainnya tempat mencari source map yang dikaitkan dengan file JavaScript. Header ini juga menghindari masalah referensi Source Maps pada bahasa yang tidak mendukung komentar satu baris.

## Praprosesor yang didukung

Dewasa ini, hampir apa saja yang dikompilasi menjadi bahasa JavaScript memiliki opsi untuk menghasilkan Source Maps – termasuk CoffeeScript, TypeScript, JSX dan masih banyak lagi. Selain itu, Anda bisa menggunakan Source Maps di sisi server di dalam Node, di CSS kita melalui Sass, Less, dan banyak lagi, menggunakan browserify yang memberi Anda kemampuan require bergaya Node dan melalui alat minifikasi, seperti uglify-js yang juga menambahkan kemampuan yang mumpuni untuk menghasilkan Source Maps multitingkat.

### JavaScript

<table>
  <thead>
    <tr>
      <th width="20%" data-th="Compiler">Compiler</th>
      <th width="40%" data-th="Command">Perintah</th>
      <th data-th="Instructions">Petunjuk</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Compiler"><a href="http://coffeescript.org/#source-maps">CoffeeScript</a></td>
      <td data-th="Command"><code>$ coffee -c square.coffee -m</code></td>
      <td data-th="Instructions">Flag -m (--map) adalah satu saja yang diperlukan bagi compiler untuk membuat keluaran source map, selain menangani penambahan pragma komentar sourceMapURL bagi Anda ke file yang dihasilkan.</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="http://www.typescriptlang.org/">TypeScript</a></td>
      <td data-th="Command"><code>$ tsc -sourcemap square.ts</code></td>
      <td data-th="Instructions">Flag -sourcemap akan menghasilkan map dan menambahkan pragma komentar.</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="https://github.com/google/traceur-compiler/wiki/SourceMaps">Traceur</a></td>
      <td data-th="Command"><code>$ traceur --source-maps=[file|inline]</code></td>
      <td data-th="Instructions">Dengan <code>--source-maps=file</code>, setiap file keluaran yang berakhiran <code>.js</code> akan memiliki file sourcemap yang berakhiran <code>.map</code>; dengan  <code>source-maps='inline'</code>, setiap file keluaran yang berakhiran <code>.js</code> akan diakhiri dengan komentar yang berisi sourcemap yang dienkodekan di dalam <code>data:</code> URL.</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="https://babeljs.io/docs/usage/cli/#compile-with-source-maps">Babel</a></td>
      <td data-th="Command"><code>$ babel script.js --out-file script-compiled.js --source-maps</code></td>
      <td data-th="Instructions">Gunakan --source-maps atau -s untuk menghasilkan Source Maps. Gunakan <code>--source-maps inline</code> untuk Source Maps inline.</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="https://github.com/mishoo/UglifyJS2">UglifyJS</a></td>
      <td data-th="Command"><code>$ uglifyjs file.js -o file.min.js --source-map file.min.js.map</code></td>
      <td data-th="Instructions">Ini adalah perintah paling dasar yang dibutuhkan untuk menghasilkan source map untuk 'file.js'. Ini juga akan menambahkan pragma komentar ke file keluaran.</td>
    </tr>
  </tbody>
</table>

### CSS

<table>
  <thead>
    <tr>
      <th width="20%" data-th="Compiler">Compiler</th>
      <th width="40%" data-th="Command">Perintah</th>
      <th data-th="Instructions">Petunjuk</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Compiler"><a href="http://sass-lang.com">Sass</a></td>
      <td data-th="Command"><code>$ scss --sourcemap styles.scss styles.css</code></td>
      <td data-th="Instructions">Source Maps di Sass didukung sejak Sass 3.3.</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="http://lesscss.org/">Less</a></td>
      <td data-th="Command"><code>$ lessc styles.less > styles.css --source-map styles.css.map</code></td>
      <td data-th="Instructions">Diimplementasikan di 1.5.0. Lihat <a href="https://github.com/less/less.js/issues/1050#issuecomment-25566463">masalah #1050</a> untuk detail dan pola pemakaiannya.</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="https://learnboost.github.io/stylus/">Stylus</a></td>
      <td data-th="Command"><code>$ stylus --sourcemaps styles.style styles.css</code></td>
      <td data-th="Instructions">Ini akan menyematkan sourcemap sebagai string berenkode base64 langsung di file keluaran.</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="http://compass-style.org/">Compass</a></td>
      <td data-th="Command"><code>$ sass --compass --sourcemap --watch scss:css</code></td>
      <td data-th="Instructions">Selain itu, Anda juga bisa menambahkan `sourcemap: true` ke file config.rb Anda.</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="https://github.com/postcss/autoprefixer">Autoprefixer</a></td>
      <td data-th="Command"><code></code></td>
      <td data-th="Instructions">Buka tautan untuk melihat cara memakainya dan memasukkan sourcemap input.</td>
    </tr>
  </tbody>
</table>

## Source Maps dan DevTools

Setelah menyiapkan Source Maps dengan benar, Anda mungkin senang saat mengetahui DevTools juga memiliki dukungan internal untuk Source Maps berbasis CSS dan JS.

### Mengedit CSS yang dipraproses

Kunjungi [Mengedit Sass, Less, atau Stylus](/web/tools/chrome-devtools/inspect-styles/edit-styles) untuk mempelajari selengkapnya tentang cara mengedit dan menyegarkan gaya yang ditautkan dengan source map langsung di dalam DevTools.

### Mengedit dan men-debug JavaScript yang dipraproses

Ketahui selengkapnya tentang cara men-debug JavaScript yang dikecilkan, dikompilasi, atau ditranspilasi di Panel Sources di [Memetakan Kode Praproses ke Kode Sumber](/web/tools/chrome-devtools/debug/readability/source-maps).


{# wf_devsite_translation #}
