project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:在 Chrome DevTools 中设置永久制作，以便立即查看更改和将这些更改保存到磁盘中。

{# wf_updated_on:2015-07-30 #}
{# wf_published_on:2015-07-08 #}

# 使用 DevTools 的工作区设置持久化 {: .page-title }

{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

在 Chrome DevTools 中设置永久制作，以便立即查看更改和将这些更改保存到磁盘中。

利用 Chrome DevTools，您可以更改网页上的元素和样式并立即查看更改。默认情况下，刷新浏览器后更改消失，除非您将其手动复制并粘贴到外部编辑器中。




通过工作区，您可以将这些更改保存到磁盘中，而不用离开 Chrome DevTools。将本地网络服务器提供的资源映射到磁盘上的文件中，并实时查看对这些文件的更改。





### TL;DR {: .hide-from-toc }
- 请勿将这些更改手动复制到本地文件中。使用工作区将在 DevTools 中进行的更改保存到您的本地资源中。
- 将您的本地文件暂存到浏览器中。将文件映射到网址。
- 设置好永久工作区后，在 Elements 面板中进行的样式更改将自动保留；DOM 更改则不会。在 Sources 元素面板中保留元素更改。


## 将本地源文件添加到工作区

要将本地文件夹的源文件设置为可以在 Sources 面板中修改，请执行以下操作：

1. 右键点击左侧面板。
2. 选择 **Add Folder to Workspace**。
3. 选择您想要映射的本地文件夹的位置。
4. 点击 **Allow**，授予 Chrome 访问该文件夹的权限。 

![将文件夹添加到工作区](imgs/addfolder.png)

通常，本地文件夹包含网站的原始源文件，用于在服务器上填充网站。如果您不希望通过工作区更改这些原始文件，请复制文件夹并将其指定为工作区文件夹。

## 暂存保留的更改

您已将本地文件夹映射到工作区中，但浏览器仍在提供网络文件夹内容。要将永久更改自动暂存到浏览器中，请将文件夹中的本地文件映射到网址：




1. 右键点击或者在按住 Ctrl 的同时点击 Sources 左侧面板中的文件。
2. 选择 **Map to File System Resource**。
3. 选择永久工作区中的本地文件。
4. 在 Chrome 中重新加载页面。

![将文件映射到网址](imgs/maptoresource.png)

之后，Chrome 会加载映射的网址，同时显示工作区内容，而不是网络内容。这样，您可以直接在本地文件中操作，而不必在 Chrome 与外部编辑器之间重复切换。






## 限制

尽管工作区功能强大，您仍应当注意一些限制。

* 只有 Elements 面板中的样式更改会保留；对 DOM 的更改不会保留。

* 仅可以保存在外部 CSS 文件中定义的样式。对 `element.style` 或内嵌样式的更改不会保留。（如果您有内嵌样式，可以在 Sources 面板中对它们进行更改。）

* 如果您有映射到本地文件的 CSS 资源，在 Elements 面板中进行的样式更改无需显式保存即会立即保留 - <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">S</kbd> 或者 <kbd class="kbd">Cmd</kbd> + <kbd class="kbd">S</kbd> (Mac)。


* 如果您正在从远程服务器（而不是本地服务器）映射文件，Chrome 会从远程服务器重新加载页面。您的更改仍将保存到磁盘，并且如果您在工作区中继续编辑，这些更改将被重新应用。

* 您必须在浏览器中使用映射文件的完整路径。要查看暂存版本，您的索引文件在网址中必须包含 .html。

## 本地文件管理

除了修改现有文件外，您还可以在为工作区使用的本地映射目录中添加和删除文件。



### 添加文件

要添加文件，请执行以下操作：

1. 右键点击 Sources 左侧窗格中的文件夹。
2. 选择 **New File**。
3. 为新文件键入一个包含扩展名的名称（例如 `newscripts.js`）并按 **Enter**；文件将添加到本地文件夹中。

### 删除文件

要删除文件，请执行以下操作：

1. 右键点击 Sources 左侧窗格中的文件。
2. 选择 **Delete** 并点击 **Yes** 确认。

### 备份文件

对文件进行重大更改前，复制原始文件进行备份非常有用。


要复制文件，请进行以下操作：

1. 右键点击 Sources 左侧窗格中的文件。
2. 选择 **Make a Copy...**。
3. 为文件键入一个包含扩展名的名称（例如 `mystyles-org.css`）并按 **Enter**。

### 刷新

直接在工作区中创建或删除文件时，Sources 目录将自动刷新以显示文件更改。要随时强制刷新，请右键点击文件夹并选择 **Refresh**。



如果您在外部编辑器中更改当前正在打开的文件，并且希望更改显示在 DevTools 中，刷新操作也非常有用。DevTools 通常可以自动捕捉此类更改，但是如果您希望确保万无一失，只需按上文所述刷新文件夹。

### 搜索文件或文本

要在 DevTools 中搜索已加载的文件，请按 <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">O</kbd> 或者 <kbd class="kbd">Cmd</kbd> + <kbd class="kbd">O</kbd> (Mac) 打开搜索对话框。您仍然可以在工作区中进行此操作，不过，搜索范围将扩展到 Workspace 文件夹中的远程已加载文件和本地文件。






要在多个文件中搜索某个字符串，请执行以下操作：

1. 打开搜索窗口：点击 **Show Drawer** 按钮 ![Show Drawer](imgs/show_drawer_button.png){:.inline} ，然后点击 **Search**；或者按 <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">F</kbd> 或 <kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Opt</kbd> + <kbd class="kbd">F</kbd> (Mac)。
2. 将字符串键入搜索字段并按 **Enter**。
3. 如果字符串是一个正则表达式或者需要不区分大小写，请点击相应的框。


![跨文件搜索字符串](imgs/searchacross.png)

搜索结果将显示在 Console 抽屉中并按文件名列示，同时指示匹配数量。使用**展开** ![展开](imgs/expand_button.png){:.inline}和**折叠** ![折叠](imgs/collapse_button.png){:.inline}箭头可以展开或折叠给定文件的结果。



{# wf_devsite_translation #}
