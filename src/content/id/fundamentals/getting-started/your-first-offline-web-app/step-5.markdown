---

title: "Mendaftarkan Service Worker ke situs"
translators:
  - abdshomad
---

Langkah pertama untuk membuat aplikasi berjalan secara offline adalah dengan mendaftarkan service worker, script yang memungkinkan fungsi latar belakang tanpa perlu ada halaman web yang terbuka atau interaksi pengguna.

Perlu dua langkah sederhana:

1. Buat file javascript yang akan menjadi service worker.
1. Beritahu browser untuk mendaftarkan file javascript sebagai "service worker".

Pertama, buat file kosong dengan nama `sw.js` dan tempatkan di folder `/app`. (Folder ini
adalah folder root untuk aplikasi). Anda perlu mengikuti ini karena ruang lingkup
service worker (serangkaian url di mana ServiceWorker bisa dimuat) 
didefinisikan oleh direktori di mana ia berada. Jika tidak berada pada direktori yang benar
maka ServiceWorker tidak akan berfungsi untuk aplikasi offline (ini berarti 
Anda tidak dapat menempatkannya di direktori script.)

Sekarang buka file `index.html` di folder /app dan tambahkan kode berikut di bagian paling bawah.

{% highlight javascript %}
<script>
if('serviceWorker' in navigator) {
  navigator.serviceWorker
           .register('/sw.js')
           .then(function() { console.log("Service Worker Terdaftar!"); });
}
</script>
{% endhighlight %}

Kode di atas akan memeriksa apakah browser mendukung service worker dan bila didukung
service worker akan memanggil method register dan mengembalikan Promise. Setelah pendaftaran
selesai, browser akan memenuhi Promise dan memanggil fungsi di klausul
`.then()`. (Catatan: ini terjadi secara asynchronous.)

Mulailah server di localhost dan perhatikan perubahan situs berikutnya.

{% highlight javascript %}
$ cd app
$ python -m SimpleHTTPServer 3000
{% endhighlight %}

Buka `chrome://serviceworker-internals/` di Chrome. Jendela ini akan menampilkan daftar
semua service worker yang terdaftar dan akan memungkinkan Anda untuk memeriksa Chrome DevTools 
sebelum service worker terinstal. Hal ini penting jika Anda ingin
mendebug fase `install` dari service worker.

<img src="images/image02.png" width="624" height="350" />  
Muatlah aplikasi web, buka DevTools Chrome dan jika berhasil, Anda akan melihat "Service Worker 
Terdaftar" di Chrome DevTools. Ini baru langkah pertama untuk mengintegrasikan 
service worker ke dalam aplikasi Anda. Kode ini belum membuat aplikasi Anda berjalan secara offline, tapi kita
sudah memulai perjalanan ke arah sana.

<img src="images/image03.png" width="624" height="350" />
  
### Pertanyaan yang Sering Diajukan (Frequently Asked Questions)

**Mengapa service worker dijalankan di root? Mengapa saya tidak bisa menempatkannya dalam direktori `/scripts`?**

Untuk alasan keamanan, service worker hanya dapat mengontrol halaman yang 
berada pada direktori yang sama atau di bawahnya. Ini berarti bahwa jika Anda menempatkan
file service worker di direktori script, service worker hanya akan mampu 
mengkontrol file-file di dalam direktori /script dan bawahnya (/scripts/test/ 
sebagai contoh). Biasanya tidak mungkin halaman Anda hidup di sana.



