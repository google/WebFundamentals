project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Configured For A Custom Splash Screen" Lighthouse audit.

{# wf_updated_on: 2018-07-23 #}
{# wf_published_on: 2017-06-13 #}
{# wf_blink_components: N/A #}

# Configured For A Custom Splash Screen  {: .page-title }

## Overview {: #overview }

A custom splash screen makes your progressive web app (PWA) feel more like a
native app.

When a user launches your PWA from the homescreen, Android's default behavior
is to display a white screen until the PWA is ready. The user may see a blank,
white screen for up to 200ms. With a custom splash screen, the user sees a
custom background color and your PWA's icon instead.

See [Adding a Splash Screen for Installed Web Apps in Chrome 47][splash]
for more information.

[splash]: /web/updates/2015/10/splashscreen

## Recommendations {: #recommendations }

Chrome for Android automatically shows your custom splash screen so long as
you meet the following requirements in your web app manifest:

* The `name` property is set to the name of your PWA.
* The `background_color` property is set to a valid CSS color value.
* The `icons` array specifies an icon that is at least 512px by 512px.
* The icon exists and is a PNG.

## More information {: #more-info }

Note: See [Audit: icon size coverage][discuss] for a discussion on what icon
sizes should be included in your project. Lighthouse's opinion is that a
single, 512px icon is sufficient, but other members of the Google Web
Developer Relations team have different opinions.

[discuss]: https://github.com/GoogleChrome/lighthouse/issues/291

[Audit source code][src]

[src]: https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/audits/splash-screen.js

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
