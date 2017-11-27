project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Host situs di server web mesin development, kemudian akseslah materinya dari perangkat Android.

{# wf_updated_on: 2016-04-07 #}
{# wf_published_on: 2015-04-13 #}

# Akses Server Lokal {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

Host situs di server web mesin development, kemudian 
akseslah materinya dari perangkat Android.

Dengan kabel USB dan Chrome DevTools, Anda bisa menjalankan situs dari
mesin development kemudian menampilkan situs tersebut di perangkat Android. 


### TL;DR {: .hide-from-toc }
- Penerusan port memungkinkan Anda menampilkan materi server web mesin development di perangkat Android.
- Jika server web menggunakan domain khusus, Anda bisa menyiapkan perangkat Android untuk mengakses materi di domain itu dengan pemetaan domain khusus.


## Siapkan penerusan port {:#port-forwarding}

Penerusan port memungkinkan perangkat Android mengakses materi yang sedang
di-host di server web mesin development Anda. Penerusan port bekerja dengan cara
membuat port TCP pendengar di perangkat Android Anda yang memetakan ke port TCP
di mesin development Anda. Lalu lintas antar port berjalan melalui koneksi USB
antara perangkat Android Anda dan mesin development, sehingga
koneksi tidak bergantung pada konfigurasi jaringan.

Untuk mengaktifkan penerusan port:

1. Siapkan [debug dari jauh](.) antara mesin development dan
   perangkat Android Anda. Bila selesai, Anda akan melihat perangkat Android
   di menu sebelah kiri dialog **Inspect Devices** dan indikator status 
   **Connected**.
1. Dalam dialog **Inspect Devices** di DevTools, aktifkan **Port forwarding**.
1. Klik **Add rule**.

   ![menambahkan aturan penerusan port](imgs/add-rule.png)
1. Dalam bidang teks **Device port** di kiri, masukkan nomor port `localhost` yang 
   nanti Anda gunakan untuk mengakses situs di 
   perangkat Android. Misalnya, jika Anda ingin mengakses situs dari `localhost:5000` 
   Anda perlu memasukkan `5000`.
1. Dalam bidang teks **Local address** di kanan, masukkan alamat IP atau 
   hostname di mana situs Anda dijalankan pada server web
   mesin development, diikuti dengan nomor port. Misalnya, jika situs Anda dijalankan 
   di `localhost:7331` Anda perlu memasukkan `localhost:7331`.
1. Klik **Add**.

Penerusan port sekarang sudah siap. Anda bisa melihat indikator status penerusan
port di tab perangkat dalam dialog **Inspect Devices**.

![status penerusan port](imgs/port-forwarding-status.png)

Untuk menampilkan materinya, buka Chrome di perangkat Android dan masuk ke 
port `localhost` yang Anda tetapkan dalam bidang **Device port**. Misalnya, 
jika Anda memasukkan `5000` dalam bidang tersebut, maka Anda akan masuk ke 
`localhost:5000`. 

## Petakan ke domain lokal khusus {:#custom-domains}

Pemetaan domain khusus memungkinkan Anda menampilkan materi di perangkat Android
dari server web di mesin development yang menggunakan domain khusus.

Misalnya, anggaplah situs Anda menggunakan pustaka JavaScript pihak ketiga
yang hanya bekerja di domain daftar putih `chrome.devtools`. Jadi, Anda membuat
sebuah entri di file `hosts` pada mesin development untuk memetakan domain ini 
ke `localhost` (yakni `127.0.0.1 chrome.devtools`). Setelah menyiapkan 
pemetaan domain khusus dan penerusan port, Anda akan dapat menampilkan
situs di perangkat Android di URL `chrome.devtools`. 

### Siapkan penerusan port ke server proxy

Untuk memetakan domain khusus, Anda harus menjalankan server proxy di 
mesin development. Contoh server proxy adalah [Charles][charles], [Squid][squid], 
dan [Fiddler][fiddler].

Untuk menyiapkan penerusan port ke proxy:

1. Jalankan server proxy dan catat port yang digunakannya. **Catatan**: Server 
   proxy dan server web Anda harus dijalankan pada port yang berbeda.
1. Siapkan [penerusan port](#port-forwarding) ke perangkat Android Anda. Untuk bidang
   **local address**, masukkan `localhost:` diikuti dengan port tempat Anda
   menjalankan server proxy. Misalnya, jika dijalankan di port `8000`,
   maka Anda perlu memasukkan `localhost:8000`. Dalam bidang **device port** masukkan 
   nomor yang Anda inginkan untuk didengar oleh perangkat Android, misalnya `3333`.

[charles]: http://www.charlesproxy.com/
[squid]: http://www.squid-cache.org/
[fiddler]: http://www.telerik.com/fiddler

### Konfigurasi setelan proxy di perangkat Anda

Berikutnya, Anda perlu mengonfigurasi perangkat Android untuk berkomunikasi dengan 
server proxy. 

1. Di perangkat Android Anda, masuklah ke **Settings** > **Wi-Fi**.
2. Tekan lama pada nama jaringan yang terhubung dengan Anda saat ini.
   **Catatan**: Setelan proxy berlaku per jaringan.
3. Ketuk **Modify network**.
4. Ketuk **Advanced options**. Tampilan setelan proxy.
5. Ketuk menu **Proxy** dan pilih **Manual**.
6. Untuk bidang **Proxy hostname**, masukkan `localhost`.
7. untuk bidang **Proxy port**, masukkan nomor port yang tadi Anda masukkan untuk
   **device port** di bagian sebelumnya.
8. Ketuk **Simpan**.

Dengan setelan ini, perangkat Anda akan meneruskan semua permintaannya ke proxy di 
mesin development Anda. Proxy akan membuat permintaan atas nama perangkat Anda, 
jadi permintaan ke domain lokal yang disesuaikan akan dipenuhi dengan benar.

Sekarang Anda bisa mengakses domain khusus di perangkat Android seperti yang 
dilakukan di mesin development. 

Jika server web Anda dijalankan pada port non-standar,
jangan lupa untuk menetapkan port saat meminta materi dari perangkat Android
Anda. Misalnya, jika server web Anda menggunakan domain khusus 
`chrome.devtools` di port `7331`, bila menampilkan situs dari perangkat Android
Anda harus menggunakan URL `chrome.devtools:7331`. 

**Tip**: Untuk melanjutkan penjelajahan normal, ingatlah untuk membalik setelan proxy di 
perangkat Android Anda setelah memutus koneksi dari mesin development.


{# wf_devsite_translation #}
