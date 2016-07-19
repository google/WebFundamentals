project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: Accessibility isn't a feature.

<p class="intro">
  Accessibility isn't a feature. Users who can't hear or see won't be able to experience a video at all without captions or descriptions. The time it takes to add these to your video is much less than the bad experience you are delivering to users. Provide at least a base experience for all users.
</p>



## Include captions to improve accessibility

To make media more accessible on mobile, include captions or descriptions
using the track element.




















<div class="wf-highlight-list wf-highlight-list--remember" markdown="1">
  <h3 class="wf-highlight-list__title">Remember</h3>

  
  <ul class="wf-highlight-list__list">
    
    <li>The track element is supported on Chrome for Android, iOS Safari, and all current browsers on desktop except Firefox (see <a href='http://caniuse.com/track' title='Track element support status'>caniuse.com/track</a>). There are several polyfills available too. We recommend <a href='//www.delphiki.com/html5/playr/' title='Playr track element polyfill'>Playr</a> or <a href='//captionatorjs.com/' title='Captionator track'>Captionator</a>.</li>
    
  </ul>
  
</div>



Using the track element, captions appear like this:

<img alt="Screenshot showing captions displayed using the track element in Chrome on Android" src="images/Chrome-Android-track-landscape-5x3.jpg">

## Add track element

It's very easy to add captions to your video &ndash; simply add a track element as a child of the video element:


  <div dir="ltr" class="highlight-module highlight-module--code highlight-module--right">
      <div class="highlight"><pre><span class="nt">&lt;video</span> <span class="na">controls</span><span class="nt">&gt;</span>
    <span class="nt">&lt;source</span> <span class="na">src=</span><span class="s">&quot;chrome.webm&quot;</span> <span class="na">type=</span><span class="s">&quot;video/webm&quot;</span> <span class="nt">/&gt;</span>
    <span class="nt">&lt;source</span> <span class="na">src=</span><span class="s">&quot;chrome.mp4&quot;</span> <span class="na">type=</span><span class="s">&quot;video/mp4&quot;</span> <span class="nt">/&gt;</span>
  <span class="nt">&lt;track</span> <span class="na">src=</span><span class="s">&quot;chrome-subtitles-en.vtt&quot;</span> <span class="na">label=</span><span class="s">&quot;English captions&quot;</span>
         <span class="na">kind=</span><span class="s">&quot;captions&quot;</span> <span class="na">srclang=</span><span class="s">&quot;en&quot;</span> <span class="na">default</span><span class="nt">&gt;</span>
  <span class="nt">&lt;p&gt;</span>This browser does not support the video element.<span class="nt">&lt;/p&gt;</span>
<span class="nt">&lt;/video&gt;</span>
</pre></div>
      <p>
        <a class="highlight-module__cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="/web/resources/samples/fundamentals/design-and-ui/media/video/track.html">Try full sample</a>
      </p>
  </div>



The track element `src` attribute gives the location of the track file.

## Define captions in track file

A track file consists of timed 'cues' in WebVTT format:

    WEBVTT

    00:00.000 --> 00:04.000
    Man sitting on a tree branch, using a laptop.

    00:05.000 --> 00:08.000
    The branch breaks, and he starts to fall.

    ...



