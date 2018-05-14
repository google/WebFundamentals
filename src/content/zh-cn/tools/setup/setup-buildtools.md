project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:从头开始构建您的多设备网站。了解如何使用一套构建流程工具加快开发速度和创建快速加载的网站。

{# wf_updated_on:2015-04-13 #}
{# wf_published_on:2014-09-24 #}

# 设置构建工具 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/mattgaunt.html" %}
从头开始构建您的多设备网站。了解如何使用一套构建流程工具加快开发速度和创建快速加载的网站。每个网站均应有一个开发版本和一个生产版本。<br /><br />开发版本具有构成网站的所有 HTML、CSS、JS 和图像文件，且格式清爽，便于您处理。<br /><br />生产版本将提取并缩小这些文件，然后对这些文件（如图像）加以串连/合并和优化。

网络开发者必须同时考虑很多事情，构建步骤就是一开始要处理的最重要也是最棘手的事情之一。
您必须弄清楚所有需要自动化的任务，例如：
图像压缩、CSS 缩小、JavaScript 串连、响应测试、单元测试，不一而足。



按照本指南了解构建工作流的最佳方法，从而确保您创建的网站从开始构建之时即遵循了所有最佳做法。




### TL;DR {: .hide-from-toc }
- 您的构建流程工具必须针对性能进行优化；它们应能够自动缩小和串连 JavaScript、CSS、HTML 和图像。
- 使用 LiveReload 等工具，以使开发流程更顺畅。


开始编码之前，需要考虑如何优化和构建网站的生产版本。
从头开始设置此工作流可以避免项目结束时出现任何糟糕的意外，而且您可以将工具添加到工作流中为您执行单调枯燥的任务，从而加快开发速度。




## 什么是构建流程？

构建流程是一组针对项目文件运行的任务，主要是在开发期间编译和测试代码，以及用于创建网站开发版本。构建流程不应是一组在开发工作流结束时运行的任务。


实现构建流程最热门的工具是 [Gulp](http://gulpjs.com/){: .external } 和 [Grunt](http://gruntjs.com/)，二者都是命令行工具。

如果您对这两款工具都没有使用经验，请使用 Gulp，我们在 [Web Starter Kit](/web/tools/starter-kit/) 中就是使用它，因此建议您也使用它。



很多工具都具有 GUI，而且可能更容易掌握，但不是很灵活。


<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">支持的平台和工具名称</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Supported Platforms">OS X / Windows</td>
      <td data-th="Gulp"><a href="http://alphapixels.com/prepros/">Prepros</a></td>
    </tr>
    <tr>
      <td data-th="Supported Platforms">OS X</td>
      <td data-th="Gulp"><a href="https://incident57.com/codekit/">CodeKit</a></td>
    </tr>
    <tr>
      <td data-th="Supported Platforms">OS X</td>
      <td data-th="Gulp"><a href="http://hammerformac.com/">HammerForMac</a></td>
    </tr>
  </tbody>
</table>


## 构建流程中应执行哪些任务？

在下文中，我们将介绍在构建流程中应执行的最常见任务，以及在使用 Grunt 和 Gulp 时我们建议执行的任务。


这需要执行大量试错工作，以按照您希望的方式完成一切设置，如果您不熟悉构建流程，这可能会令您感到气馁。


要获取一个好的构建流程示例，请查阅[Web Starter Kit 入门指南](/web/fundamentals/getting-started/web-starter-kit/)，该指南详细介绍了如何使用 Web Starter Kit，并解释了 Gulp 文件中每个命令的作用。您可以将此示例作为快速设置方式，然后根据需要加以更改。


如果您想要创建自己的构建流程，但又不熟悉 Gulp 和 Grunt，此快速入门指南将是您了解如何安装和运行您的首个构建流程的最佳途径：



* [Grunt 入门指南](http://gruntjs.com/getting-started)
* [Gulp 入门指南](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#getting-started)


### 使用串连和缩小功能以构建更快速的网站

对于不熟悉串连和缩小这两个术语的开发者，串连就是指将多个文件合并在一起，例如将多个文件复制粘贴到一个文件中。我们这样做的原因是它更为有效，因为浏览器只需获取一个文件，而不是很多小文件。


缩小是指提取文件并减少总字符数、但不更改代码工作方式的过程。
删除注释或提取一个长变量名称并缩小该名称就是一个很好的例子。
这样可以减小文件大小，从而加快下载速度。


对于缩小，使用以下插件：

<table>
  <thead>
    <tr>
      <th data-th="Type of File">文件类型</th>
      <th data-th="Gulp">Gulp</th>
      <th data-th="Grunt">Grunt</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Type of File">CSS</td>
      <td data-th="Gulp"><a href="https://github.com/ben-eb/gulp-csso">gulp-csso</a></td>
      <td data-th="Grunt"><a href="https://github.com/gruntjs/grunt-contrib-cssmin">grunt-contrib-cssmin</a></td>
    </tr>
    <tr>
      <td data-th="Type of File">JS</td>
      <td data-th="Gulp"><a href="https://github.com/terinjokes/gulp-uglify/">gulp-uglify</a></td>
      <td data-th="Grunt"><a href="https://github.com/gruntjs/grunt-contrib-uglify">grunt-contrib-uglify</a></td>
    </tr>
    <tr>
      <td data-th="Type of File">HTML</td>
      <td data-th="Gulp"><a href="https://www.npmjs.com/package/gulp-minify-html">gulp-minify-html</a></td>
      <td data-th="Grunt"><a href="https://github.com/gruntjs/grunt-contrib-htmlmin">grunt-contrib-htmlmin</a></td>
    </tr>
  </tbody>
</table>

对于串连，使用以下插件：

<table>
  <thead>
    <tr>
      <th data-th="Type of File">文件类型</th>
      <th data-th="Gulp">Gulp</th>
      <th data-th="Grunt">Grunt</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Type of File">CSS (Sass)</td>
      <td data-th="Gulp"><a href="https://github.com/dlmanning/gulp-sass">gulp-sass</a> 或 <a href="https://github.com/jonkemp/gulp-useref">gulp-useref</a></td>
      <td data-th="Grunt"><a href="https://github.com/gruntjs/grunt-contrib-sass">grunt-contrib-sass</a> 或 <a href="https://github.com/yeoman/grunt-usemin">grunt-usemin</a></td>
    </tr>
    <tr>
      <td data-th="Type of File">JS</td>
      <td data-th="Gulp"><a href="https://github.com/jonkemp/gulp-useref">gulp-useref</a></td>
      <td data-th="Grunt"><a href="https://github.com/yeoman/grunt-usemin">grunt-usemin</a> 或 <a href="https://github.com/fatso83/grunt-codekit">grunt-codekit</a></td>
    </tr>
  </tbody>
</table>

**注**：您可以通过利用“导入”功能来使用 Sass（[请参见 Web Starter Kit 中的示例](https://github.com/google/web-starter-kit/blob/master/app/styles/main.scss)）。


### 优化图像

图像优化是帮助加快网站速度的一个重要步骤；在不损害图像质量的情况下缩小图片的幅度会让您大吃一惊．
元数据会从图像中删除，因为浏览器不需要元数据即可显示图像，例如有关拍摄照片所用相机的信息。



对于图像优化，您可以使用以下模块。

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Gulp 和 Grunt</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Gulp"><a href="https://github.com/sindresorhus/gulp-imagemin">gulp-imagemin</a></td>
      <td data-th="Grunt"><a href="https://github.com/gruntjs/grunt-contrib-imagemin">grunt-contrib-imagemin</a></td>
    </tr>
  </tbody>
</table>

### 别因供应商前缀而出纰漏

为您使用的 CSS 包含所有供应商前缀通常是有点单调的任务。
使用前缀自动补全工具自动添加需要包含的前缀：


<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Gulp 和 Grunt</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Gulp"><a href="https://github.com/sindresorhus/gulp-autoprefixer">gulp-autoprefixer</a></td>
      <td data-th="Grunt"><a href="https://github.com/nDmitry/grunt-autoprefixer">grunt-autoprefixer</a></td>
    </tr>
  </tbody>
</table>

**注**  
如果您喜欢，您可以添加 [Sublime 软件包来执行前缀自动补全工作](/web/tools/setup/setup-editor#autoprefixer)。


### 切勿使文本编辑器处于实时重新加载状态

实时重新加载会在您每次做出更改后在浏览器中更新您的网站。只要使用一次，就再也离不开它了。


Web Starter Kit 使用 browser-sync 提供实时重新加载支持。

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Gulp 和 Grunt</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Gulp"><a href="http://www.browsersync.io/docs/gulp/">browser-sync</a></td>
      <td data-th="Grunt"><a href="https://github.com/gruntjs/grunt-contrib-connect">grunt-contrib-connect</a> 和 <a href="https://github.com/gruntjs/grunt-contrib-watch">grunt-contrib-watch</a></td>
    </tr>
  </tbody>
</table>

注：如果您喜欢实时重新加载这一想法，但不想有构建流程，请参阅 [Addy Osmani 撰写的有关 HTML5Rocks 的文章](http://www.html5rocks.com/en/tutorials/tooling/synchronized-cross-device-testing/)，其中介绍了各种替代方案（有些是免费的，有些是商业的）。


{# wf_devsite_translation #}
