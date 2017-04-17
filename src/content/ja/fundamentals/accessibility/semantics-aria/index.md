project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: ARIA と非ネイティブ HTML セマンティクスの概要


{# wf_updated_on:2016-10-04 #}
{# wf_published_on:2016-10-04 #}

# ARIA の概要 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/aliceboxhall.html" %}



これまで Google は、ネイティブ HTML 要素の使用を推奨してきました。フォーカス、キーボードのサポート、組み込みのセマンティクスを利用できるからです。しかしここからは、シンプルなレイアウトとネイティブ HTML では実行できないジョブが登場します。たとえば、現在のところ、使用頻度が非常に高い UI 構造のポップアップ メニュー向けに標準化された HTML 要素はありません。また、「ユーザーはこの情報を速やかに知る必要がある」といった、セマンティックな特性を提供する HTML 要素もありません。



このレッスンでは次に、HTML 自体で表現できないセマンティクスを表現する方法について説明します。


[Web Accessibility Initiative's Accessible Rich Internet Applications 仕様](https://www.w3.org/TR/wai-aria/){: .external }（WAI-ARIA、または単に ARIA）は、ネイティブ HTML で対応できないアクセシビリティの問題がある領域を仲介するのに適しており、アクセシビリティ ツリーでの要素の解釈方法を変更する属性を指定することで機能します。例をあげて説明します。


次のスニペットで、カスタム チェックボックスとしてリストアイテムを使用します。CSS "checkbox" クラスは、要素に必要な視覚特性を提供します。



    <li tabindex="0" class="checkbox" checked>
      Receive promotional offers
    </li>
    

これは、視覚に障がいのないユーザーにはうまく動作しますが、スクリーン リーダーでは要素がチェックボックスであることを伝えられないため、低視力のユーザーは要素にまったく気づかない可能性があります。



しかし ARIA 属性を使用すれば、スクリーン リーダーが適切に解釈できるように、要素に不足している情報を提供できます。ここで、`role` 属性と `aria-checked` 属性を追加し、要素を明示的にチェックボックスとして示し、デフォルトでチェックがオンになるよう指定します。これで、リスト アイテムがアクセシビリティ ツリーに追加され、スクリーン リーダーで正しくチェックボックスとして報告されます。



    <li tabindex="0" class="checkbox" role="checkbox" checked aria-checked="true">
      Receive promotional offers
    </li>
    

注: ARIA 属性のリストと使用するタイミングについては、[後で](#what-can-aria-do)説明します。

ARIA は、標準の DOM アクセシビリティ ツリーを変更および拡張することで機能します。

![標準の DOM アクセシビリティ ツリー](imgs/acctree1.jpg){: .attempt-right }

![ARIA の拡張アクセシビリティ ツリー](imgs/acctree2.jpg){: .attempt-right }

ARIA を使用すれば、ページのどの要素のアクセシビリティ ツリーでも微妙な（または大幅な）変更ができますが、ARIA が変更するのはアクセシビリティ ツリーのみです。**ARIA は、要素の継承の動作を拡張しません**。要素をフォーカス可能にしたり、キーボード イベントリスナにフォーカスを渡したりすることはありません。これは依然として、開発側のタスクです。


デフォルトのセマンティクスを再定義する必要はありません。この点を理解しておくことが重要です。その用途にかかわらず、標準の HTML `<input type="checkbox">` 要素は、追加の `role="checkbox"` ARIA 属性がなくても正しくアナウンスされます。



また注意が必要なのは、特定の HTML 要素では、ARIA の役割や属性が要素で実行する動作に対して制限があるということです。たとえば、標準の `<input
type="text">` 要素は、追加した役割や属性が適用されない場合があります。

> 詳細については、[HTML における ARIA の仕様](https://www.w3.org/TR/html-aria/#sec-strong-native-semantics){: .external }をご覧ください。


ARIA が提供するその他の機能を見てみましょう。

##  ARIA の機能

チェックボックスの例でご覧になったとおり、ARIA は既存の要素のセマンティクスを変更したり、ネイティブのセマンティクスが存在しない要素にセマンティクスを追加したりできます。また、HTML にまったく存在しない、メニューやタブ パネルといったセマンティクス パターンも表現できます。多くの場合、ARIA を使用すると、プレーン HTML では作成できないウィジェットタイプの要素を作成できます。


 - たとえば ARIA は、支援技術 API だけに提供される追加のラベルや説明テキストを追加できます。<br>


<div class="clearfix"></div>
      
    <button aria-label="screen reader only label"></button>


 - ARIA は、標準の親 / 子接続を拡張する要素の間で、特定の領域を制御するカスタム スクロールバーなど、セマンティクスの関係を表現できます。



<div class="clearfix"></div>

    <div role="scrollbar" aria-controls="main"></div>
    <div id="main">
    . . .
    </div>

    

 - ARIA はページの一部を "live" に指定し、その領域が変更されたら即座に支援技術に知らせることができます。


<div class="clearfix"></div>

    <div aria-live="true">
      <span>GOOG: $400</span>
    </div>

    
ARIA システムの主要な側面の 1 つは、*role* のコレクションです。ユーザー補助機能の観点で、role は特定の UI パターンを簡潔に表す指標になります。ARIA には、任意の HTML 要素で `role` 属性を使用して表現できるさまざまなパターンの定義があります。


前の例では、`role="checkbox"` を適用したとき、その要素が「checkbox」パターンに従う必要があることを支援技術に伝えています。つまり、チェックの状態（オンまたはオフ）が存在し、標準 HTML の checkbox 要素のように、その状態をマウスやスペースバーで切り替えられることを保証しています。




実際、キーボードのインタラクション機能はスクリーン リーダーの用途の中でも突出しているため、カスタム ウィジェットを作成したとき、`role` 属性を常に `tabindex` 属性と同じ場所で適用する必要があります。これにより、キーボード イベントが適切な場所に伝わり、フォーカスが要素に移動したとき、その役割が正確に伝わるようになります。





[ARIA 仕様](https://www.w3.org/TR/wai-aria/){: .external } には、`role` 属性に使用できる分類と、その役割と組み合わせて使用できる関連 ARIA 属性について記載されています。これは、ARIA の役割と属性がどう連動するのか、また、ブラウザや支援技術でサポートされる使用方法について確実な情報を得るための最良の情報ソースです。




![使用可能なすべての ARIA の役割のリスト](imgs/aria-roles.jpg)

ただし、この仕様は非常に細かいため、使用を開始するにあたっては [ARIA
Authoring Practices ドキュメント](https://www.w3.org/TR/wai-aria-practices-1.1/){: .external }のほうが読みやすいでしょう。これは、使用可能な ARIA の役割とプロパティを使用する際のベスト プラクティスについて説明しています。



ARIA では、HTML5 で使用できるオプションを拡張するランドマークの役割も提供しています。詳細については、[ランドマークの役割のデザイン パターン](https://www.w3.org/TR/wai-aria-practices-1.1#kbd_layout_landmark_XHTML){: .external }で仕様をご覧ください。






{# wf_devsite_translation #}
