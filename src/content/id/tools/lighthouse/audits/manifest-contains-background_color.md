project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Dokumentasi referensi untuk "Manifes Berisi background_color" audit Lighthouse.

{# wf_updated_on: 2016-09-21 #}
{# wf_published_on: 2016-09-21 #}

# Manifes Berisi Warna Latar Belakang  {: .page-title }

## Mengapa audit itu penting {: #why }

Ketika aplikasi web memuat dari layar beranda pengguna, browser menggunakan properti
`background_color` untuk menggambar warna latar belakang browser selagi
aplikasi dimuat. Hal ini menciptakan transisi yang mulus antara peluncuran aplikasi dan
pemuatan materi aplikasi.

## Cara untuk lulus audit {: #how }

Tambahkan properti `background_color` di Manifes Aplikasi Web Anda. Nilainya bisa semua warna
CSS yang valid.

    {
      ...
      "background_color": "cornflowerblue",
      ...
    }

Lihat [Manifest Exists](manifest-exists#how)
untuk daftar panduan yang mengajarkan Anda cara
mengimplementasikan dan menguji dukungan "Add to Homescreen" dalam aplikasi Anda dengan benar.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Audit diteruskan jika manifes berisi properti `background_color`.
Manifes yang diambil Lighthouse berbeda dari yang digunakan Chrome
pada laman, yang mungkin bisa menyebabkan hasil yang tidak akurat. Lighthouse tidak
memvalidasi bahwa nilainya adalah warna CSS yang valid.


{# wf_devsite_translation #}
