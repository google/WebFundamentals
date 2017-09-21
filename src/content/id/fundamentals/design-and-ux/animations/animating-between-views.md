project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Pelajari cara menganimasikan antar dua tampilan dalam aplikasi Anda.

{# wf_updated_on: 2016-08-23 #}
{# wf_published_on: 2014-08-08 #}

# Menganimasikan Antar Tampilan {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

Sering kali, Anda ingin memindahkan pengguna di antara tampilan dalam aplikasi, apakah itu dari daftar untuk tampilan terperinci, atau menampilkan navigasi bilah sisi. Animasi antara tampilan-tampilan ini menjaga pengguna tetap terlibat dan menambahkan kesan lebih hidup untuk proyek Anda.

### TL;DR {: .hide-from-toc }
* Gunakan transisi untuk berpindah antar tampilan; hindari menggunakan `left`, `top`, atau properti lainnya yang memicu layout.
* Pastikan bahwa setiap animasi yang Anda gunakan cepat dan berdurasi pendek.
* Pertimbangkan bagaimana animasi dan layout Anda berubah ketika ukuran layar semakin besar; apa yang bekerja dengan baik pada layar yang lebih kecil, mungkin akan terlihat aneh ketika digunakan pada desktop.

Bagaimana transisi tampilan ini terlihat dan berperilaku akan bergantung pada tipe tampilan yang Anda hadapi. Misalnya, menganimasikan overlay modal di atas tampilan sebaiknya terlihat berbeda dibandingkan transisi antara tampilan daftar dan tampilan detail.

Berhasil: Cobalah untuk mempertahankan 60fps bagi semua animasi Anda. Dengan begitu, pengguna tidak akan melihat animasi yang tersendat yang mengganggu pengalaman mereka. Pastikan bahwa setiap elemen animasi memiliki `will-change` yang disetel untuk apa pun yang telah Anda rencanakan untuk diubah sebelum animasi dimulai. Untuk melihat transisi, kami sarankan agar Anda menggunakan `will-change: transform`.

## Gunakan terjemahan untuk berpindah di antara tampilan

<div class="attempt-left">
  <figure>
    <img src="images/view-translate.gif" alt="Menerjemahkan di antara dua tampilan" />
  </figure>
</div>

Untuk mempermudah, asumsikan bahwa ada dua tampilan: tampilan daftar dan tampilan detail. Saat pengguna mengetuk daftar item dalam tampilan daftar, tampilan detail bergeser ke dalam, dan tampilan daftar bergeser ke luar.

<div style="clear:both;"></div>

<div class="attempt-right">
  <figure>
    <img src="images/container-two-views.svg" alt="Hierarki tampilan." />
  </figure>
</div>

Untuk memperoleh efek ini, Anda membutuhkan kontainer bagi kedua tampilan tersebut dengan `overflow: hidden` yang telah disetel di situ. Dengan begitu dua tampilan tersebut bisa berdampingan di dalam kontainer tanpa menampilkan bilah gulir horizontal, dan setiap tampilan bisa bergeser dari sisi-ke-sisi ketika diperlukan.

<div style="clear:both;"></div>

CSS untuk kontainer adalah:


    .container {
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: relative;
    }
    

Posisi kontainer ditetapkan sebagai `relative`. Ini berarti bahwa setiap tampilan di dalam kontainer bisa diposisikan ke sudut kiri atas dan kemudian diubah dengan transformasi. Pendekatan ini lebih menguntungkan untuk kinerja daripada menggunakan properti `left` (karena hal itu memicu layout dan paint), dan biasanya lebih mudah untuk dirasionalisasi.


    .view {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
    
      /* let the browser know we plan to animate
         each view in and out */
      will-change: transform;
    }
    

Menambahkan `transition` pada properti `transform` memberikan efek geser yang bagus. Untuk memberikan nuansa yang bagus, gunakan kurva `cubic-bezier` khusus, yang kita bahas dalam [Panduan Easing Khusus](custom-easing).


    .view {
      /* Prefixes are needed for Safari and other WebKit-based browsers */
      transition: -webkit-transform 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946);
      transition: transform 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946);
    }
    

Tampilan di luar layar harus diterjemahkan ke kanan, sehingga tampilan detail harus dipindahkan:


    .details-view {
      -webkit-transform: translateX(100%);
      transform: translateX(100%);
    }
    

Sekarang sedikit JavaScript diperlukan untuk menangani kelas. Ini mengalihkan kelas-kelas yang sesuai pada tampilan.


    var container = document.querySelector('.container');
    var backButton = document.querySelector('.back-button');
    var listItems = document.querySelectorAll('.list-item');
    
    /**
     * Toggles the class on the container so that
     * we choose the correct view.
     */
    function onViewChange(evt) {
      container.classList.toggle('view-change');
    }
    
    // When you click a list item, bring on the details view.
    for (var i = 0; i < listItems.length; i++) {
      listItems[i].addEventListener('click', onViewChange, false);
    }
    
    // And switch it back again when you click the back button
    backButton.addEventListener('click', onViewChange);
    

Akhirnya, kita tambahkan deklarasi CSS untuk kelas-kelas tersebut.


    .view-change .list-view {
      -webkit-transform: translateX(-100%);
      transform: translateX(-100%);
    }
    
    .view-change .details-view {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    
[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/inter-view-animation.html){: target="_blank" .external }

Anda bisa meluaskan ini untuk menutupi beberapa tampilan, namun konsep dasarnya harus tetap sama; setiap tampilan tak-terlihat harus di luar layar dan ditampilkan ketika diperlukan, dan tampilan aktif pada layar harus dialihkan keluar.

Perhatian: Membuat hierarki semacam ini dalam lintas-browser bisa sangat menantang. Misalnya, iOS membutuhkan properti CSS tambahan, <code>-webkit-overflow-scrolling: touch</code>, untuk "mengaktifkan kembali" fling scrolling, tetapi Anda tidak bisa mengontrol sumbunya, seperti yang bisa dilakukan dengan properti overflow standar. Pastikan untuk menguji implementasinya pada berbagai perangkat!

Selain transisi antar tampilan, teknik ini juga bisa diterapkan ke elemen geser-masuk lainnya, seperti elemen navigasi bilah sisi. Satu-satunya perbedaan adalah bahwa Anda tidak perlu memindahkan tampilan lainnya.

## Pastikan bahwa animasi Anda berjalan pada layar yang lebih besar

<div class="attempt-right">
  <figure>
    <img src="images/container-two-views-ls.svg" alt="Hierarki tampilan pada layar besar." />
  </figure>
</div>

Pada layar yang lebih besar, Anda harus selalu menampilkan tampilan daftar bukan menghilangkannya, dan menggeser pada tampilan detail dari sisi sebelah kanan. Ini hampir sama dengan menangani tampilan navigasi.






{# wf_devsite_translation #}
