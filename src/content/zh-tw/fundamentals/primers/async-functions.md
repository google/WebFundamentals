project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:異步函數用於像編寫同步代碼那樣編寫基於 Promise 的代碼

{# wf_published_on: 2016-10-20 #}
{# wf_updated_on: 2016-10-20 #}

# 異步函數 - 提高 Promise 的易用性 {: .page-title }

{% include "web/_shared/contributors/jakearchibald.html" %}

Chrome 55 中默認情況下啓用異步函數，坦率地講，它們的作用相當不可思議。
可以利用它們像編寫同步代碼那樣編寫基於 Promise 的代碼，而且還不會阻塞主線程。
它們可以讓異步代碼“智商”下降、可讀性提高。


異步函數的工作方式是這樣的：

    async function myFirstAsyncFunction() {
      try {
        const fulfilledValue = await promise;
      }
      catch (rejectedValue) {
        // …
      }
    }

如果在函數定義之前使用了 `async` 關鍵字，就可以在函數內使用 `await`。
當您 `await` 某個 Promise 時，函數暫停執行，直至該 Promise 產生結果，並且暫停並不會阻塞主線程。
如果 Promise 執行，則會返回值。
如果 Promise 拒絕，則會拋出拒絕的值。

注：如果不熟悉 Promise，可以看一看[我們的 Promise 指南](/web/fundamentals/getting-started/primers/promises)。


## 示例：記錄獲取日誌

假設我們想獲取某個網址並以文本形式記錄響應日誌。以下是利用 Promise 編寫的代碼：


    function logFetch(url) {
      return fetch(url)
        .then(response => response.text())
        .then(text => {
          console.log(text);
        }).catch(err => {
          console.error('fetch failed', err);
        });
    }

以下是利用異步函數具有相同作用的代碼：

    async function logFetch(url) {
      try {
        const response = await fetch(url);
        console.log(await response.text());
      }
      catch (err) {
        console.log('fetch failed', err);
      }
    }

代碼行數雖然相同，但去掉了所有回調。這可以提高代碼的可讀性，對不太熟悉 Promise 的人而言，幫助就更大了。


注：您 `await` 的任何內容都通過 `Promise.resolve()` 傳遞，這樣您就可以安全地 `await` 非原生 Promise。


## 異步函數返回值

無論是否使用 `await`，異步函數*都會*返回 Promise。該 Promise 解析時返回異步函數返回的任何值，拒絕時返回異步函數拋出的任何值。

因此，對於：

    // wait ms milliseconds
    function wait(ms) {
      return new Promise(r => setTimeout(r, ms));
    }

    async function hello() {
      await wait(500);
      return 'world';
    }

…調用 `hello()` 返回的 Promise 會在*執行*時返回 `"world"`。

    async function foo() {
      await wait(500);
      throw Error('bar');
    }

…調用 `foo()` 返回的 Promise 會在*拒絕*時返回 `Error('bar')`。

## 示例：流式傳輸響應

異步函數在更復雜示例中更有用武之地。假設我們想在流式傳輸響應的同時記錄數據塊日誌，並返回數據塊最終大小。


注：一看到“記錄數據塊日誌”這幾個字就讓我感到不舒服。

以下是使用 Promise 編寫的代碼：

    function getResponseSize(url) {
      return fetch(url).then(response => {
        const reader = response.body.getReader();
        let total = 0;

        return reader.read().then(function processResult(result) {
          if (result.done) return total;

          const value = result.value;
          total += value.length;
          console.log('Received chunk', value);

          return reader.read().then(processResult);
        })
      });
    }

請“Promise 大師”Jake Archibald 給我檢查一下。看到我是如何在 `processResult` 內調用其自身來建立異步循環了吧？
這樣編寫的代碼讓我覺得*很智能*。
但就像大多數“智能”代碼那樣，你得盯着它看上半天才能弄明白它的作用，要拿出揣摩上世紀 90 年代流行的魔眼圖片的那種勁頭才行。



我們再用異步函數來編寫上面這段代碼：

    async function getResponseSize(url) {
      const response = await fetch(url);
      const reader = response.body.getReader();
      let result = await reader.read();
      let total = 0;

      while (!result.done) {
        const value = result.value;
        total += value.length;
        console.log('Received chunk', value);
        // get the next result
        result = await reader.read();
      }

      return total;
    }

所有“智能”都不見了。讓我大有飄飄然之感的異步循環被替換成可靠卻單調乏味的 while 循環。
但簡明性得到大幅提高。未來，我們將獲得[異步迭代器](https://github.com/tc39/proposal-async-iteration){: .external}，這些迭代器[會將 `while` 循環替換成 for-of 循環](https://gist.github.com/jakearchibald/0b37865637daf884943cf88c2cba1376){: .external}，從而進一步提高代碼的簡明性。




注：我有點偏愛卡片信息流。如果不熟悉流式傳輸，可以[看一看我的指南](https://jakearchibald.com/2016/streams-ftw/#streams-the-fetch-api){: .external}。


## 其他異步函數語法

我們已經見識了 `async function() {}`，但 `async` 關鍵字還可用於其他函數語法：


### 箭頭函數

    // map some URLs to json-promises
    const jsonPromises = urls.map(async url => {
      const response = await fetch(url);
      return response.json();
    });

注：`array.map(func)` 不在乎我提供給它的是不是異步函數，只把它當作一個返回 Promise 的函數來看待。
它不會等到第一個函數執行完畢就會調用第二個函數。


### 對象方法

    const storage = {
      async getAvatar(name) {
        const cache = await caches.open('avatars');
        return cache.match(`/avatars/${name}.jpg`);
      }
    };

    storage.getAvatar('jaffathecake').then(…);

### 類方法

    class Storage {
      function Object() { [native code] }() {
        this.cachePromise = caches.open('avatars');
      }

      async getAvatar(name) {
        const cache = await this.cachePromise;
        return cache.match(`/avatars/${name}.jpg`);
      }
    }

    const storage = new Storage();
    storage.getAvatar('jaffathecake').then(…);

注：類構造函數以及 getter/settings 方法不能是異步的。

## 注意！避免太過循序

儘管您編寫的是看似同步的代碼，也一定不要錯失並行執行的機會。


    async function series() {
      await wait(500);
      await wait(500);
      return "done!";
    }

以上代碼執行完畢需要 1000 毫秒，再看看這段代碼：

    async function parallel() {
      const wait1 = wait(500);
      const wait2 = wait(500);
      await wait1;
      await wait2;
      return "done!";
    }

…以上代碼只需 500 毫秒就可執行完畢，因爲兩個 wait 是同時發生的。讓我們看一個實例…


### 示例：按順序輸出獲取的數據

假定我們想獲取一系列網址，並儘快按正確順序將它們記錄到日誌中。


*深呼吸* - 以下是使用 Promise 編寫的代碼：

    function logInOrder(urls) {
      // fetch all the URLs
      const textPromises = urls.map(url => {
        return fetch(url).then(response => response.text());
      });

      // log them in order
      textPromises.reduce((chain, textPromise) => {
        return chain.then(() => textPromise)
          .then(text => console.log(text));
      }, Promise.resolve());
    }

是的，沒錯，我使用 `reduce` 來鏈接 Promise 序列。我是不是*很智能*。
但這種有點*很智能*的編碼還是不要爲好。

不過，如果使用異步函數改寫以上代碼，又容易讓代碼變得*過於循序*：


<span class="compare-worse">不推薦的編碼方式</span> - 過於循序

    async function logInOrder(urls) {
      for (const url of urls) {
        const response = await fetch(url);
        console.log(await response.text());
      }
    }

代碼簡潔得多，但我的第二次獲取要等到第一次獲取讀取完畢才能開始，以此類推。
其執行效率要比並行執行獲取的 Promise 示例低得多。
幸運的是，還有一種理想的中庸之道：

<span class="compare-better">推薦的編碼方式</span> - 可讀性強、並行效率高

    async function logInOrder(urls) {
      // fetch all the URLs in parallel
      const textPromises = urls.map(async url => {
        const response = await fetch(url);
        return response.text();
      });

      // log them in sequence
      for (const textPromise of textPromises) {
        console.log(await textPromise);
      }
    }

在本例中，以並行方式獲取和讀取網址，但將“智能”的
`reduce` 部分替換成標準單調乏味但可讀性強的 for 循環。

## 瀏覽器支持與解決方法

在寫作本文時，Chrome 55 中默認情況下啓用異步函數，但它們在所有主流瀏覽器中正處於開發階段：


* Edge - [在 14342+ 編譯版本中隱藏在一個標誌後](https://developer.microsoft.com/en-us/microsoft-edge/platform/status/asyncfunctions/)
* Firefox - [開發中](https://bugzilla.mozilla.org/show_bug.cgi?id=1185106)
* Safari - [開發中](https://bugs.webkit.org/show_bug.cgi?id=156147)

### 解決方法 - 生成器

如果目標是支持生成器的瀏覽器（其中包括[每一個主流瀏覽器的最新版本](http://kangax.github.io/compat-table/es6/#test-generators){:.external}），可以通過 polyfill 使用異步函數。



[Babel](https://babeljs.io/){: .external} 可以爲您實現此目的，[以下是通過 Babel REPL 實現的示例](https://goo.gl/0Cg1Sq){: .external}

- 注意到轉譯的代碼有多相似了吧。這一轉換是 [Babel es2017 預設](http://babeljs.io/docs/plugins/preset-es2017/){: .external}的一部分。


注：Babel REPL 說起來很有趣。試試就知道。

我建議採用轉譯方法，因爲目標瀏覽器支持異步函數後，直接將其關閉即可，但如果*實在*不想使用轉譯器，可以親自試用一下 [Babel 的 polyfill](https://gist.github.com/jakearchibald/edbc78f73f7df4f7f3182b3c7e522d25){: .external}。



原本的異步函數代碼：

    async function slowEcho(val) {
      await wait(1000);
      return val;
    }

…如果使用 [polyfill](https://gist.github.com/jakearchibald/edbc78f73f7df4f7f3182b3c7e522d25){: .external}，就需要這樣編寫：


    const slowEcho = createAsyncFunction(function*(val) {
      yield wait(1000);
      return val;
    });

請注意，需要將生成器 (`function*`) 傳遞給 `createAsyncFunction`，並使用 `yield` 來替代 `await`。
其他方面的工作方式是相同的。

### 解決方法 - 再生器

如果目標是舊版瀏覽器，Babel 還可轉譯生成器，讓您能在版本低至 IE8 的瀏覽器上使用異步函數。
爲此，您需要 [Babel 的 es2017 預設](http://babeljs.io/docs/plugins/preset-es2017/){: .external}*和* [es2015 預設](http://babeljs.io/docs/plugins/preset-es2015/){: .external}。



[輸出不夠美觀](https://goo.gl/jlXboV)，因此要注意避免發生代碼膨脹。


## 全面異步化！

一旦異步函數登陸所有瀏覽器，就在每一個返回 Promise 的函數上盡情使用吧！
它們不但能讓代碼更加整潔美觀，還能確保該函數*始終*都能返回 Promise。


我真正熱衷於使用異步函數的歷史可以[追溯到 2014 年](https://jakearchibald.com/2014/es7-async-functions/){: .external}，看到它們登陸瀏覽器即將成真，真是棒極了。

啊嗚！


{# wf_devsite_translation #}
