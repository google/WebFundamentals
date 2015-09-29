---
layout: shared/narrow-subdirectories-list
title: "Responsive layouts"
description: "Create flexible, not fixed layouts that works on mobile, desktop or anything else with a screen."
published_on: 2015-09-09
updated_on: 2015-09-09
translation_priority: 0
udacity:
  id: ud893
  title: Responsive Web Design Fundamentals
  description: "Explore what makes a site responsive and how some common responsive design patterns work across different devices. Learn how to create your own responsive layouts and experiment with breakpoints, and optimizing text and more."
  image: fundamentals/imgs/udacity-rwd.png
---

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6-col">
    <p class="intro">
      {{page.description}}
    </p>
  </div>
  {% include fundamentals/udacity_course.liquid uid=page.udacity.id title=page.udacity.title description=page.udacity.description image=page.udacity.image %}
</div>
