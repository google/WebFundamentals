project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:使用 ARIA 标签创建可访问元素说明


{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# ARIA 标签和关系 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/aliceboxhall.html" %}

## 标签

ARIA 提供了多种向元素添加标签和说明的机制。事实上，ARIA 是唯一一种可以添加可访问帮助或说明文本的方式。
我们来看一下 ARIA 用于创建可访问标签的属性。


### aria-label

`aria-label` 允许我们指定一个用作可访问标签的字符串。这将替换任何其他原生标记机制，例如 `label` 元素 &mdash;例如，如果 `button` 同时具有文本内容和 `aria-label`，将仅使用 `aria-label` 值。




如果您有某种指明元素用途的视觉指示（例如，使用图形而不是文本的按钮），则可以使用 `aria-label` 属性，但是仍需要向无法获取视觉指示（例如，仅使用图像指示其用途的按钮）的任何人阐明该用途。





![使用 aria-label 标识一个仅图像按钮](imgs/aria-label.jpg)

### aria-labelledby

`aria-labelledby` 允许我们将 DOM 中另一个元素的 ID 指定为当前元素的标签。


![使用 aria-labelledby 标识单选组](imgs/aria-labelledby.jpg)

这非常类似于使用 `label` 元素，但也存在一些关键区别。

 1. `aria-labelledby` 可以用于任何元素，而不仅仅是可标记元素。
 1. `label` 元素引用其标记的对象，但对于 `aria-labelledby` 来说，关系则相反 &mdash; 被标记的对象引用标记它的元素。


 1. 只有一个标签元素与可标记元素关联，但是 `aria-labelledby` 可以利用一组 IDREF 从多个元素构建标签。标签将按照 IDREF 的提供顺序串联。

 1. 您可以使用 `aria-labelledby` 引用隐藏和不在可访问性树中的元素。
例如，您可以在想要标记的元素旁添加一个隐藏的 `span`，然后使用 `aria-labelledby` 引用该元素。


 1. 不过，由于 ARIA 仅影响可访问性树，`aria-labelledby` 并不会展现使用 `label` 元素时熟悉的标签点击行为。



重要的是，`aria-labelledby` 将替换元素的**所有**其他名称源。
因此，如果一个元素同时拥有 `aria-labelledby` 和 `aria-label` 或者`aria-labelledby` 和原生 HTML `label`，`aria-labelledby` 标签将始终具有最高优先级。



## 关系

`aria-labelledby` 是一个*关系属性*示例。无论页面元素的 DOM 属性如何，关系属性都会在它们之间创建语义关系。如果是 `aria-labelledby`，关系将是“此元素由另一个元素标记”。


ARIA 规范列出了[八个关系属性](https://www.w3.org/TR/wai-aria/states_and_properties#attrs_relationships){: .external }。其中的六个（即 `aria-activedescendant`、`aria-controls`、`aria-describedby`、`aria-labelledby` 和 `aria-owns`）通过引用一个或多个元素的方式在页面元素之间创建一个新链接。各个属性的区别是链接的含义及其向用户呈现的方式。


### aria-owns

`aria-owns` 是使用最广泛的 ARIA 关系之一。此属性既允许我们告知辅助技术应将 DOM 中独立的一个元素视为当前元素的子项，也允许我们以不同顺序重排现有子元素。例如，如果一个弹出式子菜单在视觉上靠近其父菜单，但不能是其父项的 DOM 子项（否则会影响视觉呈现），您可以使用 `aria-owns` 将子菜单作为父菜单的子项呈现给屏幕阅读器。





![使用 aria-owns 在菜单与子菜单之间建立关系](imgs/aria-owns.jpg)

### aria-activedescendant

`aria-activedescendant` 扮演着相关角色。与页面的活动元素是具有焦点的元素一样，设置元素的活动子项允许我们告知辅助技术，在一个元素的父项实际具有焦点时应作为焦点元素将该元素呈现给用户。例如，在列表框中，您可能希望将页面焦点停留在列表框容器上，但对当前选中的列表项持续更新列表框的 `aria-activedescendant` 属性。这样会让当前选定项以焦点项的形式显示给辅助技术。


![使用 aria-activedescendant 在列表框中建立关系](imgs/aria-activedescendant.jpg)

### aria-describedby

`aria-describedby` 提供了一种可访问说明，方式与 `aria-labelledby` 提供标签的方式相同。
与 `aria-labelledby` 一样，`aria-describedby` 可能引用不可见的元素，无论这些元素在 DOM 中隐藏，还是对辅助技术用户隐藏。如果存在用户可能需要的额外说明性文本，则不管该文本适用于辅助技术用户还是所有用户，这种技术都非常有用。



一个常见的示例是密码输入字段带有一些说明性文本，其中，说明性文本用于说明最低密码要求。
与标签不同，此说明不一定会呈现给用户；用户可以选择是否访问说明，此说明可能跟在其他信息之后，也可能被其他内容抢占。例如，如果用户正在输入信息，他们的输入将回显并且可能中断元素的说明。因此，说明是一种用于传达补充但非必要信息的绝佳方式；它不会妨碍更关键的信息，例如元素角色。



![使用 aria-describedby 与密码字段建立关系](imgs/aria-describedby.jpg)

### aria-posinset 和 aria-setsize

其余的关系属性略有不同并协同作用。`aria-posinset`（“在集中的位置”）和 `aria-setsize`（“集大小”）用于定义集（例如，列表）中同级元素之间的关系。



如果无法通过 DOM 中存在的元素确定集的大小（例如，使用延迟渲染避免在 DOM 中生成大的列表时），`aria-setsize` 可以指定实际集大小，`aria-posinset` 可以指定元素在集中的位置。例如，在一个可能包含 1000 个元素的集中，您可以指定特定元素的 `aria-posinset` 为 857（即使其在 DOM 中位于首位），然后使用动态 HTML 技术确保用户可以根据需要查看完整列表。





![使用 aria-posinset 和 aria-setsize 在列表中建立关系](imgs/aria-posinset.jpg)


{# wf_devsite_translation #}
