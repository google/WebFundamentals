project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Panduan langkah demi langkah untuk dasar-dasar desain UX.

{# wf_updated_on: 2016-10-01 #}
{# wf_published_on: 2016-10-01 #}

# Dasar-Dasar UX {: .page-title }

{% include "web/_shared/contributors/mustafa.html" %}

Artikel ini memperkenalkan alur kerja yang bisa membantu tim, produk, startup dan
perusahaan membuat proses yang kokoh dan berarti untuk mengembangkan pengalaman
pengguna yang lebih baik bagi para pelanggan. Anda bisa menggunakan bagian proses yang berbeda
secara terpisah, namun proses ini idealnya bekerja sangat baik bila dilakukan dalam serangkaian langkah.

Panduan ini banyak meminjam dari metodologi Design Sprint yang digunakan beberapa
tim di Google untuk memecahkan masalah dan tantangan seperti
[Self Driving Car](https://www.google.com/selfdrivingcar/ "Self Driving Car"){:target="_blank" .external}
dan [Project Loon](https://www.solveforx.com/loon/ "Project Loon"){:target="_blank" .external}.

### Double Diamond

Alur kerja ini didasarkan pada apa yang kita sebut dalam lingkaran UX sebagai double diamond, dipopulerkan
oleh [British Design Council](https://www.designcouncil.org.uk/ "British Design Council"){:target="_blank" .external},
dengan tim Anda terbagi untuk memahami ide melalui penelitian dan kemudian
berkumpul untuk mendefinisikan tantangan, membaginya untuk membuat sketsa secara individual, berbagi
ide, memutuskan apa yang terbaik ke depannya, uji dan validasi.

<figure>
  <img src="images/double-diamond.png" alt="Fase proyek meliputi; Memahami, Mendefinisikan, Membagi, Memutuskan, Prototipe dan Validasi">
  <figcaption>Model proses desain ''double diamond' yang dipelopori oleh British Design Council, langkah-langkahnya melibatkan tahapan proyek berikut; <em>Memahami</em>, <em>Mendefinisikan</em>, <em>Membagi</em>, <em>Memutuskan</em>, <em>Prototipe</em> dan <em>Validasi</em>.</figcaption>
</figure>

## Menyetel panggung

Hal pertama adalah memulai dengan tantangan mendasar dan menulisnya
seperti proposal, tanyakan pada diri Anda sendiri, "apa masalah yang sesungguhnya coba saya
pecahkan?".  Pernyataan tantangan adalah keterangan singkat yang ditetapkan ke proyek
yang berisi tujuan Anda.

Tantangan ini bisa fitur produk saat ini yang perlu disaring
atau produk yang sama sekali baru. Apapun tugas Anda, cukup sesuaikan
bahasa agar sesuai dengan tujuan yang ingin Anda capai. Pernyataan harus
dikaitkan dengan tujuan tim Anda, berfokus pada pengguna, memberikan inspirasi dan ringkas.

Berikut adalah beberapa contoh produk nyata yang telah saya kerjakan di
masa lalu;

* Merancang sebuah sistem untuk mengelola pengobatan dan perawatan lanjutan pasien penderita
  clubfoot.

* Membuat sebuah aplikasi yang menyederhanakan sistem keuangan kompleks dan menguranginya ke
  hal-hal penting saja.

* Merancang aplikasi seluler yang konsisten di seluruh platform yang berbeda tanpa mengorbankan
  merek.

### Memperbarui pernyataan tantangan Anda

Setelah Anda menulis beberapa variasi tujuan, presentasikan ke tim Anda untuk
mendapatkan sebuah konsensus. Anda mungkin perlu memasukkan batas waktu karena ini akan membantu tim
berfokus pada masalah. Jadi dengan penambahan tersebut, penyesuaian untuk daftar di atas bisa
menjadi:

* Merancang sebuah sistem untuk mengelola pengobatan dan perawatan lanjutan anak-anak di bawah
  usia 2 tahun penderita clubfoot diluncurkan pada Q1 tahun ini.
* Membuat aplikasi keuangan sederhana yang memungkinkan Anda membeli dan menjual saham cukup dengan mengetuk
  tombol tanpa membutuhkan pengetahuan dasar dunia keuangan, dengan peluncuran awal
  Juli 2017.
* Menghasilkan panduan desain yang fleksibel di beberapa platform dan memosisikan
  merek perusahaan secara efektif pada setiap platform hingga akhir tahun ini.

Ketika pernyataan tantangan selesai, tampilkan dalam tempat yang menonjol sehingga
Anda bisa melihatnya saat bekerja. Anda harus memeriksanya kembali
secara konstan, bahkan mungkin memperbarui atau memodifikasinya selama proyek Anda berjalan.

## Memvalidasi masalah

Langkah berikutnya adalah meneliti tantangan dan mempelajari masalah tersebut. Apa yang perlu Anda
ketahui adalah apakah pemahaman tim Anda tentang masalah adalah valid.
Cukup sering kita melihat masalah dari sudut pandang kita sendiri, yang berbahaya
karena kebanyakan dari kita di dunia teknologi sebenarnya adalah power user dan pada kenyataannya merupakan pengguna
minoritas. Kita adalah minoritas vokal dan bisa tertipu saat berpikir sesuatu
dapat menjadi masalah padahal tidak.

Ada berbagai metode pengumpulan data untuk memvalidasi tantangan. Masing-masing
bergantung pada tim dan jika Anda memiliki akses ke pengguna. Tujuannya adalah untuk mendapatkan
pemahaman yang lebih baik dari masalah yang dihadapi.

### Wawancara internal dengan para pemangku kepentingan

<figure>
  <img src="images/stakeholder-interviews.jpg" class="attempt-right" alt="Wawancara dengan para pemangku kepentingan bisa informatif untuk menemukan wawasan dalam sebuah perusahaan atau tim.">
  <figcaption>Wawancara dengan para pemangku kepentingan bisa informatif untuk menemukan wawasan dalam sebuah perusahaan atau tim.</figcaption>
</figure>

Proses wawancara termasuk melakukan wawancara kepada setiap anggota tim dan pemangku kepentingan
di perusahaan Anda, dari pemasaran hingga keuangan. Ini akan membantu Anda menemukan apa yang mereka
pikir tantangan nyata dan apa solusi potensial yang bisa mereka pikirkan.
Ketika saya mengatakan solusi, saya tidak berbicara tentang solusi teknis di sini, melainkan
apa yang bisa menjadi skenario terbaik dan tujuan akhir bagi perusahaan atau produk.
Misalnya menggunakan tantangan di atas "memiliki software clubfoot di 80%
fasilitas medis hingga akhir tahun ini" dapat menjadi tujuan besar yang menjadi target.

Ada sebuah peringatan. Metode validasi adalah yang paling tidak disukai karena
menghambat diskusi dan kolaborasi tim, berpotensi menciptakan suasana
tertutup dalam sebuah organisasi. Meskipun demikian, ini bisa menghasilkan beberapa informasi bagus
tentang klien dan tantangan desain yang bisa saja Anda lewatkan.

### Presentasi kilat

<figure>
  <img src="images/lightning-talks.jpg" alt="Presentasi kilat adalah presentasi sangat singkat yang hanya berlangsung beberapa menit.">
  <figcaption>Presentasi kilat adalah presentasi sangat singkat yang hanya berlangsung beberapa menit.</figcaption>
</figure>

Mirip dengan wawancara internal, namun kali ini Anda menghadirkan setiap
pemangku kepentingan dalam satu ruangan. Kemudian Anda Memilih lima atau enam orang pemangku kepentingan
(pemasaran, penjualan, desain, keuangan, penelitian dll.) untuk berbicara, masing-masing
berfokus pada tantangan dari perspektif mereka selama maksimal 10 menit.
Topiknya harus mencakup presentasi mereka:

* Tujuan bisnis
* Tantangan proyek dari sudut pandang mereka (ini bisa faktor teknis,
  pengumpulan penelitian, pembuatan desain dll..)
* Penelitian pengguna yang Anda miliki saat ini

Berikan waktu 5 menit di akhir untuk sesi pertanyaan, dengan orang yang dipilih mencatat
semuanya. Setelah selesai, Anda mungkin ingin memperbarui tantangan untuk merefleksikan
pembelajaran yang baru. Tujuannya adalah untuk mengumpulkan daftar poin-poin utama yang bisa mendorong
fitur atau alur yang membantu Anda mencapai tujuan produk.

### Wawancara pengguna
<figure>
  <img src="images/user-interviews.jpg" class="attempt-right" alt="Wawancara pengguna adalah cara yang bagus untuk mempelajari tentang titik derita orang di setiap tugas yang diberikan.">
  <figcaption>Wawancara pengguna adalah cara yang bagus untuk mempelajari tentang titik derita orang di setiap tugas yang diberikan.</figcaption>
</figure>

Ini mungkin adalah cara terbaik untuk belajar tentang pengalaman pengguna, titik derita,
dan alur. Aturlah setidaknya lima wawancara pengguna, lebih banyak lagi jika Anda memiliki akses kepada
mereka. Jenis pertanyaan yang Anda tanyakan kepada mereka harus mencakup:

- Bagaimana mereka menyelesaikan tugas yang ada? Misalnya, Anda ingin menyelesaikan
  tantangan untuk aplikasi keuangan di atas, Anda bisa bertanya kepada mereka "bagaimana Anda membeli saham
  dan efek saat ini?"
- Apa yang mereka suka tentang alur ini?
- Apa yang tidak mereka suka tentang alur ini?
- Apa produk sejenis yang saat ini digunakan pengguna?
    *  Apa yang mereka suka?
    *  Apa yang tidak mereka suka?
- Jika mereka memiliki tongkat ajaib dan bisa mengubah satu hal tentang proses ini
  hal apakah itu?

Ide melakukan wawancara adalah agar pengguna berbicara tentang tantangan yang mereka
alami. Ini bukanlah poin diskusi untuk Anda, itulah mengapa Anda harus
tetap diam. Hal ini semakin benar ketika pengguna berhenti berbicara, selalu berikan waktu
sebentar karena mereka bisa saja sedang mengumpulkan pemikirannya. Anda akan terkejut melihat betapa
banyak orang yang akan terus berbicara setelah berhenti sejenak selama beberapa detik.

Catat seluruhnya dan jika mungkin rekam percakapan tersebut untuk membantu Anda
merekam apa pun yang mungkin Anda lewatkan. Tujuannya adalah membandingkan tantangan terhadap
wawasan pengguna yang Anda kumpulkan. Apakah mereka selaras? Apakah Anda mempelajari sesuatu yang
membantu memperbarui pernyataan tantangan?

### Penelitian bidang etnografi

<figure>
  <img src="images/field-interviews.jpg" class="attempt-right" alt="Melihat pengguna dalam lingkungan alami mereka adalah cara yang bagus untuk memahami bagaimana pengguna mengatasi tantangan mereka sendiri.">
  <figcaption>Melihat pengguna dalam lingkungan alami mereka adalah cara yang bagus untuk memahami bagaimana pengguna mengatasi tantangan mereka sendiri.</figcaption>
</figure>

Ini adalah bidang tempat Anda mengamati pengguna, dalam konteks saat melakukan
sesuatu seperti bagaimana mereka berbelanja, bagaimana mereka melakukan perjalanan ke tempat kerja,
bagaimana mereka mengirim pesan SMS dll.. Alasannya adalah karena dalam beberapa kasus orang akan memberi tahu
apa yang mereka pikir ingin Anda dengarkan. Namun jika Anda menyaksikan sendiri pengguna melakukan tindakan dan
tugasnya, ini bisa menjadi penuh wawasan. Pada dasarnya Anda mengamati tanpa
mengganggu, mencatat hal-hal yang mereka rasa mudah atau sulit dan hal-hal yang mungkin
mereka lewatkan. Tujuannya adalah untuk melibatkan diri Anda dalam lingkungan pengguna agar
lebih berempati dengan titik derita mereka.

Teknik ini biasanya melibatkan beberapa pekerjaan yang dilakukan selama periode waktu yang lebih lama dan
membutuhkan peneliti untuk memimpin bagian proyek ini. Namun inilah yang mungkin
paling berwawasan karena Anda bisa melihat sekelompok orang yang Anda pelajari di
lingkungan alami mereka.

### Mengumpulkan semuanya

Setelah Anda menyelesaikan tahap pembelajaran proyek, Anda harus mengambil satu
pemeriksaan terakhir pada tantangan Anda. Apakah Anda di jalur yang benar? Apakah ada sesuatu yang perlu Anda
sesuaikan? Tuliskan semua hal yang telah Anda pelajari dan kelompokkan mereka ke dalam
kategori. Ini bisa menjadi dasar dari fitur atau alur, bergantung pada
masalah yang Anda selesaikan. Juga bisa digunakan untuk memperbarui dan merevisi
tantangan.

Setelah Anda memiliki masukan dan wawasan yang cukup, saatnya untuk menerapkan pengetahuan itu untuk
membuat pemetaan proyek.

## Pemetaan proyek

Masalah yang coba Anda selesaikan biasanya terdiri dari berbagai tipe
orang (atau pemain), masing-masing dengan andil di alur proyek. Berdasarkan
pembelajaran, Anda perlu mendaftar para pemain. Ini bisa jadi tipe pengguna atau
pemangku kepentingan, misalnya, "dokter yang merawat clubfoot", "pasien yang menderita
clubfoot", "perawat yang merawat pasien", dll.. Tuliskan masing-masing pemain
di sisi kiri selembar kertas atau tulis pada
papan tulis jika Anda memilikinya. Di sisi sebelah kanan, tuliskan tujuan masing-masing pemain.

Yang terakhir untuk setiap pemain, tuliskan jumlah langkah yang diperlukan untuk
mencapai tujuan mereka. Misalnya untuk "dokter yang merawat clubfoot" tujuannya
adalah "menyembuhkan pasien yang menderita clubfoot", sehingga langkah-langkahnya adalah "mendaftarkan pasien
dalam sistem", "memulai rencana kesehatan", "membuat siklus ulasan
kesehatan medis" dan "melakukan prosedur medis".

<figure>
  <img src="images/project-map.jpg" alt="Pemetaan proyek merencanakan langkah-langkah utama untuk setiap pengguna atau pemain dalam alur">
  <figcaption>Pemetaan proyek merencanakan langkah-langkah utama untuk setiap pengguna atau pemain dalam alur.</figcaption>
</figure>

Hasilnya adalah pemetaan proyek dengan langkah-langkah utama dalam prosesnya. Anggap saja itu
sebagai ringkasan proyek tanpa terlalu banyak detail. Ini juga memungkinkan anggota tim
menilai apakah pemetaan cocok dengan pernyataan tantangan. Kemudian, ketika Anda memecah
setiap langkahnya, akan ada detail lebih lanjut. Namun untuk saat ini, pemetaan proyek memberikan Anda
rincian tingkat tinggi dari langkah yang perlu diambil pengguna untuk menyelesaikan tujuan akhir mereka.

## Wireframing dan storyboarding

### Crazy 8s

Untuk ini, saya menyarankan metode yang disebut crazy 8s yang meliputi pelipatan
kertas dua kali lebih banyak sehingga Anda memiliki delapan panel. Kemudian pada setiap panelnya Anda menggambar
sebuah ide berdasarkan semua yang telah Anda pelajari sejauh ini. Berikan diri Anda sepuluh menit agar
muncul dengan ide-ide untuk mengisi semua panel yang berjumlah delapan. Jika Anda memberikan diri Anda waktu lebih dari 20
menit, Anda bisa mulai menunda-nunda, pergi membuat kopi, memeriksa email,
mengobrol dengan tim Anda dan pada dasarnya menghindari melakukan pekerjaan. Anda
ingin menciptakan rasa urgensi dalam langkah ini karena memaksa Anda untuk bekerja dengan cepat
dan lebih efektif.

Jika Anda bekerja dengan tim, suruh mereka semua untuk melakukan hal ini juga. Proses
ini akan menyentak otak Anda dan membuat Anda berpikir tentang tantangan.
Biasanya sketsa akan menjadi wireframe desain antarmuka.

Setelahnya, Anda dan semua orang di tim menyajikan ide-idenya ke kelompok.
Setiap orang harus menjelaskan masing-masing delapan ide mereka secara rinci dan mengapa mereka memilih untuk
mengambil jalur tersebut. Ingatkan setiap anggota tim untuk menggunakan pembelajaran untuk
pembenaran ide-ide mereka. Setelah semua orang mengemukakan idenya, saatnya memilih
ide-ide tersebut. Setiap orang mendapat dua titik tempelan dan bisa memberikan suara pada ide mana pun. Mereka bisa
memberikan kedua suaranya untuk sebuah ide jika mereka benar-benar menyukainya.


<!-- <figure>
  <img src="images/voting-ideas.jpg"   alt="Anda bisa membuat catatan pada posting-nya dan memberikan suara langsung pada konsep atau sketsa">
  <figcaption>Anda bisa membuat catatan pada posting-nya dan memberikan suara langsung pada konsep atau sketsa.</figcaption>
</figure> -->


<figure  class="attempt-left">
  <img src="images/crazy-8s.jpg" alt="Crazy 8s adalah cara yang bagus untuk memasukkan semua ide Anda ke dalam laman".>
  <figcaption>Crazy 8s adalah cara yang bagus untuk memasukkan semua ide Anda ke dalam laman.</figcaption>
</figure>

<figure class="attempt-right">
  <img src="images/detailed-wireframe.jpg"   alt="Sekarang Anda harus melakukan desain terperinci berdasarkan apa yang telah Anda pelajari.">
  <figcaption>Sekarang Anda harus melakukan desain terperinci berdasarkan apa yang telah Anda pelajari.</figcaption>
</figure>

<div class="clearfix"></div>

### Menyaring desain Anda

Setelah pemungutan suara mengambil ide dengan suara terbanyak dan membuat sketsa ide akhir.
Anda juga bisa meminjam ide lain yang Anda dengar dari rekan kerja.
Berikan diri Anda waktu sepuluh menit untuk menyelesaikan tugas ini. Setelah selesai,
presentasikan kembali ide ini ke tim Anda dan lakukan pemungutan suara seperti sebelumnya.

### Membuat storyboard ide


<figure>
  <img src="images/storyboard.jpg" class="attempt-right" alt="Storyboard melibatkan perpaduan sketsa dan ide Anda ke dalam alur komprehensif.">
  <figcaption>Storyboard melibatkan perpaduan sketsa dan ide Anda ke dalam alur komprehensif.</figcaption>
</figure>

Dengan desain di tangan, saatnya untuk membuat storyboard interaksi dengan pengguna.
Di titik ini Anda sebaiknya sudah berpikir tentang langkah berbeda yang diambil
pengguna. Cukup biasa untuk menggabungkan salah satu dari desain rekan Anda ke dalam
alur. Anda memerlukan proses langkah demi langkah yang jelas dengan beberapa titik
di mana pengguna mungkin berbeda. Lihat kembali pemetaan proyek untuk memvalidasi
desain terhadap tujuan Anda.

<div class="clearfix"></div>

## Membuat prototipe

Membuat prototipe bukan tentang menciptakan potongan kode yang sempurna, namun untuk membuat
sesuatu yang bisa dipercaya bila digunakan oleh seseorang. Alat yang digunakan untuk membuat
prototipe berbeda dari orang ke orang. Beberapa alat seperti Keynote atau Powerpoint karena
memaksa Anda untuk memikirkan alur dan tidak merancang detail. Anda mungkin ingin meluangkan
waktu untuk mempelajari alat seperti Balsamiq, Marvel atau Framer yang bisa memberikan
kontrol perilaku yang lebih banyak. Apapun alat (bantu) yang Anda gunakan pastikan itu adalah alat yang membuat Anda
fokus pada alur dan terlihat nyata. Anda harus menguji prototipe pada pengguna yang nyata
sehingga sebisa mungkin dapat dipercaya tapi pada saat yang bersamaan tidak memerlukan
berminggu-minggu jam kerja untuk dibuat.

<figure>
  <img src="images/prototyping.jpg"  alt="Prototipe harus cukup nyata untuk bisa dipercaya">
  <figcaption>Prototipe harus cukup nyata untuk bisa dipercaya.</figcaption>
</figure>

Membuat prototipe adalah keseimbangan antara waktu dan realitas, jadi berhati-hatilah agar tidak
melenceng ke salah satu sisi secara ekstrim. Bila tidak, waktu Anda bisa saja terbuang percuma.

## Pengujian-kegunaan desain Anda

Akan bagus sekali jika Anda memiliki lab pengujian. Bila tidak, membuat lab tidak sulit
asalkan Anda memperhatikan pembuatan lingkungan yang nyaman bagi pengguna serta
tidak mengganggu mereka. Pengujian biasanya melibatkan pengguna dan dua orang dari
tim Anda, satu mencatat dan lainnya mengajukan pertanyaan. Persiapan yang baik adalah dengan
menggunakan aplikasi seperti Hangouts dan merekam tindakannya, ini juga berguna jika Anda
menginginkan seluruh tim untuk mengamati dari ruangan yang berbeda. Hal ini cukup
menakutkan bagi kami sebagai pembuat aplikasi untuk melakukannya saat kami melihat desain kami keluar di alam liar.
Ini bisa menjadi pengalaman yang menyegarkan dan menenangkan.

<figure>
  <img src="images/usability-testing.jpg"  alt="Storyboard termasuk menempatkan semua sketsa dan ide bersama-sama ke dalam alur yang komprehensif.">
  <figcaption>Storyboard termasuk menempatkan semua sketsa dan ide bersama-sama ke dalam alur yang komprehensif.</figcaption>
</figure>

### Pertanyaan untuk ditanyakan

Saat menguji desain Anda, minta pengguna untuk melakukan tugas di aplikasi dan minta mereka
agar berbicara dengan suara keras serta mengungkapkan apa yang mereka lakukan dan mengapa. Ini mungkin terdengar aneh
dilakukan, namun hal ini membantu Anda mengetahui apa yang mereka pikirkan. Cobalah untuk tidak mengganggu atau memberi tahu
mereka apa yang harus dilakukan saat mereka terhenti. Cukup tanyakan kepada pengguna mengapa mereka mengambil
alur tertentu setelah mereka menyelesaikan (atau TIDAK menyelesaikan).

Apa yang perlu Anda ketahui:

- Apa yang mereka suka dari prototipe?
- Apa yang mereka tidak suka dari prototipe?
- Apa saja titik deritanya?
      * Mengapa alur bekerja
      * Mengapa alur tidak bekerja
- Apa yang ingin mereka tingkatkan?
- Apakah keseluruhan desain/alur memenuhi kebutuhan mereka?

## Mengunjungi kembali desain dan rentetan pengujian lagi

Anda memiliki prototipe yang bekerja dengan masukan. Sekarang saatnya merevisi desain
Anda, dan menganalisis apa yang berhasil dan apa yang tidak. Jangan takut untuk membuat
storyboard wireframe yang benar-benar baru dan membuat prototipe baru. Memulai lagi dari awal bisa
membuat alur yang lebih baik dibandingkan mencoba untuk memindahkan sesuatu pada prototipe Anda sebelumnya. Cobalah
agar jangan terlalu sayang karena itu hanyalah prototipe.

Setelah puas dengan desain, Anda bisa mengujinya lagi dan menyempurnakannya
lagi. Dalam kasus di mana prototipe sama sekali tidak mencapai target, Anda mungkin
berpikir proyek itu gagal. Nyatanya, tidak. Anda mungkin menghabiskan
waktu development lebih sedikit dibandingkan jika Anda telah membangun desain dan mengetahui lebih
banyak tentang apa yang benar-benar disukai pengguna. Dengan design sprints, kami memiliki filosofi yaitu
Anda menang atau Anda belajar, jadi jangan terlalu menyalahkan diri sendiri jika ide tersebut
tidak bekerja seperti yang direncanakan.

## Buatlah!

Anda telah menguji ide. Pengguna menyukainya. Pemangku kepentingan berinvestasi
karena mereka telah terlibat sejak awal. Sekarang saat yang tepat untuk
membuatnya. Sekarang, Anda harus memiliki gagasan yang jelas tentang apa yang perlu dilakukan dan apa
prioritas dari pengalaman ini. Pada setiap tonggak bersejarah proyek, Anda mungkin ingin
memperkenalkan pengujian kegunaan untuk membantu memvalidasi pekerjaan dan menjaga Anda tetap
di jalur.

Saya tidak bisa menekankan betapa pentingnya mencari tahu sebanyak mungkin informasi sebelum Anda
berkomitmen untuk banyak pekerjaan, waktu dan energi pada sesuatu yang mungkin saja tidak menjadi
solusi yang tepat.

Artikel ini seharusnya bisa memberikan landasan dasar bagi Anda tentang UX dan arti pentingnya. UX
bukanlah sesuatu yang harus dipandang sebagai peran seorang desainer atau
peneliti. Ini sebenarnya adalah tanggung jawab semua orang yang terlibat dalam proyek
sehingga saya selalu merekomendasikan keterlibatan dalam setiap kesempatan.


{# wf_devsite_translation #}
