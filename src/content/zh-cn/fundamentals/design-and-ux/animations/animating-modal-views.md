project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:了解如何为应用中的模态视图设置动画。

{# wf_updated_on:2016-08-24 #}
{# wf_published_on:2014-08-08 #}

# 给模态视图设置动画 {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

<div class="attempt-right">
  <figure>
    <img src="images/dont-press.gif" alt="给模态视图设置动画。" />
    <figcaption>
      <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/modal-view-animation.html" target="_blank" class="external">试一下</a>
    </figcaption>
  </figure>
</div>

模态视图用于重要消息，并且您有很好的理由来阻止用户界面。应谨慎使用模态视图，因为它们具有破坏性，如果过度使用，会很容易破坏用户体验。但是，在某些情况下，它们是适合使用的视图，并且加上一些动画将使其变得生动。

### TL;DR {: .hide-from-toc }
* 应谨慎使用模态视图；如果不必要地打断用户的体验，他们会感到失望。
* 给动画加上缩放可实现不错的“掉落”效果。
* 当用户关闭模态视图时，应迅速将其清除。但是，应让模态视图以较慢的速度进入屏幕，以防使用户感到突然。

<div class="clearfix"></div>

模态叠加层应与视口对齐，因此需要将其 `position` 设置为 `fixed`：


    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    
      pointer-events: none;
      opacity: 0;
    
      will-change: transform, opacity;
    }
    

其初始 `opacity` 为 0，因此在视图中被隐藏，而且还需要将 `pointer-events` 设置为 `none`，使点击和触摸事件能够穿过。若不设置，它将阻止所有交互，使整个页面无响应。最后，由于它将对其 `opacity` 和 `transform` 设置动画，因此需要使用 `will-change` 将这些属性标记为“即将更改”（另请参考[使用 will-change 属性](animations-and-performance#using-the-will-change-property)）。

当视图可见时，需要接受交互并且将 `opacity` 设置为 1：


    .modal.visible {
      pointer-events: auto;
      opacity: 1;
    }
    

现在，每当需要模态视图时，可以使用 JavaScript 来切换“visible”类：


    modal.classList.add('visible')；
    

此时，模态视图出现时没有任何动画，因此您现在可以在以下位置加入动画（另请参考[自定义缓动](custom-easing)）：



    .modal {
      -webkit-transform: scale(1.15);
      transform: scale(1.15);
    
      -webkit-transition:
        -webkit-transform 0.1s cubic-bezier(0.465, 0.183, 0.153, 0.946),
        opacity 0.1s cubic-bezier(0.465, 0.183, 0.153, 0.946);
    
      transition:
        transform 0.1s cubic-bezier(0.465, 0.183, 0.153, 0.946),
        opacity 0.1s cubic-bezier(0.465, 0.183, 0.153, 0.946);
    
    }
    

给变形属性加上 `scale` 使视图好像轻轻掉到屏幕上，这是一种不错的效果。同时给变形和透明度属性应用默认变换，采用自定义曲线和 0.1 秒持续时间。

这个持续时间很短，但在用户消除视图并且希望返回应用时，效果非常好。缺点是：模态视图在出现时可能会太突然。要修复此问题，应替换 `visible` 类的变换值：


    .modal.visible {
    
      -webkit-transform: scale(1);
      transform: scale(1);
    
      -webkit-transition:
        -webkit-transform 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946),
        opacity 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946);
    
      transition:
        transform 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946),
        opacity 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946);
    
    }
    

现在模态视图用 0.3 秒时间进入屏幕，没那么突然，但是会快速消除，这样用户会喜欢。





{# wf_devsite_translation #}
