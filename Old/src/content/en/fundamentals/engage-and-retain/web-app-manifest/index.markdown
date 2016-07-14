---
layout: shared/narrow-pages-list
title: "Improve User Experiences with a Web App Manifest"
description: "The web app manifest is a JSON file that gives you the ability to control how your web app or site appears to the user in areas where they would expect to see native apps (for example, a device's home screen), direct what the user can launch, and define its appearance at launch."
published_on: 2016-02-12
updated_on: 2016-02-12
authors:
  - josephmedley
translation_priority: 1
order: 1
notes:
  pwa: "Though you can use a web app manifest on any site, they are required for <a href='/web/progressive-web-apps'>progressive web apps</a>."
---

The [web app manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest) is a simple JSON file that gives you, the developer, the ability to control how your app appears to the user in areas where they would expect to see apps (for example the mobile home screen), direct what the user can launch, and define its appearance at launch.

Web app manifests provide the ability to save a site bookmark to a device's home screen. When a site is launched this way: 

* It has a unique icon and name so that users can distinguish it from other other sites
* It displays something to the user while resources are downloaded or restored from cache
* It provides default display characterstics to the browser to avoid a too abrupt a transition when site resources become available. 

It does all this through the simple mechanism of metadata in a text file. That's the web app manifest.

{% include shared/note.liquid list=page.notes.pwa %}
