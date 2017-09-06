project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Gunakan panel Styles di Chrome DevTools untuk memeriksa dan mengubah gaya CSS yang terkait dengan sebuah elemen.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2015-04-13 #}

# Mengedit Gaya {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

Gunakan panel <strong>Styles</strong> untuk mengubah gaya CSS
yang terkait dengan sebuah elemen.

![Panel Styles](imgs/styles-pane.png)


### TL;DR {: .hide-from-toc }
- Panel styles dapat digunakan untuk mengubah CSS secara lokal dengan berbagai cara, termasuk mengedit gaya yang ada, menambahkan gaya baru, atau menambahkan aturan untuk gaya.
- Jika Anda ingin gaya tetap ada (tidak hilang saat pemuatan ulang), Anda harus menetapkannya di workspace development Anda.


## Memeriksa gaya yang diterapkan pada sebuah elemen

[Pilih elemen](edit-dom#inspect-an-element) untuk memeriksa gayanya. 
Panel **Styles** menampilkan aturan CSS yang berlaku pada elemen yang dipilih, 
dari prioritas tertinggi hingga terendah:

* Di bagian atas adalah `element.style`. Gaya ini diterapkan secara langsung pada 
  elemen menggunakan properti gaya (misalnya, 
  `<p style="color:green">`), atau diterapkan di DevTools.

* Berikut ini semua aturan CSS yang cocok dengan elemen. Misalnya, di
  tangkapan layar di bawah elemen yang dipilih menerima `line-height:24px` dari
  sebuah aturan yang didefinisikan di `tools.css`.

* Berikut adalah gaya yang diwarisi, yang termasuk aturan gaya apa pun
  yang dapat diwarisi yang cocok dengan pendahulu elemen yang dipilih. Misalnya, di
  tangkapan layar berikut, elemen yang dipilih mewarisi `display:list-item` dari
  `user agent stylesheet`.

Setiap label pada gambar berikut ini dijelaskan di bawah gambar, sesuai dengan nomornya.

![Panel Styles beranotasi](/web/tools/chrome-devtools/inspect-styles/imgs/styles-annotated.png)

1. Gaya yang terkait dengan pemilih yang cocok dengan elemen.
2. [Stylesheet agen-pengguna](http://meiert.com/en/blog/20070922/user-agent-style-sheets/)
   diberi label yang jelas dan sering kali ditimpa oleh CSS di laman web Anda.
3. Aturan yang telah ditimpa oleh **aturan berjenjang** ditampilkan sebagai
   teks yang dicoret.
4. Gaya yang **Diwarisi** ditampilkan berkelompok di bawah header "Inherited
   from `<NODE>`". Klik simpul DOM di header untuk masuk ke
   posisinya di tampilan pohon DOM. ([Tabel properti CSS 2.1
](http://www.w3.org/TR/CSS21/propidx.html) menampilkan properti mana
   yang bisa diwarisi.)
5. Entri yang berwarna abu-abu adalah aturan yang tidak didefinisikan tetapi
   **dihitung pada waktu proses**.

Memahami cara kerja jenjang dan warisan sangat penting untuk
melakukan debug pada gaya Anda. Jenjang berkaitan dengan cara pemberian bobot pada deklarasi CSS
untuk menentukan aturan mana yang harus didahulukan saat tumpang tindih dengan aturan lain. Pewarisan berkaitan dengan bagaimana elemen HTML
mewarisi properti CSS dari elemen yang mengandungnya (pendahulu). Untuk informasi selengkapnya,
lihat [dokumentasi W3C tentang jenjang](http://www.w3.org/TR/CSS2/cascade.html).

## Memeriksa elemen yang dipengaruhi oleh pemilih

Arahkan kursor ke atas pemilih CSS di panel **Styles** untuk menampilkan semua
elemen yang dipengaruhi oleh pemilih. Misalnya, di tangkapan layar 
berikut, kursor diarahkan ke atas pemilih 
`.wf-tools-guide__section-link a`. Di laman yang aktif, Anda bisa melihat semua elemen 
`<a>` yang dipengaruhi oleh pemilih. 

![menampilkan elemen yang terpengaruh oleh pemilih](imgs/selector-hover.png)

**Catatan**: fitur ini hanya menyoroti elemen di tampilan yang terlihat; bisa saja 
ada elemen lain di luar tampilan yang terlihat yang juga dipengaruhi oleh pemilih. 

## Menambahkan, mengaktifkan, dan menonaktifkan kelas CSS {:#classes}

Klik tombol **.cls** untuk menampilkan semua kelas CSS yang terkait dengan
elemen yang saat ini dipilih. Dari sana, Anda bisa:

* Mengaktifkan atau menonaktifkan kelas yang saat ini terkait dengan elemen.
* Menambahkan kelas baru ke elemen. 

![panel classes](imgs/classes.png)

## Mengedit nama atau nilai properti yang sudah ada

Klik nama atau nilai properti CSS untuk mengeditnya. Saat nama atau nilai 
disorot, tekan <kbd>Tab</kbd> untuk berpindah ke depan ke properti, nama,
atau pemilih berikutnya. Tahan <kbd>Shift</kbd> dan tekan <kbd>Tab</kbd> untuk berpindah ke belakang.

Saat mengedit nilai properti CSS numerik, tambah dan kurangi nilai dengan 
pintasan keyboard berikut:

* <kbd>Up</kbd> dan <kbd>Down</kbd> untuk menambah dan mengurangi nilai sebanyak 1,
  atau sebanyak .1 jika nilai saat ini antara -1 dan 1.
* <kbd>Alt</kbd>+<kbd>Up</kbd> dan <kbd>Alt</kbd>+<kbd>Down</kbd> untuk 
  menambah dan mengurangi nilai sebanyak 0,1.
* <kbd>Shift</kbd>+<kbd>Up</kbd> untuk menambah sebanyak 10 dan 
  <kbd>Shift</kbd>+<kbd>Down</kbd> untuk mengurangi sebanyak 10.
* <kbd>Shift</kbd>+<kbd>Page Up</kbd> (Windows, Linux) atau 
  <kbd>Shift</kbd>+<kbd>Function</kbd>+<kbd>Up</kbd> (Mac) untuk menambah 
  nilai sebanyak 100. <kbd>Shift</kbd>+<kbd>Page Down</kbd> (Windows, Linux) atau 
  <kbd>Shift</kbd>+<kbd>Function</kbd>+<kbd>Down</kbd> (Mac) untuk mengurangi 
  nilai sebanyak 100. 

## Menambahkan deklarasi properti baru

Klik ruang kosong di dalam aturan CSS yang bisa diedit untuk membuat deklarasi baru. 
Ketikkan atau tempel CSS ke dalam panel **Styles**. Properti dan nilainya 
di-parse dan dimasukkan ke dalam bidang yang sesuai.

Note: Untuk mengaktifkan atau menonaktifkan deklarasi gaya, centang atau hapus centang di kotak centang di sebelahnya.

## Menambahkan aturan gaya

Klik tombol **New Style Rule** 
(![tombol new style rule](imgs/new-style-rule.png){:.inline}) untuk menambahkan 
aturan CSS baru. 

Klik dan tahan tombol untuk memilih pada stylesheet mana aturan akan ditambahkan. 

## Menambahkan atau menghapus gaya dinamis (kelas semu) {:#pseudo-classes}

Anda bisa secara manual menyetel pemilih kelas semu dinamis (seperti `:active`, 
`:focus`, `:hover`, dan `:visited`) pada elemen. 

Ada dua cara untuk menetapkan status dinamis ini pada elemen:

* Klik kanan elemen di dalam panel **Elements**, lalu pilih
  kelas semu target dari menu untuk mengaktifkan atau menonaktifkannya.
  
  ![klik kanan elemen 
  untuk mengaktifkan pemilih kelas semu](imgs/pseudoclass-rightclick.png)

* Pilih elemen di panel **Elements**, klik tombol **:hov**
  di panel **Styles**, dan gunakan kotak centang untuk mengaktifkan atau menonaktifkan 
  pemilih untuk elemen yang saat ini dipilih.

  ![panel :hov](imgs/hov.png)

## Menambahkan background-color atau color pada aturan gaya

Panel **Styles** menyediakan pintasan untuk menambahkan deklarasi `color` dan
`background-color` pada aturan gaya.

Di bagian kanan bawah aturan gaya, terdapat ikon tiga titik. Anda perlu 
mengarahkan kursor ke atas aturan gaya untuk melihatnya.

![ikon tiga titik dalam kumpulan aturan](imgs/rule-set-three-dots-icon.png)

Arahkan kursor ke atas ikon ini untuk menampilkan tombol untuk menambahkan deklarasi `color` 
(![menambahkan deklarasi add color](imgs/add-color.png){:.inline})
atau deklarasi `background-color` (![menambahkan deklarasi 
background-color](imgs/add-background-color.png){:.inline}). Klik salah satu
tombol ini untuk menambahkan deklarasi ke aturan gaya. 

## Mengubah warna dengan Color Picker {:#color-picker}

Untuk membuka **Color Picker**, temukan deklarasi CSS di panel **Styles** 
yang mendefinisikan warna (misalnya `color: blue`). Di sebelah kiri nilai 
deklarasi, terdapat kotak kecil berwarna. Warna kotak tersebut cocok dengan 
nilai deklarasi. Klik kotak kecil ini untuk membuka **Color Picker**.

![membuka color picker](imgs/open-color-picker.jpg)

Anda bisa berinteraksi dengan **Color Picker** dalam beberapa cara:

1. **Eyedropper**. Lihat [Eyedropper](#eyedropper) untuk informasi selengkapnya.
2. **Current color**. Representasi visual **current value**.
3. **Current value**. Representasi heksadesimal, RGBA, atau HSL 
   **current color**.
4. **Color palette**. Lihat [Palet warna](#color-palettes) untuk informasi
   selengkapnya. 
5. **Tint and shade selector**.
6. **Hue selector**.
7. **Opacity selector**.
8. **Color value selector**. Klik untuk beralih antara RGBA, HSL, dan
   heksadesimal. 
9. **Color palette selector**. Klik untuk memilih template lain.

![color picker beranotasi](imgs/annotated-color-picker.jpg)

[md]: https://www.google.com/design/spec/style/color.html

### Eyedropper {:#eyedropper}

Klik tombol **eyedropper** untuk mengaktifkannya
(![eyedropper diaktifkan](imgs/eyedropper-enabled.png){:.inline}), arahkan kursor ke atas suatu
warna pada laman yang aktif, lalu klik untuk menyetel nilai deklarasi
yang saat ini dipilih menjadi warna yang sedang ditunjuk kursor.

![eyedropper sedang bekerja](imgs/eyedropper.jpg)

### Palet warna {:#color-palettes}

**Color Picker** menyediakan palet warna berikut:

* **Page Colors**. Serangkaian warna otomatis dihasilkan dari CSS 
  laman.
* **Material Design**. Koleksi warna yang konsisten dengan 
  [spesifikasi Material Design][md]. 
* **Custom**. Serangkaian warna apa pun yang Anda pilih. DevTools menyimpan palet 
  khusus Anda, bahkan di semua laman, sampai Anda menghapusnya. 

#### Mengubah palet warna khusus {:#custom-color-palette}

Tekan tombol **tanda plus** untuk menambahkan warna saat ini ke palet. 
Klik dan tahan sebuah warna untuk menyeretnya ke posisi yang berbeda, atau seret 
ke ikon **kotak sampah** untuk menghapusnya. Klik kanan warna dan pilih
**Remove color** untuk menghapusnya. Pilih **Remove all to the right** untuk menghapus
semua warna di sebelah kanan warna yang saat ini dipilih. Klik kanan
di mana saja dalam area palet warna dan pilih **Clear template** untuk 
menghapus semua warna template itu.

## Melihat dan mengedit properti khusus CSS (variabel CSS) {:#custom-properties}

Anda bisa melihat dan mengedit deklarasi yang mendefinisikan atau menggunakan [properti 
khusus CSS][intro] (yang secara informal dikenal sebagai variabel CSS) sama seperti 
deklarasi yang lainnya. 

Properti khusus biasanya [didefinisikan][def] di pemilih `:root`.
 Untuk melihat properti khusus yang didefinisikan di `:root`, periksa elemen `html`.


![properti khusus didefinisikan di :root](imgs/css-var-defined-on-root.png)

Akan tetapi, properti khusus tidak harus didefinisikan di pemilih `:root`.
Jika Anda mendefinisikannya di tempat lain, periksa elemen tempat properti didefinisikan untuk
melihat definisinya.

Anda bisa melihat dan mengedit nilai deklarasi yang menggunakan properti khusus, sama
seperti nilai deklarasi lainnya. 

Jika Anda memilih nilai deklarasi seperti `var(--main-color)` seperti di tangkapan layar
di bawah, artinya deklarasi menggunakan properti khusus. Nilai
ini bisa diedit layaknya nilai deklarasi lainnya. Saat ini, tidak ada cara
untuk langsung masuk ke definisi properti khusus.

![menggunakan properti khusus](imgs/css-var-in-use.png)

[pengantar]: /web/updates/2016/02/css-variables-why-should-you-care
[def]: https://drafts.csswg.org/css-variables/#defining-variables

## Mengedit Sass, Less, atau Stylus

Jika Anda menggunakan Sass, Less, Stylus, atau praprosesor CSS lainnya, mengedit file keluaran CSS yang dihasilkan di editor Styles tidak akan membantu karena file ini tidak dipetakan ke sumber aslinya.

Dengan CSS source maps, DevTools bisa otomatis memetakan file yang dihasilkan ke file sumber aslinya, sehingga Anda dapat mengedit ini secara langsung di panel Sources dan melihat hasilnya tanpa harus meninggalkan DevTools atau menyegarkan laman. 

### Alur kerja praprosesor

Bila Anda memeriksa elemen yang gayanya disediakan oleh file CSS yang dihasilkan, panel Elements akan menampilkan tautan ke file sumber aslinya, bukan file CSS yang dihasilkan.

![Panel Elements menampilkan .scss stylesheet](imgs/sass-debugging.png)

Untuk langsung masuk ke file sumber:

1. Klik tautan untuk membuka file sumber (yang bisa diedit) di panel Sources.
2. <kbd class="kbd">Ctrl</kbd> + **Klik** (atau <kbd class="kbd">Cmd</kbd> + **klik**) pada nama atau nilai properti CSS mana saja untuk membuka file sumber dan langsung masuk ke baris yang sesuai.

![Panel Sources menampilkan file .scss](imgs/sass-sources.png)

Saat Anda menyimpan perubahan file sumber praprosesor CSS di DevTools, praprosesor CSS harus membuat ulang file CSS. Kemudian, DevTools akan memuat ulang file CSS yang baru saja dihasilkan.

### Mengaktifkan/Menonaktifkan CSS source maps & pemuatan ulang otomatis

**CSS source maps diaktifkan secara default**. Anda bisa memilih untuk mengaktifkan pemuatan ulang otomatis file CSS yang dihasilkan. Untuk mengaktifkan CSS source maps dan pemuatan ulang CSS:

1. Buka Settings DevTools dan klik **General**.
2. Aktifkan **Enable CSS source maps** dan **Auto-reload generated CSS**.

### Persyaratan dan Gotcha

- **Perubahan yang dibuat di edit eksternal** tidak terdeteksi oleh DevTools sampai tab Sources yang berisi file sumber yang terkait kembali mendapatkan fokus.
- **Pengeditan secara manual file CSS** yang dihasilkan oleh Sass/LESS/atau compiler lain akan merusak hubungan source maps sampai lama dimuat ulang.
- **Menggunakan <a href="/web/tools/setup/setup-workflow">Workspace</a>?** Pastikan file CSS yang dihasilkan juga dipetakan ke dalam workspace. Anda bisa memverifikasinya dengan melihat pohon sebelah kanan panel Sources dan melihat CSS disajikan dari folder lokal Anda.
- **Agar DevTools otomatis memuat ulang gaya** saat Anda mengubah file sumber, praprosesor Anda harus disiapkan untuk menghasilkan file CSS kapan saja terjadi perubahan file sumber. Jika tidak, Anda harus menghasilkan kembali file CSS secara manual dan memuat ulang laman untuk melihat perubahan.
- **Anda harus mengakses situs atau aplikasi Anda dari server web** (bukan URL **file://**) dan server harus menyajikan file CSS serta source maps (.css.map) dan file sumber (.scss, dsb.).
- Jika Anda _tidak_ menggunakan fitur Workspace, server web juga harus menyediakan header `Last-Modified`.

Pelajari cara menyiapkan source maps di [Menyiapkan Praprosesor CSS & JS](/web/tools/setup/setup-preprocessors)




{# wf_devsite_translation #}
