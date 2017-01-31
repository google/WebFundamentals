project_path: /web/_project.yaml
book_path: /web/shows/_book.yaml
description: Offline is being taken seriously by browser vendors and you will soon have the tools in your hands that help you build great experiences that work well when you are offline.

{# wf_updated_on: 2015-02-23 #}
{# wf_published_on: 2015-02-23 #}
{# wf_youtube_id: Z7sRMg0f5Hk #}

# Network Connectivity: Optional {: .page-title }


<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="Z7sRMg0f5Hk"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>


We learnt many things from this talk: Jake doesn’t wear shoes when presenting; [Business Kinlan](https://twitter.com/Business_Kinlan/status/403231878246715392) has a new book coming out soon; Offline is being taken seriously by browser vendors and you will soon have the tools in your hands that help you build great experiences that work well when you are offline.

[ServiceWorker](https://github.com/slightlyoff/ServiceWorker) will give us the flexibility that we need to build compelling offline first experiences with ease and not suffer the pains inflicted by AppCache.  You can even [experiment with the API using a Polyfill](https://github.com/phuu/serviceworker-demo).

[Slides: Network connectivity: optional](https://speakerdeck.com/jaffathecake/network-optional)

## ServiceWorker to the rescue

+ In the next generation of progressive enhancement, we treat the network as a potential enhancement
+ ServiceWorker gives you full, scriptable, debuggable control over network requests
+ If you have an offline experience, don’t wait for the network to fail before you show it, as this can take ages
