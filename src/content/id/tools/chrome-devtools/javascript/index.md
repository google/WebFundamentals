project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Mulailah men-debug JavaScript dengan menggunakan Chrome DevTools dalam tutorial interaktif ini.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2017-01-04 #}

<style>
.devtools-inline {
  max-height: 1em;
  vertical-align: middle;
}
</style>

<!-- TODO
     make demo responsive
-->

# Memulai dengan Men-debug JavaScript di Chrome DevTools {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Tutorial interaktif langkah-demi-langkah ini mengajari Anda
alur kerja dasar untuk men-debug JavaScript di Chrome DevTools. Tutorial ini menampilkan
cara men-debug satu masalah spesifik, namun alur kerja umum yang Anda pelajari berguna
untuk men-debug semua tipe bug JavaScript.

Jika Anda menggunakan `console.log()` untuk menemukan dan memperbaiki bug dalam kode, pertimbangkan
penggunaan alur kerja yang diuraikan dalam tutorial ini sebagai gantinya. Ini sering kali jauh lebih cepat
dan lebih efektif.

## Langkah 1: Ulangi kemunculan bug {: #step-1 }

Mengulangi kemunculan bug selalu menjadi langkah pertama untuk men-debug.
Untuk "mengulangi kemunculan bug" berarti menemukan serangkaian tindakan yang secara konsisten
menyebabkan munculnya bug. Anda mungkin perlu mengulangi kemunculan bug beberapa kali,
jadi cobalah menghilangkan langkah-langkah yang tidak penting.

Ikuti petunjuk di bawah ini untuk mengulangi kemunculan bug yang akan Anda
perbaiki dalam tutorial ini.

1. Klik **Open Demo**. Demo akan dibuka di tab baru.

     <a href="https://googlechrome.github.io/devtools-samples/debug-js/get-started"
       target="devtools"
       rel="noopener noreferrer">
       <button>Open Demo</button>
     </a>

1. Pada demo, masukkan `5` untuk **Number 1**.
1. Masukkan `1` untuk **Number 2**.
1. Klik **Add Number 1 and Number 2**.
1. Lihat label di bawah masukan dan tombol. Tertulis `5 + 1 = 51`.

Ups. Hasilnya salah. Hasil seharusnya `6`. Inilah bug yang
akan Anda perbaiki.

## Langkah 2: Hentikan kode sementara dengan breakpoint

DevTools memungkinkan Anda menghentikan kode sementara di tengah eksekusi, dan
periksa nilai-nilai *semua* variabel pada saat itu. Alat (bantu) untuk
menghentikan sementara kode Anda disebut **breakpoint**. Cobalah sekarang:

1. Buka DevTools di demo dengan menekan
   <kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>I</kbd> (Mac) atau
   <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd> (Windows, Linux).

1. Klik tab **Sources**.

<!-- TODO add a screenshot. Don't create the screenshot until demo design is
     finished. Add it here rather than previous screenshot in case Sources
     is hidden -->

1. Klik **Event Listener Breakpoints** untuk meluaskan bagian. DevTools akan menampilkan
   daftar kategori kejadian yang bisa diluaskan, misalnya **Animation** dan
   **Clipboard**.

<!-- TODO or maybe add it here -->

1. Di sebelah kategori kejadian **Mouse**, klik **Expand** ![ikon
   Expand](/web/tools/chrome-devtools/images/expand.png){: .devtools-inline}.
   DevTools menampilkan daftar kejadian mouse, misalnya **click**,
   bersama kotak centang di sebelahnya.
1. Pilih kotak centang **click**.

     <figure>
       <img src="imgs/get-started-click-breakpoint.png"
         alt="DevTools dibuka pada demo, dengan panel Sources difokus
              dan event listener breakpoint untuk klik diaktifkan."
       <figcaption>
         <b>Gambar 1</b>: DevTools dibuka pada demo, dengan panel Sources
         difokus dan event listener breakpoint untuk klik diaktifkan.
         Jika jendela DevTools Anda besar, lokasi panel <b>Event
         Listener Breakpoints</b> berada di sebelah kanan, bukan
         di bagian kiri bawah, seperti dalam tangkapan layar.
       </figcaption>
     </figure>

1. Kembali ke demo, klik lagi **Add Number 1 and Number 2**. DevTools
   menghentikan demo sementara dan menyorot baris kode di panel **Sources**.
   DevTools menyorot baris kode ini:

       `function onClick() {`

Bila memilih kotak centang **click**, siapkan breakpoint berbasis kejadian pada
semua kejadian `click`. Bila *ada* simpul yang diklik, dan simpul itu memiliki penangan `click`,
DevTools secara otomatis akan berhenti sementara pada baris pertama penangan
`click` simpul itu.

Note: Ini cuma salah satu dari sekian banyak tipe breakpoint yang ditawarkan DevTools.
Breakpoint yang harus Anda gunakan bergantung pada masalah yang sedang Anda debug.

[resume]: /web/tools/chrome-devtools/images/resume-script-execution.png

## Langkah 3: Penyusuran kode

Satu penyebab bug yang umum adalah bila skrip mengeksekusi dalam
urutan yang salah. Penyusuran kode memungkinkan Anda mengikuti proses
eksekusi kode, baris demi baris, dan mengetahui secara persis bila
baris dieksekusi dalam urutan yang berbeda dengan yang Anda harapkan. Cobalah sekarang:

1. Pada panel **Sources** di DevTools, klik **Step into next function
   call** ![Step into next function call][into]{:.devtools-inline} untuk
   menyusuri eksekusi fungsi `onClick()`, baris demi baris.
   DevTools menyoroti baris kode berikut:

       `if (inputsAreEmpty()) {` 

1. Klik **Step over next function call** ![Step over next function
   call][over]{:.devtools-inline}. DevTools akan mengeksekusi `inputsAreEmpty()`
   tanpa memasukinya. Perhatikan cara DevTools melangkahi beberapa baris kode.
   Karena `inputsAreEmpty()` dievaluasi sebagai false, maka blok kode pernyataan `if`
   tidak dieksekusi.

Itulah gambaran umum mengenai penyusuran kode. Jika mengamati kode dalam
`get-started.js`, Anda bisa melihat bahwa bug tersebut mungkin ada di suatu tempat di fungsi
`updateLabel()`. Daripada menyusuri setiap baris kode,
Anda bisa menggunakan tipe breakpoint lain untuk menghentikan sementara kode tersebut lebih dekat dengan
lokasi bug.

[into]: /web/tools/chrome-devtools/images/step-into.png
[over]: /web/tools/chrome-devtools/images/step-over.png

## Langkah 4: Setel breakpoint lain

Breakpoint baris kode adalah tipe breakpoint yang paling umum. Bila
Anda ingin berhenti sementara di baris kode tertentu, gunakan
breakpoint baris kode. Cobalah sekarang:

1. Perhatikan baris kode terakhir di `updateLabel()`, yang terlihat seperti ini:

       `label.textContent = addend1 + ' + ' + addend2 + ' = ' + sum;`

1. Di sebelah kiri kode ini, Anda bisa melihat nomor baris
   kode ini: **32**. Klik di **32**. DevTools akan menempatkan ikon biru di atas
   **32**. Ini berarti ada breakpoint pada baris ini.
   DevTools sekarang selalu berhenti sementara sebelum baris kode ini dieksekusi.
1. Klik **Resume script execution** ![Resume script
   execution][resume]{:.devtools-inline}. Skrip melanjutkan eksekusi
   hingga mencapai baris kode yang Anda pasangi breakpoint.
1. Perhatikan baris kode di `updateLabel()` yang sudah dieksekusi.
   DevTools akan menampilkan nilai-nilai `addend1`, `addend2`, dan `sum`.

Nilai `sum` terlihat mencurigakan. Sepertinya nilai ini dievaluasi sebagai
string, padahal seharusnya sebagai angka. Inilah yang mungkin menyebabkan bug.

## Langkah 5: Periksa nilai-nilai variabel

Penyebab bug yang umum lainnya adalah bila variabel atau fungsi menghasilkan
nilai yang berbeda dari yang diharapkan. Banyak developer menggunakan `console.log()` untuk
melihat bagaimana nilai-nilai berubah dari waktu ke waktu, namun `console.log()` bisa membosankan dan
tidak efektif karena dua alasan. Pertama, Anda mungkin perlu mengedit kode
yang memiliki banyak panggilan ke `console.log()` secara manual. Kedua, Anda mungkin tidak tahu secara persis
variabel mana yang berkaitan dengan bug tersebut, jadi Anda mungkin perlu mengeluarkan banyak variabel.

Satu alternatif DevTools untuk `console.log()` adalah Watch Expressions. Gunakan
Watch Expressions untuk memantau nilai variabel dari waktu ke waktu.
Sebagaimana namanya, Watch Expressions tidak cuma dibatasi pada variabel. Anda bisa
menyimpan ekspresi JavaScript yang valid di Watch Expression. Cobalah sekarang:

1. Di panel **Sources** di DevTools, klik **Watch**. Bagian ini akan diluaskan.
1. Klik **Add Expression** ![Add Expression][add]{:.devtools-inline}.
1. Ketikkan `typeof sum`.
1. Tekan <kbd>Enter</kbd>. DevTools menampilkan `typeof sum: "string"`. Nilai
   di sebelah kanan tanda titik dua adalah hasil Watch Expression.

     <figure>
       <img src="imgs/get-started-watch-expression.png"
         alt="Panel Watch Expression."
       <figcaption>
         <b>Gambar 1</b>: Panel Watch Expression (kanan bawah), setelah
         membuat <code>typeof sum</code> Watch Expression.
         Jika jendela DevTools Anda besar, panel Watch Expression berada di
         kanan, di atas panel <b>Event Listener Breakpoints</b>.
       </figcaption>
     </figure>

Seperti diduga, `sum` dievaluasi sebagai string, padahal seharusnya sebagai
angka. Inilah penyebab bug di demo tersebut.

Alternatif DevTools kedua untuk `console.log()` adalah Console. Gunakan
Console untuk mengevaluasi pernyataan JavaScript arbitrer.
Developer umumnya menggunakan Console untuk menimpa nilai-nilai variabel
saat melakukan debug. Jika begitu halnya, Console bisa membantu Anda menguji
perbaikan yang memungkinkan untuk bug yang baru saja ditemukan. Cobalah sekarang:

1. Jika Anda tidak ada panel samping Console yang terbuka, tekan <kbd>Escape</kbd> untuk
   membukanya. Panel samping akan terbuka di bagian bawah jendela DevTools.
1. Di Console, ketikkan `parseInt(addend1) + parseInt(addend2)`.
1. Tekan <kbd>Enter</kbd>. DevTools akan mengevaluasi pernyataan dan menampilkan
   `6`, yang merupakan hasil yang diharapkan dari demo tersebut.

     <figure>
       <img src="imgs/get-started-console.png"
         alt="Panel samping Console, setelah mengevaluasi pernyataan."
       <figcaption>
         <b>Gambar 1</b>: Panel samping Console, setelah mengevaluasi
         <code>parseInt(addend1) + parseInt(addend2)</code>.
       </figcaption>
     </figure>

[add]: /web/tools/chrome-devtools/javascript/imgs/add-expression.png

## Langkah 6: Terapkan perbaikan

Anda telah mengidentifikasi perbaikan yang memungkinkan untuk bug tersebut. Sekarang tinggal mencoba
perbaikan dengan mengedit kode dan menjalankan kembali demo tersebut. Anda tidak
perlu membiarkan DevTools menerapkan perbaikan. Anda bisa mengedit kode JavaScript secara langsung
dalam UI DevTools. Cobalah sekarang:

1. Di editor kode pada panel **Sources** di DevTools, ganti
   `var sum = addend1 + addend2` dengan
   `var sum = parseInt(addend1) + parseInt(addend2);`. Lokasinya satu baris
   di atas tempat Anda saat ini berhenti.
1. Tekan <kbd>Command</kbd>+<kbd>S</kbd> (Mac) atau
   <kbd>Control</kbd>+<kbd>S</kbd> (Windows, Linux) untuk menyimpan perubahan.
   Latar belakang kode berubah menjadi merah untuk menunjukkan bahwa skrip
   telah berubah dalam DevTools.
1. Klik **Deactivate breakpoints** ![Deactivate
   breakpoints][deactivate]{:.devtools-inline}. Warnanya berubah jadi biru untuk menunjukkan
   bahwa ia aktif. Walaupun telah disetel, DevTools akan mengabaikan breakpoint
   yang telah Anda setel.
1. Klik **Resume script execution** ![Resume script
   execution][resume]{:.devtools-inline}.
1. Cobalah demo dengan nilai-nilai yang berbeda. Kini demo seharusnya akan menghitung
   jumlahnya dengan benar.

Ingatlah bahwa alur kerja ini hanya menerapkan perbaikan ke kode yang
sedang dijalankan di browser Anda. Ini tidak akan memperbaiki kode untuk semua pengguna yang menjalankan
laman Anda. Untuk melakukan hal itu, Anda perlu memperbaiki kode yang dijalankan di server
yang menyediakan laman Anda.

[deactivate]: /web/tools/chrome-devtools/images/deactivate-breakpoints-button.png

## Langkah berikutnya

Selamat! Sekarang Anda mengetahui dasar-dasar men-debug JavaScript di DevTools.

Tutorial ini hanya menunjukkan dua cara untuk menyetel breakpoint. DevTools menawarkan banyak
cara lainnya, termasuk:

* Breakpoint bersyarat yang hanya dipicu bila ketentuan yang Anda
  sediakan adalah true.
* Breakpoint pada pengecualian yang tertangkap atau yang tidak tertangkap.
* XHR breakpoints yang dipicu bila URL yang diminta cocok dengan
  substring yang Anda sediakan.

<a class="gc-analytics-event"
   data-category="DevTools / Debug JS / Get Started / Next Steps / Breakpoints"
   href="add-breakpoints" target="_blank"
   rel="noopener noreferrer"><button>Tampilkan Semua Breakpoint</button></a>

Ada sepasang kontrol penyusuran kode yang belum dijelaskan dalam
tutorial ini. Periksalah tautan di bawah untuk mengetahui selengkapnya tentang keduanya.

<a class="gc-analytics-event"
   data-category="DevTools / Debug JS / Get Started / Next Steps / Breakpoints"
   href="step-code#stepping_in_action" target="_blank"
   rel="noopener noreferrer"><button>Saya Ingin Menguasai Penyusuran Kode</button></a>

## Masukan

Bantu kami membuat tutorial menjadi lebih baik dengan menjawab pertanyaan di bawah ini.

{% framebox width="auto" height="auto" %}

<p>Apakah Anda berhasil menyelesaikan tutorial ini?</p>

<button class="gc-analytics-event"
        data-category="DevTools / JS / Get Started"
        data-label="Completed / Yes">Ya</button>

<button class="gc-analytics-event"
        data-category="DevTools / JS / Get Started"
        data-label="Completed / No">Tidak</button>

<p>Apakah tutorial ini berisi informasi yang Anda cari?</p>

<button class="gc-analytics-event"
        data-category="DevTools / JS / Get Started"
        data-label="Relevant / Yes">Ya</button>

<button class="gc-analytics-event"
        data-category="DevTools / JS / Get Started"
        data-label="Relevant / No">Tidak</button>

<p>Apakah tutorial ini terlalu panjang?</p>

<button class="gc-analytics-event"
        data-category="DevTools / JS / Get Started"
        data-label="Too Long / Yes">Ya</button>

<button class="gc-analytics-event"
        data-category="DevTools / JS / Get Started"
        data-label="Too Long / No">Tidak</button>

{% endframebox %}


{# wf_devsite_translation #}
