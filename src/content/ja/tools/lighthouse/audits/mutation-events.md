project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Lighthouse の監査項目「サイトの独自スクリプトで変更イベントを使用しない」のリファレンス ドキュメント。

{# wf_updated_on:2016-10-04 #}
{# wf_published_on:2016-10-04 #}

#  サイトの独自スクリプトで変更イベントを使用しない {: .page-title }

##  監査が重要である理由 {: #why }

以下の変更イベントはパフォーマンスを低下させるため、DOM イベントの仕様において廃止されました。


* `DOMAttrModified`
* `DOMAttributeNameChanged`
* `DOMCharacterDataModified`
* `DOMElementNameChanged`
* `DOMNodeInserted`
* `DOMNodeInsertedIntoDocument`
* `DOMNodeRemoved`
* `DOMNodeRemovedFromDocument`
* `DOMSubtreeModified`

##  監査に合格する方法 {: #how }

Lighthouse のレポートでは、コード内で検出された各変更イベントのリスナが **URLs** の下に表示されます。
これらの変更イベントを、それぞれ `MutationObserver` で置き換えます。
詳細は MDN の[`MutationObserver`][mdn] をご覧ください。

[mdn]: https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse
では、ページ上のイベントリスナをすべて検出して、[監査が重要である理由](#why)に列挙されているタイプのイベントリスナについて警告をします。



{# wf_devsite_translation #}
