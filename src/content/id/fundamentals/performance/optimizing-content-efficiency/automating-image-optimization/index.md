project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Format gambar!

{# wf_updated_on: 2019-02-06#}
{# wf_published_on: 2017-11-16 #}
{# wf_blink_components: Blink>Image,Internals>Images,Internals>Images>Codecs #}

# Mengotomatisasi pengoptimalan gambar {: .page-title }

{% include "web/_shared/contributors/addyosmani.html" %}

**Kita semua harus mengotomatisasi kompresi gambar.**

Pada 2017, pengoptimalan gambar harus diotomatisasi. Ini mudah terlupakan, praktik
terbaik berubah, dan konten yang tidak melewati pipeline build dapat
dengan mudah luput. Untuk mengotomatisasi: Gunakan [imagemin](https://github.com/imagemin/imagemin)
atau [libvps](https://github.com/jcupitt/libvips) untuk proses build Anda. Ada banyak
alternatif.

Sebagian besar CDN (mis.
[Akamai](https://www.akamai.com/us/en/solutions/why-akamai/image-management.jsp))
dan solusi pihak ketiga seperti [Cloudinary](https://cloudinary.com),
[imgix](https://imgix.com), [Fastly's Image
Optimizer](https://www.fastly.com/io/), [Instart Logic's
SmartVision](https://www.instartlogic.com/technology/machine-learning/smartvision)
atau [ImageOptim API](https://imageoptim.com/api) menawarkan solusi pengoptimalan gambar
otomatis yang komprehensif.

Jumlah waktu yang akan Anda habiskan untuk membaca entri blog dan menyesuaikan konfigurasi
lebih besar daripada biaya bulanan layanan (Cloudinary memiliki
tingkat layanan [gratis](http://cloudinary.com/pricing)). Jika Anda tidak ingin mengalihdayakan pekerjaan
ini karena kekhawatiran biaya atau latensi, opsi open-source di atas sudah memadai.
Proyek seperti [Imageflow](https://github.com/imazen/imageflow) atau
[Thumbor](https://github.com/thumbor/thumbor) memungkinkan alternatif yang dihosting sendiri.

**Semua orang harus mengompresi gambar secara efisien.**

Minimal: gunakan [ImageOptim](https://imageoptim.com/). Produk ini dapat secara signifikan
mengurangi ukuran gambar dan mempertahankan kualitas visual. Windows dan Linux
[alternatives](https://imageoptim.com/versions.html) juga tersedia.

Secara spesifik: kompresi JPEG dengan
[MozJPEG](https://github.com/mozilla/mozjpeg) (`q=80` atau lebih rendah tidak masalah untuk konten
web) dan pertimbangkan dukungan [Progressive
JPEG](http://cloudinary.com/blog/progressive_jpegs_and_green_martians),
PNG dengan [pngquant](https://pngquant.org/), dan SVG dengan
[SVGO](https://github.com/svg/svgo). Secara eksplisit hapus metadata (`--strip`
untuk pngquant) guna menghindari menjadi terlalu besar. Daripada GIF animasi yang sangat besar, kirim
video [H.264](https://en.wikipedia.org/wiki/H.264/MPEG-4_AVC) (atau
[WebM](https://www.webmproject.org/) untuk Chrome, Firefox, dan Opera)! Jika
tidak bisa, minimal gunakan [Giflossy](https://github.com/pornel/giflossy). Jika Anda dapat
menerima siklus CPU ekstra, memerlukan kualitas lebih tinggi dari rata-rata web,
dan tidak masalah dengan waktu enkode yang lambat: coba
[Guetzli](https://research.googleblog.com/2017/03/announcing-guetzli-new-open-source-jpeg.html).

Beberapa browser mengiklankan dukungan untuk format gambar melalui header permintaan Accept.
Ini dapat digunakan untuk menyajikan format secara kondisional: mis., lossy
[WebP](/speed/webp/) untuk browser berbasis Blink seperti
Chrome dan fallback seperti JPEG/PNG untuk browser lain.

Selalu ada opsi lain yang dapat Anda lakukan. Fitur ada untuk membuat dan menyajikan `srcset`
breakpoint. Pemilihan resource dapat diotomatisasi di browser berbasis Blink dengan
[client-hints](/web/updates/2015/09/automating-resource-selection-with-client-hints)
dan Anda dapat mengirimkan byte yang lebih kecil kepada pengguna yang memilih "hemat data" di browser
dengan memerhatikan petunjuk
[Save-Data](/web/updates/2016/02/save-data).


Semakin kecil ukuran file gambar yang dapat Anda buat, semakin baik pengalaman
jaringan yang dapat Anda tawarkan kepada pengguna - terutama di seluler. Pada penjelasan ini,
kita akan melihat cara mengurangi ukuran gambar melalui teknik kompresi modern
dengan dampak minimal pada kualitas.

## Pengantar {: #introduction }

**Gambar tetap menjadi penyebab nomor satu bloat di web.**

Gambar menghabiskan banyak bandwidth internet karena sering kali ukuran filenya
besar. Menurut [HTTP Archive](http://httparchive.org/), 60%
data yang ditransfer untuk mengambil halaman adalah berupa gambar yang terdiri dari JPEG, PNG
, dan GIF. Pada 2017, gambar menyumbang
[1.7MB](http://httparchive.org/interesting.php#bytesperpage) dari konten yang
dimuat untuk rata-rata situs 3.0MB.

Menurut Tammy Everts, menambahkan gambar ke sebuah halaman atau memperbesar gambar yang ada
telah
[terbukti](https://calendar.perfplanet.com/2014/images-are-king-an-image-optimization-checklist-for-everyone-in-your-organization/)
meningkatkan rasio konversi. Tidak mungkin gambar akan dihilangkan, maka
berinvestasi pada strategi kompresi yang efisien untuk meminimalkan bloat menjadi
penting.


<img src="images/Modern-Image00.jpg" alt="Lebih sedikit gambar per halaman menciptakan lebih banyak
        konversi. 19 gambar per halaman secara rata-rata terkonversi lebih baik daripada 31
        gambar per halaman secara rata-rata." />

Menurut [penelitian Soasta/Google
](https://www.thinkwithgoogle.com/marketing-resources/experience-design/mobile-page-speed-load-time/)
dari 2016, gambar adalah prediktor tertinggi kedua dari konversi dengan halaman
terbaik memiliki gambar 38% lebih sedikit.


Pengoptimalan gambar terdiri dari berbagai tindakan yang dapat mengurangi ukuran file
gambar. Ini pada akhirnya bergantung pada fidelitas visual yang diperlukan oleh
gambar.


<img src="images/image-optimisation.jpg" alt="Pengoptimalan gambar mencakup sejumlah
        teknik yang berbeda" /> <strong>Pengoptimalan gambar:</strong> Pilih
        format yang tepat, kompresi dengan hati-hati, dan prioritaskan gambar penting daripada
        gambar yang dapat dimuat lambat.


Pengoptimalan gambar umum mencakup kompresi, secara responsif menayangkannya
berdasarkan ukuran layar menggunakan
[`<picture>`](/web/fundamentals/design-and-ux/responsive/images)/[`<img
srcset>`](/web/fundamentals/design-and-ux/responsive/images),
dan mengubah ukurannya untuk mengurangi biaya dekode gambar.


<img src="images/chart_naedwl.jpg" alt="Histogram potensi penghematan gambar
       dari HTTP Archive yang memvalidasi potensi penghematan gambar 30KB dengan
       persentil ke-95." /> Menurut [HTTP
       Archive](http://jsfiddle.net/rviscomi/rzneberp/embedded/result/),
       penghematan per gambar dengan persentil ke-95 (melihat Fungsi
       Distribusi Kumulatif) adalah sebesar 30KB!</strong>


Ada banyak peluang bagi kita untuk mengoptimalkan gambar dengan lebih baik secara kolektif.


<img src="images/image-optim.jpg" alt="ImageOptim digunakan di Mac dengan sejumlah
        gambar yang telah dikompresi dengan penghematan lebih dari 50%" />

ImageOptim gratis, mengurangi ukuran gambar melalui teknik kompresi modern dan
dengan menghapus metadata EXIF yang tidak perlu.



Jika Anda adalah desainer, ada juga [plugin ImageOptim untuk
Sketch](https://github.com/ImageOptim/Sketch-plugin) yang akan mengoptimalkan aset
untuk ekspor. Saya telah merasakan manfaatnya untuk menghemat banyak waktu.

### Bagaimana cara mengetahui apakah gambar perlu dioptimalkan? {: #do-my-images-need-optimization }

Lakukan audit situs melalui [WebPageTest.org](https://www.webpagetest.org/) yang
akan menandai peluang untuk lebih mengoptimalkan gambar (lihat "Compress
Images").


<img src="images/Modern-Image1.jpg" alt="WebPage test mendukung pengauditan untuk
        kompresi gambar melalui bagian compress images" />

Bagian "Compress Images" di laporan WebPageTest mencantumkan gambar yang dapat
dikompresi dengan lebih efisien dan perkiraan penghematan ukuran file yang terjadi.

<img src="images/Modern-Image2.jpg" alt="rekomendasi kompresi gambar dari
        webpagetest" />



[Lighthouse](/web/tools/lighthouse/) mengaudit praktik terbaik performa. Audit
mencakup pengoptimalan gambar dan dapat membuat saran untuk gambar yang
dapat dikompresi lebih lanjut atau menunjukkan gambar di luar layar dan dapat
dimuat lambat.

Mulai Chrome 60, Lighthouse sekarang mendukung [panel
Audits](/web/updates/2017/05/devtools-release-notes#lighthouse) di Chrome
DevTools:


<img src="images/hbo.jpg" alt="Audit Lighthouse untuk
        HBO.com, menampilkan rekomendasi pengoptimalan gambar" /> Lighthouse
        dapat mengaudit fitur Web Performance, Best Practices, dan Progressive Web App
.



Anda juga mungkin mengetahui fitur pengauditan performa lainnya seperti [PageSpeed
Insights](/speed/pagespeed/insights/) atau [Website Speed
Test](https://webspeedtest.cloudinary.com/) oleh Cloudinary yang mencakup
audit analisis gambar mendetail.

## <a id="choosing-an-image-format" href="#choosing-an-image-format">Bagaimana cara memilih format gambar?</a>

Seperti yang dicatat oleh Ilya Grigorik dalam [panduan
pengoptimalan gambar](/web/fundamentals/performance/optimizing-content-efficiency/image-optimization) yang sangat baik ini,
"format yang tepat" untuk gambar adalah kombinasi hasil visual yang diinginkan dan
persyaratan fungsional. Apa Anda bekerja dengan gambar Raster atau Vektor?


<img src="images/rastervvector.png" alt="gambar vektor vs raster"
         />



[Grafis raster](https://en.wikipedia.org/wiki/Raster_graphics) merepresentasikan
gambar dengan mengenkode nilai dari tiap piksel dalam grid piksel berbentuk persegi panjang.
Gambar ini tidak bebas dari resolusi atau zoom. WebP atau format yang didukung luas
seperti JPEG atau PNG menangani grafis ini dengan baik karena fotorealisme diperlukan.
Guetzli, MozJPEG, dan ide laiin yang telah kita diskusikan berlaku dengan baik untuk grafis raster.

[Grafis vektor](https://en.wikipedia.org/wiki/Vector_graphics) menggunakan titik,
garis, dan poligon untuk merepresentasikan gambar dan format menggunakan bentuk geometri sederhana
(mis. logo) yang menawarkan resolusi tinggi dan zoom seperti SVG dan menangani kasus penggunaan ini
dengan lebih baik.

Format yang salah dapat merugikan Anda. Alur logis untuk memilih format yang tepat
dapat berbahaya, jadi bereksperimenlah secara hati-hati dengan penghematan yang dapat digunakan
oleh format lain.

Jeremy Wagner telah membahas
[jalan tengah](http://jlwagner.net/talks/these-images/#/2/2) yang layak dipertimbangkan
saat mengevaluasi format dalam diskusi pengoptimalan gambar.

## JPEG yang sederhana {: #the-humble-jpeg }

[JPEG](https://en.wikipedia.org/wiki/JPEG) mungkin merupakan format gambar yang
paling umum digunakan. Seperti disebutkan sebelumnya, [45%
gambar](http://httparchive.org/interesting.php) yang dilihat disitus yang di-crawl oleh HTTP
Archive adalah JPEG. Ponsel, SLR digital, webcam lama - semua
mendukung codec ini. Format ini sangat tua, berawal pada
1992 saat pertama kali dirilis. Saat itu, sudah ada banyak
penelitian yang dilakukan untuk mencoba menyempurnakan formatnya.

JPEG adalah algoritme kompresi lossy yang membuang informasi untuk menghemat
ruang dan banyak upaya yang dilakukan setelah mencoba mempertahankan fidelitas
visual dan menjaga ukuran file sekecil mungkin.

**Kualitas gambar apa yang dapat diterima untuk kasus penggunaan Anda?**

Format seperti JPEG sangat cocok untuk foto atau gambar dengan sejumlah area
warna. Sebagian besar fitur pengoptimalan memungkinkan Anda menyetel tingkat
kompresi yang Anda sukai, kompresi yang lebih tinggi mengurangi ukuran file namun dapat
menghasilkan artefak, halo, atau degradasi kotak-kotak.


<img src="images/Modern-Image5.jpg" alt="Artefak kompresi JPEG dapat
        semakin jelas terlihat saat kita beralih dari kualitas terbaik ke paling rendah" />

JPEG: Artefak kompresi JPEG dapat semakin jelas terlihat saat kita beralih dari kualitas
terbaik ke paling rendah. Perlu diperhatikan bahwa skor kualitas gambar di satu fitur dapat sangat
berbeda dengan fitur lain.


Saat memilih setelan kualitas yang akan diikuti, pertimbangkan jenis kualitas
gambar:

*   **Kualitas terbaik** - jika kualitas lebih penting daripada bandwidth. Ini mungkin
    karena gambar memiliki kepentingan yang tinggi di desain atau ditampilkan dengan resolusi
    penuh.
*   **Kualitas baik** - jika Anda ingin mengirim ukuran file yang lebih kecil, namun
    tidak ingin terlalu memengaruhi kualitas gambar secara negatif. Pengguna masih memerhatikan
    tingkat kualitas gambar.
*   **Kualitas rendah** - jika Anda cukup memperhitungkan bandwidth sehingga degradasi
    gambar tidak masalah. Gambar ini cocok untuk kondisi jaringan yang
    putus-putus/buruk.
*   **Kualitas terendah** - penghematan bandwidth sangat penting. Pengguna menginginkan pengalaman yang
    cukup memadai, namun akan menerima sedikit degradasi agar
    halaman dimuat dengan lebih cepat.

Berikutnya, mari berbicara tentang mode kompresi JPEG karena ini dapat berdampak besar pada performa
yang dirasakan.

Note: Ada kemungkinan bahwa kita kadang melebih-lebihkan kualitas gambar yang diperlukan oleh
pengguna. Kualitas gambar dapat dianggap menyimpang dari sumber ideal yang
tidak dikompresi. Ini juga bisa subjektif.

## Mode kompresi JPEG {: #jpeg-compression-modes }

Format gambar JPEG memiliki beragam [mode
kompresi](http://cs.haifa.ac.il/~nimrod/Compression/JPEG/J5mods2007.pdf). Tiga mode
populer adalah baseline (berurutan), Progressive JPEG (PJPEG), dan lossless.


**Bagaimana perbedaan JPEG baseline (atau berurutan) dan Progressive JPEG?**

JPEG Baseline (mode default untuk sebagian besar fitur edit dan pengoptimalan gambar)
dienkode dan didekode dengan cara yang cukup sederhana; atas ke bawah. Jika JPEG
baseline dimuat di koneksi yang lambat atau putus-putus, pengguna melihat bagian atas gambar dengan
semakin banyak bagian yang tersingkap saat gambar dimuat. JPEG tanpa loss mirip, namun memiliki rasio kompresi
yang lebih kecil.



<img src="images/Modern-Image6.jpg" alt="JPEG baseline dimuat dari atas ke bawah" />
        JPEG baseline dimuat dari atas ke bawah sedangkan Progressive JPEG dimuat dari
        buram ke tajam.


Progressive JPEG membagi gambar menjadi sejumlah pemindaian. Pemindaian pertama menampilkan
gambar dalam setelan buram atau berkualitas rendah dan pemindaian berikutnya meningkatkan kualitas
gambar. Bayangkan proses ini sebagai penghalusan "secara progresif". Tiap "pemindaian" gambar
menambahkan tingkat detail yang semakin meningkat. Jika dikombinasikan, menciptakan gambar
kualitas penuh.


<img src="images/Modern-Image7.jpg" alt="progressive JPEG dimuat dari
        resolusi rendah ke resolusi tinggi" /> </picture> JPEG baseline memuat
        gambar dari atas ke bawah. PJPEG dimuat dari resolusi rendah (buram) ke
        resolusi tinggi. Pat Meenan juga menuliskan [fitur
        interaktif](http://www.patrickmeenan.com/progressive/view.php?img=https%3A%2F%2Fwww.nps.gov%2Fplanyourvisit%2Fimages%2FGrandCanyonSunset_960w.jpg)
        untuk menguji dan mempelajari pemindaian Pogressive JPEG.


Pengoptimalan JPEG lossless dapat dicapai dengan [menghapus data
EXIF](http://www.verexif.com/en/) yang ditambahkan oleh kamera atau editor digital,
mengoptimalkan [tabel
Huffman](https://en.wikipedia.org/wiki/Huffman_coding) gambar, atau memindai ulang gambar.
Fitur seperti [jpegtran](http://jpegclub.org/jpegtran/) mencapai kompresi
lossless dengan menyusun ulang data yang dikompresi tanpa degradasi gambar.
[jpegrescan](https://github.com/kud/jpegrescan),
[jpegoptim](https://github.com/tjko/jpegoptim), dan
[mozjpeg](https://github.com/mozilla/mozjpeg) (yang akan kita bahas sebentar lagi) jujga
mendukung kompresi JPEG lossless.


### Kelebihan Progressive JPEG {: #the-advantages-of-progressive-jpegs }

Kemampuan PJPEG untuk menawarkan "pratinjau" gambar resolusi rendah saat
memuat meningkatkan performa yang dirasakan - pengguna dapat merasa gambar dimuat
lebih cepat dibandingkan gambar adaptif.

Pada koneksi 3G yang lebih lambat, ini memungkinkan pengguna untuk melihat (dengan kasar) isi gambar
hanya jika bagian file telah diterima dan memutuskan apakah menunggu
gambar hingga dimuat sepenuhnya. Kompresi ini dapat menjadi lebih menyenangkan daripada tampilan gambar dari atas ke bawah
yang ditawarkan oleh JPEG baseline.


<img src="images/pjpeg-graph.png" alt="dampak menunggu waktu peralihan ke
        progressive jpeg" /> Pada 2015, [Facebook beralih ke PJPEG (untuk aplikasi
        iOS-nya)](https://code.facebook.com/posts/857662304298232/faster-photos-in-facebook-for-ios/)
        dan mengalami pengurangan sebesar 10% untuk penggunaan data. Mereka dapat menampilkan gambar
        berkualitas bagus 15% lebih cepat daripada sebelumnya, sehingga mengoptimalkan waktu
        pemuatan yang dirasakan, seperti ditampilkan dalam gambar di atas.


PJPEG dapat meningkatkan kompresi, menghabiskan
[2-10%](http://www.bookofspeed.com/chapter5.html) lebih sedikit bandwidth dibandingkan
JPEG baseline/sederhana untuk gambar di atas 10KB. Rasio kompresi yang lebih tinggi ini
berkat tiap pemindaian pada JPEG yang dapat memiliki
[tabel Huffman](https://en.wikipedia.org/wiki/Huffman_coding) opsional tersendiri. Encoder
JPEG modern (mis. [libjpeg-turbo](http://libjpeg-turbo.virtualgl.org/), MozJPEG,
dll.) memanfaatkan fleksibilitas PJPEG untuk memaketkan data dengan lebih baik.

Note: Mengapa PJPEG mengompresi dengan lebih baik? Blok JPEG baseline dienkode satu per
satu. Dengan PJPEG, koefisien [Discrete Cosine
Transform](https://en.wikipedia.org/wiki/Discrete_cosine_transform) serupa
di lebih dari satu blok dapat dienkode bersama sehingga menghasilkan kompresi lebih
baik.

### Siapa yang menggunakan Progressive JPEG dalam produksi? {: #whos-using-progressive-jpegs-in-production }

*   [Twitter.com mengirim Progressive
    JPEG](https://www.webpagetest.org/performance_optimization.php?test=170717_NQ_1K9P&run=2#compress_images)
    dengan kualitas baseline 85%. Mereka mengukur latensi yang dirasakan
    (waktu untuk memindai pertama kali dan waktu muat keseluruhan) dan menemukan secara keseluruhan, PJPEG
    kompetitif dalam memenuhi kebutuhan mereka untuk waktu transkode dan dekode
    ukuran file yang rendah dan dapat diterima.
*   [Facebook mengirim Progressive JPEG untuk aplikasi
    iOS mereka](https://code.facebook.com/posts/857662304298232/faster-photos-in-facebook-for-ios/).
    Mereka menemukan bahwa kompresi ini mengurangi penggunaan data sebesar 15% dan memungkinkan mereka menampilkan gambar berkualitas
    baik 15% lebih cepat.
*   [Yelp beralih ke Progressive
    JPEG](https://engineeringblog.yelp.com/2017/06/making-photos-smaller.html)
    dan menemukan bahwa kompresi ini bertanggung jawab sebagian atas penghematan pengurangan ukuran gambar sebesar~4,5%
. Mereka juga menghemat ekstra 13,8% menggunakan MozJPEG

### Kekurangan Progressive JPEG {: #the-disadvantages-of-progressive-jpegs }

PJPEG dapat lebih lambat untuk mendekode daripada JPEG baseline - kadang memerlukan waktu 3x lebih
lama. Di mesin desktop dengan CPU canggih ini tidak menjadi kekhawatiran, namun
menjadi masalah jika menggunakan perangkat seluler berspesifikasi rendah dengan resource terbatas. Menampilkan layer
yang tidak lengkap memerlukan upaya karena Anda pada dasarnya mendekode gambar beberapa kali. Proses
beberapa kali ini dapat menghabiskan siklus CPU.

Progressive JPEG tidak *selalu* lebih kecil. Untuk gambar yang sangat kecil (seperti
thumbnail), progressive JPEG dapat menjadi lebih besar daripada JPEG baseline.
Akan tetapi, untuk thumbnail yang demikian kecil, rendering progresif mungkin tidak menawarkan nilai
yang sama.

Ini artinya bahwa saat memutuskan apakah akan mengirim PJPEG atau tidak, Anda harus
bereksperimen dann menemukan keseimbangan yang tepat antara ukuran file, latensi jaringan, dan penggunaan
siklus CPU.

Note: PJPEG (dan semua JPEG) kadang dapat didekode hardware di perangkat
seluler. PJEPG tidak meningkatkan dampak RAM, namun dapat menegasikan beberapa kekhawatiran
CPU. Tidak semua perangkat Android memiliki dukungan akselerasi hardware, namun perangkat
seluler kelas atas memilikinya, begitu juga semua perangkat iOS.

Beberapa pengguna mungkin menganggap pemuatan progresif sebagai kerugian karena dapat
menjadi sulit mengetahui kapan gambar telah selesai dimuat. Karena ini sangat
berbeda menurut audiens, evaluasi apa saja yang cocok untuk pengguna Anda sendiri.

### Bagaimana cara membuat Progressive JPEG? {: #how-to-create-progressive-jpegs }

Fitur dan library seperti [ImageMagick](https://www.imagemagick.org/),
[libjpeg](http://libjpeg.sourceforge.net/),
[jpegtran](http://jpegclub.org/jpegtran/),[
jpeg-recompress](http://jpegclub.org/jpegtran/), dan
[imagemin](https://github.com/imagemin/imagemin) mendukung ekspor Progressive
JPEG. Jika Anda memiliki pipeline pengoptimalan gambar yang sudah ada, ada
kemungkinan bahwa penambahan dukungan pemuatan progresif bisa bersifat langsung:

```js
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

gulp.task('images', function () {
    return gulp.src('images/*.jpg')
        .pipe(imagemin({
            progressive: true

        }))
        .pipe(gulp.dest('dist'));
});
```

Sebagian besar fitur edit gambar menyimpan gambar sebagai file JPEG Baseline secara default.


<img src="images/photoshop.jpg" alt="photoshop mendukung ekspor ke jpeg
        progresif dari menu file export" /> Sebagian besar fitur edit gambar menyimpan gambar
        sebagai file JPEG Baseline secara default. Anda dapat menyimpan gambar yang dibuat di
        Photoshop sebagai Progressive JPEG dengan membuka File -> Export -> Save for
        Web (legacy), lalu mengklik opsi Progressive. Sketch juga
        mendukung ekspor Progressive JPEG - ekspor sebagai JPG dan centang
        kotak centang ‘Progressive’ saat menyimpan gambar.

### Subsampling kroma (atau warna) {: #chroma-subsampling }

Mata kita lebih toleran terhadap hilangnya detail warna dalam gambar (kroma) daripada
luminans (atau disingkat luma - ukuran kecerahan). [Subsampling
kroma](https://en.wikipedia.org/wiki/Chroma_subsampling) adalah bentuk
kompresi yang mengurangi presisi warna dalam sinyal yang mengutamakan luma.
Kompresi ini mengurangi ukuran file, kadang hingga sebesar
[15-17%](https://calendar.perfplanet.com/2015/why-arent-your-images-using-chroma-subsampling/),
tanpa memengaruhi kualitas gambar secara negatif dan merupakan opsi yang tersedia untuk gambar
JPEG. Subsampling juga dapat mengurangi penggunaan memori gambar.



<img src="images/luma-signal.jpg" alt="sinyal = kroma + luma" />


Karena kontras bertanggung jawab untuk membuat bentuk yang kita lihat dalam gambar, luma,
yang menentukannya, cukup penting. Foto hitam putih lama atau tidak difilter
mungkin tidak berisi warna, namun berkat luma, foto ini dapat sama mendetailnya dengan
foto berwarna. Kroma (warna) memiliki lebih sedikit dampak pada persepsi visual.


<img src="images/no-subsampling.jpg"
     alt="JPEG menyertakan dukungan untuk banyak jenis subsampling: tidak ada, horizontal, serta horizontal dan vertikal." />

JPEG mendukung sejumlah jenis subsampling yang berbeda: tidak ada, horizontal, serta
horizontal dan vertikal. Diagram ini dari [JPEG untuk kepiting
horseshoe](http://frdx.free.fr/JPEG_for_the_horseshoe_crabs.pdf) oleh Frédéric Kayser.


Ada sejumlah sampel umum yang didiskusikan saat berbicara tentang subsampling.
Umumnya, `4:4:4`, `4:2:2`, dan `4:2:0`. Namun, apa artinya ini? Katakanlah
sebuah subsampel mengambil format A:B:C. A adalah jumlah piksel dalam sebaris dan untuk
JPEG ini biasanya 4. B merepresentasikan jumlah warna dalam baris pertama dan C
warna dalam baris kedua.

* `4:4:4` tidak memiliki kompresi, jadi warna dan luma dipindahkan dengan lengkap.
* `4:2:2` memiliki setengah sampling secara horizontal dan sampling penuh secara vertikal.
* `4:2:0` mengambil sampel warna dari setengah piksel baris pertama dan mengabaikan
  baris kedua.

Note: jpegtran dan cjpeg mendukung konfigurasi kualitas luminans dan
kroma yang terpisah. Ini dapat dilakukan dengan menambahkan tanda `-sample` (mis `-sample 2x1`).

Beberapa aturan umum yang baik:  subsampling (`-sample 2x2`) cocok untuk foto.
tidak ada subsampling (`-sample 1x1`) sangat cocok untuk screenshot, banner, dan tombol.
Terakhir ada kompromi (`2x1`) yaitu Anda tidak yakin akan menggunakan yang mana.</aside>

Dengan mengurangi piksel dalam komponen kroma, dimungkinkan untuk mengurangi ukuran
komponen warna secara signifikan, sehingga akhirnya mengurangi ukuran byte.


<img src="images/subsampling.jpg" alt="Konfigurasi subsampling Chrome untuk
        JPEG dengan kualitas 80." /> Konfigurasi subsampling Chrome untuk JPEG dengan
        kualitas 80.


Subsampliing kroma layak dipertimbangkan untuk sebagian besar jenis gambar. Subsampling ini memiliki
beberapa pengecualian yang perlu diperhatikan: subsampling mengandalkan keterbatasan mata kita, sehingga
tidak tepat untuk mengompresi gambar jika detail warna sama pentingnya dengan
luminans (mis. gambar medis).

Gambar yang berisi jenis huruf juga dapat terdegradasi karena subsampling teks yang buruk dapat
mengurangi keterbacaannya. Tepi yang lebih tajam lebih sulit untuk dikompresi dengan JPEG karena
didesain untuk menangani adegan fotografi dengan transisi yang lebih lembut.



<img src="images/Screen_Shot_2017-08-25_at_11.06.27_AM.jpg" alt="Berhati-hatilah saat
        menggunakan subsampling berat dengan gambar yang berisi teks" /> [Understanding
        JPEG](http://compress-or-die.com/Understanding-JPG/) merekomendasikan agar mengikuti
        subsampling 4:4:4 (1x1) saat bekerja dengan gambar yang berisi
        teks.


Trivia: Metode subsampling Kroma tidak ditentukan di spesifikasi
JPEG, jadi decoder yang berbeda menanganinya secara berbeda. MozJPEG dan
libjpeg-turbo menggunakan metode penskalaan yang sama. Versi lama libjpeg menggunakan
metode berbeda yang menambahkan artefak berdering dalam warna.

Note: Photoshop menyetel subsampling Chroma secara otomatis saat menggunakan fitur "Save for
web". Jika kualitas gambar disetel antara 51-100, tidak ada subsampling yang digunakan
sama sekali (`4:4:4`). Jika kualitas di bawah ini, subsampling `4:2:0` digunakan
. Ini adalah salah satu alasan pengurangan ukuran file yang jauh lebih besar dapat diamati
saat beralih kualitas dari 51 ke 50.

Note: Dalam pembahasan subsampling istilah
[YCbCr](https://en.wikipedia.org/wiki/YCbCr) sering disebut. Ini adalah model
yang dapat merepresentasikan ruang warna
[RGB](https://en.wikipedia.org/wiki/RGB_color_model) yang dikoreksi gamma. Y adalah
luminans yang dikoreksi gamma, Cb adalah komponen kroma warna biru, dan Cr adalah komponen kroma warna merah
. Jika memerhatikan ExifData, Anda akan melihat YCbCr di samping
tingkat sampling.

Untuk bacaan lebih lanjut tentang Subsampling Kroma, lihat [Why aren’t your images using
Chroma
subsampling?](https://calendar.perfplanet.com/2015/why-arent-your-images-using-chroma-subsampling/).

### Seberapa jauh perkembangan dari JPEG? {: #how-far-have-we-come-from-the-jpeg }

**Berikut ini perkembangan saat ini dari format gambar di web:**

*tl;dr - ada banyak fragmentasi. Kita sering perlu menyajikan secara kondisional
format yang berbeda ke browser yang berbeda untuk memanfaatkan format modern.*


<img src="images/format-comparison.jpg" alt="format gambar modern yang dibandingkan berdasarkan
        kualitas." /> Format (dan pengoptimal) gambar modern yang berbeda digunakan untuk
        mendemonstrasikan kompresi yang memungkinkan dengan ukuran file target 26KB. Kita dapat
        membandingkan kualitas menggunakan
        [SSIM](https://en.wikipedia.org/wiki/Structural_similarity) (kemiripan
        struktural) atau [Butteraugli](https://github.com/google/butteraugli),
        yang akan kita bahas lebih mendetail nanti.


*   **[JPEG 2000](https://en.wikipedia.org/wiki/JPEG_2000) (2000)** -
    peningkatan JPEG yang beralih dari transformasi berbasis discrete cosine ke
    metode berbasis wavelet. **Dukungan browser: Desktop Safari + iOS**
*   **[JPEG XR](https://en.wikipedia.org/wiki/JPEG_XR) (2009)** - alternatif untuk
    JPEG dan JPEG 2000 yang mendukung
    [HDR](http://wikivisually.com/wiki/High_dynamic_range_imaging) dan ruang warna
    [gamut](http://wikivisually.com/wiki/Gamut) yang luas. Menghasilkan file
    yang lebih kecil daripada JPEG dengan kecepatan enkode/dekode yang agak lebih lambat. **Dukungan browser:
    Edge, IE.**
*   **[WebP](https://en.wikipedia.org/wiki/WebP) (2010)** - format berbasis
    prediksi blok oleh Google dengan dukungan untuk kompresi lossy dan lossless.
    Menawarkan penghematan byte yang terkait dengan JPEG dan dukungan transparansi byte berat
    yang sering digunakan untuk PNG. Kekurangan konfigurasi subsampling kroma dan
    pemuatan progresif. Waktu dekode juga lebih lambat daripada decoding JPEG.
    **Dukungan browser: Chrome, Opera. Dieksperimentasikan oleh Safari dan Firefox.**
*   **[FLIF](https://en.wikipedia.org/wiki/Free_Lossless_Image_Format) (2015)**
    - format gambar lossless yang mengklaim melebihi PNG, lossless WebP, lossless
    BPG, dan lossless JPEG 2000 berdasarkan rasio kompresi. **Dukungan browser:
    tidak ada.**
*   **HEIF dan BPG.** Dari perspektif kompresi, semua format ini sama, namun memiliki
    wrapper yang berbeda:
*   **[BPG](https://en.wikipedia.org/wiki/Better_Portable_Graphics) (2015)** -
    ditujukan sebagai pengganti JPEG dengan kompresi lebih efisien, berdasarkan
    HEVC ([High Efficiency Video
    Coding](http://wikivisually.com/wiki/High_Efficiency_Video_Coding)). Tampaknya
    menawarkan ukuran file yang lebih baik dibandingkan MozJPEG dan WebP. Tidak mungkin mendapatkan
    dukungan yang luas karena masalah lisensi. **Dukungan browser: tidak ada. *Perlu diperhatikan bahwa
    ada [decoder JS dalam browser](https://bellard.org/bpg/).***
*   **[HEIF](https://en.wikipedia.org/wiki/High_Efficiency_Image_File_Format)
    (2015)** - format untuk gambar dan urutan gambar untuk menyimpan gambar
    yang dienkode HEVC dengan penerapan antarprediksi yang dibatasi. Apple mengumumkan di
    [WWDC](https://www.cnet.com/news/apple-ios-boosts-heif-photos-over-jpeg-wwdc/)
    mereka akan mempelajari peralihan ke HEIF pada JPEG untuk iOS, dengan mengutip penghematan hingga 2x
    untuk ukuran file. **Dukungan browser: Tidak ada pada saat penulisan ini.
    Terakhir, desktop Safari dan iOS 11**

Jika Anda cenderung visual, Anda mungkin mengapresiasi
[salah satu](https://people.xiph.org/~xiphmont/demo/daala/update1-tool2b.shtml) dari
[ini](http://xooyoozoo.github.io/yolo-octo-bugfixes/#cologne-cathedral&jpg=s&webp=s)
fitur perbandingan untuk beberapa di atas.

Jadi, **dukungan browser terfragmentasi** dan jika Anda ingin memanfaatkan salah satu
dari di atas, Anda mungkin harus menyajikan secara kondisional fallback untuk masing-masing
browser target. Di Google, kami telah melihat promise dengan WebP, jadi kami akan membahasnya
lebih dalam sebentar lagi.

Anda juga dapat menyajikan format gambar (mis. WebP, JPEG 2000) dengan ekstensi .jpg (atau
lainnya) karena browser dapat merender gambar, maka dapat memutuskan jenis media. Ini
memungkinkan [negosiasi
jenis konten](https://www.igvita.com/2012/12/18/deploying-new-image-formats-on-the-web/) di sisi server
memutuskan gambar mana yang akan dikirim tanpa perlu mengubah HTML sama sekali.
Layanan seperti Instart Logic menggunakan pendekatan ini saat mengirimkan gambar ke pelanggan
mereka.

Berikutnya, mari membahas opsi jika Anda tidak dapat secara kondisional menyajikan
format gambar yang berbeda: **mengoptimalkan encoder JPEG**.


### Mengoptimalkan encoder JPEG {: #optimizing-jpeg-encoders }

Encoder JPEG modern berupaya menghasilkan file JPEG yang lebih kecil dengan fidelitas lebih tinggi
dan mempertahankan kompatibilitas dengan browser dan aplikasi pemrosesan
gambar yang sudah ada. Encoder tersebut menghindari keharusan menghasilkan format gambar baru atau perubahan
ekosistem yang memungkinkan hasil kompresi. Dua encoder yang seperti ini adalah
MozJPEG dan Guetzli.

***tl;dr Encoder JPEG pengoptimalan mana yang sebaiknya Anda gunakan?***

* Aset web umum: MozJPEG
* Kualitas adalah perhatian utama Anda dan Anda tidak keberatan dengan waktu enkode yang lama: gunakan Guetzli
* Jika butuh konfigurabilitas:
 * [JPEGRecompress](https://github.com/danielgtaylor/jpeg-archive) (yang menggunakan
   MozJPEG di dalamnya)
 * [JPEGMini](http://www.jpegmini.com/). Mirip dengan Guetzli - memilih kualitas
   terbaik secara otomatis. Ini tidak secanggih Guetzli, namun
   lebih cepat, dan membidik rentang kualitas yang lebih sesuai untuk web.
 * [ImageOptim API](https://imageoptim.com/api) (dengan antarmuka online gratis
   [di sini](https://imageoptim.com/online)) - bersifat unik dalam menangani
   warna. Anda dapat memilih kualitas warna secara terpisah dari kualitas keseluruhan. Fitur ini
   secara otomatis memilih tingkat subsampling kroma untuk mempertahankan warna resolusi tinggi dalam
   screenshot, namun menghindari byte sampah pada warna yang mulus dalam foto alami.

### Apa itu MozJPEG? {: #what-is-mozjpeg }

Mozilla menawarkan encoder JPEG yang dimodernisasi dalam bentuk
[MozJPEG](https://github.com/mozilla/mozjpeg). Mozilla
[mengklaim](https://research.mozilla.org/2014/03/05/introducing-the-mozjpeg-project/)
menghemat file JPEG hingga sebesar 10%. File yang dikompresi dengan MozJPEG berfungsi
di berbagai browser dan beberapa fiturnya mencakup pengoptimalan pemindaian progresif,
[kuantisasi trellis](https://en.wikipedia.org/wiki/Trellis_quantization)
(menghapus detail yang mengompresi paling kecil) dan beberapa [preset tabel
kuantisasi](https://calendar.perfplanet.com/2014/mozjpeg-3-0/) yang memadai untuk membantu
membuat gambar DPI Tinggi yang lebih mulus (namun ini dimungkinkan dengan ImageMagick jika
Anda mau mengubah konfigurasi XML).

MozJPEG didukung di
[ImageOptim](https://github.com/ImageOptim/ImageOptim/issues/45) dan ada
[plugin
imagemin](https://github.com/imagemin/imagemin-mozjpeg) yang relatif dapat diandalkan dan dapat dikonfigurasi untuk fitur ini. Berikut ini contoh
implementasi dengan Gulp:

```js
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');

gulp.task('mozjpeg', () =>
    gulp.src('src/*.jpg')
    .pipe(imagemin([imageminMozjpeg({
        quality: 85

    })]))
    .pipe(gulp.dest('dist'))
);
```


<img src="images/Modern-Image10.jpg" alt="mozjpeg sedang dijalankan dari
        command-line" />




<img src="images/Modern-Image11.jpg" alt="perbandingan guetzli dengan kualitas
        berbeda. Dengan q=90, 841KB. Dengan q=85, 562KB. Dengan q=75, 324KB. Selain itu,
        Skor Butteraugli dan SSIM agak lebih buruk karena kita menurunkan kualitas." />

MozJPEG: Perbandingan skor ukuran file dan kemiripan visual dengan kualitas
berbeda-beda.

Saya menggunakan [jpeg-compress](https://github.com/imagemin/imagemin-jpeg-recompress)
dari proyek [jpeg-archive](https://github.com/danielgtaylor/jpeg-archive)
untuk menghitung skor SSIM (The Structural Similarity) dari gambar sumber.
SSIM adalah metode mengukur kemiripan antara dua gambar, dengan skor
SSIM sebagai ukuran kualitas satu gambar dan gambar lainnya dianggap "sempurna".

Berdasarkan pengalaman saya, MozJPEG adalah opsi yang baik untuk mengompresi gambar untuk web dengan
kualitas visual tinggi saat mengirimkan pengurangan ukuran file. Untuk ukuran gambar kecil hingga
sedang, saya menemukan bahwa MozJPEG (dengan kualitas=80-85) menghasilkan penghematan 30-40%
ukuran file sembari mempertahankan SSIM yang dapat diterima, yang menawarkan peningkatan sebesar 5-6% pada
jpeg-turbo. Fitur ini juga memiliki [encoding
lebih lambat](http://www.libjpeg-turbo.org/About/Mozjpeg) daripada JPEG baseline, namun Anda
mungkin tidak merasa ini sebagai hambatan.

Note: jika Anda memerlukan fitur yang mendkung MozJPEG dengan dukungan konfigurasi tambahan
dan beberapa utilitas gratis untuk perbandingan gambar, lihat
[jpeg-recompress](https://github.com/danielgtaylor/jpeg-archive). Jeremy Wagner,
pengarang Web Performance in Action telah sukses menggunakannya dengan konfigurasi
[ini](https://twitter.com/malchata/status/884836650563579904).


### Apa itu Guetzli? {: #what-is-guetzli }

[Guetzli](https://github.com/google/guetzli) adalah encoder JPEG
perseptual yang menjanjikan, namun lambat, dari Google yang mencoba menemukan JPEG terkecil yang
secara persepsi tidak dapat dibedakan dari aslinya oleh mata manusia. Encoder ini melakukan
urutan eksperimen yang menghasilkan proposal JPEG akhir, yang membentuk
error psikovisual tiap proposal. Dari urutan eksperimen ini, fitur ini memilih proposal
dengan skor tertinggi sebagai hasil akhir.

Untuk mengukur perbedaan antara gambar, Guetzli menggunakan
[Butteraugli](https://github.com/google/butteraugli), yaitu model untuk mengukur
perbedaan gambar berdasarkan persepsi manusia (dibahas di bawah). Guetzli dapat
mempertimbangkan beberapa properti visual yang tidak diperhatikan oleh encoder JPEG lain. Sebagai
contoh, ada hubungan antara lampu hijau yang terlihat dan
sensitivitas terhadap biru, jadi perubahan pada biru di sekeliling hijau dapat dienkode
dengan sedikit kurang presisi.

Note: Ukuran file gambar **jauh** lebih bergantung pada pilihan **kualitas**
daripada pilihan **codec**. Ada perbedaan ukuran file yang jauh lebih besar
antara JPEG kualitas terendah dan tertinggi jika dibandingkan dengan penghematan ukuran file
yang dimungkinkan oleh  beralih codec. Menggunakan kualitas terendah yang dapat diterima sangat
penting. Hindari menyetel kualitas terlalu tinggi tanpa memerhatikannya.

Guetzli
[mengklaim](https://research.googleblog.com/2017/03/announcing-guetzli-new-open-source-jpeg.html
) mencapai pengurangan ukuran data gambar sebesar 20-30% untuk skor Butteraugli
dibandingkan dengan pengompresi lain. Perlu diperhatikan bahwa Guetzli sangat
lambat dan saat ini hanya cocok untuk konten statis.
Dari README, kita dapat memerhatikan bahwa Guetzli memerlukan memori yang sangat besar - dapat
menghabiskan waktu 1 menit+ 200MB RAM per megapiksel. Ada thread yang bagus tentang pengalaman
nyata menggunakan Guetzli di [thread
Github ini](https://github.com/google/guetzli/issues/50). Fitur ini dapat ideal jika
Anda mengoptimalkan gambar sebagai bagian dari proses build untuk situs statis, namun kurang
ideal jika dilakukan sesuai permintaan.

Note: Guetzli mungkin lebih cocok jika Anda mengoptimalkan gambar sebagai bagian dari
proses build untuk situs statis, atau jika pengoptimalan gambar tidak
dilakukan sesuai permintaan.

Fitur seperti ImageOptim mendukung pengoptimalan Guetzli (di [versi
terbarunya](https://imageoptim.com/)).

```js
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const imageminGuetzli = require('imagemin-guetzli');

gulp.task('guetzli', () =>
    gulp.src('src/*.jpg')
    .pipe(imagemin([
        imageminGuetzli({
            quality: 85
        })
    ]))
    .pipe(gulp.dest('dist'))

);
```


<img src="images/Modern-Image12.jpg" alt="guetzli sedang dijalankan dari gulp untuk
        pengoptimalan" />


Perlu waktu hampir tujuh menit (dan penggunaan CPU yang tinggi) untuk mengenkode 3 x 3MP gambar menggunakan
Guetzli dengan penghematan yang bervariasi. Untuk mengarsipkan foto resolusi lebih tinggi, saya dapat melihat fitur
ini menawarkan beberapa nilai.


<img src="images/Modern-Image13.jpg" alt="perbandingan guetzli dengan kualitas
        berbeda. q=100, 945KB. q=90, 687KB. q=85, 542KB." /> Guetzli:
        Perbandingan skor ukuran file dan kemiripan visual dengan kualitas
        berbeda.



Note: Direkomendasikan untuk menjalankan Guetzli pada gambar berkualitas tinggi (mis. gambar
masukan yang tidak dikompresi, sumber PNG, atau JPEG dengan kualitas 100% atau mendekati). Meski berfungsi di
gambar lainnya (mis. JPEG dengan kualitas 84 atau lebih rendah), hasilnya dapat lebih buruk.

Mengompresi gambar dengan Guetzli menghabiskan waktu banyak dan
membuat kipas berputar kencang, namun untuk gambar besar, fitur ini layak digunakan. Saya telah melihat sejumlah
contoh fitur ini menghemat sekitar 40% ukuran file sembari mempertahankan fidelitas
visual. Karena itu, fitur ini cocok untuk mengarsipkan foto. Pada gambar kecil hingga sedang
, saya masih melihat ada sedikit penghematan (antara 10-15KB), namun tidak
disebutkan. Guetzli dapat menghasilkan distorsi yang cenderung liquify-esque pada
gambar kecil saat mengompresi.

Anda juga mungkin tertarik pada penelitian Eric Portis
[yang membandingkan](https://cloudinary.com/blog/a_closer_look_at_guetzli) Guetzli dengan
kompresi otomatis Cloudinary untuk nilai data yang berbeda terkait efektivitas.

### Bagaimana perbandingan MozJPEG dengan Guetzli? {: #mozjpeg-vs-guetzli }

Perbandingan encoder JPEG yang berbeda bersifat kompleks - kita perlu membandingkan
kualitas dan fidelitas gambar yang dikompresi serta ukuran akhir. Seperti kata
pakar kompresi gambar Kornel Lesi&#x144;ski, membuat tolok ukur satu aspek, bukan kedua
aspek tersebut, dapat menghasilkan kesimpulan yang
[tidak valid](https://kornel.ski/faircomparison).

Bagaimana perbandingan Guetzli dengan MozJPEG? - Pendapat Kornel:

* Guetzli disiapkan untuk gambar berkualitas lebih tinggi (butteraugli disebut sebagai yang terbaik untuk
  `q=90`+, nilai yang efektif untuk MozJPEG sekitar `q=75`)
* Guetzli jauh lebih lambat mengompresi (keduanya menghasilkan JPEG standar, jadi ecoding
  cepat seperti biasanya)
* MozJPEG tidak otomatis memilih setelan kualitas, namun Anda dapat menemukan kualitas optimal
  menggunakan fitur eksternal, mis.
  [jpeg-archive](https://github.com/danielgtaylor/jpeg-archive)

Terdapat sejumlah metode untuk menentukan apakah gambar yang dikompresi secara visual
mirip atau terlihat mirip dengan sumbernya. Studi kualitas gambar sering menggunakan
metode seperti
(kemiripan struktural) [SSIM](https://en.wikipedia.org/wiki/Structural_similarity). Namun, Guetzli mengoptimalkan Butteraugli.

### Butteraugli {: #butteraugli }

[Butteraugli](https://github.com/google/butteraugli) adalah proyek Google yang
memperkirakan titik ketika seseorang dapat memerhatikan degradasi gambar visual (
kemiripan psikovisual) dari dua gambar. Butteraugli memberi skor gambar yang
dapat diandalkan dalam domain perbedaan yang hampir tidak dapat diperhatikan. Butteraugli tidak hanya
memberi skor skalar, namun juga menghitung peta spasial level
perbedaan. SSIM melihat gabungan error dari suatu gambar,
Butteraugli melihat bagian terburuk.


<img src="images/Modern-Image14.jpg" alt="butteraugli memvalidasi gambar
        burung beo" /> Di atas adalah contoh yang digunakan Butteraugli untuk menemukan ambang minimal
        kualitas JPEG sebelum degradasi visual menjadi cukup buruk bagi
        pengguna untuk memerhatikan bahwa ada sesuatu yang tidak jelas. Ini menghasilkan pengurangan sebesar 65%
        dari ukuran file total.



Pada praktiknya, Anda akan menentukan target kualitas visual dan kemudian menjalankan
sejumlah strategi pengoptimalan gambar yang berbeda, melihat skor
Butteraugli, sebelum memilih metode yang paling sesuai untuk keseimbangan
ukuran file dan level kualitas.


<img src="images/Modern-Image15.jpg"
        alt="butteraugli sedang dijalankan dari command line" /> Secara keseluruhan, saya
        perlu waktu sekitar 30 menit untuk menyiapkan Butteraugli secara lokal setelah menginstal Bazel dan
        mendapatkan build sumber C++ untuk dikompilasi dengan benar di Mac. Menggunakan
        prosesnya relatif bersifat langsung: tentukan dua gambar untuk
        dibandingkan (sumber gambar dan versi kompresi), Anda akan mendapatkan skor
        untuk digunakan.


**Bagaimana perbedaan Butteraugli dengan cara perbandingan kemiripan visual lainnya?**

[Komentar
ini](https://github.com/google/guetzli/issues/10#issuecomment-276295265)
dari anggota proyek Guetzli menyebutkan bahwa Guetzli memberikan skor terbaik untuk Butteraugli, skor terburuk
untuk SSIM, dan skor MozJPEG sama dengan keduanya. Hasil ini sejalan dengan
penelitian yang telah saya lakukan dalam strategi pengoptimalan gambar saya sendiri. Saya menjalankan Butteraugli dan
modul Node seperti [img-ssim](https://www.npmjs.com/package/img-ssim) pada
gambar untuk membandingkan sumber dengan skor SSIM sebelum/setelah Guetzli dan
MozJPEG.

**Mengombinasikan encoder?**

Untuk gambar yang lebih besar, saya menemukan bahwa mengombinasikan Guetzli dengan **kompresi lossless **di
MozJPEG (jpegtran, bukan cjpeg agar tidak mengabaikan pekerjaan yang dilakukan oleh Guetzli)
dapat menghasilkan pengurangan ukuran file lebih lanjut sebesar 10-15% (55% keseluruhan) hanya dengan
pengurangan kecil di SSIM. Hasil ini saya ingatkan memerlukan
eksperimentasi dan analisis, namun juga telah dicoba oleh orang lain dalam bidang ini, misalnya
[Ariya Hidayat](https://ariya.io/2017/03/squeezing-jpeg-images-with-guetzli) dengan
hasil yang menjanjikan.

MozJPEG adalah encoder yang cocok bagi pemula untuk aset web yang relatif cepat
dan menghasilkan gambar berkualitas baik. Karena Guetzli menggunakan banyak resource dan sangat
cocok untuk gambar besar dan berkualitas tinggi, saya menyarankannya untuk
pengguna tingkat menengah dan lanjutan.


## Apa itu WebP? {: #what-is-webp }

[WebP](/speed/webp/) adalah format gambar baru-baru ini dari
Google yang bertujuan untuk menawarkan ukuran gambar lebih kecil pada kompresi lossless dan lossy dengan
kualitas visual yang dapat diterima. Fitur ini mencakup dukungan untuk transparency alpha-channel
dan animasi.

Tahun lalu, WebP mendapatkan beberapa persen kompresi lossy dan
lossless  dan kecepatan algoritme dua kali lebih cepat dengan peningkatan 10%
untuk dekompresi.  WebP bukanlah fitur untuk semua tujuan, namun memiliki
reputasi dan basis pengguna yang semakin berkembang dalam komunitas kompresi gambar. Mari
mempelajari alasannya.


<img src="images/Modern-Image16.jpg" alt="perbandingan webp dengan
       setelan kualitas berbeda. q=90, 646KB. q=80= 290KB. q=75, 219KB. q=70, 199KB" />
       WebP: Perbandingan skor ukuran file dan kemiripan visual dengan
       kualitas berbeda.


### Bagaimana performa WebP? {: #how-does-webp-perform }

**Kompresi Lossy**

File lossy WebP, menggunakan varian encoding key frame VP8 atau VP9,
secara rata-rata, dikutip oleh tim WebP,
[25-34%](/speed/webp/docs/webp_study) lebih kecil daripada
file JPEG.

Dalam rentang kualitas rendah (0-50), WebP memiliki banyak kelebihan daripada JPEG karena
dapat memburamkan artefak kotak-kotak yang jelek. Setelan kualitas menengah (-m 4 -q 75)
adalah keseimbangan default antara kecepatan/ukuran file. Dalam rentang yang lebih tinggi (80-99),
kelebihan WebP menurun. WebP direkomendasikan jika kecepatan lebih penting daripada
kualitas.

**Kompresi Lossless**

[File lossless WebP 26% lebih kecil daripada file
PNG](/speed/webp/docs/webp_lossless_alpha_study).
Penurunan waktu muat lossless jika dibandingkan dengan PNG sebesar 3%. Dengan demikian, Anda secara umum
tidak ingin mengirimkan lossless kepada pengguna di web. Ada perbedaan
antara lossless dan tepi tajam (mis. non-JPEG). WebP lossless mungkin lebih
sesuai untuk konten arsip.

**Transparency**

WebP memiliki channel transparency 8-bit lossless dengan hanya 22% byte lebih besar daripada
PNG. Fitur ini juga mendukung transparency RGB lossy, yang unik dari WebP.

**Metadata**

Format file WebP mendukung metadata foto EXIF dan metadata dokumen digital XMP
. Format ini juga berisi Profil Warna ICC.

WebP menawarkan kompresi yang lebih baik, namun menggunakan lebih banyak CPU. Pada
2013, kecepatan kompresi WebP ~10x lebih lambat daripada JPEG, namun sekarang
hampir sama (beberapa gambar mungkin 2x lebih lambat). Untuk gambar statis yang diproses sebagai
bagian dari build, kecepatan ini tidak menjadi masalah besar. Gambar yang dibuat
secara dinamis kemungkinan menyebabkan voerhead CPU yang dapat dirasakan dan Anda
perlu mengevaluasinya.

Note: Setelan kualitas lossy WebP tidak dapat dibandingkan secara langsung dengan JPEG. JPEG dengan
"kualitas 70%" agak berbeda dengan gambar WebP dengan "kualitas 70%" karena
WebP mencapai ukuran file yang lebih kecil dengan membuat lebih banyak data.


### Siapa yang menggunakan WebP dalam produksi? {: #whos-using-webp-in-production }

Banyak perusahaan besar menggunakan WebP dalam produksi untuk mengurangi biaya dan menurunkan
waktu muat halaman.

Google melaporkan penghematan 30-35% menggunakan WebP dibandingkan skema kompresi lossy lainnya,
melayani 43 miliar permintaan gambar per hari, 26% di antaranya adalah kompresi lossless.
Jumlah permintaan tersebut sangat besar dan memberikan penghematan signifikan. Penghematan tentu akan
lebih besar jika [dukungan browser](http://caniuse.com/#search=webp) lebih baik dan
banyak digunakan. Google juga menggunakannya dalam situs produksi seperti Google Play dan
YouTube.

Netflix, Amazon, Quora, Yahoo, Walmart, EBay, The Guardian, Fortune, dan USA
Today, semua mengompresi dan menyajikan gambar dengan WebP untuk browser yang mendukungnya.
VoxMedia [memangkas 1-3 detik waktu
muat](https://product.voxmedia.com/2015/8/13/9143805/performance-update-2-electric-boogaloo)
untuk The Verge dengan beralih ke WebP bagi pengguna Chrome.
[500px](https://iso.500px.com/500px-color-profiles-file-formats-and-you/) mengalami
rata-rata 25% pengurangan ukuran file gambar dengan kualitas yang serupa atau lebih baik
saat beralih menggunakan WebP bagi pengguna Chrome.

Ada beberapa perusahaan lainnya yang tidak tercantum dalam contoh daftar ini.


<img src="images/webp-conversion.jpg" alt="Statistik WebP di Google: lebih 43 miliar permintaan gambar
        per hari" /> penggunaan WebP di Google: 43 miliar gambar WebP
        per hari disajikan di YouTube, Google Play, Chrome Data Saver, dan G+.

### Bagaimana cara kerja encoding WebP? {: #how-does-webp-encoding-work }

Encoding lossy WebP didesain bersaing dengan JPEG untuk gambar diam. Ada
tiga fase utama dalam encoding lossy WebP:

**Blok makro** - membagi gambar menjadi 16x16 blok (makro) piksel luma
dan dua 8x8 blok piksel kroma. Proses ini mungkin mirip dengan proses
konversi ruang warna, downsampling channel kroma, dan subdivisi
gambar pada JPEG.


<img src="images/Modern-Image18.png" alt="Contoh makro blok Google
        Doodle di mana kita menguraikan serangkaian piksel menjadi blok luma dan kroma
."/>



**Prediksi** - setiap 4x4 subblok dari makroblok menerapkan prediksi model
yang secara efektif melakukan pemfilteran. Ini menentukan dua set piksel di sekitar
sebuah blok - A (baris yang langsung di atasnya) dan L (kolom di sebelah kirinya).
Menggunakan kedua set ini, encoder mengisi blok tes dengan 4x4 piksel dan menentukan
yang mana membuat nilai yang paling mendekati blok asal. Colt McAnlis membahasnya
secara lebih mendalam di [How WebP lossy mode
works](https://medium.com/@duhroach/how-webp-works-lossly-mode-33bd2b1d0670).



<img src="images/Modern-Image19.png" alt="Contoh segmen Google Doodle
       yang menampilkan baris, blok target, dan kolom L saat mempertimbangkan
       model prediksi."/>



Discrete Cosine Transform (DCT) diterapkan dengan beberapa langkah yang serupa dengan encoding
JPEG. Perbedaan utama adalah penggunaan [Arithmetic
Compressor](https://www.youtube.com/watch?v=FdMoL3PzmSA&index=7&list=PLOU2XLYxmsIJGErt5rrCqaSGTMyyqNt2H)
dibanding Huffman JPEG.

Jika Anda ingin membahas lebih lanjut, artikel Google Developer [WebP Compression
Techniques](/speed/webp/docs/compression) membahas
topik ini secara mendalam.


### Dukungan browser WebP {: #webp-browser-support }

Tidak semua browser mendukung WebP, akan tetapi [menurut
CanIUse.com](http://caniuse.com/webp), dukungan pengguna global sebesar kira-kira 74%.
Chrome dan Opera secara native mendukungnya. Safari, Edge, dan Firefox telah
bereksperimen dengan WebP, namun belum merilisnya secara resmi. Karena itu,
penyajian gambar WebP kepada pengguna biasanya bergantung pada developer web.
Selengkapnya tentang hal ini nanti.

Berikut ini informasi dukungan dan browser utama:

* Chrome: Chrome memulai dukungan penuh pada versi 23.
* Chrome untuk Android: Sejak Chrome 50
* Android: Sejak Android 4.2
* Opera: Sejak 12.1
* Opera Mini: Semua versi
* Firefox: Beberapa dukungan beta
* Edge: Beberapa dukungan beta
* Internet Explorer: Tidak ada dukungan
* Safari: Beberapa dukungan beta

WebP bukan tidak memiliki kekurangan. WebP kekurangan opsi ruang warna resolusi penuh
dan tidak mendukung decoding progresif. Dengan demikian, fitur WebP cukup memadai
dan dukungan browser, walau terbatas pada Chrome dan Opera pada saat penulisan artikel ini,
dapat mencukupi kebutuhan pengguna sehingga layak dipertimbangkan dengan
fallback.

### Bagaimana cara mengonversi gambar ke WebP? {: #how-do-i-convert-to-webp }

Beberapa paket edit dan pemrosesan gambar komersial dan open source mendukung
WebP. Salah satu aplikasi yang sangat berguna adalah XnConvert: konverter pemrosesan gambar massal
gratis, lintas-platform.

Note: Sebaiknya hindari konversi JPEG berkualitas rendah atau rata-rata ke WebP.
Ini merupakan kesalahan umum dan dapat menghasilkan gambar WebP dengan artefak
kompresi JPEG. Proses ini dapat menyebabkan WebP menjadi kurang efisien karena harus menyimpan
gambar dan distorsi yang ditambahkan oleh JPEG, sehingga Anda kehilangan kualitas
dua kali. Berikan file sumber dengan kualitas terbaik yang ada ke aplikasi konversi, diutamakan
aslinya.

**[XnConvert](http://www.xnview.com/en/xnconvert/)**

XnConvert memungkinkan pemrosesan gambar massal, kompatibel dengan lebih dari 500 format
gambar. Anda dapat mengombinasikan lebih dari 80 tindakan terpisah untuk mentransformasi atau mengedit
gambar dengan beberapa cara.


<img src="images/Modern-Image20.png" alt="Aplikasi XNConvert di Mac dengan sejumlah
        gambar dikonversi ke WebP"
         />
XnConvert mendukung pengoptimalan gambar massal, yang memungkinkan konversi
langsung dari file sumber ke WebP dan format lain. Selain
kompresi, XnConvert juga membantu penghapusan metadata, crop,
penyesuaian kedalaman warna, dan transformasi lainnya.


Beberapa opsi yang tercantum di situs xnview antara lain:

*   Metadata: Editing
*   Transforms: Rotate, Crop, Resize
*   Adjustments: Brightness, Contrast, Saturation
*   Filters: Blur, Emboss, Sharpen
*   Effects: Masking, Watermark, Vignetting

Hasil operasi dapat diekspor ke sekitar 70 format
file yang berbeda, termasuk WebP. XnConvert gratis untuk Linux, Mac, dan Windows.
XnConvert sangat direkomendasikan, terutama untuk bisnis kecil.

**Modul node**

[Imagemin](https://github.com/imagemin/imagemin) adalah modul pengecilan gambar populer
yang juga memiliki add-on untuk mengonversi gambar ke WebP
([imagemin-webp](https://github.com/imagemin/imagemin-webp)). Fitur ini mendukung
mode lossy dan lossless.

Untuk menginstal imagemin dan imagemin-webp jalankan:

```
> npm install --save imagemin imagemin-webp
```

Lalu, kita memerlukan() di kedua modul dan menjalankannya pada gambar apa saja (mis. JPEG)
dalam direktori proyek. Di bawah kita menggunakan encoding lossy dengan kualitas
encoder WebP 60:


```js
const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');

imagemin(['images/*.{jpg}'], 'images', {
    use: [
        imageminWebp({quality: 60})
    ]
}).then(() => {
    console.log('Images optimized');
});
```


Serupa dengan JPEG, ada kemungkinan untuk memerhatikan artefak kompresi dalam hasilnya.
Lakukan evaluasi setelan kualitas mana yang cocok untuk gambar Anda sendiri. Imagemin-webp juga
dapat digunakan untuk mengenkode gambar WebP kualitas lossless (mendukung warna 24-bit dan
transparency penuh) dengan meneruskan `lossless: true` ke opsi:


```js
const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');

imagemin(['images/*.{jpg,png}'], 'build/images', {
    use: [
        imageminWebp({lossless: true})
    ]
}).then(() => {
    console.log('Images optimized');
});
```


[Plugin WebP untuk Gulp](https://github.com/sindresorhus/gulp-webp) oleh Sindre
Sorhus yang dibuat berdasarkan imagemin-webp dan [pemuat WebP untuk
WebPack](https://www.npmjs.com/package/webp-loader) juga tersedia. Plugin Gulp
menerima opsi yang dilakukan oleh add-on imagemin:

```js
const gulp = require('gulp');
const webp = require('gulp-webp');

gulp.task('webp', () =>
    gulp.src('src/*.jpg')
    .pipe(webp({
        quality: 80,
        preset: 'photo',
        method: 6
    }))
    .pipe(gulp.dest('dist'))
);
```

Atau lossless:

```js
const gulp = require('gulp');
const webp = require('gulp-webp');

gulp.task('webp-lossless', () =>
    gulp.src('src/*.jpg')
    .pipe(webp({
        lossless: true
    }))
    .pipe(gulp.dest('dist'))
);
```

**Pengoptimalan gambar massal menggunakan Bash**

XNConvert mendukung kompresi gambar massal, namun jika Anda ingin menghindari
penggunaan aplikasi atau sistem build, biner bash dan pengoptimalan gambar menjadikan prosesnya
cukup sederhana.

Anda dapat mengonversi secara massal gambar ke WebP menggunakan
[cwebp](/speed/webp/docs/cwebp):

```
find ./ -type f -name '*.jpg' -exec cwebp -q 70 {} -o {}.webp \;
```

Atau mengoptimalkan sumber gambar secara massal dengan MozJPEG menggunakan
[jpeg-recompress](https://github.com/danielgtaylor/jpeg-archive):

```
find ./ -type f -name '*.jpg' -exec jpeg-recompress {} {} \;
```

dan memangkas SVG menggunakan [svgo](https://github.com/svg/svgo) (yang akan kita
bahas nanti):

```
find ./ -type f -name '*.svg' -exec svgo {} \;
```

Jeremy Wagner menuliskan postingan yang lebih komprehensif tentang [pengoptimalan gambar menggunakan
Bash](https://jeremywagner.me/blog/bulk-image-optimization-in-bash) dan postingan lain
tentang ekerjaan ini secara
[paralel](https://jeremywagner.me/blog/faster-bulk-image-optimization-in-bash)
yang layak dibaca.

**Aplikasi pemrosesan dan edit gambar WebP lainnya antara lain:**

   * Leptonica — Sebuah situs pemrosesan dan analisis gambar open source
     Aplikasi.

*   Sketch mendukung hasil langsung ke WebP
    * GIMP — Alternatif Photoshop yang gratis dan open source. Editor gambar.
    * ImageMagick — Membuat, menulis, mengonversi, atau mengedit gambar bitmap. Gratis.
      Aplikasi Command-Line.
    * Pixelmator — Editor gambar komersial untuk Mac.
    * Photoshop WebP Plugin — Gratis. Impor dan ekspor gambar. Dari Google.

**Android:** Anda dapat mengonversi gambar BMP, JPG, PNG atau GIF statis ke format
WebP menggunakan Android Studio. Untuk informasi selengkapnya, lihat [Membuat Gambar WebP Menggunakan
Android Studio](https://developer.android.com/studio/write/convert-webp.html).

### <a id="how-do-i-view-webp-on-my-os" href="#how-do-i-view-webp-on-my-os">Bagaimana cara melihat gambar WebP di OS saya?</a>

Anda dapat menarik dan melepas gambar WebP ke browser berbasis Blink (Chrome, Opera,
Brave) untuk melihat pratinjaunya, namun Anda juga dapat melihat pratinjau langsung dari OS menggunakan
add-on untuk Mac atau Windows.

[Facebook bereksperimen dengan
WebP](https://www.cnet.com/news/facebook-tries-googles-webp-image-format-users-squawk/)
beberapa tahun lalu dan menemukan bahwa pengguna yang mencoba klik kanan pada foto dan menyimpannya
ke disk memerhatikan bahwa foto tidak ditampilkan di luar browser karena
dalam format WebP. Ada tiga masalah utama di sini:

<ul> <li>"Save as" namun tidak dapat melihat file WebP secara lokal. Masalah ini diperbaiki oleh
Chrome yang mendaftarkan dirinya sebagai pengendali ".webp".</li> <li> "Save as" kemudian
melampirkan gambar ke email dan membagikannya kepada seseorang tanpa Chrome.
Facebook mengatasinya dengan memperkenalkan tombol "download" yang mencolok di UI-nya
dan menampilkan JPEG saat pengguna meminta download.</li> <li>Right click >
salin URL -> bagikan URL di web. Ini diatasi dengan [negosiasi
jenis konten](https://www.igvita.com/2012/12/18/deploying-new-image-formats-on-the-web/).</li>
</ul>

Masalah tersebut mungkin kurang penting bagi pengguna, namun menjadi catatan yang menarik tentang
kemudahan berbagi sosial secara sepintas. Untungnya, saat ini ada utilitas untuk melihat
dan bekerja dengan WebP pada sistem operasi yang berbeda.

Di Mac, coba [plugin Quick Look untuk
WebP](https://github.com/Nyx0uf/qlImageSize) (qlImageSize). Plugin ini berfungsi dengan
cukup baik:


<img src="images/Modern-Image22.jpg" alt="Desktop di Mac yang menampilkan file WebP
      dilihat pratinjaunya menggunakan plugin Quick Look untuk file WebP"
         />



Di Windows, Anda juga dapat mendownload [paket codec
WebP](https://storage.googleapis.com/downloads.webmproject.org/releases/webp/WebpCodecSetup.exe)
yang memungkinkan gambar WebP dilihat pratinjaunya di File Explorer dan Windows Photo
Viewer.

### Bagaimana cara menyajikan WebP? {: #how-do-i-serve-webp }

Browser tanpa dukungan WebP mungkin tidak menampilkan gambar sama sekali, tentu ini
tidak ideal. Untuk menghindarinya ada beberapa strategi yang dapat kita gunakan untuk
secara kondisional menyajikan WebP berdasarkan dukungan browser.


<img src="images/play-format-webp.jpg" alt="Panel Chrome DevTools Network
        yang menampilkan waterfall untuk Play Store di Chrome, di situ WebP
        disajikan."
         />
Panel Chrome DevTools Network yang menandai file WebP yang secara kondisional sedang
disajikan ke browser berbasis di bawah kolom "Type".




<img src="images/play-format-type.jpg" alt="Saat Play Store mengirimkan WebP
        ke Blink, melakukan fallback ke JPEG untuk browser seperti Firefox."
         />
Saat Play Store mengirimkan WebP ke Blink, melakukan fallback ke JPEG untuk browser
seperti Firefox.



Berikut ini beberapa opsi untuk mengirimkan gambar WebP dari server ke
pengguna:

**Menggunakan .htaccess untuk Menyajikan Salinan WebP**

Berikut cara menggunakan file .htaccess untuk menyajikan file WebP ke browser yang didukung
jika versi .webp yang cocok dari file JPEG/PNG ada di server.

Vincent Orback merekomendasikan pendekatan ini:

Browser dapat [mengirim sinyal dukungan WebP
secara eksplisit](http://vincentorback.se/blog/using-webp-images-with-htaccess/) melalui
[header
Accept](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept). Jika
mengontrol backend, Anda dapat menampilkan versi WebP gambar jika ada
di disk, daripada format seperti JPEG atau PNG. Akan tetapi, situasi ini tidak selalu memungkinkan
(mis. untuk host statis seperti halaman GitHub atau S3), jadi pastikan Anda memeriksa sebelum
mempertimbangkan opsi ini.

Berikut ini contoh file .htaccess untuk server web Apache:

```
<IfModule mod_rewrite.c>

  RewriteEngine On

  # Check if browser support WebP images
  RewriteCond %{HTTP_ACCEPT} image/webp

  # Check if WebP replacement image exists
  RewriteCond %{DOCUMENT_ROOT}/$1.webp -f

  # Serve WebP image instead
  RewriteRule (.+)\.(jpe?g|png)$ $1.webp [T=image/webp,E=accept:1]

</IfModule>

<IfModule mod_headers.c>

    Header append Vary Accept env=REDIRECT_accept

</IfModule>

AddType  image/webp .webp
```

Jika ada masalah dengan gambar .webp yang muncul di halaman, pastikan bahwa
jenis MIME gambar/webp diaktifkan di server.

Apache: tambahkan kode berikut ke file .htaccess:

```
AddType image/webp .webp
```

Nginx: tambahkan kode berikut ke file mime.types:

```
image/webp webp;
```

Note: Vincent Orback memiliki contoh [htaccess
config](https://github.com/vincentorback/WebP-images-with-htaccess) untuk menyajikan
WebP sebagai referensi dan Ilya Grigorik menyimpan koleksi [skrip
konfigurasi untuk menyajikan WebP](https://github.com/igrigorik/webp-detect) yang dapat
berguna.


**Menggunakan Tag `<picture>`**

Browser sendiri dapat memilih format gambar mana yang akan ditampilkan melalui
penggunaan tag `<picture>`. Tag `<picture>` menggunakan beberapa `<source>`
elemen, dengan satu tag `<img>`, yang merupakan elemen DOM aktual yang berisi
gambar. Browser menjelajahi sumber dan mengambil kecocokan pertama.
Jika tag `<picture>` tidak didukung di browser pengguna, `<div>`
dirender dan tag `<img>` digunakan.

Note: Berhati-hatilah dengan posisi `<source>` karena urutannya penting. Jangan tempatkan
sumber gambar/webp di belakang format lama, taruh di depannya. Browser
yang memahaminya akan menggunakannya dan browser yang tidak memahaminya akan berpindah ke framework yang didukung
lebih luas. Anda juga dapat menempatkan gambar dalam urutan ukuran file jika
ukuran fisiknya sama semua (saat tidak menggunakan atribut `media`).
Umumnya, urutannya sama dengan menempatkan yang lama terakhir.

Berikut ini beberapa contoh HTML:

```html
<picture>
  <source srcset="/path/to/image.webp" type="image/webp">
  <img src="/path/to/image.jpg" alt="">
</picture>

<picture>
    <source srcset='paul_irish.jxr' type='image/vnd.ms-photo'>
    <source srcset='paul_irish.jp2' type='image/jp2'>
    <source srcset='paul_irish.webp' type='image/webp'>
    <img src='paul_irish.jpg' alt='paul'>
</picture>

<picture>
   <source srcset="photo.jxr" type="image/vnd.ms-photo">
   <source srcset="photo.jp2" type="image/jp2">
   <source srcset="photo.webp" type="image/webp">
   <img src="photo.jpg" alt="My beautiful face">
</picture>
```

**Konversi CDN otomatis ke WebP**

Beberapa CDN mendukung konversi otomatis ke WebP dan dapat menggunakan petunjuk klien untuk menyajikan
gambar WebP [jika
memungkinkan](http://cloudinary.com/documentation/responsive_images#automating_responsive_images_with_client_hints).
Periksa CDN Anda untuk mengetahui apakah dukungan WebP disertakan di layanan mereka. Anda mungkin
memiliki solusi mudah yang menunggu.

**Dukungan WebP WordPress**

Jetpack — Jetpack, plugin WordPress populer, menyertakan layanan gambar CDN
yang disebut [Photon](https://jetpack.com/support/photon/). Dengan Photon Anda mendapatkan
dukungan gambar WebP yang mulus. Photon CDN disertakan di level gratis Jetpack,
jadi ini adalah nilai yang baik dan implementasi hands-off. Kekurangannya adalah bahwa
Photon mengubah ukuran gambar, menaruh string kueri di URL, dan ada
pencarian DNS ekstra yang diperlukan untuk tiap gambar.

**Cache Enabler dan Optimizer** — Jika Anda menggunakan WordPress, ada setidaknya
satu opsi setengah open source. Plugin open source [Cache
Enabler](https://wordpress.org/plugins/cache-enabler/) memiliki opsi kotak centang
menu untuk menyimpan cache gambar WebP yang akan disajikan jika tersedia dan browser
pengguna saat ini mendukungnya. Ini memudahkan penyajian gambar WebP. Ada satu kekurangan:
Cache Enabler memerlukan penggunaan program serupa yang disebut Optimizer, yang memiliki biaya langganan
tahunan. Ini sepertinya tidak umum untuk solusi open source.


**ShortPixel** — Opsi lain yang dapat digunakan secara tersendiri atau dengan Cache
Enabler, juga dikenakan biaya, adalah ShortPixel. Pada penggunaannya yang berdiri sendiri [ShortPixel](https://shortpixel.com)
dapat menambahkan tag `<picture>` yang biasanya akan menyajikan jenis gambar yang tepat
bergantung pada browser. Anda dapat mengoptimalkan maksimal 100 gambar dalam sebulan secara gratis.

**Mengompresi GIF Animasi dan mengapa `<video>` lebih baik**

GIF Animasi semakin luas digunakan, meski formatnya
sangat terbatas. Meski semua situs mulai dari jaringan sosial hingga situs media populer menyematkan banyak
GIF animasi, format ini *tidak pernah* didesain untuk penyimpanan video atau
animasi. Bahkan, [GIF89a
spec](https://www.w3.org/Graphics/GIF/spec-gif89a.txt) mencatat bahwa "GIF tidak
dimaksudkan sebagai platform untuk animasi". [Jumlah warna, jumlah bingkai
dan
dimensi](http://gifbrewery.tumblr.com/post/39564982268/can-you-recommend-a-good-length-of-clip-to-keep-gifs)
semua memengaruhi ukuran GIF animasi. Beralih ke video menawarkan penghematan terbesar.



<img src="images/animated-gif.jpg" alt="GIF Animasi vs. Video: perbandingan
        ukuran file dengan ~kualitas setara untuk format yang berbeda."
         />
GIF Animasi vs. Video: perbandingan ukuran file dengan ~kualitas setara untuk
format yang berbeda.


**Mengirim file yang sama sebagai video MP4 biasanya dapat menghemat 80% atau lebih dari
ukuran file.** GIF biasanya menghabiskan bandwidth secara signifikan, namun juga memerlukan waktu
lebih lama untuk dimuat, menyertakan lebih sedikit warna, dan umumnya menawarkan pengalaman
pengguna sub-bagian. Anda mungkin memerhatikann GIF animasi yang diupload ke Twitter berperforma
lebih baik di Twitter daripada di situs lain. [GIF animasi di Twitter sebenarnya bukan
GIF](http://mashable.com/2014/06/20/twitter-gifs-mp4/#fiiFE85eQZqW).
Untuk menyempurnakan pengalaman pengguna dan mengurangi konsumsi bandwidth, GIF animasi yang
diupload ke Twitter sebenarnya dikonversi ke video. Demikian juga, [Imgur mengonversi
GIF ke
video](https://thenextweb.com/insider/2014/10/09/imgur-begins-converting-gif-uploads-mp4-videos-new-gifv-format/)
saat mengupload, secara diam-diam mengonversinya ke MP4 untuk Anda.

Mengapa GIF berkali-kali lebih besar? GIF animasi menyimpan tiap bingkai sebagai gambar
GIF lossless- ya, lossless. Degradasi kualitas sering kita alami karena
dibatasi ke palet 256-warna. Format ini biasanya besar karena tidak
mempertimbangkan bingkai di sekitar untuk kompresi, tidak seperti codec video misalnya H.264. Video
MP4 menyimpan tiap bingkai utama sebagai JPEG lossy, yang menghapus sebagian data
asal untuk mencapai kompresi yang lebih baik.

**Jika Anda dapat beralih ke video**

*   Gunakan [ffmpeg](https://www.ffmpeg.org/) untuk mengonversi GIF animasi (atau
    sumber) ke H.264 MP4s. Saya menggunakan penjelasan singkat ini dari[
    Rigor](http://rigor.com/blog/2015/12/optimizing-animated-gifs-with-html5-video):
    `ffmpeg -i animated.gif -movflags faststart -pix_fmt yuv420p -vf
    "scale=trunc(iw/2)*2:trunc(ih/2)*2" video.mp4`
*   ImageOptim API juga mendukung [mengonversi gif animasi ke video WebM/H.264
    ](https://imageoptim.com/api/ungif), [menghapus dithering dari
    GIF](https://github.com/pornel/undither#examples) yang dapat membantu codec video
    mengompresi lebih kecil lagi.

**Jika Anda harus menggunakan GIF animasi**

*   Fitur seperti Gifsicle dapat menghapus metadata, entri palette yang tidak digunakan, dan meminimalkan
    perubahan antar-frame
*   Pertimbangkan encoder GIF lossy. Fork
    [Giflossy](https://github.com/pornel/giflossy) dari Gifsicle mendukung
    ini dengan tanda `—lossy` dan dapat menghemat ~60-65% ukuran. Ada juga
    yang bagus berdasarkan itu yang disebut [Gifify](https://github.com/vvo/gifify). Untuk
    GIF non-animasi, konversi ke PNG atau WebP.

Untuk informasi selengkapnya, lihat[ Book of
GIFT](https://rigor.com/wp-content/uploads/2017/03/TheBookofGIFPDF.pdf) oleh Rigor.

## Pengoptimalan SVG {: #svg-optimization }

Menjaga SVG tetap ramping artinya menghapus data yang tidak perlu. File SVG yang dibuat
dengan editor biasanya berisi banyak informasi berlebihan
(metadata, komentar, layer tersembunyi, dan sebagainya). Konten ini biasanya dapat
dengan aman dihapus atau dikonversi ke bentuk yang lebih minimal tanpa memengaruhi SVG
final yang sedang dirender.


<img src="images/Modern-Image26.jpg" alt="svgo"
         />
[SVGOMG](https://jakearchibald.github.io/svgomg/), oleh Jake Archibald, adalah antarmuka
GUI yang memungkinkan Anda mengoptimalkan SVG sesuai preferensi dengan memilih
pengoptimalan, dengan pratinjau langsung markup yang dihasilkan.


**Beberapa aturan umum untuk pengoptimalan SVG (SVGO):**

*   Perkecil dan gzip file SVG Anda. SVG hanyalah aset teks yang diekspresikan dalam
    XML, seperti CSS, HTML, dan JavaScript, dan harus diperkecil dan dijadikan gzip untuk
    meningkatkan performa.
* Daripada path, gunakan bentuk SVG yang telah ditentukan seperti `<rect>`, `<circle>`,
  `<ellipse>`, `<line>`, dan `<polygon>`. Memilih bentuk yang telah ditentukan akan mengurangi
  jumlah markup yang diperlukan untuk menghasilkan gambar akhir, artinya lebih sedikit kode untuk diuraikan
  dan dirasterisasi oleh browser. Mengurangi kompleksitas SVG artinya browser dapat
  menampilkannya dengan lebih cepat.
*   Jika Anda harus menggunakan path, coba kurangi curve dan path. Sederhanakan dan
    kombinasikan sebisa mungkin. [Alat
    simplify](http://jlwagner.net/talks/these-images/#/2/10) Illustrator dapat menghapus
    titik berlebihan dalam artwork kompleks sembari menghaluskan
    ketidakteraturan.
*   Hindari menggunakan group. Jika tidak bisa, coba menyederhanakannya.
*   Hapus layer yang tidak kelihatan.
*   Hindari efek Photoshop atau Illustrator. Efek tersebut dapat dikonversi ke
    gambar raster besar.
*   Periksa dua kali gambar raster yang tersemat, yang tidak cocok untuk SVG
* Gunakan fitur untuk mengoptimalkan SVG.
  [SVGOMG](https://jakearchibald.github.io/svgomg/) adalah GUI berbasis web
  yang sangat berguna untu [SVGO](https://github.com/svg/svgo) oleh Jake Archibald yang saya rasa
  tak ternilai. Jika Anda menggunakan Sketch, plugin SVGO Compressor([plugin Sketch untuk
  menjalankan SVGO](https://www.sketchapp.com/extensions/plugins/svgo-compressor/))
  dapat digunakan saat mengekspor untuk mengurangi ukuran file.


<img src="images/svgo-precision.jpg" alt="pengurangan presisi svgo kadang dapat
        berdampak positif pada ukuran"
         />
Contoh memproses sumber SVG dengan SVGO dalam mode presisi tinggi (menghasilkan
peningkatan ukuran sebesar 29%) vs. mode presisi rendah (peningkatan ukuran sebesar 38%).



[SVGO](https://github.com/svg/svgo) adalah fitur berbasis Node untuk mengoptimalkan SVG.
SVGO dapat mengurangi ukuran file dengan menurunkan *presisi* angka di definisi <path>
. Tiap digit setelah titik menambahkan byte dan itu sebabnya mengubah
presisi (jumlah digit) dapat sangat memengaruhi ukuran file. Akan tetapi, berhati-hatilah
jika ingin mengubah presisi karena dapat berdampak visual pada tampilan
shape.


<img src="images/Modern-Image28.jpg" alt="svgo dapat bermasalah,
        terlalu menyederhanakan path dan artwork"
         />
Perlu diperhatikan bahwa SVGO berfungsi dengan baik pada contoh sebelumnya tanpa
terlalu menyederhanakan paths dan shape, namun ada cukup banyak kasus
sebaliknya. Perhatikan distorsi strip cahaya pada roket di atas dengan
presisi lebih rendah.


**Menggunakan SVGO di command-line:**

SVGO dapat diinstal sebagai [global npm CLI](https://www.npmjs.com/package/svgo)
jika Anda lebih memilihnya daripada GUI:

```
npm i -g svgo
```

Ini kemudian dapat diproses dengan file SVG lokal sebagai berikut:

```
svgo input.svg -o output.svg
```

Fitur ini mendukung semua opsi yang diharapkan, termasuk menyesuaikan presisi floating point
:

```
svgo input.svg --precision=1 -o output.svg
```

Lihat SVGO [readme](https://github.com/svg/svgo) untuk mengetahui daftar lengkap
opsi yang didukung.

**Jangan lupa mengompresi SVG!**


<img src="images/before-after-svgo.jpg" alt="sebelum dan sesudah memproses gambar
        dengan svgo"
         />
Perlu diperhatikan bahwa SVGO berfungsi dengan baik pada contoh sebelumnya tanpa
terlalu menyederhanakan paths dan shape, namun ada cukup banyak kasus
sebaliknya. Perhatikan distorsi strip cahaya pada roket di atas dengan
presisi lebih rendah.


Juga, jangan lupa melakukan [Gzip pada aset
SVG](https://calendar.perfplanet.com/2014/tips-for-optimising-svg-delivery-for-the-web/)
atau menayangkannya menggunakan Brotli. Karena berbasis teks, fitur ini mengompresi dengan sangat baik
(~50% dari sumber asli).

Saat Google mengirimkan logo baru, kami mengumumkan bahwa
versi [terkecil](https://twitter.com/addyosmani/status/638753485555671040)
hanya berukuran 305 byte.


<img src="images/Modern-Image30.jpg" alt="versi terkecil logobaru google
        hanya berukuran 305 byte"
         />


Ada [banyak trik SVG
lanjutan](https://www.clicktorelease.com/blog/svg-google-logo-in-305-bytes/) yang dapat Anda
gunakan untuk memangkasnya lebih lanjut (hingga 146 byte)! Dapat
dikatakan, apakah dengan fitur atau pembersihan manual, mungkin ada *sedikit*
lagi yang dapat dipangkas dari SVG.

**SVG Sprite**

SVG dapat [sangat bermanfaat](https://css-tricks.com/icon-fonts-vs-svg/) untuk ikon,
menawarkan cara untuk merepresentasikan visualisasi sebagai sprite tanpa
solusi [aneh](https://www.filamentgroup.com/lab/bulletproof_icon_fonts.html)yang diperlukan untuk font ikon. Fitur ini memiliki kontrol gaya CSS yang lebih terperinci daripada
font ikon (properti stroke SVG),  kontrol pemosisian yang lebih baik (tidak perlu menyiasati
pseudo-elemen dan CSS `display`), dan SVG jauh lebih
[dapat diakses](http://www.sitepoint.com/tips-accessible-svg/).

Fitur seperti [svg-sprite](https://github.com/jkphl/svg-sprite) dan
[IcoMoon](https://icomoon.io/) dapat mengotomatisasi penggabungan SVG ke dalam sprite yang
dapat digunakan melalui [CSS Sprite](https://css-tricks.com/css-sprites/), [Symbol
Sprite](https://css-tricks.com/svg-use-with-external-reference-take-2), atau
[Stacked Sprite](http://simurai.com/blog/2012/04/02/svg-stacks). Una Kravetz memiliki
[penjelasan](https://una.im/svg-icons/#💁) praktis tentang cara menggunakan
gulp-svg-sprite untuk alur kerja SVG sprite yang layak dibaca. Sara Soudein juga
membahas [melakukan transisi dari font ikon ke
SVG](https://www.sarasoueidan.com/blog/icon-fonts-to-svg/) di blognya.

**Bacaan lebih lanjut**

[Tips for optimizing SVG delivery for the
web](https://calendar.perfplanet.com/2014/tips-for-optimising-svg-delivery-for-the-web/) oleh Sara Soueidan
dan [Practical SVG
book](https://abookapart.com/products/practical-svg) oleh Chris Coyier sangat bagus. Saya juga
menemukan bahwa postingan tentang mengoptimalkan SVG oleh Andreas Larsen memberikan pencerahan ([bagian
1](https://medium.com/larsenwork-andreas-larsen/optimising-svgs-for-web-use-part-1-67e8f2d4035), [bagian
2](https://medium.com/larsenwork-andreas-larsen/optimising-svgs-for-web-use-part-2-6711cc15df46)). [Preparing
and exporting SVG icons in
Sketch](https://medium.com/sketch-app-sources/preparing-and-exporting-svg-icons-in-sketch-1a3d65b239bb)
juga bacaan yang bagus.

## Hindari mengompresi ulang gambar dengan codec lossy {: #avoid-recompressing-images-lossy-codecs }

Direkomendasikan agar selalu mengompresi dari gambar asli. Mengompresi ulang
gambar memiliki konsekuensi. Katakanlah bahwa Anda mengambil JPEG yang telah
dikompresi dengan kualitas 60. Jika Anda mengompresi ulang gambar ini dengan encoding
lossy, akan terlihat lebih buruk. Tiap siklus kompresi tambahan akan
menghasilkan loss generasional - informasi akan hilang dan artefak kompresi
akan mulai bertumpuk. Meski Anda mengompresi ulang dengan setelan kualitas tinggi.

Untuk menghindari jebakan ini, **setel kualitas baik terendah yang ingin Anda terima
terlebih dahulu** agar Anda mendapatkan penghematan file maksimal sejak awal. Anda akan
menghindari jebakan ini karena pengurangan ukuran file dari pengurangan kualitas itu sendiri
akan terlihat buruk.

Encoding ulang file lossy akan selalu memberikan file yang lebih kecil, namun ini
tidak berarti Anda mendapatkan kualitas yang sama seperti Anda bayangkan.


<img src="images/generational-loss.jpg" alt="loss generasional saat melakukan encoding ulang
        gambar beberapa kali"
         />
Di atas, dari [video yang sangat bagus](https://www.youtube.com/watch?v=w7vXJbLhTyI) ini
dan [artikel
yang menyertainya](http://cloudinary.com/blog/why_jpeg_is_like_a_photocopier) oleh Jon
Sneyers, kita dapat melihat dampak loss generasional dari kompresi ulang menggunakan beberapa
format. Ini masalah yang mungkin Anda alami jika menyimpan gambar
(yang telah dikompresi) dari jaringan sosial dan mengupload ulang (menyebabkan kompresi ulang).
Loss kualitas akan menumpuk.



MozJPEG (mungkin secara kebetulan) memiliki resistensi yang lebih baik terhadap degradasi
kompresi ulang berkat kuantisasi trellis. Daripada mengompresi semua nilai
DCT secara persis, fitur ini dapat memeriksa nilai terdekat dalam rentang +1/-1 untuk
mengetahui apakah nilai serupa dikompresi ke bit yang lebih sedikit. FLIF lossy memiliki siasat yang serupa dengan
PNG lossy, yaitu sebelum kompresi (ulang), fitur ini dapat melihat data dan memutuskan
data apa yang akan dibuang. PNG yang dikompresi ulang memiliki "lubang" yang dapat dideteksi untuk menghindari
perubahan data lebih lanjut.

**Saat mengedit file sumber, simpan dalam format lossless seperti PNG atau
TIFF, agar Anda mempertahankan kualitas sebanyak mungkin.** Fitur build atau layanan kompresi
gambar kemudian menangani pemberian hasil versi kompresi yang Anda sajikan
kepada pengguna dengan loss kualitas yang minimal.

## Mengurangi biaya dekode dan pengubahan ukuran gambar yang tidak perlu {: #reduce-unnecessary-image-decode-costs }

Kita semua pernah mengirimkan gambar besar resolusi lebih tinggi kepada para pengguna
. Proses ini menghabiskan biaya. Decoding dan mengubah ukuran gambar adalah operasi
mahal untuk browser dengan hardware seluler rata-rata. Jika mengirim gambar
besar dan menskalakan ulang menggunakan CSS atau atribut lebar/tinggi, Anda kemungkinan melihat
hal ini terjadi dan dapat memengaruhi performa.


<img src="images/image-pipeline.jpg" alt="Ada banyak langkah yang terlibat dalam
        browser yang mengambil gambar yang ditentukan di tag dan menampilkannya di
        layar. Langkah tersebut antara lain meminta, decode, mengubah ukuran, menyalin ke GPU, menampilkan."
         />

Saat browser mengambil gambar, browser harus mendekode gambar dari format
sumber asli (mis. JPEG) ke bitmap di memori. Biasanya gambar harus
diubah ukurannya (mis. lebar harus disetel ke persentase containernya). Decoding dan
mengubah ukuran gambar memang mahal dan dapat memperlambat waktu yang diperlukan untuk menampilkan
gambar.


Mengirim gambar yang dapat dirender oleh browser tanpa perlu mengubah ukurannya sama sekali
adalah idealnya. Jadi, sajikan gambar terkecil untuk ukuran layar
resolusi target, dengan memanfaatkan [`srcset` dan
`sizes`](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
- yang akan kita bahas `srcset` sebentar lagi.

Menghapus atribut `width` atau `height` pada gambar juga dapat berdampak negatif
pada performa. Tanpa atribut ini, browser menentukan area placeholder yang lebih kecil
untuk gambar hingga byte yang mencukupi diterima agar dapat mengetahui dimensi
yang tepat. Di tahap tersebut, tata letak dokumen harus diperbarui, dan ini menjadi
langkah yang mahal yang disebut reflow.


<img src="images/devtools-decode.jpg" alt="biaya decode gambar yang ditampilkan di
        chrome devtools"
         />
Browser harus menjalani sejumlah langkah untuk mencat gambar di layar. Selain
mengambilnya, gambar harus didekode dan biasanya diubah ukurannya. Peristiwa
ini dapat diaudit di [Timeline](/web/tools/chrome-devtools/evaluate-performance/performance-reference) Chrome DevTools
.



Gambar yang lebih besar juga disertai peningkatan biaya ukuran memori. Gambar yang didekode
~4 byte per piksel. Jika tidak berhati-hati, Anda dapat membuat
browser error; di perangkat kelas bawah tidak perlu banyak memori untuk menyebabkan swapping memori.
Jadi, perhatikan biaya untuk dekode, pengubahan ukuran, dan memori.


<img src="images/image-decoding-mobile.jpg" alt="Decoding gambar dapat menjadi
        sangat mahal di hardware seluler rata-rata dan kelas bawah"
         />
Decoding gambar dapat menjadi sangat mahal di ponse rata-rata dan kelas bawah.
Kadang dapat menjadi 5x lebih lambat untuk mendekode (atau lebih lama lagi).


Saat membangun [pengalaman web
seluler](https://medium.com/@paularmstrong/twitter-lite-and-high-performance-react-progressive-web-apps-at-scale-d28a00e780a3),
Twitter meningkatkan performa dekode gambar dengan memastikan bahwa Twitter menyajikan gambar
berukuran sesuai kepada pengguna. Diperlukan waktu dekode untuk banyak gambar di
timeline Twitter dari ~400ms hingga ~19!


<img src="images/image-decoding.jpg" alt="Panel Timeline/Performa Chrome DevTools
        yang menandai waktu dekode gambar sebelum dan sesudah Twitter Lite
        mengoptimalkan pipeline gambarnya. Sebelumnya lebih tinggi."
         />
Panel Timeline/Performa Chrome DevTools yang menandai waktu dekode gambar (warna
hijau) sebelum dan sesudah Twitter Lite mengoptimalkan pipeline gambarnya.

### Mengirim gambar HiDPI menggunakan `srcset` {: #delivering-hidpi-with-srcset }

Pengguna dapat mengakses situs melalui beragam perangkat seluler dan desktop dengan
layar resolusi tinggi. [Device Pixel
Ratio](https://stackoverflow.com/a/21413366) (DPR) (juga disebut "rasio
piksel CSS") menentukan cara resolusi layar perangkat diinterpretasikan oleh CSS. DPR
dibuat oleh produsen ponsel untuk memungkinkan peningkatan resolusi dan
ketajaman layar seluler tanpa membuat elemen terlihat terlalu kecil.

Untuk menyamai kualitas gambar yang diharapkan oleh pengguna, kirimkan gambar
beresolusi sesuai ke perangkat mereka. Gambar yang tajam dengan DPR tinggi (mis. 2x, 3x) dapat
disajikan ke perangkat yang mendukungnya. Gambar DPR rendah dan standar harus
disajikan kepada pengguna tanpa layar resolusi tinggi sehingga gambar 2x+ biasanya akan memiliki
byte yang jauh lebih banyak.


<img src="images/device-pixel-ratio.jpg" alt="Diagram rasio piksel perangkat
        sebesar 1x, 2x, dan 3x. Kualitas gambar tampak menajam saat DPR
        meningkat dan visual ditampilkan untuk membandingkan piksel perangkat dengan piksel CSS."
         />
Rasio Piksel Perangkat: Banyak situs memantau DPR untuk perangkat populer termasuk
[material.io](https://material.io/devices/) dan
[mydevice.io](https://mydevice.io/devices/).



[srcset](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
memungkinkan browser memilih gambar terbaik yang tersedia per perangkat, mis. memilih
gambar 2x untuk layar seluer 2x. Browser tanpa `srcset` dukungan dapat fallback
ke `src` default yang ditentukan di tag `<img>`.

```
<img srcset="paul-irish-320w.jpg,
             paul-irish-640w.jpg 2x,
             paul-irish-960w.jpg 3x"
     src="paul-irish-960w.jpg" alt="Paul Irish cameo">
```

CDN gambar seperti
[Cloudinary](http://cloudinary.com/blog/how_to_automatically_adapt_website_images_to_retina_and_hidpi_devices)
dan [Imgix](https://docs.imgix.com/apis/url/dpr) mendukung kontrol kepadatan
gambar untuk menyajikan kepadatan terbaik kepada pengguna dari satu sumber kanonikal.

Note: Anda dapat mempelajari lebih lanjut Rasio Piksel Perangkat dan gambar responsif di kursus
[Udacity](https://www.udacity.com/course/responsive-images--ud882) gratis
ini dan panduan [Images](/web/fundamentals/design-and-ui/responsive/images) di Web
Fundamentals.

Pengingat bahwa [Client
Hints](https://www.smashingmagazine.com/2016/01/leaner-responsive-images-client-hints/)
juga dapat menyediakan alternatif untuk menentukan tiap kepadatan piksel yang mungkin dan
format dalam markup gambar responsif. Fitur tersebut menambahkan informasi ini ke
permintaan HTTP agar server web dapat memilih kecocokan terbaik untuk kepadatan layar
perangkat saat ini.

### Art direction {: #art-direction }

Mengirimkan resolusi yang tepat kepada pengguna memang penting, namun beberapa situs juga
perlu mempertimbangkannya dalam hal **[art
direction](http://usecases.responsiveimages.org/#art-direction)**. Jika pengguna
menggunakan layar yang lebih kecil, Anda dapat melakukan crop atau zoom in dan menampilkan subjek tersebut
untuk mengoptimalkan ruang yang tersedia. Art direction berada di luar lingkun
penjelasan ini, namun layanan seperti[
Cloudinary](http://cloudinary.com/blog/automatically_art_directed_responsive_images%20)
menyediakan API untuk mencoba mengotomatisasinya sejauh mungkin.


<img src="images/responsive-art-direction.jpg" alt="art direction responsif
        dalam penerapannya, disesuaikan untuk menampilkan lebih banyak atau lebih sedikit gambar dalam cara yang di-crop
        bergantung pada perangkat"
         />
Art direction: Eric Portis mengumpulkan
[contoh](https://ericportis.com/etc/cloudinary/) yang menampilkan cara gambar responsif dapat
digunakan untuk art-direction. Contoh ini menyesuaikan karakteristik visual
tokoh utama pada breakpoint yang berbeda untuk mengoptimalkan ruang yang
tersedia.

## Manajemen warna {: #color-management }

Terdapat minimal tiga perspektif berbeda untuk warna: biologi, fisika, dan
cetakan. Dalam biologi, warna adalah [fenomena
persepsi](http://hubel.med.harvard.edu/book/ch8.pdf). Objek memantulkan cahaya dalam
kombinasi panjang gelombang yang berbeda. Reseptor cahaya di mata menerjemahkan
panjang gelombang tersebut menjadi sensasi yang kita kenal sebagai warna. Dalam fisika, cahaya
berperan penting - frekuensi cahaya dan kecerahan. Cetakan berkaitan dengan lingkaran
warna, tinta, dan model artistik.

Idealnya, setiap layar dan browser web di dunia menampilkan warna persis
sama. Sayangnya, karena sejumlah inkonsistensi yang melekat, warna
tidak ditampilkan persis sama. Manajemen warna memungkinkan kita mencapai kompromi dalam menampilkan warna
melalui model, ruang, dan profil warna.

#### Model warna {: #color-models }

[Model warna](https://en.wikipedia.org/wiki/Gamma_correction) adalah sistem untuk
menghasilkan rentang warna lengkap dari set warna primer yang lebih kecil.
Ada berbagai jenis ruang warna yang menggunakan parameter berbeda untuk
mengontrol warna. Beberapa ruang warna memiliki parameter kontrol yang lebih sedikit daripada lainnya -
mis. grayscale hanya memiliki satu parameter untuk mengontrol kecerahan antara
warna hitam dan putih.

Dua model warna yang umum adalah aditif dan subtraktif. Model warna aditif
(seperti RGB, yang digunakan untuk tampilan digital) menggunakan cahaya untuk menampilkan warna sedangkan
model warna subtraktif (seperti CMYK, yang digunakan dalam pencetakan) berfungsi dengan membuang cahaya.



<img src="images/colors_ept6f2.jpg" alt="sRGB, Adobe RGB, dan ProPhoto RGB" /> Dalam
        RGB cahaya merah, hijau, dan biru ditambahkan dalam kombinasi yang berbeda untuk
        menghasilkan spektrum warna yang luas. CYMK (cyan, magenta, yellow, dan
        black) berfungsi melalui warna tinta yang berbeda yang mengurangi kecerahan dari
        kertas putih.


[Understanding Color Models and Spot Color
Systems](https://www.designersinsights.com/designer-resources/understanding-color-models/)
memberikan deskripsi yang bagus tentang mode dan model warna lain seperti HSL, HSV, dan
LAB.

#### Ruang warna {: #color-spaces }

[Ruang
warna](http://www.dpbestflow.org/color/color-space-and-color-profiles#space)
adalah rentang warna spesifik yang dapat direpresentasikan untuk gambar tertentu. Sebagai
contoh, jika gambar berisi maksimal 16,7 juta warna, ruang warna berbeda
memungkinkan penggunaan rentang warna yang lebih sempit atau lebih luas. Beberapa developer menyebut
model warna dan ruang warna sebagai istilah yang sama.

[sRGB](https://en.wikipedia.org/wiki/SRGB) didesain menjadi
ruang warna [standard](https://www.w3.org/Graphics/Color/sRGB.html) untuk web
dan berbasis RGB. Ini adalah ruang warna kecil yang biasanya dianggap sebagai
denominator umum terkecil dan opsi teraman untuk manajemen warna
di berbagai browser. Ruang warna lain (seperti [Adobe
RGB](https://en.wikipedia.org/wiki/Adobe_RGB_color_space) atau [ProPhoto
RGB](https://en.wikipedia.org/wiki/ProPhoto_RGB_color_space) - yang digunakan di Photoshop
dan Lightroom) dapat merepresentasikan warna yang lebih menyala daripada sRGB, namun yang terakhir ini
lebih global di sebagian besar browser web, game, dan monitor, sehingga
umumnya lebih terfokus ke situ.



<img src="images/color-wheel_hazsbk.jpg" alt="sRGB, Adobe RGB, dan ProPhoto RGB"
        /> Di  atas kita dapat melihat visualisasi gamut - rentang warna
        yang dapat ditentukan oleh ruang warna.


Ruang warna memiliki tiga channel (red, green, dan blue). Ada 255 kemungkinan warna
di tiap channel dalam mode 8-bit, sehingga memberikan total 16,7
juta warna. Gambar 16-bit dapat menampilkan triliunan warna.


<img src="images/srgb-rgb_ntuhi4.jpg" alt="sRGB, Adobe RGB, dan ProPhoto RGB" />
        Perbandingan sRGB, Adobe RGB, dan ProPhoto RGB menggunakan gambar dari
        [Yardstick](https://yardstick.pictures/tags/img%3Adci-p3). Sangat
        sulit menampilkan konsep ini dalam sRGB, jika Anda tidak dapat menampilkan warna
        yang tidak dapat dilihat. Foto reguler dalam sRGB vs wide gamut harus
        identik semuanya, kecuali warna "matang" yang paling banyak disaturasi.


Perbedaan ruang warna (seperti sRGB, Adobe RGB, dan ProPhoto RGB) adalah
gamut (rentang warna yang dapat direproduksi dengan shade), illuminant, dan
[gamma](http://blog.johnnovak.net/2016/09/21/what-every-coder-should-know-about-gamma/)
curve. sRGB ~20% lebih kecil daripada Adobe RGB dan ProPhoto RGB ~[50%
lebih besar](http://www.petrvodnakphotography.com/Articles/ColorSpace.htm) daripada Adobe
RGB. Sumber gambar di atas berasal dari [Clipping
Path](http://clippingpathzone.com/blog/essential-photoshop-color-settings-for-photographers).

[Wide-gamut](http://www.astramael.com/) adalah istilah yang menggambarkan ruang warna dengan
gamut lebih besar daripada sRGB. Jenis tampilan ini menjadi semakin umum. Dengan
demikian, banyak tampilan digital yang tidak dapat menampilkan profil warna
yang jauh lebih baik daripada sRGB. Saat menyimpan gambar untuk web di Photoshop,
pertimbangkan menggunakan opsi 'Convert to sRGB’ kecuali menargetkan pengguna dengan
layar wide-gamut kelas atas.

<aside class="key-point"><b>Note:</b> Saat bekerja dengan fotografi asli,
hindari menggunakan sRGB sebagai ruang warna primer. Ini lebih kecil daripada ruang warna
yang didukung oleh sebagian besar kamera dan dapat menyebabkan clipping. Bekerjalah dengan ruang
warna lebih besar (seperti ProPhoto RGB) dan hasil sRGB saat mengekspor untuk web.</aside>

**Apakah ada kasus yang menunjukkan wide gamut cocok untuk konten web?**

Ya. Jika gambar berisi warna yang sangat tersaturasi/matang/menyala dan Anda ingin
warna tersebut sama matangnya di layar yang mendukungnya. Akan tetapi, dalam foto nyata itu
jarang terjadi. Biasanya mudah untuk menyesuaikan warna agar terlihat menyala,
tanpa sebenarnya melampaui gamut sRGB

Itu karena persepsi warna manusia tidak mutlak, namun relatif terhadap
sekeliling kita dan mudah tertipu. Jika gambar berisi warna
stabilo, Anda akan lebih mudah menggunakan wide gamut.

#### Koreksi dan kompresi gamma {: #gamma-correction }

[Koreksi gamma](https://en.wikipedia.org/wiki/Gamma_correction) (atau hanya
Gamma) mengontrol kecerahan gambar secara keseluruhan. Mengubah gamma juga dapat
mengubah rasio warna hijau ke merah dan biru. Gambar tanpa koreksi gamma
dapat terlihat seperti warna yang diputihkan atau terlalu gelap.

Dalam grafis video dan komputer, gamma digunakan untuk kompresi, mirip dengan kompresi
data. Ini memungkinkan Anda memadatkan tingkat kecerahan yang berguna dalam bit yang lebih
kecil (8-bit bukan 12 atau 16). Persepsi kecerahan pada manusia tidak
secara linier proporsional dengan jumlah fisik cahaya. Merepresentasikan warna dalam
bentuk fisiknya yang sebenarnya akan sia-sia saat mengenkode gambar untuk mata manusia. Kompresi
gamma digunakan untuk mengenkode kecerahan pada skala yang lebih dekat dengan persepsi
manusia.

Dengan kompresi gamma skala kecerahan berguna cocok dalam 8 fit presisi
(0-255 digunakan oleh sebagian besar warna RGB). Semua ini berasal dari fakta bahwa jika warna
menggunakan beberapa unit dengan hubungan 1:1 kepada fisika, nilai RGB berkisar dari 1 ke
juta dengan nilai 0-1000 tampak berbeda, namun nilai antara
999000-1000000 tampak identik. Bayangkan berada dalam ruangan gelap dengan hanya ada
1 lilin. Nyalakan lilin kedua dan Anda memperhatikan peningkatan
kecerahan yang signifikan pada cahaya ruangan. Tambahkan lilin ketika hingga semakin terang.
Sekarang bayangkan berada dalam ruangan dengan 100 lilin. Nyalakan lilin ke-101, 102.
Anda tidak akan memperhatikan perubahan kecerahan.

Meski di kedua kasus ini, secara fisik, jumlah cahaya yang sama
ditambahkan. Jadi, karena mata kurang sensitif jika cahaya terang, kompresi
gamma "mengompresi" nilai kecerahan, jadi dalam istilah fisik tingkat kecerahan
kurang presisi namun skalanya disesuaikan untuk manusia, jadi dari perspektif manusia
semua nilai sama presisinya.

<aside class="key-point"><b>Note:</b> Kompresi/koreksi gamma di sini
berbeda dengan curve gamma gambar yang mungkin Anda konfigurasi di Photoshop. Jika kompresi
gamma berfungsi sebagaimana mestinya, maka tidak tampak seperti apa pun</aside>

#### Profil warna {: #color-profiles }

Profil warna adalah informasi yang menjelaskan ruang warna dari
perangkat. Ini digunakan untuk mengonversi antara ruang warna berbeda. Profiles
berupaya memastikan gambar tampak semirip mungkin dengan jenis
layar dan medium yang berbeda.

Gambar dapat memiliki profil warna yang tersemat seperti dijelaskan oleh [International
Color Consortium](http://www.color.org/icc_specs2.xalter) (ICC) untuk merepresentasikan
secara persis cara ditampilkannya warna. Ini didukung oleh format yang berbeda
termasuk JPEG, PNG, SVG, dan
[WebP](/speed/webp/docs/riff_container) dan sebagian besar
browser utama mendukung profil ICC yang tersemat. Saat gambar ditampilkan di
aplikasi dan kemampuan monitor diketahui, warna ini dapat disesuaikan berdasarkan
profil warna.

<aside class="key-point"><b>Note:</b> Beberapa monitor memiliki profil wrna yang mirip
dengan sRGB dan tidak dapat menampilkan profil yang jauh lebih baik, jadi bergantung pada layar pengguna
target, mungkin terdapat nilai yang terbatas dalam menyematkannya. Periksa siapa saja pengguna
target Anda.</aside>

Profil warna yang disematkan juga dapat sangat memengaruhi ukuran gambar
(100KB+ sesekali) jadi berhati-hatilah saat menyematkan. Fitur seperti ImageOptim sebenarnya
akan [secara otomatis](https://imageoptim.com/color-profiles.html) menghapus
profil warna jika menemukannya. Sebaliknya, dengan profil ICC dihapus demi
mengurangi ukuran, browser akan dipaksa menampilkan gambar dalam
ruang warna monitor yang dapat mengakibatkan perbedaan saturasi dan
kontras yang diharapkan. Lakukan evaluasi jalan tengah yang wajar di sini untuk kasus penggunaan Anda.

[Nine Degrees Below](https://ninedegreesbelow.com/photography/articles.html)
memiliki sekumpulan resource yang sangat bagus tentang manajemen warna profil ICC jika Anda
tertarik mempelajari lebih lanjut tentang profil.

#### Profil warna dan browser web {: #color-profiles }

Versi Chrome sebelumnya tidak memiliki dukungan yang baik untuk manajemen warna, namun
dukungan ini meningkat pada 2017 dengan [Color Correct
Rendering](https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/ptuKdRQwPAo).
Layar yang bukan sRGB (Macbook Pro baru) akan mengonversi warna dari sRGB ke
profil layar. Ini artinya warna akan terlihat lebih mirip di
berbagai sistem dan browser. Safari, Edge, dan Firefox sekarang juga dapat mempertimbangkan profil
ICC, jadi gambar dengan profil warna berbeda (mis. ICC) sekarang
dapat menampilkannya dengan benar terlepas dari apakah layar memiliki wide gamut atau tidak.

Note: Untuk mendapatkan panduan yang lengkap tentang penerapan warna pada spektrum cara yang lebih luas yang kita
lakukan di web, lihat [nerd’s guide to color on the web](https://css-tricks.com/nerds-guide-color-web/) oleh Sarah
Drasner.

## Spriting gambar {: #image-sprites }

[Image
sprites](/web/fundamentals/design-and-ui/responsive/images#use_image_sprites)
(atau CSS sprite) memiliki sejarah yang panjang di web, didukung oleh semua browser
dan telah menjadi cara yang populer untuk mengurangi jumlah gambar yang dimuat oleh halaman dengan
mengombinasikannya menjadi satu gambar besar yang diiris.


<img src="images/i2_2ec824b0_1.jpg" alt="Sprite gambar masih luas digunakan di
        situs produksi besar, termasuk halaman beranda Google."
         />
Sprite gambar masih luas digunakan di situs produksi besar, termasuk
halaman beranda Google.


Pada HTTP/1.x, beberapa developer menggunakan spriting untuk mengurangi permintaan HTTP. Spriting
memiliki sejumlah manfaat, namun perlu kehati-hatian karena Anda langsung mengalami
tantangan dengan invalidasi cache - perubahan pada bagian kecil sprite
gambar akan membatalkan validasi seluruh gambar dalam cache pengguna.

Namun, spriting mungkin sekarang menjadi anti-pola [HTTP/2](https://hpbn.co/http2/).
Dengan HTTP/2, mungkin sebaiknya [memuat gambar
satu per satu](https://deliciousbrains.com/performance-best-practices-http2/) karena
beberapa permintaan dalam satu koneksi sekarang dimungkinkan. Lakukan
evaluasi apakah ini tepat untuk penyiapan jaringan Anda sendiri.

## Pemuatan lambat untuk gambar non-kritis {: #lazy-load-non-critical-images }

Pemuatan lambat adalah pola performa web yang menunda pemuatan gambar di
browser hingga pengguna perlu melihatnya. Satu contohnya, saat Anda scroll,
gambar dimuat secara tidak bersamaan sesuai permintaan. Ini dapat melengkapi lebih lanjut
penghematan byte yang Anda alami dari penerapan strategi kompresi gambar.



<img src="images/scrolling-viewport.jpg" alt="pemuatan lambat gambar"
         />


Gambar yang harus muncul "di bagian atas" atau saat halaman pertama kali muncul
akan dimuat langsung. Akan tetapi, gambar yang mengikuti "di bagian bawah", belum
terlihat oleh pengguna. Gambar ini tidak harus langsung dimuat ke
browser. Gambar ini dapat dimuat nanti — atau dimuat lambat — hanya jika pengguna
scroll ke bawah dan gambar perlu ditampilkan.

Pemuatan lambat belum didukung secara native di browser itu sendiri (meski
sudah ada
[pembahasan](https://discourse.wicg.io/t/a-standard-way-to-lazy-load-images/1153/10)
tentang itu sebelumnya). Kita menggunakan JavaScript untuk menambahkan kemampuan ini.

**Mengapa Pemuatan Lambat Berguna?**

Cara memuat gambar yang "lambat" ini, hanya jika diperlukan, memiliki banyak manfaat:

* **Berkurangnya konsumsi data**: Karena Anda berasumsi pengguna tidak akan perlu mengambil semua
  gambar terlebih dahulu, Anda hanya memuat resource
  dalam jumlah minimal. Ini memang menguntungkan, terutama di seluler yang memiliki
  paket data yang lebih terbatas.
* **Berkurangnya konsumsi baterai**: Lebh sedikit beban kerja browser pengguna yang
  dapat menghemat masa pakai baterai.
* **Peningkatan kecepatan download**: Mengurangi waktu muat halaman secara keseluruhan pada
  situs dengan banyak gambar dari beberapa detik ke hingga hampir nol detik merupakan
  peningkatan kepuasan pengguna yang luar biasa. Bahkan, ini dapat menjadi perbedaan antara pengguna
  yang bertahan untuk menikmati situs Anda dan pengguna yang hanya singgah sebentar.

**Namun, seperti semua fitur pada umumnya, diperlukan tanggung jawab yang besar.**

**Hindari gambar yang dimuat lambat di bagian atas.** Gunakan pemuatan lambat untuk daftar gambar yang banyak
(mis. produk) atau daftar avatar pengguna. Jangan gunakan untuk gambar tokoh halaman
utama. Gambar pemuatan lambat di bagian atas dapat membuat pemuatan halaman tampak lebih lambat, baik
secara teknis maupun untuk persepsi manusia. Gambar ini dapat menonaktifkan pemuat browser,
pemuatan progresig dan JavaScript dapat menimbulkan pekerjaan ekstra untuk browser.

**Berhati-hatilah memuat lambat gambar saat men-scroll.**  Jika Anda menunggu hingga
pengguna men-scroll, pengguna kemungkinan melihat placeholder dan akhirnya bisa mendapatkan
gambar, jika belum men-scroll gambar tersebut. Salah satu rekomendasi adalah
memulai pemuatan lambat setelah gambar di bagian atas halaman telah dimuat, sehingga memuat semua
gambar yang tidak bergantung pada interaksi pengguna.

**Siapa Yang Menggunakan Pemuatan Lambat?**

Sebagai contoh pemuatan lambat, lihat sebagian besar situs utama yang meng-host banyak
gambar. Beberapa situs yang terkenal adalah [Medium](https://medium.com/) dan
[Pinterest](https://www.pinterest.com/).


<img src="images/Modern-Image35.jpg" alt="pratinjau sisipan untuk gambar di
        medium.com"
         />
Contoh pratinjau sisipan Gaussian-blurred untuk gambar di Medium.com


Sejumlah situs (seperti Medium) menampilkan pratinjau sisipan Gaussian-blurred
yang kecil (sekitar 100 byte) yang bertransisi (dimuat lambat) ke gambar berkualitas penuh
setelah diambil.

José M. Pérez menulis tentang cara mengimplementasikan efek Medium menggunakan [filter
CSS](https://jmperezperez.com/medium-image-progressive-loading-placeholder/)
dan bereksperimen dengan [format
gambar yang berbeda](https://jmperezperez.com/webp-placeholder-images/) untuk mendukung placeholder
seperti itu. Facebook juga membuat penjelasan tentang pendekatan 200-byte yang terkenal untuk
placeholder seperti itu untuk [foto
sampul](https://code.facebook.com/posts/991252547593574/the-technology-behind-preview-photos/)
yang layak dibaca. Jika Anda pengguna Webpack, [LQIP
loader](https://lqip-loader.firebaseapp.com/) dapat membantu mengotomatisasi sebagian
pekerjaan ini.

Bahkan, Anda dapat menelusuri sumber foto resolusi tinggi favorit, lalu
men-scroll halaman ke bawah. Dalam hampir semua kasus Anda akan mengalami bagaimana situs
hanya memuat beberapa gambar resolusi penuh pada satu waktu, dan lainnya adalah
gambar atau warna placeholder. Saat Anda melanjutkan scroll, gambar placeholder
digantikan dengan gambar resolusi penuh. Ini adalah penerapan pemuatan lambat.

**Bagaimana Cara Menerapkan Pemuatan Lambat ke Halaman Saya?**

Ada sejumlah teknik dan plugin yang tersedia untuk pemuatan lambat. Saya
merekomendasikan [lazysizes](https://github.com/aFarkas/lazysizes) oleh Alexander Farkas
karena performa yang memadai, fitur, integrasi opsional dengan
[Intersection Observer](/web/updates/2016/04/intersectionobserver), dan dukungan
untuk plugin.

**Apa Yang Dapat Saya Lakukan dengan Lazysizes?**

Lazysizes adalah library JavaScript. Tidak diperlukan konfigurasi. Download file
minified js dan sertakan di halaman.


Berikut ini beberapa contoh kode yang diambil dari file README:

Tambahkan kelas "lazyload" ke gambar/iframe bersama dengan atribut data-src
dan/atau data-srcset.

Secara opsional, Anda juga dapat menambahkan atribut src dengan gambar berkualitas rendah:

```html
<!-- non-responsive: -->
<img data-src="image.jpg" class="lazyload" />

<!-- responsive example with automatic sizes calculation: -->
<img
    data-sizes="auto"
    data-src="image2.jpg"
    data-srcset="image1.jpg 300w,
    image2.jpg 600w,
    image3.jpg 900w" class="lazyload" />

<!-- iframe example -->

<iframe frameborder="0"
    class="lazyload"
    allowfullscreen=""
    data-src="//www.youtube.com/embed/ZfV-aYdU4uE">
</iframe>
```

Untuk versi web buku ini, saya menghubungkan Lazysizes (namun Anda dapat menggunakan
alternatif) dengan Cloudinary untuk gambar responsif sesuai permintaan. Ini memberi saya
kebebasan untuk bereksperimen dengan berbagai nilai skala, kualitas, format, dan
apakah memuat secara progresif dengan upaya minimal atau tidak:


<img src="images/cloudinary-responsive-images.jpg" alt="Cloudinary mendukung
        kontrol kualitas gambar, format, dan beberapa fitur lainnya sesuai permintaan."
         />


**Fitur Lazysizes antara lain:**

* Secara otomatis mendeteksi perubahan visibilitas pada elemen pemuatan lambat saat ini dan masa mendatang
* Menyertakan dukungan gambar responsif sntadar (gambar dan srcset)
* Menambahkan perhitungan ukuran otomatis dan nama alias untuk fitur kueri media
* Dapat digunakan dengan ratusan gambar/iframe di halaman atau aplikasi web dengan banyak CSS dan JS
* Dapat diperluas: Mendukung plugin
* Solusi ringan namun matang
* Ditingkatkan untuk SEO: Tidak menyembunyikan gambar/aset dari crawler

**Opsi Pemuatan Lambat Lainnya**

Lazysizes bukan satu-satunya opsi. Berikut ini library pemuatan lambat lainnya:

*   [Lazy Load XT](http://ressio.github.io/lazy-load-xt/)
*   [BLazy.js](https://github.com/dinbror/blazy) (or [Be]Lazy)
*   [Unveil](http://luis-almeida.github.io/unveil/)
*   [yall.js (Pemuat Lambat Lainnya)](https://github.com/malchata/yall.js)
    sebesar ~1KB dan menggunakan Intersection Observer jika didukung.

**Apa kekurangan Pemuatan Lambat?**

*   Pembaca layar, beberapa bot penelusuran, dan pengguna dengan JavaScript nonaktif
    tidak dapat melihat gambar yang dimuat lambat dengan JavaScript. Namun, masalah ini
    dapat kita atasi dengan fallback `<noscript>`.
*   Pengatur scroll, seperti yang digunakan untuk menentukan kapan memuat gambar
    yang dimuat lambat, dapat berdampak buruk pada performa scroll browser. Pengatur scroll ini
    dapat menyebabkan menggambar ulang berkali-kali, sehingga memperlambat proses crawling -
    namun, library pemuatan lambat yang smart akan menggunakan throttling untuk mengurangi dampak ini.
    Satu solusi yang memungkinkan adalah Intersection Observer, yang didukung oleh
    lazysizes.

Gambar pemuatan lambat adalah pola yang tersebar luas untuk mengurangi bandwidth, menurunkan
biaya, dan meningkatkan pengalaman pengguna. Lakukan evaluasi apakah ini cocok untuk pengalaman
Anda. Untuk bacaan lebih lanjut, lihat [lazy loading
images](https://jmperezperez.com/lazy-loading-images/) dan [implementing
Medium's progressive
loading](https://jmperezperez.com/medium-image-progressive-loading-placeholder/).

## Menghindari jebakan display:none {: #display-none-trap }

Solusi gambar responsif lama telah keliru memahami cara borwser menangani permintaan
gambar saat menyetel properti  `display` CSS. Ini dapat menyebabkan
gambar yang diminta jauh lebih banyak daripada yang diharapkan dan menjadi alasan
`<picture>` dan `<img srcset>` lebih dipilih untuk memuat gambar responsif.

Pernahkah Anda menulis kueri media yang menyetel gambar ke `display:none` pada
breakpoint tertentu?

```html
<img src="img.jpg">
<style>
@media (max-width: 640px) {
    img {
        display: none;
    }
}
</style>
```

Atau mengatur gambar mana yang disembunyikan menggunakan kelas `display:none`?

```html
<style>
.hidden {
  display: none;
}
</style>
<img src="img.jpg">
<img src=“img-hidden.jpg" class="hidden">
```

Pemeriksaan cepat pada panel jaringan Chrome DevTools akan memverifikasi bahwa gambar
yang tersembunyi menggunakan pendekatan ini tetap diambil, meski kita mengharapkan gambar tersebut tidak
diambil. Perilaku ini sebenarnya benar menurut spesifikasi resource yang disematkan.


<img src="images/display-none-images.jpg" alt="Gambar tersembunyi dengan display:none
        masih diambil"
         />


**Apakah `display:none` menghindari memicu permintaan gambar `src`?**

```html
<div style="display:none"><img src="img.jpg"></div>
```

Tidak. Gambar yang ditentukan tetap akan diminta. Library tidak dapat mengandalkan
display:none di sini karena gambar akan diminta agar JavaScript dapat mengubah
src.

**Apakah `display:none` menghindari memicu permintaan `background: url()`?**

```html
<div style="display:none">
  <div style="background: url(img.jpg)"></div>
</div>
```

Ya. Latar belakang CSS tidak diambil segera setelah sebuah elemen diuraikan. Menghitung
gaya CSS untuk turunan elemen dengan `display:none` akan menjadi kurang berguna karena
tidak memengaruhi rendering dokumen. Gambar latar belakang pada elemen turunan
tidak dihitung atau tidak didownload.

[Request Quest](https://jakearchibald.github.io/request-quest/) oleh Jake Archibald
memberikan kuis yang sangat bagus tentang kesulitan penggunaan `display:none` untuk
pemuatan gambar responsif. Jka merasa ragu dengan cara browser tertentu menangani
pemuatan permintaan gambar, buka DevTools dan verifikasi sendiri.

Sekali lagi, jika memungkinkan, gunakan `<picture>` dan `<img srcset>` daripada mengandalkan
`display:none`.

## Apakah CDN pemrosesan gambar cocok untuk Anda? {: #image-processing-cdns }

*Waktu yang akan Anda habiskan membaca entri blog untuk menyiapkan pipeline pemrosesan gambar Anda sendiri
dan menyesuaikan konfigurasi adalah >> biaya yang harus dikeluarkan untuk mendapatkan layanan. Dengan
[Cloudinary](http://cloudinary.com/) menawarkan layanan gratis,
uji coba gratis [Imgix](https://www.imgix.com/) dan
[Thumbor](https://github.com/thumbor/thumbor) yang hadir sebagai alternatif OSS,
ada banyak opsi yang tersedia untuk otomatisasi.*

Untuk mencapai waktu muat halaman yang optimal, Anda perlu mengoptimalkan pemuatan halaman.
Pengoptimalan ini membutuhkan strategi gambar responsif dan dapat mengambil manfaat dari
kompresi gambar di server, memilih otomatis format terbaik, dan pengubahan ukuran
responsif. Yang penting adalah Anda mengirimkan gambar berukuran tepat ke
perangkat yang sesuai dalam resolusi yang sesuai secepat mungkin. Melakukan ini
tidak semudah yang dibayangkan.

**Menggunakan Server Anda vs. CDN**

Karena kompleksitas dan terus berkembangnya manipulasi gambar, kami
akan memberikan kutipan dari seseorang yang berpengalaman di bidang ini, lalu melanjutkan
dengan saran.

"Jika produk Anda bukan manipulasi gambar, maka jangan melakukannya sendiri.
Layanan seperti Cloudinary [atau imgix, Ed.] melakukannya jauh lebih efisien dan jauh
lebih baik daripada Anda, jadi gunakanlah. Jika Anda khawatir dengan biaya, pikirkan
berapa banyak yang akan Anda habiskan untuk pengembangan dan pemeliharaan, serta biaya hosting,
penyimpanan, dan pengiriman." — [Chris
Gmyr](https://medium.com/@cmgmyr/moving-from-self-hosted-image-service-to-cloudinary-bd7370317a0d)


Untuk saat ini, kita akan setuju dan menyarankan Anda mempertimbangkan menggunakan CDN
untuk kebutuhan pemrosesan gambar Anda. Dua CDN akan diperiksa untuk melihat perbandingannya
terkait dengan daftar tugas yang kita berikan sebelumnya.

**Cloudinary dan imgix**

[Cloudinary](http://cloudinary.com/) dan [imgix](https://www.imgix.com/) adalah dua
CDN pemrosesan gambar yang mapan. Keduanya adalah pilihan dari ratusan ribu
developer dan perusahaan di seluruh dunia, termasuk Netflix dan Red Bull. Mari
melihatnya dengan lebih mendetail.

**Apa Dasar-Dasarnya?**

Kecuali Anda pemilik jaringan server seperti mereka, keuntungan besar
pertama mereka dibandingkan meluncurkan solusi Anda sendiri adalah mereka menggunakan sistem jaringan
global terdistribusi untuk membawa salinan gambar Anda lebih dekat kepada pengguna. Juga
jauh lebih mudah bagi CDN untuk"menghadapi masa depan" dalam strategi pemuatan gambar Anda karena tren
berubah - melakukannya sendiri memerlukan pemeliharaan, memantau dukungan browser
untuk format yang baru muncul & mengikuti komunitas kompresi gambar.

Kedua, tiap layanan memiliki paket harga bertingkat, dengan Cloudinary menawarkan [level
gratis](http://cloudinary.com/pricing) dan imgix memberikan harga level standar
yang tidak mahal, dibandingkan paket premium volume tinggi. Imgix menawarkan
[uji coba](https://www.imgix.com/pricing) gratis dengan kredit untuk layanan, jadi
nilainya hampir sama dengan level gratis.

Ketiga, akses API disediakan oleh kedua layanan. Developer dapat mengakses CDN
sesuai program dan mengotomatisasikan pemrosesan. Librari klien, plugin
framework, dan dokumentasi API juga tersedia, dengan beberapa fitur dibatasi
untuk level berbayar yang lebih tinggi.

**Mari Membahas Pemrosesan Gambar**

Untuk saat ini, mari membatasi pembahasan pada gambar statis. Cloudinary dan Imgix
menawarkan beragam metode manipulasi gambar, dan mendukung fungsi primer
seperti kompresi, pengubahan ukuran, cropping, dan pembuatan thumbnail pada paket
standar dan gratis.


<img src="images/Modern-Image36.jpg" alt="library media cloudinary"
         />
Cloudinary Media Library: Secara default Cloudinary mengenkode [JPEG
non-Progresif](http://cloudinary.com/blog/progressive_jpegs_and_green_martians). Untuk
memilih untuk membuatnya, centang opsi "Progressive" di "More options" atau
teruskan tanda 'fl_progressive'.


Cloudinary mencantumkan [tujuh kategori
transformasi gambar luas](http://cloudinary.com/documentation/image_transformations)
, dengan total 48 subkategori di dalamnya. Imgix mengiklankan lebih dari
[100 operasi pemrosesan
gambar](https://docs.imgix.com/apis/url?_ga=2.52377449.1538976134.1501179780-2118608066.1501179780).

**Apa Yang Terjadi secara Default?**

*   Cloudinary melakukan pengoptimalan berikut secara default:
*   [Mengenkode JPEG menggunakan
    MozJPEG](https://twitter.com/etportis/status/891529495336722432) (memilih
    Guetzli sebagai default)
*   Menghapus semua metadata terkait dari file gambar yang ditransformasi (gambar
    asli tidak disentuh). Untuk mengganti perilaku ini dan mengirim
    gambar yang ditransformasi dengan metadata tetap utuh, tambahkan tanda `keep_iptc`.
*   Dapat menghasilkan format WebP, GIF, JPEG, dan JPEG-XR dengan kualitas otomatis. Untuk
    mengganti penyesuaian default, setel parameter kualitas pada
    transformasi.
*   Menjalankan algoritme
    [pengoptimalan](http://cloudinary.com/documentation/image_optimization#default_optimizations)
    untuk meminimalkan ukuran file dengan dampak minimal pada kualitas visual
    saat membuat gambar dalam format PNG, JPEG, atau GIF.

Imgix tidak memiliki pengoptimalan default seperti Cloudinary. Namun memiliki
kualitsa gambar default yang dapat disetel. Untuk imgix, parameter otomatis membantu Anda mengotomatisasi
level pengoptimalan baseline di katalog gambar.

Saat ini, terdapat [empat metode
berbeda](https://docs.imgix.com/apis/url/auto):

*   Kompresi
*   Peningkatan visual
*   Konversi format file
*   Penghapusan mata merah

Imgix mendukung format gambar berikut: JPEG, JPEG2000, PNG, GIF, Animated
GIF, TIFF, BMP, ICNS, ICO, PDF, PCT, PSD, AI

Cloudinary mendukung format gambar berikut: JPEG, JPEG 2000, JPEG XR, PNG,
GIF, Animated GIF, WebP, Animated WebP,BMPs, TIFF, ICOs, PDF, EPS, PSD, SVG, AI,
DjVu, FLIF, TARGA.

**Bagaimana Dengan Performa?**

Performa pengiriman CDN sebagian besar terkait
[latensi](https://docs.google.com/a/chromium.org/viewer?a=v&pid=sites&srcid=Y2hyb21pdW0ub3JnfGRldnxneDoxMzcyOWI1N2I4YzI3NzE2)
dan kecepatan.

Latensi selalu agak meningkat untuk gambar yang sepenuhnya tidak di-cache. Namun setelah
gambar di-cache dan didistribusikan di antara server jaringan, faktanya bahwa
CDN global dapat menemukan jalan tersingkat ke pengguna, ditambah penghematan byte
gambar yang diproses dengan tepat, hampir selalu mengurangi masalah latensi jika dibandingkan
dengan gambar yang diproses dengan buruk atau server soliter yang mencoba mencapai
target.

Kedua layanan tersebut menggunakan CDN yang cepat dan luas. Konfigurasi ini mengurangi latensi dan
meningkatkan kecepatan download. Kecepatan download memengaruhi waktu muat halaman, dan ini adalah salah satu
metrik paling penting untuk pengalaman pengguna dan konversi.

**Jadi Bagaimana Perbandingannya?**

Cloudinary memiliki [160 ribu pelanggan](http://cloudinary.com/customers) termasuk
Netflix, eBay, dan Dropbox. Imgix tidak melaporkan jumlah pelanggan yang dimilikinya, namun
lebih kecil daripada Cloudinary. Meski demikian, basis pengguna imgix mencakup pengguna
gambar berat seperti Kickstarter, Exposure, unsplash, dan Eventbrite.

Ada begitu banyak variabel yang tidak terkontrol dalam manipulasi gambar sehingga
perbandingan performa head-to-head antara kedua layanan ini sulit dilakukan. Sangat
bergantung pada berapa banyak Anda perlu memproses gambar — yang memerlukan
jumlah waktu yang bervariasi — serta ukuran dan resolusi apa yang diperlukan untuk hasil akhir,
yang memengaruhi kecepatan dan waktu download. Biaya mungkin pada akhirnya menjadi faktor
terpenting untuk Anda.

CDN memerlukan biaya. Situs dengan banyak gambar dan traffic dapat memerlukan biaya ratusan
US dollar per bulan untuk biaya CDN. Ada tingkat pengetahuan
dan keterampilan pemrograman tertentu yang diperlukan untuk mengoptimalkan penggunaan layanan ini.
Jika tidak melakukan sesuatu yang terlalu rumit, Anda mungkin tidak akan mengalami
masalah.

Namun, jika Anda tidak nyaman bekerja dengan fitur atau API pemrosesan gambar, maka
Anda perlu belajar lebih banyak lagi. Untuk mengakomodasi
lokasi server CDN, Anda harus mengubah beberapa URL di link lokal Anda. Lakukan
uji kelayakan yang benar :)

**Kesimpulan**

Jika Anda saat ini menyajikan gambar sendiri atau sedang berencana, mungkin sebaiknya
berikan sedikit pertimbangan untuk CDN.

## Menyimpan cache aset gambar {: #caching-image-assets }

Resource dapat menentukan kebijakan caching menggunakan [header cache
HTTP](/web/fundamentals/performance/optimizing-content-efficiency/http-caching#cache-control).
Secara spesifik, `Cache-Control` dapat menentukan siapa yang dapat menyimpan cache respons dan untuk berapa
lama

Sebagian besar gambar yang Anda kirimkan kepada pengguna adalah aset statis yang[ tidak akan
berubah](http://kean.github.io/post/image-caching) di masa mendatang. Strategi caching
terbaik untuk aset seperti itu adalah caching agresif.

Saat menyetel header caching HTTP, setel Cache-Control dengan usia maks satu
tahun (mis. `Cache-Control:public; max-age=31536000`). Jenis caching agresif
ini berfungsi dengan baik untuk sebagian besar jenis gambar, terutama gambar yang
berdurasi lama seperti avatar dan header gambar.

Note: Jika Anda menyajikan gambar menggunakan PHP, itu dapat merusak caching karena setelan
default
[session_cache_limiter](http://php.net/manual/en/function.session-cache-limiter.php)
. Ini dapat menjadi musibah bagi caching gambar dan Anda dapat [mengatasi
](https://stackoverflow.com/a/3905468) ini dengan menyetel
session_cache_limiter('public') yang akan menyetel `public, max-age=`. Menonaktifkan dan
menyetel header cache-control kustom juga boleh.

## Memuat aset gambar kritis terlebih dahulu {: #preload-critical-image-assets }

Aset gambar kritis dapat dimuat terlebih dahulu menggunakan [`<link
rel=preload>`](https://www.w3.org/TR/preload/).

`<link rel=preload>` adalah pengambilan deklaratif, memungkinkan Anda memaksa browser
membuat permintaan atas resource tanpa memblokir peristiwa `onload` dokumen.
Ini memungkinkan peningkatan prioritas permintaan atas resoruce yang mungkin
tidak ditemukan hingga nanti dalam proses penguraian dokumen.

Gambar dapat dimuat terlebih dahulu dengan menentukan nilai `as` dari `image`:

```html
<link rel="preload" as="image" href="logo.jpg"/>
```

Resource gambar untuk `<img>`, `<picture>`, `srcset` dan SVG dapat memanfaatkan
pengoptimalan ini.

Note: `<link rel="preload">` [didukung](http://caniuse.com/#search=preload)
di Chrome dan browser berbasis Blink seperti Opera, [Pratinjau
Safari Tech](https://developer.apple.com/safari/technology-preview/release-notes/)
dan telah [diimplementasikan](https://bugzilla.mozilla.org/show_bug.cgi?id=1222633)
di Firefox.

Situs seperti [Philips](https://www.usa.philips.com/),
[FlipKart](https://www.flipkart.com/), dan [Xerox](https://www.xerox.com/) menggunakan
`<link rel=preload>` untuk memuat aset logo utamanya terlebih dahulu (sering digunakan di awal dalam
dokumen). [Kayak](https://kayak.com/) juga menggunakan pramuat untuk memastikan gambar
utama header dimuat secepatnya.


<img src="images/preload-philips.jpg" alt="Philips menggunakan rel=preload link untuk
        memuat gambar logonya terlebih dahulu"
         />


**Apa itu header pramuat Link?**

Link pramuat dapat ditentukan menggunakan tag HTML atau [header
HTTP Link](https://www.w3.org/wiki/LinkHeader). Dalam kedua hal ini, link pramuat
mengarahkan browser untuk mulai memuat resource ke dalam cache memori,
menandakan bahwa halaman dengan kepercayaan tinggi ingin menggunakan resource dan
tidak ingin menunggu pemindai pramuat atau parser menemukannya.

Header pramuat Link untuk gambar terlihat mirip dengan ini:

```
Link: <https://example.com/logo-hires.jpg>; rel=preload; as=image
```

Saat the Financial Times memperkenalkan header pramuat Link ke situsnya, mereka
memangkas [1 detik](https://twitter.com/wheresrhys/status/843252599902167040)
dari waktu yang diperlukan untuk menampilkan gambar kepala suratnya:


<img src="images/preload-financial-times.jpg" alt="The FT menggunakan pramuat.
        WebPageTest ditampilkan sebelum dan sesudah rekaman aktivitas yang menampilkan
        peningkatan."
         />
Bawah: dengan `<link rel=preload>`, Atas: tanpa itu. Perbandingan Moto G4 pada
3G di WebPageTest
[sebelum](https://www.webpagetest.org/result/170319_Z2_GFR/) dan
[sesudah](https://www.webpagetest.org/result/170319_R8_G4Q/).


Demikian juga, Wikipedia meningkatkan performa waktu-ke-logo dengan header
pramuat Link seperti dibahas di [studi
kasusnya](https://phabricator.wikimedia.org/phame/post/view/19/improving_time-to-logo_performance_with_preload_links/).

**Apa saja kekurangan yang harus dipertimbangkan saat menggunakan pengoptimalan ini?**

Anda harus sangat yakin bahwa aset gambar layak untuk dipramuat karena, jika aset gambar tidak
penting untuk pengalaman pengguna, mungkin ada konten lain di halaman yang layak
untuk memfokuskan upaya Anda dalam memuat lebih awal. Dengan memprioritaskan permintaan
gambar, Anda pada akhirnya dapat mendorong resource lain lebih lanjut dalam antrean.

Sebaiknya hindari menggunakan `rel=preload` untuk melakukan pramuat format gambar tanpa
dukungan browser yang luas (mis. WebP). Juga sebaiknya hindari menggunakannya untuk
gambar responsif yang ditentukan di `srcset` karena sumber yang didapatkan mungkin bervariasi berdasarkan
kondisi perangkat.

Untuk mempelajari lebih lanjut pramuat, lihat [Preload, Prefetch and Priorities in
Chrome](https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf)
dan [Preload: What Is It Good
For?](https://www.smashingmagazine.com/2016/02/preload-what-is-it-good-for/).

## Anggaran performa web untuk gambar {: #performance-budgets }

Anggaran performa adalah "anggaran" untuk performa halaman yang diupayakan oleh tim untuk
tidak dilewati. Misalnya, "gambar tidak akan melewati 200KB di halaman mana pun" atau "
pengalaman pengguna harus dapat digunakan dalam 3 detik". Jika anggaran tidak
terpenuhi, pelajari alasannya dan cara mencapai kembali target.

Anggaran menyediakan framework yang berguna untuk membahas performa dengan para pemangku kepentingan.
Jika keputusan desain atau bisnis dapat memengaruhi performa situs, periksa
anggaran. Ini menjadi referensi untuk mendorong kembali atau memikirkan kembali perubahan jika
dapat membahayakan pengalaman pengguna situs.

Saya telah menemukan bahwa tim memiliki sukses terbaik dengan anggaran performa saat memantaunya
bersifat otomatis. Daripada memeriksa waterfall jaringan secara manual untuk mengetahui regresi
anggaran, otomatisasi dapat menandai kapan anggaran terlampaui. Dua layanan demikian
yang berguna untuk pemantauan anggaran performa adalah
[Calibre](https://calibreapp.com/docs/metrics/budgets) dan
[SpeedCurve](https://speedcurve.com/blog/tag/performance-budgets/).

Setelah anggaran performa untuk ukuran gambar ditentukan, SpeedCurve memulai
pemantauan dan mengingatkan Anda jika anggaran terlampaui:


<img src="images/F2BCD61B-85C5-4E82-88CF-9E39CB75C9C0.jpg" alt="SpeedCurve
        pemantauan ukuran gambar."
         />


Calibre menawarkan fitur serupa dengan dukungan untuk menyetel anggaran bagi tiap
kelas perangkat yang Anda targetkan. Ini berguna karena anggaran untuk ukuran gambar di
desktop melalui WiFi dapat bervariasi dengan anggaran di seluler.


<img src="images/budgets.jpg" alt="Calibre mendukung anggaran untuk ukuran gambar."
         />

## Rekomendasi penutup {: #closing-recommendations }

Pada akhirnya, memilih strategi pengoptimalan gambar akan bergantung pada jenis
gambar yang Anda sajikan kepada pengguna dan yang Anda putuskan adalah
set kriteria evaluasi yang masuk akal. Mungkin menggunakan SSIM atau Butteraugli atau, jika berupa
kumpulan gambar yang cukup kecil, keluar dari persepsi manusia terkait apa yang
paling masuk akal.

**Berikut ini rekomendasi penutup saya:**

Jika Anda **tidak dapat** berinvestasi dalam format yang menyajikan secara kondisional berdasarkan dukungan
browser:


* jpegtran Guetzli + MozJPEG adalah format yang baik untuk kuaitas JPEG > 90.
    * Untuk web `q=90` terlalu tinggi. Anda dapat menggunakan `q=80`, dan
      di layar 2x bahkan dengan `q=50`. Karena Guetzli tidak sampai serendah itu, untuk
      web Anda dapat menggunakan MozJPEG.
    * Kornel Lesi&#x144;ski baru-baru ini meningkatkan perintah cjpeg mozjpeg untuk menambahkan
      profil sRGB kecil guna membantu Chrome menampilkan warna natural pada layar wide-gamut
* PNG pngquant + advpng memiliki rasio kecepatan/kompresi yang cukup baik
* Jika Anda **dapat** secara kondisional menyajikan (menggunakan `<picture>`, [header
  Accept](https://www.igvita.com/2013/05/01/deploying-webp-via-accept-content-negotiation/)
  atau [Picturefill](https://scottjehl.github.io/picturefill/)):
    * Sajikan WebP ke browser yang mendukungnya
        * Buat gambar WebP dari gambar berkualitas asli 100%. Jika tidak, Anda akan
          memberikan gambar yang terlihat lebih buruk ke browser yang mendukungnya dengan distorsi JPEG
          *dan* distorsi WebP! Jika Anda mengompresi
          gambar sumber yang tidak dikompresi menggunakan WebP, akan terdapat distorsi WebP yang kurang kelihatan
          dan juga dapat mengompresi lebih baik.
        * Setelan default yang digunakan oleh tim WebP dari `-m 4 -q 75` biasanya
          baik untuk sebagian besar kasus yang mengoptimalkan kecepatan/rasio.
        * WebP juga memiliki mode khusus untuk (`-m 6 -q 100`) lossless yang dapat
          mengurangi file ke ukuran terkecilnya dengan memeriksa semua kombinasi
          parameter. Proses ini jauh lebih lambat namun layak dilakukan untuk
          aset statis.
    *   Sebagai fallback, sajikan sumber yang dikompresi Guetzli/MozJPEG ke
        browser lain

Selamat berkompresi!
