project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Menemukan dan memperbaiki materi campuran adalah tugas penting, namun bisa makan waktu. Panduan ini mendiskusikan beberapa alat yang tersedia untuk membantu prosesnya.

{# wf_published_on: 2015-09-28 #}
{# wf_updated_on: 2017-07-12 #}

# Mencegah Materi Campuran {: .page-title }

{% include "web/_shared/contributors/johyphenel.html" %}

Berhasil: Mendukung HTTPS untuk situs web Anda adalah langkah penting untuk melindungi situs dan pengguna Anda dari serangan, namun materi campuran bisa membuat perlindungan itu menjadi sia-sia. Untuk melindungi situs dan pengguna, Anda perlu menemukan dan memperbaiki masalah materi campuran.

Menemukan dan memperbaiki materi campuran adalah tugas penting, namun bisa makan waktu. Panduan ini mendiskusikan beberapa alat dan teknik yang tersedia untuk membantu prosesnya. Untuk informasi selengkapnya mengenai materi campuran itu sendiri, lihat [Apa yang Dimaksud Dengan Materi Campuran](./what-is-mixed-content).

### TL;DR {: .hide-from-toc }

* Selalu gunakan URL https:// saat memuat sumber daya di laman Anda.
* Gunakan header `Content-Security-Policy-Report-Only` untuk memantau kesalahan materi campuran di situs Anda.
* Gunakan direktif CSP `upgrade-insecure-requests` untuk melindungi pengunjung Anda dari materi tidak aman.

## Menemukan dan memperbaiki materi campuran 

Menemukan materi campuran secara manual bisa makan waktu, bergantung pada jumlah masalah yang Anda alami. Proses yang dijelaskan dalam dokumen ini menggunakan browser Chrome; akan tetapi sebagian besar browser modern menyediakan alat serupa untuk membantu proses ini.

### Menemukan materi campuran dengan mengunjungi situs Anda

Saat mengunjungi laman HTTPS di Google Chrome, browser akan memperingatkan Anda mengenai materi campuran 
sebagai kesalahan dan peringatan dalam Konsol JavaScript.

Untuk menampilkan peringatan ini, buka laman contoh materi campuran pasif atau materi campuran aktif dan buka Konsol JavaScript Chrome. Anda bisa membuka konsol tersebut dari menu View: _View_ -&gt; _Developer_ -&gt; _JavaScript Console_ atau dengan mengeklik kanan pada laman, memilih _Inspect Element_, kemudian memilih _Console_.

[Contoh materi campuran pasif](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/passive-mixed-content.html){: .external} pada laman [Apa yang Dimaksud Dengan Materi Campuran](what-is-mixed-content#passive-mixed-content){: .external} menyebabkan peringatan materi campuran ditampilkan, seperti di bawah ini:

<figure>
  <img src="imgs/passive-mixed-content-warnings.png" alt="Materi Campuran: Laman telah dimuat melalui HTTPS, namun meminta video yang tidak aman. Materi ini seharusnya juga disajikan melalui HTTPS.">
</figure>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/passive-mixed-content.html){: target="_blank" .external }

Walaupun contoh materi campuran aktif menyebabkan kesalahan materi campuran 
ditampilkan:

<figure>
  <img src="imgs/active-mixed-content-errors.png" alt="Materi Campuran: Laman telah dimuat melalui HTTPS, namun meminta sumber daya yang tidak aman. Permintaan ini telah diblokir; materi harus disajikan melalui HTTPS.">
</figure>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/active-mixed-content.html){: target="_blank" .external }


Anda perlu memperbaiki URL http:// yang dicantumkan dalam kesalahan dan peringatan ini, di sumber situs Anda. Ada baiknya membuat daftar URL ini, bersama laman tempat Anda menemukannya, untuk digunakan bila Anda memperbaikinya. 

Note: Kesalahan dan peringatan materi campuran hanya ditunjukkan untuk laman yang saat ini Anda tampilkan, dan Konsol JavaScript dikosongkan setiap kali Anda mengarah ke laman baru. Berarti Anda harus menampilkan setiap laman di situs Anda secara individual untuk menemukan kesalahan ini. Beberapa kesalahan mungkin hanya ditunjukkan setelah Anda berinteraksi dengan suatu bagian laman, lihat contoh materi campuran galeri gambar dari panduan kami sebelumnya.

### Menemukan materi campuran dalam kode sumber Anda

Anda bisa menelusuri materi campuran secara langsung dalam kode sumber. Telusuri 
`http://` dalam kode sumber Anda dan cari tag yang berisi atribut HTTP URL.
Khususnya, cari tag yang tercantum di bagian [tipe materi campuran & ancaman keamanan yang berkaitan](what-is-mixed-content#mixed-content-types--security-threats-associated){: .external} pada panduan sebelumnya.
Perhatikan, dengan memiliki `http://` dalam atribut href tag jangkar (`<a>`)
sering kali bukanlah masalah materi campuran, dengan beberapa pengecualian penting yang akan didiskusikan belakangan. 

Jika Anda memiliki daftar URL HTTP dari kesalahan dan peringatan materi campuran Chrome, 
Anda juga bisa menelusuri URL lengkap ini di kode sumber untuk menemukan lokasi mereka 
di situs Anda. 

### Memperbaiki materi campuran

Setelah Anda menemukan lokasi materi campuran tersebut di kode sumber situs Anda, 
ikuti langkah-langkah ini untuk memperbaikinya.

Dengan menggunakan kesalahan materi campuran berikut di Chrome sebagai contoh:

<figure>
  <img src="imgs/image-gallery-warning.png" alt="Materi Campuran: Laman telah dimuat melalui HTTPS, namun meminta gambar yang tidak aman. Materi ini seharusnya juga disajikan melalui HTTPS.">
</figure>

Yang Anda temukan di kode sumber di sini:
 
    <img src="http://googlesamples.github.io/web-fundamentals/.../puppy.jpg"> 

#### Langkah 1

Periksa apakah URL tersedia melalui HTTPS dengan membuka tab baru di 
browser Anda, memasukkan URL di bilah alamat, dan mengubah `http://` menjadi `https://`

Jika sumber daya yang ditampilkan sama melalui **HTTP** dan **HTTPS**, berarti semuanya OKE.
Lanjutkan ke [Langkah 2](#step-2).

<div class="attempt-left">
  <figure>
    <img src="imgs/puppy-http.png">
    <figcaption class="success">
      Pemuatan gambar HTTP tanpa kesalahan.
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="imgs/puppy-https.png">
    <figcaption class="success">
      Pemuatan gambar HTTPS tanpa kesalahan, dan gambarnya sama seperti HTTP. Pindah ke <a href="#step-2">langkah 2</a>!
     </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

Jika Anda melihat peringatan sertifikat, atau jika materi tidak bisa ditampilkan melalui
**HTTPS**, berarti sumber daya tersebut tidak tersedia secara aman.

<div class="attempt-left">
  <figure>
    <img src="imgs/https-not-available.png">
    <figcaption class="warning">
      Sumber daya tidak tersedia melalui HTTPS
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="imgs/https-cert-warning.png">
    <figcaption class="warning">
      Peringatan sertifikat saat mencoba menampilkan sumber daya melalui HTTPS.
     </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

Dalam hal ini, Anda harus mempertimbangkan salah satu opsi berikut:

* Sertakan sumber daya dari host berbeda, jika tersedia.
* Unduh dan host materi tersebut di situs Anda secara langsung, jika secara hukum Anda diizinkan melakukannya.
* Kecualikan sumber daya dari situs Anda sekaligus.

#### Langkah 2

Ubah URL dari `http://` menjadi `https://`, simpan file sumber, dan jika perlu gunakan kembali file yang telah diperbarui.

#### Langkah 3

Tampilkan laman tempat Anda menemukan kesalahan semula dan verifikasi apakah kesalahan tersebut tidak muncul lagi.

### Waspadailah penggunaan tag non-standar

Waspadailah penggunaan tag non-standar di situs Anda. Misalnya, URL tag jangkar (`<a>`)
tidak menyebabkan materi campuran dengan sendirinya, karena mereka menyebabkan browser 
mengarahkan ke laman baru. Ini berarti hal itu biasanya tidak perlu diperbaiki. Akan tetapi 
beberapa skrip galeri gambar menggantikan fungsionalitas tag `<a>` dan 
memuat sumber daya HTTP yang ditetapkan oleh atribut `href` ke dalam tampilan lightbox 
di laman, sehingga menyebabkan masalah materi campuran. 

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/security/prevent-mixed-content/_code/image-gallery-example.html" region_tag="snippet1" adjust_indentation="auto" %}
</pre>

[Cobalah](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/image-gallery-example.html){: target="_blank" .external }

Dalam kode di atas, kelihatannya aman membiarkan href tag `<a>` sebagai `http://`, 
akan tetapi jika Anda menampilkan contoh dan mengeklik gambar, Anda akan melihat bahwa ia memuat 
sumber daya materi campuran dan menampilkannya di laman. 

## Menangani materi campuran dengan mempertimbangkan skala

Langkah-langkah manual di atas berfungsi dengan baik untuk situs web yang lebih kecil; namun untuk situs web besar, 
atau situs yang memiliki beberapa tim development terpisah, boleh jadi sulit untuk memantau 
semua materi yang sedang dimuat. Untuk membantu tugas ini, Anda bisa menggunakan 
kebijakan keamanan materi untuk memerintahkan browser memberi tahu Anda mengenai materi campuran 
dan memastikan laman Anda tidak akan pernah memuat sumber daya tidak aman secara tidak diharapkan.

### Kebijakan keamanan materi

[**Kebijakan keamanan materi**](/web/fundamentals/security/csp/) (CSP) adalah fitur
browser serba guna yang bisa Anda gunakan untuk mengelola materi campuran 
dengan skala. Mekanisme pelaporan CSP bisa digunakan untuk melacak materi campuran di
situs Anda; dan kebijakan pemberlakuan, untuk melindungi pengguna dengan
peningkatan versi atau pemblokiran materi campuran. 

Anda bisa mengaktifkan fitur ini untuk sebuah laman dengan menyertakan header 
`Content-Security-Policy` atau `Content-Security-Policy-Report-Only` dalam 
respons yang dikirim dari server Anda. Selain itu, Anda bisa menyetel `Content-Security-Policy` (namun 
**bukan** `Content-Security-Policy-Report-Only`) dengan menggunakan tag `<meta>` di 
bagian `<head>` pada laman Anda. Lihat contoh di bagian 
berikut.

CSP berguna untuk banyak hal di luar penggunaan materi campurannya. Informasi tentang direktif CSP lainnya tersedia di sumber daya berikut:

* [Pengantar Mozilla untuk CSP](https://developer.mozilla.org/en-US/docs/Web/Security/CSP/Introducing_Content_Security_Policy){: .external}
* [Pengantar HTML5 Rocks untuk CSP](//www.html5rocks.com/en/tutorials/security/content-security-policy/){: .external}
* [CSP playground](http://www.cspplayground.com/){: .external }
* [Spesifikasi CSP](//www.w3.org/TR/CSP/){: .external }

Note: Beberapa browser memberlakukan <b>semua</b> kebijakan keamanan materi yang mereka terima.
Beberapa nilai header CSP sekaligus yang diterima oleh browser di header respons atau elemen
<code>&lt;meta&gt;</code> dikombinasikan dan diberlakukan sebagai satu kebijakan;
sehingga melaporkan kebijakan juga dikombinasikan. Kebijakan dikombinasikan dengan mengambil
perpotongan kebijakan; yakni, setiap kebijakan setelah yang pertama hanya bisa
membatasi lebih jauh materi yang diizinkan, bukan memperluasnya.

### Menemukan materi campuran dengan kebijakan keamanan materi 

Anda bisa menggunakan kebijakan keamanan materi untuk mengumpulkan laporan materi campuran pada 
situs Anda. Untuk mengaktifkan fitur ini, setel direktif `Content-Security-Policy-Report-Only` 
dengan menambahkannya sebagai header respons untuk situs Anda. 

Header respons:  

    Content-Security-Policy-Report-Only: default-src https: 'unsafe-inline' 'unsafe-eval'; report-uri https://example.com/reportingEndpoint 


Bila pengguna mengunjungi sebuah laman di situs Anda, browser mereka akan mengirim laporan berformat JSON 
mengenai hal-hal yang melanggar kebijakan keamanan materi ke 
`https://example.com/reportingEndpoint`. Dalam hal ini, kapan saja 
sub-sumber daya dimuat melalui HTTP, laporan akan dikirimkan. Laporan ini menyertakan URL 
laman tempat terjadinya pelanggaran kebijakan dan URL sub-sumber daya yang 
melanggar kebijakan. Jika Anda mengonfigurasi endpoint pelaporan untuk mencatat semua 
laporan ini dalam log, Anda bisa melacak materi campuran di situs Anda tanpa mengunjungi sendiri setiap 
laman. 

Dua keberatan untuk hal ini adalah:

* Pengguna harus mengunjungi laman Anda di browser yang memahami header CSP.
  Hal ini berlaku untuk sebagian besar browser modern.
* Anda hanya mendapatkan laporan untuk laman yang telah dikunjungi oleh pengguna Anda. Jadi jika Anda memiliki beberapa laman 
  yang tidak banyak mendapatkan lalu lintas, hal ini mungkin kadang-kadang saja sebelum Anda mendapatkan laporan untuk 
  seluruh situs Anda.

Untuk informasi selengkapnya mengenai format header CSP, lihat [spesifikasi Content Security Policy](https://w3c.github.io/webappsec/specs/content-security-policy/#violation-reports){: .external}. 

Jika Anda tidak ingin mengonfigurasi sendiri endpoint pelaporan, 
[https://report-uri.io/](https://report-uri.io/){: .external} merupakan 
alternatif yang pantas.

### Meningkatkan versi permintaan tidak aman

Salah satu dari alat terbaru dan terbaik untuk memperbaiki materi campuran secara otomatis adalah direktif CSP
[**`upgrade-insecure-requests`**](//www.w3.org/TR/upgrade-insecure-requests/){: .external}.
 Direktif ini memerintahkan browser untuk meningkatkan versi URL tidak aman 
sebelum membuat permintaan jaringan.

Sebagai contoh, jika laman berisi tag gambar dengan HTTP URL:

 
    <img src="http://example.com/image.jpg"> 


Sebagai gantinya browser membuat permintaan aman untuk 
<code><b>https:</b>//example.com/image.jpg</code>, sehingga melindungi pengguna dari 
materi campuran.

Anda bisa mengaktifkan perilaku ini baik dengan mengirim header `Content-Security-Policy` 
dengan direktif ini.


    Content-Security-Policy: upgrade-insecure-requests  


Atau dengan menyematkan direktif yang sama secara inline dalam bagian `<head>` 
dokumen dengan menggunakan elemen `<meta>`:

  
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">  


Perlu diperhatikan, jika sumber daya tidak tersedia melalui HTTPS, 
permintaan yang telah ditingkatkan versinya akan gagal dan sumber daya tidak dapat dimuat. Ini akan menjaga 
keamanan laman Anda. 

Direktif `upgrade-insecure-requests` menurun ke dokumen `<iframe>`, 
sehingga memastikan seluruh laman terlindungi.

### Memblokir semua materi campuran

Tidak semua browser mendukung direktif permintaan-tidak aman-tingkatkan versi, sehingga 
alternatif untuk melindungi pengguna adalah direktif CSP 
[**`block-all-mixed-content`**](http://www.w3.org/TR/mixed-content/#strict-checking){: .external}.
 Direktif ini memerintahkan browser agar tidak memuat materi campuran; 
semua permintaan sumber daya materi campuran akan diblokir, termasuk materi campuran pasif 
maupun aktif. Opsi ini juga menurun ke dokumen `<iframe>`, 
sehingga memastikan seluruh laman bebas dari materi campuran.

Sebuah laman bisa menyertakan dirinya sendiri ke dalam perilaku ini, baik dengan mengirim header 
`Content-Security-Policy` dengan direktif ini:

  
    Content-Security-Policy: block-all-mixed-content  


Atau dengan menyematkan direktif yang sama secara inline dalam bagian `<head>` 
dokumen dengan menggunakan elemen `<meta>`:

  
    <meta http-equiv="Content-Security-Policy" content="block-all-mixed-content">


Kelemahan dari penggunaan `block-all-mixed-content` adalah, mungkin, karena semua 
materi diblokir. Ini adalah peningkatan keamanan, namun ini berarti sumber daya 
ini tidak lagi tersedia di laman. Hal ini mungkin merusak fitur dan 
materi yang diharapkan pengguna untuk tersedia. 

### Alternatif untuk CSP

Jika yang menjadi host situs Anda adalah platform seperti Blogger, Anda mungkin tidak memiliki 
akses untuk memodifikasi header & menambahkan CSP.
Sebagai gantinya, alternatif yang memadai barangkali adalah menggunakan perayap situs web untuk menemukan masalah 
di seluruh bagian situs untuk Anda, misalnya 
[HTTPSChecker](https://httpschecker.net/how-it-works#httpsChecker){: .external } 
atau 
[Mixed Content Scan](https://github.com/bramus/mixed-content-scan){: .external }


{# wf_devsite_translation #}
