project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Dokumentasi referensi untuk audit Lighthouse "Indeks Kecepatan".

{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# Indeks Kecepatan  {: .page-title }

## Mengapa audit itu penting {: #why }

Indeks Kecepatan adalah metrik kinerja pemuatan laman yang menunjukkan seberapa cepat
materi laman terisi. Semakin rendah nilainya, semakin baik.

## Cara untuk lulus audit {: #how }

Untuk menurunkan nilai Indeks Kecepatan, Anda perlu mengoptimalkan laman agar secara visual
memuat lebih cepat. Dua tempat terbaik untuk mengawali adalah:

* [Mengoptimalkan Efisiensi Materi](/web/fundamentals/performance/optimizing-content-efficiency/).
* [Mengoptimalkan Jalur Rendering Penting](/web/fundamentals/performance/critical-rendering-path/).

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse menggunakan modul simpul yang disebut
[Speedline](https://github.com/pmdartus/speedline)
untuk menghasilkan nilai Indeks Kecepatan.

Untuk informasi selengkapnya tentang algoritme dan metodologi di balik Indeks Kecepatan,
lihat [Indeks Kecepatan](https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/metrics/speed-index).

Target nilai dihitung dengan fungsi distribusi kumulatif dari
distribusi normal-log. Lihat komentar di
[sumber](https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/audits/speed-index-metric.js)
dari audit jika Anda ingin mengetahui lebih banyak.


{# wf_devsite_translation #}
