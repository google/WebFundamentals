project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Tampilan pohon DOM di panel Elemen Chrome DevTools menampilkan struktur DOM laman web saat ini. Edit materi dan struktur laman Anda secara langsung melalui pembaruan DOM.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2015-04-29 #}

# Mengedit DOM {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

Tampilan pohon DOM di panel Elemen Chrome DevTools menampilkan struktur DOM laman web saat ini. Edit materi dan struktur laman Anda secara langsung melalui pembaruan DOM.


### TL;DR {: .hide-from-toc }
- DOM mendefinisikan struktur laman Anda. Setiap simpul DOM adalah elemen laman, misalnya simpul header, simpul paragraf.
- Edit langsung materi dan struktur laman Anda secara langsung melalui DOM yang di-render.
- Ingat, Anda tidak bisa mengubah file sumber melalui perubahan DOM di panel Elements. Memuat ulang laman akan menghapus semua modifikasi pohon DOM.
- Pantau kemunculan perubahan pada DOM menggunakan breakpoint DOM.


## Memeriksa elemen {:#inspect-an-element}

Gunakan **panel Elements** untuk memeriksa semua elemen di laman Anda dalam satu
pohon DOM. Pilih elemen apa pun dan periksa gaya yang diterapkan padanya.

<video autoplay muted src="animations/inspect-element.mp4">
</video>

Ada beberapa cara untuk memeriksa elemen:

Klik kanan elemen apa pun pada laman dan pilih **Inspect**.

![Memeriksa elemen via klik-kanan](/web/tools/chrome-devtools/inspect-styles/imgs/right-click-inspect.png)

Tekan <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Shift</kbd>
+ <kbd class="kbd">C</kbd> (Windows) atau <kbd class="kbd">Cmd</kbd>
+ <kbd class="kbd">Shift</kbd> + <kbd class="kbd">C</kbd> (Mac) untuk membuka
DevTools dalam mode Inspect Element, lalu arahkan kursor ke atas elemen. DevTools
otomatis menyorot elemen yang ke atasnya Anda arahkan kursor di panel
**Elements**. Klik elemen untuk keluar dari mode inspect sekaligus membiarkan
elemen disorot di dalam panel **Elements**. 

Klik tombol **Inspect Element**
![ikon Inspect](/web/tools/chrome-devtools/inspect-styles/imgs/inspect-icon.png){:.inline}
untuk masuk ke mode Inspect Element, lalu klik sebuah elemen.

Gunakan metode [`inspect`][inspect] di konsol, misalnya
`inspect(document.body)`.

## Menavigasi DOM

Jelajahi struktur DOM menggunakan mouse atau keyboard.

Di samping simpul yang diciutkan, ada panah yang menunjuk ke kanan:
![simpul diciutkan](imgs/collapsed-node.png){:.inline}

Di samping simpul yang diluaskan, ada panah yang menunjuk ke bawah:
![simpul diluaskan](imgs/expanded-node.png){:.inline}

Menggunakan mouse:

* Klik sekali untuk menyorot simpul.
* Untuk meluaskan simpul, klik dua kali di mana saja atau klik tanda panah di  
  sebelahnya.
* Untuk menciutkan simpul, klik tanda panah di sebelahnya.

Menggunakan keyboard:

* Tekan tombol **Panah Atas** untuk memilih simpul di atas simpul yang sekarang.
* Tekan tombol **Panah Bawah** untuk memilih simpul di bawah simpul yang sekarang.
* Tekan tombol **Panah Kanan** untuk meluaskan simpul yang diciutkan. Tekan
  lagi untuk berpindah ke anak pertama dari simpul (yang sekarang sudah diluaskan). Anda bisa 
  menggunakan teknik ini untuk secara cepat menavigasi simpul yang bertumpuk-tumpuk.

### Menavigasi jejak breadcrumb

Di bagian bawah panel Elements terdapat jejak breadcrumb. 

![Jejak breadcrumb](imgs/breadcrumb-body.png)

Simpul yang saat ini dipilih disorot dengan warna biru. Simpul di sebelah kiri adalah
induk simpul saat ini. Dan di sebelah kirinya adalah induk dari induk tersebut.
Dan begitu seterusnya hingga ke puncak pohon.

![Perluas jejak breadcrumb](imgs/breadcrumb-footer.png)

Jika Anda menavigasi menaiki struktur, sorotan akan pindah:

![Menavigasi ke arah atas jejak breadcrumb](imgs/breadcrumb-trail.png)

DevTools menampilkan sebanyak mungkin item di dalam jejak.
Jika keseluruhan jejak tidak muat di bilah status, elipsis (...) 
akan ditampilkan di tempat jejak terpotong. Klik tanda elipsis untuk menampilkan 
elemen yang tersembunyi:

![Elipsis breadcrumb](imgs/breadcrumb-ellipsis.png)

## Mengedit simpul dan atribut DOM

Untuk mengedit nama atau atribut simpul DOM:

* Klik dua kali langsung pada nama atau atribut simpul.
* Sorot simpul, tekan <kbd>Enter</kbd>, lalu tekan <kbd>Tab</kbd>
  hingga nama atau atribut terpilih.
* Buka [menu tindakan lainnya](#more-actions) dan pilih **Add Attribute** 
  atau **Edit Attribute**. **Edit Attribute** sensitif konteks; bagian yang 
  diklik menentukan apa yang diedit.

Tag penutup akan otomatis diperbarui setelah Anda selesai.

<video autoplay muted src="animations/edit-element-name.mp4">
</video>

### Mengedit simpul DOM dan anaknya sebagai HTML

Untuk mengedit simpul DOM dan anaknya sebagai HTML:

* Buka [menu more actions](#more-actions) dan pilih **Edit as HTML**. 
* Tekan <kbd>F2</kbd> (Windows / Linux) atau <kbd>Fn</kbd>+<kbd>F2</kbd> (Mac).
* Tekan <kbd>Ctrl</kbd>+<kbd>Enter</kbd> (Windows / Linux) atau 
  <kbd>Cmd</kbd>+<kbd>Enter</kbd> (Mac) untuk menyimpan perubahan. 
* Tekan <kbd>Esc</kbd> untuk keluar dari editor tanpa menyimpan.

![edit sebagai HTML](imgs/edit-as-html.png)

## Memindahkan simpul DOM

Klik, tahan, dan seret simpul untuk memindahkannya.

<video autoplay muted src="animations/move-node.mp4">
</video>

## Menghapus simpul DOM

Untuk menghapus simpul DOM:

* Buka [menu more actions](#more-actions) dan pilih **Delete Node**.
* Pilih simpul dan tekan tombol <kbd>Delete</kbd>.

Note: Jika Anda tidak sengaja menghapus simpul, tekan <kbd class='kbd'>Ctrl</kbd> + <kbd class='kbd'>Z</kbd> (atau <kbd class='kbd'>Cmd</kbd> + <kbd class='kbd'>Z</kbd> di Mac) untuk mengurungkan tindakan terakhir.

## Menampilkan menu more actions {:#more-actions}

Menu **more actions** memungkinkan Anda berinteraksi dengan simpul DOM dengan berbagai
cara. Untuk menampilkan menu, klik kanan simpul atau pilih simpul
, lalu tekan tombol **more actions**  (![tombol 
more action](imgs/more-actions-button.png){:.inline}). Tombol ini hanya 
ditampilkan pada elemen yang saat ini dipilih.

![menu more actions](imgs/more-actions-menu.png)

## Menggulir agar muncul dalam tampilkan

Saat Anda mengarahkan kursor ke atas atau memilih simpul DOM, simpul yang di-render akan disorot 
di tampilan yang terlihat. Jika simpul digulir keluar dari layar, Anda akan melihat
keterangan alat di atas tampilan jika simpul berada di atas
tampilan yang terlihat saat ini dan keterangan alat di bagian bawah jika simpul berada di bawah
tampilan yang terlihat saat ini. Misalnya, di tangkapan layar berikut, DevTools menandakan bahwa
elemen yang saat ini dipilih di panel **Elements** berada di bawah tampilan yang terlihat.

![elemen di bawah tampilan yang terlihat](imgs/below-viewport.png)

Untuk menggulir laman sehingga simpul muncul di tampilan yang terlihat
,**klik kanan** simpul dan pilih **Scroll into View**.

## Menyetel breakpoint DOM

Setel breakpoint DOM untuk men-debug aplikasi JavaScript yang kompleks.
Misalnya, jika JavaScript mengubah gaya elemen DOM,
setel breakpoint DOM agar terpicu saat atribut elemen diubah. Picu breakpoint pada saat terjadi perubahan DOM berikut: perubahan subpohon, perubahan atribut, penghapusan simpul.

{# include shared/related_guides.liquid inline=true list=page.related-guides.breakpoints #}

### Perubahan Subpohon

Breakpoint perubahan subpohon dipicu saat sebuah elemen anak ditambahkan, dibuang, atau dipindahkan. Misalnya, jika Anda menetapkan breakpoint perubahan subpohon pada elemen `main-content`, kode berikut akan memicu breakpoint:


    var element = document.getElementById('main-content');
    //modify the element's subtree.
    var mySpan = document.createElement('span');
    element.appendChild( mySpan );
    

### Perubahan Atribut

Perubahan atribut terjadi saat atribut sebuah elemen (`class, id, name`) diubah secara dinamis:


    var element = document.getElementById('main-content');
    // class attribute of element has been modified.
    element.className = 'active';
    

### Pembuangan Simpul

Perubahan pembuangan simpul dipicu saat simpul
tersebut dibuang dari DOM:


    document.getElementById('main-content').remove();
    

## Berinteraksi dengan breakpoint DOM

Panel Elements maupun Sources memiliki panel untuk mengelola breakpoint 
DOM.

Setiap breakpoint ditampilkan dengan identifier elemen dan jenis breakpoint.

![Panel DOM breakpoints](imgs/dom-breakpoints-pane.png)

Berinteraksi dengan breakpoint yang ditampilkan bisa dilakukan dengan cara berikut:

* **Arahkan kursor** ke atas identifier elemen untuk menampilkan posisi terkait 
  elemen pada laman (sama dengan mengarahkan kursor ke atas simpul di panel Elements).
* **Klik** elemen untuk memilihnya di panel Elements.
* **Centang atau kosongkan** kotak centang untuk mengaktifkan atau menonaktifkan breakpoint.

Bila Anda memicu breakpoint DOM, breakpoint itu akan disorot di panel 
DOM Breakpoints. Panel **Call Stack** menampilkan **alasan** untuk 
penjedaan debugger:

![Alasan breakpoint](imgs/breakpoint-reason.png)

## Menampilkan event listener elemen

Tampilkan event listener JavaScript yang terkait dengan simpul DOM di panel 
**Event Listeners**. 

![panel event listeners](imgs/event-listeners-pane.png)

Item tingkat atas di panel Event Listeners menampilkan jenis kejadian yang 
memiliki listener terdaftar.

Klik tanda panah di sebelah jenis kejadian (misalnya `click`) untuk melihat 
daftar penangan kejadian yang terdaftar. Setiap penangan diidentifikasi oleh sebuah identifier elemen yang mirip pemilih 
CSS, seperti `document` atau 
`button#call-to-action`. Jika lebih dari satu penangan didaftarkan untuk 
elemen yang sama, elemen akan ditampilkan berulang.

Klik tanda panah luaskan di sebelah identifier elemen untuk melihat properti penangan kejadian. Panel Event Listeners menampilkan properti untuk setiap listener berikut:

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Properti Event Listener &amp; Keterangan</th>
    </tr>
  </thead>
  <tbody>
  	<tr>
      <td data-th="Value"><code>handler</code></td>
      <td data-th="Description">Berisi fungsi callback. Klik kanan fungsi dan pilih <strong>Show Function Definition</strong> untuk melihat tempat fungsi didefinisikan (jika kode sumber tersedia).</td>
    </tr>
    <tr>
      <td data-th="Value"><code>useCapture</code></td>
      <td data-th="Description">Nilai boolean yang menyatakan apakah tanda <a href="https://developer.mozilla.org/en-US/docs/Web/API/EventTarget.addEventListener">useCapture</a> pada <code>addEventListener</code> telah disetel.</td>
    </tr>
  </tbody>
</table>

Note: Banyak ekstensi Chrome yang menambahkan event listener-nya sendiri ke DOM. Jika Anda melihat beberapa event listener yang tidak disetel oleh kode Anda, sebaiknya buka kembali laman Anda di [jendela Samaran](https://support.google.com/chrome/answer/95464). Jendela samaran mencegah ekstensi berjalan secara default.

### Melihat event listener pendahulu

{% comment %}

code for screenshot

<!doctype html>
<html>
<body onload="console.log('onload');">
  <div onfocus="console.log('focus');">
    <button id="button" onclick="console.log('onclick');">click me</button>
  </div>
</body>
</html>

{% endcomment %}

Bila kotak centang **Ancestors** diaktifkan, event listener untuk 
pendahulu simpul yang saat ini dipilih akan ditampilkan, selain
event listener untuk simpul yang saat ini dipilih.

![pendahulu diaktifkan](imgs/ancestors-enabled.png)

Bila kotak centang dinonaktifkan, hanya event listener untuk simpul yang saat ini
dipilih akan ditampilkan.

![pendahulu dinonaktifkan](imgs/ancestors-disabled.png)

### Melihat listener kerangka kerja

{% comment %}

code for screenshot

<!doctype html>
<html>
<script src="https://code.jquery.com/jquery-2.2.0.js"></script>
<body>
  <button id="button">click me, please</button>
  <script>
    $('#button').click(function() {
      $('#button').text('hehe, that tickled, thanks');
    });
  </script>
</body>
</html>

{% endcomment %}

Beberapa kerangka kerja dan pustaka JavaScript membungkus kejadian DOM bawaan ke dalam 
API kejadian khususnya. Dulu, ini menyebabkan pemeriksaan event listener
dengan DevTools menjadi sulit, karena definisi fungsi hanya akan mereferensi balik ke 
kode kerangka kerja atau pustaka. Fitur **Framework listeners** memecahkan 
masalah ini.

Bila kotak centang **Framework listeners** diaktifkan, DevTools secara otomatis
akan menyelesaikan bagian pembungkusan kerangka kerja atau pustaka kode kejadian, lalu
memberitahukan tempat Anda sebenarnya mengikatkan kejadian itu di kode Anda sendiri.

![listener kerangka kerja diaktifkan](imgs/framework-listeners-enabled.png)

Bila kotak centang **Framework listeners** dinonaktifkan, kode event listener
mungkin akan diselesaikan di suatu bagian di kode kerangka kerja atau pustaka. 

![listener kerangka kerja dinonaktifkan](imgs/framework-listeners-disabled.png)



[inspect]: /web/tools/chrome-devtools/debug/command-line/command-line-reference#inspect


{# wf_devsite_translation #}
