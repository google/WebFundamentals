project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: WebM just added alpha transparency, and support for it has landed in Chrome Canary.

{# wf_updated_on: 2018-08-07 #}
{# wf_published_on: 2013-07-25 #}
{# wf_tags: news,video,webm #}
{# wf_blink_components: N/A #}

# Alpha transparency in Chrome video {: .page-title }

{% include "web/_shared/contributors/samdutton.html" %}


## Alpha transparency in Chrome video

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="LIH_myX3Zp0"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Chrome Canary now supports video alpha transparency in WebM.

In other words, Chrome takes the alpha channel into account when playing '[green
screen](https://en.wikipedia.org/wiki/Chroma_key)' videos encoded to WebM with
an alpha channel. This means you can play videos with transparent backgrounds: over web pages, images or even other videos.

There's a demo at
[simpl.info/videoalpha](https://simpl.info/videoalpha). This only works in Chrome Canary at this point, and you'll need to enable VP8 alpha transparency from the chrome://flags page. Somewhat surreal, and a bit rough around the edges (literally) but you get the idea!

## How to make alpha videos

The method we describe uses the open source tools Blender and ffmpeg:

1. Film your subject in front of a single color background such as a bright
   green curtain.
2. Process the video to build an array of PNG still images with transparency
   data.
3. Encode to a video format (in this case, WebM).

There are
also proprietary tools to do the same job, such as [Adobe After
Effects](http://www.adobe.com/products/aftereffects.html), which you may find
simpler.

### 1. Make a green screen video

First of all, you need to film your subject in a way that everything in the
background can be 'removed' (made transparent) by subsequent processing.

The easiest way to do this is to film in front of a single color background,
such as a screen or curtain. Green or blue are the colors most often used, mostly because of their difference from skin tones.

There are [several](http://www.youtube.com/watch?v=M_WdLkaOUic) [guides](https://en.wikipedia.org/wiki/Chroma_key#Process) [online](http://www.youtube.com/watch?v=q3PZO_lCBkw) to filming green screen video (also known as
chroma key) and [lots of
places](https://www.google.com/search?tbm=shop&q=chromakey) to buy green and
blue screen backdrops. Alternatively, you can paint a background with [chroma
key paint](https://www.google.com/search?tbm=shop&q=chroma+key+paint).

[The Great Gatsby VFX reel](http://vimeo.com/68451324) shows just how much can be accomplished with green screen.

Some tips for filming:

* Ensure your subject does not have clothes or objects that are the same color
  as the backdrop, otherwise these will show up as 'holes' in the final video. Even small logos or jewelry can be problematic.
* Use consistent, even lighting, and avoid shadows: the aim is to have the
  smallest possible range of colors in the background that will subsequently
  need to be made transparent.
* Using multiple diffused lights helps to avoid shadows and background color
  variations.
* Avoid shiny backgrounds: matte surfaces diffuse light better.

### 2. Create raw alpha video from green screen video

The following steps describe one way to create a raw alpha video from green screen videos:

1. Once you've shot a green screen video, you can use an open source tool like [Blender](http://www.blender.org/download/get-blender) to convert the video
   to an array of PNG files with alpha data. Use Blender's color keying to
   remove the green screen and make it transparent. (Note that PNG is not
   compulsory: any format that preserves alpha channel data is fine.)
2. Convert the array of PNG files to a raw YUVA video using an open source tool
   such as ffmpeg:
   <br/>
   `ffmpeg -i image%04d.png -pix_fmt yuva420p video.raw`<br/>
   <br/>
   Alternatively encode the files directly to WebM, using an ffmpeg command
   like this:
   <br/>
  `ffmpeg -i image%04d.png output.webm`

If you want to add audio, you can use ffmpeg to mux that in with a command like
this:

`ffmpeg -i image%04d.png -i audio.wav output.webm`

### 3. Encode alpha video to WebM

Raw alpha videos can be encoded to WebM in two ways.

1. With ffmpeg: we added support to ffmpeg to encode WebM alpha videos.<br/>
   <br/>
   Use ffmpeg with an input video including alpha data, set the output format to
   WebM, and encoding will automatically be done in the correct format as per
   the spec. (Note: you'll currently need to make sure to get [the latest
   version of ffmpeg from the git tree](https://github.com/FFmpeg/FFmpeg) for
   this to work.)<br/>
   <br/>
   Sample command:
   <br/>
   `ffmpeg -i myAlphaVideo.webm output.webm`

2. Using webm-tools:
   <br/>
   `git clone http://git.chromium.org/webm/libvpx.git`<br/>
   <br/>
   webm-tools is a set of simple open source tools related to WebM, maintained by the WebM Project authors, including a tool for creating WebM videos with alpha transparency.<br/>
   <br/>
   Run the binary with `--help` to see list of options supported by alpha_encoder.

### 4. Playback in Chrome

To play the encoded WebM file in Chrome, simply set the file as the source of a
video element. <br/>
<br/>
As of now, VP8 alpha playback is behind a flag, so you have to either enable it
in about:flags or [set the command line
flag](http://www.chromium.org/developers/how-tos/run-chromium-with-flags)
`--enable-vp8-alpha-playback` when you start Chrome. When the flag is enabled,
alpha playback also works with
[MediaSource](http://updates.html5rocks.com/2011/11/Stream-video-using-the-MediaSource-API).

### How did they do it?

We talked to Google engineer Vignesh Venkatasubramanian about his work on the
project. He summarized the key challenges involved:

* The VP8 bitstream had no support for alpha channel. So we had to incorporate
  alpha without breaking the VP8 bitstream and without breaking existing
  players.
* Chrome's renderer was not capable of rendering videos with alpha.
* Chrome has multiple rendering paths for multiple hardware/GPU devices. Every
  rendering path had to be changed to support rendering of alpha videos.

We can think of lots of interesting use cases for video alpha transparency:
games, interactive videos, collaborative story telling (add your own video to a
background video/image), videos with alternative characters or plots, web apps
that use overlay video components...

Happy film making! Let us know if you build something amazing with alpha transparency.


{% include "comment-widget.html" %}
