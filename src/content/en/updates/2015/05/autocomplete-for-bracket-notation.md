project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Did you know you can autocomplete bracket notation in the Sources panel?

{# wf_updated_on: 2015-05-19 #}
{# wf_published_on: 2015-05-14 #}
{# wf_tags: devtools #}
{# wf_featured_image: /web/updates/images/2015-05-20-console-panel-autocomplete-with-properties-bracket-or-dot-notation/console-autocomplete.gif #}

# Autocomplete for bracket notation {: .page-title }

{% include "web/_shared/contributors/umarhansa.html" %}


<img src="/web/updates/images/2015-05-20-console-panel-autocomplete-with-properties-bracket-or-dot-notation/console-autocomplete.gif" alt="Console Panel autocomplete with properties (bracket or dot notation)">

Autocomplete in the Console Panel not only works with regular dot notation (e.g. <code>window.onload</code> → <code>window.onload</code>), but also with square bracket notation e.g. <code>window['onloa</code> → <code>window['onload']</code>.

Even if you have an array, you get autocomplete for the index e.g. <code>arr[0</code> → <code>arr[0]</code>.


