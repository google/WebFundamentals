project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:"Promise 可简化延迟和异步计算。Promise 代表一个尚未完成的操作。"

{# wf_published_on:2013-12-16 #}
{# wf_updated_on:2014-01-29 #}

# JavaScript Promise：简介 {: .page-title }

{% include "web/_shared/contributors/jakearchibald.html" %}

女士们，先生们，请做好准备，迎接网页开发史上的关键时刻。


<em>[鼓点响起]</em>

Promise 已获得 JavaScript 的原生支持！

<em>[烟花绽放、彩纸飘飘、人群沸腾]</em>

此刻，您可能属于以下其中某一类：

* 人群在您身边欢呼雀跃，但是您感到莫名其妙。可能您甚至连“promise”是什么都不知道。因此您耸耸肩，但是从天而降的彩纸虽轻如鸿毛却让您无法释怀。如果真是这样，您也无需担心，我可花了很长的时间才弄明白为什么我应该关注它。您可能想从[开始](#whats-all-the-fuss-about)处开始。
* 您非常抓狂！觉得晚了一步，对吗？您可能之前使用过这些 Promise，但让您困扰的是，不同版本的 API 各有差异。JavaScript 官方版本的 API 是什么？您可能想要从[术语](#promise-terminology)开始。
* 您已知道这些，您会觉得那些上窜下跳的人很好笑，居然把它当作新闻。您可以先自豪一把，然后直接查看 [API 参考](#promise-api-reference)

##  人们究竟为何欢呼雀跃？ {: #whats-all-the-fuss-about }

JavaScript 是单线程工作，这意味着两段脚本不能同时运行，而是必须一个接一个地运行。在浏览器中，JavaScript 与因浏览器而异的其他 N 种任务共享一个线程。但是通常情况下 JavaScript 与绘制、更新样式和处理用户操作（例如，高亮显示文本以及与格式控件交互）处于同一队列。操作其中一项任务会延迟其他任务。

我们人类是多线程工作。您可以使用多个手指打字，可以一边开车一边与人交谈。唯一一个会妨碍我们的是打喷嚏，因为当我们打喷嚏的时候，所有当前进行的活动都必须暂停。这真是非常讨厌，尤其是当您在开车并想与人交谈时。您可不想编写像打喷嚏似的代码。

您可能已使用事件和回调来解决该问题。以下是一些事件：

    var img1 = document.querySelector('.img-1');

    img1.addEventListener('load', function() {
      // woo yey image loaded
    });

    img1.addEventListener('error', function() {
      // argh everything's broken
    });


这可不会像打喷嚏那样打断您。我们获得图片、添加几个侦听器，之后 JavaScript 可停止执行，直至其中一个侦听器被调用。

遗憾的是，在上例中，事件有可能在我们开始侦听之前就发生了，因此我们需要使用图像的“complete”属性来解决该问题：

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

这不会捕获出错的图像，因为在此之前我们没有机会侦听到错误。遗憾的是，DOM 也没有给出解决之道。而且，这还只是加载一个图像，如果加载一组图像，情况会更复杂。


##  事件并不总是最佳方法

事件对于同一对象上发生多次的事情（如 keyup、touchstart 等）非常有用。对于这些事件，实际您并不关注在添加侦听器之前所发生的事情。但是，如果关系到异步成功/失败，理想的情况是您希望：

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

这是 promise 所执行的任务，但以更好的方式命名。如果 HTML 图像元素有一个返回 promise 的“ready”方法，我们可以执行：

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


最基本的情况是，promise 有点类似于事件侦听器，但有以下两点区别：

* promise 只能成功或失败一次，而不能成功或失败两次，也不能从成功转为失败或从失败转为成功。
* 如果 promise 已成功或失败，且您之后添加了成功/失败回调，则将会调用正确的回调，即使事件发生在先。

这对于异步成功/失败尤为有用，因为您可能对某些功能可用的准确时间不是那么关注，更多地是关注对结果作出的反应。


##  Promise 术语 {: #promise-terminology }

[Domenic Denicola](https://twitter.com/domenic) 校对了本篇文章的初稿，并在术语方面给我打分为“F”。他把我留下来，强迫我抄写[状态和结果](https://github.com/domenic/promises-unwrapping/blob/master/docs/states-and-fates.md) 100 遍，并给我的父母写了封告状信。尽管如此，我还是对很多术语混淆不清，以下是几个基本的概念：

promise 可以是：

* **已执行** - 与 promise 有关的操作成功
* **已拒绝** - 与 promise 有关的操作失败
* **待定** - 尚未执行或拒绝
* **已解决** - 已执行或拒绝


[本规范](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-promise-objects)还使用术语 **thenable** 来描述类似于 promise 的对象，并使用 `then` 方法。该术语让我想起前英格兰国家队教练 [Terry Venables](https://en.wikipedia.org/wiki/Terry_Venables)，因此我将尽可能不用这个术语。


##  Promise 在 JavaScript 中受支持！

Promise 有一段时间以库的形式出现，例如：

* [Q](https://github.com/kriskowal/q)
* [when](https://github.com/cujojs/when)
* [WinJS](https://msdn.microsoft.com/en-us/library/windows/apps/br211867.aspx)
* [RSVP.js](https://github.com/tildeio/rsvp.js)

以上这些与 JavaScript promise 都有一个名为 [Promise/A+](https://github.com/promises-aplus/promises-spec) 的常见标准化行为。如果您是 jQuery 用户，他们还有一个类似于名为 [Deferred](https://api.jquery.com/category/deferred-object/) 的行为。但是，Deferred 与 Promise/A+ 不兼容，这就使得它们[存在细微差异且没那么有用](https://thewayofcode.wordpress.com/tag/jquery-deferred-broken/)，因此需注意。此外，jQuery 还有 [Promise 类型](https://api.jquery.com/Types/#Promise)，但它只是 Deferred 的子集，因此仍存在相同的问题。

尽管 promise 实现遵照标准化行为，但其整体 API 有所不同。JavaScript promise 在 API 中类似于 RSVP.js。下面是创建 promise 的步骤：

    var promise = new Promise(function(resolve, reject) {
      // do a thing, possibly async, then…

      if (/* everything turned out fine */) {
        resolve("Stuff worked!");
      }
      else {
        reject(Error("It broke"));
      }
    });


Promise 构造函数包含一个参数和一个带有 resolve（解析）和 reject（拒绝）两个参数的回调。在回调中执行一些操作（例如异步），如果一切都正常，则调用 resolve，否则调用 reject。

与普通旧版 JavaScript 中的 `throw` 一样，通常拒绝时会给出 Error 对象，但这不是必须的。Error 对象的优点在于它们能够捕捉堆叠追踪，因而使得调试工具非常有用。

以下是有关 promise 的使用示例：

    promise.then(function(result) {
      console.log(result); // "Stuff worked!"
    }, function(err) {
      console.log(err); // Error: "It broke"
    });


`then()` 包含两个参数：一个用于成功情形的回调和一个用于失败情形的回调。这两个都是可选的，因此您可以只添加一个用于成功情形或失败情形的回调。

JavaScript promise 最初是在 DOM 中出现并称为“Futures”，之后重命名为“Promises”，最后又移入 JavaScript。在 JavaScript 中使用比在 DOM 中更好，因为它们将在如 Node.js 等非浏览器 JS 环境中可用（而它们是否会在核心 API 中使用 Promise 则是另外一个问题）。

尽管它们是 JavaScript 的一项功能，但 DOM 也能使用。实际上，采用异步成功/失败方法的所有新 DOM API 均使用 promise。[Quota Management](https://dvcs.w3.org/hg/quota/raw-file/tip/Overview.html#idl-def-StorageQuota)、[Font Load Events](http://dev.w3.org/csswg/css-font-loading/#font-face-set-ready)、[ServiceWorker](https://github.com/slightlyoff/ServiceWorker/blob/cf459d473ae09f6994e8539113d277cbd2bce939/service_worker.ts#L17)、[Web MIDI](https://webaudio.github.io/web-midi-api/#widl-Navigator-requestMIDIAccess-Promise-MIDIOptions-options)[Streams](https://github.com/whatwg/streams#basereadablestream) 等等都已经在使用 promise。


##  浏览器支持和 polyfill

现在，promise 已在各浏览器中实现。

在 Chrome 32、Opera 19、Firefox 29、Safari 8 和 Microsoft Edge 中，promise 默认启用。

如要使没有完全实现 promise 的浏览器符合规范，或向其他浏览器和 Node.js 中添加 promise，请查看 [polyfill](https://github.com/jakearchibald/ES6-Promises#readme)（gzip 压缩大小为 2k）。


##  与其他库的兼容性

JavaScript promise API 将任何使用 `then()` 方法的结构都当作 promise 一样（或按 promise 的说法为 `thenable`）来处理，因此，如果您使用返回 Q promise 的库也没问题，因为它能与新 JavaScript promise 很好地兼容。

如我之前所提到的，jQuery 的 Deferred 不那么有用。幸运的是，您可以将其转为标准 promise，这值得尽快去做：


    var jsPromise = Promise.resolve($.ajax('/whatever.json'))


这里，jQuery 的 `$.ajax` 返回了一个 Deferred。由于它使用 `then()` 方法，因此 `Promise.resolve()` 可将其转为 JavaScript promise。但是，有时 deferred 会将多个参数传递给其回调，例如：

    var jqDeferred = $.ajax('/whatever.json');

    jqDeferred.then(function(response, statusText, xhrObj) {
      // ...
    }, function(xhrObj, textStatus, err) {
      // ...
    })



而 JS promise 会忽略除第一个之外的所有参数：


    jsPromise.then(function(response) {
      // ...
    }, function(xhrObj) {
      // ...
    })



幸好，通常这就是您想要的，或者至少为您提供了方法让您获得所想要的。另请注意，jQuery 不遵循将 Error 对象传递到 reject 这一惯例。


##  复杂异步代码让一切变得更简单

对了，让我们写一些代码。比如说，我们想要：

1. 启动一个转环来提示加载
1. 获取一个故事的 JSON，确定每个章节的标题和网址
1. 向页面中添加标题
1. 获取每个章节
1. 向页面中添加故事
1. 停止转环

…但如果此过程发生错误，也要向用户显示。我们也想在那一点停止转环，否则，它将不停地旋转、眩晕并撞上其他 UI 控件。

当然，您不会使用 JavaScript 来提供故事，[以 HTML 形式提供会更快](https://jakearchibald.com/2013/progressive-enhancement-is-faster/)，但是这种方式在处理 API 时很常见：多次提取数据，然后在全部完成后执行其他操作。

首先，让我们从网络中获取数据：

##  对 XMLHttpRequest 执行 promise

旧 API 将更新为使用 promise，如有可能，采用后向兼容的方式。`XMLHttpRequest` 是主要候选对象，不过，我们可编写一个作出 GET 请求的简单函数：



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


现在让我们来使用这一功能：

    get('story.json').then(function(response) {
      console.log("Success!", response);
    }, function(error) {
      console.error("Failed!", error);
    })


[点击此处了解实际操作](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/getting-started/primers/story.json){: target="_blank" .external }，检查 DevTools 中的控制台以查看结果。现在我们无需手动键入 `XMLHttpRequest` 即可作出 HTTP 请求，这真是太赞了，因为越少看到令人讨厌的书写得参差不齐的 `XMLHttpRequest`，我就越开心。


##  链接

`then()` 不是最终部分，您可以将各个 `then` 链接在一起来改变值，或依次运行额外的异步操作。


###  改变值
只需返回新值即可改变值：

    var promise = new Promise(function(resolve, reject) {
      resolve(1);
    });

    promise.then(function(val) {
      console.log(val); // 1
      return val + 2;
    }).then(function(val) {
      console.log(val); // 3
    })


举一个实际的例子，让我们回到：

    get('story.json').then(function(response) {
      console.log("Success!", response);
    })



这里的 response 是 JSON，但是我们当前收到的是其纯文本。我们可以将 get 函数修改为使用 JSON [`responseType`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#responseType)，不过我们也可以使用 promise 来解决这个问题：

    get('story.json').then(function(response) {
      return JSON.parse(response);
    }).then(function(response) {
      console.log("Yey JSON!", response);
    })



由于 `JSON.parse()` 采用单一参数并返回改变的值，因此我们可以将其简化为：

    get('story.json').then(JSON.parse).then(function(response) {
      console.log("Yey JSON!", response);
    })


[了解实际操作](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/getting-started/primers/story.json){: target="_blank" .external }，检查 DevTools 中的控制台以查看结果。实际上，我们可以让 `getJSON()` 函数更简单：


    function getJSON(url) {
      return get(url).then(JSON.parse);
    }

`getJSON()` 仍返回一个 promise，该 promise 获取 URL 后将 response 解析为 JSON。


###  异步操作队列

您还可以链接多个 `then`，以便按顺序运行异步操作。

当您从 `then()` 回调中返回某些内容时，这有点儿神奇。如果返回一个值，则会以该值调用下一个 `then()`。但是，如果您返回类似于 promise 的内容，下一个 `then()` 则会等待，并仅在 promise 产生结果（成功/失败）时调用。例如：

    getJSON('story.json').then(function(story) {
      return getJSON(story.chapterUrls[0]);
    }).then(function(chapter1) {
      console.log("Got chapter 1!", chapter1);
    })



这里我们向 `story.json` 发出异步请求，这可让我们请求一组网址，随后我们请求其中的第一个。这是 promise 从简单回调模式中脱颖而出的真正原因所在。

您甚至可以采用更简短的方法来获得章节内容：

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


直到 `getChapter` 被调用，我们才下载 `story.json`，但是下次 `getChapter` 被调用时，我们重复使用 story romise，因此 `story.json` 仅获取一次。耶，Promise！


##  错误处理

正如我们之前所看到的，`then()` 包含两个参数：一个用于成功，一个用于失败（按照 promise 中的说法，即执行和拒绝）：

    get('story.json').then(function(response) {
      console.log("Success!", response);
    }, function(error) {
      console.log("Failed!", error);
    })


您还可以使用 `catch()`：


    get('story.json').then(function(response) {
      console.log("Success!", response);
    }).catch(function(error) {
      console.log("Failed!", error);
    })


`catch()` 没有任何特殊之处，它只是 `then(undefined, func)` 的锦上添花，但可读性更强。注意，以上两个代码示例行为并不相同，后者相当于：

    get('story.json').then(function(response) {
      console.log("Success!", response);
    }).then(undefined, function(error) {
      console.log("Failed!", error);
    })


两者之间的差异虽然很微小，但非常有用。Promise 拒绝后，将跳至带有拒绝回调的下一个 `then()`（或具有相同功能的 `catch()`）。如果是 `then(func1, func2)`，则 `func1` 或 `func2` 中的一个将被调用，而不会二者均被调用。但如果是 `then(func1).catch(func2)`，则在 `func1` 拒绝时两者均被调用，因为它们在该链中是单独的步骤。看看下面的代码：


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



以上流程与常规的 JavaScript try/catch 非常类似，在“try”中发生的错误直接进入 `catch()` 块。以下是上述代码的流程图形式（因为我喜欢流程图）：


<div style="position: relative; padding-top: 93%;">
  <iframe style="position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden" src="imgs/promise-flow.svg" frameborder="0" allowtransparency="true"></iframe>
</div>


蓝线表示执行的 promise 路径，红路表示拒绝的 promise 路径。

###  JavaScript 异常和 promise
当 promise 被明确拒绝时，会发生拒绝；但是如果是在构造函数回调中引发的错误，则会隐式拒绝。

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


这意味着，在 promise 构造函数回调内部执行所有与 promise 相关的任务很有用，因为错误会自动捕获并进而拒绝。

对于在 `then()` 回调中引发的错误也是如此。

    get('/').then(JSON.parse).then(function() {
      // This never happens, '/' is an HTML page, not JSON
      // so JSON.parse throws
      console.log("It worked!", data);
    }).catch(function(err) {
      // Instead, this happens:
      console.log("It failed!", err);
    })



###  错误处理实践

在我们的故事和章节中，我们可使用 catch 来向用户显示错误：



    getJSON('story.json').then(function(story) {
      return getJSON(story.chapterUrls[0]);
    }).then(function(chapter1) {
      addHtmlToPage(chapter1.html);
    }).catch(function() {
      addTextToPage("Failed to show chapter");
    }).then(function() {
      document.querySelector('.spinner').style.display = 'none';
    })



如果获取 `story.chapterUrls[0]` 失败（例如，http 500 或用户离线），它将跳过所有后续成功回调，包括 `getJSON()` 中尝试将响应解析为 JSON 的回调，而且跳过将 chapter1.html 添加到页面的回调。然后，它将移至 catch 回调。因此，如果任一前述操作失败，“Failed to show chapter”将会添加到页面。

与 JavaScript 的 try/catch 一样，错误被捕获而后续代码继续执行，因此，转环总是被隐藏，这正是我们想要的。以上是下面一组代码的拦截异步版本：

    try {
      var story = getJSONSync('story.json');
      var chapter1 = getJSONSync(story.chapterUrls[0]);
      addHtmlToPage(chapter1.html);
    }
    catch (e) {
      addTextToPage("Failed to show chapter");
    }
    document.querySelector('.spinner').style.display = 'none'


您可能想出于记录目的而 `catch()`，而无需从错误中恢复。为此，只需再次抛出错误。我们可以使用 `getJSON()` 方法执行此操作：



    function getJSON(url) {
      return get(url).then(JSON.parse).catch(function(err) {
        console.log("getJSON failed for", url, err);
        throw err;
      });
    }


至此，我们已获取其中一个章节，但我们想要所有的章节。让我们尝试来实现。


##  并行式和顺序式：两者兼得


异步并不容易。如果您觉得难以着手，可尝试按照同步的方式编写代码。在本例中：

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

[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/primers/sync-example.html){: target="_blank" .external }


这样可行（查看[代码](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/getting-started/primers/sync-example.html){: target="_blank" .external }）！
但这是同步的情况，而且在内容下载时浏览器会被锁定。要使其异步，我们使用 `then()` 来依次执行任务。


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



但是我们如何遍历章节的 URL 并按顺序获取呢？以下方法**行不通**：

    story.chapterUrls.forEach(function(chapterUrl) {
      // Fetch chapter
      getJSON(chapterUrl).then(function(chapter) {
        // and add it to the page
        addHtmlToPage(chapter.html);
      });
    })



`forEach` 不是异步的，因此我们的章节内容将按照下载的顺序显示，这就乱套了。我们这里不是非线性叙事小说，因此得解决该问题。


###  创建序列
我们想要将 `chapterUrls` 数组转变为 promise 序列，这可通过 `then()` 来实现：

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


这是我们第一次看到 `Promise.resolve()`，这种 promise 可解析为您赋予的任何值。如果向其传递一个 `Promise` 实例，它也会将其返回（**注意：**这是对本规范的一处更改，某些实现尚未遵循）。如果将类似于 promise 的内容（带有 `then()` 方法）传递给它，它将创建以相同方式执行/拒绝的真正 `Promise`。如果向其传递任何其他值，例如 `Promise.resolve('Hello')`，它在执行时将以该值创建一个 promise。如果调用时不带任何值（如上所示），它在执行时将返回“undefined”。


此外还有 `Promise.reject(val)`，它创建的 promise 在拒绝时将返回赋予的值（或“undefined”）。

我们可以使用 [`array.reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) 将上述代码整理如下：



    // Loop through our chapter urls
    story.chapterUrls.reduce(function(sequence, chapterUrl) {
      // Add these actions to the end of the sequence
      return sequence.then(function() {
        return getJSON(chapterUrl);
      }).then(function(chapter) {
        addHtmlToPage(chapter.html);
      });
    }, Promise.resolve())



这与之前示例的做法相同，但是不需要独立的“sequence”变量。我们的 reduce 回调针对数组中的每项内容进行调用。首次调用时，“sequence”为 `Promise.resolve()`，但是对于余下的调用，“sequence”为我们从之前调用中返回的值。`array.reduce` 确实非常有用，它将数组浓缩为一个简单的值（在本例中，该值为 promise）。

让我们汇总起来：

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

[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/primers/async-example.html){: target="_blank" .external }

这里我们已实现它（查看[代码](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/getting-started/primers/async-example.html){: target="_blank" .external }），即同步版本的完全异步版本。但是我们可以做得更好。此时，我们的页面正在下载，如下所示：


<figure>
  <img src="imgs/promise1.gif">
</figure>

浏览器的一个优势在于可以一次下载多个内容，因此我们一章章地下载就失去了其优势。我们希望同时下载所有章节，然后在所有下载完毕后进行处理。幸运的是，API 可帮助我们实现：


    Promise.all(arrayOfPromises).then(function(arrayOfResults) {
      //...
    })



`Promise.all` 包含一组 promise，并创建一个在所有内容成功完成后执行的 promise。您将获得一组结果（即一组 promise 执行的结果），其顺序与您与传入 promise 的顺序相同。



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

[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/primers/async-all-example.html){: target="_blank" .external }

根据连接情况，这可能比一个个依次加载要快几秒钟（查看[代码](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/getting-started/primers/async-all-example.html){: target="_blank" .external }），而且代码也比我们第一次尝试的要少。章节将按任意顺序下载，但在屏幕中以正确顺序显示。


<figure>
  <img src="imgs/promise2.gif">
</figure>

不过，我们仍可以提升用户体验。第一章下载完后，我们可将其添加到页面。这可让用户在其他章节下载完毕前先开始阅读。第三章下载完后，我们不将其添加到页面，因为还缺少第二章。第二章下载完后，我们可添加第二章和第三章，后面章节也是如此添加。

为此，我们使用 JSON 来同时获取所有章节，然后创建一个向文档中添加章节的顺序：

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

[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/primers/async-best-example.html){: target="_blank" .external }

我们做到了（查看[代码](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/getting-started/primers/async-best-example.html){: target="_blank" .external }），两全其美！下载所有内容所花费的时间相同，但是用户可先阅读前面的内容。


<figure>
  <img src="imgs/promise3.gif">
</figure>

在这个小示例中，所有章节几乎同时下载完毕，但是如果一本书有更多、更长的章节，一次显示一个章节的优势便会更明显。


使用 [Node.js-style 回调或事件](https://gist.github.com/jakearchibald/0e652d95c07442f205ce)来执行以上示例需两倍代码，更重要的是，没那么容易实施。然而，promise 功能还不止如此，与其他 ES6 功能组合使用时，它们甚至更容易。


##  友情赠送：promise 和 generator


以下内容涉及一整套 ES6 新增功能，但您目前在使用 promise 编码时无需掌握它们。可将其视为即将上映的好莱坞大片电影预告。

ES6 还为我们提供了 [generator](http://wiki.ecmascript.org/doku.php?id=harmony:generators)，它可让某些功能在某个位置退出（类似于“return”），但之后能以相同位置和状态恢复，例如：



    function *addGenerator() {
      var i = 0;
      while (true) {
        i += yield i;
      }
    }


注意函数名称前面的星号，这表示 generator。yield 关键字是我们的返回/恢复位置。我们可按下述方式使用：

    var adder = addGenerator();
    adder.next().value; // 0
    adder.next(5).value; // 5
    adder.next(5).value; // 10
    adder.next(5).value; // 15
    adder.next(50).value; // 65


但是这对于 promise 而言意味着什么呢？您可以使用返回/恢复行为来编写异步代码，这些代码看起来像同步代码，而且实施起来也与同步代码一样简单。对各行代码的理解无需过多担心，借助于帮助程序函数，我们可使用 `yield` 来等待 promise 得到解决：

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


…在上述示例中我几乎是[从 Q 中逐字般过来](https://github.com/kriskowal/q/blob/db9220d714b16b96a05e9a037fa44ce581715e41/q.js#L500)，并针对 JavaScript promise 进行了改写。因此，我们可以采用显示章节的最后一个最佳示例，结合新 ES6 的优势，将其转变为：

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

[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/primers/async-generators-example.html){: target="_blank" .external }

这跟之前的效用完全相同，但读起来容易多了。Chrome 和 Opera 当前支持该功能（查看[代码](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/getting-started/primers/async-generators-example.html){: target="_blank" .external }），而且 Microsoft Edge 中也可使用该功能（需要在 `about:flags` 中打开 **Enable experimental JavaScript features** 设置）。在即将发布的版本中，该功能默认启用。


它将纳入很多新的 ES6 元素：promise、generator、let、for-of。我们生成一个 promise 后，spawn 帮助程序将等待该 promise 来解析并返回一个终值。如果 promise 拒绝，spawn 会让 yield 语句抛出异常，我们可通过常规的 JavaScript try/catch 来捕获此异常。异步编码竟如此简单！


此模式非常有用，在 ES7 中它将以[异步功能](https://jakearchibald.com/2014/es7-async-functions/)的形式提供。它几乎与上述编码示例相同，但无需使用 `spawn` 方法。


##  Promise API 参考 {: #promise-api-reference }

所有方法在 Chrome、Opera、Firefox、Microsoft Edge 和 Safari 中均可使用，除非另有说明。[polyfill](https://github.com/jakearchibald/ES6-Promises#readme) 为所有浏览器提供以下方法。


###  静态方法

<table class="responsive methods">
<tr>
<th colspan="2">方法汇总</th>
</tr>
<tr>
  <td><code>Promise.resolve(promise);</code></td>
  <td> 返回 promise（仅当  <code>promise.constructor == Promise</code> 时）</td>
</tr>
<tr>
  <td><code>Promise.resolve(thenable);</code></td>
  <td> 从 thenable 中生成一个新 promise。thenable 是具有 `then()` 方法的类似于 promise 的对象。</td>
</tr>
<tr>
  <td><code>Promise.resolve(obj);</code></td>
  <td> 在此情况下，生成一个 promise 并在执行时返回  <code>obj</code>。</td>
</tr>
<tr>
  <td><code>Promise.reject(obj);</code></td>
  <td> 生成一个 promise 并在拒绝时返回  <code>obj</code>。为保持一致和调试之目的（例如堆叠追踪）， <code>obj</code> 应为  <code>instanceof Error</code>。</td>
</tr>
<tr>
  <td><code>Promise.all(array);</code></td>
  <td> 生成一个 promise，该 promise 在数组中各项执行时执行，在任意一项拒绝时拒绝。每个数组项均传递给  <code>Promise.resolve</code>，因此数组可能混合了类似于 promise 的对象和其他对象。执行值是一组有序的执行值。拒绝值是第一个拒绝值。</td>
</tr>
<tr>
  <td><code>Promise.race(array);</code></td>
  <td> 生成一个 Promise，该 Promise 在任意项执行时执行，或在任意项拒绝时拒绝，以最先发生的为准。</td>
</tr>
</table>

注：我对 `Promise.race` 的实用性表示怀疑；我更倾向于使用与之相对的 `Promise.all`，它仅在所有项拒绝时才拒绝。

###  构造函数

<table class="responsive constructors">
<tr>
<th colspan="2"> 构造函数</th>
</tr>
<tr>
  <td><code>new Promise(function(resolve, reject) {});</code></td>
  <td>
    <p>
      <code>resolve(thenable)</code><br>
      Promise 依据  <code>thenable</code> 的结果而执行/拒绝。
    </p>

    <p>
      <code>resolve(obj)</code><br>
      Promise 执行并返回  <code>obj</code>
    </p>

    <p>
      <code>reject(obj)</code><br>
      Promise 拒绝并返回  <code>obj</code>。为保持一致和调试（例如堆叠追踪），obj 应为  <code>instanceof Error</code>。

      在构造函数回调中引发的任何错误将隐式传递给  <code>reject()</code>。
</p>

  </td>
</tr>
</table>
    
###  实例方法

<table class="responsive methods">
<tr>
<th colspan="2"> 实例方法</th>
</tr>
<tr>
  <td><code>promise.then(onFulfilled, onRejected)</code></td>
  <td>
    当/如果“promise”解析，则调用 <code>onFulfilled</code>。当/如果“promise”拒绝，则调用  <code>onRejected</code>。
两者均可选，如果任意一个或两者都被忽略，则调用链中的下一个  <code>onFulfilled</code>/<code>onRejected</code>。


    两个回调都只有一个参数：执行值或拒绝原因。 <code>then()</code> 将返回一个新 promise，它相当于从  <code>onFulfilled</code>/<code>onRejected</code> 中返回、
    通过  <code>Promise.resolve</code> 传递的值。如果在回调中引发了错误，返回的 promise 将拒绝并返回该错误。
</td>

</tr>
<tr>
  <td><code>promise.catch(onRejected)</code></td>
  <td> 对  <code>promise.then(undefined, onRejected)</code></td> 的锦上添花
</tr>
</table>



Anne van Kesteren、Domenic Denicola、Tom Ashworth、Remy Sharp、Addy Osmani、Arthur Evans 和 Yutaka Hirano 对本篇文章进行了校对，提出了建议并作出了修正，特此感谢！

此外，[Mathias Bynens](https://mathiasbynens.be/){: .external } 负责本篇文章的[更新部分](https://github.com/html5rocks/www.html5rocks.com/pull/921/files)，特此致谢。


{# wf_devsite_translation #}
