project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: What's new in Chrome 70 for developers?

{# wf_published_on: 2018-10-16 #}
{# wf_updated_on: 2018-10-18 #}
{# wf_featured_image: /web/updates/images/generic/new-in-chrome.png #}
{# wf_tags: chrome70,new-in-chrome,progressive-web-apps,desktop,credentials,security,workers #}
{# wf_featured_snippet: Chrome 70 adds support for Desktop Progressive Web Apps on Windows and Linux, support for Public Key Credentials to the Credential Management API, allows you to provide a <code>name</code> to dedicated <code>workers</code> and plenty more. Let’s dive in and see what’s new for developers in Chrome 70! #}
{# wf_blink_components: N/A #}

# New in Chrome 70 {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

<div class="clearfix"></div>

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="msA284Q6yZU"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

In Chrome 70, we've added support for:

* [Desktop Progressive Web Apps on Windows & Linux](#dpwa-windows).
* The credential management API adds support for [Public Key Credentials](#pki).
* And you can now [name workers](#named-workers)!

And there’s [plenty more](#more)!

I’m [Pete LePage](https://mobile.twitter.com/petele). Let’s dive in and see
what’s new for developers in Chrome 70!

<div class="clearfix"></div>

Note: Want the full list of changes? Check out the
[Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/69.0.3497.81..70.0.3538.66).


## Desktop Progressive Web Apps on Windows & Linux {: #dpwa-windows }

**Users can now install Desktop Progressive Web Apps on Windows & Linux!**

<a href="https://storage.googleapis.com/webfundamentals-assets/updates/2018/10/spotify-on-windows.mp4">
  <video class="attempt-right screenshot" autoplay muted loop>
    <source type="video/webm"
      src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/10/spotify-on-windows.webm">
    <source type="video/mp4"
      src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/10/spotify-on-windows.mp4">
  </video>
</a>

Once installed, they’re launched from the Start menu, and run like all other
installed apps, without an address bar or tabs.
[Service workers](/web/fundamentals/primers/service-workers/) ensure that
they’re fast, and reliably, the [app window](/web/updates/2018/05/dpwa#the_app_window)
experience makes them feel like any other installed app.

Getting started isn't any different than what you're already doing today.
All of the work you've done for your existing Progressive Web App still applies!
If your app meets the standard [PWA criteria](/web/fundamentals/app-install-banners/#criteria),
Chrome will fire the
[`beforeinstallprompt`](/web/fundamentals/app-install-banners/#listen_for_beforeinstallprompt)
event. Save the event; then,
[add some UI](/web/fundamentals/app-install-banners/#notify_the_user_your_app_can_be_installed)
(like an install app button) to tell the user your app can be installed. Then,
when the user clicks the button, call
[`prompt()`](/web/fundamentals/app-install-banners/#show_the_prompt) on the
saved event; Chrome will then show the prompt to the user. If they click add,
Chrome will add your PWA to their start menu and desktop.

See my [Desktop PWAs](/web/progressive-web-apps/desktop) post for complete details.

<div class="clearfix"></div>

Note: Mac support is expected to arrive in Chrome 72. Linux support was added
in Chrome 70, but was accidentally left out of the original version of this post.

<div class="clearfix"></div>

## Credential Management API: Public Key Credentials {: #pki }

The [Credential Management API](https://developer.mozilla.org/en-US/docs/Web/API/Credential_Management_API)
makes sign in super simple for users. It allows your site to interact with the
browser’s [credential manager](https://developer.mozilla.org/en-US/docs/Web/API/PasswordCredential)
or [federated account services](https://developer.mozilla.org/en-US/docs/Web/API/FederatedCredential)
like Google and Facebook to sign.

<img src="/web/updates/images/2018/10/webauth.png" class="attempt-right">

Chrome 70 adds support for a third type of credential:
[**Public Key Credential**](https://developer.mozilla.org/en-US/docs/Web/API/PublicKeyCredential),
which allows web applications to create and use, strong, cryptographically
attested, and application-scoped credentials to strongly authenticate users.

I'm pretty excited about it because it allows sites to use my fingerprint
for 2-factor authentication. But, it also adds support for additional types
of security keys and better security on the web.

<div class="clearfix"></div>

Check the [Credential Management API docs](/web/fundamentals/security/credential-management/)
for more details or give it a try with the
[WebAuthn Demo](https://webauthndemo.appspot.com/) and how you can get started!

<div class="clearfix"></div>

## Named `workers` {: #named-workers }

[Workers](https://developer.mozilla.org/en-US/docs/Web/API/Worker) are an easy
way to move JavaScript off the main thread and into the background. This is
critical to keeping your site interactive, because it means that the main
thread won’t lock up when it’s running an expensive or complex JavaScript
computation.

<style>
.worker-example {
  display: flex;
}
.worker-example p {
  white-space: nowrap;
}
.worker-example > div {
  padding: 0 0.5em 0.5em;
}
.no-worker {
  background-color: #FFEBEE;
}
.with-worker {
  background-color: #ECEFF1;
}

.spin-fast {
  animation: spin-smooth 1s linear infinite;
}
.spin-slow {
  animation: spin-smooth 2s linear infinite;
}
.spin-janky {
  animation: spin-janky 4s linear infinite;
}
@keyframes spin-smooth {
 100% { transform:rotate(360deg); }
}
@keyframes spin-janky {
 10% { transform:rotate(36deg); }
 20% { transform:rotate(72deg); }
 25% { transform:rotate(72deg); }
 30% { transform:rotate(108deg); }
 40% { transform:rotate(144deg); }
 50% { transform:rotate(180deg); }
 58% { transform:rotate(180deg); }
 60% { transform:rotate(216deg); }
 70% { transform:rotate(216deg); }
 80% { transform:rotate(288deg); }
 90% { transform:rotate(324deg); }
 100% { transform:rotate(360deg); }
}
</style>

<div class="worker-example">
  <div class="no-worker">
    <p><b>Without WebWorkers</b></p>
    <figure>
      <img class="spin-janky"
           src="https://www.gstatic.com/images/icons/material/system/2x/settings_black_48dp.png">
      <figcaption>
        <b>Main thread</b><br>
        Lots of heavy JavaScript running, resulting in slow, janky experience.
      </figcaption>
    </figure>
  </div>
  <div class="with-worker">
    <p><b>With WebWorkers</b></p>
    <div style="display:flex">
      <figure>
        <img class="spin-fast"
             src="https://www.gstatic.com/images/icons/material/system/2x/settings_black_48dp.png">
        <figcaption>
          <b>Main thread</b><br>
          No heavy JavaScript running, resulting in fast, smooth experience.
        </figcaption>
      </figure>
      <figure>
        <img class="spin-slow"
             src="https://www.gstatic.com/images/icons/material/system/2x/settings_black_48dp.png">
        <figcaption>
          <b>WebWorker</b><br>
          Lots of heavy JavaScript running, doesn't affect main thread.
        </figcaption>
      </figure>
    </div>
  </div>
</div>

<div class="clearfix"></div>

In Chrome 70, workers now have a
[`name` attribute](https://www.chromestatus.com/feature/4594144336936960),
which is specified by an optional argument on the constructor.

<pre class="prettyprint lang-js">
const url = '/scripts/my-worker.js';

const wNYC = <strong>new Worker(url, {name: 'NewYork'});</strong>

<atrong>const oSF = {name: 'SanFrancisco'};</atrong>
const wSF = new Worker(url, <strong>oSF</strong>);
</pre>

This lets you distinguish dedicated workers by `name` when you have multiple
workers with the same URL. You can also print the name in the DevTools
console, making it much easier to know which worker you’re debugging!

Naming workers is already available in Firefox, Edge, and Safari. See the
[discussion on GitHub](https://github.com/whatwg/html/issues/2477) for more
details.

<div class="clearfix"></div>

## And more! {: #more }

These are just a few of the changes in Chrome 70 for developers, of course,
there’s plenty more.

* [Web Bluetooth](/web/updates/2015/07/interact-with-ble-devices-on-the-web)
  is [now available in Windows 10](https://www.chromestatus.com/feature/5264933985976320),
  and allows your site to communicate with nearby user-selected Bluetooth
  devices in a secure and privacy-preserving way.
* Chrome can
  [send intervention and deprecation messages](https://www.chromestatus.com/feature/5544632075157504)
  to your servers using the `Report-To HTTP` Response header field or surface
  them in the `ReportingObserver` interface.
* There are a number of important deprecations you should know about,
  check the
  [Deprecations and removals in Chrome 70](/web/updates/2018/09/chrome-70-deps-rems)
  post for more details.
* And be sure to check out the latest
  [What's new in DevTools](/web/updates/2018/08/devtools) post to learn what's
  new in Chrome DevTools.


<div class="clearfix"></div>

### Subscribe

Want to stay up to date with our videos, then [subscribe](https://goo.gl/6FP1a5)
to our [Chrome Developers YouTube channel](https://www.youtube.com/user/ChromeDevelopers/),
and you’ll get an email notification whenever we launch a new video, or add our
[RSS feed](/web/shows/rss.xml) to your feed reader.


I’m Pete LePage, and as soon as Chrome 71 is released, I’ll be right
here to tell you -- what’s new in Chrome!

## Feedback {: .hide-from-toc }

{% include "web/_shared/helpful.html" %}

<div class="clearfix"></div>

{% include "web/_shared/rss-widget-updates.html" %}

