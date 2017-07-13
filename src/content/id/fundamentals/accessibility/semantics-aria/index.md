project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Pengantar ARIA dan semantik HTML bukan-asli


{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-10-04 #}

# Pengantar ARIA {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/aliceboxhall.html" %}



Sejauh ini, kita didorong untuk menggunakan elemen HTML asli karena memberi Anda fokus,
dukungan keyboard, dan semantik bawaan, namun ada kalanya
layout sederhana dan HTML asli tidak dapat menjalankan tugasnya. Misalnya, saat ini tidak ada
elemen HTML terstandardisasi untuk bentuk UI umum, menu munculan. Atau
tidak ada elemen HTML yang menyediakan karakteristik semantik, misalnya "pengguna
perlu mengetahui tentang hal ini secepatnya".

Dalam pelajaran ini, nanti, kita akan mendalami cara mengekspresikan semantik yang tidak bisa
dinyatakan dalam HTML.

[Spesifikasi Web Accessibility Initiative's Accessible Rich Internet Applications](https://www.w3.org/TR/wai-aria/){: .external } (WAI-ARIA, atau cukup
ARIA) bagus untuk menjembatani bidang-bidang masalah aksesibilitas yang tidak bisa ditangani
dengan HTML asli. Hal ini bisa dilakukan dengan memungkinkan Anda menetapkan atribut yang memodifikasi
cara elemen diterjemahkan ke dalam pohon aksesibilitas. Mari kita amati sebuah
contoh.

Dalam cuplikan kode berikut, kita menggunakan item daftar sebagai kotak centang khusus. Kelas
"checkbox" CSS memberi elemen karakteristik visual yang diperlukan.


    <li tabindex="0" class="checkbox" checked>
      Receive promotional offers
    </li>
    

Walaupun cocok bagi pengguna yang berpenglihatan normal, pembaca layar tidak akan memberikan indikasi
bahwa elemen dimaksudkan sebagai kotak centang, sehingga pengguna yang berpenglihatan lemah mungkin melewatkan
elemen itu sama sekali.

Akan tetapi, dengan menggunakan atribut ARIA, kita bisa memberi elemen tersebut informasi yang terlewat
sehingga pembaca layar bisa menafsirkannya dengan benar. Di sini, kita telah menambahkan atribut `role` dan
`aria-checked` untuk mengidentifikasi secara eksplisit elemen tersebut sebagai kotak centang dan
menetapkan bahwa elemen itu telah dicentang secara default. Kini item daftar akan ditambahkan ke
pohon aksesibilitas dan pembaca layar akan melaporkannya dengan benar sebagai kotak centang.


    <li tabindex="0" class="checkbox" role="checkbox" checked aria-checked="true">
      Receive promotional offers
    </li>
    

Note: Kita akan membahas daftar atribut ARIA dan kapan menggunakannya [nanti](#what-can-aria-do).

ARIA bekerja dengan mengubah dan menambah pohon aksesibilitas DOM standar.

![pohon aksesibilitas DOM standar](imgs/acctree1.jpg){: .attempt-right }

![pohon aksesibilitas ditambahkan ARIA](imgs/acctree2.jpg){: .attempt-right }

Walaupun ARIA memungkinkan kita secara halus (atau bahkan secara radikal)
memodifikasi pohon aksesibilitas untuk elemen apa saja di laman, namun hanya elemen itu yang berubah. **ARIA
tidak menambah perilaku inheren elemen**; ia tidak akan membuat
elemen dapat difokus atau memberinya event listener untuk keyboard. Itu tetap merupakan bagian dari
tugas development kami.

Penting dipahami bahwa semantik default
tidak perlu didefinisikan ulang. Apa pun penggunaannya, elemen `<input type="checkbox">`
HTML standar tidak membutuhkan atribut ARIA tambahan `role="checkbox"` untuk
diumumkan dengan benar.

Juga perlu diperhatikan bahwa elemen HTML tertentu memiliki batasan atas peran dan atribut ARIA
apa saja yang bisa digunakan padanya. Misalnya, mungkin tidak ada peran/atribut tambahan yang diterapkan pada elemen `<input
type="text">`.

>Lihat [ARIA di spesifikasi HTML](https://www.w3.org/TR/html-aria/#sec-strong-native-semantics){: .external }
untuk informasi selengkapnya.

Mari kita lihat kemampuan lain yang ditawarkan ARIA.

## Apa yang bisa dilakukan ARIA?

Seperti yang Anda lihat pada contoh kotak centang, ARIA bisa memodifikasi semantik elemen yang ada
atau menambahkan pada elemen bila tidak ada semantik asli. Pola semantik
yang tidak ada sama sekali di HTML juga bisa dinyatakannya, seperti menu atau
panel tab. Sering kali, ARIA memungkinkan kita membuat elemen bertipe widget yang tidak akan memungkinkan
bila dengan HTML biasa.

 - Misalnya, ARIA bisa menambahkan label ekstra dan teks keterangan yang hanya
   diekspos kepada API teknologi pendukung.<br>

<div class="clearfix"></div>
      
    <button aria-label="screen reader only label"></button>


 - ARIA bisa menyatakan hubungan semantik antar elemen yang memperluas
   hubungan induk/anak standar, misalnya bilah gulir khusus yang mengontrol
   region tertentu.

<div class="clearfix"></div>

    <div role="scrollbar" aria-controls="main"></div>
    <div id="main">
    . . .
    </div>

    

 - ARIA bisa "menghidupkan" bagian laman, agar segera memberi tahu
   teknologi pendukung bila bagian itu berubah.

<div class="clearfix"></div>

    <div aria-live="true">
      <span>GOOG: $400</span>
    </div>

    
Salah satu dari aspek inti sistem ARIA adalah kumpulan *peran*-nya. Peran
dalam istilah aksesibilitas setara dengan indikator singkatan untuk pola
UI tertentu. ARIA menyediakan kosakata pola yang bisa kita gunakan lewat atribut `role`
pada suatu elemen HTML.

Bila kita menerapkan `role="checkbox"` dalam contoh sebelumnya, kita memberi tahu
teknologi pendukung bahwa elemen harus mengikuti pola "kotak centang". Yakni,
kami menjamin bahwa keadaannya akan dicentang (baik telah dicentang atau belum
dicentang), dan bahwa keadaan itu dapat diubah-ubah menggunakan mouse atau tombol spasi,
persis seperti elemen kotak centang HTML standar.

Kenyataannya, karena fitur interaksi keyboard begitu kentara dalam penggunaan
pembaca layar, maka penting sekali memastikan bahwa, saat membuat widget khusus, atribut
`role` selalu diterapkan di tempat yang sama seperti atribut `tabindex`
; ini memastikan bahwa kejadian keyboard pindah ke tempat yang tepat dan bahwa bila
fokus jatuh pada suatu elemen, perannya akan dinyatakan dengan akurat.

[Spesifikasi ARIA](https://www.w3.org/TR/wai-aria/){: .external } menjelaskan
taksonomi nilai-nilai yang memungkinkan untuk atribut `role` dan atribut ARIA
terkait yang boleh digunakan bersama-sama peran itu. Inilah sumber informasi
definitif terbaik tentang cara kerja sama peran dan atribut ARIA
dan bagaimana keduanya bisa digunakan dalam cara yang didukung oleh browser dan
teknologi pendukung.

![daftar semua peran ARIA yang tersedia](imgs/aria-roles.jpg)

Akan tetapi, spesifikasinya sangat padat; tempat yang lebih mudah dicapai untuk memulai adalah [dokumen ARIA
Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.1/){: .external }
, yang mendalami berbagai praktik terbaik untuk menggunakan peran dan properti
ARIA yang tersedia.

ARIA juga menawarkan peran landmark yang memperluas opsi yang tersedia di HTML5. Lihat
spesifikasi [Landmark Roles Design
Patterns](https://www.w3.org/TR/wai-aria-practices-1.1#kbd_layout_landmark_XHTML){: .external }
untuk informasi selengkapnya.



{# wf_devsite_translation #}
