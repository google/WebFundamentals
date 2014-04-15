---
layout: default
title: "Mutli-device layouts"
description: "Mobile-first web design is a goal for a development team to create sites, apps
and experiences that scale well across all devices from mobile upwards"
article:
  written_on: 2014-01-01
  updated_on: 2014-01-06
  order: 1
collection: the-essentials
---
# {{page.title}}

 What is mobile-first web design

Mobile-first web design is a goal for a development team to create sites, apps
and experiences that scale well across all devices from mobile upwards

Many people conflate Mobile-first design with: "My users will predominantly use
mobile"; instead Mobile-first design really means is "Mobile is my base
experience".

Mobile-first Web Design combines many techniques such as [Responsive Web
Design](link), [Progressive Enhancement](link) and [Responsive Server](link)
solutions to deliver experiences that work well across all form-factors.

{% for guide in page.articles.multi-device-layouts %}
{% class %}
### [{{guide.title}}]({{guide.url}})
{{guide.description}}
{% endclass %}
{% endfor %}


# Understanding and Managing Constraints
## Display

One of the most obvious constraints that we see is the huge variety of screen
sizes used by people on the web.

* Progressive Enhancement [link]
* Responsive Design [link]

Because the screen-size on a mobile device can be so small, you are need to
consider how the user will experience your app or site and this is the crux of
mobile-first design.  You don't build a full desktop experience and take away
elements that you think are not needed, rather you start with that mobile
experience.

* Link to Design.

## Hardware

We have moved from a world dominated by 4-core Intel behemoths that sit
underneath your desk, to tiny ARM based system-on-a-chip devices that we carry
around in our pocket.

Leading edge iPhones and Nexus experience devices are incredibly powerful, but
the range of devices that can access your experience is so vast that you need to
be mindful of a couple of things


* Memory - todo
* Storage - todo
* Video - todo
* Access to features - todo

## Network

In the good old days we could predict the type of network the user was on: a
slow one, so we built experiences that were suitable low-fi.  Slow networks then
got faster with the introduction of home broadband and that allowed us to
integrate video and other data heavy media elements.

Then the smartphone revolution happened and lots of our users became mobile,
users who are on slow high-latency networks.

For any given visitor we are unlikely to know what type of connection they have
at the point of request.  So we have to build experiences that are optimized
irrespective of connection.

Today there are numerous types of networks where users could be accessing your
content from:

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td></td>
<td>Low bandwidth</td>
<td>High bandwidth</td>
</tr>
<tr>
<td>High latency</td>
<td>2G, 3G, Dial-up</td>
<td>HSDPA</td>
</tr>
<tr>
<td>Low latency</td>
<td></td>
<td>4G, Fibre, ADSL</td>
</tr>
</table>

Can you make an assumption that a laptop is on a home network?  No.
Can you make an assumption that a smartphone is on a high-latency 3g network?
No.

[Links to illyas section]
