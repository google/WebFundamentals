---
layout: article
title: "What Is a Build Process"
description: "TBD."
introduction: "TBD."
article:
  written_on: 2014-05-29
  updated_on: 2014-05-29
  order: 1
collection: build-your-site
key-takeaways:
  build-process:
    - TBD.
notes:
  tbd:
    - TBD.
---
{% wrap content %}

{% include modules/takeaway.liquid list=page.key-takeaways.workflow-basics %}

{% include modules/toc.liquid %}

## How should the build process be used in your workflow?

##  What Tasks should you use it to automate?
during iteration
during optimization / deployment
Lots and lots of options. Gulp. Grunt. Brocolli. Make.
Key thing is that regardless of whether you’re using a build *system* vs a GUI like CodeKit is that you’re optimizing what you’ve got
You should be optimizing images/js/css/html, keeping things concatenated and minified where possible. Considering continuous integration performance testing. Have your build system automate finding out whether you’ve regressed on mobile (e.g using visual regression testing tools). Basically, they’re there to help you automate keeping your page small in size. If you aren’t using one, you have to take care of that yourself which is difficult and unpredictable.

## What's in the Starter Kit Build Process?

{% include modules/nextarticle.liquid %}

{% endwrap %}
