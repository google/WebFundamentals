project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Dokumentasi referensi untuk audit Lighthouse "Rantai Permintaan Penting".

{# wf_updated_on: 2016-10-06 #}
{# wf_published_on: 2016-10-06 #}

# Rantai Permintaan Penting  {: .page-title }

## Mengapa audit itu penting {: #why }

Rantai Permintaan Penting adalah sebuah konsep dari strategi optimalisasi
Critical Rendering Path (CRP). CRP memungkinkan browser memuat laman secepat
mungkin dengan memprioritaskan sumber daya mana yang akan dimuat serta
urutan pemuatannya.

Lihat dokumen [Jalur Rendering
Penting](/web/fundamentals/performance/critical-rendering-path/) untuk mengetahui
selengkapnya.

## Cara untuk lulus audit {: #how }

Audit saat ini bukan berbentuk seperti "lulus" atau "tidak lulus". Informasi
yang disediakan audit ini memberi Anda kesempatan untuk memperbaiki
kinerja pemuatan laman untuk aplikasi Anda.

Di versi Ekstensi Chrome pada Lighthouse, laporan Anda menghasilkan diagram
seperti berikut:

<pre>
Initial navigation
|---lighthouse/ (developers.google.com)
    |---/css (fonts.googleapis.com) - 1058.34ms, 72.80KB
    |---css/devsite-googler-buttons.css (developers.google.com) - 1147.25ms, 70.77KB
    |---jsi18n/ (developers.google.com) - 1155.12ms, 71.20KB
    |---css/devsite-google-blue.css (developers.google.com) - 2034.57ms, 85.83KB
    |---2.2.0/jquery.min.js (ajax.googleapis.com) - 2699.55ms, 99.92KB
    |---contributors/kaycebasques.jpg (developers.google.com) - 2841.54ms, 84.74KB
    |---MC30SXJEli4/photo.jpg (lh3.googleusercontent.com) - 3200.39ms, 73.59KB
</pre>

Diagram ini menyatakan rantai permintaan penting di laman. Jalur dari
`lighthouse/` ke `/css` adalah satu rantai. Jalur dari `lighthouse/` ke
`css/devsite-googler-buttons.css` adalah satu rantai lagi. Dan seterusnya. Skor tertinggi
untuk audit menyatakan jumlah rantai ini. Misalnya, diagram
di atas akan memiliki "skor" tujuh.

Diagram ini juga memecah banyaknya waktu yang dihabiskan untuk mengunduh setiap
sumber daya, dan jumlah byte yang diperlukan untuk mengunduh setiap sumber daya.

Anda bisa menggunakan diagram ini untuk meningkatkan CRP dengan:

* Meminimalkan jumlah sumber daya penting: menghilangkannya, menangguhkan
  unduhannya, menandainya sebagai asinkron, dan seterusnya.
* Mengoptimalkan jumlah byte penting untuk mengurangi waktu pengunduhan (jumlah
  bolak-balik).
* Mengoptimalkan urutan pemuatan sumber daya penting yang tersisa:
  mengunduh semua aset penting sedini mungkin untuk mempersingkat
  panjang jalur penting.

Mengoptimalkan salah satu faktor ini akan menghasilkan pemuatan laman yang lebih cepat.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse menggunakan prioritas jaringan sebagai proxy untuk mengidentifikasi
sumber daya penting yang memblokir rendering. Lihat [Prioritas Sumber Daya Chrome dan
Penjadwalan](https://docs.google.com/document/d/1bCDuq9H1ih9iNjgzyAL0gpwNFiEP4TZS-YLRp_RuMlc)
untuk informasi selengkapnya mengenai cara Chrome mendefinisikan semua prioritas ini.

Data pada rantai permintaan penting, ukuran sumber daya, dan waktu yang dihabiskan untuk mengunduh
sumber daya diekstrak dari Chrome Debugger Protocol.


{# wf_devsite_translation #}
