---
layout: article
title: "Using the Web Starter Kit Style Guide"
description: ""
introduction: ""
notes:
article:
  written_on: 2014-04-17
  updated_on: 2014-04-23
  order: 3
id: using-wsk-styleguide
collection: web-starter-kit
rel:
  gplusauthor: https://plus.google.com/+MattGaunt
  twitterauthor: "@Gauntface"
key-takeaways:
---

{% wrap content %}

{% include modules/toc.liquid %}

## Making the Most of the Styleguide

Web Starter Kit comes with a styleguide which is a quick and easy way to view
all the styles you'll have in your web app.

If you start a local server for Web Starter Kit with `gulp serve` and go to
/styleguide/ you'll see everything you get by default.

<!-- TODO: Explain why the styleguide is useful -->

### Viewing the Styleguide HTML

To see what HTML and class names are needed to add an element to your HTML page
you can click the 'Toggle Code Snippets' button.

<!-- TODO: Include image of the Toggle Code Snippets Button -->

After which you'll see a code example below each element with example HTML
that you can copy, paste and alter into your normal pages.

<!-- TODO: Include Example of a code snippet -->

## Extending the Styleguide

Whenever you have a new element that you're adding to your site and you think
it's to appear more than once, then it should be a prime candidate for adding
to the Styleguide.

### The Steps

1. Add the HTML to styleguide.html

2. Add a new Sass file in /styleguide/styles/

3. Test out how it looks on localhost:<Port Number>/styleguide/

4. Use in your page and Profit :)


{% include modules/nextarticle.liquid %}

{% endwrap %}
