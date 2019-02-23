project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml

{# wf_updated_on: 2019-02-09 #}
{# wf_published_on: 2012-04-17 #}
{# wf_tags: news,xhr2,binary #}
{# wf_blink_components: N/A #}

# Processing XHR2 file uploads in PHP {: .page-title }

{% include "web/_shared/contributors/ericbidelman.html" %}


My article "[New Tricks in XMLHttpRequest2](https://www.html5rocks.com/en/tutorials/file/xhr2/){: .external }" has many fine examples, but what it doesn't have is any server code to illustrate how to handle files. If you're curious how to process a file upload using `xhr.send(FormData)`, here's a quick example of an image upload in PHP.

This server is trivial but it demonstrates two things. The first is sending a file and extra payload at the same time. The second is how to grab the file (and other data) in PHP. Lastly, the image is encoded into a `data:` URL and included in a JSON response sent back to the client.

Note: the sample has been removed.


