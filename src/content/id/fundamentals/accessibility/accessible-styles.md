project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Menggunakan penataan gaya yang tepat untuk meningkatkan aksesibilitas


{# wf_updated_on: 2018-05-23 #}
{# wf_published_on: 2016-10-04 #}

# Gaya yang Dapat Diakses {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/robdodson.html" %}



Kita telah mendalami dua pilar aksesibilitas, fokus, dan semantik yang sangat penting.
Sekarang mari kita bahas yang ketiga, penataan gaya. Ini adalah topik luas yang dapat kita masukkan ke dalam
tiga bagian.

 - Memastikan bahwa elemen-elemen ditata gayanya untuk mendukung upaya aksesibilitas dengan
   menambahkan gaya untuk fokus dan beragam keadaan ARIA.
 - Penataan gaya UI kami untuk fleksibilitas sehingga UI dapat diperbesar atau diatur skalanya guna
 mengakomodasi pengguna yang mungkin memiliki masalah dengan teks berukuran kecil.
 - Memilih warna dan kontras yang tepat guna menghindari penyampaian informasi dengan
 warna saja.

## Penataan gaya fokus

Umumnya, setiap kali kita memfokuskan elemen, kita mengandalkan lingkaran
fokus browser bawaan (properti `outline` CSS) untuk menata gaya elemen. Lingkaran fokus ini berguna
karena, tanpanya, mustahil pengguna keyboard dapat memberi tahu elemen mana yang
memiliki fokus. [Daftar periksa WebAIM](http://webaim.org/standards/wcag/checklist){: .external } menunjukkan
pentingnya hal ini, yang mengharuskan bahwa "Tampak nyata secara visual elemen laman mana yang memiliki
fokus keyboard saat ini (yakni, saat melakukan navigasi pada laman tersebut, Anda bisa melihat tempat
Anda berada)."

![elemen bentuk dengan lingkaran fokus](imgs/focus-ring.png)

Akan tetapi, kadang-kadang lingkaran fokus bisa tampak terdistorsi atau mungkin hanya tidak pas
dengan desain laman Anda. Beberapa developer membuang gaya ini sama sekali dengan
menyetel `outline` elemen ke `0` atau `none`. Namun tanpa indikator fokus, bagaimana
pengguna keyboard dapat mengetahui dengan item mana ia berinteraksi?

Caution: Jangan menyetel outline ke 0 atau tidak ada tanpa memberikan alternatif fokus!

Anda mungkin familier dengan penambahan kondisi mengambang ke kontrol dengan menggunakan *kelas semu* CSS
`:hover`. Misalnya, Anda mungkin menggunakan `:hover` pada elemen tautan
untuk mengubah warna atau latar belakangnya saat mouse berada di atasnya. Serupa dengan
`:hover`, Anda bisa menggunakan kelas semu `:focus` untuk menargetkan elemen bila memiliki
fokus.

    /* At a minimum you can add a focus style that matches your hover style */
    :hover, :focus {
      background: #c0ffee;
    }

Solusi alternatif untuk masalah menghapus lingkaran fokus adalah memberi
elemen Anda gaya mengambang dan fokus yang sama, yang mengatasi masalah
"di mana fokusnya?" untuk pengguna keyboard. Seperti biasa, meningkatkan
pengalaman aksesibilitas berarti meningkatkan pengalaman seseorang.

### Modalitas Masukan

![tombol HTML asli dengan lingkaran fokus](imgs/sign-up.png){: .attempt-right }

Untuk elemen bawaan seperti `button`, browser dapat mendeteksi apakah interaksi pengguna
terjadi melalui mouse atau tekanan keyboard, dan biasanya hanya menampilkan
lingkaran fokus untuk interaksi keyboard. Misalnya, bila Anda mengeklik
`button` bawaan dengan mouse tidak ada lingkaran fokus, namun saat Anda menandainya dengan
keyboard, lingkaran fokus akan muncul.

Logikanya di sini adalah bahwa pengguna mouse cenderung kurang memerlukan lingkaran fokus
karena mereka tahu elemen apa yang mereka klik. Sayangnya saat ini tidak ada
satu pun solusi lintas-browser yang menghasilkan perilaku yang sama ini. Sebagai hasilnya, jika
Anda memberikan gaya `:focus` pada elemen apa pun, gaya tersebut akan ditampilkan *baik* bila
pengguna mengeklik elemen atau memfokusnya dengan keyboard. Cobalah mengeklik
tombol palsu ini dan perhatikan gaya `:focus` selalu diterapkan.

    <style>
      fake-button {
        display: inline-block;
        padding: 10px;
        border: 1px solid black;
        cursor: pointer;
        user-select: none;
      }

      fake-button:focus {
        outline: none;
        background: pink;
      }
    </style>
    <fake-button tabindex="0">Click Me!</fake-button>

{% framebox height="80px" %}
<style>
  fake-button {
    display: inline-block;
    padding: 10px;
    border: 1px solid black;
    cursor: pointer;
    user-select: none;
  }

  fake-button:focus {
    outline: none;
    background: pink;
  }
</style>
<fake-button tabindex="0">Click Me!</fake-button>
{% endframebox %}

Ini bisa sedikit merepotkan, dan sering kali developer akan mengambil jalan untuk menggunakan
JavaScript dengan kontrol khusus guna membedakan antara fokus mouse dan
keyboard.

Di Firefox, CSS kelas semu `:-moz-focusring` memungkinkan Anda untuk menulis
gaya fokus yang hanya berlaku jika elemen difokus melalui keyboard, sebuah
fitur yang cukup bermanfaat. Sementara kelas semu saat ini hanya didukung di Firefox,
[ada upaya yang sedang dilakukan untuk menjadikannya
standar](https://github.com/wicg/modality){: .external }.

Ada juga [artikel sangat menarik yang ditulis oleh Alice Boxhall dan Brian
Kardell](https://www.oreilly.com/ideas/proposing-css-input-modality){: .external }
bahwa mengeksplorasi topik modalitas dan berisi kode prototipe untuk
membedakan antara masukan mouse dan keyboard. Anda bisa menggunakan solusinya
sekarang, kemudian menyertakan kelas semu lingkaran fokus nanti bila sudah
didukung secara luas.

## Kondisi penataan gaya dengan ARIA

Saat Anda membangun komponen, praktik yang umum adalah mencerminkan keadaannya, dan
penampilannya, dengan menggunakan kelas CSS, yang dikontrol dengan JavaScript.

Misalnya, perhatikan tombol toggle yang masuk ke dalam kondisi visual "ditekan"
saat diklik dan mempertahankan kondisi tersebut sampai tombol diklik kembali. Untuk menata gaya
kondisi ini, JavaScript Anda mungkin menambahkan kelas `pressed` ke tombol tersebut. Dan, karena
Anda menginginkan semantik yang baik pada semua kontrol, Anda juga perlu menyetel keadaan
`aria-pressed` untuk tombol ke `true`.

Teknik yang berguna untuk digunakan di sini adalah benar-benar membuang kelas, dan cukup
gunakan atribut ARIA untuk menata gaya elemen. Kini Anda bisa memperbarui pemilih
CSS untuk keadaan tombol yang ditekan dari


    .toggle.pressed { ... }
    

ke ini.


    .toggle[aria-pressed="true"] { ... }
    

Hal ini menciptakan hubungan yang logis maupun semantik antara kondisi ARIA
dan penampilan elemen, juga memangkas kode ekstra.

## Desain responsif multi-perangkat

Kita mengetahui bahwa mendesain secara responsif guna menyediakan
pengalaman multi-perangkat terbaik adalah ide bagus, namun desain responsif juga memiliki kelebihan dalam hal
aksesibilitas.

Perhatikan situs seperti [Udacity.com](https://www.udacity.com/courses/all):

![Udacity.com dengan pembesaran 100%](imgs/udacity.jpg)

Pengguna dengan kemampuan penglihatan rendah yang memiliki kesulitan membaca tulisan kecil mungkin memperbesar laman,
mungkin sebesar 400%. Karena situs didesain secara responsif, UI akan
mengatur ulang sendiri untuk "tampilan yang terlihat yang lebih kecil" (sebenarnya untuk laman yang lebih besar),
yang sangat bagus untuk pengguna desktop yang memerlukan perbesaran layar dan untuk pengguna pembaca layar
seluler juga. Ini saling menguntungkan. Ini adalah laman yang sama yang diperbesar hingga
400%:

![Udacity.com dengan pembesaran 400%](imgs/udacity-zoomed.jpg)

Kenyataannya, hanya dengan mendesain secara responsif, kita memenuhi [aturan 1.4.4 dari daftar periksa WebAIM
](http://webaim.org/standards/wcag/checklist#sc1.4.4){: .external },
yang menyatakan bahwa suatu laman "...harus dapat dibaca dan fungsional saat ukuran
teksnya digandakan."

Memeriksa semua desain responsif adalah di luar cakupan panduan ini, tetapi
ini adalah beberapa hal yang perlu diingat dan penting yang akan bermanfaat bagi pengalaman responsif Anda
dan memberi pengguna Anda akses yang lebih baik ke materi.

 - Pertama, pastikan Anda selalu menggunakan tag meta `viewport` yang tepat.<br>
   `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
   <br>Setelan `width=device-width`
   akan cocok dengan lebar layar dalam piksel yang tidak tergantung perangkat, dan setelan
   `initial-scale=1` menetapkan hubungan 1:1 antara piksel CSS dan
   piksel yang tidak tergantung perangkat. Melakukan hal ini akan memerintahkan browser untuk mengepaskan
   materi dengan ukuran layar, sehingga pengguna tidak hanya melihat sekumpulan
   teks.

![tampilan ponsel dengan dan tanpa tag meta viewport](imgs/scrunched-up.jpg)

Caution: Saat menggunakan tag meta viewport, pastikan Anda tidak menyetel
maximum-scale=1 atau menyetel user-scaleable=no. Biarkan pengguna memperbesar jika mereka perlu!

 - Teknik lain yang perlu diingat adalah mendesain dengan grid responsif. Saat Anda
   melihat dengan situs Udacity, mendesain dengan grid berarti materi Anda akan
   mengubah posisi/geometri saat laman mengubah ukuran. Layout ini sering kali dibuat menggunakan
   unit-unit relatif seperti persen, ems, atau rems sebagai ganti
   nilai piksel hard-code. Keuntungan melakukannya dengan cara ini adalah teks dan materi dapat
   memperbesar dan memaksa ke bawah laman. Jadi urutan DOM dan urutan
   pembacaan tetap sama, bahkan jika ada perubahan layout karena perbesaran.

 - Selain itu, perhatikan agar menggunakan unit-unit relatif seperti `em` atau `rem` untuk hal-hal seperti ukuran
   teks, sebagai ganti nilai piksel. Beberapa browser mendukung pengubahan ukuran teks hanya dalam
   preferensi pengguna, dan jika Anda menggunakan nilai piksel untuk teks, setelan ini
   tidak akan memengaruhi salinan Anda. Namun jika Anda telah menggunakan unit-unit relatif
   seluruhnya, maka salinan situs akan diperbarui untuk mencerminkan preferensi pengguna.

 - Terakhir, saat desain Anda ditampilkan di perangkat seluler, Anda harus memastikan
   bahwa elemen interaktif seperti tombol atau tautan cukup besar, dan memiliki
   cukup ruang di sekitarnya, sehingga mudah untuk ditekan tanpa secara tidak sengaja
   tumpang-tindih dengan elemen yang lain. Hal ini bermanfaat bagi semua pengguna, namun khususnya
   berguna bagi siapa saja yang memiliki penurunan motorik.

Ukuran target sentuh minimum yang disarankan adalah sekitar 48 piksel yang tidak tergantung perangkat
pada situs dengan tampilan yang terlihat untuk seluler telah disetel dengan benar. Misalnya, sementara suatu ikon mungkin
hanya memiliki lebar dan tinggi 24 piksel, Anda bisa menggunakan pengisi tambahan untuk menambahkan
ukuran target ketuk hingga 48 piksel. Area piksel 48x48 sesuai dengan sekitar 9 mm
yaitu sekitar ukuran area isi jari seseorang.

![diagram yang menampilkan beberapa target sentuh 48 piksel](imgs/touch-target.jpg)

Target sentuh juga harus diberi ruang sekitar 8 piksel
terpisah, baik horizontal maupun vertikal, sehingga jari pengguna yang menekan satu
target ketuk tidak akan menyentuh target sentuh yang lain tanpa sengaja.

## Warna dan kontras

Jika Anda memiliki penglihatan yang bagus, mudah untuk menganggap bahwa semua orang dapat melihat warna atau
keterbacaan teks, dengan cara yang sama dengan Anda &mdash; namun tentu saja bukan itu masalahnya.
Mari kita rangkum hal ini dengan melihat bagaimana kita secara efektif dapat menggunakan warna dan kontras
untuk menciptakan desain menyenangkan yang dapat diakses bagi setiap orang.

Saat Anda dapat membayangkan, beberapa kombinasi warna yang mudah, bagi beberapa orang untuk
dibaca ternyata sulit atau mustahil bagi orang lain. Ini biasanya bermuara pada *kontras
warna*, hubungan antara
*luminansi* warna latar belakang dan latar depan. Saat warna serupa, rasio kontras rendah; saat warna
berbeda, rasio kontras pun tinggi.

[Panduan WebAIM](http://webaim.org/standards/wcag/){: .external }
menyarankan rasio kontras AA (minimum) sebesar 4,5:1 untuk semua teks. Pengecualian akan
dibuat untuk teks yang sangat besar (120-150% lebih besar dari teks isi default), yang
rasionya dapat turun menjadi 3:1. Perhatikan perbedaan dalam rasio kontras yang ditampilkan
di bawah ini.

![perbandingan beberapa rasio kontras](imgs/contrast-ratios.jpg)

Rasio kontras 4,5:1 dipilih untuk level AA karena rasio ini mengganti
hilangnya sensitivitas kontras yang biasanya dialami oleh pengguna yang kehilangan penglihatan
setara dengan penglihatan sekitar 20/40. 20/40 umumnya dilaporkan sebagai
ketajaman penglihatan biasa dari orang yang berusia sekitar 80 tahun. Untuk pengguna dengan gangguan penglihatan rendah
atau defisiensi warna, kita dapat meningkatkan kontras hingga 7:1 untuk teks isi.

Anda bisa menggunakan [ekstensi
Accessibility DevTools](https://chrome.google.com/webstore/detail/accessibility-developer-t/fpkknkljclfencbdbgkenhalefipecmb){: .external }
untuk Chrome guna mengidentifikasi rasio kontras. Salah satu manfaat menggunakan Chrome Devtools
adalah bahwa perangkat ini akan menyarankan alternatif AA dan AAA (disempurnakan) untuk
warna Anda saat ini, dan Anda bisa mengeklik nilai untuk melakukan pratinjau di aplikasi.

Untuk menjalankan audit warna/kontras, ikuti langkah-langkah dasar ini.

 1. Setelah memasang ekstensi, klik `Audits`
 1. Hapus centang semuanya kecuali `Accessibility`
 1. Klik `Audit Present State`
 1. Perhatikan setiap peringatan kontras

![dialog audit kontras devtools](imgs/contrast-audit.png)

WebAIM sendiri menyediakan [pemeriksa kontras
warna](http://webaim.org/resources/contrastchecker/){: .external } praktis yang bisa Anda gunakan
untuk memeriksa kontras setiap pasangan warna.

### Jangan menyampaikan informasi dengan warna saja

Ada sekitar 320 juta pengguna dengan defisiensi kemampuan melihat warna. Sekitar 1 dari 12
pria dan 1 dari 200 wanita memiliki beberapa bentuk "buta warna"; yang berarti sekitar
1/20 atau 5% pengguna Anda tidak akan merasakan pengalaman situs Anda sebagaimana yang Anda inginkan.
Saat kita mengandalkan warna untuk menyampaikan informasi, kita menekan angka tersebut ke
level yang tidak dapat diterima.

Note: Istilah "buta warna" sering kali digunakan untuk menjelaskan kondisi visual
pada orang yang memiliki kesulitan dalam membedakan warna, namun sebenarnya hanya sedikit sekali orang
yang benar-benar buta warna. Sebagian besar orang dengan defisiensi warna dapat melihat beberapa atau sebagian besar
warna, namun memiliki kesulitan membedakan antara warna-warna tertentu seperti merah
dengan hijau (yang paling umum), coklat dengan jingga, dan biru dengan ungu.

Misalnya, dalam sebuah formulir masukan, nomor telepon mungkin digarisbawahi dengan warna merah untuk
menunjukkan bahwa nomor tersebut tidak valid. Namun bagi pengguna yang memiliki defisiensi warna atau pembaca layar,
informasi tersebut tidak disampaikan dengan baik, bahkan benar-benar tidak baik. Maka, Anda harus selalu berupaya untuk
menyediakan beberapa cara bagi pengguna untuk mengakses informasi penting.

![formulir masukan dengan kesalahan digarisbawahi merah](imgs/input-form1.png)

[Daftar periksa WebAIM menyatakan di bagian
1.4.1](http://webaim.org/standards/wcag/checklist#sc1.4.1){: .external } bahwa
"warna tidak boleh digunakan sebagai satu-satunya metode untuk menyampaikan materi atau
membedakan elemen visual." Daftar periksa tersebut juga menyebutkan bahwa "warna saja tidak boleh
digunakan untuk membedakan tautan dari teks sekelilingnya" kecuali jika warna tersebut memenuhi
persyaratan kontras tertentu. Sebagai gantinya, daftar periksa menyarankan penambahan
indikator tambahan seperti setrip bawah (menggunakan properti `text-decoration` CSS) untuk
menunjukkan kapan tautan aktif.

Cara yang mudah untuk memperbaiki contoh sebelumnya adalah menambahkan pesan tambahan ke
bidang tersebut, dengan mengumumkan bahwa ini tidak valid dan alasannya.

![formulir masukan dengan pesan kesalahan yang ditambahkan untuk kejelasan](imgs/input-form2.png)

Saat Anda membangun sebuah aplikasi, tetap perhatikan hal-hal ini dan berhati-hati
dengan area yang Anda mungkin terlalu mengandalkan warna untuk menyampaikan
informasi penting.

Jika Anda penasaran tentang bagaimana tampilan situs Anda bagi beberapa orang, atau jika Anda sangat
mengandalkan penggunaan warna pada UI Anda, Anda bisa menggunakan [ekstensi NoCoffee Chrome
](https://chrome.google.com/webstore/detail/nocoffee/jjeeggmbnhckmgdhmgdckeigabjfbddl){: .external }
untuk menstimulasi beragam bentuk gangguan visual, termasuk berbagai jenis
buta warna.

### Mode kontras tinggi

Mode kontras tinggi memungkinkan pengguna untuk membalik warna latar belakang dan latar depan,
yang sering kali membantu teks tampak lebih baik. Bagi mereka dengan gangguan penglihatan
rendah, mode kontras tinggi dapat memudahkan mereka untuk menavigasi materi
pada laman. Ada beberapa cara untuk memperoleh penyiapan kontras tinggi di mesin Anda.

Sistem operasi seperti Mac OSX dan Windows menawarkan mode kontras tinggi yang dapat
diaktifkan bagi siapa saja pada level sistem. Atau pengguna dapat memasang ekstensi,
seperti [ekstensi Chrome High Contrast
](https://chrome.google.com/webstore/detail/high-contrast/djcfdncoelnlbldjfhinnjlhdjlikmph){: .external }
untuk mengaktifkan kontras tinggi hanya di aplikasi khusus tersebut.

Latihan yang berguna dihidupkan pada setelan kontras tinggi dan memverifikasi bahwa semua
UI di aplikasi Anda masih dapat dilihat dan dapat digunakan.

Misalnya, bilah navigasi dapat menggunakan warna latar belakang yang lembut untuk menunjukkan
laman mana yang saat ini dipilih. Jika Anda menampilkannya dalam ekstensi kontras tinggi,
yang perlahan seluruhnya menghilang, dan dengan cara ini pembaca mengerti
laman mana yang aktif.

![bilah navigasi dalam mode kontras tinggi](imgs/tab-contrast.png)

Demikian pula, jika Anda memperhatikan contoh dari pelajaran sebelumnya, garis bawah
merah di bidang nomor ponsel yang tidak valid mungkin ditampilkan dalam
warna biru-hijau yang sulit untuk dibedakan.

![formulir dengan bidang kesalahan dalam mode kontras tinggi](imgs/high-contrast.jpg)

Jika Anda menemukan rasio kontras yang dicakup dalam pelajaran sebelumnya, Anda
tidak akan mengalami masalah dalam hal mendukung mode kontras tinggi. Namun untuk menambah
ketenangan, pertimbangkan untuk memasang ekstensi Chrome High Contrast dan
periksa laman Anda untuk memeriksa apakah semuanya berfungsi, dan terlihat sebagaimana
yang diharapkan.


{# wf_devsite_translation #}
