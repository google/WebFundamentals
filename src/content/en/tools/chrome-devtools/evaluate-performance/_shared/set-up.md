## Set up {: #set-up }

Note: This tutorial is based on Chrome 59. If you use other versions of
Chrome, the UI and features of DevTools may be different.

When you profile a page on your desktop or laptop, keep in mind that your
experience is different than that of a typical mobile user. Mobile users
have much less CPU power, and usually much worse internet connections.

1. Open Google Chrome in [Incognito Mode][incognito]. Incognito Mode
   ensures that Chrome runs in a clean state. For example, if you have a
   lot of extensions installed, those extensions might create a lot of noise
   in your performance measurements.
1. Load the following page in your Incognito window. This is the demo
   that you're going to profile.

     `https://googlechrome.github.io/devtools-samples/perf/v1`

1. Press <kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>I</kbd> (Mac) or
   <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd> (Windows, Linux) to
   open DevTools.
1. In DevTools, click the **Network** tab.
1. Enable the **Disable Cache** checkbox. This forces DevTools to always
   go to the network to fetch resources, similar to how a first-time user
   experiences the page.

     <figure>
       <img src="imgs/network.png"
         alt="The demo and the Network panel, with the Disable Cache checkbox
              enabled."
       <figcaption>
         <b>Figure 1</b>: The demo on the left, and the <b>Network</b> panel
         on the right, with the <b>Disable Cache</b> checkbox enabled
       </figcaption>
     </figure>

     <aside class="note">
       <b>Note</b>: In the rest of the screenshots DevTools is undocked in
       a separate window. See <a
       href="/web/tools/chrome-devtools/ui#placement">Change DevTools
       placement</a>.
     </aside>

1. Click the **Performance** tab.
1. Make sure that the **Screenshots** checkbox is enabled.
1. Click **Capture Settings** ![Capture Settings][CS]{:.devtools-inline}.
   DevTools reveals settings related to how it captures performance
   metrics.
1. For **Network**, select **Regular 2G**. DevTools emulates a 2G internet
   connection. **Capture Settings** turns red to remind you that your using
   non-default settings.
1. For **CPU**, select **20x slowdown**. DevTools makes your CPU 20 times
   slower than usual.

     <figure>
       <img src="imgs/performance-settings.svg"
         alt="The Network setting set to Regular 2G, and the CPU setting
              set to 20x slowdown."
       <figcaption>
         <b>Figure 2</b>: The <b>Network</b> and <b>CPU</b> settings,
         outlined in blue
       </figcaption>
     </figure>

1. Click **Capture Settings** again to hide that section and free up
   some UI space.

[incognito]: https://support.google.com/chrome/answer/95464
[CS]: imgs/capture-settings.png
