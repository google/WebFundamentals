---
layout: article
title: "Set Up Persistent Authoring"
seotitle: "Set Up Persistent Authoring in the DevTools by Mapping Source Files to Workspaces"
description: "Set up persistent authoring in your developer tools so that you can see your changes immediately and automatically save those changes to disk."
introduction: "Set up persistent authoring in your developer tools so that you can see your changes immediately and automatically save those changes to disk."
authors:
  - megginkearney
article:
  written_on: 2015-04-14
  updated_on: 2015-04-14
  order: 3
collection: workspace
key-takeaways:
  workflows: 
    - TBD.
---

{% wrap content%}

Chrome DevTools lets you make changes to elements of the webpage or the CSS and see your changes immediately. But what good is that to your authoring workflow if you have to copy-and-paste the changes to an external editor all the time? 

Workspaces helps you make those changes persist to disk without having to leave the Chrome DevTools to do so. With Workspaces, you can edit any type of source file from within the Sources panel and save your changes to disk.

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.workflows %}

## Map Your Source Fies to a Development Workspace

Map resources served from a local web server to files on disk, so when you change and save those files, you can view them as if they were being served. And if you have the right mapping set up, Style changes on the Elements panel persist to disk automatically.

TBD. Cover this: https://developer.chrome.com/devtools/docs/workspaces#bringing-your project into workspaces and https://developer.chrome.com/devtools/docs/workspaces#mapping-a network resource

TBD. The language is quite simple here, and might be re-usable: https://developer.chrome.com/devtools/docs/settings#workspace

## Set Up Local Staging

TBD. Workspaces requires a local server. Explain how to run a local server. This might move up before the mapping doc.

## Maintain Custom Directories

TBD. Covers this: https://developer.chrome.com/devtools/docs/workspaces#file-management with workspaces

{% include modules/nextarticle.liquid %}

{% endwrap %}
