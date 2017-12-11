project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Opsi 1

{# wf_updated_on: 2016-07-26 #}
{# wf_published_on: 2016-03-28 #}

# Chrome DevTools {: .page-title }

Chrome DevTools adalah satu set alat untuk menulis dan men-debug web yang
menjadi bawaan Google Chrome. Gunakan DevTools untuk mengiterasikan, men-debug dan memprofilkan situs Anda.

Dogfood: Mencari yang terbaru, [Chrome Canary](https://www.google.com/intl/en/chrome/browser/canary.html) selalu memiliki DevTools terbaru.

## Membuka Chrome DevTools {: #open }

* Pilih **More Tools** > **Developer Tools** dari Menu Chrome.
* Klik-kanan pada elemen laman dan pilih Inspect
* Gunakan [pintasan keyboard](/web/tools/chrome-devtools/inspect-styles/shortcuts)
<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd> (Windows) atau <kbd>Cmd</kbd>+<kbd>Opt</kbd>+<kbd>I</kbd> (Mac)

## Menemukan Panel

### Device Mode
<img src="/web/tools/chrome-devtools/images/devicemode.png" alt="Device Mode" class="attempt-right">
Gunakan Device Mode untuk membangun pengalaman web yang sangat responsif dan berorientasi seluler.</p>

* [Device Mode](/web/tools/chrome-devtools/device-mode/)
* [Uji Tampilan yang Terlihat dan Khusus-Perangkat yang Responsif](/web/tools/chrome-devtools/device-mode/emulate-mobile-viewports)
* [Mengemulasikan Sensor: Geolokasi &amp; Akselerometer](/web/tools/chrome-devtools/device-mode/device-input-and-sensors)

<div style="clear:both;"></div>

### Elements
<img src="images/elements-panel.png" alt="Panel Elements" class="attempt-right">
Gunakan panel Elements untuk mengulang pada layout dan desain situs Anda dengan memanipulasi DOM dan CSS secara bebas.

* [Periksa dan Modifikasi Laman Anda](/web/tools/chrome-devtools/inspect-styles/)
* [Edit Gaya](/web/tools/chrome-devtools/inspect-styles/edit-styles)
* [Edit DOM](/web/tools/chrome-devtools/inspect-styles/edit-dom)

<div style="clear:both;"></div>

### Console
<img src="images/console-panel.png" alt="Panel Console" class="attempt-right">
Gunakan Console untuk merekam informasi diagnostik ke dalam log selama development atau gunakan sebagai shell untuk berinteraksi dengan JavaScript di laman.

* [Menggunakan Console](/web/tools/chrome-devtools/console/)
* [Berinteraksi dari Baris Perintah](/web/tools/chrome-devtools/console/command-line-reference)

<div style="clear:both;"></div>

### Sources
<img src="images/sources-panel.png" alt="Panel Sources" class="attempt-right">
Debug JavaScript menggunakan breakpoint di panel Sources atau hubungkan file lokal melalui Workspaces untuk menggunakan editor langsung DevTools.

* [Men-debug dengan Breakpoint](/web/tools/chrome-devtools/javascript/add-breakpoints)
* [Debug Kode yang Membingungkan](/web/tools/chrome-devtools/javascript/add-breakpoints)
* [Siapkan Persistensi dengan DevTools Workspace](/web/tools/setup/setup-workflow)

<div style="clear:both;"></div>

### Network
<img src="images/network-panel.png" alt="Panel Network" class="attempt-right">
Gunakan panel Network untuk mendapatkan wawasan mengenai sumber daya yang diminta dan diunduh serta optimalkan kinerja pemuatan laman.

* [Dasar-Dasar Panel Network](/web/tools/chrome-devtools/network-performance/resource-loading)
* [Memahami Resource Timing](/web/tools/chrome-devtools/network-performance/understanding-resource-timing)
* [Throttling Jaringan](/web/tools/chrome-devtools/network-performance/network-conditions)

<div style="clear:both;"></div>

### Timeline
<img src="images/timeline-panel.png" alt="Panel Timeline" class="attempt-right">
Gunakan Timeline untuk meningkatkan kinerja waktu proses laman dengan merekam dan mempelajari beragam kejadian yang terjadi selama daur hidup situs.

* [Cara melihat kinerja](/web/tools/chrome-devtools/evaluate-performance/timeline-tool)
* [Analisis kinerja waktu proses](/web/tools/chrome-devtools/rendering-tools/)
* [Diagnosis Layout Sinkron Paksa](/web/tools/chrome-devtools/rendering-tools/forced-synchronous-layouts)

<div style="clear:both;"></div>

### Profiles
<img src="images/profiles-panel.png" alt="Panel Profiles" class="attempt-right">
Gunakan panel Profiles jika Anda memerlukan lebih banyak informasi daripada yang disediakan oleh Timeline, misalnya untuk melacak kebocoran memori.

* [Pembuat Profil CPU JavaScript](/web/tools/chrome-devtools/rendering-tools/js-execution)
* [Pembuat Profil Heap](/web/tools/chrome-devtools/memory-problems/)

<div style="clear:both;"></div>

### Application
<img src="images/application-panel.png" alt="Panel Application" class="attempt-right">
Gunakan panel Resources untuk memeriksa semua sumber daya yang telah dimuat, termasuk database IndexedDB atau Web SQL, storage sesi dan lokal, cookie, Cache Aplikasi, gambar, font, dan stylesheet.

* [Kelola data](/web/tools/chrome-devtools/manage-data/local-storage)

<div style="clear:both;"></div>

### Security
<img src="images/security-panel.png" alt="Panel Security" class="attempt-right">
Gunakan panel Security untuk men-debug masalah materi campuran, masalah pada sertifikat, dan sebagainya.

* [Security](/web/tools/chrome-devtools/security)

<div style="clear:both;"></div>

## Turut Serta

[Twitter](https://twitter.com/ChromeDevTools){: .button .button-white}
[Stack Overflow](https://stackoverflow.com/questions/tagged/google-chrome-devtools){: .button .button-white}
[Slack](https://chromiumdev.slack.com/messages/devtools/){: .button .button-white}


{# wf_devsite_translation #}
