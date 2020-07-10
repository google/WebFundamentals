project_path: /web/tools/chrome-devtools/_project.yaml
book_path: /web/tools/chrome-devtools/_book.yaml
description: Open the Command Menu and run the "Disable JavaScript" command.

{# wf_updated_on: 2020-07-10 #}
{# wf_published_on: 2019-01-31 #}
{# wf_blink_components: Platform>DevTools #}

# Disable JavaScript With Chrome DevTools {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

To see how a web page looks and behaves when JavaScript is disabled:

1. [Open Chrome DevTools](/web/tools/chrome-devtools/open).
1. Press <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> or
   <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) to open the **Command Menu**.

     <figure>
       <img src="/web/tools/chrome-devtools/images/shared/command-menu.png"
            alt="The Command Menu."/>
       <figcaption>
         <b>Figure 1</b>. The Command Menu
       </figcaption>
     </figure>

1. Start typing `javascript`, select **Disable JavaScript**, and then press <kbd>Enter</kbd>
   to run the command. JavaScript is now disabled.

     <figure>
       <img src="/web/tools/chrome-devtools/javascript/imgs/disable-javascript.png"
            alt="Selecting 'Disable JavaScript' in the Command Menu."/>
       <figcaption>
         <b>Figure 2</b>. Selecting <b>Disable JavaScript</b> in the Command Menu
       </figcaption>
     </figure>

     The yellow warning icon next to **Sources** reminds you that JavaScript is disabled.
 
     <figure>
       <img src="/web/tools/chrome-devtools/javascript/imgs/disabled-javascript-warning.png"
            alt="The warning icon next to Sources."/>
       <figcaption>
         <b>Figure 3</b>. The warning icon next to <b>Sources</b>
       </figcaption>
     </figure>

JavaScript will remain disabled in this tab so long as you have DevTools open.

You may want to reload the page to see if and how the page depends on JavaScript while loading.

To re-enable JavaScript:

* Open the Command Menu again and run the **Enable JavaScript** command.
* Close DevTools.

## Feedback {: #feedback .hide-from-toc }

{% include "web/_shared/helpful.html" %}
