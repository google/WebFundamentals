project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Panduan untuk mendesain pengalaman web bagi jaringan yang lambat dan offline.

{# wf_updated_on: 2016-11-10 #}
{# wf_published_on: 2016-11-10 #}

# Pertimbangan UX Offline {: .page-title }

{% include "web/_shared/contributors/mustafa.html" %}

Artikel ini akan mengamati beberapa pertimbangan desain yang dibutuhkan untuk menciptakan
pengalaman hebat di jaringan yang lambat dan offline.

Kualitas koneksi jaringan bisa dipengaruhi oleh sejumlah faktor
seperti:

* Jangkauan jaringan yang buruk dari penyedia. 
* Kondisi cuaca yang ekstrem.
* Pemadaman listrik.
* Pengguna yang bepergian ke “zona mati” seperti gedung yang memblokir
  koneksi jaringan mereka. 
* Bepergian dengan kereta dan memasuki terowongan.
* Koneksi Internet dikelola oleh pihak ketiga dan diberi jangka waktu kapan
  akan aktif atau tidak aktif, seperti di bandara atau hotel.
* Kebiasaan budaya yang mengharuskan akses internet terbatas atau tidak ada pada
  waktu-waktu atau hari-hari tertentu.

Sasaran Anda adalah menyediakan pengalaman bagus yang akan mengurangi dampak perubahan
konektivitas. 

## Apa yang akan ditampilkan kepada pengguna bila mereka memiliki koneksi jaringan yang buruk?

Pertanyaan pertama yang harus diajukan adalah: seperti apa koneksi jaringan
yang sukses dan gagal? Koneksi yang sukses adalah pengalaman
online normal pada aplikasi Anda. Akan tetapi, kegagalan koneksi bisa berupa status offline
aplikasi Anda serta bagaimana perilaku aplikasi bila ada jaringan yang tersendat.

Bila memikirkan tentang koneksi jaringan yang sukses atau gagal, Anda perlu
menanyakan pada diri sendiri beberapa pertanyaan UX yang penting ini:

* Berapa lama Anda menunggu untuk menentukan sukses atau gagalnya koneksi? 
* Apa yang bisa Anda lakukan selagi menentukan sukses atau gagalnya? 
* Apa yang harus Anda lakukan bila terjadi kegagalan?
* Bagaimana Anda memberi tahu pengguna mengenai hal di atas?

### Beri tahu pengguna mengenai status saat ini dan perubahan status

Beri tahu pengguna kedua tindakan yang tetap bisa mereka ambil bila mengalami
kegagalan jaringan dan status aplikasi saat ini. Misalnya, sebuah notifikasi
bisa berbunyi seperti ini:

> “You seem to have a bad network connection. [Not to worry!] Messages will be
“sent when the network is restored.”

<figure class="attempt-left">
  <img src="images/emojoy-toast-message.png" alt="Emojoy, aplikasi perpesanan emoji yang memberi tahu pengguna bila terjadi perubahan status.">
  <figcaption>
    Beri tahu pengguna dengan jelas bila terjadi perubahan status, sesegera mungkin.
  </figcaption>
</figure>
<figure class="attempt-right">
  <img src="images/io-toast-message.png" alt="Aplikasi I/O 2016 yang memberi tahu pengguna bila terjadi perubahan status.">
  <figcaption>
    Aplikasi Google I/O yang menggunakan desain material "toast" untuk memberi tahu pengguna bila aplikasi sedang offline.
  </figcaption>
</figure>

<div class="clearfix"></div>

### Koneksi jaringan diperbaiki atau dipulihkan

<figure class="attempt-right">
  <img src="images/weather-app.png" alt="Contoh aplikasi cuaca.">
  <figcaption>
    Sebagian aplikasi, seperti aplikasi cuaca ini, membutuhkan pembaruan otomatis karena data lama tidak digunakan oleh pengguna.
  </figcaption>
</figure>

Cara Anda memberi tahu pengguna setelah koneksi jaringan mereka diperbaiki
akan sangat bergantung pada aplikasi Anda. Bagi aplikasi yang mengharuskan
informasi pembaruan ditampilkan sebagai prioritas, misalnya aplikasi pasar saham, pembaruan otomatis
dan memberi tahu pengguna secepatnya adalah hal yang krusial.

<div class="clearfix"></div>

Anda juga dapat menampilkan waktu terakhir aplikasi diperbarui sepanjang waktu di
tempat yang mudah terlihat. Hal ini juga berguna untuk aplikasi konversi mata uang, misalnya.

<figure>
  <img class="attempt-left" src="images/material-money-rates-out-of-date.png" alt="Aplikasi Material Money yang kedaluwarsa">
  <img class="attempt-right" src="images/material-money-rates-updated.png" alt="Material Money telah diperbarui">
  <figcaption class="clearfix">
    Material Money menampilkan mata uang terkini bila memungkinkan dan memberi tahu
    pengguna bila aplikasi belum diperbarui.
  </figcaption>
</figure>

Aplikasi lainnya seperti aplikasi berita bisa menampilkan notifikasi sederhana yang memberi tahu
pengguna bahwa ada materi lebih baru, dengan fungsi ketuk-untuk-perbarui. Alasan
melakukannya adalah jika pengguna saat ini membaca artikel, pembaruan otomatis akan
menyegarkan laman dan mereka akan kehilangan posisi membaca terakhir.


<figure>
  <img class="attempt-left" src="images/tailpiece-normal.png" alt="Contoh aplikasi berita, Tailpiece saat dalam keadaan normal">
  <img class="attempt-right" src="images/tailpiece-tap-to-update.png" alt="Contoh aplikasi berita, Tailpiece bila sudah siap diperbarui">
  <figcaption class="clearfix">
    Tailpiece, koran online, akan mengunduh berita terkini secara otomatis namun
    memungkinkan pengguna menyegarkan secara manual sehingga mereka tidak kehilangan posisi di artikel.
  </figcaption>
</figure>

### Status kontekstual dan mode menjelajah

Setiap bagian UI dapat memiliki konteks dan fungsionalitasnya sendiri yang akan berubah,
bergantung pada apakah memerlukan koneksi yang berhasil atau tidak. Salah satu contohnya adalah
situs e-niaga yang bisa dijelajahi offline walaupun tombol Beli dan harga
dinonaktifkan hingga koneksinya pulih.

Bentuk status kontekstual lainnya bisa menyertakan data. Misalnya, aplikasi
keuangan Robinhood memungkinkan pengguna membeli saham serta menggunakan warna dan grafik
untuk memberi tahu pengguna bila pasar sudah buka. Keseluruhan antarmuka berubah jadi putih
kemudian jadi abu-abu bila pasar tutup. Bila nilai saham bertambah atau
berkurang, masing-masing widget saham akan berubah jadi hijau atau merah, bergantung pada
statusnya.

### Didiklah pengguna agar mereka memahami apa yang dimaksud dengan model offline

Offline adalah model mental baru bagi semua orang. Anda perlu mendidik pengguna tentang
perubahan apa yang akan terjadi bila mereka tidak memiliki koneksi. Beri tahu mereka tempat
menyimpan data besar dan berikan setelan untuk mengubah perilaku default. Pastikan
Anda menggunakan komponen multidesain UI seperti bahasa informatif, ikon,
notifikasi, warna dan gambar untuk menyampaikan gagasan ini secara kolektif, bukan
mengandalkan satu perangkat desain, seperti ikon itu sendiri, untuk memberi tahu
keseluruhan cerita.

## Menyediakan pengalaman offline secara default 

Jika aplikasi Anda tidak memerlukan banyak data, maka simpan data itu di cache secara default. Pengguna bisa
menjadi semakin frustrasi jika mereka hanya bisa mengakses data dengan
koneksi jaringan. Cobalah membuat pengalaman sestabil mungkin. Koneksi yang
tidak stabil akan membuat aplikasi Anda terkesan tidak bisa dipercaya, sehingga aplikasi
yang bisa mengurangi dampak kegagalan jaringan akan dirasa ajaib oleh pengguna.

Situs berita bisa memanfaatkan pengunduhan dan penyimpanan otomatis
materi berita terbaru hari ini sehingga pengguna bisa membaca berita hari ini tanpa koneksi,
mungkin sambil mengunduh teks tanpa gambar artikel. Juga adaptasikan dengan
perilaku pengguna jadi jika bagian olahraga adalah yang biasanya mereka tampilkan, mungkin
jadikan ini sebagai data prioritas yang diunduh.

<figure>
  <img class="attempt-left" src="images/tailpiece-offline.png" alt="Tailpiece memberi tahu pengguna bahwa mereka sedang offline dengan beragam widget desain">
  <img class="attempt-right" src="images/tailpiece-offline-sidebar.png" alt="Tailpiece memiliki gambar navigasi yang menampilkan bagian apa saja yang siap untuk penggunaan offline.">
  <figcaption class="clearfix">
    Jika perangkat sedang offline, Tailpiece akan memberi tahu pengguna dengan sebuah pesan status
    yang memungkinkan mereka mengetahui bahwa mereka tetap bisa menggunakan aplikasi.
  </figcaption>
</figure>

## Memberi tahu pengguna bila aplikasi siap untuk digunakan secara offline 

Bila sebuah aplikasi web dimuat pertama kali, Anda perlu menunjukkan kepada pengguna apakah aplikasi tersebut siap
untuk digunakan secara offline. Lakukan ini dengan
[widget yang menyediakan masukan singkat](https://material.google.com/components/snackbars-toasts.html "widget that provides brief feedback")
tentang suatu operasi melalui pesan di bagian bawah layar, 
misalnya bila suatu bagian telah disinkronkan atau file data telah diunduh.

Pikirkan lagi bahasa yang Anda gunakan untuk memastikan bahasa itu cocok dengan
pengguna Anda. Pastikan perpesanan diberikan sama di semua instance
penggunaannya. Istilah offline umumnya disalahpahami oleh pengguna yang gaptek jadi
gunakan bahasa berbasis aksi yang bisa dikaitkan oleh pengguna Anda.


<figure>
  <img class="attempt-left" src="images/io-offline-ready.png" alt="Aplikasi I/O offline">
  <img class="attempt-right" src="images/chome-offline.png" alt="Situs Chrome Status sedang offline">
  <figcaption class="clearfix">
    Baik aplikasi Google I/O 2016 maupun situs Chrome Status memberi tahu pengguna bila
    aplikasi siap untuk penggunaan offline.
  </figcaption>
</figure>

### Jadikan 'simpan untuk offline' sebagai bagian antarmuka yang kentara bagi aplikasi yang banyak menggunakan data

Jika sebuah aplikasi menggunakan data dalam jumlah besar, pastikan ada switch
atau pin untuk menambahkan item bagi penggunaan offline, bukan mengunduh otomatis, kecuali jika
pengguna secara spesifik meminta perilaku ini lewat menu setelan. Pastikan
UI unduh atau pin tidak terhalang oleh elemen UI lain dan
fitur terlihat jelas oleh pengguna.


Salah satu contoh adalah pemutar musik yang memerlukan file data besar. Pengguna
menyadari biaya data yang bersangkutan, juga menyadari bahwa mereka mungkin ingin menggunakan
pemutar tersebut saat sedang offline. Mengunduh musik untuk digunakan nanti mengharuskan
pengguna merencanakan terlebih dahulu, jadi edukasi tentang hal ini mungkin diperlukan selama
orientasi.

### Klarifikasi apa yang bisa diakses secara offline 

Perjelas mengenai opsi yang Anda sediakan. Anda mungkin perlu menampilkan tab atau
setelan yang menampilkan “perpustakaan offline”, jadi pengguna bisa dengan mudah melihat apa
yang telah mereka simpan di ponsel dan apa yang perlu disimpan. Pastikan setelan
ringkas dan jelas di mana data akan disimpan dan siapa yang bisa mengaksesnya.

### Tampilkan biaya sesungguhnya dari suatu aksi

Banyak pengguna yang menyamakan kemampuan offline dengan 'mengunduh'. Pengguna di negara-negara
yang koneksi jaringannya sering gagal atau tidak tersedia sering berbagi materi
dengan pengguna lain, atau menyimpan materi untuk penggunaan offline saat mereka memiliki konektivitas.

Pengguna yang memiliki paket data mungkin menghindari pengunduhan file besar karena takut dengan biayanya, jadi Anda
mungkin perlu juga menampilkan biaya terkait agar pengguna bisa membuat
perbandingan aktif untuk file atau tugas yang spesifik.  Misalnya, jika aplikasi musik di atas
bisa mendeteksi apakah pengguna sedang menggunakan paket data dan menampilkan ukuran file agar
pengguna bisa melihat biaya file sesungguhnya.

### Bantu mencegah pengalaman yang diretas 

Sering kali pengguna meretas pengalaman tanpa menyadarinya. Misalnya
sebelum ada aplikasi berbagi lewat awan seperti Google Drive, umumnya pengguna menyimpan
file besar dan melampirkannya ke email sehingga mereka bisa melanjutkan pengeditan dari
perangkat berbeda. Jangan terbawa ke dalam pengalaman yang mereka retas, melainkan
perhatikan apa yang berusaha mereka capai. Dengan kata lain, sebagai ganti memikirkan
bagaimana Anda bisa membuat penyertaan lampiran besar lebih ramah pengguna, lebih baik pecahkan
masalah berbagi file besar di banyak perangkat.

## Pengalaman yang bisa ditransfer dari satu perangkat ke perangkat lainnya

Saat membuat suatu pengalaman dengan koneksi jaringan yang tidak bisa diandalkan, usahakan menyinkronkan
dengan benar setelah koneksi diperbaiki sehingga pengalaman bisa ditransfer.
Misalnya, bayangkan suatu aplikasi perjalanan yang koneksi jaringannya terputus di saat sedang memproses
pemesanan. Bila koneksi pulih, aplikasi akan menyinkronkan dengan akun pengguna
dan mereka kemudian bisa melanjutkan pemesanan di perangkat desktop. Ketidakmampuan
mentransfer pengalaman (aktivitas) adalah hal yang sangat menyakitkan pada pengguna.

Beri tahu pengguna mengenai status data mereka saat ini, misalnya aplikasi telah
berhasil menyinkronkan atau tidak. Didiklah mereka bila memungkinkan, namun usahakan tidak membebani
mereka dengan perpesanan.

## Buat pengalaman desain yang inklusif 

Saat mendesain, usahakan inklusif dengan menyediakan perangkat desain penting,
bahasa sederhana, ikonografi standar, dan gambar penting yang akan memandu
pengguna menyelesaikan aksi atau tugas, daripada mengganggu kemajuan mereka.

### Jadikan bahasa ringkas dan sederhana sebagai panduan

UX yang baik bukan cuma antarmuka yang didesain dengan baik. Ini meliputi alur yang diambil pengguna
serta bahasa yang digunakan dalam aplikasi. Hindari menggunakan jargon teknologi saat
menjelaskan status aplikasi atau masing-masing komponen UI. Perhatikan bahwa
frasa “aplikasi offline” mungkin tidak menjelaskan status aplikasi saat ini kepada pengguna.

<div class="attempt-left">
  <figure>
    <img src="images/download.png" alt="Contoh ikon Download adalah contoh yang baik">
    <figcaption class="success">
      <b>LAKUKAN</b>: Gunakan bahasa dan gambar yang menjelaskan aksi.
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/service-worker-ready.png" alt="Contoh ikon Service Worker adalah contoh yang jelek">
    <figcaption class="warning">
      <b>JANGAN</b>: Hindari istilah abstrak yang mungkin tidak dapat diakses. 
     </figcaption>
  </figure>
</div>
<div class="clearfix"></div>


### Gunakan beberapa perangkat desain untuk membuat pengalaman pengguna yang bisa diakses

Gunakan bahasa, warna dan komponen visual untuk memperagakan perubahan status atau
status saat ini. Cuma menggunakan warna untuk memperagakan status mungkin tidak akan diperhatikan oleh
pengguna, dan mungkin tidak bisa diakses oleh pengguna yang memiliki cacat penglihatan.
Juga, naluri bawaan desainer adalah menggunakan UI abu-abu untuk menyatakan offline,
namun hal ini bisa memiliki banyak makna di web. UI abu-abu juga digunakan untuk menyatakan
bahwa suatu elemen dinonaktifkan, misalnya elemen masukan di formulir. Ini bisa menyebabkan
kebingungan jika Anda HANYA menggunakan warna untuk menyatakan status.

Untuk mencegah kesalahpahaman, nyatakan status berbeda kepada pengguna dalam beberapa
cara: misalnya dengan warna, label, dan komponen UI.

<div class="attempt-left">
  <figure>
    <img src="images/accessibility_color7_do.png" alt="Contoh bagus yang menggunakan warna dan teks untuk menampilkan kesalahan.">
    <figcaption class="success">
      <b>LAKUKAN</b>: Gunakan campuran elemen desain untuk menyampaikan arti
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/accessibility_color8_dont.png" alt="Contoh buruk hanya menggunakan warna.">
    <figcaption class="warning">
      <b>JANGAN</b>: Hanya gunakan warna untuk menjelaskan apa yang sedang terjadi.
     </figcaption>
  </figure>
</div>

<div class="clearfix"></div>

### Gunakan ikon untuk menyampaikan arti 

Pastikan informasi disampaikan dengan benar melalui label pesan teks yang bermakna
begitu juga dengan ikon. Ikon sendiri bisa menjadi problematik, karena konsep offline di
web relatif baru. Pengguna bisa salah memahami ikon yang digunakan. Misalnya,
menggunakan disket floppy untuk menyimpan bisa dipahami oleh generasi lama, namun
para pengguna muda yang tidak pernah melihat disket bisa bingung dengan metafora tersebut.
Demikian pula, ikon menu 'hamburger' diketahui membingungkan pengguna bila
ditampilkan tanpa label.


Saat memperkenalkan ikon offline, cobalah tetap konsisten dengan
visual standar industri (jika ada) serta menyediakan label teks dan
keterangan. Misalnya, menyimpan untuk offline mungkin berupa ikon unduh yang sudah umum atau
barangkali jika aksi melibatkan sinkronisasi maka bisa berupa ikon sinkronisasi. Sebagian tindakan
mungkin akan ditafsirkan sebagai menyimpan untuk offline bukannya memperagakan
status jaringan. Pikirkan aksi yang Anda coba sampaikan, bukan menyajikan
konsep abstrak kepada pengguna. Misalnya, simpan atau unduh data akan berbasis
aksi.

<img src="images/download-icons-exampels.png" alt="Beragam contoh ikon yang menyampaikan makna offline">

Offline bisa berarti banyak hal, bergantung pada konteks, misalnya unduh, 
ekspor, pin, dll.. Untuk inspirasi selengkapnya, periksa
[set ikon desain material](https://material.io/icons/ "material design icon set")

### Gunakan layout kerangka dengan mekanisme masukan lainnya 

Layout kerangka pada dasarnya adalah versi wireframe dari aplikasi Anda yang ditampilkan
saat materi sedang dimuat. Ini membantu memperagakan kepada pengguna bahwa materi
akan dimuat. Pertimbangkan juga menggunakan UI preloader, bersama
label teks yang memberi tahu pengguna bahwa aplikasi sedang dimuat. Salah satu contoh adalah
mengembangkempiskan materi wireframe sehingga memberi kesan aplikasi hidup dan
sedang dimuat. Ini akan meyakinkan pengguna bahwa sesuatu sedang terjadi dan membantu mencegah
pengiriman ulang atau penyegaran aplikasi Anda.

<figure>
  <img class="attempt-left" src="images/tailpiece-skel-article.png" alt="Contoh layout kerangka">
  <img class="attempt-right" src="images/tailpiece-normal.png" alt="contoh artikel yang dimuat">
  <figcaption class="clearfix">
    Sebelum dan setelah layout kerangka.
  </figcaption>
</figure>

### Jangan blokir materi

Di sebagian aplikasi, pengguna mungkin memicu suatu aksi misalnya membuat
dokumen baru. Sebagian aplikasi akan mencoba menghubungkan ke server agar dapat menyinkronkan
dokumen baru dan untuk memperagakannya, mereka menampilkan dialog modal pemuatan intrusif
yang mencakup seluruh layar. Hal ini mungkin berfungsi dengan baik jika pengguna memiliki
koneksi jaringan yang stabil, namun jika jaringan tidak stabil, mereka tidak akan bisa lari dari
aksi ini dan UI secara efektif memblokirnya dari melakukan hal lain.
Permintaan jaringan yang memblokir materi seharusnya dihindari. Perbolehkan pengguna
melanjutkan menjelajah aplikasi Anda dan mengantre tugas yang akan dilaksanakan dan disinkronkan
setelah koneksi diperbaiki.

Peragakan status tindakan dengan menyediakan masukan kepada pengguna. Misalnya,
jika pengguna mengedit dokumen, pertimbangkan mengubah desain masukan sehingga
terlihat berbeda dari saat online namun tetap menunjukkan bahwa file
mereka telah “disimpan” dan akan disinkronkan bila mereka mendapatkan koneksi jaringan. Hal ini akan mengajarkan kepada
pengguna tentang beragam status yang tersedia dan meyakinkan mereka bahwa tugas
atau aksi mereka telah disimpan. Hal ini memiliki manfaat tambahan berupa pengguna yang semakin
percaya diri dalam menggunakan aplikasi Anda.

## Mendesain untuk miliaran pengguna berikutnya

Di banyak region, perangkat kelas-bawah adalah hal umum, konektivitas tidak dapat diandalkan
dan, bagi banyak pengguna, data tidak terjangkau. Anda nanti perlu mendapatkan kepercayaan pengguna dengan
bersikap transparan dan hemat dengan data. Pikirkan tentang berbagai cara untuk membantu pengguna yang memiliki
koneksi jelek dan sederhanakan antarmuka untuk membantu mempercepat tugas. Cobalah selalu menanyakan kepada
pengguna sebelum mengunduh materi yang sarat-data.

Tawarkan opsi bandwidth rendah untuk pengguna yang koneksinya lambat. Jadi jika koneksi jaringan
lambat, sediakan aset kecil. Tawarkan opsi untuk memilih aset berkualitas
tinggi atau rendah.

## Kesimpulan

Edukasi adalah kunci dalam hal ini karena pengguna tidak familier dengan berbagai konsep ini. Cobalah untuk
membuat asosiasi dengan hal-hal yang sudah familier, mis. mengunduh untuk digunakan nanti
adalah sama dengan data offline.


Saat mendesain untuk koneksi jaringan yang tidak stabil, gunakan ini: 

* Pikirkan bagaimana Anda mendesain untuk koneksi jaringan yang
  sukses, gagal, dan tidak stabil.
* Data mungkin mahal, jadi bersikaplah tenggang rasa kepada pengguna.
* Bagi sebagian besar pengguna global, lingkungan teknologi hampir semua mobile secara eksklusif.
* Perangkat kelas-bawah adalah hal yang sudah umum, dengan storage, memori dan daya 
  pemrosesan yang terbatas serta, tampilan kecil dan kualitas layar sentuh yang lebih rendah. Pastikan kinerja 
  adalah bagian dari proses desain Anda. 
* Perbolehkan pengguna menjelajah aplikasi Anda saat mereka offline.
* Beri tahu pengguna mengenai status mereka saat ini dan perubahan status.
* Cobalah menyediakan offline secara default jika aplikasi Anda tidak memerlukan banyak data.
* Jika aplikasi sarat data, didiklah pengguna tentang cara mengunduh untuk
  penggunaan offline.
* Buatlah agar pengalaman dapat ditransfer antar perangkat.
* Manfaatkan bahasa, ikon, gambar, tipografi dan warna untuk mengekspresikan gagasan kepada 
  pengguna secara kolektif.
* Berikan keyakinan dan masukan untuk membantu pengguna.


{# wf_devsite_translation #}
