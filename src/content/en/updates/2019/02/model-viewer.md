project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Adding 3D models to a website can be tricky for a variety of reasons including the hosting issues and the high bar of 3D programming. That's why we're introducing the &lt;model-viewer&gt; web component to let you use 3D models declaratively.

{# wf_updated_on: 2019-05-02 #}
{# wf_published_on: 2019-02-06 #}
{# wf_tags: 3d,model-viewer #}
{# wf_featured_image: /web/updates/images/2019/02/space-suit.png #}
{# wf_featured_snippet: Adding 3D models to a website can be tricky for a variety of reasons including the hosting issues and the high bar of 3D programming. That's why we're introducing the <code>&lt;model-viewer&gt;</code> web component to let you use 3D models declaratively. #}
{# wf_blink_components: N/A #}

# The model-viewer web component {: .page-title}

Note: We're always [updating and improving](https://github.com/GoogleWebComponents/model-viewer/releases)
`<model-viewer>`. Check out the [`<model-viewer>` homepage](https://googlewebcomponents.github.io/model-viewer/)
to explore what it can do.

{% include "web/_shared/contributors/josephmedley.html" %}

Adding 3D models to a website can be tricky. 3D models ideally will be shown in
a viewer that can work responsively on all browsers - from smartphones, to
desktop, to new head-mounted displays. The viewer should support progressive
enhancement for performance, rendering quality and use cases on all devices
ranging from older, lower-powered smartphones to newer devices that support
augmented reality. It should stay up to date with current technologies. It
should be performant and accessible. However, building such a viewer requires
specialty 3D programming skills, and can be a challenge for web developers that
want to host their own models instead of using a third-party hosting service.  

To help with that, we're introducing the `<model-viewer>` web component which
lets you declaratively add a 3D model to a web page, while hosting the model on
your own site. The web component supports responsive design and use cases like
augmented reality on some devices, and we're adding features for accessibility,
rendering quality, and interactivity.  The goal of the component is making it
easy to add 3D models to your website without being on top of the latest changes
in the underlying technology and platforms.

## What is a web component?

 A web component is a custom HTML element built from standard web platform
features. A web component behaves for all intents and purposes like a standard
element. It has a unique tag, it can have properties and methods, and it can
fire and respond to events. In short, you don't need to know anything special to
use it. In this article, I will show you some things that are particular to
`<model-viewer>`.

## What can &lt;model-viewer> do?

More specifically, what can it do now? I'll show you its current capabilities.
You'll get a great experience today, and `<model-viewer>` will get better
over time as we add new features and improve rendering quality. The examples
I've provided are just to give you a sense of what it does. If you want to try
them there are installation and usage instructions in [its GitHub
repo](https://github.com/GoogleWebComponents/model-viewer).

### Basic 3D models

Embedding a 3D model is as simple as the markup below. By
using gltf files, we've ensured that this component will work on any major
browser.

```html
<model-viewer src="assets/Astronaut.gltf" alt="A 3D model of an astronaut">
```

To see <model-viewer> in action, check out our [demo hosted on
Glitch](https://model-viewer.glitch.me/). The code we have so far looks
something like this:

![image](/web/updates/images/2019/02/space-suit.png)

With the `auto-rotate` and `controls` attributes I can provide motion and user
control. The [examples show a complete list of attributes](https://googlewebcomponents.github.io/model-viewer/index.html).

```html
<model-viewer src="assets/Astronaut.gltf" **controls auto-rotate**>
```

### Poster image/delayed loading

Some 3D models can be very large, so you might want to hold off loading them
until the user has requested the model. For this, the component has a built-in
means of delaying loading until the user wants it.

```html
<model-viewer src="assets/Astronaut.gltf" controls auto-rotate
poster="assets/poster2.png">
```

To show your users that it's a 3D model, and not just an image, you can provide
some preload animation by using script to switch between multiple posters.

```html
<model-viewer id="toggle-poster" src="assets/Astronaut.gltf" controls
auto-rotate poster="assets/poster2.png"></model-viewer>  
<script>  
    const posters = ['poster.png', 'poster2.png'];  
    let i = 0;  
    setInterval(() =>  
        $('#toggle-poster').setAttribute('poster', `assets/${posters[i++ %
2]}`), 2000);  
</script>
```

### Responsive Design

The component handles some types of responsive design, scaling for both mobile
and desktop. It can also manage multiple instances on a page and uses
[Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver)
to conserve battery power and GPU cycles when a model isn't visible.

![image](/web/updates/images/2019/02/responsive-space-suit.png)

## Looking Forward

[Install `<model-viewer>` and give it a try](https://github.com/GoogleWebComponents/model-viewer#installing.)
We want `<model-viewer>` to be useful to you, and we want your input on its
future. That's not to say we don't have ideas, which we have on
[our project roadmap](https://www.google.com/url?q=https://github.com/GoogleWebComponents/model-viewer/projects/1&sa=D&ust=1545076622047000&usg=AFQjCNF4ZWzKnfW0nnpstv6KW6gSKZfQ_g).
So give it a try and let us know what you think by
[filing an issue in GitHub](https://www.google.com/url?q=https://github.com/GoogleWebComponents/model-viewer/projects/1&sa=D&ust=1545076622047000&usg=AFQjCNF4ZWzKnfW0nnpstv6KW6gSKZfQ_g).

## Feedback {: .hide-from-toc }

{% include "web/_shared/helpful.html" %}

<div class="clearfix"></div>

{% include "web/_shared/rss-widget-updates.html" %}
