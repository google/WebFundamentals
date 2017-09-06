project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Dengan mengeksekusi kode baris per baris atau fungsi per fungsi, Anda bisa mengamati perubahan dalam data dan dalam laman untuk memahami secara persis apa yang sedang terjadi.

{# wf_updated_on: 2015-09-01 #}
{# wf_published_on: 2015-04-13 #}

# Cara meyusuri kode Anda {: .page-title }

{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/pbakaus.html" %}
{% include "web/_shared/contributors/kaycebasques.html" %}

Dengan mengeksekusi kode baris per baris atau fungsi per fungsi, Anda bisa mengamati perubahan dalam data dan dalam laman untuk memahami secara persis apa yang sedang terjadi. Anda juga bisa memodifikasi nilai data yang digunakan oleh skrip, dan Anda bahkan bisa memodifikasi skrip itu sendiri.

*Mengapa nilai variabel ini 20 bukannya 30? Mengapa baris kode itu sepertinya tidak berpengaruh? Mengapa flag ini true padahal seharusnya false?* Setiap developer menghadapi pertanyaan ini, dan menyusuri kode untuk mengetahui jawabannya.

Setelah [menyetel breakpoint](add-breakpoints), kembalilah ke laman dan gunakan seperti biasa hingga mencapai breakpoint. Ini menghentikan sementara semua JavaScript di laman, fokus berpindah ke panel Sources di DevTools, dan breakpoint akan disorot. Anda kini bisa secara selektif mengeksekusi kode dan memeriksa datanya, langkah demi langkah.


### TL;DR {: .hide-from-toc }
- Susur kode untuk mengamati masalah sebelum atau saat masalah terjadi dan uji perubahan melalui pengeditan langsung.
- Sebaiknya lewati proses log konsol, karena data yang tercatat di log sudah kedaluwarsa pada saat tiba di konsol.
- Aktifkan fitur 'Async call stack' untuk mendapatkan visibilitas lebih besar ke dalam tumpukan panggilan fungsi asinkron.
- Kotak hitamkan skrip untuk menyembunyikan kode pihak ketiga dari tumpukan panggilan Anda.
- Gunakan fungsi bernama daripada fungsi anonim untuk meningkatkan keterbacaan tumpukan panggilan.


## Stepping sedang beraksi

Semua opsi langkah dinyatakan melalui ikon yang bisa diklik ![bilah tombol Breakpoints](imgs/image_7.png){:.inline} di bilah sisi, namun bisa juga dipicu lewat pintasan. Inilah ringkasannya:

<table>
  <thead>
    <tr>
      <th data-th="Icon/Button">Ikon/Tombol</th>
      <th data-th="Action">Aksi</th>
      <th data-th="Description">Keterangan</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_8.png" alt="Resume" class="inline"></td>
      <td data-th="Action">Resume</td>
      <td data-th="Description">Melanjutkan eksekusi hingga breakpoint berikutnya. Jika tidak ada breakpoint yang ditemui, eksekusi normal akan dilanjutkan.</td>
    </tr>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_9.png" alt="Long Resume" class="inline"></td>
      <td data-th="Action">Long Resume</td>
      <td data-th="Description">Melanjutkan eksekusi dengan breakpoint dinonaktifkan selama 500 md. Praktis untuk sejenak melompati breakpoint yang jika tidak dilompati akan terus menghentikan sementara suatu kode, mis., breakpoint di dalam loop. <p><b>Klik dan tahan <i>Resume</i> hingga diperluas untuk menampilkan aksi.</b></p></td>
    </tr>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_10.png" alt="Step Over" class="inline"></td>
      <td data-th="Action">Step Over</td>
      <td data-th="Description">Mengeksekusi apa saja yang terjadi di baris berikutnya dan melompat ke baris berikutnya.</td>
    </tr>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_11.png" alt="Step Into" class="inline"></td>
      <td data-th="Action">Step Into</td>
      <td data-th="Description">Jika baris berikutnya berisi panggilan fungsi, <i>Step Into</i> akan melompat ke dan menghentikan sementara fungsi itu pada baris pertamanya..</td>
    </tr>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_12.png" alt="Step Out" class="inline"></td>
      <td data-th="Action">Step Out</td>
      <td data-th="Description">Mengeksekusi sisa fungsi saat ini kemudian berhenti sementara pada pernyataan berikutnya setelah panggilan fungsi.</td>
    </tr>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_13.png" alt="Deactivate breakpoints" class="inline"></td>
      <td data-th="Action">Deactivate breakpoints</td>
      <td data-th="Description">Menonaktifkan sementara semua breakpoint. Gunakan untuk melanjutkan eksekusi penuh tanpa benar-benar membuang breakpoint Anda. Klik lagi untuk mengaktifkan ulang breakpoint.</td>
    </tr>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_14.png" alt="Pause on exceptions" class="inline"></td>
      <td data-th="Action">Pause on exceptions</td>
      <td data-th="Description">Secara otomatis menghentikan kode sementara bila terjadi pengecualian.</td>
    </tr>
  </tbody>
</table>

Gunakan **step into** sebagai aksi tipikal "baris per baris" Anda, karena ini akan memastikan hanya satu pernyataan yang dieksekusi, tidak peduli fungsi apa pun yang Anda masuki dan tinggalkan.

Gunakan [Pause on exceptions](add-breakpoints#break-on-uncaught-exception) bila Anda menduga ada pengecualian tak tertangkap yang menyebabkan masalah, namun Anda tidak tahu di mana adanya. Ketika opsi ini diaktifkan, Anda bisa menyaringnya dengan mengeklik kotak centang **Pause On Caught Exceptions**; dalam hal ini, eksekusi hanya dihentikan sementara bila terjadi pengecualian yang ditangani secara khusus.

## Menampilkan properti menurut cakupan {: #scope }

Ketika Anda menghentikan sementara sebuah skrip, panel **Scope** menunjukkan semua
properti yang didefinisikan-sekarang pada saat tersebut.

Panel disorot dengan warna biru pada tangkapan layar di bawah ini.

![Panel Scope dari panel Sources](imgs/scope-pane.png)

Panel Scope hanya terisi saat skrip dihentikan sementara.
Ketika laman Anda sedang berjalan, panel Scope kosong.

Panel Scope menunjukkan properti yang didefinisikan di tingkat lokal, closure, dan
global.

Jika properti memiliki ikon carat di sebelahnya, itu berarti bahwa ia adalah sebuah objek. Klik
pada ikon carat untuk memperluas objek dan menampilkan propertinya.

Kadang-kadang properti dibuat redup. Misalnya, properti `constructor`
lebih redup daripada properti `confirm` pada tangkapan layar di bawah ini.

![Properti diredupkan](imgs/enumerables.png)

Properti lebih gelap yang bisa dienumerasi. Properti lebih terang dan diredupkan,
tidak bisa dienumerasi. Lihat thread Stack Overflow berikut untuk informasi selengkapnya:
[Apa arti warna dalam panel
Scope Chrome Developer Tools?](Apa arti warna dalam panel Scope Chrome Developer Tools?)

## Tumpukan panggilan

Dekat bagian atas bilah sisi terdapat bagian **Call Stack**. Bila kode dihentikan sementara di breakpoint, tumpukan panggilan akan menampilkan jalur eksekusi, dalam urutan kronologis terbalik, yang akan membawa kode tersebut ke breakpoint itu. Ini tidak cuma berguna untuk memahami di mana eksekusi terjadi *sekarang*, melainkan bagaimana eksekusi bisa sampai ke situ, merupakan faktor penting dalam proses debug.

### Contoh

<img src="imgs/image_15.png" alt="Tumpukan panggilan" class="attempt-left">

Kejadian onclick pertama di baris 50 dalam file `index.html` memanggil fungsi 
`setone()` di baris 18 dalam file JavaScript `dgjs.js`, yang kemudian
memanggil fungsi `setall()` di baris 4 dalam file yang sama, di mana eksekusi
dihentikan sementara pada breakpoint saat ini.

<div class="clearfix"></div>

### Mengaktifkan async call stack

Mengaktifkan fitur async call stack agar bisa lebih jelas melihat eksekusi
dari panggilan fungsi asinkron Anda.

1. Buka panel **Sources** di DevTools.
2. Pada panel **Call Stack**, aktifkan kotak centang **Async**.

Video di bawah ini berisi skrip sederhana untuk memperagakan fitur async call 
stack. Dalam skrip, digunakan pustaka pihak ketiga untuk memilih
elemen DOM. Sebuah fungsi dengan nama `onClick` telah didaftarkan sebagai penangan kejadian 
`onclick` untuk elemen. Setiap kali `onClick` dipanggil,
itu akan memanggil fungsi bernama `f`, yang sekadar memaksa skrip untuk 
berhenti sementara lewat kata kunci `debugger`. 

<video src="animations/async-call-stack-demo.mp4"
       autoplay muted loop controls></video>

Dalam video ini, breakpoint dipicu, dan tumpukan panggilan diperluas.
Hanya ada satu panggilan di tumpukan: `f`. Fitur async call stack kemudian
diaktifkan, skrip dilanjutkan, breakpoint dipicu lagi, kemudian
tumpukan panggilan diperluas untuk kedua kalinya. Kali ini, tumpukan panggilan berisi 
semua panggilan yang mengarah ke `f`, termasuk panggilan pustaka pihak-ketiga, dan
panggilan ke `onClick`. Saat pertama skrip dipanggil, hanya 
ada satu panggilan di tumpukan panggilan. Saat kedua kali, ada empat panggilan. Singkatnya
, fitur async call stack memberikan peningkatan visibilitas pada 
tumpukan panggilan lengkap fungsi asinkron.

### Tip: Berikan nama pada fungsi untuk meningkatkan keterbacaan tumpukan panggilan

Fungsi anonim membuat tumpukan panggilan sulit dibaca. Berikan nama pada fungsi Anda
untuk meningkatkan keterbacaan.

Cuplikan kode pada dua tangkapan layar di bawah ini setara secara fungsional. Fungsi
sebenarnya dari kode ini tidaklah penting, yang penting adalah
kode dalam tangkapan layar pertama menggunakan fungsi anonim, sedangkan
yang kedua menggunakan fungsi bernama.

Dalam tumpukan panggilan di tangkapan layar pertama, dua fungsi teratas
hanya dinamai `(anonymous function)`. Dalam tangkapan layar kedua, dua
fungsi teratas diberi nama, yang mempermudah memahami alur program
secara sekilas. Bila Anda menggunakan banyak file skrip, termasuk
pustaka dan kerangka kerja pihak-ketiga, dan tumpukan panggilan Anda sedalam lima atau sepuluh
panggilan, maka jauh lebih mudah memahami alur tumpukan panggilan bila
fungsi-fungsi itu diberi nama.

Tumpukan panggilan dengan fungsi anonim:

![Tumpukan panggilan dengan fungsi anonim sulit dibaca](imgs/anon.png)

Tumpukan panggilan dengan fungsi bernama: 

![Tumpukan panggilan dengan fungsi bernama mudah dibaca](imgs/named.png)

<!-- blackbox OR disable third-party code??? -->

### Kotak-hitamkan kode pihak ketiga

Kotak-hitamkan file skrip untuk meninggalkan file pihak ketiga dari tumpukan panggilan Anda.

Sebelum kotak-hitam:

![Tumpukan panggilan sebelum kotak-hitam](imgs/before-blackbox.png)

Setelah kotak-hitam:

![Tumpukan panggilan setelah kotak-hitam](imgs/after-blackbox.png)

Untuk mengotakhitamkan sebuah file:

1. Buka DevTools Settings.

   ![Membuka DevTools Settings](imgs/open-settings.png)

2. Dalam menu navigasi di sebelah kiri, klik **Blackboxing**.

   ![Panel Blackboxing di Chrome DevTools](imgs/blackbox-panel.png)

3. Klik **Add pattern**.

4. Dalam bidang teks **Pattern** masukkan pola nama file yang ingin Anda 
   kecualikan dari tumpukan panggilan. DevTools mengecualikan semua skrip yang cocok dengan 
   pola. 

   ![Menambahkan pola kotak-hitam](imgs/add-pattern.png)

5. Dalam menu tarik-turun di sebelah kanan bidang teks, pilih **Blackbox** untuk
   mengeksekusi file skrip namun mengecualikan panggilan dari tumpukan panggilan, atau pilih
   **Disabled** untuk mencegah file dieksekusi.

6. Klik **Add** untuk menyimpan.

Saat berikutnya Anda menjalankan laman dan breakpoint terpicu, DevTools
akan menyembunyikan panggilan fungsi dari skrip yang telah dikotak-hitamkan dari tumpukan panggilan.

## Manipulasi data

Bila eksekusi kode dihentikan sementara, Anda bisa mengamati dan memodifikasi data yang sedang diproses. Hal ini sangat penting saat mencoba melacak variabel yang kelihatannya memiliki nilai yang salah atau parameter yang diteruskan yang belum diterima sebagaimana diharapkan.

Tampilkan panel samping Console dengan mengeklik **Show/Hide drawer** ![Tampilkan/Sembunyikan panel samping](imgs/image_16.png){: .inline} atau menekan <kbd class="kbd">ESC</kbd>. Dengan konsol yang dibuka sambil menyusuri kode, sekarang Anda bisa:

* Ketikkan nama variabel untuk melihat nilainya saat ini dalam cakupan fungsi saat ini
* Ketikkan pernyataan penetapan JavaScript untuk mengubah nilai

Cobalah memodifikasi nilai, kemudian lanjutkan eksekusi untuk melihat bagaimana ia mengubah hasil kode Anda dan apakah perilakunya seperti yang Anda harapkan.

#### Contoh

<img src="imgs/image_17.png" alt="Panel Samping Console" class="attempt-left">

Kami menunjukkan bahwa nilai parameter `dow` saat ini adalah 2, namun ubahlah
secara manual menjadi 3 sebelum melanjutkan eksekusi.

<div class="clearfix"></div>

## Pengeditan langsung

Mengamati dan menghentikan sementara eksekusi kode akan membantu Anda menemukan kesalahan, dan pengeditan langsung memungkinkan Anda dengan cepat melihat pratinjau perubahan tanpa perlu memuat ulang.

Untuk mengedit langsung sebuah skrip, cukup klik di bagian editor pada panel Sources saat menyusuri kode. Buat perubahan yang diinginkan dalam editor Anda, kemudian terapkan perubahan tersebut dengan <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">S</kbd> (atau <kbd class="kbd">Cmd</kbd> + <kbd class="kbd">S</kbd> pada Mac). Pada titik ini, seluruh file JS akan dihubungkan ke dalam VM dan semua definisi fungsi akan diperbarui. 

Sekarang, Anda bisa melanjutkan eksekusi; skrip modifikasi Anda akan dieksekusi menggantikan yang asli, dan Anda bisa mengamati efek perubahan tersebut.

#### Contoh

![Pengeditan langsung](imgs/image_18.png)

Kami menduga bahwa parameter `dow`, dalam setiap kasus, berubah +1 ketika
diteruskan ke fungsi `setone()` – sehingga, nilai `dow<` pada saat 
diterima, adalah 1 padahal seharusnya 0, 2 padahal seharusnya 1, dll. Untuk 
menguji dengan cepat apakah pengurangan nilai yang diteruskan mengonfirmasikan bahwa ini adalah masalah,
kami menambahkan baris 17 di awal fungsi, lakukan dengan 
<kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">S</kbd> dan lanjutkan.

## Mengelola eksekusi thread {: #threads }

Gunakan panel **Threads** pada panel Sources untuk menghentikan sementara, masuk ke, dan
memeriksa thread lainnya, seperti thread service worker atau web worker.

Untuk mendemonstrasikan panel Threads, bagian ini menggunakan demo berikut:
[Contoh dasar Web Worker](http://mdn.github.io/simple-web-worker/).

Jika Anda membuka DevTools pada aplikasi, Anda bisa melihat bahwa skrip utama terletak
di `main.js`:

![Skrip utama](imgs/main-script.png)

Dan skrip web worker terletak di `worker.js`:

![Skrip worker](imgs/worker-script.png)

Skrip utama mendengarkan perubahan pada bidang masukan **Multiply number 1** atau
**Multiply number 2**. Setelah perubahan, skrip utama mengirimkan
pesan ke web worker dengan nilai dari dua angka yang diperbanyak. Web worker
melakukan pelipatgandaan dan kemudian meneruskan hasilnya kembali ke
skrip utama.

Misalkan Anda menyetel breakpoint di `main.js` yang terpicu ketika
angka pertama berubah:

![Breakpoint skrip utama](imgs/main-script-breakpoint.png)

Dan Anda juga menyetel breakpoint di `worker.js` ketika worker
menerima pesan:

![Breakpoint skrip worker](imgs/worker-script-breakpoint.png)

Memodifikasi angka pertama di UI aplikasi memicu kedua breakpoint.

![Breakpoint skrip utama dan worker dipicu](imgs/breakpoints-triggered.png)

Dalam panel Threads, panah biru menunjukkan thread yang sedang
dipilih. Misalnya, dalam tangkapan layar di atas, thread **Utama** dipilih. 

Semua kontrol
DevTools untuk menyusuri kode (melanjutkan atau menghentikan sementara eksekusi skrip,
Melangkahi panggilan fungsi berikutnya, Masuk ke dalam panggilan fungsi berikutnya, dll.) berkaitan
dengan thread tersebut. Dengan kata lain, jika Anda menekan tombol **Resume script execution**
selagi DevTools Anda terlihat seperti tangkapan layar di atas, thread 
Utama akan melanjutkan eksekusi, namun thread web worker
masih akan dihentikan sementara. Bagian **Call Stack** dan **Scope** juga hanya 
menampilkan informasi untuk thread Utama.

Bila Anda ingin menyusuri kode untuk thread web worker, atau melihat cakupan
dan informasi tumpukan panggilan, klik saja pada label di panel Threads,
sehingga panah biru muncul di sebelahnya. Tangkapan layar di bawah ini menunjukkan bagaimana
tumpukan panggilan dan informasi cakupan berubah setelah memilih thread worker.
Sekali lagi, jika Anda menekan salah satu tombol penyusuran kode (melanjutkan
eksekusi skrip, melangkahi panggilan fungsi berikutnya, dll.), aksi tersebut hanya
akan berkaitan dengan thread worker. Thread Utama tidak terpengaruh.

![thread worker dalam fokus](imgs/worker-thread.png)


{# wf_devsite_translation #}
