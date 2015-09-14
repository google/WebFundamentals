---
title: "スタイルガイドの使い方"
description: "Web Starter Kit では、スタイルガイドの流儀に従って開発することが推奨されます。UI を Sass で管理可能な小グループに分割し、サイト上でどのコンポーネントを使っているのか、すぐに分かるようにします。このガイドでは、WSK でのスタイルガイドの使い方と、拡張方法を説明します。"
updated_on: 2014-04-23
translators:
  - agektmr
---

<p class="intro">
  Web Starter Kit には、サイトが利用するスタイルのすべてを迅速かつ簡潔に把握するためのスタイルガイドが付属します。CSS をコンポーネントと捉え、それに従ってスタイルとクラスを分割することで、スタイルの構造は簡素化され、コンポーネントがどのように配置されているのかを可視化することができます。
</p>

{% include shared/toc.liquid %}

## View the Style Guide HTML

To see the HTML and class names needed to add an element into your page, click
the ‘Toggle Code Snippets’ button at the top of the style guide. Once enabled
you’ll see a code example below each element with the appropriate markup which
you can copy, paste into your pages.

![Screenshot of Toggle Code Snippet Button](images/wsk-code-toggle.jpg)

## Extend the Style Guide

Whenever you create a new element which will appear in various places on your
site, consider adding the element to your style guide.

### Add a New Component

1. Open *app/styleguide/index.html* and after the last element, add the HTML
for your new element.

2. Inside app/styles/components/, create a new Sass file with an appropriate
name for your component.

3. Open app/styles/components.scss and at the bottom of the file, import your
new Sass file like so.

        // New Styles
        @import "_components/_<My Component Name>";

    Don’t forget to include the underscore in the filename; it indicates that
    the file is designed to be merged into other Sass files.

4. Test out how it looks on localhost by going to http://localhost:<Port Number>/styleguide/ and make sure the build was successful.

5. Finally, use your new component in your pages.

### Example of How to Add a Component

Below is a simple step through of adding a component to the Style Guide.

1. First we add our <footer> tag at the bottom of app/styleguide/index.html
and give it a class name Footer.

2. Then we create our sass file. Here we’ll create
app/styles/components/_footer.scss and add some really basic styles to get
us started.

        .Footer {
          height: 180px;
          background-color: #404040;
        }

3. At the bottom of components.scss, we add our footer sass file.

        // New Styles
        @import "_components/_footer";

4. By this point, running gulp serve and checking out the style guide, we
should be able to see the footer in all it’s glory.

5. Add a little more to our styles:

        .Footer {
          height: 180px;

          color: white;
          background-color: #404040;

          a {
              text-decoration: none;
              color: white;
          }
        }


6. Let’s add a title in styleguide.html so it looks like the other style guide
elements and perhaps a link at the top of the page.

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

7. Finally, flesh out our HTML a bit


        <footer class="Footer">
          <div class="container">
            <p>
              <a href="#">
                <i class="icon icon-chevron-up"></i> Back to top
              </a>
            </p>
          </div>
        </footer>

8. Done :)

    ![A new footer for the Web Starter Kit styleguide](images/wsk-footer.jpg)

You can now use the footer component in any page which includes the
components.scss file inside it (like the app/styles/main.scss file).

    /*
     * Visual Style Guide styles
     * Remove if you prefer to use a CSS library, like Bootstrap
     */
    @import "components/components";


