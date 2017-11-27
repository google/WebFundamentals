project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: JavaScript seringkali memicu perubahan visual. Kadang-kadang hal itu secara langsung melalui manipulasi gaya, dan kadang-kadang penghitungannya, yang akan mengakibatkan perubahan visual, seperti menelusuri atau mengurutkan data. JavaScript yang berjalan lama atau jelek pengaturan waktunya bisa menjadi penyebab umum masalah kinerja. Anda harus berusaha sebisa mungkin meminimalkan dampaknya.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2015-03-20 #}

# Optimalkan Eksekusi JavaScript {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

JavaScript seringkali memicu perubahan visual. Kadang-kadang itu secara langsung
melalui manipulasi gaya, dan kadang-kadang penghitungannya yang akan
mengakibatkan perubahan visual, seperti menelusuri atau mengurutkan sejumlah data. JavaScript yang berjalan lama
atau jelek pengaturan waktunya bisa menjadi penyebab umum masalah kinerja.
Anda harus berusaha sebisa mungkin meminimalkan dampaknya.

Membuat profil kinerja JavaScript merupakan seni tersendiri, karena JavaScript yang Anda tulis bukanlah seperti kode yang sebenarnya dieksekusi. Browser modern menggunakan compiler JIT dan semua cara optimalisasi dan trik untuk dicoba dan memberi Anda eksekusi yang secepat mungkin, dan ini pada dasarnya akan mengubah dinamika kode.

Note: Jika benar-benar ingin melihat aksi JIT, Anda harus melihat <a href='http://mrale.ph/irhydra/2/'>IRHydra<sup>2</sup> oleh Vyacheslav Egorov</a>. Ini menampilkan suatu keadaan-antara untuk kode JavaScript bila mesin JavaScript di Chrome, V8, mengoptimalkannya.

Berdasarkan semua itu, bagaimana pun juga, ada beberapa hal yang pasti bisa Anda lakukan untuk membantu aplikasi mengeksekusi JavaScript dengan baik.

### TL;DR {: .hide-from-toc }

* Hindari setTimeout atau setInterval untuk pembaruan visual; sebagai gantinya gunakan selalu requestAnimationFrame.
* Pindahkan JavaScript yang berjalan lama dari thread utama ke Web Worker.
* Gunakan tugas mikro untuk membuat perubahan DOM melalui sejumlah bingkai.
* Gunakan Timeline dan JavaScript Profiler di Chrome DevTools untuk menilai dampak JavaScript.

## Gunakan `requestAnimationFrame` untuk perubahan visual

Bila perubahan visual terjadi di layar yang Anda inginkan untuk melakukan pekerjaan pada waktu yang tepat untuk browser, persis saat memulai bingkai. Satu-satunya cara memastikan JavaScript Anda berjalan saat memulai bingkai adalah menggunakan `requestAnimationFrame`.


    /**
     * If run as a requestAnimationFrame callback, this
     * will be run at the start of the frame.
     */
    function updateScreen(time) {
      // Make visual updates here.
    }

    requestAnimationFrame(updateScreen);


Kerangka kerja atau contoh dapat menggunakan `setTimeout` atau `setInterval` untuk melakukan perubahan visual seperti animasi, namun masalahnya adalah callback akan berjalan pada _beberapa titik_ di bingkai, mungkin tepat di akhir, dan sering kali pengaruhnya bisa menyebabkan kita kehilangan bingkai, sehingga mengakibatkan jank.

<img src="images/optimize-javascript-execution/settimeout.jpg" alt="setTimeout menyebabkan browser kehilangan bingkai.">

Kenyataannya, perilaku `animate` default jQuery sekarang ini adalah menggunakan `setTimeout`! Anda bisa [menambalnya untuk menggunakan `requestAnimationFrame`](https://github.com/gnarf/jquery-requestAnimationFrame), dan ini sangat dianjurkan.

## Kurangi kompleksitas atau gunakan Web Workers

JavaScript berjalan di thread utama browser, persis selama penghitungan gaya, layout, dan, dalam banyak kasus, paint. Jika JavaScript Anda berjalan lama, ia akan memblokir tugas lain, sehingga dapat menyebabkan hilangnya bingkai.

Anda harus bersikap taktis tentang kapan JavaScript dijalankan, dan berapa lama. Misalnya, jika Anda berada dalam animasi seperti menggulir, idealnya Anda harus terus mengamati JavaScript Anda melakukan sesuatu sekitar **3-4 md**. Bila lebih lama dari itu maka Anda berisiko menghabiskan waktu terlalu banyak. Jika Anda sedang dalam masa menganggur, Anda bisa lebih santai dengan waktu yang dihabiskan.

Dalam banyak kasus, Anda bisa memindahkan pekerjaan komputasi murni ke [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/basic_usage), misalnya jika tidak memerlukan akses DOM. Manipulasi data atau traversal, seperti pengurutan atau pencarian, sering kali cocok untuk model ini, sebagai pemuatan dan pembuatan model.


    var dataSortWorker = new Worker("sort-worker.js");
    dataSortWorker.postMesssage(dataToSort);

    // The main thread is now free to continue working on other things...

    dataSortWorker.addEventListener('message', function(evt) {
       var sortedData = evt.data;
       // Update data on screen...
    });



Tidak semua pekerjaan cocok dengan model ini: Web Workers tidak memiliki akses DOM. Bila pekerjaan Anda harus berada di thread utama, pertimbangkan pendekatan batch, di mana Anda memecah tugas yang lebih besar menjadi tugas-tugas mikro, masing-masing memerlukan waktu tidak lebih dari beberapa milidetik, dan berjalan di dalam penangan `requestAnimationFrame` di setiap bingkai.


    var taskList = breakBigTaskIntoMicroTasks(monsterTaskList);
    requestAnimationFrame(processTaskList);

    function processTaskList(taskStartTime) {
      var taskFinishTime;

      do {
        // Assume the next task is pushed onto a stack.
        var nextTask = taskList.pop();

        // Process nextTask.
        processTask(nextTask);

        // Go again if there’s enough time to do the next task.
        taskFinishTime = window.performance.now();
      } while (taskFinishTime - taskStartTime < 3);

      if (taskList.length > 0)
        requestAnimationFrame(processTaskList);

    }


Ada konsekuensi UX dan UI pada pendekatan ini, dan Anda perlu memastikan pengguna mengetahui bahwa tugas sedang diproses, baik dengan [menggunakan indikator kemajuan atau indikator aktivitas](https://www.google.com/design/spec/components/progress-activity.html). Setidak-tidaknya pendekatan ini akan membuat thread utama aplikasi Anda tetap bebas, sehingga membantunya tetap responsif terhadap interaksi pengguna.

## Kenali “frame tax” JavaScript Anda

Saat mengakses kerangka kerja, pustaka, atau kode Anda sendiri, kita perlu menilai besarnya biaya untuk menjalankan kode JavaScript bingkai-per-bingkai. Hal ini khususnya penting saat melakukan pekerjaan animasi yang sangat membutuhkan kinerja seperti transisi atau menggulir.

Cara terbaik untuk mengukur profil kinerja dan biaya JavaScript Anda adalah menggunakan Chrome DevTools. Biasanya Anda akan mendapatkan catatan yang kurang detail seperti ini:

<img src="images/optimize-javascript-execution/low-js-detail.jpg" alt="Timeline di Chrome DevTools menyediakan detail eksekusi JS yang rendah.">

Jika Anda merasa memiliki JavaScript yang berjalan lama, Anda bisa mengaktifkan profiler JavaScript di atas antarmuka pengguna DevTools:

<img src="images/optimize-javascript-execution/js-profiler-toggle.jpg" alt="Mengaktifkan profiler JS di DevTools.">

Ada overhead untuk membuat profil JavaScript dengan cara ini, jadi pastikan hanya mengaktifkannya bila Anda ingin lebih memahami karakteristik waktu proses JavaScript. Dengan kotak centang diaktifkan, Anda kini bisa melakukan tindakan yang sama dan akan mendapatkan informasi yang jauh lebih banyak mengenai fungsi apa saja yang dipanggil di JavaScript Anda:

<img src="images/optimize-javascript-execution/high-js-detail.jpg" alt="Timeline di Chrome DevTools menyediakan detail eksekusi JS yang tinggi.">

Berbekal informasi ini, Anda bisa mengakses dampak kinerja JavaScript pada aplikasi Anda, dan mulai menemukan serta memperbaiki hotspot di mana fungsi perlu waktu terlalu lama untuk dieksekusi. Sebagaimana disebutkan sebelumnya, Anda harus berusaha membuang JavaScript yang berjalan lama, atau, jika tidak memungkinkan, memindahkannya ke Web Worker sehingga membebaskan thread utama untuk melanjutkan tugas yang lain.

## Hindari optimalisasi mikro pada JavaScript Anda

Mungkin menyenangkan bila tahu bahwa browser bisa mengeksekusi satu versi sesuatu 100 kali lebih cepat dari versi yang lain, misalnya meminta `offsetTop` elemen lebih cepat daripada menghitung `getBoundingClientRect()`, namun kenyataannya, hampir selalu Anda hanya memanggil fungsi seperti ini sejarang mungkin per bingkai, jadi biasanya ini menyia-nyiakan upaya untuk memfokuskan pada aspek kinerja JavaScript. Biasanya Anda hanya akan menghemat sepersekian milidetik.

Jika Anda sedang membuat game, atau aplikasi yang mahal secara komputasi, maka mungkin Anda merupakan pengecualian dari arahan ini, karena biasanya Anda akan mengepaskan banyak komputasi ke dalam satu bingkai, dan jika demikian barulah hal ini berguna.

Singkat kata, Anda harus sangat berhati-hati dengan optimalisasi mikro karena biasanya itu tidak akan memetakan ke jenis aplikasi yang sedang Anda bangun.


{# wf_devsite_translation #}
