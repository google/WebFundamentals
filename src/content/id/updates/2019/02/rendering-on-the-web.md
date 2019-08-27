project_path: "/web/_project.yaml"
book_path: "/web/updates/_book.yaml"

{# wf_updated_on: 2019-08-27 #} {# wf_published_on: 2019-02-06 #} {# wf_tags:
fundamentals, performance, app-shell #} {# wf_featured_image:
/web/updates/images/2019/02/rendering-on-the-web/icon.png #} {#
wf_featured_snippet: Where should we implement logic and rendering in our
applications? Should we use Server Side Rendering? What about Rehydration? Let's
find some answers! #} {# wf_blink_components: N/A #}

# Rendering di Web {: .page-title }

{% include "web/_shared/contributors/developit.html" %} {% include
"web/_shared/contributors/addyosmani.html" %}

Sebagai pengembang, kita sering dihadapkan dengan keputusan yang akan
memengaruhi seluruh arsitektur aplikasi kita. Salah satu keputusan inti yang
harus dibuat oleh pengembang web adalah di mana menerapkan logika dan render
dalam aplikasi mereka. Ini bisa sulit, karena ada sejumlah cara berbeda untuk
membangun situs web.

Pemahaman kami tentang ruang ini diinformasikan oleh pekerjaan kami di Chrome
yang berbicara dengan situs besar selama beberapa tahun terakhir. Secara umum,
kami akan mendorong pengembang untuk mempertimbangkan rendering server atau
rendering statis melalui pendekatan rehidrasi penuh.

Untuk lebih memahami arsitektur yang kita pilih ketika kita membuat keputusan
ini, kita perlu memiliki pemahaman yang kuat tentang setiap pendekatan dan
terminologi yang konsisten untuk digunakan ketika berbicara tentang mereka.
Perbedaan antara pendekatan ini membantu menggambarkan trade-off rendering di
web melalui lensa kinerja.

## Terminologi {: #terminology }

**Rendering**

- **SSR:** Server-Side Rendering - rendering aplikasi sisi-klien atau universal
ke HTML di server.
- **CSR:** Rendering Sisi Klien - render aplikasi dalam browser, umumnya
menggunakan DOM.
- **Rehidrasi:** "booting" tampilan JavaScript pada klien sehingga mereka
menggunakan kembali pohon DOM dan data HTML yang diberikan server.
- **Prapengurutan:** menjalankan aplikasi sisi klien pada waktu build untuk
menangkap status awalnya sebagai HTML statis.

**Performa**

- **TTFB:** Time to First Byte - dilihat sebagai waktu antara mengklik tautan
dan sedikit konten pertama yang masuk.
- **FP:** First Paint - pertama kali setiap pixel menjadi terlihat oleh
pengguna.
- **FCP:** Cat Konten Pertama - waktu ketika konten yang diminta (tubuh artikel,
dll) menjadi terlihat.
- **TTI:** Time To Interactive - waktu di mana halaman menjadi interaktif (acara
terhubung, dll).

## Rendering Server {: #server-rendering }

*Render server menghasilkan HTML lengkap untuk halaman di server sebagai respons
terhadap navigasi. Ini menghindari bolak-balik tambahan untuk pengambilan data
dan templating pada klien, karena itu ditangani sebelum browser mendapat
respons.*

Server rendering umumnya menghasilkan [First
Paint](https://developers.google.com/web/fundamentals/performance/user-centric-performance-metrics#first_paint_and_first_contentful_paint)
(FP) dan [First Contentful
Paint](https://developers.google.com/web/fundamentals/performance/user-centric-performance-metrics#first_paint_and_first_contentful_paint)
(FCP) yang cepat. Menjalankan logika halaman dan rendering pada server
memungkinkan untuk menghindari pengiriman banyak JavaScript ke klien, yang
membantu mencapai [Time to
Interactive](https://developers.google.com/web/tools/lighthouse/audits/time-to-interactive)
(TTI) yang cepat. Ini masuk akal, karena dengan rendering server Anda
benar-benar hanya mengirim teks dan tautan ke browser pengguna. Pendekatan ini
dapat bekerja dengan baik untuk spektrum besar perangkat dan kondisi jaringan,
dan membuka optimasi browser yang menarik seperti penguraian dokumen streaming.

<img src="../../images/2019/02/rendering-on-the-web/server-rendering-tti.png"
alt="Diagram showing server rendering and JS execution affecting FCP and TTI"
width="350">

Dengan rendering server, pengguna tidak mungkin dibiarkan menunggu JavaScript
yang terikat CPU untuk diproses sebelum mereka dapat menggunakan situs Anda.
Bahkan ketika [JS pihak
ketiga](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/loading-third-party-javascript/)
tidak dapat dihindari, menggunakan rendering server untuk mengurangi [biaya
JS](https://medium.com/@addyosmani/the-cost-of-javascript-in-2018-7d8950fbb5d4)
pihak pertama Anda sendiri dapat memberi Anda lebih banyak "
[anggaran](https://medium.com/@addyosmani/start-performance-budgeting-dabde04cf6a3)
" untuk sisanya. Namun, ada satu kelemahan utama untuk pendekatan ini: membuat
halaman di server membutuhkan waktu, yang sering kali dapat menyebabkan [Time to
First Byte](https://en.wikipedia.org/wiki/Time_to_first_byte) (TTFB) lebih
lambat.

Apakah rendering server cukup untuk aplikasi Anda sebagian besar tergantung pada
jenis pengalaman apa yang Anda bangun. Ada perdebatan lama tentang aplikasi
rendering server yang benar versus rendering sisi klien, tetapi penting untuk
diingat bahwa Anda dapat memilih untuk menggunakan rendering server untuk
beberapa halaman dan bukan yang lain. Beberapa situs telah mengadopsi teknik
rendering hibrida dengan sukses.
[Netflix](https://medium.com/dev-channel/a-netflix-web-performance-case-study-c0bcde26a9d9)
server merender halaman arahan relatif statis, sementara
[prefetching](https://dev.to/addyosmani/speed-up-next-page-navigations-with-prefetching-4285)
JS untuk halaman interaksi-berat, memberikan halaman-halaman client-diberikan
lebih berat kesempatan yang lebih baik pembebanan cepat.

Banyak kerangka kerja modern, perpustakaan, dan arsitektur memungkinkan untuk
merender aplikasi yang sama pada klien dan server. Teknik-teknik ini dapat
digunakan untuk Server Rendering, namun penting untuk dicatat bahwa arsitektur
di mana rendering terjadi baik pada server ***dan*** pada klien adalah kelas
solusi mereka sendiri dengan karakteristik kinerja dan pengorbanan yang sangat
berbeda. Bereaksi pengguna dapat menggunakan [renderToString
()](https://reactjs.org/docs/react-dom-server.html) atau solusi yang dibangun di
atasnya seperti [Next.js](https://nextjs.org) untuk rendering server. Pengguna
Vue dapat melihat [panduan render server](https://ssr.vuejs.org) Vue atau
[Nuxt](https://nuxtjs.org) . Angular memiliki
[Universal](https://angular.io/guide/universal) . Sebagian besar solusi populer
menggunakan beberapa bentuk hidrasi, jadi waspadai pendekatan yang digunakan
sebelum memilih alat.

## Rendering statis {: #static-rendering }

[Render statis](https://frontarm.com/articles/static-vs-server-rendering/)
terjadi saat build-time dan menawarkan Paint Pertama yang cepat, Paint Pertama
yang Puas dan Waktu Untuk Interaktif - dengan asumsi jumlah JS sisi klien
terbatas. Tidak seperti Server Rendering, ia juga mengelola untuk mencapai Time
To First Byte yang cepat dan konsisten, karena HTML untuk sebuah halaman tidak
harus dibuat dengan cepat. Secara umum, rendering statis berarti menghasilkan
file HTML terpisah untuk setiap URL sebelumnya. Dengan respons HTML yang
dihasilkan di muka, perender statis dapat digunakan ke beberapa CDN untuk
memanfaatkan caching tepi.

<img src="../../images/2019/02/rendering-on-the-web/static-rendering-tti.png"
alt="Diagram showing static rendering and optional JS execution affecting FCP
and TTI" width="280">

Solusi untuk perenderan statis tersedia dalam berbagai bentuk dan ukuran. Alat
seperti [Gatsby](https://www.gatsbyjs.org) dirancang untuk membuat pengembang
merasa aplikasi mereka dirender secara dinamis alih-alih dihasilkan sebagai
langkah build. Yang lain seperti [Jekyl](https://jekyllrb.com) dan
[Metalsmith](https://metalsmith.io) merangkul sifat statis mereka, memberikan
pendekatan yang lebih berbasis template.

Salah satu kelemahan dari rendering statis adalah bahwa file HTML individual
harus dihasilkan untuk setiap URL yang mungkin. Ini bisa jadi menantang atau
bahkan tidak mungkin dilakukan ketika Anda tidak dapat memprediksi apa URL-URL
itu sebelumnya, atau untuk situs-situs dengan banyak halaman unik.

Bereaksi pengguna mungkin akrab dengan [ekspor
statis](https://nextjs.org/learn/excel/static-html-export/)
[Gatsby](https://www.gatsbyjs.org) ,
[Next.js](https://nextjs.org/learn/excel/static-html-export/) atau
[Navi](https://frontarm.com/navi/) - semua ini memudahkan penulis menggunakan
komponen. Namun, penting untuk memahami perbedaan antara perenderan statis dan
prapenguraian: halaman yang dirender statis bersifat interaktif tanpa perlu
mengeksekusi banyak JS sisi klien, sedangkan prapenguraian meningkatkan Cat
Pertama atau Cat Isi Pertama dari Aplikasi Halaman Tunggal yang harus di-boot
klien agar halaman menjadi benar-benar interaktif.

Jika Anda tidak yakin apakah solusi yang diberikan adalah rendering statis atau
prapengiriman, coba tes ini: nonaktifkan JavaScript dan muat halaman web yang
dibuat. Untuk halaman yang diberikan secara statis, sebagian besar
fungsionalitas akan tetap ada tanpa JavaScript diaktifkan. Untuk halaman yang
dipra-prerender, mungkin masih ada beberapa fungsionalitas dasar seperti tautan,
tetapi sebagian besar halaman akan menjadi inert.

Tes lain yang bermanfaat adalah memperlambat jaringan Anda menggunakan Chrome
DevTools, dan mengamati berapa banyak JavaScript yang telah diunduh sebelum
halaman menjadi interaktif. Pra-perenderan umumnya membutuhkan lebih banyak
JavaScript untuk menjadi interaktif, dan bahwa JavaScript cenderung lebih
kompleks daripada pendekatan [Progressive Enhancement
yang](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement)
digunakan oleh rendering statis.

## Rendering Server vs Rendering Statis {: #server-vs-static }

Server rendering bukan peluru perak - sifatnya yang dinamis dapat datang dengan
biaya [overhead komputasi yang
signifikan](https://medium.com/airbnb-engineering/operationalizing-node-js-for-server-side-rendering-c5ba718acfc9)
. Banyak solusi rendering server tidak dapat disiram lebih awal, dapat menunda
TTFB atau menggandakan data yang dikirim (misalnya status inline yang digunakan
oleh JS pada klien). Di Bereaksi, renderToString () bisa lambat karena sinkron
dan berulir tunggal. Mendapatkan rendering server "benar" dapat melibatkan
menemukan atau membangun solusi untuk [caching
komponen](https://medium.com/@reactcomponentcaching/speedier-server-side-rendering-in-react-16-with-component-caching-e8aa677929b1)
, mengelola konsumsi memori, menerapkan teknik
[memoisasi](https://speakerdeck.com/maxnajim/hastening-react-ssr-with-component-memoization-and-templatization)
, dan banyak masalah lainnya. Anda biasanya memproses / membangun kembali
aplikasi yang sama beberapa kali - satu kali pada klien dan satu kali di server.
Hanya karena rendering server dapat membuat sesuatu muncul lebih cepat tidak
tiba-tiba berarti Anda memiliki lebih sedikit pekerjaan yang harus dilakukan.

Server rendering menghasilkan HTML sesuai permintaan untuk setiap URL tetapi
bisa lebih lambat dari sekadar menyajikan konten yang diberikan secara statis.
Jika Anda dapat menambahkan leg-work tambahan, rendering server + [caching
HTML](https://freecontent.manning.com/caching-in-react/) dapat secara
besar-besaran mengurangi waktu render server. Keuntungan rendering server adalah
kemampuan untuk menarik lebih banyak data "langsung" dan menanggapi set
permintaan yang lebih lengkap daripada yang dimungkinkan dengan rendering
statis. Halaman yang membutuhkan personalisasi adalah contoh konkret dari jenis
permintaan yang tidak akan berfungsi dengan baik dengan perenderan statis.

Server rendering juga dapat menyajikan keputusan menarik saat membangun
[PWA](https://developers.google.com/web/progressive-web-apps/) . Apakah lebih
baik menggunakan caching [pekerja layanan
satu](https://developers.google.com/web/fundamentals/primers/service-workers/)
halaman penuh, atau hanya konten individual yang diberikan server?

## Rendering Sisi Klien (CSR) {: #csr }

*Rendering sisi klien (CSR) berarti merender halaman secara langsung di browser
menggunakan JavaScript. Semua logika, pengambilan data, templating, dan routing
ditangani pada klien daripada server.*

Render sisi klien bisa sulit untuk mendapatkan dan tetap cepat untuk seluler.
Itu dapat mendekati kinerja rendering server murni jika melakukan pekerjaan
minimal, menjaga [anggaran JavaScript
ketat](https://mobile.twitter.com/HenrikJoreteg/status/1039744716210950144) dan
memberikan nilai dalam
[RTT](https://en.wikipedia.org/wiki/Round-trip_delay_time) sesedikit mungkin.
Skrip dan data kritis dapat dikirim lebih cepat menggunakan [HTTP / 2 Server
Push](https://www.smashingmagazine.com/2017/04/guide-http2-server-push/) atau
`<link rel=preload>` , yang membuat parser bekerja lebih cepat untuk Anda. Pola
seperti
[PRPL](https://developers.google.com/web/fundamentals/performance/prpl-pattern/)
layak dievaluasi untuk memastikan navigasi awal dan selanjutnya terasa instan.

<img src="../../images/2019/02/rendering-on-the-web/client-rendering-tti.png"
alt="Diagram showing client-side rendering affecting FCP and TTI" width="500">

Kelemahan utama dari Rendering Sisi Klien adalah bahwa jumlah JavaScript yang
diperlukan cenderung bertambah saat aplikasi bertambah. Ini menjadi sangat sulit
dengan penambahan pustaka JavaScript baru, polyfill, dan kode pihak ketiga, yang
bersaing untuk mendapatkan kekuatan pemrosesan dan harus sering diproses sebelum
konten halaman dapat dirender. Pengalaman yang dibangun dengan CSR yang
mengandalkan bundel JavaScript besar harus mempertimbangkan [pemisahan kode yang
agresif](https://developers.google.com/web/fundamentals/performance/optimizing-javascript/code-splitting/)
, dan pastikan untuk memuat JavaScript yang malas - "hanya melayani apa yang
Anda butuhkan, saat Anda membutuhkannya". Untuk pengalaman dengan sedikit atau
tanpa interaktivitas, rendering server dapat mewakili solusi yang lebih skalabel
untuk masalah ini.

Untuk orang-orang yang membangun Aplikasi Halaman Tunggal, mengidentifikasi
bagian inti dari Antarmuka Pengguna yang dibagikan oleh sebagian besar halaman
berarti Anda dapat menerapkan teknik [caching Shell
Aplikasi](https://developers.google.com/web/updates/2015/11/app-shell) .
Dikombinasikan dengan pekerja layanan, ini dapat secara dramatis meningkatkan
kinerja yang dirasakan pada kunjungan berulang.

## Menggabungkan rendering server dan CSR melalui rehidrasi {: #rehydration }

Sering disebut sebagai Universal Rendering atau sekadar "SSR", pendekatan ini
berupaya untuk memperlancar pertukaran antara Client-Side Rendering dan Server
Rendering dengan melakukan keduanya. Permintaan navigasi seperti pemuatan
halaman penuh atau pemuatan ulang ditangani oleh server yang membuat aplikasi ke
HTML, maka JavaScript dan data yang digunakan untuk rendering dimasukkan ke
dalam dokumen yang dihasilkan. Ketika diimplementasikan dengan hati-hati, ini
mencapai Paint Contentful Pertama cepat seperti Server Rendering, kemudian
"mengambil" dengan rendering lagi pada klien menggunakan teknik yang disebut
[(kembali)
hidrasi](https://docs.electrode.io/guides/general/server-side-data-hydration) .
Ini adalah solusi baru, tetapi dapat memiliki beberapa kelemahan kinerja yang
cukup besar.

Kelemahan utama SSR dengan rehidrasi adalah bahwa ia dapat memiliki dampak
negatif yang signifikan pada Time To Interactive, bahkan jika itu meningkatkan
First Paint. Halaman SSR akan sering terlihat penuh tipuan dan interaktif,
tetapi tidak dapat benar-benar menanggapi input sampai JS sisi klien dijalankan
dan event handler telah dilampirkan. Ini dapat berlangsung beberapa detik atau
bahkan beberapa menit di ponsel.

Mungkin Anda pernah mengalaminya sendiri - untuk jangka waktu tertentu setelah
sepertinya halaman telah dimuat, mengklik atau mengetuk tidak akan menghasilkan
apa-apa. Ini dengan cepat menjadi frustasi ... *"Mengapa tidak ada yang terjadi?
Mengapa saya tidak bisa menggulir? "*

### Masalah Rehidrasi: Satu Aplikasi untuk Harga Dua {: #rehydration-issues }

Masalah rehidrasi seringkali lebih buruk daripada interaktivitas yang tertunda
karena JS. Agar JavaScript sisi klien dapat "mengambil" dengan akurat di mana
server tinggalkan tanpa harus meminta kembali semua data yang digunakan server
untuk membuat HTML-nya, solusi SSR saat ini umumnya membuat cerita bersambung
respon dari UI. ketergantungan data ke dalam dokumen sebagai tag skrip. Dokumen
HTML yang dihasilkan berisi duplikasi tingkat tinggi:

<img src="../../images/2019/02/rendering-on-the-web/html.png" alt="HTML document
containing serialized UI, inlined data and a bundle.js script">

Seperti yang Anda lihat, server mengembalikan deskripsi UI aplikasi dalam
menanggapi permintaan navigasi, tetapi juga mengembalikan data sumber yang
digunakan untuk menulis UI itu, dan salinan lengkap implementasi UI yang
kemudian dijalankan pada klien . Hanya setelah bundle.js selesai memuat dan
mengeksekusi, UI ini menjadi interaktif.

Metrik kinerja yang dikumpulkan dari situs web nyata menggunakan rehidrasi SSR
menunjukkan penggunaannya harus sangat tidak dianjurkan. Pada akhirnya,
alasannya adalah Pengalaman Pengguna: sangat mudah untuk meninggalkan pengguna
di “lembah yang tidak biasa”.

<img src="../../images/2019/02/rendering-on-the-web/rehydration-tti.png"
alt="Diagram showing client rendering negatively affecting TTI" width="600">

Ada harapan untuk RSK dengan rehidrasi. Dalam jangka pendek, hanya menggunakan
SSR untuk konten yang sangat dapat disimpan dalam cache dapat mengurangi
penundaan TTFB, menghasilkan hasil yang mirip dengan prapengurutan. Rehidrasi
[secara
bertahap](https://www.emberjs.com/blog/2017/10/10/glimmer-progress-report.html)
, progresif, atau sebagian mungkin merupakan kunci untuk membuat teknik ini
lebih layak di masa depan.

## Render server streaming dan Rehidrasi Progresif {: #progressive-rehydration }

Server rendering telah mengalami sejumlah perkembangan selama beberapa tahun
terakhir.

[Streaming server
rendering](https://zeit.co/blog/streaming-server-rendering-at-spectrum)
memungkinkan Anda untuk mengirim HTML dalam potongan-potongan yang browser dapat
secara progresif merender setelah diterima. Ini dapat memberikan Paint Pertama
yang cepat dan Paint Contentful Pertama karena markup tiba lebih cepat bagi
pengguna. Di Bereaksi, aliran menjadi tidak sinkron di [renderToNodeStream
()](https://reactjs.org/docs/react-dom-server.html#rendertonodestream) -
dibandingkan dengan renderToString sinkron - berarti tekanan balik ditangani
dengan baik.

Rehidrasi progresif juga patut diperhatikan, dan sesuatu yang Bereaksi telah
[jelajahi](https://github.com/facebook/react/pull/14717) . Dengan pendekatan
ini, masing-masing bagian dari aplikasi yang diberikan server "di-boot" dari
waktu ke waktu, daripada pendekatan umum saat ini untuk menginisialisasi seluruh
aplikasi sekaligus. Ini dapat membantu mengurangi jumlah JavaScript yang
diperlukan untuk membuat halaman menjadi interaktif, karena peningkatan sisi
klien dari bagian-bagian dengan prioritas rendah pada halaman dapat ditunda
untuk mencegah pemblokiran utas utama. Hal ini juga dapat membantu menghindari
salah satu perangkap Rehidrasi SSR yang paling umum, di mana pohon DOM yang
diberikan server dihancurkan dan kemudian segera dibangun kembali - paling
sering karena pihak sisi klien sinkron awal memerlukan data yang tidak cukup
siap, mungkin menunggu Janji resolusi.

### Rehidrasi Parsial {: #partial-rehydration }

Rehidrasi parsial terbukti sulit dilaksanakan. Pendekatan ini merupakan
perpanjangan dari gagasan rehidrasi progresif, di mana potongan-potongan
individu (komponen / pandangan / pohon) yang akan direhidrasi secara progresif
dianalisis dan yang dengan sedikit interaktivitas atau tanpa reaktivitas
diidentifikasi. Untuk masing-masing bagian yang sebagian besar statis ini, kode
JavaScript yang sesuai kemudian diubah menjadi referensi inert dan fungsi
dekoratif, mengurangi jejak sisi klien menjadi hampir nol. Pendekatan hidrasi
parsial datang dengan masalah dan kompromi sendiri. Ini menimbulkan beberapa
tantangan menarik untuk caching, dan navigasi sisi klien berarti kami tidak
dapat menganggap HTML yang diberikan server untuk bagian inert dari aplikasi
akan tersedia tanpa memuat halaman penuh.

### Rendering Trisomorphic {: #trisomorphic }

Jika [pekerja
layanan](https://developers.google.com/web/fundamentals/primers/service-workers/)
merupakan pilihan bagi Anda, render “trisomorphic” mungkin juga menarik. Ini
adalah teknik di mana Anda dapat menggunakan rendering server streaming untuk
navigasi awal / non-JS, dan kemudian meminta pekerja layanan Anda mengambil
rendering HTML untuk navigasi setelah diinstal. Ini dapat membuat komponen dan
templat yang di-cache tetap terbaru dan memungkinkan navigasi bergaya SPA untuk
menampilkan tampilan baru di sesi yang sama. Pendekatan ini bekerja paling baik
ketika Anda dapat berbagi templating dan kode routing yang sama antara server,
halaman klien, dan pekerja layanan.

<img src="../../images/2019/02/rendering-on-the-web/trisomorphic.png"
alt="Diagram of Trisomorphic rendering, showing a browser and service worker
communicating with the server">

## Pertimbangan SEO {: #seo }

Tim sering kali mempertimbangkan dampak SEO ketika memilih strategi untuk
rendering di web. Render server sering dipilih untuk memberikan pengalaman yang
"tampak lengkap" yang dapat ditafsirkan oleh penjelajah dengan mudah. Crawler
[dapat memahami JavaScript](https://web.dev/discoverable/how-search-works) ,
tetapi sering kali ada [batasan yang](/search/docs/guides/rendering) perlu
diperhatikan dalam cara mereka membuat
[JavaScript](https://web.dev/discoverable/how-search-works) . Render sisi klien
dapat bekerja tetapi seringkali tidak tanpa pengujian tambahan dan leg-work.
Baru-baru ini [rendering dinamis](/search/docs/guides/dynamic-rendering) juga
menjadi opsi yang layak dipertimbangkan jika arsitektur Anda banyak didorong
oleh JavaScript sisi klien.

Jika ragu, alat [Uji Ponsel
Ramah](https://search.google.com/test/mobile-friendly) sangat berharga untuk
menguji bahwa pendekatan yang Anda pilih melakukan apa yang Anda harapkan. Ini
menunjukkan pratinjau visual tentang bagaimana setiap halaman muncul pada
perayap Google, konten HTML serial ditemukan (setelah JavaScript dieksekusi),
dan setiap kesalahan yang ditemukan selama rendering.

<img src="../../images/2019/02/rendering-on-the-web/mobile-friendly-test.png"
alt="Screenshot of the Mobile Friendly Test UI">

## Membungkus ... {: #wrapup }

Saat memutuskan pendekatan untuk merender, mengukur dan memahami apa yang
menjadi hambatan Anda. Pertimbangkan apakah rendering statis atau rendering
server dapat membantu Anda mencapai 90%. Sangat oke untuk mengirim HTML dengan
JS minimal untuk mendapatkan pengalaman interaktif. Berikut ini adalah
infografis praktis yang menunjukkan spektrum server-klien:

<img src="../../images/2019/02/rendering-on-the-web/infographic.png"
alt="Infographic showing the spectrum of options described in this article">

## Kredit {: #credits }

Terima kasih kepada semua orang untuk ulasan dan inspirasi mereka:

Jeffrey Posnick, Houssein Djirdeh, Shubhie Panicker, Chris Harrelson, dan
Sebastian Markbåge

<div class="clearfix"></div>

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
