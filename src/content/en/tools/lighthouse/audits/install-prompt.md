project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "User Can Be Prompted To Install The Web App" Lighthouse audit.

{# wf_updated_on: 2018-11-30 #}
{# wf_published_on: 2017-06-16 #}
{# wf_blink_components: N/A #}

# User Can Be Prompted To Install The Web App  {: .page-title }

## Overview {: #overview }

The prompt to install a web app lets users add your app to their homescreen.
Users that add apps to homescreens engage those apps more.

For example, shortly after launching this feature, Twitter reported an
average of 250K unique daily users launching their Twitter Lite progressive
web app 4 times a day from the homescreen. See [Increasing engagement with
"Add to Homescreen" prompt and web push notifications][TL] for more on
Twitter's case study.

[TL]: /web/showcase/2017/twitter#increasing_engagement_with_add_to_homescreen_prompt_and_web_push_notifications

## Recommendations {: #recommendations }

{% include "web/fundamentals/app-install-banners/_a2hs-criteria.html" %}


In addition, the scope of the service worker includes the page you audited
and the page specified in the `start_url` property of the web app manifest. See
[add to home screen][WAIB] to learn more.

[WAIB]: /web/fundamentals/app-install-banners

## More information {: #more-info }

[Audit source][src]{:.external}

[src]: https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/audits/installable-manifest.js

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
