project_path: /web/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Has a "theme-color" meta tag" Lighthouse audit.

{# wf_updated_on: 2017-04-24 #}
{# wf_published_on: 2017-04-24 #}

# Has A Theme Color Meta Tag  {: .page-title }

## Why the audit is important {: #why }

The `<meta name="theme-color">` tag enables you to style elements of the
browser UI to match your brand colors. For example, in Chrome for Android,
`theme-color` controls the toolbar color. See [Support for theme-color in
Chrome 39 for Android][more] for an example.

[more]: /web/updates/2014/11/Support-for-theme-color-in-Chrome-39-for-Android

Note that the [Manifest Contains theme_color][theme_color] audit is similar
to this one. You may be wondering what the difference is between
`<meta name="theme-color">` and the `theme_color` manifest attribute. The
difference is that `<meta name="theme-color">` styles the browser UI even
when a user visits the page as a normal URL, whereas the manifest
`theme_color` attribute only takes effect when a user launches your app
from the homescreen.

[theme_color]: /web/tools/lighthouse/audits/manifest-contains-theme_color

## How to pass the audit {: #how }

Add a `<meta name="theme-color" content="...">` tag to the `<head>` of each
page that you want to style with your brand colors. Set `content` to any
valid CSS color value.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

The audit passes if Lighthouse finds a `<meta>` tag in the `<head>` of the
page that matches the following pattern:

    <meta name="theme-color" content="...">

Lighthouse does *not* check if the value of `content` is a valid CSS color
value.

{% include "web/tools/lighthouse/audits/_feedback/theme-color.html" %}
