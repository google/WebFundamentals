project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Lighthouse の監査項目「サイトで rel="noopener" を使用して外部アンカーを開く」のリファレンス ドキュメント。

{# wf_updated_on:2016-11-30 #}
{# wf_published_on:2016-11-30 #}

#  サイトで rel="noopener" を使用して外部アンカーを開く {: .page-title }

##  監査が重要である理由 {: #why }

`target="_blank"` を使用して任意のページから別のページにリンクしている場合、リンク元のページとリンク先のページは同じプロセスで動作します。
そのため、リンク先のページで負荷の高い
JavaScript が実行されていると、リンク元のページのパフォーマンスが低下するおそれがあります。

また、`target="_blank"` にはセキュリティ上の脆弱性もあります。リンク先のページでは
`window.opener` を使用して親ウィンドウのオブジェクトにアクセスしたり、`window.opener.location = newURL`
によって親ページの URL を変更したりできます。

詳細については、[The Performance Benefits of rel=noopener][jake] をご覧ください。

[jake]: https://jakearchibald.com/2016/performance-benefits-of-rel-noopener/

##  監査に合格する方法 {: #how }

レポートを確認して、Lighthouse で特定された各リンクに `rel="noopener"` を追加します。
一般的に、外部リンクを新しいウィンドウまたはタブで開く場合は、必ず `rel="noopener"` を追加してください。


    <a href="https://examplepetstore.com" target="_blank" rel="noopener">...</a>

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse では以下のアルゴリズムに基づいて、`rel="noopener"`
を付けるべきリンクを報告します。

1. `target="_blank"` 属性を含み、`rel="noopener"` 属性を含まない `<a>` ノードをすべて洗い出します。
1. 同一ホストのリンクを除外します。

Lighthouse では同一ホストが除外されるため、大規模なサイトを開発している場合は、注意が必要なエッジケースがあります。
また、この監査項目で説明しているパフォーマンスへの影響は、ページで `rel="noopener"`
を使用せずに、自身のサイトにある別のセクションへのリンクを開く場合にも当てはまります。
ただし、それらのリンクは Lighthouse のレポートには含まれません。



{# wf_devsite_translation #}
