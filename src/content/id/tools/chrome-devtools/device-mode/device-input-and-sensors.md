project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Layar sentuh, chip GPS, dan akselerometer bisa sulit diuji karena sebagian desktop tidak memilikinya. Emulator sensor Chrome DevTools mengurangi biaya pengujian dengan mengemulasi sensor perangkat seluler yang umum.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2015-04-13 #}

# Mengemulasikan Sensor: Geolokasi dan Akselerometer {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/pbakaus.html" %}

Chip GPS dan akselerometer bisa sulit diuji karena sebagian desktop tidak memilikinya. Panel emulasi Chrome DevTools Sensors mengurangi overhead dengan mengemulasi sensor perangkat seluler yang umum.


### TL;DR {: .hide-from-toc }
- Mengemulasikan koordinat geolokasi untuk menguji penggantian geolokasi.
- Menyimulasikan orientasi perangkat untuk menguji data akselerometer.


## Mengakses kontrol sensor

<div class="wf-devtools-flex">
  <div>
    <p>Untuk mengakses kontrol sensor Chrome DevTools:</p>
    <ol>
      <li>Buka menu utama DevTools, lalu</li>
      <li>Di bawah <strong>More Tools</strong>, klik <strong>Sensors</strong></li>
    </ol>
  </div>
  <div class="wf-devtools-flex-half">
    <img src="imgs/navigate-to-sensors.png" alt="Navigasi ke panel Sensors">
  </div>
</div>

Note: Jika aplikasi Anda mendeteksi pemuatan sensor menggunakan JavaScript (misalnya Modernizr), pastikan Anda memuat ulang laman setelah mengaktifkan emulator sensor.

## Mengganti data geolokasi

Tidak seperti desktop, perangkat seluler biasanya menggunakan perangkat keras GPS untuk mendeteksi lokasi. Di panel Sensors, Anda bisa menyimulasikan koordinat geolokasi untuk digunakan dengan <a href='http://www.w3.org/TR/geolocation-API/'>Geolocation API</a>.

<div class="wf-devtools-flex">
  <div>
    <p>Aktifkan emulasi geolokasi dengan mencentang kotak <strong>Emulate geolocation coordinates</strong> pada panel sensor di panel samping emulasi.</p>
  </div>
  <div class="wf-devtools-flex-half">
    <img src="imgs/emulation-drawer-geolocation.png" alt="geolokasi emulator diaktifkan">
  </div>
</div>

Anda bisa menggunakan emulator ini untuk mengganti nilai posisi untuk `navigator.geolocation`, serta untuk menyimulasikan kasus ketika data geolokasi tidak tersedia.

## Mengemulasikan Akselerometer (Orientasi Perangkat)

<div class="wf-devtools-flex">
  <div>
    <p>Untuk menguji data akselerometer yang berasal dari <a href='http://www.w3.org/TR/screen-orientation/'>Orientation API</a>, aktifkan emulator akselerometer dengan mencentang kotak <strong>Accelerometer</strong> di panel Sensors.</p>
  </div>
  <div class="wf-devtools-flex-half">
    <img src="imgs/emulation-drawer-accelerometer.png" alt="Kontrol akselerometer">
  </div>
</div>

Anda bisa mengubah parameter orientasi berikut:

<dl>
<dt><abbr title="alpha">α</abbr></dt>
<dd>Rotasi di sekeliling sumbu z.</dd>
<dt><abbr title="beta">β</abbr></dt>
<dd>Miring kiri-ke-kanan.</dd>
<dt><abbr title="gamma">γ</abbr></dt>
<dd>Miring depan-ke-belakang.</dd>
</dl>

Anda juga bisa mengeklik dan menyeret akselerometer model ke orientasi yang diinginkan.

Coba emulator akselerometer dengan menggunakan [demo orientasi perangkat](http://googlesamples.github.io/web-fundamentals/fundamentals/native-hardware/device-orientation/dev-orientation.html) ini.




{# wf_devsite_translation #}
