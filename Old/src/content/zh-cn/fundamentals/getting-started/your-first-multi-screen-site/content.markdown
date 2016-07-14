---
title: "创建你的内容和结构"
description: "内容是任何网站最重要的部分。在这个手册中，我们会教给你怎样快速规划搭建你的首个多设备站点。"
notes:
  styling:
    - 样式很快就能看到
updated_on: 2014-04-23
translators:
  - samchen
related-guides:
  create-amazing-forms:
    -
      title: 创建出彩的表单
      href: fundamentals/input/form/
      section:
        id: user-input
        title: "表单"
        href: fundamentals/input/form/
    -
      title: 给输入框正确的标签及命名
      href: fundamentals/input/form/label-and-name-inputs
      section:
        id: user-input
        title: "表单"
        href: fundamentals/input/form/
    -
      title: 选择最佳的输入框类型
      href: fundamentals/input/form/choose-the-best-input-type
      section:
        id: user-input
        title: "表单"
        href: fundamentals/input/form/
  video:
    -
      title: 有效利用视频
      href: fundamentals/media/video/
      section:
        id: introduction-to-media
        title: "视频"
        href: fundamentals/media/
    -
      title: 改变起始播放位置
      href: fundamentals/media/video/add-a-video#specify-a-start-and-end-time
      section:
        id: introduction-to-media
        title: "视频"
        href: fundamentals/media/
    -
      title: 包含招贴画
      href: fundamentals/media/video/add-a-video#include-a-poster-image
      section:
        id: introduction-to-media
        title: "视频"
        href: fundamentals/media/
  images:
    -
      title: 有效利用图片
      href: fundamentals/media/images/
      section:
        id: introduction-to-media
        title: "图片"
        href: fundamentals/media/
    -
      title:  标记中图片的正确使用
      href: fundamentals/media/images/images-in-markup
      section:
        id: introduction-to-media
        title: "图片"
        href: fundamentals/media/
    -
      title: 图片优化
      href: fundamentals/performance/optimizing-content-efficiency/image-optimization
      section:
        id: introduction-to-media
        title: "图片"
        href: fundamentals/media/

key-takeaways:
  content-critical:
    - 首先确定你需要的内容。
    - 为窄的、宽的视口勾画信息架构 (IA)。
    - 创建一个只有内容、无样式的页面概略。
---

<p class="intro">
  内容是任何网站最重要的部分。所以让我们为内容而设计，而不要让设计支配内容。在这个手册中，我们首先确定我们需要的内容，基于这个内容创建一个页面结构，然后在简单的线性布局里呈现页面，无论窄、宽视口，均能运行良好。
</p>

{% include shared/toc.liquid %}

## 创建页面结构

我们确定了我们需要：

1.  一块区域，从高层次介绍我们的“CS256：移动 web 开发”课程
2.  一个表单，用于收集对我们产品感兴趣的用户信息
3.  一个深入的描述和视频
4.  运转中的产品照片
5.  一张数据表信息，支撑以上说法

{% include shared/takeaway.liquid list=page.key-takeaways.content-critical %}

我们也拿出了窄、宽视口下粗略的信息架构和布局。

<div class="demo clear" style="background-color: white;">
  <img class="mdl-cell mdl-cell--6--col" src="images/narrowviewport.png" alt="窄视口 IA">
  <img  class="mdl-cell mdl-cell--6--col" src="images/wideviewport.png" alt="宽视口 IA">
</div>

这就可以轻松转化出基础页面的大体分块，我们将在这个项目的剩下部分使用。

{% include_code src=_code/addstructure.html snippet=structure %}

## 添加页面内容

页面的基本结构已经完成。我们也知道自己需要哪些分块，分块要展示哪些内容，以及整体信息架构中怎样摆放分块。现在我们可以开始扩建站点了。

{% include shared/remember.liquid title="Note" inline="true" list=page.notes.styling %}

### 创建标题与表单

我们的页面中，标题和通告登记表单是关键组成。它们必须马上呈现给用户。

在标题中，添加简单文本来描述课程：

{% include_code src=_code/addheadline.html snippet=headline %}

我们也需要填好表单。这是一个简单的表单，用于收集用户的名字，电话号码，以及何时回复他们。

所有的表单都应该有标签和占位符，这样用户容易理解它们的用途，也有助可访问性工具理解表单结构。name 属性不仅会发送表单值到服务端，它同样是浏览器的重要参考，比如如何为用户自动填写表单。

我们将添加语义化类型的输入框，用户在移动设备上可以更快、更便捷地输入内容。比如说，输入电话号码时，用户只需要看见拨号面板。

### 创建视频和信息分块

内容的视频和信息分块较为深入。它有一个列表，点出我们的产品特性，还包括一个视频，展示我们的产品怎样适用用户。

{% include_code src=_code/addcontent.html snippet=section1 %}

视频在叙述内容时，通常交互性更强，因此经常用来展示产品或概念演示。

跟随以下最佳实践，你能轻松把视频整合到网站上：

*  添加 `controls` 属性，让用户轻松播放视频。
*  添加 `poster` 图片，让用户预览到内容。 
*  根据所支持的视频格式添加多个 `<source>` 元素。
*  添加备选文本，如果用户在窗口中无法播放视频，就让他们下载。

{% include_code src=_code/addvideo.html snippet=video lang=html %}

{% include shared/related_guides.liquid inline=true list=page.related-guides.video %}

### 创建图片分块

一个没有图片的站点会有些无趣。有两类图片：

*  内容图片 &mdash; 内联在文档中，用于传达内容的额外信息。
*  样式图片 &mdash; 用于点缀站点，让站点更好看的图片；通常是背景图片，图案和渐变。我们将在[下一节]({{page.nextPage.relative_url}})聊到。

我们的页面的图片分块是一些内容图片。

内容图片在传达页面意思时至关重要。把它们想象成新闻中的图片。我们用到的图片，是项目的导师照片：Chris Wilson, Peter Lubbers and Sean Bennet。

{% include_code src=_code/addimages.html snippet=images lang=html %}

图片被设置为 100% 屏幕宽度。在窄视口设备上，这效果不差，但宽视口 (比如桌面) 中效果就会不佳。我们会在响应式设计中解决这个。

{% include shared/related_guides.liquid inline=true list=page.related-guides.images %}

有许多人视力有障碍看不见图片，通常他们会使用辅助技术，比如屏幕阅读器来分析页面数据，然后语音读出。你应该确保你所有的内容图片都带有一个描述性的 `alt` 标签，屏幕阅读器可以读给用户。

在添加 `alt` 标签时，请确保你的 alt 文本跟完整描述图片一样精确。比如在我们的示例中，我们给 alt 属性添加的是 "Name: Role"，这给了用户足够信息，知道这是关于作者，以及他们的职业。

### 添加表格数据分块

最后一个分块，是一个简单的表格，展示具体产品的统计数据。

表格仅应该用于展示列表数据，即矩阵数据。

{% include_code src=_code/addcontent.html snippet=section3 %}

### 添加一个页脚

大部分网站都需要一个页脚，显示一些条款声明及其他不该放入页面主要导航部分或主要内容区域的东西。

我们的站点上，我们链接一个条款声明，一个联系页面，以及我们的社交媒体资料。

{% include_code src=_code/addcontent.html snippet=footer %}

## 总结

我们已经构建好站点轮廓，也已确认所有主要的结构元素。还确保我们的所有相关内容准备就绪，能够满足我们的商业需求。

<div class="mdl-grid">
  <img class="mdl-cell mdl-cell--6--col" src="images/content.png" alt="Content">
  <img  class="mdl-cell mdl-cell--6--col" src="images/narrowsite.png" alt="">
</div>

你会注意到，现在页面看起来非常糟糕；这其实是故意的。内容是所有页面最重要的组成，我们需要确保我们有一个坚实的信息架构和密度。本手册给我们打下良好的基础。我们将在下一节中样式化内容。


