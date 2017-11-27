project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Dokumentasi referensi untuk audit Lighthouse "Situs Menggunakan HTTP/2 Untuk Sumber Dayanya Sendiri".

{# wf_updated_on: 2016-12-05 #}
{# wf_published_on: 2016-12-05 #}

# Situs Menggunakan HTTP/2 Untuk Sumber Dayanya Sendiri  {: .page-title }

## Mengapa audit itu penting {: #why }

HTTP/2 bisa menyediakan sumber daya laman Anda lebih cepat, dan dengan perpindahan data yang lebih sedikit
melalui kabel.

Lihat [Pertanyaan yang Sering Diajukan mengenai HTTP/2][faq] untuk daftar manfaat yang disediakan HTTP/2
melalui HTTP/1.1.

Lihat [Pengantar HTTP/2][intro] untuk ringkasan teknis yang mendalam.

[faq]: https://http2.github.io/faq/
[intro]: /web/fundamentals/performance/http2/

## Cara untuk lulus audit {: #how }

Pada **URL**, Lighthouse mencantumkan setiap sumber daya yang tidak disajikan melalui HTTP/2.
Untuk lulus audit ini, sediakan setiap sumber daya itu melalui HTTP/2.

Untuk mempelajari cara mengaktifkan HTTP/2 di server Anda, lihat [Menyiapkan HTTP/2][setup].

[setup]: https://dassur.ma/things/h2setup/

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse mengumpulkan semua sumber daya dari host yang sama seperti
laman, kemudian memeriksa versi protokol HTTP setiap sumber daya.

Lighthouse mengecualikan sumber daya dari host lain dari audit ini, karena beranggapan
Anda tidak memiliki kontrol atas cara menyediakan sumber daya ini.


{# wf_devsite_translation #}
