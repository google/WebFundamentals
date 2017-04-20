project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Semua situs web harus selalu dilindungi dengan HTTPS, walaupun tidak menangani komunikasi yang sensitif. HTTPS menyediakan keamanan sangat penting dan integritas data, baik untuk situs web Anda maupun untuk orang-orang yang memercayakan informasi pribadi mereka pada situs web Anda.

{# wf_updated_on: 2016-08-22 #}
{# wf_published_on: 2015-11-23 #}

# Mengapa HTTPS Penting {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="iP75a1Y9saY"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Semua situs web harus selalu dilindungi dengan HTTPS, walaupun tidak
menangani komunikasi yang sensitif. Selain menyediakan keamanan yang penting dan integritas
data untuk situs web Anda dan informasi pribadi pengguna, HTTPS adalah
persyaratan bagi banyak fitur browser baru, terutama yang diperlukan untuk
[progressive web apps](/web/progressive-web-apps/).

### TL;DR {: .hide-from-toc }

* Penyusup ganas dan jinak mengeksploitasi semua sumber daya tak terlindungi antara situs web dan pengguna.
* Banyak penyusup mengamati kumpulan perilaku untuk mengidentifikasi pengguna Anda. 
* HTTPS tidak hanya memblokir penyalahgunaan situs web. Ini juga merupakan kebutuhan untuk banyak fitur termutakhir dan teknologi yang memungkinkan kemampuan mirip-aplikasi seperti service worker. 

## HTTPS melindungi integritas situs web 

HTTPS membantu mencegah penyusup merusak komunikasi 
antara situs web dan browser pengguna Anda. Penyusup termasuk 
para penyerang jahat yang memang sengaja, dan perusahaan yang sah namun intrusif, 
misalnya ISP atau hotel yang menginjeksikan iklan ke dalam laman.

Penyusup mengeksploitasi komunikasi yang tidak dilindungi untuk 
mengecoh pengguna agar memberikan informasi sensitif atau memasang malware, atau menyisipkan 
iklan mereka sendiri ke dalam sumber daya. Misalnya, beberapa pihak ketiga menginjeksikan 
iklan ke dalam situs web yang berpotensi merusak pengalaman pengguna dan 
menimbulkan kerawanan keamanan.

Penyusup mengeksploitasi sumber daya tak terlindungi yang lalu-lalang di antara 
situs web dan pengguna Anda. Gambar, cookie, skrip, HTML … semuanya 
bisa dieksploitasi. Penyusupan bisa terjadi di titik mana saja di jaringan, termasuk 
mesin milik pengguna, hotspot Wi-Fi, atau ISP yang telah dirusak, adalah sebagian kecil darinya. 

## HTTPS melindungi privasi dan keamanan pengguna

HTTPS mencegah penyusup secara pasif mendengarkan komunikasi
di antara situs web dan pengguna Anda.

Salah satu kesalahpahaman umum tentang HTTPS adalah bahwa satu-satunya situs web 
yang membutuhkan HTTPS adalah mereka yang menangani komunikasi sensitif. Setiap 
permintaan HTTP yang tak terlindungi bisa berpotensi mengungkapkan informasi tentang 
perilaku dan identitas pengguna Anda. Walaupun sebuah kunjungan ke salah satu 
situs web Anda yang tak terlindungi mungkin terkesan tidak berbahaya, sebagian penyusup mengamati 
kumpulan aktivitas browsing yang dilakukan pengguna untuk membuat kesimpulan tentang 
perilaku dan maksud mereka, dan melakukan
[de-anonimisasi](https://en.wikipedia.org/wiki/De-anonymization){: .external}
identitas mereka. Misalnya, 
karyawan mungkin tanpa sengaja mengungkapkan kondisi kesehatan yang sensitif kepada 
bos mereka hanya lantaran membaca artikel medis yang tak terlindungi.

## HTTPS adalah masa depan web

Fitur platform web baru yang andal, seperti pengambilan gambar atau perekaman audio
dengan `getUserMedia()`, memungkinkan pengalaman aplikasi offline dengan service workers,
atau pembangunan progressive web app, memerlukan izin eksplisit dari pengguna
sebelum eksekusi. Banyak API lama juga sedang diperbarui agar meminta izin
eksekusi, misalnya
[geolocation](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation){: .external}
API. HTTPS adalah komponen kunci bagi alur kerja izin untuk fitur
baru dan API yang diperbarui.








{# wf_devsite_translation #}
