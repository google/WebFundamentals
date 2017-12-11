project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: コンソールログは、ページやアプリケーションの動作を調査するための効果的な方法です。まずは console.log() から始め、その他の高度な使用方法を確認しましょう。

{# wf_updated_on: 2015-05-11 #}
{# wf_published_on: 2015-04-13 #}

#  診断とコンソールへのログ出力 {: .page-title }

{% include "web/_shared/contributors/pbakaus.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/flaviocopes.html" %}
コンソールログは、ページやアプリケーションの動作を調査するための効果的な方法です。まずは console.log() から始め、その他の高度な使用方法を確認しましょう。


### TL;DR {: .hide-from-toc }
- 基本的な記録には <a href=''/web/tools/chrome-devtools/debug/console/console-reference#consolelogobject--object-''>console.log()</a> を使用します。
- 目立たせたい内容には <a href=''/web/tools/chrome-devtools/debug/console/console-reference#consoleerrorobject--object-''>console.error()</a> と <a href=''/web/tools/chrome-devtools/debug/console/console-reference#consolewarnobject--object-''>console.warn()</a> を使用します。
- 関連メッセージをグループ化して見やすくするには <a href=''/web/tools/chrome-devtools/debug/console/console-reference#consolegroupobject-object-''>console.group()</a> と <a href=''/web/tools/chrome-devtools/debug/console/console-reference#consolegroupend''>console.groupEnd()</a> を使用します。
- 条件付きエラー メッセージを表示するには <a href=''/web/tools/chrome-devtools/debug/console/console-reference#consoleassertexpression-object''>console.assert()</a> を使用します。


## コンソールへの書き込み

コンソールへの基本的なログ出力には <a href="/web/tools/chrome-devtools/debug/console/console-reference#consolelogobject--object-">console.log()</a> メソッドを使用します。このメソッドは 1 つ以上の式をパラメータとして取り、スペースで区切られた行に複数のパラメータを連結して、現在の値をコンソールに書き込みます。

JavaScript で次のコード行を実行するとします。


    console.log("Node count:", a.childNodes.length, "and the current time is:", Date.now());
    

この場合、コンソールに次のように出力されます。
![複数の値のログ出力](images/console-write-log-multiple.png)

## コマンドのオートコンプリート {:#autocomplete}

コンソールでコマンドを入力する際、オートコンプリート ドロップダウン メニューに、既に入力したテキストと一致する関連メソッドが自動的に表示されます。
これには、以前に実行したコマンドも含まれます。

![オートコンプリートの例](images/autocomplete.png)

## コンソール出力の整理 {:#organizing}

### メッセージのグループ化

グループ化コマンドを使用すると、関連する出力をグループ化できます。[`console.group()`](./console-reference#consolegroupobject-object-) コマンドは、グループの名前を設定する 1 つの文字列パラメータを取ります。このコマンドを JavaScript で呼び出すと、コンソールでは、それ以降のすべての出力がグループ化されます。

終わったら単に [`console.groupEnd()`](./console-reference#consolegroupend) を呼び出すと、グループ化が終了します。

入力例：


    var user = "jsmith", authenticated = false;
    console.group("Authentication phase");
    console.log("Authenticating user '%s'", user);
    // authentication code here...
    if (!authenticated) {
        console.log("User '%s' not authenticated.", user)
    }
    console.groupEnd();
    

出力例:
![コンソールでの簡単なグループ出力](images/console-write-group.png)

#### ネストされたグループ

ロググループを相互にネストすることもできます。これは、大きいグループを細かく分けて一度に表示する場合に便利です。

次の例は、ログイン プロセスの認証フェーズのロググループを示しています。


    var user = "jsmith", authenticated = true, authorized = true;
    // Top-level group
    console.group("Authenticating user '%s'", user);
    if (authenticated) {
        console.log("User '%s' was authenticated", user);
        // Start nested group
        console.group("Authorizing user '%s'", user);
        if (authorized) {
            console.log("User '%s' was authorized.", user);
        }
        // End nested group
        console.groupEnd();
    }
    // End top-level group
    console.groupEnd();
    console.log("A group-less log trace.");
    

コンソールにおけるネストされたグループの出力は次のとおりです。
![コンソールでの簡単なグループ出力](images/console-write-nestedgroup.png)

#### グループの自動折りたたみ

グループをよく使用する場合は、個々のグループ内の情報が表示されないようにすると便利です。このためには、`console.group()` の代わりに [`console.groupCollapsed()`](./console-reference#consolegroupcollapsedobject-object-) を呼び出して、グループを自動的に折りたたむことができます。


    console.groupCollapsed("Authenticating user '%s'", user);
    if (authenticated) {
        ...
    }
    console.groupEnd();
    

groupCollapsed() の出力:
![最初は折りたたまれた状態のグループ](images/console-write-groupcollapsed.png)

## エラーと警告

エラーと警告は、通常のログと同様に動作します。唯一の違いは、注意を喚起するために `error()` と `warn()` にスタイルが設定されている点です。

### console.error()

[`console.error()`](./console-reference#consoleerrorobject--object-) メソッドは、赤色のアイコンと赤色のメッセージ テキストを表示します。


    function connectToServer() {
        console.error("Error: %s (%i)", "Server is  not responding",500);
    }
    connectToServer();
    

上記のように入力すると、出力結果は次のようになります。

![エラーの出力例](images/console-write-error-server-not-resp.png)

### console.warn()

[`console.warn()`](./console-reference#consolewarnobject--object-) メソッドは、黄色の警告アイコンとメッセージ テキストを表示します。


    if(a.childNodes.length < 3 ) {
        console.warn('Warning! Too few nodes (%d)', a.childNodes.length);
    }
    

上記のように入力すると、出力結果は次のようになります。

![警告の例](images/console-write-warning-too-few-nodes.png)

## アサーション

[`console.assert()`](./console-reference#consoleassertexpression-object) メソッドは、最初のパラメータが `false` として評価された場合にのみ、条件付きでエラー文字列（2 番目のパラメータ）を表示します。

### 簡単なアサーションとその表示例

次のコードを実行すると、`list` 要素に属する子ノードの数が 500 を超える場合にのみ、コンソールにエラー メッセージが表示されます。


    console.assert(list.childNodes.length < 500, "Node count is > 500");
    

コンソールにおけるアサーションの失敗の表示:
![アサーションの失敗](images/console-write-assert-failed.png)

## 文字列の置換とフォーマット

ログ出力メソッドに渡される最初のパラメータには、1 つ以上のフォーマット指定子を含めることができます。フォーマット指定子は、`%` 記号とその後に続く文字（値に適用するフォーマットを示す）で構成されます。文字列に続くパラメータが順番にプレースホルダに適用されます。

次の例では、文字列と数字のフォーマッタを使用して、値を出力文字列に挿入します。コンソールには「Sam has 100 points」と表示されます。

    console.log("%s has %d points", "Sam", 100);

すべてのフォーマット指定子のリストは次のとおりです。

| 指定子 | 出力                                                                            |
|-----------|:----------------------------------------------------------------------------------|
| %s        | 値を文字列としてフォーマットします。|
| %i または %d  | 値を整数としてフォーマットします。|
| %f        | 値を浮動小数点値としてフォーマットします。|
| %o        | 値を展開可能な DOM 要素としてフォーマットします。[Elements] パネルに表示されるフォーマットです。     |
| %O        | 値を展開可能な JavaScript オブジェクトとしてフォーマットします。                              |
| %c        | 2 番目のパラメータで指定されたように出力文字列に CSS スタイルルールを適用します。 |

次の例では、数字の指定子を使用して `document.childNodes.length` の値をフォーマットします。さらに、浮動小数点の指定子を使用して `Date.now()` の値をフォーマットします。

コードは次のとおりです。


    console.log("Node count: %d, and the time is %f.", document.childNodes.length, Date.now());
    

上記のコードサンプルの出力:
![置換の出力例](images/console-write-log-multiple.png)

### CSS を使用したコンソール出力のスタイル設定

CSS フォーマット指定子を使用すると、コンソールの表示をカスタマイズできます。文字列の先頭に指定子を配置し、適用するスタイルを 2 番目のパラメータとして指定します。


次のコードを実行するとします。


    console.log("%cThis will be formatted with large, blue text", "color: blue; font-size: x-large");
    

ログ出力が大きくなり、青色で表示されます。

![フォーマットされた文字列](images/console-write-format-string.png)

### JavaScript オブジェクトとしての DOM 要素のフォーマット

デフォルトでは、DOM 要素は HTML の表現としてコンソールに出力されますが、JavaScript オブジェクトとして DOM 要素にアクセスし、そのプロパティを調査することもできます。そのためには、`%o` 文字列指定子を使用します（上記を参照）。また、`console.dir` を使用しても同じ結果が得られます。 

![dir() を使用した要素のログ出力](images/dir-element.png)




{# wf_devsite_translation #}
