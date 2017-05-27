---
layout: shared/narrow
title: "Semantics in Native HTML"
description: "How native HTML elements provide basic semantics"
published_on: 2016-03-01
updated_on: 2016-03-01
order: 5
translation_priority: 0
authors:
  - megginkearney
  - dgash
key-takeaways:
  tldr: 
    - "Learn what accessibility means and how it applies to web development."
    - "Learn how to make web sites accessible and usable for everyone."
    - "Learn how to include basic accessibility with minimal development impace."
    - "Learn what HTML features are available and how to use them to improve accessibility."
    - "Learn about advanced accessibility techniques for creating polished accessibility experiences."
notes:
  efficiency:
    - "Understanding the accessibility issue, its scope, and its impact can make you a better web developer."
  problem-solving:
    - "Catching, identifying, and removing potential accessibility roadblocks before they happen can improve your development process and reduce maintenance requirements."
---

A browser can transform the DOM tree into an accessibility tree because much of the DOM has *implicit* semantic meaning. That is, the DOM uses native HTML elements that are recognized by browsers and work predictably on a variety of platforms. Accessibility for native HTML elements such as links or buttons is thus handled automatically. We can take advantage of that built-in accessibility by writing HTML that expresses the semantics of our page elements.

However, sometimes we use elements that look like native elements but aren't. For example, this "button" isn't a button at all.

![a div styled as a button](imgs/tacobutton.png)

It might be constructed in HTML in any number of ways; one way is shown below.

{% highlight html %}
<div class="button-ish">Give me tacos</div>
{% endhighlight %}

When we don't use an actual button element, the screen reader has no way to know what it has landed on. Also, we would have to do the extra work [discussed in the previous lesson](/web/fundamentals/accessibility/02-semantics-builtin/sembuiltin-four) to make it usable to keyboard-only users because, as it is coded now, it can only be used with a mouse.

We can easily fix this by using a regular `button` element instead of a `div`. Using a native element also has the benefit of taking care of keyboard interactions for us. And remember that you don't have to lose your spiffy visual effects just because you use a native element; you can style native elements to make them look the way you want and still retain the implicit semantics and behavior.

Earlier we noted that screen readers will announce an element's role, name, state, and value. By using the right semantic element, role, state, and value are covered, but we must also ensure that we make an element's name discoverable.

Broadly, there are two types of names:

 - *Visible labels*, which are used by all users to associate meaning with an element, and
 - *Text alternatives*, which are only used when there is no need for a visual label.

For text-level elements, we don't need to do anything, because by definition it will have some text content. However, for input or control elements, and visual content like images, we need to make sure that we specify a name. In fact, providing text alternatives for any non-text content is <a href="http://webaim.org/standards/wcag/checklist#g1.1" target="_blank">the very first item on the WebAIM checklist</a>.

One way to do that is to follow their recommendation that "Form inputs have associated text labels." There are two ways to associate a label with a form element, such as a checkbox. Either of the methods causes the label text to also become a click target for the checkbox, which is also helpful for mouse or touchscreen users. To associate a label with an element, either

 - Place the input element inside a label element

{% highlight html %}
<label>
  <input type="checkbox">Receive promotional offers?</input>
</label>
{% endhighlight %}

or

 - Use the label's `for` attribute and refer to the element's `id`

{% highlight html %}
<input id="promo" type="checkbox"></input>
<label for="promo">Receive promotional offers?</label>
{% endhighlight %}

When the checkbox has been labeled correctly, the screen reader can report that the element has a role of checkbox, is in a checked state, and is named "Receive promotional offers?". 

![a properly labeled checkbox](imgs/promo-offers.png)

>Tip: You can actually use the screen reader to find improperly-associated labels by tabbing through the page and verifying the spoken roles, states, and names.

