project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Dua dari sekian kendala yang dihadapi developer saat melakukan migrasi ke HTTPS adalah konsep dan terminologi. Panduan ini memberikan ringkasan singkat mengenai kedua hal tersebut.

{# wf_updated_on: 2016-08-22 #}
{# wf_published_on: 2015-03-27 #}

# Istilah Keamanan yang Penting {: .page-title }

{% include "web/_shared/contributors/chrispalmer.html" %}
{% include "web/_shared/contributors/mattgaunt.html" %}
  
### TL;DR {: .hide-from-toc }

* Kunci privat/publik digunakan untuk menandatangani dan mendekripsi pesan antara browser dan server.
* Otoritas sertifikat (CA) adalah organisasi yang bertanggung jawab terhadap pemetaan antara kunci publik dan nama DNS publik (misalnya "www.foobar.com").
* Permintaan penandatanganan sertifikat (CSR) adalah format data yang membundel kunci publik bersama beberapa metadata tentang entitas yang memiliki kunci

## Apa yang dimaksud dengan pasangan kunci publik dan kunci privat?

**Pasangan kunci privat/publik** adalah sepasang angka yang sangat besar yang digunakan
sebagai kunci enkripsi dan dekripsi, serta sama-sama menggunakan relasi matematis
khusus. Sistem umum untuk pasangan kunci adalah **[RSA
cryptosystem](https://en.wikipedia.org/wiki/RSA_(cryptosystem)){: .external}**. **Kunci
publik** digunakan untuk mengenkripsi pesan, dan pesan hanya bisa didekripsi
dengan semestinya menggunakan **kunci privat**-nya. Server web mengiklankan
kunci publiknya ke seluruh dunia, dan klien (misalnya, browser web) menggunakannya untuk
mem-bootstrap saluran aman ke server.

## Apa yang dimaksud dengan otoritas sertifikat (CA)?

**Otoritas Sertifikat (CA)** adalah organisasi yang menjamin
pemetaan antara kunci publik dan nama DNS publik (misalnya "www.foobar.com").
Misalnya, bagaimana klien mengetahui apakah kunci publik tertentu memang kunci publik yang _benar_
untuk www.foobar.com? Sebelum diteliti keadaan yang sebenarnya, tidak ada cara untuk mengetahuinya. CA menjamin
suatu kunci sebagai kunci yang benar untuk sebuah situs dengan menggunakan
kunci privatnya sendiri untuk **[menandatangani
secara kriptografis](https://en.wikipedia.org/wiki/RSA_(cryptosystem)#Signing_messages){: .external}**
kunci publik situs web. Tanda tangan ini secara komputasi tidak dapat dipalsukan.
Browser (dan klien lainnya) memelihara **penyimpanan jangkar kepercayaan** berisi
kunci publik yang dimiliki oleh CA terkenal, dan mereka menggunakan kunci publik itu untuk
**memverifikasi secara kriptografis** tanda tangan CA.

**Sertifikat X.509** adalah format data yang membundel kunci publik bersama
beberapa metadata tentang entitas yang memiliki kunci. Untuk kasus web,
pemilik kunci adalah operator situs, dan metadata penting adalah nama DNS
server web tersebut. Bila klien menghubungkan ke server web HTTPS, server
web akan menyajikan sertifikatnya untuk diverifikasi oleh klien. Klien akan memverifikasi
apakah sertifikat tersebut telah berakhir, apakah nama DNS sama dengan nama
server yang berusaha dihubungi oleh klien, dan apakah trust anchor CA yang dikenal
telah menandatangani sertifikat. Umumnya, CA tidak secara langsung menandatangani sertifikat
server web; biasanya, ada **rangkaian sertifikat** yang menautkan trust
anchor, ke perantara penandatangan atau penandatangan, dan akhirnya ke sertifikat milik
server web sendiri (**entitas akhir**).

## Apa yang dimaksud dengan permintaan penandatanganan sertifikat (CSR)?

**Permintaan penandatanganan sertifikat (CSR)** adalah format data, seperti
sertifikat, yang membundel kunci publik bersama beberapa metadata tentang entitas
yang memiliki kunci. Akan tetapi, klien tidak menafsirkan CSR; melainkan CA yang melakukannya. Bila ingin
mendapatkan jaminan CA untuk kunci publik server web, kirim sebuah CSR ke CA tersebut. CA
akan memvalidasi informasi dalam CSR, dan menggunakannya untuk menghasilkan sertifikat.
CA kemudian akan mengirimkan sertifikat final, dan Anda memasang sertifikat tersebut (atau,
kemungkinan, rangkaian sertifikat) dan kunci privat di server web.


{# wf_devsite_translation #}
