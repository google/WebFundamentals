project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: What's new in Chrome 67 for developers?

{# wf_published_on: 2018-05-29 #}
{# wf_updated_on: 2018-06-08 #}
{# wf_featured_image: /web/updates/images/generic/new-in-chrome.png #}
{# wf_tags: chrome67,new-in-chrome #}
{# wf_featured_snippet: Chrome 67 brings Progressive Web Apps to the desktop. And adds support for BigInts making dealing with big integers way easier. Let’s dive in and see what’s new for developers in Chrome 67! #}
{# wf_blink_components: N/A #}

# New in Chrome 67 {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

<div class="clearfix"></div>

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="UyLI3WlWqLM"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

* Progressive Web Apps are coming to the [desktop](#desktop-pwas).
* And [`BigInt`s](#bigint) make dealing with big integers way easier.

**Note:** Generic Sensors were accidentally included in the original version of this post, but are not yet generally available. They are still discussed in the video. 

And there’s [plenty more](#more)!

I’m Pete LePage. Let’s dive in and see what’s new for developers in Chrome 67!

<div class="clearfix"></div>

Note: Want the full list of changes? Check out the
[Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/66.0.3359.116..67.0.3396.62).


## Desktop PWAs {: #desktop-pwas }

![Spotify's desktop progressive web app](/web/updates/images/2018/05/spotify-screenshot.jpg){: .attempt-left }

Desktop Progressive Web Apps are now supported on Chrome OS 67, and we’ve
already started working on support for Mac and Windows. Once installed,
they’re launched in the same way as other apps, and run in an
[app window](/web/updates/2018/05/dpwa#the_app_window), without an address
bar or tabs. Service workers ensure that they’re fast, and reliably,
the app window experience makes them feel integrated. And they create an
engaging experience for your users.

Getting started isn't any different than what you're already doing today.
**All of the work you've done for your existing Progressive Web App still
applies**, you simply need to consider some
[additional break points](/web/updates/2018/05/dpwa#design).

If your app meets the standard
[PWA criteria](/web/fundamentals/app-install-banners/#criteria), Chrome will
fire the [`beforeinstallprompt`](/web/fundamentals/app-install-banners/#trigger)
event, but it won’t automatically prompt the user. Instead, save the event;
then, add some UI - like an install app button - to your app to tell the user
your app can be installed. Then, when the user clicks the button, call prompt
on the saved event; Chrome will then show the prompt to the user. If they
click add, Chrome will add your PWA to their shelf and launcher.

<div class="clearfix"></div>

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="NITk4kXMQDw?t=1678"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Check out my [Google I/O talk](https://youtu.be/NITk4kXMQDw?t=1678) where
Jenny and I go into detail about the technical and special design
considerations you need to think about when building a desktop progressive
web app.

And, if you want to start playing with this on Mac or Windows - check out
the full [Desktop Progressive Web App post](/web/updates/2018/05/dpwa) for
details on how to enable support with a flag.


<div class="clearfix"></div>

##  `BigInt`s {: #bigint }


`BigInt`s are a new numeric primitive in JavaScript that can represent integers
with arbitrary precision. Large integer IDs and high-accuracy timestamps
can’t be safely represented as `Numbers` in JavaScript, which often leads
to real-world bugs (because of which we often end up representing such
numbers as strings instead).

```javascript
let max = Number.MAX_SAFE_INTEGER;
// → 9_007_199_254_740_991
max = max + 1;
// → 9_007_199_254_740_992 - Yay!
max = max + 1;
// → 9_007_199_254_740_992 - Uh, no?
```

With [`BigInt`s](/web/updates/2018/05/bigint), we can safely store and
perform integer arithmetic without overflowing. Today, dealing with large
integers typically means we have to resort to a library that would emulate
`BigInt`-like functionality.

```javascript
let max = BigInt(Number.MAX_SAFE_INTEGER);
// → 9_007_199_254_740_991n
max = max + 9n;
// → 9_007_199_254_741_000n - Yay!
```

When `BigInt` becomes widely available, we’ll be able to drop these run-time
dependencies in favor of native `BigInts`. Not only is the native implementation
faster, it’ll help to reduce load time, parse time, and compile time because
we won’t have to load those extra libraries.


## And more! {: #more }

These are just a few of the changes in Chrome 67 for developers, of course,
there’s plenty more.

The
[Credential Management API](https://developer.mozilla.org/en-US/docs/Web/API/Credential_Management_API)
has been supported since Chrome 51, and provides a framework for creating,
retrieving and storing credentials. It did this through two credential
types: `PasswordCredential` and `FederatedCredential`. The
[Web Authentication API](https://w3c.github.io/webauthn/) adds a third
credential type, `PublicKeyCredential`, which allows browsers to authenticate
a user with a private/public key pair generated by an authenticator such as
a security key, fingerprint reader, or any other device that can authenticate
a user. Chrome 67 enables the API using U2F/CTAP 1 authenticators over USB
transport on desktop.

Learn more about it in Eiji's
[Enabling Strong Authentication with WebAuthn](/web/updates/2018/05/webauthn)
post.


### Google I/O is a wrap {: #google-io }

If you didn’t make it to I/O, or may you did, but didn’t see all the web
talks, check out the
[Chrome and Web playlist](https://www.youtube.com/playlist?list=PLNYkxOF6rcIC4NQeXpdAy0RbOACI66Hvf)
to get caught up on all the latest from Google I/O!

### New in DevTools

Be sure to check out [New in Chrome DevTools](/web/updates/2018/04/devtools), to
learn what’s new in for DevTools in Chrome 67.

### Subscribe

Then, click the [subscribe](https://goo.gl/6FP1a5) button on our
[YouTube channel](https://www.youtube.com/user/ChromeDevelopers/), and
you’ll get an email notification whenever we launch a new video, or add our
[RSS feed](/web/shows/rss.xml) to your feed reader.


I’m Pete LePage, and as soon as Chrome 68 is released, I’ll be right
here to tell you -- what’s new in Chrome!

{% include "web/_shared/rss-widget-updates.html" %}

{% include "comment-widget.html" %}
