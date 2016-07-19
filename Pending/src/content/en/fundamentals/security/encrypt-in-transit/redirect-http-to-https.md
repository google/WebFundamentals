project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: To tell search engines that HTTPS is the best way to access your site, put a canonical link in the head section of your pages.
















<div class="wf-highlight-list wf-highlight-list--learning" markdown="1">
  <h3 class="wf-highlight-list__title">TL;DR</h3>

  
  <ul class="wf-highlight-list__list">
    
    <li>You need to put a canonical link in the head of your page to tell search engines that HTTPS is the best way to get to your site.</li>
    
  </ul>
  
</div>



Set `<link rel="canonical" href="https://…"/>` tags in your pages. [This
helps search engines](https://support.google.com/webmasters/answer/139066?hl=en)
know the best way to get to your site.

Most web servers offer a simple redirect feature. Use `301 (Moved Permanently)` to
indicate to search engines and browsers that the HTTPS version is canonical and redirect your users to the HTTPS version of your site from HTTP.


