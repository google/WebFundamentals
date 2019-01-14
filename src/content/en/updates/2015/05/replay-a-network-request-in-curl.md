project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Learn how to debug a network request from the command line.

{# wf_updated_on: 2015-05-18 #}
{# wf_published_on: 2015-05-14 #}
{# wf_tags: devtools #}
{# wf_featured_image: /web/updates/images/2015-05-15-devtools-replay-a-network-request-in-curl/copy-as-curl.gif #}

# Replay a network request in cURL {: .page-title }

{% include "web/_shared/contributors/umarhansa.html" %}


<img src="/web/updates/images/2015-05-15-devtools-replay-a-network-request-in-curl/copy-as-curl.gif">

Resources which show up in the network panel have a context menu which allows you to Copy as cURL, this will go into your clipboard at which point you can paste it into the command line, modify if necessary and then see the response. Request headers are also included.

In the example, I'm using: <a href="http://numbersapi.com/#42">http://numbersapi.com/#42</a>


