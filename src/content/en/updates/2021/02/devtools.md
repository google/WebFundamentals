project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Debugging support for CSS Flexbox, performance heads-up display on page, issues tab updates and more.

{# wf_updated_on: 2021-03-01 #}
{# wf_published_on: 2021-02-28 #}
{# wf_tags: chrome90, devtools, devtools-whatsnew #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: Debugging support for CSS Flexbox, performance heads-up display on page, issues tab updates and more. #}
{# wf_blink_components: Platform>DevTools #}

# What's New In DevTools (Chrome 90) {: .page-title }

{% include "web/_shared/contributors/jecelynyeen.html" %}

## New CSS flexbox debugging tools {: #flexbox }

DevTools now has dedicated CSS flexbox debugging tools!

![CSS flexbox debugging tools](/web/updates/images/2021/02/devtools/flexbox-nav.png)


When an HTML element on your page has `display: flex` or `display: inline-flex` applied to it, you can see a `flex` badge next to it in the Elements panel. Click the badge to toggle the display of a flex overlay on the page.

In the **Styles** pane, you can click on the new icon next to the `display: flex` or `display: inline-flex` to open the **Flexbox** editor. Flexbox editor provides a quick way to edit the flexbox properties. Try it yourself!

In addition, the **Layout** pane has a **Flexbox** section, display all the flexbox elements on the page. You can toggle the overlay of each element.

![Flexbox section in the Layout pane](/web/updates/images/2021/02/devtools/flexbox-layout.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f572da65b85867a676208f4a76ac0d9ae153b846 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/822f5bcc2bdabfce458dfee72b986d893c61f542 #}

Chromium issues: [1166710](https://crbug.com/1166710), [1175699](https://crbug.com/1175699)


## New Core Web Vitals overlay {: #cwv }

Better visualize and measure your page performance with the new Core Web Vitals overlay. 

[Core Web Vitals](https://web.dev/vitals/) is an initiative by Google to provide unified guidance for quality signals that are essential to delivering a great user experience on the web.

Open the [Command Menu](/web/tools/chrome-devtools/command-menu), run the **Show Rendering** command, and then enable the **Core Web Vitals** checkbox.

The overlay currently displays:

- [Largest Contentful Paint (LCP)](https://web.dev/lcp/): measures *loading performance*. To provide a good user experience, LCP should occur **within 2.5 seconds** of when the page first starts loading. 
- [First Input Delay (FID)](https://web.dev/fid/): measures *interactivity*. To provide a good user experience, pages should have a FID of **less than 100 milliseconds**.
- [Cumulative Layout Shift (CLS)](https://web.dev/cls/): measures *visual stability*. To provide a good user experience, pages should maintain a CLS of **less than 0.1**.

![Core Web Vitals overlay](/web/updates/images/2021/02/devtools/cwv.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f608eb351b94b9ddef2a9512cda5eae7865f6a69 #}

Chromium issue: [1152089](https://crbug.com/1152089)


## Issues tab updates {: #issues }

### Moved issue count to the Console status bar {: #issue-count }

A new issue count button is now added in the **Console status bar** to improve the visibility of issues warnings. This will replace the issue message in the **Console**. 

![Issue count in the Console status bar](/web/updates/images/2021/02/devtools/issue-count.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/71c7ce1f25326fded492be0a9f33ff2632f6f006 #}

Chromium issue: [1140516](https://crbug.com/1140516)


### Report Trusted Web Activity issues {: #twa }

The **Issues tab** now reports [Trusted Web Activity](/web/android/trusted-web-activity) issues. This aims to help developers understand and fix the Trusted Web Activity issues of their sites, improving the quality of their applications.

Open a Trusted Web Activity. Then, open the **Issues** tabs by clicking on the [Issues count](#issue-count) button in the **Console** status bar to view the issues. Watch this [talk](https://youtu.be/QJlbMfW3jPc) by Andre to learn more about how to create and deploy Trusted Web Activity.

![Trusted Web Activity issues in the Issues tab](/web/updates/images/2021/02/devtools/twa.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f2e77172e6e0df5cc120eb2794b675439992b439 #}

Chromium issue: [1147479](https://crbug.com/1147479)


## Format strings as (valid) JavaScript string literals in the Console {: #double-quotes }

Now, the **Console** formats strings as valid JavaScript string literals in the Console. Previously, the **Console** would not escape double quotes when printing strings.

![Format strings as (valid) JavaScript string literals](/web/updates/images/2021/02/devtools/double-quotes.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/62b49da2c488b82ec5d897062eed0178dd9b0ad3 #}

Chromium issue: [1178530](https://crbug.com/1178530)


## New Trust Tokens pane in the Application panel {: #trust-token-pane }

DevTools now displays all available Trust Tokens in the current browsing context in the new **Trust Tokens** pane, under the **Application** panel. 

Trust Token is a new API to help combat fraud and distinguish bots from real humans, without passive tracking. Learn how to [get started with Trust Tokens](https://web.dev/trust-tokens/).

![New Trust Tokens pane](/web/updates/images/2021/02/devtools/trust-token-pane.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/30152edff696855e3241c6dc63ce414d550563fa #}

Chromium issue: [1126824](https://crbug.com/1126824)


## Emulate the CSS color-gamut media feature {: #css-gamut }
![Emulate the CSS color-gamut media feature](/web/updates/images/2021/02/devtools/css-gamut.png)

The [`color-gamut`](https://www.chromestatus.com/feature/5354410980933632) media query lets you test the approximate range of colors that are supported by the browser and the output device. For example, if the `color-gamut: p3` media query matches, it means that the user’s device supports the Display-P3 colorspace.

Open the [Command Menu](/web/tools/chrome-devtools/command-menu), run the **Show Rendering** command, and then set the **Emulate CSS media feature color-gamut** dropdown.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9c423651c0fb46fc3dd241f791d5f8b7c59b7adb #}

Chromium issue: [1073887](https://crbug.com/1073887)

## Improved Progressive Web Apps tooling {: #pwa }
DevTools now display a more detailed [Progressive Web Apps (PWA)](https://web.dev/progressive-web-apps/) installability warning message in the **Console**, with a link to [documentation](https://goo.gle/improved-pwa-offline-detection).

![PWA installability warning](/web/updates/images/2021/02/devtools/pwa-installable.png)

The **Manifest** pane now shows a warning message if the manifest **description** exceeds 324 characters.

![PWA description truncate warning](/web/updates/images/2021/02/devtools/pwa-desc.png)

In addition, the **Manifest** pane now shows a warning message if the screenshot of the PWA doesn’t match the requirements. Learn more about the the PWA [screenshots](https://web.dev/add-manifest/#screenshots) property and its requirements here.

![PWA screenshot warning](/web/updates/images/2021/02/devtools/pwa-screenshot.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/e0df601ccddcaf65a16a6b8199fdf47c5fdf1e8e #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c8acdd6ad8ae37ea6f0fea0afbe96384f08b850b #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/84200926161a63ef2e52377ddd666bff60f48762 #}

Chromium issue: [1146450](https://crbug.com/1146450), [1169689](https://crbug.com/1169689), [965802](https://crbug.com/965802)


## New `Remote Address Space` column in the Network panel {: #remote-address-space }
Use the new `Remote Address Space` column in the Network panel to see the network IP address space of each network resource.

![New “Remote Address Space” column](/web/updates/images/2021/02/devtools/remote-address-space.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/bca6aa5aa946096334576c056c973d3b8650777b #}

Chromium issue: [1128885](https://crbug.com/1128885)


## Performance improvements {: #perf }
Page loads performance with DevTools opened are now improved. In some extreme cases we saw **10x** performance improvements.

DevTools collects stack traces and attaches them to console messages or asynchronous tasks for later consumption by the developer in case of an issue. Since this collection has to happen synchronously in the browser engine, slow stack trace collection can significantly slow down the page with DevTools open. We've managed to reduce the overhead of stack trace collection significantly.

Stay tuned for a more detailed engineering blog post explained on the implementation. 

{# https://chromium.googlesource.com/v8/v8/+/57062d6ccdede65022855109935a5789cb958aca #}
{# https://chromium.googlesource.com/v8/v8/+/11b6f1760e5a251488a16443d09f7819ed47b46a #}

Chromium issues: [1069425](https://crbug.com/1069425), [1077657](https://crbug.com/1077657)


## Display allowed/disallowed features in the Frame details view {: #permission-policy } 
Frame details view now shows a list of allowed and disallowed browser features controlled by the Permissions policy.

[Permissions policy](https://github.com/w3c/webappsec-permissions-policy/blob/main/permissions-policy-explainer.md) is a web platform API which gives a website the ability to allow or block the use of browser features in its own frame or in iframes that it embeds.

![Allowed/disallowed features based on Permission policy](/web/updates/images/2021/02/devtools/permission-policy.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/173154c0325ca3c9fc2954f692b8a0a1c385ab33 #}

Chromium issue: [1158827](https://crbug.com/1158827)


## New `SameParty` column in the Cookies pane {: #sameparty }

The Cookies pane in the Application panel now displays the `SameParty` attribute of the cookies. The `SameParty` attribute is a new boolean attribute to indicate whether a cookie should be included in requests to origins of the same [First-Party Sets](https://github.com/privacycg/first-party-sets).

![SameParty column](/web/updates/images/2021/02/devtools/sameparty.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/18a4813c5d8da44511730207735ea6e1b25911b9 #}

Chromium issue: [1161427](https://crbug.com/1161427)


## Deprecated non-standard `fn.displayName` support {: #display-name }

Support for the non-standard `fn.displayName` has been deprecated. Use `fn.name` instead.  

![Deprecation of non-standard `fn.displayName` support](/web/updates/images/2021/02/devtools/display-name.png)

Chrome has traditionally supported the non-standard `fn.displayName` property as a way for developers to control debug names for functions that show up in `error.stack` and in DevTools stack traces. In the example above, the **Call Stack** would previously show `noLongerSupport`. 

Replace `fn.displayName` with the standard `fn.name`, which was made configurable (via `Object.defineProperty`) in ECMAScript 2015 to replace the non-standard`fn.displayName` property.

Support for `fn.displayName` has been unreliable and not consistent across browser engines. It slows down stack trace collection, a cost that developers always pay no matter whether they actually use `fn.displayName` or not.

![Use `fn.name` to control debug names for functions](/web/updates/images/2021/02/devtools/display-name-name.png)

{# https://chromium.googlesource.com/v8/v8/+/c5cf7db1f2180472bd8df6cf0b55a12389e20096 #}

Chromium issue: [1177685](https://crbug.com/1177685)


## Deprecation of `Don't show Chrome Data Saver warning` in the Settings menu {: #data-saver-warning }

The `Don't show Chrome Data Saver warning` setting is removed because [Chrome Data Saver has been deprecated](https://blog.chromium.org/2019/04/data-saver-is-now-lite-mode.html).

![Deprecated “Don't show Chrome Data Saver warning” settings](/web/updates/images/2021/02/devtools/deprecated.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/76111edfecfcd4b5000cd11e07dcb1fa73b15402 #}

Chromium issue: [1056922](https://crbug.com/1056922)

##Experimental features {: #experimental }


### Automatic low-contrast issue reporting in the Issues tab {: #low-contrast }
<aside class="note">
  <p>To enable the experiment, check the <strong>Enable automatic contrast issue reporting via the Issues panel</strong> checkbox under <strong>Settings</strong> > <strong>Experiments</strong>.
  </p>
</aside>

DevTools added experimental support for reporting contrast issues in the Issues tab automatically. 

[Low-contrast text](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html) is the most common automatically-detectable accessibility issue on the web. Displaying these issues in the Issues tab helps developers discover these issues easier.

Open a page with low-contrast issues (e.g. this [demo](https://jec.fyi/demo/cds-anchovy)). Then, open the **Issues** tabs by clicking on the [Issues count](#issue-count) button in the **Console** status bar to view the issues.

![Automatic low-contrast issue reporting](/web/updates/images/2021/02/devtools/low-contrast.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/8a2f38c5f158d682a0ce1f8c3d26507c2fb41bf2 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/02f3797b19226961ae429cebabc51e4a24fded49 #}

Chromium issue: [1155460](https://crbug.com/1155460)


### Full accessibility tree view in the Elements panel {: #accesibility-tree }
<aside class="note">
  <p>To enable the experiment, check the <strong>Full accessibility tree view in Elements pane</strong> checkbox under <strong>Settings</strong> > <strong>Experiments</strong>.
  </p>
</aside>

You can now toggle to view the new and improved full accessibility tree view of a page.

The current [accessibility pane](/web/tools/chrome-devtools/accessibility/reference#pane) provides a limited display of its nodes, only showing the direct ancestor chain from the root node to the inspected node. The new accessibility tree view aims to improve that and makes the accessibility tree more explorable, useful, and easier for developers to use.

After enabling the experiment, a new button will show in the **Elements** panel, click to switch between the existing DOM tree and the full accessibility tree. 

Please note that this is an early-stage experiment. We plan to improve and expand the functionality over time.

![Full accessibility tree view](/web/updates/images/2021/02/devtools/accesibility-tree.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/fcfa1e2cc0237111eaaae616a696767e71164090 #}

Chromium issue: [887173](https://crbug.com/887173)


<<../../_shared/devtools-feedback.md>>

<<../../_shared/canary.md>>

<<../../_shared/discover.md>>

{% include "web/_shared/rss-widget-updates.html" %}
