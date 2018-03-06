project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: TODO

{# wf_updated_on: 2018-03-06 #}
{# wf_published_on: 2018-03-06 #}
{# wf_blink_components: Platform>DevTools #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# Get Started with the Console {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

This tutorial teaches you how to use the **Console** in Chrome DevTools.

The **Console** has two main functions:

* Viewing diagnostic information about the page. This information can come from the web
  developers that built the page, or from the browser.
* Running JavaScript. You can view and change the page's [DOM][DOM]{:.external} by typing
  JavaScript statements in the **Console**. Or, if you just want to experiment, you can
  use the **Console** as your code playground.

[DOM]: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction

Most of the sections in this tutorial are interactive. You're going to open up DevTools on
this very page in order to get hands-on experience with the **Console**.

Caution: If you get stuck on any of the sections in this tutorial, go to the [Troubleshooting
checklist](#troubleshooting).

## Step X: View messages {: #view }

Messages in the **Console** come from either the page's JavaScript, or from the browser.

### Part X: View messages from the page's JavaScript {: #page }

Web developers log messages to the Console by placing `console.log()` statements in their
code.

1. Press <kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>J</kbd> (Mac) or
   <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>J</kbd> (Windows, Linux, Chrome OS) to open the
   **Console** right here on this page.
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

This message is logged to the **Console** because there is a call to `console.log()` in the
button's [click event listener][events]{:.external}.

[events]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events

    document.querySelector('button').addEventListener('click', () => {
      console.log('click listener executed');
    });

### Part X: View messages with different severity levels {: #levels }

`console.log()` is only one of many of the functions that you can use to log messages to
the **Console**. The UI of the message changes depending on what severity level you choose.

1. Click the **DEBUG** button, then look at your **Console**. If your **Console** is
   set to its default settings, you won't see anything.

     {% framebox width="auto" height="auto" enable_widgets="true" %}
       <button>debug</button>
       <script>
         var button = document.querySelector('button');
         button.addEventListener('click', () => {
           console.debug('debug');
         });
       </script>
     {% endframebox %}

1. If you didn't see anything, click the **Default Levels** dropdown menu, and enable **Verbose**.
   You should now see the text `debug` in your **Console**. `console.debug()` messages are
   styled the same as `console.log()` ones.

1. Click the buttons below to see how the remaining message types are styled in the **Console**.
   `console.info()` messages are styled the same as `console.log()` and `console.debug()`.

     {% framebox width="auto" height="auto" enable_widgets="true" %}
       <style>
         button { margin: 1em; }
       </style>
       <button>info</button>
       <button>warn</button>
       <button>error</button>
       <script>
         var buttons = document.querySelectorAll('button');
         buttons[0].addEventListener('click', () => {
           console.info('info');
         });
         buttons[1].addEventListener('click', () => {
           console.warn('warn');
         });
         buttons[2].addEventListener('click', () => {
           console.error('error');
         });
       </script>
     {% endframebox %}

1. Click **Expand** ![The Expand icon][expand]{:.cdt-inl} next to `warn` and `error` to see
   the [call stack][callstack]{:.external} leading up to those messages.

[expand]: /web/tools/chrome-devtools/images/shared/expand.png
[callstack]: https://developer.mozilla.org/en-US/docs/Glossary/Call_stack

### Part X: View messages from the browser {: #browser }

The browser can also log messages to the Console.

1. Click **Throw Error**. The browser logs a `TypeError`.

     {% framebox width="auto" height="auto" enable_widgets="true" %}
       <button>Throw Error</button>
       <script>
         const button = document.querySelector('button');
         button.addEventListener('click', () => {
           const message = 'this declaration throws an error because there is no p element';
           document.querySelector('p').textContent = message;
         });
       </script>
     {% endframebox %}

1. Click **Throw 404**. The browser logs a `404 (Not Found)` error, as well as others.
   The browser throws these errors when a page tries to request a file that doesn't exist.

     {% framebox width="auto" height="auto" enable_widgets="true" %}
       <button>Throw 404</button>
       <script>
         const button = document.querySelector('button');
         button.addEventListener('click', () => {
           const url = "not/a/real/file.png";
           fetch(url);
         });
       </script>
     {% endframebox %}

### Part X: View styled messages {: #styles }

### Part X: Filter messages {: #filter }

On big sites, you'll sometimes see the **Console** get flooded with messages. The **Sidebar**
and the **Filter** text box are the main ways to reduce **Console** noise and find the messages
that are important to you.

## Step X: Run JavaScript {: #javascript }

## Next steps {: #next-steps }

Congrats, you now 

## Feedback {: #feedback }

<aside class="note"><b>Help me help you!</b> Please take a moment to provide feedback. I really
do monitor this data, and it helps me create better tutorials for you. --- Kayce</aside>

Was this tutorial helpful?


Did you learn anything new? Let me know in the text box below. The data is logged anonymously,
to a Google spreadsheet.

## Troubleshooting checklist {: #troubleshooting }
