{# wf_md_include #}
* `globDirectory` is where Workbox watches for changes. `globPatterns`
  is relative to this directory.

    <aside class="note">**Note**: A glob is a wildcard pattern. See [Glob Primer][Glob] to
    learn more.</aside>

[Glob]: https://github.com/isaacs/node-glob#glob-primer

* `globPatterns` is a glob of what files to precache. In plain English, the
  wildcard pattern `**/*.{html,js}` translates to "cache every HTML and JS
  file in `globDirectory`, or any of its sub-directories".
* `swDest` is where Workbox outputs the service worker that it generates.
* `clientsClaim` instructs the latest service worker to take control of all
  clients as soon as it's activated. See [clients.claim][claim].
* `skipWaiting` instructs the latest service worker to activate as soon as it enters
  the waiting phase. See [Skip the waiting phase][skip].

[skip]: /web/fundamentals/primers/service-workers/lifecycle#skip_the_waiting_phase
[claim]: /web/fundamentals/primers/service-workers/lifecycle#clientsclaim
