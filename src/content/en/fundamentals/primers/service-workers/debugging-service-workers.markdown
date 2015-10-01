---
layout: shared/narrow
title: "Debugging service workers"
description: "So far our service worker doesn't do very much. But it's enough that we can watch it working. That makes this a good time to talk a little about debugging."
authors:
- josephmedley
published_on: 2015-10-01
updated_on: 2015-10-01
order: 5
key-takeaways:
  tldr:   
  - "dfdf " 
  - "dfdf"
---

<p class="intro">
  So far our service worker doesn't do very much. But it's enough that we can 
  watch it working. That makes this a good time to talk a little about 
  debugging.
</p>

## The sw-primer project

The sw-primer project, located at github.com, contains a number of samples 
including one containing all of the code we've written so far. To set it up:

1. Clone the sw-primer repository to a location on your hard drive.

       $ git clone https://github.com/google/sw-primer.git

2. Switch to your new sw-primer folder and start up any HTTP server you have 
   available. You could use Python, for example.

       $ cd sw-primer
       $ python -m SimpleHTTPServer

3. Open Chrome and navigate to localhost:8000/basic-worker.html

Congratulations! You now have a running service worker that you can use for the 
rest of the debugging section.

## The Tools

We'll cover a few basics here. There's much more information available in the 
DevTools documentation for Chrome and in [some location in the Firefox 
documentation]. The information here is for Chrome.

*DevTools Window*&mdash;If you right click on any web page and select "Inspect 
Element" you'll see the DevTools window. Use this to debug clients just as you 
would any other script. This isn't where you debug service workers.

![the devtools window](images/devtools-window.png)

*chrome://inspect#service-workers&mdash;Type this in the address bar of a new 
tab. You'll see a list of active service workers. Notice the two links under 
each entry. The 'terminate' link obviously terminates the service worker. If you 
click the 'inspect' link you'll see that a second DevTools window opens showing 
the service worker.

![the chrome://inspect#service-workers page](images/inspect-service-workers.png)

*chrome://serviceworker-internals*&mdash;This url is also for a list of service 
workers, but a more detailed and feature rich one. As I said, the full 
description of this page is over at [DevTools documentation]. 

![the chrome://serviceworker-internals page](images/serviceworker-internals.png)

## Start Debugging

If you've opened DevTools on sw-primer you might've noticed there are already 
log entries for the install and activate. 

So how do you debug those events?

1. Go to `Chrome://serviceworker-internals` and check the box at the top of the 
   page, the one shown in the image below.

   ![the open DevTools box is checked](images/open-devtools.png)

2. Go back to the tab containing sw-primer, then press and hold down the refresh 
   button. A menu appears.

   [Image]

3. Click 'Empty cache and hard reload'.

JavaScript execution stops at the first line of the service worker script. You 
can now step through it as you would any other script.

