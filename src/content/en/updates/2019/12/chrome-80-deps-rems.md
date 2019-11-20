project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A round up of the deprecations and removals in Chrome 80 to help you plan.

{# wf_updated_on: 2019-12-19 #}
{# wf_published_on: 2019-12-19 #}
{# wf_tags: deprecations,removals,chrome80 #}
{# wf_blink_components: Blink #}
{# wf_featured_image: /web/updates/images/generic/deps-rems.jpg #}
{# wf_featured_snippet: A round up of the deprecations and removals in Chrome 80 to help you plan. #}

{% include "web/updates/_shared/see-all-dep-rem.html" %}

# Deprecations and removals in Chrome 78 {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

## Cookie updates

The `SameSite` attribute was introduced in Chrome 51 and Firefox 60 to allow
sites to declare whether cookies should be retricted to a same-site (sometimes
called first-party) context, mitigating the risk of Cross-site request forgeries
(CSRF). In Chrome 80, some behaviors of this attribute that allowed backward
compatibility are being removed.

For more regarding the `SameSite` attribute and its possible values, read
[SameSite cookies explained](https://web.dev/samesite-cookies-explained/).

### Disallow defaulting of SameSite attribute to None

The `SameSite` attribute for cookies now defaults to `Lax` meaning your cookies
are only available to other sites from top-level navigations. 

Cookies have valid cross-origin use cases, but if a site owner did not
previously want to allow cross-origin cookie use there was no way to declare
such an intent or enforce it. As originally implemented in Chrome, the
`SameSite` attribute defaulted to `None`, which was essentiall the Web's status
quo. 

[Chrome Platform Status](https://www.chromestatus.com/feature/5088147346030592) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=953306)

### Value 'None' no longer allowed on insecure contexts.

Chrome now requires that when the `SameSite` attribute is set to `None`, that
the `Secure` attribute must also be present. The `Secure` attribute requires
that the attached cookie can only be transmitted over a secure protocal such as
HTTPS.

[Chrome Platform Status](https://www.chromestatus.com/feature/5633521622188032) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=954551)


### TBD

[Intent to Remove]() &#124;
[Chrome Platform Status]() &#124;
[Chromium Bug]()


### TBD

[Intent to Remove]() &#124;
[Chrome Platform Status]() &#124;
[Chromium Bug]()


### TBD

[Intent to Remove]() &#124;
[Chrome Platform Status]() &#124;
[Chromium Bug]()


### TBD

[Intent to Remove]() &#124;
[Chrome Platform Status]() &#124;
[Chromium Bug]()


{% include "web/updates/_shared/deprecations-policy.html" %}

## Feedback {: #feedback .hide-from-toc }

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
