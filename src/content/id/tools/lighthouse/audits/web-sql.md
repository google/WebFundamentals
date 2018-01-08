project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Dokumentasi referensi untuk audit Lighthouse "Situs Tidak Menggunakan Web SQL".

{# wf_updated_on: 2016-12-05 #}
{# wf_published_on: 2016-12-05 #}

# Situs Tidak Menggunakan Web SQL  {: .page-title }

## Mengapa audit itu penting {: #why }

Web SQL tidak digunakan lagi. Lihat [Database Web SQL][spec] untuk mengetahui selengkapnya.

[spec]: https://www.w3.org/TR/webdatabase/

## Cara untuk lulus audit {: #how }

Pertimbangkan untuk mengganti database Web SQL dengan alternatif yang lebih modern, seperti
[IndexedDB][indexeddb].

Lihat [Ringkasan Web Storage][overview] untuk pembahasan tentang opsi penyimpanan
lain yang tersedia.

[indexeddb]: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
[overview]: /web/fundamentals/instant-and-offline/web-storage/

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse memeriksa jika laman memiliki instance database Web SQL.


{# wf_devsite_translation #}
