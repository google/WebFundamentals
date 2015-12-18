---
layout: shared/narrow
title: "What makes a great notification"
description: ""
authors:
- josephmedley
published_on: 2015-12-18
updated_on: 2015-12-18
order: 2
key-takeaways:
  tldr:
    - 
---

<p class="intro">
  
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.tldr %}

# Make it personal and relevant

Look at the notifications on any of your devices. You're likely to find two types of messages: messages that tell you very specific things and messages that are vague or opaque. For example, a social site might give you a notification like this:

[]

Notice that it tells you who sent it, even showing you his picture, and gives you some idea what it's about.

This one on the other hand tells you nothing that would make you want to open the application. 

[3 interactions]

# Make it available regardless of connectivity

Until recently only mobile apps could do this. With service workers you can store a notification until a user wants it. When the user clicks it, the status of the network is irrelevant. 