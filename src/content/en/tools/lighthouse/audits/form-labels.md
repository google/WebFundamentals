project_path: /web/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Every Form Element Has A Label" Lighthouse audit.

{# wf_updated_on: 2017-01-23 #}
{# wf_published_on: 2017-01-23 #}

# Every Form Element Has A Label  {: .page-title }

## Why the audit is important {: #why }

Labels clarify the purpose of form elements. Although the purpose of each
element may be obvious for sighted users, this is often not the case for
users who rely on screen readers.

## How to pass the audit {: #how }

<<_shared/query.md>>

Associate a label to every form element. There are four ways to do so.

Implicit labels:

    <label>First Name <input type="text"/></label>

Explicit labels:

    <label for="first">First Name <input type="text" id="first"/></label>

`aria-label`:

    <label>First Name <input type="text" aria-label="First Name"/></label>

`aria-labelledby`:

    <label id="name">First Name</label>
    <input type="text" aria-labelledby="name"/>

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

This audit is powered by the aXe Accessibility Engine. See [Form elements must
have labels][axe] for more information.

[axe]: https://dequeuniversity.com/rules/axe/1.1/label
