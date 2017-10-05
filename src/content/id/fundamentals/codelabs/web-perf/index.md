project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Codelab ini akan membantu Anda belajar mengidentifikasi dan memperbaiki bottleneck kinerja aplikasi web.

{# wf_updated_on: 2016-10-20T18:16:09Z #}
{# wf_published_on: 2016-01-01 #}


# Menemukan dan Memperbaiki Masalah Kinerja Aplikasi Web {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}




## Pengantar




Codelab ini adalah versi teks dari sebagian materi yang dibahas dalam kursus Udacity mengenai kinerja web/aplikasi ( [ud860](https://www.udacity.com/course/browser-rendering-optimization--ud860)). Alih-alih transkripsi dari kursus video, codelab ini dimaksudkan agar menjadi solusi praktis dan efisien terhadap identifikasi dan koreksi jank, dengan menggunakan proyek final sesi praktik asli kursus.


## Ringkasan




Kita semua telah melihat aplikasi yang tampilannya cenderung meloncat kasar saat animasi, pengguliran, atau interaksi pengguna lainnya. Inkonsistensi yang terlihat ini adalah masalah kinerja yang biasa disebut *jank* atau *judder* dan merupakan gangguan yang menjengkelkan bagi pengguna; itu mengganggu alur berpikir mereka saat menggunakan aplikasi dan membuat aplikasi terlihat kurang sempurna dan profesional.

Jika browser butuh waktu terlalu lama untuk membuat dan menampilkan bingkai, maka bingkai akan dilewatkan dan Anda tidak akan melihat bingkai sama sekali. Sebagai gantinya, Anda melihat bingkai berikutnya (atau bingkai setelahnya), dan objek melompat di semua celah, bukannya bergerak mulus melaluinya.

Fenomena jank dapat dihindari dengan memastikan aplikasi berjalan konsisten pada enam puluh bingkai per detik (60 fps). Banyak faktor yang turut memengaruhi laju bingkai aplikasi, dan ada beragam cara untuk membuat kode JavaScript dan CSS untuk mengurangi atau menghilangkan jank dan mencapai laju bingkai yang diinginkan.

Codelab ini adalah tentang mengubah cara pendekatan Anda terhadap masalah kinerja aplikasi dengan membantu Anda menemukan dan mengatasi bottleneck tampilan bingkai yang menyebabkan jank.

### Yang harus Anda ketahui sebelum mulai

*  *Jalur rendering penting:* Anda harus memahami pipeline rendering dan bagaimana JavaScript dan CSS memengaruhinya. Ketahui selengkapnya di sini: [https://developers.google.com/web/fundamentals/performance/critical-rendering-path/](/web/fundamentals/performance/critical-rendering-path/) dan di sini: Kursus Udacity mengenai [Optimalisasi Kinerja Situs Web: Jalur Rendering Penting](https://www.udacity.com/course/website-performance-optimization--ud884)__.__
*  *Bingkai dan laju bingkai:* Anda harus mengetahui cara browser membangun bingkai dan mengapa laju 60 fps penting untuk tampilan yang mulus. Ketahui selengkapnya di sini: [https://developers.google.com/web/fundamentals/performance/rendering/](/web/fundamentals/performance/rendering/) dan di sini: Kursus Udacity mengenai [Optimalisasi Rendering Browser: Membangun Aplikasi Web 60 FPS](https://www.udacity.com/course/browser-rendering-optimization--ud860).
*  *Daur hidup aplikasi:* Anda harus memahami bagian Respons, Animasi, Idle, dan Pemuatan dari aplikasi yang berjalan dan mengenali jendela peluang yang diberikan setiap bagian. Ketahui selengkapnya di sini: [Model Kinerja RAIL](/web/fundamentals/performance/rail)
*  *Chrome DevTools:* Anda harus memiliki pemahaman dasar mengenai DevTools dan cara menggunakannya untuk menganalisis aplikasi web, khususnya alat (bantu) Timeline. Ketahui selengkapnya di sini: [Analisis Kinerja Waktu Proses](/web/tools/chrome-devtools/rendering-tools/).

### Yang akan Anda pelajari dalam codelab ini

* Cara mengidentifikasi kode aplikasi yang menyebabkan bottleneck kinerja tampilan
* Cara menganalisis dan memodifikasi kode untuk mengurangi atau menghilangkan bottleneck

### Yang akan Anda butuhkan dalam workspace development

* Browser Google Chrome, DevTools
* Kode contoh untuk proyek praktik (lihat di bawah ini)

### Jank/Judder

Mari kita pahami jank dengan bermain game, "Jank Invaders" karya Jake Archibald. Game ini dirancang untuk memperagakan masalah laju bingkai dan kinerja. Inilah cuplikan layarnya.

![4a4d206daaf5693a.png](img/4a4d206daaf5693a.png)

Dalam game ini, pesawat angkasa bergerak di layar. Orang yang baik bergerak mulus, sedangkan yang jahat ("pesawat mata-mata") bergerak tersendat-sendat. Tugas Anda: mengidentifikasi dan menembak sepuluh pesawat mata-mata yang tersendat-sendat di antara pesawat yang bergerak mulus dengan mengekliknya secepat mungkin. [Inilah tautan ke game tersebut](http://jakearchibald.github.io/jank-invaders/). Silakan bersenang-senang; kembalilah setelah Anda selesai.

Dengan jelas, pengguna melihat jank dan hampir selalu memilih aplikasi yang berjalan lebih baik, dan hal ini tidak ada bedanya dengan web: kinerja yang buruk akan menghancurkan situs yang baik. Codelab ini akan membantu Anda memahami kinerja proyek dan mendalami cara mengidentifikasi serta mengoreksi berbagai masalah umum. Anda akan memburu penyebab guliran yang macet, pembaruan berkedip, dan animasi yang bergetar, dengan tujuan mencapai laju bingkai 60 fps yang mulus dan sempurna.


## Aplikasi Proyek




Mari kita mulai dengan memperhatikan aplikasi yang akan Anda debug dalam codelab ini. Tampilannya seperti ini.

![36d93b5f28eb60c5.png](img/36d93b5f28eb60c5.png)

Situs ini menggunakan __Hacker News API__ untuk menampilkan cerita terbaru dan skornya. Kini, kinerja aplikasi sangat buruk, khususnya di perangkat seluler, namun seharusnya aplikasi bisa mencapai 60 fps. Di akhir codelab ini, Anda akan memiliki keahlian, teknik, dan -- yang paling penting -- pola pikir yang dibutuhkan untuk mengubah aplikasi tersendat ini menjadi pengalaman 60 fps yang menarik dan efisien.

### Mendapatkan Kode Proyek

Pertama, Anda harus mendapatkan kode aplikasinya, baik versi "sebelum"maupun "setelah". Anda bisa membuat duplikat penyimpanannya atau sekadar mengunduh file zip.

* Inilah aplikasi orisinal dengan bottleneck kinerja di [repositori GitHub](http://github.com/udacity/news-aggregator); juga, inilah [situs live](http://udacity.github.io/news-aggregator/) jika Anda ingin melihatnya. Inilah versi yang akan Anda kerjakan.
* Inilah aplikasi yang telah diselesaikan tanpa bottleneck kinerja di [repositori GitHub](https://github.com/udacity/news-aggregator/tree/solution). Anda bisa menggunakan versi yang telah dikoreksi sebagai referensi.

### Menjalankan aplikasi orisinal

Pertama, dapatkan versi aplikasi orisinal yang tersendat dan jalankan. Di Chrome, buka __index.html__ di folder tingkat teratas (mis., news-aggregator-master). Bereksperimenlah sedikit dengan aplikasi ini; Anda akan segera melihat masalah kinerja tingkat tinggi dalam dua interaksi pengguna utama, bergulir dalam layar utama dan pergeseran masuk/keluar cerita. Kita akan memfokuskan pada masalah utama itu untuk mengetahui bagaimana kita bisa meningkatkan kinerja aplikasi yang tersendat ini.


## Latihan 1: Menggulir daftar




Selama menggulir di layar utama, Anda akan melihat bahwa daftar cerita bergetar. Anda juga akan melihat bahwa masing-masing indikator poin cerita (angka yang dilingkari) tidak hanya mengubah nilai, melainkan juga mengubah warna. Latihan ini adalah tentang mengidentifikasi masalah ini dan memutuskan cara pendekatannya.

Mari kita lihat apa yang sebenarnya terjadi saat kita menggulir di layar utama, dengan menggunakan Timeline. Pastikan bahwa kotak centang __JS Profile__ diaktifkan sebelum Anda memulai perekaman. Mulailah perekaman baru, gulir daftar ke bawah, kemudian hentikan perekaman. 

Di bagian atas rekaman, Anda melihat indikator FPS berwarna hijau. Anda akan melihat bilah hijau dengan beberapa lonjakan, seperti pada tangkapan layar di bawah ini. Fakta bahwa bilah hijau sangat rendah menunjukkan bahwa layar tidak mencapai 60 FPS.

![2e40b3134f26b0fa.png](img/2e40b3134f26b0fa.png)

Perbesar rekaman dan Anda akan melihat bahwa setelah kejadian gulir ada panggilan fungsi, diikuti oleh banyak kejadian layout yang terpisah, masing-masing dengan segitiga peringatan berwarna merah. Kejadian layout adalah kejadian ungu sangat tipis di bagian bawah bagan api pada tangkapan layar di bawah ini. Ini adalah tanda nyata bahwa terjadi *layout sinkron paksa*.

![d6fb17faaa99e6f.png](img/d6fb17faaa99e6f.png)

Arahkan ke atasnya untuk mengidentifikasi kejadian layout, kemudian klik untuk menampilkan detailnya. 

![fce56d36285bc1fc.png](img/fce56d36285bc1fc.png)

Perhatikan detail kejadian layout, maka Anda bisa melihat bahwa peringatan layout sinkron paksa dihasilkan oleh fungsi `colorizeAndScaleStories` di app.js.

![f58a21a56040ce6a.png](img/f58a21a56040ce6a.png)

Mari kita periksa fungsi tersebut.

```
function colorizeAndScaleStories() {

  var storyElements = document.querySelectorAll('.story');

  // It does seem awfully broad to change all the
  // colors every time!
  for (var s = 0; s < storyElements.length; s++) {

    var story = storyElements[s];
    var score = story.querySelector('.story__score');
    var title = story.querySelector('.story__title');

    // Base the scale on the y position of the score.
    var height = main.offsetHeight;
    var mainPosition = main.getBoundingClientRect();
    var scoreLocation = score.getBoundingClientRect().top -
        document.body.getBoundingClientRect().top;
    var scale = Math.min(1, 1 - (0.05 * ((scoreLocation - 170) / height)));
    var opacity = Math.min(1, 1 - (0.5 * ((scoreLocation - 170) / height)));

    score.style.width = (scale * 40) + 'px';
    score.style.height = (scale * 40) + 'px';
    score.style.lineHeight = (scale * 40) + 'px';

    // Now figure out how wide it is and use that to saturate it.
    scoreLocation = score.getBoundingClientRect();
    var saturation = (100 * ((scoreLocation.width - 38) / 2));

    score.style.backgroundColor = 'hsl(42, ' + saturation + '%, 50%)';
    title.style.opacity = opacity;
  }
}
```

Perhatikan bahwa `height`, `width`, dan `line-height` telah diakses, yang menyebabkan layout dijalankan. Opasitas juga telah diatur dan -- sedangkan perubahan opasitas tidak memicu layout -- baris kode ini menerapkan gaya baru, yang memicu penghitungan ulang dan, layout lagi. Kedua teknik ini yang digunakan dalam loop utama fungsi menyebabkan masalah layout sinkron paksa. 

Berikutnya, pertimbangkan efek visual pada indikator poin cerita, yang tidak menambahkan nilai informasi apa pun. Kita bisa menghasilkan efek ini dengan properti CSS sebagai ganti JavaScript, namun kita mungkin lebih baik meninggalkan efek sama sekali. Kesimpulan: kadang-kadang solusi kode terbaik adalah menghilangkannya.

Mari kita membuang panggilan ke fungsi `colorizeAndScaleStories`. Serahkan baris 88, 89, dan 305 di app.js, serta seluruh fungsi, baris 255-286. Jangan menghapus baris, karena nomor baris yang kita referensikan setelahnya di codelab, akan tidak cocok dengan aplikasi Anda. Sekarang pokok cerita selalu terlihat sama.

Jalankan lagi aplikasi dan lakukan perekaman Timeline terhadap beberapa aktivitas gulir, kemudian perbesar di kejadian gulir. Kali ini, Anda akan melihat bahwa hanya ada satu kalkulasi ulang gaya setelah pengguliran, dan bilah FPS jauh lebih tinggi. 

![5e9d66cb007f9076.png](img/5e9d66cb007f9076.png)

Layout ekstra dan peringatan layout sinkron paksa sudah hilang, dan laju bingkai menjadi bagus. Satu masalah jank telah teratasi!


## Latihan 2: Rangkaian cerita




Masalah lain yang memengaruhi kelancaran aplikasi adalah gulir yang tersendat ketika cerita ditambahkan ke dalam daftar. Perhatikan panggilan untuk `loadStoryBatch` dalam kode event listener `scroll`.

```
main.addEventListener('scroll', function() {

  ...

  // Check if we need to load the next batch of stories.
  var loadThreshold = (main.scrollHeight - main.offsetHeight -
      LAZY_LOAD_THRESHOLD);
  if (main.scrollTop > loadThreshold)
    loadStoryBatch();
});
```

Fungsi ini melakukan perubahan yang terlihat pada laman dengan memasukkan cerita baru ke laman saat dimuat, terutama dengan menambahkan simpul DOM menggunakan `appendChild`. Tidak ada yang salah dalam fungsi, maupun pendekatan desain yang menggunakannya, tapi pertimbangkan bagaimana itu dipanggil.

Fungsi `loadStoryBatch` adalah catch-as-catch-can; berjalan setiap kali diperlukan, berdasarkan pada pengujian `loadThreshold`, tanpa mempertimbangkan kejadian lain yang terjadi di laman atau posisi browser dalam proses konstruksi bingkai. Hal ini karena mesin JavaScript tidak memerhatikan pipeline rendering ketika menjalankan skrip. Proses langsung tersebut akan menyebabkan masalah kinerja, terutama saat lebih banyak cerita ditambahkan ke dalam daftar. Kita bisa mengatasi masalah ini dengan menggunakan *requestAnimationFrame* .

Idealnya, apa pun yang membuat perubahan terlihat pada laman harus terjadi dalam panggilan requestAnimationFrame. Mari kita membuat perubahan untuk kode event listener `scroll`.

```
main.addEventListener('scroll', function() {

  ...

  // Check if we need to load the next batch of stories.
  var loadThreshold = (main.scrollHeight - main.offsetHeight -
      LAZY_LOAD_THRESHOLD);
  if (main.scrollTop > loadThreshold)
    requestAnimationFrame(loadStoryBatch);
});
```

Perubahan sederhana ini memastikan bahwa skrip yang berhubungan dengan animasi berjalan lebih dulu pada proses pipeline, dan memberikan dorongan kinerja sedikit namun signifikan.


## Latihan 3: Pergeseran masuk/keluar cerita (bagian 1)




Area masalah lain bagi aplikasi agregator berita kita adalah aksi dasar menggeser cerita keluar-masuk. Selain menggulir, inilah fitur interaksi pengguna paling umum.

Seperti biasa, mulailah dengan melakukan perekaman Timeline terhadap pergantian slide cerita, dan memeriksa laju bingkai. Pergeseran masuk/keluar mungkin sebenarnya berkisar dari sedikit tersendat hingga tak dapat digunakan sama sekali di berbagai perangkat. Pastikan melihat [situs live](http://udacity.github.io/news-aggregator/) di perangkat seluler, namun hal ini bermasalah di semua platform.

![59865afca1e508ef.png](img/59865afca1e508ef.png)

Biasanya, setiap kali Anda melihat kejadian ungu dengan segitiga merah di atasnya, Anda ingin menyelidikinya dengan mengarahkan kursor ke atasnya dan mengekliknya untuk menampilkan detailnya. Sekarang, Anda tertarik dalam layout sinkron paksa yang terjadi setelah pengatur waktu diaktifkan. 

![1bd8f7700f55a6c4.png](img/1bd8f7700f55a6c4.png)

Pergeseran masuk/keluar animasi mengaktifkan pengatur waktu dan terjadi layout sinkron paksa. Detail menunjuk pada baris 180 di file app.js, yang merupakan fungsi bernama `animate`. Mari kita periksa fungsi tersebut.

```
function animate () {

  // Find out where it currently is.
  var storyDetailsPosition = storyDetails.getBoundingClientRect();

  // Set the left value if we don't have one already.
  if (left === null)
        left = storyDetailsPosition.left;

  // Now figure out where it needs to go.
  left += (0 - storyDetailsPosition.left) * 0.1;

  // Set up the next bit of the animation if there is more to do.
  if (Math.abs(left) > 0.5)
        setTimeout(animate, 4);
  else
        left = 0;

  // And update the styles. Wait, is this a read-write cycle?
  // I hope I don't trigger a forced synchronous layout!
  storyDetails.style.left = left + 'px';
}
```

Salah satu yang pertama akan Anda lihat adalah `setTimeout` yang membuat panggilan berikutnya ke `animate`. Sebagaimana yang telah Anda pelajari dalam latihan sebelumnya, pekerjaan terlihat yang telah dilakukan pada laman biasanya ada dalam panggilan `requestAnimationFrame`. Namun khususnya, `setTimeout` adalah masalah.

Solusi yang nyata -- dan mudah -- di sini adalah memaksa setiap panggilan ke `animate` dijadwalkan pada awal urutan bingkainya dengan memasukkan ke dalam `requestAnimationFrame`.

```
function animate () {

  // Find out where it currently is.
  var storyDetailsPosition = storyDetails.getBoundingClientRect();

  // Set the left value if we don't have one already.
  if (left === null)
        left = storyDetailsPosition.left;

  // Now figure out where it needs to go.
  left += (0 - storyDetailsPosition.left) * 0.1;

  // Set up the next bit of the animation if there is more to do.
  if (Math.abs(left) > 0.5)
        requestAnimationFrame(animate);
  else
        left = 0;

  // And update the styles. Wait, is this a read-write cycle?
  // I hope I don't trigger a forced synchronous layout!
  storyDetails.style.left = left + 'px';
}
```

Jika Anda melakukan perekaman Timeline lain, Anda akan melihat peningkatan kinerja yang moderat hingga signifikan, bergantung pada perangkat.

Pertanyaan bonus: Pikirkan apa yang terjadi pada pergeseran masuk/keluar cerita. Kita cuma akan menyebabkan cerita muncul dan menghilang di laman, yang menampilkan dan menyembunyikan materi. Kelihatannya ini proses transisi sederhana; apakah kita memang perlu JavaScript untuk itu, atau bisakah menanganinya dengan CSS saja? Kita akan meninjau kembali skenario ini di Latihan 5.


## Latihan 4: Pemborosan memori




Animasi yang tersendat bukan satu-satunya penyebab kinerja yang buruk di laman dan aplikasi web. Kesalahan utama lainnya adalah penggunaan memori yang tidak efisien dan, mungkin seperti yang Anda duga, aplikasi agregator berita kami juga ikut bersalah.

Bila tajuk cerita dalam daftar utama diklik, aplikasi akan membangun materi cerita, menambahkannya ke laman, dan geser ke dalam tampilan. Ini adalah bagian "menambahkannya ke laman" yang memerlukan pemeriksaan. Ringkasnya, fungsi yang menangani klik cerita disebut `onStoryClick`. Mari kita amati.

```
function onStoryClick(details) {

  var storyDetails = $('sd-' + details.id);

  // Wait a little time then show the story details.
  setTimeout(showStory.bind(this, details.id), 60);

  // Create and append the story. A visual change...
  // perhaps that should be in a requestAnimationFrame?
  // And maybe, since they're all the same, I don't
  // need to make a new element every single time? I mean,
  // it inflates the DOM and I can only see one at once.
  if (!storyDetails) {

    if (details.url)
      details.urlobj = new URL(details.url);

    var comment;
    var commentsElement;
    var storyHeader;
    var storyContent;

    var storyDetailsHtml = storyDetailsTemplate(details);
    var kids = details.kids;
    var commentHtml = storyDetailsCommentTemplate({
      by: '', text: 'Loading comment...'
    });

    storyDetails = document.createElement('section');
    storyDetails.setAttribute('id', 'sd-' + details.id);
    storyDetails.classList.add('story-details');
    storyDetails.innerHTML = storyDetailsHtml;

    document.body.appendChild(storyDetails);

    commentsElement = storyDetails.querySelector('.js-comments');
    storyHeader = storyDetails.querySelector('.js-header');
    storyContent = storyDetails.querySelector('.js-content');

    var closeButton = storyDetails.querySelector('.js-close');
    closeButton.addEventListener('click', hideStory.bind(this, details.id));

    var headerHeight = storyHeader.getBoundingClientRect().height;
    storyContent.style.paddingTop = headerHeight + 'px';

    if (typeof kids === 'undefined')
      return;

    for (var k = 0; k < kids.length; k++) {

      comment = document.createElement('aside');
      comment.setAttribute('id', 'sdc-' + kids[k]);
      comment.classList.add('story-details__comment');
      comment.innerHTML = commentHtml;
      commentsElement.appendChild(comment);

      // Update the comment with the live data.
      APP.Data.getStoryComment(kids[k], function(commentDetails) {

        commentDetails.time *= 1000;

        var comment = commentsElement.querySelector(
            '#sdc-' + commentDetails.id);
        comment.innerHTML = storyDetailsCommentTemplate(
            commentDetails,
            localeData);
      });
    }
  }
}
```

Setelah grup pertama deklarasi variabel, perhatikan empat baris yang membentuk variabel `storyDetails`, menyetel tipe elemennya, atribut, dan materi. Langsung setelah itu, perhatikan bahwa `storyDetails` ditambahkan ke DOM sebagai simpul baru dengan metode `appendChild`.

Pertama, itu tidak perlu jadi masalah, namun ini menjadi semakin tidak efisien saat aplikasi digunakan. Tentu saja, pengguna hanya melihat satu cerita untuk setiap kalinya, namun simpul-simpul baru yang dibuat untuk setiap cerita yang telah dilihat tidak akan dibuang. Setelah beberapa klik, DOM akan berantakan dengan simpul-simpul yang ditinggalkan sehingga menyita memori dan memperlambat aplikasi -- dan semakin lama aplikasi digunakan, semakin buruk kinerjanya.

Cara yang lebih baik untuk menghasilkan fitur ini adalah membuat dahulu satu simpul `storyDetails` permanen di skrip untuk menampung cerita saat ini, kemudian menggunakan properti `innerHTML` yang tepercaya untuk menyetel ulang materinya setiap kali, sebagai ganti membuat simpul baru. Dengan kata lain, Anda cukup menyederhanakan kode ini: 

```
    storyDetails = document.createElement('section');
    storyDetails.setAttribute('id', 'sd-' + details.id);
    storyDetails.classList.add('story-details');
    storyDetails.innerHTML = storyDetailsHtml;

    document.body.appendChild(storyDetails);
```

Ke ini:

```
    storyDetails.setAttribute('id', 'sd-' + details.id);
    storyDetails.innerHTML = storyDetailsHtml;
```

Perubahan itu jelas akan meningkatkan kinerja jangka panjang, namun itu tidak melakukan apa pun bagi kita dalam jangka pendek. 

Kita tetap perlu menyelesaikan penanganan masalah pergeseran masuk/keluar cerita ini.


## Latihan 5: Pergeseran masuk/keluar cerita (bagian 2)




Sejauh ini, Anda pasti telah memperoleh peningkatan, tidak hanya kinerja keseluruhan aplikasi, melainkan juga telah mengatasi banyak masalah kinerja tertentu, misalnya menggulir daftar. Namun, saat menjalankan aplikasi yang telah ditingkatkan, Anda bisa melihat masih ada beberapa jank dalam interaksi pengguna utama lainnya, pergeseran masuk/keluar cerita.

Mari kita periksa proses ini. Di Timeline, aktifkan profiler JavaScript, dan lakukan perekaman Timeline sambil mengeklik tajuk cerita untuk menggesernya masuk, kemudian mengeklik tombol X cerita untuk menggesernya keluar. Seperti yang Anda lihat di Latihan 3, fungsi `onStoryClick` (masih) menyebabkan layout sinkron paksa.

![33ba193a24cb7303.png](img/33ba193a24cb7303.png)

Di latihan itu, kita menempatkan panggilan fungsi `animate` ke dalam `requestAnimationFrame`; yang pasti akan membantu, namun tidak menghilangkan masalah sepenuhnya. 

Ingat kembali dari diskusi kita sebelumnya (dan dari riset Anda di [Pemicu CSS](http://csstriggers.com/)) bahwa menggunakan properti tertentu akan menyebabkan bagian tertentu dari pipeline rendering terjadi. Mari kita perhatikan  `animate` lagi.

```
function animate () {

  // Find out where it currently is.
  var storyDetailsPosition = storyDetails.getBoundingClientRect();

  // Set the left value if we don't have one already.
  if (left === null)
        left = storyDetailsPosition.left;

  // Now figure out where it needs to go.
  left += (0 - storyDetailsPosition.left) * 0.1;

  // Set up the next bit of the animation if there is more to do.
  if (Math.abs(left) > 0.5)
        requestAnimationFrame(animate);
  else
        left = 0;

  // And update the styles. Wait, is this a read-write cycle?
  // I hope I don't trigger a forced synchronous layout!
  storyDetails.style.left = left + 'px';
}
```

Mendekati akhir fungsi, properti `left` telah disetel; ini menyebabkan browser menjalankan layout. Tidak lama kemudian, properti `style` disetel; ini menyebabkan browser menjalankan gaya penghitungan ulang. Seperti yang Anda ketahui, jika ini terjadi lebih dari sekali di sebuah bingkai, ini akan menyebabkan layout sinkron paksa -- dan ini terjadi beberapa kali dalam fungsi ini. 

Fungsi `animate` dimuat dalam fungsi `showStory` dan fungsi saudaranya, `hideStory`, keduanya memperbarui properti yang sama dan menyebabkan masalah layout sinkron paksa.

Seperti yang telah kita ketahui sebelumnya dalam codelab ini, kadang-kadang perbaikan kode terbaik adalah menghilangkan kode tersebut. Ya, fungsi `showStory` dan `hideStory` melakukan tugasnya, namun keduanya terlalu kompleks untuk efek yang seharusnya sederhana. Jadi mari kita tinggalkan sejenak dan lihat apakah kita bisa membereskan tugas dengan CSS sebagai gantinya. Pertimbangkan kode CSS ini.

```
.story-details {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  position: fixed;
  top: 0;
  left: 100%;
  width: 100%;
  height: 100%;
  background: white;
  z-index: 2;
  box-shadow:
      0px 2px 7px 0px rgba(0, 0, 0, 0.10);

  overflow: hidden;
  transition: transform 0.3s;
  will-change: transform;
}

.story-details.visible {
  transform: translateX(-100vw);
}

.story-details.hidden {
  transform: translateX(0);
}
```

Hal pertama yang harus diperhatikan dalam kelas `.story-details` adalah bahwa kita menyetel properti `left` ke 100%; sebesar apa pun lebar layar, ini mendorong seluruh elemen cerita ke kanan, sepenuhnya keluar dari laman yang terlihat, sehingga benar-benar menyembunyikannya. 

Berikutnya, di kelas `.story-details.visible` dan `.story-details.hidden`, kita menyiapkan `transform` pada semua kelas untuk memaksa posisi X (horizontal) ke -100vw ( *tampilan lebar yang terlihat* ) dan 0. Di aplikasi, kelas-kelas ini akan memindahkan materi cerita ke dalam tampilan atau mengembalikan ke posisi luar-layar aslinya.

Kemudian, untuk memastikan bahwa penampilan cerita terlihat seperti animasi dan tidak sekedar cuplikan kasar, kita membuat `transition` pada `transform` untuk memberinya waktu 0,3 d (33 md). Hal ini akan memastikan efek visual pergeseran masuk/keluar yang halus.

Terakhir, kita menggunakan properti `will-change` untuk memberi tahu browser mengenai kemungkinan perubahan `transform`.

Dengan mengembalikan ke fungsi `showStory` dan `hideStory`, kini kita bisa benar-benar menyederhanakannya cukup dengan menambahkan atau membuang kelas-kelas `visible` dan `hidden` baru, sehingga menghasilkan perubahan visual yang diinginkan tanpa membuat skrip yang kompleks.

```
function showStory(id) {
  if (!storyDetails)
    return;

  storyDetails.classList.add('visible');
  storyDetails.classList.remove('hidden');
}

function hideStory(id) {
  storyDetails.classList.add('hidden');
  storyDetails.classList.remove('visible');
}
```

Semua ini seharusnya memiliki banyak manfaat positif pada kinerja pergeseran masuk/keluar cerita di aplikasi Anda, namun tentu saja satu-satunya cara untuk mengetahui buat meyakinkan adalah mengujinya. Lakukan perekaman Timeline lain untuk geser-masuk/keluar cerita, dan amati.

![5543cf34c10a914b.png](img/5543cf34c10a914b.png)

Kinerja aplikasi seharusnya jauh lebih baik; semua bingkai kini di bawah garis 60 fps, dan peringatan layout sinkron paksa sudah hilang. Yang penting, kita tidak perlu lagi menggunakan JavaScript untuk melakukan animasi geser-masuk/keluar. 

Pekerjaan meningkatkan kinerja dasar kita sudah beres.


## Selamat!




Jika Anda mengikuti keterangan dan penjelasannya, serta melakukan perubahan yang disarankan pada kode proyek orisinal, Anda semestinya sekarang telah memiliki aplikasi yang berjalan mulus pada 60 fps tanpa jank/tersendat dalam animasinya.

### Apakah yang kita bahas?

Dalam codelab ini, kita membahas:

* Pengetahuan prasyarat: jalur rendering, bingkai, dan laju bingkai penting, siklus hidup aplikasi, dan Chrome DevTools
* Ringkasan mengenai jank: apa yang dimaksud, penyebab terjadinya, dan cara mengidentifikasinya secara visual
* Aplikasi proyek: apakah yang harus dilakukan, mengapa gagal menghasilkan animasi yang mulus, dan cara menemukan dan mengatasi masalah

### Apa saja hal-hal yang perlu diingat?

Hal-hal utama yang perlu diingat dalam codelab ini adalah:

* Animasi layar yang tersendat bisa jadi merupakan masalah desain dan masalah kode.
* Persepsi mengenai jank -- atau tanpa jank -- merupakan faktor penting dalam keputusan pengguna apakah akan menggunakan suatu aplikasi.
* Penyesuaian kecepatan yang kecil sekalipun pada akhirnya akan banyak meningkatkan kinerja keseluruhan.

### Berikutnya?

Kami menyarankan Anda agar memeriksa kode proyek yang telah selesai, tersedia di [repositori GitHub](https://github.com/udacity/news-aggregator/tree/solution) ini. Anda akan menemukan bahwa penyimpanan ini berisi lebih banyak kode yang telah ditingkatkan daripada waktu yang dimiliki codelab ini untuk membahasnya. Bandingkan versi "sebelum" dan "setelah" dari suatu aplikasi dan amati perbedaan kode untuk melihat apa lagi yang telah diubah penulis untuk meningkatkan kinerja aplikasi.

### Terima kasih!

Terima kasih telah mempelajari codelab ini. Kami selalu berusaha keras untuk lebih baik; jika Anda menemukan bug masalah, atau sekadar memiliki saran, masalah, atau komentar, silakan hubungi kami di tautan masukan di bawah ini. Selamat membuat kode!




{# wf_devsite_translation #}
