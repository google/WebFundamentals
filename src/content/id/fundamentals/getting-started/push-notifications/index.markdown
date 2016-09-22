---

title: "Aplikasi web pertama Anda dengan push notifications"
description: "Dalam codelab ini, Anda akan belajar bagaimana menambahkan Push Notification ke dalam aplikasi web. Ini memungkinkan Anda untuk mengajak kembali pengguna dengan mengirimkan berita dan informasi tentang konten baru."
translators:
  - abdshomad
---

<div class="wf-highlight-list wf-highlight-list--learning">
  <h3 class="wf-highlight-list__title">Note</h3>
  <ul class="wf-highlight-list__list">
    <li>
      Pastikan untuk mengunjungi
      <a href="/web/fundamentals/engage-and-retain/push-notifications/">
      Push Notification</a> berisi penjelasan best practice dan rincian lebih lanjut tentang cara menggunakan
      Web Push Notifications.
    </li>
  </ul>
</div>

<img src="images/image00.png" width="373" height="93" alt="Screenshot dari push notification" />

Dalam codelab ini, Anda akan belajar bagaimana menambahkan Push Notifications ke applikasi web.

Ini memungkinkan Anda untuk mengajak pengguna kembali dengan menyajikan berita dan informasi tentang
konten baru.

Anda juga akan mempelajari dasar-dasar tentang service worker.

## Yang akan Anda pelajari

* Dasar-dasar service worker: instalasi dan event handling
* Bagaimana menyiapkan akun Google Cloud Messaging (GCM) account
* Bagaimana menambahkan web manifest
* Teknik untuk meminta GCM mengirimkan notification ke web client
* Menampilkankan Notification 
* Penanganan klik Notification

## Apa yang akan anda butuhkan

* Chrome 42 atau lebih tinggi
* Pemahaman dasar tentang [git](https://git-scm.com/), dan [Chrome DevTools](/web/tools/chrome-devtools)
* Berpengalaman dengan [Promises](http://www.html5rocks.com/en/tutorials/es6/promises/) dan [service worker](http://www.html5rocks.com/en/tutorials/service-worker/introduction/) juga akan bermanfaat, tapi tidak menjadi keharusan
* Contoh kode
* Editor teks
* Window terminal untuk menjalankan alat baris perintah (command line tools)
* Python atau web lokal server sederhana (lihat di bawah)
