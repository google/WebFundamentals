project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: In February, we introduced the model-viewer web component which let you declaratively add a 3D model to a web page. Now we're announcing support for AR on Android with the addition of the ar attribute.

{# wf_updated_on: 2019-05-28 #}
{# wf_published_on: 2019-05-07 #}
{# wf_tags: 3d,model-viewer,ar,augmented-reality #}
{# wf_featured_image: /web/updates/images/2019/05/masthead.jpg #}
{# wf_featured_snippet: In February, we introduced the model-viewer web component which let you declaratively add a 3D model to a web page. Now we're announcing support for AR on Android with the addition of the ar attribute. #}
{# wf_blink_components: N/A #}

# Augmented reality with model-viewer {: .page-title }

In February, we introduced the [`<model-viewer>` web
component](/web/updates/2019/02/model-viewer),
which lets you declaratively add a 3D model to a web page, while hosting the
model on your own site. One thing it didn't support  was augmented reality. That
is, you could not render the component's source image on top of a device's
camera feed.

To do that, we've since added support for Magic Leap, and Quick Look on iOS. Now
we're announcing support for AR on Android with the addition of the `ar`
attribute. This attribute is built on a new ARCore feature called Scene Viewer,
an external app for viewing 3D models. To learn more about Scene Viewer,
check out [Viewing 3D models in AR from an Android browser](/ar/develop/java/scene-viewer).

![Mars Rover](/web/updates/images/2019/05/rover.png)

Let's see how to do augmented reality with `<model-viewer>`.

## The attribute

A web component, as you may recall, requires no special knowledge to use. It
behaves like a standard HTML element, having a unique tag as well as properties
and methods. After
[installing it with a `<script>` tag](https://github.com/GoogleWebComponents/model-viewer#installing),
use it like any other HTML element.

```html
<model-viewer alt="A 3D model of an astronaut." src="Astronaut.gltf" ios-src="Astronaut.usdz" magic-leap ar>
```

This looks much the same as what I had in my earlier article. Notice the thing
I've highlighted at the very end. That's the new attribute.

## Installing the new version

If you're using `<model-viewer>` already, you're probably importing the component
using the `<script>` tags exactly
[as shown in the documentation](https://googlewebcomponents.github.io/model-viewer/).
We're continually making improvements. If you want to test new features before
deliberately upgrading and deploying, you'll want to install a specific version
of `<model-viewer>`. To do this, add the version number to the file URLs as shown
below. Then, watch
[the releases page](https://github.com/GoogleWebComponents/model-viewer/releases)
for updates.

```html
<script type="module"
  src="https://unpkg.com/@google/model-viewer@0.3.1/dist/model-viewer.js">
</script>

<script nomodule
  src="https://unpkg.com/@google/model-viewer@0.3.1/dist/model-viewer-legacy.js">
</script>
```

## Conclusion

Give the new version of `<model-viewer>` a try and let us know what you think.
Issues and feedback are
[welcome on GitHub](https://github.com/GoogleWebComponents/model-viewer/issues).

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
