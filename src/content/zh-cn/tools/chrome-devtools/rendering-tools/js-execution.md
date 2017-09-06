project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:使用 Chrome DevTools CPU 分析器识别开销大的函数。

{# wf_updated_on:2016-03-30 #}
{# wf_published_on:2015-04-13 #}

# 加速执行 JavaScript {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

使用 Chrome DevTools CPU 分析器识别开销大的函数。


![CPU 分析](imgs/cpu-profile.png)


### TL;DR {: .hide-from-toc }
- 使用 CPU 分析器准确地记录调用了哪些函数和每个函数花费的时间。
- 将您的配置文件可视化为火焰图。


## 记录 CPU 分析 {:#record-profile}

如果您在 JavaScript 中注意到出现卡顿，请收集 JavaScript CPU 分析。CPU 分析会显示执行时间花费在页面中哪些函数上。


1. 转到 DevTools 的 **Profiles** 面板。
2. 选择 **Collect JavaScript CPU Profile** 单选按钮。
3. 按 **Start**。
4. 根据您要分析的内容不同，可以重新加载页面、与页面交互，或者只是让页面运行。
5. 完成后，按 **Stop** 按钮。
 

您也可以使用 [Command Line API][profile] 对命令行产生的分析进行记录和分组。


[profile]: /web/tools/chrome-devtools/debug/command-line/command-line-reference#profilename-and-profileendname

## 查看 CPU 分析 {:#view-profile}

完成记录后，DevTools 会使用记录的数据自动填充 Profile 面板。
 

默认视图为 **Heavy (Bottom Up)**。此视图让您可以看到哪些函数对性能影响最大并能够检查这些函数的调用路径。

 

### 更改排序顺序 {:#sort}

要更改排序顺序，请点击 **focus selected function** 图标 (![focus selected function 图标](imgs/focus.png){:.inline}) 旁的下拉菜单，然后选择下列选项中的一项：




**Chart**。显示记录按时间顺序排列的火焰图。

![火焰图](imgs/flamechart.png)

**Heavy (Bottom Up)**。按照函数对性能的影响列出函数，让您可以检查函数的调用路径。
这是默认视图。 

![大型图表](imgs/heavy.png)

**Tree (Top Down)**。显示调用结构的总体状况，从调用堆栈的顶端开始。
 

![树状图](imgs/tree.png)

### 排除函数{:#exclude}

要从您的 CPU 分析中排除函数，请点击以选择该函数，然后按 **exclude selected function** 图标 (![exclude function 图标](imgs/exclude.png){:.inline})。

已排除函数的调用方由排除函数的总时间管理。


点击 **restore all functions** 图标 (![restore all functions 图标](imgs/restore.png){:.inline}) 可以将所有排除的函数恢复到记录中。



## 以火焰图形式查看 CPU 分析 {:#flame-chart}

火焰图视图直观地表示了一段时间内的 CPU 分析。


[记录 CPU 分析](#record-profile)后，[更改排序顺序](#sort)为 **Chart**，以便以火焰图形式查看记录。


![Flamechart 视图](imgs/flamechart.png)

火焰图分为以下两部分：

1. **概览**。整个记录的鸟瞰图。
   条的高度与调用堆栈的深度相对应。
所以，栏越高，调用堆栈越深。 

2. **调用堆栈**。这里可以详细深入地查看记录过程中调用的函数。
横轴是时间，纵轴是调用堆栈。
堆栈由上而下组织。所以，上面的函数调用它下面的函数，以此类推。
 

   函数的颜色随机，与其他面板中使用的颜色无关。
不过，函数的颜色在调用过程中始终保持一致，以便您了解执行的模式。
 

![带标注的火焰图](imgs/annotated-cpu-flame.png)

高调用堆栈不一定很重要，只是表示调用了大量的函数。
但宽条表示调用需要很长时间完成。
这些需要优化。 

### 在记录的特定部分上放大 {:#zoom}

在概览中点击、按住并左右拖动鼠标，可放大调用堆栈的特定部分。
缩放后，调用堆栈会自动显示您选定的记录部分。


![缩放过的火焰图](imgs/benchmark-zoom.png)

### 查看函数详情 {:#flame-chart-function-details}

点击函数可在 **Sources** 面板中查看其定义。

将鼠标悬停在函数上可显示其名称和计时数据。提供的信息如下：
 

*  **Name**。函数的名称。
*  **Self time**。完成函数当前的调用所需的时间，仅包含函数本身的声明，不包含函数调用的任何函数。
*  **Total time**。完成此函数和其调用的任何函数当前的调用所需的时间。
*  **URL**。形式为 `file.js:100` 的函数定义的位置，其中 `file.js` 是定义函数的文件名称，`100` 是定义的行号。
*  **Aggregated self time**。记录中函数所有调用的总时间，不包含此函数调用的函数。
*  **Aggregated total time**。函数所有调用的总时间，不包含此函数调用的函数。
*  **Not optimized**。如果分析器已检测出函数存在潜在的优化，会在此处列出。


![在火焰图中查看函数详情](imgs/details.png)


{# wf_devsite_translation #}
