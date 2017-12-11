project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Ringkasan fokus layar dalam aksesibilitas


{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# Pengantar Fokus {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/robdodson.html" %}



Dalam pelajaran ini, kita akan membicarakan tentang *fokus* dan cara mengelolanya dalam
aplikasi Anda. Fokus merujuk pada kontrol mana pada layar (item masukan seperti
bidang, kotak centang, tombol, atau tautan) yang saat ini menerima masukan dari keyboard,
dan dari clipboard bila Anda menempelkan materi.

Inilah tempat yang bagus untuk mulai mempelajari tentang aksesibilitas karena kita semua tahu
cara menggunakan keyboard, mudah untuk menghubungkan dan menguji, serta menguntungkan
hampir semua pengguna.

Pengguna yang memiliki gangguan motorik, yang boleh jadi berupa paralisis permanen hingga
pergelangan yang keseleo, mungkin mengandalkan keyboard atau perangkat switch untuk menyusuri
laman Anda, jadi strategi fokus yang baik adalah penting untuk menyediakan
pengalaman yang bagus bagi mereka.

Dan bagi pengguna berpengalaman yang mengetahui setiap pintasan keyboard di mesin mereka, karena
bisa dengan cepat menyusuri situs Anda menggunakan keyboard saja, tentu akan
membuat mereka menjadi lebih produktif.

Karena itu, strategi fokus yang diimplementasikan dengan baik akan memastikan setiap orang yang menggunakan
aplikasi Anda akan memiliki pengalaman yang lebih baik. Nanti akan kita lihat dalam pelajaran berikutnya bahwa
upaya yang Anda berikan pada fokus adalah basis penting untuk mendukung
pengguna teknologi pendukung, juga tentunya, semua pengguna.

## Apa yang dimaksud dengan fokus?

Fokus menentukan tempat kejadian keyboard di laman pada saat tertentu. Misalnya,
jika Anda memfokus bidang masukan teks dan mulai mengetik, bidang masukan
akan menerima kejadian keyboard dan menampilkan karakter yang Anda ketikkan. Walaupun memiliki
fokus, bidang masukan juga akan menerima masukan yang ditempelkan dari clipboard.

![fokus keyboard di bidang teks](imgs/keyboard-focus.png)

Item yang saat ini difokus sering kali ditunjukkan oleh *lingkaran fokus*, gaya yang
bergantung pada browser maupun segala penataan gaya yang
diterapkan oleh penulis laman tersebut. Chrome, misalnya, biasanya menyorot elemen yang difokus dengan
border biru, sedangkan Firefox menggunakan border putus-putus.

![tombol sign up](imgs/sign-up.png)

Sebagian pengguna mengoperasikan komputer mereka hampirnya sepenuhnya dengan keyboard atau
perangkat masukan lainnya. Bagi para pengguna tersebut, fokus sangatlah penting; inilah sarana utama mereka untuk
melakukan apa saja di layar. Karena alasan itu, daftar periksa Web AIM menyatakan
di bagian 2.1.1 bahwa [semua fungsionalitas laman harus tersedia menggunakan
keyboard](http://webaim.org/standards/wcag/checklist#sc2.1.1){: .external },
kecuali jika ada yang tidak bisa Anda lakukan dengan keyboard, misalnya menggambar bebas.

Sebagai pengguna, Anda bisa mengontrol elemen mana yang saat ini difokus dengan menggunakan `Tab`,
`Shift+Tab`, atau tombol panah. Di Mac OSX, cara kerjanya sedikit berbeda:
walaupun Chrome selalu memungkinkan Anda melakukan navigasi dengan `Tab`, Anda perlu menekan `Option+Tab`
untuk mengubah fokus di browser lain seperti Safari. (Anda bisa mengubah setelan ini
di bagian Keyboard pada System Preferences.)

![dialog preferensi keyboard](imgs/system-prefs2.png)

Urutan pemrosesan fokus maju dan mundur pada elemen interaktif
lewat `Tab` disebut *urutan tab*. Langkah penting untuk memastikan bahwa
Anda mendesain laman dengan urutan tab yang logis
akan kita bahas nanti.

## Apa yang dapat difokus?

Elemen HTML interaktif bawaan seperti bidang teks, tombol, dan daftar pilihan
*secara implisit dapat difokus*, maksudnya, secara otomatis elemen itu akan disisipkan
ke dalam urutan tab dan memiliki penanganan kejadian keyboard bawaan tanpa intervensi developer.

![bidang yang secara implisit bisa difokus](imgs/implicitly-focused.png)

Namun tidak semua elemen dapat difokus; paragraf, div, dan beragam elemen laman
lainnya tidak difokus saat Anda berpindah tab di laman, dan memang didesain demikian.
Umumnya tidak perlu memfokus sesuatu jika pengguna tidak bisa berinteraksi dengannya.

![tidak semua elemen bisa difokus](imgs/not-all-elements.png)

## Mencoba fokus

Mari kita coba beberapa teknik fokus yang baru saja kita diskusikan. Dengan
menggunakan Chrome, masuklah ke [laman tiruan situs
maskapai ini](http://udacity.github.io/ud891/lesson2-focus/01-basic-form/){: .external }
dan cari tiker tertentu **hanya dengan menggunakan masukan keyboard**. Laman tersebut tidak akan
menerima masukan mouse, jadi Anda tidak bisa memalsukan latihan (bukannya kami tidak percaya Anda
;-).

![maket situs maskapai penerbangan](imgs/airlinesite2.png)

Parameter tiket yang harus Anda tetapkan adalah:

 - sekali jalan
 - ke Melbourne
 - berangkat tanggal 12 Oktober 2017 (10/12/2017)
 - kembali tanggal 23 Oktober 2017 (10/23/2017)
 - kursi dekat jendela
 - tidak ingin menerima penawaran promosi

Bila Anda berhasil menyelesaikan formulir tanpa kesalahan masukan dan mengaktifkan tombol
Search, formulir akan dikosongkan dan disetel ulang begitu saja. Lanjutkan dan selesaikan
formulir, kemudian kembalilah.

Mari kita periksa bagaimana formulir menggunakan masukan keyboard Anda. Mulai dengan
beberapa penekanan `Tab` pertama, browser menyorot item navigasi untuk Flights,
Hotels, dan Rental Cars. Karena terus menekan `Tab` Anda melanjutkan ke
grup radiobutton untuk memilih dari Round Trip, One Way, atau Multi City
dengan menggunakan tombol panah.

Lanjutkan sampai bidang nama dan alamat, dengan mengisi informasi
yang diperlukan. Bila sampai di elemen pemilihan tujuan, Anda bisa menggunakan
tombol panah untuk memilih kota, atau bisa mulai mengetikkan untuk mengisi bidang pelengkapan otomatis.
Begitu pula, dalam bidang tanggal, Anda bisa menggunakan tombol panah atau cuma mengetikkan tanggal.

Memilih tipe kursi juga akan menggunakan tombol panah, atau Anda bisa mengetikkan "w", "a",
atau "n" untuk lompat ke opsi kursi. Kemudian Anda bisa menonaktifkan default penawaran promosi
dengan menekan spasi saat kotak centang difokus. Terakhir, fokus
tombol Search dan tekan `Enter` untuk mengirim formulir.

Sangat praktis berinteraksi dengan formulir cuma dengan menggunakan keyboard
dan tidak perlu beralih ke mouse dan kembali menyelesaikan tugas. Karena semua elemen yang
digunakan dalam formulir adalah tag HTML asli dengan fokus implisit, formulir bekerja dengan baik
bersama keyboard, dan Anda tidak perlu menulis kode untuk menambahkan atau mengelola
perilaku fokus.



{# wf_devsite_translation #}
