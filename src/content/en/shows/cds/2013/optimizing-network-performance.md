project_path: /web/_project.yaml
book_path: /web/shows/_book.yaml
description: In this talk Ilya stepped through recent changes in Chrome that will improve loading time, as well as a few changes you can make in your environment to help keep network load to an absolute minimum.

{# wf_updated_on: 2015-02-23 #}
{# wf_published_on: 2015-02-23 #}
{# wf_youtube_id: MOEiQ6sjeaI #}

# Optimizing Network Performance {: .page-title }


<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="MOEiQ6sjeaI"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>


Network and latency typically accounts for 70% of a site’s total page load time. That’s a large percentage, but it also means that any improvements you make there will reap huge benefits for your users. In this talk Ilya stepped through recent changes in Chrome that will improve loading time, as well as a few changes you can make in your environment to help keep network load to an absolute minimum.

[Slides](https://bit.ly/cds-network)

+ Chrome M27 has a new and improved resource scheduler.
+ Chrome M28 has made SPDY sites (even) faster.
+ Chrome’s simple cache has received an overhaul.
+ SPDY / HTTP/2.0 offer huge transfer speed improvements. There are mature SPDY modules available for nginx, Apache and Jetty (to name just three).
+ QUIC is a new and experimental protocol built on top of UDP; it’s early days but however it works out users will win.
