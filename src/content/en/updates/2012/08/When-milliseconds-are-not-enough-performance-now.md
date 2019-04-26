project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml

{# wf_updated_on: 2019-02-21 #}
{# wf_published_on: 2012-08-15 #}
{# wf_tags: news,internals,performance #}
{# wf_blink_components: N/A #}

# When milliseconds are not enough: performance.now {: .page-title }

{% include "web/_shared/contributors/paulirish.html" %}


The [High Resolution Timer](https://w3c.github.io/hr-time/) was added by the [WebPerf Working Group](https://www.w3.org/webperf/){: .external } to allow measurement in the Web Platform that's more precise than what we've had with `+new Date` and the newer `Date.now()`.

So just to compare, here are the sorts of values you'd get back:


    Date.now()         //  1337376068250
    performance.now()  //  20303.427000007


You'll notice the two above values are many orders of magnitude different. `performance.now()` is a measurement of floating point milliseconds since that particular page started to load (the <code>performance.timing.<a href="https://www.w3.org/TR/navigation-timing/#dom-performancetiming-navigationstart">navigationStart</a></code> timeStamp to be specific). You could argue that it could have been the number of milliseconds since the [unix epoch](https://en.wikipedia.org/wiki/Unix_time), but rarely does a web app need to know the distance between now and 1970. This number stays relative to the page because you'll be comparing two or more measurements against eachother.

### Monotonic time

Another added benefit here is that you can rely on the time being monotonic. Let's let WebKit engineer Tony Gentilcore explain this one:

> Perhaps less often considered is that `Date`, based on system time, isn't ideal for real user monitoring either. Most systems run a daemon which regularly synchronizes the time. It is common for the clock to be tweaked a few milliseconds every 15-20 minutes. At that rate about 1% of 10 second intervals measured would be inaccurate.

### Use Cases

There are a few situations where you'd use this high resolution timer instead of grabbing a basic timestamp:

* benchmarking
* game or animation runloop code
* calculating framerate with precision
* cueing actions or audio to occur at specific points in an animation or other time-based sequence

### Availability

The high resolution timer is currently available in Chrome (Stable) as `window.performance.webkitNow()`, and this value is generally equal to the [new argument value passed into the requestAnimationFrame callback](/web/updates/2012/05/requestAnimationFrame-API-now-with-sub-millisecond-precision). Pretty soon, [WebKit will drop its prefix](https://bugs.webkit.org/show_bug.cgi?id=88278) and this will be available through `performance.now()`. The WebPerfWG in particular, led by Jatinder Mann of Microsoft, has been very [successful in unprefixing](https://jatindersmann.com/2012/08/07/ieblog-web-performance-apis-rapidly-become-w3c-candidate-recommendations/) their features quite quickly[.](https://a.disquscdn.com/uploads/mediaembed/images/272/1565/original.jpg)

In summary, `performance.now()` is...

* a double with microseconds in the fractional
* relative to the `navigationStart` of the page rather than to the UNIX epoch
* not skewed when the system time changes
* available in Chrome stable, Firefox 15+, and IE10.



