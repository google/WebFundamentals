project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Pelajari cara merekam cuplikan heap dengan profiler heap Chrome DevTools dan menemukan kebocoran memori.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2015-06-08 #}

# Cara Merekam Cuplikan Heap {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}

Pelajari cara merekam cuplikan heap dengan profiler heap Chrome DevTools dan menemukan kebocoran memori.

Profiler heap Chrome DevTools menampilkan distribusi memori
berdasarkan objek JavaScript laman dan simpul DOM yang terkait
(lihat juga [Pohon penahan objek](/web/tools/chrome-devtools/profile/memory-problems/memory-101#objects-retaining-tree)).
Gunakan ini untuk mengambil cuplikan heap JS, menganalisis grafik memori,
membandingkan cuplikan, dan menemukan kebocoran memori.


## Mengambil cuplikan

Pada panel Profiles, pilih **Take Heap Snapshots**, lalu klik **Start** atau tekan <span class="kbd">Cmd</span> + <span class="kbd">E</span> atau <span class="kbd">Ctrl</span> + <span class="kbd">E</span>:

![Pilih tipe pembuatan profil](imgs/profiling-type.png)

**Cuplikan** awalnya disimpan di memori proses renderer.
Cuplikan lalu ditransfer ke DevTools sesuai permintaan, saat Anda mengeklik ikon cuplikan untuk menampilkannya.

Setelah cuplikan dimuat ke DevTools dan telah di-parse,
di bawah judul cuplikan akan muncul angka, yang menunjukkan ukuran total
[objek JavaScript yang dapat dijangkau](/web/tools/chrome-devtools/profile/memory-problems/memory-101#object-sizes):

![Total objek yang dapat dijangkau](imgs/total-size.png)

Note: Hanya objek yang bisa dijangkau yang disertakan di cuplikan. Selain itu, mengambil cuplikan selalu dimulai dengan pengumpulan sampah.

## Menghapus cuplikan

Hapus cuplikan (dari DevTools dan memori renderer) dengan menekan ikon Clear all profiles:

![Buang cuplikan](imgs/remove-snapshots.png)

Menutup jendela DevTools tidak akan menghapus profil dari memori renderer. Saat membuka ulang DevTools, semua cuplikan yang sebelumnya diambil akan kembali muncul dalam daftar cuplikan.

<p class="note"><strong>Contoh:</strong> Coba contoh <a href="https://github.com/GoogleChrome/devtools-docs/blob/master/docs/demos/memory/example3.html">objek tersebar</a> berikut dan buat profilnya menggunakan Heap Profiler. Sejumlah alokasi item (objek) akan ditampilkan.</p>

## Menampilkan cuplikan

Tampilkan cuplikan dari sudut pandang yang berbeda untuk tugas yang berbeda.

**Tampilan Summary** menampilkan objek yang dikelompokkan berdasarkan nama konstruktor. Gunakan ini untuk mencari objek (dan penggunaan memorinya) berdasarkan tipe yang dikelompokkan berdasarkan nama konstruktor. Ini khususnya bermanfaat untuk
[melacak kebocoran DOM](/web/tools/chrome-devtools/profile/memory-problems/memory-diagnosis#narrow-down-causes-of-memory-leaks).

**Tampilan Comparison** menampilkan perbedaan antara dua cuplikan. Gunakan ini untuk membandingkan dua cuplikan memori (atau lebih) sebelum dan setelah operasi. Dengan memeriksa delta di memori yang dibebaskan dan jumlah referensi, Anda dapat mengonfirmasi keberadaan dan penyebab kebocoran memori.

**Tampilan Containment** bisa digunakan untuk menjelajahi materi heap. Tampilan ini memberikan tampilan struktur objek yang lebih baik, yang membantu menganalisis objek yang direferensikan di namespace (jendela) global untuk mencari tahu penyebab kehadirannya. Gunakan ini untuk menganalisis closure dan mengamati objek secara mendalam di tingkat rendah.

**Tampilan Dominators** menampilkan
[pohon dominator](/web/tools/chrome-devtools/profile/memory-problems/memory-101#dominators)
dan bisa berguna untuk menemukan titik akumulasi.
Tampilan ini membantu mengonfirmasi bahwa sudah tidak ada lagi referensi ke objek yang tidak diharapkan dan bahwa penghapusan/pengumpulan sampah benar-benar berfungsi.

Untuk beralih antar tampilan, gunakan pemilih di bagian bawah tampilan:

![Pemilih Switch views](imgs/switch-views.png)

Note: Tidak semua properti disimpan di heap JavaScript. Properti yang diimplementasikan menggunakan getter yang mengeksekusi kode bawaan tidak direkam cuplikannya. Selain itu, nilai non-string seperti angka tidak direkam cuplikannya.

### Tampilan Summary

Cuplikan mula-mula dibuka dalam tampilan Summary, yang menampilkan total objek, yang bisa diluaskan untuk menampilkan instance.

![Tampilan Summary](imgs/summary-view.png)

Entri tingkat atas adalah baris "total". Baris ini menampilkan:

* **Constructor** mewakili semua objek yang dibuat menggunakan konstruktor ini.
* **Number of object instances** ditampilkan di kolom # .
* Kolom **Shallow size** menampilkan jumlah ukuran dangkal semua objek yang dibuat oleh fungsi konstruktor tertentu. Ukuran dangkal adalah ukuran memori yang dipertahankan oleh objek itu sendiri (umumnya, larik dan string memiliki ukuran dangkal yang lebih besar). Lihat juga [Ukuran objek](/web/tools/chrome-devtools/profile/memory-problems/memory-101#object-sizes).
* Kolom **Retained size** menampilkan ukuran yang dipertahankan maksimum di antara rangkaian objek yang sama. Ukuran memori yang bisa dibebaskan setelah objek dihapus (dan membuat objek yang bergantung padanya tidak lagi bisa dijangkau) disebut sebagai ukuran yang dipertahankan. Lihat juga [Ukuran objek](/web/tools/chrome-devtools/profile/memory-problems/memory-101#object-sizes).
* **Distance** menampilkan jarak ke akar menggunakan jalur simpul sederhana yang paling pendek.

Luaskan baris total di tampilan atas untuk menampilkan semua instance-nya. Untuk setiap instance, ukuran dangkal dan yang dipertahankan ditampilkan di kolom yang sesuai. Angka setelah karakter @ adalah ID unik objek, yang bisa digunakan untuk membandingkan cuplikan heap per objek.

Ingat bahwa objek kuning memiliki referensi JavaScript padanya dan objek merah adalah simpul terlepas yang direferensikan dari simpul dengan latar belakang kuning.

**Apa yang terkait dengan setiap entri (grup) konstruktor di profiler Heap?**

![Grup konstruktor](imgs/constructor-groups.jpg)

* **(global property)** – objek penengah antara objek global (seperti 'window') dengan objek yang direferensikan olehnya. Jika objek dibuat menggunakan konstruktor Person dan ditahan oleh objek global, jalur yang mempertahankan akan terlihat seperti ini [global] > (global property) > Person. Ini bertentangan dengan aturan umum, yaitu objek langsung saling merujuk satu sama lain. Kami memiliki objek penengah dengan alasan kinerja. Objek global diubah secara rutin dan pengoptimalan akses properti yang berfungsi baik untuk objek non-global tidak berlaku untuk objek global.

* **(roots)** – Entri akar di tampilan pohon yang dipertahankan adalah entitas yang memiliki referensi ke objek yang dipilih. Ini bisa jadi referensi yang dibuat oleh mesin untuk tujuannya sendiri. Mesin memilih cache yang mereferensi objek, tetapi semua referensi ini lemah dan tidak akan menghentikan objek agar tidak dikumpulkan karena tidak ada referensi yang benar-benar kuat.

* **(closure)** – jumlah referensi ke sekelompok objek melalui closure fungsi

* **(array, string, number, regexp)** – sebuah tipe daftar dengan properti yang merujuk Larik, String, Angka atau ekspresi reguler.

* **(compiled code)** – adalah semuanya yang terkait dengan kode yang dikompilasi. Skrip mirip dengan fungsi, tetapi terkait dengan isi &lt;skrip&gt;. SharedFunctionInfos (SFI) adalah objek yang berada di antara fungsi dan kode yang dikompilasi. Fungsi biasanya memiliki konteks, sedangkan SFI tidak.

* **HTMLDivElement**, **HTMLAnchorElement**, **DocumentFragment**, dsb – mengacu ke elemen atau objek dokumen dari tipe tertentu yang dirujuk oleh kode Anda.


<p class="note"><strong>Contoh:</strong> Coba <a href="https://developer.chrome.com/devtools/docs/heap-profiling-summary">laman demo</a> ini untuk memahami cara menggunakan tampilan Summary.</p>

### Tampilan Comparison

Temukan objek yang bocor dengan membandingkan beberapa cuplikan. Untuk memverifikasi bahwa operasi aplikasi tertentu tidak membuat kebocoran (misalnya, biasanya sepasang operasi langsung dan balik, seperti membuka dokumen, lalu menutupnya, seharusnya tidak meninggalkan sampah), Anda bisa mengikuti skenario berikut:

1. Ambil cuplikan heap sebelum melakukan operasi.
2. Lakukan operasi (berinteraksi dengan laman dalam cara yang Anda yakini menyebabkan kebocoran).
3. Lakukan operasi balik (lakukan interaksi kebalikannya dan ulangi beberapa kali).
4. Ambil cuplikan heap kedua dan ubah tampilan cuplikan ini ke Comparison, yang akan membandingkannya dengan cuplikan 1.

Di tampilan Comparison, perbedaan antara dua cuplikan ditampilkan. Saat meluaskan entri total, instance objek yang ditambahkan dan dihapus ditampilkan.

![Tampilan Comparison](imgs/comparison-view.png)

<p class="note"><strong>Contoh:</strong> Coba <a href="https://developer.chrome.com/devtools/docs/heap-profiling-comparison">laman demo ini</a> untuk mendapatkan gambaran tentang cara menggunakan perbandingan cuplikan untuk mendeteksi kebocoran.</p>

### Tampilan Containment

Tampilan Containment intinya adalah "tampilan menyeluruh" dari struktur objek aplikasi. Dengan tampilan ini, Anda bisa melihat ke dalam closure fungsi, mengamati objek internal VM yang bersama-sama membentuk objek JavaScript, dan memahami berapa banyak memori yang digunakan aplikasi pada tingkat yang sangat rendah.

Tampilan ini menyediakan beberapa titik masuk:

* **DOMWindows objects** adalah objek yang dianggap sebagai objek "global" untuk kode JavaScript.
* **GC roots** adalah akar GC sebenarnya yang digunakan oleh sampah VM. Akar GC bisa terdiri dari peta objek, tabel simbol, tumpukan alur VM, cache kompilasi, cakupan handle, dan handle global internal.
* **Native objects** adalah objek browser yang "didorong" ke dalam mesin virtual JavaScript untuk memungkinkan otomatisasi, misalnya, simpul DOM, aturan CSS.

![Tampilan Containment](imgs/containment-view.png)

<p class="note">
  <strong>Contoh:</strong> Coba <a href="https://developer.chrome.com/devtools/docs/heap-profiling-containment">laman demo ini</a> untuk mengetahui cara menjelajah closure dan penangan kejadian menggunakan tampilan.
</p>

<strong>Tip tentang closure</strong>

Sebaiknya fungsi diberi nama, untuk memudahkan membedakan closure di cuplikan. Misalnya, contoh berikut ini tidak menggunakan fungsi yang bernama:


    function createLargeClosure() {
      var largeStr = new Array(1000000).join('x');
    
      var lC = function() { // this is NOT a named function
        return largeStr;
      };
    
      return lC;
    }
    

Meskipun contoh ini menjalankan:


    function createLargeClosure() {
      var largeStr = new Array(1000000).join('x');
    
      var lC = function lC() { // this IS a named function
        return largeStr;
      };
    
      return lC;
    }
    

![Beri nama fungsi untuk mengenali closure yang berbeda](imgs/domleaks.png)

<p class="note">
    <strong>Contoh:</strong>
    Coba contoh <a href="https://github.com/GoogleChrome/devtools-docs/blob/master/docs/demos/memory/example7.html">why eval is evil</a> ini untuk menganalisis dampak closure pada memori. Lalu, sebaiknya coba juga contoh ini yang akan membimbing Anda merekam <a href="https://github.com/GoogleChrome/devtools-docs/blob/master/docs/demos/memory/example8.html">alokasi heap</a>.
</p>

### Tampilan Dominator

Tampilan [Dominator](/web/tools/chrome-devtools/profile/memory-problems/memory-101#dominators) menampilkan pohon dominator untuk grafik heap.
Tampilan ini mirip dengan tampilan Containment, tetapi tanpa nama properti.
Sebabnya, dominator sebuah objek mungkin tidak memiliki referensi langsung padanya;
pohon dominator bukan pohon grafik yang membentang.
Akan tetapi, akibatnya baik
karena membantu kita mengidentifikasi titik akumulasi memori secara cepat.

<p class="note"><strong>Catatan:</strong> Di Chrome Canary, tampilan Dominator dapat diaktifkan dengan masuk ke Settings > Show heap snapshot properties, dan memulai ulang DevTools.</p>

![Tampilan Dominators](imgs/dominators-view.png)

<p class="note">
    <strong>Contoh:</strong>
    Coba <a href="https://developer.chrome.com/devtools/docs/heap-profiling-dominators">demo</a> ini untuk berlatih menemukan titik akumulasi. Lanjutkan dengan contoh berikut tentang menemukan <a href="https://github.com/GoogleChrome/devtools-docs/blob/master/docs/demos/memory/example10.html">jalur penahan dan dominator</a>.
</p>

## Mencari kode warna

Properti dan nilai properti objek memiliki tipe berbeda-beda dan
diberi warna berdasarkan tipenya. Setiap properti memilih satu dari empat tipe berikut:

* **properti a:** — properti biasa dengan nama, diakses melalui operator . (titik), atau melalui notasi [ ] (tanda kurung), mis.: ["foo bar"];
* **elemen 0:** — properti biasa dengan indeks angka, diakses melalui notasi [ ] (tanda kurung);
* **variabel konteks a:** — variabel di dalam konteks fungsi, bisa diakses melalui namanya dari dalam closure fungsi;
* **properti sistem a:** — properti yang ditambahkan oleh VM JavaScript, tidak bisa diakses dari kode JavaScript.

Objek yang ditetapkan sebagai `System `tidak memiliki tipe JavaScript yang sesuai. Semuanya adalah bagian implementasi sistem objek VM JavaScript. V8 mengalokasikan sebagian besar objek internalnya di heap yang sama dengan objek JS pengguna. Jadi, ini hanyalah bagian internal v8.

## Menemukan objek tertentu

Untuk menemukan objek di heap yang dikumpulkan, Anda bisa menelusuri menggunakan <kbd><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">F</kbd></kbd> dan memasukkan ID objek.

## Mengungkap kebocoran DOM

Profiler heap mampu memperlihatkan dependensi dua arah
antara objek bawaan browser (simpul DOM, aturan CSS) dan objek JavaScript.
Ini membantu mengungkapkan kebocoran tersembunyi yang terjadi
karena keberadaan subpohon DOM yang terlepas dan terlupakan.

Kebocoran DOM bisa lebih besar dari yang Anda kira.
Perhatikan contoh berikut — kapan #tree GC terjadi?


      var select = document.querySelector;
      var treeRef = select("#tree");
      var leafRef = select("#leaf");
      var body = select("body");
    
      body.removeChild(treeRef);
    
      //#tree can't be GC yet due to treeRef
      treeRef = null;
    
      //#tree can't be GC yet due to indirect
      //reference from leafRef
    
      leafRef = null;
      //#NOW can be #tree GC
    

`#leaf` mempertahankan referensi ke induknya (parentNode) dan secara terbalik
hingga `#tree`, sehingga hanya saat leafRef dinolkan, pohon keseluruhan di bawah
`#tree` menjadi kandidat untuk GC.

![Subpohon DOM](imgs/treegc.png)

<p class="note">
    <strong>Contoh:</strong>
    Coba contoh berikut tentang <a href="https://github.com/GoogleChrome/devtools-docs/blob/master/docs/demos/memory/example6.html">kebocoran simpul DOM</a> untuk memahami di mana simpul DOM bisa bocor dan cara mendeteksinya. Anda bisa melanjutkan dengan melihat contoh berikut tentang <a href="https://github.com/GoogleChrome/devtools-docs/blob/master/docs/demos/memory/example9.html">kebocoran DOM yang lebih besar dari yang dikira</a>.
</p>

Untuk membaca selengkapnya tentang kebocoran DOM dan dasar-dasar analisis memori, pelajari
[Finding and debugging memory leaks with the Chrome DevTools](http://slid.es/gruizdevilla/memory) oleh Gonzalo Ruiz de Villa.

<p class="note">
    <strong>Contoh:</strong>
    Coba <a href="https://developer.chrome.com/devtools/docs/heap-profiling-dom-leaks">demo</a> ini untuk menguji coba pohon DOM yang terlepas.
</p>




{# wf_devsite_translation #}
