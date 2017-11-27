project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: RAIL adalah model kinerja yang berfokus pada pengguna. Setiap aplikasi web memiliki empat aspek berbeda pada siklus hidupnya dan kinerja yang pas pada aspek tersebut dalam cara yang sangat berbeda: Respons, Animasi, Diam, Muat.

{# wf_updated_on: 2015-06-07 #}
{# wf_published_on: 2015-06-07 #}

# Ukur Kinerja dengan Model RAIL {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}

RAIL adalah model kinerja yang berfokus pada pengguna. Setiap aplikasi web memiliki keempat aspek berbeda ini pada siklus hidupnya dan kinerjanya bergantung pada keempat aspek tersebut dalam beragam cara:

![Model kinerja RAIL](images/rail.png)


### TL;DR {: .hide-from-toc }

- Fokus pada pengguna; sasaran akhir Anda bukanlah membuat situs bekerja cepat di suatu perangkat, melainkan menyenangkan pengguna.
- Respons pengguna dengan segera; akui masukan pengguna dalam waktu kurang dari 100 md.
- Saat menganimasikan atau menggulir, hasilkan bingkai dalam waktu kurang dari 10 md.
- Maksimalkan waktu diam thread utama.
- Usahakan tetap berinteraksi dengan pengguna; sajikan materi interaktif dalam waktu kurang dari 1000 md.


## Fokus pada pengguna

Jadikan pengguna titik fokus upaya kinerja Anda.
Sebagian besar waktu yang dihabiskan pengguna di situs Anda bukanlah untuk menunggu situs dimuat,
melainkan menunggunya merespons saat digunakan.
Pahami cara pengguna mempersepsi keterlambatan:

<table class="responsive">
  <thead>
      <th colspan="2">Tunda &amp; Reaksi Pengguna</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Delay">0 - 16 md</td>
      <td data-th="User Reaction">Orang sangat bagus dalam melacak
      gerakan dan tidak suka bila animasi tidak berjalan mulus. Pengguna
      mempersepsi animasi berjalan mulus asalkan 60 bingkai baru dirender
      setiap detiknya. Itu adalah 16 md per bingkai, termasuk waktu yang diperlukan
      browser untuk menggambar bingkai baru ke layar, yang memberi waktu pada aplikasi
      sekitar 10 md untuk menghasilkan sebuah bingkai.</td>
    </tr>
    <tr>
      <td data-th="Delay">0 - 100 md</td>
      <td data-th="User Reaction">Respons aksi pengguna dalam rentang waktu ini, maka pengguna akan merasa bahwa hasilnya seketika. Jika lebih lama akan merusak hubungan antara aksi dan reaksi.</td>
    </tr>
    <tr>
      <td data-th="Delay">100 - 300 md</td>
      <td data-th="User Reaction">Pengguna akan mengalami sedikit penundaan.</td>
    </tr>
    <tr>
      <td data-th="Delay">300 - 1000 md</td>
      <td data-th="User Reaction">Dalam rentang ini, berbagai hal akan terasa sebagai bagian dari kemajuan tugas yang alami dan kontinu. Bagi sebagian besar pengguna di web, memuat laman atau mengubah tampilan menyatakan sebuah tugas.</td>
    </tr>
    <tr>
      <td data-th="Delay">1000+ md</td>
      <td data-th="User Reaction">Di atas 1 detik, pengguna akan kehilangan fokus pada tugas yang sedang dikerjakan.</td>
    </tr>
    <tr>
      <td data-th="Delay">10.000+ md</td>
      <td data-th="User Reaction">Pengguna akan frustrasi dan mungkin akan meninggalkan tugas; mereka mungkin saja tidak kembali lagi nanti.</td>
    </tr>
  </tbody>
</table>

## Respons: respons dalam waktu kurang dari 100 md

Anda memiliki waktu 100 md untuk merespons masukan pengguna sebelum pengguna merasakan jeda waktu.
Ini berlaku untuk hampir semua masukan, mulai dari mengeklik tombol, beralih kontrol pada
formulir, atau memulai animasi. Ini tidak berlaku pada menyeret atau menggulir melalui
sentuhan.

Jika Anda tidak merespons, hubungan antara aksi dan reaksi akan rusak. Pengguna akan merasakannya.

Meskipun sepertinya tindakan pengguna direspons dengan segera,
itu tidak selalu benar.
Gunakan rentang 100 md ini untuk melakukan pekerjaan mahal lainnya, namun berhati-hatilah agar tidak memblokir pengguna.
Jika memungkinkan, lakukan pekerjaan di latar belakang.

Untuk tindakan yang membutuhkan waktu lebih dari 500 md, selalu sediakan masukan.

## Animasi: hasilkan bingkai dalam waktu 10 md

Animasi bukan sekadar efek UI yang keren. Misalnya, menggulir dan menyeret dengan
sentuhan adalah tipe animasi.

Pengguna akan merasa bila laju bingkai animasi bervariasi.
Sasaran Anda adalah menghasilkan 60 bingkai per detik, dan setiap bingkai harus melalui semua langkah ini:

![Langkah-langkah merender bingkai](images/render-frame.png)

Dari sudut pandang matematika murni, setiap bingkai dianggarkan sekitar 
16 md (1000 md / 60 bingkai per detik = 16,66 md per bingkai). Akan tetapi, karena
browser membutuhkan waktu untuk menggambar bingkai baru ke layar, **kode Anda
harus selesai dieksekusi dalam waktu kurang dari 10 md**. 

Di titik tekanan tinggi seperti animasi, kuncinya adalah tidak melakukan apa pun
sebisa mungkin, dan jika tidak bisa, maka harus minimum. Bila memungkinkan, manfaatkan respons
100 md untuk menghitung pekerjaan mahal lebih awal sehingga Anda bisa memaksimalkan
peluang mencapai 60 fps.

Untuk informasi selengkapnya, lihat
[Kinerja Rendering](/web/fundamentals/performance/rendering/).

## Diam: maksimalkan waktu diam

Gunakan waktu diam untuk menyelesaikan tugas yang ditangguhkan. Misalnya, minimumkan pramuat data sehingga aplikasi Anda dimuat dengan cepat, dan gunakan waktu diam untuk memuat sisa data.

Pekerjaan yang ditangguhkan harus dikelompokkan ke dalam beberapa blok sekitar 50 md. Jika pengguna mulai berinteraksi, prioritas tertinggi adalah meresponsnya. 

Untuk mencapai respons <100 md,
aplikasi harus menyerahkan kontrol kembali ke thread utama setiap <50 md,
sehingga bisa mengeksekusi saluran pikselnya, menanggapi masukan pengguna, dan seterusnya.

Dengan mengerjakan blok 50 md akan memungkinkan tugas diselesaikan sekaligus memastikan respons seketika.

## Muat: sajikan materi dalam waktu kurang dari 1000 md

Muat situs Anda dalam waktu kurang dari 1 detik. Jika tidak, perhatian pengguna akan teralih,
dan persepsi mereka terhadap tugas akan terganggu.

Fokus pada
[mengoptimalkan jalur rendering penting](/web/fundamentals/performance/critical-rendering-path/)
untuk membuka blokir rendering.

Anda tidak harus memuat semuanya dalam waktu kurang dari 1 detik untuk menghasilkan persepsi pemuatan lengkap. Aktifkan rendering progresif dan selesaikan sebagian tugas di latar belakang. Tangguhkan pemuatan yang tidak penting ke jangka waktu diam (lihat [kursus Udacity, Optimalisasi Kinerja Situs Web](https://www.udacity.com/course/website-performance-optimization--ud884) untuk informasi selengkapnya).

## Rangkuman metrik RAIL utama

Untuk mengevaluasi situs Anda dengan metrik RAIL, gunakan [alat (bantu) Timeline](/web/tools/chrome-devtools/profile/evaluate-performance/timeline-tool) Chrome DevTools untuk merekam tindakan pengguna. Kemudian periksa waktu rekaman di Timeline dengan metrik RAIL utama ini:

<table>
  <thead>
      <th>Langkah RAIL</th>
      <th>Metrik Utama</th>
      <th>Tindakan Pengguna</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="RAIL Step"><strong>Respons</strong></td>
      <td data-th="Key Metric">Latensi masukan (dari ketukan hingga penggambaran) < 100 md.</td>
      <td data-th="User Test">Pengguna mengetuk tombol (misalnya, membuka navigasi).</td>
    </tr>
    <tr>
      <td data-th="RAIL Step"><strong>Animasi</strong></td>
      <td data-th="Key Metric">Setiap pekerjaan bingkai (dari JS hingga penggambaran) selesai < 16 md.</td>
      <td data-th="User Test">Pengguna menggulir laman, menyeret jari (misalnya,
        untuk membuka menu), atau melihat animasi. Saat menyeret, respons aplikasi
        terikat pada posisi jari (mis., menarik untuk menyegarkan,
        atau menggeser korsel. Metrik ini hanya berlaku pada
        fase penyeretan kontinu, bukan awalnya.
      </td>
    </tr>
    <tr>
      <td data-th="RAIL Step"><strong>Diam</strong></td>
      <td data-th="Key Metric">Pekerjaan JS thread utama dipotong-potong menjadi tidak lebih dari 50 md.</td>
      <td data-th="User Test">Pengguna tidak berinteraksi dengan laman, namun thread utama harus cukup tersedia untuk menangani masukan pengguna berikutnya.</td>
    </tr>
    <tr>
      <td data-th="RAIL Step"><strong>Muat</strong></td>
      <td data-th="Key Metric">Laman dianggap siap digunakan dalam waktu 1000 md.</td>
      <td data-th="User Test">Pengguna memuat laman dan melihat materi jalur penting.</td>
    </tr>
  </tbody>
</table> 




{# wf_devsite_translation #}
