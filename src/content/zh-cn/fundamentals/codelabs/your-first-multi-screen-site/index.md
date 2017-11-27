project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:人们使用从小屏手机到大屏电视的各类设备访问网络。每一种设备都各具优缺点。作为网络开发者，您应该为各类设备提供支持。

{# wf_updated_on:2015-10-05 #}
{# wf_published_on:2013-12-31 #}

# 您的第一个多设备网站 {: .page-title }

注意：本文已有一段时间未更新，可能无法体现真实性。请参阅 Udacity 上免费的[自适应网页设计](https://www.udacity.com/course/responsive-web-design-fundamentals--ud893)课程。

{% include "web/_shared/contributors/paulkinlan.html" %}

<img src="images/finaloutput-2x.jpg" alt="众多显示最终项目的设备" class="attempt-right">

打造多设备体验并不像看起来那么困难。
在本指南中，我们将为 [CS256 移动网络开发课程](https://www.udacity.com/course/mobile-web-development--cs256)建立一个能够在不同类型设备上正常运行的产品着陆页。



看起来，为具有不同能力、屏幕尺寸和交互方式大相径庭的多种设备建立网站，即便并非无从着手，也着实令人望而却步。



建立完全自适应网站并不像您想像的那么困难，为向您证明这一点，本指南将引导您完成入门步骤。我们将其分成了两个简单步骤：

1.  定义页面的信息架构（俗称 IA）和结构；
2.  添加设计元素，使其在各类设备上都能自适应并具有漂亮外观。


## 创建您的内容和结构

内容是任何网站最重要的方面。因此，让我们针对内容进行设计，而不要让设计支配内容。
在本指南中，我们将先确定所需内容，根据这些内容创建页面结构，然后使用在窄视口和宽视口上均能正常工作的简单线性布局呈现页面。





### 创建页面结构

我们已经确定了所需内容：

1. 一个区域，从高层次介绍我们的产品“CS256：移动网络开发”课程
2. 一个表单，用于收集对我们产品感兴趣的用户的信息
3. 一段深入描述和视频
4. 实战应用中的产品的图像
5. 一个数据表格，其中包含支持声明的信息

#### TL;DR {: .hide-from-toc }
- 先确定您需要的内容。
- 草拟适用于窄视口和宽视口的信息架构 (IA)。
- 创建包含内容但未进行样式设置的页面的框架视图。

我们还设计了对窄视口和宽视口均适用的大致信息架构和布局。


<div class="attempt-left">
  <figure>
    <img src="images/narrowviewport.png" alt="窄视口信息架构">
    <figcaption>
      窄视口信息架构
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/wideviewport.png" alt="宽视口信息架构">
    <figcaption>
      宽视口信息架构
     </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

可以将其轻松转换成框架页面的大致部分，供本项目的其余部分使用。


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addstructure.html" region_tag="structure" adjust_indentation="auto" %}
</pre>

[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/addstructure.html){: target="_blank" .external }

### 向页面添加内容

网站的基本结构已经完整。我们也清楚所需部分、需要在这些部分显示的内容以及这些部分在整体信息架构中的定位。现在我们可以开始扩建网站了。

注：我们会稍后添加样式

### 创建标题和表单

标题和请求通知表单是页面的关键组件，
必须将它们立即呈现给用户。

在标题中，添加简单文本来描述课程：

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addheadline.html" region_tag="headline" adjust_indentation="auto" %}
</pre>

[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/addheadline.html){: target="_blank" .external }

我们还需要填写表单。这个表单很简单，用于收集用户的姓名、电子邮件地址和电话号码。



所有表单都应有标签和占位符，以便用户聚焦元素、了解其中应包含的内容，也有助于无障碍工具了解表单的结构。名称属性不仅将表单值发送给服务器，还用于向浏览器提供有关如何自动为用户填写表单的重要提示。



我们将添加特定语义类型，以便用户能够以快速而又简单的方式在移动设备上输入内容。
例如，输入电话号码时，用户应该只看到拨号盘。


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addform.html" region_tag="form" adjust_indentation="auto" %}
</pre>

[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/addform.html){: target="_blank" .external }

#### 创建视频和信息部分

内容的视频和信息部分将包含略为深入的信息。它将包含产品功能的项目符号列表，还将包含演示产品实战应用的视频占位符。



<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addvideo.html" region_tag="section1" adjust_indentation="auto" %}
</pre>

[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/addvideo.html){: target="_blank" .external }

视频通常用于以较为交互式的方式描述内容，常用来演示产品或概念。


您可以按照最佳做法轻松地将视频集成到您的网站中：

*  添加 `controls` 属性，以方便用户播放视频
*  添加 `poster` 图像，让用户能够预览内容
*  根据支持的视频格式添加多个 `<source>` 元素
*  添加候补文本，让用户能在无法于窗口内播放时下载视频

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addvideo.html" region_tag="video" adjust_indentation="auto" %}
</pre>

[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/addvideo.html){: target="_blank" .external }

#### 创建图像部分

没有图像的网站会有点无趣。图像分为两种类型：

*  内容图像 &mdash; 内嵌于文档内，用于传达有关内容的额外信息的图像。
*  样式图像 &mdash; 用于美化网站外观的图像；这些图像通常是背景图片、图案和渐变色。
我们将在[下一部分](#make-it-responsive)中对它们进行介绍。


我们页面的图像部分是一个内容图像的集合。

内容图像对传达页面的含义至关重要。可将它们看作报纸文章中使用的图像。
我们使用的图像是以下项目导师的图片：
Chris Wilson、Peter Lubbers 和 Sean Bennet。


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addimages.html" region_tag="images" adjust_indentation="auto" %}
</pre>

[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/addimages.html){: target="_blank" .external }

图像设置为放大到屏幕宽度的 100%。这在具有窄视口的设备上效果不错，但在具有宽视口的设备（如桌面设备）上效果不太好。我们将在自适应设计部分解决这个问题。


许多人因视力障碍而无法查看图像，他们通常要借助屏幕阅读器等辅助技术，这些技术对页面上的数据进行解析，然后以语音形式转述给用户。您应该确保所有内容图像都具有描述性的 `alt` 标记，以便屏幕阅读器根据它将图像内容读给用户听。



添加 `alt` 标记时，确保尽可能让 alt 文本保持简洁，能够完整地描述图像即可。
例如，在我们的演示中，我们简单地将属性格式设置为“姓名：
角色”，它能够向用户提供足够的信息，让他们了解到这部分是有关作者及其工作内容的信息。



#### 添加表格式数据部分

最后一部分是一个简单的表格，用于显示有关产品的具体产品统计数据。


只应使用表格来呈现表格式数据，即信息矩阵。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addtable.html" region_tag="section3" adjust_indentation="auto" %}
</pre>

[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/addtable.html){: target="_blank" .external }

#### 添加页脚

大多数网站需要使用页脚来显示条款和条件、免责声明等内容，以及其他不应出现在页面主导航区或主内容区域的内容。



在我们的网站中，我们只是创建了一个简单的占位符页脚。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addcontent.html" region_tag="footer" adjust_indentation="auto" %}
</pre>

[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/addcontent.html){: target="_blank" .external }

### 总结

我们创建了网站的轮廓，并确定了所有主要的结构元素。
此外，我们还确保了所有相关内容均已就绪和就位，能够满足我们的业务需求。


<div class="attempt-left">
  <figure>
    <img src="images/content.png" alt="内容">
    <figcaption>
      <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/content-without-styles.html">内容和结构</a>
    </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img  src="images/narrowsite.png" alt="设计的网站" style="max-width: 100%;">
    <figcaption>
      <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/content-with-styles.html">最终网站</a>
    </figcaption>
  </figure>
</div>

您会注意到，页面目前看起来非常糟糕；实际上这是我们有意为之。内容是任何网站最重要的方面，我们需要确保建立起一个相当坚实的信息架构和密度。本指南为我们的后续构建工作打下了出色的基础。
在下一指南中，我们将对内容进行样式设置。



## 赋予其自适应能力 {: #make-it-responsive }

人们使用从小屏手机直至巨屏电视的各类设备访问网络。
每一种设备都各具优缺点。
作为网络开发者，您应该为各类设备提供支持。



我们将要建立一个能够在多种屏幕尺寸和设备类型上正常工作的网站。
我们精心打造了页面的信息架构，并创建了基础结构。
在本部分中，我们将为这个基础结构添加内容，把它变成能够在多种屏幕尺寸的设备上自适应显示的漂亮页面。



按照移动优先的网络开发原则，我们先从窄视口（类似于手机）开始，先针对这一体验进行开发。然后向上扩展到更大的设备类别。我们可以通过加宽视口和主观判断设计和布局的外观是否合适来完成这项工作。



在前文中，我们创建了几种不同的高层次设计，用于说明应如何显示内容。
现在，我们需要让页面适应这些不同的布局。我们通过决定断点 &mdash; 布局和样式发生变化的点 &mdash; 的放置位置来实现这一目的，而决定的依据是内容与屏幕尺寸的适合情况。




### TL;DR {: .hide-from-toc }
- 务必使用视口。
- 务必先从窄视口开始，在此基础上向外扩展。
- 根据您调整内容的需要设置断点。
- 创建跨主要断点布局的高层次构想。


### 添加视口

哪怕只是基础页面，您也**必须**始终为其加入视口元标记。视口是您打造多设备体验所需的最关键组件。没有它，您的网站将无法在移动设备上正常工作。

视口会向浏览器指出，页面需要进行缩放以适应屏幕。
您可以为视口指定许多不同的配置来控制页面的显示。
默认情况下，我们建议：

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/viewport.html" region_tag="viewport" adjust_indentation="auto" %}
</pre>

[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/viewport.html){: target="_blank" .external }

视口放在文档头部，并且只需要声明一次。

### 应用简单样式设置

样式指南中为我们的产品和公司提供了非常具体的品牌推广和字体指导原则。


#### 样式指南

样式指南有助于从高层次了解页面的直观表示，并帮助您确保设计的整体一致性。


#### 颜色

<div class="styles" style="font-family: monospace;">
  <div style="background-color: #39b1a4">#39b1a4</div>
  <div style="background-color: white">#ffffff</div>
  <div style="background-color: #f5f5f5">#f5f5f5</div>

  <div style="background-color: #e9e9e9">#e9e9e9</div>
  <div style="background-color: #dc4d38">#dc4d38</div>
</div>

#### 添加样式图像

<img  src="images/narrowsite.png" alt="设计的网站"  class="attempt-right" />

在上一指南中，我们添加了称为“内容图像”的图像。它们是一些对产品的讲解有重要意义的图像。
而样式图像并非核心内容的必要组成部分，但可以增添视觉效果，或有助于将用户注意力导向某一具体部分的内容。



“首屏”内容的标题图像就是一个明显的例子。它通常用于吸引用户阅读产品的更多相关信息。


这些图像加入起来可能非常简单。在我们的案例中，它将成为标题的背景，我们将通过某种简单的 CSS 来应用它。


<div style="clear:both;"></div>

    #headline {
      padding: 0.8em;
      color: white;
      font-family: Roboto, sans-serif;
      background-image: url(backgroundimage.jpg);
      background-size: cover;
    }
    

我们选择了一幅模糊的简单背景图片，这样内容就不至于被喧宾夺主，并且我们将它设置为 `cover` 整个元素；这样一来，它就能在拉伸时始终保持正确的纵横比。




### 设置您的第一个断点

设计在大约 600px 的宽度上开始变得糟糕。在我们的案例中，行的长度超过了 10 个词语（最佳阅读长度），这就是我们想要更改之处。



<video controls poster="images/firstbreakpoint.png" style="width: 100%;">
  <source src="videos/firstbreakpoint.mov" type="video/mov"></source>
  <source src="videos/firstbreakpoint.webm" type="video/webm"></source>
  <p>抱歉，您的浏览器不支持视频。
     <a href="videos/firstbreakpoint.mov">下载视频</a>。
  </p>
</video>

600px 看起来适合创建我们的第一个断点，因为它可以为我们提供作用域来调整元素位置，使它们更好地适应屏幕。我们可以利用一项称作[媒体查询](/web/fundamentals/design-and-ux/responsive/fundamentals/use-media-queries)的技术来实现这一点。

    @media (min-width: 600px) {
    
    }
    
更大的屏幕具有更多的空间，内容的显示方式也就更灵活。


注：您不必一次性移动所有元素，可以根据需要做微小调整。

就我们的产品页面而言，我们需要做的似乎是：


*  限制设计的最大宽度。
*  改变元素的内边距并缩小文本大小。
*  移动表单，使其与标题内容并排。
*  让视频环绕内容浮动。
*  缩小图像尺寸，让它们显示在更精细的网格内。


### 限制设计的最大宽度

我们已经选择只采用两种主要布局：一种是窄视口，一种是宽视口，这极大简化了我们的开发流程。


我们还决定在窄视口上创建能够在宽视口上保持全幅状态的全幅部分。
这意味着我们应该限制屏幕的最大宽度，这样一来，在超宽屏幕上，文本和段落就不会延伸成长长的一行。我们选择的这个断点约为 800px。


要实现这个目的，我们需要限制宽度并使元素居中。我们需要在每个主要部分周围创建一个容器，并应用“margin: auto”。这样，屏幕可以增大，但内容保持居中，并且最大尺寸为 800px。


容器将是以下形式的简单 `div`：

    <div class="container">...</div>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/constrainwidth.html" region_tag="containerhtml" adjust_indentation="auto" %}
</pre>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/constrainwidth.html" region_tag="container" adjust_indentation="auto" %}
</pre>

[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/constrainwidth.html){: target="_blank" .external }

### 改变内边距并缩小文本大小

在窄视口上，我们没有大量空间来显示内容，因此通常需要大幅度缩小字体的大小和粗细以适应屏幕。



对于较大的视口，我们需要考虑的是，用户使用更大屏幕的可能性更大，但内边距也更大。
为提高内容的可读性，我们可以增加字体的大小和粗细，还可以改变内边距来使不同区域的区别更加明显。



在我们的产品页面中，我们将通过将部分元素的内边距设置为保持在宽度的 5% 来加大内边距。
我们还将增加各部分标题的大小。


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/alterpadding.html" region_tag="padding" adjust_indentation="auto" %}
</pre>

[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/alterpadding.html){: target="_blank" .external }

### 调整元素以适应宽视口

我们的窄视口采用堆叠线性显示。每个主要部分和其内的内容都按从上到下的顺序显示。


宽视口为我们提供了额外的空间，可用来以最适合该屏幕的方式显示内容。
对我们的产品页面而言，这意味着根据我们的信息架构，我们可以：

*  移动表单，使其环绕标题信息。
*  将视频定位在要点右侧。
*  平铺图像。
*  扩展表格。

#### 浮动表单元素

窄视口意味着，我们在水平方向的空间大大减少，屏幕上没有充裕的空间来放置元素。


为更有效地利用水平方向的屏幕空间，我们需要打破标题的线性流，移动表单和列表，让它们彼此相邻。



<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/floattheform.html" region_tag="formfloat" adjust_indentation="auto" %}
</pre>

[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/floattheform.html){: target="_blank" .external }

<video controls poster="images/floatingform.png" style="width: 100%;">
  <source src="videos/floatingform.mov" type="video/mov"></source>
  <source src="videos/floatingform.webm" type="video/webm"></source>
  <p>抱歉，您的浏览器不支持视频。
     <a href="videos/floatingform.mov">下载视频</a>。
  </p>
</video>

#### 浮动视频元素

窄视口界面中的视频设计为屏幕的全宽，放置在主要功能列表之后。
在宽视口上，如果还将视频放置在功能列表旁，那么视频会放大得过大并因此显示不正常。



在宽视口上，视频元素需要从窄视口的垂直流移出，并应与内容的项目符号列表并排显示。


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/floatthevideo.html" region_tag="floatvideo" adjust_indentation="auto" %}
</pre>

[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/floatthevideo.html){: target="_blank" .external }

#### 平铺图像

<img src="images/imageswide.png" class="attempt-right">

窄视口（多为移动设备）界面中的图像设置为屏幕的全宽，并在垂直方向上堆叠。
图像在宽视口上放大后的效果不佳。


为使图像在宽视口上显示正常，将把它们缩小到容器宽度的 30%，并沿水平方向布局（而不是像窄视口那样沿垂直方向布局）。我们还将添加一些边框圆角和盒阴影，以使图像外观更具吸引力。


<div style="clear:both;"></div>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/tiletheimages.html" region_tag="tileimages" adjust_indentation="auto" %}
</pre>

[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/tiletheimages.html){: target="_blank" .external }

#### 让图像响应 DPI

使用图像时，请将视口大小和显示密度考虑在内。


网页是针对 96dpi 屏幕而设计。随着移动设备的推出，屏幕的像素密度得到巨大提升，更别说笔记本电脑上采用的 Retina 级显示屏。因此，编码成 96dpi 的图像在高 dpi 设备上的显示效果通常非常糟糕。


对此我们有一个尚未得到广泛采用的解决方案。对于支持它的浏览器，您可以在高密度显示屏上显示高密度图像。



    <img src="photo.png" srcset="photo@2x.png 2x">
    

#### 表格

表格很难在具有窄视口的设备上正常显示，需要给予特殊考虑。


在窄视口上，我们建议您通过将每一行更改为键值对区块（键是之前的列标题，而值仍为单元格值）来变换表格。幸运的是，这并不是特别困难。首先，使用数据属性形式的相应标题为每个 `td` 元素添加注释。
（我们需要再添加一些 CSS 才能看到明显效果。）


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/updatingtablehtml.html" region_tag="table-tbody" adjust_indentation="auto" %}
</pre>

[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/updatingtablehtml.html){: target="_blank" .external }

现在我们只需添加 CSS 以隐藏原始 `thead`，并改为使用 `:before` 伪元素来显示 `data-th` 标签。
由此便可带来以下视频中所示的多设备体验。


<video controls poster="images/responsivetable.png" style="width: 100%;">
  <source src="videos/responsivetable.mov" type="video/mov"></source>
  <source src="videos/responsivetable.webm" type="video/webm"></source>
  <p>抱歉，您的浏览器不支持视频。
     <a href="videos/responsivetable.mov">下载视频</a>。
  </p>
</video>

在我们的网站中，我们需要单独为表格内容额外创建一个断点。当您进行移动设备优先的开发工作时，撤消已应用样式更为困难，因此我们必须将窄视口表格 CSS 与宽视口 CSS 分开。这样，我们可以获得清晰而又一致的断点。




<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/content-with-styles.html" region_tag="table-css" adjust_indentation="auto" %}
</pre>

[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/content-with-styles.html){: target="_blank" .external }

## 总结

成功：在您读到这里时，您已经创建了自己的第一个简单的产品着陆页，这个页面能够在各类设备、机型和屏幕尺寸上正常工作。



如果您遵循以下指导原则，就能取得一个良好的开端：

1.  创建基础信息架构并了解您的内容，然后再开始编码。
2.  务必设置视口。
3.  围绕移动优先理念创建基础体验。
4.  打造好移动体验后，增加显示的宽度直至显示不正常为止，然后在该处设置断点。
5.  不断迭代。


{# wf_devsite_translation #}
