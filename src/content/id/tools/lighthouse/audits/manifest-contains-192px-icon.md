project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Referensi dokumentasi untuk "Manifes Berisi Ikon yang Setidaknya 192 px" audit Lighthouse.

{# wf_updated_on: 2016-09-21 #}
{# wf_published_on: 2016-09-21 #}

# Manifes Berisi Ikon yang Setidaknya 192 px  {: .page-title }

## Mengapa audit itu penting {: #why }

Ketika pengguna menambahkan aplikasi ke layar beranda, perangkat seluler membutuhkan ikon untuk
ditampilkan. Ikon tersebut ditetapkan dalam larik `icons` dari Manifes Aplikasi Web.

Kehadiran ikon 192-pixel memastikan bahwa ikon Anda akan ditampilkan dengan baik pada
perangkat Android yang terbesar. Untuk perangkat lebih kecil yang membutuhkan ikon kecil, Android
bisa memperkecil ikon 192-pixel dengan cukup akurat. Dengan kata lain,
meskipun Anda bisa memberikan ikon berukuran lebih kecil di Manifes Aplikasi Web, itu
tidak diperlukan.

## Cara untuk lulus audit {: #how }

Tambahkan ikon 192-pixel ke Manifes Aplikasi Web Anda.

    {
      ...
      "icons": [{
        "src": "images/homescreen192.png",
        "sizes": "192x192",
        "type": "image/png"
      }],
      ...
    }

Lihat [Manifest Exists](manifest-exists#how)
untuk daftar panduan yang mengajarkan Anda cara
mengimplementasikan dan menguji dukungan "Add to Homescreen" dalam aplikasi Anda dengan benar.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Audit ini hanya menjamin bahwa ikon Anda ditampilkan dengan baik pada perangkat Android.
Sistem operasi lain mungkin memerlukan ukuran ikon yang berbeda untuk penyajian
optimal.

Lighthouse mengambil manifes dan memverifikasi bahwa properti `icons` mereferensikan
ikon 192-pixel. Manifes yang diambil Lighthouse
berbeda dari yang digunakan Chrome pada laman, yang mungkin bisa
menyebabkan hasil yang tidak akurat. Perhatikan juga bahwa Lighthouse tidak memeriksa apakah
ikon benar-benar ada dalam cache. Itu hanya memastikan bahwa Manifes
Aplikasi Web mendefinisikan ikon 192-pixel.


{# wf_devsite_translation #}
