---
layout: updates/post
title: "Notification requireInteraction &mdash; A smoother notification UX on desktop"
published_on: 2015-10-15
updated_on: 2015-10-15
authors:
  - paulkinlan
tags:
  - notification
description: "Notifications on desktop will be automatically dismissed after a short period of time."
featured_image: /web/updates/images/2015/10/notification.png
---

We've learnt a lot since Notifications and Push Messaging landed in the Chrome.  One
specific piece of feedback about Desktop class devices was that notifications
would stay around and visible on the users screen until were actively dismissed by the user.

When the page is open it is possible to create a simple JavaScript timer that will automatically
close the notification. But we now live in a world with Service Worker: where web apps can
live past the lifetime of a window and the Service Workers are put to sleep as quickly as possible
to save resources. This means we need another way to create a good experience for users.

The Nofitification spec has recently been updated to give the developer the ability to 
[indicate that the notfication should _not_ be automaticaly dismissed by the system](https://notifications.spec.whatwg.org/#require-interaction-preference-flag).  

> A notification has an associated require interaction preference flag which is initially 
> unset. When set, indicates that on devices with a sufficiently large screen, the notification 
> should remain readily available until the user activates or dismisses the notification.

This might seem odd, but what it implies that unless told otherwise the notification
should be removed from view after a short period of time.

Chrome 47 (beta in October 2015) now supports the `requireInteraction` option and unless explicitly 
provided *and* to set to `true` will mean that all notifications on *desktop* will be dismissed after
approximately 20 seconds. The interesting part though is that Chrome has recently just removed 
the Notification Center from all desktop platforms, this means that minimsied notifications
are considered to be dismissed and are not accessible in a call to `getNotifications` in a Service Worker.

On Chrome for Android, because the notifications are minimized in the notifications tray area, the 
`requireInteraction` option is ignored. 

{% highlight javascript %} 

var options = {
  body: 'Try https://airhorner.com/#instant',
  
  requireInteraction: true
}

var notification = new Notification('Paul is amaze', options);

{% endhighlight %}