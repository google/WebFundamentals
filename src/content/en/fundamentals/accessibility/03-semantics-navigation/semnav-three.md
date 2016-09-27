project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Navigating page content with non-heading elements

{# wf_review_required #}
{# wf_updated_on: 2016-02-29 #}
{# wf_published_on: 2016-02-29 #}

# Other Navigation Options {: .page-title }

{% include "_shared/contributors/megginkearney.html" %}
{% include "_shared/contributors/dgash.html" %}



Although pages with good headings help screen reader users navigate, there are other elements they can use to move around a page, including *links*, *form controls*, and *landmarks*.

Readers can use the screen reader's rotor feature (an easy way to isolate and scan a list of page headings) to access a *list of links* on the page. Sometimes, as on a wiki, there are many links, so the reader might search for a term within the links. This limits the hits to links that actually contain the term, rather than every occurrence of the term on the page.

This feature is useful only if the screen reader can find the links and the link text is meaningful. For example, here are some common patterns that make links hard to find.

 - Anchor tags without `href` attributes. Often used in single-page applications, these link targets cause problems for screen readers. You can read more in <a href="http://neugierig.org/software/blog/2014/02/single-page-app-links.html" target="_blank">this article on single-page apps</a>.
 - Buttons that are implemented with links. These cause the screen reader to interpret the content as a link, and the button functionality is lost. For these cases, replace the anchor tag with a real button and style it appropriately.
 - Images used as link content. Sometimes necessary, linked images can be unusable to screen readers. To guarantee that the link is properly exposed to assistive technology, make sure the image has `alt` attribute text.

Poor link text is another problem. Clickable text such as "learn more" or "click here" provides no semantic information about where the link goes. Instead, use descriptive text like "learn more about responsive design" or "see this canvas tutorial" to help screen readers provide meaningful context about links.

The rotor can also retrieve a *form control list*. Using this list, readers can search for specific items and go directly to them.

A common error that screen readers make is pronunciation. For example, a screen reader might pronounce "Udacity" as "oo-dacity", or read a phone number as a large integer, or read capitalized text as though it were an acronym. Interestingly, screen reader users are quite used to this quirk and take it into consideration.

Some developers try to ameliorate this situation by providing screen-reader-only text that is spelled phonetically. Here's a simple rule for phonetic spelling: don't do it; it only makes the problem worse! If, for example, a reader is using a braille display, the word will be spelled incorrectly, leading to more confusion. Screen readers allow words to be spelled aloud, so leave it to the reader to control their experience and decide when this is necessary.

Readers can use the rotor to see a *landmarks list*. This list helps readers find the main content and a set of navigational landmarks provided by HTML landmark elements.

HTML5 introduced some new elements that help define the semantic structure of the page, including `header`, `footer`, `nav`, `article`, `section`, `main`, and `aside`. These elements specifically provide structural clues in the page without forcing any built-in styling (which you should do with CSS anyway). 

Semantic structural elements replace multiple, repetitive `div` blocks, and provide a clearer, more descriptive way to intuitively express page structure for both authors and readers.
