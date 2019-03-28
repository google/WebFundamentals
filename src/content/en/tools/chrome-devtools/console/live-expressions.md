project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: If you find yourself typing the same JavaScript expressions into the Console repeatedly, try Live Expressions instead.

{# wf_updated_on: 2019-04-04 #}
{# wf_published_on: 2019-04-04 #}
{# wf_blink_components: Platform>DevTools #}

# Watch JavaScript Expression Values In Real-Time With Live Expressions {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

If you find yourself typing the same JavaScript expression in the Console repeatedly, you might
find it easier to create a **Live Expression**. With **Live Expressions** you type an expression once
and then pin it to the top of your Console. The value of the expression updates in near real-time.

## Create a Live Expression {: #create }

[icon]: /web/tools/chrome-devtools/console/images/createliveexpression.png

1. [Open the Console](/web/tools/chrome-devtools/console/reference#open).
1. Click **Create Live Expression** ![Create Live Expression][icon]{: .inline-icon }. The **Live Expression**
   text box appears.

     <figure>
       <img src="/web/tools/chrome-devtools/console/images/liveexpressiontextbox.png"
            alt="Typing document.activeElement into the Live Expression text box."/>
       <figcaption>
         <b>Figure X</b> Typing <code>document.activeElement</code> into the <b>Live Expression</b> text box.
       </figcaption>
     </figure>

1. Type <kbd>Control</kbd>+<kbd>Enter</kbd> or <kbd>Command</kbd>+<kbd>Enter</kbd> (Mac) to save the
   expression, or click outside of the **Live Expression** text box.



## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
