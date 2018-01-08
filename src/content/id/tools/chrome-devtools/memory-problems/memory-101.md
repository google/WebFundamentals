project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Bagian ini menjelaskan istilah utama yang digunakan dalam analisis memori dan berlaku untuk berbagai alat pembuat profil memori untuk bahasa yang berbeda.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2015-05-18 #}

# Terminologi Memori {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}

Bagian ini menjelaskan istilah utama yang digunakan dalam analisis memori dan berlaku untuk berbagai alat pembuat profil memori untuk bahasa yang berbeda.

Istilah dan gagasan yang dijelaskan di sini mengacu pada
[Profiler Heap pada Chrome DevTools](/web/tools/chrome-devtools/profile/memory-problems/heap-snapshots).
Jika Anda pernah menggunakan Java, .NET, atau profiler memori lainnya, artikel ini mungkin bisa menyegarkan ingatan.


## Ukuran objek

Bayangkan memori sebagai grafik yang berisi jenis primitif (seperti angka dan string) dan objek (larik yang berkaitan). Memori bisa digambarkan secara visual sebagai grafik dengan sejumlah titik yang saling berkaitan sebagai berikut:

![Representasi visual dari memori](imgs/thinkgraph.png)

Objek bisa menyimpan memori dengan dua cara:

* Langsung oleh objek itu sendiri.

* Secara implisit dengan memiliki referensi ke objek lainnya, dan dengan demikian mencegah objek tersebut otomatis dibuang oleh pengumpul sampah (atau disingkat menjadi **GC**).

Saat menggunakan Profiler Heap di DevTools (alat (bantu) untuk menginvestigasi masalah memori yang terdapat di "Profiles"), Anda akan melihat beberapa kolom informasi. Dua yang penting adalah <strong>Shallow Size</strong> dan <strong>Retained Size</strong>, tetapi apa yang diwakili oleh keduanya?

![Ukuran Shallow dan Retained](imgs/shallow-retained.png)

### Shallow size

Ini adalah ukuran memori yang dimiliki oleh objek itu sendiri.

Objek JavaScript secara umum memiliki memori yang dicadangkan untuk keterangannya dan untuk menyimpan nilai langsung. Biasanya hanya larik dan string yang bisa memiliki ukuran dangkal yang besar. Akan tetapi, string dan larik eksternal sering kali memiliki penyimpanan utama di memori renderer, yang hanya memaparkan objek wrapper kecil di heap JavaScript.

Memori renderer adalah semua memori proses tempat laman yang diinspeksi di-render: memori bawaan + memori heap JS laman + memori heap JS semua worker khusus yang dimulai oleh laman. Meskipun demikian, objek kecil pun dapat memiliki jumlah memori yang besar secara tidak langsung, dengan mencegah objek lain dibuang oleh proses pengumpulan sampah otomatis.

### Retained Size

Ini adalah ukuran memori yang dibebaskan setelah objek itu sendiri dihapus beserta objek yang tergantung padanya dan tidak bisa dijangkau dari **GC roots**.

**GC roots** terdiri atas *tuas* yang dibuat (baik lokal atau global) saat membuat referensi dari kode bawaan ke objek JavaScript di luar V8. Semua handle tersebut bisa ditemukan di dalam cuplikan heap di **GC roots** > **Handle scope** dan **GC roots** > **Global handles**. Menjelaskan handle di dokumentasi ini tanpa mempelajari detail implementasi browser bisa membingungkan. Akar GC dan tuasnya tidak perlu dikhawatirkan.

Ada banyak akar GC internal yang sebagian besar tidak menarik bagi pengguna. Dari sudut pandang aplikasi, ada beberapa jenis akar berikut:

* Objek global jendela (di setiap iframe). Terdapat bidang jarak di cuplikan heap yang merupakan jumlah referensi properti di jalur penahan terpendek dari jendela.

* Pohon DOM dokumen terdiri dari semua simpul DOM bawaan yang bisa dijangkau dengan melintaskan dokumen. Tidak semuanya memiliki wrapper JS tetap jika semuanya memiliki, wrapper akan hidup saat dokumen hidup.

* Terkadang, objek dapat ditahan dengan konteks debugger dan konsol DevTools (mis. setelah evaluasi konsol). Buat cuplikan heap dengan konsol bersih dan tanpa breakpoint aktif di debugger.

Grafik memori dimulai dengan akar, yang mungkin berupa objek `window` browser atau objek `Global` modul Node.js. Anda tidak bisa mengontrol bagaimana objek akar ini dikumpulkan sampahnya.

![Objek root tidak dapat dikontrol](imgs/dontcontrol.png)

Apa pun yang tidak bisa dijangkau dari akar akan dikumpulkan sampahnya.

Note: Kolom ukuran Shallow dan Retained menampilkan data dalam satuan byte.

## Pohon penahan objek

Heap adalah jaringan objek yang saling terkait. Dalam dunia matematika, struktur ini disebut sebagai *grafik* atau grafik memori. Grafik tersusun dari "simpul" yang dihubungkan oleh "edge", dan keduanya diberi label.

* **Simpul** (*atau objek) diberi label menggunakan nama fungsi *konstruktor* yang digunakan untuk membangunnya.
* **Edge** diberi label menggunakan nama *properti*.

Pelajari [cara merekam profil menggunakan Profiler Heap](/web/tools/chrome-devtools/profile/memory-problems/heap-snapshots).
Hal mencolok yang terlihat
di rekaman Profiler Heap di bawah ini termasuk jarak:
jarak dari akar GC.
Jika hampir semua objek yang berjenis sama berada dalam jarak yang sama,
dan ada sedikit yang berjarak lebih jauh, ini perlu diinvestigasi.

![Jarak dari akar](imgs/root.png)

## Dominator

Objek dominator terdiri atas struktur pohon karena setiap objek memiliki tepat satu dominator. Dominator sebuah objek belum tentu memiliki referensi langsung ke objek yang didominasinya. Dengan kata lain, pohon dominator bukanlah pohon bentang grafik.

Di diagram berikut:

* Simpul 1 mendominasi simpul 2
* Simpul 2 mendominasi simpul 3, 4, dan 6
* Simpul 3 mendominasi simpul 5
* Simpul 5 mendominasi simpul 8
* Simpul 6 mendominasi simpul 7

![Struktur pohon Dominator](imgs/dominatorsspanning.png)

Di contoh berikut, simpul `#3` adalah dominator `#10`, tetapi `#7` juga hadir di setiap jalur sederhana dari GC ke `#10`. Dengan demikian, objek B adalah dominator objek A jika B hadir di setiap jalur sederhana dari akar ke objek A.

![Ilustrasi dominator animasi](imgs/dominators.gif)

## Detail V8

Saat membuat profil memori, sebaiknya kita memahami makna di balik tampilan cuplikan heap. Bagian ini menjelaskan beberapa topik terkait memori khususnya yang terkait dengan **mesin virtual JavaScript V8** (V8 VM atau VM).

### Representasi objek JavaScript

Ada tiga jenis primitif:

* Angka (mis., 3.14159..)
* Boolean (true atau false)
* String (mis. 'Werner Heisenberg')

String tidak bisa mereferensi nilai lain dan selalu menjadi 'daun' atau simpul ujung.

**Angka** bisa disimpan sebagai:

* nilai integer 31-bit langsung yang disebut sebagai **integer kecil** (*SMI*), atau
* objek heap, yang disebut sebagai **angka heap**. Angka heap digunakan untuk menyimpan nilai yang tidak cocok dengan bentuk SMI, misalnya *rangkap*, atau bila nilai perlu *dikotakkan*, seperti menyetel properti padanya.

**String** bisa disimpan di:

* **heap VM**, atau
* secara eksternal di **memori renderer**. *Objek wrapper* dibuat dan digunakan untuk mengakses penyimpanan eksternal tempat, misalnya, sumber skrip dan materi lain yang diterima dari Web disimpan, bukan disalin ke heap VM.

Memori untuk objek JavaScript baru dialokasikan dari heap JavaScript khusus (atau **heap VM**). Objek ini dikelola oleh pengumpul sampah V8 dan dengan demikian, akan tetap hidup selama ada paling tidak satu referensi kuat kepadanya.

**Objek bawaan** adalah semua hal lain yang tidak ada di dalam heap JavaScript. Berbeda dengan berlainan dengan objek heap, objek bawaan tidak dikelola oleh pengumpul sampah V8 selama masa hidupnya, dan hanya bisa diakses dari JavaScript menggunakan objek wrapper JavaScript-nya.

**String cons** adalah objek yang terdiri atas pasangan string yang disimpan lalu disambungkan, dan merupakan hasil penggabungan. Penggabungan materi *string cons* terjadi hanya saat diperlukan. Contohnya, saat substring dari string yang digabungkan harus dibuat.

Misalnya, jika Anda menggabungkan **a** dan **b**, Anda akan mendapatkan string (a, b) yang mewakili hasil penggabungan. Jika Anda nanti menggabungkan **d** dengan hasil tersebut, Anda akan mendapatkan string cons yang lain ((a, b), d).

**Larik** - Larik adalah objek dengan kunci numerik. Larik sangat sering digunakan di VM V8 untuk menyimpan data yang sangat besar. Rangkaian pasangan nilai-kunci yang digunakan seperti kamus dicadangkan oleh larik.

Objek JavaScript yang umum bisa menjadi satu dari dua jenis larik yang digunakan untuk menyimpan:

* properti yang diberi nama, dan
* elemen numerik

Apabila jumlahnya sangat kecil, properti bisa disimpan secara internal di objek JavaScript sendiri.

**Peta** - objek yang menjelaskan jenis objek dan layoutnya. Misalnya, peta digunakan untuk menjelaskan hierarki objek implisit untuk [mengakses properti secara cepat](/v8/design.html#prop_access).

### Grup objek

Setiap grup objek bawaan terdiri atas objek yang saling mereferensi. Pertimbangkan, misalnya, subpohon DOM tempat setiap simpul memiliki tautan ke induknya dan tautan ke anak selanjutnya dan seinduk selanjutnya, sehingga membentuk grafik yang terhubung. Perhatikan bahwa objek bawaan tidak direpresentasikan di heap JavaScript, itulah mengapa objek ini berukuran nol. Sebagai gantinya, objek wrapper dibuat.

Setiap objek wrapper memiliki referensi ke objek bawaan yang terkait, untuk mengalihkan perintah padanya. Pada gilirannya sendiri, grup objek menahan objek wrapper. Meskipun demikian, grup objek tidak membuat siklus yang tidak bisa dikumpulkan, karena GC cukup pintar untuk melepaskan grup objek yang wrapper-nya tidak lagi direferensikan. Akan tetapi, lupa melepaskan satu wrapper akan menahan seluruh grup dan wrapper terkait.



{# wf_devsite_translation #}
