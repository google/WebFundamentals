project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml

{# wf_updated_on: 2012-01-06 #}
{# wf_published_on: 2012-01-06 #}
{# wf_tags: news,video,multimedia #}

# Introducing Video Player Sample {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}


Have you ever wanted a fun and beautiful way to publish videos on your own site like the new [60 Minutes](https://chrome.google.com/webstore/detail/imjhdahelgojehmfmkmdfjcpfbglbfmj) or [RedBull.tv](https://chrome.google.com/webstore/category/home) apps from the Chrome Web Store? I'm excited to announce the release of [The Video Player Sample](http://code.google.com/p/video-player-sample/) web app! The Video Player Sample is an open source video player web app built using the same architecture as the 60 Minutes and RedBull.tv apps. It can be customized, extended, or just used out of the box and populated with your own content.

<figure>
  <img src="/web/updates/images/2012/01/video-player-sample/player-full.png">
  <img src="/web/updates/images/2012/01/video-player-sample/player-shows.png">
</figure>

### How it works

When a user opens the Video Player Sample, they can choose to watch a single video or create a playlist of videos/episodes from a list that they have uploaded and populated to the app. [The Video Player Sample](http://code.google.com/p/video-player-sample/) is configured and information about the videos is stored in JSON files (config.json and data.json respectively), both of which are located in the data directory.

### Key features
* A beautiful video watching experience, including a full screen view
* Ability to subscribe to shows, watch episodes, create play lists
* Support for multiple video formats depending on what the user’s browser supports (including WebM, Ogg, MP4, and even a Flash fallback)
* A [Categories](http://video-player-sample.appspot.com/#/shows) page with an overview of the different shows/categories available in the app
* Notifications of new episodes (when the app is installed via the Chrome Web Store)
* Built in support for sharing to Google+, Twitter and Facebook
* To ensure easy customization, all source files, including the Photoshop PSD’s, are included

### How it's built

The Video Player Sample is written for the open web platform using HTML and JavaScript, broadly following the [Model View Controller](http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) pattern and structure.

* It is built using the open source [Google Closure JavaScript library](http://code.google.com/closure/){: .external }
* Compiled with the [Closure Compiler](http://code.google.com/closure/compiler/){: .external }
* Distributed through the Chrome Web Store to take advantage of notifications

### Browser Support

In addition to working as an app that can be installed through the Chrome Web Store, the Video Player Sample has been tested and works in all of the modern browsers.

###Try it out

You can see a demo of the video player in action in the [demo app](http://video-player-sample.appspot.com/), or by [Adding It To Chrome](https://chrome.google.com/webstore/detail/jhojbofcldbpmilfcnlihpknapnaagce) through the Chrome Web Store. To learn more about how the app works, check out the [documentation](http://docs.video-player-sample.appspot.com/).

You can grab the code from [Google Code](http://code.google.com/p/video-player-sample/).

Enjoy!


{% include "comment-widget.html" %}
