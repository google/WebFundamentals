project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Mode kejadian timeline menampilkan semua kejadian yang dipicu saat membuat rekaman. Gunakan referensi kejadian timeline untuk mempelajari selengkapnya tentang setiap jenis kejadian timeline.

{# wf_updated_on: 2015-05-11 #}
{# wf_published_on: 2015-04-13 #}

# Referensi Kejadian Timeline {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/flaviocopes.html" %}

Mode kejadian timeline menampilkan semua kejadian yang dipicu saat membuat rekaman. Gunakan referensi kejadian timeline untuk mempelajari selengkapnya tentang setiap jenis kejadian timeline.


## Properti kejadian timeline umum

Beberapa detail ditampilkan pada semua jenis kejadian, sedangkan sebagian lagi hanya berlaku pada jenis kejadian tertentu. Bagian ini mencantumkan properti yang umum pada berbagai jenis kejadian. Properti yang spesifik untuk jenis kejadian tertentu dicantumkan di referensi untuk jenis kejadian yang mengikutinya.

| Properti   |      Kapan ditampilkan                                                       |
|----------|:-----------------------------------------------------------------|
| Aggregated time | Untuk kejadian dengan [kejadian tersarang](/web/tools/chrome-devtools/profile/evaluate-performance/timeline-tool#view-nested-events), waktu yang dibutuhkan oleh setiap kategori kejadian.|
| Call Stack | Untuk kejadian dengan [kejadian anak](/web/tools/chrome-devtools/profile/evaluate-performance/timeline-tool#view-nested-events), waktu yang dibutuhkan oleh setiap kategori kejadian.|
| CPU time | Berapa lama waktu CPU yang dibutuhkan oleh kejadian yang direkam.|
| Details | Detail lainnya tentang kejadian.|
| Duration (at time-stamp) | Waktu yang dibutuhkan oleh kejadian bersama semua anaknya sampai selesai; stempel waktu adalah waktu saat kejadian terjadi, relatif terhadap waktu rekaman dimulai.|
| Self time    | Waktu yang dibutuhkan kejadian tanpa anaknya.|
| Used Heap Size | Besar memori yang dipakai oleh aplikasi saat kejadian direkam, dan perubahan delta (+/-) di ukuran heap yang digunakan sejak pengambilan sampel terakhir.|

## Memuat kejadian

Bagian ini mencantumkan kejadian yang berada dalam kategori Loading dan propertinya.

| Kejadian | Keterangan |
|-------|:----------|
|Parse HTML|  Chrome mengeksekusi algoritme yang mem-parse HTML-nya.|
|Finish Loading|  Permintaan jaringan selesai.|
|Receive Data| Data untuk sebuah permintaan diterima. Ada satu atau beberapa kejadian Receive Data.|
|Receive Response|  Respons HTTP awal dari sebuah permintaan.|
|Send Request|  Permintaan jaringan telah dikirim.|

### Properti kejadian Loading

| Properti | Keterangan |
|-------|:----------|
|Resource|URL sumber daya yang diminta.|
|Preview|Pratinjau sumber daya yang diminta (hanya gambar).|
|Request Method|Metode HTTP yang digunakan untuk permintaan (misalnya, GET atau POST).|
|Status Code|Kode respons HTTP.|
|MIME Type|Tipe MIME sumber daya yang diminta.|
|Encoded Data Length|Panjang sumber daya yang diminta dalam byte.|

## Kejadian Scripting

Bagian ini mencantumkan kejadian yang termasuk dalam kategori Scripting dan propertinya.

| Kejadian | Keterangan |
|-------|:----------|
|Animation Frame Fired| Bingkai animasi yang dijadwalkan terpicu dan penangan callback-nya dijalankan.|
|Cancel Animation Frame|  Bingkai animasi yang dijadwalkan dibatalkan.|
|GC Event|  Terjadi pengumpulan sampah.|
|DOMContentLoaded|  [DOMContentLoaded](https://docs.webplatform.org/wiki/dom/events/DOMContentLoaded) dipicu oleh browser. Kejadian ini dipicu saat semua materi DOM laman telah dimuat dan di-parse.|
|Evaluate Script| Sebuah skrip dievaluasi.|
|Event| Sebuah kejadian JavaScript (misalnya, "mousedown" atau "key").|
|Function Call| Panggilan fungsi JavaScript tingkat tinggi dibuat (hanya muncul saat browser memasuki mesin JavaScript.|
|Install Timer| Sebuah timer dibuat dengan [setInterval()](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval) atau [setTimeout()](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setTimeout).|
|Request Animation Frame| Sebuah panggilan `requestAnimationFrame()` menjadwalkan bingkai baru|
|Remove Timer|  Timer yang sebelumnya dibuat dibersihkan.|
|Time|  Sebuah skrip memanggil [console.time()](/web/tools/chrome-devtools/debug/console/console-reference#consoletimelabel)|
|Time End|  Sebuah skrip memanggil [console.timeEnd()](/web/tools/chrome-devtools/debug/console/console-reference#consoletimeendlabel)|
|Timer Fired| Sebuah timer terpicu yang dijadwalkan dengan `setInterval()` atau `setTimeout()`.|
|XHR Ready State Change|  Status siap XMLHTTPRequest berubah.|
|XHR Load|  Sebuah `XMLHTTPRequest` selesai dimuat.|

### Properti kejadian Scripting

| Properti | Keterangan |
|-------|:----------|
|Timer ID|ID timer.|
|Timeout|Waktu tunggu yang ditetapkan oleh timer.|
|Repeats|Boolean yang menetapkan apakah timer diulangi.|
|Function Call|Sebuah fungsi yang dipanggil.|

## Kejadian Rendering

Bagian ini mencantumkan kejadian yang termasuk dalam kategori Rendering dan propertinya.

| Kejadian | Keterangan |
|-------|:----------|
|Invalidate layout| Layout laman dibuat tidak valid oleh perubahan DOM.|
|Layout|  Sebuah layout laman dieksekusi.|
|Recalculate style| Chrome menghitung ulang gaya elemen.|
|Scroll|  Materi tampilan bersarang digulir.|

### Properti kejadian Rendering

| Properti | Keterangan |
|-------|:----------|
|Layout invalidated|Untuk catatan Layout, pelacakan tumpukan kode yang menyebabkan layout diinvalidkan.|
|Nodes that need layout|Untuk catatan Layout, jumlah simpul yang ditandai sebagai memerlukan layout sebelum layout ulang dimulai. Ini biasanya simpul yang dibuat tidak valid oleh kode developer, ditambah jalur ke atas ke akar layout ulang.|
|Layout tree size|Untuk catatan Layout, total jumlah simpul di bawah akar layout ulang (simpul tempat Chrome memulai layout ulang).|
|Layout scope|Nilai yang mungkin adalah "Partial" (batas layout ulang adalah bagian dari DOM) atau "Whole document".|
|Elements affected|Untuk catatan gaya Recalculate, jumlah elemen yang terkena dampak penghitungan ulang gaya.|
|Styles invalidated|Untuk catatan gaya Recalculate, menyediakan pelacakan tumpukan kode yang disebabkan oleh invalidasi gaya.|

## Kejadian Painting

Bagian ini mencantumkan kejadian yang termasuk dalam kategori Painting dan propertinya.

| Kejadian | Keterangan |
|-------|:----------|
|Composite Layers|  Mesin rendering Chrome mengomposisikan layer gambar.|
|Image Decode|  Sebuah sumber daya gambar didekode.|
|Image Resize|  Sebuah gambar diubah ukurannya dari dimensi bawaannya.|
|Paint| Layer yang dikomposisi digambarkan ke sebuah region tampilan. Mengarahkan kursor ke atas catatan Paint menyorot region tampilan yang diperbarui.|

### Properti kejadian Painting

| Properti | Keterangan |
|-------|:----------|
|Location|Untuk kejadian Paint, koordinat x dan y kotak paint.|
|Dimensions|Untuk kejadian Paint, tinggi dan lebar region yang digambar.|




{# wf_devsite_translation #}
