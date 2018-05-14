project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Layout adalah tempat browser mengetahui informasi geometris untuk elemen: ukuran dan lokasinya di laman. Setiap elemen akan memiliki informasi ukuran yang eksplisit atau implisit berdasarkan CSS yang digunakan, materi elemen, atau elemen induk. Proses ini disebut Layout di Chrome.

# Hindari Layout Besar dan Kompleks serta Layout Thrashing {: .page-title }

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2015-03-20 #}

{% include "web/_shared/contributors/paullewis.html" %}

Layout adalah tempat browser mengetahui informasi geometris untuk 
elemen: ukuran dan lokasinya di laman. Setiap elemen akan memiliki 
informasi ukuran yang eksplisit atau implisit berdasarkan CSS yang digunakan, 
materi elemen, atau elemen induk. Proses ini disebut Layout 
di Chrome, Opera, Safari, dan Internet Explorer. Di Firefox ini disebut 
Ubah Posisi/Geometri, namun pada dasarnya proses ini sama.

Demikian pula dengan penghitungan gaya, persoalan mendesak untuk biaya layout adalah:

1. Jumlah elemen yang memerlukan layout.
2. Kompleksitas layout itu.

### TL;DR {: .hide-from-toc }

* Layout biasanya mencakup keseluruhan dokumen.
* Jumlah elemen DOM akan memengaruhi kinerja; sebisa mungkin Anda harus menghindari memicu layout.
* Nilailah kinerja model layout; Flexbox baru biasanya lebih cepat daripada Flexbox lama atau model layout berbasis float.
* Hindari layout sinkron paksa dan layout-thrashing; bacalah nilai gaya kemudian buat perubahan gaya.

## Sebisa mungkin hindari layout

Bila Anda mengubah gaya, browser akan memeriksa untuk mengetahui apakah perubahan tersebut mengharuskan layout dihitung, dan untuk itu pohon render akan diperbarui. Perubahan pada “properti geometris”, seperti lebar, tinggi, kiri, atau atas, semuanya memerlukan layout.


    .box {
      width: 20px;
      height: 20px;
    }

    /**
     * Changing width and height
     * triggers layout.
     */
    .box--expanded {
      width: 200px;
      height: 350px;
    }


**Layout hampir selalu mencakup keseluruhan dokumen.** Jika Anda memiliki banyak elemen, akan butuh waktu lama untuk mengetahui lokasi dan dimensi semua elemen itu.

Jika tidak mungkin menghindari layout maka kuncinya sekali lagi adalah menggunakan Chrome DevTools untuk mengetahui perlu waktu berapa lama, dan menentukan apakah layout menjadi penyebab bottleneck. Pertama-tama, buka DevTools, masuk ke tab Timeline, pilih rekam dan berinteraksilah dengan situs Anda. Saat berhenti merekam, Anda akan melihat uraian kinerja situs Anda:

<img src="images/avoid-large-complex-layouts-and-layout-thrashing/big-layout.jpg" alt="DevTools menampilkan waktu yang lama di Layout" />

Saat meneliti bingkai dalam contoh di atas, kita akan melihat bahwa lebih dari 20 md dihabiskan dalam layout, yang mana, bila kita memiliki 16 md untuk mengambil bingkai di layar di suatu animasi, hal itu terlalu tinggi. Anda juga bisa melihat bahwa DevTools akan memberi tahu ukuran pohon (1.618 elemen dalam kasus ini), dan banyaknya simpul yang memerlukan layout.

Note: Ingin daftar lengkap properti CSS yang memicu layout, penggambaran, atau komposit? Lihat [Pemicu CSS](https://csstriggers.com).

## Gunakan flexbox pada model layout yang lebih lama

Web memiliki aneka model layout, sebagian di antaranya didukung lebih luas daripada yang lain. Model layout CSS paling tua memungkinkan kita memosisikan elemen pada layar secara relatif, secara mutlak, dan melalui elemen mengambang.

Tangkapan layar di bawah ini menunjukkan biaya layout saat menggunakan float pada 1.300 kotak. Memang ini adalah contoh rumit karena hampir semua aplikasi akan menggunakan beragam cara untuk memosisikan elemen.

<img src="images/avoid-large-complex-layouts-and-layout-thrashing/layout-float.jpg" alt="Menggunakan float sebagai layout" />

Jika kita memperbarui contoh untuk menggunakan Flexbox, tambahan terbaru ke platform web, kita akan mendapatkan gambar berbeda:

<img src="images/avoid-large-complex-layouts-and-layout-thrashing/layout-flex.jpg" alt="Menggunakan flexbox sebagai layout" />

Kini kita menghabiskan waktu jauh lebih sedikit (3,5 md vs 14 md dalam kasus ini) di layout untuk _jumlah elemen yang sama_ dan tampilan visual yang sama. Perlu diingat bahwa untuk beberapa konteks Anda mungkin tidak dapat memilih Flexbox, karena [kurang luas didukung daripada float](http://caniuse.com/#search=flexbox), namun bila memungkinkan setidaknya Anda harus menyelidiki dampak model layout pada kinerja, dan pilih yang akan meminimkan biaya melakukannya.

Setidaknya, baik Anda memilih Flexbox atau tidak, Anda tetap harus **mencoba dan menghindari memicu layout bersama-sama** selama titik tekan yang tinggi pada aplikasi Anda!

## Hindari layout sinkron paksa

Pengiriman bingkai ke layar harus dalam urutan ini:

<img src="images/avoid-large-complex-layouts-and-layout-thrashing/frame.jpg" alt="Menggunakan flexbox sebagai layout" />

Pertama JavaScript dijalankan, _kemudian_ penghitungan gaya, _kemudian_ layout. Walau demikian, bisa saja browser dipaksa untuk melakukan layout lebih dahulu dengan JavaScript. Ini disebut **layout sinkron paksa**.

Hal pertama yang harus diingat adalah karena JavaScript yang menjalankan semua nilai layout lama dari bingkai sebelumnya telah diketahui dan tersedia untuk kueri. Jadi jika, misalnya, Anda ingin menuliskan tinggi elemen (sebut saja “box”) di awal bingkai, Anda dapat menuliskan beberapa kode seperti ini:


    // Schedule our function to run at the start of the frame.
    requestAnimationFrame(logBoxHeight);

    function logBoxHeight() {
      // Gets the height of the box in pixels and logs it out.
      console.log(box.offsetHeight);
    }


Semuanya akan rumit jika Anda mengubah gaya kotak _sebelum_ Anda menanyakan tingginya:


    function logBoxHeight() {

      box.classList.add('super-big');

      // Gets the height of the box in pixels
      // and logs it out.
      console.log(box.offsetHeight);
    }


Kini, untuk menjawab pertanyaan tinggi, browser _terlebih dahulu_ harus menerapkan perubahan gaya (karena penambahan kelas `super-big`), _kemudian_ menjalankan layout. Setelah itu baru bisa mengembalikan tinggi yang benar. Ini merupakan pekerjaan yang tidak perlu dan kemungkinan berat.

Oleh karena itu Anda harus selalu melakukan pembacaan gaya serentak dan melakukannya terlebih dahulu (bila browser bisa menggunakan nilai layout bingkai sebelumnya) kemudian melakukan penulisan:

Setelah dilakukan dengan benar, fungsi di atas akan menjadi:


    function logBoxHeight() {
      // Gets the height of the box in pixels
      // and logs it out.
      console.log(box.offsetHeight);

      box.classList.add('super-big');
    }


Umumnya Anda tidak perlu menerapkan gaya baru kemudian mengkueri nilai; penggunaan nilai bingkai terakhir seharusnya sudah cukup. Menjalankan penghitungan gaya dan layout secara sinkron dan lebih dahulu daripada browser kemungkinan akan menjadi bottleneck, dan biasanya hal itu tidak Anda inginkan.

## Hindari layout-thrashing
Ada cara melakukan layout sinkron paksa menjadi lebih buruk lagi: _lakukan banyak layout dalam rentetan cepat_. Perhatikan kode ini:


    function resizeAllParagraphsToMatchBlockWidth() {

      // Puts the browser into a read-write-read-write cycle.
      for (var i = 0; i < paragraphs.length; i++) {
        paragraphs[i].style.width = box.offsetWidth + 'px';
      }
    }


Kode ini melakukan loop melalui sekelompok paragraf dan menyetel lebar setiap paragraf agar sama dengan lebar elemen yang disebut "box". Kelihatannya ini tidak berbahaya, namun masalahnya adalah karena setiap pengulangan loop membaca nilai gaya (`box.offsetWidth`) kemudian langsung menggunakannya untuk memperbarui lebar paragraf (`paragraphs[i].style.width`). Pada pengulangan loop berikutnya, browser harus memperhitungkan fakta bahwa gaya telah berubah sejak `offsetWidth` terakhir diminta (dalam pengulangan sebelumnya), sehingga ia harus menerapkan perubahan gaya, dan menjalankan layout. Hal ini akan terjadi pada _setiap kali pengulangan!_.

Perbaikan untuk contoh ini adalah sekali lagi _membaca_ kemudian _menulis_ nilai:


    // Read.
    var width = box.offsetWidth;

    function resizeAllParagraphsToMatchBlockWidth() {
      for (var i = 0; i < paragraphs.length; i++) {
        // Now write.
        paragraphs[i].style.width = width + 'px';
      }
    }


Jika Anda ingin menjamin keamanan, Anda harus melihat [FastDOM](https://github.com/wilsonpage/fastdom), yang secara otomatis menyerempakkan pembacaan dan penulisan Anda, dan akan mencegah Anda memicu layout sinkron paksa atau layout-thrashing secara tidak sengaja.


{# wf_devsite_translation #}
