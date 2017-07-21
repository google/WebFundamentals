project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Komposisi adalah proses penempatan bagian yang digambar pada laman untuk ditampilkan di layar.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2015-03-20 #}

# Berpeganglah pada Properti Compositor-Saja dan Kelola Jumlah Layer {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

Komposisi adalah proses penempatan bagian yang digambar pada 
laman untuk ditampilkan di layar.

Ada dua faktor utama dalam area ini yang memengaruhi kinerja laman: jumlah layer compositor yang perlu dikelola, dan properti yang Anda gunakan untuk animasi.

### TL;DR {: .hide-from-toc }

* Berpeganglah pada perubahan transform dan opacity untuk animasi Anda.
* Promosikan elemen bergerak dengan `will-change` atau `translateZ`.
* Hindari berlebihan menggunakan aturan promosi; layer memerlukan memori dan pengelolaan.

## Gunakan perubahan transform dan opacity untuk animasi

Versi berkinerja-terbaik untuk pipeline piksel menghindari layout dan paint, dan hanya memerlukan perubahan komposisi:

<img src="images/stick-to-compositor-only-properties-and-manage-layer-count/frame-no-layout-paint.jpg"  alt="Pipeline piksel tanpa layout atau paint.">

Untuk menghasilkan hal ini, Anda perlu berpegang pada perubahan properti yang bisa ditangani oleh compositor sendiri. Sekarang hanya ada dua properti yang berlaku dalam hal ini: **`transforms`** dan **`opacity`**:

<img src="images/stick-to-compositor-only-properties-and-manage-layer-count/safe-properties.jpg"  alt="Properti yang bisa Anda animasikan tanpa memicu layout atau paint.">

Yang harus diwaspadai dalam menggunakan `transform` dan `opacity` adalah bahwa elemen tempat Anda mengubah properti ini harus berada pada _layer compositor-nya sendiri_. Untuk membuat layer, Anda harus mempromosikan elemen, yang akan kita bahas berikutnya.

Note: Jika khawatir tidak dapat membatasi animasi pada properti itu saja, lihatlah [Prinsip FLIP](https://aerotwist.com/blog/flip-your-animations), yang dapat membantu Anda memetakan ulang animasi ke berbagai perubahan dalam transform dan opacity dari properti yang lebih mahal.

## Promosikan elemen yang rencananya akan Anda animasikan

Seperti yang kami sebutkan di bagian “[Menyederhanakan kompleksitas paint dan mengurangi area paint](simplify-paint-complexity-and-reduce-paint-areas)”, Anda harus mempromosikan elemen yang rencananya akan Anda animasikan (asalkan tidak berlebihan melakukannya!) ke layernya sendiri:


    .moving-element {
      will-change: transform;
    }


Atau, untuk browser yang lebih tua, atau yang tidak mendukung will-change:


    .moving-element {
      transform: translateZ(0);
    }


Ini memberi peringatan dini kepada browser bahwa perubahan akan terjadi dan, bergantung pada apa yang rencananya akan Anda ubah, browser bisa saja membuat provisi, seperti membuat layer compositor.

## Kelola layer dan hindari ledakan layer

Hal ini mungkin menarik, maka, dengan mengetahui bahwa layer sering kali membantu kinerja, untuk mempromosikan semua elemen di laman Anda dengan sesuatu seperti berikut ini:


    * {
      will-change: transform;
      transform: translateZ(0);
    }


Yang merupakan jalan memutar untuk mengatakan bahwa Anda ingin mempromosikan setiap elemen tunggal di laman. Masalahnya adalah setiap layer yang Anda buat memerlukan memori dan pengelolaan, dan itu tidak gratis. Sebenarnya, di perangkat yang memiliki memori terbatas, dampak pada kinerja bisa jauh mengalahkan manfaat pembuatan layer. Setiap tekstur layer perlu diunggah ke GPU, sehingga ada batasan lebih jauh dalam konteks bandwidth antara CPU dan GPU, dan memori yang tersedia untuk tekstur di GPU.

Caution: Jangan promosikan elemen yang tidak perlu.

## Gunakan Chrome DevTools untuk memahami layer di aplikasi Anda

<div class="attempt-right">
  <figure>
    <img src="images/stick-to-compositor-only-properties-and-manage-layer-count/paint-profiler.jpg" alt="Toggle untuk paint profiler di Chrome DevTools.">
  </figure>
</div>

Untuk memahami layer di aplikasi Anda, dan mengapa suatu elemen memiliki layer, Anda harus mengaktifkan Paint profiler di Timeline pada Chrome DevTools:

<div style="clear:both;"></div>

Lakukan perekaman setelah mengaktifkannya. Bila perekaman selesai, Anda akan dapat mengeklik bingkai individual, yang ditemukan di antara bilah bingkai-per-detik dan detailnya:

<img src="images/stick-to-compositor-only-properties-and-manage-layer-count/frame-of-interest.jpg"  alt="Bingkai yang ingin dibuat profilnya oleh developer.">

Mengekliknya akan memberi Anda opsi baru dalam detail: tab layer.

<img src="images/stick-to-compositor-only-properties-and-manage-layer-count/layer-tab.jpg"  alt="Tombol tab layer di Chrome DevTools.">

Opsi ini akan memberikan tampilan baru yang memungkinkan Anda menggeser, memindai, dan memperbesar semua layer selama bingkai itu, bersama alasan pembuatan layer itu.

<img src="images/stick-to-compositor-only-properties-and-manage-layer-count/layer-view.jpg"  alt="Tampilan layer di Chrome DevTools.">

Dengan menggunakan tampilan ini Anda bisa melacak jumlah layer yang dimiliki. Jika Anda menghabiskan banyak waktu dalam komposisi selama tindakan yang membutuhkan banyak kinerja seperti menggulir atau transisi (Anda harus mengarahkan sekitar **4-5 md**), Anda bisa menggunakan informasi di sini untuk melihat banyaknya layer yang dimiliki, alasan pembuatannya, dan dari sana mengelola jumlah layer di aplikasi Anda.


{# wf_devsite_translation #}
