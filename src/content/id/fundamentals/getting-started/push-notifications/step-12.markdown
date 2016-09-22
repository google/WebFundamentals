---

title: "Selamat!"
description: "Selamat! Anda telah membangun sebuah aplikasi web yang memungkinkan Push Notification."
translators:
  - abdshomad
---

{% include shared/toc.liquid %}

Santai dulu. Anda telah membangun sebuah aplikasi web yang memungkinkan Push Notifications!

<div class="wf-highlight-list wf-highlight-list--learning">
  <h3 class="wf-highlight-list__title">Note</h3>
  <ul class="wf-highlight-list__list">
    <li>
      Pastikan untuk melihat ke
      <a href="/web/fundamentals/engage-and-retain/push-notifications/">
      Push Notification</a> untuk mendapatkan best practice dan rincian lebih lanjut tentang cara menggunakan
      Web Push Notifications.
    </li>
  </ul>
</div>

## Pertanyaan yang Sering Diajukan (Frequently Asked Questions)

* **Service worker saya tidak ter-update!**<br>
Anda yakin? Periksa tab source di _chrome://serviceworker-internals_. Jika service worker
benar-benar tidak ter-update, restart Chrome.

* **Saya telah mencoba semuanya, tapi service worker saya masih tidak ter-update:^|**<br>
Apakah Anda memeriksa dan memvalidasi kode Anda? Jika kode service worker Anda tidak dapat
di-parsing, dia tidak akan bisa ter-instal.

* **Request saya ke GCM gagal**<br>
Periksa project Anda di [console.developers.google.com](https://console.developers.google.com/). Pastikan bahwa _gcm\_sender\_id_ cocok dengan Project Number dan nilai Authorization
key cocok dengan API key. Pastikan Anda mencarinya di projek yang benar!

* **Request ke GCM berjalan, tapi event push tidak bisa diterima**<br>
Periksa subscription ID dari console untuk _main.js_. Apakah subscription
ID ada dalam array ID untuk request Anda dengan benar? Pastikan Anda telah meng-enable-kan
Messaging API di 
[console.developers.google.com](https://console.developers.google.com/).

* **Saya menemukan yang tidak saya fahami**<br>
Cobalah untuk menggunakan Chrome Canary: yang memberikan pesan error lebih informatif tentang
kesalahan di service worker.

* **Saya tidak bisa melihat log console untuk event di service worker saya**<br>
Anda hanya akan mendapatkan event install dan activate pada saat pertama kalinya Anda menggunakan
service worker atau pada saat kode berubah. Event yang dimulai hanya akan dijalankan 
sekali untuk setiap session service worker.

* **Bagaimana dengan Firefox?**<br>
[Pada Firefox
42](https://groups.google.com/forum/#!topic/mozilla.dev.platform/BL6TrHN73dY) Push API sudah on secara default.

## Apa yang telah kita bahas

* Instal service worker dan menangani event
* Set up akun Google Cloud Messaging (GCM)
* Menambahkan web manifest
* Mengaktifkan service worker untuk menangani event Push Message
* Mengirimkan permintaan ke GCM melalui cURL atau XHR
* Menampilkan notification
* Menangani klik di notification

## Langkah Berikutnya

* Service worker codelab (jika Anda belum melakukannya!)

## Menyelam Lebih Dalam

* [Dokumentasi Web Push Notification](/web/fundamentals/engage-and-retain/push-notifications/)
* [Menggunakan VAPID dan Web Push Protocol](/web/updates/2016/07/web-push-interop-wins)
* [Dokumentasi Google Cloud Messaging](https://developers.google.com/cloud-messaging/)
* [Panduan Android Material Design Notifications](https://www.google.com/design/spec/patterns/notifications.html)
