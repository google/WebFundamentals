---
layout: section
title: "User Location"
description: "Most browsers and devices have access to the user's geo-location. Learn how to work with the user's location in your site and apps."
introduction: "The Geolocation API lets you find out where the user is, always with the
  user's consent. This functionality could be used as part of user queries, e.g.
  to guide someone to a destination point. It could also be used for 'geo-
  tagging' some content the user has created, e.g. to mark where a photo was
  taken."
article:
  written_on: 2014-01-01
  updated_on: 2014-10-21
  order: 2
id: user-location
priority: 1
collection: device-access
authors:
  - paulkinlan
---

{% wrap content %}

The Geolocation API also lets you watch where the user is and keep tabs on them as
they move around, always with the user's consent (and only whilst the page is open), this opens up a lot of interesting usecases - such as integrating with backend systems to prepare an order for collection if the user is close by.

There are a lot of things that you need to be aware of when using using the Geolocation API and this guide will walk you through the common use-cases and solutions.

{% endwrap %}
