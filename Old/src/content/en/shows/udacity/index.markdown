---
layout: shared/wide
title: "Udacity Courses"
description: "Get started or build your web design and development skills with these free Udacity courses taught by your friends at Google."
key_img: udacity_rect.png
published_on: 2015-02-24
updated_on: 2015-02-24
order: 11
udacity:
  - title: "Browser Rendering Optimization"
    description: "Google performance guru Paul Lewis is here to help you destroy jank and create web apps that maintain 60 frames per second performance."
    key_img: img/ud860.jpg
    udacity_id: ud860
  - title: "Responsive Web Design"
    description: "Learn the fundamentals of responsive web design with and create your own responsive web page that works well on any device - phone, tablet, desktop."
    key_img: img/ud893.jpg
    udacity_id: ud893
  - title: "Critical Rendering Path"
    description: "Learn about the Critical Rendering Path, or the set of steps browsers must take to convert HTML, CSS and JavaScript into living, breathing websites."
    key_img: img/ud884.jpg
    udacity_id: ud884
  - title: "Responsive Images"
    description: "Learn how to work with images on the modern web, so that your images look great and load quickly on any device."
    key_img: img/ud882.png
    udacity_id: ud882
---

<div class="wf-subheading">
  <div class="page-content">
    <h2>Learn with Udacity</h2>
    <p>
      Get started or build your web design and development skills with
      these <b>free</b> Udacity courses taught by your friends at Google.
    </p>
  </div>
</div>

<div class="page-content">
  <div class="mdl-grid">
    {% for course in page.udacity %}
      {% capture linkHref %}https://www.udacity.com/course/viewer#!/c-{{ course.udacity_id }}?utm_source=webfundamentals&utm_medium=d.g.com&utm_content=promo&utm_campaign=index{% endcapture %}
      {% capture linkText %}{{"take_course" | localize_string}}{% endcapture %}
      {% include shared/base_card.liquid imgUrl=course.key_img title=course.title text=course.description linkHref=linkHref linkText=linkText %}
    {% endfor %}
  </div>
</div>
