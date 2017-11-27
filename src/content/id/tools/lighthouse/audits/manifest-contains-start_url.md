project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Dokumentasi referensi untuk "Manifes Berisi start_url" audit Lighthouse.

{# wf_updated_on: 2016-09-21 #}
{# wf_published_on: 2016-09-21 #}

# Manifes Berisi Start URL  {: .page-title }

## Mengapa audit itu penting {: #why }

Setelah aplikasi web Anda ditambahkan ke layar beranda pengguna, properti `start_url`
di Manifes Aplikasi Web menentukan laman yang terlebih dulu dimuat aplikasi Anda
ketika pengguna meluncurkan aplikasi dari layar beranda.

Bila tidak terdapat properti `start_url`, maka browser mengatur default ke laman
apa pun yang aktif saat pengguna memutuskan untuk menambahkan aplikasi ke layar beranda.

## Cara untuk lulus audit {: #how }

Tambahkan properti `start_url` di Manifes Aplikasi Web Anda.

    {
      ...
      "start_url": ".",
      ...
    }

Lihat [Manifest Exists](manifest-exists#how)
untuk daftar panduan yang mengajarkan Anda cara
mengimplementasikan dan menguji dukungan "Add to Homescreen" dalam aplikasi Anda dengan benar.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse mengambil manifes dan memverifikasi bahwa itu memiliki properti `start_url`.
Manifes yang diambil Lighthouse berbeda dari yang digunakan Chrome
pada laman, yang mungkin bisa menyebabkan hasil yang tidak akurat.


{# wf_devsite_translation #}
