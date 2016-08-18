project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Use the web app manifest to control the display type and page orientation.

{# wf_review_required #}
{# wf_updated_on: 2016-02-11 #}
{# wf_published_on: 2014-12-16 #}

# Set the Launch Style {: .page-title }

{% include "_shared/contributors/mattgaunt.html" %}
{% include "_shared/contributors/paulkinlan.html" %}

Use the web app manifest to control the display type and page orientation.


## Customize the display type

You make your web app hide the browser's UI by setting the `display` type to `standalone`.


    "display": "standalone"
    

Don't worry, if you think users would prefer to view your page as a normal 
site in a browser. You can set the `display` type to `browser`.


    "display": "browser"
    

<figure>
  <img src="images/manifest-display-options.png" alt="web-app-capable">
  <figcaption>Manifest Display Options</figcaption>
</figure>

## Specify the initial orientation of the page

You can enforce a specific orientation, which is advantageous for use cases 
that work in only one orientation, like games for example. Use this 
selectively. Users prefer selecting the orientation.


    "orientation": "landscape"
    

<figure>
  <img src="images/manifest-orientation-options.png" alt="Web App Manifest Orientation Options">
  <figcaption>Web App Manifest Orientation Options</figcaption>
</figure>

