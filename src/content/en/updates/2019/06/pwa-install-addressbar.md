project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Progressive Web Apps are easy to install with a new install button in Chrome’s address bar (omnibox).

{# wf_published_on: 2019-06-12 #}
{# wf_updated_on: 2019-06-12 #}
{# wf_featured_image: /web/updates/images/2019/06/pwa-omnibox-install.jpg #}
{# wf_tags: chrome76,desktop,install,addtohomescreen,progressive-web-apps #}
{# wf_featured_snippet: In Chrome 76, we're making it easier for users to install Progressive Web Apps on the desktop by adding an install button to the address bar. If a site meets the Progressive Web App installability criteria, Chrome will automatically show an install icon in the address bar, making it easy for users to install your PWA. #}
{# wf_blink_components: Platform>Apps>AppLauncher>Install #}

# Address Bar Install for Progressive Web Apps on the Desktop {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

On desktop, there's typically no indication to a user that a Progressive Web
App is installable, and if it is, the install flow is hidden within the three
dot menu.

<video loop autoplay muted class="attempt-right">
  <source src="/web/updates/videos/2019/06/pwa-install-addressbar.webm" type="video/webm">
  <source src="/web/updates/videos/2019/06/pwa-install-addressbar.mp4" type="video/mp4">
</video>

In Chrome 76 (beta mid-June 2019), we're making it easier for users to install
Progressive Web Apps on the desktop by adding an install button to the address
bar (omnibox). If a site meets the
[Progressive Web App installability criteria][pwa-install-criteria],
Chrome will automatically show an install icon in the address bar. Clicking the
button prompts the user to install the PWA.

Like other install events, you can listen for the [`appinstalled`][appinstalled-event]
event to detect if the user installed your PWA.

<div class="clearfix"></div>

## Adding your own install prompt {: #a2hs }

If your PWA has use cases where it’s helpful for a user to install your app,
for example if you have users who use your app more than once a week, you
should be promoting the installation of your PWA within the web UI of your app.

To add your own custom install button, listen for the
[`beforeinstallprompt`][beforeinstallprompt-event] event. When it’s fired,
save a reference to the event, and update your user interface to let the user
know they can install your Progressive Web App.

## Patterns for promoting the installation of your PWA {: #patterns }

There are three key ways you can promote the installation of your PWA:

* **Automatic browser promotion**, like the address bar install button.
* **Application UI promotion**, where UI elements appear in the application
  interface, such as banners, buttons in the header or navigation menu, etc.
* **Inline promotional patterns** interweave promotions within the site content.

Check out Patterns for [Promoting PWA Installation (mobile)][install-patterns]
for more details. It’s focus is mobile, but many of the patterns are applicable
for desktop, or can be easily modified to work for desktop experiences.

[pwa-install-criteria]: /web/fundamentals/app-install-banners/#criteria
[appinstalled-event]: /web/fundamentals/app-install-banners/#appinstalled
[beforeinstallprompt-event]: /web/fundamentals/app-install-banners/#listen_for_beforeinstallprompt
[install-patterns]: /web/fundamentals/app-install-banners/promoting-install-mobile

## Feedback {: .hide-from-toc }

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
