project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Identifikasi fungsi yang berat dengan menggunakan CPU Profiler di Chrome DevTools.

{# wf_updated_on: 2016-03-30 #}
{# wf_published_on: 2015-04-13 #}

# Percepat Eksekusi JavaScript {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

Identifikasi fungsi yang berat dengan menggunakan CPU Profiler di 
Chrome DevTools.

![profil CPU](imgs/cpu-profile.png)


### TL;DR {: .hide-from-toc }
- Rekam secara persis fungsi mana yang dipanggil dan berapa lama waktu yang dihabiskan masing-masing fungsi dengan CPU Profiler.
- Memvisualkan profil Anda sebagai flame chart.


## Merekam profil CPU {:#record-profile}

Jika Anda melihat adanya jank atau sendatan di JavaScript, kumpulkan profil CPU JavaScript.
Profil CPU menampilkan di mana saja waktu eksekusi dihabiskan di fungsi laman Anda.

1. Masuklah ke panel **Profiles** di DevTools.
2. Pilih tombol radio **Collect JavaScript CPU Profile**.
3. Tekan **Start**.
4. Tergantung pada apa yang ingin Anda coba analisis, Anda bisa memuat ulang 
   laman, berinteraksi dengan laman, atau hanya membiarkan laman berjalan.
5. Tekan tombol **Stop** setelah selesai. 

Anda juga bisa menggunakan [Command Line API][profile] untuk merekam dan mengelompokkan profil 
dari baris perintah.

[profile]: /web/tools/chrome-devtools/debug/command-line/command-line-reference#profilename-and-profileendname

## Tampilkan profil CPU {:#view-profile}

Bila Anda selesai merekam, DevTools secara otomatis mengisi panel Profile
dengan data dari rekaman. 

Tampilan defaultnya adalah **Heavy (Bottom Up)**. Tampilan ini memungkinkan Anda melihat 
fungsi mana yang berdampak paling besar terhadap kinerja dan memeriksa jalur
yang memanggil ke fungsi tersebut. 

### Mengubah urutan penyortiran {:#sort}

Untuk mengubah urutan penyortiran, klik menu tarik-turun di sebelah ikon 
**focus selected function**
(![ikon focus selected function](imgs/focus.png){:.inline}) 
kemudian pilih salah satu opsi berikut:

**Bagan**. Menampilkan bagan api kronologis rekaman.

![bagan api](imgs/flamechart.png)

**Heavy (Bottom Up)**. Menampilkan fungsi menurut dampak pada kinerja dan memungkinkan Anda
memeriksa jalur yang memanggil ke fungsi. Ini adalah tampilan default-nya. 

![bagan heavy](imgs/heavy.png)

**Tree (Top Down)**. Menampilkan gambaran keseluruhan struktur pemanggilan, 
mulai dari bagian paling atas tumpukan panggilan. 

![bagan tree](imgs/tree.png)

### Mengecualikan fungsi {:#exclude}

Untuk mengecualikan fungsi dari profil CPU Anda, klik fungsi yang dimaksud untuk memilihnya dan 
tekan ikon **exclude selected function** 
(![ikon exclude function](imgs/exclude.png){:.inline}). Pemanggil fungsi 
yang dikecualikan dibebani dengan waktu total fungsi yang dikecualikan.

Klik ikon **restore all functions** 
(![restore all functions icon](imgs/restore.png){:.inline})
untuk mengembalikan semua fungsi yang dikecualikan ke rekaman.

## Menampilkan profil CPU sebagai Flame Chart {:#flame-chart}

Tampilan Flame Chart menyediakan gambaran visual profil CPU
seiring waktu.

Setelah [merekam profil CPU](#record-profile), tampilkan rekaman sebagai 
bagan api dengan [mengubah urutan penyortiran](#sort) ke **Chart**.

![Tampilan bagan api](imgs/flamechart.png)

Bagan api dipecah menjadi dua bagian:

1. **Overview**. Tampilan menyeluruh seluruh rekaman.
   Tinggi bilah menggambarkan kedalaman 
   tumpukan panggilan. Jadi, semakin tinggi bilah, semakin dalam tumpukan panggilan. 

2. **Call Stacks**. Ini adalah tampilan mendalam fungsi yang dipanggil 
   selama rekaman. Sumbu horizontal adalah waktu dan sumbu vertikal adalah 
   tumpukan panggilan. Tumpukan disusun dari atas ke bawah. Jadi, fungsi di atas
  memanggil fungsi di bawahnya, dan seterusnya. 

   Fungsi diberi warna secara acak. Tidak ada hubungan antara warna yang digunakan
   di panel lainnya. Akan tetapi, fungsi selalu diberi warna yang sama
   di seluruh pemanggilan sehingga Anda bisa melihat pola eksekusi. 

![bagan api beranotasi](imgs/annotated-cpu-flame.png)

Tumpukan panggilan yang tinggi tidak selalu penting, ini hanyalah tanda bahwa banyak sekali
fungsi yang dipanggil. Bilah lebar berarti bahwa sebuah panggilan memakan waktu lama 
untuk diselesaikan. Inilah yang berpeluang dioptimalkan. 

### Memperbesar bagian rekaman tertentu {:#zoom}

Klik, tahan, dan seret mouse ke kiri dan ke kanan pada ringkasan untuk memperbesar
bagian khusus tumpukan panggilan. Setelah memperbesar, tumpukan panggilan 
secara otomatis menampilkan bagian rekaman yang Anda pilih.

![bagan api diperbesar](imgs/benchmark-zoom.png)

### Menampilkan detail fungsi {:#flame-chart-function-details}

Klik sebuah fungsi untuk melihat definisinya di panel **Sources**.

Arahkan ke atas fungsi untuk menampilkan nama dan data pengaturan waktunya. Informasi
berikut disediakan: 

*  **Name**. Nama fungsi.
*  **Self time**. Waktu yang dibutuhkan untuk menyelesaikan pembukaan fungsi 
   saat ini, termasuk hanya pernyataan di fungsi itu sendiri, tidak 
   termasuk fungsi apa pun yang dipanggilnya.
*  **Total time**. Waktu yang dibutuhkan untuk menyelesaikan pembukaan fungsi 
   saat ini dan fungsi apa pun yang dipanggilnya.
*  **URL**. Lokasi definisi fungsi dalam bentuk 
   `file.js:100` yang `file.js` berarti nama file tempat fungsi
   didefinisikan dan `100` adalah nomor baris definisi.
*  **Aggregated self time**. Kumpulan waktu untuk semua pembukaan fungsi 
   di seluruh rekaman, tidak termasuk fungsi yang dipanggil oleh 
   fungsi ini.
*  **Aggregated total time**. Kumpulan waktu total untuk semua pembukaan fungsi 
   , termasuk fungsi yang diambil oleh fungsi ini.
*  **Not optimized**. Jika profiler mendeteksi kemungkinan optimalisasi
   bagi fungsi, profiler akan menampilkannya di sini.

![menampilkan detail fungsi di bagan api](imgs/details.png)


{# wf_devsite_translation #}
