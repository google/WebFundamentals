project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Mengubah penampilan DevTools dan mengakses fitur tersembunyi.

{# wf_updated_on: 2016-07-26 #}
{# wf_published_on: 2016-03-28 #}

# Mengonfigurasi dan Menyesuaikan DevTools {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Mengubah penampilan DevTools dan mengakses fitur 
tersembunyi.


### TL;DR {: .hide-from-toc }
- Membuka menu Utama dan Settings.
- Menyesuaikan penampilan DevTools.
- Mengakses fitur tersembunyi.


## Membuka Menu Utama {:#main-menu}

**Menu Utama** dari DevTools adalah menu tarik-turun untuk mengonfigurasi bagaimana
DevTools terlihat, mengakses alat tambahan, membuka Settings, dan banyak lagi.

Untuk membuka Menu Utama, klik pada tombol **Main Menu** di kanan atas
jendela DevTools.

![menu utama](images/main-menu.png)

## Membuka Settings {:#settings}

Untuk membuka Settings DevTools, tekan <kbd>F1</kbd> ketika DevTools dalam fokus,
atau [buka Main Menu](#main-menu) kemudian pilih **Settings**.

## Membuka Menu Perintah {:#command-menu}

Tekan <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) atau
<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Windows, Linux) untuk membuka
Menu Perintah.

![menu perintah](images/command-menu.png)

## Mengubah urutan tab panel {:#panel-tabs}

Klik, tahan, dan seret tab panel untuk mengubah urutannya. Urutan tab khusus Anda
berlangsung di seluruh sesi DevTools.

Misalnya, secara default tab **Network** biasanya terletak di posisi keempat dari kiri.

![sebelum mengubah urutan](images/before-reorder.png)

Anda bisa menyeretnya ke sembarang posisi, seperti posisi pertama dari kiri.

![setelah mengubah urutan](images/after-reorder.png)

## Menyesuaikan penempatan DevTools {:#placement}

Anda bisa menempatkan DevTools di bagian bawah laman, di sebelah kanan laman, atau 
Anda bisa membukanya di jendela yang baru. 

Untuk mengubah penempatan DevTools, [buka Main Menu](#main-menu) dan pilih tombol
 **Undock into separate window** 
(![tombol undock](images/undock.png){:.inline})
, tombol **Dock to bottom** 
(!tombol dock to bottom](images/dock-bottom.png){:.inline})
, atau tombol 
**Dock to right** 
(![tombol dock to right](images/dock-right.png){:.inline})
. 

## Menggunakan tema gelap {:#dark-theme}

Untuk menggunakan tema DevTools gelap, [buka Setelan DevTools](#settings),
masuk ke laman **Preferences**, temukan bagian **Appearance**, lalu
pilih **Dark** dari menu tarik-turun **Theme**.

![tema gelap](images/dark-theme.png)

## Membuka dan menutup tab panel samping {:#drawer-tabs}

Tekan <kbd>Esc</kbd> untuk membuka dan menutup **Drawer** DevTools. Tangkapan layar
di bawah menunjukkan contoh panel **Elements** dengan Drawer **Console** terbuka
di bagian bawah.

![Panel Elements dengan Drawer](images/drawer.png)

Dari Drawer Anda bisa menjalankan perintah di Console, menampilkan Animation 
Inspector, mengonfigurasi kondisi jaringan dan setelan rendering, menelusuri 
string dan file, serta mengemulasikan sensor seluler.

Saat Drawer dibuka, klik ikon bertitik tiga
(![ikon bertitik tiga](images/three-dot.png){:.inline}) di sebelah kiri tab 
**Console** dan kemudian pilih salah satu opsi menu tarik-turun untuk membuka
tab lainnya.

![menu tab drawer](images/drawer-tabs.png)

## Mengaktifkan experiments {:#experiments}

Ketika DevTools Experiments diaktifkan, laman baru bernama **Experiments**
akan muncul di Setelan DevTools. Dari laman ini Anda bisa mengaktifkan dan menonaktifkan
fitur eksperimental.

Untuk mengaktifkan Experiments, masuk ke `chrome://flags/#enable-devtools-experiments`
dan klik **Enable**. Klik tombol **Relaunch Now** di bagian bawah
laman. 

Sekarang Anda akan melihat laman baru bernama **Experiments** ketika Anda membuka Setelan
DevTools.

![DevTools Experiments](images/experiments.png)

## Mengemulasikan media cetak {:#emulate-print-media}

Untuk menampilkan laman dalam mode pratinjau cetak, [buka menu 
utama DevTools](#main-menu), pilih **More Tools** > **Rendering Settings**, lalu 
aktifkan kotak centang **emulate media** dengan menu tarik-turun disetel ke **print**.

![mengaktifkan mode pratinjau cetak](images/emulate-print-media.png)

## Menampilkan komentar HTML {: #show-html-comments }

Untuk menampilkan atau menyembunyikan komentar HTML di panel **Elements**, [buka
**Settings**](#settings), masuk ke panel **Preferences**, temukan bagian
**Elements**, kemudian aktifkan kotak centang **Show HTML comments**.


{# wf_devsite_translation #}
