project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "User Can Be Prompted To Install The Web App" Lighthouse audit.

{# wf_updated_on: 2017-06-16 #}
{# wf_published_on: 2017-06-16 #}

# User Can Be Prompted To Install The Web App  {: .page-title }

## Why the audit is important {: #why }

The prompt to install a web app lets users add your app to their homescreen.
Users that add apps to homescreens engage those apps more.

For example, shortly after launching this feature, Twitter reported an
average of 250K unique daily users launching their Twitter Lite progressive
web app 4 times a day from the homescreen. See [Increasing engagement with
"Add to Homescreen" prompt and web push notifications][TL] for more on
Twitter's case study.

[TL]: /web/showcase/2017/twitter#increasing_engagement_with_add_to_homescreen_prompt_and_web_push_notifications

## How to pass the audit {: #how }

Google Chrome automatically displays the install prompt once it detects that
a site qualifies as a Progressive Web App. These are Chrome's criteria:

* The site is served over HTTPS. HTTPS is required for
  registering a service worker. See [Uses HTTPS][HTTPS].
* A service worker is registered.
* The scope of the service worker includes the page you audited and the
  page specified in the `start_url` property of the web app manifest.
* A web app manifest exists and meets the following criteria:
    * Has a valid `name` property.
    * Has a valid `short_name` property.
    * Has a valid `start_url` property.
    * Has a valid `display` property and the value is `standalone`,
      `fullscreen`, or `minimal-ui`.
    * Specifies an icon that is at least 192px by 192px.

See [Web App Install Banners][WAIB] to learn more.

[HTTPS]: /web/tools/lighthouse/audits/https
[WAIB]: /web/fundamentals/engage-and-retain/app-install-banners/

{% framebox width="auto" height="auto" enable_widgets="true" %}
<script>
var label = 'Install Prompt / Needs More Info';
var url = 'https://github.com/google/webfundamentals/issues/new?title=[' +
      label + ']';
var feedback = {
  "category": "Lighthouse",
  "choices": [
    {
      "button": {
        "text": "I Need More Information"
      },
      "response": 'Please <a href="' + url + '" target="_blank">open a ' +
          'GitHub issue</a> and tell us how to make this section better.',
      "analytics": {
        "label": label
      }
    }
  ]
};
</script>
{% include "web/_shared/multichoice.html" %}
{% endframebox %}

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

The audit passes if all of the criteria specified in [How to pass the
audit](#how) are met.

[Audit source][src]{:.external}

[src]: https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/audits/webapp-install-banner.js
