---
layout: article
title: "Stateful Elements Respond to Touch"
description: "The simplest way to reassure a user that their touch isn't ignored is to change your UI as they press down. Changing a background color can make all the difference and is simple to do."
introduction: "Touchscreens are available on more and more devices, ranging
  from phones up to desktop screens. When your users choose to interact with
  your UI, your app should respond to their touch in intuitive and beautiful
  ways."
article:
  written_on: 2014-01-01
  updated_on: 2014-01-06
  order: 1
rel:
  gplusauthor: https://plus.google.com/+MattGaunt
key-takeaways:
  add-states:
    - Make your site feel snappy and responsive&colon; change the UI for each state :hover, :active and :focus.
    - Don’t override a browser’s default responses to touch and focus unless you are
      implementing your own UI changes.
    - Disable text selection on elements user’s will touch, unless there’s
      a good reason why users might need to copy / select the text.
remember:
  disable-user-select:
    - You should be cautious not to disable user selection if the
      information on the element may be useful to the user (phone number,
      e-mail address, and so on).
  override-default:
    - Only override browser styles if you are implementing your own!
collection: touch-input
---

{% wrap content%}

## Add Touch States

Have you ever touched or clicked an element on a web page and questioned
whether the site actually detected it?

Simply altering the color of elements as users touch parts of your UI gives a basic reassurance that your site is working. Not only does this alleviate frustation, but can also give a snappy and responsive feel to your site.

### Use Pseudo Classes to Change UI for each Touch State

The fastest way to support touch is to change the UI in response to a DOM
element’s change in state.

{% include modules/takeaway.liquid list=page.key-takeaways.add-states %}

DOM elements can be in one of the following states, default, focus, hover, and active. To change
our UI for each of these states, we need to apply styles to the following
pseudo classes `:hover`, `:focus` and `:active` as shown below:

{% include_code ../_code/states-example.html btnstates css %}

See [Pseudo classes for touch states](#pseudo-classes-for-touch-states):

![Image illustrating the different colors for button states](images/button-states.png)

### Hover and Focus Stickiness

On most mobile browsers *hover* and/or *focus* states will apply 
to an element after it's been tapped.

Consider carefully 
what styles you set and how they will look to the user after
they finish their touch.

Bear in mind that anchor tags and buttons may have different behaviour in different browsers, so assume in some cases *hover* will remain and in others *focus* will remain.

### Enabling Active State Support on iOS

Unfortunately, Safari on iOS does not apply the *active* state by default, to get it working you need to add a `touchstart` event listener to the *document body* or to each element.

You should do this behind a user agent test so it's only run on iOS devices.

Adding a touch start to the body has the advantage of applying to all elements in the DOM, however this may have performance issues when scrolling the page.

{% highlight js %}
window.onload = function() {
  if(/iP(hone|ad)/.test(window.navigator.userAgent)) {
    document.body.addEventListener('touchstart', function() {}, false);
  }
};
{% endhighlight %}

The alternative is to add the touch start listeners to all the interactable elements in the page, alleviating some of the performance concerns.

{% highlight js %}
window.onload = function() {
  if(/iP(hone|ad)/.test(window.navigator.userAgent)) {
    var elements = document.querySelectorAll('button');
    var emptyFunction = function() {};
    for(var i = 0; i < elements.length; i++) {
      elements[i].addEventListener('touchstart', emptyFunction, false);
    }
  }
};
{% endhighlight %}

### Override Default Browser Styles for Touch States

Once you add styles for the different states, you'll notice that most browsers implement their own styles to respond to a user’s
touch, you should override these defaults when you've added your own styles.

{% include modules/remember.liquid title="Remember" list=page.remember.override-default %}

#### Override Tap Highlight Styles

When mobile devices first launched, a number of sites didn’t have styling for
the active state. As a result, many browsers add a highlight color or style to elements when a user touches them.

Safari and Chrome add a tap highlight color which can be prevented with the
`-webkit-tap-highlight-color` CSS property:

{% include_code ../_code/states-example.html webkit-specific css %}

Internet Explorer on Windows Phone has a similar behavior, but is suppressed
via a meta tag:

{% highlight html %}
<meta name="msapplication-tap-highlight" content="no">
{% endhighlight %}

#### Override FirefoxOS Button State Styles

The Firefox `-moz-focus-inner` pseudo class includes an outline on touchable elements.
You can remove this outline by setting the `border: 0`.

If you are
using a `<button>` element, you get a gradient applied to your button which you can remove by setting `background-image: none`.

{% include_code ../_code/states-example.html ff-specific css %}

#### Override Element Outline in Focus State

Suppress the outline color when an element is focused using `outline: 0`.

{% highlight css %}
.btn:focus {
  outline: 0;

  // Add replacement focus styling here (i.e. border)
}
{% endhighlight %}

### Disable user-select on UI which Responds to Touch

Some mobile browsers will select text if the user long presses on the screen.
This can result in a bad user experience if the user accidentally presses down
on a button for too long. You can prevent this from happening using the
`user-select` CSS property.

{% highlight css %}
-moz-user-select: none;
-webkit-user-select: none;
-ms-user-select: none;
user-select: none;
{% endhighlight %}

{% include modules/remember.liquid title="Remember" list=page.remember.disable-user-select %}

## Reference

### Pseudo Classes for Touch States

<table class="table-3">
  <thead>
    <tr>
      <th>Class</th>
      <th>Example</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Class">:hover</td>
      <td data-th="Example"><img alt="Button in Pressed State" src="images/btn-hover-state.png"></td>
      <td data-th="Description">
        This state is entered when a is cursor placed over an element.
        Changes in UI on hover are helpful to encourage users to interact
        with elements.
      </td>
    </tr>
    <tr>
      <td data-th="Class">:focus</td>
      <td data-th="Example">
        <img alt="Button with Focus State" src="images/btn-focus-state.png">
      </td>
      <td data-th="Description">
        When you tab through elements on a page, you are moving the focus
        from one element to the next. The focus state allows the user to
        know what element they are currently interacting with; also allows
        users to navigate your UI easily using a keyboard.
      </td>
    </tr>
    <tr>
      <td data-th="Class">:active</td>
      <td data-th="Example">
        <img alt="Button in Pressed State" src="images/btn-pressed-state.png">
      </td>
      <td data-th="Description">
        This is the state an element has when it's being selected, for
        example a user clicking or touching an element.
      </td>
    </tr>
  </tbody>
</table>

{% include modules/nextarticle.liquid %}

{% endwrap %}
