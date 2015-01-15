---
layout: section
title: "Add To Home Screen"
description: "Almost all of the major browser vendors allow users to pin or install your web app. So-called “stickyness” is a common argument for native apps but can be achieved with just a few tweaks to your markup."
introduction: "Almost all of the major browser vendors allow users to pin or install your web app. So-called “stickyness” is a common argument for native apps but can be achieved with just a few tweaks to your markup."
article:
  written_on: 2014-09-22
  updated_on: 2014-12-17
  order: 1
id: stickyness
collection: device-access
authors:
  - pbakaus
---
{% wrap content%}

To the user, the “add to homescreen” functionality works similarly to a 
supercharged bookmark: but without giving the browser instructions on how to 
display your app, mobile browsers will take the favicon or screenshot of your 
page for the bookmark and show the browser’s default UI when the user launches
your web app from the homescreen. Let’s look at the ways you can improve the
built-in behaviour.

Chrome and Safari support a very similar syntax by using `<meta>` and `<link>`
tags in the `<head>` of your page, and keep the overall feature relatively
lightweight.

Internet Explorer 10 introduced "Pinned Sites", a concept that offers 
additional functionality such as changing the presentation of the icon and 
notifications and while it supports the familiar `<meta>` tag style, it favors 
linked XML files that serve as configuration.

Note: Firefox APIs and features that are unique to Firefox OS are not covered here, 
instead refer to the official [Firefox OS documentation](https://developer.mozilla.org/en-US/Apps/Quickstart).

{% include modules/nextarticle.liquid %}

{% endwrap %}
