project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml

{# wf_updated_on: 2012-05-07 #}
{# wf_published_on: 2012-05-07 #}
{# wf_tags: news,devtools #}

# Websocket Frame Inspection now in Chrome DevTools {: .page-title }

{% include "web/_shared/contributors/paulirish.html" %}


While before we could see sockets being established, we haven't had inspection ability into the data going over the wire in websockets. Thanks to a [WebKit patch](http://trac.webkit.org/changeset/115427) from RIM, we can now see the frame data, along with small unicode arrows indicating which direction the data is going. 

Open up your [Chrome Canary](https://www.google.com/intl/en/chrome/browser/canary.html) or a [fresh Chromium build](http://download-chromium.appspot.com) for the latest changes here.


