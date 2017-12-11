project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Pengantar semantik dan teknologi pendukung


{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# Pengantar Semantik {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/aliceboxhall.html" %}



Anda telah melihat cara membuat situs bisa diakses oleh pengguna yang tidak bisa menggunakan mouse atau
perangkat penunjuk &mdash; baik karena cacat fisik, masalah teknologi,
atau preferensi pribadi &mdash; dengan menangani penggunaan keyboard-saja. Walaupun
memerlukan kehati-hatian dan pertimbangan, ini bukanlah pekerjaan yang sangat berat jika Anda merencanakannya
dari awal. Setelah pekerjaan dasar selesai, Anda tinggal menuju ke situs yang
bisa diakses penuh dan lebih cemerlang.

Dalam pelajaran ini, kita akan mendasarkan pada pekerjaan itu dan membuat Anda memikirkan tentang
faktor aksesibilitas lainnya, misalnya cara membangun situs web untuk mendukung [pengguna seperti
Victor Tsaran](/web/fundamentals/accessibility/#understanding-users-diversity),
yang tidak bisa melihat layar.

Terlebih dahulu, kita akan mendapatkan latar belakang mengenai *teknologi pendukung*, yakni istilah umum untuk
alat seperti pembaca layar untuk membantu pengguna yang cacat agar
tetap bisa mengakses informasi.

Berikutnya, kita akan mengamati beberapa konsep umum pengalaman pengguna, dan menjadikannya sebagai dasar untuk
mendalami pengalaman pengguna teknologi pendukung.

Terakhir, kita akan melihat cara menggunakan HTML secara efektif untuk membuat pengalaman yang baik bagi para pengguna ini,
dan bagaimana hal itu sedikit tumpang tindih dengan cara kita menangani fokus
sebelumnya.

## Teknologi pendukung

*Teknologi pendukung* adalah istilah umum untuk perangkat, perangkat lunak, dan alat yang
membantu penyandang cacat melakukan suatu tugas. Dalam pengertian paling luas, teknologi
ini bisa berupa teknologi rendah seperti kruk untuk berjalan atau kaca pembesar untuk
membaca, atau teknologi tinggi seperti lengan robotik atau perangkat lunak pengenalan gambar
di ponsel cerdas.

![contoh teknologi pendukung termasuk kruk, kaca pembesar, dan prostesis
robotik](imgs/assistive-tech1.png)

Teknologi pendukung bisa meliputi sesuatu yang umum seperti zoom di browser zoom, atau
spesifik seperti pengontrol game yang didesain khusus. Teknologi ini berupa perangkat fisik
terpisah seperti tampilan braille, atau diimplementasikan lengkap dalam perangkat lunak seperti
kontrol suara. Teknologi pendukung bisa ditanamkan dalam sistem operasi seperti pembaca layar,
atau berupa pengaya seperti ekstensi Chrome.

![contoh teknologi pendukung lainnya termasuk zoom browser, tampilan braille dan
kontrol suara](imgs/assistive-tech2.png)

Garis antara teknologi pendukung dan teknologi secara umum adalah kabur; semua
teknologi dimaksudkan untuk membantu orang melakukan tugas atau hal lain. Dan
teknologi sering kali bisa masuk ke dan keluar dari kategori "pendukung".

Misalnya, salah satu produk sintesis ucapan komersial paling awal adalah
kalkulator bicara untuk tuna netra. Kini sintesis ucapan ada di mana-mana,
dari arah mengemudi hingga asisten virtual. Sebaliknya, teknologi yang pada mulanya
serba guna sering kali digunakan sebagai pendukung. Misalnya, orang
yang lemah penglihatan mungkin menggunakan zoom kamera di ponsel cerdas untuk melihat lebih baik
benda kecil di dunia nyata.

Dalam konteks development web, kita harus mempertimbangkan berbagai macam
teknologi. Orang mungkin berinteraksi dengan situs web menggunakan pembaca layar atau
tampilan braille, dengan pembesar layar, melalui kontrol suara, menggunakan perangkat switch,
atau dengan bentuk teknologi pendukung lainnya yang mengadaptasikan
antarmuka default laman untuk membuat antarmuka yang lebih spesifik yang bisa mereka gunakan.

Banyak dari teknologi pendukung ini yang mengandalkan *semantik yang dinyatakan
lewat program* untuk membuat pengalaman pengguna yang bisa diakses, dan itulah
yang sebagian besar akan dibahas pelajaran ini. Namun sebelum bisa menjelaskan semantik yang dijelaskan lewat program,
kita perlu membicarakan sedikit tentang *kemampuan*.

## Kemampuan

Bila kita menggunakan alat (bantu) atau perangkat atau buatan manusia, biasanya kita melihat bentuk dan desainnya
untuk memberikan gambaran mengenai apa manfaatnya dan cara kerjanya. *Kemampuan* adalah
objek yang menawarkan, atau memberi, penggunanya kesempatan untuk melakukan suatu aksi.
Semakin baik kemampuan tersebut didesain, semakin nyata atau intuitif penggunaannya.

Contoh klasik adalah cerek atau teko teh. Anda bisa dengan mudah mengetahui bahwa
Anda harus mengambilnya melalui pegangannya, bukan di lehernya, sekalipun Anda belum pernah melihat teko itu
sebelumnya.

![teko teh dengan pegangan dan cerat](imgs/teapot.png)

Itu sebabnya kemampuan di sini mirip dengan kemampuan yang Anda lihat pada benda
lainnya -- ceret penyiram, teko minuman, mug kopi, dan seterusnya. Anda
barangkali *bisa* mengangkat teko pada lehernya, namun pengalaman Anda dengan
kemampuan serupa akan memberi tahu pegangannya adalah opsi yang lebih baik.

Dalam Graphic User Interface, kemampuan menyatakan tindakan yang bisa kita ambil, namun
hal itu bisa jadi meragukan karena tidak berinteraksi dengan objek fisik. Kemampuan GUI
didesain khusus agar tidak meragukan: tombol, kotak
centang, dan bilah gulir dimaksudkan untuk memberitahukan penggunaannya dengan pelatihan
yang sesedikit mungkin.

Misalnya, Anda mungkin menafsirkan penggunaan beberapa elemen bentuk umum
(kemampuan) seperti ini:

 - Tombol radio &mdash; "Saya bisa memilih salah satu opsi ini."
 - Kotak centang &mdash; "Saya bisa memilih 'ya' atau 'tidak' terhadap opsi ini."
 - Bidang teks &mdash; "Saya bisa mengetikkan sesuatu ke dalam area ini."
 - Menu tarik-turun &mdash; "Saya bisa membuka elemen ini untuk menampilkan opsi saya."

Anda bisa menarik kesimpulan tentang elemen ini *hanya karena Anda bisa
melihatnya*. Secara alami, orang yang tidak bisa melihat petunjuk visual yang disediakan oleh sebuah elemen
tidak bisa memahami maknanya atau secara intuitif menangkap nilai kemampuan.
Jadi kita harus memastikan informasi diekspresikan cukup fleksibel untuk
diakses oleh teknologi pendukung yang bisa membentuk suatu antarmuka alternatif agar cocok
dengan kebutuhan penggunanya.

Paparan non-visual atas penggunaan kemampuan ini disebut *semantik*.

## Pembaca layar

Satu tipe teknologi pendukung yang populer adalah *pembaca layar*, yaitu sebuah program yang
memungkinkan orang yang memiliki masalah penglihatan untuk menggunakan komputer dengan membacakan teks layar
dengan suara buatan. Pengguna bisa mengontrol apa yang dibaca dengan menggerakkan kursor ke
area yang relevan dengan keyboard.

Kami meminta [Victor
Tsaran](/web/fundamentals/accessibility/#understanding-users-diversity)
untuk menjelaskan bagaimana, sebagai orang buta, ia bisa mengakses web dengan menggunakan
pembaca layar bawaan di OS X, yang disebut VoiceOver. Lihat [video
ini](https://www.youtube.com/watch?v=QW_dUs9D1oQ) tentang Victor yang menggunakan VoiceOver.

Kini, giliran Anda mencoba menggunakan pembaca layar. Inilah laman dengan *ChromeVox
Lite*, pembaca layar minimal namun fungsional yang ditulis dalam JavaScript. Layar
sengaja dikaburkan untuk menyimulasikan pengalaman penglihatan-minim dan memaksa pengguna
untuk melakukan tugas dengan pembaca layar. Tentu saja, Anda perlu menggunakan
browser Chrome untuk latihan ini.

[Laman demo ChromeVox lite](http://udacity.github.io/ud891/lesson3-semantics-built-in/02-chromevox-lite/)

Anda bisa menggunakan panel kontrol di bagian bawah layar untuk mengontrol
pembaca layar. Pembaca layar ini memiliki fungsionalitas sangat minim, namun Anda bisa menyusuri
materi dengan menggunakan tombol `Previous` dan `Next`, dan bisa mengeklik sesuatu
dengan menggunakan tombol `Click`.

Cobalah menggunakan laman ini dengan ChromeVox lite yang telah diaktifkan untuk merasakan penggunaan
pembaca layar. Ingatlah sebenarnya pembaca layar (atau teknologi pendukung lainnya)
membuat suatu pengalaman pengguna alternatif lengkap bagi pengguna berdasarkan pada
semantik yang diekspresikan lewat program. Sebagai ganti antarmuka visual, pembaca layar
menyediakan antarmuka yang terdengar.

Perhatikan bagaimana pembaca layar memberi tahu Anda informasi tentang
setiap elemen antarmuka. Anda tentunya mengharapkan pembaca yang didesain dengan baik untuk memberi tahu Anda semua, atau setidaknya,
informasi tentang elemen yang ditemukannya berikut ini.

 - *Peran* atau tipe elemen, jika telah ditetapkan (seharusnya sudah).
 - *Nama* elemen, jika memiliki (seharusnya sudah).
 - *Nilai* elemen, jika memilikinya (mungkin atau mungkin tidak).
 - *Keadaan* elemen, mis., apakah diaktifkan atau dinonaktifkan (jika
   berlaku).

Pembaca layar mampu membentuk UI alternatif ini karena
elemen asli berisi metadata aksesibilitas bawaan. Karena mesin rendering menggunakan
kode asli untuk membentuk antarmuka visual, pembaca layar akan menggunakan
metadata dalam simpul DOM untuk membentuk versi yang bisa diakses, seperti
yang satu ini.

![pembaca layar menggunakan DOM untuk membuat simpul
yang bisa diakses](imgs/nativecodetoacc.png)


{# wf_devsite_translation #}
