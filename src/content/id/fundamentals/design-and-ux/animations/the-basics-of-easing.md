project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Mempelajari cara melembutkan dan memberikan bobot untuk animasi Anda.

{# wf_updated_on: 2016-08-23 #}
{# wf_published_on: 2014-08-08 #}

# Dasar-Dasar Easing {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

Di dunia ini tidak ada yang bergerak secara linear dari satu titik ke titik lainnya. Dalam kenyataannya, sesuatu cenderung mengalami percepatan atau perlambatan ketika mereka bergerak. Otak kita sudah diprogram untuk mengharapkan jenis gerakan ini, sehingga ketika membuat animasi, Anda harus menggunakannya untuk keuntungan Anda. Gerakan alami membuat pengguna merasa lebih nyaman dengan aplikasi Anda, yang pada akhirnya memberikan pengalaman yang lebih baik secara keseluruhan.

### TL;DR {: .hide-from-toc }
* Easing membuat animasi Anda terasa lebih alami.
* Pilih animasi ease-out untuk elemen UI.
* Hindari animasi ease-in atau ease-in-out kecuali Anda bisa membuatnya berdurasi pendek; mereka terasa lambat bagi pengguna akhir.


Dalam animasi klasik, istilah untuk gerak yang dimulai perlahan kemudian dipercepat adalah "slow in," dan gerakan yang dimulai dengan cepat kemudian berkurang kecepatannya adalah "slow out." Istilah yang paling umum digunakan di web untuk animasi ini adalah “ease in” dan “ease out”. Kadang-kadang keduanya digabungkan, yang disebut “ease in out.” Kemudian, easing adalah proses untuk membuat animasi lebih gampang untuk diucapkan.

## Kata kunci easing

Transisi dan animasi CSS memperbolehkan Anda [memilih jenis easing yang ingin Anda gunakan untuk animasi Anda](choosing-the-right-easing). Anda bisa menggunakan kata kunci yang memengaruhi easing (atau kadang-kadang disebut `timing`) dari animasi tersebut. Anda juga bisa [sepenuhnya menyesuaikan easing Anda](custom-easing), yang memberi Anda lebih banyak kebebasan untuk mengekspresikan kepribadian aplikasi.

Berikut adalah beberapa kata kunci yang bisa Anda gunakan dalam CSS:

* `linear`
* `ease-in`
* `ease-out`
* `ease-in-out`

Sumber: [Transisi CSS, W3C](http://www.w3.org/TR/css3-transitions/#transition-timing-function-property)

Anda juga bisa menggunakan kata kunci `steps`, yang memungkinkan Anda untuk membuat transisi yang memiliki langkah-langkah terpisah, namun kata kunci yang tercantum di atas adalah yang paling berguna untuk membuat animasi yang terasa alami.

## Animasi linear

<div class="attempt-right">
  <figure>
    <img src="images/linear.png" alt="Kurva animasi ease linear." />
  </figure>
</div>

Animasi tanpa menggunakan easing disebut sebagai **linear**. Grafik transisi linear terlihat seperti ini:

Ketika waktu berjalan, nilai juga mengalami pertambahan dalam jumlah yang setara. Dengan gerakan linear, sesuatu cenderung terasa kaku dan tidak wajar, dan hal ini bisa membuat janggal bagi pengguna. Pada intinya, Anda harus menghindari gerakan linear.

Apakah Anda sedang melakukan pengkodean animasi menggunakan CSS atau JavaScript, Anda akan mendapati bahwa selalu ada pilihan untuk gerakan linear. 

[Lihat animasi linear](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-linear.html){: target="_blank" .external }

<div style="clear:both;"></div>

Untuk mendapatkan efek di atas dengan CSS, kodenya akan terlihat seperti berikut ini:


    transition: transform 500ms linear;
    


## Animasi ease-out

<div class="attempt-right">
  <figure>
    <img src="images/ease-out.png" alt="Kurva animasi ease-out." />
  </figure>
</div>

Easing out menyebabkan animasi dimulai lebih cepat dari yang linear, dan juga melambat di akhir.

Easing out biasanya paling cocok digunakan untuk pekerjaan antarmuka pengguna, karena awal yang cepat dari animasi Anda memberikan kesan responsif, dan masih ada ruang untuk perlambatan alami di bagian akhir.

[Lihat animasi ease-out](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-ease-out.html){: target="_blank" .external }

<div style="clear:both;"></div>

Ada banyak cara untuk mendapatkan efek ease out, tapi yang paling sederhana adalah kata kunci `ease-out` di CSS:


    transition: transform 500ms ease-out;
    


## Animasi ease-in

<div class="attempt-right">
  <figure>
    <img src="images/ease-in.png" alt="Kurva animasi ease-in." />
  </figure>
</div>

Animasi ease-in mulai dengan perlahan dan berakhir cepat, yang merupakan kebalikan dari animasi ease-out.

Jenis animasi ini seperti sebuah batu berat yang jatuh, batu itu awalnya jatuh perlahan-lahan lalu menghunjam tanah secara cepat dengan dentuman mematikan.

Namun, dari sudut pandang interaksi, ease-in terasa sedikit janggal karena akhir yang tiba-tiba; sesuatu yang bergerak di dunia nyata mengalami perlambatan, bukannya langsung berhenti tiba-tiba. Ease-in juga memiliki efek yang merugikan yaitu terasa lambat ketika dimulai, yang berdampak negatif terhadap persepsi daya respons dalam situs atau aplikasi Anda.

[Lihat animasi ease-in](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-ease-in.html){: target="_blank" .external }

<div style="clear:both;"></div>

Untuk menggunakan animasi ease-in, sama seperti animasi ease-out dan linear, Anda bisa menggunakan kata kuncinya:


    transition: transform 500ms ease-in;
    

## Animasi ease-in-out

<div class="attempt-right">
  <figure>
    <img src="images/ease-in-out.png" alt="Kurva animasi ease-in-out." />
  </figure>
</div>

Easing-in dan easing-out mirip dengan mobil yang berakselerasi lalu melambat, dan jika digunakan dengan bijak, bisa memberikan efek yang lebih dramatis dari sekadar easing-out.

Jangan menggunakan durasi animasi yang terlalu lama, karena awal animasi ease-in agak lambat. Sesuatu di kisaran 300-500 md biasanya cocok, namun jumlah yang tepat sangat bergantung pada nuansa proyek Anda. Jadi, karena awal yang lambat, cepat di tengah, dan lambat di akhir, akan ada peningkatan kontras di animasi, yang bisa cukup memuaskan bagi pengguna.

[Lihat animasi ease-in-out](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-ease-in-out.html){: target="_blank" .external }

<div style="clear:both;"></div>


Untuk mendapatkan animasi ease-in-out, Anda bisa menggunakan kata kunci CSS `ease-in-out`:


    transition: transform 500ms ease-in-out;
    




{# wf_devsite_translation #}
