project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Much of the web isn't optimized for those multi-device experiences. Learn the fundamentals to get your site working on mobile, desktop or anything else with a screen.

{# wf_review_required #}
{# wf_updated_on: 2014-10-28 #}
{# wf_published_on: 2014-04-29 #}

# Set the viewport {: .page-title }

{% include "_shared/contributors/petelepage.html" %}
Pages optimized for a variety of devices must include a meta viewport element in the head of the document.  A meta viewport tag gives the browser instructions on how to control the page's dimensions and scaling.

## TL;DR
- Use the meta viewport tag to control the width and scaling of the browser's viewport.
- Include <code>width=device-width</code> to match the screen's width in device-independent pixels.
- 'Include <code>initial-scale=1</code> to establish a 1:1 relationship between CSS pixels and device-independent pixels.'
- Ensure your page is accessible by not disabling user scaling.


To attempt to provide the best experience, mobile browsers will render
the page at a desktop screen width (usually about 980px, though this varies
across devices), and then try to make the content look better by increasing
font sizes and scaling the content to fit the screen.  For users, this means
that font sizes may appear inconsistently and they have to double-tap or
pinch-to-zoom in order to see and interact with the content.


    <meta name="viewport" content="width=device-width, initial-scale=1">
    


Using the meta viewport value `width=device-width` instructs the page to match
the screen's width in device-independent pixels. This allows the page to reflow
content to match different screen sizes, whether rendered on a small mobile
phone or a large desktop monitor.

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6-col">
    {% link_sample _code/vp-no.html %}
      <img src="imgs/no-vp.png" class="smaller-img" srcset="imgs/no-vp.png 1x, imgs/no-vp-2x.png 2x" alt="Page without a viewport set">
      See example
    {% endlink_sample %}
  </div>

  <div class="mdl-cell mdl-cell--6-col">
    {% link_sample _code/vp.html %}
      <img src="imgs/vp.png" class="smaller-img"  srcset="imgs/vp.png 1x, imgs/vp-2x.png 2x" alt="Page with a viewport set">
      See example
    {% endlink_sample %}
  </div>
</div>

Some browsers will keep the page's width constant when rotating to landscape
mode, and zoom rather than reflow to fill the screen. Adding the attribute
`initial-scale=1` instructs browsers to establish a 1:1 relationship between CSS
pixels and device-independent pixels regardless of device orientation, and
allows the page to take advantage of the full landscape width.

<!-- TODO: Verify note type! -->
Note: Use a comma to separate attributes to ensure older browsers can properly parse the attributes.

## Ensure an accessible viewport

In addition to setting an `initial-scale`, you can also set the following attributes on the viewport:

* `minimum-scale`
* `maximum-scale`
* `user-scalable`

When set, these can disable the user's ability to zoom the viewport, potentially causing accessibility issues.


