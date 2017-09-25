project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Say goodbye to automatic playback uncertainty! play() now returns a Promise.

{# wf_updated_on: 2016-03-11 #}
{# wf_published_on: 2016-03-11 #}
{# wf_tags: promises,play,video,audio,chrome50 #}
{# wf_featured_image: /web/updates/images/generic/play-outline.png #}
{# wf_featured_snippet: Say goodbye to automatic playback uncertainty! <code>play()</code> now returns a Promise. #}
{# wf_blink_components: Blink>Media #}

# HTMLMediaElement.play() Returns a Promise {: .page-title }

{% include "web/_shared/contributors/jeffposnick.html" %}



Automatically playing audio and video on the web is a powerful capability,
and one that’s subject to different restrictions on different platforms.
Today, most desktop browsers will always allow web pages to begin
`<video>` or `<audio>` playback via JavaScript without user interaction.
Most mobile browsers, however, require an explicit user gesture before
JavaScript-initiated playback can occur. This helps ensure that mobile users,
many of whom pay for bandwidth or who might be in a public environment,
don’t accidentally start downloading and playing media without explicitly
interacting with the page.

It’s historically been difficult to determine whether user interaction is
required to start playback, and to detect the failures that happen when
(automatic) playback is attempted and fails. Various
[workarounds](http://stackoverflow.com/questions/17452057/feature-detect-autoplay-html5-audio-audio-on-mobile-browsers)
exist, but are less than ideal. An
[improvement](https://bugs.chromium.org/p/chromium/issues/detail?id=579541) to the
underlying `play()` method to address this uncertainty is long overdue, and this
has now made it to the
[web platform](https://html.spec.whatwg.org/multipage/embedded-content.html#dom-media-play),
with an initial implementation in
[Chrome 50](https://www.chromestatus.com/feature/5920584248590336).

A `play()` call on an a `<video>` or `<audio>` element now returns a
[Promise](/web/fundamentals/getting-started/primers/promises). If playback succeeds,
the Promise is fulfilled, and if playback fails, the Promise is rejected along with an
error message explaining the failure. This lets you write intuitive code like the following:


    var playPromise = document.querySelector('video').play();
    
    // In browsers that don’t yet support this functionality,
    // playPromise won’t be defined.
    if (playPromise !== undefined) {
      playPromise.then(function() {
        // Automatic playback started!
      }).catch(function(error) {
        // Automatic playback failed.
        // Show a UI element to let the user manually start playback.
      });
    }
    

In addition to detecting whether the `play()` method was successful, the new Promise-based
interface allows you to determine when the `play()` method succeeded. There are contexts
in which a web browser may decide to delay the start of playback—for instance, desktop
Chrome will not begin playback of a `<video>` until the tab is visible. The Promise won’t
fulfill until playback has actually started, meaning the code inside the `then()` will not
execute until the media is playing. Previous methods of determining if `play()` is successful,
such as waiting a set amount of time for a `playing` event and assuming failure if it doesn’t
fire, are susceptible to false negatives in delayed-playback scenarios.

We’ve published a [live example](https://googlechrome.github.io/samples/play-return-promise/)
of this new functionality. View it in a browser such as Chrome 50 that supports this Promise-based
interface. Be forewarned: the page will automatically play music when you visit it. (Unless, of
course, it doesn’t!)


{% include "comment-widget.html" %}
