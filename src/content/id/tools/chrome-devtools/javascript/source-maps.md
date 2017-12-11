project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Buat agar kode sisi klien tetap bisa dibaca dan di-debug bahkan setelah Anda mengombinasikan, mengecilkan, atau mengompilasinya.

{# wf_updated_on: 2015-04-21 #}
{# wf_published_on: 2015-04-13 #}

# Memetakan Kode Praproses ke Kode Sumber {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/pbakaus.html" %}

Buat agar kode sisi klien tetap bisa dibaca dan di-debug bahkan setelah Anda mengombinasikan, mengecilkan, atau mengompilasinya. Gunakan Source Maps untuk memetakan kode sumber ke kode kompilasi Anda.


### TL;DR {: .hide-from-toc }
- Gunakan Source Maps untuk memetakan kode yang diminimalkan ke kode sumber. Anda kemudian bisa membaca dan men-debug kode yang telah dikompilasi dalam sumber aslinya.
- Gunakan hanya <a href=''/web/tools/setup/setup-preprocessors?#supported-preprocessors''>praprosesor yang mampu menghasilkan Source Maps</a>.
- Verifikasi apakah server web Anda bisa menyajikan Source Maps.


## Memulai praprosesor

Artikel ini menjelaskan cara berinteraksi dengan JavaScript Source Maps di panel DevTools Sources. Untuk ringkasan pertama mengenai apa yang dimaksud praprosesor, bagaimana ia bisa membantu, dan cara kerja Source Maps, lihatlah di [Menyiapkan Praprosesor CSS dan JS](/web/tools/setup/setup-preprocessors?#debugging-and-editing-preprocessed-content).

## Gunakan praprosesor yang didukung

Anda perlu menggunakan minifier yang mampu membuat source maps. Untuk mengetahui opsi paling populer, [lihat bagian dukungan praprosesor kami](/web/tools/setup/setup-preprocessors?#supported-preprocessors). Untuk tampilan diperluas, lihat [Source Maps: bahasa, alat, dan info lainnya](https://github.com/ryanseddon/source-map/wiki/Source-maps:-languages,-tools-and-other-info) laman wiki.

Tipe praprosesor berikut umumnya digunakan bersama Source Maps:

* Transpiler ([Babel](https://babeljs.io/){: .external }, [Traceur](https://github.com/google/traceur-compiler/wiki/Getting-Started))
* Compiler ([Closure Compiler](https://github.com/google/closure-compiler), [TypeScript](http://www.typescriptlang.org/){: .external }, [CoffeeScript](http://coffeescript.org), [Dart](https://www.dartlang.org))
* Minifier ([UglifyJS](https://github.com/mishoo/UglifyJS))

## Source Maps di panel DevTools Sources

Source Maps dari praprosesor menyebabkan DevTools memuat file orisinal Anda di samping yang diperkecil. Anda kemudian menggunakan aslinya untuk menyetel breakpoint dan menyusuri kode. Sementara itu, Chrome sebenarnya menjalankan kode yang diperkecil. Ini memberi Anda ilusi menjalankan situs development di produksi.

Saat menjalankan Source Maps di DevTools, Anda akan melihat bahwa JavaScript tidak dikompilasi dan Anda bisa melihat semua file individual JavaScript yang menjadi referensinya. Ini menggunakan pembuatan source map, namun di balik layar sebenarnya menjalankan kode yang telah dikompilasi. Semua kesalahan, log, dan breakpoint akan memetakan ke kode development demi proses debug yang mengagumkan! Jadi pada dasarnya ini memberi Anda ilusi seakan sedang menjalankan situs development di produksi.

### Aktifkan Source Maps di setelan

Source Maps telah diaktifkan secara default (mulai Chrome 39), namun jika Anda ingin memeriksa kembali atau mengaktifkannya, buka dahulu DevTools dan klik gigi roda setelan ![gear](imgs/gear.png){:.inline}. Pada **Sources**, centang **Enable JavaScript Source Maps**. Anda boleh juga mencentang **Enable CSS Source Maps**.

![Enable Source Maps](imgs/source-maps.jpg)

### Men-debug dengan Source Maps

Saat [men-debug kode](/web/tools/chrome-devtools/debug/breakpoints/step-code) dan Source Maps telah diaktifkan, Source Maps akan ditampilkan di dua tempat:

1. Di konsol (tautan ke sumber harus berupa file orisinal, bukan file yang dihasilkan)
2. Saat menyusuri kode (tautan di tumpukan panggilan harus membuka file sumber asli)

## @sourceURL dan displayName

Walaupun bukan bagian dari spesifikasi Source Map, `@sourceURL` memungkinkan Anda membuat development jadi jauh lebih mudah saat menggunakan evaluasi. Helper ini kelihatannya mirip sekali dengan properti `//# sourceMappingURL` dan sebenarnya telah disebutkan dalam spesifikasi Source Map V3.

Dengan menyertakan komentar khusus berikut ini dalam kode Anda, yang nanti dievaluasi, Anda bisa menamai evaluasi dan skrip inline serta gaya agar muncul sebagai nama yang lebih logis di DevTools Anda.

`//# sourceURL=source.coffee`

Masuk ke
**[demo](http://www.thecssninja.com/demo/source_mapping/compile.html)**, kemudian:

* Buka DevTools dan masuk ke panel **Sources**.
* Masukkan nama file ke dalam bidang masukan _Name your code:.
* Klik tombol **compile**.
* Sebuah peringatan akan muncul bersama jumlah yang telah dievaluasi dari sumber CoffeeScript.

Jika Anda me-luaskan sub-panel _Sources_, Anda sekarang akan melihat file baru dengan nama file khusus yang telah Anda masukkan sebelumnya. Jika Anda klik ganda untuk menampilkan file ini, ia akan berisi JavaScript hasil kompilasi untuk sumber orisinal kami. Di baris terakhir, akan ada komentar `// @sourceURL` yang menunjukkan apa yang menjadi file sumber orisinalnya. Ini bisa sangat membantu dalam proses debug saat menggunakan abstraksi bahasa.

![Menggunakan sourceURL](imgs/coffeescript.jpg)




{# wf_devsite_translation #}
