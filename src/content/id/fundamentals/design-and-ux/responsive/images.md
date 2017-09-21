project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Sebuah gambar bernilai 1000 kata, dan gambar adalah bagian tidak terpisahkan dari setiap laman. Namun mereka juga yang bertanggung jawab untuk sebagian besar byte yang diunduh.  Dengan desain web responsif, tidak hanya layout yang bisa berubah berdasarkan karakteristik perangkat, namun gambar juga.

{# wf_updated_on: 2014-04-29 #}
{# wf_published_on: 2014-04-29 #}

# Gambar {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}


Desain web responsif berarti bahwa tidak hanya layout yang bisa berubah berdasarkan karakteristik
perangkat, namun materi juga dapat berubah.  Misalnya, pada tampilan
(2x) resolusi tinggi, grafis resolusi tinggi memastikan ketajaman. Gambar
dengan lebar 50% mungkin bekerja dengan baik ketika browser lebarnya 800 px, namun
menggunakan terlalu banyak properti pada layar ponsel yang sempit, dan memerlukan overhead bandwidth
yang sama ketika diperkecil agar muat pada layar yang lebih kecil.

## Tujuan seni

<img src="img/art-direction.png" alt="Contoh tujuan seni"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">

Pada saat lainnya, gambar mungkin harus diubah lebih drastis: dengan mengubah
ukuran, memotong dan bahkan mengganti seluruh gambar.  Dalam hal ini,
mengubah gambar biasanya disebut sebagai tujuan seni.  Lihat
[responsiveimages.org/demos/](https://responsiveimages.org/demos/){: .external } untuk contoh
selengkapnya.

{% include "web/_shared/udacity/ud882.html" %}

## Gambar di markup

<style>
  .side-by-side {
    display: inline-block;
    margin: 0 20px 0 0;
    width: 45%;
  }

  span#data_uri {
    background: url(data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%0D%0A%3C%21--%20Generator%3A%20Adobe%20Illustrator%2016.0.0%2C%20SVG%20Export%20Plug-In%20.%20SVG%20Version%3A%206.00%20Build%200%29%20%20--%3E%0D%0A%3C%21DOCTYPE%20svg%20PUBLIC%20%22-%2F%2FW3C%2F%2FDTD%20SVG%201.1%2F%2FEN%22%20%22http%3A%2F%2Fwww.w3.org%2FGraphics%2FSVG%2F1.1%2FDTD%2Fsvg11.dtd%22%3E%0D%0A%3Csvg%20version%3D%221.1%22%20id%3D%22Layer_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20x%3D%220px%22%20y%3D%220px%22%0D%0A%09%20width%3D%22396.74px%22%20height%3D%22560px%22%20viewBox%3D%22281.63%200%20396.74%20560%22%20enable-background%3D%22new%20281.63%200%20396.74%20560%22%20xml%3Aspace%3D%22preserve%22%0D%0A%09%3E%0D%0A%3Cg%3E%0D%0A%09%3Cg%3E%0D%0A%09%09%3Cg%3E%0D%0A%09%09%09%3Cpolygon%20fill%3D%22%23E44D26%22%20points%3D%22409.737%2C242.502%20414.276%2C293.362%20479.828%2C293.362%20480%2C293.362%20480%2C242.502%20479.828%2C242.502%20%09%09%09%0D%0A%09%09%09%09%22%2F%3E%0D%0A%09%09%09%3Cpath%20fill%3D%22%23E44D26%22%20d%3D%22M281.63%2C110.053l36.106%2C404.968L479.757%2C560l162.47-45.042l36.144-404.905H281.63z%20M611.283%2C489.176%0D%0A%09%09%09%09L480%2C525.572V474.03l-0.229%2C0.063L378.031%2C445.85l-6.958-77.985h22.98h26.879l3.536%2C39.612l55.315%2C14.937l0.046-0.013v-0.004%0D%0A%09%09%09%09L480%2C422.35v-79.32h-0.172H368.853l-12.207-136.871l-1.189-13.325h124.371H480v-49.668h162.17L611.283%2C489.176z%22%2F%3E%0D%0A%09%09%09%3Cpolygon%20fill%3D%22%23F16529%22%20points%3D%22480%2C192.833%20604.247%2C192.833%20603.059%2C206.159%20600.796%2C231.338%20599.8%2C242.502%20599.64%2C242.502%20%0D%0A%09%09%09%09480%2C242.502%20480%2C293.362%20581.896%2C293.362%20595.28%2C293.362%20594.068%2C306.699%20582.396%2C437.458%20581.649%2C445.85%20480%2C474.021%20%0D%0A%09%09%09%09480%2C474.03%20480%2C525.572%20611.283%2C489.176%20642.17%2C143.166%20480%2C143.166%20%09%09%09%22%2F%3E%0D%0A%09%09%09%3Cpolygon%20fill%3D%22%23F16529%22%20points%3D%22540.988%2C343.029%20480%2C343.029%20480%2C422.35%20535.224%2C407.445%20%09%09%09%22%2F%3E%0D%0A%09%09%09%3Cpolygon%20fill%3D%22%23EBEBEB%22%20points%3D%22414.276%2C293.362%20409.737%2C242.502%20479.828%2C242.502%20479.828%2C242.38%20479.828%2C223.682%20%0D%0A%09%09%09%09479.828%2C192.833%20355.457%2C192.833%20356.646%2C206.159%20368.853%2C343.029%20479.828%2C343.029%20479.828%2C293.362%20%09%09%09%22%2F%3E%0D%0A%09%09%09%3Cpolygon%20fill%3D%22%23EBEBEB%22%20points%3D%22479.828%2C474.069%20479.828%2C422.4%20479.782%2C422.413%20424.467%2C407.477%20420.931%2C367.864%20%0D%0A%09%09%09%09394.052%2C367.864%20371.072%2C367.864%20378.031%2C445.85%20479.771%2C474.094%20480%2C474.03%20480%2C474.021%20%09%09%09%22%2F%3E%0D%0A%09%09%09%3Cpolygon%20points%3D%22343.784%2C50.229%20366.874%2C50.229%20366.874%2C75.517%20392.114%2C75.517%20392.114%2C0%20366.873%2C0%20366.873%2C24.938%20%0D%0A%09%09%09%09343.783%2C24.938%20343.783%2C0%20318.544%2C0%20318.544%2C75.517%20343.784%2C75.517%20%09%09%09%22%2F%3E%0D%0A%09%09%09%3Cpolygon%20points%3D%22425.307%2C25.042%20425.307%2C75.517%20450.549%2C75.517%20450.549%2C25.042%20472.779%2C25.042%20472.779%2C0%20403.085%2C0%20%0D%0A%09%09%09%09403.085%2C25.042%20425.306%2C25.042%20%09%09%09%22%2F%3E%0D%0A%09%09%09%3Cpolygon%20points%3D%22508.537%2C38.086%20525.914%2C64.937%20526.349%2C64.937%20543.714%2C38.086%20543.714%2C75.517%20568.851%2C75.517%20568.851%2C0%20%0D%0A%09%09%09%09542.522%2C0%20526.349%2C26.534%20510.159%2C0%20483.84%2C0%20483.84%2C75.517%20508.537%2C75.517%20%09%09%09%22%2F%3E%0D%0A%09%09%09%3Cpolygon%20points%3D%22642.156%2C50.555%20606.66%2C50.555%20606.66%2C0%20581.412%2C0%20581.412%2C75.517%20642.156%2C75.517%20%09%09%09%22%2F%3E%0D%0A%09%09%09%3Cpolygon%20fill%3D%22%23FFFFFF%22%20points%3D%22480%2C474.021%20581.649%2C445.85%20582.396%2C437.458%20594.068%2C306.699%20595.28%2C293.362%20581.896%2C293.362%20%0D%0A%09%09%09%09480%2C293.362%20479.828%2C293.362%20479.828%2C343.029%20480%2C343.029%20540.988%2C343.029%20535.224%2C407.445%20480%2C422.35%20479.828%2C422.396%20%0D%0A%09%09%09%09479.828%2C422.4%20479.828%2C474.069%20%09%09%09%22%2F%3E%0D%0A%09%09%09%3Cpolygon%20fill%3D%22%23FFFFFF%22%20points%3D%22479.828%2C242.38%20479.828%2C242.502%20480%2C242.502%20599.64%2C242.502%20599.8%2C242.502%20600.796%2C231.338%20%0D%0A%09%09%09%09603.059%2C206.159%20604.247%2C192.833%20480%2C192.833%20479.828%2C192.833%20479.828%2C223.682%20%09%09%09%22%2F%3E%0D%0A%09%09%3C%2Fg%3E%0D%0A%09%3C%2Fg%3E%0D%0A%3C%2Fg%3E%0D%0A%3C%2Fsvg%3E%0D%0A) no-repeat;
    background-size: cover;
    height: 484px;
  }

  span#svg {
    background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' x='0px' y='0px' width='50%' height='560px' viewBox='281.63 0 396.74 560' enable-background='new 281.63 0 396.74 560' xml:space='preserve'><g><g><g><polygon fill='#E44D26' points='409.7,242.5 414.3,293.4 479.8,293.4 480,293.4 480,242.5 479.8,242.5'/><path fill='#E44D26' d='M281.63 110.053l36.106 404.968L479.757 560l162.47-45.042l36.144-404.905H281.63z M611.283 489.2 L480 525.572V474.03l-0.229 0.063L378.031 445.85l-6.958-77.985h22.98h26.879l3.536 39.612l55.315 14.937l0.046-0.013v-0.004 L480 422.35v-79.32h-0.172H368.853l-12.207-136.871l-1.189-13.325h124.371H480v-49.668h162.17L611.283 489.176z'/><polygon fill='#F16529' points='480,192.8 604.2,192.8 603.1,206.2 600.8,231.3 599.8,242.5 599.6,242.5 480,242.5 480,293.4 581.9,293.4 595.3,293.4 594.1,306.7 582.4,437.5 581.6,445.9 480,474 480,474 480,525.6 611.3,489.2 642.2,143.2 480,143.2'/><polygon fill='#F16529' points='541,343 480,343 480,422.4 535.2,407.4'/><polygon fill='#EBEBEB' points='414.3,293.4 409.7,242.5 479.8,242.5 479.8,242.4 479.8,223.7 479.8,192.8 355.5,192.8 356.6,206.2 368.9,343 479.8,343 479.8,293.4'/><polygon fill='#EBEBEB' points='479.8,474.1 479.8,422.4 479.8,422.4 424.5,407.5 420.9,367.9 394.1,367.9 371.1,367.9 378,445.9 479.8,474.1 480,474 480,474'/><polygon points='343.8,50.2 366.9,50.2 366.9,75.5 392.1,75.5 392.1,0 366.9,0 366.9,24.9 343.8,24.9 343.8,0 318.5,0 318.5,75.5 343.8,75.5'/><polygon points='425.3,25 425.3,75.5 450.5,75.5 450.5,25 472.8,25 472.8,0 403.1,0 403.1,25 425.3,25'/><polygon points='508.5,38.1 525.9,64.9 526.3,64.9 543.7,38.1 543.7,75.5 568.9,75.5 568.9,0 542.5,0 526.3,26.5 510.2,0 483.8,0 483.8,75.5 508.5,75.5'/><polygon points='642.2,50.6 606.7,50.6 606.7,0 581.4,0 581.4,75.5 642.2,75.5'/><polygon fill='#FFFFFF' points='480,474 581.6,445.9 582.4,437.5 594.1,306.7 595.3,293.4 581.9,293.4 480,293.4 479.8,293.4 479.8,343 480,343 541,343 535.2,407.4 480,422.4 479.8,422.4 479.8,422.4 479.8,474.1'/><polygon fill='#FFFFFF' points='479.8,242.4 479.8,242.5 480,242.5 599.6,242.5 599.8,242.5 600.8,231.3 603.1,206.2 604.2,192.8 480,192.8 479.8,192.8 479.8,223.7'/></g></g></g></svg>") no-repeat;
    background-size: cover;
    height: 484px;
  }
</style>

Elemen `img` adalah kuat&mdash;itu mengunduh, mengonversi dan merender materi&mdash;dan browser modern mendukung berbagai format gambar.  Memasukkan gambar yang
bekerja di seluruh perangkat tidak berbeda pada desktop, dan hanya membutuhkan beberapa
ubahan kecil untuk menciptakan pengalaman pengguna yang baik.


### TL;DR {: .hide-from-toc }

- Gunakan ukuran relatif bagi gambar untuk mencegah mereka secara tanpa sengaja meluap dari kontainer.
- Gunakan elemen `picture` ketika Anda ingin menetapkan gambar yang berbeda bergantung pada karakteristik perangkat (alias tujuan seni).
- Gunakan `srcset` dan deskriptor `x` dalam elemen `img` untuk memberikan petunjuk ke browser tentang gambar terbaik yang digunakan saat memilih dari kepadatan yang berbeda.
- Jika laman Anda hanya memiliki satu atau dua gambar dan itu tidak digunakan di tempat lain pada situs Anda, pertimbangkan menggunakan gambar inline untuk mengurangi permintaan file.


### Gunakan ukuran relatif untuk gambar

Ingatlah untuk menggunakan unit relatif ketika menetapkan lebar gambar untuk mencegah gambar
tanpa sengaja meluap dari tampilan yang terlihat.  Misalnya, `width: 50%;` 
menyebabkan lebar gambar menjadi 50% dari elemen yang terkandung (bukan 50% dari tampilan yang terlihat atau
50% dari ukuran piksel yang sebenarnya).

Karena CSS memungkinkan materi meluap dari kontainernya, Anda mungkin perlu menggunakan
max-width: 100% untuk mencegah gambar dan materi lainnya meluap.  Misalnya
:


    img, embed, object, video {
      max-width: 100%;
    }
    

Pastikan untuk memberikan keterangan penuh arti melalui atribut `alt` pada elemen `img`
; ini akan membantu membuat situs Anda lebih mudah diakses dengan memberikan konteks untuk
pembaca layar dan teknologi pendukung lainnya.


### Tingkatkan `img` dengan `srcset` untuk perangkat DPI tinggi

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="Pzc5Dly_jEM"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Atribut `srcset` meningkatkan perilaku elemen
`img`, sehingga memudahkan saat memberikan beberapa file gambar
untuk karakteristik perangkat yang berbeda. Serupa dengan `image-set`
[fungsi CSS](#use-image-set-to-provide-high-res-images)
bawaan dari CSS, `srcset` memungkinkan browser untuk memilih gambar
terbaik bergantung pada karakteristik perangkat, misalnya menggunakan
gambar 2x pada tampilan 2x, dan berpotensi di masa mendatang, gambar 1x pada
perangkat 2x saat berada di jaringan bandwidth yang terbatas.


<div style="clear:both;"></div>


    <img src="photo.png" srcset="photo@2x.png 2x" ...>
    

Pada browser yang tidak mendukung `srcset`, browser hanya menggunakan file gambar
default yang ditentukan oleh atribut `src`.  Inilah sebabnya mengapa penting untuk
selalu menyertakan gambar 1x yang bisa ditampilkan pada perangkat apa pun, terlepas dari
kemampuannya.  Ketika `srcset` didukung, daftar yang dipisahkan koma dari
gambar/kondisi di-parse sebelum membuat permintaan, dan hanya gambar paling
sesuai yang diunduh dan ditampilkan.

Meskipun ketentuan bisa berisi segala sesuatu dari kepadatan piksel hingga lebar dan
tinggi, hanya kepadatan piksel yang didukung dengan baik pada saat ini.  Untuk menyeimbangkan perilaku
saat ini dengan fitur masa mendatang, bertahanlah dengan hanya menyediakan gambar 2x di
atribut.

### Tujuan seni dalam gambar responsif dengan `picture`

<img class="attempt-right" src="img/art-direction.png" alt="Contoh tujuan seni"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">

Untuk mengubah gambar berdasarkan karakteristik perangkat, juga dikenal sebagai tujuan
seni, gunakan elemen `picture`.  Elemen
`picture` mendefinisikan solusi deklaratif untuk
menyediakan beberapa versi dari sebuah gambar berdasarkan karakteristik
yang berbeda, seperti ukuran perangkat, resolusi perangkat, orientasi,
dan lainnya.

<div style="clear:both;"></div>

Dogfood: Elemen `picture` mulai mendarat di browser. Meskipun belum tersedia di semua browser, kami merekomendasikan penggunaannya karena kompatibilitas mundur yang kuat dan potensi penggunaan [Picturefill polyfill](http://picturefill.responsiveimages.org/){: .external }. Lihat situs [ResponsiveImages.org](http://responsiveimages.org/#implementation) untuk lebih jelasnya.

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="QINlm3vjnaY"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Gunakan elemen <code>picture</code> ketika sumber gambar
terdapat di beberapa kepadatan, atau ketika desain responsif menentukan
gambar yang agak berbeda pada beberapa jenis layar.  Serupa dengan elemen
<code>video</code>, beberapa elemen <code>source</code> bisa
dimasukkan, sehingga memungkinkan untuk menentukan file gambar yang berbeda
bergantung pada kueri media atau format gambar.

<div style="clear:both;"></div>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/media.html" region_tag="picture" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/media.html){: target="_blank" .external }

Pada contoh di atas, jika lebar browser setidaknya 800 px, maka salah satu dari
`head.jpg` atau `head-2x.jpg` akan digunakan, bergantung pada resolusi perangkat.
Jika lebar browser antara 450 px dan 800 px, maka `head-small.jpg` atau
`head-small-2x.jpg` akan digunakan, bergantung pada resolusi perangkat.
Untuk lebar layar kurang dari 450 px dan kompatibilitas mundur dengan elemen
`picture` tidak didukung, browser merender elemen `img`
sebagai gantinya, dan harus selalu disertakan.

#### Gambar ukuran relatif

Ketika ukuran akhir gambar tidak diketahui, bisa sulit untuk menentukan
deskriptor kepadatan bagi sumber gambar.  Hal ini terutama berlaku untuk
gambar yang membentang seimbang dengan lebar browser dan bisa berubah-ubah, tergantung
pada ukuran browser.

Alih-alih menyediakan ukuran gambar dan kepadatan tetap, Anda bisa menetapkan ukuran masing-masing
gambar yang disediakan dengan menambahkan deskriptor lebar bersama dengan
ukuran elemen gambar, yang memungkinkan browser untuk secara otomatis menghitung
kepadatan piksel efektif dan memilih gambar terbaik untuk diunduh.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/sizes.html" region_tag="picture" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/sizes.html){: target="_blank" .external }


Contoh di atas merender sebuah gambar yang berukuran setengah lebar tampilan yang terlihat
(`sizes="50vw"`), dan bergantung pada lebar browser dan rasio piksel
perangkat, yang memungkinkan browser memilih gambar yang tepat terlepas dari
seberapa besar jendela browsernya. Misalnya, tabel di bawah ini menunjukkan gambar
mana yang akan dipilih browser:

<table class="">
  <thead>
    <tr>
      <th data-th="Browser width">Lebar browser</th>
      <th data-th="Device pixel ratio">Rasio piksel perangkat</th>
      <th data-th="Image used">Gambar yang digunakan</th>
      <th data-th="Effective resolution">Resolusi efektif</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Browser width">400 px</td>
      <td data-th="Device pixel ratio">1</td>
      <td data-th="Image used"><code>200.png</code></td>
      <td data-th="Effective resolution">1x</td>
    </tr>
    <tr>
      <td data-th="Browser width">400 px</td>
      <td data-th="Device pixel ratio">2</td>
      <td data-th="Image used"><code>400.png</code></td>
      <td data-th="Effective resolution">2x</td>
    </tr>
    <tr>
      <td data-th="Browser width">320 px</td>
      <td data-th="Device pixel ratio">2</td>
      <td data-th="Image used"><code>400.png</code></td>
      <td data-th="Effective resolution">2,5x</td>
    </tr>
    <tr>
      <td data-th="Browser width">600 px</td>
      <td data-th="Device pixel ratio">2</td>
      <td data-th="Image used"><code>800.png</code></td>
      <td data-th="Effective resolution">2,67x</td>
    </tr>
    <tr>
      <td data-th="Browser width">640 px</td>
      <td data-th="Device pixel ratio">3</td>
      <td data-th="Image used"><code>1000.png</code></td>
      <td data-th="Effective resolution">3,125x</td>
    </tr>
    <tr>
      <td data-th="Browser width">1100 px</td>
      <td data-th="Device pixel ratio">1</td>
      <td data-th="Image used"><code>1400.png</code></td>
      <td data-th="Effective resolution">1,27x</td>
    </tr>
  </tbody>
</table>


#### Memperhitungkan breakpoint dalam gambar responsif

Dalam banyak kasus, ukuran gambar bisa berubah bergantung pada breakpoint
layout situs.  Misalnya, pada layar kecil, Anda mungkin menginginkan agar gambar
membentang penuh pada tampilan yang terlihat, sementara di layar yang lebih besar, itu hanya
menggunakan sebagian kecilnya.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/breakpoints.html" region_tag="picture" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/breakpoints.html){: target="_blank" .external }

Atribut `sizes` pada contoh di atas, menggunakan beberapa kueri media untuk
menentukan ukuran gambar. Ketika lebar browser lebih besar dari
600 px, gambar berukuran 25% dari lebar tampilan yang terlihat, saat lebarnya antara 500 px
dan 600 px, gambar berukuran 50% dari lebar tampilan yang terlihat, dan saat lebarnya di bawah 500 px, lebarnya
maksimal.


### Membuat gambar produk yang bisa diperbesar

<figure class="attempt-right">
  <img src="img/sw-make-images-expandable-good.png" srcset="img/sw-make-images-expandable-good.png 1x, img/sw-make-images-expandable-good-2x.png 2x" alt="Situs web J. Crews dengan gambar produk yang diperluas">
  <figcaption class="success">
    Situs web J. Crews dengan gambar produk yang diperluas.
  </figcaption>
</figure>

Konsumen ingin melihat apa yang mereka beli.  Pada situs ritel, pengguna berharap untuk
bisa melihat tampilan-dekat resolusi tinggi dari produk agar bisa melihatnya secara lebih
detail, dan [partisipan penelitian](/web/fundamentals/getting-started/principles/#make-product-images-expandable) merasa frustrasi jika mereka tidak dapat melakukannya.

Sebuah contoh bagus dari gambar yang bisa diketuk dan diperbesar disediakan oleh situs J. Crew.
Sebuah overlay yang menghilang menunjukkan bahwa gambar bisa diketuk, yang memunculkan gambar
yang diperbesar dengan detail halus terlihat.

<div style="clear:both;"></div>

### Teknik gambar lainnya

#### Gambar kompresif

[Teknik gambar kompresif](http://www.html5rocks.com/en/mobile/high-dpi/#toc-tech-overview)
menyajikan gambar 2x kompresi sangat tinggi untuk semua perangkat, tidak peduli kemampuan
sebenarnya dari perangkat tersebut.  Tergantung pada tipe gambar dan tingkat
kompresi, kualitas gambar mungkin tidak terlihat berubah, namun ukuran file turun
secara signifikan.

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/compressive.html){: target="_blank" .external }

Perhatian: Gunakan teknik kompresi dengan hati-hati karena peningkatan biaya decoding dan memori yang diperlukan. Mengubah ukuran gambar besar agar muat pada layar yang lebih kecil tidak mudah dilakukan dan bisa sangat merugikan pada perangkat low-end karena memori dan kemampuan prosesor terbatas.

#### Pengganti gambar JavaScript

Pengganti gambar JavaScript memeriksa kemampuan perangkat dan "melakukan
hal yang benar." Anda bisa menentukan rasio piksel perangkat melalui
`window.devicePixelRatio`, memperoleh lebar dan tinggi layar, dan bahkan berpotensi melakukan
beberapa sniffing koneksi jaringan melalui `navigator.connection` atau mengeluarkan permintaan
palsu. Bila telah mengumpulkan semua informasi ini, Anda bisa memutuskan gambar
mana yang akan dimuat.

Salah satu kelemahan besar dalam pendekatan ini adalah bahwa menggunakan JavaScript berarti bahwa Anda akan
menunda pemuatan gambar sampai setidaknya parser lihat-depan telah diselesaikan. Bahkan ini
berarti bahwa gambar tidak akan mulai diunduh sampai kejadian `pageload`
sudah diaktifkan. Selain itu, browser kemungkinan besar akan mengunduh gambar
1x dan 2x, yang mengakibatkan peningkatan ukuran laman.


#### Menyisipkan gambar: bitmap dan vektor

Ada dua cara yang berbeda secara mendasar untuk membuat dan menyimpan gambar&mdash;dan ini memengaruhi bagaimana Anda menerapkan gambar secara responsif.

**Gambar bitmap**&mdash;seperti foto dan gambar lainnya&mdash;direpresentasikan sebagai grid dari titik-titik individu warna. Gambar bitmap mungkin berasal dari kamera atau pemindai, atau dibuat dengan elemen kanvas HTML. Format seperti PNG, JPEG dan WebP digunakan untuk menyimpan gambar bitmap.

**Gambar vektor**&mdash; seperti logo dan seni garis&mdash;didefinisikan sebagai serangkaian rangkaian kurva, garis, bentuk, warna isian dan gradien. Gambar vektor bisa dibuat dengan program seperti Adobe Illustrator atau Inkscape, atau ditulis tangan dalam kode menggunakan format vektor seperti SVG.

##### SVG

SVG memungkinkan untuk memasukkan grafis vektor responsif dalam laman web. Keuntungan dari format file vektor dibandingkan format file bitmap adalah bahwa browser bisa merender gambar vektor dalam ukuran apa saja. Format vektor menggambarkan geometri gambar&mdash;bagaimana itu dibuat dari garis, kurva, warna dan sebagainya. Format bitmap, di sisi lain, hanya memiliki informasi tentang titik-titik individu warna, sehingga browser harus menebak cara mengisi kekosongan saat penskalaan.

Di bawah ini adalah dua versi dari gambar yang sama: gambar PNG di sebelah kiri dan SVG di sebelah kanan. SVG terlihat bagus pada berbagai ukuran, sedangkan PNG di sebelahnya mulai terlihat buram pada ukuran layar yang lebih besar.

<img class="side-by-side" src="img/html5.png" alt="Logo HTML5, format PNG" />
<img class="side-by-side" src="img/html5.svg" alt="Logo HTML5, format SVG" />

Jika Anda ingin mengurangi jumlah permintaan file yang dibuat laman, Anda bisa mengkodekan gambar menjadi inline menggunakan format Data URI atau SVG. Jika Anda melihat sumber dari laman ini, Anda akan melihat bahwa kedua logo berikut dideklarasikan inline: URI Data dan SVG.

<img class="side-by-side" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiB
      BZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW
      9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RUR
      CBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2
      ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8
      vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OT
      kveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iMzk2Ljc0cHgiIGhlaWdodD0iNTYwc
      HgiIHZpZXdCb3g9IjI4MS42MyAwIDM5Ni43NCA1NjAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcg
      MjgxLjYzIDAgMzk2Ljc0IDU2MCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSINCgk+DQo8Zz4NCgk8Zz4
      NCgkJPGc+DQoJCQk8cG9seWdvbiBmaWxsPSIjRTQ0RDI2IiBwb2ludHM9IjQwOS43MzcsMjQyLj
      UwMiA0MTQuMjc2LDI5My4zNjIgNDc5LjgyOCwyOTMuMzYyIDQ4MCwyOTMuMzYyIDQ4MCwyNDIuN
      TAyIDQ3OS44MjgsMjQyLjUwMiAJCQkNCgkJCQkiLz4NCgkJCTxwYXRoIGZpbGw9IiNFNDREMjYi
      IGQ9Ik0yODEuNjMsMTEwLjA1M2wzNi4xMDYsNDA0Ljk2OEw0NzkuNzU3LDU2MGwxNjIuNDctNDU
    uMDQybDM2LjE0NC00MDQuOTA1SDI4MS42M3ogTTYxMS4yODMsNDg5LjE3Ng0KCQkJCUw0ODAsNT
    I1LjU3MlY0NzQuMDNsLTAuMjI5LDAuMDYzTDM3OC4wMzEsNDQ1Ljg1bC02Ljk1OC03Ny45ODVoM
    jIuOThoMjYuODc5bDMuNTM2LDM5LjYxMmw1NS4zMTUsMTQuOTM3bDAuMDQ2LTAuMDEzdi0wLjAw
    NA0KCQkJCUw0ODAsNDIyLjM1di03OS4zMmgtMC4xNzJIMzY4Ljg1M2wtMTIuMjA3LTEzNi44NzF
    sLTEuMTg5LTEzLjMyNWgxMjQuMzcxSDQ4MHYtNDkuNjY4aDE2Mi4xN0w2MTEuMjgzLDQ4OS4xNz
    Z6Ii8+DQoJCQk8cG9seWdvbiBmaWxsPSIjRjE2NTI5IiBwb2ludHM9IjQ4MCwxOTIuODMzIDYwN
    C4yNDcsMTkyLjgzMyA2MDMuMDU5LDIwNi4xNTkgNjAwLjc5NiwyMzEuMzM4IDU5OS44LDI0Mi41
    MDIgNTk5LjY0LDI0Mi41MDIgDQoJCQkJNDgwLDI0Mi41MDIgNDgwLDI5My4zNjIgNTgxLjg5Niw
    yOTMuMzYyIDU5NS4yOCwyOTMuMzYyIDU5NC4wNjgsMzA2LjY5OSA1ODIuMzk2LDQzNy40NTggNT
    gxLjY0OSw0NDUuODUgNDgwLDQ3NC4wMjEgDQoJCQkJNDgwLDQ3NC4wMyA0ODAsNTI1LjU3MiA2M
    TEuMjgzLDQ4OS4xNzYgNjQyLjE3LDE0My4xNjYgNDgwLDE0My4xNjYgCQkJIi8+DQoJCQk8cG9s
    eWdvbiBmaWxsPSIjRjE2NTI5IiBwb2ludHM9IjU0MC45ODgsMzQzLjAyOSA0ODAsMzQzLjAyOSA
    0ODAsNDIyLjM1IDUzNS4yMjQsNDA3LjQ0NSAJCQkiLz4NCgkJCTxwb2x5Z29uIGZpbGw9IiNFQk
    VCRUIiIHBvaW50cz0iNDE0LjI3NiwyOTMuMzYyIDQwOS43MzcsMjQyLjUwMiA0NzkuODI4LDI0M
    i41MDIgNDc5LjgyOCwyNDIuMzggNDc5LjgyOCwyMjMuNjgyIA0KCQkJCTQ3OS44MjgsMTkyLjgz
    MyAzNTUuNDU3LDE5Mi44MzMgMzU2LjY0NiwyMDYuMTU5IDM2OC44NTMsMzQzLjAyOSA0NzkuODI
    4LDM0My4wMjkgNDc5LjgyOCwyOTMuMzYyIAkJCSIvPg0KCQkJPHBvbHlnb24gZmlsbD0iI0VCRU
    JFQiIgcG9pbnRzPSI0NzkuODI4LDQ3NC4wNjkgNDc5LjgyOCw0MjIuNCA0NzkuNzgyLDQyMi40M
    TMgNDI0LjQ2Nyw0MDcuNDc3IDQyMC45MzEsMzY3Ljg2NCANCgkJCQkzOTQuMDUyLDM2Ny44NjQg
    MzcxLjA3MiwzNjcuODY0IDM3OC4wMzEsNDQ1Ljg1IDQ3OS43NzEsNDc0LjA5NCA0ODAsNDc0LjA
    zIDQ4MCw0NzQuMDIxIAkJCSIvPg0KCQkJPHBvbHlnb24gcG9pbnRzPSIzNDMuNzg0LDUwLjIyOS
    AzNjYuODc0LDUwLjIyOSAzNjYuODc0LDc1LjUxNyAzOTIuMTE0LDc1LjUxNyAzOTIuMTE0LDAgM
    zY2Ljg3MywwIDM2Ni44NzMsMjQuOTM4IA0KCQkJCTM0My43ODMsMjQuOTM4IDM0My43ODMsMCAz
    MTguNTQ0LDAgMzE4LjU0NCw3NS41MTcgMzQzLjc4NCw3NS41MTcgCQkJIi8+DQoJCQk8cG9seWd
    vbiBwb2ludHM9IjQyNS4zMDcsMjUuMDQyIDQyNS4zMDcsNzUuNTE3IDQ1MC41NDksNzUuNTE3ID
    Q1MC41NDksMjUuMDQyIDQ3Mi43NzksMjUuMDQyIDQ3Mi43NzksMCA0MDMuMDg1LDAgDQoJCQkJN
    DAzLjA4NSwyNS4wNDIgNDI1LjMwNiwyNS4wNDIgCQkJIi8+DQoJCQk8cG9seWdvbiBwb2ludHM9
    IjUwOC41MzcsMzguMDg2IDUyNS45MTQsNjQuOTM3IDUyNi4zNDksNjQuOTM3IDU0My43MTQsMzg
    uMDg2IDU0My43MTQsNzUuNTE3IDU2OC44NTEsNzUuNTE3IDU2OC44NTEsMCANCgkJCQk1NDIuNT
    IyLDAgNTI2LjM0OSwyNi41MzQgNTEwLjE1OSwwIDQ4My44NCwwIDQ4My44NCw3NS41MTcgNTA4L
    jUzNyw3NS41MTcgCQkJIi8+DQoJCQk8cG9seWdvbiBwb2ludHM9IjY0Mi4xNTYsNTAuNTU1IDYw
    Ni42Niw1MC41NTUgNjA2LjY2LDAgNTgxLjQxMiwwIDU4MS40MTIsNzUuNTE3IDY0Mi4xNTYsNzU
    uNTE3IAkJCSIvPg0KCQkJPHBvbHlnb24gZmlsbD0iI0ZGRkZGRiIgcG9pbnRzPSI0ODAsNDc0Lj
    AyMSA1ODEuNjQ5LDQ0NS44NSA1ODIuMzk2LDQzNy40NTggNTk0LjA2OCwzMDYuNjk5IDU5NS4yO
    CwyOTMuMzYyIDU4MS44OTYsMjkzLjM2MiANCgkJCQk0ODAsMjkzLjM2MiA0NzkuODI4LDI5My4z
    NjIgNDc5LjgyOCwzNDMuMDI5IDQ4MCwzNDMuMDI5IDU0MC45ODgsMzQzLjAyOSA1MzUuMjI0LDQ
    wNy40NDUgNDgwLDQyMi4zNSA0NzkuODI4LDQyMi4zOTYgDQoJCQkJNDc5LjgyOCw0MjIuNCA0Nz
    kuODI4LDQ3NC4wNjkgCQkJIi8+DQoJCQk8cG9seWdvbiBmaWxsPSIjRkZGRkZGIiBwb2ludHM9I
    jQ3OS44MjgsMjQyLjM4IDQ3OS44MjgsMjQyLjUwMiA0ODAsMjQyLjUwMiA1OTkuNjQsMjQyLjUw
    MiA1OTkuOCwyNDIuNTAyIDYwMC43OTYsMjMxLjMzOCANCgkJCQk2MDMuMDU5LDIwNi4xNTkgNjA
    0LjI0NywxOTIuODMzIDQ4MCwxOTIuODMzIDQ3OS44MjgsMTkyLjgzMyA0NzkuODI4LDIyMy42OD
    IgCQkJIi8+DQoJCTwvZz4NCgk8L2c+DQo8L2c+DQo8L3N2Zz4NCg==">
<svg class="side-by-side" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  width="396.74px" height="560px" viewBox="281.63 0 396.74 560" enable-background="new 281.63 0 396.74 560" xml:space="preserve"><g><g><g><polygon fill="#E44D26" points="409.737,242.502 414.276,293.362 479.828,293.362 480,293.362 480,242.502 479.828,242.502"/><path fill="#E44D26" d="M281.63,110.053l36.106,404.968L479.757,560l162.47-45.042l36.144-404.905H281.63z M611.283,489.176 L480,525.572V474.03l-0.229,0.063L378.031,445.85l-6.958-77.985h22.98h26.879l3.536,39.612l55.315,14.937l0.046-0.013v-0.004 L480,422.35v-79.32h-0.172H368.853l-12.207-136.871l-1.189-13.325h124.371H480v-49.668h162.17L611.283,489.176z"/><polygon fill="#F16529" points="480,192.833 604.247,192.833 603.059,206.159 600.796,231.338 599.8,242.502 599.64,242.502 480,242.502 480,293.362 581.896,293.362 595.28,293.362 594.068,306.699 582.396,437.458 581.649,445.85 480,474.021 480,474.03 480,525.572 611.283,489.176 642.17,143.166 480,143.166       "/><polygon fill="#F16529" points="540.988,343.029 480,343.029 480,422.35 535.224,407.445      "/><polygon fill="#EBEBEB" points="414.276,293.362 409.737,242.502 479.828,242.502 479.828,242.38 479.828,223.682 479.828,192.833 355.457,192.833 356.646,206.159 368.853,343.029 479.828,343.029 479.828,293.362       "/><polygon fill="#EBEBEB" points="479.828,474.069 479.828,422.4 479.782,422.413 424.467,407.477 420.931,367.864 394.052,367.864 371.072,367.864 378.031,445.85 479.771,474.094 480,474.03 480,474.021       "/><polygon points="343.784,50.229 366.874,50.229 366.874,75.517 392.114,75.517 392.114,0 366.873,0 366.873,24.938 343.783,24.938 343.783,0 318.544,0 318.544,75.517 343.784,75.517      "/><polygon points="425.307,25.042 425.307,75.517 450.549,75.517 450.549,25.042 472.779,25.042 472.779,0 403.085,0 403.085,25.042 425.306,25.042       "/><polygon points="508.537,38.086 525.914,64.937 526.349,64.937 543.714,38.086 543.714,75.517 568.851,75.517 568.851,0 542.522,0 526.349,26.534 510.159,0 483.84,0 483.84,75.517 508.537,75.517      "/><polygon points="642.156,50.555 606.66,50.555 606.66,0 581.412,0 581.412,75.517 642.156,75.517      "/><polygon fill="#FFFFFF" points="480,474.021 581.649,445.85 582.396,437.458 594.068,306.699 595.28,293.362 581.896,293.362 480,293.362 479.828,293.362 479.828,343.029 480,343.029 540.988,343.029 535.224,407.445 480,422.35 479.828,422.396 479.828,422.4 479.828,474.069       "/><polygon fill="#FFFFFF" points="479.828,242.38 479.828,242.502 480,242.502 599.64,242.502 599.8,242.502 600.796,231.338 603.059,206.159 604.247,192.833 480,192.833 479.828,192.833 479.828,223.682       "/></g></g></g></svg>

SVG memiliki [dukungan yang luar biasa](http://caniuse.com/svg-html5) pada seluler dan desktop, dan [alat optimalisasi](https://sarasoueidan.com/blog/svgo-tools/) bisa secara signifikan mengurangi ukuran SVG. Dua logo SVG inline berikut terlihat sama, namun yang satu berukuran sekitar 3 KB dan lainnya hanya 2KB:

<svg class="side-by-side" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="396.74px" height="560px" viewBox="281.63 0 396.74 560" enable-background="new 281.63 0 396.74 560" xml:space="preserve"><g><g><g><polygon fill="#E44D26" points="409.737,242.502 414.276,293.362 479.828,293.362 480,293.362 480,242.502 479.828,242.502"/><path fill="#E44D26" d="M281.63,110.053l36.106,404.968L479.757,560l162.47-45.042l36.144-404.905H281.63z M611.283,489.176 L480,525.572V474.03l-0.229,0.063L378.031,445.85l-6.958-77.985h22.98h26.879l3.536,39.612l55.315,14.937l0.046-0.013v-0.004 L480,422.35v-79.32h-0.172H368.853l-12.207-136.871l-1.189-13.325h124.371H480v-49.668h162.17L611.283,489.176z"/><polygon fill="#F16529" points="480,192.833 604.247,192.833 603.059,206.159 600.796,231.338 599.8,242.502 599.64,242.502 480,242.502 480,293.362 581.896,293.362 595.28,293.362 594.068,306.699 582.396,437.458 581.649,445.85 480,474.021 480,474.03 480,525.572 611.283,489.176 642.17,143.166 480,143.166       "/><polygon fill="#F16529" points="540.988,343.029 480,343.029 480,422.35 535.224,407.445      "/><polygon fill="#EBEBEB" points="414.276,293.362 409.737,242.502 479.828,242.502 479.828,242.38 479.828,223.682 479.828,192.833 355.457,192.833 356.646,206.159 368.853,343.029 479.828,343.029 479.828,293.362       "/><polygon fill="#EBEBEB" points="479.828,474.069 479.828,422.4 479.782,422.413 424.467,407.477 420.931,367.864 394.052,367.864 371.072,367.864 378.031,445.85 479.771,474.094 480,474.03 480,474.021       "/><polygon points="343.784,50.229 366.874,50.229 366.874,75.517 392.114,75.517 392.114,0 366.873,0 366.873,24.938 343.783,24.938 343.783,0 318.544,0 318.544,75.517 343.784,75.517      "/><polygon points="425.307,25.042 425.307,75.517 450.549,75.517 450.549,25.042 472.779,25.042 472.779,0 403.085,0 403.085,25.042 425.306,25.042       "/><polygon points="508.537,38.086 525.914,64.937 526.349,64.937 543.714,38.086 543.714,75.517 568.851,75.517 568.851,0 542.522,0 526.349,26.534 510.159,0 483.84,0 483.84,75.517 508.537,75.517      "/><polygon points="642.156,50.555 606.66,50.555 606.66,0 581.412,0 581.412,75.517 642.156,75.517      "/><polygon fill="#FFFFFF" points="480,474.021 581.649,445.85 582.396,437.458 594.068,306.699 595.28,293.362 581.896,293.362 480,293.362 479.828,293.362 479.828,343.029 480,343.029 540.988,343.029 535.224,407.445 480,422.35 479.828,422.396 479.828,422.4 479.828,474.069       "/><polygon fill="#FFFFFF" points="479.828,242.38 479.828,242.502 480,242.502 599.64,242.502 599.8,242.502 600.796,231.338 603.059,206.159 604.247,192.833 480,192.833 479.828,192.833 479.828,223.682       "/></g></g></g></svg><svg class="side-by-side" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="50%" height="560px" viewBox="281.63 0 396.74 560" enable-background="new 281.63 0 396.74 560" xml:space="preserve"><g><g><g><polygon fill="#E44D26" points="409.7,242.5 414.3,293.4 479.8,293.4 480,293.4 480,242.5 479.8,242.5"/><path fill="#E44D26" d="M281.63 110.053l36.106 404.968L479.757 560l162.47-45.042l36.144-404.905H281.63z M611.283 489.2 L480 525.572V474.03l-0.229 0.063L378.031 445.85l-6.958-77.985h22.98h26.879l3.536 39.612l55.315 14.937l0.046-0.013v-0.004 L480 422.35v-79.32h-0.172H368.853l-12.207-136.871l-1.189-13.325h124.371H480v-49.668h162.17L611.283 489.176z"/><polygon fill="#F16529" points="480,192.8 604.2,192.8 603.1,206.2 600.8,231.3 599.8,242.5 599.6,242.5 480,242.5 480,293.4 581.9,293.4 595.3,293.4 594.1,306.7 582.4,437.5 581.6,445.9 480,474 480,474 480,525.6 611.3,489.2 642.2,143.2 480,143.2"/><polygon fill="#F16529" points="541,343 480,343 480,422.4 535.2,407.4"/><polygon fill="#EBEBEB" points="414.3,293.4 409.7,242.5 479.8,242.5 479.8,242.4 479.8,223.7 479.8,192.8 355.5,192.8 356.6,206.2 368.9,343 479.8,343 479.8,293.4"/><polygon fill="#EBEBEB" points="479.8,474.1 479.8,422.4 479.8,422.4 424.5,407.5 420.9,367.9 394.1,367.9 371.1,367.9 378,445.9 479.8,474.1 480,474 480,474"/><polygon points="343.8,50.2 366.9,50.2 366.9,75.5 392.1,75.5 392.1,0 366.9,0 366.9,24.9 343.8,24.9 343.8,0 318.5,0 318.5,75.5 343.8,75.5"/><polygon points="425.3,25 425.3,75.5 450.5,75.5 450.5,25 472.8,25 472.8,0 403.1,0 403.1,25 425.3,25"/><polygon points="508.5,38.1 525.9,64.9 526.3,64.9 543.7,38.1 543.7,75.5 568.9,75.5 568.9,0 542.5,0 526.3,26.5 510.2,0 483.8,0 483.8,75.5 508.5,75.5"/><polygon points="642.2,50.6 606.7,50.6 606.7,0 581.4,0 581.4,75.5 642.2,75.5"/><polygon fill="#FFFFFF" points="480,474 581.6,445.9 582.4,437.5 594.1,306.7 595.3,293.4 581.9,293.4 480,293.4 479.8,293.4 479.8,343 480,343 541,343 535.2,407.4 480,422.4 479.8,422.4 479.8,422.4 479.8,474.1"/><polygon fill="#FFFFFF" points="479.8,242.4 479.8,242.5 480,242.5 599.6,242.5 599.8,242.5 600.8,231.3 603.1,206.2 604.2,192.8 480,192.8 479.8,192.8 479.8,223.7"/></g></g></g></svg>

##### Data URI

Data URI menyediakan cara untuk menyertakan file, seperti gambar, inline dengan menetapkan src dari elemen <code>img</code> sebagai string mengenkode Base64 menggunakan format berikut:


    <img src="data:image/svg+xml;base64,[data]">
    

Awal kode untuk logo HTML5 di atas terlihat seperti ini:


    <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiB
    BZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW ...">
    

(Versi lengkap lebih dari 5000 karakter panjangnya!)

Alat (bantu) seret dan lepas seperti [jpillora.com/base64-encoder](https://jpillora.com/base64-encoder) tersedia untuk mengonversi file biner seperti gambar ke Data URI. Sama seperti SVG, Data URI [didukung dengan baik](http://caniuse.com/datauri) pada browser seluler dan desktop.

##### Penyisipan di CSS

URI Data dan SVG juga bisa disisipkan dalam CSS&mdash;dan ini didukung pada perangkat seluler dan desktop. Berikut adalah dua gambar serupa yang diimplementasikan sebagai gambar latar di CSS; sebuah URI Data, sebuah SVG:

<span class="side-by-side" id="data_uri"></span>
<span class="side-by-side" id="svg"></span>

##### Menyisipkan kelebihan & kekurangan

Kode inline untuk gambar bisa bertele-tele&mdash;terutama URI Data&mdash;jadi mengapa Anda mau menggunakannya? Untuk mengurangi permintaan HTTP! SVG dan Data URI bisa mengaktifkan seluruh laman web, termasuk gambar, CSS dan JavaScript, yang dapat diambil dengan satu permintaan.

Sisi negatifnya:

* Pada perangkat seluler, Data URI bisa [secara signifikan lebih lambat](https://www.mobify.com/blog/data-uris-are-slow-on-mobile/) untuk ditampilkan pada perangkat seluler daripada gambar dari <code>src</code> eksternal.
* Data URI bisa cukup banyak meningkatkan ukuran permintaan HTML.
* Mereka menambahkan kompleksitas pada markup dan alur kerja Anda.
* Format Data URI jauh lebih besar dari biner (hingga 30%) dan oleh karena itu tidak mengurangi jumlah ukuran unduhan.
* Data URI tidak bisa di-cache, sehingga harus diunduh untuk setiap laman yang menggunakannya.
* Mereka tidak didukung dalam IE 6 dan 7, dukungan tidak lengkap dalam IE8.
* Dengan HTTP/2, mengurangi jumlah permintaan aset akan menjadi berkurang prioritasnya.

Seperti pada segala sesuatu yang responsif, Anda harus menguji apa yang terbaik. Gunakan alat developer untuk mengukur ukuran file unduhan, jumlah permintaan, dan jumlah latensi. URI Data kadang-kadang bisa berguna untuk gambar bitmap&mdash;misalnya, pada beranda yang hanya memiliki satu atau dua foto yang tidak digunakan di tempat lain. Jika Anda membutuhkan gambar vektor inline, SVG adalah pilihan yang jauh lebih baik.



## Gambar di CSS

Properti `background` CSS adalah alat (bantu) yang efektif untuk menambahkan gambar kompleks
ke elemen, memudahkan ketika ingin menambahkan beberapa gambar, membuat pengulangan,
dan banyak lagi.  Ketika dikombinasikan dengan kueri media, properti latar belakang menjadi
lebih efektif lagi, memungkinkan pemuatan gambar bersyarat berdasarkan resolusi
layar, ukuran tampilan yang terlihat, dan lainnya.


### TL;DR {: .hide-from-toc }
- Gunakan gambar terbaik untuk karakteristik tampilan, pertimbangkan ukuran layar, resolusi perangkat dan layout laman.
- Ubah properti `background-image` dalam CSS untuk tampilan DPI tinggi menggunakan kueri media dengan `min-resolution` dan `-webkit-min-device-pixel-ratio`.
- Gunakan srcset untuk memberikan gambar resolusi tinggi selain gambar 1x dalam markup.
- Pertimbangkan biaya kinerja ketika menggunakan teknik pengganti gambar JavaScript atau ketika menyajikan gambar resolusi tinggi sangat terkompresi untuk perangkat resolusi rendah.


### Gunakan kueri media untuk pemuatan gambar bersyarat atau tujuan seni

Kueri media tidak hanya memengaruhi layout laman; Anda juga bisa menggunakannya untuk
memuat gambar secara bersyarat atau memberikan tujuan seni bergantung pada lebar
tampilan yang terlihat.

Misalnya dalam contoh di bawah ini, pada layar yang lebih kecil, hanya `small.png` yang
diunduh dan diaplikasikan ke materi `div`, sementara di layar yang lebih besar
`background-image: url(body.png)` diaplikasikan ke tubuh dan `background-image:
url(large.png)` is applied to the content `div`.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/conditional-mq.html" region_tag="conditional" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/conditional-mq.html){: target="_blank" .external }

### Gunakan image-set untuk memberikan gambar resolusi tinggi

Fungsi `image-set()` dalam CSS meningkatkan perilaku properti `background`,
sehingga memudahkan saat memberikan beberapa file gambar untuk karakteristik
perangkat yang berbeda.  Hal ini memungkinkan browser untuk memilih gambar terbaik tergantung pada
karakteristik perangkat, misalnya menggunakan gambar 2x pada tampilan 2x,
atau gambar 1x pada perangkat 2x ketika berada pada jaringan bandwidth terbatas.


    background-image: image-set(
      url(icon1x.jpg) 1x,
      url(icon2x.jpg) 2x
    );
    

Selain memuat gambar yang benar, browser juga mengubah ukurannya
secara sesuai. Dengan kata lain, browser berasumsi bahwa gambar 2x berukuran dua kali
lebih besar dari gambar 1x, lalu menurunkan ukuran gambar 2x dengan faktor 2, sehingga
gambar yang muncul mempunyai ukuran yang sama pada laman.

Dukungan untuk `image-set()` masih baru dan hanya didukung di Chrome dan
Safari dengan awalan vendor `-webkit`.  Berhati-hatilah saat menyertakan
gambar fallback ketika `image-set()` tidak didukung; misalnya:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/image-set.html" region_tag="imageset" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/image-set.html){: target="_blank" .external }

Hal di atas memuat aset yang tepat di browser yang mendukung image-set; jika tidak akan
kembali ke aset 1x. Kekurangan yang nyata adalah bahwa meskipun dukungan browser
`image-set()` rendah, kebanyakan browser mendapatkan aset 1x.

### Menggunakan kueri media untuk memberikan gambar resolusi tinggi atau tujuan seni

Kueri media bisa membuat aturan berdasarkan 
[rasio piksel perangkat](http://www.html5rocks.com/en/mobile/high-dpi/#toc-bg), 
sehingga bisa menentukan gambar yang berbeda untuk tampilan 2x versus 1x.


    @media (min-resolution: 2dppx),
    (-webkit-min-device-pixel-ratio: 2)
    {
      /* High dpi styles & resources here */
    }
    

Chrome, Firefox dan Opera semua mendukung `(min-resolution: 2dppx)` standar,
sementara Safari dan browser Android keduanya membutuhkan sintaks berawalan vendor yang lebih lama
tanpa unit `dppx`.  Ingatlah, gaya ini hanya dimuat jika perangkat
cocok dengan kueri media, dan Anda harus menetapkan gaya untuk kejadian dasar.  Ini
juga memberikan manfaat untuk memastikan sesuatu dirender jika browser
tidak mendukung kueri media resolusi spesifik.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/media-query-dppx.html" region_tag="mqdppx" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/media-query-dppx.html){: target="_blank" .external }

Anda juga bisa menggunakan sintaks min-width untuk menampilkan gambar alternatif tergantung pada
ukuran tampilan yang terlihat.  Teknik ini memiliki keuntungan bahwa gambar tidak
diunduh jika kueri media tidak sesuai.  Misalnya, `bg.png` hanya
diunduh dan diaplikasikan ke `body` jika lebar browser 500px atau lebih besar:


    @media (min-width: 500px) {
      body {
        background-image: url(bg.png);
      }
    }
    


## Menggunakan SVG untuk ikon 

Ketika menambahkan ikon ke laman Anda, gunakan ikon SVG jika memungkinkan atau dalam kasus
tertentu, karakter unicode.


### TL;DR {: .hide-from-toc }
- Menggunakan SVG atau unicode sebagai ikon bukannya gambar bitmap.


### Ganti ikon sederhana dengan unicode

Banyak font mengikutsertakan dukungan untuk berbagai karakter unicode, yang bisa digunakan
sebagai pengganti gambar. Tidak seperti gambar, font unicode akan diskalakan dengan baik dan terlihat baik tidak
peduli seberapa kecil atau besar mereka ditampilkan di layar.

Selain himpunan karakter normal, unicode mungkin memasukkan simbol untuk 
panah (&#8592;), operator matematika (&#8730;), bentuk geometris
(&#9733;), gambar kontrol (&#9654;), notasi musik (&#9836;),
huruf Yunani (&#937;), bahkan bidak catur (&#9822;).

Memasukkan karakter unicode dilakukan secara sama dengan memberi nama entitas:
`&#XXXX`, dengan `XXXX` merepresentasikan angka karakter unicode. Misalnya:


    You're a super &#9733;
    

You're a super &#9733;

### Ganti ikon kompleks dengan SVG

Untuk persyaratan ikon kompleks lainnya, ikon SVG biasanya ringan, 
mudah digunakan, dan bisa diberi gaya dengan CSS. SVG memiliki sejumlah keunggulan dibandingkan
gambar bitmap:

* Mereka adalah grafis vektor yang bisa diskalakan secara tak terbatas.
* Efek CSS seperti warna, bayangan, transparansi, dan animasi 
  bisa dibuat dengan mudah.
* Gambar SVG bisa disisipkan langsung dalam dokumen.
* Mereka semantik.
* Ikon SVG menyediakan aksesibilitas yang lebih baik dengan atribut yang sesuai.



<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/icon-svg.html" region_tag="iconsvg" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/icon-svg.html){: target="_blank" .external }

### Gunakan font ikon dengan hati-hati

<figure class="attempt-right">
  <img src="img/icon-fonts.png" class="center" srcset="img/icon-fonts.png 1x, img/icon-fonts-2x.png 2x" alt="Contoh laman yang menggunakan FontAwesome untuk ikon font.">
  <figcaption>
    <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/icon-font.html" target="_blank" class="external">
      Contoh laman yang menggunakan FontAwesome untuk ikon font.
    </a>
  </figcaption>
</figure>

Font ikon memang populer, dan mudah digunakan, namun memiliki beberapa kekurangan jika 
dibandingkan dengan ikon SVG:

* Mereka grafis vektor yang bisa secara tak terbatas diskalakan, namun 
  anti-alias mungkin menghasilkan ikon tidak setajam yang diharapkan.
* Penataan gaya terbatas dengan CSS.
* Pemosisian sempurna hingga tingkat piksel bisa sulit dilakukan, tergantung pada tinggi-baris, 
  pengaturan jarak huruf, dll.
* Font ikon bukan semantik, dan sulit digunakan dengan pembaca layar atau 
  teknologi bantu lainnya.
* Kecuali dengan benar tercakup, Font ikon bisa menghasilkan ukuran file yang besar hanya karena menggunakan 
  subset kecil dari ikon yang tersedia. 

<div style="clear:both;"></div>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/icon-font.html" region_tag="iconfont" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/icon-font.html){: target="_blank" .external }

Ada ratusan font ikon gratis dan berbayar yang tersedia termasuk [Font
Awesome](https://fortawesome.github.io/Font-Awesome/),
[Pictos](http://pictos.cc/){: .external }, dan [Glyphicons](https://glyphicons.com/).

Pastikan untuk menyeimbangkan bobot permintaan HTTP tambahan dan ukuran file dengan
kebutuhan ikon. Misalnya, jika Anda hanya membutuhkan beberapa ikon, mungkin
lebih baik untuk menggunakan gambar atau sprite gambar.


## Mengoptimalkan gambar untuk kinerja

Gambar sering menjadi sumber besarnya byte yang diunduh dan juga sering kali menempati
sejumlah besar ruang visual pada laman. Akibatnya, mengoptimalkan
gambar bisa menghasilkan beberapa penghematan byte terbesar dan meningkatkan
kinerja situs web Anda: semakin sedikit byte yang harus diunduh browser,
semakin sedikit persaingan untuk mendapatkan bandwidth klien dan semakin cepat
browser mengunduh dan menampilkan semua aset.


### TL;DR {: .hide-from-toc }
- Jangan hanya secara acak memilih format gambar&mdash;pahami format berbeda yang tersedia dan gunakan format yang paling cocok.
- Sertakan alat kompresi dan optimalisasi gambar ke dalam alur kerja Anda untuk mengurangi ukuran file.
- Kurangi jumlah permintaan http dengan menempatkan gambar yang sering digunakan ke dalam image sprites.
- Untuk mempercepat waktu muat laman awal dan mengurangi ukurannya, pertimbangkan memuat gambar hanya setelah mereka bergulir ke dalam tampilan.


### Memilih format yang tepat

Ada dua tipe gambar yang bisa dipertimbangkan: [gambar vektor](https://en.wikipedia.org/wiki/Vector_graphics)
dan [gambar bitmap](https://en.wikipedia.org/wiki/Raster_graphics).
Untuk gambar bitmap, Anda juga harus memilih format kompresi yang tepat,
misalnya: `GIF`, `PNG`, `JPG`.

**Gambar bitmap**, seperti foto dan gambar lainnya, direpresentasikan sebagai sebuah
grid dari titik atau piksel individual. Gambar bitmap biasanya diperoleh dari kamera atau
pemindai, atau bisa dibuat di browser dengan elemen `canvas`.  Saat
ukuran gambar semakin besar, begitu juga ukuran filenya.  Ketika diskalakan dengan ukuran lebih besar dari
aslinya, gambar bitmap menjadi buram karena browser harus menebak cara
mengisi piksel yang hilang.

**Gambar vektor**, seperti logo dan seni garis, didefinisikan oleh rangkaian kurva,
garis, bentuk dan warna isi. Gambar vektor dibuat dengan program seperti
Adobe Illustrator atau Inkscape dan disimpan ke format vektor seperti
[`SVG`](https://css-tricks.com/using-svg/).  Karena gambar vektor dibangun di atas konsep
primitif sederhana, gambar tersebut bisa diskalakan tanpa penurunan kualitas atau
perubahan ukuran file.

Ketika memilih format yang tepat, kita harus mempertimbangkan asal
gambar (bitmap atau vektor), dan materi (warna, animasi, teks, dll).
Tidak ada satu format yang bisa cocok untuk semua jenis gambar, dan masing-masing memiliki kelebihan dan
kekurangan tersendiri.

Mulailah dengan panduan ini ketika memilih format yang tepat:

* Gunakan `JPG` untuk gambar fotografis.
* Gunakan `SVG` untuk seni vektor dan grafis warna solid seperti logo dan seni garis.
  Jika seni vektor tidak tersedia, coba gunakan `WebP` atau `PNG`.
* Gunakan `PNG` daripada `GIF` karena memberikan warna yang lebih banyak dan menawarkan rasio kompresi
  lebih baik.
* Untuk animasi yang lebih panjang pertimbangkan untuk menggunakan `<video>`, yang memberikan kualitas
  gambar lebih baik dan memberikan pengguna kontrol saat pemutaran.

### Mengurangi ukuran file

Anda bisa memperkecil ukuran file gambar secara signifikan dengan melakukan "pascapemrosesan" gambar setelah
penyimpanan. Ada beberapa alat untuk kompresi gambar&mdash;lossy dan lossless,
online, GUI, baris perintah.  Jika memungkinkan, akan lebih baik mengotomatiskan optimalisasi
gambar sehingga itu mendapat prioritas utama dalam alur kerja Anda.

Ada beberapa alat yang bisa melakukan kompresi lossless lebih baik pada file `JPG`
dan `PNG`, tanpa memengaruhi kualitas gambar. Untuk `JPG`, cobalah
[jpegtran](http://jpegclub.org/){: .external } atau
[jpegoptim](http://freshmeat.net/projects/jpegoptim/){: .external } (hanya tersedia di Linux;
jalankan dengan --menghilangkan-semua opsi). Untuk `PNG`, cobalah
[OptiPNG](http://optipng.sourceforge.net/){: .external } atau
[PNGOUT](http://www.advsys.net/ken/util/pngout.htm).

### Gunakan image sprites

<img src="img/sprite-sheet.png" class="attempt-right" alt="Sprite sheet gambar yang digunakan dalam contoh">

CSS spriting adalah sebuah teknik dengan sejumlah gambar digabungkan dalam satu gambar
"sprite sheet". Anda kemudian bisa menggunakan setiap gambar tersebut dengan menetapkan
gambar latar untuk elemen (sprite sheet) ditambah offset untuk menampilkan
bagian yang benar.

<div style="clear:both;"></div>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/image-sprite.html" region_tag="sprite" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media//image-sprite.html){: target="_blank" .external }

Spriting memiliki keuntungan yaitu mengurangi jumlah unduhan yang diperlukan untuk mendapatkan
beberapa gambar, sambil tetap mengaktifkan caching.

### Pertimbangkan lazy loading

Lazy loading bisa secara signifikan mempercepat pemuatan pada laman panjang yang memasukkan banyak
gambar di paro bawah dengan memuatnya saat diperlukan atau ketika materi
utama selesai dimuat dan dirender.  Selain peningkatan
kinerja, menggunakan lazy loading bisa menciptakan pengalaman gulir tak terbatas.

Hati-hati saat membuat laman gulir tak terbatas&mdash;karena materi dimuat
ketika terlihat, mesin telusur mungkin tidak akan pernah melihat materi tersebut.  Selain itu,
pengguna yang mencari informasi yang mereka harapkan bisa dilihat di footer, 
tidak akan pernah melihat footer karena materi baru selalu dimuat.



## Jangan gunakan gambar sama sekali

Terkadang, gambar terbaik sama sekali bukanlah sebuah gambar. Bila memungkinkan,
gunakan kemampuan bawaan browser untuk menyediakan fungsionalitas yang sama atau
serupa.  Browser menghasilkan visual gambar yang
diperlukan sebelumnya.   Ini berarti bahwa browser tidak perlu lagi mengunduh
file gambar yang terpisah sehingga mencegah gambar diskalakan dengan canggung.  Anda bisa menggunakan unicode atau font ikon khusus untuk merender ikon.

### Tempatkan teks dalam markup bukannya disematkan pada gambar

Bila memungkinkan, teks harus berupa teks dan tidak disematkan ke dalam gambar. Misalnya,
menggunakan gambar sebagai judul atau menempatkan informasi kontak&mdash;seperti nomor
telepon atau alamat&mdash;secara langsung pada gambar untuk mencegah pengguna 
menyalin dan menempelkan informasi; hal ini membuat informasi tidak bisa diakses pembaca layar, dan
tidak responsif.  Sebagai gantinya, letakkan teks dalam markup Anda dan jika perlu gunakan
webfonts untuk memperoleh gaya yang Anda butuhkan.

### Gunakan CSS sebagai pengganti gambar

Browser modern bisa menggunakan fitur CSS untuk menciptakan gaya yang sebelumnya
memerlukan gambar.  Misalnya: gradien kompleks bisa dibuat dengan menggunakan properti
`background`, bayangan dapat dibuat dengan menggunakan `box-shadow`, dan sudut 
membulat bisa ditambahkan dengan properti `border-radius`.

<style>
  p#noImage {
    margin-top: 2em;
    padding: 1em;
    padding-bottom: 2em;
    color: white;
    border-radius: 5px;
    box-shadow: 5px 5px 4px 0 rgba(9,130,154,0.2);
    background: linear-gradient(rgba(9, 130, 154, 1), rgba(9, 130, 154, 0.5));
  }

  p#noImage code {
    color: rgb(64, 64, 64);
  }
</style>

<p id="noImage">
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit
amet augue eu magna scelerisque porta ut ut dolor. Nullam placerat egestas
nisl sed sollicitudin. Fusce placerat, ipsum ac vestibulum porta, purus
dolor mollis nunc, pharetra vehicula nulla nunc quis elit. Duis ornare
fringilla dui non vehicula. In hac habitasse platea dictumst. Donec
ipsum lectus, hendrerit malesuada sapien eget, venenatis tempus purus.
</p>


    <style>
      div#noImage {
        color: white;
        border-radius: 5px;
        box-shadow: 5px 5px 4px 0 rgba(9,130,154,0.2);
        background: linear-gradient(rgba(9, 130, 154, 1), rgba(9, 130, 154, 0.5));
      }
    </style>
    

Harap diingat bahwa menggunakan teknik ini tidak memerlukan siklus rendering, yang
bisa cukup signifikan pada perangkat seluler.  Jika digunakan berlebihan, Anda akan kehilangan manfaat yang mungkin telah
didapatkan dan mungkin menghambat kinerja.


{# wf_devsite_translation #}
