project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Mengatur sumber daya menurut bingkai, domain, jenis, atau kriteria lainnya.

{# wf_updated_on: 2016-07-28 #}
{# wf_published_on: 2015-04-13 #}

# Memeriksa Sumber Daya {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Mengatur sumber daya menurut bingkai, domain, jenis, atau kriteria
lainnya.


### TL;DR {: .hide-from-toc }
- Gunakan panel <strong>Frame</strong> pada panel <strong>Application</strong> untuk mengatur sumber daya menurut bingkai.
- Anda juga bisa menampilkan sumber daya menurut bingkai dari panel <strong>Sources</strong> dengan menonaktifkan opsi <strong>group by folder</strong>.
- Untuk menampilkan sumber daya menurut domain dan folder, gunakan panel <strong>Sources</strong>.
- Filter sumber daya menurut nama atau kriteria lainnya di panel <strong>Network</strong>.


## Mengatur sumber daya menurut bingkai {:#frames}

Gunakan panel **Frames** pada panel **Application** untuk representasi
terorganisasi-bingkai dari sumber daya laman Anda.

![detail frame][frames]

* Tingkat atas (`top` di tangkapan layar di atas) adalah dokumen utama.
* Di bawahnya (mis. `widget2` di tangkapan layar di atas) adalah sub-bingkai
  dokumen utama. Luaskan salah satu sub-bingkai ini untuk melihat sumber daya
  yang berasal dari bingkai tersebut.
* Di bawah sub-bingkai adalah gambar, skrip, dan sumber daya lain
  dari dokumen utama.
* Terakhir adalah dokumen utama itu sendiri.

Klik pada sumber daya untuk menampilkan pratinjau-nya.

Klik-kanan pada sumber daya untuk menampilkannya pada panel **Network**, bukalah di
tab yang baru, salin URL-nya, atau menyimpannya.

![menampilkan sumber daya][resource]

Anda juga bisa menampilkan sumber daya menurut bingkai di panel **Sources**, dengan mengeklik
menu luapan dalam navigator dan menonaktifkan opsi **Group by folder**
untuk menghentikan pengelompokan sumber daya menurut folder.

![opsi group by folder](imgs/group-by-folder.png)

Sumber daya akan didaftarkan hanya menurut bingkai.

![tidak ada folder](imgs/no-folders.png)

[frames-pane]: /web/tools/chrome-devtools/manage-data/imgs/frames-pane.png
[frames]: /web/tools/chrome-devtools/manage-data/imgs/frames.png
[resource]: /web/tools/chrome-devtools/manage-data/imgs/resource.png

## Mengatur sumber daya menurut domain dan folder {:#sources}

Untuk menampilkan sumber daya yang diatur menurut domain dan direktori, gunakan panel **Sources**.


![panel sources](imgs/sources.png)

## Memfilter sumber daya menurut nama, tipe, atau kriteria lainnya {:#filter}

Gunakan panel **Network** untuk memfilter sumber daya menurut nama, tipe, dan berbagai macam
kriteria lainnya. Baca panduan berikut untuk mengetahui selengkapnya.

{# include shared/related_guides.liquid inline=true list=page.related-guides.filter #}


{# wf_devsite_translation #}
