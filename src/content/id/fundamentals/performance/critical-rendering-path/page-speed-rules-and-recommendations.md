project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Panduan ini mempelajari aturan PageSpeed Insights dalam konteks: apa yang harus diperhatikan saat mengoptimalkan jalur rendering penting, dan alasannya.

{# wf_updated_on: 2015-10-05 #}
{# wf_published_on: 2014-03-31 #}

# Aturan dan Rekomendasi PageSpeed {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

Panduan ini mempelajari aturan PageSpeed Insights dalam konteks: apa yang harus diperhatikan saat mengoptimalkan jalur rendering penting, dan alasannya.


## Menghilangkan JavaScript dan CSS yang memblokir rendering

Untuk mencapai waktu tercepat hingga rendering pertama, meminimalkan dan (jika memungkinkan) meniadakan sejumlah sumber daya penting pada laman, meminimalkan jumlah byte penting yang diunduh, dan mengoptimalkan panjang jalur penting.

## Mengoptimalkan Penggunaan JavaScript

Sumber daya JavaScript merupakan parser pemblokir secara default kecuali ditandai sebagai `async` atau ditambahkan melalui cuplikan JavaScript khusus. Parser yang memblokir JavaScript memaksa browser menunggu CSSOM dan menjeda konstruksi DOM, yang selanjutnya bisa secara signifikan menunda waktu hingga rendering pertama.

### Lebih menyukai sumber daya JavaScript asinkron

Sumber daya asinkron membuka halangan parser dokumen dan memungkinkan browser menghindari pemblokiran CSSOM sebelum skrip dieksekusi. Sering kali, jika skrip bisa menggunakan atribut `async`, itu berarti tidak penting untuk render pertama. Pertimbangkan memuat skrip secara asinkron setelah render pertama.

### Hindari panggilan server sinkron

Gunakan metode `navigator.sendBeacon()` untuk membatasi data yang dikirim oleh XMLHttpRequests dalam penangan
`unload`. Karena banyak browser mengharuskan permintaan seperti itu sebagai
sinkron, permintaan itu bisa memperlambat transisi laman, terkadang secara kentara. Kode
berikut menunjukkan cara menggunakan `navigator.sendBeacon()` untuk mengirim data ke server dalam penangan
`pagehide` dan bukan pada penangan `unload`.


    <script>
      function() {
        window.addEventListener('pagehide', logData, false);
        function logData() {
          navigator.sendBeacon(
            'https://putsreq.herokuapp.com/Dt7t2QzUkG18aDTMMcop',
            'Sent by a beacon!');
        }
      }();
    </script>
    

Metode `fetch()` baru menyediakan cara mudah untuk meminta data secara asinkron. Karena belum tersedia secara luas, Anda harus menggunakan deteksi fitur untuk menguji keberadaannya sebelum digunakan. Metode ini memproses respons dengan Promise dan bukan dengan penangan beberapa penangan kejadian. Tidak seperti respons terhadap XMLHttpRequest, respons fetch adalah sebuah objek aliran yang dimulai dalam Chrome 43. Ini juga berarti bahwa panggilan ke `json()` juga mengembalikan Promise. 


    <script>
    fetch('./api/some.json')  
      .then(  
        function(response) {  
          if (response.status !== 200) {  
            console.log('Looks like there was a problem. Status Code: ' +  response.status);  
            return;  
          }
          // Examine the text in the response  
          response.json().then(function(data) {  
            console.log(data);  
          });  
        }  
      )  
      .catch(function(err) {  
        console.log('Fetch Error :-S', err);  
      });
    </script>
    

Metode `fetch()` juga dapat menangani permintaan POST.


    <script>
    fetch(url, {
      method: 'post',
      headers: {  
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
      },  
      body: 'foo=bar&lorem=ipsum'  
    }).then(function() { // Aditional code });
    </script>
    

### Menunda penguraian JavaScript

Untuk meminimalkan kerja browser yang harus dilakukan untuk merender laman, setiap skrip yang tak penting serta tidak mendesak untuk mengonstruksikan materi yang terlihat bagi render awal harus ditunda.

### Menghindari berjalannya JavaScript berkepanjangan

Berjalannya JavaScript yang berkepanjangan memblokir browser dari mengonstruksikan DOM, CSSOM, dan merender laman, jadi setiap logika inisialisasi dan fungsionalisasi yang tidak penting untuk render awal perlu ditunda. Apabila urutan panjang inisialisasi harus berjalan, pertimbangkan untuk memecahnya ke dalam beberapa tahapan agar browser bisa memroses kejadian lain di antara proses.

## Mengoptimalkan Penggunaan CSS

CSS diperlukan untuk mengonstruksikan pohon render dan JavaScript akan sering kali memblokir CSS selama konstruksi awal laman. Pastikan bahwa CSS yang tidak penting harus ditandai sebagai tidak penting (mis. cetak dan kueri media lainnya), dan bahwa jumlah CSS penting serta waktu penyerahannya sekecil mungkin.

### Menempatkan CSS di bagian awal dokumen

Sebutkan semua sumber daya CSS harus ditetapkan seawal mungkin dalam dokumen HTML sedemikian hingga browser bisa menemukan tag `<link>` dan sesegera mungkin mengajukan permintaan CSS.

### Menghindari pengimporan CSS

Direktif pengimporan CSS (`@import`) mengaktifkan satu stylsheet untuk mengimpor aturan dari file stylesheet lain. Akan tetapi, direktif ini harus dihindari karena menyertakan perjalanan bolak-balik tambahan ke dalam jalur penting: sumber daya CSS yang diimpor hanya ditemukan setelah stylesheet CSS dengan aturan `@import` itu sendiri telah diterima dan di-parse.

### CSS pemblokir-render inline

Untuk memperoleh kinerja terbaik, Anda bisa mempertimbangkan penyisipan CSS penting secara langsung ke dalam dokumen HTML. Ini meniadakan perjalanan bolak-balik tambahan dalam jalur penting dan jika dilakukan dengan benar bisa digunakan untuk mengirimkan satu panjang jalur penting dalam "satu kali bolak-balik" yang mana hanya HTML-lah yang menjadi sumber daya pemblokir.



{# wf_devsite_translation #}
