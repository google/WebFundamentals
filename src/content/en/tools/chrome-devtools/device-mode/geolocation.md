project_path: /web/tools/chrome-devtools/_project.yaml
book_path: /web/tools/chrome-devtools/_book.yaml
description: Open the Sensors tab and select coordinates from the "Geolocation" list.

{# wf_updated_on: 2020-07-10 #}
{# wf_published_on: 2018-12-18 #}
{# wf_blink_components: Platform>DevTools #}

# Override Geolocation With Chrome DevTools {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Many websites take advantage of [user location](/web/fundamentals/native-hardware/user-location/)
in order to provide a more relevant experience for their users. For example, a weather website
might show the local forecast for a user's area, once the user has granted the website permission to
access their location.

If you're building a UI that changes depending on where the user is located, you probably want to
make sure that the site behaves correctly in different places around the world. To override
your geolocation in Chrome DevTools:

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
1. From the **Geolocation** list select one of the preset cities, like **Tokyo**,
   or select **Custom location** to enter custom longitude and latitude coordinates, or select
   **Location unavailable** to see how your site behaves when the user's location is not available.

     <figure>
       <img src="/web/tools/chrome-devtools/device-mode/imgs/tokyo.png"
            alt="Selecting 'Tokyo' from the 'Geolocation' list."/>
       <figcaption>
         <b>Figure 2</b>. Selecting <b>Tokyo</b> from the <b>Geolocation</b> list</b>
       </figcaption>
     </figure>

## Feedback {: #feedback .hide-from-toc }

{% include "web/_shared/helpful.html" %}
