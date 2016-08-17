project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Sometimes, the best image isn't actually an image at all. Whenever possible, use the native capabilities of the browser to provide the same or similar functionality.

{# wf_review_required #}
{# wf_updated_on: 2014-06-09 #}
{# wf_published_on: 2014-04-29 #}

# Avoid images completely {: .page-title }

{% include "_shared/contributors/petelepage.html" %}

Sometimes, the best image isn't actually an image at all. Whenever possible, use the native capabilities of the browser to provide the same or similar functionality.  Browsers generate visuals that would have previously required images.   This means that browsers no longer need to download separate image files and prevents awkwardly scaled images.  Icons can be rendered using unicode or special icon fonts.


## TL;DR
- 'Avoid images whenever possible, instead, leverage browser capabilities for shadows, gradients, rounded corners and more.'




## Place text in markup, instead of embedded in images

Wherever possible, text should be text, and not embedded into images, for
example using images for headlines, or placing contact information like phone
numbers or addresses directly into images.  This prevents people from being able
to copy and paste the information, makes it inaccessible for screen readers, and
isn't responsive.  Instead, place the text in your markup and if necessary use
webfonts to achieve the style you need.

## Use CSS to replace images

Modern browsers can use CSS features to create styles that would previously
required images.  For examples, complex gradients can be created using the
<code>background</code> property, shadows can be created using
<code>box-shadow</code> and rounded corners can be added with the
<code>border-radius</code> property.

<style>
  p#noImage {
    margin-top: 2em;
    padding: 1em;
    padding-bottom: 2em;
    color: white;
    border-radius: 5px;
    box-shadow: 5px 5px 4px 0 rgba(9,130,154,0.2);
    background: linear-gradient(rgba(9, 130, 154, 1), rgba(9, 130, 154, 0.5));
  }

  p#noImage code {
    color: rgb(64, 64, 64);
  }
</style>

<p id="noImage">
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit
amet augue eu magna scelerisque porta ut ut dolor. Nullam placerat egestas
nisl sed sollicitudin. Fusce placerat, ipsum ac vestibulum porta, purus
dolor mollis nunc, pharetra vehicula nulla nunc quis elit. Duis ornare
fringilla dui non vehicula. In hac habitasse platea dictumst. Donec
ipsum lectus, hendrerit malesuada sapien eget, venenatis tempus purus.
</p>


    <style>
      div#noImage {
        color: white;
        border-radius: 5px;
        box-shadow: 5px 5px 4px 0 rgba(9,130,154,0.2);
        background: linear-gradient(rgba(9, 130, 154, 1), rgba(9, 130, 154, 0.5));
      }
    </style>
    

Keep in mind that using these techniques does require rendering cycles, which
can be significant on mobile.  If over-used, you'll lose any benefit you may
have gained and may hinder performance.


