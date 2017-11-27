project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Meng-cache dan menggunakan kembali sumber daya yang sebelumnya diambil merupakan aspek penting dalam mengoptimalkan kinerja.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2013-12-31 #}

# Meng-cache HTTP {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

Mengambil sesuatu melalui jaringan sama-sama lambat dan mahal. Respons besar mengharuskan sering bolak-balik antara klien dan server, yang mengakibatkan penundaan saat tersedia dan bisa diproses oleh browser, dan juga menimbulkan biaya data kepada pengunjung. Akibatnya, kemampuan untuk meng-cache dan menggunakan kembali sumber daya yang diambil sebelumnya merupakan aspek penting untuk mengoptimalkan kinerja.


Kabar baiknya adalah setiap browser dibekali implementasi cache HTTP. Yang perlu Anda lakukan adalah memastikan bahwa setiap respons server menyediakan direktif header HTTP yang benar untuk menginstruksikan browser mengenai kapan dan berapa lama browser bisa meng-cache respons.

Note: Jika menggunakan WebView untuk mengambil dan menampilkan materi web di aplikasi, Anda mungkin harus menyediakan flag konfigurasi tambahan untuk memastikan cache HTTP diaktifkan, ukurannya disetel ke jumlah yang wajar agar sesuai dengan kasus penggunaan Anda, dan agar cache tetap ada. Periksa dokumentasi platform dan konfirmasikan setelan Anda.

<img src="images/http-request.png"  alt="Permintaan HTTP">

Bila server mengembalikan respons, server juga memancarkan sekumpulan header HTTP, yang menjelaskan tipe-materinya, panjang, direktif caching, token validasi, dan lainnya. Misalnya, dalam pertukaran di atas, server mengembalikan respons 1024 byte, memerintahkan klien untuk meng-cache-nya hingga 120 detik, dan menyediakan token validasi (“x234dff”) yang bisa digunakan setelah respons berakhir untuk memeriksanya apakah sumber daya telah dimodifikasi.


## Memvalidasi respons ter-cache dengan ETag

### TL;DR {: .hide-from-toc }
* Server menggunakan header HTTP ETag untuk mengomunikasikan token validasi.
* Token validasi memungkinkan pemeriksaan pembaruan sumber daya yang efisien: tidak ada data yang ditransfer jika sumber daya belum berubah.


Anggaplah 120 detik telah berlalu sejak pengambilan awal dan browser telah memulai sebuah permintaan baru untuk sumber daya yang sama. Pertama-tama, browser akan memeriksa cache lokal dan menemukan respons sebelumnya. Sayangnya, browser tidak bisa menggunakan respons sebelumnya karena respons tersebut telah kedaluwarsa. Di tahap ini, browser bisa mengirimkan permintaan baru dan mengambil respons lengkap yang baru. Akan tetapi, ini tidak cukup karena jika sumber daya tidak berubah, maka tidak ada respons untuk mengunduh informasi yang sama yang sudah ada di cache!

Untuk mengatasi masalah itulah token validasi didesain, sebagaimana yang ditetapkan dalam header ETag. Server menghasilkan dan mengembalikan token acak yang biasanya berupa hash atau beberapa sidik jari lain dari materi file. Klien tidak perlu mengetahui cara menghasilkan sidik jari; klien hanya perlu mengirimkannya ke server pada permintaan berikutnya. Jika sidik jari masih sama, berarti sumber daya belum berubah dan Anda bisa melewati pengunduhan.

<img src="images/http-cache-control.png"  alt="Contoh Cache-Control HTTP">

Dalam contoh terdahulu, klien secara otomatis menyediakan token Etag di header permintaan HTTP "If-None-Match". Server akan memeriksa token dengan sumber daya saat ini. Jika token belum berubah, server akan mengembalikan respons "304 Not Modified", yang memberi tahu browser bahwa respons yang dimilikinya di cache belum berubah dan bisa diperbarui selama 120 detik lagi. Perhatikan, Anda tidak perlu mengunduh respons lagi, yang akan menghemat waktu dan bandwidth.

Sebagai developer web, bagaimana Anda memanfaatkan validasi ulang yang efisien ini? Browser melakukan semua pekerjaan mewakili kita. Browser secara otomatis mendeteksi apakah token validasi telah ditetapkan sebelumnya, menambahkan token validasi ke permintaan keluar, dan akan memperbarui stempel waktu cache jika perlu berdasarkan respons yang diterima dari server. **Satu-satunya yang perlu dilakukan adalah memastikan server menyediakan token Etag yang diperlukan. Periksa dokumentasi server untuk flag konfigurasi yang diperlukan.**

Note: Tip: Proyek Boilerplate HTML5 berisi <a href='https://github.com/h5bp/server-configs'>file konfigurasi contoh</a> untuk semua server paling populer bersama komentar detail untuk setiap setelan dan flag konfigurasi. Temukan server favorit Anda dalam daftar, cari setelan yang sesuai, dan salin/pastikan server Anda telah dikonfigurasi dengan setelan yang disarankan.

## Cache-Control

### TL;DR {: .hide-from-toc }
* Setiap sumber daya bisa mendefinisikan kebijakan caching-nya lewat header HTTP Cache-Control.
* Direktif Cache-Control mengontrol siapa yang bisa meng-cache respons, dalam kondisi apa, dan sampai berapa lama.


Dari sudut pandang optimalisasi kinerja, permintaan terbaik adalah permintaan yang tidak perlu dikomunikasikan dengan server: salinan lokal dari respons memungkinkan Anda meniadakan semua latensi jaringan dan menghindari biaya data untuk transfer data. Untuk mencapainya, spesifikasi HTTP memungkinkan server mengembalikan [direktif Cache-Control](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.9) yang mengontrol bagaimana, dan berapa lama browser dan cache perantara lainnya bisa meng-cache respons individual.

Note: Header Cache-Control didefinisikan sebagai bagian dari spesifikasi HTTP/1.1 dan menggantikan header sebelumnya (misalnya, Expires) yang digunakan untuk mendefinisikan kebijakan meng-cache respons. Semua browser modern mendukung Cache-Control, jadi itulah yang Anda perlukan.

<img src="images/http-cache-control-highlight.png"  alt="Contoh Cache-Control HTTP">

### "no-cache" dan "no-store"

“no-cache” menunjukkan bahwa respons yang dikembalikan tidak bisa digunakan untuk memenuhi permintaan berikutnya ke URL yang sama tanpa terlebih dahulu memeriksa server apakah respons telah berubah. Hasilnya, jika ada token validasi yang sesuai (ETag), no-cache akan mengakibatkan bolak-balik untuk memvalidasi respons yang di-cache, namun bisa meniadakan pengunduhan jika sumber daya belum berubah.

Sebaliknya, "no-store" jauh lebih sederhana. "no-store" hanya melarang browser dan semua cache perantara menyimpan setiap versi respons yang dikembalikan&mdash;misalnya, yang berisi data pribadi atau data perbankan privat. Setiap kali pengguna meminta aset ini, permintaan dikirim ke server, dan respons lengkap akan diunduh.

### "public" vs. "private"

Jika respons ditandai sebagai "public", maka respons bisa di-cache, sekalipun memiliki autentikasi HTTP yang terkait dengannya, dan bahkan bila kode status respons tidak biasanya bisa di-cache. Sering kali, "public" tidak diperlukan, karena informasi caching eksplisit (seperti "max-age") menunjukkan respons bisa tetap di-cache.

Sebaliknya, browser bisa meng-cache respons "private". Akan tetapi, respons ini biasanya ditujukan untuk pengguna tunggal, sehingga cache perantara tidak dimungkinkan untuk meng-cache-nya. Misalnya, browser pengguna bisa meng-cache laman HTML berisi informasi pengguna privat, namun CDN tidak bisa meng-cache laman tersebut.

### "max-age"

Direktif ini menetapkan waktu maksimum dalam detik dari respons yang boleh diambil untuk digunakan kembali dari waktu permintaan ini. Misalnya, "max-age=60" menunjukkan bahwa respons bisa di-cache dan digunakan kembali selama 60 detik berikutnya.

## Mendefinisikan kebijakan Cache-Control yang optimal

<img src="images/http-cache-decision-tree.png"  alt="Meng-cache pohon keputusan">

Ikuti pohon keputusan di atas untuk menentukan kebijakan caching yang optimal bagi sumber daya tertentu, atau serangkaian sumber daya yang digunakan oleh aplikasi Anda. Idealnya, Anda harus berusaha meng-cache sebanyak mungkin respons pada klien selama mungkin, dan menyediakan token validasi untuk setiap respons untuk mengaktifkan validasi ulang yang efisien.

<table class="responsive">
<thead>
  <tr>
    <th colspan="2">Direktif Cache-Control &amp; Penjelasan</th>
  </tr>
</thead>
<tr>
  <td data-th="cache-control">max-age=86400</td>
  <td data-th="explanation">Respons bisa di-cache oleh browser dan cache perantara (yaitu "public"-nya) hingga 1 hari (60 detik x 60 menit x 24 jam).</td>
</tr>
<tr>
  <td data-th="cache-control">private, max-age=600</td>
  <td data-th="explanation">Respons bisa di-cache oleh browser klien hanya selama 10 menit (60 detik x 10 menit).</td>
</tr>
<tr>
  <td data-th="cache-control">no-store</td>
  <td data-th="explanation">Respons tidak diizinkan untuk di-cache dan harus diambil dalam secara penuh pada setiap permintaan.</td>
</tr>
</table>

Sesuai dengan Arsip HTTP, di antara 300.000 situs teratas (menurut peringkat Alexa), browser bisa meng-cache [hampir setengah dari semua respons yang telah diunduh](http://httparchive.org/trends.php#maxage0), yang merupakan penghematan besar untuk penayangan laman dan kunjungan berulang. Tentu saja, itu tidak berarti bahwa aplikasi khusus Anda bisa meng-cache 50% dari sumber daya. Beberapa situs bisa meng-cache lebih dari 90% sumber dayanya, sementara situs lain mungkin memiliki banyak data privat atau sesuai-waktu yang tidak bisa di-cache sama sekali.

**Audit laman Anda untuk mengidentifikasi sumber daya mana yang bisa di-cache serta pastikan sumber daya mengembalikan header Cache-Control dan header ETag yang sesuai.**

## Tidak memvalidkan dan memperbarui respons yang di-cache

### TL;DR {: .hide-from-toc }
* Respons yang di-cache secara lokal digunakan hingga sumber daya "kedaluwarsa".
* Penyematan sidik jari materi file dalam URL memungkinkan Anda memaksa klien untuk memperbarui ke versi respons yang baru.
* Setiap aplikasi perlu mendefinisikan hierarki cache-nya sendiri agar kinerjanya optimal.


Semua permintaan HTTP yang dibuat oleh browser akan dirutekan terlebih dahulu ke cache browser untuk memeriksa apakah ada respons cache valid yang bisa digunakan untuk memenuhi permintaan. Jika ada kecocokan, respons akan dibaca dari cache sehingga meniadakan latensi jaringan dan biaya data yang ditimbulkan oleh transfer. 

**Akan tetapi, bagaimana jika Anda ingin memperbarui atau tidak memvalidkan respons yang di-cache?** Misalnya, anggaplah Anda telah memberi tahu pengunjung untuk meng-cache stylesheet CSS hingga 24 jam (max-age=86400), namun desainer baru saja menerapkan pembaruan yang Anda ingin sediakan bagi semua pengguna. Bagaimana Anda memberi tahu semua pengunjung yang memiliki apa yang kini adalah salinan CSS di-cache yang telah "usang" agar memperbarui cache-nya? Anda tidak bisa melakukannya, setidaknya tanpa mengubah URL sumber daya.

Setelah browser meng-cache respons, versi yang di-cache akan digunakan hingga tidak lagi baru, sebagaimana ditentukan oleh max-age atau expires, atau hingga dikeluarkan dari cache karena alasan lain&mdash; misalnya, pengguna menghapus cache browsernya. Akibatnya, pengguna berbeda mungkin akhirnya menggunakan versi berbeda dari file saat laman dikonstruksikan; pengguna yang baru menarik sumber daya akan menggunakan versi baru, sementara pengguna yang meng-cache salinan lebih awal (namun masih valid) akan menggunakan respons versi lebih lama.

 **Jadi, bagaimana kita bisa mendapatkan yang terbaik dari kedua hal itu: caching sisi-klien dan pembaruan cepat?** Anda bisa mengubah URL sumber daya dan memaksa pengguna mengunduh respons baru kapan saja materinya berubah. Biasanya, Anda melakukannya dengan menyematkan sidik jari file, atau nomor versi, dalam nama file-nya&mdash;misalnya, style.**x234dff**.css.

<img src="images/http-cache-hierarchy.png"  alt="Hierarki cache">

Kemampuan mendefinisikan kebijakan caching per-sumber daya memungkinkan Anda mendefinisikan "hierarki cache" yang memungkinkan Anda mengontrol tidak hanya berapa lama masing-masing di-cache, namun juga seberapa cepat pengunjung melihat versi baru. Untuk mengilustrasikannya, analisis contoh di atas:

* HTML ditandai sebagai "no-cache", yang berarti browser akan selalu memvalidasi ulang dokumen pada setiap permintaan dan mengambil versi terbaru jika materi berubah. Selain itu, di dalam markup HTML, Anda menyematkan sidik jari dalam URL untuk aset CSS dan JavaScript: jika materi file tersebut berubah, maka HTML laman juga berubah, dan salinan baru respons HTML akan diunduh.
* CSS boleh di-cache oleh browser dan cache perantara (misalnya, CDN), dan disetel agar kedaluwarsa dalam waktu 1 tahun. Perhatikan, Anda bisa menggunakan "kedaluwarsa yang jauh lebih lama" dari 1 tahun dengan aman karena Anda menyematkan sidik jari file dalam nama file-nya: jika CSS diperbarui, URL juga akan berubah.
* JavaScript juga diatur untuk berakhir dalam 1 tahun, namun ditandai sebagai pribadi, mungkin karena JavaScript mengandung beberapa data pribadi pengguna yang tidak boleh di-cache oleh CDN.
* Gambar di-cache tanpa versi atau sidik jari unik dan diatur untuk berakhir dalam 1 hari.

Kombinasi ETag, Cache-Control, dan URL unik memungkinkan Anda memberikan yang terbaik dari kedua sisi: waktu kedaluwarsa yang lama, kontrol atas tempat meng-cache respons, dan pembaruan sesuai permintaan.

## Daftar periksa caching

Tidak ada satu kebijakan cache yang terbaik. Bergantung pada pola lalu lintas Anda, tipe data yang disajikan, dan persyaratan khusus aplikasi untuk kesegaran data, Anda harus mendefinisikan dan mengonfigurasi setelan per sumber daya yang sesuai, serta keseluruhan "hierarki caching".

Beberapa tip dan teknik untuk diingat saat Anda mengerjakan strategi caching:

* **Gunakan URL yang konsisten:** jika Anda menyajikan materi yang sama pada URL berbeda, maka materi itu bisa diambil dan disimpan berulang kali. Tip: perhatikan, [URL membedakan huruf besar dan kecil](http://www.w3.org/TR/WD-html40-970708/htmlweb.html).
* **Pastikan server menyediakan token validasi (ETag):** token validasi meniadakan kebutuhan untuk mentransfer byte yang sama bila sumber daya belum berubah di server.
* **Identifikasilah sumber daya yang bisa di-cache oleh perantara:** yang memiliki respons identik bagi semua pengguna adalah calon paling cocok untuk di-cache oleh CDN dan perantara lainnya.
* **Tentukan masa pakai cache optimal untuk setiap sumber daya:** sumber daya berbeda mungkin memiliki persyaratan penyegaran yang berbeda. Audit dan tentukan max-age masing-masing.
* **Tentukan hierarki cache terbaik untuk situs Anda:** kombinasi URL sumber daya dengan sidik jari materi, dan masa pakai singkat atau masa pakai tanpa-cache untuk dokumen HTML memungkinkan Anda mengontrol seberapa cepat klien mengambil pembaruan.
* **Minimalkan churn:** sebagian sumber daya diperbarui lebih sering daripada yang lainnya. Jika ada bagian tertentu dari sumber daya (misalnya, fungsi JavaScript, atau serangkaian gaya CSS) yang sering diperbarui, pertimbangkan untuk menyediakan kode itu sebagai sebuah file terpisah. Melakukan hal tersebut memungkinkan materi yang tersisa (misalnya, kode pustaka yang tidak sering berubah), untuk diambil dari cache dan meminimalkan jumlah materi yang telah diunduh setiap kali pembaruan diambil.



{# wf_devsite_translation #}
