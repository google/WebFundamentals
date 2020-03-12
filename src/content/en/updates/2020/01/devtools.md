project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Moto G4 in Device Mode, new cookie-related features, and more.

{# wf_updated_on: 2020-02-07 #}
{# wf_published_on: 2020-01-29 #}
{# wf_tags: chrome81, devtools, devtools-whatsnew #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: Moto G4 in Device Mode, new cookie-related features, and more. #}
{# wf_blink_components: Platform>DevTools #}

# What's New In DevTools (Chrome 81) {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="HJNaNDspffM"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

## Moto G4 support in Device Mode {: #motog4 }

After [enabling the Device Toolbar](/web/tools/chrome-devtools/device-mode#viewport) you can now
simulate the dimensions of a Moto G4 viewport from the **Device** list.

![Simulating a Moto G4 viewport](/web/updates/images/2020/01/motog4.png)

Click [Show Device Frame](/web/tools/chrome-devtools/device-mode/#frame) to show the Moto G4 hardware
around the viewport.

![Showing the Moto G4 hardware](/web/updates/images/2020/01/motog4frame.png)

Related features:

* Open the [Command Menu](/web/tools/chrome-devtools/command-menu/) and run the `Capture screenshot`
  command to take a screenshot of the viewport that includes the Moto G4 hardware (after enabling
  **Show Device Frame**).
* [Throttle the network and CPU](http://localhost:8080/web/tools/chrome-devtools/device-mode/#throttle)
  to more accurately simulate a mobile user's web browsing conditions.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/49e4673403214c99cc9d358fb5f311727dcf47e8 #}

[Chromium issue #924693](https://crbug.com/924693)

## Cookie-related updates {: #cookies }

### Blocked cookies in the Cookies pane {: #blockedcookies }

The Cookies pane in the Application panel now colors blocked cookies with a yellow background.

![Blocked cookies in the Cookies pane of the Application panel](/web/updates/images/2020/01/blockedcookies.png)

See also [Debug why a cookie was blocked](/web/updates/2019/10/devtools#blockedcookies) to learn
how to access a similar UI from the Network panel.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/341eea56a810370d6f36ef6dd750df9cd66cd398 #}

[Chromium issue #1030258](https://crbug.com/1030258)

### Cookie priority in the Cookie pane {: #cookiepriority }

The Cookies tables in the Network and Application panels now include a **Priority** column.

<aside class="caution">
  Chrome is the only browser that supports cookie priority.
</aside>

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/e65507201ae7c4b83f297bab97e4f4dcc1e1168d #}

[Chromium issue #1026879](https://crbug.com/1026879)

### Edit all cookie values {: #edit }

All cells in the Cookie tables are editable now, except cells in the **Size** column because that
column represents the network size of the cookie, in bytes. 
See [Fields](/web/tools/chrome-devtools/storage/cookies#fields) for an explanation of each column.

![Editing a cookie value](/web/updates/images/2020/01/editcookie.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/cc93308cee322f28b02be92ac410d6651938de37 #}

### Copy as Node.js fetch to include cookie data {: #fetchcookies }

Right-click a network request and select **Copy** > **Copy as Node.js fetch** to get a
`fetch` expression that includes cookie data.

![Copy as Node.js fetch](/web/updates/images/2020/01/fetchcookies.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/7c50d1f484d4fd6d308b7e5b825fc21c73830a92 #}

[Chromium issue #1029826](https://crbug.com/1029826)

## More accurate web app manifest icons {: #manifesticons }

Previously, the Manifest pane in the Application panel would perform its own requests in order to
display web app manifest icons. DevTools now shows the exact same manifest icon that Chrome uses.

![Icons in the Manifest pane](/web/updates/images/2020/01/manifesticons.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/3c387a84cd3012165f279b95608f17b3c826ed4b #}

[Chromium issue #985402](https://crbug.com/985402)

## Hover over CSS `content` properties to see unescaped values {: #content }

Hover over the value of a `content` property to see the unescaped version of the value.

[demo]: https://mathiasbynens.github.io/css-dbg-stories/css-escapes.html

For example, on this [demo] when you inspect the `p::after` pseudo-element you see an
escaped string in the Styles pane:

![The escaped string](/web/updates/images/2020/01/escapedstring.png)

When you hover over the `content` value you see the unescaped value:

![The unescaped value](/web/updates/images/2020/01/unescapedstring.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/2670a655e45c5a677e527dca07693200d7916ac3 #}

## More detailed source map errors in the Console {: #sourcemaperrors }

The Console now provides more detail on why a source map failed to load or parse. Previously
it just provided an error without explaining what went wrong.

![A source map loading error in the Console](/web/updates/images/2020/01/sourcemap.png)

## Setting for disabling scrolling past the end of a file {: #scrolling }

Open [Settings](/web/tools/chrome-devtools/customize#settings) and then disable 
**Preferences** > **Sources** > **Allow scrolling past end of file** to disable the default UI behavior
that allows you to scroll well past the end of a file in the **Sources** panel.

Here's a [GIF of the feature](https://imgur.com/zJytuf1).

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/564dcf4c071b93382616e9421610aa2ac655a833 #}

<<../../_shared/devtools-feedback.md>>

<<../../_shared/canary.md>>

<<../../_shared/discover.md>>

{% include "web/_shared/rss-widget-updates.html" %}
