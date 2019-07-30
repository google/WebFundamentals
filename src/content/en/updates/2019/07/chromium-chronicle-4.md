project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: The Chromium Chronicle, a monthly series geared specifically to Chromium developers — the developers who build the browser.

{# wf_updated_on: 2019-07-30 #}
{# wf_published_on: 2019-07-30 #}
{# wf_tags: chromium-chronicle #}
{# wf_featured_image: /web/updates/images/generic/cr-chron.jpg #}
{# wf_featured_snippet: Web Platform tests (WPT) are the preferred way to test web-exposed features, as they are shared with other browsers via Github. This month, we take a look at WPT best practices. #}
{# wf_blink_components: N/A #}

<style>
  body:not(.devsite-dark-code) pre.prettyprint.cc-bad {
    background-color: #fff7f7;
  }
  body:not(.devsite-dark-code) pre.prettyprint.cc-good {
    background-color: #f7fff7;
  }
</style>

# The Chromium Chronicle: Test your Web Platform Features with WPT {: .page-title }

**Episode 4:** July 2019

*by Robert in Waterloo*

If you work on Blink, you might know of web_tests (formerly LayoutTests).
web-platform-tests (WPT) lives inside `web_test/external/wpt`. **WPT is the
preferred way to test web-exposed features** as it is shared with other
browsers via GitHub. It has two main types of tests: *reftests* and
*testharness.js* tests.

*reftests* take and compare screenshots of two pages. By default, screenshots
are taken after the `load` event is fired; if you add a `reftest-wait` class
to the `<html>` element, the screenshot will be taken when the class is removed.
Disabled tests mean diminishing test coverage. **Be aware of font-related
flakiness; use the `Ahem` font when possible.**

[*testharness.js*][test-harness] is a JavaScript framework for testing anything
except rendering. When writing testharness.js tests, **pay attention to timing,
and remember to clean up global state.**

Flaky timeout & potential leaked states:
{: .compare-worse }

<pre class="prettyprint cc-bad lang-html">
&lt;script>
promise_test(async t => {
  assert_equals(await slowLocalStorageTest(), "expected", "message");
  localStorage.clear();
});
&lt;/script>
</pre>

A better test with long timeout & cleanup:
{: .compare-better }

<pre class="prettyprint cc-good lang-html">
<strong>&lt;meta name="timeout" content="long"></strong>
&lt;script>
promise_test(async t => {
  <strong>t.add_cleanup(() => localStorage.clear());</strong>
  assert_equals(await slowLocalStorageTest(), "expected", "message");
});
&lt;/script>
</pre>

**Use testdriver.js if you need automation otherwise unavailable on the web.**
You can get a user gesture from `test_driver.bless`, generate complex,
trusted inputs with `test_driver.action_sequence`, etc.

**WPT also provides some useful server-side features through file names.**
Multi-global tests (`.any.js` and its friends) run the same tests in different
scopes (`window`, `worker`, etc.); `.https.sub.html` asks the test to be loaded
over HTTPS with server-side substitution support like below:

<pre class="prettyprint cc-good lang-js">
var anotherOrigin = "https://&#123;&#123;hosts[][www1]}}:&#123;&#123;ports[https][0]}}/path/to/page.html";
</pre>

**Some features can also be enabled in query strings.**
`baz.html?pipe=sub|header(X-Key,val)|trickle(d1)` enables substitution, adds `X-Key: val`
to the headers of the response, and delays 1 second before responding. Search for "pipes"
on [web-platform-tests.org][web-platform-tests] for more.

**WPT can also test behaviors that are not included in specs yet;** just
name the test as `.tentative`. If you need Blink internal APIs (e.g.
`testRunner`, `internals`), put your tests in `web_tests/wpt_internal`.

**Changes made to WPT are automatically exported to GitHub.** You will see
comments from a bot in your CL. **GitHub changes from other vendors are also
continuously imported.** To receive automatically filed bugs when new failures
are imported, create an `OWNERS` file in a subdirectory in WPT:

```
# TEAM: your-team@chromium.org
# COMPONENT: Blink>YourComponent
# WPT-NOTIFY: true
emails-here-will-be-cc@chromium.org
```

## Additional Resources

* Want to find out how your tests run on other browsers, and how interoperable
  your feature is? Use [wpt.fyi][wpt-fyi].
* Looking for more documentation on APIs, guidelines, examples, tips and more?
  Visit [web-platform-tests.org][web-platform-tests].

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}

[web-platform-tests]: https://www.web-platform-tests.org
[wpt-fyi]: https://wpt.fyi
[test-harness]: https://github.com/w3c/testharness.js/
