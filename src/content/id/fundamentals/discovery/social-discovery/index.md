project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Anda bisa memengaruhi cara penampilan situs saat dibagikan lewat media sosial dengan menambahkan beberapa baris kode ke setiap laman. Ini bisa membantu menarik banyak orang ke situs Anda dengan menyediakan pratinjau dengan informasi yang lebih lengkap daripada yang disediakan situs lain.

{# wf_updated_on: 2014-11-08 #}
{# wf_published_on: 2014-10-07 #}

# Penemuan Sosial {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}

Anda bisa memengaruhi cara penampilan situs saat dibagikan lewat media sosial dengan
menambahkan beberapa baris kode ke setiap laman. Ini bisa membantu menarik banyak orang ke
situs Anda dengan menyediakan pratinjau dengan informasi yang lebih lengkap
daripada yang disediakan situs lain.


### TL;DR {: .hide-from-toc }
- Gunakan mikrodata schema.org untuk menyediakan judul laman, keterangan, dan gambar untuk Google+.
- Gunakan Open Graph Protocol (OGP) untuk menyediakan judul laman, keterangan, dan gambar untuk Facebook.
- Gunakan Twitter Cards untuk menyediakan judul laman, keterangan, dan gambar serta ID Twitter untuk Twitter.

Anda bisa memengaruhi cara penampilan situs saat dibagikan lewat media sosial dengan
menambahkan beberapa baris kode ke setiap laman. Ini bisa membantu meningkatkan interaksi dengan menyediakan
pratinjau dengan informasi yang lebih lengkap daripada yang disediakan situs lain.
Tanpa ini, situs sosial hanya akan menyediakan informasi dasar, tanpa gambar atau
informasi berguna lainnya. 

Manakah yang menurut Anda lebih cenderung diklik? Orang-orang tertarik pada gambar
dan merasa lebih yakin mereka akan suka apa mereka temukan bila mereka memiliki
pratinjaunya lebih dahulu.

<div class="attempt-left">
  <figure>
    <img src="imgs/gplus-snippet-2.png" srcset="imgs/gplus-snippet-2.png 1x,
      imgs/gplus-snippet-2-2x.png 2x" />
    <figcaption class="success">
      Dengan markup yang tepat: judul yang benar, keterangan
      singkat, dan gambar akan disertakan. Penambahan semua item ini bisa membantu
      meningkatkan interaksi.
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="imgs/gplus-snippet-1.png" srcset="imgs/gplus-snippet-1.png 1x,
      imgs/gplus-snippet-1-2x.png 2x" />
    <figcaption class="warning">
      Tanpa markup yang tepat, hanya judul laman yang akan
      disertakan.
     </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

Bila seseorang di jaringan sosial ingin membagikan situs web Anda dengan teman-temannya,
ia barangkali akan menambahkan beberapa catatan yang menjelaskan betapa menariknya situs web Anda, dan membagikannya.
Namun menjelaskan situs web cenderung merepotkan dan bisa melewatkan pendapat dari
sudut pandang pemilik laman. Sebagian layanan membatasi jumlah karakter yang bisa
dimasukkan pengguna dalam catatan.

Dengan menambahkan metadata yang sesuai ke laman, Anda bisa menyederhanakan proses
berbagi untuk pengguna dengan menyediakan judul, keterangan, dan
gambar yang menarik. Ini berarti mereka tidak perlu menghabiskan waktu (atau karakter)
yang berharga untuk menjelaskan tautan tersebut.

## Gunakan schema.org + mikrodata untuk menyediakan cuplikan yang lengkap di Google+

Perayap menggunakan banyak metode untuk mem-parse laman dan memahami materinya. Dengan menggunakan kosakata
[mikrodata](http://www.w3.org/TR/microdata/){: .external }, dan
[schema.org](https://schema.org/){: .external }, Anda membantu situs sosial dan
mesin telusur untuk memahami materi laman dengan lebih baik.

Inilah contohnya:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/discovery/social-discovery/_code/social-sites.html" region_tag="microdata" adjust_indentation="auto" %}
</pre>

Walaupun sebagian besar metadata disematkan di bagian tajuk laman web, mikrodata
tinggal di tempat konteks berada.

### Tambahkan `itemscope` untuk mendefinisikan cakupan mikrodata
Dengan menambahkan `itemscope`, Anda bisa menetapkan tag sebagai blok materi tentang
item khusus.

### Tambahkan `itemtype` untuk mendefinisikan tipe situs web
Anda bisa menetapkan tipe item dengan menggunakan atribut `itemtype` bersama
`itemscope`. Nilai `itemtype` bisa ditentukan sesuai dengan tipe
materi laman web Anda. Anda akan bisa menemukan yang relevan
di [laman ini](https://schema.org/docs/full.html).

### Tambahkan `itemprop` untuk menjelaskan setiap item menggunakan kosakata schema.org
`itemprop` mendefinisikan properti `itemtype` yang ada dalam cakupan. Untuk menyediakan
metadata ke situs sosial, nilai-nilai `itemprop` yang umum adalah `name`, `description`,
dan `image`.

### Ketahui selengkapnya
Mikrodata ini menyediakan informasi semantik kepada perayap, biasanya untuk
[Google+](https://plus.google.com/){: .external } dan Google Penelusuran. Untuk mengetahui selengkapnya tentang
cuplikan kode dan rendering di Google+, bacalah dokumen berikut:

* [Rendering Artikel - Platform Google+](/+/web/snippet/article-rendering)
* [Cuplikan - Platform Google+](/+/web/snippet/)

### Validasikan cuplikan yang lengkap
Untuk memvalidasi cuplikan yang lengkap di Google+, Anda bisa menggunakan alat seperti:

* [Alat (Bantu) Pengujian Data Terstruktur](https://www.google.com/webmasters/tools/richsnippets) - Alat Webmaster  

<img src="imgs/webmaster-tools.png" srcset="imgs/webmaster-tools.png 1x, imgs/webmaster-tools-2x.png 2x" />

## Gunakan Open Graph Protocol (OGP) untuk menyediakan cuplikan yang lengkap di Facebook

[Open Graph Protocol (OGP)](http://ogp.me/){: .external } membekali Facebook dengan
metadata yang diperlukan agar laman web bisa memiliki fungsionalitas yang sama seperti
objek Facebook lainnya.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/discovery/social-discovery/_code/social-sites.html" region_tag="ogp" adjust_indentation="auto" %}
</pre>

Bila disertakan di bagian tajuk laman Anda, metadata ini akan menyediakan
informasi cuplikan yang lengkap bila laman dibagikan.

### Gunakan tag `meta` dengan namespace `og:` untuk menjelaskan metadata
Tag `meta` terdiri dari atribut `property` dan atribut `content`.
Properti dan materi dapat mengambil nilai-nilai berikut:

<table>
  <thead>
    <tr>
      <th data-th="Property">Properti</th>
      <th data-th="Content">Materi</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Property"><code>og:title</code></td>
      <td data-th="Content">Judul laman web.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>og:description</code></td>
      <td data-th="Content">Keterangan laman web.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>og:url</code></td>
      <td data-th="Content">URL kanonis laman web.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>og:image</code></td>
      <td data-th="Content">URL ke gambar yang dilampirkan ke entri blog yang dibagikan.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>og:type</code></td>
      <td data-th="Content">String yang menunjukkan tipe laman web. Anda bisa menemukan yang cocok untuk laman web Anda <a href="https://developers.facebook.com/docs/reference/opengraph/">di sini</a>.</td>
    </tr>
  </tbody>
</table>

Tag meta ini menyediakan informasi semantik kepada perayap dari situs sosial,
biasanya dari [Google+](https://plus.google.com/){: .external } dan
[Facebook](https://www.facebook.com/){: .external }.

### Ketahui selengkapnya
Untuk mengetahui selengkapnya tentang apa saja yang bisa Anda lampirkan ke entri blog di Facebook, kunjungi
situs resmi Open Graph Protocol.

* [ogp.me](http://ogp.me/){: .external }

### Validasikan cuplikan yang lengkap
Untuk memvalidasi markup Anda di Facebook, Anda bisa menggunakan alat seperti:

* [Debugger](https://developers.facebook.com/tools/debug/){: .external }

## Gunakan Twitter Cards untuk menyediakan cuplikan yang lengkap di Twitter
[Twitter Cards](https://dev.twitter.com/docs/cards) adalah ekstensi ke
Open [Graph Protocol yang berlaku untuk Twitter](https://twitter.com/){: .external }. Semua itu memungkinkan
Anda menambahkan lampiran media seperti gambar dan video ke Tweet dengan tautan ke
laman web Anda. Dengan menambahkan metadata yang sesuai, Tweet dengan tautan ke
laman Anda akan ditambahi kartu yang menyertakan detail lengkap yang telah Anda tambahkan.

### Gunakan tag meta dengan namespace `twitter:` untuk menjelaskan metadata
Agar Twitter Card bisa berfungsi, [domain Anda harus
telah disetujui](https://cards-dev.twitter.com/validator) dan harus
berisi tag meta yang memiliki `twitter:card` sebagai atribut `name`, sebagai ganti atribut
`property`.
  
Inilah contoh ringkasnya:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/discovery/social-discovery/_code/social-sites.html" region_tag="twitter" adjust_indentation="auto" %}
</pre>

Dengan menetapkan ID Twitter ke nilai twitter:site, Twitter akan menyematkan
informasi ini dalam entri blog yang dibagikan sehingga orang-orang bisa mudah berinteraksi dengan
pemilik laman.

<img src="imgs/twitter-card.png" srcset="imgs/twitter-card.png 1x, imgs/twitter-card-2x.png 2x" />

### Ketahui selengkapnya
Untuk mengetahui selengkapnya tentang Twitter Cards, kunjungi:

* [Situs developer Twitter](https://dev.twitter.com/docs/cards)

### Validasikan cuplikan yang lengkap
Untuk memvalidasi markup Anda, Twitter menyediakan:

* [Card Validator](https://cards-dev.twitter.com/validator)

## Praktik Terbaik
Dengan ketiga opsi, hal terbaik yang bisa Anda lakukan adalah menyertakan semuanya dalam
laman web Anda. Inilah contohnya:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/discovery/social-discovery/_code/social-sites2.html" region_tag="best_practice" adjust_indentation="auto" %}
</pre>

Perhatikan, mikrodata dan OGP berbagi beberapa markup:

* `itemscope` berada di tag `head`
* `title` dan `description` digunakan bersama mikrodata dan OGP
* `itemprop="image"` menggunakan tag `link` dengan atribut `href` sebagai ganti
menggunakan ulang tag `meta` dengan `property="og:image"`
  
Terakhir, pastikan memvalidasi bahwa laman web Anda tampil sesuai harapan pada setiap
situs sosial sebelum mempublikasikannya.



{# wf_devsite_translation #}
