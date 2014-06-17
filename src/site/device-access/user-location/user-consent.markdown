---
layout: article
title: "Efficiently obtain the user's consent"
description: ""
article:
  written_on: 2014-01-01
  updated_on: 2014-01-06
  order: 2
rel:
  gplusauthor: https://plus.google.com/+PaulKinlan
collection: user-location
introduction: ""
key-takeaways:
  geo: 
    -  Assume the user will not give you their location
    -  Make it clear why you need access to the users location
    -  Don't immediately prompt for access on page load.
---

{% wrap content %}

{% include modules/toc.liquid %}
{% include modules/takeaway.liquid list=page.key-takeaways.geo %}

As a web developer, having access to the users location opens up a huge number
of possibilities such as advanced filtering, pinpointing the user on a map,
and offering them pro-active suggestions on things they can do based on their
current position.

As a user your physical location it is a piece of information you want to
guard and only give out to people that you trust.  This is why the browser
shows a prompt when a site asks for their location.

[TODO add image]

Recent user studies have [TODO: ADD link from Jenny Gove] have shown that
users are distrustful of sites that simply prompt the user to away their
position on page load

## Assume the user will not give you their location

It might be a pain, but many of your users will not want to give you their
location so you need to adopt a defensive development style.

1.  Handle all errors out of the geolocation API so that you can adapt your
    site to this condition
2.  Be clear and explicit about your need for the API
3.  Use a fallback solution.


## Use a fallback

Our recomnedation is to not tie your site or application in to requiring
access to the users current location, but  If your application or site
absolutely requires it there are 3rd party solutions that allow you to obtain
a best guess of where the person currently is.

These solutions often work by looking at the users-IP address and mapping that
to the physical addresses registered with the RIPE database.  These locations
are often not very accurate normally giving you a position on the nearest
telecommunications hub to the user, or the nearest cell phone tower.  In many
cases they might not even be that accurate, especially if the user is on VPN
or some other proxy service.

## Request Access on a user gesture

Never try to request access to the users current location on page load.  The
user hasn't had time to read the page and understand the context of the
request.  Instead wait for a user gesture on an action that the user would 
expect to trigger a request.

## Give clear indication that an action will request their location

If you are going to request access to the users current location make it clear
with a prompt that you need it.

For example if you can offer better results to users because you know their
location, indicate that and give your users confidence that you are not trying
to track them.

## Gently nude the user to grant permission to their location

1.  Set a relatively short timeout for the geo-location API,
2.  Handle the error message

{% endwrap %}