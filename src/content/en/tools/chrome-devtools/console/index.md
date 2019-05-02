project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: The main uses of the Chrome DevTools Console are logging messages and running JavaScript.

{# wf_updated_on: 2019-04-18 #}
{# wf_published_on: 2019-04-18 #}
{# wf_blink_components: Platform>DevTools #}

# Console Overview {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

This page explains how the Chrome DevTools Console makes it easier to develop web pages.
The Console has 2 main uses: [viewing logged messages](#view) and [running JavaScript](#javascript).

## Viewing logged messages {: #view }

Web developers often log messages to the Console to make sure that their JavaScript is working as expected.
To log a message, you insert an expression like `console.log('Hello, Console!')` into your JavaScript.
When the browser executes your JavaScript and sees an expression like that, it knows that it's supposed to
log the message to the Console. For example, suppose that you're in the process of writing the HTML and
JavaScript for a page:

    <!doctype html>
    <html>
      <head>
        <title>Console Demo</title>
      </head>
      <body>
        <h1>Hello, World!</h1>
        <script>
          console.log('Loading!');
          const h1 = document.querySelector('h1');
          console.log(h1.textContent);
          console.assert(document.querySelector('h2'), 'h2 not found!');
          const artists = [
            {
              first: 'René',
              last: 'Magritte'
            },
            {
              first: 'Chaim',
              last: 'Soutine'
            },
            {
              first: 'Henri',
              last: 'Matisse'
            }
          ];
          console.table(artists);
          setTimeout(() => {
            h1.textContent = 'Hello, Console!';
            console.log(h1.textContent);
          }, 3000);
        </script>
      </body>
    </html>

**Figure 1** shows what the Console looks like after loading the page and waiting 3 seconds. Try to figure out which
lines of code caused the browser to log the messages.

<figure>
  <img src="/web/tools/chrome-devtools/console/images/overviewlogging.png"
       alt="The Console panel."/>
  <figcaption>
    <b>Figure 1</b>. The Console panel.
  </figcaption>
</figure>

Web developers log messages for 2 general reasons:

* Making sure that code is executing in the right order.
* Inspecting the values of variables at a certain moment in time.

See [Get Started With Logging Messages](/web/tools/chrome-devtools/console/log) to get hands-on experience
with logging. See the [Console API Reference](/web/tools/chrome-devtools/console/api) to browse the full list
of `console` methods. The main difference between the methods is how they display the data
that you're logging.

## Running JavaScript {: #javascript }

The Console is also a [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop){: .external }.
You can run JavaScript in the Console to interact with the page that you're inspecting. For example, **Figure 2**
shows the Console next to the DevTools homepage, and **Figure 3** shows that same page after using the Console
to change the page's title.

<figure>
  <img src="/web/tools/chrome-devtools/console/images/overviewjs1.png"
       alt="The Console panel next to the DevTools homepage."/>
  <figcaption>
    <b>Figure 2</b>. The Console panel next to the DevTools homepage.
  </figcaption>
</figure>

<figure>
  <img src="/web/tools/chrome-devtools/console/images/overviewjs2.png"
       alt="Using the Console to change the page's title."/>
  <figcaption>
    <b>Figure 3</b>. Using the Console to change the page's title.
  </figcaption>
</figure>

[window]: https://developer.mozilla.org/en-US/docs/Web/API/Window
[map]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
[utils]: /web/tools/chrome-devtools/console/utilities#debugfunction

Modifying the page from the Console is possible because the Console has full access to the 
page's [`window`][window]{: .external }. DevTools has a few convenience functions that make it easier to
inspect a page. For example, suppose that your JavaScript contains a function called `hideModal`. Running
`debug(hideModal)` pauses your code on the first line of `hideModal` the next time that it's called. See
[Console Utilities API Reference][utils] to see the full list of utility functions.

When you run JavaScript you don't have to interact with the page. You can 
use the Console to try out new code that's not related to the page. For example, suppose you just learned
about the built-in JavaScript Array method [`map()`][map]{: .external }, and you want to experiment with it.
The Console is a good place to try out the function.

See [Get Started With Running JavaScript](/web/tools/chrome-devtools/console/javascript) to get hands-on
experience with running JavaScript in the Console.

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
