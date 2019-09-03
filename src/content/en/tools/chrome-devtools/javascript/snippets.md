project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Snippets are small scripts that you can author and execute within the Sources panel of Chrome DevTools. You can access and run them from any page. When you run a Snippet, it executes from the context of the currently open page.

{# wf_updated_on: 2019-07-03 #}
{# wf_published_on: 2015-10-12 #}
{# wf_blink_components: Platform>DevTools #}

# Run Snippets Of JavaScript On Any Page With Chrome DevTools {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

[scratchpad]: https://developer.mozilla.org/en-US/docs/Tools/Scratchpad

If you find yourself running the same code in the [**Console**](/web/tools/chrome-devtools/console/) repeatedly, 
consider saving the code as a Snippet instead. Snippets are scripts that you author in the 
[**Sources** panel](/web/tools/chrome-devtools/sources). They have access to the page's JavaScript context, and
you can run them on any page. Snippets are an alternative to [bookmarklets](https://en.wikipedia.org/wiki/Bookmarklet).
Firefox DevTools has a feature similar to Snippets called [Scratchpad][scratchpad]{: .external }.

For example, **Figure 1** shows the DevTools homepage on the left and some Snippet source code
on the right. 

<figure>
  <img src="/web/tools/chrome-devtools/javascript/imgs/snippetexamplebefore.png"
       alt="How the page looks before running the Snippet."/>
  <figcaption>
    <b>Figure 1</b>. How the page looks before running the Snippet.
  </figcaption>
</figure>

Here's the Snippet source code from **Figure 1**:

    console.log('Hello, Snippets!');
    document.body.innerHTML = '';
    var p = document.createElement('p');
    p.textContent = 'Hello, Snippets!';
    document.body.appendChild(p);

**Figure 2** shows how the page looks after running the Snippet. The **Console Drawer** 
pops up to display the <code>Hello, Snippets!</code> message that the Snippet logs,
and the page's content changes completely.

<figure>
  <img src="/web/tools/chrome-devtools/javascript/imgs/snippetexampleafter.png"
       alt="How the page looks after running the Snippet."/>
  <figcaption>
    <b>Figure 2</b>. How the page looks after running the Snippet.
  </figcaption>
</figure>

## Open the Snippets pane {: #open }

The **Snippets** pane lists your Snippets. When you want to edit a Snippet, you need to open
it from the **Snippets** pane.

<figure>
  <img src="/web/tools/chrome-devtools/javascript/imgs/snippetspane.png"
       alt="The Snippets pane."/>
  <figcaption>
    <b>Figure 3</b>. The <b>Snippets</b> pane.
  </figcaption>
</figure>

### Open the Snippets pane with a mouse {: #openmouse }

1. Click the **Sources** tab to open the **Sources** panel. The **Page** pane usually opens
   by default.

     <figure>
       <img src="/web/tools/chrome-devtools/javascript/imgs/emptysources.png"
            alt="The Sources panel with the Page pane open on the left."/>
       <figcaption>
         <b>Figure 4</b>. The <b>Sources</b> panel with the <b>Page</b> pane open on the left.
       </figcaption>
     </figure>

1. Click the **Snippets** tab to open the **Snippets** pane. You might need to click
   **More Tabs** ![More Tabs](/web/tools/chrome-devtools/images/shared/more-tabs.png){: .inline-icon }
   in order to access the **Snippets** option.

### Open the Snippets pane with the Command Menu {: #opencommandmenu }

1. Focus your cursor somewhere inside of DevTools.
1. Press <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> or
   <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) to open the Command Menu.
1. Start typing `Snippets`, select **Show Snippets**, and then press <kbd>Enter</kbd> to
   run the command.

     <figure>
       <img src="/web/tools/chrome-devtools/javascript/imgs/showsnippets.png"
            alt="The Show Snippets command."/>
       <figcaption>
         <b>Figure 5</b>. The <b>Show Snippets</b> command.
       </figcaption>
     </figure>

## Create Snippets {: #create }

### Create a Snippet through the Sources panel {: #createsources }

1. [Open the **Snippets** pane](#open).
1. Click **New snippet**.
1. Enter a name for your Snippet then press <kbd>Enter</kbd> to save.

     <figure>
       <img src="/web/tools/chrome-devtools/javascript/imgs/snippetname.png"
            alt="Naming a Snippet."/>
       <figcaption>
         <b>Figure 6</b>. Naming a Snippet.
       </figcaption>
     </figure>

### Create a Snippet through the Command Menu {: #createcommandmenu }

1. Focus your cursor somewhere inside of DevTools.
1. Press <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> or
   <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) to open the Command Menu.
1. Start typing `Snippet`, select **Create new snippet**, then press <kbd>Enter</kbd> to
   run the command.

     <figure>
       <img src="/web/tools/chrome-devtools/javascript/imgs/createsnippetcommand.png"
            alt="The command for creating a new Snippet."/>
       <figcaption>
         <b>Figure 7</b>. The command for creating a new Snippet.
       </figcaption>
     </figure>

See [Rename Snippets](#rename) if you'd like to give your new Snippet a custom name.

## Edit Snippets {: #edit }

1. [Open the **Snippets** pane](#open).
1. In the **Snippets** pane click the name of the Snippet that you want to edit in order
   to open it in the **Code Editor**.

     <figure>
       <img src="/web/tools/chrome-devtools/javascript/imgs/editor.png"
            alt="The Code Editor."/>
       <figcaption>
         <b>Figure 8</b>. The <b>Code Editor</b>.
       </figcaption>
     </figure>

1. Use the **Code Editor** to add JavaScript to your Snippet.
1. When there's an asterisk next to the name of your Snippet it means you have unsaved code.
   Press <kbd>Control</kbd>+<kbd>S</kbd> or <kbd>Command</kbd>+<kbd>S</kbd> (Mac) to save.

     <figure>
       <img src="/web/tools/chrome-devtools/javascript/imgs/unsavedsnippet.png"
            alt="An asterisk next to the Snippet name, which indicates unsaved code."/>
       <figcaption>
         <b>Figure 9</b>. An asterisk next to the Snippet name, which indicates unsaved code.
       </figcaption>
     </figure>

## Run Snippets {: #run }

### Run a Snippet from the Sources panel {: #runsources }

1. [Open the **Snippets** pane](#open).
1. Click the name of the Snippet that you want to run. The Snippet opens in the **Code Editor**.
1. Click **Run Snippet** ![Run Snippet](imgs/runsnippet.png){: .inline-icon }, or press
   <kbd>Control</kbd>+<kbd>Enter</kbd> or <kbd>Command</kbd>+<kbd>Enter</kbd> (Mac).

### Run a Snippet with the Command Menu {: #runcommandmenu }

1. Focus your cursor somewhere inside of DevTools.
1. Press <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> or
   <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) to open the Command Menu.
1. Delete the `>` character and type the `!` character followed by the name of the Snippet that you want to run.

     <figure>
       <img src="/web/tools/chrome-devtools/javascript/imgs/runsnippetcommand.png"
            alt="Running a Snippet from the Command Menu."/>
       <figcaption>
         <b>Figure 10</b>. Running a Snippet from the Command Menu.
       </figcaption>
     </figure>

1. Press <kbd>Enter</kbd> to run the Snippet.

## Rename Snippets {: #rename }

1. [Open the **Snippets** pane](#open).
1. Right-click the Snippet name and select **Rename**.

## Delete Snippets {: #delete }

1. [Open the **Snippets** pane](#open).
1. Right-click the Snippet name and select **Remove**.

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
