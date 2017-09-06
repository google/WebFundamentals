project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Dokumentasi referensi untuk "Manifes Berisi theme_color" audit Lighthouse.

{# wf_updated_on: 2016-09-21 #}
{# wf_published_on: 2016-09-21 #}

# Manifes Berisi Warna Tema  {: .page-title }

## Mengapa audit itu penting {: #why }

Ketika pengguna mengakses aplikasi Anda pada Chrome untuk Android, properti `theme_color` dari
Manifes Aplikasi Web menentukan warna bilah alamat. Ini akan
berlaku, apakah pengguna menambahkan aplikasi ke layar beranda, atau tidak.

## Cara untuk lulus audit {: #how }

Tambahkan properti `theme_color` di Manifes Aplikasi Web Anda. Nilainya bisa semua warna
CSS yang valid.

    {
      ...
      "theme_color": "cornflowerblue",
      ...
    }

Lihat [Manifest Exists](manifest-exists#how)
untuk daftar panduan yang mengajarkan Anda cara
mengimplementasikan dan menguji dukungan "Add to Homescreen" dalam aplikasi Anda dengan benar.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Audit diteruskan jika manifes berisi properti `theme_color`.
Manifes yang diambil Lighthouse berbeda dari yang digunakan Chrome
pada laman, yang mungkin bisa menyebabkan hasil yang tidak akurat. Lighthouse tidak
memvalidasi bahwa nilainya adalah warna CSS yang valid.


{# wf_devsite_translation #}
