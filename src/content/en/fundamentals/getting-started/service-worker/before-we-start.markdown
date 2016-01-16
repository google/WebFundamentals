---
layout: shared/narrow
title: "Before We Start"
description: ""
published_on: 2014-12-01
updated_on: 2016-01-18
translation_priority: 0
order: 2
authors:
  - mattgaunt
---

Grab the caches polyfill from this repository https://github.com/coonsta/cache-polyfill.

This polyfill will add support for Cache.addAll which Chrome M43's implementation of the Cache API doesn't currently support.

Grab dist/serviceworker-cache-polyfill.js to put somewhere in your site and use it in a service worker with the importScripts method. Any script which is imported will automatically be cached by the service worker.

importScripts('serviceworker-cache-polyfill.js');