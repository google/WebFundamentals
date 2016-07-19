


<p class="intro">
  Another issue that affects the app's smoothness is the janky scrolling when 
  stories are added to the list. Note the call to <code>loadStoryBatch</code> 
  in the <code>scroll</code> event listener code.
</p>

{% highlight javascript %}
main.addEventListener('scroll', function() {
  ...
  // Check if we need to load the next batch of stories.
  var loadThreshold = (main.scrollHeight - main.offsetHeight -
      LAZY_LOAD_THRESHOLD);
  if (main.scrollTop > loadThreshold)
    loadStoryBatch();
});
{% endhighlight %}

This function makes visible changes to the page by inserting new stories to the 
page as it's loaded, specifically by appending DOM nodes using `appendChild`. 
There's nothing inherently wrong in the function, nor in the design approach 
that uses it, but consider how it is being called.

The `loadStoryBatch` function is catch-as-catch-can; it runs whenever it 
needs to, based on the `loadThreshold` test, without regard to what else is 
going on in the page or where the browser is in the frame construction 
process. This is because the JavaScript engine pays no attention to the 
rendering pipeline when executing scripts. That immediacy will cause a 
performance problem, especially as more stories are added to the list. We 
can address this issue by using `requestAnimationFrame`.

{% include shared/note.liquid list=page.notes.raf %}


Ideally, anything that makes a visible change to the page should happen inside 
a `requestAnimationFrame` call. Let's make that modification to the `scroll` 
event listener code.

{% highlight javascript %}
main.addEventListener('scroll', function() {
  ...
  // Check if we need to load the next batch of stories.
  var loadThreshold = (main.scrollHeight - main.offsetHeight -
      LAZY_LOAD_THRESHOLD);
  if (main.scrollTop > loadThreshold)
    requestAnimationFrame(loadStoryBatch);
});
{% endhighlight %}

This simple change ensures that our animation-related script runs early in the 
pipeline process, and provides a small but significant performance boost.



