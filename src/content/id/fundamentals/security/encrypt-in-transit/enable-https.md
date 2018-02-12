project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Mengaktifkan HTTPS di server Anda sangatlah penting untuk mengamankan laman web.

{# wf_updated_on: 2018-02-12 #}
{# wf_published_on: 2015-03-27 #}

# Mengaktifkan HTTPS di Server Anda {: .page-title }

{% include "web/_shared/contributors/chrispalmer.html" %}
{% include "web/_shared/contributors/mattgaunt.html" %}

### TL;DR {: .hide-from-toc }

* Buat sebuah pasangan kunci privat/publik RSA 2048-bit.
* Buat permintaan penandatanganan sertifikat (CSR) yang akan menyematkan kunci publik Anda.
* Bagikan CSR Anda bersama Otoritas Sertifikat (CA) untuk menerima sertifikat final atau rantai sertifikat.
* Pasang sertifikat final Anda di tempat yang bisa diakses selain web misalnya `/etc/ssl` (Linux dan Unix) atau di mana saja yang diperlukan oleh IIS (Windows).

## Membuat kunci dan permintaan penandatanganan sertifikat

Bagian ini menggunakan program baris perintah openssl, yang umumnya disertakan
bersama sistem Linux, BSD, dan Mac OS X, untuk membuat kunci privat/publik dan CSR.


### Membuat sepasang kunci privat/publik

Mari kita mulai dengan membuat sepasang kunci RSA 2.048-bit. Kunci yang lebih kecil, misalnya
1.024 bit, tidak cukup resistan terhadap serangan tebakan brutal-paksa. Kunci
yang lebih besar, misalnya 4.096 bit, terlalu berlebihan. Lama-kelamaan, ukuran kunci meningkat karena
pemrosesan komputer semakin murah. 2.048 saat ini sudah pas.

Perintah untuk membuat pasangan kunci RSA adalah:

    openssl genrsa -out www.example.com.key 2048

Ini akan memberikan keluaran berikut:

    Generating RSA private key, 2048 bit long modulus
    .+++
    .......................................................................................+++
    e is 65537 (0x10001)

### Membuat permintaan penandatanganan sertifikat

Dalam langkah ini, Anda menyematkan kunci publik dan informasi tentang organisasi
serta situs web Anda ke dalam permintaan penandatanganan sertifikat atau CSR. Perintah *openssl*
secara interaktif akan meminta metadata yang diperlukan kepada Anda.

Dengan menjalankan perintah berikut:

    openssl req -new -sha256 -key www.example.com.key -out www.example.com.csr

Keluarannya adalah seperti berikut:

    You are about to be asked to enter information that will be incorporated
    into your certificate request

    What you are about to enter is what is called a Distinguished Name or a DN.
    There are quite a few fields but you can leave some blank
    For some fields there will be a default value,
    If you enter '.', the field will be left blank.
    -----
    Country Name (2 letter code) [AU]:CA
    State or Province Name (full name) [Some-State]:California
    Locality Name (for example, city) []:Mountain View
    Organization Name (for example, company) [Internet Widgits Pty Ltd]:Example, Inc.
    Organizational Unit Name (for example, section) []:Webmaster Help Center Example
    Team
    Common Name (e.g. server FQDN or YOUR name) []:www.example.com
    Email Address []:webmaster@example.com

    Please enter the following 'extra' attributes
    to be sent with your certificate request
    A challenge password []:
    An optional company name []:

Untuk memastikan validitas CSR, jalankan perintah ini:

    openssl req -text -in www.example.com.csr -noout

Dan responsnya akan terlihat seperti ini:

    Certificate Request:
        Data:
            Version: 0 (0x0)
            Subject: C=CA, ST=California, L=Mountain View, O=Google, Inc.,
    OU=Webmaster Help Center Example Team,
    CN=www.example.com/emailAddress=webmaster@example.com
            Subject Public Key Info:
                Public Key Algorithm: rsaEncryption
                    Public-Key: (2048 bit)
                    Modulus:
                        00:ad:fc:58:e0:da:f2:0b:73:51:93:29:a5:d3:9e:
                        f8:f1:14:13:64:cc:e0:bc:be:26:5d:04:e1:58:dc:
                        ...
                    Exponent: 65537 (0x10001)
            Attributes:
                a0:00
        Signature Algorithm: sha256WithRSAEncryption
             5f:05:f3:71:d5:f7:b7:b6:dc:17:cc:88:03:b8:87:29:f6:87:
             2f:7f:00:49:08:0a:20:41:0b:70:03:04:7d:94:af:69:3d:f4:
             ...

### Mengirimkan CSR Anda ke otoritas sertifikat

Otoritas sertifikat (CA) yang berbeda memerlukan metode berbeda untuk mengirim
CSR Anda ke sana. Metode dapat meliputi penggunaan formulir di situs web mereka, pengiriman
CSR melalui email, atau cara lainnya. Beberapa CA (atau reseller-nya) bahkan dapat mengotomatiskan
sebagian atau semua proses ini (termasuk, dalam beberapa kasus, pasangan kunci
dan pembuatan CSR).

Kirimkan CA Anda ke CSR, dan ikuti petunjuknya untuk menerima sertifikat final
atau rantai sertifikat Anda.

CA berbeda mengenakan biaya berbeda untuk layanan penjaminan
kunci publik Anda.

Ada juga opsi untuk memetakan kunci Anda ke lebih dari satu nama DNS, termasuk
sejumlah nama berbeda (mis. semua example.com, www.example.com, example.net,
dan www.example.net) atau nama "karakter pengganti" seperti \*.example.com.

Misalnya, satu CA saat ini menawarkan harga:

* Standar: $16/tahun, berlaku untuk example.com dan www.example.com.
* Karakter pengganti: $150/tahun, berlaku untuk example.com dan \*.example.com.

Dengan harga ini, sertifikat karakter pengganti akan ekonomis bila Anda memiliki lebih dari 9
subdomain; atau, Anda bisa membeli hanya satu atau beberapa sertifikat nama tunggal. (Jika
Anda memiliki lebih dari lima subdomain, misalnya, Anda mungkin akan merasa sertifikat karakter pengganti
lebih praktis bila Anda akan mengaktifkan HTTPS di server.)

Note: Ingatlah bahwa di sertifikat karakter pengganti, karakter pengganti hanya diterapkan pada satu label DNS. Sertifikat yang baik untuk \*.example.com akan cocok untuk foo.example.com dan bar.example.com, namun _tidak_ untuk foo.bar.example.com.

Salin sertifikat ke semua server front-end Anda di tempat yang bisa diakses selain web
misalnya `/etc/ssl` (Linux dan Unix) atau di mana saja yang diperlukan oleh IIS (Windows).

## Mengaktifkan HTTPS di server Anda

Mengaktifkan HTTPS di server merupakan langkah sangat penting dalam memberikan keamanan bagi laman web Anda.

* Gunakan alat (bantu) Server Configuration dari Mozilla untuk menyiapkan server bagi dukungan HTTPS.
* Ujilah situs secara teratur dengan SSL Server Test yang praktis dari Qualys dan pastikan setidaknya Anda mendapat nilai A atau A+.

Di poin ini, keputusan operasi yang sangat penting harus diambil. Pilih salah satu dari berikut ini:

* Khususkan alamat IP berbeda ke setiap hostname yang digunakan server web Anda
  untuk menyajikan materi.
* Gunakan hosting virtual berbasis nama.

Jika Anda menggunakan alamat IP berbeda untuk setiap hostname, Anda bisa
dengan mudah mendukung HTTP maupun HTTPS bagi semua klien.

Akan tetapi, kebanyakan operator situs menggunakan hosting maya berbasis nama untuk melindungi
alamat IP dan karena lebih praktis secara umum. Masalah pada IE di
Windows XP dan Android sebelum versi 2.3 adalah karena tidak memahami [Server
Name Indication](https://en.wikipedia.org/wiki/Server_Name_Indication){: .external} (SNI),
yang sangat penting bagi hosting virtual berbasis nama HTTPS.

Suatu hari — mudah-mudahan secepatnya — klien yang tidak mendukung SNI akan diganti
dengan perangkat lunak modern. Pantau string agen-pengguna di log permintaan untuk mengetahui
bila populasi pengguna sudah cukup banyak yang bermigrasi ke perangkat lunak modern. (Anda bisa
memutuskan berapa nilai ambang; mungkin &lt; 5%, atau &lt; 1%.)

Jika belum memiliki layanan HTTPS yang tersedia di server Anda, aktifkanlah sekarang
(tanpa pengalihan HTTP ke HTTPS; lihat di bawah ini). Konfigurasilah server web untuk menggunakan
sertifikat yang telah dibeli dan dipasang. Mungkin [pembuat
konfigurasi
praktis di Mozilla](https://mozilla.github.io/server-side-tls/ssl-config-generator/){: .external}
bisa membantu.

Jika memiliki banyak hostname/subdomain, maka masing-masing perlu menggunakan
sertifikat yang tepat.

Caution: Jika Anda sudah menyelesaikan langkah-langkah ini, namun menggunakan HTTPS hanya untuk keperluan mengalihkan klien kembali ke HTTP, sekarang hentikanlah. Lihat bagian berikutnya untuk memastikan HTTPS dan HTTP bekerja dengan mulus.

Note: Akhirnya permintaan HTTP harus dialihkan ke HTTPS dan gunakan HTTP Strict Transport Security (HSTS). Akan tetapi, ini bukan tahapan yang tepat untuk melakukannya dalam proses migrasi; lihat “Alihkan HTTP ke HTTPS” dan “Aktifkan Strict Transport Security dan Cookie Aman”.

Sekarang, dan sepanjang masa pakai situs Anda, periksa konfigurasi HTTPS dengan
[SSL Server Test yang praktis dari Qualys](https://www.ssllabs.com/ssltest/){: .external }. Situs Anda
seharusnya mendapatkan skor A atau A+; anggaplah semua yang menyebabkan nilai lebih rendah sebagai bug.
(sekarang A besok adalah B, karena serangan terhadap algoritme dan protokol
selalu diperbaiki!)

## Membuat relatif URL intrasitus

Karena sekarang Anda melayani situs di HTTP maupun HTTPS, segala sesuatunya
perlu bekerja semulus mungkin, apa pun protokolnya. Sebuah faktor penting adalah menggunakan
URL relatif untuk tautan intrasitus.

Pastikan URL intrasitus dan URL eksternal bersifat agnostik terhadap protokol; yakni, pastikan Anda menggunakan jalur relatif atau biarkan protokol seperti `//example.com/something.js`.

Masalah timbul bila Anda menyajikan laman lewat HTTPS yang menyertakan sumber daya HTTP,
yang dikenal dengan [materi campuran](/web/fundamentals/security/prevent-mixed-content/what-is-mixed-content). Browser memperingatkan pengguna bahwa kekuatan penuh HTTPS telah hilang. Sebenarnya, dalam hal materi campuran aktif (skrip, plug-in, CSS, iframe), sering kali browser cuma tidak mau memuat atau mengeksekusi materi sama sekali, yang mengakibatkan laman terputus.

Note: Boleh saja menyertakan sumber daya HTTPS di laman HTTP.

Selain itu, bila Anda menautkan ke laman lain di situs Anda, pengguna bisa mengalami
penurunan versi dari HTTPS menjadi HTTP.

Masalah-masalah ini terjadi bila laman Anda berisi URL intrasitus yang benar-benar memenuhi syarat,
yang menggunakan skema *http://*.

<p><span class="compare-worse">Tidak disarankan</span> — Kami tidak menyarankan Anda menggunakan URL intrasitus yang sepenuhnya memenuhi syarat.</p>

    <h1>Welcome To Example.com</h1>
    <script src="http://example.com/jquery.js"></script>
    <link rel="stylesheet" href="http://assets.example.com/style.css"/>
    <img src="http://img.example.com/logo.png"/>;
    <p>Read this nice <a href="http://example.com/2014/12/24/">new
    post on cats!</a></p>
    <p>Check out this <a href="http://foo.com/">other cool
    site.</a></p>

Dengan kata lain, buatlah URL intrasitus serelatif mungkin: baik berupa protokol-relatif (tidak memiliki protokol, dimulai dengan `//example.com`) maupun host-relatif (dimulai dengan jalur saja, seperti `/jquery.js`).

<p><span class="compare-better">Disarankan</span> — Kami menyarankan Anda menggunakan URL intrasitus yang protokol-relatif.</p>

    <h1>Welcome To Example.com</h1>
    <script src="//example.com/jquery.js"></script>
    <link rel="stylesheet" href="//assets.example.com/style.css"/>
    <img src="//img.example.com/logo.png"/>;
    <p>Read this nice <a href="//example.com/2014/12/24/">new
    post on cats!</a></p>
    <p>Check out this <a href="http://foo.com/">other cool
    site.</a></p>

<p><span class="compare-better">Disarankan</span> — Kami menyarankan Anda menggunakan URL intrasitus relatif.</p>

    <h1>Welcome To Example.com</h1>
    <script src="/jquery.js"></script>
    <link rel="stylesheet" href="//assets.example.com/style.css"/>
    <img src="//img.example.com/logo.png"/>;
    <p>Read this nice <a href="/2014/12/24/">new
    post on cats!</a></p>
    <p>Check out this <a href="http://foo.com/">other cool
    site.</a></p>

Lakukan proses ini dengan skrip, bukan dengan cara manual. Jika materi situs Anda ada dalam database,
uji skrip di salinan development database Anda. Jika
materi situs Anda terdiri dari beberapa file sederhana, uji skrip Anda di salinan development file itu. Pindahkan perubahan ke produksi hanya setelah perubahan tersebut lulus QA, seperti biasa. Anda bisa menggunakan [skrip Bram van Damme](https://github.com/bramus/mixed-content-scan) atau sesuatu yang mirip dengan itu untuk mendeteksi materi campuran di situs Anda.

Saat menautkan ke situs lain (kebalikan dari menyertakan sumber daya dari sana),
jangan ubah protokol karena Anda tidak memiliki kontrol atas cara beroperasi
situs itu.

Berhasil: Saya menyarankan URL protokol-relatif untuk membuat proses migrasi lebih mulus bagi situs besar. Jika Anda belum yakin apakah bisa menerapkan HTTPS sepenuhnya, memaksa situs Anda untuk menggunakan HTTPS bagi semua sub-sumber daya malah akan merugikan. Mungkin ada masanya Anda masih baru dan asing dengan HTTPS, sementara situs HTTP harus tetap berfungsi seperti biasa. Lama-kelamaan, Anda akan menyelesaikan migrasi dan mengunci HTTPS (lihat dua bagian berikutnya).

Jika situs Anda bergantung pada skrip, gambar, atau sumber daya lainnya yang dilayani dari
pihak ketiga, misalnya CDN atau jquery.com, Anda memiliki dua opsi:

* Gunakan URL protokol-relatif untuk sumber daya ini. Jika pihak ketiga tidak
melayani HTTPS, mintalah mereka melakukannya. Sebagian besar sudah melakukannya, termasuk jquery.com.
* Layani sumber daya dari server yang Anda kontrol, dan yang menawarkan HTTP
maupun HTTPS. Sering kali ini merupakan ide bagus, karena nanti Anda memiliki kontrol
yang lebih baik atas penampilan, kinerja, dan keamanan situs Anda. Selain itu,
Anda tidak harus mempercayai pihak ketiga, walaupun biasanya hal itu bagus.

Note: Ingatlah bahwa Anda juga perlu mengubah URL intrasitus di stylesheet, JavaScript, aturan pengalihan, tag `<link>`, dan deklarasi CSP, tidak cuma di laman HTML.

## Mengalihkan HTTP ke HTTPS

Anda perlu menempatkan [tautan kanonis](https://support.google.com/webmasters/answer/139066) di kepala laman Anda untuk memberi tahu mesin telusur bahwa HTTPS adalah cara terbaik untuk menuju situs Anda.

Setel tag `<link rel="canonical" href="https://…"/>` di laman Anda. Ini
membantu mesin telusur menentukan cara terbaik menuju situs Anda.

## Mengaktifkan Strict Transport Security dan cookie aman

Pada titik ini, Anda siap untuk "mengunci" penggunaan HTTPS.

* Gunakan HTTP Strict Transport Security (HSTS) untuk menghindari biaya pengalihan 301.
* Selalu setel flag Secure pada cookie.

Pertama, gunakan [Strict Transport Security](https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security)
untuk memberi tahu klien bahwa mereka harus selalu menghubungkan ke server Anda melalui HTTPS, bahkan
saat mengikuti referensi `http://`. Ini akan mengalahkan serangan seperti
[SSL Stripping](http://www.thoughtcrime.org/software/sslstrip/){: .external }, juga
akan menghindari biaya bolak-balik `301 redirect` yang kita aktifkan di
[Mengalihkan HTTP ke HTTPS](#redirect-http-to-https).

Note: Klien yang telah mengenali situs Anda sebagai HSTS Host kemungkinan akan mengalami <a href="https://tools.ietf.org/html/rfc6797#section-12.1"><i>hard-fail</i> jika situs Anda memiliki kesalahan dalam konfigurasi TLS</a> (misalnya sertifikat telah berakhir). HSTS secara eksplisit didesain seperti ini untuk memastikan penyerang jaringan tidak bisa menipu klien agar mengakses situs tanpa HTTPS. Jangan aktifkan HSTS hingga Anda yakin bahwa operasi situs cukup tangguh untuk menghindari penerapan HTTPS dengan kesalahan validasi sertifikat.

Aktifkan HTTP Strict Transport Security (HSTS) dengan menyetel header `Strict-Transport-Security`. [Laman HSTS milik OWASP berisi tautan ke petunjuk](https://www.owasp.org/index.php/HTTP_Strict_Transport_Security) untuk beragam perangkat lunak server.

Sebagian besar server web menawarkan kemampuan menambahkan header khusus.

Note: `max-age` diukur dalam detik. Anda bisa mulai dengan nilai yang rendah dan berangsur-angsur menambah `max-age` bila sudah nyaman mengoperasikan situs HTTPS-saja.

Perlu juga dipastikan bahwa klien tidak pernah mengirim cookie (misalnya untuk
autentikasi atau preferensi situs) melalui HTTP. Misalnya, jika cookie
autentikasi pengguna akan diekspos dalam bentuk teks biasa, jaminan keamanan
seluruh sesinya akan dimusnahkan — sekalipun Anda telah melakukan hal lainnya
dengan benar!

Karena itu, ubah aplikasi web Anda untuk selalu menyetel flag Secure pada cookie
yang disetelnya. [Laman OWASP ini menjelaskan cara menyetel flag Secure](https://www.owasp.org/index.php/SecureFlag) di sejumlah kerangka kerja aplikasi. Setiap kerangka kerja aplikasi memiliki sebuah cara untuk menyetel flag.

Sebagian besar server web menawarkan fitur pengalihan sederhana. Gunakan `301 (Moved Permanently)` untuk
menunjukkan ke mesin telusur dan browser bahwa versi HTTPS bersifat kanonis dan mengalihkan pengguna Anda ke versi HTTPS situs Anda dari HTTP.

## Persoalan dalam migrasi

Banyak developer memiliki persoalan yang sudah sewajarnya tentang migrasi dari HTTP ke HTTPS.
Google Webmaster Team memberikan beberapa [panduan bagus](https://plus.google.com/+GoogleWebmasters/posts/eYmUYvNNT5J).

### Peringkat penelusuran

Google menggunakan [HTTPS sebagai indikator kualitas penelusuran positif](https://googlewebmastercentral.blogspot.com/2014/08/https-as-ranking-signal.html).
Google juga mempublikasikan panduan untuk
[cara mentransfer, memindah, atau memigrasikan situs](https://support.google.com/webmasters/topic/6029673)
sambil mempertahankan peringkat penelusuran. Bing juga mempublikasikan
[panduan untuk webmaster](http://www.bing.com/webmaster/help/webmaster-guidelines-30fba23a).

### Kinerja

Bila layer materi dan aplikasi telah diatur dengan baik (lihat
[buku Steve Souders](https://stevesouders.com/){: .external } untuk mendapatkan saran bagus),
persoalan kinerja TLS selebihnya umumnya kecil, relatif dengan biaya
keseluruhan aplikasi. Selain itu, biaya tersebut bisa dikurangi
dan disusutkan. (Untuk mendapatkan saran bagus mengenai optimalisasi TLS dan secara umum, lihat
[High Performance Browser Networking](https://hpbn.co/) oleh Ilya Grigorik.) Lihat juga tulisan Ivan Ristic di [OpenSSL Cookbook](https://www.feistyduck.com/books/openssl-cookbook/) dan [Bulletproof SSL And TLS](https://www.feistyduck.com/books/bulletproof-ssl-and-tls/).

Dalam beberapa kasus, TLS bisa _meningkatkan_ kinerja, umumnya akibat mengizinkan
HTTP/2. Chris Palmer memberikan pendapatnya mengenai [kinerja HTTPS dan HTTP/2 di Chrome Dev Summit 2014](/web/shows/cds/2014/tls-all-the-things).

### Header Referer

Bila pengguna mengikuti tautan dari situs HTTPS ke situs HTTP lain, agen-pengguna tidak akan mengirim header Referer. Jika ini masalahnya, ada sejumlah cara
untuk mengatasinya:

* Situs lainnya harus bermigrasi ke HTTPS. Jika situs penengah bisa melakukan bagian [Mengaktifkan HTTPS di server Anda](#enable-https-on-your-servers) pada panduan ini, Anda bisa mengubah tautan di situs ke situs rujukannya dari `http://` ke `https://`, atau Anda bisa menggunakan tautan protokol-relatif.
* Untuk mengatasi beragam masalah pada header Referer, gunakan [standar Kebijakan Referrer](http://www.w3.org/TR/referrer-policy/#referrer-policy-delivery-meta) baru.

Karena mesin telusur bermigrasi ke HTTPS, di masa mendatang Anda mungkin akan melihat _lebih banyak_ header Referer saat bermigrasi ke HTTPS.

Perhatian: Sesuai dengan [HTTP RFC](https://tools.ietf.org/html/rfc2616#section-15.1.3), klien **TIDAK BOLEH** menyertakan bidang header Referer dalam permintaan HTTP (tidak-aman) jika laman perujuk telah ditransfer dengan protokol aman.

### Pendapatan iklan

Operator situs yang menghasilkan uang dari situs mereka dengan menampilkan iklan ingin memastikan bahwa
bermigrasi ke HTTPS tidak akan mengurangi tayangan iklan. Namun, karena persoalan keamanan
materi campuran, `<iframe>` HTTP tidak berfungsi di laman HTTPS. Ada masalah tindakan kolektif
yang pelik di sini: sebelum pengiklan mempublikasikan lewat HTTPS,
operator situs tidak bisa bermigrasi ke HTTPS tanpa kehilangan pendapatan iklan; namun sebelum operator
situs bermigrasi ke HTTPS, pengiklan memiliki motivasi kecil untuk mempublikasikan HTTPS.

Pengiklan setidaknya harus menawarkan layanan iklan lewat HTTPS (misalnya dengan melakukan bagian
"Mengaktifkan HTTPS di server Anda" pada laman ini). Banyak yang sudah melakukan. Mintalah
para pengiklan yang sama sekali tidak menggunakan HTTPS untuk memulainya.
Anda mungkin perlu menunda penyelesaian [Membuat relatif URL intrasitus](#make-intrasite-urls-relative) hingga cukup banyak pengiklan yang melakukan interoperasi dengan benar.


{# wf_devsite_translation #}
