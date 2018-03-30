project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Minify CSS" Lighthouse audit.

{# wf_updated_on: 2018-03-30 #}
{# wf_published_on: 2018-03-30 #}
{# wf_blink_components: Platform>DevTools #}

# Minify CSS  {: .page-title }

## Overview {: #overview }

Minifying CSS files can improve your page load performance.

CSS files are often larger than they need to be. For example:

    /* Header background should match brand colors. */
    h1 {
      background-color: #000000;
    }
    h2 {
      background-color: #000000;
    }

Can be reduced to:

    h1, h2 { background-color: #000000; }

From the perspective of the browser, these 2 code samples are functionally
equivalent, but the second example uses less bytes. Minifiers can further
improve byte efficiency by removing whitespace:

    h1,h2{background-color:#000000;}

Some minifiers employ clever tricks to minimize bytes. For example, the color
value `#000000` can be further reduced to `#000`, which is its [shorthand
equivalent][shorthand]{:.external}.

[shorthand]: https://drafts.csswg.org/css-color-3/#rgb-color

## Recommendations {: #recommendations }

Use a CSS minifier to minify your CSS code.

* For small sites that you don't update often, you can probably use an online
  service for manually minifying your files. You paste your CSS into the
  service's UI, and it returns a minified version of the code.
* For professional developers, you probably want to set up an automated
  workflow that minifies your CSS automatically before you deploy your updated
  code. This is usually accomplished with a build tool like
  [Gulp][Gulp]{:.external} or [Webpack][Webpack]{:.external}.

[Gulp]: https://gulpjs.com/
[Webpack]: https://webpack.js.org/

Consult your favorite search engine to explore all of the different minifiers
out there and to find out which one is best for you.

## More information {: #more-info }

Lighthouse provides an estimate of potential savings based on the comments
and whitespace characters that it finds in your CSS. This is a conservative
estimate. As mentioned earlier, minifiers can perform clever optimizations
(such as reducing `#000000` to `#000`) to further reduce your file size. So,
if you use a minifier, you may see more savings than what Lighthouse reports.

Sources:

* [Audit source][src]{:.external}
* [Minify Resources](/speed/docs/insights/MinifyResources)

[src]: https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/audits/byte-efficiency/unminified-css.js
