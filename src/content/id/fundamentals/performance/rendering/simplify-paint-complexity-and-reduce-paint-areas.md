project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Paint adalah proses pengisian piksel yang pada akhirnya akan dikomposisikan ke layar pengguna. Sering kali ini yang paling lama berjalan dari semua tugas di pipeline, dan harus dihindari jika memungkinkan.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2015-03-20 #}

# Menyederhanakan Kompleksitas Paint dan Mengurangi Area Paint {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

Paint adalah proses pengisian piksel yang pada akhirnya akan dikomposisikan ke 
layar pengguna. Sering kali ini yang paling lama berjalan dari semua tugas 
di pipeline, dan harus dihindari jika memungkinkan.

### TL;DR {: .hide-from-toc } 

* Mengubah properti selain transform dan opacity akan selalu memicu paint.
* Paint sering kali merupakan bagian paling berat dari pipeline piksel; hindari bila Anda bisa.
* Kurangi area paint melalui promosi layer dan orkestrasi animasi.
* Gunakan paint profiler di Chrome DevTools untuk menilai kompleksitas paint dan biayanya; kurangi bila Anda bisa.

## Memicu Layout atau Paint.

Jika Anda memicu layout, Anda akan _selalu memicu paint_, karena mengubah geometri elemen berarti pikselnya perlu diperbaiki!

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/frame.jpg"  alt="Pipeline piksel penuh.">

Anda juga bisa memicu paint jika mengubah properti non-geometrik, seperti latar belakang, warna teks, atau bayangan. Dalam hal itu, layout tidak akan diperlukan dan pipeline akan terlihat seperti ini:

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/frame-no-layout.jpg"  alt="Pipeline piksel tanpa layout.">

## Gunakan Chrome DevTools untuk mengidentifikasi bottleneck paint dengan cepat

<div class="attempt-right">
  <figure>
    <img src="images/simplify-paint-complexity-and-reduce-paint-areas/show-paint-rectangles.jpg" alt="Opsi Show paint rectangles di DevTools.">
  </figure>
</div>

Anda bisa menggunakan Chrome DevTools untuk mengidentifikasi dengan cepat area yang akan digambar. Masuk ke DevTools dan tekan tombol escape di keyboard Anda. Masuk ke tab rendering di panel yang muncul dan pilih “Show paint rectangles”.

<div style="clear:both;"></div>

Mengaktifkan opsi ini di Chrome akan mengisi layar dengan warna hijau bila terjadi penggambaran. Jika Anda melihat seluruh layar berisi warna hijau, atau area layar yang menurut Anda seharusnya tidak digambar, berarti Anda harus menyelidiki sedikit lebih jauh lagi.

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/show-paint-rectangles-green.jpg"  alt="Laman berkedip hijau bila penggambaran terjadi.">


<div class="attempt-right">
  <figure>
    <img src="images/simplify-paint-complexity-and-reduce-paint-areas/paint-profiler-toggle.jpg" alt="Toggle untuk mengaktifkan pembuatan profil paint di Chrome DevTools.">
  </figure>
</div>

Ada opsi di Timeline di Chrome DevTools yang akan memberi Anda informasi lebih banyak: paint profiler. Untuk mengaktifkannya, masuk ke Timeline dan centang kotak “Paint” di bagian atas. Anda perlu _mengaktifkannya hanya saat mencoba membuat profil masalah paint_, karena ini menimbulkan overhead dan akan membuat proses pembuatan profil kinerja Anda melenceng. Ini paling baik digunakan saat Anda menginginkan wawasan lebih banyak mengenai apa yang sebenarnya sedang digambar.

<div style="clear:both;"></div>

<div class="attempt-right">
  <figure>
    <img src="images/simplify-paint-complexity-and-reduce-paint-areas/paint-profiler-button.jpg" alt="Tombol untuk menampilkan paint profiler." class="screenshot">
  </figure>
</div>

Dari sini Anda sekarang dapat menjalankan perekaman Timeline, dan catatan paint akan memberikan detail yang jauh lebih banyak. Dengan mengeklik catatan paint dalam bingkai, Anda sekarang mendapatkan akses ke Paint Profiler untuk bingkai itu:

<div style="clear:both;"></div>

Mengeklik paint profiler akan memberikan tampilan tempat Anda bisa melihat apa yang digambar, waktu yang diperlukan, dan panggilan setiap paint yang diperlukan:

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/paint-profiler.jpg"  alt="Chrome DevTools Paint Profiler.">

Profiler ini memungkinkan Anda mengetahui area maupun kompleksitas (yakni waktu yang sebenarnya diperlukan untuk menggambar), dan keduanya merupakan area yang bisa Anda lihat untuk diperbaiki jika tidak bisa menghindari paint.

## Promosikan elemen yang berpindah atau memudar

Penggambaran tidak selalu dilakukan ke dalam satu gambar di memori. Sebenarnya, browser bisa saja menggambar ke dalam beberapa gambar, atau layer compositor, jika perlu.

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/layers.jpg"  alt="Representasi layer compositor.">

Manfaat pendekatan ini adalah elemen rutin digambar ulang, atau berpindah pada layar dengan transformasi, bisa ditangani tanpa memengaruhi elemen lain. Ini sama seperti pada paket aplikasi seni seperti Sketch, GIMP atau Photoshop, di mana masing-masing layer bisa ditangani dan dikomposisikan di atas layer lain untuk membuat gambar akhir.

Cara terbaik untuk membuat layer baru adalah menggunakan properti CSS `will-change`. Ini akan berfungsi di Chrome, Opera, dan Firefox, dan, dengan nilai `transform`, akan membuat layer compositor baru:


    .moving-element {
      will-change: transform;
    }


Untuk browser yang tidak mendukung `will-change`, namun memanfaatkan pembuatan layer, seperti Safari dan Mobile Safari, Anda perlu (salah)gunakan transformasi 3D untuk memaksa layer baru:


    .moving-element {
      transform: translateZ(0);
    }


Berhati-hatilah agar tidak terlalu banyak membuat layer, karena setiap layer memerlukan memori dan manajemen. Ada informasi selengkapnya mengenai hal ini di bagian [Berpeganglah pada properti compositor-saja dan kelola jumlah layer](stick-to-compositor-only-properties-and-manage-layer-count).

Jika Anda telah mempromosikan elemen ke layer baru, gunakan DevTools untuk mengkonfirmasikan bahwa melakukan hal itu memberi Anda manfaat kinerja. **Jangan promosikan elemen tanpa pembuatan profil.**

## Kurangi area paint

Kadang-kadang walaupun mempromosikan elemen, pekerjaan paint tetap diperlukan. Tantangan besar dalam masalah paint adalah karena browser menyatukan dua area yang memerlukan penggambaran, dan itu bisa mengakibatkan seluruh layar digambar ulang. Jadi, misalnya, jika Anda telah menetapkan header di bagian atas laman, sesuatu sedang digambar di bagian bawah layar, seluruh layar akhirnya mungkin akan digambar ulang.

Note: Pada elemen layar DPI Tinggi yang sudah ditetapkan, posisi secara otomatis dipromosikan ke layer kompositor-nya sendiri. Ini tidak jadi masalah pada perangkat DPI rendah karena promosi mengubah rendering teks dari subpiksel menjadi abu-abu, dan promosi layer perlu dilakukan secara manual.

Mengurangi area paint sering kali merupakan masalah orkestrasi animasi dan transisi Anda agar tidak banyak tumpang-tindih, atau menemukan cara untuk menghindari bagian laman tertentu.

## Menyederhanakan kompleksitas paint

<div class="attempt-right">
  <figure>
    <img src="images/simplify-paint-complexity-and-reduce-paint-areas/profiler-chart.jpg" alt="Waktu yang diperlukan untuk menggambar bagian layar.">
  </figure>
</div>

Dalam hal menggambar, beberapa hal lebih berat daripada yang lainnya. Misalnya, apa saja yang melibatkan blur (seperti bayangan, misalnya) akan memakan waktu lebih lama untuk digambar daripada -- katakan -- menggambar kotak merah. Walau demikian, dalam konteks CSS, hal ini tidak selalu jelas: `background: red;` dan `box-shadow: 0, 4px, 4px, rgba(0,0,0,0.5);` tidak harus terlihat memiliki karakteristik kinerja yang sangat berbeda, namun kenyataannya berbeda.

Paint profiler di atas akan memungkinkan Anda menentukan apakah perlu mencari cara lain untuk menghasilkan efek. Tanyakan pada diri sendiri mungkinkah menggunakan set gaya yang lebih murah atau cara alternatif untuk mendapatkan hasil akhir.

Bila bisa, Anda selalu ingin menghindari paint khususnya selama animasi, karena **10 md** yang Anda miliki per bingkai biasanya tidak cukup lama untuk menyelesaikan pekerjaan paint, terlebih pada perangkat seluler.


{# wf_devsite_translation #}
