project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Memeriksa dan mengedit HTML dan CSS laman.

{# wf_updated_on: 2016-01-28 #}
{# wf_published_on: 2015-04-13 #}

# Memeriksa dan Mengedit Laman dan Gaya {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/kaycebasques.html" %}

Memeriksa dan mengedit langsung HTML dan CSS laman menggunakan panel Elements pada 
Chrome DevTools.

![Panel Chrome DevTools Elements](imgs/elements-panel.png)


### TL;DR {: .hide-from-toc }
- Memeriksa dan mengedit langsung elemen apa pun di pohon DOM di panel Elements.
- Menampilkan dan mengubah aturan CSS yang diterapkan pada elemen yang dipilih di panel Styles.
- Menampilkan dan mengedit model kotak elemen yang dipilih di panel Computed.
- Menampilkan perubahan apa pun yang dibuat pada laman Anda secara lokal di panel Sources.


## Mengedit langsung simpul DOM

Untuk mengedit langsung simpul DOM, cukup klik dua kali 
[elemen yang dipilih](#inspect-an-element) dan buat perubahan:

<video src="animations/edit-element-name.mp4" style="max-width:100%;"
       loop muted autoplay controls></video>

Tampilan pohon DOM menampilkan keadaan terkini pohon tersebut, yang belum tentu sesuai dengan 
HTML yang dimuat semula karena berbagai alasan. Misalnya, 
Anda bisa mengubah pohon DOM menggunakan JavaScript, mesin browser bisa mencoba 
memperbaiki markup penulisan yang tidak valid dan menghasilkan DOM yang tidak diharapkan.

## Mengedit langsung gaya

Edit langsung nama dan nilai properti gaya di panel **Styles**. Semua
gaya bisa diedit, kecuali yang diwarnai abu-abu (seperti halnya
stylesheet agen-pengguna).

Untuk mengedit nama atau nilai, klik nama atau nilai tersebut, lakukan perubahan, dan tekan
<kbd class="kbd">Tab</kbd> atau <kbd class="kbd">Enter</kbd> untuk menyimpan perubahan itu.

![edit nama properti](imgs/edit-property-name.png)

Secara default, perubahan CSS Anda tidak permanen, perubahan akan hilang saat 
Anda memuat ulang laman. Siapkan [penulisan 
persisten](/web/tools/setup/setup-workflow) jika Anda ingin mempertahankan 
perubahan Anda antar pemuatan laman. 

## Memeriksa dan mengedit parameter model kotak

Periksa dan edit parameter model kotak untuk elemen saat ini menggunakan 
**panel Computed**. Semua nilai di model kotak bisa diedit, cukup klik 
nilai tersebut.

![Panel Computed](imgs/computed-pane.png)

Kotak konsentris berisi nilai **top**, **bottom**, **left**, **right**
untuk properti **padding**, **border**, dan **margin**
elemen saat ini. 

Untuk elemen yang posisinya tidak statis, kotak **position** 
juga ditampilkan, yang berisi nilai properti **top**, 
**right**, **bottom**, dan **left**.

![elemen computed non-statis](imgs/computed-non-static.png)

Untuk elemen `position: fixed` dan `position: absolute`, bidang 
tengah berisi dimensi piksel **offsetWidth × offsetHeight** sebenarnya 
dari elemen yang dipilih. Semua nilai bisa diubah dengan mengeklik dua kali 
nilai tersebut, seperti nilai properti di panel Styles. Akan tetapi, perubahan tidak 
dijamin memberi dampak, karena ini tergantung pada detail penentuan posisi 
elemen sebenarnya.

![memperbaiki elemen computed](imgs/computed-fixed.png)

## Menampilkan perubahan lokal

<video src="animations/revisions.mp4" style="max-width:100%;"
       autoplay loop muted controls></video>

Untuk menampilkan riwayat pengeditan langsung yang dibuat pada laman Anda:

1. Di panel **Styles**, klik file yang sudah Anda ubah. DevTools
   akan membuka panel **Sources**.
1. Klik kanan file. 
1. Pilih **Local modifications**.

Untuk menjelajah perubahan yang dibuat:

* Luaskan nama file tingkat atas untuk melihat waktu 
  ![waktu saat perubahan terjadi](imgs/image_25.png){:.inline} 
  saat perubahan terjadi.
* Luaskan item tingkat kedua untuk melihat 
  [diff](https://en.wikipedia.org/wiki/Diff) (sebelum dan sesudah) 
  terkait dengan perubahan. Baris dengan latar belakang merah muda menandakan 
  penghapusan, sedangkan baris dengan latar belakang hijau menandakan penambahan.

## Mengurungkan perubahan

Jika Anda belum [menyiapkan penulisan persisten](/web/tools/setup/setup-workflow), 
setiap kali Anda memuat ulang laman, semua pengeditan langsung akan hilang.

Jika Anda sudah menyiapkan penulisan persisten, untuk mengurungkan perubahan:

* Gunakan <kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">Z</kbd> (Windows) atau 
  <kbd class="kbd">Cmd</kbd>+<kbd class="kbd">Z</kbd> (Mac) untuk secara cepat mengurungkan 
  perubahan minor pada DOM atau gaya melalui panel Elements.

* Untuk mengurungkan semua perubahan lokal yang dibuat pada file, buka panel **Sources** 
  dan pilih **revert** di sebelah nama file.

[periksa]: /web/tools/chrome-devtools/debug/command-line/command-line-reference#inspect


{# wf_devsite_translation #}
