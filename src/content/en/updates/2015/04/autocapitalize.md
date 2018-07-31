project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Another text entry frustration for users is being removed.

{# wf_updated_on: 2018-07-31 #}
{# wf_published_on: 2015-04-15 #}
{# wf_tags: news,autocapitalize,mobile #}
{# wf_blink_components: N/A #}

# Autocapitalize for mobile {: .page-title }

{% include "web/_shared/contributors/paulkinlan.html" %}

This may look like the most unimpressive feature in existence, but I think it is important because everyone dislikes typing on mobile: You hate it, I loathe it. In Chrome for Android (prior to Chrome 43 -  Beta as of April 2015) a developer has little control over how the browser can  help the user enter text. If you are typing on a device today, it might look  like:


Notice everything is in lowercase apart from some values that Android recognised was a name.

Apple introduced an attribute on `HTMLInputElement` and
`HTMLTextAreaElement` called [autocapitalize](https://developer.apple.com/library/safari/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/Attributes.html#//apple_ref/doc/uid/TP40008058-autocapitalize) [in iOS 5](https://developer.apple.com/library/safari/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/Attributes.html#//apple_ref/doc/uid/TP40008058-autocapitalize)
and it allows the page author to hint at how the browser should present the
virtual keyboard for a user to optimize text entry for the user.  In its
simplest form, you could indicate that a text box should automatically
capitalize the first letter of every new sentence.

From Chrome 43, Chrome will support the _autocapitalize_ attribute on both
`HTMLInputElement` and `HTMLTextAreaElement`, which will allow you to control
the autocapitalization behavior of the virtual keyboard and bring it inline
with Safari on iOS.

_autocapitalize_ will only apply to `HTMLInputElement`s that have
the _type_ attribute set to: `type="text"`, `type="search"`, `type="url"`, `type="tel"`,
`type="email"` or `type="password"`. The default is to **not** autocapitalize.

Here's a simple example letting you autocapitalize sentences in a text area:

`<textarea autocapitalize="sentences">`


## What values can autocapitalize take?

The following table shows the different states that an input element can be in:

<table class="">
<thead>
<tr>
<th></th>
<th>State</th>
<th>Keywords</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>&lt;input&gt;</code><br>
<code>&lt;input autocapitalize=off&gt;</code>
</td>
<td>No Capitalization</td>
<td>none [default]</td>
</tr>
<tr>
<td></td>
<td></td>
<td>off</td>
</tr>
<tr>
<td><code>&lt;input autocapitalize=characters&gt;</code></td>
<td>Characters Capitalization</td>
<td>characters</td>
</tr>
<tr>
<td><code>&lt;input autocapitalize=words&gt;</code></td>
<td>Words Capitalization</td>
<td>words</td>
</tr>
<tr>
<td><code>&lt;input autocapitalize=sentences&gt;</code></td>
<td>Sentences Capitalization</td>
<td>sentences</td>
</tr>
</tbody>
</table>


For `HTMLInputElement`, the invalid value default is _Sentences Capitalization_ if the type of the element is type=`text` or type=`search`. Otherwise, it is _No Capitalization_.

*  `<input autocapitalize="simon">` would be a text field with _Sentences Capitalization_  
*  `<input type="email" autocapitalize="simon">` would be a text field with _No Capitalization_.  
*  `<input>` would be a text field with _No Capitalization_.

For `HTMLTextAreaElement`, the invalid value default is _Sentences
Capitalization_. This is a change from the default behavior.

*  `<textarea autocapitalize="terry"></textarea>` would be a text area with _Sentences Capitalization_  
*  `<textarea></textarea>` would be a text area with _Sentence Capitalization_.
*  `<textarea autocapitalize="none"></textarea>` would be a text area with _No Capitalization_.

For `HTMLFormElement` we have decided not to implement the attribute, because we've
found that it is rarely used on pages today, and when it is used, it is mostly
used to disable autocapitalization on the form entirely:

`<form autocapitalize=off><input></form>`

The above is odd, as the default state for `HTMLInputElement` is _No Capitalization_.

## Why are you using this over `inputmode`?

`inputmode` is meant to solve the same type of problem, among other things.
However, it has been lacking browser implementations &mdash; to the best of our
knowledge, only Firefox OS has an implementation and it is prefixed
(x-inputmode) &mdash; but it also has very little usage on the web. On the other hand,
`autocapitalize` is used across millions of pages on hundred of thousands of
websites already.

## When should I use this?

This isn't an exhaustive list of when you should use `autocapitalize`; however
there are a number of places where helping the user enter text provides great value:

* Use `autocapitalization=words` if you are
    * Expecting people's names (note: not all names follow this rule, but the
      majority of western names will capitalize automatically as expected)
    * Company names
    * Addresses
* Use `autocapitalization=characters` if you are expecting:
    * US states
    * UK postal codes
* Use `sentences` for input elements if you are expecting content
  that is entered in normal paragraph form - for example, a blog post.
* Use `none` on TextAreas if you are expecting content that should not be affected - for example, entering code.
* If you don't want hinting, don't add autocapitalize.

## Other interesting links

* [Original implmentation proposal by Mounir Lamouri](https://github.com/mounirlamouri/html-autocapitalize/blob/master/proposal.md)


{% include "comment-widget.html" %}
