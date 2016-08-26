project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 很多网页都没有针对这些跨设备体验进行优化。学习相关基础知识，创建在移动设备、桌面设备或带有屏幕的任意设备上均可运行的网站。

{# wf_review_required #}
{# wf_updated_on: 2014-04-29 #}
{# wf_published_on: 2000-01-01 #}

# 调整内容大小，使其适合视口 {: .page-title }

{% include "_shared/contributors/TODO.html" %}


无论在桌面设备上还是在移动设备上，用户都习惯上下滚动网站，而不是横向滚动，因此，如果用户必须横向滚动或缩小页面才能查看整个网页，那么这将给用户带来糟糕的体验。


## TL;DR {: .hide-from-toc }
- 请勿使用较大的固定宽度元素。
- 在任何视口宽度下，内容均应正常显示。
- 使用 CSS 媒体查询为不同尺寸的屏幕应用不同样式。


使用 meta viewport 代码开发移动版网站时，开发者很容易在无意间创建出不太适合指定视口的网页内容。例如，如果图片宽度大于视口宽度，那么就会导致视口横向滚动。您应该调整此内容，使其适合视口内的宽度，以便用户无需横向滚动。

由于不同设备（例如手机和平板电脑，甚至不同手机之间）的屏幕尺寸和宽度（以 CSS 像素为单位）差别很大，因此内容不应只在特定视口下正常显示。

为网页元素设置较大的 CSS 绝对宽度（如下例所示）会导致 div 因过宽而不适合窄视口设备（例如，iPhone 等宽度为 320 CSS 像素的设备）。因此，请改为使用相对宽度值，例如 width: 100%。同样请注意，使用较大的绝对定位值可能会使元素脱离小屏幕上的视口。

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    {% link_sample _code/vp-fixed.html %}
      <img src="imgs/vp-fixed-iph.png" srcset="imgs/vp-fixed-iph.png 1x, imgs/vp-fixed-iph-2x.png 2x"  alt="iPhone 上带有 344 像素的固定宽度元素的网页。">
      查看示例
    {% endlink_sample %}
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    {% link_sample _code/vp-fixed.html %}
      <img src="imgs/vp-fixed-n5.png" srcset="imgs/vp-fixed-n5.png 1x, imgs/vp-fixed-n5-2x.png 2x"  alt="Nexus 5 上带有 344 像素的固定宽度元素的网页。">
      查看示例
    {% endlink_sample %}
  </div>
</div>



