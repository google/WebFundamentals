project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Dokumentasi referensi untuk audit Lighthouse "Situs mengalihkan lalu lintas HTTP ke HTTPS".

{# wf_updated_on: 2016-09-20 #}
{# wf_published_on: 2016-09-20 #}

# Situs Mengalihkan Lalu Lintas HTTP ke HTTPS  {: .page-title }

## Mengapa audit itu penting {: #why }

Semua situs harus dilindungi dengan HTTPS. Lihat dokumen Lighthouse berikut untuk
mengetahui mengapa: [Situs berada di HTTPS](https).

Setelah menyiapkan HTTPS, Anda perlu memastikan bahwa semua lalu lintas HTTP
yang tidak aman ke situs Anda telah dialihkan ke HTTPS.

## Cara untuk lulus audit {: #how }

1. Gunakan tautan kanonis dalam `head` HTML Anda untuk membantu mesin telusur mengetahui
   cara terbaik untuk mencapai laman tersebut.

       <link rel="canonical" href="https://example.com"/>

2. Konfigurasikan server Anda untuk mengalihkan lalu lintas HTTP ke HTTPS. Lihat dokumentasi
   server Anda untuk mengetahui cara terbaik melakukannya.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse mengubah URL laman menjadi `http`, memuat laman, kemudian menunggu
kejadian dari Chrome Debugger yang menunjukkan bahwa laman telah aman. Jika
Lighthouse tidak menerima kejadian dalam 10 detik kemudian maka audit akan gagal.


{# wf_devsite_translation #}
