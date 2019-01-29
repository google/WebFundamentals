project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml

{# wf_updated_on: 2019-01-21 #}
{# wf_published_on: 2011-12-07 #}
{# wf_tags: news,mobile,performance,webgl,graphics #}
{# wf_blink_components: N/A #}

# Use mediump precision in WebGL when possible {: .page-title }

{% include "web/_shared/contributors/ilmariheikkinen.html" %}


Heads-up from our friends at Opera, who have been testing WebGL on actual OpenGL ES 2.0 hardware: many demos and applications use highp precision in fragment shaders when it's not really warranted.

Highp in fragment shaders is an optional part of the OpenGL ES 2.0 spec, so not all hardware supports it (and even when they do, there [may be a performance hit](https://web.archive.org/web/20120229100024/http://my.opera.com/emoller/blog/2011/10/18/all-hail-ios-5). Using mediump will usually be good enough and it will ensure that your applications will work on mobile devices as well.

In practice, if your fragment shader previously started with


    precision highp float;


Changing it to the following should do the trick:


    precision mediump float; // or lowp



