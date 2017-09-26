project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Pola desain web responsif berkembang dengan pesat, namun ada beberapa pola yang sudah terbukti bekerja dengan baik di desktop dan perangkat seluler.

{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2014-04-29 #}

# Pola Desain Web Responsif {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

Pola desain web responsif berkembang dengan pesat, namun ada beberapa pola yang sudah terbukti bekerja dengan baik di desktop dan perangkat seluler.

Kebanyakan layout yang digunakan oleh laman web responsif bisa dikategorikan ke dalam salah satu dari lima
pola ini: mostly fluid, column drop, layout shifter, tiny tweaks dan off canvas.
Pada beberapa kejadian, laman mungkin menggunakan kombinasi pola, misalnya column drop
dan off canvas.  Pola-pola ini, yang awalnya diidentifikasi oleh [Luke
Wroblewski](http://www.lukew.com/ff/entry.asp?1514), memberikan titik
awal yang solid untuk setiap laman responsif.

### Pola

Agar sederhana serta mudah dipahami, masing-masing contoh di bawah ini dibuat dengan markup sungguhan menggunakan
[`flexbox`](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Flexible_boxes),
biasanya dengan tiga materi `div` yang ditempatkan dalam kontainer primer `div`.
 Setiap contoh tersebut ditulis dimulai dari tampilan terkecil terlebih dahulu, dan ditambahkan
breakpoint bila diperlukan.  [Mode layout flexbox didukung dengan
baik](http://caniuse.com/#search=flexbox) untuk browser modern, meskipun mungkin masih
memerlukan awalan vendor untuk dukungan optimal.

## Mostly Fluid

Pola mostly fluid utamanya terdiri dari grid yang cair.  Pada layar besar atau
medium, biasanya ukurannya tetap sama, hanya menyesuaikan margin
pada layar yang lebih lebar.

Pada layar yang lebih kecil, grid yang cair menyebabkan materi utama untuk meng-ubah posisi/geometri,
seiring kolom ditumpuk secara vertikal.  Salah satu keuntungan utama dari pola ini adalah
bahwa pola ini biasanya hanya membutuhkan satu breakpoint antara layar kecil dan layar
besar.

<img src="imgs/mostly-fluid.svg">
<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/mostly-fluid.html" class="button button-primary">Cobalah</a>

Pada tampilan terkecil, masing-masing `div` materi ditumpuk secara vertikal.  Saat lebar
layar menyentuh 600 px, materi `div` utama tetap berukuran `width: 100%`, sedangkan
`div` sekunder ditampilkan sebagai dua kolom di bawah `div` utama.  Di atas
800px, lebar kontainer `div` menjadi konstan dan di tengah layar.

Situs yang menggunakan pola ini antara lain:

 * [A List Apart](http://mediaqueri.es/ala/){: .external }
 * [Media Queries](http://mediaqueri.es/){: .external }
 * [SimpleBits](http://simplebits.com/){: .external }

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/mostly-fluid.html" region_tag="mfluid" adjust_indentation="auto" %}
</pre>

## Kolom drop 

Untuk layout multi-kolom lebar-penuh, column drop hanya menumpuk kolom
secara vertikal saat lebar jendela terlalu sempit untuk materi.

Pada akhirnya proses ini mengakibatkan semua kolom ditumpuk secara vertikal.  Memilih
breakpoint untuk pola layout ini bergantung pada materi dan berubah
untuk setiap desain.

<img src="imgs/column-drop.svg">
<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/column-drop.html" class="button button-primary">Cobalah</a>

Seperti kebanyakan contoh fluid, materi ditumpuk secara vertikal pada tampilan
terkecil, namun ketika layar diluaskan melebihi 600px, materi
`div` primer dan sekunder akan menggunakan lebar maksimal layar.  Urutan `div` diatur menggunakan
properti urutan CSS.  Pada 800px ketiga materi `div` ditampilkan, menggunakan
lebar layar penuh.

Situs yang menggunakan pola ini antara lain:

 * [Modernizr](https://modernizr.com/){: .external }
 * [Wee Nudge](http://weenudge.com/){: .external }

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/column-drop.html" region_tag="cdrop" adjust_indentation="auto" %}
</pre>

## Layout shifter

Pola layout shifter adalah pola yang paling responsif, dengan beberapa
breakpoint melintasi beberapa lebar layar.

Kunci layout ini adalah tentang cara materi bergerak, bukan meng-ubah posisi/geometri dan
menjatuhkannya di bawah kolom lainnya.  Oleh karena perbedaan signifikan antara masing-masing
breakpoint utama, itu lebih kompleks untuk mempertahankan dan mungkin melibatkan perubahan
dalam elemen, bukan hanya layout materi secara keseluruhan.

<img src="imgs/layout-shifter.svg">
<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/layout-shifter.html" class="button button-primary">Cobalah</a>

Contoh yang disederhanakan ini menunjukkan pola layout shifter, pada layar yang lebih kecil
materi ditumpuk secara vertikal, namun berubah secara signifikan ketika layar semakin
besar, dengan `div` kiri dan dua `div` yang ditumpuk di sebelah kanan.

Situs yang menggunakan pola ini antara lain:

 * [Food Sense](http://foodsense.is/){: .external }
 * [Contoh
  Desain Responsif Seminal](http://alistapart.com/d/responsive-web-design/ex/ex-site-FINAL.html)
 * [Andersson-Wise Architects](http://www.anderssonwise.com/){: .external }

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/layout-shifter.html" region_tag="lshifter" adjust_indentation="auto" %}
</pre>

## Tiny tweaks

Tiny tweaks hanya melakukan perubahan kecil ke layout, seperti menyesuaikan ukuran
font, mengubah ukuran gambar atau memindahkan materi dengan sangat kecil.

Ini bekerja dengan baik pada layout kolom tunggal seperti situs web linear laman tunggal dan artikel yang mengandung banyak teks.

<img src="imgs/tiny-tweaks.svg">
<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/tiny-tweaks.html" class="button button-primary">Cobalah</a>

Sesuai dengan namanya, tidak banyak perubahan yang dilakukan dengan contoh ini ketika ukuran layar berubah.
Ketika lebar layar bertambah besar, begitu juga ukuran font dan pengisi.

Situs yang menggunakan pola ini antara lain:

 * [Ginger Whale](http://gingerwhale.com/){: .external }
 * [Future Friendly](http://futurefriendlyweb.com/){: .external }

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/tiny-tweaks.html" region_tag="ttweaks" adjust_indentation="auto" %}
</pre>


## Off canvas

Bukannya menumpuk materi secara vertikal, pola off canvas menempatkan
materi yang lebih jarang digunakan&mdash;mungkin navigasi atau menu aplikasi&mdash;yang tidak terlihat di layar, dan hanya
menampilkannya ketika ukuran layar cukup besar, pada layar yang lebih kecil,
materi hanya satu klik jauhnya.

<img src="imgs/off-canvas.svg">
<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/off-canvas.html" class="button button-primary">Cobalah</a>

Bukannya menumpuk materi secara vertikal, contoh ini menggunakan deklarasi `transform: translate(-250px, 0)` untuk menyembunyikan dua `div` materi dari layar.  JavaScript digunakan
untuk menampilkan div dengan menambahkan kelas terbuka ke elemen untuk membuatnya terlihat.  Ketika
layar semakin lebar, posisi off-screen akan dihapus dari elemen dan
mereka ditampilkan dalam tampilan yang terlihat.

Perhatikan dalam contoh ini, Safari untuk iOS 6 dan Browser Android tidak mendukung fitur
`flex-flow: row nowrap` dari `flexbox`, jadi kami terpaksa melakukan fallback ke
pemosisian absolut.

Situs yang menggunakan pola ini antara lain:

 * [Artikel HTML5Rocks](http://www.html5rocks.com/en/tutorials/developertools/async-call-stack/)
 * [Google Nexus](https://www.google.com/nexus/){: .external }
 * [Situs Seluler Facebook](https://m.facebook.com/){: .external }

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/off-canvas.html" region_tag="ocanvas" adjust_indentation="auto" %}
</pre>


{# wf_devsite_translation #}
