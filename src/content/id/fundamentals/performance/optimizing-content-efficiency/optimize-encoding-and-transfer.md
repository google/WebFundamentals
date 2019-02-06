project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Selain menghapus hasil download resource yang tidak diperlukan, hal terbaik yang bisa dilakukan untuk meningkatkan kecepatan pemuatan halaman adalah meminimalkan ukuran download keseluruhan dengan mengoptimalkan dan mengompresi resource yang tersisa.

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2014-03-31 #}
{# wf_blink_components: Blink>Network #}

# Mengoptimalkan Encoding dan Ukuran Transfer Aset Berbasis Teks {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

Selain menghapus hasil download resource yang tidak diperlukan, hal terbaik yang bisa dilakukan untuk
meningkatkan kecepatan pemuatan halaman adalah meminimalkan ukuran download keseluruhan dengan mengoptimalkan dan
mengompresi resource yang tersisa.


## Kompresi data 101

Setelah Anda menghapus resource yang tidak diperlukan, langkah selanjutnya adalah mengompresi
resource yang tersisa yang harus didownload oleh browser. Bergantung pada jenis
resource&mdash;teks, gambar, font, dan sebagainya&mdash;ada banyak teknik berbeda
yang bisa dipilih: fitur generik yang dapat diaktifkan di server, pra-pemrosesan
optimasi untuk tipe konten tertentu, dan resource optimasi khusus yang
memerlukan input dari developer.

Memberikan kinerja terbaik memerlukan kombinasi dari semua teknik ini.

### TL;DR {: .hide-from-toc }

* Kompresi adalah proses encoding informasi menggunakan lebih sedikit bit.
* Menghapus data yang tidak diperlukan akan menghasilkan hasil terbaik.
* Ada banyak teknik dan algoritme kompresi yang berbeda.
* Anda membutuhkan berbagai teknik untuk mencapai kompresi terbaik.


Proses mengurangi ukuran data adalah *kompresi data*. Banyak orang yang telah
melibatkan algoritme, teknik, dan optimalisasi untuk meningkatkan rasio kompresi,
kecepatan, dan kebutuhan memori beragam kompresor. Diskusi lengkap tentang kompresi
data berada di luar cakupan topik ini. Akan tetapi, penting untuk dipahami,
pada tingkat atas, cara kerja kompresi dan teknik yang bisa Anda gunakan untuk mengurangi
ukuran beragam aset yang dibutuhkan oleh halaman Anda.

Untuk mengilustrasikan prinsip inti dari teknik-teknik ini, pertimbangkan proses
optimalisasi sebuah format pesan teks sederhana yang telah ditemukan khusus untuk contoh ini:

    # Below is a secret message, which consists of a set of headers in
    # key-value format followed by a newline and the encrypted message.
    format: secret-cipher
    date: 08/25/16
    AAAZZBBBBEEEMMM EEETTTAAA

1. Pesan mungkin berisi anotasi arbitrer, yang ditunjukkan dengan prefiks "#".
 Anotasi tidak memengaruhi makna atau perilaku pesan lainnya.
2. Pesan mungkin berisi *header*, yang merupakan sepasang nilai kunci (dipisahkan dengan ":")
 yang muncul di awal pesan.
3. Pesan membawa payload teks.

Apa yang bisa Anda lakukan untuk mengurangi ukuran pesan di atas, yang saat ini adalah
200 karakter?

1. Komentarnya menarik, namun sebenarnya hal ini tidak memengaruhi arti pesannya.
 Hapus saat mengirim pesan.
2. Ada beberapa teknik bagus untuk mengenkode header dengan cara yang efisien. Misalnya,
 jika tahu bahwa semua pesan memiliki "format" dan "tanggal", Anda bisa mengonversinya
 menjadi ID integer pendek dan mengirimnya saja. Akan tetapi, itu mungkin tidak benar, jadi
 biarkan saja untuk saat ini.
3. Payload hanya teks, dan meski kita tidak tahu isi sebenarnya
 (kelihatannya menggunakan "pesan-rahasia"), hanya dengan melihat teksnya akan tampak
 ada banyak redundansi di dalamnya. Daripada mengirim huruf berulang,
 Anda cukup menghitung jumlah huruf berulang dan mengenkodenya secara lebih efisien.
 Misalnya, "AAA" menjadi "3A", yang menyatakan urutan tiga A.


Menggabungkan teknik ini akan memberikan hasil berikut:

    format: secret-cipher
    date: 08/25/16
    3A2Z4B3E3M 3E3T3A

Pesan baru panjangnya 56 karakter, yang berarti secara mengesankan Anda berhasil mengompresi pesan
asal sebesar 72%.

Bagus, namun bagaimana hal ini bisa membantu kita mengoptimalkan halaman web? Kita tidak akan
mencoba menemukan algoritme kompresi, namun seperti yang akan Anda lihat, kita bisa menggunakan
teknik dan proses pemikiran yang persis sama saat mengoptimalkan beragam resource di
halaman: pra-pemrosesan, optimalisasi konteks tertentu, dan berbagai algoritme
untuk konten yang berbeda.


## Minifikasi: pra-pemrosesan & optimalisasi konteks tertentu

### TL;DR {: .hide-from-toc }

- Optimalisasi konten tertentu secara signifikan bisa mengurangi ukuran resource yang dikirimkan.
- Optimalisasi konten tertentu paling baik diterapkan sebagai bagian dari siklus build/rilis.


Cara terbaik untuk mengompresi data yang redundan atau tidak diperlukan adalah menghilangkannya sama sekali.
Kita tidak bisa begitu saja menghapus data arbitrer, namun dalam beberapa konteks, kita mungkin memiliki pengetahuan
mengenai konten tertentu dengan format data dan propertinya, sering kali bisa saja
mengurangi ukuran payload secara signifikan tanpa memengaruhi arti sebenarnya.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/optimizing-content-efficiency/_code/minify.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/optimizing-content-efficiency/minify.html){: target="_blank" .external }

Pertimbangkan halaman HTML sederhana di atas dan tiga tipe konten yang berbeda yang
berisi: Markup HTML, gaya CSS, dan JavaScript. Masing-masing tipe konten ini memiliki
aturan berbeda yang membentuk konten valid, aturan berbeda untuk menandai
komentar, dan seterusnya. Bagaimana cara mengurangi ukuran halaman ini?

* Komentar kode adalah sahabat terbaik developer, namun browser tidak perlu melihatnya!
 Hanya dengan membuang komentar CSS (`/* … */`), HTML (`<!-- … -->`), dan JavaScript (`// …`)
 bisa mengurangi total ukuran halaman secara signifikan.
* Kompresor CSS yang "cerdas" bisa mengetahui bahwa kita menggunakan cara yang tidak efisien untuk
 mendefinisikan aturan bagi ".awesome-container" dan menciutkan dua deklarasi menjadi satu
 tanpa memengaruhi gaya lainnya, sehingga lebih menghemat byte.
* Ruang putih (spasi dan tab) adalah hal mudah bagi developer dalam HTML, CSS, dan JavaScript.
 Kompresor tambahan bisa menghilangkan semua tab dan spasi.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/optimizing-content-efficiency/_code/minified.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/optimizing-content-efficiency/minified.html){: target="_blank" .external }

Setelah menerapkan langkah-langkah di atas, halaman berkurang dari 406 menjadi 150 karakter,
jadi penghematan kompresi sebesar 63%. Memang sangat tidak mudah dibaca, namun halaman memang tidak
harus begitu: Anda bisa mempertahankan halaman asal sebagai "versi development" kemudian
menerapkan langkah-langkah di atas kapan saja Anda siap merilis halaman di situs.

Mundur satu langkah ke belakang, contoh di atas mengilustrasikan poin penting: kompresor
serbaguna&mdash;katakanlah, yang didesain untuk mengompresi teks arbitrer&mdash;mungkin bisa
melakukan tugas kompresi dengan cukup baik untuk halaman di atas, namun tidak tahu cara
membuang komentar, menciutkan aturan CSS, atau lusinan optimalisasi
konten tertentu lainnya. Inilah sebabnya pra-pemrosesan/minifikasi/optimalisasi sesuai konteks
bisa menjadi fitur yang andal.

Note: Untuk kasus ini, versi development yang tidak dikompresi dari library JQuery
sekarang mendekati ~300 KB. Library yang sama, namun dikecilkan (komentarnya dibuang, dll.)
kira-kira 3x lebih kecil: ~100 KB.

Demikian pula, teknik yang dijelaskan di atas bisa diperpanjang melampaui aset berbasis teks saja.
Gambar, video, dan tipe konten lainnya semuanya mengandung bentuk metadata
dan ragam payload masing-masing. Misalnya, kapan saja Anda mengambil gambar dengan kamera,
foto itu juga biasanya menyematkan banyak informasi tambahan: setelan kamera,
lokasi, dan seterusnya. Bergantung pada aplikasi Anda, data ini mungkin sangat penting
(misalnya, situs berbagi foto), atau sama sekali tidak berguna, dan Anda harus mempertimbangkan
apakah perlu membuangnya. Dalam praktiknya, metadata ini bisa menambah hingga puluhan
kilobyte untuk setiap gambar.

Singkatnya, sebagai langkah pertama dalam mengoptimalkan efisiensi aset Anda, build
inventori berbagai macam tipe konten dan pertimbangkan jenis optimalisasi
konten tertentu yang bisa Anda terapkan untuk mengurangi ukurannya. Kemudian, setelah Anda
menemukannya, otomatiskan optimalisasi ini dengan menambahkannya ke proses build dan
proses rilis untuk memastikan optimalisasi diterapkan.

## Kompresi teks dengan GZIP

### TL;DR {: .hide-from-toc }

- Kinerja GZIP paling baik pada aset berbasis teks berikut: CSS, JavaScript, HTML.
- Semua browser modern mendukung kompresi GZIP dan akan memintanya secara otomatis.
- Server Anda harus dikonfigurasi untuk mengaktifkan kompresi GZIP.
- Sebagian CDN memerlukan penanganan khusus untuk memastikan GZIP diaktifkan.


[GZIP](https://en.wikipedia.org/wiki/Gzip) adalah kompresor generik yang bisa diterapkan
ke deretan byte. Di balik layar, GZIP akan mengingat beberapa konten yang telah dilihat sebelumnya
dan berupaya menemukan serta mengganti fragmen data duplikat secara efisien.
(Jika Anda penasaran, inilah
[penjelasan tingkat-rendah yang bagus mengenai GZIP](https://www.youtube.com/watch?v=whGwm0Lky2s&feature=youtu.be&t=14m11s).)
Akan tetapi, pada praktiknya, kinerja GZIP terbaik adalah pada konten berbasis teks, yang sering kali mencapai
tingkat kompresi hingga 70-90% untuk file lebih besar, sedangkan menjalankan GZIP
pada aset yang sudah dikompresikan lewat algoritme alternatif (misalnya,
sebagian besar format gambar) menghasilkan sedikit atau sama sekali tidak ada peningkatan.

Semua browser modern mendukung dan secara otomatis menegosiasikan kompresi GZIP untuk semua
permintaan HTTP. Anda harus memastikan server dikonfigurasi dengan benar guna menyajikan
resource yang dikompresi bila klien memintanya.


<table>
<thead>
  <tr>
    <th>Library</th>
    <th>Ukuran</th>
    <th>Ukuran dikompresi</th>
    <th>Rasio kompresi</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="library">jquery-1.11.0.js</td>
  <td data-th="size">276 KB</td>
  <td data-th="compressed">82 KB</td>
  <td data-th="savings">70%</td>
</tr>
<tr>
  <td data-th="library">jquery-1.11.0.min.js</td>
  <td data-th="size">94 KB</td>
  <td data-th="compressed">33 KB</td>
  <td data-th="savings">65%</td>
</tr>
<tr>
  <td data-th="library">angular-1.2.15.js</td>
  <td data-th="size">729 KB</td>
  <td data-th="compressed">182 KB</td>
  <td data-th="savings">75%</td>
</tr>
<tr>
  <td data-th="library">angular-1.2.15.min.js</td>
  <td data-th="size">101 KB</td>
  <td data-th="compressed">37 KB</td>
  <td data-th="savings">63%</td>
</tr>
<tr>
  <td data-th="library">bootstrap-3.1.1.css</td>
  <td data-th="size">118 KB</td>
  <td data-th="compressed">18 KB</td>
  <td data-th="savings">85%</td>
</tr>
<tr>
  <td data-th="library">bootstrap-3.1.1.min.css</td>
  <td data-th="size">98 KB</td>
  <td data-th="compressed">17 KB</td>
  <td data-th="savings">83%</td>
</tr>
<tr>
  <td data-th="library">foundation-5.css</td>
  <td data-th="size">186 KB</td>
  <td data-th="compressed">22 KB</td>
  <td data-th="savings">88%</td>
</tr>
<tr>
  <td data-th="library">foundation-5.min.css</td>
  <td data-th="size">146 KB</td>
  <td data-th="compressed">18 KB</td>
  <td data-th="savings">88%</td>
</tr>
</tbody>
</table>

Tabel di atas menampilkan penghematan yang dihasilkan oleh kompresi GZIP untuk beberapa
library JavaScript terpopuler dan framework CSS. Penghematan berkisar antara 60 sampai 88%,
dan kombinasi file yang dikecilkan (diidentifikasi sebagai “.min” dalam nama filenya),
plus GZIP, menawarkan penghematan lebih besar.

1. **Terapkan terlebih dahulu optimalisasi konten tertentu: Minifier CSS, JS, dan HTML.**
2. **Terapkan GZIP untuk mengompresi output yang diperkecil.**

Mengaktifkan GZIP adalah salah satu optimalisasi paling sederhana dengan payoff tertinggi untuk diimplementasikan,
sayangnya, banyak orang yang tidak mengimplementasikannya. Kebanyakan server web akan mengompresi konten untuk Anda,
dan Anda hanya perlu memverifikasi apakah server telah dikonfigurasi dengan benar untuk mengompresi
semua tipe konten yang memanfaatkan kompresi GZIP.

Project Boilerplate HTML5 berisi
[file konfigurasi contoh](https://github.com/h5bp/server-configs)
untuk semua server paling populer bersama komentar detail bagi setiap flag konfigurasi
dan setelan. Untuk menentukan konfigurasi terbaik bagi server Anda, lakukan hal-hal berikut:

* Cari server favorit Anda dalam daftar.
* Cari bagian GZIP.
* Konfirmasikan bahwa server Anda telah dikonfigurasi dengan setelan yang disarankan.

<img src="images/transfer-vs-actual-size.png"
  alt="Demo DevTools dari ukuran sebenarnya vs ukuran transfer">

Cara cepat dan mudah untuk melihat tindakan GZIP adalah membuka Chrome DevTools dan
memeriksa kolom “Ukuran/Konten” dalam panel Jaringan: “Ukuran” mengindikasikan
ukuran transfer aset, dan "Konten" adalah ukuran aset yang tidak dikompresi.
Untuk aset HTML dalam contoh terdahulu, GZIP menghemat 98,8 KB selama transfer.

Note: Kadang-kadang, GZIP menambah ukuran aset. Biasanya ini terjadi bila
aset sangat kecil dan overhead kamus GZIP lebih tinggi daripada
penghematan kompresinya, atau bila resource sudah dikompresi dengan baik. Untuk menghindari
masalah ini, sebagian server memungkinkan Anda menetapkan ambang batas ukuran file minimum.

Terakhir, walaupun sebagian besar server secara otomatis mengompresi aset saat menyajikannya
kepada pengguna, beberapa CDN memerlukan penanganan ekstra dan upaya manual untuk memastikan bahwa
aset GZIP disajikan. Lakukan audit situs Anda, dan pastikan bahwa aset memang,
[sedang dikompresi](http://www.whatsmyip.org/http-compression-test/).

## Masukan {: #feedback }

{% include "web/_shared/helpful.html" %}
