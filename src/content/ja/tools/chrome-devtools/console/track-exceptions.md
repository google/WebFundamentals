project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Chrome DevTools には、例外をスローしているウェブページの修正や JavaScript のエラーのデバッグに役立つツールが用意されています。

{# wf_updated_on:2015-05-12 #}
{# wf_published_on:2015-04-13 #}

#  例外とエラーの処理 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/flaviocopes.html" %}
Chrome DevTools には、例外をスローしているウェブページの修正や JavaScript のエラーのデバッグに役立つツールが用意されています。

ページの例外や JavaScript のエラーの詳細を把握できれば、実際に非常に便利です。ページで例外がスローされたり、スクリプトでエラーが生成されたりした場合、コンソールで提供される具体的で信頼性の高い情報を使用して、問題を特定し、修正することができます。 

コンソールでは、例外を追跡し、その原因となった実行パスをトレースして、明示的または暗黙的にそれらの例外を捕捉（または無視）することができます。さらに、例外データを自動的に収集、処理するエラーハンドラを設定することもできます。


### TL;DR {: .hide-from-toc }
- 例外が発生したときにコード コンテキストをデバッグするには、[Pause on exceptions] を有効にします。
- 現在の JavaScript コールスタックを出力するには、 <code>console.trace</code> を使用します。
- コードにアサーションを追加して例外をスローするには、 <code>console.assert()</code> を使用します。
- ブラウザで発生しているエラーをログに記録するには、 <code>window.onerror</code> を使用します。


## 例外の追跡

>問題が発生した場合、DevTools コンソールを開いて（`Ctrl+Shift+J` / `Cmd+Option+J`）、JavaScript エラー メッセージを確認します。メッセージごとに行番号とファイル名のリンクが表示され、該当する場所に移動することができます。


例外の例:
![例外の例](images/track-exceptions-tracking-exceptions.jpg)

### 例外のスタックトレースの表示

どの実行パスがエラーの原因かわからない場合もあります。コンソールでは、JavaScript コールスタック全体に例外が関連付けられます。これらのコンソール メッセージを展開してスタック フレームを表示し、コード内の該当する場所に移動します。



![例外のスタックトレース](images/track-exceptions-exception-stack-trace.jpg)

### JavaScript 例外での一時停止

次に例外がスローされたときに、JavaScript の実行を一時停止し、そのコールスタック、スコープ変数、アプリケーションの状態を調べます。[Scripts] パネルの下部にある 3 ステート停止ボタン ![[Pause] ボタン](images/track-exceptions-pause-gray.png){:.inline} を使用すると、それぞれの例外処理モードに切り替えることができます。




すべての例外で一時停止するか、捕捉されない例外のみで一時停止するかを選択します。例外をまとめて無視することもできます。

![例外の一時停止](images/track-exceptions-pause-execution.jpg)

## スタックトレースの出力

ウェブページの動作をより的確に把握するには、ログメッセージをコンソールに出力します。関連するスタックトレースを含め、ログエントリにさらに情報を組み込みます。
これにはいくつかの方法があります。

### Error.stack
各 Error オブジェクトには、スタックトレースを格納する、stack という文字列プロパティがあります。

![Error.stack の例](images/track-exceptions-error-stack.jpg)

### console.trace()

現在の JavaScript コールスタックを出力する [`console.trace()`](./console-reference#consoletraceobject) の呼び出しをコードに追加します。

![console.trace() の例](images/track-exceptions-console-trace.jpg)

### console.assert()

最初のパラメータとしてエラー条件を指定して [`console.assert()`](./console-reference#consoleassertexpression-object) を呼び出すことにより、JavaScript コードにアサーションを挿入します。この式が false として評価されると、対応するコンソール レコードが表示されます。




![console.assert() の例](images/track-exceptions-console-assert.jpg)

## スタックトレースを調べて原因を特定する方法

ここで紹介したツールを使用して、エラーの実際の原因を特定する方法を確認しましょう。2 つのスクリプトを含む簡単な HTML ページを次に示します。



![コード例](images/track-exceptions-example-code.png)

ユーザーがページをクリックすると、段落の内部テキストが変更され、`lib.js` で提供される `callLibMethod()` 関数が呼び出されます。



この関数は `console.log` を出力した後、`console.slog` を呼び出しますが、このメソッドはコンソール API にはありません。その結果、エラーが発生します。




ページが実行されているときに、ページをクリックすると、次のエラーが発生します。


![発生したエラー](images/track-exceptions-example-error-triggered.png)

矢印をクリックすると、エラー メッセージを展開できます。

![展開されたエラー メッセージ](images/track-exceptions-example-error-message-expanded.png)

エラーが `lib.js` の 4 行目で発生しており、これは、``addEventListener` のコールバックである不明な関数で `script.js` によって 3 行目で呼び出されていることがわかります。



これは簡単な例ですが、複雑なログ トレース デバッグでもプロセスは同じです。


## window.onerror を使用した実行時例外の処理

Chrome では、JavaScript コードの実行でエラーが発生したときに呼び出される `window.onerror` ハンドラ関数を公開しています。JavaScript 例外がウィンドウ コンテキストでスローされ、try/catch ブロックによって捕捉されない場合、この関数が呼び出され、例外のメッセージ、例外がスローされたファイルの URL、そのファイル内の行番号が、この順番で 3 つの引数として渡されます。








捕捉されない例外に関する情報を収集し、AJAX POST の呼び出しなどを使用してサーバーに報告するエラー ハンドラを設定すると、効果的な場合があります。この方法では、ユーザーのブラウザで発生しているすべてのエラーをログに記録し、それらについて通知を受け取ることができます。

`window.onerror` の使用例:

![window.onerror ハンドラの例](images/runtime-exceptions-window-onerror.jpg)




{# wf_devsite_translation #}
