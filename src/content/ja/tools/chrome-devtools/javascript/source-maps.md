project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: クライアント側のコードを結合、圧縮、またはコンパイルした後も、読みやすく、デバッグ可能な状態にしておきます。

{# wf_updated_on:2015-04-21 #}
{# wf_published_on:2015-04-13 #}

# ソースコードへの前処理済みコードのマッピング {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/pbakaus.html" %}

クライアント側のコードを結合、圧縮、またはコンパイルした後も、読みやすく、デバッグ可能な状態にしておきます。コンパイルしたコードにソースコードをマッピングするには、ソースマップを使用します。


### TL;DR {: .hide-from-toc }
- 圧縮されたコードをソースコードにマッピングするには、ソースマップを使用します。これにより、コンパイルされたコードを元のソースで参照し、デバッグすることができます。
- <a href=''/web/tools/setup/setup-preprocessors?#supported-preprocessors''>ソースマップを生成できるプリプロセッサ</a>のみを使用します。
- ウェブサーバーでソースマップを提供できることを確認します。


## プリプロセッサの概要

この記事では、DevTools の [Sources] パネルで JavaScript ソースマップを使用する方法について説明します。プリプロセッサとは何か、プリプロセッサがどのように役立つのか、ソースマップがどのように機能するのかといった基本的な概要については、[CSS と JS プリプロセッサを設定する](/web/tools/setup/setup-preprocessors?#debugging-and-editing-preprocessed-content)をご覧ください。

## サポートされているプリプロセッサの使用

ソースマップ作成機能のあるミニファイアを使用する必要があります。一般的なオプションについては、[プリプロセッサのサポート セクションをご覧ください](/web/tools/setup/setup-preprocessors?#supported-preprocessors)。さらに詳しくお知りになりたい場合は、[Source maps: languages, tools and other info](https://github.com/ryanseddon/source-map/wiki/Source-maps:-languages,-tools-and-other-info) の Wiki ページをご覧ください。

次のようなプリプロセッサが、ソースマップと組み合わせてよく使われます。

* トランスパイラ（[Babel](https://babeljs.io/){: .external }、[Traceur](https://github.com/google/traceur-compiler/wiki/Getting-Started)）
* コンパイラー（[Closure Compiler](https://github.com/google/closure-compiler)、[TypeScript](http://www.typescriptlang.org/){: .external }、[CoffeeScript](http://coffeescript.org)、[Dart](https://www.dartlang.org)）
* ミニファイア（[UglifyJS](https://github.com/mishoo/UglifyJS)）

## DevTools の [Sources] パネルでのソースマップ

プリプロセッサのソースマップによって、DevTools では、圧縮されたコードに加えて元のファイルが読み込まれます。その後、元のファイルを使用してブレークポイントを設定し、コードをステップ実行します。その間、Chrome は実際には、圧縮されたコードを実行しています。そのため、本番環境で開発サイトを実行しているように感じられます。

DevTools でソースマップを実行すると、JavaScript がコンパイルされていないことがわかり、参照されている個々の JavaScript ファイルをすべて確認できます。ソース マッピングが使用されていますが、実際には、コンパイルされたコードが背後で実行されます。デバッグのために、エラー、ログ、ブレークポイントが開発コードにマッピングされます。その結果、本番環境で開発サイトを実行しているように感じられます。

### 設定でのソースマップの有効化

ソースマップはデフォルトで有効になっています（Chrome 39 以降）。ただし、ソースマップを再確認する場合や有効にする場合は、まず、DevTools を開き、設定の歯車アイコン ![歯車](imgs/gear.png){:.inline} をクリックします。[**Sources**] で、[**Enable JavaScript Source Maps**] をオンにします。[**Enable CSS Source Maps**] をオンにすることもできます。

![ソースマップの有効化](imgs/source-maps.jpg)

### ソースマップを使用したデバッグ

[コードをデバッグ](/web/tools/chrome-devtools/debug/breakpoints/step-code)する際、ソースマップが有効になっていると、ソースマップは 2 か所に表示されます。

1. コンソール（ソースへのリンクは、生成されたファイルではなく、元のファイルです）
2. コードをステップ実行するとき（コールスタック内のリンクをクリックすると、元のソースファイルが開きます）

## @sourceURL と displayName

ソースマップの仕様に即していませんが、`@sourceURL` を使用すると、eval を使用する場合に開発がはるかに容易になります。このヘルパーは `//# sourceMappingURL` プロパティによく似ており、実際にはソースマップ V3 の仕様に記載されています。

評価されるコードに次のような特殊なコメントを挿入することによって、よりわかりやすい名前として DevTools に表示されるように、eval や、インラインのスクリプト、スタイルに名前を付けることができます。

`//# sourceURL=source.coffee`

この**[デモ](http://www.thecssninja.com/demo/source_mapping/compile.html)**に移動し、次の手順を実行します。


* DevTools を開き、[**Sources**] パネルに移動します。
* [_Name your code:] 入力項目にファイル名を入力します。
* [**compile**] ボタンをクリックします。
* CoffeeScript ソースから評価された合計とともにアラートが表示されます。

[_Sources_] サブパネルを展開すると、先ほど入力したカスタム ファイル名を持つ新しいファイルが表示されます。そのファイルをダブルクリックして表示すると、元のソースについてコンパイルされた JavaScript が含まれています。ただし、最後の行には、元のソースファイルの名前を示す `// @sourceURL` コメントが表示されます。これは、言語の抽象化を使用している場合のデバッグに役立ちます。

![sourceURL の使用](imgs/coffeescript.jpg)




{# wf_devsite_translation #}
