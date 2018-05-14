project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Gunakan panel Timeline Chrome DevTools untuk merekam dan menganalisis semua aktivitas di aplikasi saat sedang berjalan. Panel ini merupakan tempat terbaik untuk memulai investigasi masalah kinerja yang dirasakan pada aplikasi Anda.

{# wf_updated_on: 2016-03-07 #}
{# wf_published_on: 2015-06-08 #}

# Cara Menggunakan Alat (Bantu) Timeline {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Gunakan panel <em>Timeline</em> Chrome DevTools untuk merekam 
dan menganalisis semua aktivitas di aplikasi saat sedang berjalan. Panel ini merupakan tempat 
terbaik untuk memulai investigasi masalah kinerja yang dirasakan pada 
aplikasi Anda.

![Alat (bantu) timeline](imgs/timeline-panel.png)


### TL;DR {: .hide-from-toc }
- Buat rekaman Timeline untuk menganalisis setiap kejadian yang terjadi setelah laman dimuat atau setelah interaksi pengguna.
- Menampilkan FPS, CPU, dan permintaan jaringan di panel Overview.
- Klik kejadian di dalam Flame Chart untuk menampilkan detail tentangnya.
- Memperbesar bagian rekaman untuk mempermudah analisis.


## Ringkasan panel Timeline {:#timeline-overview}

Panel Timeline terdiri dari empat panel:

1. **Controls**. Memulai rekaman, menghentikan rekaman, dan 
    mengonfigurasi informasi apa saja yang akan direkam selama rekaman.
2. **Overview**. Ringkasan tingkat tinggi kinerja laman. Selengkapnya tentang ini 
   di bawah.
3. **Flame Chart**. Visualisasi pelacakan tumpukan CPU. 

   Anda mungkin melihat satu sampai tiga garis bertitik vertikal di **Flame Chart**. Garis 
    biru menggambarkan kejadian `DOMContentLoaded`. Garis hijau menggambarkan 
   "time to first paint' atau saat laman pertama kali terlihat oleh pengguna. Garis merah menggambarkan kejadian `load`.

4. **Details**. Bila sebuah kejadian dipilih, panel ini menampilkan informasi selengkapnya 
   tentang kejadian tersebut. Bila tidak ada kejadian yang dipilih, panel ini menunjukkan informasi 
   tentang bingkai waktu yang dipilih. 

![panel timeline teranotasi](imgs/timeline-annotated.png)

### Panel Overview

Panel **Overview** terdiri dari tiga grafik:

1. **FPS**. Frame Per Second atau Bingkai Per Detik. Semakin tinggi bilah hijau, semakin tinggi 
   FPS. Blok merah di atas grafik FPS menunjukkan bingkai panjang, yang merupakan 
   potensi [tampilan tersendat atau "jank"][jank].
2. **CPU**. Sumber daya CPU. [Bagan area][ac] ini menunjukkan jenis kejadian apa 
   yang menggunakan sumber daya CPU.
3. **NET**. Setiap bilah berwarna mewakili satu sumber daya. Semakin panjang bilah, semakin
   lama waktu yang dibutuhkan untuk mengambil sumber daya. Bagian yang berwarna lebih muda di tiap bilah 
   menggambarkan waktu tunggu (waktu antara sumber daya diminta
   sampai dengan waktu byte pertama diunduh). Bagian yang berwarna lebih gelap
   menggambarkan waktu transfer (waktu antara byte pertama dan terakhir
   diunduh).

   Bilah diberi tanda warna sebagai berikut:
   <!-- source: https://goo.gl/eANVFf -->
   
   * File HTML berwarna **<span style="color:hsl(214, 67%, 66%)">biru</span>**.
   * Skrip berwarna **<span style="color:hsl(43, 83%, 64%)">kuning</span>**.
   * Stylesheet berwarna **<span style="color:hsl(256, 67%, 70%)">ungu</span>**.
   * File media berwarna **<span style="color:hsl(109, 33%, 55%)">hijau</span>**.
   * Sumber daya lainnya berwarna 
     **<span style="color:hsl(0, 0%, 70%)">abu-abu</span>**.

![panel overview, teranotasi](imgs/overview-annotated.jpg)

[ac]: https://en.wikipedia.org/wiki/Area_chart 
[jank]: /web/fundamentals/performance/rendering/

## Membuat sebuah rekaman

Untuk membuat rekaman *pemuatan laman*, buka panel **Timeline**, buka laman 
yang ingin Anda rekam, lalu muat ulang laman. Panel **Timeline** 
secara otomatis merekam muat ulang laman.

Untuk membuat rekaman *interaksi laman*, buka panel **Timeline**, lalu
mulai perekaman dengan menekan tombol **Record** 
(![tombol record](imgs/record-off.png){:.inline}) atau dengan mengetikkan pintasan 
keyboard <kbd>Cmd</kbd>+<kbd>E</kbd> (Mac) atau <kbd>Ctrl</kbd>+<kbd>E</kbd> 
(Windows/Linux). Tombol **Record** menjadi merah selama perekaman berlangsung. Lakukan 
interaksi laman, dan kemudian tekan tombol **Record** atau ketik 
pintasan keyboard lagi untuk menghentikan perekaman.

Ketika rekaman selesai, DevTools menebak bagian rekaman yang
paling relevan bagi Anda, dan secara otomatis memperbesar ke bagian itu.

### Tip rekaman

* **Usahakan rekaman sesingkat mungkin**. Rekaman yang singkat secara umum memudahkan 
   analisis.
* **Hindari tindakan yang tidak perlu**. Hindari tindakan (klik mouse, pemuatan jaringan, 
  dsb.) yang menambah beban pada aktivitas yang ingin Anda rekam dan analisis.
  Misalnya, jika Anda ingin merekam kejadian yang terjadi setelah Anda mengeklik tombol 
  Login, jangan secara bersamaan menggulir laman, memuat gambar, dan lain sebagainya.
* **Nonaktifkan cache browser**. Saat merekam operasi jaringan, sebaiknya 
  nonaktifkan cache browser dari panel Settings DevTools atau
  panel samping [**Network conditions**][nc].
* **Nonaktifkan ekstensi**. Ekstensi Chrome bisa menambah noise yang tidak terkait ke 
  rekaman Timeline aplikasi Anda. Buka jendela Chrome dalam 
  [mode penyamaran][incognito], atau buat 
  [profil pengguna Chrome][new chrome profile] yang baru untuk memastikan bahwa lingkungan Anda
  tidak memiliki ekstensi.

[nc]: /web/tools/chrome-devtools/profile/network-performance/network-conditions#network-conditions
[incognito]: https://support.google.com/chrome/answer/95464
[new chrome profile]: https://support.google.com/chrome/answer/142059

## Menampilkan detail perekaman

Ketika Anda memilih sebuah kejadian di **Flame Chart**, panel **Details** menampilkan 
informasi tambahan tentang kejadian tersebut.

![panel details](imgs/details-pane.png)

Beberapa tab, seperti **Summary**, hadir untuk semua jenis kejadian. Tab lain hanya
tersedia untuk beberapa jenis kejadian tertentu. Lihat [referensi 
kejadian Timeline][event reference] untuk detail mengenai setiap jenis perekaman.

[event reference]: /web/tools/chrome-devtools/profile/evaluate-performance/performance-reference

## Mengambil tangkapan layar saat merekam {:#filmstrip}

Panel **Timeline** bisa merekam tangkapan layar selama pemuatan laman. Fitur ini
dikenal sebagai **Filmstrip**.

Aktifkan kotak centang **Screenshots** di panel **Controls** sebelum Anda membuat
rekaman untuk merekam tangkapan layar dari rekaman. Tangkapan layar
ditampilkan di bawah panel **Overview**.

![perekaman timeline dengan filmstrip](imgs/timeline-filmstrip.png)

Arahkan kursor mouse ke atas **Screenshots** atau panel **Overview** untuk menampilkan tangkapan layar 
yang diperbesar di titik rekaman tersebut. Gerakkan mouse ke kiri dan
kanan untuk menyimulasikan animasi perekaman.

<video src="animations/hover.mp4" autoplay muted loop controls></video>

## Profil JavaScript {:#profile-js}

Aktifkan kotak centang **JS Profile** sebelum Anda merekam untuk menangkap 
tumpukan JavaScript dalam rekaman timeline Anda. Ketika JS profiler 
diaktifkan, bagan api akan menunjukkan semua fungsi JavaScript yang dipanggil. 

![bagan api dengan JS profile diaktifkan](imgs/js-profile.png)

## Profil painting {:#profile-painting}

Aktifkan kotak centang **Paint** sebelum Anda merekam untuk mendapatkan wawasan
yang lebih dalam mengenai kejadian **Paint**. Ketika paint profiling diaktifkan dan Anda mengeklik
pada kejadian **Paint**, tab **Paint Profiler** baru akan ditampilkan di panel 
**Details** yang menunjukkan lebih banyak informasi terperinci mengenai kejadian tersebut.

![profiler paint](imgs/paint-profiler.png)

### Setelan Rendering {:#rendering-settings}

Buka menu DevTools utama dan pilih **More tools** > **Rendering settings**
untuk mengakses setelan render yang mungkin bisa membantu ketika mendebug masalah paint.
Setelan render terbuka sebagai tab di sebelah panel samping **Console** (tekan
<kbd>esc</kbd> untuk menampilkan panel samping tersebut, jika tersembunyi).

![setelan rendering](imgs/rendering-settings.png)

## Penelusuran rekaman

Saat melihat kejadian, Anda mungkin ingin berfokus pada satu jenis kejadian. Misalnya,
mungkin Anda perlu melihat detail setiap kejadian `Parse HTML`. 

Tekan <kbd>Cmd</kbd>+<kbd>F</kbd> (Mac) atau <kbd>Ctrl</kbd>+<kbd>F</kbd> 
(Windows / Linux) selagi **Timeline** berada di fokus untuk membuka bilah alat Find.
Ketikkan nama jenis kejadian yang ingin Anda periksa, seperti `Event`.

Bilah alat hanya berlaku pada rentang waktu yang saat ini dipilih. Kejadian 
apa pun di luar rentang waktu yang dipilih tidak disertakan ke dalam hasil. 

Panah atas dan bawah akan mengarahkan Anda secara kronologis di hasil. Jadi,
hasil pertama mewakili kejadian paling awal di rentang waktu yang dipilih, dan
hasil terakhir mewakili kejadian terakhir. Setiap kali Anda menekan panah
atas atau bawah, sebuah kejadian baru dipilih, sehingga Anda bisa menampilkan detailnya di panel
**Details**. Menekan panah atas dan bawah sama dengan mengeklik 
sebuah kejadian di **Flame Chart**.

![bilah alat find](imgs/find-toolbar.png)

## Memperbesar bagian Timeline {:#zoom}

Anda bisa memperbesar bagian rekaman untuk mempermudah analisis. Gunakan
panel **Overview** untuk memperbesar bagian rekaman. Setelah dilakukan zoom,
**Flame Chart** secara otomatis diperbesar agar sesuai dengan bagian yang sama.

![memperbesar bagian perekaman timeline](imgs/zoom.png)

Untuk memperbesar bagian Timeline:

* Di panel **Overview**, seret pilihan Timeline dengan mouse Anda.
* Atur penggeser abu-abu di area penggaris.

Setelah menentukan bagian yang dipilih, Anda bisa menggunakan tombol <kbd>W</kbd>,<kbd>A</kbd>,
<kbd>S</kbd>, dan <kbd>D</kbd> untuk menyesuaikan pilihan Anda. <kbd>W</kbd> 
dan <kbd>S</kbd> masing-masing untuk memperbesar dan memperkecil. <kbd>A</kbd> dan 
<kbd>D</kbd> masing-masing untuk bergerak ke kiri dan ke kanan.

## Menyimpan dan memuat rekaman

Anda bisa menyimpan dan membuka rekaman dengan mengeklik kanan di dalam panel 
**Overview** atau **Flame Chart** dan memilih opsi yang relevan.

![menyimpan dan membuka rekaman](imgs/save-open.png)


{# wf_devsite_translation #}
