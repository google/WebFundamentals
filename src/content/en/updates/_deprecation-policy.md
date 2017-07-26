{# wf_md_include #}

## Deprecation policy

To keep the platform healthy, we sometimes remove APIs from the Web Platform
which have run their course. There can be many reasons why we would remove an
API, such as: 

* They are superseded by newer APIs.
* They are updated to reflect changes to specifications to bring alignment and
  consistency with other browsers.
* They are early experiments that never came to fruition in other browsers
  and thus can increase the burden of support for web developers.

Some of these changes will have an effect on a very small number of sites. To
mitigate issues ahead of time, we try to give developers advanced notice so
they can make the required changes to keep their sites running.


Chrome currently has a
[process for deprecations and removals of API's](http://www.chromium.org/blink#TOC-Launch-Process:-Deprecation),
essentially:

* Announce on the
  [blink-dev](https://groups.google.com/a/chromium.org/forum/#!forum/blink-dev)
  mailing list.
* Set warnings and give time scales in the Chrome DevTools Console when usage
  is detected on the page.
* Wait, monitor, and then remove the feature as usage drops.

You can find a list of all deprecated features on chromestatus.com using the 
[deprecated filter](https://www.chromestatus.com/features#deprecated)
and removed features by applying the
[removed filter](https://www.chromestatus.com/features#removed).
We will also try to summarize some of the changes, reasoning, and migration
paths in these posts.
