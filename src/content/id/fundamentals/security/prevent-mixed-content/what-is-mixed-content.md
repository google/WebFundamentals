project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Campuran terjadi bila HTML pertama dimuat melalui koneksi HTTPS aman, namun sumber daya lainnya dimuat melalui koneksi HTTPS tidak aman.

{# wf_updated_on: 2018-02-12 #}
{# wf_published_on: 2015-09-25 #}

# Apa yang Dimaksud Dengan Materi Campuran? {: .page-title }

{% include "web/_shared/contributors/johyphenel.html" %}

**Materi campuran** terjadi bila HTML pertama dimuat melalui koneksi HTTPS
aman, namun sumber daya lainnya (seperti gambar, video, stylesheet, skrip)
dimuat melalui koneksi HTTPS tidak aman. Ini disebut materi campuran
karena materi HTTP maupun materi HTTPS dimuat untuk menampilkan laman yang sama,
dan permintaan awal sudah aman melalui HTTPS. Browser modern menampilkan
peringatan tentang tipe materi ini untuk menunjukkan kepada pengguna bahwa laman ini
berisi sumber daya yang tidak aman.

### TL;DR {: .hide-from-toc }

* HTTPS penting untuk melindungi situs maupun pengguna Anda dari serangan.
* Materi campuran mengurangi keamanan dan pengalaman pengguna pada situs HTTPS Anda.

## Permintaan sumber daya dan browser web

Bila browser _mengunjungi_ sebuah laman situs web, ia akan meminta sumber daya HTML. Server web kemudian mengembalikan materi HTML, yang akan di-parse dan ditampilkan browser kepada pengguna. Sering kali, satu file HTML tidak cukup untuk menampilkan satu laman lengkap, sehingga file HTML menyertakan referensi ke sumber daya lain yang perlu diminta oleh browser. Sub-sumber daya ini bisa berupa gambar, video, HTML ekstra, CSS, atau JavaScript, yang masing-masing akan diambil menggunakan permintaan terpisah.

## Manfaat HTTPS

Bila browser meminta sumber daya melalui HTTPS&mdash;singkatan dari HTTP Secure&mdash;ia
akan menggunakan koneksi yang dienkripsi untuk berkomunikasi dengan server web.

Penggunaan HTTPS memiliki tiga manfaat utama:

* Autentikasi
* Integritas data
* Kerahasiaan

### Autentikasi

_Apakah situs web yang saya masuki ini memang situs web yang asli?_

HTTPS memungkinkan browser memeriksa apakah ia telah membuka situs web yang benar dan tidak
dialihkan ke situs yang jahat. Saat mengunjungi situs web bank Anda,
browser akan _mengautentikasi_ situs web tersebut, untuk menghindari penyerang yang
berpura-pura menjadi bank Anda dan mencuri kredensial proses masuk Anda.

### Integritas data

_Apakah ada orang yang mengutak-atik materi yang saya kirim atau terima?_

HTTPS memungkinkan browser mendeteksi apakah penyerang telah mengubah data yang
diterima browser. Saat mentransfer uang menggunakan situs web bank Anda, ini akan mencegah
penyerang mengubah nomor rekening tujuan saat permintaan Anda sedang
dikirim.

### Kerahasiaan

_Bisakah seseorang melihat materi yang sedang saya kirim atau terima?_

HTTPS mencegah penyerang menyadap permintaan browser,
melacak situs web yang dikunjungi, atau mencuri informasi yang dikirim atau diterima.

### HTTPS, TLS, dan SSL

HTTPS singkatan dari HTTP Secure, Hyper(t)ext Transfer Protocol Secure. Bagian
**secure** di sini berasal dari enkripsi yang ditambahkan ke permintaan yang dikirim
dan diterima oleh browser. Saat ini hampir semua browser menggunakan protokol TLS untuk
menyediakan enkripsi; **TLS** terkadang disebut SSL.

Detail HTTPS, TLS, dan SSL di luar cakupan artikel ini, namun jika
Anda ingin mengetahui selengkapnya, sumber daya berikut merupakan tempat memulai yang tepat:

* [HTTPS Wikipedia](https://en.wikipedia.org/wiki/HTTPS){: .external}
* [TLS Wikipedia](https://en.wikipedia.org/wiki/Transport_Layer_Security){: .external}
* [Kursus Kriptografi Khan Academy](https://www.khanacademy.org/computing/computer-science/cryptography){: .external}
* [Bab TLS](https://hpbn.co/transport-layer-security-tls/){: .external} di [High Performance Browser Networking](https://hpbn.co/){: .external} oleh Ilya Grigorik

## Materi campuran melemahkan HTTPS

Meminta sub-sumber daya menggunakan protokol HTTP tidak aman akan melemahkan keamanan
keseluruhan laman, karena permintaan ini rawan terhadap **man-in-the-middle
attacks**, karena penyerang menyadap koneksi jaringan dan melihat atau
memodifikasi komunikasi di antara kedua pihak. Dengan sumber daya ini,
penyerang sering kali bisa menguasai penuh suatu laman, bukan cuma
sumber daya yang diretas.

Walaupun banyak browser melaporkan peringatan materi campuran kepada pengguna, pada saat
ini terjadi, semua sudah terlambat: permintaan tidak aman sudah dilaksanakan
dan keamanan laman sudah diretas. Sayangnya, skenario ini
sangat umum di web, itu sebabnya browser tidak bisa sekadar memblokir semua
permintaan campuran tanpa membatasi fungsionalitas banyak situs.

<figure>
  <img src="imgs/image-gallery-warning.png" alt="Materi Campuran: Laman telah dimuat melalui HTTPS, namun meminta gambar yang tidak aman. Materi ini seharusnya juga disajikan melalui HTTPS.">
  <figcaption>
    Semua terserah Anda, sebagai developer, untuk memperbaiki masalah materi campuran di aplikasi Anda.
  </figcaption>
</figure>

### Contoh sederhana

Memuat skrip tidak aman dari laman HTTPS.

Dengan menampilkan contoh laman ini melalui **HTTPS**&mdash;[**https**://googlesamples.github.io/web-fundamentals/.../simple-example.html](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/simple-example.html){: .external}&mdash;menyertakan tag skrip **HTTP** yang berusaha memuat materi campuran.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/security/prevent-mixed-content/_code/simple-example.html" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/simple-example.html){: target="_blank" .external }

Dalam contoh ini, skrip `simple-example.js` dimuat dengan URL **HTTP**. Inilah kasus paling sederhana dari materi campuran. Bila browser meminta file `simple-example.js`, penyerang bisa menyuntikkan kode ke dalam materi yang dikembalikan
dan mengambil alih keseluruhan laman.

Untunglah, hampir semua browser modern memblokir tipe materi berbahaya ini
secara default. Lihat [perilaku browser dengan materi campuran](#browser-behavior-with-mixed-content){: .external}.

<figure>
  <img src="imgs/simple-mixed-content-error.png" alt="Materi Campuran: Laman telah dimuat melalui HTTPS, namun meminta skrip yang tidak aman. Permintaan ini telah diblokir; materi harus disajikan melalui HTTPS.">
  <figcaption>Chrome memblokir skrip yang tidak aman.</figcaption>
</figure>

### Contoh XMLHttpRequest

Memuat data tidak aman dengan XMLHttpRequest.

Dengan menampilkan contoh laman ini melalui **HTTPS**&mdash;[**https**://googlesamples.github.io/web-fundamentals/.../xmlhttprequest-example.html](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/xmlhttprequest-example.html){: .external}&mdash;menyertakan `XMLHttpRequest` melalui **HTTP** untuk mengambil data `JSON` materi campuran.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/security/prevent-mixed-content/_code/xmlhttprequest-example.html" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/xmlhttprequest-example.html){: target="_blank" .external }

Di sini, **HTTP** URL dibuat secara dinamis dalam JavaScript, dan akhirnya digunakan
oleh `XMLHttpRequest` untuk memuat sumber daya tidak aman. Seperti contoh sederhana
di atas, bila browser meminta file `xmlhttprequest-data.js`, penyerang bisa menyuntikkan
kode ke dalam materi yang dikembalikan dan mengambil alih
keseluruhan laman.

Sebagian besar browser modern juga memblokir permintaan berbahaya ini.

<figure>
  <img src="imgs/xmlhttprequest-mixed-content-error.png" alt="Materi Campuran: Laman telah dimuat melalui HTTPS, namun meminta endpoint XMLHttpRequest yang tidak aman. Permintaan ini telah diblokir; materi harus disajikan melalui HTTPS.">
  <figcaption>Chrome memblokir XMLHttpRequest yang tidak aman.</figcaption>
</figure>

### Contoh galeri gambar

Memuat gambar tidak aman dengan lightbox jQuery.

Bila menampilkan contoh laman ini melalui **HTTPS**&mdash;[**https**://googlesamples.github.io/web-fundamentals/.../image-gallery-example.html](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/image-gallery-example.html){: .external}&mdash;mula-mula tidak memiliki masalah materi campuran; akan tetapi bila gambar kecil diklik, gambar materi campuran berukuran penuh akan dimuat melalui **HTTP**.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/security/prevent-mixed-content/_code/image-gallery-example.html" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/image-gallery-example.html){: target="_blank" .external }

Galeri gambar sering kali mengandalkan tag `<img>` atribut `src` untuk menampilkan gambar kecil
di laman, tag jangkar (`<a>`) atribut `href`
kemudian digunakan untuk memuat gambar berukuran penuh untuk overlay galeri. Biasanya, tag
`<a>` tidak menyebabkan materi campuran, namun dalam hal ini, kode jQuery
menggantikan perilaku tautan default&mdash;untuk mengarahkan ke laman baru&mdash;dan sebagai ganti
memuat gambar **HTTP** pada laman ini.

<figure>
  <img src="imgs/image-gallery-warning.png" alt="Materi Campuran: Laman telah dimuat melalui HTTPS, namun meminta gambar yang tidak aman. Materi ini seharusnya juga disajikan melalui HTTPS.">
</figure>

Gambar tidak aman mengurangi keamanan situs Anda, namun tidak sebahaya
tipe materi campuran lainnya. Browser modern tetap memuat gambar materi campuran,
namun juga menampilkan peringatan kepada pengguna.

## Tipe materi campuran & ancaman keamanan berkaitan

Ada dua tipe materi campuran: aktif dan pasif.

**Materi campuran pasif** adalah materi yang tidak berinteraksi dengan bagian selebihnya
pada laman, dan karenanya Man-in-the-Middle Attack terbatas pada apa yang bisa dilakukannya
jika mereka menyadap atau mengubah materi itu. Materi campuran pasif meliputi
gambar, video, dan materi audio, bersama sumber daya lain yang tidak bisa berinteraksi
dengan bagian selebihnya pada laman.

**Materi campuran aktif** berinteraksi dengan laman secara keseluruhan dan memungkinkan
penyerang melakukan hampir semua hal pada laman. Materi campuran aktif meliputi
skrip, stylesheet, iframe, sumber daya flash, dan kode lainnya yang bisa
diunduh dan dieksekusi oleh browser.

### Materi campuran pasif

Materi campuran pasif tetap menimbulkan ancaman keamanan pada situs dan pengguna Anda.
Misalnya, penyerang bisa menyadap permintaan HTTP untuk gambar pada situs Anda dan
menukar atau mengganti gambar-gambar ini; penyerang bisa menukar gambar tombol _simpan_ dan _hapus_,
sehingga menyebabkan pengguna menghapus materi tanpa sengaja;
mengganti diagram produk Anda dengan materi porno atau jorok, memalsukan situs
Anda; atau mengganti gambar produk Anda dengan iklan untuk situs atau produk yang berbeda.

Walaupun penyerang tidak mengubah materi situs, Anda tetap memiliki
masalah privasi yang besar karena penyerang bisa melacak pengguna dengan menggunakan permintaan
materi campuran. Penyerang bisa tahu laman mana yang dikunjungi pengguna dan produk mana
yang mereka lihat berdasarkan gambar atau sumber daya lain yang dimuat oleh browser.

Berikut ini adalah contoh materi campuran pasif:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/security/prevent-mixed-content/_code/passive-mixed-content.html" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/passive-mixed-content.html){: target="_blank" .external }

Sebagian besar browser tetap merender tipe materi campuran ini pada pengguna, akan tetapi
juga menampilkan peringatan karena ini menimbulkan risiko keamanan dan privasi pada situs
dan pengguna Anda.

<figure>
  <img src="imgs/passive-mixed-content-warnings.png" alt="Materi Campuran: Laman telah dimuat melalui HTTPS, namun meminta video yang tidak aman. Materi ini seharusnya juga disajikan melalui HTTPS.">
  <figcaption>Peringatan materi campuran dari Konsol JavaScript Chrome.</figcaption>
</figure>

### Materi campuran aktif

Materi campuran aktif menimbulkan ancaman lebih besar daripada yang pasif. Penyerang bisa
mencegat dan menulis ulang materi aktif yang akan mengambil alih sepenuhnya
kontrol atas laman Anda atau bahkan seluruh situs web Anda. Ini memungkinkan penyerang mengubah apa saja pada
laman, termasuk menampilkan materi yang berbeda sama sekali, mencuri kata sandi pengguna
atau kredensial proses masuk lainnya, mencuri cookie sesi pengguna, atau mengalihkan
pengguna ke situs yang sama sekali berbeda.

Karena gawatnya ancaman ini, banyak browser yang memblokir tipe materi ini
secara default untuk melindungi pengguna, namun fungsionalitas berbeda-beda antar vendor
dan versi browser.

Yang berikut ini berisi contoh materi campuran aktif:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/security/prevent-mixed-content/_code/active-mixed-content.html" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/active-mixed-content.html){: target="_blank" .external }

<figure>
  <img src="imgs/active-mixed-content-errors.png" alt="Materi Campuran: Laman telah dimuat melalui HTTPS, namun meminta sumber daya yang tidak aman. Permintaan ini telah diblokir; materi harus disajikan melalui HTTPS.">
  <figcaption>Kesalahan materi campuran dari Konsol JavaScript Chrome.</figcaption>
</figure>

## Perilaku browser dengan materi campuran

Oleh karena ancaman yang dijelaskan di atas, maka idealnya browser memblokir semua
materi campuran. Akan tetapi, ini akan mengganggu banyak sekali situs web yang dimanfaatkan
jutaan pengguna setiap hari. Kompromi saat ini adalah memblokir hampir semua
tipe materi campuran yang berbahaya, dan mengizinkan tipe yang kurang berbahaya untuk tetap
diminta.

Browser modern mengikuti [spesifikasi materi campuran](https://w3c.github.io/webappsec/specs/mixedcontent/){: .external }, yang mendefinisikan kategori [**materi yang bisa diblokir secara opsional**](https://w3c.github.io/webappsec/specs/mixedcontent/#category-optionally-blockable){: .external} dan [**materi yang bisa diblokir**](https://w3c.github.io/webappsec/specs/mixedcontent/#category-blockable){: .external}.

Dari spesifikasi ini, sumber daya tergolong materi yang bisa diblokir secara opsional "bila risiko
membiarkan penggunaannya sebagai materi campuran lebih penting daripada risiko melanggar
bagian signifikan dari web"; inilah subset kategori [materi campuran
pasif](#passive-mixed-content) yang dijelaskan di atas. Pada saat menulis artikel ini, sumber daya gambar,
video, dan audio, serta tautan yang diambil lebih dini, adalah satu-satunya
tipe sumber daya yang disertakan dalam materi yang bisa diblokir secara opsional. Kategori ini
mungkin akan semakin kecil seiring waktu.

Semua materi yang tidak **bisa diblokir secara opsional** dianggap **bisa diblokir**,
dan akan diblokir oleh browser.

### Versi browser

Perlu diingat bahwa tidak setiap pengunjung situs web Anda menggunakan
browser terbaru. Aneka versi dari aneka vendor browser
masing-masing berperilaku berbeda dengan materi campuran. Yang terburuk, sebagian browser dan versi
tidak memblokir materi campuran sama sekali, sehingga sangat tidak aman bagi pengguna.

Perilaku persis setiap browser terus berubah, sehingga kita tidak akan memasukkannya
secara spesifik di sini. Jika Anda tertarik dengan cara perilaku browser spesifik, carilah
informasi yang dipublikasikan oleh vendornya secara langsung.

Note: Pengguna mengandalkan Anda untuk melindungi mereka saat mengunjungi situs web Anda. Masalah materi campuran perlu Anda diperbaiki untuk melindungi <b>semua</b> pengunjung, termasuk mereka yang menggunakan browser lama.




{# wf_devsite_translation #}
