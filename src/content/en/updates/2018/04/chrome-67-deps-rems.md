project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A round up of the deprecations and removals in Chrome 67 to help you plan. In this version, deprecation of public key pinning, removal of AppCache on unsecure contexts, and more prefix removals. 

{# wf_updated_on: 2018-06-11 #}
{# wf_published_on: 2018-04-27 #}
{# wf_tags: deprecations,removals,chrome67 #}
{# wf_blink_components: Blink>Layout,Blink>SecurityFeature,Blink>SecurityFeature>SecureContexts #}
{# wf_featured_image: /web/updates/images/generic/warning.png #}
{# wf_featured_snippet: A round up of the deprecations and removals in Chrome 67 to help you plan. In this version, deprecation of public key pinning, removal of AppCache on unsecure contexts, and more prefix removals.   #}

{% include "web/updates/_shared/see-all-dep-rem.html" %}

# Deprecations and removals in Chrome 67 {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

## Deprecate HTTP-Based Public Key Pinning

HTTP-Based Public Key Pinning (HPKP) was intended to allow websites to send an
HTTP header that pins one or more of the public keys present in the site's
certificate chain. It has very low adoption, and although it provides security
against certificate mis-issuance, it also creates risks of denial of service and
hostile pinning.

To defend against certificate mis-issuance, web developers should use the
`Expect-CT` header, including its reporting function. `Expect-CT` is safer than HPKP
due to the flexibility it gives site operators to recover from configuration
errors, and due to the built-in support offered by a number of certificate authorities.

We expect to remove this in Chrome 69.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/msg/blink-dev/he9tr7p3rZ8/eNMwKPmUBAAJ)
&#124;
[ChromeStatus](https://www.chromestatus.com/feature/5903385005916160) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=779166)

## Deprecate AppCache on Non-secure Contexts

AppCache over HTTP is deprecated. AppCache is a powerful feature that allows offline and
persistent access to an origin. Allowing AppCache to be used over non-secure contexts
makes it an attack vector for cross-site scripting hacks.  

Removal is expected in Chrome 69.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/ANnafFBhReY/discussion) &#124;
[ChromeStatus](https://www.chromestatus.com/feature/5714236168732672) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=588931)

## Layout

Several `-webkit-` prefixed CSS properties will be removed in this release:

* **`-webkit-box-flex-group`**: This property has virtually zero usage based on
  the UseCounter in stable.
* **Percent (%) values for `-webkit-line-clamp`**: There is interest in finding
  a standards-based solution to the number values use case, but we haven't seen
  demand for the %-based values.
* **`-webkit-box-lines`**: This property was never fully implemented. It was
  originally intended such that a "vertical"/"horizontal" `-webkit-box` could
  have multiple rows/columns.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/-e92az54B4I/discussion) &#124;
[ChromeStatus](https://www.chromestatus.com/feature/5393405823680512) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=818691)

{% include "web/updates/_shared/deprecations-policy.html" %}

{% include "web/_shared/rss-widget-updates.html" %}

{% include "comment-widget.html" %}
