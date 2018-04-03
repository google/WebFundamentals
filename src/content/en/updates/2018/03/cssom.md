project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: CSS Typed Object Model (Typed OM) brings types, methods, and a flexible object model to working with CSS values. Shipped in Chrome 66.

{# wf_updated_on: 2018-04-03 #}
{# wf_published_on: 2018-03-26 #}
{# wf_tags: css,style,cssom,houdini,chrome66 #}
{# wf_featured_image: /web/updates/images/generic/styles.png #}
{# wf_featured_snippet: CSS Typed Object Model (Typed OM) brings types, methods, and a flexible object model to working with CSS values. Shipped in Chrome 66. #}
{# wf_blink_components: Blink>CSS #}

# Working with the new CSS Typed Object Model {: .page-title }

{% include "web/_shared/contributors/ericbidelman.html" %}

#### TL;DR {: #tldr .hide-from-toc}

CSS now has a proper object-based API for working with values in JavaScript.

```javascript
el.attributeStyleMap.set('padding', CSS.px(42));
const padding = el.attributeStyleMap.get('padding');
console.log(padding.value, padding.unit); // 42, 'px'
```

The days of concatenating strings and subtle bugs are over!

Heads up: Chrome 66 adds support for the CSS Typed Object Model for a
[subset of CSS properties](https://chromium.googlesource.com/chromium/src/+/master/third_party/WebKit/Source/core/css/cssom/README.md).
{: .dogfood }

## Introduction {: #intro}

#### Old CSSOM

CSS has [had an object model][cssom-old] (CSSOM) for many years. In fact, any
time you read/set `.style` in JavaScript you're using it:

```javascript
// Element styles.
el.style.opacity = 0.3;
typeof el.style.opacity === 'string' // Ugh. A string!?

// Stylesheet rules.
document.styleSheets[0].cssRules[0].style.opacity = 0.3;
```

#### New CSS Typed OM

The new [CSS Typed Object Model][spec] (Typed OM), part of the
[Houdini][houdini] effort, expands this worldview by adding types, methods,
and a <u>proper</u> object model to CSS values. Instead of strings, values are
exposed as JavaScript objects to facilitate performant (and sane) manipulation
of CSS.

Instead of using `element.style`, you'll be accessing styles through a new
`.attributeStyleMap` property for elements and a `.styleMap` property for
stylesheet rules. Both return a `StylePropertyMap` object.

```javascript
// Element styles.
el.attributeStyleMap.set('opacity', 0.3);
typeof el.attributeStyleMap.get('opacity').value === 'number' // Yay, a number!

// Stylesheet rules.
const stylesheet = document.styleSheets[0];
stylesheet.cssRules[0].styleMap.set('background', 'blue');
```

Because `StylePropertyMap`s are Map-like objects, they support all the usual
suspects (get/set/keys/values/entries), making them flexible to work with:

```javascript
// All 3 of these are equivalent:
el.attributeStyleMap.set('opacity', 0.3);
el.attributeStyleMap.set('opacity', '0.3');
el.attributeStyleMap.set('opacity', CSS.number(0.3)); // see next section
// el.attributeStyleMap.get('opacity').value === 0.3

// StylePropertyMaps are iterable.
for (const [prop, val] of el.attributeStyleMap) {
  console.log(prop, val.value);
}
// → opacity, 0.3

el.attributeStyleMap.has('opacity') // true

el.attributeStyleMap.delete('opacity') // remove opacity.

el.attributeStyleMap.clear(); // remove all styles.
```

Note that in the second example, `opacity` is set to string (`'0.3'`) but a
number comes back out when the property is read back later.

If a given CSS property supports numbers, Typed OM will accept a strings as
input, but always returns a number! The analogy between the old CSSOM and the
new Typed OM is similar to how `.className` grew up and got its own API,
`.classList`.
{: .key-point }

## Benefits

So what problems is CSS Typed OM trying to solve? Looking at the examples above
(and throughout the rest of this article), you might argue that CSS Typed OM is
far more verbose than the old object model. I would agree!

Before you write off Typed OM, consider some of the key features it brings
to the table:

1. **Fewer bugs**. e.g. numerical values are always returned as numbers, not strings.

        el.style.opacity += 0.1;
        el.style.opacity === '0.30.1' // dragons!

- **Arithmetic operations & unit conversion**. convert between absolute length
units (e.g. `px` -> `cm`) and [do basic math](#arithmetic).
- **Value clamping & rounding**. Typed OM [rounds and/or clamps](#clamping)
values so they're within the acceptable ranges for a property.
- **Better performance**. The browser has to do less work serializing
  and deserializing string values. Now, the engine uses a similar understanding
  of CSS values across JS and C++. Tab Akins has shown some [early perf benchmarks](https://github.com/w3c/css-houdini-drafts/issues/634#issuecomment-366358609)
  that put Typed OM at **~30% faster** in operations/sec when compared to using
  the old CSSOM and strings. This can be significant for rapid [CSS
  animations](#cube) using `requestionAnimationFrame()`. [crbug.com/808933](https://bugs.chromium.org/p/chromium/issues/detail?id=808933) tracks
  additional performance work in Blink.
- **Error handling**. New [parsing methods](#parsing) brings
[error handling](#errors) in the world of CSS.
- "Should I use camel-cased CSS names or strings?" There's no more guessing if
names are camel-cased or strings (e.g. `el.style.backgroundColor` vs
`el.style['background-color']`). CSS property names in Typed OM are always
strings, matching what you actually write in CSS :)

## Browser support & feature detection {: #support }

Typed OM landed in Chrome 66 and is being implemented in Firefox. Edge has
shown [signs of support][edge-support], but has yet to add it to their
[platform dashboard](https://developer.microsoft.com/en-us/microsoft-edge/platform/status/).

Note: Only a [subset of CSS properties](https://chromium.googlesource.com/chromium/src/+/master/third_party/WebKit/Source/core/css/cssom/README.md) are supported in
Chrome 66+ for now.

For feature detection, you can check if one of the `CSS.*` numeric factories
is defined:

```javascript
if (window.CSS && CSS.number) {
  // Supports CSS Typed OM.
}
```

## API Basics {: #API }

### Accessing styles {: #stylemap }

Values are separate from units in CSS Typed OM. Getting a style returns a
`CSSUnitValue` containing a `value` and `unit`:

```javascript
el.attributeStyleMap.set('margin-top', CSS.px(10));
// el.attributeStyleMap.set('margin-top', '10px'); // string arg also works.
el.attributeStyleMap.get('margin-top').value  // 10
el.attributeStyleMap.get('margin-top').unit // 'px'

// Use CSSKeyWorldValue for plain text values:
el.attributeStyleMap.set('display', new CSSKeywordValue('initial'));
el.attributeStyleMap.get('display').value // 'initial'
el.attributeStyleMap.get('display').unit // undefined
```

### Computed styles {: #computed }

[Computed styles](https://developer.mozilla.org/en-US/docs/Web/CSS/computed_value)
have moved from an API on `window` to a new method on `HTMLElement`,
`computedStyleMap()`:

**Old CSSOM**

```javascript
el.style.opacity = 0.5;
window.getComputedStyle(el).opacity === "0.5" // Ugh, more strings!
```

**New Typed OM**

```javascript
el.attributeStyleMap.set('opacity', 0.5);
el.computedStyleMap().get('opacity').value // 0.5
```

Note: One gotcha between `window.getComputedStyle()` and
`element.computedStyleMap()` is that the former returns resolved values whereas
the latter returns computed values. For example, Typed OM retains percentage
values (`width: 50%`), while CSSOM resolves them to lengths (e.g. `width: 200px`).

#### Value clamping / rounding {: #clamping }

One of the nice features of the new object model is **automatic clamping and/or
rounding of computed style values**. As an example, let's say you try to set
`opacity` to a value outside of the acceptable range, [0, 1]. Typed OM clamps
the value to `1` when computing the style:

```javascript
el.attributeStyleMap.set('opacity', 3);
el.attributeStyleMap.get('opacity').value === 3  // val not clamped.
el.computedStyleMap().get('opacity').value === 1 // computed style clamps value.
```

Similarly, setting `z-index:15.4` rounds to `15` so the value remains an
integer.

```javascript
el.attributeStyleMap.set('z-index', CSS.number(15.4));
el.attributeStyleMap.get('z-index').value  === 15.4 // val not rounded.
el.computedStyleMap().get('z-index').value === 15   // computed style is rounded.
```

## CSS numerical values {: #CSSUnitValue }

Numbers are represented by two types of `CSSNumericValue` objects in Typed OM:

1. `CSSUnitValue` - values that contain a single unit type (e.g. `"42px"`).
- `CSSMathValue` - values that contain more than one value/unit such as
mathematical expression (e.g. `"calc(56em + 10%)"`).

#### Unit values {: #unitvals }

Simple numerical values (`"50%"`) are represented by `CSSUnitValue` objects.
While you _could_ create these objects directly (`new CSSUnitValue(10, 'px')`)
, most of the time you'll be using the `CSS.*` factory methods:

```javascript
const {value, unit} = CSS.number('10');
// value === 10, unit === 'number'

const {value, unit} = CSS.px(42);
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

Note: as shown in the examples, these methods can be passed a `Number` or
`String` representing a number.

See the spec for the [full list](https://drafts.css-houdini.org/css-typed-om/#numeric-factory)
of `CSS.*` methods.

#### Math values

`CSSMathValue` objects represent mathematical expressions and typically
contain more than one value/unit. The common example is creating a CSS `calc()`
expression, but there are methods for all the CSS functions:
`calc()`, `min()`, `max()`.

```javascript
new CSSMathSum(CSS.vw(100), CSS.px(-10)).toString(); // "calc(100vw + -10px)"

new CSSMathNegate(CSS.px(42)).toString() // "calc(-42px)"

new CSSMathInvert(CSS.s(10)).toString() // "calc(1 / 10s)"

new CSSMathProduct(CSS.deg(90), CSS.number(Math.PI/180)).toString();
// "calc(90deg * 0.0174533)"

new CSSMathMin(CSS.percent(80), CSS.px(12)).toString(); // "min(80%, 12px)"

new CSSMathMax(CSS.percent(80), CSS.px(12)).toString(); // "max(80%, 12px)"
```

##### Nested expressions

Using the math functions to create more complex values gets a bit confusing.
Below are a few examples to get you started. I've added extra indentation to
make them easier to read.

`calc(1px - 2 * 3em)` would be constructed as:

```javascript
new CSSMathSum(
  CSS.px(1),
  new CSSMathNegate(
    new CSSMathProduct(2, CSS.em(3))
  )
);
```

`calc(1px + 2px + 3px)` would be constructed as:

```javascript
new CSSMathSum(CSS.px(1), CSS.px(2), CSS.px(3));
```

`calc(calc(1px + 2px) + 3px)` would be constructed as:

```javascript
new CSSMathSum(
  new CSSMathSum(CSS.px(1), CSS.px(2)),
  CSS.px(3)
);
```

#### Arithmetic operations {: #arithmetic }

One of the most useful features of The CSS Typed OM is that you can perform
mathematical operations on `CSSUnitValue` objects.

##### Basic operations

Basic operations (`add`/`sub`/`mul`/`div`/`min`/`max`) are supported:

```javascript
CSS.deg(45).mul(2) // {value: 90, unit: "deg"}

CSS.percent(50).max(CSS.vw(50)).toString() // "max(50%, 50vw)"

// Can Pass CSSUnitValue:
CSS.px(1).add(CSS.px(2)) // {value: 3, unit: "px"}

// multiple values:
CSS.s(1).sub(CSS.ms(200), CSS.ms(300)).toString() // "calc(1s + -200ms + -300ms)"

// or pass a `CSSMathSum`:
const sum = new CSSMathSum(CSS.percent(100), CSS.px(20)));
CSS.vw(100).add(sum).toString() // "calc(100vw + (100% + 20px))"
```

##### Conversion

[Absolute length units](https://developer.mozilla.org/en-US/docs/Web/CSS/length#Absolute_length_units)
can be converted to other unit lengths:

```javascript
// Convert px to other absolute/physical lengths.
el.attributeStyleMap.set('width', '500px');
const width = el.attributeStyleMap.get('width');
width.to('mm'); // CSSUnitValue {value: 132.29166666666669, unit: "mm"}
width.to('cm'); // CSSUnitValue {value: 13.229166666666668, unit: "cm"}
width.to('in'); // CSSUnitValue {value: 5.208333333333333, unit: "in"}

CSS.deg(200).to('rad').value // 3.49066
CSS.s(2).to('ms').value // 2000
```

##### Equality

```javascript
const width = CSS.px(200);
CSS.px(200).equals(width) // true

const rads = CSS.deg(180).to('rad');
CSS.deg(180).equals(rads.to('deg')) // true
```

## CSS transform values {: #transforms }

CSS transforms are created with a `CSSTransformValue` and passing an array of
transform values (e.g. `CSSRotate`, `CSScale`, `CSSSkew`, `CSSSkewX`,
`CSSSkewY`). As an example, say you want to re-create this CSS:

```css
transform: rotateZ(45deg) scale(0.5) translate3d(10px,10px,10px);
```

Translated into Typed OM:

```javascript
const transform =  new CSSTransformValue([
  new CSSRotate(CSS.deg(45)),
  new CSSScale(CSS.number(0.5), CSS.number(0.5)),
  new CSSTranslate(CSS.px(10), CSS.px(10), CSS.px(10))
]);
```

In addition to its verbosity (lolz!), `CSSTransformValue` has some cool
features. It has a boolean property to differentiate 2D and 3D transforms
and a `.toMatrix()` method to return the `DOMMatrix` representation of a
transform:

```javascript
new CSSTranslate(CSS.px(10), CSS.px(10)).is2D // true
new CSSTranslate(CSS.px(10), CSS.px(10), CSS.px(10)).is2D // false
new CSSTranslate(CSS.px(10), CSS.px(10)).toMatrix() // DOMMatrix
```

#### Example: animating a cube {: #cube }

Let's see a practical example of using transforms. We'll using JavaScript
and CSS transforms to animate a cube.

```javascript
const rotate = new CSSRotate(0, 0, 1, CSS.deg(0));
const transform = new CSSTransformValue([rotate]);

const box = document.querySelector('#box');
box.attributeStyleMap.set('transform', transform);

(function draw() {
  requestAnimationFrame(draw);
  transform[0].angle.value += 5; // Update the transform's angle.
  // rotate.angle.value += 5; // Or, update the CSSRotate object directly.
  box.attributeStyleMap.set('transform', transform); // commit it.
})();
```

Notice that:

1. Numerical values means we can increment the angle directly using math!
2. Rather than touching the DOM or reading back a value on every frame (e.g.
no <code>box.style.transform=\`rotate(0,0,1,${newAngle}deg)\`</code>), the
animation is driven by **updating the underlying `CSSTransformValue` data
object, improving performance**.

### Demo

Below, you'll see a red cube if your browser supports Typed OM. The cube
starts rotating when you mouse over it. The animation is powered by CSS Typed
OM! 🤘

{% framebox height="150px" %}
<style>
  #box {
    padding: 8px;
    width: 100px;
    height: 100px;
    background: red;
    margin-top: 10px;
  }
  #support {
    display: none;
    font-weight: bold;
    font-size: 16px;
    color: red;
  }
  #support.show {
    display: inline-block;
  }
</style>

<div id="support">Drats! Sorry, your browser doesn't support Typed OM.</div>
<div id="box"></div>

<script>
(function() {
if (!window.CSSTransformValue) {
  document.querySelector('#box').remove();
  document.querySelector('#support').classList.add('show');
  return;
}

const transform = new CSSTransformValue([
  new CSSRotate(0, 0, 1, CSS.deg(0)),
  // new CSSScale(0.5, 0.5)
  // new CSSTranslate(CSS.px(0), CSS.px(0))
]);

const box = document.querySelector('#box');
box.attributeStyleMap.set('transform', transform);

let rafId;

function draw() {
  rafId = requestAnimationFrame(draw);
  transform[0].angle.value = (transform[0].angle.value + 5) % 360;
  // const newScale = 1 / ((transform[0].angle.value % 2) + 1);
  //transform[1] = new CSSScale(newScale, newScale);
  // transform[1].x.value += 1;
  box.attributeStyleMap.set('transform', transform); // commit it.
}
box.addEventListener('mouseenter', function(e) {
  draw();
});

box.addEventListener('mouseleave', function(e) {
  cancelAnimationFrame(rafId);
});
})();
</script>
{% endframebox %}

## CSS custom properties values {: #customprops }

CSS `var()` become a `CSSVariableReferenceValue` object in the Typed OM.
Their values get parsed into `CSSUnparsedValue` because they can take any
type (px, %, em, rgba(), etc).

```javascript
const foo = new CSSVariableReferenceValue('--foo');
// foo.variable === '--foo'

// Fallback values:
const padding = new CSSVariableReferenceValue(
    '--default-padding', new CSSUnparsedValue(['8px']));
// padding.variable === '--default-padding'
// padding.fallback instanceof CSSUnparsedValue === true
// padding.fallback[0] === '8px'
```

If you want to get the value of a custom property, there's a bit of work to do:

```html
<style>
  body {
    --foo: 10px;
  }
</style>
<script>
  const styles = document.querySelector('style');
  const foo = styles.sheet.cssRules[0].styleMap.get('--foo').trim();
  console.log(CSSNumericValue.parse(foo).value); // 10
</script>
```

## Position values {: #pos }

CSS properties that take a space-separated x/y position such as
`object-position` are represented by `CSSPositionValue` objects.

```javascript
const position = new CSSPositionValue(CSS.px(5), CSS.px(10));
el.attributeStyleMap.set('object-position', position);

console.log(position.x.value, position.y.value);
// → 5, 10
```

## Parsing values {: #parsing}

The Typed OM introduces parsing methods to the web platform! This means you can
finally  **parse CSS values programmatically, _before_ trying to use it**! This
new capability is a potential life saver for catching early bugs and malformed
CSS.

Parse a full style:

```javascript
const css = CSSStyleValue.parse(
    'transform', 'translate3d(10px,10px,0) scale(0.5)');
// → css instanceof CSSTransformValue === true
// → css.toString() === 'translate3d(10px, 10px, 0) scale(0.5)'
```

Parse values into [`CSSUnitValue`](#CSSUnitValue):

```javascript
CSSNumericValue.parse('42.0px') // {value: 42, unit: 'px'}

// But it's easier to use the factory functions:
CSS.px(42.0) // '42px'
```

### Error handling {: #errors }

**Example** - check if the CSS parser will be happy with this `transform` value:

```javascript
try {
  const css = CSSStyleValue.parse('transform', 'translate4d(bogus value)');
  // use css
} catch (err) {
  console.err(err);
}
```

## Conclusion

It's nice to finally have an updated object model for CSS. Working with strings
never felt right to me. The CSS Typed OM API is a bit verbose, but hopefully it
results in fewer bugs and more performant code down the line.

{% include "web/_shared/rss-widget-updates.html" %}

{% include "comment-widget.html" %}

[cssom-old]: https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/Using_dynamic_styling_information
[spec]: https://drafts.css-houdini.org/css-typed-om/
[chromestatus]: https://www.chromestatus.com/feature/5682491075592192
[houdini]: /web/updates/2016/05/houdini
[edge-support]: https://lists.w3.org/Archives/Public/public-houdini/2015Oct/0011.html
