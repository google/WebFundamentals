project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Device Mode pada Chrome DevTools digunakan untuk meniru tampilan situs development Anda di tahap produksi di berbagai perangkat.

{# wf_updated_on: 2016-03-07 #}
{# wf_published_on: 2015-04-13 #}

# Menguji Tampilan yang Terlihat dalam Mode Responsif dan Perangkat Tertentu {: .page-title }

{% include "web/_shared/contributors/pbakaus.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/kaycebasques.html" %}

Device Mode yang diperbarui (sejak Chrome 49) adalah bagian integral dari DevTools yang sekarang mengutamakan tampilan seluler dan memperluas bilah DevTools utama. Pelajari cara menggunakan kontrolnya untuk menyimulasikan beraneka ragam perangkat atau menguji secara responsif sepenuhnya.


### TL;DR {: .hide-from-toc }
- Menguji daya respons situs menggunakan emulator layar Device Mode.
- Menyimpan preset khusus agar mudah diakses di lain waktu.
- Device Mode tidak bisa menggantikan pengujian pada perangkat sebenarnya. Ketahui keterbatasannya.


## Menggunakan kontrol tampilan yang terlihat {: #viewport-controls }

![mode perangkat diaktifkan](imgs/device-mode.png)

Kontrol Tampilan yang Terlihat digunakan untuk menguji situs pada beragam perangkat, serta secara responsif sepenuhnya. Ada dua mode kontrol:

  1. **Responsive**. Membuat Tampilan yang Terlihat bisa disesuaikan ukurannya secara bebas melalui tuas di sisi mana pun.
  2. **Perangkat Tertentu**. Mengunci Tampilan yang Terlihat ke ukuran tampilan perangkat tertentu secara persis dan mengemulasikan karakteristik perangkat tersebut.

## Responsive Mode

Kami merekomendasikan menggunakan **Responsive Mode** sebagai mode kerja default. Gunakan selama tahap development aktif situs dan aplikasi. Sering-seringlah mengubah ukuran tampilan yang terlihat untuk menciptakan desain responsif yang dapat menyesuaikan diri dengan jenis perangkat, bahkan perangkat yang tidak diketahui atau perangkat baru di masa mendatang.

Untuk memaksimalkan pemanfaatan Responsive Mode, aktifkan [Bilah Kueri Media](#media-queries).

### Menyesuaikan ukuran tampilan yang terlihat

Seret tuas pengubah ukuran yang besar pada tampilan yang terlihat atau klik nilai di bilah menu untuk menetapkan ukuran secara tepat.

## Mode perangkat tertentu

Gunakan **Mode Perangkat Tertentu** saat Anda mendekati akhir fase development aktif dan ingin menyempurnakan tampilan situs di layar perangkat seluler tertentu (mis. iPhone atau Nexus tertentu)

### Preset perangkat bawaan

<div class="wf-devtools-flex">
  <div>
  <p>Kami menyertakan perangkat paling populer saat ini di menu tarik-turun perangkat. Setelah memilih perangkat, setiap preset otomatis mengonfigurasi emulasi karakteristik perangkat tertentu:</p>
  <ul>
    <li>Menyetel string "User Agent" (UA) yang benar.</li>
    <li>Menyetel resolusi dan DPI perangkat (rasio piksel perangkat).</li>
    <li>Mengemulasikan kejadian sentuh (jika tersedia).</li>
    <li>Mengemulasikan overlay bilah gulir seluler dan meta viewport.</li>
    <li>Otomatis mengubah ukuran (memperbesar) teks untuk laman yang tidak mendefinisikan tampilan yang terlihat.</li>
  </ul>
  </div>
  <div class="wf-devtools-flex-third">
    <img src="imgs/select-device.png" alt="pilih perangkat">
  </div>
</div>

### Menambahkan preset perangkat khusus

Device Mode menawarkan berbagai jenis perangkat untuk emulasi. Anda bisa menambahkan 
perangkat khusus jika Anda menemukan kasus ekstrem atau perangkat sangat khusus yang tidak tercakup. 

<div class="wf-devtools-flex">
  <div>
  <p>Untuk menambahkan perangkat khusus:</p>
  <ol>
    <li>Masuk ke Setelan DevTools.</li>
    <li>Klik tab <strong>Devices</strong>.</li>
    <li>Klik <strong>Add custom device</strong>.</li>
    <li>Masukkan nama perangkat, lebar, tinggi, rasio piksel perangkat, dan 
    string agen-pengguna.</li>
     <li>Klik <strong>Add</strong>.</li>
  </ol>
  <p>Perangkat khusus baru ini sekarang tersedia di menu tarik-turun <strong>Device</strong>.</p>
  </div>
  <div class="wf-devtools-flex-half">
    <img src="imgs/custom-device.png" alt="pilih perangkat">
  </div>
</div>

### Keadaan dan orientasi perangkat

![beralih orientasi](imgs/change-orientation.png)

Saat mengemulasikan perangkat khusus, bilah alat Device Mode menampilkan kontrol tambahan yang utamanya berfungsi mengalihkan orientasi antara lanskap dan potret.

<div class="wf-devtools-flex">
  <div>
    <p>Di perangkat yang didukung, kontrol tidak hanya mengalihkan orientasi. Untuk perangkat yang didukung seperti Nexus 5X, terdapat menu tarik-turun untuk mengemulasikan keadaan perangkat tertentu, seperti:</p>
    <ul>
      <li>UI browser default</li>
      <li>Dengan bilah navigasi Chrome</li>
      <li>Dengan keyboard terbuka</li>
    </ul>
  </div>
  <div class="wf-devtools-flex-third">
    <img src="imgs/change-device-state.png" alt="Mengubah UI Perangkat">
  </div>
</div>

### Zoom to fit  

<div class="wf-devtools-flex">
  <div>
  <p>Terkadang, Anda ingin menguji perangkat yang resolusinya lebih besar dari ruang yang tersedia di jendela browser. Dalam kasus seperti ini, opsi <strong>Zoom to Fit</strong> sangat berguna:</p>
  <ol>
    <li><strong>Fit to Window</strong> akan otomatis menyetel level pembesaran ke ruang maksimum yang tersedia.</li>
    <li><strong>Explicit percentages</strong> berguna bila Anda ingin menguji DPI pada gambar, misalnya.</li>
  </ol>
  </div>
  <div class="wf-devtools-flex-third">
    <img src="imgs/zoom-to-fit.png" alt="Zoom to Fit">
  </div>
</div>

## Kontrol opsional (mis. sentuh, kueri media, DPR)

<div class="wf-devtools-flex">
  <div>
  <p>Kontrol opsional bisa diubah atau diaktifkan dengan mengeklik tiga titik kecil di sebelah kanan bilah alat perangkat. Opsi saat ini meliputi</p>
  <ul>
    <li>Tipe agen-pengguna (mengemulasikan UA dan kejadian sentuh)</li>
    <li>Rasio piksel perangkat</li>
    <li>Kueri Media</li>
    <li>Penggaris</li>
    <li>Konfigurasi Jaringan (UA, throttling jaringan)</li>
  </ul>
  </div>
  <div class="wf-devtools-flex-third">
    <img src="imgs/device-mode-dotmenu.png" alt="Setelan Device Mode">
  </div>
</div>

Lanjutkan baca untuk mengetahui selengkapnya tentang setiap opsi.

### Tipe agen-pengguna

Setelan **User Agent Type** atau Device Type digunakan untuk mengubah jenis
perangkat. Kemungkinan nilainya:

  1. Mobile
  2. Desktop
  3. Desktop with touch

Mengubah setelan ini akan memengaruhi tampilan yang terlihat di perangkat seluler dan emulasi kejadian sentuh
serta mengubah string UA. Jadi, jika Anda ingin membuat situs responsif untuk
Desktop dan ingin menguji efek pengarahan kursor ke atas objek, ubah ke "Desktop" di Responsive Mode.

**Tip**: Anda juga bisa menyetel agen-pengguna di panel samping [**Network conditions**][nc]
.


### Rasio piksel perangkat (DPR)

Jika Anda ingin mengemulasikan perangkat Retina dari mesin non-Retina atau 
sebaliknya, sesuaikan **Device pixel ratio**. **Rasio piksel 
perangkat** (DPR) adalah rasio antara piksel logis dan piksel fisik.
Perangkat dengan layar Retina, misalnya Nexus 6P, memiliki kepadatan piksel lebih tinggi 
dibandingkan perangkat biasa, yang bisa memengaruhi ketajaman dan ukuran materi 
visual.

Berikut beberapa contoh sensitivitas "Rasio Piksel Perangkat" (DPR) di web:

* Kueri media CSS, seperti:

      @media (-webkit-min-device-pixel-ratio: 2), 
             (min-resolution: 192dpi) { ... }

* Aturan [image-set](http://dev.w3.org/csswg/css-images/#image-set-notation) 
  CSS.

* Atribut [srcset](/web/fundamentals/design-and-ux/media/images/images-in-markup) 
  pada gambar.

* Properti `window.devicePixelRatio`.

Jika Anda memiliki layar Retina bawaan, Anda akan melihat aset dengan "Titik Per Inci" 
(DPI) yang rendah akan tampak mengalami pikselisasi sedangkan aset ber-DPI tinggi tampak tajam. Untuk menyimulasikan 
efek ini pada layar standar, tetapkan DPR ke 2 dan skalakan tampilan yang terlihat 
dengan pembesaran. Aset 2x akan tetap tampak tajam, sedangkan aset 1x akan tampak 
mengalami pikselisasi.

### Kueri media {: #media-queries }

[Kueri media](/web/fundamentals/design-and-ux/responsive/fundamentals/use-media-queries)
adalah bagian penting dari desain web responsif. Untuk menampilkan pemeriksa kueri media,
klik **Show Media queries** di menu tiga titik. DevTools mendeteksi kueri
media di stylesheet dan menampilkannya sebagai bilah berwarna di penggaris atas.

![show media queries](imgs/show-media-queries.png)

![pemeriksa kueri media](imgs/media-query-inspector-ruler.png)

Kueri media diberi kode warna sebagai berikut:

<style>#colortable { width: 60%; border: none; } #colortable td { border: none; } .max-width { background: #327ff2; width: 10%; } .max-and-min { background: #3b9903; width: 10%; } .min-width { background: #d4731f; width: 10%; }</style>

<table id="colortable">
  <tbody>
    <tr>
      <td class="max-width"></td>
      <td>Kueri yang menargetkan lebar maksimum.</td>
    </tr>
    <tr>
      <td class="max-and-min"></td>
      <td>Kueri yang menargetkan lebar dalam rentang tertentu.</td>
    </tr>
    <tr>
      <td class="min-width"></td>
      <td>Kueri yang menargetkan lebar minimum.</td>
    </tr>
  </tbody>
</table>

#### Melihat pratinjau kueri media dengan cepat

Klik bilah kueri media untuk menyesuaikan ukuran tampilan yang terlihat dan menampilkan pratinjau gaya untuk
ukuran layar yang ditargetkan.

#### Menampilkan CSS yang terkait

Klik kanan bilah untuk melihat tempat kueri media didefinisikan di CSS dan masuk ke
definisinya di kode sumber.

![tampilan kueri media dasar-dasar web](imgs/reveal-source-code.png)

### Penggaris

Alihkan opsi ini untuk menampilkan penggaris berbasis piksel di sebelah tampilan yang terlihat.

### Konfigurasi jaringan (UA, throttling jaringan)

Memilih opsi ini akan membuka panel di Panel Samping untuk mengubah
perilaku yang terkait dengan jaringan:

  1. **Disk Cache**: Menonaktifkan Disk Cache menghentikan laman dan asetnya agar tidak
      di-cache oleh browser saat DevTools terbuka.
  2. **Throttling Jaringan**: Baca selengkapnya tentang [Throttling Jaringan di sini](/web/tools/chrome-devtools/network-performance/network-conditions).
  3. **User Agent**: Untuk menyetel penggantian
      string UA (User Agent) tertentu.

**Tip**: Anda juga bisa membuka panel samping **Network conditions** dari 
[menu utama][nc].

## Batasan

Device Mode memiliki beberapa keterbatasan.

* **Perangkat keras perangkat**
  * Perilaku GPU dan CPU tidak diemulasikan.
* **UI Browser**
  * Tampilan sistem, seperti bilah alamat, tidak diemulasikan.
  * Tampilan bawaan, seperti elemen `<select>` tidak diemulasikan sebagai daftar modal.
  * Beberapa peningkatan, seperti masukan angka yang membuka keypad, bisa berbeda dari perilaku perangkat sebenarnya.
* **Fungsionalitas browser**
  * WebGL beroperasi di emulator, tetapi tidak didukung di perangkat iOS 7.
  * MathML tidak didukung di Chrome, tetapi didukung di perangkat iOS 7.
  * [Bug pembesaran orientasi iOS 5](https://github.com/scottjehl/device-bugs/issues/2) tidak diemulasikan.
  * Properti CSS line-height beroperasi di emulator, tetapi tidak didukung di Opera Mini.
  * Batas aturan CSS, seperti yang ada di [Internet Explorer](http://blogs.msdn.com/b/ieinternals/archive/2011/05/14/10164546.aspx), tidak diemulasikan.
* **AppCache**
  * Emulator tidak mengganti <abbr title="User Agent">UA</abbr> untuk [file manifes](https://code.google.com/p/chromium/issues/detail?id=334120) atau [permintaan lihat sumber](https://code.google.com/p/chromium/issues/detail?id=119767) dari AppCache.

Terlepas dari keterbatasan ini, Device Mode cukup andal untuk sebagian besar tugas.
Bila Anda ingin menguji pada perangkat sesungguhnya, Anda bisa menggunakan 
[Debug Dari Jauh](/web/tools/chrome-devtools/debug/remote-debugging) 
untuk memperoleh wawasan tambahan.


[nc]: /web/tools/chrome-devtools/profile/network-performance/network-conditions#network-conditions


{# wf_devsite_translation #}
