project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: TODO

{# wf_updated_on: 2018-03-07 #}
{# wf_published_on: 2018-03-06 #}
{# wf_blink_components: Platform>DevTools #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# Get Started with the Console {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

{% framebox width="0" height="0" enable_widgets="true" %}
  <script>
    console.log('%cWelcome to the Console!', 'font-weight:bold;color:#317efb;font-style:italic',
        'Read on to learn how messages like this get here.');
  </script>
{% endframebox %}

This tutorial teaches you how to use the **Console** in Chrome DevTools.

<figure>
  <img src="/web/tools/chrome-devtools/images/panels/console.png"
       alt="The Console."
  <figcaption><b>Figure X</b>. The <b>Console</b></figcaption>
</figure>

The **Console** has two main functions:

* Viewing diagnostic information about the page. This information can come from the web
  developers that built the page, or from the browser.
* Running JavaScript. You can view and change the page's [DOM][DOM]{:.external} by typing
  JavaScript statements in the **Console**. Or, if you just want to experiment, you can
  use the **Console** as your code playground to run code that is not related to the page at all.

[DOM]: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction

Most of the sections in this tutorial are interactive. You're going to open up DevTools on
this very page in order to get hands-on experience with the **Console**.

## Step X: View messages {: #view }

Messages in the **Console** come from either the page's JavaScript, or from the browser.

### Part X: View messages from the page's JavaScript {: #page }

The [**Console** API][API] lets you log messages from your JavaScript to the **Console**.

[API]: /web/tools/chrome-devtools/console/console-reference

1. Press <kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>J</kbd> (Mac) or
   <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>J</kbd> (Windows, Linux, Chrome OS) to open the
   **Console**, right here on this very page.
1. Click **Log A Message**. You should see the text `click listener executed` get logged to the
   **Console**. 

       {% framebox width="auto" height="auto" enable_widgets="true" %}
         <button>Log a message</button>
         <script>
           document.querySelector('button').addEventListener('click', () => {
             console.log('click listener executed');
           });
         </script>
       {% endframebox %}

     This message is logged to the **Console** because the button's `click` [event
     listener][events]{:.external} instructs the browser to run `console.log('click listener
     executed')` when the button is clicked.

1. To the right of the message there is a link. Click that link now. DevTools opens the
   **Sources** panel and shows you the line of code that caused the message to get logged.

1. Click the **Console** tab to go back to the **Console**.

1. The `console` object has other methods for printing messages. Click **Debug** to see how
   the **Console** prints `console.debug()` messages. If your **Console** is set to its
   default settings, you won't see any thing.

     {% framebox width="auto" height="auto" enable_widgets="true" %}
       <button>debug</button>
       <script>
         var button = document.querySelector('button');
         button.addEventListener('click', () => {
           console.debug('debug');
         });
       </script>
     {% endframebox %}

1. If you didn't see anything, click the dropdown menu that says **Default Levels** or **Custom
   Levels** and enable **Verbose**. You should now see the text `debug` in your **Console**.
   `console.debug()` messages are styled the same as `console.log()` ones.

     The **Console** displays messages in chronological order. The newest message is at the
     bottom.

1. Click the buttons below to see how the remaining message types --- `console.info()`,
   `console.warn()`, and `console.error()` --- are styled in the **Console**.

       {% framebox width="auto" height="auto" enable_widgets="true" %}
         <style>
           button { margin: 1em; }
         </style>
         <button>info</button>
         <button>warn</button>
         <button>error</button>
         <script>
           function exampleFunctionA() {
             console.warn('warn');
           }
           function exampleFunctionB() {
             console.error('error');
           }
           function exampleFunctionC(e) {
             e.target.textContent === 'warn' ? exampleFunctionA() : exampleFunctionB();
           }
           var buttons = document.querySelectorAll('button');
           buttons[0].addEventListener('click', () => {
             console.info('info');
           });
           buttons[1].addEventListener('click', exampleFunctionC);
           buttons[2].addEventListener('click', exampleFunctionC);
         </script>
       {% endframebox %}

     Use `console.warn()` to warn that something has happened that may cause problems.
     Use `console.error()` to call out a critical error.

1. Click **Expand** ![The Expand icon][expand]{:.cdt-inl} next to `warn` and `error` to see
   the [call stack][callstack]{:.external} leading up to those messages. The function at the
   bottom of the stack called the one above it.

[events]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events
[expand]: /web/tools/chrome-devtools/images/shared/expand.png
[callstack]: https://developer.mozilla.org/en-US/docs/Glossary/Call_stack

### Part X: View messages from the browser {: #browser }

The browser can also log messages to the Console. This usually occurs when you write incorrect
code.

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

     The browser throws this error when some JavaScript tries to access a DOM node that
     doesn't exist.

1. Click **Throw 404**. The browser logs a `404 (Not Found)` error, as well as others.

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

     The browser throws these errors when a page tries to request a file that doesn't exist.

### Part X: Filter messages {: #filter }

On big sites, you'll sometimes see the **Console** get flooded with messages. You can
filter the **Console** to only show messages that you care about.

1. Click **Log Numbers**. The **Console** prints out whether each number from 1 to 1000 is prime.
   Every third message is printed with `console.warn()`. In real life you should only use
   `console.warn()` for warning scenarios, but this is just a contrived example to demonstrate
   filtering.

       {% framebox width="auto" height="auto" enable_widgets="true" %}
         <button>Log Numbers</button>
         <script>
           const button = document.querySelector('button');
           button.addEventListener('click', () => {
             const isPrime = num => {
               for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
                 if (num % i === 0) return false;
               }
               return num !== 1;
             };
             for (let j = 1; j <= 1000; j++) {
               const label = isPrime(j) ? 'prime:' : 'not prime:';
               j % 3 === 0 ? console.warn(label, j) : console.log(label, j);
             }
           });
         </script>
       {% endframebox %}

1. Type `prime` in the **Filter** text box to only show the prime nu

## Step X: Run JavaScript {: #javascript }

### DOM

### Command-Line API

## Next steps {: #next-steps }

Congrats, you now 

## Feedback {: #feedback }

<aside class="note">
  <b>Help me help you!</b> Hi, I'm Kayce. I wrote this tutorial. Please take a moment to
  provide feedback. I really do monitor this data, and it helps me create better tutorials for
  you.
</aside>

Was this tutorial helpful?


Did you learn anything new? Let me know in the text box below. The data is logged anonymously,
to a Google spreadsheet.

## Troubleshooting checklist {: #troubleshooting }
