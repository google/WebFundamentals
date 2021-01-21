project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Debugging support for Trusted Types violations, capture node screenshot beyond viewport, new Trust Tokens tab for network requests and more.

{# wf_updated_on: 2021-01-20 #}
{# wf_published_on: 2021-01-19 #}
{# wf_tags: chrome89, devtools, devtools-whatsnew #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: Debugging support for Trusted Types violations, capture node screenshot beyond viewport, new Trust Tokens tab for network requests and more. #}
{# wf_blink_components: Platform>DevTools #}

# What's New In DevTools (Chrome 89) {: .page-title }

{% include "web/_shared/contributors/jecelynyeen.html" %}

<<../../_shared/devtools-research.md>>

## Debugging support for Trusted Types violations {: #trusted-types }
### Breakpoint on Trusted Type violations {: #trusted-types-violations }

You can now set breakpoints and catch exceptions on Trusted Type Violations in the **Sources** panel.

[Trusted Types](https://github.com/w3c/webappsec-trusted-types) API helps you prevent DOM-based cross-site scripting vulnerabilities. Learn how to write, review and maintain applications free of DOM XSS vulnerabilities with Trusted Types [here](https://web.dev/trusted-types/).

In the **Sources** panel, open the **debugger** sidebar pane. Expand the **CSP Violation Breakpoints** section and enable the **Trusted Type violations** checkbox to pause on the exceptions. Try it yourself with [this demo page](https://tt-enforced.glitch.me/).

![Breakpoint on Trusted Type violations](/web/updates/images/2021/01/devtools/trusted-type-violations.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/13dcbd22d42acbb8843c3e03d59060bbdf16b936 #}

Chromium issue: [1142804](https://crbug.com/1142804)


### Link issue in the Sources panel to the Issues tab {: #trusted-type-link }

The **Sources** panel now shows a warning icon next to the line that violates Trusted Type. Hover on it to preview the exception. Click on it to expand the **Issues** tab, it provides more details on the exceptions and guidance on how to fix it.

![Link issue in the Sources panel to the Issues tab](/web/updates/images/2021/01/devtools/trusted-type-link.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/8c42bf00df2346fcfde28e72f2977c72e324118b #}

Chromium issue: [1150883](https://crbug.com/1150883)


## Capture node screenshot beyond viewport {: #node-screenshot }

You can now capture node screenshots for a full node, including content below the fold. Previously, the screenshot was cut off for content not visible in the viewport. The full-page screenshots are precise now as well.

In the **Elements** panel, right click on an element and select **Capture node screenshot**.

![Capture node screenshot beyond viewport](/web/updates/images/2021/01/devtools/node-screenshot.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/5215b2bdd2f7d5b1387df5783edbf9385591d221 #}

Chromium issue: [1003629](https://crbug.com/1003629)


## New Trust Tokens tab for network requests {: #trust-token }

Inspect the Trust Token network requests with the new **Trust Tokens** tab.

Trust Token is a new API to help combat fraud and distinguish bots from real humans, without passive tracking. Learn how to [get started with Trust Tokens](https://web.dev/trust-tokens/).

Further debugging support will come in the next releases.

![New Trust Token tab for network requests](/web/updates/images/2021/01/devtools/trust-token.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9cfe927efca2515dd556acc8a2e482ee0662dbeb #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f261ffc197322a2e4b20aef47ab2da99faecdba5 #}

Chromium issue: [1126824](https://crbug.com/1126824)


## Lighthouse 7 in the Lighthouse panel {: #lighthouse }

The **Lighthouse** panel is now running Lighthouse 7. Check out the [release notes](https://github.com/GoogleChrome/lighthouse/releases/tag/v7.0.0) for a full list of changes.

![Lighthouse 7 in the Lighthouse panel](/web/updates/images/2021/01/devtools/lighthouse.png)

New audits in Lighthouse 7:

- **Preload Largest Contentful Paint (LCP) image**. Audits if the image used by the LCP element is preloaded in order to improve your LCP time.
- **Issues logged to the `Issues` panel**. Indicates a list of unresolved issues in the `Issues` panel.
- **Progressive Web Apps (PWA)**. The PWA Category changed fairly significantly.
- The **Installable** group is now powered entirely by the capability checks that enable Chrome's installable criteria. These are the same signals seen in the **Manifest pane**. 

  - The "Registers a service worker…" audit moves to the **PWA Optimized** group, and the "Uses HTTPS" audit is now included as part of the key "installability requirements" audit.
  - The **Fast and reliable** group is removed. As the revamped "installability requirements" audit includes offline-capability checking, the “current page and start_url respond with 200 when offline” audit was removed. The "Page load is fast enough on mobile network" audit was removed too.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/5921e781cd6d5fae9f15e965622bac4c4ab32431 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/70441189dfa102083af0b32159f697fb5f3c3ae4 #}

Chromium issue: [772558](https://crbug.com/772558)


## Elements panel updates {: #elements-panel }
### Support forcing the CSS `:target` state {: #force-target }

You can now use DevTools to force and inspect the CSS `:target` state.

In the **Elements** panel, select an element and toggle the element state. Enable the `:target` checkbox to force and inspect the styles. 

Use the `:target` pseudo-class to style element when the hash in the URL and the id of an element are the same. Check out [this demo](https://jec.fyi/demo/css-target#section-2) to try it yourself. This new DevTools feature lets you test such styles without having to manually change the URL all the time.

![forcing the CSS `:target` state](/web/updates/images/2021/01/devtools/force-target.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/00e1aac922ec361606a3c95b0348d94f88502fcc #}

Chromium issue: [1156628](https://crbug.com/1156628)


### New shortcut to duplicate element {: #duplicate-element }

Use the new **Duplicate element** shortcut to clone an element instantly.

Right click an element in the **Elements** panel, select **Duplicate element**. A new element will be created under it. 

Alternatively, you can duplicate element with keyboard shortcuts:

- Mac: `Shift` + `Option` + `⬇️`
- Window/ Linux: `Shift` + `Alt` + `⬇️`

![Duplicate element](/web/updates/images/2021/01/devtools/duplicate-element.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/eaf49c6587adc7fd8c3cd3aa3f5e6515952992be #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/3383020812d40c5b2839233c6817d2d8f84eff43 #}

Chromium issues: [1150797](https://crbug.com/1150797), [1150797](https://crbug.com/1150797)


### Color pickers for custom CSS properties {: #color-picker }

The **Styles** pane now shows color pickers for custom CSS properties.

In addition, you can hold the `Shift` key and click on color picker to cycle through the RGBA, HSLA, and Hex representations of the color value.

![Color pickers for custom CSS properties](/web/updates/images/2021/01/devtools/color-picker.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6506ea926f2864de67113dfb8827cc3e1bb562d1 #}

Chromium issue: [1147016](https://crbug.com/1147016)


### New shortcuts to copy CSS properties {: #copy-css}

You can now copy CSS properties quicker with a few new shortcuts.

In the **Elements** panel, select an element. Then, right-click on a CSS class or a CSS property in the **Styles** pane to copy the value.

![New shortcuts to copy CSS properties](/web/updates/images/2021/01/devtools/copy-css.png)

Copy options for CSS class:

- **Copy selector**. Copy the current selector name.
- **Copy rule**. Copy the rule of the current selector.
- **Copy all declarations**: Copy all declarations under the current rule, including invalid and prefixed properties.

Copy options for CSS property:

- **Copy declaration**. Copy the declaration of the current line.
- **Copy property**. Copy the property of the current line.
- **Copy value**: Copy the value of the current line.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/3c1ec23006ebb6845ed95e1e6379ebb87303c35a #}

Chromium issue: [1152391](https://crbug.com/1152391)


## Cookies updates {: #cookies-updates }
### New option to show URL-decoded cookies {: #cookies-decoded }

You can now opt to view the URL-decoded cookies value in the **Cookies** pane.

Go to the **Application** panel and select the  **Cookies** pane. Select any cookie on the list. Enable the new **Show URL decoded** checkbox to view the decoded cookie.

![Option to show URL-decoded cookies](/web/updates/images/2021/01/devtools/cookies-decoded.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/3269f83be45f309708b75230ec9936fbc89a4946 #}

Chromium issue: [997625](https://crbug.com/997625)


### Clear only visible cookies {: #clear-cookies }

The **Clear all cookies** button in the Cookies pane is now replaced by **Clear filtered cookies** button.

In the **Application** panel > **Cookies** pane, enter text in the textbox to filter the cookies. In our example here, we filter the list by “PREF”. Click on the **Clear filtered cookies** button to delete the visible cookies. Clear the filter text and you will see the other cookies remain in the list. Previously, you only had the option to clear all cookies.

![Clear only visible cookies](/web/updates/images/2021/01/devtools/clear-cookies.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b18ca864bd90638b6a3a2ec38b067a2739ca9e3f #}

Chromium issue: [978059](https://crbug.com/978059)


### New option to clear third-party cookies in the Storage pane {: #third-party-cookies }

When clearing the site data in the **Storage** pane, DevTools now clear only first-party cookies by default. Enable the **including third-party cookies** to clear the third-party cookies as well.

![Option to clear third-party cookies](/web/updates/images/2021/01/devtools/third-party-cookies.png)


{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f2697b185f9d1a0b1178e6162659912b14157e10 #}

Chromium issue: [1012337](https://crbug.com/1012337)


## Edit User-Agent Client Hints for custom devices {: #ua-ch }

You can now edit User-Agent Client Hints for custom devices.

Go to **Settings** > **Devices** and click on **Add custom device...**. Expand the **User agent client hints** section to edit the client hints.

![Edit User-Agent Client Hints](/web/updates/images/2021/01/devtools/ua-ch.png)

User-Agent Client Hints are an alternative to User-Agent string that enables developers to access information about a user's browser in a privacy-preserving and ergonomic way. Learn more about User-Agent Client Hints in [web.dev/user-agent-client-hints/](https://web.dev/user-agent-client-hints/).

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/41545839b323780dd131670585fb6758bef25e71  #}

Chromium issue: [1073909](https://crbug.com/1073909)


## Network panel updates {: #network-panel }
### Persist “record network log” setting {: #network-log }

DevTools now persist the “Record network log” setting. Previously, DevTools reset the user’s choice whenever a page reloads.

![Record network log](/web/updates/images/2021/01/devtools/network-log.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/5c385b997ce6ebbbdf34d12bf998a775d0db3dbc #}

Chromium issue: [1122580](https://crbug.com/1122580)


### View WebTransport connections in the Network panel {: #webtransport }

Network panel now displays WebTransport connections. 

![WebTransport connections](/web/updates/images/2021/01/devtools/webtransport.png)

WebTransport is a new API offering low-latency, bidirectional, client-server messaging. Learn more about its use cases, and how to give feedback about the future of the implementation in [web.dev/webtransport/](https://web.dev/webtransport/).

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b43fbe8a06ea52e110218c82644181ed12917400 #}

Chromium issue: [1152290](https://crbug.com/1152290)


### “Online” renamed to “No throttling” {: #no-throttling }

The network emulation option “Online” is now renamed to “No Throttling”.

![Record network log](/web/updates/images/2021/01/devtools/no-throttling.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/56631d511bc5cd6a95478780955ebc8c7b848096 #}

Chromium issue: [1028078](https://crbug.com/1028078)

## New copy options in the Console, Sources panel, and Styles pane {: #copy-sources-console }
### New shortcuts to copy object in the Console and Sources panel {: #copy-object }

You can now copy object values with the new shortcuts in the Console and Sources panel. This is handy especially when you have a large object (e.g. a long array) to copy.

![Copy object in the Console](/web/updates/images/2021/01/devtools/copy-object-console.png)

![Copy object in the Sources panel](/web/updates/images/2021/01/devtools/copy-object-sources.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ffcbeba235cb0bffbc637f4830d771aabcdb7ccb #}

Chromium issues: [1149859](https://crbug.com/1149859), [1148353](https://crbug.com/1148353)


### New shortcuts to copy file name in the Sources panel and Styles pane {: #copy-file-name }

You can now copy file name by right clicking on:

- a file in the **Sources** panel, or
- the file name in the **Styles pane** in the **Elements** panel

Select **Copy file name** from the context menu to copy the file name.

![Copy file name in the Sources panel](/web/updates/images/2021/01/devtools/copy-file-name.png)

![Copy file name in the Styles pane](/web/updates/images/2021/01/devtools/copy-file-name-2.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/3650e610e1874c84fc8495ab806e02d7d1798b33  #}

Chromium issue: [1155120](https://crbug.com/1155120)


## Frame details view updates {: #frame-details }
### New Service Workers information in the Frame details view {: #sw }

DevTools now displays dedicated service workers under the frame which creates them.

In the **Application** panel, expand a frame with service workers, then select a service worker under the **Service Workers** tree to view the details.

![Service Workers information in the Frame details view](/web/updates/images/2021/01/devtools/sw.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/7df55c21d64b6df52a923c3e6e3b370db6e0a495 #}

Chromium issue: [1122507](https://crbug.com/1122507)


### Measure Memory information in the Frame details view {: #measure-memory }

The `performance.measureMemory()` API status is now displayed under the **API availability** section.

The new `performance.measureMemory()` API estimates the memory usage of the entire web page. Learn how to monitor your web page's total memory usage with this new API in [this article](https://web.dev/monitor-total-page-memory-usage).

![Measure Memory](/web/updates/images/2021/01/devtools/measure-memory.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/12cf8695092dc8e4c12b60470718211e24ac96ea #}

Chromium issue: [1139899](https://crbug.com/1139899)


## Provide feedback from the Issues tab {: #issues-feedback }

If you ever want to improve an issue message, go to the **Issues** tab from the **Console** or **More Settings** > **More tools** > **Issues** > to open the **Issues** tab. Expand an issue message, and click on the **Is the issue message helpful to you?**, then you can provide feedback in the pop up.

![Issue feedback link](/web/updates/images/2021/01/devtools/issues-feedback.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/5900f3c2badcec27e21acb878b89f777dac30e2b #}


## Dropped frames in the Performance panel {: #dropped-frames }

When [analyzing load performance in the Performance panel](/chrome-devtools/evaluate-performance/reference#record-load), the **Frames** section now marks dropped frames as red. Hover on it to find out the frame rate.

![Dropped frames](/web/updates/images/2021/01/devtools/dropped-frames.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/63a9ee3c44f1a652c8f7fc45e40433130433a4f3 #}

Chromium issue: [1075865](https://crbug.com/1075865)


## Emulate foldable and dual-screen in Device Mode {: #dual-screen}

You can now emulate dual-screen and foldable devices in DevTools.

After [enabling the Device Toolbar](/web/tools/chrome-devtools/device-mode#viewport), select one of these devices: **Surface Duo** or **Samsung Galaxy Fold**. 

Click on the new span icon to toggle between single-screen or folded and dual-screen or unfolded postures. 

You can also enable the **Experimental Web Platform features** to access the new CSS media `screen-spanning` feature and JavaScript `getWindowSegments` API. The experimental icon displays the state of the **Experimental Web Platform features** flag. The icon is highlighted when the flag is turned on. Navigate to `chrome://flags` and toggle the flag.

![Emulate dual-screen](/web/updates/images/2021/01/devtools/dual-screen.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d08c5531762807570b5a929d3496eae8632bf2b5%5E%21/ #}

Chromium issue: [1054281](https://crbug.com/1054281)


## Experimental features
### Automate browser testing with Puppeteer Recorder {: #record }

<aside class="note">
  <p>To enable the experiment, check the <strong>Recorder</strong> checkbox under <strong>Settings</strong> > <strong>Experiments</strong>.
  </p>
</aside>

DevTools can now generate [Puppeteer](https://pptr.dev/) scripts based on your interaction with the browser, making it easier for you to automate browser testing. Puppeteer is a Node.js library which provides a high-level API to control Chrome or Chromium over the [DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/).

Go to [this demo page](https://jec.fyi/demo/recorder). Open the **Sources** panel in DevTools. Select the **Recording** tab on the left pane. Add a new recording and name the file (e.g. test01.js).

Click on the **Record** button at the bottom to start recording the interaction. Try to fill in the on-screen form. Observe that Puppeteer commands are appended to the file accordingly. Click on the  **Record** button again to stop the recording.

To run the script, follow the [Getting started guide](https://pptr.dev/) in Puppeteer official site.

Please note that this is an early-stage experiment. We plan to improve and expand the Recorder functionality over time.

![Puppeteer Recorder](/web/updates/images/2021/01/devtools/recorder.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/3a230e284900781eb0455b2f18cb78415c3d14d9 #}

Chromium issue: [1144127](https://crbug.com/1144127)


### Font editor in the Styles pane {: #font }

<aside class="note">
  <p>To enable the experiment, check the <strong>Enable new Font Editor tools within Styles pane</strong> checkbox under <strong>Settings</strong> > <strong>Experiments</strong>.
  </p>
</aside>

The new Font Editor is a popover editor in the **Styles pane** for font related properties to help you find the perfect typography for your webpage. 

The popover provides a clean UI to dynamically manipulate typography with a series of intuitive input types.

![Font editor in the Styles pane](/web/updates/images/2021/01/devtools/font.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6035f4a5832af5afcf199b67f4c76a6b38189a8a #}

Chromium issue: [1093229](https://crbug.com/1093229)


### CSS flexbox debugging tools {: #flexbox }

<aside class="note">
  <p>To enable the experiment, check the <strong>Enable CSS Flexbox debugging features</strong>  checkbox under <strong>Settings</strong> > <strong>Experiments</strong>.
  </p>
</aside>

DevTools added experimental support for [flexbox debugging since last release](/web/updates/2020/11/devtools#flexbox).

DevTools now draws a guiding line to help you better visualize the CSS `align-items` property. The CSS `gap` property is supported as well. In our example here, we have CSS `gap: 12px;`. Notice the hatching pattern for each gap.

![flexbox](/web/updates/images/2021/01/devtools/flexbox.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0f58c2f5f2e092ab56b9789258f8c9b4459b000f #}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/55ec66e9ab8abe13e100cd435f52b0448252a26d #}

Chromium issue: [1139949](https://crbug.com/1139949)


### New CSP Violations tab {: #csp }

<aside class="note">
  </p>To enable the experiment, check the <strong>Show CSP Violations view</strong> checkbox under <strong>Settings</strong> > <strong>Experiments</strong>.
  </p>
</aside>

View all Content Security Policy (CSP) violations at a glance in the new **CSP Violations** tab. This new tab is an experiment that should make it easier to work with web pages with a large amount of CSP and Trusted Type violations. 

![CSP Violations tab](/web/updates/images/2021/01/devtools/csp.png)


{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b2302644f86cd9048134c8841901d5190fff7af2 #}

Chromium issue: [1137837](https://crbug.com/1137837)


### New color contrast calculation - Advanced Perceptual Contrast Algorithm (APCA) {: #apca }

<aside class="note">
  <p>To enable the experiment, check the <strong>Enable new Advanced Perceptual Contrast Algorithm (APCA) replacing previous contrast ratio and AA/AAA guidelines</strong> checkbox under <strong>Settings</strong> > <strong>Experiments</strong>.
  </p>
</aside>

The [Advanced Perceptual Contrast Algorithm (APCA)](https://w3c.github.io/silver/guidelines/methods/Method-font-characteristic-contrast.html
) is replacing the [AA](https://www.w3.org/WAI/WCAG21/quickref/#contrast-minimum)/[AAA](https://www.w3.org/WAI/WCAG21/quickref/#contrast-enhanced) guidelines contrast ratio in the [Color Picker](/web/tools/chrome-devtools/accessibility/reference#contrast). 

APCA is a new way to compute contrast based on modern research on color perception. Compared to AA/AAA guidelines, APCA is more context-dependent. The contrast is calculated based on the text’s spatial properties (font weight & size), color (perceived lightness difference between text and background), and context (ambient light, surroundings, intended purpose of the text).

![APCA in Color Picker](/web/updates/images/2021/01/devtools/apca.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/1d0105053a41da58fe3861c48973f9377aabd2b2 #}

Chromium issue: [1121900](https://crbug.com/1121900)


<<../../_shared/devtools-feedback.md>>

<<../../_shared/canary.md>>

<<../../_shared/discover.md>>

{% include "web/_shared/rss-widget-updates.html" %}
