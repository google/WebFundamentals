project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2019-05-25 #}
{# wf_published_on: 2017-11-01 #}
{# wf_blink_components: Blink>Network,Blink>Loader #}

<!--
  Aspect ratio CSS, Copyright 2017 Google Inc
  Maintains aspect ratio in blocks that use the class, so that content doesn't
  move around as media loads.

  Adapted from https://github.com/sgomes/css-aspect-ratio
-->
<style>
.aspect-ratio {
  /* aspect-ratio custom properties */
  /* The width portion of the aspect ratio, e.g. 16 in 16:9. */
  --aspect-ratio-w: 1;
  /* The height portion of the aspect ratio, e.g. 9 in 16:9. */
  --aspect-ratio-h: 1;

  position: relative;
  max-width: 100%;
  margin-bottom: 1ex;
}

.aspect-ratio > *:first-child {
  width: 100%;
}

@supports (--custom-props: "true") {
  .aspect-ratio::before {
    display: block;
    padding-top: calc(var(--aspect-ratio-h, 1) /
        var(--aspect-ratio-w, 1) * 100%);
    content: "";
  }

  .aspect-ratio > *:first-child {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
}
</style>

# Penentuan Prioritas Resource – Mengambil Browser untuk Membantu Anda {: .page-title }

{% include "web/_shared/contributors/sgomes.html" %}

Tidak setiap byte yang dikirim melalui jaringan ke browser memiliki tingkat substansi
yang sama, dan browser mengetahui hal ini. Browser memiliki sifat heuristik yang berupaya semaksimal mungkin
menerka resource paling penting agar dimuat terlebih dahulu — seperti
CSS sebelum skrip dan gambar.

Seperti halnya sifat heuristik lainnya, tindakan ini tidak selalu berhasil; kemungkinan browser
mengambil keputusan yang salah, biasanya karena browser tidak memiliki informasi yang memadai pada
saat itu. Artikel ini menjelaskan cara memengaruhi prioritas konten
secara memadai dalam browser modern dengan memberi tahu apa yang akan Anda perlukan selanjutnya.

## Prioritas Default di Browser

Seperti disebutkan sebelumnya, browser menentukan prioritas yang relatif berbeda untuk
jenis resource yang berbeda berdasarkan seberapa penting prioritasnya. Dengan demikian, sebagai
contoh, sebuah tag `<script>` di `<head>` halaman Anda akan dimuat di Chrome pada prioritas
**High** (di bawah CSS, pada prioritas **Highest**), namun prioritas tersebut akan berubah menjadi
**Low** jika memiliki atribut asinkron (yang berarti dapat dimuat dan dijalankan
secara asinkron).

Prioritas menjadi hal penting saat menyelidiki kinerja pemuatan di situs Anda.
Di samping teknik
[pengukuran](/web/fundamentals/performance/critical-rendering-path/measure-crp)
dan
[menganalisis jalur render penting](/web/fundamentals/performance/critical-rendering-path/analyzing-crp) yang biasa,
sangat penting untuk mengetahui prioritas Chrome bagi setiap resource. Anda dapat menemukannya di
panel Network pada Chrome Developer Tools. Berikut tampilannya:


<figure>
  <div class="aspect-ratio"
       style="width: 1810px; --aspect-ratio-w: 1810; --aspect-ratio-h: 564">
    <img src="images/res-prio-priorities.png"
    alt="Contoh bagaimana prioritas ditampilkan pada Chrome Developer Tools">
  </div>
  <figcaption><b>Gambar 1</b>: Prioritas di Chrome Developer Tools. Anda mungkin
  perlu mengaktifkan kolom Prioritas dengan mengklik kanan header kolom.
  </figcaption>
</figure>


Prioritas ini memberikan ide tentang seberapa pentingnya
atribut browser tersebut untuk setiap resource. Dan ingat bahwa perbedaan kecil
cukup bagi browser untuk menetapkan prioritas yang berbeda; misalnya, sebuah gambar
yang merupakan bagian dari render awal diprioritaskan lebih tinggi daripada gambar yang
dimulai di luar layar. Jika penasaran tentang prioritas, baca
[artikel dari Addy Osmani](https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf){: .external}
menggali lebih dalam mengenai status prioritas saat ini di Chrome.

Jadi, apa yang dapat Anda lakukan jika menemukan resource yang ditandai dengan prioritas
yang berbeda dari yang Anda inginkan?

Artikel ini menguraikan tiga solusi deklaratif, yang semuanya
merupakan jenis `<link>` yang relatif baru. Jika resource Anda sangat penting bagi pengalaman
pengguna namun dimuat dengan prioritas relatif rendah, Anda dapat mencoba memperbaikinya dengan
salah satu dari dua cara berikut: preload atau preconnect. Di samping itu, jika Anda menginginkan
browser tersebut mengambil beberapa resource hanya ketika selesai menangani resource
yang lain, coba lakukan prefetch.

Mari kita lihat ketiganya!

## Preload

`<link rel="preload">` memberi tahu browser bahwa resource diperlukan sebagai
bagian dari navigasi saat ini, dan harus mulai diambil sesegera
mungkin. Berikut ini cara Anda menggunakannya:

    <link rel="preload" as="script" href="super-important.js">
    <link rel="preload" as="style" href="critical.css">

Sebagian besar mungkin yang sudah Anda harapkan, kecuali mungkin untuk atribut
“sebagai”. Hal ini memungkinkan Anda memberi tahu browser tentang jenis resource yang sedang Anda
muat, sehingga dapat ditangani dengan tepat. Browser tersebut tidak menggunakan
resource yang dimuat sebelumnya kecuali jika jenis yang tepat sudah ditetapkan. Resource
dimuat dengan prioritas yang sama seperti sebelumnya, namun sekarang browser mengetahui
tentang hal ini lebih awal, yang memungkinkan proses download dimulai lebih cepat.

Perhatikan bahwa `<link rel="preload">` adalah instruksi wajib untuk browser;
tidak seperti petunjuk resource lain yang akan kita bahas, ini adalah sesuatu
yang harus dilakukan browser, bukan semata-mata petunjuk opsional. Hal ini membuatnya
sangat penting untuk mengujinya dengan saksama, guna memastikan Anda secara tidak sengaja menyebabkan
sesuatu diambil dua kali dengan menggunakannya, atau mengambil sesuatu yang tidak diperlukan.

Resource yang diambil menggunakan `<link rel="preload">`, namun tidak digunakan oleh
halaman saat ini dalam 3 detik akan memicu peringatan pada Konsol di Chrome
Developer Tools, jadi pastikan agar tetap memperhatikan hal ini!

<figure>
  <div class="aspect-ratio"
       style="width: 1050px; --aspect-ratio-w: 1050; --aspect-ratio-h: 244">
    <img src="images/res-prio-timeout.png"
    alt="Contoh error waktu tunggu preload di Chrome Developer Tools">
  </div>
</figure>

### Kasus penggunaan: Font

Font adalah contoh yang tepat dari resource yang harus diambil, yang terakhir ditemukan,
seringkali berada di bagian bawah salah satu dari beberapa file CSS yang dimuat oleh suatu halaman.

Dalam rangka mengurangi jumlah waktu tunggu pengguna untuk konten teks
situs Anda, serta menghindari konflik antara font sistem dan
font yang dipilih, Anda dapat menggunakan `<link rel="preload">` di HTML agar
browser segera mengetahui bahwa font diperlukan.

    <link rel="preload" as="font" crossorigin="anonymous" type="font/woff2" href="myfont.woff2">

Perhatikan bahwa penggunaan `crossorigin` di sini sangat penting; tanpa atribut ini,
font yang dimuat sebelumnya akan diabaikan oleh browser, dan dilakukan pengambilan
yang baru. Hal ini karena font diharapkan agar diambil secara anonim oleh
browser, serta permintaan preload hanya dibuat secara anonim dengan menggunakan
atribut `crossorigin`.

Perhatian: Jika Anda menggunakan CDN, seperti Google Fonts, pastikan bahwa file font
yang Anda muat sebelumnya cocok dengan font di CSS, yang hal ini akan menjadi rumit dikarenakan rentang unicode
, bobot, dan variasi font. Font juga dapat diperbarui secara berkala, jika
Anda terlebih dahulu memuat versi lama selagi menggunakan CSS dengan versi yang lebih baru, pada akhirnya kemungkinan
Anda mendownload dua versi font yang sama dan menyia-nyiakan
bandwidth pengguna. Pertimbangkan menggunakan `<link rel="preconnect">` agar pemeliharaannya
lebih mudah.

### Kasus penggunaan: Critical Path CSS dan JavaScript

Jika membahas tentang kinerja halaman, salah satu konsep yang berguna adalah “critical path”.
Critical path merujuk pada resource yang harus dimuat sebelum render awal
Anda. Resource ini, seperti halnya CSS, adalah sangat penting guna mendapatkan piksel
pertama di layar pengguna.

Sebelumnya, yang disarankan adalah menggabungkan konten ini ke dalam HTML.
Namun, dalam keadaan saat beberapa halaman yang dirender di server, hal ini cepat berkembang menjadi
banyak byte yang disia-siakan. Hal ini juga mempersulit penentuan versi, karena perubahan apa pun dalam
kode penting akan membatalkan halaman yang sudah digabungkan.

Dengan `<link rel="preload">`, Anda dapat mempertahankan manfaat
penentuan versi dan cache masing-masing file, sambil memberikan mekanisme ke permintaan
sesegera mungkin.

    <link rel="preload" as="script" href="super-important.js">
    <link rel="preload" as="style" href="critical.css">

Ada satu kekurangan preload: Anda masih harus tunduk pada roundtrip ekstra.
Roundtrip ekstra ini berasal dari fakta bahwa browser terlebih dahulu harus mengambil
HTML, dan hanya setelah langkah tersebut dilakukan, browser mengetahui tentang resource berikutnya.

Salah satu menangani masalah cara seputar roundtrip ekstra ini adalah menggunakan
[HTTP/2](/web/fundamentals/performance/http2/#server_push)
push, di mana Anda terlebih dahulu melampirkan aset penting ke koneksi
yang sama tempat Anda mengirim HTML. Tindakan ini menjamin bahwa
tidak ada downtime antara saat browser pengguna mengambil HTML dan memulai
proses download aset penting. Meskipun begitu, berhati-hatilah saat menggunakan push HTTP/2,
karena terlalu mengontrol penggunaan bandwidth pengguna (“server
tahu yang terbaik”), dan menyisakan ruang yang sangat sempit bagi browser untuk memutuskan
sendiri, seperti tidak mengambil file yang sudah berada di cache!

## Preconnect

`<link rel="preconnect">` memberi tahu browser bahwa halaman Anda bermaksud
membangun koneksi ke asal yang lain, serta Anda ingin proses tersebut
dimulai secepat mungkin.

Membangun koneksi seringkali membutuhkan banyak waktu dalam jaringan yang lambat,
khususnya saat berhubungan dengan koneksi yang aman, karena hal ini mungkin melibatkan DNS
pencarian, pengalihan, serta beberapa round trip ke server akhir yang menangani
permintaan pengguna. Memperhatikan semua hal ini sebelumnya dapat menjadikan
aplikasi Anda terasa jauh lebih cepat bagi pengguna tanpa berdampak negatif terhadap penggunaan
bandwidth. Sebagian besar waktu dalam membangun koneksi dihabiskan untuk menunggu,
dan bukan melakukan pertukaran data.

Memberi tahu maksud Anda ke browser itu semudah menambahkan tag link ke
halaman:

    <link rel="preconnect" href="https://example.com">

Dalam kasus ini, kita memberi tahu browser bahwa kita bermaksud menghubungkan ke
`example.com` dan mengambil konten dari sana.

Harap diingat bahwa meskipun `<link rel="preconnect">` cukup murah, tindakan ini masih
membutuhkan waktu CPU yang berharga, khususnya pada koneksi yang aman. Hal ini
sangat buruk jika koneksi tidak digunakan dalam 10 detik, karena browser
menutupnya, ini menyia-nyiakan semua hasil kerja koneksi pada awal waktu tersebut.

Secara umum, cobalah menggunakan `<link rel="preload">` di mana pun Anda bisa, karena hal ini lebih
meningkatkan kinerja secara komprehensif, namun tetap ingat `<link rel="preconnect">` di dalam
memori Anda untuk menghadapi kasus yang bersifat darurat. Mari kita lihat beberapa dari kasus tersebut.

Note: Sebenarnya terdapat jenis `<link>` lain yang terkait dengan koneksi:
`<link rel="dns-prefetch">`. Koneksi ini hanya menangani pencarian DNS, jadi ini adalah subset
kecil dari `<link rel="preconnect">`, namun mendapatkan dukungan browser yang lebih luas, sehingga
dapat berfungsi sebagai fallback yang bagus.
Anda menggunakannya dengan cara yang sama persis:
`<link rel="dns-prefetch" href="https://example.com">`

### Kasus penggunaan: Mengetahui *Dari Mana*, namun bukan *Apa* yang Anda Ambil

Karena adanya dependensi berversi, terkadang Anda berakhir dalam situasi ketika Anda
mengetahui akan mengambil resource dari CDN tertentu, namun bukan jalur yang tepat
untuk hal ini. Dalam kasus yang lain, salah satu dari beberapa resource mungkin dapat diambil, yang bergantung
pada kueri media atau pemeriksaan fitur runtime pada browser pengguna.

Dalam situasi ini, dan jika resource yang akan Anda ambil bersifat penting, Anda
dapat menghemat sebanyak mungkin waktu dengan melakukan pre-connecting ke server. Browser
tidak akan memulai mengambil file tersebut sebelum diperlukan (jadi, setelah
permintaan dibuat dari halaman Anda), namun setidaknya browser ini dapat menangani
aspek koneksi lebih awal, menjadikan pengguna dapat menghemat waktu dari menunggu beberapa
roundtrip.

### Kasus penggunaan: Media Streaming

Contoh yang lain di mana Anda mungkin ingin menghemat waktu dalam tahap koneksi,
namun tidak harus segera mengambil konten, adalah saat melakukan media streaming
dari asal yang berbeda.

Sesuai dengan cara halaman Anda menangani streaming konten, Anda mungkin ingin menunggu
hingga skrip dimuat dan siap untuk memproses streaming. Dengan preconnect
, Anda dapat memangkas waktu tunggu menjadi satu roundtrip setelah Anda siap
memulai pengambilan.

## Prefetch

`<link rel="prefetch">` berbeda dibandingkan `<link rel="preload">` dan
`<link rel="preconnect">`, dalam cara tersebut tidak mencoba membuat sesuatu yang penting
terjadi lebih cepat; sebaliknya, cara tersebut mencoba membuat sesuatu yang tidak penting terjadi lebih awal,
jika ada kesempatan.

Langkah ini bisa dilakukan dengan memberi tahu browser tentang resource yang diharapkan agar
diperlukan sebagai bagian dari navigasi atau interaksi pengguna di masa mendatang, misalnya,
sesuatu yang *kemungkinan* akan diperlukan nanti, jika pengguna mengambil tindakan yang kita
harapkan. Resource ini diambil dengan prioritas **Lowest** di Chrome,
ketika halaman saat ini selesai dimuat dan ada bandwith yang tersedia.

Ini berarti `prefetch` paling cocok untuk mendahului yang mungkin
dilakukan pengguna berikutnya, serta menyiapkan untuk hal itu, seperti mengambil halaman detail produk yang pertama
di daftar hasil, atau mengambil halaman berikutnya di konten yang memiliki nomor halaman.

    <link rel="prefetch" href="page-2.html">

Harap diingat bahwa pengambilan sebelumnya tersebut tidak berfungsi secara rekursif. Pada contoh
di atas, Anda hanya mengambil HTML; setiap resource yang diperlukan `page-2.html`
tidak akan didownload sebelumnya kecuali Anda secara eksplisit mengambilnya terlebih dahulu
.

### Prefetch Tidak Akan Berfungsi sebagai Override

Penting untuk dicatat bahwa Anda tidak dapat menggunakan `<link rel="prefetch">` sebagai cara
menurunkan prioritas resource yang sudah ada. Di HTML berikut, Anda mungkin
berpikir bahwa menyatakan `optional.css` dalam suatu prefetch akan menurunkan prioritasnya
untuk `<link rel="stylesheet">` selanjutnya:

    <html>
      <head>
        <link rel="prefetch" href="optional.css">
        <link rel="stylesheet" href="optional.css">
      </head>
      <body>
        Halo!
      </body>
    </html>

Namun, sebenarnya ini akan menyebabkan stylesheet Anda akan diambil dua kali (walaupun
dengan potensi mengenai cache pada pengambilan kedua), sekali pada prioritas **Highest**
default, dan sekali pada prioritas **Lowest**, karena prefetch memulai
pengambilan yang terpisah:

<figure>
  <div class="aspect-ratio"
       style="width: 1374px; --aspect-ratio-w: 1374; --aspect-ratio-h: 190">
    <img src="images/res-prio-prefetch.png"
         alt="Screenshot Chrome Developer Tools menunjukkan optional.css sedang
              diambil dua kali">
  </div>
</figure>

Pengambilan ganda akan berdampak buruk bagi pengguna. Dalam kasus ini, tidak hanya akan menyebabkan pengguna harus
menunggu CSS pemblokiran-render, namun juga berpotensi
memboroskan bandwith karena mendownload file dua kali. Harap diingat
bandwidth mereka mungkin diukur. Pastikan untuk menganalisis permintaan jaringan
Anda secara keseluruhan, dan hati-hati terhadap pengambilan ganda!

## Teknik dan Fitur Lain

`<link rel="preload">`, `<link rel="preconnect">`, dan `<link rel="prefetch">`
(serta bonusnya `<link rel="dns-prefetch">`) menawarkan
cara yang bagus untuk memberi tahu browser secara deklaratif tentang resource dan
koneksi di waktu berikutnya, serta melakukan penyesuaian saat terjadi, menurut kapan
hal tersebut dibutuhkan.

Terdapat sejumlah alat dan teknik yang dapat Anda gunakan untuk melakukan penyesuaian prioritas
dan waktu resource Anda dimuat. Pastikan Anda membaca tentang
[HTTP/2 push server](/web/fundamentals/performance/http2/#server_push);
[menggunakan `IntersectionObserver` untuk memuat gambar dan media lain](/web/updates/2016/04/intersectionobserver);
[menghindari CSS render-pemblokiran](/web/fundamentals/performance/critical-rendering-path/render-blocking-css)
dengan kueri dan library seperti
[loadCSS](https://github.com/filamentgroup/loadCSS){: .external};
serta menunda mengambil, mengkompilasi, dan mengeksekusi JavaScript dengan
[async](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#attr-async){: .external}
dan
[defer](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#attr-defer){: .external}.

## Masukan {: #feedback }

{% include "web/_shared/helpful.html" %}
