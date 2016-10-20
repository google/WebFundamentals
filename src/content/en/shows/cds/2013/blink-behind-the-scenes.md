project_path: /web/_project.yaml
book_path: /web/shows/_book.yaml
description: Blink is Chrome's open-source rendering engine. The Blink team is evolving the web and addressing the issues encountered by developers, learn more about how in this video.

{# wf_updated_on: 2015-02-23 #}
{# wf_published_on: 2015-02-23 #}
{# wf_youtube_id: 392VTLQyKDc #}

# Blink: Behind the Scenes {: .page-title }


<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="392VTLQyKDc"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>


Blink is Chrome's open-source rendering engine. The Blink team is evolving the web and addressing the issues encountered by developers.

There have been a number of behind-the-scenes improvements started since our April launch.

First thing we did was to delete half our source, which we didn't necessarily need. We're still not done! And we're not doing this blind: code removal is based on anonymously reported aggregate statistics from Chrome users who opt in to reporting.

We publish a new developer API every six weeks: the same as Chrome's shipping schedule is.

One big change we made when we forked from Blink was to add an intents system: every time before we're going to change the web platform, we send a public announcement to [Blink dev](https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/) announcing our intent to add or remove a feature. Then we go off, and we code it! And then the very next day after the feature is checked in, it's already there shipping in our Canary builds. This feature is off by default, but you can turn it on using about:flags.

Then, on our [public mailing list](https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/) we announce an [intent to ship](https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/yujPcy889e4).

At [chromestatus.com](https://chromestatus.com) you can see the [features](https://www.chromestatus.com/features) we've worked on, the features we've shipped, and those we're planning to deprecate. You can also check the [Chromium Releases blog](http://googlechromereleases.blogspot.co.uk/){: .external }, which has links to bugs and to our tracker dashboard.

Another big change is that we're removing WebKit prefixes. The intent is not to use Blink prefixes, but to have run-time flags (and not just compile-time flags).

[Android WebView](/chrome/mobile/docs/webview/overview) has been a big challenge – but [HTML5Test](http://html5test.com) shows that things are getting better. We're much closer to desktop in terms of having one set of web platform APIs everywhere (Web Audio is a great example of this!)

But how does the sausage machine work? Every single change we make to Blink is immediately run through over 30,000 tests, not to mention all the Chromium tests that run additionally later. We use 24 hour sheriffing, with thousands of bots, thousands of benchmarks, and systems that throw millions of broken web pages at our engine to make sure it doesn't fall over. We know that mobile is significantly slower, and this is something we're working hard to improve.

So what's new?

+ **Web Components**: check out Eric Bidelman's talk!
+ **Web Animations:** complex, synchronized, high performance animations that uses the GPU wherever possible
+ **Partial Layout:** only compute what you need!
+ **CSS Grid**
+ **Responsive images:** <picture> srcset or srcN or ?
+ Faster text autosizing, and consistent sub-pixel fonts
+ Skia, the graphic system used by Blink, is moving from GDI to DirectWrite on Windows

We want to know what you have to say!

If you feel C++ in your blood and want to write C++ with us, all of our code is open. You don't have to tell anybody or evangelize to us. You can just simply post a patch or [file a bug](https://crbug.com/new)!

**Slides:** [Blink](https://docs.google.com/a/chromium.org/presentation/d/1E30GMRaN-9Uj54pfjej8STWz5uwI8ZEg3K_t29_DHs4)
