project_path: /web/_project.yaml
book_path: /web/shows/_book.yaml
description: Hitting 60fps in your projects directly correlates to user engagement and is crucial to its success. In this talk Nat and Tom talked about Chrome’s rendering pipeline, some common causes of dropped frames and how to avoid them.

{# wf_updated_on: 2015-02-23 #}
{# wf_published_on: 2015-02-23 #}
{# wf_youtube_id: YyQYhhy1dZI #}

# 60fps Layout and Rendering {: .page-title }


<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="YyQYhhy1dZI"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>


Hitting 60fps in your projects directly correlates to user engagement and is crucial to its success. In this talk Nat and Tom talked about Chrome’s rendering pipeline, some common causes of dropped frames and how to avoid them.

[Slides](https://docs.google.com/a/google.com/presentation/d/1CH8ifryioHDLT1Oryyy8amusUmq2FytpCPCpk0G3E4o/edit#slide=id.g175f55166_010)

+ A frame is 16ms long. It contains JavaScript, style calculations, painting and compositing.
+ Painting is _extremely_ expensive. A Paint Storm is where you unnecessarily repeat expensive paint work.
+ Layers are used to cache painted elements.
+ Input handlers (touch and mousewheel listeners) can kill responsiveness; avoid them if you can. Where you can’t keep them to a minimum.
