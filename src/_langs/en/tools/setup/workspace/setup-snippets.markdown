---
layout: tools-article
title: "Set Up Snippets"
rss: false
seotitle: "Set Up Snippets in Chrome DevTools"
description: "Use DevTools snippetst to save small scripts, bookmarklets, 
and utilities so that they're always available to you while debugging."
introduction: "Use DevTools snippetst to save small scripts, bookmarklets, 
and utilities so that they're always available to you while debugging."
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

<!-- https://goo.gl/TXuIZI -->

{% wrap content %}

first para

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.takeaways %}

## Create a snippet

1. [Open DevTools](setup-devtools#access-devtools) and go to the 
   **Sources** panel.

1. Click the layout toggle in the top-left corner to display more panels. 

1. Click on the **Snippets** panel.

   The left panel displays a list of snippet files. Selecting a snippet file
   will open the file in the right panel. 

1. Right-click inside the file list panel and select **New** to create a 
   new snippet file.

1. Type in a filename for your snippet, or type Enter to use the
   automatically-generated default name.

   If you ever want to rename a snippet, right-click on the filename in the 
   left panel and select **Rename**.

## Edit a snippet

## Run a snippet

## Save a snippet

{% include modules/remember.liquid title="Note" list=page.remember.canary %}

{% endwrap %}
