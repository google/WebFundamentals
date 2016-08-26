project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: CSS 的 'background' 属性是一个强大的工具，用于给元素添加复杂图片，多图片、重复图片、等等都是易如反掌。

{# wf_review_required #}
{# wf_updated_on: 2014-04-29 #}
{# wf_published_on: 2000-01-01 #}

# CSS 中的图片 {: .page-title }

{% include "_shared/contributors/TODO.html" %}


Translated By: 

{% include "_shared/contributors/samchen.html" %}



CSS 的 'background' 属性是一个强大的工具，用于给元素添加复杂图片，多图片、重复图片、等等都是易如反掌。结合媒体查询的话，背景属性变得更加强大，能够基于屏幕分辨率、视口尺寸等有选择地加载图片。



## TL;DR {: .hide-from-toc }
- 针对屏幕特征如尺寸、设备分辨率及页面布局使用最适图片。
- 高 DPI 显示屏上，使用媒体查询结合 <code>min-resolution</code> 和 <code>-webkit-min-device-pixel-ratio</code> 改变 CSS 中的 <code>background-image</code> 属性。
- 除了标记中的 1x 图片外，使用 srcset 提供高分辨率图片。
- 使用 JavaScript 图片替换技术或是提供高分辨率图片给低分辨率设备时，请考虑性能上的成本。


## 使用媒体查询有条件地加载图片或是艺术指导

媒体查询不仅影响页面布局，还可以用于有条件地加载图片，或是基于视口宽度提供艺术指导。

举下面的例子说，在小屏幕上，只有 `small.png` 被下载然后应用于内容 `div`，而在大屏幕上，`background-image: url(body.png)` 应用于 body，`background-image: url(large.png)` 应用于内容 `div`。

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/images/_code/conditional-mq.html" region_tag="conditional" lang=css %}
</pre>

## 使用 image-set 提供高分辨率图片

CSS 中的 `image-set` 函数加强了 `background` 属性的功能，使它能够为不同设备特征提供多种图片文件。这样浏览器就可以基于设备特征选择最适图片，比如在 2x 显示屏上使用 2x 图片，而在有限的带宽网络中，2x 的设备仍使用 1x 图片。


    background-image: image-set(
      url(icon1x.jpg) 1x,
      url(icon2x.jpg) 2x
    );
    

除了加载合适的图片外，浏览器也会相应调整其大小。换句话说，浏览器假定了 2x 图片是 1x 图片的两倍大，因此会将 2x 图片缩小一半，最后图片在页面上看上去就一样大小。

对 `image-set()` 的支持目前还很少，仅 Chrome 和 Safari 上通过 `-webkit` 浏览器前缀支持。对于 `image-set()` 不被支持的情况，一定要小心加入后备图片，比如：

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/images/_code/image-set.html" region_tag="imageset" lang=css %}
</pre>

上例中，支持 image-set 的浏览器会加载合适的图片，不支持的则回落到 1x 图片。明显需要提醒你的是，`image-set()` 的浏览器支持非常少，大部分浏览器会取到 1x 图片。

## 使用媒体查询提供高分辨率图片或是艺术指导

媒体查询能基于[设备像素比](http://www.html5rocks.com/en/mobile/high-dpi/#toc-bg)创建规则，于是就能给 2x 及 1x 显示屏指定不同图片。


    @media (min-resolution: 2dppx),
    (-webkit-min-device-pixel-ratio: 2)
    {
      /* High dpi styles & resources here */
    }
    

Chrome、Firefox 和 Opera 都支持标准的 `(min-resolution: 2dppx)`，Safari 和 Android 浏览器则均需要旧的浏览器前缀语法 - 无 `dppx` 单位。记住，这些样式只有在设备匹配媒体查询时才被加载，切记要给基础情况指定样式。这能确保浏览器不支持分辨率特有的媒体查询时，仍有东西被渲染。

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/images/_code/media-query-dppx.html" region_tag="mqdppx" lang=css %}
</pre>

你也可以使用 min-width 语法基于视口尺寸显示不同图片。这个技术的好处是，如果媒体查询不匹配，则图片不会被下载。如下，`bg.png` 只有在浏览器宽度是 500px 或更大时才被下载，然后应用于 `body`。



    @media (min-width: 500px) {
      body {
        background-image: url(bg.png);
      }
    }
    


