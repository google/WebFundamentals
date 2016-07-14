---
layout: shared/narrow
title: "Improve list scrolling performance"
description: "Fix juddering in list scrolling"
published_on: 2015-09-28
updated_on: 2015-09-28
order: 2
translation_priority: 1
authors:
  - megginkearney
notes:
  forcedsynclayout: "Forced synchronous layout occurs when the browser runs layout inside a script, and then does something that forces it to recalculate styles, thus requiring it to run layout again. This typically happens inside a loop, as seen in the code below, which iterates through an array of divs and resets their width properties, causing forced synchronous layout."
---
<p class="intro">
  During scrolling in the main screen of the <a href="http://udacity.github.io/news-aggregator">live site</a>, you'll notice that the story list judders. Also, you'll see that the individual story point indicators (the circled numbers) not only change values, but also change color. This exercise is about identifying these problems and deciding how to approach them.
</p>

Let's see what's really happening when we scroll the main screen, using the 
Timeline. In DevTools, start a recording, scroll down the list a bit, and 
then stop the recording.

In the recording's results, notice that the frames are way over the 
30fps line, not even close to hitting 60fps. In fact, the frames are so slow 
that the 60fps line isn't even shown on the graph.

<figure>
  <img src="images/image03.png" alt="Slow frames in Timeline recording">
</figure>

Zoom in on a frame and see that after the scroll event is a
function call, followed by many separate layout events.
Each separate layout event includes a red warning triangle.
This is a sure sign that a
<i>forced synchronous layout</i> is occurring.

<figure>
  <img src="images/image01.png" alt="Forced synchronous layout">
</figure>

{% include shared/note.liquid list=page.notes.forcedsynclayout %}

{% highlight javascript %}
var newWidth = container.offsetWidth;
divs.forEach(function(elem, index, arr) {
    elem.style.width = newWidth;
})
{% endhighlight %}

There are many CSS properties that cause layout to happen;
see a list of properties and their pipeline effects at
[CSS Triggers](http://csstriggers.com/).

Look at the details of a layout event, and you can see that the forced 
synchronous layout warning is being produced by the 
`colorizeAndScaleStories` function in `app.js`.

![colorizeandscalestories.png](images/image00.png)

Let's examine that function.

{% highlight javascript %}
function colorizeAndScaleStories() {
  var storyElements = document.querySelectorAll('.story');
  // It does seem awfully broad to change all the
  // colors every time!
  for (var s = 0; s < storyElements.length; s++) {
    var story = storyElements[s];
    var score = story.querySelector('.story__score');
    var title = story.querySelector('.story__title');
    // Base the scale on the y position of the score.
    var height = main.offsetHeight;
    var mainPosition = main.getBoundingClientRect();
    var scoreLocation = score.getBoundingClientRect().top -
        document.body.getBoundingClientRect().top;
    var scale = Math.min(1, 1 - (0.05 * ((scoreLocation - 170) / height)));
    var opacity = Math.min(1, 1 - (0.5 * ((scoreLocation - 170) / height)));
    score.style.width = (scale * 40) + 'px';
    score.style.height = (scale * 40) + 'px';
    score.style.lineHeight = (scale * 40) + 'px';
    // Now figure out how wide it is and use that to saturate it.
    scoreLocation = score.getBoundingClientRect();
    var saturation = (100 * ((scoreLocation.width - 38) / 2));
    score.style.backgroundColor = 'hsl(42, ' + saturation + '%, 50%)';
    title.style.opacity = opacity;
  }
}
{% endhighlight %}

Notice that `height`, `width`, and `line-height` are accessed, all of which 
which cause layout to run. Opacity is also set and -- while an opacity change 
doesn't trigger layout -- this line of code applies a new style, which 
triggers recalculate and, again, layout. These two techniques used in the 
function's main loop are causing the forced synchronous layout problem.

Next, consider the visual effect on the story point indicators, which doesn't 
add any informational value. We could achieve the effect with CSS properties 
instead of JavaScript, but we might be better off dropping the effect 
completely. The takeaway: sometimes the best code fix is code removal.

Let's remove the calls to the `colorizeAndScaleStories` function 
(at lines 89 and 305 in app.js), as well as the entire function itself 
(lines 255-286, shown above), so the story points will now look the same 
all the time.

Run the app again and take a Timeline recording of some scrolling activity, 
and then zoom in on a scroll event. This time, you'll see that there is only 
one style recalculation after the scroll, and that the frames are all well 
under the 60fps line, which is now shown on the graph.

<figure>
  <img src="images/image02.png" alt="Much better Timeline recording">
</figure>

The extra layouts and their forced synchronous layout warnings are gone, and 
frame rate is excellent. One jank problem solved!
