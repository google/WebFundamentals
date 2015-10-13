---
layout: shared/narrow
published: false
title: "Debugging service workers"
description: "So far our service worker doesn't do very much. But it's enough that we can watch it working. That makes this a good time to talk about debugging."
authors:
  - josephmedley
published_on: 2015-10-01
updated_on: 2015-10-01
order: 5
key-takeaways:
  tldr:   
  - "Debugging service workers requires a few different tools including two different DevTools windows. You'll need one of those windows to debug install and activate." 
---

<p class="intro">
  So far our service worker doesn't do very much. But it's enough that we can 
  watch it working. That makes this a good time to talk about debugging.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.tldr %}

## The `sw-primer` project

The [`sw-primer` project](https://github.com/google/sw-primer), located at 
github.com, contains all of the code we've written so far. To set it up:

1. Clone the sw-primer repository to a location on your hard drive.

       $ git clone https://github.com/google/sw-primer.git

2. Switch to your new sw-primer folder and start up any HTTP server you have 
   available. You could use Python, for example.

       $ cd sw-primer
       $ python -m SimpleHTTPServer 8000

3. Open Chrome and navigate to `http://localhost:8000`.

Congratulations! You now have a running service worker that you can use for the 
rest of the debugging section.

## The tools

We'll cover a few basics here. This isn't documentation about DevTools. You can
find that over in the  [tools section](/web/tools/chrome-devtools) of this web
site.

### DevTools window

If you right click on any web page and select "Inspect" you'll see the DevTools
window. Use this to debug clients just as you would any other script.

![The devtools window](images/devtools-window.png)

You can also find the service worker here, but it takes a little digging. With
DevTools open, click the "Sources" tab. Now look for a "Service Workers" tab. In
the image below, it's in the center right. Your service worker appears as a
link. Clicking the link opens it for debugging. You can run console commands in
it, add breakpoints to it, and perform other common debugging tasks.

![Service worker debugging](images/service-worker-debugging.png)

### Stopping and clearing a service worker

You're going to want to clear an existing service worker during devleopment.
It's inevitable that you'll fix a bug or a logic error or just change the
design. To stop and clear a service worker, click the "Unregister" button in the
service workers panel.

![Service workers panel showing the Unregister button](images/service-workers-panel.png)

### chrome://serviceworker-internals

Enter this URL in a new browser tab. What you'll get is a list of all installed
service workers and various details about them. You'll also get a way to start
and stop them without unloading them and another place to unregister a service
worker.

![the chrome://serviceworker-internals page](images/serviceworker-internals.png)

## Debugging install and activate

If you've opened DevTools on sw-primer you might've noticed there are already 
log entries for the install and activate meaning they've already run. 

So how do you debug those events?

1. Go to `chrome://serviceworker-internals` and check the box at the top of the
page, the one that says "Open DevTools window and puse JavaScript execution on
Service Worker startup for debugging".

   ![the chrome://serviceworker-internals tab](images/open-devtools.png)

2. Locate the service worker you want to debug.

3. Click "Unregister" for that service worker. Notice that both the "Service
Workers" tab in DevTools and the chrome://serviceworker-internals tab contain an
"Unregister" button. Either will work.

4. Return to your client page and reload.

JavaScript execution stops at the first line of the service worker script. You 
can now step through it as you would any other script.

