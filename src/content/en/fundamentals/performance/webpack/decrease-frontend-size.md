project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: How to use webpack to make your app as small as possible

{# wf_updated_on: 2018-02-22 #}
{# wf_published_on: 2017-12-18 #}
{# wf_blink_components: N/A #}

# Decrease Front-end Size {: .page-title }

{% include "web/_shared/contributors/iamakulov.html" %}

One of the first things to do when you’re optimizing an application is to make it as small as
possible. Here’s how to do this with webpack.

## Use the production mode (webpack 4 only) {: #use-the-production-mode }

Webpack 4 introduced the new `mode` flag. You could set this flag to `'development'` or
`'production'` to hint webpack that you’re building the application for a specific environment:

    // webpack.config.js
    module.exports = {
      mode: 'production',
    };

Make sure to enable the `production` mode when you’re building your app for production.
This will make webpack apply optimizations like minification, removal of development-only code
in libraries, [and more](https://medium.com/webpack/webpack-4-mode-and-optimization-5423a6bc597a).

### Further reading {: .hide-from-toc }

* [What specific things the `mode` flag configures](https://medium.com/webpack/webpack-4-mode-and-optimization-5423a6bc597a)

## Enable minification {: #enable-minification }

Note: if you’re using [webpack 4 with the production mode](#enable-the-production-mode), the
bundle-level minification is already enabled. You’ll only need to enable loader-specific options.

Minification is when you compress the code by removing extra spaces, shortening variable names and
so on. Like this:

    // Original code
    function map(array, iteratee) {
      let index = -1;
      const length = array == null ? 0 : array.length;
      const result = new Array(length);

      while (++index < length) {
        result[index] = iteratee(array[index], index, array);
      }
      return result;
    }

↓

    // Minified code
    function map(n,r){let t=-1;for(const a=null==n?0:n.length,l=Array(a);++t<a;)l[t]=r(n[t],t,n);return l}

Webpack supports two ways to minify the code: _the bundle-level minification_ and
_loader-specific options_. They should be used simultaneously.

The bundle-level minification compresses the whole bundle after compilation. Here’s how it works:

<ol>
<li>

You write code like this:

<pre class="prettyprint">
// comments.js
import './comments.css';
export function render(data, target) {
  console.log('Rendered!');
}
</pre>

</li>

<li>

Webpack compiles it into approximately the following:

<pre class="prettyprint">
// bundle.js (part of)
"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["render"] = render;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__comments_css__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__comments_css_js___default =
__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__comments_css__);

function render(data, target) {
  console.log('Rendered!');
}
</pre>

</li>

<li>

A minifier compresses it into approximately the following:

<pre class="prettyprint">
// minified bundle.js (part of)
"use strict";function t(e,n){console.log("Rendered!")}
Object.defineProperty(n,"__esModule",{value:!0}),n.render=t;var o=r(1);r.n(o)
</pre>

</li>
</ol>

**In webpack 4,** the bundle-level minification is enabled automatically – both in the production
mode and without one. It uses [the UglifyJS minifier](https://github.com/mishoo/UglifyJS2)
under the hood. (If you ever need to disable minification, just use the development mode
or pass `false` to the `optimization.minimize` option.)

**In webpack 3,** you need to use [the UglifyJS plugin](https://github.com/webpack-contrib/uglifyjs-webpack-plugin).
The plugin comes bundled with webpack; to enable it, add it to the `plugins`
section of the config:

    // webpack.config.js
    const webpack = require('webpack');

    module.exports = {
      plugins: [
        new webpack.optimize.UglifyJsPlugin(),
      ],
    };

Note: In webpack 3, the UglifyJS plugin can’t compile the ES2015+ (ES6+) code. This means
that if your code uses classes, arrow functions or other new language features,
and you don’t compile them into ES5, the plugin will throw an error. <br><br>
If you need to compile the new syntax, use the
[uglifyjs-webpack-plugin](https://github.com/webpack-contrib/uglifyjs-webpack-plugin) package. This
is the same plugin that’s bundled with webpack, but newer, and it’s able to compile the ES2015+
code.

The second way is loader-specific options ([what a loader
is](https://webpack.js.org/concepts/loaders/)). With loader options, you can compress things that
the minifier can’t minify. For example, when you import a CSS file with
[`css-loader`](https://github.com/webpack-contrib/css-loader), the file is compiled into a string:

    /* comments.css */
    .comment {
      color: black;
    }

↓

<pre class="prettyprint">
// minified bundle.js (part of)
exports=module.exports=__webpack_require__(1)(),
exports.push([module.i,<strong>".comment {\r\n  color: black;\r\n}"</strong>,""]);
</pre>

The minifier can’t compress this code because it’s a string. To minify the file content, we need to
configure the loader to do this:

<pre class="prettyprint">
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: <strong>{ minimize: true }</strong> },
        ],
      },
    ],
  },
};
</pre>

### Further reading {: .hide-from-toc }

* [The UglifyJsPlugin docs](https://github.com/webpack-contrib/uglifyjs-webpack-plugin)

* Other popular minifiers: [Babel
  Minify](https://github.com/webpack-contrib/babel-minify-webpack-plugin), [Google Closure
  Compiler](https://github.com/roman01la/webpack-closure-compiler)

## Specify `NODE_ENV=production`

Note: if you’re using [webpack 4 with the production mode](#enable-the-production-mode), the
`NODE_ENV=production` optimization is already enabled. Feel free to skip this section.

Another way to decrease the front-end size is to set the `NODE_ENV`
[environmental variable](https://superuser.com/questions/284342/what-are-path-and-other-environment-variables-and-how-can-i-set-or-use-them)
in your code to the value `production`.

Libraries read the `NODE_ENV` variable to detect in which mode they should work – in the
development or the production one. Some libraries behave differently based on this variable. For
example, when `NODE_ENV` is not set to `production`, Vue.js does additional checks and prints
warnings:

    // vue/dist/vue.runtime.esm.js
    // …
    if (process.env.NODE_ENV !== 'production') {
      warn('props must be strings when using array syntax.');
    }
    // …

React works similarly – it loads a development build that includes the warnings:

    // react/index.js
    if (process.env.NODE_ENV === 'production') {
      module.exports = require('./cjs/react.production.min.js');
    } else {
      module.exports = require('./cjs/react.development.js');
    }

    // react/cjs/react.development.js
    // …
    warning$3(
      componentClass.getDefaultProps.isReactClassApproved,
      'getDefaultProps is only used on classic React.createClass ' +
      'definitions. Use a static property named `defaultProps` instead.'
    );
    // …

Such checks and warnings are usually unnecessary in production, but they remain in the code and
increase the library size. **In webpack 4,** remove them by adding
the `optimization.nodeEnv: 'production'` option:

    // webpack.config.js (for webpack 4)
    module.exports = {
      optimization: {
        nodeEnv: 'production',
        minimize: true,
      },
    };

**In webpack 3,** use the [`DefinePlugin`](https://webpack.js.org/plugins/define-plugin/) instead:

    // webpack.config.js (for webpack 3)
    const webpack = require('webpack');

    module.exports = {
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': '"production"',
        }),
        new webpack.optimize.UglifyJsPlugin(),
      ],
    };

Both the `optimization.nodeEnv` option and the `DefinePlugin` work the same way –
they replace all occurrences of `process.env.NODE_ENV` with the specified value. With the
config from above:

<ol>
<li>

Webpack will replace all occurrences of <code>process.env.NODE_ENV</code> with
<code>"production"</code>:

<pre class="prettyprint">
 // vue/dist/vue.runtime.esm.js
if (typeof val === 'string') {
  name = camelize(val);
  res[name] = { type: null };
} else if (<strong>process.env.NODE_ENV !== 'production'</strong>) {
  warn('props must be strings when using array syntax.');
}
</pre>

↓

<pre class="prettyprint">
// vue/dist/vue.runtime.esm.js
if (typeof val === 'string') {
  name = camelize(val);
  res[name] = { type: null };
} else if (<strong>"production" !== 'production'</strong>) {
  warn('props must be strings when using array syntax.');
}
</pre>

</li>
<li>

And then <a href="#enable-minification">the minifier</a> will remove all such
<code>if</code> branches – because <code>"production" !== 'production'</code> is always false,
and the plugin understands that the code inside these branches will never execute:

<pre class="prettyprint">
// vue/dist/vue.runtime.esm.js
if (typeof val === 'string') {
  name = camelize(val);
  res[name] = { type: null };
} else if ("production" !== 'production') {
  warn('props must be strings when using array syntax.');
}
</pre>

↓

<pre class="prettyprint">
// vue/dist/vue.runtime.esm.js (without minification)
if (typeof val === 'string') {
  name = camelize(val);
  res[name] = { type: null };
}
</pre>

</li>
</ol>

### Further reading {: .hide-from-toc }

* [What “environment variables” are](https://superuser.com/questions/284342/what-are-path-and-other-environment-variables-and-how-can-i-set-or-use-them)

* Webpack docs about: [`DefinePlugin`](https://webpack.js.org/plugins/define-plugin/),
  [`EnvironmentPlugin`](https://webpack.js.org/plugins/environment-plugin/)

## Use ES modules

The next way to decrease the front-end size is to use [ES
modules](https://ponyfoo.com/articles/es6-modules-in-depth).

When you use ES modules, webpack becomes able to do tree-shaking. Tree-shaking is when a bundler
traverses the whole dependency tree, checks what dependencies are used, and removes unused ones. So,
if you use the ES module syntax, webpack can eliminate the unused code:

<ol>
<li>

You write a file with multiple exports, but the app uses only one of them:

<pre class="prettyprint">
// comments.js
export const render = () => { return 'Rendered!'; };
export const commentRestEndpoint = '/rest/comments';

// index.js
import { render } from './comments.js';
render();
</pre>

</li>

<li>

Webpack understands that <code>commentRestEndpoint</code> is not used and doesn’t generate a
separate export point in the bundle:

<pre class="prettyprint">
// bundle.js (part that corresponds to comments.js)
(function(module, __webpack_exports__, __webpack_require__) {
  "use strict";
  const render = () => { return 'Rendered!'; };
  /* harmony export (immutable) */ __webpack_exports__["a"] = render;

  const commentRestEndpoint = '/rest/comments';
  /* unused harmony export commentRestEndpoint */
})
</pre>

</li>

<li>

[The minifier](#enable-minification) removes the unused variable:

<pre class="prettyprint">
// bundle.js (part that corresponds to comments.js)
(function(n,e){"use strict";var r=function(){return"Rendered!"};e.b=r})
</pre>

</li>
</ol>

This works even with libraries if they are written with ES modules.

Note: In webpack, tree-shaking doesn’t work without a minifier. Webpack just removes export
statements for exports that aren’t used; it’s the minifier that removes unused code.
Therefore, if you compile the bundle without the minifier, it won’t get smaller. <br><br>
You aren’t required to use precisely webpack’s built-in minifier (`UglifyJsPlugin`) though.
Any minifier that supports dead code removal
(e.g. [Babel Minify plugin](https://github.com/webpack-contrib/babel-minify-webpack-plugin)
or [Google Closure Compiler plugin](https://github.com/roman01la/webpack-closure-compiler))
will do the trick.


Warning: Don’t accidentally compile ES modules into CommonJS ones. <br><br>
If you use Babel with `babel-preset-env` or `babel-preset-es2015`, check the settings of these
presets. By default, they transpile ES’ `import` and `export` to CommonJS’ `require` and
`module.exports`. [Pass the `{ modules: false }`
option](https://github.com/babel/babel/tree/master/experimental/babel-preset-env) to disable this.
<br><br>The same with TypeScript: remember to set `{ "compilerOptions": { "module": "es2015" } }`
in your `tsconfig.json`.

### Further reading {: .hide-from-toc }

* [“ES6 Modules in depth”](https://ponyfoo.com/articles/es6-modules-in-depth)

* Webpack docs [about tree shaking](https://webpack.js.org/guides/tree-shaking/)

## Optimize images

Images account for [more than a
half](http://httparchive.org/interesting.php?a=All&l=Oct%2016%202017) of the page size. While they
are not as critical as JavaScript (e.g., they don’t block rendering), they still eat a large part of
the bandwidth. Use `url-loader`, `svg-url-loader` and `image-webpack-loader` to optimize them in
webpack.

[`url-loader`](https://github.com/webpack-contrib/url-loader) inlines small static files into the
app. Without configuration, it takes a passed file, puts it next to the compiled bundle and returns
an url of that file. However, if we specify the `limit` option, it will encode files smaller than
this limit as [a Base64 data url](https://css-tricks.com/data-uris/) and return this url. This
inlines the image into the JavaScript code and saves an HTTP request:

<pre class="prettyprint">
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif)$/,
        loader: 'url-loader',
        options: {
          // Inline files smaller than 10 kB (10240 bytes)
          limit: 10 * 1024,
        },
      },
    ],
  }
};
</pre>

<pre class="prettyprint">
// index.js
import imageUrl from './image.png';
// → If image.png is smaller than 10 kB, `imageUrl` will include
// the encoded image: 'data:image/png;base64,iVBORw0KGg…'
// → If image.png is larger than 10 kB, the loader will create a new file,
// and `imageUrl` will include its url: `/2fcd56a1920be.png`
</pre>

Note: Inlined images reduce the number of separate requests, which is good ([even with
HTTP/2](https://blog.octo.com/en/http2-arrives-but-sprite-sets-aint-no-dead/)), but increase the
download/parse time of your bundle and memory consumption. Make sure to not embed large images or a
lot of them – or increased bundle time would outweigh the benefit of inlining.

[`svg-url-loader`](https://github.com/bhovhannes/svg-url-loader) works just like `url-loader` –
except that it encodes files with the [URL
encoding](https://developer.mozilla.org/en-US/docs/Glossary/percent-encoding) instead of the Base64
one. This is useful for SVG images – because SVG files are just a plain text, this encoding is
more size-effective:

    // webpack.config.js
    module.exports = {
      module: {
        rules: [
          {
            test: /\.svg$/,
            loader: 'svg-url-loader',
            options: {
              // Inline files smaller than 10 kB (10240 bytes)
              limit: 10 * 1024,
              // Remove the quotes from the url
              // (they’re unnecessary in most cases)
              noquotes: true,
            },
          },
        ],
      },
    };

Note: svg-url-loader has options that improve Internet Explorer support, but worsen inlining for
other browsers. If you need to support this browser, [apply the `iesafe: true`
option](https://github.com/bhovhannes/svg-url-loader#iesafe).

[`image-webpack-loader`](https://github.com/tcoopman/image-webpack-loader) compresses images that go
through it. It supports JPG, PNG, GIF and SVG images, so we’re going to use it for all these types.

This loader doesn’t embed images into the app, so it must work in pair with `url-loader` and
`svg-url-loader`. To avoid copy-pasting it into both rules (one for JPG/PNG/GIF images, and another
one for SVG ones), we’ll include this loader as a separate rule with [`enforce: 'pre'`](https://webpack.js.org/configuration/module/#rule-enforce):

     // webpack.config.js
    module.exports = {
      module: {
        rules: [
          {
            test: /\.(jpe?g|png|gif|svg)$/,
            loader: 'image-webpack-loader',
            // This will apply the loader before the other ones
            enforce: 'pre',
          },
        ],
      },
    };

The default settings of the loader are already good to go – but if you want to configure it
further, see [the plugin options](https://github.com/tcoopman/image-webpack-loader#options). To
choose what options to specify, check out Addy Osmani’s excellent [guide on image
optimization](https://images.guide/).

### Further reading {: .hide-from-toc }

* ["What is base64 encoding used
  for?"](https://stackoverflow.com/questions/201479/what-is-base-64-encoding-used-for)

* Addy Osmani’s [guide on image optimization](https://images.guide/)

## Optimize dependencies

More than a half of average JavaScript size comes from dependencies, and a part of that size might
be just unnecessary.

For example, Lodash (as of v4.17.4) adds 72 KB of minified code to the bundle. But if you use only,
like, 20 of its methods, then approximately 65 KB of minified code does just nothing.

Another example is Moment.js. Its 2.19.1 version takes 223 KB of minified code, which is huge –
the average size of JavaScript on a page [was 452 KB in October
2017](http://httparchive.org/interesting.php?a=All&l=Oct%2016%202017). However, 170 KB of that size
is [localization
files](https://github.com/moment/moment/tree/4caa268356434f3ae9b5041985d62a0e8c246c78/locale). If
you don’t use Moment.js with multiple languages, these files will bloat the bundle without a
purpose.

All these dependencies can be easily optimized. We’ve collected optimization approaches in
a GitHub repo – [check it out](https://github.com/GoogleChromeLabs/webpack-libs-optimizations)!

## Enable module concatenation for ES modules (aka scope hoisting)

Note: if you’re using [webpack 4 with the production mode](#enable-the-production-mode), the bundle-level minification is already enabled. You’ll only need to enable loader-specific options.

When you are building a bundle, webpack is wrapping each module into a function:

    // index.js
    import {render} from './comments.js';
    render();

    // comments.js
    export function render(data, target) {
      console.log('Rendered!');
    }

↓

    // bundle.js (part  of)
    /* 0 */
    (function(module, __webpack_exports__, __webpack_require__) {

      "use strict";
      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      var __WEBPACK_IMPORTED_MODULE_0__comments_js__ = __webpack_require__(1);
      Object(__WEBPACK_IMPORTED_MODULE_0__comments_js__["a" /* render */])();

    }),
    /* 1 */
    (function(module, __webpack_exports__, __webpack_require__) {

      "use strict";
      __webpack_exports__["a"] = render;
      function render(data, target) {
        console.log('Rendered!');
      }

    })

In the past, this was required to isolate CommonJS/AMD modules from each other. However, this added
a size and performance overhead for each module.

Webpack 2 introduced support for ES modules which, unlike CommonJS and AMD modules, can be bundled
without wrapping each with a function. And webpack 3 made such bundling possible – with
[module concatenation](https://webpack.js.org/plugins/module-concatenation-plugin/). Here’s
what module concatenation does:

    // index.js
    import {render} from './comments.js';
    render();

    // comments.js
    export function render(data, target) {
      console.log('Rendered!');
    }

↓

    // Unlike the previous snippet, this bundle has only one module
    // which includes the code from both files

    // bundle.js (part of; compiled with ModuleConcatenationPlugin)
    /* 0 */
    (function(module, __webpack_exports__, __webpack_require__) {

      "use strict";
      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

      // CONCATENATED MODULE: ./comments.js
      function render(data, target) {
        console.log('Rendered!');
      }

      // CONCATENATED MODULE: ./index.js
      render();

    })

See the difference? In the plain bundle, module 0 was requiring `render` from module 1. With
module concatenation, `require` is simply replaced with required function, and module 1 is
removed. The bundle has fewer modules – and less module overhead!

To enable this behavior, **in webpack 4**, enable the `optimization.concatenateModules` option:

    // webpack.config.js (for webpack 4)
    module.exports = {
      optimization: {
        concatenateModules: true,
      },
    };

**In webpack 3,** use the `ModuleConcatenationPlugin`:

    // webpack.config.js (for webpack 3)
    const webpack = require('webpack');

    module.exports = {
      plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
      ],
    };

Note: Wonder why this behavior is not enabled by default? Concatenating modules is cool, [but it
comes with increased build time and breaks hot module
replacement](https://twitter.com/TheLarkInn/status/925800563144454144). That’s why it should only be
enabled in production.

### Further reading {: .hide-from-toc }

* Webpack docs [for the
  ModuleConcatenationPlugin](https://webpack.js.org/plugins/module-concatenation-plugin/)

* [“Brief introduction to scope
  hoisting”](https://medium.com/webpack/brief-introduction-to-scope-hoisting-in-webpack-8435084c171f)

* Detailed description of [what this plugin
  does](https://medium.com/webpack/webpack-freelancing-log-book-week-5-7-4764be3266f5)

## Use `externals` if you have both webpack and non-webpack code

You might have a large project where some code is compiled with webpack, and some code is not. Like
a video hosting site, where the player widget might be built with webpack, and the surrounding page
might be not:

<figure>
  <img src="./video-hosting.png" alt="A screenshot of a video hosting site">
  <figcaption>(A completely random video hosting site)</figcaption>
</figure>

If both pieces of code have common dependencies, you can share them to avoid downloading their code
multiple times. This is done with [the webpack’s `externals`
option](https://webpack.js.org/configuration/externals/) – it replaces modules with variables or
other external imports.

### If dependencies are available in `window`

If your non-webpack code relies on dependencies that are available as variables in `window`, alias
dependency names to variable names:

    // webpack.config.js
    module.exports = {
      externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
      },
    };

With this config, webpack won’t bundle `react` and `react-dom` packages. Instead, they will be
replaced with something like this:

    // bundle.js (part of)
    (function(module, exports) {
      // A module that exports `window.React`. Without `externals`,
      // this module would include the whole React bundle
      module.exports = React;
    }),
    (function(module, exports) {
      // A module that exports `window.ReactDOM`. Without `externals`,
      // this module would include the whole ReactDOM bundle
      module.exports = ReactDOM;
    })

### If dependencies are loaded as AMD packages

If your non-webpack code doesn’t expose dependencies into `window`, things are more complicated.
However, you can still avoid loading the same code twice if the non-webpack code consumes these
dependencies as [AMD packages](http://requirejs.org/docs/whyamd.html#amd).

To do this, compile the webpack code as an AMD bundle and alias modules to library URLs:

    // webpack.config.js
    module.exports = {
      output: { libraryTarget: 'amd' },

      externals: {
        'react': { amd: '/libraries/react.min.js' },
        'react-dom': { amd: '/libraries/react-dom.min.js' },
      },
    };

Webpack will wrap the bundle into `define()` and make it depend on these URLs:

    // bundle.js (beginning)
    define(["/libraries/react.min.js", "/libraries/react-dom.min.js"], function () { … });

If non-webpack code uses the same URLs to load its dependencies, then these files will be loaded
only once – additional requests will use the loader cache.

Note: Webpack replaces only those imports that exactly match keys of the `externals` object. This
means that if you write `import React from 'react/umd/react.production.min.js'`, this library won’t
be excluded from the bundle. This is reasonable – webpack doesn’t know if `import 'react'` and
`import 'react/umd/react.production.min.js'` are the same things – so stay careful.

### Further reading {: .hide-from-toc }

* Webpack docs [on `externals`](https://webpack.js.org/configuration/externals/)

## Summing up

* Enable the production mode if you use webpack 4
* Minimize your code with the bundle-level minifier and loader options
* Remove the development-only code by replacing `NODE_ENV` with `production`
* Use ES modules to enable tree shaking
* Compress images
* Apply dependency-specific optimizations
* Enable module concatenation
* Use `externals` if this makes sense for you
