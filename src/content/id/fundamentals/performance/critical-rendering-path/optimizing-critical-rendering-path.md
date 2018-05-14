project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Pelajari faktor kunci dalam mengoptimalkan jalur rendering penting.

{# wf_updated_on: 2015-10-05 #}
{# wf_published_on: 2014-03-31 #}

# Mengoptimalkan Jalur Rendering Penting {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}


  Untuk menghasilkan waktu tercepat untuk render pertama, kita perlu 
  meminimalkan tiga variabel:

  <ul>
    <li>Jumlah sumber daya penting.</li>
    <li>Panjang jalur penting.</li>
    <li>Jumlah byte penting.</li>
  </ul>

Sumber daya penting adalah sumber daya yang bisa memblokir rendering awal laman. Semakin sedikit sumber daya ini, semakin sedikit kerja browser, CPU, dan sumber daya lainnya.

Demikian pula, panjang jalur penting merupakan fungsi grafik dependensi antara sumber daya penting dan ukuran byte-nya: sebagian pengunduhan sumber daya hanya bisa dimulai setelah sumber daya sebelumnya diproses, dan semakin besar sumber daya, semakin sering harus bolak-balik mengunduhnya.

Terakhir, semakin sedikit byte penting yang harus diunduh browser, semakin cepat pemrosesan materi dan merendernya pada layar. Untuk mengurangi jumlah byte, kita bisa mengurangi jumlah sumber daya (meniadakannya atau membuatnya menjadi tidak penting), dan memastikan kita meminimalkan ukuran transfer dengan memampatkan dan mengoptimalkan setiap sumber daya.

**Urutan langkah-langkah umum untuk mengoptimalkan jalur rendering penting adalah:**

1. Analisis dan karakterisasikan jalur penting Anda: jumlah sumber daya, byte, dan panjangnya.
1. Minimalkan jumlah sumber daya penting: meniadakannya, menangguhkan pengunduhannya, menandainya sebagai asinkron, dan seterusnya.
1. Optimalkan jumlah byte penting untuk mengurangi waktu pengunduhan (jumlah bolak-balik).
1. Optimalkan urutan pemuatan sumber daya penting selebihnya: unduh semua aset penting seawal mungkin untuk memperpendek panjang jalur penting.

<a href="page-speed-rules-and-recommendations" class="gc-analytics-event"
    data-category="CRP" data-label="Next / PageSpeed">
  <button>Berikutnya: Aturan dan Saran PageSpeed</button>
</a>


{# wf_devsite_translation #}
