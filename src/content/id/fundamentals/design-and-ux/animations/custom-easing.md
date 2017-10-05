project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Bertualanglah dan buat animasi yang benar-benar khusus untuk proyek Anda.

{# wf_updated_on: 2016-08-23 #}
{# wf_published_on: 2014-08-08 #}

# Easing Khusus {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}
{% include "web/_shared/contributors/samthorogood.html" %}

Terkadang Anda tidak ingin menggunakan kata kunci easing yang disertakan dengan CSS, atau Anda akan menggunakan Animasi Web atau kerangka kerja JavaScript. Dalam hal ini, Anda biasanya bisa menentukan kurva (atau persamaan), dan ini memberikan Anda banyak kontrol terhadap nuansa animasi proyek.

### TL;DR {: .hide-from-toc }
* Easing khusus memungkinkan Anda untuk memberikan lebih banyak kepribadian dalam proyek Anda.
* Anda bisa membuat kurva cubic Bézier yang menyerupai kurva animasi default (ease-out, ease-in, dll.) tapi dengan penekanan pada tempat yang berbeda.
* Gunakan JavaScript ketika Anda membutuhkan lebih banyak kontrol atas pengaturan waktu dan perilaku animasi, misalnya, animasi elastis atau memantul.


Jika membuat animasi dengan CSS, Anda akan mendapati bahwa Anda bisa menentukan kurva cubic Bézier untuk menetapkan waktunya. Faktanya, kata kunci `ease`, `ease-in`, `ease-out` dan `linear` memetakan ke kurva Bézier yang sudah ditetapkan, yang dijelaskan terperinci dalam [spesifikasi transisi CSS](http://www.w3.org/TR/css3-transitions/) dan [spesifikasi Animasi Web](https://w3c.github.io/web-animations/#scaling-using-a-cubic-bezier-curve).

Kurva Bézier ini mengambil empat nilai, atau dua pasang angka, dengan setiap pasangan menggambarkan koordinat X dan Y dari titik kontrol kurva cubic Bézier. Titik awal dari kurva Bézier memiliki koordinat (0, 0) dan titik akhir koordinat adalah (1, 1); Anda bisa menyetel nilai-nilai X dan Y dari dua titik kontrol. Nilai X untuk dua titik kontrol harus antara 0 dan 1, dan nilai Y setiap titik kontrol bisa melebihi batas [0, 1], meskipun spesifikasinya tidak menyebutkan seberapa banyak.

Mengubah setiap nilai X dan Y dari titik kontrol memberikan kurva yang sangat berbeda, dan karena itu memberikan nuansa sangat berbeda terhadap animasi Anda. Misalnya, jika titik kontrol pertama ada di daerah kanan bawah, maka animasinya akan dimulai dengan lambat. Jika ada di sudut kiri atas, animasi akan dimulai dengan cepat. Sebaliknya, jika titik kontrol kedua ada di daerah kanan bawah grid, animasi akan cepat di bagian akhir; jika di kiri atas, animasi akan lambat di bagian akhir.

Sebagai perbandingan, di sini ada dua kurva: kurva ease-in-out biasa dan kurva khusus:

<div class="attempt-left">
  <figure>
    <img src="images/ease-in-out-markers.png" alt="Kurva animasi ease-in-out." />
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/custom.png" alt="Kurva animasi khusus." />
  </figure>
</div>

[Melihat animasi dengan easing khusus](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-custom-curve.html){: target="_blank" .external }

CSS untuk kurva khusus adalah:


    transition: transform 500ms cubic-bezier(0.465, 0.183, 0.153, 0.946);
    

Dua angka pertama adalah koordinat X dan Y dari titik kontrol pertama, dan dua angka kedua adalah koordinat X dan Y dari titik kontrol kedua.

Membuat kurva khusus sangat menyenangkan, dan memberikan Anda kontrol yang banyak atas nuansa animasi. Misalnya, pada kurva di atas, Anda bisa melihat bahwa kurva menyerupai kurva ease-in-out klasik, namun dengan ease-in dipersingkat, atau bagian "memulai," dan perlambatan panjang di bagian akhir.

Lakukan eksperimen dengan [alat (bantu) kurva animasi](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/curve-playground.html){: target="_blank" .external } dan lihat bagaimana kurva memengaruhi nuansa animasi.

## Gunakan kerangka kerja JavaScript untuk lebih banyak kontrol

Terkadang Anda membutuhkan lebih banyak kontrol daripada yang disediakan oleh kurva cubic Bézier. Jika Anda ingin efek memantul elastis, Anda bisa mempertimbangkan menggunakan kerangka kerja JavaScript, karena ini adalah efek yang sulit dicapai dengan CSS atau Web Animations.

### TweenMax

Salah satu kerangka kerja yang efektif adalah [TweenMax dari GreenSock](https://github.com/greensock/GreenSock-JS/tree/master/src/minified) (atau TweenLite jika ingin membuat segalanya sangat ringan), karena Anda mendapatkan banyak kontrol dalam pustaka JavaScript yang ringan, dan basis kode yang sangat matang.

[Lihat animasi ease elastis](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-elastic.html){: target="_blank" .external }

Untuk menggunakan TweenMax, sertakan skrip berikut di laman Anda:


    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script>
    

Setelah skrip ditempatkan, Anda bisa memanggil TweenMax terhadap elemen Anda dan memberitahukan properti yang diinginkan, bersama tiap easing yang Anda inginkan. Ada banyak pilihan easing yang bisa Anda gunakan; kode di bawah menggunakan ease-out elastis:


    var box = document.getElementById('my-box');
    var animationDurationInSeconds = 1.5;
    
    TweenMax.to(box, animationDurationInSeconds, {
      x: '100%',
      ease: 'Elastic.easeOut'
    });
    

[Dokumentasi TweenMax](https://greensock.com/docs/#/HTML5/GSAP/TweenMax/) menyoroti semua pilihan yang Anda miliki, sehingga layak dibaca.





{# wf_devsite_translation #}
