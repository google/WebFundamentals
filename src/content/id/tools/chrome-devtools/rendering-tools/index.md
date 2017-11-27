project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Pengguna mengharapkan laman berjalan mulus dan interaktif. Setiap tahap di pipeline piksel menyatakan peluang timbulnya jank. Pelajari tentang alat dan strategi untuk mengidentifikasi dan memperbaiki masalah umum yang memperlambat kinerja waktu proses.

{# wf_updated_on: 2016-03-15 #}
{# wf_published_on: 2015-04-13 #}

# Analisis Kinerja Waktu Proses {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

Pengguna mengharapkan laman berjalan mulus dan interaktif. Setiap 
tahap di pipeline piksel menggambarkan peluang kehadiran jank. Pelajari 
alat dan strategi untuk mengidentifikasi dan memperbaiki masalah umum yang memperlambat 
kinerja waktu proses.


### TL;DR {: .hide-from-toc }
- Jangan tulis JavaScript yang memaksa browser menghitung ulang layout. Pisahkan fungsi baca dan tulis dan lakukan fungsi baca terlebih dulu.
- Hindari CSS yang terlalu rumit. Gunakan CSS yang lebih minim dan sederhanakan pemilih CSS Anda.
- Hindari layout sebisa mungkin. Pilih CSS yang tidak memicu layout sama sekali.
- Paint bisa memakan waktu lebih lama dibandingkan aktivitas rendering lainnya. Perhatikan bottleneck pada paint.


## JavaScript 

Kalkulasi JavaScript, khususnya yang memicu perubahan visual yang berat,
bisa menghambat kinerja aplikasi. Jangan biarkan 
JavaScript yang pengaturan waktunya buruk dan berjalan lama mengganggu interaksi pengguna.

### Alat

Buat [rekaman][recording] **Timeline** dan cari kejadian 
**Evaluate Script** yang dicurigai terlalu lama. Jika menemukannya, Anda bisa mengaktifkan 
[JS Profiler][profiler] dan merekam ulang untuk mendapatkan informasi 
lebih detail tentang fungsi JS mana yang tepatnya dipanggil dan berapa lama waktu yang dibutuhkan 
oleh setiap fungsi tersebut.

Jika melihat ada cukup banyak jank di JavaScript, Anda mungkin perlu 
meningkatkan analisis dan mengumpulkan profil CPU JavaScript.
Profil CPU menampilkan tempat waktu eksekusi dihabiskan di dalam fungsi laman Anda.
Pelajari cara membuat profil CPU di [Percepat Eksekusi JavaScript][cpu].

[profiler]: ../evaluate-performance/timeline-tool#profile-js
[cpu]: js-execution

### Masalah

Tabel berikut menjelaskan beberapa masalah JavaScript yang umum dan kemungkinan solusinya:

<table>
  <thead>
      <th>Masalah</th>
      <th>Contoh</th>
      <th>Solusi</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Problem">Penangan masukan berat yang memengaruhi respons atau animasi.</td>
      <td data-th="Example">Pengguliran paralaks sentuh.</td>
      <td data-th="Solution">Biarkan browser menangani sentuhan dan pengguliran, atau mengikat listener seakhir mungkin (lihat <a href="http://calendar.perfplanet.com/2013/the-runtime-performance-checklist/">Expensive Input Handlers di daftar periksa kinerja waktu proses Paul Lewis</a>).</td>
    </tr>
    <tr>
      <td data-th="Problem">JavaScript yang waktu eksekusinya buruk akan memengaruhi respons, animasi, dan pemuatan.</td>
      <td data-th="Example">Pengguna langsung menggulir setelah laman dimuat, setTimeout / setInterval.</td>
      <td data-th="Solution"><a href="/web/fundamentals/performance/rendering/optimize-javascript-execution">Optimalkan eksekusi JavaScript</a>: gunakan <code>requestAnimationFrame</code>, sebarkan manipulasi DOM ke berbagai bingkai, gunakan Web Worker.</td>
    </tr>
    <tr>
      <td data-th="Problem">JavaScript yang berjalan lama memengaruhi respons.</td>
      <td data-th="Example">Kejadian <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers">DOMContentLoaded</a> berhenti karena mendapat pekerjaan berat dari JS.</td>
      <td data-th="Solution">Pindahkan pekerjaan komputasi murni ke <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers">Web Worker</a>. Jika Anda memerlukan akses DOM, gunakan <code>requestAnimationFrame</code> (lihat juga <a href="/web/fundamentals/performance/rendering/optimize-javascript-execution">Optimalkan Eksekusi JavaScript</a>).</td>
    </tr>
    <tr>
      <td data-th="Problem">Skrip tidak berharga yang memengaruhi respons atau animasi.</td>
      <td data-th="Example">Pengumpulan sampah bisa terjadi di mana saja.</td>
      <td data-th="Solution">Kurangi penulisan skrip tidak berharga (lihat <a href="http://calendar.perfplanet.com/2013/the-runtime-performance-checklist/">Garbage Collection in Animation di daftar periksa kinerja waktu proses dari Paul Lewis</a>).</td>
    </tr>
  </tbody>
</table>

## Gaya 

Perubahan gaya itu hal yang berat, terlebih jika perubahan itu memengaruhi lebih dari satu 
elemen di DOM. Setiap kali Anda menerapkan gaya ke sebuah elemen, browser 
harus memahami dampaknya pada semua elemen terkait, menghitung ulang layout, dan 
menggambar ulang.

Panduan Terkait:

* [Kurangi Cakupan dan Kompleksitas Penghitungan
  Gaya](/web/fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations)

### Alat

Buat [rekaman][recording] **Timeline**. Periksa rekaman untuk mengetahui adanya kejadian
**Recalculate Style** yang besar (ditampilkan dalam warna ungu).

Klik sebuah kejadian **Recalculate Style** untuk menampilkan informasi selengkapnya tentang di 
panel **Details**. Jika perubahan gaya memakan waktu lama, artinya ini berdampak buruk 
bagi kinerja. Jika penghitungan gaya memengaruhi banyak sekali 
elemen, area ini layak diperbaiki.

![Recalculate style yang panjang](imgs/recalculate-style.png)

Untuk mengurangi dampak kejadian **Recalculate Style**:

* Gunakan [Pemicu CSS](https://csstriggers.com) untuk mempelajari properti CSS mana
  yang memicu layout, gambar, dan komposit. Properti ini memiliki dampak terburuk
  terhadap kinerja rendering.
* Alihkan ke properti yang dampaknya lebih sedikit. Lihat [Berpeganglah pada properti 
  compositor-saja dan kelola jumlah layer][compositor] untuk panduan selengkapnya.

[compositor]: /web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count

### Masalah

Tabel berikut menjelaskan beberapa masalah gaya yang umum dan kemungkinan 
solusinya:

<table>
  <thead>
      <th>Masalah</th>
      <th>Contoh</th>
      <th>Solusi</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Problem">Penghitungan gaya yang berat memengaruhi respons atau animasi.</td>
      <td data-th="Example">Properti CSS apa pun yang mengubah geometri elemen, seperti lebar, tinggi, atau posisinya; browser harus memeriksa semua elemen lain dan mengulangi layout.</td>
      <td data-th="Solution"><a href="/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing">Hindari CSS yang memicu layout.</a></td>
    </tr>
    <tr>
      <td data-th="Problem">Pemilih yang kompleks memengaruhi respons atau animasi.</td>
      <td data-th="Example">Pemilih tersarang memaksa browser untuk mengetahui semuanya tentang elemen lain, termasuk induk dan anak.</td>
      <td data-th="Solution"><a href="/web/fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations">Referensikan sebuah elemen di CSS Anda hanya dengan satu kelas.</a></td>
    </tr>
  </tbody>
</table>

Panduan Terkait:

* [Kurangi Cakupan dan Kompleksitas Penghitungan
  Gaya](/web/fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations)

## Layout 

Layout (atau mengubah posisi/geometri di Firefox) adalah proses yang digunakan browser untuk menghitung 
posisi dan ukuran semua elemen di sebuah laman. Model layout web 
berarti bahwa satu elemen bisa memengaruhi elemen lain; misalnya, lebar elemen 
`<body>` biasanya memengaruhi lebar anaknya dan seterusnya
ke atas dan ke bawah pohon. Proses ini bisa sangat memberatkan 
browser.

Sebagai panduan umum, jika Anda meminta nilai geometris kembali dari 
DOM sebelum bingkai selesai, Anda akan menemukan 
"layout sinkron paksa", yang bisa menjadi bottleneck kinerja yang besar jika 
sering diulang atau dilakukan untuk pohon DOM yang besar. 

Panduan Terkait:

* [Hindari Layout
  Thrashing](/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing)
* [Diagnosis Layout Sinkron
  Paksa](/web/tools/chrome-devtools/rendering-tools/forced-synchronous-layouts)


### Alat

**Timeline** di Chrome DevTools mengidentifikasi kapan laman menyebabkan layout
sinkron paksa. Kejadian **Layout** ini ditandai dengan bilah merah. 

![layout sinkron paksa](imgs/forced-synchronous-layout.png)

"Layout thrashing" adalah pengulangan kondisi layout sinkron paksa.
Ini terjadi bila JavaScript berulang kali menulis dan membaca DOM, yang
memaksa browser menghitung ulang layout berulang kali. Untuk mengidentifikasi
layout thrashing, cari pola peringatan beberapa layout sinkron paksa
(seperti di tangkapan layar di atas).

### Masalah

Tabel berikut menjelaskan beberapa masalah layout yang umum dan kemungkinan 
solusinya:

<table>
  <thead>
      <th>Masalah</th>
      <th>Contoh</th>
      <th>Solusi</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Problem">Layout sinkron paksa memengaruhi respons atau animasi.</td>
      <td data-th="Example">Memaksa browser melakukan layout lebih awal di pipeline piksel, sehingga mengakibatkan pengulangan langkah di proses rendering.</td>
      <td data-th="Solution">Batch pembacaan gaya terlebih dahulu, kemudian lakukan penulisan (lihat juga <a href="/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing">Hindari layout besar dan kompleks serta layout thrashing</a>).</td>
    </tr>
  </tbody>
    <tr>
      <td data-th="Problem">Layout trashing memengaruhi respons atau animasi.</td>
      <td data-th="Example">Loop yang menempatkan browser ke dalam siklus baca-tulis-baca-tulis, yang memaksa browser menghitung ulang berulang kali.</td>
      <td data-th="Solution">Secara otomatis batch operasi baca-tulis menggunakan <a href="https://github.com/wilsonpage/fastdom">pustaka FastDom</a>.</td>
    </tr>
  </tbody>
</table>

## Paint dan composite 

Paint adalah proses pengisian piksel. Ini sering kali menjadi bagian yang paling memakan sumber daya di 
rendering. Jika melihat laman tersendat, 
kemungkinan Anda mengalami masalah paint.

Komposisi adalah tempat bagian yang digambar pada laman ditempatkan bersama untuk 
ditampilkan di layar. Sebagian besar, jika Anda tetap berpegang pada properti 
compositor saja dan sekaligus menghindari paint, Anda seharusnya akan melihat peningkatan kinerja 
yang besar, namun Anda perlu mewaspadai hitungan layer yang berlebih (lihat 
juga [Berpeganglah pada properti compositor-saja dan kelola jumlah layer](/web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count)).

### Alat

Ingin mengetahui berapa lama waktu yang dibutuhkan untuk menggambar dan berapa sering penggambaran terjadi? Aktifkan 
[Paint profiler][paint] di panel **Timeline** lalu [buat 
rekaman][recording]. Jika sebagian besar waktu rendering dihabiskan untuk menggambar, berarti Anda 
memiliki masalah paint. 

![Waktu menggambar yang panjang dalam rekaman timeline](imgs/long-paint.png)

Periksa menu [**rendering settings**][rendering settings] untuk 
konfigurasi lebih jauh yang bisa membantu mendiagnosis masalah paint. 

### Masalah

Tabel berikut menjelaskan beberapa masalah paint dan komposit dan solusinya:

<table>
  <thead>
      <th>Masalah</th>
      <th>Contoh</th>
      <th>Solusi</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Problem">Paint yang bertubi-tubi memengaruhi respons atau animasi.</td>
      <td data-th="Example">Area paint yang besar atau paint yang berat memengaruhi respons atau animasi.</td>
      <td data-th="Solution">Hindari paint, promosikan elemen yang bergerak ke layernya sendiri, gunakan transforms dan opacity (lihat <a href="/web/fundamentals/performance/rendering/simplify-paint-complexity-and-reduce-paint-areas">Sederhanakan kompleksitas paint dan kurangi area paint</a>).</td>
    </tr>
        <tr>
      <td data-th="Problem">Ledakan layer memengaruhi animasi.</td>
      <td data-th="Example">Promosi berlebihan untuk terlalu banyak elemen dengan translateZ(0) sangat memengaruhi kinerja animasi.
</td>
      <td data-th="Solution">Jangan terlalu sering mempromosikan ke layer dan hanya bila Anda mengetahui bahwa hal itu menawarkan peningkatan yang nyata (lihat <a href="/web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count">Berpeganglah pada properti compositor-saja dan kelola jumlah layer</a>).</td>
    </tr>
  </tbody>
</table>


[recording]: ../evaluate-performance/timeline-tool#make-a-recording
[paint]: ../evaluate-performance/timeline-tool#profile-painting
[rendering settings]: ../evaluate-performance/timeline-tool#rendering-settings


{# wf_devsite_translation #}
