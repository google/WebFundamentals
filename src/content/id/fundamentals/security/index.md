project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Keamanan adalah topik yang luas, pelajari tentang HTTPS, mengapa ini penting dan bagaimana Anda bisa menerapkannya ke server Anda.

{# wf_updated_on: 2016-09-09 #}
{# wf_published_on: 2015-09-08 #}

# Keamanan dan identitas {: .page-title }

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="pgBQn_z3zRE"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Keamanan adalah topik yang luas, di sini ada beberapa hal untuk Anda mulai. 

<div class="clearfix"></div>


## Mengenkripsi Data dalam Pengiriman

<img src="/web/images/content-https-2x.jpg" class="attempt-right">

Salah satu dari fitur keamanan yang paling penting, yang diperlukan bagi banyak API dan [progressive web app](/web/progressive-web-apps/) modern adalah [Secure HTTP disebut juga HTTPS](encrypt-in-transit/why-https). Salah satu kesalahpahaman umum tentang HTTPS adalah bahwa satu-satunya situs web yang membutuhkan HTTPS adalah yang menangani komunikasi sensitif. Jika privasi dan keamanan belum cukup menjadi alasan untuk melindungi pengguna Anda, banyak fitur browser seperti service worker Payment Request API memerlukan HTTPS.

[Mengaktifkan HTTPS di Server Anda](/web/fundamentals/security/encrypt-in-transit/enable-https)

<div class="attempt-left">
  <h2>Content Security Policy</h2>
  <p>
    Content Security Policy atau CSP menyediakan serangkaian direktif yang
    mengaktifkan kontrol granular pada sumber daya yang laman perbolehkan untuk memuat dan
    asal muatannya.<br>
    <a href="csp/">Ketahui Selengkapnya</a>
  </p>
</div>
<div class="attempt-right">
  <h2>Mencegah Materi Campuran</h2>
  <p>
    Salah satu dari tugas yang memakan waktu dalam mengimplementasikan HTTPS adalah menemukan dan
    memperbaiki materi yang mencampur HTTPS dan HTTP. Untungnya ada alat
    guna membantu Anda dengan hal ini.<br>
    <a href="prevent-mixed-content/what-is-mixed-content">Mulai</a>
  </p>
</div>

<div style="clear:both"></div>

## Sumber Daya Terkait

### Chrome DevTools

* [Memahami Masalah Keamanan](/web/tools/chrome-devtools/security)





{# wf_devsite_translation #}
