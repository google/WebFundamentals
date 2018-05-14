project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Jumlah data yang telah diunduh aplikasi terus meningkat dari waktu ke waktu. Untuk menghasilkan kinerja terbaik, Anda harus mengoptimalkan pengiriman data semaksimal mungkin.


{# wf_updated_on: 2015-10-05 #}
{# wf_published_on: 2014-03-31 #}

# Mengoptimalkan Efisiensi Materi {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

Aplikasi web kita terus berkembang dalam cakupan, ambisi, dan fungsionalitasnya -- hal ini menggembirakan. Akan tetapi, upaya yang tak surut menuju web yang lebih kaya mendorong tren lain: jumlah data yang diunduh oleh setiap aplikasi terus meningkat secara stabil. Untuk memperoleh kinerja terbaik kita perlu mengoptimalkan setiap dan masing-masing byte!

Seperti apa aplikasi web modern? [Arsip HTTP](http://httparchive.org/){: .external } bisa membantu kita menjawab pertanyaan ini. Proyek ini melacak bagaimana web dibangun dengan merayapi situs terpopuler secara berkala (lebih dari 300.000 situs dari daftar Alexa Top 1M) dan merekam serta mengumpulkan analisis mengenai jumlah sumber daya, tipe materi, dan metadata lainnya untuk masing-masing destinasi.

<img src="images/http-archive-trends.png"  alt="Tren Arsip HTTP">

<table class="">
<colgroup><col span="1"><col span="1"><col span="1"><col span="1"></colgroup>
<thead>
  <tr>
    <th></th>
    <th>Persentil ke-50</th>
    <th>Persentil ke-75</th>
    <th>Persentil ke-90</th>
  </tr>
</thead>
<tr>
  <td data-th="type">HTML</td>
  <td data-th="50%">13 KB</td>
  <td data-th="75%">26 KB</td>
  <td data-th="90%">54 KB</td>
</tr>
<tr>
  <td data-th="type">Gambar</td>
  <td data-th="50%">528 KB</td>
  <td data-th="75%">1.213 KB</td>
  <td data-th="90%">2.384 KB</td>
</tr>
<tr>
  <td data-th="type">JavaScript</td>
  <td data-th="50%">207 KB</td>
  <td data-th="75%">385 KB</td>
  <td data-th="90%">587 KB</td>
</tr>
<tr>
  <td data-th="type">CSS</td>
  <td data-th="50%">24 KB</td>
  <td data-th="75%">53 KB</td>
  <td data-th="90%">108 KB</td>
</tr>
<tr>
  <td data-th="type">Lainnya</td>
  <td data-th="50%">282 KB</td>
  <td data-th="75%">308 KB</td>
  <td data-th="90%">353 KB</td>
</tr>
<tr>
  <td data-th="type"><strong>Total</strong></td>
  <td data-th="50%"><strong>1.054 KB</strong></td>
  <td data-th="75%"><strong>1.985 KB</strong></td>
  <td data-th="90%"><strong>3.486 KB</strong></td>
</tr>
</table>

Data di atas merekam tren pertumbuhan jumlah byte yang diunduh untuk destinasi web populer antara Januari 2013 dan Januari 2014. Tentu saja, tidak setiap situs tumbuh pada laju yang sama atau membutuhkan jumlah data yang sama, sehingga alasan mengapa kami menyoroti kuantil berbeda di dalam distribusi ini: Ke-50 (median), ke-75, dan ke-90.

Situs median di awal 2014 terdiri dari 75 permintaan yang jumlah totalnya adalah 1.054 KB dari total byte yang ditransfer, dan total jumlah byte (dan permintaan) telah tumbuh pada laju yang stabil di sepanjang tahun sebelumnya. Angka ini sebenarnya sama sekali tidak mengagetkan, namun membawa implikasi kinerja penting: ya, kecepatan internet memang semakin cepat, namun peningkatan kecepatan ini memiliki laju berbeda di setiap negara, dan banyak pengguna masih tunduk pada pembatasan data dan skema pengukuran yang mahal - terutama di perangkat seluler.

Tidak seperti aplikasi desktop, aplikasi web tidak membutuhkan proses pemasangan terpisah: masukkan saja URL-nya maka kita sudah menjalankannya -- itulah fitur kunci dari web. Akan tetapi untuk mewujudkan hal ini **kita sering kali harus mengambil lusinan, bahkan ratusan, sumber daya berbeda, yang besarnya semua bisa hingga beberapa megabyte data dan harus disatukan dalam ratusan milidetik untuk memfasilitasi pengalaman web instan yang kita harapkan.**

Mencapai pengalaman web instan dengan mempertimbangkan semua keharusan ini bukanlah hal yang mudah, itulah mengapa mengoptimalkan efisiensi materi sangat penting: meniadakan unduhan tak perlu, mengoptimalkan enkode transfer dari setiap sumber daya melalui berbagai teknik kompresi, dan pemanfaatan cache jika memungkinkan untuk meniadakan unduhan yang tak perlu.


{# wf_devsite_translation #}
