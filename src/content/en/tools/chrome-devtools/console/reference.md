project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: A comprehensive reference on every feature and behavior related to the Console UI in Chrome DevTools.

{# wf_updated_on: 2019-04-18 #}
{# wf_published_on: 2019-04-18 #}
{# wf_blink_components: Platform>DevTools #}

[commandmenu]: /web/tools/chrome-devtools/command-menu/

# Console Reference {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

[API]: /web/tools/chrome-devtools/console/api
[utilities]: /web/tools/chrome-devtools/console/utilities
[tutorial]: /web/tools/chrome-devtools/console/get-started

This page is a reference of features related to the Chrome DevTools Console. It assumes
that you're already familiar with using the Console to view logged messages and run JavaScript. If not, see
[Get Started][tutorial].

If you're looking for the API reference on functions like `console.log()` see [Console API Reference][API].
For the reference on functions like `monitorEvents()` see [Console Utilities API Reference][utilities].

## Open the Console {: #open }

You can open the Console as a [panel](#panel) or as a [tab in the Drawer](#drawer).

### Open the Console panel {: #panel }

Press <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>J</kbd> or
<kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>J</kbd> (Mac).

<figure>
  <img src="/web/tools/chrome-devtools/console/images/panel.png"
       alt="The Console panel."/>
  <figcaption>
    <b>Figure 1</b>. The Console panel.
  </figcaption>
</figure>

To open the Console panel from the [Command Menu][commandmenu], start typing `Console` and then
run the **Show Console** command that has the **Panel** badge next to it.

<figure>
  <img src="/web/tools/chrome-devtools/console/images/showpanelcommand.png"
       alt="The command for showing the Console panel."/>
  <figcaption>
    <b>Figure 2</b>. The command for showing the Console panel.
  </figcaption>
</figure>

### Open the Console tab in the Drawer {: #drawer }

[mainmenu]: /web/tools/chrome-devtools/images/shared/main-menu.png

Press <kbd>Escape</kbd> or click **Customize And Control DevTools**
![Customize And Controls DevTools][mainmenu]{: .inline-icon } and then select
**Show Console Drawer**.

<figure>
  <img src="/web/tools/chrome-devtools/console/images/showconsoledrawer.png"
       alt="Show Console Drawer."/>
  <figcaption>
    <b>Figure 3</b>. Show Console Drawer.
  </figcaption>
</figure>

The Drawer pops up at the bottom of your DevTools window, with the **Console** tab open.

<figure>
  <img src="/web/tools/chrome-devtools/console/images/drawer.png"
       alt="The Console tab in the Drawer."/>
  <figcaption>
    <b>Figure 4</b>. The Console tab in the Drawer.
  </figcaption>
</figure>

To open the Console tab from the [Command Menu][commandmenu], start typing `Console` and then
run the **Show Console** command that has the **Drawer** badge next to it.

<figure>
  <img src="/web/tools/chrome-devtools/console/images/showdrawercommand.png"
       alt="The command for showing the Console tab in the Drawer."/>
  <figcaption>
    <b>Figure 5</b>. The command for showing the Console tab in the Drawer.
  </figcaption>
</figure>

### Open Console Settings {: #settings }

[settings]: /web/tools/chrome-devtools/console/images/settingsbutton.png

Click **Console Settings** ![Console Settings][settings]{: .inline-icon }.

<figure>
  <img src="/web/tools/chrome-devtools/console/images/consolesettings.png"
       alt="Console Settings."/>
  <figcaption>
    <b>Figure 6</b>. Console Settings.
  </figcaption>
</figure>

The links below explain each setting:

* [**Hide Network**](#network)
* [**Preserve Log**](#persist)
* [**Selected Context Only**](#filtercontext)
* [**Group Similar**](#group)
* [**Log XmlHttpRequests**](#xhr)
* [**Eager Evaluation**](#eagereval)
* [**Autocomplete From History**](#autocomplete)

### Open the Console Sidebar {: #sidebar }

[showsidebar]: images/showconsolesidebar.png

Click **Show Console Sidebar** ![Show Console Sidebar][showsidebar]{: .inline-icon } to show the Sidebar,
which is useful for filtering.

<figure>
  <img src="/web/tools/chrome-devtools/console/images/sidebar.png"
       alt="Console Sidebar."/>
  <figcaption>
    <b>Figure 7</b>. Console Sidebar.
  </figcaption>
</figure>

## View messages {: #view }

This section contains features that change how messages are presented in the
Console. See [View messages](/web/tools/chrome-devtools/console/get-started#view) for a hands-on
walkthrough.

### Disable message grouping {: #group }

[Open Console Settings](#settings) and disable **Group similar** to disable the Console's
default message grouping behavior. See [Log XHR and Fetch requests](#xhr) for an example.

### Log XHR and Fetch requests {: #xhr }

[Open Console Settings](#settings) and enable **Log XMLHttpRequests** to log all
`XMLHttpRequest` and `Fetch` requests to the Console as they happen.

<figure>
  <img src="/web/tools/chrome-devtools/console/images/xhrgrouped.png"
       alt="Logging XMLHttpRequest and Fetch requests."/>
  <figcaption>
    <b>Figure 8</b>. Logging <code>XMLHttpRequest</code> and <code>Fetch</code> requests.
  </figcaption>
</figure>

The top message in **Figure X** shows the Console's default grouping behavior. **Figure X** shows
how the same log looks after [disabling message grouping](#group).

<figure>
  <img src="/web/tools/chrome-devtools/console/images/xhrungrouped.png"
       alt="How the logged XMLHttpRequest and Fetch requests look after ungrouping."/>
  <figcaption>
    <b>Figure 9</b>. How the logged <code>XMLHttpRequest</code> and <code>Fetch</code> requests
    look after ungrouping.
  </figcaption>
</figure>

### Persist messages across page loads {: #persist }

By default the Console clears whenever you load a new page. To persist messages across page loads,
[Open Console Settings](#settings) and then enable the **Preserve Log** checkbox.

### Hide network messages {: #network }

By default the browser logs network messages to the **Console**. For example, the top message
in **Figure X** represents a 404.

<figure>
  <img src="/web/tools/chrome-devtools/console/images/404.png"
       alt="A 404 message in the Console."/>
  <figcaption>
    <b>Figure 10</b>. A 404 message in the Console.
  </figcaption>
</figure>

To hide network messages:

1. [Open Console Settings](#settings).
1. Enable the **Hide Network** checkbox.

## Filter messages {: #filter }

There are many ways to filter out messages in the Console.

### Filter out browser messages {: #browser }

[Open the Console Sidebar](#sidebar) and click **User Messages** to only show messages that came from the page's
JavaScript.

<figure>
  <img src="/web/tools/chrome-devtools/console/images/usermessages.png"
       alt="Viewing user messages."/>
  <figcaption>
    <b>Figure 11</b>. Viewing user messages.
  </figcaption>
</figure>

### Filter by log level {: #level }

DevTools assigns each `console.*` method a severity level. There are 4 levels: `Verbose`, `Info`,
`Warning`, and `Error`. For example, `console.log()` is in the `Info` group, whereas
`console.error()` is in the `Error` group. The [Console API Reference][API] describes the severity
level of each applicable method. Every message that the browser logs to the Console has a 
severity level too. You can hide any level of messages that you're not interested in.
For example, if you're only interested in `Error` messages, you can hide the other 3 groups.

Click the **Log Levels** dropdown to enable or disable `Verbose`, `Info`, `Warning` or 
`Error` messages.

<figure>
  <img src="/web/tools/chrome-devtools/console/images/loglevels.png"
       alt="The Log Levels dropdown."/>
  <figcaption>
    <b>Figure 12</b>. The <b>Log Levels</b> dropdown.
  </figcaption>
</figure>

You can also filter by log level by [opening the Console Sidebar](#sidebar) and then clicking
**Errors**, **Warnings**, **Info**, or **Verbose**.

<figure>
  <img src="/web/tools/chrome-devtools/console/images/sidebarwarnings.png"
       alt="Using the Sidebar to view warnings."/>
  <figcaption>
    <b>Figure 13</b>. Using the Sidebar to view warnings.
  </figcaption>
</figure>

### Filter messages by URL {: #url }

Type `url:` followed by a URL to only view messages that came from that URL.
After you type `url:` DevTools shows all relevant URLs. Domains also work. For example, if
`https://example.com/a.js` and `https://example.com/b.js` are logging messages,
`url:https://example.com` enables you to focus on the messages from these 2 scripts.

<figure>
  <img src="/web/tools/chrome-devtools/console/images/urlfilter.png"
       alt="A URL filter."/>
  <figcaption>
    <b>Figure 14</b>. A URL filter.
  </figcaption>
</figure>

Type `-url:` to hide messages from that URL. This is called a negative URL filter.

<figure>
  <img src="/web/tools/chrome-devtools/console/images/negativeurlfilter.png"
       alt="A negative URL filter. DevTools is hiding all messages that match the URL
            https://b.wal.co"/>
  <figcaption>
    <b>Figure 15</b>. A negative URL filter. DevTools is hiding all messages that match the URL
    <code>https://b.wal.co</code>.
  </figcaption>
</figure>

You can also show messages from a single URL by [opening the Console Sidebar](#sidebar), expanding the
**User Messages** section, and then clicking the URL of the script containing the messages you want to focus on.

<figure>
  <img src="/web/tools/chrome-devtools/console/images/negativeurlfilter.png"
       alt="Viewing the messages that came from wp-ad.min.js."/>
  <figcaption>
    <b>Figure 16</b>. Viewing the messages that came from <code>wp-ad.min.js</code>.
  </figcaption>
</figure>

### Filter out messages from different contexts {: #filtercontext }

Suppose that you've got an ad on your page. The ad is embedded in an `<iframe>` and is generating
a lot of messages in your Console. Because this ad is in a different [JavaScript
context](#context), one way to hide its messages is to [open Console Settings](#settings)
and enable the **Selected Context Only** checkbox.

### Filter out messages that don't match a regular expression pattern {: #regex }

Type a regular expression such as `/[gm][ta][mi]/` in the **Filter** text box to filter out
any messages that don't match that pattern. DevTools checks if the pattern is found in the
message text or the script that caused the message to be logged.

<figure>
  <img src="/web/tools/chrome-devtools/console/images/regexfilter.png"
       alt="Filtering out any messages that don't match /[gm][ta][mi]/."/>
  <figcaption>
    <b>Figure 17</b>. Filtering out any messages that don't match <code>/[gm][ta][mi]/</code>.
  </figcaption>
</figure>

## Run JavaScript {: #js }

This section contains features related to running JavaScript in the Console.
See [Run JavaScript](/web/tools/chrome-devtools/console/get-started#javascript) for a hands-on
walkthrough.

### Re-run expressions from history {: #history }

Press the <kbd>Up Arrow</kbd> key to cycle through the history of JavaScript expressions that you ran
earlier in the Console. Press <kbd>Enter</kbd> to run that expression again.

### Watch an expression's value in real-time with Live Expressions {: #live }

[liveexpressions]: /web/tools/chrome-devtools/console/live-expressions

If you find yourself typing the same JavaScript expression in the Console repeatedly, you might
find it easier to create a **Live Expression**. With **Live Expressions** you type an expression once
and then pin it to the top of your Console. The value of the expression updates in near real-time.
See [Watch JavaScript Expression Values In Real-Time With Live Expressions][liveexpressions].

### Disable Eager Evaluation {: #eagereval }

As you type JavaScript expressions in the Console, **Eager Evaluation** shows a preview of that expression's
return value. [Open Console Settings](#settings) and disable the **Eager Evaluation** checkbox to turn off
the return value previews.

### Disable autocomplete from history {: #autocomplete }

As you type out an expression, the Console's autocomplete popup shows expressions that you ran earlier. These
expressions are prepended with the `>` character. [Open Console Settings](#settings) and disable the
**Autocomplete From History** checkbox to stop showing expressions from your history.

<figure>
  <img src="/web/tools/chrome-devtools/console/images/historyautocomplete.png"
       alt="The autocomplete popup showing expressions from history."/>
  <figcaption>
    <b>Figure 18</b>. <code>document.querySelector('a')</code> and <code>document.querySelector('img')</code>
    are expressions that were evaluated earlier.
  </figcaption>
</figure>

### Select JavaScript context {: #context }

By default the **JavaScript Context** dropdown is set to **top**, which represents the
main document's [browsing context](https://developer.mozilla.org/en-US/docs/Glossary/Browsing_context){: .external }.

<figure>
  <img src="/web/tools/chrome-devtools/console/images/jscontext.png"
       alt="The JavaScript Context dropdown."/>
  <figcaption>
    <b>Figure 19</b>. The <b>JavaScript Context</b> dropdown.
  </figcaption>
</figure>

Suppose you have an ad on your page embedded in an `<iframe>`. You want to run JavaScript in order
to tweak the ad's DOM. To do this, you first need to select the ad's browsing context from the
**JavaScript Context** dropdown.

<figure>
  <img src="/web/tools/chrome-devtools/console/images/selectcontext.png"
       alt="Selecting a different JavaScript context."/>
  <figcaption>
    <b>Figure 20</b>. Selecting a different JavaScript context.
  </figcaption>
</figure>

## Clear the Console {: #clear }

You can use any of the following workflows to clear the Console:

[clear]: /web/tools/chrome-devtools/console/images/clearconsole.png

* Click **Clear Console** ![Clear Console][clear]{: .inline-icon }.
* Right-click a message and then select **Clear Console**.
* Type `clear()` in the Console and then press <kbd>Enter</kbd>.
* Call `console.clear()` from your webpage's JavaScript.
* Press <kbd>Control</kbd>+<kbd>L</kbd> while the Console is in focus.

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
