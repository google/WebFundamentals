project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Read about DevTools' new command menu and its over 60 actions that enable crazy fast workflows.

{# wf_updated_on: 2016-04-21 #}
{# wf_published_on: 2016-04-21 #}
{# wf_tags: devtools,digest,update #}
{# wf_featured_image: /web/updates/images/2016/04/devtools-digest/command-menu.png #}

# DevTools Digest: More Power with the New Command Menu {: .page-title }

{% include "web/_shared/contributors/pbakaus.html" %}



Read about DevTools' new <strong>command menu</strong> and its over 60 actions that enable crazy fast workflows.

## Cmd/Ctrl+Shift+P to bring up the Command Menu

![Command Menu in DevTools](/web/updates/images/2016/04/devtools-digest/command-menu.png)

The "Jump to File" dialog that appears when you press 
<kbd>Cmd</kbd>+<kbd>P</kbd> (or <kbd>Ctrl</kbd>+<kbd>P</kbd>) in the Sources panel isn't terribly well known, 
but has been around for a while. We've now went much further than that and 
developed a text-editor-inspired command menu that can drive almost every 
important action in DevTools.

Hit <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>
(or <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>) anywhere (even when the page 
is in focus!) to bring up the Command Menu, then type to filter and hit 
<kbd>Enter</kbd> to trigger the action. A few sample actions you could try:

  * Appearance: Switch to Dark Theme
  * DevTools: Dock to bottom
  * Mobile: Inspect Devices...
  * Network: Go offline

The new command menu is a super quick way to navigate and discover new settings and actions across DevTools.

Looking for the good old "Go to member" dialog that was previously also
associated with that shortcut? It is still there, just hit
<kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>O</kbd>
(or <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>O</kbd>) from now on.

## Pretty-print HTML

![Pretty HTML](/web/updates/images/2016/04/devtools-digest/pretty-html.jpg)

We've had pretty-print for JS and CSS sources built into the Sources panel for 
a while now, but have just extended it to supoort full-blown 
HTML pretty-printing. Give it a try – not only does it reformat the HTML, it 
also reformats the JavaScript and CSS within it!

- - -

As always, [let us know what you think via
Twitter](https://twitter.com/intent/tweet?text=%40ChromeDevTools) or the
comments below, and submit bugs to [crbug.com/new](https://crbug.com/new).

Until next month!
Paul Bakaus & the DevTools team


{% include "comment-widget.html" %}
