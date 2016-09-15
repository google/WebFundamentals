project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 从小屏幕手机到大屏幕电视，许多设备都能访问 web。学习怎样构建一个在所有这些设备上均运行良好的站点。

{# wf_review_required #}
{# wf_updated_on: 2014-01-05 #}
{# wf_published_on: 2013-12-31 #}

# 你的首个多设备站点 {: .page-title }

{% include "web/_shared/contributors/paulkinlan.html" %}


Translated By: 

{% include "web/_shared/contributors/samchen.html" %}



构建多设备体验并没有听起来那么难。跟着这个指导，我们将给我们的<a href='https://www.udacity.com/course/cs256'>CS256 移动 web 开发课程</a>创建一个示范的产品着陆页，它在所有不同类型设备上均运行良好。

<img src="images/finaloutput-2x.jpg" alt="各种设备上显示的最终项目">

给不同能力，且多数屏幕尺寸不一、操作方式各异的多种设备创建站点，不说完全不能，也着实让人畏惧。

不过，创建一个完全响应的站点并没有你想的那么难，后面你就能看到这点。这个指导会带你实践各个步骤，你可以由它们开始。我们将它分成两个简单步骤：

1. 定义页面的信息架构(通常所说的 IA)和页面结构，
2. 添加设计元素，让页面可响应，变得在所有设备上看起来都不错。



## 创建你的内容和结构 



Translated By: 




内容是任何网站最重要的部分。所以让我们为内容而设计，而不要让设计支配内容。在这个手册中，我们首先确定我们需要的内容，基于这个内容创建一个页面结构，然后在简单的线性布局里呈现页面，无论窄、宽视口，均能运行良好。


### 创建页面结构

我们确定了我们需要：

1.  一块区域，从高层次介绍我们的“CS256：移动 web 开发”课程
2.  一个表单，用于收集对我们产品感兴趣的用户信息
3.  一个深入的描述和视频
4.  运转中的产品照片
5.  一张数据表信息，支撑以上说法

### TL;DR {: .hide-from-toc }
- 首先确定你需要的内容。
- 为窄的、宽的视口勾画信息架构 (IA)。
- 创建一个只有内容、无样式的页面概略。


我们也拿出了窄、宽视口下粗略的信息架构和布局。

<div class="demo clear" style="background-color: white;">
  <img class="mdl-cell mdl-cell--6--col" src="images/narrowviewport.png" alt="窄视口 IA">
  <img  class="mdl-cell mdl-cell--6--col" src="images/wideviewport.png" alt="宽视口 IA">
</div>

这就可以轻松转化出基础页面的大体分块，我们将在这个项目的剩下部分使用。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/getting-started/your-first-multi-screen-site/_code/addstructure.html" region_tag="structure" %}
</pre>

### 添加页面内容

页面的基本结构已经完成。我们也知道自己需要哪些分块，分块要展示哪些内容，以及整体信息架构中怎样摆放分块。现在我们可以开始扩建站点了。

Note: 样式很快就能看到

#### 创建标题与表单

我们的页面中，标题和通告登记表单是关键组成。它们必须马上呈现给用户。

在标题中，添加简单文本来描述课程：

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/getting-started/your-first-multi-screen-site/_code/addheadline.html" region_tag="headline" %}
</pre>

我们也需要填好表单。这是一个简单的表单，用于收集用户的名字，电话号码，以及何时回复他们。

所有的表单都应该有标签和占位符，这样用户容易理解它们的用途，也有助可访问性工具理解表单结构。name 属性不仅会发送表单值到服务端，它同样是浏览器的重要参考，比如如何为用户自动填写表单。

我们将添加语义化类型的输入框，用户在移动设备上可以更快、更便捷地输入内容。比如说，输入电话号码时，用户只需要看见拨号面板。

#### 创建视频和信息分块

内容的视频和信息分块较为深入。它有一个列表，点出我们的产品特性，还包括一个视频，展示我们的产品怎样适用用户。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/getting-started/your-first-multi-screen-site/_code/addcontent.html" region_tag="section1" %}
</pre>

视频在叙述内容时，通常交互性更强，因此经常用来展示产品或概念演示。

跟随以下最佳实践，你能轻松把视频整合到网站上：

*  添加 `controls` 属性，让用户轻松播放视频。
*  添加 `poster` 图片，让用户预览到内容。 
*  根据所支持的视频格式添加多个 `<source>` 元素。
*  添加备选文本，如果用户在窗口中无法播放视频，就让他们下载。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/getting-started/your-first-multi-screen-site/_code/addvideo.html" region_tag="video"   adjust_indentation="auto" %}
</pre>

{# include shared/related_guides.liquid inline=true list=page.related-guides.video #}

#### 创建图片分块

一个没有图片的站点会有些无趣。有两类图片：

*  内容图片 &mdash; 内联在文档中，用于传达内容的额外信息。
*  样式图片 &mdash; 用于点缀站点，让站点更好看的图片；通常是背景图片，图案和渐变。我们将在[下一节](#)聊到。

我们的页面的图片分块是一些内容图片。

内容图片在传达页面意思时至关重要。把它们想象成新闻中的图片。我们用到的图片，是项目的导师照片：Chris Wilson, Peter Lubbers and Sean Bennet。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/getting-started/your-first-multi-screen-site/_code/addimages.html" region_tag="images"   adjust_indentation="auto" %}
</pre>

图片被设置为 100% 屏幕宽度。在窄视口设备上，这效果不差，但宽视口 (比如桌面) 中效果就会不佳。我们会在响应式设计中解决这个。

{# include shared/related_guides.liquid inline=true list=page.related-guides.images #}

有许多人视力有障碍看不见图片，通常他们会使用辅助技术，比如屏幕阅读器来分析页面数据，然后语音读出。你应该确保你所有的内容图片都带有一个描述性的 `alt` 标签，屏幕阅读器可以读给用户。

在添加 `alt` 标签时，请确保你的 alt 文本跟完整描述图片一样精确。比如在我们的示例中，我们给 alt 属性添加的是 "Name: Role"，这给了用户足够信息，知道这是关于作者，以及他们的职业。

#### 添加表格数据分块

最后一个分块，是一个简单的表格，展示具体产品的统计数据。

表格仅应该用于展示列表数据，即矩阵数据。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/getting-started/your-first-multi-screen-site/_code/addcontent.html" region_tag="section3" %}
</pre>

#### 添加一个页脚

大部分网站都需要一个页脚，显示一些条款声明及其他不该放入页面主要导航部分或主要内容区域的东西。

我们的站点上，我们链接一个条款声明，一个联系页面，以及我们的社交媒体资料。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/getting-started/your-first-multi-screen-site/_code/addcontent.html" region_tag="footer" %}
</pre>

### 总结

我们已经构建好站点轮廓，也已确认所有主要的结构元素。还确保我们的所有相关内容准备就绪，能够满足我们的商业需求。

<div class="mdl-grid">
  <img class="mdl-cell mdl-cell--6--col" src="images/content.png" alt="Content">
  <img  class="mdl-cell mdl-cell--6--col" src="images/narrowsite.png" alt="">
</div>

你会注意到，现在页面看起来非常糟糕；这其实是故意的。内容是所有页面最重要的组成，我们需要确保我们有一个坚实的信息架构和密度。本手册给我们打下良好的基础。我们将在下一节中样式化内容。




## 使之响应 



Translated By: 




web 可以被各种设备访问，从小屏幕手机到大屏幕电视。每个设备都有它独有的优势，约束亦然。作为一个 web 开发者，人们期望你能支持各类设备。


我们正在创建一个多种设备屏幕大小、多种屏幕类型上均可运行良好的站点。在[上一节](#)，我们制订了页面信息架构，并创建一个基本结构。在这个手册里，我们将带着结构和内容，将其变成一个漂亮的页面，在各种屏幕大小上均能自在适应。

<div class="mdl-grid">
  <figure class="mdl-cell mdl-cell--6--col">
    <img  src="images/content.png" alt="Content">
    <figcaption><a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/getting-started/your-first-multi-screen-site/content-without-styles.html"> 内容和结构 </a> </figcaption>
  </figure>
  <figure class="mdl-cell mdl-cell--6--col">
    <img  src="images/narrowsite.png" alt="Designed site">
    <figcaption><a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/getting-started/your-first-multi-screen-site/content-with-styles.html"> 最终站点 </a> </figcaption>
  </figure>
</div>

根据移动先行的 web 开发原则，我们先从一个窄视口开始 &mdash; 相当于一个手机 &mdash; 先为其构建体验。然后我们再放大到更大的设备屏幕。通过增加 viewport 宽度，我们来决定设计及布局是否看起来正常。

前面我们创建了一些不一的高阶设计，用于展示我们的内容怎样摆放。现在我们需要让我们的页面适应这些不同布局。这是通过断点 &mdash; 一个改变布局和样式的转折点 &mdash; 来实现，而断点则基于内容与屏幕大小的适应情况。

### TL;DR {: .hide-from-toc }
- 始终使用 viewport。
- 始终从窄视口开始，之后再水平扩展。
- 断点取决于你何时要调整内容。
- 给所有主要断点创建一个布局的高阶构想。


### 添加一个 viewport

哪怕只是一个基本页面，你也**必须**包含一个 viewport 元标签。viewport 是你构建多设备体验最关键的部分。没有它，你的站点在移动设备上就不能运行良好。

viewport 指示浏览器，页面需要缩放以适应屏幕。有许多不同的配置项供你指定给 viewport，用于控制页面显示。我们推荐一个默认值：

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/getting-started/your-first-multi-screen-site/_code/viewport.html" region_tag="viewport" %}
</pre>

viewport 放在文档的头部，只需要声明一次。

{# include shared/related_guides.liquid inline=true list=page.related-guides.responsive #}

### 应用简单的样式

在某样式指南中，我们的产品和公司已经有明确的品牌及字体准则。

#### 样式指南

样式指南有助于从高层次理解页面的视觉展示，帮助确保你的设计的统一。

##### 颜色

<div class="styles" style="font-family: monospace;">
  <div style="background-color: #39b1a4">#39b1a4</div>
  <div style="background-color: white">#ffffff</div>
  <div style="background-color: #f5f5f5">#f5f5f5</div>

  <div style="background-color: #e9e9e9">#e9e9e9</div>
  <div style="background-color: #dc4d38">#dc4d38</div>
</div>

#### 添加样式化图片

在前面的手册中，我们添加了称为“内容图片”的图片。这些图片对于产品描述非常重要。样式化图片对内容核心来说，则并非必要，只是增添视觉效果或是帮助引导用户的注意力到内容的某特定部分。

一个较好的例子是“第一屏”内容的标题图片。通常用来诱惑用户更多地注意到产品。

<div class="mdl-cell mdl-cell--6--col">
  <img  src="images/narrowsite.png" alt="设计的站点">
</div>

要使用它们非常简单。在我们的案例中，它是个标题背景，我们通过简单的 CSS 就可以应用。


    #headline {
      padding: 0.8em;
      color: white;
      font-family: Roboto, sans-serif;
      background-image: url(backgroundimage.jpg);
      background-size: cover;
    }
    

我们选了一张简单的背景图，图片模糊过，不至于把内容比下去，我们让它 `cover` 整个元素；这样它会伸展开来，同时保持正确的纵横比。

<br style="clear: both;">

### 设置第一个断点

在 600px 宽时，设计开始显得糟糕。在我们的案例里，行的长度开始超过 10 个单词 (最佳阅读长度)，这就是我们要修改的地方。

<video controls poster="images/firstbreakpoint.png" style="width: 100%;">
  <source src="videos/firstbreakpoint.mov" type="video/mov"></source>
  <source src="videos/firstbreakpoint.webm" type="video/webm"></source>
  <p>抱歉你的浏览器不支持 video
     <a href="videos/firstbreakpoint.mov">下载视频</a>。
  </p>
</video>

600px 看起来是创建我们第一个断点的好地方，它给了我们空间，来重新定位元素，使它们更好地适应屏幕。我们通过[媒体查询](/web/fundamentals/design-and-ui/responsive/#use-css-media-queries-for-responsiveness)技术来达到目的：


    @media (min-width: 600px) {
    
    }
    

更大的屏幕上，有更多的空间，内容的摆放也就有更多的自由度。

Note: 你不需要一次移动所有元素，可以按需要做小的调整。

在我们的产品页下，看起来我们需要：

*  限制设计的最大宽度。
*  修改元素的内边距，减小文字大小。
*  浮动表单，使它跟页头内容并排。
*  让视频浮动起来，内容环绕。
*  缩小图片尺寸，在一个更佳的网格中显示。

{# include shared/related_guides.liquid inline=true list=page.related-guides.first-break-point #}

### 限制设计的最大宽度

我们已经决定只留两个大的布局：窄的视口和宽的视口，简化我们的构建过程。

我们也决定了，窄视口上的全出血部分，在宽视口上保持全出血。这意味着，我们需要限制屏幕的最大宽度，否则在极宽的屏幕上，文本和段落会扩展成一个极长的单行。我们选择了 800px 这个点。

为些，我们需要限制宽度，居中元素。我们需要创建一个包含块，将所有其它主要部分置入其中，然后应用一个 `margin: auto`。这允许屏幕增大，但内容保持居中，且最大宽度为 800px。

包含块是以下形式的一个简单 `div`：

    <div class="container">
    ...
    </div>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/getting-started/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="containerhtml"   adjust_indentation="auto" %}
</pre>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/getting-started/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="container"   adjust_indentation="auto" %}
</pre>

### 修改元素的内边距，减小文字大小

在窄视口上，我们没有大量的空间来显示内容，于是字体的大小与粗细通常都要大幅缩小来适应屏幕。

较大的视口的话，我们需要想到，用户很可能是在更大的屏幕上，但也距离更远。为了增加内容的可阅读性，我们可以增加字体大小和字体粗细，同时修改内边距，使得不同区域的区别更加明显。

在我们的产品页中，我们将增加 section 元素的内边距，让它保持在宽度的 5%。我们同时也增加各分块头部的字体大小。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/getting-started/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="padding"   adjust_indentation="auto" %}
</pre>

### 调整元素，适应宽视口

我们的窄视口是一个堆叠的线性展示。每个主分块及分块内容，都按从上到下的顺序排布。

宽视口给了我们更多的空间，针对该屏幕，有更好的展示内容的方法。对我们的产品页来说，根据我们的 IA，这意味着我们能够：

*  将表单移动到页头内容边。
*  定位视频到关键点右侧。
*  拼贴图片。
*  扩展表格。

#### 浮动表单元素

窄视口意味着，在水平方向上，我们没有足够的空间来舒适地摆放元素。

为了更有效地利用水平方向的屏幕空间，我们需要打破页头的线性流，移动表单，让它与列表并排。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/getting-started/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="formfloat"   adjust_indentation="auto" %}
</pre>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/getting-started/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="padding"   adjust_indentation="auto" %}
</pre>

<video controls poster="images/floatingform.png" style="width: 100%;">
  <source src="videos/floatingform.mov" type="video/mov"></source>
  <source src="videos/floatingform.webm" type="video/webm"></source>
  <p>抱歉你的浏览器不支持 video。
     <a href="videos/floatingform.mov">下载视频</a>。
  </p>
</video>

#### 浮动视频元素

窄视口中，视频撑满屏幕的宽度，并放置在重要特性列表后。宽视口中，视频会撑得太宽，这时还放置在特性列表后，看起来就会不对。

video 元素需要从窄视口的竖直流中移出，与列表内容并排显示。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/getting-started/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="floatvideo"   adjust_indentation="auto" %}
</pre>

#### 拼贴图片

窄视口 (大部分是移动设备) 中，图片设计为撑满屏幕宽度，并在垂直方向堆叠。宽视口上撑满就不太好了。

为了让图片在宽视口上看着正常，它们将其缩小到包含块的 30% 宽度，水平排布 (而不是窄视口中的垂直排布)。我们还添加了些边框圆角和盒阴影，让图片看起来更加吸引人。

<img src="images/imageswide.png" style="width:100%">

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/getting-started/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="tileimages"   adjust_indentation="auto" %}
</pre>

#### 让图片响应 DPI 

使用图片时，请同时考虑视口的大小以及显示的分辨率。

web 为 96dpi 的屏幕而建。但是随着移动设备的引入，我们看到屏幕的像素分辨率极大提升，更别说笔记本电脑上的高清显示屏。因此，编码成 96dpi 的图片在高分辨率设备上通常看起来非常糟糕。

我们有一个办法，只是还没被广泛采纳。对支持它的浏览器，你可以在高分辨率屏幕上显示一张高分辨率图片。


    <img src="photo.png" srcset="photo@2x.png 2x">
    

{# include shared/related_guides.liquid inline=true list=page.related-guides.images #}

#### 表格

在窄视口设备上，表格很难弄，需要特别注意。

我们推荐在窄视口上，把你的表格变成两行，将一行里的行头跟单元格都变换成列。

<video controls poster="images/responsivetable.png" style="width: 100%;">
  <source src="videos/responsivetable.mov" type="video/mov"></source>
  <source src="videos/responsivetable.webm" type="video/webm"></source>
  <p>抱歉你的浏览器不支持 video。
     <a href="videos/responsivetable.mov">下载视频</a>。
  </p>
</video>

在我们的站点中，我们为表格内容额外创建了一个断点。在移动先行的构建中，很难取消已经应用的样式。所以我们需要把窄视口的表格样式与宽视口的样式区分开来。这使得断点更为清晰，也更一致。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/getting-started/your-first-multi-screen-site/_code/content-with-styles.html" region_tag="table-css"   adjust_indentation="auto" %}
</pre>

### 尾声

**恭喜。** 你读到这里时，就已经创建好你的首个简单的产品着陆页，能在各种设备、各种外观、各种屏幕大小上运行良好。

只要你跟着以下这些指导，你就有一个好的开始：

1.  创建一个基本的 IA，在编码前清楚你的内容。
2.  始终设置 viewport。
3.  本着移动先行的原则构建你的基本体验。
4.  一旦构建好移动版，不断增加显示宽度，直到页面显示糟糕，在那里设置断点。
5.  保持迭代。


