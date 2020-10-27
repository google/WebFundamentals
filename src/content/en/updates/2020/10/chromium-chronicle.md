project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: The Chromium Chronicle, a monthly series geared specifically to Chromium developers — the developers who build the browser.

{# wf_updated_on: 2020-10-30 #}
{# wf_published_on: 2020-10-30 #}
{# wf_tags: chromium-chronicle #}
{# wf_featured_image: /web/updates/images/generic/cr-chron.jpg #}
{# wf_featured_snippet: Want to detect regressions for your new feature in Chrome? Add your tests to <b>the waterfall</b>, Chrome’s continuous build and test infrastructure! #}
{# wf_blink_components: N/A #}

# The Chromium Chronicle: Adding Tests to the Waterfall {: .page-title }

**Episode 14:** by Zhaoyang Li in MTV, and Eric Aleshire in TOK (October 2020)<br>
[Previous episodes](/web/updates/tags/chromium-chronicle)

Want to detect regressions for your new feature in Chrome? Add your
tests to **the waterfall** (Chrome’s continuous build and test infrastructure)!

There are many builders on Chrome's waterfall that run tests on a variety of
platforms. This article describes how to add a test suite to an existing
builder. Before proceeding, consider these questions:

*Should the new tests live in a brand new suite, or just be added to an existing one?*

* Tests are organized in test suites by **proximity of source location and theme.**
  If your new tests can’t logically fit into any existing suite, you probably
  need a new suite.

*Should the tests run on a public builder or an internal builder?*

* Use an **internal builder** if the code lives in an **internal repo**, or the
  tests involve **confidential data**.

*Should the tests run in FYI CI, main CI or commit queue(CQ)?*

* FYI CI needs your self-monitoring and is used for test refinement or
  experimentation.
* **Main CI tests are regularly monitored** by sheriffs.
* **CQ blocks CL submission** at failure but **takes more infra resources**.
  A new suite should always **start from CI before being promoted to CQ**.
* If you’re not sure, your platform’s **EngProd team** can help you decide.

*I already have a test suite running in CI, how do I add it to CQ? / What if I
need a new builder?*

* [File a bug in Infra>Client>Chrome component][inf-cli-bug] so
  `chrome-browser-infra@` team can start evaluations and help you set up.

## How to add a test suite to an existing builder

To **add a test suite to an existing builder**, you need to config some files
in [`//src/testing/buildbot/`][src-test-bbot]:

1. **Create a key** in [`gn_isolate_map.pyl`][gn-iso-map] for the new test suite
   with test target label and type info.
2. **Add that key to a test group** in [`test_suites.pyl`][test-suites-pyl].
   (You can find the mapping from builder name to the test groups on builder in
   [`waterfalls.pyl`][waterfalls-pyl].)

        'all_simulator_tests': {
          'previously_existing_test_suite': {},
          'exciting_new_feature_test_suite': {},
        },

3. More fine tunings.
     * [`mixins.pyl`][mixins-pyl] contains **arguments** that
       can be applied to a group of tests at various group levels.
     * [variants.pyl][variants-pyl] helps run a suite **in multiple instances
       with different arguments**.
4. **Regenerate configuration files** by running
   [generate_buildbot_json.py][gen-bbot-py].

After these, it is a simple matter of **checking in** your config changes;
the builders running this suite will pick up the new tests automatically, and
the **results will begin to flow in on the web interface** for the builder on
the waterfall - complete with plenty of debug info in the case of failures!

<div class="clearfix"></div>

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}

[inf-cli-bug]: https://bugs.chromium.org/p/chromium/issues/entry?components=Infra%3EClient%3EChrome
[src-test-bbot]: https://source.chromium.org/chromium/chromium/src/+/master:testing/buildbot/
[gn-iso-map]: https://source.chromium.org/chromium/chromium/src/+/master:testing/buildbot/gn_isolate_map.pyl
[test-suites-pyl]: https://source.chromium.org/chromium/chromium/src/+/master:testing/buildbot/test_suites.pyl
[waterfalls-pyl]: https://source.chromium.org/chromium/chromium/src/+/master:testing/buildbot/waterfalls.pyl
[mixins-pyl]: https://source.chromium.org/chromium/chromium/src/+/master:testing/buildbot/mixins.pyl
[variants-pyl]: https://source.chromium.org/chromium/chromium/src/+/master:testing/buildbot/variants.pyl
[gen-bbot-py]: https://source.chromium.org/chromium/chromium/src/+/master:testing/buildbot/generate_buildbot_json.py
