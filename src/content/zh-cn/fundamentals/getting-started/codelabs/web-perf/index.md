project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:此代码实验室将帮助您学习如何识别和解决网络应用性能的瓶颈。

{# wf_updated_on: 2016-10-20T18:16:09Z #}
{# wf_published_on: 2016-01-01 #}


# 发现并解决网络应用性能的问题 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}




## 简介




此代码实验室是关于应用/网页性能的一个 Udacity 课程 ( [ud860](https://www.udacity.com/course/browser-rendering-optimization--ud860)) 的部分内容的文本版本。此代码实验室并非是视频课程的脚本，它倾向于使用课程的原始实际最终项目处理卡顿识别和校正问题。


## 概览




我们都遇到过应用在显示动画、滚动或其他用户操作时不规则跳跃的情况。这种视觉的不一致性就是我们通常称为*卡顿*或*抖动*的性能问题，容易分散用户的注意力，非常令人讨厌；它会中断用户使用应用时的思路，并且会让应用看起来缺乏美观度和专业性。

如果浏览器创建和显示某一帧所需的时间过长，则该帧会被跳过，根本不会显示。取而代之的是，您将看到下一帧（或紧接其后的帧），因此对象跳过此间隙而非平滑移动。

通过确保应用运行的帧率始终保持在每秒 60 帧 (60fps)，可避免卡顿现象。有许多因素与应用的帧率有关，并且有多种 JavaScript 和 CSS 编码方法可减轻或彻底消除卡顿，实现所期望的帧率。

此代码实验室旨在通过帮助您查找和修复导致卡顿的帧显示瓶颈，改变您解决应用性能问题的方式。

### 在开始之前需了解的内容

*  *关键渲染路径：*  您应了解渲染管道及 JavaScript 和 CSS 对其的影响。详情请参见： [https://developers.google.com/web/fundamentals/performance/critical-rendering-path/](/web/fundamentals/performance/critical-rendering-path/) 和有关 [网站性能优化：关键渲染路径](https://www.udacity.com/course/website-performance-optimization--ud884)__的 Udacity 课程。__
*  *帧和帧率：*  您应了解浏览器如何构建帧，以及为何 60fps 的帧率对于显示的流畅性至关重要。详情请参见： [https://developers.google.com/web/fundamentals/performance/rendering/](/web/fundamentals/performance/rendering/) 和有关 [浏览器渲染优化：构建 60 FPS 网络应用](https://www.udacity.com/course/browser-rendering-optimization--ud860)的课程。
*  *应用生命周期：*  您应了解运行应用的响应、动画、闲置和加载部分，并能识别每个部分存在的机会大小。详情请参见：[RAIL 性能模型](/web/fundamentals/performance/rail)
*  *Chrome DevTools：*  您应对 DevTools 有基本的了解，并知道如何用它们（尤其是 Timeline 工具）来分析网络应用。详情请参见：[分析运行时性能](/web/tools/chrome-devtools/rendering-tools/)。

### 在此代码实验室中您将学习的内容

* 如何识别导致显示性能瓶颈的应用代码
* 如何分析和修改代码，以减少或彻底消除瓶颈

### 您的开发工作空间中需要的工具

* Google Chrome 浏览器、DevTools
* 实际项目的示例代码（如下所示）

###  卡顿/抖动

下面我们通过 Jake Archibald 推出的“Jank Invaders”游戏来了解卡顿。它旨在展示与帧率和性能有关的问题。下面是一个屏幕截图。

![4a4d206daaf5693a.png](img/4a4d206daaf5693a.png)

在该游戏中，有一些宇宙飞船在屏幕上移动。“好人”可顺畅移动，“坏蛋”（间谍船）则动作卡顿。在顺畅移动的宇宙飞船当中混入了十艘间谍船，您的任务是识别这些动作卡顿的间谍船，并通过快速点击将其击落。[这里是游戏的链接](http://jakearchibald.github.io/jank-invaders/)。去吧，玩得开心；完成任务后再回来。

很显然，用户会发现卡顿并理所当然地选择性能更好的应用，对网络应用同样如此：糟糕的性能会毁掉一个好网站。此代码实验室可帮助您思考您项目的性能，并探索如何识别和修复常见问题。您将探寻滚动不畅、更新闪烁和动画抖动等问题的原因，实现流畅平滑的 60fps 帧率目标。


## 项目应用




我们首先了解您将在此代码实验室中调试的这个应用。其外观如下所示。

![36d93b5f28eb60c5.png](img/36d93b5f28eb60c5.png)

此网站使用 __Hacker News API__ 来显示最新帖子及其积分。目前，该应用性能不佳，在移动设备上尤为如此，但它的帧率没有理由达不到 60fps。在本代码实验室结束时，您将掌握所需的技能、方法，最重要的是，掌握相关理念，能够优化这个存在卡顿现象的应用，使其更具吸引力并更高效运行，为用户提供 60fps 体验。

###  获取项目代码

首先，您应取得应用代码的“优化前”和“优化后”版本。您可以克隆存储区或直接下载 zip 文件。

* 存在性能瓶颈的原始应用位于 [GitHub 存储区](http://github.com/udacity/news-aggregator)；此外，它也是一个[活动网站](http://udacity.github.io/news-aggregator/)，您可以直接查看其状况。这是您将要使用的版本。
* 以下是 [GitHub 存储区](https://github.com/udacity/news-aggregator/tree/solution)中无性能瓶颈的完整应用。可以使用该修正版本作为参考。

###  运行原始应用

首先，获取并运行存在卡顿现象的原始应用版本。在 Chrome 中，打开顶层文件夹（例如，news-aggregator-master）中的 __index.html__。尝试对应用执行各种操作；您很快会发现，在主屏幕中滚动以及帖子内容的滑入/滑出操作存在不少明显的性能问题，而它们却是用户的两项主要交互操作。我们将重点关注这些主要问题，了解如何改善这一存在卡顿现象的应用的性能。


## 练习 1：列表滚动




在主屏幕中滚动时，您会发现帖子列表抖动。此外，您还会发现各帖子积分指示器（带圆圈的数字）不仅会改变数值，还会改变颜色。本练习将发现问题所在，并决定如何解决。

让我们使用时间线来看看在主屏幕中滚动时实际发生了什么。开始记录之前，请确保启用 __JS Profile__ 复选框。开始新记录，在列表中稍微向下滚动，然后停止记录。 

在记录的顶部，您会看到 FPS 指示器呈现绿色。您会看到绿条中偶尔出现了一些峰值，如以下屏幕截图所示。绿条这么低的事实表明屏幕的帧率未达到 60 FPS。

![2e40b3134f26b0fa.png](img/2e40b3134f26b0fa.png)

放大您的记录，您会看到在滚动事件之后是函数调用（后面跟着大量单独的布局事件，每个事件都有红色的警告三角形）。在下面的屏幕截图中，布局事件是帧图底部非常小的紫色事件。这充分说明出现了*强制同步布局*。

![d6fb17faaa99e6f.png](img/d6fb17faaa99e6f.png)

鼠标悬停以识别布局事件，然后点击此事件查看其详细信息。 

![fce56d36285bc1fc.png](img/fce56d36285bc1fc.png)

查看布局事件的详细信息，您会发现强制同步布局警告是由 app.js 中的 `colorizeAndScaleStories` 函数引发的。

![f58a21a56040ce6a.png](img/f58a21a56040ce6a.png)

让我们看一看该函数。

```
function colorizeAndScaleStories() {

  var storyElements = document.querySelectorAll('.story');

  // It does seem awfully broad to change all the
  // colors every time!
  for (var s = 0; s < storyElements.length; s++) {

    var story = storyElements[s];
    var score = story.querySelector('.story__score');
    var title = story.querySelector('.story__title');

    // Base the scale on the y position of the score.
    var height = main.offsetHeight;
    var mainPosition = main.getBoundingClientRect();
    var scoreLocation = score.getBoundingClientRect().top -
        document.body.getBoundingClientRect().top;
    var scale = Math.min(1, 1 - (0.05 * ((scoreLocation - 170) / height)));
    var opacity = Math.min(1, 1 - (0.5 * ((scoreLocation - 170) / height)));

    score.style.width = (scale * 40) + 'px';
    score.style.height = (scale * 40) + 'px';
    score.style.lineHeight = (scale * 40) + 'px';

    // Now figure out how wide it is and use that to saturate it.
    scoreLocation = score.getBoundingClientRect();
    var saturation = (100 * ((scoreLocation.width - 38) / 2));

    score.style.backgroundColor = 'hsl(42, ' + saturation + '%, 50%)';
    title.style.opacity = opacity;
  }
}
```

注意，应用访问了 `height`、`width` 和 `line-height`，它们都会导致布局运行。另外还设置了透明度，在透明度更改时不会触发布局的运行，但这行代码会应用新的样式并触发重新计算，因而也会触发布局的运行。函数主循环中使用的这两种技术导致了强制同步问题的产生。 

接下来，我们看看帖子积分指示器的视觉效果，它没有添加任何信息值。我们可以使用 CSS 属性而不是 JavaScript 来实现这一效果，但还不如直接删除该效果。结论：有时候最佳的代码修复方法是删除代码。

让我们移除 `colorizeAndScaleStories` 函数的调用。为 app.js 中的第 88、89 和 305 行以及整个函数（第 255-286 行）添加注释。不要删除这些行，因为我们稍后在此代码实验室中引用的函数将与应用不匹配。现在，帖子积分始终看起来一样。

再次运行代码并对滚动活动生成一个时间线记录，然后放大显示滚动事件。这一次您会看到滚动后面只有一个样式重新计算，并且 FPS 条变高了。 

![5e9d66cb007f9076.png](img/5e9d66cb007f9076.png)

额外的布局及其强制同步布局警告均已消失，帧率也相当不错。一个卡顿问题得到解决！


## 练习 2：帖子串联




影响应用流畅性的另一个问题是向列表中添加帖子时出现滚动卡顿。请注意 `scroll` 事件侦听器中对 `loadStoryBatch` 的调用。

```
main.addEventListener('scroll', function() {

  ...

  // Check if we need to load the next batch of stories.
  var loadThreshold = (main.scrollHeight - main.offsetHeight -
      LAZY_LOAD_THRESHOLD);
  if (main.scrollTop > loadThreshold)
    loadStoryBatch();
});
```

此函数会通过加载页面时向其插入新帖子更改页面的视觉外观，尤其是在使用 `appendChild` 追加 DOM 时。这个函数本身以及使用它的设计方法并没有任何问题，我们来考虑它的调用方式。

`loadStoryBatch` 会尽量抓取内容；它会基于 `loadThreshold` 测试在任何需要的时候运行，不管页面上正在运行的其他内容，也不管浏览器是否处于帧构建过程中。这是因为 JavaScript 引擎在执行脚本时会不顾渲染管道。这种直接运行会导致性能问题，尤其是在向列表中添加更多帖子时。我们可以通过使用 *requestAnimationFrame* 解决这个问题。

理想情况下，可引起页面产生视觉变化的任何操行为都应在 requestAnimationFrame 调用内发生。让我们来修改 `scroll` 事件侦听器代码。

```
main.addEventListener('scroll', function() {

  ...

  // Check if we need to load the next batch of stories.
  var loadThreshold = (main.scrollHeight - main.offsetHeight -
      LAZY_LOAD_THRESHOLD);
  if (main.scrollTop > loadThreshold)
    requestAnimationFrame(loadStoryBatch);
});
```

这种简单更改可以确保我们与动画相关的脚本在管道过程中运行得较早，实现较小但很重要的性能提升。


## 练习 3：帖子滑入/滑出（第 1 部分）




我们的新闻聚合应用的另一个问题是帖子内容的滑入和滑出。它是除了滚动列表外应用最常见的一项用户交互。

和以往一样，首先在时间线中记录一段帖子内容的滑入和滑出，然后检查帧率。滑入/滑出操作在有些设备上可能有些许卡顿，而在另一些设备上则可能基本无法正常运行。请务必在移动设备上浏览[活动网站](http://udacity.github.io/news-aggregator/)，但其实它在所有平台上均存在问题。

![59865afca1e508ef.png](img/59865afca1e508ef.png)

一般情况下，当您看到上面有红色三角形的紫色事件时，会想要通过鼠标悬停在其上查看详细信息来进行调查。现在，您对触发计时器后出现的强制同步布局感兴趣。 

![1bd8f7700f55a6c4.png](img/1bd8f7700f55a6c4.png)

滑入/滑出动画触发计时器，就会出现强制同步布局。详细信息指向 app.js 文件中的第 180 行一个称为 `animate` 的函数。让我们看一看该函数。

```
function animate () {

  // Find out where it currently is.
  var storyDetailsPosition = storyDetails.getBoundingClientRect();

  // Set the left value if we don't have one already.
  if (left === null)
        left = storyDetailsPosition.left;

  // Now figure out where it needs to go.
  left += (0 - storyDetailsPosition.left) * 0.1;

  // Set up the next bit of the animation if there is more to do.
  if (Math.abs(left) > 0.5)
        setTimeout(animate, 4);
  else
        left = 0;

  // And update the styles. Wait, is this a read-write cycle?
  // I hope I don't trigger a forced synchronous layout!
  storyDetails.style.left = left + 'px';
}
```

您首先可以看到的是将下次调用设置为 `animate` 的 `setTimeout`。如在上一练习中所学，对页面执行的可见工作通常应位于 `requestAnimationFrame` 调用内部。但这一 `setTimeout` 却导致问题发生。

这里解决问题的一个显而易见的简单方法，就是将每个 `animate` 调用都放到 `requestAnimationFrame` 内部，从而强制其在帧序列的开始处执行。

```
function animate () {

  // Find out where it currently is.
  var storyDetailsPosition = storyDetails.getBoundingClientRect();

  // Set the left value if we don't have one already.
  if (left === null)
        left = storyDetailsPosition.left;

  // Now figure out where it needs to go.
  left += (0 - storyDetailsPosition.left) * 0.1;

  // Set up the next bit of the animation if there is more to do.
  if (Math.abs(left) > 0.5)
        requestAnimationFrame(animate);
  else
        left = 0;

  // And update the styles. Wait, is this a read-write cycle?
  // I hope I don't trigger a forced synchronous layout!
  storyDetails.style.left = left + 'px';
}
```

如果再执行一次时间线记录，您会发现性能有中等或较大提高，具体依设备而定。

奖励问题：想一想，帖子滑入/滑出时会发生什么。我们只是让帖子在页面上显示或消失，以展示或隐藏相关内容。这是一种简单的过渡过程，我们是否需要 JavaScript 来实现，或者说能否仅使用 CSS 来处理呢？我们会在练习 5 中再次细探这一问题。


## 练习 4：内存浪费




动画卡顿并非网络应用和页面性能不佳的唯一原因。另一个罪魁祸首是内存使用低效，您可能已经想到，我们的新闻聚合应用在这方面同样问题不少。

当用户点击了主列表中的一条帖子标题时，应用将构建帖子内容，将其添加到页面并滑入视图。其中，“将其添加到页面”这一部分需要深究。通常，处理贴子点击的函数称为 `onStoryClick`。我们看一下它的情况如何。

```
function onStoryClick(details) {

  var storyDetails = $('sd-' + details.id);

  // Wait a little time then show the story details.
  setTimeout(showStory.bind(this, details.id), 60);

  // Create and append the story. A visual change...
  // perhaps that should be in a requestAnimationFrame?
  // And maybe, since they're all the same, I don't
  // need to make a new element every single time? I mean,
  // it inflates the DOM and I can only see one at once.
  if (!storyDetails) {

    if (details.url)
      details.urlobj = new URL(details.url);

    var comment;
    var commentsElement;
    var storyHeader;
    var storyContent;

    var storyDetailsHtml = storyDetailsTemplate(details);
    var kids = details.kids;
    var commentHtml = storyDetailsCommentTemplate({
      by: '', text: 'Loading comment...'
    });

    storyDetails = document.createElement('section');
    storyDetails.setAttribute('id', 'sd-' + details.id);
    storyDetails.classList.add('story-details');
    storyDetails.innerHTML = storyDetailsHtml;

    document.body.appendChild(storyDetails);

    commentsElement = storyDetails.querySelector('.js-comments');
    storyHeader = storyDetails.querySelector('.js-header');
    storyContent = storyDetails.querySelector('.js-content');

    var closeButton = storyDetails.querySelector('.js-close');
    closeButton.addEventListener('click', hideStory.bind(this, details.id));

    var headerHeight = storyHeader.getBoundingClientRect().height;
    storyContent.style.paddingTop = headerHeight + 'px';

    if (typeof kids === 'undefined')
      return;

    for (var k = 0; k < kids.length; k++) {

      comment = document.createElement('aside');
      comment.setAttribute('id', 'sdc-' + kids[k]);
      comment.classList.add('story-details__comment');
      comment.innerHTML = commentHtml;
      commentsElement.appendChild(comment);

      // Update the comment with the live data.
      APP.Data.getStoryComment(kids[k], function(commentDetails) {

        commentDetails.time *= 1000;

        var comment = commentsElement.querySelector(
            '#sdc-' + commentDetails.id);
        comment.innerHTML = storyDetailsCommentTemplate(
            commentDetails,
            localeData);
      });
    }
  }
}
```

在声明了第一组变量后，请注意构造变量 `storyDetails` 的四行语句，它们分别设置了元素类型、属性和内容。在此之后，您可能注意到 `storyDetails` 作为新的节点通过 `appendChild` 方法已添加到 DOM。

首先，这不一定有问题，但随着应用的使用，会引起越来越严重的浪费问题。当然，用户一次仅浏览一条帖子，但为每个已浏览的帖子创建的新节点却从未舍弃。在数次点击之后，DOM 将布满废弃的节点，它们占据大量内存并拖慢应用运行速度 -- 应用使用的时间越久，性能下降得越厉害。

解决这一问题的更好方法是在脚本中提前创建一个用于存放当前帖子内容的永久性 `storyDetails` 节点，然后每次打开帖子时使用可信任的 `innerHTML` 属性重置其内容，而不是每次都创建一个新节点。换句话说，您应简化以下代码： 

```
    storyDetails = document.createElement('section');
    storyDetails.setAttribute('id', 'sd-' + details.id);
    storyDetails.classList.add('story-details');
    storyDetails.innerHTML = storyDetailsHtml;

    document.body.appendChild(storyDetails);
```

改为：

```
    storyDetails.setAttribute('id', 'sd-' + details.id);
    storyDetails.innerHTML = storyDetailsHtml;
```

这一变更无疑能够提高长期性能，但短期内没有什么好处。 

我们仍然需要解决帖子内容滑入/滑入的问题。


## 练习 5：帖子滑入/滑出（第 2 部分）




到目前为止，您不仅改善了应用的整体性能，还解决了一些具体的性能问题，例如列表滚动等。但是，在运行改善后的应用时，您会发现帖子内容的滑入/滑出方面仍然存在一些问题，而它是另一项主要的用户交互。

让我们仔细研究一下该过程。在时间线中，打开 JavaScript 性能分析器并启动时间线记录以下操作：单击一个帖子标题以便让其滑入，然后点击帖子的 X 按钮将其滑出。如同练习 3 中那样，`onStoryClick` 函数（仍然）导致强制同步布局。

![33ba193a24cb7303.png](img/33ba193a24cb7303.png)

在此练习中，我们将 `animate` 函数调用置于 `requestAnimationFrame` 中，这虽然能起一定作用，但并未完全解决问题。 

通过前面的讨论（以及您对 [CSS 触发器](http://csstriggers.com/)的了解），可以知道某些属性的使用会触发渲染管道某些部分的执行。让我们再次仔细看看 `animate`。

```
function animate () {

  // Find out where it currently is.
  var storyDetailsPosition = storyDetails.getBoundingClientRect();

  // Set the left value if we don't have one already.
  if (left === null)
        left = storyDetailsPosition.left;

  // Now figure out where it needs to go.
  left += (0 - storyDetailsPosition.left) * 0.1;

  // Set up the next bit of the animation if there is more to do.
  if (Math.abs(left) > 0.5)
        requestAnimationFrame(animate);
  else
        left = 0;

  // And update the styles. Wait, is this a read-write cycle?
  // I hope I don't trigger a forced synchronous layout!
  storyDetails.style.left = left + 'px';
}
```

在函数将近结尾处设置了 `left` 属性；这会导致浏览器运行布局。稍后又设置了 `style` 属性；这导致浏览器重新计算样式。您知道，如果这多次发生在同一帧中，便会导致强制同步布局。在此函数中多次发生此情况。 

`animate` 函数位于`showStory` 函数及其姊妹函数 `hideStory` 当中，后两者更新同一属性并导致强制同步布局问题。

我们在此代码实验室的前面部分中已经了解到，有时候最佳的代码修复方法是删除代码。`showStory` 和 `hideStory` 函数各司其职，但对于实现一个简单的效果而言过于复杂。所以，我们暂时舍弃它们，看看能否通过 CSS 来达到想要的效果。请看以下 CSS 代码：

```
.story-details {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  position: fixed;
  top: 0;
  left: 100%;
  width: 100%;
  height: 100%;
  background: white;
  z-index: 2;
  box-shadow:
      0px 2px 7px 0px rgba(0, 0, 0, 0.10);

  overflow: hidden;
  transition: transform 0.3s;
  will-change: transform;
}

.story-details.visible {
  transform: translateX(-100vw);
}

.story-details.hidden {
  transform: translateX(0);
}
```

首先要注意的是，在 `.story-details` 类中，我们将 `left` 属性设为 100%；无论屏幕宽度为何，这都会将整个帖子内容元素完全推到可见页面右侧以外，从而有效隐藏此元素。 

其次，在 `.story-details.visible` 和 `.story-details.hidden` 类中，我们各设置了一个 `transform` 元素，分别将 X（水平）位置强制设置为 -100vw（*视口宽度*）和 0。在应用运行时，这些类会将帖子内容重新置于视图中，或置于屏幕外的原始位置。

然后，为确保帖子产生类似于动画的效果而不是突兀地进入或退出屏幕，我们对 `transform` 设置一个 `transition`，为其提供 0.3 秒（33 毫秒）的发生时间。这样即确保实现平滑的滑入/滑出视觉效果。

最后，我们使用 `will-change` 属性来告知浏览器 `transform` 可能会发生变化。

返回到 `showStory` 和 `hideStory` 函数，我们现在可以大幅简化这两个函数，只需通过添加或移除新的 `visible` 和 `hidden` 类，即可实现所需的视觉变更，无需进行复杂的脚本编程。

```
function showStory(id) {
  if (!storyDetails)
    return;

  storyDetails.classList.add('visible');
  storyDetails.classList.remove('hidden');
}

function hideStory(id) {
  storyDetails.classList.add('hidden');
  storyDetails.classList.remove('visible');
}
```

通过上述操作，我们应用中帖子内容的滑入/滑出操作性能会有很大的改善。当然，要想知道实际效果如何，还需进行测试。对帖子的滑入和滑出执行另一段时间线记录，然后仔细看看。

![5543cf34c10a914b.png](img/5543cf34c10a914b.png)

应用的性能应有很大改善；图表中的所有帧率远低于 60fps 线，同时强制同步布局警告都已消失。最棒的是，我们不再需要使用 JavaScript 来执行滑入/滑出动画。 

我们的基本性能改善工作已经完成。


## 恭喜！




如果您已遵照说明和解释，并且已对原始项目代码作出了建议的修改，现在您的应用即可以 60fps 帧率流畅运行，而无任何动画卡顿现象。

### 我们涵盖了哪些内容？

在本代码实验室中，我们涵盖了：

* 先决条件知识：关键渲染路径、帧和帧率、应用生命周期以及 Chrome DevTools
* 卡顿概述：卡顿的概念、出现原因以及如何直观地识别卡顿现象
* 项目应用：项目应用的功能，项目应用无法达到流畅动画效果的原因以及如何发现和解决问题

### 有哪些结论？

本代码实验室主要结论：

* 屏幕动画卡顿可能是因为设计问题和编码问题引起。
* 感觉到卡顿或没有卡顿是用户决定是否使用应用的一个重要因素。
* 速度上的微小调整可大大提升应用的长期整体性能。

### 后续操作

我们建议您查看位于 [GitHub 存储区](https://github.com/udacity/news-aggregator/tree/solution)的完整项目代码。您会发现其中包含了更多已改进的代码，由于时间原因，本代码实验室未能全部涵盖。比较此应用“更新之前”的版本和“更新之后“的版本，找出编码的不同之处，看作者为提升应用的性能还作出了哪些其他改进。

### 谢谢！

感谢您浏览本代码实验室。我们将始终致力于作出改进，如果您发现错误问题或有任何建议、问题或意见，请通过以下反馈链接联系我们。乐享编码！




{# wf_devsite_translation #}
