project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Dokumentasi referensi untuk audit Lighthouse "Situs Tidak Menggunakan document.write()".

{# wf_updated_on: 2016-12-01 #}
{# wf_published_on: 2016-12-01 #}

# Situs Tidak Menggunakan document.write() {: .page-title }

## Mengapa audit itu penting {: #why }

Bagi pengguna yang memiliki koneksi lambat, misalnya 2G, 3G, atau Wi-Fi yang lambat, skrip eksternal
yang secara dinamis disuntikkan lewat `document.write()` bisa menunda penampilan
materi laman utama selama puluhan detik.

Lihat [Ikut campur pada `document.write()`][blog] untuk mengetahui selengkapnya.

[blog]: /web/updates/2016/08/removing-document-write

## Cara untuk lulus audit {: #how }

Dalam laporan Anda, Lighthouse mencantumkan setiap panggilan ke `document.write()`.
Tinjaulah daftar ini, dan catat panggilan yang secara dinamis menyuntikkan skrip.
Jika skrip tersebut memenuhi kriteria yang dijelaskan secara singkat dalam pengantar
[Ikut campur pada `document.write()`][blog], Chrome tidak akan mengeksekusi
skrip yang disuntikkan. Inilah panggilan ke `document.write()` yang ingin Anda
ubah. Lihat [Bagaimana memperbaikinya?][fix] untuk solusi yang memungkinkan. 

[fix]: /web/updates/2016/08/removing-document-write#how_do_i_fix_this

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse melaporkan setiap instance `document.write()` yang ditemukannya.
Perhatikan, intervensi Chrome pada `document.write()` hanya berlaku untuk
skrip yang disuntikkan secara dinamis dan memblokir rendering. Penggunaan lainnya dari `document.write()`
mungkin dapat diterima.


{# wf_devsite_translation #}
