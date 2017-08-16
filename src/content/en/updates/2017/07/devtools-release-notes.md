project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: New features and changes coming to DevTools in Chrome 61.

{# wf_updated_on: 2017-07-10 #}
{# wf_published_on: 2017-07-10 #}
{# wf_tags: chrome61,devtools #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: New features and changes coming to DevTools in Chrome 61. #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# What's New In DevTools (Chrome 61) {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

New features and major changes coming to DevTools in Chrome 61 include:

* [Mobile device throttling simulation](#throttling). Set CPU and network
  throttling simultaneously, to simulate mid-tier or low-end mobile devices.
* [Storage usage](#storage). View how much storage an origin is using, broken
  down by technology (IndexedDB, cache, local, session, etc.).
* [Cache timestamps](#time-cached). View when a service worker cached a
  response.
* [Enable the FPS Meter from the Command Menu](#fps-meter).
* [Change mousewheel and trackpad behavior in the Performance
  panel](#mousewheel).
* [Debug ES6 modules natively](#modules).

Note: You can check what version of Chrome you're running at
`chrome://version`. Chrome auto-updates to a new major version about every 6
weeks.

## Simulate low-end and mid-tier mobile devices in Device Mode {: #throttling }

The Device Mode **Throttling** menu is now exposed by default, and it now lets
you simulate a low-end or mid-tier mobile device with a couple of clicks.

<figure>
  <img src="/web/updates/images/2017/07/throttling-menu.png"
       alt="The Throttling Menu"/>
  <figcaption>
    <b>Figure 1</b>. The <b>Throttling Menu</b>
  </figcaption>
</figure>

<figure>
  <img src="/web/updates/images/2017/07/throttling-definitions.svg"
       alt="Throttling Menu definitions"/>
  <figcaption>
    <b>Figure 2</b>. Hover over the <b>Throttling</b> menu or open the
    <b>Capture Settings</b> menu to see the definitions for <b>Mid-tier
    mobile</b> and <b>Low-end mobile</b>
  </figcaption>
</figure>

## View storage usage {: #storage }

The new **Usage** section in the **Clear Storage** tab of the **Application**
panel shows you how much storage an [origin][origin] is using, as well as the
maximum quota for the entire device.

[origin]: https://tools.ietf.org/html/rfc6454#section-3.2

<figure>
  <img src="/web/updates/images/2017/07/usage-section.png"
       alt="The Usage section"/>
  <figcaption>
    <b>Figure 3</b>. The <b>Usage</b> section shows that
    <code>https://airhorner.com</code> is using 66.9KB out of the device's
    quota of 15214MB
  </figcaption>
</figure>

## View when a service worker cached responses {: #time-cached }

The new **Time Cached** column in the **Cache Storage** tab shows you
when a service worker cached responses.

<figure>
  <img src="/web/updates/images/2017/07/time-cached.png"
       alt="The Time Cached column"/>
  <figcaption>
    <b>Figure 4</b>. The <b>Time Cached</b> column
  </figcaption>
</figure>

## Enable the FPS Meter from the Command Menu {: #fps-meter }

You can now enable the [FPS Meter][FPS] from the [Command Menu][CM].

[FPS]: /web/tools/chrome-devtools/evaluate-performance/reference#fps-meter
[CM]: /web/tools/chrome-devtools/ui#command-menu

<figure>
  <img src="/web/updates/images/2017/07/fps-meter.png"
       alt="Enabling the FPS Meter from the Command Menu"/>
  <figcaption>
    <b>Figure 5</b>. Enabling the <b>FPS Meter</b> from the <b>Command
    Menu</b>
  </figcaption>
</figure>

## Set mousewheel behavior to zoom or scroll with Performance recordings {: #mousewheel }

Open [Settings][Settings] and set the new **Flamechart mouse wheel action** setting to
change how mousewheels behave on the **Performance** panel.

[Settings]: /web/tools/chrome-devtools/ui#settings

For example, when you use a mousewheel on the **Main** section of a recording,
or when you swipe with two fingers on a trackpad, the default behavior is
to zoom in or out. When you change the setting to **Scroll**, this gesture now
scrolls up or down.

<figure>
  <img src="/web/updates/images/2017/07/flamechart-setting.svg"
       alt="The 'Flamechart mouse wheel action' setting"/>
  <figcaption>
    <b>Figure 6</b>. The <b>Flamechart mouse wheel action</b> setting
  </figcaption>
</figure>

## Debugging support for ES6 Modules {: #modules }

ES6 Modules are shipping natively in Chrome 61. There's not much going on here
with regards to DevTools, other than that debugging works as you'd expect it
to. Try setting some breakpoints in and stepping through [Paul Irish's
ES6-Module-implementation][ES6] of [TodoMVC][TodoMVC] to see for yourself.

[ES6]: https://paulirish.github.io/es-modules-todomvc/
[TodoMVC]: http://todomvc.com/

## Feedback {: #feedback }

The best place to discuss any of the features or changes you see here is
the [google-chrome-developer-tools@googlegroups.com mailing list][ML]. You
can also tweet us at [@ChromeDevTools](https://twitter.com/chromedevtools) if
you're short on time.

[ML]: https://groups.google.com/forum/#!forum/google-chrome-developer-tools

That's all for what's new in DevTools in Chrome 61. See you in 6 weeks for
Chrome 62!

## Links to previous release notes {: #links }

* [What's New In DevTools (Chrome 60)](/web/updates/2017/05/devtools-release-notes)
* [What's New In DevTools (Chrome 59)](/web/updates/2017/04/devtools-release-notes)
* [What's New In DevTools (Chrome 58)](/web/updates/2017/03/devtools-release-notes)
