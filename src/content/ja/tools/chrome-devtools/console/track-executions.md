project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: コンソール API を使用すると、実行時間を測定したり、文の実行回数をカウントしたりすることができます。

{# wf_updated_on:2015-05-11 #}
{# wf_published_on:2015-04-13 #}

#  実行の測定とカウント {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/flaviocopes.html" %}
{% include "web/_shared/contributors/pbakaus.html" %}

コンソール API を使用すると、実行時間を測定したり、文の実行回数をカウントしたりすることができます。


### TL;DR {: .hide-from-toc }
- コードの実行ポイント間の経過時間を追跡するには、 <code>console.time()</code> と <code>console.timeEnd()</code> を使用します。
- 同じ文字列が関数に渡された回数をカウントするには、 <code>console.count()</code> を使用します。


##  実行時間の測定

[`time()`](./console-reference#consoletimelabel) メソッドは新しいタイマーを起動し、処理に要した時間を測定する場合に便利です。マーカーの名前を文字列としてメソッドに渡します。

タイマーを停止するには、[`timeEnd()`](./console-reference#consoletimeendlabel) を呼び出し、イニシャライザに渡したものと同じ文字列を渡します。

`timeEnd()` メソッドが起動すると、ラベルと経過時間がコンソールにログ出力されます。

###  基本的な例:

ここでは、100 万個の新しい配列の初期化を測定します。


    console.time("Array initialize");
    var array= new Array(1000000);
    for (var i = array.length - 1; i >= 0; i--) {
        array[i] = new Object();
    };
    console.timeEnd("Array initialize");
    

コンソールの出力結果:
![経過時間](images/track-executions-time-duration.png)

###  Timeline のタイマー

`time()` の操作中に [Timeline](/web/tools/chrome-devtools/profile/evaluate-performance/timeline-tool) 記録が行われている場合は、タイムラインにもアノテーションが追加されます。これはアプリケーションの動作や、その動作がどこで発生したのかを追跡する場合に使用できます。

`time()` によるタイムラインのアノテーションの例:

![Timeline でのタイマーによるアノテーション](images/track-executions-time-annotation-on-timeline.png)

###  Timeline へのマークの追加

*注:`timeStamp()` メソッドは、Timeline 記録が進行中の場合にのみ機能します。*

[[Timeline] パネル](/web/tools/chrome-devtools/profile/evaluate-performance/timeline-tool) には、エンジンがどこで時間を費やしたかについて包括的な概要が表示されます。[`timeStamp()`](./console-reference#consoletimestamplabel) を使用すると、コンソールから Timeline にマークを追加できます。
この方法により、アプリケーション内のイベントを他のイベントと簡単に関連付けることができます。

`timeStamp()` では、Timeline の次の場所にアノテーションが追加されます。

- Timeline の概要および詳細ビューに黄色の縦線が表示されます。
- イベントのリストに記録が追加されます。

次にサンプル コードを示します。


    function AddResult(name, result) {
        console.timeStamp("Adding result");
        var text = name + ': ' + result;
        var results = document.getElementById("results");
        results.innerHTML += (text + "<br>");
    }
    

これにより、Timeline に次のようなタイムスタンプが表示されます。

![タイムラインでのタイムスタンプ](images/track-executions-timestamp2.png)

##  文の実行回数のカウント

指定された文字列とともに、同じ文字列が指定された回数をログ出力するには、`count()` メソッドを使用します。まったく同じ文が同じ行で `count()` に渡されると、回数がインクリメントされます。

動的コンテンツで `count()` を使用するサンプルコード:


    function login(user) {
        console.count("Login called for user " + user);
    }
    
    users = [ // by last name since we have too many Pauls.
        'Irish',
        'Bakaus',
        'Kinlan'
    ];
    
    users.forEach(function(element, index, array) {
        login(element);
    });
    
    login(users[0]);
    

コードサンプルの出力:

![console.count() の出力例](images/track-executions-console-count.png)




{# wf_devsite_translation #}
