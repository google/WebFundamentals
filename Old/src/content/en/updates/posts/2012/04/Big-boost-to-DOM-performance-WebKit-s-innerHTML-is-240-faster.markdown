---
layout: updates/post
title: "Big boost to DOM performance - WebKit's innerHTML is 240% faster"
published_on: 2012-04-11
updated_on: 2012-04-11
authors:
  - samdutton
tags:
  - news
  - performance
  - dom
---
<p>We're very happy to see that some common DOM operations have just skyrocketed in speed. The changes were at the WebKit level, boosting performance for both Safari (JavaScriptCore) and Chrome (V8).</p>

<p>Chrome Engineer Kentaro Hara made seven code optimisations within WebKit; below are the results, which show just how much faster JavaScript DOM access has become:</p>

<div id="chart_div"  style="height: 350px;"></div>



<h2>DOM performance boosts summary</h2>

<ul>
<li><a title="WebKit bug and tests: div.innerHTML and div.outerHTML" href="https://bugs.webkit.org/show_bug.cgi?id=81214" target="_blank"><code>div.innerHTML</code> and <code>div.outerHTML</code> <b>performance improved by 2.4x</b></a> (V8, JavaScriptCore)

<li><a title="WebKit bug and tests: div.innerText and div.outerText" href="https://bugs.webkit.org/show_bug.cgi?id=81192" target="_blank"><code>div.innerText</code> and <code>div.outerText</code> performance in Chromium/Mac <b>by 4x</b></a> (V8/Mac)

<li><a title="WebKit bug and tests: CSS property accesses" href="https://bugs.webkit.org/show_bug.cgi?id=80250" target="_blank">CSS property accesses improved <b>by 35%</b></a> (JavaScriptCore)

    <li><a title="WebKit bug and tests: div.classList, div.dataset and div.attributes" href="https://bugs.webkit.org/show_bug.cgi?id=80376" target="_blank"><code>div.classList</code>, <code>div.dataset</code> and <code>div.attributes</code> perf improved by <b>up to 10.9x</b></a> (V8)</li>
    <li><a title="WebKit bug and tests: div.firstElementChild, div.lastElementChild, div.previousElementSibling and div.nextElementSibling" href="https://bugs.webkit.org/show_bug.cgi?id=80506" target="_blank"><code>div.firstElementChild</code>, <code>lastElementChild</code>, <code>previousElementSibling</code> and <code>nextElementSibling</code> perf improved <b>by 7.1x</b></a> (V8)</li>
   <li><a title="WebKit bug and tests: V8 DOM attributes" href="https://bugs.webkit.org/show_bug.cgi?id=80685" target="_blank">V8 DOM attributes access improved <b>by 4 ~ 5%</b></a> (V8)</li>
</ul>



<p>Below, Kentaro Hara gives details on some of the patches he made. The links are to WebKit bugs with test cases, so you can try out the tests for yourself. The changes were made between WebKit r109829 and r111133: Chrome 17 does not include them; Chrome 19 does.</p>

<h3><a title="WebKit bug and tests: div.innerHTML and div.outerHTML" href="https://bugs.webkit.org/show_bug.cgi?id=81214" target="_blank">Improve performance of <code>div.innerHTML</code> and <code>div.outerHTML</code> by 2.4x</a> (V8, JavaScriptCore)</h3>

<p>Previous behavior in WebKit:</p>
<ol>
    <li>Create a string for each tag.</li>
    <li>Append a created string to <code>Vector&lt;string&gt;</code>, parsing the DOM tree.</li>
    <li>After the parsing, allocate a string whose size is the sum of all strings in the <code>Vector&lt;string&gt;</code>.</li>
    <li>Concatenate all strings in <code>Vector&lt;string&gt;</code>, and return it as <code>innerHTML</code>.</li>
</ol>

<p>New behavior in WebKit:</p>
<ol>
    <li>Allocate one string, say S.</li>
    <li>Concatenate a string for each tag to S, incrementally parsing the DOM tree.</li>
    <li>Return S as <code>innerHTML</code>.</li>
</ol>

<p>In a nutshell, instead of creating a lot of strings and then concatenating them, the patch creates one string and then simply append strings incrementally.</p>

<h3><a title="WebKit bug and tests: div.innerText and div.outerText" href="https://bugs.webkit.org/show_bug.cgi?id=81192" target="_blank">Improve performance of <code>div.innerText</code> and <code>div.outerText</code> in Chromium/Mac by 4x</a> (V8/Mac)</h3>

<p>The patch just changed the initial buffer size for creating <code>innerText</code>. Changing the initial buffer size from 2^16 to 2^15 improved Chromium/Mac performance by 4x. This difference depends on the underlying malloc system.</p>

<h3><a title="WebKit bug and tests: CSS property accesses" href="https://bugs.webkit.org/show_bug.cgi?id=80250" target="_blank">Improve performance of CSS property accesses in JavaScriptCore by 35%</a></h3>

<p>(Note: This is a change for Safari, not for Chrome.)</p>

<p>A CSS property string (e.g. <code>.fontWeight</code>, <code>.backgroundColor</code>) is converted to an integer ID in WebKit. This conversion is heavy. The patch caches the conversion results in a map (i.e. a property string => an integer ID), so that the conversion won't be conducted multiple times.</p>


<h2>How do the tests work?</h2>

<p>They measure the time of property accesses. In case of <code>innerHTML</code> (the performance test in <a title="Link to WebKit bug and tests" href="bugs.webkit.org/show_bug.cgi?id=81214" target="_blank">bugs.webkit.org/show_bug.cgi?id=81214</a>), the test just measures the time to run the following code:</p>

{% highlight javascript %}
for (var i = 0; i < 1000000; i++)
    document.body.innerHTML;
{% endhighlight %}

<p>The performance test uses a large body copied from the HTML spec.</p>

<p>Similarly, the CSS property-accesses test measures the time of the following code:</p>

{% highlight javascript %}
var spanStyle = span.style;
for (var i = 0; i < 1000000; i++) {
    spanStyle.invalidFontWeight;
    spanStyle.invalidColor;
    spanStyle.invalidBackgroundColor;
    spanStyle.invalidDisplay;
}
{% endhighlight %}

<p>The good news is that Kentaro Hara believes more performance improvements will be possible for other important DOM attributes and methods.</p>

<p>Bring it on!</p>

<p>Kudos to Haraken and the rest of the team.</p>

Note: Demo removed
