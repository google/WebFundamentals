project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Chrome 39 implements the Beacon API, which allows to send small async HTTP requests during the page unload events.

{# wf_updated_on: 2019-03-15 #}
{# wf_published_on: 2014-10-01 #}
{# wf_tags: news,beacon,analytics #}
{# wf_blink_components: N/A #}

# Send beacon data in Chrome 39 {: .page-title }

{% include "web/_shared/contributors/ewagasperowicz.html" %}

Sometimes it is handy to send some data from a web page to a web server
without the need to wait for a reply. For example, we might want
to submit analytics or diagnostic data before the user exits a page.

Typically, sending data before the exit involved listening to the `unload` event,
because sending the request anytime earlier would result in incomplete data
- e.g. we might have missed a click that happened just before the exit.
The caveat was that the requests sent in the unload handler needed
to be synchronous, because most browsers typically ignore asynchronous XMLHttpRequests made in an unload handler.
This approach slows down navigation, as the user needs
to wait for the request to come back before a new page could be rendered.

The [*Beacon API*](https://www.w3.org/TR/beacon/){: .external } solves this problem by letting you asynchronously
send HTTP requests with small data payloads from a browser to a web server,
without delaying other code in the page's unload event or
affecting the performance of the next page navigation.

The `navigator.sendBeacon()` method queues the data to be
transmitted by the browser as soon as possible,
but does not slow down navigation.
It returns `true` if the browser is able to successfully queue
the data for transfer. Otherwise it returns `false`.

Let’s say we have a server endpoint available for receiving
beacon data from our page at this address:


    https://putsreq.herokuapp.com/Dt7t2QzUkG18aDTMMcop


If we add a `sendBeacon()` method in the `pagehide` event handler,
the endpoint will receive the data when the user navigates away from the page:


If you inspect the network tab in Chrome DevTools with the
**preserve logs** checkbox ticked, you’ll see an HTTP POST request
to the above endpoint being sent when you navigate away from the page.

Alternatively, you can visit the
[PutsReq inspect page](https://putsreq.herokuapp.com/Dt7t2QzUkG18aDTMMcop/inspect)
to see if the beacon data was received.

There is also a [Polymer](https://www.polymer-project.org/) custom element that lets you send beacon data - `<beacon-send>`. Check it out at [ebidel.github.io/beacon-send](http://ebidel.github.io/beacon-send/components/beacon-send/).


