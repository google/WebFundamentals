project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: CSS Typed Object Model (CSSTOM) brings types, methods, and a flexible object model to working with CSS values. Shipped in Chrome 66.

{# wf_updated_on: 2018-03-20 #}
{# wf_published_on: 2018-03-18 #}
{# wf_tags: css,style,cssom,houdini,chrome66 #}
{# wf_featured_image: /web/updates/images/generic/styles.png #}
{# wf_featured_snippet: CSS Typed Object Model (CSSTOM) brings types, methods, and a flexible object model to working with CSS values. Shipped in Chrome 66. #}
{# wf_blink_components: Blink>CSS #}

# Working with CSS Typed Object Model {: .page-title }

{% include "web/_shared/contributors/ericbidelman.html" %}

#### TL;DR {: #tldr .hide-from-toc}

CSS now has a proper object-based API for working with values in JavaScript.
The days of concatenating strings and subtle bugs are over!

## Introduction {: #intro}

Heads up: Chrome 66 adds support for CSS Typed Object Model for a [subset of CSS properties](https://chromium.googlesource.com/chromium/src/+/master/third_party/WebKit/Source/core/css/cssom/README.md).
{: .dogfood }

CSS has [had an object model][cssom-old] (CSSOM) for many years. In fact, any
time you read/set a style in JavaScript, you're using it:

```javascript
// Using old CSSOM on an element:
el.style.background = 'blue';

// Using old CSSOM on a stylesheet:
const stylesheet = document.styleSheets[0];
stylesheet.cssRules[0].style.backgroundColor = 'red';
```

The [CSS Typed Object Model][spec] (CSSTOM), part of the [Houdini][houdini] effort,
expands this worldview by adding types, methods, and a proper object model for
CSS values. Values are exposed as JavaScript objects to facilitate
performance and sane manipulation of CSS.

**Old**

```javascript
el.style.opacity = 0.3;
console.log(el.style.opacity === '0.3'); // ugh, a string!
```

**New**

```javascript
// With CSSTOM, all of these produce the same result:
el.attributeStyleMap.set('opacity', '0.3');
el.attributeStyleMap.set('opacity', 0.3);
el.attributeStyleMap.set('opacity', CSS.number(0.3)); // covered in next section.
el.attributeStyleMap.set('opacity', CSS.number('0.3'));
el.attributeStyleMap.get('opacity').value // 0.3
```

Strings can go in, but numbers **always**  come out! The analogy between the old
CSSOM and the new Typed OM is similar to how `.className` grew up and got its own
data structure, `.classList`.
{: .key-point }

## Benefits

Looking at the examples, you might argue that CSSTOM is a lot more verbose
than the previous object model. I would tend to agree 🤔 However, using this new
API it will lead to fewer bugs and better maintenance. CSSTOM has several new
benefits over the old stuff:

1. **Fewer bugs**: values where are numerical are return as numbers, never strings:

        el.style.opacity += 0.1;
        el.style.opacity === '0.30.1' // dragons!

- **Value clamping**: CSSTOM [rounds and/or clamps](#clamping) values so they're
within the acceptable ranges for a property.
- **Better for performance** (Potentially): In theory, the browser has to do
  less work serializing and deserializing JS string values into underlying C++
  objects. Now, both JavaScript and C++ share a similar representation for CSS
  values. Validating if there's really a meaningful performance impact (in a
  real-world) is left to the reader.
- **Error handling**: [parsing methods](#errors) bring better error handling for
invalid CSS properties and values.

## Parsing values {: #errors}

CSSTOM introduces parsing methods to the web platform. At last, we can finally
**parse CSS programmatically _before_ trying to use it**! These methods are
potential life savers for catching early bugs and malformed CSS.

You can parse values into `CSSUnitValue` objects or full styles into a
`CSSStyleValue`:

Parse full styles:

```javascript
const css = CSSStyleValue.parse(
    'transform', 'translate3d(10px,10px,0) scale(0.5)');
// → css instanceof CSSTransformValue === true
// → css.is2D === false
// → css.toString() === 'translate3d(10px, 10px, 0) scale(0.5)'
```

Parse a numeric value:

```javascript
CSSNumericValue.parse('42.0px').toString(); // "42.0px"

CSS.px(42.0).toString(); // "42px";
```

Check if the CSS parser will be happy with a value (aka proper error handling):

```javascript
try {
  const css = CSSStyleValue.parse('transform', 'translate4d(bogus values)');
} catch (err) {
  console.err(err);
}
```

## API Basics {: #API }

### CSS numerical values {: #CSSUnitValue }

In CSSTOM, numbers are represented b `CSSNuymericValue` objects. There are
two types:

1. `CSSUnitValue` - represent values that contain a single unit type (for
example `"42px"`).
- `CSSMathValue` - objects represent math expressions, which can contain more
than one value/unit. For example, `"calc(56em + 10%)"`.

#### Unit values {: #unitvals }

Simple numerical values (`"50%"`) are represented the `CSSUnitValue` object.
While you _can_ create these objects directly (e.g.
`new CSSUnitValue(10, 'px')`), most of the time you'll be using the `CSS.*`
factory methods for each of the common types:

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

Note: as shown in the examples, these methods can be passed an integer or
a string.

#### Math values

`CSSMathValue` objects represent mathematical expressions and can
contain more than one value/unit. For example, if you're creating
`"calc(100vw - 10px)"`. There are methods for all of the CSS functions
(`calc()`, `min()`, `max()`).

```javascript
new CSSMathSum(CSS.vw(100), CSS.px(-10)).toString(); // "calc(100vw + -10px)"

new CSSMathNegate(CSS.px(42)).toString() // "calc(-42px)"

new CSSMathInvert(CSS.s(10)).toString() // "calc(1 / 10s)"

new CSSMathProduct(CSS.deg(90), CSS.number(Math.PI/180)).toString();
// "calc(90deg * 0.0174533)"

new CSSMathMin(CSS.percent(80), CSS.px(12)).toString(); // "min(80%, 12px)"

new CSSMathMax(CSS.percent(80), CSS.px(12)).toString(); // "max(80%, 12px)"
```

See the spec for the [full list](https://drafts.css-houdini.org/css-typed-om/#numeric-factory)
of methods.

##### Complex examples

`calc(1px - 2 * 3em)` would be constructed as:

```javascript
new CSSMathSum(
  CSS.px(1),
  new CSSMathNegate(
    new CSSMathProduct(
      2,
      CSS.em(3)
    )
  )
);
```

`calc(1px + 2px + 3px)` would be constructed as:

```javascript
new CSSMathSum(
  CSS.px(1),
  CSS.px(2),
  CSS.px(3)
);
```

`calc(calc(1px + 2px) + 3px)` would be constructed as:

```javascript
new CSSMathSum(
  new CSSMathSum(
    CSS.px(1),
    CSS.px(2)
  ),
  CSS.px(3)
);
```

### Accessing and modifying styles {: #stylemap }

Historically, `el.style` has been our tool to get/set element styles in
JavaScript. In CSSTOM, there's a new API. The `el.attributeStyleMap` property
returns a `StylePropertyMap` object which you can pass one of the `CSSUnitValue`
discussed in the [previous section](#unitvals).

```javascript
el.attributeStyleMap.set('opacity', CSS.number('0.3'));
el.attributeStyleMap.get('opacity').value //  0.3

el.attributeStyleMap.set('margin-top', CSS.px(10));
el.attributeStyleMap.get('margin-top').value  // 10
el.attributeStyleMap.get('margin-top').unit // 'px'

// Use CSSKeyWorldValue for plan text values:
el.attributeStyleMap.set('display', new CSSKeywordValue('initial'));

// StylePropertyMaps are iterable.
for (const [prop, val] of el.attributeStyleMap.entries()) {
  console.log(prop, val.value);
}
// → opacity, 0.3

el.attributeStyleMap.clear(); // Remove all styles.
```

Note: Passing a string as the second argument also works:
`el.attributeStyleMap.set('margin-top', '10px')`.

### Computed styles {: #computed }

Computed styles also have a new API. `HTMLElement.prototype.computedStyleMap()`
will get you the "CSSTOM version" of the computed styles for an element. The
"CSSTOM version" is safer than using `window.getComputedStyle()` because it
continues our moto of ditching strings for proper types.

**Old**

```javascript
el.opacity = 0.5;
window.getComputedStyle(el).opacity === "0.5" // Ugh, more strings!
```

**New**

```javascript
el.attributeStyleMap.set('opacity', 0.5);
el.computedStyleMap().get('opacity').value // 0.5
```

#### Value clamping / rounding {: #clamping }

One of the nice features of the new object model is automatic clamping and/or
rounding of computed style values. As an example, let's say you set opacity
to a value outside of the acceptable range [0, 1]. CSSTOM will clamp the
value to `1` when the style is computed:

```javascript
el.attributeStyleMap.set('opacity', 3);
el.attributeStyleMap.get('opacity').value === 3  // val not clamped.
el.computedStyleMap().get('opacity').value === 1 // computed style clamps value.
```

Similarly, setting `z-index:15.4` will round to the value `15` so it becomes an
integer:

```javascript
el.attributeStyleMap.set('z-index', CSS.number(15.4));
el.attributeStyleMap.get('z-index').value  === 15.4 // val not rounded.
el.computedStyleMap().get('z-index').value === 15   // computed style is rounded.
```

## Working with position values {: #pos }

CSS properties that take a space-separated x/y position such as =
`object-position` have their own value, `CSSPositionValue`.

```javascript
const position = new CSSPositionValue(CSS.px(5), CSS.px(10));
el.attributeStyleMap.set('object-position', position);

console.log(position.x.value, position.y.value);
// → 5, 10
```

## Working with CSS transforms {: #transforms }

CSS transforms are created by using a `CSSTransformValue` object with
an array of transform objects (`CSSRotate`, `CSScale`, `CSSSkew`, `CSSSkewX`,
`CSSSkewY`). For example, say you want to re-create this CSS:

```css
transform: rotateZ(45deg) scale(0.5) translate3d(10px,10px,10px);
```

In CSSTOM, this would be:

```javascript
const transform =  new CSSTransformValue([
  new CSSRotate(CSS.deg(45)),
  new CSSScale(CSS.number(0.5), CSS.number(0.5)),
  new CSSTranslate(CSS.px(10), CSS.px(10), CSS.px(10px))
]);
```

Apart from its verbosity, `CSSTransformValue` also gives you a boolean property
to differentiate 2D and 3D transforms, and a `.toMatrix()` method to return
the `DOMMatrix` representation of the transform:

```javascript
new CSSTranslate(CSS.px(10), CSS.px(10)).is2D // true
new CSSTranslate(CSS.px(10), CSS.px(10), CSS.px(10)).is2D // false

new CSSTranslate(CSS.px(10), CSS.px(10)).toMatrix() // DOMMatrix
```

#### Example: animating a cube {: #cube }

The verbosity of `CSSTransformValue` can be justified by seeing a practical
example. The following rotates a cube (in JavaScript) by changing the element's
`CSSTransformValue` on every frame.

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

Notice that CSSTOM:

1. **Updates an underlying data object** rather than touching the DOM or
reading back a value on every frame (e.g. no <code>box.style.transform=\`rotate(0,0,1,${newAngle}deg)`</code>).
2. We can increment the angle directly using math!

### Demo

Below, you'll see a red cube if your browser supports CSSTOM. The cube
will start to rotate when you mouse over it.

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

<div id="support">Drats! Sorry, your browser doesn't support CSSTOM.</div>
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

## Working with CSS custom properties {: #customprops }

CSS `var()` references become `CSSVariableReferenceValues` in the Typed OM.

## Working with images {: #images }

// TODO

## Browser support & feature detection {: #support }

Note: Only a [subset of CSS properties](https://chromium.googlesource.com/chromium/src/+/master/third_party/WebKit/Source/core/css/cssom/README.md) are supported in
Chrome 66+ for now.

CSSTOM landed in Chrome 66 and is being implemented in Firefox. Edge has
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
