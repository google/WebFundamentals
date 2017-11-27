project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Address Bar Matches Brand Colors" Lighthouse audit.

{# wf_updated_on: 2017-09-02 #}
{# wf_published_on: 2017-05-12 #}

# Address Bar Matches Brand Colors  {: .page-title }

## Why the audit is important {: #why }

Theming the browser's address bar to match your brand's colors provides
a more immersive user experience.

## How to pass the audit {: #how }

To ensure that the address bar is always themed to your colors:

1. Add a `theme-color` meta tag to the HTML of every page you want to brand.
1. Add the `theme_color` property to your Web App Manifest.

The `theme-color` meta tag ensures that the address bar is branded when
a user visits your site as a normal webpage. Set `content` to any valid CSS
color value. You need to add this meta tag to every page that you want to
brand.

    <head>
      <meta name="theme-color" content="#317EFB"/>
      ...

See [Support for theme-color in Chrome 39 for Android][theme-color] to
learn more about `theme-color`.

[theme-color]: /web/updates/2014/11/Support-for-theme-color-in-Chrome-39-for-Android

The `theme_color` property in your Web App Manifest ensures that the address
bar is branded when a user launches your progressive web
app from the homescreen. Unlike the `theme-color` meta tag, you only need
to define this once, in the manifest. The browser colors every page of your
app according to the manifest's `theme_color`. Set the property to any valid
CSS color value.

    {
      "theme_color": "#317EFB"
      ...
    }

See [Manifest Exists](manifest-exists#how) for more resources on adding a
manifest to your app.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

The audit passes if Lighthouse finds a `theme-color` meta tag in the page's
HTML and a `theme_color` property in the Web App Manifest. Lighthouse does
not test whether the values are valid CSS color values.

## Feedback {: #feedback }

{% framebox width="auto" height="auto" enable_widgets="true" %}
<script>
var label = 'Address Bar / Helpful';
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
