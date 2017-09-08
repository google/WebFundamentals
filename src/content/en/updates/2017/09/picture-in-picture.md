project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: TODO

{# wf_updated_on: 2017-09-07 #}
{# wf_published_on: 2017-09-07 #}
{# wf_tags: news,media #}
{# wf_featured_image: /web/updates/images/generic/picture-in-picture.png #}
{# wf_featured_snippet: TODO #}
{# wf_blink_components: Blink>Media #}

# Picture In Picture (PiP) {: .page-title }

{% include "web/_shared/contributors/beaufortfrancois.html" %}

Since April 2017, Chrome for [Android O supports Picture In Picture]. It allows
users to play a `<video>` element in a pinned window that isn't blocked by other
windows, so that they can watch while doing other things.

Here's how it works: Open Chrome, go to a website that contains a video and
play it fullscreen. From there, press the Home button to go to your Android
Home Screen and the playing video will automatically transition in Picture In
Picture. That's all! Pretty cool right?

<figure>
  <img src="https://dummyimage.com/1798x854/999999/ffffff&text=Chrome+PiP+screenshot"
       alt="Chrome PiP screenshot">
  <figcaption>
    <b>Figure 1.</b>
    TODO: Chrome PiP screenshot
  </figcaption>
</figure>

It is but... what about desktop? What if the website want to control that
experience?

The good news is that a [Picture In Picture Web API] specification is being
drafted as we speak. This spec aims to allow websites to initiate and control
this behavior by exposing the following sets of properties to the API:

- Notify the website when video enters and leaves Picture in Picture mode.
- Allow the website to trigger Picture in Picture on a video element via a user gesture.
- Allow the website to exit Picture in Picture.
- Allow the website to check if Picture in Picture can be triggered.

And this is how it could look like:

    <video id="video" src="https://example.com/file.mp4"></video>
    
    <button id="pipButton"></button>
    
    <script>
      // Hide button if Picture In Picture is not supported.
      pipButton.hidden = !document.pictureInPictureEnabled;
    
      pipButton.addEventListener('click', function() {
        // If there is no element in Picture In Picture yet, let's request Picture
        // In Picture for the video, otherwise leave it.
        if (!document.pictureInPictureElement) {
          video.requestPictureInPicture()
          .catch(error => {
            // Video failed to enter Picture In Picture mode.
          });
        } else {
          document.exitPictureInPicture()
          .catch(error => {
            // Video failed to leave Picture In Picture mode.
          });
        }
      });
    </script>

Warning: Code above is not implemented by browsers yet.

## Feedback

So what do you think? Please submit your feedback and raise issues in the
[Picture In Picture WICG repository]. We're eager to hear your thoughts!

## Prevent PiP

There is one way you can prevent video to go PiP in Chrome while the API is not
implemented yet. This hack will certainly stop working at some point, but here
it is:

    // TODO: Replace with real hack.
    video.pleaseDontGoPiP({'foo': 'bar'});

{% include "comment-widget.html" %}

[Android O supports Picture In Picture]: https://developer.android.com/about/versions/oreo/android-8.0.html#opip
[Picture In Picture Web API]: https://wicg.github.io/picture-in-picture/
[Picture In Picture WICG repository]: https://github.com/WICG/picture-in-picture
