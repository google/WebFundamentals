---
layout: updates/post
title: "CSS Variables: Why Should You Care?"
description: "CSS variables, more accurately known as CSS custom properties, are landing in
Chrome 49. They can be useful for reducing repetition in CSS, and also for
powerful runtime effects like theme switching and potentially
extending/polyfilling future CSS features."
published_on: 2016-02-01
updated_on: 2016-02-01
authors:
  - robdodson
tags:
  - css
  - chrome49
featured_image: /web/updates/images/2016/02/css-variables-why-should-you-care/custom-prop.png
---



<p class="intro">CSS variables, more accurately known as CSS custom properties,
are landing in Chrome 49. They can be useful for reducing repetition in CSS, and
also for powerful runtime effects like theme switching and potentially
extending/polyfilling future CSS features.</p>


## CSS Clutter

When designing an application it’s a common practice to set aside a set of brand
colors that will be reused to keep the look of the app consistent.
Unfortunately, repeating these color values over and over again in your CSS is
not only a chore, but also error prone. If, at some point, one of the colors
needs to be changed, you could throw caution to the wind and “find-and-replace”
all the things, but on a large enough project this could easily get dangerous.

In recent times many developers have turned to CSS preprocessors like SASS or
LESS which solve this problem through the use of preprocessor variables. While
these tools have boosted developer productivity immensely, the variables that
they use suffer from a major drawback, which is that they’re static and can’t be
changed at runtime. Adding the ability to change variables at runtime not only
opens the door to things like dynamic application theming, but also has major
ramifications for responsive design and the potential to polyfill future CSS
features. With the release of Chrome 49, these abilities are now available in
the form of CSS custom properties.

## Custom properties in a nutshell

Custom properties add two new features to our CSS toolbox:

- The ability for an author to assign arbitrary values to a property with an
author-chosen name.
- The `var()` function, which allows an author to use these values in other
properties.

Here’s a quick example to demonstrate

{% highlight css %}
:root {
  --main-color: #06c;
}

#foo h1 {
  color: var(--main-color);
}
{% endhighlight %}

`--main-color` is an author defined custom property with a value of #06c. Note
that all custom properties begin with two dashes.

The `var()` function retrieves and replaces itself with the custom property
value, resulting in `color: #06c;` So long as the custom property is defined
somewhere in your stylesheet it should be available to the `var` function.

The syntax may look a little strange at first. Many developers ask, "Why not
just use `$foo` for variable names?" The approach was specifically chosen to be
as flexible as possible and potentially allow for `$foo` macros in the future.
For the backstory you can read [this post](http://www.xanthir.com/blog/b4KT0)
from one of the spec authors, Tab Atkins.

## Custom property syntax

The syntax for a custom property is straightforward.

{% highlight css %}
--header-color: #06c;
{% endhighlight %}

Note that custom properties are case sensitive, so `--header-color` and
`--Header-Color` are different custom properties. While they may seem simple at
face value, the allowed syntax for custom properties is actually quite
permissive. For example, the following is a valid custom property:

{% highlight css %}
--foo: if(x > 5) this.width = 10;
{% endhighlight %}

While this would not be useful as a variable, as it would be invalid in any
normal property, it could potentially be read and acted upon with JavaScript at
runtime. This means custom properties have the potential to unlock all kinds of
interesting techniques not currently possible with today’s CSS preprocessors. So
if you’re thinking “*yawn* I have SASS so who cares…” then take a second look!
These are not the variables you’re used to working with.

### The cascade

Custom properties follow standard cascade rules, so you can define the same
property at different levels of specificity

{% highlight css %}
:root { --color: blue; }
div { --color: green; }
#alert { --color: red; }
* { color: var(--color); }
{% endhighlight %}

{% highlight html %}
<p>I inherited blue from the root element!</p>
<div>I got green set directly on me!</div>
<div id="alert">
  While I got red set directly on me!
  <p>I’m red too, because of inheritance!</p>
</div>
{% endhighlight %}

This means you can leverage custom properties inside of media queries to aid
with responsive design. One use case might be to expand the margining around
your major sectioning elements as the screen size increases:

{% highlight css %}
:root {
  --gutter: 4px;
}

section {
  margin: var(--gutter);
}

@media (min-width: 600px) {
  :root {
    --gutter: 16px;
  }
}
{% endhighlight %}

It’s important to call out that the above snippet of code is not possible using
today’s CSS preprocessors which are unable to define variables inside of media
queries. Having this ability unlocks a lot of potential!

It’s also possible to have custom properties that derive their value from other
custom properties. This can be extremely useful for theming:

{% highlight css %}
:root {
  --primary-color: red;
  --logo-text: var(--primary-color);
}
{% endhighlight %}

## The var() function
To retrieve and use the value of a custom property you'll need to use the
`var()` function. The syntax for the `var()` function looks like this:

    var(<custom-property-name> [, <declaration-value> ]? )

Where `<custom-property-name>` is the name of an author defined custom property,
like `--foo`, and `<declaration-value>` is a fallback value to be used when the
referenced custom property is invalid. Fallback values can be a comma separated
list, which will be combined into a single value. For example `var(--font-stack,
"Roboto", "Helvetica");` defines a fallback of `"Roboto", "Helvetica"`. Keep in
mind that shorthand values, like those used for margin and padding, are not
comma separated, so an appropriate fallback for padding would look like this.

{% highlight css %}
p {
  padding: var(--pad, 10px 15px 20px);
}
{% endhighlight %}

Using these fallback values, a component author can write defensive styles for
their element:

{% highlight css %}
/* In the component’s style: */
.component .header {
  color: var(--header-color, blue);
}
.component .text {
  color: var(--text-color, black);
}

/* In the larger application’s style: */
.component {
  --text-color: #080;
  /* header-color isn’t set,
     and so remains blue,
     the fallback value */
}
{% endhighlight %}

This technique is especially useful for theming Web Components that use Shadow
DOM, as custom properties can traverse shadow boundaries. A Web Component author
can create an initial design using fallback values, and expose theming “hooks”
in the form of custom properties.

{% highlight html %}
<!-- In the web component's definition: -->
<x-foo>
  #shadow
    <style>
      p {
        background-color: var(--text-background, blue);
      }
    </style>
    <p>
      This text has a yellow background because the document styled me! Otherwise it
      would be blue.
    </p>
</x-foo>
{% endhighlight %}

{% highlight css %}
/* In the larger application's style: */
x-foo {
  --text-background: yellow;
}
{% endhighlight %}

When using `var()` there are a few gotchas to watch out for. Variables cannot be
property names. For instance:

{% highlight css %}
.foo {
  --side: margin-top;
  var(--side): 20px;
}
{% endhighlight %}

However this is not equivalent to setting `margin-top: 20px;`. Instead, the
second declaration is invalid and is thrown out as an error.

Similarly, you can’t (naively) build up a value where part of it is provided by
a variable:

{% highlight css %}
.foo {
  --gap: 20;
  margin-top: var(--gap)px;
}
{% endhighlight %}

Again, this is not equivalent to setting `margin-top: 20px;`. To build up a
value, you need something else: the `calc()` function.

## Building values with calc()

If you’ve never worked with it before, the `calc()` function is a handly little
tool that lets you perform calculations to determine CSS values. It’s [supported
on all modern browsers](http://caniuse.com/#search=calc), and can be combined
with custom properties to build up new values. For example:

{% highlight css %}
.foo {
  --gap: 20;
  margin-top: calc(var(--gap) * 1px); /* niiiiice */
}
{% endhighlight %}

## Working with custom properties in JavaScript

To get the value of a custom property at runtime, use the `getPropertyValue()`
method of the computed CSSStyleDeclaration object.

{% highlight css %}
/* CSS */
:root {
  --primary-color: red;
}

p {
  color: var(--primary-color);
}
{% endhighlight %}

{% highlight html %}
<!-- HTML -->
<p>I’m a red paragraph!</p>
{% endhighlight %}

{% highlight javascript %}
/* JS */
var styles = getComputedStyle(document.documentElement);
var value = String(styles.getPropertyValue('--primary-color')).trim();
// value = 'red'
{% endhighlight %}

Similarly, to set the value of  custom property at runtime, use the
`setProperty()` method of the `CSSStyleDeclaration` object.

{% highlight css %}
/* CSS */
:root {
  --primary-color: red;
}

p {
  color: var(--primary-color);
}
{% endhighlight %}

{% highlight html %}
<!-- HTML -->
<p>Now I’m a green paragraph!</p>
{% endhighlight %}

{% highlight javascript %}
/* JS */
document.documentElement.style.setProperty('--primary-color', 'green');
{% endhighlight %}

You can also set the value of the custom property to refer to another custom
property at runtime by using the `var()` function in your call to
`setProperty()`.

{% highlight css %}
/* CSS */
:root {
  --primary-color: red;
  --secondary-color: blue;
}
{% endhighlight %}

{% highlight html %}
<!-- HTML -->
<p>Sweet! I’m a blue paragraph!</p>
{% endhighlight %}

{% highlight javascript %}
/* JS */
document.documentElement.style.setProperty('--primary-color', 'var(--secondary-color)');
{% endhighlight %}

Because custom properties can refer to other custom properties in your
stylesheets, you could imagine how this could lead to all sorts of interesting
runtime effects.

## Browser Support

Currently Chrome 49, Firefox 42, Safari 9.1, and iOS Safari 9.3 support custom
properties.

## Demo

Try out the
[sample](https://googlechrome.github.io/samples/css-custom-properties/index.html)
for a glimpse at all of the interesting techniques you can now leverage thanks
to custom properties.

## Further Reading

If you’re interested to learn more about custom properties, Philip Walton from
the Google Analytics team has written a primer on [why he’s excited for custom
properties](http://philipwalton.com/articles/why-im-excited-about-native-css-variables/)
and you can keep tab on their progress in other browsers over on
[chromestatus.com](https://www.chromestatus.com/features/6401356696911872).
