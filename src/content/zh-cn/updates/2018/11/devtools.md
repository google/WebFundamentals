project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: 性能指标可视化，突出显示文本节点， 将JS路径复制到DOM节点，及审核面板更新。

{# wf_updated_on: 2018-11-29 #}
{# wf_published_on: 2018-11-27 #}
{# wf_tags: chrome72, devtools, devtools-whatsnew #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: 性能指标可视化，突出显示文本节点， 将JS路径复制到DOM节点，及审核面板更新。 #}
{# wf_blink_components: Platform>DevTools #}

# DevTools 更新点 (Chrome 72) {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Note: 我们将会在2019年2月初发布DevTools 更新日志的视频。

Chrome 72 中添加到 DevTools 的新功能和变更：

- 在性能面板中[显示性能指标](#metrics)。
- [突出显示DOM树中的文本节点](#highlight)。
- [将JS路径从DOM树复制到DOM节点](#copy) 。
- [审核面板更新](#audits)，包括了检测JavaScript库的新审核功能，以及可以从命令菜单中开启审核面板。

## 性能指标可视化 {: #metrics }

[录制页面加载](/web/tools/chrome-devtools/speed/get-started)后，DevTools现在将会在**Timings**部分中标志着性能指标，例如`DOMContentLoaded`和[首次有意义绘制](/web/fundamentals/performance/user-centric-performance-metrics#first_meaningful_paint_and_hero_element_timing)。

<figure>
  <img src="/web/updates/images/2018/11/metrics.png" alt="First Meaningful Paint in the Timing section">
  <figcaption>
    <b>Figure 1</b>.  Timing部分里的首次有意义绘制
  </figcaption>
</figure>

## 突出显示文本节点 {: #highlight }

当您将鼠标悬停在DOM树中的文本节点上时，DevTools现在会在视口中突出显示该文本节点。

<figure>
  <img src="/web/updates/images/2018/11/text.png" alt="Highlighting a text node">
  <figcaption>
    <b>Figure 2</b>. 突出显示文本节点 </figcaption>
</figure>

## 复制JS路径 {: #copy }

打个比方，您正在编写一个涉及单击节点的自动化测试(或许您是使用着Puppeteer的[`page.click()`](https://pptr.dev/#?product=Puppeteer&version=v1.9.0&show=api-pageclickselector-options){: .external }函数)，然后您希望能快速的获得该DOM节点的引用，通常的流程是在元素面板里，右键单击DOM树中的节点，然后选择 **Copy** >  **Copy selector**，然后将该CSS选择器传递到`document.querySelector()`。但是，如果该节点是在[Shadow DOM](/web/fundamentals/web-components/shadowdom){: .external }里，这个方法将起不了作用，这是因为选择器将会从shadow tree中产生一个路径。


您可以在DOM节点中点击右键，并选择**Copy** > **Copy JS path**。这可以快速地获得该在DOM节点的参考。DevTools将会把指向节点的`document.querySelector()`表达式复制到剪贴板。如上所述，这将会在您使用Shadow DOM或者是其他的DOM节点的时候，带来许多的帮助。

<figure>
  <img src="/web/updates/images/2018/11/copyjs.png" alt="Copy JS path">
  <figcaption>
    <b>Figure 3</b>. 复制JS路径 </figcaption>
</figure>

DevTools将会把像下面的表达式复制到剪贴板：

```
document.querySelector('#demo1').shadowRoot.querySelector('p:nth-child(2)')
```

## 审核面板更新 {: #audits }

审核面板现在正在运行[Lighthouse 3.2](https://github.com/GoogleChrome/lighthouse/releases/tag/v3.2.0){: .external }。版本3.2中包含了一个名为**检测JavaScript库**的新审核功能。这审核将会把Lighthouse检测到的JavaScript库所列出来。您可以在**Best Practices** > **Passed audits**里的报告中找到此审核。

<figure>
  <img src="/web/updates/images/2018/11/libs.png" alt="Detected JavaScript libraries">
  <figcaption>
    <b>Figure 4</b>. 检测JavaScript库
  </figcaption>
</figure>

此外，您现在可以从命令菜单中输入`Lighthouse` 或`PWA`来开启审核面板。

<figure>
  <img src="/web/updates/images/2018/11/lighthouse.png" alt="Typing 'lighthouse' into the Command Menu">
  <figcaption>
    <b>Figure 5</b>. 在命令菜单中输入<code>lighthouse</code>
  </figcaption>
</figure>

## 反馈 {: #feedback }

{% include "web/_shared/helpful.html" %}

若您是要讨论本文章中的新功能和变更，或与DevTools相关的任何其他的内容，您可以：

- 在[Chromium Bugs](https://crbug.com){:.external}提交错误报告。
- 在[邮件列表](https://groups.google.com/forum/#!forum/google-chrome-developer-tools)里讨论新功能和变更。 请不要在邮件列表里发问支持问题，请在Stack Overflow中发问。
- 在[Stack Overflow](https://stackoverflow.com/questions/tagged/google-chrome-devtools){:.external}获取有关如何使用DevTools的帮助。如果您要提交错误报告，请在Chromium Bugs提交，不要在Stack Overflow提交错误报告。
- 在[@ChromeDevTools](https://twitter.com/chromedevtools) tweet我们。
- 在[Web Fundamentals](https://github.com/google/webfundamentals/issues/new)的repository中提交这文章的任何的错误。

## 尝试Canary版 {: #canary }

如果您使用着Mac或者Windows, 您可以考虑将[Chrome Canary](https://www.google.com/chrome/browser/canary.html)版当成您的默认开发游览器。 Canary版能让您尝试到DevTools最新的功能。

Note: Canary版是在测试前就推出的版本。这代表Canary版是非常不稳定的，bug应该还是蛮多的，但是通常bug都会在同一天被修复好。如果Canary版因为bug而无法使用，您可以用回Stable版。

<</web/updates/_shared/discover.md>>

{% include "web/_shared/rss-widget-updates.html" %}
