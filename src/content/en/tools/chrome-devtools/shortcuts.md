project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: A reference of all of the keyboard shortcuts in Chrome DevTools.

{# wf_updated_on: 2017-09-05 #}
{# wf_published_on: 2015-04-29 #}

# Keyboard Shortcuts Reference {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/kaycebasques.html" %}

This page is a reference of keyboard shortcuts in Chrome DevTools.

You can also find shortcuts in tooltips. Hover over a UI element of DevTools
to display its tooltip. If the element has a shortcut, the tooltip includes it.

## Keyboard shortcuts for opening DevTools {: #open }

To open DevTools, press the following keyboard shortcuts while your cursor is focused
on the browser viewport:

<table>
  <thead>
      <th>Action</th>
      <th>Mac</th>
      <th>Windows / Linux</th>
  </thead>
  <tbody>
    <tr>
      <td>Open whatever panel you used last</td>
      <td><kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>I</kbd></td>
      <td><kbd>F12</kbd> or <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd></td>
    </tr>
    <tr>
      <td>Open the <b>Console</b> panel</td>
      <td><kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>J</kbd></td>
      <td><kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>J</kbd></td>
    </tr>
  </tbody>
</table>

## Global keyboard shortcuts {: #global }

The following keyboard shortcuts are available in most, if not all, DevTools panels.

<table>
  <thead>
      <th>Action</th>
      <th>Mac</th>
      <th>Windows / Linux</th>
  </thead>
  <tbody>
    <tr>
      <td>Show <b>Settings</b></td>
      <td><kbd>?</kbd> or <kbd>Function</kbd>+<kbd>F1</kbd></td>
      <td><kbd>?</kbd> or <kbd>F1</kbd></td>
    </tr>
    <tr>
      <td>Focus the next panel</td>
      <td><kbd>Command</kbd>+<kbd>]</kbd></kbd></td>
      <td><kbd>Control</kbd>+<kbd>]</kbd></kbd></td>
    </tr>
    <tr>
      <td>Focus the previous panel</td>
      <td><kbd>Command</kbd>+<kbd>[</kbd></td>
      <td><kbd>Control</kbd>+<kbd>[</kbd></td>
    </tr>
    <tr>
      <!-- TODO make a bug about this shortcut being ambiguous -->
      <td>
        Switch back to whatever <a href="/web/tools/chrome-devtools/ui#placement">docking position</a> you last used.
        If DevTools has been in its default position for the entire session, then this shortcut undocks
        DevTools into a separate window
      </td>
      <td><kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>D</kbd></td>
      <td><kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>D</kbd></td>
    </tr>
    <tr>
      <td>Toggle <b><a href="/web/tools/chrome-devtools/device-mode/">Device Mode</a><b></td>
      <td><kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd></td>
      <td><kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd></td>
    </tr>
    <tr>
      <!-- TODO: Link "Inspect Element Mode" when a good section exists. -->
      <td>Toggle <b>Inspect Element Mode</b></td>
      <td><kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>C</kbd></td>
      <td><kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>C</kbd></td>
    </tr>
    <tr>
      <td>Open the <b><a href="/web/tools/chrome-devtools/ui#command-menu">Command Menu</a></b></td>
      <td><kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd></td>
      <td><kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd></td>
    </tr>
    <tr>
      <td>Toggle the <b><a href="/web/tools/chrome-devtools/ui#drawer">Drawer</a></b></td>
      <td><kbd>Escape</kbd></td>
      <td><kbd>Escape</kbd></td>
    </tr>
    <tr>
      <td>Normal reload</td>
      <td><kbd>Command</kbd>+<kbd>R</kbd></td>
      <td><kbd>F5</kbd> or <kbd>Control</kbd>+<kbd>R</kbd></td>
    </tr>
    <tr>
      <td>Hard reload</td>
      <td><kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>R</kbd></td>
      <td><kbd>Control</kbd>+<kbd>F5</kbd> or <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>R</kbd></td>
    </tr>
    <tr>
      <td>
        Search for text within the current panel. Not supported in the <b>Audits</b>, <b>Application</b>, and <b>Security</b> panels
      </td>
      <td><kbd>Command</kbd>+<kbd>F</kbd></td>
      <td><kbd>Control</kbd>+<kbd>F</kbd></td>
    </tr>
    <tr>
      <td>Opens the <b>Search</b> tab in the <b><a href="/web/tools/chrome-devtools/ui#drawer">Drawer</a></b>, which lets you search for text across all loaded resources</td>
      <td><kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>F</kbd></td>
      <td><kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>F</kbd></td>
    </tr>
    <tr>
      <td>Open a file in the <b>Sources</b> panel</td>
      <td><kbd>Command</kbd>+<kbd>O</kbd> or <kbd>Command</kbd>+<kbd>P</kbd></td>
      <td><kbd>Control</kbd>+<kbd>O</kbd> or <kbd>Control</kbd>+<kbd>P</kbd></td>
    </tr>
    <tr>
      <td>Zoom in</td>
      <td><kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>+</kbd></td>
      <td><kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>+</kbd></td>
    </tr>
    <tr>
      <td>Zoom out</td>
      <td><kbd>Command</kbd>+<kbd>-</kbd></td>
      <td><kbd>Control</kbd>+<kbd>-</kbd></td>
    </tr>
    <tr>
      <td>Restore default zoom level</td>
      <td><kbd>Command</kbd>+<kbd>0</kbd></td>
      <td><kbd>Control</kbd>+<kbd>0</kbd></td>
    </tr>
    <tr>
      <td>Run snippet</td>
      <td>Press <kbd>Command</kbd>+<kbd>O</kbd> to open the <b><a href="/web/tools/chrome-devtools/ui#command-menu">Command Menu</a></b>, type <kbd>!</kbd> followed by the name of the script, then press <kbd>Enter</kbd></td>
      <td>Press <kbd>Control</kbd>+<kbd>O</kbd> to open the <b><a href="/web/tools/chrome-devtools/ui#command-menu">Command Menu</a></b>, type <kbd>!</kbd> followed by the name of the script, then press <kbd>Enter</kbd></td>
    </tr>
  </tbody>
</table>

## Elements panel keyboard shortcuts {: #elements }

<table>
  <thead>
      <th>Action</th>
      <th>Mac</th>
      <th>Windows / Linux</th>
  </thead>
  <tbody>
    <tr>
      <td>Undo change</td>
      <td><kbd>Command</kbd>+<kbd>Z</kbd></td>
      <td><kbd>Control</kbd>+<kbd>Z</kbd></td>
    </tr>
    <tr>
      <td>Redo change</td>
      <td><kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>Z</kbd></td>
      <td><kbd>Control</kbd>+<kbd>Y</kbd></td>
    </tr>
    <tr>
      <td>Select the element above / below the currently-selected element</td>
      <td><kbd>Up Arrow</kbd> / <kbd>Down Arrow</kbd></td>
      <td><kbd>Up Arrow</kbd> / <kbd>Down Arrow</kbd></td>
    </tr>
    <tr>
      <td>Expand the currently-selected node. If the node is already expanded, this shortcut selects the element below it</td>
      <td><kbd>Right Arrow</kbd></td>
      <td><kbd>Right Arrow</kbd></td>
    </tr>
    <tr>
      <td>Collapse the currently-selected node. If the node is already collapsed, this shortcut selects the element above it</td>
      <td><kbd>Left Arrow</kbd></td>
      <td><kbd>Left Arrow</kbd></td>
    </tr>
    <tr>
      <td>Expand or collapse the currently-selected node and all of its children</td>
      <td>Hold <kbd>Option</kbd> then click the arrow icon next to the element's name</td>
      <td>Hold <kbd>Control</kbd>+<kbd>Alt</kbd> then click the arrow icon next to the element's name</td>
    </tr>
    <tr>
      <td>Toggle <b>Edit Attributes</b> mode on the currently-selected element</td>
      <td><kbd>Enter</kbd></td>
      <td><kbd>Enter</kbd></td>
    </tr>
    <tr>
      <td>Select the next / previous attribute after entering <b>Edit Attributes</b> mode</td>
      <td><kbd>Tab</kbd> / <kbd>Shift</kbd>+<kbd>Tab</kbd></td>
      <td><kbd>Tab</kbd> / <kbd>Shift</kbd>+<kbd>Tab</kbd></td>
    </tr>
    <tr>
      <td>Hide the currently-selected element</td>
      <td><kbd>H</kbd></td>
      <td><kbd>H</kbd></td>
    </tr>
    <tr>
      <td>Toggle <b>Edit as HTML</b> mode on the currently-selected element</td>
      <td><kbd>Function</kbd>+<kbd>F2</kbd></td>
      <td><kbd>F2</kbd></td>
    </tr>
  </tbody>
</table>

### Styles pane keyboard shortcuts {: #styles }

<table>
  <thead>
      <th>Action</th>
      <th>Mac</th>
      <th>Windows / Linux</th>
  </thead>
  <tbody>
    <tr>
      <td>Go to the line where a property value is declared</td>
      <td>Hold <kbd>Command</kbd> then click the property value</td>
      <td>Hold <kbd>Control</kbd> then click the property value</td>
    </tr>
    <tr>
      <td>Cycle through the RBGA, HSLA, and Hex representations of a color value</td>
      <td>Hold <kbd>Shift</kbd> then click the <b>Color Preview</b> box next to the value</td>
      <td>Hold <kbd>Shift</kbd> then click the <b>Color Preview</b> box next to the value</td>
    </tr>
    <tr>
      <td>Select the next / previous property or value</td>
      <td>Click a property name or value then press <kbd>Tab</kbd> / <kbd>Shift</kbd>+<kbd>Tab</kbd></td>
      <td>Click a property name or value then press <kbd>Tab</kbd> / <kbd>Shift</kbd>+<kbd>Tab</kbd></td>
    </tr>
    <tr>
      <td>Increment / decrement a property value by 0.1</td>
      <td>Click a value then press <kbd>Option</kbd>+<kbd>Up Arrow</kbd> / <kbd>Option</kbd>+<kbd>Down Arrow</kbd></td>
      <td>Click a value then press <kbd>Alt</kbd>+<kbd>Up Arrow</kbd> / <kbd>Alt</kbd>+<kbd>Down Arrow</kbd></td>
    </tr>
    <tr>
      <td>Increment / decrement a property value by 1</td>
      <td>Click a value then press <kbd>Up Arrow</kbd> / <kbd>Down Arrow</kbd></td>
      <td>Click a value then press <kbd>Up Arrow</kbd> / <kbd>Down Arrow</kbd></td>
    </tr>
    <tr>
      <td>Increment / decrement a property value by 10</td>
      <td>Click a value then press <kbd>Shift</kbd>+<kbd>Up Arrow</kbd> / <kbd>Shift</kbd>+<kbd>Down Arrow</kbd></td>
      <td>Click a value then press <kbd>Shift</kbd>+<kbd>Up Arrow</kbd> / <kbd>Shift</kbd>+<kbd>Down Arrow</kbd></td>
    </tr>
    <tr>
      <td>Increment / decrement a property value by 100</td>
      <td>Click a value then press <kbd>Command</kbd>+<kbd>Up Arrow</kbd> / <kbd>Command</kbd>+<kbd>Down Arrow</kbd></td>
      <td>Click a value then press <kbd>Shift</kbd>+<kbd>Page Up</kbd> / <kbd>Shift</kbd>+<kbd>Page Down</kbd></td>
    </tr>
  </tbody>
</table>

## Sources panel keyboard shortcuts {: #sources }

<table>
  <thead>
      <th>Action</th>
      <th>Mac</th>
      <th>Windows / Linux</th>
  </thead>
  <tbody>
    <tr>
      <td>Pause script execution (if currently running) or resume (if currently paused)</td>
      <td><kbd>F8</kbd> or <kbd>Command</kbd>+<kbd>\</kbd></td>
      <td><kbd>F8</kbd> or <kbd>Control</kbd>+<kbd>\</kbd></td>
    </tr>
    <tr>
      <td>Step over next function call</td>
      <td><kbd>F10</kbd> or <kbd>Command</kbd>+<kbd>'</kbd></td>
      <td><kbd>F10</kbd> or <kbd>Control</kbd>+<kbd>'</kbd></td>
    </tr>
    <tr>
      <td>Step into next function call</td>
      <td><kbd>F11</kbd> or <kbd>Command</kbd>+<kbd>;</kbd></td>
      <td><kbd>F11</kbd> or <kbd>Control</kbd>+<kbd>;</kbd></td>
    </tr>
    <tr>
      <td>Step out of current function</td>
      <td><kbd>Shift</kbd>+<kbd>F11</kbd> or <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>;</kbd></td>
      <td><kbd>Shift</kbd>+<kbd>F11</kbd> or <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>;</kbd></td>
    </tr>
    <tr>
      <!-- TODO mention that it only works when paused on a line -->
      <td>Select the call frame below / above the currently-selected frame</td>
      <td><kbd>Control</kbd>+<kbd>.</kbd> / <kbd>Control</kbd>+<kbd>,</kbd></td>
      <td><kbd>Control</kbd>+<kbd>.</kbd> / <kbd>Control</kbd>+<kbd>,</kbd></td>
    </tr>
    <tr>
      <td>Save changes to local modifications</td>
      <td><kbd>Command</kbd>+<kbd>S</kbd></td>
      <td><kbd>Control</kbd>+<kbd>S</kbd></td>
    </tr>
    <tr>
      <td>Save all changes</td>
      <td><kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>S</kbd></td>
      <td><kbd>Control</kbd>+<kbd>Alt</kbd>+<kbd>S</kbd></td>
    </tr>
    <tr>
      <td>Go to line</td>
      <td><kbd>Control</kbd>+<kbd>G</kbd></td>
      <td><kbd>Control</kbd>+<kbd>G</kbd></td>
    </tr>
    <tr>
      <td>Jump to a line number of the currently-open file</td>
      <td>Press <kbd>Command</kbd>+<kbd>O</kbd> to open the <b><a href="/web/tools/chrome-devtools/ui#command-menu">Command Menu</a></b>, type <kbd>:</kbd> followed by the line number, then press <kbd>Enter</kbd></td>
      <td>Press <kbd>Control</kbd>+<kbd>O</kbd> to open the <b><a href="/web/tools/chrome-devtools/ui#command-menu">Command Menu</a></b>, type <kbd>:</kbd> followed the line number, then press <kbd>Enter</kbd></td>
    </tr>
    <tr>
      <td>Jump to a column of the currently-open file (for example line 5, column 9)</td>
      <td>Press <kbd>Command</kbd>+<kbd>O</kbd> to open the <b><a href="/web/tools/chrome-devtools/ui#command-menu">Command Menu</a></b>, type <kbd>:</kbd>, then the line number, then another <kbd>:</kbd>, then the column number, then press <kbd>Enter</kbd></td>
      <td>Press <kbd>Control</kbd>+<kbd>O</kbd> to open the <b><a href="/web/tools/chrome-devtools/ui#command-menu">Command Menu</a></b>, type <kbd>:</kbd>, then the line number, then another <kbd>:</kbd>, then the column number, then press <kbd>Enter</kbd></td>
    </tr>
    <tr>
      <td>Go to a function declaration (if currently-open file is HTML or a script), or a rule set (if currently-open file is a stylesheet)</td>
      <td>Press <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>O</kbd>, then type in the name of the declaration / rule set, or select it from the list of options</td>
      <td>Press <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>O</kbd>, then type in the name of the declaration / rule set, or select it from the list of options</td>
    </tr>
    <tr>
      <td>Close the active tab</td>
      <td><kbd>Option</kbd>+<kbd>W</kbd></td>
      <td><kbd>Alt</kbd>+<kbd>W</kbd></td>
    </tr>
  </tbody>
</table>

### Code Editor keyboard shortcuts {: #editor }

<table>
  <thead>
      <th>Action</th>
      <th>Mac</th>
      <th>Windows / Linux</th>
  </thead>
  <tbody>
    <tr>
      <td>Delete all characters in the last word, up to the cursor</td>
      <td><kbd>Option</kbd>+<kbd>Delete</kbd></td>
      <td><kbd>Control</kbd>+<kbd>Delete</kbd></td>
    </tr>
    <tr>
      <td>Add or remove a <a href="/web/tools/chrome-devtools/javascript/breakpoints#loc">line-of-code breakpoint</a></td>
      <td>Focus your cursor on the line and then press <kbd>Command</kbd>+<kbd>B</kbd></td>
      <td>Focus your cursor on the line and then press <kbd>Control</kbd>+<kbd>B</kbd></td>
    </tr>
    <tr>
      <td>Go to matching bracket</td>
      <td><kbd>Control</kbd>+<kbd>M</kbd></td>
      <td><kbd>Control</kbd>+<kbd>M</kbd></td>
    </tr>
    <tr>
      <td>Toggle single-line comment. If multiple lines are selected, DevTools adds a comment to the start of each line</td>
      <td><kbd>Command</kbd>+<kbd>/</kbd></td>
      <td><kbd>Control</kbd>+<kbd>/</kbd></td>
    </tr>
    <tr>
      <td>Select / de-select the next occurrence of whatever word the cursor is on. Each occurrence is highlighted simultaneously</td>
      <td><kbd>Command</kbd>+<kbd>D</kbd> / <kbd>Command</kbd>+<kbd>U</kbd></td>
      <td><kbd>Control</kbd>+<kbd>D</kbd> / <kbd>Control</kbd>+<kbd>U</kbd></td>
    </tr>
  </tbody>
</table>

## Performance panel keyboard shortcuts {: #performance }

<table>
  <thead>
      <th>Action</th>
      <th>Mac</th>
      <th>Windows / Linux</th>
  </thead>
  <tbody>
    <tr>
      <td>Start / stop recording</td>
      <td><kbd>Command</kbd>+<kbd>E</kbd></td>
      <td><kbd>Control</kbd>+<kbd>E</kbd></td>
    </tr>
    <tr>
      <td>Save recording</td>
      <td><kbd>Command</kbd>+<kbd>S</kbd></td>
      <td><kbd>Control</kbd>+<kbd>S</kbd></td>
    </tr>
    <tr>
      <td>Load recording</td>
      <td><kbd>Command</kbd>+<kbd>O</kbd></td>
      <td><kbd>Control</kbd>+<kbd>O</kbd></td>
    </tr>
  </tbody>
</table>

## Memory panel keyboard shortcuts {: #memory }

<table>
  <thead>
      <th>Action</th>
      <th>Mac</th>
      <th>Windows / Linux</th>
  </thead>
  <tbody>
    <tr>
      <td>Start / stop recording</td>
	  <td><kbd>Command</kbd>+<kbd>E</kbd></td>
	  <td><kbd>Control</kbd>+<kbd>E</kbd></td>
    </tr>
  </tbody>
</table>

## Console panel keyboard shortcuts {: #console }

<table>
  <thead>
      <th>Action</th>
      <th>Mac</th>
      <th>Windows / Linux</th>
  </thead>
  <tbody>
    <tr>
      <td>Accept autocomplete suggestion</td>
      <td><kbd>Right Arrow</kbd> or <kbd>Tab</kbd></td>
      <td><kbd>Right Arrow</kbd> or <kbd>Tab</kbd></td>
    </tr>
    <tr>
      <td>Reject autocomplete suggestion</td>
      <td><kbd>Escape</kbd></td>
      <td><kbd>Escape</kbd></td>
    </tr>
    <tr>
      <td>Get previous statement</td>
      <td><kbd>Up Arrow</kbd></td>
      <td><kbd>Up Arrow</kbd></td>
    </tr>
    <tr>
      <td>Get next statement</td>
      <td><kbd>Down Arrow</kbd></td>
      <td><kbd>Down Arrow</kbd></td>
    </tr>
    <tr>
      <td>Focus the <b>Console</b></td>
      <td><kbd>Control</kbd>+<kbd>`</kbd></td>
      <td><kbd>Control</kbd>+<kbd>`</kbd></td>
    </tr>
    <tr>
      <td>Clear the <b>Console</b></td>
      <td><kbd>Command</kbd>+<kbd>K</kbd> or <kbd>Option</kbd>+<kbd>L</kbd></td>
      <td><kbd>Control</kbd>+<kbd>L</kbd></td>
    </tr>
    <tr>
      <td>Force a multi-line entry. Note that DevTools should detect multi-line scenarios by default, so this shortcut is now usually unnecessary</td>
      <td><kbd>Command</kbd>+<kbd>Return</kbd></td>
      <td><kbd>Shift</kbd>+<kbd>Enter</kbd></td>
    </tr>
    <tr>
      <td>Execute</td>
      <td><kbd>Return</kbd></td>
      <td><kbd>Enter</kbd></td>
    </tr>
  </tbody>
</table>
