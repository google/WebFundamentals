project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Learn how to effectively navigate the Styles Pane with a few useful keyboard tricks.

{# wf_updated_on: 2018-07-31 #}
{# wf_published_on: 2015-08-23 #}
{# wf_tags: devtools #}
{# wf_featured_image: /web/updates/images/2015-08-21-simple-keyboard-tricks-to-use-in-the-styles-pane/styles-pane-keyboard-tricks.gif #}
{# wf_blink_components: N/A #}

# Simple keyboard tricks to use in the Styles Pane {: .page-title }

{% include "web/_shared/contributors/umarhansa.html" %}


<img src="/web/updates/images/2015-08-21-simple-keyboard-tricks-to-use-in-the-styles-pane/styles-pane-keyboard-tricks.gif" alt="Simple keyboard tricks to use in the Styles Pane">

You can <kbd class="kbd">Tab</kbd> through the significant portions of a CSS Rule. This includes:

<ul>
<li>A selector (e.g. h1)</li>
<li>A property (e.g. color)</li>
<li>A value (e.g. green)</li>
</ul>

Did you know you can also <kbd class="kbd">Shift + Tab</kbd> to cycle backwards?

Tabbing works through <em>multiple</em> rules.

If you start typing out a new property (like <code>back</code>), you might rely on autocompletion to get <code>background</code>, but you actually end up with <code>background-color.</code> Even you're in the next field (the value field), simply hit backspace to highlight the previous field, at which point you can fix it.

While on the subject, you can delete a declaration (the property + value) by hitting backspace in either the property or value field and then hitting enter.


{% include "comment-widget.html" %}
