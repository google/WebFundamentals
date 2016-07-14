---
layout: shared/narrow
title: "Service Worker Lifecycle"
description: "A service worker has a lifecycle which is completely separate from your web page."
published_on: 2014-12-01
updated_on: 2016-01-18
translation_priority: 0
order: 1
authors:
  - mattgaunt
---

<p class="intro">A service worker has a lifecycle which is completely separate 
	from your web page.</p>

To install a service worker for your site, you need to register it, which you do
in your page's JavaScript. Registering a service worker will cause the browser
to start the service worker install step in the background.

Typically during the install step, you'll want to cache some static assets. If
all the files are cached successfully, then the service worker becomes
installed. If any of the files fail to download and cache, then the install step
will fail and the service worker won't activate (i.e. won't be installed). If
that happens, don't worry, it'll try again next time. But that means if it does
install, you know you've got those static assets in the cache.

When we're installed, the activation step will follow and this is a great
opportunity for handling any management of old caches, which we'll cover during
the service worker update section.

After the activation step, the service worker will control all pages that fall
under its scope, though the page that registered the service worker for the
first time won't be controlled until it's loaded again. Once a service worker is
in control, it will be in one of two states: either the service worker will be
terminated to save memory, or it will handle fetch and message events which
occur when a network request or message is made from your page.

Below is an overly simplified version of the service worker lifecycle on its
first installation.

![service worker lifecydle](images/sw-lifecycle.png)