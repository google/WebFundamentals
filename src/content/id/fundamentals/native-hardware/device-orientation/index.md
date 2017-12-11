project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Gerakan perangkat dan kejadian orientasi menyediakan akses ke akselerometer, giroskop, dan kompas terintegrasi di perangkat seluler.

{# wf_updated_on: 2016-08-22 #}
{# wf_published_on: 2014-06-17 #}

# Orientasi Perangkat & Gerakan {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

Kejadian orientasi dan gerakan perangkat menyediakan akses ke akselerometer,
giroskop, dan kompas terintegrasi di perangkat seluler.

Kejadian ini bisa digunakan untuk berbagai tujuan; dalam game, misalnya, untuk
mengontrol arah atau aksi lakon. Bila digunakan bersama geolokasi, kejadian ini bisa
membantu menciptakan navigasi belokan-demi-belokan yang lebih akurat atau
memberikan informasi tentang lokasi tertentu.

Perhatian: Tidak semua browser menggunakan sistem koordinat yang sama, dan mungkin melaporkan nilai yang berbeda pada situasi yang serupa. Hal ini telah diperbaiki dari waktu ke waktu, namun pastikan menguji situasi Anda.

##TL;DR

* Deteksilah sisi mana pada perangkat yang di atas dan bagaimana rotasi perangkat.
* Ketahui kapan dan bagaimana merespons kejadian gerakan dan orientasi.


## Sisi mana yang di atas?

Untuk menggunakan data yang dikembalikan oleh kejadian gerakan dan orientasi perangkat,
maka penting untuk memahami nilai-nilai yang disediakan.  

### Bingkai koordinat Earth.

Kerangka koordinat Bumi, yang dijelaskan oleh nilai-nilai `X`, `Y`, dan `Z`, diluruskan
berdasar gravitasi dan orientasi magnetik standar.

<table class="responsive">
<tr><th colspan="2">Sistem koordinat</th></tr>
<tr>
  <td><code>X</code></td>
  <td>Menyatakan arah timur-barat (timur adalah positif).</td>
</tr>
<tr>
  <td><code>Y</code></td>
  <td>Menyatakan arah utara-selatan (utara adalah positif).</td>
</tr>
<tr>
  <td><code>Z</code></td>
  <td>Menyatakan arah atas-bawah, tegak lurus dengan tanah
    (atas adalah positif).
  </td>
</tr>
</table>

### Bingkai koordinat perangkat

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/axes.png" alt="ilustrasi bingkai koordinat perangkat">
    <figcaption>
      Ilustrasi bingkai koordinat perangkat
    </figcaption>
  </figure>
</div>

<!-- Special thanks to Sheppy (https://developer.mozilla.org/en-US/profiles/Sheppy)
  for his images which are in the public domain. -->

Bingkai koordinat perangkat, yang dijelaskan melalui nilai-nilai `x`, `y` dan `z`, diluruskan
berdasarkan pusat perangkat.

<table class="responsive">
<tr><th colspan="2">Sistem koordinat</th></tr>
<tr>
  <td><code>X</code></td>
  <td>Dalam bidang layar, positif di sebelah kanan.</td>
</tr>
<tr>
  <td><code>Y</code></td>
  <td>Dalam bidang layar, positif ke arah atas.</td>
</tr>
<tr>
  <td><code>Z</code></td>
  <td>Tegak lurus dengan layar atau keyboard, positif
    memanjang.
  </td>
</tr>
</table>

Pada ponsel atau tablet, orientasi perangkat didasarkan pada orientasi
umumnya layar. Untuk ponsel dan tablet, didasarkan saat perangkat
berada di mode potret. Untuk komputer desktop atau laptop, orientasi
dipertimbangkan berkaitan dengan keyboard.

### Data rotasi

Data rotasi dikembalikan sebagai [sudut Euler](https://en.wikipedia.org/wiki/Euler_angles),
yang menyatakan jumlah derajat perbedaan antara bingkai
koordinat perangkat dan bingkai koordinat Bumi.

#### Alpha

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/alpha.png" alt="ilustrasi bingkai koordinat perangkat">
    <figcaption>
      Ilustrasi alfa dalam bingkai koordinat perangkat
    </figcaption>
  </figure>
</div>

Rotasi di sekeliling sumbu z. Nilai `alpha` adalah 0&deg; bila bagian atas
perangkat mengarah langsung ke utara. Saat perangkat diputar berlawanan arah jarum jam,
nilai `alpha` akan bertambah.

<div style="clear:both;"></div>

#### Beta

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/beta.png" alt="ilustrasi bingkai koordinat perangkat">
    <figcaption>
      Ilustrasi beta dalam bingkai koordinat perangkat
    </figcaption>
  </figure>
</div>

Rotasi sekeliling sumbu x. Nilai `beta` adalah 0&deg; bila bagian atas dan
bawah perangkat memiliki jarak yang sama dari permukaan bumi. Nilainya
bertambah saat bagian atas perangkat dimiringkan ke arah permukaan bumi.

<div style="clear:both;"></div>

#### Gamma

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/gamma.png" alt="ilustrasi bingkai koordinat perangkat">
    <figcaption>
      Ilustrasi gamma dalam bingkai koordinat perangkat
    </figcaption>
  </figure>
</div>

Rotasi sekeliling sumbu y. Nilai `gamma` adalah 0&deg; bila tepi kiri dan
kanan perangkat memiliki jarak yang sama dari permukaan bumi.  Nilainya
bertambah saat sisi kanan dimiringkan ke arah permukaan bumi.

<div style="clear:both;"></div>

## Orientasi perangkat

Kejadian orientasi perangkat mengembalikan data rotasi, yang memuat seberapa
besar perangkat miring depan-ke-belakang, sisi-ke-sisi, dan, jika ponsel atau laptop
memiliki kompas, arahnya ke hadapan perangkat.

Gunakan sekadarnya.
Uji dukungannya.
Jangan perbarui UI pada setiap kejadian orientasi; melainkan sinkronkan ke `requestAnimationFrame`.

### Kapan menggunakan kejadian orientasi perangkat

Ada beberapa penggunaan kejadian orientasi perangkat. Contohnya antara lain berikut ini:

* Memperbarui peta ketika pengguna berpindah tempat.
* Menghaluskan penataan UI, misalnya menambahkan efek paralaks.
* Bila dikombinasikan dengan geolokasi, bisa digunakan untuk navigasi belokan demi belokan.

### Memeriksa dukungan dan mendengarkan kejadian

Untuk mendengarkan `DeviceOrientationEvent`, pertama, periksa apakah browser mendukung kejadian tersebut. Kemudian, sematkan event listener ke objek `window` untuk mendengarkan kejadian `deviceorientation`. 

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', deviceOrientationHandler, false);
      document.getElementById("doeSupported").innerText = "Supported!";
    }

### Menangani kejadian orientasi perangkat

Kejadian orientasi perangkat terpicu bila perangkat bergerak atau berubah 
orientasi. Kejadian itu mengembalikan data tentang perbedaan antara perangkat di 
posisi saat ini dibandingkan dengan 
[bingkai koordinat Bumi](#earth-coordinate-frame).

Kejadian ini biasanya mengembalikan tiga properti: [`alpha`](#alpha), 
[`beta`](#beta), dan [`gamma`](#gamma). Pada Mobile Safari, parameter tambahan
[`webkitCompassHeading`](https://developer.apple.com/library/ios/documentation/SafariDOMAdditions/Reference/DeviceOrientationEventClassRef/){: .external }
dikembalikan bersama arah kompas.

## Gerakan perangkat 

Kejadian orientasi perangkat mengembalikan data rotasi, yang memuat seberapa
besar perangkat miring depan-ke-belakang, sisi-ke-sisi, dan, jika ponsel atau laptop
memiliki kompas, arahnya ke hadapan perangkat.

Gunakan gerakan perangkat ketika memerlukan gerakan perangkat saat ini.
`rotationRate` disediakan dalam &deg;/dtk.
`acceleration` dan `accelerationWithGravity` disediakan dalam m/dtk<sup>2</sup>.
Perhatikan perbedaan antar implementasi browser.

### Kapan menggunakan kejadian gerakan perangkat

Ada beberapa kegunaan kejadian gerakan perangkat. Contohnya antara lain berikut ini:

* Isyarat goyang untuk menyegarkan data.
* Untuk menyebabkan lakon melompat atau bergerak dalam game.
* Untuk aplikasi kesehatan dan kebugaran.


### Memeriksa dukungan dan mendengarkan kejadian

Untuk mendengarkan `DeviceMotionEvent`, pertama, periksa apakah kejadian
tersebut didukung dalam browser.  Kemudian, sematkan listener kejadian ke objek `window` 
untuk mendengarkan kejadian `devicemotion`. 

    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', deviceMotionHandler);
      setTimeout(stopJump, 3*1000);
    }

### Menangani kejadian gerakan perangkat

Kejadian gerakan perangkat dipicu pada interval waktu yang teratur dan mengembalikan data tentang
rotasi (dalam &deg;/detik) dan akselerasi (dalam m/detik<sup>2</sup>)
dari perangkat, pada saat tersebut. Beberapa perangkat tidak memiliki perangkat keras
sehingga mengecualikan efek gravitasi.

Kejadian mengembalikan empat properti, 
[`accelerationIncludingGravity`](#device-coordinate-frame), 
[`acceleration`](#device-coordinate-frame), yang mengecualikan efek
gravitasi, [`rotationRate`](#rotation-data), dan `interval`.

Misalnya, mari kita lihat sebuah ponsel, tergeletak di atas meja datar,
dengan layar menghadap ke atas.

<table>
  <thead>
    <tr>
      <th data-th="State">Status</th>
      <th data-th="Rotation">Rotasi</th>
      <th data-th="Acceleration (m/s<sup>2</sup>)">Akselerasi (m/s<sup>2</sup>)</th>
      <th data-th="Acceleration with gravity (m/s<sup>2</sup>)">Akselerasi dengan gravitasi (m/s<sup>2</sup>)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="State">Tidak bergerak</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[0, 0, 0]</td>
      <td data-th="Acceleration with gravity">[0, 0, 9.8]</td>
    </tr>
    <tr>
      <td data-th="State">Bergerak naik ke arah langit</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[0, 0, 5]</td>
      <td data-th="Acceleration with gravity">[0, 0, 14.81]</td>
    </tr>
    <tr>
      <td data-th="State">Hanya bergerak ke kanan</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[3, 0, 0]</td>
      <td data-th="Acceleration with gravity">[3, 0, 9.81]</td>
    </tr>
    <tr>
      <td data-th="State">Bergerak ke atas dan ke kanan</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[5, 0, 5]</td>
      <td data-th="Acceleration with gravity">[5, 0, 14.81]</td>
    </tr>
  </tbody>
</table>

Sebaliknya, jika ponsel dipegang sehingga layar tegak lurus dengan
tanah, dan langsung terlihat oleh pengguna:

<table>
  <thead>
    <tr>
      <th data-th="State">Status</th>
      <th data-th="Rotation">Rotasi</th>
      <th data-th="Acceleration (m/s<sup>2</sup>)">Akselerasi (m/s<sup>2</sup>)</th>
      <th data-th="Acceleration with gravity (m/s<sup>2</sup>)">Akselerasi dengan gravitasi (m/s<sup>2</sup>)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="State">Tidak bergerak</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[0, 0, 0]</td>
      <td data-th="Acceleration with gravity">[0, 9.81, 0]</td>
    </tr>
    <tr>
      <td data-th="State">Bergerak naik ke arah langit</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[0, 5, 0]</td>
      <td data-th="Acceleration with gravity">[0, 14.81, 0]</td>
    </tr>
    <tr>
      <td data-th="State">Hanya bergerak ke kanan</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[3, 0, 0]</td>
      <td data-th="Acceleration with gravity">[3, 9.81, 0]</td>
    </tr>
    <tr>
      <td data-th="State">Bergerak ke atas dan ke kanan</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[5, 5, 0]</td>
      <td data-th="Acceleration with gravity">[5, 14.81, 0]</td>
    </tr>
  </tbody>
</table>

### Contoh: Menghitung percepatan maksimum objek

Salah satu cara menggunakan kejadian gerakan perangkat adalah untuk menghitung akselerasi maksimum
sebuah objek. Misalnya, berapa akselerasi maksimum orang yang 
melompat?

    if (evt.acceleration.x > jumpMax.x) {
      jumpMax.x = evt.acceleration.x;
    }
    if (evt.acceleration.y > jumpMax.y) {
      jumpMax.y = evt.acceleration.y;
    }
    if (evt.acceleration.z > jumpMax.z) {
      jumpMax.z = evt.acceleration.z;
    }


Setelah mengetuk tombol Go!, pengguna diberi tahu untuk melompat. Selama waktu tersebut,
laman menyimpan nilai percepatan maksimum (dan minimum), dan setelah
melompat, memberi tahu pengguna percepatan maksimum mereka.


{# wf_devsite_translation #}
