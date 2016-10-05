project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: EME Logger is a Chrome extension that logs Encrypted Media Extensions (EME) events and calls to the DevTools console.

{# wf_updated_on: 2015-09-16 #}
{# wf_published_on: 2015-09-16 #}
{# wf_tags: news,audio,video,media,eme #}
{# wf_featured_image: /web/updates/images/2015-09-17-eme-logger/featured.png #}

# The EME Logger extension {: .page-title }

{% include "web/_shared/contributors/samdutton.html" %}



Do you use Encrypted Media Extensions?

If so, you may be interested in [EME Logger](https://chrome.google.com/webstore/detail/eme-call-and-event-logger/cniohcjecdcdhgmlofniddfoeokbpbpb): a Chrome extension from Google that logs EME events and calls to the DevTools console along with debugging information.

You can install [EME Logger extension](https://chrome.google.com/webstore/detail/eme-call-and-event-logger/cniohcjecdcdhgmlofniddfoeokbpbpb) from the Chrome Web Store..

<img src="/web/updates/images/2015-09-17-eme-logger/screenshot_page.png" alt="Screenshot of protected content playing in a video element on a web page, with the Chrome DevTools console showing logging from the EME Logger extension">

<img src="/web/updates/images/2015-09-17-eme-logger/screenshot_console.png" alt="Screenshot of the Chrome DevTools console showing logging from the EME Logger extension">

The code for EME Logger is available at [github.com/google/eme_logger](https://github.com/google/eme_logger). Patches, bug reports and feature requests welcome.

More information about EME is available from the HTML5 Rocks article [EME WTF](http://www.html5rocks.com/en/tutorials/eme/basics/){: .external }?

As an alternative to 'roll your own' EME, we recommend Shaka Player: an easy-to-use JavaScript library developed by Google that enables adaptive delivery of protected (and unprotected) media. Shaka Player implements [Dynamic Adaptive Streaming over HTTP](http://www.streamingmedia.com/Articles/Editorial/What-Is-.../What-is-MPEG-DASH-79041.aspx) with [Media Source Extensions](http://www.html5rocks.com/en/tutorials/eme/basics/#related-technology-1) to deliver the best possible video performance at any bandwidth. Shaka also supports multilingual content for audio tracks and subtitles. Find out more about Shaka Player at [g.co/shakainfo](http://g.co/shakainfo).



{% include "comment-widget.html" %}
