project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: How to migrate from Lighthouse v2 to v3.

{# wf_updated_on: 2018-05-04 #}
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

In Lighthouse v3, the Node module accepts the same configuration options as the CLI. This is a
breaking change in the sense that many of these options were ignored in v2, whereas now they'll
actually affect how Lighthouse runs.

## Output changes {: #output }

### New, top-level format in JSON output {: #json }

The JSON object that Lighthouse v3 returns now contains 2 top-level properties:

* `lhr`. The results of the audits. Short for "Lighthouse Results". This was essentially the top-level
  object in v2, but v3 introduces breaking changes to the shape of this object, too. See [Changes to the
  results object](#lhr).
* `artifacts`. 

### Changes to the results object {: #lhr }

As mentioned in [New, top-level format in JSON output](#json), the results of audits are now
available via the `lhr` property. In v2, the contents of this object were essentially the top-level JSON
output. However, the shape of this object itself has changed in v3. The table below lists all the changes.

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
    <td><code>reportGroups</code></td>
    <td></td>
    <td>Removed. Use TODO instead.</td>
  </tr>
  <tr>
    <td><code>timing</code></td>
    <td></td>
    <td>Removed. Use TODO instead.</td>
  </tr>
  <tr>
    <td><code>audits.<var>ID</var>.name</code></td>
    <td><code>audits.<var>ID</var>.id</code></td>
    <td>
    </td>
  </tr>
  <tr>
    <td><code>audits.<var>ID</var>.description</code></td>
    <td><code>audits.<var>ID</var>.title</code></td>
    <td>
    </td>
  </tr>
  <tr>
    <td><code>audits.<var>ID</var>.helpText</code></td>
    <td><code>audits.<var>ID</var>.description</code></td>
    <td>
    </td>
  </tr>
  <tr>
    <td><code>audits.<var>ID</var>.notApplicable</code></td>
    <td></td>
    <td>
      Removed. Use TODO instead.
    </td>
  </tr>
  <tr>
    <td><code>audits.<var>ID</var>.informative</code></td>
    <td></td>
    <td>
      Removed. Use TODO instead.
    </td>
  </tr>
  <tr>
    <td><code>audits.<var>ID</var>.manual</code></td>
    <td></td>
    <td>
      Removed. Use TODO instead.
    </td>
  </tr>
  <tr>
    <td><code>audits.<var>ID</var>.extendedInfo</code></td>
    <td></td>
    <td>
      Removed. Use TODO instead.
    </td>
  </tr>
</table>
