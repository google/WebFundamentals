project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: HTTP/2 (atau h2) adalah protokol biner yang membawa kontrol push, aliran multiplexing, dan bingkai ke web.

{# wf_updated_on: 2017-07-13 #}
{# wf_published_on: 2016-09-29 #}

# Pengantar HTTP/2 {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}
{% include "web/_shared/contributors/surma.html" %}

Note: Materi berikut ini merupakan kutipan dari [High Performance Browser
Networking](http://shop.oreilly.com/product/0636920028048.do) (O'Reilly, Ilya
Grigorik). Untuk versi lengkap dan materi terkaitnya, lihat
[hpbn.co](https://hpbn.co/){: .external }.

HTTP/2 akan membuat aplikasi Anda lebih cepat, lebih sederhana, dan lebih tangguh — kombinasi
yang langka — dengan memungkinkan kita untuk membatalkan banyak solusi HTTP/1.1 yang sebelumnya
dilakukan di dalam aplikasi kita dan mengatasi kekhawatiran ini di dalam layer
transport itu sendiri. Bahkan lebih baik lagi, aplikasi ini membuka sejumlah seluruh
peluang baru untuk mengoptimalkan aplikasi kita dan meningkatkan kinerja!

Tujuan utama untuk HTTP/2 adalah mengurangi latensi dengan mengaktifkan permintaan penuh dan
multiplexing respons, meminimalkan overhead protokol melalui kompresi efisien
bidang header HTTP, dan menambahkan dukungan untuk penentuan prioritas permintaan dan server push.
Untuk mengimplementasikan persyaratan ini, ada transmisi dukungan yang besar dari
penyempurnaan protokol lainnya, seperti kontrol aliran, penanganan kesalahan, dan mekanisme
peningkatan yang baru, namun ini merupakan fitur-fitur paling penting yang harus dipahami oleh setiap developer web
dan tingkatkan dalam aplikasi mereka.

HTTP/2 tidak memodifikasi semantik aplikasi HTTP dengan cara apa pun. Semua
konsep inti, seperti metode HTTP, kode status, URI, dan bidang header,
tetap berlaku. Namun, HTTP/2 memodifikasi cara data diformat (dibingkai) dan
dipindahkan antara klien dan server, yang keduanya mengelola seluruh
proses, dan menyembunyikan seluruh kompleksitas dari aplikasi kita di dalam
layer pembingkaian yang baru. Akibatnya, semua aplikasi yang ada dapat dikirimkan tanpa
modifikasi.

*Mengapa bukan HTTP/1.2?*

Untuk mencapai tujuan kinerja yang ditetapkan oleh HTTP Working Group, HTTP/2
memperkenalkan layer pembingkaian biner baru yang tidak kompatibel mundur dengan server dan klien
HTTP/1.x sebelumnya—sehingga versi protokol utama naik
ke HTTP/2.

Dikatakan, kecuali Anda mengimplementasikan server web (atau klien khusus) dengan
bekerja bersama soket TCP mentah, maka Anda tidak akan melihat perbedaan apa pun: semua,
pembingkaian level rendah yang baru dijalankan oleh klien dan server atas nama Anda. Satu-satunya
perbedaan yang dapat dilihat yaitu kinerja yang membaik dan ketersediaan
kemampuan baru seperti penentuan prioritas permintaan, kontrol aliran, dan server push.

## Riwayat singkat SPDY dan HTTP/2

SPDY merupakan protokol eksperimen, yang dikembangkan di Google dan diumumkan pada
pertengahan 2009, yang tujuan utamanya adalah mencoba mengurangi latensi beban laman web
dengan mengatasi beberapa keterbatasan kinerja HTTP/1.1 yang telah dikenal
Terutama, tujuan proyek yang dijelaskan disetel sebagai berikut:

* Target pengurangan 50% dalam waktu muat laman (page load time/PLT).
* Hindari kebutuhan atas perubahan apa pun terhadap materi oleh penulis situs web.
* Minimalkan kompleksitas penerapan, dan hindari perubahan dalam infrastruksi jaringan.
* Kembangkan protokol baru ini dalam kemitraan dengan komunitas open-source.
* Kumpulkan data kinerja nyata untuk mem(batalkan)validasi protokol eksperimental.

Note: Untuk mencapai peningkatan PLT 50%, SPDY bertujuan untuk menggunakan dengan lebih efisien
koneksi TCP yang mendasari dengan memperkenalkan layer pembingkaian biner baru untuk
memampukan permintaan dan multiplexing respons, penentuan prioritas, dan kompresi
header; lihat
[Latensi sebagai Bottleneck Kinerja](https://hpbn.co/primer-on-web-performance/#latency-as-a-performance-bottleneck){: .external}.

Tidak lama setelah pengumuman awal, Mike Belshe dan Roberto Peon, keduanya
ahli teknik perangkat lunak di Google, berbagi hasil awal mereka, dokumentasi, dan
kode sumber untuk implementasi eksperimental protokol SPDY yang baru:

> Sejauh ini, kami hanya menguji SPDY di kondisi lab. Hasil awalnya
> sangat menggembirakan: saat kami mengunduh 25 situs web teratas pada simulasi
> koneksi jaringan home yang disimulasi, kami melihat peningkatan signifikan dalam kinerja—laman
> dimuat hingga 55% lebih cepat. 
> [*(Chromium Blog)*](https://blog.chromium.org/2009/11/2x-faster-web.html)

Putar maju ke 2012 dan protokol eksperimental baru didukung di Chrome,
Firefox, dan Opera, serta sejumlah situs yang berkembang dengan cepat, baik yang besar (misalnya,
Google, Twitter, Facebook) maupun yang kecil, yang menerapkan SPDY dalam
infrastrukturnya. Akibatnya, SPDY tetap terjaga untuk menjadi standar de facto
 melalui adopsi industri yang berkembang.

Mengobservasi tren ini, HTTP Working Group (HTTP-WG) memulai 
upaya baru untuk mengambil pelajaran dari SPDY, membangun dan meningkatkannya, serta
menjalankan standar "HTTP/2" resmi. Bab baru telah disusun, panggilan terbuka
untuk proposal HTTP/2 dibuat, dan setelah begitu banyak diskusi dalam kelompok
kerja, spesifikasi SPDY diadopsi sebagai titik awal untuk protokol
HTTP/2 yang baru.

Selama beberapa tahun mendatang, SPDY dan HTTP/2 terus berkembang bersama secara paralel,
dengan SPDY yang bertindak sebagai cabang eksperimental yang digunakan untuk menguji fitur-fitur baru
dan proposal untuk standar HTTP/2, yang tampaknya bagus secara teori bisa jadi tidak berjalan dalam
praktiknya, begitu pun sebaliknya, dan SPDY menawarkan rute untuk menguji dan mengevaluasi setiap
proposal sebelum inklusinya dalam standar HTTP/2. Pada akhirnya, proses ini
merentang selama tiga tahun dan menghasilkan selusin draf menengah:

*  Maret 2012: Memanggil proposal untuk HTTP/2
* Nopember 2012: Draf pertama HTTP/2 (berdasarkan SPDY)
* Agustus 2014: Draf-17 HTTP/2 dan draf-12 HPACK dipublikasikan
* Agustus 2014: Panggilan terakhir Kelompok Kerja untuk HTTP/2
* Februari 2015: IESG menyetujui draf HTTP/2 dan HPACK
* Mei 2015: RFC 7540 (HTTP/2) dan RFC 7541 (HPACK) dipublikasikan

Di awal 2015, IESG meninjau dan menyetujui standar HTTP/2 yang baru untuk
dipublikasikan. Tidak lama setelah itu, tim Google Chrome mengumumkan jadwal untuk
memprotes ekstensi SPDY dan NPN untuk TLS:

> perubahan utama HTTP/2 dari fokus HTTP/1.1 tentang kinerja yang ditingkatkan. Beberapa fitur
> penting seperti multiplexing, kompresi header, penentuan prioritas dan negosiasi
> protokol yang berkembang dari pekerjaan dilakukan dalam pembukaan lebih awal, namun protokol
< non-standar diberi nama SPDY. Chrome telah mendukung SPDY sejak Chrome 6, namun karena sebagian besar
manfaatnya ada di HTTP/2, kini saatnya untuk meninggalkannya. Kita berencana untuk
> menghapus dukungan untuk SPDY di awal 2016, dan juga untuk menghapus dukungan untuk ekstensi
> TLS yang diberi nama NPN dalam mendukung ALPN di Chrome pada waktu yang sama. Developer
> server sangat disarankan untuk pindah ke HTTP/2 dan ALPN.
> 
> Kami sangat senang karena telah berkontribusi atas proses standar terbuka yang menuju ke
> HTTP/2, dan berharap untuk melihat adopsi yang luas mengingat keterlibatan industri yang luas pada
> standardisasi dan implementasi. [*(Chromium
> Blog)*](https://blog.chromium.org/2015/02/hello-http2-goodbye-spdy.html)

Evolusi bersama SPDY dan HTTP/2 mengaktifkan server, browser, dan developer situs
untuk memperoleh pengalaman dunia-nyata dengan protokol baru karena sedang dikembangkan.
Sebagai hasilnya, standar HTTP/2 adalah salah satu
standar terbaik dan paling banyak diuji pertama kali. Saat HTTP/2 disetuji oleh IESG,
ada lusinan implementasi klien dan server yang
siap diuji dan produksi secara menyeluruh. Bahkan, hanya beberapa pekan setelah protokol akhir disetujui, banyak
pengguna yang siap menikmati manfaatnya karena beberapa browser populer (dan banyak
situs) menerapkan dukungan HTTP/2 penuh.

## Tujuan desain dan teknis

Versi protokol HTTP sebelumnya dengan sengaja didesain untuk kemudahan
implementasi: HTTP/0.9 adalah protokol one-line untuk menyatukan World Wide
Web; HTTP/1.0 yang mendokumentasikan ekstensi populer ke HTTP/0.9 dalam standar
informasional; HTTP/1.1 memperkenalkan standar IETF resmi; lihat
[Riwayat Singkat HTTP](https://hpbn.co/brief-history-of-http/){: .external}.
Seperti, HTTP/0.9-1.x yang dilaksanakan tepat seperti yang telah ditetapkan untuk dilakukan: HTTP adalah salah satu
protokol aplikasi yang paling banyak diadopsi di Internet.

Sayangnya, kesederhanaan implementasi juga mengakibatkan biaya kinerja
aplikasi: Klien HTTP/1.x harus menggunakan beberapa koneksi untuk mencapai
konkurensi dan mengurangi latensi; HTTP/1.x tidak mengompresi permintaan dan header
respons, yang mengakibatkan lalu lintas jaringan yang tidak perlu; HTTP/1.x tidak memungkinkan penentuan prioritas
sumber daya yang efektif, sehingga penggunaan koneksi TCP yang mendasarinya menjadi buruk;
dan lain sebagainya.

Pembatasan ini tidak fatal, namun sebagai aplikasi web yang terus tumbuh
dalam cakupan, kompleksitas, dan kepentingannya di kehidupan kami sehari-hari, pembatasan ini mengakibatkan
beban yang berkembang baik pada developer maupun pengguna web, yang merupakan celah
yang tepat bagi HTTP/2 untuk didesain dan diatasi:

> HTTP/2 memungkinkan penggunaan sumber daya jaringan yang lebih efisien dan persepsi
> latensi yang berkurang dnegan memperkenalkan kompresi bidang header dan memungkinkan
> beberapa pertukaran konkuren pada koneksi yang sama… Khususnya, HTTP/2 memungkinkan
> interleaving permintaan dan pesan respons pada koneksi yang sama dan menggunakan
> pengkodean efisien untuk bidang header HTTP. HTTP/2 juga memungkinkan penentuan prioritas
> permintaan, sehingga permintaan penting dapat selesai lebih cepat, yang selanjutnya
> meningkatkan kinerja.
> 
> Protokol hasilnya lebih ramah terhadap jaringan, karena lebih sedikit koneksi
> TCP dapat digunakan jika dibandingkan dengan HTTP/1.x. Ini berarti lebih sedikit kompetisi
> dengan aliran lain, dan koneksi yang hidup-lebih lama, yang pada gilirannya mengakibatkan
> pemanfaatan kapasitas jaringan yang tersedia dengan lebih baik. Yang terakhir, HTTP/2 juga mengaktifkan pemrosesan
> pesan yang lebih efisien melalui penggunaan pembingkaian pesan biner.
> [*(Hypertext Transfer Protocol versi 2, Draf
> 17)*](https://tools.ietf.org/html/draft-ietf-httpbis-http2-17)


Penting untuk diperhatikan bahwa HTTP/2 bersifat memperpanjang, bukan menggantikan standar
HTTP sebelumnya. Semantik aplikasi HTTP sama, dan tidak ada perubahan
yang dibuat untuk fungsi yang ditawarkan atau konsep inti seperrti metode HTTP,
kode status, URI, dan bidang header. Perubahan-perubahan ini secara eksplisit berada di luar cakupan
untuk upaya HTTP/2. Disebutkan, sementara API level-tinggi tetap sama,
penting untuk dipahami cara perubahan level-rendah mengatasi keterbatasan
kinerja protokol sebelumnya. Mari kita lihat dengan singkat layer pembingkaian
biner dan fitur-fiturnya.

## Layer pembingkaian biner

Pada inti semua penyempurnaan kinerja HTTP/2 adalah layer
pembingkaian biner baru, yang mengindikasikan cara pesan HTTP dibungkus dan ditransfer
antara klien dan server.

![Layer pembingkaian biner HTTP/2](images/binary_framing_layer01.svg)

"Layer" mengacu kepada pilihan desain untuk memperkenalkan mekanisme
enkode antara antarmuka soket dan API HTTP lebih tinggi yang terpapar pada
aplikasi kita: semantik HTTP, seperti kata kerja, metode, dan header, tidak
terpengaruh, namun cara dienkodenya selagi dikirim berbeda.
Tidak seperti protokol HTTP/1.x dibatasi teks biasa baris baru, semua komunikasi/2
HTTP dibagi menjadi pesan dan bingkai yang lebih kecil, masing-masing
dienkode dalam format biner.

Hasilnya, klien dan server harus menggunakan mekanisme enkode biner yang baru
guna memahami satu sama lain: klien HTTP/1.x tidak akan memahami satu-satunya server
HTTP/2, dan sebaliknya. Untungnya, aplikasi kami tetap tidak menyadari
semua perubahan ini, karena klien dan server menjalankan semua pekerjaan
pembingkaian yang diperlukan atas nama kami.

## Aliran, pesan, dan bingkai

Pengenalan mekanisme pembingkaian biner baru mengubah cara data
dipertukarkan antara klien dan server. Untuk menguraikan proses ini, mari kita
membiasakan diri kita dengan istilah HTTP/2:

* *Aliran*: Alur dua arah byte di dalam koneksi yang ditetapkan,
  yang dapat membawa satu atau beberapa pesan.
* *Pesan*: Urutan bingkai lengkap yang memetakan ke permintaan logika atau pesan respons.
* *Bingkai*: Unit komunikasi terkecil di HTTP/2, masing-masing berisi sebuah header, yang
 minimal mengidentifikasi ke aliran bingkai menuju.

Hubungan istilah-istilah ini dapat dirangkum sebagai berikut:

* Semua komunikasi dilakukan pada satu koneksi TCP yang dapat membawa sejumlah 
  aliran dua arah.
* Setiap aliran memiliki identifier unik dan informasi prioritas opsional yang digunakan untuk membawa
  pesan dua arah.
* Setiap pesan adalah pesan HTTP logis, seperti permintaan, atau respons, yang terdiri atas 
  satu atau beberapa bingkai.
* Bingkai adalah unit komunikasi terkecil yang membawa jenis data spesifik—mis.,
 header HTTP, payload pesan, dan sebagainya. Bingkai dari aliran berbeda dapat melakukan interleave
 lalu dirakit kembali melalui identifier aliran yang disematkan di header setiap bingkai.

![HTTP/2 aliran, pesan, dan bingkai](images/streams_messages_frames01.svg)

Singkatnya, HTTP/2 memecah komunikasi protokol HTTP ke dalam pertukaran
bingkai yang dienkode-biner, yang kemudian dipetakan ke pesan yang masuk ke dalam
aliran tertentu, semuanya di-multiplex dalam satu
koneksi TCP. Ini adalah landasan yang mengaktifkan fitur-fitur lain dan
optimasi kinerja yang disediakan oleh protokol HTTP/2.

## Multiplexing permintaan dan respons

Dengan HTTP/1.x, jika klien ingin membuat beberapa permintaan paralel untuk meningkatkan
kinerja, lalu beberaoa koneksi TCP harus digunakan (lihat
[Menggunakan Beberapa Koneksi TCP](https://hpbn.co/http1x/#using-multiple-tcp-connections)
). Perilaku ini adalah konsekuensi langsung model pengiriman HTTP/1.x, yang
memastikan bahwa hanya satu respons yang dapat dikirimkan pada satu waktu (antrean respons) per
koneksi. Lebih buruk lagi, ini juga menghasilkan pemblokiran head-in-line dan ketidakefisienan
penggunaan koneksi TCP pokok.

Layer pembingkaian biner baru di HTTP/2 menghapus pembatasan ini, dan mengaktifkan
permintaan penuh serta multiplexing respons, dengan memungkinkan klien dan server untuk
memecah pesan HTTP ke dalam bingkai-bingkai independen, melakukan interleave, lalu
merakit kembali di ujung satunya.

![Multiplexing permintaan dan respons HTTP/2 di dalam koneksi bersama](images/multiplexing01.svg)

Cuplikan menangkap beberapa aliran di flight dalam koneksi yang sama. 
Klien mentransmisikan bingkai `DATA` (aliran 5) ke server, sementara server
mentransmisikan urutan interleave bingkai ke klien untuk aliran 1
dan 3. Hasilnya, ada tiga aliran paralel saat ini.

Kemampuan untuk memecah pesan HTTP ke dalam bingkai independen, meng-interleave
nya, lalu merakitnya kembali di ujung satunya adalah satu penyempurnaan
paling penting dari HTTP/2. Bahkan, hal ini memperkenalkan efek riak terhadap sejumlah
manfaat kinerja pada seluruh tumpukan semua teknologi web, memungkinkan
kita untuk:

* Melakukan interleave beberapa permintaan secara paralel tanpa memblokir salah satunya.
* Melakukan interleave beberapa respons secara paralel tanpa memblokir salah satunya.
* Menggunakan satu koneksi untuk mengirimkan beberapa permintaan dan respons secara paralel.
* Menghilangkan solusi HTTP/1.x yang tidak perlu (lihat
  [Mengoptimalkan HTTP/1.x](https://hpbn.co/optimizing-application-delivery/#optimizing-for-http1x),
  seperti file gabungan, image sprites, dan pemecahan domain.
* Mengirimkan waktu muat laman yang lebih rendah dengan menghilangkan latensi yang tak perlu dan meningkatkan
 penggunaan kapasitas jaringan yang tersedia.
* *Dan masih banyak lagi...*

Layer pembingkaian biner baru di HTTP/2 mengatasi masalah
pemblokiran head-of-line yang dijumpai di HTTP/1.x dan menghilangkan kebutuhan terhadap beberapa koneksi untuk
memungkinkan pemrosesan paralel dan pengiriman permintaan dan respons. Hasilnya,
ini menjadikan aplikasi kita lebih cepat, lebih sederhana, dan lebih murah untuk diterapkan.

## Penentuan prioritas aliran

Setelah pesan HTTP dapat dipisahkan ke dalam banyak bingkai individu, dan kita memperolehkan
bingkai dari beberapa aliran untuk di-multiplex, urutan bingkai
di-interleave dan dikirimkan oleh klien dan server menjadi pertimbangan
kinerja yang penting. Untuk memfasilitasi hal ini, standar HTTP/2 memperbolehkan setiap
aliran untuk memiliki bobot dan dependensi yang terkait:

* Setiap aliran dapat ditetapkan sebuah bobot integer antara 1 sampai 256.
* Setiap aliran dapat diberikan dependensi eksplisit pada aliran lainnya.

Kombinasi dependensi aliran dan bobot memungkinkan klien untuk
membangun dan mengomunikasikan "pohon penentuan prioritas" yang menyatakan bagaimana
sebaiknya menerima respons. Pada gilirannya, server dapat menggunakan informasi ini untuk
memprioritasnya pemrosesan aliran dengan mengontrol alokasi CPU, memori, dan
sumber daya lainnya, dan setelah data respons tersedia, alokasi
bandwidth guna memastikan pengiriman optimal respons prioritas-tinggi kepada klien.

![Dependensi aliran dan bobot HTTP/2](images/stream_prioritization01.svg)

Dependensi aliran di dalam HTTP/2 dinyatakan dengan mereferensikan identifier
unik aliran lainnya sebagai induknya; jika identifier dihilangkan, 
aliran dikatakan menjadi mandiri pada "aliran akar". Menyatakan dependensi
aliran menunjukkan bahwa, jika memungkinkan, aliran induk harus dialokasikan
sumber daya di depan dependensi. Dengan kata lain, "Harap proses dan kirimkan
respons D sebelum respons C".

Aliran yang berbagi induk yang sama (dengan kata lain, aliran sibling) harus dialokasikan
sumber daya sesuai dengan bobotnya. Misalnya, jika aliran A memiliki bobot
12 dan satu sibling B memiliki bobot 4, maka untuk menentukan proporsi
sumber daya, setiap aliran ini harus menerima:

1. Menjumlahkan semua bobot: `4 + 12 = 16`
2. Bagi setiap bobot aliran dengan total bobot: `A = 12/16, B = 4/16`

Kemudian, aliran A harus menerima satu per tiga dan aliran B harus menerima satu
per empat dari sumber daya yang tersedia; aliran B harus menerima satu per tiga
sumber daya yang dialokasikan ke aliran A. Mari kita kerjakan melalui beberapa contoh praktik
pada gambar di atas. Dari kiri ke kanan:

1. Baik aliran A atau B tidak menyebutkan dependensi induk dan tidak disebut bergantung
   pada "aliran akar" implisit; A memiliki bobot 12, dan B memiliki bobot 4. 
   Jadi, berdasarkab bobot proporsional: aliran B harus menerima satu per tiha dari 
   sumber daya yang dialokasikan ke aliran A.
2. Aliran D bergantung pada aliran akar; C bergantung pada D. Jadi, D harus
   menerima alokasi penuh sumber daya lebih dulu dari C. Bobot sifatnya tidak bertalian
   karena dependensi C mengomunikasikan preferensi yang lebih kuat.
3. Aliran D harus menerima alokasi penuh sumber daya lebih dulu dari C; C harus menerima
   alokasi penuh sumber daya lebih dulu dari A dan B; aliran B harus menerima satu pertiga 
   sumber daya yang dialokasikan ke aliran A.
4. Aliran D harus menerima alokasi penuh sumber daya lebih dulu dari E dan C; E dan C
   harus menerima alokasi yang setara lebih dulu dari A dan B; A dan B harus menerima alokasi 
   proprosional berdasarkan bobotnya.

Seperti diilustrasikan contoh di atas, kombinasi dependensi aliran dan
bobot menyediakan bahasa ekspresif untuk penentuan prioritas sumber daya, yang merupakan fitur
penting untuk meningkatkan kinerja penjelajahan tempat kita memiliki banyak jenis
sumber daya dengan berbagai dependensi dan bobot. Lebih baik lagi, protokol HTTP/2
juga memungkinkan klien untuk memperbarui preferensi ini setiap saat, yang mengaktifkan
optimasi selanjutnya di browser. Dengan kata lain, kita dapat mengubah dependensi
dan mengalokasikan kembali bobot sehubungan dengan interaksi pengguna dan sinyal lainnya.

Note: Alirkan dependensi dan bobot menyampaikan preferensi transport, bukan
persyaratan, dan dengan demikian tidak menjamin pemrosesan tertentu atau
urutan transmisi. Klien tidak dapat memaksa server untuk memroses
aliran dalam urutan tertentu menggunakan penentuan prioritas aliran. Sementara ini mungkin tampak
kontraintuitif, ini sesungguhnya perilaku yang diinginkan. Kita tidak ingin memblokir
server dalam membuat kemajuan pada sumber daya prioritas rendah jika sumber daya
prioritas tinggi diblokir.

## Satu koneksi per sumber

Dengan dicanangkannya mekanisme pembingkaian biner yang baru, HTTP/2 tidak lagi membutuhkan beberapa
koneksi TCP ke aliran multiplex secara paralel; masing-masing aliran dipisah ke dalam banyak
bingkai, yang dapat di-interleave dan diprioritaskan. Hasilnya, semua koneksi
HTTP/2 persisten, dan hanya satu koneksi per sumber yang diperlukan,
yang menawarkan sejumlah manfaat kinerja.

> Untuk SPDY dan HTTP/2, fitur pembunuhnya adalah multiplexing sembarang di sebuah
> saluran kongesti yang terkendali dengan baik. Menakjubkan betapa pentingnya hal ini
> dan betapa bagus cara kerjanya. Satu metrik yang sangat bagus yang saya nikmati adalah
> fraksi koneksi yang dibuat untuk membawa cukup satu transaksi HTTP tunggal (dan
> sehingga transaksi tersebut menanggung semua overhead). Untuk HTTP/1 74% koneksi
> aktif kita hanya membawa satu transaksi tunggal—koneksi persisten
> tidak sebermanfaat seperti yang kita semua inginkan. Namun dalam HTTP/2 jumlah tersebut merosot ke 25%.
> Itu kemenangan besar bagi pengurangan overhead. [*(HTTP/2 is Live in Firefox, Patrick
> McManus)*](http://bitsup.blogspot.co.uk/2015/02/http2-is-live-in-firefox.html)

Sebagian besar transfer HTTP pendek dan padat, walau TCP dioptimalkan untuk transfer data jangka
panjang dan massal. Dengan menggunakan kembali koneksi yang sama, HTTP/2 mampu
membuat penggunaan setiap koneksi TCP lebih efisien, dan juga secara signifikan
mengurangi keseluruhan overhead protokol. Lebih lanjut lagi, penggunaan koneksi yang lebih sedikit
mengurangi jejak memori dan pemrosesan bersama dengan jalur koneksi penuh
(dengan kata lain, klien, perantara, dan server sumber). Ini mengurangi keseluruhan
biaya operasional dan meningkatkan utilitas serta kemampuan jaringan. Hasilnya,
perpindahan ke HTTP/2 tidak hanya mengurangi latensi jaringan, tetapi juga membantu
meningkatkan throughput dan mengurangi biaya operasional.

Note: Berkurangnya jumlah koneksi merupakan fitur sangat penting untuk
meningkatkan penyebaran penerapan HTTPS: fitur ini diterjemahkan menjadi
TLS handshake yang sedikit berat, penggunaan kembali sesi yang lebih baik, dan pengurangan secara keseluruhan dalam
sumber daya klien dan server yang diperlukan.

## Kontrol alur

Kontrol alur adalah mekanisme untuk mencegah pengirim dari membebani penerima
dengan data yang mungkin tak diinginkan atau agar dapat memroses: penerima mungkin sibuk, dalam
beban berat, atau mungkin hanya ingin mengalokasi jumlah sumber daya tetap untuk
aliran tertentu. Misalnya, klien mungkin meminta aliran video
lebih besar dengan prioritas tinggi, namun pengguna menjeda video dan klien kini
ingin menjeda atau menghambat pengirimannya dari server guna menghindari pengambilan dan
menyangga data yang tidak perlu. Alternatifnya, server proxy mungkin memiliki koneksi downstream
cepat dan upstream lambat dan juga ingin mengatur seberapa
cepat downstream mengirimkan data untuk menyamai kecepatan upstream guna mengontrol penggunaan
sumber dayanya; dan sebagainya.

Apakah persyaratan di atas mengingatkan Anda pada kontrol alur TCP? Seharusnya begitu, karena
masalahnya serupa (lihat
[Kontrol Alur](https://hpbn.co/building-blocks-of-tcp/#flow-control)). Namun,
karena aliran HTTP/2 multiplex dalam satu koneksi TCP tunggal, kontrol alur
TCP tidak cukup granular, dan tidak menyediakan API level-aplikasi yang
diperlukan untuk mengatur pengiriman aliran individu. Untuk
mengatasinya, HTTP/2 menyediakan seperangkat blok pembangunan sederhana yang memungkinkan
klien dan server mengimplementasikan kontrol
alur level-koneksi dan alirannya sendiri:

* Kontrol alur sifatnya berarah. Setiap penerima dapat memilih untuk menyetel ukuran jendela
 yang diinginkan untuk setiap aliran dan seluruh koneksi.
* Kontrol alur berbasis kredit. Setiap penerima mengiklankan koneksi inisialnya
  dan jendela kontrol alur aliran (dalam byte), yang dikurangi kapan saja 
  pengirim memancarkan bingkai `DATA` dan ditingkatkan melalui bingkai `WINDOW_UPDATE` yang dikirimkan
  oleh penerima.
* Kontrol alur tidak dapat dinonaktifkan. Saat koneksi HTTP/2 ditetapkan, 
  klien dan server bertukar bingkai `SETTINGS`, yang menyetel ukuran
  jendela kontrol alur di kedua arah. Nilai default jendela kontrol alur diatur
  ke 65.535 byte namun penerima dapat menyetel ukuran jendela maksimum yang besar 
  (`2^31-1` byte) dan mempertahankannya dengan mengirimkan bingkai `WINDOW_UPDATE` kapan saja 
  data diterima.
* Kontrol alur sifatnya hop-by-hop, bukan end-to-end. Yaitu, perantara dapat menggunakannya 
 untuk mengontrol penggunaan dan sumber daya dan mengimplementasikan mekanisme alokasi sumber daya berdasarkan
  kriteria dan heuristiknya sendiri.

HTTP/2 tidak menyebutkan algoritme tertentu untuk mengimplementasikan kontrol alur.
Namun, menyediakan blok pembangungan sederhana dan menangguhkan implementasi ke
klien dan server, yang dapat menggunakannya untuk mengimplementasikan strategi khusus guna
mengatur penggunaan dan alokasi sumber daya, serta mengimplementasikan kemampuan pengiriman
baru yang dapat membantu meningkatkan kinerja nyata dan yang dirasakan (lihat
[Kecepatan, Kinerja, dan Persepsi Manusia](https://hpbn.co/primer-on-web-performance/#speed-performance-and-human-perception))
aplikasi web kita.

Misalnya, kontrol alur layer-aplikasi memungkinkan browser untuk mengambil hanya
bagian sumber daya tertentu, menahan pengambilan dengan mengurangi
jendela kontrol alur aliran menjadi nol dan melanjutkannya nanti. Dengan kata lain, browser
boleh mengambil pratinjau atau pemindaian pertama dari suatu gambar, menampilkannya dan memperbolehkan pengambilan
prioritas tinggi lainnya untuk melanjutkan, dan meneruskan pengambilan setelah sumber daya
yang lebih penting selesai memuat.

## Server push

Fitur baru yang dahsyat lainnya dari HTTP/2 adalah kemampuan server untuk mengirimkan
beberapa respons untuk satu permintaan klien tunggal. Selain untuk
respons ke permintaan asal, server dapat mendorong sumber daya tambahan ke
klien (Gambar 12-5), tanpa klien harus meminta setiap satu
permintaan secara eksplisit.

![Server mengawali aliran baru (promise) untuk sumber daya push
](images/push01.svg)

Note: HTTP/2 menjauh dari semantik respons-permintaan yang ketat dan memungkinkan
satu dengan banyak dan alur kerja push yang diawali dengan server yang membuka dunia
baru kemungkinan interaksi baik di dalam maupun di luar browser. Ini
mengaktifkan fitur yang akan memiliki konsekuensi jangka panjang penting untuk cara
kita berpikir tentang protokol, dan tempat serta caranya digunakan.

Mengapa kita memerlukan mekanisme itu di browser? Aplikasi web biasa
terdiri atas lusinan sumber daya, semuanya ditemukan oleh klien dengan
memeriksa dokumen yang disediakan oleh server. Hasilnya, mengapa tidak meniadakan
latensi ekstra dan membiarkan server mendorong sumber daya terkait
sebelumnya? Server sudah mengetahui sumber daya mana yang klien akan perlukan;
itulah server push.

Bahkan, jika Anda pernah menyisipkan CSS, JavaScript, atau aset apa pun melalui
URI data (lihat [Penyisipan Sumber Daya](https://hpbn.co/http1x/#resource-inlining)),
maka Anda sudah memiliki pengalaman praktik dengan server push. Dengan menyisipkan secara manual
sumber daya ke dalam dokumen, kita, sebenarnya, mendorong sumber daya ke
klien, tanpa menunggu klien memintanya. Dengan HTTP/2 kita dapat mencapai
hasil yang sama, namun dengan manfaat kinerja tambahan. Sumber daya push dapat:

* Di-cache oleh klien
* Digunakan kembali lintas berbagai laman
* Di-multiplex bersama sumber daya lainnya
* Diprioritaskan oleh server
* Ditolak oleh klien

### PUSH_PROMISE 101

Semua aliran server push dinisiasi melalui bingkai `PUSH_PROMISE`, yang memberi sinyal
tujuan server untuk mendorong sumber daya yang dijelaskan ke klien dan harus di
kirimkan sebelum data respons yang meminta sumber daya didorong. Urutan
pengiriman ini penting: klien perlu mengetahui sumber daya mana yang
server maksudkan untuk didorong guna menghindari duplikasi permintaan untuk 
sumber daya tersebut. Strategi paling sederhana untuk memenuhi persyaratan ini adalah mengirimkan semua
bingkai `PUSH_PROMISE`, yang hanya berisi header HTTP sumber daya
yang di-promise, sebelum respons induk (dengan kata lain, bingkai `DATA`).

Setelah klien menerima bingkai `PUSH_PROMISE`, klien memiliki opsi untuk menolak
aliran (melalui bingkai `RST_STREAM`) jika dinginkan. (Ini dapat terjadi misalnya
karena sumber daya sudah ada di cache.) Ini adalah peningkatan penting pada
HTTP/1.x. Sebaliknya, penggunaan penyisipan sumber daya, yang merupakan 
"optimasi" populer untuk HTTP/1.x, setara dengan "forced push": klien tidak dapat
mengecualikan, membatalkan, atau memroses sumber daya yang disisipkan secara individu.

Dengan HTTP/2, klien tetap dalam kontrol penuh terhadap bagaimana server push digunakan. Klien
dapat membatasi jumlah aliran yang didorong secara konkuren; menyesuaikan jendela kontrol alur
awal untuk seberapa banyak data didorong saat aliran pertama
dibuka; atau menonaktifkan server push seluruhnya. Preferensi ini dikomunikasikan melalui
bingkai `SETTINGS` di awal koneksi HTTP/2 dan dapat diperbarui
setiap saat.

Setiap sumber daya yang didorong adalah aliran yang, tidak seperti sumber daya yang disisipkan, memungkinkannya untuk
di-multiplex, diprioritaskan, dan diproses secara individu oleh klien. Satu-satunya
pembatasan keamanan, sebagaimana ditegakkan oleh browser, adalah bahwa sumber daya yang didorong harus
mematuhi kebijakan sumber yang sama: server harus otoritatif untuk materi
yang disediakan.

## Kompresi header

Setiap transfer HTTP membawa seperangkat header yang menjelaskan sumber daya
yang ditransfer dan sifatnya. Di HTTP/1.x, metadata ini selalu dikirimkan sebagai teks
biasa dan menambahkan di mana saja dari 500-800 byte overhead per transfer, dan
terkadang lebih beberapa kilobyte jika cookie HTTP sedang digunakan. (Lihat 
[Mengukur dan Mengontrol Overhead Protokol](https://hpbn.co/http1x/#measuring-and-controlling-protocol-overhead)
.) Untuk mengurangi overhead ini dan meningkatkan kinerja, HTTP/2 mengompresi permintaan
dan merespons metadata header menggunakan format kompresi HPACK yang menggunakan dua
teknik yang sederhana namun kuat:

1. Bidang-bidang header yang diansmisikan boleh dienkodekan melalui kode Huffman 
   statis, yang mengurangi ukuran transfer individunya.
2. Klien dan server harus menjaga dan memperbarui daftar
   yang diindeks dari bidang header yang tampak sebelumnya (dengan kata lain, teknik ini menetapkan konteks
   kompresi bersama), yang digunakan sebagai referensi untuk mengenkode
   nilai yang ditransmisi sebelumnya dengan efisien.

Pengkodean Huffman memungkinkan nilai individu untuk dikompresikan saat ditransfer,
dan daftar indeks nilai yang ditransfer sebelumnya memungkinkan kita untuk mengenkode
nilai duplikasi dengan mentransfer nilai indeks yang dapat digunakan secara efisien
untuk mencari dan merekonstruksi kunci dan nilai header penuh.

![HPACK: Kompresi Header untuk HTTP/2](images/header_compression01.svg)

Saat optimasi berlanjut, konteks kompresi HPACK terdiri atas
tabel statis dan dinamis: tabel statis didefinisikan dalam spesifikasi dan
menyediakan daftar bidang header HTTP umum dengan semua koneksi kemungkinkan akan
menggunakan (mis, nama header yang valid); tabel dinamis awalnya konsong dan di
perbarui berdasarkan nilai yang dipertukarkan di dalam koneksi tertentu. Hasilnya,
ukuran setiap permintaan dikurangi dengan menggunakan pengkodean Huffman statis untuk nilai
yang belum tampak sebelumnya, dan pengganti indeks untuk nilai yang
sudah ada di tabel statis atau dinamis di setiap sisi.

Note: Definisi bidang header permintaan dan respons di HTTP/2 tetap
tidak berubah, dengan beberapa pengecualian kecil: semua nama bidang header ditulis dengan huruf kecil,
dan garis permintaan kini terpisah menjadi individu bidang pseudo-header `:method`, `:scheme`, 
`:authority`, dan `:path`.

### Keamanan dan kinerja HPACK

Versi HTTP/2 dan SPDY sebelumnya digunakan zlib, dengan kamus khusus, untuk
mengompresi semua header HTTP. Versi ini mengirimkan pengurangan 85% hingga 88% dalam ukuran
data header yang ditransfer, dan peningkatan signifikan dalam latensi
waktu muat laman:

> Pada tautan DSL bandwith-rendah, dengan tautan unggah hanya 375 Kbps,
> kompresi header permintaan tertentu, dapat mengarah ke peningkatan waktu muat laman signifikan
> untuk situs tertentu (dengan kata lain, yang mengeluarkan jumlah besar
> permintaan sumber daya). Kami menemukan pengurangan 45-1142 md di waktu muat laman
> yang hanya terkait dengan kompresi header. [*(SPDY whitepaper,
> chromium.org)*](https://www.chromium.org/spdy/spdy-whitepaper)

Namun, pada musim panas tahun 2012, serangan keamanan "CRIME" dipublikasikan terhadap algoritme kompresi
TLS dan SPDY, yang dapat mengakibatkan pembajakan sesi. Hasilnya, algoritme kompresi zlib digantikan dengan HPACK yang
secara khusus
dirancang untuk: mengatasi masalah keamanan yang ditemukan, efisien
dan sederhana untuk diimplementasikan dengan benar, dan tentunya, mengaktifkan kompresi yang baik terhadap
metadata header HTTP.

Untuk detail selengkapnya tentang algoritme kompresi HPACK, lihat
<https://tools.ietf.org/html/draft-ietf-httpbis-header-compression>.

## Bacaan Lebih Lanjut:

* [“HTTP/2”](https://hpbn.co/http2/){: .external } 
    – Artikel lengkap oleh Ilya Grigorik
* [“Setting up HTTP/2”](https://surma.link/things/h2setup/){: .external } 
    – Bagaimana menyiapkan HTTP/2 di berbagai backends oleh Surma
* [“HTTP/2 is here,
  let’s optimize!”](https://docs.google.com/presentation/d/1r7QXGYOLCh4fcUq0jDdDwKJWNqWK1o4xMtYpKZCJYjM/edit#slide=id.p19)
    – Presentasi oleh Ilya Grigorik dari Velocity 2015
* [“Rules of Thumb for HTTP/2 Push”](https://docs.google.com/document/d/1K0NykTXBbbbTlv60t5MyJvXjqKGsCVNYHyLEXIxYMv0/edit) 
    – Analisis oleh Tom Bergan, Simon Pelchat, dan Michael Buettner tentang kapan dan bagaimana menggunakan push.


{# wf_devsite_translation #}
