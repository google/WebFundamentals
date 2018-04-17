project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: TODO

{# wf_blink_components: Platform>DevTools #}
{# wf_updated_on: 2018-04-17 #}
{# wf_published_on: 2018-04-10 #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# Save Changes To Disk With Workspaces {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

<aside class="objective">
  <b>Goal</b>: This tutorial teaches you how to set up and use the Workspaces feature in Chrome
  DevTools so that you can save changes that you make within DevTools to disk.
</aside>

<aside class="caution">
  <b>Prerequisites</b>: You should have a basic of understanding of:
  <ul>
    <li>How to use HTML, CSS, and JavaScript to build a web page.</li>
    <li>How to open DevTools and make basic changes to CSS.</li>
    <li>
      How navigating to a URL eventually results in a web page getting displayed in the
      browser.
    </li>
  </ul>
</aside>

The video below provides an example of how Workspaces let you save changes to disk.

Workspaces enable you to save changes that you make in Devtools to a local copy of the same files
on your computer. For example, suppose that you are the main developer for `example.com`. You
are viewing the live, deployed site in Google Chrome, and you have the source code for the site
on your desktop. After setting up Workspaces, any changes that you make to `example.com` will
be saved to the local source code on your desktop.

## Unsupported frameworks {: #limitations }

In general, Workspaces doesn't work with any framework that automatically reloads a live preview
of a page when you make a change to its source code. Create React App is one notable example.
But, if you're feeling adventurous, please give it a try anyways and [let us know whether it
worked][WF]{:.external}. If you got it working but had to make adjustments, please describe what
you had to change. We'll update this doc to include your research and give you credit for the work.

[WF]: https://github.com/google/webfundamentals/issues/new

## Related feature: Local Overrides {: #overrides }

[Local Overrides][LO] is another DevTools feature that is similar to Workspaces. Use **Local
Overrides** when... TODO

[LO]: /web/updates/2018/01/devtools#overrides

## Step 1: Set up {: #set-up }

### Set up the demo {: #demo }

1. [Open the demo](https://glitch.com/edit/#!/remix/workspaces){:.external}. In the top-left
   of the editor, there is a randomly-generated project name.
1. Click the randomly-generated project name. For example, in **Figure X** you would click
   `TODO`.
1. Select **Advanced Options** > **Download Project**.
1. Unzip the source code and move the unzipped `app` directory to your desktop.
1. Back in the editor, click **Show**. The live demo opens in a new tab.
1. Close the editor tab, if you want. You won't be using it in this tutorial.

### Set up DevTools {: #devtools }

1. Press <kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>J</kbd> (Mac) or 
   <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>J</kbd> (Windows, Linux, Chrome OS) to open
   the **Console** panel of DevTools.
1. Click the **Sources** tab.
1. Click the **Filesystem** tab.
1. Click **Add Folder To Workspace**.
1. Select the `app` directory on your desktop.
1. Click **Allow** to give DevTools permission to read and write to this
   directory on your file system.

In the **Filesystem** tab, there is now a green dot next to `index.html`, `script.js`, and
`styles.css`. These green dots mean that DevTools has established a mapping between the
network resources of the page, and the files on your desktop.

## Step 2: Save a CSS change to disk {: #css }

1. Open the local copy of `styles.css` in your `app` directory. Note that the `color` property
   is being set to `fuchsia`.
1. Close `styles.css`.
1. In the DevTools window that is opened up alongside the live demo, click the **Elements** tab.
1. Select the `h1` element. In the **Styles** pane, you can see that the `h1` style rule
   defined at `styles.css:1` that is setting `color` to `fuchsia`.
1. Change the value of the `color` property to your favorite color.
1. Open the local copy of `styles.css` in your `app` directory. The `color` property is now
   set to your favorite color.

## Step X: Save an HTML change to disk {: #html }

### Try changing HTML from the Elements panel {: #elements }

The workflow that you're about to try doesn't work. You're learning it now, so that you don't
spend hours later trying to figure out why DevTools isn't working as you expect it to.

1. Click the **Elements** tab.
1. Double click the text content of the `h1` element, which says `Workspaces Demo`, and replace
   it with `New Title`.
1. Open the local copy of `index.html` on your desktop. The change that you just made isn't there.
1. Reload the page. The page reverts to its original title.

#### Optional: Why changes in the DOM Tree of the Elements panel aren't saved {: #why }

Note: This section describes why the workflow in the last section doesn't work. You can skip it
if this information isn't important to you.

This workflow doesn't work because the tree of nodes that you see on the **Elements** panel
represents the page's [DOM][DOM]{:.external}. To display a page, a browser fetches HTML over
the network, parses the HTML, and then converts it into a tree of DOM nodes. If the page has
any JavaScript, that JavaScript may add, delete, or change DOM nodes. The browser eventually uses
the DOM to determine what content it should present to browser users. So, the final state of the
page that users see may be very different from the HTML that the browser fetched. This makes
it difficult for DevTools to resolve where a change made in the **Elements** panel should be
saved, because the DOM is affected by both HTML and JavaScript.

[DOM]: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction

### Change HTML from the Sources panel {: #sources }

If you want to save a change to the page's HTML, do it via the **Sources** panel.

## Step 3: Save a JavaScript change to disk {: #js }

1. Click the **Sources** tab.
1. Click the **Page** tab.
1. Click **script.js**. The file opens.
1. Add the following code to the bottom of **script.js**:

       document.querySelector('a').style = 'font-style:italic';
