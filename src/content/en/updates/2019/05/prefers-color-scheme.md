project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: The prefers-color-scheme media feature is used to detect if the user has requested the system use a light or dark color theme.

{# wf_updated_on: 2019-05-06 #}
{# wf_published_on: 2019-05-06 #}
{# wf_tags: media-queries, dark-mode #}
{# wf_featured_image: /web/updates/images/2019/05/prefers-color-scheme/moon.svg #}
{# wf_featured_snippet: The prefers-color-scheme media feature is used to detect if the user has requested the system use a light or dark color theme. #}
{# wf_blink_components: Blink>CSS #}

# Hello Darkness, My Old Friend: Dark Theme is Here {: .page-title}

{% include "web/_shared/contributors/thomassteiner.html" %}


## Background

We have gone full circle with dark mode; and in the dawn of personal computing,
dark mode wasn't a deliberate choice, but purely a matter of fact.
Monochrome Cathod-Ray Tube (CRT) computer monitors worked by firing electron beams
on a phosphorescent screen, and as in the early days the phospor these CRTs used was green,
they were oftentimes referred to as ["green screens"](https://commons.wikimedia.org/wiki/File:Schneider_CPC6128_with_green_monitor_GT65,_start_screen.jpg).
Information like text was displayed in green, and the rest of the screen was black.
Color CRTs that became affordable for most people in the eighties display multiple colors
through the use of alternating-intensity red, green, and blue phosphors.
They create white by activating all three phosphors simultaneously.
With the contemporaneous advent of more sophisticated
*What You See Is What You Get* [(WYSIWYG) word processing](https://en.wikipedia.org/wiki/Word_processor),
the idea of making the document resemble a physical sheet of paper became popular,
and this is where dark-on-white as a design trend started.
To the present day, web pages are typically designed with a light background and dark text.
At least since Apple has introduced [Dark Mode in macOS Mojave](https://support.apple.com/en-us/HT208976),
the idea of going back to the roots of light-on-dark is becoming increasingly popular again.

## Related Links

- Resources for the `prefers-color-scheme` media query:
    - [Chrome Platform Status page](https://chromestatus.com/feature/5109758977638400)
    - [Chromium bug](https://crbug.com/889087)
    - [Media Queries Level&nbsp;5 spec](https://drafts.csswg.org/mediaqueries-5/#prefers-color-scheme)
- Resources for the `supported-color-schemes` meta tag and CSS property:
    - [Chrome Platform Status page](https://chromestatus.com/feature/5330651267989504)
    - [Chromium bug](http://crbug.com/925935)
    - [CSS WG GitHub Issue for the meta tag and the CSS property](https://github.com/w3c/csswg-drafts/issues/3299)
    - [HTML WHATWG GitHub Issue for the meta tag](https://github.com/whatwg/html/issues/4504)

## Acknowledgements

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
