project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Learn how to set up CSS & JS preprocessors to help you code more efficiently.

{# wf_updated_on: 2017-07-24 #}
{# wf_published_on: 2015-08-03 #}

# Set Up CSS and JS Preprocessors {: .page-title }

{% include "web/_shared/contributors/pbakaus.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

CSS preprocessors such as Sass, as well as JS preprocessors and transpilers can greatly accelerate your development when used correctly. Learn how to set them up.


### TL;DR {: .hide-from-toc }
- Preprocessors let you use features in CSS and JavaScript that your browser doesn't support natively, for example, CSS variables.
- If you're using preprocessors, map your original source files to the rendered output using Source Maps.
- Make sure your web server can serve Source Maps.
- Use a supported preprocessor to automatically generate Source Maps.


## What's a preprocessor?

A preprocessor takes an arbitrary source file and converts it into something that the browser understands. 

With CSS as output, they are used to add features that otherwise wouldn't exist (yet): CSS Variables, Nesting and much more. Notable examples in this category are [Sass](http://sass-lang.com/), [Less](http://lesscss.org/){: .external } and [Stylus](https://learnboost.github.io/stylus/).

With JavaScript as output, they either convert (compile) from a completely different language, or convert (transpile) a superset or new language standard down to today's standard. Notable examples in this category are [CoffeeScript](http://coffeescript.org/){: .external } and ES6 (via [Babel](https://babeljs.io/)).

## Debugging and editing preprocessed content

As soon as you are in the browser and use DevTools to [edit your CSS](/web/tools/chrome-devtools/inspect-styles/edit-styles) or debug your JavaScript, one issue becomes very apparent: what you are looking at does not reflect your source, and doesn't really help you fix your problem.

In order to work around, most modern preprocessors support a feature called <b>Source Maps</b>.

### What are Source Maps?

A source map is a JSON-based mapping format that creates a relationship between a minified file and its sources. When you build for production, along with minifying and combining your JavaScript files, you generate a source map that holds information about your original files.

### How Source Maps work

For each CSS file it produces, a CSS preprocessor generates a source map file (.map) in addition to the compiled CSS. The source map file is a JSON file that defines a mapping between each generated CSS declaration and the corresponding line of the source file.

Each CSS file contains an annotation that specifies the URL of its source map file, embedded in a special comment on the last line of the file:

    /*# sourceMappingURL=<url> */

For instance, given an Sass source file named **styles.scss**:

    %$textSize: 26px;
    $fontColor: red;
    $bgColor: whitesmoke;
    h2 {
        font-size: $textSize;
        color: $fontColor;
        background: $bgColor;
    }

Sass generates a CSS file, **styles.css**, with the sourceMappingURL annotation:

    h2 {
      font-size: 26px;
      color: red;
      background-color: whitesmoke;
    }
    /*# sourceMappingURL=styles.css.map */

Below is an example source map file:

    {
      "version": "3",
      "mappings":"AAKA,EAAG;EACC,SAAS,EANF,IAAI;EAOX,KAAK"
      "sources": ["sass/styles.scss"],
      "file": "styles.css"
    }

## Verify web server can serve Source Maps

Some web servers, like Google App Engine for example, require explicit configuration for each file type served. In this case, your Source Maps should be served with a MIME type of `application/json`, but Chrome will actually [accept any content-type](https://stackoverflow.com/questions/19911929/what-mime-type-should-i-use-for-source-map-files), for example `application/octet-stream`.

### Bonus: Source mapping via custom header 

If you don't want an extra comment in your file, use an HTTP header field on the minified JavaScript file to tell DevTools where to find the source map. This requires configuration or customization of your web server and is beyond the scope of this document.

    X-SourceMap: /path/to/file.js.map

Like the comment, this tells DevTools and other tools where to look for the source map associated with a JavaScript file. This header also gets around the issue of referencing Source Maps in languages that don't support single-line comments.

## Supported preprocessors

Just about any compiled to JavaScript language has an option to generate Source Maps today – including Coffeescript, TypeScript, JSX and many more. You can additionally use Source Maps on the server side within Node, in our CSS with via Sass, Less and more, using browserify which gives you node-style require abilities, and through minification tools like uglify-js which also adds the neat ability to generate multi-level Source Maps.

### JavaScript

<table>
  <thead>
    <tr>
      <th width="20%" data-th="Compiler">Compiler</th>
      <th width="40%" data-th="Command">Command</th>
      <th data-th="Instructions">Instructions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Compiler"><a href="http://coffeescript.org/#source-maps">CoffeeScript</a></td>
      <td data-th="Command"><code>$ coffee -c square.coffee -m</code></td>
      <td data-th="Instructions">The -m (--map) flag is all it takes for the compiler to output a source map, it will also handle adding the sourceMapURL comment pragma for you to the outputted file.</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="http://www.typescriptlang.org/">TypeScript</a></td>
      <td data-th="Command"><code>$ tsc -sourcemap square.ts</code></td>
      <td data-th="Instructions">The -sourcemap flag will generate the map and add the comment pragma.</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="https://github.com/google/traceur-compiler/wiki/SourceMaps">Traceur</a></td>
      <td data-th="Command"><code>$ traceur --source-maps=[file|inline]</code></td>
      <td data-th="Instructions">With <code>--source-maps=file</code>, every output file ending in <code>.js</code> will have a sourcemap file ending in <code>.map</code>; with <code>source-maps='inline'</code>, every output file ending in <code>.js</code> will end with a comment containing the sourcemap encoded in a <code>data:</code> URL.</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="https://babeljs.io/docs/usage/cli/#compile-with-source-maps">Babel</a></td>
      <td data-th="Command"><code>$ babel script.js --out-file script-compiled.js --source-maps</code></td>
      <td data-th="Instructions">Use --source-maps or -s to generate Source Maps. Use <code>--source-maps inline</code> for inline Source Maps.</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="https://github.com/mishoo/UglifyJS2">UglifyJS</a></td>
      <td data-th="Command"><code>$ uglifyjs file.js -o file.min.js --source-map file.min.js.map</code></td>
      <td data-th="Instructions">That is the very basic command needed to generate a source map for 'file.js'. This will also add the comment pragma to output file.</td>
    </tr>
  </tbody>
</table>

### CSS

<table>
  <thead>
    <tr>
      <th width="20%" data-th="Compiler">Compiler</th>
      <th width="40%" data-th="Command">Command</th>
      <th data-th="Instructions">Instructions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Compiler"><a href="http://sass-lang.com">Sass</a></td>
      <td data-th="Command"><code>$ scss --sourcemap styles.scss styles.css</code></td>
      <td data-th="Instructions">Source Maps in Sass are supported since Sass 3.3.</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="http://lesscss.org/">Less</a></td>
      <td data-th="Command"><code>$ lessc styles.less > styles.css --source-map styles.css.map</code></td>
      <td data-th="Instructions">Implemented in 1.5.0. See <a href="https://github.com/less/less.js/issues/1050#issuecomment-25566463">issue #1050</a> for details and usage patterns.</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="https://learnboost.github.io/stylus/">Stylus</a></td>
      <td data-th="Command"><code>$ stylus --sourcemaps styles.style styles.css</code></td>
      <td data-th="Instructions">This will embed the sourcemap as a base64 encoded string directly in the out file.</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="http://compass-style.org/">Compass</a></td>
      <td data-th="Command"><code>$ sass --compass --sourcemap --watch scss:css</code></td>
      <td data-th="Instructions">Alternatively you can add `sourcemap: true` to your config.rb file.</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="https://github.com/postcss/autoprefixer">Autoprefixer</a></td>
      <td data-th="Command"><code></code></td>
      <td data-th="Instructions">Follow the link to see how to use it and absorb an input sourcemap.</td>
    </tr>
  </tbody>
</table>

## Source Maps and DevTools

Now that you've got Source Maps properly set up, you might be happy to learn that DevTools has built-in support for both CSS and JS based Source Maps.

### Editing preprocessed CSS

Head over to [Edit Sass, Less or Stylus](/web/tools/chrome-devtools/inspect-styles/edit-styles) to learn more about how to edit and refresh styles linked to a source map directly within DevTools.

### Editing and debugging preprocessed JavaScript

Learn more about how to debug minified, compiled or transpiled JavaScript in the Sources Panel in [Map Preprocessed Code to Source Code](/web/tools/chrome-devtools/debug/readability/source-maps).
