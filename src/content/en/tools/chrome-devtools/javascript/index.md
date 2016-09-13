project_path: /web/_project.yaml
book_path: /web/tools/_book.yaml
description: Chrome DevTools includes powerful breakpoint features that help you find and fix logic errors in your JavaScript code.

{# wf_review_required #}
{# wf_updated_on: 2015-04-13 #}
{# wf_published_on: 2015-04-13 #}

# Debug with Breakpoints {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}

Chrome DevTools includes powerful breakpoint features that help you find and fix logic errors in your JavaScript code. Use different breakpoint types to control exactly what conditions can trigger a pause in script execution.

As you develop your web page,
you will want to locate and correct bugs in your JavaScript.
But in an executing script,
the erroneous code will almost certainly be processed
before you can identify it.

Pause running JavaScript at various points
so you can determine its progress or examine its variable values.
Chrome DevTools breakpoints let you pause your code
without having to use brute-force statements
such as `alert("ok so far")` or `alert("x = " + x)`.
