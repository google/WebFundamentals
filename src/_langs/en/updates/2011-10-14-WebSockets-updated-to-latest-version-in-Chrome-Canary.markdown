---

layout: update
published: true

collection: updates
category: chrome
product: chrome
type: news
date: 2011-10-14

title: "WebSockets updated to latest version in Chrome Canary"
description: ""
article:
  written_on: 2011-10-14
  updated_on: 2011-10-14
authors:
  - ericbidelman
tags:
  - websockets
permalink: /updates/2011/10/WebSockets-updated-to-latest-version-in-Chrome-Canary.html
---
The WebSocket API has been rev'd to the latest version (13) in Chrome Canary. The developer-facing changes are very small, but are incompatible with the older version.

Here's the scoop:

* Change the origin header name: `Sec-WebSocket-Origin` -> `Origin`
* `Sec-WebSocket-Version` header value: 8 -> 13