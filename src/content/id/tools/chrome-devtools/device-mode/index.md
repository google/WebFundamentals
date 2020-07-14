project_path: /web/tools/chrome-devtools/_project.yaml
book_path: /web/tools/chrome-devtools/_book.yaml
description: Menggunakan perangkat virtual di Device Mode Chrome untuk membangun situs web yang mengedepankan perangkat seluler.

{# wf_updated_on: 2020-07-10 #}
{# wf_published_on: 2015-04-13 #}
{# wf_blink_components: Platform>DevTools #}

[capture]: /web/tools/chrome-devtools/images/shared/capture-settings.png
[customize]: /web/tools/chrome-devtools/images/shared/customize-and-control-devtools.png

# Menyimulasikan Perangkat Seluler dengan Device Mode di Chrome DevTools {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Gunakan Device Mode untuk memperkirakan bagaimana tampilan dan kinerja halaman di perangkat seluler.

Device Mode adalah nama untuk koleksi fitur longgar di Chrome DevTools yang
membantu Anda menyimulasikan perangkat seluler. Fitur ini meliputi:

* [Menyimulasikan viewport seluler](#viewport)
* [Membatasi jaringan](#network)
* [Membatasi CPU](#cpu)
* [Menyimulasikan geolokasi](#geolocation)
* [Menyetel orientasi](#orientation)

## Batasan {: #limitations }

Anggap Device Mode sebagai [perkiraan urutan pertama][approximation]{:.external} bagaimana
halaman Anda terlihat dan terasa di perangkat seluler. Dengan Device Mode, sebenarnya Anda tidak menjalankan kode
di perangkat seluler. Anda menyimulasikan pengalaman pengguna ponsel dari laptop atau desktop.

[approximation]: https://en.wikipedia.org/wiki/Order_of_approximation#First-order

Ada beberapa aspek perangkat seluler yang tidak pernah bisa disimulasikan DevTools.
Misalnya, arsitektur CPU seluler sangat berbeda dari laptop
atau CPU desktop. Jika ragu, tindakan terbaik yaitu menjalankan halaman di perangkat seluler.
Gunakan [Proses Debug dari Jauh](/web/tools/chrome-devtools/remote-debugging/) untuk melihat, mengubah, men-debut,
dan menghasilkan analisis kode halaman dari laptop atau desktop meski alat ini sebenarnya berjalan di perangkat seluler.

## Menyimulasikan viewport seluler {: #viewport }

Klik **Toggle Device Toolbar** ![Beralih Toolbar Perangkat][TDB]{: .inline-icon } untuk membuka UI yang
memungkinkan Anda menyimulasikan viewport seluler.

[TDB]: /web/tools/chrome-devtools/images/shared/toggle-device-toolbar.png

<figure>
  <img src="imgs/device-toolbar.png"
       alt="Toolbar Perangkat."/>
  <figcaption>
    <b>Gambar 1</b>. Toolbar Perangkat
  </figcaption>
</figure>

Secara default, Toolbar Perangkat terbuka dalam Mode Viewport Responsif.

### Mode Viewport Responsif {: #responsive }

Tarik pengendali untuk mengubah ukuran viewport ke dimensi mana pun yang Anda perlukan. Atau, masukkan nilai tertentu
di kotak lebar dan tinggi. Di **Gambar 2**, lebar disetel ke `628` dan tinggi disetel ke
`662`.

<figure>
  <img src="imgs/responsive-handles.png"
       alt="Pengendali untuk mengubah dimensi viewport saat dalam Mode Viewport Responsif."/>
  <figcaption>
    <b>Gambar 2</b>. Pengendali untuk mengubah dimensi viewport saat dalam Mode Viewport Responsif
  </figcaption>
</figure>

#### Tampilkan kueri media {: #queries }

Untuk menampilkan titik putus kueri media di atas viewport, klik **More options** dan lalu pilih **Show media
queries**.

<figure>
  <img src="imgs/show-media-queries.png"
       alt="Tampilkan kueri media."/>
  <figcaption>
    <b>Gambar 3</b>. Tampilkan kueri media
  </figcaption>
</figure>

Klik titik putus untuk mengubah lebar viewport sehingga titik putus dipicu.

<figure>
  <img src="imgs/breakpoint.png"
       alt="Klik titik putus untuk mengubah lebar viewport."/>
  <figcaption>
    <b>Gambar 4</b>. Klik titik putus untuk mengubah lebar viewport
  </figcaption>
</figure>

### Mode Viewport Perangkat Seluler {: #device }

Untuk menyimulasikan dimensi perangkat seluler tertentu, pilih perangkat dari daftar **Perangkat**.

<figure>
  <img src="imgs/device-list.png"
       alt="Daftar Perangkat."/>
  <figcaption>
    <b>Gambar 5</b>. Daftar Perangkat
  </figcaption>
</figure>

#### Putar viewport ke orientasi lanskap {: #landscape }

Klik **Rotate** ![Putar](imgs/rotate.png){: .inline-icon } untuk memutar viewport ke orientasi lanskap.

<figure>
  <img src="imgs/landscape.png"
       alt="Orientasi lanskap."/>
  <figcaption>
    <b>Gambar 6</b>. Orientasi lanskap
  </figcaption>
</figure>

Perhatikan bahwa tombol **Rotate** akan muncul jika **Toolbar Perangkat** tipis.

<figure>
  <img src="imgs/device-toolbar.png"
       alt="Toolbar Perangkat."/>
  <figcaption>
    <b>Gambar 7</b>. Toolbar Perangkat
  </figcaption>
</figure>

Baca juga [Atur orientasi](#orientation).

#### Tampilkan bingkai perangkat {: #frame }

Saat menyimulasikan dimensi perangkat seluler tertentu seperti iPhone 6, buka **More options**
dan pilih **Show device frame** untuk menampilkan bingkai perangkat fisik di sekitar viewport.

Note: Jika Anda tidak melihat bingkai perangkat dari perangkat tertentu, itu mungkin berarti DevTools
hanya tidak memiliki seni untuk pilihan spesifik itu.

<figure>
  <img src="imgs/show-device-frame.png"
       alt="Tampilkan bingkai perangkat."/>
  <figcaption>
    <b>Gambar 8</b>. Tampilkan bingkai perangkat
  </figcaption>
</figure>

<figure>
  <img src="imgs/iphone-frame.png"
       alt="Bingkai perangkat untuk iPhone 6."/>
  <figcaption>
    <b>Gambar 9</b>. Bingkai perangkat untuk iPhone 6
  </figcaption>
</figure>

### Tampilkan aturan {: #rulers }

Klik **More options** dan pili **Show rulers** untuk melihat aturan di atas dan di sebelah kiri
viewport. Unit pengukuran aturan adalah piksel.

<figure>
  <img src="imgs/show-rulers.png"
       alt="Tampilkan aturan."/>
  <figcaption>
    <b>Gambar 10</b>. Tampilkan aturan
  </figcaption>
</figure>

<figure>
  <img src="imgs/rulers.png"
       alt="Aturan di atas dan di sebelah kiri viewport."/>
  <figcaption>
    <b>Gambar 11</b>. Aturan di atas dan di sebelah kiri viewport
  </figcaption>
</figure>

### Zoom viewport {: #zoom }

Gunakan daftar **Zoom** untuk memperbesar atau memperkecil.

<figure>
  <img src="imgs/zoom-viewport.png"
       alt="Zoom."/>
  <figcaption>
    <b>Gambar 11</b>. Zoom
  </figcaption>
</figure>

## Batasi jaringan dan CPU {: #throttle }

Untuk membatasi jaringan dan CPU, pilih **Mid-tier mobile** atau **Low-end mobile**
dari daftar **Pembatasan**.

<figure>
  <img src="imgs/throttling.png"
       alt="Daftar Pembatasan."/>
  <figcaption>
    <b>Gambar 12</b>. Daftar Pembatasan
  </figcaption>
</figure>

**Ponsel tingkat tengah** menyimulasikan 3G cepat dan membatasi CPU, sehingga koneksi ini 4 kali
lebih lambat daripada biasanya. **Ponsel kelas bawah** menyimulasikan 3G lambat dan membatasi CPU 6 kali lebih lambat daripada biasanya.
Perlu diingat bahwa membatasi relatif terhadap kemampuan normal laptop atau desktop.

Perhatikan bahwa daftar **Pembatasan** akan disembunyikan jika **Toolbar Perangkat** terbatas.

<figure>
  <img src="imgs/device-toolbar.png"
       alt="Toolbar Perangkat."/>
  <figcaption>
    <b>Gambar 13</b>. Toolbar Perangkat
  </figcaption>
</figure>

### Batasi CPU saja {: #cpu }

Untuk membatasi CPU saja dan bukan jaringan, buka panel **Performance**, klik
**Capture Settings** ![Setelan Tangkapan][capture]{:.inline-icon}, lalu pilih
**4x slowdown** atau **6x slowdown** dari daftar **CPU**.

<figure>
  <img src="imgs/cpu.png"
       alt="Daftar CPU."/>
  <figcaption>
    <b>Gambar 14</b>. Daftar CPU
  </figcaption>
</figure>

### Batasi jaringan saja {: #network }

Untuk membatasi jaringan saja dan bukan CPU, buka panel **Jaringan** dan pilih
**Fast 3G** atau **Slow 3G** dari daftar **Pembatasan**.

<figure>
  <img src="imgs/network.png"
       alt="Daftar Pembatasan."/>
  <figcaption>
    <b>Gambar 14</b>. Daftar Pembatasan
  </figcaption>
</figure>

Atau tekan <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) atau
<kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Windows, Linux, Chrome OS) untuk membuka
Menu Perintah, ketik `3G`, dan pilih **Enable fast 3G throttling** atau
**Enable slow 3G throttling**.

<figure>
  <img src="imgs/commandmenu.png"
       alt="Menu Perintah."/>
  <figcaption>
    <b>Gambar 15</b>. Menu Perintah
  </figcaption>
</figure>

Anda juga bisa mengatur pembatasan jaringan dari panel **Performance**. Klik
**Capture Settings** ![Setelan Tangkapan][capture]{: .inline-icon } lalu
pilih **Fast 3G** atau **Slow 3G** dari daftar **Network**.

<figure>
  <img src="imgs/network2.png"
       alt="Mengatur pembatasan jaringan dari panel Kinerja."/>
  <figcaption>
    <b>Gambar 16</b>. Mengatur pembatasan jaringan dari panel Kinerja.
  </figcaption>
</figure>

## Ganti geolokasi {: #geolocation }

Untuk membukat UI penggantian lokasi, klik **Customize and control DevTools**
![Sesuaikan dan kontrol DevTools][customize]{: .inline-icon } lalu pilih
**More tools** > **Sensors**.

<figure>
  <img src="imgs/sensors.png"
       alt="Sensor"/>
  <figcaption>
    <b>Gambar 17</b>. Sensor
  </figcaption>
</figure>

Atau tekan <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) atau
<kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Windows, Linux, Chrome OS) untuk membuka
Menu Perintah, ketik `Sensors`, lalu pilih **Show Sensors**.

<figure>
  <img src="imgs/show-sensors.png"
       alt="Tampilkan Sensor"/>
  <figcaption>
    <b>Gambar 18</b>. Tampilkan Sensor
  </figcaption>
</figure>

Pilih salah satu preset dari daftar **Geolocation**, atau pilih **Custom location**
untuk memasukkan koordinat Anda sendiri, atau pilih **Location unavailable** untuk menguji halaman
bertindak saat geolokasi dalam kondisi error.

<figure>
  <img src="imgs/geolocation.png"
       alt="Geolokasi"/>
  <figcaption>
    <b>Gambar 19</b>. Geolokasi
  </figcaption>
</figure>

## Atur orientasi {: #orientation }

Untuk membuka UI orientasi, klik **Customize and control DevTools**
![Sesuaikan dan kontrol DevTools][customize]{: .inline-icon } lalu pilih
**More tools** > **Sensors**.


<figure>
  <img src="imgs/sensors.png"
       alt="Sensor"/>
  <figcaption>
    <b>Gambar 20</b>. Sensor
  </figcaption>
</figure>

Atau tekan <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) atau
<kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Windows, Linux, Chrome OS) untuk membuka
Menu Perintah, ketik `Sensors`, lalu pilih **Show Sensors**.

<figure>
  <img src="imgs/show-sensors.png"
       alt="Tampilkan Sensor"/>
  <figcaption>
    <b>Gambar 21</b>. Tampilkan Sensor
  </figcaption>
</figure>

Pilih salah satu preset dari daftar **Orientation** atau pilih **Custom orientation**
untuk mengatur nilai alfa, beta, dan gamma.

<figure>
  <img src="imgs/orientation.png"
       alt="Orientasi"/>
  <figcaption>
    <b>Gambar 22</b>. Orientasi
  </figcaption>
</figure>

## Masukan {: #feedback }

{% include "web/_shared/helpful.html" %}

Baca [Gabung dengan komunitas DevTools](/web/tools/chrome-devtools/#community) untuk mengetahui cara lain
untuk meninggalkan masukan.
