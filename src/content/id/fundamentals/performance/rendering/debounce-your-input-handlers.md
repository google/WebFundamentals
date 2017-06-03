project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: "Penangan masukan berpotensi menyebabkan masalah kinerja di aplikasi Anda, karena bisa memblokir penyelesaian bingkai, dan bisa menyebabkan pekerjaan layout tambahan dan tidak perlu.

{# wf_updated_on: 2015-10-06 #}
{# wf_published_on: 2015-03-20 #}

# Lakukan Debounce pada Penangan Masukan Anda {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

Penangan masukan berpotensi menyebabkan masalah kinerja di aplikasi Anda, karena
bisa memblokir penyelesaian bingkai, dan bisa menyebabkan pekerjaan layout tambahan
yang tidak perlu.

### TL;DR {: .hide-from-toc }

* Hindari penangan masukan yang berjalan lama karena bisa memblokir pengguliran.
* Jangan lakukan perubahan gaya di penangan masukan.
* Lakukan debounce pada penangan Anda; simpan nilai kejadian dan tangani perubahan gaya di callback requestAnimationFrame berikutnya.

## Hindari penangan masukan yang berjalan lama

Dalam kemungkinan kasus tercepat, bila pengguna berinteraksi dengan laman, thread compositor laman bisa mengambil masukan sentuhan pengguna dan cuma memindahkan materi. Hal ini tidak mengharuskan thread utama melakukan pekerjaan apa pun, sedangkan JavaScript, layout, gaya, atau paint dilakukan.

<img src="images/debounce-your-input-handlers/compositor-scroll.jpg" alt="Pengguliran ringan; hanya compositor.">

Walau demikian, jika Anda menyertakan penangan input, seperti `touchstart`, `touchmove`, atau `touchend`, thread compositor harus menunggu penangan ini menyelesaikan eksekusi karena Anda mungkin memilih memanggil `preventDefault()` dan menghentikan terjadinya guliran sentuh. Sekalipun Anda tidak memanggil `preventDefault()`, compositor harus menunggu, dan karena itu guliran pengguna diblokir, sehingga bisa mengakibatkan bingkai tersendat dan hilang.

<img src="images/debounce-your-input-handlers/ontouchmove.jpg" alt="Pengguliran berat; compositor diblokir di JavaScript.">

Singkat kata, Anda harus memastikan penangan masukan apa pun yang Anda jalankan harus mengeksekusi dengan cepat dan memungkinkan compositor melakukan tugasnya.

## Hindari perubahan gaya di penangan masukan

Penangan masukan, seperti yang digunakan untuk gulir dan sentuh, dijadwalkan berjalan tepat sebelum callback `requestAnimationFrame`.

Jika Anda membuat perubahan visual di dalam salah satu penangan itu, maka pada awal `requestAnimationFrame`, akan ada penundaan perubahan gaya. Jika Anda _kemudian_ membaca properti visual di awal callback requestAnimationFrame, sebagaimana saran di “[Hindari layout besar dan kompleks serta layout thrashing](avoid-large-complex-layouts-and-layout-thrashing)”, Anda akan memicu layout sinkron paksa!

<img src="images/debounce-your-input-handlers/frame-with-input.jpg" alt="Pengguliran berat; compositor diblokir di JavaScript.">

## Lakukan debounce pada penangan gulir Anda

Solusi untuk kedua masalah di atas adalah sama: Anda harus selalu men-debounce perubahan visual ke callback `requestAnimationFrame` berikutnya:


    function onScroll (evt) {

      // Store the scroll value for laterz.
      lastScrollY = window.scrollY;

      // Prevent multiple rAF callbacks.
      if (scheduledAnimationFrame)
        return;

      scheduledAnimationFrame = true;
      requestAnimationFrame(readAndUpdatePage);
    }

    window.addEventListener('scroll', onScroll);


Melakukan hal ini juga memiliki manfaat tambahan karena membuat penangan masukan Anda tetap ringan, dan itu bagus karena Anda kini tidak memblokir hal-hal seperti guliran atau sentuhan pada kode yang secara komputasi mahal!


{# wf_devsite_translation #}
