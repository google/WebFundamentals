project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Ada cara yang tepat dalam menggunakan notifikasi, dan cara menggunakannya dengan lebih baik. Pelajari apa yang membuat notifikasi bagus. Kami tidak hanya menunjukkan apa yang harus Anda lakukan. Kami akan menunjukkan cara melakukannya.

{# wf_updated_on: 2016-09-12 #}
{# wf_published_on: 2016-06-30 #}

# Apa yang Membuat Notifikasi Bagus? {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

<figure class="attempt-right">
  <img src="images/tpnr.png" alt="Tepat waktu, tepat, dan relevan">
  <figcaption>Tepat waktu, tepat, dan relevan</figcaption>
</figure>

Jangan ganggu pengguna, atau Anda akan kehilangan akses ke mereka selamanya. Apakah kita perlu
mengatakan sesuatu yang melebihi itu? Ya, karena lebih mudah diucapkan daripada dilakukan. 

Pemberitahuan push adalah salah satu kemampuan yang paling berharga dari aplikasi asli, 
dan kemampuan ini sekarang tersedia di web. Untuk memanfaatkan mereka secara maksimal,
notifikasi harus tepat waktu, tepat, dan relevan.

**Tepat waktu**—Notifikasi tepat waktu adalah notifikasi yang muncul saat pengguna menginginkannya dan ketika
itu penting bagi mereka.

**Tepat**—Notifikasi tepat adalah notifikasi yang memiliki informasi spesifik yang bisa
ditindaklanjuti dengan segera.

**Relevan**—Pesan yang relevan adalah pesan tentang orang atau hal-hal yang dipedulikan
pengguna.

<div style="clear:both;"></div>


## Tepat waktu {: #timely }

Notifikasi tepat waktu adalah notifikasi yang muncul saat pengguna menginginkannya dan
ketika itu penting bagi mereka. Tepat waktu berarti tepat waktu untuk pengguna, tidak selalu tepat waktu
untuk Anda.

### Tetap tersedia tanpa melihat konektivitas {: #make-it-available }

Anda sebaiknya menunjukkan sebagian besar pemberitahuan dengan segera. Ada alasan untuk menahan
pemberitahuan sebelum menunjukkannya, salah satunya adalah bahwa push payload mungkin tidak
didukung pada semua platform, sehingga Anda mungkin harus mengambil informasi penting
sebelum menampilkannya.

Sampai sekarang hanya aplikasi seluler yang bisa melakukan ini. Dengan service worker Anda bisa
menyimpan notifikasi sampai pengguna menginginkannya. Ketika pengguna mengekliknya, status
jaringan tidak relevan.


    self.addEventListener('push', event => {
      var dataPromise;
      if (data in event) {
        dataPromise = Promise.resolve(event.data.json());
      } else {
        dataPromise = fetch('notification/end/point/data.json')
          .then(response => {
            return response.json();
          });
      }
    
      event.waitUntil(
        dataPromise
        .then(msgData => {
          // Now tell the user.
          return self.registration.showNotification(data.title, {
            // Whether you show data and how much you show depends on
            // content of the data itself.
            body: event.data.body,
            icon: 'images/icon.png'
          });
        })
      );
    }); 
    

### Gunakan getaran dengan bijak {: #vibrate-judiciously }

Getaran mungkin tampak seperti hal yang aneh untuk masuk daftar di bawah tepat waktu. Pada kenyataannya, hal ini terkait
erat dan ada beberapa masalah.

Pertama, getaran mungkin tampak seperti cara yang ideal untuk membuat pengguna menyadari ada notifikasi
baru. Tapi tidak semua pengguna mengaktifkan getaran dan beberapa perangkat
tidak bisa bergetar. Akibatnya, setiap urgensi yang hendak Anda komunikasikan dengan
getaran bisa hilang.

Kedua, membuat setiap notifikasi bergetar bisa menciptakan kesan palsu urgensi.
Jika pengguna terus diganggu oleh notifikasi yang tidak sepenting
kelihatannya, mereka mungkin mematikan notifikasi sepenuhnya.

Singkatnya, biarkan pengguna menentukan sendiri penggunaan getaran. Berikan mereka opsi untuk
memilih notifikasi mana yang menggunakan getaran atau apakah tidak menggunakannya sama sekali. Jika Anda
memiliki kategori notifikasi yang berbeda, Anda bisa memperbolehkan mereka memilih
pola getaran yang berbeda.

Yang terakhir, ingat bahwa untuk bergetar, perangkat seluler harus menjalankan motor, dan motor
menggunakan daya lebih besar dari notifikasi di layar.

## Tepat {: #precise }

Notifikasi tepat adalah notifikasi yang memiliki informasi spesifik yang bisa ditindaklanjuti
dengan segera. Perhatikan kembali gambar dari pelajaran anatomi.

![Notifikasi tepat memiliki informasi spesifik.](images/flight-delayed-good.png){:width="316px"}

Anda akan diberi tahu semua yang perlu diketahui dalam sekejap:

* Siapa yang mengirim pesan - maskapai.
* Apa yang terjadi - penerbangan Anda yang baru ditunda.
* Apa lagi - waktu penerbangan Anda yang baru.


### Tawarkan informasi yang cukup bahwa pengguna tidak perlu mengunjungi situs Anda {: #offer-enough }

Ini mungkin tidak sesuai dalam setiap kejadian, namun jika suatu informasi cukup
sederhana untuk disampaikan di ruang kecil, jangan buat pengguna membuka situs web Anda untuk
membacanya. Misalnya, jika Anda ingin memberi tahu satu pengguna mengenai balasan dari pengguna lain,
maka jangan tampilkan pesan yang mengatakan, "Notifikasi baru". Tampilkan yang mengatakan,
'Peter berkata, "Tidak"'.

<div class="attempt-left">
  <figure>
    <img src="images/pete-replied.png">
    <figcaption class="success"><b>Lakukan:</b> Tawarkan informasi yang cukup
    sehingga pengguna tidak perlu berkunjung.</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/new-missive.png">
    <figcaption class="warning"><b>Jangan:</b> Jangan membuat pesan Anda
    tidak jelas dan samar.</figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

Hal ini penting terutama untuk informasi penting.

<div class="attempt-left">
  <figure>
    <img src="images/extreme-danger.png">
    <figcaption class="success"><b>Lakukan:</b> Tawarkan informasi yang cukup
    sehingga pengguna tidak perlu berkunjung.</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/suggestion.png">
    <figcaption class="warning"><b>Jangan:</b> Jangan membuat pesan Anda
    tidak jelas dan samar.</figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

### Letakkan tindakan tepat dalam notifikasi {: #offer-actions }

Kita sudah melihat ini beberapa kali, bahkan pelajaran anatomi menunjukkan cara
menambahkannya ke notifikasi. Service worker harus memproses tindakan tersebut.
Lakukan ini di kejadian `notificationclick`.


    self.addEventListener('notificationclick', event => {
      var messageId = event.notification.data;
      
      event.notification.close();
    
      if (event.action) {
        // Send the response directly to the server.
      } else {
        // Open the app.
      }
    }, false);
    

### Membuat judul dan materi spesifik {: #specific-title }

Buat judul yang relevan dengan konteks pesan dan muat sesuatu
yang spesifik dari pesan. Materi yang sudah diketahui penerima, seperti nama
aplikasi Anda, tidak akan membantu. Begitu pula informasi yang tidak diketahui penerima,
seperti teknologi yang digunakan untuk mengirim pesan.

<div class="attempt-left">
  <figure>
    <img src="images/flight-delayed-good.png">
    <figcaption class="success"><b>Lakukan:</b> Membuat judul yang memuat
    sesuatu yang spesifik dari pesan.</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/cc-bad.png">
    <figcaption class="warning"><b>Jangan:</b> Jangan sertakan
    informasi yang sudah diketahui atau tidak dimengerti pengguna.</figcaption>
  </figure>
</div>
<div style="clear:both;"></div>

### Letakkan informasi penting di depan

Ini berarti menempatkan informasi yang penting untuk pengguna di bagian
notifikasi yang mendapat perhatian besar. Misalnya, di bahasa barat
teks dibaca dari kiri ke kanan dan dari atas ke bawah, jadi aplikasi perpesanan mungkin menempatkan nama pengirim di bagian atas dan kiri.


<div class="attempt-left">
  <figure>
    <img src="images/pete-replied.png">
    <figcaption class="success"><b>Lakukan:</b> Nama pengirim di 
    bagian atas dan kiri.</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/new-missive.png">
    <figcaption class="warning"><b>Jangan:</b> Informasi di bagian
    atas dan kiri adalah berlebihan.</figcaption>
  </figure>
</div>
<div style="clear:both;"></div>

### Jaga pesan tetap singkat {: #keep-it-short }

Notifikasi bukanlah email. Maksud dari notifikasi adalah untuk menggoda pengguna sehingga
mereka membuka aplikasi Anda. Objek `PushMessageData` memungkinkan Anda mengirim data ke
pengguna dengan segera, namun Anda mungkin tidak ingin menampilkan semua data tersebut ke pengguna,
terutama jika data tambahan mungkin menumpuk di server setelah notifikasi
dikirim.

## Relevan {: #relevant }

Pesan yang relevan adalah pesan tentang orang atau hal-hal yang dipedulikan pengguna.

### Lebih mengutamakan pengguna yang login {: #prefer-logged }

Hanya minta izin notifikasi dari pengguna yang login.
Jika Anda tidak tahu siapa pengguna, akan sulit untuk mengirimi mereka notifikasi
yang relevan. Dan jika notifikasi tidak relevan, pengguna mungkin menyebutnya
spam.

### Jangan mengulang informasi {: #dont-repeat }

Anda hanya memiliki sedikit ruang untuk menyampaikan banyak informasi. Jangan menyia-nyiakannya dengan menduplikasi
informasi antara bagian-bagian notifikasi. Informasi duplikat mungkin
relevan, namun menghilangkan duplikasi akan memberi Anda ruang ekstra untuk informasi
lainnya. Misalnya jika judul berisi hari dalam seminggu,
jangan memuatnya lagi dalam daftar di tubuh.

<div class="attempt-left">
  <figure>
    <img src="images/notification-no-dup-content.png">
    <figcaption class="success"><b>Lakukan:</b> Informasi dalam judul
    jangan diulang.</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/notification-dup-content.png">
    <figcaption class="warning"><b>Jangan:</b> Materi pesan mengulangi informasi dalam judul.</figcaption>
  </figure>
</div>
<div style="clear:both;"></div>

Juga, jika aplikasi terbuka, ada kemungkinan informasi baru sudah di
layar. Alih-alih notifikasi, gunakan UI aplikasi untuk memberi tahu pengguna.

### Jangan mengiklankan aplikasi asli Anda {: #dont-advertise-native }

Inti dari service worker, teknologi di belakang pemberitahuan push, adalah bahwa
Anda bisa menghindari waktu dan biaya dari menulis sebuah aplikasi terpisah dari
situs web Anda. Pengguna yang memiliki service worker dan aplikasi asli Anda mungkin menerima
notifikasi duplikasi kecuali Anda menulis kode sisi-server untuk mencegahnya. Anda bisa 
menghindari masalah ini sama sekali; jangan dorong pengguna untuk menjalankan keduanya.

### Jangan beriklan {: #dont-advertise }

Anda akan memiliki kesempatan untuk memonetisasi pengalaman pengguna setelah mereka berada di dalam
aplikasi. Jangan menghancurkannya dengan melakukan spam ke pengguna. Jika Anda melakukan spam notifikasi ke
pengguna, Anda mungkin kehilangan mereka semua.

### Jangan sertakan nama situs web atau domain Anda {: #no-website }

Notifikasi telah berisi nama domain Anda, dan ruang juga sempit.

<div class="attempt-left">
  <figure>
    <img src="images/chrome-notification.png" alt="Nama domain dalam notifikasi Chrome.">
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/firefox-notification.png" alt="Nama domain dalam notifikasi Firefox.">
  </figure>
</div>
<div style="clear:both;"></div>

### Membuat ikon kontekstual {: #contextual-icon }

<figure class="attempt-right">
  <img src="images/still-up.png">
  <figcaption class="warning"><b>Jangan:</b> Gunakan ikon generik.
  </figcaption>
</figure>

Ikon harus menyatakan sesuatu tentang pesan yang mereka sertai. Pertimbangkan contoh
ini.

Ini memberi tahu kita siapa sebenarnya yang mengirim pesan tersebut. Namun, ikon yang dalam banyak
notifikasi adalah logo situs atau aplikasi, tidak memberi tahu apa pun.

<div style="clear:both;"></div>

Jadi, mari kita menggunakan gambar profil pengirim.

<figure class="attempt-right">
  <img src="images/contextual-icon.png">
  <figcaption class="success"><b>Lakukan:</b> Gunakan ikon yang menyediakan
 beberapa informasi kontekstual tentang pesan tersebut.</figcaption>
</figure>




Namun tetap pertahankan ikon yang sederhana. Jika terlalu banyak nuansa mungkin pengguna tidak menyukainya.


{# wf_devsite_translation #}
