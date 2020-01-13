project_path: /web/_project.yaml
book_path: /web/progressive-web-apps/_book.yaml
description: Progressive Web Apps work on the desktop, including Chrome OS, Mac, Linux, and Windows.

{# wf_updated_on: 2019-06-04 #}
{# wf_published_on: 2018-05-08 #}
{# wf_blink_components: N/A #}

# Progressive Web Apps on Desktop {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

<div class="clearfix"></div>

<aside class="success">
  Starting in Chrome 73,
  <b>Progressive Web Apps are now supported on all desktop
  platforms</b>, including Chrome OS, Linux, Mac, and Windows.
</aside>

<div class="clearfix"></div>

Desktop progressive web apps can be 'installed' on the user's device much like
native apps. They're **fast**. Feel **integrated** because they launched in
the same way as other apps, and run in an app window, without an address bar
or tabs. They're **reliable** because service workers can cache all of the
assets they need to run. And they create an **engaging** experience for users.

<div class="clearfix"></div>

## Why build Desktop Progressive Web Apps? {: #why }

![Device usage by time](/web/progressive-web-apps/images/device-usage.png){: .attempt-right }

Mobile has driven a lot of the evolution of Progressive Web Apps. But while
the growth of mobile has been so strong, desktop usage is still growing.
Mobile phone use peaks in the morning and evening, and tablet also has
significantly higher use in the evening.  Desktop usage is more evenly
distributed throughout the day than mobile usage. It has significant use
during the day when most people are at work and at their desks.

<div class="clearfix"></div>

![Spotify's desktop progressive web app](/web/progressive-web-apps/images/spotify-screenshot.jpg){: .attempt-left }

**Desktop Progressive Web Apps run in their own window.** Having that
installed, native feel, is important to users. Desktop Progressive Web Apps
are launched from the same place as other desktop apps, and they run
in an app window, without tabs or an address bar. They look and feel like
other apps on the desktop.

**Desktop Progressive Web Apps are fast and reliable.** By using a service
worker to pre-cache content, your PWA will start consistently fast because it
eliminates any network bottlenecks. Even a user with a high speed connection
will appreciate how fast a PWA consistently starts.

For apps that require a
network connection, a service worker is still valuable. They give you complete
control over the online and offline experience. For example, if the users is
offline, you could show cached data, or provide your own custom offline page.

<div class="clearfix"></div>

## Getting started {: #getting-started }

Getting started isn't any different than what you're already doing for existing
progressive web apps; it's not like this is a whole new class of apps.
All of the work you've done already still applies.
[Service workers](/web/fundamentals/primers/service-workers/) make it works
fast, and reliable; [Web Push and Notifications](/web/fundamentals/push-notifications/)
keep users updated, and it can be ‘installed’ with the
[add to home screen prompt](/web/fundamentals/app-install-banners/). The only
real difference is that instead of running in a browser tab, it's running in
an app window.

<div class="clearfix"></div>

## Design considerations {: #design-considerations }

There are some unique considerations you need to take into account when
building Desktop Progressive Web Apps, things that don’t necessarily apply to
Progressive Web Apps on mobile devices.

### The app window {: #app-window }

With an app window, there are no tabs or address bar, it’s just your app. It’s
optimized to support the needs of apps, with more flexible window organization
and manipulation compared to browser tabs. App windows make it easy to uni-
task with the window in full screen, or multi-task with multiple windows open.
App windows also make it really easy to switch between apps using an app
switcher or a keyboard shortcut such as alt-tab.

![App window components on Chrome OS](/web/progressive-web-apps/images/app-window-elements.png)

As you’d expect, the app window has the standard title bar icons to minimize,
maximize and close the window. The title bar is also themed based on the
`theme_color` defined in the
[web app manifest](/web/fundamentals/web-app-manifest/). And your app should be
[designed](#responsive-design) to take up the full width of the window.

![App menu](/web/progressive-web-apps/images/app-menu.png){: .attempt-left }

Within the app window, there’s also the app menu (the button with the three
dots), that gives you access to information about the app, makes it easy to
access the URL, print the page, change the page zoom, or open the app in
your browser.

<div class="clearfix"></div>

### Use responsive design {: #responsive-design }

![Full screen app window](/web/progressive-web-apps/images/dpwa-resp-1.png){: .attempt-right }

Apps on the desktop have access to significantly larger screen real-estate.
Don’t just pad your content with extra margin, but use that additional space
by creating new breakpoints for wider screens. Some applications really
benefit from that wider view.

<div class="clearfix"></div>

When thinking about your break-points, think about how users will use your
app and how they may resize it. In a weather app, a large window might show a
7 day forecast, then, as the window gets smaller, instead of shrinking
everything down, it might show a 5 day forecast. As it continues to get
smaller, content might shuffle around, and it's been optimized for the
smaller display.

![7 day forecast in menu](/web/progressive-web-apps/images/dpwa-resp-2.png){: .attempt-left }
![5 day forecast in menu](/web/progressive-web-apps/images/dpwa-resp-3.png){: .attempt-right }

<div class="clearfix"></div>

![Full screen app window](/web/progressive-web-apps/images/dpwa-resp-4.png){: .attempt-right }

For some apps, a mini-mode might be really helpful. This weather app shows
only the current conditions. A music player might only show me the current
song and the buttons to change to the next song.

You can take this idea of responsive design to the next level to support
convertibles like the Pixelbook or the Surface. When switched to tablet mode,
these devices make the active window full screen, and depending on how the
user holds the device, may be either landscape or portrait.

Focus on getting responsive design right - and that’s what matters here.
Whether the user has resized the window, or the device has done so because
it's switched to tablet mode, responsive design is critical to a successful
desktop progressive web app.

The app window on desktop opens up so many new possibilities. Work with your
designer and take a responsive approach that adds new breakpoints for larger
screens, supports landscape or portrait views, works when fullscreen - or
not, and works nicely with virtual keyboards.

### Prompting the user to install

Installing a desktop progressive web app, known as *Add to Homescreen* on
mobile, works the same.

<img src="/web/updates/images/2018/05/spotify-a2hs.png"
     alt="Spotify's Add to Home Screen button"
     class="attempt-left" style="max-height: 200px;">

If Chrome's [PWA install criteria](/web/fundamentals/app-install-banners/#criteria)
are met, Chrome will fire a `beforeinstallprompt` event that you can use to
prompt the user to installed your PWA. In the event handler,
save the event, and update your user interface to indicate to the user that
they can add your app to the home screen. For example, Spotify's desktop
Progressive Web App, adds an 'Install App' button, just above the users
profile name.

See [Add to Home Screen](/web/fundamentals/app-install-banners/) for more
information about how to handle the event, update the UI and show the install
prompt.

<div class="clearfix"></div>

## What's next?

In addition to supporting additional platforms, we're also looking at:

* **Omnibox badging** - An icon in the address bar to let users know that your
  PWA can be installed.
* **Keyboard shortcuts** - Adding support for keyboard shortcuts, so you can
  provide your own functionality.
* [**Badging for the launch icon**](/web/updates/2018/12/badging-api) - Let the
  user know about important events that you don’t want to display a full
  notification for.
* **Link capturing** - Opening the installed PWA when the user clicks on a
  link handled by that app.

### Learn more

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="NITk4kXMQDw?t=1678"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Check the 2018 Google I/O talk, **PWAs: building bridges to mobile, desktop,
and native**, it covers everything from Desktop PWAs to, upcoming changes to
add to home screen prompts, and more.

<div class="clearfix"></div>

{% include "web/_shared/helpful.html" %}
