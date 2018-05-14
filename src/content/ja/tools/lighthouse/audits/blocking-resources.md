project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Lighthouse の監査項目「初回ペイントの遅延を引き起こすリンクタグをサイトに使用しない」および「初回ペイントの遅延を引き起こすスクリプトタグをサイトの head 部に使用しない」のリファレンス ドキュメント。

{# wf_updated_on: 2016-12-01 #}
{# wf_published_on: 2016-12-01 #}

#  サイトに初回ペイントの遅延を引き起こすリソースを使用しない {: .page-title }

##  監査が重要である理由 {: #why }

ページの読み込み速度が上がると、ユーザ エンゲージメント、ページビュー、コンバージョン率の向上につながります。


ページを高速で読み込むには、初回ペイント時に必要なスクリプトやリンクをインライン化して、それ以外の要素は後回しにします。


##  監査に合格する方法 {: #how }

レポートには、Lighthouse で検出されたレンダリングをブロックするリンクやスクリプトが一覧表示されます。
目標は、この数を減らすことです。

[監査の実装方法](#implementation)で説明しているように、Lighthouse ではスクリプト、スタイルシート、HTML Imports
の 3 種類のレンダリング ブロック リンクについて警告します。
最適化の方法は、使用しているリソースの種類よって異なります。

注: 以下で「クリティカル」と記載されているリソースは、初回ペイントに必須のリソース、およびページの主要機能に不可欠なリソースです。



* クリティカルなスクリプトは、HTML でインライン化することを検討してください。クリティカルではないスクリプトについては、`async` または `defer` 属性を指定してください。詳細は [JavaScript を使用してインタラクティブなサイトにする][js]をご覧ください。
* スタイルシートについては、複数のファイルにスタイルを分けて、メディアクエリで管理します。各スタイルシートのリンクには `media`
属性を追加します。
ページの読み込み時に、ブラウザは初回ペイントのみをブロックして、ユーザの端末に対応するスタイルシートを取得します。
詳細については[レンダリングをブロックする CSS][css] をご覧ください。
* クリティカルではない HTML Imports には、`async` 属性を指定します。一般的な規則として、`async` はできる限り HTML Imports と一緒に使用します。


[js]: /web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript
[css]: /web/fundamentals/performance/critical-rendering-path/render-blocking-css

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse では、次の3 種類のブロッキング リソースを特定します。

以下の `<script>` タグ:

* ドキュメントの `<head>` 部分にある。
* `defer` 属性を持たない。
* `async` 属性を持たない。

以下の `<link rel="stylesheet">` タグ:

* `disabled` 属性を持たない。この属性があると、ブラウザはスタイルシートをダウンロードしません。
* ユーザーのデバイスに対応する `media` 属性がない。

以下の `<link rel="import">` タグ:

* `async` 属性を持たない。


{# wf_devsite_translation #}
