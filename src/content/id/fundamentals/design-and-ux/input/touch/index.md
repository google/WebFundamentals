project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Layar sentuh tersedia pada semakin banyak perangkat, dari ponsel hingga layar desktop. Aplikasi Anda harus merespons setiap sentuhan secara intuitif dan indah.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2014-01-01 #}

# Menambahkan Sentuhan Ke Situs Anda {: .page-title }

{% include "web/_shared/contributors/mattgaunt.html" %}

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="Rwc4fHUnGuU"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Layar sentuh tersedia pada semakin banyak perangkat, mulai dari ponsel hingga
layar desktop. Ketika pengguna memilih untuk berinteraksi dengan UI Anda, aplikasi
harus merespons setiap sentuhan secara intuitif.

<div class="clearfix"></div>

## Merespons status elemen

Apakah Anda pernah menyentuh atau mengeklik elemen pada laman web dan bertanya-tanya
apakah situs itu benar-benar mendeteksi tindakan tersebut?

Cukup ubah warna elemen saat pengguna menyentuh atau berinteraksi dengan bagian
UI untuk memberikan jaminan kembali bahwa situs Anda bekerja. Hal ini tidak hanya
mengurangi frustrasi, tapi juga bisa memberikan kesan cepat dan responsif.

Elemen DOM bisa mewarisi salah satu status berikut: default, focus, hover
dan active. Untuk mengubah UI masing-masing status, kita perlu menerapkan gaya
ke kelas pseudo berikut `:hover`, `:focus` dan `:active` seperti yang ditampilkan di bawah ini:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/states-example.html" region_tag="btnstates" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/touch/states-example.html){: target="_blank" .external }

![Gambar yang mengilustrasikan perbedaan warna untuk status
tombol](images/button-states.png)

Pada kebanyakan browser seluler, status *hover* dan/atau *focus* akan diterapkan ke elemen
setelah diketuk.

Pertimbangkan dengan hati-hati gaya yang Anda setel dan bagaimana mereka akan terlihat oleh pengguna setelah
menyelesaikan sentuhan mereka.

Note: Tag anchor dan tombol mungkin memiliki perilaku berbeda
di browser yang berbeda, jadi asumsikan dalam beberapa kasus **hover**
akan aktif dan di kejadian lainnya **focus** yang akan aktif.

### Meredam gaya browser default

Setelah Anda menambahkan gaya untuk status yang berbeda, Anda akan melihat bahwa kebanyakan browser
mengimplementasikan gaya mereka sendiri dalam merespons sentuhan pengguna. Hal ini terutama
karena saat pertama kali perangkat seluler diluncurkan, sejumlah situs tidak
memiliki penataan gaya untuk status `:active`. Akibatnya, banyak browser menambahkan
warna sorot atau gaya tambahan untuk memberikan masukan bagi pengguna.

Kebanyakan browser menggunakan properti CSS `outline` untuk menampilkan sebuah lingkaran di sekeliling
elemen saat elemen difokuskan. Anda bisa meredamnya dengan:

    .btn:focus {
      outline: 0;

      // Add replacement focus styling here (i.e. border)
    }

Safari dan Chrome menambahkan warna sorot ketuk yang bisa dicegah dengan properti CSS
`-webkit-tap-highlight-color`:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/states-example.html" region_tag="webkit-specific" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/touch/states-example.html){: target="_blank" .external }

Internet Explorer pada Windows Phone memiliki perilaku yang serupa, namun diredam
melalui tag meta:

    <meta name="msapplication-tap-highlight" content="no">

Firefox memiliki dua efek samping yang harus diatasi.

Kelas pseudo `-moz-focus-inner`, yang menambahkan outline pada
elemen bisa disentuh, dapat Anda buang dengan menyetel `border: 0`.

Jika Anda menggunakan elemen `<button>` pada Firefox, Anda mendapat penerapan
sebuah gradien, yang bisa Anda buang dengan menyetel `background-image: none`.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/states-example.html" region_tag="ff-specific" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/touch/states-example.html){: target="_blank" .external }

Perhatian: Hanya redam gaya default yang disebutkan di atas jika Anda memiliki kelas-kelas
pseudo untuk `:hover`, `:active` dan `:focus`!

### Menonaktifkan user-select

Ketika membuat UI, mungkin ada skenario di mana Anda menginginkan pengguna
agar berinteraksi dengan elemen namun ingin Anda redam perilaku defaultnya yaitu
memilih teks dengan tekan lama atau menyeret mouse di atas UI.

Anda bisa melakukannya dengan properti CSS `user-select`, tapi waspadalah bahwa
melakukan ini pada materi bisa **sangat** menyebalkan
pengguna jika mereka *ingin* memilih teks dalam elemen.
Jadi, pastikan Anda menggunakannya dengan hati-hati dan secukupnya.

    user-select: none;

## Mengimplementasikan isyarat khusus

Jika Anda memiliki gagasan untuk interaksi dan isyarat khusus untuk situs Anda, ada
dua hal yang harus diingat:

1. Cara mendukung semua browser.
1. Cara menjaga laju bingkai Anda tetap tinggi.

Pada artikel ini, kita akan melihat secara seksama topik mencakup API yang harus
kita dukung untuk masuk ke semua browser dan kemudian membahas bagaimana menggunakan kejadian ini
dengan efisien.

Bergantung pada isyarat yang ingin dilakukan, Anda mungkin berharap
pengguna berinteraksi dengan satu elemen pada satu waktu *atau* Anda berharap mereka
bisa berinteraksi dengan beberapa elemen secara bersamaan.

Perhatian: Jangan lupa bahwa beberapa pengguna menginginkan masukan keyboard dan pengguna
yang menjalankan teknologi bantu pada perangkat layar sentuh mungkin tidak mampu
melakukan isyarat karena mereka dicegat/dikonsumsi oleh teknologi
bantu.

Kita akan melihat dua contoh dalam artikel ini, keduanya menunjukkan
dukungan untuk semua browser dan cara menjaga agar laju bingkai tetap tinggi.

![Contoh GIF sentuh pada dokumen](images/touch-document-level.gif){: .attempt-right }

Contoh pertama memungkinkan pengguna untuk berinteraksi dengan satu elemen. Untuk kasus
ini Anda mungkin menginginkan semua kejadian sentuh diberikan kepada satu elemen, selama
isyarat itu awalnya dimulai pada elemen itu sendiri. Misalnya, memindahkan
jari dari elemen yang bisa-digesek, masih tetap bisa mengontrol elemen.

Hal ini berguna karena menyediakan banyak fleksibilitas bagi pengguna, tetapi
memberlakukan pembatasan tentang bagaimana pengguna bisa berinteraksi dengan UI Anda.

<div class="clearfix"></div>

![Contoh GIF sentuh pada elemen](images/touch-element-level.gif){: .attempt-right }

Namun, jika Anda berharap pengguna berinteraksi dengan beberapa elemen pada saat yang
bersamaan (menggunakan multi-touch), Anda harus membatasi sentuhan ke elemen
tertentu.

Ini lebih fleksibel bagi pengguna, namun mempersulit logika untuk memanipulasi
UI dan kurang tahan terhadap kesalahan pengguna.

<div class="clearfix"></div>

### Menambahkan event listener

Di Chrome (versi 55 dan yang lebih baru), Internet Explorer & Edge,
`PointerEvents` adalah pendekatan yang direkomendasikan untuk mengimplementasikan isyarat khusus.

Di browser lainnya `TouchEvents` dan `MouseEvents` adalah pendekatan yang tepat.

Fitur menarik dari `PointerEvents` adalah bahwa itu menggabungkan beberapa tipe masukan,
termasuk kejadian mouse, sentuh dan pena, menjadi satu rangkaian
callback. Kejadian yang didengarkan adalah `pointerdown`, `pointermove`,
`pointerup` dan `pointercancel`.

Persamaan dengan browser lainnya adalah `touchstart`, `touchmove`,
`touchend` dan `touchcancel` untuk kejadian sentuh dan bila Anda ingin mengimplementasikan
isyarat yang sama untuk masukan mouse, Anda harus mengimplementasikan `mousedown`,
`mousemove`, dan `mouseup`.

Jika Anda memiliki pertanyaan tentang kejadian apa yang sebaiknya digunakan, silakan lihat tabel ini
[Kejadian sentuh, mouse dan pointer](#touch-mouse-and-pointer-events)).

Menggunakan kejadian ini membutuhkan pemanggilan metode `addEventListener()` pada elemen
DOM, bersama dengan nama kejadian, fungsi callback dan boolean.
Boolean menentukan apakah Anda harus menangkap kejadian sebelum atau sesudah
elemen lain memiliki kesempatan untuk menangkap dan menginterpretasikan
kejadian. (`true` berarti Anda menginginkan kejadian sebelum elemen lainnya.)

Berikut adalah contoh dari mendengarkan untuk memulai interaksi.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-1.html" region_tag="addlisteners" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/touch/touch-demo-1.html){: target="_blank" .external }

Note: Karena desain dari API, PointerEvents hanya memerlukan kejadian
`pointerdown` tunggal untuk menangani kejadian mouse dan sentuh.

#### Menangani interaksi elemen-tunggal

Dalam cuplikan kode pendek di atas kita hanya menambahkan awal event listener
untuk kejadian mouse. Alasan untuk hal ini adalah karena kejadian mouse hanya akan dipicu
ketika kursor di arahkan *ke atas* elemen yang ditambahkan event listener.

TouchEvents akan melacak isyarat setelah dimulai tanpa menghiraukan dari mana
kejadian sentuh terjadi dan PointerEvents akan melacak kejadian tanpa menghiraukan dari mana kejadian sentuh
terjadi saat kita memanggil `setPointerCapture` pada elemen DOM.

Untuk gerakan mouse dan kejadian akhir, kita menambahkan event listener *di* metode
awal isyarat dan menambahkan listener ke dokumen, sehingga
bisa melacak kursor sampai isyarat selesai.

Langkah-langkah yang harus diimplementasikan adalah:

1. Tambahkan semua listener TouchEvent dan PointerEvent. Untuk MouseEvents tambahkan **hanya**
   kejadian awal.
1. Di dalam callback isyarat awal, ikat gerakan mouse dan kejadian akhir ke
   dokumen. Dengan cara ini semua kejadian mouse akan diterima terlepas dari apakah
   kejadian itu terjadi pada elemen asli atau tidak. Untuk PointerEvents kita
   perlu memanggil `setPointerCapture()` pada elemen asli untuk menerima
   semua kejadian lebih lanjut. Kemudian tangani awal isyarat tersebut.
1. Tangani kejadian gerak.
1. Pada kejadian akhir, buang gerakan mouse dan listener akhir dari dokumen
   dan mengakhiri isyarat itu.

Berikut adalah cuplikan metode `handleGestureStart()` kami yang menambahkan kejadian gerak
dan kejadian akhir ke dokumen:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-1.html" region_tag="handle-start-gesture" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/touch/touch-demo-1.html){: target="_blank" .external }

Callback akhir yang kita tambahkan adalah `handleGestureEnd()`, yang membuang event listener gerak
dan event listener akhir dari dokumen dan melepaskan tangkapan penunjuk
ketika isyarat telah selesai seperti:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-1.html" region_tag="handle-end-gesture" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/touch/touch-demo-1.html){: target="_blank" .external }

<div class="attempt-left">
  <p>Dengan mengikuti pola menambahkan kejadian gerak ke dokumen ini, jika
  pengguna mulai berinteraksi dengan elemen dan menggerakkan isyarat mereka di luar dari
  elemen, kita akan terus mendapatkan gerakan mouse terlepas dari posisi mereka
  di laman, karena kejadian sedang diterima dari dokumen.</p>

  <p>Diagram ini menunjukkan apa yang dilakukan kejadian sentuh saat kita menambahkan kejadian
  gerak dan kejadian akhir ke dokumen setelah isyarat dimulai.</p>
</div>

![Mengilustrasikan kejadian sentuh mengikat ke dokumen pada
`touchstart`](images/scroll-bottleneck.gif)

<div class="clearfix"></div>

### Merespons sentuhan dengan efisien

Sekarang setelah kita membereskan kejadian awal dan akhir, kita bisa dengan benar
merespons kejadian sentuh.

Untuk setiap kejadian awal dan gerak, Anda bisa dengan mudah mengekstrak `x` dan `y`
dari sebuah kejadian.

Contoh berikut memeriksa apakah sebuah kejadian berasal dari `TouchEvent` dengan
memeriksa jika terdapat `targetTouches`. Jika memang begitu, maka itu mengekstrak
`clientX` dan `clientY` dari sentuhan pertama.
Jika kejadiannya adalah `PointerEvent` atau `MouseEvent`, itu mengekstrak `clientX` dan
`clientY` langsung dari kejadian itu sendiri.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-2.html" region_tag="extract-xy" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/touch/touch-demo-2.html){: target="_blank" .external }

Sebuah `TouchEvent` memiliki tiga daftar yang berisi data sentuh:

* `touches`: daftar semua sentuhan saat ini di layar, terlepas dari
elemen DOM tempat mereka berada.
* `targetTouches`: daftar sentuhan kejadian
terikat pada elemen DOM saat ini.
* `changedTouches`: daftar sentuhan yang berubah sehingga menyebabkan kejadian
diaktifkan.

Umumnya, `targetTouches` memberikan semua yang Anda butuhkan dan inginkan. (Untuk
informasi selengkapnya tentang daftar ini, silakan lihat [Daftar sentuhan](#touch-lists)).

#### Menggunakan requestAnimationFrame

Karena callback kejadian diaktifkan pada thread utama, kita ingin menjalankan sesedikit
mungkin kode dalam callback untuk kejadian kita, menjaga laju
bingkai tetap tinggi dan mencegah sampah.

Dengan menggunakan `requestAnimationFrame()` kita memiliki kesempatan untuk memperbarui UI sesaat
sebelum browser bermaksud menggambar bingkai dan akan memudahkan kita memindahkan beberapa
pekerjaan dari callback kejadian.

Jika Anda belum familier dengan `requestAnimationFrame()`, Anda
bisa [mempelajari selengkapnya di sini](/web/fundamentals/performance/rendering/optimize-javascript-execution#use-requestanimationframe-for-visual-changes).

Implementasi khusus adalah dengan menyimpan koordinat `x` dan `y` dari kejadian
awal dan kejadian gerak serta meminta bingkai animasi di dalam callback
kejadian gerak.

Dalam demo, kami menyimpan posisi sentuh awal di `handleGestureStart()` (carilah `initialTouchPos`):

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-1.html" region_tag="handle-start-gesture" adjust_indentation="auto" %}
</pre>

Metode `handleGestureMove()` menyimpan posisi kejadiannya
sebelum meminta bingkai animasi bila kita membutuhkannya, meneruskan fungsi
`onAnimFrame()` sebagai callback:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-1.html" region_tag="handle-move" adjust_indentation="auto" %}
</pre>

Nilai `onAnimFrame` adalah sebuah fungsi yang bila dipanggil, akan mengubah UI
untuk bergerak. Dengan meneruskan fungsi ini ke `requestAnimationFrame()`, kita
memberitahu browser untuk memanggilnya sesaat sebelum itu memperbarui laman
(yaitu, menggambarkan setiap perubahan ke laman).

Di callback `handleGestureMove()` kami awalnya memeriksa apakah `rafPending` bernilai false,
yang menunjukkan jika `onAnimFrame()` telah dipanggil oleh `requestAnimationFrame()`
sejak kejadian gerak terakhir. Ini berarti kita hanya memiliki satu `requestAnimationFrame()`
yang menunggu dijalankan pada satu waktu.

Ketika callback `onAnimFrame()` dijalankan, kita menyetel transformasi pada setiap
elemen yang ingin dipindah sebelum memperbarui `rafPending` ke `false`, memungkinkan
kejadian sentuh berikutnya untuk meminta bingkai animasi baru.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-1.html" region_tag="on-anim-frame" adjust_indentation="auto" %}
</pre>

### Mengontrol isyarat menggunakan tindakan sentuh

Properti CSS `touch-action` memungkinkan Anda untuk mengontrol perilaku
sentuh default dari elemen. Dalam contoh, kami menggunakan `touch-action: none` untuk
mencegah browser melakukan sesuatu dengan sentuhan pengguna, yang memungkinkan kita
untuk mencegat semua kejadian sentuh.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-1.html" region_tag="touch-action-example" adjust_indentation="auto" %}
</pre>

Menggunakan `touch-action: none` bisa dikatakan opsi ekstrem karena mencegah semua
perilaku browser default. Umumnya, salah satu opsi
di bawah ini merupakan solusi yang lebih baik.

`touch-action` memungkinkan Anda untuk menonaktifkan isyarat yang diimplementasikan oleh browser.
Misalnya, IE10+ mendukung isyarat ketuk dua kali untuk zoom. Dengan menyetel
touch-action `manipulation` Anda mencegah perilaku
ketuk dua kali default.

Hal ini memungkinkan Anda untuk mengimplementasikan isyarat ketuk dua kali Anda sendiri.

Di bawah ini adalah daftar nilai touch-action yang biasa digunakan:

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Parameter Aksi Sentuh</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Property"><code>touch-action: none</code></td>
      <td data-th="Description">Tidak ada interaksi sentuh yang akan ditangani oleh
      browser.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>touch-action: pinch-zoom</code></td>
      <td data-th="Description">Menonaktifkan semua interaksi browser seperti
      `touch-action: none` selain dari `pinch-zoom`, yang masih ditangani oleh
      browser.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>touch-action: pan-y pinch-zoom</code></td>
      <td data-th="Description">Menangani gulir horizontal dalam JavaScript tanpa
      menonaktifkan gulir vertikal atau cubit-untuk-zoom (mis. korsel gambar).</td>
    </tr>
    <tr>
      <td data-th="Property"><code>touch-action: manipulation</code></td>
      <td data-th="Description">Menonaktifkan isyarat ketuk dua kali untuk menghindari
      penundaan klik oleh browser. Membiarkan gulir dan cubit-untuk-zoom ditentukan
      browser.</td>
    </tr>
  </tbody>
</table>

## Mendukung IE versi lama

Jika Anda ingin mendukung IE10, Anda harus menangani versi awalan vendor dari
`PointerEvents`.


Untuk memeriksa dukungan `PointerEvents` biasanya Anda mencari
`window.PointerEvent`, namun dalam IE10, Anda akan mencari
`window.navigator.msPointerEnabled`.

Nama kejadian dengan awalan vendor adalah: 'MSPointerDown', 'MSPointerUp' and
'MSPointerMove'.

Contoh di bawah ini menunjukkan kepada Anda cara memeriksa dukungan dan mengganti
nama kejadian.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-1.html" region_tag="pointereventsupport" adjust_indentation="auto" %}
</pre>

Untuk informasi selengkapnya, periksa [pembaruan artikel dari
Microsoft](https://msdn.microsoft.com/en-us/library/dn304886(v=vs.85).aspx).

## Referensi

### Kelas pseudo untuk status sentuh

<table>
  <thead>
    <tr>
      <th>Kelas</th>
      <th>Contoh</th>
      <th>Keterangan</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Class">:hover</td>
      <td data-th="Example"><img alt="Tombol dengan Status Ditekan" src="images/btn-hover-state.png"></td>
      <td data-th="Description">
        Dimasukkan ketika kursor ditempatkan ke atas sebuah elemen.
        Perubahan UI pada saat kursor di arahkan ke atas elemen mendorong pengguna untuk berinteraksi dengan
        elemen.
      </td>
    </tr>
    <tr>
      <td data-th="Class">:focus</td>
      <td data-th="Example">
        <img alt="Tombol dengan Status Focus" src="images/btn-focus-state.png">
      </td>
      <td data-th="Description">
        Dimasukkan saat pengguna mengaktifkan tab melalui elemen pada laman. Status focus
        memungkinkan pengguna untuk mengetahui elemen yang sedang berinteraksi
        dengan mereka; juga memungkinkan pengguna untuk menavigasi UI dengan mudah menggunakan keyboard.
      </td>
    </tr>
    <tr>
      <td data-th="Class">:active</td>
      <td data-th="Example">
        <img alt="Tombol dengan Status Ditekan" src="images/btn-pressed-state.png">
      </td>
      <td data-th="Description">
        Dimasukkan saat elemen sedang dipilih,
        misalnya, ketika pengguna mengeklik atau menyentuh elemen.
      </td>
    </tr>
  </tbody>
</table>


Referensi kejadian sentuh definitif bisa dilihat disini:
[Kejadian Sentuh w3](http://www.w3.org/TR/touch-events/).

### Kejadian sentuh, mouse, dan pointer

Kejadian ini adalah blok pembangun untuk menambahkan isyarat baru ke dalam aplikasi
Anda:

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Kejadian Sentuh, Mouse, dan Pointer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Event Names">
        <code>touchstart</code>,
        <code>mousedown</code>,
        <code>pointerdown</code>
      </td>
      <td data-th="Description">
        Ini dipanggil ketika jari pertama menyentuh elemen atau ketika
        pengguna mengeklik mouse.
      </td>
    </tr>
    <tr>
      <td data-th="Event Names">
        <code>touchmove</code>,
        <code>mousemove</code>,
        <code>pointermove</code>
      </td>
      <td data-th="Description">
        Ini dipanggil ketika pengguna menggerakkan jari mereka di layar atau
        menyeret dengan mouse.
      </td>
    </tr>
    <tr>
      <td data-th="Event Names">
        <code>touchend</code>,
        <code>mouseup</code>,
        <code>pointerup</code>
      </td>
      <td data-th="Description">
        Ini dipanggil ketika pengguna mengangkat jari mereka dari layar
        atau melepaskan mouse.
      </td>
    </tr>
    <tr>
      <td data-th="Event Names">
        <code>touchcancel</code>
        <code>pointercancel</code>
      </td>
      <td data-th="Description">
        Ini dipanggil ketika browser membatalkan isyarat sentuh. Misalnya,
        pengguna menyentuh aplikasi web dan kemudian berpindah tab.
      </td>
    </tr>
  </tbody>
</table>

### Daftar sentuh

Setiap kejadian sentuh berisi tiga atribut daftar:

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Atribut Kejadian Sentuh</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Attribute"><code>touches</code></td>
      <td data-th="Description">
        Daftar semua sentuhan saat ini di layar, terlepas dari elemen
        yang disentuh.
      </td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>targetTouches</code></td>
      <td data-th="Description">
        Daftar sentuhan yang dimulai pada elemen yang merupakan target dari
        kejadian saat ini. Misalnya, jika Anda terikat ke <code>&lt;button&gt;</code>,
        Anda hanya akan mendapatkan sentuhan saat ini di tombol tersebut. Jika terikat ke
        dokumen, Anda akan mendapatkan semua sentuhan saat ini pada dokumen.
      </td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>changedTouches</code></td>
      <td data-th="Description">
        Daftar sentuhan yang berubah sehingga menyebabkan kejadian diaktifkan.
        <ul>
          <li>
            Untuk <code>
            <a href="http://www.w3.org/TR/touch-events/#dfn-touchstart">
            kejadian touchstart</a></code>
            -- daftar titik sentuh yang menjadi aktif dengan
            kejadian saat ini.
          </li>
          <li>
            Untuk <code>
            <a href="http://www.w3.org/TR/touch-events/#dfn-touchmove">
            kejadian touchmove</a></code>
            -- daftar titik sentuh yang telah berpindah sejak kejadian
            terakhir.
          </li>
          <li>
            Untuk <code>
            <a href="http://www.w3.org/TR/touch-events/#dfn-touchend">
            kejadian touchend</a></code>
            dan <code>
            <a href="http://www.w3.org/TR/touch-events/#dfn-touchcancel">
            touchcancel</a></code>
            -- daftar titik sentuh yang baru saja dibuang
            dari permukaan.
          </li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

### Mengaktifkan dukungan status aktif pada iOS

Sayangnya, Safari di iOS tidak menerapkan status *active* secara default, untuk
membuatnya bekerja Anda perlu menambahkan event listener `touchstart` ke *body
dokumen* atau ke setiap elemen.

Anda harus melakukannya di belakang pengujian agen-pengguna sehingga itu hanya berjalan pada perangkat iOS.

Menambahkan touch start ke body memiliki keuntungan karena mengaplikasikan ke semua elemen
dalam DOM, namun ini mungkin menyebabkan masalah kinerja ketika menggulir laman.


    window.onload = function() {
      if(/iP(hone|ad)/.test(window.navigator.userAgent)) {
        document.body.addEventListener('touchstart', function() {}, false);
      }
    };


Alternatif-nya adalah dengan menambahkan listener touch start ke semua elemen
bisa-berinteraksi di laman, mengurangi beberapa masalah kinerja.


    window.onload = function() {
      if(/iP(hone|ad)/.test(window.navigator.userAgent)) {
        var elements = document.querySelectorAll('button');
        var emptyFunction = function() {};
        for(var i = 0; i < elements.length; i++) {
          elements[i].addEventListener('touchstart', emptyFunction, false);
        }
      }
    };


{# wf_devsite_translation #}
