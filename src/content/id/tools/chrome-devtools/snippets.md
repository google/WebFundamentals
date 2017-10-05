project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Cuplikan adalah skrip kecil yang bisa ditulis dan dieksekusi dalam panel Sources pada Chrome DevTools. Anda bisa mengakses dan menjalankannya dari laman apa saja. Bila dijalankan, cuplikan kode akan dieksekusi dari konteks laman yang dibuka saat ini.

{# wf_updated_on: 2016-06-26 #}
{# wf_published_on: 2015-10-12 #}

# Menjalankan cuplikan kode dari laman apa saja {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Cuplikan adalah skrip kecil yang bisa ditulis dan dieksekusi 
dalam panel Sources pada Chrome DevTools. Anda bisa mengakses dan menjalankannya 
dari laman apa saja. Bila dijalankan, cuplikan kode akan dieksekusi dari konteks 
laman yang dibuka saat ini.

Jika Anda memiliki utilitas kecil atau skrip debug yang 
digunakan berulang-ulang pada banyak laman, pertimbangkan untuk menyimpan skrip sebagai cuplikan.
Anda juga bisa menggunakan cuplikan sebagai alternatif untuk 
[bookmarklets](https://en.wikipedia.org/wiki/Bookmarklet).


### TL;DR {: .hide-from-toc }
- Cuplikan kode adalah skrip kecil yang bisa dijalankan dari laman apa saja (serupa dengan bookmarklet).
- Jalankan sebagian cuplikan dalam Console dengan fitur "Evaluate in Console".
- Ingatlah bahwa fitur populer dari panel Sources, seperti breakpoint, juga bisa digunakan bersama cuplikan.


## Membuat cuplikan

Untuk membuat cuplikan, buka panel **Sources**, klik pada tab **Snippets**,
klik-kanan dalam Navigator, kemudian pilih **New**.

![membuat cuplikan](images/create-snippet.png)

Masukkan kode Anda di editor. Bila ada perubahan yang belum disimpan, di sebelah nama skrip
akan ada tanda bintang, seperti dalam tangkapan layar di bawah ini.
Tekan <kbd>Command</kbd>+<kbd>S</kbd> (Mac) atau <kbd>Ctrl</kbd>+<kbd>S</kbd>
(Windows, Linux) untuk menyimpan perubahan. 

![cuplikan belum disimpan](images/unsaved-snippet.png)

## Menjalankan cuplikan

Ada tiga cara untuk menjalankan cuplikan Anda: 

* Klik kanan pada nama file cuplikan (di panel sebelah kiri yang menampilkan daftar
  semua cuplikan) dan pilih **Run**.
* Klik tombol **Run** (![tombol 
  run snippet](images/run.png){:.inline}).
* Tekan <kbd>Command</kbd>+<kbd>Enter</kbd> (Mac) atau 
  <kbd>Ctrl</kbd>+<kbd>Enter</kbd> (Windows, Linux).

Untuk mengevaluasi bagian cuplikan dalam Console, sorot 
bagian tersebut, klik kanan di mana saja dalam editor, dan pilih **Evaluate in 
Console**, atau gunakan pintasan keyboard 
<kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>E</kbd> (Mac) atau
<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>E</kbd> (Windows, Linux).

![evaluate in console](images/evaluate-in-console.png)

## Menampilkan local modifications

<!-- TODO apply revision content doesn't really work... -->

Untuk menampilkan perbandingan modifikasi yang Anda buat pada cuplikan, klik kanan di 
editor (selagi cuplikan ditampilkan) dan pilih **Local modifications**.

![local modifications](images/local-modifications.png)

Sebuah tab baru bernama **History** akan muncul di panel samping Console.

![riwayat cuplikan](images/snippet-history.png)

Masing-masing stempel waktu merepresentasikan modifikasi. Luaskan tanda karat di sebelah
stempel waktu untuk menampilkan perbedaan modifikasi pada titik waktu itu.
Tautan **revert** akan membuang riwayat revisi. Mulai 27 Juni 2016, tautan
**apply revision content** dan **apply original content** tampaknya
tidak berfungsi sebagaimana mestinya.

## Menyetel breakpoint

Sebagaimana skrip lainnya, breakpoint bisa disetel pada cuplikan. Lihat
[Menambahkan breakpoint](/web/tools/chrome-devtools/debug/breakpoints/add-breakpoints)
untuk mempelajari cara menambahkan breakpoint dari dalam panel **Sources**.


{# wf_devsite_translation #}
