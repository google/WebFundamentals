project_path: /web/tools/chrome-devtools/_project.yaml
book_path: /web/tools/chrome-devtools/_book.yaml
description: Melakukan debug konten langsung dari jarak jauh di perangkat Android dari komputer Windows, Mac, atau Linux.

{# wf_updated_on: 2020-07-10 #}
{# wf_published_on: 2015-04-13 #}
{# wf_blink_components: Platform>DevTools #}

<style>
.devtools-inline {
  max-height: 1em;
  vertical-align: middle;
}
</style>

# Memulai Proses Debug Jarak Jauh di Perangkat Android {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Melakukan debug konten langsung dari jauh di perangkat Android dari komputer 
Windows, Mac, atau Linux. Tutorial ini mengajarkan kepada Anda cara:

* Menyiapkan perangkat Android untuk debug dari jarak jauh, dan menemukannya dari
  mesin pengembangan.
* Memeriksa dan melakukan debug konten langsung di perangkat Android dari mesin
  pengembangan.
* Melakukan screencast konten dari perangkat Android ke instance DevTools di
  mesin pengembangan.

<figure>
  <img src="imgs/remote-debugging.png"
       alt="Dengan Proses Debug dari Jarak Jauh, Anda dapat memeriksa halaman yang beroperasi di perangkat Android dari
            mesin pengembangan."/>
  <figcaption>
    <b>Gambar 1</b>. Dengan Proses Debug dari Jarak Jauh, Anda dapat memeriksa halaman yang beroperasi di perangkat Android
    dari mesin pengembangan.
  </figcaption>
</figure>

## Langkah 1: Temukan perangkat Android {: #discover }

Alur kerja di bawah ini berfungsi untuk sebagian besar pengguna. Baca [Pemecahan masalah: DevTools tidak mendeteksi
perangkat Android](#troubleshooting) untuk mendapatkan bantuan lebih lanjut.

1. Buka layar **Developer Options** di Android. Baca [Konfigurasi Opsi Developer
   Di Perangkat](https://developer.android.com/studio/debug/dev-options.html){:.external}.
1. Pilih **Enable USB Debugging**.
1. Di mesin pengembangan, buka Chrome.
1. [Buka DevTools](/web/tools/chrome-devtools/#open).
1. Di DevTools, klik **Main Menu** ![Menu Utama][main]{:.devtools-inline} 
   lalu pilih **More tools** > **Remote devices**. 

     <figure>
       <img src="imgs/open-remote-devices.png"
            alt="Membuka tab Perangkat Jarak Jauh melalui Menu Utama."/>
       <figcaption>
         <b>Gambar 2</b>. Membuka tab <b>Perangkat Jarak Jauh</b> melalui <b>Menu Utama</b>
       </figcaption>
     </figure>

[main]: /web/tools/chrome-devtools/images/three-dot.png
[open]: /web/tools/chrome-devtools/remote-debugging/imgs/open-remote-devices.png

1. Di DevTools, buka tab **Settings**.

1. Pastikan kotak centang **Discover USB devices** diaktifkan.

     <figure>
       <img src="imgs/discover-usb-devices.png" alt="Kotak centang Temukan Perangkat USB
           diaktifkan."/>
       <figcaption>
         <b>Gambar 3</b>. Kotak centang <b>Temukan Perangkat USB</b> diaktifkan
       </figcaption>
     </figure>

[discover]: /web/tools/chrome-devtools/remote-debugging/imgs/discover-usb-devices.png

1. Sambungkan perangkat Android secara langsung ke mesin pengembangan menggunakan kabel
   USB. Saat pertama kali melakukan ini, biasanya Anda melihat DevTools telah mendeteksi perangkat
   yang tidak dikenal. Jika Anda melihat titik hijau dan teks **Connected** di bawah nama model
   perangkat Android, DevTools berhasil membuat sambungan ke
   perangkat. Lanjutkan ke [Langkah 2](#debug).

     <figure>
       <img src="imgs/unknown-device.png" alt="Tab Perangkat Jarak Jauh berhasil mendeteksi
           perangkat yang tidak dikenal yang menunggu otorisasinya."/>
       <figcaption>
         <b>Gambar 4</b>. Tab <b>Perangkat Jarak Jauh</b> berhasil mendeteksi perangkat
         tidak dikenal yang menunggu otorisasi
       </figcaption>
     </figure>


[unknown]: /web/tools/chrome-devtools/remote-debugging/imgs/unknown-device.png

1. Jika perangkat muncul sebagai **Tidak Dikenal**, terima permintaan izin **Allow USB
   Debugging** di perangkat Android. 

### Pemecahan masalah: DevTools tidak mendeteksi perangkat Android {: #troubleshooting }

Pastikan hardware disiapkan dengan benar:

* Jika Anda menggunakan hub USB, coba sambungkan perangkat Android secara langsung ke
  mesin pengembangan.
* Coba cabut kabel USB antara perangkat Android dan mesin pengembangan,
  lalu colokkan kembali. Lakukan saat layar Android dan mesin pengembangan
  terbuka kuncinya.
* Pastikan kabel USB berfungsi. Anda seharusnya dapat memeriksa file di perangkat Android
  dari mesin pengembangan.

Pastikan software disiapkan dengan benar:

* Jika mesin pengembangan menjalankan Windows, coba instal driver USB secara manual untuk
  perangkat Android. Lihat [Menginstal Driver USB OEM][drivers]{:.external}.
* Beberapa kombinasi perangkat Windows dan Android (terutama Samsung) memerlukan penyiapan
  ekstra. Lihat [Perangkat Chrome DevTools tidak mendeteksi perangkat saat dicolok][SO]{:.external}.

Jika Anda tidak melihat perintah **Allow USB Debugging** di perangkat Android, coba:

* Lepas dan sambungkan kembali kabel USB saat DevTools difokuskan di
  mesin pengembangan dan layar utama Android muncul. Dengan kata lain,
  kadang perintah tidak muncul jika layar Android atau mesin pengembangan
  terkunci.
* Perbarui setelan layar untuk perangkat Android dan mesin
  pengembangan agar tidak pernah nonaktif.
* Setel mode USB Android ke PTP. Lihat [Galaxy S4 tidak menampilkan kotak dialog Izinkan proses debug USB
](https://android.stackexchange.com/questions/101933){: .external }.
* Pilih **Revoke USB Debugging Authorizations** dari layar **Developer Options** di
  perangkat Android untuk menyetel ulang ke keadaan baru.

Jika Anda menemukan solusi yang tidak disebutkan di bagian ini atau di [Perangkat Chrome DevTools
tidak mendeteksi perangkat saat dicolok][SO]{: .external}, tambahkan jawaban atas pertanyaan Stack
Overflow tersebut, atau [buka masalah di repositori webfundamentals][issue]{:.external}!

[drivers]: https://developer.android.com/tools/extras/oem-usb.html
[SO]: https://stackoverflow.com/questions/21925992
[issue]: https://github.com/google/webfundamentals/issues/new?title=[Remote%20Debugging]

## Langkah 2: Debug konten di perangkat Android dari mesin pengembangan {: #debug }

1. Buka Chrome di perangkat Android.
1. Di tab **Remote Devices**, klik tab yang cocok dengan nama model perangkat Android Anda.
   Di bagian atas halaman ini, Anda akan melihat nama model perangkat Android, diikuti dengan nomor
   serinya. Di bawahnya, Anda dapat melihat versi Chrome yang dijalankan di perangkat, beserta
  nomor versi  dalam tanda kurung. Tiap tab Chrome yang dibuka akan mendapatkan bagiannya sendiri. Anda dapat
   berinteraksi dengan tab tersebut dari bagian ini. Jika ada aplikasi yang sedang menggunakan WebView, Anda juga akan melihat
   bagian untuk tiap aplikasi tersebut. Di <b>Gambar 5</b> tidak ada tab atau WebView yang terbuka.

     <figure>
       <img src="imgs/connected-remote-device.png" alt="Perangkat jarak jauh yang tersambung."/>
       <figcaption>
         <b>Gambar 5</b>. Perangkat jarak jauh yang tersambung
       </figcaption>
     </figure>

1. Di kotak teks **New tab**, masukkan URL, lalu klik **Open**. Halaman akan dibuka
   di tab baru di perangkat Android.

1. Klik **Inspect** di samping URL yang baru saja Anda buka. Instance baru DevTools
   akan terbuka. Versi Chrome yang dijalankan di perangkat Android
   menentukan versi DevTools yang dibuka di mesin pengembangan Anda.
   Jadi, jika perangkat Android Anda menjalankan versi Chrome yang sudah sangat lama, instance
   DevTools mungkin terlihat sangat berbeda dari yang biasa Anda gunakan.

### Tindakan lainnya: muat ulang, fokus, atau tutup tab {: #more-actions }

Klik **More Options** ![Opsi Lainnya][more]{:.devtools-inline} di samping
tab yang ingin Anda muat ulang, fokuskan, atau tutup.

[more]: /web/tools/chrome-devtools/images/three-dot.png

<figure>
  <img src="imgs/reload.png" alt="Menu untuk memuat ulang, menfokuskan, atau menutup tab."/>
  <figcaption>
    <b>Gambar 6</b>. Menu untuk memuat ulang, menfokuskan, atau menutup tab.
  </figcaption>
</figure>

### Memeriksa elemen {: #inspect }

Buka panel **Elements** di instance DevTools, dan arahkan kursor ke
elemen untuk menandainya dalam viewport perangkat Android.

Anda juga dapat menge-tap sebuah elemen di layar perangkat Android untuk memilihnya di panel
**Elements**. Klik **Select Element** ![Pilih
Elemen][select]{:.devtools-inline} di instance DevTools, lalu tap
elemen di layar perangkat Android Anda. Perlu diperhatikan, **Select Element**
dinonaktifkan setelah sentuhan pertama, jadi Anda perlu mengaktifkannya kembali setiap kali
ingin menggunakan fitur ini.

[select]: imgs/select-element.png

### Screencast layar Android ke mesin pengembangan {: #screencast }

Klik **Toggle Screencast** ![Beralih Screencast][screencast]{:.devtools-inline}
untuk melihat konten perangkat Android di instance DevTools.

[screencast]: imgs/toggle-screencast.png

Anda dapat berinteraksi dengan screencast dalam beberapa cara:

* Klik diterjemahkan menjadi tap, yang akan mengaktifkan peristiwa sentuh yang sesuai di perangkat. 
* Penekanan tombol di komputer akan dikirimkan ke perangkat. 
* Untuk menyimulasikan gestur mencubit, tahan tombol <kbd>Shift</kbd> saat menarik. 
* Untuk scroll, gunakan trackpad atau roda mouse, atau gerakan membuang dengan
  pointer mouse.

Beberapa catatan mengenai screencast:

* Screencast hanya menampilkan konten halaman. Bagian yang transparan di screencast 
  merepresentasikan antarmuka perangkat, seperti kolom URL Chrome, status bar Android 
  , atau keyboard Android.
* Screencast secara negatif memengaruhi kecepatan gambar. Nonaktifkan screencast saat
  mengukur scroll atau animasi untuk mendapatkan gambaran performa halaman
  yang lebih akurat.
* Jika layar perangkat Android terkunci, konten screencast
  menghilang. Buka kunci layar perangkat Android secara otomatis untuk melanjutkan
  screencast.

## Masukan {: #feedback }

{% include "web/_shared/helpful.html" %}
