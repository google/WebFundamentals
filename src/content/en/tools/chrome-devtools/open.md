project_path: /web/tools/chrome-devtools/_project.yaml
book_path: /web/tools/chrome-devtools/_book.yaml
description: All of the ways that you can open Chrome DevTools.

{# wf_updated_on: 2020-07-10 #}
{# wf_published_on: 2018-12-14 #}
{# wf_blink_components: Platform>DevTools #}

# Open Chrome DevTools {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

There are many ways to open Chrome DevTools, because different users want fast access to different
parts of the DevTools UI.

## Open the Elements panel to inspect the DOM or CSS {: #elements }

When you want to inspect a DOM node's styles or attributes, right-click the element
and select **Inspect**.

<figure>
  <img src="/web/tools/chrome-devtools/images/inspect.png"
       alt="The Inspect option"/>
  <figcaption>
    <b>Figure 1</b>. The <b>Inspect</b> option
  </figcaption>
</figure>

Or press <kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>C</kbd> (Mac) or
<kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>C</kbd> (Windows, Linux, Chrome OS).

See [Get Started With Viewing And Changing CSS](/web/tools/chrome-devtools/css/).

## Open the Console panel to view logged messages or run JavaScript {: #console }

Press <kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>J</kbd>
(Mac) or <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>J</kbd> (Windows, Linux, Chrome OS) to
jump straight into the **Console** panel.

See [Get Started With The Console](/web/tools/chrome-devtools/console/get-started).

## Open the last panel you had open {: #last }

Press <kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>I</kbd> (Mac) or
<kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd>.

## Open DevTools from Chrome's main menu {: #chrome }

[main]: /web/tools/chrome-devtools/images/shared/main-menu.png

Click **Customize and control Google Chrome** ![Customize and control Google Chrome][main]{: .inline-icon }
and then select **More Tools** > **Developer Tools**.

<figure>
  <img src="/web/tools/chrome-devtools/images/open-from-main.png"
       alt="Opening DevTools from Chrome's main menu."/>
  <figcaption>
    <b>Figure 2</b>. Opening DevTools from Chrome's main menu
  </figcaption>
</figure>

## Auto-open DevTools on every new tab {: #auto }

Open Chrome from the command line and pass the `--auto-open-devtools-for-tabs` flag.

Mac:

    /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --auto-open-devtools-for-tabs

## Feedback {: #feedback .hide-from-toc }

{% include "web/_shared/helpful.html" %}
