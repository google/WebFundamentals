---
layout: shared/narrow
title: "Personal, timely, and relevant"
description: "Here are a few tips for making your notifications personal, timely, and relevant."
authors:
- josephmedley
published_on: 2016-01-05
updated_on: 2016-01-05
order: 2
translation_priority: 1
---

<p class="intro">
  Here are a few tips for making your notifications personal, timely, and relevant.
</p>

{% include shared/toc.liquid %}

## Make it personal and relevant

Look at the notifications on any of your devices. You're likely to find two types of messages: ones that tell you specific things and ones that are vague or opaque. For example, a social site might give you a notification like this:

![A notification that says nothing](images/better-notification.png){:width="380px"}

Notice that it tells you who sent it, even showing you the sender's picture, and gives you some idea what it's about.

This one on the other hand tells you nothing that would make you want to open the application. 

![A notification that says nothing](images/bad-notification.png){:width="380px"}

## Make it available regardless of connectivity

Until recently only mobile apps could do this. With service workers you can store a notification until a user wants it. When the user clicks it, the status of the network is irrelevant. 

## Don't advertise your native app

The point of service workers, the technology behind push notifications, is that you can avoid the time and expense of writing an application separate from your web site. A user who has both your service worker and your native app may get duplicate notifications unless write server-side code to prevent it. You can avoid the problem completely; don't encourge users to run both.

## Don't advertise

You'll have opportunities to monitize the user experience once they're in your app. Don't blow it by spamming your users when they're not. If you spam your users with notifications, they may stop allowing them altogether.

## Keep it short.

Notifications aren't emails. The intent of notifications is to tease users so they'll open your app. How do you do that? Make it personal. Make it timely. Make it relevant.
