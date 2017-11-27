project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Yang dimaksud mengoptimalkan jalur rendering penting adalah memrioritaskan tampilan materi yang terkait dengan aksi pengguna saat ini.

{# wf_updated_on: 2015-10-05 #}
{# wf_published_on: 2014-03-31 #}

# Jalur Rendering Penting {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}


Yang dimaksud _mengoptimalkan jalur rendering penting_ adalah memrioritaskan tampilan
materi yang terkait dengan aksi pengguna saat ini.

Menyediakan pengalaman web yang cepat menuntut kerja keras dari browser. Sebagian besar
pekerjaan ini disembunyikan dari kami sebagai developer web: kita menulis markup, dan halaman
yang tampak menarik muncul di layar. Namun bagaimanakah sebenarnya cara kerja browser
mulai dari mengonsumsi HTML, CSS, dan JavaScript hingga piksel di-render pada layar?

Mengoptimalkan kinerja sebenarnya adalah memahami langkah-langkah yang terjadi di antara
 menerima HTML, CSS, dan byte JavaScript dan
proses yang diperlukan untuk mengubahnya menjadi piksel yang di-render - 
itulah **jalur rendering penting**.

<img src="images/progressive-rendering.png"  alt="rendering laman progresif">

Dengan mengoptimalkan jalur rendering penting, kita bisa mempercepat
waktu hingga pertama kali merender laman kita secara signifikan. Lebih jauh, pemahaman
jalur rendering penting juga menjadi pondasi untuk membangun aplikasi interaktif
yang berkinerja baik. Proses pembaruan interaktif sama, hanya saja dilakukan dalam loop kontinu dan idealnya 60 bingkai per detik! Namun terlebih dahulu, ringkasan mengenai cara browser menampilkan halaman sederhana.

<a href="constructing-the-object-model" class="gc-analytics-event"
    data-category="CRP" data-label="Next / Constructing the Object Model">
  <button>Berikutnya: Membangun Model Objek</button>
</a>

{% include "web/_shared/udacity/ud884.html" %}


{# wf_devsite_translation #}
