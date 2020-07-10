project_path: /web/tools/chrome-devtools/_project.yaml
book_path: /web/tools/chrome-devtools/_book.yaml
description:Chrome DevTools の [Sources] パネルで、ファイルの表示および編集、スニペットの作成、JavaScript のデバッグ、ワークスペースの設定を行います。

{# wf_blink_components: Platform>DevTools #}
{# wf_updated_on: 2020-07-10 #}
{# wf_published_on: 2018-01-09 #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# [Sources] パネルの概要 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Chrome DevTools **[Sources]** パネルを使用して、以下を行います。

* [ファイルの表示](#files)。
* [CSS および JavaScript の編集](#edit)。
* 任意のページで実行できる [JavaScript の**スニペット**の作成および保存](#snippets)。
  **スニペット**はブックマークレットに似ています。
* [JavaScript のデバッグ](#debug)。
* [ワークスペースの設定](#workspace)。DevTools で行った変更がファイル システムのコードに保存されるようにします。


## ファイルの表示 {: #files }

**[Network]** ペインを使用して、ページが読み込んだすべてのリソースを表示します。

<figure>
  <img src="images/sources-network-pane.png"
       alt="[Network] ペイン"/>
  <figcaption>
    <b>図 1</b>。 <b>[Network]</b> ペイン
</figcaption>
</figure>

**[Network]** ペインは、次のように構成されています。

* 最上位レベル（例: <b>図 1</b> の `top`）は [HTML フレーム][frame] を表しています。
  アクセスする各ページに `top` があることに気づかれるでしょう。 `top` はメイン ドキュメントのフレームを表しています。
* 2 番目のレベル（例: <b>図 1</b> の `developers.google.com`）は、[オリジン][origin] を表しています。
* 3 番目、4 番目、それ以降のレベルは、そのオリジンから読み込まれたディレクトリとリソースを表しています。
 たとえば、<b>図 1</b> でリソース `devsite-googler-button` へのフルパスは、`developers.google.com/_static/f6e16de9fa/css/devsite-googler-button` になります。



[frame]: https://www.w3.org/TR/html401/present/frames.html
[origin]: https://www.w3.org/TR/2011/WD-html5-20110525/origin-0.html

**[Network]** ペインのファイルをクリックすると、そのコンテンツが **[Editor]** ペインに表示されます。 どのタイプのファイルも表示することができます。
 画像の場合は画像のプレビューが表示されます。

<figure>
  <img src="images/sources-editor-pane.png"
       alt="[Editor] ペインにファイルを表示する"/>
  <figcaption>
    <b>図 2</b>。 <b>[Editor]</b> ペインに <code>jquery-bundle.js</code> のコンテンツが表示されている
    
  </figcaption>
</figure>

## CSS および JavaScript の編集 {: #edit }

**[Editor]** ペインで CSS および JavaScript を編集します。  DevTools がそのページを更新し、新しいコードが実行されるようにします。
 たとえば、あるエレメントの `background-color` を編集すると、その変更が有効になったことがすぐにわかります。


<figure>
  <img src="images/edit-css.gif"
       alt="[Editor] ペインでの CSS の編集"/>
  <figcaption>
    <b>図 3</b>。 <b>[Editor]</b> ペインで、ある要素の背景色を青から赤に変更するよう CSS を編集する
</figcaption>

</figure>

CSS の変更はすぐに有効になり、保存する必要はありません。 JavaScript の変更を有効にするには、<kbd>Command</kbd>+<kbd>S</kbd> （Mac）か、<kbd>Control</kbd>+<kbd>S</kbd> （Windows、Linux）を押します。
DevTools はスクリプトを再実行しないため、有効になる JavaScript の変更は、関数の内部で行った変更だけです。
 たとえば、<b>図 4</b> では、`console.log('A')` は実行されませんが、`console.log('B')` は実行されています。
 変更を行った後 DevTools でスクリプト全体を再実行すると、テキスト `A` が **[Console]** にログ記録されます。


<figure>
  <img src="images/edit-js.gif"
       alt="[Editor] ペインでの JavaScript の編集"/>
  <figcaption>
    <b>図 5</b>。 <b>[Editor]</b> ペインでの JavaScript の編集
  </figcaption>
</figure>

ページを再読み込みすると、DevTools は CSS および JavaScript の変更を消去します。 ファイル システムに変更を保存する方法の詳細については、[ワークスペースの設定](#workspace) をご覧ください。



## スニペットの作成、保存、実行 {: #snippets }

スニペットは、任意のページで実行可能なスクリプトです。 **[Console]** から jQuery コマンドを実行するため、ページに jQuery ライブラリを挿入しようとして、**[Console]** に次のコードを繰り返し入力しているところを想像してみてください。



    let script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-3.2.1.min.js';
    script.crossOrigin = 'anonymous';
    script.integrity = 'sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=';
    document.head.appendChild(script);

そうする代わりに、このコードを **[Snippet]** に保存し、いつでも必要な時に 2 つのボタンをクリックして、そのスニペットを実行することができます。
 **スニペット**は、DevTools によりファイル システムに保存されます。

<figure>
  <img src="images/snippet.png"
       alt="jQuery ライブラリをページに挿入するスニペット。"/>
  <figcaption>
    <b>図 6</b>。 jQuery ライブラリをページに挿入する<b>スニペット</b>
  </figcaption>
</figure>

**スニペット**を実行するには:

* **[Snippets]** ペインでファイルを開き、**[Run]** ![Run ボタン][run] をクリックします{:.cdt-inl}。
* [**Command Menu**][CM] を開き、`>` 文字を削除し、`!` を入力し、**スニペット**の名前を入力します。続けて <kbd>Enter</kbd> キーを押します。


[CM]: /web/tools/chrome-devtools/ui#command-menu
[run]: images/run-snippet.png

詳しくは、[任意のページからコードのスニペットを実行する][snip] をご覧ください。

[snip]: /web/tools/chrome-devtools/snippets

## JavaScript のデバッグ {: #debug }

`console.log()` を使用して JavaScriptis の問題の原因を推測するのではなく、Chrome DevTools デバッグ ツールの使用を検討してください。
 一般的なアイデアは、ブレークポイントを設定することです。これはコードの意図的な停止場所になり、次に一度に 1 行ずつコードを実行します。
 コードをステップごとに実行しながら、現在定義されているすべてのプロパティと変数の値を表示して変更したり、**[Console]** で JavaScript を実行したりできます。


DevTools のデバッグの基礎について詳しくは、[JavaScript をデバッグする](/web/tools/chrome-devtools/javascript/) をご覧ください。


<figure>
  <img src="images/debugging.png"
       alt="JavaScript のデバッグ"/>
  <figcaption>
    <b>図 7</b>。 JavaScript のデバッグ
  </figcaption>
</figure>

## ワークスペースの設定 {: #workspace }

デフォルトでは、**[Sources]** パネルでファイルを編集している時にページを再読み込みすると、それまでに行った変更は失われます。
 **ワークスペース**を使用すると、DevTools で行った変更を自分のファイル システムに保存できるようになります。
 基本的に、この方法では DevTools をコードエディタとして使用することになります。

始めるには、[DevTools ワークスペースによる永続化の設定][WS] をご覧ください。

[WS]: /web/tools/chrome-devtools/workspaces/

## フィードバック {: #feedback }

{% include "web/_shared/helpful.html" %}
