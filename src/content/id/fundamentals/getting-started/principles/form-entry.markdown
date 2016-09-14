---
title: "Pengisian Form"
description: "Apakah itu melakukan pembelian, menerima komentar atau bergabung dengan milis, pengalaman konversi pengguna harus diusahakan tanpa cela."
translators:
  - abdshomad
---

<p class="intro">
Sediakan pengalaman pendaftaran yang menyenangkan dengan bentuk form yang mudah.
</p>

{% include shared/toc.liquid %}

## 14. Persingkat pengisian informasi

Pindahkan secara otomatis ke isian berikutnya ketika pengguna menekan Enter. 
Secara umum, semakin sedikit ketukan yang harus dilakukan, semakin baik. 

## 15. Pilih input yang paling mudah

Gunakan [jenis masukan](/web/fundamentals/design-and-ui/input/forms/choose-the-best-input-type) yang paling sesuai.
Gunakan elemen seperti [`datalist`](/web/fundamentals/design-and-ui/input/forms/choose-the-best-input-type#offer-suggestions-during-input-with-datalist) 
untuk menyediakan nilai yang disarankan.

## 16. Sediakan kalender visual untuk pemilihan tanggal

Tandai tanggal mulai dan akhir dengan jelas. 
Pengguna tidak perlu meninggalkan situs dan memeriksa aplikasi kalender hanya untuk memilih tanggal yang sesuai.

<div class="mdl-grid">
  <figure class="mdl-cell mdl-cell--6-col">
    <img src="images/forms-calendar-good.png">
    <figcaption class="wf-figcaption-good">Lakukan: gunakan widget kalender bila memungkinkan.</figcaption>
  </figure>
</div>

## 17. Minimalkan kesalahan pengisian dengan menampilkan label dan validasi real-time 

Beri label setiap isian dengan benar dan validasi isian secara real-time.

<div class="mdl-grid">
  <figure class="mdl-cell mdl-cell--6-col">
    <img src="images/forms-multipart-good.png">
    <figcaption class="wf-figcaption-good">Lakukan: isikan konten secara otomatis bila memungkinkan.</figcaption>
  </figure>
</div>

## 18. Desain formulir yang efisien

Manfaatkan [autofill](/web/fundamentals/design-and-ui/input/forms/label-and-name-inputs#use-metadata-to-enable-auto-complete) 
sehingga pengguna dapat dengan mudah melengkapi formulir dengan data yang sudah diisi terlebih dahulu oleh aplikasi. 
Bantu isikan informasi yang telah diketahui. 
Misalnya, ketika mengisikan alamat pengiriman dan penagihan, 
cobalah untuk menggunakan [`requestAutocomplete`](/web/fundamentals/design-and-ui/input/forms/use-request-auto-complete) 
atau bantulah pengguna untuk menyalin alamat pengiriman mereka ke alamat penagihan (atau sebaliknya).

