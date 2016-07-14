---
layout: updates/post
title: "Pointer Lock API Brings FPS Games to the Browser"
published_on: 2012-02-06
updated_on: 2012-02-06
authors:
  - ilmariheikkinen
tags:
  - news
  - pointerlock
  - fullscreen
  - games
---
The [Pointer Lock API](http://dvcs.w3.org/hg/pointerlock/raw-file/default/index.html) recently landed in Chrome Canary and the Dev channel, all rejoice! Wait, what? You haven't heard of the Pointer Lock API? Well, in a nutshell, the Pointer Lock API makes it possible to write proper first-person shooters for the web.

The Chrome implementation lets a full-screen webpage ask your permission to capture the mouse pointer so that you can't move it outside the page. This lets web developers write 3D games and applications without having to worry about the mouse cursor moving outside of the page. When the pointer is locked, the pointer move events have `movementX` and `movementY` attributes defined that tell how much the mouse moved since the last move event. As usual with bleeding edge APIs, these attributes are vendor-prefixed, so you need to use `webkitMovementX` and suchlike.

To enable the Pointer Lock API in current Chrome builds, the easiest way is to go to `about:flags` and turn on the "Enable Pointer Lock"-flag. You can also turn it on by starting Chrome using the `--enable-pointer-lock` command line flag.

There are already a couple cool demos out taking advantage of this feature. Check out the [Quake 3 WebGL demo](http://media.tojicode.com/q3bsp/) by Brandon Jones to see how Pointer Lock API makes WebGL FPS games a viable prospect. Another cool demo is the [Webgl Street Viewer](http://www.clicktorelease.com/code/street/)

To get started with the Pointer Lock API, here's a small snippet cribbed from MDN:

{% highlight HTML %}
<button onclick="document.body.webkitRequestFullScreen();">No, you lock it up!</button>
<script>
navigator.pointer = navigator.pointer || navigator.webkitPointer;

var onError = function() {
  console.log("Mouse lock was not successful.");
};

document.addEventListener('webkitfullscreenchange', function(e) {
  if (document.webkitIsFullScreen) {
    navigator.pointer.lock(document.body, function() {
      // Locked and ready to play.
    }, onError);
  }
}, false);

document.body.addEventListener('webkitpointerlocklost', function(e) {
  console.log('Pointer lock lost!');
}, false);

document.body.addEventListener('mousemove', function(e) {
  if (navigator.pointer.isLocked) { // got a locked pointer
    var movementX = e.movementX || e.webkitMovementX;
    var movementY = e.movementY || e.webkitMovementY;
  }
}, false);
</script>
{% endhighlight %}

You can see a fuller example at [html5-demos.com](http://html5-demos.appspot.com/static/html5-therealbleedingedge/demos/mouselock.html). For more information, have a look at:

- [Vincent Scheib's blog post](http://beautifulpixels.blogspot.com/2012/01/javascript-pointer-lock-mouse-lock-in.html) (spec editor)
- [MDN documentation](https://developer.mozilla.org/en/API/Mouse_Lock_API)
- [W3C Specificiation](http://dvcs.w3.org/hg/pointerlock/raw-file/default/index.html)
