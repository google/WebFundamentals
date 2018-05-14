project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Lighthouse の監査項目「サイトに Web SQL を使用しない」のリファレンス ドキュメント。

{# wf_updated_on:2016-12-05 #}
{# wf_published_on:2016-12-05 #}

#  サイトに Web SQL を使用しない {: .page-title }

##  監査が重要である理由 {: #why }

Web SQL は廃止されました。詳細は [Web SQL Database][spec] をご覧ください。

[spec]: https://www.w3.org/TR/webdatabase/

##  監査に合格する方法 {: #how }

Web SQL Database の代わりに、[IndexedDB][indexeddb] などの最新のデータベースを使用することを検討してください。


その他の利用可能なストレージの情報については、[Web Storage Overview][overview] をご覧ください。


[indexeddb]: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
[overview]: /web/fundamentals/instant-and-offline/web-storage/

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse では、ページに Web SQL Database のインスタンスが存在するかチェックされます。


{# wf_devsite_translation #}
