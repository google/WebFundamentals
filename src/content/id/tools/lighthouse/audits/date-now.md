project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Dokumentasi referensi untuk audit Lighthouse "Situs Tidak Menggunakan Date.now() Dalam Skripnya Sendiri".

{# wf_updated_on: 2016-12-01 #}
{# wf_published_on: 2016-12-01 #}

# Situs Tidak Menggunakan Date.now() Dalam Skripnya Sendiri  {: .page-title }

## Mengapa audit itu penting {: #why }

Jika Anda menggunakan `Date.now()` untuk mengukur waktu, pertimbangkan menggunakan
`performance.now()` sebagai gantinya. `performance.now()` menyediakan resolusi
stempel waktu lebih tinggi, dan selalu bertambah dengan kecepatan konstan yang tidak bergantung
pada jam sistem, yang bisa disesuaikan atau dicondongkan secara manual.

## Cara untuk lulus audit {: #how }

Di laporan Anda, Lighthouse akan mencantumkan setiap instance `Date.now()` yang ditemukannya
pada **URL**. Ganti setiap panggilan ini dengan `performance.now()`.

Lihat [`performance.now()`][MDN] untuk informasi selengkapnya mengenai API.

[MDN]: https://developer.mozilla.org/en-US/docs/Web/API/Performance/now

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse melaporkan setiap instance `Date.now()` yang ditemukannya dari
skrip yang berada pada host yang sama dengan laman tersebut. Skrip dari host lain
tidak termasuk, karena Lighthouse beranggapan bahwa Anda tidak memiliki kontrol atas
skrip ini. Jadi, mungkin ada skrip lain yang menggunakan `Date.now()` pada laman Anda,
namun itu tidak akan ditampilkan dalam laporan Lighthouse Anda.


{# wf_devsite_translation #}
