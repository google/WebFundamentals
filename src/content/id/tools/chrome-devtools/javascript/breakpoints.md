project_path: /web/tools/chrome-devtools/_project.yaml
book_path: /web/tools/chrome-devtools/_book.yaml
description: Pelajari seluruh cara menghentikan kode di Chrome DevTools.

{# wf_updated_on: 2020-07-10 #}
{# wf_published_on: 2017-02-03 #}
{# wf_blink_components: Platform>DevTools #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# Hentikan Kode dengan Titik Putus {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Gunakan titik putus untuk menghentikan kode JavaScript. Panduan ini menjelaskan setiap jenis
titik putus yang tersedia di DevTools, juga kapan menggunakan dan cara
mengatur setiap jenis. Untuk tutorial praktik langsung tentang proses debug, baca [Memulai
dengan Proses Debug JavaScript di Chrome
DevTools](/web/tools/chrome-devtools/javascript/).

## Ringkasan tentang kapan menggunakan setiap tipe titik putus {: #overview }

Tipe titik putus paling terkenal adalah baris kode. Tetapi titik putus
baris kode tidak efisien diatur, terutama jika Anda tidak tahu persis
di mana mencari, atau jika Anda mengerjakan codebase besar. Anda bisa
menghemat waktu saat proses debug dengan mengetahui cara dan kapan menggunakan tipe lain
titik putus.

<table>
  <tr><th>Tipe Titik Putus</th><th>Gunakan Tipe Ini Saat Anda Ingin Berhenti...</th></tr>
  <tr>
    <td><a href="#loc">Baris kode</a></td>
    <td>
      Di region kode yang tepat.
    </td>
  </tr>
  <tr>
    <td><a href="#conditional-loc">Baris kode bersyarat</a></td>
    <td>
      Di region kode yang tepat, tetapi hanya beberapa kondisi lain yang benar.
    </td>
  </tr>
  <tr>
    <td><a href="#dom">DOM</a></td>
    <td>
      Pada kode yang mengubah atau menghapus node DOM
      tertentu, atau turunannya.
    </td>
  </tr>
  <tr>
    <td><a href="#xhr">XHR</a></td>
    <td>
      Bila URL XHR berisi pola string.
    </td>
  </tr>
  <tr>
    <td><a href="#event-listeners">Pemerhati kejadian</a></td>
    <td>
      Di kode yang berjalan setelah kejadian, seperti
      <code>click</code>, diinisiasi.
    </td>
  </tr>
  <tr>
    <td><a href="#exceptions">Pengecualian</a></td>
    <td>
      Di kode baris yang mengembalikan pengecualian
      yang tertangkap atau tidak tertangkap.
    </td>
  </tr>
  <tr>
    <td><a href="#function">Fungsi</a></td>
    <td>
      Kapan pun fungsi tertentu dipanggil.
    </td>
  </tr>
</table>

## Titik putus baris kode {: #loc }

Gunakan titik putus baris kode bila Anda tahu wilayah region tepat yang
perlu Anda selidiki. DevTools *selalu* berhenti sebelum baris kode ini
dijalankan.

Untuk mengatur titik putus baris kode di DevTools:

1. Klik tab **Sources**.
1. Buka file yang berisi baris kode yang ingin Anda pecahkan.
1. Ke baris kode.
1. Di sebelah kiri baris kode adalah kolom nomor baris. Klik kolom itu. Ikon
   biru muncul di bagian atas kolom nomor baris.

<figure>
  <img src="imgs/loc-breakpoint.png"
       alt="Titik putus baris kode."
  <figcaption>
    <b>Gambar 1</b>: Titik putus baris kode diatur di baris <b>29</b>
  </figcaption>
</figure>

### Titik putus baris kode dalam kode Anda {: #debugger }

Panggil `debugger` dari kode Anda untuk berhenti di baris itu. Ini setara dengan
a [titik putus baris kode](#loc), kecuali titik putus itu diatur dalam kode
Anda, bukan di UI DevTools.

    console.log('a');
    console.log('b');
    debugger;
    console.log('c');

### Titik putus baris kode bersyarat {: #conditional-loc }

Gunakan titik putus baris kode bersyarat bila Anda tahu region
kode yang tepat yang perlu Anda selidiki, tetapi Anda ingin berhenti hanya bila beberapa
kondisi lain benar.

Untuk mengatur titik putus baris kode bersyarat:

1. Klik tab **Sources**.
1. Buka file yang berisi baris kode yang ingin Anda pecahkan.
1. Ke baris kode.
1. Di sebelah kiri baris kode adalah kolom nomor baris. Klik kanan kolom itu.
1. Pilih **Add conditional breakpoint**. Dialog muncul di bawah
   baris kode.
1. Masukkan kondisi dalam dialog.
1. Tekan <kbd>Enter</kbd> untuk mengaktifkan titik putus. Ikon oranye muncul
   di bagian atas kolom nomor baris.

<figure>
  <img src="imgs/conditional-loc-breakpoint.png"
       alt="Titik putus baris kode bersyarat."
  <figcaption>
    <b>Gambar 2</b>: Titik putus baris kode bersyarat diatur di baris
    <b>32</b>
  </figcaption>
</figure>

### Kelola titik putus baris kode {: #manage-loc }

Gunakan panel **Breakpoints** untuk menonaktifkan atau menghapus titik putus baris kode dari
satu lokasi.

<figure>
  <img src="imgs/breakpoints-pane.png"
       alt="Panel Breakpoints."
  <figcaption>
    <b>Gambar 3</b>: Panel <b>Breakpoints</b> menampilkan dua titik putus
    baris kode: satu di baris 15 dari <code>get-started.js</code>, yang lain di
    baris 32
  </figcaption>
</figure>

* Centang kotak centang di samping entri untuk menonaktifkan titik putus itu.
* Klik kanan untuk menghapus titik putus itu.
* Klik kanan di mana pun di panel **Breakpoints** untuk menonaktifkan semua
  titik putus, menonaktifkan semua titik henti, atau menghapus semua titik putus. Dengan menonaktifkan
  semua titik putus setara dengan menghapus centang kotak masing-masing. Dengan menonaktifkan semua
  titik henti memerintahkan DevTools untuk mengabaikan semua titik putus baris kode, tetapi
  juga mempertahankan kondisi aktif semua titik ini, sehingga ada dalam kondisi
  sama seperti sebelum Anda mengaktifkan ulang titik ini.

<figure>
  <img src="imgs/deactivated-breakpoints.png"
       alt="Titik putus nonaktif di panel Breakpoints."
  <figcaption>
    <b>Gambar 4</b>: Titik putus nonaktif di panel <b>Breakpoints</b>
    tidak aktif dan transparan
  </figcaption>
</figure>

## Titik putus perubahan DOM {: #dom }

Gunakan titik putus perubahan DOM bila Anda ingin berhenti di kode yang mengubah
node DOM atau turunannya.

Untuk mengatur titik putus perubahan DOM:

1. Klik tab **Elements**.
1. Ke elemen tempat Anda ingin mengatur titik putus.
1. Klik kanan elemen.
1. Arahkan kursor ke atas **Break on** lalu pilih **Subtree modifications**, **Attribute
  modifications**, atau **Node removal**.

<figure>
  <img src="imgs/dom-change-breakpoint.png"
       alt="Menu konteks untuk membuat titik putus perubahan DOM."
  <figcaption>
    <b>Gambar 5</b>: Menu konteks untuk membuat titik putus perubahan DOM.
  </figcaption>
</figure>

### Titik putus perubahan DOM {: #dom-types }

* **Subtree modifications**. Dipicu bila turunan dari node yang saat ini dipilih
  telah dihapus, ditambah, atau konten turunan telah berubah. Tidak dipicu
  bila ada perubahan atribut node turunan, atau ada perubahan pada
  node yang saat ini dipilih.

* **Attributes modifications**: Dipicu bila ada atribut yang ditambah atau dihapus
  pada node yang saat ini dipilih, atau bila ada nilai atribut yang berubah.

* **Node Removal**: Dipicu bila node yang saat ini dipilih dihapus.

## Titik putus XHR/Fetch {: #xhr }

Gunakan titik putus XHR bila Anda ingin memutus URL permintaan dari XHR
berisi string tertentu. DevTools berhenti di baris kode tempat
XHR memanggil `send()`.

Note: Fitur ini juga berfungsi dengan permintaan [Fetch][Fetch].

Salah satu contoh kapan fungsi ini bermanfaat bila Anda melihat halaman
meminta URL salah, dan Anda ingin cepat menemukan kode sumber AJAX atau
Fetch yang menyebabkan permintaan salah.

Untuk mengatur titik putus XHR:

1. Klik tab **Sources**.
1. Luaskan panel **XHR Breakpoints**.
1. Klik **Add breakpoint**.
1. Masukkan string tempat Anda ingin memutus. DevTools berhenti saat string
   ini ada di mana pun di URL permintaan XHR.
1. Tekan <kbd>Enter</kbd> untuk mengonfirmasi.

<figure>
  <img src="imgs/xhr-breakpoint.png"
       alt="Membuat titik putus XHR."
  <figcaption>
    <b>Gambar 6</b>: Membuat titik putus XHR di <b>XHR Breakpoints</b>
    untuk permintaan apa pun yang berisi <code>org</code> di URL
  </figcaption>
</figure>

[Fetch]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

## Titik putus pemerhati kejadian {: #event-listeners }

Gunakan titik putus pemerhati kejadian saat Anda berhenti di kode pemerhati
kejadian yang berjalan setelah kejadian diinisiasi. Anda bisa memilih kejadian tertentu, seperti
 `click`, atau kategori acara, seperti semua kejadian mouse.

1. Klik tab **Sources**.
1. Luaskan panel **Event Listener Breakpoints**. DevTools menampilkan daftar
   kategori acara, seperti **Animation**.
1. Centang salah satu kategori untuk berhenti setiap kali kejadian apa pun dari kategori itu
   diinisiasi, atau luaskan kategori dan centang kejadian tertentu.

<figure>
  <img src="imgs/event-listener-breakpoint.png"
       alt="Membuat titik putus pemerhati kejadian."
  <figcaption>
    <b>Gambar 7</b>: Membuat titik putus pemerhati kejadian untuk
    <code>deviceorientation</code>
  </figcaption>
</figure>

## Titik putus pengecualian {: #exceptions }

Gunakan titik putus pengecualian bila kamu ingin berhenti di baris kode yang
mengembalikan pengecualian yang tertangkap atau tidak tertangkap.

1. Klik tab **Sources**.
1. Klik **Pause on exceptions** ![Berhenti di
   pengecualian](imgs/pause-on-exceptions.png){:.devtools-inline}. Panel jaringan berubah menjadi biru
   ketika diaktifkan.
1. (Opsional) Centang kotak **Pause On Caught Exceptions** jika Anda juga
   ingin berhenti di pengecualian tertangkap, selain yang tidak tertangkap.

<figure>
  <img src="imgs/uncaught-exception.png"
       alt="Berhenti di pengecualian tidak tertangkap."
  <figcaption>
    <b>Gambar 7</b>: Berhenti di pengecualian tidak tertangkap
  </figcaption>
</figure>

## Fungsi titik putus {: #function }

Panggil `debug(functionName)`, tempat `functionName` adalah fungsi Anda ingin
men-debug, saat Anda ingin menjeda setiap kali fungsi tertentu dipanggil. Anda bisa
memasukkan `debug()` ke kode (seperti `console.log()` pernyataan) atau panggil
dari DevTools Console. `debug()` setara dengan mengatur
[titik putus baris kode](#loc) di baris pertama fungsi.

    function sum(a, b) {
      let result = a + b; // DevTools pauses on this line.
      return result;
    }
    debug(sum); // Pass the function object, not a string.
    sum();


### Pastikan fungsi target dalam cakupan {: #scope }

DevTools mengembalikan `ReferenceError` jika fungsi yang ingin Anda debug
dalam cakupan.

    (function () {
      function hey() {
        console.log('hey');
      }
      function yo() {
        console.log('yo');
      }
      debug(yo); // This works.
      yo();
    })();
    debug(hey); // This doesn't work. hey() is out of scope.

Dengan nemastikan fungsi target dalam cakupan bisa sulit jika Anda
memanggil `debug()` dari DevTools Console. Inilah salah satu strategi:

1. Atur [titik putus baris kode](#loc) suatu tempat di mana fungsi
   dalam cakupan.
1. Picu titik putus.
1. Panggil `debug()` di DevTools Console saat kode masih dijeda
   di titik putus baris kode.

## Masukan {: #feedback }

{% include "web/_shared/helpful.html" %}
