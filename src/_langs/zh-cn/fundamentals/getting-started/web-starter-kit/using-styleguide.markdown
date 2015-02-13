---
layout: article
title: "如何使用样式指南"
description: "Web 新手开发包鼓励你开发时采用样式指南驱动的方式。把你的 UI 分成易管理的 Sass 块，这样你可以迅速了解你的站点上正在使用哪些组件。本指南解释如何在 WSK 中使用、扩展样式指南。"
introduction: "Web 新手包附带一个样式指南，能够快速、便捷地查看你站点使用的所有样式。从组件的角度思考你的 CSS，然后相应地拆分样式与类，你就得到清晰结构的样式，也能看到所有组件放在一起是什么样子。"
notes:
article:
  written_on: 2014-04-17
  updated_on: 2014-04-23
  order: 3
id: using-wsk-styleguide
collection: web-starter-kit
authors:
  - mattgaunt
translators:
  - 陈三
key-takeaways:
---

{% wrap content %}

{% include modules/toc.liquid %}

## 查看样式指南 HTML

要查看添加页面元素所需的 HTML 和类名，点击样式指南顶部的 ’Toggle Code Snippets’ 按钮。一旦启用，你会在每个元素下看到一段带有适当标记的代码示例，你可以拷贝、粘贴到你的页面。

![Toggle Code Snippet 按钮的截图](images/wsk-code-toggle.jpg)

## 扩展样式指南

不管你什么时候创建一个会在网站的许多地方上使用的新元素，请考虑添加该元素到你的样式指南中。

### 添加一个新的组件

1. 打开 *app/styleguide.html*，在最后一个元素后面给你的新元素添加 HTML。

2. 在 app/styles/components/_components/ 中，给你的组件创建一个名称合适的新 Sass 文件。

3. 打开 app/styles/components.scss，在文件底部，以如下方式导入新 Sass 文件。

        // New Styles
        @import "_components/_<My Component Name>";

    别忘了在文件名中添加下划线；它指明该文件的目的是用于合并到其他 Sass 文件。

4. 访问 http://localhost:<Port Number>/styleguide.html，在本地测试它的外观情况，确保构建成功。

5. 最后，在你的页面中使用新组件。

### 示范如何添加组件

下面是一个简单的添加组件到样式指南中的步骤。

1. 首先我们在 app/styleguide.html 底部添加 <footer> 标签，给它一个类名 Footer。

2. 接着创建我们的 Sass 文件。这里我们会创建 app/styles/components/_footer.scss 文件然后添加一些非常基本的样式以便开始。

        .Footer {
          height: 180px;
          background-color: #404040;
        }

3. 在 components.css 底部，添加我们的 footer sass 文件。

        // New Styles
        @import "_components/_footer";

4. 现在，运行 `gulp serve` 并检查样式指南，我们应该能看到赏心悦目的 footer。

5. 添加多一点样式：

        .Footer {
          height: 180px;

          color: white;
          background-color: #404040;

          a {
              text-decoration: none;
              color: white;
          }
        }


6. 让我们在 styleguide.html 中添加一个标题，这样它看起来跟其他样式指南元素就很像，也许还可以在页面顶部添加一个链接。

        // Footer Link at top of styleguide.html
        <li class="summary-header__anchors-item">
          <a href="#footer">Footer</a>
        </li>

        .......

        // Footer Title
        <div class="container">
          <a name="footer"></a>
            <h2 class="subsection-title">
              <strong class="subsection-number">#21</strong> Footer
            </h2>
          </div>

          <!-- Input Component HTML Here -->
        </div>

7. 最后，再充实下 HTML。


        <footer class="Footer">
          <div class="container">
            <p>
              <a href="#">
                <i class="icon icon-chevron-up"></i> Back to top
              </a>
            </p>
          </div>
        </footer>

8. 结束 :)

    ![Web 新手开发包样式指南的全新页脚](images/wsk-footer.jpg)

你现在可以在引入 components.scss 文件的任意页面中使用 footer 组件 (比如 app/styles/main.scss 文件)。

    /*
     * Visual Style Guide styles
     * Remove if you prefer to use a CSS library, like Bootstrap
     */
    @import "components/components";

{% include modules/nextarticle.liquid %}

{% endwrap %}
