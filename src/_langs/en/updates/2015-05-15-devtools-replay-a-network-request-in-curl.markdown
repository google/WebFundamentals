---
rss: false
layout: update
published: false
title: DevTools - replay a network request in cURL
date: 2015-05-15
article:
  written_on: 2015-05-15
  updated_on: 2015-05-15
authors:
- umarhansa
collection: updates
type: tip
category: tools
product: chrome-devtools
source_name: DevTips
source_url: https://umaar.com/dev-tips/3-copy-as-curl
permalink: /updates/2015/05/15/devtools-replay-a-network-request-in-curl
---
<img src="/web/updates/images/2015-05-15-devtools-replay-a-network-request-in-curl/copy-as-curl.gif" alt="DevTools - replay a network request in cURL">

Resources which show up in the network panel have a context menu which allows you to Copy as cURL, this will go into your clipboard at which point you can paste it into the command line, modify if necessary and then see the response. Request headers are also included.

In the example, I'm using: <a href="http://numbersapi.com/#42">http://numbersapi.com/#42</a>