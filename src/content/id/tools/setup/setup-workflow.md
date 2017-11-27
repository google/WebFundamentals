project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Siapkan penulisan persisten di Chrome DevTools sehingga Anda bisa melihat perubahan langsung dan menyiapkan perubahan tersebut di disk.

{# wf_updated_on: 2015-07-30 #}
{# wf_published_on: 2015-07-08 #}

# Menyiapkan Persistensi dengan DevTools Workspace {: .page-title }

{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

Siapkan penulisan persisten di Chrome DevTools sehingga Anda bisa melihat perubahan langsung dan menyiapkan perubahan tersebut di disk.

Chrome DevTools memungkinkan Anda mengubah elemen dan gaya
di laman web dan melihat perubahan secara langsung.
Secara default, jika browser disegarkan perubahan akan hilang
kecuali Anda secara manual menyalin dan menempelkannya ke editor eksternal.

Dengan Workspace, Anda bisa mempersistenkan perubahan tersebut ke disk
tanpa harus meninggalkan Chrome DevTools.
Petakan sumber daya yang disajikan dari server web lokal ke file di disk
dan lihat perubahan yang dibuat pada file tersebut seolah sedang disajikan.


### TL;DR {: .hide-from-toc }
- Jangan salin perubahan secara manual ke file lokal. Gunakan workspace untuk mempertahankan perubahan yang dibuat di DevTools ke sumber daya lokal Anda.
- Dorong file lokal Anda ke browser. Petakan file ke URL.
- Setelah workspace persisten disiapkan, perubahan gaya yang dibuat di panel Elements dipersistenkan secara otomatis; sedangkan perubahan DOM tidak dipertahankan. Sebagai gantinya, persistenkan perubahan elemen di panel Sources.


## Menambahkan file sumber lokal ke workspace

Untuk membuat file sumber di folder lokal bisa diedit di panel Sources:

1. Klik kanan panel sebelah kiri.
2. Pilih **Add Folder to Workspace**.
3. Pilih lokasi folder lokal yang ingin Anda petakan.
4. Klik **Allow** untuk memberikan Chrome izin akses ke folder. 

![Menambahkan Folder ke Workspace](imgs/addfolder.png)

Biasanya, folder lokal berisi file sumber asli situs yang digunakan untuk mengisi situs di server. Jika Anda tidak ingin mengubah file asli tersebut melalui workspace, buat salinan folder dan sebagai gantinya, tentukan sebagai folder workspace.

## Mendorong perubahan yang dipersistenkan

Anda sudah memetakan folder lokal ke workspace
tetapi browser masih menyajikan materi folder jaringan.
Untuk mendorong perubahan persisten secara otomatis di browser,
petakan file lokal di folder ke URL:

1. Klik kanan atau Control+klik file di panel sebelah kiri Sources.
2. Pilih **Map to File System Resource**.
3. Pilih file lokal di workspace persisten.
4. Muat ulang laman di Chrome.

![Memetakan file ke URL](imgs/maptoresource.png)

Dari sini,
Chrome akan memuat URL yang dipetakan,
dan menampilkan materi workspace
sebagai ganti materi jaringan.
Anda bisa bekerja langsung di file lokal tanpa harus
berulang kali beralih dari Chrome dan editor eksternal dan sebaliknya.

## Batasan

Meskipun Workspace sangat canggih, ada beberapa batasan yang perlu Anda ketahui.

* Hanya perubahan gaya di panel Elements yang dipersistenkan; perubahan pada DOM tidak dipersistenkan.

* Hanya gaya yang didefinisikan di CSS eksternal yang bisa disimpan. Perubahan pada `element.style` atau untuk menyisipkan gaya inline. (Jika Anda memiliki gaya inline, gaya ini bisa diubah di panel Sources.)

* Perubahan di panel Elements dipersistenkan langsung tanpa penyimpanan yang eksplisit -- 
<kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">S</kbd> atau <kbd class="kbd">Cmd</kbd> + <kbd class="kbd">S</kbd> (Mac) - jika Anda memiliki sumber daya CSS yang dipetakan ke file lokal.

* Jika Anda memetakan file dari server jauh, bukannya server lokal, saat Anda menyegarkan laman, Chrome memuat ulang laman dari server jauh. Perubahan Anda masih dipersistenkan di disk dan diterapkan ulang jika Anda melanjutkan pengeditan di Workspace.

* Anda harus menggunakan jalur penuh ke file yang dipetakan di browser. Bahkan file index Anda harus menyertakan .html di URL, agar bisa melihat versi stage.

## Pengelolaan file lokal

Selain mengedit file yang sudah ada,
Anda juga bisa menambahkan dan menghapus file
di direktori yang dipetakan di lokal yang Anda gunakan untuk Workspace.

### Menambahkan file

Untuk menambahkan file:

1. Klik kanan folder di panel Sources sebelah kiri.
2. Pilih **New File**.
3. Ketikkan nama untuk file baru, termasuk ekstensinya (mis. `newscripts.js`), lalu tekan **Enter**; file ditambahkan ke folder lokal.

### Menghapus file

Untuk menghapus file:

1. Klik kanan file di panel Sources sebelah kiri.
2. Pilih **Delete** dan klik **Yes** untuk mengonfirmasi.

### Mencadangkan file

Sebelum melakukan perubahan besar pada file,
sebaiknya duplikasikan file asli untuk tujuan pencadangan.

Untuk menduplikasi file:

1. Klik kanan file di panel Sources sebelah kiri.
2. Pilih **Make a Copy...**.
3. Ketikkan nama untuk file termasuk ekstensinya (mis. `mystyles-org.css`) lalu tekan **Enter**.

### Menyegarkan

Bila Anda membuat atau menghapus file langsung di Workspace,
direktori Sources otomatis disegarkan untuk menampilkan perubahan file.
Untuk memaksa penyegaran kapan saja, klik kanan folder dan pilih **Refresh**.

Ini juga berguna jika Anda mengubah file yang dibuka bersamaan di editor eksternal dan ingin menampilkan perubahan di DevTools. Biasanya, DevTools otomatis menangkap perubahan tersebut, tetapi jika Anda ingin memastikan, cukup segarkan folder seperti dijelaskan di atas.

### Menelusuri file atau teks

Untuk menelusuri file yang dimuat di DevTools,
tekan <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">O</kbd> atau <kbd class="kbd">Cmd</kbd> + <kbd class="kbd">O</kbd> (Mac)
untuk membuka dialog penelusuran.
Anda masih bisa melakukan ini di Workspace,
tetapi penelusuran akan diperluas ke file yang dimuat dari jauh
dan file lokal di folder Workspace Anda.

Untuk menelusuri string di file:

1. Buka jendela penelusuran: klik tombol **Show Drawer** ![Show drawer](imgs/show_drawer_button.png){:.inline}, lalu klik **Search**, atau tekan
<kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">F</kbd> atau <kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Opt</kbd> + <kbd class="kbd">F</kbd> (Mac).
2. Ketikkan string ke dalam bidang pencarian dan tekan **Enter**.
3. Jika string adalah ekspresi reguler atau harus tidak peka huruf besar atau kecil, klik kotak yang sesuai.

![Menelusuri string di file](imgs/searchacross.png)

Hasil penelusuran ditampilkan di panel samping Console, ditampilkan menurut nama file, dengan jumlah kecocokan pada setiap file ditampilkan. Gunakan tanda panah **Luaskan** ![Luaskan](imgs/expand_button.png){:.inline} dan **Ciutkan** ![Ciutkan](imgs/collapse_button.png){:.inline} untuk meluaskan atau menciutkan hasil untuk file terkait.



{# wf_devsite_translation #}
