project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:了解如何在应用的两个视图之间设置动画。

{# wf_updated_on:2016-08-23 #}
{# wf_published_on:2014-08-08 #}

# 在视图之间设置动画 {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

您常常需要让用户在应用的各视图之间切换，不管是从列表换到详情视图，还是显示边栏导航。在这些视图之间设置动画可以吸引用户，并让您的项目更生动活泼。

### TL;DR {: .hide-from-toc }
* 使用变换来切换不同视图；避免使用 `left`、`top` 或任何其他会触发布局的属性。
* 确保使用的所有动画简洁明快，并且设置较短的持续时间。
* 考虑在屏幕尺寸增大时您的动画和布局如何变化；考虑哪些适合小屏幕的动画用在桌面环境时可能看起来很怪。

这些视图变换的外观及行为在很大程度上取决于您所处理的视图类型。例如，给视图上层的模态叠加层设置动画，会带来一种与在列表和详情视图之间变换不同的体验。

成功：力求使所有动画保持 60fps。这样，用户不会觉得动画卡顿，从而不会影响其使用体验。确保任何动画元素为您打算在动画开始之前更改的任何内容设置了 `will-change`。对于视图变换，您很可能要使用 `will-change: transform`。

## 使用变换来切换不同视图

<div class="attempt-left">
  <figure>
    <img src="images/view-translate.gif" alt="在两个视图之间变换" />
  </figure>
</div>

为简单起见，我们假定有两个视图：一个列表视图和一个详情视图。当用户点按列表视图内的列表项时，详情视图将滑入屏幕，并且列表视图滑出。

<div style="clear:both;"></div>

<div class="attempt-right">
  <figure>
    <img src="images/container-two-views.svg" alt="视图层次。" />
  </figure>
</div>

要实现此效果，您需要一个容纳这两个视图的容器，并为容器设置 `overflow: hidden`。这样两个视图可以并排放在容器内，而不显示任何水平滚动条，并且每个视图可以按需在容器内侧向滑动。

<div style="clear:both;"></div>

此容器的 CSS 代码为：


    .container {
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: relative;
    }
    

容器的位置被设置为 `relative`。这意味着，其中的每个视图可以绝对定位在左上角，然后通过变形移动位置。此方法比使用 `left` 属性性能更佳（因为该属性会触发布局和绘图），并且通常更容易合理化。


    .view {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
    
      /* let the browser know we plan to animate
         each view in and out */
      will-change: transform;
    }
    

在 `transform` 属性上添加 `transition` 可实现不错的滑动效果。为实现不错的感觉，它使用了自定义的 `cubic-bezier` 曲线，我们在[自定义缓动指南](custom-easing)中讨论了该曲线。


    .view {
      /* Prefixes are needed for Safari and other WebKit-based browsers */
      transition: -webkit-transform 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946);
      transition: transform 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946);
    }
    

屏幕之外的视图应变换到右侧，因此在这种情况下需要移动详情视图：


    .details-view {
      -webkit-transform: translateX(100%);
      transform: translateX(100%);
    }
    

现在，需要少量 JavaScript 来处理类。这将切换视图上相应的类。


    var container = document.querySelector('.container');
    var backButton = document.querySelector('.back-button');
    var listItems = document.querySelectorAll('.list-item');
    
    /**
     * Toggles the class on the container so that
     * we choose the correct view.
     */
    function onViewChange(evt) {
      container.classList.toggle('view-change');
    }
    
    // When you click a list item, bring on the details view.
    for (var i = 0; i < listItems.length; i++) {
      listItems[i].addEventListener('click', onViewChange, false);
    }
    
    // And switch it back again when you click the back button
    backButton.addEventListener('click', onViewChange);
    

最后，我们为这些类添加 CSS 声明。


    .view-change .list-view {
      -webkit-transform: translateX(-100%);
      transform: translateX(-100%);
    }
    
    .view-change .details-view {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    
[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/inter-view-animation.html){: target="_blank" .external }

您可以扩展此示例以包括多个视图，基本概念仍是一样；每个不可见视图应在屏幕之外，并按需进入屏幕，同时当前屏幕视图应移走。

注意：以跨浏览器的方式设计此类层次结构可能很难。例如，iOS 需要额外的 CSS 属性 <code>-webkit-overflow-scrolling: touch</code> 来“重新启用”抛式滚动，但是您不能像使用标准溢出属性一样，控制动作所针对的轴。一定要在各种设备上测试您的实现方法！

除了在视图之间变换之外，此技术还能应用于其他滑入元素，例如边栏导航元素。唯一差异是不需要移动其他视图。

## 确保动画在较大屏幕上正常显示

<div class="attempt-right">
  <figure>
    <img src="images/container-two-views-ls.svg" alt="大屏幕上的视图层次。" />
  </figure>
</div>

对于较大屏幕，始终应让列表视图留在周围，而不是将其移除，并且从右侧滑入详情视图。它与处理导航视图几乎一样。






{# wf_devsite_translation #}
