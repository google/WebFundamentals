---
layout: updates/post
title: "Taking advantage of GPU acceleration in the 2D canvas"
published_on: 2012-07-05
updated_on: 2012-07-05
authors:
  - ilmariheikkinen
tags:
  - news
  - gpu
  - canvas
  - graphics
---
The 2D canvas in Chrome got some hardware acceleration love back in February. The acceleration makes drawing 2D sprites really fast, as the implementation is using the GPU to do drawImage.

You can check out [this example](http://fhtr.org/gravityring/sprites.html) for the kinds of things the acceleration enables. The demo is drawing 180 transformed 256x256 PNG sprites on a full-window canvas and running an N-body simulation on them to make the sprites gravitate towards each other. And it all runs smoothly at 30 to 60 frames per second on a low-powered laptop.

There are still some rough edges in the acceleration implementation, so you may see performance degradation in some use cases (please let the Chrome team know through [new.crbug.com](http://new.crbug.com) so that we can fix them!)
