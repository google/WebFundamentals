---
rss: false
layout: tools-article
title: "Measure Resource Loading Times"
seotitle: "Measure Resource Loading Times Using Chrome DevTools Network Panel"
description: "Measure the network performance of your web application
using the Chrome DevTools Network panel."
introduction: "Measure the network performance of your web application
using the Chrome DevTools Network panel."
article:
  written_on: 2015-04-14
  updated_on: 2015-07-20
  order: 1
authors:
  - megginkearney
priority: 0
collection: network-performance
key-takeaways:
  network:
    - View how much time was spent in the various network phases for each resoure in the Network panel's Timeline waterfall.
    - Watch out for the blue and red vertical lines. The blue line indicates when the main document loaded; the red line indicates when the page fully loaded.
    - View which resource has the slowest time to first byte by selecting the Latency filter in the Timeline column.
    - View which resources took the longest time to load by selecting the Duration filter in the Timeline column.
remember:
  resource-timing:
    - The Network panel uses the <a href="#how-to-use-the-resource-timing-api">Resource Timing API</a> to retrieve detailed network timing data for each loaded resource. This API is available to any web page, not just DevTools.
---
{% wrap content %}

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.network %}

## Network panel overview

The Network panel records information about each network operation in your application,
including detailed timing data, HTTP request and response headers, cookies, WebSocket data, and more.

![Network panel](imgs/network-panel.png)

Reload the page to start recording, or simply wait for network activity to occur in your application.
Each requested resource is added as a row to the Network table, which contains the columns listed below:

<table class="table-2">
  <thead>
    <tr>
      <th data-th="Column">Column</th>
      <th data-th="Description">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Column">
      	Name and Path
      </td>
      <td data-th="Description">
      	The name and URL path of the resource, respectively.
      </td>
    </tr>
    <tr>
      <td data-th="Column">
      	Method
      </td>
      <td data-th="Description">
      	The HTTP method used for the request. For example: GET or POST.
      </td>
    </tr>
    <tr>
      <td data-th="Column">
      	Status and Text
      </td>
      <td data-th="Description">
      	The HTTP status code and text message.
      </td>
    </tr>
    <tr>
      <td data-th="Column">
      	Domain
      </td>
      <td data-th="Description">
      	The domain of the resource request.
      </td>
    </tr>
    <tr>
      <td data-th="Column">
      	Type
      </td>
      <td data-th="Description">
      	The MIME type of the requested resource.
      </td>
    </tr>
    <tr>
      <td data-th="Column">
      	Initiator
      </td>
      <td data-th="Description">
      	The object or process that initiated the request. It can have one of the following values:
      	<ul>
      		<li>Parser - Chrome's HTML parser initiated the request.</li>
      		<li>Redirect - A HTTP redirect initiated the request.</li>
      		<li>Script - A script initiated the request.</li>
      		<li>Other - Some other process or action initiated the request, such as the user navigating to a page via a link, or by entering a URL in the address bar.</li>
    	</ul>
      </td>
    </tr>
    <tr>
      <td data-th="Column">
      	Cookies
      </td>
      <td data-th="Description">
      	The number of cookies transferred in the request. These correspond to the cookies shown in the <a href="#cookies">Cookies tab</a> when viewing details for a given resource.
      </td>
    </tr>
    <tr>
      <td data-th="Column">
      	Set-Cookies
      </td>
      <td data-th="Description">
      	The number of cookies set in the HTTP request.
      </td>
    </tr>
    <tr>
      <td data-th="Column">
      	Size and Content
      </td>
      <td data-th="Description">
      	Size is the combined size of the response headers (usually a few hundred bytes) plus the response body, as delivered by the server. Content is the size of the resource's decoded content.
      	If the resource was loaded from the browser's cache rather than over the network, this field will contain the text (from cache).
      </td>
    </tr>
    <tr>
      <td data-th="Column">
      	Time and Latency
      </td>
      <td data-th="Description">
      	Time is total duration, from the start of the request to the receipt of the final byte in the response. Latency is the time to load the first byte in the response.
      </td>
    </tr>
    <tr>
      <td data-th="Column">
      	Timeline
      </td>
      <td data-th="Description">
      	The Timeline column displays a visual waterfall of all network requests. Clicking the header of this column reveals a menu of additional <a href="#how-to-filter-and-sort-results">sorting fields</a>.
      </td>
    </tr>
  </tbody>
</table>

{% include modules/remember.liquid title="Note" list=page.remember.resource-timing %}

## Determine performance by resource type 

By default, the Network panel graphs the time it took
to load each resource in a waterfall view,
from the start of the HTTP request to the receipt of the final byte of the response.

Each resource type is color-coded, as follows:

<style>

#colortable {
  width: 50%;
  border: none;
}

#colortable td {
  border: none;
}

.doc { background: rgba(47, 102, 236, 0.6); width: 10%;}
.css { background: rgba(157, 231, 119, 0.6);width: 10%;}
.images { background: rgba(164, 60, 255, 0.6);width: 10%;}
.scripts { background: rgba(255, 121, 0, 0.6);width: 10%;}
.xhr { background: rgba(231, 231, 10, 0.6);width: 10%;}
.fonts { background: rgba(255, 82, 62,0.6);width: 10%;}
.other { background: rgba(187, 187, 188, 0.6);width: 10%;}
</style>

<!-- TODO: Fix formatting of cells -->
<table id="colortable">
<tr>
<td class="doc"></td>
<td>Documents</td>
</tr>
<tr>
<td class="css"></td>
<td>Stylesheets</td>
</tr>
<tr>
<td class="images"></td>
<td>Images</td>
</tr>
<tr>
<td class="scripts"></td>
<td>Scripts</td>
</tr>
<tr>
<td class="xhr"></td>
<td>XHR</td>
</tr>
<tr>
<td class="fonts"></td>
<td>Fonts</td>
</tr>
<tr>
<td class="other"></td>
<td>Other</td>
</tr>
</table>

The larger the a resource's color-coded bar grows,
the more data being transmitted for the request:

![Color-coded bars](imgs/color-coded-bars.png)

The waterfall highlights
[`DOMContentLoaded`](http://docs.webplatform.org/wiki/dom/events/DOMContentLoaded) events with a blue vertical line;
[`load`](http://docs.webplatform.org/wiki/dom/events/load) events
with a red vertical line.
When the engine has completed parsing of the main document,
the `DOMContentLoaded` event fires.
Upon retrieving all the page's resources,
the `load` event will fire.

![DOM event lines](imgs/dom-lines.png)

## View network timing details for a specific resource

Hover your mouse over a color-coded bar in the Network waterfall view,
or click on a resource name in the Network panel table
to view performance information about a particular type:

![Timing data](imgs/timeline-view-hover.png)

Resource details appear in a tabbed window.

### HTTP headers

The Headers tab displays the resource's request URL, HTTP method, and response status code. Additionally, it lists the HTTP response and request headers and their values, and any query string parameters. 

![HTTP headers](imgs/network-headers.png)

You can view HTTP headers parsed and formatted, or in their source form by clicking the **View parsed**/**View source** toggle button, respectively, located next to each header's section. You can also view parameter values in their decoded or URL encoded forms by clicking the **View decoded**/**View URL encoded** toggle button next to each query string section.

### Resource previews

The Preview tab displays a preview of the resource, when available. Previews are currently displayed for image resources:

![Resource image preview](imgs/network-image-preview.png)

And JSON resources:

![Resource JSON preview](imgs/resource-preview-json.png)

### HTTP response

The Response tab contains the resource's unformatted content.
Below is a screenshot of a JSON data structure that was returned as the response for a request.

![Resource response preview](imgs/response.png)

### Cookies

The Cookies tab displays a table of all the cookies transmitted in the
resource's HTTP request and response headers. You can also clear all cookies.

![Resource cookies](imgs/cookies.png)

The Cookies table contain the following columns:

<table class="table-2">
  <thead>
    <tr>
      <th data-th="Column">Column</th>
      <th data-th="Description">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Column">
      	Name
      </td>
      <td data-th="Description">
      	The cookie's name.
      </td>
    </tr>
    <tr>
      <td data-th="Column">
      	Value
      </td>
      <td data-th="Description">
      	The cookie's value.
      </td>
    </tr>
    <tr>
      <td data-th="Column">
      	Domain
      </td>
      <td data-th="Description">
      	The domain the cookie belongs to.
      </td>
    </tr>
    <tr>
      <td data-th="Column">
      	Path
      </td>
      <td data-th="Description">
      	The URL path the cookie came from.
      </td>
    </tr>
    <tr>
      <td data-th="Column">
      	Expires / Max-Age
      </td>
      <td data-th="Description">
      	The value of the cookie's expires or max-age properties.
      </td>
    </tr>
    <tr>
      <td data-th="Column">
      	Size
      </td>
      <td data-th="Description">
      	The size of the cookie in bytes.
      </td>
    </tr>
    <tr>
      <td data-th="Column">
      	HTTP
      </td>
      <td data-th="Description">
      	This indicates that the cookie should only be set by the browser in the HTTP request, and cannot be accessed with JavaScript.
      </td>
    </tr>
    <tr>
      <td data-th="Column">
      	Secure
      </td>
      <td data-th="Description">
      	The presence of this attribute indicates that the cookie should only be transmitted over a secure connection.
      </td>
    </tr>
  </tbody>
</table>

### WebSocket frames

The Frames tab shows messages sent or received over a WebSocket connection. This tab is only visible when the selected resource initiated a WebSocket connection. The table contains the following columns:

<table class="table-2">
  <thead>
    <tr>
      <th data-th="Column">Column</th>
      <th data-th="Description">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Column">
      	Data
      </td>
      <td data-th="Description">
      	The message payload. If the message is plain text, it's displayed here. For binary opcodes, this field displays the opcode's name and code. The following opcodes are supported:
      	<ul>
      		<li>Continuation Frame</li>
            <li>Binary Frame</li>
            <li>Connection Close Frame</li>
            <li>Ping Frame</li>
            <li>Pong Frame</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td data-th="Column">
      	Length
      </td>
      <td data-th="Description">
      	The length of the message payload in bytes.
      </td>
    </tr>
    <tr>
      <td data-th="Column">
      	Time
      </td>
      <td data-th="Description">
      	The time stamp when the message was created.
      </td>
    </tr>
  </tbody>
</table>

Messages are color-coded according to their type.
Outgoing text messages are color-coded light-green;
incoming text messages are white:

![Websocket text](imgs/websocket-text.png)

WebSocket opcodes are light-yellow:

![Websocket opcodes](imgs/websocket-opcode.png)

Errors are light-red.

**Notes about current implementation:**

* To refresh the Frames table after new messages arrive, click the resource name on the left.
* Only the last 100 WebSocket messages are preserved by the Frames table.

### Resource network timing

The Timing tab graphs the time spent on the various network phases involved loading the resource

![Resource network timing graph](imgs/timing.png)

<style>
dt:before {
  content: "\00a0\00a0\00a0";
}
dt strong {
  margin-left: 5px;
}
dt.stalled:before, dt.proxy-negotiation:before {
  background-color: #cdcdcd;
}
dt.dns-lookup:before {
  background-color: #1f7c83;
}
dt.initial-connection:before, dt.ssl:before {
  background-color: #e58226;
}
dt.request-sent:before, dt.ttfb:before {
  background-color: #5fdd5f;
}
dt.content-download:before {
  background-color: #4189d7;
}
</style>

<dl class="table-2">
  <dt class="stalled"><strong> Stalled/Blocking</strong></dt>
  <dd>
    Time the request spent waiting before it could be sent.
    This time is inclusive of any time spent in proxy negotiation.
    Additionally, this time will include when the browser is waiting for an already established connection to become available for re-use, obeying Chrome's <a href="https://code.google.com/p/chromium/issues/detail?id=12066">maximum six</a> <abbr title="Transmission Control Protocol">TCP</abbr> connection per origin rule.
  </dd>

  <dt class="proxy-negotiation"><strong> Proxy Negotiation</strong></dt>
  <dd>Time spent negotiating with a proxy server connection.</dd>

  <dt class="dns-lookup"><strong><abbr title="Domain Name System"> DNS</abbr> Lookup</strong></dt>
  <dd>
    Time spent performing the DNS lookup.
    Every new domain on a page requires a full roundtrip to do the DNS lookup.
  </dd>

  <dt class="initial-connection"><strong> Initial Connection / Connecting</strong></dt>
  <dd>Time it took to establish a connection, including <abbr title="Transmission Control Protocol">TCP</abbr> handshakes/retries and negotiating a <abbr title="Secure Sockets Layer">SSL</abbr>.</dd>

  <dt class="ssl"><strong> SSL</strong></dt>
  <dd>Time spent completing a SSL handshake.</dd>

  <dt class="request-sent"><strong> Request Sent / Sending</strong></dt>
  <dd>
    Time spent issuing the network request.
    Typically a fraction of a millisecond.
  </dd>

  <dt class="ttfb"><strong> Waiting (<abbr title="Time To First Byte">TTFB</abbr>)</strong></dt>
  <dd>
    Time spent waiting for the initial response, also known as the Time To First Byte.
    This time captures the latency of a round trip to the server in addition to the time spent waiting for the server to deliver the response.
  </dd>

  <dt class="content-download"><strong> Content Download / Downloading</strong></dt>
  <dd>Time spent receiving the response data.</dd>
</dl>

## How to filter and sort results 

By default, resources in the Network table are sorted by the start time of each request (the network "waterfall"). Click another column header to sort the table by a different column value. Click the header again to change the sort order (ascending or descending).

![Sort by](imgs/sorting.png)

The Timeline column is unique from the others in that, when clicked, it displays a menu of additional sort fields:

![Timeline column](imgs/timeline-column.png)

The menu contains the following sorting options:

* **Timeline** — Sorts by the start time of each network request. This is the default sort, and is the same as sorting by the Start Time option).
* **Start Time** — Sorts by the start time of each network request (same as sorting by the Timeline option).
* **Response Time** — Sorts by each request's response time.
* **End Time** — Sorts by the time when each request completed.
* **Duration** — Sorts by the total time of each request. Select this filter to determine which resource takes the longest time to load.
* **Latency** — Sorts by the time between the start of the request and the beginning of the response. Select this filter to determine which resource takes the longest time to first byte.

To filter the Network table to only show certain types of resources, click one of the content types along the bottom of the panel: **Documents**, **Stylesheets**, **Images**, **Scripts**, **XHR**, **Fonts**, **WebSockets**, and **Other**. In the following screenshot only CSS resources are shown. To view all content types, click the **All** filter button.

![Filter type](imgs/filter-type.png)

## Copy and save network information

Copy and save actions are accessible in each resource's context menu.
The context menu appears with several actions when you <span class="kbd">Right-click</span> or <span class="kbd">Ctrl</span> + <span class="kbd">Click</span> (Mac only) on a selected resource:

![Right-click on network resource](imgs/right-click.png)

The following menu actions apply to the selected resource:

* **Open Link in New Tab** — Opens the resource in a new tab. You can also double-click the resource name in the Network table.
* **Copy Link Address** — Copies the resource URL to the system clipboard.
* **Copy Request Headers** — Copies the HTTP request headers to the system clipboard.
* **Copy Response Headers** — Copies the HTTP response headers to the system clipboard.
* **Copy as cURL** — Copies the network request as a
  [cURL](http://curl.haxx.se/) command string to the system clipboard. See [Copying requests as cURL commands](#copy-requests-as-curl-commands).
* **Replay XHR** — If the associated request is an XMLHTTPRequest, re-sends the original XHR.

### Copy requests as cURL commands

[cURL](http://curl.haxx.se/) is a command line tool for making HTTP transactions. The Network panel's **Copy as cURL** command recreates an HTTP request (including HTTP headers, SSL certificates, and query string parameters) and copies it as a cURL command string to the clipboard. You can then paste the string into a terminal window (on a system with cURL) to execute the same request.

Below is an example cURL command line string taken from a XHR request on the Google News home page.

`curl 'http://news.google.com/news/xhrd=us' -H 'Accept-Encoding: gzip,deflate,:sdch' -H 'Host: news.google.com' -H 'Accept-Language: en-US,en;q=0.8' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1510.0 Safari/537.36' -H 'Accept: */*' -H 'Referer: http://news.google.com/nwshp?hl=en&tab=wn' -H 'Cookie: NID=67=eruHSUtoIQA-HldQn7U7G5meGuvZOcY32ixQktdgU1qSz7StUDIjC_Knit2xEcWRa-e8CuvmADminmn6h2_IRpk9rWgWMdRj4np3-DM_ssgfeshItriiKsiEXJVfra4n; PREF=ID=a38f960566524d92:U=af866b8c07132db6:FF=0:TM=1369068317:LM=1369068321:S=vVkfXySFmOcAom1K' -H 'Connection: keep-alive' --compressed`

### Save network data

Save the data from a network recording as a HAR ([HTTP Archive](http://www.softwareishard.com/blog/har-12-spec/)) file, or copy the records as a HAR data structure to your clipboard. A HAR file contains a JSON data structure that describes the network "waterfall". Several [third-party](http://ericduran.github.io/chromeHAR/) [tools](https://code.google.com/p/harviewer/) can reconstruct the network waterfall from the data in the HAR file.

**To save a recording:**

1. <span class="kbd">Right-click</span> or <span class="kbd">Ctrl</span> + <span class="kbd">Click</span> (Mac only) on the Network table.
2. In the context menu that appears, choose one of the following actions:
    * **Copy All as HAR** — Copies the network recording to the system clipboard in the HAR format.
    * **Save as HAR with Content** — Saves all network data to a HAR file along with each page resource. Binary resources, including images, are encoded as Base64-encoded text.

For more information, [Web Performance Power Tool: HTTP Archive (HAR)](http://www.igvita.com/2012/08/28/web-performance-power-tool-http-archive-har/).

## Customize the Network panel

You can view the Network table with large resource rows (the default), or small resource rows. Click the blue **Use small resource rows** toggle button ![Small resource rows](imgs/small-resource-rows.png){:.inline} at the bottom of the panel to view small rows. Click the same button (now gray) to view large resource rows again. 

Large rows enable some columns to display two text fields: a primary field and a secondary field (Time and Latency, for instance). When viewing small rows only the primary field is displayed.

![Network table with small resource rows and just the timeline column](imgs/small-rows.png)

### Add and remove table columns

Change the default set of columns displayed by the Network table.
To show or hide a column,
<span class="kbd">Right-click</span> or <span class="kbd">Ctrl</span> + <span class="kbd">Click</span> (Mac only) in the table header and select or deselect column names from the list.

![Add or remove columns](imgs/add-remove-columns.png)

### Preserve the network log upon navigation

By default,
the current network record log is discarded
when you navigate to another page, or reload the current page.
To preserve the recording log in these scenarios,
click the black **Preserve log upon navigation** button
![Don't preserve log on navigation](imgs/recording-off.png){:.inline}
at the bottom of the Network panel;
new records are appended to the bottom of the table.
Click the same button again (now red)
to disable log preservation.

## How to use the Resource Timing API

The [Resource Timing API](http://www.w3.org/TR/resource-timing)
provides detailed network timing data for each loaded resource.
For example, the API can tell you precisely when the HTTP request for an image started, and when the image's final byte was received.
The following illustration shows the network timing data points that the Resource Timing API provides.

![Resource Timing API](imgs/resource-timing-api.png)

The API is available to any web page, not just DevTools. In Chrome, it's exposed as methods on the global `window.performance` object.
The `performance.getEntries()` method returns an array of "resource timing objects", one for each requested resource on the page.

Try this: open the JavaScript console on the current page, enter the following at the prompt, and hit Return:

`window.performance.getEntries()[0]`

This evaluates the first element in the array of resource timing objects and displays its properties in the console, as shown below.

![getEntries() method](imgs/getentries.png)

Each timestamp is in microseconds, following the [High Resolution
Time](http://www.w3.org/TR/hr-time/#sec-high-resolution-time) specification. This API is [available in
Chrome](http://updates.html5rocks.com/2012/08/When-milliseconds-are-not-enough-performance-now) as the `window.performance.now()` method.

## Additional resources

To learn more optimizing the network performance of your application, see the following resources:

* Use [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights) to identify performance best practices that can be applied to your site, and [PageSpeed optimization tools](https://developers.google.com/speed/pagespeed/optimization) to automate the process of applying those best practices.
* [High Performance Networking in Google
  Chrome](http://www.igvita.com/posa/high-performance-networking-in-google-chrome/) discusses Chrome network internals and how you can take advantage of them to make your site faster.
* [How gzip compression works](https://developers.google.com/speed/articles/gzip) provides a high level overview gzip compression and why it's a good idea.
* [Web Performance Best Practices](https://developers.google.com/speed/docs/best-practices/rules_intro) provides additional tips for optimizing the network performance of your web page or application.

{% include modules/nextarticle.liquid %}

{% endwrap %}
