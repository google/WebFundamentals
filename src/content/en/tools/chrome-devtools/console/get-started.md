project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: TODO

{# wf_updated_on: 2018-02-13 #}
{# wf_published_on: 2018-02-06 #}
{# wf_blink_components: Platform>DevTools #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# Get Started with the Console {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

TODO

Caution: If you get stuck on any of the sections in this tutorial, in other words if your
results differ from what you see here, go to [Troubleshooting checklist](#troubleshooting).

## View messages {: #view }

TODO

### Step X: View messages from the page's JavaScript {: #javascript }

As a web developer, you can log messages from your JavaScript to the **Console**.

1. Press <kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>J</kbd> (Mac) or
   <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>J</kbd> (Windows, Linux, Chrome OS) to open the
   **Console**.
1. Click **Log a message**. You should see the text `click listener executed` get logged to the
   **Console**.

     {% framebox width="auto" height="auto" enable_widgets="true" %}
       <button>Log a message</button>
       <script>
         document.querySelector('button').addEventListener('click', () => {
           console.log('click listener executed');
         });
       </script>
     {% endframebox %}

#### How it works {: #TODO }

This message is logged to the **Console** because there is a call to `console.log()` in the
button's click event listener.

    document.querySelector('button').addEventListener('click', () => {
      console.log('click listener executed');
    });

### Step X: View messages with different severity levels {: #levels }

When you log a message to the **Console** from your JavaScript, you can specify the severity
level of your message. The UI of the message changes depending on what level you choose.

1. Click the **console.debug()** button, then look at your **Console**. If your **Console** is
   set to its default settings, you won't see anything.

     {% framebox width="auto" height="auto" enable_widgets="true" %}
       <button>console.debug()</button>
       <script>
         var button = document.querySelector('button');
         button.addEventListener('click', () => {
           console.debug('debug');
         });
       </script>
     {% endframebox %}

1. If you didn't see anything, click the **Severity Level** dropdown and enable **Verbose**. You
   should now see the text `debug` in your **Console**.

     <figure>
       <img src="TODO" alt="The Severity Level dropdown, outlined in blue."/>
       <figcaption>
         <b>Figure X</b>. The <b>Severity Level</b> dropdown, outlined in blue
       </figcaption>
     </figure>

1. Click the **console.log()**, **console.info()**, and **console.debug()** buttons and then
   check your **Console** to see how the **Console** displays these other message types.

     {% framebox width="auto" height="auto" enable_widgets="true" %}
       <style>
         button { margin: 1em; }
       </style>
       <button>console.log()</button>
       <button>console.info()</button>
       <button>console.warn()</button>
       <button>console.error()</button>
       <script>
         var buttons = document.querySelectorAll('button');
         buttons[0].addEventListener('click', () => {
           console.log('log');
         });
         buttons[1].addEventListener('click', () => {
           console.info('info');
         });
         buttons[2].addEventListener('click', () => {
           console.warn('warn');
         });
         buttons[3].addEventListener('click', () => {
           console.error('error');
         });
       </script>
     {% endframebox %}

1. Click **Expand** ![The Expand icon][expand]{:.cdt-inl} next to `warn` and `error` to see
   the [call stack][callstack]{:.external} leading up to messages.

[expand]: /web/tools/chrome-devtools/images/shared/expand.png
[callstack]: https://developer.mozilla.org/en-US/docs/Glossary/Call_stack

### Step X: View messages from the browser {: #browser }

The browser can also log messages to the Console.

1. Click **Cause the browser to log a message**.

     {% framebox width="auto" height="auto" enable_widgets="true" %}
       <button>Cause the browser to log a message</button>
       <script>
         document.querySelector('button').addEventListener('click', () => {
           document.querySelector('p').textContent =
               'this will fail because there is no p element.';
         });
       </script>
     {% endframebox %}

## Troubleshooting checklist {: #troubleshooting }
