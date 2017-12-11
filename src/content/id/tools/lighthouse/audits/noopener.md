project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Dokumentasi referensi untuk audit Lighthouse "Situs Membuka Jangkar Eksternal Menggunakan rel="noopener"".

{# wf_updated_on: 2016-11-30 #}
{# wf_published_on: 2016-11-30 #}

# Situs Membuka Jangkar Eksternal Menggunakan rel="noopener"  {: .page-title }

## Mengapa audit itu penting {: #why }

Ketika laman Anda menautkan ke laman lain menggunakan `target="_blank"`, laman baru
berjalan pada proses yang sama dengan laman Anda. Jika laman baru mengeksekusi JavaScript
yang berat, kinerja laman Anda juga bisa terkena dampaknya.

Di atas semua itu, `target="_blank"` juga rentan keamanannya. Laman baru
memiliki akses ke objek jendela melalui `window.opener`, dan bisa mengarahkan laman
Anda ke URL yang berbeda menggunakan `window.opener.location = newURL`.

Lihat [Manfaat Kinerja dari rel=noopener][jake] untuk informasi selengkapnya.

[jake]: https://jakearchibald.com/2016/performance-benefits-of-rel-noopener/

## Cara untuk lulus audit {: #how }

Menambahkan `rel="noopener"` ke setiap tautan yang telah diidentifikasi Lighthouse dalam laporan
Anda. Secara umum, selalu tambahkan `rel="noopener"` ketika Anda membuka tautan eksternal
di jendela atau tab baru.

    <a href="https://examplepetstore.com" target="_blank" rel="noopener">...</a>

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse menggunakan algoritme berikut untuk menandai tautan sebagai kandidat `rel="noopener"`
:

1. mengumpulkan semua simpul `<a>` yang berisi atribut `target="_blank"` dan tidak
   mengandung atribut `rel="noopener"`.
1. Memfilter setiap tautan host yang sama.

Karena Lighthouse memfilter tautan host yang sama, ada sebuah kasus ekstrem yang mungkin perlu Anda
waspadai jika bekerja pada situs yang besar. Bila laman Anda membuka
tautan ke bagian lain situs Anda tanpa menggunakan `rel="noopener"`, implikasi
kinerja audit ini masih tetap berlaku. Namun, Anda tidak akan melihat tautan
tersebut dalam hasil Lighthouse Anda.


{# wf_devsite_translation #}
