project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Dokumentasi referensi untuk audit Lighthouse "Situs Tidak Menggunakan Tautan Tag Yang Menunda Gambar Pertama" dan "Situs Tidak Menggunakan Tag Skrip Di Header Yang Menunda Gambar Pertama".

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-12-01 #}

# Situs Tidak Menggunakan Sumber Daya Yang Menunda Gambar Pertama  {: .page-title }

## Mengapa audit itu penting {: #why }

Pemuatan laman yang cepat mengakibatkan interaksi pengguna yang lebih tinggi, lebih banyak laman yang ditayangkan, dan
peningkatan konversi.

Anda bisa memperbaiki kecepatan pemuatan laman dengan menyelaraskan tautan dan skrip yang
diperlukan untuk gambar pertama, serta menangguhkan yang tidak diperlukan.

## Cara untuk lulus audit {: #how }

Di laporan Anda, Lighthouse mencantumkan semua tautan atau skrip yang memblokir rendering
yang terdeteksi. Yang menjadi sasaran adalah mengurangi jumlahnya.

Sebagaimana disebutkan dalam [Cara implementasi audit](#implementation), Lighthouse
menandai tiga tipe tautan yang memblokir rendering: impor skrip, stylesheet, dan
HTML. Cara Anda mengoptimalkan bergantung pada tipe sumber daya yang sedang Anda gunakan.

Note: Bila sumber daya disebutkan sebagai "penting" di bawah ini, berarti
sumber daya itu diperlukan untuk gambar pertama atau penting untuk
fungsionalitas inti laman tersebut.

* Untuk skrip penting, sebaiknya selaraskan di HTML Anda. Untuk skrip yang
  tidak begitu penting, sebaiknya tandai dengan atribut `async` atau `defer`.
  Lihat [Menambahkan Interaktivitas dengan JavaScript][js] untuk mengetahui selengkapnya.
* Untuk stylesheet, sebaiknya pecah gaya Anda menjadi beberapa macam file,
  yang disusun menurut kueri media, kemudian tambahkan atribut untuk `media` ke setiap
  tautan stylesheet. Saat memuat laman, browser hanya memblokir
  gambar pertama untuk mengambil stylesheet yang cocok dengan perangkat pengguna. Lihat
  [CSS Pemblokiran Rendering][css] untuk mengetahui selengkapnya.
* Untuk impor HTML yang tidak begitu penting, tandai dengan atribut `async`. Sebagai
  aturan umum, `async` harus digunakan bersama impor HTML sebanyak mungkin.

[js]: /web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript
[css]: /web/fundamentals/performance/critical-rendering-path/render-blocking-css

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse mengidentifikasi tiga tipe sumber daya pemblokiran.

Tag `<script>` yang:

* Ada dalam `<head>` dokumen.
* Tidak memiliki atribut `defer`.
* Tidak memiliki atribut `async`.

Tag `<link rel="stylesheet">` yang:

* Tidak memiliki atribut `disabled`. Bila atribut ini ada,
  browser tidak akan mengunduh stylesheet.
* Tidak memiliki atribut `media` yang cocok dengan perangkat pengguna.

Tag `<link rel="import">` yang:

* Tidak memiliki atribut `async`.


{# wf_devsite_translation #}
