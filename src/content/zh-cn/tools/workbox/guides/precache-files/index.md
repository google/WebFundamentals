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

通常使用管理文件版本控制的工具生成此文件列表。

### 生成一个 Precache 清单

Workbox 的大多数用户会使用下面的一个工具来生成需要预缓存的文件列表，也可以使用任何输出带有版本号的工具。下面是可以生成此文件列表的一些工具。

<aside class="note"><strong>注意：</strong>如果您不确定哪个最适合您，请<a href="./cli">从CLI开始，</a>因为它易于设置，可以让您更好地了解其他工具的工作原理。</aside>

###### Workbox Command Line Interface (CLI)

非常适合**不熟悉Node**或**有简单需求的**开发人员。

<a href="./cli" class="button button-primary">了解如何使用CLI</a>

###### workbox Build

非常适合希望以**编程方式在Node中构建列表**或正在**使用Gulp**进行构建过程的开发人员。

<a href="./workbox-build" class="button button-primary">了解如何使用workbox-build</a>

###### Workbox Webpack Plugin

非常适合**使用webpack**构建项目的**开发人员** 。

<a href="./webpack" class="button button-primary">了解如何使用Webpack插件</a>
