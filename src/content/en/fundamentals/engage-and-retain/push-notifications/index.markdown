---
layout: shared/narrow-pages-list
title: "Push Notifications: Timely, Relevant, and Precise"
description: "Push notifications are one of the most valuable capabilities of native apps, and this capability is now available on the web. To get the most out of them, notifications need to be timely, precise, and relevant."
published_on: 2016-07-01
updated_on: 2016-07-01
order: 1
translation_priority: 1
authors:
  - josephmedley
---

<p class="intro">Don't annoy your users, or you'll lose access to them
	forever. Do we need to say anything more than that? We do because it's easier said than
done. Push notifications are one of the most valuable capabilities of native apps, and
this capability is now available on the web. To get the most out of them,
notifications need to be timely, precise, and relevant.
</p>

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6-col" markdown="1">
_Timely_—A timely notification is one that appears when users want it and when
it matters to them.

_Precise_—A precise notification is one that has specific information that can
be acted on immediately.

_Relevant_—A relevant message is one about people or subjects the user cares
about.
  </div>
  
  <figure class="mdl-cell mdl-cell--6-col">
    <img src="images/tpnr.png" alt="Timely, precise, and relevant">
    <figcaption>Timely, precise, and relevant</figcaption>
  </figure>
</div>

## Are service workers involved? {#service-worker-involved}

Yes. We're not going to explain service workers. We will use service worker code
in later sections when we show you how to implement pushes and notifications.

## Two technologies {#two-technologies}

Push and notification are different, but complementary, features: a **push** is
the action of the server supplying information to a service worker; a
**notification** is the action of a service worker or web page showing the
information to a user.

## A little notification anatomy {#anatomy}

In the next section we're going to throw a bunch of pictures at you, but we
promised code. So, here it is. With a service worker registration you call
`showNotification` on a registration object.

{% highlight javascript %}
serviceWorkerRegistration.showNotification(title, options);
{% endhighlight %}

The `title` argument appears as a heading in the notification. The `options`
argument is an object literal that sets the other properties of a notification.
A typical options object looks something like this:

{% highlight json %}
{
  "body": "Are you free tonight?",
  "icon": "images/joe.png",
  "vibrate": [200, 100, 200, 100, 200, 100, 400],
  "tag": "request",
  "actions": [
    { "action": "yes", "title": "Yes!", "icon": "images/thumb-up.png" },
    { "action": "no", "title": "No", "icon": "images/thumb-down.png" }
  ]
}
{% endhighlight %}

This produces a notifiation that looks like this:

![The example notification.](images/joe-asked-contextual.png){:width="316px"}

In the next few sections we'll provide tips to help you build better
notifications. We'll go on to describe the mechanincs of implementing them,
including handling permissions and subscriptions, sending messages and
responding to them.
