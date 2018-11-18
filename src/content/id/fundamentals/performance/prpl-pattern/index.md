project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-09-28 #}

# Pola PRPL {: .page-title }

{% include "web/_shared/contributors/addyosmani.html" %}

Dogfood: PRPL adalah pola baru yang kami rasa memiliki potensi hebat. Pada tahap ini, 
kami menyambut percobaan dengan pola tersebut selagi kami mengulangi ide pada 
pola dan mengumpulkan data lebih banyak di tempat yang menawarkan manfaat terbesar.

Web seluler terlalu lambat. Selama beberapa tahun, web telah berkembang dari
platform yang berfokus pada dokumen menjadi platform aplikasi kelas atas. Berkat
kemajuan dalam platform itu sendiri (seperti
[Service Worker](/web/fundamentals/getting-started/primers/service-workers)) dan pada alat
dan teknik yang kami gunakan untuk membangun aplikasi, pengguna dapat melakukan hampir apa pun di web
mereka dapat melakukannya di aplikasi asli.

Di waktu yang bersamaan, sebagian besar komputasi kami telah dipindahkan dari mesin desktop yang kuat
dengan koneksi yang cepat dan andal untuk perangkat seluler
berkualitas rendah dengan koneksi yang cenderung lambat, tidak andal, atau keduanya. Ini
terutama kerap terjadi di belahan dunia dengan miliaran datangnya pengguna
online.

Sayangnya, pola yang dirancang untuk membangun dan menerapkan aplikasi web
yang kaya fitur dan kuat di era desktop umumnya menghasilkan aplikasi yang jauh
lebih lama untuk dimuat di perangkat seluler – sangat lama sehingga banyak pengguna yang menyerah.

Ini memberikan peluang untuk menciptakan pola baru yang memanfaatkan
fitur platform web untuk secara terperinci memberikan pengalaman web seluler yang lebih cepat.
PRPL adalah pola tersebut.

## Pola PRPL

PRPL adalah pola untuk menyusun dan menyajikan Progressive Web App (PWA), dengan
menekankan pada kinerja penyampaian dan peluncuran aplikasi. PRPL singkatan dari:

*  **Push** sumber daya terpenting untuk rute URL awal.
*  **Render** rute awal.
*  **Melakukan precache** rute yang tersisa.
*  **Lazy-load** dan membuat rute yang tersisa sesuai permintaan.

Di samping menargetkan tujuan dan standar yang mendasar dari PWA, PRPL berusaha
untuk mengoptimalkan:

* Waktu interaktif minimum
    * Terutama pada penggunaan pertama (terlepas dari titik masuk)
    * Terutama pada perangkat seluler di dunia nyata
* Efisiensi caching maksimal, terutama sepanjang waktu saat pembaruan dirilis
* Kemudahan development dan penerapan

PRPL terinspirasi oleh serangkaian fitur platform web modern, tetapi kemungkinan
dapat menerapkan pola tersebut tanpa menekan setiap huruf pada akronim tersebut atau menggunakan setiap
fitur.

Bahkan, PRPL adalah tentang pola pikir dan visi jangka panjang untuk meningkatkan
kinerja web seluler dibandingkan tentang teknologi atau
teknik tertentu. Ide di balik PRPL sudah lama ada, tetapi pendekatan dibingkai dan
dinamai oleh tim Polymer dan diluncurkan di [Google I/O
2016](https://www.youtube.com/watch?v=J4i0xJnQUzU).

Demo e-niaga [Shop](https://shop.polymer-project.org) Polymer adalah
contoh kelas atas dari aplikasi yang menggunakan PRPL untuk secara terperinci menyajikan sumber daya.
Ini mencapai interaktivitas untuk setiap rute dengan sangat cepat pada perangkat seluler
dunia nyata:

![Demo Polymer Shop interaktif dalam 1,75 detik](images/app-build-prpl-shop.png)

Untuk sebagian besar proyek dunia nyata, jujur saja ini terlalu cepat untuk mewujudkan visi PRPL
dalam bentuknya yang paling murni dan lengkap – tetapi tentu saja tidak terlalu cepat untuk menerapkan
pola pikir, atau untuk mulai mengejar visi dari berbagai sudut pandang. Ada banyak
langkah praktis yang dapat dilakukan oleh developer, developer alat (bantu), dan vendor browser
dalam mengejar PRPL saat ini.

## Struktur aplikasi

PRPL dapat berfungsi dengan baik jika Anda memiliki aplikasi satu halaman (SPA) dengan struktur
sebagai berikut:

-   _entrypoint_ utama dari aplikasi yang disajikan dari setiap rute yang
    valid. File ini harus berukuran sangat kecil karena akan disajikan dari
    URL yang berbeda dan oleh karena itu dapat di-cache beberapa kali. Semua URL sumber daya
    pada entrypoint harus mutlak, karena mungkin disajikan dari
    URL yang bukan tingkat atas.

-   _shell_ atau shell aplikasi, yang termasuk logika aplikasi tingkat atas, router,
    dan sebagainya.

-   _fragmen_ dari aplikasi yang lambat dimuat. Fragmen dapat mewakili kode untuk
    pandangan tertentu, atau kode lain yang dapat dimuat secara lambat (misalnya,
    bagian dari aplikasi utama yang tidak diperlukan untuk paint pertama, seperti menu yang tidak
    ditampilkan hingga pengguna berinteraksi dengan aplikasi). Shell bertanggung jawab untuk
    mengimpor secara dinamis fragmen yang diperlukan.

Server dan service worker bekerja sama melakukan precache sumber daya untuk
rute yang tidak aktif.

Saat pengguna beralih rute, aplikasi lambat memuat sumber daya yang diperlukan yang
belum di-cache, dan menciptakan tampilan yang diperlukan. Kunjungan berulang ke rute
harus segera interaktif. Service Worker sangat membantu di sini.

Diagram di bawah menunjukkan komponen aplikasi sederhana yang mungkin terstruktur
menggunakan [Komponen Web](http://webcomponents.org/):

![diagram aplikasi yang memiliki dua tampilan, yang memiliki dependensi individual dan bersama
](images/app-build-components.png)

Note: meskipun HTML Imports adalah strategi bundling yang dipilih Polymer, Anda dapat
menggunakan pemisahan-kode dan pemotongan berbasis rute untuk mendapatkan persiapan serupa yang didapatkan dengan
bundler modul JavaScript modern

Dalam diagram ini, garis tebal mewakili _dependensi statis_: sumber daya
eksternal diidentifikasi dalam file menggunakan `<link>` dan `<script>` tag. Garis
putus-putus mewakili _dependensi sesuai permintaan_ atau _dinamis_: file dimuat
bila diperlukan oleh shell.

Proses pembangunan versi membangun grafik dari seluruh dependensi ini, dan server
menggunakan informasi ini untuk melayani file secara efisien. Proses ini juga membangun seperangkat
bundel yang divulkanisasi, untuk browser yang tidak mendukung HTTP/2.

### Entrypoint aplikasi

Entrypoint harus mengimpor dan membuat instance shell, serta secara bersyarat
memuat setiap polyfill apa pun.

Pertimbangan utama untuk entrypoint:

-   Memiliki dependensi statis minimal, dengan kata lain, tidak banyak melebihi shell aplikasi itu sendiri.
-   Memuat polyfill yang diperlukan secara bersyarat.
-   Menggunakan jalur absolut untuk semua dependensi.

### Shell aplikasi

Shell bertanggung jawab atas perutean dan biasanya mencakup UI navigasi utama
untuk aplikasi.

Aplikasi harus lambat memuat fragmen begitu diperlukan. Misalnya, saat pengguna
mengubah menjadi rute baru, aplikasi ini akan mengimpor fragmen yang terkait dengan
rute tersebut. Proses ini dapat mengajukan permintaan baru ke server, atau cukup memuat
sumber daya dari cache.

Shell (termasuk dependensi statisnya) harus berisi semua yang diperlukan
untuk paint pertama.

## Membangun keluaran

Meskipun bukan persyaratan yang sulit untuk menggunakan PRPL, proses pembangunan Anda dapat
menghasilkan dua pembangunan versi:

-   Versi yang tidak dibundel didesain untuk kombinasi server/browser yang mendukung
    HTTP/2 untuk mengirim sumber daya yang diperlukan browser untuk paint pertama yang cepat 
    sambil mengoptimalkan caching. Pengiriman sumber daya ini dapat dipicu
    secara efisien menggunakan [`<link rel="preload">`][Resource hints] atau [HTTP/2 Push].

-   Versi yang bundel didesain untuk meminimalkan jumlah perjalanan pulang pergi yang diperlukan untuk
    menjalankan aplikasi pada kombinasi server/browser yang tidak mendukung
    server push.

Logika server Anda harus mengirim versi yang tepat untuk tiap browser.

### Versi yang dibundel

Untuk browser yang tidak menangani HTTP/2, proses pembangunan versi dapat menghasilkan serangkaian
bundel yang berbeda: satu bundel untuk shell, dan satu bundel untuk tiap
fragmen. Diagram di bawah ini menunjukkan bagaimana aplikasi yang sederhana dibundel, lagi-lagi menggunakan
Komponen Web:

![diagram aplikasi yang sama dengan sebelumnya, dengan adanya tiga dependensi
yang dibundel](images/app-build-bundles.png)

Setiap dependensi yang dibagikan dengan dua atau lebih fragmen dibundel dengan shell dan
dependensi statisnya.

Tiap fragmen dan dependensi statis _yang tidak dibagikan_ dibundel menjadi satu
bundel. Server harus mengembalikan versi fragmen yang tepat
(dibundel atau tidak dibundel), tergantung pada browser. Ini berarti kode shell
bisa memuat `detail-view.html` dengan lambat _tanpa mengetahui apakah dibundle
atau tidak dibundel_. Bertumpu pada server dan browser untuk memuat dependensi dengan
cara yang paling efisien.


## Latar belakang: Server push HTTP/2 dan HTTP/2

[HTTP/2] memungkinkan unduhan _multiplexed_ pada satu
koneksi tunggal, sehingga beberapa file kecil bisa diunduh dengan lebih efisien.

[Server push HTTP/2][HTTP/2 Push] memungkinkan server
untuk mengirimkan sumber daya secara preemptif ke browser.

Untuk contoh bagaimana server push HTTP/2 mempercepat unduhan, pertimbangkan cara
browser mengambil file HTML dengan stylesheet bertaut.

Di HTTP/1:

*   Browser meminta file HTML.
*   Server mengembalikan file HTML dan browser mulai mem-parsingnya.
*   Browser menjumpai tag `<link rel="stylesheet">` dan mulai permintaan
    baru untuk stylesheet.
*   Browser menerima stylesheet.

Dengan push HTTP/2:

*   Browser meminta file HTML.
*   Server mengembalikan file HTML, dan mendorong stylesheet pada
    waktu yang sama.
*   Browser mulai mem-parsing HTML. Pada saat browser menjumpai `<link
    rel="stylesheet">, stylesheet sudah berada di cache﻿.

Dalam kasus paling sederhana, server push HTTP/2 menghilangkan respons-permintaan
HTTP tunggal.

Dengan HTTP/1, developer membundel sumber daya untuk mengurangi jumlah permintaan
HTTP yang diperlukan untuk merender laman. Namun, bundling dapat mengurangi efisiensi
cache browser. Jika sumber daya untuk setiap laman digabungkan ke dalam satu
bundel tunggal, setiap laman mendapatkan bundelnya sendiri, dan browser tidak dapat mengidentifikasi sumber daya
bersama.

Kombinasi server push HTTP/2 dan HTTP/2 memberikan _manfaat_ bundling
(latensi yang dikurangi) tanpa bundling sebenarnya. Memisahkan sumber daya
berarti sumber daya tersebut dapat di-cache secara efisien dan dibagikan antar laman.

Push HTTP/2 harus digunakan dengan saksama, karena data dipaksa ke browser,
bahkan jika file sudah berada di cache lokal browser atau bandwidth sudah di
saturasi. Jika dilakukan dengan keliru, kinerja akan terpengaruh,
[`<link rel="preload">`][Resource hints] bisa menjadi alternatif yang baik untuk memperbolehkan
browser mengambil keputusan cerdas tentang penentuan prioritas permintaan ini.  

## Kesimpulan

Memuat kode untuk rute lebih terperinci dan memungkinkan browser untuk menjadwalkan
pekerjaan memiliki potensi lebih baik untuk benar-benar membantu menjangkau interaktivitas di
aplikasi kita segera. Kita memerlukan **arsitektur lebih baik yang mengaktifkan
interaktivitas dengan cepat** dan pola PRPL merupakan contoh menarik dalam cara
mencapai tujuan ini di perangkat seluler sungguhan.

Semua tentang headroom dan mencukupi diri Anda sendiri setelah Anda selesai memuat abstraksi
Anda. Jika pengetukan pada tautan tertunda beberapa detik dari skrip yang mencegah kejadian
masukan dari pengiriman, itu merupakan indikasi kuat ada pekerjaan yang harus
diselesaikan dalam hal kinerja. Ini adalah masalah umum dengan aplikasi yang dibangun menggunakan
 pustaka JavaScript yang lebih besar dewasa ini, dengan UI yang dirender tampak
berfungsi namun ternyata tidak.

PRPL dapat membantu mengirim kode fungsi minimal yang dibutuhkan untuk membuat rute pengguna
Anda mendapat pada interaktif, dengan mengatasi tantangan ini.

[HTTP/2]: /web/fundamentals/performance/http2/
[Resource hints]: /web/updates/2016/03/link-rel-preload
[HTTP/2 Push]: /web/fundamentals/performance/http2/#server-push


{# wf_devsite_translation #}
