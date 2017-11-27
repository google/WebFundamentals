project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: JavaScript sering kali memicu perubahan visual. Kadang-kadang itu langsung melalui manipulasi gaya, dan kadang-kadang penghitungannya yang akan mengakibatkan perubahan visual, seperti mencari atau mengurutkan sejumlah data. JavaScript yang berjalan lama atau jelek pengaturan waktunya bisa menjadi penyebab umum masalah kinerja, dan Anda harus berusaha meminimalkan dampaknya sebisa mungkin.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2015-03-20 #}

# Kurangi Cakupan dan Kompleksitas Penghitungan Gaya {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

Mengubah DOM, melalui penambahan dan penghapusan elemen, pengubahan atribut, 
kelas, atau melalui animasi, semuanya akan menyebabkan browser menghitung 
ulang gaya elemen dan, kebanyakan, akan me-layout (atau mengubah posisi/geometri) 
laman, atau bagiannya. Proses ini disebut <em>penghitungan gaya terkomputasi</em>.

Bagian pertama dalam menghitung gaya adalah membuat satu set pemilih kecocokan, yang pada dasarnya browser ingin mengetahui kelas, pemilih semu, dan ID mana saja yang diterapkan pada elemen yang diberikan.

Bagian kedua dari proses ini melibatkan pengambilan semua aturan gaya dari pemilih kecocokan dan mengetahui gaya akhir mana yang dimiliki elemen. Di Blink (mesin rendering Chrome dan Opera) proses-proses ini adalah, setidaknya saat ini, secara kasar sama biayanya:

> Secara kasar, 50% waktu yang digunakan untuk menghitung ulang gaya terkomputasi untuk elemen digunakan untuk mencocokkan pemilih, dan sebagian lagi digunakan untuk membentuk RenderStyle (representasi gaya terkomputasi) dari aturan yang cocok.
> Rune Lillesveen, Opera / [Style Invalidation in Blink](https://docs.google.com/document/d/1vEW86DaeVs4uQzNFI5R-_xS9TcS1Cs_EUsHRSgCHGu8/view)

### TL;DR {: .hide-from-toc }

* Kurangi kompleksitas pemilih; gunakan metodologi berorientasi kelas seperti BEM.
* Kurangi jumlah elemen yang harus dihitung dalam penghitungan gaya.

## Kurangi kompleksitas pemilih Anda

Dalam kasus paling sederhana, Anda merujuk sebuah elemen di CSS cukup dengan satu kelas:


    .title {
      /* styles */
    }


Namun, dengan semakin besarnya proyek, ini mungkin akan mengakibatkan CSS yang lebih kompleks, sehingga Anda mungkin akan mendapati pemilih yang seperti ini:


    .box:nth-last-child(-n+1) .title {
      /* styles */
    }


Untuk mengetahui apakah gaya perlu diterapkan, browser harus menanyakan secara efektif “apakah ini elemen dengan kelas judul yang memiliki induk yang kebetulan berupa minus anak ke-n ditambah 1 elemen dengan satu kelas kotak?” Memahami hal ini _bisa_ memakan waktu, tergantung pada pemilih yang digunakan dan browser yang dipermasalahkan. Sebagai gantinya perilaku pemilih yang dimaksud dapat diubah menjadi kelas:


    .final-box-title {
      /* styles */
    }


Anda bisa membawa masalah dengan nama kelas, namun tugas tersebut akan jauh lebih sederhana untuk browser. Di versi sebelumnya, untuk mengetahui, misalnya, apakah elemen tersebut adalah yang terakhir untuk tipe tersebut, browser terlebih dahulu harus mengetahui segala hal tentang semua elemen lainnya dan apakah ada elemen setelah itu yang akan menjadi anak-terakhir, yang kemungkinan jauh lebih mahal daripada sekadar mencocokkan pemilih dengan elemen karena kecocokan kelasnya.

## Kurangi jumlah elemen yang akan diberi gaya
Pertimbangan kinerja lainnya, yang biasanya merupakan _faktor yang lebih penting bagi banyak pembaruan gaya_, adalah volume kerja yang perlu dilakukan bila elemen berubah.

Dalam artian umum, kasus terburuk untuk biaya penghitungan gaya elemen terkomputasi adalah jumlah elemen dikali jumlah pemilih, karena setiap elemen setidaknya perlu diperiksa sekali terhadap setiap gaya untuk mengetahui kecocokannya.

Note: Biasanya jika Anda mengubah sebuah kelas di -- anggaplah -- elemen body, semua anak di laman tersebut perlu dihitung ulang gaya terkomputasinya. Syukurlah hal itu tidak berlaku lagi; beberapa browser malah mempertahankan sekumpulan kecil aturan yang berbeda untuk setiap elemen yang, jika berubah, akan menyebabkan gaya elemen harus dihitung ulang. Itu berarti bahwa suatu elemen mungkin atau mungkin tidak perlu dihitung ulang, bergantung pada tempatnya di pohon, dan apa yang secara spesifik berubah.

Penghitungan gaya sering kali bisa ditargetkan pada beberapa elemen secara langsung, daripada membuat invalid laman secara keseluruhan. Di browser modern, cenderung lebih sedikit masalah karena browser tidak perlu memeriksa semua elemen yang berpotensi terpengaruh oleh perubahan. Sebaliknya, browser lama tidak perlu dioptimalkan untuk tugas demikian. Di sinilah Anda seharusnya bisa **mengurangi jumlah elemen yang dibuat invalid**.

Note: Jika Anda masuk ke Komponen Web sebaiknya perhatikan bahwa penghitungan gaya di sini sedikit berbeda, karena secara default gaya tidak melewati batas Shadow DOM, dan menjadi cakupan komponen individual bukannya pohon sebagai keseluruhan. Akan tetapi, umumnya berlaku konsep yang sama: pohon yang lebih kecil dengan aturan lebih sederhana akan diproses lebih efisien daripada pohon yang besar atau aturan yang kompleks.

## Ukur Biaya Penghitungan Ulang Gaya Anda

Cara termudah dan terbaik untuk mengukur biaya penghitungan ulang gaya adalah menggunakan mode Timeline di Chrome DevTools. Untuk mulai, buka DevTools, masuk ke tab Timeline, pilih rekam dan berinteraksilah dengan situs Anda. Saat menghentikan perekaman, Anda akan melihat sesuatu seperti gambar di bawah ini.

<img src="images/reduce-the-scope-and-complexity-of-style-calculations/long-running-style.jpg"  alt="DevTools menampilkan penghitungan gaya yang berjalan lama.">

Strip di atas menunjukkan bingkai per detik, dan jika Anda melihat batang yang melebihi garis bawah, garis 60 fps, berarti Anda memiliki bingkai yang berjalan lama.

<img src="images/reduce-the-scope-and-complexity-of-style-calculations/frame-selection.jpg"  alt="Memperbesar area bermasalah di Chrome DevTools.">

Jika Anda memiliki bingkai yang berjalan lama selama interaksi tertentu seperti menggulir, atau beberapa interaksi lainnya, berarti perlu diselidiki lebih jauh.

Jika Anda memiliki blok ungu yang besar, seperti dalam kasus di atas, klik catatan tersebut untuk mendapatkan detail selengkapnya.

<img src="images/reduce-the-scope-and-complexity-of-style-calculations/style-details.jpg"  alt="Mendapatkan detail penghitungan gaya yang berjalan lama.">

Dalam contoh ini ada kejadian Recalculate Style yang berjalan lama, yang memerlukan waktu lebih dari 18 md, dan ini terjadi selama menggulir, sehingga menyebabkan goyangan gambar yang kentara.

Jika mengeklik kejadian itu sendiri, Anda akan diberikan tumpukan panggilan, yang menunjukkan tempat di JavaScript Anda yang bertanggung jawab memicu perubahan gaya. Selain itu, Anda juga mendapatkan jumlah elemen yang terpengaruh oleh perubahan (dalam kasus ini lebih dari 400 elemen), dan berapa lama waktu yang diperlukannya untuk melakukan penghitungan gaya. Anda  bisa menggunakan informasi ini untuk mulai mencoba menemukan perbaikan di kode Anda.

## Gunakan Blok, Elemen, dan Pengubah

Pendekatan untuk pengkodean seperti [BEM (Block, Element, Modifier)](https://bem.info/){: .external } sebenarnya memasukkan manfaat kinerja pencocokan pemilih di atas, karena menyarankan agar segala sesuatu memiliki satu kelas, dan, bila Anda butuh hierarki, agar juga dimasukkan ke dalam nama kelas:


    .list { }
    .list__list-item { }


Jika Anda memerlukan pengubah, seperti di atas tadi di mana Anda ingin melakukan sesuatu yang khusus untuk anak terakhir, Anda bisa menambahkannya seperti ini:


    .list__list-item--last-child {}


Jika Anda mencari cara yang baik untuk mengorganisir CSS, BEM merupakan titik awal yang sangat tepat, baik dari sudut pandang struktur, maupun juga karena penyederhanaan pencarian gaya.

Jika Anda tidak suka BEM, ada cara lain untuk pendekatan CSS Anda, namun pertimbangan kinerja harus dinilai bersama ergonomika pendekatan.

## Sumber Daya

* [Style invalidation in Blink](https://docs.google.com/document/d/1vEW86DaeVs4uQzNFI5R-_xS9TcS1Cs_EUsHRSgCHGu8/edit)
* [BEM (Block, Element, Modifier)](https://bem.info/){: .external }


{# wf_devsite_translation #}
