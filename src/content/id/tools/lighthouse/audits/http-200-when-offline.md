project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Dokumentasi referensi untuk audit Lighthouse "URL merespons dengan 200 bila offline".

{# wf_updated_on: 2016-09-15 #}
{# wf_published_on: 2016-09-15 #}

# URL Merespons dengan 200 Bila Offline {: .page-title }

## Mengapa audit itu penting {: #why }

Aplikasi web progresif bekerja secara offline. Jika Lighthouse tidak menerima respons HTTP 200
saat mengakses laman selagi offline, maka laman tidak akan bisa diakses
secara offline.

## Cara untuk lulus audit {: #how }

1. Tambahkan sebuah service worker ke aplikasi Anda.
2. Gunakan service worker untuk meng-cache file secara lokal.
3. Bila offline, gunakan service worker sebagai proxy jaringan untuk mengembalikan
   versi file yang telah di-cache secara lokal.

Untuk mempelajari cara menambahkan service worker ke dalam aplikasi yang ada, lihat [Menambahkan Service
Worker dan Offline Ke Dalam
Aplikasi Web Anda](https://codelabs.developers.google.com/codelabs/offline). Gunakan apa yang telah Anda
pelajari dalam codelab praktik langsung, langkah demi langkah ini untuk mengetahui cara menambahkan service
worker ke dalam aplikasi Anda sendiri. Ini membahas langkah 1 dan 3 di atas.

Codelab di atas menampilkan sebagian dasar-dasar mengenai cara men-debug service worker
Anda dengan menggunakan Chrome DevTools. Untuk bantuan lebih detail, lihat codelab yang dikhususkan untuk
topik ini, [Men-debug Service
Worker](https://codelabs.developers.google.com/codelabs/debugging-service-workers).

Gunakan [Buku Petunjuk Offline](https://jakearchibald.com/2014/offline-cookbook/) untuk
menentukan strategi caching yang paling pas dengan aplikasi Anda. Ini membahas langkah 2 di atas.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse mengemulasikan koneksi offline dengan menggunakan Chrome Debugging Protocol,
kemudian berusaha mengambil laman dengan menggunakan `XMLHttpRequest`.


{# wf_devsite_translation #}
