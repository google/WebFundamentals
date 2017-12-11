project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Dokumentasi referensi untuk "Properti tampilan Manifes Telah Disetel" audit Lighthouse.

{# wf_updated_on: 2016-09-21 #}
{# wf_published_on: 2016-09-21 #}

# Properti Tampilan Manifes Telah Disetel  {: .page-title }

## Mengapa audit itu penting {: #why }

Ketika aplikasi diluncurkan dari layar beranda, Anda bisa menggunakan properti `display`
di Manifes Aplikasi Web untuk menentukan mode tampilan bagi aplikasi.

## Cara untuk lulus audit {: #how }

Tambahkan properti `display` ke Manifes Aplikasi Web Anda dan setel ke salah satu
nilai berikut: `fullscreen`, `standalone`, atau `browser`.

    {
      ...
      "display": "fullscreen",
      ...
    }

Lihat [Referensi MDN untuk properti
tampilan](https://developer.mozilla.org/en-US/docs/Web/Manifest#display) untuk
informasi selengkapnya tentang masing-masing nilai ini.

Lihat [Manifest Exists](manifest-exists#how)
untuk daftar panduan yang mengajarkan Anda cara
mengimplementasikan dan menguji dukungan "Add to Homescreen" dalam aplikasi Anda dengan benar.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse mengambil manifes dan memverifikasi bahwa terdapat properti `display` dan
nilainya adalah `fullscreen`, `standalone`, atau `browser`.

Manifes yang diambil Lighthouse berbeda dari yang digunakan Chrome
pada laman, yang mungkin bisa menyebabkan hasil yang tidak akurat.


{# wf_devsite_translation #}
