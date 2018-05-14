project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 利用 alt 属性提供图像的替代文本


{# wf_updated_on:2016-10-04 #}
{# wf_published_on:2016-10-04 #}

# 图像的替代文本 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/aliceboxhall.html" %}



图像是大多数网页的重要组成部分，当然也是对弱视用户造成阻碍的一个特定因素。
我们必须考虑图像在网页中发挥的作用，才能知道应该为其使用什么类型的替代文本。请看下面这幅图像。



    <article>
      <h2>Study shows 9 out of 10 cats quietly judging their owners as they sleep</h2>
      <img src="imgs/160204193356-01-cat-500.jpg">
    </article>

<article>
  <h2>Study shows 9 out of 10 cats quietly judging their owners as they sleep</h2>
  <img src="imgs/160204193356-01-cat-500.jpg">
</article>

我们在网页中看到的是一幅猫的图片，是一篇有关猫著名的审判行为的文章插图。
屏幕阅读器可以利用这幅图像的文字名称 `"/160204193356-01-cat-500.jpg"` 叙述对其的说明。
这样做虽然准确，却毫无用处。


可以利用 `alt` 属性为这幅图像提供有用的替代文本，例如“一只目光汹汹凝视远方的猫”。


    <img src="/160204193356-01-cat-500.jpg" alt="一只目光汹汹凝视远方的猫">

然后屏幕阅读器就可以叙述对图像的简洁说明（可在黑色旁白栏中看到），用户可以选择是否继续阅读下一篇文章。



![一幅包含经过改善的替代文本的图像](imgs/funioncat2.png)

以下是有关 `alt` 的两个注解：

 - `alt` 允许指定在图像不可用时（例如图像加载失败、被网络爬虫访问或被屏幕阅读器读取时）使用的简单字符串。
 - `alt` 不同于 `title` 或任何类型的字幕，因为它*只*在图像不可用时使用。


编写有用的替代文本算得上是门学问。要想让字符串成为有用的替代文本，它必须在同一环境下传达与图像相同的概念。



以上图所示网页报头中的链接徽标图像为例。我们可以将这幅图像相当准确地描述成“The Funion 徽标”。


    <img class="logo" src="logo.jpg" alt="The Funion 徽标">

可能很容易为它指定一个“首页”或“主页”这样更简单的替代文本，但这样做对弱视和正常视力的用户都不够周到。


但假使一位屏幕阅读器用户想要找到网页上的报头徽标；如果为其指定的 alt 值是“首页”，实际带来的体验会更令人困惑。视力正常的用户也面临同样的挑战，与屏幕阅读器用户一样，他们也要弄明白点击网站徽标的作用。


另一方面，描述图像并不总是有用。例如，假定在一个包含文本“搜索”的搜索按钮内有一幅放大镜图像。如果其中不包含文本，您肯定会指定“搜索”作为这幅图像的 alt 值。
但由于文本处于可见状态，屏幕阅读器将拾取并朗读“搜索”一词；因此，图像上完全相同的 `alt` 值就成了多余的内容。



不过，我们也知道，如果将 `alt` 省略，我们听到的很可能不是替代文本，而是图像文件名，这不仅毫无用处，还可能令人困惑。
在这种情况下，只需使用空的 `alt` 属性就可让屏幕阅读器将图像整个跳过。



    <img src="magnifying-glass.jpg" alt="">

总结一下，所有图像都应有 `alt` 属性，但它们无需都包含文本。
重要的图像应使用描述性替代文本简洁地说明图像内容，而装饰性图像应使用空的 alt 属性，即 `alt=""`。




{# wf_devsite_translation #}
