project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Banyak dari web tidak dioptimalkan untuk pengalaman multi-perangkat. Pelajari dasar-dasar agar situs Anda berjalan pada seluler, desktop atau perangkat berlayar lainnya.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2014-04-29 #}

# Dasar-Dasar Desain Web Responsif {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

Penggunaan perangkat seluler untuk menjelajahi web tumbuh dengan kecepatan fantastis, 
tapi sayangnya banyak web tidak dioptimalkan untuk perangkat seluler.
Perangkat seluler sering terkendala dengan ukuran layar dan memerlukan 
pendekatan berbeda dalam bagaimana materi ditampilkan di layar.

Ada banyak ukuran layar yang berbeda untuk ponsel, "phablet,"
tablet, desktop, konsol game, TV, dan bahkan perangkat yang dapat dikenakan.  Ukuran layar selalu
berubah, jadi sangatlah penting agar situs Anda bisa beradaptasi dengan tiap ukuran layar,
sekarang atau di masa mendatang.

<video autoplay muted loop controls>
  <source src="videos/resize.webm" type="video/webm">
  <source src="videos/resize.mp4" type="video/mp4">
</video>

Desain web responsif, awalnya didefinisikan oleh [Ethan Marcotte di A List
Apart](http://alistapart.com/article/responsive-web-design/), sebagai jawaban atas
kebutuhan pengguna dan perangkat yang mereka gunakan.  Perubahan layout berdasarkan
ukuran dan kemampuan perangkat.  Misalnya, di ponsel, pengguna
melihat materi yang ditampilkan dalam tampilan satu kolom; tablet mungkin menampilkan materi yang sama
dalam dua kolom.

{% include "web/_shared/udacity/ud893.html" %}

## Menyetel tampilan yang terlihat {: #set-the-viewport }

Laman yang dioptimalkan untuk berbagai perangkat harus menyertakan tag meta viewport di kepala dokumen.  Sebuah tag meta viewport memberikan petunjuk ke browser tentang cara mengontrol ukuran laman dan penskalaan.

### TL;DR {: .hide-from-toc }
- Gunakan tag meta viewport untuk mengontrol lebar dan penskalaan tampilan yang terlihat di browser.
- Sertakan `width=device-width` untuk mencocokkan lebar layar dalam piksel yang tidak bergantung perangkat.
- Sertakan `initial-scale=1` untuk membentuk hubungan 1:1 antara piksel CSS dan piksel yang tidak bergantung perangkat.
- Pastikan laman Anda bisa diakses dengan tidak menonaktifkan penskalaan pengguna.


Dalam upaya menyediakan pengalaman terbaik, browser seluler merender
laman pada lebar layar desktop (biasanya sekitar 980 px, meskipun ini bisa berbeda
antar perangkat), dan kemudian mencoba membuat materi terlihat lebih baik dengan memperbesar
ukuran font dan mengubah ukuran materi agar sesuai dengan layar.  Ini berarti bahwa ukuran font mungkin tampil tidak konsisten bagi pengguna, yang mungkin harus ketuk dua kali atau
cubit-untuk-zoom agar bisa melihat dan berinteraksi dengan materi.


    <meta name="viewport" content="width=device-width, initial-scale=1">
    


Menggunakan nilai meta viewport `width=device-width` menginstruksikan laman untuk mencocokkan
lebar layar dalam piksel yang tidak tergantung perangkat. Hal ini memungkinkan laman untuk meng-ubah posisi/geometri
materi agar sesuai dengan ukuran layar yang berbeda, apakah di-render pada telepon
seluler kecil atau monitor desktop yang besar.

<div class="attempt-left">
  <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/vp-no.html">
  <figure>
    <img src="imgs/no-vp.png" srcset="imgs/no-vp.png 1x, imgs/no-vp-2x.png 2x" alt="Laman tanpa penyetelan tampilan yang terlihat">
    <figcaption>
      Laman tanpa penyetelan tampilan yang terlihat
     </figcaption>
  </figure>
  </a>
</div>
<div class="attempt-right">
  <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/vp.html">
  <figure>
    <img src="imgs/vp.png" srcset="imgs/vp.png 1x, imgs/vp-2x.png 2x" alt="Laman dengan penyetelan tampilan yang terlihat">
    <figcaption>
      Laman dengan penyetelan tampilan yang terlihat
     </figcaption>
  </figure>
  </a>
</div>

Beberapa browser menjaga lebar laman konstan ketika memutar ke mode
lanskap, dan melakukan zoom bukannya meng-ubah posisi/geometri untuk mengisi layar. Menambahkan atribut
`initial-scale=1` menginstruksikan browser untuk membangun hubungan 1:1 antara piksel
CSS dan piksel yang tidak tergantung perangkat terlepas dari orientasi perangkat, dan
memungkinkan laman untuk memanfaatkan lebar lanskap penuh.


Note: Untuk memastikan browser lama bisa dengan benar parse atribut, gunakan tanda koma untuk memisahkan atribut.

### Memastikan tampilan yang terlihat bisa diakses

Selain menetapkan `initial-scale`, Anda juga bisa mengatur atribut berikut pada tampilan yang terlihat:

* `minimum-scale`
* `maximum-scale`
* `user-scalable`

Bila diatur, ini bisa menonaktifkan kemampuan pengguna untuk melakukan zoom tampilan yang terlihat, berpotensi menyebabkan masalah aksesibilitas.


## Menyesuaikan ukuran materi dengan tampilan yang terlihat

Pada desktop dan perangkat seluler, pengguna terbiasa menggulir situs web secara vertikal, tidak secara horizontal; memaksa pengguna menggulir secara horizontal atau harus memperkecil tampilan agar bisa melihat seluruh laman akan menyebabkan pengalaman pengguna yang buruk.

### TL;DR {: .hide-from-toc }
- Jangan menggunakan elemen berlebar tetap yang besar.
- Materi tidak boleh bergantung pada lebar tampilan yang terlihat tertentu untuk merender dengan baik.
- Gunakan kueri media CSS untuk menerapkan penataan gaya yang berbeda untuk layar kecil dan besar.

Ketika mengembangkan sebuah situs seluler dengan tag `meta viewport`, terkadang kita
secara tidak sengaja membuat materi laman yang tidak muat dalam tampilan yang terlihat
yang ditetapkan. Misalnya, gambar yang ditampilkan mempunyai lebar yang lebih lebar dari
tampilan yang terlihat bisa menyebabkan tampilan yang terlihat untuk menggulir secara horizontal. Anda harus menyesuaikan materi
ini agar muat ke dalam lebar tampilan yang terlihat, sehingga pengguna tidak perlu
menggulir secara horizontal.

Oleh karena ukuran dan lebar layar dalam piksel CSS bervariasi antar perangkat
(misalnya, antara ponsel dan tablet, dan bahkan antara ponsel yang berbeda), materi
tidak boleh bergantung pada lebar tampilan yang terlihat tertentu untuk dirender dengan baik.

Menyetel lebar CSS mutlak besar untuk elemen laman (seperti contoh di bawah),
menyebabkan `div` menjadi terlalu lebar untuk tampilan yang terlihat pada perangkat yang lebih sempit (misalnya,
perangkat dengan lebar piksel CSS 320, seperti iPhone). Sebaiknya, pertimbangkan
untuk menggunakan nilai lebar relatif, seperti `width: 100%`.  Demikian juga, berhati-hatilah menggunakan
nilai pemosisian absolut besar yang bisa menyebabkan elemen berada di luar
tampilan yang terlihat pada layar kecil.  

<div class="attempt-left">
  <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/vp-fixed.html">
  <figure>
    <img src="imgs/vp-fixed-iph.png" srcset="imgs/vp-fixed-iph.png 1x, imgs/vp-fixed-iph-2x.png 2x" alt="Laman dengan elemen lebar tetap 344 px pada iPhone.">
    <figcaption>
      Laman dengan elemen lebar tetap 344 px pada iPhone
    </figcaption>
  </figure>
  </a>
</div>
<div class="attempt-right">
  <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/vp-fixed.html">
  <figure>
    <img src="imgs/vp-fixed-n5.png" srcset="imgs/vp-fixed-n5.png 1x, imgs/vp-fixed-n5-2x.png 2x" alt="Laman dengan elemen lebar tetap 344 px pada Nexus 5.">
    <figcaption>
      Laman dengan elemen lebar tetap 344 px pada Nexus 5
    </figcaption>
  </figure>
  </a>
</div>
<div class="clearfix"></div>
         
## Menggunakan kueri media CSS agar responsif {: #css-media-queries }  

Kueri media adalah filter sederhana yang bisa diterapkan pada gaya CSS. Kueri media memudahkan 
kita untuk mengubah gaya berdasarkan karakteristik dari perangkat yang merender
materi, termasuk tipe tampilan, lebar, tinggi, orientasi dan bahkan
resolusi.


### TL;DR {: .hide-from-toc }
- Gunakan kueri media untuk menerapkan gaya berdasarkan karakteristik perangkat.
- Gunakan `min-width` di atas `min-device-width` untuk memastikan pengalaman yang paling luas.
- Gunakan ukuran relatif untuk elemen agar tidak merusak layout.

Misalnya, Anda bisa menempatkan semua gaya yang diperlukan untuk pencetakan
dalam kueri media cetak:


    <link rel="stylesheet" href="print.css" media="print">
    

Selain menggunakan atribut `media` di tautan style sheet, ada dua
cara lain untuk menerapkan kueri media yang bisa disematkan dalam file CSS: `@media`
dan `@import`.  Karena alasan kinerja, salah satu dari dua metode pertama tersebut
direkomendasikan pada sintaks `@import`
(lihat [Hindari pengimporan CSS](/web/fundamentals/performance/critical-rendering-path/page-speed-rules-and-recommendations)).


    @media print {
      /* print style sheets go here */
    }
    
    @import url(print.css) print;
    

Logika yang berlaku untuk kueri media adalah tidak saling eksklusif, dan untuk setiap filter
yang memenuhi kriteria tersebut maka blok CSS yang dihasilkan akan diterapkan dengan menggunakan
aturan standar prioritas sesuai CSS.

### Menggunakan kueri media berdasarkan ukuran tampilan yang terlihat

Kueri media memungkinkan kita untuk menciptakan pengalaman responsif ketika gaya tertentu
diaplikasikan ke layar kecil, layar besar, dan semua layar.  Sintaks kueri
media memungkinkan untuk pembuatan aturan yang bisa diterapkan tergantung pada
karakteristik perangkat.


    @media (query) {
      /* CSS Rules used when query matches */
    }
    

Meskipun ada beberapa item berbeda yang bisa kita kueri, yang paling
sering digunakan untuk desain web responsif adalah `min-width`, `max-width`, `min-height`, dan
`max-height`.


<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Parameter</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="attribute"><code>min-width</code></td>
      <td data-th="Result">Aturan diterapkan untuk setiap browser yang mempunyai lebar lebih besar dari nilai yang didefinisikan dalam kueri.</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>max-width</code></td>
      <td data-th="Result">Aturan diterapkan untuk setiap browser yang mempunyai lebar lebih kecil dari nilai yang didefinisikan dalam kueri.</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>min-height</code></td>
      <td data-th="Result">Aturan diterapkan untuk setiap browser yang mempunyai tinggi lebih besar dari nilai yang didefinisikan dalam kueri.</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>max-height</code></td>
      <td data-th="Result">Aturan diterapkan untuk setiap browser yang mempunyai tinggi lebih kecil dari nilai yang didefinisikan dalam kueri.</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>orientation=portrait</code></td>
      <td data-th="Result">Aturan diterapkan untuk setiap browser ketika tingginya lebih besar dari atau sama dengan lebarnya.</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>orientation=landscape</code></td>
      <td data-th="Result">Aturan untuk setiap browser ketika lebarnya lebih besar dari tingginya.</td>
    </tr>
  </tbody>
</table>

Mari kita lihat contoh berikut:

<figure>
  <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/media-queries.html">
    <img src="imgs/mq.png" srcset="imgs/mq.png 1x, imgs/mq-2x.png 2x" alt="Pratinjau laman menggunakan kueri media untuk mengubah properti ketika diubah ukurannya.">
    <figcaption>
      Pratinjau laman menggunakan kueri media untuk mengubah properti ketika diubah ukurannya.
    </figcaption>
  </a>
</figure>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/media-queries.html" region_tag="mqueries" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/media-queries.html){: target="_blank" .external }

* Ketika browser lebarnya antara <b>0 px</b> dan <b>640 px</b>, diterapkan `max-640px.css`.
* Ketika browser lebarnya antara <b>500 px</b> dan <b>600 px</b>, gaya dalam `@media` akan diterapkan.
* Ketika browser lebarnya <b>640 px atau lebih</b>, diterapkan `min-640px.css`.
* Ketika browser <b>lebarnya lebih besar daripada tingginya</b>, diterapkan `landscape.css`.
* Ketika browser <b>tingginya lebih besar daripada lebarnya</b>, diterapkan `portrait.css`.


### Catatan tentang `min-device-width`

Adalah mungkin juga membuat kueri berdasarkan
`min-device-width`, meskipun praktik ini **sangat tidak dianjurkan**.

Perbedaannya sangat kecil namun sangat penting: `min-width` didasarkan pada
ukuran jendela browser sedangkan `min-device-width` didasarkan pada
ukuran layar.  Sayangnya beberapa browser, termasuk browser Android
lama, tidak melaporkan lebar perangkat dengan benar; browser tersebut melaporkan ukuran layar dalam satuan piksel perangkat, bukan dalam lebar tampilan yang terlihat yang diharapkan.

Selain itu, menggunakan `min-device-width` bisa mencegah materi diadaptasikan pada
desktop atau perangkat lain yang memperbolehkan jendela diubah ukurannya karena kueri
didasarkan pada ukuran perangkat yang sebenarnya, bukan ukuran jendela browser.

### Gunakan `any-pointer` dan `any-hover` untuk interaksi yang fleksibel

Dimulai dengan Chrome 39, style sheet Anda bisa menulis selektor yang mencakup
beberapa tipe pointer dan perilaku arahkan ke atas. Fitur media `any-pointer` dan `any-hover`
mirip dengan `pointer` dan `hover` dalam mengizinkan Anda untuk melakukan kueri
kemampuan pointer pengguna. Namun, tidak seperti yang terakhir, `any-pointer` dan
`any-hover` beroperasi pada gabungan dari semua perangkat pointer dan bukan hanya
perangkat pointer utama.

### Menggunakan unit relatif

Konsep penting di balik desain responsif adalah fluiditas dan proporsionalitas
yang bertentangan dengan konsep layout lebar tetap.  Menggunakan unit relatif untuk pengukuran bisa membantu
menyederhanakan layout dan mencegah kita secara tidak sengaja membuat komponen yang terlalu besar
untuk tampilan yang terlihat.

Misalnya, setelan lebar: 100% pada `div` tingkat atas, memastikan bahwa itu membentang meliputi
lebar tampilan yang terlihat dan tidak terlalu besar atau terlalu kecil untuk tampilan yang terlihat.  `div`
akan cocok, tidak peduli apakah itu iPhone berlebar 320 px, Blackberry Z10 berlebar 342 px,
atau sebuah Nexus 5 yang berlebar 360 px.

Selain itu, menggunakan unit relatif memungkinkan browser untuk merender materi berdasarkan
tingkat zoom pengguna tanpa perlu menambahkan bilah gulir horizontal ke
laman.

<span class="compare-worse">Tidak disarankan</span>&mdash;lebar tetap

    div.fullWidth {
      width: 320px;
      margin-left: auto;
      margin-right: auto;
    }


<span class="compare-better">Disarankan</span>&mdash;lebar responsif

    div.fullWidth {
      width: 100%;
    }


## Cara memilih breakpoint 

Jangan mendefinisikan breakpoint berdasarkan kelas perangkat. Mendefinisikan breakpoint berdasarkan perangkat,
produk, nama merek, atau sistem operasi tertentu yang digunakan saat ini bisa mengakibatkan
mimpi buruk dalam pemeliharaan. Malahan, materi itu sendiri yang harus menentukan bagaimana
layout menyesuaikan dengan kontainer.


### TL;DR {: .hide-from-toc }
- Buat breakpoint berdasarkan materi, jangan pernah berdasarkan perangkat, produk, atau merek tertentu.
- Desainlah untuk perangkat seluler terkecil lebih dahulu; kemudian secara progresif meningkatkan pengalaman pengguna seiring bertambahnya properti layar.
- Jaga jumlah maksimum baris teks sekitar 70 atau 80 karakter.


### Memilih breakpoint utama dengan secara bertahap mulai dari layar kecil hingga ke besar.

<figure class="attempt-right">
  <img src="imgs/weather-1.png" srcset="imgs/weather-1.png 1x, imgs/weather-1-2x.png 2x" alt="">
  <figcaption>
    <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/weather-1.html">
      Pratinjau prakiraan cuaca yang ditampilkan di layar kecil.
    </a>
  </figcaption>
</figure>

Desain materi agar pas dengan ukuran layar kecil terlebih dahulu, kemudian perluas layar
sampai breakpoint menjadi diperlukan.  Ini memungkinkan Anda untuk mengoptimalkan
breakpoint berdasarkan materi dan mempertahankan jumlah breakpoint
sesedikit mungkin.

Mari kita bekerja melalui contoh yang kita lihat di awal:
prakiraan cuaca. Langkah pertama adalah membuat prakiraan terlihat bagus di
layar kecil.

<div style="clear:both;"></div>

<figure class="attempt-right">
  <img src="imgs/weather-2.png" class="center" srcset="imgs/weather-2.png 1x, imgs/weather-2-2x.png 2x" alt="Pratinjau prakiraan cuaca ketika laman semakin luas.">
  <figcaption>
    <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/weather-1.html">
      Pratinjau prakiraan cuaca ketika laman semakin luas.
    </a>
  </figcaption>
</figure>

Berikutnya, ubah ukuran browser sampai ada terlalu banyak ruang putih antara
elemen, dan tampilan prakiraan cuaca terlihat tidak bagus.  Keputusan ini sedikit
subjektif, namun di atas 600px pasti terlalu lebar.

<div style="clear:both;"></div>

Untuk memasukkan breakpoint pada 600 px, buat dua style sheet baru, satu untuk digunakan saat
browser 600 px dan kurang dari itu, dan satu ketika luasnya lebih dari 600 px.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/weather-2.html" region_tag="mqweather2" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/weather-2.html){: target="_blank" .external }

<figure class="attempt-right">
  <img src="imgs/weather-3.png"  srcset="imgs/weather-3.png 1x, imgs/weather-3-2x.png 2x" alt="Pratinjau dari prakiraan cuaca yang dirancang untuk layar yang lebih lebar.">
  <figcaption>
    <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/weather-2.html">
      Pratinjau dari prakiraan cuaca yang dirancang untuk layar yang lebih lebar.
    </a>
  </figcaption>
</figure>

Yang terakhir, optimalisasi CSS.  Dalam contoh ini, kami telah menempatkan gaya umum
seperti font, ikon, pemosisian dasar, dan warna di `weather.css`.  Layout tertentu
untuk layar kecil kemudian ditempatkan di `weather-small.css`, dan model
layar besar ditempatkan di `weather-large.css`.

<div style="clear:both"></div>


### Memilih breakpoint kecil bila diperlukan

Selain memilih breakpoint besar ketika layout berubah secara signifikan, ini
juga membantu untuk menyesuaikan perubahan kecil.  Misalnya, antara breakpoint
utama mungkin ada gunanya mengatur margin atau padding pada elemen,
atau memperbesar ukuran font agar terlihat lebih natural dalam layout.

Mari kita mulai dengan mengoptimalkan layout layar kecil.  Pada kasus ini, mari kita memperbesar
font ketika luas tampilan yang terlihat lebih besar dari 360px.  Kedua, ketika ada
cukup ruang, kita bisa memisahkan suhu tinggi dan rendah sehingga semua berada di
baris yang sama dan tidak tumpang tindih.  Dan juga mari kita buat ikon
cuaca sedikit lebih besar.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/weather-small.css" region_tag="mqsmallbpsm" adjust_indentation="auto" %}
</pre>

<div class="attempt-left">
  <figure>
    <img src="imgs/weather-4-l.png" srcset="imgs/weather-4-l.png 1x, imgs/weather-4-l-2x.png 2x" alt="Sebelum menambahkan breakpoint kecil.">
    <figcaption>
      Sebelum menambahkan breakpoint kecil.
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="imgs/weather-4-r.png" srcset="imgs/weather-4-r.png 1x, imgs/weather-4-r-2x.png 2x" alt="Setelah menambahkan breakpoint kecil.">
    <figcaption>
      Setelah menambahkan breakpoint kecil.
     </figcaption>
  </figure>
</div>


<div style="clear:both;"></div>


Demikian pula, untuk layar besar akan sangat baik membatasi lebar maksimum
panel prakiraan cuaca sehingga tidak memakai seluruh lebar layar.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/weather-large.css" region_tag="mqsmallbplg" adjust_indentation="auto" %}
</pre>

### Mengoptimalkan teks untuk bacaan

Teori pembacaan klasik menyarankan bahwa kolom yang ideal harus berisi 70 sampai 80
karakter per baris (sekitar 8 sampai 10 kata dalam bahasa Inggris). Jadi setiap kali lebar
blok teks bertambah melewati 10 kata, pertimbangkan menambahkan breakpoint.

<div class="attempt-left">
  <figure>
    <img src="imgs/reading-ph.png" srcset="imgs/reading-ph.png 1x, imgs/reading-ph-2x.png 2x" alt="Sebelum menambahkan breakpoint kecil.">
    <figcaption>Sebelum menambahkan breakpoint kecil.</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="imgs/reading-de.png" srcset="imgs/reading-de.png 1x, imgs/reading-de-2x.png 2x" alt="Setelah menambahkan breakpoint kecil.">
    <figcaption>Setelah menambahkan breakpoint kecil.</figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

Mari kita lihat secara lebih mendalam contoh entri blog di atas.  Pada layar yang lebih kecil,
font Roboto dengan ukuran 1 em bekerja secara sempurna memberikan 10 kata per baris, namun layar
yang lebih besar membutuhkan breakpoint. Pada kasus ini, jika lebar browser lebih besar
dari 575px, lebar ideal materi adalah 550px.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/reading.html" region_tag="mqreading" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/reading.html){: target="_blank" .external }

### Jangan pernah benar-benar menyembunyikan materi

Berhati-hatilah saat memilih materi yang disembunyikan atau ditampilkan menurut ukuran layar.
Jangan sembunyikan materi hanya karena Anda tidak bisa memuatnya di layar.  Ukuran layar
bukanlah indikasi pasti mengenai apa yang mungkin diinginkan pengguna.  Misalnya,
menghilangkan hitungan serbuk sari dari prakiraan cuaca bisa menjadi masalah serius
bagi penderita alergi musim-semi yang membutuhkan informasi untuk menentukan apakah mereka
bisa pergi ke luar atau tidak.

## Menampilkan breakpoint kueri media di Chrome DevTools {: #devtools }

Setelah Anda menyiapkan breakpoint kueri media, Anda pasti ingin melihat bagaimana
situs akan terlihat. Anda *bisa* mengubah ukuran jendela browser untuk memicu
breakpoint, namun ada cara yang lebih baik: Chrome DevTools. Dua
tangkapan layar di bawah menunjukkan penggunaan DevTools untuk menampilkan bagaimana laman terlihat di bawah
breakpoint yang berbeda.

![Contoh fitur kueri media DevTools](imgs/devtools-media-queries-example.png)

Untuk menampilkan laman Anda di bawah breakpoint yang berbeda:

[Buka DevTools](/web/tools/chrome-devtools/#open) kemudian hidupkan [Device
Mode](/web/tools/chrome-devtools/device-mode/#toggle).

Gunakan
[kontrol tampilan](/web/tools/chrome-devtools/device-mode/emulate-mobile-viewports#viewport-controls)
untuk memilih **Responsive**, yang menempatkan DevTools ke mode responsif.

Terakhir, buka menu Device Mode dan pilih
[**Show media queries**](/web/tools/chrome-devtools/device-mode/emulate-mobile-viewports#media-queries)
untuk menampilkan breakpoint sebagai bilah berwarna di atas laman Anda.

Klik pada salah satu bilah untuk menampilkan laman Anda saat kueri
media aktif. Klik kanan pada bilah untuk melompat ke definisi
kueri media. Lihat 
[Kueri media](/web/tools/chrome-devtools/device-mode/emulate-mobile-viewports#media-queries)
untuk bantuan lebih lanjut.


{# wf_devsite_translation #}
