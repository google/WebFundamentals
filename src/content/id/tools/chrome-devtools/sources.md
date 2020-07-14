project_path: /web/tools/chrome-devtools/_project.yaml
book_path: /web/tools/chrome-devtools/_book.yaml
description: Melihat dan mengedit file, membuat Snippet, men-debug JavaScript, dan menyiapkan Workspace di panel Sumber Chrome DevTools.

{# wf_blink_components: Platform>DevTools #}
{# wf_updated_on: 2020-07-10 #}
{# wf_published_on: 2018-01-09 #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# Ringkasan Panel Sumber {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Gunakan panel **Sources** Chrome DevTools untuk:

* [Melihat file](#files).
* [Mengedit CSS dan JavaScript](#edit).
* [Membuat dan menyimpan **Snippets** JavaScript](#snippets), yang bisa Anda jalankan di Halaman mana pun.
  **Snippets** serupa dengan bookmarklet.
* [Debug JavaScript](#debug).
* [Siapkan Workspace](#workspace), sehingga perubahan yang Anda buat di DevTools tersimpan ke kode
  pada sistem file Anda.

## Melihat file {: #files }

Gunakan panel **Network** untuk melihat resource yang dimuat halaman.

<figure>
  <img src="images/sources-network-pane.png"
       alt="Panel Network"/>
  <figcaption>
    <b>Gambar 1</b>. <b>Panel</b> Network
  </figcaption>
</figure>

Bagaimana panel **Network** diatur:

* Tingkat atas, seperti `top` dalam <b>Gambar 1</b>, mewakili [frame HTML][frame].
  Anda akan menemukan `top` di setiap halaman yang Anda kunjungi. `top` mewakili frame dokumen
  utama.
* Tingkat kedua, seperti `developers.google.com` dalam <b>Gambar 1</b>, mewakili
  [asal][origin].
* Tingkat ketiga, tingkat keempat, dan seterusnya, mewakili direktori dan resource yang
  dimuat dari asal tersebut. Misalnya, dalam <b>Gambar 1</b> lokasi lengkap ke
  resource `devsite-googler-button` adalah
  `developers.google.com/_static/f6e16de9fa/css/devsite-googler-button`

[frame]: https://www.w3.org/TR/html401/present/frames.html
[origin]: https://www.w3.org/TR/2011/WD-html5-20110525/origin-0.html

Klik file di panel **Network** untuk melihat konten di dalamnya di panel **Editor**. Anda
dapat melihat berbagai jenis file. Untuk gambar, Anda melihat pratinjau gambar.

<figure>
  <img src="images/sources-editor-pane.png"
       alt="Melihat file di panel Editor"/>
  <figcaption>
    <b>Gambar 2</b>. Melihat konten <code>jquery-bundle.js</code> di panel <b>Editor</b>
    
  </figcaption>
</figure>

## Edit CSS dan JavaScript {: #edit }

Gunakan panel **Editor** untuk mengedit CSS dan JavaScript.  DevTools mengupdate
halaman untuk menjalankan kode baru Anda. Misalnya, jika Anda mengedit `background-color` elemen, Anda akan
melihat perubahan tersebut langsung berlaku.

<figure>
  <img src="images/edit-css.gif"
       alt="Mengedit CSS di panel Editor"/>
  <figcaption>
    <b>Gambar 3</b>. Mengedit CSS di panel <b>Editor</b> untuk mengubah warna latar belakang sebuah
    elemen dari biru menjadi merah
  </figcaption>
</figure>

Perubahan CSS akan segera berlaku, tidak perlu menyimpan. Agar perubahan JavaScript diterapkan, tekan
<kbd>Command</kbd>+<kbd>S</kbd> (Mac) atau <kbd>Control</kbd>+<kbd>S</kbd> (Windows, Linux).
DevTools tidak menjalankan kembali skrip, jadi satu-satunya perubahan JavaScript yang berlaku adalah yang
Anda buat di dalam fungsi. Misalnya, di <b>Gambar 4</b>, perhatikan bagaimana `console.log('A')` tidak
berjalan, sedangkan `console.log('B')` berjalan. Jika DevTools menjalankan kembali seluruh skrip setelah melakukan
perubahan, maka teks `A` akan dicatat ke **Console**.

<figure>
  <img src="images/edit-js.gif"
       alt="Mengedit JavaScript di panel Editor"/>
  <figcaption>
    <b>Gambar 5</b>. Mengedit JavaScript di panel <b>Editor</b> 
  </figcaption>
</figure>

DevTools menghapus perubahan CSS dan JavaScript saat Anda memuat ulang halaman. Lihat
[Menyiapkan Workspace](#workspace) untuk mempelajari cara menyimpan perubahan ke sistem
file Anda.

## Membuat, menyimpan, dan menjalankan Snippet {: #snippets }

Snippet adalah skrip yang dapat Anda jalankan di halaman mana pun. Bayangkan jika Anda harus berulang kali mengetikkan
kode berikut di **Console** untuk memasukkan library jQuery ke halaman, sehingga
Anda dapat menjalankan perintah jQuery dari **Console**:

    let script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-3.2.1.min.js';
    script.crossOrigin = 'anonymous';
    script.integrity = 'sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=';
    document.head.appendChild(script);

Sebagai gantinya, Anda dapat menyimpan kode ini dalam **Snippet** dan menjalankannya dengan beberapa klik tombol,
kapan pun Anda membutuhkannya. DevTools menyimpan **Snippet** ke sistem file Anda.

<figure>
  <img src="images/snippet.png"
       alt="Snippet yang memasukkan library jQuery ke halaman."/>
  <figcaption>
    <b>Gambar 6</b>. <b>Snippet</b> yang memasukkan library jQuery ke halaman
  </figcaption>
</figure>

Untuk menjalankan **Snippet**:

* Buka file melalui panel **Snippets**, dan klik **Run**! [Tombol Jalankan][run]{:.cdt-inl}.
* Buka [**Command Menu**][CM], hapus karakter `>`, ketik `!`, ketik nama
  **Snippet** Anda, lalu tekan <kbd>Enter</kbd>.

[CM]: /web/tools/chrome-devtools/ui#command-menu
[run]: images/run-snippet.png

Lihat [Menjalankan Snippet Kode dari Halaman Mana Pun][snip] untuk mempelajari lebih lanjut.

[snip]: /web/tools/chrome-devtools/snippets

## Debug JavaScript {: #debug }

Daripada menggunakan `console.log()` untuk menyimpulkan di mana kesalahan JavaScript Anda, pertimbangkan menggunakan
fitur proses debug Chrome DevTools sebagai gantinya. Gagasan umumnya adalah menetapkan breakpoint, yang
merupakan tempat penghentian intensional dalam kode, lalu memproses eksekusi kode Anda,
satu baris sekaligus. Saat memproses kode, Anda dapat melihat dan mengubah nilai dari semua
properti dan variabel yang ditetapkan saat ini, menjalankan JavaScript di **Console**, dan masih banyak lagi.

Lihat [Memulai dengan Proses Debug JavaScript](/web/tools/chrome-devtools/javascript/) untuk mempelajari
dasar proses debug di DevTools.

<figure>
  <img src="images/debugging.png"
       alt="Proses Debug JavaScript"/>
  <figcaption>
    <b>Gambar 7</b>. Proses Debug JavaScript
  </figcaption>
</figure>

## Menyiapkan Workspace {: #workspace }

Secara default, saat Anda mengedit panel **Sources**, perubahan tersebut hilang saat Anda
memuat ulang halaman. **Workspaces** memungkinkan Anda untuk menyimpan perubahan yang Anda buat di DevTools ke
sistem file Anda. Pada dasarnya, dengan **Workspaces** Anda bisa menggunakan DevTools sebagai editor kode.

Lihat [Menyiapkan Persistensi dengan DevTools Workspace][WS] untuk memulai.

[WS]: /web/tools/chrome-devtools/workspaces/

## Masukan {: #feedback }

{% include "web/_shared/helpful.html" %}
