---

title: "Dukungan Integrasi Native"
description: "Gunakan Add to Home Screen dan integrasikan Progressive Web App Anda dengan platform native."

---

<p class="intro">
Tak seorang pun suka ketika harus mengetikkan URL yang panjang di keyboard ponsel. 
Dengan fitur Add to Home Screen, pengguna bisa 
menambahkan link shortcut ke perangkat mereka seperti mereka akan menginstal aplikasi native
dari App Store, tetapi dengan lebih sedikit kesulitan.
</p>

{% include shared/toc.liquid %}

## Web App Install Banner dan Add to Homescreen untuk Chrome di Android

Web app install banner memberi Anda kemampuan untuk membuat pengguna Anda 
menambahkan aplikasi web Anda ke layar awal mereka dengan cepat dan
mulus, sehingga mudah untuk memulai dan kembali ke aplikasi Anda. Menambahkan app install banner sangat mudah, dan Chrome menangani sebagian
dari beban pekerjaan untuk kemudahan Anda. Kita hanya perlu menyertakan file web app manifest
dengan menyertakan beberapa rincian aplikasi.


Chrome kemudian menggunakan beberapa kriteria, termasuk penggunaan service worker, status SSL
dan heuristik frekuensi kunjungan untuk menentukan kapan browser akan menampilkan banner Add to Home Screen. Sebagai 
tambahan lain, pengguna bisa menambahkannya secara manual melalui menu "Add to Home Screen" dari 
Chrome.

### Deklarasikan sebuah app manifest dengan file manifest.json

Web app manifest adalah file JSON sederhana yang memberi Anda, pengembang web, 
kemampuan untuk mengontrol bagaimana aplikasi Anda muncul kepada pengguna di area
yang mereka harapkan (misalnya layar awal ponsel), mengarahkan 
kepada apa yang bisa dijalankan pengguna dan yang lebih penting lagi, bagaimana mereka menjalankannya.

Menggunakan web app manifest, aplikasi web Anda bisa:

* Memiliki tampilan yang berselera tinggi di layar awal Android
* Bisa dijalankankan dalam mode layar penuh pada Android tanpa tampilan URL
* Mengatur orientasi layar untuk tampilan yang lebih optimal
* Menentukan "splash screen" dan warna tema untuk situs
* Melacak apakah Anda menjalankan aplikasi dari layar awal atau dari alamat URL

{% highlight javascript %}
{
  "name": "Weather",
  "short_name": "Weather",
  "icons": [{
    "src": "images/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png"
    }, {
      "src": "images/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    }, {
      "src": "images/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png"
    }, {
      "src": "images/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    }, {
      "src": "images/icons/icon-256x256.png",
      "sizes": "256x256",
      "type": "image/png"
    }],
  "start_url": "/index.html",
  "display": "standalone",
  "background_color": "#3E4EB8",
  "theme_color": "#2F3BA2"
}
{% endhighlight %}

Cara yang mudah untuk melacak bagaimana aplikasi ini dijalankan adalah dengan menambahkan query string ke
parameter `start_url` dan kemudian menggunakan serangkaian analisis untuk melacak query string.
Jika Anda menggunakan metode ini, jangan lupa untuk memperbarui daftar file cache oleh App
Shell untuk memastikan bahwa file dengan query string juga di-cache-kan.

### Beritahu browser tentang file manifest Anda

Tambahkan berikut ke `<head>` dari file `index.html` Anda:
`<link rel="manifest" href="/manifest.json">`

### Praktek Terbaik (Best Practice)

* Tempatkan link manifest pada semua halaman situs Anda, sehingga akan direview oleh
  Chrome pada saat pengguna melakukan kunjungan yang pertama, tidak peduli di halaman mana mereka berkunjung.
* `short_name` lebih disukai di Chrome dan akan digunakan jika ada mengalahkan
  field `name`.
* Tentukan kumpulan icon untuk layar dengan kepadatan yang berbeda-beda. Chrome akan mencoba untuk menggunakan
  ikon paling dekat dengan 48dp, misalnya, 96px pada perangkat 2x atau 144px untuk 
  perangkat 3x.
* Jangan lupa untuk menyertakan ikon dengan ukuran yang masuk akal untuk splash screen
  dan jangan lupa untuk mengatur `background_color`.


Bacaan lebih lanjut:
[Penggunaan app install
banner](https://developers.google.com/web/fundamentals/engage-and-retain/simplified-app-installs/)

## Elemen Add to Homescreen untuk Safari di iOS

Dalam file `index.html` Anda, tambahkan yang berikut di bagian `<head>`:

{% highlight html %}
<!-- Add to home screen untuk Safari di iOS -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="apple-mobile-web-app-title" content="Weather App">
<link rel="apple-touch-icon" href="images/icons/icon-152x152.png">
{% endhighlight %}

## Tile Icon untuk Windows

Dalam file `index.html` Anda, tambahkan yang berikut di bagian `<head>`:

{% highlight html %}
<meta name="msapplication-TileImage" content="images/icons/icon-144x144.png">
<meta name="msapplication-TileColor" content="#2F3BA2">
{% endhighlight %}

## Pengujian

* Coba tambahkan aplikasi ke layar awal di Chrome di Android dan pastikan
  layar peluncuran muncul dengan benar dan ikon yang tepat digunakan.
* Cek juga Safari dan Internet Explorer untuk memastikan ikon muncul dengan benar.

<a href="https://weather-pwa-sample.firebaseapp.com/final/" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">Cobalah</a>

