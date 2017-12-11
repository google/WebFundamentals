project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Dokumentasi referensi untuk audit Lighthouse "Situs Tidak Menggunakan console.time() Dalam Skripnya Sendiri".

{# wf_updated_on: 2016-12-01 #}
{# wf_published_on: 2016-12-01 #}

# Situs Tidak Menggunakan console.time() Dalam Skripnya Sendiri  {: .page-title }

## Mengapa audit itu penting {: #why }

Jika Anda menggunakan `console.time()` untuk mengukur kinerja laman, pertimbangkan
menggunakan User Timing API sebagai gantinya. Manfaat menyertakan:

* Stempel waktu resolusi tinggi.
* Data pengaturan waktu yang dapat dieskpor.
* Integrasi dengan Chrome DevTools Timeline. Bila fungsi User Timing
  `performance.measure()` dipanggil selama perekaman Timeline, DevTools
  secara otomatis menambahkan pengukuran ke hasil Timeline, seperti yang ditampilkan dalam label
  `my custom measurement` pada tangkapan layar di bawah ini.

![Pengukuran User Timing di Chrome DevTools Timeline][timeline]

[timeline]: /web/tools/lighthouse/images/user-timing-measurement-in-devtools.png

## Cara untuk lulus audit {: #how }

Di laporan Anda, Lighthouse akan mencantumkan setiap instance `console.time()` yang ditemukannya
pada **URL**. Ganti setiap panggilan ini dengan `performance.mark()`.
Jika Anda ingin mengukur waktu yang telah ditempuh di antara dua tanda, gunakan
`performance.measure()`.

Lihat [User Timing API: Memahami Aplikasi Web Anda][html5rocks]
untuk mempelajari cara menggunakan API.

[html5rocks]: https://www.html5rocks.com/en/tutorials/webperformance/usertiming/

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse melaporkan setiap instance `console.time()` yang ditemukannya dari
skrip yang berada pada host yang sama dengan laman tersebut. Skrip dari host lain
tidak termasuk, karena Lighthouse beranggapan bahwa Anda tidak memiliki kontrol atas
skrip ini. Jadi, mungkin ada skrip lain yang menggunakan `console.time()` pada laman Anda,
namun itu tidak akan ditampilkan dalam laporan Lighthouse Anda.


{# wf_devsite_translation #}
