project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:通过 Chrome DevTools Command Line API，您可以使用各种方式观察和检查事件侦听器

{# wf_updated_on: 2015-08-02 #}
{# wf_published_on: 2015-04-13 #}

# 监控事件 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/flaviocopes.html" %}
通过 Chrome DevTools Command Line API，您可以使用各种方式观察和检查事件侦听器。JavaScript 在交互式页面中扮演着重要角色，浏览器为您提供一些有用的工具来调试事件和事件处理程序。


### TL;DR {: .hide-from-toc }
- 使用  <code>monitorEvents()</code> 侦听特定类型的事件。
- 使用  <code>unmonitorEvents()</code> 停止侦听。
- 使用  <code>getEventListeners()</code> 获取 DOM 元素的侦听器。
- 使用“Event Listeners Inspector”面板获取有关事件侦听器的信息。


## 监控事件

[monitorEvents()](/web/tools/chrome-devtools/debug/command-line/command-line-reference#monitoreventsobject-events) 方法指示 DevTools 记录与指定目标有关的信息。


第一个参数是要监控的对象。如果不提供第二个参数，所有事件都将返回。若要指定要侦听的事件，则传递一个字符串或一个字符串数组作为第二个参数。




在页面正文上侦听“click”事件：

    monitorEvents(document.body, "click");

如果监控的事件是受支持的*事件类型*，DevTools 将其映射到一组标准事件名称，则该方法侦听该类型的事件。



[Command Line API](/web/tools/chrome-devtools/debug/command-line/command-line-reference) 可提供完整的*事件类型*与其涵盖的事件的对应情况。

如需停止监控事件，请调用 `unmonitorEvents()` 方法并为其提供对象以停止监控。


停止侦听 `body` 对象上的事件：

    unmonitorEvents(document.body);

## 查看在对象上注册的事件侦听器

[getEventListeners() API](/web/tools/chrome-devtools/debug/command-line/command-line-reference#geteventlistenersobject) 返回在指定对象上注册的事件侦听器。


返回值是一个对象，其包含每个注册的事件类型（例如，`click` 或 `keydown`）数组。每个数组的成员是描述为每个类型注册的侦听器的对象。例如，以下代码列出了在文档对象上注册的所有事件侦听器：





    getEventListeners(document);

![使用 getEventListeners() 时的输出](images/events-call-geteventlisteners.png)

如果在指定对象上注册了多个侦听器，则数组包含每个侦听器的成员。以下示例中，在“#scrollingList”元素上为 `mousedown` 事件注册了两个事件侦听器：




![附加到 mousedown 的事件侦听器的视图](images/events-geteventlisteners_multiple.png)

进一步展开每个对象以查看它们的属性：

![展开的 listener 对象的视图](images/events-geteventlisteners_expanded.png)

## 查看在 DOM 元素上注册的事件侦听器

默认情况下，Elements Inspector 中的 *Event Listeners* 面板显示附加到页面的所有事件：


![Event listeners 面板](images/events-eventlisteners_panel.png)

过滤器将事件限制在选定的节点：

![Event listeners 面板，仅按选定的节点过滤](images/events-eventlisteners_panel_filtered.png)

通过展开对象，此面板显示事件侦听器详细信息。在此示例中，此页面拥有两个通过 jQuery 附加的事件侦听器：



![展开的事件侦听器视图](images/events-eventlisteners_panel_details.png)



{# wf_devsite_translation #}
