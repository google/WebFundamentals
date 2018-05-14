project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Ketahui cara browser mengonstruksikan pohon DOM dan CSSOM.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2014-03-31 #}

# Mengonstruksikan Model Objek {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

Sebelum browser dapat merender laman, browser harus mengonstruksi pohon DOM dan CSSOM. Akibatnya, kita harus memastikan bahwa kita menyerahkan baik HTML maupun CSS ke browser sesegera mungkin.


### TL;DR {: .hide-from-toc }
- Byte → karakter → token → simpul → model objek.
- Markup HTML ditransformasikan menjadi Document Object Model (DOM), markup CSS ditransformasikan menjadi CSS Object Model (CSSOM).
- DOM dan CSSOM adalah struktur data yang independen.
- Timeline di Chrome DevTools memungkinkan kita merekam dan memeriksa konstruksi dan biaya pemrosesan DOM dan CSSOM.


## Document Object Model (DOM)

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/basic_dom.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/basic_dom.html){: target="_blank" .external }

Mari kita mulai dengan kasus yang sesederhana mungkin: laman HTML biasa dengan beberapa teks dan satu gambar. Bagaimana browser memroses laman ini?

<img src="images/full-process.png" alt="Proses konstruksi DOM">

1. **Konversi:** Browser membaca byte mentah dari HTML dari disk atau jaringan dan menerjemahkannya menjadi karakter individual berdasarkan enkode yang ditetapkan file (mis. UTF-8).
1. **Pentokenan:** Browser mengonversi string karakter ke dalam token khas&mdash;yang ditetapkan oleh [standar W3C HTML5](http://www.w3.org/TR/html5/){: .external }; misalnya, "&lt;html&gt;", "&lt;body&gt;"&mdash;dan string lainnya di dalam kurung siku. Setiap token memiliki arti spesial dan seperangkat aturan.
1. **Lexing:** Token yang dipancarkan dikonversikan ke dalam "objek" yang mendefinisikan properti dan aturannya.
1. **Konstruksi DOM:** Terakhir, karena markup HTML mendefinisikan tag berbeda di antara tag (sebagian tag berada di dalam tag), objek yang dibuat ditautkan dalam struktur data pohon yang juga merekam hubungan induk-anak yang didefinisikan dalam markup asli: objek _HTML_ adalah induk dari objek _body_, _body_ adalah induk dari _paragraph_, dan seterusnya.

<img src="images/dom-tree.png"  alt="Pohon DOM">

**Keluaran akhir dari keseluruhan proses ini adalah Document Object Model (DOM) dari laman sederhana kita, yang digunakan browser untuk semua pemrosesan laman lebih lanjut.**

Setiap kali browser memroses markup HTML, browser harus melewati semua langkah di atas: mengonversikan byte menjadi karakter, mengidentifikasi token, mengonversikan token menjadi simpul, dan membangun pohon DOM. Keseluruhan proses ini bisa membutuhkan waktu, terutama jika jumlah HTML yang harus diproses sangat banyak.

<img src="images/dom-timeline.png"  alt="Melacak konstruksi DOM dalam DevTools">

Note: Kami menganggap sudah memiliki pengetahuan dasar Chrome DevTools - artinya Anda sudah tahu cara merekam jenjang jaringan, atau merekam timeline. Jika Anda butuh penyegaran cepat, lihat <a href='/web/tools/chrome-devtools/'>dokumentasi Chrome DevTools</a>, atau jika Anda baru mengenal DevTools, sebaiknya mengambil kursus <a href='http://discover-devtools.codeschool.com/'>Discover DevTools</a> dari Codeschool.

Jika Anda membuka Chrome DevTools dan merekam timeline saat laman dimuat, Anda bisa melihat waktu sebenarnya yang dihabiskan untuk melakukan langkah ini&mdash;dalam contoh di atas, butuh waktu sekitar 5 md untuk mengonversikan HTML dalam jumlah besar ke dalam pohon DOM. Untuk laman yang lebih besar, proses ini mungkin menghabiskan waktu lebih lama. Saat pembuatan animasi yang lancar, hal ini bisa menjadi bottleneck apabila browser harus memroses banyak HTML.

Pohon DOM merekam properti dan hubungan dari markup dokumen, namun ia sama sekali tidak memberi tahu kita tentang bagaimana elemen akan terlihat saat dirender. Itu adalah tanggung jawab CSSOM.

## CSS Object Model (CSSOM)

Sementara browser mengonstruksikan DOM dari laman sederhana kita, browser menemukan tag tautan dalam bagian kepala dokumen yang merujuk ke stylesheet CSS eksternal: style.css. Dengan mengantisipasi bahwa browser membutuhkan sumber daya ini untuk merender laman, browser segera mengeluarkan permintaan untuk sumber daya ini, yang dikembalikan dengan materi berikut:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/style.css" region_tag="full" adjust_indentation="auto" %}
</pre>

Kita bisa mendeklarasikan gaya kita secara langsung di dalam markup HTML (inline), namun menjaga CSS kita tetap independen dari HTML memungkinkan kita untuk memperlakukan materi dan desain sebagai dua hal berbeda: desainer bisa mengerjakan CSS, developer bisa fokus pada HTML, dan seterusnya.

Seperti halnya dengan HTML, kita harus mengonversikan aturan CSS yang diterima menjadi sesuatu yang bisa dipahami dan dikerjakan oleh browser. Dengan demikian, kita mengulang kembali proses HTML, namun untuk CSS, bukan HTML:

<img src="images/cssom-construction.png"  alt="Langkah-langkah konstruksi CSSOM">

Byte CSS dikonversikan menjadi karakter, selanjutnya menjadi token dan simpul, dan akhirnya ditautkan ke dalam struktur pohon yang dikenal sebagai "CSS Object Model" (CSSOM):

<img src="images/cssom-tree.png"  alt="Pohon CSSOM">

Mengapa CSSOM memiliki struktur pohon? Saat menghitung seperangkat gaya akhir untuk setiap objek pada laman, browser memulai dengan aturan paling umum yang berlaku untuk simpul itu (misalnya apakah ia anak dari elemen tubuh, kemudian semua gaya tubuh diterapkan) dan selanjutnya berulang-ulang menyaring gaya terkomputasi dengan menerapkan aturan yang lebih spesifik; misalnya, aturan "penguraian menurun".

Agar lebih konkret, mari kita lihat pohon CSSOM di atas. Sembarang teks yang ada di dalam tag _span_ yang ditempatkan di dalam elemen body akan memiliki ukuran font 16 piksel dan berwarna merah&mdash;direktif ukuran font diuraikan ke bawah dari tubuh hingga bentangannya. Akan tetapi, apabila tag bentang merupakan anak dari sebuah tag paragraf (p), maka materinya tidak ditampilkan.

Selain itu, perhatikan bahwa pohon di atas bukanlah pohon CSSOM yang komplet dan hanya menampilkan gaya yang kita putuskan untuk diganti di stylesheet kita. Setiap browser menyediakan seperangkat gaya default yang juga dikenal sebagai "gaya agen pengguna"&mdash;itulah yang kita lihat ketika kita tidak menyediakan salah satu gaya kita&mdash;dan gaya kita hanya menggantikan default ini (mis. [gaya IE default](http://www.iecss.com/){: .external }).

Untuk mencari tahu seberapa lama pemrosesan CSS, Anda bisa merekam sebuah timeline di DevTools dan cari kejadian "Recalculate Style": tidak seperti penguraian DOM, timeline tidak menampilkan entri "Parse CSS" terpisah, dan malahan merekam parsing dan konstruksi pohon CSSOM, plus perhitungan berulang-ulang gaya terkomputasi di bawah kejadian tunggal ini.

<img src="images/cssom-timeline.png"  alt="Melacak konstruksi CSSOM dalam DevTools">

Stylesheet sederhana kita ini membutuhkan waktu pemrosesan ~0,6 md dan memengaruhi delapan elemen pada laman&mdash;tidak banyak, namun sekali lagi, tidak bebas. Namun demikian, dari manakah asal delapan elemen ini? CSSOM dan DOM adalah struktur data yang independen! Diketahui kemudian, browser menyembunyikan langkah penting. Berikutnya, mari kita bicarakan tentang [pohon render](/web/fundamentals/performance/critical-rendering-path/render-tree-construction) yang bersama menautkan DOM dan CSSOM semuanya.

<a href="render-tree-construction" class="gc-analytics-event"
    data-category="CRP" data-label="Next / Render-Tree Construction">
  <button>Berikutnya: Konstruksi Pohon Render, Layout, dan Menggambar</button>
</a>


{# wf_devsite_translation #}
