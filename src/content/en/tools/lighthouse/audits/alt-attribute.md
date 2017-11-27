project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Every Image Element Has An alt Attribute" Lighthouse audit.

{# wf_updated_on: 2017-07-27 #}
{# wf_published_on: 2017-01-23 #}

# Every Image Element Has An alt Attribute  {: .page-title }

## Why the audit is important {: #why }

Informative images should have an `alt` attribute that includes a text
description of the contents of that image. Screen readers enable
visually-impaired users to use your site by converting text content to forms
they can use, such as synthesized speech or Braille. Screen readers can't
convert images. So if your images include important information, that
information is not accessible to visually-impaired users.

See [Text Alternatives for Images](/web/fundamentals/accessibility/semantics-builtin/text-alternatives-for-images) for more information.

## How to pass the audit {: #how }

<<_shared/query.md>>

Add an `alt` attribute to `img` elements. The value of the `alt` attribute
should be text describing the content of the image. If an image is _not_
informative, if it's purely a decorative element, you can tell a screen reader
to ignore it using an empty `alt=""` attribute.
You can run the following command in the DevTools Console to find the elements:

    $$('img:not([alt])');

Note: `$$()` is equivalent to `document.querySelectorAll()`.

DevTools returns an array. Expand the array and then hover over each `img`
to highlight it in the viewport.

When writing a description for each image, keep in mind that this is all the
information that visually-impaired users have to go by, so try to make it as
useful as possible for them. You don't need to explain every detail of the
image, instead consider the context in which the image is being used, and try
to convey the gist of the scene as efficiently as possible.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

This audit is powered by the aXe Accessibility Engine. See [Images must have
alternate text][axe] for more information.

[axe]: https://dequeuniversity.com/rules/axe/1.1/image-alt


{% include "web/tools/lighthouse/audits/_feedback/alt-attribute.html" %}
