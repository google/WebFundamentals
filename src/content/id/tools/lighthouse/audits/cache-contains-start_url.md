project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Dokumentasi referensi untuk audit Lighthouse "Cache berisi start_url dari manifes".

{# wf_updated_on: 2016-09-15 #}
{# wf_published_on: 2016-09-15 #}

# Cache Berisi start_url Dari Manifes  {: .page-title }

## Mengapa audit itu penting {: #why }

Memastikan bahwa aplikasi web progresif diluncurkan dengan benar dari
layar utama perangkat seluler secara offline.

## Cara untuk lulus audit {: #how }

1. Definisikan properti `start_url` dalam file `manifest.json` Anda.
2. Pastikan service worker meng-cache dengan benar sumber daya yang
   cocok dengan nilai `start_url`.

Untuk mempelajari dasar-dasar penambahan aplikasi ke layar utama,
lihat [Tambahkan Aplikasi Web Anda ke
Layar Utama pengguna](https://codelabs.developers.google.com/codelabs/add-to-home-screen).
Ini adalah codelab praktik langsung langkah demi langkah untuk menambahkan fungsionalitas "add to
homescreen" ke dalam aplikasi yang ada. Gunakan apa yang telah Anda pelajari dalam
codelab ini untuk mengintegrasikan fungsionalitas "add to homescreen" dalam aplikasi Anda sendiri.

Untuk bantuan selengkapnya mengenai cara meng-cache file dengan service worker bagi penggunaan secara offline,
lihat bagian "Cara lulus audit" pada dokumen Lighthouse berikut:
[URL merespons dengan 200 bila offline](http-200-when-offline#how)

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Bila aplikasi web progresif diluncurkan dari layar utama perangkat seluler,
aplikasi akan dibuka pada URL tertentu. URL itu didefinisikan dalam file
`manifest.json` aplikasi sebagai properti `start_url`.

Audit ini akan mem-parse nilai `start_url` dari `manifest.json` kemudian
memastikan bahwa sumber daya yang cocok telah disimpan sementara di cache milik service worker.

**Jika service worker mengalihkan permintaan** `start_url` **, audit
ini mungkin akan memberikan hasil yang tidak akurat**.

Satu kekurangan dari audit ini adalah karena memeriksa materi cache
secara langsung, bukan meminta service worker untuk memenuhi permintaan `start_url`.
 Hal ini bisa memberikan hasil negatif palsu jika cache Anda kehilangan
sumber daya yang cocok dengan nilai persis dari `start_url`, walaupun dalam
skenario nyata permintaan berhasil dipenuhi karena service
worker mengalihkan ke sumber daya lain dalam cache. Sebaliknya, audit bisa
memberikan hasil positif palsu jika cache Anda berisi sumber daya yang
cocok dengan `start_url`, namun service worker Anda mengalihkan permintaan tersebut ke
sumber daya yang tidak ada.


{# wf_devsite_translation #}
