---
layout: article
title: "Test Your Deployed Site"
description: ""
introduction: "Once your site is deployed, check that your site is performing and acting as you'd expect."
article:
  written_on: 2014-09-25
  updated_on: 2014-09-25
  order: 2
collection: test
authors:
  - mattgaunt
key-takeaways:
notes:
    - TBD.
---
{% wrap content %}

Running your site through these online tools gives you an overview of where
your site can be improved as well as an indication as to what your users are
experiencing when landing on your page.

{% include modules/toc.liquid %}

## PageSpeed Insights

PageSpeed Insights is a tool which gives you a list of optimisations you can
make to your site to improve page load time and highlights any common design
problems to improve the user experience.

You should be aiming for 100/100 for the user experience score and over 85/100
for speed.

The speed problems will generally fall into categories which can be solved at
build time using Grunt or Gulp, or problems which can be fixed with server
configuration changes. The server changes will often be a small amount of work
for big gains for the user.

<img src="imgs/pagespeed-insights.png" alt="PageSpeed Insights Example" />

To see how the Grunt and Gulp tasks can be used to improve your PageSpeed score,
[check out this video](https://www.youtube.com/watch?v=pNKnhBIVj4w).

## WebPageTest.org

You might want to think of WebPageTest as being the advanced version of
PageSpeed Insights.

[WebPageTest.org](http://webpagetest.org) is a fantastic tool for testing your
site's performance, testing over multiple runs where you can define the network
speed, location of request and even the see the performance of a repeat view.

One of the main metrics to look for is the `Speed Index` and you want to aim
for a score of less than 1000.

<img src="imgs/webpagetest.png" alt="Web PageTest Example" />

## SSLLabs

If you have SSL set-up, [Qualys's SSLLabs
Test](https://www.ssllabs.com/ssltest/) checks your site and checks for common
problems, including the selection of ciphers and any missing headers that can
help with performance.

<img src="imgs/qualsys-ssllabs.png" alt="Qualys SSLLabs Example" />

{% include modules/nextarticle.liquid %}

{% endwrap %}
