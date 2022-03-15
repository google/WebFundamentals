project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Sebuah pendalaman mengenai daur hidup pekerja layanan.

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2016-09-29 #}
{# wf_blink_components: Blink>ServiceWorker #}

# Daur Hidup Pekerja Layanan {: .page-title }

{% include "web/_shared/contributors/jakearchibald.html" %}

Daur hidup pekerja layanan adalah bagian yang paling rumit. Jika Anda tidak tahu apa yang harus dilakukan dan apa manfaatnya, maka hal ini bisa terasa berat bagi Anda. Namun setelah Anda mengetahui cara kerjanya, Anda bisa menghasilkan update yang mulus dan tidak kentara untuk pengguna, dengan memadukan yang aspek terbaik dari web dan pola asli.

Ini merupakan penjelasan mendalam, namun poin-poin di awal setiap bagian hampir semua membahas hal yang perlu Anda ketahui.

## Maksud

Intent dari daur hidup adalah untuk:

* Memungkinkan pengutamaan offline.
* Memungkinkan pekerja layanan baru melakukan penyiapan mandiri tanpa mengganggu pekerja layanan saat ini.
* Memastikan halaman dalam cakupan dikontrol oleh pekerja layanan yang sama (atau tanpa pekerja layanan) seluruhnya.
* Memastikan hanya ada satu versi yang dijalankan untuk situs Anda pada satu waktu.

Poin terakhir merupakan hal yang sangat penting. Tanpa pekerja layanan, pengguna bisa memuat satu tab ke situs Anda, kemudian membuka tab lain nanti. Hal ini bisa mengakibatkan dua versi situs Anda dijalankan pada waktu yang sama. Terkadang hal ini boleh terjadi, namun jika Anda sedang berurusan dengan penyimpanan, Anda bisa dengan mudah mengakibatkan dua tab memiliki opini sangat berbeda mengenai cara keduanya menangani penyimpanan bersama. Hal ini bisa mengakibatkan error, atau lebih buruk lagi, kehilangan data.

Perhatian: Pengguna sangat tidak suka kehilangan data. Hal itu akan menyebabkan mereka sangat bersedih.

## Pekerja layanan pertama

Secara singkat:

* Peristiwa `install` adalah peristiwa pertama yang diambil pekerja layanan, dan ini hanya terjadi sekali.
* Sebuah promise diteruskan ke `installEvent.waitUntil()` yang akan menunjukkan durasi serta keberhasilan atau kegagalan penginstalan.
* Pekerja layanan tidak akan menerima peristiwa seperti `fetch` dan `push` sebelum berhasil menyelesaikan penginstalan dan menjadi "aktif".
* Secara default, pengambilan oleh halaman tidak akan melalui pekerja layanan kecuali jika permintaan halaman itu sendiri melalui pekerja layanan. Jadi Anda perlu memuat ulang halaman untuk melihat pengaruh dari pekerja layanan.
* `clients.claim()` bisa menggantikan default ini, dan mengambil kontrol atas halaman yang tidak dikontrol.

<style>
  .framebox-container-container {
    max-width: 466px;
    margin: 1.8rem auto 0;
  }
  .framebox-container {
    position: relative;
    padding-top: 75.3%;
  }
  .framebox-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
  }
  .browser-screenshot {
    filter: drop-shadow(0 6px 4px rgba(0,0,0,0.2));
  }
</style>
<div class="framebox-container-container">
<div class="framebox-container">
{% framebox height="100%" %}
<link href="https://fonts.googleapis.com/css?family=Just+Another+Hand" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TweenLite.min.js"
  integrity="sha384-al3qvxiX1jQs5ZPPnL8UubdkVRFveHNxF3ZNTbMXFxd8JBFwMIq8BVaVOW/CEUKB"
  crossorigin="anonymous" defer>
</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TimelineLite.min.js"
  integrity="sha384-fw2pCo41nKTwSnKUUxW43cI1kDLRw2qLaZQR2ZEQnh1s6xM6pP3H+SbM/Ehm6uI7"
  crossorigin="anonymous" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/plugins/CSSPlugin.min.js"
  integrity="sha384-yn7MLKNpLL+YDD9r3YvNFKEBhs/bzA4i51f28+h6KCYsZIhbif9+JcdK/lZOlnEY"
  crossorigin="anonymous" defer></script>
<style>
.lifecycle-diagram {
  width: 100%;
  height: auto;
  display: block;
}

.lifecycle-diagram .label {
  font-size: 9.46829414px;
  font-family: 'Just Another Hand';
  text-align: center;
  text-anchor: middle;
}

.lifecycle-diagram .state-placeholder {
  fill: none;
  stroke-opacity: 0.28;
  stroke-width: 1px;
  stroke: #000;
  stroke-dasharray: 1;
}
.lifecycle-diagram .fetch {
  fill: none;
  stroke: #000;
  stroke-width: 1px;
}
.lifecycle-diagram .controlled {
  fill: #d1eaff;
}

.lifecycle-diagram .fetch {
  stroke-dasharray: 7 30;
  stroke-dashoffset: 8;
}

.lifecycle-diagram.register,
.lifecycle-diagram .diagram-refresh,
.lifecycle-diagram .diagram-close,
.lifecycle-diagram.register .controlled,
.lifecycle-diagram .cog-new {
  opacity: 0;
}
</style>
<svg class="lifecycle-diagram" style="display:none">
  <defs>
    <g id="diagram-static">
      <text y="6.7" x="14.5" class="label">Menginstal</text><text y="6.7" x="81.1" class="label">Aktif</text><circle r="14" cy="25.8" cx="14.5" class="state-placeholder"/><circle r="14" cy="25.8" cx="47.8" class="state-placeholder"/><circle r="14" cy="25.8" cx="81.2" class="state-placeholder"/>
    </g>
    <g id="diagram-page">
      <path d="M 191.3,0 12.8,0 C 5.8,0 0,5.7 0,12.8 L 0,167 c 0,7.2 5.7,13 12.8,13 l 178.5,0 c 7,0 12.8,-5.8 12.8,-13 l 0,-154 C 204,6 198.7,0.2 191.6,0.2 Z M 11,11 c 0.5,-0.5 1,-0.7 1.8,-0.8 l 178.5,0 c 0.7,0 1.3,0.3 1.8,0.8 0.8,0.5 1,1 1,1.8 l 0,13.5 -184.1,0 0,-13.5 c 0,-0.7 0.3,-1.3 0.8,-1.8 z m 182,158 c -0.4,0.4 -1,0.7 -1.7,0.7 l -178.5,0 c -0.7,0 -1.3,-0.3 -1.8,-0.8 -0.5,-0.8 -0.8,-1.4 -0.8,-2 l 0,-130.4 183.6,0 0,130.5 c 0,0.8 -0.2,1.4 -0.7,2 z" />
      <path d="m 26.5,18.6 c 0,2.8 -2.3,5 -5,5 -3,0 -5.2,-2.2 -5.2,-5 0,-3 2.2,-5.2 5,-5.2 3,0 5.2,2.3 5.2,5.2 z m 15.2,0 c 0,2.8 -2.3,5 -5,5 -3,0 -5.2,-2.2 -5.2,-5 0,-3 2.3,-5.2 5,-5.2 3,0 5.2,2.3 5.2,5.2 z m 15.3,0 c 0,2.8 -2.3,5 -5.2,5 -2.8,0 -5,-2.2 -5,-5 0,-3 2.2,-5.2 5,-5.2 3,0 5.2,2.3 5.2,5.2 z m -5.2,111 102.7,0 0,10.4 -102.7,0 0,-10.3 z m 0,-16.8 102.7,0 0,10.2 -102.7,0 0,-10 z M 52,96 l 45.4,0 0,10.2 -45.4,0 0,-10.2 z m 0,-17 45.4,0 0,10.3 -45.4,0 0,-10.3 z m 0,-16.8 45.6,0 0,10.3 -45.6,0 0,-10.3 z m 100.2,1.3 -45.4,0 0,42 45.4,0 0,-42 z m -10.2,31.8 -25,0 0,-21.5 25,0 0,21.5 z" />
    </g>
    <path id="diagram-sw" d="m 19.43,12.98 c 0.04,-0.32 0.07,-0.64 0.07,-0.98 0,-0.34 -0.03,-0.66 -0.07,-0.98 l 2.11,-1.65 c 0.19,-0.15 0.24,-0.42 0.12,-0.64 l -2,-3.46 C 19.54,5.05 19.27,4.97 19.05,5.05 l -2.49,1 C 16.04,5.65 15.48,5.32 14.87,5.07 L 14.49,2.42 C 14.46,2.18 14.25,2 14,2 L 10,2 C 9.75,2 9.54,2.18 9.51,2.42 L 9.13,5.07 C 8.52,5.32 7.96,5.66 7.44,6.05 l -2.49,-1 C 4.72,4.96 4.46,5.05 4.34,5.27 l -2,3.46 C 2.21,8.95 2.27,9.22 2.46,9.37 l 2.11,1.65 C 4.53,11.34 4.5,11.67 4.5,12 c 0,0.33 0.03,0.66 0.07,0.98 l -2.11,1.65 c -0.19,0.15 -0.24,0.42 -0.12,0.64 l 2,3.46 c 0.12,0.22 0.39,0.3 0.61,0.22 l 2.49,-1 c 0.52,0.4 1.08,0.73 1.69,0.98 l 0.38,2.65 C 9.54,21.82 9.75,22 10,22 l 4,0 c 0.25,0 0.46,-0.18 0.49,-0.42 l 0.38,-2.65 c 0.61,-0.25 1.17,-0.59 1.69,-0.98 l 2.49,1 c 0.23,0.09 0.49,0 0.61,-0.22 l 2,-3.46 c 0.12,-0.22 0.07,-0.49 -0.12,-0.64 L 19.43,12.98 Z M 12,15.5 c -1.93,0 -3.5,-1.57 -3.5,-3.5 0,-1.93 1.57,-3.5 3.5,-3.5 1.93,0 3.5,1.57 3.5,3.5 0,1.93 -1.57,3.5 -3.5,3.5 z"/>
    <g id="diagram-refresh"><circle id="page-action-circle" cx="81.2" cy="58.1" r="3.5" fill="#fff" stroke="#000" stroke-width=".5"/><path d="M82.76 56.48c-.4-.4-.97-.66-1.6-.66-1.23 0-2.23 1-2.23 2.24 0 1.24 1 2.25 2.24 2.25 1.05 0 1.92-.7 2.17-1.68h-.58c-.23.66-.86 1.13-1.6 1.13-.92 0-1.67-.76-1.67-1.7 0-.92.74-1.67 1.67-1.67.47 0 .88.2 1.2.5l-.92.9h1.97v-1.96l-.66.66z"/></g>
    <g id="diagram-close"><use xlink:href="#page-action-circle"/><path id="path5062" d="M83 56.58l-.37-.37-1.46 1.47-1.45-1.46-.37.38 1.46 1.46-1.45 1.46.37.36 1.45-1.45 1.46 1.46.37-.36-1.46-1.46z"/></g>
  </defs>
</svg>
<svg class="lifecycle-diagram register" viewBox="0 0 96.9 73"><rect ry="15.8" y="10" x="65.4" height="63" width="31.6" class="controlled"/><use xlink:href="#diagram-static"/><g transform="matrix(1.1187 0 0 1.1187 1.078 12.408)" class="cog cog-new"><use height="10" width="10" xlink:href="#diagram-sw"/></g><use transform="matrix(.09532 0 0 .09532 71.44 48.39)" xlink:href="#diagram-page" width="10" height="10" class="diagram-page"/><path d="M78.6 47.7c-1-6-2-11.6-1.6-17" class="fetch"/><path d="M83 47.5c1.4-5.4 3.3-10.8 2.4-16.2" class="fetch"/><path d="M75.7 47c-2.3-6.3-3.2-12.5-2-18.2" class="fetch"/><path d="M89.5 29.5c.3 6-.4 12-4 18" class="fetch"/><path d="M75.4 30.3c0 4-1 6 2 17.2" class="fetch"/><path d="M86.6 31C88 37 86 42 84 47.4" class="fetch"/><g class="refresh-rotator"><use xlink:href="#diagram-refresh" class="diagram-refresh"/></g></svg>

<script>
  document.addEventListener("DOMContentLoaded", function() {
    var el = document.querySelector('.lifecycle-diagram.register');
    var timeline = new TimelineLite({paused: true, onComplete: function() {
      timeline.play(0);
    }});

    var cogRotate = TweenLite.fromTo(el.querySelector('.cog-new use'), 15, {rotation: 0, transformOrigin:"50% 50%"}, {rotation: 360, ease: Linear.easeNone, paused: true, onComplete: function() {
      cogRotate.play(0);
    }});

    timeline.to(el, 0.5, {opacity: 1, ease: Quad.easeInOut});
    timeline.set({}, {}, "+=0.5");
    timeline.to(el.querySelector('.cog-new'), 0.5, {opacity: 1, ease: Quad.easeInOut});
    timeline.set({}, {}, "+=0.5");
    timeline.to(el.querySelector('.cog-new'), 1, {transform: 'matrix(1.1187138,0,0,1.1187138,67.745203,12.407711)', ease: Quint.easeInOut});
    timeline.addLabel('cog-active');

    var subTimeline = new TimelineLite();
    subTimeline.set({}, {}, "+=0.7");
    subTimeline.to(el.querySelector('.diagram-page'), 0.5, {opacity: 0, ease: Quad.easeInOut});
    subTimeline.set({}, {}, "+=0.5");
    subTimeline.addLabel('page-load')
    subTimeline.to(el.querySelector('.diagram-page'), 0.5, {opacity: 1, ease: Quad.easeInOut});
    subTimeline.to(el.querySelector('.controlled'), 0.5, {opacity: 1, ease: Quad.easeInOut, delay: 0.25}, 'page-load');

    var refresh = new TimelineLite();
    refresh.set({}, {}, "+=0.5");
    refresh.addLabel('refresh-appearing');
    refresh.fromTo(el.querySelector('.diagram-refresh'), 0.25,
      {opacity: 0, scale: 0, transformOrigin:"50% 50%"},
      {opacity: 1, scale: 1, ease: Quad.easeInOut}
    );
    refresh.set({}, {}, "+=1.3");
    refresh.to(el.querySelector('.diagram-refresh'), 0.25, {opacity: 0, scale: 0, ease: Quad.easeInOut});
    refresh.to(el.querySelector('.refresh-rotator'), 2, {rotation: 360, ease: Linear.easeNone}, 'refresh-appearing');

    timeline.add(subTimeline, 'cog-active');
    timeline.add(refresh, 'cog-active');

    var fetching = new TimelineLite();
    Array.prototype.slice.call(el.querySelectorAll('.fetch')).forEach(function(el, i) {
      fetching.to(el, 0.5, {strokeDashoffset: '-19px', ease: Linear.easeNone}, i * 0.15);
    });

    timeline.add(fetching);
    timeline.set({}, {}, "+=3");
    timeline.to(el, 0.5, {opacity: 0, ease: Quad.easeInOut});
    timeline.set({}, {}, "+=0.5");

    if (window.IntersectionObserver) {
      var observer = new IntersectionObserver(function(changes) {
        changes.forEach(function(change) {
          if (change.intersectionRatio) {
            timeline.play(0);
            cogRotate.play(0);
            return;
          }
          timeline.pause();
          cogRotate.pause();
        });
      }, {});

      observer.observe(document.documentElement);
    }
    else {
      timeline.play(0);
      cogRotate.play(0);
    }
  });
</script>
{% endframebox %}
</div>
</div>

Perhatikan HTML ini:

    <!DOCTYPE html>
    Sebuah gambar akan muncul di sini dalam waktu 3 detik:
    <script>
      navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('SW registered!', reg))
        .catch(err => console.log('Boo!', err));

      setTimeout(() => {
        const img = new Image();
        img.src = '/dog.svg';
        document.body.appendChild(img);
      }, 3000);
    </script>

HTML mendaftarkan pekerja layanan dan menambahkan gambar anjing setelah 3 detik.

Inilah pekerja layanan tersebut, `sw.js`:

    self.addEventListener('install', event => {
      console.log('V1 installing…');

      // cache a cat SVG
      event.waitUntil(
        caches.open('static-v1').then(cache => cache.add('/cat.svg'))
      );
    });

    self.addEventListener('activate', event => {
      console.log('V1 now ready to handle fetches!');
    });

    self.addEventListener('fetch', event => {
      const url = new URL(event.request.url);

      // serve the cat SVG from the cache if the request is
      // same-origin and the path is '/dog.svg'
      if (url.origin == location.origin && url.pathname == '/dog.svg') {
        event.respondWith(caches.match('/cat.svg'));
      }
    });

Pekerja layanan menyimpan cache gambar kucing, dan menyajikannya jika ada permintaan untuk `/dog.svg`. Akan tetapi, jika Anda [menjalankan contoh di atas](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/){: .external }, Anda akan melihat anjing saat pertama kali memuat halaman. Klik muat ulang, dan Anda akan melihat gambar kucing tersebut.

Note: Kucing adalah lebih baik daripada anjing. Keduanya memang *demikian*.

### Cakupan dan kontrol

Cakupan default pendaftaran pekerja layanan `./` dibandingkan URL skrip. Berarti, jika Anda mendaftarkan pekerja layanan di `//example.com/foo/bar.js`, maka akan memiliki cakupan default `//example.com/foo/`.

Kita menyebutnya halaman, pekerja, dan pekerja bersama berupa `clients`. Pekerja layanan hanya bisa mengontrol klien yang berada dalam cakupan. Setelah klien "dikontrol", pengambilannya akan melalui pekerja layanan dalam cakupan. Anda bisa mendeteksi jika klien dikontrol lewat `navigator.serviceWorker.controller` yang akan berupa nol atau instance pekerja layanan.

### Download, uraikan, dan jalankan

Pekerja layanan pertama Anda akan didownload jika Anda memanggil `.register()` Jika skrip Anda gagal mendownload, menguraikan, atau membuang error dalam eksekusi pertamanya, promise register akan menolak, dan pekerja layanan akan dihapus.

Chrome DevTools menampilkan error di konsol, dan di bagian pekerja layanan pada tab aplikasi:

<figure>
  <img src="images/register-fail.png" class="browser-screenshot" alt="Error yang ditampilkan di tab DevTools pada pekerja layanan"/>
</figure>

### Instal

Peristiwa pertama yang diambil pekerja layanan adalah `install`. Penginstalan akan dipicu begitu pekerja layanan dieksekusi, dan hanya dipanggil sekali per pekerja layanan. Jika Anda mengubah skrip pekerja layanan, browser akan menganggapnya sebagai pekerja layanan yang berbeda, dan akan mendapatkan peristiwa `install` sendiri. Saya akan membahas [update secara detail nanti](#updates).

Peristiwa `install` adalah kesempatan Anda untuk men-cache segala sesuatu yang Anda butuhkan sebelum dapat mengontrol klien. Promise yang Anda teruskan ke `event.waitUntil()` memungkinkan browser mengetahui kapan Anda selesai menginstal, dan apakah penginstalan itu berhasil.

Jika promise Anda ditolak, ini menandakan penginstalan gagal, dan browser membuang pekerja layanan. Itu tidak akan pernah mengontrol klien. Ini berarti kita tidak bisa mengandalkan "cat.svg" yang ada di cache dalam peristiwa `fetch`. Ini adalah dependensi.

### Aktifkan

Setelah pekerja layanan Anda siap mengontrol klien dan menangani peristiwa fungsional seperti `push` dan `sync`, Anda akan mendapatkan peristiwa `activate`. Namun itu tidak berarti halaman yang disebut `.register()` akan dikontrol.

Saat pertama Anda memuat [demo](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/){: .external }, walaupun `dog.svg` telah lama diminta setelah pekerja layanan diaktifkan, itu tidak menangani permintaan tersebut, dan Anda tetap melihat gambar anjing. Default-nya adalah *konsistensi*, jika halaman dimuat tanpa pekerja layanan, tidak ada yang akan menjadi sub-resourcenya. Jika Anda memuat [demo](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/){: .external } untuk kedua kalinya (dengan kata lain, muat ulang halaman), itu akan dikontrol. Halaman dan gambar akan melalui peristiwa `fetch`, dan Anda akan melihat kucing sebagai gantinya.

### clients.claim

Anda bisa mengontrol klien yang tidak dikontrol dengan memanggil `clients.claim()` dalam pekerja layanan setelah itu diaktifkan.

Inilah [variasi demodi atas](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/df4cae41fa658c4ec1fa7b0d2de05f8ba6d43c94/){: .external } yang memanggil `clients.claim()` dalam peristiwa `activate`-nya. Anda *seharusnya* akan melihat gambar kucing untuk pertama kali. Saya katakan "seharusnya", karena ini adalah sesuatu yang sensitif terhadap waktu. Anda hanya akan melihat kucing jika pekerja layanan diaktifkan dan `clients.claim()` berlaku sebelum gambar berusaha dimuat.

Jika Anda menggunakan pekerja layanan untuk memuat halaman secara berbeda dengan halaman yang dimuat melalui jaringan, `clients.claim()` akan mengganggu, karena pekerja layanan Anda akan mengakhiri kontrol atas beberapa klien yang telah dimuat tanpa pekerja layanan.

Note: Saya mengetahui banyak orang termasuk `clients.claim()` sebagai boilerplate, namun saya jarang melakukannya sendiri. Ini hanya benar-benar penting pada saat pemuatan pertama, dan karena adanya penyempurnaan progresif, halaman biasanya bekerja dengan baik tanpa pekerja layanan sekalipun.

## Mengupdate pekerja layanan {: #updates}

Secara singkat:

* Update dipicu:
    * Pada navigasi ke halaman dalam-cakupan.
    * Pada peristiwa fungsional seperti `push` dan `sync`, kecuali jika ada pemeriksaan update dalam 24 jam sebelumnya.
    * Pada pemanggilan `.register()` *hanya jika* URL pekerja layanan telah berubah.
* Sebagian besar browser, termasuk [Chrome 68 dan yang lebih baru](/web/updates/2018/06/fresher-sw), secara default mengabaikan pemeriksaan header ketika memeriksa update skrip pekerja layanan terdaftar. Browser masih menghargai header caching ketika mengambil resource yang dimuat di dalam pekerja layanan melalui `importScripts()`. Anda dapat mengganti perilaku default ini dengan mengatur opsi [`updateViaCache`](/web/updates/2018/06/fresher-sw#updateviacache) saat mendaftarkan pekerja layanan Anda.
* Pekerja layanan Anda dianggap diupdate jika berbeda sedikit saja dengan pekerja layanan yang sudah dimiliki browser. (Kita memperluasnya dengan menyertakan juga skrip/modul yang telah diimpor.)
* Pekerja layanan yang telah diupdate diluncurkan bersama yang sudah ada, dan mendapatkan peristiwa `install`-nya sendiri.
* Jika pekerja layanan baru Anda memiliki kode status bukan OK (misalnya, 404), gagal menguraikan, membuang error selama eksekusi, atau ditolak selama penginstalan, pekerja layanan baru akan dibuang, namun yang ada saat ini akan tetap aktif.
* Setelah berhasil diinstal, pekerja layanan yang telah diupdate akan `wait` hingga pekerja layanan yang ada tidak mengontrol klien sama sekali. (Perhatikan, klien akan tumpang tindih selama pemuatan ulang.)
* `self.skipWaiting()` mencegah proses menunggu, yang berarti pekerja layanan akan diaktifkan begitu selesai diinstal.

<div class="framebox-container-container">
<div class="framebox-container">
{% framebox height="100%" %}
<link href="https://fonts.googleapis.com/css?family=Just+Another+Hand" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TweenLite.min.js"
  integrity="sha384-al3qvxiX1jQs5ZPPnL8UubdkVRFveHNxF3ZNTbMXFxd8JBFwMIq8BVaVOW/CEUKB"
  crossorigin="anonymous" defer>
</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TimelineLite.min.js"
  integrity="sha384-fw2pCo41nKTwSnKUUxW43cI1kDLRw2qLaZQR2ZEQnh1s6xM6pP3H+SbM/Ehm6uI7"
  crossorigin="anonymous" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/plugins/CSSPlugin.min.js"
  integrity="sha384-yn7MLKNpLL+YDD9r3YvNFKEBhs/bzA4i51f28+h6KCYsZIhbif9+JcdK/lZOlnEY"
  crossorigin="anonymous" defer></script>
<style>
.lifecycle-diagram {
  width: 100%;
  height: auto;
  display: block;
}

.lifecycle-diagram .label {
  font-size: 9.46829414px;
  font-family: 'Just Another Hand';
  text-align: center;
  text-anchor: middle;
}

.lifecycle-diagram .state-placeholder {
  fill: none;
  stroke-opacity: 0.28;
  stroke-width: 1px;
  stroke: #000;
  stroke-dasharray: 1;
}
.lifecycle-diagram .fetch {
  fill: none;
  stroke: #000;
  stroke-width: 1px;
}
.lifecycle-diagram .controlled {
  fill: #d1eaff;
}

.lifecycle-diagram .fetch {
  stroke-dasharray: 7 30;
  stroke-dashoffset: 8;
}

.lifecycle-diagram.register,
.lifecycle-diagram .diagram-refresh,
.lifecycle-diagram .diagram-close,
.lifecycle-diagram.register .controlled,
.lifecycle-diagram .cog-new {
  opacity: 0;
}
</style>
<svg class="lifecycle-diagram" style="display:none">
  <defs>
    <g id="diagram-static">
      <text y="6.7" x="14.5" class="label">Menginstal</text><text y="6.7" x="81.1" class="label">Aktif</text><circle r="14" cy="25.8" cx="14.5" class="state-placeholder"/><circle r="14" cy="25.8" cx="47.8" class="state-placeholder"/><circle r="14" cy="25.8" cx="81.2" class="state-placeholder"/>
    </g>
    <g id="diagram-page">
      <path d="M 191.3,0 12.8,0 C 5.8,0 0,5.7 0,12.8 L 0,167 c 0,7.2 5.7,13 12.8,13 l 178.5,0 c 7,0 12.8,-5.8 12.8,-13 l 0,-154 C 204,6 198.7,0.2 191.6,0.2 Z M 11,11 c 0.5,-0.5 1,-0.7 1.8,-0.8 l 178.5,0 c 0.7,0 1.3,0.3 1.8,0.8 0.8,0.5 1,1 1,1.8 l 0,13.5 -184.1,0 0,-13.5 c 0,-0.7 0.3,-1.3 0.8,-1.8 z m 182,158 c -0.4,0.4 -1,0.7 -1.7,0.7 l -178.5,0 c -0.7,0 -1.3,-0.3 -1.8,-0.8 -0.5,-0.8 -0.8,-1.4 -0.8,-2 l 0,-130.4 183.6,0 0,130.5 c 0,0.8 -0.2,1.4 -0.7,2 z" />
      <path d="m 26.5,18.6 c 0,2.8 -2.3,5 -5,5 -3,0 -5.2,-2.2 -5.2,-5 0,-3 2.2,-5.2 5,-5.2 3,0 5.2,2.3 5.2,5.2 z m 15.2,0 c 0,2.8 -2.3,5 -5,5 -3,0 -5.2,-2.2 -5.2,-5 0,-3 2.3,-5.2 5,-5.2 3,0 5.2,2.3 5.2,5.2 z m 15.3,0 c 0,2.8 -2.3,5 -5.2,5 -2.8,0 -5,-2.2 -5,-5 0,-3 2.2,-5.2 5,-5.2 3,0 5.2,2.3 5.2,5.2 z m -5.2,111 102.7,0 0,10.4 -102.7,0 0,-10.3 z m 0,-16.8 102.7,0 0,10.2 -102.7,0 0,-10 z M 52,96 l 45.4,0 0,10.2 -45.4,0 0,-10.2 z m 0,-17 45.4,0 0,10.3 -45.4,0 0,-10.3 z m 0,-16.8 45.6,0 0,10.3 -45.6,0 0,-10.3 z m 100.2,1.3 -45.4,0 0,42 45.4,0 0,-42 z m -10.2,31.8 -25,0 0,-21.5 25,0 0,21.5 z" />
    </g>
    <path id="diagram-sw" d="m 19.43,12.98 c 0.04,-0.32 0.07,-0.64 0.07,-0.98 0,-0.34 -0.03,-0.66 -0.07,-0.98 l 2.11,-1.65 c 0.19,-0.15 0.24,-0.42 0.12,-0.64 l -2,-3.46 C 19.54,5.05 19.27,4.97 19.05,5.05 l -2.49,1 C 16.04,5.65 15.48,5.32 14.87,5.07 L 14.49,2.42 C 14.46,2.18 14.25,2 14,2 L 10,2 C 9.75,2 9.54,2.18 9.51,2.42 L 9.13,5.07 C 8.52,5.32 7.96,5.66 7.44,6.05 l -2.49,-1 C 4.72,4.96 4.46,5.05 4.34,5.27 l -2,3.46 C 2.21,8.95 2.27,9.22 2.46,9.37 l 2.11,1.65 C 4.53,11.34 4.5,11.67 4.5,12 c 0,0.33 0.03,0.66 0.07,0.98 l -2.11,1.65 c -0.19,0.15 -0.24,0.42 -0.12,0.64 l 2,3.46 c 0.12,0.22 0.39,0.3 0.61,0.22 l 2.49,-1 c 0.52,0.4 1.08,0.73 1.69,0.98 l 0.38,2.65 C 9.54,21.82 9.75,22 10,22 l 4,0 c 0.25,0 0.46,-0.18 0.49,-0.42 l 0.38,-2.65 c 0.61,-0.25 1.17,-0.59 1.69,-0.98 l 2.49,1 c 0.23,0.09 0.49,0 0.61,-0.22 l 2,-3.46 c 0.12,-0.22 0.07,-0.49 -0.12,-0.64 L 19.43,12.98 Z M 12,15.5 c -1.93,0 -3.5,-1.57 -3.5,-3.5 0,-1.93 1.57,-3.5 3.5,-3.5 1.93,0 3.5,1.57 3.5,3.5 0,1.93 -1.57,3.5 -3.5,3.5 z"/>
    <g id="diagram-refresh"><circle id="page-action-circle" cx="81.2" cy="58.1" r="3.5" fill="#fff" stroke="#000" stroke-width=".5"/><path d="M82.76 56.48c-.4-.4-.97-.66-1.6-.66-1.23 0-2.23 1-2.23 2.24 0 1.24 1 2.25 2.24 2.25 1.05 0 1.92-.7 2.17-1.68h-.58c-.23.66-.86 1.13-1.6 1.13-.92 0-1.67-.76-1.67-1.7 0-.92.74-1.67 1.67-1.67.47 0 .88.2 1.2.5l-.92.9h1.97v-1.96l-.66.66z"/></g>
    <g id="diagram-close"><use xlink:href="#page-action-circle"/><path id="path5062" d="M83 56.58l-.37-.37-1.46 1.47-1.45-1.46-.37.38 1.46 1.46-1.45 1.46.37.36 1.45-1.45 1.46 1.46.37-.36-1.46-1.46z"/></g>
  </defs>
</svg>
<svg class="lifecycle-diagram update" viewBox="0 0 96.9 73"><rect ry="15.8" y="10" x="65.4" height="63" width="31.6" class="controlled"/><use xlink:href="#diagram-static"/><text x="47.7" y="6.7" class="label">Menunggu</text><g transform="matrix(1.1187 0 0 1.1187 1.078 12.408)" class="cog cog-new"><use height="10" width="10" xlink:href="#diagram-sw"/></g><g transform="matrix(1.1187 0 0 1.1187 67.745 12.408)" class="cog cog-old"><use xlink:href="#diagram-sw" width="10" height="10"/></g><use transform="matrix(.09532 0 0 .09532 71.44 48.39)" xlink:href="#diagram-page" width="10" height="10" class="diagram-page"/><path d="M78.6 47.7c-1-6-2-11.6-1.6-17" class="fetch"/><path d="M83 47.5c1.4-5.4 3.3-10.8 2.4-16.2" class="fetch"/><path d="M75.7 47c-2.3-6.3-3.2-12.5-2-18.2" class="fetch"/><path d="M89.5 29.5c.3 6-.4 12-4 18" class="fetch"/><path d="M75.4 30.3c0 4-1 6 2 17.2" class="fetch"/><path d="M86.6 31C88 37 86 42 84 47.4" class="fetch"/><g class="refresh-rotator"><use xlink:href="#diagram-refresh" class="diagram-refresh"/></g><use xlink:href="#diagram-close" class="diagram-close"/></svg>

<script>
  document.addEventListener("DOMContentLoaded", function() {
    var el = document.querySelector('.lifecycle-diagram.update');
    var timeline = new TimelineLite({paused: true, onComplete: function() {
      timeline.play(0);
    }});

    var cogRotate = TweenLite.fromTo(el.querySelector('.cog-new use'), 15, {rotation: 0, transformOrigin:"50% 50%"}, {rotation: 360, ease: Linear.easeNone, paused: true, onComplete: function() {
      cogRotate.play(0);
    }});

    var oldCogRotate = TweenLite.fromTo(el.querySelector('.cog-old use'), 15, {rotation: 0, transformOrigin:"50% 50%"}, {rotation: 360, ease: Linear.easeNone, paused: true, onComplete: function() {
      oldCogRotate.play(0);
    }});

    function createFetchingAnim() {
      var fetching = new TimelineLite();
      Array.prototype.slice.call(el.querySelectorAll('.fetch')).forEach(function(el, i) {
        fetching.fromTo(el, 0.5,
          {strokeDashoffset: 8},
          {strokeDashoffset: -19, ease: Linear.easeNone},
          i * 0.15
        );
      });
      return fetching;
    }

    timeline.add(createFetchingAnim());
    timeline.set({}, {}, "+=0.5");
    timeline.to(el.querySelector('.cog-new'), 0.5, {opacity: 1, ease: Quad.easeInOut});
    timeline.set({}, {}, "+=0.5");
    timeline.to(el.querySelector('.cog-new'), 1, {transform: 'matrix(1.1187138,0,0,1.1187138,34.411905,12.407711)', ease: Quint.easeInOut});
    timeline.addLabel('cog-waiting');

    var subTimeline = new TimelineLite();
    subTimeline.set({}, {}, "+=0.7");
    subTimeline.to(el.querySelector('.diagram-page'), 0.5, {opacity: 0, ease: Quad.easeInOut});
    subTimeline.set({}, {}, "+=0.5");
    subTimeline.addLabel('page-load')
    subTimeline.to(el.querySelector('.diagram-page'), 0.5, {opacity: 1, ease: Quad.easeInOut});
    subTimeline.to(el.querySelector('.controlled'), 0.5, {opacity: 1, ease: Quad.easeInOut, delay: 0.25}, 'page-load');

    var refresh = new TimelineLite();
    refresh.set({}, {}, "+=0.5");
    refresh.addLabel('refresh-appearing');
    refresh.fromTo(el.querySelector('.diagram-refresh'), 0.25,
      {opacity: 0, scale: 0, transformOrigin:"50% 50%"},
      {opacity: 1, scale: 1, ease: Quad.easeInOut}
    );
    refresh.set({}, {}, "+=1.3");
    refresh.to(el.querySelector('.diagram-refresh'), 0.25, {opacity: 0, scale: 0, ease: Quad.easeInOut});
    refresh.to(el.querySelector('.refresh-rotator'), 2, {rotation: 360, ease: Linear.easeNone}, 'refresh-appearing');

    timeline.add(subTimeline, 'cog-waiting');
    timeline.add(refresh, 'cog-waiting');
    timeline.add(createFetchingAnim());
    timeline.set({}, {}, "+=1");
    timeline.fromTo(el.querySelector('.diagram-close'), 0.25,
      {opacity: 0, scale: 0, transformOrigin:"50% 50%"},
      {opacity: 1, scale: 1, ease: Quad.easeInOut}
    );
    timeline.set({}, {}, "+=0.5");
    timeline.addLabel('page-close');
    timeline.to(el.querySelector('.controlled'), 0.5, {opacity: 0, ease: Quad.easeInOut}, 'page-close');
    timeline.to(el.querySelector('.diagram-page'), 0.5, {opacity: 0, ease: Quad.easeInOut}, 'page-close');
    timeline.to(el.querySelector('.diagram-close'), 0.25, {opacity: 0, scale: 0, ease: Quad.easeInOut}, 'page-close');
    timeline.set({}, {}, "+=0.5");
    timeline.addLabel('takeover');
    timeline.to(el.querySelector('.cog-old'), 0.5, {opacity: 0, ease: Quad.easeInOut}, 'takeover');
    timeline.to(el.querySelector('.cog-new'), 1, {transform: 'matrix(1.1187138,0,0,1.1187138,67.745203,12.407711)', ease: Quint.easeInOut}, 'takeover');
    timeline.set({}, {}, "+=0.5");
    timeline.addLabel('page-open');
    timeline.to(el.querySelector('.controlled'), 0.5, {opacity: 1, ease: Quad.easeInOut}, 'page-open+=0.25');
    timeline.to(el.querySelector('.diagram-page'), 0.5, {opacity: 1, ease: Quad.easeInOut}, 'page-open');

    if (window.IntersectionObserver) {
      var observer = new IntersectionObserver(function(changes) {
        changes.forEach(function(change) {
          if (change.intersectionRatio) {
            timeline.play(0);
            cogRotate.play(0);
            oldCogRotate.play(0);
            return;
          }
          timeline.pause();
          cogRotate.pause();
          oldCogRotate.pause(0);
        });
      }, {});

      observer.observe(document.documentElement);
    }
    else {
      timeline.play(0);
      cogRotate.play(0);
      oldCogRotate.play(0);
    }
  });
</script>
{% endframebox %}
</div>
</div>

Anggaplah kita mengubah skrip pekerja layanan untuk merespons dengan gambar kuda, bukan kucing:

    const expectedCaches = ['static-v2'];

    self.addEventListener('install', event => {
      console.log('V2 installing…');

      // cache a horse SVG into a new cache, static-v2
      event.waitUntil(
        caches.open('static-v2').then(cache => cache.add('/horse.svg'))
      );
    });

    self.addEventListener('activate', event => {
      // delete any caches that aren't in expectedCaches
      // which will get rid of static-v1
      event.waitUntil(
        caches.keys().then(keys => Promise.all(
          keys.map(key => {
            if (!expectedCaches.includes(key)) {
              return caches.delete(key);
            }
          })
        )).then(() => {
          console.log('V2 now ready to handle fetches!');
        })
      );
    });

    self.addEventListener('fetch', event => {
      const url = new URL(event.request.url);

      // serve the horse SVG from the cache if the request is
      // same-origin and the path is '/dog.svg'
      if (url.origin == location.origin && url.pathname == '/dog.svg') {
        event.respondWith(caches.match('/horse.svg'));
      }
    });

Note: Saya tidak memiliki opini yang kuat mengenai kuda. [Lihat demo di atas](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/index-v2.html){: .external }. Anda seharusnya tetap melihat gambar kucing. Inilah alasannya...

### Instal.

Perhatikan, saya telah mengubah nama cache dari `static-v1` menjadi `static-v2`. Ini berarti saya bisa menyiapkan cache baru tanpa menimpa apa yang ada di cache saat ini, yang masih digunakan oleh pekerja layanan lama.

Pola ini akan membuat cache versi tertentu, semacam aset yang akan dibundel oleh aplikasi asli bersama file yang dapat dieksekusi. Anda mungkin juga memiliki cache yang bukan versi tertentu, misalnya `avatars`.

### Menunggu

Setelah berhasil menginstalnya, pekerja layanan yang telah diupdate akan menunda aktivasi hingga pekerja layanan yang ada tidak lagi mengontrol klien. Keadaan ini disebut "menunggu", dan inilah cara browser memastikan bahwa hanya ada satu versi pekerja layanan yang berjalan dalam satu waktu.

Jika Anda menjalankan [demo yang telah diupdate](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/index-v2.html){: .external }, Anda seharusnya tetap melihat gambar kucing, karena pekerja layanan V2 belum diaktifkan. Anda dapat melihat pekerja layanan baru menunggu di tab "Penerapan" pada DevTools:

<figure>
  <img src="images/waiting.png" class="browser-screenshot" alt="DevTools menampilkan pekerja layanan baru yang sedang menunggu"/>
</figure>

Bahkan jika Anda hanya memiliki satu tab dibuka ke demo, pemuatan ulang halaman tidak cukup untuk memungkinkan versi baru mengambil alih. Ini berdasarkan bagaimana navigasi browser berfungsi. Jika Anda mengarahkan, halaman saat ini tidak akan hilang hingga header respons diterima, dan bahkan halaman saat ini mungkin tetap dibuka jika respons memiliki header `Content-Disposition`. Karena tumpang tindih ini, pekerja layanan saat ini selalu mengontrol klien selama pemuatan ulang.

Untuk mendapatkan update, tutup atau arahkan semua tab dengan menggunakan pekerja layanan saat ini. Maka, jika Anda [mengarahkan ke demo lagi](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/index-v2.html){: .external }, Anda akan melihat gambar kuda.

Pola ini serupa dengan cara update Chrome. Update pada hasil download Chrome dilatar belakang, namun tidak diterapkan hingga Chrome dimulai ulang. Pada saat ini, Anda bisa tetap menggunakan versi saat ini tanpa kendala. Akan tetapi, hal ini menjengkelkan selama pengembangan, namun DevTools memiliki cara untuk membuatnya lebih mudah, yang akan saya bahas [nanti dalam artikel ini](#devtools).

### Aktifkan

Ini akan aktif setelah pekerja layanan yang lama hilang, dan pekerja layanan baru dapat mengontrol klien. Inilah waktu yang ideal untuk melakukan hal-hal yang tidak bisa Anda lakukan saat pekerja layanan lama sedang digunakan, misalnya melakukan migrasi database dan mengosongkan cache.

Dalam demo di atas, saya memelihara daftar cache yang saya harapkan akan ada, dan dalam peristiwa `activate` saya menghilangkan yang lainnya, yang akan membuang cache `static-v1` lama.

Perhatian: Anda tidak boleh mengupdate dari versi sebelumnya. Pekerja layanan mungkin memiliki banyak versi lama.

Jika Anda meneruskan promise ke `event.waitUntil()` akan menjadi buffering peristiwa fungsional (`fetch`, `push`, `sync` dll.) hingga promise teratasi. Jadi, jika peristiwa `fetch` Anda dipicu, aktivasi akan selesai sepenuhnya.

Perhatian: Cache Storage API adalah "penyimpanan asal" (seperti localStorage, dan IndexedDB). Jika Anda menjalankan banyak situs pada asal yang sama (misalnya, `yourname.github.io/myapp`), berhati-hatilah agar Anda tidak menghapus cache untuk situs Anda yang lainnya. Untuk menghindarinya, berikan awalan yang unik pada nama cache Anda pada situs saat ini, misalnya `myapp-static-v1`, dan jangan sentuh cache kecuali jika memulai dengan `myapp-`.

### Lewati tahap menunggu

Tahap menunggu berarti Anda hanya menjalankan satu versi situs saat itu, namun jika tidak membutuhkan fitur itu, Anda bisa mengaktifkan pekerja layanan baru lebih dini dengan memanggil `self.skipWaiting()`.

Ini menyebabkan pekerja layanan Anda menyingkirkan pekerja layanan yang saat ini aktif dan mengaktifkannya sendiri begitu memasuki tahap menunggu (atau segera jika sudah dalam tahap menunggu). Ini *tidak* menyebabkan pekerja layanan Anda melewati penginstalan, hanya sedang menunggu.

Hal ini tidak begitu penting jika Anda memanggil `skipWaiting()`, asalkan pemanggilan dilakukan selama menunggu atau sebelum menunggu. Sudah cukup umum memanggilnya dalam peristiwa `install`:

    self.addEventListener('install', event => {
      self.skipWaiting();

      event.waitUntil(
        // caching etc
      );
    });

Namun, Anda mungkin perlu memanggilnya sebagai hasil `postMessage()` ke pekerja layanan. Anda mungkin perlu interaksi pengguna berikut `skipWaiting()`.

[Inilah demo yang menggunakan `skipWaiting()`](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/index-v3.html){: .external }. Anda seharusnya akan melihat gambar sapi tanpa harus mengarahkan navigasi ke lain. Seperti `clients.claim()` menjadi sebuah pertandingan, jadi Anda hanya akan melihat sapi jika pekerja layanan baru mengambil, menginstal, dan mengaktifkan sebelum halaman berusaha memuat gambar.

Perhatian: `skipWaiting()` berarti pekerja layanan baru Anda mungkin saja mengontrol halaman yang telah dimuat bersama versi lama. Ini berarti sebagian pengambilan halaman akan ditangani oleh pekerja layanan yang lama, namun pekerja layanan baru akan menangani pengambilan selanjutnya. Jika ini akan merusak hal lain, jangan gunakan `skipWaiting()`.

### Update manual

Sebagaimana disebutkan sebelumnya, browser akan memeriksa update secara otomatis setelah peristiwa fungsional dan navigasi, namun Anda juga bisa memicunya secara manual:

    navigator.serviceWorker.register('/sw.js').then(reg => {
      // sometime later…
      reg.update();
    });

Jika Anda memperkirakan pengguna akan menggunakan situs dalam waktu lama tanpa memuat ulang, Anda mungkin perlu memanggil `update()` dengan interval (misalnya setiap jam).

### Hindari mengubah URL skrip pekerja layanan

Jika Anda telah membaca [postingan saya tentang praktik terbaik dalam cache](https://jakearchibald.com/2016/caching-best-practices/){: .external }, Anda dapat mempertimbangkan untuk memberikan setiap versi URL unik pekerja layanan Anda. **Jangan lakukan ini!** Ini biasanya praktik buruk bagi pekerja layanan, cukup update script di lokasi saat ini.

Ini akan menghadapkan Anda pada masalah seperti ini:

1. `index.html` mendaftarkan `sw-v1.js` sebagai pekerja layanan.
1. `sw-v1.js` men-cache and menayangkan `index.html` sehingga itu bekerja offline terlebih dahulu.
1. Anda mengupdate `index.html` sehingga itu mendaftarkan `sw-v2.js` baru dan mengkilap Anda.

Jika Anda melakukan hal di atas, pengguna tidak akan mendapatkan `sw-v2.js`, karena `sw-v1.js` menyajikan versi lama `index.html` dari cache-nya. Anda menempatkan diri pada posisi di mana Anda perlu mengupdate pekerja layanan agar dapat mengupdatenya. Ew.

Akan tetapi, untuk [demo di atas](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/index-v2.html){: .external }, saya *telah* mengubah URL pekerja layanan. Oleh karena itu, demi demo ini, Anda bisa beralih antar versi. Ini bukan sesuatu yang akan saya lakukan di produksi.

## Memudahkan pengembangan {: #devtools}

Daur hidup pekerja layanan dibuat dengan mempertimbangkan pengguna, namun selama pengembangan ini agak menjengkelkan. Syukurlah ada beberapa fitur untuk membantu:

### Update saat memuat ulang

Ini adalah favorit saya.

<figure>
  <img src="images/update-on-reload.png" class="browser-screenshot" alt="DevTools menampilkan 'update pada pemuatan ulang'"/>
</figure>

Ini mengubah daur hidup menjadi mudah digunakan developer. Setiap navigasi akan:

1. Mengambil ulang pekerja layanan.
1. Menginstalnya sebagai versi baru meskipun itu byte-identik, artinya peristiwa `install` Anda berjalan dan cache Anda diupdate.
1. Melewati fase menunggu sehingga pekerja layanan baru diaktifkan.
1. Menavigasikan halaman. Ini berarti Anda akan mendapatkan update pada setiap navigasi (termasuk pemuatan ulang) tanpa harus memuat ulang atau menutup tab.

### Lewati proses menunggu

<figure>
  <img src="images/skip-waiting.png" class="browser-screenshot" alt="DevTools menampilkan 'lewati proses menunggu'"/>
</figure>

Jika Anda memiliki pekerja layanan yang sedang menunggu, Anda bisa memilih "lewati proses menunggu" di DevTools untuk segera mengembangkannya menjadi "aktif".

### Ganti muat ulang

Jika Anda memaksa muat ulang halaman (ganti muat ulang) ini akan melewati pekerja layanan sama sekali. Ini tidak akan dikontrol. Fitur ini ada dalam spesifikasi, sehingga akan berfungsi di browser lain yang mendukung pekerja layanan.

## Menangani update

Pekerja layanan didesain sebagai bagian dari [web yang dapat diperluas](https://extensiblewebmanifesto.org/){: .external }. Gagasannya adalah karena kita, sebagai developer browser, mengakui bahwa kita tidak lebih baik dalam hal pengembangan web dibandingkan developer web. Dan dengan demikian, kita seharusnya tidak menyediakan API tingkat tinggi sempit yang mengatasi masalah tertentu dengan menggunakan pola yang *kita* sukai, dan sebagai gantinya memberi Anda akses ke pusat browser dan memungkinkan Anda melakukannya sesuka hati, dengan cara yang terbaik bagi para pengguna *Anda*.

Jadi, untuk memungkinkan banyak pola sebisa mungkin, daur update keseluruhan dapat diamati:

    navigator.serviceWorker.register('/sw.js').then(reg => {
      reg.installing; // the installing worker, or undefined
      reg.waiting; // the waiting worker, or undefined
      reg.active; // the active worker, or undefined

      reg.addEventListener('updatefound', () => {
        // A wild service worker has appeared in reg.installing!
        const newWorker = reg.installing;

        newWorker.state;
        // "installing" - the install event has fired, but not yet complete
        // "installed"  - install complete
        // "activating" - the activate event has fired, but not yet complete
        // "activated"  - fully active
        // "redundant"  - discarded. Either failed install, or it's been
        //                replaced by a newer version

        newWorker.addEventListener('statechange', () => {
          // newWorker.state has changed
        });
      });
    });

    navigator.serviceWorker.addEventListener('controllerchange', () => {
      // This fires when the service worker controlling this page
      // changes, eg a new worker has skipped waiting and become
      // the new active worker.
    });

## Anda berhasil!

Fiuh! Ada banyak sekali teori teknis. Tetap ikuti dalam beberapa minggu ke depan karena kita akan mendalami beberapa penerapan praktis dari hal tersebut di atas.

## Masukan {: #feedback }

{% include "web/_shared/helpful.html" %}
