project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Menggunakan perangkat virtual di Device Mode Chrome untuk membangun situs web yang mengedepankan perangkat seluler.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2015-04-13 #}

# Menyimulasikan Perangkat Seluler dengan Device Mode {: .page-title }

{% include "web/_shared/contributors/pbakaus.html" %}

Menggunakan Device Mode pada Chrome DevTools untuk membangun situs web yang mengedepankan perangkat seluler dan sepenuhnya responsif. Pelajari cara menyimulasikan beragam perangkat dan kemampuannya.

Caution: Device Mode bisa meniru penampilan situs Anda
di perangkat seluler dengan cukup mirip, tetapi untuk memperoleh gambaran utuh, sebaiknya selalu
uji situs Anda di perangkat sungguhan. Misalnya, DevTools tidak bisa mengemulasi karakteristik
kinerja perangkat seluler.


## Intinya

* Emulasikan situs Anda di seluruh [ukuran dan resolusi perangkat yang berbeda](/web/tools/chrome-devtools/device-mode/emulate-mobile-viewports), termasuk layar Retina.
* Buat desain yang responsif dengan memvisualkan dan [menginspeksi kueri media CSS](/web/tools/chrome-devtools/iterate/device-mode/media-queries).
* Evaluasi kinerja situs Anda menggunakan [emulator jaringan](/web/tools/chrome-devtools/network-performance/network-conditions), tanpa memengaruhi lalu lintas ke tab lain.
* [Simulasikan masukan perangkat](/web/tools/chrome-devtools/device-mode/device-input-and-sensors) secara akurat untuk kejadian sentuh, geolokasi, dan orientasi perangkat

## Beralih Device Mode {: #toggle }

Tekan tombol **Device Mode** untuk mengaktifkan atau menonaktifkan Device Mode.

![Awal mulai untuk mode perangkat](imgs/device-mode-initial-view.png)

Saat Device Mode aktif, ikon berwarna biru
(![device mode aktif](imgs/device-mode-on.png)).

Saat tidak aktif, ikon berwarna abu-abu
(![device mode nonaktif](imgs/device-mode-off.png)).

Device Mode diaktifkan secara default. 

Anda juga bisa mengalihkan Device Mode dengan menekan
<kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd> (Mac) atau
<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd> (Windows, Linux).
Untuk menggunakan pintasan ini, mouse harus berfokus pada jendela DevTools.
Jika berfokus pada tampilan yang terlihat, Anda akan memicu [pintasan
alihkan pengguna di Chrome](https://support.google.com/chrome/answer/157179).





{# wf_devsite_translation #}
