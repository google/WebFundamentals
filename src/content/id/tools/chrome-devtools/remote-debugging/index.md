project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Debug materi langsung dari jauh di perangkat Android dari komputer Windows, Mac atau Linux.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2015-04-13 #}

<style>
.devtools-inline {
  max-height: 1em;
  vertical-align: middle;
}
</style>

# Memulai dengan Men-debug Perangkat Android dari Jauh {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Debug materi langsung dari jauh di perangkat Android dari komputer 
Windows, Mac, atau Linux. Tutorial ini mengajarkan kepada Anda cara:

* Menyiapkan perangkat Android untuk debug dari jauh, dan menemukannya dari 
  mesin development Anda.
* Memeriksa dan men-debug materi langsung di perangkat Android dari
  mesin development Anda.
* Melakukan siaran layar atas materi dari perangkat Android ke instance DevTools di
  mesin development.

![ilustrasi debug dari jauh](imgs/remote-debugging.png)

## Persyaratan {: #requirements }

* Chrome 32 atau yang lebih baru telah dipasang di mesin development Anda.
* [Driver USB][drivers] telah dipasang di mesin development, jika Anda menggunakan
  Windows. Pastikan _Device Manager_ melaporkan driver USB dengan benar.
* Kabel USB untuk menghubungkan perangkat Android ke mesin development Anda.
* Android 4.0 atau yang lebih baru.
* Chrome untuk Android telah dipasang di perangkat Android Anda.

[drivers]: https://developer.android.com/tools/extras/oem-usb.html

## Langkah 1: Temukan perangkat Android Anda {: #discover }

1. Pada perangkat Android Anda, pilih **Settings** > **Developer Options** >
   **Enable USB Debugging**. **Developer Options** disembunyikan secara default di
   Android 4.2 dan yang lebih baru. Lihat [Mengaktifkan Opsi Developer Pada-Perangkat][android]
   untuk mempelajari cara mengaktifkannya.

[android]: https://developer.android.com/studio/run/device.html#developer-device-options

1. Di mesin development, buka Chrome. Anda harus masuk ke
   Chrome dengan salah satu akun Google. Debug dari jauh tidak berfungsi di
   [Mode Penyamaran][incognito] atau [Akses Tamu][guest].

[guest]: https://support.google.com/chrome/answer/6130773
[incognito]: https://support.google.com/chrome/answer/95464

1. [Buka DevTools](/web/tools/chrome-devtools/#open).

1. Di DevTools, klik **Main Menu** ![Main Menu][main]{:.devtools-inline} 
   kemudian pilih **More tools** > **Remote devices**. 

     ![Membuka panel samping perangkat jauh][open]

[main]: /web/tools/chrome-devtools/images/three-dot.png
[open]: /web/tools/chrome-devtools/remote-debugging/imgs/open-remote-devices.png

1. Di DevTools, klik tab **Settings**, jika ada tab lain yang ditampilkan.

1. Pastikan **Discover USB devices** telah diaktifkan.

     ![Discover USB devices telah diaktifkan][discover]

[discover]: /web/tools/chrome-devtools/remote-debugging/imgs/discover-usb-devices.png

1. Hubungkan perangkat Android Anda secara langsung ke mesin development
   dengan menggunakan kabel USB. Jangan gunakan hub USB perantara. Jika baru pertama kali
   menghubungkan perangkat Android ke mesin development, perangkat
   Anda akan ditampilkan pada **Unknown**, bersama teks **Pending Authorization** di
   bawahnya.

       ![Perangkat tidak dikenal, menunggu otorisasi][unknown]

[unknown]: /web/tools/chrome-devtools/remote-debugging/imgs/unknown-device.png

1. Jika perangkat Anda ditampilkan sebagai **Unknown**, terimalah konfirmasi izin **Allow USB
   Debugging** di perangkat Android. **Unknown** diganti
   dengan nama model perangkat Android Anda. Lingkaran hijau
   dan teks **Connected** menunjukkan bahwa Anda siap men-
   debug dari jauh perangkat Android dari mesin development.

Note: Jika mengalami masalah selama proses pencarian, Anda 
bisa mengulanginya dengan memilih **Settings** > **Developer Options** >
**Revoke USB Debugging Authorizations** di perangkat Android.

## Langkah 2: Debug materi di perangkat Android dari mesin development Anda {: #debug }

1. Jika Anda belum membuka Chrome di perangkat Android, bukalah sekarang.

1. Kembali ke DevTools, klik tab yang cocok dengan
   nama model perangkat Anda. Di bagian atas laman ini, Anda akan melihat nama model
   perangkat Android, diikuti dengan nomor serinya. Di bawahnya, Anda bisa melihat versi
   Chrome yang dijalankan pada perangkat itu, bersama nomor versi
   dalam tanda kurung. Setiap tab Chrome yang dibuka akan mendapatkan bagiannya sendiri. Anda bisa berinteraksi
   berinteraksi dengan tab itu dari bagian ini. Jika ada aplikasi yang sedang menggunakan WebView, Anda
   akan melihat bagian untuk setiap aplikasi itu juga. Tangkapan layar di bawah ini tidak
   memiliki tab atau WebView yang terbuka.

       ![Perangkat jauh yang terhubung][connected]

[connected]: /web/tools/chrome-devtools/remote-debugging/imgs/connected-remote-device.png

1. Di sebelah **New tab**, masukkan URL kemudian klik **Open**. Laman akan dibuka
   di sebuah tab baru di perangkat Android Anda.

1. Klik **Inspect** di sebelah URL yang baru saja Anda buka. Sebuah instance baru DevTools
   akan terbuka. Versi Chrome yang dijalankan pada perangkat Android
   menentukan versi DevTools yang dibuka di mesin development Anda.
   Jadi, jika perangkat Android Anda menjalankan versi Chrome yang sudah sangat lama, instance
   DevTools mungkin terlihat sangat berbeda dari yang biasa Anda gunakan.

### Tindakan selengkapnya: muat ulang, fokus, atau tutup tab {: #more-actions }

Klik **More Options** ![More Options][more]{:.devtools-inline} di sebelah
tab yang ingin Anda muat ulang, fokus, atau tutup.

[more]: /web/tools/chrome-devtools/images/three-dot.png

![muat ulang, fokus, atau tutup tab](imgs/reload.png)

### Periksa elemen {: #inspect }

Masuklah ke panel **Elements** di instance DevTools Anda, dan arahkan ke atas
elemen untuk menyorotnya di tampilan yang terlihat pada perangkat Android.

Anda juga bisa mengetuk sebuah elemen pada layar perangkat Android untuk memilihnya di panel
**Elements**. Klik **Select Element** ![Select
Element][pilih]{:.devtools-inline} pada instance DevTools, kemudian ketuk
elemen di layar perangkat Android Anda. Perhatikan, **Select Element**
dinonaktifkan setelah sentuhan pertama, jadi Anda perlu mengaktifkannya kembali setiap kali
ingin menggunakan fitur ini.

[pilih]: imgs/select-element.png

### Siaran layar dari perangkat Android ke mesin development {: #screencast }

Klik **Toggle Screencast** ![Toggle Screencast][screencast]{:.devtools-inline}
untuk menampilkan isi perangkat Android Anda di instance DevTools.

[screencast]: imgs/toggle-screencast.png

Anda bisa berinteraksi dengan siaran layar dalam beberapa cara:

* Klik diterjemahkan menjadi ketukan, yang akan memicu kejadian touch yang sesuai di perangkat. 
* Penekanan tombol di komputer Anda akan dikirim ke perangkat. 
* Untuk menyimulasikan isyarat mencubit, tahan tombol <kbd>Shift</kbd> saat menyeret. 
* Untuk menggulir, gunakan trackpad atau roda mouse, atau gerakan membuang dengan
  pointer mouse.

Beberapa catatan mengenai siaran layar:

* Siaran layar hanya menampilkan materi laman. Bagian transparan siaran layar 
  menyatakan antarmuka perangkat, seperti Chrome omnibox, bilah status Android, 
  atau keyboard Android.
* Siaran layar berpengaruh negatif pada kecepatan bingkai. Nonaktifkan siaran layar saat
  mengukur guliran atau animasi untuk mendapatkan gambaran kinerja laman
  yang lebih akurat.
* Jika layar perangkat Android dikunci, materi siaran layar
  Anda akan menghilang. Buka kunci layar perangkat Android Anda secara otomatis untuk melanjutkan
  siaran layar.

## Masukan {: #feedback }

Jika Anda ingin membantu kami meningkatkan tutorial ini, jawablah
pertanyaan di bawah ini!

{% framebox width="auto" height="auto" %}
<p>Apakah Anda berhasil menyelesaikan tutorial ini?</p>
<button class="gc-analytics-event"
   data-category="DevTools / Remote Debugging"
   data-label="Completed / Yes">Ya</button>
<button class="gc-analytics-event"
   data-category="DevTools / Remote Debugging"
   data-label="Completed / No">Tidak</button>
<p>Apakah tutorial ini berisi informasi yang Anda cari?</p>
<button class="gc-analytics-event"
   data-category="DevTools / Remote Debugging"
   data-label="Relevant / Yes">Ya</button>
<button class="gc-analytics-event"
   data-category="DevTools / Remote Debugging"
   data-label="Relevant / No">Tidak</button>
{% endframebox %}


{# wf_devsite_translation #}
