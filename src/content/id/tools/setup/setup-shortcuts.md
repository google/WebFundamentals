project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Menyiapkan pintasan untuk tugas baris perintah yang sering Anda pakai. Jika Anda sering mengetik hal yang sama di baris perintah berulang kali, ini akan membantu meringankannya.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2014-09-24 #}

# Menyiapkan Pintasan Baris Perintah {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/mattgaunt.html" %}

Menyiapkan pintasan untuk tugas baris perintah yang sering Anda pakai. Jika Anda sering mengetik hal yang sama di baris perintah berulang kali, ini akan membantu meringankannya.


### TL;DR {: .hide-from-toc }
- Jadikan baris perintah agar bekerja untuk Anda; buat alias yang mudah diingat dan mudah diketik.
- Coba dotfile Github untuk menyimpan, membagikan, dan menyinkronkan pintasan baris perintah Anda.


## Cara menyiapkan

Cara termudah untuk membuat pintasan baris perintah adalah dengan menambahkan alias untuk perintah
yang umum di file bashrc Anda. Pada Mac atau Linux:

1. Dari baris perintah mana pun, ketikkan:

        open -a 'Sublime Text' ~/.bashrc

2. Tambahkan alias baru, misalnya:

        alias master='git checkout master'

3. Kapan saja Anda sedang berada di direktori yang berisi repo git, Anda bisa menjalankan perintah
   `master` yang akan menjalankan checkout cabang master untuk Anda.

Note: Lihat petunjuk untuk [menyiapkan alias
Windows](https://msdn.microsoft.com/en-us/library/windows/desktop/ms682057(v=vs.85).aspx).

## Pintasan yang kami sarankan

Ada beberapa perintah yang mungkin bermanfaat bagi Anda.

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2" data-th="Command">Perintah &amp; Alias</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Command">Membuka editor</td>
      <td data-th="Alias"><code>alias st='open -a "Sublime Text"'</code></td>
    </tr>
    <tr>
      <td data-th="Command">Menjalankan server</td>
      <td data-th="Alias"><code>alias server="python -m SimpleHTTPServer"</code></td>
    </tr>
    <tr>
      <td data-th="Command">Membuka direktori yang sering Anda pakai untuk bekerja</td>
      <td data-th="Alias"><code>alias p="cd ~/projects"</code></td>
    </tr>
  </tbody>
</table>


## Menyimpan, membagikan, dan menyinkronkan pintasan Anda

Simpan pintasan dan file dot Anda di GitHub. Keuntungan utamanya adalah
pintasan Anda dapat dibagikan di seluruh perangkat dan selalu dicadangkan.

GitHub bahkan membuat [laman khusus untuk dotfile](https://dotfiles.github.io/){: .external }
dan cukup banyak Tim Chrome yang membuat cabang
[dotfile Mathias Bynens](https://github.com/mathiasbynens/dotfiles).




{# wf_devsite_translation #}
