project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Mempelajari pengukuran jalur rendering penting.

{# wf_updated_on: 2014-09-17 #}
{# wf_published_on: 2014-03-31 #}

# Mengukur Jalur Rendering Penting {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

Dasar dari setiap strategi kinerja yang kokoh adalah pengukuran dan instrumentasi
yang baik. Kita tidak bisa mengoptimalkan sesuatu yang tidak bisa diukur. Dokumen ini
menjelaskan berbagai pendekatan untuk mengukur kinerja CRP.

* Pendekatan Lighthouse menjalankan serangkaian uji coba yang diotomatisasi terhadap laman,
  dan menghasilkan laporan tentang kinerja CRP laman. Pendekatan ini
  menyediakan ringkasan tingkat-tinggi tentang kinerja CRP yang cepat dan mudah
  dari halaman tertentu yang dimuat di browser Anda, sehingga Anda dapat menguji dengan cepat,
  mengulangi, dan meningkatkan kinerjanya.
* Pendekatan Navigation Timing API menangkap metrik [Real User
  Monitoring (RUM)](https://en.wikipedia.org/wiki/Real_user_monitoring)
. Seperti yang tersirat pada namanya, metrik ini ditangkap dari interaksi pengguna
  sesungguhnya dengan situs Anda dan menyediakan pandangan akurat ke dalam
   kinerja CRP dunia-nyata, sebagaimana dialami oleh pengguna Anda di seluruh aneka ragam
   perangkat dan kondisi jaringan.

Secara umum, pendekatan yang bagus adalah menggunakan Lighthouse untuk mengidentifikasi peluang optimalisasi CRP
nyata, kemudian untuk melengkapi kode Anda dengan
Navigation Timing API guna memantau bagaimana aplikasi Anda melakukannya di dunia nyata.

## Mengaudit laman dengan Lighthouse {: #lighthouse }

Lighthouse adalah alat (bantu) pengauditan apl web yang menjalankan serangkaian pengujian terhadap
laman yang diberikan, kemudian menampilkan hasil lamannya dalam laporan terkonsolidasi. Anda
bisa menjalankan Lighthouse sebagai Ekstensi Chrome atau modul NPM, yang
berguna untuk mengintegrasikan Lighthouse dengan sistem integrasi berkelanjutan.

Lihat [Mengaudit Aplikasi Web dengan Lighthouse](/web/tools/lighthouse/) untuk memulai.

Saat Anda menjalankan Lighthouse sebagai Ekstensi Chrome, hasil CRP laman Anda akan tampak
seperti tangkapan layar di bawah ini.

![Audit CRP Lighthouse](images/lighthouse-crp.png)

Lihat [Jaringan Permintaan Penting][crc] untuk informasi selengkapnya tentang hasil
audit.

[crc]: /web/tools/lighthouse/audits/critical-request-chains

## Melengkapi kode Anda dengan Navigation Timing API {: #navigation-timing }

Kombinasi Navigation Timing API dan kejadian browser lainnya dikeluarkan
sebagai muatan laman memungkinkan Anda menangkap dan merekam kinerja
CRP dunia-nyata dari laman mana saja.

<img src="images/dom-navtiming.png"  alt="Navigation Timing">

Masing-masing label dalam diagram di atas terkait dengan stempel waktu resolusi tinggi yang dilacak browser untuk setiap dan seluruh laman yang dimuatnya. Sebenarnya, dalam contoh kasus spesifik ini kami hanya menunjukkan sebagian dari semua stempel waktu yang beragam &mdash; saat ini kita akan melewati semua stempel waktu terkait jaringan, namun kita akan kembali membahasnya dalam pelajaran mendatang.

Jadi, apa arti stempel waktu ini?

* `domLoading`: ini adalah stempel waktu pembuka dari seluruh proses, 
 browser akan mulai mem-parse byte pertama yang diterima dari dokumen
 HTML.
* `domInteractive`: menandai titik saat browser telah selesai mem-parse semua
 HTML dan konstruksi DOM telah tuntas.
* `domContentLoaded`: menandai titik ketika kedua DOM siap dan tidak ada stylesheet yang menghambat eksekusi JavaScript - yang berarti bahwa kita sekarang (mungkin) bisa mengonstruksikan pohon render.
    * Banyak kerangka kerja JavaScript menunggu peristiwa ini sebelum mereka mulai mengeksekusi logikanya sendiri. Karena alasan inilah browser merekam stempel waktu `EventStart` dan `EventEnd` untuk memungkinkan kita melacak berapa lama eksekusi ini dilakukan.
* `domComplete`: seperti yang tersirat pada namanya, semua pemrosesan selesai dan
 semua sumber daya pada laman (gambar, dsb.) telah selesai diunduh -
 yaitu spinner pemuatan telah berhenti berputar.
* `loadEvent`: sebagai langkah terakhir dalam setiap pemuatan laman, browser memulai
 kejadian `onload` yang dapat memicu logika aplikasi tambahan.

Spesifikasi HTML menyatakan kondisi spesifik bagi setiap dan masing-masing kejadian: kapan harus dimulai, kondisi mana yang harus terpenuhi, dan seterusnya. Untuk keperluan kita, fokus akan kita berikan pada beberapa tahapan pencapaian yang terkait dengan jalur rendering penting:

* `domInteractive` menandai kapan DOM siap.
* `domContentLoaded` biasanya menandai kapan [baik DOM maupun CSSOM siap](http://calendar.perfplanet.com/2012/deciphering-the-critical-rendering-path/).
    * Jika tidak ada parser yang memblokir JavaScript maka `DOMContentLoaded` akan segera dimulai setelah `domInteractive`.
* `domComplete` menandai kapan laman dan semua sub-sumberdayanya siap.


<div style="clear:both;"></div>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/measure_crp.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/measure_crp.html){: target="_blank" .external }

Contoh di atas mungkin tampak sedikit sulit pada awalnya, namun sebenarnya sangat mudah. Navigation Timing API merekam semua stempel waktu yang relevan dan kode kita cukup menunggu kejadian `onload` untuk memulai &mdash; memanggil kembali kejadian `onload` setelah `domInteractive`, `domContentLoaded`, dan `domComplete` &mdash; dan menghitung perbedaan antara berbagai jenis stempel waktu.

<img src="images/device-navtiming-small.png"  alt="demo NavTiming">

Setelah semuanya selesai, sekarang kita punya beberapa tahapan pencapaian untuk melacak dan sebuah fungsi sederhana untuk mengeluarkan pengukuran ini. Perhatikan bahwa daripada mencetak metrik ini pada laman, Anda juga bisa mengubah kode untuk mengirim metrik ini ke server analisis ([Google Analytics melakukan ini secara otomatis](https://support.google.com/analytics/answer/1205784)), yang merupakan cara terbaik untuk menjaga tab pada kinerja laman Anda dan mengidentifikasi calon laman yang bisa memanfaatkan beberapa tugas optimalisasi.

## Bagaimana dengan DevTools? {: #devtools }

Walau dokumen ini terkadang menggunakan panel Chrome DevTools Network untuk
mengilustrasikan konsep CRP, DevTools saat ini tidak cocok untuk pengukuran CRP
karena tidak memiliki mekanisme bawaan untuk mengisolasi
sumber daya penting. Jalankan audit [Lighthouse](#lighthouse) untuk membantu mengidentifikasi
sumber daya tersebut.

<a href="analyzing-crp" class="gc-analytics-event"
    data-category="CRP" data-label="Next / Analyzing CRP">
  <button>Berikutnya: Menganalisis Kinerja Jalur Rendering Penting</button>
</a>


{# wf_devsite_translation #}
