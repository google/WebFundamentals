project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Editor kode Anda adalah alat development utama; Anda akan memakainya untuk menulis dan menyimpan baris kode. Tulis kode yang lebih baik dengan mempelajari pintasan editor Anda dan memasang plugin utama.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2014-05-28 #}

# Menyiapkan Editor Anda {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/mattgaunt.html" %}

Editor kode Anda adalah alat development utama; Anda akan memakainya untuk menulis dan menyimpan baris kode. Tulis kode yang lebih baik dengan mempelajari pintasan editor Anda dan memasang plugin utama.


### TL;DR {: .hide-from-toc }
- Pilih editor yang memungkinkan Anda menyesuaikan pintasan dan memiliki banyak plugin yang membantu Anda menulis kode yang lebih baik.
- Manfaatkan pengelola paket untuk mempermudah penemuan, pemasangan, dan pembaruan plugin.
- Pasang plugin yang membantu Anda tetap produktif selama proses development; mulai dengan yang disarankan dalam panduan ini.


## Memasang editor teks Sublime

[Sublime](http://www.sublimetext.com/){: .external } adalah editor yang sangat bagus dengan tingkat
fungsionalitas dasar yang kuat sehingga membuat penulisan kode lebih mudah. Anda bisa memasang pengelola
paket yang memudahkan Anda memasang plugin dan menambahkan fungsionalitas baru.

Ada dua opsi unduhan untuk Sublime Text, yaitu [versi 2](http://www.sublimetext.com/2) atau [versi 3](http://www.sublimetext.com/3). Versi 3 cukup stabil dan akan memberi Anda akses ke paket yang tidak tersedia di Sublime Text 2, tetapi mungkin versi 2 terasa lebih andal.

Note: <a href='http://robdodson.me/blog/2012/06/23/sublime-text-2-tips-and-shortcuts/'>Entri blog</a> Rob Dodson tentang cara mengenali dan menyukai Sublime adalah referensi yang sangat baik untuk mendapatkan manfaat maksimal dari editor Anda. Konsepnya relevan untuk semua editor teks, bukan hanya Sublime.

## Mengapa sebaiknya menggunakan pengelola paket?

Pengelola paket memudahkan menemukan, memasang, dan menjaga paket dan plugin
tetap terbaru.

<img src="imgs/package_control.png" class="center" alt="Tangkapan Layar Sublime Text Editors Package Control"/>

Anda bisa memasang Pengelola Paket untuk Sublime dengan mengikuti petunjuk ini
[https://packagecontrol.io/installation](https://packagecontrol.io/installation).

Anda hanya perlu melakukannya sekali, setelahnya lihat daftar plugin
yang kami sarankan di bawah.

## Memasang plugin

Plugin membantu Anda tetap lebih produktif. Apa saja yang membuat Anda harus kembali
memakai alat lain untuk melakukan suatu hal?

Linting - ada plugin untuk itu. Menampilkan perubahan apa saja yang telah diterapkan
- ada juga plugin untuk itu. Integrasi dengan alat lain, seperti GitHub,
ada plugin untuk itu.

Pengelola paket memudahkan menemukan, memasang, dan memperbarui plugin:

1. Di editor Sublime Text, buka pengelola paket Anda (ctrl+shift+p).
2. Masuk ke 'Install Package'.
3. Masukkan nama plugin yang Anda cari (atau jelajahi semua
   plugin).

Lihat [daftar plugin Sublime Text
yang populer](https://packagecontrol.io/browse). Berikut ini plugin yang kami sukai dan
sarankan agar Anda memasangnya karena membantu mempercepat proses development:

### Autoprefixer

Jika Anda menginginkan cara yang cepat untuk menambahkan awalan vendor ke CSS Anda, Anda bisa melakukannya dengan
plugin yang berguna ini.

Tulis CSS, abaikan awalan vendor dan bila Anda ingin menambahkannya, tekan
`ctrl+shift+p` dan ketikkan `Autoprefix CSS`.

[Kami membahas bagaimana Anda bisa mengotomatiskan ini di proses
pembangunan Anda](/web/tools/setup/setup-buildtools),
dengan demikian CSS Anda tetap ringan dan Anda tidak perlu mengingat harus menekan
`ctrl+shift+p`.

<img src="imgs/sublime-autoprefixer.gif" alt="Contoh Plugin Autoprefixer Sublime" />

### ColorPicker

Pilih warna apa pun dari palet dan tambahkan ke CSS Anda dengan `ctrl+shift+c`.

<img src="imgs/sublime-color-picker.png" alt="Plugin Color Picker Sublime" />

### Emmet

Tambahkan beberapa pintasan keyboard dan cuplikan yang berguna ke editor teks. Lihat
video di [Emmet.io](http://emmet.io/){: .external } untuk pengenalan tentang apa saja yang bisa Anda lakukan (
favorit pribadi adalah perintah 'Toggle Comment').

<img src="imgs/emmet-io-example.gif" alt="Demo Plugin Emmet.io" />

### HTML-CSS-JS prettify

Ekstensi ini memberikan Anda perintah untuk memformat HTML, CSS, dan JS Anda. Anda bahkan bisa
merapikan file Anda setiap kali menyimpan file.

<img src="imgs/sublime-prettify.gif" alt="Gif Plugin Prettify Sublime" />

### Git Gutter

Tambahkan penanda di gutter setiap kali ada perubahan yang dibuat pada file.

<img src="imgs/sublime-git-gutter.png" alt="Tangkapan layar Plugin Git Gutter Sublime" />

### Gutter Color

Note: Ini hanya tersedia di Sublime Text 3

Gutter Color menampilkan sampel warna kecil di sebelah CSS Anda.

<img src="imgs/sublime-gutter-color.png" alt="Tangkapan Layar Gutter Color Sublime" />

Plugin ini memerlukan ImageMagick. Jika Anda memakai Mac OS X, kami menyarankan Anda agar mencoba
pemasang dari [CactusLabs](http://cactuslab.com/imagemagick/){: .external } (Anda mungkin perlu
menghidupkan ulang komputer Anda agar bisa membuatnya berfungsi).





{# wf_devsite_translation #}
