---

title: "Kirim request dari command line GCM untuk mendorong pesan Push Notification"
description: "Chrome uses Google Cloud Messaging (GCM) for push
messaging. To get GCM to push a notification to your web client, you can send GCM a request from the command line."
translators:
  - abdshomad
---

{% include shared/toc.liquid %}

Seperti yang Anda lihat sebelumnya, Chrome menggunakan Google Cloud Messaging (GCM) untuk push
messaging.

Agar bisa GCM mendorong notification ke klien web Anda, Anda perlu mengirim GCM sebuah
permintaan yang berisi:

* **public API key** yang Anda buat sebelumnya, yang terlihat seperti ini:<br>
  <br>
  _AIzaSyAc2e8MeZHA5NfhPANea01wnyeQD7uVY0c_<br>
  <br>
  GCM akan mencocokkan dengan Project Number yang Anda dapatkan dari Google Developer
  Console untuk digunakan sebagai nilai `gcm_sender_id` di manifest.

* **Content-Type header** yang sesuai, seperti `application/json`.

* Array dari **subscription ID**, yang masing-masing sesuai dengan 
  aplikasi klien masing-masing. Kode ini adalah bagian terakhir dari subscription endpoint URL, dan terlihat
  seperti ini: <br>
  <br>
  _APA91bHMaA-R0eZrPisZCGfwwd7z1EzL7P7Q7cyocVkxBU3nXWed1cQYCYvF
  glMHIJ40kn-jZENQ62UFgg5QnEcqwB5dFZ-AmNZjATO8QObGp0p1S6Rq2tcCu
  UibjnyaS0UF1gIM1mPeM25MdZdNVLG3dM6ZSfxV8itpihroEN5ANj9A26RU2Uw_

Untuk situs atau aplikasi yang sebenarnya, Anda perlu mengatur sebuah layanan untuk berinteraksi
dengan GCM dari server Anda. (Ada beberapa contoh kode untuk melakukan hal itu di
[Push Notifications pada Open 
Web](/web/updates/2015/03/push-notifications-on-the-open-web).) Untuk codelab ini, Anda dapat mengirim permintaan dari terminal atau dari aplikasi yang berjalan di browser.

Anda dapat mengirim permintaan ke GCM menggunakan utilitas cURL.

Jika Anda belum pernah menggunakan cURL sebelumnya, Anda mungkin bisa mempelajarinya di tautan berikut:

* [Panduan Memulai](http://ethanmick.com/getting-started-with-curl)
* [Dokumentasi Referensi](http://curl.haxx.se/docs/manpage.html)

Perintah cURL untuk mengirim permintaan ke GCM untuk mengeluarkan Push Message terlihat seperti
ini:
_curl --header "Authorization: key=**&lt;PUBLIC\_API\_KEY&gt;**" --header "Content-Type: application/json" https://android.googleapis.com/gcm/send -d "{\"registration\_ids\":[\"**&lt;SUBSCRIPTION\_ID&gt;**\"]}"_

 Mari kita lihat aksinya...

## 1. Membuat permintaan ke GCM

Dari terminal Anda, jalankan perintah cURL di bawah - tetapi pastikan untuk menggunakan 
API key dan subscription ID yang Anda buat sebelumnya:

{% highlight bash %}
curl --header "Authorization: key=XXXXXXXXXXXX" --header "Content-Type: application/json" https://android.googleapis.com/gcm/send -d "{\"registration_ids\":[\"fs...Tw:APA...SzXha\"]}"
{% endhighlight %}

## 2. Periksa response

Jika semuanya berjalan baik, Anda akan melihat response seperti ini di terminal:

<img src="images/image16.png" width="890" height="551" alt="Screenshot terminal BASH: response sukses terhadap request cURL ke GCM untuk mengirimkan sebuah Push Message" />

Jika ada kesalahan otorisasi, periksa nilai Authorization key. Jika response menunjukkan kesalahan pendaftaran yang tidak valid, periksa subscription ID yang Anda gunakan.

## 3. Pemeriksaan lebih lanjut

Lihat ke _chrome://serviceworker-internals_. Pastikan Anda melihat sesuatu
seperti ini:

<img src="images/image17.png" width="1547" height="492" alt="Screenshot Chrome DevTools:  Push Message diterima" />

Cobalah meminta pemberitahuan untuk dua endpoint yang berbeda dengan membuka aplikasi di Chrome Canary bersamaan dengan Chrome.

Pastikan untuk menempatkan escaped quote untuk masing-masing subscription ID.

## 4. Cobalah mengubah window focus

Coba tutup atau pindah fokus dari tab browser yang menjalankan 
aplikasi Anda. Pastikan Anda melihat pemberitahuan seperti ini:

<img src="images/image18.png" width="373" height="109" alt="Screenshot Push Notification: 'Situs ini telah diperbarui di latar belakang'" />

**Penting**: Setiap klien yang berlangganan ke Push Messaging akan memiliki subscription ID sendiri. Jika Anda mengirim permintaan ke GCM untuk mengirimkan pemberitahuan, ingat untuk menyertakan subscription ID untuk semua klien yang ingin Anda kirim pesan! Jika Anda membangun setiap langkah dari codelab ini secara terpisah, setiap langkah akan mewakili endpoint yang berbeda dan karena itu memiliki subscription ID yang berbeda.