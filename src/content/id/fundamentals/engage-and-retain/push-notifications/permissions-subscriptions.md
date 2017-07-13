project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Meminta izin pengguna dan langganan untuk notifikasi harus semudah seperti menunjukkan notifikasi.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-06-30 #}

# Permintaan Izin dan Langganan Pengguna {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

Meminta izin pengguna dan langganan untuk notifikasi harus semudah seperti menunjukkan notifikasi.

Di bagian ini dan bagian lainnya, saya akan menunjukkan kepada Anda kode sebenarnya.
Penting untuk mengetahui dengan jelas tempat bit kode ini diimplementasikan. Ini
adalah tempat pemahaman service worker menjadi penting. Kode untuk
permintaan izin dan langganan pengguna dilakukan di kode aplikasi, bukannya
kode service worker. Service worker akan digunakan nanti saat kita
memproses pesan push dan menampilkannya kepada pengguna.

## Memeriksa izin {: #check-permissions }

Selalu periksa izin yang ada ketika laman dimuat. Jika izin
sudah diberikan, Anda dapat segera memulai pengiriman
notifikasi. Gunakan informasi ini untuk mengatur status setelan
izin. Contohnya ditampilkan di bawah ini. Supaya jelas, kita belum meminta
apa-apa.

Note: Demi kejelasan, contoh ini mengecualikan sejumlah pemeriksaan fitur
yang harus selalu Anda lakukan. Anda bisa melihat kode asli secara keseluruhan
di <a href='https://github.com/GoogleChrome/samples/tree/gh-pages/push-messaging-and-notifications'>
repo contoh GitHub kami</a>.


    function initialiseState() {
      if (Notification.permission !== 'granted') {
        console.log('The user has not granted the notification permission.');
        return;
      } else if (Notification.permission === “blocked”) {
       /* the user has previously denied push. Can't reprompt. */
      } else {
        /* show a prompt to the user */
      }

      // Use serviceWorker.ready so this is only invoked
      // when the service worker is available.
      navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
        serviceWorkerRegistration.pushManager.getSubscription()
          .then(function(subscription) {
            if (!subscription) {
              // Set appropriate app states.
              return;
            }
          })
          .catch(function(err) {
            console.log('Error during getSubscription()', err);
          });
      });
    }


## Hindari permintaan langganan dengan memuat-laman {: #avoid-page-load-requests }

Perhatikan bahwa contoh sebelumnya _tidak_ memanggil
`pushManager.subscribe()`, meskipun hal ini tampaknya menjadi respons logis untuk
mengetahui bahwa tidak ada langganan. Permintaan tersebut mungkin terlihat tepat waktu, tetapi karena Anda sama sekali belum tahu tentang pengguna dan mereka mungkin tidak
mengetahui apa pun tentang Anda, maka sulit untuk mengirimi mereka pesan
yang tepat atau relevan.

## Meminta izin {: #requesting-permission }

<figure class="attempt-right">
  <img src="images/news-prompt.png" alt="Pertama tanya sebelum mengirimkan notifikasi dan jelaskan mengapa.">
</figure>

Kapan pun Anda melakukannya, meminta izin adalah proses dua langkah.
Pertama, tanyakan apakah aplikasi Anda bisa mengirim notifikasi menggunakan pesan yang
menjelaskan dengan pasti mengapa Anda mengirimi mereka notifikasi.

Jika pengguna menyetujui, kita bisa mendapatkan langganan dari pengelola
push. Lakukan proses ini dengan memanggil `PushManager.subscribe()` (ditekankan di contoh
di bawah ini). Dalam contoh ini, kita memberikannya sebuah objek dengan `userVisibleOnly` disetel
ke `true` untuk memberitahukan kepada browser bahwa kita akan selalu menunjukkan notifikasi kepada
pengguna. Kami juga menyertakan `applicationServerKey`.


<div style="clear:both;"></div>

<pre class="prettyprint">
if ('showNotification' in ServiceWorkerRegistration.prototype) {
  navigator.serviceworker.ready
  .then(registration => {
    <strong>return registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: new Uint8Array([...])
    });</strong>
  })
  .then(subscription => {
    // Do something with the subscription.
  })
  .catch(error => {
    // Do something with the error.
  });
}
</pre>

Ini adalah hasil di Chrome.

![Permintaan izin Chrome.](images/news-permissions.png){:width="296px"}

### Apa yang dimaksud dengan applicationServerKey? {: #applicationserverkey }

Nilai `applicationServerKey` seharusnya dihasilkan oleh server Anda. Kami menyimpan
semua masalah sisi server untuk bagian berikutnya. Untuk sekarang, terdapat satu hal yang Anda perlu
ketahui tentang `applicationServerKey`: saat meneruskannya dalam kunci ke
`subscribe()` panggilan, pastikan
[Uint8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)
(larik berupa delapan bit tidak bertanda tangan integer).

## Pemicu dari tindakan tertentu {: #trigger-from-action }

<figure class="attempt-right">
  <img src="images/airline-prompt.png" alt="Prompt dengan tindakan spesifik.">
</figure>

Meminta izin untuk mengirim notifikasi sebagai respons atas
tindakan pengguna kontekstual tertentu. Hal ini memungkinkan Anda untuk menghubungkan notifikasi
dengan tujuan pengguna dan memperjelas kepada pengguna mengapa Anda ingin mengirim
notifikasi.

Misalnya, Jika situs maskapai penerbangan ingin memberi tahu pengguna tentang penundaan penerbangan,
mereka akan menampilkan kotak centang opt-in secara mencolok dan hanya meminta
izin notifikasi setelah pengguna memilih untuk ikut serta.

<div style="clear:both;"></div>

## Menyediakan tempat untuk mengelola notifikasi {: #manage-notifications }

Memudahkan pengguna untuk mengubah dan bahkan menonaktifkan notifikasi untuk situs Anda.
Hal ini mencegah pengguna dari mematikan notifikasi di tingkat browser atau perangkat.

Tambahkan tombol notifikasi di tempat dengan visibilitas tinggi. Juga, berikan label untuk
menunjukkan pengguna apa yang Anda inginkan dengan mengirimi mereka, bukan bagaimana itu diimplementasikan. Pengguna tidak
lebih tahu tentang apa itu 'pemberitahuan push' dibandingkan yang Anda ketahui tentang cara mengatur
orbit kapal Soyuz.

<div class="attempt-left">
  <figure>
    <img src="images/flight-delay.png">
    <figcaption class="success">
      <b>Lakukan:</b> Tombol notifikasi yang menunjukkan notifikasi yang akan dimuat.
    </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/send-push.png">
    <figcaption class="warning">
      <b>Jangan:</b> Tombol notifikasi yang menunjukkan bagaimana notifikasi diimplementasikan.
    </figcaption>
  </figure>
</div>
<div style="clear:both;"></div>


## Memberikan langganan ke server {: #passing-subscription }

Setelah memperoleh izin pengguna untuk mengirim notifikasi dan menyetel status
kontrol terkait, Anda harus mengirimkan informasi langganan (disebut
"Push Resource" di spesifikasi) ke server push. Hal ini melibatkan pembuatan
objek permintaan yang tepat yang berisi data langganan, kemudian memberikannya ke
server.

Ketika Anda membuat permintaan (ditekankan di contoh bawah ini), gunakan kata kerja `POST`
dan header `Content-Type` dari `application/json`. Untuk tubuhnya, Anda harus
mengubah objek langganan menjadi string. Kita akan mengamati apa yang ada dalam objek ini
pada bagian berikutnya, [Mengirim Pesan](sending-messages). Gunakan `fetch()`
untuk mengirimkan permintaan langganan ke server.

<pre class="prettyprint">
if ('showNotification' in ServiceWorkerRegistration.prototype) {
  navigator.serviceworker.ready
  .then(registration => {
    return registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: new Uint8Array([...])
    });
  })
  <strong>.then(subscription => {
    var fetchOptions = {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(subscription)
    };
    return fetch('/your-web-server/api', fetchOptions);
  })</strong>
  .catch(error => {
    // Do something with the error.
  });
}
</pre>


{# wf_devsite_translation #}
