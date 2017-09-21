project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Situs web tidak hanya dikunjungi oleh manusia, juga oleh perayap web mesin telusur. Pelajari cara meningkatkan akurasi penelusuran dan peringkat situs web Anda.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2014-08-30 #}

# Optimalisasi Penelusuran {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}

Situs web tidak hanya dikunjungi oleh manusia, juga oleh perayap web mesin telusur. Pelajari cara meningkatkan akurasi penelusuran dan peringkat situs web Anda.

### TL;DR {: .hide-from-toc }
- Tentukan struktur URL laman web Anda.
- Desain responsif adalah yang paling disarankan.
- Gunakan <code>rel='canonical'</code> + <code>rel='alternate'</code> untuk masing-masing situs desktop/seluler.
- Gunakan header <code>Vary HTTP</code> untuk URL tunggal yang secara dinamis menyajikan HTML desktop/seluler terpisah.
- Gunakan <code>noindex</code> untuk laman yang ingin Anda batasi aksesnya hanya untuk orang yang mengetahui URL tersebut.
- Gunakan mekanisme autentikasi yang relevan untuk laman yang Anda inginkan tetap privat.

## Berikan struktur situs Anda pada mesin telusur

Bagaimana munculnya situs web Anda dalam hasil penelusuran adalah hal penting dalam desain situs multi-perangkat. Panduan ini membantu Anda mengoptimalkan situs web untuk mesin telusur berdasarkan struktur URL-nya.

Anda berencana membangun laman web yang responsif? Adakah versi khusus seluler
dengan URL terpisah? Apakah Anda menyajikan versi desktop maupun
versi seluler dari URL yang sama? Apa pun itu, Anda selalu bisa melakukan tugas yang lebih baik
dalam mengoptimalkan situs web bagi mesin telusur.

### Berikan struktur URL untuk situs Anda

Ada sejumlah cara untuk menyajikan materi ke beberapa perangkat berbeda. Tiga metode
paling umum adalah:

**Desain web responsif:** menyajikan HTML yang sama dari satu URL dan menggunakan kueri media CSS
untuk menentukan cara merender materi pada sisi klien.
Misalnya, Desktop dan Seluler: http://www.example.com/

**Situs seluler terpisah:** mengalihkan pengguna ke URL berbeda dengan bergantung pada
agen-pengguna. Misalnya, Desktop: http://www.example.com/
Seluler: http://m.example.com/

**Penyajian dinamis:** menyajikan HTML berbeda dari satu URL dengan bergantung pada
agen-pengguna. Misalnya, Desktop dan Seluler: http://www.example.com/

Pendekatan terbaik adalah menggunakan **desain web responsif**, walaupun banyak situs web menggunakan metode lain.
 
Tentukan struktur URL mana yang cocok dengan laman web Anda. Kemudian coba praktik terbaik
yang terkait untuk mengoptimalkannya bagi mesin telusur.

### Kami menyarankan desain web responsif

Manfaat membuat situs web Anda jadi responsif adalah:

<img class="attempt-right" src="imgs/responsive-2x.png" srcset="imgs/responsive.png 1x, imgs/responsive-2x.png 2x" >

* Lebih mudah bagi pengguna untuk berbagi.
* Pemuatan laman yang lebih cepat tanpa pengalihan.
* URL tunggal untuk hasil penelusuran.

<div style="clear:both;"></div>
  
Pelajari cara membangun situs web dengan desain web responsif di [Dasar-Dasar Desain Web Responsif](/web/fundamentals/design-and-ux/responsive/).

### Gunakan `link[rel=canonical]` dan `link[rel=alternate]` saat menyajikan URL terpisah

Menyajikan materi serupa pada versi desktop dan versi seluler di
URL berbeda dapat menyebabkan kebingungan pada pengguna dan mesin telusur karena tidak
jelas bagi penampil bahwa kedua versi sebenarnya identik. Anda harus menunjukkan:

* Bahwa materi kedua URL adalah identik.
* Mana yang versi seluler.
* Mana yang versi desktop (kanonis).

Informasi ini membantu mesin telusur menjadi lebih baik dalam mengindeks materi dan memastikan
pengguna menemukan apa yang mereka cari dalam format yang cocok dengan perangkat mereka.

#### Gunakan alternatif untuk desktop

Saat menyajikan versi desktop, tunjukkan bahwa ada versi seluler di
URL lain dengan menambahkan tag `link` dengan atribut `rel="alternate" yang menunjukkan
ke versi seluler di atribut `href`.

[http://www.example.com/](http://www.example.com/){: .external } HTML


    <title>...</title>
    <link rel="alternate" media="only screen and (max-width: 640px)" href="http://m.example.com/">
    

#### Gunakan kanonis untuk seluler

Saat menyajikan versi seluler, tunjukkan bahwa ada versi desktop (kanonis)
pada URL lain dengan menambahkan tag `link` dengan atribut `rel="canonical"` yang
menunjukkan ke versi desktop di atribut `href`. Bantu mesin telusur
memahami bahwa versi seluler secara eksplisit adalah untuk layar kecil dengan menambahkan atribut `media` dengan nilai `"only screen and (max-width: 640px)"`.

[http://m.example.com/](http://m.example.com/){: .external } HTML


    <title>...</title>
    <link rel="canonical" href="http://www.example.com/">
    
  
<img src="imgs/different_url-2x.png" srcset="imgs/different_url.png 1x, imgs/different_url-2x.png 2x" >

### Gunakan header Vary HTTP

Menyajikan HTML berbeda berdasarkan pada tipe perangkat akan mengurangi pengalihan yang tidak perlu,
menyajikan HTML yang dioptimalkan, dan menyediakan URL tunggal bagi mesin telusur. Ada juga
sejumlah kerugiannya:

* Mungkin ada proxy perantara di antara browser pengguna dan server.
Kecuali jika proxy mengetahui bahwa materi bervariasi menurut agen-pengguna, hasil yang disajikannya
mungkin tidak seperti yang diharapkan.
* Pengubahan materi yang bergantung pada risiko agen-pengguna dianggap sebagai 
"[cloaking](https://support.google.com/webmasters/answer/66355)", yang merupakan
pelanggaran terhadap Panduan Webmaster Google.

Dengan memungkinkan mesin telusur mengetahui bahwa materi bervariasi menurut agen-pengguna,
mesin telusur bisa mengoptimalkan hasil penelusuran untuk agen-pengguna yang mengirim kueri tersebut.

Untuk menunjukkan bahwa URL menyajikan HTML berbeda yang bergantung pada agen-pengguna, sediakan
`Vary: User-Agent` dalam header HTTP. Ini memungkinkan indeks penelusuran memperlakukan
versi seluler dan desktop secara terpisah, dan proxy perantara meng-cache
materi tersebut secara halus.

[http://www.example.com/](http://www.example.com/){: .external } Header HTTP


    HTTP/1.1 200 OK
    Content-Type: text/html
    Vary: User-Agent
    Content-Length: 5710
    

<img src="imgs/same_url-2x.png" srcset="imgs/same_url.png 1x, imgs/same_url-2x.png 2x" >

Untuk mengetahui selengkapnya tentang membangun struktur URL di desktop dan seluler, bacalah [tentang membangun situs web yang dioptimalkan untuk ponsel cerdas](/webmasters/smartphone-sites/).


## Kontrol perayapan dan pengindeksan dari mesin telusur

Tercantum secara benar di mesin telusur sangatlah penting dalam menyajikan situs web Anda kepada
dunia, namun konfigurasi yang buruk bisa menyebabkan materi yang tidak diharapkan disertakan
dalam hasil penelusuran. Bagian ini membantu Anda menghindari masalah demikian dengan menjelaskan cara kerja
perayap dan caranya mengindeks situs web.

Tidak ada tempat yang lebih baik untuk berbagi informasi selain di web. Bila Anda mempublikasikan
dokumen, maka dokumen itu akan langsung tersedia ke seluruh dunia. Laman akan
terlihat oleh siapa saja yang mengetahui URL tersebut. Itulah tempat masuk mesin telusur. Mesin telusur harus dapat menemukan situs web Anda.

Akan tetapi, ada beberapa kasus di mana Anda tidak ingin orang menemukan dokumen
itu walaupun Anda ingin menempatkannya di web. Misalnya, laman
admin blog hanya boleh diakses oleh orang-orang tertentu. Tidak ada
gunanya membiarkan orang menemukan laman itu melalui mesin telusur.

Bagian ini juga menjelaskan cara membatasi laman agar tidak muncul dalam hasil penelusuran.


### Perbedaan antara "merayapi" dan "mengindeks"

Sebelum mempelajari cara mengontrol hasil penelusuran, Anda perlu memahami cara mesin telusur berinteraksi dengan laman web. Dari sudut pandang situs Anda, setidaknya ada dua hal yang dilakukan mesin telusur pada situs: merayapi dan mengindeks.  

**Merayapi** adalah bila bot mesin telusur mengambil laman web Anda untuk menganalisis materinya. Materi disimpan dalam database mesin telusur dan bisa digunakan untuk mengisikan detail hasil penelusuran, memeringkat laman, dan menemukan laman baru dengan mengikuti tautan.  

**Mengindeks** adalah bila mesin telusur menyimpan URL situs web dan semua informasi terkait dalam database-nya agar siap disajikan sebagai hasil penelusuran. 

Note: Banyak orang yang tidak bisa membedakan antara merayapi dengan mengindeks. Melarang perayapan bukan berarti laman tidak akan ditampilkan dalam hasil penelusuran. Misalnya, jika situs web pihak ketiga memiliki tautan ke salah satu laman web Anda, laman itu tetap bisa diindeks walaupun telah diblokir dari perayapan. Dalam hal ini, hasil penelusuran tidak memiliki keterangan mendetail.

### Kontrol perayapan dengan robots.txt

Anda bisa menggunakan file teks yang disebut `robots.txt` untuk mengontrol bagaimana perayap yang berperilaku-baik mengakses laman web Anda. `Robots.txt` adalah file teks biasa yang menjelaskan bagaimana Anda ingin
bot telusur merayapi situs. (Tidak semua perayap perlu mematuhi
`robots.txt`. Bayangkan bila ada orang bisa membuat perayap liar sendiri.)

Tempatkan `robots.txt` pada direktori akar host situs web Anda. Misalnya,
jika host situs Anda adalah `http://pages.example.com/`, maka file `robots.txt` harus
ditempatkan di `http://pages.example.com/robots.txt`. Jika domain tersebut memiliki
skema, subdomain, atau port lain yang berbeda, maka dianggap
host berbeda dan harus memiliki `robots.txt` untuk setiap
direktori akarnya.

Inilah contoh ringkasnya:  

**http://pages.example.com/robots.txt**

    User-agent: *
    Disallow: /
    

Ini menunjukkan bahwa Anda ingin melarang semua bot merayapi keseluruhan
situs web.

Ini contoh yang lain:

**http://pages.example.com/robots.txt**

    User-agent: Googlebot
    Disallow: /nogooglebot/
    

Anda bisa menetapkan perilaku per bot (agen-pengguna) dengan menunjukkan
nama agen-pengguna. Dalam kasus di atas, Anda melarang agen-pengguna yang disebut `Googlebot`
untuk merayapi `/nogooglebot/` dan semua materi di bawah direktori ini.  

Ketahui selengkapnya tentang setiap bot mesin telusur di laman bantuannya:

* [Google](/webmasters/control-crawl-index/docs/robots_txt)
* [Bing](http://www.bing.com/webmaster/help/how-to-create-a-robots-txt-file-cb7c31ec)
* [Yandex](https://help.yandex.com/webmaster/controlling-robot/robots-txt.xml)


Note: `robots.txt` hanya diperlukan **jika** Anda ingin mengontrol cara situs dirayapi. Jangan kembalikan kode respons 500 untuk URL: `/robots.txt`. Ini menghentikan semua perayapan selanjutnya untuk keseluruhan host sehingga mengakibatkan detail hasil penelusuran kosong.

#### Uji robots.txt

Bergantung pada perayap mana yang ditargetkan robots.txt, penyedia
mesin telusur mungkin menyediakan alat (bantu) untuk menguji `robots.txt`. Misalnya, untuk Google 
ada sebuah validator di
[Alat WebMaster](https://www.google.com/webmasters/tools/robots-testing-tool)
yang bisa Anda gunakan untuk menguji robots.txt.

<img src="imgs/robots-txt-validator.png" srcset="imgs/robots-txt-validator-2x.png 2x, imgs/robots-txt-validator.png 1x">

Yandex menyediakan [alat (bantu) serupa](https://webmaster.yandex.com/tools/robotstxt/).  

### Kontrol pengindeksan penelusuran dengan tag meta

Jika Anda tidak ingin laman web ditampilkan dalam hasil penelusuran, maka robots.txt bukan
solusinya. Anda perlu memperbolehkan semua laman itu dirayapi, dan secara eksplisit
menunjukkan bahwa Anda tidak ingin laman itu diindeks. Ada dua solusinya:

Untuk menunjukkan bahwa Anda tidak ingin laman HTML diindeks, gunakan semacam tag `<meta>` khusus, dengan atributnya disetel sebagai `name="robots"` dan `content="noindex"`.  


    <!DOCTYPE html>
    <html><head>
    <meta name="robots" content="noindex" />
    

Dengan mengubah nilai atribut `name` ke nama agen-pengguna tertentu, Anda bisa mempersempit cakupannya. Misalnya, `name="googlebot"` (membedakan huruf besar-kecil) menunjukkan bahwa Anda tidak ingin Googlebot mengindeks laman.  


    <!DOCTYPE html>
    <html><head>
    <meta name="googlebot" content="noindex" />
    

Opsi lainnya untuk tag meta robot antara lain:  

* [Google](/webmasters/control-crawl-index/docs/robots_meta_tag)
* [Bing](http://www.bing.com/webmaster/help/which-robots-metatags-does-bing-support-5198d240)
* [Yandex](https://help.yandex.com/webmaster/controlling-robot/html.xml)

#### X-Robots-Tag

Untuk menunjukkan bahwa Anda tidak ingin sumber daya seperti file gambar, stylesheet, atau skrip
diindeks, tambahkan `X-Robots-Tag: noindex` dalam header HTTP.


    HTTP/1.1 200 OK
    X-Robots-Tag: noindex
    Content-Type: text/html; charset=UTF-8
    

Jika Anda ingin mempersempit cakupan pada agen-pengguna tertentu, sisipkan nama agen-pengguna sebelum `noindex`.  


    HTTP/1.1 200 OK
    X-Robots-Tag: googlebot: noindex
    Content-Type: text/html; charset=UTF-8
    

Untuk mengetahui selengkapnya tentang X-Robots-Tag:  

* [Google](/webmasters/control-crawl-index/docs/robots_meta_tag)
* [Bing](http://www.bing.com/webmaster/help/how-can-i-remove-a-url-or-page-from-the-bing-index-37c07477)

Note: Jika Anda melarang perayapan menggunakan `robots.txt`, bot telusur mungkin tetap mengindeks laman itu tanpa mengetahui bahwa Anda tidak ingin laman itu diindeks. Hal ini bisa terjadi karena:<ul><li>Bot telusur mungkin menemukan laman web Anda dengan mengikuti tautan dari situs web lain.</li><li>Mesin telusur yang tidak bisa merayapi tidak bisa mendeteksi <code>noindex</code>.</li></ul>

Jangan mengharapkan `robots.txt` untuk mengontrol indeks penelusuran.

### Contoh menurut tipe materi

Apakah solusi terbaik untuk mengontrol perayapan dan pengindeksan? Inilah beberapa solusi contoh untuk tipe laman berbeda.

#### Dapat diakses dan ditelusuri sepenuhnya oleh siapa saja

Kebanyakan laman di web bertipe ini.  

* Tidak diperlukan `robots.txt`.
* Tidak diperlukan tag meta robot.

#### Akses terbatas pada orang yang mengetahui URL tersebut

Contohnya antara lain:  

* Laman proses masuk untuk konsol admin blog.
* Materi pribadi yang dibagikan dengan meneruskan URL untuk pengguna internet pemula.

Dalam hal ini, Anda tidak ingin mesin telusur mengindeks laman-laman itu.  

* Tidak diperlukan `robots.txt`.
* Gunakan tag meta `noindex` untuk laman HTML.
* Gunakan `X-Robots-Tag: noindex` untuk sumber daya bukan HTML (gambar, pdf, dll).

Note: Bertanya-tanya apakah Anda harus melarang perayapan file JavaScript dan Stylesheet? <a href='http://googlewebmastercentral.blogspot.com/2014/05/understanding-web-pages-better.html' target='_blank'>Google berusaha sebaik mungkin untuk memahaminya</a> sehingga ia bisa menemukan materi yang tersedia melalui teknologi modern seperti AJAX. Anda tentunya harus memperbolehkan perayap untuk merayapi JavaScript.

#### Akses terbatas dari orang yang diizinkan

Dalam hal ini, sekalipun seseorang menemukan URL tersebut, server akan menolak menyajikan hasilnya tanpa kredensial yang sesuai. Misalnya:  

* Materi yang dibagikan secara pribadi di jaringan sosial.
* Sistem biaya perusahaan.

Di tipe laman ini, mesin telusur tidak boleh merayapi maupun mengindeksnya.  

* Kembalikan kode respons 401 "Unauthorized" bila akses tanpa
kredensial yang sesuai (atau alihkan pengguna ke laman proses masuk).
* Jangan gunakan `robots.txt` untuk melarang perayapan di laman ini. Jika tidak maka 401 tidak bisa dideteksi.

Mekanisme pembatasan di sini bisa berupa alamat IP, cookie, otorisasi dasar,
OAuth, dll. Cara mengimplementasikan autentikasi/otorisasi demikian bergantung pada
infrastruktur Anda dan di luar cakupan artikel ini.

### Minta penghapusan laman dari mesin telusur

Anda mungkin perlu membuang hasil penelusuran bila:  

* Laman sudah tidak ada lagi.
* Laman terindeks secara tidak sengaja dengan menyertakan informasi rahasia.


Mesin telusur utama menyediakan cara untuk mengirim permintaan membuang laman demikian. Proses ini biasanya seperti berikut:  

1. Pastikan laman yang ingin Anda buang:
    * Apakah sudah dihapus dari server dan mengembalikan 404
    * Apakah telah dikonfigurasi untuk tidak diindeks (mis: noindex)

1. Masuklah ke laman permintaan di setiap mesin telusur. (Google dan Bing mengharuskan Anda mendaftarkan dan memvalidasi kepemilikan situs web.)
1. Kirim permintaan.

<img src="imgs/remove-urls.png" srcset="imgs/remove-urls-2x.png 2x, imgs/remove-urls.png 1x">

Periksa langkah-langkah konkret pada laman bantuan mesin telusur yang bersangkutan:  

* [Google](https://support.google.com/webmasters/answer/1663419)
* [Bing](http://www.bing.com/webmaster/help/bing-content-removal-tool-cb6c294d)
* [Yandex](https://help.yandex.com/webmaster/yandex-indexing/removing-from-index.xml)

### Apendiks: Daftar agen-pengguna perayap

* [Google](https://support.google.com/webmasters/answer/1061943)
* [Bing](http://www.bing.com/webmaster/help/which-crawlers-does-bing-use-8c184ec0)
* [Yandex](https://help.yandex.com/search/robots/logs.xml)



{# wf_devsite_translation #}
