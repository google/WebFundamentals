---
layout: tools-article
title: "Set Up Snippets"
rss: false
seotitle: "Set Up Snippets in Chrome DevTools"
description: "Use DevTools snippets to save small scripts, bookmarklets, 
and utilities so that they're always available to you across pages."
introduction: "Use DevTools snippets to save small scripts, bookmarklets, 
and utilities so that they're always available to you across pages."
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
remember:
  canary:
    - remember.canary
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
**Sources** panel of Chrome DevTools. They are saved to local storage, so
you can access them from any page. When you run a snippet, it executes from the
context of the currently open page. 

If you have small utilities or debugging scripts which you find yourself 
using repeatedly on multiple pages, consider saving the scripts as snippets. 

You can also use snippets as an alternative to 
[bookmarklets](https://en.wikipedia.org/wiki/Bookmarklet).

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.takeaways %}

## Access snippets

1. [Open DevTools](setup-devtools#access-devtools) and go to the 
   **Sources** panel.

1. Click the layout toggle in the top-left corner. 

1. Click on the **Snippets** panel.

   The left panel displays a list of snippet files. The right panel displays
   the source code for a snippet. 

1. Click on a snippet file (in the left panel) to display its source code
   (in the right panel).

<!-- todo video of all 4 steps -->
The video below shows how to navigate to the snippets panel. The **Sources**
tab is clicked, then the layout toggle in the top-left corner is clicked. Last,
the **Snippets** panel is clicked.

## Create snippets

1. Right-click inside the file list panel.

1. Select **New** to create a new snippet file.

1. Type in a filename for your snippet, or type Enter to use the
   automatically-generated default name.

1. Enter your code in the right panel.

1. To save, right-click in the source code panel and select **Save**. Or,
   type `Command` + `Enter` on Mac, or `Control` + `Enter` on Windows.

<!-- create video. use google scholar, and incognito browser -->

## Edit snippets

There are two ways to edit 

## Run snippets

There are three ways to run a snippet. 

Right-click on the snippet filename and select **Run**.

Or, click the **Run** button.

Or, type `Cmd` + `r` on Mac, or `Ctrl` + `r` on Windows. 

### Evaluate in console

You can also evaluate a portion of a snippet in the DevTools console. 

## View local modifications

Over time, you may make numerous edits to a snippet. If you wish to view
the revision history of the snippet, right-click in the source code panel
of the snippet and select **Local Modifications**.

{% include modules/remember.liquid title="Note" list=page.remember.canary %}

{% endwrap %}
