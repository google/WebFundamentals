project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: コンソール API を使用して、コンソールに情報を書き込んだり、JavaScript プロファイルを作成したり、デバッグ セッションを開始したりできます。

{# wf_updated_on: 2016-03-21 #}
{# wf_published_on: 2016-03-21 #}

#  コンソール API リファレンス {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/pbakaus.html" %}

コンソール API を使用して、コンソールに情報を書き込んだり、JavaScript プロファイルを作成したり、デバッグ セッションを開始したりできます。



##  console.assert(expression, object) {:#assert}

評価された式が `false` の場合に、[エラー](#error)をコンソールに書き込みます。
 


    function greaterThan(a,b) {
      console.assert(a > b, {"message":"a is not greater than b","a":a,"b":b});
    }
    greaterThan(5,6);
    

![console.assert() の例](images/assert.png)

##  console.clear() {:#clear}

コンソールをクリアします。


    console.clear();
    

[[**Preserve log**](index#preserve-log)] チェックボックスがオンの場合、`console.clear()` は無効になります。
ただし、コンソールがフォーカスされている状態で [**clear console**] ボタン（![[clear console] ボタン](images/clear-console-button.png){:.inline}）を押したり、ショートカット <kbd>Ctrl</kbd>+<kbd>L</kbd> を入力したりすることはできます。


 

詳細は、[コンソールのクリア](index#clearing) をご覧ください。

##  console.count(label) {:#count}

`count()` が同じ行で同じラベルを使用して呼び出された回数を書き込みます。



    function login(name) {
      console.count(name + ' logged in');
    }
    

![console.count() の例](images/count.png)

他の例については、[文の実行回数のカウント][cse]を参照してください。

[cse]: track-executions#counting-statement-executions

##  console.debug(object [, object, ...])

[`console.log()`](#log) と同じです。

##  console.dir(object) {:#dir}

指定されたオブジェクトの JavaScript 表現を出力します。記録されているオブジェクトが HTML 要素の場合は、次のように、その DOM 表現のプロパティが出力されます。




    console.dir(document.body);
    

![`console.dir()` の例](images/dir.png)

機能的に同じオブジェクト フォーマッタ（`%O`）などについては、[文字列の置換とフォーマット][of] を参照してください。


[of]: console-write#string-substitution-and-formatting

##  console.dirxml(object)

可能な場合は `object` の子孫要素の XML 表現を出力し、不可能な場合は JavaScript 表現を出力します。
HTML 要素や XML 要素に対して `console.dirxml()` を呼び出すことは、[`console.log()`](#log) を呼び出すことと同じです。



    console.dirxml(document);
    

![console.dirxml() の例](images/dirxml.png)

##  console.error(object [, object, ...]) {:#error}

[`console.log()`](#log) と同様のメッセージを出力したり、メッセージをエラーのようにスタイル設定したり、メソッドが呼び出された場所からのスタックトレースを含めたりします。




    console.error('error: name is undefined');
    

![console.error() の例](images/error.png)

##  console.group(object[, object, ...])

オプションのタイトルを指定して新しいロググループを作成します。`console.group()` の後から `console.groupEnd()` の前までに行われたすべてのコンソール出力が視覚的にグループ化されます。

 


    function name(obj) {
      console.group('name');
      console.log('first: ', obj.first);
      console.log('middle: ', obj.middle);
      console.log('last: ', obj.last);
      console.groupEnd();
    }
    
    name({"first":"Wile","middle":"E","last":"Coyote"});
    

![console.group() の例](images/group.png)

グループをネストすることもできます。


    function name(obj) {
      console.group('name');
      console.log('first: ', obj.first);
      console.log('middle: ', obj.middle);
      console.log('last: ', obj.last);
      console.groupEnd();
    }
    
    function doStuff() {
      console.group('doStuff()');
      name({"first":"Wile","middle":"E","last":"coyote"});
      console.groupEnd();
    }
    
    doStuff();
    

![ネストされた console.group() の例](images/nested-group.png)

{# include shared/related_guides.liquid inline=true list=page.related-guides.organizing #}

##  console.groupCollapsed(object[, object, ...])

新しいロググループを作成します。グループは最初、折りたたまれた状態です。 


    console.groupCollapsed('status');
    console.log("peekaboo, you can't see me");
    console.groupEnd();
    

##  console.groupEnd() {:#groupend}

ロググループを閉じます。例については、[`console.group`](#group) を参照してください。

##  console.info(object [, object, ...])

[`console.log()`](#log) と同様にメッセージを出力しますが、出力の横にアイコン（青い円に白字の「i」）も表示します。
 

##  console.log(object [, object, ...]) {:#log}

コンソールにメッセージを表示します。このメソッドには、1 つ以上のオブジェクトを渡します。各オブジェクトが評価され、スペースで区切られた文字列に連結されます。



    console.log('Hello, Logs!');
    

###  フォーマット指定子 {:#format-specifiers}

第一引数に 1 つ以上の **フォーマット指定子** を含めることができます。フォーマット指定子は、パーセント記号（`%`）とその後に続く文字（適用するフォーマットを示す）で構成されます。

 

関連ガイド:

* [コンソール出力の整理](console-write)

##  console.profile([label]) {:#profile}

オプションのラベルを指定して JavaScript CPU プロファイルを開始します。プロファイルを完了するには、`console.profileEnd()` を呼び出します。
各プロファイルは [**Profiles**] パネルに追加されます。



    function processPixels() {
      console.profile("processPixels()");
      // later, after processing pixels
      console.profileEnd();
    }
    

##  console.profileEnd() {:#profileend}

現在の JavaScript CPU プロファイリング セッション（実行中の場合）を停止し、レポートを [**Profiles**] パネルに出力します。


例については、[`console.profile()`](#profile) を参照してください。

##  console.time(label) {:#time}

ラベルを関連付けて新しいタイマーを開始します。同じラベルを指定して `console.timeEnd()` を呼び出すと、タイマーは停止し、コンソールに経過時間が表示されます。
タイマー値の精度はミリ秒単位です。`time()` と `timeEnd()` に渡す文字列は一致している必要があり、一致していない場合、timer は終了しません。




    console.time("Array initialize");
    var array = new Array(1000000);
    for (var i = array.length - 1; i >= 0; i--) {
      array[i] = new Object();
    }
    console.timeEnd("Array initialize");
    

![console.time() の例](images/time.png)

##  console.timeEnd(label) {:#timeend}

現在のタイマー（実行中の場合）を停止し、コンソールにタイマーラベルと経過時間を出力します。
 

例については、[`console.time()`](#time) を参照してください。 

##  console.timeStamp([label]) {:#timestamp}

記録セッション中にイベントを [**Timeline**] に追加します。 


    console.timeStamp('check out this custom timestamp thanks to console.timeStamp()!');
    

![console.timeStamp() の例](images/timestamp.png)

関連ガイド:

* [Timeline ツールの使用](/web/tools/chrome-devtools/evaluate-performance/timeline-tool)


##  console.trace(object) {:#trace}

メソッドが呼び出された時点からのスタックトレースを出力します。 

    console.trace();

![console.trace() の例](images/trace.png)

##  console.warn(object [, object, ...]) {:#warn}

[`console.log()`](#log) と同様にメッセージを出力しますが、ログ メッセージの横に黄色の警告アイコンも表示します。


    console.warn('user limit reached!');

![console.warn() の例](images/warn.png)


{# wf_devsite_translation #}
