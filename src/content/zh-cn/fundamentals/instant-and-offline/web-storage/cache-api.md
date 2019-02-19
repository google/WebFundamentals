project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 学习如何使用Cache API使您的应用程序可以实现离线使用

{# wf_updated_on: 2018-09-20 #}
{# wf_published_on: 2017-10-03 #}
{# wf_blink_components: Blink>Storage>CacheStorage #}

# 使用Cache API {: .page-title }

{% include "web/_shared/contributors/mscales.html" %}

Cache API是用于存储和将网络的请求和响应做出对应的系统。这些可能是在运行应用程序过程中创建的常规请求和响应，也可能是为了将某些数据存储在缓存中而创建的。

创建Cache API是为了使Service Workers能够缓存网络请求，以便即使在离线时也可以提供适当的响应。但是，API也可以用作通用存储机制。

## 哪些地方可用？

该API目前可在Chrome，Opera和Firefox中使用。 Edge和Safari都将API标记为“开发中”。

API通过全局的`caches`属性暴露出来，因此您可以通过简单的功能检测来测试API是否存在：

```
const cacheAvailable = 'caches' in self;
```

可以从window，iframe，worker或service worker中访问API。

## 用来存储什么

该缓存仅可存储成对的`Request`和`Response`对象，分别表示HTTP请求和响应。但是，请求和响应可以包含可以通过HTTP传输的任何类型的数据。

使用需要存储的URL创建`Request`对象：

```
const request = new Request('/images/sample1.jpg');
```

The `Response` object constructor accepts many types of data, including `Blob`s, `ArrayBuffer`s,
`FormData` objects, and strings.

```
const imageBlob = new Blob([data], {type: 'image/jpeg'});
const imageResponse = new Response(imageBlob);

const stringResponse = new Response('Hello world');
```

You can set the MIME type of a `Response` by setting the appropriate header.

```
const options = {
  headers: {
    'Content-Type': 'application/json'
  }
}
const jsonResponse = new Response('{}', options);
```

## Working with Response objects

If you have retrieved a `Response` and wish to access its body, there are several helper methods
you can use. Each returns a `Promise` that resolves with a value of a different type.

<table>
  <thead>
    <th>方法</th>
    <th>描述</th>
  </thead>
  <tbody>
    <tr>
      <td><code>arrayBuffer</code></td>
      <td>返回包含将body序列化为二进制数据的<code>ArrayBuffer</code> 。</td>
    </tr>
    <tr>
      <td><code>blob</code></td>
      <td>返回<code>Blob</code> 。如果使用<code>Blob</code>创建<code>Response</code> ，则此新<code>Blob</code>具有相同的类型。否则，将使用<code>Response</code>的<code>Content-Type</code> 。</td>
    </tr>
    <tr>
      <td><code>text</code></td>
      <td>将body的原始数据解析为UTF-8编码的字符串。</td>
    </tr>
    <tr>
      <td><code>json</code></td>
      <td>将body的原始数据解析为UTF-8编码的字符串，然后尝试将其解析为JSON，返回结果对象。如果无法将字符串解析为JSON，则抛出<code>TypeError</code> 。</td>
    </tr>
    <tr>
      <td><code>formData</code></td>
      <td>将body的原始数据按照HTML表单进行解析，编码为“multipart/form-data”或“application/x-www-form-urlencoded”。返回<a href="https://developer.mozilla.org/en-US/docs/Web/API/FormData">FormData</a>对象，如果无法解析数据，则抛出<code>TypeError</code> 。</td>
    </tr>
    <tr>
      <td><code>body</code></td>
      <td>Returns a <a href="https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream">
      ReadableStream</a> for the body data.</td>
    </tr>
  </tbody>
</table>

For example

```
const response = new Response('Hello world');
response.arrayBuffer().then((buffer) => {
  console.log(new Uint8Array(buffer));
  // Uint8Array(11) [72, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100]
});
```

## Creating and opening a cache

要打开缓存，请使用`caches.open(name)`方法，将缓存名称作为单个参数传入。如果该命名的缓存不存在，则创建它。此方法返回一个在resolve中包含`Cache`对象的`Promise` 。

```
caches.open('my-cache').then((cache) => {
  // do something with cache...
});
```

## Retrieving from a cache

要在缓存中查找条目，可以使用`match`方法。

```
cache.match(request).then((response) => console.log(request, response));
```

If `request` is a string it is first be converted to a `Request` by calling `new Request(request)`. The function returns a `Promise` that resolves to a `Response` if a matching
entry is found, or `undefined` otherwise.

要确定两个`Requests`是否匹配， `Requests`使用的不仅仅是URL。如果两个请求具有不同的查询字符串， `Vary`标头和/或方法（ `GET` ， `POST` ， `PUT`等），则认为它们是不同的。

您可以通过将可选的对象作为第二个参数传入来忽略部分或全部这些条件。

```
const options = {
  ignoreSearch: true,
  ignoreMethod: true,
  ignoreVary: true
};

cache.match(request, options).then(...);
```

如果有多个缓存与请求匹配，则返回首先创建的请求。

If you want to retrieve *all* matching responses, you can use `cache.matchAll`.

```
const options = {
  ignoreSearch: true,
  ignoreMethod: true,
  ignoreVary: true
};

cache.matchAll(request, options).then((responses) => {
  console.log(`There are ${responses.length} matching responses.`);
});
```

作为一种快捷的方式，您可以直接使用一次`caches.match()`而不是为每个缓存都调用`cache.match()`来搜索所有缓存。

## Searching

The Cache API does not provide a way to search for requests or responses except for matching entries
against a `Response` object. However, you can implement your own search using filtering or by
creating an index.

### Filtering

实现自己的搜索的一种方法是迭代所有条目并过滤到您想要的条目。假设您要查找包含以“.png”结尾的URL的所有项目。

```
async function findImages() {
  // Get a list of all of the caches for this origin
  const cacheNames = await caches.keys();
  const result = [];

  for (const name of cacheNames) {
    // Open the cache
    const cache = await caches.open(name);

    // Get a list of entries. Each item is a Request object
    for (const request of await cache.keys()) {
      // If the request URL matches, add the response to the result
      if (request.url.endsWith('.png')) {
        result.push(await cache.match(request));
      }
    }
  }

  return result;
}
```

这样，您可以使用`Request`和`Response`对象的任何属性来过滤条目。请注意，如果搜索大量数据集，则速度会很慢。

### Creating an index

实现自己的搜索的另一种方法是维护一个单独的条目索引，可以搜索并存储在IndexedDB中。由于这是IndexedDB为其设计的一种操作，因此具有大量条目的查询性能会更好。

If you store the URL of the `Request` alongside the searchable properties then you can easily
retrieve the correct cache entry after doing the search.

## Adding to a cache

将项添加到缓存有三种方法 - `put` ， `add`和`addAll` 。这三种方法都返回一个`Promise` 。

### `cache.put`

第一种是使用`cache.put(request, response)` 。 `request`是`Request`对象或字符串 - 如果是字符串，则`new Request(request)`会替代之 。 `response`必须是`Response` 。它们成对存储在缓存中。

```
cache.put('/test.json', new Response('{"foo": "bar"}'));
```

### `cache.add`

第二种是使用`cache.add(request)` 。 `request`与`put`相同，但存储在缓存中的`Response`是从网络获取请求的结果。如果请求失败，或者响应的状态代码不在200范围内，则不存储任何内容，并且`Promise`将触发reject。请注意，不在CORS模式下的跨源请求的状态为0，因此这些请求只能与`put`一起存储。

### `cache.addAll`

第三个是`cache.addAll(requests)` ，其中`requests`是`Request`或URL字符串的数组。这类似于为每个单独的请求调用`cache.add` ，如果任何单个请求未被成功缓存，则`Promise`将会触发reject。

在以上所有情况下，新条目都会覆盖任何匹配的现有条目。这使用了与检索一节中描述的相同的匹配规则。

## 删除条目

从缓存中删除项目：

```
cache.delete(request);
```

请求可以是`Request`或URL字符串。此方法还使用与`cache.match`相同的选项对象，它允许您删除同一URL的多个`Request`/`Response`对。

```
cache.delete('/example/file.txt', {ignoreVary: true, ignoreSearch: true});
```

## Deleting a cache

要删除缓存，请调用`caches.delete(name)`。如果缓存存在并被删除，则此函数返回一个结果为`true`的`Promise` ，否则返回`false` 。

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
