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
key-takeaways:
  use-keytakeaway:
    - It is pretty simple to add in a key takeaway
---
{% comment %}
NOTE: This is our styleguide
{% endcomment %}

{% wrap content %}

* Table of contents
{:toc}

## Headings

Styles for Headings

# #h1 heading

## ##h2 heading

### ###h3 heading

#### ####h4 heading

##### #####h5 heading

## Code

### Include Javascript

  {{ "{% include_code _code/test.js testjs javascript " }} %}

{% include_code _code/test.js somejs javascript %}


### Include HTML

  {{ "{% include_code _code/test.html testhtml html " }} %}

{% include_code _code/test.html somehtml html %}


### Include CSS

  {{ "{% include_code _code/test.css testcss css " }} %}

{% include_code _code/test.css somecss css %}

## Callouts

Using Callouts in your doc is easy.

### Key takeaway

    {{ "{% include modules/takeaway.liquid" }}
    	title='Key Takeaway' 
    	list=page.key-takeaways.use-keytakeaway %}

In your Article YAML Preamble

    key-takeaways:
	  use-keytakeaway:
	    - It is pretty simple to add in a key takeaway

{% include modules/takeaway.liquid title="Key Takeaway" list=page.key-takeaways.use-keytakeaway %}

{% endwrap %}