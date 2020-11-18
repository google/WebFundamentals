project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: New CSS angle visualization tools, emulate unsupported image types and storage quota, new Web Vitals lane and more.

{# wf_updated_on: 2020-11-19 #}
{# wf_published_on: 2020-11-12 #}
{# wf_tags: chrome7, devtools, devtools-whatsnew #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: New CSS angle visualization tools, emulate unsupported image types and storage quota, new Web Vitals lane and more. #}
{# wf_blink_components: Platform>DevTools #}

# What's New In DevTools (Chrome 88) {: .page-title }

{% include "web/_shared/contributors/jecelynyeen.html" %}

## Faster DevTools startup {: #fast-startup }

DevTools startup now is ~37% faster in terms of JavaScript compilation (from 6.9s down to 5s)! 🎉

The team did some optimization to reduce the performance overhead of serialisation, parsing and deserialisation during the startup.

There will be an upcoming engineering blog post explaining the implementation in detail. Stay tuned!

{# https://chromium.googlesource.com/chromium/src/+/cfb8f8d50b13023ac561d2b7b1bc14d254538557  #}
{# https://chromium.googlesource.com/chromium/src/+/4f213b39d581eaa69a6d70378c91de2768e0004a #}

Chromium issue: [1029427](https://crbug.com/1029427)


## New CSS angle visualization tools {: #css-angle }

DevTools now has better support for CSS angle debugging!

![CSS angle](/web/updates/images/2020/11/devtools/01-angle.png)

When an HTML element on your page has CSS angle applied to it (e.g.  `background: linear-gradient(angle, color-stop1, color-stop2)`, `transform: rotate(angle)`), a clock icon is shown next to the angle in the Styles pane. Click on the clock icon to toggle the clock overlay. Click anywhere in the clock or drag the needle to change the angle! 

There are mouse and keyboard shortcuts to change the angle value as well, check out our [documentation](/web/tools/chrome-devtools/css/reference#angle-clock) to learn more!

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/a67320cd7ce47da3c79eec532536271a33c1a7b1 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/227d345692cc094838125bd98b06f17d7b02693f #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/07a68b23bbca4797e34c046758389f1cc849f971 #}

Chromium issues: [1126178](https://crbug.com/1126178), [1138633](https://crbug.com/1138633)


## Emulate unsupported image types {: #emulate-image }

DevTools added two new emulations in the Rendering tab, allowing you to disable AVIF and WebP image formats. These new emulations make it easier for developers to test different image loading scenarios without having to switch browsers.

Suppose we have the following HTML code to serve an image in AVIF and WebP for newer browsers, with a fallback PNG image for older browsers.

```html
<picture>
  <source srcset="test.avif" type="image/avif">
  <source srcset="test.webp" type="image/webp">
  <img src="test.png" alt="A test image">
</picture>
```

Open the **Rendering** tab, select “Disable AVIF image format” and refresh the page. Hover over the `img src`. The current image src (`currentSrc`) is now the fallback WebP image.

![Emulate image types](/web/updates/images/2020/11/devtools/02-emulate-image-type.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/e25ee909775918ba110a03bd29a460327b30b259 #}

Chromium issue: [1130556](https://crbug.com/1130556)


## Simulate storage quota size in the Storage pane {: #simulate-storage }

You can now override storage quota size in the Storage pane. This feature gives you the ability to simulate different devices and test the behavior of your apps in low disk availability scenarios.

Go to **Application** > **Storage**, enable the **Simulate custom storage quota** checkbox, and enter any valid number to simulate the storage quota.

![Simulate storage quota size](/web/updates/images/2020/11/devtools/03-storage-quota.png)   

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b17db0d051a0db39b9463ae1a0b1e608d0c2978f #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/16cd6e04f960e503388ce226c68e0e794c415968 #}

Chromium issues: [945786](https://crbug.com/945786), [1146985](https://crbug.com/1146985)


## New Web Vitals lane in the Performance panel recordings {: #web-vitals }

Performance recordings now have an option to display Web Vitals information. 

After recording your load performance, enable the **Web Vitals** checkbox in the Performance panel to view the new Web Vitals lane. 

The lane currently displays Web Vitals information such as [First Contentful Paint](https://web.dev/fcp) (FCP), [Largest Contentful Paint](https://web.dev/lcp) (LCP) and [Layout Shift](https://web.dev/cls) (LS). 

Check out [web.dev/vitals](https://web.dev/vitals) to learn more about how to optimize user experience with the Web Vitals metrics.

![Web Vitals lane](/web/updates/images/2020/11/devtools/04-web-vitals-lane.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/377d9b3b2b6563036f25aea7f128056a7c4f9f76 #}

Chromium issue: N/A


## Report CORS errors in the Network panel {: #cors }

DevTools now shows CORS error when a network request is failed due to Cross-origin Resource Sharing (CORS).

In the **Network** panel, observe the failed CORS network request. The status column shows **“CORS error”**. Hover over on the error, the tooltip now shows the error code. Previously, DevTools only showed generic **“(failed)”** status for CORS errors.

This lays the foundation for our next enhancements on providing more detailed description of the CORS problems!

![CORS errors](/web/updates/images/2020/11/devtools/05-cors-err.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/20088de02e9a17bd7f558835d771ab841ed309a4 #}

Chromium issue: [1141824](https://crbug.com/1141824)


## Frame details view updates {: #frame-details }

### Cross-origin isolation information in the Frame details view {: #cross-origin }

The cross-origin isolated status is now displayed under the **Security & Isolation** section.

The new **API availability** section displays the availability of `SharedArrayBuffer`s (SAB) and whether they can be shared using `postMessage()`.

A deprecation warning will show if the SAB and `postMessage()` is currently available,
but the context is not cross-origin isolated. Learn more about cross-origin isolation and why it will be required for features like `SharedArrayBuffers` in this [article](https://web.dev/why-coop-coep).

![Cross-origin information](/web/updates/images/2020/11/devtools/06-frame-cross-origin-isolated-api.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/cea6576aeb592b0c9ad858fe7778d489fb9d8d97 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/3fa2f7f9e9670d85211d7e5e1dd08197b1a8a4e9 #}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/eabef9611de87039292bfd475bda880fcd0aba9b #}

Chromium issue: [1139899](https://crbug.com/1139899)


### New Web Workers information in the Frame details view {: #web-worker }

DevTools now displays dedicated web workers under the frame which creates them. 

In the **Application** panel, expand a frame with web workers, then select a worker under the **Workers** tree to view the web worker's details.

![Web workers information](/web/updates/images/2020/11/devtools/07-frame-worker.png)


{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ffd66905c46a7ab6e744e2d67473e20a766ebb1c #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b7e75fc2ad352ace9ebf23bf67720ef55991239a #}

Chromium issues: [1122507](https://crbug.com/1122507), [1051466](https://crbug.com/1051466)


### Display opener frame details for opened windows {: #opener-frame }

You can now view the details about which frame caused the opening of another
Window.

Select an opened window under the **Frames** tree to view the window details. Click on the **Opener Frame** link to reveal the opener in the Elements panel.

![Opener frame details](/web/updates/images/2020/11/devtools/08-frame-opener.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ef272eed96909963b96f5d9b60eff6bd2239a1fe #}

Chromium issue: [1107766](https://crbug.com/1107766)

## Open Network panel from the Service Workers pane {: #sw }

View all service worker (SW) request routing information with the new **Network requests** link. This provides developers added context when debugging the SW.

Go to **Application** > **Service Workers**, click on the **Network requests** of a SW. The **Network** panel is opened in the bottom panel displaying all service worker related requests (the network requests are filtered by *“is:service-worker-intercepted”*).

![Open Network panel from the Service Workers](/web/updates/images/2020/11/devtools/09-sw-network-request.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/e1374b563dc5a899f825f4ae21982339fdb520d5 #}

Chromium issue: N/A


## New copy options in the Network panel {: #copy }

### Copy property value {: #copy-value }

The new **“Copy value”** option in the context menu lets you copy the property value of a network request.

![Copy property value](/web/updates/images/2020/11/devtools/10-copy-prop-value.png) 

In the **Network** panel, click on a network request to open the **Headers** pane. Right click on one of the properties under these section:
Request payload (JSON)
Form Data
Query String Parameters
Request Headers
Response Headers

Then, you can select **Copy value** to copy the property value to your clipboard.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/12246a59e0ba3300ac382c83e71dbbbc45c08289 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/e4518be03ec0864777b2f0d1b14cafe5346e7679 #}

Chromium issue: [1132084](https://crbug.com/1132084)


### Copy stacktrace for network initiator {: #copy-stacktrace }
Right-click a network request, then select **Copy stacktrace** to copy the stacktrace to your clipboard.

![Copy stacktrace](/web/updates/images/2020/11/devtools/11-copy-stacktrace.png)


{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b4faf5adc4cec87f885d1a10a42c368e3218aefe #}

Chromium issue: [1139615](https://crbug.com/1139615)


## Wasm debugging updates {: #wasm }

### Preview Wasm variable value on mouseover {: #wasm-mouseover }

When hovering over a variable in WebAssembly (Wasm) disassembly while paused on a breakpoint, DevTools now shows the variable current value. 

In the **Sources** panel, open a Wasm file, put a breakpoint and refresh the page. Hover to a variable to see the value.

![Preview Wasm variable on mouseover](/web/updates/images/2020/11/devtools/12-wasm-mouseover.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/00fb56b476530e0e240971e62af7ae4696df246b #}

Chromium issues: [1058836](https://crbug.com/1058836), [1071432](https://crbug.com/1071432)

### Evaluate Wasm variable in the Console {: #wasm-console }

You can now evaluate Wasm variable in the Console while paused on a breakpoint.

In this example, we put a breakpoint on the line `local.get $input`. When debugging, type `$input` in the Console will return the current value of the variable, which is `4` in this case.

![Evaluate Wasm variable in the Console](/web/updates/images/2020/11/devtools/12-wasm-console.png)

Chromium issue: [1127914](https://crbug.com/1127914)


## Highlight pseudo elements in the Elements panel {: #pseudo }

DevTools has increased the color contrast of pseudo elements to help you better spot them. 

![Highlight pseudo elementse](/web/updates/images/2020/11/devtools/15-pseudo.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend.git/+/eb8e1e991bc97fc53becc9550baba0799ebd6a49 #}

Chromium issue: [1143833](https://crbug.com/1143833)


## Consistent units of measurement for file/memory sizes {: #consistent-kb }

DevTools now consistently use kB for displaying file/memory sizes. Previously DevTools mixed kB (1000 bytes) and KiB (1024 bytes). For example, the Network panel previously used “kB” labels but actually performed calculations using KiB, which caused needless confusion. 


{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d451ecdd037b600479f949767ed401cf489fb5e3 #}

Chromium issue: [1035309](https://crbug.com/1035309)


## Experimental features {: #experimental }

### CSS Flexbox debugging tools {: #flexbox }

<aside class="note">
  </p>To enable the experiment, check the <strong>Enable CSS Flexbox debugging features</strong>  checkbox under <strong>Settings</strong> > <strong>Experiments</strong>.
  </p>
</aside>

Flexbox debugging tools are coming!

For starters, DevTools now shows a `flex` badge in the Elements panel for elements with `display: flex` applied to it.

Beside that, new alignment icons are added in the following flexbox properties:

- `flex-direction`
- `align-items`
- `align-content`
- `align-self`
- `justify-items`
- `justify-content` 

On top of that, these icons are context-aware. The icon direction will be adjusted according to:

- `flex-direction`
- `direction`
- `writing-mode`

These icons aim to help you better visualize the flexbox layout of the page.

![CSS Flex debugging](/web/updates/images/2020/11/devtools/13-flex-debugging.png)

Here is the [design doc](https://goo.gle/devtools-flex) of the Flexbox tooling features. More features will be added soon. 

Give it a try and [let us know](https://crbug.com/1136394) what you think!

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d4e59f416fc906906e8f5fd0612f8a07ed3ef015 #}
{#  https://chromium.googlesource.com/devtools/devtools-frontend/+/4504e3a3591fdc5477db8c9d5c4ebe4f022d23ca #}
{#  https://chromium.googlesource.com/devtools/devtools-frontend/+/875a33f832e01db718aa5532e5ea3c75b85c9eea #}
{#  https://chromium.googlesource.com/devtools/devtools-frontend/+/de52def6933736e5864a7d714e289a128e9be9b5 #}
{#  https://chromium.googlesource.com/devtools/devtools-frontend/+/e47dd24ea7407957c1f0622ad9138bdbf0b4e3ff  #}
{#  https://chromium.googlesource.com/devtools/devtools-frontend/+/89cf59f82a6be3c438369a21a066a0c1284a623f #}
{#  https://chromium.googlesource.com/devtools/devtools-frontend/+/66af8a4f3d160b62ca31c2a453834d620af36e43 #}
{#  https://chromium.googlesource.com/devtools/devtools-frontend/+/5d35d2afddac90950e8f619777da755bfa37c22d #}
{#  https://chromium.googlesource.com/devtools/devtools-frontend/+/ef0d9506554a20cfe1e63c1c6ce6f276e6764400 #}
{#  https://chromium.googlesource.com/devtools/devtools-frontend/+/62e571e6bb4ceafccc25d7ebad2ef56db26a9216 #}
{#  https://chromium.googlesource.com/devtools/devtools-frontend/+/aa14597ebcfa9dfc045b5553f3a5ad5f8f35f279 #}
{#  https://chromium.googlesource.com/devtools/devtools-frontend/+/9d599b26cde6095c71c8bdd020e899fae15d5ae4 #}

Chromium issues: [1144090](https://crbug.com/1144090), [1139945](https://crbug.com/1139945)


### Customize chords keyboard shortcuts {: #keyboard-shortcuts }

<aside class="note">
  </p>To enable the experiment, check the Enable keyboard shortcut editor checkbox under **Settings** > **Experiments**.
  </p>
</aside>

DevTools added experimental support for [customize keyboard shortcuts](/web/updates/2020/10/devtools#customize) since last release.

You can now create chords (a.k.a multi-keypress shortcuts) in the shortcut editor. 

Go to **Settings** > **Shortcuts**, hovering on a command and click the **Edit** button (pen icon) to customize the chords shortcut.

![Chords keyboard shortcuts](/web/updates/images/2020/11/devtools/14-keyboard-shortcuts.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/5db9eeec2f2e0eb5b062e8aea9387ee8f9e6fc76  #}

Chromium issue: [174309](https://crbug.com/174309)

<<../../_shared/devtools-feedback.md>>

<<../../_shared/canary.md>>

<<../../_shared/discover.md>>

{% include "web/_shared/rss-widget-updates.html" %}
