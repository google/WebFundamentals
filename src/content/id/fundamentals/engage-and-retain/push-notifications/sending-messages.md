project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Ada dua server yang terlibat dalam pengiriman pesan: server Anda dan server perpesanan pihak ketiga. Anda bisa melacak siapa yang mengirim pesan. Server pihak ketiga menangani perutean.


{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-06-30 #}

# Mengirim Pesan {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

Sebenarnya ada dua server yang terlibat dalam pengiriman pesan: server Anda
dan server perpesanan pihak ketiga. Anda melacak dua hal:
penerima dan endpoint khusus penerima pada server perpesanan. Server
perpesanan menangani perutean.

## Konteks yang lebih luas {: #the-broader-context }

Kita telah melihat bagaimana cara berlangganan ke push di dalam aplikasi web. Proses itu
antara lain meneruskan kunci publik, yang disebut `applicationServerKey`, ke dalam
API kepelangganan.

Diagram berikut menampilkan urutan operasi.

![Mengirimkan pesan](images/push-flow.gif)

1. Perangkat mengunduh aplikasi web Anda yang berisi publicKey yang sudah ada,
   dalam skrip ini disebut sebagai `applicationServerKey`. Aplikasi web Anda memasang
   service worker.
1. Selama aliran berlangganan, browser menghubungi server perpesanan untuk
   membuat kepelangganan baru dan mengembalikannya ke aplikasi.

    <aside class="note"><b>Catatan:</b> Anda tidak perlu mengetahui URL server pesan. Setiap vendor browser mengelola server pesannya sendiri untuk browsernya.</aside>

1. Setelah aliran kepelangganan, aplikasi Anda meneruskan objek kepelangganan kembali ke
   server aplikasi.
1. Beberapa saat kemudian, server aplikasi akan mengirimkan pesan ke server
   perpesanan, yang meneruskannya ke penerima.

## Menghasilkan applicationServerKey {: #generating-the-key }

Ada sejumlah hal yang perlu Anda ketahui tentang `applicationServerKey`:

* Ini adalah bagian kunci publik dari pasangan kunci publik/privat yang dihasilkan pada
  aplikasi server Anda.
* Pasangan kunci harus dapat digunakan bersama Elliptic Curve Digital Signature
  (ECDSA) pada kurva P-256.
* Aplikasi Anda harus meneruskan kunci publik ke server perpesanan sebagai larik
  integer delapan-bit yang tidak ditandatangani.
* Ini didefinisikan dalam spesifikasi yang disebut Voluntary Application Server Identification
  untuk Web Push (VAPID), yang akan kita bahas di bagian [mengirimkan pesan](sending-messages).

Anda bisa menemukan contoh untuk menghasilkannya di
[pustaka simpul web-push](https://github.com/web-push-libs/web-push/). Penampakannya
seperti ini:


    function generateVAPIDKeys() {
      var curve = crypto.createECDH('prime256v1');
      curve.generateKeys();

      return {
        publicKey: curve.getPublicKey(),
        privateKey: curve.getPrivateKey(),
      };
    }


## Anatomi objek langganan {: #subscription-anatomy }

Sebelumnya kami mengatakan bahwa objek kepelangganan harus diubah ke string dan
diteruskan ke server, namun kami tidak memberi tahu Anda apa yang ada di objek kepelangganan. Itu
karena klien tidak melakukan apa pun dengannya. Serverlah yang melakukannya.  

Objek kepelangganan tampak seperti ini:  


    {  
      "endpoint": "https://example.com/push-service/send/dbDqU8xX10w:APA91b...",  
      "keys": {  
        "auth": "qLAYRzG9TnUwbprns6H2Ew==",  
        "p256dh": "BILXd-c1-zuEQYXH\\_tc3qmLq52cggfqqTr\\_ZclwqYl6A7-RX2J0NG3icsw..."  
      }  
    }


Apa yang ada di sini?  

**endpoint**—Berisi dua bagian: URL layanan perpesanan yang digunakan oleh
browser pelanggan diikuti dengan identifier unik untuk pengguna.

**keys**—Kunci enkripsi yang digunakan untuk mengenkripsi data yang diteruskan ke pesan
service worker. Isinya adalah sebagai berikut:

* **auth**-Rahasia autentikasi 16 byte yang dihasilkan oleh browser.
* **p256dh**-65 bytes berisi kunci publik dari browser yang
  perlu digunakan developer saat mengenkripsi pesan yang ingin dikirimkan ke
  layanan push itu.

Note: Di banyak spesifikasi yang relevan, byte disebut oktet. Istilah ini digunakan karena sistem lama dan sistem komunikasi dengan panjang byte yang tidak selalu 8 bit.

## Membuat pesan {: #creating-the-message }

Di sinilah segalanya mulai menggila. Di bagian ini, kita tidak
lagi berada di aplikasi klien. Kita berada di server aplikasi tempat kita akan membuat
dan mengirimkan pesan ke klien. Ada banyak yang harus dilacak.

Sebelum melanjutkan, mari kita tinjau apa yang kita miliki dan asalnya.

* **Objek kepelangganan** - Ini berasal dari klien. Objek ini berisi endpoint
  server perpesanan, salinan kunci publik, dan rahasia autentikasi
    yang dihasilkan oleh klien. Dari sini, kita akan berhenti membahas
   tentang objek kepelangganan dan hanya merujuk **endpoint**, **kunci
 publik**, dan **rahasia autentikasi**.
* **kunci privat** - Kunci privat VAPID sesuai dengan kunci publik VAPID.
  Inilah kunci privat untuk server aplikasi Anda.

Kita akan melihat pembuatan pesan dalam tiga bagian. Pertama, kita akan membuat beberapa
header HTTP, kemudian membuat payload untuk pesan, dan terakhir kita akan
menggabung dan mengirimkannya ke server perpesanan.

### Catatan tentang contoh kode {: #a-note-about-samples }

Contoh kode yang diberikan di bagian ini, yang diambil dar [pustaka simpul
web-push](https://github.com/web-push-libs/web-push).

### Produk {: #the-product }

Mari kita lihat apa yang akan kita hasilkan, kemudian membahas cara
membangunnya.

<pre class="prettyprint">POST /push-service/send/dbDqU8xX10w:APA91b... HTTP/1.1  
Host: push.example.net  
Push-Receipt: https://push.example.net/r/3ZtI4YVNBnUUZhuoChl6omU  
TTL: 43200  
Content-Type: text/plain;charset=utf8  
Content-Length: 36  
Authorization: WebPush
eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJhdWQiOiJodHRwczovL3B1c2guZXhhbXBsZS5uZXQiLCJleHAiOjE0NTM1MjM3NjgsInN1YiI6Im1haWx0bzpwdXNoQGV4YW1wbGUuY29tIn0.i3CYb7t4xfxCDquptFOepC9GAu\_HLGkMlMuCGSK2rpiUfnK9ojFwDXb1JrErtmysazNjjvW2L9OkSSHzvoD1oA  
Crypto-Key:
p256ecdsa=BA1Hxzyi1RUM1b5wjxsn7nGxAszw2u61m164i3MrAIxHF6YK5h4SDYic-dRuU\_RCPCfA5aq9ojSwk5Y2EmClBPsiChYuI3jMzt3ir20P8r\_jgRR-dSuN182x7iB</pre>

Perhatikan, permintaan ini dikirimkan ke endpoint yang dimuat dalam objek
kepelangganan. Header Authorization, Crypto-Key, dan TTL perlu
sedikit penjelasan. Mari kita mulai dengan yang paling sederhana.

## Header HTTP {: #http-headers }

### TTL {: #ttl }

Mungkin perlu beberapa saat sebelum server pesan bisa mengirim pesan yang dikirim oleh server
aplikasi Anda. Layanan pesan tidak berkewajiban untuk menahan pesan selamanya.
Sebenarnya, agar tepat waktu, server aplikasi tidak boleh mengirimkan pesan yang bisa
bertahan selamanya. Itu sebabnya perlu menyertakan header yang disebut TTL, yang arti harfiahnya adalah
'time to live'.

Header TTL adalah nilai dalam detik yang disarankan ke server
pesan tentang berapa lama harus menyimpan pesan dan upaya
mengirimkannya. Jika nilai itu dipilih, server pesan dapat mempersingkat waktu menyimpan
pesan. Jika demikian, server harus mengembalikan waktu yang dipersingkat dalam header TTL
sebagai respons terhadap permintaan pesan. Jika TTL memiliki nilai 0, server pesan
harus mengirimkannya segera jika agen-pengguna tersedia. Jika agen-pengguna
tidak tersedia, pesan segera kedaluwarsa dan tidak pernah dikirimkan.

### Header Crypto-Key {: #crypto-key-header }

Untuk memvalidasi pesan yang dikirimkan oleh server aplikasi Anda, server pesan memerlukan
kunci publik. Anda mengirimkan kunci publik di header Crypto-Key. Header Crypto-Key
memiliki sejumlah bagian.  

<pre class="prettyprint">dh=<i>publicKey</i>,p256ecdsa=<i>applicationServerKey</i></pre>  

Misalnya:  

<pre class="prettyprint">dh=BGEw2wsHgLwzerjvnMTkbKrFRxdmwJ5S\_k7zi7A1coR\_sVjHmGrlvzYpAT1n4NPbioFlQkIrT  
NL8EH4V3ZZ4vJE,p256ecdsa=BDd3\_hVL9fZi9Ybo2UUzA284WG5FZR30\_95YeZJsiApwXKpNcF1rRPF3foIiBHXRdJI2Qhumhf6\_LFTeZaN</pre>

Bagian pertama (`dh=publicKey`) adalah kunci publik, yang kita buat
pada Meminta izin dan memasukkan pengguna dalam kepelangganan. Bagian kedua
(`p256ecdsa=applicationServerKey`) adalah kunci publik yang dibuat oleh server aplikasi Anda.
Keduanya harus berbasis enkode URL base64. Perhatikan koma yang memisahkan dua bagian Crypto-Key.

Note: Bug di Chrome 52 mensyaratkan titik koma digunakan untuk memisahkan bagian Cyrpto-Key, sebagai ganti koma.

### Header Authorization {: #authorization-header }

Untuk mengirim pesan, Anda memerlukan header Authorization. Isinya empat bagian:  

<pre class="prettyprint">WebPush &lt;JWTHeader&gt;.&lt;Payload&gt;.&lt;Signature&gt;</pre>

Kata WebPush adalah literal yang harus diikuti dengan spasi. Bagian
selebihnya, yang dienkripsi dan disambung menggunakan tanda titik membentuk JSON
web token (JWT) yang ditandatangani. JWT adalah cara berbagi objek JWT dengan pihak kedua
sedemikian rupa agar pihak pengirim bisa menandatanganinya dan pihak penerima bisa memverifikasi
tanda tangan dari pengirim yang diharapkan.   

Mari kita lihat masing-masing bagian token secara detail.

#### Header JWT {: #jwt-header }

Header JWT berisi dua keping informasi standar: properti `typ` untuk
menunjukkan bahwa tipe pesan, dalam hal ini adalah pesan JWT, dan properti `alg`
untuk menunjukkan algoritme yang digunakan menandatangani pesan.
Detail ini harus dienkode dengan URL base64.


    {  
      "typ": "JWT",  
      "alg": "ES256"  
    }


#### Payload JWT {: #jwt-payload }

JWT menyebut bagian ini payload. Ini bukan tempat menyimpan
payload pesan. Kita akan segera sampai ke sana. Payload adalah objek JSON lain dengan anggota
berikut:     
**aud**   
Ini berisi asal endpoint layanan push, yang harus Anda ekstrak
dari objek kepelangganan. Ini bukan asal situs Anda.    
**exp**    
Menetapkan waktu kedaluwarsa permintaan JWT dalam milidetik (bukan kedaluwarsa
pesan itu sendiri). Ini harus dalam waktu dua puluh empat jam. Ini bisa
dihitung dengan mengonversi tanggal saat ini ke milidetik dan menambahkan durasi.
Misalnya, di Node.js Anda dapat melakukan hal ini:


    Math.floor((Date.now() / 1000) + 12 * 60 * 60)


**sub**  
Menetapkan subjek, yang didefinisikan oleh spesifikasi VAPID sebagai cara layanan push
menghubungi pengirim pesan. Ini bisa berupa URL atau alamat mailto (lihat
contoh di bawah ini).  

Payload JWT lengkap tampak seperti ini:


    {  
      "aud": "http://push.example.net",  
      "exp": "1469618703",  
      "sub": "mailto: my-email@some-url.com"  
    }


#### Tanda tangan {: #signature }

Tanda tangan adalah bagian terakhir JWT.

<pre class="prettyprint">WebPush &lt;JWTHeader&gt;.&lt;Payload&gt;.&lt;Signature&gt;</pre>

Buat tanda tangan dengan terlebih dahulu menggabung header JWT dan payload dengan
sebuah titik. Misalnya:

<pre class="prettyprint">&lt;JWTHeader&gt;.&lt;Payload&gt;</pre>

Enkripsilah menggunakan kunci privat yang Anda buat di
[Menghasilkan applicationServerKey](#generating-the-key).

Anda kini memiliki ketiga bagian pembentuk JWT yang Anda gabung
dengan sebuah titik.

<pre class="prettyprint">&lt;JWTHeader&gt;.&lt;Payload&gt;.&lt;Signature&gt;</pre>

Kami tidak akan menampilkan cara melakukan enkripsi tanda tangan, namun ada
sejumlah pustaka yang tersedia. Tempat yang bagus untuk dilihat adalah bagian pustaka
[jwt.io](https://jwt.io/){: .external }.

Terakhir, beri awalan dengan kata 'WebPush' diikuti spasi. Hasilnya akan tampak
seperti berikut:

<pre class="prettyprint">WebPush eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJhdWQiOiJodHRwczovL2ZjbS5nb29nbGVhcGlzLmNvbSIsImV4cCI6MTQ2NjY2ODU5NCwic3ViIjoibWFpbHRvOnNpbXBsZS1wdXNoLWRlbW9AZ2F1bnRmYWNlLmNvLnVrIn0.Ec0VR8dtf5qb8Fb5Wk91br-evfho9sZT6jBRuQwxVMFyK5S8bhOjk8kuxvilLqTBmDXJM5l3uVrVOQirSsjq0A</pre>

### Payload pesan {: #message-payload }

Ketika mengimplementasikan kode server ada dua metode pengiriman pesan yang bisa
dipertimbangkan.

* Pesan dengan payload data.
* Pesan tanpa payload data, sering disebut tickle.

Dalam tickle, service worker menggunakan pesan sebagai sinyal untuk
mengambil data dari endpoint. Bagian Menangani Pesan berisi
kode contoh untuk menampilkan cara service worker melakukannya.

Mengapa Anda mengirim pesan tanpa payload? Ada dua alasan.

* Anda harus mengirim sesuatu yang lebih besar dari batas payload 4k yang ditetapkan oleh spesifikasi
* Klien membutuhkan data yang lebih baru dibandingkan apa yang akan di push.

Secara teknis, ada alasan lain yaitu bahwa kemampuan browser mungkin berbeda
untuk sementara waktu, namun dua alasan utama kemungkinan akan selalu berlaku. Jika
browser tidak mendukung payload, objek langganan tidak berisi kunci.

Payload, terlepas dari cara Anda mendapatkannya ke klien, harus dienkripsi.
Enkripsi adalah bidang khusus, bahkan dalam development perangkat lunak, sehingga kami tidak
menyarankan Anda menulis sistem enkripsi sendiri. Untungnya, ada
beragam pustaka push yang tersedia.

Untuk payload yang dikirimkan melalui server pesan, Anda harus mengenkripsinya menggunakan
publicKey dan rahasia autentikasi. Selain itu, harus ditambah dengan 16
byte acak yang unik pada pesan. Terakhir, ditambahkan ke isi
permintaan yang dikirimkan ke server pesan.

### Mengirimnya sesuai caranya {: #sending-it-on-its-way }

Di pustaka simpul web-push, ini dilakukan dengan instance
objek permintaan dari pustaka https bawaan.


    const https = require('https');


Pada poin tertentu, permintaan dikirim ke server pesan. Pustaka
simpul web-push membungkus kode ini di dalam promise (dengan panggilan yang sesuai untuk memproses dan
menolak) sehingga bisa terjadi secara asinkron. Contoh kode di bawah ini, diambil dari
[pustaka simpul web-push](https://github.com/web-push-libs/web-push)
yang mengilustrasikannya.

Perhatikan, server pesan merespons permintaan jaringan dengan segera,
yang berarti asinkron untuk mengirimkan pesan ke aplikasi klien.


    const pushRequest = https.request(options, function(pushResponse) {  
      let body = '';    
      // Allow the payload to be sent out in chunks.  
      pushResponse.on('data', function(chunk) {  
        body += chunk;  
      });    
      // Check to see if the push is successful.  
      pushResponse.on('end', function() {  
        if (pushResponse.statusCode !== 201) {  
          reject(new WebPushError('Received unexpected response code',  
            pushResponse.statusCode, pushResponse.headers, body));  
        } else {  
          // Do something with the response body.  
        }  
     });  
    });  

    if (requestPayload) {  
      pushRequest.write(requestPayload);  
    }  

    pushRequest.end();  

    pushRequest.on('error', function(e) {  
      console.error(e);  
    });


{# wf_devsite_translation #}
