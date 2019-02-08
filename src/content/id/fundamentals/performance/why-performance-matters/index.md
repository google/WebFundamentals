project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Berkat perkembangan cepat teknologi perangkat seluler dan jaringan, semakin banyak orang yang menggunakan web daripada sebelumnya. Seiring meningkatnya basis pengguna ini, kinerja kini jauh lebih penting daripada sebelumnya. Dalam artikel ini, cari tahu mengapa kinerja itu penting, dan pelajari apa yang dapat Anda lakukan untuk membuat web lebih cepat bagi semua orang.

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2018-03-08 #}
{# wf_blink_components: N/A #}

# Mengapa Kinerja itu Penting {: .page-title }

{% include "web/_shared/contributors/jeremywagner.html" %}

Dalam upaya bersama kita untuk mendorong web agar web melakukan lebih banyak hal, kita
mengalami masalah umum: kinerja. Situs memiliki lebih banyak fitur
daripada sebelumnya. Begitu banyak, bahwa banyak situs sekarang berusaha mencapai kinerja
tingkat tinggi di berbagai kondisi jaringan dan perangkat.

Masalah kinerja sangat beragam. Yang paling ringan, masalahnya berupa pelambatan kecil yang agak
mengganggu pengguna. Yang terburuk, masalahnya berupa situs yang benar-benar tidak bisa diakses,
tidak ada respons sama sekali saat pengguna menginput sesuatu, atau keduanya.

## Kinerja adalah tentang pengguna yang tetap aktif di situs tersebut

Kita ingin pengguna berinteraksi secara penuh makna dengan apa yang kita buat. Jika sebuah
blog, kita berharap orang membaca postingannya. Jika sebuah toko online, kita berharap orang-orang
membeli barang dagangan. Jika media sosial, kita ingin mereka
saling berinteraksi.

Kinerja memainkan peran penting dalam keberhasilan perusahaan online. Berikut adalah beberapa
studi kasus yang menunjukkan bagaimana situs berkinerja tinggi akan mampu mempertahankan interaksi penggunanya secara lebih baik daripada yang
berkinerja rendah:

- [Pinterest meningkatkan traffic mesin pencarian dan pendaftaran baru sebesar 15%][pinterest] saat
  mereka mengurangi waktu tunggu yang dirasakan sebesar 40%.
- [COOK meningkatkan konversi sebesar 7%, menurunkan bounce rate sebesar 7%, dan meningkatkan
 halaman per sesi sebesar 10%] [COOK] ketika mereka mengurangi waktu muat halaman rata-rata sebesar 850
 milidetik.

[pinterest]: https://medium.com/@Pinterest_Engineering/driving-user-growth-with-performance-improvements-cfc50dafadd7
[COOK]: https://www.nccgroup.trust/uk/about-us/resources/cook-real-user-monitoring-case-study/?style=Website+Performance&resources=Case+Studies

Berikut adalah beberapa studi kasus ketika kinerja rendah berdampak negatif terhadap
sasaran bisnis:

- [BBC mendapati bahwa mereka kehilangan tambahan 10% pengguna][BBC] untuk setiap detik lebih lama
  pemuatan situs mereka.
- [DoubleClick oleh Google mendapati 53% kunjungan melalui ponsel dibatalkan][DoubleClick] jika halaman
  memuat lebih dari 3 detik.

[BBC]: https://www.creativebloq.com/features/how-the-bbc-builds-websites-that-scale
[DoubleClick]: https://www.doubleclickbygoogle.com/articles/mobile-speed-matters/

Dalam penelitian DoubleClick oleh Google yang dikutip di atas,
ditemukan bahwa waktu muat situs dalam 5 detik memiliki sesi 70% lebih lama, 35% bounce
rate lebih rendah, dan 25% iklan dilihat lebih tinggi daripada situs yang mengambil hampir
empat kali lipat lebih lama dalam 19 detik. Untuk mendapatkan gambaran kasar bagaimana kinerja situs Anda
jika dibandingkan dengan pesaing Anda, [cobalah fitur
Speed Scorecard](https://www.thinkwithgoogle.com/feature/mobile/).

<figure>
  <img srcset="images/speed-scorecard-2x.png 2x, images/speed-scorecard-1x.png 1x"
src="images/speed-scorecard-1x.png" alt="Tangkapan layar fitur
Speed Scorecard, membandingkan kinerja di empat outlet berita populer.">
  <figcaption><b>Gambar 1</b>. Speed Scorecard membandingkan kinerja empat
situs yang sedang bersaing menggunakan data Chrome UX Report dari pengguna jaringan 4G di Amerika
Serikat.</figcaption>
</figure>

## Kinerja adalah tentang peningkatan konversi

Mempertahankan pengguna adalah sesuatu yang krusial untuk peningkatan konversi. Situs yang lambat
memiliki dampak negatif terhadap pendapatan, begitu pula sebaliknya. Berikut beberapa
contoh bagaimana kinerja telah memainkan peran dalam membuat bisnis lebih menguntungkan (atau
kurang) menguntungkan:

- Untuk Mobify, [setiap 100 milidetik peningkatan kecepatan pemuatan halaman beranda memberikan **1,11%
peningkatan** konversi berbasis sesi, menghasilkan peningkatan pendapatan tahunan rata-rata
**hampir
$380.000**](http://resources.mobify.com/2016-Q2-mobile-insights-benchmark-report.html).
Selain itu, peningkatan 100 milidetik kecepatan pemuatan halaman proses memberikan **1,55%**
peningkatan dalam konversi berbasis sesi, yang pada gilirannya menghasilkan peningkatan pendapatan tahunan
rata-rata **hampir $530.000**.
- DoubleClick menemukan bahwa [penerbit konten yang situsnya dimuat dalam lima detik memperoleh hingga
**dua kali pendapatan iklan lebih banyak** daripada situs yang dimuat dalam
19 detik](https://www.doubleclickbygoogle.com/articles/mobile-speed-matters/).
- [Saat AutoAnything menurunkan waktu muat halaman hingga separuh, mereka mendapatkan **peningkatan 12-13%
penjualan
**](https://www.digitalcommerce360.com/2010/08/19/web-accelerator-revs-conversion-and-sales-autoanything/).

Jika Anda menjalankan bisnis di web, kinerja menjadi faktor yang sangat krusial. Situs bisa memberi Anda kinerja yang baik hanya jika pengalaman
pengguna situs Anda cepat dan responsif terhadap input pengguna. Untuk
melihat bagaimana potensi pengaruh kinerja terhadap pendapatan, cobalah fitur [Impact
Calculator](https://www.thinkwithgoogle.com/feature/mobile/).

<figure>
  <img srcset="images/impact-calculator-2x.png 2x, images/impact-calculator-1x.png
1x" src="images/impact-calculator-1x.png" alt="Screenshot Impact
Calculator, memperkirakan berapa banyak pendapatan yang bisa didapat oleh situs jika
peningkatan kinerja dicapai.">
  <figcaption><b>Gambar 2</b>. Impact Calculator memperkirakan berapa
banyak pendapatan yang akan Anda dapatkan dengan meningkatkan kinerja situs.</figcaption>
</figure>

## Kinerja adalah tentang pengalaman pengguna

Saat membuka URL, Anda melakukannya dari sejumlah titik
awal potensial. Bergantung pada sejumlah
kondisi, seperti kualitas koneksi dan perangkat yang Anda gunakan, pengalaman
Anda mungkin sangat berbeda dari pengguna lain.

<figure>
  <img src="images/speed-comparison.png" alt="Perbandingan dua rol film
pemuatan halaman. Yang pertama menampilkan pemuatan halaman pada koneksi yang lambat, sedangkan
yang kedua menampilkan pemuatan halaman yang sama pada koneksi cepat.">
  <figcaption><b>Gambar 3</b>. Perbandingan pemuatan halaman pada koneksi yang sangat lambat
(atas) versus koneksi yang lebih cepat (bawah).</figcaption>
</figure>

Saat situs mulai memuat, ada periode waktu ketika pengguna menunggu konten
ditampilkan. Hingga konten terbuka, tidak ada pengalaman pengguna untuk dibicarakan. Kurangnya
pengalaman ini cepat berlalu pada koneksi cepat. Sementara pada koneksi yang lambat,
pengguna harus menunggu. Pengguna mungkin mengalami lebih banyak masalah
ketika resource halaman terbuka dengan sangat lambat.

Kinerja adalah aspek dasar dari
pengguna yang baik. Ketika situs mengirimkan banyak kode, browser harus menggunakan banyak megabyte
paket data pengguna untuk mendownload kode. Perangkat seluler memiliki
daya CPU dan memori yang terbatas. Perangkat seluler sering kewalahan dengan apa yang kita anggap
sedikit kode yang tidak dioptimalkan. Kinerja yang buruk ini menyebabkan
tidak adanya respons. Setelah memahami apa yang kita ketahui tentang perilaku manusia, pengguna hanya akan
menoleransi aplikasi berperforma rendah untuk waktu yang lama sebelum meninggalkannya.
Jika Anda ingin tahu lebih banyak tentang
cara mengukur kinerja situs dan menemukan peluang perbaikan,
cobalah [_Fitur Cara Memikirkan Kecepatan_](/web/fundamentals/performance/speed-tools/).

<figure>
  <img srcset="images/lighthouse-2x.png 2x, images/lighthouse-1x.png 1x"
src="images/lighthouse-1x.png" alt="Ringkasan kinerja halaman sebagaimana terlihat di
Lighthouse.">
  <figcaption><b>Gambar 4</b>. Ringkasan kinerja halaman sebagaimana terlihat di <a
href="/web/tools/lighthouse/">Lighthouse</a>.</figcaption>
</figure>

## Kinerja tentang orang

Situs dan aplikasi yang berkinerja buruk juga dapat memboroskan biaya nyata bagi
orang-orang yang menggunakannya.

[Seiring terus berkembangnya pengguna internet
di seluruh dunia](http://gs.statcounter.com/platform-market-share/desktop-mobile-tablet),
perlu untuk diperhatikan bahwa sebagian besar pengguna ini mengakses melalui
jaringan LTE, 4G, 3G, bahkan 2G. Seperti yang telah disoroti oleh Ben Schwarz dari Calibre
dalam [studinya tentang
kinerja](https://building.calibreapp.com/beyond-the-bubble-real-world-performance-9c991dcd5342),
biaya paket data prabayar mengalami penurunan, yang pada gilirannya akan membuat akses ke
internet semakin terjangkau. Perangkat
seluler dan akses internet bukan lagi barang mewah.
Keduanya sudah menjadi alat umum yang diperlukan untuk bernavigasi dan berfungsi dalam dunia yang semakin
terhubung.

[Ukuran halaman total semakin meningkat, setidaknya sejak
2011](http://beta.httparchive.org/reports/state-of-the-web#bytesTotal), dan
trennya terus berlanjut. Karena halaman secara umum mengirim lebih banyak data,
pengguna harus lebih sering mengisi paket data mereka, yang membutuhkan biaya.

Selain menghemat uang pengguna Anda, pengalaman pengguna yang cepat dan ringan
juga terbukti krusial bagi pengguna yang mengalami krisis. Fasilitas-fasilitas publik seperti
rumah sakit, klinik, dan pusat krisis memiliki resource online yang memberikan pengguna
informasi penting dan spesifik yang mereka butuhkan selama krisis. [Walaupun desain sangat
penting dalam menyajikan informasi penting secara efisien di saat-saat yang penuh
tekanan](https://aneventapart.com/news/post/eric-meyer-designing-for-crisis),
pentingnya menyampaikan informasi ini dengan cepat tidak dapat diabaikan.
Ini adalah bagian dari tugas kita.

## Ke mana berikutnya

Meskipun daftar di bawah ini mungkin tampak menakutkan, pahami
bahwa Anda tidak perlu melakukan semua hal untuk meningkatkan kinerja situs
Anda. Itu hanya titik awal, jadi jangan merasa terlalu terbebani!
_Apa pun_yang dapat Anda lakukan untuk meningkatkan kinerja akan sangat membantu pengguna Anda.

### Pikirkan resource yang Anda kirimkan

Metode yang efektif untuk membangun aplikasi berkinerja tinggi adalah [mengaudit resource
apa yang Anda kirim kepada
pengguna](/web/fundamentals/performance/optimizing-content-efficiency/eliminate-downloads).
Meskipun [panel Jaringan di Chrome DevTools](/web/tools/chrome-devtools/network-performance/)
melakukan pekerjaan yang luar biasa dalam meringkas semua resource yang digunakan pada halaman tertentu, dapat menjadi hal yang sulit untuk mengetahui
di mana harus memulai jika Anda belum mempertimbangkan kinerja sampai sekarang. Berikut beberapa
saran:

- Jika Anda menggunakan Bootstrap atau Fondasi untuk membangun UI, tanyakan pada diri sendiri apakah Anda
membutuhkannya. Abstraksi semacam itu akan menambah banyak CSS yang harus diunduh oleh browser, mem-parse,
dan menerapkannya ke halaman, semuanya sebelum CSS spesifik situs Anda masuk ke
gambar.
[Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout)
dan [Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout) 
hebat dalam membuat layout sederhana maupun kompleks dengan kode yang relatif sedikit.
[Karena CSS adalah resource yang menghalangi
render](/web/fundamentals/performance/critical-rendering-path/render-blocking-css),
maka overhead framework CSS bisa memperlambat rendering secara signifikan. Jika memungkinkan, Anda bisa
mempercepat rendering dengan menghapus overhead yang tidak perlu.
- Library JavaScript itu nyaman, tetapi tidak selalu diperlukan. Kita ambil jQuery
misalnya: Pemilihan elemen telah sangat disederhanakan berkat penggunaan metode seperti
[`querySelector`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)
dan
[`querySelectorAll`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll).
Event binding mudah dilakukan dengan
[`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).
[`classList`](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList),
[`setAttribute`](https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute),
dan
[`getAttribute`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute)
menawarkan cara mudah bekerja dengan kelas atau atribut elemen. Jika Anda harus
menggunakan library, cari alternatif yang lebih efektif. Misalnya,
[Zepto](http://zeptojs.com/) adalah alternatif jQuery yang lebih kecil, sedangkan
[Preact](https://preactjs.com/) adalah alternatif yang jauh lebih kecil untuk.
- Tidak semua situs web memerlukan aplikasi halaman tunggal atau single page application (SPA), karena seringkali menggunakan
JavaScript secara ekstensif. [JavaScript adalah resource termahal yang kita sajikan
pada byte web untuk
byte](https://medium.com/dev-channel/the-cost-of-javascript-84009f51e99e), karena
ia tidak hanya harus didownload, tetapi juga harus di-parse, dikompilasi, dan dieksekusi. Misalnya
, situs berita dan blog dengan arsitektur front end yang dioptimalkan dapat berkinerja dengan sangat baik
sebagai pengalaman multihalaman tradisional. Secara khusus [caching
HTTP](/web/fundamentals/performance/optimizing-content-efficiency/http-caching)
dikonfigurasi dengan baik, dan opsional, jika [service
worker](/web/fundamentals/primers/service-workers/) digunakan.

### Pikirkan bagaimana Anda mengirimkan resource

Pengiriman yang efisien sangat vital untuk membangun pengguna yang cepat.

- [Migrasikan ke HTTP/2](/web/fundamentals/performance/http2/). HTTP/2 memecahkan banyak
masalah kinerja yang melekat di dalam HTTP/1.1, seperti batas permintaan serentak dan
kurangnya kompresi header.
- [Download resource lebih ceapt menggunakan petunjuk
resource](/web/fundamentals/performance/resource-prioritization). `rel=preload` adalah
salah satu petunjuk resource yang memungkinkan pengambilan awal data
resource penting sebelum browser akan menemukannya. [Ini bisa memiliki dampak poisitif
nyata](https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf#0106)
terhadap rendering halaman dan menurunkan [Waktu untuk
Interaktif](/web/tools/lighthouse/audits/time-to-interactive) saat digunakan
secara bijaksana. [`rel=preconnect` adalah petunjuk resource lainnya yang bisa menutupi
latensi pembukaan koneksi baru untuk sumber daya yang dihosting pada domain
pihak ketiga](https://www.igvita.com/2015/08/17/eliminating-roundtrips-with-preconnect/).
- Rata-rata situs-situs modern membawa [banyak sekali
JavaScript](http://httparchive.org/trends.php#bytesJS&reqJS) [dan
CSS](http://httparchive.org/trends.php#bytesCSS&reqCSS). Sudah
umum untuk menyatukan gaya dan skrip ke dalam paket besar pada lingkungan HTTP/1.
Ini dilakukan karena banyak permintaan sangat mengganggu kinerja.
Tidak masalah lagi sekarang ketika HTTP/2 berada di skenario, karena beberapa permintaan serentak
lebih murah. [Pertimbangkan menggunakan pemecahan kode di
webpack](https://webpack.js.org/guides/code-splitting/) untuk membatasi jumlah
skrip yang didownload ke jumlah yang diperlukan oleh halaman atau tampilan saat ini saja. Pisahkan
CSS Anda menjadi file-file templat atau file-file spesifik komponen yang lebih kecil, dan hanya sertakan
resource yang dapat digunakan.

### Pikirkan seberapa besar data yang Anda kirimkan

Berikut adalah beberapa saran untuk membatasi seberapa banyak data yang Anda kirimkan:

- [Kurangi aset
teks](/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer#minification_preprocessing_context-specific_optimizations).
Minifikasi adalah penghapusan spasi kosong, komentar, dan konten
lain yang tidak diperlukan dalam resource berbasis teks. Minifikasi ini secara signifikan mengurangi jumlah data yang
Anda kirimkan ke pengguna tanpa memengaruhi fungsionalitas. [Gunakan uglification di
JavaScript](https://www.npmjs.com/package/uglifyjs) untuk mendapatkan lebih banyak penghematan
melalui penyingkatan variabel dan nama metode. Karean SVG adalah format berbasis
gambar, [maka bisa dioptimalkan dengan SVGO](https://github.com/svg/svgo).
- [Konfigurasi server Anda untuk mengompresi
resource](/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer).
Kompresi bisa secara drastis menurunkan jumlah data yang Anda kirimkan kepada pengguna,
khususnya aset teks. GZIP adalah opsi yang populer, tetapi [kompresi Brotli bisa tetap
digunakan](https://www.smashingmagazine.com/2016/10/next-generation-server-compression-with-brotli/).
Namun demikian, harus dipahami bahwa kompresi bukanlah obat mujarab untuk segala masalah kinerja:
Beberapa format file yang dikompresi secara implisit (mis., JPEG, PNG, GIF, WOFF,
dan sebagainya) tidak merespons kompresi karena sudah dikompresi.
- [Optimalkan
gambar](/web/fundamentals/performance/optimizing-content-efficiency/automating-image-optimization/)
untuk memastikan situs Anda mengirimkan data gambar sesedikit mungkin. [Karena gambar
adalah bagian besar dari payload per halaman pada
web](http://httparchive.org/trends.php#bytesImg&reqImg), pengoptimalan gambar
merepresentasikan peluang besar dan unik untuk meningkatkan kinerja.
- Jika ada waktu, pertimbangkan untuk menyajikan format gambar alternatif.
[WebP](/speed/webp/) memiliki cukup
[dukungan browser yang luas](https://caniuse.com/#feat=webp), dan menggunakan lebih sedikit data daripada JPEG dan PNG
namun tetap memiliki kualitas visual yang tinggi. [JPEG XR adalah format
alternatif lain](https://jpeg.org/jpegxr/index.html) yang didukung dalam IE dan Edge
yang menawarkan penghematan serupa.
- [Mengirimkan gambar
secara responsif](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images).
Begitu beragamnya perangkat dan layar yang mereka gunakan
menghadirkan peluang yang luar biasa untuk meningkatkan kinerja dengan mengirim gambar yang paling cocok
untuk layar yang menampilkan gambar itu. Dalam kasus penggunaan paling sederhana, Anda bisa menambahkan [Atribut`srcset`
](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-srcset)
ke elemen `<img>` untuk menentukan array gambar browser untuk Anda pilih.
Pada sisi yang lebih rumit, Anda dapat menggunakan `<picture>` untuk membantu browser
memilih format yang paling optimal (mis., WebP dengan JPEG atau PNG), atau menyajikan
perlakuan gambar yang sama sekali berbeda untuk ukuran layar yang berbeda.
- [Gunakan video alih-alih GIF
animasi](/web/fundamentals/performance/optimizing-content-efficiency/replace-animated-gifs-with-video/).
GIF animasi banyak digunakan. Video dengan kualitas yang serupa berukuran jauh lebih kecil,
80% atau lebih kecil. Jika situs Anda banyak menggunakan GIF animasi, ini mungkin
menjadi hal yang paling berdampak yang bisa Anda lakukan untuk meningkatkan kinerja pemuatan.
- [Petunjuk klien](http://httpwg.org/http-extensions/client-hints.html) bisa
menyelaraskan pengiriman resource berdasarkan kondisi jaringan dan karakteristik
perangkat saat ini. Header `DPR`, `Width`, dan `Viewport-Width` bisa membantu Anda
[mengirimkan gambar terbaik untuk perangkat yang menggunakan kode sisi server dan mengirimkan lebih sedikit
markup](/web/updates/2015/09/automating-resource-selection-with-client-hints).
Header `Save-Data` bisa membantu Anda [memberikan pengalaman aplikasi yang lebih ringan bagi
para pengguna yang secara khusus meminta Anda melakukannya](/web/updates/2016/02/save-data).
- [`NetworkInformation`
API](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation)
menampilkan informasi tentang koneksi jaringan pengguna. Informasi ini bisa digunakan
untuk mengubah pengalaman aplikasi bagi para pengguna di jaringan yang lebih lambat.

Untuk panduan yang lebih holistik tentang peningkatan kinerja, lihat artikel kami
pada [model kinerja RAIL](/web/fundamentals/performance/rail), yang berfokus
pada peningkatan waktu muat dan respons aplikasi. [Panduan pola PRPL kami
juga merupakan resource
yang unggul](/web/fundamentals/performance/prpl-pattern/) untuk meningkatkan kinerja
aplikasi halaman tunggal modern.

Jika Anda ingin untuk mempelajari lebih lanjut tentang kinerja dan cara
membuat situs Anda lebih cepat, dalami dokumentasi kinerja kami untuk panduan tentang berbagai
topik. Kami terus menambahkan panduan baru dan memperbarui yang sudah ada, jadi
selalu lihat update terbaru dari kami!

Terima kasih untuk [Addy Osmani](/web/resources/contributors/addyosmani), [Jeff
Posnick](/web/resources/contributors/jeffposnick), [Matt
Gaunt](/web/resources/contributors/mattgaunt), [Philip
Walton](/web/resources/contributors/philipwalton), [Vinamrata
Singal](/web/resources/contributors/vinamratasingal), [Daniel
An](https://www.thinkwithgoogle.com/marketing-resources/data-measurement/mobile-page-speed-new-industry-benchmarks/),
dan [Pete LePage](/web/resources/contributors/petelepage) untuk umpan balik
luas dalam menyempurnakan dan meluncurkan resource ini!_

## Masukan {: #feedback }

{% include "web/_shared/helpful.html" %}
