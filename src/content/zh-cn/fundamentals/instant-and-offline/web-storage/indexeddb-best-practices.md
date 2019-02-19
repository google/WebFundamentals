project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 学习在IndexedDB和流行的状态管理库之间同步应用程序状态的最佳实践。

{# wf_updated_on: 2018-09-20 #}
{# wf_published_on: 2017-06-08 #}
{# wf_tags: javascript,indexeddb #}
{# wf_blink_components: Blink>Storage>IndexedDB #}

# 使用IndexedDB的最佳实践 {: .page-title }

{% include "web/_shared/contributors/philipwalton.html" %}

当用户首次加载网站或应用程序时，构建用于呈现UI的初始应用程序状态通常涉及大量工作。例如，有时应用程序需要对用户客户端进行身份验证，然后在需要在页面上显示的所有数据呈现之前发出多个API请求。

在[IndexedDB中](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)存储应用程序状态是一种可以加快重复访问的加载时间的好方法。应用程序可以与后台的任何API服务同步，并使用新的数据在空闲时间更新UI，即[stale-while- revalidate](https://www.mnot.net/blog/2007/12/12/stale)策略。

IndexedDB的另一个好用途是存储用户生成的内容，可以在上传到服务器之前作为临时存储，也可以作为远程数据的客户端缓存 - 或者，当然两者都存储。

但是，在使用IndexedDB时，有许多重要的事情需要考虑，对于刚接触API的开发人员来说可能短期内不会很明白。本文回答了常见问题，并讨论了在IndexedDB中保存数据时要记住的一些最重要的事项。

## 保证应用的可预测性

IndexedDB的许多复杂性源于您（开发人员）无法控制的因素很多。本节探讨了使用IndexedDB时必须牢记的许多问题。

### Not everything can be stored in IndexedDB on all platforms

如果要存储用户生成的大型文件（如图像或视频），则可以尝试将它们存储为`File`或`Blob`对象。这在某些平台上运行正常但在其他平台上可能会失败。特别是iOS上的Safari无法在IndexedDB中存储`Blob` 。

幸运的是，将`Blob`转换为`ArrayBuffer`并不困难，反之亦然。在IndexedDB中存储`ArrayBuffer`浏览器支持度很高。

但请记住， `Blob`具有MIME类型，而`ArrayBuffer`则不具有MIME类型。您需要将类型一并存储在缓冲区旁边才能正确进行数据转换。

To convert an `ArrayBuffer` to a `Blob` you simply use the `Blob` constructor.

```
function arrayBufferToBlob(buffer, type) {
  return new Blob([buffer], {type: type});
}
```

反之转换代码将会多一些，并且是一个异步过程。您可以使用`FileReader`对象将Blob读取为`ArrayBuffer` 。读取完成后，读取器会触发`loadend`事件。您可以将此过程包装在`Promise`中，如下所示：

```
function blobToArrayBuffer(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('loadend', (e) => {
      resolve(reader.result);
    });
    reader.addEventListener('error', reject);
    reader.readAsArrayBuffer(blob);
  });
}
```

### Writing to storage may fail

写入IndexedDB时出现的错误可能由于各种原因而发生，在某些情况下，这些原因超出了您作为开发人员的控制范围。例如，某些浏览器当前不允许[在隐私浏览模式下写入IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API#Browser_compatibility) 。也可能用户在使用几乎没有磁盘空间的设备，浏览器会限制您存储任何内容。

<aside><strong>Note: </strong>目前正在开发新的<a href="https://storage.spec.whatwg.org/">存储API</a> ，允许开发人员在编写之前<a href="https://storage.spec.whatwg.org/#usage-and-quota">估计</a>可用的存储空间量，并请求更大的存储配额甚至<a href="https://storage.spec.whatwg.org/#persistence">永久性存储</a> ，这意味着用户可以选择保留来自一些站点甚至在执行标准的<a href="https://support.google.com/accounts/answer/32050">清除缓存/cookie</a>操作时的数据。</aside>

因此，始终在IndexedDB代码中实现正确的错误处理至关重要。这也意味着将应用程序状态保存在内存中（除了存储它）通常是一个好主意，因此在私有浏览模式下运行或无法使用存储空间时（即使某些需要存储的其他应用功能也无效），UI不会中断需要存储的应用功能无效。

通过在创建`IDBDatabase`，`IDBTransaction`或`IDBRequest`对象时为`error`事件添加事件处理程序，可以捕获IndexedDB操作中的`error` 。

```
const request = db.open('example-db', 1);
request.addEventListener('error', (event) => {
  console.log('Request error:', request.error);
};
```

### Stored data may have been modified or deleted by the user

Unlike server-side databases where you can restrict unauthorized access,
client-side databases are accessible to browser extensions and developer tools,
and they can be cleared by the user.

虽然用户修改其本地存储的数据可能并不常见，但用户清除它通常很常见。您的应用程序需要在不出错的情况下处理这两种情况，这一点非常重要。

### Stored data may be out of date

Similar to the previous section, even if the user hasn't modified the data
themselves, it's also possible that the data they have in storage was written by
an old version of your code, possibly a version with bugs in it.

IndexedDB has built-in support for schema versions and upgrading via its
[`IDBOpenDBRequest.onupgradeneeded()`](https://developer.mozilla.org/en-US/docs/Web/API/IDBOpenDBRequest/onupgradeneeded)
method; however, you still need to write your upgrade code in such a way that
it can handle the user coming from a previous version (including a version
with a bug).

Unit tests can be very helpful here, as it's often not feasible to manually test
all possible upgrade paths and cases.

## 保证应用的性能

IndexedDB的一个关键特性是它的异步API，但是不要认为您在使用它时可以不需要担心性能。在许多情况下，不正确的使用仍然可以阻止主线程，这可能导致产生垃圾数据和页面无响应。

As a general rule, reads and writes to IndexedDB should not be larger than
required for the data being accessed.

虽然IndexedDB可以将大型嵌套对象存储为单个记录（从开发人员的角度来看，这样做非常方便），但应该避免这种做法。究其原因是因为当IndexedDB存储对象时，它必须首先创建一个[结构化克隆](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm)对象，而结构化克隆过程发生在主线程。因此对象越大，主线程阻塞时间越长。

在规划如何将应用程序状态持久保存到IndexedDB时，这会带来一些挑战，因为大多数流行的状态管理库（如[Redux](http://redux.js.org/) ）通过将整个状态树作为单个JavaScript对象来工作。

虽然以这种方式管理状态有很多好处（例如，它使您的代码易于推理和调试），而简单地将整个状态树存储为IndexedDB中的单个记录可能是很方便，在每次更改（即使使用节流/去抖）后执行此操作将导致对主线程的不必要阻塞，则会增加写入错误的可能性，并且在某些情况下甚至会导致浏览器标签页崩溃或无响应。

Instead of storing the entire state tree in a single record, you should break it
up into individual records and only update the records that actually change.

如果您在IndexedDB中存储图像，音乐或视频等大型项目，情况也是如此。存储它们每个条目自己的关键信息而不是一个大对象，以便您可以在检索结构化数据时无需担心检索二进制文件的成本。

与大多数最佳实践一样，这不是一个全有或全无的规则。如果分解状态对象并且只编写最小变更集是不可行的，那么将数据分解为子树并且仅写入那些有变化的仍然优于总是编写整个状态树。即使很小的改进也比根本没改进更好。

最后，您应始终检测所编写代码的[性能影响](/web/updates/2017/06/user-centric-performance-metrics) 。虽然对IndexedDB的小额操作比大额操作更好，但这只适用于您的应用程序执行对IndexedDB的写入会产生导致阻塞主线程并降低用户体验的[长任务](/web/updates/2017/06/user-centric-performance-metrics#long_tasks)时 。衡量这一点非常重要，这样您才能了解自己对什么去做优化。

## Conclusions

Developers can leverage client storage mechanisms like IndexedDB to improve the
user experience of their application by not only persisting state across
sessions but also by decreasing the time it takes to load the initial state on
repeat visits.

While using IndexedDB properly can dramatically improve user experience, using
it incorrectly or failing to handle error cases can lead to broken apps and
unhappy users.

Since client storage involves many factors outside of your control, it's
critical your code is well tested and properly handles errors, even those that
may initially seem unlikely to occur.

## 反馈 {: #feedback }

{% include "web/_shared/helpful.html" %}
