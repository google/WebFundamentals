project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Browser modern memudahkan kita dalam menyesuaikan komponen tertentu, seperti ikon, warna bilah alamat, dan bahkan menambahkan sesuatu seperti petak khusus. Ubahan ini bisa meningkatkan keterlibatan dan membuat pengguna kembali ke situs Anda.


{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2015-09-21 #}

# Ikon & Warna Browser {: .page-title }

{% include "web/_shared/contributors/pbakaus.html" %}

Browser modern memudahkan kita dalam menyesuaikan komponen tertentu, seperti ikon, warna bilah alamat, dan bahkan menambahkan sesuatu seperti petak khusus. Ubahan ini bisa meningkatkan keterlibatan dan membuat pengguna kembali ke situs Anda.


## Memberikan ikon & petak yang bagus 

Ketika pengguna mengunjungi laman web Anda, browser akan mencoba untuk mengambil ikon dari HTML. Ikon mungkin muncul di banyak tempat, termasuk tab browser, tombol recent app, laman tab yang baru (atau baru saja dikunjungi), dan lainnya.

Memberikan kualitas gambar yang tinggi akan membuat situs Anda lebih mudah dikenali, sehingga
memudahkan pengguna untuk menemukan situs Anda. 

Untuk mendukung penuh semua browser, Anda harus menambahkan beberapa tag ke elemen `<head>`
setiap laman.


    <!-- icon in the highest resolution we need it for -->
    <link rel="icon" sizes="192x192" href="icon.png">
    
    <!-- reuse same icon for Safari -->
    <link rel="apple-touch-icon" href="ios-icon.png">
    
    <!-- multiple icons for IE -->
    <meta name="msapplication-square310x310logo" content="icon_largetile.png">
    

### Chrome & Opera

Chrome dan Opera menggunakan `icon.png`, yang diskalakan ke ukuran yang diperlukan oleh 
perangkat. Untuk mencegah penskalaan otomatis, Anda juga bisa memberikan ukuran 
tambahan dengan menetapkan atribut `sizes`.


Note: Ukuran ikon harus berbasis 48 px, misalnya 48 px, 96 px, 144 px dan 192 px

### Safari

Safari juga menggunakan tag `<link>` dengan atribut `rel`: `apple-touch-icon`.

Anda bisa menetapkan [ukuran eksplisit](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/MobileHIG/IconMatrix.html#//apple_ref/doc/uid/TP40006556-CH27) 
dengan menyediakan tag tautan yang terpisah untuk setiap ikon, mencegah OS dari 
keharusan mengubah ukuran ikon:


    <link rel="apple-touch-icon" href="touch-icon-iphone.png">
    <link rel="apple-touch-icon" sizes="76x76" href="touch-icon-ipad.png">
    <link rel="apple-touch-icon" sizes="120x120" href="touch-icon-iphone-retina.png">
    <link rel="apple-touch-icon" sizes="152x152" href="touch-icon-ipad-retina.png">
    

### Internet Explorer & Windows Phone

Layar beranda baru Windows 8 mendukung empat layout berbeda untuk situs yang 
dipasangi pin, dan membutuhkan empat ikon. Anda bisa menghilangkan tag 
meta yang relevan jika Anda tidak ingin mendukung ukuran tertentu.


    <meta name="msapplication-square70x70logo" content="icon_smalltile.png">
    <meta name="msapplication-square150x150logo" content="icon_mediumtile.png">
    <meta name="msapplication-wide310x150logo" content="icon_widetile.png">
    

### Petak di Internet Explorer

"Situs Tersemat" dan "Petak Dinamis" Microsoft berputar jauh melampaui 
implementasi lain dan berada di luar cakupan panduan ini. Anda bisa mempelajari selengkapnya
di MSDN
[cara membuat petak dinamis](//msdn.microsoft.com/en-us/library/ie/dn455115(v=vs.85).aspx).


## Mewarnai elemen browser

Menggunakan elemen `meta` yang berbeda, Anda bisa menyesuaikan browser dan 
bahkan elemen platform. Harap diingat bahwa beberapa hanya bisa berfungsi pada
platform atau browser tertentu, namun mereka bisa sangat meningkatkan pengalaman pengguna. 

Chrome, Firefox OS, Safari, Internet Explorer dan Opera Coast mengizinkan Anda untuk menentukan 
warna elemen browser, dan menyeimbangkan platform menggunakan tag meta.

### Warna Tema Meta untuk Chrome dan Opera

Untuk menentukan warna tema Chrome di Android, gunakan warna tema meta.

    <!-- Chrome, Firefox OS and Opera -->
    <meta name="theme-color" content="#4285f4">
    

<img src="imgs/theme-color.png" alt="Warna tema untuk penataan gaya bilah alamat pada Chrome">

### Gaya khusus Safari

Safari memungkinkan Anda untuk menata bilah status dan menetapkan gambar startup.

#### Menetapkan gambar startup

Secara default, Safari menampilkan layar kosong selama proses muat dan setelah beberapa pemuatan
tangkapan layar dari status aplikasi sebelumnya. Anda bisa mencegah hal ini dengan
mengatur Safari untuk menampilkan gambar startup eksplisit, dengan menambahkan tag tautan, dengan
`rel=apple-touch-startup-image`. Misalnya:


    <link rel="apple-touch-startup-image" href="icon.png">
    

Gambar harus sesuai ukuran yang telah ditentukan dari layar perangkat target atau
tidak akan digunakan. Lihat
[Panduan Materi Web Safari ](//developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)
untuk lebih jelasnya.

Meskipun dokumentasi Apple jarang membahas topik ini, komunitas developer-nya
telah menemukan cara untuk menargetkan semua perangkat dengan menggunakan kueri media lanjutan untuk
memilih perangkat yang tepat dan kemudian menetapkan gambar yang benar. Berikut
solusi yang bekerja, berkat [gist tfausak](//gist.github.com/tfausak/2222823)

#### Mengubah tampilan bilah status

Anda bisa mengubah tampilan bilah status default baik ke `black` atau
`black-translucent`. Dengan `black-translucent`, bilah status melayang di atas
materi layar penuh, bukan menekannya. Ini memberikan layout
yang lebih tinggi, tapi menghalangi bagian atas.  Berikut adalah kode yang diperlukan:


    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    
<div class="attempt-left">
  <figure>
    <img src="imgs/status-bar-translucent.png" srcset="imgs/status-bar-translucent.png 1x, imgs/status-bar-translucent-2x.png 2x" alt="black-translucent">
    <figcaption>Tangkapan layar menggunakan <code>black-translucent</code></figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="imgs/status-bar-black.png" srcset="imgs/status-bar-black.png 1x, imgs/status-bar-black-2x.png 2x" alt="black-black">
    <figcaption>Tangkapan layar menggunakan <code>black</code></figcaption>
  </figure>
</div>

<div style="clear:both;"></div>




{# wf_devsite_translation #}
