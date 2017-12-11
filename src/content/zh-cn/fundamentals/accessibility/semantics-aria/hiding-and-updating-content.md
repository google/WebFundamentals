project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:向辅助技术隐藏内容


{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# 隐藏和更新内容 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/aliceboxhall.html" %}

## aria-hidden

优化辅助技术用户体验的另一个重要技巧涉及确保只向辅助技术公开相关的页面部分。可通过几种方法确保不将 DOM 的某个部分向无障碍 API 公开。


首先，任何向 DOM 显式隐藏的内容同样不会包含在无障碍树中。
因此，任何 CSS 样式为 `visibility: hidden` 或 `display: none` 或者使用 HTML5 `hidden` 属性的内容同样会向辅助技术用户隐藏。



不过，未进行视觉渲染但未做显式隐藏的元素仍包含在无障碍树中。
一种常见的技巧是，在绝对位置位于屏幕之外的元素中加入“屏幕阅读器专用文本”。



    .sr-only {
      position: absolute;
      left: -10000px;
      width: 1px;
      height: 1px;
      overflow: hidden;
    }
    

此外，正如我们所见，通过 `aria-label`、`aria-labelledby` 或 `aria-describedby` 属性引用原本隐藏的元素来提供屏幕阅读器专用文本是可行的。



如需了解有关创建“屏幕阅读器专用”文本的详细信息，请参阅这篇有关[文本隐藏技巧](http://webaim.org/techniques/css/invisiblecontent/#techniques){: .external }的 WebAIM 文章。



最后，ARIA 提供了一种利用 `aria-hidden` 属性将非视觉隐藏内容排除在辅助技术访问范围之外的机制。如果对元素应用该属性，实际上是将元素*及其所有子项*从无障碍树中移除。只有 `aria-labelledby` 或 `aria-describedby` 属性引用的元素例外。


    <div class="deck">
      <div class="slide" aria-hidden="true">
        Sales Targets
      </div>
      <div class="slide">
        Quarterly Sales
      </div>
      <div class="slide" aria-hidden="true">
        Action Items
      </div>
    </div>

例如，如果您要创建某个模态 UI 来阻止对主页面的访问，可以使用 `aria-hidden`。
在此情况下，视力正常用户可以看到某种半透明叠层，这表示页面的大部分内容当前无法使用，但屏幕阅读器用户仍可探索页面的其他部分。在此情况下以及创建键盘陷阱（[前文有说明](/web/fundamentals/accessibility/focus/using-tabindex#modals-and-keyboard-traps)）的情况下，您需要确保那些当前超出范围的页面部分同样处于 `aria-hidden` 状态。




现在您已了解 ARIA 的基础知识、它与原生 HTML 语义的协作方式、如何利用它对无障碍树执行相当重大的修改以及如何更改单个元素的语义，让我们看看如何利用它来传递有时效性要求的信息。




## aria-live

`aria-live` 允许开发者将某个页面部分标记为“活动”，其意义在于，无论处在什么页面位置，都应立即向用户传达更新，而不是在用户恰好探索该页面部分时再行传达。当元素具有 `aria-live` 属性时，包含它及其子项的页面部分称作*活动区域*。



![ARIA live 建立一个活动区域](imgs/aria-live.jpg)

例如，活动区域可以是因用户操作而出现的状态消息。
如果消息的重要性足以吸引视力正常用户的注意，也就足以吸引辅助技术用户的注意（通过设置其 `aria-live` 属性）。

将这个简单 `div`


    <div class="status">Your message has been sent.</div>
    

与其“活动”版本进行比较：


    <div class="status" aria-live="polite">Your message has been sent.</div>
    

`aria-live` 有三个允许值：`polite`、`assertive` 和 `off`。

 - `aria-live="polite"` 指示辅助技术在完成其当前执行的任何操作后提醒用户这一变化。
它非常适合在事情重要但并不紧急时使用，`aria-live` 大多作此用途。
 - `aria-live="assertive"` 指示辅助技术中断其正在执行的操作，立即提醒用户这一变化。
这仅适用于重要并且紧急的更新，例如“您的更改因服务器出错而未予保存；请刷新页面”这样的状态消息，或者因用户操作（如按步进器小部件上的按钮）而直接引发的输入字段更新。
 - `aria-live="off"` 指示辅助技术暂停 `aria-live` 中断。


可以运用一些技巧来确保活动区域工作正常。

首先，您的 `aria-live` 区域多半应在初始页面加载时进行设置。这并非定规，但如果您在某个 `aria-live` 区域遇到困难，可能就是这个问题所致。



其次，不同的屏幕阅读器对不同类型变化的反应有所差异。
例如，可通过将子元素的 `hidden` 样式从 true 切换为 false，在某些屏幕阅读器上触发提醒。


其他兼容 `aria-live` 的属性可以帮助您优化活动区域发生变化时传达给用户的信息。


`aria-atomic` 表示传达更新时是否应将整个区域作为一个整体加以考虑。
例如，如果某个包括日、月和年的日期小部件具有 `aria-live=true` 和 `aria-atomic=true`，并且用户使用的步进器控件只能更改月份值，则会再次读出日期小部件的完整内容。`aria-atomic` 的值可以是 `true` 或 `false`（默认值）。





`aria-relevant` 表示应向用户提供哪些类型的更改。有一些选项可以单独使用，或以令牌列表形式使用。


 - *additions*，表示任何添加到活动区域的元素都是重要内容。
例如，向现有状态消息日志追加 span 意味着将把该 span 告知用户（假定 `aria-atomic` 为 `false`）。
 - *text*，表示添加到任何子节点的文本内容都是重要内容。
例如，如果修改自定义文本字段的 `textContent` 属性，将向用户读出修改后的文本。
 - *removals*，表示应将移除任何文本或子节点的情况传达给用户。
 - *all*，意味着所有更改都是重要更改。不过，`aria-relevant` 的默认值是 `additions text`，这表示如果您不指定 `aria-relevant`，它会将对元素的任何添加动态告知用户，而这很可能是您最想获得的信息。




最后，`aria-busy` 允许您通知辅助技术它应暂时忽略对元素的更改（例如在加载内容时）。
一切就位后，`aria-busy` 应设置为 false，以使阅读器的工作正常化。


 


{# wf_devsite_translation #}
