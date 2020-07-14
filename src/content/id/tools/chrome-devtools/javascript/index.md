project_path: /web/tools/chrome-devtools/_project.yaml
book_path: /web/tools/chrome-devtools/_book.yaml
description: Pelajari cara menggunakan Chrome DevTools untuk menemukan dan memperbaiki bug JavaScript.

{# wf_blink_components: Platform>DevTools #}
{# wf_updated_on: 2020-07-10 #}
{# wf_published_on: 2017-01-04 #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# Mulailah dengan Men-debug JavaScript di Chrome DevTools {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Tutorial ini mengajarkan Anda alur kerja dasar untuk men-debug masalah JavaScript di DevTools.
Baca terus, atau tonton video dari tutorial ini, di bawah ini.

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="H0XScE08hy8"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>


## Langkah 1: Ulangi kemunculan bug {: #reproduce }

Menemukan serangkaian tindakan yang secara konsisten mengulangi kemunculan selalu menjadi langkah pertama
untuk proses debug.

1. Klik **Open Demo**. Demo akan dibuka di tab baru.

     <a href="https://googlechrome.github.io/devtools-samples/debug-js/get-started"
       target="devtools"
       rel="noopener noreferrer">
       <button>Buka Demo</button>
     </a>

1. Masukkan `5` di kotak teks **Nomor 1**.
1. Masukkan `1` di kotak teks **Nomor 2**.
1. Klik **Add Number 1 and Number 2**. Label di bawah tombol bertuliskan `5 + 1 = 51`. Hasil
   seharusnya `6`. Inilah bug yang akan Anda perbaiki.

     <figure>
       <img src="imgs/bug.png"
         alt="Hasil 5 + 1 adalah 51. Seharusnya 6."/>
       <figcaption>
         <b>Gambar 1</b>. Hasil 5 + 1 adalah 51. Seharusnya 6.
       </figcaption>
     </figure>

## Langkah 2: Pahami UI panel Sumber {: #sources-ui }

DevTools menyediakan banyak fitur berbeda untuk tugas yang berbeda, misalnya mengubah CSS, membuat profil
performa pemuatan halaman, dan memantau permintaan jaringan. Panel **Sources** adalah tempat Anda melakukan debug
JavaScript.

1. Buka DevTools dengan menekan <kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>I</kbd> (Mac)
   atau <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd> (Windows, Linux). Pintasan ini membuka
   panel **Console**.

     <figure>
       <img src="imgs/console.png" alt="Panel Konsol."/>
       <figcaption>
         <b>Gambar 2</b>. Panel <b>Konsol</b> 
       </figcaption>
     </figure>

1. Klik tab **Sources**.

     <figure>
       <img src="imgs/sources.png" alt="Panel Sumber."/>
       <figcaption>
         <b>Gambar 3</b>. Panel <b>Sumber</b> 
       </figcaption>
     </figure>

UI panel **Sources** memiliki 3 bagian:

<figure>
  <img src="imgs/sources-annotated.png" alt="Tiga bagian UI panel Sumber."/>
  <figcaption>
    <b>Gambar 4</b>. Tiga bagian UI panel <b>Sumber</b> 
  </figcaption>
</figure>

1. Panel **File Navigator**. Setiap file yang diminta oleh halaman tercantum di sini.
2. Panel **Code Editor**. Setelah memilih file di panel **File Navigator**, konten
   file tersebut ditampilkan di sini.
3. Panel **JavaScript Debugging**. Beragam fitur untuk memeriksa JavaScript halaman. Jika
   jendela DevTools lebar, panel ini ditampilkan di sebelah kanan panel **Code Editor**.

## Langkah 3: Jeda kode dengan breakpoint {: #event-breakpoint }

Metode umum untuk melakukan debug pada masalah seperti ini adalah menyisipkan banyak pernyataan `console.log()`
ke dalam kode, untuk memeriksa nilai saat skrip dieksekusi. Misalnya:

<pre class="prettyprint">function updateLabel() {
  var addend1 = getNumber1();
  <strong>console.log('addend1:', addend1);</strong>
  var addend2 = getNumber2();
  <strong>console.log('addend2:', addend2);</strong>
  var sum = addend1 + addend2;
  <strong>console.log('sum:', sum);</strong>
  label.textContent = addend1 + ' + ' + addend2 + ' = ' + sum;
}</pre>

Metode `console.log()` mungkin dapat menyelesaikan tugas tersebut, namun **breakpoint** dapat menyelesaikannya lebih cepat.
Breakpoint memungkinkan Anda menjeda kode di tengah eksekusi, dan memeriksa nilai
pada saat itu. Breakpoint memiliki beberapa keunggulan dibanding metode `console.log()`:

* Dengan `console.log()`, Anda perlu membuka kode sumber secara manual, menemukan kode yang relevan,
  menyisipkan pernyataan `console.log()`, lalu memuat ulang halaman untuk melihat pesan
  di Konsol. Dengan breakpoint, Anda dapat menjeda kode yang relevan tanpa perlu mengetahui cara
  kode terstruktur.
* Pada pernyataan `console.log()` Anda perlu secara eksplisit menentukan tiap nilai yang ingin Anda
  periksa. Dengan breakpoint, DevTools menunjukkan nilai semua variable pada
  saat itu. Kadang ada variabel yang memengaruhi kode bahkan tanpa Anda sadari.

Singkatnya, breakpoint dapat membantu Anda menemukan dan memperbaiki bug lebih cepat daripada metode `console.log()`.

Jika Anda mengingat-ingat kembali cara kerja aplikasi, Anda dapat menebak
bahwa jumlah yang tidak tepat (`5 + 1 = 51`) dihitung di event listener `click` yang
terkait dengan tombol **Tambahkan Nomor 1 dan Nomor 2**. Oleh karena itu, Anda dapat menjeda
kode di sekitar waktu listener `click` dieksekusi. **Breakpoint Event Listener**
memungkinkan Anda melakukan secara persis tindakan tersebut:

1. Di panel **JavaScript Debugging**, klik **Event Listener Breakpoints** untuk meluaskan bagian
. DevTools menampilkan daftar kategori peristiwa yang dapat diluaskan, misalnya **Animasi** dan
   **Papan Klip**.
1. Di samping kategori peristiwa **Mouse**, klik **Expand** ![ikon Luaskan
](/web/tools/chrome-devtools/images/expand.png){: .devtools-inline}.
   DevTools menampilkan daftar peristiwa mouse, seperti **click** dan **mousedown**. Tiap peristiwa memiliki
   kotak centang di sampingnya.
1. Centang kotak **click**. DevTools sekarang disiapkan untuk dijeda otomatis jika *salah satu*
   event listener `click` dieksekusi.


     <figure>
       <img src="imgs/get-started-click-breakpoint.png"
         alt="Kotak centang klik diaktifkan."/>
       <figcaption>
         <b>Gambar 5</b>. Kotak centang <b>klik</b> diaktifkan
       </figcaption>
     </figure>

   
1. Kembali pada demo, klik **Add Number 1 and Number 2** lagi. DevTools
   menjeda demo dan menandai baris kode di panel **Sources**.
   DevTools harus dijeda pada baris kode ini:

     <pre class="prettyprint">function onClick() {</pre>

     Jika Anda dijeda pada baris kode yang berbeda, tekan **Lanjutkan Eksekusi Skrip** ![Lanjutkan
     Eksekusi Skrip][resume]{:.cdt-inl} hingga Anda dijeda pada baris yang tepat.

     <aside class="note">
       **Catatan**: Jika dijeda pada baris yang berbeda, Anda memiliki ekstensi browser yang
       mendaftarkan event listener `click` di setiap halaman yang Anda buka. Anda dijeda di
       listener `click` ekstensi. Jika menggunakan Mode Penyamaran untuk [mengakses secara
       pribadi][incognito], yang menonaktifkan semua ekstensi, Anda dapat melihat bahwa Anda dijeda pada
       baris kode yang tepat setiap waktu.
     </aside>

[incognito]: https://support.google.com/chrome/answer/95464

**Breakpoint Event Listener** hanyalah salah satu dari banyak jenis breakpoint yang tersedia di DevTools.
Semua jenis yang berbeda tersebut layak untuk diingat, karena tiap jenis pada akhirnya membantu Anda melakukan debug pada
skenario yang berbeda secepatnya. Lihat [Menjeda Kode Dengan Breakpoint][breakpoints]
untuk mempelajari kapan dan cara menggunakan tiap jenis.

[resume]: /web/tools/chrome-devtools/images/resume-script-execution.png
[breakpoints]: /web/tools/chrome-devtools/javascript/breakpoints

## Langkah 4: Menyusuri kode {: #code-stepping }

Satu penyebab umum bug adalah jika skrip dieksekusi dalam
urutan yang salah. Penyusuran kode memungkinkan Anda mengikuti proses
eksekusi kode, baris demi baris, dan mengetahui secara persis jika
baris dieksekusi dalam urutan yang berbeda dengan yang Anda harapkan. Coba sekarang:

1. Di panel **Sources** pada DevTools, klik pengaktifan **Step into next function
   call** ![Pengaktifan Melangkah ke fungsi berikutnya][into]{:.devtools-inline} untuk menyusuri
   eksekusi fungsi `onClick()`, baris demi baris.
   DevTools menandai baris kode berikut:

     <pre class="prettyprint">if (inputsAreEmpty()) {</pre>

1. Klik **Step over next function call** ![Pengaktifkan Melangkah ke fungsi berikutnya
   ][over]{:.devtools-inline}. DevTools mengeksekusi `inputsAreEmpty()`
   tanpa melangkah ke dalamnya. Perhatikan cara DevTools melewati beberapa baris kode.
   Karena `inputsAreEmpty()` dievaluasi sebagai false, maka blok kode pernyataan `if`
   tidak dieksekusi.

Itulah gambaran umum mengenai penyusuran kode. Jika mengamati kode dalam
`get-started.js`, Anda dapat melihat bahwa bug tersebut mungkin ada di suatu tempat di fungsi
`updateLabel()`. Daripada menyusuri setiap baris kode,
Anda dapat menggunakan jenis lain breakpoint untuk menjeda kode yang lebih dekat dengan
kemungkinan lokasi bug.

[into]: /web/tools/chrome-devtools/images/step-into.png
[over]: /web/tools/chrome-devtools/images/step-over.png

## Langkah 5: Setel breakpoint baris kode {: #line-breakpoint }

Breakpoint baris kode adalah tipe breakpoint yang paling umum. Jika
Anda ingin menjeda di baris kode tertentu, gunakan
breakpoint baris kode.

1. Lihat baris terakhir kode di `updateLabel()`:

     <pre class="prettyprint">label.textContent = addend1 + ' + ' + addend2 + ' = ' + sum;</pre>

1. Di sebelah kiri kode Anda dapat melihat nomor baris dari
   baris kode tertentu ini, yaitu **32**. Klik **32**. DevTools menempatkan ikon biru di atas
   **32**. Ini berarti ada breakpoint baris kode pada baris ini.
   DevTools sekarang selalu dijeda sebelum baris kode ini dieksekusi.
1. Klik **Resume script execution** ![Lanjutkan eksekusi
   skrip][resume]{:.devtools-inline}. Skrip terus dieksekusi
   hingga mencapai baris 32. Pada baris 29, 30, dan 31, DevTools mencetak nilai
   `addend1`, `addend2`, dan `sum` ke sebelah kanan titik koma tiap baris.

     <figure>
       <img src="imgs/line-of-code-breakpoint.png"
         alt="DevTools dijeda pada breakpoint baris kode pada baris 32."/>
       <figcaption>
         <b>Gambar 6</b>. DevTools dijeda pada breakpoint baris kode pada baris 32
       </figcaption>
     </figure>

## Langkah 6: Periksa nilai variabel {: #check-values }

Nilai `addend1`, `addend2`, dan `sum` terlihat mencurigakan. Nilai tersebut diberi tanda kutip, yang
berarti string. Ini adalah hipotesis yang baik untuk menjelaskan penyebab bug.
Sekarang saatnya untuk mengumpulkan informasi selengkapnya. DevTools menyediakan banyak fitur untuk memeriksa nilai
variabel.

### Metode 1: Panel Cakupan {: #scope }

Jika Anda dijeda pada baris kode, panel **Cakupan** menampilkan variabel lokal dan global
yang saat ini ditentukan, beserta nilai tiap variabel. Panel ini juga menampilkan variabel penutupan,
jika berlaku. Klik dua kali nilai variabel untuk mengeditnya. Jika Anda tidak dijeda pada baris
kode, panel **Cakupan** kosong.

<figure>
  <img src="imgs/scope-pane.png"
    alt="Panel Cakupan."/>
  <figcaption>
    <b>Gambar 7</b>. Panel <b>Cakupan</b>
  </figcaption>
</figure>

### Metode 2: Watch Expressions {: #watch-expressions }

Tab **Watch Expressions** memungkinkan Anda memantau nilai variabel dari waktu ke waktu.
Seperti tersirat dalam namanya, Watch Expressions tidak hanya dibatasi ke variabel. Anda dapat
menyimpan ekspresi JavaScript yang valid di tab Pantau Ekspresi. Coba sekarang:

1. Klik tab **Watch**.
1. Klik **Add Expression** ![Tambahkan Ekspresi][add]{:.devtools-inline}.
1. Ketik `typeof sum`.
1. Tekan <kbd>Enter</kbd>. DevTools menampilkan `typeof sum: "string"`. Nilai
   di sebelah kanan tanda titik dua adalah hasil Pantau Ekspresi.

     <figure>
       <img src="imgs/get-started-watch-expression.png"
         alt="Panel Pantau Ekspresi."/>
       <figcaption>
         <b>Gambar 8</b>. Panel Pantau Ekspresi (kanan bawah), setelah
         membuat <code>typeof sum</code> Pantau Ekspresi.
         Jika jendela DevTools besar, panel Pantau Ekspresi berada di
         kanan, di atas panel <b>Breakpoint Event Listener</b>.
       </figcaption>
     </figure>

Seperti diduga, `sum` dievaluasi sebagai string, padahal seharusnya sebagai
angka. Anda sekarang telah mengonfirmasi bahwa inilah penyebab bug tersebut.

### Metode 3: Konsol {: #console }

Selain melihat pesan `console.log()`, Anda juga dapat menggunakan Konsol untuk mengevaluasi
pernyataan JavaScript arbitrer. Dalam hal proses debug, Anda dapat menggunakan Konsol untuk menguji
potensi perbaikan bug. Coba sekarang:

1. Jika panel samping Konsol tidak terbuka, tekan <kbd>Escape</kbd> untuk membukanya
   . Akan terbuka di bagian bawah jendela DevTools.
1. Di Konsol, ketik `parseInt(addend1) + parseInt(addend2)`. Pernyataan ini berfungsi karena Anda
   dijeda pada baris kode dengan `addend1` dan `addend2` dalam cakupan.
1. Tekan <kbd>Enter</kbd>. DevTools akan mengevaluasi pernyataan dan mencetak
   `6`, yang merupakan hasil yang diharapkan dari demo tersebut.

     <figure>
       <img src="imgs/get-started-console.png"
         alt="Panel samping Konsol, setelah mengevaluasi parseInt(addend1) + parseInt(addend2)."/>
       <figcaption>
         <b>Gambar 9</b>. Panel samping Konsol, setelah mengevaluasi
        <code>parseInt(addend1) + parseInt(addend2)</code>.
       </figcaption>
     </figure>

[add]: /web/tools/chrome-devtools/javascript/imgs/add-expression.png

## Langkah 7: Terapkan perbaikan {: #apply-fix }

Anda telah menemukan perbaikan bug. Sekarang tinggal mencoba
perbaikan dengan mengedit kode dan menjalankan ulang demo tersebut. Anda tidak
perlu keluar dari DevTools untuk menerapkan perbaikan. Anda dapat mengedit kode JavaScript secara langsung
dalam DevTools UI. Coba sekarang:

1. Klik **Resume script execution** ![Lanjutkan eksekusi
   skrip][resume]{:.devtools-inline}.
1. Pada **Code Editor**, ganti baris 31, `var sum = addend1 + addend2`, dengan
   `var sum = parseInt(addend1) + parseInt(addend2)`.
1. Tekan <kbd>Command</kbd>+<kbd>S</kbd> (Mac) atau
   <kbd>Control</kbd>+<kbd>S</kbd> (Windows, Linux) untuk menyimpan perubahan.
1. Klik **Deactivate breakpoints** ![Nonaktifkan
   breakpoint][deactivate]{:.devtools-inline}. Akan berubah menjadi warna biru untuk menandakan
   sudah aktif. Meski ini disetel, DevTools mengabaikan breakpoint
   yang telah Anda setel.
1. Coba demo dengan nilai yang berbeda. Demo sekarang menghitung dengan benar.

Perhatian: Alur kerja ini hanya berlaku untuk perbaikan kode yang sedang berjalan di browser.
Alur kerja ini tidak akan memperbaiki kode untuk semua pengguna yang membuka halaman. Untuk melakukannya, Anda perlu memperbaiki
kode yang ada di server.

[deactivate]: /web/tools/chrome-devtools/images/deactivate-breakpoints-button.png

## Langkah berikutnya {: #next-steps }

Selamat! Anda sekarang tahu cara mengoptimalkan Chrome DevTools saat melakukan debug
JavaScript. Fitur dan metode yang Anda pelajari di tutorial ini dapat menghemat banyak waktu.

Tutorial ini hanya menunjukkan dua cara untuk menyetel breakpoint. DevTools menawarkan banyak
cara lainnya, antara lain:

* Breakpoint kondisional yang hanya dipicu jika kondisi yang Anda
  sediakan adalah true.
* Breakpoint pada pengecualian yang terekam atau tidak terekam.
* Breakpoint XHR yang dipicu jika URL yang diminta cocok dengan
  substring yang Anda sediakan.

Lihat [Menjeda Kode Dengan Breakpoint](/web/tools/chrome-devtools/javascript/breakpoints) 
untuk mempelajari kapan dan cara menggunakan tiap jenis.

Ada beberapa kontrol penyusuran kode yang belum dijelaskan dalam tutorial ini. Lihat [Menyusuri
baris kode](/web/tools/chrome-devtools/javascript/reference#stepping) untuk mempelajari lebih lanjut.

## Masukan {: #feedback }

{% include "web/_shared/helpful.html" %}
