project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: CSS Typed Object Model (CSSOM) brings types, methods, and a flexible object model to working with CSS values. Shipped in Chrome 66.

{# wf_updated_on: 2018-03-19 #}
{# wf_published_on: 2018-03-18 #}
{# wf_tags: css,style,cssom,houdini,chrome66 #}
{# wf_featured_image: /web/updates/images/2018/01/paintapi/houdinidiamond.png #}
{# wf_featured_snippet: CSS Typed Object Model (CSSOM) brings types, methods, and a flexible object model to working with CSS values. Shipped in Chrome 66. #}
{# wf_blink_components: Blink>CSS #}

# Working with CSS Typed Object Model {: .page-title }

{% include "web/_shared/contributors/ericbidelman.html" %}

#### TL;DR {: #tldr .hide-from-toc}

CSS now has a proper object-based API for working with values in JavaScript.
The days of concatenating strings and subtle bugs are over!

## Introduction {: #intro}

CSS has [had an object model][cssom-old] (CSSOM) for many years. In fact, any
time you read/set a style in JavaScript, you're using it:

```javascript
// Using old CSSOM on an element.
el.style.background = 'blue';

// There's also working with stylesheets:
const stylesheet = document.styleSheets[0];
stylesheet.cssRules[0].style.backgroundColor = 'red';
```

The [CSS Typed Object Model][spec], part of the [Houdini][houdini] effort,
expands this worldview by adding types, methods, and a proper object model for
CSS values. Values are exposed as typed JavaScript objects to facilitate
performant and sane manipulation of values.

```javascript
// Before
el.style.opacity = 0.3;
el.style.opacity === '0.3'

// With CSS Typed OM:
el.attributeStyleMap.set('opacity', CSS.number('0.3'));
el.attributeStyleMap.get('opacity').value === 0.3
```

There's an analogy to be made: **CSS Typed OM : CSSOM :: `.classList` :: `.className`.**
{: .key-point }

## CSS Typed Object Model API

### CSS unit values {: #CSSUnitValue }

Instead of using pure strings to represent CSS values (e.g. `'42px'`), numerical
values can now be represented a `CSSUnitValue` object. The `CSS.*` methods allow
you to create the most common types. See the spec for the [full list](https://drafts.css-houdini.org/css-typed-om/#numeric-value).

```javascript
const {value, unit} = CSS.number('10');
// value === 10, unit === 'number'

const {value, unit} = CSS.px('42');
// value === 42, unit === 'px'

const {value, unit} = CSS.vw('100');
// value === 100, unit === 'vw'

const {value, unit} = CSS.percent('10');
// value === 10, unit === 'percent'

const {value, unit} = CSS.deg(45);
// value === 45, unit === 'deg'

const {value, unit} = CSS.ms(300);
// value === 300, unit === 'ms'
```

### StylePropertyMap {: #stylemap }

`StylePropertyMap` is an alternate way to represent a CSS declaration block as
an object.


There's no weirdness with string coercion; the APIs return exactly what you expect:

```javascript
el.attributeStyleMap.set('opacity', CSS.number('0.3'));
el.attributeStyleMap.get('opacity').value === 0.3

el.attributeStyleMap.set('margin-top', CSS.px(10));
el.attributeStyleMap.get('margin-top').value === 10
el.attributeStyleMap.get('margin-top').unit === 'px'
```

If you prefer to still work with strings, that's cool too:

```javascript
el.attributeStyleMap.set('margin-top', '10px');
```

## Parsing values

```javascript
const transform = CSSStyleValue.parse(
    'transform', 'translate3d(10px, 10px, 0) scale(0.5)');
// → transform.is2D === false
// → transform.toString() === 'translate3d(10px, 10px, 0) scale(0.5)'

for (const val of transform.values()) {
  console.log(val.x.value, val.x.unit);
}

// Prints:
// → 10 "px"
// → 0.5 "number"
```

### Error checking {: #errorcheck }

A `parse` function also means we have a way to programmatically check if the CSS
parser will be happy with a value we set:

```javascript
try {
  CSSStyleValue.parse('transform', 'translate4d(bogus value)');
} catch (err) {
  console.err(err);
}
```

## Value clamping {: #clamp }

Clamping and/or rounding will occur during the computation of a style.

```javascript
el.attributeStyleMap.set("opacity", CSS.number("3"));
console.log("Typed OM returns ", el.attributeStyleMap.get("opacity").value)
console.log("Typed OM computed returns ", el.computedStyleMap().get('opacity').value)

el.style.opacity = '3'
console.log("CSSOM returns ", el.style.opacity)
console.log("CSSOM computed returns ", getComputedStyle(el).opacity)
```

## Benefits

You might argue that CSS Typed OM is a lot more verbose than before, and I
would tend to agree. However, using the new APIs it will lead to fewer bugs,
long-term. The API has several new benefits over the old way.

1. **Fewer bugs**: always working with strings is dangerous:

        el.style.opacity += 0.1;
        el.style.opacity === '0.30.1' // dragons!

- **Value clamping**: CSS Typed OM supports [value clamping](#clamping), which
I'll cover later.
- **Better for performance** (Potentially): In theory, the browser has to do
  less work serializing and deserializing JS string values into underlying C++
  objects. Now, both JavaScript and C++ share a similar representation for CSS
  values. Validating if there's really a meaningful performance impact (in a
  real-world) is left to the reader.

## Browser support & feature detection {: #support }

Note: Only a [subset of CSS properties](https://chromium.googlesource.com/chromium/src/+/master/third_party/WebKit/Source/core/css/cssom/README.md) are supported in
Chrome 66+ for now.

CSS Typed OM landed in Chrome 66 and is being implemented in Firefox. Edge has
shown [signs of support][edge-support], but has yet to add it to their
[platform dashboard](https://developer.microsoft.com/en-us/microsoft-edge/platform/status/).

For feature detection, you can check if the `CSS.number` exists:

```javascript
if (!!(CSS && CSS.number)) {
  // Supports CSS Typed OM.
}
```

## Conclusion

Having a proper object model for CSS will result in fewer bugs and more
performant code.

{% include "web/_shared/rss-widget-updates.html" %}

{% include "comment-widget.html" %}


[cssom-old]: https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/Using_dynamic_styling_information
[spec]: https://drafts.csswg.org/cssom/
[chromestatus]: https://www.chromestatus.com/feature/5682491075592192
[houdini]: /web/updates/2016/05/houdini
[edge-support]: https://lists.w3.org/Archives/Public/public-houdini/2015Oct/0011.html
