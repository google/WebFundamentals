/**
 * @fileoverview Ensures versioned Workbox reference docs that shouldn't be
 * indexed have the appropriate <meta> tag.
 *
 * See https://github.com/GoogleChrome/workbox/issues/2513
 *
 * @author Jeff Posnick <jeffy@google.com>
 */

const gulp = require('gulp');
const replace = require('gulp-replace');

gulp.task('workbox-no-index', () => {
  gulp.src(['src/content/en/tools/workbox/reference-docs/v*/*.html'])
    .pipe(replace('<head>\n', '<head><meta name="robots" content="noindex">\n'))
    .pipe(gulp.dest('src/content/en/tools/workbox/reference-docs'));
});
