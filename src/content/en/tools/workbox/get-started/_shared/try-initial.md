{# wf_md_include #}
### Try out the initial app {: #starting-point }

The client-side JavaScript in the app fetches the top 10 Hacker News (HN)
articles, and then populates the HTML with the content.

Note: This tutorial uses Google Chrome and Chrome DevTools to demonstrate how
the web app behaves when offline. You can use [any browser that supports
service workers](http://caniuse.com/#search=service%20workers).

1. Click **Show**. The live app appears in a new tab.

     <figure>
       <img src="/web/tools/workbox/get-started/imgs/shared/live.png"
         alt="The live app"/>
       <figcaption>
         <b>Figure 2</b>. The live app
       </figcaption>
     </figure>

1. In the tab that's running the live app, press
   <kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>J</kbd> (Mac) or
   <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>J</kbd> (Windows, Linux) to
   open DevTools.
1. Focus DevTools and press <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>
   (Mac) or <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Windows, Linux)
   to open the **Command Menu**.
1. Type `Offline`, select **Go offline**, then press <kbd>Enter</kbd>. Google
   Chrome now has no connection to the Internet in this tab.

     <figure>
       <img src="/web/tools/workbox/get-started/imgs/shared/offline.png"
         alt="The 'Go Offline' command"/>
       <figcaption>
         <b>Figure 3</b>. The <b>Go Offline</b> command
       </figcaption>
     </figure>

1. Reload the page. Google Chrome says that you're offline. In other words,
   the app doesn't work at all when offline.

     <figure>
       <img src="/web/tools/workbox/get-started/imgs/shared/no-internet.png"
         alt="The initial app doesn't work at all when offline"/>
       <figcaption>
         <b>Figure 4</b>. The initial app doesn't work at all when offline
       </figcaption>
     </figure>

1. Open the **Command Menu** again, type `Online`, and select **Go online**
   to restore your internet connection in this tab.
