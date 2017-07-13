project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Pemberitahuan push adalah salah satu kemampuan yang paling berharga dari aplikasi asli, dan kemampuan ini sekarang tersedia di web. Untuk mengoptimalkannya, notifikasi perlu tepat waktu, tepat, dan relevan.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-06-30 #}

# Pemberitahuan Push Web: Tepat Waktu, Relevan, dan Tepat {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}


<img src="images/cc-good.png" alt="Notifikasi Contoh" class="attempt-right">

Jika Anda menanyakan kepada sekelompok developer perihal fitur perangkat seluler apa yang hilang dari
web, maka pemberitahuan push selalu berada paling atas dalam daftar.

Pemberitahuan push web memungkinkan pengguna memilih pembaruan tepat waktu dari situs
yang mereka sukai dan memungkinkan Anda melibatkan mereka kembali secara efektif dengan materi
yang disesuaikan dan relevan. 

Push API dan Notification API membuka serangkaian peluang baru bagi
Anda untuk melibatkan kembali pengguna.

## Apakah service worker terlibat? {: #service-worker-involved }

Ya. Push berdasarkan pada service worker karena service worker beroperasi di
latar belakang. Ini berarti satu-satunya waktu menjalankan kode untuk pemberitahuan push (dengan
kata lain, satu-satunya waktu baterai digunakan) adalah saat pengguna berinteraksi dengan
notifikasi tersebut dengan mengekliknya atau menutupnya.   Jika Anda tidak familier dengannya,
lihatlah [pengantar service worker][service-worker-primer]. Kita akan menggunakan
kode service worker di bagian berikutnya bila kami menunjukkan kepada Anda cara mengimplementasikan push
dan notifikasi.

## Dua teknologi {: #two-technologies }

Push dan notifikasi menggunakan API yang berbeda namun saling melengkapi:
[**push**](https://developer.mozilla.org/en-US/docs/Web/API/Push_API) dipanggil
saat server memasok informasi ke service worker;
[**notifikasi**](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API)
adalah aksi service worker atau skrip laman web yang menampilkan informasi
kepada pengguna.

## Sebuah anatomi notifikasi kecil {: #anatomy }

Pada bagian berikutnya kami akan memberikan banyak gambar kepada Anda, namun kami
menjanjikan kode. Jadi, mari kita mulai. Dengan pendaftaran service worker Anda memanggil
`showNotification` pada objek pendaftaran.


    serviceWorkerRegistration.showNotification(title, options);
    

Argumen `title` muncul sebagai judul dalam notifikasi. Argumen `options`
adalah literal objek yang menetapkan properti lain dari notifikasi.
Sebuah objek opsi umum yang terlihat seperti ini:


    {
      "body": "Did you make a $1,000,000 purchase at Dr. Evil...",
      "icon": "images/ccard.png",
      "vibrate": [200, 100, 200, 100, 200, 100, 400],
      "tag": "request",
      "actions": [
        { "action": "yes", "title": "Yes", "icon": "images/yes.png" },
        { "action": "no", "title": "No", "icon": "images/no.png" }
      ]
    }
    
<img src="images/cc-good.png" alt="Example Notification" class="attempt-right">

Kode ini menghasilkan notifikasi seperti yang ada dalam gambar. Kode ini umumnya
menyediakan kemampuan yang sama seperti aplikasi asli. Sebelum mendalami
implementasi kemampuan itu, saya akan menampilkan cara menggunakan
kemampuan itu secara efektif.   Kita teruskan dengan menjelaskan mekanisme
implementasi pemberitahuan push, termasuk menangani izin dan
berlangganan, mengirim pesan dan meresponsnya.

## Bagaimana saya bisa mencobanya?

Ada sejumlah cara yang bisa Anda gunakan bersama fitur-fitur tersebut sebelum benar-benar memahami cara kerjanya, atau harus mengimplementasikannya. Pertama, lihat [contoh kami sendiri](https://github.com/GoogleChrome/samples/tree/gh-pages/push-messaging-and-notifications). Juga tersedia [Notification Generator](https://tests.peter.sh/notification-generator/) dari Peter Beverloo dan [push-api-demo](https://github.com/chrisdavidmills/push-api-demo) dari Chris Mills.

Note: Kecuali jika Anda menggunakan localhost, Push API memerlukan HTTPS.

<<../../../_common-links.md>>


{# wf_devsite_translation #}
