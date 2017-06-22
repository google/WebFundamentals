project_path: /web/_project.yaml
book_path: /web/showcase/_book.yaml

{# wf_published_on: 2017-02-02T18:00:00.000Z #}
{# wf_updated_on: 2017-02-02T18:00:00.000Z #}
{# wf_featured_image: /web/showcase/2017/images/matterport/VR_FourSeason_InGame01.jpg #}
{# wf_featured_snippet: <emphasis>Matterport VR</emphasis> lets you experience thousands of real-world places in interactive virtual reality. Using a combination of automated 3D interior mapping technology and robust vision processing algorithms, Matterport's 3D media system enables anyone to create immersive virtual environments from real places. Unlike 360˚ photos, Matterport Spaces allow users to interactively walk through any location.<br><br>With WebVR, anyone can <a href="https://matterport.com/virtual-reality/webvr/">explore Matterport's library</a> of over 300,000 VR Spaces with a WebVR-enabled browser. Tour everything from celebrity homes to museums, canyons, iconic architecture, and beyond. #}
{# wf_tags: webvr,casestudy #}
{# wf_vertical: media #}

# Matterport VR for WebVR {: .page-title }

*By Matt Bell, Cofounder, Matterport*

<img src="/web/showcase/2017/images/matterport/VR_FourSeason_InGame.jpg" class="attempt-right">

<a class="button button-primary" href="https://try.matterport.com/virtual-reality/webvr/">
  View the site
</a>

### TL;DR {: .hide-from-toc }
By adding WebVR support, Matterport makes it easier to explore real-world
places in immersive virtual reality. With no apps to download, WebVR will reduce
drop-offs and enable partners to retain the user on their own website. [WebVR is
a key lever in Matterport's
strategy](https://matterport.com/virtual-reality/webvr/) for increasing
consumption and discovery of VR content.

## About Matterport and Matterport VR
*Matterport VR* lets you experience thousands of real-world places in interactive
virtual reality. Using a combination of automated 3D interior mapping technology
and robust vision processing algorithms, Matterport's 3D media system enables
anyone to create immersive virtual environments from real places. Unlike 360˚
photos, Matterport Spaces allow users to interactively walk through any
location.

With WebVR, anyone can explore Matterport's library of over 300,000 VR Spaces
with a WebVR-enabled browser. Tour everything from celebrity homes to museums,
canyons, iconic architecture, and beyond.

## Challenge
Until 2017, *Matterport VR* had to be experienced via a downloadable app from the
Apple App Store, Oculus Store, or Google Play Store. When a viewer tried to
launch a 3D Space in VR, they were taken through a series of steps to first
download and launch this app. While this allows anyone to explore a full
library of Matterport Spaces, the interruption to download caused significant
dropoff and less engagement with specific VR Spaces. Partners were also
concerned about their customers leaving their website.

## Solution
Matterport's philosophy is to keep things push-button simple and delight their
customers. Using the [WebVR API](/web/fundamentals/vr/) support in Chrome 56,
Matterport was able to create [virtual reality that can be experienced directly
from a mobile web browser](https://matterport.com/virtual-reality/webvr/), with
no apps to download. This experience is currently limited to Daydream but will
be expanded to additional VR platforms and browsers.

Now a user needs to simply tap the VR button in a Matterport 3D Showcase, slip
their phone into a Daydream View, and start exploring. When they are
finished, they are returned directly to the website they were browsing, so
companies can keep their customers fully engaged.

Matterport is committed to leading the ecosystem for non-gaming VR content by
simplifying content creation, offering platform agnostic content consumption and
fostering content discovery. WebVR directly helps us accomplish these goals
while ensuring a win-win strategy for all stakeholders.

## Try it for yourself!
Just tap the Play button on your Daydream-ready phone, then tap the VR
goggles in the bottom right hand corner.

<style>
  .aspect-container {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56%;
  }

  .aspect-container .aspect-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%
  }
</style>

<div class="aspect-container">
  <iframe class="aspect-content" src="https://my.matterport.com/show/?m=FYBseauDW4G" frameborder="0" allowfullscreen allowvr></iframe>
</div>

