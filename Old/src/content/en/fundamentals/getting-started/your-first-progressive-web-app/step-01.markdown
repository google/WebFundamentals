---
layout: shared/narrow
title: "Architect the App Shell"
description: "What is an app shell and how do you architect a web app to use the app shell model?"
published_on: 2016-02-04
updated_on: 2016-02-04
translation_priority: 1
order: 2
authors:
  - petelepage
---

<p class="intro">
The app's shell, is the minimal HTML, CSS, and JavaScript that is required to 
power the user interface of a progressive web app and is one of the the 
components that ensures reliably good performance. Its first load should be 
extremely quick, then immediately be cached. This means that the shell does not 
need to be loaded every time, but instead just gets the necessary content.
</p>

{% include shared/toc.liquid %}

App shell architecture separates the core application infrastructure and UI from 
the data. All of the UI and infrastructure is cached locally using a service 
worker so that on subsequent loads, the Progressive Web App only needs to retrieve 
the necessary data, instead of having to load everything.

<figure>
  <img src="images/appshell.jpg" /> 
</figure>

Put another way, the app shell is similar to the bundle of code that you'd 
publish to an app store when building a native app. It is the core components 
necessary to get your app off the ground, but likely does not contain the data.

## Why use the app shell architecture?

Using the app shell architecture allows you to focus on speed, giving your 
Progressive Web App similar properties to native apps: instant loading and 
regular updates, all without the need of an app store.

## Design the app shell 

The first step is to break the design down into its core components. 

Ask yourself:

* What needs to be on screen immediately?
* What other UI components are key to our app? 
* What supporting resources are needed for the app shell? For example images, 
  JavaScript, styles, etc.

We're going to create a Weather app as our first Progressive Web App. The key 
components will consist of:

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6-col">
    <ul>
      <li>Header with a title, and add/refresh buttons</li>
      <li>Container for forecast cards</li>
      <li>A forecast card template</li>
      <li>A dialog box for adding new cities</li>
      <li>A loading indicator</li> 
    </ul>
  </div>
  <div class="mdl-cell mdl-cell--6-col">
    <img src="images/weather-ss.png">
  </div>
</div>

When designing a more complex app, content that isn't needed for the 
initial load can be requested later and then cached for future use. For example, 
we could defer the loading of the New City dialog until after we've rendered the 
first run experience and have some idle cycles available.
