project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Reducing Chrome's memory footprint is one of the team's top priorities this year.

{# wf_updated_on: 2018-07-02 #}
{# wf_published_on: 2015-08-31 #}
{# wf_tags: news,performance,update #}
{# wf_featured_image: /web/updates/images/2015-09-01-tab-discarding/image09.png #}

# Tab Discarding in Chrome: A Memory-Saving Experiment {: .page-title }

{% include "web/_shared/contributors/addyosmani.html" %}


Reducing Chrome's memory footprint is one of the team's top priorities this
year. We've already seen up to a 45% reduction in GMail's memory usage thanks to
improvements in V8's [garbage collection](http://v8project.blogspot.nl/2015/08/getting-garbage-collection-for-free.html)
process but we're really just getting started. One of our next experiments
in memory use is aimed at tab hoarders (like myself). It's called **Tab
Discarding**.

<img src="/web/updates/images/2015-09-01-tab-discarding/graphic-1.jpg" alt="Not all open tabs are used tabs. If low on memory, Chrome can discard uninteresting background tabs" />
_Tab discarding is available as an experiment in Chrome 46 and above._

### Background

For every tab you have open our renderer process usually takes around 50MB per
tab, even though most people use just a single tab at a time. If you've got 10
tabs open there's at least 450MB of memory being spent just to
keep your background tab state. This can get a little unwieldy over time.

<img src="/web/updates/images/2015-09-01-tab-discarding/image01.png" />

One of our goals is to reduce the memory used on tabs you're **not** actually
using. If I look at what tabs are consuming my system memory in the Chrome Task
Manager, I'm really just 'using' one or two of the sites below whilst the other
tabs in the background are unused.

<img src="/web/updates/images/2015-09-01-tab-discarding/image02.png" />

That's where tab discarding can help reduce our memory usage.

### Discarding unused tabs

Tab discarding allows Chrome to automatically discard tabs that aren't of great
interest to you when it's detected that system memory is running pretty low.
What do we mean by discarding? Well, a discarded tab doesn't go anywhere. We
kill it but it's still visible on the Chrome tab strip. If you navigate back to
a tab that's been discarded, it'll reload when clicked. Form content, scroll
position and so on are saved and restored the same way they would be during
forward/backward tab navigation.

Note: The current mechanism is similar to how we tackle tab discarding on
ChromeOS. The renderer process is shut down. When the tab gets reactivated we go
back to the network and load it like normal.

We also have another new feature that allows caching all tab resources locally
which works nicely with tab discarding when you're offline. When the tab is
reactivated we offer you the choice to reload the cached version that was
previously loaded over the network. To enable page reloading from cache, you can
try out another experiment under `chrome://flags/#show-saved-copy`.

You can try out tab discarding today by enabling it via
`chrome://flags/#enable-tab-discarding` and relaunching Chrome. You can
control whether it's enabled or disabled via the same Chrome `chrome://flags`
page.

<img src="/web/updates/images/2015-09-01-tab-discarding/image03.png"  />
<img src="/web/updates/images/2015-09-01-tab-discarding/image04.png"  />

A new page called `chrome://discards` lets you list what tabs are currently
open and we try to share some insight into how interesting (we think) they are
to you, from most to least.

<img src="/web/updates/images/2015-09-01-tab-discarding/image05.png" />

To test out the feature, you can either carry out your normal browsing behaviour
until your system is in a low-memory mode, or alternatively trigger a tab
discard from about:discards by clicking 'Discard tab now'. This will discard the
last tab in the list. You can also discard a particular tab from the list by
clicking its corresponding 'Discard' button. A discarded tab will display with a
[Discarded] prefix.

<img src="/web/updates/images/2015-09-01-tab-discarding/image06.png" />

**Tab discarding discards tabs in this order:**

- Internal pages like new tab page, bookmarks, etc.
- Tabs selected a long time ago
- Tabs selected recently
- Apps running in a window
- Pinned tabs
- The selected tab

We've enabled the tab discarding experiment in Chrome Canary for Windows and Mac
OS, with a Linux implementation coming soon.

<img src="/web/updates/images/2015-09-01-tab-discarding/graphic-2.jpg" alt="Pinned tabs are also taken into account when looking at whether to discard a tab" />

### Inspiration: hey there, great suspender

If tab discarding sounds familiar, it's because you've probably come across
useful Chrome extensions that give you a slightly simpler version of this idea,
such as the [The Great Suspender](https://chrome.google.com/webstore/detail/the-great-suspender/klbibkeccnjlkjkiokjodocebajanakg). The Great Suspender aims to reduce Chrome's memory and GPU footprint by
suspending tabs after a custom period of inactivity.

<img src="/web/updates/images/2015-09-01-tab-discarding/image07.png"/>

Similar to tab discarding, tabs can be un-suspended when you need to interact
with them again. Great Suspender maintains each tab's title and favicon, showing
suspended tabs in a dimmed state, making it straight-forward to navigate back to
them any time.

<img src="/web/updates/images/2015-09-01-tab-discarding/image08.png" />
_Tabs in the background that I'm not actively using have been suspended, saving
on memory. Tabs I am still actively using (GitHub and YouTube) are however still
running as normal._

We actually had a great chat with the author of the Great Suspender extension
while developing tab discarding and they're glad to see us natively tackling
this problem in ways that are more efficient than an extension might be able to,
such as losing the state of your user inactions.

### Future improvements: the tab serializer

The tab serializer is a future piece of work we think may lead to significant
improvements on our current approach to tab discarding. It takes the contents of
a Chrome tab and serializes its \*current\* state into a binary blob. This
binary blob can later be deserialized into a tab.

The serializer would serialize almost everything Chrome, Blink and V8 need to
properly preserve a tab (something Chrome extensions tackling this problem
historically haven't been able to easily achieve). Serialization would include
the usual suspects: the DOM (with a lot of WebGL and Canvas included), CSS and
the state of the V8 JavaScript VM.

<img src="/web/updates/images/2015-09-01-tab-discarding/image09.png" />

If you use Android or ChromeOS, you may know that (similar to the tab discarding
experiment covered in this post) we kill background tabs aggressively in order
to ensure memory usage is low. The issue with the way we tackle this was that
your tab would lose \*all\* of its state.

When you showed interest in the tab again, we would have to reload it and all
your interaction with it would be lost. The tab serializer just approaches this
problem in a way that gets you back to almost exactly what you were
without requiring going back to the network. We look forward to sharing more
information about this work at a later date.

### Try out tab discarding and let us know what you think

We'd love to know whether this feature is useful to you and how it could be
improved. Try it out, play around with it (especially if you're a tab hoarder!)
and let us know what you think in the comments. :) We'd also appreciate it if you
file tickets for any bugs you encounter on [crbug.com](https://crbug.com).


{% include "comment-widget.html" %}
