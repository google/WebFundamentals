project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: New CSS Grid debugging tools, Web Authn tab, moveable tools and Computed sidebar pane.

{# wf_updated_on: 2020-10-01 #}
{# wf_published_on: 2020-10-01 #}
{# wf_tags: chrome7, devtools, devtools-whatsnew #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: New CSS Grid debugging tools, Web Authn tab, moveable tools and Computed sidebar pane. #}
{# wf_blink_components: Platform>DevTools #}

# What's New In DevTools (Chrome 87) {: .page-title }

{% include "web/_shared/contributors/jecelynyeen.html" %}


## New CSS Grid debugging tools {: #css-grid }
DevTools now has better support for CSS grid debugging! 

![CSS grid debugging](/web/updates/images/2020/10/devtools/01-css-grid.png)

When an HTML element on your page has `display: grid` or `display: inline-grid` applied to it, you can see a `grid` badge next to it in the **Elements** panel. Click the badge to toggle the display of a grid overlay on the page.

The new **Layout** pane has a **Grid** section offering you a number of options for viewing the grids. 

Check out the [documentation](/web/tools/chrome-devtools/css/grid) to learn more.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/a8ad63fbf77a6f4d937bc7ac34e6bdc0f8ee4936 #}

Chromium issue: [1047356](https://crbug.com/1047356) 

## New WebAuthn tab {: #webauthn }
You can now emulate authenticators and debug the [Web Authentication API](https://w3c.github.io/webauthn/) with the new [WebAuthn tab](/web/tools/chrome-devtools/webauthn).

Select **More options** > **More tools** > **WebAuthn** to open the WebAuthn tab.

![WebAuthn tab](/web/updates/images/2020/10/devtools/02-webauthn.png)

Prior to the new **WebAuthn** tab, there was no native WebAuthn debugging support on Chrome. Developers needed physical authenticators to test their web application with Web Authentication API. 

With the new **WebAuthn** tab, web developers can now emulate these authenticators, customize their capabilities, and inspect their states, without the need of any physical authenticators. This makes the debugging experience much easier.

Check out our [documentation](/web/tools/chrome-devtools/webauthn) to learn more about the WebAuthn feature. 

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ef9e9e1f7da4e9ad97376efcf3cd61a7a6ccef6d #}

Chromium issue: [1034663](https://crbug.com/1034663)  

## Move tools between top and bottom panel {: #moveable-tools }
DevTools now support moving tools in DevTools between the top and bottom panel. This way, you can view any two tools at once.

For example, if you would like to view **Elements** and **Sources** panel at once, you can right click on the **Sources** panel, and select **Move to bottom** to move it to the bottom.

![Move to bottom](/web/updates/images/2020/10/devtools/03-move-to-bottom.png)

Similarly, you can move any bottom tab to the top by right clicking on a tab and select **Move to top**.

![Move to top](/web/updates/images/2020/10/devtools/04-move-to-top.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/461253b844b10078b97e8a16a4fc097d6686641c #}

Chromium issue: [1075732](https://crbug.com/1075732) 


## Elements panel updates {: #elements-panel }

### View the Computed sidebar pane in the Styles pane {: #computed-sidebar-pane }

You can now toggle the **Computed sidebar** pane in the Styles pane.

The **Computed sidebar** pane in the **Styles** pane is collapsed by default. Click on the button to toggle it. 

![Computed sidebar pane](/web/updates/images/2020/10/devtools/05-computed-sidebar-pane.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/7b61e9210b440c6133758f9adcccbe460bd99808 #}

Chromium issue: [1073899](https://crbug.com/1073899)  

### Grouping CSS properties in the Computed pane {: #grouping-css-prop }

You can now group the CSS properties by categories in the **Computed** pane.

With this new grouping feature, it will be easier to navigate in the **Computed** pane (less scrolling) and selectively focus on a set of related properties for CSS inspection.

On the **Elements** panel, select an element. Toggle the **Group** checkbox to group/ungroup the CSS properties.  

![Grouping CSS properties](/web/updates/images/2020/10/devtools/06-grouping-css-prop.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0a98cc54ea0d95ed7fafece71eb3459e9ef48fcc #}

Chromium issues: [1096230](https://crbug.com/1096230), [1084673](https://crbug.com/1084673), [1106251](https://crbug.com/1106251)  

## Lighthouse 6.4 in the Lighthouse panel {: #lighthouse }
The **Lighthouse** panel is now running Lighthouse 6.4. Check out the [release notes](https://github.com/GoogleChrome/lighthouse/releases) for a full list of changes.

![Lighthouse](/web/updates/images/2020/10/devtools/07-lighthouse.png)

New audits in Lighthouse 6.4:

- **Preload fonts**. Validates if all fonts that use`font-display: optional` were preloaded. 
- **Valid sourcemaps**. Audits if a page has valid sourcemaps for large, first-party JavaScript.
- **[Experimental] Large JavaScript library**. Large JavaScript libraries can lead to poor performance. This audit suggests cheaper alternatives to common, large JavaScript libraries like `moment.js`.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b8265a3093143b59922e93c0ad3af6c3e1858c8e #}

Chromium issue: [772558](https://crbug.com/772558) 


## `performance.mark()` events in the Timings section {: #perf-mark }

The [Timings section](/web/updates/2018/11/devtools#metrics) of a Performance recording now marks `performance.mark()` events.

![Performance.mark events](/web/updates/images/2020/10/devtools/08-perf-mark.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/49962913a77577c94d6c8cc58017c04e2670991a #}


## New `resource-type` and `url` filters in the Network panel {: #network-filters }
Use the new `resource-type` and `url` keywords in the **Network panel** to filter network requests.

For example, use `resource-type:image` to focus on the network requests that are images.

![resource-type filter](/web/updates/images/2020/10/devtools/09-filter.png) 

Check out [filter requests by properties](/web/tools/chrome-devtools/network/reference#filter-by-property) to discover more special keywords like `resource-type` and `url`.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/464838b4d4f72f1e8e06c6a3873a25f4e5c14a94 #}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f8ce40c16f024e8587238e33c6daa7351d8c7de4 #}

Chromium issues: [1121141](https://crbug.com/1121141),  [1104188](https://crbug.com/1104188)


## Frame details view updates {: #frame-details }
### Display COEP and COOP `reporting to` endpoint {: #reporting-to }

You can now view the Cross-Origin Embedder Policy (COEP)  and Cross-Origin Opener Policy (COOP)`reporting to` endpoint under the **Security & Isolation** section.
 
![reporting to endpoint](/web/updates/images/2020/10/devtools/10-reporting-endpoint.png)

Read this [article](https://web.dev/coop-coep/) to learn more about how to enable COEP and COOP and make your website "cross-origin isolated".

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/3cc78e2ef7950f7525f1ea59654afd845789d83d #}

Chromium issue: [1051466](https://crbug.com/1051466) 


### Display COEP and COOP `report-only` mode {: #report-only }

DevTools now displays `report-only` label  for COEP and COOP that are set to `report-only` mode.

![report-only label](/web/updates/images/2020/10/devtools/11-report-only.png)

Watch this [video](https://youtu.be/XLNJYhjA-0c) to learn about how to prevent information leaks and enable COOP and COEP in your website.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/3cc78e2ef7950f7525f1ea59654afd845789d83d #}

Chromium issue: [1051466](https://crbug.com/1051466) 


## Deprecation of `Settings` in the More tools menu {: #deprecate-settings }

The `Settings` in the More tools menu has been deprecated. Open the **Settings** from the main panel instead.

![Settings in the main panel](/web/updates/images/2020/10/devtools/12-settings.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/69ed1bc0165ad7aacba79855b037c2c4a96d8ac7 #}

Chromium issue: [1121312](https://crbug.com/1121312)


## Experimental features {: #experimental }
<aside class="caution">
  Caution: Experimental features are still under development and subject to change.
</aside>

### View and fix color contrast issues in the CSS Overview panel {: #css-overview }

<aside class="note">
    To enable this experiment, check the <strong>CSS Overview</strong> checkbox under <strong>Settings</strong> > <strong>Experiments</strong>.
</aside>

**CSS Overview** panel now displays a list of low color contrast texts of your page.

In this example, the [demo page](https://jec.fyi/demo/accessible-color-multi) has a low color contrast issue. Click on the issue, you can view a list of elements that have the issue. 

![Low color contrast issues](/web/updates/images/2020/10/devtools/13-css-overview.png)

Click on an element in the list to open the element in **Elements** panel. DevTools [provides auto color suggestion](/web/updates/2020/08/devtools#accessible-color) to help you fix the low contrast text.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d55e18c5122e8a73566720bc21ea36f6ea77a0ca #}

Chromium issue: [1120316](https://crbug.com/1120316) 

### Customize keyboard shortcuts in DevTools {: #customize keyboard-shortcuts }

<aside class="note">
    To enable this experiment, check the <strong>Enable keyboard shortcut editor</strong> checkbox under <strong>Settings</strong> > <strong>Experiments</strong>.
</aside>

You can now customize the keyboard shortcuts for your favourite commands in DevTools. 

Go to **Settings** > **Shortcuts**, hovering on a command and click the **Edit** button (pen icon) to customize the keyboard shortcut.

![Customize keyboard shortcuts](/web/updates/images/2020/10/devtools/14-keyboard-shortcut.png)

To reset all shortcuts, click on **Restore default shortcuts**.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/5f863da9c92410edf3de8cab6d5a832c2835d548 #}

Chromium issue: [174309](https://crbug.com/174309) 


<<../../_shared/devtools-feedback.md>>

<<../../_shared/canary.md>>

<<../../_shared/discover.md>>

{% include "web/_shared/rss-widget-updates.html" %}
