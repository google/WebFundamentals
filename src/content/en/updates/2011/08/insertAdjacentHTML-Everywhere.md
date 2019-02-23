project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml

{# wf_updated_on: 2019-01-16 #}
{# wf_published_on: 2011-08-27 #}
{# wf_tags: news,dom #}
{# wf_blink_components: N/A #}

# insertAdjacentHTML Everywhere {: .page-title }

{% include "web/_shared/contributors/paulkinlan.html" %}


<p>If we want to insert content in a HTML document we have three ways to do it:</p>
<ul>
<li>Using DOM methods like <code>createNode</code> and <code>appendChild</code></li>
<li>Using <a href="https://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-B63ED1A3">Document Fragments</a></li>
<li>Using <code>innerHTML</code></li>
</ul>
<p>One can arguably say we also have <code>document.write</code> for few use cases.</p>
<p>
<code>innerHTML</code> has been standardized in HTML5 and with it a brother method <code><a href="http://w3c.github.io/html/#insertadjacenthtml">insertAdjacentHTML</a></code> which works as <code>innerHTML</code> but allows us to define more specifically where we want to insert the HTML content: beforeBegin, afterBegin, beforeEnd and afterEnd.
</p>


    var ul = document.getElementById("list");
    ul.insertAdjacentHTML("beforeEnd", "&lt;li>A new li on the list.&lt;/li>");


<p>
Back in 2008 John Resig wrote <a href="https://johnresig.com/blog/dom-insertadjacenthtml/">an article about insertAdjacentHTML</a> with this conclusion:
</p>
<p>
<blockquote>
Having browsers implement this method will dramatically reduce the amount of code needed to write a respectable JavaScript library. I'm looking forward to the day in which this method is more-widely available (along with querySelectorAll) so that we can really buckle down and do some serious code simplification.
</blockquote>
<p>
Until now, the main issue with insertAdjacentHTML has been its lack of browser support. With Firefox <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=613662#c13">implementing insertAdjacentHTML</a> as of version 8, it will available in all major browsers including mobile browsers. If you want to use it now and make sure it works in Firefox versions earlier than 8 you can use this <a href="https://gist.github.com/eligrey/1276030">polyfill</a>.
</p>



{% include "web/_shared/helpful.html" %}
{% include "web/_shared/rss-widget-updates.html" %}
