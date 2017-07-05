project_path: /web/_project.yaml
book_path: /web/showcase/_book.yaml

{# wf_published_on: 2017-06-12 #}
{# wf_updated_on: 2017-06-12 #}
{# wf_featured_image: /web/showcase/2017/images/matterport/top.jpg #}
{# wf_featured_snippet: At Matterport, we have a large library of over 450,000 3D Spaces that users can find embedded in sites all over the web. Users could even experience these Spaces in VR through a native mobile app for Cardboard or Gear VR. Now with WebVR support, it is much easier for users to experience VR right from their browser.<br/><br/>Launching WebVR support in our player required us to focus on the most essential features. This case study describes the process we followed for optimizing for performance. We're very happy with the final result that we achieved and we're excited about all the things we can do in the future with WebVR. #}
{# wf_tags: webvr,casestudy #}
{# wf_vertical: media #}

# Matterport WebVR {: .page-title }

*By Håkon Erichsen, Chief Architect, Matterport*

<img src="/web/showcase/2017/images/matterport/top.jpg" class="attempt-right">

Matterport has <a href="https://matterport.com/gallery/">over 450,000 3D Spaces of buildings and
locations</a> that users can find embedded in sites all over the web. The engineering team is
always looking to make the experience of exploring our Spaces even more immersive, so VR is a high
priority for us. When it became clear that WebVR was close to launching, we knew we had to mobilize
as soon as possible to add support for it.

## The Battle-Plan

Our WebGL player has a lot of different bells and whistles: spatial annotations, automatic tours,
multiple viewing modes and settings, and more. So when a team of three engineers had only four
weeks before WebVR launched, we had to get creative. Instead of simply switching to VR mode in our
current WebGL player, we decided to load a minimal, special WebVR player when the user initiates VR
mode, and swap to that.

This way we could cut the experience down to a minimal core experience of walking around inside a
Space, and **ruthlessly optimize** for performance over features, without impacting our millions of
non-VR users. We also decided to prioritize support for the Daydream headset and controller in
order to deliver a high quality experience for one device, rather than compromising the experience
to accommodate a wider range of devices.

## Switching to VR mode

The easiest way we could think of for someone to enter VR was to detect when someone puts their
phone in a VR headset while having our WebGL player open. This can be done by listening for the
`vrdisplayactivate` event, which Chrome triggers when a user puts the phone in the Daydream headset
and the NFC chip is detected.

However, there is a small, but important difference between `vridisplayactivate` and other
user-initiated events, e.g. onclick: Since we have to unload our normal WebGL player and load the
WebVR player once we detect the user wanting to go into VR, we need a second or two of loading.
Using `onclick` we are able to load this in the background during the controller calibration
screen.  With `vrdisplayactivate`, though, we do not get to start loading until after the
calibration, which ends up stalling the main thread when the user has the headset on, causing
uncomfortable flickering:

<a href="https://www.matterport.com/virtual-reality/webvr/"><img
src="/web/showcase/2017/images/matterport/timeline.png" class="attemptfg-right"></a>

Until `vrdisplayactivate` fires earlier, using `onclick` and a button provides users with the best
experience for now.

## Performance

We knew performance would have to be rock solid for the experience to work well, so we started with
the assumption that we would only implement a bare bones experience: no bells and whistles, just
simple navigation inside a space.

We quickly made a prototype with <a
href="https://github.com/borismus/webvr-boilerplate">webvr-boilerplate</a> and a stripped down
version of our loading and rendering code. In our first run we only got about 10-20 FPS: In our
normal WebGL app, that would feel bad, but in VR it’s downright nauseating.  As we often do, we
fired up the Chrome Developer Tools, and connected it to a Pixel phone. We got four major
takeaways:

- Know your rendering code!
    - Webvr-boilerplate rendered the screen a total of four times, two for each eye. Removing one
      extraneous line of code quickly halved our rendering time! This has since been fixed in the
      newest version of webvr-boilerplate, but we suspect that this particular bug has caused a lot
      of developers to get the wrong impression of webvr performance.
- Profile on the actual device you are building for, not your developer computer
    - Mobile devices and browsers have very different performance characteristics from your Mac;
      make sure you’re optimizing the real bottleneck.
- You don’t need all those pixels
    - Be aware how many pixels you are rendering. In THREE.js, this is set with
      WebGLRenderer.setPixelRatio(). You might not need the full resolution, in our case we simply
      set it to 1.0, as higher numbers did not give visibly better visuals.
- Be smart about the raycasting
    - Our meshes are generally around 50,000 faces, which can be a bit expensive to raycast in. We
      split our scene into smaller cubes and raycast into that, but you can also consider an
      Octree.

After a couple of rounds of improvements, we are now seeing super smooth experience on both the
Pixel and the Pixel XL.

## Living on the Bleeding Edge

When you’re making something with a browser feature that is this new, you’re bound to see a lot of
changes. In the WebVR specification, there was a mention of a security feature for iframes, which
embedders would have to add to their embed code to allow WebVR. This is important to us since our
WebGL player is embedded in iframes all around the web. The new property looked something like
this:

    <iframe src="..." allowfullscreen allowvr>

We started changing our documentation and embed codes that we hand out to customers, but wanted to
check with the Chrome team that this was really needed. **It wasn’t!** The Chrome team quickly
confirmed with the Mozilla and Microsoft teams that they would not be requiring this either.

This was a huge relief for us, as changing the embed codes around the web takes a lot of time and
effort, and will just not happen at all for most sites. Since then, `allowvr` has been removed
entirely from the specification.

## Conclusion

<a href="https://www.matterport.com/virtual-reality/webvr/"><img
src="/web/showcase/2017/images/matterport/end.jpg" class="attempt-right"></a>

After a few expected bumps in the road, <a
href="https://www.matterport.com/virtual-reality/webvr/">Matterport WebVR</a> was launched,
delivering our VR Spaces to a larger audience directly from their browser, in a smooth, seamless
way. No longer would our users have to install an app and download the Space in the locked-down
garden of an app. In the long run we also get to share a lot of WebGL code between our normal
browser WebGL player, and VR, saving us time and duplicated work.

This launch lays the foundation for further improvements which will eventually bring Matterport VR
to a huge mainstream audience in the coming years.
