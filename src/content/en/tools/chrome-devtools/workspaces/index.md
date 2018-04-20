project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: TODO

{# wf_blink_components: Platform>DevTools #}
{# wf_updated_on: 2018-04-19 #}
{# wf_published_on: 2018-04-10 #}

{# put links that are used multiple times here #}
[WF]: https://github.com/google/webfundamentals/issues/new

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# Save Changes To Disk With Workspaces {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

<aside class="objective">
  <b>Goal</b>: This tutorial teaches you how to set up and use the Workspaces feature in Chrome
  DevTools so that you can save changes that you make within DevTools to local copies of the
  same files on disk.
</aside>

<aside class="caution">
  <b>Prerequisites</b>: Before beginning this tutorial, you should know how to:
  <ul>
    <li>
      <a href="https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web"
      class="external">Use HTML, CSS, and JavaScript to build a web page</a>.
    </li>
    <li>
      <a href="/web/tools/chrome-devtools/css/">Use DevTools to make basic changes
      to CSS</a>.
    </li>
    <li>
      <a href="https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server#Running_a_simple_local_HTTP_server"
         class="external">Run a local HTTP web server</a>. For example, you
      should be familiar with a command like <code>python -m SimpleHTTPServer 8080</code>.
    </li>
  </ul>
</aside>

Workspaces enable you to save changes that you make in Devtools to a local copy of the same files
on your computer. For example, suppose:

* You have the source code for your site on your desktop.
* You're running a local web server from the source code directory, so that the
  site is accessible at `localhost:8080`.
* You've got `localhost:8080` open in Google Chrome, and you're using DevTools to change the
  site's CSS.

With Workspaces enabled, the CSS changes that you make within DevTools are saved to the
source code on your desktop. Does this all make sense?

{% framebox width="auto" height="auto" enable_widgets="true" %}
<script>
var label = 'Workspaces / Concept Makes Sense';
var url = 'https://github.com/google/webfundamentals/issues/new?title=[' +
      label + ']';
var no = `Sorry to hear that. Please <a href="${url}" target="_blank" rel="noopener">open a
  GitHub issue</a> and tell me what's confusing.`;
var feedback = {
  category: "DevTools",
  choices: [
    {
      button: {
        text: "Yes"
      },
      response: "Great!",
      analytics: {
        label: label,
        value: 1
      }
    },
    {
      button: {
        text: "No"
      },
      response: no,
      analytics: {
        label: label,
        value: 0
      }
    }
  ]
};
</script>
{% include "web/_shared/multichoice.html" %}
{% endframebox %}

Here's the recommended path for using this doc:

1. Read the [Unsupported frameworks](#limitations) section to make sure that Workspaces will work
   in your development environment.
1. Read the [Related feature: Local Overrides](#overrides) section. Local Overrides may be a
   better option for you, depending on your needs.
1. After you're sure that Workspaces is right for you, head to [Step 1: Setup](#setup) to
   get hands-on practice setting up Workspaces on a demo site. If you complete the tutorial,
   there may be a cake prize at the end.

## Limitations {: #limitations }

Warning: If the description below applies to your development environment, Workspaces probably
won't work for you.

In general, Workspaces doesn't work with any framework that automatically reloads a live preview
of a page when you make a change to its source code. Create React App is a notable example.
But, if you're feeling adventurous, please give it a try anyways and [let us know whether it
worked][WF]{:.external}. If you got it working but had to make adjustments, please describe what
you had to change. We'll update this doc to include your research and give you credit for the work.


## Related feature: Local Overrides {: #overrides }

[Local Overrides][LO] is another DevTools feature that is similar to Workspaces. Use **Local
Overrides** when you want to experiment with changes to a page, and you need to see those
changes across page loads, but you don't care about mapping your changes to the page's source
code.

[LO]: /web/updates/2018/01/devtools#overrides

## Step 1: Setup {: #setup }

### Set up the demo {: #demo }

1. <a href="https://glitch.com/edit/#!/remix/workspaces" class="external gc-analytics-event"
   data-category="DevTools" data-label="Workspaces / Opened Demo" data-value="1">Open the
   demo</a>. In the top-left of the editor, there is a randomly-generated project name.

     <figure>
       <img src="imgs/glitch.png"
            alt="A Glitch project with a randomly-generated name."/>
       <figcaption>
         <b>Figure X</b>. A Glitch project with a randomly-generated name
       </figcaption>
     </figure>

1. Click the randomly-generated project name. For example, in **Figure X** you would click
   `TODO`.
1. Select **Advanced Options** > **Download Project**.

     <figure>
       <img src="imgs/download.png"
            alt="The Download Project button."/>
       <figcaption>
         <b>Figure X</b>. The <b>Download Project</b> button, highlighted in blue
       </figcaption>
     </figure>

1. Close the tab.
1. Unzip the source code and move the unzipped `app` directory to your desktop.
1. Start a local web server in the `app` directory. Below is some sample code for starting
   up `SimpleHTTPServer`, but you can use whatever you prefer.

    <pre class="prettyprint">
    <code class="devsite-terminal">cd ~/Desktop/app</code>
    <code class="devsite-terminal">python -m SimpleHTTPServer</code>
    </pre>

1. Open a tab in Google Chrome and go to locally-hosted version of the site. You should be
   able to access it via a URL like `localhost:8080`. The exact [port number][port]{:.external}
   may be different.

     <figure>
       <img src="imgs/demo.png"
            alt="The demo."/>
       <figcaption>
         <b>Figure X</b>. The demo
       </figcaption>
     </figure>

[port]: https://en.wikipedia.org/wiki/Port_(computer_networking)#Use_in_URLs

### Set up DevTools {: #devtools }

1. Press <kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>J</kbd> (Mac) or 
   <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>J</kbd> (Windows, Linux, Chrome OS) to open
   the **Console** panel of DevTools.

     <figure>
       <img src="imgs/console.png"
            alt="The Console panel."/>
       <figcaption>
         <b>Figure X</b>. The <b>Console</b> panel
       </figcaption>
     </figure>

1. Click the **Sources** tab.
1. Click the **Filesystem** tab.

     <figure>
       <img src="imgs/filesystem.png"
            alt="The Filesystem tab."/>
       <figcaption>
         <b>Figure X</b>. The <b>Filesystem</b> tab
       </figcaption>
     </figure>

1. Click **Add Folder To Workspace**.
1. Select `~/Desktop/app`, which means the `app` directory on your desktop.
1. Click **Allow** to give DevTools permission to read and write to the directory.
   In the **Filesystem** tab, there is now a green dot next to `index.html`, `script.js`, and
   `styles.css`. These green dots mean that DevTools has established a mapping between the
   network resources of the page, and the files on your desktop.


     <figure>
       <img src="imgs/mapping.png"
            alt="The Filesystem tab now shows a mapping between the local files and the network
                 ones."/>
       <figcaption>
         <b>Figure X</b>. The <b>Filesystem</b> tab now shows a mapping between the local files
         and the network ones
       </figcaption>
     </figure>

## Step 2: Save a CSS change to disk {: #css }

1. Open `~/Desktop/app/styles.css` in a text editor. Notice how the `color` property of `h1`
   elements is set to `fuchsia`.

     <figure>
       <img src="imgs/fuchsia.png"
            alt="Viewing styles.css in a text editor."/>
       <figcaption>
         <b>Figure X</b>. Viewing <code>styles.css</code> in a text editor
       </figcaption>
     </figure>

1. Close the text editor.
1. Back in DevTools, click the **Elements** tab.
1. Change the value of the `color` property of the `<h1>` element to your favorite color.
   Remember that you need to click the `<h1>` element in the **DOM Tree** in order to see the
   CSS rules applied to it in the **Styles** pane. The green dot next to `styles.css:1` means
   that any change you make will get mapped to the copy of `styles.css` that's on your desktop.

     <figure>
       <img src="imgs/green.png"
            alt="Setting the color property of the h1 element to green."/>
       <figcaption>
         <b>Figure X</b>. Setting the <code>color</code> property of the <code>h1</code> element
         to <code>green</code>
       </figcaption>
     </figure>

1. Open `~/Desktop/app/styles.css` in a text editor again. The `color` property is now
   set to your favorite color.
1. Reload the page. The color of the `<h1>` element is still set to your favorite color. This
   works because when you made the change, DevTools saved the change to disk. And then, when you
   reloaded the page, your local server served the modified copy of the file from disk.

## Step X: Save an HTML change to disk {: #html }

### Try changing HTML from the Elements panel {: #elements }

Warning: The workflow that you're about to try doesn't work. You're trying it now so that
you don't waste time later trying to figure out why it's not working.

1. Click the **Elements** tab.
1. Double click the text content of the `h1` element, which says `Workspaces Demo`, and replace
   it with `I ❤️  Cake`.

     <figure>
       <img src="imgs/cake.png"
            alt="Attempting to change HTML from the DOM Tree of the Elements panel"/>
       <figcaption>
         <b>Figure X</b>. Attempting to change HTML from the <b>DOM Tree</b> of the <b>Elements</b>
         panel
       </figcaption>
     </figure>

1. Open `~/Desktop/app/index.html` in a text editor. The change that you just made isn't there.
1. Reload the page. The page reverts to its original title.

#### Optional: Why it doesn't work {: #why }

Note: This section describes why the workflow from [Try changing HTML from the Elements
panel](#elements) doesn't work. You can skip this section if you don't care why.

* The tree of nodes that you see on the **Elements** panel represents the page's
  [DOM][DOM]{:.external}.
* To display a page, a browser fetches HTML over the network, parses the HTML, and then
  converts it into a tree of DOM nodes.
* If the page has any JavaScript, that JavaScript may add, delete, or change DOM nodes. CSS
  can change the DOM, too, via the [`content`][content]{:.external} property.
* The browser eventually uses the DOM to determine what content it should present to browser
  users.
* Therefore, the final state of the page that users see may be very different from the HTML
  that the browser fetched.
* This makes it difficult for DevTools to resolve where a change made in the **Elements**
  panel should be saved, because the DOM is affected by HTML, JavaScript, and CSS.

In short, the **DOM Tree** `!==` HTML.

[content]: https://developer.mozilla.org/en-US/docs/Web/CSS/content

[DOM]: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction

### Change HTML from the Sources panel {: #sources }

If you want to save a change to the page's HTML, do it via the **Sources** panel.

1. Click the **Sources** tab.
1. Click the **Page** tab.
1. Click **(index)**. The HTML for the page opens.
1. Replace `<h1>Workspaces Demo</h1>` with `<h1>I ❤️  Cake</h1>`. See <b>Figure X</b>.
1. Press <kbd>Command</kbd>+<kbd>S</kbd> (Mac) or
   <kbd>Control</kbd>+<kbd>S</kbd> (Windows, Linux, Chrome OS) to save the change.
1. Reload the page. The `<h1>` element is still displaying the new text.

     <figure>
       <img src="imgs/cakehtml.png"
            alt="Changing HTML from the Sources panel."/>
       <figcaption>
         <b>Figure X</b>. Line 12 has been set to <code>I ❤️  Cake</code>
       </figcaption>
     </figure>

1. Open `~/Desktop/app/index.html`. The `<h1>` element contains the new text.

## Step 3: Save a JavaScript change to disk {: #js }

The **Sources** panel is also the place to make changes to JavaScript. But sometimes you need
to access other panels, such as the **Elements** panel or the **Console** panel, while making
changes to your site. There's a way to have the **Sources** panel open alongside other panels.

1. Click the **Elements** tab.
1. Press <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) or
   <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Windows, Linux, Chrome OS). The **Command
   Menu** opens.
1. Type `QS`, then select **Show Quick Sources**.

     <figure>
       <img src="imgs/commandmenu.png"
            alt="Opening the Quick Source tab via Command Menu."/>
       <figcaption>
         <b>Figure X</b>. Opening the <b>Quick Source</b> tab via the <b>Command Menu</b>
       </figcaption>
     </figure>

1. Press <kbd>Command</kbd>+<kbd>P</kbd> (Mac) or <kbd>Control</kbd>+<kbd>P</kbd> (Windows, Linux,
   Chrome OS) to open the **Open File** dialog.
1. Type `script`, then select **app/script.js**. The network copy of the file opens. The other
   copy that you see is the local copy on your desktop. In other words, what your seeing
   is the file that your local web server sent back when the browser requested `script.js`.

     <figure>
       <img src="imgs/open.png"
            alt="Opening script.js via the Open File dialog."/>
       <figcaption>
         <b>Figure X</b>. Opening <code>script.js</code> via the <b>Open File</b> dialog
       </figcaption>
     </figure>

1. Notice the `Save Changes To Disk With Workspaces` link in the demo. It's styled regularly.
1. Add the following code to the bottom of **script.js** via the **Quick Sources** tab.

    <pre class="prettyprint">
    console.log('greetings from script.js');
    <strong>document.querySelector('a').style = 'font-style:italic';</strong>
    </pre>

1. Press <kbd>Command</kbd>+<kbd>S</kbd> (Mac) or
   <kbd>Control</kbd>+<kbd>S</kbd> (Windows, Linux, Chrome OS) to save the change.
1. Reload the page. The link on the page is now italic.

     <figure>
       <img src="imgs/italic.png"
            alt="The link on the page is now italic."/>
       <figcaption>
         <b>Figure X</b>. The link on the page is now italic
       </figcaption>
     </figure>

## Next steps {: #next-steps }

Congratulations, you have completed the tutorial. Click the button below to receive your
cake prize.

{% framebox width="auto" height="auto" enable_widgets="true" %}
<style>
.note::before {
  content: "";
}
</style>
<script>
var label = 'Workspaces / Tutorial / Cake Dispensed';
var feedback = {
  "category": "DevTools",
  "choices": [
    {
      "button": {
        "text": "Dispense Cake"
      },
      "response": "🍰",
      "analytics": {
        "label": label
      }
    }
  ]
};
</script>
{% include "web/_shared/multichoice.html" %}
{% endframebox %}

Use what you have learned in this tutorial to set up Workspaces in your own project. If you run
into any issues, please [start a thread in the mailing list][ML]{:.external} or [ask a
question on Stack Overflow][SO]{:.external}.

[ML]: https://groups.google.com/forum/#!forum/google-chrome-developer-tools
[SO]: https://stackoverflow.com/questions/ask?tags=google-chrome-devtools 

## Feedback {: #feedback }

Hello, this is [Kayce][Kayce]{:.external}. I wrote this
tutorial. I hope you enjoyed your cake. Please take a moment to provide feedback.
I really do pay attention to the data, and it helps me create better tutorials for
you.

[Kayce]: https://twitter.com/kaycebasques

{% framebox width="auto" height="auto" enable_widgets="true" %}
<script>
var label = 'Workspaces / Helpful';
var url = 'https://github.com/google/webfundamentals/issues/new?title=[' +
      label + ']';
var no = `Sorry to hear that. Please <a href="${url}" target="_blank" rel="noopener">open a
  GitHub issue</a> and tell me how I can make it better.`;
var feedback = {
  category: "DevTools",
  question: "Was this tutorial helpful?",
  choices: [
    {
      button: {
        text: "Yes"
      },
      response: "Great! Thanks for the feedback.",
      analytics: {
        label: label,
        value: 1
      }
    },
    {
      button: {
        text: "No"
      },
      response: no,
      analytics: {
        label: label,
        value: 0
      }
    }
  ]
};
</script>
{% include "web/_shared/multichoice.html" %}
{% endframebox %}
