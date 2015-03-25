---
id: digg
layout: spotlight
collection: spotlight
published: false

date: 2015-01-09
article:
  written_on: 2015-01-09
  updated_on: 2015-01-09
authors:
  - pbakaus

title: "Digg.com"
link: http://digg.com
introduction: "Featuring a fast hamburger menu and a clean layout, Digg works amazingly well on mobile."
tags: 
- reader
- news
scores:
  pagespeed:
      speed: 57
      ux: 97
  webpagetest:
      value: 8291
      result: http://www.webpagetest.org/result/150115_EM_TMG/

related:
-
    title: "Web App Manifest"
    href: fundamentals/device-access/stickyness/web-app-manifest.html
    section:
      id: stickyness
      title: "Add To Home Screen"
      href: fundamentals/device-access/stickyness/
-
    title: "Theme Color"
    href: fundamentals/device-access/stickyness/additional-customizations.html
    section:
      id: stickyness
      title: "Add To Home Screen"
      href: fundamentals/device-access/stickyness/
---

<div class="spotlight-wrapper">

  <div class="container clear">
    <div class="content spotlight-wrapper__content g--half">
      <h2>Our thoughts</h2>
      <p>{{ page.introduction }}</p>

      <h3>What we like</h3>

      <p>Digg's mobile presentation is really what one could call "no fuzz". They focus on their core experience, and while the layout is clean and simple, they got all of their basic functionality covered. The reduction makes the layout blazing fast, as well as the expandable Hamburger menu.</p>

      <h3>Possible improvements</h3>

      <p>Digg blocks user zooming which is a no-no nowadays. We'd love to see them add a <a href="{{site.baseurl}}/{{page.related[0].href}}">manifest</a> so that you can install the web app on Android, as well as <a href="{{site.baseurl}}/{{page.related[1].href}}">theme-color support</a>.</p>

    </div>
    {% include modules/related_spotlight_guides.liquid list=page.related %}
  </div>

</div>