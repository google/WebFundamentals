project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Anda bisa menganimasikan dengan CSS atau JavaScript. Mana yang harus Anda gunakan, dan mengapa?

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2014-08-08 #}

# Animasi CSS Versus JavaScript {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}
{% include "web/_shared/contributors/samthorogood.html" %}

Ada dua cara utama untuk membuat animasi di web: dengan CSS dan dengan JavaScript. Mana yang Anda pilih sangat tergantung pada dependensi lain dari proyek, dan jenis efek yang ingin coba dicapai.

### TL;DR {: .hide-from-toc }
* Gunakan animasi CSS untuk transisi "satu-kali" yang lebih sederhana, seperti mengubah status elemen UI.
* Gunakan animasi JavaScript ketika Anda ingin menggunakan efek lanjutan seperti memantul, berhenti, jeda, memutar mundur atau memperlambat.
* Jika Anda memilih untuk membuat animasi dengan JavaScript, gunakan Web Animations API atau kerangka kerja modern yang sesuai bagi Anda.


Kebanyakan animasi dasar bisa dibuat dengan CSS atau JavaScript, namun besaran tenaga dan waktu bisa berbeda (lihat juga [Kinerja CSS vs JavaScript](animations-and-performance#css-vs-javascript-performance)). Masing-masing memiliki kelebihan dan kekurangan, tetapi ini bisa dijadikan panduan yang bagus:

* **Gunakan CSS ketika Anda memiliki status mandiri yang lebih kecil untuk elemen UI.** Transisi dan animasi CSS ideal untuk menampilkan menu navigasi dari samping, atau menampilkan keterangan alat. Anda mungkin akhirnya menggunakan JavaScript untuk mengontrol status, namun animasinya akan ada di CSS.
* **Gunakan JavaScript ketika Anda membutuhkan kontrol yang signifikan atas animasi Anda.** Web Animations API adalah pendekatan berbasis standar, saat ini tersedia di Chrome dan Opera. Ini memberikan objek nyata, ideal untuk aplikasi berorientasi objek yang kompleks. JavaScript juga berguna ketika Anda perlu berhenti, jeda, melambat atau membalikkan.
* **Gunakan `requestAnimationFrame` secara langsung ketika Anda ingin mengatur seluruh kejadian dengan tangan.** Ini adalah pendekatan JavaScript lanjutan, namun bisa bermanfaat jika Anda membangun sebuah game atau menggambar pada kanvas HTML.

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="WaNoqBAp8NI"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Atau, jika Anda sudah menggunakan kerangka kerja JavaScript yang dilengkapi fungsionalitas animasi, seperti melalui metode jQuery [`.animate()`](https://api.jquery.com/animate/){: .external } atau [GreenSock TweenMax](https://github.com/greensock/GreenSock-JS/tree/master/src/minified), maka Anda mungkin merasa lebih nyaman dengan tetap menggunakannya untuk animasi Anda.

<div class="clearfix"></div>

## Menganimasikan dengan CSS

Menganimasikan dengan CSS adalah cara paling sederhana untuk menggerakkan sesuatu di layar. Pendekatan ini digambarkan sebagai *deklaratif*, karena Anda menentukan apa yang akan terjadi.

Di bawah ini adalah beberapa CSS yang memindahkan elemen 100 px pada sumbu X dan Y. Hal ini dilakukan dengan menggunakan transisi CSS yang disetel 500 md. Ketika kelas `move` ditambahkan, nilai `transform` berubah dan transisi dimulai.


    .box {
      -webkit-transform: translate(0, 0);
      -webkit-transition: -webkit-transform 500ms;
    
      transform: translate(0, 0);
      transition: transform 500ms;
    }
    
    .box.move {
      -webkit-transform: translate(100px, 100px);
      transform: translate(100px, 100px);
    }
    
[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-simple.html){: target="_blank" .external }

Selain durasi transisi, ada beberapa pilihan untuk *easing*, yaitu bagaimana animasi terasa. Untuk informasi selengkapnya tentang easing, lihat panduan [Dasar-Dasar Easing](the-basics-of-easing).

Jika, seperti dalam cuplikan di atas, Anda membuat kelas CSS yang terpisah untuk mengelola animasi, maka Anda bisa menggunakan JavaScript untuk menghidupkan dan mematikan setiap animasi:


    box.classList.add('move');
    

Melakukan hal ini memberikan keseimbangan yang baik bagi aplikasi Anda. Anda bisa fokus dalam mengelola status dengan JavaScript, dan hanya menyetel kelas yang sesuai pada elemen sasaran, mempercayakan browser untuk menangani animasi. Jika menggunakan cara ini, Anda bisa mendengarkan kejadian `transitionend` pada elemen, namun hanya jika Anda mampu melepaskan dukungan pada versi Internet Explorer lama; versi 10 adalah versi pertama yang mendukung kejadian ini. Semua browser lain telah lama mendukung kejadian ini.

JavaScript yang diperlukan untuk mendengarkan akhir transisi terlihat seperti ini:


    var box = document.querySelector('.box');
    box.addEventListener('transitionend', onTransitionEnd, false);
    
    function onTransitionEnd() {
      // Handle the transition finishing.
    }
    

Selain menggunakan transisi CSS, Anda juga bisa menggunakan animasi CSS, yang memberikan Anda kontrol lebih banyak terhadap keyframe, durasi dan iterasi animasi individu.

Note: Jika Anda baru dalam dunia animasi, keyframe adalah istilah lama dari animasi yang digambar tangan. Animator akan membuat bingkai khusus untuk bagian dari tindakan, disebut bingkai kunci, yang akan merekam beberapa hal seperti bagian paling ekstrem dari beberapa gerakan, dan kemudian mereka akan menggambar semua bingkai secara tersendiri di antara keyframe. Kita menjalankan proses yang sama saat ini dengan animasi CSS, kita menginstruksikan browser tentang nilai yang harus dimiliki properti CSS pada titik tertentu, dan keyframe mengisi celahnya.

Misalnya, Anda bisa menganimasikan kotak dengan cara yang sama seperti transisi, namun menganimasikannya tanpa interaksi pengguna seperti klik, dan dengan pengulangan tak terbatas. Anda juga bisa mengubah beberapa properti sekaligus:


    /**
     * This is a simplified version without
     * vendor prefixes. With them included
     * (which you will need), things get far
     * more verbose!
     */
    .box {
      /* Choose the animation */
      animation-name: movingBox;
    
      /* The animation’s duration */
      animation-duration: 1300ms;
    
      /* The number of times we want
          the animation to run */
      animation-iteration-count: infinite;
    
      /* Causes the animation to reverse
          on every odd iteration */
      animation-direction: alternate;
    }
    
    @keyframes movingBox {
      0% {
        transform: translate(0, 0);
        opacity: 0.3;
      }
    
      25% {
        opacity: 0.9;
      }
    
      50% {
        transform: translate(100px, 100px);
        opacity: 0.2;
      }
    
      100% {
        transform: translate(30px, 30px);
        opacity: 0.8;
      }
    }
    

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-keyframes.html){: target="_blank" .external }

Dengan animasi CSS, Anda menentukan animasi secara independen dari elemen target, dan menggunakan properti nama animasi untuk memilih animasi yang diperlukan.

Animasi CSS tetap diberi awalan oleh vendor, dengan awalan `-webkit-` yang digunakan di Safari, Safari Mobile, dan Android. Chrome, Opera, Internet Explorer dan Firefox semua diluncurkan tanpa awalan. Banyak alat yang bisa membantu Anda membuat versi awalan dari CSS yang Anda butuhkan, sehingga Anda bisa menulis versi tanpa awalan dalam file sumber Anda.

## Menganimasikan dengan JavaScript dan Web Animations API

Membuat animasi dengan JavaScript, jika dibandingkan, lebih kompleks daripada menulis transisi atau animasi CSS, tapi memberikan lebih banyak kendali kepada developer. Anda bisa menggunakan [Web Animations API](https://w3c.github.io/web-animations/) untuk menganimasikan properti CSS tertentu atau membangun efek objek yang bisa disusun.

Animasi JavaScript *sangat penting*, ketika Anda menulisnya secara inline sebagai bagian dari kode Anda. Anda juga bisa membungkusnya dalam objek lain. Berikut adalah JavaScript yang harus Anda tulis untuk membuat ulang transisi CSS yang sudah dijelaskan sebelumnya:


    var target = document.querySelector('.box');
    var player = target.animate([
      {transform: 'translate(0)'},
      {transform: 'translate(100px, 100px)'}
    ], 500);
    player.addEventListener('finish', function() {
      target.style.transform = 'translate(100px, 100px)';
    });
    

Secara default, Web Animasi hanya memodifikasi presentasi dari elemen. Jika Anda ingin agar objek tetap berada di lokasi pindahnya, maka Anda harus mengubah gaya dasarnya ketika animasi selesai, seperti contoh kami.

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-wa.html){: target="_blank" .external }

Web Animations API adalah standar baru dari W3C. Didukung secara native di Chrome dan Opera, dan dalam [proses development aktif untuk Firefox](https://birtles.github.io/areweanimatedyet/){: .external }. Untuk browser modern lainnya, [tersedia polyfill](https://github.com/web-animations/web-animations-js).

Dengan animasi JavaScript, Anda memiliki kontrol penuh dari gaya elemen ini dalam setiap langkahnya. Ini berarti Anda bisa memperlambat animasi, melakukan jeda, menghentikan, membalikkan, dan memanipulasi elemen animasi sesuai keinginan Anda. Hal ini sangat berguna jika membangun aplikasi berorientasi objek yang kompleks, karena Anda bisa membungkus perilaku dengan baik.


{# wf_devsite_translation #}
