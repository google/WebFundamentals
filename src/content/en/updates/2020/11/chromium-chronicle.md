project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: The Chromium Chronicle, a monthly series geared specifically to Chromium developers — the developers who build the browser.

{# wf_updated_on: 2020-11-30 #}
{# wf_published_on: 2020-11-30 #}
{# wf_tags: chromium-chronicle #}
{# wf_featured_image: /web/updates/images/generic/cr-chron.jpg #}
{# wf_featured_snippet: In Chromium, it's common to find code written for one component that would be useful elsewhere, but might have hidden restrictions. For safety, limit external access to dangerous functionality by restricting target visibility. #}
{# wf_blink_components: N/A #}

# The Chromium Chronicle: Restricting Target Visibility {: .page-title }

**Episode 15:** by Joe Mason in Montreal (November 2020)<br>
[Previous episodes](/web/updates/tags/chromium-chronicle)

Chrome is a big project with many sub-systems. It’s common to find code
written for one component that would be useful elsewhere, but might have hidden
restrictions. For safety, **limit external access to dangerous functionality**.
For instance, a custom function tuned for specific performance needs:

```
// Blazing fast for 2-char strings, O(n^3) otherwise.
std::string ConcatShortStringsFast(const std::string& a, const std::string& b);
```

There are several ways to restrict access. **GN visibility rules stop code
outside your component from depending on a target**. By default targets are
visible to all, but you can modify that:

```
# In components/restricted_component/BUILD.gn
visibility = [
  # Applies to all targets in this file. Only the given targets can depend on them.
  "//components/restricted_component:*",
  "//components/authorized_other_component:a_single_target",
]
source_set("internal") {
  # This dangerous target should be locked down even more.
  visibility = [ "//components/restricted_component:privileged_target" ]
}
```

Visibility declarations are validated with **`gn check`**, which runs as part
of every GN build.

**Another mechanism is DEPS `include_rules`, which limits access to header files**.
Every directory inherits `include_rules` from its parent, and can modify those
rules in its own `DEPS` file. All header files included from outside
directories must be allowed by the `include_rules`.

```
# In //components/authorized_other_component/DEPS
include_rules = [
  # Common directories like //base are inherited from //components/DEPS or //DEPS.
  # Also allow includes from restricted_component, but not restricted_component/internal.
  "+components/restricted_component",
  "-components/restricted_component/internal",
  # But do allow a single header from internal, for testing.
  "+components/restricted_component/internal/test_support.h",
]
```

To ensure these dependencies are appropriate, **changes that add a directory
to `include_rules` must be approved by that directory's `OWNERS`**. No
approval is needed to restrict a directory using `include_rules`! You can
ensure that everyone changing your component remembers not to use certain
headers by adding an `include_rule` forbidding them.

**`include_rules` are checked by the presubmit**, so you won’t see any
errors until you try to upload a change. To test `include_rules` without
uploading, run `buildtools/checkdeps/checkdeps.py <directory>`.

<div class="clearfix"></div>

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
