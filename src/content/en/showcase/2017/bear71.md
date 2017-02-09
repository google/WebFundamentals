project_path: /web/_project.yaml
book_path: /web/showcase/_book.yaml

{# wf_published_on: 2017-02-02T18:00:00.000Z #}
{# wf_updated_on: 2017-02-02T18:00:00.000Z #}
{# wf_featured_image: /web/showcase/2017/images/bear71/featured.png #}
{# wf_featured_snippet: Bear 71 is an interactive documentary launched by the National Film Board of Canada in 2012 to much critical acclaim. When it was built, Flash was in its golden years but with the deprecation of browser support for Flash, we were eager to explore WebVR, both as a way to preserve the project’s legacy and a chance to innovate how the story is experienced. #}
{# wf_tags: webvr,casestudy #}

# Bear 71 and WebVR {: .page-title }

<img src="/web/showcase/2017/images/bear71/featured.png" class="attempt-right">

### TL;DR {: .hide-from-toc }

WebVR is an API built into browsers that combines stereo rendering with real-time head tracking, enabling a quick and easy way to enjoy VR content online. With WebVR, content creators can create immersive VR content that lives online and runs on a wide range of VR hardware.

## About Bear 71

Bear 71 is an interactive documentary produced by the National Film Board of Canada. Originally built in Flash, Bear 71 was released in 2011 to critical acclaim. The backbone of experience is a 23 minute track of audio and video, highlighting the relationship between humans, nature, technology, and one particular brown bear. The viewer is a voyeur in a world of information represented as an abstract grid of symbols. Surprisingly, this doesn't hamper the emotional story within, and it should be experienced first-hand to be understood.

## Challenge

The original Bear 71 was developed in Flash; arguably the best interactive storytelling medium of the time. A lot of care went into the technology and it was considered cutting edge. 5 Years later, the original vision holds up and story is still very relevant, but the technology behind it needs an update. Any technology, used creatively, can assist a good story, but Virtual Reality deserves special attention. VR has come and gone several times before, but it’s finally arrived in the mainstream. This is a huge opportunity for storytelling. Stories which traditionally happened in front of you, can now happen around you in VR.

When Bear 71 was built, Adobe Flash was in its golden years. Each passing year, Flash's market share shrinks, and with that, previously accessible works are harder and harder to view. But with Flash's decline has come the maturation of HTML 5. Furthermore, VR is being taken more seriously than ever as a real platform for storytelling.

To our eyes and ears, VR is naturally immersive. But VR has several barriers in its way. At first glance, the variety of headsets should suit many needs and budgets, and the variety of app stores involved in distribution is more choice. But users are known to prefer to do as much in a browser as possible. Users prefer to download and install as little as possible. For users and content creators alike, the appeal of HTML5 is the fact that rich experiences are just one URL away. This is where WebVR comes in.

WebVR enables immersive and comfortable VR content in your browser, across a multitude of software and hardware.

The NFB recognized this opportunity and considered giving Bear 71 a new life in HTML5 and WebVR. This opportunity wouldn't be without a new challenge, common to many VR projects: How do we achieve beautiful things, at good framerates, in stereo vision, on various platforms including mobile phones?


## Solution

During the start of development in late 2016, WebVR was not yet readily available. The WebVR API is evolving quickly, and the WebVR standard is currently being drafted. But that didn't stop the community from patching together a suitable stopgap: the WebVR polyfill. It provided useable head tracking and stereo rendering via the gyroscope and WebGL. This polyfill, along with Google's cardboard, allowed us to start building and testing content. When Google Pixel and Daydream became available, along with the first real builds of WebVR, our content was ready to take advantage of it. For the purposes of quick development, we still include and use the polyfill where WebVR is not yet available. For instance, we do much of our developing and debugging on chrome 55’s mobile emulator. Also, it was common to develop and debug on whatever was readily available, including but not limited to HTC One M9, iPhone 5S, Samsung Galaxy and of course Google Pixel. The versatility of the polyfill cannot be understated.

Despite the polyfill's utility, some essential WebVR features simply cannot be emulated. It's worth noting that one of the biggest hurdle that VR faces is motion sickness. Motion sickness is tied to, among many things, framerates and fast and accurate head tracking. WebVR has a few essential features like reprojection (link to explanation) and high-speed orientation sensors. That said, maintaining high framerates is still the responsibility of the content creators. Since WebVR requires rendering the scene twice (once for each eye) per frame, optimization is doubly important. Properly optimizing your webGL content is outside the scope of this article, but here are a few key points:
- Reduce your draw calls. A great way of doing this is merging many elements that share a material into just a few.
- Keep your shaders simple. Standard materials and shaders do a great job of optimizing out unused features, but sometimes writing brutally optimized shaders by hand is the best way.
- Keep your draw distance close and use fog effectively
- Texture-based text reads better and renders faster than text geometry
- Be sure your art style is economical to render. It's better to look like Super Mario 64 at 60fps than Mario Galaxy at 6 fps.
- Treat the user as a solipsist: find ways to only simulate the world around the player.
- Look for opportunities to cache results of expensive computations in typed arrays. Memory is often cheaper than processing power.

This is not an exhaustive list, but it does cover most of the optimizations we used to run at good framerates across most devices.

Creating, repurposing  and optimizing our content spanned roughly 12 weeks for a small team of 8 merry contributors. The effort was both intense and painless. Bear 71 VR has already made limited appearances at 2 film festivals, with positive feedback. For those of you not able to find it in the festival circuit, WebVR can bring the experience to you in the comfort of your browser. If you’re considering a new creative project, remember: the Web is a delivery platform for rich content that we shouldn’t take for granted. VR is here to transport us into new worlds of our invention. And WebVR is here to combine the best of both.
