project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Dokumentasi referensi untuk audit Lighthouse "Ukuran dan Tanda Pengaturan Waktu Pengguna".

{# wf_updated_on: 2016-10-06 #}
{# wf_published_on: 2016-10-06 #}

# Ukuran dan Tanda Pengaturan Waktu Pengguna  {: .page-title }

## Mengapa audit itu penting {: #why }

User Timing API memungkinkan Anda mengukur kinerja JavaScript aplikasi.
Ide dasarnya adalah Anda memutuskan bagian skrip yang ingin Anda
optimalkan, kemudian melengkapi bagian-bagian skrip tersebut dengan User
Timing API. Dari sana, Anda bisa mengakses hasil dari JavaScript menggunakan
API, atau menampilkannya pada [Rekaman
Timeline Chrome DevTools](/web/tools/chrome-devtools/evaluate-performance/timeline-tool).

## Cara untuk lulus audit {: #how }

Audit ini tidak terstruktur sebagai pengujian "lulus" atau "gagal". Ini adalah
kesempatan untuk menemukan API yang berguna yang bisa membantu Anda mengukur kinerja
aplikasi. Nilai yang dilaporkan Lighthouse untuk audit ini sesuai dengan
jumlah Ukuran dan Tanda Pengaturan Waktu Pengguna yang ditemukan di aplikasi Anda.

Ketika aplikasi Anda menyertakan Ukuran dan Tanda Pengaturan Waktu Pengguna, Anda akan melihat
Tanda dan Ukuran ini dalam laporan Lighthouse Anda.

Lihat [User Timing API](https://www.html5rocks.com/en/tutorials/webperformance/usertiming/)
untuk pengantar tentang cara menggunakan User Timing API untuk mengukur kinerja JavaScript
aplikasi.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse mengekstrak data Pengaturan Waktu Pengguna dari Alat (Bantu) Pemrofilan Kejadian Trace Chrome.


{# wf_devsite_translation #}
