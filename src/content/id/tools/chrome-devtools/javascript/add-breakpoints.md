project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Gunakan breakpoint untuk menghentikan sementara kode JavaScript Anda serta selidiki nilai-nilai variabel dan tumpukan panggilan pada suatu saat tertentu.

{# wf_updated_on: 2016-07-17 #}
{# wf_published_on: 2015-04-13 #}

<style>
.devtools-inline {
  max-height: 1em;
  vertical-align: middle;
}
</style>

# Cara menyetel breakpoint {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Gunakan breakpoint untuk menghentikan sementara kode JavaScript Anda
serta selidiki nilai-nilai variabel dan tumpukan panggilan pada suatu saat
tertentu.

Setelah Anda menyetel breakpoint, pelajari cara menyusuri kode
dan menyelidiki variabel serta tumpukan panggilan dalam [Cara merunut kode
Anda](step-code).


### TL;DR {: .hide-from-toc }
- Cara yang paling dasar untuk menyetel breakpoint adalah dengan menambahkan satu breakpoint secara manual pada baris kode tertentu. Anda bisa mengonfigurasi breakpoint ini agar hanya terpicu bila memenuhi ketentuan tertentu.
- Anda juga bisa menyetel breakpoint agar terpicu bila ketentuan umum terpenuhi, misalnya kejadian, perubahan DOM, atau pengecualian yang tidak tertangkap.


## Menyetel breakpoint pada baris kode tertentu {:#line-number}

Menyetel breakpoint pada baris kode tertentu akan sangat berguna bila Anda mengetahui
pernyataan yang ingin Anda selidiki. Misalnya, jika
alur kerja proses masuk Anda tidak berfungsi sebagaimana diharapkan, dan Anda hanya memiliki satu fungsi dalam
kode yang menangani login, maka aman beranggapan bahwa bug
tersebut mungkin ada dalam fungsi itu. Cukup masuk akal dalam skenario ini untuk menambahkan
breakpoint pada baris pertama dari fungsi tersebut.

Ketika Anda menyetel breakpoint pada baris kode, kode selalu berhenti sejenak pada
baris kode tersebut sampai Anda menghapus breakpoint, menonaktifkannya, atau membuatnya
bersyarat.

Untuk menyetel breakpoint pada baris kode tertentu, pertama buka panel **Sources**
, dan pilih skrip dari panel **File Navigator** di sisi
sebelah kiri. Jika Anda tidak bisa melihat **File Navigator**, tekan tombol **Toggle file
navigator**
(![sembunyikan / tampilkan tombol file navigator][fn]{:.devtools-inline})
.

**Tip**: Jika Anda sedang menangani kode yang dikecilkan, tekan tombol **pretty print**
(![tombol pretty print][pp]{:.devtools-inline})
untuk
membuatnya dapat dibaca. 

Sepanjang sisi kiri kode sumber, Anda bisa melihat nomor baris. Region ini
disebut **gutter nomor baris**. Klik dalam gutter nomor baris untuk
menambahkan breakpoint pada baris kode.

![breakpoint nomor baris][lnb]

Jika ekspresi berjarak beberapa baris, dan Anda menempatkan baris
breakpoint di tengah ekspresi, DevTools akan menyetel breakpoint
pada ekspresi berikutnya. Misalnya, jika Anda mencoba untuk menyetel breakpoint pada baris
4 dalam tangkapan layar di bawah ini, DevTools akan menempatkan breakpoint pada baris 6.

![breakpoint mid-expression](imgs/mid-expression-breakpoint.png)

[pp]: imgs/pretty-print.png
[fn]: imgs/file-navigator.png
[lnb]: imgs/line-number-breakpoint.png

### Membuat breakpoint nomor baris bersyarat

Breakpoint bersyarat hanya terpicu bila syarat yang Anda tetapkan
bernilai true.

Klik-kanan pada nomor baris yang belum memiliki breakpoint dan
tekan **Add conditional breakpoint** untuk membuat breakpoint bersyarat.
Jika Anda sudah menambahkan breakpoint pada baris kode dan Anda ingin membuat
breakpoint tersebut bersyarat, klik-kanan dan tekan **Edit breakpoint**.

Masukkan ketentuan Anda dalam bidang teks dan tekan <kbd>Enter</kbd>.

![menambahkan ketentuan][ac]

Breakpoint bersyarat berwarna emas. 

![breakpoint bersyarat][cb]

[ac]: imgs/adding-condition.png
[cb]: imgs/conditional-breakpoint.png

### Menghapus atau menonaktifkan breakpoint nomor baris

Jika Anda ingin untuk sementara waktu mengabaikan breakpoint, maka nonaktifkan.
Klik-kanan dalam **gutter nomor baris** dan pilih **Disable
breakpoint**.

![nonaktifkan breakpoint][db]

Jika Anda tidak lagi membutuhkan breakpoint, maka hapus saja. Klik kanan dalam 
**gutter nomor baris** dan pilih **Remove breakpoint**.

Anda juga bisa mengelola semua breakpoint nomor baris di semua
skrip dari satu lokasi. Inilah lokasi panel **Breakpoints** pada
panel **Sources**.

Untuk menghapus breakpoint dari UI panel **Breakpoints**, klik-kanan pada panel
dan pilih **Remove breakpoint**.

![panel breakpoints][bp]

Untuk menonaktifkan breakpoint dari panel ini, nonaktifkan kotak centangnya.

Untuk menonaktifkan semua breakpoint, klik kanan dari panel ini dan pilih **Deactivate
breakpoints**. Ini menghasilkan efek yang sama dengan opsi **Disable All
Breakpoints**.

Anda juga bisa menonaktifkan semua breakpoint dengan menekan tombol **deactivate
breakpoints**
(![tombol deactivate breakpoints][dbb]{:.devtools-inline}), juga pada panel 
**Sources**.

[db]: imgs/disable-breakpoint.png
[bp]: imgs/breakpoints-pane.png
[dbb]: imgs/deactivate-breakpoints-button.png

## Menyetel breakpoint pada perubahan DOM {:#dom}

Gunakan breakpoint perubahan DOM bila ada bug dalam kode Anda yang secara
tidak benar mengubah, menghapus, atau menambahkan simpul DOM.

Daripada secara manual mencari-cari kode yang menyebabkan perubahan,
DevTools memungkinkan Anda untuk menyetel breakpoint pada simpul. Setiap kali simpul, atau
dalam beberapa kejadian salah satu anaknya, ditambahkan, dihapus, atau diubah,
DevTools menghentikan sementara laman tersebut dan membawa Anda ke baris kode yang tepat
yang jadi penyebabnya.

Di bawah ini adalah demo langsung untuk mempelajari cara menyetel breakpoint perubahan DOM.
Mengeklik **Increment** akan menaikkan **Count** sebesar satu. Cobalah sekarang.

Tujuan Anda dalam tutorial interaktif ini adalah untuk menyetel breakpoint perubahan DOM
yang terpicu ketika **Count** meningkat, sehingga Anda bisa memeriksa
kode yang memodifikasi **Count**.

{% framebox height="auto" %}
<p><b>Demo Breakpoint Perubahan DOM</b></p>
<button>Increment</button>
<p>Count: <span>0</span></p>
<script>
var buttons = document.querySelectorAll('button');
var increment = buttons[0];
var toggle = buttons[1];
var count = document.querySelector('span');
increment.addEventListener('click', function() {
  count.textContent = parseInt(count.textContent) + 1;
});
</script>
{% endframebox %}

Untuk **menambahkan breakpoint perubahan DOM**:

1. Klik-kanan pada **Count** dan pilih **Inspect**. DevTools menyorot
   simpul biru. Itu seharusnya berupa simpul `<p>`. Anda bisa memverifikasi apakah Anda berada pada
   simpul yang tepat dengan mengekliknya dua kali, yang akan meluaskan simpul sehingga Anda bisa melihat
   isinya.

1. Klik-kanan pada simpul yang disorot dan pilih **Break on** >
   **Subtree Modifications**. Ikon biru ![ikon breakpoint 
   DOM][ikon]{:.devtools-inline} di sebelah kiri simpul menunjukkan bahwa breakpoint
   DOM disetel pada simpul. Agak sulit untuk melihat ikon saat
   simpul disorot, karena ikon itu berwarna biru dengan latar belakang
   biru.

1. Kembali pada demo, klik **Increment**. DevTools menghentikan sementara laman tersebut, masuk
   ke **Sources**, dan menyorot baris kode dalam skrip yang
   menyebabkan perubahan.

1. Tekan tombol **Resume script execution** ![tombol resume script
   execution][lanjutkan]{:.devtools-inline} dua kali untuk melanjutkan
   eksekusi skrip. Anda perlu menekannya dua kali karena breakpoint
   terpicu sekali bila teks hitungan dihapus, kemudian terpicu lagi bila
   teks diperbarui dengan hitungan baru.

[lanjutkan]: /web/tools/chrome-devtools/images/resume-script-execution.png

Untuk berhenti bila atribut simpul yang dipilih berubah, atau bila simpul 
yang dipilih dihapus, pilih saja **Attributes modifications** atau
**Node Removal** sebagai ganti **Subtree Modifications** dalam langkah 2 di atas.

Tip: Breakpoint ini tidak eksklusif. Anda bisa mengaktifkan dua atau tiga breakpoint pada satu simpul secara bersamaan.

Untuk **menonaktifkan breakpoint sementara waktu**:

1. Dalam DevTools, kembali ke **Elements**.
1. Klik **DOM Breakpoints**. Jika jendela DevTools Anda kecil, **DOM
   Breakpoints** mungkin tersembunyi di balik menu luapan ![menu
   luapan][luapan]{:.devtools-inline}. Anda akan melihat kotak centang dengan teks `p`
   di sebelahnya, dan **Subtree Modified** di bawah `p`.
1. Nonaktifkan kotak centang di sebelah **Subtree Modified**.
1. Cobalah klik **Increment** lagi. Peningkatan counter dan DevTools tidak
   lagi menghentikan sementara laman tersebut.

Tip: Arahkan pointer ke atas `p` untuk menyorot simpul di tampilan yang terlihat. Klik pada `p` untuk
memilih simpul di **Elements**.

Untuk **menghapus breakpoint**:

1. Masuk ke **DOM Breakpoints**.
1. Klik-kanan pada breakpoint yang ingin Anda hapus dan pilih
   **Remove breakpoint**.

[ikon]: imgs/dom-breakpoint-icon.png
[luapan]: imgs/overflow.png

### Selengkapnya mengenai tipe breakpoint perubahan DOM

Inilah informasi lebih detail tentang kapan dan bagaimana persisnya masing-masing tipe breakpoint perubahan
DOM terpicu:

* **Subtree Modifications**. Dipicu bila anak dari simpul yang saat ini dipilih
  telah dibuang, ditambah, atau materi anak telah berubah. Tidak dipicu
  bila ada perubahan atribut simpul anak, atau ada perubahan pada
  simpul yang saat ini dipilih.

* **Attributes Modifications**: Dipicu bila ada atribut yang ditambah atau dibuang
  pada simpul yang saat ini dipilih, atau bila ada nilai atribut yang berubah.

* **Node Removal**: Dipicu bila simpul yang saat ini dipilih dihapus.

## Berhenti sebentar pada XHR

Ada dua cara memicu breakpoint pada XHR: bila *setiap* XHR mencapai
tahap tertentu dari daur hidup XHR (`readystatechange`, `load`, dll.), atau
bila URL XHR cocok dengan string tertentu. 

Jika Anda ingin berhenti sebentar pada tahap tertentu dari daur hidup XHR, periksa kategori
**XHR** di [panel breakpoint event listener](#events).

Untuk berhenti sebentar ketika URL dari sebuah XHR cocok dengan string tertentu, gunakan panel **XHR
Breakpoints** pada panel **Sources**. 

![Panel XHR Breakpoints][xbp]

[xbp]: imgs/xhr-breakpoints-pane.png

Klik tombol tanda tambah untuk menambahkan pola breakpoint baru. Masukkan string Anda
dalam bidang teks dan tekan <kbd>Enter</kbd> untuk menyimpannya.

**Tip**: Klik tanda tambah kemudian langsung tekan <kbd>Enter</kbd> untuk
memicu breakpoint sebelum setiap XHR dikirimkan.

## Berhenti sebentar bila kejadian terpicu {:#events}

Gunakan panel **Event Listener Breakpoints** pada panel **Sources** untuk
berhenti sebentar bila kejadian tertentu (mis. `click`) atau kategori kejadian (mis. setiap kejadian
`mouse`) terpicu.

![panel breakpoint event listener][elbp]

Tingkat-teratas menyatakan kategori kejadian. Aktifkan salah satu kotak centang ini
untuk berhenti sebentar bila ada kejadian dari kategori tersebut yang dipicu. Luaskan
kategori tingkat-teratas untuk melihat kejadian yang tercakup.

Jika Anda ingin memantau kejadian tertentu, temukan kategori tingkat-teratas yang
menyertakan kejadian, kemudian aktifkan kotak centang di sebelah kejadian target Anda.

![panel breakpoint event listener diluaskan][eelbp]

[elbp]: imgs/event-listener-breakpoints-pane.png

[eelbp]: imgs/expanded-event-listener-breakpoints-pane.png

## Breakpoint pengecualian {:#exceptions}

Gunakan breakpoint pengecualian untuk menghentikan sementara suatu skrip bila
pengecualian dilontarkan, kemudian lompat ke baris kode yang melontarkan
pengecualian tersebut.

Demo di bawah ini berisi bug. Ikuti petunjuk di bawah ini
untuk mempelajari cara memperbaiki bug dengan menggunakan breakpoint pengecualian.

{% framebox height="auto" width="auto" %}
<button>Print Random Number</button>
<p>Random Number: <span></span></p>
<script type="text/javascript">
  var nodes = {};
  nodes.button = document.querySelector('button');
  nodes.num = document.querySelector('span');
  nodes.button.addEventListener('click', function onClick() {
    nodes.number.textContent = Math.random();
  });
</script>
{% endframebox %}

1. Klik **Print Random Number**. Label **Random Number** di bawah
   tombol seharusnya akan mencetak nomor acak, namun hal itu tidak terjadi.
   Ini adalah bug yang akan kita perbaiki.
1. Tekan <kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>I</kbd> (Mac) atau
   <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd> (Windows, Linux) untuk
   membuka DevTools.
1. Klik tab **Sources**.
1. Klik **Pause on exceptions** ![Berhenti pada
   pengecualian][berhenti pada pengecualian]{:.devtools-inline}.
1. Klik **Print Random Number** lagi untuk memicu breakpoint.
   DevTools seharusnya akan berhenti sementara pada baris kode yang berisi
   `nodes.number.textContent = Math.random();`. Kini Anda mengetahui segala hal
   yang Anda butuhkan untuk untuk menggunakan breakpoint pengecualian. Petunjuk selebihnya
   menjelaskan cara mengatasi bug khusus.
1. Pada baris kode tempat DevTools berhenti sementara saat ini, arahkan pointer ke atas `nodes`
   untuk memastikan objek direferensikan dengan benar. Anda akan melihat
   bahwa isinya adalah tiga properti: `button`, `num`, dan `__proto__`.
   Semuanya terlihat OK di sini; berarti ini bukan sumber bug.
1. Arahkan pointer ke atas `number`. Anda akan melihat bahwa hasil evaluasinya adalah `undefined`.
   Inilah penyebab bug tersebut. Nama properti harus berupa
   `num`, bukan `number`.
1. Di DevTools, ubah `nodes.number.textContent` menjadi `nodes.num.textContent`.
1. Tekan <kbd>Command</kbd>+<kbd>S</kbd> (Mac) atau
   <kbd>Control</kbd>+<kbd>S</kbd> (Windows, Linux) untuk menyimpan perubahan Anda.
   DevTools secara otomatis melanjutkan eksekusi skrip saat penyimpanan.
1. Tekan **Print Random Number** lagi untuk memastikan perbaikan yang Anda buat telah mengatasi
   bug tersebut. DevTools seharusnya tidak lagi berhenti sementara setelah mengeklik tombol, ini
   berarti skrip tersebut tidak lagi melontarkan pengecualian.

[berhenti pada pengecualian]: /web/tools/chrome-devtools/images/pause-on-exception.png


{# wf_devsite_translation #}
