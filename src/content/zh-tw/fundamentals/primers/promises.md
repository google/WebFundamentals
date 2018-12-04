project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:"Promise 可簡化延遲和異步計算。Promise 代表一個尚未完成的操作。"

{# wf_published_on:2013-12-16 #}
{# wf_updated_on:2014-01-29 #}

# JavaScript Promise：簡介 {: .page-title }

{% include "web/_shared/contributors/jakearchibald.html" %}

女士們，先生們，請做好準備，迎接網頁開發史上的關鍵時刻。


<em>[鼓點響起]</em>

Promise 已獲得 JavaScript 的原生支持！

<em>[煙花綻放、彩紙飄飄、人羣沸騰]</em>

此刻，您可能屬於以下其中某一類：

* 人羣在您身邊歡呼雀躍，但是您感到莫名其妙。可能您甚至連“promise”是什麼都不知道。因此您聳聳肩，但是從天而降的彩紙雖輕如鴻毛卻讓您無法釋懷。如果真是這樣，您也無需擔心，我可花了很長的時間才弄明白爲什麼我應該關注它。您可能想從[開始](#whats-all-the-fuss-about)處開始。
* 您非常抓狂！覺得晚了一步，對嗎？您可能之前使用過這些 Promise，但讓您困擾的是，不同版本的 API 各有差異。JavaScript 官方版本的 API 是什麼？您可能想要從[術語](#promise-terminology)開始。
* 您已知道這些，您會覺得那些上竄下跳的人很好笑，居然把它當作新聞。您可以先自豪一把，然後直接查看 [API 參考](#promise-api-reference)

##  人們究竟爲何歡呼雀躍？ {: #whats-all-the-fuss-about }

JavaScript 是單線程工作，這意味着兩段腳本不能同時運行，而是必須一個接一個地運行。在瀏覽器中，JavaScript 與因瀏覽器而異的其他 N 種任務共享一個線程。但是通常情況下 JavaScript 與繪製、更新樣式和處理用戶操作（例如，高亮顯示文本以及與格式控件交互）處於同一隊列。操作其中一項任務會延遲其他任務。

我們人類是多線程工作。您可以使用多個手指打字，可以一邊開車一邊與人交談。唯一一個會妨礙我們的是打噴嚏，因爲當我們打噴嚏的時候，所有當前進行的活動都必須暫停。這真是非常討厭，尤其是當您在開車並想與人交談時。您可不想編寫像打噴嚏似的代碼。

您可能已使用事件和回調來解決該問題。以下是一些事件：

    var img1 = document.querySelector('.img-1');

    img1.addEventListener('load', function() {
      // woo yey image loaded
    });

    img1.addEventListener('error', function() {
      // argh everything's broken
    });


這可不會像打噴嚏那樣打斷您。我們獲得圖片、添加幾個偵聽器，之後 JavaScript 可停止執行，直至其中一個偵聽器被調用。

遺憾的是，在上例中，事件有可能在我們開始偵聽之前就發生了，因此我們需要使用圖像的“complete”屬性來解決該問題：

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

這不會捕獲出錯的圖像，因爲在此之前我們沒有機會偵聽到錯誤。遺憾的是，DOM 也沒有給出解決之道。而且，這還只是加載一個圖像，如果加載一組圖像，情況會更復雜。


##  事件並不總是最佳方法

事件對於同一對象上發生多次的事情（如 keyup、touchstart 等）非常有用。對於這些事件，實際您並不關注在添加偵聽器之前所發生的事情。但是，如果關係到異步成功/失敗，理想的情況是您希望：

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

這是 promise 所執行的任務，但以更好的方式命名。如果 HTML 圖像元素有一個返回 promise 的“ready”方法，我們可以執行：

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


最基本的情況是，promise 有點類似於事件偵聽器，但有以下兩點區別：

* promise 只能成功或失敗一次，而不能成功或失敗兩次，也不能從成功轉爲失敗或從失敗轉爲成功。
* 如果 promise 已成功或失敗，且您之後添加了成功/失敗回調，則將會調用正確的回調，即使事件發生在先。

這對於異步成功/失敗尤爲有用，因爲您可能對某些功能可用的準確時間不是那麼關注，更多地是關注對結果作出的反應。


##  Promise 術語 {: #promise-terminology }

[Domenic Denicola](https://twitter.com/domenic) 校對了本篇文章的初稿，並在術語方面給我打分爲“F”。他把我留下來，強迫我抄寫[狀態和結果](https://github.com/domenic/promises-unwrapping/blob/master/docs/states-and-fates.md) 100 遍，並給我的父母寫了封告狀信。儘管如此，我還是對很多術語混淆不清，以下是幾個基本的概念：

promise 可以是：

* **已執行** - 與 promise 有關的操作成功
* **已拒絕** - 與 promise 有關的操作失敗
* **待定** - 尚未執行或拒絕
* **已解決** - 已執行或拒絕


[本規範](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-promise-objects)還使用術語 **thenable** 來描述類似於 promise 的對象，並使用 `then` 方法。該術語讓我想起前英格蘭國家隊教練 [Terry Venables](https://en.wikipedia.org/wiki/Terry_Venables)，因此我將盡可能不用這個術語。


##  Promise 在 JavaScript 中受支持！

Promise 有一段時間以庫的形式出現，例如：

* [Q](https://github.com/kriskowal/q)
* [when](https://github.com/cujojs/when)
* [WinJS](https://msdn.microsoft.com/en-us/library/windows/apps/br211867.aspx)
* [RSVP.js](https://github.com/tildeio/rsvp.js)

以上這些與 JavaScript promise 都有一個名爲 [Promise/A+](https://github.com/promises-aplus/promises-spec) 的常見標準化行爲。如果您是 jQuery 用戶，他們還有一個類似於名爲 [Deferred](https://api.jquery.com/category/deferred-object/) 的行爲。但是，Deferred 與 Promise/A+ 不兼容，這就使得它們[存在細微差異且沒那麼有用](https://thewayofcode.wordpress.com/tag/jquery-deferred-broken/)，因此需注意。此外，jQuery 還有 [Promise 類型](https://api.jquery.com/Types/#Promise)，但它只是 Deferred 的子集，因此仍存在相同的問題。

儘管 promise 實現遵照標準化行爲，但其整體 API 有所不同。JavaScript promise 在 API 中類似於 RSVP.js。下面是創建 promise 的步驟：

    var promise = new Promise(function(resolve, reject) {
      // do a thing, possibly async, then…

      if (/* everything turned out fine */) {
        resolve("Stuff worked!");
      }
      else {
        reject(Error("It broke"));
      }
    });


Promise 構造函數包含一個參數和一個帶有 resolve（解析）和 reject（拒絕）兩個參數的回調。在回調中執行一些操作（例如異步），如果一切都正常，則調用 resolve，否則調用 reject。

與普通舊版 JavaScript 中的 `throw` 一樣，通常拒絕時會給出 Error 對象，但這不是必須的。Error 對象的優點在於它們能夠捕捉堆疊追蹤，因而使得調試工具非常有用。

以下是有關 promise 的使用示例：

    promise.then(function(result) {
      console.log(result); // "Stuff worked!"
    }, function(err) {
      console.log(err); // Error: "It broke"
    });


`then()` 包含兩個參數：一個用於成功情形的回調和一個用於失敗情形的回調。這兩個都是可選的，因此您可以只添加一個用於成功情形或失敗情形的回調。

JavaScript promise 最初是在 DOM 中出現並稱爲“Futures”，之後重命名爲“Promises”，最後又移入 JavaScript。在 JavaScript 中使用比在 DOM 中更好，因爲它們將在如 Node.js 等非瀏覽器 JS 環境中可用（而它們是否會在覈心 API 中使用 Promise 則是另外一個問題）。

儘管它們是 JavaScript 的一項功能，但 DOM 也能使用。實際上，採用異步成功/失敗方法的所有新 DOM API 均使用 promise。[Quota Management](https://dvcs.w3.org/hg/quota/raw-file/tip/Overview.html#idl-def-StorageQuota)、[Font Load Events](http://dev.w3.org/csswg/css-font-loading/#font-face-set-ready)、[ServiceWorker](https://github.com/slightlyoff/ServiceWorker/blob/cf459d473ae09f6994e8539113d277cbd2bce939/service_worker.ts#L17)、[Web MIDI](https://webaudio.github.io/web-midi-api/#widl-Navigator-requestMIDIAccess-Promise-MIDIOptions-options)[Streams](https://github.com/whatwg/streams#basereadablestream) 等等都已經在使用 promise。


##  瀏覽器支持和 polyfill

現在，promise 已在各瀏覽器中實現。

在 Chrome 32、Opera 19、Firefox 29、Safari 8 和 Microsoft Edge 中，promise 默認啓用。

如要使沒有完全實現 promise 的瀏覽器符合規範，或向其他瀏覽器和 Node.js 中添加 promise，請查看 [polyfill](https://github.com/jakearchibald/ES6-Promises#readme)（gzip 壓縮大小爲 2k）。


##  與其他庫的兼容性

JavaScript promise API 將任何使用 `then()` 方法的結構都當作 promise 一樣（或按 promise 的說法爲 `thenable`）來處理，因此，如果您使用返回 Q promise 的庫也沒問題，因爲它能與新 JavaScript promise 很好地兼容。

如我之前所提到的，jQuery 的 Deferred 不那麼有用。幸運的是，您可以將其轉爲標準 promise，這值得儘快去做：


    var jsPromise = Promise.resolve($.ajax('/whatever.json'))


這裏，jQuery 的 `$.ajax` 返回了一個 Deferred。由於它使用 `then()` 方法，因此 `Promise.resolve()` 可將其轉爲 JavaScript promise。但是，有時 deferred 會將多個參數傳遞給其回調，例如：

    var jqDeferred = $.ajax('/whatever.json');

    jqDeferred.then(function(response, statusText, xhrObj) {
      // ...
    }, function(xhrObj, textStatus, err) {
      // ...
    })



而 JS promise 會忽略除第一個之外的所有參數：


    jsPromise.then(function(response) {
      // ...
    }, function(xhrObj) {
      // ...
    })



幸好，通常這就是您想要的，或者至少爲您提供了方法讓您獲得所想要的。另請注意，jQuery 不遵循將 Error 對象傳遞到 reject 這一慣例。


##  複雜異步代碼讓一切變得更簡單

對了，讓我們寫一些代碼。比如說，我們想要：

1. 啓動一個轉環來提示加載
1. 獲取一個故事的 JSON，確定每個章節的標題和網址
1. 向頁面中添加標題
1. 獲取每個章節
1. 向頁面中添加故事
1. 停止轉環

…但如果此過程發生錯誤，也要向用戶顯示。我們也想在那一點停止轉環，否則，它將不停地旋轉、眩暈並撞上其他 UI 控件。

當然，您不會使用 JavaScript 來提供故事，[以 HTML 形式提供會更快](https://jakearchibald.com/2013/progressive-enhancement-is-faster/)，但是這種方式在處理 API 時很常見：多次提取數據，然後在全部完成後執行其他操作。

首先，讓我們從網絡中獲取數據：

##  對 XMLHttpRequest 執行 promise

舊 API 將更新爲使用 promise，如有可能，採用後向兼容的方式。`XMLHttpRequest` 是主要候選對象，不過，我們可編寫一個作出 GET 請求的簡單函數：



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


現在讓我們來使用這一功能：

    get('story.json').then(function(response) {
      console.log("Success!", response);
    }, function(error) {
      console.error("Failed!", error);
    })


[點擊此處瞭解實際操作](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/getting-started/primers/story.json){: target="_blank" .external }，檢查 DevTools 中的控制檯以查看結果。現在我們無需手動鍵入 `XMLHttpRequest` 即可作出 HTTP 請求，這真是太讚了，因爲越少看到令人討厭的書寫得參差不齊的 `XMLHttpRequest`，我就越開心。


##  鏈接

`then()` 不是最終部分，您可以將各個 `then` 鏈接在一起來改變值，或依次運行額外的異步操作。


###  改變值
只需返回新值即可改變值：

    var promise = new Promise(function(resolve, reject) {
      resolve(1);
    });

    promise.then(function(val) {
      console.log(val); // 1
      return val + 2;
    }).then(function(val) {
      console.log(val); // 3
    })


舉一個實際的例子，讓我們回到：

    get('story.json').then(function(response) {
      console.log("Success!", response);
    })



這裏的 response 是 JSON，但是我們當前收到的是其純文本。我們可以將 get 函數修改爲使用 JSON [`responseType`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#responseType)，不過我們也可以使用 promise 來解決這個問題：

    get('story.json').then(function(response) {
      return JSON.parse(response);
    }).then(function(response) {
      console.log("Yey JSON!", response);
    })



由於 `JSON.parse()` 採用單一參數並返回改變的值，因此我們可以將其簡化爲：

    get('story.json').then(JSON.parse).then(function(response) {
      console.log("Yey JSON!", response);
    })


[瞭解實際操作](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/getting-started/primers/story.json){: target="_blank" .external }，檢查 DevTools 中的控制檯以查看結果。實際上，我們可以讓 `getJSON()` 函數更簡單：


    function getJSON(url) {
      return get(url).then(JSON.parse);
    }

`getJSON()` 仍返回一個 promise，該 promise 獲取 URL 後將 response 解析爲 JSON。


###  異步操作隊列

您還可以鏈接多個 `then`，以便按順序運行異步操作。

當您從 `then()` 回調中返回某些內容時，這有點兒神奇。如果返回一個值，則會以該值調用下一個 `then()`。但是，如果您返回類似於 promise 的內容，下一個 `then()` 則會等待，並僅在 promise 產生結果（成功/失敗）時調用。例如：

    getJSON('story.json').then(function(story) {
      return getJSON(story.chapterUrls[0]);
    }).then(function(chapter1) {
      console.log("Got chapter 1!", chapter1);
    })



這裏我們向 `story.json` 發出異步請求，這可讓我們請求一組網址，隨後我們請求其中的第一個。這是 promise 從簡單回調模式中脫穎而出的真正原因所在。

您甚至可以採用更簡短的方法來獲得章節內容：

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


直到 `getChapter` 被調用，我們才下載 `story.json`，但是下次 `getChapter` 被調用時，我們重複使用 story romise，因此 `story.json` 僅獲取一次。耶，Promise！


##  錯誤處理

正如我們之前所看到的，`then()` 包含兩個參數：一個用於成功，一個用於失敗（按照 promise 中的說法，即執行和拒絕）：

    get('story.json').then(function(response) {
      console.log("Success!", response);
    }, function(error) {
      console.log("Failed!", error);
    })


您還可以使用 `catch()`：


    get('story.json').then(function(response) {
      console.log("Success!", response);
    }).catch(function(error) {
      console.log("Failed!", error);
    })


`catch()` 沒有任何特殊之處，它只是 `then(undefined, func)` 的錦上添花，但可讀性更強。注意，以上兩個代碼示例行爲並不相同，後者相當於：

    get('story.json').then(function(response) {
      console.log("Success!", response);
    }).then(undefined, function(error) {
      console.log("Failed!", error);
    })


兩者之間的差異雖然很微小，但非常有用。Promise 拒絕後，將跳至帶有拒絕回調的下一個 `then()`（或具有相同功能的 `catch()`）。如果是 `then(func1, func2)`，則 `func1` 或 `func2` 中的一個將被調用，而不會二者均被調用。但如果是 `then(func1).catch(func2)`，則在 `func1` 拒絕時兩者均被調用，因爲它們在該鏈中是單獨的步驟。看看下面的代碼：


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



以上流程與常規的 JavaScript try/catch 非常類似，在“try”中發生的錯誤直接進入 `catch()` 塊。以下是上述代碼的流程圖形式（因爲我喜歡流程圖）：


<div style="position: relative; padding-top: 93%;">
  <iframe style="position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden" src="imgs/promise-flow.svg" frameborder="0" allowtransparency="true"></iframe>
</div>


藍線表示執行的 promise 路徑，紅路表示拒絕的 promise 路徑。

###  JavaScript 異常和 promise
當 promise 被明確拒絕時，會發生拒絕；但是如果是在構造函數回調中引發的錯誤，則會隱式拒絕。

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


這意味着，在 promise 構造函數回調內部執行所有與 promise 相關的任務很有用，因爲錯誤會自動捕獲並進而拒絕。

對於在 `then()` 回調中引發的錯誤也是如此。

    get('/').then(JSON.parse).then(function() {
      // This never happens, '/' is an HTML page, not JSON
      // so JSON.parse throws
      console.log("It worked!", data);
    }).catch(function(err) {
      // Instead, this happens:
      console.log("It failed!", err);
    })



###  錯誤處理實踐

在我們的故事和章節中，我們可使用 catch 來向用戶顯示錯誤：



    getJSON('story.json').then(function(story) {
      return getJSON(story.chapterUrls[0]);
    }).then(function(chapter1) {
      addHtmlToPage(chapter1.html);
    }).catch(function() {
      addTextToPage("Failed to show chapter");
    }).then(function() {
      document.querySelector('.spinner').style.display = 'none';
    })



如果獲取 `story.chapterUrls[0]` 失敗（例如，http 500 或用戶離線），它將跳過所有後續成功回調，包括 `getJSON()` 中嘗試將響應解析爲 JSON 的回調，而且跳過將 chapter1.html 添加到頁面的回調。然後，它將移至 catch 回調。因此，如果任一前述操作失敗，“Failed to show chapter”將會添加到頁面。

與 JavaScript 的 try/catch 一樣，錯誤被捕獲而後續代碼繼續執行，因此，轉環總是被隱藏，這正是我們想要的。以上是下面一組代碼的攔截異步版本：

    try {
      var story = getJSONSync('story.json');
      var chapter1 = getJSONSync(story.chapterUrls[0]);
      addHtmlToPage(chapter1.html);
    }
    catch (e) {
      addTextToPage("Failed to show chapter");
    }
    document.querySelector('.spinner').style.display = 'none'


您可能想出於記錄目的而 `catch()`，而無需從錯誤中恢復。爲此，只需再次拋出錯誤。我們可以使用 `getJSON()` 方法執行此操作：



    function getJSON(url) {
      return get(url).then(JSON.parse).catch(function(err) {
        console.log("getJSON failed for", url, err);
        throw err;
      });
    }


至此，我們已獲取其中一個章節，但我們想要所有的章節。讓我們嘗試來實現。


##  並行式和順序式：兩者兼得


異步並不容易。如果您覺得難以着手，可嘗試按照同步的方式編寫代碼。在本例中：

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

[試一下](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/primers/sync-example.html){: target="_blank" .external }


這樣可行（查看[代碼](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/getting-started/primers/sync-example.html){: target="_blank" .external }）！
但這是同步的情況，而且在內容下載時瀏覽器會被鎖定。要使其異步，我們使用 `then()` 來依次執行任務。


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



但是我們如何遍歷章節的 URL 並按順序獲取呢？以下方法**行不通**：

    story.chapterUrls.forEach(function(chapterUrl) {
      // Fetch chapter
      getJSON(chapterUrl).then(function(chapter) {
        // and add it to the page
        addHtmlToPage(chapter.html);
      });
    })



`forEach` 不是異步的，因此我們的章節內容將按照下載的順序顯示，這就亂套了。我們這裏不是非線性敘事小說，因此得解決該問題。


###  創建序列
我們想要將 `chapterUrls` 數組轉變爲 promise 序列，這可通過 `then()` 來實現：

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


這是我們第一次看到 `Promise.resolve()`，這種 promise 可解析爲您賦予的任何值。如果向其傳遞一個 `Promise` 實例，它也會將其返回（**Note: **這是對本規範的一處更改，某些實現尚未遵循）。如果將類似於 promise 的內容（帶有 `then()` 方法）傳遞給它，它將創建以相同方式執行/拒絕的真正 `Promise`。如果向其傳遞任何其他值，例如 `Promise.resolve('Hello')`，它在執行時將以該值創建一個 promise。如果調用時不帶任何值（如上所示），它在執行時將返回“undefined”。


此外還有 `Promise.reject(val)`，它創建的 promise 在拒絕時將返回賦予的值（或“undefined”）。

我們可以使用 [`array.reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) 將上述代碼整理如下：



    // Loop through our chapter urls
    story.chapterUrls.reduce(function(sequence, chapterUrl) {
      // Add these actions to the end of the sequence
      return sequence.then(function() {
        return getJSON(chapterUrl);
      }).then(function(chapter) {
        addHtmlToPage(chapter.html);
      });
    }, Promise.resolve())



這與之前示例的做法相同，但是不需要獨立的“sequence”變量。我們的 reduce 回調針對數組中的每項內容進行調用。首次調用時，“sequence”爲 `Promise.resolve()`，但是對於餘下的調用，“sequence”爲我們從之前調用中返回的值。`array.reduce` 確實非常有用，它將數組濃縮爲一個簡單的值（在本例中，該值爲 promise）。

讓我們彙總起來：

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

[試一下](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/primers/async-example.html){: target="_blank" .external }

這裏我們已實現它（查看[代碼](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/getting-started/primers/async-example.html){: target="_blank" .external }），即同步版本的完全異步版本。但是我們可以做得更好。此時，我們的頁面正在下載，如下所示：


<figure>
  <img src="imgs/promise1.gif">
</figure>

瀏覽器的一個優勢在於可以一次下載多個內容，因此我們一章章地下載就失去了其優勢。我們希望同時下載所有章節，然後在所有下載完畢後進行處理。幸運的是，API 可幫助我們實現：


    Promise.all(arrayOfPromises).then(function(arrayOfResults) {
      //...
    })



`Promise.all` 包含一組 promise，並創建一個在所有內容成功完成後執行的 promise。您將獲得一組結果（即一組 promise 執行的結果），其順序與您與傳入 promise 的順序相同。



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

[試一下](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/primers/async-all-example.html){: target="_blank" .external }

根據連接情況，這可能比一個個依次加載要快幾秒鐘（查看[代碼](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/getting-started/primers/async-all-example.html){: target="_blank" .external }），而且代碼也比我們第一次嘗試的要少。章節將按任意順序下載，但在屏幕中以正確順序顯示。


<figure>
  <img src="imgs/promise2.gif">
</figure>

不過，我們仍可以提升用戶體驗。第一章下載完後，我們可將其添加到頁面。這可讓用戶在其他章節下載完畢前先開始閱讀。第三章下載完後，我們不將其添加到頁面，因爲還缺少第二章。第二章下載完後，我們可添加第二章和第三章，後面章節也是如此添加。

爲此，我們使用 JSON 來同時獲取所有章節，然後創建一個向文檔中添加章節的順序：

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

[試一下](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/primers/async-best-example.html){: target="_blank" .external }

我們做到了（查看[代碼](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/getting-started/primers/async-best-example.html){: target="_blank" .external }），兩全其美！下載所有內容所花費的時間相同，但是用戶可先閱讀前面的內容。


<figure>
  <img src="imgs/promise3.gif">
</figure>

在這個小示例中，所有章節幾乎同時下載完畢，但是如果一本書有更多、更長的章節，一次顯示一個章節的優勢便會更明顯。


使用 [Node.js-style 回調或事件](https://gist.github.com/jakearchibald/0e652d95c07442f205ce)來執行以上示例需兩倍代碼，更重要的是，沒那麼容易實施。然而，promise 功能還不止如此，與其他 ES6 功能組合使用時，它們甚至更容易。


##  友情贈送：promise 和 generator


以下內容涉及一整套 ES6 新增功能，但您目前在使用 promise 編碼時無需掌握它們。可將其視爲即將上映的好萊塢大片電影預告。

ES6 還爲我們提供了 [generator](http://wiki.ecmascript.org/doku.php?id=harmony:generators)，它可讓某些功能在某個位置退出（類似於“return”），但之後能以相同位置和狀態恢復，例如：



    function *addGenerator() {
      var i = 0;
      while (true) {
        i += yield i;
      }
    }


注意函數名稱前面的星號，這表示 generator。yield 關鍵字是我們的返回/恢復位置。我們可按下述方式使用：

    var adder = addGenerator();
    adder.next().value; // 0
    adder.next(5).value; // 5
    adder.next(5).value; // 10
    adder.next(5).value; // 15
    adder.next(50).value; // 65


但是這對於 promise 而言意味着什麼呢？您可以使用返回/恢復行爲來編寫異步代碼，這些代碼看起來像同步代碼，而且實施起來也與同步代碼一樣簡單。對各行代碼的理解無需過多擔心，藉助於幫助程序函數，我們可使用 `yield` 來等待 promise 得到解決：

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


…在上述示例中我幾乎是[從 Q 中逐字般過來](https://github.com/kriskowal/q/blob/db9220d714b16b96a05e9a037fa44ce581715e41/q.js#L500)，並針對 JavaScript promise 進行了改寫。因此，我們可以採用顯示章節的最後一個最佳示例，結合新 ES6 的優勢，將其轉變爲：

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

[試一下](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/primers/async-generators-example.html){: target="_blank" .external }

這跟之前的效用完全相同，但讀起來容易多了。Chrome 和 Opera 當前支持該功能（查看[代碼](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/getting-started/primers/async-generators-example.html){: target="_blank" .external }），而且 Microsoft Edge 中也可使用該功能（需要在 `about:flags` 中打開 **Enable experimental JavaScript features** 設置）。在即將發佈的版本中，該功能默認啓用。


它將納入很多新的 ES6 元素：promise、generator、let、for-of。我們生成一個 promise 後，spawn 幫助程序將等待該 promise 來解析並返回一個終值。如果 promise 拒絕，spawn 會讓 yield 語句拋出異常，我們可通過常規的 JavaScript try/catch 來捕獲此異常。異步編碼竟如此簡單！


此模式非常有用，在 ES7 中它將以[異步功能](https://jakearchibald.com/2014/es7-async-functions/)的形式提供。它幾乎與上述編碼示例相同，但無需使用 `spawn` 方法。


##  Promise API 參考 {: #promise-api-reference }

所有方法在 Chrome、Opera、Firefox、Microsoft Edge 和 Safari 中均可使用，除非另有說明。[polyfill](https://github.com/jakearchibald/ES6-Promises#readme) 爲所有瀏覽器提供以下方法。


###  靜態方法

<table class="responsive methods">
<tr>
<th colspan="2">方法彙總</th>
</tr>
<tr>
  <td><code>Promise.resolve(promise);</code></td>
  <td> 返回 promise（僅當  <code>promise.function Object() { [native code] } == Promise</code> 時）</td>
</tr>
<tr>
  <td><code>Promise.resolve(thenable);</code></td>
  <td> 從 thenable 中生成一個新 promise。thenable 是具有 `then()` 方法的類似於 promise 的對象。</td>
</tr>
<tr>
  <td><code>Promise.resolve(obj);</code></td>
  <td> 在此情況下，生成一個 promise 並在執行時返回  <code>obj</code>。</td>
</tr>
<tr>
  <td><code>Promise.reject(obj);</code></td>
  <td> 生成一個 promise 並在拒絕時返回  <code>obj</code>。爲保持一致和調試之目的（例如堆疊追蹤）， <code>obj</code> 應爲  <code>instanceof Error</code>。</td>
</tr>
<tr>
  <td><code>Promise.all(array);</code></td>
  <td> 生成一個 promise，該 promise 在數組中各項執行時執行，在任意一項拒絕時拒絕。每個數組項均傳遞給  <code>Promise.resolve</code>，因此數組可能混合了類似於 promise 的對象和其他對象。執行值是一組有序的執行值。拒絕值是第一個拒絕值。</td>
</tr>
<tr>
  <td><code>Promise.race(array);</code></td>
  <td> 生成一個 Promise，該 Promise 在任意項執行時執行，或在任意項拒絕時拒絕，以最先發生的爲準。</td>
</tr>
</table>

Note: 我對 `Promise.race` 的實用性表示懷疑；我更傾向於使用與之相對的 `Promise.all`，它僅在所有項拒絕時才拒絕。

###  構造函數

<table class="responsive function Object() { [native code] }s">
<tr>
<th colspan="2"> 構造函數</th>
</tr>
<tr>
  <td><code>new Promise(function(resolve, reject) {});</code></td>
  <td>
    <p>
      <code>resolve(thenable)</code><br>
      Promise 依據  <code>thenable</code> 的結果而執行/拒絕。
    </p>

    <p>
      <code>resolve(obj)</code><br>
      Promise 執行並返回  <code>obj</code>
    </p>

    <p>
      <code>reject(obj)</code><br>
      Promise 拒絕並返回  <code>obj</code>。爲保持一致和調試（例如堆疊追蹤），obj 應爲  <code>instanceof Error</code>。

      在構造函數回調中引發的任何錯誤將隱式傳遞給  <code>reject()</code>。
</p>

  </td>
</tr>
</table>

###  實例方法

<table class="responsive methods">
<tr>
<th colspan="2"> 實例方法</th>
</tr>
<tr>
  <td><code>promise.then(onFulfilled, onRejected)</code></td>
  <td>
    當/如果“promise”解析，則調用 <code>onFulfilled</code>。當/如果“promise”拒絕，則調用  <code>onRejected</code>。
兩者均可選，如果任意一個或兩者都被忽略，則調用鏈中的下一個  <code>onFulfilled</code>/<code>onRejected</code>。


    兩個回調都只有一個參數：執行值或拒絕原因。 <code>then()</code> 將返回一個新 promise，它相當於從  <code>onFulfilled</code>/<code>onRejected</code> 中返回、
    通過  <code>Promise.resolve</code> 傳遞的值。如果在回調中引發了錯誤，返回的 promise 將拒絕並返回該錯誤。
</td>

</tr>
<tr>
  <td><code>promise.catch(onRejected)</code></td>
  <td> 對  <code>promise.then(undefined, onRejected)</code></td> 的錦上添花
</tr>
</table>



Anne van Kesteren、Domenic Denicola、Tom Ashworth、Remy Sharp、Addy Osmani、Arthur Evans 和 Yutaka Hirano 對本篇文章進行了校對，提出了建議並作出了修正，特此感謝！

此外，[Mathias Bynens](https://mathiasbynens.be/){: .external } 負責本篇文章的[更新部分](https://github.com/html5rocks/www.html5rocks.com/pull/921/files)，特此致謝。


{# wf_devsite_translation #}
