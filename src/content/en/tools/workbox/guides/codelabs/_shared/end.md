{# wf_md_include #}
### Try out push notifications {: #try-push }

The app is now all set to handle push notifications. Try it now:

1. Re-focus the tab running the live version of your app.
1. Click **Allow** when Chrome asks you if you want to grant the app
   permission to send push notifications.
1. Go to back to the **Service Workers** tab in DevTools.
1. Enter some text into the **Push** text box, then click **Push**. Your operating system
   displays a push notification from the app.

     <figure>
       <img src="/web/tools/workbox/guides/codelabs/imgs/shared/push.png"
         alt="Simulating a push notification from DevTools"/>
       <figcaption>
         <b>Figure 11</b>. Simulating a push notification from DevTools
       </figcaption>
     </figure>

    <aside class="note">**Note**: If you don't see the **Push** text box, you're running an older
    version of Chrome. Click the **Push** link instead. DevTools sends a notification with the
    text `Test push message from DevTools`.</aside>

### Optional: How service worker injection works {: #optional-injection }

At the bottom of your custom service worker, you call
`precacheAndRoute(self.__WB_MANIFEST);`. This is a placeholder. At build-time,
the Workbox plugin replaces `self.__WB_MANIFEST` with an array of resources to
precache. Your Workbox build configuration still determines what resources get
precached.

## Next steps {: #next-steps }

* Read the [Overview](/web/tools/workbox/) to learn more about the benefits that
  Workbox can provide to your project and how Workbox works.
* If you plan on building a custom service worker, it's helpful to understand [the service
  worker lifecycle](/web/fundamentals/primers/service-workers/lifecycle). See [Service Workers:
  An Introduction](/web/fundamentals/primers/service-workers/) to learn the basics of service
  workers.
* If you build projects with Workbox and run into questions or issues, [ask a question on
  Stack Overflow and tag it with `workbox`][SO].

[SO]: https://stackoverflow.com/questions/ask?tags=workbox
