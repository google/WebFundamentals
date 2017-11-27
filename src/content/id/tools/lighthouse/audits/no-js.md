project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Dokumentasi referensi untuk audit Lighthouse "Laman berisi beberapa materi bila skripnya tidak tersedia".

{# wf_updated_on: 2016-09-20 #}
{# wf_published_on: 2016-09-20 #}

# Laman Berisi Beberapa Materi Bila Skripnya Tidak Tersedia  {: .page-title }

## Mengapa audit itu penting {: #why }

[Peningkatan Progresif](https://en.wikipedia.org/wiki/Progressive_enhancement)
adalah strategi development web yang memastikan bahwa situs Anda bisa diakses oleh
sebanyak mungkin pengguna. Definisi yang paling umum dari peningkatan
progresif adalah sebagai berikut:

Materi dasar dan fungsionalitas laman
hanya boleh bergantung pada teknologi web yang paling dasar, untuk memastikan bahwa laman bisa digunakan
dalam semua kondisi penjelajahan. Pengalaman ditingkatkan, seperti penataan gaya
canggih menggunakan CSS, atau interaktivitas menggunakan JavaScript, bisa dibuat berlayer di atasnya untuk
browser yang mendukung teknologi tersebut. Namun materi dasar dan fungsionalitas
laman tidak boleh bergantung pada CSS atau JavaScript.

## Cara untuk lulus audit {: #how }

Peningkatan progresif adalah topik yang besar dan kontroversial. Satu kubu mengatakan bahwa,
agar bisa mengikuti strategi peningkatan progresif, laman harus
berlayer sehingga materi dasar dan fungsionalitas laman hanya membutuhkan HTML. Lihat
[Peningkatan Progresif: Apa itu, Dan Bagaimana Cara Menggunakannya](https://www.smashingmagazine.com/2009/04/progressive-enhancement-what-it-is-and-how-to-use-it/)
untuk contoh dari pendekatan ini.

Kubu lainnya meyakini bahwa pendekatan yang ketat ini tidak praktis atau tidak perlu
bagi banyak aplikasi web modern berskala-besar dan menyarankan penggunaan jalur penting
inline CSS di `<head>` dokumen untuk penataan gaya laman yang benar-benar penting.
Lihat [Jalur Rendering Penting](/web/fundamentals/performance/critical-rendering-path/) untuk informasi selengkapnya tentang pendekatan ini.

Mengingat pertimbangan ini, audit Lighthouse melakukan pengecekan sederhana untuk
memastikan bahwa laman Anda tidak kosong ketika JavaScript dinonaktifkan. Seberapa ketat aplikasi
Anda mengikuti peningkatan progresif adalah topik perdebatan, tapi ada
kesepakatan bersama bahwa semua laman harus menampilkan setidaknya *suatu* informasi
bila JavaScript dinonaktifkan, bahkan jika materi tersebut hanyalah sebuah peringatan kepada pengguna
bahwa JavaScript diperlukan untuk menggunakan laman.

Untuk laman yang bergantung penuh pada JavaScript, salah satu pendekatan adalah dengan menggunakan elemen
[`<noscript>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/noscript)
untuk mengingatkan pengguna bahwa laman membutuhkan JavaScript. Ini
lebih baik daripada laman kosong, karena laman kosong membuat pengguna tidak yakin
mengenai apakah ada masalah dengan laman, browser, atau komputer
mereka.

Untuk melihat bagaimana situs Anda terlihat dan berjalan ketika JavaScript dinonaktifkan, gunakan
fitur [Disable
JavaScript](/web/tools/chrome-devtools/settings#disable-js) Chrome DevTools.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse menonaktifkan JavaScript pada laman kemudian memeriksa HTML laman. Jika
HTML kosong maka audit gagal. Jika HTML tidak kosong maka audit
lulus.


{# wf_devsite_translation #}
