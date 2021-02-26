project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: How we support CSS-in-JS in DevTools and how it is different from regular CSS.

{# wf_updated_on: 2021-02-26 #}
{# wf_published_on: 2021-02-26 #}
{# wf_tags: devtools-blog #}
{# wf_featured_image: /web/updates/images/2021/02/css-in-js/devtools-blog.jpg #}
{# wf_featured_snippet: How we support CSS-in-JS in DevTools and how it is different from regular CSS. #}
{# wf_blink_components: N/A #}

# CSS-in-JS support in DevTools {: .page-title }

{% include "web/_shared/contributors/orkon.html" %}

<<../../_shared/devtools-research.md>>

This article talks about CSS-in-JS support in DevTools that landed a year ago and, in general, what we mean by CSS-in-JS and how it’s different from regular CSS that has been supported by DevTools for a long time.

## What is CSS-in-JS?
The definition of CSS-in-JS is rather vague. In a broad sense, it’s an approach for managing CSS code using JavaScript. For example, it could mean that the CSS content is defined using JavaScript and the final CSS output is generated on the fly by the app. 

In the context of DevTools, CSS-in-JS means that the CSS content is injected into the page using [CSSOM APIs](https://developers.google.com/web/updates/2018/03/cssom). Regular CSS is injected using `<style>` or `<link>` elements, and it has a static source (e.g. a DOM node or a network resource). In contrast, CSS-in-JS often does not have a static source. A special case here is that the content of a `<style>` element can be updated using CSSOM API, causing the source to become out of sync with the actual CSS stylesheet.

If you use any CSS-in-JS library (e.g. [styled-component](https://github.com/styled-components/styled-components), [Emotion](https://emotion.sh/), [JSS](https://cssinjs.org/)),  the library might inject styles using CSSOM APIs under the hood depending on the mode of development and the browser. 

Let’s look at some examples on how you can inject a stylesheet using CSSOM API similar to what CSS-in-JS libraries are doing.

```js
// Insert new rule to an existing CSS stylesheet
const element = document.querySelector('style');
const stylesheet = element.sheet;
stylesheet.replaceSync('.some { color: blue; }');
stylesheet.insertRule('.some { color: green; }'); 
```

You can [create a completely new stylesheet](https://developers.google.com/web/updates/2019/02/constructable-stylesheets) as well:

```js
// Create a completely new stylesheet
const sheet = new CSSStyleSheet();
stylesheet.replaceSync('.some { color: blue; }');
stylesheet.insertRule('.some { color: green; }'); 

// Apply constructed stylesheet to the document
document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
```

## CSS support in DevTools
In DevTools, the most commonly used feature when dealing with CSS is the **Styles** pane. In the **Styles** pane, you can view what rules apply to a particular element and you can edit the rules and see the changes on the page in realtime. 

<video src="/web/updates/images/2021/02/css-in-js/css-edit.mp4" alt="Edit CSS" style="max-width:100%;" autoplay loop muted></video>

Before last year, the support for CSS rules modified using CSSOM APIs was rather limited: **you could only see the applied rules but could not edit them.** The main goal we had last year was to allow editing of CSS-in-JS rules using the Styles pane. Sometimes we also call CSS-in-JS styles [“constructed”](https://developers.google.com/web/updates/2019/02/constructable-stylesheets) to indicate that they were constructed using Web APIs.

Let’s dive into the details of Styles editing works in DevTools.

## Style editing mechanism in DevTools

![Style editing mechanism in DevTools](/web/updates/images/2021/02/css-in-js/mechanism.png)

When you select an element in DevTools, the **Styles** pane is shown. The **Styles** pane issues a CDP command called [CSS.getMatchedStylesForNode](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-getMatchedStylesForNode) to get CSS rules that apply to the element. CDP stands for Chrome DevTools Protocol and it’s an API that allows DevTools frontend to get additional information about the inspected page.

When invoked, `CSS.getMatchedStylesForNode` identifies all the stylesheets in the document and parses them using the browser’s CSS parser. Then it builds an index that associates every CSS rule with a position in the stylesheet source. 

You might ask, why does it need to parse the CSS again? The problem here is that for performance reasons the browser itself is not concerned with the source positions of CSS rules and, therefore, it does not store them. But DevTools needs the source positions to support CSS editing. We don’t want regular Chrome users to pay the performance penalty, but we do want DevTools users to have access to the source positions. This re-parsing approach addresses both use cases with minimal downsides.

Next, the `CSS.getMatchedStylesForNode` implementation asks the browser’s style engine to provide CSS rules that match the given element. And at last, the method associates the rules returned by the style engine with the source code and provides a structured response about CSS rules so that DevTools knows which part of the rule is the selector or properties. It allows DevTools to edit the selector and the properties independently.

Now let’s look at editing. Remember that `CSS.getMatchedStylesForNode` returns source positions for every rule? That’s crucial for editing. When you change a rule, DevTools issues another CDP command that actually updates the page. The command includes the original position of the fragment of the rule that is being updated and the new text that the fragment needs to be updated with.

On the backend, when handling the edit call, DevTools updates the target stylesheet. It also updates the copy of the stylesheet source that it maintains and updates the source positions for the updated rule. In response to the edit call, the DevTools frontend gets back the updated positions for the text fragment that has been just updated.

This explains why editing CSS-in-JS in DevTools didn’t work out of the box: **CSS-in-JS doesn’t have an actual source stored anywhere** and **the CSS rules live in the browser’s memory in CSSOM data structures**.

## How we added support for CSS-in-JS
So, to support editing of CSS-in-JS rules, we decided that the best solution would be to create a source for constructed stylesheets that can be edited using the existing mechanism described above.

The first step is to build the source text. The browser’s style engine stores the CSS rules in the `CSSStyleSheet` class. That class is the one whose instances you can create from JavaScript as discussed previously. The code to build the source text is as follows:

```
String InspectorStyleSheet::CollectStyleSheetRules() {
  StringBuilder builder;
  for (unsigned i = 0; i < page_style_sheet_->length(); i++) {
    builder.Append(page_style_sheet_->item(i)->cssText());
    builder.Append('\n');
  }
  return builder.ToString();
}
```

It iterates over the rules found in a CSSStyleSheet instance and builds a single string out of it. This method is invoked when an instance of InspectorStyleSheet class is created. The InspectorStyleSheet class wraps a CSSStyleSheet instance and extracts additional metadata that is required by DevTools:

```
void InspectorStyleSheet::UpdateText() {
  String text;
  bool success = InspectorStyleSheetText(&text);
  if (!success)
    success = InlineStyleSheetText(&text);
  if (!success)
    success = ResourceStyleSheetText(&text);
  if (!success)
    success = CSSOMStyleSheetText(&text);
  if (success)
    InnerSetText(text, false);
}
```

In this snippet, we see `CSSOMStyleSheetText` that calls `CollectStyleSheetRules` internally. `CSSOMStyleSheetText` is invoked if the stylesheet is not inline or a resource stylesheet. Basically, these two snippets already allow basic editing of the stylesheets that are created using the `new CSSStyleSheet()` constructor.

A special case is the stylesheets associated with a `<style>` tag that have been mutated using the CSSOM API. In this case, the stylesheet contains the source text and additional rules that are not present in the source. To handle this case, we introduce a method to merge those additional rules into the source text. Here, the order matters because CSS rules can be inserted in the middle of the original source text. For example, imagine that the original `<style>` element contained the following text:

```
/* comment */
.rule1 {}
.rule3 {}
```

Then the page inserted some new rules using the JS API producing the following order of rules:
.rule0, .rule1, .rule2, .rule3, .rule4. The resulting source text after the merge operation should be as follows:

```
.rule0 {}
/* comment */
.rule1 {}
.rule2 {}
.rule3 {}
.rule4 {}
```

The preservation of the original comments and indentation is important for the editing process because the source text positions of rules have to be precise.

Another aspect that is special for CSS-in-JS stylesheets is that *they can be changed by the page at any time*. If the actual CSSOM rules would go out of sync with the text version, the editing would not work. For this we introduced a so-called **probe**, that allows the browser to notify the backend part of DevTools when a stylesheet is being mutated. Mutated stylesheets are then synchronized during the next call to CSS.getMatchedStylesForNode.

With all these pieces in place, CSS-in-JS editing already works but we wanted to improve the UI to indicate if a stylesheet was constructed. We have added a new attribute called `isConstructed` to CDP’s [CSS.CSSStyleSheetHeader](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#type-CSSStyleSheetHeader) that the frontend makes use of to properly display the source of a CSS rule:

![Constructable stylesheet](/web/updates/images/2021/02/css-in-js/constructable.png)

## Conclusions
To recap our story here, we went through the relevant use cases related to CSS-in-JS that DevTools didn’t support and walked through the solution to support those use cases. The interesting part of this implementation is that we were able to leverage existing functionality by making CSSOM CSS rules have a regular source text, avoiding the need to completely re-architect style editing in DevTools.

For more background, check out [our design proposal](https://goo.gle/devtools-css-in-js) or the Chromium [tracking bug](https://bugs.chromium.org/p/chromium/issues/detail?id=946975) which references all related patches.


<<../../_shared/devtools-feedback.md>>

<<../../_shared/discover-devtools-blog.md>>

{% include "web/_shared/rss-widget-updates.html" %}