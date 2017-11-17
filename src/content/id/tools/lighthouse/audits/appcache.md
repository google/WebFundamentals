project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Dokumentasi referensi untuk audit Lighthouse "Situs Tidak Menggunakan Cache Aplikasi".

{# wf_updated_on: 2017-01-04 #}
{# wf_published_on: 2017-01-04 #}

# Situs Tidak Menggunakan Cache Aplikasi  {: .page-title }

## Mengapa audit itu penting {: #why }

Cache Aplikasi, yang juga dikenal dengan AppCache, sudah [tidak digunakan lagi][deprecated].

[deprecated]: https://html.spec.whatwg.org/multipage/browsers.html#offline

## Cara untuk lulus audit {: #how }

Pertimbangkan menggunakan service worker [Cache API][API] sebagai gantinya.

Untuk membantu migrasi dari AppCache ke service worker, pertimbangkan pustaka
[sw-appcache-behavior][sw-appcache-behavior]. Pustaka ini menghasilkan
implementasi berbasis service worker untuk perilaku yang didefinisikan dalam manifes
AppCache.

Lihat referensi audit [URL Merespons dengan 200 Bila Offline](http-200-when-offline) untuk
sumber daya selengkapnya mengenai penggunaan service worker untuk membuat situs Anda bekerja
secara offline.

[API]: https://developer.mozilla.org/en-US/docs/Web/API/Cache

[sw-appcache-behavior]: https://github.com/GoogleChrome/sw-appcache-behavior

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Audit dianggap lulus jika tidak ada manifes AppCache yang terdeteksi.


{# wf_devsite_translation #}
