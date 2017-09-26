project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Pilih easing yang sesuai untuk proyek Anda, apakah easing ke dalam, keluar, atau keduanya. Bahkan mungkin gunakan pantulan untuk kesenangan ekstra!

{# wf_updated_on: 2016-08-23 #}
{# wf_published_on: 2014-08-08 #}

# Memilih Easing yang Tepat {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

Setelah membahas berbagai pilihan yang tersedia untuk efek easing di animasi, apa yang harus Anda pakai dalam proyek, dan berapa durasi yang sebaiknya digunakan dalam animasi Anda?

### TL;DR {: .hide-from-toc }
* Gunakan animasi ease-out untuk elemen UI; ease-out Quintic adalah ease yang sangat bagus, meskipun cepat.
* Pastikan untuk menggunakan durasi animasi; ease-out dan ease-in harus 200 md-500 md, sedangkan easing memantul dan elastis harus memiliki durasi yang lebih lama sekitar 800 md-1200 md.


<img src="images/quintic-ease-out-markers.png" alt="Kurva animasi ease-out Quintic" style="max-width: 300px" class="attempt-right"/>

Secara umum, **ease-out** adalah keputusan tepat, dan tentu saja standar yang baik. Efek ini cepat untuk dimulai, animasi Anda memberikan kesan responsif yang disukai, tetapi dengan perlambatan yang bagus di akhir.

Ada grup persamaan ease-out terkemuka selain yang ditetapkan dengan kata kunci `ease-out` di CSS, yang terentang dalam "agresivitas"-nya. Untuk efek ease-out yang cepat, pertimbangkan [ease-out Quintic](http://easings.net/#easeOutQuint).


[Lihat animasi ease-out Quintic](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-quintic-ease-out.html){: target="_blank" .external }

Efek easing lainnya, terutama easing memantul atau elastis tidak boleh sering digunakan, dan hanya dipakai ketika cocok untuk proyek Anda. Ada beberapa hal yang bisa menurunkan kualitas pengalaman pengguna, seperti animasi yang mengagetkan. Jika proyek Anda tidak ditujukan untuk kegembiraan, maka jangan gunakan elemen yang memantul di sekitar UI. Sebaliknya, jika Anda membuat sebuah situs yang seharusnya menggembirakan, maka tentu saja gunakan pantulan!

Coba beberapa easing, lihat mana yang sesuai dengan sifat proyek Anda, dan kembangkan dari situ. Untuk daftar lengkap tipe easing, bersama dengan demo-nya, lihat [easings.net](http://easings.net).

## Pilih durasi animasi yang cocok

Setiap animasi yang ditambahkan ke proyek Anda harus memiliki durasi yang tepat. Animasi yang terlalu pendek akan terasa agresif dan tajam; jika terlalu lama, akan mengganggu dan menjengkelkan.

* **Ease-out: sekitar 200 md-500 md**. Ini memberikan kesempatan bagi pengguna untuk melihat animasi, tetapi tidak merasa terganggu.
* **Ease-in: sekitar 200 md-500 md**. Ingat bahwa efek akan tersentak di akhir dan perubahan waktu tidak akan melembutkan dampak itu.
* **Efek memantul atau elastis: sekitar 800 md-1200 md**. Anda harus memberikan waktu untuk efek memantul atau elastis agar "selesai." Tanpa waktu tambahan ini bagian memantul elastis dari animasi akan terlihat agresif dan tidak nyaman dilihat.

Tentu saja, ini hanya sekadar panduan. Lakukan percobaan dengan easing Anda sendiri dan pilih apa yang paling cocok untuk proyek Anda.




{# wf_devsite_translation #}
