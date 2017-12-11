project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Lighthouse の監査項目「ページでスクリプトが利用できない場合に表示するコンテンツを用意する」のリファレンス ドキュメント。

{# wf_updated_on:2016-09-20 #}
{# wf_published_on:2016-09-20 #}

#  ページでスクリプトが利用できない場合に表示するコンテンツを用意する {: .page-title }

##  監査が重要である理由 {: #why }

[プログレッシブ エンハンスメント](https://en.wikipedia.org/wiki/Progressive_enhancement)は、より多くの人々が利用できるサイトを構築するためのウェブ開発戦略です。
プログレッシブ エンハンスメントの最も一般的な定義は以下のとおりです。


ウェブの基盤技術のみを使用して基本的なコンテンツとページ機能を作成することにより、あらゆるブラウジング環境でページを利用可能にします。よりリッチなデザインや機能（CSS
による高度なスタイル設定、JavaScript によるインタラクティブな機能など）については、これらの技術をサポートするブラウザに対して追加で提供します。
ただし、基本的なコンテンツとページ機能は CSS や JavaScript をベースに作成すべきではありません。


##  監査に合格する方法 {: #how }

プログレッシブ エンハンスメントは、議論の絶えない大きなテーマです。プログレッシブ エンハンスメントの方針に忠実に従うためには、ページをレイヤ化して、HTML
のみを使用して基本的なコンテンツとページ機能を実装すべきであるという考え方があります。
このアプローチの例については、[Progressive Enhancement: What It Is, And How To Use It](https://www.smashingmagazine.com/2009/04/progressive-enhancement-what-it-is-and-how-to-use-it/)
をご覧ください。


一方、上記のような厳密なアプローチは、最新の大規模ウェブ アプリケーションでは実現不可能または不要であるとして、極めて重要なページのスタイル設定には、ドキュメントの `<head>`
でインライン化したクリティカル パス CSS を使用すべきだという意見もあります。
このアプローチに関する詳細は、[クリティカル レンダリング パス](/web/fundamentals/performance/critical-rendering-path/)をご覧ください。

こうした状況をふまえ、Lighthouse の監査では、JavaScript が無効な場合に空白のページが表示されないことのみをチェックします。
アプリでプログレッシブ エンハンスメントの原則をどれだけ遵守すべきかという点については議論が絶えません。ただ、JavaScript
が無効の場合は、すべてのページで*何かしらの*情報（ページの使用には
JavaScript
が必要である旨をユーザーに警告するだけのコンテンツでも可）を表示する必要があるということは広く同意されています。


そのアプローチの 1 つとして、JavaScript が必須のページでは、[`<noscript>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/noscript)
要素を使用して、JavaScirpt が必要であることをユーザーに警告する方法があります。
これは、空白のページを表示するよりも好ましい対応だといえます。空白のページが表示された場合、該当のページ、ユーザーのブラウザ、ユーザーのコンピュータのどれに問題があるのかユーザーにはわからないためです。




JavaScript が無効になった状態でのサイトの見え方や動作を確認するには、Chrome DevTools の [Disable JavaScript](/web/tools/chrome-devtools/settings#disable-js)
機能をご利用ください。


{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse では、ページの JavaScript を無効にしてページの HTML を調査します。HTML が空の場合は、この監査で不合格となります。
HTML が空でない場合は合格です。



{# wf_devsite_translation #}
