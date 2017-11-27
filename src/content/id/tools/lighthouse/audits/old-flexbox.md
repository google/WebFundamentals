project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Dokumentasi referensi untuk audit Lighthouse "Situs Tidak Menggunakan CSS Flexbox Lama".

{# wf_updated_on: 2016-12-05 #}
{# wf_published_on: 2016-12-05 #}

# Situs Tidak Menggunakan CSS Flexbox Lama  {: .page-title }

## Mengapa audit itu penting {: #why }

Spesifikasi flexbox lama tahun 2009 tidak digunakan lagi dan 2,3x lebih lambat
dari spesifikasi terbaru. Lihat [Layout Flexbox Tidak Lambat][slow] untuk mengetahui
selengkapnya.

[slow]: https://developers.google.com/web/updates/2013/10/Flexbox-layout-isn-t-slow

## Cara untuk lulus audit {: #how }

Di bawah **URL**, Lighthouse mendaftar semua instance `display: box` yang ditemukan
pada stylesheet laman Anda. Ganti semua instance dengan sintaks baru,
`display: flex`.

Jika stylesheet menggunakan `display: box`, maka itu mungkin menggunakan properti Flexbox
lain yang tidak digunakan lagi. Singkatnya, setiap properti yang diawali dengan `box`,
seperti `box-flex`, sudah tidak digunakan lagi dan harus diganti. Lihat
[Pemetaan Properti Sintaks Spesifikasi 2009/2011 CSS Flexbox][map] untuk melihat dengan jelas bagaimana
properti lama dipetakan ke yang baru.

[map]: https://wiki.csswg.org/spec/flexbox-2009-2011-spec-property-mapping

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse mengumpulkan semua stylesheet yang digunakan pada laman dan memeriksa apakah salah satu dari
mereka menggunakan `display: box`. Lighthouse tidak memeriksa jika stylesheet menggunakan
properti lain yang tidak digunakan lagi.


{# wf_devsite_translation #}
