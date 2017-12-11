project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Dokumentasi referensi untuk audit Lighthouse "Situs Menggunakan Event Listener Pasif untuk Meningkatkan Kinerja Pengguliran".

{# wf_updated_on: 2016-11-30 #}
{# wf_published_on: 2016-11-30 #}

# Situs Menggunakan Event Listener Pasif untuk Meningkatkan Kinerja Pengguliran  {: .page-title }

## Mengapa audit itu penting {: #why }

Menyetel opsi `passive` pada event listener wheel dan sentuh bisa
meningkatkan kinerja pengguliran.

Lihat [Meningkatkan Kinerja Pengguliran dengan Event Listener Pasif][blog] untuk
ringkasannya.

Lihat [Explainer][explainer] dalam spesifikasi event listener pasif untuk
penyelaman teknis yang lebih mendalam.

[blog]: https://developers.google.com/web/updates/2016/06/passive-event-listeners
[explainer]: https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md

## Cara untuk lulus audit {: #how }

Tambahkan flag `passive` untuk semua event listener yang telah diidentifikasi
Lighthouse. Secara umum, tambahkan flag `passive` untuk semua event listener `wheel`,
`mousewheel`, `touchstart`, dan `touchmove` yang tidak
memanggil `preventDefault()`.

Dalam browser yang mendukung event listener pasif, menandai listener sebagai
`passive` semudah menyetel flag:

    document.addEventListener('touchstart', onTouchStart, {passive: true});

Namun, dalam browser yang tidak mendukung event listener pasif, parameter
ketiga adalah boolean untuk menunjukkan apakah kejadian harus digelembungkan atau ditangkap.
Jadi, menggunakan sintaks di atas bisa menyebabkan konsekuensi yang tidak diinginkan.

Lihat polyfill di [Deteksi Fitur][polyfill] untuk mempelajari cara
mengimplementasikan event listener pasif dengan aman.

[polyfill]: https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse menggunakan algoritme berikut untuk menandai kandidat event
listener pasif yang potensial:

1. Mengumpulkan semua event listener pada laman.
1. Memfilter listener non-sentuh dan non-wheel.
1. Memfilter listener yang memanggil `preventDefault()`.
1. Memfilter listener yang berasal dari host yang berbeda
   dari laman.

Lighthouse memfilter listener dari host yang berbeda karena Anda mungkin
tidak memiliki kontrol atas skrip ini. Karena itu, perhatikan bahwa audit
Lighthouse tidak mewakili kinerja gulir penuh dari laman Anda. Mungkin
ada skrip pihak ketiga yang membahayakan kinerja gulir laman,
namun ini tidak tercantum dalam laporan Lighthouse Anda.


{# wf_devsite_translation #}
