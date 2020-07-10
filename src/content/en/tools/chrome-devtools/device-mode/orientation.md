project_path: /web/tools/chrome-devtools/_project.yaml
book_path: /web/tools/chrome-devtools/_book.yaml
description: Open the Sensors tab and go to the "Orientation" section.

{# wf_updated_on: 2020-07-10 #}
{# wf_published_on: 2018-12-18 #}
{# wf_blink_components: Platform>DevTools #}

# Simulate Device Orientation With Chrome DevTools {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

[guide]: /web/fundamentals/native-hardware/device-orientation/

To simulate different [device orientations][guide] from Chrome DevTools:

1. Press <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) or
   <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Windows, Linux, Chrome OS) to open the **Command Menu**.

     <figure>
       <img src="/web/tools/chrome-devtools/images/shared/command-menu.png"
            alt="The Command Menu."/>
       <figcaption>
         <b>Figure 1</b>. The Command Menu
       </figcaption>
     </figure>

1. Type `sensors`, select **Show Sensors**, and press <kbd>Enter</kbd>.
   The **Sensors** tab opens up at the bottom of your DevTools window.

[alpha]: /web/fundamentals/native-hardware/device-orientation/#alpha
[beta]: /web/fundamentals/native-hardware/device-orientation/#beta
[gamma]: /web/fundamentals/native-hardware/device-orientation/#gamma

1. From the **Orientation** list select one of the preset orientations, like **Portrait upside down**,
   or select **Custom orientation** to provide your own exact orientation.

     <figure>
       <img src="/web/tools/chrome-devtools/device-mode/imgs/portrait-upside-down.png"
            alt="Selecting 'Portrait upside down' from the 'Orientation' list."/>
       <figcaption>
         <b>Figure 2</b>. Selecting <b>Portrait upside down</b> from the <b>Orientation</b> list</b>
       </figcaption>
     </figure>

    After selecting **Custom orientation** the **alpha**, **beta**, and **gamma** fields are enabled.
    See [Alpha][alpha], [Beta][beta], and [Gamma][gamma] to understand how these axes work.
 
    You can also set a custom orientation by dragging the **Orientation Model**. Hold <kbd>Shift</kbd>
    before dragging to rotate along the **alpha** axis.
 
    <figure>
      <img src="/web/tools/chrome-devtools/device-mode/imgs/orientation-model.png"
           alt="The Orientation Model."/>
      <figcaption>
        <b>Figure 3</b>. The <b>Orientation Model</b>
      </figcaption>
    </figure>

## Feedback {: #feedback .hide-from-toc }

{% include "web/_shared/helpful.html" %}
