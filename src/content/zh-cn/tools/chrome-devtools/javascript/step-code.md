project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:通过每次执行一个代码行或一个函数，您可以观察数据和页面中的变化，准确了解正在发生什么。

{# wf_updated_on: 2015-09-01 #}
{# wf_published_on: 2015-04-13 #}

# 如何单步调试代码 {: .page-title }

{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/pbakaus.html" %}
{% include "web/_shared/contributors/kaycebasques.html" %}

通过每次执行一个代码行或一个函数，您可以观察数据和页面中的变化，准确了解正在发生什么。您还可以修改脚本使用的数据值，您甚至可以修改脚本本身。

*为什么此变量值是 20 而不是 30？为什么该代码行看上去没什么效果？为什么此标志在应为 false 的时候成为 true？* 每个开发者都面临这些问题，逐步执行代码可了解问题所在。

[设置断点](add-breakpoints)后，返回此页面，并正常地使用它，直到达到某个断点。这将暂停页面上的所有 JavaScript，焦点转向“DevTools Sources”面板，并突出显示断点。现在，您可以有选择性地执行代码并逐步检查其数据。


### TL;DR {: .hide-from-toc }
- 逐步执行代码以便在问题发生之前或发生时观察问题，并通过实时编辑测试更改。
- 最好越过控制台记录，因为记录的数据在到达控制台时已过时。
- 启用“Async call stack”功能以提高异步函数调用堆栈的可视性。
- 将脚本设为黑箱以使第三方代码不出现在调用堆栈中。
- 使用已命名的函数而不是匿名函数，以提高调用堆栈可读性。


## 步骤的操作

所有步骤选项均通过边栏中的可点击图标![断点按钮栏](imgs/image_7.png){:.inline}表示，但也可以通过快捷键触发。下面是简要介绍：

<table>
  <thead>
    <tr>
      <th data-th="Icon/Button">图标/按钮</th>
      <th data-th="Action">操作</th>
      <th data-th="Description">描述</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_8.png" alt="Resume" class="inline"></td>
      <td data-th="Action">Resume</td>
      <td data-th="Description">继续执行直到下一个断点。如果没有遇到断点，则继续正常执行。</td>
    </tr>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_9.png" alt="Long Resume" class="inline"></td>
      <td data-th="Action">Long Resume</td>
      <td data-th="Description">继续执行，将断点停用 500 毫秒。便于暂时跳过断点，否则会持续暂停执行代码，例如，循环内的断点。<p><b>点击并按住 <i>Resume</i>，直到展开以显示操作。</b></p></td>
    </tr>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_10.png" alt="Step Over" class="inline"></td>
      <td data-th="Action">Step Over</td>
      <td data-th="Description">不管下一行发生什么都会执行，并跳转到下一行。</td>
    </tr>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_11.png" alt="Step Into" class="inline"></td>
      <td data-th="Action">Step Into</td>
      <td data-th="Description">如果下一行包含一个函数调用，<i>Step Into</i> 将跳转并在其第一行暂停该函数。</td>
    </tr>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_12.png" alt="Step Out" class="inline"></td>
      <td data-th="Action">Step Out</td>
      <td data-th="Description">函数调用后，执行当前函数剩余部分，然后在下一个语句暂停。</td>
    </tr>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_13.png" alt="Deactivate breakpoints" class="inline"></td>
      <td data-th="Action">Deactivate breakpoints</td>
      <td data-th="Description">暂时停用所有断点。用于继续完整执行，不会真正移除断点。再次点击以重新激活断点。</td>
    </tr>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_14.png" alt="Pause on exceptions" class="inline"></td>
      <td data-th="Action">Pause on exceptions</td>
      <td data-th="Description">在发生异常时，自动暂停执行代码。</td>
    </tr>
  </tbody>
</table>

使用 **step into** 作为典型的“一次一行”操作，因为它确保只有一个语句被执行，无论您进入或离开哪些函数。

当您怀疑未捕获的异常正在引发问题，但不知道异常在哪里时，使用 [Pause on exceptions](add-breakpoints#break-on-uncaught-exception)。启用此选项后，您可以通过点击 **Pause On Caught Exceptions** 复选框优化它；在此情况下，仅当发生需要特别处理的异常时执行才会暂停。

## 按作用域查看属性 {: #scope }

当您暂停脚本时，**Scope** 窗格会显示在该时刻当前已定义的所有属性。


在以下屏幕截图中，此窗格用蓝色突出显示。

![Sources 面板的 Scope 窗格](imgs/scope-pane.png)

Scope 窗格只有在脚本暂停时才会填充信息。页面运行时，Scope 窗格不含任何信息。


Scope 窗格显示在 local、closure 和 global 级别定义的属性。


如果某个属性旁有“Carat”图标，这意味着此属性指代一个对象。点击“Carat”图标可展开对象并查看其属性。


有时这些属性的显示会变暗。例如，在以下屏幕截图中，属性 `constructor` 比 `confirm` 属性暗淡。


![显示暗淡的属性](imgs/enumerables.png)

深颜色属性可以计数。浅颜色、显示暗淡的属性则不可计数。
如需了解详细信息，请参阅以下 Stack Overflow 主题：[Chrome 开发者工具 Scope 面板中的颜色有何含义？](Chrome 开发者工具 Scope 面板中的颜色有何含义？)



## 调用堆栈

在靠近边栏顶部的位置是 **Call Stack** 部分。在断点处代码暂停时，调用堆栈以倒序形式显示将代码带到该断点的执行路径。这不但有助于了解执行*现在*所在位置，还有助于了解代码的执行路径，这是进行调试的一个重要因素。

### 示例

<img src="imgs/image_15.png" alt="Call stack" class="attempt-left">

`index.html` 文件中位于第 50 行的一个初始 onclick 事件调用了位于 `dgjs.js` JavaScript 文件第 18 行的 `setone()` 函数，后者接着调用了位于同一文件第 4 行的 `setall()` 函数，执行在当前断点处暂停。




<div class="clearfix"></div>

### 启用异步调用堆栈

启用异步调用堆栈功能可提高执行异步函数调用的透明度。


1. 打开 DevTools 的 **Sources** 面板。
2. 在 **Call Stack** 窗格上，启用 **Async** 复选框。

以下视频包含一个展示异步调用堆栈功能的简单脚本。
在此脚本中，第三方库用于选择一个 DOM 元素。
一个名为 `onClick` 的函数被注册为此元素的 `onclick` 事件处理程序。
无论何时调用 `onClick`，它都会循序调用一个名为 `f` 的函数，该函数通过 `debugger` 关键字强制脚本暂停。

 

<video src="animations/async-call-stack-demo.mp4"
       autoplay muted loop controls></video>

在此视频中，触发了一个断点并展开了调用堆栈。堆栈中只有一个调用：`f`。
然后，启用异步调用堆栈功能，脚本继续执行，并再次触发断点和展开调用堆栈。此时，调用堆栈包含 `f` 之前的所有调用，包括第三方内容库调用和 `onClick` 调用。首次调用该脚本时，调用堆栈中只有一个调用。
第二次调用脚本时，有四个调用。简言之，异步调用堆栈功能可提高完整的异步函数调用堆栈的可视性。



### 提示：给函数命名以提高调用堆栈可读性

匿名函数使调用堆栈很难阅读。为函数命名以提高可读性。


以下两个屏幕截图中的代码段功能效果相同：代码功能并不重要，重要的是第一个屏幕截图中的代码使用匿名函数，而第二个屏幕截图中的代码使用已命名的函数。




在第一个屏幕截图的调用堆栈中，前两个函数均标明 `(anonymous function)`。
在第二个屏幕截图中，前两个函数已命名，从而让您更容易了解程序流的大致情况。在处理大量的脚本文件（包括第三方内容库和框架）时，您的调用堆栈为五个或者十个调用深，在函数已命名后，理解调用堆栈流要容易得多。




含匿名函数的调用堆栈：

![包含可读性低匿名函数的调用堆栈](imgs/anon.png)

含已命名函数的调用堆栈： 

![包含可读性更高已命名函数的调用堆栈](imgs/named.png)

<!-- blackbox OR disable third-party code??? -->

### 将第三方代码设置为黑箱

将脚本文件设置为黑箱以忽略来自调用栈的第三方文件。

设置为黑箱之前：

![设置为黑箱之前的调用堆栈](imgs/before-blackbox.png)

设置为黑箱之后：

![设置为黑箱之后的调用堆栈](imgs/after-blackbox.png)

如需将文件设置为黑箱：

1. 打开 DevTools Settings。

   ![打开 DevTools 设置](imgs/open-settings.png)

2. 在左侧的导航菜单中，点击 **Blackboxing**。

   ![Chrome DevTools 中的 Blackboxing 面板](imgs/blackbox-panel.png)

3. 点击 **Add pattern**。

4. 在 **Pattern** 文本字段中，输入您想要从调用堆栈排除的文件名模式。
DevTools 将排除与该模式匹配的任意脚本。
 

   ![添加黑箱模式](imgs/add-pattern.png)

5. 在文本字段右侧的下拉菜单中，选择 **Blackbox** 以执行脚本文件，但从调用堆栈排除调用，或选择 **Disabled** 以阻止执行文件。



6. 点击 **Add** 保存。

下次运行此页面并触发断点时，DevTools 将使函数调用不出现在来自调用堆栈的已设置为黑箱的脚本中。


## 数据操作

代码执行暂停时，您可以观察和修改其正在处理的数据。这对于尝试追踪一个看上去有错误值的变量或没有如期收到的传递参数很关键。

通过点击 **Show/Hide drawer** 显示 Console 抽屉![显示/隐藏抽屉](imgs/image_16.png){: .inline}或按 <kbd class="kbd">ESC</kbd>.在执行步骤时打开控制台，您现在可以：

* 输入变量的名称以在当前函数范围中查看其当前值
* 输入一个 JavaScript 分配语句以更改此值

尝试修改值，然后继续执行以查看它如何改变您的代码的结果，以及它是否如期运行。

#### 示例

<img src="imgs/image_17.png" alt="Console Drawer" class="attempt-left">

我们发现参数 `dow` 的值当前为 2，但在继续执行前将其手动更改为 3。


<div class="clearfix"></div>

## 实时编辑

观察并暂停执行代码有助于您查找错误，而实时编辑让您可以快速预览更改，无需重新加载。

如需实时编辑脚本，只需在执行步骤时点击“Sources”面板的编辑器部分。在编辑器中进行所需的更改，然后按 <kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">S</kbd>（或在 Mac 上按 <kbd class="kbd">Cmd</kbd>+<kbd class="kbd">S</kbd>）提交此更改。此时，整个 JS 文件将作为补丁程序进入 VM，并且所有函数定义都将更新。 

现在，您可以继续执行；已修改的脚本将替代原始脚本执行，并且您可以观察您的更改效果。

#### 示例

![实时编辑](imgs/image_18.png)

我们怀疑参数 `dow` 在被传递到函数 `setone()` 时，在任何情况下都会增加 1，也就是说，收到的值 `dow<` 在应为 0 时却为 1，在应为 1 时却为 2，等等。为了快速测试递减的传递值是否确认这是一个问题，我们在函数的开头添加第 17 行，并按 <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">S</kbd> 键提交并继续。




## 管理线程执行 {: #threads }

使用 Sources 面板上的 **Threads** 窗格可暂停、进入以及检查其他线程，例如服务工作线程或网络工作线程。


为展示 Threads 窗格，此部分使用了以下演示：[网络工作线程基本示例](http://mdn.github.io/simple-web-worker/)。


如果您打开应用上的 DevTools，就能发现 main 脚本位于 `main.js` 中：


![Main 脚本](imgs/main-script.png)

网络 worker 脚本位于 `worker.js` 中：

![Worker 脚本](imgs/worker-script.png)

Main 脚本侦听对 **Multiply number 1** 或 **Multiply number 2** 输入字段做出的更改。
侦听到更改时，main 脚本立即向网络工作线程发送一则消息，内含这两个需要相乘的数值。
网络工作线程执行完乘法运算后将结果返回给 main 脚本。



假定您在 `main.js` 中设置了一个在第一个数字发生变化时触发的断点：


![Main 脚本断点](imgs/main-script-breakpoint.png)

并且您还在 `worker.js` 中设置了一个在工作线程收到消息时触发的断点：


![Worker 脚本断点](imgs/worker-script-breakpoint.png)

在此应用的 UI 触发这两个断点时修改第一个数字。

![触发的 main 和 worker 脚本断点](imgs/breakpoints-triggered.png)

在 Threads 窗格中，蓝色箭头指示的是当前选定的线程。
例如，在上面的屏幕截图中，选定的是 **Main** 线程。 

DevTools 所有用于单步调试代码（继续或暂停脚本执行、单步执行下一函数调用、进入并单步执行下一函数调用等）的控件都与该线程有关。换言之，如果您在 DevTools 显示类似以上屏幕截图的内容时按 **Resume script execution** 按钮，Main 线程会继续执行，但网络工作线程仍将暂停。**Call Stack** 和 **Scope** 部分同样只显示 Main 线程的信息。


如果您想为网络工作线程单步调试代码，或查看其作用域和调用堆栈信息，只需在 Threads 窗格中点击其标签，使其旁边出现蓝色箭头。以下屏幕截图显示的是选择工作线程后调用堆栈和作用域信息的变化情况。同样，如果您要按任何一个单步调试代码按钮（继续执行脚本、单步执行下一函数调用等），该操作将只与工作线程有关。Main 线程不受影响。

![获得焦点的工作线程](imgs/worker-thread.png)


{# wf_devsite_translation #}
