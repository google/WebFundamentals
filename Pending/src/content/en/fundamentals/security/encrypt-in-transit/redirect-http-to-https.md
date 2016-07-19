project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: To tell search engines that HTTPS is the best way to access your site, put a canonical link in the head section of your pages.

















# WARNING: This page has an include that should be a callout (i.e. a highlight.liquid, but it has no text - please fix this)



# WARNING: This page has a highlight.liquid include that wants to show a list but it's not supported on devsite. Please change this to text and fix the issue






Set `<link rel="canonical" href="https://…"/>` tags in your pages. [This
helps search engines](https://support.google.com/webmasters/answer/139066?hl=en)
know the best way to get to your site.

Most web servers offer a simple redirect feature. Use `301 (Moved Permanently)` to
indicate to search engines and browsers that the HTTPS version is canonical and redirect your users to the HTTPS version of your site from HTTP.


