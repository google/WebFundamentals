project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: WebVR

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-12-12 #}

# WebVR {: .page-title }

Caution: WebVR masih eksperimental dan dapat berubah.

WebVR adalah JavaScript API yang memanfaatkan headset VR dan perangkat berkemampuan VR yang dimiliki pengguna — seperti [headset Daydream](https://vr.google.com/daydream/) dan ponsel Pixel — untuk menciptakan pengalaman 3D yang lebih mendalam di browser Anda.

<img src="img/getting-started-with-webvr.jpg" alt="Mulai dengan WebVR" />

## Dukungan dan Ketersediaan

Saat ini WebVR API tersedia di:

* Chrome Beta (M56+), melalui [Origin Trial](https://github.com/jpchase/OriginTrials/blob/gh-pages/developer-guide.md).
* Firefox Nightly.
* Browser Samsung Internet untuk Gear VR. (Harap diingat: versi lama spesifikasi WebVR saat ini telah didukung.)

Untuk browser yang tidak mendukung WebVR, atau mungkin memiliki versi API yang lebih lama, Anda bisa mundur ke [WebVR Polyfill](https://github.com/googlevr/webvr-polyfill). Akan tetapi, ingatlah bahwa VR *sangat peka pada kinerja* dan polyfill umumnya memiliki biaya kinerja yang relatif besar, jadi Anda mungkin perlu mempertimbangkan penggunaan polyfill bagi pengguna yang tidak memiliki dukungan asli untuk WebVR.

Bila ragu, jangan sampai membuat orang mabuk darat lantaran kinerja pengalaman yang buruk!

[Dapatkan status terbaru mengenai WebVR.](./status/)

## Membuat Materi WebVR

Untuk membuat materi WebVR Anda perlu memanfaatkan beberapa API baru, serta teknologi yang ada seperti [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial) dan [Web Audio](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API), serta mempertimbangkan beragam tipe masukan dan headset.

<div class="attempt-left">
  <h3>Memulai dengan WebVR</h3>
  <a href="./getting-started-with-webvr/">
    <img src="img/getting-started-with-webvr.jpg" alt="Mulai dengan WebVR" />
  </a>
  <p>
    Buat awal yang baik menggunakan WebVR dengan mengambil adegan WebGL dan menambahkan VR API.<br>
    <a href="./getting-started-with-webvr/">Ketahui Selengkapnya</a>
  </p>
</div>
<div class="attempt-right">
  <h3>Tambahkan Masukan ke Adegan WebVR</h3>
  <a href="./adding-input-to-a-webvr-scene/">
    <img src="img/adding-input-to-a-webvr-scene.jpg" alt="Tambahkan masukan ke adegan WebVR" />
  </a>
  <p>
    Interaksi adalah bagian yang sangat penting dalam menyediakan pengalaman yang menarik dan mendalam.<br>
    <a href="./adding-input-to-a-webvr-scene/">Mulai</a>
  </p>
</div>

<div class="clearfix"></div>

### Sumber daya selengkapnya

Ada banyak sumber daya WebVR bagus yang mulai muncul di web.

* [Pelajari tentang WebVR API](https://developer.mozilla.org/en-US/docs/Web/API/WebVR_API)
* [Lihat Contoh WebVR](https://webvr.info/samples/)
* [Mendesain Google Cardboard](https://www.google.com/design/spec-vr/designing-for-google-cardboard/a-new-dimension.html)

## Lacak kinerja Anda

<img src="img/oce.png" class="attempt-right" alt="Kinerja WebVR" />

Untuk meminimalkan ketidaknyamanan bagi orang yang menggunakan pengalaman WebVR, mereka harus mempertahankan laju bingkai yang konsisten (dan tinggi). Bila tidak dilakukan, itu bisa membuat pengguna mabuk darat!

Para perangkat seluler, laju penyegaran umumnya 60 Hz, ini berarti targetnya adalah 60 fps (atau 16 md per bingkai *termasuk* overhead browser per bingkai). Di desktop, target umumnya adalah 90 Hz (11 md termasuk overhead).

Untuk memenuhi target ini, Anda perlu menguji [secara berkala pada perangkat target](/web/tools/chrome-devtools/remote-debugging/), dan harus [menggunakan Timeline di Chrome DevTools untuk mengukur biaya per-bingkai](/web/tools/chrome-devtools/evaluate-performance/timeline-tool).

## Terapkan Penyempurnaan Progresif

<img src="img/touch-input.png" class="attempt-right" alt="Gunakan Penyempurnaan Progresif untuk memaksimalkan jangkauan" />

Apa yang akan Anda lakukan jika pengguna tidak memiliki Head Mounted Display (‘HMD’) atau perangkat berkemampuan VR? Jawaban terbaik adalah menggunakan Penyempurnaan Progresif.

1. Anggaplah pengguna menggunakan masukan tradisional, misalnya keyboard, mouse, atau layar sentuh tanpa akses ke headset VR.
2. Adaptasikan pada perubahan dalam masukan dan ketersediaan headset pada waktu proses.

Untungnya [WebVR API](https://developer.mozilla.org/en-US/docs/Web/API/WebVR_API) memungkinkan mendeteksi perubahan pada lingkungan VR agar kita dapat menemukan dan mengadaptasikan dengan perubahan dalam masukan dan menampilkan opsi di perangkat pengguna.

Dengan menganggap lingkungan non-VR, pertama Anda bisa memaksimalkan jangkauan pengalaman, dan memastikan Anda menyediakan pengalaman terbaik, terlepas dari persiapan pengguna Anda.

Untuk informasi selengkapnya, baca panduan kami tentang [menambahkan masukan ke adegan WebVR](./adding-input-to-a-webvr-scene/).


{# wf_devsite_translation #}
