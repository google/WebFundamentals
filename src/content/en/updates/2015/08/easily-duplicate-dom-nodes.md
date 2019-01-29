project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: You can easily change the DOM without having to edit the HTML as a giant string.

{# wf_updated_on: 2015-08-19 #}
{# wf_published_on: 2015-08-09 #}
{# wf_tags: devtools #}
{# wf_featured_image: /web/updates/images/2015-08-10-duplicate-dom-nodes/duplicate-dom.gif #}

# Easily duplicate DOM nodes {: .page-title }

{% include "web/_shared/contributors/umarhansa.html" %}


<img src="/web/updates/images/2015-08-10-duplicate-dom-nodes/duplicate-dom.gif" alt="Duplicate DOM nodes">

<em>These are essentially cut/copy and paste operations.</em>

You can easily change the DOM without having to edit the HTML as a giant string.

1. Right click on a node and select <em>Copy</em>.
2. You can paste in your code editor, or for prototyping, you can paste the DOM node elsewhere in the DOM tree. The pasted node is inserted as a child of the currently selected node. In the video, I use the left arrow key to jump to the immediate parent opening tag and paste there (which is what I do in most cases).

You can also Cut (right click &gt; Cut, Cmd + x/Ctrl + x) a DOM node and paste - which has the effect of moving the node.

<em>Experiment:</em> Try adding more links in the header/footer of a site using this copy and paste technique and figure out at which point the layout needs improving.


