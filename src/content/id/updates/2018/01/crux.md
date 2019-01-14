project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Announcing the release of a new country dimension in the Chrome User Experience Report.
{% include "web/_shared/machine-translation-start.html" %}

{# wf_updated_on: 2018-03-05 #}
{# wf_published_on: 2018-01-24 #}
{# wf_tags: ux #}
{# wf_blink_components: Blink #}
{# wf_featured_image: /web/updates/images/generic/timeline.png #}
{# wf_featured_snippet: Announcing the release of a new country dimension in the Chrome User Experience Report. #}

# Laporan Pengalaman Pengguna Chrome: Dimensi negara baru {: .page-title }

{% include "web/_shared/contributors/rviscomi.html" %}

<div class="clearfix"></div>

[Chrome User Experience Report](/web/tools/chrome-user-experience-report/) (CrUX) adalah dataset publik dari data kinerja pengguna yang sebenarnya. Karena kami [announced](https://blog.chromium.org/2017/10/introducing-chrome-user-experience-report.html) laporan, salah satu tambahan yang paling diminta adalah kemampuan untuk lebih memahami perbedaan pengalaman pengguna di seluruh lokasi. Berdasarkan umpan balik ini, kami memperluas dataset CrUX yang ada - yang memberikan pandangan global di seluruh wilayah geografis - untuk juga menyertakan kumpulan dataset khusus negara yang terpisah!

<img src="/web/updates/images/2018/01/crux-countries.png"
    alt="Map of countries included in the CrUX dataset"/>

Misalnya, pada gambar di atas, kami melihat kueri yang membandingkan kepadatan agregat untuk koneksi efektif 4G dan 3G di beberapa negara. Yang menarik adalah untuk melihat seberapa lazim kecepatan 4G di Jepang, sementara kecepatan 3G masih sangat umum di India. Wawasan seperti ini dimungkinkan berkat dimensi negara baru.

Untuk memulai, masuk ke [CrUX project](https://bigquery.cloud.google.com/dataset/chrome-ux-report:all) di BigQuery dan Anda akan melihat daftar dataset yang diatur oleh [country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) dari `country_ae` (Uni Emirat Arab) ke `country_za` (Afrika Selatan). `all` familiar masih ada untuk menangkap data kinerja agregat global. Di dalam setiap `201712` data ada tabel bulanan yang dimulai dengan laporan terbaru, `201712` . Untuk panduan terperinci tentang cara memulai, silakan lihat [CrUX documentation](/web/tools/chrome-user-experience-report/) kami yang diperbarui.

Kami senang berbagi data baru ini dengan Anda dan berharap Anda menggunakannya dengan cara meningkatkan pengalaman pengguna di web. Untuk mendapatkan bantuan, mengajukan pertanyaan, menawarkan umpan balik, atau membagikan temuan dari analisis Anda sendiri, bergabunglah dengan diskusi di [CrUX forum](https://groups.google.com/a/chromium.org/forum/#!forum/chrome-ux-report) . Dan jika tingkat gratis di BigQuery tidak cukup untuk menahan antusiasme Anda, kami masih menjalankan promosi untuk memberi Anda [extra 10 TB free](https://docs.google.com/forms/d/e/1FAIpQLSeMYnz93JQuO7rPewVrKpLfxO7JREOysti0CQyRo31bc7cXHA/viewform) , jadi dapatkan kredit Anda saat persediaan masih ada!

{% include "web/_shared/rss-widget-updates.html" %}

{% include "web/_shared/translation-end.html" %}