project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: TODO

{# wf_blink_components: Platform>DevTools #}
{# wf_updated_on: 2018-04-12 #}
{# wf_published_on: 2018-04-10 #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# Save Changes To Disk With Workspaces {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

<aside class="objective">
  <b>Goal</b>: This tutorial teaches you how to set up and use the Workspaces feature in Chrome
  DevTools so that you can save changes that you make within DevTools to disk.
</aside>

<aside class="caution">
  <b>Prerequisites</b>: You should have a basic of understanding of how:
  <ul>
    <li>To use HTML, CSS, and JavaScript to build a web page.</li>
    <li>To open DevTools and make basic changes to CSS.</li>
    <li>
      Navigating to a URL eventually results in a web page getting displayed in the
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

If you're using any of the following frameworks:

* React

You should stop here because, unfortunately, **Workspaces** doesn't work with these frameworks.
See [Appendix: Why Workspaces don't work with all frameworks](#appendix) for an explanation of
the problem.

## Related feature: Local Overrides {: #overrides }

[Local Overrides][LO] is another DevTools feature that is similar to Workspaces. Use **Local
Overrides** when... TODO

[LO]: /web/updates/2018/01/devtools#overrides

## Step 1: Set up Workspaces {: #set-up }

### Set up the demo {: #demo }

1. [Open the demo](https://glitch.com/edit/#!/remix/workspaces){:.external}. In the top-left
   of the editor, there is a randomly-generated project name.
1. Click the randomly-generated project name. For example, in **Figure X** you would click
   `TODO`.
1. Select **Advanced Options** > **Download Project**.
1  Unzip the source code and move the unzipped directory on your desktop. The name of the
   unzipped directory is `app`.
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

## Appendix: Why Workspaces doesn't work with all frameworks {: #appendix }

1. Most frameworks use build tools like Gulp and Webpack to transform code from a structure that
   is easy for developers to maintain to a structure that is efficient for consumption on the web.
   For example, frameworks often minify files to remove unnecessary white space or comments,
   resulting in less bytes sent over the network, which means faster load times.
2. When DevTools saves a change, it saves it to the code that was packaged for the web, which is
   often different from the code that the developers authored.
3. Therefore, DevTools needs a way to map the published code to the developer's code. This is
   done via [source maps][maps]{:.external}.
4. The issue is that source maps are not a formal specification, so each framework does it
   differently. DevTools simply can't support all of the variations in source maps between
   frameworks.

[maps]: https://www.html5rocks.com/en/tutorials/developertools/sourcemaps/
