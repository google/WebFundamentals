---
layout: default
title: "Multi-device layouts"
description: "Mobile-first web design is a goal for a development team to create sites, apps
and experiences that scale well across all devices from mobile upwards"
article:
  written_on: 2014-01-01
  updated_on: 2014-01-06
  order: 1
id: multi-device-layouts
collection: the-essentials
---
{% wrap content%}

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
### [{{guide.title}}]({{site.baseurl}}{{guide.url}})
{{guide.description}}
{% endclass %}
{% endfor %}

{% endwrap %}
