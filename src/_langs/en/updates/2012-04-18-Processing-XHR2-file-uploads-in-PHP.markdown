---

layout: update
published: true

collection: updates
category: chrome
product: chrome
type: news
date: 2012-04-18

title: "Processing XHR2 file uploads in PHP"
description: ""
article:
  written_on: 2012-04-18
  updated_on: 2012-04-18
authors:
  - ericbidelman
tags:
  - xhr2
  - binary
permalink: /updates/2012/04/Processing-XHR2-file-uploads-in-PHP.html
---
My article "[New Tricks in XMLHttpRequest2](http://www.html5rocks.com/tutorials/file/xhr2/)" has many fine examples, but what it doesn't have is any server code to illustrate how to handle files. If you're curious how to process a file upload using `xhr.send(FormData)`, here's a quick example of an image upload in PHP.

This server is trivial but it demonstrates two things. The first is sending a file and extra payload at the same time. The second is how to grab the file (and other data) in PHP. Lastly, the image is encoded into a `data:` URL and included in a JSON response sent back to the client.

Note: the sample has been removed.