---
title: "标记中的图片"
description: "'img' 元素是强大的 - 它下载、解码然后渲染内容 - 而现代浏览器支持了众多的图片格式。"
translators:
  - samchen
updated_on: 2014-09-30
key-takeaways:
  img-in-markup:
    - 图片使用相对尺寸，防止它们意外溢出包含块。
    - 如果你要根据设备特征（亦称艺术指导）指定不同图片，则使用 <code>picture</code> 元素。
    - 在 <code>img</code> 元素中使用 <code>srcset</code> 及 <code>x</code> 描述符，引导浏览器从不同密度图片中选择、使用最佳的一张。
notes:
  picture-support:
    - "<code>picture</code> 元素刚开始在浏览器上实现。虽然目前还不是每个浏览器都支持，但我们推荐使用它，因为它有很强的向后兼容，还可以使用 <a href='http://picturefill.responsiveimages.org/'>Picturefill polyfill</a>。更多详情请看 <a href='http://responsiveimages.org/#implementation'>ResponsiveImages.org</a> 站点。" 
  compressive:
    - 谨慎使用压缩技术，因为它增加内存需要和解码开销。调整大图片尺寸来适应小屏幕的成本很大，尤其是低端设备上，内存和处理单元有限，情况更为突出。
comments:
  # NOTE: If the section titles or URL changes the following shortlinks must be updated
  - g.co/mobilesiteprinciple21
---

<p class="intro">
  <code>img</code> 元素是强大的 - 它下载、解码然后渲染内容 - 而现代浏览器支持了众多的图片格式。跨设备使用图片与桌面端并无二致，只需要一些微小调整，就能构建美好体验。
</p>


{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.img-in-markup %}


## 图片使用相对尺寸

在指定图片宽度时，记得使用相对单位，保证它们不会意外溢出视口。比如，`width: 50%` 将设置图片宽度为 50% 包含块（不是视口或真正的像素大小）。

因为 CSS 允许内容溢出包含块，因此使用 `max-width: 100%` 保证图片及其他内容不会溢出是有必要的。比如：

{% highlight css %}
img, embed, object, video {
  max-width: 100%;
}
{% endhighlight %}

请务必借助 `img` 元素的 `alt` 属性提供有意义的描述；这些有助于提高你的站点的可用性，因为它们能提供语境给屏幕阅读器及其他辅助性技术。

## 高 DPI 设备上使用 `srcset` 来增强 `img`

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <p>
      <code>srcset</code> 属性增强 <code>img</code> 元素的行为，方便它为不同设备特征提供许多图片文件。类似于 CSS 原生<a href="images-in-css.html#use-image-set-to-provide-high-res-images">CSS 函数</a> <code>image-set</code>，<code>srcset</code> 允许浏览器基于设备特征选择最佳图片，比如在 2x 显示屏上使用 2x 图片，未来甚至可能，在有限的带宽环境中 2x 设备使用 1x 图片。
    </p>
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    {% ytvideo Pzc5Dly_jEM %}
  </div>
</div>

{% highlight html %}
<img src="photo.png" srcset="photo@2x.png 2x" ...>
{% endhighlight %}

不支持 `srcset` 的浏览器就使用 `src` 属性指定的默认图片文件。这就是为什么要始终包含一张任何设备上都能显示的 1x 图片，而不用管设备能力如何。支持 `srcset` 的话，逗号分隔的图片/条件列表会先于任何请求发出前分析，然后只有最合适的图片被下载然后显示。

虽说条件可以包含从像素密度到宽度和高度的种种，但目前只有像素密度的支持度最好。为平衡现在的行为和未来的特性，在属性中请还是继续只提供 2x 图片。

## 响应式图片中用 `picture` 实现艺术指导

基于设备特征改变图片，即所谓的艺术指导可使用 picture 元素实现。<code>picture</code> 元素定义了一个表述性的解决办法，可基于不同特征如设备大小、设备分辨率、方向等等来提供一张图片的不同版本。

<img class="center" src="img/art-direction.png" alt="艺术指导的例子"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">

{% include shared/remember.liquid title="Important" list=page.notes.picture-support %}

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <p>
      一个图片源存在不同密度，或是响应式设计要求不同类型屏幕上需要不太一样的图片时，就应该使用 <code>picture</code>。类似于 <code>video</code> 元素，它可以包含多个 <code>source</code> 元素，使得基于媒体查询或图片格式来指定不同图片文件成为可能。
    </p>
  </div>
  <div class="mdl-cell mdl-cell--6--col">
    {% ytvideo QINlm3vjnaY %}
  </div>
</div>

{% include_code src=_code/media.html snippet=picture lang=html %}

上面的例子中，如果浏览器宽度至少 800px，则 `head.jpg` 或 `head-2x.jpg` 会被用到，具体哪个则取决于设备分辨率。如果浏览器宽度在 450px 和 800px 之间，则或者 `head-small.jpg` 或者 `head-small-2x.jpg` 会被用到，具体哪个，还是取决于设备分辨率。至于屏幕宽度小于 450px 的，以及不支持 `picture` 元素的向后兼容的情况，浏览器会渲染 `img` 元素，因此要始终包含它。

### 相对大小的图片

如果不知道图片的最终尺寸，则很难给图片源指定一个密度描述符。譬如图片宽度占浏览器宽度某个比例值的情况，图片是弹性的，取决于浏览器的尺寸。

提供的每张图片的尺寸可以通过添加一个宽度描述符和图片元素的大小来指定，而不是提供固定的图片尺寸和密度，这就允许浏览器自动计算有效的像素密度然后选择加载最佳图片。

{% include_code src=_code/sizes.html snippet=picture lang=html %}

上面的例子中，渲染了一张有视口一半宽度（'sizes="50vw"）的图片，根据浏览器的宽度和它的设备像素比，允许浏览器选择对的图片，而不管浏览器窗口有多大。比如，下面的表格显示了浏览器会选择哪张图片：

<table class="mdl-data-table mdl-js-data-table">
    <thead>
    <tr>
      <th data-th="Browser width">浏览器宽度</th>
      <th data-th="Device pixel ratio">设备像素比</th>
      <th data-th="Image used">使用的图片</th>
      <th data-th="Effective resolution">有效分辨率</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Browser width">400px</td>
      <td data-th="Device pixel ratio">1</td>
      <td data-th="Image used"><code>200.png</code></td>
      <td data-th="Effective resolution">1x</td>
    </tr>
    <tr>
      <td data-th="Browser width">400px</td>
      <td data-th="Device pixel ratio">2</td>
      <td data-th="Image used"><code>400.png</code></td>
      <td data-th="Effective resolution">2x</td>
    </tr>
    <tr>
      <td data-th="Browser width">320px</td>
      <td data-th="Device pixel ratio">2</td>
      <td data-th="Image used"><code>400.png</code></td>
      <td data-th="Effective resolution">2.5x</td>
    </tr>
    <tr>
      <td data-th="Browser width">600px</td>
      <td data-th="Device pixel ratio">2</td>
      <td data-th="Image used"><code>800.png</code></td>
      <td data-th="Effective resolution">2.67x</td>
    </tr>
    <tr>
      <td data-th="Browser width">640px</td>
      <td data-th="Device pixel ratio">3</td>
      <td data-th="Image used"><code>1000.png</code></td>
      <td data-th="Effective resolution">3.125x</td>
    </tr>
    <tr>
      <td data-th="Browser width">1100px</td>
      <td data-th="Device pixel ratio">1</td>
      <td data-th="Image used"><code>1400.png</code></td>
      <td data-th="Effective resolution">1.27x</td>
    </tr>
  </tbody>
</table>


### 解释响应式图片中的断点

在许多用例中，图片的尺寸可能会根据站点布局的断点变化。比方说，一个小屏幕上，你可能想要图片占满视口的全宽，在大屏幕上，则只应该占一小比例。

{% include_code src=_code/breakpoints.html snippet=picture lang=html %}

上面例子中 `sizes` 属性使用了多个媒体查询来指定图片尺寸。当浏览器宽度大于 600px 时，图片将占据视口宽度的 25%，当它在 500px 到 600px 之间时，图片将占据视口宽度的 50%，低于 500px 的话，则图片将为全宽。


## 让产品图片可展开

客户想要看到他们买的是什么。在零售网站上，用户希望能够看到高分辨率的产品特写，以更好看明白细节，而[研究发现参与者](/web/fundamentals/principles/research-study.html)如果没能看到就会非常沮丧。

<figure>
  <img src="img/sw-make-images-expandable-good.png" srcset="img/sw-make-images-expandable-good.png 1x, img/sw-make-images-expandable-good-2x.png 2x" alt="J. Crews 网站，带有可展开的产品图片">
  <figcaption>J. Crew 的网站，带有可展开的产品图片。</figcaption>
</figure>

J. Crew 网站提供的一个很好的例子，图片是可触击、可展开的。
一个消失中的浮层表示图片是可触击的，提供放大的图片细节。


## 其他图片技术

### 压缩的图片

[压缩的图片技术](http://www.html5rocks.com/en/mobile/high-dpi/#toc-tech-overview)提供给所有设备一个高度压缩的 2x 图片，不管设备能力如何。取决于图片的类型及压缩的水平，图片外观可能没有变化，但图片大小减小非常可观。

{% link_sample _code/compressive.html %}
看例子
{% endlink_sample %}

{% include shared/remember.liquid title="Important" list=page.remember.compressive %}

### JavaScript 图片替换

JavaScript 图片替换技术检查设备能力，然后“做正确的事”。你可以通过 `window.devicePixelRatio` 判定设备像素比，取得屏幕宽、高，甚至可能通过 `navigator.connection` 做一些网络连接的嗅探，又或是发起一个假请求。一旦收集好所有这些信息，你就能决定加载哪张图片。

这个方法的一大缺陷是，使用 JavaScript 意味着你延迟了图片的加载，至少要等先行的分析器结束。这意味着，图片直到 `pageload` 事件触发后甚至不会开始加载。另外，浏览器很可能会 1x 和 2x 的图片都下载，导致页面大小增加。


