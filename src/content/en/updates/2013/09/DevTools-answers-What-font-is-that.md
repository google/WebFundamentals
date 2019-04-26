project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Ever wondered which font is actually being used to render text? Wonder no more as Chrome DevTools reveals all!

{# wf_updated_on: 2019-03-09 #}
{# wf_published_on: 2013-09-27 #}
{# wf_tags: news,devtools,webfonts,tools #}
{# wf_blink_components: N/A #}

# DevTools answers: What font is that?  {: .page-title }

{% include "web/_shared/contributors/paulirish.html" %}


Chrome DevTools can [now](https://bugs.chromium.org/p/chromium/issues/detail?id=135489) tell you **exactly what typeface is being used to render text**.

Font stacks are a funny thing, more of a suggestion than a demand. Because the family you suggest may not be present, you're letting each user's browser handle the fall-through case, pulling something that will work and using that.

    font-family: Baskerville, "Baskerville Old Face", "Hoefler Text", Garamond, "Times New Roman", serif;

As a developer, you want to know **what font is *actually* being used**.  Here's how it works:
![](/web/updates/images/2013/09/devtools/DVsqB4V.png)


Under **Computed Styles**, you'll now see a summary of the typeface(s) used for that element. There's a few things to note here:

* DevTools is reporting the **actual typeface** used by Chrome's text rendering layer. No more guessing which font `serif` or `sans-serif` is actually resolving to.
* Is my webfont working? Sometimes it's hard to tell if you're seeing the webfont or the fallback system font. Now you can **verify that the webfont is being applied**. In the above example, we're pulling down _Lobster_ as a webfont for the `::first-line` style.
* **Fall-through fonts in your stack are easy to spot**. Above, we had a typo spelling _Merriweather_ and so it wasn't used, falling through to Lobster.
* **Is that Arial or Helvetica?** Ask a designer or… ask DevTools. ;)
* Works great with Google Webfonts, Typekit, local fonts, @font-face typefaces, unicode glyphs, and all other interesting font sources.

Enjoy and please leave a comment if you have any feedback.


