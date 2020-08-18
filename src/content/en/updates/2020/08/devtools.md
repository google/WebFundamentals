project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: New Media panel, Issues tab updates, emulate missing local fonts, inactive users and prefers-reduced-data.

{# wf_updated_on: 2020-08-20 #}
{# wf_published_on: 2020-08-20 #}
{# wf_tags: chrome86, devtools, devtools-whatsnew #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: New Media panel, Issues tab updates, emulate missing local fonts, inactive users and prefers-reduced-data. #}
{# wf_blink_components: Platform>DevTools #}

# What's New In DevTools (Chrome 86) {: .page-title }

{% include "web/_shared/contributors/jecelynyeen.html" %}


## New Media panel {: #media-panel }

DevTools now displays media players information in the [Media panel](/web/tools/chrome-devtools/media). 

![New Media panel](/web/updates/images/2020/08/media-panel.png)

Prior to the new media panel in DevTools, logging and debug information about video players could be found in chrome://media-internals.

The new Media panel provides an easier way to view events, logs, properties, and a timeline of frame decodes in the same browser tab as the video player itself. You can live view and inspect on potential issues quicker (e.g. why dropped frames are occuring, why javascript is interacting with the player in an unexpected way).

For engineers who are constantly testing video playback quality, working on a JavaScript front-end to a media player, or working on re-encoding tools, this new Media panel could greatly increase your productivity.


{# https://chromium.googlesource.com/devtools/devtools-frontend/+/bf98fea787a8c2db4e0763ae2095faf8112458eb #}

Chromium issues: [1018414](https://crbug.com/1018414)


## Issues tab updates {: #issues-tab }

The Issues banner on the Console panel is now replaced with a regular message. 

![Issues in console message](/web/updates/images/2020/08/issue-console-msg.png)

Third party issues are now hidden by default in the Issues tab. To view all issues including those originating from third parties, tick the newly added “Include third-party issues” checkbox.

![thrid party issues checkbox](/web/updates/images/2020/08/third-party-issues.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/bb660b996589727edf16be103343f91d38b571fa #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/dea8897a72d4954ec04723bb0bbdf5c90440a0f1 #}

Chromium issues: [1096481](https://crbug.com/1096481), [1068116](https://crbug.com/1068116), [1080589](https://crbug.com/1080589)


## Emulate missing local fonts {: #emulate-local-fonts }

Open the [Rendering tab](/web/tools/chrome-devtools/evaluate-performance/reference#rendering) and use the new “Disable local fonts” feature to emulate missing `local() sources in @font-face rules.

For example, when the font “Rubik” is installed on your device and the `@font-face src` rule uses it as a  `local()` font, Chrome uses the local font file from your device.

When “Disable local fonts” is ticked, DevTools ignores the `local()` fonts and fetches them from the network.

![Emulate missing local fonts](/web/updates/images/2020/08/disable-font.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/5b6a769ee19c084fdda6482d2d8f1ce9f7e37ac0  #}

Chromium issues: [384968](https://crbug.com/384968)


## Emulate inactive users {: #emulate-inactive-users }

The [Idle Detection API](https://web.dev/idle-detection) allows developers to detect inactive users and react on idle state changes. You can now use DevTools to emulate idle state changes in the Sensors tab for both the user state and the screen state instead of waiting for the actual idle state to change.

![Emulate inactive users](/web/updates/images/2020/08/emulate-idle.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0ab666a695bf08ffd479462c14e425f454b2b1a6  #}

Chromium issue: [1090802](https://crbug.com/1090802)


## Emulate `prefers-reduced-data` {: #emulate-prefers-reduced-data }

The [`prefers-reduced-data`](https://drafts.csswg.org/mediaqueries-5/#descdef-media-prefers-reduced-data) media query detects if the user prefers being served alternate content that uses less data for the page to be rendered.

You can now use DevTools to emulate the `prefers-reduced-data` media query.

**Notes: `prefers-reduced-data` is currently available behind
the chrome://flags/#enable-experimental-web-platform-features flag. You can see this emulation option only if the flag is enabled.

![Emulate prefers-reduced-data](/web/updates/images/2020/08/emulate-prefers-reduced-data.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/e7d0d2dc314502571a7bddffe70e78bc990c19fe #}

Chromium issues: [1096068](https://crbug.com/1096068)


## Support for new JavaScript features {: #javascript }
DevTools now has better support for some of the latest JavaScript language features:

- [Logical assignment operators](https://v8.dev/features/logical-assignment) - DevTools now supports logical assignment with the new operators `&&=`, `||=`, and `??=` in the Console and Source panels.
- Pretty-print [numeric separators](https://v8.dev/features/numeric-separators) - DevTools now properly pretty-prints the numeric separators in the Sources panel.

{# https://chromium.googlesource.com/devtools/devtools-frontend.git/+/c55849a7826fcabbae137b0f85cd44c93498581d #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ca50c1ef5f527bd1e8dd86b53278c7da62d25681 #}

Chromium issues: [1086817](https://crbug.com/1086817), [1080569](https://crbug.com/1080569)


## Lighthouse 6.2 in the Lighthouse panel {: #lighthouse }
The Lighthouse panel is now running Lighthouse 6.2. Lighthouse will now enhance the unused-javascript audit if a page has publicly-accessible JavaScript source maps. Check out the [release notes](https://github.com/GoogleChrome/lighthouse/releases/tag/v6.2.0) for a full list of all changes.

These are the new audits added in Lighthouse:
- **Avoid long main thread tasks**. Reports the longest tasks on the main thread, useful for identifying worst contributors to input delay.
- **Links are crawlable**. Check if the `href` attribute of anchor elements links to an appropriate destination, so the links can be discovered.
- **Unsized image elements** - Check if an explicit `width` and `height` is set on image elements. Explicit image size can reduce layout shifts and improve CLS.
- **Avoid non-composited animations**. Reports [non-composited animations](https://web.dev/non-composited-animations/) that appear janky and reduce CLS.
- **Listens for the `unload` events**. Reports the `unload` event. Consider using the `pagehide` or `visibilitychange` events instead as the `unload` event does not fire reliably.

{#  #}

Chromium issue: [772558](https://crbug.com/772558)


## Deprecation of “other origins” listing in the Service Workers pane {: #deprecate-sw-other-origins }

DevTools now provides a link to view the full list of service workers from other origins in a new browser tab - [chrome://serviceworker-internals/?devtools].

Previously DevTools displayed a list nested under the Application panel > Service workers.

![Link to other origins](/web/updates/images/2020/08/sw-other-origins.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/fbf20a6507edffeab481efedd1e8de710e4cbfbe #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/bb22c1539f01c02985b0b116cebde2143c0e1b75  #}

Chromium issue: [807440](https://crbug.com/807440)


## Show coverage summary for filtered items {: #filter-coverage-summary }
DevTools now recalculates and displays a summary of coverage information dynamically when filters are applied in the Coverage tab. Previously, the Coverage tab always displays a summary of all coverage information. 

The following example shows the coverage summary when no filter applied versus after applying filter by CSS type. 

![Coverage summary for filtered items](/web/updates/images/2020/08/coverage-compare.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend.git/+/d6a5f02987283478ffaec6af72a2da59fc552132 #}

Chromium issue: [1061385](https://crbug.com/1090802)


## New frame detailed view in Application panel {: #frame-detailed-view }
DevTools now show a detailed view for each frame. Access it by clicking a frame under the Frames menu in the Application panel.

![New frame detailed view in Application panel](/web/updates/images/2020/08/frame-details.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/760462e3a489859865956ea33d1afe5648418a73  #}

Chromium issue: [1093247](https://crbug.com/1093247) 

### Frame details for opened windows {: #pop-up-frame-details }

DevTools now displays opened windows / pop-ups under the frame tree as well. The frame detailed view of the opened windows includes additional security information.

![New frame detailed view in Application panel](/web/updates/images/2020/08/window-opener.png)

More security information will be added to the frame detailed view soon.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/3b4747f0e2791ad844c93b52c1758208e1e4789c #}

Chromium issue: [1107766](https://crbug.com/1107766) 


## Elements and Network panel updates {: #elements-network }

### Capture node screenshots via Elements panel context menu {: #capture-node-screenshot }

You can now capture node screenshots via the context menu in the Elements panel.

For example, you can take a screenshot of the table of content by right clicking the element and select “Capture node screenshot”.

![Capture node screenshots](/web/updates/images/2020/08/capture-node-screenshot.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6ac0cbc48c94ed3d62fd69b69b24f10f9797b913  #}

Chromium issue: [1100253](https://crbug.com/1100253)


### Auto-complete custom fonts in the Styles pane {: #auto-complete-custom-fonts }
Imported font faces are now added to the list of CSS auto-completion when editing the `font-family` property in the Style pane.

In this example, ‘Noto Sans’ is a custom font installed in the local machine. It is displayed in the CSS completion list. Previously, it was not.

![Auto-complete custom fonts](/web/updates/images/2020/08/font-auto-complete.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/86616f113ccfde9ecb5dc5aa32492d5befef9bfb #}

Chromium issue: [1106221](https://crbug.com/1106221)


### Human-readable `X-Client-Data` header values in the Network panel {: #x-client-data }

When inspecting a network resource in the Network panel, DevTools now formats any `X-Client-Data` header values in Headers pane as code.

The `X-Client-Data` HTTP header contains a list of experiment IDs and Chrome flags that are enabled in your browser. The raw header values look like opaque strings since they are base-64-encoded, serialized [protocol buffers](/protocol-buffers). To make the contents more transparent to developers, DevTools is now showing the decoded values.

![Human-readable `X-Client-Data` header values](/web/updates/images/2020/08/x-client-data.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4a0d19365ce453a259cde4e5e5929e978daeff72 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/e071c96e5d1fdf514e2c6a610a22efc35de00456 #}

Chromium issue: [1103854](https://crbug.com/1103854)


### Consistently display resource type in Network panel {: #redirect-resource-type }
DevTools now consistently display the same resource type as the original network request and append “/ Redirect” in it when redirection (status 302) happens. 

Previously DevTools changed the type to “Other” sometimes.

![Display redirect resource type](/web/updates/images/2020/08/network-redirect.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d7ae5672631ec3aba73a4a2664d097f48bfbbb5c #}

Chromium issue: [997694](https://crbug.com/997694)


### Clear buttons in the Elements and Network panels {: #clear-input-button }

You can now clear the filter input with the new clear button in the Network panel. Clear button also added for the filter in Style pane and search input in the Elements panel.

![Clear buttons in the Elements and Network panels](/web/updates/images/2020/08/clear-button.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/35375ae946fdf9e90f29795b10fa8f07c39b50b9 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend.git/+/f9bf91d74bdd2313b1294761203adb01932ea5fc  #}

Chromium issue: [1067184](https://crbug.com/1067184)


<<../../_shared/devtools-feedback.md>>

<<../../_shared/canary.md>>

<<../../_shared/discover.md>>

{% include "web/_shared/rss-widget-updates.html" %}
