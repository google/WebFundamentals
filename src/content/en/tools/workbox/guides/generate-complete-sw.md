project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description: A guide on how to generate a complete service worker with Workbox.

{# wf_updated_on: 2017-12-17 #}
{# wf_published_on: 2017-12-17 #}
{# wf_blink_components: N/A #}

# Generate a Complete Service Worker {: .page-title }

{% include "web/tools/workbox/_shared/alpha.html" %}

The Workbox tools can be used to generate a complete service worker with
support for precaching and runtime caching. This is a great option for anyone
looking for a quick and easy way to take advantage of service workers. It works
especially well for static sites.

You can generate a service worker using the CLI, `workbox-build` Node module or
with the webpack plugin.

Depending on how you build your site, you'll need to select the right tool
for you. The CLI is easiest to get up and running with. The Node Module
`workbox-build` is useful if you have a build process that runs on node,
like Gulp. Webpack users should use the webpack plugin.

## Setup

To generate a service worker, you'll first need to install and setup the tools.

{ CLI }

To generate a complete service worker with the CLI, you'll first need to
install the CLI.

<pre class="devsite-terminal">
npm install --global workbox-cli
</pre>

You'll need to create a configuration file. Run the `workbox wizard` in the
directory of your project. The wizard will ask you a set of questions what
will determine how your service worker is set up.

<pre class="devsite-terminal">
cd ./my-project/
</pre>
<pre class="devsite-terminal">
workbox wizard
</pre>

After this, you can run `workbox generateSW` to build your service worker.

<pre class="devsite-terminal">
workbox generateSW
</pre>

Whenever you make a change, you'll need to run this command, so it's best
to make sure that this is called as part of your deployment. This could be
as simple as creating an NPM run script in your `package.json` file:

```json
{
  "name": "my-project",
  "scripts": {
    "deploy": "workbox generateSW && firebase deploy"
  },
  ...
}
```

{ Node Module }

You'll need to install `workbox-build` to start generating a service worker
in Node.

<pre class="devsite-terminal">
npm install --save-dev workbox-build
</pre>

To generate a service worker you need to require the module and call the
`generateSW()` method, passing in configuration for your project:

```javascript
const workboxBuild = require('workbox-build');

workboxBuild.generateSW({
    swDest: './build/sw.js',
    globDirectory: './app'
    globPatterns: '**/*.{js,css,html}',
})
.then(() => {
    console.log(`Generated new service worker.`);
})
.catch((err) => {
    console.error(`Unable to generate a new service worker.`, err);
});
```

You can add this to gulp like so:

```javascript
const workboxBuild = require('workbox-build');
const gulp = require('gulp');

gulp.task(`generate-sw`, () => {
    return workboxBuild.generateSW({
      swDest: './build/sw.js',
      globDirectory: './app'
      globPatterns: '**/*.{js,css,html}',
    });
});
```

Make sure that you call `generateSW()` each time your files change and it
should be added to the end of your build process.

{ webpack }

To add Workbox to your webpack project, you

<pre class="devsite-terminal">
npm install --save-dev workbox-webpack-plugin
</pre>

With this you can require the plugin:

```javascript
const WorkboxPlugin = require('workbox-webpack-plugin');
```

You'll then want to add the Workbox plugin to your webpack plugins:

```javascript
// Webpack config
module.exports = {
  ...
  output: {
    ...
    path: path.resolve(__dirname, 'dist')
  },
  ...
  plugins: [
    new WorkboxPlugin(),
  ]
};
```

This will generate a service worker file called in `sw.js` in the configurations
output path. By default this will cache the files that Webpack has in it's
dependcy graph.

## Configure

The methods described above are the most basic setup's you can have to start
using Workbox to build your service worker, but there are range of
configuration options that you can define as well.

Below is a list of the most commonly used configuration options with
explanations of what they do and how to use them.

### Runtime Caching

Out of the box, the tooling for Workbox will only precache files as you direct
it to. There are a number of scenarios when you'll want to dynamically cache
files at runtime.

You can use the `runtimeCaching` option to tell Workbox which route's you'd
like to cache at runtime and what strategy to use.

The format is simple:

```javascript
{
  ...
  runtimeCaching: [
    {
      // You can use a RegExp as the pattern:
      urlPattern: /.jpg$/,
      handler: 'cacheFirst',
    },
  ]
}
```

The `urlPattern` needs to be a regular expression and the handler must be
one of the following, 'staleWhileRevalidate', 'cacheFirst', 'cacheOnly',
'networkFirst' or 'networkOnly.

You can one or more of these routes.

### Ignore Specific Files

If files are added to your precache list that you don't want to be cached you
can use the `globIgnores` option which takes an array of glob patterns.

```javascript
{
  ...
  globIgnores: ['**/ignored.html']
}
```

### Skip Waiting and Clients Claim

When you update your service worker and publish it live, browsers will detect
the new file and start the installation process, however it will not "activate"
the service worker until there are no tabs being controlled by the old service
worker.

If this behaviour isn't desirable, you can use `skipWaiting` and `clientsClaim`
to force the new service worker to immediately take control of open pages.

The only risk is that previuosly open pages can end up in an unstable state
if your web app is relying on cached items which may be removed by the new
service worker.

```javascript
{
  ...
  skipWaiting: true,
  clientsClaim: true,
}
```

### Navigation Fallback

If you have a single page app, you'll likely want to use navigation fallback
so that any navigation requests are reponded to with a precached page.

```javascript
{
  ...
  navigationFallback: '/app-shell.html',
}
```

### Templating Support

If you are using a templating engine to generate the content for your pages,
you can use the `templatedUrls` option to safely precache URL's, ensuring they
get updated whenever one of the templates is updated.

This can also be a safe way to add a url to be precached and provide a custom
revision value (i.e. you manual change the value associated with a URL
whenever the contents of the URL changes).

```javascript
{
  ...
  templatedUrls: {
    '/app-shell': [
      'dev/templates/app-shell.hbs',
      'dev/**\/*.css',
     ],
    '/other-page': 'my-revision-info',
  }
}
```
