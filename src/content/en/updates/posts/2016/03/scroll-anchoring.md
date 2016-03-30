---
layout: updates/post
title: "Experiment Time: Scroll Anchoring"
description: "Scroll anchoring is a new UA intervention
that stops a web page from causing the page to move around
once you've started reading the content."
published_on: 2016-03-31
updated_on: 2016-03-31
authors:
  - mattgaunt
tags:
  - interventions
  - scroll-anchoring
featured_image: /web/updates/images/2016/03/scroll-anchoring/scroll-anchoring-keyart.png
---

Have you ever visited a web page, started reading some of the content and then the page sort of pops due to ad’s or images loading, making you lose your place on the page?

{% ytvideo 28ZsLMgjLl8 %}

Well it might be worth checking out the Scroll Anchoring flag in Chrome Dev / Canary.

[Scroll Anchoring](https://groups.google.com/a/chromium.org/forum/#!msg/intervention-dev/THTySB4TdDE/Kk4R68HvDAAJ) keeps track of where you are on the page and prevents anything that causes a reflow from disrupting your position on the page.

To try this feature out for yourself do the following:

1. Go to chrome://flags/#enable-scroll-anchoring on *Chrome Dev / Canary*
1. Select “Enabled” from the dropdown
1. Click “*Relaunch Now*” at the bottom of the screen

With this you’ll have scroll anchoring enabled.

{% ytvideo i0iitEFArxA %}

We've been using this for a while and we believe that this drastically improves the experience for all users on the web but we want to make sure that it works well everywhere, if you spot any examples where scroll anchoring failed to handle reflows in the page or examples where it shouldn’t have intervened, *we desperately want to hear about it!*

Send us feedback / examples where you’ve seen unexpected behaviour by filling out this form: [g.co/reportbadreflow](http://g.co/reportbadreflow)
