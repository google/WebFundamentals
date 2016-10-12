project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Learn all about the revamped “Inspect Devices” UI, toggle classes easily in the now-fixed style panel and watch the pilot of DevTools Tonight.

{# wf_updated_on: 2016-02-24 #}
{# wf_published_on: 2016-02-24 #}
{# wf_tags: devtools,digest,update,chrome49 #}
{# wf_featured_image: /web/updates/images/2016/02/devtools-digest/devtools-tonight.jpg #}

# Supercharged Remote Debugging, Class Toggles and Our Own Late Night Show?! {: .page-title }

{% include "web/_shared/contributors/pbakaus.html" %}



Learn all about the revamped <strong>Inspect Devices</strong> UI, toggle classes easily in the now-fixed style panel and watch the pilot of DevTools Tonight.

Welcome back to the latest edition of the digest for all you Canary users out there! Turns out I missed a few updates in December. (I’ve been a little preoccupied with my newborn daughter.) So here they come, along a few super fresh ones.

## The New “Inspect Devices” Dialog

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="Rp4HO7G0xJI"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

The (currently outdated) [Remote Debugging](/web/tools/chrome-devtools/debug/remote-debugging/remote-debugging) documentation for DevTools has been our most popular guide for many years in a row, which could only mean one thing: nobody had a frickin clue how to use it!

So we went ahead and revamped the UX. Instead of having to open an entirely different page (“chrome://inspect”), all of “Inspect Devices” is now conveniently embedded into DevTools itself for quick access and less context switches.

## Class Toggles in the Style Panel

![cls toggles in Style Panel](/web/updates/images/2016/02/devtools-digest/cls-toggles.png)

It’s now easier than ever to quickly toggle a class on an element to preview how it would look like with or without the associated styles. And we’ve also added an input to quickly add new classes so you don’t have to edit the attribute. Click on the new **.cls** button in the Style panel to try it out.

## DevTools Tonight

It is with great pleasure that I can announce yet another way to keep up with what’s happening in the world of Chrome DevTools: I present to you the pilot of DevTools Tonight:

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="nLpNHNlonMs"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

In the new show that’ll be serialized on a bi-weekly schedule, I’ll focus on bigger features coming to stable Chrome (instead of Canary) and will go a little more in-depth on each. Be sure to subscribe to the [Chrome Developers](https://www.youtube.com/user/ChromeDevelopers) channel to get notified when #1 ships, and let me know what you think in the YouTube comments!

## The Best of the Rest

  * We’ve added a setting to [auto-open DevTools for popups](https://twitter.com/ChromeDevTools/status/697993811696291842) (newly created windows). When enabled, a new instance of DevTools opens automatically with any newly created window.
  * The action bar on top of the Style panel [is now fixed in place](https://twitter.com/ChromeDevTools/status/676839096405221376), so you can always access it even if you scroll down to edit more styles.
  * We now [auto-zoom the timeline](https://twitter.com/ChromeDevTools/status/678992332922818560) to what we think is actually relevant to your performance debugging session.
  * [Network Throttling now supports upload](https://twitter.com/ChromeDevTools/status/679356228326195201) in addition to download so you can test stuff like file uploads on a 3G connection.
  * We’ve [revamped the Inspect tooltip](https://twitter.com/ChromeDevTools/status/697114761129914370) that overlays the inspected element. It’s now dark and shiny and adds more contrast.

- - -

As always, [let us know what you think via 
Twitter](https://twitter.com/intent/tweet?text=%40ChromeDevTools) or the 
comments below, and submit bugs to [crbug.com/new](https://crbug.com/new).

Until next month!  
Paul Bakaus & the DevTools team


{% include "comment-widget.html" %}
