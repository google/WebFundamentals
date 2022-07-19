/**
 * @fileoverview Generates the Puppeteer docs at /web/tools/puppeteer/
 */

'use strict';

const gulp = require('gulp');
const gutil = require('gulp-util');

gulp.task('puppeteer:build', async () => {
  const pupURL = `https://developer.chrome.com/docs/puppeteer/`;
  const msg = `Puppeteer docs now live at ${pupURL}`;
 gutil.log('  ', gutil.colors.red('SKIPPED'), msg);
});
