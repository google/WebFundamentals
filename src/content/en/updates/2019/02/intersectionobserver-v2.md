project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Augment IntersectionObserver to report information about occlusion and visual effects.

{# wf_updated_on: 2019-02-05 #}
{# wf_published_on: 2019-02-06 #}
{# wf_tags: intersectionobserver #}
{# wf_featured_image: /web/updates/images/generic/timeline.png #}
{# wf_featured_snippet: Lorem ipsum. #}
{# wf_blink_components: Blink>Layout #}

# Trust is Good, Observation is Better—Intersection Observer v2 {: .page-title}

{% include "web/_shared/contributors/thomassteiner.html" %}

<div class="clearfix"></div>

Intersection Observer is one of these APIs that's probably universally loved, and, now that [Safari
has it](https://webkit.org/blog/8582/intersectionobserver-in-webkit/), also almost universally
supported. For a quick refresher, I recommend watching
[Surma](../../../resources/contributors/surma)'s
[Supercharged Microtip](https://www.youtube.com/embed/kW_atFXMG98) on Intersection Observer,
embedded below for your viewing pleasure, or reading his
[article](../../2016/04/intersectionobserver).

<iframe width="560" height="315" src="https://www.youtube.com/embed/kW_atFXMG98" frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
</iframe>

As a quick reminder, this is what the API looks like in the most basic case:

```javascript
const onIntersection = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      console.log(entry);
    }
  });
};

const observer = new IntersectionObserver(onIntersection);
observer.observe(document.querySelector('#some-target'));
```
