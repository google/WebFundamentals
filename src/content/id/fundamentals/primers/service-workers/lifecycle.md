project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Sebuah pendalaman mengenai daur hidup service worker.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-09-29 #}

# Daur Hidup Service Worker {: .page-title }

{% include "web/_shared/contributors/jakearchibald.html" %}

Daur hidup service worker adalah bagiannya yang paling rumit. Jika Anda tidak
tahu apa yang berusaha dilakukan dan apa manfaatnya, maka hal ini bisa terasa
berat bagi Anda. Namun setelah Anda mengetahui cara kerjanya, Anda bisa menghasilkan pembaruan
yang mulus dan tidak kentara pada pengguna, dengan memadukan yang aspek terbaik dari web dan pola asli.

Ini merupakan pendalaman, namun poin-poin di awal setiap bagian membahas hampir semua
hal yang perlu Anda ketahui.

## Maksud

Maksud dari daur hidup adalah untuk:

* Memungkinkan offline-terlebih dahulu.
* Biarkan service worker baru menyiapkan diri sendiri tanpa mengganggu apa yang
  ada.
* Memastikan laman dalam-cakupan dikontrol oleh service worker yang sama (atau tanpa
  service worker) seluruhnya.
* Memastikan hanya ada satu versi untuk situs Anda yang dijalankan pada satu waktu.

Hal terakhir itu sangat penting. Tanpa service worker, pengguna bisa memuat satu
tab ke situs Anda, kemudian membuka tab lain nanti. Hal ini bisa mengakibatkan dua versi
situs Anda dijalankan pada waktu yang sama. Kadang-kadang hal ini boleh saja, namun jika Anda sedang berurusan
dengan storage, Anda bisa dengan mudah mengakibatkan dua tab memiliki opini sangat berbeda
mengenai cara keduanya menangani penyimpanan bersama. Hal ini bisa mengakibatkan kesalahan, atau
lebih buruk lagi, kehilangan data.

Perhatian: Pengguna tidak suka kehilangan data. Hal itu akan menyebabkan mereka sangat bersedih.

## Service worker pertama

Singkatnya:

* Kejadian `install` adalah kejadian pertama yang diambil service worker, dan ini hanya terjadi
  sekali.
* Sebuah promise diteruskan ke `installEvent.waitUntil()` yang akan menunjukkan durasi serta
  keberhasilan atau kegagalan pemasangan.
* Service worker tidak akan menerima kejadian seperti `fetch` dan `push` sebelum ia
  berhasil menyelesaikan pemasangan dan menjadi "aktif".
* Secara default, pengambilan oleh laman tidak akan melalui service worker kecuali jika permintaan
  laman itu sendiri melalui service worker. Jadi Anda nanti perlu menyegarkan
  laman untuk melihat efek service worker.
* `clients.claim()` bisa menggantikan default ini, dan mengambil kontrol atas
  laman yang tidak dikontrol.

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
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TweenLite.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TimelineLite.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/plugins/CSSPlugin.min.js" defer></script>
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
      <text y="6.7" x="14.5" class="label">Memasang</text><text y="6.7" x="81.1" class="label">Aktif</text><circle r="14" cy="25.8" cx="14.5" class="state-placeholder"/><circle r="14" cy="25.8" cx="47.8" class="state-placeholder"/><circle r="14" cy="25.8" cx="81.2" class="state-placeholder"/>
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

Ini mendaftarkan sebuah service worker, dan menambahkan gambar anjing setelah 3 detik.

Inilah service worker tersebut, `sw.js`:

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

Ia menyimpan cache gambar kucing di cache, dan menyajikannya bila ada permintaan untuk
`/dog.svg`. Akan tetapi, jika Anda [menjalankan
contoh di atas](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/){:
.external}, Anda akan melihat anjing saat pertama memuat laman. Klik segarkan, dan
Anda akan melihat gambar kucing tersebut.

Note: Kucing adalah lebih baik daripada anjing. Keduanya cuma *adalah*.

### Cakupan dan kontrol

Cakupan default pendaftaran service worker `./` relatif terhadap
URL skrip. Berarti, jika Anda mendaftarkan service worker di
`//example.com/foo/bar.js`, ini akan memiliki cakupan default `//example.com/foo/`.

Kita memanggil laman, service worker, dan service worker bersama berupa `clients`. Service worker hanya
bisa mengontrol klien yang berada dalam cakupan. Setelah klien "dikontrol", pengambilannya
akan melalui service worker dalam-cakupan. Anda bisa mendeteksi jika klien
dikontrol lewat `navigator.serviceWorker.controller` yang akan berupa nol atau instance
service worker.

### Unduh, parse, dan eksekusi

Service worker pertama Anda akan diunduh bila Anda memanggil `.register()`. Jika skrip
Anda gagal mengunduh, mem-parse, atau melontarkan kesalahan dalam eksekusi pertamanya,
promise register akan menolak, dan service worker akan dibuang.

Chrome DevTools menampilkan kesalahan di konsol, dan di bagian service worker
pada tab aplikasi:

<figure>
  <img src="images/register-fail.png" class="browser-screenshot" alt="Kesalahan yang ditampilkan di tab DevTools pada service worker">
</figure>

### Memasang

Kejadian pertama yang diambil service worker adalah `install`. Ini akan dipicu begitu
service worker dieksekusi, dan hanya dipanggil sekali per service worker. Jika
Anda mengubah skrip service worker, browser akan menganggapnya sebagai
service worker berbeda, dan akan mendapatkan kejadian `install` sendiri. Saya akan membahas [pembaruan secara detail
nanti](#updates).

Kejadian `install` adalah kesempatan Anda untuk meng-cache segala sesuatu yang Anda butuhkan sebelum dapat
mengontrol klien. Promise yang Anda teruskan ke `event.waitUntil()` memungkinkan browser
mengetahui kapan Anda selesai memasang, dan apakah pemasangan itu berhasil.

Jika promise Anda ditolak, ini menandakan pemasangan gagal, dan browser membuang
service worker. Ia tidak akan pernah mengontrol klien. Ini berarti kita bisa mengandalkan
"cat.svg" yang ada di cache dalam kejadian `fetch` kita. Ini adalah dependensi.

### Mengaktifkan

Setelah service worker Anda siap mengontrol klien dan menangani kejadian
fungsional seperti `push` dan `sync`, Anda akan mendapatkan kejadian `activate`. Namun itu tidak
berarti laman yang disebut `.register()` akan dikontrol.

Saat pertama Anda memuat
[demo](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/){:
.external}, walaupun `dog.svg` diminta lama setelah service worker
diaktifkan, ia tidak menangani permintaan tersebut, dan Anda tetap melihat gambar
anjing. Default-nya adalah *konsistensi*, jika laman dimuat tanpa service worker,
tidak ada yang akan menjadi sub-sumber dayanya. Jika Anda memuat
[demo](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/){:
.external} untuk kedua kali (dengan kata lain menyegarkan laman), ia akan dikontrol.
Baik laman maupun gambar akan melalui kejadian `fetch`, dan Anda akan melihat gambar kucing
sebagai gantinya.

### clients.claim

Anda bisa mengontrol klien yang tidak dikontrol dengan memanggil `clients.claim()` dalam
service worker setelah ia diaktifkan.

Inilah [variasi demo
di atas](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/df4cae41fa658c4ec1fa7b0d2de05f8ba6d43c94/){:
.external} yang memanggil `clients.claim()` dalam kejadian `activate`-nya. Anda *seharusnya* akan melihat
gambar kucing untuk pertama kali. Saya katakan "seharusnya", karena ini adalah sesuatu yang peka terhadap waktu. Anda hanya akan
melihat kucing jika service worker diaktifkan dan `clients.claim()` berlaku
sebelum gambar berusaha dimuat.

Jika Anda menggunakan service worker untuk memuat laman secara berbeda dengan laman yang dimuat lewat
jaringan, `clients.claim()` nanti bisa menyulitkan, karena service worker Anda akan mengakhiri
kontrol atas beberapa klien yang telah dimuat tanpa service worker.

Note: Saya memandang banyak orang termasuk `clients.claim()` sebagai boilerplate, namun saya
jarang melakukannya sendiri. Ini hanya benar-benar penting pada saat pemuatan pertama, dan karena
ada penyempurnaan progresif, laman biasanya bekerja dengan baik tanpa service
worker sekalipun.

## Memperbarui service worker {: #updates}

Singkatnya:

* Pembaruan dipicu:
    * Pada navigasi ke laman dalam-cakupan.
    * Pada kejadian fungsional seperti `push` dan `sync`, kecuali jika ada
      pemeriksaan pembaruan dalam 24 jam sebelumnya.
    * Pada pemanggilan `.register()` *hanya jika* URL service worker telah berubah.
* Header caching pada skrip service worker dipatuhi (hingga 24
  jam) saat mengambil pembaruan. Kita akan membuat perilaku penyertaan ini, karen ia
  akan menemukan orang. Anda barangkali ingin `max-age` berupa 0 pada skrip
  service worker.
* Service worker Anda dianggap diperbarui jika berbeda sedikit saja dengan service worker
  yang sudah dimiliki browser. (Kita memperluasnya untuk menyertakan juga
  skrip/modul yang telah diimpor.)
* Service worker yang telah diperbarui diluncurkan bersama yang sudah ada, dan mendapatkan
  kejadian `install`-nya sendiri.
* Jika service worker baru Anda memiliki kode status bukan OK (misalnya, 404), gagal mem-parse, melontarkan
  kesalahan selama eksekusi, atau ditolak selama pemasangan, service worker baru akan dibuang,
  namun yang ada saat ini akan tetap aktif.
* Setelah berhasil dipasang, service worker yang telah diperbarui akan `wait` hingga service
  worker yang ada mengontrol nol klien. (Perhatikan, klien akan tumpang tindih selama
  penyegaran.)
* `self.skipWaiting()` mencegah waiting, yang berarti service worker
  akan diaktifkan begitu selesai dipasang.

<div class="framebox-container-container">
<div class="framebox-container">
{% framebox height="100%" %}
<link href="https://fonts.googleapis.com/css?family=Just+Another+Hand" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TweenLite.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TimelineLite.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/plugins/CSSPlugin.min.js" defer></script>
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
      <text y="6.7" x="14.5" class="label">Memasang</text><text y="6.7" x="81.1" class="label">Aktif</text><circle r="14" cy="25.8" cx="14.5" class="state-placeholder"/><circle r="14" cy="25.8" cx="47.8" class="state-placeholder"/><circle r="14" cy="25.8" cx="81.2" class="state-placeholder"/>
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

Anggaplah kita mengubah skrip service worker untuk merespons dengan gambar
kuda, bukan kucing:

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

Note: Saya tidak memiliki opini yang kuat soal kuda.

[Lihat demo
di atas](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/index-v2.html){:
.external}. Anda seharusnya tetap melihat gambar kucing. Inilah sebabnya...

### Memasang

Perhatikan, saya telah mengubah nama cache dari `static-v1` menjadi `static-v2`. Ini
berarti saya bisa menyiapkan cache baru tanpa menimpa apa yang ada di cache saat ini,
yang masih digunakan oleh service worker lama.

Pola ini akan membuat cache versi spesifik, semacam aset yang akan dibundel
oleh aplikasi asli bersama file yang dapat dieksekusi. Anda mungkin juga memiliki cache yang bukan versi
spesifik, misalnya `avatars`.

### Menunggu

Setelah berhasil memasangnya, service worker yang telah diperbarui akan menunda aktivasi
hingga service worker yang ada tidak lagi mengontrol klien. Keadaan ini
disebut "menunggu", dan inilah cara browser memastikan bahwa hanya ada satu versi
service worker yang berjalan untuk satu waktu.

Jika Anda menjalankan [demo
yang telah diperbarui](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/index-v2.html){:
.external}, Anda seharusnya tetap melihat gambar kucing, karena service worker V2
belum diaktifkan. Anda bisa melihat service worker baru menunggu di tab
"Application" pada DevTools:

<figure>
  <img src="images/waiting.png" class="browser-screenshot" alt="DevTools menampilkan service worker baru yang sedang menunggu">
</figure>

Bahkan jika Anda hanya memiliki satu tab dibuka ke demo, penyegaran laman tidak cukup
untuk memungkinkan versi baru mengambil alih. Hal ini dikarenakan cara kerja navigasi browser.
Bila Anda mengarahkan, laman saat ini tidak akan hilang hingga header respons
diterima, dan bahkan laman saat ini mungkin tetap dibuka jika respons
memiliki header `Content-Disposition`. Karena tumpang tindih ini, service worker saat ini
selalu mengontrol klien selama penyegaran.

Untuk mendapatkan pembaruan, tutup atau arahkan meninggalkan semua tab dengan menggunakan service
worker saat ini. Maka, bila Anda [mengarahkan ke demo
lagi](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/index-v2.html){:
.external}, Anda akan melihat gambar kuda.

Pola ini serupa dengan cara pembaruan Chrome. Pembaruan pada unduhan Chrome di
latar belakang, namun tidak diterapkan hingga Chrome dimulai ulang. Pada saat ini, Anda bisa
tetap menggunakan versi saat ini tanpa kendala. Akan tetapi, hal ini menjengkelkan
selama development, namun DevTools memiliki cara untuk membuatnya lebih mudah, yang akan saya bahas
[nanti dalam artikel ini](#devtools).

### Mengaktifkan

Ini akan aktif setelah service worker lama hilang, dan service worker baru
dapat mengontrol klien. Inilah saat yang ideal untuk melakukan hal-hal yang tidak bisa Anda lakukan
saat service worker lama sedang digunakan, misalnya melakukan migrasi database dan mengosongkan
cache.

Dalam demo di atas, saya memelihara daftar cache yang saya harapkan akan ada, dan dalam
kejadian `activate` saya menghilangkan yang lainnya, yang akan membuang cache
`static-v1` lama.

Perhatian: Anda tidak boleh memperbarui dari versi sebelumnya. Service worker mungkin memiliki banyak versi lama.

Jika Anda meneruskan promise ke `event.waitUntil()` akan menjadi penyangga kejadian fungsional
(`fetch`, `push`, `sync` dll.) hingga promise teratasi. Jadi bila kejadian `fetch`
Anda dipicu, aktivasi akan selesai sepenuhnya.

Perhatian: Cache Storage API adalah "storage asal" (seperti localStorage, dan
IndexedDB). Jika Anda menjalankan banyak situs pada asal yang sama (misalnya,
`yourname.github.io/myapp`), berhati-hatilah agar Anda tidak menghapus cache untuk
situs Anda yang lainnya. Untuk menghindarinya, berikan awalan yang unik pada nama cache Anda pada situs saat ini,
misalnya `myapp-static-v1`, dan jangan sentuh cache kecuali jika memulai dengan `myapp-`.

### Lewati tahap menunggu

Tahap menunggu berarti Anda hanya menjalankan satu versi situs saat itu,
namun jika Anda tidak membutuhkan fitur itu, Anda bisa mengaktifkan service worker
baru lebih dini dengan memanggil `self.skipWaiting()`.

Ini menyebabkan service worker Anda menyingkirkan service worker yang saat ini aktif dan mengaktifkannya
sendiri begitu memasuki tahap menunggu (atau segera jika sudah dalam
tahap menunggu). Ini *tidak* menyebabkan service worker Anda melewati pemasangan, cuma menunggu.

Hal ini tidak begitu penting bila Anda memanggil `skipWaiting()`, asalkan hal itu selama menunggu atau
sebelum menunggu. Sudah umum memanggilnya dalam kejadian `install`:

    self.addEventListener('install', event => {
      self.skipWaiting();

      event.waitUntil(
        // caching etc
      );
    });

Namun Anda mungkin perlu memanggilnya sebagai hasil `postMessage()` ke service
worker. Anda mungkin perlu `skipWaiting()` interaksi pengguna berikut.

[Inilah demo yang menggunakan
`skipWaiting()`](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/index-v3.html){:
.external}. Anda seharusnya akan melihat gambar sapi tanpa harus mengarahkan navigasi ke lain.
Seperti `clients.claim()` ini menjadi balapan, jadi Anda hanya akan melihat sapi jika service
worker baru mengambil, memasang, dan mengaktifkan sebelum laman berusaha memuat gambar.

Perhatian: `skipWaiting()` berarti service worker baru Anda mungkin saja mengontrol
laman yang telah dimuat bersama versi lama. Ini berarti sebagian pengambilan laman Anda
akan ditangani oleh service worker Anda yang lama, namun service
worker baru akan menangani pengambilan selanjutnya. Jika hal itu akan merusak suatu hal, jangan
gunakan `skipWaiting()`.

### Pembaruan manual

Sebagaimana disebutkan sebelumnya, browser akan memeriksa pembaruan secara otomatis setelah kejadian fungsional
dan navigasi, namun Anda juga bisa memicunya secara manual:

    navigator.serviceWorker.register('/sw.js').then(reg => {
      // sometime later…
      reg.update();
    });

Jika Anda memperkirakan pengguna akan menggunakan situs dalam waktu lama tanpa memuat ulang,
Anda mungkin perlu memanggil `update()` dengan interval (misalnya setiap jam).

### Hindari mengubah URL skrip service worker Anda

Jika Anda telah membaca [entri blog saya mengenai praktik terbaik
melakukan cache](https://jakearchibald.com/2016/caching-best-practices/){: .external},
Anda mungkin mempertimbangkan memberikan URL unii ke setiap versi service worker.
**Jangan lakukan ini!** Ini biasanya adalah kebiasaan buruk untuk service worker, cukup perbarui
skrip di lokasi saat ini.

Ini akan menghadapkan Anda pada masalah seperti ini:

1. `index.html` mendaftarkan `sw-v1.js` sebagai service worker.
1. `sw-v1.js` menyimpan ke cache dan menyajikan `index.html` sehingga ia bekerja offline terlebih dahulu.
1. Anda memperbarui `index.html` sehingga ia mendaftarkan `sw-v2.js` Anda yang baru dan cemerlang.

Jika Anda melakukan hal di atas, pengguna tidak akan mendapatkan `sw-v2.js`, karena `sw-v1.js` menyajikan
versi lama `index.html` dari cache-nya. Anda menempatkan diri pada posisi
di mana Anda perlu memperbarui service worker agar dapat memperbarui
service worker. Ew.

Akan tetapi, untuk [demo
di atas](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/index-v2.html){:
.external}, saya *telah* mengubah URL service worker. Begitulah, demi
demo, Anda bisa beralih antar versi. Ini bukan sesuatu yang akan saya
lakukan di produksi.

## Mamudahkan development {: #devtools}

Daur hidup service worker dibuat dengan mempertimbangkan pengguna, namun selama
development ini agak menyakitkan. Syukurlah ada beberapa alat untuk membantu:

### Perbarui saat muat ulang

Inilah favorit saya.

<figure>
  <img src="images/update-on-reload.png" class="browser-screenshot" alt="DevTools menampilkan 'update on reload'">
</figure>

Ini mengubah daur hidup menjadi ramah-developer. Setiap navigasi akan:

1. Ambil ulang service worker.
1. Pasang sebagai versi baru sekalipun secara byte identik, maksudnya kejadian `install`
   Anda akan dijalankan dan cache diperbarui.
1. Lewati tahap menunggu sehingga service worker baru diaktifkan.
1. Arahkan ke laman.

Ini berarti Anda akan mendapatkan pembaruan pada setiap navigasi (termasuk penyegaran)
tanpa harus memuat ulang atau menutup tab.

### Lewati menunggu

<figure>
  <img src="images/skip-waiting.png" class="browser-screenshot" alt="DevTools menampilkan 'skip waiting'">
</figure>

Jika Anda memiliki service worker yang sedang menunggu, Anda bisa memilih "skip waiting" di DevTools untuk
segera mempromosikannya ke "active".

### Muat ulang geser

Jika Anda memaksa muat ulang laman (muat ulang geser) ini akan melangkahi service worker
sama sekali. Ini tidak akan dikontrol. Fitur ini ada dalam spesifikasi, sehingga akan berfungsi di
browser lain yang mendukung service worker.

## Menangani pembaruan

Service worker didesain sebagai bagian dari [web
yang dapat diperluas](https://extensiblewebmanifesto.org/){: .external }. Gagasannya adalah karena kita, sebagai
developer browser, mengakui bahwa kita tidak lebih baik dalam hal development web dibandingkan
developer web. Dan dengan demikian, kita seharusnya tidak menyediakan API tingkat tinggi yang sempit
yang mengatasi masalah tertentu dengan menggunakan pola yang *kita* sukai, dan sebagai gantinya memberi Anda akses
ke isi perut browser dan memungkinkan Anda melakukannya sesuka hati, dengan cara yang paling
baik bagi para pengguna *Anda*.

Jadi, untuk memungkinkan banyak pola sebisa kita, daur pembaruan keseluruhan dapat diamati:

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
      // changes, eg a new worker has as skipped waiting and become
      // the new active worker. 
    });

## Anda telah lolos!

Fiuh! Itu adalah teori teknis yang banyak. Tetap ikuti dalam beberapa minggu ke depan karena
kita akan mendalami beberapa aplikasi praktis dari hal tersebut di atas.


{# wf_devsite_translation #}
