project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: How to migrate from Lighthouse v2 to v3.

{# wf_updated_on: 2018-05-08 #}
{# wf_published_on: 2018-05-04 #}
{# wf_blink_components: N/A #}

# Lighthouse v3 Migration Guide {: .page-title }

This guide is for Lighthouse v2 users who:

* Run Lighthouse from Node or the command line.
* Rely on the JSON output of Lighthouse.

If these do not apply to you, then your workflow for running Lighthouse is mostly the same.
See [Announcing Lighthouse 3.0](/web/updates/2018/05/lighthouse3) for an overview of new
features and changes.

## Invocation changes {: #invocation }

Lighthouse now computes simulated performance by default and throttling settings have been heavily
changed.

### CLI Flags

<table>
  <tr>
    <th>Scenario</th>
    <th>v2 Flags</th>
    <th>v3 Flags</th>
  </tr>
  <tr>
    <td>DevTools 3G Throttling</td>
    <td>None (default behavior)</td>
    <td><code>--throttling-method=devtools</code></td>
  </tr>
  <tr>
    <td>No Throttling</td>
    <td><code>--disable-network-throttling --disable-cpu-throttling</code></td>
    <td><code>--throttling-method=provided</code></td>
  </tr>
  <tr>
    <td>Network Throttling, No CPU Throttling</td>
    <td><code>--disable-cpu-throttling</code></td>
    <td><code>--throttling-method=devtools --throttling.cpuSlowdownMultiplier=1</code></td>
  </tr>
  <tr>
    <td>Run Performance Audits</td>
    <td><code>--perf</code></td>
    <td><code>--preset=perf</code></td>
  </tr>
  <tr>
    <td>Run Mixed Content Audits</td>
    <td><code>--mixed-content</code></td>
    <td><code>--preset=mixed-content</code></td>
  </tr>
</table>

### Node Module

In Lighthouse v3, the Node module accepts the same configuration options as the CLI. This is a
breaking change in the sense that many of these options were ignored in v2, whereas now they'll
actually affect how Lighthouse runs.

```js
const fs = require('fs');
const lighthouse = require('lighthouse');

async function run() {
  // `onlyCategories` was previously only available as a config setting.
  // `output` was previously only available in CLI.
  const flags = {onlyCategories: ['performance'], output: 'html'};
  const html = (await lighthouse('https://google.com/', flags)).report;
  fs.writeFileSync('report.html', html);
}
```

## Output changes {: #output }

### New, top-level format in JSON output {: #json }

The JSON object that Lighthouse v3 returns now contains 3 top-level properties:

* `lhr`. The results of the audits. Short for "Lighthouse Results". This was essentially the
  top-level object in v2, but v3 introduces breaking changes to the shape of this object, too. See
  [Changes to the results object](#lhr).
* `artifacts`. The data collected from Chrome while auditing. This was previously intermingled
  with the properties of the LHR.
* `report`. The formatted report HTML/JSON/CSV as a string.

### Changes to the results object {: #lhr }

As mentioned in [New, top-level format in JSON output](#json), the results of audits are now
available via the `lhr` property. In v2, the contents of this object were essentially the
top-level JSON output. However, the shape of this object itself has changed in v3. The table below
lists all the changes.

* If a row has a value in both **v2** and **v3** columns, it means
  that you should replace any reference to the v2 property in your code with the v3-equivalent.
* When a row does not have a value in the **v3** column, the **Notes** column describes
  your options.
* Note that items such as <var>ID</var> represent placeholder text.

<table>
  <tr>
    <th>v2 Property</th>
    <th>v3-Equivalent</th>
    <th>Notes</th>
  </tr>
  <tr>
    <td><code>initialUrl</code></td>
    <td><code>requestedUrl</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>url</code></td>
    <td><code>finalUrl</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>generatedTime</code></td>
    <td><code>fetchedTime</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>reportCategories</code></td>
    <td><code>categories</code></td>
    <td>Changed from array to a keyed object.</td>
  </tr>
  <tr>
    <td><code>reportGroups</code></td>
    <td><code>categoryGroups</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>audits.<var>ID</var>.name</code></td>
    <td><code>audits.<var>ID</var>.id</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>audits.<var>ID</var>.description</code></td>
    <td><code>audits.<var>ID</var>.title</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>audits.<var>ID</var>.helpText</code></td>
    <td><code>audits.<var>ID</var>.description</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>audits.<var>ID</var>.scoringMode</code></td>
    <td><code>audits.<var>ID</var>.scoreDisplayMode</code></td>
    <td>
      Possible values have been expanded to
      <code>numeric|binary|manual|informative|not-applicable|error</code>.
    </td>
  </tr>
  <tr>
    <td><code>audits.<var>ID</var>.score</code></td>
    <td><code>audits.<var>ID</var>.score</code></td>
    <td>
      Scores are always a number between 0 and 1 (not 0-100) when <code>scoreDisplayMode</code> is
      numeric or binary. Scores are always <code>null</code> for other display modes as there is no
      notion of pass/fail.
    </td>
  </tr>
  <tr>
    <td><code>audits.<var>ID</var>.displayValue</code></td>
    <td><code>audits.<var>ID</var>.displayValue</code></td>
    <td>Can now be an array of printf-style arguments for string interpolation.</td>
  </tr>
  <tr>
    <td><code>audits.<var>ID</var>.debugString</code></td>
    <td>
      <code>audits.<var>ID</var>.explanation</code>
      <code>audits.<var>ID</var>.errorMessage</code>
      <code>audits.<var>ID</var>.warnings</code>
    </td>
    <td>
      <code>debugString</code> values have been converted to one of the three properties above
      depending on their intent.
    </td>
  </tr>
  <tr>
    <td><code>audits.<var>ID</var>.details</code></td>
    <td><code>audits.<var>ID</var>.details</code></td>
    <td>
      Structure of details has shifted to be more consumable. Each entry in <code>.items</code>
      is an object with reliable keys instead of <code>any[]</code>.
    </td>
  </tr>
  <tr>
    <td><code>audits.<var>ID</var>.error</code></td>
    <td><code>audits.<var>ID</var>.scoreDisplayMode === 'error'</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>audits.<var>ID</var>.notApplicable</code></td>
    <td><code>audits.<var>ID</var>.scoreDisplayMode === 'not-applicable'</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>audits.<var>ID</var>.informative</code></td>
    <td><code>audits.<var>ID</var>.scoreDisplayMode === 'informative'</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>audits.<var>ID</var>.manual</code></td>
    <td><code>audits.<var>ID</var>.scoreDisplayMode === 'manual'</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>audits.<var>ID</var>.extendedInfo</code></td>
    <td></td>
    <td>
      Removed. Use <code>details</code> instead.
    </td>
  </tr>
</table>
