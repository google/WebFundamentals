project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Peran semantik dalam navigasi laman


{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-10-04 #}

# Semantik dan Menyusuri Materi {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/aliceboxhall.html" %}



Anda telah mempelajari tentang kemampuan, semantik, dan bagaimana teknologi pendukung menggunakan
pohon aksesibilitas untuk membuat pengalaman pengguna alternatif bagi pengguna mereka.
Anda bisa melihat bahwa menulis HTML semantik yang ekspresif akan memberi banyak
aksesibilitas dengan upaya sangat kecil, karena banyak elemen standar memiliki
semantik dan perilaku pendukung bawaan.

Dalam pelajaran ini, kita akan membahas beberapa semantik yang kurang dimengerti namun sangat penting bagi
pengguna pembaca layar, terutama berkenaan dengan navigasi. Di laman sederhana yang berisi
banyak kontrol namun tidak banyak materinya, akan mudah memindai laman untuk menemukan
apa yang Anda butuhkan. Namun pada laman yang sarat materi, seperti entri Wikipedia atau
agregator berita, tidak praktis membaca tuntas semua hal dari atas ke bawah; Anda
perlu cara untuk menyusuri materinya secara efisien.

Developer sering kali salah memahami bahwa pembaca layar membosankan dan lambat
digunakan, atau bahwa segala sesuatu di layar harus bisa difokus agar bisa ditemukan
oleh pembaca layar. Sering kali bukan itu masalahnya.

Pengguna pembaca layar sering kali mengandalkan daftar heading untuk menemukan informasi. Kebanyakan
pembaca layar memiliki cara mudah untuk mengisolasi dan memindai daftar heading laman, yakni sebuah
fitur penting yang disebut *rotor*. Mari kita lihat cara menggunakan heading HTML
secara efektif untuk mendukung fitur ini.

## Menggunakan heading secara efektif

Pertama, mari kita ulangi kembali poin sebelumnya: [*urutan DOM itu
penting*](/web/fundamentals/accessibility/focus/dom-order-matters), bukan hanya untuk
urutan fokus melainkan untuk urutan pembaca layar. Saat Anda bereksperimen dengan pembaca layar
seperti VoiceOver, NVDA, JAWS, dan ChromeVox, Anda akan menemukan daftar heading mengikuti
urutan DOM, bukan urutan visual.

Hal ini berlaku untuk pembaca layar pada umumnya. Karena pembaca layar berinteraksi dengan
pohon aksesibilitas, dan pohon aksesibilitas berdasarkan pada pohon DOM, urutan
yang dipahami oleh pembaca dengan demikian berdasarkan pada urutan DOM. Ini
berarti struktur heading yang tepat menjadi kian penting.

Di kebanyakan laman yang terstruktur dengan baik, level heading disarangkan untuk menunjukkan
hubungan induk-anak di antara blok materi. [Daftar Periksa
WebAIM](http://webaim.org/standards/wcag/checklist) berulang kali merujuk
teknik ini.

 - [1.3.1](http://webaim.org/standards/wcag/checklist#sc1.3.1){: .external }
   menyebutkan "Markup semantik digunakan untuk menunjukkan heading"
 - [2.4.1](http://webaim.org/standards/wcag/checklist#sc2.4.1){: .external }
   menyebutkan struktur heading sebagai teknik untuk melangkahi blok
   materi
 - [2.4.6](http://webaim.org/standards/wcag/checklist#sc2.4.6){: .external }
   mendiskusikan beberapa detail untuk penulisan heading yang berguna
 - [2.4.10](http://webaim.org/standards/wcag/checklist#sc2.4.10){: .external }
   menyebutkan "masing-masing bagian materi ditetapkan menggunakan heading,
   bila memang sesuai"

Tidak semua heading harus terlihat di layar.
[Wikipedia](https://www.wikipedia.org/), misalnya, menggunakan teknik yang
sengaja menempatkan sebagian heading di luar layar untuk membuatnya
*hanya* bisa diakses oleh pembaca layar dan teknologi pendukung lainnya.

    <style>
      .sr-only {
        position:absolute;
        left:-10000px;
        top:auto;
        width:1px;
        height:1px;
        overflow:hidden;
      }
    </style>

    <h2 class="sr-only">This heading is offscreen.</h2>

Note: Situs WebAIM mendiskusikan teknik ini panjang lebar dalam [artikel
ini di materi di luar layar](http://webaim.org/techniques/css/invisiblecontent/).

Bagi aplikasi yang kompleks, ini bisa menjadi cara yang bagus untuk mengakomodasi heading bila
desain visual tidak memerlukan atau memiliki ruang bagi heading yang terlihat.

Perhatian: Perlu kiranya kita tidak bertindak lebih jauh dengan teknik ini. Ingatlah bahwa
pengguna teknologi pendukung mungkin juga dapat melihat layar bagi dirinya sendiri, jadi
melangkah terlalu jauh ke pembuatan materi untuk "pembaca layar saja" sebenarnya mungkin
akan menurunkan kualitas pengalaman pengguna bagi sebagian orang. Hal ini juga bisa membuat Anda kerepotan
dalam pemeliharaannya nanti.

## Opsi navigasi lainnya

Walaupun laman dengan heading yang baik akan membantu navigasi pengguna pembaca layar, ada
beberapa elemen lainnya yang bisa mereka gunakan untuk menyusuri laman, termasuk *tautan*, *kontrol
formulir*, dan *landmark*.

Pembaca bisa menggunakan fitur rotor milik pembaca layar (cara mudah untuk mengisolasi dan
memindai daftar heading laman) untuk mengakses *daftar tautan* di laman tersebut.
Kadang-kadang, seperti di wiki, ada banyak tautan, jadi pembaca dapat menelusuri suatu
istilah dalam tautan tersebut. Ini akan membatasi hit pada tautan yang sebenarnya berisi
istilah tersebut, bukannya setiap temuan istilah pada laman.

Fitur ini hanya berguna jika pembaca layar bisa menemukan tautan tersebut dan teks
tautan itu bermakna. Misalnya, ini beberapa pola umum yang membuat tautan
sulit ditemukan.

 - Tag jangkar tanpa atribut `href`. Sering kali digunakan dalam aplikasi
   laman-tunggal, target tautan ini menyebabkan masalah bagi pembaca layar. Anda bisa membaca
   selengkapnya di [artikel mengenai aplikasi laman-tunggal ini](http://neugierig.org/software/blog/2014/02/single-page-app-links.html).
 - Tombol yang diimplementasikan bersama tautan. Hal ini menyebabkan pembaca layar
   menafsirkan materi sebagai tautan, dan fungsionalitas tombol akan hilang. Untuk
   kasus-kasus ini, ganti tag jangkar dengan tombol sungguhan dan beri gaya
   dengan semestinya.
 - Gambar digunakan sebagai materi tautan. Kadang-kadang diperlukan, gambar bertautan bisa menjadi
   tidak berguna bagi pembaca layar. Untuk menjamin bahwa tautan diekspos dengan benar ke
   teknologi pendukung, pastikan gambar tersebut memliki teks atribut `alt`.

Masalah lain adalah tautan yang buruk. Teks yang bisa diklik seperti "ketahui selengkapnya" atau "klik
di sini" tidak menyediakan informasi semantik tentang akan ke mana tautan tersebut. Sebagai gantinya, gunakan
teks deskriptif seperti "ketahui selengkapnya tentang desain responsif" atau "lihat
tutorial kanvas ini" untuk membantu pembaca layar menyediakan konteks yang bermakna tentang tautan.

Rotor bisa juga mengambil *daftar kontrol formulir*. Dengan daftar ini, pembaca bisa
menelusuri item tertentu dan langsung menuju ke sana.

Kesalahan umum yang dibuat pembaca layar adalah pengucapan. Misalnya, pembaca layar mungkin
mengucapkan "Udacity" sebagai "oo-dacity", atau membacakan nomor ponsel sebagai
integer besar, atau membaca teks berhuruf besar seakan berupa akronim.
Menariknya, pengguna pembaca layar sudah sangat terbiasa dengan keganjilan ini dan
telah memperhitungkannya.

Sebagian developer mencoba memperbaiki situasi ini dengan menyediakan teks khusus pembaca layar
yang dieja secara fonetik. Inilah aturan sederhana untuk ejaan fonetik:
**jangan lakukan**; ini hanya akan memperburuk masalah! Jika, misalnya, pengguna menggunakan
tampilan braille, kata akan salah eja, sehingga menyebabkan semakin
bingung. Pembaca layar memungkinkan kata dieja nyaring, sehingga membiarkan
pembaca mengontrol pengalaman mereka dan memutuskan kapan memerlukannya.

Pembaca bisa menggunakan rotor untuk melihat *daftar landmark*. Ini membantu pembaca
menemukan materi utama dan serangkaian landmark navigasi yang disediakan
oleh elemen landmark HTML.

HTML5 memperkenalkan beberapa elemen baru yang membantu mendefinisikan struktur semantik
laman, termasuk `header`, `footer`, `nav`, `article`, `section`, `main`, dan
`aside`. Semua elemen ini secara spesifik menyediakan petunjuk struktural di laman
tanpa memaksakan penataan gaya bawaan (yang bagaimana pun juga harus Anda lakukan dengan CSS).

Elemen struktural semantik menggantikan beberapa blok `div` repetitif, dan
menyediakan cara yang lebih jelas dan lebih deskriptif untuk menyatakan struktur laman secara intuitif
baik bagi penulis maupun pembaca.




{# wf_devsite_translation #}
