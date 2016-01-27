---
layout: shared/narrow
title: "Using JavaScript Snippets"
description: "Use DevTools Snippets to save small scripts, bookmarklets, 
and utilities so that they're always available to you while debugging in the
browser."
published_on: 2015-10-13
updated_on: 2015-10-13
order: 2
authors:
  - kaycebasques
translation_priority: 0
key-takeaways:
  snippets:
    - Use Snippets to run small scripts from any page.
    - Run portions of Snippets in the Console with the "Evaluate in
      Console" feature.
    - Map Snippets to external files with Workspaces.
    - Remember that popular features from the Sources panel, like
      breakpoints, also work with Snippets.
---

<p class="intro">Snippets are small scripts that you can author and execute 
within the Sources panel of Chrome DevTools. You can access and run them 
from any page. When you run a snippet, it executes from the context of the 
currently open page.</p>

If you have small utilities or debugging scripts which you find yourself 
using repeatedly on multiple pages, consider saving the scripts as Snippets. 
You can also use Snippets as an alternative to 
[bookmarklets](https://en.wikipedia.org/wiki/Bookmarklet).

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.snippets %}

## Access Snippets

Use the Snippets panel in Chrome DevTools to create, modify, run, 
and delete Snippets.

1. Open DevTools and go to the **Sources** panel.
1. Click the layout toggle in the top-left corner of DevTools.
1. Click on the **Snippets** panel.

{% animation /web/tools/chrome-devtools/debug/snippets/animations/access-snippets.mp4 %}

## Create Snippets

The left side of the Snippets panel displays the list of Snippets available
on your machine. The right panel displays an editor which you can use to
create and modify Snippets. Once you have created Snippets, clicking on
a snippet filename in the left panel makes DevTools display the 
snippet's source code in the right panel.

1. Right-click inside the file list panel.
1. Select **New** to create a new snippet file.
1. Type in a filename for your snippet, or press `Enter` to use the
   automatically-generated default name (e.g. `Script snippet #1`).
1. Enter your code in the right panel. After you enter your code, the 
   filename of the snippet is preceded by an asterisk (`*`). This means
   that the file has been modified but not yet saved.
1. To save, right-click in the source code panel and select **Save**. Or,
   type `Command` + `S` on Mac, or `Control` + `S` on Windows. You should
   see the asterisk in front of the snippet filename disappear.

{% animation /web/tools/chrome-devtools/debug/snippets/animations/create-snippet.mp4 %}

## Run Snippets

There are three ways to run a snippet. 

* Right-click on the snippet filename (in the filename panel on the left) 
  and select **Run**.

![run snippet by right-clicking on 
filename](/web/tools/chrome-devtools/debug/snippets/images/run-snippet-1.png)

* Click the **Run** button, highlighted in red in the image below.

![run snippet by clicking "run" 
button](/web/tools/chrome-devtools/debug/snippets/images/run-snippet-2.png)

* Press `Command` + `Enter` on Mac, or `Control` + `Enter` on Windows. 

### Evaluate in Console

You can also evaluate a portion of a snippet in the DevTools Console. 

1. Highlight the portion of code which you wish to run. Only this code
   is evaluated.
1. Right-click anywhere in the editor and select **Evaluate in Console**.
   Or, use the keyboard shortcut `Control` + `Shift` + `E` for Windows, or
   `Command` + `Shift` + `E` for Mac.

{% animation /web/tools/chrome-devtools/debug/snippets/animations/evaluate-in-console.mp4 %}

## View local modifications

DevTools maintains a revision history of all changes made to local 
files. If you've edited a snippet and saved changes using DevTools, 
you can right-click anywhere in the snippet editor (while the snippet is
displayed) and click **Local modifications** to view this history. 

![accessing local modification 
history](/web/tools/chrome-devtools/debug/snippets/images/local-modifications.png)

The history is displayed in a panel in the Console area. The history shows:

* A diff of the file changes.
* The time each change was made.

You can interact with the local modifications history in three ways:

* Clicking the **revert** link reverts the file back to its original state,
  removing the revision history.
* Clicking the **Apply original content** link reverts the file back to its
  original state, but maintains the revision history.
* Clicking the **Apply revision content** reverts the file back to the
  specified revision. The revision history is maintained.

![viewing local modification 
history](/web/tools/chrome-devtools/debug/snippets/images/local-modifications-history.png)

## Use breakpoints, keyboard shortcuts, and more

Many of the features from the Sources panel, such as 
[breakpoints](/web/tools/chrome-devtools/debug/breakpoints), are also available for 
Snippets.

You can also use the 
[keyboard shortcuts](/web/tools/chrome-devtools/iterate/inspect-styles/shortcuts) for the 
Sources panel when working with Snippets.

