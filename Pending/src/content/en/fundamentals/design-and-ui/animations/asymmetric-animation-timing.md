project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: Breaking symmetry provides contrast and appeal to your projects. Learn when and how to apply this to your projects.

<p class="intro">
  Asymmetry to your animation durations aids your user experience by allowing you to express personality while at the same time responding quickly to user interactions. It also provides contrast to the feel, which makes the interface more visually appealing.
</p>

















# WARNING: This page has an include that should be a callout (i.e. a highlight.liquid, but it has no text - please fix this)



# WARNING: This page has a highlight.liquid include that wants to show a list but it's not supported on devsite. Please change this to text and fix the issue






Like most "rules" of animation, you should play around to find out what works for your application, but when it comes to the user experience aspects, users are notoriously impatient. The rule of thumb is to **always respond to a user interaction quickly**. That said, most of the time the user's action is asymmetric, and therefore so can the animation be.

For example, when a user taps to bring on a sidebar navigation, you should bring that on to screen as quickly as possible, with a duration of around 100ms. When the user dismisses the menu, however, you can afford to animate the view out a little more slowly, say around the 300ms mark.

By contrast, when you bring on a modal view, this is normally to display an error or some other critical message. In such cases you will want to bring on the view a little more slowly, again around the 300ms mark, but dismissal, which is triggered by the user, should happen very quickly.

The general rule of thumb, then, is:

* For UI animations triggered by a user’s interaction, such as view transitions or showing an element, have a fast intro (short duration), but a slow outro (longer duration).
* For UI animations triggered by your code, such as errors or modal views, have a slower intro (longer duration), but a fast outro (short duration).



