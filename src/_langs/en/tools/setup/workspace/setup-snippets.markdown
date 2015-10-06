---
layout: tools-article
title: "Set Up Snippets"
rss: false
seotitle: "Set Up Snippets in Chrome DevTools"
description: "Use DevTools snippets to save small scripts, bookmarklets, 
and utilities so that they're always available to you while debugging in the
browser."
introduction: "Use DevTools snippets to save small scripts, bookmarklets, 
and utilities so that they're always available to you while debugging in the
browser."
authors:
  - kaycebasques
article:
  written_on: 2015-10-01
  updated_on: 2015-10-01
  order: 1
collection: workspace
takeaways:
    - takeaway
    - takeaway
    - takeaway
---

<!-- how to handle local modifications content? 
     https://developer.chrome.com/devtools/docs/authoring-development-workflow#local-modifications -->

<!-- https://developer.chrome.com/devtools/docs/authoring-development-workflow#snippets
     http://www.briangrinstead.com/blog/devtools-snippets 
     https://github.com/bgrins/devtools-snippets
     http://bgrins.github.io/devtools-snippets/ 
     https://github.com/paulirish/devtools-addons/wiki/Snippets -->

{% wrap content %}

<!-- who what where when why how -->

Snippets are small scripts that you can author and execute within the 
**Sources** panel of Chrome DevTools. You can access and run them from 
any page. When you run a snippet, it executes from the
context of the currently open page. 

If you have small utilities or debugging scripts which you find yourself 
using repeatedly on multiple pages, consider saving the scripts as snippets. 
You can also use snippets as an alternative to 
[bookmarklets](https://en.wikipedia.org/wiki/Bookmarklet).

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.takeaways %}

## Access snippets

Use the snippets panel in Chrome DevTools to create, modify, run, 
and delete snippets.

1. [Open DevTools](setup-devtools#access-devtools) and go to the 
   **Sources** panel.

1. Click the layout toggle in the top-left corner of DevTools.

1. Click on the **Snippets** panel.

The video below shows how to navigate to the snippets panel. The **Sources**
tab is clicked, then the layout toggle in the top-left corner is clicked, 
then the **Snippets** panel is clicked.

{% animation animations/access-snippets.mp4 %}

## Create snippets

The left side of the snippets panel displays the list of snippets available
on your machine. The right panel displays an editor which you can use to
create and modify snippets. Once you have created snippets, clicking on
a snippet filename in the left panel makes DevTools display the 
snippet's source code in the right panel.

1. Right-click inside the file list panel.

1. Select **New** to create a new snippet file.

1. Type in a filename for your snippet, or type `Enter` to use the
   automatically-generated default name.

1. Enter your code in the right panel. After you enter your code, the 
   filename of the snippet is preceded by an asterisk (`*`). This means
   that the file has been modified but not yet saved.

1. To save, right-click in the source code panel and select **Save**. Or,
   type `Command` + `S` on Mac, or `Control` + `S` on Windows. You should
   see the asterisk in front of the snippet filename disappear.

In the video below, a snippet is created by right-clicking in the
file list panel and selecting **New**. Chrome DevTools automatically names
the file `Script snippet #11`. The filename is changed to `hi.js`. A 
line of code is entered in the editor. The file is saved by right-clicking
in the editor and selecting **Save**.

{% animation animations/create-snippet.mp4 %}

## Run snippets

There are three ways to run a snippet. 

* Right-click on the snippet filename (in the filename panel on the left) 
  and select **Run**.

![run snippet by right-clicking on filename](imgs/run-snippet-1.png)

* Click the **Run** button, highlighted in red in the image below.

![run snippet by clicking "run" button](imgs/run-snippet-2.png)

* Type `Cmd` + `Enter` on Mac, or `Ctrl` + `Enter` on Windows. 

### Evaluate in console

You can also evaluate a portion of a snippet in the DevTools console. 

1. Highlight the portion of code which you wish to run.

1. Right-click anywhere in the editor and select **Evaluate in Console**.
   Or, use the keyboard shortcut `Control` + `Shift` + `E` for Windows, or
   `Command` + `Shift` + `E` for Mac.

In the video below, a portion of a snippet is highlighted, and then that
portion is evaluated by right-clicking on the editor and selecting 
**Evaluate in Console**. Only the statements that were highlighted are
evaluated. The statements that were not highlighted are not evaluted.

{% animation animations/evaluate-in-console.mp4 %}

## Map snippets to external files via workspaces

By default, snippets are saved to DevTools local storage, which is not
easy to access via external editors. If you wish to edit your snippets
with external editors, or to use revision control systems like Git
to track the history of your snippets, you can map your snippets to
external files using [workspaces](setup-workflow).

## View local modifications

DevTools maintains a revision history of all changes made to local 
files. If you've edited a snippet and saved changes using DevTools, 
you can right-click anywhere in the snippet editor (while the snippet is
displayed) and click **Local modifications** to view this history.


A **History** panel will occur in the console area, which shows:

* A diff of the file changes

* The time each change was made

You can interact with the local modifications history in three ways:

* Clicking the **revert** link reverts the file back to its original state,
  removing the revision history.

* Clicking the **Apply original content** link reverts the file back to its
  original state, but maintains the revision history.

* Clicking the **Apply revision content** reverts the file back to the
  specified revision. The revision history is maintained.


## Use breakpoints, watch expressions, and more

Many of the features from the Sources panel, such as watch expressions
and breakpoints, are also available for snippets.

* More on [breakpoints](/web/tools/javascript/breakpoints/index)

{% endwrap %}
