project_path: /web/tools/chrome-devtools/_project.yaml
book_path: /web/tools/chrome-devtools/_book.yaml
description: Dengan Device Mode di Chrome DevTools, Anda dapat meniru bagaimana tampilan situs  pengembangan dalam produksi di berbagai perangkat.

{# wf_updated_on: 2020-07-10 #}
{# wf_published_on: 2015-04-13 #}
{# wf_blink_components: Platform>DevTools #}

# Menguji Viewport dalam Mode Responsif dan Perangkat Tertentu {: .page-title }

{% include "web/_shared/contributors/pbakaus.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/kaycebasques.html" %}

Device Mode yang diperbarui (sejak Chrome 49) adalah bagian integral dari DevTools yang sekarang dan mengutamakan tampilan seluler dan 
memperluas bilah DevTools utama. Pelajari cara menggunakan kontrolnya untuk menyimulasikan beraneka ragam perangkat atau 
menguji secara responsif sepenuhnya.


### TL;DR {: .hide-from-toc }
- Menguji daya respons situs Anda menggunakan emulator layar Device Mode.
- Menyimpan preset khusus sehingga Anda bisa dengan mudah mengaksesnya nanti.
- Mode perangkat bukan pengganti pengujian perangkat nyata. Ketahui keterbatasannya.


## Menggunakan kontrol viewport {: #viewport-controls }

![mode perangkat diaktifkan](imgs/device-mode.png)

Kontrol Viewport digunakan untuk menguji situs pada beragam perangkat, serta secara responsif 
sepenuhnya. Ada dua mode kontrol:

  1. **Responsive**. Membuat Viewport bisa disesuaikan ukurannya secara bebas melalui tuas di sisi mana pun. 
  2. **Specific Device**. Mengunci Viewport ke ukuran tampilan perangkat tertentu secara persis dan 
  mengemulasikan karakteristik perangkat tersebut.

## Mode Responsif

Kami merekomendasikan menggunakan **Responsive Mode** sebagai mode kerja default. Gunakan selama tahap 
pengembangan aktif situs dan aplikasi sering-seringlah mengubah ukuran viewport untuk menciptakan desain 
responsif yang dapat menyesuaikan diri dengan jenis perangkat, bahkan yang tidak diketahui atau perangkat baru di masa mendatang.

Untuk memaksimalkan pemanfaatan Responsive Mode, aktifkan [Bilah Kueri Media](#media-queries).

### Sesuaikan ukuran viewport

Tarik tuas pengubah ukuran yang besar pada viewport atau klik nilai di panel menu untuk 
menetapkan ukuran secara tepat.

## Mode perangkat tertentu

Gunakan **Device-specific Mode** saat Anda mendekati akhir fase pengembangan aktif dan ingin 
menyempurnakan tampilan situs di layar perangkat seluler tertentu (mis. di iPhone atau Nexus tertentu).

### Preset perangkat bawaan

<div class="wf-devtools-flex">
  <div>
  <p>Kami menyertakan perangkat paling populer saat ini di menu tarik-turun perangkat. Setelah memilih 
    perangkat, setiap preset otomatis mengonfigurasi emulasi karakteristik perangkat tertentu:</p>
  <ul>
    <li>Menyetel string "User Agent" (UA) yang benar.</li>
    <li>Menyetel resolusi dan DPI perangkat (rasio piksel perangkat).</li>
    <li>Mengemulasikan kejadian sentuh (jika tersedia).</li>
    <li>Mengemulasikan overlay bilah scroll seluler dan meta viewport.</li>
    <li>Otomatis mengubah ukuran (memperbesar) halaman tanpa viewport yang ditentukan.</li>
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

Saat mengemulasikan perangkat khusus, toolbar Device Mode menampilkan kontrol tambahan yang utamanya
 berfungsi beralih orientasi antara lanskap dan potret.

<div class="wf-devtools-flex">
  <div>
    <p>Di perangkat yang didukung, kontrol tidak hanya mengalihkan orientasi. Untuk perangkat 
      yang didukung seperti Nexus 5X, terdapat menu tarik-turun untuk mengemulasikan keadaan perangkat 
      tertentu, seperti:</p>
    <ul>
      <li>UI browser default</li>
      <li>Dengan menu navigasi Chrome</li>
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
  <p>Terkadang, Anda ingin menguji perangkat yang resolusinya lebih besar dari ruang yang tersedia 
    di jendela browser. Dalam kasus seperti ini, opsi <strong>Zoom to Fit</strong> sangat 
    berguna:</p>
  <ol>
    <li>
      <strong>Fit to Window</strong> akan otomatis menyetel level pembesaran ke ruang maksimum 
      yang tersedia.
    </li>
    <li>
      <strong>Explicit percentages</strong> berguna bila Anda ingin menguji DPI pada gambar, 
      misalnya.
    </li>
  </ol>
  </div>
  <div class="wf-devtools-flex-third">
    <img src="imgs/zoom-to-fit.png" alt="Zoom to Fit">
  </div>
</div>

## Kontrol opsional (mis. sentuh, kueri media, DPR)

<div class="wf-devtools-flex">
  <div>
  <p>Kontrol opsional bisa diubah atau diaktifkan dengan mengklik tiga titik kecil di sebelah kanan 
    toolbar perangkat. Opsi saat ini meliputi</p>
  <ul>
    <li>Tipe agen-pengguna (mengemulasikan UA dan kejadian sentuh)</li>
    <li>Rasio piksel perangkat</li>
    <li>Kueri Media</li>
    <li>Aturan</li>
    <li>Konfigurasi Jaringan (UA, Throttling Jaringan)</li>
  </ul>
  </div>
  <div class="wf-devtools-flex-third">
    <img src="imgs/device-mode-dotmenu.png" alt="Setelan Device Mode">
  </div>
</div>

Lanjutkan baca untuk mempelajari lebih lanjut tentang setiap opsi.

### Tipe agen-pengguna

Setelan **User Agent Type**, atau Device Type, memungkinkan Anda mengubah tipe
perangkat. Kemungkinan nilainya:

  1. Mobile
  2. Desktop
  3. Desktop with touch

Mengubah setelan ini akan memengaruhi viewport di perangkat seluler dan emulasi kejadian sentuh
serta mengubah string UA. Jadi, jika Anda ingin membuat situs responsif untuk
Desktop dan ingin menguji efek pengarahan kursor ke atas objek, beralih ke "Desktop" di Responsive Mode.

**Tips**: Anda juga bisa menyetel agen-pengguna di panel samping [**Network conditions**][nc] 
.


### Rasio piksel perangkat (DPR)

Jika Anda ingin mengemulasikan perangkat Retina dari mesin non-Retina atau 
sebaliknya, sesuaikan **Device pixel ratio**. **Rasio piksel 
perangkat** (DPR) adalah rasio antara piksel logis dan piksel fisik. 
Perangkat dengan layar Retina, misalnya Nexus 6P, memiliki kepadatan piksel lebih tinggi 
dibandingkan perangkat biasa, yang bisa memengaruhi ketajaman dan ukuran konten 
visual.

Berikut beberapa contoh sensitivitas "Rasio Piksel Perangkat" (DPR) di web:

* Kueri media CSS, seperti:

      @media (-webkit-min-device-pixel-ratio: 2), 
             (min-resolution: 192dpi) { ... }

* Aturan CSS [image-set](http://dev.w3.org/csswg/css-images/#image-set-notation) 
.

* Atribut [srcset](/web/fundamentals/design-and-ux/responsive/images#images-in-markup) 
  pada gambar.

* Properti `window.devicePixelRatio`.

Jika Anda memiliki layar Retina bawaan, Anda akan melihat aset dengan "Titik Per Inci" 
(DPI) yang rendah akan tampak mengalami pikselisasi sedangkan aset ber-DPI tinggi tampak tajam. Untuk menyimulasikan 
efek ini pada tampilan standar, tetapkan DPR ke 2 dan skalakan viewport 
dengan pembesaran. Aset 2x akan tetap tampak tajam, sedangkan aset 1x akan tampak 
mengalami pikselisasi.

### Kueri media {: #media-queries }

[Kueri media](/web/fundamentals/design-and-ux/responsive/#use-media-queries)
adalah bagian penting dari desain web responsif.Untuk menampilkan pemeriksa kueri media,
klik **Show Media queries** di menu tiga titik. DevTools mendeteksi kueri
media di stylesheet dan menampilkannya sebagai bilah berwarna di aturan atas.

![show media queries](imgs/show-media-queries.png)

![pemeriksa kueri media](imgs/media-query-inspector-ruler.png)

Kueri media diberi kode warna sebagai berikut:

<style>
  #colortable { width: 60%; border: none; } #colortable td { border: none; } 
  .max-width { background: #327ff2; width: 10%; } 
  .max-and-min { background: #3b9903; width: 10%; }
  .min-width { background: #d4731f; width: 10%; }
</style>

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

Klik bilah kueri media untuk menyesuaikan ukuran viewport dan menampilkan pratinjau gaya untuk
ukuran layar yang ditargetkan.

#### Tampilkan CSS yang terkait

Klik kanan bilah untuk melihat tempat kueri media didefinisikan di CSS dan masuk ke
definisinya di kode sumber.

![tampilan kueri media dasar-dasar web](imgs/reveal-source-code.png)

### Aturan

Alihkan opsi ini untuk menampilkan aturan berbasis piksel di sebelah viewport.

### Konfigurasi jaringan (UA, network throttling) {: #network }

Dengan memilih opsi ini [panel samping Network Conditions][nc], tempat Anda bisa
mengubah perilaku jaringan berikut:

  1. **Disk Cache**: Nonaktifkan Disk Cache menghentikan halaman dan asetnya dari
      disimpan di cache oleh browser saat DevTools terbuka.
  2. **Network Throttling**: Simulasikan koneksi jaringan lambat.
  3. **User Agent**: Untuk menyetel penggantian
      string UA (User Agent) tertentu.

[nc]: /web/tools/chrome-devtools/network-performance/reference#network-conditions

## Batasan

Device Mode memiliki beberapa keterbatasan.

* **Device hardware**
    * Perilaku GPU dan CPU tidak diemulasikan.
* **Browser UI**
    * Tampilan sistem, seperti kolom URL, tidak diemulasikan.
    * Tampilan bawaan, seperti `<select>` elemen, tidak diemulasikan sebagai daftar modal.
    * Beberapa peningkatan, seperti masukan angka yang membuka keypad, bisa berbeda dari perilaku perangkat 
    sebenarnya.
* **Browser functionality**
    * WebGL beroperasi di emulator, tetapi tidak didukung di perangkat iOS 7.
    * MathML tidak didukung di Chrome, tetapi didukung di perangkat iOS 7.
    * [Pemutaran HLS](https://en.wikipedia.org/wiki/HTTP_Live_Streaming) (HTTP Live Streaming untuk 
		video) tidak didukung saat beremulasi, tetapi tidak didukung secara asli di Android Chrome dan iOS.
    * [Bug pembesaran orientasi iOS 5](https://github.com/scottjehl/device-bugs/issues/2) tidak 
		diemulasikan.
    * Properti CSS line-height beroperasi di emulator, tetapi tidak didukung di Opera Mini.
    * Batas aturan CSS, seperti yang ada di 
		[Internet Explorer](http://blogs.msdn.com/b/ieinternals/archive/2011/05/14/10164546.aspx), 
		tidak diemulasikan.
* **AppCache**
    * Emulator tidak mengganti <abbr title="User Agent">UA</abbr> untuk AppCache 
		[file manifes](https://code.google.com/p/chromium/issues/detail?id=334120) atau 
		[permintaan lihat sumber](https://code.google.com/p/chromium/issues/detail?id=119767).

Terlepas dari keterbatasan ini, Device Mode cukup andal untuk sebagian besar tugas. 
Bila Anda ingin menguji pada perangkat sesungguhnya, Anda bisa menggunakan 
[Proses Debug Dari Jauh](/web/tools/chrome-devtools/debug/remote-debugging) 
untuk memperoleh insight tambahan.

## Masukan {: #feedback }

{% include "web/_shared/helpful.html" %}
