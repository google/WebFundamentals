project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: コードの効果を高めるために、CSS と JS のプリプロセッサを設定する方法について説明します。

{# wf_updated_on:2015-08-03 #}
{# wf_published_on:2015-08-03 #}

#  CSS と JS のプリプロセッサの設定 {: .page-title }

{% include "web/_shared/contributors/pbakaus.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

Sass などの CSS プリプロセッサや、JS プリプロセッサ、トランスパイラを正しく使用すると、開発時間が大幅に短縮されます。ここではこのようなツールの設定方法について説明します。


### TL;DR {: .hide-from-toc }
- プリプロセッサにより、CSS と JavaScript の機能の中で、CSS 変数など、ブラウザがネイティブにサポートしない機能を利用できるようになります。
- プリプロセッサを使用している場合、ソースマップを使って元のソースファイルをレンダリング後の出力にマップします。
- お使いのウェブサーバーでソースマップを利用できることを確認してください。
- サポートされるプリプロセッサを使用して、ソースマップを自動的に生成します。


## プリプロセッサとは

プリプロセッサは、任意のソースファイルを受け取り、ブラウザが理解できるコードに変換します。 

出力が CSS の場合は、本来ならば存在しない機能（CSS 変数、ネスティングなど）を追加できます。このカテゴリで注目すべき例には、[Sass](http://sass-lang.com/)、[Less](http://lesscss.org/){: .external }、[Stylus](https://learnboost.github.io/stylus/) があります。

出力が JavaScript の場合は、まったく異なる言語から変換（コンパイル）したり、スーパーセットや新しい言語標準を現在の標準に変換（トランスパイル）することができます。このカテゴリで注目すべき例には、[CoffeeScript](http://coffeescript.org/){: .external } と ES6（[Babel](https://babeljs.io/) を使用）があります。

## プリプロセッサで処理されたコンテンツのデバッグと編集

ブラウザで DevTools を使用して [CSS を編集](/web/tools/chrome-devtools/inspect-styles/edit-styles)するか、JavaScript をデバッグすると、1 つの問題が明らかになります。つまり、表示内容がソースを反映していないため、実際には問題を解決できません。

このような状況に陥らないように、最新のプリプロセッサでは<b>ソースマップ</b>という機能がサポートされます。

### ソースマップとは

ソースマップとは、最小化されたファイルとそのソースとの関係を作成する、JSON ベースのマッピング形式です。運用向けにビルドするときに、複数の JavaScript ファイルを最小化して組み合わせると同時に、元のファイルの情報を保持するソースマップを生成します。

### ソースマップの仕組み

CSS プリプロセッサでは、コンパイル済みの CSS 以外に、生成する CSS ファイルごとにソースマップ ファイル（.map）を生成します。ソースマップ ファイルは JSON ファイルで、生成した各 CSS 宣言と、ソースファイルの対応する行との間のマッピングを定義します。

各 CSS ファイルには、ソースマップ ファイルの URL を指定するアノテーションを含みます。このアノテーションは、特別なコメントとしてファイルの最終行に埋め込まれます。

    /*# sourceMappingURL=<url> */

たとえば、**styles.scss** という Sass ソースファイルがあるとします。

    %$textSize: 26px;
    $fontColor: red;
    $bgColor: whitesmoke;
    h2 {
        font-size: $textSize;
        color: $fontColor;
        background: $bgColor;
    }

Sass によって、sourceMappingURL アノテーションを含む CSS ファイル（**styles.css**）が生成されます。

    h2 {
      font-size: 26px;
      color: red;
      background-color: whitesmoke;
    }
    /*# sourceMappingURL=styles.css.map */

以下は、ソースマップ ファイルの例です。

    {
      "version": "3",
      "mappings":"AAKA,EAAG;EACC,SAAS,EANF,IAAI;EAOX,KAAK"
      "sources": ["sass/styles.scss"],
      "file": "styles.css"
    }

## ウェブサーバーでソースマップを利用できることを確認

Google App Engine のような一部のウェブサーバーでは、利用する各ファイルタイプを明示的に設定する必要があります。このようなウェブサーバーでは、ソースマップを `application/json` という MIME タイプで利用できるようにします。ただし、Chrome は実際[どのコンテンツ タイプでも受け入れます](https://stackoverflow.com/questions/19911929/what-mime-type-should-i-use-for-source-map-files)（`application/octet-stream` など）。

### 補足: カスタム ヘッダーを使ったソースマッピング 

ファイルに余分なコメントを残したくない場合、最小化した JavaScript ファイルの HTTP ヘッダー フィールドを使って、ソースマップを検索する場所を DevTools に指示します。この場合、ウェブサーバーの設定やカスタマイズが必要になるため、ここでは扱いません。

    X-SourceMap: /path/to/file.js.map

コメントの場合と同様、JavaScript ファイルに関連付けるソースマップを検索する場所を DevTools などのツールに指示します。このヘッダーは、単一行コメントをサポートしない言語でソースマップを参照する場合の問題も回避できます。

## サポート対象のプリプロセッサ

CoffeeScript、TypeScript、JSX など、JavaScript 言語にコンパイルされる最近の言語には、ほぼすべてソースマップを生成するオプションがあります。さらに、サーバー側でもソースマップを使用できるようになっています。たとえば、Node 内で使用できます。Sass や Less などを使った CSS 内でも使用できます。ノードスタイルが必要な機能を利用可能にする browserify や、uglify-js のような最小化ツールからでも使用できます。uglify-js では、マルチレベルのソースマップを生成する優れた機能も追加されています。

### JavaScript

<table>
  <thead>
    <tr>
      <th width="20%" data-th="Compiler">コンパイラー</th>
      <th width="40%" data-th="Command">コマンド</th>
      <th data-th="Instructions">手順</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Compiler"><a href="http://coffeescript.org/#source-maps">CoffeeScript</a></td>
      <td data-th="Command"><code>$ coffee -c square.coffee -m</code></td>
      <td data-th="Instructions">-m（--map）フラグを指定するだけで、コンパイラーによってソースマップが出力されます。また、出力ファイルに sourceMapURL コメント プラグマを追加することもできます。</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="http://www.typescriptlang.org/">TypeScript</a></td>
      <td data-th="Command"><code>$ tsc -sourcemap square.ts</code></td>
      <td data-th="Instructions">-sourcemap フラグを指定すると、マップが生成され、コメント プラグマが追加されます。</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="https://github.com/google/traceur-compiler/wiki/SourceMaps">Traceur</a></td>
      <td data-th="Command"><code>$ traceur --source-maps=[file|inline]</code></td>
      <td data-th="Instructions"> <code>--source-maps=file</code> により、 <code>.js</code> で終わるすべての出力ファイルに対して、 <code>.map</code> で終わるソースマップ ファイルが生成されます。また、 <code>source-maps='inline'</code> により、 <code>.js</code> で終わるすべての出力ファイルの末尾に、 <code>data:</code> URL でエンコードされたソースマップを含むコメントが追加されます。</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="https://babeljs.io/docs/usage/cli/#compile-with-source-maps">Babel</a></td>
      <td data-th="Command"><code>$ babel script.js --out-file script-compiled.js --source-maps</code></td>
      <td data-th="Instructions">--source-maps または -s を使って、ソースマップを生成します。インライン ソースマップを生成する場合は、 <code>--source-maps inline</code> を使用します。</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="https://github.com/mishoo/UglifyJS2">UglifyJS</a></td>
      <td data-th="Command"><code>$ uglifyjs file.js -o file.min.js --source-map file.min.js.map</code></td>
      <td data-th="Instructions">「file.js」のにソースマップを生成する場合に必要なごく基本的なコマンドです。これにより、出力ファイルにコメント プラグマも追加されます。</td>
    </tr>
  </tbody>
</table>

### CSS

<table>
  <thead>
    <tr>
      <th width="20%" data-th="Compiler">コンパイラー</th>
      <th width="40%" data-th="Command">コマンド</th>
      <th data-th="Instructions">手順</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Compiler"><a href="http://sass-lang.com">Sass</a></td>
      <td data-th="Command"><code>$ scss --sourcemap styles.scss styles.css</code></td>
      <td data-th="Instructions">Sass のソースマップは Sass 3.3 以降でサポートされています。</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="http://lesscss.org/">Less</a></td>
      <td data-th="Command"><code>$ lessc styles.less > styles.css --source-map styles.css.map</code></td>
      <td data-th="Instructions">1.5.0 から導入されています。詳細と使用パターンについては、<a href="https://github.com/less/less.js/issues/1050#issuecomment-25566463">不具合 #1050</a> をご覧ください。</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="https://learnboost.github.io/stylus/">Stylus</a></td>
      <td data-th="Command"><code>$ stylus --sourcemaps styles.style styles.css</code></td>
      <td data-th="Instructions">ソースマップが base64 エンコードされた文字列として出力ファイルに直接埋め込まれます。</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="http://compass-style.org/">Compass</a></td>
      <td data-th="Command"><code>$ sass --compass --sourcemap --watch scss:css</code></td>
      <td data-th="Instructions">他にも、config.rb ファイルに `sourcemap: true` を追加する方法があります。</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="https://github.com/postcss/autoprefixer">Autoprefixer</a></td>
      <td data-th="Command"><code></code></td>
      <td data-th="Instructions">リンク先で、使用方法と入力ソースマップを取り入れる方法をご覧ください。</td>
    </tr>
  </tbody>
</table>

## ソースマップと DevTools

これでソースマップを正しく用意できました。DevTools で CSS と JS ベースのソースマップが両方とも組み込みでサポートされていることを確認できました。

### プリプロセッサで処理された CSS の編集

[Sass、Less、Stylus の編集方法に関するページ](/web/tools/chrome-devtools/inspect-styles/edit-styles)で、ソースマップにリンクしているスタイルを DevTools 内で直接編集して更新する方法についてご覧ください。

### プリプロセッサで処理された JavaScript の編集とデバッグ

「[プリプロセッサで処理されたコードとソースコードのマッピング](/web/tools/chrome-devtools/debug/readability/source-maps)」で、[Sources] パネルで最小化、コンパイル、トランスパイルされた JavaScript をデバッグする方法についてご覧ください。


{# wf_devsite_translation #}
