project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Memeriksa dan mengubah animasi dengan Chrome DevTools Animation Inspector.

{# wf_updated_on: 2016-05-02 #}
{# wf_published_on: 2016-05-02 #}

# Memeriksa animasi {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Memeriksa dan mengubah animasi dengan Chrome DevTools
Animation Inspector.

![animation inspector](imgs/animation-inspector.png)


### TL;DR {: .hide-from-toc }
- Merekam animasi dengan membuka Animation Inspector. Alat ini secara otomatis mendeteksi animasi dan mengelompokkannya.
- Memeriksa animasi dengan memperlambat, memutar ulang, atau melihat kode sumbernya.
- Mengubah animasi dengan mengubah pengaturan waktu, penundaan, durasi, atau offset keyframe.


## Ringkasan {:#overview}

Chrome DevTools Animation Inspector memiliki dua tujuan utama. 

* Memeriksa animasi. Jika Anda ingin memperlambat, memutar ulang, atau memeriksa 
  kode sumber untuk grup animasi. 
* Mengubah animasi. Jika Anda ingin mengubah pengaturan waktu, penundaan, durasi, 
  atau offset keyframe grup animasi. Pengeditan bezier dan pengeditan 
  keyframe saat ini tidak didukung. 

Animation Inspector mendukung animasi CSS,
transisi CSS, dan animasi web. Animasi `requestAnimationFrame` 
saat ini tidak didukung.

### Apa itu grup animasi?

Grup animasi adalah sekelompok animasi yang 
*tampaknya* saling berkaitan. Saat ini, web belum memiliki konsep nyata
animasi grup, sehingga desainer animasi dan developer harus membuat 
dan mengatur waktu masing-masing animasi sehingga tampak seperti satu efek 
visual yang menyatu. Animation Inspector memprediksi animasi mana yang berkaitan berdasarkan 
waktu mulai (tanpa memperhitungkan penundaan, dan seterusnya) dan mengelompokkan semuanya secara berdampingan.
Dengan kata lain, serangkaian animasi yang semuanya dipicu di blok skrip yang sama 
dikelompokkan bersama, tetapi jika asinkron, akan dikelompokkan 
secara terpisah. 

## Memulai

Ada dua cara untuk membuka Animation Inspector:

* Buka panel **Styles** (di panel **Elements**) dan tekan tombol 
  **Animations** (![tombol 
  animations](imgs/animations-button.png){:.inline}). 
* Buka Menu Command dan ketikkan `Drawer: Show Animations`. 

Animation Inspector akan terbuka sebagai tab di sebelah Console Drawer. Karena
ini merupakan tab Panel Samping, Anda bisa menggunakannya dari panel DevTools mana saja. 

![Animation Inspector Kosong](imgs/empty-ai.png)

Animation Inspector dikelompokkan menjadi empat bagian utama (atau panel). Panduan
ini mengacu ke setiap panel sebagai berikut:

1. **Controls**. Dari sini, Anda bisa membersihkan semua Grup Animasi 
   yang saat ini direkam, atau mengubah kecepatan Grup Animasi yang saat ini dipilih.
2. **Overview**. Pilih Grup Animasi di sini untuk diperiksa 
   dan ubah di panel **Details**.
3. **Timeline**. Jeda dan mulai animasi dari sini, atau masuk ke titik tertentu 
   di animasi.
4. **Details**. Periksa dan ubah Grup Animasi
   yang saat ini dipilih. 

![Animation Inspector anotasi](imgs/annotated-animation-inspector.png)

Untuk merekam animasi, cukup lakukan interaksi yang memicu
animasi saat Animation Inspector terbuka. Jika animasi dipicu 
saat laman dimuat, Anda bisa membantu Animation Inspector untuk mendeteksi animasi dengan 
memuat ulang laman. 

<video src="animations/capture-animations.mp4"
       autoplay loop muted controls></video>

## Memeriksa animasi {:#inspect}

Setelah Anda merekam animasi, ada beberapa cara untuk memutar ulang:

* Arahkan kursor ke atas gambar kecilnya di panel **Overview** untuk melihat pratinjaunya.
* Pilih Grup Animasi dari panel **Overview** (sehingga ditampilkan
  di panel **Details**) dan tekan tombol **replay**
  (![tombol replay](imgs/replay-button.png){:.inline}). Animasi diputar ulang
  di tampilan yang terlihat.
  Klik tombol **animation speed** (![tombol 
  animation speed](imgs/animation-speed-buttons.png){:.inline}) untuk mengubah kecepatan 
  pratinjau Grup Animasi yang saat ini dipilih. Anda bisa menggunakan bilah vertikal 
  merah untuk mengubah posisi Anda saat ini. 
* Klik dan seret bilah vertikal merah untuk menghapus animasi tampilan yang terlihat. 

### Menampilkan detail animasi

Setelah Anda merekam Grup Animasi, klik grup itu dari panel **Overview** 
untuk melihat detailnya. Dalam panel **Details** setiap animasi ditampilkan
di baris masing-masing. 

![detail grup animasi](imgs/animation-group-details.png)

Arahkan ke atas animasi untuk menyorotinya di tampilan yang terlihat. Klik animasi itu
untuk memilihnya di panel **Elements**. 

![arahkan ke atas animasi untuk menyorotinya di 
tampilan yang terlihat](imgs/highlight-animation.png)

Bagian animasi paling kiri yang lebih gelap adalah definisinya. Di sebelah kanan,
bagian yang lebih terang menggambarkan iterasinya. Misalnya, di 
tangkapan layar berikut, bagian dua dan tiga menggambarkan iterasi bagian satu. 

![diagram iterasi animasi](imgs/animation-iterations.png)

Jika dua elemen menggunakan animasi yang sama, Animation 
Inspector menandai kedua elemen tersebut dengan warna yang sama. Warna ini sendiri acak dan 
tidak bermakna apa-apa.
Misalnya, di tangkapan layar berikut, dua elemen `div.eye.left::after` 
dan `div.eye.right::after` menggunakan animasi yang sama (`eyes`), 
sebagaimana elemen `div.feet::before` dan `div.feet::after`. 

![animasi diberi kode warna](imgs/color-coded-animations.png)

## Mengubah animasi {:#modify}

Ada tiga cara untuk mengubah animasi dengan Animation Inspector:

* Durasi animasi.
* Pengaturan waktu keyframe.
* Penundaan waktu mulai.

Untuk bagian ini, misalkan tangkapan layar berikut menggambarkan animasi
asli:

![animasi asli sebelum diubah](imgs/modify-original.png)

Untuk mengubah durasi animasi, klik dan seret lingkaran pertama atau 
terakhir.

![durasi diubah](imgs/modify-duration.png)

Jika animasi mendefinisikan aturan keyframe, aturan tersebut digambarkan sebagai
lingkaran dalam berwarna putih. Klik dan seret salah satu lingkaran ini untuk mengubah pengaturan waktu 
keyframe.

![keyframe diubah](imgs/modify-keyframe.png)

Untuk menambahkan penundaan pada animasi, klik dan seret di mana pun kecuali 
di lingkaran. 

![penundaan diubah](imgs/modify-delay.png)


{# wf_devsite_translation #}
