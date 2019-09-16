project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A new layout engine for Chromium

{# wf_published_on: 2019-06-06 #}
{# wf_updated_on: 2019-09-09 #}
{# wf_featured_image: /web/updates/images/2019/06/layoutNG-header.jpg #}
{# wf_tags: layout,performance,chrome76,layoutng #}
{# wf_featured_snippet: LayoutNG is a new layout engine for Chromium that has been designed for the needs of modern scalable web applications. It improves performance isolation, better supports scripts other than Latin, and fixes many float, margin, and web compatibility issues. #}
{# wf_blink_components: N/A #}

# LayoutNG {: .page-title }

{% include "web/_shared/contributors/emilaeklund.html" %}

Scheduled to be released in Chrome 76, LayoutNG is a new layout engine exiting a 
multi-year effort. There are several exciting immediate improvements, 
and additional performance gains and advanced layout features will be coming.

## What's new?

1. Improves performance isolation.
1. **Better support** for scripts other than Latin.
1. **Fixes** many issues around floats and margins.
1. **Fixes** a large number of web compatibility issues.

Please note that LayoutNG will be **launched in stages**. In Chrome 76, LayoutNG 
is used for inline and block layout. Other layout primitives 
(such as table, flexbox, grid, and block fragmentation) will be replaced in subsequent releases.

### Developer visible changes

Although the user visible impact should be minimal, LayoutNG changes some behavior 
in very subtle ways, fixes hundreds of tests, and improves compatibility 
with other browsers. Despite our best efforts, it is likely that this 
will cause some sites and applications to render or behave slightly differently.

The performance characteristics are also quite different; although performance on 
a whole is similar or slightly better than before, certain use 
cases are likely to see performance improvements, while others are expected to 
regress somewhat, at least short-term.

## Floats

LayoutNG reimplements support for floating elements (`float: left;` and `float: right;`) 
fixing a number of correctness issues around placement 
of floats in relation to other content.

#### Superimposed content

The legacy float implementation didn’t correctly account for margins when placing 
content around a floating element, resulting in the content 
partially or fully overlapping the float itself. The most common manifestation of 
this bug appears when an image is positioned beside a paragraph 
where the avoidance logic fails to account for the height of a line. 
(See [Chromium bug #861540](https://crbug.com/861540).)

<figure class="attempt-left" style="text-align:center;">
  <img loading="lazy" 
    src="/web/updates/images/2019/06/legacy_float_margin.png" 
    alt="top text line shown overlaying floated image"
  >
  <figcaption>
    <small>Fig 1a, Legacy layout engine</small><br>
    Text overlaps the floating image to the right
  </figcaption>
</figure>
<figure class="attempt-right" style="text-align:center;">
  <img loading="lazy" 
    src="/web/updates/images/2019/06/ng_float_margin.png" 
    alt="proper text on left and floated image on right"
  >
  <figcaption>
    <small>Fig 1b, LayoutNG</small><br>
    Text is positioned beside the floating image to the right
  </figcaption>
</figure>
<div class="clearfix"></div>

The same problem may occur within a single line. The example below shows 
a block element with a negative margin following a floating element 
([#895962](https://crbug.com/895962)). The text should not overlap with the float.

<figure class="attempt-left" style="text-align:center;">
  <img loading="lazy" 
    src="/web/updates/images/2019/06/legacy_float_overlap.png" 
    alt="text line shown overlaying an orange box"
  >
  <figcaption>
    <small>Fig 2a, Legacy layout engine</small><br>
    Text overlaps the floating orange element
  </figcaption>
</figure>
<figure class="attempt-right" style="text-align:center;">
  <img loading="lazy" 
    src="/web/updates/images/2019/06/ng_float_overlap.png" 
    alt="proper text on right of orange box"
  >
  <figcaption>
    <small>Fig 2b, LayoutNG</small><br>
    Text is positioned beside the floating orange element
  </figcaption>
</figure>
<div class="clearfix"></div>

#### Formatting context positioning

When an element forming a block formatting context is sized next to floats, 
the legacy layout engine would try to size the block a fixed number 
of times before giving up. This approach led to unpredictable and unstable 
behavior and didn't match other implementations. In LayoutNG all 
floats are taken into account when sizing the block. 
(See [Chromium bug #548033](https://crbug.com/548033).)

Absolute and fixed positioning are now more compliant with W3C specifications 
and better match the behavior in other browsers. The differences 
between the two are most visible in two cases:

- **Multi-line inline containing blocks** <br>If an absolutely positioned 
containing block spanned multiple lines, the legacy engine might 
incorrectly use only a subset of the lines to compute the containing block bounds.
- **Vertical writing modes** <br>The legacy engine had many problems placing 
out-of-flow elements in the default position in vertical writing modes. 
See the next section for more details about improved writing mode support.

## Right-to-left (RTL) languages and vertical writing modes

LayoutNG was designed from the ground up to support vertical writing modes 
and RTL languages, including bidirectional content.

### Bidirectional text

LayoutNG supports the most up-to-date bidirectional algorithm defined by 
[The Unicode Standard](https://unicode.org/standard/standard.html). 
Not only does this update fix various rendering errors, but it also includes 
missing features such as paired bracket support 
(See [Chromium bug #302469](https://crbug.com/302469).)

#### Orthogonal flows

LayoutNG improves the accuracy of vertical flow layout, including, for example, 
placement of absolutely positioned objects and sizing of orthogonal 
flow boxes (especially when percent is used). Of the 1,258 tests in the 
W3C test suites, **103 tests that failed in the old layout engine pass in LayoutNG.**

#### Intrinsic sizing

Intrinsic sizes are now calculated correctly when a block contains children 
in an orthogonal writing mode.

### Text layout & line breaking

The legacy Chromium layout engine laid out text element-by-element and line-by-line. 
This approach worked well in most cases but required a lot of extra
complexity to support scripts and achieve good performance. It was also 
prone to measurement inconsistencies, which led to subtle differences 
in the sizing of size-to-content containers and their content or unnecessary line breaks.

In LayoutNG, text is laid out at the paragraph level and then split into lines. 
This allows for better performance, higher quality text rendering, 
and more consistent line breaking. The most notable differences are detailed below.

#### Joining across element boundaries

In some scripts, certain characters can be visually joined when they're adjacent. 
Check out this example from Arabic:

In LayoutNG, joining now works even if the characters are in different elements. 
Joins will even be preserved when different styling is applied.
(See [Chromium bug #6122](https://crbug.com/6122).)

> A **grapheme** is the smallest unit of a language's writing system. For example, 
in English and other languages that use the Latin alphabet, each letter is a grapheme.

The images below show the rendering of the following HTML in the legacy 
layout engine and LayoutNG, respectively:

```html
<div>&#1606;&#1587;&#1602;</div>
<div>&#1606;&#1587;<span>&#1602;</span></div>
```

<figure class="attempt-left" style="text-align:center;">
  <img loading="lazy" 
    src="/web/updates/images/2019/06/legacy_shape.png" 
    alt="proper grapheme on left and separated improper rendering on right"
  >
  <figcaption>
    <small>Fig 3a, Legacy layout engine</small><br>
    Note how the form of the second letter changes
  </figcaption>
</figure>
<figure class="attempt-right" style="text-align:center;">
  <img loading="lazy" 
    src="/web/updates/images/2019/06/ng_shape.png" 
    alt="proper combined graphemes shown"
  >
  <figcaption>
    <small>Fig 3b, LayoutNG</small><br>
    The two versions are now identical
  </figcaption>
</figure>
<div class="clearfix"></div>

### Chinese, Japanese, and Korean (CJK) ligatures

Although Chromium already supports ligatures and enables them by default, 
there are some limitations: ligatures involving multiple CJK codepoints 
are not supported in the legacy layout engine due to a rendering optimization. 
LayoutNG removes these restrictions and supports ligatures regardless of script.

The example below shows the rendering of three discretionary ligatures 
using the Adobe SourceHanSansJP font:

<figure class="attempt-left" style="text-align:center;">
  <img loading="lazy" 
    src="/web/updates/images/2019/06/legacy_dlig_jp.png" 
    alt="middle character combination not forming ligature"
  >
  <figcaption>
    <small>Fig 4a, Legacy layout engine</small><br>
    MHz correctly forms a ligature<br>
    but マンション and 10点 do not
  </figcaption>
</figure>
<figure class="attempt-right" style="text-align:center;">
  <img loading="lazy" 
    src="/web/updates/images/2019/06/ng_dlig_jp.png" 
    alt="proper ligatures shown"
  >
  <figcaption>
    <small>Fig 4b, LayoutNG</small><br>
    All three groups form ligatures as expected
  </figcaption>
</figure>
<div class="clearfix"></div>

### Size-to-content elements

For elements that size to content (such as inline blocks), the current layout 
engine computes the size of the block first and then performs 
layout on the content. In some cases, such as when a font kerns aggressively, 
this may result in a mismatch between the size of the content 
and the block. In LayoutNG, this failure mode has been eliminated as the block 
is sized based on the actual content.

The example below shows a yellow block sized to content. It uses the Lato font 
which uses kerning to adjust the spacing between T and -. 
The bounds of the yellow box should match the bounds of the text.

<figure class="attempt-left" style="text-align:center;">
  <img loading="lazy" src="/web/updates/images/2019/06/kern_legacy.png" 
    alt="trailing whitespace shown at the end of the text container">
  <figcaption>
    <small>Fig 5a, Legacy layout engine</small><br>
    Note the trailing whitespace after the last T
  </figcaption>
</figure>
<figure class="attempt-right" style="text-align:center;">
  <img loading="lazy" src="/web/updates/images/2019/06/kern-ng.png" 
    alt="text bounds have no extra space">
  <figcaption>
    <small>Fig 5b, LayoutNG</small><br>
    Note how the left and right edges of the box match the bounds of the text
  </figcaption>
</figure>
<div class="clearfix"></div>

#### Line wrapping

Similar to the problem described above, if the content of a size-to-content 
block is larger (wider) than the block, content can sometimes 
wrap unnecessarily. This is quite rare but sometimes happens for mixed directionality content.

<figure class="attempt-left" style="text-align:center;">
  <img loading="lazy" src="/web/updates/images/2019/06/legacy_ar_wrap.png" 
  alt="premature line break shown causing extra space">
  <figcaption>
    <small>Fig 6a, Legacy layout engine</small><br>
    Note the unnecessary line break and extra space on the right
  </figcaption>
</figure>
<figure class="attempt-right" style="text-align:center;">
  <img loading="lazy" 
    src="/web/updates/images/2019/06/ng_ar_wrap.png" 
    alt="no unnecessary space or line breaks shown"
  >
  <figcaption>
    <small>Fig 6b, LayoutNG</small><br>
    Note how the left and right edges of the box match the bounds of the text
  </figcaption>
</figure>
<div class="clearfix"></div>

## Further information

- [LayoutNG README](https://chromium.googlesource.com/chromium/src/+/master/third_party/blink/renderer/core/layout/ng/README.md)
- [LayoutNG design document](https://docs.google.com/document/d/1uxbDh4uONFQOiGuiumlJBLGgO4KDWB8ZEkp7Rd47fw4/)
- [Master tracking bug](https://crbug.com/591099)

For more detailed information about the specific compatibility issues and bugs 
fixed by LayoutNG, please see the issues linked above 
or search the Chromium bug database for bugs marked 
[Fixed-In-LayoutNG](https://bugs.chromium.org/p/chromium/issues/list?can=1&q=label%3AFixed-In-LayoutNG).

If you suspect that LayoutNG may have caused a website to break, please 
[file a bug report](https://bugs.chromium.org/p/chromium/issues/entry?summary=%5BLayoutNG%5D+Enter+one-line+summary&labels=LayoutNG&components=Blink%3ELayout), 
and we'll investigate.

## Feedback {: .hide-from-toc }

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
