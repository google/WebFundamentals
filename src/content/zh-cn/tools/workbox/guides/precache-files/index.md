project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description: A guide on how to precache files with Workbox.

{# wf_blink_components: N/A #}
{# wf_updated_on: 2018-03-13 #}
{# wf_published_on: 2017-11-15 #}

<style>
  .button-primary {
    background-color: #fb8c00;
  }
</style>

# 预缓存文件 {: .page-title }

如果您希望您的 Web 应用可以离线工作，或者您的网络资源可以缓存很长时间，那么使用预先缓存是最好的方法。

预缓存一个文件前会确认 Service Worker 是否已经下载并安装，如果已经安装，这个文件就会被缓存。

Workbox 提供了一种简单的预缓存文件的方法，确保在 Service Worker 更改时，预缓存的文件得到有效维护，只有下载更新的文件并在 Service Worker 冗余后进行清理。

使用 Workbox 预先缓存文件可以这样进行：

```javascript
workbox.precaching.precacheAndRoute([
    '/styles/index.0c9a31.css',
    '/scripts/main.0d5770.js',
    { url: '/index.html', revision: '383676' },
]);
```

上面的代码会下载文件`/styles/index.0c9a31.css` ， `/scripts/main.0d5770.js`和`/index.html`在 Service Worker 的 "install" 事件中，并创建一个直接从缓存中提供这些文件的路径。

This list of files is normally generated using a tool that manages the
versioning of files.

### 生成一个 Precache 清单

Workbox 的大多数用户会使用下面的一个工具来生成需要预缓存的文件列表，也可以使用任何输出带有版本号的工具。下面是可以生成此文件列表的一些工具。

<aside class="note"><strong>注意：</strong>如果您不确定哪个最适合您，请<a href="./cli">从CLI开始，</a>因为它易于设置，可以让您更好地了解其他工具的工作原理。</aside>

###### Workbox Command Line Interface (CLI)

Ideal for developers who are **unfamiliar with Node** or **have simple needs**.

<a href="./cli" class="button button-primary">Learn how to use the CLI</a>

###### workbox Build

Perfect for developers wanting to **programmatically build the list in Node**
or are **using Gulp** for their build process.

<a href="./workbox-build" class="button button-primary">Learn how to use workbox-build</a>

###### Workbox Webpack Plugin

Ideal for **developers using webpack** to build their project.

<a href="./webpack" class="button button-primary">Learn how to use the Webpack Plugin</a>
