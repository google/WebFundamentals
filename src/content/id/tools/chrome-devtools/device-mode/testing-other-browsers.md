project_path: /web/tools/chrome-devtools/_project.yaml
book_path: /web/tools/chrome-devtools/_book.yaml
description: Tugas Anda belum selesai di tahap memastikan bahwa situs berjalan mulus di Chrome dan Android. Meskipun Device Mode bisa menyimulasikan berbagai perangkat lain seperti iPhone, kami sarankan agar Anda memeriksa solusi browser lain untuk emulasi.

{# wf_updated_on: 2020-07-21 #}
{# wf_published_on: 2015-04-13 #}
{# wf_blink_components: Platform>DevTools #}

# Mengemulasikan dan Menguji Browser Lainnya {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/pbakaus.html" %}

Tugas Anda belum selesai di tahap memastikan bahwa situs berjalan mulus di Chrome dan Android. Meskipun Device Mode bisa menyimulasikan berbagai perangkat lain seperti iPhone, kami sarankan agar Anda memeriksa solusi browser lain untuk emulasi.


### TL;DR {: .hide-from-toc }
- Jika Anda tidak memiliki perangkat tertentu, atau ingin melakukan pemeriksaan cepat pada sesuatu, langkah terbaik adalah mengemulasikan perangkat langsung dari dalam browser Anda.
- Emulator dan simulator perangkat memungkinkan Anda meniru situs development di berbagai perangkat dari tempat kerja Anda.
- Emulator berbasis cloud memungkinkan Anda mengotomatisasikan pengujian unit untuk situs Anda di platform yang berbeda.


## Emulator browser

Emulator browser sangat bermanfaat untuk menguji daya respons situs, tetapi tidak
mengemulasikan perbedaan di API, dukungan CSS, dan perilaku tertentu yang ingin Anda lihat
di browser seluler. Uji situs Anda pada browser yang berjalan di perangkat fisik agar
yakin semuanya berjalan seperti yang diharapkan.

### Tampilan Desain Responsif Firefox

Firefox memiliki [tampilan desain responsif](https://developer.mozilla.org/en-US/docs/Tools/Responsive_Design_View)
yang mendorong Anda berhenti memikirkan perangkat tertentu, tetapi
sebaiknya eksplorasi perubahan desain pada ukuran layar yang umum atau layar Anda sendiri dengan
menyeret tepinya.

### F12 Emulation Edge

Untuk mengemulasikan Ponsel Windows, gunakan [emulasi bawaan](https://dev.modern.ie/platform/documentation/f12-devtools-guide/emulation/) Microsoft Edge.

Karena Edge tidak dilengkapi kompatibilitas lawas, gunakan [Emulasi IE 11](https://msdn.microsoft.com/en-us/library/dn255001(v=vs.85).aspx) untuk menyimulasikan tampilan halaman Anda di versi lama Internet Explorer.

## Emulator dan simulator perangkat

Simulator dan emulator perangkat tidak hanya menyimulasikan lingkungan browser, tetapi juga keseluruhan perangkat. Alat ini berguna untuk menguji hal-hal yang memerlukan integrasi OS, misalnya masukan formulir dengan keyboard virtual.

### Android Emulator

<figure class="attempt-right">
  <img src="imgs/android-emulator-stock-browser.png" alt="Browser Bawaan Android Emulator">
  <figcaption>Browser Bawaan di Android Emulator</figcaption>
</figure>

Saat ini, menginstal Chrome pada Android emulator tidak bisa dilakukan. Namun demikian, Anda bisa menggunakan Browser Android, Chromium Content Shell, dan Firefox untuk Android yang akan kita bahas nanti di panduan ini. Chromium Content Shell menggunakan mesin rendering Chrome yang sama, tetapi tidak dilengkapi fitur browser khusus apa pun.

Android emulator dilengkapi dengan Android SDK yang harus Anda <a href="http://developer.android.com/sdk/installing/studio.html">download dari
sini</a>. Lalu ikuti petunjuk untuk <a href="http://developer.android.com/tools/devices/managing-avds.html">menyiapkan perangkat virtual</a> dan <a href="http://developer.android.com/tools/devices/emulator.html">memulai emulator</a>.

Setelah emulator dihidupkan, klik ikon Browser dan Anda pun bisa menguji situs pada Browser Bawaan untuk Android versi lama.

#### Chromium Content Shell di Android

<figure class="attempt-right">
  <img src="imgs/android-avd-contentshell.png" alt="Android Emulator Content Shell">
  <figcaption>Android Emulator Content Shell</figcaption>
</figure>

Untuk menginstal Chromium Content Shell untuk Android, biarkan emulator berjalan
dan jalankan perintah berikut di command prompt:

    git clone https://github.com/PaulKinlan/chromium-android-installer.git
    chmod u+x ./chromium-android-installer/\*.sh
    ./chromium-android-installer/install-chromeandroid.sh

Sekarang Anda bisa menguji situs Anda dengan Chromium Content Shell.


#### Firefox di Android

<figure class="attempt-right">
  <img src="imgs/ff-on-android-emulator.png" alt="Ikon Firefox di Android Emulator">
  <figcaption>Ikon Firefox di Android Emulator</figcaption>
</figure>

Sama dengan Chromium Content Shell, Anda bisa mendapatkan APK untuk menginstal Firefox di emulator.

Download file .apk yang benar dari <a href="https://ftp.mozilla.org/pub/mozilla.org/mobile/releases/latest/">https://ftp.mozilla.org/pub/mozilla.org/mobile/releases/latest/</a>.

Dari sini, Anda bisa menginstal file pada emulator yang terbuka atau perangkat Android yang terhubung dengan perintah berikut:

    adb install &lt;path to APK&gt;/fennec-XX.X.XX.android-arm.apk


### Simulator iOS

Simulator iOS untuk Mac OS X satu paket dengan Xcode, yang bisa Anda [instal dari
App Store](https://itunes.apple.com/us/app/xcode/id497799835?ls=1&mt=12).

Setelah selesai, pelajari cara menggunakan simulator ini di [dokumentasi Apple](https://developer.apple.com/library/prerelease/ios/documentation/IDEs/Conceptual/iOS_Simulator_Guide/Introduction/Introduction.html).

Note: Agar tidak perlu membuka Xcode setiap kali Anda ingin menggunakan Simulator iOS, buka simulator, lalu klik kanan ikon Simulator iOS di dok Anda dan pilih `Keep in Dock`. Sekarang, cukup klik ikon ini kapan saja Anda perlu.

### Modern.IE

<figure class="attempt-right">
  <img src="imgs/modern-ie-simulator.png" alt="VM Modern IE">
  <figcaption>VM Modern IE</figcaption>
</figure>

Mesin Virtual Modern.IE memungkinkan Anda mengakses versi IE yang berbeda di komputer Anda melalui VirtualBox (atau VMWare). Pilih mesin virtual di <a href="https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/">halaman download di sini</a>.


## Emulator dan simulator berbasis cloud

Jika Anda tidak bisa menggunakan emulator dan tidak memiliki akses ke perangkat fisik, emulator berbasis cloud bisa menjadi pilihan terbaik. Keuntungan utama emulator berbasis cloud dibanding perangkat fisik dan emulator lokal adalah Anda bisa mengotomatiskan pengujian unit untuk situs Anda di berbagai platform yang berbeda.

* [BrowserStack (komersial)](https://www.browserstack.com/automate) adalah yang paling mudah digunakan untuk pengujian manual. Anda bisa memilih sistem operasi, memilih versi browser dan jenis perangkat, memilih URL untuk dijelajahi, dan BrowserStack akan menghidupkan mesin virtual yang di-host yang dengannya Anda bisa berinteraksi. Anda juga bisa mengaktifkan beberapa emulator di layar yang sama, sehingga Anda bisa menguji bagaimana tampilan dan nuansa aplikasi Anda di berbagai perangkat yang berbeda sekaligus.
* [SauceLabs (komersial)](https://saucelabs.com/){: .external } memungkinkan Anda menjalankan pengujian unit di dalam emulator yang bisa menjadi sangat berguna untuk menuliskan skrip aliran melalui situs Anda dan melihat rekaman video aliran ini setelahnya pada berbagai perangkat. Anda juga bisa melakukan pengujian manual untuk situs Anda.
* [Device Anywhere (komersial)](http://www.keynote.com/solutions/testing/mobile-testing) tidak
menggunakan emulator, tetapi perangkat fisik yang bisa Anda kontrol dari jauh. Ini sangat berguna apabila Anda perlu mereproduksi masalah pada perangkat khusus dan tidak bisa melihat bug di opsi yang lain di panduan ini.


## Masukan {: #feedback }

{% include "web/_shared/helpful.html" %}
