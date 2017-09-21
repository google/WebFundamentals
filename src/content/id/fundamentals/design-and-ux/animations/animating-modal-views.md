project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Pelajari cara menganimasikan tampilan modal di aplikasi Anda.

{# wf_updated_on: 2016-08-24 #}
{# wf_published_on: 2014-08-08 #}

# Menganimasikan Tampilan Modal {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

<div class="attempt-right">
  <figure>
    <img src="images/dont-press.gif" alt="Menganimasikan tampilan modal." />
    <figcaption>
      <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/modal-view-animation.html" target="_blank" class="external">Cobalah</a>
    </figcaption>
  </figure>
</div>

Tampilan modal hanya untuk pesan penting, dan Anda memiliki alasan yang sangat baik kenapa memblokir antarmuka pengguna. Gunakan dengan hati-hati, karena tampilan modal mengganggu dan bisa dengan mudah merusak pengalaman pengguna jika terlalu sering digunakan. Namun, dalam beberapa keadaan, tampilan modal adalah pilihan tampilan yang tepat, dan menambahkan beberapa animasi akan membuatnya semakin hidup.

### TL;DR {: .hide-from-toc }
* Gunakan tampilan modal secukupnya; pengguna akan merasa frustrasi jika Anda mengganggu pengalaman mereka degan hal-hal yang tidak penting.
* Menambahkan skala ke animasi memberikan efek "drop on" yang bagus.
* Singkirkan tampilan modal dengan cepat bila pengguna menutupnya. Namun, munculkan tampilan modal sedikit lebih lambat ke layar sehingga tidak mengejutkan pengguna.

<div class="clearfix"></div>

Overlay modal harus selaras dengan tampilan yang terlihat, jadi setel `position`-nya ke `fixed`:


    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    
      pointer-events: none;
      opacity: 0;
    
      will-change: transform, opacity;
    }
    

Contoh ini memiliki `opacity` awal 0 sehingga tersembunyi dari tampilan, dan `pointer-events` harus disetel ke `none` sehingga aktivitas klik dan sentuhan akan melewatinya. Tanpanya, semua interaksi akan diblokir, yang membuat seluruh laman menjadi tidak responsif. Yang terakhir, karena itu menganimasikan `opacity` dan `transform`, harus ditandai sebagai berubah dengan `will-change` (lihat juga [Menggunakan properti will-change](animations-and-performance#using-the-will-change-property)).

Ketika terlihat, tampilan harus menerima interaksi dan memiliki `opacity` bernilai 1:


    .modal.visible {
      pointer-events: auto;
      opacity: 1;
    }
    

Sekarang, setiap kali tampilan modal diperlukan, Anda bisa menggunakan JavaScript untuk mengaktifkan kelas "visible":


    modal.classList.add('visible');
    

Pada titik ini, tampilan modal muncul tanpa animasi apa pun, jadi sekarang Anda bisa menambahkannya dalam
(lihat juga [Easing Khusus](custom-easing)):


    .modal {
      -webkit-transform: scale(1.15);
      transform: scale(1.15);
    
      -webkit-transition:
        -webkit-transform 0.1s cubic-bezier(0.465, 0.183, 0.153, 0.946),
        opacity 0.1s cubic-bezier(0.465, 0.183, 0.153, 0.946);
    
      transition:
        transform 0.1s cubic-bezier(0.465, 0.183, 0.153, 0.946),
        opacity 0.1s cubic-bezier(0.465, 0.183, 0.153, 0.946);
    
    }
    

Menambahkan `scale` dalam transformasi membuat tampilan tampak turun sedikit ke dalam layar, yang merupakan efek bagus. Transisi default diterapkan untuk properti transform dan opacity dengan kurva khusus dan durasi 0,1 detik.

Durasi ini cukup singkat, tetapi merupakan durasi yang ideal saat pengguna menutup tampilan dan ingin kembali ke aplikasi Anda. Kekurangannya adalah bahwa ketika tampilan modal muncul mungkin terlalu agresif. Untuk memperbaiki ini, ganti nilai-nilai transisi untuk kelas `visible`:


    .modal.visible {
    
      -webkit-transform: scale(1);
      transform: scale(1);
    
      -webkit-transition:
        -webkit-transform 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946),
        opacity 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946);
    
      transition:
        transform 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946),
        opacity 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946);
    
    }
    

Sekarang tampilan modal membutuhkan waktu 0,3 detik untuk ditampilkan ke layar, sedikit kurang agresif, tetapi bisa ditutup dengan cepat, yang akan lebih disukai pengguna.





{# wf_devsite_translation #}
