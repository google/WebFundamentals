---

title: "Membangung aplikasi starter"
translators:
  - abdshomad
---


Kembali ke baris perintah dan alihkan kode dari cabang `master` ke cabang `code-lab`:


{% highlight bash %}
git checkout code-lab
{% endhighlight %}

Ini akan menghapus semua aset yang mendukung fungsionalitas offline sehingga Anda dapat menambahkan mereka kembali dengan mengikuti tutorial.

Selain itu, Anda perlu untuk unregister service worker. Di Chrome Anda dapat melakukan ini dengan mengunjungi `chrome://serviceworker-internals/` dan klik tombol **Unregister** di bawah URL yang tepat.
