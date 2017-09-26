project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Dokumentasi referensi untuk "Manifes Berisi short_name" audit Lighthouse.

{# wf_updated_on: 2016-09-21 #}
{# wf_published_on: 2016-09-21 #}

# Manifes Berisi Nama Singkat  {: .page-title }

## Mengapa audit itu penting {: #why }

Setelah pengguna menambahkan aplikasi ke layar beranda, `short_name` adalah teks yang
ditampilkan pada layar beranda di sebelah ikon aplikasi Anda. Biasanya, itu digunakan bila
tidak ada cukup ruang untuk menampilkan nama lengkap aplikasi Anda.

## Cara untuk lulus audit {: #how }

Tambahkan properti `short_name` di Manifes Aplikasi Web Anda.

    {
      ...
      "short_name": "Air Horner",
      ...
    }

[Rekomendasi panjang
maksimum](https://developer.chrome.com/apps/manifest/name#short_name) Chrome adalah 12
karakter.

Lihat [Manifest Exists](manifest-exists#how)
untuk daftar panduan yang mengajarkan Anda cara
mengimplementasikan dan menguji dukungan "Add to Homescreen" dalam aplikasi Anda dengan benar.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Audit diteruskan jika manifes berisi properti `short_name` atau `name`.
Manifes yang diambil Lighthouse berbeda dari yang digunakan Chrome
pada laman, yang mungkin bisa menyebabkan hasil yang tidak akurat.


{# wf_devsite_translation #}
