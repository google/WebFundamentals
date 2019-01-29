project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Use the shortcut Ctrl + Shift + E to run a block of highlighted code in the Sources Panel.

{# wf_updated_on: 2015-07-16 #}
{# wf_published_on: 2015-07-16 #}
{# wf_tags: devtools #}
{# wf_featured_image: /web/updates/images/2015-07-17-select-and-execute-a-block-of-code-in-the-sources-panel/run-highlighted-code-block.gif #}

# Select and execute a block of code in the Sources Panel {: .page-title }

{% include "web/_shared/contributors/umarhansa.html" %}


<img src="/web/updates/images/2015-07-17-select-and-execute-a-block-of-code-in-the-sources-panel/run-highlighted-code-block.gif" alt="Select and execute a block of code in the Sources Panel">

You can use the shortcut <kbd class="kbd">Ctrl + Shift + E</kbd> to run a block of highlighted code in the Sources Panel. In the clip, I am paused at a breakpoint, and want to access a bunch of variables attached to the <code>this</code> keyword. I select the block where they're defined and change:

<pre>
<code>this.foo = 'hello'
this.bar = 'world'</code></pre>

Into

<pre>
<code>foo = 'hello'
bar = 'world'</code></pre>

Finally, I execute that changed block of code so I have <code>foo</code> and <code>bar</code> in scope and can use them while debugging.




		


