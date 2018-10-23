project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: The Intl.RelativeTimeFormat API enables localized formatting of relative times without sacrificing performance.

{# wf_updated_on: 2018-10-22 #}
{# wf_published_on: 2018-10-22 #}
{# wf_tags: javascript #}
{# wf_featured_image: /web/updates/images/generic/info.png #}
{# wf_featured_snippet: The `Intl.RelativeTimeFormat` API enables localized formatting of relative times without sacrificing performance. #}
{# wf_blink_components: Blink>JavaScript>Language #}

# The Intl.RelativeTimeFormat API {: .page-title }

{% include "web/_shared/contributors/mathiasbynens.html" %}

Modern web applications often use phrases like “yesterday”, “42 seconds ago”, or “in 3 months”
instead of full dates and timestamps. Such _relative time-formatted values_ have become so common
that several popular libraries implement utility functions that format them in a localized manner.
(Examples include [Moment.js](https://momentjs.com/),
[Globalize](https://github.com/globalizejs/globalize), and [date-fns](https://date-fns.org/docs/).)

One problem with implementing a localized relative time formatter is that you need a list of
customary words or phrases (such as “yesterday” or “last quarter”) for each language you want to
support. [The Unicode CLDR](http://cldr.unicode.org/) provides this data, but to use it in
JavaScript, it has to be embedded and shipped alongside the other library code. This unfortunately
increases the bundle size for such libraries, which negatively impacts load times, parse/compile
cost, and memory consumption.

The brand new `Intl.RelativeTimeFormat` API shifts that burden to the JavaScript engine, which can
ship the locale data and make it directly available to JavaScript developers.
`Intl.RelativeTimeFormat` enables localized formatting of relative times without sacrificing
performance.

## Usage examples

The following example shows how to create a relative time formatter using the English language.

```js
const rtf = new Intl.RelativeTimeFormat('en');

rtf.format(3.14, 'second');
// → 'in 3.14 seconds'

rtf.format(-15, 'minute');
// → '15 minutes ago'

rtf.format(8, 'hour');
// → 'in 8 hours'

rtf.format(-2, 'day');
// → '2 days ago'

rtf.format(3, 'week');
// → 'in 3 weeks'

rtf.format(-5, 'month');
// → '5 months ago'

rtf.format(2, 'quarter');
// → 'in 2 quarters'

rtf.format(-42, 'year');
// → '42 years ago'
```

Note that the argument passed to the `Intl.RelativeTimeFormat` constructor can be either a string
holding [a BCP 47 language tag](https://tools.ietf.org/html/rfc5646) or [an array of such language
tags](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation).

Here’s an example of using a different language (Spanish):

```js
const rtf = new Intl.RelativeTimeFormat('es');

rtf.format(3.14, 'second');
// → 'dentro de 3,14 segundos'

rtf.format(-15, 'minute');
// → 'hace 15 minutos'

rtf.format(8, 'hour');
// → 'dentro de 8 horas'

rtf.format(-2, 'day');
// → 'hace 2 días'

rtf.format(3, 'week');
// → 'dentro de 3 semanas'

rtf.format(-5, 'month');
// → 'hace 5 meses'

rtf.format(2, 'quarter');
// → 'dentro de 2 trimestres'

rtf.format(-42, 'year');
// → 'hace 42 años'
```

Additionally, the `Intl.RelativeTimeFormat` constructor accepts an optional `options` argument,
which gives fine-grained control over the output. To illustrate the flexibility, let’s look at some
more English output based on the default settings:

```js
// Create a relative time formatter for the English language, using the
// default settings (just like before). In this example, the default
// values are explicitly passed in.
const rtf = new Intl.RelativeTimeFormat('en', {
  localeMatcher: 'best fit', // other values: 'lookup'
  style: 'long', // other values: 'short' or 'narrow'
  numeric: 'always', // other values: 'auto'
});

// Now, let’s try some special cases!

rtf.format(-1, 'day');
// → '1 day ago'

rtf.format(0, 'day');
// → 'in 0 days'

rtf.format(1, 'day');
// → 'in 1 day'

rtf.format(-1, 'week');
// → '1 week ago'

rtf.format(0, 'week');
// → 'in 0 weeks'

rtf.format(1, 'week');
// → 'in 1 week'
```

You may have noticed that the above formatter produced the string `'1 day ago'` instead of
`'yesterday'`, and the slightly awkward `'in 0 weeks'` instead of `'this week'`. This happens
because by default, the formatter uses the numeric value in the output.

To change this behavior, set the `numeric` option to `'auto'` (instead of the implicit default of
`'always'`):

```js
// Create a relative time formatter for the English language that does
// not always have to use numeric value in the output.
const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

rtf.format(-1, 'day');
// → 'yesterday'

rtf.format(0, 'day');
// → 'today'

rtf.format(1, 'day');
// → 'tomorrow'

rtf.format(-1, 'week');
// → 'last week'

rtf.format(0, 'week');
// → 'this week'

rtf.format(1, 'week');
// → 'next week'
```

Analogous to other `Intl` classes, `Intl.RelativeTimeFormat` has a `formatToParts` method in
addition to the `format` method. Although `format` covers the most common use case, `formatToParts`
can be helpful if you need access to the individual parts of the generated output:

```js
// Create a relative time formatter for the English language that does
// not always have to use numeric value in the output.
const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

rtf.format(-1, 'day');
// → 'yesterday'

rtf.formatToParts(-1, 'day');
// → [{ type: 'literal', value: 'yesterday' }]

rtf.format(3, 'week');
// → 'in 3 weeks'

rtf.formatToParts(3, 'week');
// → [{ type: 'literal', value: 'in ' },
//    { type: 'integer', value: '3', unit: 'week' },
//    { type: 'literal', value: ' weeks' }]
```

For more information about the remaining options and their behavior, see [the API docs in the
proposal repository](https://github.com/tc39/proposal-intl-relative-time#api).

## Conclusion

`Intl.RelativeTimeFormat` is available by default in V8 v7.1.179 and Chrome 71. As this API becomes
more widely available, you’ll find libraries such as [Moment.js](https://momentjs.com/),
[Globalize](https://github.com/globalizejs/globalize), and [date-fns](https://date-fns.org/docs/)
dropping their dependency on hardcoded CLDR databases in favor of the native relative time
formatting functionality, thereby improving load-time performance, parse- and compile-time
performance, run-time performance, and memory usage.

Questions about this API? Comments about this article? Feel free to ping me on Twitter via
[@mathias](https://twitter.com/mathias)!

{% include "web/_shared/rss-widget-updates.html" %}
