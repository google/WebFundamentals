project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Sebagian besar browser bisa mengakses kamera pengguna.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-08-23 #}

# Mengambil Gambar dari Pengguna {: .page-title }

{% include "web/_shared/contributors/paulkinlan.html" %}

Banyak browser kini mampu mengakses masukan video dan audio dari 
pengguna. Akan tetapi, bergantung pada browser, hal ini bisa menjadi pengalaman inline 
dan dinamis penuh, atau bisa didelegasikan ke aplikasi lain pada perangkat pengguna.

## Mulailah dengan sederhana dan progresif

Hal termudah untuk dilakukan adalah cukup meminta file yang sudah direkam
kepada pengguna. Lakukan hal ini dengan membuat elemen masukan file sederhana dan menambahkan 
filter `accept` yang menunjukkan bahwa kita hanya bisa menerima file gambar dan idealnya kita 
akan mendapatkannya langsung dari kamera.

    <input type="file" accept="image/*" capture>

Metode ini bekerja pada semua platform. Di desktop, ini akan meminta pengguna untuk 
mengunggah file gambar dari sistem file. Di Safari
pada iOS metode ini akan membuka aplikasi kamera, sehingga Anda dapat menjepret gambar, 
lalu mengirimnya kembali ke laman web. Di Android metode ini akan meminta pengguna 
memilih aplikasi untuk menjepret gambar sebelum mengirimnya kembali ke
laman web.

Datanya kemudian dapat dilampirkan ke `<form>` atau dimanipulasi dengan JavaScript dengan 
memantau kejadian `onchange` pada elemen masukan, lalu membaca 
properti `files` pada kejadian `target`.

### Menjepret satu bingkai

Memperoleh akses ke file gambar itu mudah.

    <input type="file" accept="image/*" capture="camera" id="camera">
    <img id="frame">
    <script>
      var camera = document.getElementById('camera');
      var frame = document.getElementById('frame');

      camera.addEventListener('change', function(e) {
        var file = e.target.files[0]; 
        // Do something with the image file.
        frame.src = URL.createObjectURL(file);
      });
    </script>

Setelah Anda memiliki akses ke file tersebut, Anda bisa melakukan apa saja yang diinginkan padanya. Misalnya,
Anda bisa:

* Melampirkannya langsung ke elemen `<canvas>` supaya Anda dapat memanipulasinya
* Mengunduhnya ke perangkat pengguna
* Mengunggahnya ke server dengan melampirkan ke `XMLHttpRequest` 

Meski metode elemen masukan untuk mengakses gambar ini 
digunakan di mana-mana, metode ini pilihan paling tidak menarik karena tidak terintegrasi 
langsung dengan laman web, dan di desktop tidak bisa mengakses kamera web pengguna.

## Mengakses kamera secara interaktif

Browser modern dapat mengakses langsung kamera, sehingga kita dapat menciptakan
pengalaman yang terintegrasi penuh dengan laman web, agar pengguna tidak perlu
meninggalkan browser.

Caution: Akses langsung ke kamera adalah kemampuan yang dahsyat. Anda harus mendapat izin 
dari pengguna dan situs Anda harus menggunakan protokol yang aman (HTTPS).

### Memperoleh akses ke kamera

Kita bisa mengakses langsung kamera dan mikrofon dengan menggunakan API di spesifikasi WebRTC 
yang disebut `getUserMedia()`. Ini akan meminta izin pengguna untuk 
mengakses mikrofon dan kamera yang terhubung.

Jika berhasil, API akan mengembalikan `MediaStream` yang berisi data dari
kamera, lalu kita bisa melampirkannya ke elemen `<video>` dan memutarnya
untuk menampilkan pratinjau realtime, atau melampirkannya ke `<canvas>` untuk menjepret
cuplikan.

Untuk mendapatkan data dari kamera, kita tinggal menyetel `video: true` di objek pembatas 
yang diteruskan ke API `getUserMedia()`.

    <video id="player" controls autoplay></video>
    <script>  
      var player = document.getElementById('player');

      var handleSuccess = function(stream) {
        player.srcObject = stream;
      };

      navigator.mediaDevices.getUserMedia({video: true})
          .then(handleSuccess);
    </script>

Dengan sendirinya, ini menjadi tidak berguna. Kita hanya bisa mengambil data video
dan memutarnya.

### Mengambil cuplikan foto dari kamera

Untuk mengakses data mentah dari kamera, kita harus mengambil aliran yang dibuat oleh
`getUserMedia()` dan memproses datanya. Tidak seperti `Web Audio`, tidak ada 
API pemrosesan aliran khusus untuk video di web, jadi kita harus melakukan 
sedikit akal-akalan untuk menjepret cuplikan dari kamera pengguna.

Prosesnya seperti ini:

1. Buat objek kanvas yang akan menyimpan bingkai dari kamera
2. Dapatkan akses ke aliran kamera
3. Lampirkan ke elemen video
4. Saat Anda ingin menjepret bingkai tertentu, tambahkan data itu dari elemen video 
   ke objek kanvas menggunakan `drawImage()`.

Selesai.

    <video id="player" controls autoplay></video>
    <button id="capture">Jepret</button>
    <canvas id="snapshot" width=320 height=240></canvas>
    <script>
      var player = document.getElementById('player'); 
      var snapshotCanvas = document.getElementById('snapshot');
      var captureButton = document.getElementById('capture');

      var handleSuccess = function(stream) {
        // Attach the video stream to the video element and autoplay.
        player.srcObject = stream;
      };

      captureButton.addEventListener('click', function() {
        var context = snapshot.getContext('2d');
        // Draw the video frame to the canvas.
        context.drawImage(player, 0, 0, snapshotCanvas.width, 
            snapshotCanvas.height);
      });

      navigator.mediaDevices.getUserMedia({video: true})
          .then(handleSuccess);
    </script>

Setelah data dari kamera disimpan di kanvas, Anda bisa memanfaatkannya dengan
berbagai cara. Anda bisa: 

* Menggunggahnya langsung ke server
* Menyimpannya secara lokal
* Menerapkan efek keren pada gambar

### Menghentikan streaming dari kamera saat tidak perlu

Biasakanlah untuk menghentikan penggunaan kamera saat tidak diperlukan lagi. 
Ini tidak hanya menghemat baterai dan daya pemrosesan, tetapi juga membuat 
pengguna lebih yakin pada aplikasi Anda.

Untuk menghentikan akses ke kamera, Anda cukup memanggil `stop()` pada setiap trek video 
untuk aliran yang dikembalikan oleh `getUserMedia()`.

<pre class="prettyprint">
&lt;video id="player" controls autoplay>&lt;/video>
&lt;button id="capture">Capture&lt;/button>
&lt;canvas id="snapshot" width=320 height=240>&lt;/canvas>
&lt;script>
  var player = document.getElementById('player'); 
  var snapshotCanvas = document.getElementById('snapshot');
  var captureButton = document.getElementById('capture');
  <strong>var videoTracks;</strong>

  var handleSuccess = function(stream) {
    // Attach the video stream to the video element and autoplay.
    player.srcObject = stream;
    <strong>videoTracks = stream.getVideoTracks();</strong>
  };

  captureButton.addEventListener('click', function() {
    var context = snapshot.getContext('2d');
    context.drawImage(player, 0, 0, snapshotCanvas.width, snapshotCanvas.height);

    <strong>// Stop all video streams.
    videoTracks.forEach(function(track) {track.stop()});</strong>
  });

  navigator.mediaDevices.getUserMedia({video: true})
      .then(handleSuccess);
&lt;/script>
</pre>

## Meminta izin menggunakan kamera secara bertanggung jawab

Jika pengguna belum memberi situs Anda akses ke kamera,
begitu Anda memanggil `getUserMedia`, browser akan meminta pengguna untuk
mengizinkan situs Anda mengakses kamera. 

Pengguna tidak suka dimintai akses ke alat pribadi di komputer atau perangkat mereka 
dan biasanya mereka memblokir permintaan itu, atau mengabaikannya jika tidak 
memahami konteks permintaan tersebut. Biasakanlah 
meminta akses ke kamera hanya saat pertama kali diperlukan. Setelah pengguna
memberi akses, mereka tidak akan diminta lagi. Namun, jika pengguna menolak akses, 
Anda tidak bisa mendapat akses lagi, kecuali jika mereka mengubah setelan izin kamera 
secara manual.

Caution: Meminta akses ke kamera saat laman dimuat akan mengakibatkan sebagian besar 
pengguna menolak permintaan akses.

## Kompatibilitas

Informasi selengkapnya tentang implementasi browser seluler dan desktop:
* [srcObject](https://www.chromestatus.com/feature/5989005896187904)
* [navigator.mediaDevices.getUserMedia()](https://www.chromestatus.com/features/5755699816562688)

Kami juga menyarankan menggunakan shim [adapter.js](https://github.com/webrtc/adapter) untuk melindungi aplikasi dari perubahan spesifikasi WebRTC dan perbedaan awalan.


{# wf_devsite_translation #}
