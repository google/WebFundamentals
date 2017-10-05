project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Lighthouse の監査項目「HTML にビューポートのメタタグを含める 」のリファレンス ドキュメント。

{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

#  HTML にビューポートのメタタグを含める {: .page-title }

##  監査が重要である理由 {: #why }

ビューポートのメタタグがない場合、モバイル端末では、一般的なデスクトップの画面幅でページをレンダリングしたあと、モバイル画面に合わせてページをスケーリングします。
ビューポートを設定すると、ビューポートの幅とスケーリングを制御できるようになります。

詳細については、以下のリンクをご覧ください。

* [ビューポートを設定する](/speed/docs/insights/ConfigureViewport)
* [ビューポートを設定する](/web/fundamentals/design-and-ux/responsive/#set-the-viewport)

##  監査に合格する方法 {: #how }

HTML の `<head>` に、ビューポートの `<meta>` タグを追加します。

    <head>
      ...
      <meta name="viewport" content="width=device-width, initial-scale=1">
      ...
    </head>

キーと値のペア `width=device-width`
でビューポート幅と端末幅を指定し、`initial-scale=1` でページにアクセスしたときの最初のズームレベルを指定します。


{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse では、ドキュメントの `<head>` に `<meta name="viewport">` タグが存在するかチェックされます。
また、ノードに `content` 属性が含まれており、その属性値にテキスト
`width=` が含まれていることも確認されます。ただし、`width` と `device-width`
が等しいかは確認されません。また、キーと値のペア `initial-scale` も、Lighthouse ではチェックされません。



{# wf_devsite_translation #}
