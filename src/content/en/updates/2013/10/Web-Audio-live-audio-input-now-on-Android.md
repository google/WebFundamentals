project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Chrome for Android (v31.0.1650+) has just landed support for audio input via the Web Audio API!

{# wf_updated_on: 2013-10-14 #}
{# wf_published_on: 2013-10-14 #}
{# wf_tags: news,webaudio,input,android,audio,beta #}

# Web Audio live audio input - now on Android! {: .page-title }

{% include "web/_shared/contributors/chriswilson.html" %}


One of the consistent questions I keep fielding over on [Stack Overflow](http://stackoverflow.com/questions/tagged/web-audio) is "why doesn't audio input work?" - to which the answer kept turning out to be "because you're testing on Android, and we don't have it hooked up yet."

Well, I'm happy to announce that the Beta version of Chrome for Android (v31.0.1650+) has support for audio input in Web Audio!  Check out my [Audio Recorder demo](http://webaudiodemos.appspot.com/AudioRecorder/index.html) on an Android device with [Chrome Beta](https://play.google.com/store/apps/details?id=com.chrome.beta).  We're still testing it out with all devices; I've personally tested on a Nexus 4, a Galaxy S4 and a Nexus 7, but if you run into issues on other devices, please file them.

When I saw the support get checked in, I flipped back through some of the audio input demos I've done in the past to find a good demo to show it off.  I quickly found that my Audio Recorder demo functioned well on mobile, but it wasn't really designed for a good user experience on mobile devices.

So, I quickly used the skills I'm teaching in the upcoming [Mobile Web Development course](https://www.udacity.com/course/mobile-web-development--cs256) to whip it into shape - viewport, media queries, and flexbox to the rescue!  Be sure to preregister for the course if you're interested in taking your web development skills to the mobile world, too!


{% include "comment-widget.html" %}
