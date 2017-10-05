project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Dokumentasi referensi untuk "Manifes Berisi nama" audit Lighthouse.

{# wf_updated_on: 2016-09-21 #}
{# wf_published_on: 2016-09-21 #}

# Manifes Berisi Nama  {: .page-title }

## Mengapa audit itu penting {: #why }

Properti `name` dari Manifes Aplikasi Web adalah nama terbaca-manusia dari aplikasi
Anda karena itu ditujukan untuk ditampilkan ke perangkat seluler pengguna.

Bila `short_name` tidak disediakan, maka `name` adalah label yang akan
digunakan pada homescreen perangkat seluler, di sebelah ikon aplikasi Anda.

## Cara untuk lulus audit {: #how }

Tambahkan properti `name` di Manifes Aplikasi Web Anda.

    {
      ...
      "name": "Air Horner",
      ...
    }

[Panjang
maksimum](https://developer.chrome.com/apps/manifest/name) Chrome adalah 45 karakter.

Lihat [Manifest Exists](manifest-exists#how)
untuk daftar panduan yang mengajarkan Anda cara
mengimplementasikan dan menguji dukungan "Add to Homescreen" dalam aplikasi Anda dengan benar.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse mengambil manifes dan memverifikasi bahwa itu memiliki properti `name`.
Manifes yang diambil Lighthouse berbeda dari yang digunakan Chrome
pada laman, yang mungkin bisa menyebabkan hasil yang tidak akurat.


{# wf_devsite_translation #}
