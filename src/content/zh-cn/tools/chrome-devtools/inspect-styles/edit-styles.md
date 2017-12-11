project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:使用 Chrome DevTools 中的 Styles 窗格可以检查和修改与元素关联的 CSS 样式。

{# wf_updated_on: 2016-02-25 #}
{# wf_published_on: 2015-04-13 #}

# 编辑样式 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

使用 <strong>Styles</strong> 窗格可以修改与元素关联的 CSS 样式。


![Styles 窗格](imgs/styles-pane.png)


### TL;DR {: .hide-from-toc }
- 利用 Styles 窗格，您可以在本地以尽可能多的方法更改 CSS，包括修改现有样式、添加新样式，以及为样式添加规则。
- 如果您希望样式可以保持（不会在重新加载后消失），则需要将其保存到您的开发工作区中。


## 检查应用到元素的样式

[选择一个元素](edit-dom#inspect-an-element)以检查其样式。
**Styles** 窗格可以显示应用到选定元素的 CSS 规则，优先级从高到低：


* 顶端为 `element.style`。这些样式要么直接使用样式属性（例如 `<p style="color:green">`）直接应用到元素，要么在 DevTools 中应用。



* 下方是与元素匹配的任何 CSS 规则。例如，在下面的屏幕截图中，选定元素从 `tools.css` 中定义的规则接收 `line-height:24px`。



* 再下方是继承的样式，其中包括与选定元素的祖先实体匹配的任何可继承样式规则。
例如，在下面的屏幕截图中，选定元素从 `user agent stylesheet` 继承 `display:list-item`。



下图上的标签与其下方带编号的项目对应。

![带标注的 Styles 窗格](/web/tools/chrome-devtools/inspect-styles/imgs/styles-annotated.png)

1. 与元素匹配的选择器的关联样式。
2. [User Agent 样式表](http://meiert.com/en/blog/20070922/user-agent-style-sheets/)清晰标记，并且在网页上经常被 CSS 替换。
3. 已被**级联规则**替换的规则将显示为带删除线的文本。
4. **继承的**样式将在“Inherited from `<NODE>`”标头下显示为一组。点击标头中的 DOM 节点可以导航到其在 DOM 树视图中的位置。
（[CSS 2.1 属性表](http://www.w3.org/TR/CSS21/propidx.html)显示了哪些属性是可以继承的。）
5. 灰色的条目不是已定义的规则，而是**在运行时计算的**规则。




了解级联和继承的原理对于调试样式至关重要。
级联与 CSS 声明被赋予的权重有关，权重用于确定规则在与其他规则重叠时哪些规则的优先级更高。
继承与 HTML 元素如何从其所属元素（祖先实体）继承 CSS 属性有关。
如需了解详情，请参阅[有关级联的 W3C 文档](http://www.w3.org/TR/CSS2/cascade.html)。


## 检查受选择器影响的元素

在 **Styles** 窗格中将鼠标悬停在 CSS 选择器上可以查看受该选择器影响的所有元素。
例如，在下面的屏幕截图中，鼠标悬停在选择器 `.wf-tools-guide__section-link a` 上。在实时页面中，您可以看到受选择器影响的所有 `<a>` 元素。
 

![查看受选择器影响的元素](imgs/selector-hover.png)

**注**：此功能仅突出显示视口中的元素；视口以外的其他元素也可能受选择器影响。
 

## 添加、启用和停用 CSS 类 {:#classes}

点击 **.cls** 按钮可以查看与当前选定元素关联的所有 CSS 类。
从这里，您可以执行以下操作：

* 启用或停用当前与元素关联的类。
* 向元素添加新类。 

![classes 窗格](imgs/classes.png)

## 编辑现有属性名称或值

点击 CSS 属性名称或值可以对其进行编辑。在名称或值突出显示时，按 <kbd>Tab</kbd> 可以向前移动到下一个属性、名称或选择器。

按 <kbd>Shift</kbd>+<kbd>Tab</kbd> 可以向后移动。

编辑数字式 CSS 属性值时，可以使用下面的键盘快捷键增大和减小值：


* 使用<kbd>向上键</kbd>和<kbd>向下键</kbd>能够以 1 为增量增大和减小值（如果当前值介于 -1 和 1 之间，则增量为 0.1）。
* 使用 <kbd>Alt</kbd>+<kbd>向上键</kbd>和 <kbd>Alt</kbd>+<kbd>向下键</kbd>能够以 0.1 为增量增大和减小值。
* 使用 <kbd>Shift</kbd>+<kbd>向上键</kbd>能够以 10 为增量增大值；使用 <kbd>Shift</kbd>+<kbd>向下键</kbd>能够以 10 为增量减小值。
* 使用 <kbd>Shift</kbd>+<kbd>Page Up</kbd>（Windows、Linux）或 <kbd>Shift</kbd>+<kbd>Function</kbd>+<kbd>向上键</kbd> (Mac) 能够以 100 为增量增大值。使用 <kbd>Shift</kbd>+<kbd>Page Down</kbd>（Windows、Linux）或 <kbd>Shift</kbd>+<kbd>Function</kbd>+<kbd>向下键</kbd> (Mac) 能够以 100 为增量减小值。

 

## 添加新属性声明

点击可编辑 CSS 规则中的空白处可以创建一个新声明。
键入，或者将 CSS 粘贴到 **Styles** 窗格中。属性及其值将解析并输入到正确的字段中。


注：要启用或停用样式声明，请选中或取消选中旁边的复选框。

## 添加样式规则

点击 **New Style Rule** (![New Style Rule 按钮](imgs/new-style-rule.png){:.inline}) 按钮可以添加一个新的 CSS 规则。

 

点击并按住按钮可以选择要向哪一个样式表添加规则。 

## 添加或移除动态样式（伪类）{:#pseudo-classes}

您可以在元素上手动设置动态伪类选择器（例如 `:active`、`:focus`、`:hover` 和 `:visited`）。
 

可以通过两种方式在元素上设置动态状态：

* 在 **Elements** 面板内右键点击某个元素，然后从菜单中选择目标伪类，将其启用或停用。
![右键点击元素以启用伪类选择器](imgs/pseudoclass-rightclick.png)
  



* 在 **Elements** 面板中选择元素，然后在 **Styles** 窗格中点击 **:hov** 按钮，使用复选框启用或停用当前选定元素的选择器。



  ![:hov 窗格](imgs/hov.png)

## 向样式规则添加背景色或颜色

**Styles** 窗格提供了一个用于向样式规则添加 `color` 和 `background-color` 声明的快捷方式。


样式规则的右下角有一个由三个点组成的图标。您需要将鼠标悬停到样式规则上才能看到这个图标。


![规则集中的三点图标](imgs/rule-set-three-dots-icon.png)

将鼠标悬停到此图标上可以调出用于添加 `color` 声明 (![添加 color 声明](imgs/add-color.png){:.inline}) 或 `background-color` 声明 (![添加 background-color 声明](imgs/add-background-color.png){:.inline}) 的按钮。点击这些按钮之一可以将声明添加到样式规则中。
 

## 使用 Color Picker 修改颜色 {:#color-picker}

要打开 **Color Picker**，请在 **Styles** 窗格中查找一个定义颜色的 CSS 声明（例如 `color: blue`）。
声明值的左侧有一个带颜色的小正方形。
正方形的颜色与声明值匹配。
点击小正方形可以打开 **Color Picker**。

![打开 Color Picker](imgs/open-color-picker.jpg)

您可以通过多种方式与 **Color Picker** 交互：

1. **取色器**。请参阅[取色器](#eyedropper)了解更多信息。
2. **当前颜色**。**当前值**的可视表示。
3. **当前值**。**当前颜色**的十六进制、RGBA 或 HSL 表示。
4. **调色板**。请参阅[调色板](#color-palettes)了解更多信息。
5. **着色和阴影选择器**。
6. **色调选择器**。
7. **不透明度选择器**。
8. **颜色值选择器**。点击可以在 RGBA、HSL 和十六进制之间切换。
9. **调色板选择器**。点击可以选择不同的模板。

![带标注的 Color Picker](imgs/annotated-color-picker.jpg)

[md]: https://www.google.com/design/spec/style/color.html

### 取色器 {:#eyedropper}

点击**取色器**按钮将其启用 (![启用的取色器](imgs/eyedropper-enabled.png){:.inline})，在实时页面上将鼠标悬停到某种颜色上，然后点击，将当前选定的声明值设置为您悬停的颜色。




![取色器实例](imgs/eyedropper.jpg)

### 调色板 {:#color-palettes}

**Color Picker** 提供了下列调色板：

* **Page Colors**。一组从页面的 CSS 自动生成的颜色。
* **Material Design**。一组符合 [Material Design 规范][md]的颜色。
* **Custom**。您选择的任意一组颜色。DevTools 可以保存您的自定义调色板（甚至在不同的页面间），直至您将其删除。
 

#### 修改自定义调色板 {:#custom-color-palette}

按**加号**按钮可以将当前颜色添加到调色板中。
点击并按住颜色可以将其拖动到不同的位置，或者将其拖动到**垃圾桶**图标进行删除。
右键点击颜色并选择 **Remove color** 可以将其删除。
选择 **Remove all to the right** 可以删除当前选定颜色右侧的所有颜色。
右键点击调色板区域中的任何位置，然后选择 **Clear template** 可以删除模板的所有颜色。



## 查看和编辑 CSS 自定义属性（CSS 变量）{:#custom-properties}

您可以查看和编辑定义或使用 [CSS 自定义属性][intro]（之前称为 CSS 变量）的声明，就像查看和编辑任何其他声明一样。

 

自定义属性通常在 `:root` 选择器中[定义][def]。
要查看在 `:root` 中定义的自定义属性，请检查 `html` 元素。


![:root 上定义的自定义属性](imgs/css-var-defined-on-root.png)

不过，并不一定要在 `:root` 选择器上定义自定义属性。如果您在其他地方定义，请在定义元素的地方检查元素以查看定义。



您可以查看和编辑使用自定义属性的声明值，就像查看和编辑任何其他声明值一样。
 

如果您看到一个像 `var(--main-color)` 一样的声明值（如下面的屏幕截图所示），则表示声明正在使用自定义属性。
可以像编辑任何其他声明值一样编辑这些值。
目前，没有办法跳转到自定义属性定义。


![使用自定义属性](imgs/css-var-in-use.png)

[intro]: /web/updates/2016/02/css-variables-why-should-you-care
[def]: https://drafts.csswg.org/css-variables/#defining-variables

## 编辑 Sass、Less 或 Stylus

如果您在使用 Sass、Less、Stylus 或任何其他 CSS 预处理器，则在 Styles 编辑器中编辑生成的 CSS 输出文件不会有任何作用，因为它们不会映射到您的源代码。

借助 CSS 源映射，DevTools 可以将生成的文件自动映射到源代码文件，这样，您可以在 Sources 面板中实时编辑这些文件并查看结果，而不用离开 DevTools 或刷新页面。 

### 预处理器工作流

在检查样式由生成的 CSS 文件提供的元素时，Elements 面板会显示原始的源文件而不是生成的 CSS 文件的链接。

![显示 .scss 样式表的 Elements 面板](imgs/sass-debugging.png)

要跳转到源文件，请执行以下操作：

1. 点击链接，在 Sources 面板中打开（可编辑）源文件。
2. <kbd class="kbd">Ctrl</kbd> + **点击**（或 <kbd class="kbd">Cmd</kbd> + **点击**）任何 CSS 属性名称或值，打开源文件并跳转到相应行。

![显示 .scss 文件的 Sources 面板](imgs/sass-sources.png)

在 DevTools 中保存对 CSS 预处理器文件的更改时，CSS 预处理器应重新生成 CSS 文件。然后，DevTools 将重新加载新生成的 CSS 文件。

### 启用/停用 CSS 源映射和自动重新加载

**默认情况下，CSS 源映射处于启用状态**。您可以选择启用生成的 CSS 文件的自动重新加载。要启用 CSS 源映射和 CSS 重新重新加载，请执行以下操作：

1. 打开 DevTools 的 Settings 面板并点击 **General**。
2. 开启 **Enable CSS source maps** 和 **Auto-reload generated CSS**。

### 要求和问题

- DevTools 无法检测到**在外部编辑器中进行的更改**，直至包含关联的源文件的 Sources 标签重新获得焦点。
- **手动修改 Sass/LESS/其他编译器生成的 CSS 文件**将中断源映射关联，直至页面重新加载。
- **使用<a href="/web/tools/setup/setup-workflow">工作区</a>？**确保生成的 CSS 文件同时映射到工作区中。为此，您可以查看 Sources 面板右侧树，确定 CSS 是从您的本地文件夹提供。
- **要使 DevTools 在您更改源文件时自动重新加载样式**，必须将您的预处理器设置为在源文件每次发生更改时都重新生成 CSS 文件。否则，您必须手动重新生成 CSS 文件并重新加载页面才能看到更改。
- **您必须从网络服务器访问您的网站或应用**（不是从 **file://** 网址），服务器必须提供 CSS 文件，以及源映射 (.css.map) 和源文件 (.scss, etc.)。
- 如果您_未_使用“工作区”功能，网络服务器还必须提供 `Last-Modified` 标头。

在[设置 CSS 与 JS 预处理器](/web/tools/setup/setup-preprocessors)中了解如何设置源映射。




{# wf_devsite_translation #}
