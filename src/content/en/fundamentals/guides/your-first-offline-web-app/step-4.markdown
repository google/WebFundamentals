---
layout: shared/plain
title: "Build the starter app"
description: "TODO"
notes:
  styling:
    - Styling will come later
written_on: 2014-04-17
updated_on: 2014-04-23
translation_priority: 0
authors:
  - paulkinlan
---

{% include shared/toc.liquid %}

Turn up your speakers to full volume. Click the horn and it should make a sound.  
<img src="images/image01.png" width="624" height="382" />  
Now kill the server (ctrl-c in the command line).  This simulates the network 
going offline. Then reload the site. The page should fully reload and you should 
be able to still use the horn.

<img src="images/image01.png" width="624" height="382" />  
The reason why this works offline is the basis of this codelab: offline support 
with service worker.

We are now going to remove all offline support and you are going to learn how to 
use Service Worker offline by adding it back into this application.


