project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Sangat penting untuk memahami seperti apa aplikasi atau situs kita ketika memiliki konektivitas yang tidak dapat diandalkan. Berikut beberapa alat yang dapat membantu Anda.

{# wf_updated_on: 2016-10-16 #}
{# wf_published_on: 2016-05-09 #}

# Memahami bandwith yang rendah dan respons tinggi {: .page-title }

{% include "web/_shared/contributors/samdutton.html" %}

Sangat penting untuk memahami bagaimana rasanya aplikasi atau situs kita memiliki konektivitas yang tidak dapat diandalkan. Berikut beberapa alat yang dapat membantu Anda.

## Uji dengan bandwith yang rendah dan respons tinggi

<a href="http://adwords.blogspot.co.uk/2015/05/building-for-next-moment.html">Peningkatan proporsi</a> pengguna yang mengakses situs web berganti ke perangkat mobile. Walupun di rumah, <a href="https://www.washingtonpost.com/news/the-switch/wp/2016/04/18/new-data-americans-are-abandoning-wired-home-internet/">banyak orang meninggalkan layanan broadband untuk perangkat mobile</a>.

Dalam konteks ini, sangat penting untuk memahami seperti apa aplikasi atau situs kita ketika memiliki konektivitas yang tidak dapat diandalkan. Berikut beberapa alat yang dapat membantu Anda [meniru dan mensimulasikan](https://stackoverflow.com/questions/1584617/simulator-or-emulator-what-is-the-difference) bandwidth rendah dan [respons](https://www.igvita.com/2012/07/19/latency-the-new-web-performance-bottleneck/) tinggi.

### Simulasi network throttling

Ketika membangun atau memperbarui situs web, Anda harus memastikan kinerja yang memadai dalam berbagai kondisi konektivitas. Beberapa alat berikut dapat membantu

#### Alat peramban (browser)

[Chrome DevTools](/web/tools/chrome-devtools/profile/network-performance/network-conditions) memungkinkan anda untuk melakukan uji coba pada situs web dengan berbagai simulasi kecepatan proses unggah/unduh [round-trip times](https://www.igvita.com/2012/07/19/latency-the-new-web-performance-bottleneck/), menggunakan pengaturan kustom atau yang sudah tersedia melalui panel Chrome DevTools Network:

![Chrome DevTools throttling](images/chrome-devtools-throttling.png)

#### Alat sistem

Network Link Conditioner adalah panel preferensi yang tersedia pad Mac jika anda memasang [Hardware IO Tools](https://developer.apple.com/downloads/?q=Hardware%20IO%20Tools) untuk Xcode:

![Mac Network Link Conditioner control panel](images/network-link-conditioner-control-panel.png)

![Mac Network Link Conditioner settings](images/network-link-conditioner-settings.png)

![Mac Network Link Conditioner custom settings](images/network-link-conditioner-custom.png)

#### Emulasi perangkat

[Android Emulator](http://developer.android.com/tools/devices/emulator.html#netspeed) memungkinkan anda untuk melakukan simulasi pada berbagai macam kondisi jaringan saat menjalankan aplikasi (termasuk browser web dan aplikasi web hybrid) di Android:

![Android Emulator](images/android-emulator.png)

![Android Emulator settings](images/android-emulator-settings.png)

Untuk iPhone, Network Link Conditioner dapat digunakan untuk mensimulasikan kondisi jaringan yang terganggu (lihat di atas).

### Uji pada lokasi dan jaringan yang berbeda

Kinerja konektivitas tergantung pada lokasi server serta jenis jaringan.

[WebPagetest](https://webpagetest.org) adalah layanan online yang memungkinkan serangkaian tes kinerja yang akan dijalankan untuk situs Anda menggunakan berbagai jaringan dan lokasi server. Misalnya, Anda dapat mencoba situs Anda dari server di India pada jaringan 2G, atau melalui kabel dari sebuah kota di Amerika Serikat.

![WebPagetest settings](images/webpagetest.png)


Pilih lokasi dan, dari pengaturan lanjutan, pilih jenis koneksi. Anda bahkan dapat mengotomatisasi pengujian menggunakan [script](https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/scripting) (misalnya, untuk masuk ke sebuah situs) atau menggunakan [RESTful API](https://sites.google.com/a/webpagetest.org/docs/advanced-features/webpagetest-restful-apis) mereka. Hal ini membantu Anda untuk memasukkan pengujian konektivitas ke dalam proses logging.


[Fiddler](http://www.telerik.com/fiddler) mendukung proxy global melalui [GeoEdge](http://www.geoedge.com/faq), dan aturan khusus yang dapat digunakan untuk mensimulasikan kecepatan modem:

![Fiddler proxy](images/fiddler.png)

### Uji pada jaringan yang terganggu

Software dan hardware proxy memungkinkan Anda untuk meniru kondisi jaringan seluler bermasalah, seperti bandwidth throttling, delay, dan packet loss yang acak. Sebuah proxy bersama atau gangguan jaringan dapat memungkinkan sebuah tim pengembang untuk menggabungkan pengujian jaringan dunia nyata dalam alur kerja mereka.

Facebook's [Augmented Traffic Control](http://facebook.github.io/augmented-traffic-control/) (ATC) adalah aplikasi dengan lisensi BSD yang dapat digunakan untuk membentuk lalu lintas dan meniru kondisi jaringan yang terganggu:

![Facebook's Augmented Traffic Control](images/augmented-traffic-control.png)

> Acara yang diadakan Facebook [2G Tuesdays](https://code.facebook.com/posts/1556407321275493/building-for-emerging-markets-the-story-behind-2g-tuesdays/) membantu memahami bagaimana orang-orang yang berada dalam jaringan 2G menggunakan produk mereka. Pada hari Selasa, karyawan mendapatkan pop-up yang memberikan mereka pilihan untuk mensimulasikan koneksi 2G.

[Charles](https://www.charlesproxy.com/){: .external } HTTP/HTTPS proxy yang dapat digunakan untuk [mengatur bandwidth dan respons](http://www.charlesproxy.com/documentation/proxying/throttling/). Charles adalah aplikasi komersial, tapi versi free-trial tersedia.

![Charles proxy bandwidth and latency settings](images/charles.png)

Informasi lebih lanjut tentang Charles dapat dilihat di [codewithchris.com](http://codewithchris.com/tutorial-using-charles-proxy-with-your-ios-development-and-http-debugging/).

## Menangani konektivitas tidak dapat diandalkan dan "lie-fi"

### Apa itu lie-fi?

Istilah <a href="http://www.urbandictionary.com/define.php?term=lie-fi">lie-fi</a> muncul sekitar tahun 2008 (ketika ponsel tampak seperti <a href="https://www.mobilegazette.com/2008-phones-wallchart.htm" title="Images of phones from 2008">ini</a>). Browser anda seolah-olah memiliki konektivitas, tapi ternyata tidak.

Konektivitas yang disalahartikan dapat menimbulkan pengalaman buruk karena browser (atau JavaScript) berusaha untuk mengambil sumber daya ke situs web daripada berhenti. Lie-fi sebenarnya bisa lebih buruk daripada offline; setidaknya jika perangkat pasti offline JavaScript anda dapat mengambil tindakan yang tepat untuk mengatasinya.

Lie-fi kemungkinan akan menjadi masalah yang lebih besar karena lebih banyak orang pindah ke ponsel dan jauh dari fixed broadband. Baru-baru ini [Data Sensus Amerika Serikat terbaru](https://www.ntia.doc.gov/blog/2016/evolving-technologies-change-nature-internet-use) menunjukkan [pindah dari fixed broadband](https://www.washingtonpost.com/news/the-switch/wp/2016/04/18/new-data-americans-are-abandoning-wired-home-internet/). Grafik berikut menunjukkan penggunaan mobile internet di rumah pada 2015 dibandingkan dengan 2013:

<img src="images/home-broadband.png" class="center" alt="Chart from US census data showing the move to mobile away from fixed broadband, particularly in lower-income households">

### Gunakan timeout untuk menangani konektivitas yang terputus-putus

Sebelumnya, [metode Hacky menggunakan XHR](http://stackoverflow.com/questions/189430/detect-that-the-internet-connection-is-offline) telah digunakan untuk menguji konektivitas terputus, tapi service worker memungkinkan metode yang lebih dapat diandalkan untuk mengatur timeout pada jaringan. Jeff Posnick menjelaskan bagaimana untuk mencapai hal ini menggunakan timeout [sw-toolbox](https://github.com/GoogleChrome/sw-toolbox) dalam salah satu presentasinya [Instant Loading with Service Workers](https://youtu.be/jCKZDTtUA2A?t=19m58s):

    toolbox.router.get(
      '/path/to/image',
      toolbox.networkFirst,
      {networkTimeoutSeconds: 3}
    );    

Sebuah [pilihan timeout](https://github.com/whatwg/fetch/issues/20) juga direncanakan untuk [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch), dan [Streams API](https://www.w3.org/TR/streams-api/) sehingga dapat membantu dengan mengoptimalkan pengiriman konten. Jake Archibald memberikan rincian lebih lanjut tentang mengatasi lie-fi di [Supercharging page load](https://youtu.be/d5_6yHixpsQ?t=6m42s).

Translated By: 
{% include "web/_shared/contributors/mychaelgo.html" %}