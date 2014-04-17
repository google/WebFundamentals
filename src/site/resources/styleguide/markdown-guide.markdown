---
layout: default
title: "Markdown Guide"
description: "Markdown guide for the Styleguide description"
class: "page--styleguide"
learning-list:
  - Lorem ipsum dolor sit amet
  - Fugit itaque sapiente earum quo expedita
  - labore aliquam cupiditate veritatis nihil
article:
  written_on: 2014-01-01
  updated_on: 2014-01-06
  order: 3
collection: resources
---
{% comment %}
NOTE: This is our styleguide
{% endcomment %}

{% wrap content %}

# #h1 heading

## ##h2 heading

### ###h3 heading

#### ####h4 heading

##### #####h5 heading

Include Javascript


Include HTML

Inclide CSS

	{{ "{% include_code _code/test.css testcss css " }} %}

{% include_code _code/test.css somecss css %}





{% endwrap %}