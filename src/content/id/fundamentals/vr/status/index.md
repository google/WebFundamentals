project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Dapatkan status informasi terbaru mengenai WebVR, serta hal yang perlu diingat saat membangun pengalaman WebVR.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-12-12 #}

# Status dan Pertimbangan WebVR {: .page-title }

Caution: WebVR masih eksperimental dan dapat berubah.

## Status Implementasi WebVR

Saat ini WebVR API tersedia di:

* Chrome Beta (M56+), melalui [Origin Trial](https://github.com/jpchase/OriginTrials/blob/gh-pages/developer-guide.md).
* Firefox Nightly.
* Browser Samsung Internet untuk Gear VR. (Harap diingat: versi lama spesifikasi WebVR saat ini telah didukung.)

<iframe width="100%" height="320" src="https://www.chromestatus.com/feature/4532810371039232?embed" style="border: 1px solid #CCC" allowfullscreen>
</iframe>

Informasi selengkapnya mengenai status implementasi browser bisa ditemukan di [chromestatus.com](https://www.chromestatus.com/features/4532810371039232?embed).

## Pertimbangan

Inilah hal-hal yang harus diingat saat membangun pengalaman WebVR saat ini.

* **Anda harus menyajikan materi WebVR melalui HTTPS.** Jika tidak maka pengguna akan mendapatkan peringatan dari browser.
    * Lihat [Mengaktifkan HTTPS di Server Anda](/web/fundamentals/security/encrypt-in-transit/enable-https) untuk panduan selengkapnya.
* **Chrome hanya mendukung WebVR asli di Android saat ini.** Anda harus menggunakan headset Daydream bersama ponsel Pixel.
* **[WebVR Polyfill](https://github.com/googlevr/webvr-polyfill) mungkin tidak selalu cocok 1:1 dengan implementasi asli spesifikasi.** Jika Anda berencana menggunakan Polyfill, pastikan memeriksa di perangkat berkemampuan VR maupun non-VR.
* **Pengguna harus mengeklik tombol pengontrol VR sebelum ini tersedia untuk kode Anda**. Anda harus mempertimbangkan hal ini dalam kode, umumnya dengan menampilkan pesan kepada pengguna yang meminta mereka menekan tombol pengontrol di awal pengalaman VR mereka.
* **Anda harus mengaktifkan informasi pose Gamepad di Chrome 56 bila dijalankan secara lokal**. Informasi gamepad tidak akan berisi informasi pose (atau lokasi) saat dijalankan di localhost kecuali jika Anda mengaktifkan flag waktu proses Gamepad Extensions di Chrome 56. Jika Anda menjalankan Origin Trial, Gamepad Extensions akan diaktifkan bersama WebVR API.


{# wf_devsite_translation #}
