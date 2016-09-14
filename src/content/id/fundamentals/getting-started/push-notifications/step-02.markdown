---

title: "Menjalankan web server lokal"
description: "Setup dan jalankan web server lokal"
---

**Menjalankan web server di localhost**

Untuk menyelesaikan codelab ini Anda akan perlu menjalankan web server lokal. Anda mungkin
sudah memiliki web server lokal sendiri untuk ini. Jika belum, buka window terminal,
arahkan ke direktori **_push-notifications_** yang Anda buat ketika Anda
mengunduh kode (pada langkah sebelumnya) dan jalankan perintah Python berikut untuk memulai server:

{% highlight bash %}
$ python -m SimpleHTTPServer
{% endhighlight %}

Perintah di atas memulai web server pada port default HTTP. Arahkan browser Anda ke [localhost](http://localhost) untuk melihat daftar **_push-notifications_**.

Untuk melihat hasil pekerjaan Anda di direktori **_app_**, arahkan browser Anda ke [localhost/app](http://localhost/app). Untuk melihat contoh kode selengkapnya untuk setiap langkah, arahkan ke direktori di [localhost/completed](http://localhost/completed).

Jika Anda tidak memiliki Python, Anda bisa mendapatkannya [di sini](https://www.python.org/downloads/). Jika ada masalah menjalankan server, [cek](https://www.google.com/search?q=what+is+using+port) bahwa tidak ada layanan lain menggunakan port yang dipilih oleh SimpleHTTPServer.

Contoh baris perintah di codelab ini menggunakan bash shell.

Pengguna Windows perlu menggunakan perintah MS-DOS dari Command Prompt: periksa panduan ini untuk perintah bash/DOS yang setara. Sebagai alternatif, Anda bisa menggunakan lingkungan Cygwin.

 Atau, Anda bisa menggunakan web server lain seperti [XAMPP](https://www.apachefriends.org/index.html) atau [MAMP](https://www.mamp.info/en/).