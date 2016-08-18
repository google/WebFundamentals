project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: The theme color is a hint from your web page that tells the browser what color to tint UI elements such as the address bar.

{# wf_review_required #}
{# wf_updated_on: 2016-02-11 #}
{# wf_published_on: 2014-12-16 #}

# Provide a Site-Wide Theme Color {: .page-title }

{% include "_shared/contributors/mattgaunt.html" %}
{% include "_shared/contributors/paulkinlan.html" %}

Chrome introduced the concept of a theme color for your site in 2014. The theme color
is a hint from your web page that tells the browser what color to tint
[UI elements such as the address bar](/web/fundamentals/design-and-ui/browser-customization/).  


<figure>
  <img src="images/theme-color.png" alt="backgroud color">
  <figcaption>Theme color</figcaption>
</figure>

Without a manifest, you have to define the theme color on every single page, and if 
you have a large site or legacy site, making a lot of site wide changes is not feasible.

Add a `theme_color` attribute to your manifest, and when the site is launched
from the home screen every page in the domain will automatically get the theme color.


    "theme_color": "#2196F3"
    

<figure>
  <img src="images/manifest-display-options.png" alt="backgroud color">
  <figcaption>Sitewide theme color</figcaption>
</figure>