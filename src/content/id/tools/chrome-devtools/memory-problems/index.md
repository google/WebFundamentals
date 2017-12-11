project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Pelajari cara menggunakan Chrome dan DevTools untuk menemukan masalah memori yang memengaruhi kinerja laman, termasuk kebocoran memori, penggelembungan memori, dan pengumpulan sampah yang terlalu sering.

{# wf_updated_on: 2015-08-03 #}
{# wf_published_on: 2015-04-13 #}

# Memperbaiki Masalah Memori {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Pelajari cara menggunakan Chrome dan DevTools untuk menemukan masalah memori
yang memengaruhi kinerja laman, termasuk kebocoran memori, penggelembungan memori, dan
pengumpulan sampah yang terlalu sering.


### TL;DR {: .hide-from-toc }
- Mengetahui berapa banyak memori yang sedang digunakan oleh laman dengan Task Manager pada Chrome.
- Visualkan penggunaan memori seiring waktu dengan perekaman Timeline.
- Mengidentifikasi pohon DOM yang terlepas (penyebab umum kebocoran memori) dengan Cuplikan Heap.
- Mengetahui cara memori baru dialokasikan di heap JS Anda dengan perekaman Allocation Timeline.


## Ringkasan

Dengan prinsip model kinerja [RAIL][RAIL], upaya peningkatan kinerja
sebaiknya difokuskan pada pengguna.

Masalah memori penting karena
dapat dilihat oleh pengguna. Pengguna dapat melihat masalah memori dengan cara
berikut:

* **Kinerja laman secara progresif menjadi buruk seiring waktu.** Ini mungkin
  tanda-tanda kebocoran memori. Kebocoran memori terjadi saat terdapat bug di laman 
  yang menyebabkan laman secara progresif menggunakan lebih banyak memori seiring waktu. 
* **Kinerja laman terus-menerus buruk.** Ini mungkin tanda-tanda
  penggelembungan memori. Penggelembungan memori terjadi saat laman menggunakan lebih banyak memori dari
  yang diperlukan untuk mencapai kecepatan optimal laman.
* **Kinerja laman lambat atau tampak sering dijeda.** Ini mungkin
  tanda-tanda pengumpulan sampah yang sering. Pengumpulan sampah
  terjadi saat browser mengklaim kembali memori. Browser memutuskan kapan tindakan ini terjadi.
  Selama proses pengumpulan, semua eksekusi skrip akan dijeda. Jadi, jika browser
  sering mengumpulkan sampah, eksekusi skrip akan sering dijeda.

### Penggelembungan memori: di mana batasnya?

Kebocoran memori mudah didefinisikan. Jika sebuah situs secara progresif menggunakan semakin banyak
memori, artinya terjadi kebocoran. Akan tetapi, penggelembungan memori
lebih sulit ditemukan penyebabnya. Penggunaan memori sebesar apa yang dianggap "terlalu banyak"?

Tidak ada angka yang pasti, karena perangkat dan browser
memiliki kemampuan yang berbeda-beda. Laman yang
berjalan mulus di ponsel cerdas kelas atas bisa saja mogok di ponsel cerdas
kelas bawah.

Kuncinya adalah menggunakan model RAIL dan berfokus pada pengguna. 
Cari tahu perangkat apa yang paling banyak digunakan oleh pengguna, lalu uji laman Anda
pada perangkat tersebut. Jika hasil ujinya buruk di banyak perangkat, laman itu
mungkin melampaui kemampuan memori perangkat tersebut.

[RAIL]: /web/tools/chrome-devtools/profile/evaluate-performance/rail

## Memantau penggunaan memori secara realtime dengan Task Manager pada Chrome

Gunakan Task Manager pada Chrome sebagai titik awal penyelidikan
masalah memori. Task Manager adalah monitor realtime yang memberitahukan
berapa memori yang sedang digunakan sebuah laman.

1. Tekan <kbd>Shift</kbd>+<kbd>Esc</kbd> atau masuk ke
   menu utama Chrome dan pilih **More tools** > **Task manager** untuk membuka
   Task Manager.

   ![membuka task
   manager](imgs/task-manager.png)

1. Klik kanan header tabel Task Manager dan aktifkan **JavaScript
   memory**.

   ![mengaktifkan memori
   javascript](imgs/js-memory.png)

Dua kolom ini menyampaikan berbagai informasi tentang cara laman menggunakan memori:

* Kolom **Memory** menggambarkan memori bawaan. Simpul DOM disimpan di
  memori bawaan. Jika nilai ini meningkat, simpul DOM sedang dibuat.
* Kolom **JavaScript Memory** menggambarkan heap JS. Kolom ini
  berisi dua nilai. Nilai yang sebaiknya Anda perhatikan adalah nilai
  langsung (angka dalam tanda kurung). Angka langsung menggambarkan
  berapa banyak memori yang digunakan oleh objek yang bisa diraih di laman Anda. Jika nomor
  ini meningkat, artinya objek baru sedang dibuat, atau objek
  saat ini meningkat.

<!-- live number reference: https://groups.google.com/d/msg/google-chrome-developer-tools/aTMVGoNM0VY/bLmf3l2CpJ8J -->

## Memvisualkan kebocoran memori dengan perekaman Timeline

Anda juga bisa menggunakan panel Timeline sebagai titik mulai lainnya pada investigasi
Anda. Panel Timeline membantu Anda memvisualkan penggunaan memori laman
seiring waktu.

1. Buka panel **Timeline** di DevTools.
1. Aktifkan kotak centang **Memory**.
1. [Rekam][recording].

Tip: Memulai dan mengakhiri perekaman Anda dengan pengumpulan sampah
paksa adalah praktik yang baik. Klik tombol **collect garbage**
(![tombol force garbage collection][cg]{:.inline})
saat merekam untuk memaksa pengumpulan sampah.

Untuk mendemonstrasikan perekaman memori Timeline, perhatikan kode berikut:

    var x = [];
    
    function grow() {
      for (var i = 0; i < 10000; i++) {
        document.body.appendChild(document.createElement('div'));
      }
      x.push(new Array(1000000).join('x'));
    }
    
    document.getElementById('grow').addEventListener('click', grow);

Setiap kali tombol yang direferensikan di kode ditekan, sepuluh 
ribu simpul `div` akan ditambahkan ke
tubuh dokumen, dan string satu juta karakter `x` akan dimasukkan ke dalam
larik `x`. Menjalankan kode ini menghasilkan rekaman Timeline seperti 
tangkapan layar berikut:

![contoh pertumbuhan sederhana][sg]

Pertama, penjelasan tentang antarmuka pengguna.
Grafik **HEAP** di panel **Overview** (di bawah **NET**) mewakili heap
JS. Di bawah panel **Overview** adalah panel **Counter**. Di sini, Anda bisa melihat
penggunaan memori yang dikelompokkan menurut heap JS (sama seperti grafik **HEAP** di panel
**Overview**), dokumen, simpul DOM, listener, dan memori GPU.
Mengosongkan kotak centang akan menyembunyikannya dari grafik.

Sekarang, analisis kode dibandingkan dengan tangkapan layar.
Jika Anda memperhatikan penghitung simpul (grafik hijau). Anda bisa melihat jumlahnya cocok dengan
kode. Jumlah simpul meningkat
dalam langkah yang berlainan. Anda bisa menyimpulkan bahwa setiap peningkatan pada hitungan simpul adalah sebuah
panggilan ke `grow()`. Grafik heap JS (grafik biru) tidak sama jelasnya.
Agar sesuai dengan praktik terbaik, percobaan pertama adalah sebenarnya pengumpulan sampah
paksa (yang dilakukan dengan menekan tombol **collect garbage**).
Seiring dengan berjalannya perekaman, Anda bisa melihat ukuran heap JS meningkat drastis. Ini adalah
alami dan bisa diduga: kode JavaScript membuat simpul DOM setiap kali tombol
diklik dan melakukan banyak sekali pekerjaan saat membuat string yang berjumlah satu juta
karakter. Intinya, fakta bahwa heap JS berakhir lebih tinggi
dari saat dimulai ("dimulai" disini adalah titik setelah pengumpulan sampah
secara paksa). Dalam kondisi nyata, jika Anda melihat pola meningkatnya
ukuran heap JS atau ukuran simpul, ini berarti ada kemungkinan kebocoran memori.

[recording]: https://developers.google.com/web/tools/chrome-devtools/profile/evaluate-performance/timeline-tool#make-a-recording

[cg]: imgs/collect-garbage.png

[sg]: imgs/simple-growth.png

[hngd]: https://jsfiddle.net/kaycebasques/tmtbw8ef/

## Mengungkap kebocoran memori pohon DOM yang terlepas dengan Cuplikan Heap

Simpul DOM hanya bisa dikumpulkan sampahnya bila tidak ada referensi kepadanya
baik dari pohon DOM atau kode JavaScript laman. Simpul bisa dikatakan sebagai 
"terlepas" bila dibuang dari pohon DOM tetapi masih ada JavaScript yang
mereferensi padanya. Simpul DOM yang terlepas adalah sebab umum kebanyakan memori. Bagian
ini mengajarkan cara menggunakan profiler heap DevTools untuk mengidentifikasi
simpul yang terlepas.

Berikut ini contoh sederhana simpul DOM yang terlepas. 

    var detachedNodes;
    
    function create() {
      var ul = document.createElement('ul');
      for (var i = 0; i < 10; i++) {
        var li = document.createElement('li');
        ul.appendChild(li);
      }
      detachedTree = ul;
    }
    
    document.getElementById('create').addEventListener('click', create);

Mengeklik tombol yang direferensikan di kode akan membuat simpul `ul` dengan
sepuluh anak `li`. Simpul ini direferensikan oleh kode, tetapi tidak ada di pohon
DOM, jadi statusnya terlepas.

Cuplikan heap adalah salah satu cara untuk mengidentifikasi simpul yang terlepas. Seperti namanya,
cuplikan heap menunjukkan distribusi memori antar objek JS
dan simpul DOM laman pada waktu cuplikan dibuat.

Untuk membuat cuplikan, buka DevTools dan masuk ke panel **Profiles**, pilih
tombol radio **Take Heap Snapshot**, lalu tekan tombol **Take
Snapshot**. 

![mengambil cuplikan heap][ths]

Cuplikan mungkin membutuhkan beberapa saat untuk diproses dan dimuat. Setelah selesai, pilih cuplikan
dari panel sebelah kiri (bernama **HEAP SNAPSHOTS**). 

Ketikkan `Detached` di kotak teks **Class filter** untuk mencari pohon DOM yang
terlepas.

![memfilter simpul yang terlepas][df]

Luaskan karat untuk menginvestigasi pohon yang terlepas.

![menginvestigasi pohon yang terlepas][ed]

Simpul yang disorot warna kuning memiliki referensi langsung dari kode 
JavaScript. Simpul yang disorot warna merah tidak memiliki referensi langsung. Simpul ini
hidup hanya karena merupakan pohon simpul yang disorot warna kuning. Secara umum, Anda ingin
berfokus pada simpul kuning. Jika Anda memperbaiki kode supaya simpul kuning tidak hidup
lebih lama dari yang diperlukan, simpul merah yang
berada di pohon simpul kuning itu juga akan terhapus.

Klik simpul kuning untuk menginvestigasi lebih lanjut. Di panel **Objects** 
Anda bisa melihat informasi selengkapnya tentang kode yang merujuknya. Misalnya,
di tangkapan layar berikut Anda bisa melihat bahwa variabel `detachedTree` merujuk
simpul. Untuk memperbaiki kebocoran memori yang ini, Anda harus mempelajari 
kode yang menggunakan `detachedTree` dan memastikan bahwa kode ini membuang referensinya
ke simpul itu jika sudah tidak lagi diperlukan.

![menginvestigasi simpul kuning][yn]

[ths]: imgs/take-heap-snapshot.png

[df]: imgs/detached-filter.png

[ed]: imgs/expanded-detached.png

[yn]: imgs/yellow-node.png

## Mengidentifikasi kebocoran memori heap JS dengan Allocation Timeline

Allocation Timeline adalah satu alat (bantu) lain yang bisa membantu Anda melacak 
kebocoran memori di heap JS. 

Untuk mendemonstrasikan Allocation Timeline, perhatikan kode berikut:

    var x = [];

    function grow() {
      x.push(new Array(1000000).join('x'));
    }

    document.getElementById('grow').addEventListener('click', grow);

Setiap kali tombol yang direferensikan di kode ini ditekan, string
satu juta karakter ditambahkan ke larik `x`.

Untuk merekam Allocation Timeline, buka DevTools, masuk ke panel **Profiles**,
pilih tombol radio **Record Allocation Timeline**, tekan tombol **Start**
, lakukan tindakan yang Anda duga menyebabkan kebocoran memori, lalu
tekan tombol **stop recording** 
(![tombol stop recording][sr]{:.inline})
setelah selesai. 

Selama merekam, perhatikan apakah ada bilah biru yang muncul di Allocation
Timeline, seperti di tangkapan layar di bawah. 

![alokasi baru][na]

Bilah biru tersebut menggambarkan alokasi memori baru. Memori alokasi yang baru tersebut
dicurigai sebagai kebocoran memori. Anda bisa memperbesar suatu bilah untuk memfilter panel
**Constructor** agar hanya menampilkan objek yang dialokasikan selama jangka waktu
yang ditentukan. 

![allocation timeline yang diperbesar][zat]

Luaskan objek dan klik nilainya untuk melihat detail selengkapnya tentangnya di panel
**Object**. Misalnya, di tangkapan layar berikut, dengan menampilkan detail
objek yang baru dialokasikan, Anda bisa melihat bahwa objek itu
dialokasikan ke variabel `x` di cakupan `Window`.

![detail objek][od]

[sr]: imgs/stop-recording.png

[na]: imgs/new-allocations.png

[zat]: imgs/zoomed-allocation-timeline.png

[od]: imgs/object-details.png

## Menginvestigasi alokasi memori berdasarkan fungsi {: #allocation-profile }

Gunakan tipe **Record Allocation Profiler** untuk menampilkan alokasi memori berdasarkan
fungsi JavaScript.

![Record Allocation Profiler](imgs/record-allocation-profile.png)

1. Pilih tombol radio **Record Allocation Profiler**. Jika ada
   worker di laman, Anda dapat memilih itu sebagai target pembuatan profil menggunakan
   menu tarik-turun di sebelah tombol **Start**.
1. Tekan tombol **Start**.
1. Lakukan tindakan di laman yang hendak diinvestigasi.
1. Tekan tombol **Stop** setelah menyelesaikan semua tindakan.

DevTools menampilkan perincian alokasi memori menurut fungsi. Tampilan
default adalah **Heavy (Bottom Up)**, yang menampilkan fungsi-fungsi yang dialokasikan memori
terbanyak di atas.

![Profil alokasi](imgs/allocation-profile.png)

## Mencari pengumpulan sampah yang sering

Jika laman Anda tampak sering dijeda, mungkin ada masalah
pengumpulan sampah. 

Anda bisa menggunakan Task Manager pada Chrome atau perekaman memori Timeline untuk
mencari pengumpulan sampah yang sering. Di Task Manager,
nilai **Memory** atau **JavaScript Memory** yang naik dan turun menggambarkan pengumpulan sampah
yang sering. Di rekaman Timeline, grafik heap JS
atau jumlah simpul yang sering naik-turun menunjukkan pengumpulan sampah yang sering.

Setelah mengidentifikasi masalahnya, Anda bisa menggunakan perekaman
Allocation Timeline untuk menemukan di mana memori sedang dialokasikan dan fungsi apa yang
menyebabkan alokasi itu. 


{# wf_devsite_translation #}
