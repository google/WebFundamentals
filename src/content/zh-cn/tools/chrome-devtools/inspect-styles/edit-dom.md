project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:Chrome DevTools 的 Elements 面板中的 DOM 树视图可以显示当前网页的 DOM 结构。通过 DOM 更新实时修改页面的内容和结构。

{# wf_updated_on: 2015-04-29 #}
{# wf_published_on: 2015-04-29 #}

# 编辑 DOM {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

Chrome DevTools 的 Elements 面板中的 DOM 树视图可以显示当前网页的 DOM 结构。通过 DOM 更新实时修改页面的内容和结构。


### TL;DR {: .hide-from-toc }
- DOM 定义您的页面结构。每一个 DOM 节点都是一个页面元素，例如，标题节点或段落节点。
- 通过渲染的 DOM 实时编辑页面的内容和结构。
- 不过请记住，您无法在 Elements 面板中通过 DOM 更改修改源文件。重新加载页面会清空任何 DOM 树修改。
- 使用 DOM 断点留意 DOM 更改。


## 检查元素 {:#inspect-an-element}

使用 **Elements** 面板可以在一个 DOM 树中检查页面中的所有元素。
选择任何元素并检查应用到该元素的样式。

<video autoplay muted src="animations/inspect-element.mp4">
</video>

可以通过多种方式检查元素：

右键点击页面上的任何元素并选择 **Inspect**。

![通过右键点击检查元素](/web/tools/chrome-devtools/inspect-styles/imgs/right-click-inspect.png)

按 <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Shift</kbd>
+ <kbd class="kbd">C</kbd> (Windows) 或 <kbd class="kbd">Cmd</kbd>
+ <kbd class="kbd">Shift</kbd> + <kbd class="kbd">C</kbd> (Mac)，在 Inspect Element 模式下打开 DevTools，然后将鼠标悬停到某个元素上。
DevTools 会在 **Elements** 面板中自动突出显示您悬停的元素。点击元素可以退出检查模式，同时保持元素在 **Elements** 面板中处于突出显示状态。
 

点击 **Inspect Element** 按钮 ![Inspect 图标](/web/tools/chrome-devtools/inspect-styles/imgs/inspect-icon.png){:.inline} 转到 Inspect Element 模式，然后点击元素。



在控制台中使用 [`inspect`][inspect] 方法，例如 `inspect(document.body)`。


## DOM 导航

使用您的鼠标或键盘在 DOM 结构中导航。

折叠的节点的旁边会有一个向右箭头：![折叠的节点](imgs/collapsed-node.png){:.inline}


展开的节点的旁边会有一个向下箭头：![展开的节点](imgs/expanded-node.png){:.inline}


使用鼠标：

* 点击一次可以突出显示节点。
* 要展开节点，请双击节点上的任何地方，或者点击节点旁边的箭头。
* 要折叠节点，请点击节点旁边的箭头。

使用键盘：

* 按**向上箭头**键可以选择当前节点上方的节点。
* 按**向下箭头**可以选择当前节点下方的节点。
* 按**向右箭头**键可以展开折叠的节点。再按一次可以移动到（已展开）节点的第一个子级。
您可以使用此方法快速导航到深度嵌套的节点。


### 面包屑导航记录导航

Elements 面板的底部是面包屑导航记录。 

![面包屑导航记录](imgs/breadcrumb-body.png)

当前选定的节点将以蓝色突出显示。左侧是当前节点的父级。
再左侧是父级的父级。以此类推，一直到 DOM 树。


![扩展面包屑导航记录](imgs/breadcrumb-footer.png)

在结构中向上导航会移动突出显示焦点：

![面包屑导航记录向上导航](imgs/breadcrumb-trail.png)

DevTools 会在记录中显示尽可能多的项目。如果状态栏无法显示全部记录，将在记录截断的地方显示一个省略号 (...)。点击省略号可以显示隐藏的元素：


![面包屑导航省略号](imgs/breadcrumb-ellipsis.png)

## 编辑 DOM 节点和属性

要编辑 DOM 节点名称或属性，请执行以下操作：

* 直接在节点名称或属性上双击。
* 突出显示节点，按 <kbd>Enter</kbd>，然后按 <kbd>Tab</kbd>，
  直到选中名称或属性。
* 打开 [more actions 菜单](#more-actions) 并选择 **Add Attribute** 或 **Edit Attribute**。
**Edit Attribute** 取决于上下文；您点击的部分决定要编辑的内容。


完成后，结束标记将自动更新。

<video autoplay muted src="animations/edit-element-name.mp4">
</video>

### 以 HTML 形式编辑 DOM 节点及其子级

要以 HTML 形式编辑 DOM 节点及其子级，请执行以下操作：

* 打开 [more actions 菜单](#more-actions)并选择 **Edit as HTML**。 
* 按 <kbd>F2</kbd> (Windows / Linux) 或 <kbd>Fn</kbd>+<kbd>F2</kbd> (Mac)。
* 按 <kbd>Ctrl</kbd>+<kbd>Enter</kbd> (Windows / Linux) 或 <kbd>Cmd</kbd>+<kbd>Enter</kbd> (Mac) 保存更改。
* 按 <kbd>Esc</kbd> 可以退出编辑器而不保存。

![以 HTML 形式编辑](imgs/edit-as-html.png)

## 移动 DOM 节点

点击、按住并拖动节点可将其移动。

<video autoplay muted src="animations/move-node.mp4">
</video>

## 删除 DOM 节点

要删除 DOM 节点，请执行以下操作：

* 打开 [more actions 菜单](#more-actions)并选择 **Delete Node**。
* 选择节点并按 <kbd>Delete</kbd> 键。

注：如果您意外删除了节点，按 <kbd class='kbd'>Ctrl</kbd> + <kbd class='kbd'>Z</kbd>（Mac 上为 <kbd class='kbd'>Cmd</kbd> + <kbd class='kbd'>Z</kbd>）可以撤消您的上一步操作。

## 显示 more actions 菜单 {:#more-actions}

利用 **more actions** 菜单，您可以通过多种方式与 DOM 节点交互。
要查看该菜单，请右键点击节点，或者选择节点，然后按 **more actions** 按钮 (![more action 按钮](imgs/more-actions-button.png){:.inline}))。按钮仅在当前选定的元素上显示。


![more actions 菜单](imgs/more-actions-menu.png)

## 滚动到视图

悬停或选择 DOM 节点时，渲染的节点将在视口中突出显示。
如果节点滚动到屏幕以外，在节点位于当前视口上方时您将在视口顶部看到提示，而在节点位于当前视口下方时，您将在底部看到提示。例如，在下方的屏幕截图中，DevTools 指出 **Elements** 面板中当前选定的节点位于视口以下。


![视口下的元素](imgs/below-viewport.png)

要滚动页面使节点在视口中显示，请**右键点击**节点并选择 **Scroll into View**。


## 设置 DOM 断点

设置 DOM 断点以调试复杂的 JavaScript 应用。例如，如果您的 JavaScript 正在更改 DOM 元素的样式，请将 DOM 断点设置为在元素属性修改时触发。在发生以下一种 DOM 更改时触发断点：子树更改、属性更改、节点移除。

{# include shared/related_guides.liquid inline=true list=page.related-guides.breakpoints #}

### 子树修改

添加、移除或移动子元素时将触发子树修改断点。例如，如果您在 `main-content` 元素上设置子树修改，以下代码将触发断点：


    var element = document.getElementById('main-content');
    //modify the element's subtree.
    var mySpan = document.createElement('span');
    element.appendChild( mySpan );
    

### 属性修改

动态更改元素的属性 (`class, id, name`) 时将发生属性修改：


    var element = document.getElementById('main-content');
    // class attribute of element has been modified.
    element.className = 'active';
    

### 节点移除

从 DOM 中移除有问题的节点时将触发节点移除修改：



    document.getElementById('main-content').remove();
    

## 与 DOM 断点交互

Elements 和 Sources 面板均包含一个用于管理 DOM 断点的窗格。


每个断点都会列出元素标识符和断点类型。

![DOM breakpoints 窗格](imgs/dom-breakpoints-pane.png)

可通过以下方式之一与列出的每一个断点交互：

* **悬停**在元素标识符上可以显示元素在页面上的相应位置（类似于在 Elements 面板中悬停在节点上）。
* **点击**元素可以将其在 Elements 面板中选中。
* **切换**复选框可以启用或停用断点。

触发 DOM 断点时，断点将在 DOM Breakpoints 窗格中突出显示。
**Call Stack** 窗格将显示调试程序暂停的**原因**：


![断点原因](imgs/breakpoint-reason.png)

## 查看元素事件侦听器

在 **Event Listeners** 窗格中查看与 DOM 节点关联的 JavaScript 事件侦听器。
 

![Event Listeners 面板](imgs/event-listeners-pane.png)

Event Listeners 窗格中的顶级项目将显示具有已注册侦听器的事件类型。


点击事件类型（例如 `click`）旁的箭头可以查看已注册事件处理程序的列表。
每个处理程序都由一个类似于 CSS 选择器的元素标识符标识，例如 `document` 或 `button#call-to-action`。如果已为相同元素注册多个处理程序，将重复列示元素。


点击元素标识符旁的展开箭头可以查看事件处理程序的属性。Event Listeners 窗格将列出每个侦听器的以下属性：

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">事件侦听器属性和说明</th>
    </tr>
  </thead>
  <tbody>
  	<tr>
      <td data-th="Value"><code>handler</code></td>
      <td data-th="Description">包含一个回调函数。右键点击函数并选择 <strong>Show Function Definition</strong> 可以查看函数的定义位置（如果源代码可用）。</td>
    </tr>
    <tr>
      <td data-th="Value"><code>useCapture</code></td>
      <td data-th="Description">指示  <code>addEventListener</code> 上的 <a href="https://developer.mozilla.org/en-US/docs/Web/API/EventTarget.addEventListener">useCapture</a> 标志是否设置的布尔值。</td>
    </tr>
  </tbody>
</table>

注：许多 Chrome 扩展程序都会将其自己的事件侦听器添加到 DOM 上。如果您看到一些不是由您的代码设置的事件侦听器，您可能希望在[隐身窗口](https://support.google.com/chrome/answer/95464)中重新打开页面。默认情况下，隐身窗口会阻止扩展程序运行。

### 查看祖先实体事件侦听器

{% comment %}

code for screenshot

<!doctype html>
<html>
<body onload="console.log('onload');">
  <div onfocus="console.log('focus');">
    <button id="button" onclick="console.log('onclick');">点我</button>
  </div>
</body>
</html>

{% endcomment %}

如果启用 **Ancestors** 复选框，除了当前选定节点的事件侦听器外，还会显示其祖先实体的事件侦听器。



![已启用祖先实体](imgs/ancestors-enabled.png)

如果停用复选框，将仅显示当前选定节点的事件侦听器。


![已停用祖先实体](imgs/ancestors-disabled.png)

### 查看框架侦听器

{% comment %}

code for screenshot

<!doctype html>
<html>
<script src="https://code.jquery.com/jquery-2.2.0.js"></script>
<body>
  <button id="button">请点我</button>
  <script>
    $('#button').click(function() {
      $('#button').text('hehe, that tickled, thanks');
    });
  </script>
</body>
</html>

{% endcomment %}

某些 JavaScript 框架和库会将原生 DOM 事件封装到它们的自定义事件 API 中。
过去，这会让使用 DevTools 检查事件侦听器非常困难，因为函数定义仅会引用框架或内容库代码。**框架侦听器**功能让这一问题迎刃而解。


启用 **Framework listeners** 复选框时，DevTools 会自动解析事件代码的框架或内容库封装部分，然后告诉您实际将事件绑定到代码中的位置。



![框架侦听器已启用](imgs/framework-listeners-enabled.png)

如果停用 **Framework listeners** 复选框，事件侦听器代码很可能会在框架或内容库代码的其他地方解析。
 

![框架侦听器已停用](imgs/framework-listeners-disabled.png)



[inspect]: /web/tools/chrome-devtools/debug/command-line/command-line-reference#inspect


{# wf_devsite_translation #}
