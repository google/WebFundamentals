project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:分析网络性能入门。

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2017-01-17 #}
{# wf_blink_components: Platform>DevTools #}

<style>
.devtools-inline {
  max-height: 1em;
  vertical-align: middle;
}
figcaption {
  text-align: center;
}
</style>

# 使用 Chrome DevTools 分析网络性能入门 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

注：如需了解提高加载速度的综合方法，请参阅[优化网站速度](/web/tools/chrome-devtools/speed/get-started)。
 本教程包含用于分析加载性能的推荐工作流程。


在本交互式分步教程中，您将学习如何使用 Chrome DevTools 的 Network 面板，了解页面加载缓慢的原因。


## 第 1 步：设置 DevTools {: #set-up }

假设移动设备用户向您举报您网站上的特定页面加载缓慢，
 那么您就需要提高页面加载速度。

1. 点击 **Open Slow Page**。 此页面会在新标签中打开。

     <a href="https://googlechrome.github.io/devtools-samples/network/gs/v1.html"
       target="devtools" class="gc-analytics-event" rel="noopener noreferrer"
       data-category="DevTools / Network / Get Started"
       data-label="Slow Page Opened">
       <button>Open Slow Page</button>
     </a>

1. 在页面处于焦点状态时，按
   <kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>I</kbd> (Mac) 或
   <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd>（Windows、Linux）以在此页上打开 DevTools。


1. 在 DevTools 中，点击 **Network** 标签。

     <figure>
       <img src="imgs/get-started-network-panel.png"
         alt="在要诊断的加载缓慢的页面上打开的 Chrome DevTools Network 面板。">

       <figcaption>
         <b>图 1</b>. 在要诊断的加载缓慢的页面旁打开的 Chrome DevTools Network 面板。

       </figcaption>
     </figure>

     <aside class="note">
       <b>注：</b>在其余的屏幕截图中，DevTools 已<a       href="/web/tools/chrome-devtools/ui#placement" target="_blank">

       移除到单独的窗口</a>中，以便您更好地查看其内容。

     </aside>

1. 启用 **Capture Screenshots** ![捕获屏幕截图][screenshots]
{:.devtools-inline}，此图标启用后变为蓝色。
   DevTools 会在页面加载期间捕获屏幕截图。

## 第 2 步：模拟移动设备用户的体验 {: #emulate }

在笔记本电脑或桌面设备上测试网络性能可能无法模拟移动设备用户的体验。 您的互联网连接速度比移动设备用户快得多，并且您的浏览器在之前访问时曾缓存资源。



1. 勾选 **Disable Cache** 复选框。 启用此复选框后，DevTools 不会传送任何缓存资源。
   如此可以更准确地模拟新用户查看您页面时的体验。


1. 在当前显示 **No Throttling** 的下拉菜单中，选择 **Regular 2G**。
 DevTools 会限制网络连接速度，以模拟普通 2G 体验。
 这才是移动设备用户在网络连接不佳的环境下获得的网站体验。


<figure>
  <img src="imgs/get-started-setup.svg"
    alt="设置屏幕截图、停用缓存和限制后的 Chrome DevTools Network 面板。">

  <figcaption>
    <b>图 2</b>. 经设置可模拟移动设备用户体验的 Chrome DevTools Network 面板。
 屏幕截图、停用缓存和限制按从左到右的顺序分别添加了蓝色边框。


  </figcaption>
</figure>

这是最差的设置。 如果您可以在这样的设置环境下提高页面加载速度，您所有用户的页面加载速度都会提高！


[screenshots]: imgs/capture-screenshots.png

## 第 3 步：分析请求 {: #analyze }

通过重新加载页面并分析传入的请求，确定导致页面加载缓慢的因素。


### A 部分：查找阻塞渲染的脚本

当浏览器遇到 `<script>` 标记时，必须立即暂停渲染，并执行脚本。
 查找页面加载不需要的脚本，并将其标记为异步或延迟其执行时间，以缩短页面加载时间。


1. 按 <kbd>Command</kbd>+<kbd>R</kbd> (Mac) 或
   <kbd>Control</kbd>+<kbd>R</kbd>（Windows、Linux）以重新加载页面。
   在正常的 Wi-Fi 连接环境下，页面需要 10 多秒才能完整加载。


     <figure>
       <img src="imgs/get-started-post-load.png"
         alt="重新加载页面后的 Chrome DevTools Network 面板。">
       <figcaption>
         <b>图 3</b>. 重新加载页面后的 Chrome DevTools Network 面板。

       </figcaption>
     </figure>

1. 注意 Network 面板底部 [Summary
窗格](reference#summary)中的 [`DOMContentLoaded`][DOMContentLoaded] 值。
   您看到的值至少应该是 4 秒。 当您看到此事件像这样延迟触发时，需注意查找延迟主文档加载和解析的脚本。



1. 点击 **main.js** 以进一步调查该请求。 DevTools 会显示一组新标签，提供有关此请求的更多信息。


1. 点击 **Preview** 标签以查看此请求的源代码。 您会看到此脚本挂起 4000 毫秒。
   通过使用 `async` 属性标记此脚本，并将其移到文档的 `<body>` 底部，让页面无需等待此脚本即可进行加载。



     <figure>
       <img src="imgs/get-started-preview.png"
         alt="在 Preview 窗格中查看 main.js 的源代码。">
       <figcaption>
         <b>图 4</b>. 在 Preview 窗格中查看 <code>main.js</code> 的源代码。

       </figcaption>
     </figure>

如需了解有关阻塞渲染的脚本的更多信息，请参阅[解析器阻止 JavaScript 与异步 JavaScript][async]。


### B 部分：查找较大的请求

加载页面时，您是否发现 DevTools 徽标需要较长的加载时间？
徽标加载不会阻塞加载，但会使页面*显示*迟缓。
 用户喜欢快速*显示*的页面。

1. 点击 **Close** ![关闭][close]，{:.devtools-inline} 以便再次查看
[**Requests 窗格**](reference#requests)。

1. 双击左上方的屏幕截图。

1. 按右箭头键以浏览整组屏幕截图。 屏幕截图下面的时间表示截取屏幕截图的时间。
 加载屏幕截图需要几秒钟。
 这意味着文件可能很大。


1. 点击屏幕截图外部的任意位置以使其最小化。

1. 将鼠标指针悬停在 `logo-1024px.png` 请求的[瀑布图](reference#waterfall)上。
 此请求的大部分时间都用在下载图像上。
 这表明图像过大。

     <figure>
       <img src="imgs/get-started-waterfall.png"
         alt="logo-1024px.png 的瀑布图。">
       <figcaption>
         <b>图 5</b>. <code>logo-1024px.png</code> 的瀑布图。
       </figcaption>
     </figure>

[DOMContentLoaded]: https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded

[async]: /web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript#parser_blocking_versus_asynchronous_javascript

[close]: imgs/close.png 

## 第 4 步：在更新页面上验证修正方法 {: #verify }

您即将完成工作。 现在假定您已在页面上完成以下两项更改操作：


* 您已将脚本移到 `<body>` 底部，并将其标记为 `async`，以防脚本阻塞页面加载。
* 您已将徽标转换为 SVG 以缩小其大小。

接下来就是测试更新页面，以验证您的修正方法是否真的可以加快页面加载速度。


1. 点击 **Open Fast Page**。 修复的页面将在新标签中打开。

     <a href="https://googlechrome.github.io/devtools-samples/network/gs/v2.html"
       target="devtools" class="gc-analytics-event" rel="noopener noreferrer"
       data-category="DevTools / Network / Get Started"
       data-label="Fast Page Opened">
       <button>Open Fast Page</button>
     </a>

1. 采用与之前相同的方式设置 DevTools。 应启用屏幕截图和停用缓存这两项功能，并且应将网络节流值设置为 **Regular 2G**。

1. 重新加载页面。 此时，页面加载速度要快得多。

     <figure>
       <img src="imgs/get-started-post-fix.png"
         alt="应用修正方法后的页面加载记录。">
       <figcaption>
         <b>图 6</b>. 应用修正方法后的页面加载记录。
 此页面过去需要 10 秒左右才能完整显示，
 而现在只需 1 秒左右。
       </figcaption>
     </figure>

<aside class="note">
  <b>注</b>：尽管此页面加载速度提高，但在 5 秒内仍不可使用。
 这是因为该页面仍要运行挂起页面主线程的脚本。

</aside>

## 后续步骤 {: #next-steps }

做得好！ 现在您是真正的 Chrome DevTools Network 面板专家了。
 或许 还不是专家， 但您的确拥有扎实的知识和技能基础。


* 如需了解有关超快页面加载理论的更多信息，请参阅<a class="gc-analytics-event" data-category="DevTools / Network /  Get Started" data-label="Next Steps / CRP"  href="/web/fundamentals/performance/critical-rendering-path">关键渲染路径</a>。
* 如需了解如何找出更多网络问题，请参阅<a class="gc-analytics-event" data-category="DevTools / Network /  Get Started" data-label="Next Steps / Issues Guide" href="issues">网络问题指南</a>。
* 如需获取 Network 面板功能的完整列表，请参阅<a class="gc-analytics-event" data-category="DevTools / Network /
  Get Started" data-label="Next Steps / Reference" href="reference">Network
面板参考</a>。

## 反馈 {: #feedback }

{% include "web/_shared/helpful.html" %}
