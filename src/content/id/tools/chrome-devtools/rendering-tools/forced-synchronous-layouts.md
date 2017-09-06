project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Ikuti terus panduan interaktif ini untuk mempelajari cara menggunakan DevTools guna mendiagnosis layout sinkron paksa.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2015-04-13 #}

# Mendiagnosis Layout Sinkron Paksa {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

Pelajari cara menggunakan DevTools untuk mendiagnosis layout 
sinkron paksa.

Dalam panduan ini, Anda akan mempelajari cara men-debug [layout sinkron paksa][fsl] dengan 
mengidentifikasi dan memperbaiki masalah di demo langsung.  Demo menggerakkan gambar 
menggunakan [`requestAnimationFrame()`][raf], yang merupakan pendekatan yang disarankan untuk 
animasi berbasis bingkai. Akan tetapi, cukup banyak jank atau sendatan di 
animasi. Sasaran Anda adalah mengidentifikasi sebab jank dan memperbaiki masalah sehingga 
demo berjalan mulus di 60 FPS. 

[fsl]: /web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing#avoid-forced-synchronous-layouts

[raf]: /web/fundamentals/performance/rendering/optimize-javascript-execution#use-requestanimationframe-for-visual-changes


## Mengumpulkan data

Pertama, Anda perlu merekam data agar bisa memahami dengan persis apa yang terjadi
saat laman dijalankan. 

1. Buka [demo](https://googlesamples.github.io/web-fundamentals/tools/chrome-devtools/rendering-tools/forcedsync.html).
2. Buka panel **Timeline** DevTools.
3. Aktifkan opsi **JS Profile**. Saat menganalisis bagan api nanti, opsi
   ini akan memungkinkan Anda melihat secara persis fungsi mana yang dipanggil.
4. Klik **Start** di laman untuk memulai animasi.
5. Klik tombol **Record** pada panel Timeline untuk memulai rekaman
   Timeline.
1. Tunggu dua detik.
1. Klik tombol **Record** lagi untuk menghentikan rekaman. 

Setelah selesai merekam, Anda seharusnya melihat sesuatu seperti berikut
di panel Timeline. 

![rekaman timeline demo tersendat](imgs/demo-recording.png)

## Identifikasi masalah

Sekarang setelah memiliki data, waktunya untuk memahaminya. 

Sekilas, Anda bisa melihat di panel **Summary** di rekaman Timeline 
bahwa browser menghabiskan sebagian besar waktunya pada rendering. Secara umum, jika Anda
bisa [mengoptimalkan operasi layout laman][layout], Anda mungkin bisa mengurangi
waktu yang dihabiskan untuk rendering. 

![Rangkuman timeline](imgs/summary.png)

Sekarang perhatikan bilah merah muda tepat di bawah panel **Overview**.
Ini menggambarkan bingkai. Arahkan kursor ke atasnya untuk melihat informasi selengkapnya tentang
bingkai.

![bingkai panjang](imgs/long-frame.png)

Bingkai memakan waktu lama untuk diselesaikan. Agar animasi berjalan mulus, sebaiknya targetkan
60 FPS. 

Sekarang waktunya mendiagnosis apa yang sebenarnya salah. Dengan menggunakan mouse Anda, 
[perbesar][zoom] tumpukan panggilan. 

![rekaman timeline diperbesar](imgs/zoom.png)

Bagian atas tumpukan adalah kejadian `Animation Frame Fired`. Fungsi yang Anda
teruskan ke `requestAnimationFrame()` dipanggil setiap kali kejadian ini dipicu.
Di bawah `Animation Frame Fired`, Anda akan melihat `Function Call`, dan di bawahnya, Anda 
melihat `update`. Anda kini mengetahui bahwa metode yang disebut sebagai `update()` adalah callback untuk
`requestAnimationFrame()`. 

Note: Di sinilah opsi **JS Profile** yang Anda aktifkan tadi menjadi 
berguna. Jika opsi ini dinonaktifkan, Anda hanya akan melihat `Function Call`, yang diikuti
oleh semua kejadian ungu kecil (yang akan dibahas nanti), tanpa detail tentang
fungsi mana yang sebenarnya dipanggil.

Sekarang, fokuskan perhatian Anda di kejadian ungu kecil di bawah kejadian `update`.
 Bagian atas beberapa kejadian ini berwarna merah. Ini adalah tanda peringatan.
Arahkan kursor ke atas kejadian ini, maka Anda akan melihat bahwa DevTools memperingatkan Anda bahwa 
laman Anda mungkin menjadi korban meng-ubah posisi/geometri paksa. Perubahan posisi/geometri paksa adalah nama lain dari 
layout sinkron paksa. 

![mengarahkan kursor ke atas kejadian layout](imgs/layout-hover.png)

Sekarang waktu memeriksa fungsi yang menyebabkan semua 
layout sinkron paksa. Klik salah satu kejadian layout untuk memilihnya.
Di panel Summary, Anda sekarang seharusnya melihat detail tentang kejadian ini. Klik tautan
di bawah **Layout Forced** (`update @ forcedsync.html:457`) untuk masuk ke
definisi fungsi.

![masuk ke definisi fungsi](imgs/jump.png)

Anda sekarang seharusnya melihat definisi fungsi di panel **Sources**. 

![definisi fungsi dalam panel sources](imgs/definition.png)

Fungsi `update()` adalah penangan callback untuk 
`requestAnimationCallback()`. Penangan menghitung setiap properti `left` gambar
berdasarkan nilai `offsetTop` gambar. Ini memaksa browser melakukan
layout baru segera untuk memastikan tersedianya nilai yang benar.
Pemaksaan layout pada setiap bingkai animasi adalah penyebab tersendatnya
animasi pada laman. 

Sekarang setelah mengidentifikasi masalah, Anda bisa mencoba memperbaikinya
di DevTools secara langsung.

[layout]: /web/tools/chrome-devtools/profile/rendering-tools/analyze-runtime#layout
[zoom]: /web/tools/chrome-devtools/profile/evaluate-performance/timeline-tool#zoom

## Terapkan perbaikan dalam DevTools

Skrip ini disematkan di HTML, sehingga Anda tidak bisa mengeditnya melalui panel **Sources**
(akan tetapi, skrip di `*.js` bisa diedit di panel Sources). 

Akan tetapi, untuk memeriksa perubahan, Anda bisa mendefinisikan ulang fungsi di Console.
Salin dan tempelkan definisi fungsi dari file HTML ke dalam Console
DevTools. Hapus pernyataan yang menggunakan `offsetTop` dan hapus komentar pernyataan 
di bawahnya. Tekan `Enter` bila selesai. 

![mendefinisikan ulang fungsi yang bermasalah](imgs/redefinition.png)

Mulai ulang animasi. Anda memverifikasi secara visual bahwa animasi sekarang jauh lebih halus. 

## Memverifikasi dengan rekaman lain

Praktik yang baik adalah mengambil rekaman lain dan memverifikasi bahwa 
animasi benar-benar lebih cepat dan lebih andal dari sebelumnya. 

![rekaman timeline setelah optimalisasi](imgs/after.png)

Jauh lebih baik.


{# wf_devsite_translation #}
