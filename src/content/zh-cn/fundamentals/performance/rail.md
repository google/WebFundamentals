project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:RAIL 是一种以用户为中心的性能模型。每个网络应用均具有与其生命周期有关的四个不同方面，且这些方面以非常不同的方式影响着性能：响应 (Response)、动画 (Animation)、空闲 (Idle) 和加载 (Load)。

{# wf_updated_on:2015-06-07 #}
{# wf_published_on:2015-06-07 #}

# 使用 RAIL 模型评估性能 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}

RAIL 是一种以用户为中心的性能模型。每个网络应用均具有与其生命周期有关的四个不同方面，且这些方面以不同的方式影响着性能：

![RAIL 性能模型](images/rail.png)


### TL;DR {: .hide-from-toc }

- 以用户为中心；最终目标不是让您的网站在任何特定设备上都能运行很快，而是使用户满意。
- 立即响应用户；在 100 毫秒以内确认用户输入。
- 设置动画或滚动时，在 10 毫秒以内生成帧。
- 最大程度增加主线程的空闲时间。
- 持续吸引用户；在 1000 毫秒以内呈现交互内容。


## 以用户为中心

让用户成为您的性能工作的中心。用户花在网站上的大多数时间不是等待加载，而是在使用时等待响应。了解用户如何评价性能延迟：




<table class="responsive">
  <thead>
      <th colspan="2">延迟与用户反应</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Delay">0 - 16 毫秒</td>
      <td data-th="User Reaction">人们特别擅长跟踪运动，如果动画不流畅，他们就会对运动心生反感。
用户可以感知每秒渲染 60 帧的平滑动画转场。也就是每帧 16 毫秒（包括浏览器将新帧绘制到屏幕上所需的时间），留给应用大约 10 毫秒的时间来生成一帧。


    </tr>
    <tr>
      <td data-th="Delay">0 - 100 毫秒</td>
      <td data-th="User Reaction">在此时间窗口内响应用户操作，他们会觉得可以立即获得结果。时间再长，操作与反应之间的连接就会中断。</td>
    </tr>
    <tr>
      <td data-th="Delay">100 - 300 毫秒</td>
      <td data-th="User Reaction">用户会遇到轻微可觉察的延迟。</td>
    </tr>
    <tr>
      <td data-th="Delay">300 - 1000 毫秒</td>
      <td data-th="User Reaction">在此窗口内，延迟感觉像是任务自然和持续发展的一部分。对于网络上的大多数用户，加载页面或更改视图代表着一个任务。</td>
    </tr>
    <tr>
      <td data-th="Delay">1000+ 毫秒</td>
      <td data-th="User Reaction">超过 1 秒，用户的注意力将离开他们正在执行的任务。</td>
    </tr>
    <tr>
      <td data-th="Delay">10,000+ 毫秒</td>
      <td data-th="User Reaction">用户感到失望，可能会放弃任务；之后他们或许不会再回来。</td>
    </tr>
  </tbody>
</table>

## 响应：在 100 毫秒以内响应

在用户注意到滞后之前您有 100 毫秒的时间可以响应用户输入。这适用于大多数输入，不管他们是在点击按钮、切换表单控件还是启动动画。但不适用于触摸拖动或滚动。


如果您未响应，操作与反应之间的连接就会中断。用户会注意到。

尽管很明显应立即响应用户的操作，但这并不总是正确的做法。使用此 100 毫秒窗口执行其他开销大的工作，但需要谨慎，以免妨碍用户。如果可能，请在后台执行工作。




对于需要超过 500 毫秒才能完成的操作，请始终提供反馈。

## 动画：在 10 毫秒内生成一帧

动画不只是奇特的 UI 效果。例如，滚动和触摸拖动就是动画类型。


如果动画帧率发生变化，您的用户确实会注意到。您的目标就是每秒生成 60 帧，每一帧必须完成以下所有步骤：


![帧渲染步骤](images/render-frame.png)

从纯粹的数学角度而言，每帧的预算约为 16 毫秒（1000 毫秒 / 60 帧 = 16.66 毫秒/帧）。
但因为浏览器需要花费时间将新帧绘制到屏幕上，**只有 10 毫秒来执行代码**。

 

在像动画一样的高压点中，关键是不论能不能做，什么都不要做，做最少的工作。
如果可能，请利用 100 毫秒响应预先计算开销大的工作，这样您就可以尽可能增加实现 60fps 的可能性。



如需了解详细信息，请参阅[渲染性能](/web/fundamentals/performance/rendering/)。


## 空闲：最大程度增加空闲时间

利用空闲时间完成推迟的工作。例如，尽可能减少预加载数据，以便您的应用快速加载，并利用空闲时间加载剩余数据。

推迟的工作应分成每个耗时约 50 毫秒的多个块。如果用户开始交互，优先级最高的事项是响应用户。 

要实现小于 100 毫秒的响应，应用必须在每 50 毫秒内将控制返回给主线程，这样应用就可以执行其像素管道、对用户输入作出反应，等等。



以 50 毫秒块工作既可以完成任务，又能确保即时的响应。

## 加载：在 1000 毫秒以内呈现内容

在 1 秒钟内加载您的网站。否则，用户的注意力会分散，他们处理任务的感觉会中断。


侧重于[优化关键渲染路径](/web/fundamentals/performance/critical-rendering-path/)以取消阻止渲染。



您无需在 1 秒内加载所有内容以产生完整加载的感觉。启用渐进式渲染和在后台执行一些工作。将非必需的加载推迟到空闲时间段（请参阅此[网站性能优化 Udacity 课程](https://www.udacity.com/course/website-performance-optimization--ud884)，了解更多信息）。

## 关键 RAIL 指标汇总

要根据 RAIL 指标评估您的网站，请使用 Chrome DevTools [Timeline 工具](/web/tools/chrome-devtools/profile/evaluate-performance/timeline-tool)记录用户操作。然后根据这些关键 RAIL 指标检查 Timeline 中的记录时间。

<table>
  <thead>
      <th>RAIL 步骤</th>
      <th>关键指标</th>
      <th>用户操作</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="RAIL Step"><strong>响应</strong></td>
      <td data-th="Key Metric">输入延迟时间（从点按到绘制）小于 100 毫秒。</td>
      <td data-th="User Test">用户点按按钮（例如打开导航）。</td>
    </tr>
    <tr>
      <td data-th="RAIL Step"><strong>动画</strong></td>
      <td data-th="Key Metric">每个帧的工作（从 JS 到绘制）完成时间小于 16 毫秒。</td>
      <td data-th="User Test">用户滚动页面，拖动手指（例如，打开菜单）或看到动画。
拖动时，应用的响应与手指位置有关（例如，拉动刷新、滑动轮播）。

此指标仅适用于拖动的持续阶段，不适用于开始阶段。</td>


    </tr>
    <tr>
      <td data-th="RAIL Step"><strong>空闲</strong></td>
      <td data-th="Key Metric">主线程 JS 工作分成不大于 50 毫秒的块。</td>
      <td data-th="User Test">用户没有与页面交互，但主线程应足够用于处理下一个用户输入。</td>
    </tr>
    <tr>
      <td data-th="RAIL Step"><strong>加载</strong></td>
      <td data-th="Key Metric">页面可以在 1000 毫秒内就绪。</td>
      <td data-th="User Test">用户加载页面并看到关键路径内容。</td>
    </tr>
  </tbody>
</table> 




{# wf_devsite_translation #}
