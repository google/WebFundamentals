project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description: workbox-cli模块向导.

{# wf_blink_components: N/A #}
{# wf_updated_on: 2018-07-09 #}
{# wf_published_on: 2017-11-27 #}

# Workbox CLI {: .page-title}

## Workbox CLI 是什么?

Workbox命令行（在`workbox-cli`包内）由workbox的NodeJS程序构成，可以运行在Windows、Mac和类UNIX环境下。workbox-cli包含了workbox-build模块，并提供了一个通过灵活配置，将Workbox集成到命令行构建过程的简单方法。

## 安装 CLI

安装这个CLI很简单，只需要在终端中运行以下命令。

- {npm}

      <pre class="devsite-terminal">
      npm install workbox-cli --global
      </pre>
    

- {Yarn}

      <pre class="devsite-terminal">
      yarn global add workbox-cli
      </pre>
    

## CLI模式

CLI有4个不同的模式：

- **wizard**:通过步骤向导为你的项目安装Workbox。
- **generateSW**: 生成一个完整的service worker。
- **injectManifest**: 将资源注入到你的项目预缓存中。
- **copyLibraries**: 复制Workbox库到指定目录。

### `wizard`

Workbox的wizard会询问你本地的安装目录和你想哪些文件预缓存的一系列问题。你的回答会生成一个配置文件，用于`generateSW`模式时使用。

大多数开发者只会运行一次workbox wizard，你可以使用任何构建配置支持的选项去手动修改初始化生成的配置文件。

使用wizard：

<pre class="devsite-terminal">
workbox wizard
</pre>

![Screenshot of Workbox CLI's wizard](../images/modules/workbox-cli/cli-wizard.png)

### `generateSW`

你可以使用Workbox CLI通过配置文件去生成完正的service woker（像通过wizard生成文件一样）。

只需要运行下面命令：

<pre class="devsite-terminal">
workbox generateSW path/to/config.js
</pre>

Workbox内置的预缓存和运行时缓存功能，不需要再去手动定制他们的service worker的行为，推荐使用`generateSW`模式。

{% include "web/tools/workbox/_shared/when-to-use-generate-sw.html" %}

### `injectManifest`

对于想要更多控制最终生成的service worker文件的开发者可以使用 `injectManifest `模式。这个模式需要你有一个存在的service worker文件（文件位置在config.js中指定）。

运行`workbox injectManifest`时，它会在你的源service worker文件中找指定的字符串（默认 `precaching.precacheAndRoute([])`。它将空数组替换为precache的URL列表，并将service worker写到`config.js`配置项中指定的目标位置。在源service worker文件中的其他代码保持不变。

可以这样使用：

<pre class="devsite-terminal">
workbox injectManifest path/to/config.js
</pre>

{% include "web/tools/workbox/_shared/when-to-use-inject-manifest.html" %}

### `copyLibraries`

如果你想使用`injectManifest`模式，并且想把Workbox库托管到你自己的源而不是Workbox CDN上，那么这个模式很有用。

你运行的时候，只需要提供写入路径：

<pre class="devsite-terminal">
workbox copyLibraries third_party/workbox/
</pre>

## 构建流程集成

### 为什么Workbox需要与我的构建过程集成？

Workbox项目包含了需要库，它们共同为你的Web App的service worker提供能力。为了有效的去使用这些库，Workbox需要集成到你Web App构建过程中。去确保你的[service worker](/web/fundamentals/primers/service-workers/)能够有效的去预缓存你Web App上的所有关键的内容，并保持内容数据最新。

### 构建过程中`workbox-cli`是正确选择么？

如果你现在的构建流程是基于[npm 脚本](https://docs.npmjs.com/misc/scripts)的，那么`workbox-cli`是一个不错的选择。

如果你当前使用[Webpack ](https://webpack.js.org/)做为构建工具，那么使用 [workbox-webback-plugin ](./workbox-webpack-plugin)是一个更好的选择。

如果你当前使用[Gulp](https://gulpjs.com/)、[Grunt](https://gruntjs.com/)或者一些其他基于Node.js构建的工具，那么几成[workbox-build](./workbox-build)到你的构建脚本中是一个不错的选择。

如果你没有构建过程，那么在进行workbox预处理之前你需要选一个。记住，手动运行workbox可能会出一些错，因忘记运行而导致访问者看到的是旧的内容。

### 安装和配置

`workbox-cli`作为你项目的开发依赖进行[安装](#install_the_cli)后，您可以在现有构建过程的npm脚本末尾添加`workbox`的调用：

package.json:

```
{
  "scripts": {
    "build": "my-build-script && workbox <mode> <path/to/config.js>"
  }
}
```

使用`generateSW`或者`injectManifest`（取决于你的使用方式）来替换`<mode>`，你的配置文件的路径来替换`<path/to/config.js>`。你的配置文件可由`workbox wizard`创建或是手动调整。

## 配置

### `generateSW`使用的配置项

下面**只**是`generateSW`使用的配置项列表。

{% with anchor_prefix="generateSW-" %}


<table class="responsive">
  <tbody>
    <tr>
      <th colspan="2">这些配置项只适应于`generateSW`.</th>
    </tr>
{% include "web/tools/workbox/_shared/config/groups/common-generate-schema.html" %}
  </tbody>
</table>
{% endwith %}


### `injectManifest`使用的配置项

下面**只**是`injectManifest` 命令使用的配置项。

{% with anchor_prefix="injectManifest-" %}


<table class="responsive">
  <tbody>
    <tr>
      <th colspan="2">这些配置项只适应于`injectManifest`.</th>
    </tr>
{% include "web/tools/workbox/_shared/config/groups/common-inject-schema.html" %}
{% include "web/tools/workbox/_shared/config/groups/build-inject-schema.html" %}
  </tbody>
</table>
{% endwith %}


### 两者都使用的配置项

两者都使用的配置项。

{% with anchor_prefix="common-" %}


<table class="responsive">
  <tbody>
    <tr>
      <th colspan="2">`generateSW` and `injectManifest`均使用</th>
    </tr>
{% include "web/tools/workbox/_shared/config/single/swDest.html" %}
{% include "web/tools/workbox/_shared/config/groups/base-schema.html" %}
  </tbody>
</table>
{% endwith %}

