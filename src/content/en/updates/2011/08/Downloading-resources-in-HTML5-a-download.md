project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml

{# wf_updated_on: 2011-08-01 #}
{# wf_published_on: 2011-08-01 #}
{# wf_tags: news #}

# Downloading resources in HTML5: a[download] {: .page-title }

{% include "web/_shared/contributors/ericbidelman.html" %}


Chrome now supports the HTML spec's new `download` attribute to `a` elements. When used, this attribute signifies that the resource it points to should be downloaded by the browser rather than navigating to it.

From [Downloading Resources](http://developers.whatwg.org/links.html#downloading-resources):

>The `download` attribute, if present, indicates that the author intends the hyperlink to be used for downloading a resource. The attribute may have a value; the value, if any, specifies the default filename that the author recommends for use in labeling the resource in a local file system. There are no restrictions on allowed values, but authors are cautioned that most file systems have limitations with regard to what punctuation is supported in file names, and user agents are likely to adjust file names accordingly.

>The attribute can furthermore be given a value, to specify the filename that user agents are to use when storing the resource in a file system. This value can be overridden by the `Content-Disposition` HTTP header's `filename` parameter.

For example, clicking the following link downloads the .png as "MyGoogleLogo.png" instead of navigating to its `href` value: <a href="http://www.google.com/intl/en_com/images/srpr/logo2w.png" download="MyGoogleLogo">download me</a>. The markup is simple:


    <a href="http://www.google.com/.../logo2w.png" download="MyGoogleLogo">download me</a>
    

The real benefit of `a[download]` will be when working with [blob: URLs](http://www.html5rocks.com/en/tutorials/workers/basics/#toc-inlineworkers-bloburis) and [filesystem: URLs](http://html5-demos.appspot.com/static/filesystem/generatingResourceURIs.html) URLs.
It'll give users a way to download content created/modified within your app.

[Full Demo](http://html5-demos.appspot.com/static/a.download.html)

Browser support: only the current Chrome dev channel release (14.0.835.15+) supports this attribute.


{% include "comment-widget.html" %}
