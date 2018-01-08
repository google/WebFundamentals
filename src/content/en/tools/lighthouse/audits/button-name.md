project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Buttons have an accessible name" Lighthouse audit.

{# wf_updated_on: 2017-05-11 #}
{# wf_published_on: 2017-05-11 #}

# Buttons Have An Accessible Name {: .page-title }

## Why the audit is important {: #why }

Buttons without names are unusable for users who rely on screen readers.
When a button doesn't have a name, screen readers announce "button".

## How to pass the audit {: #how }

Lighthouse flags each element that fails the audit. The fix depends on what
type of element is flagged:

For `<button>` elements and elements with `role="button"`:

* Set the inner text of the element.
* Set the `aria-label` attribute.
* Set the `aria-labelledby` attribute to an element with text that is visible
  to screen readers. In other words, the element you point to should not
  have `display: none` in its CSS or have `aria-hidden="true"` in its HTML.

For `<input type="button">` elements:

* Set the `value` attribute.
* Set the `aria-label` attribute.
* Set the `aria-labelledby` attribute. See the description in the bullet-point
  list above.

For `<input type="submit">` and `<input type="reset">`:

* Set the `value` attribute, or omit it. Browsers assign default values of
  "submit" or "reset" when `value` is omitted.
* Set the `aria-label` attribute.
* Set the `aria-labelledby` attribute. See the description in the bullet-point
  list above.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

This audit is powered by the aXe Accessibility Engine. See [Buttons must have
discernible text][axe].

[axe]: https://dequeuniversity.com/rules/axe/1.1/button-name

{% include "web/tools/lighthouse/audits/_feedback/button-name.html" %}
