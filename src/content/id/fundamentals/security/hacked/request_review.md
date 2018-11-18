project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2018-03-14 #}
{# wf_published_on: 2015-01-01 #}
{# wf_blink_components: N/A #}

# Meminta peninjauan {: .page-title }

Anda harus meminta peninjauan dari Google untuk menghapus tanda pada halaman atau situs sebagai
berbahaya atau berpotensi menipu pengguna.

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="lc3UjnDcMxo"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

## Anda membutuhkan

*   Pengetahuan tentang perintah terminal/shell

## Yang akan Anda lakukan

### 1. Prasyarat

Sebelum meminta peninjauan, konfirmasi bahwa Anda telah melakukan langkah berikut:

* Memverifikasi kepemilikan situs di Search Console
* Membersihkan situs dari vandalisme peretas
* Memperbaiki kerentanan
* Menjadikan situs bersih Anda kembali online

### 2. Periksa kembali bahwa halaman Anda tersedia dan bersih

Agar aman, gunakan Wget atau cURL untuk melihat halaman situs Anda, seperti
halaman beranda dan URL yang dimodifikasi oleh peretas; ini seharusnya sudah bersih sekarang. Jika demikian,
dan Anda yakin bahwa hal yang sama juga berlaku untuk halaman lainnya di situs,
inilah saat yang tepat untuk meminta peninjauan.

Catatan: Halaman Anda harus tersedia untuk di-crawl oleh Googlebot guna memastikan bahwa
halaman tersebut bersih. Pastikan bahwa halaman tidak di-crawl robot atau diblokir dari
pengindeksan oleh perintah atau tag META robot `noindex`.

### 3. Minta peninjauan

Sebelum meminta peninjauan:

* **pastikan bahwa masalah sudah sepenuhnya diperbaiki**;
meminta peninjauan jika masih terdapat masalah hanya akan memperpanjang jangka waktu
penandaan situs Anda sebagai berbahaya.

* **periksa kembali di mana Anda harus meminta peninjauan**; proses peninjauan akan
dilakukan dalam alat khusus, tergantung pada masalah yang dihadapi situs Anda.
Silakan merujuk ke saluran di bawah ini.


#### A. Situs yang diretas

*Anda menerima pemberitahuan situs yang diretas di
[**Manual Actions report**](https://www.google.com/webmasters/tools/manual-action)
dari Search Console:*

1. Setelah Anda menyelesaikan langkah-langkah pembersihan secara berurutan,
  Anda bisa masuk ke [Manual Actions](https://www.google.com/webmasters/tools/manual-action)
  report lagi dan menemukan masalahnya baik sebagai kecocokan di seluruh situs, atau kecocokan
  sebagian.
2. Pilih **Request a review**.

    Untuk mengirimkan peninjauan, berikan informasi selengkapnya tentang apa
    yang Anda lakukan untuk membersihkan situs. Untuk setiap kategori spam yang diretas, Anda bisa menulis
    kalimat yang menjelaskan cara situs dibersihkan (misalnya, "Untuk URL
    yang diretas dengan injeksi konten, saya menghapus konten berisi spam dan memperbaiki
    kerentanannya: mengupdate plugin yang usang.").


#### B. Software yang tidak diinginkan (termasuk malware)

*Anda menerima pemberitahuan malware atau software yang tidak diinginkan di
[**Security Issues report**](https://www.google.com/webmasters/tools/security-issues)
dari Search Console:*

1. Buka
  [**Security Issues report**](https://www.google.com/webmasters/tools/security-issues)
  lagi di Search Console. Laporan tersebut mungkin masih menunjukkan peringatan dan contoh
  URL terinfeksi yang Anda lihat sebelumnya.
2. Pilih **Request a review**.

    Untuk mengirimkan peninjauan, berikan informasi selengkapnya tentang
    apa yang Anda lakukan untuk menghapus pelanggaran kebijakan dari situs Anda. Misalnya,
    "Saya menghapus kode pihak ke-3 yang menyebarkan malware di situs web
    saya dan menggantinya dengan versi kode yang lebih modern".


*Anda tidak menerima pemberitahuan malware atau software yang tidak diinginkan di
[**Security Issues report**](https://www.google.com/webmasters/tools/security-issues)
dari Search Console, tetapi Anda menerima pemberitahuan di akun AdWords Anda:*

1. Minta peninjauan melalui
  [pusat dukungan AdWords](https://support.google.com/adwords/contact/site_policy).


#### C. Phishing atau Rekayasa Sosial

*Anda menerima pemberitahuan phishing di
[**Security Issues report**](https://www.google.com/webmasters/tools/security-issues)
dari Search Console:*

1. Buka
  [**Security Issues report**](https://www.google.com/webmasters/tools/security-issues)
  lagi di Search Console. Laporan tersebut mungkin masih menunjukkan peringatan dan contoh
  URL terinfeksi yang Anda lihat sebelumnya.
2. Pilih **Request a review**.

    Untuk mengirimkan peninjauan, berikan informasi selengkapnya tentang
    apa yang Anda lakukan untuk menghapus pelanggaran kebijakan dari situs Anda. Misalnya,
    "Saya menghapus halaman yang meminta pengguna untuk memasukkan informasi pribadi".

3. Anda juga bisa meminta peninjauan di
  [google.com/safebrowsing/report_error/](https://www.google.com/safebrowsing/report_error/).
  Selain berfungsi sebagai alat pelaporan untuk pemilik situs yang yakin bahwa halaman mereka
  salah ditandai sebagai phishing, laporan ini akan memicu peninjauan
  halaman phishing yang telah dibersihkan untuk mencabut peringatannya.

### 4. Tunggu proses peninjauan

* **Waktu proses peninjauan situs yang diretas dengan spam:** Proses peninjauan situs yang diretas
  dengan spam mungkin memerlukan waktu hingga beberapa minggu. Alasannya karena peninjauan
  spam bisa melibatkan penyelidikan manual atau pemrosesan ulang seluruh
  halaman yang diretas. Jika peninjauan disetujui, Security Issues tidak lagi
  menampilkan jenis kategori atau contoh URL yang diretas.
* **Waktu pemrosesan peninjauan malware:** Peninjauan situs yang terinfeksi
  malware memerlukan waktu proses beberapa hari. Setelah peninjauan selesai, tanggapan
  akan diberikan dalam bagian **Messages** di Search Console.
* **Waktu pemrosesan peninjauan phishing:** Proses peninjauan phishing bisa memakan waktu sekitar
  satu hari. Jika berhasil, peringatan phising yang bisa terlihat oleh pengguna akan
  dihapus dan halaman Anda dapat muncul kembali di hasil penelusuran.

Jika Google menemukan bahwa situs Anda telah bersih, peringatan dari browser dan
hasil penelusuran akan dihapus dalam waktu 72 jam.

Jika Google menetapkan bahwa Anda belum memperbaiki masalahnya, Security
Issues report di Search Console akan menampilkan lebih banyak contoh URL
terinfeksi untuk membantu penyelidikan Anda berikutnya. Peringatan malware, phishing atau situs
yang diretas spam akan tetap ada dalam hasil penelusuran dan/atau browser sebagai
peringatan untuk melindungi pengguna.

### Langkah akhir

* **Jika permintaan Anda disetujui,** lakukan verifikasi bahwa situs berfungsi seperti yang diharapkan:
  halaman dimuat dengan semestinya dan link dapat diklik. Untuk menjaga keamanan situs,
  sebaiknya semua pemilik situs mengimplementasikan rencana
  pemeliharaan dan keamanan yang dibuat di [Membersihkan dan memelihara situs Anda](clean_site).

    Untuk informasi selengkapnya, pertimbangkan referensi berikut dari
    [StopBadware](https://www.stopbadware.org):

      * [Preventing badware: basics](https://www.stopbadware.org/prevent-badware-basics)
      * [Additional resources: hacked sites](https://www.stopbadware.org/hacked-sites-resources)

* **Jika permintaan Anda tidak disetujui,** periksa kembali situs apakah terdapat
  [malware](hacked_with_malware) atau [spam](hacked_with_spam), atau
  perubahan maupun file baru apa pun yang dibuat oleh peretas. Atau, pertimbangkan
  untuk meminta bantuan lebih lanjut dari
  [para pakar dalam tim dukungan Anda](support_team).
