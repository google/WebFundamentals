project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Web Components v0 users have more time to upgrade to v1; but be sure and test.

{# wf_updated_on: 2019-07-10 #}
{# wf_published_on: 2019-07-09 #}
{# wf_tags: webcomponents,deprecations,removals #}
{# wf_blink_components: Blink>FeaturePolicy,Blink>WebAudio,Blink>Sensor>DeviceOrientation #}
{# wf_featured_image: /web/updates/images/generic/deps-rems.jpg #}
{# wf_featured_snippet: Web Components v0 users have more time to upgrade to v1; but be sure and test. #}


# Web Components update: more time to upgrade to v1 APIs {: .page-title }

{% include "web/_shared/contributors/jbingham.html" %}
{% include "web/_shared/contributors/arthurevans.html" %}

The Web Components v1 APIs are a web platform standard that has shipped in Chrome, Safari, Firefox, 
and (soon) Edge. The v1 APIs are used by literally millions of sites, reaching billions of users 
daily. Developers using the draft v0 APIs provided valuable feedback that influenced the 
specifications. But the v0 APIs were only supported by Chrome. In order to ensure interoperability, 
late last year, we 
[announced](https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/h-JwMiPUnuU/sl79aLoLBQAJ) 
that these draft APIs were deprecated and were scheduled for removal as of Chrome 73.

Because enough developers requested more time to migrate, the APIs have not yet been removed 
from Chrome. **The v0 draft APIs are now targeted for removal in Chrome 80**, around February 2020. 

Here's what you need to know if you believe you might be using the v0 APIs: 

*   **Test your site with the v0 APIs disabled**. If your site works as expected, congratulations! 
    You're done. See [Back to the future: disabling the v0 APIs](#back-to-the-future-disabling-the-v0-apis) 
    for instructions.
*   **If you're using Polymer library v1 or v2**—follow the 
    [instructions published previously](https://www.polymer-project.org/blog/2018-10-02-webcomponents-v0-deprecations) 
    by the Polymer team. 
*   If you're using shadow DOM v0, custom elements v0, or HTML imports, you'll need to load some
    polyfills. See [Use the v0 polyfills](#use-the-v0-polyfills).
*   If you're not sure what you're using, don't worry. See 
    [Help! I don't know what APIs I'm using!](#use-the-v0-polyfills)

## Back to the future: disabling the v0 APIs {: #back-to-the-future-disabling-the-v0-apis }

To test your site with the v0 APIs disabled, you need to start Chrome from the command line with 
the following flags:

```bash
--disable-blink-features=ShadowDOMV0,CustomElementsV0,HTMLImports
```

You'll need to exit Chrome before starting it from the command line. If you have Chrome Canary 
installed, you can run the test in Canary while keeping this page loaded in Chrome. 
 
To test your site with v0 APIs disabled:

1.  If you're on Mac OS, browse to `chrome://version` to find the executable path for Chrome. 
    You'll need the path in step 3.
1.  Quit Chrome.
1.  Restart Chrome with the command-line flags: 

    `--disable-blink-features=ShadowDOMV0,CustomElementsV0,HTMLImports` 

    For instructions on starting Chrome with flags, see 
    [Run Chromium with flags.](https://www.chromium.org/developers/how-tos/run-chromium-with-flags) 
    For example, on Windows, you might run:

    ```bash
    chrome.exe --disable-blink-features=ShadowDOMV0,CustomElementsV0,HTMLImports
    ```

1.  To double check that you have started the browser correctly, open a new tab, open the DevTools 
    console, and run the following command:

    ```
    console.log(
    "Native HTML Imports?", 'import' in document.createElement('link'),
    "Native Custom Elements v0?", 'registerElement' in document, 
    "Native Shadow DOM v0?", 'createShadowRoot' in document.createElement('div'));
    ```

    If everything is working as expected, you should see:

    ```
    Native HTML Imports? false Native Custom Elements v0? false Native Shadow DOM v0? false
    ```

    If the browser reports true for any or all of these features, something's wrong. Make sure 
    you've fully quit Chrome before restarting with the flags.

1.  Finally, load your app and run through the features. If everything works as expected, you're 
    done. 

## Use the v0 polyfills {: #use-the-v0-polyfills }

The Web Components v0 polyfills provide support for the v0 APIs on browsers that don't 
provide native support. If your site isn't working on Chrome with the v0 APIs disabled, 
you probably aren't loading the polyfills. There are several possibilities:

*   You're not loading the polyfills at all. In this case, your site should fail on other browsers, 
    like Firefox and Safari.
*   You're loading the polyfills conditionally based on browser sniffing. In this case, your site 
    should work on other browsers. Skip ahead to [Load the polyfills](#load-the-v0-polyfills).

In the past, the Polymer Project team and others have recommended loading the polyfills conditionally
based on feature detection. This approach should work fine with the v0 APIs disabled.

### Install the v0 polyfills {: #install-the-v0-polyfills }

The Web Components v0 polyfills were never published to the npm registry. You can install
the polyfills using Bower, if your project is already using Bower. Or you can install from a zip file.

*   To install with Bower:

    `bower install --save webcomponents/webcomponentsjs#^0.7.0`

*   To install from a zip file, download the latest 0.7.x release from GitHub:

    https://github.com/webcomponents/webcomponentsjs/releases/tag/v0.7.24

    If you install from a zip file, you'll have to manually update the polyfills if another 
    version comes out. You'll probably want to check the polyfills in with your code. 

### Load the v0 polyfills {: #load-the-v0-polyfills }

The Web Components v0 polyfills are provided as two separate bundles:

<table>
  <tr>
   <td><code>webcomponents-min.js</code> 
   </td>
   <td>Includes all of the polyfills. This bundle includes the shadow DOM polyfill, which is much 
       larger than the other polyfills, and has greater performance impact. Only use this bundle if 
       you need shadow DOM support.
   </td>
  </tr>
  <tr>
   <td><code>webcomponents-lite-min.js</code>
   </td>
   <td>Includes all polyfills except for shadow DOM.

Note: Polymer 1.x users should choose this bundle, since Shadow DOM emulation was included directly 
in the Polymer library. Polymer 2.x users need a different version of the polyfills. See 
<a href="https://www.polymer-project.org/blog/2018-10-02-webcomponents-v0-deprecations">the Polymer 
Project blog post</a> for details.
   </td>
  </tr>
</table>


There are also individual polyfills available as part of the Web Components polyfill package. Using 
individual polyfills separately is an advanced topic, not covered here.

To load the polyfills unconditionally:

```html
<script src="/bower_components/webcomponents/webcomponentsjs/webcomponents-lite-min.js">
</script>
```

Or:

```html
<script src="/bower_components/webcomponents/webcomponentsjs/webcomponents-min.js">
</script>
```

If you installed the polyfills directly from GitHub, you'll need to supply the path where you 
installed the polyfills.

If you conditionally load the polyfills based on feature detection, your site should continue to 
work when v0 support is removed.

If you conditionally load the polyfills using browser sniffing (that is, loading the polyfills on 
non-Chrome browsers), your site will fail when v0 support is removed from Chrome. 

## Help! I don't know what APIs I'm using! {: #help-i-don't-know-what-apis-i'm-using }

If you don't know whether you're using any of the v0 APIs&mdash;or _which_ APIs you're 
using&mdash;you can check the console output in Chrome.

1.  If you previously started Chrome with the flags to disable the v0 APIs, close Chrome and restart
    it normally.
1.  Open a new Chrome tab and load your site.
1.  Press Control+Shift+J (Windows, Linux, Chrome OS) or Command+Option+J (Mac) to open the DevTools
    **Console**. 
1.  Check the console output for deprecation messages. If there's a lot of console output, enter 
    "Deprecation" in the **Filter** box.

<img src="/web/updates/images/2019/07/web-components-console-deprecations.png" 
    alt="Console window showing deprecation warnings">

You should see deprecation messages for each v0 API you're using. The output above shows messages 
for HTML Imports, custom elements v0, and shadow DOM v0.

If you're using one or more of these APIs, see [Use the v0 polyfills](#use-the-v0-polyfills).


## Next steps: moving off of v0 {: #next-steps-moving-off-of-v0 }

Making sure the v0 polyfills are getting loaded should ensure your site keeps working when the v0 
APIs are removed. We recommend moving to the Web Components v1 APIs, which are broadly supported.

If you're using a Web Components library, like the Polymer library, X-Tag, or SkateJS, the first 
step is to check whether newer versions of the library are available that support the v1 APIs.

If you have your own library, or wrote custom elements without a library, you'll need to update to 
the new APIs. These resources might help:

*   [What's New in Custom Elements](https://docs.google.com/presentation/d/179IRXRFmDGb3P60OVsoAIsElcaOp__5EuIWLcL8oNos/edit#slide=id.g144441e2a3_0_132)
*   [What's New in Shadow DOM v1](https://hayato.io/2016/shadowdomv1/)


## Summing up {: #summing-up }

The Web Components v0 draft APIs are going away. If you take one thing away from this post, make 
sure you [test your app with the v0 APIs disabled](#back-to-the-future-disabling-the-v0-apis) and 
[load the polyfills as needed](#use-the-v0-polyfills). 

For the long run, we encourage you to upgrade to the latest APIs, and keep using Web Components!

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}