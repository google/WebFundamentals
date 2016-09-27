project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Introduction to affordances

{# wf_review_required #}
{# wf_updated_on: 2016-02-29 #}
{# wf_published_on: 2016-02-29 #}

# Affordances {: .page-title }

{% include "_shared/contributors/megginkearney.html" %}
{% include "_shared/contributors/dgash.html" %}



When we use a man-made tool or device, we typically look to its form and design to give us an idea of what it does and how it works. An *affordance* is any object that offers, or affords, its user the opportunity to perform an action. The better the affordance is designed, the more obvious or intuitive its use.

A classic example is a kettle or teapot. You can easily recognize that you should pick it up by the handle, not the spout, even if you've never seen a teapot before. 

![a teapot with handle and spout](imgs/teapot.png)

That's because the affordance is similar to those you have seen on many other objects -- watering pots, beverage pitchers, coffee mugs, and so on. You probably *could* pick up the pot by the spout, but your experience with similar affordances tells you the handle is the better option.

In graphical user interfaces, affordances represent actions we can take, but they can be ambiguous because there is no physical object to interact with. GUI affordances are thus specifically designed to be unambiguous: buttons, check boxes, and scroll bars are meant to convey their usage with as little training as possible.

For example, you might paraphrase the use of some common form elements (affordances) like this:

 - Radio buttons &mdash; "I can choose one of these options."
 - Check box &mdash; "I can choose 'yes' or 'no' to this option."
 - Text field &mdash; "I can type something into this area."
 - Dropdown &mdash; "I can open this element to display my options."

You are able to draw conclusions about these elements *only because you can see them*. Naturally, someone who can't see the visual clues provided by an element can't comprehend its meaning or intuitively grasp the value of the affordance. So we must make sure that the information is expressed flexibly enough to be accessed by assistive technology that can construct an alternative interface to suit its user's needs.

This non-visual exposure of an affordance's use is called its *semantics*. The WebAIM WCAG guidelines address it like this.

![the Web AIM guideline on affordance semantics](imgs/guideline4-1.png)

Let's try out some things from the point of view of someone using assistive technology. Earlier, you had [a brief look at ChromeVox Lite](/web/fundamentals/accessibility/00-intro/intro-four). Now we'll try using it without any access to the web page's visible interface.

We've modified the flight reservation page from the previous lesson so that you can't see what you're doing any more, and you'll have to use the screen reader. You might want to refer back to the earlier exercise if you get stuck. As before, use the form to book a one-way ticket to Melbourne with a window seat.

<a href="http://udacity.github.io/ud891/lesson3-semantics-built-in/02-chromevox-lite/" target="_blank">ChromeVox lite demo page</a>

Think about the fact that a screen reader (or other assistive technology) actually creates a complete alternate user experience for the user based on the programmatically expressed semantics. Instead of a visual interface, the screen reader provides an audible interface.

Notice how the screen reader tells you some information about each interface element. You should expect a well-designed reader to tell you all, or at least most, of the following information about the elements it encounters.

 - The element's *role* or type, if it is specified (it should be).
 - The element's *name*, if it has one (it should).
 - The element's *value*, if it has one (it may or may not).
 - The element's *state*, e.g., whether it is enabled or disabled (if applicable).

The screen reader is able to construct this alternate UI because the native elements contain built-in accessibility metadata. Just as the rendering engine uses the native code to construct a visual interface, the screen reader uses the metadata in the DOM nodes to construct an accessible version, something like this.

![a screen reader uses the DOM to create accessible nodes](imgs/nativecodetoacc.png)
