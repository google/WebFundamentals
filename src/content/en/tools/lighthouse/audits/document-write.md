project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Avoids document.write()" Lighthouse audit.

{# wf_updated_on: 2017-12-11 #}
{# wf_published_on: 2016-12-01 #}
{# wf_blink_components: N/A #}

# Avoids document.write() {: .page-title }

## Overview {: #overview }

For users on slow connections, such as 2G, 3G, or slow Wi-Fi, external
scripts dynamically injected via `document.write()` can delay the display of
main page content by tens of seconds.

See [Intervening against `document.write()`][blog] to learn more.

[blog]: /web/updates/2016/08/removing-document-write

## Recommendations {: #recommendations }

In your report, Lighthouse lists out every call to `document.write()`.
Review this list, and note any call that dynamically injects a script.
If the script meets the criteria outlined in the introduction to
[Intervening against `document.write()`][blog], Chrome won't execute the
injected script. These are the calls to `document.write()` that you want
to change. See [How do I fix this?][fix] for possible solutions. 

[fix]: /web/updates/2016/08/removing-document-write#how_do_i_fix_this

## More information {: #more-info }

Lighthouse reports every instance of `document.write()` that it encounters.
Note that Chrome's intervention against `document.write()` only applies to
render-blocking, dynamically-injected scripts. Other uses of `document.write()`
may be acceptable.


{% include "web/tools/lighthouse/audits/_feedback/document-write.html" %}
