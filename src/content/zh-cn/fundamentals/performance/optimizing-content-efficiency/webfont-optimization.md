project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 字体设计是良好的设计、品牌塑造、可读性和可访问性的基础。网页字体支持所有上述各项及更多项目：文本可选取、可搜索、可缩放并支持高 DPI，提供一致、鲜明的文字呈现，而不管屏幕大小和分辨率如何。网页字体对于良好的设计、UX 和性能很重要。

{# wf_updated_on: 2014-09-29 #}
{# wf_published_on: 2014-09-19 #}

# 网页字体优化 {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}



字体设计是良好的设计、品牌塑造、可读性和可访问性的基础。网页字体支持所有上述各项及更多项目：文本可选取、可搜索、可缩放并支持高 DPI，提供一致、鲜明的文字呈现，而不管屏幕大小和分辨率如何。网页字体对于良好的设计、UX 和性能很重要。


网页字体优化是整体性能策略的一个关键部分。每个字体都是一个附加的资源，并且某些字体可能会阻止文本的呈现，但不会仅仅因为网页使用网页字体，就意味着它必须呈现得很慢。相反，一种经过优化的字体，与在网页上加载和应用字体的的某个审慎的策略相结合，可以帮助减小总网页大小，并缩短网页呈现时间。

## 网页字体解析

### TL;DR {: .hide-from-toc }
- Unicode 字体可以包含数千种字形
- 有四种字体格式：WOFF2、WOFF、EOT、TTF
- 某些字体格式需要使用 GZIP 压缩


网页字体是一个字形集合，而每个字形是描述字母或字符的一个矢量形状。因此，某个特定字体文件的大小是由两个简单的变量确定的：每个字形的矢量路径的复杂程度和特定字体中字形的数量。例如，Open Sans 是其中一种最流行的网页字体，包含 897 个字形，其中包括拉丁文、希腊文、西里尔文字符。

<img src="images/glyphs.png" class="center" alt="字体字形表">

选取一种字体之后，考虑哪些字符集受支持是很重要的。如果您需要将您的网页内容本地化为多种语言，那么您应使用一种可以向您的用户交付一致的外观和体验的字体。例如，[Google 的 Noto 字体系列](https://www.google.com/get/noto/) 旨在支持全世界的语言。但是，请注意 Noto 的总大小（包含所有语言在内）达到 130 MB 以上 ZIP 下载！ 

很显然，在网络上使用字体需要某些细心的工程，以确保字体设计不会影响性能。幸运的是，网络平台提供所有必要的原型，在本指南的剩余部分中，我们将以实际操作让您看到如何两全其美。

### 网页字体格式

现在网络上使用的字体容器格式有四种：[EOT](http://en.wikipedia.org/wiki/Embedded_OpenType)、[TTF](http://en.wikipedia.org/wiki/TrueType)、[WOFF](http://en.wikipedia.org/wiki/Web_Open_Font_Format) 和 [WOFF2](http://www.w3.org/TR/WOFF2/)。遗憾的是，无论选择的范围有多宽，都不会有在所有旧浏览器和新浏览器上都可以使用的单一通用格式：EOT [仅 IE 支持](http://caniuse.com/#feat=eot)，TTF 具有 [部分 IE 支持](http://caniuse.com/#search=ttf)，WOFF 的支持最广泛，但 [它在许多较旧的浏览器中不可用](http://caniuse.com/#feat=woff)，WOFF 2.0 支持 [对于许多浏览器来说还未实现](http://caniuse.com/#feat=woff2)。

那我们该怎么办？ 不存在在所有浏览器中都可以使用的单一格式，这意味着我们需要交付多种格式才能提供一致的体验：

* 将 WOFF 2.0 变体提供给支持它的浏览器
* 将 WOFF 变体提供给大多数浏览器
* 将 TTF 变体提供给旧 Android（4.4 版以下）浏览器
* 将 EOT 变体提供给旧 IE（IE9 之下）浏览器
^

Note: 从技术上讲，还有 <a href='http://caniuse.com/svg-fonts'>SVG 字体容器</a>，但 IE 和 Firefox 从不支持它，并且现在 Chrome 也不再支持它。因此，其用途就很有限，在本指南中我们将有意忽略它。

### 通过压缩减小字体大小

字体是字形集合，其中每个字形是描述字母形状的一组路径。各个字形当然是不相同的，但尽管如此，它们仍包含可以使用 GZIP 或某个兼容压缩工具进行压缩的许多相似信息： 

* EOT 和 TTF 格式默认情况下不会进行压缩：交付这些格式时，请确保您的服务器已配置为应用 [GZIP 压缩](/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer#text-compression-with-gzip)。
* WOFF 具有内建压缩 - 确保您的 WOFF 压缩工具正在使用最佳压缩设置。
* WOFF2 使用自定义预处理和压缩算法对其他格式交付 ~30% 的文件大小减小 - 请参阅 [报告](http://www.w3.org/TR/WOFF20ER/)。

最后，值得注意的是某些字体格式包含附加的元数据，比如 [字体提示](http://en.wikipedia.org/wiki/Font_hinting) 和 [字距调整](http://en.wikipedia.org/wiki/Kerning) 信息，这些信息在某些平台上可能不是必要的，这样就可以进一步优化文件大小。查询您的字体压缩工具是否有可用的优化选项，而如果您这样做了，请确保您有适合的基础架构来测试这些优化的字体并将其交付给每个特定浏览器 - 例如 Google 字体为每个字体维护 30 种以上的 优化变体，并自动检测、交付适合每种平台和浏览器的最佳变体。

Note: 考虑使用 <a href='http://en.wikipedia.org/wiki/Zopfli'>Zopfli 压缩</a> 处理 EOT、TTF 和 WOFF 格式。Zopfli 是一个 zlib 兼容压缩工具，该工具通过 gzip 提供 ~5% 的文件大小缩减。

## 使用 @font-face 定义字体系列

### TL;DR {: .hide-from-toc }
- 使用 format() 提示指定多种字体格式
- 对大型 unicode 字体进行子集内嵌以提高性能：使用 unicode-range 子集内嵌，并为较旧的浏览器提供手动子集内嵌回退
- 减少风格字体变体的数量以改进网页和文本呈现性能


使用 @font-face CSS at-rule，我们可以定义某个特定字体资源的位置，其样式特征及其应该用于的 Unicode 代码点。这样的 @font-face 声明的组合可以用于构造一个'字体系列'，浏览器将使用该系列来评估哪些字体资源需要下载并应用到当前网页。让我们仔细看一下具体细节。

### 格式选择

每个 @font-face 声明提供字体系列的名称，它充当多个声明的逻辑组，[字体属性](http://www.w3.org/TR/css3-fonts/#font-prop-desc) 比如样式、粗细和拉伸，以及为字体资源指定位置优先级列表的 [src 描述符](http://www.w3.org/TR/css3-fonts/#src-desc)。

    @font-face {
      font-family: 'Awesome Font';
      font-style: normal;
      font-weight: 400;
      src: local('Awesome Font'),
           url('/fonts/awesome.woff2') format('woff2'), 
           url('/fonts/awesome.woff') format('woff'),
           url('/fonts/awesome.ttf') format('ttf'),
           url('/fonts/awesome.eot') format('eot');
    }

    @font-face {
      font-family: 'Awesome Font';
      font-style: italic;
      font-weight: 400;
      src: local('Awesome Font Italic'),
           url('/fonts/awesome-i.woff2') format('woff2'), 
           url('/fonts/awesome-i.woff') format('woff'),
           url('/fonts/awesome-i.ttf') format('ttf'),
           url('/fonts/awesome-i.eot') format('eot');
    }

首先，请注意上述示例使用两种样式（常规和 _italic_）定义单个 _Awesome Font_ 系列，其中每个指向一个不同的字体资源集。反过来，每个`src`描述符包含一个已排定优先级的、用逗号分隔的资源变体列表： 

* 使用`local()`指令，我们可以引用、加载和使用本地安装的字体。
* 使用`url()`指令，我们可以加载外部字体，并且该指令可以包含一个可选的`format()`提示，指示由提供的网址所引用的字体的格式。

^
Note: 除非您引用其中一种默认系统字体，实际上，用户很少将其安装在本地，特别是在移动设备上，在移动设备上'安装'附加的字体无论如何都是不可能的。因此，您应该始终提供一个外部字体位置列表。

当浏览器确定需要字体之后，它会按指定的顺序在提供的资源列表中迭代，并尝试加载相应的资源。例如，接着上面的示例：

1. 浏览器执行网页布局并确定需要哪些字体变体在网页上呈现指定的文本。
2. 对于每种需要的字体，浏览器会检查字体是否在本地可用。
3. 如果文件在本地不可用，它会在外部定义上迭代：
  * 如果存在格式提示，那么浏览器会在启动下载之前检查浏览器是否支持格式提示，否则会跳到下一个格式提示。
  * 如果不存在任何格式提示，那么浏览器将下载资源。

使用具有相应格式提示的本地和外部指令的组合，我们可以指定所有可用的字体格式，并让浏览器处理剩余的事情：浏览器会确定需要哪些资源并将代表我们选择最佳格式。

Note: 指定的字体变体的顺序很重要。浏览器将选取它所支持的第一种格式。因此，如果您希望较新的浏览器使用 WOFF2，那么您应该将 WOFF2 声明置于 WOFF 之上，以此类推。

### Unicode-range 子集内嵌

除了比如样式、粗细和拉伸等字体属性之外，使用 @font-face 规则，我们可以定义每个资源支持的一组 Unicode 代码点。这使我们能够将一个大型 Unicode 字体划分为较小的子集（例如，拉丁文、西里尔文、希腊文子集），并且仅下载在特定网页上呈现文本所需的字形。

使用 [unicode-range 描述符](http://www.w3.org/TR/css3-fonts/#descdef-unicode-range)，我们可以指定一个范围值的逗号分隔列表，其中每个可以采用以下三种不同的形式之一：

* 单一代码点（例如 U+416)
* 间隔范围（例如 U+400-4ff）：指示范围的开始代码点和结束代码点
* 通配符范围（例如 U+4??): `?` 字符指示任何十六进制数字

例如，我们可以将我们的 _Awesome Font_ 系列划分为拉丁文和日文子集，其中每个子集将由浏览器根据需要下载： 


    @font-face {
      font-family: 'Awesome Font';
      font-style: normal;
      font-weight: 400;
      src: local('Awesome Font'),
           url('/fonts/awesome-l.woff2') format('woff2'), 
           url('/fonts/awesome-l.woff') format('woff'),
           url('/fonts/awesome-l.ttf') format('ttf'),
           url('/fonts/awesome-l.eot') format('eot');
      unicode-range: U+000-5FF; /* Latin glyphs */
    }
    
    @font-face {
      font-family: 'Awesome Font';
      font-style: normal;
      font-weight: 400;
      src: local('Awesome Font'),
           url('/fonts/awesome-jp.woff2') format('woff2'), 
           url('/fonts/awesome-jp.woff') format('woff'),
           url('/fonts/awesome-jp.ttf') format('ttf'),
           url('/fonts/awesome-jp.eot') format('eot');
      unicode-range: U+3000-9FFF, U+ff??; /* Japanese glyphs */
    }
    

Note: Unicode-range 子集内嵌对于亚洲语言特别重要，在亚洲语言中，字形的数量要比西方语言中多得多，一种典型的'完整'字体经常以 MB 来衡量，而不是数十 KB！

通过使用 unicode range 子集以及为字体的每种样式变体使用单独的文件，我们可以定义一个复合字体系列，该系列下载起来更快、更有效 - 访问者将仅下载变体及变体需要的子集，而不会强制他们下载他们可能从未在网页上看到或使用过的子集。

这就是说，unicode-range 也有一个小缺陷：[并非所有浏览器都支持它](http://caniuse.com/#feat=font-unicode-range)。某些浏览器会简单地忽略 unicode-range 提示并将下载所有变体，而其他浏览器可能根本不会处理 @font-face 声明。要解决此问题，对于较旧的浏览器，我们需要回退到"手动子集内嵌"。

因为旧浏览器不够智能而无法仅选择必要的子集，并且无法构造复合字体，我们必须回退以提供包含所有必要子集的单一字体资源，并从浏览器隐藏剩余子集。例如，如果网页仅使用拉丁文字符，那么我们可以除去其他字形并将该特定子集作为一个独立资源提供。

1. **我们如何确定需要哪些子集？** 
  - 如果浏览器支持 unicode-range 子集内嵌，那么浏览器将自动选择正确的子集。该网页仅需要提供子集文件并在 @font-face 规则中指定相应的 unicode-range。
  - 如果不支持 unicode-range，那么网页需要隐藏所有不必要的子集 - 即，开发人员必须指定需要的子集。
2. **我们如何生成字体子集？**
  - 使用 open-source [pyftsubset 工具](https://github.com/behdad/fonttools/blob/master/Lib/fontTools/subset.py#L16) 对您的字体进行子集内嵌和优化。
  - 某些字体服务允许通过自定义查询参数进行手动子集内嵌，您可以使用这些参数手动指定您的网页需要的子集 - 查询您的字体提供商的文档。


### 字体选择和合成

总之，每个字体系列由多个样式变体（常规、加粗、倾斜）和适用于每个样式的多个粗细组成，其中每个粗细可能包含非常不同的字形形状 - 例如，不同的间距、大小调整或一个不同的形状。

<img src="images/font-weights.png" class="center" alt="字体粗细">

例如，上述示意图阐明了提供三种不同加粗粗细的一个字体系列：400（常规）、700（加粗）和 900（特别加粗）。所有其他中间变体（以灰色指示）会由浏览器自动映射到最近的变体。

<div class="quote">
  <div class="container">
    <blockquote>如果指定的某个粗细不存在任何字体，则会使用相近粗细的字体。通常，加粗粗细映射到粗细较粗的字体，而较细粗细会映射到粗细较细的字体。
    <p><a href="http://www.w3.org/TR/css3-fonts/#font-matching-algorithm">CSS3 字体匹配算法</a></p>
    </blockquote>
  </div>
</div>

相似的逻辑适用于 _italic_ 变体。字体设计程序控制他们将产生哪些变体，而我们控制我们将在网页上使用哪些变体 - 由于每个变体是一个单独的下载，所以保持变体数量较小比较好！ 例如，我们可以为 _Awesome Font_ 系列定义两种加粗变体： 


    @font-face {
      font-family: 'Awesome Font';
      font-style: normal;
      font-weight: 400;
      src: local('Awesome Font'),
           url('/fonts/awesome-l.woff2') format('woff2'), 
           url('/fonts/awesome-l.woff') format('woff'),
           url('/fonts/awesome-l.ttf') format('ttf'),
           url('/fonts/awesome-l.eot') format('eot');
      unicode-range: U+000-5FF; /* Latin glyphs */
    }
    
    @font-face {
      font-family: 'Awesome Font';
      font-style: normal;
      font-weight: 700;
      src: local('Awesome Font'),
           url('/fonts/awesome-l-700.woff2') format('woff2'), 
           url('/fonts/awesome-l-700.woff') format('woff'),
           url('/fonts/awesome-l-700.ttf') format('ttf'),
           url('/fonts/awesome-l-700.eot') format('eot');
      unicode-range: U+000-5FF; /* Latin glyphs */
    }
    

上面的示例声明了 _Awesome Font_ 系列，该系列由两个资源组成，这两个资源涵盖同一组拉丁文字形 (U+000-5FF) 但提供两种不同的'粗细'：常规 (400) 和加粗 (700)。但是，如果我们的其中一个 CSS 规则指定了一种不同的字体粗细，或者将字体样式属性设置为倾斜，那么会怎么样？

* 如果某个精确字体匹配不可用，浏览器将以最近的匹配代替。
* 如果找不到任何样式匹配（例如，我们没有在上面的示例中声明任何倾斜变体），那么浏览器将合成它自己的字体变体。

<img src="images/font-synthesis.png" class="center" alt="字体合成">

<div class="quote">
  <div class="container">
    <blockquote>字体创建者也应该知道合成的过程可能不适合像西里尔文那样的标记，在这些标记中斜体形式在形状方面非常不同。使用某种实际的倾斜字体总是比依赖某个合成版本要好。
    <p><a href="http://www.w3.org/TR/css3-fonts/#propdef-font-style">CSS3 font-style</a></p>
    </blockquote>
  </div>
</div>

上面的示例阐明了 Open-Sans 的实际字体与合成字体结果之间的不同 - 所有合成变体都是从单个 400 粗细字体生成的。您也可以看出来，结果存在显著差异。此处并未详细说明如何生成加粗和倾斜变体。因此，浏览器不同，结果将会有差异，并且结果还将与字体高度相关。

Note: 为获得最好的一致性和视觉效果，您不应该依赖字体合成。相反，请将使用的字体变体的数量减至最少并指定其位置，这样在网页上使用它们时，浏览器才可以下载它们。这就是说，在某些情况下，某个合成的变体<a href='https://www.igvita.com/2014/09/16/optimizing-webfont-selection-and-synthesis/'>可以是一个可行的选择</a> - 请小心使用。


## 优化加载和呈现

### TL;DR {: .hide-from-toc }
- 在构造呈现树之前，会延迟字体请求，这可能会导致文本呈现延迟
- 通过字体加载 API，我们可以执行自定义字体加载和覆盖默认延迟加载字体加载的呈现策略
- 通过字体内联，我们可以在较旧的浏览器中覆盖默认延迟加载字体加载


一个'完整'网页字体包括我们可能并不需要的所有样式变体，加上可能不会使用的所有字形，这很容易就会产生一个好几 MB 的下载。为了解决此问题，专门设计了 @font-face CSS 规则，使用该规则我们可以将字体系列划分为一个资源集合：unicode 子集、不同的样式变体等。

鉴于这些声明，浏览器确定了所需的子集和变体，并下载呈现文本所需的最小集。此行为非常方便，但如果我们不小心，它也可能会在关键呈现路径中产生性能瓶颈并延迟文本呈现 - 我们当然希望避免此类事情。

### 网页字体和关键呈现路径

字体的延迟加载带有一个可能会延迟文本呈现的重要隐藏含义：浏览器必须 [构造呈现树](/web/fundamentals/performance/critical-rendering-path/render-tree-construction)，这依赖于 DOM 和 CSSOM 树，在此之后，它将知道它将需要哪些字体资源来呈现文本。因此，会将字体请求很好地延迟到其他关键资源之后，并且在取回资源之前可能会阻止浏览器呈现文本。

<img src="images/font-crp.png" class="center" alt="字体关键呈现路径">

1. 浏览器请求 HTML 文档
2. 浏览器开始解析 HTML 响应并构造 DOM
3. 浏览器发现 CSS、JS 和其他资源并分派请求
4. 收到所有 CSS 内容之后，浏览器会立即构造 CSSOM，并将其与 DOM 树组合到一起来构造呈现树
  * 在呈现树指明需要哪些字体变体来呈现网页上的指定文本之后，会立即分派字体请求
5. 浏览器执行布局，并将内容绘制到屏幕上
  * 如果字体还不可用，浏览器可能不会呈现任何文本像素
  * 字体可用之后，浏览器会立即绘制文本像素

网页内容的首次绘制（在构建呈现树之后可以很快完成）和字体资源请求之间的'比赛'产生了'空白文本问题'，这种情况下浏览器可能会呈现网页布局而忽略任何文本。在不同浏览器之间实际的行为会有所不同：

* Safari 在字体下载完成之前会暂停文本呈现。
* Chrome 和 Firefox 会暂停字体呈现最多 3 秒钟，3 秒钟之后它们会使用一种后备字体，并且字体下载完成之后，它们会立即使用下载的字体重新呈现一次文本。
* 如果请求字体还不可用，IE 会立即使用后备字体呈现，并在字体下载完成之后马上重新呈现。

存在不同的呈现策略有很好的理由：有些人发现重新呈现不协调，而其他人喜欢看到即时结果而且不介意在字体下载完成之后网页重流 - 此处我们不再进行此争论。重要的是延迟加载减少了字节数量，而且还有可能延迟文本呈现。接下来，让我们看一下我们如何可以优化此行为：

### 使用字体加载 API 优化字体呈现

[字体加载 API](http://dev.w3.org/csswg/css-font-loading/) 提供一种标记编写界面以定义和操纵 CSS 字体外观，跟踪其下载进度，并覆盖其默认延迟加载行为。例如，如果我们确定将需要某个特定字体变体，我们可以定义它并告诉浏览器启动字体资源的立即取回：


    var font = new FontFace("Awesome Font", "url(/fonts/awesome.woff2)", {
      style: 'normal', unicodeRange: 'U+000-5FF', weight: '400'
    });
    
    font.load(); // don't wait for render tree, initiate immediate fetch!
    
    font.ready().then(function() {
      // apply the font (which may rerender text and cause a page reflow)
      // once the font has finished downloading
      document.fonts.add(font);
      document.body.style.fontFamily = "Awesome Font, serif";
    
      // OR... by default content is hidden, and rendered once font is available
      var content = document.getElementById("content");
      content.style.visibility = "visible";
    
      // OR... apply own render strategy here... 
    });
    

而且，因为我们可以检查字体状态（通过 [check()](http://dev.w3.org/csswg/css-font-loading/#font-face-set-check) 方法）并跟踪其下载进度，所以我们也可以为在我们的网页上呈现文本定义一种自定义策略： 

* 我们可以在字体可用之前暂停所有文本呈现。
* 我们可以为每种字体实施一个自定义超时。
* 我们可以使用后备字体取消阻止呈现，并在字体可用之后立即注入使用所需字体的新样式。

最重要的是，我们还可以为网页上的不同内容混合和匹配上述策略 - 例如，在字体可用之前在某些部分暂停文本呈现，使用后备字体然后在字体下载完成之后重新呈现，指定不同的超时，等等。

Note: 在某些浏览器中字体加载 API 仍<a href='http://caniuse.com/#feat=font-loading'>在进行开发</a>。考虑使用<a href='https://github.com/bramstein/fontloader'>字体加载器填充代码</a>，或者<a href='https://github.com/typekit/webfontloader'>网页字体加载器库</a>，以提供相似的功能，尽管会有附加的 JavaScript 依赖关系开销。

### 使用内联优化字体呈现

使用字体加载 API 消除'空白文本问题'的一个简单的替代策略是将字体内容内联到某个 CSS 样式表中：

* 浏览器会使用高优先级自动下载具有匹配媒体查询的 CSS 样式表，因为需要这些样式表来构造 CSSOM。
* 将字体数据内联到 CSS 样式表中会强制浏览器使用高优先级下载该字体，而无需等待呈现树 - 即，这充当默认延迟加载行为的手动替代。

内联策略不是很灵活，不允许我们定义自定义超时或为不同的内容呈现策略，但该策略是在所有浏览器上都可以使用的一个简单而可靠的解决方案。为获得最佳效果，请将内联字体分成独立的样式表并为它们提供一个很长的最大年龄 - 这样，更新 CSS 时，就不会强制访问者重新下载字体。

Note: 选择性地使用内联！ 回想一下，@font-face 使用延迟加载行为来避免下载不必要的字体变体和子集。另外，通过主动式内联增加您的 CSS 的大小将对您的<a href='/web/fundamentals/performance/critical-rendering-path/'>关键呈现路径</a>产生负面影响 - 浏览器必须首先下载所有 CSS，然后才可以构造 CSSOM，构建呈现树，并将网页内容呈现到屏幕。

### 使用 HTTP 缓存优化字体重复使用

字体资源通常是不会经常更新的静态资源。因此，它们非常适合很长的最大年龄到期 - 确保您为所有字体资源同时指定了一个 [条件 ETag 标题](/web/fundamentals/performance/optimizing-content-efficiency/http-caching#validating-cached-responses-with-etags) 和一个 [可选缓存控制策略](/web/fundamentals/performance/optimizing-content-efficiency/http-caching#cache-control)。
    
不需要在 localStorage 中或通过其他机制存储字体 - 每种字体都有它们的性能缺陷。浏览器的 HTTP 缓存，与字体加载 API 或 webfontloader 库相结合，可提供为浏览器交付字体资源的最好和最可靠机制。


## 优化检查表

与普遍的看法相反，网页字体的使用不需要延迟网页呈现，也不会对其他性能指标有负面影响。字体的优化使用可以提供一种整体更好的用户体验：良好的品牌塑造，改进的可读性、可用性和可搜索性，始终提供一种可扩展的多分辨率解决方案，该解决方案可以很好地适应所有屏幕格式和分辨率。不要害怕使用网页字体！ 

这就是说，缺乏经验的实施可能会招致大的下载和不必要的延迟。这是我们需要清理我们的优化工具包并帮助浏览器之处，方法是通过优化字体资产本身及在我们的网页上取回和使用它们的方式。

1. **审核和监控您的字体使用：** 不要在您的网页上使用太多字体，并且对于每种字体，请将使用的变体的数量减至最少。这将帮助为您的用户交付更加一致和更加快速的体验。
2. **对您的字体资源进行子集内嵌：** 许多字体可以进行子集内嵌，或划分为多个 unicode-range 以仅交付某个特定网页需要的字形 - 这样就减小了文件大小并加快了资源的下载速度。但是，在定义子集时，请小心优化字体重新使用 - 例如，您不需要在每个网页上下载一种不同但重叠的字符集。一个比较好的做法是基于标记进行子集内嵌 - 例如拉丁文、西里尔文等。
3. **为每个浏览器交付优化的字体格式：** 每种字体都应以 WOFF2、WOFF、EOT 和 TTF 格式提供。确保向 EOT 和 TTF 格式应用 GZIP 压缩，因为默认情况下不会对它们进行压缩。
4. **指定重新验证和最佳缓存策略：** 字体是不经常更新的静态资源。确保您的服务器提供一个长期的最大年龄时间戳和一个重新验证令牌，以允许在不同网页之间有效的字体重复使用。
5. **使用字体加载 API 来优化关键呈现路径：** 默认延迟加载行为可能会导致文本呈现延迟。通过使用字体加载 API，对于特定字体，我们可以替代此行为，并为网页上不同的内容指定自定义呈现和超时策略。对于不支持 API 的较旧浏览器，您可以使用 webfontloader JavaScript 库或使用 CSS 内联策略。


