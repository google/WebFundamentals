project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Mudah bagi kita untuk melupakan kondisi jaringan yang dihadapi oleh pengguna di perangkat seluler. Gunakan DevTools untuk mengemulasi kondisi jaringan yang berbeda. Perbaiki masalah waktu muat apa pun, maka pengguna akan berterima kasih.

{# wf_updated_on: 2015-07-20 #}
{# wf_published_on: 2015-04-13 #}

# Mengoptimalkan Kinerja pada Berbagai Kondisi Jaringan {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/jonathangarbee.html" %}

Mudah bagi kita untuk melupakan kondisi jaringan yang dihadapi oleh pengguna di perangkat seluler. Gunakan DevTools untuk mengemulasi kondisi jaringan yang berbeda. Perbaiki masalah waktu muat apa pun, maka pengguna akan berterima kasih.


### TL;DR {: .hide-from-toc }
- Tanpa memengaruhi lalu lintas ke tab lain, mengevaluasi kinerja situs menggunakan emulator jaringan Chrome DevTools.
- Menggunakan profil khusus yang spesifik untuk kondisi jaringan pengguna tertentu.


## Mengemulasi konektivitas jaringan

Penyesuaian kondisi jaringan memungkinkan Anda menguji situs pada berbagai koneksi jaringan, termasuk Edge, 3G, dan bahkan offline.
Ini juga membatasi throughput pengunduhan dan pengunggahan maksimum.
Manipulasi latensi memaksa penundaan minimum pada round-trip time (RTT) koneksi.

Penyesuaian kondisi jaringan diaktifkan melalui panel Network.
Pilih koneksi dari menu tarik-turun untuk menerapkan throttling jaringan dan manipulasi latensi.

![Pilih Network Throttle](imgs/throttle-selection.png)

**Tip**: Anda juga bisa menyetel pembatasan jaringan melalui panel samping 
[Network conditions](#network-conditions).

Bila ada pembatasan yang diaktifkan, indikator panel akan menampilkan ikon peringatan.
Ini untuk mengingatkan Anda bahwa pembatasan diaktifkan saat Anda berada di panel lain.

![Pemilih Network Panel Dengan Indikator Peringatan](imgs/throttling-enabled.png)

## Pembatasan khusus

DevTools menyediakan dasar yang kuat pada kondisi default.
Anda mungkin perlu menambahkan kondisi khusus agar bisa mencakup kondisi utama pengguna.

Untuk menambahkan kondisi, buka menu tarik-turun untuk menerapkan kondisi.
Di bawah header **custom**, cari dan pilih opsi **Add...**.
Ini akan membuka dialog setelan DevTools dengan tab "Throttling" terbuka.

![Indeks Setelan Pembatasan](imgs/throttle-index.png)

Pertama, klik tombol **Add custom profile**.
Ini akan membuka formulir inline untuk memasukkan kondisi profil.
Isilah formulir dengan akurat, lalu tekan tombol **Add** jika sudah sesuai dengan kebutuhan.

![Setelan Pembatasan, Menambahkan Pembatasan Khusus](imgs/add-custom-throttle.png)

Anda bisa mengubah profil khusus yang sudah ada dengan mengarahkan kursor ke atas entri.
Saat melakukan itu, ikon **Edit** dan **Delete** ditampilkan di sebelah kanan entri.

![Setelan Pembatasan Memodifikasi Entri Khusus](imgs/hover-to-modify-custom-throttle.png)

Sekarang Anda bisa menutup dialog setelan.
Profil khusus baru ini akan ditampilkan di bawah header **custom** untuk memilih kondisi.

## Membuka panel samping network conditions {:#network-conditions}

Anda bisa mengakses fungsi jaringan saat panel DevTools lainnya sedang terbuka, dengan
panel samping **Network conditions**. 

![panel samping network conditions](imgs/network-drawer.png)

Akses panel samping dari menu utama DevTools (**Main Menu** > **More Tools** >
**Network Conditions**).

![membuka panel samping network conditions](imgs/open-network-drawer.png)


{# wf_devsite_translation #}
