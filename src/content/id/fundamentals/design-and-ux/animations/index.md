project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Memahami animasi dan penggunaannya dengan lebih baik dalam aplikasi dan situs modern.

{# wf_updated_on: 2016-08-23 #}
{# wf_published_on: 2014-08-08 #}

# Animasi {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

Animasi adalah bagian penting saat membuat aplikasi web dan situs yang menarik. Pengguna mengharapkan antarmuka pengguna yang sangat responsif dan interaktif. Namun, menganimasikan antarmuka Anda bukanlah hal yang mudah. Apa yang harus dianimasikan, kapan, dan apa jenis nuansa yang dimiliki animasi tersebut?


### TL;DR {: .hide-from-toc }
* Gunakan animasi sebagai cara untuk menambahkan jiwa ke proyek Anda.
* Animasi harus mendukung interaksi pengguna.
* Hati-hati dengan properti yang Anda animasikan; beberapa lebih berat dibanding yang lain.


## Memilih hal yang tepat untuk dianimasikan

Animasi yang bagus menambahkan selapis kegembiraan dan rasa keterlibatan pengguna untuk proyek Anda. Anda bisa menganimasikan hampir semuanya, apakah itu lebar, ketinggian, posisi, warna, atau latar belakang, namun Anda harus menyadari potensi bottleneck kinerja dan bagaimana animasi memengaruhi personalitas aplikasi Anda. Animasi yang tersendat atau salah pilih bisa berdampak negatif terhadap pengalaman pengguna, sehingga animasi harus berkinerja baik dan tepat.

## Gunakan animasi untuk mendukung interaksi

Jangan menganimasikan sesuatu hanya karena Anda bisa; itu hanya akan membuat pengguna jengkel dan mengganggunya. Namun, gunakan animasi yang ditempatkan secara tepat untuk memperkuat interaksi pengguna. Jika mereka mengetuk ikon menu, menggesek untuk menampilkan panel samping navigasi, atau mengetuk tombol, gunakan cahaya lembut atau efek memantul untuk menerima interaksi. Hindari animasi yang mengganggu atau menghalangi aktivitas pengguna secara tidak perlu.

## Hindari menganimasikan properti yang berat

Satu-satunya hal yang lebih buruk daripada animasi yang salah tempat adalah yang menyebabkan laman menjadi tersendat. Tipe animasi ini membuat pengguna merasa frustrasi dan tak senang, dan berharap Anda tidak menganimasikannya sama sekali.

Beberapa properti lebih sulit untuk diubah dibanding yang lain, dan hal inilah yang lebih mungkin membuat animasi tersendat. Jadi, misalnya, mengubah `box-shadow` sebuah elemen memerlukan operasi pewarnaan yang jauh lebih sulit dibandingkan mengubah, katakan, warna teksnya. Demikian pula, mengubah `width` sebuah elemen cenderung lebih sulit dibandingkan mengubah `transform`.

Anda bisa membaca selengkapnya mengenai perhitungan kinerja animasi dalam panduan [Animasi dan Kinerja](animations-and-performance), namun jika Anda menginginkan TL;DR, tetaplah konsisten pada ubahan transform dan opacity, serta menggunakan `will-change`. Jika Anda ingin mengetahui secara pasti pekerjaan mana yang dipicu karena menganimasikan properti yang diberikan, lihat [Pemicu CSS](http://csstriggers.com).


{# wf_devsite_translation #}
