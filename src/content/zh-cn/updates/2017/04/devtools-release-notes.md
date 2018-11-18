project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Chrome 59 中添加到 DevTools 的新功能和变更。

{# wf_updated_on: 2017-04-12 #}
{# wf_published_on: 2017-04-12 #}
{# wf_tags: chrome59,devtools #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: Chrome 59 中添加到 DevTools 的新功能和变更。 #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# DevTools 更新点 (Chrome 59) {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

欢迎来到新一期的 DevTools 更新日志。观看下面的视频或者继续阅读以了解 Chrome 59 中 DevTools 的新功能。

提示：你可以访问 `chrome://help` 来查看当前使用的 Chrome 版本。

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="4mx1m7UbBR0"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

## 亮点 {: #highlights }

* [**CSS 和 JS 代码覆盖率**](#coverage)。通过新增的覆盖率面板来发现未使用的 CSS 与 JS。
* [**完整的页面截图**](#screenshots)。截取一张从视图最顶端到最底端的页面快照。
* [**禁用请求**](#block-requests)。在网络面板中可以手动禁用某条请求。
* [**调试 async await**](#async)。连贯地调试 async await。
* [**统一的命令面板**](#command-menu)。将命令执行与文件打开的菜单面板进行了整合。
* [**Workspaces 2.0**](#workspaces)。全新的 Workspace 2.0 让写码更愉快。

## 新功能 {: #new-features }

### CSS 和 JS 代码覆盖率 {: #coverage }

通过新增的**覆盖率**面板来发现未使用的 CSS 与 JS 代码。页面或代码加载后，此面板内会告诉你哪些代码未使用，哪些又是使用了的。这样可以精简掉未使用的代码来减小页面的大小。

<figure>
  <img src="/web/updates/images/2017/04/coverage.png"
       alt="The Coverage tab"/>
  <figcaption>
    <b>图 1</b>。代码覆盖率面板
  </figcaption>
</figure>

要打开此面板：

1. 呼出[命令面板][CM]。
1. 输入 `Coverage` 选择 **Show Coverage**。

[CM]: /web/tools/chrome-devtools/ui#command-menu

### 完整的页面截图 {: #screenshots }

观看以下视频来了解如何截取页面的完整快照，从顶部一直滚动到页面最底那种截图。

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="r_6_9eFPhxI"
      data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

### 禁用请求 {: #block-requests }

想看看当某些脚本、样式文件缺少或者其他资源加载失败时，网页的样子吗？在**网络面板**对某条请求右击选择 **Block Request URL**。一个新的 **禁用请求** 面板会被呼出，在这里可以管理被禁用的请求。

<figure>
  <img src="/web/updates/images/2017/04/block-request-url.png"
       alt="Block Request URL"/>
  <figcaption>
    <b>图 2</b>。禁用请求
  </figcaption>
</figure>

### 调试 async await {: #async }

一直以来，想要调试类似下面这样的代码是件很头疼的事。当你断在 `test()` 里面时，继续调试，会被 `setInterval()` 而打断。在新版中再来调试 `test()` 就不一样了，可以一口气从第一行连续地断到最后一行。

    function wait(ms) {
      return new Promise(r => setTimeout(r, ms)).then(() => "Yay");
    }
    
    // do some work in background.
    setInterval(() => 42, 200);
    
    async function test() {
      debugger;
      const hello = "world";
      const response = await fetch('index.html');
      const tmp = await wait(1000);
      console.log(tmp);
      return hello;
    }
    
    async function runTest() {
      let result = await test();
      console.log(result);
    }

P.S. 想提高调试水平吗？看看这些资源：

* [Get Started With Debugging JS](/web/tools/chrome-devtools/javascript/)
* [Pause Your Code With Breakpoints][breakpoints]
* [JS Debugging Reference](/web/tools/chrome-devtools/javascript/reference)

[breakpoints]: /web/tools/chrome-devtools/javascript/breakpoints

### Workspaces 2.0 {: #workspaces }

平时当作编辑器来用的 Workspaces，或者叫 Persistence  在新版中进行了改进，升级为2.0。

1. 切换到 **Sources** 面板。
1. 点击 **Filesystem** 标签。
1. 点击 **Add folder to workspace**。
1. 选择你代码所在的文件夹。
1. 点击 **Allow** 来让 DevTools 获得文件读写权限。

DevTools 自动地将文件系统中的文件映射到网络请求中的文件，无须再一条一条手动地添加映射了。

<figure>
  <img src="/web/updates/images/2017/04/workspaces2.png"
       alt="A network file mapped to the filesystem"/>
  <figcaption>
    <b>图 3</b>。 <code>(index)</code> 文件的绿点表示他被映射到了文件系统中。
  </figcaption>
</figure>

## 变更点 {: #changes }

### 统一的命令面板 {: #command-menu }

现在打开 [命令面板][CM] ，你会发现输入框中自动添加了一个大于号 (`>`)。这是因为命令面板与通过 <kbd>Command</kbd>+<kbd>O</kbd> (Mac) 或者 <kbd>Control</kbd>+<kbd>O</kbd>
(Windows, Linux) 呼出的**文件打开**菜单面板进行了合并。
