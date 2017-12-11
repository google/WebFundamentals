project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Dokumentasi referensi untuk audit Lighthouse "Memiliki service worker terdaftar".

{# wf_updated_on: 2016-07-25 #}
{# wf_published_on: 2016-07-25 #}

# Memiliki Service Worker Terdaftar {: .page-title }

## Mengapa audit itu penting {: #why }

Mendaftarkan service worker adalah langkah pertama untuk mengaktifkan fitur
progressive web app berikut:

* Offline
* Pemberitahuan push
* Add to homescreen

## Cara untuk lulus audit {: #how }

Mendaftarkan service worker hanya melibatkan beberapa baris kode, namun satu-satunya
alasan Anda menggunakan service worker adalah untuk mengimplementasikan salah satu fitur progressive
web app yang disebutkan di atas. Mengimplementasikan fitur tersebut membutuhkan lebih banyak
pekerjaan.

Untuk bantuan selengkapnya tentang caching file untuk penggunaan offline, lihat bagian "Cara untuk lulus
audit" dari dokumen Lighthouse berikut: [URL merespons dengan 200 saat
offline](http-200-when-offline#how).

Untuk mengaktifkan pemberitahuan push atau "add to homescreen", selesaikan
tutorial langkah-demi-langkah berikut dan kemudian gunakan apa yang Anda pelajari untuk mengimplementasikan
fitur dalam aplikasi Anda sendiri:

* [Mengaktifkan pemberitahuan push untuk aplikasi
  web Anda](https://codelabs.developers.google.com/codelabs/push-notifications).
* [Menambahkan aplikasi web Anda ke layar
  beranda pengguna](https://codelabs.developers.google.com/codelabs/add-to-home-screen).

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Memeriksa apakah Chrome Debugger mengembalikan versi service worker.


{# wf_devsite_translation #}
