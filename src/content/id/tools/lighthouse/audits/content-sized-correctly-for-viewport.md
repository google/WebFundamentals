project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Dokumentasi referensi untuk audit Lighthouse "Ukuran Materi Disesuaikan dengan Benar untuk Tampilan yang Terlihat".

{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# Ukuran Materi Disesuaikan dengan Benar untuk Tampilan yang Terlihat  {: .page-title }

## Mengapa audit itu penting {: #why }

Audit ini memeriksa apakah lebar materi pada laman Anda sama
dengan lebar tampilan yang terlihat. Bila lebar materi lebih kecil atau lebih besar dari
lebar tampilan yang terlihat, sering kali itu pertanda bahwa laman tidak dioptimalkan untuk
layar seluler.

## Cara untuk lulus audit {: #how }

Audit adalah seputar cara menentukan apakah laman Anda telah dioptimalkan untuk
perangkat seluler. Jika situs Anda tidak dioptimalkan dan memang itu yang Anda inginkan, maka lihat
[Dasar-Dasar Desain Web Responsif](/web/fundamentals/design-and-ux/responsive/)
untuk memulai.

Anda bisa mengabaikan audit ini jika:

* Situs Anda tidak perlu dioptimalkan untuk layar seluler.
* Lebar materi laman Anda memang sengaja lebih kecil atau lebih besar dari
  lebar tampilan yang terlihat.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Audit dianggap lulus jika `window.innerWidth === window.outerWidth`.


{# wf_devsite_translation #}
