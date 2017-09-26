project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Sebagian besar browser bisa mengakses mikrofon pengguna.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-08-23 #}

# Merekam Audio dari Pengguna {: .page-title }

{% include "web/_shared/contributors/paulkinlan.html" %}

Banyak browser kini mampu mengakses masukan video dan audio dari 
pengguna. Akan tetapi, bergantung pada browser, hal ini bisa menjadi pengalaman inline 
dan dinamis penuh, atau bisa didelegasikan ke aplikasi lain pada perangkat pengguna.

## Mulailah dengan sederhana dan progresif

Hal termudah untuk dilakukan adalah cukup meminta file yang sudah direkam
kepada pengguna. Lakukan hal ini dengan membuat elemen masukan file sederhana dan menambahkan 
filter `accept` yang menunjukkan bahwa kita hanya bisa menerima file audio dan idealnya kita 
akan mendapatkannya secara langsung dari mikrofon.

    <input type="file" accept="audio/*" capture="microphone">

Metode ini bekerja pada semua platform. Di desktop, ini akan mengonfirmasi pengguna untuk 
mengunggah file dari sistem file (dengan mengabaikan `capture="microphone"`). Di Safari
pada iOS, ini akan membuka aplikasi mikrofon, yang memungkinkan Anda merekam audio 
kemudian mengirimnya kembali ke laman web; di Android, ini akan memberi pilihan kepada pengguna 
mengenai pilihan aplikasi yang akan digunakan untuk merekam audio sebelum mengirimnya kembali ke
laman web.

Setelah pengguna menyelesaikan perekaman dan kembali ke situs web, Anda 
perlu mendapatkan kepemilikan data file. Anda bisa mendapatkan akses cepat dengan 
melampirkan kejadian `onchange` ke elemen masukan kemudian membaca 
properti `files` objek kejadian.

    <input type="file" accept="audio/*" capture="microphone" id="recorder">
    <audio id="player" controls></audio>
    <script>
      var recorder = document.getElementById('recorder');
      var player = document.getElementById('player')'

      recorder.addEventListener('change', function(e) {
        var file = e.target.files[0]; 
        // Do something with the audio file.
        player.src =  URL.createObjectURL(file);
      });
    </script>

Setelah Anda memiliki akses ke file tersebut, Anda bisa melakukan apa saja yang diinginkan padanya. Misalnya,
Anda bisa:

* Melampirkannya secara langsung ke elemen `<audio>` sehingga Anda bisa memainkannya
* Mengunduhnya ke perangkat pengguna
* Mengunggahnya ke server dengan melampirkan ke `XMLHttpRequest`
* Meneruskannya melalui Web Audio API dan menerapkan filter padanya  

Walaupun penggunaan metode elemen masukan untuk mendapatkan akses ke data audio 
ada di mana saja, ini adalah opsi yang paling tidak menarik. Kita benar-benar ingin mendapatkan akses ke
mikrofon dan menyediakan pengalaman bagus secara langsung di laman.

## Mengakses mikrofon secara interaktif

Browser modern bisa memiliki jalur langsung ke mikrofon yang memungkinkan kita untuk membangun
pengalaman yang sepenuhnya terintegrasi dengan laman web dan pengguna tidak akan pernah
meninggalkan browser.

### Memperoleh akses ke kamera

Kita bisa mengakses Microphone secara langsung dengan menggunakan API di spesifikasi WebRTC 
yang disebut `getUserMedia()`. `getUserMedia()` akan mengonfirmasi pengguna untuk 
akses ke mikrofon dan kamera yang terhubung.

Jika berhasil, API akan mengembalikan `Stream` yang akan berisi data dari
kamera atau mikrofon, dan kita nantinya bisa melampirkannya ke 
elemen `<audio>`, melampirkannya ke Web Audio `AudioContext`, atau menyimpannya menggunakan 
`MediaRecorder` API.

Untuk mendapatkan data dari mikrofon, kita tinggal menyetel `audio: true` di objek pembatas 
yang diteruskan ke `getUserMedia()` API


    <audio id="player" controls></audio>
    <script>  
      var player = document.getElementById('player');

      var handleSuccess = function(stream) {
        if (window.URL) {
          player.src = window.URL.createObjectURL(stream);
        } else {
          player.src = stream;
        }
      };

      navigator.mediaDevices.getUserMedia({ audio: true, video: false })
          .then(handleSuccess)
    </script>

Dengan sendirinya, ini menjadi tidak berguna. Yang bisa kita lakukan cuma mengambil data audio
dan memutarnya.

### Mengakses data mentah dari mikrofon

Untuk mengakses data mentah dari mikrofon, kita harus mengambil aliran yang dibuat oleh
`getUserMedia()` kemudian menggunakan Web Audio API untuk memproses data. Web Audio API
adalah API sederhana yang mengambil sumber masukan dan menghubungkannya 
ke simpul yang bisa memproses data audio (menyesuaikan Gain dll) dan 
akhirnya ke speaker sehingga pengguna bisa mendengarkannya.

Salah satu dari simpul yang bisa Anda hubungkan adalah `ScriptProcessorNode`. Simpul ini akan
mengeluarkan kejadian `onaudioprocess` setiap kali penyangga audio terisi dan Anda 
perlu memprosesnya. Pada titik ini Anda bisa menyimpan data ke dalam penyangga sendiri
dan menyimpannya untuk digunakan nanti.

<pre class="prettyprint">
&lt;script>  
  var handleSuccess = function(stream) {
    <strong>var context = new AudioContext();
    var input = context.createMediaStreamSource(stream)
    var processor = context.createScriptProcessor(1024,1,1);

    source.connect(processor);
    processor.connect(context.destination);

    processor.onaudioprocess = function(e){
      // Do something with the data, i.e Convert this to WAV
      console.log(e.inputBuffer);
    };</strong>
  };

  navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then(handleSuccess)
&lt;/script>
</pre>

Data yang ditahan di penyangga adalah data mentah dari mikrofon dan 
Anda memiliki sejumlah opsi yang bisa Anda gunakan bersama data:

* Menggunggahnya langsung ke server
* Menyimpannya secara lokal
* Mengonversinya ke format file khusus, misalnya WAV, kemudian menyimpannya ke 
  server Anda atau secara lokal

### Menyimpan data dari mikrofon

Cara termudah untuk menyimpan data dari mikrofon adalah menggunakan
`MediaRecorder` API.

`MediaRecorder` API akan mengambil aliran yang dibuat oleh `getUserMedia` kemudian 
secara progresif menyimpan data yang ada di aliran itu di
tempat tujuan yang Anda sukai.

<pre class="prettyprint">
&lt;a id="download">Download</a>
&lt;button id="stop">Stop</button>
&lt;script> 
  let shouldStop = false;
  let stopped = false;
  const downloadLink = document.getElementById('download');
  const stopButton = document.getElementById('stop');

  stopButton.addEventListener('click', function() {
    shouldStop = true;
  })

  var handleSuccess = function(stream) {  
    const options = {mimeType: 'video/webm;codecs=vp9'};
    const recordedChunks = [];
    <strong>const mediaRecorder = new MediaRecorder(stream, options);  

    mediaRecorder.addEventListener('dataavailable', function(e) {
      if (e.data.size > 0) {
        recordedChunks.push(e.data);
      }

      if(shouldStop === true && stopped === false) {
        mediaRecorder.stop();
        stopped = true;
      }
    });

    mediaRecorder.addEventListener('stop', function() {
      downloadLink.href = URL.createObjectURL(new Blob(recordedChunks));
      downloadLink.download = 'acetest.wav';
    });

    mediaRecorder.start();</strong>
  };

  navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then(handleSuccess);

&lt;/script>
</pre>

Dalam kasus kita, kita menyimpan data secara langsung ke dalam larik yang nanti bisa kita ubah
ke `Blob` yang selanjutnya bisa digunakan untuk disimpan ke Server Web atau secara langsung di
storage perangkat pengguna. 

## Minta izin untuk menggunakan mikrofon secara bertanggung jawab

Jika sebelumnya pengguna belum memberi akses pada situs Anda ke mikrofon, maka
begitu Anda memanggil `getUserMedia`, browser akan mengonfirmasi pengguna untuk
memberi izin pada situs Anda ke mikrofon. 

Pengguna benci mendapati konfirmasi akses ke perangkat yang andal di mesin mereka dan
sering kali mereka memblokir permintaan tersebut, atau akan mengabaikannya jika mereka tidak 
memahami konteks dibuatnya konfirmasi tersebut. Praktik terbaik adalah
hanya meminta akses mikrofon bila dibutuhkan saat pertama. Setelah pengguna
diberi akses, mereka tidakan dimintai lagi, akan tetapi, jika mereka menolak akses, 
Anda tidak bisa mendapatkan akses lagi untuk meminta izin pengguna.

Caution: Meminta akses ke mikrofon saat pemuatan laman akan mengakibatkan sebagian besar pengguna menolak akses ke mikrofon.

### Gunakan Permission API untuk memeriksa apakah Anda sudah memiliki akses

`getUserMedia` API tidak memberi tahu apakah Anda sudah
memiliki akses ke mikrofon. Ini menimbulkan masalah pada Anda, untuk memberikan UI yang bagus
agar pengguna memberi Anda akses ke mikrofon, Anda harus meminta akses
ke mikrofon.

Hal ini bisa diatasi di sebagian browser dengan menggunakan Permission API. 
`navigator.permission` API memungkinkan Anda mengkueri status kemampuan
mengakses API tertentu tanpa harus meminta konfirmasi lagi.

Untuk mengetahui apakah Anda memiliki akses ke mikrofon pengguna, Anda bisa meneruskan
`{name: 'microphone'}` ke dalam metode kueri dan ini akan mengembalikan:

*  `granted` &mdash; sebelumnya pengguna telah diberikan akses ke mikrofon; 
*  `prompt` &mdash; pengguna belum memberi Anda akses dan akan dikonfirmasi bila 
    Anda memanggil `getUserMedia`; 
*  `denied` &mdash; sistem atau pengguna secara eksplisit telah memblokir akses ke
    mikrofon dan Anda tidak akan bisa mendapatkan akses ke sana.

Dan Anda kini bisa memeriksa dengan cepat untuk mengetahui apakah perlu mengubah
antarmuka pengguna untuk mengakomodasi tindakan yang perlu diambil pengguna.

    navigator.permissions.query({name:'microphone'}).then(function(result) {
      if (result.state == 'granted') {

      } else if (result.state == 'prompt') {

      } else if (result.state == 'denied') {

      }
      result.onchange = function() {

      };
    });


{# wf_devsite_translation #}
