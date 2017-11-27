project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Configured For A Custom Splash Screen" Lighthouse audit.

{# wf_updated_on: 2017-06-13 #}
{# wf_published_on: 2017-06-13 #}

# Configured For A Custom Splash Screen  {: .page-title }

## Why the audit is important {: #why }

A custom splash screen makes your progressive web app (PWA) feel more like a
native app.

When a user launches your PWA from the homescreen, Android's default behavior
is to display a white screen until the PWA is ready. The user may see a blank,
white screen for up to 200ms. With a custom splash screen, the user sees a
custom background color and your PWA's icon instead.

See [Adding a Splash Screen for Installed Web Apps in Chrome 47][splash]
for more information.

[splash]: /web/updates/2015/10/splashscreen

## How to pass the audit {: #how }

Chrome for Android automatically shows your custom splash screen so long as
you meet the following requirements in your web app manifest:

* The `name` property is set to the name of your PWA.
* The `background_color` property is set to a valid CSS color value.
* The `icons` array specifies an icon that is at least 512px by 512px.
* The icon exists and is a PNG.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

The audit passes if all of the requirements specified in [How to pass the
audit](#how) are met.

Note: See [Audit: icon size coverage][discuss] for a discussion on what icon
sizes should be included in your project. Lighthouse's opinion is that a
single, 512px icon is sufficient, but other members of the Google Web
Developer Relations team have different opinions.

[discuss]: https://github.com/GoogleChrome/lighthouse/issues/291

[Audit source code][src]

[src]: https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/audits/splash-screen.js

## Feedback {: #feedback }

{% framebox width="auto" height="auto" enable_widgets="true" %}
<script>
var label = 'Custom Splash Screen / Helpful';
var url = 'https://github.com/google/webfundamentals/issues/new?title=[' +
      label + ']';
var feedback = {
  "category": "Lighthouse",
  "choices": [
    {
      "button": {
        "text": "This Doc Was Helpful"
      },
      "response": "Thanks for the feedback.",
      "analytics": {
        "label": label
      }
    },
    {
      "button": {
        "text": "This Doc Was Not Helpful"
      },
      "response": 'Sorry to hear that. Please <a href="' + url +
          '" target="_blank">open a GitHub issue</a> and tell us how to ' +
          'make it better.',
      "analytics": {
        "label": label,
        "value": 0
      }
    }
  ]
};
</script>
{% include "web/_shared/multichoice.html" %}
{% endframebox %}
