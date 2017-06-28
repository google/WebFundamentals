project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: "Promise は、延期された非同期の計算を簡素化します。Promise はまだ完了していない操作を表します。"

{# wf_published_on:2013-12-16 #}
{# wf_updated_on:2014-01-29 #}

# JavaScript の Promise: 概要 {: .page-title }

{% include "web/_shared/contributors/jakearchibald.html" %}

みなさん、ウェブ開発の歴史における重要な瞬間に備えてください。


[<em>ドラムロール</em>]

Promise が JavaScript でネイティブで使用できるようになりました！

[<em>花火が上がり、キラキラした紙吹雪が降り注ぎ、人々が熱狂する</em>]

この時点で、あなたの反応は次のいずれかでしょう。

* 周囲の人は喜んでいるが、あなたは何をそんなに騒ぐことがあるのかよくわかりません。おそらくあなたは、「Promise」が何かもわかっていないでしょう。あなたは肩をすくめますが、紙吹雪の重みが肩にのしかかってきます。もしそうだとしても心配しないでください。私の場合も、なぜ Promise がそんなに重要なのか理解するのに長い時間がかかりました。[基本](#whats-all-the-fuss-about)から始めましょう。
* あなたはガッツポーズをします。この瞬間を待ちかねていましたか？あなたはこの Promise というものを以前から使用していましたが、実装ごとに API が若干異なることに煩わされていました。公式な JavaScript バージョンの API は何でしょうか。[用語](#promise-terminology)から始めましょう。
* あなたはこのことについて既に知っており、まるで大事件かのように騒いでいる人々をあざ笑っています。しばらく優越感に浸ったら、[API リファレンス](#promise-api-reference)に直行しましょう。

##  何がそんなに大事件なのか{: #whats-all-the-fuss-about }

JavaScript はシングル スレッドです。スクリプトの 2 つの部分を同時に実行できず、1 つずつ実行する必要があります。ブラウザでは、1 つのスレッドを JavaScript およびその他多数のもの（ブラウザによって異なります）と共有しています。ただし、一般に、JavaScript はペイント、スタイルの更新、ユーザー操作の処理（テキストのハイライト表示やフォーム コントロールの操作など）と同じキューに入っています。これらいずれかの処理のアクティビティが、他のアクティビティを遅延させます。

人間はマルチスレッドです。複数の指を使ってタイピングし、運転しながら会話することができます。唯一邪魔になる機能はくしゃみです。くしゃみの間は、現在のアクティビティをすべて停止する必要があります。これはかなり煩わしいものです。運転しながら会話しようとしているときにはなおさらです。くしゃみばかりするコードを記述したくはないでしょう。

これを回避するために、これまではおそらく、イベントとコールバックを使用していたことでしょう。イベントを次に示します。

    var img1 = document.querySelector('.img-1');

    img1.addEventListener('load', function() {
      // woo yey image loaded
    });

    img1.addEventListener('error', function() {
      // argh everything's broken
    });


このイベントはまったくくしゃみをしません。イメージを取得し、いくつかのリスナを追加すると、JavaScript はいずれかのリスナーが呼び出されるまで実行を停止します。

残念なことに、上記の例では、イベントが発生した後でイベントをリッスンし始めた可能性があります。そこで、イメージの「complete」プロパティを使用して、これを回避する必要があります。

    var img1 = document.querySelector('.img-1');

    function loaded() {
      // woo yey image loaded
    }

    if (img1.complete) {
      loaded();
    }
    else {
      img1.addEventListener('load', loaded);
    }

    img1.addEventListener('error', function() {
      // argh everything's broken
    });

こうすると、イベントをリッスンできるようになる前にエラーが発生したイメージは取得されません。残念ながら、DOM ではこの処理を行う方法は提供されません。これは 1 つのイメージを読み込む場合でしたが、複数のイメージが読み込まれた場合を考えると物事はより複雑になります。


## イベントが常に最良の方法とは限らない

イベントは、keyup、touchstart など、同じオブジェクトに対して複数回発生する可能性のある処理に適しています。これらのイベントを使用すると、リスナーをアタッチする前に何が行われていても関係なくなります。ただし、非同期の成功と失敗に関しては、理想的には次のようなコードが必要です。

    img1.callThisIfLoadedOrWhenLoaded(function() {
      // loaded
    }).orIfFailedCallThis(function() {
      // failed
    });

    // and…
    whenAllTheseHaveLoaded([img1, img2]).callThis(function() {
      // all loaded
    }).orIfSomeFailedCallThis(function() {
      // one or more failed
    });

これが Promise が行うことです。ただし、より適切な名前が付けられています。HTML イメージ要素に Promise を返す「ready」メソッドがある場合は、次のようにすることができます。

    img1.ready().then(function() {
      // loaded
    }, function() {
      // failed
    });

    // and…
    Promise.all([img1.ready(), img2.ready()]).then(function() {
      // all loaded
    }, function() {
      // one or more failed
    });


最も基本的な部分では、Promise はイベント リスナーに似ていますが、次の点が異なります。

* Promise は 1 回しか成功または失敗できません。2 回成功または失敗することはできず、成功から失敗（またはその逆）に変化することもできません。
* Promise が成功または失敗し、後から成功と失敗のコールバックを追加すると、それより前にイベントが実行されていても、正しいコールバックが呼び出されます。

これは、非同期の成功と失敗に非常に役立ちます。何かが使用可能になった正確な時点にそれほどとらわれなくなり、結果に対して応答することの方が重要になるためです。


##  Promise の用語{: #promise-terminology }

この記事の最初のドラフト版をレビューした [Domenic Denicola](https://twitter.com/domenic) から、用語に関して「F」評価を付けられました。彼は私を居残りさせて、[States and Fates](https://github.com/domenic/promises-unwrapping/blob/master/docs/states-and-fates.md) を 100 回書き写させ、問題があるという手紙を私の両親に送りつけました。それにもかかわらず、私はまだ多くの用語を混同して使用していますが、基本は以下のとおりです。

Promise の状態は次のいずれかです。

* **解決済み** - Promise に関連する操作が成功した
* **棄却済み** - Promise に関連する操作が失敗した
* **未解決** - まだ解決も棄却もされていない
* **完了** - 解決または棄却された


[仕様](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-promise-objects)では、`then` メソッドを持っているという点で Promise に似ているオブジェクトを示すために **thenable** という用語も使用されています。この用語はイングランド サッカーの前のマネージャーである [Terry Venables](https://en.wikipedia.org/wiki/Terry_Venables) を思い出させるので、できるだけ使わないようにします。


## JavaScript に Promise がやってきた

Promise は、次のようなライブラリの形で以前から存在していました。

* [Q](https://github.com/kriskowal/q)
* [when](https://github.com/cujojs/when)
* [WinJS](https://msdn.microsoft.com/en-us/library/windows/apps/br211867.aspx)
* [RSVP.js](https://github.com/tildeio/rsvp.js)

これらと JavaScript の Promise は、[Promises/A+](https://github.com/promises-aplus/promises-spec) と呼ばれる共通の標準化された動作を共有しています。jQuery ユーザーであれば、jQuery には [Deferred](https://api.jquery.com/category/deferred-object/) と呼ばれる類似の動作があります。ただし、Deferred は Promise/A+ に準拠していないため、[微妙に異なり、有用性で劣る](https://thewayofcode.wordpress.com/tag/jquery-deferred-broken/)ことに注意してください。jQuery には [Promise 型](https://api.jquery.com/Types/#Promise)もありますが、これは単なる Deferred のサブセットであり、同じ問題があります。

Promise の実装は標準化された動作に従いますが、全体的な API は異なります。JavaScript の Promise は、API が RSVP.js に似ています。Promise の作成方法を次に示します。

    var promise = new Promise(function(resolve, reject) {
      // do a thing, possibly async, then…

      if (/* everything turned out fine */) {
        resolve("Stuff worked!");
      }
      else {
        reject(Error("It broke"));
      }
    });


Promise コンストラクタはコールバックを 1 つの引数として取り、コールバックは resolve と reject を 2 つのパラメータとして取ります。非同期処理など、コールバック内でなんらかの操作を行い、すべてが成功すると呼び出しが解決されます。そうでない場合、呼び出しは棄却されます。

単純な古い JavaScript の `throw` と同様に、Error オブジェクトで棄却することが慣例ですが、必須ではありません。Error オブジェクトの利点は、スタックトレースを取得し、デバッグツールをより便利にすることです。

この Promise の使用方法を次に示します。

    promise.then(function(result) {
      console.log(result); // "Stuff worked!"
    }, function(err) {
      console.log(err); // Error: "It broke"
    });


`then()` は 2 つの引数として、成功した場合のコールバックと失敗した場合のコールバックを取ります。両方とも省略可能なため、成功した場合か失敗した場合いずれかのコールバックのみを追加できます。

JavaScript の Promise は、最初に DOM で「Future」として導入され、その後「Promise」に名前が変更されて、最終的に JavaScript に移行されました。これを DOM ではなく JavaScript で使用すると、Node.js などのブラウザ以外の JS コンテキストで使用できるようになるため便利です（コア API で Promise を利用するかどうかは別の問題です）。

これは JavaScript の機能ですが、DOM でも問題なく使用できます。実際、非同期の成功と失敗のメソッドを持つすべての新しい DOM API で Promise が使用されます。これは、[Quota Management](https://dvcs.w3.org/hg/quota/raw-file/tip/Overview.html#idl-def-StorageQuota)、[Font Load Events](http://dev.w3.org/csswg/css-font-loading/#font-face-set-ready)、[ServiceWorker](https://github.com/slightlyoff/ServiceWorker/blob/cf459d473ae09f6994e8539113d277cbd2bce939/service_worker.ts#L17)、[Web MIDI](https://webaudio.github.io/web-midi-api/#widl-Navigator-requestMIDIAccess-Promise-MIDIOptions-options)、[Streams](https://github.com/whatwg/streams#basereadablestream) などで既に行われています。


## ブラウザ対応と polyfill

現在、ブラウザには既に Promise が実装されています。

Chrome 32、Opera 19、Firefox 29、Safari 8、および Microsoft Edge 以降、Promise は既定で有効になっています。

完全な Promise の実装がないブラウザを仕様に準拠させる場合や、その他のブラウザや Node.js に Promise を追加する場合は、[polyfill](https://github.com/jakearchibald/ES6-Promises#readme) （2 k gzi 圧縮）を確認してください。


## 他のライブラリとの互換性

JavaScript Promise API は、`then()` メソッドを持つもの（または、Promise の用語では `thenable`）をすべて Promise と同様に処理します。そのため、Q Promise を返すライブラリを使用している場合は問題ありません。新しい JavaScript の Promise で問題なく機能します。

ただし、前述したとおり、jQuery の Deferred はやや不親切です。幸運なことに、これらは標準の Promise にキャストできるので、すぐにでも試してみる価値があります。


    var jsPromise = Promise.resolve($.ajax('/whatever.json'))


この場合、jQuery の `$.ajax` は Deferred を返します。これは `then()` メソッドを持つため、`Promise.resolve()` はこれを JavaScript の Promise に変換できます。ただし、Deferred は複数の引数をコールバックに渡す場合があります。次に例を示します。

    var jqDeferred = $.ajax('/whatever.json');

    jqDeferred.then(function(response, statusText, xhrObj) {
      // ...
    }, function(xhrObj, textStatus, err) {
      // ...
    })



JS Promise は、最初の次の行以外すべてを無視します。


    jsPromise.then(function(response) {
      // ...
    }, function(xhrObj) {
      // ...
    })



幸いなことに、通常はこれが必要な行です。少なくとも、必要なものへのアクセスは得られます。また jQuery は、拒否されたものに Error オブジェクトを渡すという慣例に従わないことにも注意してください。


## 複雑な非同期コードが簡単に

では、実際にコーディングしてみましょう。次の処理が必要だとします。

1. 読み込み中であることを示すスピナーを開始する
1. 各章のタイトルと URL を示す記事の JSON を取得する
1. ページにタイトルを追加する
1. 各章を取得する
1. ページに記事を追加する
1. スピナーを停止する

また、途中で何かが失敗した場合は、それをユーザーに通知する必要もあります。スピナーもその時点で停止する必要があります。そうしないと、スピナーは回転を続け、ユーザーにめまいをおこさせたり、他の UI に影響したりします。

もちろん、通常は JavaScript を使用して記事を提供することはなく、[HTML で提供した方が早いですが](https://jakearchibald.com/2013/progressive-enhancement-is-faster/)、複数のデータを取得し、すべて取得された後でなんらかの処理を行うというこのパターンは、API を使用する際の非常に一般的なパターンです。

まずはじめに、ネットワークからのデータの取得について説明します。

## XMLHttpRequest の Promise 化

古い API は、後方互換性を維持したまま更新できれば、Promise を使用するように更新されます。`XMLHttpRequest` は主要な候補ですが、とりあえず、GET リクエストを行うための単純な関数を記述してみましょう。



    function get(url) {
      // Return a new promise.
      return new Promise(function(resolve, reject) {
        // Do the usual XHR stuff
        var req = new XMLHttpRequest();
        req.open('GET', url);

        req.onload = function() {
          // This is called even on 404 etc
          // so check the status
          if (req.status == 200) {
            // Resolve the promise with the response text
            resolve(req.response);
          }
          else {
            // Otherwise reject with the status text
            // which will hopefully be a meaningful error
            reject(Error(req.statusText));
          }
        };

        // Handle network errors
        req.onerror = function() {
          reject(Error("Network Error"));
        };

        // Make the request
        req.send();
      });
    }


次に、これを以下のように使用します。

    get('story.json').then(function(response) {
      console.log("Success!", response);
    }, function(error) {
      console.error("Failed!", error);
    })


[ここをクリックして上記のコードの動作を確認](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/getting-started/primers/story.json){: target="_blank" .external }し、DevTools のコンソールで結果を確認してください。これで、`XMLHttpRequest` を手動で入力せずに HTTP リクエストを実行できるようになりました。あの腹立たしいキャメルケースの `XMLHttpRequest` を見る機会も減り、喜ばしいことです。


## 連鎖

`then()` で話は終わりではありません。複数の `then` を連鎖させて、値を変換したり、追加の非同期処理を順に実行したりすることができます。


### 値の変換
単純に新しい値を返すことで、値を変換できます。

    var promise = new Promise(function(resolve, reject) {
      resolve(1);
    });

    promise.then(function(val) {
      console.log(val); // 1
      return val + 2;
    }).then(function(val) {
      console.log(val); // 3
    })


実用的な例として、もう一度このコードを見てみましょう。

    get('story.json').then(function(response) {
      console.log("Success!", response);
    })



レスポンスは JSON ですが、現在これを書式なしテキストとして受け取っています。JSON [`responseType`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#responseType) を使用するように get 関数を変更することもできますが、Promise を使用してこれを解決することもできます。

    get('story.json').then(function(response) {
      return JSON.parse(response);
    }).then(function(response) {
      console.log("Yey JSON!", response);
    })



`JSON.parse()` は、単一の引数を取り、変換された値を返すため、次のようなショートカットを作成できます。

    get('story.json').then(JSON.parse).then(function(response) {
      console.log("Yey JSON!", response);
    })


[ここをクリックして上記のコードの動作を確認](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/getting-started/primers/story.json){: target="_blank" .external }し、DevTools のコンソールで結果を確認してください。実は、次のような `getJSON()` 関数を非常に簡単に作成できます。


    function getJSON(url) {
      return get(url).then(JSON.parse);
    }

`getJSON()` も Promise を返します。これが URL を取得し、レスポンスを JSON として解析します。


### 非同期処理のキューへの格納

`then` を連鎖させて、非同期処理を連続して実行することもできます。

`then()` コールバックからなんらかの値が返されると、ちょっとした魔法がおきます。値が返されると、その値を指定して次の `then()` が呼び出されます。ただし、Promise に似たものが返された場合は、次の `then()` はその時点で待機し、その Promise が完了（成功または失敗）した場合にのみ呼び出されます。次に例を示します。

    getJSON('story.json').then(function(story) {
      return getJSON(story.chapterUrls[0]);
    }).then(function(chapter1) {
      console.log("Got chapter 1!", chapter1);
    })



ここでは、`story.json` に対する非同期リクエストを行っています。これはリクエストに対する一連の URL を返します。続けて、それらのうち最初の URL をリクエストしています。これが、Promise が単純なコールバック パターンを抜け出して、真価を見せ始める時点です。

さらに、章を取得するための次のようなショートカットのメソッドを作成することもできます。

    var storyPromise;

    function getChapter(i) {
      storyPromise = storyPromise || getJSON('story.json');

      return storyPromise.then(function(story) {
        return getJSON(story.chapterUrls[i]);
      })
    }

    // and using it is simple:
    getChapter(0).then(function(chapter) {
      console.log(chapter);
      return getChapter(1);
    }).then(function(chapter) {
      console.log(chapter);
    })


`story.json` は `getChapter` が呼び出されるまでダウンロードされませんが、次に `getChapter` が呼び出されるときには storyPromise を再利用するため、`story.json` は 1 回しか取得されません。さすが、Promise！


## エラー処理

これまで見てきたとおり、`then()` は成功と失敗（Promise の用語では解決と棄却）用の 2 つの引数を取ります。

    get('story.json').then(function(response) {
      console.log("Success!", response);
    }, function(error) {
      console.log("Failed!", error);
    })


`catch()` を使用することもできます。


    get('story.json').then(function(response) {
      console.log("Success!", response);
    }).catch(function(error) {
      console.log("Failed!", error);
    })


`catch()` には特筆すべき点はなく、`then(undefined, func)` のシンタックス シュガーにすぎませんが、より読みやすくなっています。注意すべき点は、上記の 2 つのコード例の動作は同じではなく、後者は次に等しいことです。

    get('story.json').then(function(response) {
      console.log("Success!", response);
    }).then(undefined, function(error) {
      console.log("Failed!", error);
    })


些細な違いですが、非常に重要です。処理は Promise で棄却されると、棄却のコールバックを持つ次の `then()`（または、同等である `catch()`）までスキップされます。`then(func1, func2)` と指定すると、`func1` または `func2` が呼び出され、両方は呼び出されません。しかし、`then(func1).catch(func2)` と指定した場合は、`func1` が棄却された場合に両方が呼び出されます。これは、これらが連鎖している個別のステップであるためです。次を実行します。


    asyncThing1().then(function() {
      return asyncThing2();
    }).then(function() {
      return asyncThing3();
    }).catch(function(err) {
      return asyncRecovery1();
    }).then(function() {
      return asyncThing4();
    }, function(err) {
      return asyncRecovery2();
    }).catch(function(err) {
      console.log("Don't worry about it");
    }).then(function() {
      console.log("All done!");
    })



上記のフローは、通常の JavaScript の try と catch に非常によく似ており、「try」内で発生したエラーは即座に `catch()` ブロックに入ります。次に、上記のコードをフローチャートで示します（私がフローチャートが大好きだからです）。


<div style="position: relative; padding-top: 93%;">
  <iframe style="position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden" src="imgs/promise-flow.svg" frameborder="0" allowtransparency="true"></iframe>
</div>


解決される Promise については青い線を追い、棄却される Promise については赤い線を追ってください。

### JavaScript の例外と Promise
棄却は、Promise が明示的に棄却された場合に発生しますが、コンストラクタ コールバックでエラーがスローされた場合に暗黙的にも発生します。

    var jsonPromise = new Promise(function(resolve, reject) {
      // JSON.parse throws an error if you feed it some
      // invalid JSON, so this implicitly rejects:
      resolve(JSON.parse("This ain't JSON"));
    });

    jsonPromise.then(function(data) {
      // This never happens:
      console.log("It worked!", data);
    }).catch(function(err) {
      // Instead, this happens:
      console.log("It failed!", err);
    })


これは、Promise コンストラクタ コールバック内ですべての Promise 関連処理を行うと、エラーが自動的に取得され、棄却されるため、便利であることを意味します。

`then()` コールバックでスローされるエラーについても、同じことが言えます。

    get('/').then(JSON.parse).then(function() {
      // This never happens, '/' is an HTML page, not JSON
      // so JSON.parse throws
      console.log("It worked!", data);
    }).catch(function(err) {
      // Instead, this happens:
      console.log("It failed!", err);
    })



### エラー処理の実例

記事と章の例では、catch を使用してユーザーにエラーを表示できます。



    getJSON('story.json').then(function(story) {
      return getJSON(story.chapterUrls[0]);
    }).then(function(chapter1) {
      addHtmlToPage(chapter1.html);
    }).catch(function() {
      addTextToPage("Failed to show chapter");
    }).then(function() {
      document.querySelector('.spinner').style.display = 'none';
    })



`story.chapterUrls[0]` の取得に失敗した場合（http 500 やユーザーがオフラインだった場合など）、それ以降のすべての成功コールバックがスキップされます。これには、レスポンスを JSON として解析しようとする `getJSON()` 内のコールバックも含まれます。また、ページに chapter1.html を追加するコールバックもスキップされます。これらの代わりに、catch コールバックに進みます。その結果、前述のいずれかの操作が失敗すると、「Failed to show chapter」がページに追加されます。

JavaScript の try と catch と同様に、エラーが取得され、それ以降のコードが続行されるため、スピナーは常に非表示になります。これは、期待される動作です。上記のコードは、下記のコードの非ブロックの非同期バージョンになります。

    try {
      var story = getJSONSync('story.json');
      var chapter1 = getJSONSync(story.chapterUrls[0]);
      addHtmlToPage(chapter1.html);
    }
    catch (e) {
      addTextToPage("Failed to show chapter");
    }
    document.querySelector('.spinner').style.display = 'none'


エラーを回復せずに、単にログに記録するために `catch()` を使用することもできます。これを行うには、エラーを再スローするだけです。これは、`getJSON()` メソッドで実行できます。



    function getJSON(url) {
      return get(url).then(JSON.parse).catch(function(err) {
        console.log("getJSON failed for", url, err);
        throw err;
      });
    }


これで、1 つの章を取得できましたが、すべての章を取得する必要があります。これを行ってみましょう。


##  並行処理とシーケンス処理: 両方を活用する


非同期処理を理解するのは簡単ではありません。非同期処理を記述し始めるのに苦労しているのなら、同期されているかのようにコードを記述してみてください。この場合、次のようになります。

    try {
      var story = getJSONSync('story.json');
      addHtmlToPage(story.heading);

      story.chapterUrls.forEach(function(chapterUrl) {
        var chapter = getJSONSync(chapterUrl);
        addHtmlToPage(chapter.html);
      });

      addTextToPage("All done");
    }
    catch (err) {
      addTextToPage("Argh, broken: " + err.message);
    }

    document.querySelector('.spinner').style.display = 'none'

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/primers/sync-example.html){: target="_blank" .external }


これは動作します（[コード](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/getting-started/primers/sync-example.html){: target="_blank" .external }を参照）。
ただし、これは同期処理なので、ダウンロード中はブラウザが停止します。これを非同期処理にするには、`then()` を使用して、処理が 1 つずつ順に実行されるようにします。


    getJSON('story.json').then(function(story) {
      addHtmlToPage(story.heading);

      // TODO: for each url in story.chapterUrls, fetch &amp; display
    }).then(function() {
      // And we're all done!
      addTextToPage("All done");
    }).catch(function(err) {
      // Catch any error that happened along the way
      addTextToPage("Argh, broken: " + err.message);
    }).then(function() {
      // Always hide the spinner
      document.querySelector('.spinner').style.display = 'none';
    })



しかし、章の URL をループ処理して、順番に取得するにはどうすればよいでしょうか。これは**うまくいきません**。

    story.chapterUrls.forEach(function(chapterUrl) {
      // Fetch chapter
      getJSON(chapterUrl).then(function(chapter) {
        // and add it to the page
        addHtmlToPage(chapter.html);
      });
    })



`forEach` は非同期処理に対応していないため、章はダウンロードされた任意の順番で表示されます。これは『パルプ フィクション』の製作方法と基本的に同じです。これは『パルプ フィクション』ではないので、修正しましょう。


### シーケンスの作成
`chapterUrls` 配列を Promise のシーケンスに変換する必要があります。これは `then()` を使用して実現できます。

    // Start off with a promise that always resolves
    var sequence = Promise.resolve();

    // Loop through our chapter urls
    story.chapterUrls.forEach(function(chapterUrl) {
      // Add these actions to the end of the sequence
      sequence = sequence.then(function() {
        return getJSON(chapterUrl);
      }).then(function(chapter) {
        addHtmlToPage(chapter.html);
      });
    })


`Promise.resolve()` が登場するのはこれが初めてです。これは、渡された任意の値に解決される Promise を作成します。これに `Promise` のインスタンスを渡すと、そのまま返されます（**注:** これは、一部の実装ではまだ準拠されていない仕様の変更です）。これに（`then()` メソッドを持つ）Promise に似たオブジェクトを渡すと、同様に解決または棄却される本物の `Promise` が作成されます。その他の値（たとえば、`Promise.resolve('Hello')`）を渡した場合は、その値で解決される Promise が作成されます。上記のコードのように値を渡さずに呼び出した場合は、「undefined」で解決される Promise が作成されます。


渡された値（または undefined）で棄却される Promise を作成する `Promise.reject(val)` もあります。

[`array.reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) を使用して、上記のコードを整理できます。



    // Loop through our chapter urls
    story.chapterUrls.reduce(function(sequence, chapterUrl) {
      // Add these actions to the end of the sequence
      return sequence.then(function() {
        return getJSON(chapterUrl);
      }).then(function(chapter) {
        addHtmlToPage(chapter.html);
      });
    }, Promise.resolve())



これは、上記の例と同じ処理を行いますが、個別の「sequence」変数は必要ありません。この reduce コールバックは配列内の項目ごとに呼び出されます。「sequence」は最初の呼び出しでは `Promise.resolve()` ですが、残りの呼び出しでは、前の呼び出しから返される任意の値になります。`array.reduce` は配列を単一の値（この例では Promise）に集約する場合に非常に便利です。

すべてまとめると、次のようになります。

    getJSON('story.json').then(function(story) {
      addHtmlToPage(story.heading);

      return story.chapterUrls.reduce(function(sequence, chapterUrl) {
        // Once the last chapter's promise is done…
        return sequence.then(function() {
          // …fetch the next chapter
          return getJSON(chapterUrl);
        }).then(function(chapter) {
          // and add it to the page
          addHtmlToPage(chapter.html);
        });
      }, Promise.resolve());
    }).then(function() {
      // And we're all done!
      addTextToPage("All done");
    }).catch(function(err) {
      // Catch any error that happened along the way
      addTextToPage("Argh, broken: " + err.message);
    }).then(function() {
      // Always hide the spinner
      document.querySelector('.spinner').style.display = 'none';
    })

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/primers/async-example.html){: target="_blank" .external }

これで、同期バージョンが完全に非同期になりました（[コード](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/getting-started/primers/async-example.html){: target="_blank" .external }を参照）。ただし、まだ改善の余地があります。現時点で、ページは次のようにダウンロードされます。


<figure>
  <img src="imgs/promise1.gif">
</figure>

ブラウザは複数のものを一度にダウンロードするのに適しているため、章を 1 つずつダウンロードすることでパフォーマンスが損なわれています。目標は、すべての章を同時にダウンロードして、ダウンロードが完了した時点で処理することです。幸いなことに、このための API があります。


    Promise.all(arrayOfPromises).then(function(arrayOfResults) {
      //...
    })



`Promise.all` は、Promise の配列を取得して、すべてが正常に完了したら解決される Promise を作成します。結果（Promise で解決された任意の値）の配列を、Promise を渡したのと同じ順序で取得します。



    getJSON('story.json').then(function(story) {
      addHtmlToPage(story.heading);

      // Take an array of promises and wait on them all
      return Promise.all(
        // Map our array of chapter urls to
        // an array of chapter json promises
        story.chapterUrls.map(getJSON)
      );
    }).then(function(chapters) {
      // Now we have the chapters jsons in order! Loop through…
      chapters.forEach(function(chapter) {
        // …and add to the page
        addHtmlToPage(chapter.html);
      });
      addTextToPage("All done");
    }).catch(function(err) {
      // catch any error that happened so far
      addTextToPage("Argh, broken: " + err.message);
    }).then(function() {
      document.querySelector('.spinner').style.display = 'none';
    })

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/primers/async-all-example.html){: target="_blank" .external }

接続によっては、これは 1 つずつ読み込むよりも数秒速くなり（[コード](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/getting-started/primers/async-all-example.html){: target="_blank" .external }を参照）、最初に試したものよりコードが少なくなります。章は任意の順序でダウンロードされますが、画面上には正しい順序で表示されます。


<figure>
  <img src="imgs/promise2.gif">
</figure>

ただし、体感パフォーマンスはまだ向上できます。第 1 章がダウンロードされたら、これをページに追加します。こうすることで、ユーザーは残りの章がダウンロードされるより前に第 1 章を読み始めます。第 3 章がダウンロードされても、ユーザーは第 2 章がないことに気付いていない可能性があるため、ページには追加しません。第 2 章がダウンロードされたら、第 2 章と第 3 章を追加できます。これ以降の章についても同様です。

これを行うには、すべての章について同時に JSON を取得してから、それらの章をドキュメントに追加するシーケンスを作成します。

    getJSON('story.json').then(function(story) {
      addHtmlToPage(story.heading);

      // Map our array of chapter urls to
      // an array of chapter json promises.
      // This makes sure they all download parallel.
      return story.chapterUrls.map(getJSON)
        .reduce(function(sequence, chapterPromise) {
          // Use reduce to chain the promises together,
          // adding content to the page for each chapter
          return sequence.then(function() {
            // Wait for everything in the sequence so far,
            // then wait for this chapter to arrive.
            return chapterPromise;
          }).then(function(chapter) {
            addHtmlToPage(chapter.html);
          });
        }, Promise.resolve());
    }).then(function() {
      addTextToPage("All done");
    }).catch(function(err) {
      // catch any error that happened along the way
      addTextToPage("Argh, broken: " + err.message);
    }).then(function() {
      document.querySelector('.spinner').style.display = 'none';
    })

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/primers/async-best-example.html){: target="_blank" .external }

これで、両方の長所を取り入れたコードが完成しました（[コード](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/getting-started/primers/async-best-example.html){: target="_blank" .external }を参照）。これはすべてのコンテンツを配信するのと同じ時間がかかりますが、ユーザーはコンテンツの最初の部分をより早く読み始めることができます。


<figure>
  <img src="imgs/promise3.gif">
</figure>

この簡単な例では、すべての章がほぼ同時にダウンロードされましたが、章の数やボリュームが増えれば、章を一度に 1 つずつ表示することの利点もより大きくなります。


[Node.js-style コールバックまたはイベント](https://gist.github.com/jakearchibald/0e652d95c07442f205ce)を使用して上記のコードと同じことを実現しようとすると、コードの量は約 2 倍になります。さらに重大なのは、コードを追うのが難しくなることです。ただし、これが Promise のすべてではありません。その他の ES6 機能を組み合わせることで、より使いやすくなります。


##  おまけ: Promise と Generator


ここでは ES6 の新機能をまとめて紹介しますが、コードで Promise を使用するために今すぐ理解する必要はありません。今後導入される優れた機能を紹介する、映画の予告編のようなものだと考えてください。

ES6 では [Generator](http://wiki.ecmascript.org/doku.php?id=harmony:generators) も導入されます。これを使用すると、「値を返す」などの特定の時点で関数を終了し、後で同じ時点から同じ状態で関数を再開できます。次に例を示します。



    function *addGenerator() {
      var i = 0;
      while (true) {
        i += yield i;
      }
    }


関数名の前にあるスターに注目してください。これにより、関数が Generator になります。ここでは、yield キーワードが値を返し、再開する時点です。これは次のように使用できます。

    var adder = addGenerator();
    adder.next().value; // 0
    adder.next(5).value; // 5
    adder.next(5).value; // 10
    adder.next(5).value; // 15
    adder.next(50).value; // 65


ところで、これは Promise にとってはどのような意味があるでしょうか。この値を返す動作と再開の動作を使用して、同期コードのように見える（そして、同期コードと同じくらい追うのが簡単な）非同期コードを記述できます。`yield` を使用して Promise が完了するまで待機できるようにするヘルパー関数を次に示します。すべての行を理解しなくても構いません。

    function spawn(generatorFunc) {
      function continuer(verb, arg) {
        var result;
        try {
          result = generator[verb](arg);
        } catch (err) {
          return Promise.reject(err);
        }
        if (result.done) {
          return result.value;
        } else {
          return Promise.resolve(result.value).then(onFulfilled, onRejected);
        }
      }
      var generator = generatorFunc();
      var onFulfilled = continuer.bind(continuer, "next");
      var onRejected = continuer.bind(continuer, "throw");
      return onFulfilled();
    }


これはほとんど[そのまま Q から拝借](https://github.com/kriskowal/q/blob/db9220d714b16b96a05e9a037fa44ce581715e41/q.js#L500)しましたが、JavaScript の Promise 用に変更しています。これを使用して、最後に紹介した章の例に多数の ES6 の新機能を加え、次のように書き直してみましょう。

    spawn(function *() {
      try {
        // 'yield' effectively does an async wait,
        // returning the result of the promise
        let story = yield getJSON('story.json');
        addHtmlToPage(story.heading);

        // Map our array of chapter urls to
        // an array of chapter json promises.
        // This makes sure they all download parallel.
        let chapterPromises = story.chapterUrls.map(getJSON);

        for (let chapterPromise of chapterPromises) {
          // Wait for each chapter to be ready, then add it to the page
          let chapter = yield chapterPromise;
          addHtmlToPage(chapter.html);
        }

        addTextToPage("All done");
      }
      catch (err) {
        // try/catch just works, rejected promises are thrown here
        addTextToPage("Argh, broken: " + err.message);
      }
      document.querySelector('.spinner').style.display = 'none';
    })

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/primers/async-generators-example.html){: target="_blank" .external }

これは前のコードとまったく同じに機能しますが、はるかに読みやすくなりました。これは現在 Chrome と Opera で機能します（[コード](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/getting-started/primers/async-generators-example.html){: target="_blank" .external }を参照）。また、Microsoft Edge でも `about:flags` にアクセスし、[**Enable experimental JavaScript features**] 設定を有効にすることで機能するようになります。今後のバージョンでは、これは既定で有効になります。


このコードでは、Promise、Generator、let、for-of など、数多くの ES6 の新機能が使用されています。Promise を生成すると、spawn ヘルパーは Promise が解決されて最終値を返すまで待機します。Promise が棄却された場合、spawn により yield 文が例外をスローします。この例外は、通常の JavaScript の try と catch で取得できます。非同期コーディングが驚くほど単純になりました。


このパターンは非常に便利なので、[async function](https://jakearchibald.com/2014/es7-async-functions/) という形で ES7 に導入されます。これは上記のコードとほぼ同じですが、`spawn` メソッドが不要になります。


##  Promise API リファレンス{: #promise-api-reference }

特に記載のない限り、すべてのメソッドは Chrome、Opera、Firefox、Microsoft Edge、および Safari で動作します。[polyfill](https://github.com/jakearchibald/ES6-Promises#readme) により、すべてのブラウザに以下が提供されます。


### 静的メソッド

<table class="responsive methods">
<tr>
<th colspan="2">メソッドの要約</th>
</tr>
<tr>
  <td><code>Promise.resolve(promise);</code></td>
  <td>Promise を返します（ <code>promise.constructor == Promise</code> の場合のみ）</td>
</tr>
<tr>
  <td><code>Promise.resolve(thenable);</code></td>
  <td>thenable から新しい Promise を作成します。thenable は、`then()` メソッドがあれば Promise と同様です。</td>
</tr>
<tr>
  <td><code>Promise.resolve(obj);</code></td>
  <td>この状況で  <code>obj</code> を解決する Promise を作成します。</td>
</tr>
<tr>
  <td><code>Promise.reject(obj);</code></td>
  <td> <code>obj</code> を棄却する Promise を作成します。一貫性とデバッグ（たとえば、スタックトレース）のために、 <code>obj</code> は  <code>instanceof Error</code> である必要があります。</td>
</tr>
<tr>
  <td><code>Promise.all(array);</code></td>
  <td>配列内のすべての項目が解決されている場合に解決され、いずれかの項目が棄却された場合に棄却される Promise を作成します。配列の各項目は  <code>Promise.resolve</code> に渡されるため、配列には Promise のようなオブジェクトとその他のオブジェクトの両方を格納できます。解決された場合の値は、解決された値の配列（解決された順）です。棄却された場合の値は、最初に棄却された値です。</td>
</tr>
<tr>
  <td><code>Promise.race(array);</code></td>
  <td>いずれかの項目が解決された時点ですぐに解決されるか、いずれかの項目が棄却された時点ですぐに棄却されるか、いずれか先に発生した方が行われる Promise を作成します。</td>
</tr>
</table>

注: `Promise.race` の有用性については納得していません。私なら、すべての項目が棄却された場合にのみ棄却される、`Promise.all` の逆のメソッドを作成するでしょう。

### コンストラクタ

<table class="responsive constructors">
<tr>
<th colspan="2">constructor</th>
</tr>
<tr>
  <td><code>new Promise(function(resolve, reject) {});</code></td>
  <td>
    <p>
      <code>resolve(thenable)</code><br>
      Promise は  <code>thenable</code> の結果に基づいて解決されるか、棄却されます。
    </p>

    <p>
      <code>resolve(obj)</code><br>
      Promise は  <code>obj</code> で解決されます。
    </p>

    <p>
      <code>reject(obj)</code><br>
      Promise は  <code>obj</code> で棄却されます。一貫性とデバッグ（たとえば、スタックトレース）のために、obj は  <code>instanceof Error</code> である必要があります。

      コンストラクタ コールバックでスローされたすべてのエラーは、 <code>reject()</code> に暗黙的に渡されます。
</p>

  </td>
</tr>
</table>
    
### インスタンス メソッド

<table class="responsive methods">
<tr>
<th colspan="2">インスタンス メソッド</th>
</tr>
<tr>
  <td><code>promise.then(onFulfilled, onRejected)</code></td>
  <td>
    <code>onFulfilled</code> は、「Promise」が成功すると呼び出されます。
    <code>onRejected</code> は「Promise」が失敗すると呼び出されます。いずれも省略可能です。一方または両方が省略された場合、連鎖の次の  <code>onFulfilled</code> または <code>onRejected</code> が呼び出されます。


    いずれのコールバックも、解決された値または棄却された理由である単一のパラメータを取ります。 <code>then()</code> は、新しい Promise を返します。これは、 <code>onFulfilled</code> または <code>onRejected</code> から返された値を


     <code>Promise.resolve</code> に渡して生成された値と等価です。コールバックでエラーがスローされた場合、返された Promise はそのエラーで棄却されます。
  </td>

</tr>
<tr>
  <td><code>promise.catch(onRejected)</code></td>
  <td> <code>promise.then(undefined, onRejected)</code> のシンタックス シュガー</td>
</tr>
</table>



この記事を校閲して修正し、助言をくれた Anne van Kesteren、Domenic Denicola、Tom Ashworth、Remy Sharp、Addy Osmani、Arthur Evans、Yutaka Hirano に感謝します。

また、[Mathias Bynens](https://mathiasbynens.be/){: .external } にも、この記事の[隅々まで修正](https://github.com/html5rocks/www.html5rocks.com/pull/921/files)してくれたことのお礼を述べます。


{# wf_devsite_translation #}
