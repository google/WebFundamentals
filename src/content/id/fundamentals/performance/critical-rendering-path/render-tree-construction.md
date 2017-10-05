project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: TODO

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2014-03-31 #}

# Konstruksi Pohon Render, Layout, dan Menggambar {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

Pohon CSSOM dan DOM digabungkan ke dalam satu pohon render, yang selanjutnya digunakan 
 untuk menghitung layout dari setiap elemen yang terlihat dan berfungsi sebagai masukan ke 
proses menggambar yang merender piksel ke layar. Mengoptimalkan masing-masing langkah 
ini penting untuk mencapai kinerja rendering yang optimal.

Dalam bagian sebelumnya mengenai pengkonstruksian model objek, kami membangun DOM dan
pohon CSSOM berdasarkan masukan HTML dan CSS. Akan tetapi, keduanya merupakan
objek independen yang merekam berbagai aspek dokumen yang berbeda: satu
menjelaskan materi dan yang lainnya menjelaskan aturan gaya yang harus
diterapkan pada dokumen. Bagaimana kita menggabungkan keduanya dan memerintahkan browser untuk merender
piksel pada layar?

### TL;DR {: .hide-from-toc }
- Pohon DOM dan CSSOM digabungkan untuk membentuk pohon render.
- Pohon render hanya mengandung simpul yang dibutuhkan untuk merender laman.
- Layout menghitung posisi dan ukuran sebenarnya dari setiap objek.
- Menggambar adalah langkah terakhir yang berlangsung di pohon render dan merender piksel ke layar.


Langkah pertama adalah agar browser menggabungkan DOM dan CSSOM menjadi satu "pohon render" yang merekam semua materi DOM yang terlihat pada laman dan semua informasi gaya CSSOM untuk setiap simpul.

<img src="images/render-tree-construction.png" alt="DOM dan CSSOM digabungkan untuk membuat pohon render" >

Untuk mengonstruksikan pohon render, browser secara kasar kira-kira melakukan yang berikut:

1. Memulai pada akar pohon DOM, menyusuri setiap simpul yang terihat.

    * Sebagian simpul sama sekali tidak terlihat (misalnya, tag skrip, tag meta, dst.), serta ditiadakan karena tidak tercermin dalam keluaran yang dirender.
    * Beberapa simpul tersembunyi melalui CSS dan juga dihilangkan dari pohon render; misalnya, simpul rentang---dalam contoh di atas---hilang dari pohon render karena kita memiliki aturan eksplisit yang menetapkan properti "display: none" di sana.

1. Untuk setiap simpul yang terlihat, temukan aturan CSSOM yang sesuai dan terapkan.
1. Pancarkan simpul yang terlihat dengan materi dan gaya terkomputasi.

Note: Untuk catatan, perhatikan bahwa `visibility: hidden` berbeda dari `display: none`. Yang pertama membuat elemen tidak terlihat, namun elemen itu masih menempati ruang dalam layout (yaitu dirender sebagai kotak kosong), sementara yang kedua (`display: none`) meniadakan seluruh elemen dari pohon render sedemikian hingga elemen itu tidak terlihat dan bukan merupakan bagian dari layout.

Keluaran akhirnya adalah sebuah render yang berisi materi serta informasi gaya dari semua materi yang terlihat pada layar.  **Dengan telah ditetapkannya pohon render, kita bisa melanjutkan ke tahapan "layout".**

Sejauh ini kita telah menghitung simpul mana yang harus terlihat dan gaya terkomputasi, namun kita belum menghitung posisi dan ukuran persisnya di dalam [tampilan yang terlihat](/web/fundamentals/design-and-ux/responsive/#set-the-viewport) perangkat---itulah tahap "layout", disebut juga "mengubah posisi/geometri."

Untuk menghitung ukuran dan posisi persisnya dari setiap objek pada laman, browser akan memulai di akar pohon render dan menjalankannya. Mari kita lihat contoh praktik sederhana berikut ini:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/nested.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/nested.html){: target="_blank" .external }

Tubuh laman di atas mengandung dua div yang disarangkan: div pertama (induk) menetapkan ukuran tampilan dari simpul hingga 50% dari lebar tampilan yang terlihat, dan div kedua---yang ditampung oleh induk---menetapkan lebarnya sebagai 50% dari induknya; yaitu, 25% dari lebar tampilan yang terlihat.

<img src="images/layout-viewport.png" alt="Menghitung informasi layout" >

Keluaran dari proses layout adalah "model kotak" yang dengan persis merekam posisi yang tepat dan ukuran dari setiap elemen di dalam tampilan yang terlihat: semua pengukuran relatif dikonversikan ke posisi piksel absolut dari layar.

Terakhir, setelah kini kita mengetahui simpul mana yang terlihat, gaya perhitungannya, dan geometri, akhirnya kita bisa meneruskan informasi ini ke tahap terakhir yang akan mengonversikan setiap simpul dalam pohon render ke piksel sebenarnya pada layar. Langkah ini sering disebut "painting" (penggambaran) atau "rasterizing" (rasterisasi).

Ini dapat dilakukan kapan saja karena browser harus melakukan cukup banyak pekerjaan. Namun, Chrome DevTools dapat menyediakan beberapa wawasan ke dalam tiga tahapan yang dijelaskan di atas. Marilah kita mempelajari tahap layout untuk contoh "hello world" awal kita:

<img src="images/layout-timeline.png" alt="Mengukur layout di DevTools" >

* Kejadian "Layout" menangkap konstruksi pohon render, posisi, dan perhitungan ukuran di Timeline.
* Setelah layout selesai, browser akan menerbitkan kejadian "Paint Setup" dan "Paint" yang mengonversikan pohon render ke piksel sebenarnya pada layar.

Waktu yang diperlukan untuk melakukan konstruksi pohon render, layout dan menggambar akan berbeda-beda berdasarkan ukuran dokumen, gaya yang diterapkan, dan tentu saja, perangkat yang menjalankannya: semakin besar dokumen, semakin banyak tugas yang harus dilakukan browser, semakin rumit gayanya, semakin lama waktu yang dihabiskan untuk penggambaran juga (mis. warna solid "mudah" digambar, dan bayangan jatuh jauh lebih "sulit" dihitung dan dirender).

Laman ini akhirnya bisa dilihat di tampilan yang terlihat:

<img src="images/device-dom-small.png" alt="Laman Hello World yang dirender" >

Ini adalah rekap cepat langkah-langkah browser:

1. Memproses markup HTML dan membangun pohon DOM.
1. Memproses markup CSS dan membangun pohon CSSOM.
1. Memadukan DOM dan CSSOM ke dalam pohon render.
1. Menjalankan layout pada pohon render untuk menghitung geometri setiap simpul.
1. Menggambar setiap simpul ke layar.

Laman demo kami mungkin tampak sederhana, namun memerlukan cukup banyak pekerjaan! Jika DOM atau CSSOM dimodifikasi, Anda harus mengulangi proses untuk mencari tahu piksel yang perlu dirender di layar.

**_Mengoptimalkan jalur rendering penting_ adalah proses meminimalkan jumlah total waktu yang dihabiskan dalam langkah 1 sampai 5 pada urutan di atas.** Hal itu memungkinkan kita untuk merender materi ke layar sesegera mungkin dan juga mengurangi jumlah waktu antara pembaruan layar setelah render awal - yaitu mencapai laju penyegaran untuk materi interaktif.

<a href="render-blocking-css" class="gc-analytics-event"
    data-category="CRP" data-label="Next / Render-Blocking CSS">
  <button>Berikutnya: CSS Pemblokiran Render</button>
</a>


{# wf_devsite_translation #}
