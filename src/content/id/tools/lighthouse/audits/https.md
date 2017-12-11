project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Dokumentasi referensi untuk audit Lighthouse "Situs berada di HTTPS".

{# wf_updated_on: 2016-09-19 #}
{# wf_published_on: 2016-09-19 #}

# Situs berada di HTTPS  {: .page-title }

## Mengapa audit itu penting {: #why }

Semua situs web harus dilindungi dengan HTTPS, bahkan situs web yang tidak menangani
data sensitif. HTTPS mencegah penyusup mengganggu atau mendengarkan
secara pasif komunikasi antara situs Anda dan penggunanya.

HTTPS juga merupakan prasyarat bagi banyak fitur platform web baru yang andal,
misalnya pengambilan gambar atau perekaman audio.

Menurut definisinya, aplikasi tidak memenuhi syarat sebagai aplikasi web progresif jika tidak jalankan
di HTTPS. Hal ini karena banyak teknologi aplikasi web inti, misalnya
service worker, memerlukan HTTPS.

Untuk informasi selengkapnya mengenai mengapa semua situs harus dilindungi dengan HTTPS, lihat
[Mengapa Harus Selalu Menggunakan HTTPS](/web/fundamentals/security/encrypt-in-transit/why-https).

## Cara untuk lulus audit {: #how }

Migrasikan situs Anda ke HTTPS.

Banyak platform hosting, misalnya
[Firebase](https://firebase.google.com/docs/hosting/){: .external } atau [GitHub
Pages](https://pages.github.com/){: .external }, telah aman secara default.

Jika Anda menjalankan server sendiri dan membutuhkan cara murah dan mudah untuk menghasilkan
sertifikat, lihat [Let's Encrypt](https://letsencrypt.org/){: .external }. Untuk bantuan selengkapnya
tentang mengaktifkan HTTPS di server Anda, lihat rangkaian dokumen berikut: [Mengenkripsi
data dalam pengiriman](/web/fundamentals/security/encrypt-in-transit/enable-https).

Jika laman Anda sudah berjalan di HTTPS namun Anda tidak lulus audit, berarti
Anda mungkin memiliki masalah dengan materi campuran. Materi campuran terjadi bila sebuah situs aman
meminta sumber daya (HTTP) yang tidak aman. Lihat dokumen berikut di
panel Security pada Chrome DevTools untuk mempelajari cara men-debug situasi ini:
[Pahami masalah keamanan](/web/tools/chrome-devtools/debug/security).

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse menunggu kejadian dari Chrome Debugger Protocol yang menunjukkan apakah
laman berjalan pada koneksi aman. Jika kejadian tidak terdengar dalam 10
detik, berarti tidak lulus audit.


{# wf_devsite_translation #}
