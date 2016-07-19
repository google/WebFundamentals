project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: The theme color is a hint from your web page that tells the browser what color to tint UI elements such as the address bar.

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

<div class="highlight"><pre><code class="language-json" data-lang="json"><span class="s2">&quot;theme_color&quot;</span><span class="err">:</span> <span class="s2">&quot;#2196F3&quot;</span></code></pre></div>

<figure>
  <img src="images/manifest-display-options.png" alt="backgroud color">
  <figcaption>Sitewide theme color</figcaption>
</figure>
