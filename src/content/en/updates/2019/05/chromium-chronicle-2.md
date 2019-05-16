project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: The Chromium Chronicle, a monthly series geared specifically to Chromium developers — the developers who build the browser.

{# wf_updated_on: 2019-05-16 #}
{# wf_published_on: 2019-05-21 #}
{# wf_tags: chromium-chronicle #}
{# wf_featured_image: /web/updates/images/generic/cr-chron.jpg #}
{# wf_featured_snippet: Flaky tests are a common problem in Chrome. They impact the productivity of other developers, and get disabled over time. This month, we take a look at how to fight test flakiness. #}
{# wf_blink_components: N/A #}

<style>
  body:not(.devsite-dark-code) pre.prettyprint.cc-bad {
    background-color: #fff7f7;
  }
  body:not(.devsite-dark-code) pre.prettyprint.cc-good {
    background-color: #f7fff7;
  }
</style>

# The Chromium Chronicle: Fighting Test Flakiness {: .page-title }

**Episode 2:** May 2019

*by Vasilii in Munich*

[Flaky tests][flaky-tests-context] are a common problem in Chrome. They
impact the productivity of other developers, and get disabled over time.
Disabled tests mean diminishing test coverage.

## Triaging Stage

**The OWNERS of directories are responsible for fixing their flaky tests.**
If you received a bug about a flaky test, spend a few minutes and
**comment what went wrong** on the bug. If you have an old flaky test and
it's unclear what went wrong, **try to simply re-enable** the test.
**Reassign the bug ASAP** if it's clearly a problem in another component.
The owners of that component should have better judgement about the failure,

## Debugging Stage

A number of [command-line flags][useful-command-lines] are useful for
fixing flaky tests. For example, **`--enable-pixel-output-in-tests`**
will render the actual browser UI.

**Have fallback tools** if the debugger makes flakiness disappear. It's
possible that, under debugger, the test is never flaky. In that case, log
statements or `base::debug::StackTrace` can be handy.

Keep in mind common reasons for EXPECT__* failures besides bugs in production
code:
{: .compare-worse }

* **Incorrect expectations** (e.g. secure page means HTTPS; it can be a localhost instead).
* Race conditions due to tests not **waiting for the proper event.**

[Don't test the implementation][not-implementation] but the behavior.

```cpp
// It takes 2 round trips between the UI and the background thread to complete.
SyncWithTheStore();
SyncWithTheStore();
CheckTheStore();
```

The two round trips may change into three in the future, making the test flaky.
However, only the store state is relevant. Instead, use an observer for the
store.

Beware of common patterns such as the following:
{: .compare-worse }

<pre class="prettyprint cc-bad lang-cpp">
Submit TestPasswordForm();
// Wait until things settle down.
RunLoop().RunUntilIdle();
CheckCredentialPromptVisible();
</pre>

A snippet like the above from a browser test is almost surely incorrect.
There are <b>many events that should happen in different processes and
threads before some UI appears.</b>

The following is a correct fix:
{: .compare-better }

<pre class="prettyprint cc-good lang-cpp">
SubmitTestPasswordForm();
WaitUntilCredentialPromptVisible();
</pre>

The fix above is correct under the assumption that
`WaitUntilCredentialPromptVisible()` doesn’t actually check the UI.
**The browser tests should not depend on external UI events** like "focus lost"
or “window became foreground”. Imagine an implementation where the prompt
appears only when the browser window is active. Such an implementation
would be correct; however, checking for the actual window makes the test flaky.

## Post-fix Stage

Once the test is fixed, run it hundreds of times locally. Keep an eye on the
[Flakiness Portal][flakiness-portal].

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}

[flaky-tests-context]: https://www.chromium.org/developers/tree-sheriffs/sheriff-details-chromium/handling-a-failing-test
[useful-command-lines]: https://www.chromium.org/developers/testing/browser-tests
[not-implementation]: https://testing.googleblog.com/2013/08/testing-on-toilet-test-behavior-not.html
[flakiness-portal]: https://analysis.chromium.org/p/chromium/flake-portal
