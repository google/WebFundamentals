project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Pada perangkat dengan kemampuan telepon, permudah pengguna untuk langsung terhubung dengan Anda hanya dengan menekan nomor telepon, lebih dikenal sebagai klik untuk menelepon.

{# wf_updated_on: 2017-07-17 #}
{# wf_published_on: 2014-06-17 #}

# Klik untuk Menelepon {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

Pada perangkat dengan kemampuan ponsel, permudah pengguna untuk langsung terhubung
dengan Anda hanya dengan menekan nomor telepon, lebih dikenal sebagai klik untuk menelepon.

### TL;DR {: .hide-from-toc }

* Menempatkan semua nomor ponsel dalam hyperlink dengan skema `tel:`.
* Selalu menggunakan format panggilan internasional.


## Menautkan nomor telepon bagi klik untuk menelepon

Meskipun banyak browser seluler modern secara otomatis mendeteksi nomor ponsel 
dan mengubahnya menjadi tautan, lebih bagus lagi jika hal ini dilakukan langsung dalam kode Anda.
Dengan pemberian tag setiap nomor telepon secara manual, Anda bisa memastikan nomor telepon selalu
aktif bagi klik untuk menelepon dan gaya penampilannya sesuai dengan situs Anda.

Untuk menandai nomor ponsel sebagai tautan, gunakan skema `tel:`.  Sintaksnya adalah 
sederhana:


    NIST Telephone Time-of-Day Service 
    <a href="tel:+1-303-499-7111">+1 (303) 499-7111</a>

Browser menampilkan sintaks ini sebagai berikut:

NIST Telephone Time-of-Day Service <a href="tel:+1-303-499-7111">+1 (303) 499-7111</a>

<div class="attempt-right">
  <figure>
    <img src="images/click-to-call_framed.jpg" >
    <figcaption>Contoh klik untuk menelepon</figcaption>
  </figure>
</div>

Pada kebanyakan perangkat dengan kemampuan menelepon, pengguna akan menerima
konfirmasi sebelum nomor dihubungi, untuk memastikan pengguna tidak
tertipu untuk menghubungi nomor interlokal atau premium yang berbiaya mahal.
Bila perangkat tidak mendukung panggilan telepon, pengguna mungkin dapat diberikan
menu yang memungkinkan mereka untuk memilih bagaimana browser harus menangani nomor tersebut.

Browser desktop yang tidak mendukung panggilan suara akan membuka aplikasi telepon
default pada komputer, misalnya Google Voice atau Microsoft
Communicator.

## Menggunakan format panggilan internasional

Selalu berikan nomor telepon dengan menggunakan format panggilan internasional: 
tanda tambah (`+`), kode negara, kode area, dan nomor.  Meskipun tidak mutlak
diperlukan, akan lebih bagus jika memisahkan setiap segmen nomor dengan
tanda hubung (`-`) agar lebih mudah dibaca dan deteksi otomatis yang lebih baik.

Menggunakan format panggilan internasional yang ditulis dengan tanda hubung akan memastikan bahwa dari mana pun
pengguna menelepon, apakah hanya beberapa ratus meter atau bahkan ribuan
kilometer, panggilan mereka akan terhubung.

## Menonaktifkan deteksi otomatis bila diperlukan

Browser seluler modern secara otomatis mendeteksi nomor ponsel dan mengaktifkan
klik untuk menelepon. Mobile Safari secara otomatis mengonversi nomor ponsel ke tautan
dengan gaya hyperlink yang terkait. Chrome untuk Android secara otomatis
mendeteksi nomor ponsel dan memungkinkan pengguna melakukan klik untuk menelepon, tetapi tidak menempatkannya
dalam hyperlink atau menerapkan gaya khusus.

Untuk mencegah Mobile Safari secara otomatis mendeteksi nomor ponsel, tambahkan
tag meta berikut ke bagian atas laman:


    <meta name="format-detection" content="telephone=no">


## Fitur klik untuk menelepon lainnya

Selain skema `tel:`, beberapa browser modern juga mendukung skema `sms:`
dan `mms:`, meskipun dukungan ini tidak konsisten, dan beberapa
fitur seperti setelan tubuh pesan tidak selalu berfungsi. 


{# wf_devsite_translation #}
