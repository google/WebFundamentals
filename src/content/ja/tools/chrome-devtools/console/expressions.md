project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: ページ上のアイテムの状態は、DevTools コンソールから調べます。

{# wf_updated_on:2015-05-11 #}
{# wf_published_on:2015-04-13 #}

#  式の評価 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/josephmedley.html" %}
ページ上のアイテムの状態は、DevTools コンソールでいずれかの評価機能を使用して調べます。

DevTools コンソールでは、ページ内のアイテムの状態をその都度把握できます。式は、JavaScript の知識とそれをサポートする機能を組み合わせて入力し、評価します。





### TL;DR {: .hide-from-toc }
- 式は、入力するだけで評価できます。
- 要素はショートカットを使用して選択します。
- DOM 要素と JavaScript ヒープ オブジェクトを調査するには  <code>inspect()</code> を使用します。
- 最近選択した要素とオブジェクトにアクセスするには、$0～4 を使用します。


##  式のナビゲーション

コンソールでは、JavaScript 式を入力して <kbd class="kbd">Enter</kbd> キーを押すと評価が行われます。また、式を入力したときにプロパティ名の候補が表示されます。コンソールには、オートコンプリートとタブコンプリートの機能も備わっています。





一致するものが複数存在する場合は、<kbd class="kbd">↑</kbd> と <kbd class="kbd">↓</kbd> キーで循環します。
<kbd class="kbd">→</kbd> キーを押すと、現在の候補が選択されます。候補が 1 つの場合は、<kbd class="kbd">Tab</kbd> キーを押すと選択されます。



![コンソール内の単純な式](images/evaluate-expressions.png)

##  要素の選択

要素を選択するには、次のショートカットを使用します。

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">ショートカット &amp; 説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Shortcut">$()</td>
      <td data-th="Description">指定された CSS セレクターに一致する最初の要素を返します。 <code>document.querySelector()</code> のショートカットです。</td>
    </tr>
    <tr>
      <td data-th="Shortcut">$$()</td>
      <td data-th="Description">指定された CSS セレクターに一致するすべての要素の配列を返します。 <code>document.querySelectorAll()</code> のエイリアスです。</td>
    </tr>
    <tr>
      <td data-th="Shortcut">$x()</td>
      <td data-th="Description">指定された XPath に一致する要素の配列を返します。</td>
    </tr>
  </tbody>
</table>

ターゲット選択の例:

    $('code') // Returns the first code element in the document.
    $$('figure') // Returns an array of all figure elements in the document.
    $x('html/body/p') // Returns an array of all paragraphs in the document body.

##  DOM 要素と JavaScript ヒープ オブジェクトの調査

`inspect()` 関数では、パラメータとして DOM 要素または JavaScript 参照を使用します。DOM 要素を指定した場合は、DevTools で [Elements] パネルが開き、その要素が表示されます。JavaScript 参照を指定した場合は、[Profile] パネルが開きます。






このページでコンソールからこのコードを実行すると、この figure が取得され、[Elements] パネルに表示されます。ここでは `$_` プロパティを利用して最後に評価された式の出力を取得しています。




    $('[data-target="inspecting-dom-elements-example"]')
    inspect($_)

##  最近選択した要素とオブジェクトへのアクセス

最後に使用した 5 つの要素とオブジェクトは、簡単にアクセスできるように変数に格納されます。コンソール内からこれらの要素にアクセスするには、$0～4 を使用します。コンピュータでは、カウントが 0 から開始されます。つまり、最新のアイテムは $0、最も古いアイテムは $4 です。







{# wf_devsite_translation #}
