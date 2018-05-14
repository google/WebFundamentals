project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Dokumentasi referensi untuk audit Lighthouse "Situs Tidak Menggunakan Kejadian Mutasi Dalam Skripnya Sendiri".

{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# Situs Tidak Menggunakan Kejadian Mutasi Dalam Skripnya Sendiri  {: .page-title }

## Mengapa audit itu penting {: #why }

Kejadian mutasi berikut membahayakan kinerja dan tidak digunakan lagi dalam
spesifikasi kejadian DOM:

* `DOMAttrModified`
* `DOMAttributeNameChanged`
* `DOMCharacterDataModified`
* `DOMElementNameChanged`
* `DOMNodeInserted`
* `DOMNodeInsertedIntoDocument`
* `DOMNodeRemoved`
* `DOMNodeRemovedFromDocument`
* `DOMSubtreeModified`

## Cara untuk lulus audit {: #how }

Di bawah **URL**, Lighthouse melaporkan setiap mutasi event listener yang ditemukan
dalam kode Anda. Ganti setiap kejadian mutasi ini dengan `MutationObserver`.
Lihat [`MutationObserver`][mdn] pada MDN Untuk bantuan selengkapnya.

[mdn]: https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse mengumpulkan semua event listener di laman, dan menandai
setiap listener yang menggunakan salah satu tipe yang tercantum dalam [Mengapa audit itu
penting](#why).


{# wf_devsite_translation #}
