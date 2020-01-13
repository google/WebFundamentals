project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 字体是实现良好的设计、品牌推广、可读性和无障碍功能的基础。 网页字体可实现所有上述目标以及其他目标：文本可选取、可搜索、可缩放并支持高 DPI，无论屏幕尺寸和分辨率如何，均可提供一致并且锐利的文本渲染。

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2014-09-19 #}
{# wf_blink_components: Blink>CSS #}

# 网页字体优化 {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

字体是实现良好的设计、品牌推广、可读性和无障碍功能的基础。 网页字体可实现所有上述目标以及其他目标：文本可选取、可搜索、可缩放并支持高 DPI，无论屏幕尺寸和分辨率如何，均可提供一致并且锐利的文本渲染。
 网页字体是实现良好的设计、用户体验和性能的关键所在。


网页字体优化是总体性能策略的一个关键部分。 每个字体都是一项附加资源，并且某些字体可能会阻塞文本的渲染，但不能仅仅因为网页使用了网页字体，就认为它只能降低渲染速度。
 相反，如果对字体进行优化，再通过制定明智的策略对字体在网页上的加载和应用方式作出规定，就可以帮助减小网页总大小，并缩短网页渲染时间。




## 网页字体详解

### TL;DR {: .hide-from-toc }
* Unicode 字体可能包含数千种字形。
* 字体格式有四种：WOFF2、WOFF、EOT 和 TTF。
* 某些字体格式需要使用压缩。


*网页字体*是一个字形集合，而每个字形是描述字母或符号的矢量形状。
 因此，特定字体文件的大小由两个简单变量决定：每个字形矢量路径的复杂程度和特定字体中字形的数量。
 例如，Open Sans 是其中一种最流行的网页字体，包含 897 个字形，其中包括拉丁文、希腊文和西里尔文字符。



<img src="images/glyphs.png"  alt="字体字形表">

选取字体时，重要的是考虑它支持的字符集。 如果您需要将页面内容本地化成多种语言，就应该使用一种能够为用户带来一致的外观和体验的字体。
 例如，[Google 的 Noto
字体系列](https://www.google.com/get/noto/){: .external } 旨在支持全世界的语言。
但请注意，Noto（含所有语言）ZIP 格式下载文件的总大小超过了
1.1GB+。

显然，在网页上使用字体需要某些细致的设计，以确保字体不影响性能。
 幸运的是，网络平台提供了所有必要的基元，本指南的其余部分将通过实际操作让您了解如何两全其美。


### 网页字体格式

目前网络上使用的字体容器格式有四种：
[EOT](https://en.wikipedia.org/wiki/Embedded_OpenType)、
[TTF](https://en.wikipedia.org/wiki/TrueType)、
[WOFF](https://en.wikipedia.org/wiki/Web_Open_Font_Format) 和
[WOFF2](https://www.w3.org/TR/WOFF2/){: .external }。 遗憾的是，尽管选择范围很广，但仍然缺少在所有新旧浏览器上都能使用的单一通用格式：
EOT 只有
[IE 支持](http://caniuse.com/#feat=eot)，TTF 获得了[部分 IE 支持](http://caniuse.com/#search=ttf)，WOFF 获得了最广泛的支持，但[在某些较旧的浏览器上不受支持](http://caniuse.com/#feat=woff)，而 WOFF 2.0 支持[对许多浏览器来说尚未实现](http://caniuse.com/#feat=woff2)。




那我们该怎么办？不存在在所有浏览器上都能使用的单一格式，这意味着我们需要提供多种格式才能实现一致的体验：


* 将 WOFF 2.0 变体提供给支持的浏览器。
* 将 WOFF 变体提供给大多数浏览器。
* 将 TTF 变体提供给旧版 Android（4.4 版以下）浏览器。
* 将 EOT 变体提供给旧版 IE（IE9 版以下）浏览器。

注：从技术上讲，还有另一种容器格式，即 <a href='http://caniuse.com/svg-fonts'>SVG
字体容器</a>，但 IE 或 Firefox 从未为其提供支持，并且现在 Chrome 也放弃了对它的支持。 因此，它的用途很有限，本指南中有意将其忽略。


### 通过压缩减小字体大小

字体是字形的集合，其中的每个字形都是一组描述字母形状的路径。 各个字形不同，但它们仍然包含大量相似信息，这些信息可通过 GZIP 或兼容的压缩工具进行压缩：



* EOT 和 TTF 格式默认情况下不进行压缩。 提供这些格式时，确保您的服务器配置为应用 [GZIP 压缩](/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer#text-compression-with-gzip)。
* WOFF 具有内建压缩。 确保您的 WOFF 压缩工具使用了最佳压缩设置。
* WOFF2 采用自定义预处理和压缩算法，提供的文件大小压缩率比其他格式高大约 30%。
 如需了解详细信息，请参阅
[WOFF 2.0 评估报告](http://www.w3.org/TR/WOFF20ER/){: .external }。

最后，值得注意的是，某些字体格式包含附加的元数据，如[字体提示](https://en.wikipedia.org/wiki/Font_hinting)和[字距调整](https://en.wikipedia.org/wiki/Kerning)信息，这些信息在某些平台上可能并非必要信息，这样便可进一步优化文件大小。
 查询您的字体压缩工具是否提供了优化选项，如果您这样做，请确保您有适合的基础架构来测试这些优化过的字体并将它们提供给每个特定浏览器。
 例如，[Google
Fonts](https://fonts.google.com/) 为每一种字体维护有 30 多种优化过的变体，并自动检测和提供适合每一个平台和浏览器的最佳变体。


注：考虑使用 <a href='http://en.wikipedia.org/wiki/Zopfli'>Zopfli 压缩</a>处理
EOT、TTF 和 WOFF 格式。 Zopfli 是一种兼容 zlib 的压缩工具，提供的文件大小压缩率比 gzip
高大约 5%。

## 通过 @font-face 定义字体系列

### TL;DR {: .hide-from-toc }
* 利用 `format()` 提示指定多种字体格式。
* 对大型 Unicode 字体进行子集内嵌以提高性能。 使用 Unicode-range 子集内嵌，并为较旧的浏览器提供手动子集内嵌回退。
* 减少风格字体变体的数量以改进网页和文本渲染性能。


您可以通过 `@font-face` CSS at-rule 定义特定字体资源的位置、其样式特性及其应该用于的 Unicode 代码点。
 可组合使用上述
`@font-face 声明来构建“字体系列”，浏览器将使用该系列来评估哪些字体资源需要下载并应用到当前网页。


### 格式选择

每个 `@font-face` 声明都提供字体系列的名称，它充当多个声明的逻辑组、[字体属性](http://www.w3.org/TR/css3-fonts/#font-prop-desc)（如样式、粗细和拉伸）以及为字体资源指定位置优先级列表的 [src 描述符](http://www.w3.org/TR/css3-fonts/#src-desc)。





    @font-face {
      font-family:'Awesome Font';
      font-style: normal;
      font-weight: 400;
      src: local('Awesome Font'),
           url('/fonts/awesome.woff2') format('woff2'),
           url('/fonts/awesome.woff') format('woff'),
           url('/fonts/awesome.ttf') format('truetype'),
           url('/fonts/awesome.eot') format('embedded-opentype');
    }

    @font-face {
      font-family:'Awesome Font';
      font-style: italic;
      font-weight: 400;
      src: local('Awesome Font Italic'),
           url('/fonts/awesome-i.woff2') format('woff2'),
           url('/fonts/awesome-i.woff') format('woff'),
           url('/fonts/awesome-i.ttf') format('truetype'),
           url('/fonts/awesome-i.eot') format('embedded-opentype');
    }


首先，请注意以上示例使用两种样式（normal
和_italic_）来定义单个 _Awesome Font_ 系列，其中的每个样式均指向一个不同的字体资源集。 每个 `src`
描述符则又包含一个用逗号分隔的资源变体优先级列表：

* `local()` 指令用于引用、加载和使用安装在本地的字体。
* `url()` 指令用于加载外部字体，它可以包含可选的
`format()` 提示，指示由提供的网址引用的字体格式。


注：除非您引用的是其中一种默认系统字体，用户很少将其安装在本地，特别是在移动设备上，在移动设备上“安装”
附加字体实际上根本无法实现。 您始终应该从“以防万一”的 `local()` 条目入手，然后提供一个 `url()` 条目列表。


当浏览器确定需要字体时，它会按指定顺序循环访问提供的资源列表，并尝试加载相应的资源。
例如，接着上面的示例：


1. 浏览器执行页面布局并确定需要使用哪些字体变体来渲染网页上的指定文本。
1. 对于每一种必需字体，浏览器会检查字体文件是否位于本地。
1. 如果字体文件不在本地，则浏览器会遍历外部定义：
    * 如果存在格式提示，则浏览器会在启动下载之前检查其是否支持提示。
 如果浏览器不支持此提示，则会前进到下一格式提示。
    * 如果不存在格式提示，则浏览器会下载资源。

您可以将本地和外部指令与相应的格式提示相结合来指定所有可用字体格式，其余工作交由浏览器进行处理。
 浏览器确定需要哪些资源，并选择最佳格式。


注：字体变体的指定顺序很重要。 浏览器将选取其支持的第一种格式。
 因此，如果您希望较新的浏览器使用 WOFF2，则应将 WOFF2
声明置于 WOFF 之上，依此类推。

### Unicode-range 子集内嵌

除了样式、粗细和拉伸等字体属性外，还可以通过
`@font-face` 规则定义各资源支持的
Unicode 代码点集。 这样一来，便可将大型 Unicode 字体拆分成较小的子集（例如拉丁文、西里尔文和希腊文子集），并且只下载在特定网页上渲染文本所需的字形。



您可以通过 [unicode-range 描述符](http://www.w3.org/TR/css3-fonts/#descdef-unicode-range)指定一个用逗号分隔的范围值列表，其中的每个值都可能采用下列三种不同形式中的一种：



* 单一代码点（例如 `U+416`）
* 间隔范围（例如 `U+400-4ff`）：表示范围的开始代码点和结束代码点
* 通配符范围（例如 `U+4??`）：`?` 字符表示任何十六进制数字

例如，您可以将 Awesome Font 系列拆分成拉丁文和日文子集，其中的每个子集将由浏览器根据需要下载：



    @font-face {
      font-family:'Awesome Font';
      font-style: normal;
      font-weight: 400;
      src: local('Awesome Font'),
           url('/fonts/awesome-l.woff2') format('woff2'),
           url('/fonts/awesome-l.woff') format('woff'),
           url('/fonts/awesome-l.ttf') format('truetype'),
           url('/fonts/awesome-l.eot') format('embedded-opentype');
      unicode-range:U+000-5FF; /* Latin glyphs */
    }

    @font-face {
      font-family:'Awesome Font';
      font-style: normal;
      font-weight: 400;
      src: local('Awesome Font'),
           url('/fonts/awesome-jp.woff2') format('woff2'),
           url('/fonts/awesome-jp.woff') format('woff'),
           url('/fonts/awesome-jp.ttf') format('truetype'),
           url('/fonts/awesome-jp.eot') format('embedded-opentype');
      unicode-range:U+3000-9FFF, U+ff??; /* Japanese glyphs */
    }


注：Unicode-range 子集内嵌对亚洲语言特别重要，因为在亚洲语言中，字形数量比西方语言多得多，标准的“完整”字体常常以兆字节而非千字节计量。



您可以通过使用 Unicode range 子集，以及为字体的每个样式变体使用单独的文件，定义一个下载起来更快速并且更高效的复合字体系列。
 访问者将只下载其需要的变体和子集，并且不会强制他们下载可能永远不会在网页上看到或使用的子集。



不过，unicode-range 也有一个小缺陷：[并非所有浏览器都为其提供支持](http://caniuse.com/#feat=font-unicode-range)。
 某些浏览器会简单地忽略 unicode-range 提示并下载所有变体，另一些浏览器则可能根本不会处理 `@font-face` 声明。
 要解决此问题，对于较旧的浏览器，您需要回退到“手动子集内嵌”。


由于旧浏览器因不够智能而无法只选择必要的子集，也无法构建复合字体，因此您必须回退以提供包含所有必要子集的单一字体资源，并向浏览器隐藏其余子集。
 例如，如果网页只使用拉丁文字符，那么您可以去除其他字形，并将该特定子集作为一个独立资源提供。



1. **您如何确定需要哪些子集？**
    * 如果浏览器支持 unicode-range 子集内嵌，则会自动选择正确的子集。
 网页只需提供子集文件并在 `@font-face` 规则中指定相应的 unicode-range。
    * 如果浏览器不支持 unicode-range 子集内嵌，则网页需要隐藏所有多余的子集，即开发者必须指定需要的子集。

1. **您如何生成字体子集？**
    - 使用开源的 [pyftsubset 工具](https://github.com/behdad/fonttools/){: .external } 对您的字体进行子集内嵌和优化。
    - 某些字体服务允许通过自定义查询参数手动内嵌子集，您可以利用这些参数手动指定网页需要的子集。
 请查阅您的字体提供商提供的文档。



### 字体选择和合成

每个字体系列都由多个样式变体（常规、加粗、倾斜）和适用于每个样式的多个粗细组成，其中的每个粗细又可能包含迥异的字形形状&mdash;例如不同的间距、大小调整或完全不同的形状。



<img src="images/font-weights.png"  alt="字体粗细">

例如，上图以图解方式说明了一个提供三种不同加粗粗细的字体系列：
400（常规）、700（加粗）和 900（特粗）。 浏览器会将所有其他中间变体（以灰色表示）自动映射到最接近的变体。





> 如果指定的某个粗细不存在对应的字体，则使用相近粗细的字体。 一般而言，加粗粗细映射到粗细较粗的字体，而较细粗细则映射到粗细较细的字体。


> > <a href="http://www.w3.org/TR/css3-fonts/#font-matching-algorithm">CSS3
字体匹配算法</a>



_倾斜_变体也适用类似的逻辑。 字体设计者控制其将产生哪些变体，而您控制将在网页上使用哪些变体。
 由于每个变体都会单独下载，因此最好将变体数量保持在较低水平。
 例如，您可以为
_Awesome Font_ 系列定义两种加粗变体：


    @font-face {
      font-family:'Awesome Font';
      font-style: normal;
      font-weight: 400;
      src: local('Awesome Font'),
           url('/fonts/awesome-l.woff2') format('woff2'),
           url('/fonts/awesome-l.woff') format('woff'),
           url('/fonts/awesome-l.ttf') format('truetype'),
           url('/fonts/awesome-l.eot') format('embedded-opentype');
      unicode-range:U+000-5FF; /* Latin glyphs */
    }

    @font-face {
      font-family:'Awesome Font';
      font-style: normal;
      font-weight: 700;
      src: local('Awesome Font'),
           url('/fonts/awesome-l-700.woff2') format('woff2'),
           url('/fonts/awesome-l-700.woff') format('woff'),
           url('/fonts/awesome-l-700.ttf') format('truetype'),
           url('/fonts/awesome-l-700.eot') format('embedded-opentype');
      unicode-range:U+000-5FF; /* Latin glyphs */
    }


上例声明的 _Awesome Font_ 系列由两项资源组成，它们涵盖同一拉丁文字形集 (`U+000-5FF`)，但提供两种不同的“粗细”：常规 (400) 和加粗
(700)。
 不过，如果您的其中一个 CSS 规则指定了一种不同的字体粗细，或者将 font-style 属性设置为 italic，那会怎么样？


- 如果未找到精确字体匹配项，浏览器将以最接近的匹配项替代。
- 如果未找到样式匹配项（例如，在上例中未声明任何倾斜变体），则浏览器将合成其自己的字体变体。


<img src="images/font-synthesis.png"  alt="字体合成">


Warning: 字体创造者还应注意，合成方法可能不适用于西里尔文等文字系统，在这些文字系统中，斜体形式在形状方面非常不同。
 要在这些文字系统中实现适当的保真度，请使用实际的斜体字体。


上例以图解方式说明了 Open-Sans 的实际字体与 合成字体结果之间的差异。
 所有合成变体都是依据单个 400 粗细的字体生成。 您可以看出，结果存在显著差异。
 其中并未详细说明如何生成加粗和倾斜变体。
 因此，结果将因浏览器的不同而发生变化，并且与字体的相关度极高。


注：为获得最好的一致性和视觉效果，您不应该依赖字体合成， 而应最大限度减少使用的字体变体的数量并指定其位置，这样一来，只有在网页使用它们时，浏览器才会进行下载。
 不过，在某些情况下，合成的变体<a
href='https://www.igvita.com/2014/09/16/optimizing-webfont-selection-and-synthesis/'>或许是可行的选择</a>，不过请谨慎使用。


## 优化加载和渲染

### TL;DR {: .hide-from-toc }
* 默认情况下，在构建渲染树之前会延迟字体请求，这可能会导致文本渲染延迟。
* `<link rel="preload">`、CSS `font-display` 属性以及字体加载
API 提供实现自定义字体加载和渲染策略所需的钩子，从而替换默认行为。



一个“完整”网页字体包括您可能不需要的所有样式变体，加上可能不会使用的所有字形，很容易就会产生几兆字节的下载。
 为解决此问题，专门设计了
`@font-face` CSS 规则，您可以利用该规则将字体系列拆分成一个由 unicode 子集、不同样式变体等资源组成的资源集合。


鉴于这些声明，浏览器会确定需要的子集和变体，并下载渲染文本所需的最小集，非常方便。
 但如果您不小心，它也可能会在关键渲染路径中形成性能瓶颈并延迟文本渲染。



### 默认行为

字体延迟加载带有一个可能会延迟文本渲染的重要隐藏影响：浏览器必须[构建渲染树](/web/fundamentals/performance/critical-rendering-path/render-tree-construction)（它依赖 DOM 和 CSSOM 树），然后才能知道需要使用哪些字体资源来渲染文本。
 因此，字体请求的处理将远远滞后于其他关键资源请求的处理，并且在提取资源之前，可能会阻止浏览器渲染文本。


<img src="images/font-crp.png"  alt="字体关键渲染路径">

1. 浏览器请求 HTML 文档。
1. 浏览器开始解析 HTML 响应和构建 DOM。
1. 浏览器发现 CSS、JS 以及其他资源并分派请求。
1. 浏览器在收到所有 CSS 内容后构建 CSSOM，然后将其与 DOM 树合并以构建渲染树。
    - 在渲染树指示需要哪些字体变体在网页上渲染指定文本后，将分派字体请求。
1. 浏览器执行布局并将内容绘制到屏幕上。
    - 如果字体尚不可用，浏览器可能不会渲染任何文本像素。
    - 字体可用之后，浏览器将绘制文本像素。

网页内容的首次绘制（可在渲染树构建后不久完成）与字体资源请求之间的“竞赛”产生了“空白文本问题”，出现该问题时，浏览器会在渲染网页布局时遗漏所有文本。




下一节将说明自定义这种默认行为的各种选项。

### 预加载网页字体资源

您的页面很有可能需要您事先在知道的网址上托管特定的网页字体，如果确实如此，您可利用新的网络平台功能：[`<link rel="preload">`](/web/fundamentals/performance/resource-prioritization)。



该功能允许您在 HTML 中纳入一个元素，而该元素通常作为
`<head>` 的一部分，并在关键渲染路径中提早触发对网络字体的请求，而不必等待创建 CSSOM。


`<link rel="preload">` 用于“提示”浏览器很快会需要给定的资源，但不会告知浏览器*如何*使用该资源。
您需要将预加载与适当的 CSS `@font-face`
定义协同使用，以指示浏览器如何处理给定的网络字体网址。

```html
<head>
  <!-- Other tags... -->
  <link rel="preload" href="/fonts/awesome-l.woff2" as="font">
</head>
```

```css
@font-face {
  font-family:'Awesome Font';
  font-style: normal;
  font-weight: 400;
  src: local('Awesome Font'),
       url('/fonts/awesome-l.woff2') format('woff2'), /* will be preloaded */
       url('/fonts/awesome-l.woff') format('woff'),
       url('/fonts/awesome-l.ttf') format('truetype'),
       url('/fonts/awesome-l.eot') format('embedded-opentype');
  unicode-range:U+000-5FF; /* Latin glyphs */
}
```

并非所有浏览器都[支持 `<link rel="preload">`](https://caniuse.com/#feat=link-rel-preload)，在这些浏览器中，将会直接忽略 `<link rel="preload">`。
 但是，所有支持预加载的浏览器也支持 WOFF2，因此您始终应该预加载这种格式。



Note: 使用 `<link rel="preload">` 将发出无条件的高优先级网络字体网址请求，而不考虑页面上最终是否实际需要该网络字体。
 如果在合理的情况下，不需要网络字体的远程副本（例如，因为 `@font-face` 定义包含针对 Roboto 等常用字体的 `local()` 条目），那么使用
`<link rel="preload">` 将会产生多余的请求。
 预加载但不实际使用资源时，某些浏览器会在其开发者工具控制台中显示警告。



### 自定义文本渲染延迟

虽然预加载可以增加网络字体在页面内容渲染时可用的可能性，但并不保证一定如此。
 您仍需要考虑所渲染的文本使用了尚未可用的 `font-family` 时浏览器的行为。



#### 浏览器行为

网页内容的首次绘制（可在渲染树构建后不久完成）与字体资源请求之间的“竞赛”产生了“空白文本问题”，出现该问题时，浏览器会在渲染网页布局时遗漏所有文本。
 大部分浏览器在等待下载网络字体时会执行最大超时策略，超时之后将使用回退字体。
 不过，各个浏览器的执行方式并不相同：


<table>
  <thead>
    <tr>
      <th data-th="Browser">浏览器</th>
      <th data-th="Timeout">超时</th>
      <th data-th="Fallback">回退</th>
      <th data-th="Swap">交换</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Browser">
        <strong>Chrome 35+</strong>
      </td>
      <td data-th="Timeout">
        3 秒
      </td>
      <td data-th="Fallback">
        是
      </td>
      <td data-th="Swap">
        是
      </td>
    </tr>
    <tr>
      <td data-th="Browser">
        <strong>Opera</strong>
      </td>
      <td data-th="Timeout">
        3 秒
      </td>
      <td data-th="Fallback">
        是
      </td>
      <td data-th="Swap">
        是
      </td>
    </tr>
    <tr>
      <td data-th="Browser">
        <strong>Firefox</strong>
      </td>
      <td data-th="Timeout">
        3 秒
      </td>
      <td data-th="Fallback">
        是
      </td>
      <td data-th="Swap">
        是
      </td>
    </tr>
    <tr>
      <td data-th="Browser">
        <strong>Internet Explorer</strong>
      </td>
      <td data-th="Timeout">
        0 秒
      </td>
      <td data-th="Fallback">
        是
      </td>
      <td data-th="Swap">
        是
      </td>
    </tr>
    <tr>
      <td data-th="Browser">
        <strong>Safari</strong>
      </td>
      <td data-th="Timeout">
        无超时
      </td>
      <td data-th="Fallback">
        不适用
      </td>
      <td data-th="Swap">
        不适用
      </td>
    </tr>
  </tbody>
</table>

- Chrome 和 Firefox 的超时时间为 3 秒，在此之后，将会以回退字体来显示文本。
 如果成功下载字体，那么最终会发生交换，并以期望的字体重新渲染文本。
- Internet Explorer 的超时时间为零秒，这表示文本得以立即渲染。
 如果所请求的字体尚不可用，那么将使用回退字体，之后在所请求的字体可用时将重新渲染该文本。
- Safari 没有超时行为（或者至少并无超出网络超时基线的行为）。


为确保之后的一致性，CSS 工作组已提议采用新的
`@font-face` 描述符
[`font-display`](https://drafts.csswg.org/css-fonts-4/#font-display-desc)，以及用于控制可下载字体在加载前如何渲染的相应属性。



#### 字体显示时间线

与某些浏览器目前实施的现有字体超时行为相似，`font-display` 将字体下载生命周期分为三个主要期间：



1. 第一个期间为**字体阻止期**。 在此期间，如果字体未加载，则任何尝试使用字体的元素都必须改用不可见的回退字体来渲染。
 如果字体在阻止期成功加载，则正常使用字体。
2. 字体阻止期过后便是**字体交换期**。 在此期间，如果字体未加载，则任何尝试使用字体的元素都必须改用回退字体来渲染。
 如果字体在交换期成功加载，则正常使用字体。
3. 字体交换期之后便是**字体失败期**。
 如果字体在此期间开始时尚未加载，则会将字体标记为加载失败，从而导致正常字体回退。
 否则，正常使用字体。


了解这些期间后，您即可使用 `font-display`，根据是否或何时下载字体，决定渲染字体的方式。


#### 使用 font-display

若要使用 `font-display` 属性，则为其添加 `@font-face` 规则：

```css
@font-face {
  font-family:'Awesome Font';
  font-style: normal;
  font-weight: 400;
  font-display: auto; /* or block, swap, fallback, optional */
  src: local('Awesome Font'),
       url('/fonts/awesome-l.woff2') format('woff2'), /* will be preloaded */
       url('/fonts/awesome-l.woff') format('woff'),
       url('/fonts/awesome-l.ttf') format('truetype'),
       url('/fonts/awesome-l.eot') format('embedded-opentype');
  unicode-range:U+000-5FF; /* Latin glyphs */
}
```

`font-display` 当前支持以下范围的值：
`auto | block | swap | fallback | optional`。

- **`auto`** 使用 user-agent 所用的字体显示策略。 大部分浏览器当前使用类似于 `block` 的默认策略。


- **`block`** 为字体指定较短的阻止期（在大部分情况下，建议值为 3 秒）以及无限的交换期。
 换言之，字体未加载时，浏览器首先绘制“不可见”的文本，但在字体加载后立即交换字体。

 为此，浏览器将创建指标与所选字体相似的匿名字体，但所有字形皆不含“墨水”。

只有在必须以特定字样渲染文本以使页面可用时，才应使用此值。


- **`swap`** 为字体指定零秒的阻止期，以及无限的交换期。
这意味着字体未加载时，浏览器会立即以回退字体来绘制文本，但在字体加载后立即交换字体。
 与 `block` 相似，仅当以特定字体渲染文本对于页面来说十分重要，但以任何字体渲染都可呈现正确的消息时，才应使用此值。
 徽标文本非常适合于**交换**，因为使用合理的回退字体显示公司名称即可传达消息，但您最终会使用正式的字样。



- **`fallback`** 为字体指定极短的阻止期（在大部分情况下，建议值为 100 毫秒或更短）以及较短的交换期（在大部分情况下，建议值为 3 秒）。
 换言之，字体未加载时，首先使用回退字体来渲染字体，但在字体加载后立即交换字体。
 但是，如果经过的时间过长，则在页面剩余的生命周期中将使用回退字体。
 `fallback` 非常适合于正文等内容，对于这些内容，您希望用户尽快开始阅读，不想让新字体载入时发生的文本移动干扰其体验。



- **`optional`** 为字体指定极短的阻止期（在大部分情况下，建议值为 100 毫秒或更短）以及零秒的交换期。
 与 `fallback` 相似，此值非常适合在下载的字体可以“锦上添花”，
但对于用户体验并非至关重要时使用。 `optional` 值让浏览器决定是否启动字体下载，而浏览器会从用户的角度出发，选择最适合的方案，即可能选择不下载，或以低优先级执行下载。
 当用户的网络连接较差以及下载字体并非利用资源的最佳方式时，可以使用此方法。


`font-display` 在许多现代浏览器中[获得采用](https://caniuse.com/#feat=css-font-rendering-controls)。
 随着这种属性的实施范围越来越广，浏览器采取一致行为指日可待。



### Font Loading API

开发者可以将 `<link rel="preload">` 与 `font-display` 配合使用，以很好地控制字体加载与渲染，而不会增加很多开销。
 但是，如果您需要进一步自定义，而且愿意承担运行 JavaScript 所引入的开销，还有一个选项可供选择。


[Font Loading API](https://www.w3.org/TR/css-font-loading/) 提供一种脚本编程接口来定义和操纵 CSS 字体，追踪其下载进度，以及替换其默认延迟下载行为。
 例如，如果您确定需要特定字体变体，您可以对其进行定义并指示浏览器立即提取字体资源：



    var font = new FontFace("Awesome Font", "url(/fonts/awesome.woff2)", {
      style: 'normal', unicodeRange:'U+000-5FF', weight:'400'
    });

    // don't wait for the render tree, initiate an immediate fetch!
    font.load().then(function() {
      // apply the font (which may re-render text and cause a page reflow)
      // after the font has finished downloading
      document.fonts.add(font);
      document.body.style.fontFamily = "Awesome Font, serif";

      // OR... by default the content is hidden,
      // and it's rendered after the font is available
      var content = document.getElementById("content");
      content.style.visibility = "visible";

      // OR... apply your own render strategy here...
    });


此外，由于您可以检查字体状态（通过
[check()](https://www.w3.org/TR/css-font-loading/#font-face-set-check) 方法）并追踪其下载进度，因此您还可以为在网页上渲染文本定义自定义策略：


- 您可以在获得字体前暂停所有文本渲染。
- 您可以为每种字体执行自定义超时策略。
- 您可以利用回退字体解除渲染阻止，并在获得字体后注入使用所需字体的新样式。


最重要的是，您还可以混用和匹配上述策略来适应网页上的不同内容。 例如，在获得字体前延迟某些部分的文本渲染；使用回退字体，然后在字体下载完成后进行重新渲染；指定不同的超时等等。




注：在某些浏览器上，Font Loading API 仍<a href='http://caniuse.com/#feat=font-loading'>处于开发阶段</a>。
 您可以考虑使用 <a
href='https://github.com/bramstein/fontloader'>FontLoader polyfill</a> 或 <a
href='https://github.com/typekit/webfontloader'>webfontloader 库</a>来提供类似功能，不过附加的 JavaScript 依赖关系会产生更多开销。


### 必须进行适当的缓存

字体资源通常是不会频繁更新的静态资源。 因此，它们非常适合较长的 max-age 到期 - 确保您为所有字体资源同时指定了[条件 ETag
标头](/web/fundamentals/performance/optimizing-content-efficiency/http-caching#validating-cached-responses-with-etags)和[最佳 Cache-Control
策略](/web/fundamentals/performance/optimizing-content-efficiency/http-caching#cache-control)。




如果您的网页应用使用 [Service Worker](/web/fundamentals/primers/service-workers/)，则使用[缓存优先策略](/web/fundamentals/instant-and-offline/offline-cookbook/#cache-then-network)提供字体资源适合于大部分用例。




不应使用 [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) 或 [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) 来存储字体；这两者自身都有一些性能问题。
 浏览器的 HTTP 缓存可以提供最佳且最可靠的机制来向浏览器提供字体资源。




## 优化核对清单

与普遍的观点相反，使用网页字体不需要延迟网页渲染，也不会对其他性能指标产生不良影响。
 在充分优化的情况下使用字体可大幅提升总体用户体验：出色的品牌推广，改进的可读性、易用性和可搜索性，并一直提供可扩展的多分辨率解决方案，能够出色地适应各种屏幕格式和分辨率。
 不要害怕使用网页字体！

不过，直接实现可能招致下载内容庞大和不必要的延迟。 您需要通过对字体资产本身及其在网页上的提取和使用方式进行优化来为浏览器提供协助的环节。



- **审核并监控您的字体使用情况：**不要在网页上使用过多字体，并且对于每一种字体，最大限度减少使用的变体数量。
 这将有助于为您的用户带来更加一致且更加快速的体验。
- **对您的字体资源进行子集内嵌：**许多字体都可进行子集内嵌，或者拆分成多个 unicode-range 以仅提供特定网页需要的字形。
 这样即可减小文件大小，并提高资源的下载速度。
 不过，在定义子集时要注意针对字体重复使用的情况进行优化。
 例如，您一定不希望在每个网页上都下载不同但重叠的字符集。 最好根据文字系统（例如拉丁文、西里尔文等）进行子集内嵌。
- **向每个浏览器提供优化过的字体格式：**每一种字体都应以 WOFF2、WOFF、EOT 和 TTF
格式提供。 务必对 EOT 和 TTF 格式应用 GZIP 压缩，因为默认情况下不会对其进行压缩。
- **在 `src` 列表中优先列出 `local()`：**在
`src` 列表中首先列出 `local('Font Name')` 可确保不会针对已安装的字体发出 HTTP 请求。
- **使用 `<link rel="preload">`、`font-display` 或 Font
Loading API 来自定义字体加载和渲染：**默认的延迟加载行为可能会导致延迟渲染文本。 您可以通过这些网络平台功能为特定字体替换这一行为，以及为网页上的不同内容指定自定义渲染和超时策略。
- **指定重新验证和最佳缓存策略：**字体是不经常更新的静态资源。
 确保您的服务器提供长期的 max-age 时间戳和重新验证令牌，以实现不同网页之间高效的字体重复使用。
 如果使用 Service Worker，则适合采用缓存优先策略。


*感谢 [Monica Dinculescu](https://meowni.ca/posts/web-fonts/)、[Rob Dodson](/web/updates/2016/02/font-display) 和 Jeff Posnick 对本文所作的贡献。*


## 反馈 {: #feedback }

{% include "web/_shared/helpful.html" %}
