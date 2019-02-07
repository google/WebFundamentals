project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: HTTP/2 (atau h2) adalah protokol biner yang membawa push, stream multiplexing, dan kontrol frame ke web.

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2016-09-29 #}
{# wf_blink_components: Blink>Network,Internals>Network>HTTP2 #}

# Pengantar HTTP/2 {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}
{% include "web/_shared/contributors/surma.html" %}

Note: Konten berikut ini merupakan kutipan dari [High Performance Browser
Networking](http://shop.oreilly.com/product/0636920028048.do) (O'Reilly, Ilya
Grigorik). Untuk versi lengkap dan konten terkait, lihat
[hpbn.co](https://hpbn.co/){: .external }.

HTTP/2 akan membuat aplikasi Anda lebih cepat, lebih sederhana, dan lebih tangguh — kombinasi
yang langka — dengan mengizinkan kita mengurungkan banyak solusi HTTP/1.1 yang sebelumnya
dilakukan di dalam aplikasi kita dan mengatasi kekhawatiran ini di dalam lapisan
transpor itu sendiri. Bahkan lebih baik lagi, aplikasi ini membuka sejumlah
peluang baru untuk mengoptimalkan aplikasi kita dan meningkatkan performa!

Tujuan utama untuk HTTP/2 adalah mengurangi latensi dengan mengaktifkan permintaan lengkap dan
multiplexing respons, meminimalkan overhead protokol melalui kompresi efisien
kolom header HTTP, dan menambahkan dukungan untuk penentuan prioritas permintaan dan push server.
Untuk mengimplementasikan persyaratan tersebut, ada banyak
penyempurnaan protokol lainnya yang mendukung, seperti kontrol alur baru, penanganan error, dan mekanisme
upgrade, namun inilah fitur terpenting yang harus dipahami dan dimanfaatkan
setiap developer web di aplikasi.

HTTP/2 tidak mengubah semantik aplikasi HTTP dengan cara apa pun. Semua
konsep inti, seperti metode HTTP, kode status, URI, dan kolom header,
tetap berlaku. Namun, HTTP/2 memodifikasi cara data diformat (dibingkai) dan
dipindahkan antara klien dan server, yang keduanya mengelola seluruh
proses, dan menyembunyikan seluruh kompleksitas dari aplikasi kita di dalam
layer framing yang baru. Akibatnya, semua aplikasi yang sudah ada dapat dikirimkan tanpa
perubahan.

*Mengapa bukan HTTP/1.2?*

Untuk mencapai tujuan performa yang ditetapkan oleh HTTP Working Group, HTTP/2
memperkenalkan layer framing biner baru yang tidak kompatibel mundur dengan server dan klien
HTTP/1.x sebelumnya—sehingga versi protokol utama naik
ke HTTP/2.

Dengan demikian, kecuali Anda mengimplementasikan server web (atau klien kustom) dengan
menggunakan soket TCP mentah, maka Anda tidak akan melihat perbedaan apa pun: semua
framing level rendah yang baru dilakukan oleh klien dan server atas nama Anda. Satu-satunya
perbedaan yang terlihat adalah peningkatan performa dan ketersediaan kapabilitas
baru seperti penentuan prioritas permintaan, kontrol alur, dan push server.

## Sejarah singkat SPDY dan HTTP/2

SPDY adalah protokol eksperimental, yang dikembangkan di Google dan diumumkan pada
pertengahan 2009, yang tujuan utamanya adalah mencoba mengurangi latensi pemuatan halaman web
dengan mengatasi beberapa batasan performa HTTP/1.1. yang diketahui
Secara spesifik, tujuan proyek ditentukan sebagai berikut:

* Menargetkan pengurangan waktu memuat halaman sebesar 50% (PLT).
* Menghindari kebutuhan perubahan konten oleh pengarang situs.
* Meminimalkan kompleksitas penerapan dan menghindari perubahan infrastruktur jaringan.
* Mengembangkan protokol baru ini dengan berpartner bersama komunitas open-source.
* Mengumpulkan data performa nyata untuk mem(batalkan)validasi protokol eksperimental.

Note: Untuk mencapai peningkatan PLT sebesar 50%, SPDY bertujuan untuk membuat penggunaan
koneksi TCP yang mendasarinya menjadi lebih efisien dengan memperkenalkan layer framing biner baru untuk
memungkinkan multiplexing permintaan dan respons, penentuan prioritas, dan kompresi
header; lihat
[Latency as a Performance Bottleneck](https://hpbn.co/primer-on-web-performance/#latency-as-a-performance-bottleneck){: .external}.

Tidak lama setelah pengumuman awal, Mike Belshe dan Roberto Peon, keduanya
software engineer di Google, membagikan hasil awal, dokumentasi, dan
kode sumber untuk implementasi eksperimental protokol SPDY yang baru:

> Sejauh ini, kami hanya menguji SPDY di kondisi lab. Hasil awalnya
> sangat menggembirakan: saat kami mendownload 25 situs terpopuler pada simulasi
> koneksi jaringan home, kami melihat peningkatan signifikan dalam performa—halaman
> dimuat hingga 55% lebih cepat.
> [*(Blog Chromium)*](https://blog.chromium.org/2009/11/2x-faster-web.html)

Berikutnya pada 2012 protokol eksperimental baru didukung di Chrome,
Firefox, dan Opera, serta sejumlah situs yang berkembang dengan cepat, baik yang besar (misalnya,
Google, Twitter, Facebook) maupun yang kecil, yang menerapkan SPDY dalam
infrastrukturnya. Hasilnya, SPDY tetap menjadi standar de facto
melalui adopsi industri yang terus berkembang.

Mengobservasi tren ini, HTTP Working Group (HTTP-WG) memulai
upaya baru untuk mengambil pelajaran dari SPDY, membangun dan menyempurnakannya, serta
menjalankan standar "HTTP/2" resmi. Bab baru telah disusun, panggilan terbuka
untuk proposal HTTP/2 dilakukan, dan setelah begitu banyak diskusi dalam kelompok
kerja, spesifikasi SPDY diadopsi sebagai titik awal untuk protokol
HTTP/2 yang baru.

Selama beberapa tahun berikutnya, SPDY dan HTTP/2 terus berkembang bersama secara paralel,
dengan SPDY yang bertindak sebagai cabang eksperimental yang digunakan untuk menguji fitur baru
dan proposal untuk standar HTTP/2. Yang tampaknya bagus secara teori bisa jadi tidak berjalan dalam
praktiknya, begitu pun sebaliknya, dan SPDY menawarkan cara untuk menguji dan mengevaluasi tiap
proposal sebelum disertakan dalam standar HTTP/2. Pada akhirnya, proses ini
berlangsung selama tiga tahun dan menghasilkan puluhan draf menengah:

* Maret 2012: Panggilan untuk proposal HTTP/2
* November 2012: Draf pertama HTTP/2 (berdasarkan SPDY)
* Agustus 2014: Draf-17 HTTP/2 dan draf-12 HPACK dipublikasikan
* Agustus 2014: Panggilan terakhir Kelompok Kerja untuk HTTP/2
* Februari 2015: IESG menyetujui draf HTTP/2 dan HPACK
* Mei 2015: RFC 7540 (HTTP/2) dan RFC 7541 (HPACK) dipublikasikan

Di awal 2015, IESG meninjau dan menyetujui standar HTTP/2 yang baru untuk
dipublikasikan. Tidak lama setelah itu, tim Google Chrome mengumumkan jadwal untuk
menghentikan penggunaan ekstensi SPDY dan NPN untuk TLS:

> Perubahan utama HTTP/2 dari HTTP/1.1 berfokus pada performa yang ditingkatkan. Beberapa fitur
> penting seperti multiplexing, kompresi header, penentuan prioritas dan negosiasi
> negosiasi berkembang dari pekerjaan dilakukan dalam pembukaan lebih awal, namun protokol
> non-standar diberi nama SPDY. Chrome telah mendukung SPDY sejak Chrome 6, namun karena sebagian besar
manfaatnya ada di HTTP/2, kini saatnya untuk meninggalkannya. Kita berencana
> menghapus dukungan untuk SPDY di awal 2016, dan juga menghapus dukungan untuk ekstensi
> TLS yang diberi nama NPN dalam mendukung ALPN di Chrome pada waktu yang sama. Developer
> server sangat dianjurkan untuk berpindah ke HTTP/2 dan ALPN.
>
> Kami sangat senang karena telah berkontribusi atas proses standar terbuka yang menuju ke
> HTTP/2, dan berharap untuk melihat adopsi yang luas mengingat keterlibatan industri secara luas pada
> standardisasi dan implementasi. [*(Chromium
> Blog)*](https://blog.chromium.org/2015/02/hello-http2-goodbye-spdy.html)

Evolusi bersama SPDY dan HTTP/2 memungkinkan server, browser, dan developer situs
untuk mendapatkan pengalaman dunia nyata dengan protokol baru karena sedang dikembangkan.
Sebagai hasilnya, standar HTTP/2 adalah salah satu
standar terbaik dan paling banyak diuji pertama kali. Saat HTTP/2 disetujui oleh IESG,
ada puluhan implementasi klien dan server yang
diuji secara menyeluruh dan siap untuk diproduksi. Bahkan, hanya beberapa minggu setelah protokol akhir disetujui, banyak
pengguna yang telah menikmati manfaatnya karena beberapa browser populer (dan banyak
situs) menerapkan dukungan HTTP/2 penuh.

## Tujuan desain dan teknis

Versi protokol HTTP sebelumnya dengan sengaja didesain untuk kemudahan
implementasi: HTTP/0.9 adalah protokol one-line untuk melakukan bootstrap World Wide
Web; HTTP/1.0 mendokumentasikan ekstensi populer ke HTTP/0.9 dalam standar
informasional; HTTP/1.1 memperkenalkan standar IETF resmi; lihat
[Brief History of HTTP](https://hpbn.co/brief-history-of-http/){: .external}.
Dengan demikian, HTTP/0.9-1.x memberikan hasil sesuai dengan yang direncanakan: HTTP adalah salah satu
protokol aplikasi yang paling banyak diadopsi di Internet.

Sayangnya, kesederhanaan implementasi juga menurunkan performa
aplikasi: Klien HTTP/1.x harus menggunakan beberapa koneksi untuk mencapai
keserentakan dan mengurangi latensi; HTTP/1.x tidak mengompresi header
permintaan dan respons, yang menyebabkan traffic jaringan yang tidak perlu; HTTP/1.x tidak memungkinkan penentuan prioritas
resource yang efektif, sehingga penggunaan koneksi TCP yang mendasarinya menjadi buruk;
dan sebagainya.

Semua batasan ini tidak fatal, namun karena aplikasi web terus berkembang
dalam cakupan, kompleksitas, dan kepentingannya di kehidupan kita sehari-hari, batasan ini mengakibatkan
beban yang semakin besar baik pada developer maupun pengguna web, yang merupakan celah
yang tepat untuk diatasi oleh HTTP/2:

> HTTP/2 memungkinkan penggunaan resource jaringan yang lebih efisien dan persepsi
> latensi yang lebih kecil dengan memperkenalkan kompresi kolom header dan memungkinkan
> beberapa pertukaran serentak pada koneksi yang sama… Secara spesifik, HTTP/2 memungkinkan
> interleaving pesan permintaan dan respons pada koneksi yang sama serta menggunakan
> pengodean yang efisien untuk kolom header HTTP. HTTP/2 juga memungkinkan penentuan prioritas
> permintaan, sehingga permintaan yang lebih penting dapat selesai lebih cepat, yang selanjutnya
> meningkatkan performa.
>
> Protokol hasilnya lebih cocok dengan jaringan, karena lebih sedikit koneksi
> TCP dapat digunakan jika dibandingkan dengan HTTP/1.x. Ini berarti lebih sedikit kompetisi
> dengan alur lain, dan koneksi berdurasi lebih lama, yang pada gilirannya menyebabkan
> pemanfaatan kapasitas jaringan yang tersedia dengan lebih baik. Terakhir, HTTP/2 juga memungkinkan pemrosesan
> pesan yang lebih efisien melalui penggunaan framing pesan biner.
> [*(Hypertext Transfer Protocol version 2, Draft
> 17)*](https://tools.ietf.org/html/draft-ietf-httpbis-http2-17)


Penting untuk diperhatikan bahwa HTTP/2 bersifat memperpanjang, bukan menggantikan standar
HTTP sebelumnya. Semantik aplikasi HTTP sama, dan tidak ada perubahan
yang dibuat untuk fungsi yang ditawarkan atau konsep inti seperti metode HTTP,
kode status, URI, dan kolom header. Semua perubahan ini secara eksplisit berada di luar cakupan
upaya HTTP/2. Dengan demikian, meski API level-tinggi tetap sama,
penting untuk dipahami cara perubahan level-rendah mengatasi keterbatasan
performa protokol sebelumnya. Mari kita lihat dengan singkat layer framing
biner dan fiturnya.

## Layer framing biner

Inti semua penyempurnaan kinerja HTTP/2 adalah layer
framing biner baru, yang menentukan cara pesan HTTP dibungkus dan ditransfer
antara klien dan server.

![Layer framing biner HTTP/2](images/binary_framing_layer01.svg)

"Layer" mengacu kepada pilihan desain untuk memperkenalkan mekanisme
encoding antara antarmuka soket dan API HTTP lebih tinggi yang terpapar pada
aplikasi kita: semantik HTTP, seperti kata kerja, metode, dan header, tidak
terpengaruh, namun cara dienkodenya saat dikirim berbeda.
Tidak seperti protokol HTTP/1.x dibatasi teks biasa baris baru, semua komunikasi
HTTP/2 dibagi menjadi pesan dan bingkai yang lebih kecil, masing-masing
dienkode dalam format biner.

Hasilnya, klien dan server harus menggunakan mekanisme encoding biner yang baru
untuk memahami satu sama lain: klien HTTP/1.x tidak akan memahami server
khusus HTTP/2, dan sebaliknya. Untungnya, aplikasi kami tetap tidak memerhatikan
semua perubahan ini, karena klien dan server menjalankan semua pekerjaan
framing yang diperlukan atas nama kami.

## Stream, pesan, dan bingkai

Pengenalan mekanisme framing biner baru mengubah cara data
dipertukarkan antara klien dan server. Untuk menggambarkan proses ini, mari kita
membiasakan diri dengan istilah HTTP/2:

* *Stream*: Alur dua arah byte dalam koneksi yang terbentuk,
  yang dapat membawa satu atau beberapa pesan.
* *Pesan*: Urutan bingkai lengkap yang dipetakan ke permintaan logika atau pesan respons.
* *Bingkai*: Unit komunikasi terkecil di HTTP/2, masing-masing berisi sebuah header bingkai, yang
  minimal mengidentifikasi stream bingkai.

Hubungan istilah-istilah ini dapat diringkas sebagai berikut:

* Semua komunikasi dilakukan melalui satu koneksi TCP yang dapat membawa sejumlah
  stream dua arah.
* Tiap stream memiliki ID unik dan informasi prioritas opsional yang digunakan untuk membawa
  pesan dua arah.
* Tiap pesan adalah pesan HTTP logis, seperti permintaan, atau respons, yang terdiri dari
  satu atau beberapa bingkai.
* Bingkai adalah unit komunikasi terkecil yang membawa jenis data spesifik—mis.,
 header HTTP, payload pesan, dan sebagainya. Bingkai dari stream berbeda dapat dilakukan interleave
 lalu dirakit ulang melalui ID stream yang disematkan di header tiap bingkai.

![Stream, pesan, dan bingkai HTTP/2](images/streams_messages_frames01.svg)

Singkatnya, HTTP/2 menguraikan komunikasi protokol HTTP menjadi pertukaran
bingkai yang dienkode-biner, yang kemudian dipetakan ke pesan yang masuk ke dalam
stream tertentu, semuanya di-multiplex dalam satu
koneksi TCP. Ini adalah dasar yang memungkinkan semua fitur lain dan
pengoptimalan performa yang disediakan oleh protokol HTTP/2.

## Multiplexing permintaan dan respons

Dengan HTTP/1.x, jika klien ingin membuat beberapa permintaan paralel untuk meningkatkan
performa, beberaoa koneksi TCP harus digunakan (lihat
[Using Multiple TCP Connections](https://hpbn.co/http1x/#using-multiple-tcp-connections)
). Perilaku ini adalah konsekuensi langsung model pengiriman HTTP/1.x, yang
memastikan bahwa hanya satu respons yang dapat dikirim pada satu waktu (antrean respons) per
koneksi. Lebih buruk lagi, ini juga menghasilkan pemblokiran head-of-line dan ketidakefisienan
penggunaan koneksi TCP yang mendasarinya.

Layer framing biner baru di HTTP/2 menghapus keterbatasan ini, dan memungkinkan
multiplexing permintaan dan respons secara penuh, dengan mengizinkan klien dan server
menguraikan pesan HTTP menjadi bingkai independen, melakukan interleave, lalu
merakit ulang di ujung satunya.

![Multiplexing permintaan dan respons HTTP/2 dalam koneksi bersama](images/multiplexing01.svg)

Snapshot merekam beberapa stream yang terjadi dalam koneksi yang sama.
Klien mentransmisikan bingkai `DATA` (stream 5) ke server, sementara server
mentransmisikan urutan interleave bingkai ke klien untuk stream 1
dan 3. Hasilnya, ada tiga stream paralel yang terjadi.

Kemampuan untuk menguraikan pesan HTTP menjadi bingkai independen, melakukan interleave
, lalu merakitnya ulang di ujung satunya adalah penyempurnaan
yang paling penting dari HTTP/2. Bahkan, hal ini memberikan dampak tidak langsung terhadap sejumlah
manfaat performa di semua teknologi web, yang memungkinkan
kita untuk:

* Melakukan interleave beberapa permintaan secara paralel tanpa memblokir salah satunya.
* Melakukan interleave beberapa respons secara paralel tanpa memblokir salah satunya.
* Menggunakan satu koneksi untuk mengirim beberapa permintaan dan respons secara paralel.
* Menghapus solusi HTTP/1.x yang tidak perlu (lihat
  [Optimizing for HTTP/1.x](https://hpbn.co/optimizing-application-delivery/#optimizing-for-http1x),
  seperti file yang digabungkan, image sprites, dan sharding domain.
* Mengirim waktu muat halaman yang lebih rendah dengan menghilangkan latensi yang tidak perlu dan meningkatkan
 penggunaan kapasitas jaringan yang tersedia.
* *Dan masih banyak lagi...*

Layer framing biner baru di HTTP/2 mengatasi masalah
pemblokiran head-of-line yang ditemukan di HTTP/1.x dan menghilangkan kebutuhan terhadap beberapa koneksi untuk
memungkinkan pemrosesan paralel dan pengiriman permintaan dan respons. Hasilnya,
ini membuat aplikasi kami lebih cepat, lebih sederhana, dan lebih murah untuk diterapkan.

## Penentuan prioritas stream

Setelah pesan HTTP dapat dipisahkan menjadi banyak bingkai tersendiri, dan kami mengizinkan
bingkai dari beberapa stream untuk di-multiplex, urutan bingkai
di-interleave dan dikirim oleh klien dan server menjadi pertimbangan
performa yang penting. Untuk memfasilitasi hal ini, standar HTTP/2 mengizinkan tiap
stream memiliki bobot dan dependensi yang terkait:

* Tiap stream dapat diberikan sebuah bobot bilangan bulat antara 1 sampai 256.
* Tiap stream dapat diberikan dependensi eksplisit pada stream lain.

Kombinasi dependensi dan bobot stream memungkinkan klien untuk
membangun dan mengomunikasikan "pohon penentuan prioritas" yang menyatakan bagaimana
sebaiknya menerima respons. Pada gilirannya, server dapat menggunakan informasi ini untuk
memprioritaskan pemrosesan stream dengan mengontrol alokasi CPU, memori, dan
resource lainnya, dan setelah data respons tersedia, alokasi
bandwidth guna memastikan pengiriman respons prioritas-tinggi yang optimal kepada klien.

![Dependensi dan bobot stream HTTP/2](images/stream_prioritization01.svg)

Dependensi stream dalam HTTP/2 dinyatakan dengan mereferensikan ID
unik stream lainnya sebagai induknya; jika ID dihilangkan,
stream dikatakan menjadi bergantung pada "root stream". Menyatakan dependensi
stream menunjukkan bahwa, jika memungkinkan, stream induk harus dialokasikan
resource sebelum dependensinya. Dengan kata lain, "Harap proses dan kirim
respons D sebelum respons C".

Stream yang memiliki induk yang sama (dengan kata lain, stream bersaudara) harus dialokasikan
resource sesuai dengan bobotnya. Misalnya, jika stream A memiliki bobot
12 dan saudaranya sibling B memiliki bobot 4, maka untuk menentukan proporsi
resource yang harus diterima oleh tiap stream ini:

1. Jumlahkan semua bobot: `4 + 12 = 16`
1. Bagi tiap bobot stream dengan total bobot: `A = 12/16, B = 4/16`

Dengan demikian, stream A harus menerima satu per tiga dan stream B harus menerima satu
per empat dari resource yang tersedia; stream B harus menerima satu per tiga
resource yang dialokasikan ke stream A. Mari kita kerjakan beberapa contoh praktis
dalam gambar di atas. Dari kiri ke kanan:

1. Stream A atau B tidak menentukan dependensi induk dan disebut bergantung
   pada "root stream" implisit; A memiliki bobot 12, dan B memiliki bobot 4.
   Dengan demikian, berdasarkan bobot proporsional, stream B harus menerima satu per tiga dari
   resource yang dialokasikan ke stream A.
1. Stream D bergantung pada root stream; C bergantung pada D. Dengan demikian, D harus
   harus menerima alokasi penuh resource sebelum C. Bobot tersebut tidak penting
   karena dependensi C mengkomunikasikan preferensi yang lebih kuat.
1. Stream D harus menerima alokasi penuh resource sebelum C; C harus menerima
   alokasi penuh resource sebelum A dan B; stream B harus menerima satu per tiga dari
   resource yang dialokasikan ke stream A.
1. Stream D harus menerima alokasi penuh resource sebelum E dan C; E dan C
   harus menerima alokasi setara sebelum A dan B, A dan B harus menerima alokasi
   proporsional berdasarkan bobotnya.

Seperti diilustrasikan contoh di atas, kombinasi dependensi stream dan
bobot menyediakan bahasa ekspresif untuk penentuan prioritas resource, yang merupakan fitur
penting untuk meningkatkan performa penjelajahan di mana kita memiliki banyak jenis
resource dengan berbagai dependensi dan bobot. Lebih baik lagi, protokol HTTP/2
juga memungkinkan klien untuk memperbarui preferensi ini setiap saat, yang memungkinkan
pengoptimalan lebih lanjut di browser. Dengan kata lain, kita dapat mengubah dependensi
dan mengalokasikan ulang bobot untuk merespons interaksi pengguna dan sinyal lainnya.

Note: Dependensi dan bobot stream menunjukkan preferensi transpor, bukan
persyaratan, dan dengan demikian tidak menjamin pemrosesan tertentu atau
urutan transmisi. Dengan kata lain, klien tidak dapat memaksa server untuk memroses
stream dalam urutan tertentu menggunakan penentuan prioritas stream. Ini mungkin tampak
kontraintuitif, namun sebenarnya ini adalah perilaku yang diinginkan. Kita tidak ingin memblokir
server dalam membuat progres pada resource prioritas rendah jika resource
prioritas tinggi diblokir.

## Satu koneksi per asal

Dengan disiapkannya mekanisme framing biner yang baru, HTTP/2 tidak lagi memerlukan beberapa
koneksi TCP ke stream multiplex secara paralel; masing-masing stream dipisah menjadi banyak
bingkai, yang dapat di-interleave dan diprioritaskan. Hasilnya, semua koneksi
HTTP/2 persisten, dan hanya satu koneksi per asal yang diperlukan,
yang menawarkan sejumlah manfaat performa.

> Untuk SPDY dan HTTP/2, fitur terpentingnya adalah multiplexing arbitrer di satu
> saluran yang dikontrol kongesti. Menakjubkan betapa pentingnya hal ini
> dan betapa bagus cara kerjanya. Satu metrik yang sangat bagus yang saya nikmati adalah
> fraksi koneksi yang dibuat untuk membawa cukup satu transaksi HTTP tunggal (dan
> sehingga transaksi tersebut menanggung semua overhead). Untuk HTTP/1 74% koneksi
> aktif kami hanya membawa satu transaksi tunggal—koneksi persisten
> tidak sebermanfaat seperti yang kita semua inginkan. Namun di HTTP/2 angka tersebut merosot ke 25%.
> Itu adalah angka yang besar untuk pengurangan overhead. [*(HTTP/2 is Live in Firefox, Patrick
> McManus)*](http://bitsup.blogspot.co.uk/2015/02/http2-is-live-in-firefox.html)

Sebagian besar transfer HTTP pendek dan padat, walau TCP dioptimalkan untuk transfer data berdurasi
lama dan massal. Dengan menggunakan kembali koneksi yang sama, HTTP/2 dapat
membuat penggunaan tiap koneksi TCP lebih efisien, dan juga secara signifikan
mengurangi keseluruhan overhead protokol. Lebih lanjut lagi, penggunaan koneksi yang lebih sedikit
mengurangi jejak memori dan pemrosesan bersama dengan jalur koneksi penuh
(dengan kata lain, klien, perantara, dan server asal). Ini mengurangi biaya operasional
keseluruhan dan menyempurnakan pemanfaatan dan kapasitas jaringan. Hasilnya,
perpindahan ke HTTP/2 tidak hanya mengurangi latensi jaringan, tetapi juga membantu
meningkatkan throughput dan mengurangi biaya operasional.

Note: Berkurangnya jumlah koneksi merupakan fitur sangat penting untuk
meningkatkan penerapan HTTPS: ini menyebabkan lebih sedikit
TLS handshake yang mahal, penggunaan kembali sesi yang lebih baik, dan pengurangan secara keseluruhan dalam
resource klien dan server yang diperlukan.

## Kontrol alur

Kontrol alur adalah mekanisme untuk mencegah pengirim membebani penerima
dengan data yang mungkin tidak diinginkan atau tidak dapat diproses: penerima mungkin sibuk, dengan
beban berat, atau mungkin hanya ingin mengalokasi jumlah resource yang tetap untuk
stream tertentu. Misalnya, klien mungkin meminta stream video
besar dengan prioritas tinggi, namun pengguna menjeda video dan klien kini
ingin menjeda atau membatasi pengirimannya dari server guna menghindari pengambilan dan
buffering data yang tidak perlu. Alternatifnya, server proxy mungkin memiliki koneksi downstream
cepat dan upstream lambat dan juga ingin mengatur seberapa
cepat downstream mengirim data untuk menyamai kecepatan upstream guna mengontrol penggunaan
resourcenya; dan sebagainya.

Apakah persyaratan di atas mengingatkan Anda pada kontrol alur TCP? Seharusnya begitu, karena
masalahnya serupa (lihat
[Flow Control](https://hpbn.co/building-blocks-of-tcp/#flow-control)). Namun,
karena stream HTTP/2 di-multiplex dalam satu koneksi TCP, kontrol alur
TCP tidak cukup terperinci, dan tidak menyediakan API tingkat-aplikasi yang
diperlukan untuk mengatur pengiriman stream satu per satu. Untuk
mengatasinya, HTTP/2 menyediakan seperangkat blok pembangun sederhana yang memungkinkan
klien dan server mengimplementasikan kontrol
alur tingkat stream dan tingkat koneksinya sendiri:

* Kontrol alur sifatnya terarah. Tiap penerima dapat memilih untuk menyetel ukuran jendela
  yang diinginkan untuk tiap stream dan seluruh koneksi.
* Kontrol alur berbasis kredit. Tiap penerima mengiklankan koneksi awalnya
  dan jendela kontrol alur stream (dalam byte), yang dikurangi setiap kali
  pengirim memancarkan bingkai `DATA` dan ditingkatkan melalui bingkai `WINDOW_UPDATE` yang dikirimkan
  oleh penerima.
* Kontrol alur tidak dapat dinonaktifkan. Saat koneksi HTTP/2 terbentuk,
  klien dan server bertukar bingkai `SETTINGS`, yang menyetel ukuran
  jendela kontrol alur di kedua arah. Nilai default jendela kontrol alur disetel
  ke 65.535 byte, namun penerima dapat menyetel ukuran jendela maksimum yang besar
  (`2^31-1` byte) dan mempertahankannya dengan mengirim bingkai `WINDOW_UPDATE` setiap kali
  data diterima.
* Kontrol alur sifatnya hop-by-hop, bukan end-to-end. Yaitu, perantara dapat menggunakannya
  untuk mengontrol penggunaan resource dan mengimplementasikan mekanisme alokasi sumber daya berdasarkan
  kriteria dan heuristiknya sendiri.

HTTP/2 tidak menentukan algoritme tertentu untuk mengimplementasikan kontrol alur.
Namun, HTTP/2 menyediakan blok pembangun sederhana dan menunda implementasi ke
klien dan server, yang dapat menggunakannya untuk mengimplementasikan strategi khusus guna
mengatur penggunaan dan alokasi resource, serta mengimplementasikan kemampuan pengiriman
baru yang dapat membantu meningkatkan performa nyata dan yang dirasakan (lihat
[Speed, Performance, and Human Perception](https://hpbn.co/primer-on-web-performance/#speed-performance-and-human-perception))
dari aplikasi web kami.

Misalnya, kontrol alur layer-aplikasi memungkinkan browser untuk mengambil hanya
bagian resource tertentu, menahan pengambilan dengan mengurangi
jendela kontrol alur aliran menjadi nol, dan kemudian melanjutkannya nanti. Dengan kata lain, ini memungkinkan
browser mengambil pratinjau atau pemindaian pertama gambar, menampilkannya, dan memungkinkan pengambilan
prioritas tinggi lainnya untuk melanjutkan, dan meneruskan pengambilan setelah resource
yang lebih penting selesai dimuat.

## Server push

Fitur baru lainnya yang canggih dari HTTP/2 adalah kemampuan server mengirim
beberapa respons untuk satu permintaan klien. Selain untuk
respons ke permintaan asal, server dapat mendorong resource tambahan ke
klien (Gambar 12-5), tanpa klien harus meminta setiap
resource secara eksplisit.

![Server memulai stream baru (promise) untuk resource push
](images/push01.svg)

Note: HTTP/2 menjauh dari semantik respons-permintaan yang ketat dan memungkinkan
alur kerja push one-to-many dan yang dimulai server, yang membuka banyak
kemungkinan interaksi baik di dalam maupun di luar browser. Ini adalah
fitur pemicu yang akan memiliki konsekuensi jangka panjang penting terkait cara
kita berpikir tentang protokol, dan tempat serta cara penggunaannya.

Mengapa kita memerlukan mekanisme tersebut di browser? Aplikasi web biasa
terdiri dari puluhan resource, semuanya ditemukan oleh klien dengan
memeriksa dokumen yang disediakan oleh server. Hasilnya, mengapa tidak menghapus
latensi ekstra dan membiarkan server mendorong resource terkait
sebelumnya? Server sudah mengetahui resource mana yang akan diperlukan oleh klien;
itulah server push.

Bahkan, jika Anda pernah menyisipkan CSS, JavaScript, atau aset lain melalui
URI data (lihat [Resource Inlining](https://hpbn.co/http1x/#resource-inlining)),
maka Anda sudah memiliki pengalaman praktis dengan server push. Dengan menyisipkan secara manual
resource ke dalam dokumen, kita, sebenarnya, mendorong resource ke
klien, tanpa menunggu klien memintanya. Dengan HTTP/2 kita dapat mencapai
hasil yang sama, namun dengan manfaat performa tambahan. Resource push dapat:

* Di-cache oleh klien
* Digunakan kembali di berbagai halaman
* Di-multiplex bersama resource lainnya
* Diprioritaskan oleh server
* Ditolak oleh klien

### PUSH_PROMISE 101

Semua stream server push dimulai melalui bingkai `PUSH_PROMISE`, yang menandakan
intent server untuk mendorong resource yang dijelaskan ke klien dan harus
dikirim sebelum data respons yang meminta resource yang didorong. Urutan
pengiriman ini penting: klien perlu mengetahui resource mana yang ingin didorong oleh
server guna menghindari duplikasi permintaan untuk
resource tersebut. Strategi paling sederhana untuk memenuhi persyaratan ini adalah mengirim semua bingkai
`PUSH_PROMISE`, yang hanya berisi header HTTP resource
yang di-promise, sebelum respons induk (dengan kata lain, bingkai `DATA`).

Setelah klien menerima bingkai `PUSH_PROMISE`, ada opsi untuk menolak stream
(melalui bingkai `RST_STREAM`) jika mau. (Ini mungkin terjadi misalnya
karena resource sudah ada di cache.) Ini adalah peningkatan penting pada
HTTP/1.x. Sebaliknya, penggunaan penyisipan resource, yang merupakan
"pengoptimalan" populer untuk HTTP/1.x, setara dengan "forced push": klien tidak dapat
memilih untuk tidak ikut, membatalkannya, atau memproses satu per satu resource yang disisipkan.

Dengan HTTP/2, klien tetap memegang kontrol penuh terhadap cara server push digunakan. Klien
dapat membatasi jumlah stream yang didorong secara serentak; menyesuaikan jendela kontrol alur
awal untuk mengontrol jumlah data yang didorong saat stream pertama
dibuka; atau menonaktifkan server push seluruhnya. Preferensi ini dikomunikasikan melalui
bingkai `SETTINGS` di awal koneksi HTTP/2 dan dapat diupdate
kapan saja.

Tiap resource yang didorong adalah stream yang, tidak seperti resource yang disisipkan, memungkinkannya untuk
di-multiplex, diprioritaskan, dan diproses satu per satu oleh klien. Satu-satunya
pembatasan keamanan, sebagaimana ditegakkan oleh browser, adalah bahwa resource yang didorong harus
mematuhi kebijakan terkait asal yang sama: server harus otoritatif untuk konten
yang disediakan.

## Kompresi header

Tiap transfer HTTP membawa sekumpulan header yang menjelaskan resource
yang ditransfer dan propertinya. Di HTTP/1.x, metadata ini selalu dikirim sebagai teks
biasa dan menambahkan sekitar 500-800 byte overhead per transfer, dan
kadang lebih beberapa kilobyte jika cookie HTTP sedang digunakan. (Lihat
[Measuring and Controlling Protocol Overhead](https://hpbn.co/http1x/#measuring-and-controlling-protocol-overhead)
.) Untuk mengurangi overhead ini dan meningkatkan performa, HTTP/2 mengompresi permintaan
dan merespons metadata header menggunakan format kompresi HPACK yang menggunakan dua
teknik yang sederhana namun canggih:

1. Ini memungkinkan kolom header yang ditransmisikan dienkode melalui kode Huffman
   statis, yang mengurangi ukuran transfer masing-masing.
1. Ini mengharuskan klien dan server mempertahankan dan memperbarui daftar terindeks berisi
   kolom header yang terlihat sebelumnya (dengan kata lain, membentuk
   konteks kompresi bersama), yang kemudian digunakan sebagai referensi untuk secara efisien mengenkode
   nilai yang sebelumnya ditransmisikan.

Coding Huffman memungkinkan nilai satu per satu untuk dikompresikan saat ditransfer,
dan daftar indeks nilai yang ditransfer sebelumnya memungkinkan kita untuk mengenkode
nilai duplikat dengan mentransfer nilai indeks yang dapat digunakan secara efisien
untuk mencari dan merekonstruksi kunci dan nilai header penuh.

![HPACK: Kompresi Header untuk HTTP/2](images/header_compression01.svg)

Sebagai pengoptimalan lebih lanjut, konteks kompresi HPACK terdiri dari
tabel statis dan dinamis: tabel statis didefinisikan dalam spesifikasi dan
menyediakan daftar kolom header HTTP umum dengan semua koneksi kemungkinkan akan
menggunakan (mis, nama header yang valid); tabel dinamis awalnya kosong dan
diperbarui berdasarkan nilai yang dipertukarkan dalam koneksi tertentu. Hasilnya,
ukuran tiap permintaan berkurang dengan menggunakan coding Huffman statis untuk nilai
yang belum terlihat sebelumnya, dan pengganti indeks untuk nilai yang
sudah ada di tabel statis atau dinamis di tiap sisi.

Note: Definisi kolom header permintaan dan respons di HTTP/2 tetap
tidak berubah, dengan beberapa pengecualian kecil: semua nama kolom header ditulis dengan huruf kecil,
dan baris permintaan kini terpisah menjadi kolom pseudo-header: `:method`, `:scheme`,
`:authority`, dan `:path`.

### Keamanan dan performa HPACK

Versi awal HTTP/2 dan SPDY menggunakan zlib, dengan kamus khusus, untuk
mengompresi semua header HTTP. Versi ini mengirimkan pengurangan ukuran 85% hingga 88%
data header yang ditransfer, dan peningkatan signifikan dalam latensi
waktu muat laman:

> Pada link DSL bandwith-rendah, dengan link upload hanya 375 Kbps,
> kompresi header permintaan tertentu, mengarah ke peningkatan waktu muat halaman yang signifikan
> untuk situs tertentu (dengan kata lain, yang mengeluarkan jumlah besar
> permintaan resource). Kami menemukan pengurangan waktu muat laman sebesar 45-1142 md
> hanya karena kompresi header. [*(SPDY whitepaper,
> chromium.org)*](https://www.chromium.org/spdy/spdy-whitepaper)

Namun, pada musim panas tahun 2012, serangan keamanan "CRIME" dipublikasikan terhadap algoritme kompresi
TLS dan SPDY, yang dapat mengakibatkan pembajakan sesi. Hasilnya,
algoritme kompresi zlib digantikan dengan HPACK yang secara khusus
didesain untuk: mengatasi masalah keamanan yang ditemukan, efisien
dan sederhana untuk diimplementasikan dengan benar, dan tentunya, memungkinkan kompresi yang baik terhadap
metadata header HTTP.

Untuk detail selengkapnya tentang algoritme kompresi HPACK, lihat
[IETF HPACK - Header Compression for HTTP/2](https://tools.ietf.org/html/draft-ietf-httpbis-header-compression).

## Bacaan lebih lanjut:

* [“HTTP/2”](https://hpbn.co/http2/){: .external }
    – Artikel lengkap oleh Ilya Grigorik
* [“Setting up HTTP/2”](https://surma.link/things/h2setup/){: .external }
    – Cara menyiapkan HTTP/2 dalam backend yang berbeda oleh Surma
* [“HTTP/2 is here,
let’s optimize!”](https://docs.google.com/presentation/d/1r7QXGYOLCh4fcUq0jDdDwKJWNqWK1o4xMtYpKZCJYjM/edit#slide=id.p19)
    – Presentasi oleh Ilya Grigorik dari Velocity 2015
* [“Rules of Thumb for HTTP/2 Push”](https://docs.google.com/document/d/1K0NykTXBbbbTlv60t5MyJvXjqKGsCVNYHyLEXIxYMv0/edit)
    – Analisis oleh Tom Bergan, Simon Pelchat, dan Michael Buettner tentang waktu dan caara menggunakan push.

## Masukan {: #feedback }

{% include "web/_shared/helpful.html" %}
