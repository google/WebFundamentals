---
layout: shared/narrow-pages-list
title: "Improve User Experiences with a Web App Manifest"
description: "Web app manifests help user engagement, improve discoverability of native apps, and are required for progressive web apps."
published_on: 2016-02-12
updated_on: 2016-02-12
authors:
  - josephmedley
translation_priority: 1
order: 1
---

The [manifest for Web applications](https://developer.mozilla.org/en-US/docs/Web/Manifest) is a simple JSON file that gives you, the developer, the ability to control how your app appears to the user in the areas that they would expect to see apps (for example the mobile home screen), direct what the user can launch and more importantly how they can launch it.

Web app manifests provide the ability to save a site bookmark to a device's home screen. This suggests a number of things: 

* That it should have have a unique icon and name so that users can distinguish it from other other sites
* That it displays something to the user while resources are downloaded or restored from cache
* That certain default display characterstics are available to the browser to avoid a too abrupt a transition when site resources become available. 

It does all this through the simple mechanism of metadata in a text file. 

In addition, web app manifests are required for [progressive web apps](/web/fundamentals/getting-started/your-first-progressive-web-app) and can boost the discoverability of your native apps.

