project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: When you set a breakpoint, you can make it conditional based on the result of an expression.

{# wf_updated_on: 2015-07-16 #}
{# wf_published_on: 2015-07-16 #}
{# wf_tags: devtools #}
{# wf_featured_image: /web/updates/images/2015-07-17-set-a-breakpoint-based-on-a-certain-condition/conditional-breakpoint.gif #}

# Set a breakpoint based on a certain condition {: .page-title }

{% include "web/_shared/contributors/umarhansa.html" %}


<img src="/web/updates/images/2015-07-17-set-a-breakpoint-based-on-a-certain-condition/conditional-breakpoint.gif" alt="Set a breakpoint based on a certain condition">

When you set a breakpoint, you can make it conditional based on the result of an expression. Right click on the line gutter and select <em>Add Conditional Breakpoint</em> and enter your expression.


If you have a callback like:

<pre>
<code>function callback(result, err) {
    //set a conditional breakpoint based on the existence of err
}
</code>
</pre>

You could set a conditional breakpoint based on the existence of <code>err</code>.




		


