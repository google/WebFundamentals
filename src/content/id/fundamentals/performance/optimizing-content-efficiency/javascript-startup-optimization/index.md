project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Selalu hemat biaya transmisi dan parse/kompilasi dari JavaScript untuk memastikan bahwa halaman interaktif dengan cepat.

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2017-11-30 #}
{# wf_blink_components: Blink>JavaScript #}

# Pengoptimalan JavaScript Start-up {: .page-title }

{% include "web/_shared/contributors/addyosmani.html" %}

Karena kita membangun situs yang sangat bergantung pada JavaScript, menyebabkan kita
terkadang membayar apa yang kita keluarkan dengan cara yang tidak selalu bisa kita lihat dengan mudah. Dalam artikel ini, kami akan
menjelaskan mengapa sedikit **disiplin** bisa membantu jika Anda menginginkan situs Anda dimuat dan cepat
interaktif di perangkat seluler. Mengirimkan lebih sedikit JavaScript bisa berarti lebih
sedikit waktu dalam transmisi jaringan, lebih sedikit kode dekompresi yang dihabiskan, dan lebih sedikit waktu
untuk memparsing dan mengompilasi JavaScript ini.

## Jaringan

Ketika sebagian besar developer memikirkan tentang biaya JavaScript, mereka memikirkan biaya tersebut
sebagai bagian dari **biaya download dan eksekusi**. Mengirim lebih banyak byte JavaScript
melalui kabel membutuhkan waktu lebih lama, sehingga memperlambat koneksi pengguna.

<img src="images/1_U00XcnhqoczTuJ8NH8UhOw.png" alt="Ketika browser meminta
resource, resource tersebut harus diambil lalu dikompres. Dalam kasus
resource seperti JavaScript, resource tersebut harus di-parse dan dikompilasi sebelum
eksekusi."/>

Hal ini bisa menjadi masalah, bahkan di negara-negara maju, karena **jenis koneksi
jaringan efektif** yang dimiliki pengguna mungkin sebenarnya bukan 3G, 4G, maupun Wi-Fi. Anda bisa saja menggunakan
Wi-Fi di sebuah kafe, tetapi terhubung ke hotspot seluler dengan kecepatan 2G.

Anda bisa **mengurangi** biaya transfer jaringan JavaScript melalui:

* **Hanya mengirimkan kode yang dibutuhkan oleh pengguna**.
    * Gunakan [pemisahan-kode](/web/updates/2017/06/supercharged-codesplit) untuk membagi
      JavaScript Anda ke dalam apa yang penting dan apa yang tidak penting. Paket modul
      seperti dukungan [webpack](https://webpack.js.org)
      [pemisahan-kode](https://webpack.js.org/guides/code-splitting/).
    * Tidak sering memuat kode yang tidak penting.
* **Minifikasi**
    * Gunakan [UglifyJS](https://github.com/mishoo/UglifyJS) untuk
      [minifikasi](/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer#minification_preprocessing_context-specific_optimizations)
      kode ES5.
    * Gunakan [minifikasi-babel](https://github.com/babel/minify) atau
      [uglify-es](https://www.npmjs.com/package/uglify-es) untuk meminifikasi ES2015+.
* **Kompresi**
    * Minimal menggunakan
      [gzip](/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer#text_compression_with_gzip)
      untuk mengompresi resource berbasis teks.
    * Pertimbangkan menggunakan
      [Brotli](https://www.smashingmagazine.com/2016/10/next-generation-server-compression-with-brotli/)
      ~[q11](https://twitter.com/paulcalvano/status/924660429846208514). Brotli
      memiliki kinerja yang lebih baik dibandingkan gzip untuk rasio kompresinya. Brotli membantu CertSimple menghemat
      [17%](https://speakerdeck.com/addyosmani/the-browser-hackers-guide-to-instant-loading?slide=30)
      on ukuran byte JS yang dikompresi dan membantu LinkedIn menghemat
      [4%](https://engineering.linkedin.com/blog/2017/05/boosting-site-speed-using-brotli-compression)
      waktu muat mereka.
* **Menghapus kode yang tidak digunakan**.
    * Identifikasi peluang untuk kode yang dapat dihapus atau dimuat dengan sangat perlahan
      dengan [cakupan
      kode DevTools](/web/updates/2017/04/devtools-release-notes#coverage).
    * Gunakan
      [babel-preset-env](https://github.com/babel/babel/tree/master/packages/babel-preset-env)
      dan browserlist untuk menghindari transpiling fitur yang sudah ada di browser modern.
      Developer berpengalaman mungkin tahu bahwa [analisis paket webpack
](https://github.com/webpack-contrib/webpack-bundle-analyzer) yang teliti akan membantu
      mengidentifikasi kesempatan untuk memangkas dependensi yang tidak dibutuhkan.
    * Untuk kode stripping, lihat
      [tree-shaking](https://webpack.js.org/guides/tree-shaking/), plugin trimming pengoptimalan dan library canggih [Closure
      Compiler](/closure/compiler/)
      seperti
      [lodash-babel-plugin](https://github.com/lodash/babel-plugin-lodash) atau
      [ContextReplacementPlugin](https://iamakulov.com/notes/webpack-front-end-size-caching/#moment-js) webpack
      untuk library seperti Moment.js.
* **Meng-cache kode untuk meminimalkan lalu lintas jaringan.**
    * Gunakan [HTTP
      caching](/web/fundamentals/performance/optimizing-content-efficiency/http-caching)
      guna memastikan bahwa cache browser merespons secara efektif. Tentukan lifetime
      optimal untuk skrip (usia-maks) dan berikan token validasi (ETag) untuk menghindari
      transfer byte yang tidak berubah.
    * Caching Service Worker dapat membuat jaringan aplikasi Anda
      lebih tangguh dan memberi Anda akses cepat ke fitur-fitur seperti [Caching
      kode V8](https://v8project.blogspot.com/2015/07/code-caching.html).
    * Gunakan caching jangka panjang untuk menghindari keharusan mengambil kembali sumber daya yang belum
      berubah. Jika menggunakan Webpack, lihat [hashing
      nama file](https://webpack.js.org/guides/caching/).

## Parse/Kompilasi

Setelah diunduh, salah satu yang paling **memberatkan** dari JavaScript adalah waktu untuk mesin
JS untuk **mem-parse/mengompilasi** kode ini. Di [Chrome
DevTools](/web/tools/chrome-devtools/), parse dan kompilasi adalah bagian waktu
"Scripting" berwarna kuning pada panel Kinerja.

<img src="images/1__4gNDmBlXxOF2-KmsOrKkw.png"/>

Tab Bottom-Up dan Call Tree menunjukkan waktu Parse/kompilasi secara tepat:

<figure> <img src="images/1_GdrVt_BTTzzBOIoyZZsQZQ.png"/> <figcaption> Chrome
panel Kinerja DevTools > Bottom-Up. Dengan mengaktifkan Statistik Panggilan Runtime V8, kita
bisa melihat waktu yang dihabiskan pada fase-fase seperti Parse dan Kompilasi </figcaption> </figure>

Note: Dukungan panel Kinerja untuk Statistik Panggilan Runtime saat ini masih pada tahap percobaan.
Untuk mengaktifkan, buka chrome://flags/#enable-devtools-experiments -> mulai ulang Chrome ->
buka DevTools -> Setelan -> Eksperimen -> tekan shift 6 kali -> periksa opsi
yang dipanggil `Timeline: V8 Runtime Call Stats on Timeline` dan tutup, lalu buka ulang DevTools.

Tetapi, mengapai ini penting?

<img src="images/1_Dirw7RdQj9Dktc-Ny6-xbA.png"/>

Menghabiskan waktu yang lama untuk mem-parse/mengompilasi kode bisa sangat
memperlambat kecepatan pengguna dalam berinteraksi dengan situs Anda. Semakin banyak JavaScript yang Anda kirim, semakin lama waktu
yang dibutuhkan untuk mem-parse mengompilasinya sebelum situs Anda interaktif.

> Byte-for-byte, ** Pemrosesan JavaScript lebih memberatkan browser daripada
> gambar atau Web Font dengan ukuran setara** — Tom Dale

Dibandingkan dengan JavaScript, ada banyak biaya yang terlibat dalam
pemrosesan gambar berukuran sama (masih harus dikoding!), tetapi pada sebagian
besar perangkat keras seluler, JS lebih cenderung berdampak negatif terhadap interaktivitas halaman.

<figure> <img src="images/1_PRVzNizF9jQ_QADF5lQHpA.png"/> <figcaption>JavaScript
dan byte gambar memiliki biaya yang sangat berbeda. Gambar biasanya tidak menghalangi thread
utama atau mengganggu antarmuka agar tidak interaktif saat didekodekan dan
dirasterkan. Namun demikian, JS dapat menunda interaktivitas karena biaya
parse, kompilasi, dan eksekusi.</figcaption> </figure>

Ketika berbicara tentang parse dan kompilasi yang menjadi lambat; konteks itu penting — Kita
sedang membicarakan tentang **rata-rata** ponsel di sini. **Rata-rata pengguna bisa memiliki ponsel
dengan CPU dan GPU lambat, tanpa cache L2/L3, dan mungkin memori
yang sangat terbatas.**

> Kemampuan jaringan dan kemampuan perangkat tidak selalu selaras. Pengguna
> dengan koneksi Fiber yang luar biasa tetapi tidak memiliki CPU terbaik untuk
> mem-parse dan mengevaluasi JavaScript yang dikirimkan ke perangkat mereka. Bisa juga
sebaliknya, koneksi jaringan yang buruk, tetapi CPU yang luar biasa cepat. — Kristofer
> Baxter, LinkedIn

Di bawah ini kita dapat melihat biaya parse ~ 1MB dari JavaScript yang didekompresi (sederhana) pada
perangkat keras low-end dan high-end. **Ada 2–5x perbedaan waktu untuk mem-parse/mengompilasi
kode antara ponsel tercepat di pasaran dengan ponsel rata-rata**.

<figure> <img src="images/1_8BQ3bCYu1AVvJWPR1x8Yig.png"/> <figcaption>Grafik ini
menyoroti waktu parse untuk paket JavaScript 1MB (dikompresi ~250KB dengan gzip) di
desktop dan perangkat seluler dari berbagai kelas. Saat melihat biaya
parse, angka-angka dekompresi yang perlu dipertimbangkan, mis. ~250KB JS dengan kompresi gzip
didekompresi menjadi ~1MB kode.</figcaption> </figure>

Bagaimana dalam praktik nyata, seperti CNN.com?

**Pada iPhone 8 canggih, dibutuhkan hanya ~4 detik untuk mem-parse/mengompilasi
JS CNN dibandingkan dengan ~13 detik untuk ponsel rata-rata (Moto G4)**. Perbedaan secara signifikan dapat mempengaruhi seberapa cepat
pengguna dapat berinteraksi sepenuhnya dengan situs ini.

<figure> <img src="images/1_7ysArXJ4nN0rQEMT9yZ_Sg.png"/> <figcaption>Di atas kita
melihat waktu parse dibandingkan kinerja chip A11 Bionic Apple dibandingkan
Snapdragon 617 pada lebih banyak perangkat keras Android.</figcaption> </figure>

Ini menyoroti pentingnya pengujian pada perangkat **rata-rata** (seperti
G4), bukan hanya ponsel yang mungkin ada di saku Anda. Bagaimanapun, konteks
itu penting: **optimalkan sesuai perangkat dan kondisi jaringan yang dimiliki pengguna Anda.**

<figure> <img src="images/1_6oEpMEi_pjRNjmtN9i2TCA.png"/> <figcaption>Google
Analytics bisa memberikan insight ke dalam <a
href="https://crossbrowsertesting.com/blog/development/use-google-analytics-find-devices-customers-use/">kelas perangkat
seluler</a> yang digunakan pengguna nyata untuk mengakses situs Anda. Ini bisa
memberikan peluang untuk memahami kendala CPU/GPU nyata yang
mereka gunakan.</figcaption> </figure>


**Apakah kita benar-benar mengeluarkan terlalu banyak JavaScript? Emm, mungkin :)**

Menggunakan Arsip HTTP (situs ~500K teratas) untuk menganalisis keadaan
[JavaScript di seluler](http://beta.httparchive.org/reports/state-of-javascript#bytesJs), kita bisa
melihat bahwa 50% situs memerlukan waktu 14 detik untuk interaktif. Situs-situs ini memerlukan
hingga 4 detik hanya untuk mem-parse dan mengompilasi JS.

<img src="images/1_sVgunAoet0i5FWEI9NSyMg.png"/>

Faktor dalam waktu yang diperlukan untuk mengambil data dan memproses JS serta resource lainnya
dan mungkin tidak mengejutkan bahwa pengguna mungkin bisa tetap menunggu beberapa saat sebelum merasakan
halaman siap untuk digunakan. Kita bisa melakukan lebih baik di sini.

**Menghapus JavaScript yang tidak penting dari halaman Anda dapat mengurangi waktu
transmisi, parsi dan kompilasi intensif-CPU, dan potensi overhead memori. Ini
juga membantu membuat halaman Anda lebih cepat interaktif.**

## Waktu eksekusi

Tidak hanya parse dan kompilasi yang memerlukan biaya. **Eksekusi JavaScript**
(menjalankan kode setelah di-parse/dikompilasi) adalah salah satu operasi yang harus dilakukan
di thread utama. Waktu eksekusi yang lama juga dapat mempengaruhi seberapa cepat
seorang pengguna dapat berinteraksi dengan situs Anda.

<img src="images/1_ec0wEKKVl7iQidBks3oDKg.png"/>

> Jika skrip dieksekusi lebih dari 50 milidetik, waktu menuju interaktif tertunda
oleh *seluruh* jumlah waktu yang diperlukan untuk mendownload, mengompilasi, dan mengeksekusi JS —
> Alex Russell

Untuk mengatasinya, JavaScript memanfaatkan **potongan-potongan kecil** untuk menghindari
penguncian thread utama. Gali lebih jauh apakah Anda bisa menurunkan seberapa
banyak pekerjaan yang bisa dilakukan selama eksekusi.

## Biaya lainnya

JavaScript bisa mempengaruhi kinerja halaman dengan cara lain:

* Memori. Halaman dapat terlihat tersendat atau sering berhenti karena GC (garbage
  collection) atau pembersihan sampah memori. Ketika browser mengambil kembali memori, eksekusi JS dijeda
  sehingga browser yang sering membersihkan sampah memori dapat menjeda eksekusi lebih sering
 daripada yang kita harapkan. Hindari [kebocoran memori](/web/tools/chrome-devtools/memory-problems/)
  dan jeda GC yang terlalu sering agar halaman Anda tidak tersendat.
* Selama runtime, JavaScript yang berjalan lama dapat memblokir thread utama , menyebabkan
  halaman yang tidak responsif. Memotong-motong pekerjaan menjadi potongan-potongan kecil (menggunakan
  <code><a
  href="/web/fundamentals/performance/rendering/optimize-javascript-execution#use_requestanimationframe_for_visual_changes">requestAnimationFrame()</a></code>
  atau <code><a
  href="/web/updates/2015/08/using-requestidlecallback">requestIdleCallback()</a></code>
  untuk penjadwalan) bisa meminimalkan masalah kinerja respons.

## Pola untuk menurunkan biaya pengiriman JavaScript

Saat Anda mencoba untuk mempertahankan waktu parse/kompilasi dan waktu
transmisi jaringan untuk JavaScript, ada pola yang bisa membantu seperti memotong-motong berdasarkan rute atau
[PRPL](/web/fundamentals/performance/prpl-pattern/).

### PRPL

PRPL (Push, Render, Pre-cache, Lazy-load) adalah pola yang mengoptimalkan untuk
interaktivitas melalui pemecahan kode dan caching yang agresif:

<img src="images/1_VgdNbnl08gcetpqE1t9P9w.png"/>

Mari kita visualisasikan dampaknya.

Kami menganalisis waktu muat situs seluler populer dan Aplikasi Web Progresif menggunakan
Statistik Panggilan Runtime V8. Seperti yang dapat kita lihat, waktu parse (ditampilkan dalam warna jingga) adalah
bagian signifikan yang banyak digunakan oleh situs-situs ini untuk menghabiskan waktu:

<img src="images/1_9BMRW5i_bS4By_JSESXX8A.png"/>

[Wego](https://www.wego.com), situs yang menggunakan PRPL, mempertahankan waktu parse
rendah untuk rute mereka, mendapatkan interaktif dengan sangat cepat. Banyak situs lain
di atas mengadopsi anggaran pemecahan-kode dan kinerja untuk mencoba menurunkan biaya
JS.


### Bootstrapping Progresif

Banyak situs mengoptimalkan visibilitas konten dengan interaktivitas yang mahal. Untuk
mendapatkan first paint cepat saat Anda memiliki paket JavaScript besar, terkadang developer
menggunakan rendering sisi server; lalu "mengupgradenya" untuk menambahkan handler
peristiwa ketika JavaScript akhirnya diambil.

Hati-hati — ini memiliki biaya sendiri. Anda 1) umumnya mengirimkan respons
HTML *lebih besar* yang dapat mendorong interaktivitas kami, 2) dapat membiarkan pengguna berada di lembah
aneh, di mana separuh pengalaman tidak bisa benar-benar interaktif hingga JavaScript
menyelesaikan pemrosesan.

Bootstrapping Progresif mungkin menjadi pendekatan yang lebih baik. Keluarkan halaman
fungsional secara minimal (yang hanya terdiri dari HTML/JS/CSS yang dibutuhkan untuk rute saat ini).
Semakin banyaknya resource, aplikasi bisa mengalami lazy-load dan membuka lebih banyak fitur.

<figure> <img src="images/1_zY03Y5nVEY21FXA63Qe8PA.png"/> <figcaption> <a
href="https://twitter.com/aerotwist/status/729712502943174657">Bootstrapping
Progresif</a> oleh Paul Lewis </figcaption> </figure>

Memuat kode secara proporsional dengan apa yang dilihat adalah yang terbaik. PRPL dan
Bootstrapping Progresif adalah pola yang dapat membantu mencapai hal ini.

## Kesimpulan

**Ukuran transmisi sangat penting untuk jaringan low end. Waktu parse adalah penting
untuk perangkat yang mengandalkan CPU. Pertahankan agar selalu rendah.**

Tim telah menemukan keberhasilan mengadopsi anggaran kinerja yang ketat
untuk menjaga agar waktu transmisi Java Script dan parse/kompilasi tetap rendah. Lihat apa yang disampaikan oleh Alex Russell, "[Bisakah Anda
Mencapainya?: Anggaran Kinerja Web
Dunia Nyata](https://infrequently.org/2017/10/can-you-afford-it-real-world-web-performance-budgets/)"
untuk panduan anggaran untuk perangkat seluler.

<figure> <img src="images/1_U8PJVNrA_tYADQ6_S4HUYw.png"/> <figcaption>Sangat
berguna jika Anda mempertimbangkan seberapa banyak "headroom" JS yang bisa dibuat dari keputusan arsitektur kita
bisa mempengaruhi logika aplikasi.</figcaption> </figure>

Jika Anda sedang membangun situs yang menargetkan perangkat seluler, lakukan yang terbaik untuk mengembangkannya pada
perangkat keras yang representatif, jaga waktu parse/kompilasi JavaScript Anda tetap rendah, dan
terapkan Anggaran Kinerja untuk memastikan tim Anda dapat memantau
biaya JavaScript.

## Pelajari Lebih Lanjut

* [Chrome Dev Summit 2017 - Praktik Terbaik Pemuatan
  Modern](https://www.youtube.com/watch?v=_srJ7eHS3IM)
* [Kinerja Start-up
  JavaScript](https://medium.com/reloading/javascript-start-up-performance-69200f43b201)
* [Memecahkan krisis kinerja
  web](https://nolanlawson.github.io/frontendday-2016/) — Nolan Lawson
* [Bisakah Anda mencapainya? Anggaran kinerja
  dunia nyata](https://infrequently.org/2017/10/can-you-afford-it-real-world-web-performance-budgets/)
  — Alex Russell
* [Mengevaluasi framework dan
  library web](https://twitter.com/kristoferbaxter/status/908144931125858304) —
  Kristofer Baxter
* [Hasil pengalaman Cloudflare dengan
  Brotli](https://blog.cloudflare.com/results-experimenting-brotli/) untuk
  kompresi (perhatikan bahwa Brotli dinamis pada kualitas tinggi bisa menunda render
  halaman awal, jadi evaluasilah dengan hati-hati. Anda mungkin ingin mengompresi secara
  statis.)
* [Masa Depan
  Kinerja](https://medium.com/@samccone/performance-futures-bundling-281543d9a0d5)
  — Sam Saccone
