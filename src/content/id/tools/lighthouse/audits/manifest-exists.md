project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Dokumentasi referensi untuk "Manifest Exists" audit Lighthouse.

{# wf_updated_on: 2016-09-20 #}
{# wf_published_on: 2016-09-20 #}

# Manifest Exists  {: .page-title }

## Mengapa audit itu penting {: #why }

Manifes Aplikasi Web adalah teknologi web yang memungkinkan Anda untuk menambahkan aplikasi web
ke layar beranda pengguna. Fitur ini sering disebut sebagai "Add to
Homescreen (A2HS)".

## Cara untuk lulus audit {: #how }

Untuk panduan praktik langkah-demi-langkah tentang cara menambahkan dukungan A2HS di
aplikasi yang sudah ada, lihat codelab berikut: [Menambahkan Aplikasi Web Anda ke
Layar Utama Pengguna](https://codelabs.developers.google.com/codelabs/add-to-home-screen).

Untuk panduan terstruktur-bebas yang membahas lebih mendalam tentang Manifes
Aplikasi Web, lihat [Meningkatkan Pengalaman Pengguna dengan Manifes
Aplikasi Web](/web/fundamentals/engage-and-retain/web-app-manifest).

Gunakan apa yang Anda pelajari dalam panduan ini untuk menambahkan dukungan A2HS dalam
aplikasi web Anda sendiri.

Anda bisa mengemulasikan dan menguji kejadian A2HS di Chrome DevTools. Lihat bagian
berikut Untuk bantuan selengkapnya: [Manifes
Aplikasi Web](/web/tools/chrome-devtools/debug/progressive-web-apps/#manifest).

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse mengambil manifes dan memverifikasi bahwa itu memiliki data. Manifes yang diambil
Lighthouse berbeda dari yang digunakan Chrome pada laman, yang
mungkin bisa menyebabkan hasil yang tidak akurat.


{# wf_devsite_translation #}
