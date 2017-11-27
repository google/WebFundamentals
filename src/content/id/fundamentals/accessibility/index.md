project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Meningkatkan aksesibilitas untuk laman web


{# wf_updated_on: 2016-06-26 #}
{# wf_published_on: 2016-06-26 #}

# Aksesibilitas {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/aliceboxhall.html" %}
{% include "web/_shared/contributors/robdodson.html" %}


Rangkaian dokumen ini bagian materi yang berbasis teks dari pembahasan di
[Kursus Udacity mengenai
Aksesibilitas](https://www.udacity.com/course/web-accessibility--ud891){: .external }.
Kursus ini dimaksudkan sebagai
perlakuan lebih ringkas atas praktik dan prinsip aksesibilitas, dengan menggunakan
materi asal kursus sebagai basisnya, bukan transkripsi langsung dari kursus video.

### TL;DR {: .hide-from-toc }
- Ketahui apa yang dimaksud aksesibilitas dan cara menerapkannya pada web-development.
- Ketahui cara membuat situs web bisa diakses dan bisa digunakan oleh setiap orang.
- Ketahui cara menyertakan aksesibilitas dasar dengan dampak minimal pada development.
- Ketahui apa saja fitur HTML yang tersedia dan cara menggunakannya untuk meningkatkan
  aksesibilitas.
- Ketahui tentang berbagai teknik aksesibilitas modern untuk membuat
  pengalaman aksesibilitas yang brilian.


Dengan memahamo aksesibilitas, cakupannya, dan dampaknya bisa membuat Anda menjadi web
developer yang lebih baik. Panduan ini dimaksudkan untuk membantu Anda memahami cara membuat
situs web bisa diakses dan bisa digunakan oleh setiap orang.

"Aksesibilitas" bisa jadi sulit dieja, namun tidak harus sulit
dicapai. Dalam panduan ini, Anda akan melihat beberapa cara mudah untuk membantu
meningkatkan aksesibilitas dengan upaya minimal, cara menggunakan apa yang ditanamkan ke
HTML untuk membuat antarmuka yang lebih bisa diakses dan sempurna, dan cara memanfaatkan sebagian
teknik modern untuk memoles pengalaman yang bisa diakses.

Anda juga akan menemukan banyak dari teknik ini yang akan membantu membuat antarmuka
yang lebih menyenangkan dan mudah digunakan oleh *semua* pengguna, tidak cuma bagi
penyandang cacat.

Tentu saja, banyak developer yang hanya memiliki pemahaman kabur mengenai apa yang dimaksud
dengan aksesibilitas &mdash; sesuatu yang harus dilakukan pada kontrak pemerintah, daftar periksa, dan pembaca
layar, ya? &mdash; dan banyak juga yang gagal paham.
Misalnya, banyak developer merasa bahwa mengurus aksesibilitas akan memaksa mereka
harus memilih antara membuat pengalaman yang menyenangkan serta menarik, dan pengalaman bisa diakses yang
ganjil dan jelek.

Tentu saja, sama sekali bukan itu masalahnya, jadi mari kita jelaskan sebelum melangkah
lebih jauh. Apa yang dimaksud aksesibilitas, dan apa yang akan kita pelajari
di sini?

## Apa yang dimaksud dengan aksesibilitas?
Umumnya, bila kita menyebut sebuah situs bisa diakses, maksud kami adalah
materi situs yang tersedia, dan fungsionalitasnya bisa dioperasikan, secara harfiah, oleh
*siapa saja*. Sebagai developer, mudah menganggap bahwa semua pengguna bisa melihat dan menggunakan
keyboard, mouse, atau layar sentuh, dan bisa berinteraksi dengan materi laman Anda
sama seperti yang Anda lakukan. Hal ini bisa menghasilkan pengalaman yang berfungsi dengan baik untuk sebagian orang,
namun menimbulkan beragam masalah, dari gangguan biasa hingga penghenti-tampilan pada
pengguna lainnya.

Aksesibilitas merujuk pada pengalaman pengguna yang mungkin berada di luar
lingkup sempit pengguna "pada umumnya", yang mungkin mengakses atau berinteraksi dengan berbagai hal
secara berbeda dari yang Anda perkirakan. Khususnya, ini menyangkut pengguna yang
mengalami semacam kelemahan atau cacat &mdash; dan ingatlah bahwa
pengalaman bisa bersifat non-fisik atau sementara.

Misalnya, walaupun kita cenderung memusatkan diskusi aksesibilitas pada pengguna
yang memiliki kelemahan, kita bisa mengaitkan dengan pengalaman menggunakan
antarmuka yang tidak bisa diakses oleh kita karena alasan lain. Pernahkah Anda mengalami masalah
menggunakan situs versi desktop di ponsel, atau melihat pesan "This
content is not available in your area", atau tidak bisa menemukan menu yang familier
di tablet? Semua itu adalah masalah aksesibilitas.

Setelah mengetahui selengkapnya, Anda akan tahu bahwa menangani masalah
aksesibilitas dalam pengertian yang lebih luas dan lebih umum ini biasanya akan
selalu memperbaiki pengalaman pengguna bagi siapa saja. Mari kita amati sebuah contoh:

![formulir dengan aksesibilitas buruk](imgs/pooraccess.jpg)

Formulir ini memiliki sejumlah masalah aksesibilitas.

 - Kontras teks rendah, sehingga sulit dibaca oleh pengguna yang memiliki penglihatan lemah.
 - Adanya label di sebelah kiri dan bidang-bidang di sebelah kanan menyulitkan banyak orang
   untuk mengaitkannya, dan hampir mustahil bagi orang yang perlu memperbesar
   tampilan untuk menggunakan laman tersebut; bayangkan melihatnya di ponsel dan harus menggeser
   untuk mengetahui apa yang terjadi.
 - Label "Remember details?" tidak dikaitkan dengan kotak centang, jadi Anda harus
  mengetuk atau mengeklik hanya pada segi empat kecil, bukan cuma mengeklik label;
   selain itu, orang yang menggunakan pembaca layar akan kesulitan mengetahui
   asosiasinya.

Sekarang, mari kita goyangkan tongkat sihir aksesibilitas dan lihat formulir yang telah diperbaiki masalahnya.
Kita akan membuat teksnya lebih gelap, memodifikasi desainnya agar label
dekat dengan apa yang dilabeli, dan memperbaiki label untuk dikaitkan dengan
kotak centang sehingga Anda juga bisa beralih dengan mengeklik labelnya.

![formulir dengan aksesibilitas ditingkatkan](imgs/betteraccess.jpg)

Mana yang lebih suka Anda gunakan? Jika Anda bilang "versi yang bisa diakses", berarti Anda 
sudah memahami premis utama panduan ini. Sering kali, sesuatu yang menjadi
pemblokir penuh bagi segelintir pengguna juga menjadi hal yang menyakitkan bagi banyak pengguna lainnya, jadi dengan
memperbaiki masalah aksesibilitas berarti Anda memperbaiki pengalaman bagi siapa saja.

## Web Content Accessibility Guidelines

Sepanjang panduan ini kita akan merujuk [Web Content Accessibility Guidelines
(WCAG) 2.0](https://www.w3.org/TR/WCAG20/){: .external }, yaitu serangkaian panduan
dan praktik terbaik yang dikumpulkan oleh pakar aksesibilitas untuk menjawab apa yang dimaksud dengan
"aksesibilitas" secara metodis. Sejumlah negara sebenarnya mewajibkan
penggunaan panduan ini dalam persyaratan legal aksesibilitas web mereka.

WCAG disusun oleh empat prinsip yang sering kali disebut dengan singkatan *POUR*:

 - **Perceivable**: Bisakah pengguna mempersepsi materi? Ini membantu mengingatkan kita
   bahwa hanya karena sesuatu bisa dipersepsi orang dengan satu indera, misalnya penglihatan,
   tidak berarti semua pengguna bisa mempersepsinya.

 - **Operable**: Bisakah pengguna menggunakan komponen UI dan menyusuri materi? Misalnya,
   sesuatu yang mengharuskan interaksi mengarahkan ke atas tidak bisa dioperasikan oleh
   orang yang tidak bisa menggunakan mouse atau layar sentuh.

 - **Understandable**: Bisakah pengguna memahami materi? Bisakah pengguna memahami
   antarmuka dan apakah cukup konsisten untuk menghindari kebingungan?

 - **Robust**: Bisakah materi dimanfaatkan oleh beragam agen-pengguna
    (browser)? Bisakah digunakan bersama teknologi pendukung?

Walaupun WCAG menyediakan ringkasan yang komprehensif mengenai apa yang
dimaksudnya dengan materi yang bisa diakses, ini juga bisa sedikit membebani. Untuk membantu meminimkannya, grup
[WebAIM](http://webaim.org/){: .external } (Web Accessibility in Mind) telah
meringkas panduan WCAG ke dalam sebuah daftar periksa yang mudah diikuti, yang ditargetkan
secara khusus untuk materi web.

[Daftar periksa WebAIM](http://webaim.org/standards/wcag/checklist){: .external }
bisa memberi Anda rangkuman tingkat tinggi mengenai hal-hal yang perlu
diimplementasikan, sekaligus menautkan ke spesifikasi WCAG yang
mendasarinya jika Anda membutuhkan definisi yang diluaskan.

Dengan alat (bantu) ini, Anda bisa memetakan arah pekerjaan aksesibilitas
dan menjadi percaya diri karena, asalkan proyek memenuhi kriteria yang dijelaskan, pengguna
akan memiliki pengalaman positif saat mengakses materi Anda.

## Memahami keberagaman pengguna

Saat mempelajari tentang aksesibilitas, akan membantu bila memiliki pemahaman mengenai
keberagaman di antara para pengguna di seluruh dunia dan aneka topik aksesibilitas
yang memengaruhi mereka. Untuk menjelaskan lebih jauh, inilah sesi tanya-jawab informatif
dengan Victor Tsaran, Technical Program Manager di Google, yang buta total.

<figure class="attempt-right">
  <img src="imgs/victor_tsaran.jpg" alt="Victor Tsaran">	
  <figcaption>Victor Tsaran</figcaption>
</figure>

<hr>

> *Apa yang Anda kerjakan di Google?*

Di Google, pekerjaan saya adalah membantu memastikan produk kami berfungsi untuk semua
macam pengguna, tanpa memandang kemampuan atau pun kelemahan.

> *Kelemahan macam apa yang dimiliki pengguna?*

Bila kita memikirkan tentang kelemahan, yang akan menyulitkan seseorang untuk
mengakses materi kita, banyak orang akan langsung membayangkan pengguna tuna
netra seperti saya. Memang ada benarnya, kelemahan ini bisa sangat membuat frustrasi atau bahkan
mustahil untuk menggunakan banyak situs web.

Banyak teknik web modern memiliki efek samping tidak menguntungkan pada pembuatan
situs yang tidak berfungsi dengan baik pada alat yang digunakan oleh pengguna
tuna netra untuk mengakses web. Akan tetapi, sebenarnya aksesibilitas lebih dari itu. Kami rasa
ada gunanya membayangkan kelemahan ke dalam empat kelompok besar: visual, motor,
pendengaran, dan kognitif.

> *Mari kita bahas satu per satu. Bisakah Anda berikan beberapa contoh kelemahan
 visual?*

Kelemahan visual bisa dibagi ke dalam beberapa kategori: Pengguna yang tidak memiliki penglihatan,
seperti saya, dapat menggunakan pembaca layar, braille, atau kombinasi keduanya.

<figure class="attempt-right">
  <img src="imgs/braille-reader.png" alt="Pembaca braille">	
  <figcaption>Pembaca braille</figcaption>
</figure>

Sekarang, sebenarnya jarang ada orang yang tidak bisa melihat sama sekali, namun
tetap ada, mungkin saja Anda mengenal atau berjumpa dengan setidaknya satu
orang yang tidak bisa melihat sama sekali. Akan tetapi juga jauh lebih banyak orang yang kita sebut pengguna yang
berpenglihatan lemah.

Inilah kelompok terbesar, mulai dari orang-orang yang seperti istri saya, yang tidak memiliki kornea
&mdash; jadi walaupun pada dasarnya ia bisa melihat sesuatu, ia kesulitan membaca barang cetak
dan secara legal dianggap buta &mdash; hingga orang yang memiliki
penglihatan buruk dan perlu mengenakan kaca mata resep yang sangat tinggi.

Ada banyak sekali macamnya, dan dengan sendirinya juga ada banyak macam akomodasi
yang digunakan oleh orang-orang yang ada dalam kategori ini: ada yang menggunakan pembaca layar atau
tampilan braille (saya bahkan pernah mendengar ada seorang wanita yang membaca braille yang ditampilkan di layar
karena lebih mudah dilihat daripada teks tercetak), atau mereka mungkin menggunakan teknologi teks-ke-ucapan
tanpa fungsionalitas lengkap pembaca layar, atau mereka dapat menggunakan
pembesar tampilan layar yang memperbesar bagian layar, atau mereka mungkin cuma menggunakan
zoom di browser untuk membuat semua font tampak lebih besar. Mereka mungkin juga menggunakan
opsi kontras tingi seperti mode kontras tinggi di sistem operasi,
ekstensi browser kontras tinggi atau tema kontras tinggi untuk situs web.

<figure class="attempt-right">
  <img src="imgs/high-contrast.png" alt="Mode kontras tinggi">	
  <figcaption>Mode kontras tinggi</figcaption>
</figure>

Banyak pengguna bahkan menggunakan kombinasi dari semua ini, seperti teman saya Laura yang menggunakan
kombinasi mode kontras tinggi, zoom di browser, teks-ke-ucapan.

Penglihatan rendah adalah sesuatu yang bisa dikaitkan dengan banyak orang. Sebagai awal, kita semua
mengalami penurunan penglihatan seiring usia, jadi sekalipun Anda belum mengalaminya
mungkin Anda pernah mendengar orang tua Anda mengeluhkan hal ini. Namun banyak orang
mengalami frustrasi saat membawa laptopnya keluar ruangan saat matahari cerah
dan tiba-tiba tidak bisa membaca apa-apa! Atau orang yang telah menjalani bedah laser
atau mungkin cuma harus membaca sesuatu dari seluruh ruangan mungkin telah menggunakan
salah satu akomodasi yang tadi saya sebutkan. Jadi menurut saya agak mudah bagi
developer untuk memiliki empati bagi pengguna yang berpenglihatan rendah.

Oh, jangan lupa dengan orang-orang yang memiliki penglihatan warna yang buruk &mdash;
sekitar 9% pria memiliki semacam defisiensi penglihatan warna! Plus sekitar 1%
wanita. Mereka mungkin kesulitan membedakan merah dan hijau, atau kuning dan biru.
Pertimbangkan tentang hal itu bila Anda nanti mendesain validasi formulir.

> *Bagaimana dengan kelemahan motorik?*

Ya, kelemahan motorik, atau kelemahan ketangkasan fisik. Kelompok ini meliputi
orang-orang yang lebih suka tidak menggunakan mouse, mungkin karena mengalami semacam
RSI atau sesuatu dan merasa nyeri bila menggunakannya, hingga orang yang mungkin lumpuh fisik
dan memiliki jangkauan gerak terbatas untuk anggota tubuh tertentu.

<figure class="attempt-right">
  <img src="imgs/eye-tracking.png" alt="Orang yang menggunakan perangkat pelacak mata">	
  <figcaption>Perangkat pelacak mata</figcaption>
</figure>

Pengguna yang mengalami kelemahan motorik mungkin menggunakan keyboard, perangkat switch, kontrol suara, atau bahkan
perangkat pelacak mata untuk berinteraksi dengan komputer mereka.

Mirip dengan kelemahan penglihatan, mobilitas juga bisa menjadi masalah sementara
atau situasional: Mungkin Anda mengalami patah pada tangan yang biasa memegang mouse. Mungkin trackpad
rusak di laptop, atau Anda sedang naik kereta yang bergoncang-goncang. Bisa jadi ada
banyak situasi yang menghalangi mobilitas pengguna, dan dengan memastikan kita
mempedulikan mereka berarti kita memperbaiki pengalaman keseluruhan, untuk siapa saja yang memiliki
kelemahan permanen maupun mereka yang untuk sementara tidak bisa
menggunakan UI berbasis pointer.

> *Bagus, mari kita bicara tentang kelemahan pendengaran.*

Kelompok ini bisa meliputi orang yang sepenuhnya tuli hingga orang yang sulit-mendengar. Dan
mirip sekali dengan penglihatan, pendengaran kita cenderung menurun bersama usia. Banyak dari kita menggunakan
kemampuan umum seperti alat bantu dengar.

<figure class="attempt-right">
  <img src="imgs/screen-captions.png" alt="Televisi dengan teks di bagian bawah">	
  <figcaption>Teks layar</figcaption>
</figure>

Bagi pengguna yang lemah pendengaran, perlu dipastikan bahwa kita tidak mengandalkan
suara, jadi pastikan menggunakan sesuatu seperti teks video dan transkrip, serta
menyediakan semacam alternatif, jika suara merupakan bagian dari antarmuka.

Dan seperti yang kita ketahui pada kelemahan motorik dan penglihatan, mudah sekali
kita bayangkan bahwa orang yang pendengarannya bekerja dengan baik akan turut
merasakan manfaat akomodasi ini. Banyak teman saya bilang mereka suka bila video dilengkapi
teks dan transkrip karena dengan begitu jika mereka berada di kantor yang tidak bersekat
dan mereka tidak membawa headphone, mereka tetap bisa menonton video!

> *Baiklah, bisa jelaskan sedikit tentang kelemahan kognitif?*

Ada banyak macam kondisi kognitif seperti ADD, Disleksia, dan Autis,
yang berarti orang-orang demikian ingin atau perlu mengakses sesuatu dengan cara berbeda. Akomodasi
untuk kelompok ini dengan sendirinya sangat beragam sekali, namun
pasti menemukan semacam tumpang tindih dengan area lain, seperti penggunaan fungsionalitas zoom untuk mempermudah
membaca atau berkonsentrasi. Selain itu, para pengguna ini mungkin merasa bahwa
desain yang benar-benar minimal adalah yang paling bagus karena meminimalkan distraksi dan beban kognitif.

Saya kira siapa saja bisa mengaitkan dengan stres kelebihan beban kognitif, jadi jelas
bahwa jika kita membuat sesuatu yang berfungsi dengan baik untuk orang yang memiliki kelemahan
kognitif, maka kita akan membuat sesuatu yang akan menjadi pengalaman menyenangkan
bagi siapa saja.

> *Jadi, bagaimana kesimpulan pendapat Anda tentang aksesibilitas?*

Bila Anda mengamati berbagai macam kemampuan dan ketidakmampuan yang dimiliki
orang, Anda bisa melihat bahwa mendesain dan membangun produk hanya bagi orang yang
memiliki penglihatan, pendengaran, ketangkasan, dan kognisi  sempurna, nampaknya itu benar-benar sempit.
Ini berlawanan dengan tujuan semula, karena kita akan membuat pengalaman yang lebih menimbulkan stres dan
kurang berguna bagi siapa saja, dan bagi sebagian pengguna akan menghasilkan pengalaman yang
sebenarnya akan mengecualikan mereka sama sekali.

<hr>

Dalam wawancara ini, Victor mengidentifikasi serangkaian kelemahan, dan memasukkannya
ke dalam empat kategori besar: *visual*, *motorik*, *pendengaran*, dan *kognitif*. Ia
juga menunjukkan bahwa setiap kelemahan bisa bersifat *situasional*,
*sementara*, atau *permanen*.

Mari kita amati beberapa contoh sungguhan dari kelemahan akses dan melihat
ke dalam kategori serta tipe apa memasukkannya. Perhatikan, beberapa kelemahan mungkin
dimasukkan dalam lebih dari satu kategori atau tipe.

<table>
  <tr>
    <th></th>
    <th>Situasional</th>
    <th>Sementara</th>
    <th>Permanen</th>
  </tr>
  <tr>
    <th>Visual</th>
    <td></td>
    <td>goncangan</td>
    <td>kebutaan</td>
  </tr>
  <tr>
    <th>Motor</th>
    <td>memegang bayi</td>
    <td>lengan patah, RSI*</td>
    <td>RSI*</td>
  </tr>
  <tr>
    <th>Pendengaran</th>
    <td>kantor yang berisik</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <th>Kognitif</th>
    <td></td>
    <td>goncangan</td>
    <td></td>
  </tr>
</table>

*Repetitive Strain Injury - Cedera Akibat Tegang Berulang: mis., sindrom saluran karpal, radang siku, jari
pemicu

## Langkah berikutnya

Kita sudah banyak membahas hal-hal pokok! Anda telah membaca tentang

 - apa yang dimaksud aksesibilitas dan mengapa hal ini penting bagi siapa saja
 - daftar periksa aksesibilitas WCAG dan WebAIM
 - berbagai tipe kelemahan yang harus Anda pertimbangkan

Untuk panduan selebihnya, kita akan mendalami beberapa aspek praktis dalam pembuatan
situs web yang bisa diakses. Kita akan menyusun upaya ini dalam tiga bidang bahasan
utama:

 - [**Fokus**](/web/fundamentals/accessibility/focus): Kita akan mengamati cara
   membangu sesuatu yang bisa dioperasikan dengan keyboard sebagai ganti mouse. Tentunya hal ini
   penting bagi pengguna yang memiliki kelemahan motorik, namun juga memastikan
   bahwa UI Anda cocok untuk semua pengguna.

 - [**Semantik**](/web/fundamentals/accessibility/semantics-builtin): Kita akan
   memastikan bahwa kita mengekspresikan antarmuka pengguna dengan cara sempurna yang bisa digunakan pada
   berbagai macam teknologi pendukung.

 - [**Penataan gaya**](/web/fundamentals/accessibility/accessible-styles): Kita akan mempertimbangkan desain
   visual dan mengamati beberapa teknik untuk membuat elemen visual
   antarmuka seluwes dan seberguna mungkin.

Masing-masing pokok bahasan bisa mengisi keseluruhan kursus, jadi kita tidak akan membahas setiap aspek
pembuatan situs web yang bisa diakses. Akan tetapi, kita akan memberi Anda informasi yang cukup untuk
memulai, dan menunjukkan beberapa tempat yang bagus untuk mempelajari tentang
setiap topik tersebut.



{# wf_devsite_translation #}
