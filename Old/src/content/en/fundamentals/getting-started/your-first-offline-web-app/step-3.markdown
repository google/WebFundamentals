---
layout: shared/narrow
title: "Test the app"
published_on: 2015-09-30
updated_on: 2015-10-06
translation_priority: 1
order: 3
authors:
  - paulkinlan
---


Make sure your speakers are on, then click the horn; it should make a sound.

<img src="images/image01.png" />

Now kill the server (Ctrl-C in the command line).  This simulates the network 
going offline. Then reload the site. The page should fully reload and you should 
be able to still use the horn.

<img src="images/image01.png"  />  

The reason why this works offline is the basis of this codelab: offline support 
with service worker.

We are now going to remove all offline support and you are going to learn how to 
use service worker offline by adding it back into this application.


