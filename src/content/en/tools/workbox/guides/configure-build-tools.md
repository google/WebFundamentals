project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description: A guide on how to configure workbox-build, workbox-webpack-plugin, and workbox-cli.

{# wf_updated_on: 2017-12-13 #}
{# wf_published_on: 2017-12-13 #}
{# wf_blink_components: Blink>ServiceWorker #}

# Configure the Build Tools {: .page-title }

{% include "web/tools/workbox/_shared/alpha.html" %}

Workbox supports three different tools—`workbox-build`, `workbox-webpack-plugin`, and
`workbox-cli`—that provide enough flexibility to integrate into any web app's build process. Using
one of those tools, properly configured, will give you a service worker that can precache all of
your web app's most important assets, and keep previously cached assets up to date as your site
evolves.

Supported configurations vary from tool to tool, and from mode to mode within each tool. The
following guide presents a list of all the possible usage combinations, along with required and
optional configuration parameters that each combination supports.

Each build tool accepts configuration options in a slightly different way.

- When using the `workbox-build` module directly, pass the configuration as properties of an
`Object` to the appropriate method. For example, `workboxBuild.injectManifest({option: 'value'})`
or `workboxBuild.generateSW({option: 'value'})`.

- When using the `workbox-cli` command line interface, use the `--config-file` flag to point to a
CommonJS module file that assigns the configuration object to `module.exports`. If you leave out
`--config-file`, the CLI will look for a file named `workbox-config.js` in the current
directory.

- When using `workbox-webpack-plugin` within a webpack build, pass the configuration as properties
of an `Object` to the plugin's constructor, like new `WorkboxPlugin({option: 'value'})`.

Each option documented here includes an example, which, for the sake of illustration, assumes the
following local filesystem setup. Please adjust the example values to match your actual setup.

    ./
    ├── dev/
    │   ├── app.js
    │   ├── ignored.html
    │   ├── image.png
    │   ├── index.html
    │   ├── main.css
    │   ├── sw.js
    │   └── templates/
    │       └── app_shell.hbs
    └── dist/
        ├── app.abcd1234.js
        ├── ignored.html
        ├── image.png
        ├── index.html
        ├── main.cdef7890.css
        └── sw.js

## workbox-build

### generateSW

<table class="responsive">
  <tbody>
    <tr>
      <th colspan="2">Supported Options</th>
    </tr>
{% include "web/tools/workbox/guides/_shared/generate-sw-schema.html" %}
{% include "web/tools/workbox/guides/_shared/common-generate-schema.html" %}
{% include "web/tools/workbox/guides/_shared/base-schema.html" %}
  </tbody>
</table>
