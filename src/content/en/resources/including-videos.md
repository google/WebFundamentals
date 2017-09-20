project_path: /web/_project.yaml
book_path: /web/resources/_book.yaml
description: If your video is short and you want it to auto-play&mdash;basically, if you are considering a GIF&mdash;then this guide might be just what you need.

{# wf_updated_on: 2017-04-26 #}
{# wf_published_on: 2016-10-12 #}

# Including Videos {: .page-title }

{% include "web/_shared/contributors/surma.html" %}

If you want to include a video in your article, you should consider uploading it
to [**YouTube**](https://youtube.com). YouTube will automatically adapt to the
user’s available bandwidth and offers a familiar UI. However, if your video is
short and you want it to auto-play&mdash;basically if you are considering a
GIF&mdash;then this guide might be just what you need.

## Video source

Your source video should be **high quality** and have a **high frames per
second**. If you are recording a screencast, make sure you set the bitrate high
enough to avoid artifacts in the source material. (For a retina screen I usually
go to ~6Mbit/s). I recommend always recording **at least 60 fps**, _especially_
when recording effects, transitions or any kind of animation.

## Converting to web formats

I am using [ffmpeg](https://www.ffmpeg.org/) to convert videos. If you are on a
Mac with [Homebrew](http://brew.sh/) set up, you can install ffmpeg with:

    brew install --with-{libvpx,x265,openh264} ffmpeg

To make sure the videos can be played by both Safari mobile and other browsers,
we are going to create two versions of the video. One version will be in an
MPEG4 container (`.mp4`) using the h264 codec. The other version will be in a
WebM container (`.webm`) using the VP8 codec. You can use the following script
to automate the process:

    #!/bin/bash
    BITRATE=${BITRATE:-500k}

    ffmpeg -i $1 ${@:2} -c:v libx264 -profile:v main -level 4.0 -preset veryslow -tune animation -movflags +faststart -b:v ${BITRATE} -pix_fmt yuv420p -c:a null ${1%.*}_x264.mp4
    ffmpeg -i $1 ${@:2} -c:v libvpx -b:v ${BITRATE} -c:a null ${1%.*}_vp8.webm

Notes about the script:

* Usage: `BITRATE=500k ./transcode_video.sh <filename> [additional ffmpeg options]`
* The script _will_ strip out any audio.
* You should change the `-tune` parameter to `film` if it’s not a screenrecording.
* Details about the x264 encoder options can be found [here](https://trac.ffmpeg.org/wiki/Encode/H.264)
* Details about the VP8 encoder options can be found [here](https://trac.ffmpeg.org/wiki/Encode/VP8)
* You might want to play around with the bitrate for each format individually.
  VP8 tends to achieve the same quality with a smaller bitrate (and therefore
  smaller filesize) than h264.

## Useful options

* `-r 15`: Resample to 15 fps. I use this when I am screencasting the DevTool
  console or a terminal.
* `-vf 'scale=trunc(iw/4)*2:-2'`: Makes the video half as big. When using it
  make sure both width and height are a multiple of 2. (This is a requirement
  for h264).
* `-vf 'scale=trunc(iw/8)*4:-2'`: Does the same thing as the previous option,
  except that it makes the video a quarter as big rather than half as big.

I’d recommend NOT using the original resolution for the video, as I expect no
one to open the video on desktop in fullscreen. A width of roughly under 1000px
seems like a good choice.

## Hosting

Video assets are not stored in the repository. Any kind of external hosting
should be fine (like GCS or S3). Googlers can have access to a GCS bucket for
WebFundamentals assets.

## Including

Include the video in your article using the following markup. The `autoplay`
attribute can be removed if autoplay is not desired. I recommend keeping
`controls` in for as long as iOS 9 is around, as it ignores `autoplay` and the
user needs a way to start the video. I’d also recommend to [add a poster
image](/web/fundamentals/media/video#include_a_poster_image),
especially when autoplay is not enabled.


    <video controls autoplay loop muted poster="[url to poster image]">
      <source src="[url to .webm file]" type="video/webm; codecs=vp8">
      <source src="[url to .mp4 file]" type="video/mp4; codecs=h264">
    </video>

