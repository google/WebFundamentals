project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Learn how to make a webpack-based app work offline by adding Workbox to it.

{# wf_updated_on: 2017-11-16 #}
{# wf_published_on: 2017-10-31 #}

# Get Started With Workbox For Webpack {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

In this tutorial, you use Workbox to make a simple web app work offline.

If you'd like a conceptual overview of Workbox before starting this tutorial,
see the [Overview](/web/tools/workbox/overview).

## Step 1: Set up your project {: #setup }

The project that you're going to add Workbox to is hosted on [Glitch][Glitch].
First, you need to set up Glitch so that you can edit your own copy of the
project.

[Glitch]: https://glitch.com/about/

1. Open the [demo](https://glitch.com/edit/#!/workbox-webpack).

     <figure>
       <img src="imgs/webpack/demo.png"
         alt="The starting point demo, hosted on Glitch"/>
       <figcaption>
         <b>Figure 1</b>. The starting point demo, hosted on Glitch
       </figcaption>
     </figure>

1. Click **workbox-webpack** at the top-left of the page. The **Project
   info and options** dropdown appears.
1. Click **Remix This**. Your browser redirects to an editable copy of
   the project.

<<_shared/try-initial.md>>

## Step 2: Install Workbox {: #install }

Next, you're going to add Workbox to the project to enable an offline
experience.

1. Re-focus the tab that shows you the source code of the project.
1. Click `package.json` to open that file.
1. Click **Add package**.
1. Type `workbox-webpack-plugin` within the **Add Package** text box, then
   click on the matching package to add it to the project.

     <aside class="note">**Note**: This is equivalent to running `npm install
     workbox-webpack-plugin`. In your own projects, you'll probably want to
     save Workbox as a [development dependency][devDependencies] instead by
     running `npm install workbox-webpack-plugin --save-dev`, since
     `workbox-webpack-plugin` is a build-time tool.</aside>

     <figure>
       <img src="imgs/webpack/add-package.png"
         alt="Adding the workbox-webpack-plugin package"/>
       <figcaption>
         <b>Figure 5</b>. Adding the <code>workbox-webpack-plugin</code>
         package
       </figcaption>
     </figure>

[devDependencies]: https://docs.npmjs.com/files/package.json#devdependencies
   
Every time you make a change to your code, Glitch automatically
re-builds and re-deploys your app. The tab running the live app automatically
refreshes, too.

## Step 3: Add Workbox to your Webpack build process {: #webpack }

Workbox is installed, but you're not using it in your webpack build process, yet.

1. Click `webpack.config.js` to open that file.
1. Import the Workbox plugin. The bold code is the code that you need to add to your project.

    <pre class="prettyprint">const path = require('path'),
        htmlPlugin = require('html-webpack-plugin'),
        cleanPlugin = require('clean-webpack-plugin'),
        dist = 'dist',
        <strong>workboxPlugin = require('workbox-webpack-plugin');</strong>
    </pre>

1. Call the Workbox plugin as the last step in `plugins`.

    <pre class="prettyprint">plugins: [
      new cleanPlugin([dist]),
      new htmlPlugin({
        filename: 'index.html',
        title: 'Get Started With Workbox For Webpack'
      }),
      <strong>new workboxPlugin({
        globDirectory: dist,
        globPatterns: ['\*\*/\*.{html,js}'],
        swDest: path.join(dist, 'sw.js'),
        clientsClaim: true,
        skipWaiting: true,
      })</strong>
    ]</pre>

### Optional: How the config works {: #optional-config }

`webpack.config.js` determines how the app is built.

* `cleanPlugin` deletes `dist`, which is the path to the output directory.
* `htmlPlugin` re-generates the HTML output and places it back in `dist`.
* `workboxPlugin` inspects the contents of `dist` and generates
  service worker code for caching the output. Since Workbox revisions
  each file based on its contents, Workbox should always be the last
  plugin you call.

The object that you pass to `workboxPlugin` configures how Workbox runs.

<<_shared/config.md>>

<<_shared/register.md>>

## Step 5: Add runtime caching {: #runtime }

Runtime caching lets you store content that's not under your control
when your app requests it at runtime. For example, by runtime caching the
Hacker News content which this app relies on, you'll be able to provide
an improved offline experience for your users. When users visit the app
while offline, they'll be able to see the content from the last time
that they had an internet connection.

1. Re-focus the tab that shows you the source code of your project.
1. Open `webpack.config.js` again.
1. Add a `runtimeCaching` property to your Workbox configuration.
   `urlPattern` is a regular expression pattern telling Workbox which
   URLs to store locally. *(When your app makes a network request at 
   runtime, Workbox caches any request that matches the regular 
   expression in `handler`, regardless of its origin. This means that 
   you can cache content from external sites as well, as this example
   demonstrates.)* `handler` defines the caching strategy that Workbox
   uses for any matching URL. See [The Offline Cookbook][cookbook] for more
   on caching strategies.

    <pre class="prettyprint">new workboxPlugin({
      globDirectory: dist,
      globPatterns: ['**/*.{html,js}'],
      swDest: path.join(dist, 'sw.js'),
      clientsClaim: true,
      skipWaiting: true,
      <strong>runtimeCaching: [
        {
          urlPattern: new RegExp('https://hacker-news\.firebaseio\.com'),
          handler: 'staleWhileRevalidate'
        }
      ]</strong>
    })</pre>

[cookbook]: /web/fundamentals/instant-and-offline/offline-cookbook/

<<_shared/try-complete.md>>

<<_shared/create.md>>

1. Open `webpack.config.json`.
1. Remove the `runtimeCaching`, `clientsClaim`, and `skipWaiting` properties from your Workbox
   plugin configuration. These are now handled in your service worker code.
1. Add the `swSrc` property to your Workbox plugin configuration in `webpack.config.json`
   to instruct Workbox to inject its code into a custom service worker. 

    <pre class="prettyprint">new workboxPlugin({
      globDirectory: dist,
      globPatterns: ['**/*.{html,js}'],
      <strong>swSrc: './src/sw.js',</strong>
      swDest: path.join(dist, 'sw.js')
    })</pre>

<<_shared/end.md>>
