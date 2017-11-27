project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Dokumentasi referensi untuk "Manifes short_name tidak akan terpotong ketika ditampilkan pada homescreen" audit Lighthouse.

{# wf_updated_on: 2016-09-21 #}
{# wf_published_on: 2016-09-21 #}

# Manifes Nama Singkat Tidak Akan Terpotong Ketika Ditampilkan Pada Homescreen {: .page-title }

## Mengapa audit itu penting {: #why }

Ketika pengguna menambahkan aplikasi web Anda ke layar beranda, properti `short_name` ditampilkan
sebagai label di sebelah ikon aplikasi. Bila `short_name` lebih panjang
dari 12 karakter, itu akan terpotong di layar beranda.

Perhatikan bahwa, jika tidak terdapat `short_name`, Chrome bisa kembali ke properti
`name` jika itu cukup singkat.

## Cara untuk lulus audit {: #how }

Membuat properti `short_name` di Manifes Aplikasi Web Anda kurang dari 12 karakter.

    {
      ...
      "short_name": "Air Horner",
      ...
    }

Atau, jika Anda tidak menetapkan properti `short_name` di manifes, buat properti
`name` kurang dari 12 karakter.

Lihat [Manifest Exists](manifest-exists#how)
untuk daftar panduan yang mengajarkan Anda cara
mengimplementasikan dan menguji dukungan "Add to Homescreen" dalam aplikasi Anda dengan benar.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse mengambil manifes dan memverifikasi bahwa properti `short_name` kurang
dari 12 karakter. Perhatikan bahwa karena properti `name` bisa digunakan sebagai
fallback untuk `short_name`, Lighthouse juga menguji properti ini sebagai fallback.
Jadi, jika Anda tidak menyertakan `short_name` di manifes, namun `name` Anda
kurang dari 12 karakter, maka audit akan diteruskan. Manifes yang diambil
Lighthouse berbeda dari yang digunakan Chrome pada laman, yang mungkin
bisa menyebabkan hasil yang tidak akurat.


{# wf_devsite_translation #}
