project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:异步函数用于像编写同步代码那样编写基于 Promise 的代码

{# wf_published_on: 2016-10-20 #}
{# wf_updated_on: 2016-10-20 #}

# 异步函数 - 提高 Promise 的易用性 {: .page-title }

{% include "web/_shared/contributors/jakearchibald.html" %}

Chrome 55 中默认情况下启用异步函数，坦率地讲，它们的作用相当不可思议。
可以利用它们像编写同步代码那样编写基于 Promise 的代码，而且还不会阻塞主线程。
它们可以让异步代码“智商”下降、可读性提高。


异步函数的工作方式是这样的：

    async function myFirstAsyncFunction() {
      try {
        const fulfilledValue = await promise;
      }
      catch (rejectedValue) {
        // …
      }
    }

如果在函数定义之前使用了 `async` 关键字，就可以在函数内使用 `await`。
当您 `await` 某个 Promise 时，函数暂停执行，直至该 Promise 产生结果，并且暂停并不会阻塞主线程。
如果 Promise 执行，则会返回值。
如果 Promise 拒绝，则会抛出拒绝的值。

注：如果不熟悉 Promise，可以看一看[我们的 Promise 指南](/web/fundamentals/getting-started/primers/promises)。


## 示例：记录获取日志

假设我们想获取某个网址并以文本形式记录响应日志。以下是利用 Promise 编写的代码：


    function logFetch(url) {
      return fetch(url)
        .then(response => response.text())
        .then(text => {
          console.log(text);
        }).catch(err => {
          console.error('fetch failed', err);
        });
    }

以下是利用异步函数具有相同作用的代码：

    async function logFetch(url) {
      try {
        const response = await fetch(url);
        console.log(await response.text());
      }
      catch (err) {
        console.log('fetch failed', err);
      }
    }

代码行数虽然相同，但去掉了所有回调。这可以提高代码的可读性，对不太熟悉 Promise 的人而言，帮助就更大了。


注：您 `await` 的任何内容都通过 `Promise.resolve()` 传递，这样您就可以安全地 `await` 非原生 Promise。


## 异步函数返回值

无论是否使用 `await`，异步函数*都会*返回 Promise。该 Promise 解析时返回异步函数返回的任何值，拒绝时返回异步函数抛出的任何值。

因此，对于：

    // wait ms milliseconds
    function wait(ms) {
      return new Promise(r => setTimeout(r, ms));
    }

    async function hello() {
      await wait(500);
      return 'world';
    }

…调用 `hello()` 返回的 Promise 会在*执行*时返回 `"world"`。

    async function foo() {
      await wait(500);
      throw Error('bar');
    }

…调用 `foo()` 返回的 Promise 会在*拒绝*时返回 `Error('bar')`。

## 示例：流式传输响应

异步函数在更复杂示例中更有用武之地。假设我们想在流式传输响应的同时记录数据块日志，并返回数据块最终大小。


注：一看到“记录数据块日志”这几个字就让我感到不舒服。

以下是使用 Promise 编写的代码：

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

请“Promise 大师”Jake Archibald 给我检查一下。看到我是如何在 `processResult` 内调用其自身来建立异步循环了吧？
这样编写的代码让我觉得*很智能*。
但就像大多数“智能”代码那样，你得盯着它看上半天才能弄明白它的作用，要拿出揣摩上世纪 90 年代流行的魔眼图片的那种劲头才行。



我们再用异步函数来编写上面这段代码：

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

所有“智能”都不见了。让我大有飘飘然之感的异步循环被替换成可靠却单调乏味的 while 循环。
但简明性得到大幅提高。未来，我们将获得[异步迭代器](https://github.com/tc39/proposal-async-iteration){: .external}，这些迭代器[会将 `while` 循环替换成 for-of 循环](https://gist.github.com/jakearchibald/0b37865637daf884943cf88c2cba1376){: .external}，从而进一步提高代码的简明性。




注：我有点偏爱卡片信息流。如果不熟悉流式传输，可以[看一看我的指南](https://jakearchibald.com/2016/streams-ftw/#streams-the-fetch-api){: .external}。


## 其他异步函数语法

我们已经见识了 `async function() {}`，但 `async` 关键字还可用于其他函数语法：


### 箭头函数

    // map some URLs to json-promises
    const jsonPromises = urls.map(async url => {
      const response = await fetch(url);
      return response.json();
    });

注：`array.map(func)` 不在乎我提供给它的是不是异步函数，只把它当作一个返回 Promise 的函数来看待。
它不会等到第一个函数执行完毕就会调用第二个函数。


### 对象方法

    const storage = {
      async getAvatar(name) {
        const cache = await caches.open('avatars');
        return cache.match(`/avatars/${name}.jpg`);
      }
    };

    storage.getAvatar('jaffathecake').then(…);

### 类方法

    class Storage {
      constructor() {
        this.cachePromise = caches.open('avatars');
      }

      async getAvatar(name) {
        const cache = await this.cachePromise;
        return cache.match(`/avatars/${name}.jpg`);
      }
    }

    const storage = new Storage();
    storage.getAvatar('jaffathecake').then(…);

注：类构造函数以及 getter/settings 方法不能是异步的。

## 注意！避免太过循序

尽管您编写的是看似同步的代码，也一定不要错失并行执行的机会。


    async function series() {
      await wait(500);
      await wait(500);
      return "done!";
    }

以上代码执行完毕需要 1000 毫秒，再看看这段代码：

    async function parallel() {
      const wait1 = wait(500);
      const wait2 = wait(500);
      await wait1;
      await wait2;
      return "done!";
    }

…以上代码只需 500 毫秒就可执行完毕，因为两个 wait 是同时发生的。让我们看一个实例…


### 示例：按顺序输出获取的数据

假定我们想获取一系列网址，并尽快按正确顺序将它们记录到日志中。


*深呼吸* - 以下是使用 Promise 编写的代码：

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

是的，没错，我使用 `reduce` 来链接 Promise 序列。我是不是*很智能*。
但这种有点*很智能*的编码还是不要为好。

不过，如果使用异步函数改写以上代码，又容易让代码变得*过于循序*：


<span class="compare-worse">不推荐的编码方式</span> - 过于循序

    async function logInOrder(urls) {
      for (const url of urls) {
        const response = await fetch(url);
        console.log(await response.text());
      }
    }

代码简洁得多，但我的第二次获取要等到第一次获取读取完毕才能开始，以此类推。
其执行效率要比并行执行获取的 Promise 示例低得多。
幸运的是，还有一种理想的中庸之道：

<span class="compare-better">推荐的编码方式</span> - 可读性强、并行效率高

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

在本例中，以并行方式获取和读取网址，但将“智能”的
`reduce` 部分替换成标准单调乏味但可读性强的 for 循环。

## 浏览器支持与解决方法

在写作本文时，Chrome 55 中默认情况下启用异步函数，但它们在所有主流浏览器中正处于开发阶段：


* Edge - [在 14342+ 编译版本中隐藏在一个标志后](https://developer.microsoft.com/en-us/microsoft-edge/platform/status/asyncfunctions/)
* Firefox - [开发中](https://bugzilla.mozilla.org/show_bug.cgi?id=1185106)
* Safari - [开发中](https://bugs.webkit.org/show_bug.cgi?id=156147)

### 解决方法 - 生成器

如果目标是支持生成器的浏览器（其中包括[每一个主流浏览器的最新版本](http://kangax.github.io/compat-table/es6/#test-generators){:.external}），可以通过 polyfill 使用异步函数。



[Babel](https://babeljs.io/){: .external} 可以为您实现此目的，[以下是通过 Babel REPL 实现的示例](https://goo.gl/0Cg1Sq){: .external}

- 注意到转译的代码有多相似了吧。这一转换是 [Babel es2017 预设](http://babeljs.io/docs/plugins/preset-es2017/){: .external}的一部分。


注：Babel REPL 说起来很有趣。试试就知道。

我建议采用转译方法，因为目标浏览器支持异步函数后，直接将其关闭即可，但如果*实在*不想使用转译器，可以亲自试用一下 [Babel 的 polyfill](https://gist.github.com/jakearchibald/edbc78f73f7df4f7f3182b3c7e522d25){: .external}。



原本的异步函数代码：

    async function slowEcho(val) {
      await wait(1000);
      return val;
    }

…如果使用 [polyfill](https://gist.github.com/jakearchibald/edbc78f73f7df4f7f3182b3c7e522d25){: .external}，就需要这样编写：


    const slowEcho = createAsyncFunction(function*(val) {
      yield wait(1000);
      return val;
    });

请注意，需要将生成器 (`function*`) 传递给 `createAsyncFunction`，并使用 `yield` 来替代 `await`。
其他方面的工作方式是相同的。

### 解决方法 - 再生器

如果目标是旧版浏览器，Babel 还可转译生成器，让您能在版本低至 IE8 的浏览器上使用异步函数。
为此，您需要 [Babel 的 es2017 预设](http://babeljs.io/docs/plugins/preset-es2017/){: .external}*和* [es2015 预设](http://babeljs.io/docs/plugins/preset-es2015/){: .external}。



[输出不够美观](https://goo.gl/jlXboV)，因此要注意避免发生代码膨胀。


## 全面异步化！

一旦异步函数登陆所有浏览器，就在每一个返回 Promise 的函数上尽情使用吧！
它们不但能让代码更加整洁美观，还能确保该函数*始终*都能返回 Promise。


我真正热衷于使用异步函数的历史可以[追溯到 2014 年](https://jakearchibald.com/2014/es7-async-functions/){: .external}，看到它们登陆浏览器即将成真，真是棒极了。

啊呜！


{# wf_devsite_translation #}
