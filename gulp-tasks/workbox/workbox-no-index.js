/**
 * @fileoverview Ensures versioned Workbox reference docs that shouldn't be
 * indexed have the appropriate <meta> tag.
 *
 * See https://github.com/GoogleChrome/workbox/issues/2513
 *
 * @author Jeff Posnick <jeffy@google.com>
 */

const { task, src, dest } = require('gulp');
const replace = require('gulp-replace');

task('workbox-no-index', () => {
  return src(['src/content/en/tools/workbox/reference-docs/v*/*.html'])
    .pipe(replace('<head>\n', '<head><meta name="robots" content="noindex">\n'))
    .pipe(dest('src/content/en/tools/workbox/reference-docs'));
});
